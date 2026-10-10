/**
 * 5th Grade CBSE / CBSE Learning Suite — Auth & Access Gate Layer
 * Pluggable access control: open access today, customizable per-user access tomorrow.
 * Supports offline license codes, user identities, and remote serverless validation hooks.
 */

(function(root) {
  'use strict';

  const STORAGE_KEY_AUTH = 'cbse_auth_user';

  // Built-in offline access and promotional license codes
  const ACCESS_CODES = {
    'CBSE2026': { plan: 'family_pass', allowedGrades: ['all'], label: 'CBSE 2026 All-Access Family Pass' },
    'CLASS5VIP': { plan: 'class5_full', allowedGrades: ['class_5'], label: 'Class 5 Complete Pass' },
    'SCHOOLPASS': { plan: 'school_partner', allowedGrades: ['all'], label: 'School Partner License' },
    'FREEACCESS': { plan: 'open_community', allowedGrades: ['all'], label: 'Open Community Access' }
  };

  let remoteValidator = null;

  const AppAuth = {
    // 'open' allows access to all available grades without restrictions
    // 'restricted' requires verified user identity or active license
    mode: 'open',

    currentUser: null,

    init() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_AUTH);
        if (saved) {
          this.currentUser = JSON.parse(saved);
        }
      } catch(e) {
        this.currentUser = null;
      }

      // Check URL parameters for fast invite codes (?code=CBSE2026)
      if (typeof window !== 'undefined' && window.location) {
        const params = new URLSearchParams(window.location.search);
        const codeParam = params.get('code');
        if (codeParam) {
          this.redeemCode(codeParam);
        }
      }

      return this.currentUser;
    },

    setMode(newMode) {
      if (newMode === 'open' || newMode === 'restricted') {
        this.mode = newMode;
        if (typeof window !== 'undefined' && window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('auth:mode_changed', { detail: { mode: this.mode } }));
          window.dispatchEvent(new CustomEvent('auth:change', { detail: { user: this.currentUser } }));
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

    /**
     * Redeem an offline or online promotional/school access code
     * @param {string} rawCode - e.g. "CBSE2026"
     */
    async redeemCode(rawCode) {
      if (!rawCode || typeof rawCode !== 'string') {
        return { success: false, error: 'Please enter a valid code' };
      }

      const code = rawCode.trim().toUpperCase();

      // 1. Check local catalog
      if (ACCESS_CODES[code]) {
        const match = ACCESS_CODES[code];
        const user = {
          ...(this.currentUser || {}),
          plan: match.plan,
          planLabel: match.label,
          licenseCode: code,
          allowedGrades: match.allowedGrades,
          unlockedAt: Date.now()
        };
        this._saveUser(user);
        this._emitRedeemed(code, match);
        return { success: true, plan: match.plan, label: match.label };
      }

      // 2. Check remote validator if registered (e.g. Cloudflare Worker)
      if (remoteValidator && typeof remoteValidator === 'function') {
        try {
          const res = await remoteValidator(code);
          if (res && res.valid) {
            const user = {
              ...(this.currentUser || {}),
              plan: res.plan || 'online_pass',
              planLabel: res.label || 'Verified License',
              licenseCode: code,
              allowedGrades: res.allowedGrades || ['all'],
              unlockedAt: Date.now()
            };
            this._saveUser(user);
            this._emitRedeemed(code, res);
            return { success: true, plan: user.plan, label: user.planLabel };
          }
        } catch(err) {
          console.warn('[AppAuth] Remote code validation failed:', err);
        }
      }

      return { success: false, error: 'Invalid or unrecognized access code' };
    },

    registerRemoteValidator(validatorFn) {
      if (typeof validatorFn === 'function') {
        remoteValidator = validatorFn;
      }
    },

    _saveUser(user) {
      this.currentUser = user;
      try {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(this.currentUser));
      } catch(e) {}
    },

    _emitRedeemed(code, details) {
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('auth:code_redeemed', {
          detail: { code, details }
        }));
        window.dispatchEvent(new CustomEvent('auth:change', {
          detail: { user: this.currentUser, loggedIn: this.isLoggedIn() }
        }));
      }
    },

    getAccessStatus() {
      if (this.currentUser && this.currentUser.planLabel) {
        return {
          plan: this.currentUser.plan,
          label: this.currentUser.planLabel,
          isLicensed: true,
          badgeColor: '#10b981'
        };
      }
      if (this.mode === 'open') {
        return {
          plan: 'open_community',
          label: 'Open Community Access',
          isLicensed: true,
          badgeColor: '#3b82f6'
        };
      }
      return {
        plan: 'restricted',
        label: 'Account / Passcode Required',
        isLicensed: false,
        badgeColor: '#f59e0b'
      };
    },

    login(userData) {
      const user = {
        email: userData.email || '',
        name: userData.name || 'Parent',
        avatar: userData.avatar || '👤',
        plan: userData.plan || (this.currentUser ? this.currentUser.plan : 'free'),
        planLabel: userData.planLabel || (this.currentUser ? this.currentUser.planLabel : null),
        allowedGrades: userData.allowedGrades || ['class_5'],
        loggedInAt: Date.now()
      };
      this._saveUser(user);

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
      return this.currentUser !== null && !!this.currentUser.email;
    }
  };

  root.AppAuth = AppAuth;

})(typeof window !== 'undefined' ? window : globalThis);
