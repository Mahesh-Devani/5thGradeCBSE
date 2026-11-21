/**
 * ==========================================================================
 * SCIENCE MASTER (CLASS 5 CBSE / EVS CURRICULUM)
 * Pedagogy-First Thinking Classroom, Diagnostic Traps & School Worksheets
 * ==========================================================================
 */

// ==========================================================================
// 1. UNIFIED AUDIO & CONFETTI DELEGATES (Shared Core Utilities)
// ==========================================================================
const AudioController = {
  correct: () => (window.AppAudio ? window.AppAudio.correct() : null),
  wrong: () => (window.AppAudio ? window.AppAudio.wrong() : null),
  fanfare: () => (window.AppAudio ? window.AppAudio.fanfare() : null),
  click: () => (window.AppAudio ? window.AppAudio.click() : null)
};

const ConfettiController = {
  launch: () => (window.AppConfetti ? window.AppConfetti.launch() : (typeof launchConfetti === 'function' ? launchConfetti() : null))
};

// ==========================================================================
// 3. CURRICULUM DATA STORE (Aggregated from modular chapter files in data/)
// ==========================================================================
const CHAPTERS_DATA = [
  CHAPTER_L2_ANIMALS,
  CHAPTER_L3_SKELETAL,
  CHAPTER_L4_NERVOUS,
  CHAPTER_L5_HEALTH,
  CHAPTER_L7_AIR_WATER,
  CHAPTER_L11_ROCKS,
  CHAPTER_L13_MATTER
];

// ==========================================================================
// 4. ACTIVE STATE & LOCALSTORAGE PERSISTENCE ENGINE
// ==========================================================================
const STORAGE_KEY_STATE = 'cbse5_science_active_state';
const STORAGE_KEY_STARS_PREFIX = 'cbse5_science_stars_';

let state = {
  activeChapterId: 'ch2_animals',
  chapterProgress: {}, // chapterId -> { learnCards: {}, labInteracted: false, sprintHighScore: 0 }
  activeMode: 'learn', // 'learn' | 'traps' | 'practice' | 'challenge' | 'worksheet'
  activePracticeFilter: 'all', // 'all' | 'mcq' | 'whoami' | 'compare' | 'oddone' | 'scenario'
  activeWsFilter: 'all', // 'all' | 1 | 2 | 3
  currentQuestionIndex: 0,
  questionQueue: [],
  scoreCorrect: 0,
  scoreWrong: 0,
  answeredMap: {}, // questionId -> { selectedIndex, isCorrect }
  trapAnswers: {}, // trapId -> selectedIndex
  // Interactive Labs state
  labStates: {
    moleculeState: 'solid',
    balloonState: 'balanced',
    dietNutrient: 'protein',
    animalSelected: 'eagle',
    // L-3 Skeletal Lab
    jointType: 'ball_socket',
    muscleArmState: 'flexed',
    // L-4 Nervous Lab
    brainPart: 'cerebrum',
    reflexTriggered: false,
    rockSample: 'pumice'
  },
  // Printable Worksheet settings
  worksheetSettings: {
    selectedWs: 'all',
    showAnswers: false
  },
  // Sprint state
  sprint: {
    running: false,
    timeLeft: 60,
    score: 0,
    currentIndex: 0,
    timerId: null
  }
};

function saveActiveState() {
  try {
    const serialized = {
      activeChapterId: state.activeChapterId,
      activeMode: state.activeMode,
      activePracticeFilter: state.activePracticeFilter,
      currentQuestionIndex: state.currentQuestionIndex,
      scoreCorrect: state.scoreCorrect,
      scoreWrong: state.scoreWrong,
      answeredMap: state.answeredMap,
      trapAnswers: state.trapAnswers,
      chapterProgress: state.chapterProgress,
      worksheetSettings: state.worksheetSettings,
      activeWsFilter: state.activeWsFilter
    };
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(serialized));
  } catch (e) {
    // Storage quota or privacy fallback
  }
}

function loadActiveState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATE);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.activeChapterId && CHAPTERS_DATA.some(c => c.id === parsed.activeChapterId)) {
        state.activeChapterId = parsed.activeChapterId;
      }
      if (['learn', 'traps', 'practice', 'revision', 'challenge', 'worksheet'].includes(parsed.activeMode)) {
        state.activeMode = parsed.activeMode;
      }
      if (parsed.activePracticeFilter) {
        state.activePracticeFilter = parsed.activePracticeFilter;
      }
      if (typeof parsed.currentQuestionIndex === 'number') {
        state.currentQuestionIndex = parsed.currentQuestionIndex;
      }
      if (typeof parsed.scoreCorrect === 'number') {
        state.scoreCorrect = parsed.scoreCorrect;
      }
      if (typeof parsed.scoreWrong === 'number') {
        state.scoreWrong = parsed.scoreWrong;
      }
      if (parsed.answeredMap) {
        state.answeredMap = parsed.answeredMap;
      }
      if (parsed.trapAnswers) {
        state.trapAnswers = parsed.trapAnswers;
      }
      if (parsed.chapterProgress && typeof parsed.chapterProgress === 'object') {
        state.chapterProgress = parsed.chapterProgress;
      }
      if (parsed.worksheetSettings) {
        state.worksheetSettings = parsed.worksheetSettings;
      }
      if (parsed.activeWsFilter) {
        state.activeWsFilter = parsed.activeWsFilter;
      }
    }
  } catch (e) {
    // Parsing error fallback
  }
}

function getChapterStars(chapterId) {
  try {
    const v = localStorage.getItem(STORAGE_KEY_STARS_PREFIX + chapterId);
    return v ? parseInt(v, 10) : 0;
  } catch (e) {
    return 0;
  }
}

function setChapterStars(chapterId, stars) {
  try {
    localStorage.setItem(STORAGE_KEY_STARS_PREFIX + chapterId, stars.toString());
    updateSidebarProgress();
  } catch (e) {
    // Storage fallback
  }
}

function resetChapterProgress(chapterId) {
  try {
    localStorage.removeItem(STORAGE_KEY_STARS_PREFIX + chapterId);
    localStorage.setItem(STORAGE_KEY_STARS_PREFIX + chapterId, '0');
  } catch (e) {
    console.warn(e);
  }
  if (state.chapterProgress && state.chapterProgress[chapterId]) {
    state.chapterProgress[chapterId] = {
      learnCards: {},
      learnAnswers: {},
      labInteracted: false,
      sprintHighScore: 0
    };
  }
  const ch = CHAPTERS_DATA.find(c => c.id === chapterId);
  if (ch && ch.questions) {
    ch.questions.forEach(q => {
      if (state.answeredMap) delete state.answeredMap[q.id];
    });
  }
  if (ch && ch.examTraps) {
    ch.examTraps.forEach(t => {
      if (state.trapAnswers) delete state.trapAnswers[t.id];
    });
  }
  state.currentQuestionIndex = 0;
  state.scoreCorrect = 0;
  state.scoreWrong = 0;
  saveActiveState();
  updateSidebarProgress();
  updateTopBarPassportButton();
  renderCurrentView();
}

function getChapterProgressData(chapterId) {
  const ch = CHAPTERS_DATA.find(c => c.id === chapterId);
  if (!ch) return { learnCards: {}, labInteracted: false, trapsCount: 0, trapsTotal: 0, categorySolved: {}, totalSolved: 0, totalQuestions: 0, sprintHighScore: 0, accuracy: 0 };

  const prog = (state.chapterProgress && state.chapterProgress[chapterId]) || {};
  const learnCards = prog.learnCards || {};
  const labInteracted = !!prog.labInteracted;
  const sprintHighScore = prog.sprintHighScore || 0;

  // Traps diagnosed
  let trapsCount = 0;
  if (ch.examTraps && ch.examTraps.length > 0) {
    ch.examTraps.forEach(trap => {
      const correctIdx = (typeof trap.correctIndex === 'number') ? trap.correctIndex : (typeof trap.correct === 'number' ? trap.correct : 0);
      if (state.trapAnswers && state.trapAnswers[trap.id] === correctIdx) {
        trapsCount++;
      }
    });
  }

  // Category solved
  const categorySolved = { mcq: 0, whoami: 0, compare: 0, oddone: 0, scenario: 0 };
  let totalSolved = 0;
  let totalAttempted = 0;
  ch.questions.forEach(q => {
    const ans = state.answeredMap && state.answeredMap[q.id];
    if (ans) {
      totalAttempted++;
      if (ans.isCorrect) {
        totalSolved++;
        const cat = q.category || 'mcq';
        categorySolved[cat] = (categorySolved[cat] || 0) + 1;
      }
    }
  });

  const accuracy = totalAttempted > 0 ? Math.round((totalSolved / totalAttempted) * 100) : 0;

  return {
    learnCards,
    labInteracted,
    trapsCount,
    trapsTotal: ch.examTraps ? ch.examTraps.length : 0,
    categorySolved,
    totalSolved,
    totalQuestions: ch.questions.length,
    sprintHighScore,
    accuracy
  };
}

function evaluateAndAwardStars(chapterId, silent = false) {
  const ch = CHAPTERS_DATA.find(c => c.id === chapterId);
  if (!ch) return 0;

  const milestones = CHAPTER_MILESTONES[chapterId] || [];
  const data = getChapterProgressData(chapterId);
  const clearedMilestones = milestones.filter(m => m.check(data));
  const targetStars = ch.targetStars || 10;
  const stars = Math.min(targetStars, clearedMilestones.length);

  const oldStars = getChapterStars(chapterId);
  if (stars > oldStars) {
    setChapterStars(chapterId, stars);
    if (!silent) {
      if (stars >= targetStars) {
        AudioController.fanfare();
        ConfettiController.launch();
      } else {
        AudioController.correct();
      }
    }
  }

  updateSidebarProgress();
  updateTopBarPassportButton();
  return stars;
}

function handleConceptCheckAnswer(chId, cardIdx, subIdx, optIdx, container) {
  const ch = CHAPTERS_DATA.find(c => c.id === chId);
  if (!ch || !ch.learnCards[cardIdx] || !ch.learnCards[cardIdx].checkQuestions) return;

  const qList = ch.learnCards[cardIdx].checkQuestions;
  const q = qList[subIdx];
  if (!q) return;

  const isCorrect = (optIdx === q.correct);

  state.chapterProgress = state.chapterProgress || {};
  state.chapterProgress[chId] = state.chapterProgress[chId] || {};
  state.chapterProgress[chId].learnCards = state.chapterProgress[chId].learnCards || {};
  state.chapterProgress[chId].learnAnswers = state.chapterProgress[chId].learnAnswers || {};

  if (typeof state.chapterProgress[chId].learnAnswers[cardIdx] !== 'object' || state.chapterProgress[chId].learnAnswers[cardIdx] === null) {
    state.chapterProgress[chId].learnAnswers[cardIdx] = {};
  }
  state.chapterProgress[chId].learnAnswers[cardIdx][subIdx] = optIdx;

  // Check if ALL subtopics in this card are cleared
  const allCleared = qList.every((item, i) => {
    return state.chapterProgress[chId].learnAnswers[cardIdx][i] === item.correct;
  });

  state.chapterProgress[chId].learnCards[cardIdx] = allCleared;
  saveActiveState();

  if (isCorrect) {
    AudioController.correct();
    triggerFlash('correct');

    if (allCleared) {
      AudioController.fanfare();
      ConfettiController.launch();
    }

    evaluateAndAwardStars(chId);
    renderLearnView(container);
  } else {
    AudioController.wrong();
    triggerFlash('wrong');

    const feedbackEl = document.getElementById(`check-feedback-${cardIdx}`);
    const optionsEl = document.getElementById(`check-options-${cardIdx}`);

    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.className = 'concept-feedback-box wrong';
      feedbackEl.innerHTML = `❌ <strong>Not quite!</strong> Re-read the subtopic above, then choose the correct deduction.`;
    }

    if (optionsEl) {
      const btns = optionsEl.querySelectorAll('.concept-opt-btn');
      btns.forEach(b => {
        const bOpt = parseInt(b.getAttribute('data-opt-idx'), 10);
        if (bOpt === optIdx) {
          b.classList.add('selected-wrong');
        } else {
          b.classList.remove('selected-wrong');
        }
      });
    }
  }
}

function switchSubtopicTab(cardIdx, subIdx, container) {
  state.activeSubtopicTabs = state.activeSubtopicTabs || {};
  state.activeSubtopicTabs[cardIdx] = subIdx;
  AudioController.click();
  renderLearnView(container);
}

function retakeConceptCheckQuestion(chId, cardIdx, subIdx, container) {
  state.chapterProgress = state.chapterProgress || {};
  state.chapterProgress[chId] = state.chapterProgress[chId] || {};
  state.chapterProgress[chId].learnCards = state.chapterProgress[chId].learnCards || {};
  state.chapterProgress[chId].learnAnswers = state.chapterProgress[chId].learnAnswers || {};

  if (state.chapterProgress[chId].learnAnswers[cardIdx]) {
    delete state.chapterProgress[chId].learnAnswers[cardIdx][subIdx];
  }
  state.chapterProgress[chId].learnCards[cardIdx] = false;
  saveActiveState();
  evaluateAndAwardStars(chId);
  AudioController.click();
  renderLearnView(container);
}

function markLabInteracted(chapterId) {
  state.chapterProgress = state.chapterProgress || {};
  state.chapterProgress[chapterId] = state.chapterProgress[chapterId] || {};
  if (!state.chapterProgress[chapterId].labInteracted) {
    state.chapterProgress[chapterId].labInteracted = true;
    saveActiveState();
    evaluateAndAwardStars(chapterId);
  }
}

function renderMasteryBanner(ch) {
  const stars = getChapterStars(ch.id);
  const target = ch.targetStars || 10;
  const pct = Math.round((stars / target) * 100);
  return `
    <div class="chapter-mastery-banner no-print" style="--chapter-theme: ${ch.themeColor}">
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

function bindMasteryBannerEvents(container, chapterId) {
  if (!container) return;
  const bannerBtn = container.querySelector('#btn-banner-passport');
  if (bannerBtn) {
    bannerBtn.addEventListener('click', () => {
      AudioController.click();
      openLearningPassport(chapterId);
    });
  }
}

function updateTopBarPassportButton() {
  const ch = getActiveChapter();
  const stars = getChapterStars(ch.id);
  const target = ch.targetStars || 10;
  const btn = document.getElementById('btn-passport');
  if (btn) {
    btn.innerHTML = `📋 <span class="passport-btn-label">⭐ ${stars}/${target}</span>`;
  }
}

function openLearningPassport(chapterId) {
  const ch = CHAPTERS_DATA.find(c => c.id === chapterId) || getActiveChapter();
  const modal = document.getElementById('passport-modal');
  if (!modal) return;

  const milestones = CHAPTER_MILESTONES[ch.id] || [];
  const data = getChapterProgressData(ch.id);
  const clearedCount = milestones.filter(m => m.check(data)).length;
  const targetStars = ch.targetStars || 10;
  const isAllCleared = clearedCount >= targetStars;
  const pct = Math.round((clearedCount / targetStars) * 100);

  document.getElementById('passport-icon').textContent = ch.icon;
  document.getElementById('passport-title').textContent = `${ch.number}: ${ch.title} — Learning Passport`;
  document.getElementById('passport-subtitle').textContent = `Parent & Teacher Comprehensive Audit Report • ${ch.sub}`;
  document.getElementById('passport-stars-display').textContent = `⭐ ${clearedCount} / ${targetStars} Stars Earned`;
  document.getElementById('passport-progress-fill').style.width = `${pct}%`;
  document.getElementById('passport-status-text').textContent = isAllCleared ? '🎉 Chapter Fully Certified! 100% Mastered' : `${pct}% Completed (${targetStars - clearedCount} milestones remaining)`;

  const listEl = document.getElementById('passport-milestones-list');
  if (listEl) {
    listEl.innerHTML = milestones.map((m, idx) => {
      const cleared = m.check(data);
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
            <p>This certifies that <strong>the student has successfully completed 100% of all required lessons, hands-on scientific labs, diagnostic traps, practice categories, and rapid recall sprint</strong> for <strong>${ch.number}: ${ch.title}</strong>. Full conceptual understanding, critical thinking, and exam readiness are verified.</p>
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
      // Find first pending milestone
      const pendingMilestone = milestones.find(m => !m.check(data));
      if (pendingMilestone) {
        if (pendingMilestone.id.startsWith('learn')) switchMode('learn');
        else if (pendingMilestone.id.startsWith('lab')) switchMode('learn');
        else if (pendingMilestone.id.startsWith('exam')) switchMode('traps');
        else if (pendingMilestone.id.startsWith('practice')) switchMode('practice');
        else if (pendingMilestone.id.startsWith('sprint')) switchMode('challenge');
      }
    };
  }

  modal.classList.add('active');
}

function getActiveChapter() {
  return CHAPTERS_DATA.find(c => c.id === state.activeChapterId) || CHAPTERS_DATA[0];
}

// ==========================================================================
// 5. UI INITIALIZATION & SIDEBAR CONTROLS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadActiveState();
  try {
    const params = new URLSearchParams(window.location.search);
    const qCh = params.get('ch');
    const qMode = params.get('mode');
    if (qCh && CHAPTERS_DATA.some(c => c.id === qCh)) {
      state.activeChapterId = qCh;
    }
    if (qMode && ['learn', 'traps', 'practice', 'revision', 'challenge', 'worksheet'].includes(qMode)) {
      state.activeMode = qMode;
    }
  } catch (e) {}

  // Retroactively evaluate and award stars for any previously solved items silently
  CHAPTERS_DATA.forEach(ch => {
    evaluateAndAwardStars(ch.id, true);
  });

  initSidebar();
  initTopBar();
  initModeTabs();
  renderCurrentView();
  updateSidebarProgress();
});

function initSidebar() {
  const container = document.getElementById('sidebar-topics');
  if (!container) return;
  container.innerHTML = '';

  CHAPTERS_DATA.forEach(ch => {
    const stars = getChapterStars(ch.id);
    const target = ch.targetStars || 10;
    const pct = Math.round((stars / target) * 100);

    const btn = document.createElement('button');
    btn.className = `chapter-btn ${ch.id === state.activeChapterId ? 'active' : ''}`;
    btn.setAttribute('data-chapter-id', ch.id);
    btn.innerHTML = `
      <span class="chapter-badge">${ch.number}</span>
      <div class="chapter-info">
        <div class="chapter-name">${ch.title}</div>
        <div class="chapter-sub">${ch.sub}</div>
        <div class="sidebar-mini-progress">
          <div class="mini-progress-fill" style="width: ${pct}%"></div>
        </div>
      </div>
      <div class="chapter-star-badge" title="${stars} of ${target} Mastery Stars Earned">⭐ ${stars}/${target}</div>
    `;

    btn.addEventListener('click', () => {
      AudioController.click();
      if (state.activeChapterId !== ch.id) {
        state.activeChapterId = ch.id;
        state.currentQuestionIndex = 0;
        // Recalculate session scores from answeredMap for this chapter
        const currentCh = CHAPTERS_DATA.find(c => c.id === ch.id);
        let correctInCh = 0;
        let wrongInCh = 0;
        if (currentCh) {
          currentCh.questions.forEach(q => {
            if (state.answeredMap[q.id]) {
              if (state.answeredMap[q.id].isCorrect) correctInCh++;
              else wrongInCh++;
            }
          });
        }
        state.scoreCorrect = correctInCh;
        state.scoreWrong = wrongInCh;
        saveActiveState();
        updateActiveSidebarButton();
        renderCurrentView();
        closeMobileSidebar();
      }
    });

    container.appendChild(btn);
  });

  // Mobile Drawer Toggle
  const toggleBtn = document.getElementById('menu-toggle-btn');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const closeBtn = document.getElementById('sidebar-close-btn');

  if (toggleBtn && sidebar && backdrop) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      backdrop.classList.add('active');
    });

    const closeHandler = () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeHandler);
    backdrop.addEventListener('click', closeHandler);
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateActiveSidebarButton() {
  const btns = document.querySelectorAll('.chapter-btn');
  btns.forEach(btn => {
    if (btn.getAttribute('data-chapter-id') === state.activeChapterId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const ch = getActiveChapter();
  const titleEl = document.getElementById('top-bar-title');
  const subEl = document.getElementById('top-bar-subtitle');
  if (titleEl) titleEl.textContent = `${ch.number}: ${ch.title}`;
  if (subEl) subEl.textContent = ch.sub;
}

function updateSidebarProgress() {
  let totalStars = 0;
  let maxStars = 0;
  CHAPTERS_DATA.forEach(ch => {
    const s = getChapterStars(ch.id);
    const target = ch.targetStars || 10;
    totalStars += s;
    maxStars += target;
    const starEl = document.querySelector(`.chapter-btn[data-chapter-id="${ch.id}"] .chapter-star-badge`);
    const fillEl = document.querySelector(`.chapter-btn[data-chapter-id="${ch.id}"] .mini-progress-fill`);
    const pct = Math.round((s / target) * 100);
    if (starEl) {
      starEl.textContent = `⭐ ${s}/${target}`;
      starEl.title = `${s} of ${target} Mastery Stars`;
      if (s === target) starEl.classList.add('gold');
      else starEl.classList.remove('gold');
    }
    if (fillEl) {
      fillEl.style.width = `${pct}%`;
    }
  });

  const overallPct = Math.round((totalStars / maxStars) * 100);
  const fillEl = document.getElementById('progress-fill');
  const labelEl = document.getElementById('progress-label');
  const badgeEl = document.getElementById('star-badge-total');

  if (fillEl) fillEl.style.width = `${overallPct}%`;
  if (labelEl) labelEl.textContent = `${overallPct}% Syllabus Mastered`;
  if (badgeEl) badgeEl.textContent = `⭐ ${totalStars} / ${maxStars}`;
  updateTopBarPassportButton();
}

function initTopBar() {
  const passportBtn = document.getElementById('btn-passport');
  if (passportBtn) {
    passportBtn.addEventListener('click', () => {
      AudioController.click();
      openLearningPassport(state.activeChapterId);
    });
  }

  const resetBtn = document.getElementById('btn-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      AudioController.click();
      if (confirm('🔄 Reset Chapter Progress: Reset this chapter\'s stars, practice answers, and progress back to 0 so you can practice and earn all 10 stars again?')) {
        resetChapterProgress(state.activeChapterId);
      }
    });
  }

  const printBtn = document.getElementById('btn-print');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      AudioController.click();
      switchMode('worksheet');
      setTimeout(() => window.print(), 350);
    });
  }
}

function updateActiveModeTabs() {
  const tabs = document.querySelectorAll('.mode-tab');
  tabs.forEach(tab => {
    if (tab.getAttribute('data-mode') === state.activeMode) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}

function initModeTabs() {
  updateActiveModeTabs();
  const tabs = document.querySelectorAll('.mode-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetMode = tab.getAttribute('data-mode');
      if (targetMode && state.activeMode !== targetMode) {
        AudioController.click();
        switchMode(targetMode);
      }
    });
  });
}

function switchMode(newMode) {
  state.activeMode = newMode;
  saveActiveState();
  updateActiveModeTabs();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderCurrentView();
}

function renderCurrentView() {
  updateActiveSidebarButton();
  updateActiveModeTabs();
  const viewport = document.getElementById('content-viewport');
  if (!viewport) return;

  switch (state.activeMode) {
    case 'learn':
      renderLearnView(viewport);
      break;
    case 'traps':
      renderTrapsView(viewport);
      break;
    case 'practice':
      renderPracticeView(viewport);
      break;
    case 'revision':
      renderRevisionView(viewport);
      break;
    case 'challenge':
      renderChallengeView(viewport);
      break;
    case 'worksheet':
      renderWorksheetView(viewport);
      break;
    default:
      renderLearnView(viewport);
  }
}

// ==========================================================================
// 6. MODE 1: LEARN & VISUAL LABS
// ==========================================================================
function renderLearnView(container) {
  const ch = getActiveChapter();

  let html = renderMasteryBanner(ch);

  html += `
    <div class="view-header">
      <div class="view-header-title">
        <h3>${ch.icon} ${ch.number}: ${ch.title}</h3>
        <p>${ch.summary}</p>
      </div>
    </div>
  `;

  // Render Interactive Visual Gadget
  html += renderInteractiveGadget(ch);

  const prog = (state.chapterProgress && state.chapterProgress[ch.id]) || {};
  const clearedCards = prog.learnCards || {};
  const learnAnswers = prog.learnAnswers || {};

  // Concept Cards Grid
  html += `<div class="learn-grid">`;
  ch.learnCards.forEach((card, idx) => {
    const isCleared = !!clearedCards[idx];
    const qList = card.checkQuestions || [];
    const totalSubtopics = qList.length;

    // Retrieve saved answers for this card
    let cardAnswers = learnAnswers[idx];
    if (typeof cardAnswers === 'number') {
      cardAnswers = { 0: cardAnswers };
    }
    cardAnswers = cardAnswers || {};

    // Count how many subtopics are cleared
    let clearedSubtopicCount = 0;
    qList.forEach((qItem, sIdx) => {
      if (cardAnswers[sIdx] === qItem.correct) clearedSubtopicCount++;
    });
    const isCardFullyCleared = (totalSubtopics > 0 && clearedSubtopicCount === totalSubtopics);

    // Active subtopic index: state.activeSubtopicTabs[idx] or first pending
    let activeSubIdx = 0;
    if (state.activeSubtopicTabs && typeof state.activeSubtopicTabs[idx] === 'number') {
      activeSubIdx = state.activeSubtopicTabs[idx];
    } else {
      // Find first unverified subtopic
      const firstPending = qList.findIndex((qItem, sIdx) => cardAnswers[sIdx] !== qItem.correct);
      activeSubIdx = firstPending !== -1 ? firstPending : 0;
    }
    if (activeSubIdx >= totalSubtopics) activeSubIdx = 0;

    const activeQ = qList[activeSubIdx];
    const isSubtopicCleared = activeQ && (cardAnswers[activeSubIdx] === activeQ.correct);
    const savedAnswer = activeQ ? cardAnswers[activeSubIdx] : undefined;

    html += `
      <div class="concept-card ${isCardFullyCleared ? 'cleared-card' : ''}" id="concept-card-${idx}">
        <span class="concept-badge">${card.badge}</span>
        <h4>${card.title}</h4>
        <div class="concept-metaphor">${card.metaphor}</div>

        <!-- Authentic Anatomical Diagrams & Figures -->
        ${card.image ? `
          <div class="learn-diagram-wrap">
            <img src="${card.image}" alt="${card.imageAlt || card.title}" class="learn-diagram-img" loading="lazy">
            ${card.imageCaption ? `<div class="learn-diagram-caption">${card.imageCaption}</div>` : ''}
          </div>
        ` : ''}
        ${card.diagrams && card.diagrams.length > 0 ? `
          <div class="learn-diagram-grid ${card.diagrams.length === 1 ? 'single-item' : ''}">
            ${card.diagrams.map(d => `
              <div class="learn-diagram-item">
                <img src="${d.image}" alt="${d.caption || d.label || ''}" class="learn-diagram-img" loading="lazy">
                ${(d.caption || d.label) ? `<div class="learn-diagram-caption">${d.caption || d.label}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <ul class="concept-points">
          ${card.points.map(pt => `<li>${pt}</li>`).join('')}
        </ul>
        <div class="think-box">
          <div class="think-icon">💡</div>
          <div class="think-text">
            <h5>Think About It:</h5>
            <p>${card.thinkPrompt}</p>
          </div>
        </div>

        <!-- Concept Question Checkpoints (Subtopics Micro-Quiz) -->
        ${totalSubtopics > 0 ? `
          <div class="concept-check-box ${isCardFullyCleared ? 'cleared' : ''}" id="concept-check-${idx}">
            <div class="concept-check-header">
              <span class="concept-check-title">🎯 Concept Checkpoints (${clearedSubtopicCount}/${totalSubtopics} Subtopics)</span>
              <span class="concept-check-badge ${isCardFullyCleared ? 'cleared' : 'pending'}">
                ${isCardFullyCleared ? '✓ All Subtopics Mastered ⭐' : `${clearedSubtopicCount}/${totalSubtopics} Verified`}
              </span>
            </div>

            <!-- Subtopic Tabs -->
            <div class="subtopic-nav-tabs">
              ${qList.map((qItem, sIdx) => {
                const isSubCleared = (cardAnswers[sIdx] === qItem.correct);
                const isActive = (sIdx === activeSubIdx);
                let btnCls = 'subtopic-tab-btn';
                if (isActive) btnCls += ' active';
                if (isSubCleared) btnCls += ' cleared';
                return `
                  <button class="${btnCls}" data-card-idx="${idx}" data-sub-idx="${sIdx}">
                    <span class="subtopic-tab-num">${isSubCleared ? '✓' : (sIdx + 1)}</span>
                    <span class="subtopic-tab-label">${qItem.subtopic}</span>
                  </button>
                `;
              }).join('')}
            </div>

            ${activeQ ? `
              <p class="concept-check-q">${activeQ.question}</p>

              <div class="concept-check-options" id="check-options-${idx}">
                ${activeQ.options.map((opt, optIdx) => {
                  let optClass = 'concept-opt-btn';
                  if (typeof savedAnswer === 'number') {
                    if (optIdx === activeQ.correct) optClass += ' selected-correct';
                    else if (optIdx === savedAnswer) optClass += ' selected-wrong';
                  }
                  const isBtnDisabled = isSubtopicCleared ? 'disabled' : '';
                  return `
                    <button class="${optClass}" data-card-idx="${idx}" data-sub-idx="${activeSubIdx}" data-opt-idx="${optIdx}" ${isBtnDisabled}>
                      <span class="concept-opt-label">${String.fromCharCode(65 + optIdx)}.</span>
                      <span class="concept-opt-text">${opt}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <div class="concept-feedback-box ${isSubtopicCleared ? 'correct' : ''}" id="check-feedback-${idx}" style="${isSubtopicCleared ? '' : 'display: none;'}">
                ${isSubtopicCleared ? `✅ <strong>Brilliant Reasoning!</strong> ${activeQ.explanation}` : ''}
              </div>

              ${isSubtopicCleared && activeSubIdx < totalSubtopics - 1 ? `
                <button class="subtopic-next-btn" data-card-idx="${idx}" data-next-sub="${activeSubIdx + 1}">
                  Next Subtopic: ${qList[activeSubIdx + 1].subtopic} ➔
                </button>
              ` : ''}

              ${isSubtopicCleared ? `
                <button class="concept-retake-btn" data-card-idx="${idx}" data-sub-idx="${activeSubIdx}">↺ Retake This Subtopic Question</button>
              ` : ''}
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  });
  html += `</div>`;

  container.innerHTML = html;
  attachGadgetEvents(ch);
  bindMasteryBannerEvents(container, ch.id);

  // Bind subtopic tab clicks
  const tabBtns = container.querySelectorAll('.subtopic-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cardIdx = parseInt(btn.getAttribute('data-card-idx'), 10);
      const subIdx = parseInt(btn.getAttribute('data-sub-idx'), 10);
      switchSubtopicTab(cardIdx, subIdx, container);
    });
  });

  // Bind option clicks
  const optBtns = container.querySelectorAll('.concept-opt-btn:not(:disabled)');
  optBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cardIdx = parseInt(btn.getAttribute('data-card-idx'), 10);
      const subIdx = parseInt(btn.getAttribute('data-sub-idx'), 10);
      const optIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
      handleConceptCheckAnswer(ch.id, cardIdx, subIdx, optIdx, container);
    });
  });

  // Bind next subtopic button clicks
  const nextBtns = container.querySelectorAll('.subtopic-next-btn');
  nextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cardIdx = parseInt(btn.getAttribute('data-card-idx'), 10);
      const nextSub = parseInt(btn.getAttribute('data-next-sub'), 10);
      switchSubtopicTab(cardIdx, nextSub, container);
      const cardEl = document.getElementById(`concept-card-${cardIdx}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // Bind retake question clicks
  const retakeBtns = container.querySelectorAll('.concept-retake-btn');
  retakeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cardIdx = parseInt(btn.getAttribute('data-card-idx'), 10);
      const subIdx = parseInt(btn.getAttribute('data-sub-idx'), 10);
      retakeConceptCheckQuestion(ch.id, cardIdx, subIdx, container);
    });
  });
}

function renderInteractiveGadget(ch) {
  if (ch.id === 'ch3_skeletal') {
    return renderSkeletalGadget();
  } else if (ch.id === 'ch4_nervous') {
    return renderNervousGadget();
  } else if (ch.id === 'ch11_rocks') {
    const currentSample = state.labStates.rockSample || 'pumice';
    return `
      <div class="interactive-lab-container">
        <div class="lab-title-bar">
          <h4>🪨 Interactive Rock & Mineral Detective Lab</h4>
          <div class="lab-controls">
            <button class="lab-btn ${currentSample === 'pumice' ? 'active' : ''}" data-rock="pumice">🧼 Pumice vs Basalt</button>
            <button class="lab-btn ${currentSample === 'granite' ? 'active' : ''}" data-rock="granite">🏛️ Granite Minerals</button>
            <button class="lab-btn ${currentSample === 'sandstone_limestone' ? 'active' : ''}" data-rock="sandstone_limestone">🏰 Red Fort & Chalk</button>
            <button class="lab-btn ${currentSample === 'metamorphic' ? 'active' : ''}" data-rock="metamorphic">⚡ Metamorphosis Chamber</button>
            <button class="lab-btn ${currentSample === 'coal_petroleum' ? 'active' : ''}" data-rock="coal_petroleum">⛏️ Coal & Black Gold</button>
          </div>
        </div>
        <div class="lab-stage" id="rock-stage">
          ${getRockStageHTML(currentSample)}
        </div>
        <div class="lab-explanation" id="rock-explanation">
          ${getRockExplanationHTML(currentSample)}
        </div>
      </div>
    `;
  } else if (ch.id === 'ch13_matter') {
    return `
      <div class="interactive-lab-container">
        <div class="lab-title-bar">
          <h4>🧪 Interactive Molecular Agitator</h4>
          <div class="lab-controls">
            <button class="lab-btn ${state.labStates.moleculeState === 'solid' ? 'active' : ''}" data-state="solid">🧊 Solid</button>
            <button class="lab-btn ${state.labStates.moleculeState === 'liquid' ? 'active' : ''}" data-state="liquid">💧 Liquid</button>
            <button class="lab-btn ${state.labStates.moleculeState === 'gas' ? 'active' : ''}" data-state="gas">💨 Gas</button>
          </div>
        </div>
        <div class="lab-stage" id="molecule-stage">
          <!-- Molecule Canvas Simulation rendered via SVG -->
          <svg viewBox="0 0 400 160" width="100%" height="160" id="molecule-svg"></svg>
        </div>
        <div class="lab-explanation" id="molecule-explanation">
          ${getMoleculeExplanation(state.labStates.moleculeState)}
        </div>
      </div>
    `;
  } else if (ch.id === 'ch7_air_water') {
    return `
      <div class="interactive-lab-container">
        <div class="lab-title-bar">
          <h4>🎈 Tina’s Balloon Balance & Mass Simulator</h4>
          <div class="lab-controls">
            <button class="lab-btn ${state.labStates.balloonState === 'balanced' ? 'active' : ''}" data-balloon="balanced">⚖️ Two Inflated Balloons</button>
            <button class="lab-btn ${state.labStates.balloonState === 'pricked' ? 'active' : ''}" data-balloon="pricked">📌 Prick Right Balloon!</button>
          </div>
        </div>
        <div class="lab-stage">
          <svg viewBox="0 0 440 180" class="balance-scale-svg" id="balance-svg"></svg>
        </div>
        <div class="lab-explanation" id="balloon-explanation">
          ${state.labStates.balloonState === 'balanced' 
            ? 'Both balloons are inflated with equal air. <strong>The scale remains balanced</strong>, proving both sides hold equal mass.' 
            : 'When the right balloon is pricked, air escapes! <strong>The left inflated balloon dips down</strong>, proving air has measurable weight and mass!'}
        </div>
      </div>
    `;
  } else if (ch.id === 'ch5_health') {
    return `
      <div class="interactive-lab-container">
        <div class="lab-title-bar">
          <h4>🥗 Nutrient Role & Deficiency Inspector</h4>
          <div class="lab-controls">
            <button class="lab-btn ${state.labStates.dietNutrient === 'protein' ? 'active' : ''}" data-nutrient="protein">🥩 Proteins</button>
            <button class="lab-btn ${state.labStates.dietNutrient === 'carbs' ? 'active' : ''}" data-nutrient="carbs">🍞 Carbohydrates</button>
            <button class="lab-btn ${state.labStates.dietNutrient === 'fats' ? 'active' : ''}" data-nutrient="fats">🧈 Fats</button>
            <button class="lab-btn ${state.labStates.dietNutrient === 'vitd' ? 'active' : ''}" data-nutrient="vitd">☀️ Vitamin D & Calcium</button>
            <button class="lab-btn ${state.labStates.dietNutrient === 'iron' ? 'active' : ''}" data-nutrient="iron">🥬 Iron</button>
            <button class="lab-btn ${state.labStates.dietNutrient === 'iodine' ? 'active' : ''}" data-nutrient="iodine">🧂 Iodine</button>
          </div>
        </div>
        <div class="lab-stage" id="nutrient-stage">
          ${getNutrientCard(state.labStates.dietNutrient)}
        </div>
      </div>
    `;
  } else {
    // L-2 Animals
    return `
      <div class="interactive-lab-container">
        <div class="lab-title-bar">
          <h4>🐾 Animal Adaptation & Survival Blueprint</h4>
          <div class="lab-controls">
            <button class="lab-btn ${state.labStates.animalSelected === 'eagle' ? 'active' : ''}" data-animal="eagle">🦅 Eagle</button>
            <button class="lab-btn ${state.labStates.animalSelected === 'penguin' ? 'active' : ''}" data-animal="penguin">🐧 Penguin</button>
            <button class="lab-btn ${state.labStates.animalSelected === 'fish' ? 'active' : ''}" data-animal="fish">🐟 Fish</button>
            <button class="lab-btn ${state.labStates.animalSelected === 'frog' ? 'active' : ''}" data-animal="frog">🐸 Frog</button>
            <button class="lab-btn ${state.labStates.animalSelected === 'whale' ? 'active' : ''}" data-animal="whale">🐋 Whale</button>
            <button class="lab-btn ${state.labStates.animalSelected === 'snake' ? 'active' : ''}" data-animal="snake">🐍 Snake</button>
          </div>
        </div>
        <div class="lab-stage" id="animal-stage">
          ${getAnimalCard(state.labStates.animalSelected)}
        </div>
      </div>
    `;
  }
}

function getMoleculeExplanation(stateType) {
  if (stateType === 'solid') {
    return '<strong>SOLID:</strong> Molecules are locked in tight, orderly positions with maximum attractive force. They only <strong>vibrate in place</strong>, giving solids a definite shape and fixed volume.';
  } else if (stateType === 'liquid') {
    return '<strong>LIQUID:</strong> Molecules are moderately spaced with moderate attraction. They <strong>slide smoothly past one another</strong>, allowing liquids to flow and take any container’s shape.';
  } else {
    return '<strong>GAS:</strong> Molecules are spaced far apart with minimal attraction. They possess <strong>high kinetic energy</strong> and bounce in all directions. Highly compressible!';
  }
}

function renderMoleculeSVG(svgEl, stateType) {
  if (!svgEl) return;
  svgEl.innerHTML = '';

  let particles = [];
  if (stateType === 'solid') {
    // Tight 4x8 grid with slight jitter
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 8; c++) {
        particles.push({ cx: 130 + c * 18, cy: 45 + r * 18, r: 7, color: '#38bdf8' });
      }
    }
  } else if (stateType === 'liquid') {
    // Flowing undulating arrangement
    for (let i = 0; i < 28; i++) {
      particles.push({
        cx: 90 + (i % 7) * 32 + (Math.sin(i) * 10),
        cy: 50 + Math.floor(i / 7) * 26 + (Math.cos(i) * 8),
        r: 7,
        color: '#06b6d4'
      });
    }
  } else {
    // Wide scatter
    const gasCoords = [
      [30, 30], [80, 110], [140, 40], [190, 130], [250, 60],
      [310, 120], [360, 45], [90, 80], [280, 25], [200, 70], [330, 85], [50, 135]
    ];
    gasCoords.forEach(([x, y]) => {
      particles.push({ cx: x, cy: y, r: 7, color: '#ec4899' });
    });
  }

  particles.forEach(p => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', p.cx);
    circle.setAttribute('cy', p.cy);
    circle.setAttribute('r', p.r);
    circle.setAttribute('fill', p.color);
    circle.setAttribute('filter', 'drop-shadow(0px 0px 4px rgba(6,182,212,0.6))');
    svgEl.appendChild(circle);
  });
}


function getRockStageHTML(sample) {
  if (sample === 'granite') {
    return `
      <svg viewBox="0 0 500 200" width="100%" height="200" class="rock-svg">
        <!-- Granite Slab -->
        <rect x="30" y="30" width="160" height="140" rx="8" fill="#475569" stroke="#94a3b8" stroke-width="2"/>
        <text x="110" y="22" font-size="12" font-weight="bold" fill="#f8fafc" text-anchor="middle">Granite Rock Slab</text>
        <!-- Speckles in granite -->
        <rect x="45" y="45" width="18" height="14" rx="2" fill="#fda4af" />
        <rect x="80" y="70" width="22" height="16" rx="2" fill="#fda4af" />
        <rect x="130" y="50" width="20" height="15" rx="2" fill="#fda4af" />
        <polygon points="50,110 65,100 70,120" fill="#e2e8f0" opacity="0.9"/>
        <polygon points="120,115 135,105 140,125" fill="#e2e8f0" opacity="0.9"/>
        <polygon points="90,140 105,130 110,150" fill="#e2e8f0" opacity="0.9"/>
        <circle cx="95" cy="55" r="5" fill="#0f172a" />
        <circle cx="155" cy="90" r="6" fill="#0f172a" />
        <circle cx="65" cy="145" r="5" fill="#0f172a" />
        <circle cx="145" cy="145" r="6" fill="#0f172a" />

        <!-- 3 Mineral Anatomy Cards on Right -->
        <!-- Feldspar -->
        <g transform="translate(220, 25)">
          <rect x="0" y="0" width="260" height="46" rx="6" fill="rgba(244, 63, 94, 0.15)" stroke="#fb7185" stroke-width="1.5"/>
          <circle cx="24" cy="23" r="12" fill="#fda4af"/>
          <text x="46" y="20" font-size="12" font-weight="bold" fill="#fecdd3">🌸 Feldspar Mineral (~60%)</text>
          <text x="46" y="36" font-size="10.5" fill="#cbd5e1">Gives granite its white, pink, or grey body colour.</text>
        </g>

        <!-- Quartz -->
        <g transform="translate(220, 78)">
          <rect x="0" y="0" width="260" height="46" rx="6" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="1.5"/>
          <circle cx="24" cy="23" r="12" fill="#bae6fd"/>
          <text x="46" y="20" font-size="12" font-weight="bold" fill="#bae6fd">💎 Quartz Mineral (~30%)</text>
          <text x="46" y="36" font-size="10.5" fill="#cbd5e1">Glassy crystalline hardness; resists scratches & weathering.</text>
        </g>

        <!-- Mica -->
        <g transform="translate(220, 131)">
          <rect x="0" y="0" width="260" height="46" rx="6" fill="rgba(234, 179, 8, 0.15)" stroke="#facc15" stroke-width="1.5"/>
          <circle cx="24" cy="23" r="12" fill="#fde047"/>
          <text x="46" y="20" font-size="12" font-weight="bold" fill="#fef08a">✨ Mica Mineral (~10%)</text>
          <text x="46" y="36" font-size="10.5" fill="#cbd5e1">Thin shimmering flakes that make granite sparkle in light.</text>
        </g>
      </svg>
    `;
  } else if (sample === 'sandstone_limestone') {
    return `
      <svg viewBox="0 0 500 200" width="100%" height="200" class="rock-svg">
        <!-- Sandstone Box -->
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="220" height="160" rx="8" fill="rgba(239, 68, 68, 0.12)" stroke="#f87171" stroke-width="1.5"/>
          <text x="110" y="25" font-size="13" font-weight="bold" fill="#fca5a5" text-anchor="middle">🏰 Red Sandstone</text>
          <!-- Compressed Layers -->
          <rect x="20" y="38" width="180" height="16" rx="3" fill="#b91c1c" opacity="0.8"/>
          <rect x="20" y="58" width="180" height="16" rx="3" fill="#991b1b" opacity="0.9"/>
          <rect x="20" y="78" width="180" height="16" rx="3" fill="#7f1d1d"/>
          <!-- Sand grains text -->
          <text x="110" y="112" font-size="11" fill="#fecaca" text-anchor="middle">Compressed Quartz Sand Layers</text>
          <text x="110" y="130" font-size="10" fill="#cbd5e1" text-anchor="middle">Used to build Delhi’s Red Fort &</text>
          <text x="110" y="145" font-size="10" font-weight="bold" fill="#f87171" text-anchor="middle">Qutub Minar (resists weather!)</text>
        </g>

        <!-- Limestone Box -->
        <g transform="translate(260, 20)">
          <rect x="0" y="0" width="220" height="160" rx="8" fill="rgba(16, 185, 129, 0.12)" stroke="#34d399" stroke-width="1.5"/>
          <text x="110" y="25" font-size="13" font-weight="bold" fill="#6ee7b7" text-anchor="middle">🐚 Limestone & Chalk</text>
          <!-- Corals & Shells illustration -->
          <circle cx="60" cy="62" r="16" fill="rgba(52, 211, 153, 0.25)" stroke="#34d399"/>
          <text x="60" y="67" font-size="14" text-anchor="middle">🐚</text>
          <circle cx="110" cy="62" r="16" fill="rgba(52, 211, 153, 0.25)" stroke="#34d399"/>
          <text x="110" y="67" font-size="14" text-anchor="middle">🪸</text>
          <circle cx="160" cy="62" r="16" fill="rgba(52, 211, 153, 0.25)" stroke="#34d399"/>
          <text x="160" y="67" font-size="14" text-anchor="middle">🖍️</text>
          <!-- Text -->
          <text x="110" y="105" font-size="11" fill="#a7f3d0" text-anchor="middle">Calcite & Aragonite from sea shells</text>
          <text x="110" y="125" font-size="10" fill="#cbd5e1" text-anchor="middle">Chalk is a common soft limestone!</text>
          <text x="110" y="142" font-size="10" font-weight="bold" fill="#34d399" text-anchor="middle">Raw material for Cement, Glass & Bricks</text>
        </g>
      </svg>
    `;
  } else if (sample === 'metamorphic') {
    return `
      <svg viewBox="0 0 500 200" width="100%" height="200" class="rock-svg">
        <!-- 4 Metamorphic Transformers -->
        <!-- 1. Limestone to Marble -->
        <g transform="translate(15, 20)">
          <rect x="0" y="0" width="225" height="72" rx="6" fill="rgba(244, 244, 245, 0.08)" stroke="#a1a1aa" stroke-width="1.2"/>
          <text x="12" y="24" font-size="11" fill="#cbd5e1">Sedimentary: <strong fill="#fff">Limestone</strong></text>
          <text x="112" y="44" font-size="13" fill="#38bdf8" text-anchor="middle">🔥 Heat & Pressure ➔</text>
          <text x="12" y="62" font-size="11.5" font-weight="bold" fill="#f8fafc">🏛️ White Marble (Taj Mahal)</text>
        </g>

        <!-- 2. Sandstone to Quartzite -->
        <g transform="translate(260, 20)">
          <rect x="0" y="0" width="225" height="72" rx="6" fill="rgba(234, 179, 8, 0.08)" stroke="#eab308" stroke-width="1.2"/>
          <text x="12" y="24" font-size="11" fill="#cbd5e1">Sedimentary: <strong fill="#fff">Sandstone</strong></text>
          <text x="112" y="44" font-size="13" fill="#eab308" text-anchor="middle">🔥 Heat & Pressure ➔</text>
          <text x="12" y="62" font-size="11.5" font-weight="bold" fill="#fde047">🗡️ Quartzite (Scratches Steel!)</text>
        </g>

        <!-- 3. Shale to Slate -->
        <g transform="translate(15, 108)">
          <rect x="0" y="0" width="225" height="72" rx="6" fill="rgba(148, 163, 184, 0.08)" stroke="#94a3b8" stroke-width="1.2"/>
          <text x="12" y="24" font-size="11" fill="#cbd5e1">Sedimentary: <strong fill="#fff">Shale (Clay)</strong></text>
          <text x="112" y="44" font-size="13" fill="#94a3b8" text-anchor="middle">🔥 Heat & Pressure ➔</text>
          <text x="12" y="62" font-size="11.5" font-weight="bold" fill="#e2e8f0">📋 Slate (Blackboards & Roofs)</text>
        </g>

        <!-- 4. Granite to Gneiss -->
        <g transform="translate(260, 108)">
          <rect x="0" y="0" width="225" height="72" rx="6" fill="rgba(168, 85, 247, 0.08)" stroke="#a855f7" stroke-width="1.2"/>
          <text x="12" y="24" font-size="11" fill="#cbd5e1">Igneous: <strong fill="#fff">Granite</strong></text>
          <text x="112" y="44" font-size="13" fill="#c084fc" text-anchor="middle">🔥 Heat & Pressure ➔</text>
          <text x="12" y="62" font-size="11.5" font-weight="bold" fill="#e9d5ff">🦓 Gneiss (Shiny Mica Ribbons)</text>
        </g>
      </svg>
    `;
  } else if (sample === 'coal_petroleum') {
    return `
      <svg viewBox="0 0 500 200" width="100%" height="200" class="rock-svg">
        <!-- Coal Column -->
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="220" height="160" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="110" y="24" font-size="12.5" font-weight="bold" fill="#fde68a" text-anchor="middle">🔥 4 Coal Grades</text>
          <rect x="15" y="36" width="190" height="24" rx="4" fill="#78350f"/>
          <text x="25" y="52" font-size="11" fill="#fef3c7">1. Peat (Earliest, low heat, smoky)</text>
          <rect x="15" y="66" width="190" height="24" rx="4" fill="#451a03"/>
          <text x="25" y="82" font-size="11" fill="#fef3c7">2. Lignite ("Brown coal", Neyveli)</text>
          <rect x="15" y="96" width="190" height="24" rx="4" fill="#292524"/>
          <text x="25" y="112" font-size="11" fill="#fef3c7">3. Bituminous ("Soft coal", power plants)</text>
          <rect x="15" y="126" width="190" height="24" rx="4" fill="#09090b" stroke="#f59e0b"/>
          <text x="25" y="142" font-size="11" font-weight="bold" fill="#facc15">4. Anthracite (Best Coal! Max heat)</text>
        </g>

        <!-- Petroleum Refining Column -->
        <g transform="translate(260, 20)">
          <rect x="0" y="0" width="220" height="160" rx="8" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" stroke-width="1.5"/>
          <text x="110" y="24" font-size="12.5" font-weight="bold" fill="#a5f3fc" text-anchor="middle">🛢️ Petroleum ("Black Gold")</text>
          <text x="110" y="44" font-size="10.5" fill="#cbd5e1" text-anchor="middle">Formed from ancient marine plankton</text>
          <text x="110" y="60" font-size="10.5" fill="#67e8f9" text-anchor="middle">📍 Bombay High & Digboi (Assam)</text>
          
          <rect x="15" y="74" width="190" height="72" rx="4" fill="rgba(15, 23, 42, 0.7)" stroke="#38bdf8" stroke-width="1"/>
          <text x="25" y="94" font-size="10.5" fill="#e2e8f0">🚗 Petrol & Diesel (Vehicle fuels)</text>
          <text x="25" y="112" font-size="10.5" fill="#e2e8f0">🔥 LPG & CNG (Clean cooking & transport)</text>
          <text x="25" y="130" font-size="10.5" font-weight="bold" fill="#fde047">🕯️ Paraffin Wax (Candles & polish)</text>
        </g>
      </svg>
    `;
  } else {
    // Default: Pumice vs Basalt Floating Beaker Lab
    return `
      <svg viewBox="0 0 500 200" width="100%" height="200" class="rock-svg">
        <!-- Laboratory Glass Beaker -->
        <rect x="110" y="25" width="280" height="155" rx="8" fill="rgba(6, 182, 212, 0.08)" stroke="#38bdf8" stroke-width="2.5"/>
        
        <!-- Water Body -->
        <path d="M112,75 Q180,68 250,75 T388,75 L388,178 L112,178 Z" fill="rgba(6, 182, 212, 0.28)"/>
        <line x1="112" y1="75" x2="388" y2="75" stroke="#7dd3fc" stroke-width="2" stroke-dasharray="4,3"/>

        <!-- Pumice Floating Rock (Light, Porous) -->
        <g transform="translate(160, 58)">
          <path d="M0,15 Q15,0 45,5 Q70,0 80,18 Q85,35 65,42 Q30,45 10,38 Q-5,28 0,15 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5"/>
          <!-- Sponge-like pores -->
          <circle cx="20" cy="18" r="3" fill="#64748b" opacity="0.6"/>
          <circle cx="38" cy="22" r="3.5" fill="#64748b" opacity="0.6"/>
          <circle cx="58" cy="16" r="2.5" fill="#64748b" opacity="0.6"/>
          <circle cx="30" cy="32" r="3" fill="#64748b" opacity="0.6"/>
          <circle cx="50" cy="30" r="2.5" fill="#64748b" opacity="0.6"/>
          <!-- Trapped air bubbles in water -->
          <circle cx="25" cy="50" r="2.5" fill="#e0f2fe" opacity="0.8"/>
          <circle cx="65" cy="48" r="3" fill="#e0f2fe" opacity="0.8"/>
          <circle cx="45" cy="54" r="2" fill="#e0f2fe" opacity="0.8"/>
        </g>
        <text x="200" y="50" font-size="11.5" font-weight="bold" fill="#f8fafc" text-anchor="middle">🧼 Pumice (Floats!)</text>
        <text x="200" y="115" font-size="10" fill="#bae6fd" text-anchor="middle">Air-filled porous cavities</text>

        <!-- Basalt Sunken Rock (Dense, Heavy) -->
        <g transform="translate(280, 142)">
          <polygon points="0,28 15,5 55,2 75,18 70,32 10,34" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
          <polygon points="15,5 35,12 55,2" fill="#334155"/>
          <polygon points="35,12 55,2 75,18 45,22" fill="#475569"/>
        </g>
        <text x="320" y="136" font-size="11.5" font-weight="bold" fill="#f87171" text-anchor="middle">🌋 Basalt (Sinks!)</text>
        <text x="320" y="190" font-size="10" fill="#fca5a5" text-anchor="middle">Dense Iron & Magnesium (Ocean crust)</text>

        <!-- Beaker Measurement Ticks -->
        <line x1="370" y1="50" x2="385" y2="50" stroke="#7dd3fc" stroke-width="1.5"/>
        <line x1="375" y1="80" x2="385" y2="80" stroke="#7dd3fc" stroke-width="1.5"/>
        <line x1="370" y1="110" x2="385" y2="110" stroke="#7dd3fc" stroke-width="1.5"/>
        <line x1="375" y1="140" x2="385" y2="140" stroke="#7dd3fc" stroke-width="1.5"/>
      </svg>
    `;
  }
}

function getRockExplanationHTML(sample) {
  if (sample === 'granite') {
    return '<strong>GRANITE:</strong> An intrusive igneous rock formed when magma cools slowly <em>deep beneath</em> Earth\'s surface. Latin <em>granum</em> (grain). Composed of three minerals: <strong>feldspar</strong> (pink/white crystals), <strong>quartz</strong> (glassy hardness), and <strong>mica</strong> (shiny sparkle). Used for kitchen countertops, flooring, and statues.';
  } else if (sample === 'sandstone_limestone') {
    return '<strong>SEDIMENTARY GIANTS:</strong> <strong>Sandstone</strong> forms from compressed quartz sand grains (e.g. Red Fort in Delhi, Qutub Minar). <strong>Limestone</strong> forms from compressed shells and corals of sea organisms (calcite); common soft limestone is <strong>chalk</strong>, and it is the key ingredient in cement!';
  } else if (sample === 'metamorphic') {
    return '<strong>THE METAMORPHOSIS CHAMBER:</strong> Under immense subterranean heat and pressure: <em>Limestone → Marble</em> (Taj Mahal in Agra); <em>Sandstone → Quartzite</em> (so hard it scratches steel!); <em>Shale → Slate</em> (blackboards & roofs); <em>Granite → Gneiss</em> (shiny ribbon stripes with mica).';
  } else if (sample === 'coal_petroleum') {
    return '<strong>FOSSIL FUELS & ORES:</strong> <strong>Coal</strong> is a sedimentary rock formed from ancient swamps in 4 stages: Peat → Lignite ("brown coal") → Bituminous ("soft coal") → Anthracite ("hard best coal"). <strong>Petroleum</strong> ("Black Gold") is pumped from Bombay High & Digboi and refined into fuels and paraffin wax.';
  } else {
    return '<strong>VOLCANIC EXPERIMENT:</strong> <strong>Pumice</strong> formed from frothy volcanic lava with escaping gas bubbles that froze instantly into millions of tiny pores. Its bulk density is less than water, so it <strong>floats like a sponge</strong>! In contrast, <strong>Basalt</strong> cooled into dense, compact rock rich in iron and magnesium, so it sinks instantly.';
  }
}

function renderBalanceSVG(svgEl, isPricked) {
  if (!svgEl) return;
  svgEl.innerHTML = '';

  const rotation = isPricked ? -14 : 0; // negative rotates left side down

  svgEl.innerHTML = `
    <!-- Fulcrum Stand -->
    <polygon points="220,90 205,160 235,160" fill="#64748b" />
    <rect x="180" y="160" width="80" height="12" rx="4" fill="#475569" />
    <circle cx="220" cy="90" r="6" fill="#f1f5f9" />

    <!-- Tilting Beam -->
    <g transform="rotate(${rotation}, 220, 90)" style="transition: transform 0.6s ease-out;">
      <rect x="70" y="87" width="300" height="6" rx="3" fill="#cbd5e1" />
      
      <!-- Left String & Balloon -->
      <line x1="90" y1="90" x2="90" y2="125" stroke="#94a3b8" stroke-width="2" />
      <ellipse cx="90" cy="142" rx="18" ry="22" fill="#06b6d4" />
      <polygon points="90,120 86,125 94,125" fill="#06b6d4" />
      <text x="90" y="146" font-size="10" font-weight="bold" fill="#090e17" text-anchor="middle">Air</text>

      <!-- Right String & Balloon -->
      <line x1="350" y1="90" x2="350" y2="125" stroke="#94a3b8" stroke-width="2" />
      ${isPricked ? `
        <!-- Punctured Deflated Balloon -->
        <path d="M344,125 Q350,135 356,125 L353,130 Q350,138 347,130 Z" fill="#ef4444" />
        <text x="350" y="148" font-size="10" font-weight="bold" fill="#ef4444" text-anchor="middle">Empty</text>
      ` : `
        <!-- Full Balloon -->
        <ellipse cx="350" cy="142" rx="18" ry="22" fill="#10b981" />
        <polygon points="350,120 346,125 354,125" fill="#10b981" />
        <text x="350" y="146" font-size="10" font-weight="bold" fill="#090e17" text-anchor="middle">Air</text>
      `}
    </g>
  `;
}

function getNutrientCard(nutrient) {
  const map = {
    protein: {
      name: '🥩 Proteins (Body Builders)',
      role: 'Growth, muscle construction, and repairing worn-out tissues.',
      sources: 'Milk, eggs, fish, pulses, soybeans, lean meat.',
      deficiency: 'Kwashiorkor & stunted growth, muscle wasting.'
    },
    carbs: {
      name: '🍞 Carbohydrates (Instant Energy)',
      role: 'Primary fuel source broken down into glucose for physical activities and brain function.',
      sources: 'Rice, wheat, bread, potatoes, bananas, glucose.',
      deficiency: 'General weakness, loss of stamina, fatigue.'
    },
    fats: {
      name: '🧈 Fats (Reserve Batteries)',
      role: 'Long-term concentrated energy storage, thermal blanket against cold, and shock absorbers for kidneys and liver.',
      sources: 'Butter, ghee, vegetable oils, almonds, walnuts.',
      deficiency: 'Dry scaly skin, sensitivity to cold temperatures.'
    },
    vitd: {
      name: '☀️ Vitamin D & Calcium (Bone Hardeners)',
      role: 'Strengthens teeth and mineralizes bone matrices to support body weight.',
      sources: 'Morning sunlight, milk, fortified eggs, cheese.',
      deficiency: 'Rickets (bowed legs, pigeon chest, soft fragile bones).'
    },
    iron: {
      name: '🥬 Iron (Oxygen Transporter)',
      role: 'Synthesizes haemoglobin inside red blood cells to transport oxygen from lungs to muscles.',
      sources: 'Spinach, dates, jaggery, beetroot, red meat.',
      deficiency: 'Anaemia (chronic tiredness, pale skin, shortness of breath).'
    },
    iodine: {
      name: '🧂 Iodine (Metabolism Regulator)',
      role: 'Regulates thyroid gland secretions governing growth and mental development.',
      sources: 'Iodised salt, marine seafood.',
      deficiency: 'Goitre (visible swelling at base of neck), mental sluggishness.'
    }
  };

  const item = map[nutrient] || map.protein;
  return `
    <div style="max-width: 600px; text-align: left; width: 100%;">
      <h4 style="color: var(--accent-cyan); font-size: 1.2rem; margin-bottom: 0.5rem;">${item.name}</h4>
      <p style="font-size: 0.95rem; margin-bottom: 0.5rem;"><strong>Primary Function:</strong> ${item.role}</p>
      <p style="font-size: 0.95rem; margin-bottom: 0.5rem;"><strong>Rich Food Sources:</strong> <span style="color: #6ee7b7;">${item.sources}</span></p>
      <div style="background: rgba(239, 68, 68, 0.12); border-left: 3px solid var(--color-danger); padding: 0.6rem 0.9rem; border-radius: 4px; font-size: 0.9rem;">
        <strong>⚠️ Deficiency Disease:</strong> <span style="color: #fca5a5;">${item.deficiency}</span>
      </div>
    </div>
  `;
}

function getAnimalCard(animal) {
  const map = {
    eagle: {
      name: '🦅 Eagle (Aerial Raptor)',
      habitat: 'Mountain cliffs & open skies',
      breathing: 'Lungs & Nares (nostril openings on beak)',
      covering: 'Feathers (aerodynamic flight & thermal insulation)',
      locomotion: 'Wings for high soaring',
      weapon: 'Talons (razor-sharp curved claws to seize prey)'
    },
    penguin: {
      name: '🐧 Penguin (Aquatic Flightless Bird)',
      habitat: 'Freezing Antarctic ice & oceans',
      breathing: 'Lungs (surfaces to breathe air)',
      covering: 'Dense waterproof plumage + thick layer of blubber',
      locomotion: 'Flippers (hydrodynamic paddles for fast underwater swimming)',
      weapon: 'Torpedo-shaped body cutting through icy waves'
    },
    fish: {
      name: '🐟 Goldfish (Aquatic Vertebrate)',
      habitat: 'Freshwater ponds & rivers',
      breathing: 'Gills (extracts oxygen dissolved in water)',
      covering: 'Overlapping waterproof scales preventing water seepage',
      locomotion: 'Fins & tail for balance and propulsion',
      weapon: 'Continuous mouth-pumping over gill filaments'
    },
    frog: {
      name: '🐸 Frog (Amphibian Dual-Breather)',
      habitat: 'Ponds and moist land',
      breathing: 'Moist skin in water + Lungs on land',
      covering: 'Smooth, slime-coated moist skin',
      locomotion: 'Webbed hind feet for swimming; strong legs for leaping',
      weapon: 'Long sticky tongue darting out to catch insects'
    },
    whale: {
      name: '🐋 Blue Whale (Marine Mammal)',
      habitat: 'Deep oceans',
      breathing: 'Lungs via Blowhole on very top of head',
      covering: 'Smooth skin + thick insulating blubber layer',
      locomotion: 'Powerful horizontal tail flukes and fore flippers',
      weapon: 'Can hold breath for over an hour during deep ocean dives'
    },
    snake: {
      name: '🐍 Snake (Limbless Reptile)',
      habitat: 'Forests, deserts, and wetlands',
      breathing: 'Lungs (aquatic snakes have nostrils on top of snout)',
      covering: 'Dry scales and transverse belly scales',
      locomotion: 'Limbless! Muscular body waves + belly scale traction',
      weapon: 'Flexible jaws that dislocate to swallow prey whole'
    }
  };

  const item = map[animal] || map.eagle;
  return `
    <div style="max-width: 600px; text-align: left; width: 100%;">
      <h4 style="color: var(--accent-cyan); font-size: 1.2rem; margin-bottom: 0.5rem;">${item.name}</h4>
      <p style="font-size: 0.95rem; margin-bottom: 0.4rem;"><strong>Natural Habitat:</strong> ${item.habitat}</p>
      <p style="font-size: 0.95rem; margin-bottom: 0.4rem;"><strong>Breathing Mechanism:</strong> <span style="color: #38bdf8;">${item.breathing}</span></p>
      <p style="font-size: 0.95rem; margin-bottom: 0.4rem;"><strong>Body Covering:</strong> ${item.covering}</p>
      <p style="font-size: 0.95rem; margin-bottom: 0.4rem;"><strong>Movement Organs:</strong> ${item.locomotion}</p>
      <div style="background: rgba(16, 185, 129, 0.12); border-left: 3px solid var(--color-success); padding: 0.6rem 0.9rem; border-radius: 4px; font-size: 0.9rem; margin-top: 0.6rem;">
        <strong>⭐ Secret Survival Feature:</strong> <span style="color: #6ee7b7;">${item.weapon}</span>
      </div>
    </div>
  `;
}


// --------------------------------------------------------------------------
// L-3 SKELETAL & MUSCULAR SYSTEM INTERACTIVE GADGET
// --------------------------------------------------------------------------
function renderSkeletalGadget() {
  const joint = state.labStates.jointType || 'ball_socket';
  const arm = state.labStates.muscleArmState || 'flexed';

  return `
    <div class="interactive-lab-container skeletal-lab-theme">
      <div class="lab-title-bar">
        <h4>🦴 Interactive Joint Mechanics & Antagonistic Muscle Simulator</h4>
        <div class="lab-controls">
          <button class="lab-btn ${joint === 'ball_socket' ? 'active' : ''}" data-joint="ball_socket">🕹️ Ball & Socket</button>
          <button class="lab-btn ${joint === 'hinge' ? 'active' : ''}" data-joint="hinge">🚪 Hinge Joint</button>
          <button class="lab-btn ${joint === 'pivot' ? 'active' : ''}" data-joint="pivot">🔄 Pivot Joint</button>
          <button class="lab-btn ${joint === 'gliding' ? 'active' : ''}" data-joint="gliding">🎚️ Gliding Joint</button>
          <button class="lab-btn ${arm === 'flexed' ? 'active' : ''}" data-arm-toggle="true" style="margin-left: 0.5rem; border-color: var(--accent-amber);">${arm === 'flexed' ? '💪 Arm: BENT (Flexed)' : '🦾 Arm: STRAIGHT (Extended)'}</button>
        </div>
      </div>
      <div class="lab-stage" id="skeletal-stage">
        ${getSkeletalStageHTML(joint, arm)}
      </div>
      <div class="lab-explanation" id="skeletal-explanation">
        ${getSkeletalExplanationHTML(joint, arm)}
      </div>
    </div>
  `;
}

function getSkeletalStageHTML(joint, arm) {
  // If user clicked arm toggle or joint
  return `
    <div class="skeletal-gadget-dual-wrap" style="display: flex; gap: 1.5rem; width: 100%; max-width: 820px; align-items: center; justify-content: space-around; flex-wrap: wrap;">
      <!-- Joint Mechanics Visualization -->
      <div class="joint-vis-card" style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 1rem; width: 340px; text-align: center;">
        <h5 style="color: var(--accent-amber); margin-bottom: 0.5rem; font-size: 1rem;">Mechanical Joint Model</h5>
        <svg viewBox="0 0 300 180" width="100%" height="160" class="joint-mechanics-svg">
          ${renderJointSVG(joint)}
        </svg>
      </div>

      <!-- Antagonistic Muscle Arm Visualization -->
      <div class="muscle-vis-card" style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 1rem; width: 380px; text-align: center;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h5 style="color: #fbbf24; font-size: 1rem;">Antagonistic Pair (Biceps / Triceps)</h5>
          <button class="btn btn-sm btn-ghost" id="btn-toggle-arm" style="padding: 0.2rem 0.6rem; font-size: 0.75rem; border: 1px solid #f59e0b;">Toggle Move</button>
        </div>
        <svg viewBox="0 0 340 180" width="100%" height="160" class="muscle-arm-svg">
          ${renderArmSVG(arm)}
        </svg>
      </div>
    </div>
  `;
}

function renderJointSVG(joint) {
  if (joint === 'ball_socket') {
    return `
      <!-- Ball and Socket Joint (Shoulder / Hip) -->
      <!-- Socket (Cup) -->
      <path d="M 80 40 A 55 55 0 0 0 80 140 L 40 140 L 40 40 Z" fill="#334155" stroke="#94a3b8" stroke-width="3" />
      <text x="50" y="25" fill="#94a3b8" font-size="12" font-weight="bold">Cup Socket (Scapula/Pelvis)</text>
      <!-- Ball Head -->
      <circle cx="95" cy="90" r="42" fill="#f59e0b" stroke="#fbbf24" stroke-width="3" opacity="0.9" />
      <!-- Bone Shaft (Humerus/Femur) with rotary 360 degree arrows -->
      <path d="M 130 90 L 260 90" stroke="#f59e0b" stroke-width="18" stroke-linecap="round" />
      <text x="180" y="80" fill="#fde68a" font-size="12" font-weight="bold">Bone Shaft</text>
      <!-- Rotary arrows -->
      <circle cx="210" cy="90" r="28" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="8,4" />
      <polygon points="238,90 232,82 244,82" fill="#38bdf8" />
      <text x="175" y="145" fill="#38bdf8" font-size="12" font-weight="bold">360° Rotary Freedom</text>
    `;
  } else if (joint === 'hinge') {
    return `
      <!-- Hinge Joint (Elbow / Knee) -->
      <rect x="30" y="75" width="90" height="26" rx="6" fill="#475569" stroke="#94a3b8" stroke-width="2" />
      <text x="40" y="65" fill="#94a3b8" font-size="12" font-weight="bold">Fixed Upper Bone</text>
      <!-- Hinge Pin -->
      <circle cx="120" cy="88" r="14" fill="#f59e0b" stroke="#fbbf24" stroke-width="3" />
      <!-- Swinging arm -->
      <line x1="120" y1="88" x2="230" y2="40" stroke="#f59e0b" stroke-width="16" stroke-linecap="round" />
      <!-- 1-direction Arc -->
      <path d="M 230 40 A 120 120 0 0 1 230 135" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="6,4" />
      <polygon points="230,135 222,125 238,125" fill="#10b981" />
      <text x="140" y="165" fill="#10b981" font-size="12" font-weight="bold">1-Direction Swing (180°)</text>
    `;
  } else if (joint === 'pivot') {
    return `
      <!-- Pivot Joint (Neck / Atlas-Axis) -->
      <!-- Central Cylindrical Peg -->
      <rect x="135" y="40" width="30" height="95" rx="10" fill="#f59e0b" stroke="#fbbf24" stroke-width="3" />
      <text x="110" y="25" fill="#fde68a" font-size="12" font-weight="bold">Axis Peg (Spine)</text>
      <!-- Rotating Ring (Atlas) -->
      <ellipse cx="150" cy="85" rx="55" ry="24" fill="none" stroke="#06b6d4" stroke-width="10" />
      <!-- Rotational arrows -->
      <path d="M 90 85 A 60 25 0 0 1 210 85" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6,4" />
      <polygon points="210,85 204,78 214,78" fill="#38bdf8" />
      <polygon points="90,85 96,92 86,92" fill="#38bdf8" />
      <text x="100" y="155" fill="#06b6d4" font-size="12" font-weight="bold">Rotation Left & Right</text>
    `;
  } else {
    // Gliding Joint (Wrist / Ankle)
    return `
      <!-- Gliding Joint (Carpals/Tarsals) -->
      <!-- Flat Bone Plate 1 -->
      <rect x="60" y="55" width="180" height="30" rx="8" fill="#334155" stroke="#94a3b8" stroke-width="2.5" />
      <!-- Flat Bone Plate 2 -->
      <rect x="80" y="95" width="180" height="30" rx="8" fill="#f59e0b" stroke="#fbbf24" stroke-width="2.5" />
      <!-- Sliding arrows between them -->
      <line x1="120" y1="90" x2="220" y2="90" stroke="#ec4899" stroke-width="3" />
      <polygon points="220,90 212,85 212,95" fill="#ec4899" />
      <polygon points="120,90 128,85 128,95" fill="#ec4899" />
      <text x="85" y="40" fill="#94a3b8" font-size="12" font-weight="bold">Upper Bone Plate</text>
      <text x="105" y="150" fill="#fde68a" font-size="12" font-weight="bold">Lower Bone Plate</text>
      <text x="80" y="172" fill="#ec4899" font-size="12" font-weight="bold">Smooth Multi-directional Slide</text>
    `;
  }
}

function renderArmSVG(armState) {
  const isFlexed = armState === 'flexed';
  if (isFlexed) {
    // BENT ARM: Biceps bulged/contracted (orange), Triceps stretched (grayish)
    return `
      <!-- Humerus (Upper arm) -->
      <line x1="50" y1="120" x2="160" y2="120" stroke="#cbd5e1" stroke-width="16" stroke-linecap="round" />
      <text x="70" y="145" fill="#94a3b8" font-size="11">Humerus</text>
      <!-- Elbow Hinge Joint -->
      <circle cx="160" cy="120" r="10" fill="#f59e0b" stroke="#fff" stroke-width="2" />
      <!-- Forearm (bent up at 50 degrees) -->
      <line x1="160" y1="120" x2="250" y2="40" stroke="#cbd5e1" stroke-width="14" stroke-linecap="round" />
      <text x="220" y="25" fill="#94a3b8" font-size="11">Radius & Ulna</text>
      <!-- Biceps (TOP - Bulged & Contracting) -->
      <path d="M 75 110 Q 140 60 195 90" fill="none" stroke="#ef4444" stroke-width="14" stroke-linecap="round" filter="drop-shadow(0 0 6px rgba(239,68,68,0.7))" />
      <text x="95" y="65" fill="#fca5a5" font-size="12" font-weight="bold">Biceps: CONTRACTED! (Bulging & Pulling)</text>
      <!-- Triceps (BOTTOM - Relaxed & Stretched) -->
      <path d="M 65 130 Q 120 145 155 132" fill="none" stroke="#64748b" stroke-width="8" stroke-linecap="round" />
      <text x="80" y="165" fill="#94a3b8" font-size="11">Triceps: RELAXED (Lengthened)</text>
    `;
  } else {
    // STRAIGHT ARM: Triceps contracted/bulged (orange), Biceps relaxed/stretched (grayish)
    return `
      <!-- Humerus (Upper arm) -->
      <line x1="40" y1="90" x2="150" y2="90" stroke="#cbd5e1" stroke-width="16" stroke-linecap="round" />
      <text x="65" y="75" fill="#94a3b8" font-size="11">Humerus</text>
      <!-- Elbow Hinge Joint -->
      <circle cx="150" cy="90" r="10" fill="#f59e0b" stroke="#fff" stroke-width="2" />
      <!-- Forearm (straightened out horizontally) -->
      <line x1="150" y1="90" x2="290" y2="90" stroke="#cbd5e1" stroke-width="14" stroke-linecap="round" />
      <text x="210" y="75" fill="#94a3b8" font-size="11">Radius & Ulna</text>
      <!-- Biceps (TOP - Relaxed & Thinned) -->
      <path d="M 70 80 Q 140 76 210 82" fill="none" stroke="#64748b" stroke-width="8" stroke-linecap="round" />
      <text x="95" y="55" fill="#94a3b8" font-size="11">Biceps: RELAXED (Stretched)</text>
      <!-- Triceps (BOTTOM - Contracted & Bulged) -->
      <path d="M 60 100 Q 125 125 158 102" fill="none" stroke="#ef4444" stroke-width="14" stroke-linecap="round" filter="drop-shadow(0 0 6px rgba(239,68,68,0.7))" />
      <text x="75" y="145" fill="#fca5a5" font-size="12" font-weight="bold">Triceps: CONTRACTED! (Pulling Forearm Down)</text>
    `;
  }
}

function getSkeletalExplanationHTML(joint, arm) {
  let jointText = '';
  if (joint === 'ball_socket') {
    jointText = '<strong>BALL & SOCKET JOINT:</strong> Ball fits in cup-like socket → <strong>360° Rotary Movement</strong>. Found in <strong>Shoulder & Hip</strong>. Like a computer joystick!';
  } else if (joint === 'hinge') {
    jointText = '<strong>HINGE JOINT:</strong> Opens and closes in <strong>1 Direction Only (180°)</strong> like a door hinge. Found in <strong>Knees, Elbows, Fingers, and Toes</strong>.';
  } else if (joint === 'pivot') {
    jointText = '<strong>PIVOT JOINT:</strong> Ring rotates around a central peg. Located between <strong>Skull & Backbone (Atlas & Axis)</strong>. Allows nodding "yes" and turning "no".';
  } else {
    jointText = '<strong>GLIDING JOINT:</strong> Flat bone surfaces slide past each other. Present in <strong>Wrists, Ankles, and Spine</strong>. Enables flexible twisting and waving.';
  }

  const armText = arm === 'flexed'
    ? '<span style="color: #fbbf24;">Arm Flexion:</span> <strong>Biceps CONTRACTS</strong> (pulls forearm up) while <strong>Triceps RELAXES</strong>.'
    : '<span style="color: #fbbf24;">Arm Extension:</span> <strong>Triceps CONTRACTS</strong> (pulls forearm down) while <strong>Biceps RELAXES</strong>.';

  return `
    <div style="margin-bottom: 0.5rem;">${jointText}</div>
    <div style="background: rgba(245, 158, 11, 0.12); padding: 0.5rem 0.8rem; border-radius: 6px; border-left: 3px solid #f59e0b;">
      ${armText} <em>(Golden rule: Muscles can ONLY PULL, they NEVER PUSH!)</em>
    </div>
  `;
}

function attachSkeletalGadgetEvents() {
  const jointBtns = document.querySelectorAll('.lab-btn[data-joint]');
  jointBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      AudioController.click();
      jointBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.labStates.jointType = btn.getAttribute('data-joint');
      updateSkeletalGadgetView();
    });
  });

  const armToggleBtn = document.querySelector('.lab-btn[data-arm-toggle]');
  if (armToggleBtn) {
    armToggleBtn.addEventListener('click', toggleArmMovement);
  }

  const armMiniBtn = document.getElementById('btn-toggle-arm');
  if (armMiniBtn) {
    armMiniBtn.addEventListener('click', toggleArmMovement);
  }
}

function toggleArmMovement() {
  markLabInteracted('ch3_skeletal');
  AudioController.click();
  state.labStates.muscleArmState = (state.labStates.muscleArmState === 'flexed') ? 'extended' : 'flexed';
  updateSkeletalGadgetView();
}

function updateSkeletalGadgetView() {
  const stage = document.getElementById('skeletal-stage');
  const exp = document.getElementById('skeletal-explanation');
  if (stage) stage.innerHTML = getSkeletalStageHTML(state.labStates.jointType, state.labStates.muscleArmState);
  if (exp) exp.innerHTML = getSkeletalExplanationHTML(state.labStates.jointType, state.labStates.muscleArmState);

  // Update button label
  const armToggleBtn = document.querySelector('.lab-btn[data-arm-toggle]');
  if (armToggleBtn) {
    armToggleBtn.textContent = (state.labStates.muscleArmState === 'flexed') ? '💪 Arm: BENT (Flexed)' : '🦾 Arm: STRAIGHT (Extended)';
  }
  const armMiniBtn = document.getElementById('btn-toggle-arm');
  if (armMiniBtn) {
    armMiniBtn.addEventListener('click', toggleArmMovement);
  }
}

// --------------------------------------------------------------------------
// L-4 NERVOUS SYSTEM & SENSE ORGANS INTERACTIVE GADGET
// --------------------------------------------------------------------------
function renderNervousGadget() {
  const part = state.labStates.brainPart || 'cerebrum';
  const isReflex = state.labStates.reflexTriggered || false;

  return `
    <div class="interactive-lab-container nervous-lab-theme">
      <div class="lab-title-bar">
        <h4>🧠 Interactive Brain Regions & Spinal Reflex Arc Simulator</h4>
        <div class="lab-controls">
          <button class="lab-btn ${part === 'cerebrum' ? 'active' : ''}" data-brain="cerebrum">🧠 Cerebrum (Thinking & Senses)</button>
          <button class="lab-btn ${part === 'cerebellum' ? 'active' : ''}" data-brain="cerebellum">🤸 Cerebellum (Balance)</button>
          <button class="lab-btn ${part === 'medulla' ? 'active' : ''}" data-brain="medulla">🫀 Medulla (24/7 Vitals)</button>
          <button class="lab-btn ${isReflex ? 'active' : ''}" id="btn-trigger-reflex" style="border-color: #ef4444; color: #fca5a5;">🔥 Test Reflex Arc!</button>
        </div>
      </div>
      <div class="lab-stage" id="nervous-stage">
        ${getNervousStageHTML(part, isReflex)}
      </div>
      <div class="lab-explanation" id="nervous-explanation">
        ${getNervousExplanationHTML(part, isReflex)}
      </div>
    </div>
  `;
}

function getNervousStageHTML(part, isReflex) {
  if (isReflex) {
    return `
      <!-- Animated Reflex Arc Simulation -->
      <div style="width: 100%; max-width: 720px; text-align: center;">
        <h5 style="color: #f87171; margin-bottom: 0.5rem; font-size: 1.05rem;">⚡ Emergency Reflex Loop: Skin → Sensory → Spinal Cord → Motor → Muscle</h5>
        <svg viewBox="0 0 520 200" width="100%" height="190" class="reflex-arc-svg">
          <!-- Hot Pan -->
          <rect x="20" y="145" width="70" height="35" rx="6" fill="#475569" stroke="#ef4444" stroke-width="2" />
          <path d="M 30 145 Q 40 125 50 145 Q 60 120 70 145" fill="none" stroke="#f97316" stroke-width="3" />
          <text x="32" y="170" fill="#fca5a5" font-size="11" font-weight="bold">HOT PAN</text>
          
          <!-- Hand touching -->
          <circle cx="55" cy="120" r="16" fill="#fbcfe8" stroke="#ec4899" stroke-width="2" />
          <text x="15" y="105" fill="#f472b6" font-size="11">Skin Receptor</text>

          <!-- Sensory Nerve Cable (Red Pulse to Spinal Cord) -->
          <path d="M 68 112 C 140 50, 240 50, 360 85" fill="none" stroke="#ef4444" stroke-width="4" stroke-dasharray="8,4" class="animated-nerve-pulse" />
          <text x="140" y="45" fill="#f87171" font-size="11" font-weight="bold">1. Sensory Nerve (Input Signal) →</text>

          <!-- Spinal Cord Butterfly Section -->
          <rect x="360" y="55" width="130" height="110" rx="16" fill="#1e293b" stroke="#8b5cf6" stroke-width="3" />
          <path d="M 390 90 Q 425 110 400 135 Q 425 110 460 135 Q 435 110 460 90 Q 425 105 390 90 Z" fill="#ec4899" opacity="0.85" />
          <text x="375" y="80" fill="#c084fc" font-size="12" font-weight="bold">SPINAL CORD</text>
          <text x="370" y="155" fill="#a78bfa" font-size="10">(Brain Bypassed!)</text>

          <!-- Motor Nerve Cable (Green Pulse Back to Muscle) -->
          <path d="M 360 125 C 260 165, 180 160, 110 125" fill="none" stroke="#10b981" stroke-width="4" stroke-dasharray="8,4" class="animated-nerve-pulse-reverse" />
          <text x="150" y="185" fill="#34d399" font-size="11" font-weight="bold">← 2. Motor Nerve (Yank Arm Command!)</text>

          <!-- Arm Muscle Jerk Indicator -->
          <rect x="75" y="85" width="55" height="24" rx="6" fill="#10b981" stroke="#34d399" stroke-width="2" />
          <text x="80" y="101" fill="#fff" font-size="10" font-weight="bold">BICEPS</text>
        </svg>
      </div>
    `;
  }

  // Brain Model
  return `
    <div style="display: flex; gap: 1.5rem; width: 100%; max-width: 820px; align-items: center; justify-content: space-around; flex-wrap: wrap;">
      <!-- Brain SVG with active highlight -->
      <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(139, 92, 246, 0.35); border-radius: 14px; padding: 1rem; width: 360px; text-align: center;">
        <h5 style="color: var(--accent-purple); margin-bottom: 0.4rem; font-size: 1rem;">Human Brain Architecture</h5>
        <svg viewBox="0 0 320 220" width="100%" height="190" class="brain-vis-svg">
          <!-- Cerebrum (Top Dome with Convolutions) -->
          <path d="M 60 130 C 40 80, 70 30, 150 25 C 230 20, 280 60, 270 120 C 260 145, 210 150, 180 140 C 130 145, 80 145, 60 130 Z" 
                fill="${part === 'cerebrum' ? '#8b5cf6' : '#475569'}" 
                stroke="${part === 'cerebrum' ? '#c084fc' : '#94a3b8'}" 
                stroke-width="3" 
                filter="${part === 'cerebrum' ? 'drop-shadow(0 0 10px rgba(139,92,246,0.8))' : 'none'}" />
          <!-- Cerebrum walnut folds lines -->
          <path d="M 90 60 Q 140 80 120 110 M 150 45 Q 170 95 190 65 M 200 80 Q 240 105 220 130" fill="none" stroke="#cbd5e1" stroke-width="2" opacity="0.6" />
          <text x="120" y="85" fill="#fff" font-size="13" font-weight="bold">CEREBRUM</text>

          <!-- Cerebellum (Back Bottom Cauliflower) -->
          <path d="M 195 135 C 240 135, 270 160, 250 185 C 220 205, 180 190, 175 160 Z" 
                fill="${part === 'cerebellum' ? '#10b981' : '#334155'}" 
                stroke="${part === 'cerebellum' ? '#34d399' : '#64748b'}" 
                stroke-width="3" 
                filter="${part === 'cerebellum' ? 'drop-shadow(0 0 10px rgba(16,185,129,0.8))' : 'none'}" />
          <text x="185" y="165" fill="#fff" font-size="11" font-weight="bold">CEREBELLUM</text>

          <!-- Medulla (Brain Stem leading to spinal cord) -->
          <path d="M 150 145 L 175 155 L 145 215 L 125 210 Z" 
                fill="${part === 'medulla' ? '#f59e0b' : '#1e293b'}" 
                stroke="${part === 'medulla' ? '#fbbf24' : '#475569'}" 
                stroke-width="3" 
                filter="${part === 'medulla' ? 'drop-shadow(0 0 10px rgba(245,158,11,0.8))' : 'none'}" />
          <text x="75" y="195" fill="${part === 'medulla' ? '#fbbf24' : '#94a3b8'}" font-size="11" font-weight="bold">MEDULLA →</text>
        </svg>
      </div>

      <!-- Clinical / Daily Life Info Card -->
      <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(139, 92, 246, 0.35); border-radius: 14px; padding: 1.2rem; width: 380px; text-align: left;">
        ${getBrainCardHTML(part)}
      </div>
    </div>
  `;
}

function getBrainCardHTML(part) {
  if (part === 'cerebrum') {
    return `
      <span class="badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc; font-weight: 700; font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 4px;">Top Dome • ~85% of Mass</span>
      <h4 style="color: #fff; margin: 0.5rem 0; font-size: 1.25rem;">🧠 The Cerebrum (CPU)</h4>
      <p style="font-size: 0.9rem; color: #cbd5e1; margin-bottom: 0.6rem;">Has deep grooves and ridges resembling a walnut. Controls all mental and conscious operations.</p>
      <ul style="font-size: 0.88rem; color: #94a3b8; padding-left: 1.2rem; line-height: 1.5;">
        <li><strong>Mental Powers:</strong> Thinking, reasoning, logic, memory, spelling, imagination.</li>
        <li><strong>Sensory Center:</strong> Decodes vision from eyes, hearing from ears, taste, touch, smell.</li>
        <li><strong>Contralateral Rule:</strong> Left hemisphere controls right side of body; right hemisphere controls left!</li>
      </ul>
      <div style="margin-top: 0.75rem; background: rgba(139, 92, 246, 0.15); padding: 0.4rem 0.7rem; border-radius: 6px; font-size: 0.85rem; color: #e9d5ff;">
        <strong>Daily Example:</strong> Memorizing your times tables and solving a science test!
      </div>
    `;
  } else if (part === 'cerebellum') {
    return `
      <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7; font-weight: 700; font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 4px;">Lower Back • Muscle Master</span>
      <h4 style="color: #fff; margin: 0.5rem 0; font-size: 1.25rem;">🤸 The Cerebellum (Gymnast)</h4>
      <p style="font-size: 0.9rem; color: #cbd5e1; margin-bottom: 0.6rem;">Located under the cerebrum. Coordinates muscle timing and equilibrium.</p>
      <ul style="font-size: 0.88rem; color: #94a3b8; padding-left: 1.2rem; line-height: 1.5;">
        <li><strong>Muscle Coordination:</strong> Makes limb movements smooth and graceful instead of clumsy.</li>
        <li><strong>Balance & Posture:</strong> Works closely with inner ear fluid canals so you stay upright.</li>
        <li><strong>If Damaged:</strong> Walking becomes staggering, movements become jerky, speech slurs.</li>
      </ul>
      <div style="margin-top: 0.75rem; background: rgba(16, 185, 129, 0.15); padding: 0.4rem 0.7rem; border-radius: 6px; font-size: 0.85rem; color: #a7f3d0;">
        <strong>Daily Example:</strong> Riding a two-wheel bicycle or balancing on one foot!
      </div>
    `;
  } else {
    return `
      <span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a; font-weight: 700; font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 4px;">Brain Stem • Autonomous Life</span>
      <h4 style="color: #fff; margin: 0.5rem 0; font-size: 1.25rem;">🫀 The Medulla (24/7 Life Guard)</h4>
      <p style="font-size: 0.9rem; color: #cbd5e1; margin-bottom: 0.6rem;">Connects the brain to the spinal cord. Controls involuntary vitals.</p>
      <ul style="font-size: 0.88rem; color: #94a3b8; padding-left: 1.2rem; line-height: 1.5;">
        <li><strong>Never Sleeps:</strong> Operates 24 hours a day, 365 days a year without a single break!</li>
        <li><strong>Vital Functions:</strong> Heartbeat, breathing rate, blood circulation, blood pressure.</li>
        <li><strong>Protective Reflexes:</strong> Sneezing, coughing, swallowing food down food pipe.</li>
      </ul>
      <div style="margin-top: 0.75rem; background: rgba(245, 158, 11, 0.15); padding: 0.4rem 0.7rem; border-radius: 6px; font-size: 0.85rem; color: #fef3c7;">
        <strong>Daily Example:</strong> Keeping your heart pumping and lungs breathing while you sleep at 3 AM!
      </div>
    `;
  }
}

function getNervousExplanationHTML(part, isReflex) {
  if (isReflex) {
    return `
      <strong style="color: #ef4444;">⚡ REFLEX ACTION EMERGENCY LOOP:</strong> 
      Reaction time is only <strong>~0.05 seconds</strong>! Heat is sensed by skin → Sensory nerve carries signal to <strong>Spinal Cord</strong> → Spinal cord directly fires motor nerve → Biceps contracts and jerks hand away! 
      <em>(The message reaches your cerebrum only AFTER your hand is safe, which is why you scream "OUCH!" a fraction of a second later!)</em>
    `;
  }

  return `
    <strong>CENTRAL NERVOUS SYSTEM BLUEPRINT:</strong> 
    The <strong>Cerebrum</strong> thinks and stores memories; the <strong>Cerebellum</strong> balances muscles; the <strong>Medulla</strong> keeps you alive 24/7. 
    Click <em>"🔥 Test Reflex Arc!"</em> to see how your spinal cord saves your hand from severe burns without waiting for the brain!
  `;
}

function attachNervousGadgetEvents() {
  const brainBtns = document.querySelectorAll('.lab-btn[data-brain]');
  brainBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      AudioController.click();
      brainBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.labStates.brainPart = btn.getAttribute('data-brain');
      state.labStates.reflexTriggered = false;
      const reflexBtn = document.getElementById('btn-trigger-reflex');
      if (reflexBtn) reflexBtn.classList.remove('active');
      updateNervousGadgetView();
    });
  });

  const reflexBtn = document.getElementById('btn-trigger-reflex');
  if (reflexBtn) {
    reflexBtn.addEventListener('click', () => {
      markLabInteracted('ch4_nervous');
      AudioController.fanfare();
      state.labStates.reflexTriggered = true;
      brainBtns.forEach(b => b.classList.remove('active'));
      reflexBtn.classList.add('active');
      updateNervousGadgetView();
    });
  }
}

function updateNervousGadgetView() {
  const stage = document.getElementById('nervous-stage');
  const exp = document.getElementById('nervous-explanation');
  if (stage) stage.innerHTML = getNervousStageHTML(state.labStates.brainPart, state.labStates.reflexTriggered);
  if (exp) exp.innerHTML = getNervousExplanationHTML(state.labStates.brainPart, state.labStates.reflexTriggered);
}

function attachGadgetEvents(ch) {
  const allLabBtns = document.querySelectorAll('.interactive-lab-container .lab-btn');
  allLabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      markLabInteracted(ch.id);
    });
  });
  if (ch.id === 'ch3_skeletal') {
    attachSkeletalGadgetEvents();
  } else if (ch.id === 'ch4_nervous') {
    attachNervousGadgetEvents();
  } else if (ch.id === 'ch11_rocks') {
    const btns = document.querySelectorAll('.lab-btn[data-rock]');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        AudioController.click();
        btns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        state.labStates.rockSample = b.getAttribute('data-rock');
        const stage = document.getElementById('rock-stage');
        const exp = document.getElementById('rock-explanation');
        if (stage) stage.innerHTML = getRockStageHTML(state.labStates.rockSample);
        if (exp) exp.innerHTML = getRockExplanationHTML(state.labStates.rockSample);
      });
    });
  } else if (ch.id === 'ch13_matter') {
    const svgEl = document.getElementById('molecule-svg');
    renderMoleculeSVG(svgEl, state.labStates.moleculeState);

    const btns = document.querySelectorAll('.lab-btn[data-state]');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        AudioController.click();
        btns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        state.labStates.moleculeState = b.getAttribute('data-state');
        renderMoleculeSVG(svgEl, state.labStates.moleculeState);
        const expEl = document.getElementById('molecule-explanation');
        if (expEl) expEl.innerHTML = getMoleculeExplanation(state.labStates.moleculeState);
      });
    });
  } else if (ch.id === 'ch7_air_water') {
    const svgEl = document.getElementById('balance-svg');
    renderBalanceSVG(svgEl, state.labStates.balloonState === 'pricked');

    const btns = document.querySelectorAll('.lab-btn[data-balloon]');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        AudioController.click();
        btns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        state.labStates.balloonState = b.getAttribute('data-balloon');
        const isPricked = state.labStates.balloonState === 'pricked';
        renderBalanceSVG(svgEl, isPricked);
        const expEl = document.getElementById('balloon-explanation');
        if (expEl) {
          expEl.innerHTML = isPricked 
            ? 'When the right balloon is pricked, air escapes! <strong>The left inflated balloon dips down</strong>, proving air has measurable weight and mass!'
            : 'Both balloons are inflated with equal air. <strong>The scale remains balanced</strong>, proving both sides hold equal mass.';
        }
      });
    });
  } else if (ch.id === 'ch5_health') {
    const btns = document.querySelectorAll('.lab-btn[data-nutrient]');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        AudioController.click();
        btns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        state.labStates.dietNutrient = b.getAttribute('data-nutrient');
        const stage = document.getElementById('nutrient-stage');
        if (stage) stage.innerHTML = getNutrientCard(state.labStates.dietNutrient);
      });
    });
  } else {
    // L-2 Animals
    const btns = document.querySelectorAll('.lab-btn[data-animal]');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        AudioController.click();
        btns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        state.labStates.animalSelected = b.getAttribute('data-animal');
        const stage = document.getElementById('animal-stage');
        if (stage) stage.innerHTML = getAnimalCard(state.labStates.animalSelected);
      });
    });
  }
}

// ==========================================================================
// 7. MODE 2: SPOT THE EXAM TRAP ("BE THE TEACHER")
// ==========================================================================
function renderTrapsView(container) {
  const ch = getActiveChapter();

  // Calculate chapter traps progress
  let diagnosedCount = 0;
  let correctDiagnoses = 0;
  ch.examTraps.forEach(trap => {
    const saved = state.trapAnswers[trap.id];
    if (typeof saved === 'number') {
      diagnosedCount++;
      const correctIdx = (typeof trap.correctIndex === 'number') ? trap.correctIndex : (typeof trap.correct === 'number' ? trap.correct : 0);
      if (saved === correctIdx) correctDiagnoses++;
    }
  });

  let html = renderMasteryBanner(ch);
  html += `
    <div class="view-header">
      <div class="view-header-title">
        <h3>🔍 ${ch.number}: Spot the Exam Traps</h3>
        <p>You are the Teacher! Diagnose simulated CBSE student mistakes and <strong>choose the 1 correct diagnosis option</strong> for each student paper.</p>
      </div>
    </div>

    <!-- High-Visibility Mission Instruction Banner -->
    <div class="traps-mission-banner">
      <div class="mission-banner-icon">🎯</div>
      <div class="mission-banner-body">
        <div class="mission-banner-title">
          <span>TEACHER MISSION: CHOOSE 1 CORRECT DIAGNOSIS</span>
          <span class="mission-banner-type-badge">Multiple Choice • Pick 1</span>
        </div>
        <p class="mission-banner-desc">
          Each card below shows a simulated student test paper with a classic misconception.
          <strong>Choose the 1 correct option</strong> that accurately diagnoses why their answer is wrong. The other options are tempting distractor traps!
        </p>
      </div>
      <div class="mission-banner-stats">
        <div class="mission-stat-badge">
          <span>Diagnosed:</span>
          <strong>${diagnosedCount} / ${ch.examTraps.length}</strong>
          ${diagnosedCount > 0 ? `<span class="stat-correct-count">(${correctDiagnoses} Correct)</span>` : ''}
        </div>
        ${diagnosedCount > 0 ? `
          <button class="btn-reset-traps-all" id="btn-reset-all-traps" title="Clear your answers and retry diagnosing all traps in this chapter">
            🔄 Reset Traps
          </button>
        ` : ''}
      </div>
    </div>

    <div class="traps-container">
  `;

  ch.examTraps.forEach((trap, i) => {
    const savedAnswer = state.trapAnswers[trap.id];
    const isAnswered = typeof savedAnswer === 'number';
    const correctIdx = (typeof trap.correctIndex === 'number') ? trap.correctIndex : (typeof trap.correct === 'number' ? trap.correct : 0);
    const isCorrect = isAnswered && (savedAnswer === correctIdx);

    html += `
      <div class="trap-card ${isAnswered ? (isCorrect ? 'trap-card-correct' : 'trap-card-wrong') : ''}" id="card-${trap.id}">
        <div class="trap-header">
          <span class="student-tag">⚠️ Simulated Student Paper: ${trap.student}</span>
          <div class="trap-header-right">
            ${isAnswered ? (isCorrect ? '<span class="trap-status-badge badge-success">✓ Diagnosed Correctly</span>' : '<span class="trap-status-badge badge-warning">⚠️ Reviewed</span>') : '<span class="trap-status-badge badge-pending">Needs Diagnosis</span>'}
            <span class="trap-number">Trap ${i + 1} of ${ch.examTraps.length}</span>
          </div>
        </div>

        <div class="student-answer-slip">
          <div class="slip-label">Exam Question:</div>
          <div class="slip-question">${trap.question}</div>
          <div class="slip-label">${trap.student}’s Written Answer:</div>
          <div class="slip-response">"${trap.studentAnswer}"</div>
        </div>

        <div class="trap-prompt">
          <span class="prompt-icon">🧑‍🏫</span>
          <div>
            <span class="prompt-title">Teacher Diagnostic Question:</span>
            <span class="prompt-text">${trap.prompt}</span>
          </div>
        </div>

        <div class="trap-choose-instruction">
          <div class="instruction-main">
            <span class="instruction-badge">👉 YOUR TASK</span>
            <strong>Choose 1 Correct Diagnosis:</strong>
          </div>
          <span class="instruction-sub">Only ONE option below correctly identifies the error — tap the correct one:</span>
        </div>

        <div class="trap-options" role="radiogroup" aria-label="Diagnostic options for Trap ${i + 1}">
          ${trap.options.map((opt, optIndex) => {
            const letters = ['Option A', 'Option B', 'Option C', 'Option D'];
            let cls = '';
            let radioContent = '<span class="trap-radio-circle"></span>';
            let pillBadge = '<span class="opt-hint-pill">Tap to choose</span>';

            if (isAnswered) {
              if (optIndex === correctIdx) {
                cls = 'selected-correct';
                radioContent = '<span class="trap-radio-symbol correct">✓</span>';
                pillBadge = optIndex === savedAnswer 
                  ? '<span class="opt-status-tag tag-correct">✓ Your Choice: Correct Diagnosis!</span>'
                  : '<span class="opt-status-tag tag-actual">✓ True Scientific Diagnosis</span>';
              } else if (optIndex === savedAnswer) {
                cls = 'selected-wrong';
                radioContent = '<span class="trap-radio-symbol wrong">✗</span>';
                pillBadge = '<span class="opt-status-tag tag-wrong">✗ Your Choice: Incorrect</span>';
              } else {
                cls = 'opt-distractor';
                radioContent = '<span class="trap-radio-circle dim"></span>';
                pillBadge = '<span class="opt-status-tag tag-distractor">Distractor Trap</span>';
              }
            }

            return `
              <button class="trap-option-btn ${cls}" 
                data-trap-id="${trap.id}" 
                data-opt-index="${optIndex}"
                ${isAnswered ? 'disabled' : ''}
                aria-label="${letters[optIndex]}: ${opt}">
                <div class="trap-opt-left">
                  <span class="trap-opt-letter">${letters[optIndex]}</span>
                  ${radioContent}
                </div>
                <div class="trap-opt-content">
                  <span class="trap-opt-text">${opt}</span>
                  ${pillBadge}
                </div>
              </button>
            `;
          }).join('')}
        </div>

        ${isAnswered ? `
          <div class="trap-feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}">
            <div class="feedback-heading">
              <span class="feedback-icon">${isCorrect ? '🎉' : '💡'}</span>
              <h5>${isCorrect ? 'Excellent Teacher Diagnosis!' : 'Teacher Diagnosis & Master Explanation:'}</h5>
            </div>
            <p>${trap.teacherFeedback}</p>
          </div>
        ` : ''}
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
  bindMasteryBannerEvents(container, ch.id);

  // Event Listeners for Trap Options
  const optionBtns = container.querySelectorAll('.trap-option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const trapId = btn.getAttribute('data-trap-id');
      const optIndex = parseInt(btn.getAttribute('data-opt-index'), 10);
      const trap = ch.examTraps.find(t => t.id === trapId);
      if (!trap) return;

      state.trapAnswers[trapId] = optIndex;
      saveActiveState();

      const correctIdx = (typeof trap.correctIndex === 'number') ? trap.correctIndex : (typeof trap.correct === 'number' ? trap.correct : 0);
      if (optIndex === correctIdx) {
        AudioController.correct();
        triggerFlash('correct');
        ConfettiController.launch();
      } else {
        AudioController.wrong();
        triggerFlash('wrong');
      }

      // Re-evaluate chapter stars whenever a trap is answered
      evaluateAndAwardStars(state.activeChapterId);

      renderTrapsView(container);
    });
  });

  // Reset all traps for active chapter listener
  const resetBtn = container.querySelector('#btn-reset-all-traps');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      ch.examTraps.forEach(t => {
        delete state.trapAnswers[t.id];
      });
      saveActiveState();
      renderTrapsView(container);
    });
  }
}

// ==========================================================================
// 8. MODE 3: PRACTICE & SCHOOL WORKSHEETS
// ==========================================================================
function renderPracticeView(container) {
  const ch = getActiveChapter();

  // Filter questions by worksheet number first
  const wsQuestions = (state.activeWsFilter === 'all')
    ? ch.questions
    : ch.questions.filter(q => q.wsNumber === state.activeWsFilter);

  let filtered = wsQuestions;
  if (state.activePracticeFilter !== 'all') {
    filtered = filtered.filter(q => q.category === state.activePracticeFilter);
  }
  // Fallback if no questions match
  if (filtered.length === 0) {
    state.activePracticeFilter = 'all';
    filtered = wsQuestions;
  }

  // Ensure valid current index
  if (state.currentQuestionIndex >= filtered.length) {
    state.currentQuestionIndex = 0;
  }
  const q = filtered[state.currentQuestionIndex];
  const answeredInfo = state.answeredMap[q.id];
  const isAnswered = !!answeredInfo;

  let html = renderMasteryBanner(ch);
  html += `
    <div class="practice-container">
      <div class="view-header">
        <div class="view-header-title">
          <h3>🧩 ${ch.number} School Worksheet Practice</h3>
          <p>Real thinking exercises, diagrams, and questions from CBSE school revision worksheets.</p>
        </div>
      </div>

      <!-- Worksheet Filter Pills -->
      <div class="practice-filters" style="margin-bottom: 0.5rem;">
        <button class="filter-pill ws-filter ${state.activeWsFilter === 'all' ? 'active' : ''}" data-wsfilter="all">📚 All Worksheets</button>
        <button class="filter-pill ws-filter ${state.activeWsFilter === 1 ? 'active' : ''}" data-wsfilter="1">📄 WS I</button>
        <button class="filter-pill ws-filter ${state.activeWsFilter === 2 ? 'active' : ''}" data-wsfilter="2">📄 WS II</button>
        <button class="filter-pill ws-filter ${state.activeWsFilter === 3 ? 'active' : ''}" data-wsfilter="3">📄 WS III</button>
      </div>

      <!-- Category Filter Pills -->
      <div class="practice-filters">
        <button class="filter-pill ${state.activePracticeFilter === 'all' ? 'active' : ''}" data-filter="all">🎯 All Types (${wsQuestions.length})</button>
        <button class="filter-pill ${state.activePracticeFilter === 'mcq' ? 'active' : ''}" data-filter="mcq">🔘 MCQs & Deductions</button>
        <button class="filter-pill ${state.activePracticeFilter === 'whoami' ? 'active' : ''}" data-filter="whoami">❓ Who Am I? Riddles</button>
        <button class="filter-pill ${state.activePracticeFilter === 'compare' ? 'active' : ''}" data-filter="compare">⚖️ Compare & Contrast</button>
        <button class="filter-pill ${state.activePracticeFilter === 'oddone' ? 'active' : ''}" data-filter="oddone">🔍 Odd One Out</button>
        <button class="filter-pill ${state.activePracticeFilter === 'scenario' ? 'active' : ''}" data-filter="scenario">🧪 Case Studies & Scenarios</button>
      </div>

      <!-- Status Bar -->
      <div class="practice-header-bar">
        <div class="practice-counter">
          Question <span>${state.currentQuestionIndex + 1}</span> of <span>${filtered.length}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div class="practice-score-badge">
            <span class="score-item score-correct">✅ ${state.scoreCorrect}</span>
            <span class="score-item score-wrong">❌ ${state.scoreWrong}</span>
          </div>
          <div class="practice-stars-display" title="Mastery Stars for ${ch.number}" style="font-size: 0.95rem; font-weight: 700; color: #fde047;">
            ⭐ ${getChapterStars(ch.id)} / ${ch.targetStars || 10} Stars
          </div>
        </div>
      </div>

      <!-- Question Card -->
      <div class="question-card">
        <div class="question-meta-row">
          <span class="question-source-tag">${q.source}</span>
          <span class="question-marks">${q.marks}</span>
        </div>

        <div class="question-body">${q.body}</div>
        ${q.image ? `<div class="question-diagram-wrap"><img src="${q.image}" alt="Worksheet Diagram" class="question-diagram-img" /></div>` : ''}

        <div class="options-grid">
          ${q.options.map((opt, idx) => {
            const letters = ['A', 'B', 'C', 'D'];
            let cls = '';
            if (isAnswered) {
              if (idx === q.correct) cls = 'correct';
              else if (idx === answeredInfo.selectedIndex) cls = 'wrong';
            }
            return `
              <button class="option-btn ${cls}" 
                data-idx="${idx}" 
                ${isAnswered ? 'disabled' : ''}>
                <span class="option-letter">${letters[idx] || (idx + 1)}</span>
                <span class="option-text">${opt}</span>
              </button>
            `;
          }).join('')}
        </div>

        ${isAnswered ? `
          <div class="explanation-card">
            <div class="explanation-header">
              ${answeredInfo.isCorrect ? '✅ Brilliant Scientific Deduction!' : '💡 Conceptual Explanation:'}
            </div>
            <div class="explanation-text">${q.explanation}</div>
            <div class="explanation-key-takeaway">
              📌 Key Takeaway: ${q.takeaway}
            </div>
          </div>
        ` : ''}

        <!-- Navigation Buttons -->
        <div class="question-nav-row">
          <button class="btn btn-secondary" id="btn-prev-q" ${state.currentQuestionIndex === 0 ? 'disabled' : ''}>
            ← Previous
          </button>
          <button class="btn btn-primary" id="btn-next-q">
            ${state.currentQuestionIndex === filtered.length - 1 ? 'Finish Drill 🏆' : 'Next Question →'}
          </button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
  bindMasteryBannerEvents(container, ch.id);

  // Worksheet filter click handlers
  const wsFilterPills = container.querySelectorAll('.ws-filter');
  wsFilterPills.forEach(p => {
    p.addEventListener('click', () => {
      AudioController.click();
      const val = p.getAttribute('data-wsfilter');
      state.activeWsFilter = val === 'all' ? 'all' : parseInt(val, 10);
      state.currentQuestionIndex = 0;
      saveActiveState();
      renderPracticeView(container);
    });
  });

  // Category filter click handlers
  const filterPills = container.querySelectorAll('.filter-pill:not(.ws-filter)');
  filterPills.forEach(p => {
    p.addEventListener('click', () => {
      AudioController.click();
      state.activePracticeFilter = p.getAttribute('data-filter');
      state.currentQuestionIndex = 0;
      saveActiveState();
      renderPracticeView(container);
    });
  });

  // Option selection
  const optionBtns = container.querySelectorAll('.option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      const isCorrect = (idx === q.correct);

      state.answeredMap[q.id] = { selectedIndex: idx, isCorrect };

      if (isCorrect) {
        state.scoreCorrect++;
        AudioController.correct();
        triggerFlash('correct');
        evaluateAndAwardStars(state.activeChapterId);
      } else {
        state.scoreWrong++;
        AudioController.wrong();
        triggerFlash('wrong');
      }

      saveActiveState();
      renderPracticeView(container);
    });
  });

  // Navigation handlers
  const prevBtn = document.getElementById('btn-prev-q');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.currentQuestionIndex > 0) {
        AudioController.click();
        state.currentQuestionIndex--;
        saveActiveState();
        renderPracticeView(container);
      }
    });
  }

  const nextBtn = document.getElementById('btn-next-q');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      AudioController.click();
      if (state.currentQuestionIndex < filtered.length - 1) {
        state.currentQuestionIndex++;
        saveActiveState();
        renderPracticeView(container);
      } else {
        // Complete drill & show modal
        showResultsModal(state.scoreCorrect, filtered.length);
      }
    });
  }
}

// ==========================================================================
// 9. MODE 4: 60-SECOND SCIENCE SPRINT
// ==========================================================================
function renderChallengeView(container) {
  const ch = getActiveChapter();

  let html = renderMasteryBanner(ch);
  html += `
    <div class="sprint-container">
      <div class="view-header" style="justify-content: center; text-align: center;">
        <div class="view-header-title">
          <h3>⚡ 60-Second Science Sprint</h3>
          <p>Put your scientific instincts to the test under rapid-fire conditions!</p>
        </div>
      </div>

      <div class="sprint-intro-card" id="sprint-intro">
        <div class="sprint-badge">⏱️</div>
        <h3>Rapid-Fire Recall: ${ch.title}</h3>
        <p>Answer as many conceptual science questions as you can in 60 seconds. Accuracy and quick thinking earn stars!</p>

        <div class="sprint-rules">
          <div class="rule-box">
            <div class="rule-icon">⚡</div>
            <div class="rule-title">60 Seconds</div>
            <div class="rule-desc">Fast-paced timer</div>
          </div>
          <div class="rule-box">
            <div class="rule-icon">🎯</div>
            <div class="rule-title">+10 Points</div>
            <div class="rule-desc">Per correct deduction</div>
          </div>
          <div class="rule-box">
            <div class="rule-icon">⭐</div>
            <div class="rule-title">Up to 3 Stars</div>
            <div class="rule-desc">Earn syllabus mastery</div>
          </div>
        </div>

        <button class="btn btn-primary" id="btn-start-sprint" style="font-size: 1.1rem; padding: 0.85rem 2rem;">
          🚀 Start 60s Sprint Now!
        </button>
      </div>

      <!-- Live Sprint Interface -->
      <div class="sprint-game-wrap" id="sprint-live">
        <div class="sprint-timer-bar-wrap">
          <div class="sprint-timer-bar-fill" id="sprint-timer-bar"></div>
        </div>

        <div class="sprint-live-stats">
          <div class="sprint-clock">⏳ <span id="sprint-time-label">60</span>s</div>
          <div class="sprint-score">Score: <span id="sprint-score-label">0</span></div>
        </div>

        <div class="question-card" id="sprint-q-card">
          <!-- Dynamically injected during sprint loop -->
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
  bindMasteryBannerEvents(container, ch.id);

  const startBtn = document.getElementById('btn-start-sprint');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      AudioController.click();
      startSprintGame();
    });
  }
}

function startSprintGame() {
  const intro = document.getElementById('sprint-intro');
  const live = document.getElementById('sprint-live');
  if (!intro || !live) return;

  intro.style.display = 'none';
  live.style.display = 'block';

  const ch = getActiveChapter();
  // Shuffle questions for sprint
  state.sprint.questions = [...ch.questions].sort(() => Math.random() - 0.5);
  state.sprint.running = true;
  state.sprint.timeLeft = 60;
  state.sprint.score = 0;
  state.sprint.currentIndex = 0;

  renderSprintQuestion();

  // Timer loop
  clearInterval(state.sprint.timerId);
  state.sprint.timerId = setInterval(() => {
    state.sprint.timeLeft--;
    const timeLabel = document.getElementById('sprint-time-label');
    const timeBar = document.getElementById('sprint-timer-bar');
    if (timeLabel) timeLabel.textContent = state.sprint.timeLeft;
    if (timeBar) timeBar.style.width = `${(state.sprint.timeLeft / 60) * 100}%`;

    if (state.sprint.timeLeft <= 0) {
      endSprintGame();
    }
  }, 1000);
}

function renderSprintQuestion() {
  const card = document.getElementById('sprint-q-card');
  if (!card) return;

  const q = state.sprint.questions[state.sprint.currentIndex % state.sprint.questions.length];

  card.innerHTML = `
    <div class="question-meta-row">
      <span class="question-source-tag">${q.source}</span>
      <span class="question-marks">Speed Drill</span>
    </div>
    <div class="question-body">${q.body}</div>
    ${q.image ? `<div class="question-diagram-wrap" style="padding: 0.5rem; margin: 0.5rem 0;"><img src="${q.image}" alt="Worksheet Diagram" class="question-diagram-img" style="max-height: 130px;" /></div>` : ''}
    <div class="options-grid">
      ${q.options.map((opt, idx) => `
        <button class="option-btn" data-idx="${idx}">
          <span class="option-letter">${idx + 1}</span>
          <span class="option-text">${opt}</span>
        </button>
      `).join('')}
    </div>
  `;

  const btns = card.querySelectorAll('.option-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      if (idx === q.correct) {
        state.sprint.score += 10;
        AudioController.correct();
        triggerFlash('correct');
      } else {
        AudioController.wrong();
        triggerFlash('wrong');
      }

      const scoreLabel = document.getElementById('sprint-score-label');
      if (scoreLabel) scoreLabel.textContent = state.sprint.score;

      if (typeof btn.blur === 'function') btn.blur();
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }

      state.sprint.currentIndex++;
      renderSprintQuestion();
    });
  });
}

function endSprintGame() {
  clearInterval(state.sprint.timerId);
  state.sprint.running = false;

  // Record sprint high score for sprint milestone
  state.chapterProgress = state.chapterProgress || {};
  state.chapterProgress[state.activeChapterId] = state.chapterProgress[state.activeChapterId] || {};
  const prevHigh = state.chapterProgress[state.activeChapterId].sprintHighScore || 0;
  state.chapterProgress[state.activeChapterId].sprintHighScore = Math.max(prevHigh, state.sprint.score);
  saveActiveState();
  evaluateAndAwardStars(state.activeChapterId);

  const totalPossible = state.sprint.currentIndex;
  const correctCount = Math.round(state.sprint.score / 10);

  showResultsModal(correctCount, Math.max(correctCount, totalPossible));
}

// ==========================================================================
// 10. MODE 5: PRINTABLE WORKSHEET STUDIO
// ==========================================================================
function renderWorksheetView(container) {
  const ch = getActiveChapter();
  const isCh3 = (ch.id === 'ch3_skeletal');
  const selWs = state.worksheetSettings.selectedWs || 'all';
  const showAnswers = !!state.worksheetSettings.showAnswers;

  let controlsHtml = `
    <div class="worksheet-studio">
      <div class="worksheet-controls-bar no-print">
        <div class="worksheet-select-group">
          <label>Select Worksheet:</label>
          <select class="worksheet-select" id="ws-number-select">
            <option value="all" ${selWs === 'all' ? 'selected' : ''}>📚 Comprehensive Assessment (${isCh3 ? '25 Marks' : 'Unit Review'})</option>
            ${isCh3 ? `
              <option value="1" ${selWs === '1' ? 'selected' : ''}>📄 Freedom International • Worksheet I (Objective & MCQs • 13 Marks)</option>
              <option value="2" ${selWs === '2' ? 'selected' : ''}>📄 Freedom International • Worksheet II (Structure & Short Answers • 16 Marks)</option>
              <option value="3" ${selWs === '3' ? 'selected' : ''}>📄 Freedom International • Worksheet III (Diagrams & Critical Thinking • 27 Marks)</option>
            ` : `
              <option value="1" ${selWs === '1' ? 'selected' : ''}>📄 School Revision Sheet 1</option>
              <option value="2" ${selWs === '2' ? 'selected' : ''}>📄 School Revision Sheet 2</option>
              <option value="3" ${selWs === '3' ? 'selected' : ''}>📄 School Revision Sheet 3</option>
            `}
          </select>
        </div>

        <div class="worksheet-select-group">
          <label>View Mode:</label>
          <select class="worksheet-select" id="ws-mode-select">
            <option value="test" ${!showAnswers ? 'selected' : ''}>📝 Student Test Paper (Blank Lines / For Practice)</option>
            <option value="key" ${showAnswers ? 'selected' : ''}>🔑 Teacher Answer Key (With Full Solutions)</option>
          </select>
        </div>

        <button class="btn btn-primary" id="btn-do-print">
          🖨️ Print A4 Worksheet
        </button>
      </div>

      <div class="worksheet-paper">
  `;

  let paperHtml = '';

  if (isCh3 && selWs === '1') {
    // ------------------------------------------------------------------------
    // FREEDOM INTERNATIONAL SCHOOL — WORKSHEET I
    // ------------------------------------------------------------------------
    const ws1Questions = ch.questions.filter(q => q.wsNumber === 1);
    paperHtml += `
      <div class="ws-school-header">
        <div class="ws-school-badge" style="font-weight: 800; letter-spacing: 0.1em; color: #0284c7; text-transform: uppercase; font-size: 0.9rem; margin-bottom: 0.35rem;">FREEDOM INTERNATIONAL SCHOOL</div>
        <h3>SCIENCE WORKSHEET-I</h3>
        <h4>L-3 THE SKELETAL AND MUSCULAR SYSTEM</h4>
        <p>CLASS: V &nbsp;|&nbsp; SUBJECT: SCIENCE (EVS) &nbsp;|&nbsp; TIME: 35 MINS &nbsp;|&nbsp; MAX MARKS: 13</p>
      </div>

      <div class="ws-student-meta-grid">
        <div class="ws-meta-field">Student Name: _______________________</div>
        <div class="ws-meta-field">Roll No: ___________ &nbsp; Sec: _____</div>
        <div class="ws-meta-field">Date: ____________ &nbsp; Marks: ____/13</div>
      </div>

      <div class="ws-section">
        <div class="ws-section-title">DO AS DIRECTED: MULTIPLE CHOICE QUESTIONS (1 Mark Each)</div>
        ${ws1Questions.map((q, i) => `
          <div class="ws-question-item">
            <div class="ws-question-text">
              <strong>Q${i + 1}.</strong> ${q.body} <span class="ws-marks">[${q.marks || '1 Mark'}]</span>
            </div>
            ${q.image ? `<div class="ws-question-diagram-wrap"><img src="${q.image}" alt="Question Diagram" class="ws-question-diagram-img" /></div>` : ''}
            <div style="margin-left: 1.25rem; font-size: 0.9rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.35rem; margin-top: 0.35rem;">
              ${q.options.map((opt, idx) => `
                <div style="${showAnswers && idx === q.correct ? 'font-weight: 700; color: #15803d; background: #dcfce7; padding: 2px 6px; border-radius: 4px; display: inline-block;' : ''}">
                  (${String.fromCharCode(97 + idx)}) ${opt}
                </div>
              `).join('')}
            </div>
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                <strong>Correct Answer:</strong> (${String.fromCharCode(97 + q.correct)}) ${q.options[q.correct]}<br>
                <em>Scientific Reasoning:</em> ${q.explanation}<br>
                <strong>Takeaway:</strong> ${q.takeaway || ''}
              </div>
            ` : `
              <div style="margin-top: 0.45rem; font-weight: 600; color: #334155;">Ans: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</div>
            `}
          </div>
        `).join('')}
      </div>
    `;

  } else if (isCh3 && selWs === '2') {
    // ------------------------------------------------------------------------
    // FREEDOM INTERNATIONAL SCHOOL — WORKSHEET II
    // ------------------------------------------------------------------------
    paperHtml += `
      <div class="ws-school-header">
        <div class="ws-school-badge" style="font-weight: 800; letter-spacing: 0.1em; color: #0284c7; text-transform: uppercase; font-size: 0.9rem; margin-bottom: 0.35rem;">FREEDOM INTERNATIONAL SCHOOL</div>
        <h3>SCIENCE-WORKSHEET-II</h3>
        <h4>L-3 THE SKELETAL AND MUSCULAR SYSTEM</h4>
        <p>CLASS: V &nbsp;|&nbsp; SUBJECT: SCIENCE (EVS) &nbsp;|&nbsp; TIME: 45 MINS &nbsp;|&nbsp; MAX MARKS: 16</p>
      </div>

      <div class="ws-student-meta-grid">
        <div class="ws-meta-field">Student Name: _______________________</div>
        <div class="ws-meta-field">Roll No: ___________ &nbsp; Sec: _____</div>
        <div class="ws-meta-field">Date: ____________ &nbsp; Marks: ____/16</div>
      </div>

      <div class="ws-section">
        <div class="ws-section-title">DO AS DIRECTED: STRUCTURE ANALYSIS & SHORT ANSWERS</div>

        <!-- Question I -->
        <div class="ws-question-item">
          <div class="ws-question-text">
            <strong>I.</strong> How are involuntary muscles useful to us? Explain with an example. <span class="ws-marks">[2 Marks]</span>
          </div>
          ${showAnswers ? `
            <div class="ws-answer-key-box">
              <strong>Model Answer:</strong> Involuntary muscles work automatically without our conscious effort or command. They maintain vital body processes continuously even when we are asleep.<br>
              <strong>Example:</strong> (1) Smooth muscles in the stomach and intestines contract rhythmically (peristalsis) to digest and push food along the alimentary canal. (2) Cardiac muscles in the heart pump blood through blood vessels 24/7 without stopping.<br>
              <em>Marking:</em> 1M for definition/usefulness + 1M for valid example.
            </div>
          ` : `
            <div class="ws-answer-lines" style="height: 54px;"></div>
          `}
        </div>

        <!-- Question II -->
        <div class="ws-question-item">
          <div class="ws-question-text">
            <strong>II.</strong> Differentiate between: <span class="ws-marks">[4 Marks]</span>
          </div>
          <div style="margin-left: 1.25rem;">
            <p><strong>1. Rib cage and skull</strong> <span class="ws-marks">[2M]</span></p>
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                • <strong>Rib cage:</strong> Formed of 12 pairs of curved bones (24 ribs) attached to the spine and central sternum. It expands during breathing and protects thoracic organs (heart and lungs).<br>
                • <strong>Skull:</strong> Formed of 22 bones (8 cranial + 14 facial). It forms a rigid helmet with immovable suture joints protecting the brain, with only the lower jaw movable.
              </div>
            ` : `
              <div class="ws-answer-lines" style="height: 48px;"></div>
            `}

            <p style="margin-top: 0.75rem;"><strong>2. Tendon and ligament</strong> <span class="ws-marks">[2M]</span></p>
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                • <strong>Tendon (3 Ts Rule):</strong> Tough, inelastic cord of fibrous tissue that connects <em>Two Types</em> &rarr; <strong>Muscle to Bone</strong>. Transmits muscular pull to move bones.<br>
                • <strong>Ligament (3 Ls Rule):</strong> Strong, elastic band of connective tissue that connects <em>Like to Like</em> &rarr; <strong>Bone to Bone</strong> at joints, stabilizing joints.
              </div>
            ` : `
              <div class="ws-answer-lines" style="height: 48px;"></div>
            `}
          </div>
        </div>

        <!-- Question III -->
        <div class="ws-question-item">
          <div class="ws-question-text">
            <strong>III.</strong> What are immovable joints? How are the immovable joints in the skull helpful to us? <span class="ws-marks">[2 Marks]</span>
          </div>
          ${showAnswers ? `
            <div class="ws-answer-key-box">
              <strong>Model Answer:</strong> Immovable (fixed) joints are joints where adjacent bones are locked tightly together by fibrous sutures and permit zero movement.<br>
              <strong>Helpfulness in Skull:</strong> The 8 cranial bones fuse rigidly into a solid, impenetrable helmet around the brain, preventing the bones from shifting or pressing against the soft brain during bumps and falls.
            </div>
          ` : `
            <div class="ws-answer-lines" style="height: 54px;"></div>
          `}
        </div>

        <!-- Question IV -->
        <div class="ws-question-item">
          <div class="ws-question-text">
            <strong>IV.</strong> Choose the odd one out and justify your choice: <span class="ws-marks">[2 Marks]</span><br>
            <em>femur, calf bone, humerus, shin bone</em>
          </div>
          ${showAnswers ? `
            <div class="ws-answer-key-box">
              <strong>Odd One Out:</strong> Humerus<br>
              <strong>Justification:</strong> The humerus is the single long bone of the upper arm (forelimb), whereas the femur (thigh bone), calf bone (fibula), and shin bone (tibia) are all bones of the leg (hindlimb).
            </div>
          ` : `
            <div class="ws-answer-lines" style="height: 48px;"></div>
          `}
        </div>

        <!-- Question V -->
        <div class="ws-question-item">
          <div class="ws-question-text">
            <strong>V.</strong> Observe the given structure <strong>X</strong> and answer the questions that follow: <span class="ws-marks">[2 Marks]</span>
          </div>
          <div class="ws-question-diagram-wrap">
            <img src="images/l3_ws2_vertebral_column.png" alt="Vertebral Column Structure X" class="ws-question-diagram-img" />
          </div>
          <div style="margin-left: 1.25rem;">
            <p>1. Identify the given structure X.</p>
            <p>2. Name the labelled parts L and M.</p>
            <p>3. Mention the significance of L and M in our body movements.</p>
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                <strong>1. Structure X:</strong> Vertebral column (Backbone / Spine).<br>
                <strong>2. Labelled parts:</strong> L = Vertebra (one of 33 ring bones); M = Intervertebral disc (Cartilage cushion).<br>
                <strong>3. Significance:</strong> The 33 individual vertebrae allow the spine to bend, twist, and arch flexibly (rather than being a stiff rigid rod), while the cartilage pads (M) absorb shocks and protect the delicate spinal cord inside.
              </div>
            ` : `
              <div class="ws-answer-lines" style="height: 72px;"></div>
            `}
          </div>
        </div>

        <!-- Question VI -->
        <div class="ws-question-item">
          <div class="ws-question-text">
            <strong>VI.</strong> The given picture shows a joint present in our body. Observe it and answer the questions given below: <span class="ws-marks">[2 Marks]</span>
          </div>
          <div class="ws-question-diagram-wrap">
            <img src="images/l3_ws2_knee_joint.png" alt="Knee Joint P" class="ws-question-diagram-img" />
          </div>
          <div style="margin-left: 1.25rem;">
            <p>1. Identify P and the type of joint shown in the diagram above.</p>
            <p>2. Explain the role of the labelled part P in the given joint.</p>
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                <strong>1. Identification:</strong> P is the <strong>Patella (kneecap)</strong>; the type of joint is a <strong>Hinge joint</strong>.<br>
                <strong>2. Role of P:</strong> Protects the front of the knee joint from impact and trauma, and increases the pulling leverage of the quadriceps tendon when extending the leg.
              </div>
            ` : `
              <div class="ws-answer-lines" style="height: 54px;"></div>
            `}
          </div>
        </div>

        <!-- Question VII -->
        <div class="ws-question-item">
          <div class="ws-question-text">
            <strong>VII.</strong> The pictures given below show the different joints present in the human body. Identify the type of joint. Also mention how they are helpful to us. <span class="ws-marks">[2 Marks]</span>
          </div>
          <div class="ws-question-diagram-wrap">
            <img src="images/l3_ws2_skull_neck_joints.png" alt="Skull Sutures & Neck Pivot Joint" class="ws-question-diagram-img" />
          </div>
          <div style="margin-left: 1.25rem;">
            <p><strong>1. Cranium Suture Joint:</strong></p>
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                <strong>Type:</strong> Immovable / Fixed joint.<br>
                <strong>Helpfulness:</strong> Fuses the 8 cranial plates tightly to protect the soft brain from injury.
              </div>
            ` : `
              <div class="ws-answer-lines" style="height: 44px;"></div>
            `}
            <p style="margin-top: 0.5rem;"><strong>2. Neck Joint:</strong></p>
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                <strong>Type:</strong> Pivot joint.<br>
                <strong>Helpfulness:</strong> Allows our head to rotate from side to side ('No') and nod up and down ('Yes').
              </div>
            ` : `
              <div class="ws-answer-lines" style="height: 44px;"></div>
            `}
          </div>
        </div>

        <!-- Question VIII -->
        <div class="ws-question-item">
          <div class="ws-question-text">
            <strong>VIII.</strong> Name the joint used for the marked movement in the pictures given below and classify them: <span class="ws-marks">[2 Marks]</span>
          </div>
          <div class="ws-question-diagram-wrap">
            <img src="images/l3_ws2_movements.png" alt="Movements 1 and 2" class="ws-question-diagram-img" />
          </div>
          <div style="margin-left: 1.25rem;">
            <p><strong>1. Bending the arm at the elbow:</strong></p>
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                <strong>Joint:</strong> Elbow joint | <strong>Classification:</strong> Movable joint &rarr; Hinge joint (back-and-forth movement in one direction).
              </div>
            ` : `
              <div class="ws-answer-lines" style="height: 40px;"></div>
            `}
            <p style="margin-top: 0.5rem;"><strong>2. Swinging the leg outward at the hip:</strong></p>
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                <strong>Joint:</strong> Hip joint | <strong>Classification:</strong> Movable joint &rarr; Ball and socket joint (360° rotary movement in all planes).
              </div>
            ` : `
              <div class="ws-answer-lines" style="height: 40px;"></div>
            `}
          </div>
        </div>

      </div>
    `;

  } else if (isCh3 && selWs === '3') {
    // ------------------------------------------------------------------------
    // FREEDOM INTERNATIONAL SCHOOL — WORKSHEET III
    // ------------------------------------------------------------------------
    paperHtml += `
      <div class="ws-school-header">
        <div class="ws-school-badge" style="font-weight: 800; letter-spacing: 0.1em; color: #0284c7; text-transform: uppercase; font-size: 0.9rem; margin-bottom: 0.35rem;">FREEDOM INTERNATIONAL SCHOOL</div>
        <h3>SCIENCE-WORKSHEET-III</h3>
        <h4>L-3 THE SKELETAL AND MUSCULAR SYSTEM</h4>
        <p>CLASS: V &nbsp;|&nbsp; SUBJECT: SCIENCE (EVS) &nbsp;|&nbsp; TIME: 50 MINS &nbsp;|&nbsp; MAX MARKS: 27</p>
      </div>

      <div class="ws-student-meta-grid">
        <div class="ws-meta-field">Student Name: _______________________</div>
        <div class="ws-meta-field">Roll No: ___________ &nbsp; Sec: _____</div>
        <div class="ws-meta-field">Date: ____________ &nbsp; Marks: ____/27</div>
      </div>

      <div class="ws-section">
        <div class="ws-section-title">DO AS DIRECTED: DIAGRAM INVESTIGATION & CASE STUDIES</div>

        <!-- Question I -->
        <div class="ws-question-item">
          <div class="ws-question-text">
            <strong>I.</strong> In the diagram given below, A, B, C and D represents the bones present in our body. Whereas P, Q, R and S denote the different joints. Observe it and answer the following questions: <span class="ws-marks">[5 Marks]</span>
          </div>
          <div class="ws-question-diagram-wrap">
            <img src="images/l3_ws3_full_skeleton.png" alt="Skeleton Bones A,B,C,D and Joints P,Q,R,S" class="ws-question-diagram-img" style="max-height: 250px;" />
          </div>
          <div style="margin-left: 1.25rem;">
            <p>1. Identify the labelled parts: Bones (A, B, C, D) and Joints (P, Q, R, S).</p>
            <p>2. What do you find inside the labelled part D? Write its function.</p>
            <p>3. Bones are held together by strong bands of fibre like structure. Name it.</p>
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                <strong>1. Bones:</strong> A = Ribs / Rib cage (or Sternum), B = Backbone / Vertebral column, C = Pelvis / Pelvic girdle, D = Femur (thigh bone).<br>
                <strong>Joints:</strong> P = Pivot joint (Neck), Q = Hinge joint (Elbow), R = Gliding joint (Wrist), S = Hinge joint (Knee).<br>
                <strong>2. Inside D (Femur):</strong> Bone Marrow. <em>Function:</em> Manufactures red blood cells (RBCs) and white blood cells (WBCs), and stores fat/minerals.<br>
                <strong>3. Fibre-like structure:</strong> Ligament (connects bone to bone).
              </div>
            ` : `
              <div class="ws-answer-lines" style="height: 80px;"></div>
            `}
          </div>
        </div>

        <!-- Question B -->
        <div class="ws-question-item">
          <div class="ws-question-text">
            <strong>B.</strong> Observe the given skull diagram <strong>X</strong> and answer the questions: <span class="ws-marks">[5 Marks]</span>
          </div>
          <div class="ws-question-diagram-wrap">
            <img src="images/l3_ws3_skull.png" alt="Skull Diagram X" class="ws-question-diagram-img" />
          </div>
          <div style="margin-left: 1.25rem;">
            <p>1. Identify X.</p>
            <p>2. How many bones are present in X?</p>
            <p>3. What type of joints are present in X and mention its location?</p>
            <p>4. What is the role of X in our body?</p>
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                <strong>1. Identify X:</strong> Human Skull.<br>
                <strong>2. Bones present:</strong> 22 bones (8 cranial helmet bones + 14 facial bones).<br>
                <strong>3. Joints:</strong> (a) Immovable / fixed suture joints located between the 8 cranial bones. (b) Movable joint located at the lower jaw (mandible).<br>
                <strong>4. Role of X:</strong> Protects the delicate brain from injury, gives shape and framework to our face, encloses and shields sense organs (eyes, ears, nose), and allows eating and talking via the movable lower jaw.
              </div>
            ` : `
              <div class="ws-answer-lines" style="height: 84px;"></div>
            `}
          </div>
        </div>

        <!-- Question II -->
        <div class="ws-question-item">
          <div class="ws-question-text">
            <strong>II. Sports Day Case Study:</strong> Grade V students were taking part in different events in the Sports Day. Some students were in track and field events and some were in display. After the 100 m race Keshav felt very tired and his leg muscles started to ache. He was very upset as he had another event later. He felt that he should have involuntary muscles instead of voluntary muscles in his legs. <span class="ws-marks">[5 Marks]</span>
          </div>
          <div style="margin-left: 1.25rem;">
            <p>1. Do you think it is a good idea to have involuntary muscles in our legs? Justify your choice. <span class="ws-marks">[2M]</span></p>
            <p>2. How are voluntary muscles able to move our bones? <span class="ws-marks">[1M]</span></p>
            <p>3. During the display Grade V students used umbrellas, which joint did they use to turn the umbrellas around themselves? <span class="ws-marks">[1M]</span></p>
            <p>4. Which joint was used when they were holding their umbrellas? <span class="ws-marks">[1M]</span></p>
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                <strong>1. Justification:</strong> No, it is a bad idea! Voluntary muscles allow us to control when to walk, run, sprint, jump, or stop at our conscious will. If leg muscles were involuntary, they would contract automatically on their own, making coordinated walking impossible! Keshav's fatigue was due to temporary lactic acid buildup, solved by rest.<br>
                <strong>2. Muscle pull:</strong> Muscles are attached to bones by tendons. They contract (pull) in antagonistic pairs (e.g., biceps and triceps); muscles can ONLY pull, never push.<br>
                <strong>3. Turning umbrellas:</strong> Ball and socket joint in the shoulder (360° circular rotation).<br>
                <strong>4. Holding umbrellas:</strong> Gliding joints in the wrist and Hinge joints in the fingers (phalanges) for gripping.
              </div>
            ` : `
              <div class="ws-answer-lines" style="height: 96px;"></div>
            `}
          </div>
        </div>

        <!-- Question III -->
        <div class="ws-question-item">
          <div class="ws-question-text">
            <strong>III. Cricket Captain Roy Case Study:</strong> The winners of the cricket team were given medals. The captain of the team, Roy was absent as he had fractured his leg. The picture shows a labelled part X which Roy didn't use while batting. <span class="ws-marks">[5 Marks]</span>
          </div>
          <div class="ws-question-diagram-wrap">
            <img src="images/l3_ws3_cricket_batsman.png" alt="Cricket Batsman Roy with Pad X" class="ws-question-diagram-img" />
          </div>
          <div style="margin-left: 1.25rem;">
            <p>1. Which bone was protected by X? <span class="ws-marks">[1M]</span></p>
            <p>2. What might happen if the joint present in our shoulders is shifted to our knees? <span class="ws-marks">[2M]</span></p>
            <p>Roy thought that he should not use helmet at all. He was thinking that instead of having fixed joints our cranium should had movable joints.</p>
            <p>3. Is this a good thought? Explain. <span class="ws-marks">[1M]</span></p>
            <p>4. How is the movable joint present in our lower jaw helpful to us? <span class="ws-marks">[1M]</span></p>
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                <strong>1. Bone protected:</strong> Shin bone (Tibia) and calf bone (Fibula).<br>
                <strong>2. Shoulder joint at knees:</strong> Shoulders have ball-and-socket joints allowing 360° rotation. If knees had ball-and-socket joints, our lower legs would wobble and twist sideways, causing knees to buckle under our body weight, making standing upright and walking impossible!<br>
                <strong>3. Roy's helmet thought:</strong> No, it is a very dangerous thought! Fixed cranial suture joints create an unyielding, rigid helmet around the delicate brain. If cranial joints were movable, any cricket ball impact would push the bones inwards, crushing and severely damaging the soft brain tissue!<br>
                <strong>4. Lower jaw movable joint:</strong> Allows us to open and close our mouth to chew food, speak, sing, yawn, and express facial emotions.
              </div>
            ` : `
              <div class="ws-answer-lines" style="height: 104px;"></div>
            `}
          </div>
        </div>

        <!-- Question IV -->
        <div class="ws-question-item">
          <div class="ws-question-text">
            <strong>IV.</strong> Identify the joints in the given diagram and explain. <span class="ws-marks">[4 Marks]</span>
          </div>
          <div class="ws-question-diagram-wrap">
            <img src="images/l3_ws3_hand_joints.png" alt="Hand Skeleton Joints" class="ws-question-diagram-img" />
          </div>
          ${showAnswers ? `
            <div class="ws-answer-key-box">
              <strong>1. Gliding Joints:</strong> Located between the 8 carpal bones in the wrist. They allow flat surfaces of bones to slide smoothly past each other in multiple directions, giving the wrist multi-directional flexibility to wave, roll, and tilt.<br>
              <strong>2. Hinge Joints:</strong> Located between the phalanges (finger bones). They allow fingers to bend and straighten in only one direction (like a door hinge), allowing our hand to firmly grasp objects, hold pens, and grip tools.
            </div>
          ` : `
            <div class="ws-answer-lines" style="height: 72px;"></div>
          `}
        </div>

        <!-- Question V -->
        <div class="ws-question-item">
          <div class="ws-question-text">
            <strong>V.</strong> Complete the flow chart: <span class="ws-marks">[3 Marks]</span>
          </div>
          <div class="ws-question-diagram-wrap">
            <img src="images/l3_ws3_joints_flowchart.png" alt="Joints Flowchart" class="ws-question-diagram-img" style="max-height: 280px;" />
          </div>
          ${showAnswers ? `
            <div class="ws-answer-key-box">
              <strong>Completed Flowchart:</strong><br>
              • <strong>a:</strong> Joint (A place where two or more bones meet)<br>
              • <strong>b:</strong> Immovable / Fixed joint (Moves? NO)<br>
              • <strong>c:</strong> Movable joint (Moves? YES)<br>
              • <strong>d:</strong> Hinge joint (Allows movement in one direction: YES)<br>
              • <strong>e:</strong> Ball and socket joint (Allows movement in 360°: YES)<br>
              • <strong>f:</strong> Pivot joint (It allows us to twist, bend and turn: YES)
            </div>
          ` : `
            <div style="margin-top: 0.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-weight: 600;">
              <div>a. ___________________________</div>
              <div>b. ___________________________</div>
              <div>c. ___________________________</div>
              <div>d. ___________________________</div>
              <div>e. ___________________________</div>
              <div>f. ___________________________</div>
            </div>
          `}
        </div>

      </div>
    `;

  } else {
    // ------------------------------------------------------------------------
    // COMPREHENSIVE ALL-IN-ONE WORKSHEET (25 MARKS)
    // ------------------------------------------------------------------------
    paperHtml += `
      <div class="ws-school-header">
        <div class="ws-school-badge" style="font-weight: 800; letter-spacing: 0.1em; color: #0284c7; text-transform: uppercase; font-size: 0.9rem; margin-bottom: 0.35rem;">CBSE SCIENCE ASSESSMENT</div>
        <h3>${ch.number} ${ch.title.toUpperCase()}</h3>
        <h4>THINKING CLASSROOM REVISION & DIAGNOSTIC ASSESSMENT</h4>
        <p>CLASS: V &nbsp;|&nbsp; SUBJECT: SCIENCE (EVS) &nbsp;|&nbsp; TOTAL MARKS: 25</p>
      </div>

      <div class="ws-student-meta-grid">
        <div class="ws-meta-field">Student Name: _______________________</div>
        <div class="ws-meta-field">Roll No: ___________ &nbsp; Sec: _____</div>
        <div class="ws-meta-field">Date: ____________ &nbsp; Marks: ____/25</div>
      </div>

      <!-- Section A: Multiple Choice Thinking Questions -->
      <div class="ws-section">
        <div class="ws-section-title">SECTION A: DEDUCTIVE THINKING & MULTIPLE CHOICE (1 Mark Each)</div>
        ${ch.questions.filter(q => q.category === 'mcq').slice(0, 5).map((q, i) => `
          <div class="ws-question-item">
            <div class="ws-question-text">
              <strong>Q${i + 1}.</strong> ${q.body} <span class="ws-marks">[1M]</span>
            </div>
            ${q.image ? `<div class="ws-question-diagram-wrap"><img src="${q.image}" alt="Question Diagram" class="ws-question-diagram-img" /></div>` : ''}
            <div style="margin-left: 1.25rem; font-size: 0.88rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.25rem;">
              ${q.options.map((opt, idx) => `
                <div style="${showAnswers && idx === q.correct ? 'font-weight: 700; color: #15803d; background: #dcfce7; padding: 2px 6px; border-radius: 4px; display: inline-block;' : ''}">
                  (${String.fromCharCode(97 + idx)}) ${opt}
                </div>
              `).join('')}
            </div>
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                <strong>Answer:</strong> (${String.fromCharCode(97 + q.correct)}) ${q.options[q.correct]}<br>
                <em>Reasoning:</em> ${q.explanation}
              </div>
            ` : `
              <div style="margin-top: 0.4rem; font-weight: 600;">Ans: (___)</div>
            `}
          </div>
        `).join('')}
      </div>

      <!-- Section B: Scientific Terms & Concept Classification -->
      <div class="ws-section">
        <div class="ws-section-title">SECTION B: SCIENTIFIC TERMS & CLASSIFICATION (1.5 Marks Each)</div>
        ${ch.questions.filter(q => q.category === 'whoami' || q.category === 'oddone').slice(0, 3).map((q, i) => `
          <div class="ws-question-item">
            <div class="ws-question-text">
              <strong>Q${i + 6}.</strong> ${q.body} <span class="ws-marks">[1.5M]</span>
            </div>
            ${q.image ? `<div class="ws-question-diagram-wrap"><img src="${q.image}" alt="Question Diagram" class="ws-question-diagram-img" /></div>` : ''}
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                <strong>Answer:</strong> ${q.options[q.correct]}<br>
                <em>Reasoning:</em> ${q.explanation}
              </div>
            ` : `
              <div class="ws-answer-lines"></div>
            `}
          </div>
        `).join('')}
      </div>

      <!-- Section C: Scenario Reasoning & Case Studies -->
      <div class="ws-section">
        <div class="ws-section-title">SECTION C: CASE STUDIES & APPLICATION (3 Marks Each)</div>
        ${ch.questions.filter(q => q.category === 'scenario' || q.category === 'compare').slice(0, 3).map((q, i) => `
          <div class="ws-question-item">
            <div class="ws-question-text">
              <strong>Q${i + 9}.</strong> ${q.body} <span class="ws-marks">[3M]</span>
            </div>
            ${q.image ? `<div class="ws-question-diagram-wrap"><img src="${q.image}" alt="Question Diagram" class="ws-question-diagram-img" /></div>` : ''}
            ${showAnswers ? `
              <div class="ws-answer-key-box">
                <strong>Model Answer:</strong> ${q.options[q.correct]}<br>
                <em>Marking Criteria:</em> ${q.explanation}
              </div>
            ` : `
              <div class="ws-answer-lines" style="height: 72px;"></div>
            `}
          </div>
        `).join('')}
      </div>
    `;
  }

  container.innerHTML = controlsHtml + paperHtml + `</div></div>`;

  const modeSelect = document.getElementById('ws-mode-select');
  if (modeSelect) {
    modeSelect.addEventListener('change', (e) => {
      AudioController.click();
      state.worksheetSettings.showAnswers = (e.target.value === 'key');
      saveActiveState();
      renderWorksheetView(container);
    });
  }

  const wsNumSelect = document.getElementById('ws-number-select');
  if (wsNumSelect) {
    wsNumSelect.addEventListener('change', (e) => {
      AudioController.click();
      state.worksheetSettings.selectedWs = e.target.value;
      saveActiveState();
      renderWorksheetView(container);
    });
  }

  const printBtn = document.getElementById('btn-do-print');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      AudioController.click();
      window.print();
    });
  }
}


// ==========================================================================
// 11. MODE 5: QUICK REVISION — COMPARISON TABLES
// ==========================================================================
const REVISION_TABLES_DATA = {
  'ch3_skeletal': [
    {
      title: '🦴 4 Movable Joints — Mechanism, Motion & Body Locations',
      icon: '🔗',
      columns: ['Joint Type', 'Mechanical Analogy', 'Degree of Movement', 'Where in Human Body', 'Action Enabled'],
      rows: [
        ['Ball and Socket', 'Joystick / Mortar & Pestle', '360° Rotary motion in all planes', 'Shoulder (Humerus in Scapula) & Hip (Femur in Pelvis)', 'Bowling a cricket ball, swinging arm, kicking leg sideways'],
        ['Hinge Joint', 'Door hinge / Pocket knife', '180° Single plane (Back and forth only)', 'Elbows, Knees, Fingers (phalanges), Toes', 'Bending elbow to drink water, kicking football, walking'],
        ['Pivot Joint', 'Steering wheel / Peg & ring', 'Rotary motion around central axis', 'Neck (between Skull and first vertebra Atlas)', 'Shaking head "No" (side to side) and nodding "Yes"'],
        ['Gliding Joint', 'Sliding floor tiles / Ice skates', 'Smooth sliding/gliding in multiple directions', 'Wrists (Carpals), Ankles (Tarsals), between Vertebrae', 'Waving goodbye, rolling ankle, twisting torso']
      ],
      takeaway: 'Ball & Socket = 360° (Shoulder/Hip) | Hinge = 1-way (Elbow/Knee) | Pivot = Neck rotation | Gliding = Sliding (Wrist/Ankle)'
    },
    {
      title: '💪 The 3 Muscle Types — Striated, Smooth & Cardiac',
      icon: '🥩',
      columns: ['Muscle Type', 'Appearance / Structure', 'Control Type', 'Locations in Body', 'Key Special Power'],
      rows: [
        ['Striated (Skeletal) Muscle', 'Striped bands like a zebra, cylindrical fibers', 'Voluntary (Under our conscious control)', 'Attached to bones of arms, legs, face, neck', 'Fast, powerful contractions for running, writing, chewing'],
        ['Smooth Muscle', 'No stripes, smooth spindle-shaped fibers', 'Involuntary (Automatic, no conscious control)', 'Walls of stomach, intestines, bladder, blood vessels', 'Slow, steady rhythmic contractions (peristalsis pushing food)'],
        ['Cardiac Muscle', 'Faintly striped, branched interconnected network', 'Involuntary (Automatic, controlled by pacemaker)', 'Found EXCLUSIVELY in the walls of the Heart', 'Never gets tired! Pumps blood 24/7 throughout your entire life']
      ],
      takeaway: 'Striated = Voluntary (Arms/Legs) | Smooth = Involuntary (Digestive/Vessels) | Cardiac = Heart wall, tireless 24/7'
    },
    {
      title: '🔗 Tendons vs Ligaments — The Master Rule',
      icon: '🧬',
      columns: ['Feature', 'Ligament (3 Ls Rule)', 'Tendon (3 Ts Rule)'],
      rows: [
        ['What it connects', 'Like to Like: Bone to Bone', 'Two Types: Muscle to Bone'],
        ['Primary Function', 'Holds bones together at joints and prevents dislocations', 'Transmits pulling force from contracting muscle to bone'],
        ['Elasticity', 'More elastic and flexible to allow joint motion', 'Tough, inelastic cord with extreme tensile strength'],
        ['Classic Example', 'Anterior Cruciate Ligament (ACL) stabilizing the knee', 'Achilles tendon connecting calf muscle to heel bone']
      ],
      takeaway: 'Remember: 3 Ls = Ligaments for Like to Like (Bone-Bone) | 3 Ts = Tendons for Two Types (Muscle-Bone)'
    },
    {
      title: '🏗️ Human Skeleton Master Blueprint — 206 Bones',
      icon: '💀',
      columns: ['Skeletal Component', 'Number of Bones', 'Key Structural Parts', 'Vital Organs Protected'],
      rows: [
        ['Skull', '22 Bones (8 Cranial + 14 Facial)', 'Braincase sutures + only ONE movable lower jaw (mandible)', 'Brain, eyes, inner ears, olfactory bulb'],
        ['Vertebral Column (Spine)', '33 Vertebrae', 'Stacked ring bones separated by flexible cartilage discs', 'Spinal cord (central communication superhighway)'],
        ['Ribcage', '25 Bones (12 pairs = 24 ribs + 1 sternum)', 'First 10 pairs attach to sternum; last 2 pairs are floating ribs', 'Heart and Lungs (allows thoracic volume expansion)'],
        ['Upper Limbs (Arms)', '60 Bones (30 per arm)', 'Humerus (upper arm), Radius & Ulna (forearm), carpals & fingers', 'Carrying, lifting, precision manipulation, tool use'],
        ['Lower Limbs (Legs)', '60 Bones (30 per leg)', 'Femur (thigh — longest bone!), Patella (knee), Tibia & Fibula', 'Locomotion, upright posture, supporting full body mass'],
        ['Girdles', '6 Bones (2 Pectoral + 2 Pelvic)', 'Pectoral (shoulder blades & collarbones), Pelvic (hip bones)', 'Anchors limbs to torso and supports abdominal viscera']
      ],
      takeaway: 'Adult = 206 bones | Skull = 22 | Spine = 33 | Ribcage = 25 | Upper + Lower limbs = 120 | Girdles = 6'
    }
  ],
  'ch4_nervous': [
    {
      title: '🧠 The 3 Brain Departments — Cerebrum, Cerebellum & Medulla',
      icon: '💻',
      columns: ['Brain Part', 'Location & Appearance', 'What It Controls (Functions)', 'What Happens If Impaired?', 'Daily Life Example'],
      rows: [
        ['Cerebrum', 'Top dome; largest part (~85%); folded walnut convolutions', 'Thinking, memory, logic, speech, reading, emotions, 5 senses', 'Memory loss, inability to speak, loss of conscious thought', 'Solving a maths puzzle, remembering a friend\'s name'],
        ['Cerebellum', 'Lower back below cerebrum; cauliflower-like folds', 'Voluntary muscle coordination, body balance, posture', 'Loss of equilibrium, staggering/clumsy walk, slurred speech', 'Riding a bicycle without falling, gymnastics, walking a line'],
        ['Medulla (Brain Stem)', 'Bottom stem connecting brain to top of spinal cord', 'Involuntary life vitals: heartbeat, breathing, swallowing, blood pressure', 'Fatal! Cessation of breathing and heart pumping', 'Breathing smoothly while in deep sleep at night']
      ],
      takeaway: 'Cerebrum = Thinking & Senses | Cerebellum = Balance & Muscle Coordination | Medulla = 24/7 Life Vitals (never sleeps!)'
    },
    {
      title: '⚡ Reflex Action vs Voluntary Action — Who Decides?',
      icon: '⚡',
      columns: ['Feature', 'Reflex Action (Emergency Bypass)', 'Voluntary Action (Conscious Choice)'],
      rows: [
        ['Controlling Center', 'Spinal Cord (Bypasses brain to save vital milliseconds!)', 'Cerebrum of Brain (Analyzes, thinks, and decides)'],
        ['Speed & Nature', 'Lightning-fast (~0.05 s), automatic, involuntary', 'Slower, deliberate, conscious, thoughtful'],
        ['Involvement of Thought', 'Zero thinking! Reaction occurs before conscious awareness', 'Requires conscious attention, evaluation, and choice'],
        ['Primary Purpose', 'Immediate protection against burns, cuts, and bodily trauma', 'Goal-directed daily tasks, learning, and communication'],
        ['Classic Examples', 'Pulling hand from hot iron, blinking at flying dust, knee jerk', 'Writing an essay, packing school bag after bell rings, kicking ball']
      ],
      takeaway: 'Reflex = Spinal Cord instant emergency protection | Voluntary = Cerebrum conscious decision'
    },
    {
      title: '📡 The 3 Nerve Types — Biological Telegrams',
      icon: '📞',
      columns: ['Nerve Type', 'Direction of Signal', 'From Where → To Where?', 'Information Carried', 'Real-World Analogy'],
      rows: [
        ['Sensory Nerves', 'Incoming (Afferent)', 'Sense Organs → Brain & Spinal Cord', '"The stove is hot", "Traffic light is green", "Aroma of pizza"', 'Input microphone / webcam streaming data to computer'],
        ['Motor Nerves', 'Outgoing (Efferent)', 'Brain & Spinal Cord → Muscles & Glands', '"Contract bicep muscle", "Salivate saliva", "Blink eyelids"', 'Output motor / speaker executing computer instructions'],
        ['Mixed Nerves', 'Two-way traffic', 'Bidirectional between CNS and body tissues', 'Both sensory inputs and motor muscle instructions in same cable', 'Broadband internet fiber cable handling both upload and download']
      ],
      takeaway: 'Sensory = Inputs to CNS | Motor = Outputs to Muscles | Mixed = Two-way bidirectional traffic'
    },
    {
      title: '👁️ The 5 Sense Organs — Master Structure & Secret Powers',
      icon: '👁️',
      columns: ['Sense Organ', 'Sense Provided', 'Key Internal Structures', 'Connecting Nerve', 'Secret Survival Superpower'],
      rows: [
        ['Eyes', 'Vision (Sight)', 'Cornea (clear window), Iris (aperture), Pupil, Lens, Retina (screen)', 'Optic Nerve', 'Forms inverted image on retina; brain flips it right-side up!'],
        ['Ears', 'Hearing & Balance!', 'Pinna (sound funnel), Eardrum, 3 ossicle bones, Cochlea (fluid snail)', 'Auditory Nerve', 'Inner ear semicircular canals keep you upright without falling!'],
        ['Nose', 'Smell (Olfaction) & Respiration', 'Nostrils, Nasal cavity, olfactory receptors, mucus & filtering cilia', 'Olfactory Nerve', 'Detects smoke/spoiled food; smell contributes 80% to taste flavor!'],
        ['Tongue', 'Taste (Gustation) & Speech', 'Thousands of taste buds sensitive to sweet, salty, sour, bitter, umami', 'Glossopharyngeal Nerves', 'Protects against poisons (bitter warning); essential for speech'],
        ['Skin', 'Touch, Temp, Pain, Pressure', 'Epidermis shield, dermis with specialized nerve endings, sweat glands', 'Cutaneous Spinal Nerves', 'Largest organ of the body; thermal thermostat via sweating!']
      ],
      takeaway: 'Eyes → Optic | Ears → Auditory (+ Balance!) | Nose → Olfactory | Tongue → Taste | Skin → Largest Organ'
    }
  ],

  'ch2_animals': [
    {
      title: '🤿 Breathing Organs — Who Breathes How?',
      icon: '🫁',
      columns: ['Organ', 'Animals', 'Environment', 'How It Works'],
      rows: [
        ['Gills', 'Fish, tadpoles', 'Aquatic (underwater)', 'Extract dissolved O₂ from water flowing over blood-rich gill filaments.'],
        ['Spiracles → Trachea', 'Insects (grasshoppers, beetles)', 'Land & some aquatic', 'Tiny air holes along abdomen connect to tracheal tubes delivering O₂ directly to tissues.'],
        ['Moist Skin', 'Frogs, toads (amphibians)', 'Water & damp land', 'Absorb dissolved O₂ through thin, moist skin membrane underwater.'],
        ['Lungs', 'Mammals, birds, reptiles, adult frogs', 'Land', 'Inhale atmospheric air; O₂ absorbed by alveoli in lungs into blood.'],
        ['Blowholes → Lungs', 'Whales, dolphins (marine mammals)', 'Aquatic (surface to breathe)', 'Nostril-like opening on top of head; surface to inhale air into lungs.']
      ],
      takeaway: 'Fish → Gills | Insects → Spiracles | Frogs → Moist Skin + Lungs | Mammals → Lungs | Whales/Dolphins → Blowholes → Lungs'
    },
    {
      title: '🛡️ Body Coverings — Nature\'s Armor',
      icon: '🐚',
      columns: ['Covering', 'Animals', 'Material', 'Main Function'],
      rows: [
        ['Overlapping Scales', 'Fish, reptiles (snakes)', 'Keratin/bone', 'Waterproofing (fish); grip & movement assist (snake belly scales).'],
        ['Fur / Hair', 'Polar bears, dogs, cats', 'Keratin', 'Thermal insulation; double-layer fur traps warm air near skin.'],
        ['Cuticle (Exoskeleton)', 'Insects, spiders', 'Chitin', 'Hard outer armor; prevents water loss; structural support.'],
        ['Shell', 'Turtles, crabs, snails, armadillos', 'Calcium carbonate / bone', 'Tough dome for physical defense against predators.'],
        ['Feathers', 'Birds (eagles, penguins)', 'Keratin', 'Flight (wing feathers); insulation (down feathers); waterproofing.'],
        ['Blubber (under skin)', 'Whales, seals, polar bears', 'Fat layer', 'Thick subcutaneous fat providing thermal insulation in freezing water.']
      ],
      takeaway: 'Scales → Waterproofing | Fur → Warmth | Cuticle → Insect Armor | Shell → Defense | Feathers → Flight + Warmth | Blubber → Fat Insulation'
    },
    {
      title: '🦷 Dentition & Diet — What Teeth Reveal',
      icon: '🍖',
      columns: ['Diet Type', 'Teeth Features', 'Examples', 'Key Clue'],
      rows: [
        ['Herbivore', 'Flat, broad grinding molars; chisel-like incisors for cutting grass', 'Cow, horse, deer, rabbit', 'No pointed canines; wide jaw for side-to-side grinding.'],
        ['Carnivore', 'Sharp dagger canines; scissor-like carnassial (shearing) molars', 'Lion, tiger, eagle, shark', 'Prominent pointed fangs; strong jaw for gripping & tearing meat.'],
        ['Omnivore', 'Mix of both: moderate canines + broad molars', 'Bear, human, pig, crow', 'Versatile teeth for both plant and animal food.'],
        ['Rodent', 'Strong continuously-growing gnawing incisors', 'Rat, squirrel, beaver', 'Front teeth never stop growing; constant gnawing keeps them filed.']
      ],
      takeaway: 'Flat grinding molars → Herbivore | Dagger canines + shearing molars → Carnivore | Mixed teeth → Omnivore | Ever-growing incisors → Rodent'
    },
    {
      title: '🐾 Animal Locomotion — Movement Organs Across Habitats',
      icon: '🦅',
      columns: ['Habitat / Animal Group', 'Locomotion Organ', 'Movement Type', 'Key Examples', 'Special Adaptation Clue'],
      rows: [
        ['Terrestrial Mammals', 'Hooves & strong muscular legs', 'Running, galloping, leaping', 'Horse, cow, deer, cheetah', 'Hard hooves absorb shock on rough ground; long stride.'],
        ['Aerial Birds', 'Wings with flight feathers & hollow bones', 'Flying, soaring, gliding', 'Eagle, pigeon, sparrow, hawk', 'Pneumatic (hollow) bones reduce body weight for effortless flight.'],
        ['Aquatic Birds', 'Webbed feet (skin between toes)', 'Paddling, steering in water', 'Duck, swan, pelican', 'Webbed toes push maximum water like boat oars.'],
        ['Marine Animals', 'Flippers (paddle-shaped limbs)', 'Swimming, diving', 'Penguin, seal, sea turtle', 'Modified forelimbs act as underwater oars & steering rudders.'],
        ['Aquatic Fish', 'Fins & flexible muscular tail', 'Swimming, balancing', 'Shark, rohu, salmon, goldfish', 'Caudal (tail) fin provides forward thrust; dorsal fins provide balance.'],
        ['Amphibians (Frogs)', 'Webbed hind legs with muscular thighs', 'Hopping on land, paddling in water', 'Bullfrog, tree frog, toad', 'Powerful folded legs act as biological springs for jumping.'],
        ['Limbless Reptiles (Snakes)', 'Broad ventral belly scales & body muscles', 'Slithering / undulating crawl', 'Cobra, python, viper', 'Belly scales grip ground irregularities as muscular curves push forward.'],
        ['Insects', '6 jointed legs & wings', 'Walking, crawling, jumping, flying', 'Grasshopper, housefly, beetle', 'Grasshopper has enlarged hind legs for leaping; exoskeleton supports joints.']
      ],
      takeaway: 'Ducks → Webbed feet | Penguins/Seals → Flippers | Snakes → Ventral scales + muscles | Note: Nares are bird nostrils for breathing, NOT movement!'
    },
    {
      title: '🧭 Survival Strategies — Migration, Hibernation, Aestivation & Camouflage',
      icon: '❄️',
      columns: ['Strategy', 'Scientific Definition', 'Seasonal Trigger', 'Famous Animal Examples', 'Key Exam Clue'],
      rows: [
        ['Migration', 'Long-distance seasonal journey to escape extreme cold and find food/breeding sites', 'Severe winter freeze / food shortage', 'Arctic Tern (pole to pole!), Siberian Crane, Monarch Butterfly, Salmon', 'Moving away to another region; returning in spring.'],
        ['Hibernation ("Winter Sleep")', 'Prolonged deep dormant state with drastically slowed heart rate and reduced body temperature', 'Freezing winter cold & food scarcity', 'Polar bear, grizzly bear, hedgehog, bat, ground squirrel', 'Sleeping through the entire winter; lives off stored body fat.'],
        ['Aestivation ("Summer Sleep")', 'State of dormancy to survive scorching heat and prolonged dryness / drought', 'Blistering summer heat & water scarcity', 'Desert snail, lungfish, crocodile, desert tortoise', 'Burrowing into mud or sealing shell to prevent water loss.'],
        ['Camouflage (Colour Blending)', 'Ability to blend body colour, pattern, or texture with surroundings to become invisible', 'Threat from predators or hunting prey', 'Chameleon, stick insect, polar bear (white fur), tiger (stripes)', 'Concealment in habitat; avoids detection by predators and prey.']
      ],
      takeaway: 'Migration = Seasonal Travel | Hibernation = Winter Sleep (Bears) | Aestivation = Summer Sleep (Snails/Lungfish) | Camouflage = Blending In (Chameleon)'
    }
  ],
  'ch5_health': [
    {
      title: '🏥 Deficiency Diseases — Spot the Missing Nutrient',
      icon: '💊',
      columns: ['Nutrient Missing', 'Disease', 'Key Symptoms', 'Food Sources to Fix It'],
      rows: [
        ['Vitamin A', 'Night Blindness', 'Cannot see in dim light / darkness', 'Carrots 🥕, green leafy vegetables, milk, liver'],
        ['Vitamin B₁', 'Beriberi', 'Weakness, fatigue, nerve damage, heart problems', 'Unpolished rice, cereals, peas, fish'],
        ['Vitamin C', 'Scurvy', 'Bleeding gums, slow wound healing, bruising', 'Amla, oranges 🍊, guava, lemon'],
        ['Vitamin D', 'Rickets', 'Soft/bowed bones, pigeon chest, leg deformities', 'Sunlight ☀️, milk, fish, egg, butter'],
        ['Calcium', 'Osteoporosis', 'Brittle bones, frequent fractures', 'Milk 🥛, cheese, green leafy vegetables'],
        ['Iron', 'Anaemia', 'Tiredness, pale skin, shortness of breath', 'Dates, spinach 🥬, jaggery, liver'],
        ['Iodine', 'Goitre', 'Swelling in neck region (enlarged thyroid)', 'Iodised salt, seafood']
      ],
      takeaway: 'Night blindness→VitA | Beriberi→VitB | Scurvy→VitC | Rickets→VitD | Weak bones→Calcium | Tiredness→Iron | Neck swelling→Iodine'
    },
    {
      title: '🍽️ Nutrients — The Body\'s Building Blocks',
      icon: '🥗',
      columns: ['Nutrient', 'Main Function', 'Rich Food Sources', 'What Happens Without It?'],
      rows: [
        ['Carbohydrates', 'Instant energy provider (fuel for muscles & brain)', 'Rice, bread, potatoes, sugar, wheat', 'Fatigue, weakness, low energy'],
        ['Proteins', 'Body building; growth & repair of tissues', 'Eggs, fish, milk, pulses/dal, soybean', 'Slow growth, poor wound healing'],
        ['Fats', 'Stored energy; insulation; shock absorption', 'Butter, ghee, nuts, oil, cheese', 'Weight loss, poor insulation'],
        ['Vitamins (A, B, C, D)', 'Regulate body functions; boost immunity', 'Fruits, vegetables, milk, sunlight', 'Various deficiency diseases (see table above)'],
        ['Minerals (Ca, Fe, I)', 'Strong bones, blood formation, thyroid function', 'Milk, spinach, dates, iodised salt', 'Osteoporosis, anaemia, goitre'],
        ['Roughage (Fiber)', 'Aids digestion; removes waste from body', 'Whole grains, fruits, vegetables, salad', 'Constipation, digestive problems'],
        ['Water', 'Dissolves nutrients; regulates temperature; removes waste', 'Drinking water, fruits, soups', 'Dehydration, organ failure']
      ],
      takeaway: 'Carbs→Energy | Proteins→Growth & Repair | Fats→Stored Energy | Vitamins→Regulate | Minerals→Bones & Blood | Roughage→Digestion | Water→Everything!'
    },
    {
      title: '🦠 Communicable vs Non-Communicable Diseases — Spot the Difference',
      icon: '🛡️',
      columns: ['Comparison Parameter', 'Communicable (Infectious)', 'Non-Communicable (Non-Infectious)', 'Rule of Thumb'],
      rows: [
        ['Definition', 'Can spread from an infected person to a healthy person', 'Cannot spread from person to person', 'Communicable = Catchy / contagious.'],
        ['Causative Factor', 'Living microscopic pathogens (viruses, bacteria, protozoa, fungi)', 'Nutrient deficiencies, organ malfunction, lifestyle, or genetics', 'Pathogen vs Internal body cause.'],
        ['Mode of Spread', 'Air droplets (cough/sneeze), contaminated food/water, insect vectors, touch', 'Never transmitted through air, water, touch, or vectors', 'Coughing near someone cannot transmit non-communicable diseases.'],
        ['Prevention Strategy', 'Hygiene, sanitation, vector control, safe drinking water, vaccination, masks', 'Balanced diet, regular physical exercise, healthy lifestyle, food supplements', 'Sanitation & clean environment vs Proper nutrition.'],
        ['Classic Examples', 'Influenza, common cold, cholera, malaria, typhoid, dengue, tuberculosis', 'Scurvy (Vit C), Rickets (Vit D), Anaemia (Iron), Goitre (Iodine), Diabetes', 'Deficiency diseases are ALWAYS non-communicable!']
      ],
      takeaway: 'Communicable = Germs & spread between people (Flu, Malaria, Typhoid) | Non-Communicable = Deficiencies/lifestyle & cannot spread (Scurvy, Rickets, Anaemia)'
    },
    {
      title: '🦟 Disease Vectors & Modes of Transmission',
      icon: '🔬',
      columns: ['Transmission Route / Vector', 'Microbe Type', 'Disease Caused', 'How It Spreads', 'Prevention & Control Rule'],
      rows: [
        ['Female Anopheles Mosquito', 'Protozoan (Plasmodium)', 'Malaria', 'Injects parasite directly into bloodstream during blood meal', 'Clear stagnant water; use mosquito nets and repellents.'],
        ['Female Aedes Mosquito', 'Virus (Dengue virus)', 'Dengue & Chikungunya', 'Bites during daytime; breeds in clean domestic stagnant water', 'Empty and scrub water coolers and plant saucers weekly.'],
        ['Housefly', 'Bacteria & Parasites', 'Cholera, Typhoid, Diarrhoea', 'Carries germs on hairy legs from filth/faeces to uncovered food', 'Keep all food covered; wash hands thoroughly before eating.'],
        ['Air Droplets (Cough / Sneeze)', 'Viruses & Bacteria', 'Common cold, Influenza, Tuberculosis', 'Sneezing releases thousands of infectious moisture droplets into air', 'Cover mouth and nose with a handkerchief when sneezing; wear masks.'],
        ['Contaminated Water & Food', 'Bacteria & Viruses', 'Jaundice (Hepatitis A), Typhoid, Dysentery', 'Consuming untreated water or food prepared with dirty water', 'Drink boiled or filtered water; avoid exposed street food.'],
        ['Direct Contact / Fungi', 'Fungi & Parasites', 'Ringworm, Scabies, Athlete\'s Foot', 'Skin-to-skin contact or sharing towels, combs, clothes of infected person', 'Maintain personal hygiene; never share combs or towels.']
      ],
      takeaway: 'Female Anopheles → Malaria (Protozoa) | Aedes → Dengue (Virus) | Housefly → Cholera/Typhoid (Bacteria) | Sneezing → Airborne droplets'
    }
  ],
  'ch7_air_water': [
    {
      title: '💧 Water Purification Methods — Choosing the Right Technique',
      icon: '🔬',
      columns: ['Method', 'What It Removes', 'How It Works', 'Real-World Example'],
      rows: [
        ['Sedimentation', 'Heavy insoluble particles (sand, mud)', 'Let water stand still → heavy particles settle at bottom by gravity', 'Muddy river water left overnight in a bucket'],
        ['Decantation', 'Settled particles (after sedimentation)', 'Carefully pour the clear top water into another container, leaving settled mud behind', 'Pouring clear water off after sedimentation'],
        ['Filtration', 'Fine suspended particles (chalk, sawdust)', 'Pass water through filter paper / fine cloth to trap tiny particles', 'Morning tea strainer; water filter at home'],
        ['Evaporation', 'Soluble impurities remain (recovers solid)', 'Heat solution → water evaporates → solid left behind', 'Salt production from sea water'],
        ['Distillation', 'ALL impurities (soluble + insoluble)', 'Boil water → collect steam → condense back into pure liquid', 'Science labs; producing distilled water for batteries'],
        ['Boiling', 'Germs and bacteria', 'Heat water to 100°C → kills harmful microorganisms', 'Making drinking water safe at home']
      ],
      takeaway: 'Heavy particles→Sedimentation | Fine particles→Filtration | Dissolved salt→Evaporation/Distillation | Germs→Boiling'
    },
    {
      title: '🌍 Atmospheric Layers — Earth\'s Protective Blanket',
      icon: '☁️',
      columns: ['Layer (Bottom→Top)', 'Altitude', 'Temperature Trend', 'Key Facts & Significance'],
      rows: [
        ['1. Troposphere', '0 – 12 km', 'Decreases with altitude', 'Where WE live! All weather, clouds, rain happen here. Contains 75% of atmosphere\'s mass.'],
        ['2. Stratosphere', '12 – 50 km', 'Increases (ozone absorbs UV)', 'Contains the Ozone Layer (O₃) that shields Earth from harmful UV rays. Jets fly here.'],
        ['3. Mesosphere', '50 – 80 km', 'Decreases sharply', 'Meteoroids burn up here due to intense friction with air → shooting stars! Coldest layer.'],
        ['4. Thermosphere (Ionosphere)', '80 – 700 km', 'Increases dramatically', 'Electrically charged ions reflect radio waves → wireless communication! ISS orbits here.'],
        ['5. Exosphere', '700 – 10,000 km', 'Extremely hot but sparse', 'Outermost layer; merges into outer space. Satellites orbit here.']
      ],
      takeaway: 'Troposphere→Weather | Stratosphere→Ozone (UV shield) | Mesosphere→Meteors burn | Thermosphere→Radio waves & ISS | Exosphere→Space boundary'
    },
    {
      title: '🌬️ Composition of Atmospheric Air — Gases & Vital Functions',
      icon: '🎈',
      columns: ['Component', 'Percentage in Air', 'Key Property', 'Vital Role in Nature', 'Daily Life & Industrial Use'],
      rows: [
        ['Nitrogen (N₂)', '~78%', 'Colourless, odourless, does not burn or support burning', 'Dilutes oxygen so fires do not burn uncontrollably; builds plant proteins', 'Flushed into chips/snack packets to prevent rancidity; liquid nitrogen cooling.'],
        ['Oxygen (O₂)', '~21%', 'Supports combustion; active life-sustaining gas', 'Essential for cellular respiration in plants and animals to release energy', 'Hospital oxygen cylinders for patients; scuba diving and high-altitude tanks.'],
        ['Carbon Dioxide (CO₂)', '~0.04%', 'Heavier than air, non-flammable, extinguishes flames', 'Absorbed by green plants in sunlight for photosynthesis to make food', 'Used in fire extinguishers; fizz in carbonated soft drinks; solid dry ice cooling.'],
        ['Noble / Inert Gases', '~0.93% (Argon, Neon, Helium)', 'Chemically unreactive, non-toxic, odorless', 'Trace atmospheric gases', 'Argon in incandescent light bulbs; Neon in glowing display signs; Helium in balloons.'],
        ['Water Vapour', 'Variable (0.1% – 4%)', 'Invisible gaseous water; determines humidity', 'Drives the water cycle; forms clouds, dew, frost, and rain', 'Higher in coastal regions; lower in winter resulting in dry skin.'],
        ['Dust Particles & Smoke', 'Variable', 'Microscopic suspended solid particles', 'Act as condensation nuclei around which water vapour condenses into raindrops', 'Excessive amounts cause smog, reduced visibility, and respiratory allergies.']
      ],
      takeaway: 'Nitrogen (78%) = Protein builder & flame damper | Oxygen (21%) = Breathing & burning | CO₂ (0.04%) = Photosynthesis & fire extinguishers'
    },
    {
      title: '🎈 Scientific Properties of Air — Classroom Experiments & Daily Proofs',
      icon: '⚖️',
      columns: ['Property of Air', 'Classic Classroom Experiment', 'What You Observe', 'Scientific Deduction', 'Everyday Life Application'],
      rows: [
        ['Air Has Mass (Weight)', 'Two identical inflated balloons balanced on a ruler; prick one balloon', 'The side with the inflated balloon dips down immediately', 'Air trapped inside the balloon has weight, tipping the balance down', 'Inflated vehicle tyres weigh measurably more than deflated tyres.'],
        ['Air Occupies Space', 'Push an inverted open glass tumbler straight down into a bucket of water', 'Water cannot enter the tumbler until you tilt it to let air bubbles out', 'Air trapped inside the tumbler occupies space and blocks water from entering', 'Parachutes trap air to slow descent; footballs expand when pumped.'],
        ['Air Exerts Pressure in All Directions', 'Fill a glass with water, cover with thick cardboard, and turn upside down', 'Water does not spill; cardboard remains firmly pressed against the glass rim', 'Upward atmospheric pressure pushing on the cardboard exceeds downward weight of water', 'Drinking straws, medicine droppers, suction rubber wall hooks, injection syringes.'],
        ['Air Supports Combustion', 'Place an inverted glass tumbler over a burning candle on a table', 'The candle flickers and extinguishes after 10–15 seconds', 'Oxygen in the trapped air is consumed; burning ceases once O₂ is depleted', 'Covering a fire with a heavy blanket cuts off oxygen to extinguish it.'],
        ['Air Contains Water Vapour', 'Place ice cubes in a dry metal or glass tumbler on a humid day', 'Tiny water droplets appear on the OUTSIDE dry surface of the glass', 'Invisible water vapour in room air cools and condenses upon contacting cold glass', 'Morning dew on grass blades; fogging of car windows and spectacles in winter.']
      ],
      takeaway: 'Air has mass (dipping balloon balance) | Occupies space (inverted glass bubbles) | Exerts pressure (straw & suction cups) | Supports burning (candle under jar)'
    }
  ],

  'ch11_rocks': [
    {
      title: '🪨 The Three Rock Families — Formation, Characteristics & Everyday Uses',
      icon: '🏔️',
      columns: ['Rock Family', 'Formation Mechanism', 'Distinguishing Characteristics', 'Classic Rock Examples', 'Famous Monuments & Uses'],
      rows: [
        ['Igneous Rocks', 'Cooling and solidification of molten magma (underground) or lava (surface); first rocks formed on Earth', 'Crystalline, very hard or spongy porous with gas holes; no fossils', 'Granite, Pumice, Basalt', 'Granite: kitchen slabs & statues; Pumice: floats on water, dentist polish; Basalt: ocean floors, road gravel'],
        ['Sedimentary Rocks', 'Weathering of rocks, river transport, layer-by-layer deposition and compaction over millions of years', 'Distinct horizontal layers (strata); often contains fossils of shells and plants', 'Sandstone, Shale, Limestone, Conglomerate, Coal', 'Sandstone: Red Fort (Delhi); Limestone: Cement, bricks & chalk; Shale: Tiles; Coal: Thermal power'],
        ['Metamorphic Rocks', 'Existing igneous or sedimentary rocks baked by intense underground heat and crushed by tectonic pressure', 'Recrystallized, ultra-dense, foliated ribbon-like stripes or interlocking crystals', 'Marble, Quartzite, Slate, Gneiss', 'Marble: Taj Mahal (Agra) & floors; Quartzite: Scratches steel, watches & glass; Slate: Blackboards & roofs; Gneiss: Sparkling mica bands']
      ],
      takeaway: 'Igneous = Fire-born (Granite/Pumice/Basalt) | Sedimentary = Layered sediments (Sandstone/Limestone) | Metamorphic = Heat & pressure transformed (Marble/Quartzite/Slate/Gneiss)'
    },
    {
      title: '⚡ The Metamorphic Transformation Matrix — Parent Rock to Transformed Rock',
      icon: '🔄',
      columns: ['Original Parent Rock', 'Parent Rock Family', 'Transforming Geological Forces', 'Resulting Metamorphic Rock', 'Key Superpower & Human Uses'],
      rows: [
        ['Limestone (Calcite shells)', 'Sedimentary', 'Intense underground baking heat & pressure', 'Marble', 'Can be carved and polished to a mirror shine; Taj Mahal; statues & flooring'],
        ['Sandstone (Quartz sand grains)', 'Sedimentary', 'Extreme baking heat & tectonic compression', 'Quartzite', 'Interlocking dense quartz crystals; so hard it scratches steel; watches & glassmaking'],
        ['Shale (Hardened clay mud)', 'Sedimentary', 'Directional compression & moderate heat', 'Slate', 'Splits along parallel planes into smooth, flat waterproof sheets; blackboards & roof shingles'],
        ['Granite (Coarse magma crystals)', 'Igneous', 'Extreme directional shear pressure & heat', 'Gneiss (pronounced "nice")', 'Minerals segregate into glistening ribbons of mica with alternating dark and light stripes']
      ],
      takeaway: 'Limestone ➔ Marble (Taj Mahal) | Sandstone ➔ Quartzite (Scratches steel) | Shale ➔ Slate (Blackboards) | Granite ➔ Gneiss (Mica ribbons)'
    },
    {
      title: '🔥 The 4 Coal Grades — Rank, Carbon Purity, Heat & Smoke',
      icon: '⛏️',
      columns: ['Coal Grade', 'Formation Stage', 'Carbon % & Visual Appearance', 'Heat Output (Calorific Value)', 'Smoke Emission & Primary Applications'],
      rows: [
        ['Peat', 'Earliest stage (decayed swamp vegetation)', '<60% Carbon; fibrous, spongy, light brown', 'Very low heat output', 'Burns with thick, heavy smoke; rarely used as industrial fuel'],
        ['Lignite ("Brown Coal")', 'Second stage of compaction', '~65–70% Carbon; dark brown, soft & crumbly', 'Moderate heat output', 'Largest portion of world’s coal reserves; used in thermal power; Neyveli (Tamil Nadu)'],
        ['Bituminous ("Soft Coal")', 'Third stage under intense pressure', '~75–85% Carbon; dense black, layered', 'High heat output', 'Burns with smoke; most widely used coal for electricity generation & steel mills; Dhanbad & Raniganj'],
        ['Anthracite ("Hard Coal")', 'Final metamorphic grade (The Best Coal!)', '>90% Carbon; lustrous, jet-black, rock-hard', 'Maximum heat output', 'Burns with intense, steady heat and almost zero smoke; cleanest & highest grade coal']
      ],
      takeaway: 'Coal Rank: Peat (lowest heat, smoky) < Lignite (brown, Neyveli) < Bituminous (soft coal, power plants) < Anthracite (hard coal, best heat, no smoke)'
    },
    {
      title: '💎 Metallic Ores & Fossil Fuels — Extracted Resources & Products',
      icon: '⚙️',
      columns: ['Mineral / Resource', 'Type / Classification', 'Extracted Metal or Fuel Product', 'Chemical Basis / Origin', 'Essential Daily Products & Applications'],
      rows: [
        ['Bauxite', 'Metallic Mineral Ore', 'Aluminium (Al)', 'Hydrated aluminium oxides', 'Aeroplane bodies, kitchen foils, beverage cans, electrical overhead cables'],
        ['Haematite', 'Metallic Mineral Ore', 'Iron (Fe)', 'Iron oxide (Fe₂O₃)', 'Steel manufacturing, railway tracks, building bridges & girders, car chassis, nails & screws'],
        ['Cuprite', 'Metallic Mineral Ore', 'Copper (Cu)', 'Copper oxide (Cu₂O)', 'Electrical wiring, motors, generators, coins, water pipes & cookware'],
        ['Galena', 'Metallic Mineral Ore', 'Lead (Pb)', 'Lead sulphide (PbS)', 'Automobile lead-acid batteries, X-ray room radiation shielding'],
        ['Sphalerite', 'Metallic Mineral Ore', 'Zinc (Zn)', 'Zinc sulphide (ZnS)', 'Galvanizing steel/iron sheets to prevent rust, brass alloy production'],
        ['Petroleum ("Black Gold")', 'Non-Metallic Fossil Fuel', 'Petrol, Diesel, LPG, CNG, Paraffin Wax', 'Buried prehistoric marine plankton & sea organisms', 'Automobile & jet fuels, clean cooking gas, candle making, shoe polish, plastics & cosmetics; Bombay High & Digboi']
      ],
      takeaway: 'Ores: Bauxite ➔ Aluminium | Haematite ➔ Iron | Cuprite ➔ Copper | Galena ➔ Lead | Sphalerite ➔ Zinc | Petroleum ➔ Fuels & Paraffin Wax'
    }
  ],

  'ch13_matter': [
    {
      title: '⚗️ States of Matter — Solid vs Liquid vs Gas',
      icon: '🧊',
      columns: ['Property', 'Solid 🧊', 'Liquid 💧', 'Gas 💨'],
      rows: [
        ['Shape', 'Fixed, definite shape', 'No fixed shape (takes container\'s shape)', 'No fixed shape (fills entire container)'],
        ['Volume', 'Fixed, definite volume', 'Fixed, definite volume', 'No fixed volume (expands to fill space)'],
        ['Compressibility', 'Cannot be compressed (particles tightly packed)', 'Very slightly compressible', 'Highly compressible (large empty spaces between particles)'],
        ['Molecular Spacing', 'Tightly packed in orderly rows', 'Loosely packed, can slide past each other', 'Very far apart, move freely and randomly'],
        ['Intermolecular Force', 'Very strong (holds rigid structure)', 'Moderate (allows flow)', 'Very weak / negligible'],
        ['Kinetic Energy', 'Low (vibrate in place)', 'Moderate (slide & tumble)', 'Very high (zoom in all directions)'],
        ['Examples', 'Ice, iron, wood, diamond', 'Water, milk, oil, juice', 'Steam, oxygen, nitrogen, CO₂'],
        ['Diffusion Speed', 'Extremely slow', 'Slow (ink in water)', 'Fast (perfume fills room quickly)']
      ],
      takeaway: 'Solid: Fixed shape + volume, tightly packed | Liquid: Fixed volume but flows, loosely packed | Gas: No fixed shape or volume, particles far apart'
    },
    {
      title: '🔄 Changes of State — The Phase Transition Matrix',
      icon: '🔥',
      columns: ['Phase Transition', 'State Change', 'Thermal Energy Action', 'Molecular Behaviour', 'Everyday Examples', 'Exam Keyword Clue'],
      rows: [
        ['Melting (Fusion)', 'Solid → Liquid', 'Heat ABSORBED (Warming)', 'Particles gain kinetic energy, vibrate faster, and break out of fixed positions', 'Ice turning into water at 0°C; butter melting on a warm pan', 'Loses fixed shape, retains fixed volume.'],
        ['Freezing (Solidification)', 'Liquid → Solid', 'Heat RELEASED (Cooling)', 'Particles slow down; intermolecular attraction locks them into fixed lattice', 'Water freezing into ice at 0°C; molten candle wax hardening', 'Becomes rigid with fixed shape and definite volume.'],
        ['Evaporation & Boiling', 'Liquid → Gas', 'Heat ABSORBED (Warming)', 'Particles gain high speed, overcome liquid attraction, and escape into air', 'Wet clothes drying in sun; water boiling into steam at 100°C', 'Boiling occurs at 100°C throughout liquid; evaporation occurs at surface at any temp.'],
        ['Condensation', 'Gas → Liquid', 'Heat RELEASED (Cooling)', 'Gas particles lose speed on cold surface, draw closer, and form liquid droplets', 'Water drops on teacup lid; dew on grass; mist on cold bathroom mirror', 'Water vapour turns back into liquid upon cooling.'],
        ['Sublimation', 'Solid → Gas directly (NO liquid phase!)', 'Heat ABSORBED', 'Surface molecules gain enough energy to jump directly into gas phase', 'Naphthalene mothballs in cupboard; Camphor (kapoor); Dry ice (solid CO₂)', 'Vanishes over time without leaving any liquid puddle behind!'],
        ['Deposition (Desublimation)', 'Gas → Solid directly (NO liquid phase!)', 'Heat RELEASED rapidly', 'Gas molecules cool extremely rapidly and bond directly into solid crystal lattice', 'Frost forming on freezing car windshield; industrial dry ice production from CO₂ gas', 'Direct vapour to solid crystal formation without liquid phase.']
      ],
      takeaway: 'Melting = Solid → Liquid | Boiling = Liquid → Gas | Condensation = Gas → Liquid | Sublimation = Solid → Gas directly (Naphthalene/Camphor)'
    },
    {
      title: '🧪 Physical Changes vs Chemical Changes — Spot the Difference',
      icon: '⚗️',
      columns: ['Comparison Criteria', 'Physical Change', 'Chemical Change', 'Diagnostic Rule'],
      rows: [
        ['New Substance Formation', 'NO new substance is formed; only shape, size, appearance, or state changes', 'One or more ENTIRELY NEW substances with different properties are formed', '"Is a new chemical created?"'],
        ['Reversibility', 'Usually REVERSIBLE (can return to original form easily)', 'Mostly IRREVERSIBLE (cannot be undone by simple physical methods)', '"Can you un-fry an omelette? No!"'],
        ['Molecular Identity', 'Chemical composition stays identical (e.g. H₂O in ice, water, steam)', 'Chemical composition changes; molecular bonds break and new bonds form', 'Chemical bonds permanently altered.'],
        ['Energy Change', 'Little or no heat/light energy is absorbed or released', 'Significant heat, light, sound, or gas bubbles are released or absorbed', 'Look for heat, flame, or fizzing.'],
        ['Mass Change of Original', 'Mass of original substance remains strictly unchanged', 'Original substance transforms into products with different properties', 'Total mass conserved in closed system.'],
        ['Everyday Examples', 'Melting ice, tearing paper, breaking glass, dissolving sugar in water, stretching rubber band', 'Frying an egg, burning wood/paper, rusting iron, curdling milk into paneer, baking a cake', 'Cooked, rusted, burned, or curdled ⟹ Chemical!']
      ],
      takeaway: 'Physical = Reversible, NO new substance (Melting, Tearing, Dissolving) | Chemical = Irreversible, NEW substance formed (Rusting, Burning, Curdling, Cooking)'
    },
    {
      title: '🥣 Solutions, Solutes & Solvents — Dissolving Science',
      icon: '🧂',
      columns: ['Scientific Term', 'Exact Definition', 'Classroom Concept / Formula', 'Everyday Examples', 'Factors That Speed It Up'],
      rows: [
        ['Solute', 'The substance that dissolves in a liquid', 'Solute + Solvent = Solution', 'Sugar crystals, table salt, coffee powder, instant drink mix', 'Crushing into fine powder increases surface area → dissolves faster.'],
        ['Solvent', 'The liquid in which the solute dissolves (usually larger quantity)', 'Water is the "Universal Solvent" because it dissolves more substances than any other liquid', 'Water, milk, alcohol', 'Heating the solvent increases molecular spacing → dissolves solute faster.'],
        ['Solution', 'A uniform, homogeneous mixture formed when solute completely dissolves in solvent', 'Solute particles spread evenly and become completely invisible', 'Saltwater, sweet lemonade, clear tea', 'Stirring vigorously spreads solute particles throughout solvent.'],
        ['Soluble vs Insoluble', 'Soluble dissolves completely; Insoluble does NOT dissolve and remains separate', 'Soluble: clear liquid; Insoluble: cloudy or settles at bottom', 'Soluble: Sugar, salt | Insoluble: Sand, chalk, sawdust, oil', 'Insoluble solids can be separated by filtration or sedimentation.'],
        ['Miscible vs Immiscible', 'Miscible liquids mix completely; Immiscible liquids do NOT mix and form separate layers', 'Miscible: single uniform layer; Immiscible: 2 layers (lighter liquid floats)', 'Miscible: Milk + water, lemon juice + water | Immiscible: Cooking oil + water, petrol + water', 'Density difference causes oil to float on water.']
      ],
      takeaway: 'Solute (Sugar) + Solvent (Water) = Solution (Sweet Water) | Water = Universal Solvent | Dissolves faster with: Heat 🔥, Stirring 🥄, Smaller grain size 🧂'
    }
  ]
};

function renderRevisionView(container) {
  const ch = getActiveChapter();
  const tables = REVISION_TABLES_DATA[ch.id] || [];

  if (tables.length === 0) {
    container.innerHTML = `
      <div class="view-header">
        <div class="view-header-title">
          <h3>📊 Quick Revision Tables</h3>
          <p>No comparison tables available for this chapter yet.</p>
        </div>
      </div>
    `;
    return;
  }

  let html = renderMasteryBanner(ch);
  html += `
    <div class="revision-container">
      <div class="view-header">
        <div class="view-header-title">
          <h3>📊 ${ch.number}: Quick Revision Tables</h3>
          <p>Visual comparison tables for fast exam revision. Study patterns, spot differences, and memorize key facts at a glance!</p>
        </div>
      </div>

      ${tables.map((table, tIdx) => `
        <div class="revision-table-card" style="--card-accent: ${ch.themeColor}">
          <div class="revision-table-header">
            <span class="revision-table-icon">${table.icon}</span>
            <h4>${table.title}</h4>
          </div>

          <div class="revision-table-scroll">
            <table class="revision-table">
              <thead>
                <tr>
                  ${table.columns.map(col => `<th>${col}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${table.rows.map((row, rIdx) => `
                  <tr class="${rIdx % 2 === 0 ? 'even-row' : 'odd-row'}">
                    ${row.map((cell, cIdx) => `<td class="${cIdx === 0 ? 'row-label' : ''}">${cell}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="revision-takeaway-box">
            <span class="takeaway-icon">📌</span>
            <div>
              <strong>Key Takeaway:</strong>
              <span>${table.takeaway}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  container.innerHTML = html;
  bindMasteryBannerEvents(container, ch.id);
}

// ==========================================================================
// 12. RESULTS MODAL & PROGRESS EVALUATION
// ==========================================================================
function showResultsModal(correct, total) {
  const modal = document.getElementById('results-modal');
  if (!modal) return;

  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  let stars = 1;
  let emoji = '👍';
  let title = 'Good Science Effort!';
  let msg = 'Keep exploring the concept labs and revising the worksheets!';

  if (pct >= 85) {
    stars = 3;
    emoji = '🏆';
    title = 'Master Scientist!';
    msg = 'Outstanding deductive reasoning and full syllabus mastery!';
    ConfettiController.launch();
    AudioController.fanfare();
  } else if (pct >= 60) {
    stars = 2;
    emoji = '🌟';
    title = 'Great Progress!';
    msg = 'Solid scientific deduction! Review the diagnostic traps to reach 3 stars.';
    AudioController.fanfare();
  } else {
    AudioController.correct();
  }

  // Record high score for sprint milestone
  state.chapterProgress = state.chapterProgress || {};
  state.chapterProgress[state.activeChapterId] = state.chapterProgress[state.activeChapterId] || {};
  const prevHigh = state.chapterProgress[state.activeChapterId].sprintHighScore || 0;
  state.chapterProgress[state.activeChapterId].sprintHighScore = Math.max(prevHigh, state.sprint.score);
  saveActiveState();

  const chSprint = getActiveChapter();
  const currentChapterStars = evaluateAndAwardStars(state.activeChapterId);
  const targetStars = chSprint.targetStars || 10;

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-stars').textContent = `⭐ ${currentChapterStars} / ${targetStars} Chapter Stars Earned`;
  document.getElementById('result-message').textContent = msg;
  document.getElementById('result-correct').textContent = correct;
  document.getElementById('result-total').textContent = total;
  document.getElementById('result-accuracy').textContent = `${pct}%`;

  modal.classList.add('active');

  const retryBtn = document.getElementById('btn-modal-retry');
  const reviewBtn = document.getElementById('btn-modal-review');
  const closeBtn = document.getElementById('btn-modal-close');

  const closeModal = () => {
    modal.classList.remove('active');
  };

  if (retryBtn) {
    retryBtn.onclick = () => {
      closeModal();
      state.currentQuestionIndex = 0;
      state.scoreCorrect = 0;
      state.scoreWrong = 0;
      state.answeredMap = {};
      saveActiveState();
      renderCurrentView();
    };
  }

  if (reviewBtn) {
    reviewBtn.onclick = () => {
      closeModal();
      switchMode('learn');
    };
  }

  if (closeBtn) {
    closeBtn.onclick = closeModal;
  }
}

function triggerFlash(type) {
  const el = document.getElementById('feedback-flash');
  if (!el) return;
  el.className = `feedback-flash flash-${type}`;
  setTimeout(() => {
    el.className = 'feedback-flash';
  }, 350);
}
