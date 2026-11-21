/**
 * Maths Master — Class 5 CBSE
 * Topic 6: Multiplication Tables (1 to 20) — Speed Master & Mental Math Engine
 * Interactive 20×20 Matrix, Split-and-Add Hammer, Vedic Teen Tricks, Speed Sprint & Worksheets
 * Zero External Dependencies (Vanilla ES6+ JS)
 */

'use strict';

const _G_TABLES = (typeof window !== 'undefined' ? window : this);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ==========================================================================
   DYNAMIC MULTIPLICATION QUESTION GENERATION ENGINE (TOPIC 6)
   - Zero prefilled answers memorization: random numbers generated on-the-fly
   - Distractors created based on real student calculation traps
   - Step-by-step metacognitive explanations
   ========================================================================== */



function shuffleOptionsAndGetCorrect(correctVal, distractorArray) {
  const validDistractors = [];
  const seen = new Set([correctVal]);
  for (const d of distractorArray) {
    if (d > 0 && !seen.has(d)) {
      seen.add(d);
      validDistractors.push(d);
    }
    if (validDistractors.length === 3) break;
  }
  let offset = 2;
  while (validDistractors.length < 3) {
    const fallback = correctVal + (Math.random() < 0.5 ? offset : -offset);
    if (fallback > 0 && !seen.has(fallback)) {
      seen.add(fallback);
      validDistractors.push(fallback);
    }
    offset += 2;
  }

  const all = [correctVal, ...validDistractors].sort(() => Math.random() - 0.5);
  return {
    options: all.map(String),
    correct: all.indexOf(correctVal)
  };
}

function generateDynamicTableQuestion(skill = 'all') {
  let selectedSkill = skill;
  if (selectedSkill === 'all') {
    selectedSkill = getRandomChoice([
      'split_mental_math',
      'vedic_sprint',
      'foundational_teens',
      'tricky_teens',
      'missing_multipliers',
      'word_problems'
    ]);
  }

  const id = 'dyn_tbl_' + Date.now() + '_' + Math.floor(Math.random() * 100000);

  if (selectedSkill === 'split_mental_math') {
    const teen = getRandomChoice([12, 13, 14, 16, 17, 18, 19]);
    const multiplier = getRandomChoice([3, 4, 6, 7, 8, 9]);
    const tensProd = 10 * multiplier;
    const unitDigit = teen - 10;
    const unitProd = unitDigit * multiplier;
    const correctVal = teen * multiplier;

    const distractors = [
      correctVal + 10,
      correctVal - 10,
      tensProd + ((unitDigit - 1) * multiplier),
      correctVal + unitDigit
    ];
    const { options, correct } = shuffleOptionsAndGetCorrect(correctVal, distractors);

    return {
      id,
      skill: 'split_mental_math',
      type: 'mcq',
      question: `Using the <strong>Split-and-Add Hammer</strong>, calculate:<br><span style="font-size: 1.4rem; color: var(--accent-amber-light); font-weight:800;">${teen} × ${multiplier}</span><br><small style="color:var(--text-muted);">Mental Split: (${10} × ${multiplier}) + (${unitDigit} × ${multiplier}) = ${tensProd} + ${unitProd} = ?</small>`,
      options,
      correct,
      explanation: `💡 <strong>The Split-and-Add Hammer:</strong><br>1. Break ${teen} into 10 + ${unitDigit}.<br>2. 10 × ${multiplier} = <strong>${tensProd}</strong>.<br>3. ${unitDigit} × ${multiplier} = <strong>${unitProd}</strong>.<br>4. Add together: ${tensProd} + ${unitProd} = <strong>${correctVal}</strong>.<br>🎯 <em>Unit-digit check:</em> ${unitDigit} × ${multiplier} ends in ${unitProd % 10}, so the total product must end in <strong>${unitProd % 10}</strong>!`,
      source: 'Mental Split & Add Drill'
    };
  }

  if (selectedSkill === 'vedic_sprint') {
    const a = getRandomChoice([11, 12, 13, 14, 15, 16, 17, 18, 19]);
    const b = getRandomChoice([11, 12, 13, 14, 15, 16, 17, 18, 19]);
    const u1 = a % 10;
    const u2 = b % 10;
    const step1 = (a + u2) * 10;
    const step2 = u1 * u2;
    const correctVal = a * b;

    const distractors = [
      step1 + u1 + u2,
      correctVal + 10,
      correctVal - 10,
      (a + u1) * 10 + step2
    ];
    const { options, correct } = shuffleOptionsAndGetCorrect(correctVal, distractors);

    return {
      id,
      skill: 'vedic_sprint',
      type: 'mcq',
      question: `<strong>Vedic Teen × Teen 2-Second Solver:</strong><br><span style="font-size: 1.4rem; color: #818cf8; font-weight:800;">${a} × ${b}</span><br><small style="color:var(--text-muted);">Step 1: (${a} + ${u2}) × 10 = ${step1} &nbsp;|&nbsp; Step 2: ${u1} × ${u2} = ${step2}</small>`,
      options,
      correct,
      explanation: `⚡ <strong>Vedic Base-10 2-Step Method:</strong><br>1. First number + unit of second: ${a} + ${u2} = ${a + u2}. Multiply by 10 ➔ <strong>${step1}</strong>.<br>2. Multiply units together: ${u1} × ${u2} = <strong>${step2}</strong>.<br>3. Combine: ${step1} + ${step2} = <strong>${correctVal}</strong>!`,
      source: 'Vedic Math Speed Shortcut'
    };
  }

  if (selectedSkill === 'foundational_teens') {
    const teen = getRandomChoice([11, 12, 15, 20]);
    const mult = getRandomInt(3, 12);
    const correctVal = teen * mult;

    const distractors = [
      correctVal + teen,
      correctVal - teen,
      correctVal + 10,
      (teen === 15) ? (10 * mult + mult) : (correctVal + 5)
    ];
    const { options, correct } = shuffleOptionsAndGetCorrect(correctVal, distractors);

    let trickNote = '';
    if (teen === 15) trickNote = `Clock half trick: 10 × ${mult} = ${10 * mult}, plus half of that (${(10 * mult) / 2}) = ${correctVal}!`;
    else if (teen === 12) trickNote = `Dozen split: (10 × ${mult}) + (2 × ${mult}) = ${10 * mult} + ${2 * mult} = ${correctVal}.`;
    else if (teen === 11) trickNote = `Twin digit rule: 11 × ${mult} = ${correctVal}.`;
    else trickNote = `20 is Double 10: 2 × ${mult} = ${2 * mult}, then add a 0 ➔ ${correctVal}.`;

    return {
      id,
      skill: 'foundational_teens',
      type: 'mcq',
      question: `Friendly Teen Quick Drill:<br><span style="font-size: 1.4rem; color: #34d399; font-weight:800;">${teen} × ${mult} = ______</span>`,
      options,
      correct,
      explanation: `🐣 <strong>Quick Mental Shortcut:</strong><br>${trickNote}`,
      source: 'Friendly Teen Tables (11, 12, 15, 20)'
    };
  }

  if (selectedSkill === 'tricky_teens') {
    const teen = getRandomChoice([13, 14, 16, 17, 18, 19]);
    const mult = getRandomInt(3, 12);
    const correctVal = teen * mult;

    const distractors = [
      correctVal + teen,
      correctVal - teen,
      (mult * 10) + ((teen % 10) * (mult - 1)),
      correctVal + (correctVal % 2 === 0 ? 1 : 2)
    ];
    const { options, correct } = shuffleOptionsAndGetCorrect(correctVal, distractors);

    let specialTip = '';
    if (teen === 19) specialTip = `19s Trick: (20 × ${mult}) − ${mult} = ${20 * mult} − ${mult} = ${correctVal}!`;
    else if (teen === 18) specialTip = `18s Trick: (20 × ${mult}) − (2 × ${mult}) = ${20 * mult} − ${2 * mult} = ${correctVal}!`;
    else if (teen === 14) specialTip = `Double the 7s table: (7 × ${mult}) × 2 = ${7 * mult} × 2 = ${correctVal}!`;
    else if (teen === 16) specialTip = `Double the 8s table: (8 × ${mult}) × 2 = ${8 * mult} × 2 = ${correctVal}!`;
    else specialTip = `Split & Add: (10 × ${mult}) + (${teen - 10} × ${mult}) = ${10 * mult} + ${(teen - 10) * mult} = ${correctVal}.`;

    return {
      id,
      skill: 'tricky_teens',
      type: 'mcq',
      question: `Tricky Teen Flash Sprint:<br><span style="font-size: 1.4rem; color: #f59e0b; font-weight:800;">${teen} × ${mult} = ______</span>`,
      options,
      correct,
      explanation: `🔥 <strong>Mental Fast-Track:</strong><br>${specialTip}<br>Unit digit check: ${teen % 10} × ${mult % 10} ends in ${(teen * mult) % 10}.`,
      source: 'Tricky Teen Tables (13, 14, 16, 17, 18, 19)'
    };
  }

  if (selectedSkill === 'missing_multipliers') {
    const teen = getRandomChoice([12, 13, 14, 15, 16, 17, 18, 19]);
    const mult = getRandomInt(3, 10);
    const prod = teen * mult;

    const isDivision = Math.random() < 0.5;
    let questionText = '';
    let correctVal = 0;
    let distractors = [];

    if (isDivision) {
      questionText = `Find the inverse quotient:<br><span style="font-size: 1.4rem; color: #38bdf8; font-weight:800;">${prod} ÷ ${teen} = ______</span>`;
      correctVal = mult;
      distractors = [mult + 1, mult - 1, mult + 2, mult - 2];
    } else {
      questionText = `Fill in the missing multiplier factor:<br><span style="font-size: 1.4rem; color: #38bdf8; font-weight:800;">${teen} × ______ = ${prod}</span>`;
      correctVal = mult;
      distractors = [mult + 1, mult - 1, mult + 2, mult + 3];
    }

    const { options, correct } = shuffleOptionsAndGetCorrect(correctVal, distractors);

    return {
      id,
      skill: 'missing_multipliers',
      type: 'mcq',
      question: questionText,
      options,
      correct,
      explanation: `🔍 <strong>Division is the Inverse of Multiplication!</strong><br>Since ${teen} × <strong>${mult}</strong> = ${prod}, it follows that ${prod} ÷ ${teen} = <strong>${mult}</strong>.<br><em>Unit digit clue:</em> What digit multiplied by ${teen % 10} gives a unit digit of ${prod % 10}? Only ${mult} satisfies this!`,
      source: 'Missing Multipliers & Inverse Division'
    };
  }

  // word_problems
  const scenarios = [
    {
      item: 'notebooks',
      rate: getRandomChoice([14, 16, 18, 19]),
      qty: getRandomInt(5, 12),
      context: 'A student bought packets of notebooks for school'
    },
    {
      item: 'mangoes',
      rate: getRandomChoice([13, 15, 17, 18]),
      qty: getRandomInt(6, 11),
      context: 'A fruit merchant packed identical crates of Alphonso mangoes'
    },
    {
      item: 'children',
      rate: getRandomChoice([14, 15, 16, 18]),
      qty: getRandomInt(5, 9),
      context: 'For an inter-school CBSE sports rally, students traveled in school vans'
    },
    {
      item: 'stickers',
      rate: getRandomChoice([12, 13, 17, 19]),
      qty: getRandomInt(7, 12),
      context: 'An art teacher distributed sheets of shiny reward stars'
    }
  ];

  const sc = getRandomChoice(scenarios);
  const correctVal = sc.rate * sc.qty;
  const distractors = [
    correctVal + sc.rate,
    correctVal - sc.rate,
    correctVal + 10,
    correctVal - 10
  ];
  const { options, correct } = shuffleOptionsAndGetCorrect(correctVal, distractors);

  return {
    id,
    skill: 'word_problems',
    type: 'mcq',
    question: `🌍 <strong>Real-Life Speed Problem:</strong><br>${sc.context}. If there are <strong>${sc.qty}</strong> groups and each contains <strong>${sc.rate}</strong> ${sc.item}, how many total ${sc.item} are there in all?`,
    options,
    correct,
    explanation: `🌍 <strong>Word Problem Solution:</strong><br>Total = Groups × Rate = ${sc.qty} × ${sc.rate}.<br>Mental split: (${sc.qty} × 10) + (${sc.qty} × ${sc.rate - 10}) = ${sc.qty * 10} + ${sc.qty * (sc.rate - 10)} = <strong>${correctVal} ${sc.item}</strong>.`,
    source: 'CBSE Applied Word Problems'
  };
}

function generateTablesPracticeQueue(filter = 'all', count = 25) {
  const queue = [];
  for (let i = 0; i < count; i++) {
    queue.push(generateDynamicTableQuestion(filter));
  }
  return queue;
}

function generateDynamicChallengePool(count = 10) {
  const pool = [];
  const skills = ['split_mental_math', 'vedic_sprint', 'tricky_teens', 'missing_multipliers'];
  for (let i = 0; i < count; i++) {
    const s = skills[i % skills.length];
    const q = generateDynamicTableQuestion(s);
    pool.push({
      question: q.question,
      options: q.options,
      correct: q.correct,
      explanation: q.explanation
    });
  }
  return pool;
}

var PRACTICE_POOL_TOPIC_TABLES = generateTablesPracticeQueue('all', 30);
var CHALLENGE_QUESTIONS_TOPIC_TABLES = generateDynamicChallengePool(10);

/* ==========================================================================
   TOPIC 6: MULTIPLICATION TABLES (1 TO 20) — SPEED MASTER & MENTAL MATH
   - Learn Section Checkpoints & 3-Star Grading Engine
   - 20x20 Interactive Matrix, Split-and-Add Lab & Vedic Solver
   - Dynamic Worksheet Generator & Ink-Friendly Print Engine
   ========================================================================== */

function renderTablesMilestoneBanner() {
  const cp = state.tablesLearnCheckpoints || {};
  const cpCount = ['checkpoint_grid', 'checkpoint_split', 'checkpoint_vedic', 'checkpoint_traps'].filter(k => cp[k]).length;
  const hasStar1 = cpCount >= 4;
  const solvedCount = state.tablesPracticeSolvedCount || 0;
  const hasStar2 = solvedCount >= 10;
  const sprintScore = state.tablesChallengeHighScore || 0;
  const hasStar3 = sprintScore >= 80;

  return `
    <div class="tables-milestone-banner">
      <div class="milestone-banner-header">
        <div class="milestone-banner-title">
          <span>⚡</span> 3-Star Multiplication Table Mastery Roadmap
        </div>
        <div class="milestone-banner-subtitle">
          All 3 stars require completing Learn Checkpoints, Practice Drills, and Speed Sprint!
        </div>
      </div>
      <div class="milestones-grid">
        <!-- Star 1: Learn Checkpoints -->
        <div class="milestone-step-card ${hasStar1 ? 'completed' : 'active'}">
          <div class="milestone-step-header">
            <span>⭐ Star 1: Learn Checkpoints</span>
            <span class="milestone-status-badge ${hasStar1 ? 'done' : 'pending'}">
              ${hasStar1 ? '✓ Completed' : `${cpCount}/4 Cleared`}
            </span>
          </div>
          <div class="milestone-step-desc">
            Complete the 4 interactive Try-It checkpoints in the <strong>Learn & Explore</strong> tabs (Grid, Split, Vedic & Traps).
          </div>
        </div>

        <!-- Star 2: Dynamic Practice Solved -->
        <div class="milestone-step-card ${hasStar2 ? 'completed' : (hasStar1 ? 'active' : '')}">
          <div class="milestone-step-header">
            <span>⭐⭐ Star 2: Dynamic Practice</span>
            <span class="milestone-status-badge ${hasStar2 ? 'done' : 'pending'}">
              ${hasStar2 ? '✓ Completed' : `${Math.min(10, solvedCount)}/10 Solved`}
            </span>
          </div>
          <div class="milestone-step-desc">
            Correctly solve 10 dynamic, randomized mental math problems in <strong>Practice & Solve</strong> mode.
          </div>
        </div>

        <!-- Star 3: 60s Speed Sprint -->
        <div class="milestone-step-card ${hasStar3 ? 'completed' : (hasStar2 ? 'active' : '')}">
          <div class="milestone-step-header">
            <span>⭐⭐⭐ Star 3: Speed Sprint</span>
            <span class="milestone-status-badge ${hasStar3 ? 'done' : 'pending'}">
              ${hasStar3 ? `✓ ${sprintScore}% Score` : (sprintScore > 0 ? `Best: ${sprintScore}% (Need 80%)` : 'Not Started')}
            </span>
          </div>
          <div class="milestone-step-desc">
            Score 80%+ on the <strong>60s Speed Sprint</strong> under the timer with dynamic rapid-fire questions.
          </div>
        </div>
      </div>
    </div>
  `;
}

function updateTablesMasteryStars() {
  if (state.currentTopic !== 'tables_speed_master') return;
  const cp = state.tablesLearnCheckpoints || {};
  const cpCount = ['checkpoint_grid', 'checkpoint_split', 'checkpoint_vedic', 'checkpoint_traps'].filter(k => cp[k]).length;
  const hasStar1 = cpCount >= 4;
  const hasStar2 = (state.tablesPracticeSolvedCount || 0) >= 10;
  const hasStar3 = (state.tablesChallengeHighScore || 0) >= 80;

  const totalStars = (hasStar1 ? 1 : 0) + (hasStar2 ? 1 : 0) + (hasStar3 ? 1 : 0);
  state.stars = totalStars;
  saveProgress();
  updateProgressUI();
}

function completeTablesLearnCheckpoint(checkpointId, feedbackEl, boxEl) {
  state.tablesLearnCheckpoints = state.tablesLearnCheckpoints || {};
  const wasAllBefore = ['checkpoint_grid', 'checkpoint_split', 'checkpoint_vedic', 'checkpoint_traps'].every(k => state.tablesLearnCheckpoints[k]);
  
  state.tablesLearnCheckpoints[checkpointId] = true;
  saveActiveState();
  updateTablesMasteryStars();
  playCorrectSound();

  const isAllNow = ['checkpoint_grid', 'checkpoint_split', 'checkpoint_vedic', 'checkpoint_traps'].every(k => state.tablesLearnCheckpoints[k]);

  if (feedbackEl) {
    feedbackEl.className = 'checkpoint-feedback success';
    feedbackEl.innerHTML = `<strong>🎉 Checkpoint Cleared!</strong> You solved this correctly! ${isAllNow ? '🌟 <strong>All 4 Learn Checkpoints Complete! You earned Star 1 ⭐!</strong>' : 'Progress saved towards Star 1 ⭐.'}`;
    feedbackEl.style.display = 'block';
  }

  if (boxEl) {
    boxEl.classList.add('cleared');
    const badge = boxEl.querySelector('.checkpoint-badge');
    if (badge) {
      badge.className = 'checkpoint-badge cleared';
      badge.innerHTML = '✓ Checkpoint Cleared';
    }
  }

  if (!wasAllBefore && isAllNow) {
    playConfetti();
  }
}

/* --------------------------------------------------------------------------
   MODULE 1: 20x20 INTERACTIVE MATRIX & SYMMETRY EXPLORER
   -------------------------------------------------------------------------- */

function renderGridExplorerModule(container) {
  let showSymmetry = false;
  let showSquares = true;
  let selectedR = 14;
  let selectedC = 7;

  function render() {
    const cp = state.tablesLearnCheckpoints || {};
    const isCpCleared = !!cp.checkpoint_grid;

    // Generate dynamic checkpoint numbers
    const cpA = 17;
    const cpB = 8;
    const cpProd = cpA * cpB;

    container.innerHTML = `
      <div class="think-callout-math">
        <div class="callout-header">💡 Think About It — The 400 Facts Shrink by More Than 50%!</div>
        <p>A 20×20 table contains 400 cells, but <strong>you do NOT need to memorize 400 facts!</strong> Because multiplication is commutative ($A \times B = B \times A$), <strong>17 × 8 is identical to 8 × 17</strong>. If you know your 1 to 10 tables, you already know half of every teen table!</p>
      </div>

      <div class="grid-controls-bar">
        <div class="grid-toggles">
          <button class="grid-toggle-btn ${showSymmetry ? 'active' : ''}" id="btn-toggle-sym">
            ⭐ Symmetry Fold (A × B = B × A)
          </button>
          <button class="grid-toggle-btn ${showSquares ? 'active' : ''}" id="btn-toggle-sq">
            💎 Square Landmarks (N²)
          </button>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">
          Tap any cell to inspect its mental math decomposition!
        </div>
      </div>

      <div class="table-matrix-scroll-wrap">
        <table class="table-matrix" id="table-matrix-20">
          <thead>
            <tr>
              <th class="corner-cell">×</th>
              ${Array.from({ length: 20 }, (_, i) => `<th>${i + 1}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${Array.from({ length: 20 }, (_, r) => {
              const row = r + 1;
              return `
                <tr>
                  <th class="row-header">${row}</th>
                  ${Array.from({ length: 20 }, (_, c) => {
                    const col = c + 1;
                    const val = row * col;
                    const isSquare = row === col;
                    const isSelected = row === selectedR && col === selectedC;
                    const isTwin = row === selectedC && col === selectedR;
                    const isUpper = row < col;
                    const isTeen = row > 10 || col > 10;

                    let classes = [];
                    if (isTeen) classes.push('cell-teen');
                    if (isSquare && showSquares) classes.push('cell-square');
                    if (isSelected) classes.push('cell-selected');
                    if (isTwin && (showSymmetry || isSelected) && !isSquare) classes.push('cell-symmetry-twin');
                    if (showSymmetry && isUpper && !isSquare) classes.push('cell-upper-half');

                    return `<td class="${classes.join(' ')}" data-r="${row}" data-c="${col}">${val}</td>`;
                  }).join('')}
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- Cell Inspector Card -->
      <div class="grid-cell-inspect-card" id="grid-inspect-card">
        <div class="inspect-card-top">
          <div class="inspect-equation">${selectedR} × ${selectedC} = ${selectedR * selectedC}</div>
          <div class="inspect-twin-badge">Commutative Twin: ${selectedC} × ${selectedR} = ${selectedR * selectedC}</div>
        </div>
        <div class="inspect-split-breakdown">
          <span>🧠 <strong>Mental Breakdown:</strong></span>
          ${selectedR > 10 ? `
            <span>(${10} × ${selectedC}) + (${selectedR - 10} × ${selectedC}) = ${10 * selectedC} + ${(selectedR - 10) * selectedC} = <strong>${selectedR * selectedC}</strong></span>
          ` : `
            <span>Basic foundational fact: ${selectedR} groups of ${selectedC}</span>
          `}
        </div>
      </div>

      <!-- Interactive Checkpoint 1 -->
      <div class="learn-checkpoint-box ${isCpCleared ? 'cleared' : ''}" id="checkpoint-box-1">
        <div class="checkpoint-header">
          <div class="checkpoint-badge ${isCpCleared ? 'cleared' : ''}">
            ${isCpCleared ? '✓ Checkpoint 1 Cleared' : '⭐ Learn Checkpoint 1 of 4'}
          </div>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Required for Star 1 ⭐</span>
        </div>

        <div class="checkpoint-prompt">
          <strong>Commutative Twin Challenge:</strong> If you know that <strong>${cpA} × ${cpB} = ${cpProd}</strong>, which twin equation is guaranteed to give the exact same product without calculating again?
        </div>

        <div class="checkpoint-interactive-area">
          <div class="checkpoint-options-grid">
            <button class="checkpoint-opt-btn" data-correct="true">
              <span>A</span>
              <strong>${cpB} × ${cpA} = ${cpProd}</strong>
            </button>
            <button class="checkpoint-opt-btn" data-correct="false">
              <span>B</span>
              <strong>${cpB} × ${cpA} = ${cpProd + 10}</strong>
            </button>
            <button class="checkpoint-opt-btn" data-correct="false">
              <span>C</span>
              <strong>${cpA + 1} × ${cpB} = ${cpProd + cpB}</strong>
            </button>
            <button class="checkpoint-opt-btn" data-correct="false">
              <span>D</span>
              <strong>${cpA} + ${cpB} = ${cpA + cpB}</strong>
            </button>
          </div>
          <div class="checkpoint-feedback" id="cp1-feedback"></div>
        </div>
      </div>
    `;

    // Attach Grid click handlers
    container.querySelectorAll('.table-matrix td').forEach(td => {
      td.addEventListener('click', () => {
        playClickSound();
        selectedR = parseInt(td.getAttribute('data-r'));
        selectedC = parseInt(td.getAttribute('data-c'));
        render();
      });
    });

    // Toggle handlers
    container.querySelector('#btn-toggle-sym')?.addEventListener('click', () => {
      playClickSound();
      showSymmetry = !showSymmetry;
      render();
    });

    container.querySelector('#btn-toggle-sq')?.addEventListener('click', () => {
      playClickSound();
      showSquares = !showSquares;
      render();
    });

    // Checkpoint 1 Options
    const cpBox = container.querySelector('#checkpoint-box-1');
    const cpFeedback = container.querySelector('#cp1-feedback');
    container.querySelectorAll('#checkpoint-box-1 .checkpoint-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        if (isCorrect) {
          btn.classList.add('correct');
          container.querySelectorAll('#checkpoint-box-1 .checkpoint-opt-btn').forEach(b => b.disabled = true);
          completeTablesLearnCheckpoint('checkpoint_grid', cpFeedback, cpBox);
        } else {
          btn.classList.add('wrong');
          playWrongSound();
          cpFeedback.className = 'checkpoint-feedback error';
          cpFeedback.innerHTML = `<strong>Not quite!</strong> Remember the Commutative Property: $A \\times B = B \\times A$. The numbers simply swap positions while the product remains identical!`;
          cpFeedback.style.display = 'block';
        }
      });
    });
  }

  render();
}

/* --------------------------------------------------------------------------
   MODULE 2: SPLIT-AND-ADD LAB (DISTRIBUTIVE MENTAL MATH)
   -------------------------------------------------------------------------- */

function renderSplitAddLabModule(container) {
  let selectedTeen = 17;
  let selectedMult = 8;
  let cpTeen = getRandomInt(12, 19);
  let cpMult = getRandomInt(4, 9);

  function render() {
    const cp = state.tablesLearnCheckpoints || {};
    const isCpCleared = !!cp.checkpoint_split;

    const unitDigit = selectedTeen - 10;
    const tensProd = 10 * selectedMult;
    const unitsProd = unitDigit * selectedMult;
    const totalProd = selectedTeen * selectedMult;

    // Dynamic Checkpoint 2 problem
    const cpUnits = cpTeen - 10;
    const cpTensProd = 10 * cpMult;
    const cpUnitsProd = cpUnits * cpMult;
    const cpTotal = cpTeen * cpMult;

    const cpDistractors = [
      cpTotal + 10,
      cpTotal - 10,
      cpTotal - 4,
      cpTotal + cpMult
    ];
    const { options: cpOptions, correct: cpCorrectIdx } = shuffleOptionsAndGetCorrect(cpTotal, cpDistractors);

    container.innerHTML = `
      <div class="think-callout-math">
        <div class="callout-header">💡 Think About It — The Split-and-Add Hammer</div>
        <p>Never multiply teen numbers as an intimidating whole! Break the teen into <strong>10 and its unit digit</strong>. Multiply both by your multiplier and add them in your head. It takes just <strong>1.5 seconds</strong> with zero scratchpad needed!</p>
      </div>

      <div class="split-lab-controls">
        <div class="split-control-group">
          <span class="split-control-label">Pick Teen Number:</span>
          <div class="split-select-btn-group">
            ${[12, 13, 14, 15, 16, 17, 18, 19].map(t => `
              <button class="split-pill-btn ${t === selectedTeen ? 'active' : ''}" data-teen="${t}">${t}</button>
            `).join('')}
          </div>
        </div>

        <div class="split-control-group">
          <span class="split-control-label">Pick Multiplier:</span>
          <div class="split-select-btn-group">
            ${[3, 4, 5, 6, 7, 8, 9, 12, 15].map(m => `
              <button class="split-pill-btn ${m === selectedMult ? 'active' : ''}" data-mult="${m}">${m}</button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Animated Visual Blocks -->
      <div class="split-blocks-visual">
        <div style="font-size: 0.88rem; color: var(--text-muted); font-weight: 700;">
          Calculating: <span style="color: var(--accent-amber-light); font-size: 1.15rem;">${selectedTeen} × ${selectedMult}</span>
        </div>

        <div class="split-blocks-row">
          <div class="split-block-item split-block-tens">
            <span class="split-block-label">1. Tens Block</span>
            <span class="split-block-math">10 × ${selectedMult}</span>
            <span class="split-block-val">${tensProd}</span>
          </div>

          <span class="split-operator-symbol">+</span>

          <div class="split-block-item split-block-units">
            <span class="split-block-label">2. Units Block</span>
            <span class="split-block-math">${unitDigit} × ${selectedMult}</span>
            <span class="split-block-val">${unitsProd}</span>
          </div>

          <span class="split-operator-symbol">=</span>

          <div class="split-block-item split-block-total">
            <span class="split-block-label">3. Total Product</span>
            <span class="split-block-math">${tensProd} + ${unitsProd}</span>
            <span class="split-block-val">${totalProd}</span>
          </div>
        </div>

        ${(selectedTeen === 18 || selectedTeen === 19) ? `
          <div style="background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.35); border-radius: var(--radius-sm, 8px); padding: 0.65rem 0.85rem; font-size: 0.88rem;">
            ⚡ <strong>Alternative Step-Down Shortcut:</strong> Since ${selectedTeen} is close to 20, calculate:<br>
            <code>(20 × ${selectedMult}) − (${20 - selectedTeen} × ${selectedMult}) = ${20 * selectedMult} − ${(20 - selectedTeen) * selectedMult} = ${totalProd}</code>!
          </div>
        ` : ''}
      </div>

      <!-- Interactive Checkpoint 2 -->
      <div class="learn-checkpoint-box ${isCpCleared ? 'cleared' : ''}" id="checkpoint-box-2">
        <div class="checkpoint-header">
          <div class="checkpoint-badge ${isCpCleared ? 'cleared' : ''}">
            ${isCpCleared ? '✓ Checkpoint 2 Cleared' : '⭐ Learn Checkpoint 2 of 4'}
          </div>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Required for Star 1 ⭐</span>
        </div>

        <div class="checkpoint-prompt">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <span><strong>Mental Split Challenge:</strong> Apply the Split-and-Add Hammer to calculate <strong>${cpTeen} × ${cpMult}</strong> in your head:</span>
            <button class="btn btn-secondary btn-sm" id="btn-roll-cp2" style="font-size: 0.78rem; padding: 4px 10px; min-height: 32px;">🎲 New Problem</button>
          </div>
          <code style="color: var(--accent-amber-light); font-size: 1.05rem;">(${10} × ${cpMult}) + (${cpUnits} × ${cpMult}) = ${cpTensProd} + ${cpUnitsProd} = ?</code>
        </div>

        <div class="checkpoint-interactive-area">
          <div class="checkpoint-options-grid">
            ${cpOptions.map((opt, i) => `
              <button class="checkpoint-opt-btn" data-correct="${i === cpCorrectIdx ? 'true' : 'false'}">
                <span>${String.fromCharCode(65 + i)}</span>
                <strong>${opt}</strong>
              </button>
            `).join('')}
          </div>
          <div class="checkpoint-feedback" id="cp2-feedback"></div>
        </div>
      </div>
    `;

    // Attach pill click listeners
    container.querySelectorAll('.split-pill-btn[data-teen]').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        selectedTeen = parseInt(btn.getAttribute('data-teen'));
        render();
      });
    });

    container.querySelectorAll('.split-pill-btn[data-mult]').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        selectedMult = parseInt(btn.getAttribute('data-mult'));
        render();
      });
    });

    // Checkpoint 2 New Problem button
    container.querySelector('#btn-roll-cp2')?.addEventListener('click', () => {
      playClickSound();
      cpTeen = getRandomInt(12, 19);
      cpMult = getRandomInt(4, 9);
      render();
    });

    // Checkpoint 2 Options
    const cpBox = container.querySelector('#checkpoint-box-2');
    const cpFeedback = container.querySelector('#cp2-feedback');
    container.querySelectorAll('#checkpoint-box-2 .checkpoint-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        if (isCorrect) {
          btn.classList.add('correct');
          container.querySelectorAll('#checkpoint-box-2 .checkpoint-opt-btn').forEach(b => b.disabled = true);
          completeTablesLearnCheckpoint('checkpoint_split', cpFeedback, cpBox);
        } else {
          btn.classList.add('wrong');
          playWrongSound();
          cpFeedback.className = 'checkpoint-feedback error';
          cpFeedback.innerHTML = `<strong>Keep trying!</strong> Add the tens block (${cpTensProd}) to the units block (${cpUnitsProd}): ${cpTensProd} + ${cpUnitsProd} = <strong>${cpTotal}</strong>.`;
          cpFeedback.style.display = 'block';
        }
      });
    });
  }

  render();
}

/* --------------------------------------------------------------------------
   MODULE 3: VEDIC TEEN x TEEN SHORTCUT (11x11 TO 19x19)
   -------------------------------------------------------------------------- */

function renderVedicTeenTeenModule(container) {
  let teenA = 14;
  let teenB = 17;
  let cpA = getRandomInt(12, 19);
  let cpB = getRandomInt(12, 19);

  function render() {
    const cp = state.tablesLearnCheckpoints || {};
    const isCpCleared = !!cp.checkpoint_vedic;

    const u1 = teenA % 10;
    const u2 = teenB % 10;
    const step1Val = (teenA + u2) * 10;
    const step2Val = u1 * u2;
    const totalVal = teenA * teenB;

    // Dynamic Checkpoint 3 problem
    const cpU1 = cpA % 10;
    const cpU2 = cpB % 10;
    const cpStep1 = (cpA + cpU2) * 10;
    const cpStep2 = cpU1 * cpU2;
    const cpTotal = cpA * cpB;

    const cpDistractors = [
      cpStep1 + cpU1 + cpU2,
      cpTotal + 10,
      cpTotal - 10,
      (cpA + cpB) * 10
    ];
    const { options: cpOptions, correct: cpCorrectIdx } = shuffleOptionsAndGetCorrect(cpTotal, cpDistractors);

    container.innerHTML = `
      <div class="think-callout-math">
        <div class="callout-header">💡 Think About It — The 2-Second Vedic Base-10 Miracle</div>
        <p>To multiply any two numbers between 11 and 19 without paper, use the ancient Indian <strong>Nikhilam Base-10 rule</strong>:
        <br>1. Take the first number, add the unit of the second, and multiply by 10.
        <br>2. Multiply both unit digits.
        <br>3. Add them together! You can solve problems like <strong>14 × 17</strong> in under 2 seconds!</p>
      </div>

      <div class="vedic-interactive-card">
        <div class="vedic-formula-banner">
          <strong>Formula:</strong> <code>(Number₁ + Unit₂) × 10 &nbsp;+&nbsp; (Unit₁ × Unit₂)</code>
        </div>

        <!-- Presets -->
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem;">
          <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">Try Classic Presets:</span>
          ${[
            [14, 17],
            [14, 13],
            [16, 12],
            [17, 14],
            [18, 13],
            [19, 12]
          ].map(([a, b]) => `
            <button class="grid-toggle-btn ${a === teenA && b === teenB ? 'active' : ''}" data-va="${a}" data-vb="${b}">
              ${a} × ${b}
            </button>
          `).join('')}
          <button class="grid-toggle-btn" id="btn-random-teen-preset" style="background: rgba(245, 158, 11, 0.15); border-color: var(--accent-amber); font-weight: 700;">
            🎲 Random Teen Pair
          </button>
        </div>

        <div class="vedic-steps-ladder">
          <div class="vedic-step-box">
            <div class="vedic-step-num">1</div>
            <div class="vedic-step-content">
              <div class="vedic-step-title">Base Addition (Times 10)</div>
              <div class="vedic-step-calc">(${teenA} + ${u2}) × 10 = ${teenA + u2} × 10 = <strong>${step1Val}</strong></div>
            </div>
          </div>

          <div class="vedic-step-box">
            <div class="vedic-step-num">2</div>
            <div class="vedic-step-content">
              <div class="vedic-step-title">Multiply Unit Digits</div>
              <div class="vedic-step-calc">${u1} × ${u2} = <strong>${step2Val}</strong></div>
            </div>
          </div>

          <div class="vedic-step-box" style="border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.08);">
            <div class="vedic-step-num" style="background: var(--accent-emerald);">3</div>
            <div class="vedic-step-content">
              <div class="vedic-step-title">Sum Together</div>
              <div class="vedic-step-calc" style="color: #34d399; font-size: 1.3rem;">${step1Val} + ${step2Val} = <strong>${totalVal}</strong></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Checkpoint 3 -->
      <div class="learn-checkpoint-box ${isCpCleared ? 'cleared' : ''}" id="checkpoint-box-3">
        <div class="checkpoint-header">
          <div class="checkpoint-badge ${isCpCleared ? 'cleared' : ''}">
            ${isCpCleared ? '✓ Checkpoint 3 Cleared' : '⭐ Learn Checkpoint 3 of 4'}
          </div>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Required for Star 1 ⭐</span>
        </div>

        <div class="checkpoint-prompt">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <span><strong>Vedic Teen × Teen Challenge:</strong> Apply the 2-step Vedic rule to calculate <strong>${cpA} × ${cpB}</strong>:</span>
            <button class="btn btn-secondary btn-sm" id="btn-roll-cp3" style="font-size: 0.78rem; padding: 4px 10px; min-height: 32px;">🎲 New Problem</button>
          </div>
          <code style="color: #a5b4fc; font-size: 0.95rem;">Step 1: (${cpA} + ${cpU2}) × 10 = ${cpStep1} &nbsp;|&nbsp; Step 2: ${cpU1} × ${cpU2} = ${cpStep2}</code><br>
          What is the total product (${cpStep1} + ${cpStep2})?
        </div>

        <div class="checkpoint-interactive-area">
          <div class="checkpoint-options-grid">
            ${cpOptions.map((opt, i) => `
              <button class="checkpoint-opt-btn" data-correct="${i === cpCorrectIdx ? 'true' : 'false'}">
                <span>${String.fromCharCode(65 + i)}</span>
                <strong>${opt}</strong>
              </button>
            `).join('')}
          </div>
          <div class="checkpoint-feedback" id="cp3-feedback"></div>
        </div>
      </div>
    `;

    // Presets listeners
    container.querySelectorAll('.grid-toggle-btn[data-va]').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        teenA = parseInt(btn.getAttribute('data-va'));
        teenB = parseInt(btn.getAttribute('data-vb'));
        render();
      });
    });

    // Random Teen Pair preset listener
    container.querySelector('#btn-random-teen-preset')?.addEventListener('click', () => {
      playClickSound();
      teenA = getRandomInt(12, 19);
      teenB = getRandomInt(12, 19);
      render();
    });

    // Checkpoint 3 New Problem button
    container.querySelector('#btn-roll-cp3')?.addEventListener('click', () => {
      playClickSound();
      cpA = getRandomInt(12, 19);
      cpB = getRandomInt(12, 19);
      render();
    });

    // Checkpoint 3 Options
    const cpBox = container.querySelector('#checkpoint-box-3');
    const cpFeedback = container.querySelector('#cp3-feedback');
    container.querySelectorAll('#checkpoint-box-3 .checkpoint-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        if (isCorrect) {
          btn.classList.add('correct');
          container.querySelectorAll('#checkpoint-box-3 .checkpoint-opt-btn').forEach(b => b.disabled = true);
          completeTablesLearnCheckpoint('checkpoint_vedic', cpFeedback, cpBox);
        } else {
          btn.classList.add('wrong');
          playWrongSound();
          cpFeedback.className = 'checkpoint-feedback error';
          cpFeedback.innerHTML = `<strong>Check Step 3:</strong> Add ${cpStep1} + ${cpStep2} = <strong>${cpTotal}</strong>. Don't add the units, remember to multiply them!`;
          cpFeedback.style.display = 'block';
        }
      });
    });
  }

  render();
}

/* --------------------------------------------------------------------------
   MODULE 4: TABLE SECRETS & MNEMONIC CARDS (11 TO 20)
   -------------------------------------------------------------------------- */

function renderTableTricksCardsModule(container) {
  const cards = [
    {
      num: 11,
      name: 'Twin Digits & 2-Digit Split',
      body: 'Single digit × 11 repeats the digit (11 × 7 = 77). For 2-digit numbers, split the digits and place their sum in between: 11 × 15 ➔ 1_(1+5)_5 = 165!',
      example: '11 × 8 = 88 &nbsp;|&nbsp; 11 × 14 = 154'
    },
    {
      num: 12,
      name: 'The Dozen Rule (10 + 2)',
      body: 'Think of 12 as a dozen. Multiply by 10, multiply by 2, and combine: 12 × 7 = 70 + 14 = 84.',
      example: '12 × 6 = 60 + 12 = 72 &nbsp;|&nbsp; 12 × 8 = 80 + 16 = 96'
    },
    {
      num: 13,
      name: 'Lucky 13 & Unit Digit Sequence',
      body: 'The unit digits of 13 repeat in a 3s cycle: 3, 6, 9, 2, 5, 8, 1, 4, 7, 0. Split as 10 × N + 3 × N.',
      example: '13 × 7 = 70 + 21 = 91 &nbsp;|&nbsp; 13 × 8 = 80 + 24 = 104'
    },
    {
      num: 14,
      name: 'Double the 7s Table',
      body: '14 is simply 2 × 7! Take the 7s multiple and double it in your head. 14 × 6 = (7 × 6) × 2 = 42 × 2 = 84.',
      example: '14 × 5 = 35 × 2 = 70 &nbsp;|&nbsp; 14 × 8 = 56 × 2 = 112'
    },
    {
      num: 15,
      name: 'Half-Past Ten Clock Rule',
      body: 'Multiplying by 15 is multiplying by 10 and adding half of that amount! 15 × 8 = 80 + 40 = 120.',
      example: '15 × 6 = 60 + 30 = 90 &nbsp;|&nbsp; 15 × 7 = 70 + 35 = 105'
    },
    {
      num: 16,
      name: 'Double the 8s Table (or Double 4x)',
      body: '16 is 2 × 8. Multiply by 8 and double it! 16 × 7 = (8 × 7) × 2 = 56 × 2 = 112.',
      example: '16 × 4 = 32 × 2 = 64 &nbsp;|&nbsp; 16 × 9 = 72 × 2 = 144'
    },
    {
      num: 17,
      name: 'Split & Unit Digit Law',
      body: 'Split into 10 + 7: 17 × 6 = 60 + 42 = 102. Notice that 7 × odd is always odd, and 7 × 7 ends in 9!',
      example: '17 × 7 = 70 + 49 = 119 &nbsp;|&nbsp; 17 × 8 = 80 + 56 = 136'
    },
    {
      num: 18,
      name: 'Step Down from 20 (or Double 9s)',
      body: '18 is (20 − 2). Calculate 20 × N and subtract 2 × N! 18 × 7 = 140 − 14 = 126.',
      example: '18 × 6 = 120 − 12 = 108 &nbsp;|&nbsp; 18 × 8 = 160 − 16 = 144'
    },
    {
      num: 19,
      name: 'The 1-Second Step Down',
      body: 'The fastest trick in math: 19 is (20 − 1). Take 20 × N and subtract N once! 19 × 7 = 140 − 7 = 133.',
      example: '19 × 6 = 120 − 6 = 114 &nbsp;|&nbsp; 19 × 8 = 160 − 8 = 152'
    },
    {
      num: 20,
      name: 'Table of 2 with a Zero',
      body: 'Multiply by 2 and append a 0. 20 × 8 = (2 × 8) followed by 0 = 160.',
      example: '20 × 7 = 140 &nbsp;|&nbsp; 20 × 9 = 180'
    }
  ];

  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 Think About It — Every Table Has a Mental Superpower</div>
      <p>Memorizing tables becomes effortless when each number is anchored to a distinct mental trick. Explore all 10 secret cards below!</p>
    </div>

    <!-- Square Number Mirror Box -->
    <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: var(--radius-md, 12px); padding: 0.85rem 1.15rem; margin-bottom: 1.25rem;">
      <div style="font-weight: 800; color: var(--accent-amber-light); margin-bottom: 0.35rem;">
        💎 The 13² ↔ 14² Mirror Secret:
      </div>
      <div style="font-size: 0.92rem; color: var(--text-main); line-height: 1.45;">
        Notice how <strong>13² = 169</strong> and <strong>14² = 196</strong>? The last two digits are perfect mirrors (<strong>69 ↔ 96</strong>)!
        <br>Square anchors make neighbors instant: <code>15 × 16 = 15² + 15 = 225 + 15 = 240</code>!
      </div>
    </div>

    <div class="trick-cards-grid">
      ${cards.map(c => `
        <div class="trick-card">
          <div class="trick-card-header">
            <span class="trick-card-name">${c.name}</span>
            <span class="trick-table-badge">${c.num}×</span>
          </div>
          <div class="trick-card-body">${c.body}</div>
          <div class="trick-card-example">${c.example}</div>
        </div>
      `).join('')}
    </div>
  `;
}

/* --------------------------------------------------------------------------
   MODULE 5: SPOT THE EXAM TRAPS & UNIT-DIGIT SLEUTH
   -------------------------------------------------------------------------- */

function renderSpotExamTrapsModule(container) {
  const cp = state.tablesLearnCheckpoints || {};
  const isCpCleared = !!cp.checkpoint_traps;

  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 Think About It — The Unit Digit Lie Detector</div>
      <p>In CBSE examinations, calculation mistakes almost always fail the <strong>Unit Digit Sanity Check</strong>.
      <br>• $7 \times 8 = 56$, so ANY multiple ending in $7 \times 8$ MUST end in <strong>6</strong>!
      <br>• Odd $\times$ Odd is ALWAYS Odd! Even $\times$ Anything is ALWAYS Even!
      <br>If a student writes $17 \times 8 = 138$, you know in <strong>0.1 seconds</strong> it is impossible because it must end in 6!</p>
    </div>

    <div class="decision-matrix">
      <!-- Trap Slip 1 -->
      <div class="decision-card" style="border-color: rgba(244, 63, 94, 0.4);">
        <h4 style="color: #f43f5e;">❌ Exam Slip 1: "13 × 7 = 98"</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted);">A student hastily wrote 98 on their answer sheet.</p>
        <div class="scenario-box" style="border-color: rgba(244, 63, 94, 0.3); background: rgba(244, 63, 94, 0.08);">
          <strong style="color: #fda4af;">Diagnostic Flaw:</strong><br>
          1. Odd × Odd ($13 \times 7$) MUST be an odd number! 98 is even.<br>
          2. Unit digit check: $3 \times 7 = 21$ (must end in 1).<br>
          <span class="text-success">→ Correct Product: 13 × 7 = 91.</span>
        </div>
      </div>

      <!-- Trap Slip 2 -->
      <div class="decision-card" style="border-color: rgba(244, 63, 94, 0.4);">
        <h4 style="color: #f43f5e;">❌ Exam Slip 2: "17 × 7 = 129"</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted);">A student split into 70 + 49 but made a carry addition slip.</p>
        <div class="scenario-box" style="border-color: rgba(244, 63, 94, 0.3); background: rgba(244, 63, 94, 0.08);">
          <strong style="color: #fda4af;">Diagnostic Flaw:</strong><br>
          $70 + 49 = 119$, NOT 129! The student mistakenly added 1 extra ten.<br>
          <span class="text-success">→ Correct Product: 17 × 7 = 119.</span>
        </div>
      </div>

      <!-- Trap Slip 3 -->
      <div class="decision-card" style="border-color: rgba(244, 63, 94, 0.4);">
        <h4 style="color: #f43f5e;">❌ Exam Slip 3: "19 × 6 = 124"</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted);">A student attempted (20 × 6) − 6 but subtracted wrong.</p>
        <div class="scenario-box" style="border-color: rgba(244, 63, 94, 0.3); background: rgba(244, 63, 94, 0.08);">
          <strong style="color: #fda4af;">Diagnostic Flaw:</strong><br>
          $20 \times 6 = 120$. Subtracting 6 gives $120 - 6 = 114$, not 124!<br>
          <span class="text-success">→ Correct Product: 19 × 6 = 114.</span>
        </div>
      </div>
    </div>

    <!-- Interactive Checkpoint 4 -->
    <div class="learn-checkpoint-box ${isCpCleared ? 'cleared' : ''}" id="checkpoint-box-4">
      <div class="checkpoint-header">
        <div class="checkpoint-badge ${isCpCleared ? 'cleared' : ''}">
          ${isCpCleared ? '✓ Checkpoint 4 Cleared' : '⭐ Learn Checkpoint 4 of 4'}
        </div>
        <span style="font-size: 0.8rem; color: var(--text-muted);">Final Checkpoint for Star 1 ⭐!</span>
      </div>

      <div class="checkpoint-prompt">
        <strong>Teacher Diagnostic Challenge:</strong> Fictitious student Rohan wrote <strong>17 × 8 = 138</strong>. Without performing full scratchpad multiplication, which diagnostic clue instantly exposes this answer as impossible?
      </div>

      <div class="checkpoint-interactive-area">
        <div class="checkpoint-options-grid">
          <button class="checkpoint-opt-btn" data-correct="true">
            <span>A</span>
            <strong>Unit digit check: 7 × 8 = 56, so the product MUST end in 6, not 8!</strong>
          </button>
          <button class="checkpoint-opt-btn" data-correct="false">
            <span>B</span>
            <strong>17 × 8 must be an odd number.</strong>
          </button>
          <button class="checkpoint-opt-btn" data-correct="false">
            <span>C</span>
            <strong>17 × 8 must be smaller than 100.</strong>
          </button>
          <button class="checkpoint-opt-btn" data-correct="false">
            <span>D</span>
            <strong>17 × 8 must end in 0.</strong>
          </button>
        </div>
        <div class="checkpoint-feedback" id="cp4-feedback"></div>
      </div>
    </div>
  `;

  // Checkpoint 4 Options
  const cpBox = container.querySelector('#checkpoint-box-4');
  const cpFeedback = container.querySelector('#cp4-feedback');
  container.querySelectorAll('#checkpoint-box-4 .checkpoint-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.getAttribute('data-correct') === 'true';
      if (isCorrect) {
        btn.classList.add('correct');
        container.querySelectorAll('#checkpoint-box-4 .checkpoint-opt-btn').forEach(b => b.disabled = true);
        completeTablesLearnCheckpoint('checkpoint_traps', cpFeedback, cpBox);
      } else {
        btn.classList.add('wrong');
        playWrongSound();
        cpFeedback.className = 'checkpoint-feedback error';
        cpFeedback.innerHTML = `<strong>Try again:</strong> Look at the unit digits! 7 × 8 = 56. What digit MUST the final product end in?`;
        cpFeedback.style.display = 'block';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   WORKSHEET VIEW RENDERER (TOPIC 6: DYNAMIC WORKSHEET BUILDER)
   -------------------------------------------------------------------------- */

let cachedWorksheetTablesData = null;

function generateFreshWorksheetTablesData() {
  const missingMults = [];
  for (let i = 0; i < 10; i++) {
    const t = getRandomChoice([12, 13, 14, 15, 16, 17, 18, 19]);
    const m = getRandomInt(3, 10);
    missingMults.push({ teen: t, mult: m, prod: t * m });
  }

  const splitItems = [];
  for (let i = 0; i < 5; i++) {
    const t = getRandomChoice([13, 14, 16, 17, 18, 19]);
    const m = getRandomInt(4, 9);
    splitItems.push({ teen: t, mult: m, tens: 10 * m, units: (t - 10) * m, prod: t * m });
  }

  const vedicItems = [];
  for (let i = 0; i < 5; i++) {
    const a = getRandomChoice([12, 13, 14, 15, 16, 17, 18, 19]);
    const b = getRandomChoice([12, 13, 14, 15, 16, 17, 18, 19]);
    vedicItems.push({ a, b, prod: a * b });
  }

  const wp1T = getRandomChoice([13, 14, 16, 17, 18]);
  const wp1V = getRandomInt(6, 9);
  const wp2T = getRandomChoice([14, 16, 17, 18, 19]);
  const wp2K = getRandomInt(6, 9);
  const wp3T = getRandomChoice([13, 14, 15, 16, 17]);
  const wp3P = getRandomChoice([12, 13, 14, 15]);
  const wp4R = getRandomChoice([14, 16, 17, 18, 19]);
  const wp4S = getRandomInt(6, 9);

  const wordProblems = [
    {
      q: `A CBSE school library ordered ${wp1T} sets of science encyclopedias. If each set contains ${wp1V} volumes, find the total number of books ordered.`,
      ans: `${wp1T} × ${wp1V} = (10 × ${wp1V}) + (${wp1T - 10} × ${wp1V}) = ${10 * wp1V} + ${(wp1T - 10) * wp1V} = ${wp1T * wp1V} books.`
    },
    {
      q: `An apple orchard packed ${wp2T} wooden crates with ${wp2K} kg of apples in each crate. What is the total weight of apples packed?`,
      ans: `${wp2T} × ${wp2K} = (10 × ${wp2K}) + (${wp2T - 10} × ${wp2K}) = ${10 * wp2K} + ${(wp2T - 10) * wp2K} = ${wp2T * wp2K} kg.`
    },
    {
      q: `A sports coach bought ${wp3T} packets of shuttlecocks at ₹${wp3P} per packet. How much money did the coach spend in total?`,
      ans: `${wp3T} × ${wp3P} = ₹${wp3T * wp3P} (Vedic base-10: (${wp3T} + ${wp3P % 10}) × 10 + ${(wp3T % 10) * (wp3P % 10)} = ₹${wp3T * wp3P}).`
    },
    {
      q: `For an inter-school march-past, students were arranged in ${wp4R} rows with ${wp4S} students in each row. How many students participated?`,
      ans: `${wp4R} × ${wp4S} = (20 × ${wp4S}) − (${(20 - wp4R) * wp4S}) = ${20 * wp4S} − ${(20 - wp4R) * wp4S} = ${wp4R * wp4S} students.`
    }
  ];

  return { missingMults, splitItems, vedicItems, wordProblems };
}

function renderWorksheetViewTables(container) {
  if (!cachedWorksheetTablesData) {
    cachedWorksheetTablesData = generateFreshWorksheetTablesData();
  }
  const data = cachedWorksheetTablesData;
  let showAnswers = false;

  function render() {
    container.innerHTML = `
      <div class="learn-container">
        <div class="learn-card">
          <div class="learn-card-header">
            <div>
              <h3>📄 Multiplication Tables (1 to 20) Practice Worksheet</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                CBSE Class 5 Curriculum — Speed Calculation, Mental Split & Vedic Shortcuts
              </p>
            </div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button class="btn btn-secondary" id="btn-regen-tables-ws">
                🎲 Fresh Numbers
              </button>
              <button class="btn btn-ghost" id="btn-toggle-tables-key">
                ${showAnswers ? '🙈 Hide Answers' : '👁️ Show Answers'}
              </button>
              <button class="btn btn-primary" id="btn-print-action-tables">
                🖨️ Print Worksheet
              </button>
            </div>
          </div>

          <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-md, 12px); padding: 1.25rem; margin-top: 1rem;">
            
            <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">I. Missing Multipliers & Division Inverses (Fill in the blanks):</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.65rem; margin-bottom: 1.5rem;">
              ${data.missingMults.map((item, idx) => `
                <div style="background: rgba(30, 41, 59, 0.4); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm, 8px); font-family: var(--font-mono, monospace);">
                  ${idx + 1}) ${item.teen} × ______ = ${item.prod}
                  ${showAnswers ? `<strong style="color: #34d399; margin-left: 0.5rem;">[ ${item.mult} ]</strong>` : ''}
                </div>
              `).join('')}
            </div>

            <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">II. Mental Split & Add (Show your thinking steps):</h4>
            <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.5rem;">
              ${data.splitItems.map((item, idx) => `
                <div style="background: rgba(30, 41, 59, 0.4); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm, 8px);">
                  <strong>${idx + 1}) ${item.teen} × ${item.mult}</strong> = (${10} × ${item.mult}) + (${item.teen - 10} × ${item.mult}) = ______ + ______ = ______
                  ${showAnswers ? `<div style="color: #34d399; font-size: 0.85rem; margin-top: 0.2rem;">Answer: ${item.tens} + ${item.units} = <strong>${item.prod}</strong></div>` : ''}
                </div>
              `).join('')}
            </div>

            <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">III. Vedic Teen × Teen Speed Sprints (11×11 to 19×19):</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.65rem; margin-bottom: 1.5rem;">
              ${data.vedicItems.map((item, idx) => `
                <div style="background: rgba(30, 41, 59, 0.4); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm, 8px); font-family: var(--font-mono, monospace);">
                  ${idx + 1}) ${item.a} × ${item.b} = ______
                  ${showAnswers ? `<strong style="color: #34d399; margin-left: 0.5rem;">[ ${item.prod} ]</strong>` : ''}
                </div>
              `).join('')}
            </div>

            <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">IV. Real-Life Applied Word Problems:</h4>
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              ${data.wordProblems.map((wp, idx) => `
                <div style="background: rgba(30, 41, 59, 0.4); padding: 0.75rem 1rem; border-radius: var(--radius-sm, 8px); line-height: 1.45;">
                  <strong>${idx + 1}.</strong> ${wp.q}
                  ${showAnswers ? `<div style="color: #34d399; font-size: 0.85rem; margin-top: 0.35rem;">💡 ${wp.ans}</div>` : ''}
                </div>
              `).join('')}
            </div>

          </div>
        </div>
      </div>
    `;

    // Event listeners
    container.querySelector('#btn-regen-tables-ws')?.addEventListener('click', () => {
      playClickSound();
      cachedWorksheetTablesData = generateFreshWorksheetTablesData();
      render();
    });

    container.querySelector('#btn-toggle-tables-key')?.addEventListener('click', () => {
      playClickSound();
      showAnswers = !showAnswers;
      render();
    });

    container.querySelector('#btn-print-action-tables')?.addEventListener('click', () => {
      printWorksheetTables();
    });
  }

  render();
}

function populatePrintTopicTables(printContainer) {
  if (!cachedWorksheetTablesData) {
    cachedWorksheetTablesData = generateFreshWorksheetTablesData();
  }
  const data = cachedWorksheetTablesData;

  printContainer.innerHTML = `
    <div class="print-header">
      <div class="print-school-name">KENDRIYA VIDYALAYA SANGATHAN / CBSE AFFILIATED SCHOOL</div>
      <div class="print-exam-title">CLASS V MATHEMATICS — MULTIPLICATION TABLES (1 TO 20) SPEED MASTER</div>
      <div class="print-sub-title">Mental Split & Add, Vedic Teen Shortcuts & Applied Word Problems</div>
      <div class="print-meta-grid">
        <div class="print-meta-item"><span>Student Name:</span> ____________________________________</div>
        <div class="print-meta-item"><span>Roll No:</span> __________ &nbsp; <span>Section:</span> _____</div>
        <div class="print-meta-item"><span>Date:</span> ______________ &nbsp; <span>Time:</span> 25 Mins</div>
        <div class="print-meta-item"><span>Max Marks:</span> 40 &nbsp; <span>Marks Obtained:</span> _____</div>
      </div>
    </div>

    <div class="print-section">
      <div class="print-section-title">SECTION A: Missing Multipliers & Division Inverses (10 Marks)</div>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-top: 0.5rem;">
        ${data.missingMults.map((item, idx) => `
          <div>${idx + 1}. &nbsp; ${item.teen} × ______ = ${item.prod}</div>
        `).join('')}
      </div>
    </div>

    <div class="print-section">
      <div class="print-section-title">SECTION B: Mental Split-and-Add Hammer (Show Steps) (10 Marks)</div>
      <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.5rem;">
        ${data.splitItems.map((item, idx) => `
          <div>${idx + 1}. &nbsp; <strong>${item.teen} × ${item.mult}</strong> = (${10} × ${item.mult}) + (${item.teen - 10} × ${item.mult}) = ______ + ______ = ______</div>
        `).join('')}
      </div>
    </div>

    <div class="print-section">
      <div class="print-section-title">SECTION C: Vedic Teen × Teen Speed Sprints (11×11 to 19×19) (10 Marks)</div>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-top: 0.5rem;">
        ${data.vedicItems.map((item, idx) => `
          <div>${idx + 1}. &nbsp; ${item.a} × ${item.b} = ______</div>
        `).join('')}
      </div>
    </div>

    <div class="print-section">
      <div class="print-section-title">SECTION D: Real-Life Applied Word Problems (10 Marks)</div>
      <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
        ${data.wordProblems.map((wp, idx) => `
          <div><strong>${idx + 1}.</strong> ${wp.q}<br><span style="color: #666; font-size: 0.85em;">Ans: __________________________________________________________________</span></div>
        `).join('')}
      </div>
    </div>
  `;
}

function printWorksheetTables() {
  const printContainer = document.getElementById('print-container');
  if (printContainer) populatePrintTopicTables(printContainer);
  window.print();
}


// Register globals on window
_G_TABLES.generateDynamicTableQuestion = generateDynamicTableQuestion;
_G_TABLES.generateTablesPracticeQueue = generateTablesPracticeQueue;
_G_TABLES.generateDynamicChallengePool = generateDynamicChallengePool;
_G_TABLES.PRACTICE_POOL_TOPIC_TABLES = PRACTICE_POOL_TOPIC_TABLES;
_G_TABLES.CHALLENGE_QUESTIONS_TOPIC_TABLES = CHALLENGE_QUESTIONS_TOPIC_TABLES;
_G_TABLES.updateTablesMasteryStars = updateTablesMasteryStars;
_G_TABLES.renderTablesMilestoneBanner = renderTablesMilestoneBanner;
_G_TABLES.renderGridExplorerModule = renderGridExplorerModule;
_G_TABLES.renderSplitAddLabModule = renderSplitAddLabModule;
_G_TABLES.renderVedicTeenTeenModule = renderVedicTeenTeenModule;
_G_TABLES.renderTableTricksCardsModule = renderTableTricksCardsModule;
_G_TABLES.renderSpotExamTrapsModule = renderSpotExamTrapsModule;
_G_TABLES.renderWorksheetViewTables = renderWorksheetViewTables;
_G_TABLES.populatePrintTopicTables = populatePrintTopicTables;
_G_TABLES.printWorksheetTables = printWorksheetTables;
