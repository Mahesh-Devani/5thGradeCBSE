/**
 * 5th Grade CBSE — Unified Pluggable Storage & Sync Layer
 * Zero runtime dependencies, schema versioning, safe error handling,
 * backup/restore export-import, and multi-device cloud provider extensibility.
 */

(function(root) {
  'use strict';

  const SCHEMA_VERSION = 1;
  const APP_PREFIXES = ['cbse', 'grammar-master-', 'sst-map-'];

  // In-memory migration registry: versionNumber -> function(data) -> migratedData
  const migrations = new Map();

  // Pluggable remote sync provider
  let activeSyncProvider = null;

  function isAppKey(key) {
    if (!key || typeof key !== 'string') return false;
    return APP_PREFIXES.some(prefix => key.startsWith(prefix));
  }

  const AppStorage = {
    SCHEMA_VERSION,

    /**
     * Check if key belongs to CBSE 5th Grade app
     */
    isAppKey,

    /**
     * Register a data schema migration for a target version
     * @param {number} version - The version number to migrate TO
     * @param {Function} migrationFn - Function(item) => item
     */
    registerMigration(version, migrationFn) {
      if (typeof version === 'number' && typeof migrationFn === 'function') {
        migrations.set(version, migrationFn);
      }
    },

    /**
     * Run registered migrations on an item if older than SCHEMA_VERSION
     */
    _migrate(item) {
      if (!item || typeof item !== 'object') return item;
      let itemVersion = item._v || 0;
      if (itemVersion >= SCHEMA_VERSION) return item;

      let current = { ...item };
      for (let v = itemVersion + 1; v <= SCHEMA_VERSION; v++) {
        const migrationFn = migrations.get(v);
        if (migrationFn) {
          try {
            current = migrationFn(current);
          } catch(err) {
            console.warn(`[AppStorage] Migration to v${v} failed:`, err);
          }
        }
      }
      current._v = SCHEMA_VERSION;
      return current;
    },

    /**
     * Retrieve an item from storage.
     * Safely handles JSON parsing, migrations, and defaults.
     */
    get(key, defaultValue = null) {
      try {
        const raw = localStorage.getItem(key);
        if (raw === null || raw === undefined) return defaultValue;

        try {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') {
            return this._migrate(parsed);
          }
          return parsed;
        } catch(e) {
          // Plain primitive string/number stored directly
          return raw;
        }
      } catch(err) {
        console.warn(`[AppStorage] Error reading '${key}':`, err);
        return defaultValue;
      }
    },

    /**
     * Store an item into storage.
     * Automatically stamps objects with schema version and timestamp metadata.
     */
    set(key, value) {
      try {
        let payload = value;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          payload = {
            ...value,
            _v: SCHEMA_VERSION,
            _updated: Date.now()
          };
        }

        const serialized = typeof payload === 'string' ? payload : JSON.stringify(payload);
        localStorage.setItem(key, serialized);

        // Dispatch state change event
        if (typeof window !== 'undefined' && window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('appstorage:change', {
            detail: { key, value: payload, action: 'set' }
          }));
        }

        // Trigger remote sync push if provider configured
        if (activeSyncProvider && typeof activeSyncProvider.push === 'function') {
          Promise.resolve().then(() => {
            activeSyncProvider.push(key, payload).catch(e => {
              console.warn('[AppStorage:Sync] Provider push failed:', e);
            });
          });
        }

        return true;
      } catch(err) {
        console.error(`[AppStorage] Error saving '${key}':`, err);
        return false;
      }
    },

    /**
     * Remove an item from storage
     */
    remove(key) {
      try {
        localStorage.removeItem(key);
        if (typeof window !== 'undefined' && window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('appstorage:change', {
            detail: { key, value: null, action: 'remove' }
          }));
        }
        if (activeSyncProvider && typeof activeSyncProvider.remove === 'function') {
          Promise.resolve().then(() => {
            activeSyncProvider.remove(key).catch(e => {
              console.warn('[AppStorage:Sync] Provider remove failed:', e);
            });
          });
        }
        return true;
      } catch(err) {
        console.warn(`[AppStorage] Error removing '${key}':`, err);
        return false;
      }
    },

    /**
     * Check if a key exists
     */
    has(key) {
      try {
        return localStorage.getItem(key) !== null;
      } catch(e) {
        return false;
      }
    },

    /**
     * List all keys matching an optional prefix
     */
    keys(filterPrefix = '') {
      const result = [];
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && (!filterPrefix || k.startsWith(filterPrefix))) {
            result.push(k);
          }
        }
      } catch(e) {}
      return result;
    },

    /**
     * Register a pluggable Cloud Sync Provider (e.g. Supabase, Firebase, Google Drive, Worker)
     */
    registerSyncProvider(provider) {
      if (provider && typeof provider.name === 'string') {
        activeSyncProvider = provider;
        console.log(`[AppStorage] Registered sync provider: ${provider.name}`);
        return true;
      }
      return false;
    },

    /**
     * Perform bi-directional sync if provider registered
     */
    async sync() {
      if (!activeSyncProvider) {
        return { success: false, reason: 'No sync provider registered' };
      }
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return { success: false, reason: 'Device is offline' };
      }

      try {
        if (typeof activeSyncProvider.pull === 'function') {
          const remoteData = await activeSyncProvider.pull();
          if (remoteData && typeof remoteData === 'object') {
            this.importData(remoteData, { merge: true });
          }
        }
        if (typeof activeSyncProvider.pushAll === 'function') {
          const localData = this.exportData();
          await activeSyncProvider.pushAll(localData);
        }
        return { success: true };
      } catch(err) {
        console.error('[AppStorage:Sync] Sync error:', err);
        return { success: false, error: err.message };
      }
    },

    /**
     * Export all CBSE Class 5 progress into an exportable backup object
     */
    exportData() {
      const data = {};
      let totalKeys = 0;

      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && isAppKey(key)) {
            data[key] = this.get(key);
            totalKeys++;
          }
        }
      } catch(e) {}

      return {
        appName: '5thGradeCBSE',
        schemaVersion: SCHEMA_VERSION,
        exportedAt: new Date().toISOString(),
        totalKeys,
        data
      };
    },

    /**
     * Download backup file (.json) to the user's device
     */
    downloadBackup(filename) {
      if (typeof document === 'undefined') return { success: false, reason: 'No DOM available' };

      const backup = this.exportData();
      const dateStr = new Date().toISOString().split('T')[0];
      const targetName = filename || `CBSE5_Progress_Backup_${dateStr}.json`;
      const jsonStr = JSON.stringify(backup, null, 2);

      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = targetName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 250);

      return { success: true, filename: targetName, totalKeys: backup.totalKeys };
    },

    /**
     * Import backup JSON data into localStorage
     */
    importData(imported, options = { merge: true }) {
      if (!imported || typeof imported !== 'object') {
        throw new Error('Invalid backup file format');
      }

      // Handle either standard export wrapper or raw dictionary
      const source = (imported.appName === '5thGradeCBSE' && imported.data) ? imported.data : imported;
      let count = 0;

      Object.entries(source).forEach(([k, v]) => {
        if (isAppKey(k)) {
          // If merge is true, check updated timestamps if available
          if (options.merge) {
            const existing = this.get(k);
            if (existing && existing._updated && v && v._updated && existing._updated > v._updated) {
              // Existing local copy is newer; skip
              return;
            }
          }
          this.set(k, v);
          count++;
        }
      });

      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('appstorage:imported', {
          detail: { count, timestamp: Date.now() }
        }));
      }

      return { success: true, count };
    },

    /**
     * Parse and import from a browser File or Blob object
     */
    async importFromFile(file) {
      return new Promise((resolve, reject) => {
        if (!file) return reject(new Error('No file selected'));
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target.result);
            const result = this.importData(json);
            resolve(result);
          } catch(err) {
            reject(new Error('Failed to parse backup JSON file: ' + err.message));
          }
        };
        reader.onerror = () => reject(new Error('File read error'));
        reader.readAsText(file);
      });
    },

    /**
     * Clear all application keys
     */
    clearAllAppData() {
      const keysToRemove = [];
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && isAppKey(key)) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
        if (typeof window !== 'undefined' && window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('appstorage:cleared', {
            detail: { count: keysToRemove.length }
          }));
        }
      } catch(e) {}
      return keysToRemove.length;
    }
  };

  // Expose globally
  root.AppStorage = AppStorage;
  root.StorageAdapter = AppStorage;

})(typeof window !== 'undefined' ? window : globalThis);
