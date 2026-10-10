/**
 * 5th Grade CBSE / CBSE Learning Suite — Auth & Access Gate Layer
 * Pluggable access control: open access today, customizable per-user access tomorrow.
 */

(function(root) {
  'use strict';

  const STORAGE_KEY_AUTH = 'cbse_auth_user';

  const AppAuth = {
    // 'open' allows access to all available grades without restrictions
    // 'restricted' requires verified user identity and subscription/license
    mode: 'open',

    currentUser: null,

    init() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_AUTH);
        if (saved) {
          this.currentUser = JSON.parse(saved);
        }
      } catch(e) {}
      return this.currentUser;
    },

    setMode(newMode) {
      if (newMode === 'open' || newMode === 'restricted') {
        this.mode = newMode;
        if (typeof window !== 'undefined' && window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('auth:mode_changed', { detail: { mode: this.mode } }));
        }
      }
    },

    /**
     * Check if a grade is accessible under current policy
     * @param {string} gradeId - e.g. 'class_5', 'class_3'
     */
    canAccessGrade(gradeId) {
      // 1. In open mode, any curriculum ready is accessible
      if (this.mode === 'open') {
        return { allowed: true, reason: 'open_mode' };
      }

      // 2. In restricted mode, check user login and entitlements
      if (!this.currentUser) {
        return { allowed: false, reason: 'login_required' };
      }

      const allowedGrades = this.currentUser.allowedGrades || [];
      if (allowedGrades.includes('all') || allowedGrades.includes(gradeId)) {
        return { allowed: true, reason: 'entitlement_granted' };
      }

      return { allowed: false, reason: 'upgrade_required' };
    },

    login(userData) {
      this.currentUser = {
        email: userData.email || '',
        name: userData.name || 'Parent',
        avatar: userData.avatar || '👤',
        plan: userData.plan || 'free',
        allowedGrades: userData.allowedGrades || ['class_5'],
        loggedInAt: Date.now()
      };
      try {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(this.currentUser));
      } catch(e) {}

      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('auth:change', {
          detail: { user: this.currentUser, loggedIn: true }
        }));
      }

      return this.currentUser;
    },

    logout() {
      this.currentUser = null;
      try {
        localStorage.removeItem(STORAGE_KEY_AUTH);
      } catch(e) {}

      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('auth:change', {
          detail: { user: null, loggedIn: false }
        }));
      }
    },

    isLoggedIn() {
      return this.currentUser !== null;
    }
  };

  root.AppAuth = AppAuth;

})(typeof window !== 'undefined' ? window : globalThis);
