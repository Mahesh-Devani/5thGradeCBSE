/**
 * ==========================================================================
 * SST CHAPTERS PRACTICE — CLASS 5 CBSE
 * Interactive Conceptual Learning & Revision Engine
 * Aligned to CBSE Curriculum & Term 1 School Revision Worksheet
 * ==========================================================================
 */

// ==================== STORAGE & STATE KEYS ====================
const STORAGE_KEY_STATE = 'cbse5_sst_active_state';
const STORAGE_KEY_STARS_PREFIX = 'cbse5_sst_stars_';


// ==================== SHARED AUDIO & CONFETTI ADAPTERS ====================
const sfx = {
  click: () => (window.AppAudio ? window.AppAudio.click() : null),
  correct: () => (window.AppAudio ? window.AppAudio.correct() : null),
  wrong: () => (window.AppAudio ? window.AppAudio.wrong() : null),
  complete: () => (window.AppAudio ? window.AppAudio.fanfare() : null)
};

class ConfettiEngine {
  constructor(canvasId) {
    this.canvasId = canvasId;
  }
  blast() {
    if (window.AppConfetti) {
      window.AppConfetti.launch();
    } else if (typeof launchConfetti === 'function') {
      launchConfetti();
    }
  }
}

// ==================== CURRICULUM CHAPTER DATA STORE ====================
// Aggregated from modular data files in sst_chapters/data/
const CHAPTERS_DATA = [
  CHAPTER_L5_DRC,
  CHAPTER_L6_GREENLAND,
  CHAPTER_L7_SAUDI,
  CHAPTER_L17_REVOLT1857,
  CHAPTER_L18_STRUGGLE,
  CHAPTER_L19_FREEDOM,
  CHAPTER_L20_GOVERNMENT
];

// ==================== APP STATE MACHINE ====================
class SSTApp {
  constructor() {
    this.activeChapterId = 'ch5_drc';
    this.activeMode = 'learn'; // 'learn' | 'practice' | 'challenge' | 'worksheet'
    this.activePracticeFilter = 'all'; // 'all' | 'blank' | 'tf' | 'match' | 'short' | 'long'
    
    // In-progress Practice Session
    this.practiceIndex = 0;
    this.practiceAnswered = {}; // { qId: { answered: bool, correct: bool, studentAnswer: str, revealed: bool } }
    this.practiceScore = { correct: 0, incorrect: 0 };
    this.studentDrafts = {}; // { qId: text }

    // Multi-milestone Chapter Progress
    this.chapterProgress = {}; // { [chapId]: { learnCardsRead: num, trapsDiagnosed: num, sprintHighScore: num, interactiveExplored: bool } }

    // Match interaction state
    this.matchSelectedLeft = null;
    this.matchedPairs = {}; // { qId: [leftId, ...] }

    // 60s Challenge State
    this.challengeTimer = null;
    this.challengeTimeLeft = 60;
    this.challengeScore = 0;
    this.challengeIndex = 0;
    this.challengeQuestions = [];

    // Confetti
    this.confetti = new ConfettiEngine('confetti-canvas');
  }

  init() {
    this.loadActiveState();

    // Wire top bar passport button
    const passportBtn = document.getElementById('btn-passport');
    if (passportBtn) {
      passportBtn.addEventListener('click', () => {
        sfx.click();
        this.openLearningPassport(this.activeChapterId);
      });
    }

    // Silently evaluate stars for all chapters on startup to sync existing solved questions
    CHAPTERS_DATA.forEach(chap => {
      this.evaluateAndAwardStars(chap.id, true);
    });

    this.renderSidebar();
    this.bindGlobalEvents();
    this.switchChapter(this.activeChapterId, false);
    this.setMode(this.activeMode, false);
    this.updateProgressHUD();
    this.updatePrintWorksheet();
  }

  // ==================== STATE PERSISTENCE ====================
  saveActiveState() {
    try {
      const stateObj = {
        activeChapterId: this.activeChapterId,
        activeMode: this.activeMode,
        activePracticeFilter: this.activePracticeFilter,
        practiceIndex: this.practiceIndex,
        practiceAnswered: this.practiceAnswered,
        practiceScore: this.practiceScore,
        studentDrafts: this.studentDrafts,
        chapterProgress: this.chapterProgress
      };
      localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(stateObj));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  loadActiveState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_STATE);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.activeChapterId && CHAPTERS_DATA.some(c => c.id === parsed.activeChapterId)) {
          this.activeChapterId = parsed.activeChapterId;
        }
        if (['learn', 'practice', 'challenge', 'worksheet'].includes(parsed.activeMode)) {
          this.activeMode = parsed.activeMode;
        }
        if (parsed.activePracticeFilter) {
          this.activePracticeFilter = parsed.activePracticeFilter;
        }
        if (typeof parsed.practiceIndex === 'number') {
          this.practiceIndex = parsed.practiceIndex;
        }
        if (parsed.practiceAnswered) this.practiceAnswered = parsed.practiceAnswered;
        if (parsed.practiceScore) this.practiceScore = parsed.practiceScore;
        if (parsed.studentDrafts) this.studentDrafts = parsed.studentDrafts;
        if (parsed.chapterProgress) this.chapterProgress = parsed.chapterProgress;
      }
    } catch (e) {
      console.warn('LocalStorage load failed:', e);
    }
  }

  getChapterStars(chapterId) {
    try {
      return parseInt(localStorage.getItem(STORAGE_KEY_STARS_PREFIX + chapterId) || '0', 10);
    } catch (e) {
      return 0;
    }
  }

  setChapterStars(chapterId, stars) {
    try {
      localStorage.setItem(STORAGE_KEY_STARS_PREFIX + chapterId, stars.toString());
    } catch (e) {
      console.warn(e);
    }
  }

  resetChapterProgress(chapterId) {
    try {
      localStorage.removeItem(STORAGE_KEY_STARS_PREFIX + chapterId);
      localStorage.setItem(STORAGE_KEY_STARS_PREFIX + chapterId, '0');
    } catch (e) {
      console.warn(e);
    }
    if (this.chapterProgress && this.chapterProgress[chapterId]) {
      this.chapterProgress[chapterId] = {
        cardsRead: {},
        trapsDiagnosed: {},
        interactiveExplored: false,
        sprintHighScore: 0
      };
    }
    const chap = CHAPTERS_DATA.find(c => c.id === chapterId);
    if (chap && chap.practiceQuestions) {
      chap.practiceQuestions.forEach(q => {
        delete this.practiceAnswered[q.id];
      });
    } else {
      this.practiceAnswered = {};
    }
    this.practiceIndex = 0;
    this.practiceScore = { correct: 0, incorrect: 0 };
    this.studentDrafts = {};
    this.saveActiveState();
    this.updateProgressHUD();
    this.renderSidebar();
    this.updateTopBarPassportButton();
    this.renderCurrentMode();
  }

  // ==================== MULTI-MILESTONE EVALUATOR & PASSPORT ====================
  getChapterProgressData(chapterId) {
    if (!this.chapterProgress[chapterId]) {
      this.chapterProgress[chapterId] = {
        cardsRead: {},
        trapsDiagnosed: {},
        interactiveExplored: false,
        sprintHighScore: 0
      };
    }
    const prog = this.chapterProgress[chapterId];
    if (!prog.cardsRead) prog.cardsRead = {};
    if (!prog.trapsDiagnosed) prog.trapsDiagnosed = {};

    const chap = CHAPTERS_DATA.find(c => c.id === chapterId) || CHAPTERS_DATA[0];
    const allQs = chap.practiceQuestions || [];

    let totalSolved = 0;
    const categorySolved = { blank: 0, tf: 0, match: 0, short: 0, long: 0 };

    allQs.forEach(q => {
      const st = this.practiceAnswered[q.id];
      if (st && (st.answered || st.correct || st.revealed)) {
        totalSolved++;
        if (categorySolved[q.type] !== undefined) {
          categorySolved[q.type]++;
        }
      }
    });

    const learnCardsRead = typeof prog.cardsRead === 'object'
      ? Object.values(prog.cardsRead).filter(Boolean).length
      : (prog.learnCardsRead || 0);

    const trapsDiagnosed = typeof prog.trapsDiagnosed === 'object'
      ? Object.values(prog.trapsDiagnosed).filter(Boolean).length
      : (prog.trapsDiagnosedCount || 0);

    return {
      cardsRead: prog.cardsRead,
      learnCardsRead,
      trapsDiagnosedMap: prog.trapsDiagnosed,
      trapsDiagnosed,
      interactiveExplored: !!prog.interactiveExplored,
      sprintHighScore: prog.sprintHighScore || 0,
      categorySolved,
      totalSolved
    };
  }

  evaluateAndAwardStars(chapterId, silent = false) {
    const milestones = CHAPTER_MILESTONES[chapterId] || [];
    if (milestones.length === 0) return 0;
    const data = this.getChapterProgressData(chapterId);

    let earnedStars = 0;
    milestones.forEach(m => {
      try {
        if (m.check(data)) {
          earnedStars++;
        }
      } catch (e) {
        console.warn(`Milestone check failed for ${m.id}:`, e);
      }
    });

    const prevStars = this.getChapterStars(chapterId);
    if (earnedStars > prevStars) {
      this.setChapterStars(chapterId, earnedStars);
      if (!silent) {
        sfx.complete();
        if (earnedStars >= 10) {
          this.confetti.blast();
        }
      }
    }
    this.updateProgressHUD();
    this.renderSidebar();
    this.updateTopBarPassportButton();
    return earnedStars;
  }

  updateTopBarPassportButton() {
    const btn = document.getElementById('btn-passport');
    if (!btn) return;
    const stars = this.getChapterStars(this.activeChapterId);
    const chap = CHAPTERS_DATA.find(c => c.id === this.activeChapterId) || CHAPTERS_DATA[0];
    const target = chap.targetStars || 10;
    btn.innerHTML = `📋 ⭐ ${stars}/${target} <span class="passport-btn-label">Passport</span>`;
  }

  renderChapterMasteryBanner(chap) {
    const stars = this.getChapterStars(chap.id);
    const target = chap.targetStars || 10;
    const pct = Math.round((stars / target) * 100);
    return `
      <div class="chapter-mastery-banner no-print" style="--chapter-theme: ${chap.themeColor}">
        <div class="mastery-banner-left">
          <div class="mastery-star-pill">
            <span>⭐</span>
            <span><strong>${stars}</strong> / ${target} Stars</span>
          </div>
          <div class="mastery-bar-track">
            <div class="mastery-bar-fill" style="width: ${pct}%;"></div>
          </div>
          <span class="mastery-pct-label">${pct}% Mastered ${stars === target ? '• 🏅 Certified!' : ''}</span>
        </div>
        <div class="mastery-banner-right">
          <button class="btn-passport-trigger" id="btn-banner-passport">
            📋 Learning Passport & Parent Report
          </button>
        </div>
      </div>
    `;
  }

  bindMasteryBannerEvents(container, chapterId) {
    if (!container) return;
    const bannerBtn = container.querySelector('#btn-banner-passport');
    if (bannerBtn) {
      bannerBtn.addEventListener('click', () => {
        sfx.click();
        this.openLearningPassport(chapterId);
      });
    }
  }

  openLearningPassport(chapterId) {
    const chap = CHAPTERS_DATA.find(c => c.id === chapterId) || CHAPTERS_DATA.find(c => c.id === this.activeChapterId) || CHAPTERS_DATA[0];
    const modal = document.getElementById('passport-modal');
    if (!modal) return;

    const milestones = CHAPTER_MILESTONES[chap.id] || [];
    const data = this.getChapterProgressData(chap.id);
    const clearedCount = milestones.filter(m => {
      try { return m.check(data); } catch (e) { return false; }
    }).length;
    const targetStars = chap.targetStars || 10;
    const isAllCleared = clearedCount >= targetStars;
    const pct = Math.round((clearedCount / targetStars) * 100);

    const iconEl = document.getElementById('passport-icon');
    const titleEl = document.getElementById('passport-title');
    const subtitleEl = document.getElementById('passport-subtitle');
    const starsEl = document.getElementById('passport-stars-display');
    const fillEl = document.getElementById('passport-progress-fill');
    const statusEl = document.getElementById('passport-status-text');

    if (iconEl) iconEl.textContent = chap.icon;
    if (titleEl) titleEl.textContent = `${chap.number}: ${chap.title} — Learning Passport`;
    if (subtitleEl) subtitleEl.textContent = `Parent & Teacher Comprehensive Audit Report • ${chap.tag}`;
    if (starsEl) starsEl.textContent = `⭐ ${clearedCount} / ${targetStars} Stars Earned`;
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (statusEl) statusEl.textContent = isAllCleared ? '🎉 Chapter Fully Certified! 100% Mastered' : `${pct}% Completed (${targetStars - clearedCount} milestones remaining)`;

    const listEl = document.getElementById('passport-milestones-list');
    if (listEl) {
      listEl.innerHTML = milestones.map((m, idx) => {
        let cleared = false;
        try { cleared = m.check(data); } catch (e) { cleared = false; }
        return `
          <div class="milestone-card ${cleared ? 'cleared' : 'pending'}">
            <div class="milestone-left">
              <div class="milestone-star-num">Star ${idx + 1}</div>
              <div class="milestone-status-icon">${cleared ? '✅' : '⏳'}</div>
            </div>
            <div class="milestone-center">
              <div class="milestone-title">${m.title}</div>
              <div class="milestone-desc">${m.desc}</div>
              ${!cleared ? `<div class="milestone-hint">👉 <strong>How to unlock:</strong> ${m.hint}</div>` : ''}
            </div>
            <div class="milestone-right">
              <span class="milestone-badge ${cleared ? 'badge-cleared' : 'badge-pending'}">
                ${cleared ? '✓ Verified ⭐' : 'In Progress'}
              </span>
            </div>
          </div>
        `;
      }).join('');
    }

    const guaranteeBox = document.getElementById('passport-guarantee-box');
    if (guaranteeBox) {
      if (isAllCleared) {
        guaranteeBox.style.display = 'block';
        guaranteeBox.innerHTML = `
          <div class="guarantee-inner">
            <div class="guarantee-seal">🏅</div>
            <div>
              <h4>Official Parent & Teacher Mastery Certificate</h4>
              <p>This certifies that <strong>the student has successfully completed 100% of all required concept lessons, diagnostic traps, practice categories, and rapid recall sprint</strong> for <strong>${chap.number}: ${chap.title}</strong>. Full conceptual understanding, critical thinking, and exam readiness are verified.</p>
            </div>
          </div>
        `;
      } else {
        guaranteeBox.style.display = 'none';
      }
    }

    const closeBtn = document.getElementById('btn-passport-close');
    const closeX = document.getElementById('btn-passport-close-x');
    const actionBtn = document.getElementById('btn-passport-action');

    const closeFn = () => {
      modal.classList.remove('active');
    };

    if (closeBtn) closeBtn.onclick = closeFn;
    if (closeX) closeX.onclick = closeFn;
    modal.onclick = (e) => {
      if (e.target === modal) closeFn();
    };

    if (actionBtn) {
      actionBtn.onclick = () => {
        closeFn();
        const pendingMilestone = milestones.find(m => {
          try { return !m.check(data); } catch (e) { return true; }
        });
        if (pendingMilestone) {
          if (pendingMilestone.id.startsWith('learn')) this.setMode('learn');
          else if (pendingMilestone.id.startsWith('interactive')) this.setMode('learn');
          else if (pendingMilestone.id.startsWith('exam')) this.setMode('learn');
          else if (pendingMilestone.id.startsWith('practice')) this.setMode('practice');
          else if (pendingMilestone.id.startsWith('sprint')) this.setMode('challenge');
        }
      };
    }

    modal.classList.add('active');
  }

  // ==================== SIDEBAR & NAVIGATION ====================
  renderSidebar() {
    const listEl = document.getElementById('sidebar-topics');
    if (!listEl) return;
    listEl.innerHTML = '';

    CHAPTERS_DATA.forEach(chap => {
      const stars = this.getChapterStars(chap.id);
      const target = chap.targetStars || 10;
      const pct = Math.round((stars / target) * 100);

      const item = document.createElement('div');
      item.className = `topic-item ${chap.id === this.activeChapterId ? 'active' : ''}`;
      item.dataset.chapterId = chap.id;
      item.innerHTML = `
        <div class="topic-item-header">
          <span class="topic-icon">${chap.icon}</span>
          <span class="topic-title">${chap.number}: ${chap.title}</span>
        </div>
        <p class="topic-desc">${chap.summary}</p>
        <div class="topic-meta">
          <span class="badge badge-active">${chap.tag}</span>
          <span class="topic-stars" title="${stars}/${target} Stars">⭐ ${stars}/${target}</span>
        </div>
        <div class="sidebar-mini-progress">
          <div class="mini-progress-fill" style="width: ${pct}%;"></div>
        </div>
      `;
      item.addEventListener('click', () => {
        sfx.click();
        this.switchChapter(chap.id);
        this.closeSidebar();
      });
      listEl.appendChild(item);
    });
  }

  switchChapter(chapterId, shouldSave = true) {
    this.activeChapterId = chapterId;
    const chap = CHAPTERS_DATA.find(c => c.id === chapterId) || CHAPTERS_DATA[0];

    // Update Topbar
    const titleEl = document.getElementById('top-bar-title');
    const subEl = document.getElementById('top-bar-subtitle');
    if (titleEl) titleEl.textContent = `${chap.number} — ${chap.title}`;
    if (subEl) subEl.textContent = chap.summary;

    // Update Sidebar Active state
    document.querySelectorAll('.topic-item').forEach(el => {
      el.classList.toggle('active', el.dataset.chapterId === chapterId);
    });

    // Reset index if switching chapters and not stored
    if (shouldSave) {
      this.practiceIndex = 0;
      this.saveActiveState();
    }

    this.renderCurrentMode();
    this.updateProgressHUD();
    this.updatePrintWorksheet();
  }

  setMode(mode, shouldSave = true) {
    this.activeMode = mode;
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });
    if (shouldSave) this.saveActiveState();
    this.renderCurrentMode();
  }

  bindGlobalEvents() {
    // Mobile Drawer Open / Close
    const menuBtn = document.getElementById('menu-toggle-btn');
    const closeBtn = document.getElementById('sidebar-close-btn');
    const backdrop = document.getElementById('sidebar-backdrop');
    const sidebar = document.getElementById('sidebar');

    if (menuBtn && sidebar && backdrop) {
      menuBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        backdrop.classList.add('active');
      });
    }
    if (closeBtn && sidebar && backdrop) {
      closeBtn.addEventListener('click', () => this.closeSidebar());
    }
    if (backdrop && sidebar) {
      backdrop.addEventListener('click', () => this.closeSidebar());
    }

    // Mode Tabs
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.addEventListener('click', e => {
        sfx.click();
        const mode = tab.dataset.mode;
        this.setMode(mode);
      });
    });

    // Top Bar Reset button
    const resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('🔄 Reset Chapter Progress: Reset this chapter\'s stars, practice answers, and progress back to 0 so you can practice and earn all 10 stars again?')) {
          this.resetChapterProgress(this.activeChapterId);
          sfx.click();
        }
      });
    }

    // Print Button
    const printBtn = document.getElementById('btn-print');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        this.updatePrintWorksheet();
        window.print();
      });
    }

    // Native browser print listener (Ctrl + P / browser menu)
    window.addEventListener('beforeprint', () => {
      this.updatePrintWorksheet();
    });
  }

  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  }

  updateProgressHUD() {
    let totalStars = 0;
    CHAPTERS_DATA.forEach(c => {
      totalStars += this.getChapterStars(c.id);
    });
    const maxStars = CHAPTERS_DATA.length * 10;
    const fillEl = document.getElementById('progress-fill');
    const labelEl = document.getElementById('progress-label');
    if (fillEl) {
      fillEl.style.width = `${Math.round((totalStars / maxStars) * 100)}%`;
    }
    if (labelEl) {
      labelEl.textContent = `${totalStars} / ${maxStars} Stars Earned`;
    }
    this.updateTopBarPassportButton();
  }

  // ==================== DISPATCH RENDERER ====================
  renderCurrentMode() {
    const container = document.getElementById('content-viewport');
    if (!container) return;
    container.innerHTML = '';

    switch (this.activeMode) {
      case 'learn':
        this.renderLearnMode(container);
        break;
      case 'practice':
        this.renderPracticeMode(container);
        break;
      case 'challenge':
        this.renderChallengeMode(container);
        break;
      case 'worksheet':
        this.renderWorksheetMode(container);
        break;
      default:
        this.renderLearnMode(container);
    }
  }

  // ==========================================================
  // MODE 1: LEARN & EXPLORE
  // ==========================================================
  renderLearnMode(container) {
    if (!container) container = document.getElementById('content-viewport');
    if (!container) return;
    container.innerHTML = '';
    const chap = CHAPTERS_DATA.find(c => c.id === this.activeChapterId) || CHAPTERS_DATA[0];

    // Progress state for this chapter
    if (!this.chapterProgress[chap.id]) {
      this.chapterProgress[chap.id] = {
        cardsRead: {},
        trapsDiagnosed: {},
        interactiveExplored: false,
        sprintHighScore: 0
      };
    }
    const prog = this.chapterProgress[chap.id];
    if (!prog.cardsRead) prog.cardsRead = {};
    if (!prog.trapsDiagnosed) prog.trapsDiagnosed = {};

    const wrap = document.createElement('div');
    wrap.className = 'learn-container';

    // Hero banner & chapter mastery banner
    wrap.innerHTML = `
      ${this.renderChapterMasteryBanner(chap)}

      <div class="chapter-hero-banner" style="border-left: 6px solid ${chap.themeColor};">
        <div class="chapter-hero-icon">${chap.icon}</div>
        <div class="chapter-hero-info">
          <h2>${chap.number}: ${chap.title}</h2>
          <p>${chap.summary}</p>
        </div>
      </div>

      <!-- Thinking Pillars Strip -->
      <div class="thinking-pillars-strip">
        <div class="pillar-card">
          <div class="pillar-icon">🧠</div>
          <div>
            <h4>Thinking & Deduction</h4>
            <p>Reason out causes rather than memorising dry lines.</p>
          </div>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon">💡</div>
          <div>
            <h4>Metacognitive Prompts</h4>
            <p>Guided self-talk before every question.</p>
          </div>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon">🧩</div>
          <div>
            <h4>Scaffold Studio</h4>
            <p>Break 5-mark long answers into easy bite-sized chunks.</p>
          </div>
        </div>
      </div>
    `;

    // Special Visual Feature for Rainforest Layers if DRC
    if (chap.id === 'ch5_drc') {
      const diag = document.createElement('div');
      diag.className = 'visual-diagram-card';
      diag.innerHTML = `
        <div class="diagram-title">🌲 3-Storey Rainforest Architectural Diagram</div>
        <div class="rainforest-layers-box">
          <div class="rf-layer rf-layer-emergent">
            <div class="rf-layer-text">
              <h4>1. Emergent Layer</h4>
              <p>Giant tall trees (40–50 m) piercing the canopy to grab direct sunlight and air currents.</p>
            </div>
            <div class="rf-layer-height">Top 40–50+ m</div>
          </div>
          <div class="rf-layer rf-layer-canopy">
            <div class="rf-layer-text">
              <h4>2. Canopy Layer</h4>
              <p>Thick, continuous umbrella roof formed by interlaced leaves; traps humidity & blocks sun.</p>
            </div>
            <div class="rf-layer-height">Mid 20–35 m</div>
          </div>
          <div class="rf-layer rf-layer-understory">
            <div class="rf-layer-text">
              <h4>3. Understory & Forest Floor</h4>
              <p>Dark, humid underworld with < 2% light; home to ferns, decomposing fungi, and shrubs.</p>
            </div>
            <div class="rf-layer-height">Ground 0–5 m</div>
          </div>
        </div>
        <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
          <button class="btn btn-sm ${prog.interactiveExplored ? 'btn-success' : 'btn-secondary'} btn-explore-diagram">
            ${prog.interactiveExplored ? '✅ Diagram Explored' : '🔬 Mark Diagram Explored'}
          </button>
        </div>
      `;
      diag.querySelector('.btn-explore-diagram').addEventListener('click', () => {
        sfx.click();
        prog.interactiveExplored = true;
        this.saveActiveState();
        this.evaluateAndAwardStars(chap.id);
        this.renderLearnMode(container);
      });
      wrap.appendChild(diag);
    }

    // Special Visual Feature for Iceberg & Inuit Life if Greenland
    if (chap.id === 'ch6_greenland') {
      const diag = document.createElement('div');
      diag.className = 'visual-diagram-card';
      diag.innerHTML = `
        <div class="diagram-title">🧊 Iceberg Anatomy & Traditional vs. Modern Inuit Life</div>
        
        <div class="iceberg-diagram-box">
          <div class="iceberg-zone iceberg-zone-tip">
            <div class="iceberg-zone-text">
              <h4>🏔️ Visible Tip (~10% Above Water)</h4>
              <p>What lookouts and sailors spot on the horizon; only a tiny fraction of the total ice mass.</p>
            </div>
            <div class="iceberg-zone-badge">Visible ~10%</div>
          </div>
          
          <div class="iceberg-waterline">
            <span>〰️ Sea Level Waterline (0 m) 〰️</span>
          </div>

          <div class="iceberg-zone iceberg-zone-submerged">
            <div class="iceberg-zone-text">
              <h4>🌊 Submerged Mountain (~90% Underwater)</h4>
              <p>Massive hidden bulk with wide, jagged underwater spurs that rip open ship hulls (e.g. Titanic).</p>
            </div>
            <div class="iceberg-zone-badge alert">Hidden ~90%</div>
          </div>
        </div>

        <div class="diagram-subtitle" style="margin-top: 18px; margin-bottom: 8px; font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">
          👥 Traditional Arctic Heritage vs. Modern Greenland Life
        </div>

        <div class="gov-table-wrapper">
          <table class="gov-table">
            <thead>
              <tr>
                <th>Feature / Aspect</th>
                <th>Traditional Nomadic Inuit</th>
                <th>Modern Greenland Today</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Winter Shelters</strong></td>
                <td>Temporary dome-shaped <em>Igloos (Aputiaks)</em> built of snow and ice blocks</td>
                <td>Permanent insulated wooden houses with electricity and central heating</td>
              </tr>
              <tr>
                <td><strong>Summer Shelters</strong></td>
                <td>Portable tents made of animal skins (sealskin tents)</td>
                <td>Permanent town homes in coastal settlements (Nuuk, Sisimiut)</td>
              </tr>
              <tr>
                <td><strong>Transport</strong></td>
                <td>Sledges pulled by dog teams (huskies) & single-paddle <em>kayaks</em></td>
                <td>High-speed motorized snowmobiles & modern motorized fishing boats</td>
              </tr>
              <tr>
                <td><strong>Clothing</strong></td>
                <td>Hand-sewn animal fur/skin parkas, mittens & sealskin boots</td>
                <td>Modern warm thermal winter clothing + traditional ceremonial parkas</td>
              </tr>
              <tr>
                <td><strong>Economy & Work</strong></td>
                <td>Subsistence seal/whale hunting & coastal fishing</td>
                <td>Commercial fish-processing factories, export industry & growing tourism</td>
              </tr>
              <tr>
                <td><strong>Infrastructure</strong></td>
                <td>Nomadic temporary hunting camps across ice and coast</td>
                <td>Modern towns with schools, hospitals, airports & sea highway networks</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
          <button class="btn btn-sm ${prog.interactiveExplored ? 'btn-success' : 'btn-secondary'} btn-explore-iceberg">
            ${prog.interactiveExplored ? '✅ Iceberg Explored' : '🔬 Mark Iceberg Explored'}
          </button>
        </div>
      `;
      diag.querySelector('.btn-explore-iceberg').addEventListener('click', () => {
        sfx.click();
        prog.interactiveExplored = true;
        this.saveActiveState();
        this.evaluateAndAwardStars(chap.id);
        this.renderLearnMode(container);
      });
      wrap.appendChild(diag);
    }

    // Special Visual Table for Government Structure if L-20
    if (chap.id === 'ch20_government') {
      const diag = document.createElement('div');
      diag.className = 'visual-diagram-card';
      diag.innerHTML = `
        <div class="diagram-title">🏛️ Three Tiers & Three Organs of Indian Governance</div>
        <div class="gov-table-wrapper">
          <table class="gov-table">
            <thead>
              <tr>
                <th>Tier / Level</th>
                <th>Legislative (Law Making)</th>
                <th>Judiciary (Justice)</th>
                <th>Executive Head</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Central Level</strong></td>
                <td>Parliament (Lok Sabha + Rajya Sabha)</td>
                <td>Supreme Court (New Delhi)</td>
                <td>Prime Minister (Real) / President (State)</td>
              </tr>
              <tr>
                <td><strong>State Level</strong></td>
                <td>State Legislative Assembly (Vidhan Sabha)</td>
                <td>High Court</td>
                <td>Chief Minister (Real) / Governor (Nominal)</td>
              </tr>
              <tr>
                <td><strong>Local Level</strong></td>
                <td>Municipalities (Urban) / Gram Sabha (Rural)</td>
                <td>District Courts / Nyaya Panchayat</td>
                <td>Mayor (Cities) / Sarpanch (Villages)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
          <button class="btn btn-sm ${prog.interactiveExplored ? 'btn-success' : 'btn-secondary'} btn-explore-gov">
            ${prog.interactiveExplored ? '✅ Structure Explored' : '🔬 Mark Structure Explored'}
          </button>
        </div>
      `;
      diag.querySelector('.btn-explore-gov').addEventListener('click', () => {
        sfx.click();
        prog.interactiveExplored = true;
        this.saveActiveState();
        this.evaluateAndAwardStars(chap.id);
        this.renderLearnMode(container);
      });
      wrap.appendChild(diag);
    }

    // Key Concept Grid
    const grid = document.createElement('div');
    grid.className = 'concept-grid';

    chap.learnCards.forEach((c, idx) => {
      const isRead = !!prog.cardsRead[idx];
      const card = document.createElement('div');
      card.className = `concept-card ${isRead ? 'card-completed' : ''}`;
      card.innerHTML = `
        <div class="concept-card-header">
          <span class="concept-card-icon">${c.icon}</span>
          <h3 class="concept-card-title">${c.title}</h3>
        </div>
        ${c.image ? `
          <div class="learn-diagram-wrap">
            <img src="${c.image}" alt="${c.imageAlt || c.title}" class="learn-diagram-img" loading="lazy">
            ${c.imageCaption ? `<div class="learn-diagram-caption">${c.imageCaption}</div>` : ''}
          </div>
        ` : ''}
        ${c.diagrams && c.diagrams.length > 0 ? `
          <div class="learn-diagram-grid ${c.diagrams.length === 1 ? 'single-item' : ''}">
            ${c.diagrams.map(d => `
              <div class="learn-diagram-item">
                <img src="${d.image}" alt="${d.caption || d.label || ''}" class="learn-diagram-img" loading="lazy">
                ${(d.caption || d.label) ? `<div class="learn-diagram-caption">${d.caption || d.label}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        <div class="concept-card-body">${c.body}</div>
        <div style="margin-top: 12px; padding-top: 10px; border-top: 1px dashed var(--border-color); display: flex; justify-content: flex-end;">
          <button class="btn btn-sm ${isRead ? 'btn-success' : 'btn-secondary'} btn-mark-read">
            ${isRead ? '✅ Read & Understood' : '📖 Mark as Read'}
          </button>
        </div>
      `;
      card.querySelector('.btn-mark-read').addEventListener('click', () => {
        sfx.click();
        prog.cardsRead[idx] = true;
        this.saveActiveState();
        this.evaluateAndAwardStars(chap.id);
        this.renderLearnMode(container);
      });
      grid.appendChild(card);
    });
    wrap.appendChild(grid);

    // Spot the Exam Trap Section
    if (chap.examTraps && chap.examTraps.length > 0) {
      chap.examTraps.forEach((trap, idx) => {
        const isDiagnosed = !!prog.trapsDiagnosed[idx];
        const trapCard = document.createElement('div');
        trapCard.className = `trap-card ${isDiagnosed ? 'trap-completed' : ''}`;
        trapCard.innerHTML = `
          <div class="trap-card-icon">🚨</div>
          <div class="trap-card-content" style="flex: 1;">
            <h3>Spot the Exam Trap: ${trap.trap}</h3>
            <p><strong>Examiner\'s Truth:</strong> ${trap.truth}</p>
            <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
              <button class="btn btn-sm ${isDiagnosed ? 'btn-success' : 'btn-secondary'} btn-mark-trap">
                ${isDiagnosed ? '✅ Trap Diagnosed & Avoided' : '🔍 I Understand & Avoid This Trap'}
              </button>
            </div>
          </div>
        `;
        trapCard.querySelector('.btn-mark-trap').addEventListener('click', () => {
          sfx.click();
          prog.trapsDiagnosed[idx] = true;
          this.saveActiveState();
          this.evaluateAndAwardStars(chap.id);
          this.renderLearnMode(container);
        });
        wrap.appendChild(trapCard);
      });
    }

    // Call to Action to Practice
    const cta = document.createElement('div');
    cta.style.textAlign = 'center';
    cta.style.marginTop = '16px';
    cta.innerHTML = `
      <button class="btn btn-primary" style="font-size: 1.05rem; padding: 12px 28px;">
        🧩 Ready to Practice Chapter Questions →
      </button>
    `;
    cta.querySelector('button').addEventListener('click', () => {
      sfx.click();
      this.setMode('practice');
    });
    wrap.appendChild(cta);

    this.bindMasteryBannerEvents(wrap, chap.id);
    container.appendChild(wrap);
  }

  // ==========================================================
  // MODE 2: PRACTICE & SOLVE
  // ==========================================================
  renderPracticeMode(container) {
    if (!container) container = document.getElementById('content-viewport');
    if (!container) return;
    container.innerHTML = '';
    const chap = CHAPTERS_DATA.find(c => c.id === this.activeChapterId) || CHAPTERS_DATA[0];
    const allQuestions = chap.practiceQuestions || [];

    // Filter questions based on filter chip
    let filteredQuestions = allQuestions;
    if (this.activePracticeFilter !== 'all') {
      filteredQuestions = allQuestions.filter(q => q.type === this.activePracticeFilter);
    }
    if (filteredQuestions.length === 0) {
      filteredQuestions = allQuestions;
    }

    // Ensure index bounds
    if (this.practiceIndex >= filteredQuestions.length) {
      this.practiceIndex = 0;
    }
    const currentQ = filteredQuestions[this.practiceIndex];

    const wrap = document.createElement('div');
    wrap.className = 'practice-container';
    wrap.innerHTML = this.renderChapterMasteryBanner(chap);

    // 1. Filter Chips Row
    const filterRow = document.createElement('div');
    filterRow.className = 'filter-bar';
    const filters = [
      { id: 'all', label: `✨ All (${allQuestions.length})` },
      { id: 'blank', label: `✏️ Blanks` },
      { id: 'tf', label: `⚖️ True/False` },
      { id: 'match', label: `🔗 Match` },
      { id: 'short', label: `💬 Short Qs` },
      { id: 'long', label: `🏗️ Long Answer Scaffolder` }
    ];

    filters.forEach(f => {
      const chip = document.createElement('button');
      chip.className = `filter-chip ${this.activePracticeFilter === f.id ? 'active' : ''}`;
      chip.textContent = f.label;
      chip.addEventListener('click', () => {
        sfx.click();
        this.activePracticeFilter = f.id;
        this.practiceIndex = 0;
        this.saveActiveState();
        this.renderPracticeMode(container);
      });
      filterRow.appendChild(chip);
    });
    wrap.appendChild(filterRow);

    // 2. Practice Stats Bar
    const statsBar = document.createElement('div');
    statsBar.className = 'practice-header-card';
    const stars = this.getChapterStars(chap.id);
    const target = chap.targetStars || 10;
    statsBar.innerHTML = `
      <div class="practice-progress-info">
        <span class="question-count-badge">Question ${this.practiceIndex + 1} of ${filteredQuestions.length}</span>
        <span class="practice-score-tally">
          Score: <span class="score-correct">${this.practiceScore.correct}</span> Correct | 
          <span class="score-incorrect">${this.practiceScore.incorrect}</span> Incorrect
        </span>
        <span class="practice-star-badge" style="font-weight: 700; color: var(--accent-amber); margin-left: 8px;">
          ⭐ ${stars}/${target} Stars
        </span>
      </div>
      <div class="practice-actions-row">
        <button class="btn btn-secondary btn-sm" id="btn-practice-restart">🔄 Restart Drill</button>
      </div>
    `;
    statsBar.querySelector('#btn-practice-restart').addEventListener('click', () => {
      this.practiceIndex = 0;
      this.practiceScore = { correct: 0, incorrect: 0 };
      this.studentDrafts = {};
      this.saveActiveState();
      this.renderPracticeMode(container);
      sfx.click();
    });
    wrap.appendChild(statsBar);

    // 3. Render Specific Question Card
    const qCard = document.createElement('div');
    qCard.className = 'question-card';

    // Header with type badge
    const qHeader = document.createElement('div');
    qHeader.className = 'question-header';
    const typeNames = {
      blank: 'Fill in the Blank',
      tf: 'True / False Reasoning',
      match: 'Match the Following',
      short: 'Short Conceptual Answer (2 Marks)',
      long: 'Long Answer Chunk & Conquer Studio (5 Marks)'
    };
    qHeader.innerHTML = `
      <span class="question-type-badge">${typeNames[currentQ.type] || 'Practice'}</span>
      <span class="thinking-prompt-pill">💡 CBSE Class 5</span>
    `;
    qCard.appendChild(qHeader);

    // Prompt
    const qPrompt = document.createElement('h3');
    qPrompt.className = 'question-prompt';
    qPrompt.textContent = currentQ.prompt;
    qCard.appendChild(qPrompt);

    // Question Authentic Diagram / Image (e.g. Worksheet Image)
    if (currentQ.image) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'question-diagram-wrap';
      imgWrap.innerHTML = `
        <img src="${currentQ.image}" alt="${currentQ.imageAlt || 'Question Diagram'}" class="question-diagram-img" loading="lazy">
        ${currentQ.imageCaption ? `<div class="question-diagram-caption">${currentQ.imageCaption}</div>` : ''}
      `;
      qCard.appendChild(imgWrap);
    }

    // Interaction Body depending on type
    const interactionBody = document.createElement('div');
    interactionBody.className = 'question-interactive-body';

    const qState = this.practiceAnswered[currentQ.id] || { answered: false, correct: false };

    switch (currentQ.type) {
      case 'blank':
        this.renderBlankInteraction(interactionBody, currentQ, qState, () => this.renderPracticeMode(container));
        break;
      case 'tf':
        this.renderTFInteraction(interactionBody, currentQ, qState, () => this.renderPracticeMode(container));
        break;
      case 'match':
        this.renderMatchInteraction(interactionBody, currentQ, qState, () => this.renderPracticeMode(container));
        break;
      case 'short':
        this.renderShortInteraction(interactionBody, currentQ, qState, () => this.renderPracticeMode(container));
        break;
      case 'long':
        this.renderLongScaffoldInteraction(interactionBody, currentQ, qState, () => this.renderPracticeMode(container));
        break;
    }
    qCard.appendChild(interactionBody);

    // Explanation / Feedback Card if answered or revealed
    if (qState.answered || qState.revealed) {
      const exp = document.createElement('div');
      exp.className = 'explanation-card';
      exp.innerHTML = `
        <h4>${qState.correct ? '✅ Conceptual Victory!' : '💡 Conceptual Explanation:'}</h4>
        <p>${currentQ.explanation || (currentQ.keyPoints ? currentQ.keyPoints.join(' ') : '')}</p>
      `;
      qCard.appendChild(exp);
    }

    // Navigation Buttons Row (Prev / Next)
    const navRow = document.createElement('div');
    navRow.className = 'question-nav-row';
    navRow.innerHTML = `
      <button class="btn btn-secondary" id="btn-prev-q" ${this.practiceIndex === 0 ? 'disabled' : ''}>
        ← Previous
      </button>
      <button class="btn btn-primary" id="btn-next-q">
        ${this.practiceIndex + 1 === filteredQuestions.length ? '🏁 Complete Drill' : 'Next Question →'}
      </button>
    `;

    navRow.querySelector('#btn-prev-q').addEventListener('click', () => {
      if (this.practiceIndex > 0) {
        sfx.click();
        this.practiceIndex--;
        this.saveActiveState();
        this.renderPracticeMode(container);
      }
    });

    navRow.querySelector('#btn-next-q').addEventListener('click', () => {
      sfx.click();
      if (this.practiceIndex + 1 < filteredQuestions.length) {
        this.practiceIndex++;
        this.saveActiveState();
        this.renderPracticeMode(container);
      } else {
        // Complete Drill
        this.showResultsModal(chap, filteredQuestions.length);
      }
    });

    qCard.appendChild(navRow);
    wrap.appendChild(qCard);
    this.bindMasteryBannerEvents(wrap, chap.id);
    container.appendChild(wrap);
  }

  // ==================== INTERACTION RENDERERS ====================

  // A. Fill in Blank
  renderBlankInteraction(container, question, qState, rerender) {
    const row = document.createElement('div');
    row.className = 'blank-input-row';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'blank-input';
    input.placeholder = 'Type your answer here...';
    input.value = qState.studentAnswer || '';
    if (qState.answered) {
      input.disabled = true;
      input.style.borderColor = qState.correct ? 'var(--color-success)' : 'var(--color-error)';
    }

    const checkBtn = document.createElement('button');
    checkBtn.className = 'btn btn-primary';
    checkBtn.textContent = 'Check Answer';
    if (qState.answered) checkBtn.disabled = true;

    const feedbackText = document.createElement('div');
    feedbackText.style.fontSize = '0.9rem';
    feedbackText.style.marginTop = '8px';

    const checkAnswer = () => {
      const val = input.value.trim().toLowerCase();
      if (!val) return;
      const isCorrect = question.acceptableAnswers.some(ans => val.includes(ans.toLowerCase()) || ans.toLowerCase().includes(val));

      if (isCorrect) {
        sfx.correct();
        this.flashFeedback('correct');
        this.practiceScore.correct++;
      } else {
        sfx.wrong();
        this.flashFeedback('wrong');
        this.practiceScore.incorrect++;
      }

      this.practiceAnswered[question.id] = {
        answered: true,
        correct: isCorrect,
        studentAnswer: input.value.trim()
      };
      this.saveActiveState();
      this.evaluateAndAwardStars(this.activeChapterId);
      rerender();
    };

    checkBtn.addEventListener('click', checkAnswer);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') checkAnswer();
    });

    row.appendChild(input);
    row.appendChild(checkBtn);
    container.appendChild(row);

    // Hint toggle if not answered
    if (!qState.answered && question.hint) {
      const hintBtn = document.createElement('button');
      hintBtn.className = 'btn btn-ghost btn-sm';
      hintBtn.style.marginTop = '8px';
      hintBtn.textContent = '💡 Show Hint';
      hintBtn.addEventListener('click', () => {
        hintBtn.textContent = `💡 Hint: ${question.hint}`;
      });
      container.appendChild(hintBtn);
    }
  }

  // B. True / False
  renderTFInteraction(container, question, qState, rerender) {
    const row = document.createElement('div');
    row.className = 'tf-buttons-row';

    const btnTrue = document.createElement('button');
    btnTrue.className = `btn-tf ${qState.studentAnswer === 'true' ? (question.isTrue ? 'selected-true' : 'selected-false') : ''}`;
    btnTrue.innerHTML = `<span>👍</span> <span>True</span>`;

    const btnFalse = document.createElement('button');
    btnFalse.className = `btn-tf ${qState.studentAnswer === 'false' ? (!question.isTrue ? 'selected-true' : 'selected-false') : ''}`;
    btnFalse.innerHTML = `<span>👎</span> <span>False</span>`;

    if (qState.answered) {
      btnTrue.disabled = true;
      btnFalse.disabled = true;
    }

    const selectChoice = choiceBool => {
      const isCorrect = choiceBool === question.isTrue;
      if (isCorrect) {
        sfx.correct();
        this.flashFeedback('correct');
        this.practiceScore.correct++;
      } else {
        sfx.wrong();
        this.flashFeedback('wrong');
        this.practiceScore.incorrect++;
      }

      this.practiceAnswered[question.id] = {
        answered: true,
        correct: isCorrect,
        studentAnswer: choiceBool ? 'true' : 'false'
      };
      this.saveActiveState();
      this.evaluateAndAwardStars(this.activeChapterId);
      rerender();
    };

    btnTrue.addEventListener('click', () => selectChoice(true));
    btnFalse.addEventListener('click', () => selectChoice(false));

    row.appendChild(btnTrue);
    row.appendChild(btnFalse);
    container.appendChild(row);

    // If false and answered, highlight the student correction
    if (qState.answered && question.correction) {
      const corrBox = document.createElement('div');
      corrBox.style.marginTop = '12px';
      corrBox.style.padding = '12px 16px';
      corrBox.style.borderRadius = 'var(--radius-sm)';
      corrBox.style.background = 'rgba(245, 158, 11, 0.1)';
      corrBox.style.border = '1px solid rgba(245, 158, 11, 0.3)';
      corrBox.innerHTML = `<strong>📝 Correction Required in Exam:</strong> ${question.correction}`;
      container.appendChild(corrBox);
    }
  }

  // C. Match the Following
  renderMatchInteraction(container, question, qState, rerender) {
    const matchWrap = document.createElement('div');
    matchWrap.className = 'match-interactive-container';

    if (!this.matchedPairs[question.id]) {
      this.matchedPairs[question.id] = [];
    }
    const matchedList = this.matchedPairs[question.id];

    // Left Column
    const leftCol = document.createElement('div');
    leftCol.className = 'match-column';
    leftCol.innerHTML = `<div class="match-col-header">Column A (Tap an item)</div>`;

    question.pairs.forEach((p, idx) => {
      const isMatched = matchedList.includes(idx);
      const isSelected = this.matchSelectedLeft === idx;
      const item = document.createElement('div');
      item.className = `match-item ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}`;
      item.innerHTML = `<span>${p.left}</span> <span>${isMatched ? '✅' : '👉'}</span>`;

      if (!isMatched) {
        item.addEventListener('click', () => {
          sfx.click();
          this.matchSelectedLeft = idx;
          rerender();
        });
      }
      leftCol.appendChild(item);
    });

    // Right Column (Shuffled order)
    const rightCol = document.createElement('div');
    rightCol.className = 'match-column';
    rightCol.innerHTML = `<div class="match-col-header">Column B (Match with selected)</div>`;

    // Static shuffle based on question id
    const indices = question.pairs.map((_, i) => i).reverse();

    indices.forEach(targetIdx => {
      const p = question.pairs[targetIdx];
      const isMatched = matchedList.includes(targetIdx);
      const item = document.createElement('div');
      item.className = `match-item ${isMatched ? 'matched' : ''}`;
      item.innerHTML = `<span>${p.right}</span> <span>${isMatched ? '✅' : '🎯'}</span>`;

      if (!isMatched) {
        item.addEventListener('click', () => {
          if (this.matchSelectedLeft === null) {
            alert('Please select an item from Column A first!');
            return;
          }
          if (this.matchSelectedLeft === targetIdx) {
            // Correct match
            sfx.correct();
            matchedList.push(targetIdx);
            this.matchSelectedLeft = null;
            if (matchedList.length === question.pairs.length) {
              this.practiceScore.correct++;
              this.practiceAnswered[question.id] = { answered: true, correct: true };
              this.flashFeedback('correct');
              this.saveActiveState();
              this.evaluateAndAwardStars(this.activeChapterId);
            } else {
              this.saveActiveState();
            }
            rerender();
          } else {
            // Wrong match
            sfx.wrong();
            this.flashFeedback('wrong');
            alert('Not a match! Think carefully and try again.');
          }
        });
      }
      rightCol.appendChild(item);
    });

    matchWrap.appendChild(leftCol);
    matchWrap.appendChild(rightCol);
    container.appendChild(matchWrap);

    if (matchedList.length === question.pairs.length) {
      const allDone = document.createElement('div');
      allDone.style.marginTop = '12px';
      allDone.style.color = 'var(--color-success)';
      allDone.style.fontWeight = '700';
      allDone.textContent = '🎉 All pairs perfectly matched!';
      container.appendChild(allDone);
    }
  }

  // D. Short Answer (2-Marks Thinking Check)
  renderShortInteraction(container, question, qState, rerender) {
    const box = document.createElement('div');
    box.className = 'short-answer-box';

    if (question.thinkingClue) {
      const clue = document.createElement('div');
      clue.className = 'thinking-clue-card';
      clue.textContent = question.thinkingClue;
      box.appendChild(clue);
    }

    // Student answer input textarea
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'short-input-wrapper';
    inputWrapper.innerHTML = `
      <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">
        ✍️ Your Answer (Write 1-2 points in your own words):
      </label>
    `;

    const textarea = document.createElement('textarea');
    textarea.className = 'student-textarea';
    textarea.style.minHeight = '90px';
    textarea.placeholder = 'Type your answer here... (e.g., mention key reasons or examples)';
    const savedDraft = this.studentDrafts[question.id] || qState.studentAnswer || '';
    textarea.value = savedDraft;

    textarea.addEventListener('input', e => {
      this.studentDrafts[question.id] = e.target.value;
      this.saveActiveState();
    });
    inputWrapper.appendChild(textarea);
    box.appendChild(inputWrapper);

    // Action buttons row
    const btnRow = document.createElement('div');
    btnRow.style.display = 'flex';
    btnRow.style.gap = '10px';
    btnRow.style.flexWrap = 'wrap';

    const checkBtn = document.createElement('button');
    checkBtn.className = 'btn btn-primary';
    checkBtn.textContent = qState.answered ? '✅ Check / Update Answer' : 'Submit & Check My Answer';

    const revealBtn = document.createElement('button');
    revealBtn.className = 'btn btn-secondary';
    revealBtn.textContent = qState.revealed ? '🔒 Hide Model Key Points' : '👁️ Reveal 2-Mark Model Key Points';

    checkBtn.addEventListener('click', () => {
      const val = textarea.value.trim();
      if (!val) {
        alert('Please type a few words or bullet points first!');
        textarea.focus();
        return;
      }
      sfx.correct();
      this.flashFeedback('correct');

      if (!qState.answered) {
        this.practiceScore.correct++;
      }

      this.practiceAnswered[question.id] = {
        answered: true,
        correct: true,
        revealed: true,
        studentAnswer: val
      };
      this.studentDrafts[question.id] = val;
      this.saveActiveState();
      this.evaluateAndAwardStars(this.activeChapterId);
      rerender();
    });

    revealBtn.addEventListener('click', () => {
      sfx.click();
      const nextRevealed = !qState.revealed;
      this.practiceAnswered[question.id] = {
        answered: qState.answered || false,
        correct: qState.correct || false,
        revealed: nextRevealed,
        studentAnswer: textarea.value.trim() || qState.studentAnswer || ''
      };
      this.saveActiveState();
      this.evaluateAndAwardStars(this.activeChapterId);
      rerender();
    });

    btnRow.appendChild(checkBtn);
    btnRow.appendChild(revealBtn);
    box.appendChild(btnRow);

    // If revealed or answered, show model key points
    if (qState.revealed) {
      const pointsCard = document.createElement('div');
      pointsCard.className = 'self-check-points';
      pointsCard.innerHTML = `
        <h4>🎯 2-Mark Standard CBSE Key Points (Self-Check):</h4>
        <ul>
          ${question.keyPoints.map(pt => `<li>${pt}</li>`).join('')}
        </ul>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px;">
          💡 <em>Compare your answer above with these CBSE examiner points. Did you cover both key reasons?</em>
        </p>
      `;
      box.appendChild(pointsCard);
    }

    container.appendChild(box);
  }

  // E. Long Answer Scaffold Studio ("Chunk & Conquer")
  renderLongScaffoldInteraction(container, question, qState, rerender) {
    const scaffold = document.createElement('div');
    scaffold.className = 'long-answer-scaffold';

    // Blueprint header
    const bpHeader = document.createElement('div');
    bpHeader.className = 'scaffold-blueprint-header';
    bpHeader.innerHTML = `
      <div class="scaffold-icon">🏗️</div>
      <div class="scaffold-text">
        <h3>Memory Scaffold: ${question.blueprintTitle || 'Answer Architect'}</h3>
        <p>Don't be bogged down by a huge answer! Master these <strong>${question.pillars.length} core building blocks</strong> to recollect effortlessly.</p>
      </div>
    `;
    scaffold.appendChild(bpHeader);

    // Current student draft text
    const currentDraft = this.studentDrafts[question.id] || '';

    // Pillars grid
    const pillarsGrid = document.createElement('div');
    pillarsGrid.className = 'scaffold-pillars-grid';

    question.pillars.forEach((pillar, idx) => {
      // Check if student draft covers keywords in this pillar
      const draftLower = currentDraft.toLowerCase();
      const matchCount = pillar.keywords.filter(kw => draftLower.includes(kw.toLowerCase())).length;
      const isCovered = matchCount >= 1;

      const pCard = document.createElement('div');
      pCard.className = `scaffold-pillar-card ${isCovered ? 'covered' : ''}`;
      pCard.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span class="pillar-number">${idx + 1}</span>
          <span style="font-size: 0.75rem; color: ${isCovered ? 'var(--color-success)' : 'var(--text-muted)'}; font-weight: 700;">
            ${isCovered ? '✅ Covered in your draft' : '⏳ Include in your draft'}
          </span>
        </div>
        <div class="pillar-heading">${pillar.title}</div>
        <div class="pillar-prompt">${pillar.prompt}</div>
        <div class="pillar-keywords">
          ${pillar.keywords.map(kw => {
            const kwMatched = draftLower.includes(kw.toLowerCase());
            return `<span class="keyword-tag ${kwMatched ? 'matched' : ''}">${kw}</span>`;
          }).join('')}
        </div>
      `;
      pillarsGrid.appendChild(pCard);
    });
    scaffold.appendChild(pillarsGrid);

    // Student Writing Scratchpad with Smart Live Concept Checker
    const notepad = document.createElement('div');
    notepad.className = 'student-notepad-card';
    notepad.innerHTML = `
      <div class="notepad-label">
        <span>✍️ Practice Writing / Bullet Notes Scratchpad</span>
        <span style="font-size: 0.75rem; color: var(--accent-amber);">Type your points below to test your recall</span>
      </div>
    `;

    const textarea = document.createElement('textarea');
    textarea.className = 'student-textarea';
    textarea.placeholder = 'Write your thoughts or bullet points here... (e.g. 1. Emergent layer has tall trees... 2. Canopy blocks sunlight...)';
    textarea.value = currentDraft;

    const feedbackBox = document.createElement('div');
    feedbackBox.className = 'keyword-detector-feedback';
    feedbackBox.style.display = currentDraft.trim() ? 'block' : 'none';

    const updateFeedback = text => {
      const textLower = text.toLowerCase();
      let coveredCount = 0;
      question.pillars.forEach(p => {
        if (p.keywords.some(kw => textLower.includes(kw.toLowerCase()))) {
          coveredCount++;
        }
      });
      feedbackBox.style.display = 'block';
      if (coveredCount === question.pillars.length) {
        feedbackBox.innerHTML = `
          <div style="color: var(--color-success); font-weight: 700;">
            🌟 Brilliant Recall! You touched upon all ${question.pillars.length} memory pillars in your notes!
          </div>
        `;
      } else {
        feedbackBox.innerHTML = `
          <div style="color: var(--accent-amber); font-weight: 600;">
            🔍 Progress: Covered <strong>${coveredCount} of ${question.pillars.length}</strong> pillars. Notice the highlighted tags above!
          </div>
        `;
      }
    };

    textarea.addEventListener('input', e => {
      this.studentDrafts[question.id] = e.target.value;
      if (e.target.value.trim().length > 10) {
        if (!this.practiceAnswered[question.id]) {
          this.practiceAnswered[question.id] = { answered: true, correct: true, revealed: false, studentAnswer: e.target.value };
        } else {
          this.practiceAnswered[question.id].answered = true;
          this.practiceAnswered[question.id].studentAnswer = e.target.value;
        }
      }
      this.saveActiveState();
      this.evaluateAndAwardStars(this.activeChapterId);
      updateFeedback(e.target.value);
    });

    notepad.appendChild(textarea);
    notepad.appendChild(feedbackBox);

    // Actions Row: Check & Reveal Model Answer
    const notepadActions = document.createElement('div');
    notepadActions.style.display = 'flex';
    notepadActions.style.gap = '10px';
    notepadActions.style.marginTop = '6px';

    const revealModelBtn = document.createElement('button');
    revealModelBtn.className = 'btn btn-secondary';
    revealModelBtn.textContent = qState.revealed ? '🔒 Hide 5-Mark Model Answer' : '📖 Read 5-Mark CBSE Model Answer';

    revealModelBtn.addEventListener('click', () => {
      sfx.click();
      this.practiceAnswered[question.id] = {
        answered: true,
        correct: true,
        revealed: !qState.revealed,
        studentAnswer: this.studentDrafts[question.id] || qState.studentAnswer || ''
      };
      this.saveActiveState();
      this.evaluateAndAwardStars(this.activeChapterId);
      rerender();
    });

    notepadActions.appendChild(revealModelBtn);
    notepad.appendChild(notepadActions);
    scaffold.appendChild(notepad);

    // Model Answer Box
    if (qState.revealed && question.modelAnswer) {
      const modelCard = document.createElement('div');
      modelCard.className = 'model-answer-card';
      modelCard.innerHTML = `
        <div class="model-answer-header">
          <span style="font-weight: 700; color: var(--color-success); font-size: 1.05rem;">
            🏆 Standard 5-Mark Model Answer
          </span>
          <span class="model-badge">CBSE Format</span>
        </div>
        <div class="model-answer-body">
          ${question.modelAnswer}
        </div>
      `;
      scaffold.appendChild(modelCard);
    }

    container.appendChild(scaffold);
  }

  // ==========================================================
  // MODE 3: 60-SECOND SPEED CHALLENGE
  // ==========================================================
  renderChallengeMode(container) {
    if (!container) container = document.getElementById('content-viewport');
    if (!container) return;
    container.innerHTML = '';
    const chap = CHAPTERS_DATA.find(c => c.id === this.activeChapterId) || CHAPTERS_DATA[0];

    const wrap = document.createElement('div');
    wrap.className = 'challenge-container';

    // If challenge not active
    if (!this.challengeTimer && this.challengeQuestions.length === 0) {
      wrap.innerHTML = `
        <div style="font-size: 4rem;">⚡</div>
        <h2>60-Second Rapid Recall Challenge</h2>
        <p style="color: var(--text-secondary); max-width: 500px;">
          Test how fast you can recall facts, dates, definitions, and concepts from <strong>${chap.title}</strong> before time runs out!
        </p>
        <button class="btn btn-primary" id="btn-start-challenge" style="padding: 14px 32px; font-size: 1.1rem; margin-top: 14px;">
          🚀 Start 60s Challenge!
        </button>
      `;
      wrap.querySelector('#btn-start-challenge').addEventListener('click', () => {
        this.startChallenge(chap, container);
      });
      container.appendChild(wrap);
      return;
    }

    // Active Challenge HUD
    const hud = document.createElement('div');
    hud.className = 'challenge-hud';
    hud.innerHTML = `
      <div class="hud-item">
        <span class="hud-value ${this.challengeTimeLeft <= 10 ? 'time-warning' : ''}" id="challenge-timer-display">${this.challengeTimeLeft}s</span>
        <span class="hud-label">Time Remaining</span>
      </div>
      <div class="hud-item">
        <span class="hud-value" style="color: var(--color-success);">${this.challengeScore}</span>
        <span class="hud-label">Score</span>
      </div>
      <div class="hud-item">
        <span class="hud-value" style="color: var(--accent-amber);">${this.challengeIndex + 1}/${this.challengeQuestions.length}</span>
        <span class="hud-label">Question</span>
      </div>
    `;
    wrap.appendChild(hud);

    // Current Question
    const q = this.challengeQuestions[this.challengeIndex];
    if (!q) {
      this.endChallenge(container);
      return;
    }

    const qCard = document.createElement('div');
    qCard.className = 'question-card';
    qCard.style.width = '100%';
    qCard.style.textAlign = 'left';

    qCard.innerHTML = `
      <div class="question-header">
        <span class="question-type-badge">Sprint Question</span>
      </div>
      <h3 class="question-prompt" style="font-size: 1.15rem;">${q.prompt}</h3>
    `;

    const btnRow = document.createElement('div');
    btnRow.style.display = 'grid';
    btnRow.style.gridTemplateColumns = '1fr 1fr';
    btnRow.style.gap = '12px';
    btnRow.style.marginTop = '14px';

    // Generate 4 options (1 correct + 3 plausible distractors)
    const options = this.getChallengeOptions(q);

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-secondary';
      btn.style.height = '48px';
      btn.style.fontSize = '0.95rem';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (opt === q.correctAnswer) {
          sfx.correct();
          this.challengeScore++;
          this.flashFeedback('correct');
        } else {
          sfx.wrong();
          this.flashFeedback('wrong');
        }
        if (typeof btn.blur === 'function') btn.blur();
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
          document.activeElement.blur();
        }
        this.challengeIndex++;
        if (this.challengeIndex >= this.challengeQuestions.length) {
          this.endChallenge(container);
        } else {
          this.renderChallengeMode(container);
        }
      });
      btnRow.appendChild(btn);
    });

    qCard.appendChild(btnRow);
    wrap.appendChild(qCard);
    container.appendChild(wrap);
  }

  startChallenge(chapter, container) {
    sfx.complete();
    this.challengeScore = 0;
    this.challengeIndex = 0;
    this.challengeTimeLeft = 60;

    // Build sprint questions from chapter
    this.challengeQuestions = this.generateSprintQuestions(chapter);

    if (this.challengeTimer) clearInterval(this.challengeTimer);
    this.challengeTimer = setInterval(() => {
      this.challengeTimeLeft--;
      const timerDisplay = document.getElementById('challenge-timer-display');
      if (timerDisplay) {
        timerDisplay.textContent = `${this.challengeTimeLeft}s`;
        if (this.challengeTimeLeft <= 10) timerDisplay.classList.add('time-warning');
      }
      if (this.challengeTimeLeft <= 0) {
        clearInterval(this.challengeTimer);
        this.challengeTimer = null;
        this.endChallenge(container);
      }
    }, 1000);

    this.renderChallengeMode(container);
  }

  endChallenge(container) {
    if (this.challengeTimer) {
      clearInterval(this.challengeTimer);
      this.challengeTimer = null;
    }
    sfx.complete();
    const chap = CHAPTERS_DATA.find(c => c.id === this.activeChapterId);

    // Save sprint high score
    if (!this.chapterProgress[chap.id]) {
      this.chapterProgress[chap.id] = {
        learnCardsRead: 0,
        trapsDiagnosed: 0,
        interactiveExplored: false,
        sprintHighScore: 0
      };
    }
    this.chapterProgress[chap.id].sprintHighScore = Math.max(
      this.chapterProgress[chap.id].sprintHighScore || 0,
      this.challengeScore
    );
    this.saveActiveState();

    this.evaluateAndAwardStars(chap.id);
    const currentStars = this.getChapterStars(chap.id);
    const targetStars = chap.targetStars || 10;

    const wrap = document.createElement('div');
    wrap.className = 'challenge-container';
    wrap.innerHTML = `
      <div style="font-size: 4rem;">🏆</div>
      <h2>Challenge Complete!</h2>
      <div class="stars-display" style="font-size: 1.6rem; margin: 10px 0; font-weight: 700; color: var(--accent-amber);">
        ⭐ ${currentStars} / ${targetStars} Chapter Mastery Stars Earned
      </div>
      <p style="font-size: 1.1rem; color: var(--text-secondary);">
        You scored <strong>${this.challengeScore} / ${this.challengeQuestions.length}</strong> points!
        ${this.challengeScore >= 7 ? '<br><span style="color:var(--color-success); font-weight:700;">🌟 Sprint Milestone Star Unlocked!</span>' : '<br><em>(Aim for 7+ points to unlock Star 10)</em>'}
      </p>
      <div style="display: flex; gap: 12px; margin-top: 20px; flex-wrap: wrap; justify-content: center;">
        <button class="btn btn-primary" id="btn-retry-sprint">🔁 Try Sprint Again</button>
        <button class="btn btn-secondary" id="btn-passport-from-sprint">📋 View Learning Passport</button>
        <button class="btn btn-ghost" id="btn-sprint-learn">📖 Review Concepts</button>
      </div>
    `;
    wrap.querySelector('#btn-retry-sprint').addEventListener('click', () => {
      this.startChallenge(chap, container);
    });
    wrap.querySelector('#btn-passport-from-sprint').addEventListener('click', () => {
      this.openLearningPassport(chap.id);
    });
    wrap.querySelector('#btn-sprint-learn').addEventListener('click', () => {
      this.setMode('learn');
    });

    container.innerHTML = '';
    container.appendChild(wrap);
    this.challengeQuestions = [];
  }

  generateSprintQuestions(chapter) {
    const list = [];
    // Extract blanks and true/false as quick sprint MCQs
    chapter.practiceQuestions.forEach(q => {
      if (q.type === 'blank') {
        list.push({
          prompt: q.prompt.replace(/______+/g, '_____'),
          correctAnswer: q.acceptableAnswers[0],
          distractors: ['1947', 'Africa', 'Wheat', 'Savannas', 'Kinshasa', 'Riyadh', '1757', 'Speaker', 'Governor', 'New Delhi', '1885', '1905', '1915', '1919', '1930', '1942', 'Bombay', 'Amritsar', 'Dandi', 'Moderates', 'Radicals', 'Revolutionaries', 'Kesari', 'Swadeshi', 'National']
        });
      } else if (q.type === 'tf') {
        list.push({
          prompt: `Is this statement True or False: "${q.prompt}"`,
          correctAnswer: q.isTrue ? 'True' : 'False',
          distractors: [q.isTrue ? 'False' : 'True', 'Cannot be determined', 'Partially True']
        });
      }
    });
    // Shuffle
    return list.sort(() => Math.random() - 0.5).slice(0, 10);
  }

  getChallengeOptions(q) {
    const options = [q.correctAnswer];
    const filteredDistractors = q.distractors.filter(d => d.toLowerCase() !== q.correctAnswer.toLowerCase());
    while (options.length < 4 && filteredDistractors.length > 0) {
      const rand = filteredDistractors.splice(Math.floor(Math.random() * filteredDistractors.length), 1)[0];
      options.push(rand);
    }
    return options.sort(() => Math.random() - 0.5);
  }

  // ==========================================================
  // MODE 4: PRINTABLE WORKSHEET
  // ==========================================================
  renderWorksheetMode(container) {
    if (!container) container = document.getElementById('content-viewport');
    if (!container) return;
    container.innerHTML = '';
    const chap = CHAPTERS_DATA.find(c => c.id === this.activeChapterId) || CHAPTERS_DATA[0];

    const wrap = document.createElement('div');
    wrap.className = 'worksheet-preview-container';

    // Controls bar
    const controls = document.createElement('div');
    controls.className = 'worksheet-controls-bar no-print';
    controls.innerHTML = `
      <div>
        <h3 style="font-size: 1.1rem; font-weight: 700;">🖨️ Revision Worksheet Preview</h3>
        <p style="font-size: 0.82rem; color: var(--text-secondary);">Formatted for standard A4 printing. Ready for school submission & self-study.</p>
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="btn btn-primary" id="btn-trigger-print">🖨️ Print Now</button>
      </div>
    `;
    controls.querySelector('#btn-trigger-print').addEventListener('click', () => {
      this.updatePrintWorksheet();
      window.print();
    });
    wrap.appendChild(controls);

    // Printable Paper
    const paper = document.createElement('div');
    paper.className = 'worksheet-paper';
    paper.innerHTML = `
      <div class="paper-header">
        <h2>CENTRAL BOARD OF SECONDARY EDUCATION (CBSE)</h2>
        <h3>Revision Worksheet: ${chap.number} — ${chap.title}</h3>
        <div class="paper-meta-row">
          <span>Student Name: ___________________________</span>
          <span>Grade: V &nbsp;&nbsp; Sec: _____</span>
          <span>Date: ____________</span>
        </div>
      </div>

      <div class="paper-section">
        <h4>I. Fill in the Blanks / Objective Questions</h4>
        ${chap.practiceQuestions.filter(q => q.type === 'blank').map((q, idx) => `
          <div class="paper-q">
            <strong>${idx + 1}.</strong> ${q.prompt}
          </div>
        `).join('')}
      </div>

      <div class="paper-section">
        <h4>II. State Whether True or False (Correct if False)</h4>
        ${chap.practiceQuestions.filter(q => q.type === 'tf').map((q, idx) => `
          <div class="paper-q">
            <strong>${idx + 1}.</strong> ${q.prompt} [ &nbsp; &nbsp; &nbsp; &nbsp; ]
            <div class="paper-lines" style="height: 26px;">Correction (if False): </div>
          </div>
        `).join('')}
      </div>

      <div class="paper-section">
        <h4>III. Match the Following</h4>
        ${chap.practiceQuestions.filter(q => q.type === 'match').map(q => `
          <div class="paper-q">
            <p><strong>${q.prompt}</strong></p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
              ${q.pairs.map((p, i) => `
                <tr>
                  <td style="padding: 4px; width: 45%;">(${i + 1}) ${p.left}</td>
                  <td style="padding: 4px; width: 10%;">[ &nbsp; &nbsp; ]</td>
                  <td style="padding: 4px; width: 45%;">(${String.fromCharCode(65 + i)}) ${p.right}</td>
                </tr>
              `).join('')}
            </table>
          </div>
        `).join('')}
      </div>

      <div class="paper-section">
        <h4>IV. Subjective & Conceptual Reasoning Questions</h4>
        ${chap.practiceQuestions.filter(q => q.type === 'short' || q.type === 'long').map((q, idx) => `
          <div class="paper-q">
            <strong>${idx + 1}.</strong> ${q.prompt}
            ${q.image ? `
              <div class="ws-diagram-wrap" style="margin: 8px 0; text-align: center;">
                <img src="${q.image}" alt="${q.imageAlt || 'Diagram'}" style="max-height: 140px; max-width: 100%; border-radius: 6px; border: 1px solid #cbd5e1;">
                ${q.imageCaption ? `<div style="font-size: 0.8rem; font-style: italic; color: #64748b; margin-top: 4px;">${q.imageCaption}</div>` : ''}
              </div>
            ` : ''}
            <div class="paper-lines"></div>
            <div class="paper-lines"></div>
          </div>
        `).join('')}
      </div>
    `;

    wrap.appendChild(paper);
    container.appendChild(wrap);
    this.updatePrintWorksheet();
  }

  updatePrintWorksheet() {
    const printContainer = document.getElementById('print-container');
    if (!printContainer) return;
    const chap = CHAPTERS_DATA.find(c => c.id === this.activeChapterId) || CHAPTERS_DATA[0];

    printContainer.innerHTML = `
      <div class="print-worksheet">
        <div class="paper-header">
          <h2>CENTRAL BOARD OF SECONDARY EDUCATION (CBSE)</h2>
          <h3>Revision Worksheet: ${chap.number} — ${chap.title}</h3>
          <div class="paper-meta-row">
            <span>Student Name: ___________________________</span>
            <span>Grade: V &nbsp;&nbsp; Sec: _____</span>
            <span>Date: ____________</span>
          </div>
        </div>

        <div class="paper-section">
          <h4>I. Fill in the Blanks / Objective Questions</h4>
          ${chap.practiceQuestions.filter(q => q.type === 'blank').map((q, idx) => `
            <div class="paper-q">
              <strong>${idx + 1}.</strong> ${q.prompt}
            </div>
          `).join('')}
        </div>

        <div class="paper-section">
          <h4>II. State Whether True or False (Correct if False)</h4>
          ${chap.practiceQuestions.filter(q => q.type === 'tf').map((q, idx) => `
            <div class="paper-q">
              <strong>${idx + 1}.</strong> ${q.prompt} [ &nbsp; &nbsp; &nbsp; &nbsp; ]
              <div class="paper-lines" style="height: 24px;">Correction (if False): </div>
            </div>
          `).join('')}
        </div>

        <div class="paper-section">
          <h4>III. Match the Following</h4>
          ${chap.practiceQuestions.filter(q => q.type === 'match').map(q => `
            <div class="paper-q">
              <p><strong>${q.prompt}</strong></p>
              <table>
                ${q.pairs.map((p, i) => `
                  <tr>
                    <td style="width: 45%;">(${i + 1}) ${p.left}</td>
                    <td style="width: 10%; text-align: center;">[ &nbsp; &nbsp; ]</td>
                    <td style="width: 45%;">(${String.fromCharCode(65 + i)}) ${p.right}</td>
                  </tr>
                `).join('')}
              </table>
            </div>
          `).join('')}
        </div>

        <div class="paper-section">
          <h4>IV. Subjective & Conceptual Reasoning Questions</h4>
          ${chap.practiceQuestions.filter(q => q.type === 'short' || q.type === 'long').map((q, idx) => `
            <div class="paper-q">
              <strong>${idx + 1}.</strong> ${q.prompt}
              ${q.image ? `
                <div class="ws-diagram-wrap" style="margin: 8px 0; text-align: center;">
                  <img src="${q.image}" alt="${q.imageAlt || 'Diagram'}" style="max-height: 140px; max-width: 100%; border-radius: 6px; border: 1px solid #cbd5e1;">
                  ${q.imageCaption ? `<div style="font-size: 0.8rem; font-style: italic; color: #64748b; margin-top: 4px;">${q.imageCaption}</div>` : ''}
                </div>
              ` : ''}
              <div class="paper-lines"></div>
              <div class="paper-lines"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ==================== FEEDBACK HELPERS ====================
  flashFeedback(type) {
    const flash = document.getElementById('feedback-flash');
    if (!flash) return;
    flash.className = `feedback-flash ${type}`;
    setTimeout(() => {
      flash.className = 'feedback-flash';
    }, 350);
  }

  showResultsModal(chapter, totalQuestions) {
    sfx.complete();
    const modal = document.getElementById('results-modal');
    if (!modal) return;

    this.evaluateAndAwardStars(chapter.id);
    const currentStars = this.getChapterStars(chapter.id);
    const targetStars = chapter.targetStars || 10;

    const correct = this.practiceScore.correct;
    const accuracy = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 100;

    this.updateProgressHUD();
    this.renderSidebar();

    if (currentStars >= targetStars) this.confetti.blast();

    const titleEl = document.getElementById('result-title');
    const msgEl = document.getElementById('result-message');
    const starsEl = document.getElementById('result-stars');
    const corEl = document.getElementById('result-correct');
    const totEl = document.getElementById('result-total');
    const accEl = document.getElementById('result-accuracy');

    if (titleEl) titleEl.textContent = currentStars >= targetStars ? 'Chapter Mastery Certified! 🏅' : 'Outstanding Effort!';
    if (msgEl) msgEl.textContent = `You completed the revision drill for ${chapter.number}: ${chapter.title}!`;
    if (starsEl) starsEl.textContent = `⭐ ${currentStars} / ${targetStars} Mastery Stars Earned`;
    if (corEl) corEl.textContent = correct.toString();
    if (totEl) totEl.textContent = totalQuestions.toString();
    if (accEl) accEl.textContent = `${accuracy}%`;

    modal.classList.add('active');

    const retryBtn = document.getElementById('btn-modal-retry');
    const reviewBtn = document.getElementById('btn-modal-review');
    const closeBtn = document.getElementById('btn-modal-close');

    if (retryBtn) {
      retryBtn.onclick = () => {
        modal.classList.remove('active');
        this.practiceIndex = 0;
        this.practiceScore = { correct: 0, incorrect: 0 };
        this.saveActiveState();
        this.renderPracticeMode(document.getElementById('content-viewport'));
      };
    }
    if (reviewBtn) {
      reviewBtn.onclick = () => {
        modal.classList.remove('active');
        this.setMode('learn');
      };
    }
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove('active');
      };
    }
  }
}

// ==================== INITIALIZE ON DOM READY ====================
document.addEventListener('DOMContentLoaded', () => {
  window.sstApp = new SSTApp();
  window.sstApp.init();
});
