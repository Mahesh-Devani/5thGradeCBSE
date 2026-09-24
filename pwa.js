/* ==========================================================
   5th Grade CBSE — PWA Client Controller
   Handles Service Worker registration, install prompts,
   and seamless over-the-air update notifications.
   ========================================================== */

(() => {
  'use strict';

  // Determine sw.js URL and root scope relative to this script's location
  const currentScript = document.currentScript;
  const swUrl = currentScript 
    ? new URL('sw.js', currentScript.src).href 
    : './sw.js';
  const swScope = new URL('./', swUrl).pathname;

  let deferredInstallPrompt = null;
  let newWorkerWaiting = null;

  /* ----------------------------------------------------------
     1. Register Service Worker
     ---------------------------------------------------------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(swUrl, { scope: swScope })
        .then((registration) => {
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
  }

  /* ----------------------------------------------------------
     2. Update Toast Notification UI
     ---------------------------------------------------------- */
  function showUpdateToast() {
    if (document.getElementById('pwa-update-toast')) return;

    const toast = document.createElement('div');
    toast.id = 'pwa-update-toast';
    toast.className = 'pwa-update-toast';
    toast.innerHTML = `
      <div class="pwa-toast-content">
        <span class="pwa-toast-icon">✨</span>
        <div class="pwa-toast-text">
          <strong>New Lessons & Content Available!</strong>
          <small>Tap Update to load the latest CBSE curriculum updates.</small>
        </div>
      </div>
      <div class="pwa-toast-actions">
        <button id="pwa-update-btn" class="pwa-btn-update">Update Now</button>
        <button id="pwa-dismiss-btn" class="pwa-btn-dismiss" title="Dismiss">✕</button>
      </div>
    `;

    document.body.appendChild(toast);

    // Button interactions
    document.getElementById('pwa-update-btn')?.addEventListener('click', () => {
      if (newWorkerWaiting) {
        newWorkerWaiting.postMessage({ type: 'SKIP_WAITING' });
      }
      toast.remove();
    });

    document.getElementById('pwa-dismiss-btn')?.addEventListener('click', () => {
      toast.classList.add('pwa-toast-hidden');
      setTimeout(() => toast.remove(), 300);
    });
  }

  /* ----------------------------------------------------------
     3. Install App Prompt Handling (Android, Chrome, Edge)
     ---------------------------------------------------------- */
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent default mini-infobar
    e.preventDefault();
    deferredInstallPrompt = e;

    // Show custom install buttons if present on page
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

      // Hide install buttons
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
     4. iOS Safari Add to Home Screen Guidance
     ---------------------------------------------------------- */
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };
  const isInStandaloneMode = () => {
    return ('standalone' in window.navigator) && (window.navigator.standalone);
  };

  // If iOS and not running standalone, enable tooltip on install buttons
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

  // Export helper globally if needed
  window.CBSE5_PWA = {
    promptInstall,
    isIos,
    isInStandaloneMode
  };
})();
