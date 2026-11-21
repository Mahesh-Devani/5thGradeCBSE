/* ============================================
   Hindi Vyakaran & Rachna — Class 5 CBSE
   Interactive Conceptual & Diagnostic Engine
   ============================================ */

// --- Shared Core Audio & Confetti Adapters ---
const synth = {
  tap: () => (window.AppAudio ? window.AppAudio.click() : null),
  success: () => (window.AppAudio ? window.AppAudio.correct() : null),
  error: () => (window.AppAudio ? window.AppAudio.wrong() : null),
  fanfare: () => (window.AppAudio ? window.AppAudio.fanfare() : null)
};

class ConfettiEngine {
  constructor(canvasId) {
    this.canvasId = canvasId;
  }
  burst(count = 60) {
    if (window.AppConfetti) {
      window.AppConfetti.launch();
    } else if (typeof launchConfetti === 'function') {
      launchConfetti();
    }
  }
}

// --- APP CONTROLLER CLASS ---
class HindiLearningApp {
  constructor() {
    this.confetti = new ConfettiEngine('confetti-canvas');
    this.state = {
      activeModule: 'vakyansh', // 'vakyansh' (Default) | 'chitra'
      currentSceneId: 'park',
      imageViewMode: 'real', // 'real' (Default Exam Photo) | 'cartoon'
      isBWMode: false, // Default is Color picture (User can toggle B&W print)
      chitraMode: 'explore', // 'explore' | 'vocab' | 'puzzle' | 'write'
      vakyanshMode: 'learn', // 'learn' | 'match' | 'quiz' | 'challenge'
      showEnglish: true,
      activeHotspotId: null,
      vocabFilter: 'all',
      vakyanshFilter: 'all',
      stars: this.loadStars(),
      vakyanshStars: this.loadVakyanshStars(),
      sangyaStars: this.loadSangyaStars(),
      sangyaMode: 'learn', // 'learn' | 'sort' | 'quiz' | 'challenge'
      sangyaSubtab: 'types', // 'types' | 'mirror' | 'lab'
      sangyaLabFilter: 'all', // 'all' | 'jati' | 'visheshan' | 'kriya'
      sangyaSortState: {
        items: [],
        currentIndex: 0,
        score: 0,
        streak: 0,
        answered: false
      },
      sangyaQuizState: {
        qIndex: 0,
        score: { correct: 0, wrong: 0 },
        answered: false,
        selectedOption: null
      },
      sangyaChallengeState: {
        timer: 60,
        timerInterval: null,
        qIndex: 0,
        score: 0,
        streak: 0,
        answered: false
      },
      puzzleProgress: {
        stepIdx: 0,
        selectedWords: [],
        isCompleted: false
      },
      matchState: {
        cards: [],
        firstCard: null,
        matchedPairIds: [],
        moves: 0
      },
      quizState: {
        qIndex: 0,
        score: { correct: 0, wrong: 0 },
        answered: false,
        selectedOption: null
      },
      challengeState: {
        timer: 60,
        timerInterval: null,
        qIndex: 0,
        score: 0,
        answered: false
      },
      chitraDrafts: {},
      moduleProgress: {
        sangya: {},
        vakyansh: {},
        chitra: {}
      }
    };

    window.chitraApp = this;
    window.app = this;

    this.initElements();
    this.loadAppState();
    this.bindEvents();
    ['sangya', 'vakyansh', 'chitra_park', 'chitra_rain', 'chitra_sports', 'chitra_birthday', 'chitra_village', 'chitra_zoo'].forEach(unitKey => {
      this.evaluateAndAwardStars(unitKey, true);
    });
    this.updateCurriculumNavUI();
    this.renderSidebarTopics();
    this.updateProgressUI();
    this.updateTopBarPassportButton();
    this.updateTranslateButtonUI();
    if (this.state.isBWMode) {
      if (this.pictureIllustrationWrapper) this.pictureIllustrationWrapper.classList.add('bw-exam-mode');
      if (this.btnToggleBw) this.btnToggleBw.classList.add('active');
      if (this.bwToggleLabel) this.bwToggleLabel.textContent = 'B&W प्रिंट (ON)';
    }
    if (this.state.imageViewMode === 'cartoon') {
      if (this.btnViewReal) this.btnViewReal.classList.remove('active');
      if (this.btnViewCartoon) this.btnViewCartoon.classList.add('active');
    }
    this.switchModule(this.state.activeModule, false);
  }

  loadAppState() {
    try {
      const saved = localStorage.getItem('cbse5_hindi_active_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (['vakyansh', 'sangya', 'chitra'].includes(parsed.activeModule)) {
          this.state.activeModule = parsed.activeModule;
        }
        if (parsed.currentSceneId && SCENE_DATA.some(s => s.id === parsed.currentSceneId)) {
          this.state.currentSceneId = parsed.currentSceneId;
        }
        if (['explore', 'vocab', 'puzzle', 'write'].includes(parsed.chitraMode)) {
          this.state.chitraMode = parsed.chitraMode;
        }
        if (['learn', 'match', 'quiz', 'challenge'].includes(parsed.vakyanshMode)) {
          this.state.vakyanshMode = parsed.vakyanshMode;
        }
        if (['learn', 'sort', 'quiz', 'challenge'].includes(parsed.sangyaMode)) {
          this.state.sangyaMode = parsed.sangyaMode;
        }
        if (['types', 'mirror', 'lab'].includes(parsed.sangyaSubtab)) {
          this.state.sangyaSubtab = parsed.sangyaSubtab;
        }
        if (['all', 'jati', 'visheshan', 'kriya'].includes(parsed.sangyaLabFilter)) {
          this.state.sangyaLabFilter = parsed.sangyaLabFilter;
        }
        if (['all', 'behavior', 'action', 'nature'].includes(parsed.vakyanshFilter)) {
          this.state.vakyanshFilter = parsed.vakyanshFilter;
        }
        if (typeof parsed.showEnglish === 'boolean') {
          this.state.showEnglish = parsed.showEnglish;
        }
        if (['real', 'cartoon'].includes(parsed.imageViewMode)) {
          this.state.imageViewMode = parsed.imageViewMode;
        }
        if (typeof parsed.isBWMode === 'boolean') {
          this.state.isBWMode = parsed.isBWMode;
        }
        if (parsed.vakyanshQuizSession && typeof parsed.vakyanshQuizSession === 'object') {
          this.state.quizState = {
            qIndex: parsed.vakyanshQuizSession.qIndex || 0,
            score: parsed.vakyanshQuizSession.score || { correct: 0, wrong: 0 },
            answered: !!parsed.vakyanshQuizSession.answered,
            selectedOption: parsed.vakyanshQuizSession.selectedOption !== undefined ? parsed.vakyanshQuizSession.selectedOption : null
          };
        }
        if (parsed.sangyaQuizSession && typeof parsed.sangyaQuizSession === 'object') {
          this.state.sangyaQuizState = {
            qIndex: parsed.sangyaQuizSession.qIndex || 0,
            score: parsed.sangyaQuizSession.score || { correct: 0, wrong: 0 },
            answered: !!parsed.sangyaQuizSession.answered,
            selectedOption: parsed.sangyaQuizSession.selectedOption !== undefined ? parsed.sangyaQuizSession.selectedOption : null
          };
        }
        if (parsed.chitraDrafts && typeof parsed.chitraDrafts === 'object') {
          this.state.chitraDrafts = parsed.chitraDrafts;
        }
      }

      const savedProg = localStorage.getItem('cbse5_hindi_module_progress');
      if (savedProg) {
        const parsedProg = JSON.parse(savedProg);
        if (parsedProg && typeof parsedProg === 'object') {
          this.state.moduleProgress = {
            sangya: parsedProg.sangya || {},
            vakyansh: parsedProg.vakyansh || {},
            chitra: parsedProg.chitra || {}
          };
        }
      }
    } catch (e) {
      console.warn('Failed to load active state:', e);
    }
  }

  saveAppState() {
    try {
      const toSave = {
        activeModule: this.state.activeModule,
        currentSceneId: this.state.currentSceneId,
        chitraMode: this.state.chitraMode,
        vakyanshMode: this.state.vakyanshMode,
        sangyaMode: this.state.sangyaMode,
        sangyaSubtab: this.state.sangyaSubtab,
        sangyaLabFilter: this.state.sangyaLabFilter,
        vakyanshFilter: this.state.vakyanshFilter,
        showEnglish: this.state.showEnglish,
        imageViewMode: this.state.imageViewMode,
        isBWMode: this.state.isBWMode,
        chitraDrafts: this.state.chitraDrafts || {}
      };
      if (this.state.quizState && (this.state.quizState.qIndex > 0 || this.state.quizState.score.correct > 0 || this.state.quizState.score.wrong > 0 || this.state.quizState.answered)) {
        toSave.vakyanshQuizSession = {
          qIndex: this.state.quizState.qIndex,
          score: this.state.quizState.score,
          answered: this.state.quizState.answered,
          selectedOption: this.state.quizState.selectedOption !== undefined ? this.state.quizState.selectedOption : null
        };
      }
      if (this.state.sangyaQuizState && (this.state.sangyaQuizState.qIndex > 0 || this.state.sangyaQuizState.score.correct > 0 || this.state.sangyaQuizState.score.wrong > 0 || this.state.sangyaQuizState.answered)) {
        toSave.sangyaQuizSession = {
          qIndex: this.state.sangyaQuizState.qIndex,
          score: this.state.sangyaQuizState.score,
          answered: this.state.sangyaQuizState.answered,
          selectedOption: this.state.sangyaQuizState.selectedOption !== undefined ? this.state.sangyaQuizState.selectedOption : null
        };
      }
      localStorage.setItem('cbse5_hindi_active_state', JSON.stringify(toSave));
      localStorage.setItem('cbse5_hindi_module_progress', JSON.stringify(this.state.moduleProgress || {}));
    } catch (e) {
      console.warn('Failed to save active state:', e);
    }
  }

  loadStars() {
    try {
      const saved = localStorage.getItem('cbse5_chitra_varnan_stars');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  saveStars() {
    try {
      localStorage.setItem('cbse5_chitra_varnan_stars', JSON.stringify(this.state.stars));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  loadVakyanshStars() {
    try {
      const saved = localStorage.getItem('cbse5_hindi_vakyansh_stars');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  }

  saveVakyanshStars(stars) {
    this.state.vakyanshStars = Math.min(10, Math.max(this.state.vakyanshStars, stars));
    try {
      localStorage.setItem('cbse5_hindi_vakyansh_stars', String(this.state.vakyanshStars));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  loadSangyaStars() {
    try {
      const saved = localStorage.getItem('cbse5_hindi_sangya_stars');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  }

  saveSangyaStars(stars) {
    this.state.sangyaStars = Math.min(10, Math.max(this.state.sangyaStars, stars));
    try {
      localStorage.setItem('cbse5_hindi_sangya_stars', String(this.state.sangyaStars));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  // ============================================
  // 10-STAR MASTERY & LEARNING PASSPORT HELPERS
  // ============================================
  getActiveUnitKey() {
    if (this.state.activeModule === 'sangya') return 'sangya';
    if (this.state.activeModule === 'vakyansh') return 'vakyansh';
    if (this.state.activeModule === 'chitra') return 'chitra_' + (this.state.currentSceneId || 'park');
    return 'vakyansh';
  }

  getModuleStars(unitKey) {
    if (unitKey === 'sangya') return this.state.sangyaStars || 0;
    if (unitKey === 'vakyansh') return this.state.vakyanshStars || 0;
    if (unitKey && unitKey.startsWith('chitra_')) {
      const sceneId = unitKey.replace('chitra_', '');
      return this.state.stars[sceneId] || 0;
    }
    return 0;
  }

  setModuleStars(unitKey, stars) {
    const capped = Math.max(0, Math.min(10, stars));
    if (unitKey === 'sangya') {
      this.state.sangyaStars = capped;
      this.saveSangyaStars(capped);
    } else if (unitKey === 'vakyansh') {
      this.state.vakyanshStars = capped;
      this.saveVakyanshStars(capped);
    } else if (unitKey && unitKey.startsWith('chitra_')) {
      const sceneId = unitKey.replace('chitra_', '');
      this.state.stars[sceneId] = capped;
      this.saveStars();
    }
  }

  getModuleProgressData(unitKey) {
    if (!this.state.moduleProgress) {
      this.state.moduleProgress = { sangya: {}, vakyansh: {}, chitra: {} };
    }
    if (unitKey === 'sangya') {
      if (!this.state.moduleProgress.sangya) this.state.moduleProgress.sangya = {};
      return this.state.moduleProgress.sangya;
    }
    if (unitKey === 'vakyansh') {
      if (!this.state.moduleProgress.vakyansh) this.state.moduleProgress.vakyansh = {};
      return this.state.moduleProgress.vakyansh;
    }
    if (unitKey && unitKey.startsWith('chitra_')) {
      const sceneId = unitKey.replace('chitra_', '');
      if (!this.state.moduleProgress.chitra) this.state.moduleProgress.chitra = {};
      if (!this.state.moduleProgress.chitra[sceneId]) this.state.moduleProgress.chitra[sceneId] = {};
      return this.state.moduleProgress.chitra[sceneId];
    }
    return {};
  }

  evaluateAndAwardStars(unitKey, silent = false) {
    const milestones = HINDI_MILESTONES[unitKey];
    if (!milestones) return 0;

    const data = this.getModuleProgressData(unitKey);
    let earnedCount = 0;
    milestones.forEach(m => {
      try {
        if (m.check(data)) earnedCount++;
      } catch (e) {
        // ignore check errors
      }
    });

    const previousStars = this.getModuleStars(unitKey);
    if (earnedCount > previousStars) {
      this.setModuleStars(unitKey, earnedCount);
      if (!silent) {
        synth.success();
        this.confetti.burst(35);
        this.flash(`⭐ नया सितारा अर्जित! (${earnedCount}/10)`, 'success');
      }
    }

    this.updateProgressUI();
    this.updateTopBarPassportButton();
    if (unitKey.startsWith('chitra_')) {
      const container = document.getElementById('chitra-mastery-banner-container');
      if (container) container.innerHTML = this.renderTopicMasteryBanner(unitKey);
    }
    this.saveAppState();
    return earnedCount;
  }

  updateTopBarPassportButton() {
    const btn = document.getElementById('btn-passport');
    if (!btn) return;
    const unitKey = this.getActiveUnitKey();
    const stars = this.getModuleStars(unitKey);
    const label = btn.querySelector('.passport-btn-label');
    if (label) {
      label.innerHTML = `⭐ ${stars}/10 पासपोर्ट`;
    } else {
      btn.innerHTML = `📋 ⭐ ${stars}/10 पासपोर्ट`;
    }
  }

  renderTopicMasteryBanner(unitKey) {
    const stars = this.getModuleStars(unitKey);
    const pct = Math.round((stars / 10) * 100);
    let title = '';
    if (unitKey === 'sangya') title = 'संज्ञा व पाँच भेद';
    else if (unitKey === 'vakyansh') title = 'वाक्यांश के लिए एक शब्द';
    else if (unitKey && unitKey.startsWith('chitra_')) {
      const sceneId = unitKey.replace('chitra_', '');
      const sc = SCENE_DATA.find(s => s.id === sceneId);
      title = `चित्र वर्णन: ${sc ? sc.title : sceneId}`;
    }

    return `
      <div class="topic-mastery-banner">
        <div class="mastery-banner-left">
          <span class="mastery-star-pill">⭐ ${stars} / 10 सितारे</span>
          <span class="mastery-banner-title">${title}</span>
        </div>
        <div class="mastery-banner-center">
          <div class="mastery-bar-track">
            <div class="mastery-bar-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
        <div class="mastery-banner-right">
          <span class="mastery-pct-label">${pct}%</span>
          <button class="btn-passport-trigger" onclick="window.chitraApp.openLearningPassport('${unitKey}')">📋 पासपोर्ट खोलें</button>
        </div>
      </div>
    `;
  }

  openLearningPassport(unitKey = null) {
    synth.tap();
    if (!unitKey) unitKey = this.getActiveUnitKey();
    const modal = document.getElementById('passport-modal');
    if (!modal) return;

    const milestones = HINDI_MILESTONES[unitKey];
    if (!milestones) return;

    const data = this.getModuleProgressData(unitKey);
    const earnedStars = this.getModuleStars(unitKey);
    const pct = Math.round((earnedStars / 10) * 100);

    let icon = '📖';
    let title = '';
    let subtitle = '';
    if (unitKey === 'sangya') {
      icon = '🏷️';
      title = 'लर्निंग पासपोर्ट: संज्ञा व पाँच भेद';
      subtitle = 'Nouns & 5 Types — 10-Star Pedagogical Mastery Progression';
    } else if (unitKey === 'vakyansh') {
      icon = '📜';
      title = 'लर्निंग पासपोर्ट: वाक्यांश के लिए एक शब्द';
      subtitle = 'One Word Substitutions — 10-Star Pedagogical Mastery Progression';
    } else if (unitKey.startsWith('chitra_')) {
      icon = '🎨';
      const sceneId = unitKey.replace('chitra_', '');
      const sc = SCENE_DATA.find(s => s.id === sceneId);
      title = `लर्निंग पासपोर्ट: चित्र वर्णन (${sc ? sc.title : sceneId})`;
      subtitle = 'Picture Composition — 10-Star Step-by-Step Pedagogical Mastery';
    }

    const iconEl = document.getElementById('passport-icon');
    const titleEl = document.getElementById('passport-title');
    const subtitleEl = document.getElementById('passport-subtitle');
    const starsEl = document.getElementById('passport-stars-display');
    const fillEl = document.getElementById('passport-progress-fill');
    const statusEl = document.getElementById('passport-status-text');

    if (iconEl) iconEl.textContent = icon;
    if (titleEl) titleEl.textContent = title;
    if (subtitleEl) subtitleEl.textContent = subtitle;
    if (starsEl) starsEl.textContent = `⭐ ${earnedStars} / 10`;
    if (fillEl) fillEl.style.width = `${pct}%`;

    let statusText = `${pct}% पूर्ण — `;
    if (earnedStars === 10) statusText += '🏆 पूर्ण निपुणता (100% CBSE Exam Ready!)';
    else if (earnedStars >= 7) statusText += '🌟 उन्नत स्तर (Advanced Stage)';
    else if (earnedStars >= 4) statusText += '⚡ विकासशील स्तर (Developing Stage)';
    else statusText += '🌱 प्रारंभिक स्तर (Beginner Stage)';
    if (statusEl) statusEl.textContent = statusText;

    // Render milestones list
    const listEl = document.getElementById('passport-milestones-list');
    if (listEl) {
      listEl.innerHTML = milestones.map((m, idx) => {
        let isCleared = false;
        try {
          isCleared = !!m.check(data);
        } catch (e) {
          isCleared = false;
        }
        const starNum = idx + 1;
        return `
          <div class="milestone-card ${isCleared ? 'cleared' : 'pending'}">
            <div class="milestone-left">
              <div class="milestone-star-num">#${starNum}</div>
              <div class="milestone-status-icon">${isCleared ? '⭐' : '☆'}</div>
            </div>
            <div class="milestone-center">
              <div class="milestone-title">${m.title}</div>
              <div class="milestone-desc">${m.desc}</div>
              ${!isCleared ? `<div class="milestone-hint">💡 कैसे अनलॉक करें: ${m.hint}</div>` : ''}
            </div>
            <div class="milestone-right">
              <span class="milestone-badge ${isCleared ? 'badge-cleared' : 'badge-pending'}">
                ${isCleared ? 'पूर्ण ✓' : 'बाकी'}
              </span>
            </div>
          </div>
        `;
      }).join('');
    }

    // Parent guarantee certificate box if 10/10
    const guaranteeBox = document.getElementById('passport-guarantee-box');
    if (guaranteeBox) {
      guaranteeBox.style.display = earnedStars >= 10 ? 'block' : 'none';
    }

    // Next star action
    const actionBtn = document.getElementById('btn-passport-action');
    if (actionBtn) {
      if (earnedStars >= 10) {
        actionBtn.textContent = '🎉 सभी 10 सितारे प्राप्त!';
        actionBtn.onclick = () => {
          synth.fanfare();
          this.confetti.burst(60);
          modal.classList.remove('open');
        };
      } else {
        actionBtn.textContent = 'अगला सितारा अनलॉक करें →';
        actionBtn.onclick = () => {
          modal.classList.remove('open');
          this.guideToNextMilestone(unitKey);
        };
      }
    }

    modal.classList.add('open');
  }

  guideToNextMilestone(unitKey) {
    const milestones = HINDI_MILESTONES[unitKey];
    if (!milestones) return;
    const data = this.getModuleProgressData(unitKey);
    const nextIdx = milestones.findIndex(m => {
      try { return !m.check(data); } catch (e) { return true; }
    });
    if (nextIdx === -1) return;

    if (unitKey === 'sangya') {
      this.switchModule('sangya');
      if (nextIdx === 0 || nextIdx === 1) {
        this.state.sangyaMode = 'learn';
        this.state.sangyaSubtab = 'types';
      } else if (nextIdx === 2) {
        this.state.sangyaMode = 'learn';
        this.state.sangyaSubtab = 'mirror';
      } else if (nextIdx === 3) {
        this.state.sangyaMode = 'learn';
        this.state.sangyaSubtab = 'lab';
      } else if (nextIdx === 4) {
        this.state.sangyaMode = 'learn';
      } else if (nextIdx === 5 || nextIdx === 6) {
        this.state.sangyaMode = 'sort';
      } else if (nextIdx === 7 || nextIdx === 8) {
        this.state.sangyaMode = 'quiz';
      } else if (nextIdx === 9) {
        this.state.sangyaMode = 'challenge';
      }
      this.updateModeTabsUI();
      this.renderSangyaWorkspace();
    } else if (unitKey === 'vakyansh') {
      this.switchModule('vakyansh');
      if (nextIdx < 5) {
        this.state.vakyanshMode = 'learn';
      } else if (nextIdx === 5 || nextIdx === 6) {
        this.state.vakyanshMode = 'match';
      } else if (nextIdx === 7 || nextIdx === 8) {
        this.state.vakyanshMode = 'quiz';
      } else if (nextIdx === 9) {
        this.state.vakyanshMode = 'challenge';
      }
      this.updateModeTabsUI();
      this.renderVakyanshWorkspace();
    } else if (unitKey.startsWith('chitra_')) {
      const sceneId = unitKey.replace('chitra_', '');
      this.switchModule('chitra');
      if (this.state.currentSceneId !== sceneId) {
        this.loadScene(sceneId);
      }
      if (nextIdx < 4) {
        this.state.chitraMode = 'explore';
      } else if (nextIdx === 4) {
        this.state.chitraMode = 'vocab';
      } else if (nextIdx >= 5 && nextIdx <= 7) {
        this.state.chitraMode = 'puzzle';
      } else {
        this.state.chitraMode = 'write';
      }
      this.updateModeTabsUI();
      this.renderCurrentMode();
    }
  }

  diagnoseExamTrap(moduleKey, trapIdx, selectedOption) {
    const trap = HINDI_EXAM_TRAPS[moduleKey] && HINDI_EXAM_TRAPS[moduleKey][trapIdx];
    if (!trap) return;

    if (selectedOption === trap.correct) {
      synth.success();
      this.confetti.burst(25);
      const d = this.getModuleProgressData(moduleKey);
      if (!d.trapsDiagnosed) d.trapsDiagnosed = {};
      d.trapsDiagnosed[trapIdx] = true;
      d.trapsDiagnosedCount = Object.keys(d.trapsDiagnosed).length;
      this.evaluateAndAwardStars(moduleKey);
      this.flash('🎉 सही निदान! आपने परीक्षा जाल को सफलता से समझ लिया!', 'success');
      if (moduleKey === 'sangya') {
        this.renderSangyaLearnMode();
      } else if (moduleKey === 'vakyansh') {
        this.renderVakyanshLearnMode();
      }
    } else {
      synth.error();
      this.flash('❌ यह विकल्प गलत है! व्याख्या को ध्यान से पढ़ें और पुनः प्रयास करें।', 'error');
    }
  }

  toggleSangyaTypeRead(typeIdx) {
    synth.tap();
    const d = this.getModuleProgressData('sangya');
    if (!d.typesRead) d.typesRead = {};
    d.typesRead[typeIdx] = !d.typesRead[typeIdx];
    this.evaluateAndAwardStars('sangya');
    this.renderSangyaLearnMode();
  }

  toggleVakyanshCardRead(cardIdx) {
    synth.tap();
    const d = this.getModuleProgressData('vakyansh');
    if (!d.cardsRead) d.cardsRead = {};
    d.cardsRead[cardIdx] = !d.cardsRead[cardIdx];
    this.evaluateAndAwardStars('vakyansh');
    this.renderVakyanshLearnMode();
  }

  initElements() {
    // Sidebar Navigation Elements
    this.sidebar = document.getElementById('sidebar');
    this.sidebarBackdrop = document.getElementById('sidebar-backdrop');
    this.sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    this.navItemVakyansh = document.getElementById('nav-item-vakyansh');
    this.navItemSangya = document.getElementById('nav-item-sangya');
    this.navItemChitra = document.getElementById('nav-item-chitra');
    this.starsNavVakyansh = document.getElementById('stars-nav-vakyansh');
    this.starsNavSangya = document.getElementById('stars-nav-sangya');
    this.starsNavChitra = document.getElementById('stars-nav-chitra');
    this.sidebarScenesContainer = document.getElementById('sidebar-scenes-container');
    this.sidebarTopics = document.getElementById('sidebar-topics');
    this.progressFill = document.getElementById('progress-fill');
    this.progressLabel = document.getElementById('progress-label');

    // Top Bar Elements
    this.menuToggleBtn = document.getElementById('menu-toggle-btn');
    this.topBarTitle = document.getElementById('top-bar-title');
    this.topBarSubtitle = document.getElementById('top-bar-subtitle');
    this.btnTranslateToggle = document.getElementById('btn-translate-toggle');
    this.transToggleLabel = document.getElementById('trans-toggle-label');
    this.btnReset = document.getElementById('btn-reset');
    this.modeTabs = document.getElementById('mode-tabs');

    // Workspaces
    this.welcomeScreen = document.getElementById('welcome-screen');
    this.welcomeStartBtn = document.getElementById('welcome-start-btn');
    this.sceneArea = document.getElementById('scene-area');
    this.vakyanshArea = document.getElementById('vakyansh-area');
    this.vakyanshWorkspace = document.getElementById('vakyansh-workspace');
    this.vakyanshEarnedStars = document.getElementById('vakyansh-earned-stars');
    this.sangyaArea = document.getElementById('sangya-area');
    this.sangyaWorkspace = document.getElementById('sangya-workspace');
    this.sangyaEarnedStars = document.getElementById('sangya-earned-stars');

    // Picture components (Chitra Varnan)
    this.pictureHeading = document.getElementById('picture-heading');
    this.pictureHint = document.getElementById('picture-hint');
    this.pictureIllustrationWrapper = document.getElementById('picture-illustration-wrapper');
    this.hotspotCounter = document.getElementById('hotspot-counter');
    this.illustrationCanvas = document.getElementById('illustration-canvas');
    this.hotspotDetailBox = document.getElementById('hotspot-detail-box');
    this.modePanel = document.getElementById('mode-panel');
    this.btnViewReal = document.getElementById('btn-view-real');
    this.btnViewCartoon = document.getElementById('btn-view-cartoon');
    this.btnToggleBw = document.getElementById('btn-toggle-bw');
    this.bwToggleLabel = document.getElementById('bw-toggle-label');

    // Feedback Flash
    this.feedbackFlash = document.getElementById('feedback-flash');

    // Modal
    this.resultsModal = document.getElementById('results-modal');
    this.btnNextScene = document.getElementById('btn-next-scene');
    this.btnCloseModal = document.getElementById('btn-close-modal');
    this.resultStars = document.getElementById('result-stars');
    this.resultScore = document.getElementById('result-score');
    this.resultStarsCount = document.getElementById('result-stars-count');
  }

  bindEvents() {
    // Sidebar Drawer Toggle
    this.menuToggleBtn.addEventListener('click', () => this.toggleSidebar(true));
    this.sidebarCloseBtn.addEventListener('click', () => this.toggleSidebar(false));
    this.sidebarBackdrop.addEventListener('click', () => this.toggleSidebar(false));

    // Curriculum Topic Selectors
    this.navItemVakyansh.addEventListener('click', () => {
      this.switchModule('vakyansh');
      if (window.innerWidth <= 860) this.toggleSidebar(false);
    });
    if (this.navItemSangya) {
      this.navItemSangya.addEventListener('click', () => {
        this.switchModule('sangya');
        if (window.innerWidth <= 860) this.toggleSidebar(false);
      });
    }
    this.navItemChitra.addEventListener('click', () => {
      this.switchModule('chitra');
      if (window.innerWidth <= 860) this.toggleSidebar(false);
    });

    // Image View Mode Toggle (Real Exam Photo ↔ Vector Cartoon)
    if (this.btnViewReal && this.btnViewCartoon) {
      this.btnViewReal.addEventListener('click', () => {
        synth.tap();
        this.setImageMode('real');
      });
      this.btnViewCartoon.addEventListener('click', () => {
        synth.tap();
        this.setImageMode('cartoon');
      });
    }

    // B&W Exam Paper Print Toggle
    if (this.btnToggleBw) {
      this.btnToggleBw.addEventListener('click', () => {
        synth.tap();
        this.toggleBWMode();
      });
    }

    // Welcome start
    this.welcomeStartBtn.addEventListener('click', () => {
      synth.tap();
      this.welcomeScreen.style.display = 'none';
      this.sceneArea.style.display = 'flex';
      this.loadScene(this.state.currentSceneId);
    });

    // Translation Toggle
    this.btnTranslateToggle.addEventListener('click', () => {
      synth.tap();
      this.state.showEnglish = !this.state.showEnglish;
      this.updateTranslateButtonUI();
      this.saveAppState();
      if (this.state.activeModule === 'chitra') {
        this.renderCurrentMode();
        this.renderHotspotDetail(this.state.activeHotspotId);
      } else if (this.state.activeModule === 'vakyansh') {
        this.renderVakyanshWorkspace();
      } else if (this.state.activeModule === 'sangya') {
        this.renderSangyaWorkspace();
      }
    });

    // Reset button
    this.btnReset.addEventListener('click', () => {
      synth.tap();
      if (this.state.activeModule === 'chitra') {
        this.state.puzzleProgress = { stepIdx: 0, selectedWords: [], isCompleted: false };
        this.state.activeHotspotId = null;
        this.loadScene(this.state.currentSceneId);
        this.flash('चित्र और अभ्यास रीसेट किए गए (Reset done)', 'info');
      } else if (this.state.activeModule === 'vakyansh') {
        this.resetVakyanshMode();
        this.flash('वाक्यांश अभ्यास रीसेट किया गया (Reset done)', 'info');
      } else if (this.state.activeModule === 'sangya') {
        this.resetSangyaMode();
        this.flash('संज्ञा अभ्यास रीसेट किया गया (Reset done)', 'info');
      }
    });

    // Mode Tabs Click Delegation
    this.modeTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.mode-tab');
      if (!tab) return;
      synth.tap();
      const mode = tab.dataset.mode;
      if (this.state.activeModule === 'chitra') {
        this.state.chitraMode = mode;
        this.updateModeTabsUI();
        this.renderCurrentMode();
      } else if (this.state.activeModule === 'vakyansh') {
        this.state.vakyanshMode = mode;
        this.updateModeTabsUI();
        this.renderVakyanshWorkspace();
      } else if (this.state.activeModule === 'sangya') {
        this.state.sangyaMode = mode;
        this.updateModeTabsUI();
        this.renderSangyaWorkspace();
      }
      this.saveAppState();
    });

    // Results Modal actions
    this.btnCloseModal.addEventListener('click', () => {
      this.resultsModal.classList.remove('open');
    });
    this.btnNextScene.addEventListener('click', () => {
      this.resultsModal.classList.remove('open');
      if (this.state.activeModule === 'chitra') {
        const curIdx = SCENE_DATA.findIndex(s => s.id === this.state.currentSceneId);
        const nextIdx = (curIdx + 1) % SCENE_DATA.length;
        this.loadScene(SCENE_DATA[nextIdx].id);
      } else if (this.state.activeModule === 'vakyansh') {
        this.state.vakyanshMode = 'learn';
        this.updateModeTabsUI();
        this.renderVakyanshWorkspace();
      } else if (this.state.activeModule === 'sangya') {
        this.state.sangyaMode = 'learn';
        this.updateModeTabsUI();
        this.renderSangyaWorkspace();
      }
    });

    // Learning Passport Top Bar & Modal Trigger
    const btnPassport = document.getElementById('btn-passport');
    if (btnPassport) {
      btnPassport.addEventListener('click', () => {
        this.openLearningPassport();
      });
    }
    const btnPassportCloseX = document.getElementById('btn-passport-close-x');
    if (btnPassportCloseX) {
      btnPassportCloseX.addEventListener('click', () => {
        const modal = document.getElementById('passport-modal');
        if (modal) modal.classList.remove('open');
      });
    }
    const btnPassportClose = document.getElementById('btn-passport-close');
    if (btnPassportClose) {
      btnPassportClose.addEventListener('click', () => {
        const modal = document.getElementById('passport-modal');
        if (modal) modal.classList.remove('open');
      });
    }
    const btnModalPassport = document.getElementById('btn-modal-passport');
    if (btnModalPassport) {
      btnModalPassport.addEventListener('click', () => {
        this.resultsModal.classList.remove('open');
        this.openLearningPassport();
      });
    }
  }

  toggleSidebar(open) {
    synth.tap();
    if (open) {
      this.sidebar.classList.add('open');
      this.sidebarBackdrop.classList.add('active');
    } else {
      this.sidebar.classList.remove('open');
      this.sidebarBackdrop.classList.remove('active');
    }
  }

  updateTranslateButtonUI() {
    if (this.state.showEnglish) {
      this.btnTranslateToggle.classList.add('active');
      this.transToggleLabel.textContent = 'English: ON';
    } else {
      this.btnTranslateToggle.classList.remove('active');
      this.transToggleLabel.textContent = 'English: OFF';
    }
  }

  flash(msg, type = 'success') {
    this.feedbackFlash.textContent = msg;
    this.feedbackFlash.className = `feedback-flash ${type} show`;
    setTimeout(() => {
      this.feedbackFlash.classList.remove('show');
    }, 2400);
  }

  updateCurriculumNavUI() {
    this.navItemChitra.classList.toggle('active', this.state.activeModule === 'chitra');
    this.navItemVakyansh.classList.toggle('active', this.state.activeModule === 'vakyansh');
    if (this.navItemSangya) {
      this.navItemSangya.classList.toggle('active', this.state.activeModule === 'sangya');
    }

    // Chitra stars
    let chitraStars = 0;
    Object.values(this.state.stars).forEach(s => chitraStars += (s || 0));
    this.starsNavChitra.textContent = `${chitraStars}/60 ⭐`;

    // Vakyansh stars
    const vStars = this.state.vakyanshStars || 0;
    this.starsNavVakyansh.textContent = `${vStars}/10 ⭐`;
    if (this.vakyanshEarnedStars) {
      this.vakyanshEarnedStars.textContent = `${vStars} / 10`;
    }

    // Sangya stars
    const sStars = this.state.sangyaStars || 0;
    if (this.starsNavSangya) {
      this.starsNavSangya.textContent = `${sStars}/10 ⭐`;
    }
    if (this.sangyaEarnedStars) {
      this.sangyaEarnedStars.textContent = `${sStars} / 10`;
    }
  }

  updateProgressUI() {
    this.updateCurriculumNavUI();
    const chitraTotal = SCENE_DATA.length * 10; // 6 scenes * 10 = 60
    let earnedChitra = 0;
    Object.values(this.state.stars).forEach(s => earnedChitra += (s || 0));

    const totalPossible = chitraTotal + 10 + 10; // 60 + 10 (Vakyansh) + 10 (Sangya) = 80
    const totalEarned = earnedChitra + (this.state.vakyanshStars || 0) + (this.state.sangyaStars || 0);
    const pct = Math.round((totalEarned / totalPossible) * 100);

    this.progressFill.style.width = `${pct}%`;
    this.progressLabel.textContent = `${totalEarned} / ${totalPossible} सितारे (${pct}%)`;
  }

  // ============================================
  // MODULE SWITCHER (Chitra Varnan ↔ Vakyansh ↔ Sangya)
  // ============================================
  switchModule(moduleName, playSound = true) {
    if (playSound) synth.tap();
    this.state.activeModule = moduleName;
    this.welcomeScreen.style.display = 'none';
    this.updateCurriculumNavUI();
    this.updateModeTabsUI();
    this.updateTopBarPassportButton();

    if (moduleName === 'chitra') {
      this.sidebarScenesContainer.style.display = 'block';
      this.vakyanshArea.style.display = 'none';
      if (this.sangyaArea) this.sangyaArea.style.display = 'none';
      this.sceneArea.style.display = 'flex';
      this.loadScene(this.state.currentSceneId);
      this.evaluateAndAwardStars('chitra_' + this.state.currentSceneId, true);
    } else if (moduleName === 'vakyansh') {
      this.sidebarScenesContainer.style.display = 'none';
      this.sceneArea.style.display = 'none';
      if (this.sangyaArea) this.sangyaArea.style.display = 'none';
      this.vakyanshArea.style.display = 'flex';

      this.topBarTitle.textContent = 'वाक्यांश के लिए एक शब्द';
      this.topBarSubtitle.textContent = this.state.showEnglish
        ? 'One Word Substitution — Understand, learn & practice with memory clues'
        : '12 महत्वपूर्ण वाक्यांश — अर्थ, सूत्र, युक्ति व अभ्यास';

      this.evaluateAndAwardStars('vakyansh', true);
      this.renderVakyanshWorkspace();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (moduleName === 'sangya') {
      this.sidebarScenesContainer.style.display = 'none';
      this.sceneArea.style.display = 'none';
      this.vakyanshArea.style.display = 'none';
      if (this.sangyaArea) this.sangyaArea.style.display = 'flex';

      this.topBarTitle.textContent = 'संज्ञा व संज्ञा के पाँच भेद';
      this.topBarSubtitle.textContent = this.state.showEnglish
        ? 'Nouns & 5 Types (Proper, Common, Abstract, Material, Collective)'
        : 'संज्ञा की परिभाषा, 5 मुख्य भेद, पहचान सूत्र, प्रयोगशाला व अभ्यास';

      this.evaluateAndAwardStars('sangya', true);
      this.renderSangyaWorkspace();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.saveAppState();
  }

  updateModeTabsUI() {
    this.modeTabs.innerHTML = '';
    if (this.state.activeModule === 'chitra') {
      const tabs = [
        { mode: 'explore', label: '🔍 चित्र अवलोकन' },
        { mode: 'vocab', label: '🔤 शब्द भंडार' },
        { mode: 'puzzle', label: '🧩 वाक्य खेल' },
        { mode: 'write', label: '✍️ 5-वाक्य रचना' }
      ];
      tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `mode-tab ${this.state.chitraMode === t.mode ? 'active' : ''}`;
        btn.dataset.mode = t.mode;
        btn.textContent = t.label;
        this.modeTabs.appendChild(btn);
      });
    } else if (this.state.activeModule === 'vakyansh') {
      const tabs = [
        { mode: 'learn', label: '📖 सीखें व समझें' },
        { mode: 'match', label: '🃏 मिलान खेल' },
        { mode: 'quiz', label: '❓ अभ्यास क्विज़' },
        { mode: 'challenge', label: '🎯 60s चैलेंज' }
      ];
      tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `mode-tab ${this.state.vakyanshMode === t.mode ? 'active' : ''}`;
        btn.dataset.mode = t.mode;
        btn.textContent = t.label;
        this.modeTabs.appendChild(btn);
      });
    } else if (this.state.activeModule === 'sangya') {
      const tabs = [
        { mode: 'learn', label: '📖 सीखें व समझें' },
        { mode: 'sort', label: '🏷️ भेद पहचानो (खेल)' },
        { mode: 'quiz', label: '❓ अभ्यास क्विज़' },
        { mode: 'challenge', label: '⚡ 60s स्पीड चैलेंज' }
      ];
      tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `mode-tab ${this.state.sangyaMode === t.mode ? 'active' : ''}`;
        btn.dataset.mode = t.mode;
        btn.textContent = t.label;
        this.modeTabs.appendChild(btn);
      });
    }
  }

  // ============================================
  // VAKYANSH WORKSPACE ENGINE
  // ============================================
  renderVakyanshWorkspace() {
    if (this.state.challengeState.timerInterval) {
      clearInterval(this.state.challengeState.timerInterval);
      this.state.challengeState.timerInterval = null;
    }

    switch (this.state.vakyanshMode) {
      case 'learn':
        this.renderVakyanshLearnMode();
        break;
      case 'match':
        this.renderVakyanshMatchMode();
        break;
      case 'quiz':
        this.renderVakyanshQuizMode();
        break;
      case 'challenge':
        this.renderVakyanshChallengeMode();
        break;
    }
  }

  resetVakyanshMode() {
    if (this.state.vakyanshMode === 'match') {
      this.initMatchGame();
    } else if (this.state.vakyanshMode === 'quiz') {
      this.state.quizState = { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false };
      this.renderVakyanshQuizMode();
    } else if (this.state.vakyanshMode === 'challenge') {
      this.startVakyanshChallenge();
    } else {
      this.state.vakyanshFilter = 'all';
      this.renderVakyanshLearnMode();
    }
  }

  // --- VAKYANSH MODE 1: LEARN CARDS ---
  renderVakyanshLearnMode() {
    const filter = this.state.vakyanshFilter;
    const filteredList = filter === 'all'
      ? VAKYANSH_DATA
      : VAKYANSH_DATA.filter(item => item.category === filter);

    const d = this.getModuleProgressData('vakyansh');
    d.rootsExplored = true;
    this.evaluateAndAwardStars('vakyansh', true);

    this.vakyanshWorkspace.innerHTML = `
      <div class="vakyansh-learn-panel">
        ${this.renderTopicMasteryBanner('vakyansh')}

        <div class="vakyansh-controls-bar">
          <div class="vocab-filters">
            <button class="vocab-filter-btn ${filter === 'all' ? 'active' : ''}" data-filter="all">सभी 12 शब्द</button>
            <button class="vocab-filter-btn ${filter === 'behavior' ? 'active' : ''}" data-filter="behavior">स्वभाव व आचरण</button>
            <button class="vocab-filter-btn ${filter === 'action' ? 'active' : ''}" data-filter="action">कर्म व परिश्रम</button>
            <button class="vocab-filter-btn ${filter === 'nature' ? 'active' : ''}" data-filter="nature">जीवन व प्रकृति</button>
          </div>
          <input
            type="text"
            class="vakyansh-search-input"
            id="vakyansh-search-input"
            placeholder="🔍 शब्द या वाक्यांश खोजें (Search)...">
        </div>

        <div class="vakyansh-cards-grid" id="vakyansh-cards-grid">
          ${filteredList.map(item => this.getVakyanshCardHtml(item)).join('')}
        </div>

        <!-- CBSE Diagnostic Exam Traps Section -->
        <div class="exam-traps-section" style="margin-top:24px;">
          <div class="exam-traps-title">🎯 परीक्षा सावधानी जासूस (CBSE Diagnostic Exam Traps)</div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:12px;">वाक्यांशों में शब्दों के सूक्ष्म विलोम व अर्थ के जालों को समझें:</p>
          <div class="traps-grid">
            ${HINDI_EXAM_TRAPS.vakyansh.map((trap, tIdx) => {
              const isDiagnosed = !!(d.trapsDiagnosed && d.trapsDiagnosed[tIdx]);
              return `
                <div class="trap-card ${isDiagnosed ? 'trap-completed' : ''}">
                  <div class="trap-card-icon">${isDiagnosed ? '✅' : '⚠️'}</div>
                  <div class="trap-card-content">
                    <div class="trap-card-title">${trap.title}</div>
                    <div class="trap-card-desc">${trap.desc}</div>
                    <div class="trap-card-question"><strong>सवाल:</strong> ${trap.question}</div>
                    <div class="trap-card-options">
                      ${trap.options.map((opt, oIdx) => `
                        <button class="trap-opt-btn ${isDiagnosed && oIdx === trap.correct ? 'opt-correct' : ''}"
                          ${isDiagnosed ? 'disabled' : ''}
                          onclick="window.chitraApp.diagnoseExamTrap('vakyansh', ${tIdx}, ${oIdx})">
                          ${opt}
                        </button>
                      `).join('')}
                    </div>
                    ${isDiagnosed ? `<div style="margin-top:8px; font-size:0.85rem; color:#86efac;">💡 ${trap.exp}</div>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // Category filter click
    this.vakyanshWorkspace.querySelectorAll('.vocab-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        synth.tap();
        this.state.vakyanshFilter = btn.dataset.filter;
        this.saveAppState();
        this.renderVakyanshLearnMode();
      });
    });

    // Live search
    const searchInput = this.vakyanshWorkspace.querySelector('#vakyansh-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase().trim();
        const cards = this.vakyanshWorkspace.querySelectorAll('.vakyansh-card');
        cards.forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(q) ? 'flex' : 'none';
        });
      });
    }
  }

  getVakyanshCardHtml(item) {
    const d = this.getModuleProgressData('vakyansh');
    const isRead = !!(d.cardsRead && d.cardsRead[item.id - 1]);
    const enPhrase = this.state.showEnglish ? `<div class="vakyansh-phrase-en">${item.phraseEn}</div>` : '';
    const enWord = this.state.showEnglish ? `<span class="vakyansh-word-en">${item.wordEn} (${item.translit})</span>` : '';
    const enExample = this.state.showEnglish ? `<div class="vakyansh-example-en">🌐 ${item.exampleEn}</div>` : '';
    const oppositeTag = item.oppositeHi ? `<div class="vakyansh-opposite-tag">🔄 विलोम: ${item.oppositeHi}</div>` : '';

    return `
      <div class="vakyansh-card ${isRead ? 'card-completed' : ''}" data-id="${item.id}">
        <div class="vakyansh-card-header">
          <div class="vakyansh-num-badge">${item.id}</div>
          <div class="vakyansh-phrase-group">
            <div class="vakyansh-phrase-title">${item.phraseHi}</div>
            ${enPhrase}
          </div>
          <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
            <div class="vakyansh-word-badge">
              <span class="vakyansh-word-hi">${item.wordHi}</span>
              <button class="speech-btn" data-speak="${item.wordHi}" title="उच्चारण सुनें (Pronounce)">🔊</button>
              ${enWord}
            </div>
            <button class="btn btn-sm ${isRead ? 'btn-success' : ''}" onclick="window.chitraApp.toggleVakyanshCardRead(${item.id - 1})">
              ${isRead ? '✓ समझा हुआ' : '📖 समझ लिया'}
            </button>
          </div>
        </div>

        <div class="vakyansh-formula-box">
          <div class="vakyansh-formula-label">💡 समझने का सूत्र (Root Breakdown):</div>
          <div class="vakyansh-formula-code">${item.formula}</div>
        </div>

        <div class="vakyansh-clue-box">
          <strong>🧠 याद रखने की युक्ति:</strong> ${item.clue}
        </div>

        <div class="vakyansh-example-box">
          <div class="vakyansh-example-hi">📝 <strong>वाक्य प्रयोग:</strong> ${item.exampleHi}</div>
          ${enExample}
        </div>

        ${oppositeTag}
      </div>
    `;
  }

  // --- VAKYANSH MODE 2: MATCH CARDS GAME ---
  renderVakyanshMatchMode() {
    if (!this.state.matchState.cards || this.state.matchState.cards.length === 0) {
      this.initMatchGame();
      return;
    }

    const ms = this.state.matchState;
    const totalPairs = ms.cards.length / 2;
    const matchedCount = ms.matchedPairIds.length;
    const isCompleted = matchedCount === totalPairs;

    this.vakyanshWorkspace.innerHTML = `
      <div class="match-game-container">
        <div class="match-status-bar">
          <span class="match-score-pill">जोड़ियाँ: ${matchedCount} / ${totalPairs} मिलाईं</span>
          <span class="match-score-pill">कुल चालें: ${ms.moves}</span>
          <span class="match-instruction">वाक्यांश और उसके सही एक शब्द पर टैप करके जोड़ी बनाएं</span>
          <button class="btn" id="btn-restart-match" style="min-height:36px; padding:4px 12px;">🔄 नया खेल (Shuffle)</button>
        </div>

        ${isCompleted ? `
          <div style="text-align:center; padding: 24px; background: rgba(16,185,129,0.12); border-radius: var(--radius-lg); border: 1px solid rgba(16,185,129,0.4);">
            <div style="font-size:3rem; margin-bottom:8px;">🎉</div>
            <h3 style="color:#6ee7b7; font-size:1.35rem; margin-bottom:6px;">शाबाश! आपने सभी ${totalPairs} जोड़ियाँ सफलतापूर्वक मिला लीं!</h3>
            <p style="color:var(--text-secondary); margin-bottom:16px;">आपने कुल ${ms.moves} चालों में यह खेल पूरा किया।</p>
            <button class="btn btn-primary" id="btn-play-next-round">🚀 अगला राउंड खेलें →</button>
          </div>
        ` : `
          <div class="match-board" id="match-board">
            ${ms.cards.map((card, idx) => {
              const isMatched = ms.matchedPairIds.includes(card.pairId);
              const isSelected = ms.firstCard && ms.firstCard.idx === idx;
              return `
                <button
                  class="match-card ${card.type === 'phrase' ? 'type-phrase' : 'type-word'} ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}"
                  data-idx="${idx}"
                  data-pair-id="${card.pairId}"
                  ${isMatched ? 'disabled' : ''}>
                  <div class="match-card-hi">${card.textHi}</div>
                  ${this.state.showEnglish ? `<div class="match-card-en">${card.textEn}</div>` : ''}
                </button>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;

    // Restart button
    this.vakyanshWorkspace.querySelector('#btn-restart-match')?.addEventListener('click', () => {
      synth.tap();
      this.initMatchGame();
    });
    this.vakyanshWorkspace.querySelector('#btn-play-next-round')?.addEventListener('click', () => {
      synth.tap();
      this.initMatchGame();
    });

    // Card Click Binding
    if (!isCompleted) {
      this.vakyanshWorkspace.querySelectorAll('.match-card:not(.matched)').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx, 10);
          this.handleMatchCardClick(idx);
        });
      });
    }
  }

  initMatchGame() {
    // Pick 6 random items from the 12 phrases
    const shuffledItems = [...VAKYANSH_DATA].sort(() => 0.5 - Math.random()).slice(0, 6);
    const cards = [];

    shuffledItems.forEach(item => {
      cards.push({
        pairId: item.id,
        type: 'phrase',
        textHi: item.phraseHi,
        textEn: item.phraseEn
      });
      cards.push({
        pairId: item.id,
        type: 'word',
        textHi: item.wordHi,
        textEn: `${item.wordEn} (${item.translit})`
      });
    });

    // Shuffle the 12 cards
    cards.sort(() => 0.5 - Math.random());

    this.state.matchState = {
      cards,
      firstCard: null,
      matchedPairIds: [],
      moves: 0
    };

    this.renderVakyanshMatchMode();
  }

  handleMatchCardClick(idx) {
    const ms = this.state.matchState;
    const clickedCard = ms.cards[idx];

    // Don't allow clicking an already matched card or re-clicking the same card
    if (ms.matchedPairIds.includes(clickedCard.pairId)) return;
    if (ms.firstCard && ms.firstCard.idx === idx) return;

    synth.tap();

    if (!ms.firstCard) {
      // First card chosen
      ms.firstCard = { idx, ...clickedCard };
      this.renderVakyanshMatchMode();
    } else {
      // Second card chosen
      ms.moves++;
      const first = ms.firstCard;
      const isMatch = first.pairId === clickedCard.pairId && first.type !== clickedCard.type;

      if (isMatch) {
        synth.success();
        ms.matchedPairIds.push(first.pairId);
        ms.firstCard = null;

        const d = this.getModuleProgressData('vakyansh');
        d.matchPairsCount = Math.max(d.matchPairsCount || 0, ms.matchedPairIds.length);
        if (ms.matchedPairIds.length === ms.cards.length / 2) {
          d.matchCompleted = true;
          synth.fanfare();
          this.confetti.burst(50);
        }
        this.evaluateAndAwardStars('vakyansh');
        this.renderVakyanshMatchMode();
      } else {
        synth.error();
        // Highlight wrong pair
        const board = this.vakyanshWorkspace.querySelector('#match-board');
        if (board) {
          const btn1 = board.querySelector(`[data-idx="${first.idx}"]`);
          const btn2 = board.querySelector(`[data-idx="${idx}"]`);
          if (btn1) btn1.classList.add('wrong');
          if (btn2) btn2.classList.add('wrong');
        }

        setTimeout(() => {
          ms.firstCard = null;
          this.renderVakyanshMatchMode();
        }, 700);
      }
    }
  }

  // --- VAKYANSH MODE 3: PRACTICE QUIZ ---
  renderVakyanshQuizMode() {
    const qs = this.state.quizState;
    const questions = VAKYANSH_QUIZ_POOL;
    const totalQ = questions.length;
    if (qs.qIndex >= totalQ) qs.qIndex = 0;
    const q = questions[qs.qIndex];

    const letters = ['क', 'ख', 'ग', 'घ'];

    this.vakyanshWorkspace.innerHTML = `
      <div class="vakyansh-quiz-panel">
        <!-- Score Bar & Restart Button -->
        <div class="score-bar" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; background:rgba(0,0,0,0.3); padding:10px 14px; border-radius:var(--radius-md); border:var(--border-glass);">
          <div style="display:flex; gap:16px; align-items:center;">
            <div class="score-item" style="text-align:center;">
              <div class="score-value" style="font-size:1.3rem; font-weight:800; color:var(--accent-green);">${qs.score.correct}</div>
              <div class="score-label" style="font-size:0.7rem; color:var(--text-muted);">सही (Correct)</div>
            </div>
            <div class="score-item" style="text-align:center;">
              <div class="score-value" style="font-size:1.3rem; font-weight:800; color:var(--accent-red);">${qs.score.wrong}</div>
              <div class="score-label" style="font-size:0.7rem; color:var(--text-muted);">गलत (Wrong)</div>
            </div>
            <div class="score-item" style="text-align:center;">
              <div class="score-value" style="font-size:1.3rem; font-weight:800; color:var(--accent-saffron-light);">${Math.max(0, totalQ - qs.qIndex)}</div>
              <div class="score-label" style="font-size:0.7rem; color:var(--text-muted);">शेष (Remaining)</div>
            </div>
          </div>
          <button class="btn btn-restart-quiz" id="btn-restart-vakyansh-quiz" style="padding:6px 12px; font-size:0.78rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.18); color:var(--text-secondary); border-radius:var(--radius-sm); cursor:pointer;">
            🔄 पुनः आरंभ (Restart)
          </button>
        </div>

        <!-- Question Card -->
        <div class="vakyansh-quiz-card">
          <div class="quiz-q-num">प्रश्न ${qs.qIndex + 1} / ${totalQ}</div>
          <div class="quiz-q-prompt">${q.qHi}</div>
          ${this.state.showEnglish ? `<div class="quiz-q-prompt-en">🌐 ${q.qEn}</div>` : ''}

          <!-- Options Grid -->
          <div class="quiz-options-grid" id="quiz-options-grid">
            ${q.options.map((opt, i) => `
              <button class="quiz-opt-btn" data-opt-idx="${i}">
                <span class="quiz-opt-letter">${letters[i]}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>

          <!-- Explanation Box -->
          <div class="quiz-explanation-box" id="quiz-exp-box" style="display:none;"></div>

          <!-- Next Button -->
          <div style="display:flex; justify-content:flex-end; margin-top:8px;">
            <button class="btn btn-primary" id="btn-quiz-next" style="display:none;">
              ${qs.qIndex < totalQ - 1 ? 'अगला प्रश्न →' : 'परिणाम देखें 🏆'}
            </button>
          </div>
        </div>
      </div>
    `;

    const optBtns = this.vakyanshWorkspace.querySelectorAll('#quiz-options-grid .quiz-opt-btn');
    const expBox = this.vakyanshWorkspace.querySelector('#quiz-exp-box');
    const nextBtn = this.vakyanshWorkspace.querySelector('#btn-quiz-next');

    // Restart button handler
    this.vakyanshWorkspace.querySelector('#btn-restart-vakyansh-quiz')?.addEventListener('click', () => {
      synth.tap();
      this.state.quizState = { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false, selectedOption: null };
      this.saveAppState();
      this.renderVakyanshQuizMode();
    });

    // If restored in already answered state
    if (qs.answered && qs.selectedOption !== null && qs.selectedOption !== undefined) {
      optBtns.forEach(b => b.setAttribute('disabled', 'true'));
      const chosenIdx = qs.selectedOption;
      if (chosenIdx === q.correct) {
        if (optBtns[chosenIdx]) optBtns[chosenIdx].classList.add('correct');
        expBox.innerHTML = `<strong>🎉 बिल्कुल सही उत्तर!</strong><br>${q.exp}`;
      } else {
        if (optBtns[chosenIdx]) optBtns[chosenIdx].classList.add('wrong');
        if (optBtns[q.correct]) optBtns[q.correct].classList.add('correct');
        expBox.innerHTML = `<strong>❌ सही उत्तर ‘${q.options[q.correct]}’ है:</strong><br>${q.exp}`;
      }
      expBox.style.display = 'block';
      nextBtn.style.display = 'inline-flex';
    }

    // Bind Option clicks
    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (qs.answered) return;
        qs.answered = true;
        const chosenIdx = parseInt(btn.dataset.optIdx, 10);
        qs.selectedOption = chosenIdx;

        optBtns.forEach(b => b.setAttribute('disabled', 'true'));

        if (chosenIdx === q.correct) {
          synth.success();
          btn.classList.add('correct');
          qs.score.correct++;
          expBox.innerHTML = `<strong>🎉 बिल्कुल सही उत्तर!</strong><br>${q.exp}`;
        } else {
          synth.error();
          btn.classList.add('wrong');
          qs.score.wrong++;
          // Highlight correct one
          const correctBtn = this.vakyanshWorkspace.querySelector(`[data-opt-idx="${q.correct}"]`);
          if (correctBtn) correctBtn.classList.add('correct');
          expBox.innerHTML = `<strong>❌ सही उत्तर ‘${q.options[q.correct]}’ है:</strong><br>${q.exp}`;
        }

        expBox.style.display = 'block';
        nextBtn.style.display = 'inline-flex';

        const d = this.getModuleProgressData('vakyansh');
        d.quizCorrect = Math.max(d.quizCorrect || 0, qs.score.correct);
        d.quizTotalSolved = Math.max(d.quizTotalSolved || 0, qs.qIndex + 1);
        this.evaluateAndAwardStars('vakyansh');
        this.saveAppState();
      });
    });

    // Next Question Button
    nextBtn?.addEventListener('click', () => {
      synth.tap();
      if (qs.qIndex < totalQ - 1) {
        qs.qIndex++;
        qs.answered = false;
        qs.selectedOption = null;
        this.saveAppState();
        this.renderVakyanshQuizMode();
      } else {
        // Quiz complete modal
        const pct = Math.round((qs.score.correct / totalQ) * 100);
        const earnedStars = this.evaluateAndAwardStars('vakyansh');

        if (earnedStars >= 8) {
          synth.fanfare();
          this.confetti.burst(60);
        }

        this.resultStars.textContent = `${earnedStars}/10 ⭐`;
        this.resultScore.textContent = `${pct}%`;
        this.resultStarsCount.textContent = String(earnedStars);
        this.resultsModal.classList.add('open');

        // Reset quiz session on completion
        this.state.quizState = { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false, selectedOption: null };
        this.saveAppState();
      }
    });
  }

  // --- VAKYANSH MODE 4: 60s TIMED CHALLENGE ---
  renderVakyanshChallengeMode() {
    this.startVakyanshChallenge();
  }

  startVakyanshChallenge() {
    if (this.state.challengeState.timerInterval) {
      clearInterval(this.state.challengeState.timerInterval);
    }

    // Pick 10 randomized questions
    const pool = [...VAKYANSH_QUIZ_POOL].sort(() => 0.5 - Math.random()).slice(0, 10);

    this.state.challengeState = {
      timer: 60,
      timerInterval: null,
      qIndex: 0,
      score: 0,
      answered: false,
      questions: pool
    };

    this.renderChallengeQuestion();

    // Start timer interval
    this.state.challengeState.timerInterval = setInterval(() => {
      const cs = this.state.challengeState;
      cs.timer--;
      const timerFill = document.getElementById('challenge-timer-fill');
      const timerText = document.getElementById('challenge-timer-text');

      if (timerFill) {
        const pct = (cs.timer / 60) * 100;
        timerFill.style.width = `${pct}%`;
        if (cs.timer <= 15) timerFill.classList.add('urgent');
      }
      if (timerText) {
        timerText.textContent = `⏱️ समय शेष: ${cs.timer}s`;
      }

      if (cs.timer <= 0) {
        clearInterval(cs.timerInterval);
        cs.timerInterval = null;
        this.finishChallenge();
      }
    }, 1000);
  }

  renderChallengeQuestion() {
    const cs = this.state.challengeState;
    const totalQ = cs.questions.length;

    if (cs.qIndex >= totalQ) {
      if (cs.timerInterval) clearInterval(cs.timerInterval);
      this.finishChallenge();
      return;
    }

    const q = cs.questions[cs.qIndex];
    const letters = ['क', 'ख', 'ग', 'घ'];

    this.vakyanshWorkspace.innerHTML = `
      <div class="challenge-panel">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <span style="font-size:0.9rem; font-weight:700; color:var(--accent-saffron-light);">
            ⚡ 60-सेकंड चैलेंज — प्रश्न ${cs.qIndex + 1} / ${totalQ}
          </span>
          <span id="challenge-timer-text" style="font-size:0.92rem; font-weight:800; color:var(--text-primary);">
            ⏱️ समय शेष: ${cs.timer}s
          </span>
          <span style="font-size:0.9rem; font-weight:700; color:var(--accent-green);">
            स्कोर: ${cs.score}
          </span>
        </div>

        <!-- Timer bar -->
        <div class="challenge-timer-bar">
          <div class="challenge-timer-fill ${cs.timer <= 15 ? 'urgent' : ''}" id="challenge-timer-fill" style="width:${(cs.timer/60)*100}%;"></div>
        </div>

        <!-- Question Card -->
        <div class="vakyansh-quiz-card">
          <div class="quiz-q-prompt">${q.qHi}</div>
          ${this.state.showEnglish ? `<div class="quiz-q-prompt-en">🌐 ${q.qEn}</div>` : ''}

          <div class="quiz-options-grid" id="challenge-options-grid">
            ${q.options.map((opt, i) => `
              <button class="quiz-opt-btn" data-opt-idx="${i}">
                <span class="quiz-opt-letter">${letters[i]}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Fast-paced Option Click
    this.vakyanshWorkspace.querySelectorAll('#challenge-options-grid .quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (cs.answered) return;
        cs.answered = true;
        const chosenIdx = parseInt(btn.dataset.optIdx, 10);

        if (chosenIdx === q.correct) {
          synth.success();
          btn.classList.add('correct');
          cs.score++;
        } else {
          synth.error();
          btn.classList.add('wrong');
        }

        setTimeout(() => {
          if (document.activeElement && typeof document.activeElement.blur === 'function') {
            document.activeElement.blur();
          }
          cs.qIndex++;
          cs.answered = false;
          this.renderChallengeQuestion();
        }, 600);
      });
    });
  }

  finishChallenge() {
    const cs = this.state.challengeState;
    const totalQ = cs.questions.length;
    const pct = Math.round((cs.score / totalQ) * 100);

    const d = this.getModuleProgressData('vakyansh');
    d.challengeHighScore = Math.max(d.challengeHighScore || 0, cs.score);
    const earnedStars = this.evaluateAndAwardStars('vakyansh');

    if (cs.score >= 8) {
      synth.fanfare();
      this.confetti.burst(70);
    } else {
      synth.success();
    }

    this.resultStars.textContent = `${earnedStars}/10 ⭐`;
    this.resultScore.textContent = `${pct}% (${cs.score}/${totalQ})`;
    this.resultStarsCount.textContent = String(earnedStars);
    this.resultsModal.classList.add('open');

    this.vakyanshWorkspace.innerHTML = `
      <div style="text-align:center; padding:32px 16px; background:var(--bg-card); border-radius:var(--radius-xl); border:var(--border-glass);">
        <div style="font-size:3.5rem; margin-bottom:12px;">🏆</div>
        <h3 style="font-size:1.5rem; color:var(--accent-saffron-light); margin-bottom:6px;">चैलेंज पूरा हुआ! (Challenge Complete!)</h3>
        <p style="color:var(--text-secondary); margin-bottom:18px;">आपने 60 सेकंड में ${cs.score} / ${totalQ} अंक प्राप्त किए और ${starsEarned} सितारे अर्जित किए!</p>
        <button class="btn btn-primary" id="btn-challenge-retry">🚀 दोबारा खेलें (Try Again)</button>
      </div>
    `;

    this.vakyanshWorkspace.querySelector('#btn-challenge-retry').addEventListener('click', () => {
      synth.tap();
      this.startVakyanshChallenge();
    });
  }

  // ============================================
  // SANGYA WORKSPACE ENGINE (संज्ञा व 5 भेद)
  // ============================================
  renderSangyaWorkspace() {
    if (this.state.sangyaChallengeState && this.state.sangyaChallengeState.timerInterval) {
      clearInterval(this.state.sangyaChallengeState.timerInterval);
      this.state.sangyaChallengeState.timerInterval = null;
    }

    switch (this.state.sangyaMode) {
      case 'learn':
        this.renderSangyaLearnMode();
        break;
      case 'sort':
        this.renderSangyaSortMode();
        break;
      case 'quiz':
        this.renderSangyaQuizMode();
        break;
      case 'challenge':
        this.renderSangyaChallengeMode();
        break;
    }
  }

  resetSangyaMode() {
    if (this.state.sangyaMode === 'sort') {
      this.initSangyaSortGame();
    } else if (this.state.sangyaMode === 'quiz') {
      this.state.sangyaQuizState = { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false };
      this.renderSangyaQuizMode();
    } else if (this.state.sangyaMode === 'challenge') {
      this.startSangyaChallenge();
    } else {
      this.state.sangyaSubtab = 'types';
      this.state.sangyaLabFilter = 'all';
      this.renderSangyaLearnMode();
    }
  }

  // --- SANGYA MODE 1: LEARN & EXPLORE ---
  renderSangyaLearnMode() {
    const subtab = this.state.sangyaSubtab || 'types';
    const d = this.getModuleProgressData('sangya');

    if (subtab === 'mirror') {
      d.mirrorExplored = true;
      this.evaluateAndAwardStars('sangya', true);
    } else if (subtab === 'lab') {
      d.labExplored = true;
      this.evaluateAndAwardStars('sangya', true);
    }

    let subtabHtml = '';
    if (subtab === 'types') {
      subtabHtml = `
        <div class="sangya-type-cards-grid">
          ${SANGYA_TYPES_DATA.map(t => this.getSangyaTypeCardHtml(t)).join('')}
        </div>
      `;
    } else if (subtab === 'mirror') {
      subtabHtml = `
        <div class="sangya-mirror-section">
          <div class="mirror-intro-card">
            💡 <strong>तुलना दर्पण (Comparison Mirror):</strong> परीक्षा में विद्यार्थी अक्सर व्यक्तिवाचक और जातिवाचक संज्ञा में भ्रमित हो जाते हैं। नीचे दिए गए तुलना युग्मों को ध्यानपूर्वक समझें:
          </div>
          <div class="mirror-cards-grid">
            ${SANGYA_COMPARISON_DATA.map(pair => `
              <div class="mirror-pair-card">
                <div class="mirror-vs-row">
                  <div class="mirror-side side-a">
                    <div class="mirror-side-word">${pair.wordA}</div>
                    <span class="mirror-side-tag ${pair.tagA}">${pair.typeA}</span>
                  </div>
                  <div class="mirror-vs-circle">VS</div>
                  <div class="mirror-side side-b">
                    <div class="mirror-side-word">${pair.wordB}</div>
                    <span class="mirror-side-tag ${pair.tagB}">${pair.typeB}</span>
                  </div>
                </div>
                <div class="mirror-reason-box">
                  🔍 <strong>कारण:</strong> ${pair.reason}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (subtab === 'lab') {
      const filter = this.state.sangyaLabFilter || 'all';
      const filteredLab = filter === 'all'
        ? BHAVVACHAK_NIRMAN_DATA
        : BHAVVACHAK_NIRMAN_DATA.filter(item => item.origin === filter);

      subtabHtml = `
        <div class="sangya-lab-section">
          <div class="lab-origin-filters">
            <button class="lab-origin-btn ${filter === 'all' ? 'active' : ''}" data-filter="all">सभी 15 शब्द</button>
            <button class="lab-origin-btn ${filter === 'jati' ? 'active' : ''}" data-filter="jati">1. जातिवाचक संज्ञा से</button>
            <button class="lab-origin-btn ${filter === 'visheshan' ? 'active' : ''}" data-filter="visheshan">2. विशेषण से</button>
            <button class="lab-origin-btn ${filter === 'kriya' ? 'active' : ''}" data-filter="kriya">3. क्रिया से</button>
          </div>
          <div class="lab-cards-grid">
            ${filteredLab.map(item => `
              <div class="lab-card">
                <div class="lab-formula-row">
                  <span class="lab-base-word">${item.base}</span>
                  <span class="lab-plus-sign">+</span>
                  <span class="lab-suffix-word">${item.suffix}</span>
                  <span class="lab-arrow-sign">➔</span>
                  <span class="lab-result-word">${item.result}</span>
                </div>
                ${this.state.showEnglish ? `<div style="font-size:0.75rem; color:var(--text-muted);">🌐 ${item.en}</div>` : ''}
                <div class="lab-sentence-box">
                  💬 ${item.sentence}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    this.sangyaWorkspace.innerHTML = `
      <div class="sangya-learn-panel">
        ${this.renderTopicMasteryBanner('sangya')}

        <!-- Grand Definition Card -->
        <div class="sangya-def-card">
          <div class="sangya-def-header">
            <div class="sangya-def-icon">📖</div>
            <div>
              <div class="sangya-def-title">संज्ञा की परिभाषा (Definition of Noun)</div>
              ${this.state.showEnglish ? `<div class="sangya-def-title-en">Noun: The naming word for person, place, thing, creature, or emotion</div>` : ''}
            </div>
          </div>
          <div class="sangya-def-body">
            किसी <strong>व्यक्ति, वस्तु, स्थान, प्राणी या भाव</strong> के नाम को <strong>संज्ञा</strong> कहते हैं। संसार में प्रत्येक वस्तु की अपनी पहचान उसका नाम ही होता है।
          </div>
          <div class="sangya-pillars-grid">
            <div class="sangya-pillar-item">
              <div class="sangya-pillar-title">👤 व्यक्ति (Person)</div>
              <div class="sangya-pillar-examples">सचिन, भगत सिंह, मीरा, रोहन</div>
            </div>
            <div class="sangya-pillar-item">
              <div class="sangya-pillar-title">📦 वस्तु (Thing)</div>
              <div class="sangya-pillar-examples">पुस्तक, कलम, घड़ी, मेज, पंखा</div>
            </div>
            <div class="sangya-pillar-item">
              <div class="sangya-pillar-title">🏛️ स्थान (Place)</div>
              <div class="sangya-pillar-examples">दिल्ली, विद्यालय, भारत, आगरा</div>
            </div>
            <div class="sangya-pillar-item">
              <div class="sangya-pillar-title">🐘 प्राणी (Creature)</div>
              <div class="sangya-pillar-examples">हाथी, गाय, शेर, मोर, तोता</div>
            </div>
            <div class="sangya-pillar-item">
              <div class="sangya-pillar-title">💖 भाव (Emotion/State)</div>
              <div class="sangya-pillar-examples">मिठास, बचपन, ईमानदारी, खुशी</div>
            </div>
          </div>
        </div>

        <!-- Subnav Bar -->
        <div class="sangya-subnav-bar">
          <button class="sangya-subnav-btn ${subtab === 'types' ? 'active' : ''}" data-subtab="types">
            ⭐ 1. संज्ञा के पाँच भेद (5 Types)
          </button>
          <button class="sangya-subnav-btn ${subtab === 'mirror' ? 'active' : ''}" data-subtab="mirror">
            🪞 2. तुलना दर्पण (Traps & Contrasts)
          </button>
          <button class="sangya-subnav-btn ${subtab === 'lab' ? 'active' : ''}" data-subtab="lab">
            🧪 3. भाववाचक निर्माण प्रयोगशाला (Lab)
          </button>
        </div>

        <!-- Active Subtab Container -->
        <div class="sangya-subtab-content">
          ${subtabHtml}
        </div>

        <!-- CBSE Diagnostic Exam Traps Section -->
        <div class="exam-traps-section" style="margin-top:24px;">
          <div class="exam-traps-title">🎯 परीक्षा सावधानी जासूस (CBSE Diagnostic Exam Traps)</div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:12px;">विद्यार्थी अक्सर इन 3 जालों में भ्रमित होते हैं। प्रत्येक जाल का सही उत्तर पहचानकर अपनी समझ पक्की करें:</p>
          <div class="traps-grid">
            ${HINDI_EXAM_TRAPS.sangya.map((trap, tIdx) => {
              const isDiagnosed = !!(d.trapsDiagnosed && d.trapsDiagnosed[tIdx]);
              return `
                <div class="trap-card ${isDiagnosed ? 'trap-completed' : ''}">
                  <div class="trap-card-icon">${isDiagnosed ? '✅' : '⚠️'}</div>
                  <div class="trap-card-content">
                    <div class="trap-card-title">${trap.title}</div>
                    <div class="trap-card-desc">${trap.desc}</div>
                    <div class="trap-card-question"><strong>सवाल:</strong> ${trap.question}</div>
                    <div class="trap-card-options">
                      ${trap.options.map((opt, oIdx) => `
                        <button class="trap-opt-btn ${isDiagnosed && oIdx === trap.correct ? 'opt-correct' : ''}"
                          ${isDiagnosed ? 'disabled' : ''}
                          onclick="window.chitraApp.diagnoseExamTrap('sangya', ${tIdx}, ${oIdx})">
                          ${opt}
                        </button>
                      `).join('')}
                    </div>
                    ${isDiagnosed ? `<div style="margin-top:8px; font-size:0.85rem; color:#86efac;">💡 ${trap.exp}</div>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // Subtab click listeners
    this.sangyaWorkspace.querySelectorAll('.sangya-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        synth.tap();
        this.state.sangyaSubtab = btn.dataset.subtab;
        this.saveAppState();
        this.renderSangyaLearnMode();
      });
    });

    // Formation lab filter listeners
    this.sangyaWorkspace.querySelectorAll('.lab-origin-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        synth.tap();
        this.state.sangyaLabFilter = btn.dataset.filter;
        this.saveAppState();
        this.renderSangyaLearnMode();
      });
    });
  }

  getSangyaTypeCardHtml(t) {
    const d = this.getModuleProgressData('sangya');
    const isRead = !!(d.typesRead && d.typesRead[t.num - 1]);
    return `
      <div class="sangya-type-card ${t.themeClass} ${isRead ? 'card-completed' : ''}">
        <div class="sangya-card-top">
          <div class="type-badge-group">
            <div class="type-badge-icon">${t.icon}</div>
            <div class="type-badge-texts">
              <h4>${t.nameHi}</h4>
              ${this.state.showEnglish ? `<span>${t.nameEn}</span>` : ''}
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <button class="btn btn-sm ${isRead ? 'btn-success' : ''}" onclick="window.chitraApp.toggleSangyaTypeRead(${t.num - 1})">
              ${isRead ? '✓ समझा हुआ' : '📖 समझ लिया'}
            </button>
            <span class="type-num-badge">भेद #${t.num}</span>
          </div>
        </div>

        <div class="sangya-card-def">
          ${t.defHi}
          ${this.state.showEnglish ? `<div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">🌐 ${t.defEn}</div>` : ''}
        </div>

        <div class="sangya-clue-box">
          💡 <strong>पहचान सूत्र:</strong> ${t.clueHi}
          ${this.state.showEnglish ? `<div style="font-size:0.75rem; color:#fef08a; margin-top:3px;">🌐 Clue: ${t.clueEn}</div>` : ''}
        </div>

        <div class="sangya-examples-wrap">
          <div class="sangya-examples-label">📌 प्रमुख उदाहरण (Examples):</div>
          <div class="sangya-chips-cloud">
            ${t.examples.map(ex => `<span class="sangya-chip">${ex}</span>`).join('')}
          </div>
        </div>

        <div class="sangya-trap-box">
          ${t.trapHi}
          ${this.state.showEnglish ? `<div style="font-size:0.75rem; margin-top:2px;">🌐 Trap: ${t.trapEn}</div>` : ''}
        </div>
      </div>
    `;
  }

  // --- SANGYA MODE 2: 5-BUCKET CLASSIFIER GAME ---
  initSangyaSortGame() {
    const shuffled = [...SANGYA_SORT_ITEMS].sort(() => 0.5 - Math.random());
    this.state.sangyaSortState = {
      items: shuffled,
      currentIndex: 0,
      score: 0,
      streak: 0,
      answered: false
    };
    this.renderSangyaSortMode();
  }

  renderSangyaSortMode() {
    if (!this.state.sangyaSortState.items || this.state.sangyaSortState.items.length === 0) {
      this.initSangyaSortGame();
      return;
    }

    const st = this.state.sangyaSortState;
    const totalItems = st.items.length;

    // Victory state when all sorted
    if (st.currentIndex >= totalItems) {
      const pct = Math.round((st.score / totalItems) * 100);
      const d = this.getModuleProgressData('sangya');
      d.sortHighScore = Math.max(d.sortHighScore || 0, st.score);
      const earnedStars = this.evaluateAndAwardStars('sangya');

      this.sangyaWorkspace.innerHTML = `
        <div class="sangya-sort-panel">
          <div class="sort-complete-card">
            <div class="sort-complete-icon">🏆</div>
            <h3>शानदार! वर्गीकरण खेल पूर्ण हुआ!</h3>
            <div style="font-size:1.8rem; margin:6px 0;">${earnedStars}/10 ⭐</div>
            <p>आपने ${totalItems} शब्दों में से <strong>${st.score}</strong> शब्द बिल्कुल सही वर्गीकृत किए (${pct}% सटीकता)!</p>
            <div style="display:flex; gap:12px; margin-top:8px;">
              <button class="btn btn-primary" id="btn-sort-restart">🔄 दोबारा खेलें (Play Again)</button>
              <button class="btn" id="btn-sort-goto-quiz">❓ अभ्यास क्विज़ हल करें →</button>
            </div>
          </div>
        </div>
      `;

      this.sangyaWorkspace.querySelector('#btn-sort-restart').addEventListener('click', () => {
        synth.tap();
        this.initSangyaSortGame();
      });
      this.sangyaWorkspace.querySelector('#btn-sort-goto-quiz').addEventListener('click', () => {
        synth.tap();
        this.state.sangyaMode = 'quiz';
        this.updateModeTabsUI();
        this.renderSangyaWorkspace();
      });
      return;
    }

    const curItem = st.items[st.currentIndex];

    this.sangyaWorkspace.innerHTML = `
      <div class="sangya-sort-panel">
        <div class="sort-header-row">
          <div>
            <h3 style="font-size:1.2rem; font-weight:800; color:var(--text-primary);">🏷️ भेद पहचानो: 5-घड़े वर्गीकरण खेल</h3>
            <p style="font-size:0.82rem; color:var(--text-secondary);">शब्द को पढ़कर सही संज्ञा भेद वाले घड़े (Bucket) पर टैप करें:</p>
          </div>
          <div class="sort-stats-wrap">
            <div class="sort-stat-pill">शेष: <span>${totalItems - st.currentIndex} / ${totalItems}</span></div>
            <div class="sort-stat-pill">स्कोर: <span>${st.score}</span></div>
            <div class="sort-stat-pill">🔥 स्ट्रीक: <span>${st.streak}</span></div>
          </div>
        </div>

        <!-- Active Target Word Card -->
        <div class="sort-active-card-container">
          <div class="sort-target-word">${curItem.word}</div>
          ${this.state.showEnglish ? `<div class="sort-target-en">🌐 ${curItem.en}</div>` : ''}
          <div class="sort-target-sentence">💬 वाक्य प्रयोग: ${curItem.sentence}</div>
        </div>

        <!-- Feedback Notification -->
        <div class="sort-feedback-card" id="sort-feedback-card"></div>

        <!-- 5 Bucket Choice Buttons -->
        <div class="sort-buckets-grid">
          <button class="sort-bucket-btn bucket-proper" data-type="proper">
            <span class="bucket-icon">👑</span>
            <span class="bucket-title-hi">व्यक्तिवाचक</span>
            ${this.state.showEnglish ? `<span class="bucket-title-en">Proper Noun</span>` : ''}
          </button>
          <button class="sort-bucket-btn bucket-common" data-type="common">
            <span class="bucket-icon">🌳</span>
            <span class="bucket-title-hi">जातिवाचक</span>
            ${this.state.showEnglish ? `<span class="bucket-title-en">Common Noun</span>` : ''}
          </button>
          <button class="sort-bucket-btn bucket-abstract" data-type="abstract">
            <span class="bucket-icon">💖</span>
            <span class="bucket-title-hi">भाववाचक</span>
            ${this.state.showEnglish ? `<span class="bucket-title-en">Abstract Noun</span>` : ''}
          </button>
          <button class="sort-bucket-btn bucket-material" data-type="material">
            <span class="bucket-icon">🪙</span>
            <span class="bucket-title-hi">द्रव्यवाचक</span>
            ${this.state.showEnglish ? `<span class="bucket-title-en">Material Noun</span>` : ''}
          </button>
          <button class="sort-bucket-btn bucket-collective" data-type="collective">
            <span class="bucket-icon">👥</span>
            <span class="bucket-title-hi">समुदायवाचक</span>
            ${this.state.showEnglish ? `<span class="bucket-title-en">Collective Noun</span>` : ''}
          </button>
        </div>
      </div>
    `;

    // Bucket Click Event Listeners
    this.sangyaWorkspace.querySelectorAll('.sort-bucket-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (st.answered) return;
        this.handleSangyaBucketClick(btn.dataset.type, curItem);
      });
    });
  }

  handleSangyaBucketClick(chosenType, curItem) {
    const st = this.state.sangyaSortState;
    st.answered = true;
    const feedbackEl = this.sangyaWorkspace.querySelector('#sort-feedback-card');

    const typeNames = {
      proper: 'व्यक्तिवाचक संज्ञा (Proper Noun)',
      common: 'जातिवाचक संज्ञा (Common Noun)',
      abstract: 'भाववाचक संज्ञा (Abstract Noun)',
      material: 'द्रव्यवाचक संज्ञा (Material Noun)',
      collective: 'समुदायवाचक संज्ञा (Collective Noun)'
    };

    if (chosenType === curItem.type) {
      synth.success();
      st.score++;
      st.streak++;
      feedbackEl.className = 'sort-feedback-card correct';
      feedbackEl.innerHTML = `✅ <strong>शाबाश!</strong> ‘${curItem.word}’ बिल्कुल सही <strong>${typeNames[curItem.type]}</strong> है!`;
    } else {
      synth.error();
      st.streak = 0;
      feedbackEl.className = 'sort-feedback-card wrong';
      feedbackEl.innerHTML = `❌ <strong>गलत!</strong> ‘${curItem.word}’ वास्तव में <strong>${typeNames[curItem.type]}</strong> है।`;
    }

    setTimeout(() => {
      st.currentIndex++;
      st.answered = false;
      this.renderSangyaSortMode();
    }, 1200);
  }

  // --- SANGYA MODE 3: PRACTICE QUIZ (15 CBSE MCQs) ---
  renderSangyaQuizMode() {
    const questions = SANGYA_QUIZ_POOL;
    const qs = this.state.sangyaQuizState;

    if (qs.qIndex >= questions.length) {
      // Quiz complete
      const totalQ = questions.length;
      const score = qs.score.correct;
      const pct = Math.round((score / totalQ) * 100);

      const earnedStars = this.evaluateAndAwardStars('sangya');
      if (earnedStars >= 8) {
        this.confetti.burst(80);
        synth.fanfare();
      }

      this.resultStars.textContent = `${earnedStars}/10 ⭐`;
      this.resultScore.textContent = `${pct}% (${score}/${totalQ})`;
      this.resultStarsCount.textContent = String(earnedStars);
      this.resultsModal.classList.add('open');

      this.sangyaWorkspace.innerHTML = `
        <div class="sangya-quiz-panel" style="text-align:center; padding:36px 20px; background:var(--bg-card); border-radius:var(--radius-xl); border:var(--border-glass);">
          <div style="font-size:3.5rem;">🎉</div>
          <h3 style="font-size:1.6rem; color:var(--accent-saffron-light); margin-top:8px;">संज्ञा क्विज़ पूर्ण हुआ!</h3>
          <div style="font-size:2rem; margin:8px 0;">${earnedStars}/10 ⭐</div>
          <p style="color:var(--text-secondary); margin-bottom:20px;">
            आपने 15 में से <strong>${score}</strong> प्रश्नों के सही उत्तर दिए (${pct}% सटीकता)!
          </p>
          <div style="display:flex; justify-content:center; gap:12px;">
            <button class="btn btn-primary" id="btn-quiz-retry">🔄 क्विज़ दोबारा दें (Retry Quiz)</button>
            <button class="btn" id="btn-quiz-challenge">⚡ 60s स्पीड चैलेंज खेलें →</button>
          </div>
        </div>
      `;

      // Reset quiz session on complete
      this.state.sangyaQuizState = { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false, selectedOption: null };
      this.saveAppState();

      this.sangyaWorkspace.querySelector('#btn-quiz-retry').addEventListener('click', () => {
        synth.tap();
        this.state.sangyaQuizState = { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false, selectedOption: null };
        this.saveAppState();
        this.renderSangyaQuizMode();
      });
      this.sangyaWorkspace.querySelector('#btn-quiz-challenge').addEventListener('click', () => {
        synth.tap();
        this.state.sangyaMode = 'challenge';
        this.updateModeTabsUI();
        this.renderSangyaWorkspace();
      });
      return;
    }

    const curQ = questions[qs.qIndex];
    const progressPct = Math.round((qs.qIndex / questions.length) * 100);

    this.sangyaWorkspace.innerHTML = `
      <div class="vakyansh-quiz-panel">
        <div class="quiz-header-row" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div>
            <span class="quiz-badge">प्रश्न ${qs.qIndex + 1} / ${questions.length}</span>
            <div class="quiz-progress-track" style="margin-top:6px; width:160px; height:6px; background:rgba(255,255,255,0.1); border-radius:10px; overflow:hidden;">
              <div style="width:${progressPct}%; height:100%; background:var(--gradient-saffron); transition:width 0.3s;"></div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:12px;">
            <div class="quiz-score-badge">
              स्कोर: <strong style="color:var(--accent-saffron-light);">${qs.score.correct}</strong> / ${qs.qIndex}
            </div>
            <button class="btn btn-restart-quiz" id="btn-restart-sangya-quiz" style="padding:4px 10px; font-size:0.75rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.18); color:var(--text-secondary); border-radius:var(--radius-sm); cursor:pointer;">
              🔄 पुनः आरंभ (Restart)
            </button>
          </div>
        </div>

        <div class="vakyansh-quiz-card">
          <div class="quiz-question-text">${curQ.qHi}</div>
          ${this.state.showEnglish ? `<div class="quiz-question-en">🌐 ${curQ.qEn}</div>` : ''}

          <div class="quiz-options-grid" id="quiz-options-grid">
            ${curQ.options.map((opt, idx) => `
              <button class="quiz-option-btn" data-idx="${idx}">
                <span class="quiz-opt-letter">${String.fromCharCode(65 + idx)}</span>
                <span class="quiz-opt-text">${opt}</span>
              </button>
            `).join('')}
          </div>

          <div class="quiz-explanation-box" id="quiz-explanation-box" style="display:none; margin-top:16px;">
            💡 <strong>व्याख्या (Explanation):</strong> ${curQ.exp}
          </div>

          <div style="display:flex; justify-content:flex-end; margin-top:16px;">
            <button class="btn btn-primary" id="btn-quiz-next" style="display:none;">अगला प्रश्न →</button>
          </div>
        </div>
      </div>
    `;

    const optBtns = this.sangyaWorkspace.querySelectorAll('.quiz-option-btn');
    const expBox = this.sangyaWorkspace.querySelector('#quiz-explanation-box');
    const nextBtn = this.sangyaWorkspace.querySelector('#btn-quiz-next');

    // Restart button handler
    this.sangyaWorkspace.querySelector('#btn-restart-sangya-quiz')?.addEventListener('click', () => {
      synth.tap();
      this.state.sangyaQuizState = { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false, selectedOption: null };
      this.saveAppState();
      this.renderSangyaQuizMode();
    });

    // If restored in already answered state
    if (qs.answered && qs.selectedOption !== null && qs.selectedOption !== undefined) {
      optBtns.forEach(b => b.setAttribute('disabled', 'true'));
      const chosen = qs.selectedOption;
      if (chosen === curQ.correct) {
        if (optBtns[chosen]) optBtns[chosen].classList.add('correct');
      } else {
        if (optBtns[chosen]) optBtns[chosen].classList.add('wrong');
        if (optBtns[curQ.correct]) optBtns[curQ.correct].classList.add('correct');
      }
      expBox.style.display = 'block';
      nextBtn.style.display = 'inline-flex';
    }

    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (qs.answered) return;
        qs.answered = true;
        const chosen = parseInt(btn.dataset.idx, 10);
        qs.selectedOption = chosen;

        optBtns.forEach(b => b.setAttribute('disabled', 'true'));

        if (chosen === curQ.correct) {
          synth.success();
          btn.classList.add('correct');
          qs.score.correct++;
        } else {
          synth.error();
          btn.classList.add('wrong');
          if (optBtns[curQ.correct]) optBtns[curQ.correct].classList.add('correct');
          qs.score.wrong++;
        }

        expBox.style.display = 'block';
        nextBtn.style.display = 'inline-flex';

        const d = this.getModuleProgressData('sangya');
        d.quizCorrect = Math.max(d.quizCorrect || 0, qs.score.correct);
        d.quizTotalSolved = Math.max(d.quizTotalSolved || 0, qs.qIndex + 1);
        this.evaluateAndAwardStars('sangya');
        this.saveAppState();
      });
    });

    nextBtn.addEventListener('click', () => {
      synth.tap();
      qs.qIndex++;
      qs.answered = false;
      qs.selectedOption = null;
      this.saveAppState();
      this.renderSangyaQuizMode();
    });
  }

  // --- SANGYA MODE 4: 60s TIMED CHALLENGE ---
  renderSangyaChallengeMode() {
    this.sangyaWorkspace.innerHTML = `
      <div class="challenge-panel" style="text-align:center; padding:32px 18px;">
        <div style="font-size:3.5rem;">⚡</div>
        <h3 style="font-size:1.55rem; color:var(--accent-saffron-light); margin-top:6px;">संज्ञा: 60 सेकंड स्पीड चैलेंज!</h3>
        <p style="color:var(--text-secondary); max-width:500px; margin:8px auto 20px; line-height:1.6;">
          घड़ी की सुई टिक-टिक कर रही है! 60 सेकंड में अधिक से अधिक शब्दों के सही संज्ञा भेद पहचानें और 3 सितारे ⭐⭐⭐ जीतें!
        </p>
        <div>
          <button class="btn btn-primary" id="btn-start-sangya-challenge" style="font-size:1.05rem; padding:12px 28px;">
            🚀 चैलेंज शुरू करें (Start 60s Challenge)
          </button>
        </div>
      </div>
    `;

    this.sangyaWorkspace.querySelector('#btn-start-sangya-challenge').addEventListener('click', () => {
      synth.tap();
      this.startSangyaChallenge();
    });
  }

  startSangyaChallenge() {
    const pool = [...SANGYA_CHALLENGE_POOL].sort(() => 0.5 - Math.random());
    this.state.sangyaChallengeState = {
      timer: 60,
      timerInterval: null,
      pool,
      qIndex: 0,
      score: 0,
      streak: 0,
      answered: false
    };

    const cs = this.state.sangyaChallengeState;

    cs.timerInterval = setInterval(() => {
      cs.timer--;
      const timerFill = this.sangyaWorkspace.querySelector('#challenge-timer-fill');
      const timerNum = this.sangyaWorkspace.querySelector('#challenge-timer-num');
      if (timerFill) {
        const pct = (cs.timer / 60) * 100;
        timerFill.style.width = `${pct}%`;
        if (cs.timer <= 10) timerFill.classList.add('urgent');
      }
      if (timerNum) {
        timerNum.textContent = `${cs.timer}s`;
      }

      if (cs.timer <= 0) {
        clearInterval(cs.timerInterval);
        cs.timerInterval = null;
        this.finishSangyaChallenge();
      }
    }, 1000);

    this.renderNextSangyaChallengeQuestion();
  }

  renderNextSangyaChallengeQuestion() {
    const cs = this.state.sangyaChallengeState;
    if (cs.timer <= 0) return;

    if (cs.qIndex >= cs.pool.length) {
      cs.pool = [...SANGYA_CHALLENGE_POOL].sort(() => 0.5 - Math.random());
      cs.qIndex = 0;
    }

    const item = cs.pool[cs.qIndex];
    cs.answered = false;

    this.sangyaWorkspace.innerHTML = `
      <div class="challenge-panel">
        <div class="challenge-header-row" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div style="font-size:1.1rem; font-weight:800; color:var(--accent-saffron-light);">
            ⚡ 60s स्पीड चैलेंज — स्कोर: <strong>${cs.score}</strong> | 🔥 स्ट्रीक: <strong>${cs.streak}</strong>
          </div>
          <div style="font-size:1.2rem; font-weight:800; color:#fff;" id="challenge-timer-num">${cs.timer}s</div>
        </div>

        <div class="challenge-timer-bar">
          <div class="challenge-timer-fill ${cs.timer <= 10 ? 'urgent' : ''}" id="challenge-timer-fill" style="width:${(cs.timer / 60) * 100}%;"></div>
        </div>

        <div class="vakyansh-quiz-card" style="margin-top:12px;">
          <div style="font-size:1.6rem; font-weight:800; text-align:center; color:#fff; margin-bottom:4px;">
            ‘${item.word}’
          </div>
          ${this.state.showEnglish ? `<div style="text-align:center; font-size:0.9rem; color:var(--text-muted); margin-bottom:12px;">🌐 ${item.en}</div>` : ''}
          <div class="quiz-question-text" style="text-align:center; font-size:1.1rem; margin-bottom:16px;">
            ${item.question}
          </div>

          <div class="quiz-options-grid">
            ${item.options.map((opt, idx) => `
              <button class="quiz-option-btn challenge-opt-btn" data-idx="${idx}">
                <span class="quiz-opt-letter">${idx + 1}</span>
                <span class="quiz-opt-text">${opt}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    const optBtns = this.sangyaWorkspace.querySelectorAll('.challenge-opt-btn');
    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (cs.answered) return;
        cs.answered = true;
        const chosen = parseInt(btn.dataset.idx, 10);

        if (chosen === item.correct) {
          synth.success();
          btn.classList.add('correct');
          cs.score++;
          cs.streak++;
        } else {
          synth.error();
          btn.classList.add('wrong');
          optBtns[item.correct].classList.add('correct');
          cs.streak = 0;
        }

        setTimeout(() => {
          if (document.activeElement && typeof document.activeElement.blur === 'function') {
            document.activeElement.blur();
          }
          cs.qIndex++;
          this.renderNextSangyaChallengeQuestion();
        }, 450);
      });
    });
  }

  finishSangyaChallenge() {
    const cs = this.state.sangyaChallengeState;
    synth.fanfare();
    this.confetti.burst(80);

    const d = this.getModuleProgressData('sangya');
    d.challengeHighScore = Math.max(d.challengeHighScore || 0, cs.score);
    const earnedStars = this.evaluateAndAwardStars('sangya');

    this.resultStars.textContent = `${earnedStars}/10 ⭐`;
    this.resultScore.textContent = `${cs.score} सही उत्तर`;
    this.resultStarsCount.textContent = String(earnedStars);
    this.resultsModal.classList.add('open');

    this.sangyaWorkspace.innerHTML = `
      <div style="text-align:center; padding:32px 16px; background:var(--bg-card); border-radius:var(--radius-xl); border:var(--border-glass);">
        <div style="font-size:3.5rem; margin-bottom:12px;">🏆</div>
        <h3 style="font-size:1.5rem; color:var(--accent-saffron-light); margin-bottom:6px;">समय समाप्त! (Time Up!)</h3>
        <p style="color:var(--text-secondary); margin-bottom:18px;">
          आपने 60 सेकंड में <strong>${cs.score}</strong> सही उत्तर दिए और <strong>${starsEarned}</strong> सितारे ⭐ अर्जित किए!
        </p>
        <button class="btn btn-primary" id="btn-sangya-challenge-retry">🚀 दोबारा खेलें (Try Again)</button>
      </div>
    `;

    this.sangyaWorkspace.querySelector('#btn-sangya-challenge-retry').addEventListener('click', () => {
      synth.tap();
      this.startSangyaChallenge();
    });
  }

  // ============================================
  // CHITRA VARNAN METHODS (Original Engine Preserved)
  // ============================================
  renderSidebarTopics() {
    this.sidebarTopics.innerHTML = '';
    SCENE_DATA.forEach((scene) => {
      const btn = document.createElement('button');
      btn.className = `topic-nav-item ${scene.id === this.state.currentSceneId ? 'active' : ''}`;
      btn.dataset.id = scene.id;

      const stars = this.state.stars[scene.id] || 0;
      const starsDisplay = `${stars}/10 ⭐`;

      btn.innerHTML = `
        <div class="topic-nav-icon">${scene.icon}</div>
        <div class="topic-nav-info">
          <div class="topic-nav-title">${scene.title}</div>
          <div class="topic-nav-subtitle">${scene.titleEn}</div>
        </div>
        <div class="topic-nav-stars">${starsDisplay}</div>
        <div class="sidebar-mini-progress">
          <div class="mini-progress-fill" style="width: ${(stars / 10) * 100}%;"></div>
        </div>
      `;

      btn.addEventListener('click', () => {
        synth.tap();
        this.welcomeScreen.style.display = 'none';
        this.sceneArea.style.display = 'flex';
        this.loadScene(scene.id);
        if (window.innerWidth <= 860) {
          this.toggleSidebar(false);
        }
      });

      this.sidebarTopics.appendChild(btn);
    });
  }

  loadScene(sceneId) {
    this.state.currentSceneId = sceneId;
    this.state.activeHotspotId = null;
    this.state.puzzleProgress = { stepIdx: 0, selectedWords: [], isCompleted: false };

    const scene = SCENE_DATA.find(s => s.id === sceneId);
    if (!scene) return;

    // Mastery banner for current scene
    const bannerContainer = document.getElementById('chitra-mastery-banner-container');
    if (bannerContainer) {
      bannerContainer.innerHTML = this.renderTopicMasteryBanner('chitra_' + sceneId);
    }
    this.updateTopBarPassportButton();

    // Update Top Bar
    this.topBarTitle.textContent = scene.title;
    this.topBarSubtitle.textContent = this.state.showEnglish ? `${scene.titleEn} — ${scene.subtitle}` : scene.subtitle;
    this.pictureHeading.textContent = `${scene.icon} ${scene.title}`;
    this.pictureHint.textContent = this.state.showEnglish ? 'Tap numbered hotspots on the picture to inspect vocabulary' : 'चित्र पर बने नंबरों (हॉटस्पॉट) पर टैप करके शब्द और वाक्य देखें';
    this.hotspotCounter.textContent = `हॉटस्पॉट: 6 कुल`;

    // Update image toggle buttons
    if (this.btnViewReal) this.btnViewReal.classList.toggle('active', this.state.imageViewMode === 'real');
    if (this.btnViewCartoon) this.btnViewCartoon.classList.toggle('active', this.state.imageViewMode === 'cartoon');

    // Render Real Photo / SVG Canvas & Hotspots
    this.renderIllustration(scene);

    // Render Default Hotspot Bar
    this.renderHotspotDetail(null);

    // Render Mode Panel
    this.renderCurrentMode();

    // Highlight active topic in sidebar
    document.querySelectorAll('.topic-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.id === sceneId);
    });

    this.saveAppState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setImageMode(mode) {
    this.state.imageViewMode = mode;
    this.saveAppState();
    if (this.btnViewReal) this.btnViewReal.classList.toggle('active', mode === 'real');
    if (this.btnViewCartoon) this.btnViewCartoon.classList.toggle('active', mode === 'cartoon');
    const scene = SCENE_DATA.find(s => s.id === this.state.currentSceneId);
    if (scene) {
      this.renderIllustration(scene);
      this.flash(mode === 'real' ? '📷 वास्तविक परीक्षा चित्र चालू (Real Photo)' : '🎨 कार्टून रेखाचित्र चालू (Cartoon Illustration)', 'info');
      const d = this.getModuleProgressData('chitra_' + scene.id);
      if (!d.viewModes) d.viewModes = {};
      d.viewModes[mode] = true;
      this.evaluateAndAwardStars('chitra_' + scene.id);
    }
  }

  toggleBWMode() {
    this.state.isBWMode = !this.state.isBWMode;
    this.saveAppState();
    this.updateBWModeUI();
    const scene = SCENE_DATA.find(s => s.id === this.state.currentSceneId);
    if (scene && this.state.isBWMode) {
      const d = this.getModuleProgressData('chitra_' + scene.id);
      d.bwModeUsed = true;
      this.evaluateAndAwardStars('chitra_' + scene.id);
    }
    this.flash(
      this.state.isBWMode
        ? '🖨️ प्रश्न-पत्र प्रारूप (B&W Print): वास्तविक परीक्षा जैसा श्वेत-श्याम दृश्य'
        : '🌈 स्वाभाविक रंगीन दृश्य (Color View) पुनः चालू',
      'info'
    );
  }

  updateBWModeUI() {
    const isBW = this.state.isBWMode;
    if (this.btnToggleBw) {
      this.btnToggleBw.classList.toggle('active', isBW);
      this.btnToggleBw.setAttribute('aria-pressed', String(isBW));
    }
    if (this.bwToggleLabel) {
      this.bwToggleLabel.textContent = isBW ? 'B&W प्रिंट (ON)' : 'B&W प्रिंट';
    }
    if (this.pictureIllustrationWrapper) {
      this.pictureIllustrationWrapper.classList.toggle('bw-exam-mode', isBW);
    }
    const badge = this.illustrationCanvas ? this.illustrationCanvas.querySelector('.scene-image-badge') : null;
    if (badge) {
      if (isBW) {
        badge.textContent = '🖨️ प्रश्न-पत्र प्रारूप — श्वेत-श्याम (B&W Exam Print)';
        badge.classList.add('bw-badge');
      } else {
        badge.textContent = this.state.imageViewMode === 'real'
          ? '📷 परीक्षा प्रारूप — वास्तविक चित्र (Exam Photo)'
          : '🎨 रेखाचित्र (Cartoon Illustration)';
        badge.classList.remove('bw-badge');
      }
    }
  }

  getSceneHotspots(scene) {
    const isReal = this.state.imageViewMode === 'real';
    if (isReal && scene.hotspotsReal) {
      return scene.hotspots.map(hs => {
        const override = scene.hotspotsReal.find(r => r.id === hs.id);
        return override ? { ...hs, x: override.x, y: override.y } : hs;
      });
    }
    return scene.hotspots;
  }

  renderIllustration(scene) {
    this.illustrationCanvas.innerHTML = '';
    const isReal = this.state.imageViewMode === 'real';

    if (isReal && scene.realImage) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'scene-image-wrapper';
      imgWrap.innerHTML = `
        <img src="${scene.realImage}" alt="${scene.title}" class="scene-real-photo" loading="eager" />
        <div class="scene-image-badge">📷 परीक्षा प्रारूप — वास्तविक चित्र (Exam Photo)</div>
      `;
      this.illustrationCanvas.appendChild(imgWrap);
    } else {
      const svgWrap = document.createElement('div');
      svgWrap.className = 'scene-svg-wrapper';
      svgWrap.innerHTML = scene.svg;
      const cartoonBadge = document.createElement('div');
      cartoonBadge.className = 'scene-image-badge cartoon-badge';
      cartoonBadge.textContent = '🎨 रेखाचित्र (Cartoon Illustration)';
      svgWrap.appendChild(cartoonBadge);
      this.illustrationCanvas.appendChild(svgWrap);
    }

    // Inject Hotspots based on current view mode
    const hotspots = this.getSceneHotspots(scene);

    hotspots.forEach(hs => {
      const btn = document.createElement('button');
      btn.className = `hotspot-btn ${this.state.activeHotspotId === hs.id ? 'active' : ''}`;
      btn.style.left = `${hs.x}%`;
      btn.style.top = `${hs.y}%`;
      btn.textContent = hs.id;
      btn.title = `${hs.title} (${hs.meaningEn})`;
      btn.setAttribute('aria-label', `Hotspot ${hs.id}: ${hs.title}`);

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        synth.tap();
        this.selectHotspot(hs.id);
      });

      this.illustrationCanvas.appendChild(btn);
    });

    // Update B&W Mode visual styling on wrapper and badge
    this.updateBWModeUI();
  }

  selectHotspot(hsId) {
    this.state.activeHotspotId = hsId;

    if (hsId) {
      const sceneId = this.state.currentSceneId;
      const d = this.getModuleProgressData('chitra_' + sceneId);
      if (!d.hotspotsViewed) d.hotspotsViewed = {};
      d.hotspotsViewed[hsId] = true;
      d.hotspotsCount = Object.keys(d.hotspotsViewed).length;
      this.evaluateAndAwardStars('chitra_' + sceneId);
    }

    // Update buttons in illustration
    document.querySelectorAll('.hotspot-btn').forEach(el => {
      el.classList.toggle('active', el.textContent.trim() === String(hsId));
    });

    // Update explore mode cards if currently active
    document.querySelectorAll('.explore-card').forEach(el => {
      el.classList.toggle('active', el.dataset.id === String(hsId));
    });

    this.renderHotspotDetail(hsId);
  }

  renderHotspotDetail(hsId) {
    const scene = SCENE_DATA.find(s => s.id === this.state.currentSceneId);
    if (!scene) return;

    if (!hsId) {
      this.hotspotDetailBox.innerHTML = `
        <div class="hs-empty">💡 चित्र पर किसी भी नंबर 🔵 पर टैप करके शब्द और वाक्य सीखें! (Tap numbered hotspots to inspect)</div>
      `;
      return;
    }

    const hs = scene.hotspots.find(h => h.id === hsId);
    if (!hs) return;

    const translitHtml = this.state.showEnglish ? `<span class="hs-translit">(${hs.translit})</span>` : '';
    const enWordHtml = this.state.showEnglish ? `<span class="hs-english-word">${hs.meaningEn}</span>` : '';
    const enSentenceHtml = this.state.showEnglish ? `<div class="hs-sentence-english">🌐 ${hs.sentenceEn}</div>` : '';

    this.hotspotDetailBox.innerHTML = `
      <div class="hs-content">
        <div class="hs-header-row">
          <div class="hs-word-group">
            <span class="hs-hindi-word">${hs.title}</span>
            ${translitHtml}
            ${enWordHtml}
          </div>
          <span class="hs-tag">${hs.type}</span>
        </div>
        <div class="hs-sentence-row">
          <div class="hs-sentence-hindi">✍️ ${hs.sentenceHi}</div>
          ${enSentenceHtml}
        </div>
      </div>
    `;
  }

  renderCurrentMode() {
    const scene = SCENE_DATA.find(s => s.id === this.state.currentSceneId);
    if (!scene) return;

    switch (this.state.chitraMode) {
      case 'explore':
        this.renderExploreMode(scene);
        break;
      case 'vocab':
        this.renderVocabMode(scene);
        break;
      case 'puzzle':
        this.renderPuzzleMode(scene);
        break;
      case 'write':
        this.renderWriteMode(scene);
        break;
    }
  }

  renderExploreMode(scene) {
    this.modePanel.innerHTML = `
      <div class="explore-panel">
        <div class="explore-grid">
          ${scene.hotspots.map(hs => `
            <div class="explore-card ${this.state.activeHotspotId === hs.id ? 'active' : ''}" data-id="${hs.id}">
              <div class="explore-badge">${hs.id}</div>
              <div class="explore-info">
                <h5>${hs.title} ${this.state.showEnglish ? `<small style="font-weight:normal; color:var(--text-secondary);">(${hs.meaningEn})</small>` : ''}</h5>
                <p>${hs.sentenceHi}</p>
                ${this.state.showEnglish ? `<p style="font-size:0.75rem; color:var(--text-muted);">${hs.sentenceEn}</p>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.modePanel.querySelectorAll('.explore-card').forEach(card => {
      card.addEventListener('click', () => {
        synth.tap();
        const id = parseInt(card.dataset.id, 10);
        this.selectHotspot(id);
      });
    });
  }

  renderVocabMode(scene) {
    const d = this.getModuleProgressData('chitra_' + scene.id);
    d.vocabExplored = true;
    this.evaluateAndAwardStars('chitra_' + scene.id, true);

    const filter = this.state.vocabFilter;
    const filteredVocab = filter === 'all'
      ? scene.vocabulary
      : scene.vocabulary.filter(v => v.category === filter);

    const typeLabels = {
      noun: 'संज्ञा (Noun)',
      verb: 'क्रिया (Verb)',
      adj: 'विशेषण (Adjective)',
      position: 'दिशा / स्थिति',
      connector: 'योजक शब्द (Connector)'
    };

    this.modePanel.innerHTML = `
      <div class="vocab-panel">
        <div class="vocab-header">
          <h3>🔤 शब्द भंडार (Vocabulary Bank)</h3>
          <div class="vocab-filters">
            <button class="vocab-filter-btn ${filter === 'all' ? 'active' : ''}" data-filter="all">सभी (${scene.vocabulary.length})</button>
            <button class="vocab-filter-btn ${filter === 'noun' ? 'active' : ''}" data-filter="noun">संज्ञा (Nouns)</button>
            <button class="vocab-filter-btn ${filter === 'verb' ? 'active' : ''}" data-filter="verb">क्रिया (Verbs)</button>
            <button class="vocab-filter-btn ${filter === 'adj' ? 'active' : ''}" data-filter="adj">विशेषण (Adjectives)</button>
            <button class="vocab-filter-btn ${filter === 'position' ? 'active' : ''}" data-filter="position">दिशा / स्थिति</button>
            <button class="vocab-filter-btn ${filter === 'connector' ? 'active' : ''}" data-filter="connector">योजक (Connectors)</button>
          </div>
        </div>

        <div class="vocab-grid">
          ${filteredVocab.map(item => `
            <div class="vocab-card">
              <div class="vocab-top">
                <span class="vocab-hindi">${item.hi}</span>
                <span class="vocab-type-badge">${typeLabels[item.category] || item.category}</span>
              </div>
              ${this.state.showEnglish ? `<span class="vocab-translit">${item.translit}</span>` : ''}
              ${this.state.showEnglish ? `<span class="vocab-english">🌐 ${item.en}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.modePanel.querySelectorAll('.vocab-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        synth.tap();
        this.state.vocabFilter = btn.dataset.filter;
        this.renderVocabMode(scene);
      });
    });
  }

  renderPuzzleMode(scene) {
    const pProg = this.state.puzzleProgress;
    const currentPuzzle = scene.puzzles[pProg.stepIdx];

    if (!currentPuzzle) {
      this.modePanel.innerHTML = `
        <div class="puzzle-panel" style="text-align: center; padding: 32px 16px;">
          <div style="font-size: 3.5rem; margin-bottom: 12px;">🎉</div>
          <h3 style="font-size: 1.5rem; color: var(--accent-saffron-light); margin-bottom: 8px;">अद्भुत! आपने सभी 5 वाक्य सही बना लिए!</h3>
          <p style="color: var(--text-secondary); margin-bottom: 24px;">आपने 5-स्टेप फॉर्मूले के अनुसार चित्र का संपूर्ण वर्णन पूरा कर लिया है।</p>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="btn btn-primary" id="btn-show-model-answer">✍️ आदर्श उत्तर और 5-वाक्य देखें →</button>
            <button class="btn" id="btn-replay-puzzle">🔄 दोबारा खेलें</button>
          </div>
        </div>
      `;

      this.modePanel.querySelector('#btn-show-model-answer').addEventListener('click', () => {
        synth.tap();
        this.state.chitraMode = 'write';
        this.updateModeTabsUI();
        this.renderWriteMode(scene);
      });
      this.modePanel.querySelector('#btn-replay-puzzle').addEventListener('click', () => {
        synth.tap();
        this.state.puzzleProgress = { stepIdx: 0, selectedWords: [], isCompleted: false };
        this.renderPuzzleMode(scene);
      });

      const d = this.getModuleProgressData('chitra_' + scene.id);
      d.puzzleStepsCompleted = 5;
      const earnedStars = this.evaluateAndAwardStars('chitra_' + scene.id);
      this.confetti.burst(80);
      synth.fanfare();
      return;
    }

    const selectedIndices = pProg.selectedWords;
    const isSlotFilled = selectedIndices.length === currentPuzzle.correctWords.length;

    this.modePanel.innerHTML = `
      <div class="puzzle-panel">
        <div class="puzzle-header">
          <span class="puzzle-step-badge">कदम ${currentPuzzle.step} / 5 (Step ${currentPuzzle.step})</span>
          <span style="font-size: 0.84rem; color: var(--text-muted);">शब्दों पर टैप करके वाक्य जोड़ें</span>
        </div>

        <div>
          <div class="puzzle-prompt">${currentPuzzle.promptHi}</div>
          ${this.state.showEnglish ? `<div class="puzzle-prompt-english">🌐 ${currentPuzzle.promptEn}</div>` : ''}
        </div>

        <div class="puzzle-slot-area ${isSlotFilled ? 'filled' : ''}" id="puzzle-slot">
          ${selectedIndices.length === 0
            ? '<div class="puzzle-slot-placeholder">यहाँ शब्द जोड़कर वाक्य बनाएं (Tap words below to arrange sentence)</div>'
            : selectedIndices.map((origIdx, slotPos) => {
                const item = currentPuzzle.scrambledWords[origIdx];
                return `
                  <button class="puzzle-word-chip in-slot" data-slot-pos="${slotPos}">
                    <span>${item.hi}</span>
                    ${this.state.showEnglish ? `<span class="chip-en">${item.en}</span>` : ''}
                  </button>
                `;
              }).join('')
          }
        </div>

        <div>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px;">उपलब्ध शब्द (Word Bank):</div>
          <div class="puzzle-bank" id="puzzle-bank">
            ${currentPuzzle.scrambledWords.map((item, idx) => {
              const isUsed = selectedIndices.includes(idx);
              if (isUsed) return '';
              return `
                <button class="puzzle-word-chip" data-idx="${idx}">
                  <span>${item.hi}</span>
                  ${this.state.showEnglish ? `<span class="chip-en">${item.en}</span>` : ''}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="puzzle-feedback" id="puzzle-feedback"></div>

        <div class="puzzle-actions">
          <div class="puzzle-action-btns">
            <button class="btn" id="btn-undo-word" ${selectedIndices.length === 0 ? 'disabled' : ''}>↩️ अंतिम शब्द हटाएं (Undo)</button>
            <button class="btn" id="btn-reset-puzzle">🔄 रीसेट (Clear)</button>
          </div>
          <button class="btn btn-primary" id="btn-check-puzzle" ${!isSlotFilled ? 'disabled style="opacity:0.5;"' : ''}>
            ✓ वाक्य जांचें (Check Answer)
          </button>
        </div>
      </div>
    `;

    this.modePanel.querySelectorAll('#puzzle-bank .puzzle-word-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        synth.tap();
        const idx = parseInt(btn.dataset.idx, 10);
        this.state.puzzleProgress.selectedWords.push(idx);
        this.renderPuzzleMode(scene);
      });
    });

    this.modePanel.querySelectorAll('#puzzle-slot .puzzle-word-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        synth.tap();
        const slotPos = parseInt(btn.dataset.slotPos, 10);
        this.state.puzzleProgress.selectedWords.splice(slotPos, 1);
        this.renderPuzzleMode(scene);
      });
    });

    this.modePanel.querySelector('#btn-undo-word').addEventListener('click', () => {
      synth.tap();
      this.state.puzzleProgress.selectedWords.pop();
      this.renderPuzzleMode(scene);
    });

    this.modePanel.querySelector('#btn-reset-puzzle').addEventListener('click', () => {
      synth.tap();
      this.state.puzzleProgress.selectedWords = [];
      this.renderPuzzleMode(scene);
    });

    this.modePanel.querySelector('#btn-check-puzzle').addEventListener('click', () => {
      const fb = this.modePanel.querySelector('#puzzle-feedback');
      const slot = this.modePanel.querySelector('#puzzle-slot');

      const userWords = selectedIndices.map(i => currentPuzzle.scrambledWords[i].hi);
      const isCorrect = userWords.join(' ') === currentPuzzle.correctWords.join(' ');

      if (isCorrect) {
        synth.success();
        this.confetti.burst(30);
        slot.className = 'puzzle-slot-area filled correct';
        fb.className = 'puzzle-feedback show success';
        fb.innerHTML = `
          <strong>🎉 बिल्कुल सही! (Perfect!)</strong><br>
          ${currentPuzzle.fullSentenceHi}
          ${this.state.showEnglish ? `<br><small style="color:var(--text-secondary);">🌐 ${currentPuzzle.fullSentenceEn}</small>` : ''}
        `;

        setTimeout(() => {
          this.state.puzzleProgress.stepIdx++;
          this.state.puzzleProgress.selectedWords = [];
          const d = this.getModuleProgressData('chitra_' + scene.id);
          d.puzzleStepsCompleted = Math.max(d.puzzleStepsCompleted || 0, this.state.puzzleProgress.stepIdx);
          this.evaluateAndAwardStars('chitra_' + scene.id);
          this.renderPuzzleMode(scene);
        }, 1800);

      } else {
        synth.error();
        slot.className = 'puzzle-slot-area filled wrong';
        fb.className = 'puzzle-feedback show wrong';
        fb.innerHTML = `
          <strong>❌ थोड़ा क्रम गलत हो गया (Order is incorrect):</strong><br>
          शब्दों के सही स्थान पर ध्यान दें। पहले कर्ता, फिर कर्म व विशेषण, और अंत में क्रिया आती है।
        `;
      }
    });
  }

  renderWriteMode(scene) {
    const ans = scene.modelAnswer;
    const d = this.getModuleProgressData('chitra_' + scene.id);
    d.modelAnswerRead = true;
    this.evaluateAndAwardStars('chitra_' + scene.id, true);

    this.modePanel.innerHTML = `
      <div class="write-panel">
        <div class="model-answer-card">
          <div class="model-header">
            <h4>🏆 आदर्श उत्तर (Complete 5-7 Sentences Model Answer)</h4>
            <span class="hotspot-counter">CBSE Class 5 परीक्षा प्रारूप</span>
          </div>

          <div class="model-paragraph-hindi">
            ${ans.fullParagraphHi}
          </div>

          ${this.state.showEnglish ? `
            <div class="model-paragraph-english">
              <strong>English Translation:</strong><br>
              ${ans.fullParagraphEn}
            </div>
          ` : ''}

          <div class="rule-summary-card" style="margin-bottom:0; background:rgba(255,255,255,0.02);">
            <h4>💡 परीक्षा में पूरे अंक पाने के टिप्स:</h4>
            <ul style="padding-left: 20px; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.8;">
              ${ans.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="steps-breakdown-list">
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">
            📋 5-स्टेप फॉर्मूला संरचना (Step-by-Step Sentence Analysis):
          </h4>
          ${ans.steps.map(s => `
            <div class="step-item-card">
              <div class="step-badge-mini">${s.num}</div>
              <div class="step-item-content">
                <div class="step-item-role">${s.role}</div>
                <div class="step-item-sentence-hi">${s.hi}</div>
                ${this.state.showEnglish ? `<div class="step-item-sentence-en">🌐 ${s.en}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="student-editor-card">
          <h4>✍️ अपना उत्तर यहाँ लिखकर अभ्यास करें (Student Practice Area):</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">
            ऊपर दिए गए 5 चरणों का पालन करते हुए चित्र देखकर 5 से 7 वाक्य स्वयं लिखें:
          </p>
          <textarea
            class="student-textarea"
            id="student-textarea"
            placeholder="1. यह चित्र ... का है।&#10;2. चित्र में ...&#10;3. बच्चे ...&#10;4. ...&#10;5. अंत में ..."></textarea>
          
          <div class="student-editor-footer">
            <div class="word-counter" id="student-word-counter">शब्द संख्या: 0 शब्द | 0 वाक्य</div>
            <div class="editor-btns">
              <button class="btn" id="btn-copy-text">📋 प्रतिलिपि (Copy)</button>
              <button class="btn btn-primary" id="btn-complete-practice">⭐ अभ्यास पूर्ण किया!</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const textarea = this.modePanel.querySelector('#student-textarea');
    const counter = this.modePanel.querySelector('#student-word-counter');

    if (this.state.chitraDrafts && this.state.chitraDrafts[scene.id]) {
      textarea.value = this.state.chitraDrafts[scene.id];
      const text = textarea.value.trim();
      const words = text ? text.split(/\s+/).length : 0;
      const sentences = text ? (text.match(/[।?!.]/g) || []).length : 0;
      counter.textContent = `शब्द संख्या: ${words} शब्द | ${sentences} वाक्य पूर्ण`;
    }

    textarea.addEventListener('input', () => {
      const text = textarea.value.trim();
      const words = text ? text.split(/\s+/).length : 0;
      const sentences = text ? (text.match(/[।?!.]/g) || []).length : 0;
      counter.textContent = `शब्द संख्या: ${words} शब्द | ${sentences} वाक्य पूर्ण`;
      if (!this.state.chitraDrafts) this.state.chitraDrafts = {};
      this.state.chitraDrafts[scene.id] = textarea.value;
      this.saveAppState();
    });

    this.modePanel.querySelector('#btn-copy-text').addEventListener('click', () => {
      synth.tap();
      if (textarea.value.trim()) {
        navigator.clipboard.writeText(textarea.value);
        this.flash('आपका उत्तर क्लिपबोर्ड पर कॉपी हो गया! (Copied)', 'success');
      } else {
        this.flash('कृपया पहले कुछ वाक्य लिखें! (Please write something)', 'info');
      }
    });

    this.modePanel.querySelector('#btn-complete-practice').addEventListener('click', () => {
      synth.fanfare();
      this.confetti.burst(60);
      const d = this.getModuleProgressData('chitra_' + scene.id);
      d.draftCompleted = true;
      const earnedStars = this.evaluateAndAwardStars('chitra_' + scene.id);
      this.renderSidebarTopics();

      this.resultStars.textContent = `${earnedStars}/10 ⭐`;
      this.resultScore.textContent = '100%';
      this.resultStarsCount.textContent = String(earnedStars);
      this.resultsModal.classList.add('open');
    });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.chitraApp = new HindiLearningApp();
});
