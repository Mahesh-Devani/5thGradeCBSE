/**
 * 5th Grade CBSE — Standard Off-Canvas Responsive Drawer
 * Zero External Dependencies | Mobile-First Breakpoint (<= 860px)
 */

(function(global) {
  'use strict';

  function initDrawer() {
    const toggleBtn = document.getElementById('menu-toggle-btn') || document.querySelector('.menu-toggle-btn');
    const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
    const backdrop = document.getElementById('sidebar-backdrop') || document.querySelector('.sidebar-backdrop');
    const closeBtn = document.getElementById('sidebar-close-btn') || document.querySelector('.sidebar-close-btn');

    if (!sidebar || !backdrop) return;

    function open() {
      sidebar.classList.add('open');
      sidebar.classList.add('sidebar-open');
      backdrop.classList.add('active');
      document.body.classList.add('drawer-open');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function close() {
      sidebar.classList.remove('open');
      sidebar.classList.remove('sidebar-open');
      backdrop.classList.remove('active');
      document.body.classList.remove('drawer-open');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }

    function toggle() {
      if (sidebar.classList.contains('open') || sidebar.classList.contains('sidebar-open')) {
        close();
      } else {
        open();
      }
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggle();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        close();
      });
    }

    backdrop.addEventListener('click', close);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    // Auto-close on mobile when selecting a topic or chapter
    sidebar.addEventListener('click', (e) => {
      if (window.innerWidth <= 860) {
        const item = e.target.closest('.topic-item, .chapter-item, .sidebar-topic-item, a');
        if (item && !item.classList.contains('no-close-drawer')) {
          close();
        }
      }
    });

    return { open, close, toggle };
  }

  // Initialize automatically when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDrawer);
  } else {
    initDrawer();
  }

  global.AppDrawer = { init: initDrawer };
})(typeof window !== 'undefined' ? window : this);
