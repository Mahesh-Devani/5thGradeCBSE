/**
 * ==========================================================================
 * GENERAL KNOWLEDGE MASTER (CLASS 5 CBSE / GLOBAL AWARENESS PROGRAM)
 * Application Logic, Audio Synthesizer, State Persistence & Interactive Modes
 * ==========================================================================
 */

// ==========================================================================
// 1. SOUND SYNTHESIZER (Pure Web Audio API — Zero External Assets)
// ==========================================================================
const AudioController = (function() {
  let audioCtx = null;
  let isMuted = false;

  function getContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, type, duration, gainLevel = 0.12) {
    if (isMuted) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  return {
    correct: () => {
      playTone(587.33, "sine", 0.12, 0.15); // D5
      setTimeout(() => playTone(880.00, "sine", 0.25, 0.15), 90); // A5
    },
    wrong: () => {
      playTone(220.00, "sawtooth", 0.15, 0.1);
      setTimeout(() => playTone(185.00, "sawtooth", 0.22, 0.1), 110);
    },
    fanfare: () => {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        setTimeout(() => playTone(freq, "triangle", 0.28, 0.18), i * 110);
      });
    },
    zap: () => {
      if (isMuted) return;
      try {
        const ctx = getContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch (e) {}
    },
    click: () => {
      playTone(600, "sine", 0.04, 0.05);
    },
    tick: () => {
      playTone(400, "sine", 0.05, 0.06);
    },
    toggleMute: () => {
      isMuted = !isMuted;
      return isMuted;
    },
    isMuted: () => isMuted
  };
})();

// ==========================================================================
// 2. CONFETTI CELEBRATION CANVAS
// ==========================================================================
const ConfettiController = (function() {
  const canvas = document.getElementById("confetti-canvas");
  let ctx = null;
  let particles = [];
  let animationFrameId = null;

  function init() {
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize);
  }

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles(count = 90) {
    const colors = ["#f59e0b", "#06b6d4", "#8b5cf6", "#10b981", "#ef4444", "#38bdf8"];
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 300,
        y: window.innerHeight * 0.4 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 1.2) * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        tilt: Math.random() * 10,
        tiltAngle: 0,
        tiltAngleInc: Math.random() * 0.07 + 0.04,
        alpha: 1
      });
    }
  }

  function render() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.tiltAngle += p.tiltAngleInc;
      p.tilt = Math.sin(p.tiltAngle) * 12;
      p.alpha -= 0.009;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.translate(p.x, p.y);
        ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size + p.tilt);
        ctx.fill();
        ctx.restore();
      }
    });

    if (alive) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrameId);
    }
  }

  return {
    init,
    blast: () => {
      if (!canvas) return;
      resize();
      createParticles(100);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      render();
    }
  };
})();

// ==========================================================================
// 3. APPLICATION STATE & PERSISTENCE
// ==========================================================================
const AppState = {
  activeMonth: "june",
  activeMode: "learn",
  activeCategory: "all",
  activeArcadeGame: "game-donald-cipher",

  // In-Progress Quiz Session
  quizSession: {
    month: "june",
    currentIndex: 0,
    answers: {},
    isAnswered: false,
    correctCount: 0,
    wrongCount: 0
  },

  // In-Progress Picture Quiz Session
  pictureSession: {
    month: "june",
    currentIndex: 0,
    answers: {},
    isAnswered: false,
    correctCount: 0
  },

  // Arcade Decoder Progress
  arcadeProgress: {
    cipherSolved: {},
    strikeZapped: {},
    matchedPairs: {}
  },

  // 60-Second Rapid Fire Sprint State
  sprint: {
    isRunning: false,
    timeLeft: 60,
    score: 0,
    streak: 0,
    highestStreak: 0,
    currentQuestion: null,
    usedQuestions: [],
    timerInterval: null
  },

  // Stars Mastered per Month (0-3 each)
  stars: {
    june: 0,
    jul: 0,
    aug: 0
  },

  highScoreSprint: 0
};

const STORAGE_KEYS = {
  ACTIVE_STATE: "cbse5_gk_active_state",
  STARS: "cbse5_gk_stars_v1",
  SPRINT_HIGH: "cbse5_gk_sprint_high_score"
};

function saveState() {
  try {
    const dataToSave = {
      activeMonth: AppState.activeMonth,
      activeMode: AppState.activeMode,
      activeCategory: AppState.activeCategory,
      activeArcadeGame: AppState.activeArcadeGame,
      quizSession: AppState.quizSession,
      pictureSession: AppState.pictureSession,
      arcadeProgress: AppState.arcadeProgress
    };
    localStorage.setItem(STORAGE_KEYS.ACTIVE_STATE, JSON.stringify(dataToSave));
    localStorage.setItem(STORAGE_KEYS.STARS, JSON.stringify(AppState.stars));
    localStorage.setItem(STORAGE_KEYS.SPRINT_HIGH, String(AppState.highScoreSprint));
  } catch (e) {
    console.warn("Storage save error", e);
  }
}

function loadState() {
  try {
    const savedStars = localStorage.getItem(STORAGE_KEYS.STARS);
    if (savedStars) {
      AppState.stars = Object.assign(AppState.stars, JSON.parse(savedStars));
    }

    const savedSprintHigh = localStorage.getItem(STORAGE_KEYS.SPRINT_HIGH);
    if (savedSprintHigh) {
      AppState.highScoreSprint = parseInt(savedSprintHigh, 10) || 0;
    }

    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_STATE);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.activeMonth && GK_DATA.months.some(m => m.id === parsed.activeMonth)) {
        AppState.activeMonth = parsed.activeMonth;
      }
      if (parsed.activeMode) {
        AppState.activeMode = parsed.activeMode;
      }
      if (parsed.activeCategory) {
        AppState.activeCategory = parsed.activeCategory;
      }
      if (parsed.activeArcadeGame) {
        AppState.activeArcadeGame = parsed.activeArcadeGame;
      }
      if (parsed.quizSession && parsed.quizSession.month === AppState.activeMonth) {
        AppState.quizSession = parsed.quizSession;
      }
      if (parsed.pictureSession && parsed.pictureSession.month === AppState.activeMonth) {
        AppState.pictureSession = parsed.pictureSession;
      }
      if (parsed.arcadeProgress) {
        AppState.arcadeProgress = parsed.arcadeProgress;
      }
    }
  } catch (e) {
    console.warn("Storage load error", e);
  }
}

// Flash feedback screen
function flashScreen(type) {
  const el = document.getElementById("feedback-flash");
  if (!el) return;
  el.className = `feedback-flash flash-${type}`;
  setTimeout(() => {
    el.className = "feedback-flash";
  }, 220);
}

// Text to speech helper
function speakText(text) {
  if (!("speechSynthesis" in window)) {
    alert("Speech synthesis is not supported on this browser.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}

// ==========================================================================
// 4. UI INITIALIZATION & EVENT LISTENERS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  ConfettiController.init();

  setupNavigationEvents();
  setupSidebarDrawer();
  updateTopBar();
  updateProgressUI();
  renderCurrentMode();
});

function setupSidebarDrawer() {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  const toggleBtn = document.getElementById("menu-toggle-btn");
  const closeBtn = document.getElementById("sidebar-close-btn");

  function openDrawer() {
    sidebar.classList.add("open");
    backdrop.classList.add("open");
  }

  function closeDrawer() {
    sidebar.classList.remove("open");
    backdrop.classList.remove("open");
  }

  if (toggleBtn) toggleBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
}

function setupNavigationEvents() {
  // Month selector buttons in sidebar
  const monthBtns = document.querySelectorAll(".month-btn");
  monthBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const monthId = btn.dataset.month;
      if (monthId && monthId !== AppState.activeMonth) {
        switchMonth(monthId);
        // On mobile, close drawer after selection
        if (window.innerWidth <= 860) {
          const sidebar = document.getElementById("sidebar");
          const backdrop = document.getElementById("sidebar-backdrop");
          if (sidebar) sidebar.classList.remove("open");
          if (backdrop) backdrop.classList.remove("open");
        }
      }
    });
  });

  // Mode navigation tabs
  const modeTabs = document.querySelectorAll(".mode-tab");
  modeTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const mode = tab.dataset.mode;
      if (mode && mode !== AppState.activeMode) {
        switchMode(mode);
      }
    });
  });

  // Top bar action buttons
  const soundBtn = document.getElementById("btn-sound-toggle");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      const isMuted = AudioController.toggleMute();
      soundBtn.textContent = isMuted ? "🔇" : "🔊";
      soundBtn.title = isMuted ? "Unmute Sound" : "Mute Sound";
    });
  }

  const printBtn = document.getElementById("btn-print");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      switchMode("worksheet");
      setTimeout(() => window.print(), 300);
    });
  }

  const resetBtn = document.getElementById("btn-reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      restartActiveDrill();
    });
  }

  // Modal actions
  const btnRetry = document.getElementById("btn-modal-retry");
  if (btnRetry) {
    btnRetry.addEventListener("click", () => {
      closeModal();
      restartActiveDrill();
    });
  }

  const btnReview = document.getElementById("btn-modal-review");
  if (btnReview) {
    btnReview.addEventListener("click", () => {
      closeModal();
      switchMode("learn");
    });
  }

  const btnCloseModal = document.getElementById("btn-modal-close");
  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", closeModal);
  }
}

function switchMonth(monthId) {
  AppState.activeMonth = monthId;
  AppState.activeCategory = "all";

  // Reset or adjust in-progress sessions for new month
  AppState.quizSession = {
    month: monthId,
    currentIndex: 0,
    answers: {},
    isAnswered: false,
    correctCount: 0,
    wrongCount: 0
  };

  AppState.pictureSession = {
    month: monthId,
    currentIndex: 0,
    answers: {},
    isAnswered: false,
    correctCount: 0
  };

  saveState();
  updateTopBar();
  updateSidebarMonthButtons();
  updateProgressUI();
  renderCurrentMode();
  AudioController.click();
}

function switchMode(mode) {
  AppState.activeMode = mode;
  saveState();
  updateModeTabsUI();
  renderCurrentMode();
  AudioController.click();
}

function restartActiveDrill() {
  if (AppState.activeMode === "quiz") {
    AppState.quizSession = {
      month: AppState.activeMonth,
      currentIndex: 0,
      answers: {},
      isAnswered: false,
      correctCount: 0,
      wrongCount: 0
    };
  } else if (AppState.activeMode === "picture") {
    AppState.pictureSession = {
      month: AppState.activeMonth,
      currentIndex: 0,
      answers: {},
      isAnswered: false,
      correctCount: 0
    };
  } else if (AppState.activeMode === "sprint") {
    stopSprint();
    startSprint();
    return;
  } else if (AppState.activeMode === "arcade") {
    AppState.arcadeProgress = {
      cipherSolved: {},
      strikeZapped: {},
      matchedPairs: {}
    };
  }
  saveState();
  renderCurrentMode();
  AudioController.click();
}

function updateTopBar() {
  const currentMonthData = GK_DATA.months.find(m => m.id === AppState.activeMonth);
  const titleEl = document.getElementById("top-bar-title");
  const subEl = document.getElementById("top-bar-subtitle");

  if (currentMonthData) {
    titleEl.textContent = `${currentMonthData.name} — ${currentMonthData.badge}`;
    subEl.textContent = currentMonthData.themeDescription;
  }
}

function updateSidebarMonthButtons() {
  const monthBtns = document.querySelectorAll(".month-btn");
  monthBtns.forEach(btn => {
    if (btn.dataset.month === AppState.activeMonth) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Render sidebar topics list for active month
  renderSidebarTopics();
}

function updateModeTabsUI() {
  const tabs = document.querySelectorAll(".mode-tab");
  tabs.forEach(tab => {
    if (tab.dataset.mode === AppState.activeMode) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
}

function updateProgressUI() {
  // Update badges for each month
  const juneBadge = document.getElementById("badge-stars-june");
  if (juneBadge) juneBadge.textContent = `⭐ ${AppState.stars.june || 0}/3`;

  const julBadge = document.getElementById("badge-stars-jul");
  if (julBadge) julBadge.textContent = `⭐ ${AppState.stars.jul || 0}/3`;

  const augBadge = document.getElementById("badge-stars-aug");
  if (augBadge) augBadge.textContent = `⭐ ${AppState.stars.aug || 0}/3`;

  const totalEarned = (AppState.stars.june || 0) + (AppState.stars.jul || 0) + (AppState.stars.aug || 0);
  const totalStarsEl = document.getElementById("star-badge-total");
  if (totalStarsEl) totalStarsEl.textContent = `⭐ ${totalEarned} / 9`;

  const pct = Math.round((totalEarned / 9) * 100);
  const fillEl = document.getElementById("progress-fill");
  if (fillEl) fillEl.style.width = `${pct}%`;

  const labelEl = document.getElementById("progress-label");
  if (labelEl) labelEl.textContent = `${pct}% Term 1 GK Mastered`;
}

function renderSidebarTopics() {
  const container = document.getElementById("sidebar-topics");
  if (!container) return;

  const currentMonthTopics = GK_DATA.topics.filter(t => t.monthId === AppState.activeMonth);
  container.innerHTML = currentMonthTopics.map(topic => `
    <button class="sidebar-topic-item" data-topic-id="${topic.id}">
      <span class="sidebar-topic-icon">${topic.icon}</span>
      <span class="sidebar-topic-title">${topic.title}</span>
    </button>
  `).join("");

  container.querySelectorAll(".sidebar-topic-item").forEach(item => {
    item.addEventListener("click", () => {
      const topicId = item.dataset.topicId;
      switchMode("learn");
      setTimeout(() => {
        const el = document.getElementById(`topic-${topicId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.style.boxShadow = "0 0 25px rgba(245, 158, 11, 0.5)";
          setTimeout(() => { el.style.boxShadow = ""; }, 1500);
        }
      }, 150);

      if (window.innerWidth <= 860) {
        document.getElementById("sidebar").classList.remove("open");
        document.getElementById("sidebar-backdrop").classList.remove("open");
      }
    });
  });
}

function renderCurrentMode() {
  updateSidebarMonthButtons();
  updateModeTabsUI();

  const viewport = document.getElementById("content-viewport");
  if (!viewport) return;

  switch (AppState.activeMode) {
    case "learn":
      renderLearnMode(viewport);
      break;
    case "arcade":
      renderArcadeMode(viewport);
      break;
    case "quiz":
      renderQuizMode(viewport);
      break;
    case "picture":
      renderPictureMode(viewport);
      break;
    case "sprint":
      renderSprintMode(viewport);
      break;
    case "worksheet":
      renderWorksheetMode(viewport);
      break;
    default:
      renderLearnMode(viewport);
  }
}

// ==========================================================================
// 5. MODE 1: STORIES & SPARKS (LEARN)
// ==========================================================================
function renderLearnMode(container) {
  const monthData = GK_DATA.months.find(m => m.id === AppState.activeMonth);
  const topics = GK_DATA.topics.filter(t => t.monthId === AppState.activeMonth);

  const categories = [
    { id: "all", label: "✨ All Topics" },
    { id: "pick", label: "🌟 Pick of Month" },
    { id: "global", label: "🚀 Global Lens" },
    { id: "people", label: "👑 Person of Month" },
    { id: "places", label: "🏛️ Wonderful World" },
    { id: "pride", label: "🇮🇳 Pride of India" },
    { id: "curious", label: "🌈 Be Curious" },
    { id: "facts", label: "💡 Quick Facts" }
  ];

  const filteredTopics = AppState.activeCategory === "all"
    ? topics
    : topics.filter(t => t.category === AppState.activeCategory);

  container.innerHTML = `
    <div class="learn-container">
      <div class="month-hero-banner" style="border-left: 5px solid ${monthData.color};">
        <div>
          <span class="banner-badge">${monthData.shortName} Curriculum</span>
          <h2 class="banner-title">${monthData.name}: ${monthData.badge}</h2>
          <p class="banner-sub">${monthData.themeDescription}</p>
        </div>
        <div style="font-size: 3rem;">${topics[0] ? topics[0].icon : "🌍"}</div>
      </div>

      <!-- Category Filter Pills -->
      <div class="category-filter-row">
        ${categories.map(cat => `
          <button class="filter-pill ${AppState.activeCategory === cat.id ? "active" : ""}" data-category="${cat.id}">
            ${cat.label}
          </button>
        `).join("")}
      </div>

      <!-- Topics Cards Grid -->
      <div class="topics-grid">
        ${filteredTopics.map(topic => `
          <article class="topic-card" id="topic-${topic.id}">
            <div class="topic-card-header">
              <div class="topic-card-icon">${topic.icon}</div>
              <div class="topic-card-title-wrap">
                <span class="topic-card-category">${topic.categoryName}</span>
                <h3 class="topic-card-title">${topic.title}</h3>
                <p class="topic-card-tagline">${topic.tagline}</p>
              </div>
            </div>

            <!-- Brain Spark Memory Box (Pedagogical Memory Trick) -->
            <div class="brain-spark-box">
              <div class="brain-spark-header">
                <span class="brain-spark-label">💡 Brain Spark (Remember in 5s)</span>
                <button class="btn-read-aloud" data-speak="${encodeURIComponent(topic.memorySpark.headline + '. ' + topic.memorySpark.hook)}">
                  🔊 Listen
                </button>
              </div>
              <h4 class="brain-spark-headline">${topic.memorySpark.headline}</h4>
              <p class="brain-spark-hook">${topic.memorySpark.hook}</p>
            </div>

            <p style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">${topic.summary}</p>

            <!-- Key Facts -->
            <ul class="topic-facts-list">
              ${topic.keyFacts.map(fact => `<li>${formatBoldText(fact)}</li>`).join("")}
            </ul>

            <!-- Did You Know Box -->
            <div class="did-you-know-box">
              <strong>DID YOU KNOW?</strong> ${topic.didYouKnow}
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  `;

  // Attach filter pill listeners
  container.querySelectorAll(".filter-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      AppState.activeCategory = pill.dataset.category;
      saveState();
      renderLearnMode(container);
      AudioController.click();
    });
  });

  // Attach speech synthesis listeners
  container.querySelectorAll(".btn-read-aloud").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = decodeURIComponent(btn.dataset.speak);
      speakText(text);
      AudioController.click();
    });
  });
}

function formatBoldText(str) {
  return str.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

// ==========================================================================
// 6. MODE 2: CODEBREAKERS & ARCADE MODE
// ==========================================================================
function renderArcadeMode(container) {
  const games = GK_DATA.arcadeGames;
  const activeGame = games.find(g => g.id === AppState.activeArcadeGame) || games[0];

  container.innerHTML = `
    <div class="arcade-container">
      <!-- Arcade Navigation Tabs -->
      <div class="arcade-nav-tabs">
        ${games.map(g => `
          <button class="arcade-tab-btn ${g.id === activeGame.id ? "active" : ""}" data-game-id="${g.id}">
            ${g.title}
          </button>
        `).join("")}
      </div>

      <!-- Active Game View -->
      <div class="arcade-game-card" id="arcade-game-viewport">
        <!-- Rendered by specific game handler -->
      </div>
    </div>
  `;

  // Attach game tab clicks
  container.querySelectorAll(".arcade-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      AppState.activeArcadeGame = btn.dataset.gameId;
      saveState();
      renderArcadeMode(container);
      AudioController.click();
    });
  });

  const gameViewport = document.getElementById("arcade-game-viewport");
  if (!gameViewport) return;

  if (activeGame.type === "cipher") {
    renderCipherGame(gameViewport, activeGame);
  } else if (activeGame.type === "strike") {
    renderStrikeGame(gameViewport, activeGame);
  } else if (activeGame.type === "match") {
    renderMatchGame(gameViewport, activeGame);
  } else if (activeGame.type === "wordhunt") {
    renderWordHuntGame(gameViewport, activeGame);
  }
}

// Game A: Donald Duck Cipher
function renderCipherGame(container, game) {
  container.innerHTML = `
    <div class="arcade-game-header">
      <h3 class="arcade-game-title">${game.title}</h3>
      <p class="arcade-game-instruction">${game.instruction}</p>
      <div style="margin-top: 0.5rem; font-size: 0.82rem; color: var(--accent-amber); font-weight: 700;">
        🔑 Secret Code Cipher: A=1, B=2, C=3, D=4, E=5 ... Z=26
      </div>
    </div>

    <div class="cipher-challenges-list">
      ${game.challenges.map((c, idx) => {
        const isSolved = AppState.arcadeProgress.cipherSolved[c.country];
        return `
          <div class="cipher-challenge-card" id="cipher-card-${idx}">
            <div class="cipher-country">${c.country}</div>
            <div class="cipher-code-display">
              ${c.coded.map(item => item === " "
                ? `<span class="cipher-space"></span>`
                : `<span class="cipher-num-badge">${item}</span>`
              ).join("")}
            </div>

            <div class="cipher-input-row">
              <input type="text"
                class="cipher-input"
                id="cipher-input-${idx}"
                placeholder="Type decoded name..."
                value="${isSolved ? c.solution : ""}"
                ${isSolved ? "disabled" : ""}
              />
              <button class="btn btn-primary btn-check-cipher" data-idx="${idx}" ${isSolved ? "disabled" : ""}>
                ${isSolved ? "✅ Solved!" : "⚡ Crack Code"}
              </button>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.4rem;">
              💡 <em>Clue: ${c.hint}</em>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  container.querySelectorAll(".btn-check-cipher").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.idx, 10);
      const challenge = game.challenges[idx];
      const inputEl = document.getElementById(`cipher-input-${idx}`);
      const val = inputEl.value.trim().toUpperCase();

      if (val === challenge.solution) {
        AudioController.correct();
        flashScreen("correct");
        btn.textContent = "✅ Correct!";
        btn.disabled = true;
        inputEl.disabled = true;
        inputEl.style.borderColor = "var(--color-success)";
        AppState.arcadeProgress.cipherSolved[challenge.country] = true;
        saveState();

        // Check if all solved
        if (Object.keys(AppState.arcadeProgress.cipherSolved).length === game.challenges.length) {
          ConfettiController.blast();
          AudioController.fanfare();
        }
      } else {
        AudioController.wrong();
        flashScreen("wrong");
        inputEl.style.borderColor = "var(--color-danger)";
        setTimeout(() => {
          inputEl.style.borderColor = "";
        }, 800);
      }
    });
  });
}

// Game B: City Laser Strike
function renderStrikeGame(container, game) {
  container.innerHTML = `
    <div class="arcade-game-header">
      <h3 class="arcade-game-title">${game.title}</h3>
      <p class="arcade-game-instruction">${game.instruction}</p>
      <p style="font-size: 0.8rem; color: var(--accent-cyan); margin-top: 0.35rem;">
        ⚡ Tap or click on each number tile to shoot it with your laser gun!
      </p>
    </div>

    <div class="strike-challenges-list">
      ${game.challenges.map((c, cIdx) => {
        const tiles = c.scrambled.split("");
        const isSolved = AppState.arcadeProgress.strikeZapped[c.nickname];

        return `
          <div class="strike-challenge-card" id="strike-card-${cIdx}">
            <div class="strike-nickname">${c.nickname}</div>
            <div class="strike-clue">${c.clue} (State: ${c.state})</div>

            <div class="strike-tiles-row" id="strike-tiles-${cIdx}">
              ${tiles.map((ch, tIdx) => {
                const isDigit = /\d/.test(ch);
                return `
                  <div class="strike-tile ${isDigit ? "is-number" : "is-letter"} ${isSolved && isDigit ? "zapped" : ""}"
                    data-cidx="${cIdx}"
                    data-tidx="${tIdx}"
                    data-char="${ch}"
                    data-digit="${isDigit ? "1" : "0"}">
                    ${ch}
                  </div>
                `;
              }).join("")}
            </div>

            <div style="font-weight: 700; color: ${isSolved ? "var(--color-success)" : "var(--accent-amber)"}; font-size: 0.95rem;">
              Decoded City: <span id="strike-result-${cIdx}">${isSolved ? c.solution : "Zap the numbers..."}</span>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  // Attach laser click handlers
  container.querySelectorAll(".strike-tile.is-number").forEach(tile => {
    tile.addEventListener("click", () => {
      if (tile.classList.contains("zapped")) return;

      AudioController.zap();
      tile.classList.add("zapped");

      const cIdx = parseInt(tile.dataset.cidx, 10);
      const challenge = game.challenges[cIdx];
      const card = document.getElementById(`strike-card-${cIdx}`);
      const remainingNumbers = card.querySelectorAll(".strike-tile.is-number:not(.zapped)");

      if (remainingNumbers.length === 0) {
        AudioController.correct();
        flashScreen("correct");
        document.getElementById(`strike-result-${cIdx}`).innerHTML = `🎉 <strong>${challenge.solution}</strong> (${challenge.state})!`;
        AppState.arcadeProgress.strikeZapped[challenge.nickname] = true;
        saveState();

        if (Object.keys(AppState.arcadeProgress.strikeZapped).length === game.challenges.length) {
          ConfettiController.blast();
          AudioController.fanfare();
        }
      }
    });
  });
}

// Game C: Earth Days Matchmaker
function renderMatchGame(container, game) {
  let selectedDay = null;
  let selectedDate = null;

  container.innerHTML = `
    <div class="arcade-game-header">
      <h3 class="arcade-game-title">${game.title}</h3>
      <p class="arcade-game-instruction">${game.instruction}</p>
    </div>

    <div class="match-pairs-container">
      <div class="match-column" id="match-days-col">
        <h4 style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase;">1. Special Earth Day</h4>
        ${game.pairs.map(p => `
          <div class="match-card ${AppState.arcadeProgress.matchedPairs[p.day] ? "matched" : ""}" data-day="${p.day}">
            ${p.day}
          </div>
        `).join("")}
      </div>

      <div class="match-column" id="match-dates-col">
        <h4 style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase;">2. Calendar Date</h4>
        ${[...game.pairs].sort(() => Math.random() - 0.5).map(p => `
          <div class="match-card ${Object.values(AppState.arcadeProgress.matchedPairs).includes(p.date) ? "matched" : ""}" data-date="${p.date}">
            📅 ${p.date}
          </div>
        `).join("")}
      </div>
    </div>
  `;

  const dayCards = container.querySelectorAll("#match-days-col .match-card");
  const dateCards = container.querySelectorAll("#match-dates-col .match-card");

  function checkMatch() {
    if (!selectedDay || !selectedDate) return;
    const pair = game.pairs.find(p => p.day === selectedDay.dataset.day);

    if (pair && pair.date === selectedDate.dataset.date) {
      AudioController.correct();
      flashScreen("correct");
      selectedDay.classList.remove("selected");
      selectedDate.classList.remove("selected");
      selectedDay.classList.add("matched");
      selectedDate.classList.add("matched");

      AppState.arcadeProgress.matchedPairs[pair.day] = pair.date;
      saveState();

      if (Object.keys(AppState.arcadeProgress.matchedPairs).length === game.pairs.length) {
        ConfettiController.blast();
        AudioController.fanfare();
      }
    } else {
      AudioController.wrong();
      flashScreen("wrong");
      selectedDay.classList.remove("selected");
      selectedDate.classList.remove("selected");
    }

    selectedDay = null;
    selectedDate = null;
  }

  dayCards.forEach(card => {
    card.addEventListener("click", () => {
      if (card.classList.contains("matched")) return;
      dayCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedDay = card;
      AudioController.click();
      if (selectedDate) checkMatch();
    });
  });

  dateCards.forEach(card => {
    card.addEventListener("click", () => {
      if (card.classList.contains("matched")) return;
      dateCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedDate = card;
      AudioController.click();
      if (selectedDay) checkMatch();
    });
  });
}

// Game D: Vietnamese Puppetry Word Hunt
function renderWordHuntGame(container, game) {
  container.innerHTML = `
    <div class="arcade-game-header">
      <h3 class="arcade-game-title">${game.title}</h3>
      <p class="arcade-game-instruction">${game.instruction}</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem;">
      ${game.words.map(w => `
        <div style="background: rgba(255, 255, 255, 0.05); border: var(--border-glass); border-radius: var(--radius-md); padding: 1.25rem;">
          <h4 style="font-size: 1.15rem; color: var(--accent-amber); font-weight: 800; letter-spacing: 0.05em; margin-bottom: 0.35rem;">
            🔍 ${w.word}
          </h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">
            ${w.meaning}
          </p>
        </div>
      `).join("")}
    </div>
  `;
}

// ==========================================================================
// 7. MODE 3: MONTHLY QUIZ (10 QUESTIONS DIRECT FROM BOOKLETS)
// ==========================================================================
function renderQuizMode(container) {
  const quizList = GK_DATA.quizzes[AppState.activeMonth] || GK_DATA.quizzes.june;
  const session = AppState.quizSession;

  if (session.month !== AppState.activeMonth) {
    session.month = AppState.activeMonth;
    session.currentIndex = 0;
    session.answers = {};
    session.isAnswered = false;
    session.correctCount = 0;
    session.wrongCount = 0;
  }

  const currentQ = quizList[session.currentIndex];
  const isLastQuestion = session.currentIndex === quizList.length - 1;
  const answeredChoice = session.answers[session.currentIndex];
  const isAnswered = answeredChoice !== undefined;

  container.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-header-card">
        <div class="quiz-header-info">
          <h3>Monthly Pull-out Quick Quiz</h3>
          <p>Classroom practice questions from the official ${GK_DATA.months.find(m => m.id === AppState.activeMonth).name} booklet</p>
        </div>
        <div class="quiz-progress-text">
          Question ${session.currentIndex + 1} of ${quizList.length}
        </div>
      </div>

      <div class="question-card">
        <div class="question-badge-row">
          <span class="question-num-badge">Question #${session.currentIndex + 1}</span>
          <span style="font-size: 0.8rem; color: var(--text-secondary);">Score: ${session.correctCount} / ${quizList.length}</span>
        </div>

        <h3 class="question-text">${currentQ.question}</h3>

        <div class="options-grid">
          ${currentQ.options.map((opt, optIdx) => {
            let stateClass = "";
            if (isAnswered) {
              if (optIdx === currentQ.answer) {
                stateClass = "correct";
              } else if (optIdx === answeredChoice) {
                stateClass = "wrong";
              }
            }
            return `
              <button class="option-btn ${stateClass}" data-opt-idx="${optIdx}" ${isAnswered ? "disabled" : ""}>
                <span class="option-letter">${String.fromCharCode(65 + optIdx)}</span>
                <span>${opt}</span>
              </button>
            `;
          }).join("")}
        </div>

        <!-- Explanation Card (Pedagogy diagnostic feedback) -->
        ${isAnswered ? `
          <div class="explanation-card">
            <span class="explanation-title">💡 Why This Answer Is Correct</span>
            <p class="explanation-text">${currentQ.explanation}</p>
          </div>
        ` : ""}

        <div class="quiz-action-bar">
          <button class="btn btn-secondary" id="btn-quiz-prev" ${session.currentIndex === 0 ? "disabled" : ""}>
            ← Previous
          </button>

          ${isAnswered ? `
            <button class="btn btn-primary" id="btn-quiz-next">
              ${isLastQuestion ? "🏆 View Final Score" : "Next Question →"}
            </button>
          ` : `
            <span style="font-size: 0.8rem; color: var(--text-muted);">Choose an option to continue</span>
          `}
        </div>
      </div>
    </div>
  `;

  // Attach option clicks
  container.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (isAnswered) return;
      const chosen = parseInt(btn.dataset.optIdx, 10);
      session.answers[session.currentIndex] = chosen;

      if (chosen === currentQ.answer) {
        session.correctCount++;
        AudioController.correct();
        flashScreen("correct");
      } else {
        session.wrongCount++;
        AudioController.wrong();
        flashScreen("wrong");
      }

      saveState();
      renderQuizMode(container);
    });
  });

  // Previous button
  const prevBtn = document.getElementById("btn-quiz-prev");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (session.currentIndex > 0) {
        session.currentIndex--;
        saveState();
        renderQuizMode(container);
        AudioController.click();
      }
    });
  }

  // Next / Finish button
  const nextBtn = document.getElementById("btn-quiz-next");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (isLastQuestion) {
        finishQuiz(quizList.length);
      } else {
        session.currentIndex++;
        saveState();
        renderQuizMode(container);
        AudioController.click();
      }
    });
  }
}

function finishQuiz(totalQuestions) {
  const session = AppState.quizSession;
  const correct = session.correctCount;
  const accuracy = Math.round((correct / totalQuestions) * 100);

  let starsEarned = 1;
  if (accuracy >= 90) starsEarned = 3;
  else if (accuracy >= 70) starsEarned = 2;

  // Save stars if higher
  if (starsEarned > (AppState.stars[AppState.activeMonth] || 0)) {
    AppState.stars[AppState.activeMonth] = starsEarned;
  }
  saveState();
  updateProgressUI();

  if (starsEarned === 3) {
    ConfettiController.blast();
    AudioController.fanfare();
  } else {
    AudioController.correct();
  }

  showResultsModal({
    emoji: starsEarned === 3 ? "🏆" : "🌟",
    title: starsEarned === 3 ? "Outstanding Detective Thinking!" : "Great Job Practicing!",
    stars: "⭐".repeat(starsEarned),
    message: `You scored ${correct} out of ${totalQuestions} in the ${GK_DATA.months.find(m => m.id === AppState.activeMonth).name} Quick Quiz!`,
    correct,
    total: totalQuestions,
    accuracy: `${accuracy}%`
  });
}

// ==========================================================================
// 8. MODE 4: PICTURE QUIZ ROUNDS (4 PER MONTH)
// ==========================================================================
function renderPictureMode(container) {
  const picList = GK_DATA.pictureQuizzes[AppState.activeMonth] || GK_DATA.pictureQuizzes.june;
  const session = AppState.pictureSession;

  if (session.month !== AppState.activeMonth) {
    session.month = AppState.activeMonth;
    session.currentIndex = 0;
    session.answers = {};
    session.isAnswered = false;
    session.correctCount = 0;
  }

  container.innerHTML = `
    <div class="learn-container">
      <div class="quiz-header-card">
        <div class="quiz-header-info">
          <h3>Visual Picture Identification Round</h3>
          <p>Deduce the real-world events, landmarks, artifacts, and personalities from the visual clues</p>
        </div>
        <div class="quiz-progress-text">
          4 Visual Clues • ${GK_DATA.months.find(m => m.id === AppState.activeMonth).name}
        </div>
      </div>

      <div class="picture-quiz-grid">
        ${picList.map((item, idx) => {
          const answered = session.answers[idx];
          const isAnswered = answered !== undefined;

          return `
            <div class="picture-card">
              <div class="picture-badge-graphic">
                <span>${item.imageBadge}</span>
              </div>

              <div>
                <span class="topic-card-category">Picture Clue #${idx + 1}</span>
                <h4 class="picture-prompt">${item.prompt}</h4>
              </div>

              <div class="options-grid">
                ${item.options.map((opt, optIdx) => {
                  let cls = "";
                  if (isAnswered) {
                    if (optIdx === item.answer) cls = "correct";
                    else if (optIdx === answered) cls = "wrong";
                  }
                  return `
                    <button class="option-btn ${cls}" data-qidx="${idx}" data-oidx="${optIdx}" ${isAnswered ? "disabled" : ""}>
                      <span class="option-letter">${String.fromCharCode(65 + optIdx)}</span>
                      <span>${opt}</span>
                    </button>
                  `;
                }).join("")}
              </div>

              ${isAnswered ? `
                <div class="explanation-card">
                  <span class="explanation-title">💡 Visual Clue Revelation</span>
                  <p class="explanation-text">${item.explanation}</p>
                </div>
              ` : ""}
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  container.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const qIdx = parseInt(btn.dataset.qidx, 10);
      const oIdx = parseInt(btn.dataset.oidx, 10);
      const item = picList[qIdx];

      session.answers[qIdx] = oIdx;
      if (oIdx === item.answer) {
        session.correctCount++;
        AudioController.correct();
        flashScreen("correct");
      } else {
        AudioController.wrong();
        flashScreen("wrong");
      }

      saveState();
      renderPictureMode(container);

      // Check if all 4 completed
      if (Object.keys(session.answers).length === picList.length) {
        if (session.correctCount === 4) {
          ConfettiController.blast();
          AudioController.fanfare();
        }
      }
    });
  });
}

// ==========================================================================
// 9. MODE 5: 60-SECOND RAPID FIRE SPRINT
// ==========================================================================
function renderSprintMode(container) {
  if (!AppState.sprint.isRunning && !AppState.sprint.currentQuestion) {
    container.innerHTML = `
      <div class="sprint-container">
        <div style="text-align: center; padding: 2.5rem 1.5rem; background: var(--bg-card); border: var(--border-glass); border-radius: var(--radius-xl);">
          <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">⚡</div>
          <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem;">60-Second GK Rapid Fire Sprint</h2>
          <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.5rem auto;">
            Race against the ticking countdown! Answer as many questions as you can from June, July, and August. Maintain answer streaks for combo points!
          </p>

          <div style="display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 2rem;">
            <div class="result-stat-item" style="min-width: 140px;">
              <div class="stat-num text-amber">${AppState.highScoreSprint}</div>
              <div class="stat-label">Personal Best</div>
            </div>
            <div class="result-stat-item" style="min-width: 140px;">
              <div class="stat-num">60s</div>
              <div class="stat-label">Time Limit</div>
            </div>
          </div>

          <button class="btn btn-primary" id="btn-start-sprint" style="font-size: 1.1rem; padding: 0.85rem 2.5rem;">
            🚀 Start 60s Sprint
          </button>
        </div>
      </div>
    `;

    document.getElementById("btn-start-sprint").addEventListener("click", () => {
      startSprint();
      renderSprintMode(container);
    });
    return;
  }

  const q = AppState.sprint.currentQuestion;
  if (!q) return;

  container.innerHTML = `
    <div class="sprint-container">
      <div class="sprint-hud">
        <div class="sprint-timer-wrap">
          <span class="sprint-timer-icon">⏱️</span>
          <span class="sprint-timer-val" id="sprint-timer-display">${AppState.sprint.timeLeft}s</span>
        </div>

        <div class="sprint-score-wrap">
          <span class="sprint-streak-badge ${AppState.sprint.streak >= 2 ? "visible" : ""}">
            🔥 Combo ×${AppState.sprint.streak}
          </span>
          <span class="sprint-score-val">Score: ${AppState.sprint.score}</span>
        </div>
      </div>

      <div class="question-card">
        <h3 class="question-text">${q.question}</h3>

        <div class="options-grid">
          ${q.options.map((opt, optIdx) => `
            <button class="option-btn sprint-option-btn" data-opt-idx="${optIdx}">
              <span class="option-letter">${String.fromCharCode(65 + optIdx)}</span>
              <span>${opt}</span>
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll(".sprint-option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.optIdx, 10);
      handleSprintAnswer(idx === q.answer);
    });
  });
}

function startSprint() {
  AppState.sprint.isRunning = true;
  AppState.sprint.timeLeft = 60;
  AppState.sprint.score = 0;
  AppState.sprint.streak = 0;
  AppState.sprint.highestStreak = 0;
  AppState.sprint.usedQuestions = [];

  // Pool all questions from June, July, and August
  const pool = [
    ...GK_DATA.quizzes.june,
    ...GK_DATA.quizzes.jul,
    ...GK_DATA.quizzes.aug
  ];
  AppState.sprint.pool = pool.sort(() => Math.random() - 0.5);

  nextSprintQuestion();

  if (AppState.sprint.timerInterval) clearInterval(AppState.sprint.timerInterval);
  AppState.sprint.timerInterval = setInterval(() => {
    AppState.sprint.timeLeft--;
    const display = document.getElementById("sprint-timer-display");
    if (display) display.textContent = `${AppState.sprint.timeLeft}s`;

    if (AppState.sprint.timeLeft <= 5) {
      AudioController.tick();
    }

    if (AppState.sprint.timeLeft <= 0) {
      endSprint();
    }
  }, 1000);
}

function nextSprintQuestion() {
  if (!AppState.sprint.pool || AppState.sprint.pool.length === 0) {
    // Reshuffle pool
    AppState.sprint.pool = [
      ...GK_DATA.quizzes.june,
      ...GK_DATA.quizzes.jul,
      ...GK_DATA.quizzes.aug
    ].sort(() => Math.random() - 0.5);
  }
  AppState.sprint.currentQuestion = AppState.sprint.pool.pop();
}

function handleSprintAnswer(isCorrect) {
  if (isCorrect) {
    AppState.sprint.streak++;
    if (AppState.sprint.streak > AppState.sprint.highestStreak) {
      AppState.sprint.highestStreak = AppState.sprint.streak;
    }
    const bonus = AppState.sprint.streak >= 3 ? 2 : 1;
    AppState.sprint.score += bonus * 10;
    AudioController.correct();
    flashScreen("correct");
  } else {
    AppState.sprint.streak = 0;
    AudioController.wrong();
    flashScreen("wrong");
  }

  nextSprintQuestion();
  const viewport = document.getElementById("content-viewport");
  if (viewport) renderSprintMode(viewport);
}

function endSprint() {
  clearInterval(AppState.sprint.timerInterval);
  AppState.sprint.isRunning = false;
  AppState.sprint.currentQuestion = null;

  const score = AppState.sprint.score;
  const isNewHigh = score > AppState.highScoreSprint;
  if (isNewHigh) {
    AppState.highScoreSprint = score;
    saveState();
  }

  AudioController.fanfare();
  ConfettiController.blast();

  showResultsModal({
    emoji: "⚡",
    title: isNewHigh ? "New Personal High Score!" : "Sprint Completed!",
    stars: "⭐".repeat(score >= 100 ? 3 : score >= 50 ? 2 : 1),
    message: `You earned ${score} points with a max combo of ${AppState.sprint.highestStreak}x in 60 seconds!`,
    correct: score / 10,
    total: 60,
    accuracy: `${AppState.sprint.highestStreak}x Streak`
  });

  const viewport = document.getElementById("content-viewport");
  if (viewport) renderSprintMode(viewport);
}

function stopSprint() {
  if (AppState.sprint.timerInterval) clearInterval(AppState.sprint.timerInterval);
  AppState.sprint.isRunning = false;
  AppState.sprint.currentQuestion = null;
}

// ==========================================================================
// 10. MODE 6: PRINTABLE SCHOOL WORKSHEETS
// ==========================================================================
function renderWorksheetMode(container) {
  const currentMonthData = GK_DATA.months.find(m => m.id === AppState.activeMonth);
  const quiz = GK_DATA.quizzes[AppState.activeMonth] || GK_DATA.quizzes.june;
  const picQuiz = GK_DATA.pictureQuizzes[AppState.activeMonth] || GK_DATA.pictureQuizzes.june;

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div class="no-print" style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); border: var(--border-glass); border-radius: var(--radius-md); padding: 0.85rem 1.25rem;">
        <div>
          <h4 style="font-size: 0.95rem; font-weight: 700;">Print-Ready Monochrome Worksheet</h4>
          <p style="font-size: 0.78rem; color: var(--text-secondary);">Formatted for standard A4 paper with student and teacher mark boxes</p>
        </div>
        <div style="display: flex; gap: 0.6rem;">
          <button class="btn btn-secondary" id="btn-toggle-ws-answers">
            👁️ Toggle Answer Key
          </button>
          <button class="btn btn-primary" onclick="window.print()">
            🖨️ Print Sheet
          </button>
        </div>
      </div>

      <div class="worksheet-preview-container">
        <div class="ws-header">
          <div class="ws-school-title">CBSE CLASS 5 — GENERAL KNOWLEDGE</div>
          <div class="ws-sub-title">Monthly Assessment: ${currentMonthData.name} Edition</div>
          <div class="ws-meta-row">
            <span>Subject: General Awareness</span>
            <span>Time Allowed: 30 Mins</span>
            <span>Max Marks: 14</span>
          </div>
        </div>

        <div class="ws-student-info">
          <div>Name: <span class="ws-info-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
          <div>Class / Sec: <span class="ws-info-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
          <div>Roll No: <span class="ws-info-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
        </div>

        <!-- Section A: Quick Quiz -->
        <div class="ws-section-title">SECTION A: GENERAL AWARENESS (10 × 1 = 10 MARKS)</div>
        <p style="font-size: 0.85rem; margin-bottom: 0.75rem; font-style: italic;">Choose the correct option and mark [✓] in the box.</p>

        ${quiz.map((q, idx) => `
          <div class="ws-q-item">
            <strong>Q${idx + 1}.</strong> ${q.question}
            <div class="ws-options-line">
              ${q.options.map(opt => `<span>[ &nbsp; ] ${opt}</span>`).join("")}
            </div>
          </div>
        `).join("")}

        <!-- Section B: Visual Clues -->
        <div class="ws-section-title">SECTION B: VISUAL & IDENTIFICATION ROUND (4 × 1 = 4 MARKS)</div>
        ${picQuiz.map((p, idx) => `
          <div class="ws-q-item">
            <strong>Q${idx + 11}.</strong> ${p.prompt}
            <div class="ws-options-line">
              ${p.options.map(opt => `<span>[ &nbsp; ] ${opt}</span>`).join("")}
            </div>
          </div>
        `).join("")}

        <div class="ws-answer-key" id="ws-answer-key-box" style="display: none;">
          <h4 style="font-weight: bold; margin-bottom: 0.4rem;">TEACHER'S ANSWER KEY:</h4>
          <ol style="margin-left: 1.5rem; line-height: 1.5;">
            ${quiz.map(q => `<li><strong>${q.options[q.answer]}</strong></li>`).join("")}
            ${picQuiz.map(p => `<li><strong>${p.options[p.answer]}</strong></li>`).join("")}
          </ol>
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 2.5rem; font-size: 0.9rem;">
          <div>Student Signature: _______________</div>
          <div>Teacher's Signature & Marks: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 14 ]</div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("btn-toggle-ws-answers").addEventListener("click", () => {
    const keyBox = document.getElementById("ws-answer-key-box");
    if (keyBox) {
      const isHidden = keyBox.style.display === "none";
      keyBox.style.display = isHidden ? "block" : "none";
    }
  });
}

// ==========================================================================
// 11. RESULTS MODAL CONTROLLER
// ==========================================================================
function showResultsModal(data) {
  const modal = document.getElementById("results-modal");
  if (!modal) return;

  document.getElementById("result-emoji").textContent = data.emoji || "🏆";
  document.getElementById("result-title").textContent = data.title;
  document.getElementById("result-stars").textContent = data.stars;
  document.getElementById("result-message").textContent = data.message;
  document.getElementById("result-correct").textContent = data.correct;
  document.getElementById("result-total").textContent = data.total;
  document.getElementById("result-accuracy").textContent = data.accuracy;

  modal.classList.add("open");
}

function closeModal() {
  const modal = document.getElementById("results-modal");
  if (modal) modal.classList.remove("open");
}
