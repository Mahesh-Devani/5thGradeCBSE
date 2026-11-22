/* ============================================
   English Grammar Master — Application Logic
   Class 5 CBSE — Fun Thinking-Based Learning
   ============================================ */

// Data and Milestones loaded modularly from english_grammer/data/
// - data/topics.js (TOPIC_DATA)
// - data/milestones.js (TOPIC_MILESTONES)
// ============================================
// APPLICATION STATE
// ============================================

const state = {
  currentTopic: null,
  currentMode: 'learn',
  exerciseIndex: 0,
  score: { correct: 0, incorrect: 0, total: 0 },
  answered: false,
  selectedOption: null,
  exerciseIndices: [],
  timerInterval: null,
  timeLeft: 0,
  progress: {},
  shuffledExercises: [],
  sortState: { selectedItem: null, placements: {} },
  topicProgress: {},
  answeredExercises: {},
  voiceMode: false,
  voiceTranscript: '',
  voiceListening: false
};

const STORAGE_KEY = 'grammar-master-progress';
const ACTIVE_STATE_KEY = 'grammar-master-active-state';
const CHALLENGE_TIME_PER_Q = 15;

function loadActiveState() {
  try {
    const saved = localStorage.getItem(ACTIVE_STATE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.topicProgress) state.topicProgress = parsed.topicProgress;
      if (parsed.answeredExercises) state.answeredExercises = parsed.answeredExercises;
      if (parsed.practiceSession && parsed.practiceSession.voiceMode !== undefined) {
        state.voiceMode = !!parsed.practiceSession.voiceMode;
      }
      return parsed;
    }
  } catch (e) {}
  return null;
}

function saveActiveState() {
  try {
    if (state.currentTopic) {
      const payload = {
        currentTopic: state.currentTopic,
        currentMode: state.currentMode,
        topicProgress: state.topicProgress,
        answeredExercises: state.answeredExercises
      };
      if (state.currentMode === 'practice' && Array.isArray(state.exerciseIndices) && state.exerciseIndices.length > 0) {
        payload.practiceSession = {
          topicId: state.currentTopic,
          exerciseIndices: state.exerciseIndices,
          exerciseIndex: state.exerciseIndex,
          score: state.score,
          answered: state.answered,
          selectedOption: state.selectedOption,
          voiceMode: state.voiceMode
        };
      }
      localStorage.setItem(ACTIVE_STATE_KEY, JSON.stringify(payload));
    }
  } catch (e) {}
}

// ============================================
// AUDIO FEEDBACK (Web Audio API)
// ============================================


// ============================================
// AUDIO & CONFETTI (Delegated to Shared Core)
// ============================================

function playTapSound() {
  if (window.AppAudio) window.AppAudio.tap();
}

function playCorrectSound() {
  if (window.AppAudio) window.AppAudio.correct();
}

function playIncorrectSound() {
  if (window.AppAudio) window.AppAudio.wrong();
}

function launchConfetti() {
  if (window.AppConfetti) {
    window.AppConfetti.launch();
  } else {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
  }
}

// ============================================
// FEEDBACK FLASH
// ============================================

function flashFeedback(type) {
  const el = document.getElementById('feedback-flash');
  if (!el) return;
  el.className = 'feedback-flash flash-' + type;
  setTimeout(() => { el.className = 'feedback-flash'; }, 400);
}

// ============================================
// PROGRESS & 10-STAR MASTERY MANAGEMENT
// ============================================

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) state.progress = JSON.parse(saved);
  } catch (e) {}
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch (e) {}
}

function getStars(topicId) {
  return state.progress[topicId] || 0;
}

function setStars(topicId, stars) {
  const current = getStars(topicId);
  if (stars === 0 || stars > current) {
    state.progress[topicId] = stars;
    saveProgress();
  }
}

function calcStars(correct, total) {
  if (total === 0) return 0;
  const pct = correct / total;
  if (pct >= 1) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.4) return 1;
  return 0;
}

function renderStars(count) {
  return '⭐ ' + count + '/10';
}

function updateOverallProgress() {
  const topicIds = Object.keys(TOPIC_DATA);
  const totalPossible = topicIds.length * 10;
  let totalEarned = 0;
  topicIds.forEach(id => { totalEarned += getStars(id); });
  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  if (fill) fill.style.width = (totalEarned / totalPossible * 100) + '%';
  if (label) label.textContent = totalEarned + ' / ' + totalPossible + ' stars earned';
}

function getTopicProgressData(topicId) {
  if (!state.topicProgress[topicId]) {
    state.topicProgress[topicId] = {
      sectionsRead: {},
      trapsDiagnosed: {},
      challengeHighScore: 0
    };
  }
  const prog = state.topicProgress[topicId];
  if (!prog.sectionsRead) prog.sectionsRead = {};
  if (!prog.trapsDiagnosed) prog.trapsDiagnosed = {};

  const topic = TOPIC_DATA[topicId];
  const allExercises = topic ? topic.exercises : [];
  const answered = state.answeredExercises[topicId] || {};

  let totalSolved = 0;
  let correctSolved = 0;
  let mcqSolved = 0;
  let fillSolved = 0;

  Object.entries(answered).forEach(([idxStr, st]) => {
    const idx = parseInt(idxStr, 10);
    const ex = allExercises[idx];
    if (st && st.answered) {
      totalSolved++;
      if (st.correct) correctSolved++;
      if (ex) {
        if (ex.type === 'mcq') mcqSolved++;
        else if (ex.type === 'fill') fillSolved++;
      }
    }
  });

  const sectionsReadCount = Object.values(prog.sectionsRead).filter(Boolean).length;
  const trapsDiagnosedCount = Object.values(prog.trapsDiagnosed).filter(Boolean).length;

  return {
    sectionsRead: prog.sectionsRead,
    sectionsReadCount,
    trapsDiagnosed: prog.trapsDiagnosed,
    trapsDiagnosedCount,
    challengeHighScore: prog.challengeHighScore || 0,
    totalSolved,
    correctSolved,
    mcqSolved,
    fillSolved,
    answered
  };
}

function evaluateAndAwardStars(topicId, silent = false) {
  const milestones = TOPIC_MILESTONES[topicId] || [];
  if (milestones.length === 0) return 0;
  const data = getTopicProgressData(topicId);

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

  const prevStars = getStars(topicId);
  if (earnedStars > prevStars) {
    setStars(topicId, earnedStars);
    if (!silent) {
      playCorrectSound();
      if (earnedStars >= 10) {
        launchConfetti();
      }
    }
    updateOverallProgress();
    renderSidebar();
    updateTopBarPassportButton();
  }
  return earnedStars;
}

function updateTopBarPassportButton() {
  const btn = document.getElementById('btn-passport');
  if (!btn) return;
  const topicId = state.currentTopic || 'articles';
  const stars = getStars(topicId);
  const label = btn.querySelector('.passport-btn-label');
  if (label) {
    label.textContent = `⭐ ${stars}/10 Passport`;
  } else {
    btn.innerHTML = `📋 ⭐ ${stars}/10 Passport`;
  }
}

function renderTopicMasteryBanner(topic) {
  const stars = getStars(topic.id);
  const pct = Math.round((stars / 10) * 100);
  return `
    <div class="topic-mastery-banner" id="topic-mastery-banner">
      <div class="mastery-banner-left">
        <div class="mastery-star-pill">⭐ ${stars} / 10 Stars</div>
        <div class="mastery-bar-track">
          <div class="mastery-bar-fill" style="width: ${pct}%;"></div>
        </div>
        <div class="mastery-pct-label">${pct}% Mastered</div>
      </div>
      <button class="btn-passport-trigger" id="btn-banner-passport" onclick="openLearningPassport('${topic.id}')">
        📋 View Learning Passport
      </button>
    </div>
  `;
}

function toggleSectionRead(topicId, sectionIdx) {
  if (!state.topicProgress[topicId]) {
    state.topicProgress[topicId] = { sectionsRead: {}, trapsDiagnosed: {}, challengeHighScore: 0 };
  }
  if (!state.topicProgress[topicId].sectionsRead) {
    state.topicProgress[topicId].sectionsRead = {};
  }
  state.topicProgress[topicId].sectionsRead[sectionIdx] = true;
  playTapSound();
  evaluateAndAwardStars(topicId);
  saveActiveState();
  renderLearnMode();
}

function diagnoseTrap(topicId, trapIdx) {
  if (!state.topicProgress[topicId]) {
    state.topicProgress[topicId] = { sectionsRead: {}, trapsDiagnosed: {}, challengeHighScore: 0 };
  }
  if (!state.topicProgress[topicId].trapsDiagnosed) {
    state.topicProgress[topicId].trapsDiagnosed = {};
  }
  state.topicProgress[topicId].trapsDiagnosed[trapIdx] = true;
  playCorrectSound();
  evaluateAndAwardStars(topicId);
  saveActiveState();
  renderLearnMode();
}

function openLearningPassport(topicId) {
  const topic = TOPIC_DATA[topicId] || TOPIC_DATA[state.currentTopic] || TOPIC_DATA.articles;
  const modal = document.getElementById('passport-modal');
  if (!modal) return;

  const milestones = TOPIC_MILESTONES[topic.id] || [];
  const data = getTopicProgressData(topic.id);
  const clearedCount = milestones.filter(m => {
    try { return m.check(data); } catch (e) { return false; }
  }).length;
  const targetStars = topic.targetStars || 10;
  const isAllCleared = clearedCount >= targetStars;
  const pct = Math.round((clearedCount / targetStars) * 100);

  const iconEl = document.getElementById('passport-icon');
  const titleEl = document.getElementById('passport-title');
  const subtitleEl = document.getElementById('passport-subtitle');
  const starsEl = document.getElementById('passport-stars-display');
  const fillEl = document.getElementById('passport-progress-fill');
  const statusEl = document.getElementById('passport-status-text');

  if (iconEl) iconEl.textContent = topic.icon;
  if (titleEl) titleEl.textContent = `${topic.title} — Learning Passport`;
  if (subtitleEl) subtitleEl.textContent = `Parent & Teacher Comprehensive Audit Report • ${topic.subtitle}`;
  if (starsEl) starsEl.textContent = `⭐ ${clearedCount} / ${targetStars} Stars Earned`;
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (statusEl) statusEl.textContent = isAllCleared
    ? '🎉 Topic Fully Certified! 100% Mastered'
    : `${pct}% Completed (${targetStars - clearedCount} milestones remaining)`;

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
            <p>This certifies that <strong>the student has successfully completed 100% of all required concept lessons, diagnostic traps, practice categories, and rapid recall sprint</strong> for <strong>${topic.title}</strong>. Full conceptual understanding, critical thinking, and CBSE exam readiness are verified.</p>
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
    modal.classList.remove('visible');
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
        if (pendingMilestone.id.startsWith('learn') || pendingMilestone.id === 'exam_traps') {
          setMode('learn');
        } else if (pendingMilestone.id === 'challenge_sprint') {
          setMode('challenge');
        } else {
          setMode('practice');
        }
      }
    };
  }

  modal.classList.add('visible');
}

// ============================================
// SIDEBAR RENDERING
// ============================================

function renderSidebar() {
  const container = document.getElementById('sidebar-topics');
  if (!container) return;
  container.innerHTML = '';
  Object.values(TOPIC_DATA).forEach(topic => {
    const card = document.createElement('div');
    card.className = 'topic-card' + (state.currentTopic === topic.id ? ' active' : '');
    card.id = 'topic-' + topic.id;
    const stars = getStars(topic.id);
    card.innerHTML = `
      <div class="topic-icon">${topic.icon}</div>
      <div class="topic-info">
        <div class="topic-name">${topic.title}</div>
        <div class="topic-subtitle">${topic.subtitle}</div>
        <div class="sidebar-mini-progress">
          <div class="mini-progress-fill" style="width: ${stars * 10}%"></div>
        </div>
      </div>
      <div class="topic-stars">⭐ ${stars}/10</div>
    `;
    card.addEventListener('click', () => selectTopic(topic.id));
    container.appendChild(card);
  });
  updateOverallProgress();
}

// ============================================
// TOPIC SELECTION & MODE SWITCHING
// ============================================

function selectTopic(topicId, targetMode = 'learn', isResume = false) {
  state.currentTopic = topicId;
  state.currentMode = targetMode;
  if (!isResume) {
    state.exerciseIndex = 0;
    state.score = { correct: 0, incorrect: 0, total: 0 };
    state.answered = false;
    state.selectedOption = null;
    state.exerciseIndices = [];
  }
  clearTimer();

  const topic = TOPIC_DATA[topicId];
  document.getElementById('top-bar-title').textContent = topic.icon + ' ' + topic.title;
  document.getElementById('top-bar-subtitle').textContent = topic.subtitle;

  document.getElementById('welcome-screen').style.display = 'none';
  document.getElementById('content-area').classList.add('visible');

  closeSidebar();
  renderSidebar();
  updateTopBarPassportButton();
  setMode(targetMode, isResume);
  saveActiveState();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setMode(mode, isResume = false) {
  state.currentMode = mode;
  if (!isResume) {
    state.exerciseIndex = 0;
    state.score = { correct: 0, incorrect: 0, total: 0 };
    state.answered = false;
    state.selectedOption = null;
  }
  clearTimer();

  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });

  updateTopBarPassportButton();

  if (mode === 'learn') renderLearnMode();
  else if (mode === 'practice') startExercises(false, isResume);
  else if (mode === 'challenge') startExercises(true, isResume);

  saveActiveState();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showWelcome() {
  document.getElementById('welcome-screen').style.display = 'flex';
  document.getElementById('content-area').classList.remove('visible');
}

// ============================================
// LEARN MODE
// ============================================

function renderLearnMode() {
  const topic = TOPIC_DATA[state.currentTopic];
  if (!topic) return;
  const area = document.getElementById('content-area');
  const lesson = topic.lesson;
  const progData = getTopicProgressData(topic.id);

  let html = `<div class="lesson-container">`;
  html += renderTopicMasteryBanner(topic);

  html += `<div class="lesson-header">
      <div class="lesson-icon">${topic.icon}</div>
      <h3>${topic.title}</h3>
      <p>${lesson.intro}</p>
    </div>`;

  lesson.sections.forEach((section, i) => {
    const isRead = !!(progData.sectionsRead && progData.sectionsRead[i]);
    html += `<div class="lesson-card ${isRead ? 'card-completed' : ''}" style="animation-delay: ${i * 0.1}s">
      <h4>${section.title}</h4>
      ${section.content}`;

    if (section.examples) {
      section.examples.forEach(ex => {
        html += `<div class="example-box">${ex.text}</div>`;
      });
    }
    if (section.think) {
      html += `<div class="think-box">
        <div class="label">🧠 Think About It</div>
        <p>${section.think}</p>
      </div>`;
    }

    html += `<div style="margin-top: 1rem; text-align: right;">
      <button class="btn btn-sm ${isRead ? 'btn-success' : ''}" onclick="toggleSectionRead('${topic.id}', ${i})">
        ${isRead ? '✅ Understood & Concept Checked' : '📖 Mark Section Understood (+1 ⭐)'}
      </button>
    </div>`;

    html += `</div>`;
  });

  // CBSE Exam Traps Section
  if (topic.examTraps && topic.examTraps.length > 0) {
    html += `<div class="exam-traps-section">
      <h3 class="exam-traps-title">🚨 Spot the CBSE Exam Traps</h3>
      <p style="font-size: 0.88rem; color: #94a3b8; margin-bottom: 1rem;">
        Diagnose the sneaky errors examiners use to trap Class 5 students! Click to reveal the secret CBSE defense rule and earn Star 3.
      </p>`;

    topic.examTraps.forEach((trap, i) => {
      const isDiagnosed = !!(progData.trapsDiagnosed && progData.trapsDiagnosed[i]);
      html += `
        <div class="trap-card ${isDiagnosed ? 'trap-completed' : ''}" id="trap-${topic.id}-${i}">
          <div class="trap-card-icon">${isDiagnosed ? '🛡️' : '⚠️'}</div>
          <div class="trap-card-content">
            <h4>${trap.trap}</h4>
            ${isDiagnosed
              ? `<p class="trap-truth" style="margin-top: 6px; font-size: 0.88rem; color: #86efac; line-height: 1.5;">💡 <strong>CBSE Rule / Remedy:</strong> ${trap.truth}</p>`
              : `<button class="btn btn-sm btn-secondary" style="margin-top: 6px;" onclick="diagnoseTrap('${topic.id}', ${i})">🔍 Diagnose Exam Trap & Reveal Secret (+1 ⭐)</button>`
            }
          </div>
        </div>
      `;
    });

    html += `</div>`;
  }

  html += `<div class="lesson-nav">
    <button class="btn btn-primary" onclick="setMode('practice')">🧩 Start Practice →</button>
    <button class="btn" onclick="setMode('challenge')">🎯 Jump to Challenge</button>
  </div></div>`;

  area.innerHTML = html;
}

// ============================================
// EXERCISE MODES (Practice & Challenge)
// ============================================

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startExercises(timed, isResume = false) {
  const topic = TOPIC_DATA[state.currentTopic];
  if (!topic) return;

  const active = loadActiveState();
  const savedSession = (!timed && isResume && active && active.practiceSession && active.practiceSession.topicId === state.currentTopic)
    ? active.practiceSession
    : null;

  if (savedSession && Array.isArray(savedSession.exerciseIndices) && savedSession.exerciseIndices.length > 0) {
    state.exerciseIndices = savedSession.exerciseIndices;
    state.shuffledExercises = state.exerciseIndices.map(idx => topic.exercises[idx]).filter(Boolean);
    state.exerciseIndex = Math.min(savedSession.exerciseIndex || 0, Math.max(0, state.shuffledExercises.length - 1));
    state.score = savedSession.score || { correct: 0, incorrect: 0, total: state.shuffledExercises.length };
    state.answered = !!savedSession.answered;
    state.selectedOption = savedSession.selectedOption !== undefined ? savedSession.selectedOption : null;
  } else {
    const indices = topic.exercises.map((_, i) => i);
    const shuffledIdxs = shuffleArray(indices);
    state.exerciseIndices = timed ? shuffledIdxs.slice(0, 10) : shuffledIdxs;
    state.shuffledExercises = state.exerciseIndices.map(i => topic.exercises[i]);
    state.exerciseIndex = 0;
    state.score = { correct: 0, incorrect: 0, total: state.shuffledExercises.length };
    state.answered = false;
    state.selectedOption = null;
  }

  if (timed) {
    state.timeLeft = state.shuffledExercises.length * CHALLENGE_TIME_PER_Q;
    startTimer();
  }

  saveActiveState();
  renderExercise();
}

function restartExercises() {
  playTapSound();
  state.exerciseIndex = 0;
  state.score = { correct: 0, incorrect: 0, total: 0 };
  state.answered = false;
  state.selectedOption = null;
  startExercises(false, false);
}

function showExplanationAndOptions(selectedIndex, isCorrect) {
  const ex = state.shuffledExercises[state.exerciseIndex];
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === ex.correct) btn.classList.add('correct');
    if (i === selectedIndex && !isCorrect) btn.classList.add('incorrect');
  });

  const expArea = document.getElementById('explanation-area');
  if (expArea) {
    expArea.innerHTML = `
      <div class="explanation-box ${isCorrect ? 'correct-exp' : 'incorrect-exp'}">
        <strong>${isCorrect ? '✅ Correct!' : '❌ Not quite!'}</strong> ${ex.explanation}
      </div>
      <div class="next-btn-row">
        <button class="btn btn-primary" onclick="nextExercise()">
          ${state.exerciseIndex < state.shuffledExercises.length - 1 ? 'Next Question →' : 'See Results 🏆'}
        </button>
      </div>
    `;
  }

  const correctEl = document.querySelector('.score-correct .score-value');
  const wrongEl = document.querySelector('.score-wrong .score-value');
  if (correctEl) correctEl.textContent = state.score.correct;
  if (wrongEl) wrongEl.textContent = state.score.incorrect;
}

function renderExercise() {
  const area = document.getElementById('content-area');
  if (state.exerciseIndex >= state.shuffledExercises.length) {
    finishExercises();
    return;
  }

  const topic = TOPIC_DATA[state.currentTopic];
  const stars = getStars(state.currentTopic);
  const ex = state.shuffledExercises[state.exerciseIndex];
  const total = state.shuffledExercises.length;
  const num = state.exerciseIndex + 1;

  let html = renderTopicMasteryBanner(topic);
  html += `<div class="exercise-container">`;

  // Score bar
  html += `<div class="score-bar">
    <div class="score-item score-correct"><div class="score-value">${state.score.correct}</div><div class="score-label">Correct</div></div>
    <div class="score-item score-wrong"><div class="score-value">${state.score.incorrect}</div><div class="score-label">Wrong</div></div>
    <div class="score-item score-remaining"><div class="score-value">${total - num + 1}</div><div class="score-label">Left</div></div>
    <div class="score-item" style="cursor: pointer;" onclick="openLearningPassport('${state.currentTopic}')" title="Click to view Learning Passport">
      <div class="score-value" style="color: #fde047;">⭐ ${stars}/10</div>
      <div class="score-label">Mastery</div>
    </div>
  </div>`;

  // Timer
  if (state.currentMode === 'challenge') {
    const timerClass = state.timeLeft <= 10 ? 'danger' : state.timeLeft <= 30 ? 'warning' : '';
    html += `<div class="exercise-timer ${timerClass}" id="timer-display">⏱️ ${formatTime(state.timeLeft)}</div>`;
  }

  // Progress bar with restart button
  html += `<div class="exercise-progress">
    <div class="exercise-progress-bar"><div class="exercise-progress-fill" style="width: ${(num - 1) / total * 100}%"></div></div>
    <div class="exercise-progress-text">${num} / ${total}</div>
    ${state.currentMode === 'practice' ? `
      <button class="btn-restart-exercise" id="btn-restart-exercise" onclick="restartExercises()" title="Restart Practice from Question 1">
        🔄 Restart
      </button>
    ` : ''}
  </div>`;

  // Voice mode toggle bar (Practice mode only)
  if (state.currentMode === 'practice') {
    html += `
      <div class="voice-mode-toggle-bar">
        <button type="button" class="voice-toggle-btn ${state.voiceMode ? 'active' : ''}" id="btn-toggle-voice-mode" onclick="toggleVoiceMode()" title="Toggle voice question & answer mode">
          <span>${state.voiceMode ? '🎙️ Voice Mode Active' : '🎙️ Switch to Voice Q&A'}</span>
          <span class="voice-toggle-pill">${state.voiceMode ? 'ON' : 'OFF'}</span>
        </button>
      </div>
    `;
  }

  // Question card
  html += `<div class="question-card" id="question-card">`;

  const typeBadge = ex.type === 'mcq' ? '🤔 Think & Choose' :
                    ex.type === 'fill' ? '✏️ Fill the Gap' :
                    ex.type === 'spot' ? '🔍 Spot the Error' : '🧩 Exercise';

  html += `<div class="question-type-badge">${typeBadge}</div>`;
  html += `<div class="question-text">${ex.question}</div>`;

  // Interactive Voice Q&A Panel
  if (state.voiceMode && state.currentMode === 'practice') {
    const isSupported = typeof window !== 'undefined' && window.VoiceIO && VoiceIO.isSupported();
    if (!isSupported) {
      html += `
        <div class="voice-unsupported-notice">
          🎙️ <strong>Voice Recognition Note:</strong> Speech recognition is not available in this browser. You can still practice using the standard buttons below!
        </div>
      `;
    } else {
      html += `
        <div class="voice-qa-card" id="voice-qa-card">
          <div class="voice-prompt-action">
            <button type="button" class="btn-speak-question" id="btn-repeat-question" onclick="speakCurrentQuestion()" title="Listen to question spoken aloud">
              🔊 Listen / Repeat Question
            </button>
          </div>

          <div class="voice-mic-container">
            <button type="button" class="voice-mic-btn ${state.voiceListening ? 'listening' : ''}" id="voice-mic-btn" onclick="startVoiceAnswer()" aria-label="Toggle voice answer recording" ${state.answered ? 'disabled' : ''}>
              ${state.voiceListening ? '⏹️' : '🎤'}
            </button>
            <div class="voice-status-label ${state.voiceListening ? 'listening' : ''}" id="voice-status-label">
              ${state.voiceListening ? '🔴 Listening... Speak clearly' : (state.voiceTranscript ? 'Ready to check. Click Check or speak again.' : 'Tap mic to speak your answer')}
            </div>
          </div>

          <div class="voice-transcript-wrapper">
            <label for="voice-transcript-input">Heard Answer:</label>
            <input type="text" id="voice-transcript-input" class="voice-transcript-input" value="${escapeHtml(state.voiceTranscript)}" placeholder="Your spoken answer will appear here..." oninput="onTranscriptInput(this.value)" ${state.answered ? 'disabled' : ''} />
            <small>💡 Tap box to edit if any word was misheard</small>
          </div>

          ${!state.answered ? `
            <div class="voice-actions-row">
              <button type="button" class="btn btn-primary" id="btn-check-voice" onclick="checkVoiceAnswer()">
                ✅ Check Answer
              </button>
              <button type="button" class="btn btn-secondary" onclick="tryAgainVoiceAnswer()">
                🎤 Speak Again
              </button>
              <button type="button" class="btn btn-ghost" onclick="nextExercise()">
                ⏭️ Skip
              </button>
            </div>
          ` : ''}
        </div>
      `;
    }
  }

  // Options Grid
  html += `<div class="options-grid">`;
  const letters = ['A', 'B', 'C', 'D'];
  ex.options.forEach((opt, i) => {
    html += `<button class="option-btn" data-index="${i}" onclick="handleAnswer(${i})">
      <span class="option-letter">${letters[i]}</span>
      <span>${opt}</span>
    </button>`;
  });
  html += `</div>`;

  html += `<div id="explanation-area"></div>`;
  html += `</div>`; // question-card
  html += `</div>`; // exercise-container

  area.innerHTML = html;

  if (state.answered && state.selectedOption !== null) {
    const isCorrect = state.selectedOption === ex.correct;
    showExplanationAndOptions(state.selectedOption, isCorrect);
  }
}

function handleAnswer(selectedIndex) {
  if (state.answered) return;
  state.answered = true;
  state.selectedOption = selectedIndex;

  const ex = state.shuffledExercises[state.exerciseIndex];
  const isCorrect = selectedIndex === ex.correct;

  // Track answered exercises for milestone progression
  const realIdx = state.exerciseIndices[state.exerciseIndex];
  if (realIdx !== undefined) {
    if (!state.answeredExercises[state.currentTopic]) {
      state.answeredExercises[state.currentTopic] = {};
    }
    state.answeredExercises[state.currentTopic][realIdx] = {
      answered: true,
      correct: isCorrect
    };
  }

  // Update score
  if (isCorrect) {
    state.score.correct++;
    playCorrectSound();
    flashFeedback('correct');
  } else {
    state.score.incorrect++;
    playIncorrectSound();
    flashFeedback('incorrect');
  }

  evaluateAndAwardStars(state.currentTopic);
  showExplanationAndOptions(selectedIndex, isCorrect);
  saveActiveState();
}

function nextExercise() {
  state.exerciseIndex++;
  state.answered = false;
  state.selectedOption = null;
  state.voiceTranscript = '';
  state.voiceListening = false;
  if (typeof window !== 'undefined' && window.VoiceIO) {
    VoiceIO.stopSpeaking();
    VoiceIO.stopListening();
  }
  saveActiveState();
  if (state.exerciseIndex >= state.shuffledExercises.length) {
    finishExercises();
  } else {
    renderExercise();
    if (state.voiceMode) {
      setTimeout(() => {
        speakCurrentQuestion();
      }, 350);
    }
  }
}

// ============================================
// VOICE Q&A INTEGRATION (VOICE I/O & GRADING)
// ============================================

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toggleVoiceMode() {
  state.voiceMode = !state.voiceMode;
  state.voiceTranscript = '';
  state.voiceListening = false;
  if (typeof window !== 'undefined' && window.VoiceIO) {
    VoiceIO.stopSpeaking();
    VoiceIO.stopListening();
  }
  saveActiveState();
  renderExercise();
  if (state.voiceMode && !state.answered) {
    setTimeout(() => {
      speakCurrentQuestion();
    }, 350);
  }
}

function speakCurrentQuestion() {
  const ex = state.shuffledExercises[state.exerciseIndex];
  if (!ex || typeof window === 'undefined' || !window.VoiceIO) return;
  const spokenPrompt = ex.question.replace(/_{2,}/g, 'blank').replace(/<[^>]+>/g, '');
  VoiceIO.speak(spokenPrompt, 'en-IN');
}

function onTranscriptInput(val) {
  state.voiceTranscript = val;
}

function tryAgainVoiceAnswer() {
  state.voiceTranscript = '';
  const inputEl = document.getElementById('voice-transcript-input');
  if (inputEl) inputEl.value = '';
  startVoiceAnswer();
}

function startVoiceAnswer() {
  if (state.answered) return;
  if (typeof window === 'undefined' || !window.VoiceIO || !VoiceIO.isSupported()) {
    return;
  }

  const micBtn = document.getElementById('voice-mic-btn');
  const statusEl = document.getElementById('voice-status-label');
  const inputEl = document.getElementById('voice-transcript-input');

  if (state.voiceListening) {
    VoiceIO.stopListening();
    state.voiceListening = false;
    if (micBtn) micBtn.classList.remove('listening');
    if (statusEl) {
      statusEl.textContent = 'Stopped. Tap Check Answer or speak again.';
      statusEl.classList.remove('listening');
    }
    return;
  }

  state.voiceListening = true;
  if (micBtn) micBtn.classList.add('listening');
  if (statusEl) {
    statusEl.textContent = '🔴 Listening... Speak clearly now';
    statusEl.classList.add('listening');
  }

  VoiceIO.listen({
    lang: 'en-IN',
    maxMs: 8000,
    onInterim: (interim) => {
      if (inputEl) inputEl.value = interim;
      state.voiceTranscript = interim;
    }
  }).then(result => {
    state.voiceListening = false;
    if (micBtn) micBtn.classList.remove('listening');
    if (statusEl) statusEl.classList.remove('listening');

    if (result.transcript) {
      state.voiceTranscript = result.transcript.trim();
      if (inputEl) inputEl.value = state.voiceTranscript;
      if (statusEl) statusEl.textContent = 'Answer heard! Checking...';
      checkVoiceAnswer();
    } else if (result.error === 'not-allowed') {
      if (statusEl) {
        statusEl.textContent = '⚠️ Microphone permission denied. Please allow microphone access.';
        statusEl.style.color = '#ef4444';
      }
    } else {
      if (statusEl) {
        statusEl.textContent = "I didn't catch that. Tap mic to try again!";
        statusEl.style.color = '#fde047';
      }
    }
  });
}

async function checkVoiceAnswer() {
  if (state.answered) return;

  const inputEl = document.getElementById('voice-transcript-input');
  const transcript = inputEl ? inputEl.value.trim() : state.voiceTranscript.trim();

  if (!transcript) {
    const statusEl = document.getElementById('voice-status-label');
    if (statusEl) {
      statusEl.textContent = "I didn't catch that. Please speak or type your answer!";
      statusEl.style.color = '#fde047';
    }
    if (typeof window !== 'undefined' && window.VoiceIO) {
      VoiceIO.speak("I didn't catch that, please try speaking again!");
    }
    return;
  }

  const ex = state.shuffledExercises[state.exerciseIndex];
  const letters = ['a', 'b', 'c', 'd'];
  const correctOpt = ex.options[ex.correct] || '';
  const correctLetter = letters[ex.correct] || '';

  const accepted = [
    correctOpt,
    correctLetter,
    `option ${correctLetter}`,
    `choice ${correctLetter}`,
    `letter ${correctLetter}`
  ];
  if (correctOpt.includes(',')) {
    accepted.push(correctOpt.replace(/,/g, ' and '));
    accepted.push(correctOpt.replace(/,/g, ' '));
  }

  let isCorrect = false;
  let feedbackText = '';
  let correctionText = '';

  // 1. Rule-based evaluation (Pure Grader)
  const gradeResult = (typeof window !== 'undefined' && window.VoiceGrader) ? VoiceGrader.gradeClosed({
    transcript: transcript,
    accepted: accepted,
    lang: 'en-IN'
  }) : { correct: false, score: 0 };

  isCorrect = gradeResult.correct;

  // 2. Pluggable LLM fallback hook for open-ended or ambiguous questions
  if (!isCorrect && typeof window !== 'undefined' && window.LLMProviders && LLMProviders.getActiveProvider() !== 'off') {
    try {
      const llmRes = await LLMProviders.grade({
        question: ex.question,
        expected: correctOpt,
        transcript: transcript,
        rubric: ex.explanation,
        lang: 'en-IN',
        studentClass: 'Class 5'
      });
      if (llmRes && llmRes.correct !== undefined) {
        isCorrect = llmRes.correct;
        feedbackText = llmRes.feedback || '';
        correctionText = llmRes.correction || '';
      }
    } catch (e) {
      // Fallback silently to rule-based result
    }
  }

  state.voiceTranscript = transcript;
  const chosenIndex = isCorrect ? ex.correct : (ex.correct === 0 ? 1 : 0);
  handleAnswer(chosenIndex);

  // Spoken feedback
  if (typeof window !== 'undefined' && window.VoiceIO) {
    if (isCorrect) {
      const praise = feedbackText || "Superb! That is correct.";
      VoiceIO.speak(praise);
    } else {
      const spokenCorrection = correctionText || `Not quite! The correct answer is: ${correctOpt}.`;
      VoiceIO.speak(spokenCorrection);
    }
  }
}

/**
 * Per-Subject Hook Contract: getVoiceQuestions
 */
function getVoiceQuestions() {
  const topic = TOPIC_DATA[state.currentTopic];
  if (!topic || !Array.isArray(topic.exercises)) return [];

  return topic.exercises.map((ex, idx) => {
    const letters = ['a', 'b', 'c', 'd'];
    const correctLetter = letters[ex.correct] || '';
    const correctOpt = ex.options[ex.correct] || '';

    const accepted = [
      correctOpt,
      correctLetter,
      `option ${correctLetter}`,
      `choice ${correctLetter}`,
      `letter ${correctLetter}`
    ];
    if (correctOpt.includes(',')) {
      accepted.push(correctOpt.replace(/,/g, ' and '));
      accepted.push(correctOpt.replace(/,/g, ' '));
    }

    return {
      id: `${state.currentTopic}_ex_${idx}`,
      prompt: ex.question,
      spokenPrompt: ex.question.replace(/_{2,}/g, 'blank').replace(/<[^>]+>/g, ''),
      accepted: accepted,
      explanation: ex.explanation,
      lang: 'en-IN',
      type: 'closed',
      exerciseIndex: idx
    };
  });
}

/**
 * Per-Subject Hook Contract: onVoiceResult
 */
function onVoiceResult({ id, correct, transcript, feedback }) {
  const ex = state.shuffledExercises[state.exerciseIndex];
  if (!ex) return;
  const chosenIndex = correct ? ex.correct : (ex.correct === 0 ? 1 : 0);
  handleAnswer(chosenIndex);
}

// Expose hooks to global window
if (typeof window !== 'undefined') {
  window.getVoiceQuestions = getVoiceQuestions;
  window.onVoiceResult = onVoiceResult;
}

// ============================================
// TIMER
// ============================================

function startTimer() {
  clearTimer();
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    const display = document.getElementById('timer-display');
    if (display) {
      display.textContent = '⏱️ ' + formatTime(state.timeLeft);
      display.className = 'exercise-timer' +
        (state.timeLeft <= 10 ? ' danger' : state.timeLeft <= 30 ? ' warning' : '');
    }
    if (state.timeLeft <= 0) {
      clearTimer();
      finishExercises();
    }
  }, 1000);
}

function clearTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}

// ============================================
// FINISH & RESULTS
// ============================================

function finishExercises() {
  clearTimer();

  try {
    const active = loadActiveState() || {};
    delete active.practiceSession;
    localStorage.setItem(ACTIVE_STATE_KEY, JSON.stringify(active));
  } catch (e) {}

  const correct = state.score.correct;
  const total = state.shuffledExercises.length;

  if (state.currentMode === 'challenge') {
    if (!state.topicProgress[state.currentTopic]) {
      state.topicProgress[state.currentTopic] = { sectionsRead: {}, trapsDiagnosed: {}, challengeHighScore: 0 };
    }
    const currentHigh = state.topicProgress[state.currentTopic].challengeHighScore || 0;
    state.topicProgress[state.currentTopic].challengeHighScore = Math.max(currentHigh, correct);
  }

  const currentStars = evaluateAndAwardStars(state.currentTopic);
  renderSidebar();
  updateTopBarPassportButton();

  // Update modal
  const pct = total > 0 ? Math.round(correct / total * 100) : 0;
  let emoji = '🏆', title = 'Great Job!', msg = '';

  if (currentStars >= 10) {
    emoji = '🌟';
    title = '10/10 TOPIC CERTIFIED! 🎉';
    msg = 'Incredible — you have mastered every single pedagogical milestone!';
    launchConfetti();
  } else if (currentStars >= 7) {
    emoji = '🎯';
    title = 'Well Done!';
    msg = `You have earned ${currentStars}/10 Mastery Stars! Check your Learning Passport for remaining goals.`;
  } else if (currentStars >= 4) {
    emoji = '💪';
    title = 'Good Progress!';
    msg = `${currentStars}/10 Mastery Stars unlocked. Check your Learning Passport to unlock the rest!`;
  } else {
    emoji = '📖';
    title = 'Keep Learning!';
    msg = `${currentStars}/10 Stars earned so far. Review lessons and diagnose traps to unlock more stars!`;
  }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-stars').textContent = `⭐ ${currentStars} / 10 Mastery Stars Earned`;
  document.getElementById('result-message').textContent = msg;
  document.getElementById('result-correct').textContent = correct;
  document.getElementById('result-total').textContent = total;

  document.getElementById('results-modal').classList.add('visible');
}

function closeModal() {
  document.getElementById('results-modal').classList.remove('visible');
}

// ============================================
// MOBILE NAVIGATION DRAWER
// ============================================

function openSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.add('open');
  if (backdrop) backdrop.classList.add('active');
  if (window.innerWidth <= 860) {
    document.body.style.overflow = 'hidden';
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar && sidebar.classList.contains('open')) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

// ============================================
// INIT
// ============================================

function init() {
  loadProgress();
  loadActiveState();

  // Wire up passport button in top bar
  const passportBtn = document.getElementById('btn-passport');
  if (passportBtn) {
    passportBtn.addEventListener('click', () => {
      openLearningPassport(state.currentTopic || 'articles');
    });
  }

  // Wire up passport button in results modal
  const modalPassportBtn = document.getElementById('btn-modal-passport');
  if (modalPassportBtn) {
    modalPassportBtn.addEventListener('click', () => {
      closeModal();
      openLearningPassport(state.currentTopic || 'articles');
    });
  }

  // Silently evaluate stars for all topics on startup to sync existing progress
  Object.keys(TOPIC_DATA).forEach(id => {
    evaluateAndAwardStars(id, true);
  });

  renderSidebar();
  updateTopBarPassportButton();

  const active = loadActiveState();
  if (active && active.currentTopic && TOPIC_DATA[active.currentTopic]) {
    selectTopic(active.currentTopic, active.currentMode || 'learn', true);
  } else {
    showWelcome();
  }

  // Mobile Drawer Toggle & Close
  const menuBtn = document.getElementById('menu-toggle-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', toggleSidebar);
  }

  const closeBtn = document.getElementById('sidebar-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }

  const backdrop = document.getElementById('sidebar-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeSidebar);
  }

  // Welcome Screen Start Button
  const startBtn = document.getElementById('welcome-start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (window.innerWidth <= 860) {
        openSidebar();
      } else {
        selectTopic('articles');
      }
    });
  }

  // Mode tabs
  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (state.currentTopic) setMode(tab.dataset.mode);
    });
  });

  // Reset button
  const rb = document.getElementById('btn-reset');
  if (rb) rb.addEventListener('click', () => {
    if (state.currentTopic) {
      state.score = { correct: 0, incorrect: 0, total: 0 };
      clearTimer();
      setMode('learn');
    }
  });

  // Modal buttons
  document.getElementById('btn-retry').addEventListener('click', () => {
    closeModal();
    setMode(state.currentMode);
  });
  document.getElementById('btn-review').addEventListener('click', () => {
    closeModal();
    setMode('learn');
  });
  document.getElementById('btn-close-modal').addEventListener('click', closeModal);

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSidebar();
      closeModal();
      const passportModal = document.getElementById('passport-modal');
      if (passportModal) passportModal.classList.remove('visible');
    }
  });
}

document.addEventListener('DOMContentLoaded', init);

