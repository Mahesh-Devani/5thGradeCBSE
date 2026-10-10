/**
 * 5th Grade CBSE / CBSE Learning Suite — Child Profile Manager
 * Multi-child profiles, seamless migration of existing student progress,
 * and profile-isolated state persistence.
 */

(function(root) {
  'use strict';

  const STORAGE_KEY_PROFILES = 'cbse_family_profiles';
  const STORAGE_KEY_ACTIVE_ID = 'cbse_active_profile_id';

  const DEFAULT_AVATARS = ['🦁', '🚀', '🦋', '🎨', '⚡', '🐼', '🐬', '🌟', '🦄', '🏆'];

  // Available CBSE Classes
  const AVAILABLE_GRADES = [
    { id: 'class_1', label: 'Class 1', available: false },
    { id: 'class_2', label: 'Class 2', available: false },
    { id: 'class_3', label: 'Class 3', available: false },
    { id: 'class_4', label: 'Class 4', available: false },
    { id: 'class_5', label: 'Class 5', available: true, badge: 'Full Syllabus Ready' },
    { id: 'class_6', label: 'Class 6', available: false },
    { id: 'class_7', label: 'Class 7', available: false },
    { id: 'class_8', label: 'Class 8', available: false },
    { id: 'class_9', label: 'Class 9', available: false },
    { id: 'class_10', label: 'Class 10', available: false }
  ];

  let profilesCache = null;
  let activeProfileIdCache = null;

  function generateId() {
    return 'child_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);
  }

  function isSubjectStateKey(key) {
    if (!key || typeof key !== 'string') return false;
    if (key === STORAGE_KEY_PROFILES || key === STORAGE_KEY_ACTIVE_ID || key === 'cbse_auth_user') return false;
    return key.startsWith('cbse') || key.startsWith('grammar-master-') || key.startsWith('sst-map-');
  }

  const AppProfile = {
    DEFAULT_AVATARS,
    AVAILABLE_GRADES,

    /**
     * Snapshot current localStorage application state into a dictionary
     */
    _captureCurrentState() {
      const state = {};
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (isSubjectStateKey(key)) {
            state[key] = localStorage.getItem(key);
          }
        }
      } catch(e) {}
      return state;
    },

    /**
     * Restore a profile's state dictionary into localStorage
     */
    _applyState(state) {
      if (!state || typeof state !== 'object') return;
      try {
        // 1. Clean out existing subject progress keys
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (isSubjectStateKey(key)) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));

        // 2. Set new profile's keys
        Object.entries(state).forEach(([k, v]) => {
          if (isSubjectStateKey(k)) {
            localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
          }
        });
      } catch(e) {}
    },

    /**
     * Initialize profiles and migrate legacy single-user progress if needed
     */
    init() {
      try {
        const rawProfiles = localStorage.getItem(STORAGE_KEY_PROFILES);
        if (rawProfiles) {
          profilesCache = JSON.parse(rawProfiles);
        }
      } catch(e) {
        profilesCache = null;
      }

      // If no profiles container exists, create default profile & migrate existing progress
      if (!profilesCache || !Array.isArray(profilesCache.profiles) || profilesCache.profiles.length === 0) {
        const legacyState = this._captureCurrentState();
        const defaultProfile = {
          id: 'child_default',
          name: 'Student 1',
          avatar: '🦁',
          grade: 'class_5',
          createdAt: Date.now(),
          streak: { count: 1, lastDate: new Date().toISOString().split('T')[0] },
          data: legacyState
        };

        profilesCache = {
          schemaVersion: 2,
          lastUpdated: Date.now(),
          profiles: [defaultProfile]
        };
        activeProfileIdCache = 'child_default';
        this._saveProfilesContainer();
      } else {
        activeProfileIdCache = localStorage.getItem(STORAGE_KEY_ACTIVE_ID) || profilesCache.profiles[0].id;
      }

      // Automatically sync active profile data whenever AppStorage saves an item
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('appstorage:change', (e) => {
          if (e.detail && isSubjectStateKey(e.detail.key)) {
            this.saveActiveProfileState();
          }
        });
      }

      return this.getActiveProfile();
    },

    _saveProfilesContainer() {
      try {
        if (!profilesCache) return;
        profilesCache.lastUpdated = Date.now();
        localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(profilesCache));
        if (activeProfileIdCache) {
          localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activeProfileIdCache);
        }
      } catch(e) {}
    },

    /**
     * Persist current localStorage state into the active child profile
     */
    saveActiveProfileState() {
      if (!profilesCache) return;
      const active = this.getActiveProfile();
      if (active) {
        active.data = this._captureCurrentState();
        active.lastUpdated = Date.now();
        this._saveProfilesContainer();
      }
    },

    getProfiles() {
      if (!profilesCache) this.init();
      return (profilesCache && profilesCache.profiles) ? [...profilesCache.profiles] : [];
    },

    getActiveProfile() {
      if (!profilesCache) this.init();
      const profiles = this.getProfiles();
      const found = profiles.find(p => p.id === activeProfileIdCache);
      return found || profiles[0] || null;
    },

    /**
     * Switch active child profile
     */
    switchProfile(profileId) {
      if (!profilesCache) this.init();
      if (profileId === activeProfileIdCache) return this.getActiveProfile();

      const target = this.getProfiles().find(p => p.id === profileId);
      if (!target) return null;

      // 1. Snapshot current active profile's state
      const currentActive = this.getActiveProfile();
      if (currentActive) {
        currentActive.data = this._captureCurrentState();
        currentActive.lastUpdated = Date.now();
      }

      // 2. Set new active profile
      activeProfileIdCache = target.id;
      this._saveProfilesContainer();

      // 3. Apply target profile's state to localStorage
      this._applyState(target.data || {});

      // 4. Emit event for UI refresh
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('profile:switched', {
          detail: { profile: target }
        }));
      }

      return target;
    },

    /**
     * Create a new child profile
     */
    createProfile({ name, avatar, grade, makeActive = true }) {
      if (!profilesCache) this.init();

      const newProfile = {
        id: generateId(),
        name: (name || 'Child').trim(),
        avatar: avatar || '🦁',
        grade: grade || 'class_5',
        createdAt: Date.now(),
        streak: { count: 1, lastDate: new Date().toISOString().split('T')[0] },
        data: {}
      };

      profilesCache.profiles.push(newProfile);
      this._saveProfilesContainer();

      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('profile:created', {
          detail: { profile: newProfile }
        }));
      }

      if (makeActive) {
        this.switchProfile(newProfile.id);
      }

      return newProfile;
    },

    /**
     * Update an existing child profile
     */
    updateProfile(profileId, updates = {}) {
      if (!profilesCache) this.init();
      const profile = profilesCache.profiles.find(p => p.id === profileId);
      if (!profile) return null;

      if (updates.name) profile.name = updates.name.trim();
      if (updates.avatar) profile.avatar = updates.avatar;
      if (updates.grade) profile.grade = updates.grade;
      profile.lastUpdated = Date.now();

      this._saveProfilesContainer();

      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('profile:updated', {
          detail: { profile }
        }));
      }

      return profile;
    },

    /**
     * Delete a child profile
     */
    deleteProfile(profileId) {
      if (!profilesCache) this.init();
      if (profilesCache.profiles.length <= 1) {
        return { success: false, reason: 'At least one profile must remain' };
      }

      const index = profilesCache.profiles.findIndex(p => p.id === profileId);
      if (index === -1) return { success: false, reason: 'Profile not found' };

      const wasActive = activeProfileIdCache === profileId;
      profilesCache.profiles.splice(index, 1);

      if (wasActive) {
        const nextActive = profilesCache.profiles[0];
        activeProfileIdCache = nextActive.id;
        this._applyState(nextActive.data || {});
      }

      this._saveProfilesContainer();

      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('profile:deleted', {
          detail: { profileId }
        }));
        if (wasActive) {
          window.dispatchEvent(new CustomEvent('profile:switched', {
            detail: { profile: this.getActiveProfile() }
          }));
        }
      }

      return { success: true };
    }
  };

  root.AppProfile = AppProfile;

})(typeof window !== 'undefined' ? window : globalThis);
