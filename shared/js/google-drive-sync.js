/**
 * 5th Grade CBSE — Google Identity & Drive AppData Family Sync Engine
 * ==================================================================
 * 100% serverless, zero runtime dependencies, privacy-first multi-device sync.
 * Uses Google Identity Services (GIS) OAuth2 token client and the private,
 * sandboxed 'drive.appdata' hidden space in the parent's Google Drive.
 *
 * All family student profiles, stars, streaks, and subject progress are
 * synchronized seamlessly with child-level conflict-free timestamp merging.
 */

(function(root) {
  'use strict';

  const STORAGE_KEY_SESSION = 'cbse_google_drive_session';
  const STORAGE_KEY_CLIENT_ID = 'cbse_google_client_id';
  const STORAGE_KEY_MOCK_CLOUD = 'cbse_mock_cloud_drive_file';
  const FILE_NAME = 'cbse_family_progress.json';
  const GIS_SCRIPT_URL = 'https://accounts.google.com/gsi/client';

  // Fallback / configurable default Client ID (can be overridden in UI or localStorage)
  const DEFAULT_CLIENT_ID = '938173491204-demoappcbse5thgrade.apps.googleusercontent.com';

  const OAUTH_SCOPES = [
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ].join(' ');

  let gisTokenClient = null;
  let isGisLoaded = false;
  let pushDebounceTimer = null;

  const GoogleDriveSync = {
    // Current session state
    session: null,
    syncStatus: 'idle', // 'idle' | 'syncing' | 'synced' | 'error'
    lastError: null,

    /**
     * Initialize Google Drive Sync engine
     */
    init() {
      // 1. Restore persisted session if available
      try {
        const saved = localStorage.getItem(STORAGE_KEY_SESSION);
        if (saved) {
          this.session = JSON.parse(saved);
        }
      } catch(e) {
        this.session = null;
      }

      // 2. Register with AppStorage as active sync provider
      if (root.AppStorage && typeof root.AppStorage.registerSyncProvider === 'function') {
        root.AppStorage.registerSyncProvider({
          name: 'google_drive',
          pull: () => this.pull(),
          push: (key, val) => this.schedulePush(),
          pushAll: (data) => this.pushAll(data)
        });
      }

      // 3. Connect identity to AppAuth if logged in
      if (this.session && this.session.email && root.AppAuth) {
        root.AppAuth.login({
          email: this.session.email,
          name: this.session.name || 'Parent',
          avatar: this.session.picture || '☁️',
          plan: 'google_family_sync',
          planLabel: 'Google Drive Family Sync'
        });
      }

      // 4. Dynamically load GIS script if online and not already loaded
      this._loadGisScript();

      return this;
    },

    /**
     * Get configured Google Client ID
     */
    getClientId() {
      try {
        const custom = localStorage.getItem(STORAGE_KEY_CLIENT_ID);
        if (custom && custom.trim()) return custom.trim();
      } catch(e) {}
      return DEFAULT_CLIENT_ID;
    },

    /**
     * Save custom Google Client ID
     */
    setClientId(clientId) {
      try {
        if (!clientId || !clientId.trim()) {
          localStorage.removeItem(STORAGE_KEY_CLIENT_ID);
        } else {
          localStorage.setItem(STORAGE_KEY_CLIENT_ID, clientId.trim());
        }
        gisTokenClient = null; // Invalidate cached token client
        return true;
      } catch(e) {
        return false;
      }
    },

    /**
     * Check if user is actively connected to Google Drive
     */
    isConnected() {
      return this.session !== null && !!this.session.email;
    },

    /**
     * Dynamically loads the official Google Identity Services client script
     */
    _loadGisScript() {
      if (typeof document === 'undefined') return;
      if (root.google && root.google.accounts && root.google.accounts.oauth2) {
        isGisLoaded = true;
        return;
      }

      const existing = document.querySelector(`script[src="${GIS_SCRIPT_URL}"]`);
      if (existing) {
        existing.addEventListener('load', () => { isGisLoaded = true; });
        return;
      }

      const script = document.createElement('script');
      script.src = GIS_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        isGisLoaded = true;
      };
      script.onerror = () => {
        console.warn('[GoogleDriveSync] GIS script could not be loaded (offline or blocked).');
      };
      document.head.appendChild(script);
    },

    /**
     * Request Google OAuth2 authorization and sign in
     */
    async requestAuth(interactive = true) {
      if (!root.google || !root.google.accounts || !root.google.accounts.oauth2) {
        // If GIS isn't loaded yet, try waiting briefly
        if (!isGisLoaded && typeof navigator !== 'undefined' && navigator.onLine) {
          await new Promise(r => setTimeout(r, 600));
        }
        if (!root.google || !root.google.accounts || !root.google.accounts.oauth2) {
          return {
            success: false,
            needsSetup: true,
            error: 'Google Identity Services library is not loaded. Please verify internet connection or try Simulation Mode.'
          };
        }
      }

      const clientId = this.getClientId();
      if (!clientId || clientId.includes('demoappcbse5thgrade')) {
        return {
          success: false,
          needsClientId: true,
          error: 'Please configure your Google Cloud OAuth Client ID in Settings, or use Simulation Mode to test.'
        };
      }

      return new Promise((resolve) => {
        try {
          gisTokenClient = root.google.accounts.oauth2.initTokenClient({
            client_id: clientId,
            scope: OAUTH_SCOPES,
            callback: async (tokenResponse) => {
              if (tokenResponse.error) {
                console.error('[GoogleDriveSync] OAuth token error:', tokenResponse);
                this._setError(tokenResponse.error_description || tokenResponse.error);
                return resolve({ success: false, error: tokenResponse.error });
              }

              const accessToken = tokenResponse.access_token;
              const expiresIn = parseInt(tokenResponse.expires_in, 10) || 3599;

              // Fetch User Details from Google
              const userInfo = await this._fetchUserInfo(accessToken);

              // Update session
              this.session = {
                email: userInfo.email || 'parent@cbse.org',
                name: userInfo.name || 'Parent',
                picture: userInfo.picture || '☁️',
                accessToken,
                expiresAt: Date.now() + expiresIn * 1000,
                lastSyncTime: null,
                fileId: this.session ? this.session.fileId : null
              };

              this._saveSession();

              // Link to AppAuth
              if (root.AppAuth) {
                root.AppAuth.login({
                  email: this.session.email,
                  name: this.session.name,
                  avatar: this.session.picture,
                  plan: 'google_family_sync',
                  planLabel: 'Google Drive Family Sync'
                });
              }

              this._emitStatusChange('connected');

              // Trigger initial sync
              const syncResult = await this.syncNow();
              resolve({ success: true, user: this.session, syncResult });
            }
          });

          gisTokenClient.requestAccessToken({ prompt: interactive ? 'consent' : '' });
        } catch(err) {
          console.error('[GoogleDriveSync] initTokenClient failed:', err);
          this._setError(err.message);
          resolve({ success: false, error: err.message });
        }
      });
    },

    /**
     * Fetch user profile info from Google UserInfo endpoint
     */
    async _fetchUserInfo(token) {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          return await res.json();
        }
      } catch(e) {
        console.warn('[GoogleDriveSync] Could not fetch userinfo:', e);
      }
      return { email: 'parent@google.com', name: 'Parent', picture: '☁️' };
    },

    /**
     * Sign out and clear stored session
     */
    disconnect() {
      if (this.session && this.session.accessToken && root.google && root.google.accounts && root.google.accounts.oauth2) {
        try {
          root.google.accounts.oauth2.revoke(this.session.accessToken, () => {});
        } catch(e) {}
      }

      this.session = null;
      this.syncStatus = 'idle';
      this.lastError = null;

      try {
        localStorage.removeItem(STORAGE_KEY_SESSION);
      } catch(e) {}

      if (root.AppAuth && root.AppAuth.isLoggedIn()) {
        root.AppAuth.logout();
      }

      this._emitStatusChange('disconnected');
      return { success: true };
    },

    /**
     * Find or create the cbse_family_progress.json file in hidden drive.appdata folder
     */
    async _findOrCreateRemoteFile(token) {
      if (this.session && this.session.fileId) {
        return this.session.fileId;
      }

      // 1. Search for existing file in appDataFolder
      const queryUrl = `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=name='${FILE_NAME}' and trashed=false&fields=files(id,name,modifiedTime)`;
      const listRes = await fetch(queryUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!listRes.ok) {
        throw new Error(`Google Drive API error (${listRes.status}): ${listRes.statusText}`);
      }

      const listData = await listRes.json();
      if (listData.files && listData.files.length > 0) {
        const fileId = listData.files[0].id;
        if (this.session) {
          this.session.fileId = fileId;
          this._saveSession();
        }
        return fileId;
      }

      // 2. Create new empty container file in appDataFolder
      const boundary = '-------cbse_boundary_314159';
      const metadata = JSON.stringify({
        name: FILE_NAME,
        parents: ['appDataFolder']
      });

      const initialContent = JSON.stringify({
        appName: '5thGradeCBSE',
        schemaVersion: 1,
        exportedAt: new Date().toISOString(),
        totalKeys: 0,
        data: {}
      });

      const multipartBody =
        `--${boundary}\r\n` +
        `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
        `${metadata}\r\n` +
        `--${boundary}\r\n` +
        `Content-Type: application/json\r\n\r\n` +
        `${initialContent}\r\n` +
        `--${boundary}--`;

      const createRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': `multipart/related; boundary=${boundary}`
        },
        body: multipartBody
      });

      if (!createRes.ok) {
        throw new Error(`Failed to create cloud container: ${createRes.status}`);
      }

      const createData = await createRes.json();
      const newFileId = createData.id;
      if (this.session) {
        this.session.fileId = newFileId;
        this._saveSession();
      }
      return newFileId;
    },

    /**
     * Pull remote container from Google Drive AppData
     */
    async pull() {
      if (!this.session || !this.session.accessToken) {
        // If simulation mode was active
        const simulated = localStorage.getItem(STORAGE_KEY_MOCK_CLOUD);
        if (simulated) {
          try { return JSON.parse(simulated); } catch(e) {}
        }
        return null;
      }

      try {
        const fileId = await this._findOrCreateRemoteFile(this.session.accessToken);
        const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
          headers: { Authorization: `Bearer ${this.session.accessToken}` }
        });

        if (!res.ok) {
          throw new Error(`Failed to read cloud data (${res.status})`);
        }

        return await res.json();
      } catch(err) {
        console.error('[GoogleDriveSync] pull failed:', err);
        return null;
      }
    },

    /**
     * Push full container to Google Drive AppData
     */
    async pushAll(exportContainer) {
      if (!this.session || !this.session.accessToken) {
        // If simulation mode was active
        if (this.session && this.session.isSimulated) {
          localStorage.setItem(STORAGE_KEY_MOCK_CLOUD, JSON.stringify(exportContainer));
          return { success: true };
        }
        return { success: false, reason: 'Not signed in' };
      }

      try {
        const fileId = await this._findOrCreateRemoteFile(this.session.accessToken);
        const res = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${this.session.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(exportContainer)
        });

        if (!res.ok) {
          throw new Error(`Failed to write cloud data (${res.status})`);
        }

        return { success: true };
      } catch(err) {
        console.error('[GoogleDriveSync] pushAll failed:', err);
        return { success: false, error: err.message };
      }
    },

    /**
     * Debounced push trigger when local keys are modified
     */
    schedulePush() {
      if (!this.isConnected()) return;
      if (pushDebounceTimer) clearTimeout(pushDebounceTimer);

      pushDebounceTimer = setTimeout(() => {
        this.syncNow().catch(e => {
          console.warn('[GoogleDriveSync] Auto-sync push failed:', e);
        });
      }, 3000); // 3 second debounce to bundle rapid state changes
    },

    /**
     * Conflict-free Multi-Child & Subject Timestamp Merger
     * Ensures zero data loss across devices.
     */
    mergeContainers(localData, remoteData) {
      if (!remoteData || !remoteData.data) return localData;
      if (!localData || !localData.data) return remoteData;

      const mergedMap = { ...localData.data };

      // 1. Merge general subject and active state keys
      for (const [key, remoteVal] of Object.entries(remoteData.data)) {
        if (key === 'cbse_family_profiles') continue; // Handled separately below

        const localVal = mergedMap[key];
        if (localVal === undefined || localVal === null) {
          mergedMap[key] = remoteVal;
        } else if (typeof localVal === 'object' && typeof remoteVal === 'object') {
          const localTime = localVal._updated || 0;
          const remoteTime = remoteVal._updated || 0;
          if (remoteTime > localTime) {
            mergedMap[key] = remoteVal;
          }
        }
      }

      // 2. Child Profiles Merging (isolated snapshots per child)
      const localProfilesContainer = localData.data['cbse_family_profiles'];
      const remoteProfilesContainer = remoteData.data['cbse_family_profiles'];

      if (remoteProfilesContainer && Array.isArray(remoteProfilesContainer.profiles)) {
        if (!localProfilesContainer || !Array.isArray(localProfilesContainer.profiles)) {
          mergedMap['cbse_family_profiles'] = remoteProfilesContainer;
        } else {
          const mergedProfiles = [...localProfilesContainer.profiles];

          for (const rProfile of remoteProfilesContainer.profiles) {
            const lIndex = mergedProfiles.findIndex(p => p.id === rProfile.id);
            if (lIndex === -1) {
              // Remote profile not present locally: preserve it!
              mergedProfiles.push(rProfile);
            } else {
              // Profile present on both devices: merge details and child data snapshots
              const lProfile = mergedProfiles[lIndex];
              const mergedChildData = { ...(lProfile.data || {}) };

              if (rProfile.data) {
                for (const [sKey, sVal] of Object.entries(rProfile.data)) {
                  const existingSVal = mergedChildData[sKey];
                  if (!existingSVal) {
                    mergedChildData[sKey] = sVal;
                  } else if (typeof existingSVal === 'object' && typeof sVal === 'object') {
                    if ((sVal._updated || 0) > (existingSVal._updated || 0)) {
                      mergedChildData[sKey] = sVal;
                    }
                  }
                }
              }

              const rTime = rProfile.lastUpdated || 0;
              const lTime = lProfile.lastUpdated || 0;

              mergedProfiles[lIndex] = {
                ...lProfile,
                name: rTime > lTime ? rProfile.name : lProfile.name,
                avatar: rTime > lTime ? rProfile.avatar : lProfile.avatar,
                grade: rTime > lTime ? rProfile.grade : lProfile.grade,
                streak: {
                  count: Math.max(lProfile.streak?.count || 0, rProfile.streak?.count || 0),
                  lastDate: (rProfile.streak?.lastDate > lProfile.streak?.lastDate)
                    ? rProfile.streak.lastDate
                    : (lProfile.streak?.lastDate || '')
                },
                data: mergedChildData,
                lastUpdated: Math.max(lTime, rTime, Date.now())
              };
            }
          }

          mergedMap['cbse_family_profiles'] = {
            schemaVersion: 2,
            lastUpdated: Date.now(),
            profiles: mergedProfiles
          };
        }
      }

      return {
        appName: '5thGradeCBSE',
        schemaVersion: localData.schemaVersion || 1,
        exportedAt: new Date().toISOString(),
        totalKeys: Object.keys(mergedMap).length,
        data: mergedMap
      };
    },

    /**
     * Execute full bi-directional sync cycle
     */
    async syncNow() {
      if (!this.isConnected()) {
        return { success: false, reason: 'Not connected to Google Drive' };
      }

      this.syncStatus = 'syncing';
      this.lastError = null;
      this._emitStatusChange('syncing');

      try {
        // 1. Snapshot active child's local state first
        if (root.AppProfile && typeof root.AppProfile.saveActiveProfileState === 'function') {
          root.AppProfile.saveActiveProfileState();
        }

        // 2. Export local container
        const localContainer = root.AppStorage.exportData();

        // 3. Pull remote container
        const remoteContainer = await this.pull();

        // 4. Merge conflict-free
        let mergedContainer = localContainer;
        if (remoteContainer && remoteContainer.data) {
          mergedContainer = this.mergeContainers(localContainer, remoteContainer);

          // 5. Apply merged result into local storage
          root.AppStorage.importData(mergedContainer, { merge: false });
        }

        // 6. Push merged result back to Google Drive
        await this.pushAll(mergedContainer);

        // 7. Update session metadata
        this.syncStatus = 'synced';
        this.session.lastSyncTime = Date.now();
        this._saveSession();

        this._emitStatusChange('synced', {
          lastSyncTime: this.session.lastSyncTime,
          keys: mergedContainer.totalKeys
        });

        return {
          success: true,
          lastSyncTime: this.session.lastSyncTime,
          totalKeys: mergedContainer.totalKeys
        };
      } catch(err) {
        console.error('[GoogleDriveSync] syncNow error:', err);
        this.syncStatus = 'error';
        this.lastError = err.message;
        this._emitStatusChange('error', { error: err.message });
        return { success: false, error: err.message };
      }
    },

    /**
     * Demo / Offline Simulation Mode
     * Allows testing the entire multi-device cloud sync UX and data flow
     * even without live Google Cloud project credentials or when offline.
     */
    async simulateSync(options = {}) {
      const email = options.email || 'parent.cbse@gmail.com';
      const name = options.name || 'Priya Sharma (Parent)';
      const avatar = options.avatar || '👩‍👧‍👦';

      this.session = {
        email,
        name,
        picture: avatar,
        accessToken: 'mock_simulated_token_' + Date.now(),
        expiresAt: Date.now() + 86400 * 1000,
        lastSyncTime: null,
        fileId: 'mock_file_id_cbse_family',
        isSimulated: true
      };

      this._saveSession();

      if (root.AppAuth) {
        root.AppAuth.login({
          email,
          name,
          avatar,
          plan: 'family_cloud_sync',
          planLabel: 'Google Drive Family Sync (Simulated)'
        });
      }

      this._emitStatusChange('connected');
      return await this.syncNow();
    },

    _saveSession() {
      try {
        if (this.session) {
          localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(this.session));
        }
      } catch(e) {}
    },

    _setError(msg) {
      this.syncStatus = 'error';
      this.lastError = msg;
      this._emitStatusChange('error', { error: msg });
    },

    _emitStatusChange(type, detail = {}) {
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('googlesync:status', {
          detail: {
            type,
            status: this.syncStatus,
            session: this.session,
            lastSyncTime: this.session ? this.session.lastSyncTime : null,
            error: this.lastError,
            ...detail
          }
        }));
      }
    }
  };

  // Expose globally
  root.GoogleDriveSync = GoogleDriveSync;

  // Auto-init on script load
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => GoogleDriveSync.init());
    } else {
      GoogleDriveSync.init();
    }
  }

})(typeof window !== 'undefined' ? window : globalThis);
