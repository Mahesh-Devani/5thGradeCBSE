/* ==========================================================
   5th Grade CBSE — PWA Client Controller
   Handles Service Worker registration, active background
   update checks, install prompts, and instant over-the-air
   update notifications across both browser & installed PWA modes.
   ========================================================== */

(() => {
  'use strict';

  const APP_VERSION = '2.6.0';

  // Determine sw.js URL and root scope relative to this script's location
  const currentScript = document.currentScript;
  const swUrl = currentScript 
    ? new URL('sw.js', currentScript.src).href 
    : './sw.js';
  const swScope = new URL('./', swUrl).pathname;

  let swRegistration = null;
  let deferredInstallPrompt = null;
  let newWorkerWaiting = null;

  /* ----------------------------------------------------------
     1. Inject Self-Contained Styles for Update Notification
     ---------------------------------------------------------- */
  function injectPwaStyles() {
    if (document.getElementById('pwa-injected-styles')) return;
    const style = document.createElement('style');
    style.id = 'pwa-injected-styles';
    style.textContent = `
      .pwa-update-toast {
        position: fixed;
        bottom: calc(24px + env(safe-area-inset-bottom, 0px));
        left: 50%;
        transform: translateX(-50%);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        max-width: 92%;
        width: 520px;
        padding: 14px 20px;
        background: rgba(15, 23, 42, 0.96);
        border: 1px solid rgba(59, 130, 246, 0.5);
        border-radius: 16px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.75), 0 0 25px rgba(59, 130, 246, 0.35);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        animation: pwaSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      .pwa-update-toast.pwa-toast-hidden {
        opacity: 0;
        transform: translate(-50%, 20px);
        pointer-events: none;
      }
      @keyframes pwaSlideUp {
        from { opacity: 0; transform: translate(-50%, 30px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }
      .pwa-toast-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .pwa-toast-icon {
        font-size: 1.6rem;
        flex-shrink: 0;
        line-height: 1;
      }
      .pwa-toast-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .pwa-toast-text strong {
        font-size: 0.95rem;
        color: #f8fafc;
        font-weight: 700;
      }
      .pwa-toast-text small {
        font-size: 0.8rem;
        color: #94a3b8;
        line-height: 1.3;
      }
      .pwa-toast-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }
      .pwa-btn-update {
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        color: #ffffff;
        border: none;
        padding: 8px 18px;
        border-radius: 9999px;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
        transition: transform 0.15s ease, filter 0.15s ease;
        touch-action: manipulation;
        white-space: nowrap;
      }
      .pwa-btn-update:hover {
        filter: brightness(1.15);
        transform: scale(1.03);
      }
      .pwa-btn-dismiss {
        background: rgba(255, 255, 255, 0.08);
        color: #94a3b8;
        border: none;
        font-size: 0.9rem;
        width: 30px;
        height: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        transition: background 0.15s ease, color 0.15s ease;
        touch-action: manipulation;
      }
      .pwa-btn-dismiss:hover {
        background: rgba(255, 255, 255, 0.2);
        color: #ffffff;
      }
      .pwa-status-toast {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999999;
        background: rgba(16, 185, 129, 0.95);
        color: #ffffff;
        padding: 10px 20px;
        border-radius: 9999px;
        font-size: 0.86rem;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(16, 185, 129, 0.4);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        display: flex;
        align-items: center;
        gap: 8px;
        animation: pwaSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      }
      @keyframes pwaSlideDown {
        from { opacity: 0; transform: translate(-50%, -20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }
      .btn-pwa-refresh {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        touch-action: manipulation;
        font-size: 1.15rem;
        line-height: 1;
        transition: transform 0.25s ease;
      }
      .btn-pwa-refresh.is-spinning {
        animation: pwaSpin 0.75s linear infinite;
        pointer-events: none;
      }
      @keyframes pwaSpin {
        100% { transform: rotate(360deg); }
      }
      .pwa-drawer-footer {
        margin-top: auto;
        padding: 1rem 1.25rem;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        background: rgba(10, 14, 26, 0.5);
      }
      .pwa-drawer-refresh-btn {
        background: rgba(59, 130, 246, 0.12);
        border: 1px solid rgba(59, 130, 246, 0.3);
        color: #93c5fd;
        border-radius: 8px;
        padding: 0.45rem 0.8rem;
        font-size: 0.8rem;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        cursor: pointer;
        transition: all 0.2s ease;
        touch-action: manipulation;
      }
      .pwa-drawer-refresh-btn:hover {
        background: rgba(59, 130, 246, 0.25);
        color: #ffffff;
      }
      .pwa-version-tag {
        font-size: 0.72rem;
        color: #64748b;
        font-family: ui-monospace, SFMono-Regular, monospace;
      }
      @media (max-width: 540px) {
        .pwa-update-toast {
          flex-direction: column;
          align-items: stretch;
          gap: 12px;
          width: calc(100% - 24px);
          padding: 12px 14px;
        }
        .pwa-toast-actions {
          justify-content: flex-end;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /* ----------------------------------------------------------
     2. Update Toast Notification UI
     ---------------------------------------------------------- */
  function showUpdateToast() {
    injectPwaStyles();
    if (document.getElementById('pwa-update-toast')) return;

    const toast = document.createElement('div');
    toast.id = 'pwa-update-toast';
    toast.className = 'pwa-update-toast';
    toast.innerHTML = `
      <div class="pwa-toast-content">
        <span class="pwa-toast-icon">✨</span>
        <div class="pwa-toast-text">
          <strong>New Lessons & Content Available!</strong>
          <small>Tap Update to load the latest curriculum updates.</small>
        </div>
      </div>
      <div class="pwa-toast-actions">
        <button id="pwa-update-btn" class="pwa-btn-update" type="button">Update Now</button>
        <button id="pwa-dismiss-btn" class="pwa-btn-dismiss" type="button" title="Dismiss">✕</button>
      </div>
    `;

    document.body.appendChild(toast);

    // Button interactions
    document.getElementById('pwa-update-btn')?.addEventListener('click', () => {
      if (newWorkerWaiting) {
        newWorkerWaiting.postMessage({ type: 'SKIP_WAITING' });
      } else {
        // Fallback: reload page
        window.location.reload();
      }
      toast.remove();
    });

    document.getElementById('pwa-dismiss-btn')?.addEventListener('click', () => {
      toast.classList.add('pwa-toast-hidden');
      setTimeout(() => toast.remove(), 300);
    });
  }

  /* ----------------------------------------------------------
     3. Temporary Status Toast UI (e.g. "App is up to date")
     ---------------------------------------------------------- */
  function showStatusToast(message) {
    injectPwaStyles();
    const existing = document.getElementById('pwa-status-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'pwa-status-toast';
    toast.className = 'pwa-status-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, -20px)';
      setTimeout(() => toast.remove(), 350);
    }, 2500);
  }

  /* ----------------------------------------------------------
     4. Check for Updates Programmatically
     ---------------------------------------------------------- */
  function checkForUpdate(manual = false) {
    if (!('serviceWorker' in navigator)) {
      if (manual) showStatusToast('Service Worker not supported on this browser.');
      return;
    }

    const refreshBtns = document.querySelectorAll('.btn-pwa-refresh, .pwa-drawer-refresh-btn');
    if (manual) {
      refreshBtns.forEach(b => b.classList.add('is-spinning'));
    }

    if (swRegistration) {
      if (swRegistration.waiting) {
        newWorkerWaiting = swRegistration.waiting;
        showUpdateToast();
        refreshBtns.forEach(b => b.classList.remove('is-spinning'));
        return;
      }

      swRegistration.update()
        .then(() => {
          setTimeout(() => {
            refreshBtns.forEach(b => b.classList.remove('is-spinning'));
            if (!newWorkerWaiting && manual) {
              showStatusToast(`✓ App is up to date (v${APP_VERSION})`);
            }
          }, 1200);
        })
        .catch((err) => {
          console.warn('[PWA] Check update error:', err);
          refreshBtns.forEach(b => b.classList.remove('is-spinning'));
          if (manual) {
            showStatusToast('⚠️ Offline: Showing cached version.');
          }
        });
    } else {
      setTimeout(() => {
        refreshBtns.forEach(b => b.classList.remove('is-spinning'));
        if (manual) window.location.reload();
      }, 600);
    }
  }

  /* ----------------------------------------------------------
     5. Force Fresh Reload (Purges Caches)
     ---------------------------------------------------------- */
  async function forceRefresh() {
    if ('caches' in window) {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      } catch (e) {
        console.warn('[PWA] Cache purge failed:', e);
      }
    }
    window.location.reload(true);
  }

  /* ----------------------------------------------------------
     6. Register Service Worker & Active Listeners
     ---------------------------------------------------------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(swUrl, { scope: swScope })
        .then((registration) => {
          swRegistration = registration;

          // If there is already a worker waiting to activate
          if (registration.waiting) {
            newWorkerWaiting = registration.waiting;
            showUpdateToast();
          }

          // Listen for new worker installs
          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing;
            if (!installingWorker) return;

            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // A new update is ready!
                  newWorkerWaiting = registration.waiting || installingWorker;
                  showUpdateToast();
                }
              }
            });
          });

          // Proactive update check 2 seconds after page load
          setTimeout(() => {
            if (navigator.onLine) registration.update();
          }, 2000);
        })
        .catch((error) => {
          console.warn('[PWA] Service Worker registration failed:', error);
        });

      // Reload page once when new worker takes control
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    });

    // Check for updates on visibility change (when returning to app)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && navigator.onLine && swRegistration) {
        swRegistration.update();
      }
    });

    // Check for updates on window focus
    window.addEventListener('focus', () => {
      if (navigator.onLine && swRegistration) {
        swRegistration.update();
      }
    });

    // Periodic check every 15 minutes
    setInterval(() => {
      if (navigator.onLine && swRegistration) {
        swRegistration.update();
      }
    }, 15 * 60 * 1000);
  }

  /* ----------------------------------------------------------
     7. Auto-Attach UI Controls (Top Bar & Drawer Refresh Buttons)
     ---------------------------------------------------------- */
  function attachRefreshControls() {
    injectPwaStyles();

    // 1. Mount Refresh button in .top-bar-actions if present
    const topBarActions = document.querySelector('.top-bar-actions');
    if (topBarActions && !document.getElementById('btn-pwa-refresh')) {
      const refreshBtn = document.createElement('button');
      refreshBtn.id = 'btn-pwa-refresh';
      refreshBtn.className = 'btn btn-icon btn-pwa-refresh';
      refreshBtn.setAttribute('title', 'Check for updates & refresh app');
      refreshBtn.setAttribute('aria-label', 'Check for updates');
      refreshBtn.innerHTML = '⟳';
      refreshBtn.addEventListener('click', (e) => {
        e.preventDefault();
        checkForUpdate(true);
      });

      const resetBtn = topBarActions.querySelector('#btn-reset');
      if (resetBtn) {
        topBarActions.insertBefore(refreshBtn, resetBtn);
      } else {
        topBarActions.appendChild(refreshBtn);
      }
    }

    // 2. Mount "Check for Updates" in .sidebar if present
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && !document.getElementById('pwa-drawer-refresh')) {
      const footer = document.createElement('div');
      footer.className = 'pwa-drawer-footer';
      footer.innerHTML = `
        <button id="pwa-drawer-refresh" class="pwa-drawer-refresh-btn" type="button">
          <span class="pwa-refresh-icon">🔄</span> Check for Updates
        </button>
        <span class="pwa-version-tag">v${APP_VERSION}</span>
      `;
      sidebar.appendChild(footer);
      footer.querySelector('#pwa-drawer-refresh')?.addEventListener('click', (e) => {
        e.preventDefault();
        checkForUpdate(true);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachRefreshControls);
  } else {
    attachRefreshControls();
  }

  /* ----------------------------------------------------------
     8. Install App Prompt Handling (Android, Chrome, Edge)
     ---------------------------------------------------------- */
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;

    const installBtns = document.querySelectorAll('.pwa-install-trigger');
    installBtns.forEach((btn) => {
      btn.style.display = 'inline-flex';
      btn.addEventListener('click', promptInstall);
    });
  });

  function promptInstall() {
    if (!deferredInstallPrompt) return;

    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt');
      } else {
        console.log('[PWA] User dismissed the install prompt');
      }
      deferredInstallPrompt = null;

      const installBtns = document.querySelectorAll('.pwa-install-trigger');
      installBtns.forEach((btn) => btn.style.display = 'none');
    });
  }

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App successfully installed');
    deferredInstallPrompt = null;
    const installBtns = document.querySelectorAll('.pwa-install-trigger');
    installBtns.forEach((btn) => btn.style.display = 'none');
  });

  /* ----------------------------------------------------------
     9. iOS Safari Add to Home Screen Guidance
     ---------------------------------------------------------- */
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };
  const isInStandaloneMode = () => {
    return ('standalone' in window.navigator) && (window.navigator.standalone);
  };

  if (isIos() && !isInStandaloneMode()) {
    window.addEventListener('DOMContentLoaded', () => {
      const installBtns = document.querySelectorAll('.pwa-install-trigger');
      installBtns.forEach((btn) => {
        btn.style.display = 'inline-flex';
        btn.addEventListener('click', () => {
          alert('To install on your iPhone or iPad:\n1. Tap the Share button (⎋) at the bottom/top of Safari.\n2. Scroll down and tap "Add to Home Screen" (➕).\n3. Tap "Add" to install the app!');
        });
      });
    });
  }

  // Export helper globally
  window.CBSE5_PWA = {
    checkForUpdate,
    forceRefresh,
    promptInstall,
    isIos,
    isInStandaloneMode,
    version: APP_VERSION
  };
})();
