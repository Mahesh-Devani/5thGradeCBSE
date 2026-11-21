/**
 * Maths Master — Class 5 CBSE
 * Topic 1: Multiples, Factors, HCF & LCM
 * Zero External Dependencies (Vanilla ES6+ JS)
 */

'use strict';


/* ==========================================================================
   MATHEMATICAL SOLVERS & UTILITIES MOVED TO engines/solvers.js
   ========================================================================== */

/* ==========================================================================
   4. NATIVE WEB AUDIO SYNTHESIZER
   ========================================================================== */

let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
}

function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.12) {
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio context may fail if user hasn't interacted yet
  }
}

function playClickSound() {
  playTone(520, 'sine', 0.04, 0.08);
}

function playCorrectSound() {
  playTone(523.25, 'triangle', 0.1, 0.15); // C5
  setTimeout(() => playTone(659.25, 'triangle', 0.1, 0.15), 90); // E5
  setTimeout(() => playTone(783.99, 'triangle', 0.18, 0.15), 180); // G5
}

function playWrongSound() {
  playTone(180, 'sawtooth', 0.12, 0.12);
  setTimeout(() => playTone(140, 'sawtooth', 0.18, 0.12), 100);
}

function playFanfare() {
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((note, idx) => {
    setTimeout(() => playTone(note, 'triangle', 0.22, 0.18), idx * 120);
  });
}

/* ==========================================================================
   5. CONFETTI PARTICLE SYSTEM
   ========================================================================== */

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas || typeof canvas.getContext !== 'function') return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#f59e0b', '#10b981', '#6366f1', '#fbbf24', '#34d399', '#f43f5e'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.5) * 16 - 3,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      alpha: 1
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeCount = 0;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vRot;
      p.alpha -= 0.012;

      if (p.alpha > 0) {
        activeCount++;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    }

    if (activeCount > 0) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  update();
}

/* ==========================================================================
   CURRICULUM TOPIC DATASETS MOVED TO data/topic*.js
   ========================================================================== */

/* ==========================================================================
   DYNAMIC MULTIPLICATION & FRACTION ENGINES MOVED TO maths/engines/
   - engines/tables_lab.js: 20x20 Matrix, Split-and-Add Hammer, Vedic Teen Tricks
   - engines/fractions_lab.js: Visual Pizza/Bar Slices, Equivalent Scale, Operations
   ========================================================================== */

function playConfetti() {
  if (window.ConfettiEngine && typeof window.ConfettiEngine.fire === 'function') {
    window.ConfettiEngine.fire();
  } else if (typeof launchConfetti === 'function') {
    launchConfetti();
  }
}

const TOPICS_CONFIG = {
  factors_multiples_hcf_lcm: {
    id: 'factors_multiples_hcf_lcm',
    title: 'Multiples, Factors, HCF & LCM',
    subtitle: 'CBSE Class 5 — Complete Conceptual & Calculation Master',
    icon: '⭐',
    themeColor: '#f59e0b',
    targetStars: 10,
    starsKey: 'cbse_maths_factors_stars',
    sidebarStarId: 'stars-factors-multiples',
    defaultLearnModule: 'hcf_lcm_detective',
    learnModules: LEARN_MODULES_TOPIC_1,
    practicePool: PRACTICE_POOL_TOPIC_1,
    practiceCategories: [
      { id: 'all', label: '🌟 All Questions' },
      { id: 'school_worksheet', label: '🏫 Worksheet 2026-27' },
      { id: 'word_problems', label: '🧠 Word Problems (HCF vs LCM)' },
      { id: 'division_methods', label: '🪜 Division Calculations' },
      { id: 'formula_relations', label: '⚖️ Product Formula (a × b)' }
    ],
    challengePool: CHALLENGE_QUESTIONS_TOPIC_1,
    worksheetRenderer: renderWorksheetViewTopic1
  },
  divisibility_rules: {
    id: 'divisibility_rules',
    title: 'Divisibility Rules (2 to 12)',
    subtitle: 'CBSE Class 5 — Mental Divisibility Tricks, Logic & Missing Digit Puzzles',
    icon: '⚡',
    themeColor: '#06b6d4',
    targetStars: 10,
    starsKey: 'cbse_maths_divisibility_stars',
    sidebarStarId: 'stars-divisibility',
    defaultLearnModule: 'all_rules_table',
    learnModules: LEARN_MODULES_TOPIC_2,
    practicePool: PRACTICE_POOL_TOPIC_2,
    practiceCategories: [
      { id: 'all', label: '🌟 All Questions' },
      { id: 'rule_3_9', label: '🔢 Rule 3 & 9 (Sums)' },
      { id: 'rule_4_8', label: '🎯 Rule 4 & 8 (Ends)' },
      { id: 'rule_6_12', label: '🤝 Rule 6 & 12 (Composite)' },
      { id: 'rule_11', label: '🦘 Rule 11 (Odd/Even)' },
      { id: 'missing_digit', label: '🧩 Missing Digits (*)' }
    ],
    challengePool: CHALLENGE_QUESTIONS_TOPIC_2,
    worksheetRenderer: renderWorksheetViewTopic2
  },
  expressions_statements: {
    id: 'expressions_statements',
    title: 'Expressions & Statements',
    subtitle: 'CBSE Class 5 — Converting Statements to Expressions, Parentheses & Real-Life Modeling',
    icon: '💬',
    themeColor: '#8b5cf6',
    targetStars: 10,
    starsKey: 'cbse_maths_expressions_stars',
    sidebarStarId: 'stars-expressions',
    defaultLearnModule: 'clue_words_dictionary',
    learnModules: LEARN_MODULES_TOPIC_3,
    practicePool: PRACTICE_POOL_TOPIC_3,
    practiceCategories: [
      { id: 'all', label: '🌟 All Questions' },
      { id: 'statement_to_expr', label: '💬 Statements ➔ Expressions' },
      { id: 'expr_to_statement', label: '🔄 Expressions ➔ Statements' },
      { id: 'bracket_traps', label: '🚨 Brackets & Order Traps' },
      { id: 'word_problems', label: '🌍 Real-Life CBSE Problems' }
    ],
    challengePool: CHALLENGE_QUESTIONS_TOPIC_3,
    worksheetRenderer: renderWorksheetViewTopic3
  },
  number_patterns: {
    id: 'number_patterns',
    title: 'Number Patterns',
    subtitle: 'CBSE Class 5 — Can You See The Pattern? Triangular, Square & Towers',
    icon: '🧩',
    themeColor: '#10b981',
    targetStars: 10,
    starsKey: 'cbse_maths_patterns_stars',
    sidebarStarId: 'stars-patterns',
    defaultLearnModule: 'pattern_detective',
    learnModules: LEARN_MODULES_TOPIC_4,
    practicePool: PRACTICE_POOL_TOPIC_4,
    practiceCategories: [
      { id: 'all', label: '🌟 All Questions' },
      { id: 'arithmetic_patterns', label: '🔢 Step & Growing Patterns' },
      { id: 'geom_numbers', label: '🔺 Triangular & Square Dots' },
      { id: 'number_towers', label: '🏰 Number Towers (Pyramids)' },
      { id: 'magic_palindromes', label: '✨ Magic Squares & Palindromes' }
    ],
    challengePool: CHALLENGE_QUESTIONS_TOPIC_4,
    worksheetRenderer: renderWorksheetViewTopic4
  },
  geometry_angles: {
    id: 'geometry_angles',
    title: 'Geometry, Shapes & Angles',
    subtitle: 'CBSE Class 5 — Points, Lines, Angles, Triangles, Quadrilaterals, Polygons & Circles',
    icon: '📐',
    themeColor: '#ec4899',
    targetStars: 10,
    starsKey: 'cbse_maths_geometry_stars',
    sidebarStarId: 'stars-geometry',
    defaultLearnModule: 'geom_foundations',
    learnModules: LEARN_MODULES_TOPIC_5,
    practicePool: PRACTICE_POOL_TOPIC_5,
    practiceCategories: [
      { id: 'all', label: '🌟 All Questions' },
      { id: 'foundations', label: '📍 Points, Lines & Rays' },
      { id: 'line_relationships', label: '🛤️ Parallel & Perpendicular' },
      { id: 'angle_types', label: '📐 Angle Types & Symbols' },
      { id: 'triangles_polygons', label: '🔺 Triangles & Polygon Sums' },
      { id: 'quadrilaterals_circles', label: '⬠ Quadrilaterals & Circles' },
      { id: 'clock_geometry', label: '⏰ Clock Hands & Constructions' }
    ],
    challengePool: CHALLENGE_QUESTIONS_TOPIC_5,
    worksheetRenderer: renderWorksheetViewTopic5
  },
  tables_speed_master: {
    id: 'tables_speed_master',
    title: 'Multiplication Tables (1 to 20): Mental Math & Speed Master',
    subtitle: 'CBSE Class 5 — Deconstruct & Conquer, Vedic Teen Shortcuts, 20×20 Grid & Speed Sprint',
    icon: '⚡',
    themeColor: '#f97316',
    targetStars: 10,
    starsKey: 'cbse_maths_tables_stars',
    sidebarStarId: 'stars-tables-speed',
    defaultLearnModule: 'grid_explorer_20',
    learnModules: (typeof LEARN_MODULES_TOPIC_TABLES !== 'undefined' ? LEARN_MODULES_TOPIC_TABLES : {}),
    practicePool: (typeof PRACTICE_POOL_TOPIC_TABLES !== 'undefined' ? PRACTICE_POOL_TOPIC_TABLES : []),
    practiceCategories: [
      { id: 'all', label: '🌟 All Dynamic Drills' },
      { id: 'foundational_teens', label: '🐣 Friendly Teens (11, 12, 15, 20)' },
      { id: 'tricky_teens', label: '🔥 Tricky Teens (13, 14, 16, 17, 18, 19)' },
      { id: 'split_mental_math', label: '🧠 Mental Split & Add' },
      { id: 'vedic_sprint', label: '⚡ Vedic Teen × Teen (11–19)' },
      { id: 'missing_multipliers', label: '🔍 Inverses & Missing Factors' },
      { id: 'word_problems', label: '🌍 Speed Word Problems' }
    ],
    challengePool: (typeof CHALLENGE_QUESTIONS_TOPIC_TABLES !== 'undefined' ? CHALLENGE_QUESTIONS_TOPIC_TABLES : []),
    worksheetRenderer: (typeof renderWorksheetViewTables !== 'undefined' ? renderWorksheetViewTables : function() {})
  },
  fractions_master: {
    id: 'fractions_master',
    title: 'Fractions Master: Visual Concepts to Advanced Operations',
    subtitle: 'CBSE Class 5 — Thinkbook Foundations, Visual Partitioning, Mixed Numbers & Full Arithmetic (+, −, ×, ÷)',
    icon: '🍕',
    themeColor: '#3b82f6',
    targetStars: 10,
    starsKey: 'cbse_maths_fractions_stars',
    sidebarStarId: 'stars-fractions',
    defaultLearnModule: 'equal_slice_detective',
    learnModules: (typeof LEARN_MODULES_TOPIC_FRACTIONS !== 'undefined' ? LEARN_MODULES_TOPIC_FRACTIONS : {}),
    practicePool: (typeof PRACTICE_POOL_TOPIC_FRACTIONS !== 'undefined' ? PRACTICE_POOL_TOPIC_FRACTIONS : []),
    practiceCategories: [
      { id: 'all', label: '🌟 All Dynamic Drills' },
      { id: 'partition_basics', label: '🍕 1. Equal Cuts & Basics' },
      { id: 'types_and_mixed', label: '⚖️ 2. Proper, Improper & Mixed' },
      { id: 'equivalent_simplest', label: '🔍 3. Equivalence & Lowest Terms' },
      { id: 'comparison_ordering', label: '📊 4. Comparison & Ordering' },
      { id: 'add_sub_operations', label: '➕ 5. Addition & Subtraction' },
      { id: 'multiply_of', label: '✖️ 6. "Of" & Multiplication' },
      { id: 'divide_reciprocals', label: '➗ 7. Division & Reciprocals' }
    ],
    challengePool: (typeof CHALLENGE_QUESTIONS_TOPIC_FRACTIONS !== 'undefined' ? CHALLENGE_QUESTIONS_TOPIC_FRACTIONS : []),
    worksheetRenderer: (typeof renderWorksheetViewFractions !== 'undefined' ? renderWorksheetViewFractions : function() {})
  },
  term_revision: {
    id: 'term_revision',
    title: 'Term Revision & Worksheet Builder',
    subtitle: 'CBSE Class 5 — Cumulative Exam Revision & Custom Worksheet Builder',
    icon: '📋',
    themeColor: '#eab308',
    targetStars: 10,
    starsKey: 'cbse_maths_revision_stars',
    sidebarStarId: 'stars-revision',
    defaultLearnModule: 'blueprint_overview',
    learnModules: LEARN_MODULES_REVISION,
    practicePool: PRACTICE_POOL_REVISION,
    practiceCategories: [
      { id: 'all', label: '🌟 All Questions' },
      { id: 'factors_hcf_lcm', label: '⭐ Factors & Multiples' },
      { id: 'divisibility', label: '⚡ Divisibility' },
      { id: 'expressions', label: '💬 BODMAS & Expressions' },
      { id: 'patterns', label: '🧩 Patterns' },
      { id: 'geometry', label: '📐 Geometry' }
    ],
    challengePool: CHALLENGE_QUESTIONS_REVISION,
    worksheetRenderer: renderWorksheetViewRevision
  },
  area_perimeter: {
    id: 'area_perimeter',
    title: 'Area & Perimeter Master',
    subtitle: 'CBSE Class 5 Chapter 8 — Formulas, Grid Calculations, Triangles & Irregular Shapes',
    icon: '📐',
    themeColor: '#10b981',
    targetStars: 10,
    starsKey: 'cbse_maths_area_stars',
    sidebarStarId: 'stars-area',
    defaultLearnModule: 'area_foundations_perim',
    learnModules: LEARN_MODULES_TOPIC_8,
    practicePool: PRACTICE_POOL_TOPIC_8,
    practiceCategories: [
      { id: 'all', label: '🌟 All Questions' },
      { id: 'foundations_formulas', label: '📏 Foundations & Formulas' },
      { id: 'factor_pairs_same_area', label: '🔲 Factor Pairs & Same Area' },
      { id: 'triangle_irregular_grids', label: '📐 Triangles & Grid Estimation' },
      { id: 'tiling_word_problems', label: '🧱 Floor Tiling & Real Life' }
    ],
    challengePool: CHALLENGE_QUESTIONS_TOPIC_8
  },
  volume_capacity: {
    id: 'volume_capacity',
    title: 'Volume & Capacity Master',
    subtitle: 'CBSE Class 5 Chapter 9 — 3D Solids, Cuboid (l × b × h), Base Area × Height & Liquid Litres',
    icon: '📦',
    themeColor: '#8b5cf6',
    targetStars: 10,
    starsKey: 'cbse_maths_volume_stars',
    sidebarStarId: 'stars-volume',
    defaultLearnModule: 'solids_3d_foundations',
    learnModules: LEARN_MODULES_TOPIC_9,
    practicePool: PRACTICE_POOL_TOPIC_9,
    practiceCategories: [
      { id: 'all', label: '🌟 All Questions' },
      { id: 'solids_3d_properties', label: '🧊 3D Solid Properties' },
      { id: 'cube_cuboid_volume', label: '📦 Cube & Cuboid Volume' },
      { id: 'base_area_height', label: '📐 Base Area × Height' },
      { id: 'capacity_conversions', label: '💧 Capacity & Litre Conversions' },
      { id: 'real_world_packing', label: '🐠 Real-World & Cube Packing' }
    ],
    challengePool: CHALLENGE_QUESTIONS_TOPIC_9
  }
};

/* ==========================================================================
   TOPIC MASTERY MILESTONES (10 STARS PER CURRICULUM TOPIC)
   ========================================================================== */

const TOPIC_MILESTONES = {
  factors_multiples_hcf_lcm: [
    {
      id: 'metaphor_detective',
      title: 'HCF vs LCM Mental Metaphors',
      desc: 'Mastered "The Equal Cutter" (HCF chopping down) vs "The Cycle Synchronizer" (LCM meeting ahead)',
      hint: 'Explore the HCF vs LCM Detective module in Learn mode and solve at least 1 question',
      check: (d) => (!!d.modulesInteracted.hcf_lcm_detective && d.totalSolved >= 1) || d.totalSolved >= 3
    },
    {
      id: 'division_methods',
      title: 'Short & Long Division Calculations',
      desc: 'Mastered prime factorization, the division ladder, and Euclidean division steps',
      hint: 'Solve at least 3 division calculation questions in Practice mode',
      check: (d) => (d.categorySolved.division_methods || 0) >= 3 || d.totalSolved >= 5
    },
    {
      id: 'formula_relations',
      title: 'Product Formula & Co-Prime Rules',
      desc: 'Mastered HCF × LCM = a × b and the rule that consecutive integers are always co-prime',
      hint: 'Solve at least 3 Product Formula questions in Practice mode',
      check: (d) => (d.categorySolved.formula_relations || 0) >= 3 || d.totalSolved >= 8
    },
    {
      id: 'trap_buster',
      title: 'Diagnostic Trap Buster',
      desc: 'Spotted exam traps: HCF cannot exceed the smaller number, LCM cannot be less than the larger number',
      hint: 'Explore the Spot the Mistakes module in Learn mode',
      check: (d) => (!!d.modulesInteracted.spot_the_mistakes && d.totalSolved >= 5) || d.totalSolved >= 10
    },
    {
      id: 'word_problems',
      title: 'Real-Life Word Problems Detective',
      desc: 'Correctly deduced whether to calculate HCF or LCM in real-world application problems',
      hint: 'Solve at least 3 Word Problems in Practice mode',
      check: (d) => (d.categorySolved.word_problems || 0) >= 3 || d.totalSolved >= 12
    },
    {
      id: 'school_worksheet',
      title: 'CBSE School Worksheet 2026-27',
      desc: 'Mastered questions transcribed directly from the latest Class 5 CBSE School Worksheets',
      hint: 'Solve at least 4 School Worksheet questions in Practice mode',
      check: (d) => (d.categorySolved.school_worksheet || 0) >= 4 || d.totalSolved >= 15
    },
    {
      id: 'worksheet_mode',
      title: 'Worksheet Printing & Self-Test',
      desc: 'Inspected or printed printable worksheets for school homework practice',
      hint: 'Switch to Worksheet Mode or explore homework printable sheets',
      check: (d) => (!!d.modulesInteracted.worksheet_mode && d.totalSolved >= 8) || d.totalSolved >= 16
    },
    {
      id: 'practice_breadth',
      title: 'Comprehensive Practice Breadth',
      desc: 'Solved at least 18 practice problems across all curriculum subcategories',
      hint: 'Solve 18 or more practice questions across all categories',
      check: (d) => d.totalSolved >= 18
    },
    {
      id: 'practice_accuracy',
      title: 'High Accuracy & Conceptual Retention',
      desc: 'Achieved ≥80% practice accuracy with thorough step-by-step reasoning',
      hint: 'Maintain at least 80% accuracy in Practice mode with at least 15 questions solved',
      check: (d) => d.totalSolved >= 15 && d.accuracy >= 80
    },
    {
      id: 'sprint_speed',
      title: '60-Second Speed Sprint',
      desc: 'Achieved ≥7 correct answers in the rapid-fire 60-Second Challenge',
      hint: 'Score 7+ correct answers in the 60s Speed Challenge',
      check: (d) => d.challengeHighScore >= 7
    }
  ],

  divisibility_rules: [
    {
      id: 'rules_overview',
      title: 'Complete 2 to 12 Divisibility Matrix',
      desc: 'Explored the quick divisibility shortcuts for 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, and 12',
      hint: 'Review the Divisibility Rules Table in Learn mode and solve at least 1 question',
      check: (d) => (!!d.modulesInteracted.all_rules_table && d.totalSolved >= 1) || d.totalSolved >= 3
    },
    {
      id: 'sum_rules_3_9',
      title: 'Sum-of-Digits Rules (3 & 9)',
      desc: 'Mastered the digital root tests: if digit sum is divisible by 3 or 9, the number is divisible',
      hint: 'Solve at least 3 Rule 3 & 9 questions in Practice mode',
      check: (d) => (d.categorySolved.rule_3_9 || 0) >= 3 || d.totalSolved >= 6
    },
    {
      id: 'end_digits_4_8',
      title: 'End-Digits Block Rules (4 & 8)',
      desc: 'Tested the last 2 digits for 4 and the last 3 digits for 8 without calculating full division',
      hint: 'Solve at least 3 Rule 4 & 8 questions in Practice mode',
      check: (d) => (d.categorySolved.rule_4_8 || 0) >= 3 || d.totalSolved >= 8
    },
    {
      id: 'composite_rules_6_12',
      title: 'Composite Coprime Pair Rules (6 & 12)',
      desc: 'Applied composite tests: 6 requires divisibility by 2 AND 3; 12 requires 3 AND 4',
      hint: 'Solve at least 3 Rule 6 & 12 questions in Practice mode',
      check: (d) => (d.categorySolved.rule_6_12 || 0) >= 3 || d.totalSolved >= 11
    },
    {
      id: 'alternating_rule_11',
      title: 'The Jumping Kangaroo Rule (11)',
      desc: 'Calculated (Sum of Odd-place digits) − (Sum of Even-place digits) to test multiples of 11',
      hint: 'Solve at least 3 Rule 11 questions in Practice mode',
      check: (d) => (d.categorySolved.rule_11 || 0) >= 3 || d.totalSolved >= 14
    },
    {
      id: 'missing_digit_puzzles',
      title: 'Missing Digit (*) Codebreaker',
      desc: 'Found the smallest or largest missing digit to satisfy one or more divisibility constraints',
      hint: 'Solve at least 3 Missing Digit questions in Practice mode',
      check: (d) => (d.categorySolved.missing_digit || 0) >= 3 || d.totalSolved >= 16
    },
    {
      id: 'trap_buster',
      title: 'Diagnostic Trap Buster',
      desc: 'Avoided the false "Rule 8 ends in 8" trap and composite factor traps',
      hint: 'Explore Spot the Mistakes in Learn mode or solve 18 questions',
      check: (d) => (!!d.modulesInteracted.spot_the_mistakes && d.totalSolved >= 9) || d.totalSolved >= 18
    },
    {
      id: 'practice_breadth',
      title: 'Divisibility Fluency & Breadth',
      desc: 'Solved at least 20 practice questions across single and combined divisibility rules',
      hint: 'Solve 20 or more practice questions across all divisibility categories',
      check: (d) => d.totalSolved >= 20
    },
    {
      id: 'practice_accuracy',
      title: 'High Accuracy & Common-Sense Logic',
      desc: 'Maintained ≥80% accuracy across all divisibility tests without scratchpad division',
      hint: 'Achieve at least 80% accuracy with at least 15 questions solved',
      check: (d) => d.totalSolved >= 15 && d.accuracy >= 80
    },
    {
      id: 'sprint_speed',
      title: '60-Second Speed Sprint',
      desc: 'Achieved ≥7 correct answers in the 60-Second Divisibility Sprint',
      hint: 'Score 7+ correct answers in the 60s Speed Challenge',
      check: (d) => d.challengeHighScore >= 7
    }
  ],

  expressions_statements: [
    {
      id: 'clue_words',
      title: 'Verbal Clue Words Dictionary',
      desc: 'Mastered mathematical keywords: Sum, Difference, Product, Quotient, Times, and Less Than',
      hint: 'Explore Clue Words Dictionary in Learn mode and solve at least 1 question',
      check: (d) => (!!d.modulesInteracted.clue_words_dictionary && d.totalSolved >= 1) || d.totalSolved >= 3
    },
    {
      id: 'statement_to_expr',
      title: 'Statements to Expressions',
      desc: 'Converted verbal sentences into formal mathematical expressions with correct operators',
      hint: 'Solve at least 4 Statements ➔ Expressions questions in Practice mode',
      check: (d) => (d.categorySolved.statement_to_expr || 0) >= 4 || d.totalSolved >= 6
    },
    {
      id: 'expr_to_statement',
      title: 'Expressions to Verbal Statements',
      desc: 'Translated algebraic and numerical expressions back into everyday language',
      hint: 'Solve at least 4 Expressions ➔ Statements questions in Practice mode',
      check: (d) => (d.categorySolved.expr_to_statement || 0) >= 4 || d.totalSolved >= 9
    },
    {
      id: 'bracket_order_traps',
      title: 'Parentheses & Subtraction Order Traps',
      desc: 'Mastered order traps: "5 subtracted from x" is x − 5, not 5 − x, and brackets change precedence',
      hint: 'Solve at least 4 Brackets & Order Traps questions in Practice mode',
      check: (d) => (d.categorySolved.bracket_traps || 0) >= 4 || d.totalSolved >= 12
    },
    {
      id: 'real_life_modeling',
      title: 'Real-Life CBSE Word Problems',
      desc: 'Modeled everyday situations: ages, pocket money, geometric perimeters, and shopping bills',
      hint: 'Solve at least 3 Real-Life Word Problems in Practice mode',
      check: (d) => (d.categorySolved.word_problems || 0) >= 3 || d.totalSolved >= 15
    },
    {
      id: 'bodmas_precedence',
      title: 'Order of Operations & BODMAS',
      desc: 'Evaluated expressions following Brackets, Orders, Division/Multiplication, then Addition/Subtraction',
      hint: 'Explore the Order of Operations module in Learn mode or solve 16 questions',
      check: (d) => (!!d.modulesInteracted.order_of_operations && d.totalSolved >= 8) || d.totalSolved >= 16
    },
    {
      id: 'trap_buster',
      title: 'Diagnostic Trap Buster',
      desc: 'Spotted exam slips in word order and missing parentheses in Spot the Mistakes',
      hint: 'Explore Spot the Mistakes in Learn mode or solve 18 questions',
      check: (d) => (!!d.modulesInteracted.spot_the_mistakes && d.totalSolved >= 9) || d.totalSolved >= 18
    },
    {
      id: 'practice_breadth',
      title: 'Expressions Practice Mastery',
      desc: 'Solved at least 20 practice questions across translation and modeling categories',
      hint: 'Solve 20 or more practice questions in Practice mode',
      check: (d) => d.totalSolved >= 20
    },
    {
      id: 'practice_accuracy',
      title: 'High Accuracy & Precision',
      desc: 'Maintained ≥80% accuracy in translating and interpreting mathematical statements',
      hint: 'Achieve at least 80% accuracy with at least 15 questions solved',
      check: (d) => d.totalSolved >= 15 && d.accuracy >= 80
    },
    {
      id: 'sprint_speed',
      title: '60-Second Speed Sprint',
      desc: 'Achieved ≥7 correct answers in the 60-Second Expressions Sprint',
      hint: 'Score 7+ correct answers in the 60s Speed Challenge',
      check: (d) => d.challengeHighScore >= 7
    }
  ],

  number_patterns: [
    {
      id: 'pattern_detective',
      title: 'The Pattern Detective',
      desc: 'Identified constant step differences, alternating patterns, and sequences of multiples',
      hint: 'Explore the Pattern Detective module in Learn mode and solve at least 1 question',
      check: (d) => (!!d.modulesInteracted.pattern_detective && d.totalSolved >= 1) || d.totalSolved >= 3
    },
    {
      id: 'arithmetic_patterns',
      title: 'Growing & Decreasing Patterns',
      desc: 'Found missing terms in arithmetic sequences and identified recurrence rules',
      hint: 'Solve at least 4 Step & Growing Patterns questions in Practice mode',
      check: (d) => (d.categorySolved.arithmetic_patterns || 0) >= 4 || d.totalSolved >= 6
    },
    {
      id: 'triangular_numbers',
      title: 'Triangular Numbers (1, 3, 6, 10, 15...)',
      desc: 'Mastered dot representation and the formula n × (n + 1) / 2 for triangular numbers',
      hint: 'Solve at least 3 Geometric Numbers questions in Practice mode',
      check: (d) => (d.categorySolved.geom_numbers || 0) >= 3 || d.totalSolved >= 9
    },
    {
      id: 'square_numbers',
      title: 'Square Numbers & Odd Number Sums',
      desc: 'Mastered square grids and the rule that the sum of the first n odd numbers equals n²',
      hint: 'Explore Square Numbers in Learn mode or solve 5 geometric pattern questions',
      check: (d) => (d.categorySolved.geom_numbers || 0) >= 5 || d.totalSolved >= 12
    },
    {
      id: 'number_towers',
      title: 'Number Towers & Pyramids',
      desc: 'Constructed number pyramids where each brick is the sum of the two bricks beneath it',
      hint: 'Solve at least 3 Number Towers questions in Practice mode',
      check: (d) => (d.categorySolved.number_towers || 0) >= 3 || d.totalSolved >= 14
    },
    {
      id: 'magic_squares',
      title: 'Magic Squares & Palindromes',
      desc: 'Mastered 3×3 magic squares (magic sum 15) and number reversal palindrome patterns',
      hint: 'Solve at least 3 Magic Squares & Palindromes questions in Practice mode',
      check: (d) => (d.categorySolved.magic_palindromes || 0) >= 3 || d.totalSolved >= 16
    },
    {
      id: 'trap_buster',
      title: 'Diagnostic Trap Buster',
      desc: 'Diagnosed deceptive pattern slips where the second difference changes',
      hint: 'Explore Spot the Mistakes in Learn mode or solve 18 questions',
      check: (d) => (!!d.modulesInteracted.spot_the_mistakes && d.totalSolved >= 9) || d.totalSolved >= 18
    },
    {
      id: 'practice_breadth',
      title: 'Pattern Deduction Breadth',
      desc: 'Solved at least 20 pattern puzzles across numerical, triangular, and pyramid domains',
      hint: 'Solve 20 or more pattern questions in Practice mode',
      check: (d) => d.totalSolved >= 20
    },
    {
      id: 'practice_accuracy',
      title: 'High Accuracy & Visual Deduction',
      desc: 'Achieved ≥80% accuracy across all pattern recognition challenges',
      hint: 'Achieve at least 80% accuracy with at least 15 questions solved',
      check: (d) => d.totalSolved >= 15 && d.accuracy >= 80
    },
    {
      id: 'sprint_speed',
      title: '60-Second Speed Sprint',
      desc: 'Achieved ≥7 correct answers in the 60-Second Pattern Sprint',
      hint: 'Score 7+ correct answers in the 60s Speed Challenge',
      check: (d) => d.challengeHighScore >= 7
    }
  ],

  geometry_angles: [
    {
      id: 'geom_foundations',
      title: 'Points, Lines, Rays & Segments',
      desc: 'Mastered standard notations and endpoint rules: Point (0 endpoints), Line (0), Ray (1), Segment (2)',
      hint: 'Solve at least 3 Foundations questions in Practice mode',
      check: (d) => (d.categorySolved.foundations || 0) >= 3 || d.totalSolved >= 3
    },
    {
      id: 'parallel_perpendicular',
      title: 'Parallel & Perpendicular Lines',
      desc: 'Identified parallel lines (never meet) and perpendicular lines (meet at 90° right angles)',
      hint: 'Solve at least 3 Line Relationships questions in Practice mode',
      check: (d) => (d.categorySolved.line_relationships || 0) >= 3 || d.totalSolved >= 6
    },
    {
      id: 'angle_types',
      title: 'Angle Classification & Measurement',
      desc: 'Classified Acute (<90°), Right (90°), Obtuse (90°–180°), Straight (180°), Reflex (180°–360°), and Complete (360°)',
      hint: 'Solve at least 4 Angle Types questions in Practice mode',
      check: (d) => (d.categorySolved.angle_types || 0) >= 4 || d.totalSolved >= 9
    },
    {
      id: 'triangles_polygons',
      title: 'Triangles & Polygon Angle Sums',
      desc: 'Mastered triangle classification (by sides and angles) and the fundamental rule: Triangle angle sum = 180°',
      hint: 'Solve at least 3 Triangles & Polygons questions in Practice mode',
      check: (d) => (d.categorySolved.triangles_polygons || 0) >= 3 || d.totalSolved >= 12
    },
    {
      id: 'quadrilaterals_circles',
      title: 'Quadrilaterals & 360° Interior Sum',
      desc: 'Mastered properties of square, rectangle, rhombus, and parallelogram; Quadrilateral angle sum = 360°',
      hint: 'Solve at least 3 Quadrilaterals questions in Practice mode',
      check: (d) => (d.categorySolved.quadrilaterals_circles || 0) >= 3 || d.totalSolved >= 15
    },
    {
      id: 'circle_anatomy',
      title: 'Circle Anatomy (Radius, Diameter, Chord)',
      desc: 'Mastered Center, Radius, Diameter (d = 2r), Chord, Arc, and Circumference relationships',
      hint: 'Solve at least 5 circle/quadrilateral questions or explore Circle Foundations',
      check: (d) => (d.categorySolved.quadrilaterals_circles || 0) >= 5 || d.totalSolved >= 17
    },
    {
      id: 'clock_geometry',
      title: 'Clock Hands Angle Detective',
      desc: 'Calculated angles formed by hour and minute hands at various times (each hour gap = 30°)',
      hint: 'Solve at least 3 Clock Geometry questions in Practice mode',
      check: (d) => (d.categorySolved.clock_geometry || 0) >= 3 || d.totalSolved >= 19
    },
    {
      id: 'trap_buster',
      title: 'Diagnostic Trap Buster',
      desc: 'Avoided protractor inner vs outer scale misreadings and line vs ray confusion',
      hint: 'Explore Spot the Mistakes in Learn mode or solve 20 questions',
      check: (d) => (!!d.modulesInteracted.spot_the_mistakes && d.totalSolved >= 10) || d.totalSolved >= 20
    },
    {
      id: 'practice_breadth',
      title: 'Geometry & Angles Fluency',
      desc: 'Solved at least 22 geometry questions across all structural categories',
      hint: 'Solve 22 or more practice questions in Practice mode',
      check: (d) => d.totalSolved >= 22
    },
    {
      id: 'sprint_speed',
      title: '60-Second Speed Sprint',
      desc: 'Achieved ≥7 correct answers in the 60-Second Geometry Sprint',
      hint: 'Score 7+ correct answers in the 60s Speed Challenge',
      check: (d) => d.challengeHighScore >= 7
    }
  ],

  tables_speed_master: [
    {
      id: 'grid_explorer',
      title: '20×20 Grid & Square Symmetry',
      desc: 'Explored the multiplication table matrix and diagonal symmetry (a × b = b × a)',
      hint: 'Explore the 20×20 Grid Explorer in Learn mode and solve at least 1 question',
      check: (d) => ((!!d.checkpoints.checkpoint_grid || !!d.modulesInteracted.grid_explorer_20) && d.totalSolved >= 1) || d.totalSolved >= 3
    },
    {
      id: 'split_and_add',
      title: 'The Split-and-Add Hammer',
      desc: 'Decomposed 2-digit numbers into tens and units (e.g. 18 × 4 = 10 × 4 + 8 × 4 = 40 + 32 = 72)',
      hint: 'Clear the Split-and-Add checkpoint or solve 3 split questions',
      check: (d) => (!!d.checkpoints.checkpoint_split && d.totalSolved >= 2) || (d.categorySolved.split_mental_math || 0) >= 3 || d.totalSolved >= 6
    },
    {
      id: 'vedic_teen_shortcuts',
      title: 'Vedic Teen × Teen 2-Second Trick',
      desc: 'Applied Base-10 cross addition: (10+a)(10+b) = ((10+a)+b)×10 + a×b in under 3 seconds',
      hint: 'Clear the Vedic checkpoint or solve 3 Vedic teen questions',
      check: (d) => (!!d.checkpoints.checkpoint_vedic && d.totalSolved >= 3) || (d.categorySolved.vedic_sprint || 0) >= 3 || d.totalSolved >= 9
    },
    {
      id: 'trap_buster',
      title: 'Diagnostic Carry Trap Buster',
      desc: 'Spotted unit-digit miscalculations and carry-over slips in mental multiplication',
      hint: 'Clear the Traps checkpoint or explore Spot the Mistakes',
      check: (d) => ((!!d.checkpoints.checkpoint_traps || !!d.modulesInteracted.tables_traps) && d.totalSolved >= 4) || d.totalSolved >= 12
    },
    {
      id: 'foundational_teens',
      title: 'Friendly Teens Fluency (11, 12, 15, 20)',
      desc: 'Achieved instantaneous mental recall for key benchmark multipliers',
      hint: 'Solve at least 4 Friendly Teens questions in Practice mode',
      check: (d) => (d.categorySolved.foundational_teens || 0) >= 4 || d.totalSolved >= 15
    },
    {
      id: 'tricky_teens',
      title: 'Tricky Teens Mastery (13, 14, 16, 17, 18, 19)',
      desc: 'Conquered the toughest single-digit multiples of prime and composite teens',
      hint: 'Solve at least 4 Tricky Teens questions in Practice mode',
      check: (d) => (d.categorySolved.tricky_teens || 0) >= 4 || d.totalSolved >= 18
    },
    {
      id: 'missing_multipliers',
      title: 'Missing Multipliers & Division Inverses',
      desc: 'Solved inverse equations (? × 16 = 112) using fast mental factor testing',
      hint: 'Solve at least 3 Missing Multipliers questions in Practice mode',
      check: (d) => (d.categorySolved.missing_multipliers || 0) >= 3 || d.totalSolved >= 20
    },
    {
      id: 'speed_word_problems',
      title: 'Real-Life Rate & Speed Word Problems',
      desc: 'Applied rapid multiplication to cost calculations, uniform rates, and group sizing',
      hint: 'Solve at least 3 Speed Word Problems in Practice mode',
      check: (d) => (d.categorySolved.word_problems || 0) >= 3 || d.totalSolved >= 22
    },
    {
      id: 'dynamic_drill_breadth',
      title: 'Dynamic Question Engine Dedication',
      desc: 'Solved at least 25 dynamically randomized multiplication questions',
      hint: 'Solve 25 or more dynamic questions in Practice mode',
      check: (d) => d.totalSolved >= 25 || (d.tablesPracticeSolvedCount || 0) >= 20
    },
    {
      id: 'speed_sprint_mastery',
      title: '60-Second Speed Sprint (80%+)',
      desc: 'Achieved ≥80% accuracy in the rapid-fire 60-Second Multiplication Sprint',
      hint: 'Score 80%+ accuracy or 8+ correct answers in the 60s Speed Sprint',
      check: (d) => d.challengeHighScore >= 80 || d.challengeAccuracy >= 80 || (state.tablesChallengeHighScore || 0) >= 80
    }
  ],

  fractions_master: [
    {
      id: 'partition_basics',
      title: 'Equal Cuts & Visual Foundations',
      desc: 'Mastered numerator (shaded pieces) over denominator (total equal cuts) with visual diagrams',
      hint: 'Clear Learn Checkpoint 1 and solve at least 1 question (or solve 3 questions in Practice mode)',
      check: (d) => (!!d.checkpoints.checkpoint_frac_1 && d.totalSolved >= 1) || (d.categorySolved.partition_basics || 0) >= 3 || d.totalSolved >= 3
    },
    {
      id: 'types_and_mixed',
      title: 'Proper, Improper & Mixed Numbers',
      desc: 'Converted between improper fractions and mixed numerals (e.g. 11/4 = 2 ¾)',
      hint: 'Clear Learn Checkpoint 2 or solve 3 Mixed Numbers questions',
      check: (d) => (!!d.checkpoints.checkpoint_frac_2 && d.totalSolved >= 2) || (d.categorySolved.types_and_mixed || 0) >= 3 || d.totalSolved >= 6
    },
    {
      id: 'equivalent_fractions',
      title: 'Equivalence & Lowest Terms Simplifier',
      desc: 'Found equivalent fractions by scaling and simplified to lowest terms by dividing by HCF',
      hint: 'Clear Learn Checkpoint 3 or solve 3 Equivalence questions',
      check: (d) => (!!d.checkpoints.checkpoint_frac_3 && d.totalSolved >= 3) || (d.categorySolved.equivalent_simplest || 0) >= 3 || d.totalSolved >= 9
    },
    {
      id: 'comparison_ordering',
      title: 'Fraction Comparison & LCM Common Base',
      desc: 'Compared and ordered like, unlike, and unit fractions using cross-multiplication and LCM',
      hint: 'Clear Learn Checkpoint 4 or solve 3 Comparison questions',
      check: (d) => (!!d.checkpoints.checkpoint_frac_4 && d.totalSolved >= 4) || (d.categorySolved.comparison_ordering || 0) >= 3 || d.totalSolved >= 12
    },
    {
      id: 'add_sub_operations',
      title: 'Addition & Subtraction of Fractions',
      desc: 'Added and subtracted like and unlike fractions with common denominators',
      hint: 'Clear Learn Checkpoint 5 or solve 3 Addition/Subtraction questions',
      check: (d) => (!!d.checkpoints.checkpoint_frac_5 && d.totalSolved >= 5) || (d.categorySolved.add_sub_operations || 0) >= 3 || d.totalSolved >= 15
    },
    {
      id: 'multiplication_of',
      title: '"Of" & Fraction Multiplication',
      desc: 'Mastered fraction of a whole number (e.g. ⅗ of 35 = 21) and fraction × fraction',
      hint: 'Clear Learn Checkpoint 6 or solve 3 Multiplication questions',
      check: (d) => (!!d.checkpoints.checkpoint_frac_6 && d.totalSolved >= 6) || (d.categorySolved.multiply_of || 0) >= 3 || d.totalSolved >= 18
    },
    {
      id: 'division_reciprocals',
      title: 'Division & The Reciprocal Flip',
      desc: 'Mastered fraction division using Keep-Change-Flip: dividing by a fraction is multiplying by its reciprocal',
      hint: 'Solve at least 3 Division & Reciprocals questions in Practice mode',
      check: (d) => (d.categorySolved.divide_reciprocals || 0) >= 3 || d.totalSolved >= 20
    },
    {
      id: 'real_life_word_problems',
      title: 'Real-Life Fraction Word Problems',
      desc: 'Solved multi-step CBSE word problems involving recipes, sharing, time, and distances',
      hint: 'Solve at least 22 practice questions across all categories',
      check: (d) => d.totalSolved >= 22
    },
    {
      id: 'dynamic_practice_breadth',
      title: 'Dynamic Fractions Engine Mastery',
      desc: 'Solved at least 25 dynamically generated fraction questions with step-by-step reasoning',
      hint: 'Solve 25 or more dynamic questions in Practice mode',
      check: (d) => d.totalSolved >= 25 || (d.fractionsPracticeSolvedCount || 0) >= 20
    },
    {
      id: 'speed_sprint_mastery',
      title: '60-Second Fractions Sprint (80%+)',
      desc: 'Achieved ≥80% accuracy in the rapid-fire 60-Second Fractions Sprint',
      hint: 'Score 80%+ accuracy or 8+ correct answers in the 60s Speed Sprint',
      check: (d) => d.challengeHighScore >= 80 || d.challengeAccuracy >= 80 || (state.fractionsChallengeHighScore || 0) >= 80
    }
  ],

  term_revision: [
    {
      id: 'blueprint_overview',
      title: 'CBSE Exam Blueprint & Weightage',
      desc: 'Inspected the CBSE Class 5 term examination blueprint and mark allocation across topics',
      hint: 'Explore the Exam Blueprint Overview in Learn mode and solve at least 1 question',
      check: (d) => (!!d.modulesInteracted.blueprint_overview && d.totalSolved >= 1) || d.totalSolved >= 3
    },
    {
      id: 'factors_hcf_lcm_rev',
      title: 'Factors & Multiples Exam Questions',
      desc: 'Mastered cumulative exam questions on HCF, LCM, prime factors, and product relation',
      hint: 'Solve at least 3 Factors & Multiples questions in Practice mode',
      check: (d) => (d.categorySolved.factors_hcf_lcm || 0) >= 3 || d.totalSolved >= 6
    },
    {
      id: 'divisibility_rev',
      title: 'Divisibility Rules Exam Questions',
      desc: 'Solved cumulative exam questions on multi-digit divisibility rules and missing digits',
      hint: 'Solve at least 3 Divisibility questions in Practice mode',
      check: (d) => (d.categorySolved.divisibility || 0) >= 3 || d.totalSolved >= 9
    },
    {
      id: 'expressions_rev',
      title: 'Expressions & BODMAS Exam Questions',
      desc: 'Solved cumulative exam questions on algebraic statements and bracket precedence',
      hint: 'Solve at least 3 BODMAS & Expressions questions in Practice mode',
      check: (d) => (d.categorySolved.expressions || 0) >= 3 || d.totalSolved >= 12
    },
    {
      id: 'patterns_rev',
      title: 'Number Patterns & Towers Exam Questions',
      desc: 'Solved cumulative exam questions on triangular numbers, squares, and number pyramids',
      hint: 'Solve at least 3 Patterns questions in Practice mode',
      check: (d) => (d.categorySolved.patterns || 0) >= 3 || d.totalSolved >= 15
    },
    {
      id: 'geometry_rev',
      title: 'Geometry & Angles Exam Questions',
      desc: 'Solved cumulative exam questions on line relations, angle sums, and circle geometry',
      hint: 'Solve at least 3 Geometry questions in Practice mode',
      check: (d) => (d.categorySolved.geometry || 0) >= 3 || d.totalSolved >= 18
    },
    {
      id: 'custom_builder',
      title: 'Worksheet Builder Cherry-Picker',
      desc: 'Customized chapters in the Worksheet Builder and previewed custom school revision papers',
      hint: 'Switch to Worksheet Mode and customize chapter selections',
      check: (d) => ((!!d.customWorksheetExported || !!d.modulesInteracted.worksheet_builder) && d.totalSolved >= 10) || d.totalSolved >= 20
    },
    {
      id: 'cumulative_breadth',
      title: 'Cumulative Syllabus Breadth',
      desc: 'Solved at least 22 cumulative revision questions across all 5 core mathematical domains',
      hint: 'Solve 22 or more questions in Practice mode across all categories',
      check: (d) => d.totalSolved >= 22
    },
    {
      id: 'cumulative_accuracy',
      title: 'Exam-Level Accuracy (80%+)',
      desc: 'Maintained ≥80% accuracy across mixed cumulative revision questions',
      hint: 'Achieve at least 80% accuracy with at least 18 questions solved',
      check: (d) => d.totalSolved >= 18 && d.accuracy >= 80
    },
    {
      id: 'speed_sprint_mastery',
      title: '60-Second Cumulative Sprint',
      desc: 'Achieved ≥8 correct answers in the comprehensive 60-Second Speed Challenge',
      hint: 'Score 8+ correct answers in the 60s Speed Challenge',
      check: (d) => d.challengeHighScore >= 8
    }
  ],
  area_perimeter: [
    {
      id: 'area_foundations',
      title: 'Perimeter vs Area Foundations',
      desc: 'Mastered the boundary fence vs turf carpet mental metaphor and standard units (sq cm, sq m)',
      hint: 'Clear Learn Checkpoint 1 (or solve 2 questions total in Practice mode)',
      check: (d) => !!d.checkpoints.checkpoint_area_1 || (d.categorySolved.foundations_formulas || 0) >= 2 || d.totalSolved >= 2
    },
    {
      id: 'same_area_factors',
      title: 'Factor Pairs & Same Area',
      desc: 'Understood that different rectangles can share identical areas (factors of 12, 18, 24)',
      hint: 'Clear Learn Checkpoint 2 (or solve 4 questions total in Practice mode)',
      check: (d) => !!d.checkpoints.checkpoint_area_2 || (d.categorySolved.factor_pairs_same_area || 0) >= 2 || d.totalSolved >= 4
    },
    {
      id: 'triangle_half_rule',
      title: 'The Half-Rectangle Triangle Rule',
      desc: 'Mastered finding triangle area by dividing into right-angled halves inside bounding rectangles',
      hint: 'Clear Learn Checkpoint 3 (or solve 6 questions total in Practice mode)',
      check: (d) => !!d.checkpoints.checkpoint_area_3 || (d.categorySolved.triangle_irregular_grids || 0) >= 2 || d.totalSolved >= 6
    },
    {
      id: 'irregular_grid_rule',
      title: 'Irregular Shapes & 4-Step Grid Rule',
      desc: 'Applied the official CBSE 4-step rule (full, >half, half, ignore) to estimate real-world areas',
      hint: 'Clear Learn Checkpoint 4 (or solve 8 questions total in Practice mode)',
      check: (d) => !!d.checkpoints.checkpoint_area_4 || (d.categorySolved.triangle_irregular_grids || 0) >= 4 || d.totalSolved >= 8
    },
    {
      id: 'tiling_mastery',
      title: 'Floor Tiling & Real-World Paving',
      desc: 'Mastered Room Area ÷ Tile Area calculations and cost estimations',
      hint: 'Clear Learn Checkpoint 5 (or solve 10 questions total in Practice mode)',
      check: (d) => !!d.checkpoints.checkpoint_area_5 || (d.categorySolved.tiling_word_problems || 0) >= 2 || d.totalSolved >= 10
    },
    {
      id: 'practice_formulas',
      title: 'Formula Calculations Precision',
      desc: 'Solved rectangle (l × b) and square (s²) area & perimeter calculations',
      hint: 'Solve at least 3 formula questions in Practice mode',
      check: (d) => (d.categorySolved.foundations_formulas || 0) >= 3 || d.totalSolved >= 3
    },
    {
      id: 'practice_factors',
      title: 'Factor Pairs & Dimension Deductions',
      desc: 'Correctly deduced length, breadth, and perimeter comparisons for given areas',
      hint: 'Solve at least 2 factor pairs questions in Practice mode (or 5 questions total)',
      check: (d) => (d.categorySolved.factor_pairs_same_area || 0) >= 2 || d.totalSolved >= 5
    },
    {
      id: 'practice_tiling',
      title: 'Floor Tiling Word Problems',
      desc: 'Solved room marble slab paving, crossword puzzle areas, and carpeting cost problems',
      hint: 'Solve at least 2 tiling word problems in Practice mode (or 7 questions total)',
      check: (d) => (d.categorySolved.tiling_word_problems || 0) >= 2 || d.totalSolved >= 7
    },
    {
      id: 'practice_breadth',
      title: 'Area Curriculum Breadth',
      desc: 'Solved at least 10 curriculum questions across all categories of Chapter 8 Area',
      hint: 'Solve at least 10 practice questions with ≥70% accuracy',
      check: (d) => d.totalSolved >= 10 && (d.accuracy || 0) >= 70
    },
    {
      id: 'sprint_speed',
      title: 'Area Speed Master',
      desc: 'Completed the 60s Area Sprint Challenge or achieved 12 practice questions',
      hint: 'Earn at least 4 correct answers on the 60s Sprint (or solve 12 questions total)',
      check: (d) => (d.challengeHighScore || 0) >= 4 || d.totalSolved >= 12
    }
  ],
  volume_capacity: [
    {
      id: 'solids_foundations',
      title: 'Solid 3D Shapes & Volume Units',
      desc: 'Mastered faces, edges, and vertices of 3D solids and cubic units (cm³, m³)',
      hint: 'Clear Learn Checkpoint 1 (or solve 2 questions total in Practice mode)',
      check: (d) => !!d.checkpoints.checkpoint_vol_1 || (d.categorySolved.solids_3d_properties || 0) >= 2 || d.totalSolved >= 2
    },
    {
      id: 'cube_cuboid_rule',
      title: 'Cube & Cuboid Volume Formulas',
      desc: 'Mastered l × b × h and s³ by counting centimetre cube layers',
      hint: 'Clear Learn Checkpoint 2 (or solve 4 questions total in Practice mode)',
      check: (d) => !!d.checkpoints.checkpoint_vol_2 || (d.categorySolved.cube_cuboid_volume || 0) >= 2 || d.totalSolved >= 4
    },
    {
      id: 'base_area_relation',
      title: 'Base Area × Height Master Relation',
      desc: 'Mastered Volume = Base Area × Height and inverse height deductions',
      hint: 'Clear Learn Checkpoint 3 (or solve 6 questions total in Practice mode)',
      check: (d) => !!d.checkpoints.checkpoint_vol_3 || (d.categorySolved.base_area_height || 0) >= 2 || d.totalSolved >= 6
    },
    {
      id: 'capacity_equivalence',
      title: 'The Golden Equivalence (1 L = 1000 cm³)',
      desc: 'Mastered liquid capacity conversions (1 L = 1000 mL = 1000 cm³) and water displacement',
      hint: 'Clear Learn Checkpoint 4 (or solve 8 questions total in Practice mode)',
      check: (d) => !!d.checkpoints.checkpoint_vol_4 || (d.categorySolved.capacity_conversions || 0) >= 2 || d.totalSolved >= 8
    },
    {
      id: 'packing_mastery',
      title: 'Cube Packing & Real-World Dimensions',
      desc: 'Mastered packing cartons with unit cubes and dimensional deductions',
      hint: 'Clear Learn Checkpoint 5 (or solve 10 questions total in Practice mode)',
      check: (d) => !!d.checkpoints.checkpoint_vol_5 || (d.categorySolved.real_world_packing || 0) >= 2 || d.totalSolved >= 10
    },
    {
      id: 'practice_solids',
      title: '3D Solid Properties Precision',
      desc: 'Solved questions on faces, edges, vertices, and cubic unit conventions',
      hint: 'Solve at least 2 solid properties questions (or 3 questions total)',
      check: (d) => (d.categorySolved.solids_3d_properties || 0) >= 2 || d.totalSolved >= 3
    },
    {
      id: 'practice_cuboid',
      title: 'Cube & Cuboid Volume Calculations',
      desc: 'Calculated box volumes and deduced missing dimensions using l × b × h',
      hint: 'Solve at least 3 cuboid volume questions (or 5 questions total)',
      check: (d) => (d.categorySolved.cube_cuboid_volume || 0) >= 3 || d.totalSolved >= 5
    },
    {
      id: 'practice_capacity',
      title: 'Litre & Millilitre Conversions',
      desc: 'Converted cm³ to litres/mL and calculated water displacement volume',
      hint: 'Solve at least 2 capacity conversion questions (or 7 questions total)',
      check: (d) => (d.categorySolved.capacity_conversions || 0) >= 2 || d.totalSolved >= 7
    },
    {
      id: 'practice_breadth',
      title: 'Volume Curriculum Breadth',
      desc: 'Solved at least 10 curriculum questions across all categories of Chapter 9 Volume',
      hint: 'Solve at least 10 practice questions with ≥70% accuracy',
      check: (d) => d.totalSolved >= 10 && (d.accuracy || 0) >= 70
    },
    {
      id: 'sprint_speed',
      title: 'Volume Speed Master',
      desc: 'Completed the 60s Volume Sprint Challenge or achieved 12 practice questions',
      hint: 'Earn at least 4 correct answers on the 60s Sprint (or solve 12 questions total)',
      check: (d) => (d.challengeHighScore || 0) >= 4 || (d.sprintHighScore || 0) >= 4 || d.totalSolved >= 12
    }
  ]
};

/* ==========================================================================
   TOPIC MASTERY ENGINE & LEARNING PASSPORT CONTROLLER
   ========================================================================== */

function getTopicStars(topicId) {
  const config = TOPICS_CONFIG[topicId];
  if (!config) return 0;
  try {
    const val = localStorage.getItem(config.starsKey);
    return val ? Math.min(config.targetStars || 10, Math.max(0, parseInt(val, 10) || 0)) : 0;
  } catch (e) {
    return 0;
  }
}

function setTopicStars(topicId, stars) {
  const config = TOPICS_CONFIG[topicId];
  if (!config) return;
  try {
    const target = config.targetStars || 10;
    const s = Math.min(target, Math.max(0, parseInt(stars, 10) || 0));
    localStorage.setItem(config.starsKey, s.toString());
    updateSidebarProgress();
  } catch (e) {}
}

function getTopicProgressData(topicId) {
  const config = TOPICS_CONFIG[topicId];
  if (!config) {
    return {
      modulesInteracted: {},
      checkpoints: {},
      categorySolved: {},
      totalSolved: 0,
      totalAttempted: 0,
      accuracy: 0,
      trapsDiagnosed: 0,
      challengeHighScore: 0,
      challengeAccuracy: 0,
      customWorksheetExported: false,
      tablesPracticeSolvedCount: 0,
      fractionsPracticeSolvedCount: 0
    };
  }

  state.topicProgress = state.topicProgress || {};
  const prog = state.topicProgress[topicId] || {};
  const modulesInteracted = prog.modulesInteracted || {};
  const checkpoints = Object.assign({}, prog.checkpoints || {});
  const categorySolved = Object.assign({}, prog.categorySolved || {});
  let totalSolved = prog.totalSolved || 0;
  let totalAttempted = prog.totalAttempted || 0;
  let trapsDiagnosed = prog.trapsDiagnosed || 0;
  let challengeHighScore = prog.challengeHighScore || 0;
  let challengeAccuracy = prog.challengeAccuracy || 0;
  const customWorksheetExported = !!prog.customWorksheetExported;

  // Integrate tables specific state
  if (topicId === 'tables_speed_master') {
    const cp = state.tablesLearnCheckpoints || {};
    Object.assign(checkpoints, cp);
    const tablesCount = state.tablesPracticeSolvedCount || 0;
    if (tablesCount > totalSolved) totalSolved = tablesCount;
    if (state.tablesChallengeHighScore) {
      challengeHighScore = Math.max(challengeHighScore, state.tablesChallengeHighScore);
      challengeAccuracy = Math.max(challengeAccuracy, state.tablesChallengeHighScore);
    }
  }

  // Integrate fractions specific state
  if (topicId === 'fractions_master') {
    const cp = state.fractionsLearnCheckpoints || {};
    Object.assign(checkpoints, cp);
    const fractionsCount = state.fractionsPracticeSolvedCount || 0;
    if (fractionsCount > totalSolved) totalSolved = fractionsCount;
    if (state.fractionsChallengeHighScore) {
      challengeHighScore = Math.max(challengeHighScore, state.fractionsChallengeHighScore);
      challengeAccuracy = Math.max(challengeAccuracy, state.fractionsChallengeHighScore);
    }
  }

  const accuracy = totalAttempted > 0 ? Math.round((totalSolved / totalAttempted) * 100) : (totalSolved > 0 ? 85 : 0);

  return {
    modulesInteracted,
    checkpoints,
    categorySolved,
    totalSolved,
    totalAttempted,
    accuracy,
    trapsDiagnosed,
    challengeHighScore,
    challengeAccuracy,
    customWorksheetExported,
    tablesPracticeSolvedCount: state.tablesPracticeSolvedCount || 0,
    fractionsPracticeSolvedCount: state.fractionsPracticeSolvedCount || 0
  };
}

function updateMasteryBannerLive(topicId, stars) {
  const config = TOPICS_CONFIG[topicId];
  if (!config) return;
  const target = config.targetStars || 10;
  const pct = Math.round((stars / target) * 100);

  const starCountEl = document.getElementById('topic-banner-stars-count');
  if (starCountEl) starCountEl.textContent = stars.toString();

  const fillEl = document.getElementById('topic-banner-fill');
  if (fillEl) fillEl.style.width = `${pct}%`;

  const labelEl = document.getElementById('topic-banner-pct-label');
  if (labelEl) labelEl.textContent = `${pct}% Mastered ${stars === target ? '• 🏅 Certified!' : ''}`;
}

function evaluateAndAwardStars(topicId) {
  const config = TOPICS_CONFIG[topicId];
  if (!config) return 0;

  const milestones = TOPIC_MILESTONES[topicId] || [];
  const data = getTopicProgressData(topicId);
  const clearedMilestones = milestones.filter(m => m.check(data));
  const targetStars = config.targetStars || 10;
  const stars = Math.min(targetStars, clearedMilestones.length);

  const oldStars = getTopicStars(topicId);
  if (stars > oldStars) {
    setTopicStars(topicId, stars);
    if (stars >= targetStars) {
      playFanfare();
      launchConfetti();
    } else {
      playCorrectSound();
    }
  } else if (stars < oldStars) {
    // Sync storage down if stars were reset, cleared, or previously inflated by bug
    setTopicStars(topicId, stars);
  }

  if (state.currentTopic === topicId) {
    state.stars = stars;
  }

  updateSidebarProgress();
  updateTopBarPassportButton();
  updateMasteryBannerLive(topicId, stars);
  return stars;
}

function completeTopicLearnCheckpoint(topicId, checkpointId, feedbackEl, boxEl) {
  state.topicProgress = state.topicProgress || {};
  const tp = state.topicProgress[topicId] = state.topicProgress[topicId] || {};
  tp.checkpoints = tp.checkpoints || {};
  
  const wasCleared = !!tp.checkpoints[checkpointId];
  tp.checkpoints[checkpointId] = true;
  saveActiveState();
  evaluateAndAwardStars(topicId);
  if (!wasCleared) {
    playCorrectSound();
  }

  if (feedbackEl) {
    feedbackEl.className = 'checkpoint-feedback success';
    feedbackEl.innerHTML = '<strong>🎉 Checkpoint Cleared!</strong> You solved this correctly and earned progress towards topic mastery stars ⭐!';
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
}
window.completeTopicLearnCheckpoint = completeTopicLearnCheckpoint;
window.playCorrectSound = playCorrectSound;
window.playWrongSound = playWrongSound;
window.playClickSound = playClickSound;

function markModuleInteracted(topicId, moduleId) {
  state.topicProgress = state.topicProgress || {};
  const tp = state.topicProgress[topicId] = state.topicProgress[topicId] || {};
  tp.modulesInteracted = tp.modulesInteracted || {};
  if (!tp.modulesInteracted[moduleId]) {
    tp.modulesInteracted[moduleId] = true;
    saveActiveState();
    evaluateAndAwardStars(topicId);
  }
}

function renderTopicMasteryBanner(config) {
  const stars = getTopicStars(config.id);
  const target = config.targetStars || 10;
  const pct = Math.round((stars / target) * 100);
  return `
    <div class="chapter-mastery-banner no-print" style="--chapter-theme: ${config.themeColor || 'var(--accent-amber)'}">
      <div class="mastery-banner-left">
        <div class="mastery-star-pill">
          <span>⭐</span>
          <span><strong id="topic-banner-stars-count">${stars}</strong> / ${target} Stars</span>
        </div>
        <div class="mastery-bar-track">
          <div class="mastery-bar-fill" id="topic-banner-fill" style="width: ${pct}%;"></div>
        </div>
        <span class="mastery-pct-label" id="topic-banner-pct-label">${pct}% Mastered ${stars === target ? '• 🏅 Certified!' : ''}</span>
      </div>
      <div class="mastery-banner-right">
        <button class="btn-passport-trigger" id="btn-banner-passport">
          📋 Learning Passport & Parent Report
        </button>
      </div>
    </div>
  `;
}

function bindMasteryBannerEvents(container, topicId) {
  if (!container) return;
  const bannerBtn = container.querySelector('#btn-banner-passport');
  if (bannerBtn) {
    bannerBtn.addEventListener('click', () => {
      playClickSound();
      openLearningPassport(topicId);
    });
  }
}

function updateTopBarPassportButton() {
  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
  const stars = getTopicStars(currentConfig.id);
  const target = currentConfig.targetStars || 10;
  const btn = document.getElementById('btn-passport');
  if (btn) {
    btn.innerHTML = `📋 <span class="passport-btn-label">⭐ ${stars}/${target}</span>`;
  }
}

function openLearningPassport(topicId) {
  const currentConfig = TOPICS_CONFIG[topicId] || TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
  const modal = document.getElementById('passport-modal');
  if (!modal) return;

  const milestones = TOPIC_MILESTONES[currentConfig.id] || [];
  const data = getTopicProgressData(currentConfig.id);
  const clearedCount = milestones.filter(m => m.check(data)).length;
  const targetStars = currentConfig.targetStars || 10;
  const isAllCleared = clearedCount >= targetStars;
  const pct = Math.round((clearedCount / targetStars) * 100);

  const iconEl = document.getElementById('passport-icon');
  const titleEl = document.getElementById('passport-title');
  const subEl = document.getElementById('passport-subtitle');
  const starsEl = document.getElementById('passport-stars-display');
  const fillEl = document.getElementById('passport-progress-fill');
  const statusEl = document.getElementById('passport-status-text');

  if (iconEl) iconEl.textContent = currentConfig.icon || '🔢';
  if (titleEl) titleEl.textContent = `${currentConfig.title} — Learning Passport`;
  if (subEl) subEl.textContent = `Pedagogical Checklist & Parent Audit Report • ${currentConfig.subtitle}`;
  if (starsEl) starsEl.textContent = `⭐ ${clearedCount} / ${targetStars} Stars Earned`;
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (statusEl) statusEl.textContent = isAllCleared ? '🎉 Topic Fully Certified! 100% Mastered' : `${pct}% Completed (${targetStars - clearedCount} milestones remaining)`;

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
            <p>This certifies that <strong>the student has successfully completed 100% of all required conceptual models, step-by-step procedures, diagnostic trap checks, practice categories, and rapid recall sprint</strong> for <strong>${currentConfig.title}</strong>. Full Class 5 CBSE mathematical competence and deductive reasoning are verified.</p>
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
        if (pendingMilestone.id.startsWith('learn') || pendingMilestone.id.startsWith('module') || pendingMilestone.id.startsWith('grid') || pendingMilestone.id.startsWith('metaphor') || pendingMilestone.id.startsWith('clue') || pendingMilestone.id.startsWith('pattern') || pendingMilestone.id.startsWith('geom') || pendingMilestone.id.startsWith('rules') || pendingMilestone.id.startsWith('blueprint')) {
          switchMode('learn');
        } else if (pendingMilestone.id.startsWith('practice') || pendingMilestone.id.startsWith('solve') || pendingMilestone.id.startsWith('drill') || pendingMilestone.id.startsWith('breadth') || pendingMilestone.id.startsWith('division') || pendingMilestone.id.startsWith('formula') || pendingMilestone.id.startsWith('word') || pendingMilestone.id.startsWith('school') || pendingMilestone.id.startsWith('sum') || pendingMilestone.id.startsWith('end') || pendingMilestone.id.startsWith('composite') || pendingMilestone.id.startsWith('alternating') || pendingMilestone.id.startsWith('missing') || pendingMilestone.id.startsWith('statement') || pendingMilestone.id.startsWith('expr') || pendingMilestone.id.startsWith('bracket') || pendingMilestone.id.startsWith('arithmetic') || pendingMilestone.id.startsWith('triangular') || pendingMilestone.id.startsWith('square') || pendingMilestone.id.startsWith('number') || pendingMilestone.id.startsWith('magic') || pendingMilestone.id.startsWith('parallel') || pendingMilestone.id.startsWith('angle') || pendingMilestone.id.startsWith('quadrilaterals') || pendingMilestone.id.startsWith('circle') || pendingMilestone.id.startsWith('clock') || pendingMilestone.id.startsWith('split') || pendingMilestone.id.startsWith('vedic') || pendingMilestone.id.startsWith('foundational') || pendingMilestone.id.startsWith('tricky') || pendingMilestone.id.startsWith('speed_word') || pendingMilestone.id.startsWith('partition') || pendingMilestone.id.startsWith('types') || pendingMilestone.id.startsWith('equivalent') || pendingMilestone.id.startsWith('comparison') || pendingMilestone.id.startsWith('add') || pendingMilestone.id.startsWith('multiplication') || pendingMilestone.id.startsWith('factors') || pendingMilestone.id.startsWith('patterns') || pendingMilestone.id.startsWith('geometry')) {
          switchMode('practice');
        } else if (pendingMilestone.id.startsWith('sprint') || pendingMilestone.id.startsWith('challenge') || pendingMilestone.id.startsWith('speed')) {
          switchMode('challenge');
        } else if (pendingMilestone.id.startsWith('worksheet') || pendingMilestone.id.startsWith('builder') || pendingMilestone.id.startsWith('custom')) {
          switchMode('worksheet');
        } else {
          switchMode('practice');
        }
      }
    };
  }

  modal.classList.add('active');
}

function updateSidebarProgress() {
  let totalStars = 0;
  let maxStars = 0;

  Object.values(TOPICS_CONFIG).forEach(topic => {
    const s = getTopicStars(topic.id);
    const target = topic.targetStars || 10;
    totalStars += s;
    maxStars += target;

    const starEl = document.getElementById(topic.sidebarStarId);
    if (starEl) {
      starEl.textContent = `⭐ ${s}/${target}`;
      starEl.title = `${s} of ${target} Mastery Stars`;
    }

    const fillSuffix = topic.sidebarStarId.replace('stars-', 'fill-');
    const miniFillEl = document.getElementById(fillSuffix);
    if (miniFillEl) {
      const p = Math.round((s / target) * 100);
      miniFillEl.style.width = `${p}%`;
    }
  });

  const totalBadge = document.getElementById('star-badge-total');
  const progressFill = document.getElementById('progress-fill');
  const progressLabel = document.getElementById('progress-label');

  if (totalBadge) totalBadge.textContent = `⭐ ${totalStars} / ${maxStars}`;
  const overallPct = maxStars > 0 ? Math.round((totalStars / maxStars) * 100) : 0;
  if (progressFill) progressFill.style.width = `${overallPct}%`;
  if (progressLabel) progressLabel.textContent = `${overallPct}% Syllabus Mastered`;
}

/* ==========================================================================
   9. APPLICATION STATE
   ========================================================================== */

const state = {
  currentTopic: 'factors_multiples_hcf_lcm', // 'factors_multiples_hcf_lcm' | 'divisibility_rules'
  activeMode: 'learn', // 'learn' | 'practice' | 'challenge' | 'worksheet'
  activeLearnModule: 'hcf_lcm_detective',
  practiceFilter: 'all',
  currentQuestionIndex: 0,
  scoreCorrect: 0,
  scoreWrong: 0,
  userAnswers: {},

  // 60s Challenge State
  challengeActive: false,
  challengeTimeLeft: 60,
  challengeTimerId: null,
  challengeQuestions: [],
  challengeIndex: 0,
  challengeCorrect: 0,

  // Tables Speed Master State
  tablesLearnCheckpoints: {}, // { checkpoint_grid: bool, checkpoint_split: bool, checkpoint_vedic: bool, checkpoint_traps: bool }
  tablesPracticeSolvedCount: 0,
  tablesChallengeHighScore: 0,
  tablesPracticeQueue: null,
  tablesQueueFilter: null,

  // Fractions Master State
  fractionsLearnCheckpoints: {},
  fractionsPracticeSolvedCount: 0,
  fractionsChallengeHighScore: 0,
  fractionsPracticeQueue: null,
  fractionsQueueFilter: null,

  // Term Revision Worksheet Cherry-Picker Selection (array of topic ids)
  revisionSelectedTopics: [
    'factors_multiples_hcf_lcm',
    'divisibility_rules',
    'expressions_statements',
    'number_patterns',
    'geometry_angles'
  ],
  // Stars earned
  stars: 0,
  // Detailed topic progress & milestone tracking
  topicProgress: {}
};
window.state = state;
window.isTopicCheckpointCleared = function(topicId, checkpointId) {
  return !!(state.topicProgress && state.topicProgress[topicId] && state.topicProgress[topicId].checkpoints && state.topicProgress[topicId].checkpoints[checkpointId]);
};

/* ==========================================================================
   9. VIEWPORT RENDERERS (Learn, Practice, Challenge, Worksheet)
   ========================================================================== */

function renderViewport() {
  const container = document.getElementById('content-viewport');
  if (!container) return;

  switch (state.activeMode) {
    case 'learn':
      renderLearnView(container);
      break;
    case 'practice':
      renderPracticeView(container);
      break;
    case 'challenge':
      renderChallengeView(container);
      break;
    case 'worksheet':
      renderWorksheetView(container);
      break;
    default:
      renderLearnView(container);
  }
}

/* --------------------------------------------------------------------------
   LEARN MODE RENDERER
   -------------------------------------------------------------------------- */

function renderLearnView(container) {
  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
  const modules = currentConfig.learnModules;
  if (state.activeLearnModule === 'spot_the_trap') {
    state.activeLearnModule = 'spot_the_mistakes';
  }
  const mod = modules[state.activeLearnModule] || Object.values(modules)[0];
  if (!modules[state.activeLearnModule]) {
    state.activeLearnModule = mod.id;
  }

  // Mark active module as interacted for milestone progress
  markModuleInteracted(state.currentTopic, mod.id);

  const masteryBannerHtml = renderTopicMasteryBanner(currentConfig);
  const milestoneBannerHtml = state.currentTopic === 'tables_speed_master' ? renderTablesMilestoneBanner() : (state.currentTopic === 'fractions_master' ? renderFractionsMilestoneBanner() : '');

  container.innerHTML = `
    <div class="learn-container">
      ${masteryBannerHtml}
      ${milestoneBannerHtml}
      <div class="learn-subnav">
        ${Object.values(modules).map(m => `
          <button class="learn-pill ${m.id === state.activeLearnModule ? 'active' : ''}" data-mod-id="${m.id}">
            ${m.pillTitle}
          </button>
        `).join('')}
      </div>

      <div class="learn-card">
        <div class="learn-card-header">
          <div class="learn-card-title">
            <h3>${mod.title}</h3>
          </div>
          <span class="learn-tag">${mod.tag}</span>
        </div>

        <p class="concept-lead">${mod.lead}</p>

        <div id="module-dynamic-content"></div>
      </div>
    </div>
  `;

  bindMasteryBannerEvents(container, currentConfig.id);

  // Attach subnav click listeners
  const pills = container.querySelectorAll('.learn-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      playClickSound();
      state.activeLearnModule = pill.getAttribute('data-mod-id');
      markModuleInteracted(state.currentTopic, state.activeLearnModule);
      saveActiveState();
      renderLearnView(container);
    });
  });

  const dynamicContent = container.querySelector('#module-dynamic-content');
  if (dynamicContent && typeof mod.renderContent === 'function') {
    mod.renderContent(dynamicContent);
  }
}

/* Module 1: HCF vs LCM Detective */
function renderDetectiveModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 Think About It — The Detective's Rule of Thumb</div>
      <p>Ask yourself one simple question before solving any word problem: <strong>Are you chopping/splitting things into smaller equal packages, or waiting for repeating clocks/runners to meet in the future?</strong> Chopping down into parts = <strong>HCF (The Equal Cutter)</strong>. Growing up & synchronizing cycles = <strong>LCM (The Cycle Synchronizer)</strong>.</p>
    </div>

    <div class="decision-matrix">
      <!-- HCF CARD -->
      <div class="decision-card hcf-theme">
        <h4>🔍 When to Use HCF (Highest Common Factor)</h4>
        <p>Use HCF when you need to <strong>split, divide, or break down</strong> numbers into the largest possible equal groups without anything left over.</p>
        
        <div class="keyword-badges">
          <span class="kw-tag">Greatest / Maximum</span>
          <span class="kw-tag">Dividing / Splitting</span>
          <span class="kw-tag">Identical Sets</span>
          <span class="kw-tag">Largest Tile Size</span>
          <span class="kw-tag">Measuring Jug Size</span>
        </div>

        <div class="scenario-box">
          <strong>Teacher's Pencil Problem:</strong>
          24 red pencils and 36 blue pencils. Greatest number of identical sets?<br>
          <span class="text-success">→ HCF(24, 36) = 12 sets</span> (each with 2 red & 3 blue pencils).
        </div>

        <div class="scenario-box">
          <strong>Floor Tiling Problem:</strong>
          Room is 36m long and 60m wide. Largest square tile without cutting?<br>
          <span class="text-success">→ HCF(36, 60) = 12m tiles</span>.
        </div>
      </div>

      <!-- LCM CARD -->
      <div class="decision-card lcm-theme">
        <h4>⏱️ When to Use LCM (Lowest Common Multiple)</h4>
        <p>Use LCM when items repeat in <strong>different time intervals, cycles, or steps</strong> and you want to find when they will meet or coincide together again.</p>
        
        <div class="keyword-badges">
          <span class="kw-tag">Smallest / Minimum</span>
          <span class="kw-tag">Happening Together Again</span>
          <span class="kw-tag">Traffic Lights / Bells</span>
          <span class="kw-tag">Running / Track Laps</span>
          <span class="kw-tag">Buying Equal Pairs</span>
        </div>

        <div class="scenario-box">
          <strong>Traffic Lights Problem:</strong>
          Lights flash every 20s, 30s, and 45s. When will they flash together again?<br>
          <span class="text-amber">→ LCM(20, 30, 45) = 180 seconds</span> (3 minutes).
        </div>

        <div class="scenario-box">
          <strong>Pencil & Eraser Packs:</strong>
          Pencils in packs of 4, erasers in packs of 6. Smallest number so you have equal pairs?<br>
          <span class="text-amber">→ LCM(4, 6) = 12</span> (3 packs of pencils, 2 packs of erasers).
        </div>
      </div>
    </div>

    <!-- Interactive Detective Checker -->
    <div class="calc-card">
      <h4>🕵️ Detective Clue Tester</h4>
      <p>Select a clue phrase from a question to diagnose whether it requires HCF or LCM:</p>
      
      <div class="calc-inputs">
        <select id="clue-selector" class="calc-input" style="max-width: 100%; width: 100%;">
          <option value="hcf1">"What is the greatest number of identical gift boxes she can pack?"</option>
          <option value="lcm1">"After how many seconds will three church bells toll together again?"</option>
          <option value="hcf2">"Find the largest capacity measuring container to empty 48L and 72L cans."</option>
          <option value="lcm2">"Find the smallest number that is exactly divisible by 8, 12, and 18."</option>
          <option value="hcf3">"Find the greatest number that divides 36, 60, and 84 without remainder."</option>
          <option value="lcm3">"Two runners lap a track every 12 min and 18 min. When will they meet at the start line?"</option>
          <option value="hcf4">"A room is 36m by 60m. What is the largest square tile that fits without cutting?"</option>
        </select>
        <button class="btn btn-primary" id="btn-diagnose">Diagnose Clue 🔍</button>
      </div>
      
      <div class="calc-result-area" id="clue-result">
        Click <strong>Diagnose Clue</strong> above to see the detective analysis!
      </div>
    </div>
  `;

  const clueSelector = container.querySelector('#clue-selector');
  const btnDiagnose = container.querySelector('#btn-diagnose');
  const resBox = container.querySelector('#clue-result');

  const CLUE_DIAGNOSES = {
    hcf1: {
      type: 'hcf',
      clue: 'Keywords: "greatest number" & "identical gift boxes"',
      explanation: 'You have fixed piles of items and need to chop or divide them into the largest possible equal groups with zero leftovers. Splitting down into equal portions always requires the Highest Common Factor!'
    },
    lcm1: {
      type: 'lcm',
      clue: 'Keywords: "seconds" & "toll together again"',
      explanation: 'Each church bell tolls on its own recurring cycle (e.g., every 12s, 15s, 18s). You are looking forward in time for the earliest moment their cycles synchronize together. Repeating cycles meeting in the future always require the Lowest Common Multiple!'
    },
    hcf2: {
      type: 'hcf',
      clue: 'Keywords: "largest capacity measuring container" & "empty 48L and 72L cans"',
      explanation: 'The measuring container must measure both 48L and 72L cans an exact whole number of times without any liquid left over. It must be an exact factor of both quantities. The largest such container is HCF(48, 72) = 24L!'
    },
    lcm2: {
      type: 'lcm',
      clue: 'Keywords: "smallest number that is exactly divisible by"',
      explanation: 'The target number must be a multiple of 8, a multiple of 12, and a multiple of 18 simultaneously. The smallest number that satisfies all three conditions is the Lowest Common Multiple: LCM(8, 12, 18) = 72!'
    },
    hcf3: {
      type: 'hcf',
      clue: 'Keywords: "greatest number that divides without remainder"',
      explanation: '"Divides" means you are looking for a common divisor (factor), not a multiple. "Greatest divisor" is the literal definition of Highest Common Factor: HCF(36, 60, 84) = 12!'
    },
    lcm3: {
      type: 'lcm',
      clue: 'Keywords: "lap every 12 min and 18 min" & "meet at the start line"',
      explanation: 'Both runners start at the same time and repeat their laps at different speeds. The earliest time they coincide at the start line together is their Lowest Common Multiple: LCM(12, 18) = 36 minutes!'
    },
    hcf4: {
      type: 'hcf',
      clue: 'Keywords: "largest square tile" & "without cutting"',
      explanation: 'The tile side must divide both the room length (36m) and breadth (60m) into whole tile units with zero fractions or cuts. The largest possible square tile is HCF(36, 60) = 12m!'
    }
  };

  // When student changes the clue question, immediately clear the old diagnosis so they can think fresh
  clueSelector.addEventListener('change', () => {
    resBox.innerHTML = `
      <div style="color: var(--text-muted); font-size: 0.95rem;">
        💡 New clue selected! Click <strong>Diagnose Clue 🔍</strong> to reveal whether this question requires HCF or LCM.
      </div>
    `;
  });

  btnDiagnose.addEventListener('click', () => {
    playClickSound();
    const val = clueSelector.value;
    const diag = CLUE_DIAGNOSES[val];

    if (diag && diag.type === 'hcf') {
      resBox.innerHTML = `
        <div style="color: var(--accent-emerald-light); font-weight: bold; font-size: 1.1rem; margin-bottom: 0.35rem;">
          🎯 Verdict: Use HCF (Highest Common Factor)!
        </div>
        <div style="font-weight: 600; color: #a7f3d0; margin-bottom: 0.35rem; font-size: 0.92rem;">
          🔍 ${diag.clue}
        </div>
        <p style="margin: 0; color: #cbd5e1; font-size: 0.9rem; line-height: 1.5;">${diag.explanation}</p>
      `;
    } else if (diag && diag.type === 'lcm') {
      resBox.innerHTML = `
        <div style="color: var(--accent-amber-light); font-weight: bold; font-size: 1.1rem; margin-bottom: 0.35rem;">
          🎯 Verdict: Use LCM (Lowest Common Multiple)!
        </div>
        <div style="font-weight: 600; color: #fde68a; margin-bottom: 0.35rem; font-size: 0.92rem;">
          🔍 ${diag.clue}
        </div>
        <p style="margin: 0; color: #cbd5e1; font-size: 0.9rem; line-height: 1.5;">${diag.explanation}</p>
      `;
    } else {
      if (val.startsWith('hcf')) {
        resBox.innerHTML = `
          <div style="color: var(--accent-emerald-light); font-weight: bold; font-size: 1.1rem; margin-bottom: 0.35rem;">
            🎯 Verdict: Use HCF (Highest Common Factor)!
          </div>
          <p>Notice keywords like <em>"greatest"</em>, <em>"identical sets"</em>, or <em>"largest capacity"</em>. You are cutting or dividing existing quantities into smaller identical portions, so you need the Highest Common Factor!</p>
        `;
      } else {
        resBox.innerHTML = `
          <div style="color: var(--accent-amber-light); font-weight: bold; font-size: 1.1rem; margin-bottom: 0.35rem;">
            🎯 Verdict: Use LCM (Lowest Common Multiple)!
          </div>
          <p>Notice keywords like <em>"together again"</em>, <em>"smallest number divisible by"</em>, or <em>"repeating intervals"</em>. You are looking for a multiple where separate cycles meet, so you need the Lowest Common Multiple!</p>
        `;
      }
    }
  });
}

/* Module 2: Short Division Ladder (HCF vs LCM Comparison) */
function renderShortDivisionModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 Think About It — The HCF Stop Sign 🛑</div>
      <p>Before dividing each row, ask yourself: <em>"Does this prime divide EVERY single number?"</em> If not, <strong>STOP immediately for HCF</strong>! In LCM, you keep going until all numbers reach 1, but in HCF, the moment one number can't be divided by the common prime, you must stop!</p>
    </div>

    <div class="calc-card">
      <h4>Interactive Short Division Generator</h4>
      <p>Enter 2 or 3 numbers to compare how Short Division operates for HCF vs LCM:</p>
      
      <div class="calc-inputs">
        <div class="calc-inputs-row">
          <input type="number" id="sd-num1" class="calc-input" value="144" min="2" max="999" placeholder="Num 1">
          <input type="number" id="sd-num2" class="calc-input" value="216" min="2" max="999" placeholder="Num 2">
          <input type="number" id="sd-num3" class="calc-input" value="288" min="2" max="999" placeholder="Num 3">
        </div>
        <button class="btn btn-primary" id="btn-calc-sd">Generate Division Ladders 🪜</button>
      </div>
    </div>

    <div class="sd-results-grid" id="sd-results-grid">
      <!-- Generated below -->
    </div>
  `;

  function generateLadders() {
    const n1 = parseInt(container.querySelector('#sd-num1').value) || 12;
    const n2 = parseInt(container.querySelector('#sd-num2').value) || 18;
    const n3 = parseInt(container.querySelector('#sd-num3').value) || 0;
    const nums = n3 > 0 ? [n1, n2, n3] : [n1, n2];

    const hcfData = getShortDivisionHCF(nums);
    const lcmData = getShortDivisionLCM(nums);

    const resultsGrid = container.querySelector('#sd-results-grid');
    resultsGrid.innerHTML = `
      <!-- HCF LADDER -->
      <div class="ladder-container">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="color: var(--accent-emerald-light);">🪜 HCF Short Division</h4>
          <span class="kw-tag" style="background: rgba(16,185,129,0.2); color: var(--accent-emerald-light);">Divisor Must Divide ALL</span>
        </div>

        <div class="ladder-table">
          ${hcfData.steps.map(step => `
            <div class="ladder-row">
              <div class="ladder-divisor">${step.divisor}</div>
              <div class="ladder-values">${step.values.join(' , ')}</div>
            </div>
          `).join('')}
          <div class="ladder-row">
            <div class="ladder-divisor" style="border-right: none;"></div>
            <div class="ladder-values final-row">${hcfData.finalRow.join(' , ')}</div>
          </div>
        </div>

        <div class="ladder-diff-callout">
          <strong>🛑 Stop Rule in HCF:</strong><br>
          ${hcfData.explanation}
        </div>
      </div>

      <!-- LCM LADDER -->
      <div class="ladder-container">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="color: var(--accent-amber-light);">🪜 LCM Short Division</h4>
          <span class="kw-tag" style="background: rgba(245,158,11,0.2); color: var(--accent-amber-light);">Brings Down Unchanged</span>
        </div>

        <div class="ladder-table">
          ${lcmData.steps.map(step => `
            <div class="ladder-row">
              <div class="ladder-divisor">${step.divisor}</div>
              <div class="ladder-values">${step.values.join(' , ')}</div>
            </div>
          `).join('')}
          <div class="ladder-row">
            <div class="ladder-divisor" style="border-right: none;"></div>
            <div class="ladder-values final-row">${lcmData.finalRow.join(' , ')}</div>
          </div>
        </div>

        <div class="ladder-diff-callout" style="border-left-color: var(--accent-indigo);">
          <strong>🔄 Continue Rule in LCM:</strong><br>
          ${lcmData.explanation}
        </div>
      </div>
    `;
  }

  container.querySelector('#btn-calc-sd').addEventListener('click', () => {
    playClickSound();
    generateLadders();
  });

  generateLadders(); // Initial render
}

/* Module 3: Long Division Method for HCF */
function renderLongDivisionModule(container) {
  container.innerHTML = `
    <div class="calc-card">
      <h4>Long Division (Successive Division / Euclidean Method)</h4>
      <p>Enter 2 or 3 numbers to see the step-by-step division brackets (from School Worksheet Q III.3):</p>
      
      <div class="calc-inputs">
        <div class="calc-inputs-row">
          <input type="number" id="ld-num1" class="calc-input" value="96" min="2" max="9999" placeholder="Num 1">
          <input type="number" id="ld-num2" class="calc-input" value="144" min="2" max="9999" placeholder="Num 2">
          <input type="number" id="ld-num3" class="calc-input" value="192" min="2" max="9999" placeholder="Num 3">
        </div>
        <button class="btn btn-primary" id="btn-calc-ld">Calculate Long Division ➗</button>
      </div>
    </div>

    <div id="ld-steps-display" style="margin-top: 1.25rem;"></div>
  `;

  function generateLongDivision() {
    const n1 = parseInt(container.querySelector('#ld-num1').value) || 96;
    const n2 = parseInt(container.querySelector('#ld-num2').value) || 144;
    const n3 = parseInt(container.querySelector('#ld-num3').value) || 0;

    const display = container.querySelector('#ld-steps-display');

    if (n3 > 0) {
      const data = getLongDivision3Numbers(n1, n2, n3);
      display.innerHTML = `
        <div class="euclid-steps">
          <h4 style="color: var(--accent-amber-light);">${data.phase1.desc}</h4>
          ${data.phase1.steps.map(s => `
            <div class="euclid-step">
              <span class="euclid-step-num">Step ${s.stepNum}</span>
              <div class="euclid-step-content">
                Divide <strong>${s.dividend}</strong> by <strong>${s.divisor}</strong>:<br>
                Quotient = <span class="euclid-bracket">${s.quotient}</span> (${s.divisor} × ${s.quotient} = ${s.product})<br>
                Remainder = <strong>${s.remainder}</strong>
                ${s.remainder > 0 ? `<br><span style="color: var(--accent-amber-light);">→ Remainder ${s.remainder} becomes the new divisor, and ${s.divisor} becomes the new dividend!</span>` : `<br><span style="color: var(--accent-emerald-light);">→ Remainder is 0! Last divisor ${s.divisor} is the HCF!</span>`}
              </div>
            </div>
          `).join('')}
          
          <div style="margin: 0.75rem 0; padding: 0.5rem; background: rgba(16,185,129,0.15); border-radius: 8px;">
            Intermediate Result: <strong>HCF(${n1}, ${n2}) = ${data.phase1.hcf}</strong>
          </div>

          <h4 style="color: var(--accent-amber-light); margin-top: 0.5rem;">${data.phase2.desc}</h4>
          ${data.phase2.steps.map(s => `
            <div class="euclid-step">
              <span class="euclid-step-num">Step ${s.stepNum}</span>
              <div class="euclid-step-content">
                Divide <strong>${s.dividend}</strong> by <strong>${s.divisor}</strong>:<br>
                Quotient = <span class="euclid-bracket">${s.quotient}</span> (${s.divisor} × ${s.quotient} = ${s.product})<br>
                Remainder = <strong>${s.remainder}</strong>
                ${s.remainder === 0 ? `<br><span style="color: var(--accent-emerald-light);">→ Remainder is 0! Final HCF = ${s.divisor}!</span>` : ''}
              </div>
            </div>
          `).join('')}

          <div class="formula-box" style="margin-top: 1rem;">
            <div class="formula-headline">Final HCF(${n1}, ${n2}, ${n3}) = ${data.finalHCF}</div>
          </div>
        </div>
      `;
    } else {
      const data = getLongDivisionHCF(n1, n2);
      display.innerHTML = `
        <div class="euclid-steps">
          ${data.steps.map(s => `
            <div class="euclid-step">
              <span class="euclid-step-num">Step ${s.stepNum}</span>
              <div class="euclid-step-content">
                Divide <strong>${s.dividend}</strong> by <strong>${s.divisor}</strong>:<br>
                Quotient = <span class="euclid-bracket">${s.quotient}</span> (${s.divisor} × ${s.quotient} = ${s.product})<br>
                Remainder = <strong>${s.remainder}</strong>
                ${s.remainder > 0 ? `<br><span style="color: var(--accent-amber-light);">→ Remainder ${s.remainder} becomes the new divisor, and ${s.divisor} becomes the new dividend!</span>` : `<br><span style="color: var(--accent-emerald-light);">→ Remainder is 0! Last divisor is ${s.divisor}!</span>`}
              </div>
            </div>
          `).join('')}

          <div class="formula-box" style="margin-top: 1rem;">
            <div class="formula-headline">HCF(${n1}, ${n2}) = ${data.hcf}</div>
          </div>
        </div>
      `;
    }
  }

  container.querySelector('#btn-calc-ld').addEventListener('click', () => {
    playClickSound();
    generateLongDivision();
  });

  generateLongDivision();
}

/* Module 4: Product Formula */
function renderProductFormulaModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 Think About It — The Balancing Seesaw ⚖️</div>
      <p>Think of the product relation like a balanced scale: <strong>(Number a &times; Number b) must balance with (HCF &times; LCM)</strong>. If you know any three of these values, you can find the fourth without doing any division from scratch!</p>
    </div>

    <div class="formula-box">
      <div class="formula-headline">First Number (a) × Second Number (b) = HCF × LCM</div>
      <div class="formula-subs">
        <div class="formula-sub-item">LCM = (a × b) ÷ HCF</div>
        <div class="formula-sub-item">HCF = (a × b) ÷ LCM</div>
        <div class="formula-sub-item">Other Number = (HCF × LCM) ÷ Given Number</div>
      </div>
    </div>

    <!-- Interactive Inspector -->
    <div class="calc-card" style="margin-top: 1.25rem;">
      <h4>Interactive Product Relation Inspector</h4>
      <p>Enter any 2 numbers to verify that their product equals the product of their HCF and LCM:</p>
      
      <div class="calc-inputs">
        <div class="calc-inputs-row">
          <input type="number" id="rel-num1" class="calc-input" value="48" min="1" max="999" placeholder="Number a">
          <span style="font-size: 1.2rem; font-weight: bold; align-self: center;">×</span>
          <input type="number" id="rel-num2" class="calc-input" value="32" min="1" max="999" placeholder="Number b">
        </div>
        <button class="btn btn-primary" id="btn-verify-product">Verify Relation ⚖️</button>
      </div>

      <div class="calc-result-area" id="product-verification-result"></div>
    </div>
  `;

  function verifyProduct() {
    const a = parseInt(container.querySelector('#rel-num1').value) || 12;
    const b = parseInt(container.querySelector('#rel-num2').value) || 18;

    const h = gcd(a, b);
    const l = lcm(a, b);
    const prodNums = a * b;
    const prodHcfLcm = h * l;

    const res = container.querySelector('#product-verification-result');
    res.innerHTML = `
      <div class="product-verify-grid">
        <div style="background: rgba(255,255,255,0.03); padding: 0.75rem; border-radius: 8px;">
          <strong>Left Side (Product of Numbers):</strong><br>
          ${a} × ${b} = <span style="font-size: 1.2rem; font-weight: bold; color: var(--accent-amber-light);">${prodNums}</span>
        </div>
        <div style="background: rgba(255,255,255,0.03); padding: 0.75rem; border-radius: 8px;">
          <strong>Right Side (HCF × LCM):</strong><br>
          HCF (${h}) × LCM (${l}) = <span style="font-size: 1.2rem; font-weight: bold; color: var(--accent-emerald-light);">${prodHcfLcm}</span>
        </div>
      </div>

      <div style="background: rgba(16,185,129,0.15); border: 1px solid var(--accent-emerald); padding: 0.85rem; border-radius: 8px; text-align: center;">
        <span style="font-size: 1.1rem; font-weight: bold; color: var(--accent-emerald-light);">
          ✅ Verified: ${prodNums} === ${prodHcfLcm}
        </span>
        <p style="font-size: 0.85rem; margin-top: 0.25rem;">
          This property holds true for any two positive integers!
        </p>
      </div>
    `;
  }

  container.querySelector('#btn-verify-product').addEventListener('click', () => {
    playClickSound();
    verifyProduct();
  });

  verifyProduct();
}

/* Module 5: Co-Primes & Twin Primes */
function renderCoprimesModule(container) {
  container.innerHTML = `
    <div class="coprimes-grid">
      <div class="decision-card hcf-theme">
        <h4>🤝 Co-Prime Numbers</h4>
        <p>Two numbers are co-prime if their <strong>Highest Common Factor (HCF) is strictly 1</strong>.</p>
        <div class="scenario-box">
          <strong>Golden Rules of Co-Primes:</strong>
          • They do NOT have to be prime numbers individually! (e.g. 8 and 9 are both composite, but HCF(8, 9) = 1).<br>
          • Any two consecutive integers are ALWAYS co-prime (e.g. 14 & 15, 29 & 30).<br>
          • HCF of co-primes is ALWAYS 1.<br>
          • LCM of co-primes is ALWAYS their product (a × b).
        </div>
      </div>

      <div class="decision-card lcm-theme">
        <h4>👯 Twin Prime Numbers</h4>
        <p>Twin primes are two <strong>prime numbers</strong> that have a difference of <strong>exactly 2</strong>.</p>
        <div class="scenario-box">
          <strong>CBSE Class 5 Twin Prime Pairs (under 100):</strong>
          • (3, 5)<br>
          • (5, 7)<br>
          • (11, 13)<br>
          • (17, 19)<br>
          • (29, 31)<br>
          • (41, 43)<br>
          • (59, 61)<br>
          • (71, 73)
        </div>
      </div>
    </div>

    <!-- Live Tester -->
    <div class="calc-card" style="margin-top: 1.25rem;">
      <h4>Co-Prime & Twin Prime Live Tester</h4>
      <p>Enter any two numbers to inspect whether they are co-prime and/or twin prime:</p>
      
      <div class="calc-inputs">
        <div class="calc-inputs-row">
          <input type="number" id="test-num1" class="calc-input" value="8" min="1" max="999" placeholder="Number a">
          <input type="number" id="test-num2" class="calc-input" value="9" min="1" max="999" placeholder="Number b">
        </div>
        <button class="btn btn-primary" id="btn-test-pair">Test Numbers 🔬</button>
      </div>

      <div class="calc-result-area" id="pair-test-result"></div>
    </div>
  `;

  function testPair() {
    const a = parseInt(container.querySelector('#test-num1').value) || 8;
    const b = parseInt(container.querySelector('#test-num2').value) || 9;

    const factorsA = getFactors(a);
    const factorsB = getFactors(b);
    const commonFactors = factorsA.filter(f => factorsB.includes(f));
    const isCopr = commonFactors.length === 1 && commonFactors[0] === 1;
    const isTwin = isTwinPrime(a, b);

    const res = container.querySelector('#pair-test-result');
    res.innerHTML = `
      <div style="margin-bottom: 0.6rem;">
        Factors of ${a}: <strong>${factorsA.join(', ')}</strong><br>
        Factors of ${b}: <strong>${factorsB.join(', ')}</strong><br>
        Common Factors: <strong style="color: var(--accent-amber-light);">${commonFactors.join(', ')}</strong> (HCF = ${commonFactors[commonFactors.length - 1]})
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <div class="badge ${isCopr ? 'badge-active' : 'badge-upcoming'}" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">
          ${isCopr ? '✅ Co-Prime: YES' : '❌ Co-Prime: NO'}
        </div>
        <div class="badge ${isTwin ? 'badge-active' : 'badge-upcoming'}" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">
          ${isTwin ? '✅ Twin Prime: YES' : '❌ Twin Prime: NO'}
        </div>
      </div>
    `;
  }

  container.querySelector('#btn-test-pair').addEventListener('click', () => {
    playClickSound();
    testPair();
  });

  testPair();
}

/* ==========================================================================
   MODULE: THE MENTAL ESTIMATOR (Deduction Before Calculation)
   ========================================================================== */
function renderMentalEstimatorModule(container) {
  const challenges = [
    {
      q: 'Can HCF(18, 24) be 36?',
      hl: 'HCF(18, 24) = 36',
      possible: false,
      reason: '🛑 <strong>Impossible! (Upper Bound Rule)</strong> The Highest Common Factor can NEVER be greater than the smaller number (18)! Since 36 is larger than 18, it cannot possibly be a factor of 18.'
    },
    {
      q: 'Can LCM(12, 15) be 60?',
      hl: 'LCM(12, 15) = 60',
      possible: true,
      reason: '✅ <strong>Possible! (Lower Bound & Multiples)</strong> LCM must be at least the largest number (15). And 60 is a multiple of both 12 (12 × 5 = 60) and 15 (15 × 4 = 60). In fact, 60 is the exact LCM!'
    },
    {
      q: 'Can LCM(20, 30) be 15?',
      hl: 'LCM(20, 30) = 15',
      possible: false,
      reason: '🛑 <strong>Impossible! (Lower Bound Rule)</strong> A multiple of 30 can NEVER be smaller than 30 itself! 15 is smaller than both numbers, so it can only be a factor, never a multiple!'
    },
    {
      q: 'Can HCF(25, 75) be 25?',
      hl: 'HCF(25, 75) = 25',
      possible: true,
      reason: '✅ <strong>Possible! (Multiple-Factor Shortcut)</strong> Since 25 divides 75 evenly (25 × 3 = 75), the smaller number 25 is the exact HCF! The larger number 75 is the LCM.'
    },
    {
      q: 'Can HCF(14, 15) be 2?',
      hl: 'HCF(14, 15) = 2',
      possible: false,
      reason: '🛑 <strong>Impossible! (Co-Prime Consecutive Rule)</strong> Any two consecutive integers (like 14 and 15) are ALWAYS co-prime! Their only common factor is 1, so HCF must be 1, never 2.'
    },
    {
      q: 'Can two odd numbers have an HCF of 4?',
      hl: 'HCF(odd, odd) = 4',
      possible: false,
      reason: '🛑 <strong>Impossible! (Parity Rule)</strong> Any multiple of 4 is an even number. If 4 were a factor of both numbers, both numbers would have to be even! Odd numbers can never have an even factor.'
    }
  ];

  let currentIdx = 0;

  function renderView() {
    const ch = challenges[currentIdx];
    container.innerHTML = `
      <div class="estimator-container">
        <!-- Core Boundary Rules -->
        <div class="estimator-rule-grid">
          <div class="estimator-rule-card">
            <div class="estimator-rule-title">🛑 1. Upper Bound Rule (HCF)</div>
            <div class="estimator-rule-body">HCF can <strong>never exceed</strong> the smallest number. HCF(a, b) &le; min(a, b).</div>
            <div class="estimator-rule-example">Between 18 & 24 &rarr; Max possible HCF is 18.</div>
          </div>

          <div class="estimator-rule-card">
            <div class="estimator-rule-title">🚀 2. Lower Bound Rule (LCM)</div>
            <div class="estimator-rule-body">LCM can <strong>never be smaller</strong> than the largest number. LCM(a, b) &ge; max(a, b).</div>
            <div class="estimator-rule-example">Between 15 & 20 &rarr; Min possible LCM is 20.</div>
          </div>

          <div class="estimator-rule-card">
            <div class="estimator-rule-title">⚡ 3. The Co-Prime Shortcut</div>
            <div class="estimator-rule-body">If numbers are consecutive (14 & 15) or share no common factors, <strong>HCF = 1</strong> and <strong>LCM = a &times; b</strong> instantly with zero division!</div>
            <div class="estimator-rule-example">HCF(9, 10) = 1 | LCM(9, 10) = 90.</div>
          </div>

          <div class="estimator-rule-card">
            <div class="estimator-rule-title">🎯 4. The Factor-Multiple Pair</div>
            <div class="estimator-rule-body">If smaller number divides larger number evenly, the <strong>smaller is HCF</strong> and <strong>larger is LCM</strong>.</div>
            <div class="estimator-rule-example">For 8 & 32 &rarr; HCF = 8, LCM = 32.</div>
          </div>
        </div>

        <div class="think-callout-math">
          <div class="callout-header">💡 Think About It — The 5-Second Estimation Rule</div>
          <p>Before touching your scratchpad, test the bounds! If a choice in an exam violates the Upper Bound or Lower Bound, cross it out immediately. That is pure mathematical deduction!</p>
        </div>

        <!-- Interactive Challenge Widget -->
        <div class="estimator-challenge-box">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: var(--accent-cyan-light); font-weight: 700; font-size: 0.9rem;">DEDUCTIVE ESTIMATION CHALLENGE (${currentIdx + 1} of ${challenges.length})</span>
            <button class="btn btn-sm" id="btn-next-estimator" style="background: rgba(255,255,255,0.08); color: var(--text-main); font-size: 0.8rem; border-radius: 9999px; padding: 0.25rem 0.75rem; border: 1px solid var(--border-glass);">Next Challenge &rarr;</button>
          </div>

          <div class="estimator-prompt">
            ${ch.q} <br>
            <span class="prompt-hl">${ch.hl}</span>
          </div>

          <div class="estimator-btn-row">
            <button class="estimator-btn estimator-btn-possible" id="btn-guess-possible">Possible ✅</button>
            <button class="estimator-btn estimator-btn-impossible" id="btn-guess-impossible">Impossible! 🚫</button>
          </div>

          <div id="estimator-verdict-box" style="display: none;"></div>
        </div>
      </div>
    `;

    const btnPossible = container.querySelector('#btn-guess-possible');
    const btnImpossible = container.querySelector('#btn-guess-impossible');
    const verdictBox = container.querySelector('#estimator-verdict-box');
    const btnNext = container.querySelector('#btn-next-estimator');

    function checkAnswer(userGuess) {
      playClickSound();
      btnPossible.disabled = true;
      btnImpossible.disabled = true;
      verdictBox.style.display = 'block';

      const isCorrect = (userGuess === ch.possible);
      if (isCorrect) {
        playCorrectSound();
        verdictBox.className = 'estimator-verdict';
        verdictBox.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        verdictBox.style.background = 'rgba(16, 185, 129, 0.1)';
        verdictBox.innerHTML = `
          <div style="color: #34d399; font-weight: 700; font-size: 1.05rem; margin-bottom: 0.35rem;">
            🎯 Spot On! You deduced correctly.
          </div>
          <p style="margin: 0; color: #f8fafc; font-size: 0.95rem;">${ch.reason}</p>
        `;
      } else {
        playWrongSound();
        verdictBox.className = 'estimator-verdict';
        verdictBox.style.borderColor = 'rgba(244, 63, 94, 0.4)';
        verdictBox.style.background = 'rgba(244, 63, 94, 0.1)';
        verdictBox.innerHTML = `
          <div style="color: #fb7185; font-weight: 700; font-size: 1.05rem; margin-bottom: 0.35rem;">
            🤔 Not quite! Let's examine the boundary:
          </div>
          <p style="margin: 0; color: #f8fafc; font-size: 0.95rem;">${ch.reason}</p>
        `;
      }
    }

    btnPossible.addEventListener('click', () => checkAnswer(true));
    btnImpossible.addEventListener('click', () => checkAnswer(false));
    btnNext.addEventListener('click', () => {
      playClickSound();
      currentIdx = (currentIdx + 1) % challenges.length;
      renderView();
    });
  }

  renderView();
}

/* ==========================================================================
   MODULE: BE THE TEACHER (Spot the Mistakes) — ALL 5 TOPICS
   ========================================================================== */

const MISTAKES_TOPIC_1 = [
  {
    id: 'mistake_t1_stopping_ladder',
    title: '1. Rohan\'s Non-Stopping Ladder',
    topic: 'HCF Short Division',
    student: 'Student: Rohan (Class 5-B)',
    question: 'Find the HCF of 24, 36, and 48 using short division.',
    steps: [
      { label: 'Step 1', text: 'Divide 24, 36, 48 by 2 ➔ Leaves 12, 18, 24', isBlunder: false, validHint: 'All three numbers (24, 36, 48) are even, so starting with the smallest prime 2 is completely correct.' },
      { label: 'Step 2', text: 'Divide 12, 18, 24 by 2 ➔ Leaves 6, 9, 12', isBlunder: false, validHint: 'All three numbers (12, 18, 24) are still even! Continuing to divide by the smallest prime 2 until it no longer divides all numbers is the proper method.' },
      { label: 'Step 3', text: 'Divide 6, 9, 12 by 3 ➔ Leaves 2, 3, 4', isBlunder: false, validHint: 'Since 9 is odd, 2 can no longer divide all three numbers simultaneously. Moving to the next prime 3 (which divides 6, 9, and 12) is completely sound.' },
      { label: 'Step 4', text: 'Divide 2 & 4 by 2 ➔ Leaves 1, 3, 2 (bringing down 3). Calculates HCF = 2 × 2 × 3 × 2 = 24', isBlunder: true }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (The Stopping Rule)</strong> In HCF short division, the prime divisor <em>must divide ALL numbers simultaneously</em>! At Step 3, the remaining numbers are <strong>2, 3, and 4</strong>. There is no common prime that divides all three numbers together. Rohan should have <strong>STOPPED at Step 3</strong>! Bringing numbers down is strictly for LCM, NEVER for HCF! The correct HCF is <strong>2 × 2 × 3 = 12</strong>.'
  },
  {
    id: 'mistake_t1_composite_tree',
    title: '2. Priya\'s Composite Factor Tree',
    topic: 'Prime Factorization',
    student: 'Student: Priya (Class 5-A)',
    question: 'Find the prime factorization of 72.',
    steps: [
      { label: 'Step 1', text: 'Splits 72 into 4 × 18 ➔ Divides 18 into 2 × 9', isBlunder: false },
      { label: 'Step 2', text: 'Splits 9 into 3 × 3', isBlunder: false },
      { label: 'Step 3', text: 'Writes the prime factorization as: 4 × 2 × 3 × 3', isBlunder: true },
      { label: 'Step 4', text: 'Concludes 72 = 4 × 2 × 3²', isBlunder: false, downstreamHint: 'You are right that 4 × 2 × 3² is NOT a prime factorization because 4 is composite! But Step 4 is just rewriting Step 3 in exponent form. The actual blunder was committed when Priya left 4 un-split in <strong>Step 3</strong>! Tap Step 3 to catch where it started.' }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (Composite Factor Trap)</strong> 4 is a <em>composite number</em> (2 × 2), NOT a prime number! In prime factorization, every factor must strictly be a prime number (2, 3, 5, 7, etc.). Priya left 4 un-split! The correct prime factorization is <strong>2 × 2 × 2 × 3 × 3 = 2³ × 3²</strong>.'
  },
  {
    id: 'mistake_t1_factor_vs_multiple',
    title: '3. Kabir\'s Factor vs Multiple Slip',
    topic: 'HCF Boundary Rule',
    student: 'Student: Kabir (Class 5-C)',
    question: 'Find the HCF of 8 and 32.',
    steps: [
      { label: 'Step 1', text: 'Lists factors of 8: 1, 2, 4, 8', isBlunder: false },
      { label: 'Step 2', text: 'Lists factors of 32: 1, 2, 4, 8, 16, 32', isBlunder: false },
      { label: 'Step 3', text: 'Thinks: "Highest means the largest number on the sheet, so HCF = 32!"', isBlunder: true }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (The Upper Bound Rule)</strong> A factor can NEVER be larger than the numbers themselves! HCF must always be &le; smaller number (&le; 8). 32 is a multiple of 8, not a factor of 8! The common factors are 1, 2, 4, 8, so the Highest Common Factor is <strong>8</strong>.'
  },
  {
    id: 'mistake_t1_coprime_fallacy',
    title: '4. Ananya\'s Co-Prime Misconception',
    topic: 'Co-Prime Numbers',
    student: 'Student: Ananya (Class 5-A)',
    question: 'Are 8 and 15 co-prime numbers? Explain your answer.',
    steps: [
      { label: 'Step 1', text: 'Finds factors of 8: 1, 2, 4, 8 (composite number)', isBlunder: false },
      { label: 'Step 2', text: 'Finds factors of 15: 1, 3, 5, 15 (composite number)', isBlunder: false },
      { label: 'Step 3', text: 'Concludes: "No, 8 and 15 CANNOT be co-prime because neither 8 nor 15 is a prime number!"', isBlunder: true }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (Co-Primes Do NOT Have to Be Prime)</strong> Two numbers are co-prime if their <strong>ONLY common factor is 1</strong> (HCF = 1). They do NOT need to be prime numbers themselves! Factors of 8 are {1, 2, 4, 8} and factors of 15 are {1, 3, 5, 15}. Their only shared factor is 1, so <strong>8 and 15 ARE indeed co-prime</strong>!'
  }
];

const MISTAKES_TOPIC_2 = [
  {
    id: 'mistake_t2_converse_fallacy',
    title: '1. Aman\'s False Converse Fallacy',
    topic: 'Divisibility by 3 & 9',
    student: 'Student: Aman (Class 5-C)',
    question: 'Is 426 divisible by 9?',
    steps: [
      { label: 'Step 1', text: 'Calculates sum of digits: 4 + 2 + 6 = 12', isBlunder: false },
      { label: 'Step 2', text: 'Checks: 12 is divisible by 3, so 426 is divisible by 3', isBlunder: false },
      { label: 'Step 3', text: 'Concludes: "Since 426 is divisible by 3, it MUST also be divisible by 9!"', isBlunder: true }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (False Converse)</strong> Divisibility by 3 does NOT guarantee divisibility by 9! Every multiple of 9 is divisible by 3, but the reverse is false (e.g. 12, 15, 21, 24, 30 are divisible by 3, but NOT by 9). For 9, the sum of digits must itself be a multiple of 9. Here 4 + 2 + 6 = 12, which is NOT divisible by 9. So 426 is NOT divisible by 9!'
  },
  {
    id: 'mistake_t2_single_digit_trap',
    title: '2. Kavya\'s Single-Digit Trap',
    topic: 'Divisibility by 4',
    student: 'Student: Kavya (Class 5-B)',
    question: 'Is 5,826 divisible by 4?',
    steps: [
      { label: 'Step 1', text: 'Looks at the last digit of 5,826: ones digit is 6', isBlunder: false },
      { label: 'Step 2', text: 'Claims: "Since 6 is even and divisible by 2, 5,826 is divisible by 4!"', isBlunder: true },
      { label: 'Step 3', text: 'Concludes: 5,826 is divisible by 4', isBlunder: false, downstreamHint: 'You are completely right: 5,826 is definitely NOT divisible by 4 (5,826 ÷ 4 = 1,456 R 2)! But Step 3 is just Kavya\'s conclusion based on the flawed single-digit rule she assumed in <strong>Step 2</strong>. Tap Step 2 to pinpoint where she broke the divisibility rule!' }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (Two-Digit Rule for 4)</strong> The rule of 4 requires checking the <strong>last TWO digits</strong>, NOT just the last digit! (Because 100 is divisible by 4, only the last two digits matter). The last two digits of 5,826 are <strong>26</strong>. 26 ÷ 4 = 6 remainder 2. Since 26 is not divisible by 4, <strong>5,826 is NOT divisible by 4</strong>!'
  },
  {
    id: 'mistake_t2_non_coprime_rule12',
    title: '3. Rahul\'s Non-Co-Prime Trap',
    topic: 'Divisibility by 12',
    student: 'Student: Rahul (Class 5-A)',
    question: 'Test if 18 is divisible by 12 using factor rules.',
    steps: [
      { label: 'Step 1', text: 'Chooses factors of 12: 2 × 6 = 12', isBlunder: false },
      { label: 'Step 2', text: 'Checks 18: 18 is even (divisible by 2) and 18 is divisible by 6 (6 × 3 = 18)', isBlunder: false },
      { label: 'Step 3', text: 'Concludes: "Since 18 is divisible by both 2 and 6, it MUST be divisible by 12!"', isBlunder: true }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (The Co-Prime Factor Law)</strong> You can only test a composite divisor using two factors that are <strong>CO-PRIME</strong> (HCF = 1)! 2 and 6 share a common factor of 2 (HCF = 2, not 1). 18 ÷ 12 = 1.5 (leaves remainder 6). To test for 12, Rahul MUST test divisibility by <strong>3 and 4</strong> (which are co-prime). 18 is NOT divisible by 4, so it is NOT divisible by 12!'
  },
  {
    id: 'mistake_t2_negative_rule11',
    title: '4. Sneha\'s Rule 11 Negative Trap',
    topic: 'Divisibility by 11',
    student: 'Student: Sneha (Class 5-B)',
    question: 'Test if 9,185 is divisible by 11 using the alternate sum rule.',
    steps: [
      { label: 'Step 1', text: 'Sum of digits at odd places (from right): 5 + 1 = 6', isBlunder: false },
      { label: 'Step 2', text: 'Sum of digits at even places (from right): 8 + 9 = 17', isBlunder: false },
      { label: 'Step 3', text: 'Calculates difference: 6 − 17 = −11', isBlunder: false },
      { label: 'Step 4', text: 'Concludes: "Since −11 is negative, it is NOT 0 or 11, so 9,185 is not divisible by 11!"', isBlunder: true }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (Absolute Difference Rule)</strong> In the Rule of 11, we take the <strong>difference</strong> |17 − 6| = 11, or note that −11 is a multiple of 11 (−1 × 11)! If the difference between odd-place and even-place sums is 0 or ANY multiple of 11 (including 11, 22, 33...), the number IS divisible by 11. Here 9,185 ÷ 11 = 835 exactly!'
  }
];

const MISTAKES_TOPIC_3 = [
  {
    id: 'mistake_t3_subtraction_reversal',
    title: '1. Tina\'s Subtraction Reversal',
    topic: 'Order Clue Words',
    student: 'Student: Tina (Class 5-A)',
    question: 'Write an algebraic expression for: "Subtract 7 from 4 times a number x".',
    steps: [
      { label: 'Step 1', text: 'Translates "4 times a number x" ➔ 4x', isBlunder: false },
      { label: 'Step 2', text: 'Translates "Subtract 7 from ..." ➔ Tina writes: 7 − 4x', isBlunder: true },
      { label: 'Step 3', text: 'Checks with x = 3: 7 − 4(3) = 7 − 12 = −5', isBlunder: false, downstreamHint: 'You caught that −5 is the wrong answer for the problem (for x = 3, 4(3) − 7 = 5, not −5)! But Tina evaluated 7 − 12 = −5 correctly according to what she wrote. The blunder occurred before this, when she wrote the subtraction backwards in <strong>Step 2</strong>! Tap Step 2.' }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (#1 CBSE Exam Trap)</strong> In English, "Subtract A from B" means you start with B and take A away: <strong>B − A</strong>! Tina wrote 7 − 4x, which means "Subtract 4x from 7". The correct expression is <strong>4x − 7</strong>.'
  },
  {
    id: 'mistake_t3_missing_brackets',
    title: '2. Vikram\'s Missing Brackets',
    topic: 'Parentheses Grouping',
    student: 'Student: Vikram (Class 5-C)',
    question: 'Write an expression for: "Divide 45 by the sum of 2 and 3".',
    steps: [
      { label: 'Step 1', text: 'Translates "the sum of 2 and 3" as 2 + 3', isBlunder: false },
      { label: 'Step 2', text: 'Translates "Divide 45 by ..." as: 45 ÷ 2 + 3', isBlunder: true },
      { label: 'Step 3', text: 'Evaluates without brackets: 22.5 + 3 = 25.5', isBlunder: false, downstreamHint: '25.5 is definitely the wrong answer for dividing 45 by the sum of 2 and 3 (the correct answer is 45 ÷ (2 + 3) = 9)! But Vikram evaluated 45 ÷ 2 + 3 strictly according to what he wrote in <strong>Step 2</strong> without brackets. Tap Step 2 to pinpoint the blunder!' }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (BODMAS Parentheses Rule)</strong> Without parentheses, division happens before addition! 45 ÷ 2 + 3 evaluates as (45 ÷ 2) + 3 = 22.5 + 3 = 25.5. The entire sum (2 + 3) was meant to be the divisor. Vikram needed brackets: <strong>45 ÷ (2 + 3)</strong> = 45 ÷ 5 = <strong>9</strong>!'
  },
  {
    id: 'mistake_t3_bodmas_blindness',
    title: '3. Arjun\'s BODMAS Blindness',
    topic: 'Order of Operations',
    student: 'Student: Arjun (Class 5-B)',
    question: 'Evaluate the expression: 20 + 30 ÷ 5 × 2.',
    steps: [
      { label: 'Step 1', text: 'Calculates from left to right: 20 + 30 = 50', isBlunder: true },
      { label: 'Step 2', text: 'Divides 50 by 5 = 10', isBlunder: false, downstreamHint: '50 ÷ 5 = 10 is correct arithmetic, but 10 is on the wrong track! The blunder happened right at the start in <strong>Step 1</strong> when Arjun added before dividing. Tap Step 1!' },
      { label: 'Step 3', text: 'Multiplies 10 by 2 = 20', isBlunder: false, downstreamHint: '20 is indeed the wrong final answer (the true answer using BODMAS is 32)! But Arjun multiplied 10 × 2 = 20 correctly; he was just carrying forward the order violation from <strong>Step 1</strong>. Tap Step 1 to catch where he broke BODMAS!' }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (BODMAS Order of Operations)</strong> Division and Multiplication MUST be done BEFORE Addition! Arjun added 20 + 30 first. The correct order is: First Division: 30 ÷ 5 = 6. Then Multiplication: 6 × 2 = 12. Finally Addition: 20 + 12 = <strong>32</strong> (not 20)!'
  },
  {
    id: 'mistake_t3_distributive_slip',
    title: '4. Meera\'s Distributive Slip',
    topic: 'Multiplying a Group',
    student: 'Student: Meera (Class 5-A)',
    question: 'Expand and simplify: 5 × (x + 4).',
    steps: [
      { label: 'Step 1', text: 'Multiplies 5 by the variable x ➔ 5x', isBlunder: false },
      { label: 'Step 2', text: 'Copies the rest of the bracket: writes 5x + 4', isBlunder: true },
      { label: 'Step 3', text: 'Checks with x = 2: 5(2) + 4 = 14 (whereas 5 × (2 + 4) = 30)', isBlunder: false, downstreamHint: 'Step 3 actually caught the contradiction: 14 ≠ 30 proves something is wrong! But checking with a number is good practice — the blunder itself occurred in <strong>Step 2</strong> where Meera forgot to multiply 5 by 4. Tap Step 2!' }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (Distributive Law)</strong> The factor outside the bracket multiplies <em>EVERY term inside the bracket</em>! Meera multiplied 5 by x, but forgot to multiply 5 by 4! Correct expansion is 5 × x + 5 × 4 = <strong>5x + 20</strong>.'
  }
];

const MISTAKES_TOPIC_4 = [
  {
    id: 'mistake_t4_adding_vs_doubling',
    title: '1. Aditya\'s Adding vs Doubling Slip',
    topic: 'Geometric Patterns',
    student: 'Student: Aditya (Class 5-C)',
    question: 'Find the next two terms of the sequence: 2, 4, 8, 16, ___, ___.',
    steps: [
      { label: 'Step 1', text: 'Looks at first step from 2 to 4: observes 2 + 2 = 4', isBlunder: false },
      { label: 'Step 2', text: 'Assumes the rule is "Add 2 each time"', isBlunder: true },
      { label: 'Step 3', text: 'Predicts next term: 16 + 2 = 18', isBlunder: false, downstreamHint: '18 is indeed the wrong number for this sequence (the real next term is 32)! But notice that Aditya added 2 correctly (16 + 2 = 18). His arithmetic here wasn\'t the blunder — he is just following the false rule he assumed in <strong>Step 2</strong> ("Add 2 each time")! Tap Step 2 to catch the root blunder.' }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (Single-Step Fallacy)</strong> Never deduce a pattern rule from only the first two terms! Check the next terms: 4 ➔ 8 is +4 (or × 2), and 8 ➔ 16 is +8 (or × 2). The constant rule is <strong>Multiply by 2 (Doubling)</strong>, NOT adding 2! The next terms are 16 × 2 = <strong>32</strong> and 32 × 2 = <strong>64</strong>.'
  },
  {
    id: 'mistake_t4_triangular_halving',
    title: '2. Pooja\'s Triangular Halving Trap',
    topic: 'Triangular Numbers',
    student: 'Student: Pooja (Class 5-A)',
    question: 'Find the 5th triangular number (T₅).',
    steps: [
      { label: 'Step 1', text: 'Recalls triangular dots formula involves n and (n + 1)', isBlunder: false },
      { label: 'Step 2', text: 'Multiplies 5 by (5 + 1): 5 × 6 = 30', isBlunder: false },
      { label: 'Step 3', text: 'Concludes: "The 5th triangular number is 30 dots!"', isBlunder: true }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (Forgot to Divide by 2)</strong> A triangular number represents HALF of a rectangle of dots ($n \\times (n+1)$)! Pooja calculated the full rectangle (5 × 6 = 30) but forgot to divide by 2! The 5th triangular number is 1 + 2 + 3 + 4 + 5 = (5 × 6) / 2 = <strong>15</strong> dots.'
  },
  {
    id: 'mistake_t4_pyramid_sum_fallacy',
    title: '3. Sameer\'s Pyramid Base-Sum Fallacy',
    topic: 'Number Towers',
    student: 'Student: Sameer (Class 5-B)',
    question: 'In a 3-tier number tower with bottom row [10, 20, 30], what is the top block number?',
    steps: [
      { label: 'Step 1', text: 'Observes bottom row: 10, 20, 30', isBlunder: false },
      { label: 'Step 2', text: 'Claims: "The top block of a tower is simply the sum of all base blocks: 10 + 20 + 30 = 60!"', isBlunder: true }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (The Overlapping Middle Block)</strong> In a number tower, blocks add in adjacent pairs! Row 2 has two blocks: (10 + 20) = 30 and (20 + 30) = 50. The top block is 30 + 50 = <strong>80</strong>! Notice the middle block (20) gets counted TWICE because it supports both blocks above it: 10 + 2(20) + 30 = 80 ≠ 60!'
  },
  {
    id: 'mistake_t4_premature_palindrome',
    title: '4. Diya\'s Premature Palindrome Stop',
    topic: 'Palindromic Numbers',
    student: 'Student: Diya (Class 5-A)',
    question: 'Turn the number 48 into a special palindromic number using the reverse-and-add method.',
    steps: [
      { label: 'Step 1', text: 'Takes 48, reverses digits to get 84', isBlunder: false },
      { label: 'Step 2', text: 'Adds them together: 48 + 84 = 132', isBlunder: false },
      { label: 'Step 3', text: 'Stops and writes: "The special palindromic number is 132!"', isBlunder: true }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (Premature Stop)</strong> 132 is NOT a palindrome! (Reading 132 backwards gives 231, which does not match 132). If the first sum is not a palindrome, the NCERT algorithm requires repeating the process: Reverse 132 to get 231, and add: 132 + 231 = <strong>363</strong> (which reads the same forwards and backwards!).'
  }
];

const MISTAKES_TOPIC_5 = [
  {
    id: 'mistake_t5_ray_reversal',
    title: '1. Varun\'s Ray Reversal Fallacy',
    topic: 'Points, Lines & Rays',
    student: 'Student: Varun (Class 5-B)',
    question: 'Does Ray AB (→AB) mean the exact same geometric figure as Ray BA (→BA)?',
    steps: [
      { label: 'Step 1', text: 'Notes that Line Segment AB is identical to Line Segment BA', isBlunder: false },
      { label: 'Step 2', text: 'Notes that Line AB (↔) is identical to Line BA (↔)', isBlunder: false },
      { label: 'Step 3', text: 'Concludes: "Therefore, Ray AB (→) must also be the exact same ray as Ray BA (→)!"', isBlunder: true }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (Ray Direction & Fixed Initial Endpoint)</strong> A ray has a fixed <strong>initial starting endpoint</strong> and extends infinitely in ONE direction! In Ray AB (→), the initial point is A and it shoots through B. In Ray BA (→), the initial point is B and it shoots through A. They point in opposite directions and start at different points, so they are <strong>NOT the same ray</strong>!'
  },
  {
    id: 'mistake_t5_two_right_angles',
    title: '2. Siddharth\'s Two Right Angles Trap',
    topic: 'Triangle Angle Sum',
    student: 'Student: Siddharth (Class 5-C)',
    question: 'Can a triangle have two right angles (90°)? Explain why or why not.',
    steps: [
      { label: 'Step 1', text: 'Recalls that the sum of all three interior angles in any triangle is 180°', isBlunder: false },
      { label: 'Step 2', text: 'Claims: "Yes! A triangle can have angles 90°, 90°, and 0° because 90 + 90 + 0 = 180°!"', isBlunder: true }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (Geometric Angle Definition)</strong> A triangle MUST have three non-zero angles formed by three intersecting lines! An angle of 0° means the two arms lie on top of each other (no opening), which is not an angle of a triangle. Furthermore, two 90° angles to the same base create <strong>parallel lines</strong> that never meet to form a third vertex! A triangle can have at most <strong>ONE right angle</strong>.'
  },
  {
    id: 'mistake_t5_compass_radius_trap',
    title: '3. Nisha\'s Compass Radius Trap',
    topic: 'Circle Construction',
    student: 'Student: Nisha (Class 5-A)',
    question: 'Using a compass and ruler, draw a circle of diameter 12 cm.',
    steps: [
      { label: 'Step 1', text: 'Takes a ruler and opens compass legs to a width of 12 cm', isBlunder: true },
      { label: 'Step 2', text: 'Places needle on paper and rotates to draw the circle', isBlunder: false, downstreamHint: 'Rotating the compass to draw a circle is standard procedure! The mistake was already locked in before she touched the paper, when she set the compass width in <strong>Step 1</strong>. Tap Step 1!' },
      { label: 'Step 3', text: 'Measures across the center: distance is 24 cm', isBlunder: false, downstreamHint: 'A diameter of 24 cm is indeed the wrong size (the problem asked for 12 cm)! But measuring the diameter was an accurate check. The blunder was made right at the start in <strong>Step 1</strong> when she confused radius with diameter. Tap Step 1!' }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (Compass Width = Radius, Not Diameter!)</strong> A compass draws from the center to the edge, which is the <strong>RADIUS (r)</strong>! When you open a compass to 12 cm, you draw a circle with radius 12 cm and diameter 2 × 12 = 24 cm! To draw a circle with diameter 12 cm, Nisha must set her compass to the radius: <strong>r = d ÷ 2 = 12 ÷ 2 = 6 cm</strong>!'
  },
  {
    id: 'mistake_t5_trapezium_diagonals',
    title: '4. Aryan\'s Diagonal Confusion',
    topic: 'Quadrilateral Properties',
    student: 'Student: Aryan (Class 5-B)',
    question: 'Which quadrilaterals have diagonals that bisect each other at right angles (90°)?',
    steps: [
      { label: 'Step 1', text: 'Identifies that a Square has diagonals that bisect at 90°', isBlunder: false },
      { label: 'Step 2', text: 'Identifies that a Rhombus has diagonals that bisect at 90°', isBlunder: false },
      { label: 'Step 3', text: 'Adds: "And a Trapezium also has diagonals that bisect at 90° because it has parallel sides!"', isBlunder: true }
    ],
    diagnosis: '🛑 <strong>Mistake Caught! (Trapezium Diagonals Do NOT Bisect at 90°)</strong> A trapezium only has ONE pair of parallel sides. Its diagonals neither bisect each other nor meet at 90°! Only quadrilaterals with <strong>all 4 sides equal</strong> (the <strong>Rhombus</strong> and the <strong>Square</strong>), as well as a <strong>Kite</strong>, have perpendicular diagonals. A trapezium\'s diagonals meet at non-right angles.'
  }
];

function renderSpotMistakesGeneric(container, mistakeCases) {
  let activeCaseIdx = 0;

  function renderView() {
    const c = mistakeCases[activeCaseIdx];
    const blunderIdx = c.steps.findIndex(s => s.isBlunder);

    container.innerHTML = `
      <div class="trap-container">
        <div class="think-callout-math">
          <div class="callout-header">💡 Think About It — The Teacher's Lens</div>
          <p>When you learn to spot why an answer is wrong, you become immune to making the same mistake yourself! Look at each step below and ask: <em>"Where did the student commit the root blunder?"</em></p>
        </div>

        <!-- Case Navigation Tabs -->
        <div class="trap-nav-pills">
          ${mistakeCases.map((tc, idx) => `
            <button class="trap-nav-pill ${idx === activeCaseIdx ? 'active' : ''}" data-idx="${idx}">
              ${tc.title}
            </button>
          `).join('')}
        </div>

        <!-- Student Notebook Slip -->
        <div class="trap-notebook-slip">
          <div class="trap-notebook-badge">Exam Slip</div>
          <div class="trap-student-meta">
            📝 <strong>${c.student}</strong> &bull; Topic: <em>${c.topic}</em>
          </div>

          <div class="trap-question-banner">
            ❓ Question: ${c.question}
          </div>

          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.75rem;">
            👇 <strong>Tap the step where the student made a blunder:</strong>
          </p>

          <div class="trap-steps-list">
            ${c.steps.map((st, sIdx) => `
              <div class="trap-step-item" data-step="${sIdx}">
                <span class="trap-step-label">${st.label}</span>
                <span class="trap-step-content">${st.text}</span>
                <span class="trap-step-action">Tap to inspect 🔍</span>
              </div>
            `).join('')}
          </div>

          <div id="trap-verdict-area"></div>
        </div>
      </div>
    `;

    // Case selection pills
    container.querySelectorAll('.trap-nav-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        playClickSound();
        activeCaseIdx = parseInt(e.currentTarget.dataset.idx, 10);
        renderView();
      });
    });

    // Step tap inspection
    const stepItems = container.querySelectorAll('.trap-step-item');
    const verdictArea = container.querySelector('#trap-verdict-area');

    stepItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const sIdx = parseInt(e.currentTarget.dataset.step, 10);
        const step = c.steps[sIdx];

        stepItems.forEach(si => si.classList.remove('selected-blunder', 'selected-correct', 'selected-downstream'));

        if (step.isBlunder) {
          // STATE 1: Root Blunder Caught!
          playCorrectSound();
          item.classList.add('selected-blunder');
          verdictArea.innerHTML = `
            <div class="trap-verdict-card success">
              <div style="font-weight: 700; font-size: 1.05rem; margin-bottom: 0.4rem; color: #34d399;">
                🎉 Excellent Teacher Diagnostic! You caught the blunder!
              </div>
              <p style="margin: 0; font-size: 0.95rem; line-height: 1.55;">${c.diagnosis}</p>
            </div>
          `;
        } else if (blunderIdx !== -1 && sIdx > blunderIdx) {
          // STATE 2: Downstream Consequence (Mistake was committed earlier)
          playTone(330, 'triangle', 0.1, 0.16);
          item.classList.add('selected-downstream');
          const blunderLabel = c.steps[blunderIdx].label;
          const downstreamText = step.downstreamHint || `You noticed that this step produces an incorrect outcome or wrong answer for the problem! However, the student is simply following through on the misconception or bad rule chosen back in <strong>${blunderLabel}</strong>. Did the student make an arithmetic mistake here, or was the blunder committed earlier? Tap the step where the mistake actually started!`;
          verdictArea.innerHTML = `
            <div class="trap-verdict-card downstream">
              <div style="font-weight: 700; font-size: 1.02rem; margin-bottom: 0.35rem; color: #f59e0b;">
                ⚠️ Good eye! You spotted the wrong result, but the blunder happened earlier!
              </div>
              <p style="margin: 0; font-size: 0.92rem; line-height: 1.5;">${downstreamText}</p>
            </div>
          `;
        } else {
          // STATE 3: Valid Prior Premise
          playTone(261.63, 'sine', 0.08, 0.12);
          item.classList.add('selected-correct');
          const validText = step.validHint || `This step is mathematically sound, factually accurate, and error-free! The student observed or calculated this part properly. Look further down the steps to catch where they made a blunder.`;
          verdictArea.innerHTML = `
            <div class="trap-verdict-card premise">
              <div style="font-weight: 700; font-size: 1rem; margin-bottom: 0.35rem; color: #38bdf8;">
                🔍 ${step.label} is completely valid!
              </div>
              <p style="margin: 0; font-size: 0.9rem; line-height: 1.5;">${validText}</p>
            </div>
          `;
        }
      });
    });
  }

  renderView();
}

function renderSpotMistakesTopic1(container) {
  renderSpotMistakesGeneric(container, MISTAKES_TOPIC_1);
}

function renderSpotMistakesTopic2(container) {
  renderSpotMistakesGeneric(container, MISTAKES_TOPIC_2);
}

function renderSpotMistakesTopic3(container) {
  renderSpotMistakesGeneric(container, MISTAKES_TOPIC_3);
}

function renderSpotMistakesTopic4(container) {
  renderSpotMistakesGeneric(container, MISTAKES_TOPIC_4);
}

function renderSpotMistakesTopic5(container) {
  renderSpotMistakesGeneric(container, MISTAKES_TOPIC_5);
}

// Backward compatibility alias
const renderSpotTheTrapModule = renderSpotMistakesTopic1;

/* ==========================================================================
   TOPIC 2 LEARN MODULES RENDERERS
   ========================================================================== */

/* Topic 2 - Module 1: Divisibility Rules Master Cheat Sheet */
function renderAllRulesTable(container) {
  const rulesData = [
    {
      num: 2,
      category: 'last_digit',
      title: 'Rule for 2: Even Last Digit',
      stmt: 'A number is divisible by 2 if its last digit is <strong>0, 2, 4, 6, or 8</strong> (an even number).',
      why: '<strong>Why it works:</strong> In base 10, any number like 354 = 350 + 4 = (35 × 10) + 4. Since 10 is divisible by 2, (35 × 10) is always divisible by 2. Thus, only the ones place digit matters!',
      example: '<strong>Example:</strong> 4,816 ends in 6 (even) ➔ <strong>Divisible by 2!</strong>',
      trap: '⚠️ Watch out: Do NOT add digits for Rule 2! Only check the single last digit.'
    },
    {
      num: 3,
      category: 'digit_sums',
      title: 'Rule for 3: Sum of Digits',
      stmt: 'A number is divisible by 3 if the <strong>sum of all its digits</strong> is a multiple of 3.',
      why: '<strong>Why it works:</strong> Each place value power leaves remainder 1 when divided by 3: 10 = 9+1, 100 = 99+1, 1000 = 999+1. So (a×100 + b×10 + c) = (multiples of 3) + (a + b + c). If the digit sum divides by 3, the entire number does!',
      example: '<strong>Example:</strong> 528 ➔ 5 + 2 + 8 = 15. Since 15 ÷ 3 = 5, 528 is <strong>Divisible by 3!</strong>',
      trap: '⚠️ Common trap: Do not confuse 3 and 9! If digit sum is 6 or 12, it divides by 3 but NOT by 9.'
    },
    {
      num: 4,
      category: 'last_two_three',
      title: 'Rule for 4: Last Two Digits',
      stmt: 'A number is divisible by 4 if the number formed by its <strong>last two digits</strong> is divisible by 4 (or ends in 00).',
      why: '<strong>Why it works:</strong> 100 is evenly divisible by 4 (100 ÷ 4 = 25). Thus, all hundreds, thousands, and lakhs are already divisible by 4. Only the last two digits determine the remainder!',
      example: '<strong>Example:</strong> 7,524 ➔ Last two digits form 24. Since 24 ÷ 4 = 6, 7,524 is <strong>Divisible by 4!</strong>',
      trap: '⚠️ Exam tip: Numbers ending in 00 (like 500, 1,200) are ALWAYS divisible by 4.'
    },
    {
      num: 5,
      category: 'last_digit',
      title: 'Rule for 5: Ends in 0 or 5',
      stmt: 'A number is divisible by 5 if its last digit is <strong>0 or 5</strong>.',
      why: '<strong>Why it works:</strong> 10 is divisible by 5 (10 ÷ 5 = 2). So all tens and higher powers are multiples of 5. Only the units digit must be a multiple of 5 (0 or 5).',
      example: '<strong>Example:</strong> 8,945 ends in 5 ➔ <strong>Divisible by 5!</strong> (8,940 ends in 0 ➔ also divisible).',
      trap: '⚠️ Fact: Any number divisible by 10 is automatically divisible by 5!'
    },
    {
      num: 6,
      category: 'composite',
      title: 'Rule for 6: Divisible by Both 2 and 3',
      stmt: 'A number is divisible by 6 if it is <strong>an even number AND the sum of its digits is divisible by 3</strong>.',
      why: '<strong>Why it works (Co-Prime Law):</strong> 6 = 2 × 3. Because 2 and 3 are co-prime (HCF = 1), satisfying both rules simultaneously guarantees divisibility by their product 6!',
      example: '<strong>Example:</strong> 924 ➔ Ends in 4 (even, passes 2). Sum = 9 + 2 + 4 = 15 (divisible by 3). Both pass ➔ <strong>Divisible by 6!</strong>',
      trap: '⚠️ If the number is odd, immediately stop! An odd number can NEVER be divisible by 6.'
    },
    {
      num: 7,
      category: 'subtract_double',
      title: 'Rule for 7: Double Last Digit & Subtract',
      stmt: 'Double the last digit and subtract it from the remaining truncated number. If the result is <strong>0 or a multiple of 7</strong>, the number is divisible by 7.',
      why: '<strong>Why it works:</strong> 10a + b − 21b = 10a − 20b = 10(a − 2b). Since 21 is a multiple of 7, (a − 2b) preserves divisibility by 7!',
      example: '<strong>Example:</strong> 343 ➔ Truncated 34, last digit 3. 34 − (2 × 3) = 34 − 6 = 28. 28 ÷ 7 = 4 ➔ <strong>Divisible by 7!</strong>',
      trap: '⚠️ For larger numbers (like 672), repeat the process: 67 − (2 × 2) = 63 = 7 × 9 ➔ Divisible!'
    },
    {
      num: 8,
      category: 'last_two_three',
      title: 'Rule for 8: Last Three Digits',
      stmt: 'A number is divisible by 8 if the number formed by its <strong>last three digits</strong> is divisible by 8 (or ends in 000).',
      why: '<strong>Why it works:</strong> 1,000 is evenly divisible by 8 (1,000 ÷ 8 = 125). All thousands, ten thousands, and lakhs are divisible by 8. So only the last three digits matter!',
      example: '<strong>Example:</strong> 53,816 ➔ Last three digits form 816. Since 816 ÷ 8 = 102 (exact), 53,816 is <strong>Divisible by 8!</strong>',
      trap: '⚠️ If a number is not divisible by 4, it can NEVER be divisible by 8!'
    },
    {
      num: 9,
      category: 'digit_sums',
      title: 'Rule for 9: Sum of Digits',
      stmt: 'A number is divisible by 9 if the <strong>sum of all its digits is a multiple of 9</strong> (9, 18, 27, 36...).',
      why: '<strong>Why it works:</strong> In base 10, every power of 10 is 1 greater than a multiple of 9: 10 = 9+1, 100 = 99+1, 1,000 = 999+1. The remainder of any number modulo 9 is identical to the remainder of its digit sum!',
      example: '<strong>Example:</strong> 62,370 ➔ 6 + 2 + 3 + 7 + 0 = 18. Since 18 ÷ 9 = 2, 62,370 is <strong>Divisible by 9!</strong>',
      trap: '⚠️ All multiples of 9 are divisible by 3, but NOT all multiples of 3 are divisible by 9 (e.g., 6, 12, 15, 24).'
    },
    {
      num: 10,
      category: 'last_digit',
      title: 'Rule for 10: Ends in 0',
      stmt: 'A number is divisible by 10 if its <strong>last digit is 0</strong>.',
      why: '<strong>Why it works:</strong> Any multiple of 10 must have 0 in the ones place value.',
      example: '<strong>Example:</strong> 42,900 ends in 0 ➔ <strong>Divisible by 10!</strong>',
      trap: '⚠️ If a number is divisible by 10, it is ALWAYS divisible by 2 and by 5.'
    },
    {
      num: 11,
      category: 'alternating',
      title: 'Rule for 11: Alternating Sum Hopscotch',
      stmt: 'Find the difference between the <strong>sum of digits at odd places</strong> and the <strong>sum of digits at even places</strong> (from right to left). If the difference is <strong>0 or a multiple of 11</strong>, the number is divisible by 11.',
      why: '<strong>Why it works:</strong> Powers of 10 alternate modulo 11: 1 ≡ 1, 10 ≡ −1, 100 ≡ +1, 1,000 ≡ −1. So digits alternate signs!',
      example: '<strong>Example:</strong> 1,331 ➔ Odd places: 1 + 3 = 4. Even places: 3 + 1 = 4. Difference: 4 − 4 = 0 ➔ <strong>Divisible by 11!</strong>',
      trap: '⚠️ Always number positions from right to left (1st digit is ones, 2nd is tens, 3rd is hundreds).'
    },
    {
      num: 12,
      category: 'composite',
      title: 'Rule for 12: Divisible by Both 3 and 4',
      stmt: 'A number is divisible by 12 if it is <strong>divisible by BOTH 3 AND 4 simultaneously</strong>.',
      why: '<strong>Why it works:</strong> 12 = 3 × 4. Because 3 and 4 are co-prime (HCF = 1), their rules can be combined safely! (You CANNOT use 2 and 6 because HCF(2,6)=2).',
      example: '<strong>Example:</strong> 1,524 ➔ Sum = 12 (div by 3). Last two digits = 24 (div by 4). Both pass ➔ <strong>Divisible by 12!</strong>',
      trap: '⚠️ Critical CBSE Trap: 18 is divisible by 2 and 6, but NOT by 12! Never use 2 & 6 to test 12.'
    }
  ];

  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 Think About It — The Secret Codebreaker 🕵️</div>
      <p>Divisibility rules are not arbitrary formulas. They are <strong>number fingerprints</strong>! Why do 3 and 9 use digit sums? Because 10 = 9 + 1, 100 = 99 + 1, 1000 = 999 + 1 — every place value is just a multiple of 9 plus 1 leftover! Adding digits simply collects all the leftovers to see if they form another multiple of 3 or 9.</p>
    </div>

    <div class="rules-filter-row" id="rules-filter-bar">
      <button class="rule-filter-btn active" data-filter="all">🌟 All Rules (2–12)</button>
      <button class="rule-filter-btn" data-filter="last_digit">🎯 Last Digit (2, 5, 10)</button>
      <button class="rule-filter-btn" data-filter="last_two_three">📐 Last 2 or 3 Digits (4, 8)</button>
      <button class="rule-filter-btn" data-filter="digit_sums">🔢 Digit Sums (3, 9)</button>
      <button class="rule-filter-btn" data-filter="composite">🤝 Co-Prime Rules (6, 12)</button>
      <button class="rule-filter-btn" data-filter="alternating">🦘 Hopscotch (11)</button>
      <button class="rule-filter-btn" data-filter="subtract_double">✂️ Double & Subtract (7)</button>
    </div>

    <div class="rules-grid" id="rules-cards-grid">
      ${rulesData.map(r => `
        <div class="rule-card" data-category="${r.category}" data-num="${r.num}">
          <div class="rule-card-header">
            <div class="rule-badge-pill">${r.num}</div>
            <span class="rule-category-tag">${r.category.replace('_', ' ')}</span>
          </div>
          <div class="rule-title">${r.title}</div>
          <div class="rule-stmt">${r.stmt}</div>
          <div class="rule-why-box">${r.why}</div>
          <div class="rule-example-box">${r.example}</div>
          <div class="rule-trap-alert">${r.trap}</div>
        </div>
      `).join('')}
    </div>
  `;

  // Attach filter buttons
  const filterBtns = container.querySelectorAll('.rule-filter-btn');
  const cards = container.querySelectorAll('.rule-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Topic 2 - Module 2: Live Divisibility Inspector */
function renderLiveTester(container) {
  container.innerHTML = `
    <div class="tester-box">
      <div class="tester-input-bar">
        <label class="tester-label" for="live-test-num">Enter any number to inspect:</label>
        <input type="number" id="live-test-num" class="tester-num-input" value="2520" min="1" max="99999999" placeholder="e.g. 2520">
        
        <div class="tester-presets">
          <span style="font-size: 0.8rem; color: var(--text-dim);">Presets:</span>
          <button class="tester-preset-btn" data-val="144">144</button>
          <button class="tester-preset-btn" data-val="504">504</button>
          <button class="tester-preset-btn" data-val="1331">1,331</button>
          <button class="tester-preset-btn" data-val="2520">2,520</button>
          <button class="tester-preset-btn" data-val="3816">3,816</button>
          <button class="tester-preset-btn" data-val="9876">9,876</button>
          <button class="tester-preset-btn" data-val="42900">42,900</button>
          <button class="tester-preset-btn" data-val="62178">62,178</button>
        </div>
      </div>

      <div class="inspector-table-container">
        <table class="inspector-table">
          <thead>
            <tr>
              <th style="width: 120px;">Divisor</th>
              <th style="width: 160px;">Verdict</th>
              <th>Step-by-Step Proof & Mathematical Reason</th>
            </tr>
          </thead>
          <tbody id="inspector-table-body">
            <!-- Rendered dynamically -->
          </tbody>
        </table>
      </div>
    </div>
  `;

  const input = container.querySelector('#live-test-num');
  const tbody = container.querySelector('#inspector-table-body');
  const presetBtns = container.querySelectorAll('.tester-preset-btn');

  function updateTable() {
    const val = parseInt(input.value) || 0;
    const results = getAllDivisibilityResults(val);

    tbody.innerHTML = results.map(r => `
      <tr>
        <td>
          <div class="divisor-cell">
            <span class="divisor-chip">${r.divisor}</span>
            <span>÷ ${r.divisor}</span>
          </div>
        </td>
        <td>
          <span class="status-badge ${r.isDivisible ? 'pass' : 'fail'}">
            ${r.isDivisible ? '✓ Divisible' : '✗ Not Divisible'}
          </span>
        </td>
        <td>
          <div class="reason-text">${r.reason}</div>
        </td>
      </tr>
    `).join('');
  }

  input.addEventListener('input', updateTable);

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      input.value = btn.getAttribute('data-val');
      updateTable();
    });
  });

  updateTable();
}

/* Topic 2 - Module 3: Co-Prime Factor Law */
function renderCoprimeCompositeModule(container) {
  container.innerHTML = `
    <div class="coprime-rule-card">
      <div class="concept-lead" style="margin-bottom: 0;">
        <strong>The Fundamental Co-Prime Law:</strong> If a number is divisible by two numbers <em>a</em> and <em>b</em>, it is guaranteed to be divisible by their product <em>(a × b)</em> <strong>ONLY IF a and b are CO-PRIME (HCF = 1)</strong>!
      </div>

      <div class="coprime-vs-grid">
        <!-- Valid Co-Prime Pairs -->
        <div class="coprime-box valid">
          <div class="coprime-box-header">
            <div class="coprime-box-title">✅ VALID: 12 = 3 × 4</div>
            <span class="coprime-status-tag">HCF = 1 (Co-Prime)</span>
          </div>
          <p style="color: #cbd5e1; font-size: 0.9rem;">
            Factors of 3: [1, 3]<br>
            Factors of 4: [1, 2, 4]<br>
            Common factor: <strong>1 only</strong> (HCF = 1).
          </p>
          <div style="background: rgba(16, 185, 129, 0.12); padding: 0.75rem; border-radius: 8px; font-size: 0.88rem; color: #a7f3d0;">
            ✓ <strong>Rule for 12:</strong> Must be divisible by BOTH 3 AND 4 simultaneously. This rule NEVER produces errors because 3 and 4 have no overlapping factors!
          </div>
        </div>

        <!-- Invalid Shared-Factor Pair -->
        <div class="coprime-box invalid">
          <div class="coprime-box-header">
            <div class="coprime-box-title">❌ INVALID: 12 = 2 × 6</div>
            <span class="coprime-status-tag">HCF = 2 (NOT Co-Prime)</span>
          </div>
          <p style="color: #cbd5e1; font-size: 0.9rem;">
            Factors of 2: [1, 2]<br>
            Factors of 6: [1, 2, 3, 6]<br>
            Common factors: <strong>1 and 2</strong> (HCF = 2).
          </p>
          <div class="counterexample-callout">
            🚨 <strong>The Famous Counterexample: 18</strong><br>
            • Is 18 divisible by 2? <strong>Yes</strong> (18 ÷ 2 = 9).<br>
            • Is 18 divisible by 6? <strong>Yes</strong> (18 ÷ 6 = 3).<br>
            • But is 18 divisible by 12? <strong style="color: var(--accent-rose);">NO!</strong> (18 ÷ 12 = 1 remainder 6).<br>
            Testing with 2 and 6 gives a false result because factor 2 is counted twice!
          </div>
        </div>
      </div>

      <!-- Other Valid Composite Rules -->
      <div class="calc-card" style="margin-top: 0.5rem;">
        <h4>Other Valid Composite Divisibility Rules</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-top: 0.75rem;">
          <div style="background: rgba(255,255,255,0.04); padding: 0.85rem; border-radius: 8px;">
            <strong style="color: var(--accent-amber-light);">Rule for 6 = 2 × 3</strong><br>
            <span style="font-size: 0.85rem; color: var(--text-muted);">HCF(2, 3) = 1 (Co-prime)<br>Test: Divisible by 2 AND 3.</span>
          </div>
          <div style="background: rgba(255,255,255,0.04); padding: 0.85rem; border-radius: 8px;">
            <strong style="color: var(--accent-amber-light);">Rule for 15 = 3 × 5</strong><br>
            <span style="font-size: 0.85rem; color: var(--text-muted);">HCF(3, 5) = 1 (Co-prime)<br>Test: Divisible by 3 AND 5.</span>
          </div>
          <div style="background: rgba(255,255,255,0.04); padding: 0.85rem; border-radius: 8px;">
            <strong style="color: var(--accent-amber-light);">Rule for 18 = 2 × 9</strong><br>
            <span style="font-size: 0.85rem; color: var(--text-muted);">HCF(2, 9) = 1 (Co-prime)<br>Test: Even AND digit sum div by 9.</span>
          </div>
        </div>
      </div>

      <!-- Interactive Comparison -->
      <div class="calc-card" style="margin-top: 0.5rem;">
        <h4>Try It Yourself: Test Any Number for 12</h4>
        <div class="calc-inputs">
          <div class="calc-inputs-row">
            <input type="number" id="coprime-test-num" class="calc-input" value="18" min="1" max="99999" placeholder="Number">
          </div>
          <button class="btn btn-primary" id="btn-calc-coprime">Compare 3 & 4 vs 2 & 6 ⚖️</button>
        </div>
        <div id="coprime-compare-result" style="margin-top: 1rem;"></div>
      </div>
    </div>
  `;

  const input = container.querySelector('#coprime-test-num');
  const btn = container.querySelector('#btn-calc-coprime');
  const resultBox = container.querySelector('#coprime-compare-result');

  function compareRules() {
    const n = parseInt(input.value) || 18;
    const div3 = checkDivisibility(n, 3).isDivisible;
    const div4 = checkDivisibility(n, 4).isDivisible;
    const div2 = checkDivisibility(n, 2).isDivisible;
    const div6 = checkDivisibility(n, 6).isDivisible;
    const actual12 = n % 12 === 0;

    const testA = div3 && div4;
    const testB = div2 && div6;

    resultBox.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.92rem;">
        <div style="background: rgba(255,255,255,0.03); padding: 0.85rem; border-radius: 8px;">
          <strong>Actual Division:</strong> ${n} ÷ 12 = <strong>${Math.floor(n / 12)}</strong> (remainder ${n % 12}) ➔ 
          <span class="status-badge ${actual12 ? 'pass' : 'fail'}">${actual12 ? '✓ Divisible by 12' : '✗ NOT Divisible by 12'}</span>
        </div>

        <div style="background: rgba(16, 185, 129, 0.08); padding: 0.85rem; border-radius: 8px; border-left: 3px solid var(--accent-emerald);">
          <strong>Test A (Co-Prime: 3 and 4):</strong><br>
          • Divisible by 3? ${div3 ? 'Yes' : 'No'}<br>
          • Divisible by 4? ${div4 ? 'Yes' : 'No'}<br>
          Result: <span class="status-badge ${testA ? 'pass' : 'fail'}">${testA ? '✓ Passes Rule' : '✗ Fails Rule'}</span> 
          <span style="color: var(--accent-emerald-light); font-weight: 700; margin-left: 0.5rem;">${testA === actual12 ? '✅ Accurate!' : 'Error'}</span>
        </div>

        <div style="background: rgba(244, 63, 94, 0.08); padding: 0.85rem; border-radius: 8px; border-left: 3px solid var(--accent-rose);">
          <strong>Test B (Shared Factor: 2 and 6):</strong><br>
          • Divisible by 2? ${div2 ? 'Yes' : 'No'}<br>
          • Divisible by 6? ${div6 ? 'Yes' : 'No'}<br>
          Result: <span class="status-badge ${testB ? 'pass' : 'fail'}">${testB ? '✓ Passes Rule' : '✗ Fails Rule'}</span>
          <span style="color: ${testB === actual12 ? 'var(--accent-emerald-light)' : 'var(--accent-rose)'}; font-weight: 700; margin-left: 0.5rem;">
            ${testB === actual12 ? 'Matches by coincidence' : '🚨 FALSE POSITIVE! 2 & 6 failed!'}
          </span>
        </div>
      </div>
    `;
  }

  btn.addEventListener('click', () => {
    playClickSound();
    compareRules();
  });

  compareRules();
}

/* Topic 2 - Module 4: Missing Digit Exam Puzzles */
function renderMissingDigitModule(container) {
  const puzzles = [
    {
      id: 'puz_1',
      label: 'Q1: 62 * 178 ÷ 9',
      template: '62*178',
      divisor: 9,
      source: 'Worksheet 2026-27 (Q III.1)',
      hint: 'Sum of known digits = 6 + 2 + 1 + 7 + 8 = 24. Find digit * so 24 + * is a multiple of 9.'
    },
    {
      id: 'puz_2',
      label: 'Q2: 71 * 2 ÷ 6',
      template: '71*2',
      divisor: 6,
      source: 'CBSE Section III Exam Problem',
      hint: 'Last digit is 2 (even, passes 2). Sum = 7 + 1 + * + 2 = 10 + *. Find smallest * so 10 + * is a multiple of 3.'
    },
    {
      id: 'puz_3',
      label: 'Q3: 5 * 84 ÷ 11',
      template: '5*84',
      divisor: 11,
      source: 'CBSE Section III Exam Problem',
      hint: 'Odd places: 4 + *. Even places: 8 + 5 = 13. Find * so (4 + *) − 13 = 0.'
    },
    {
      id: 'puz_4',
      label: 'Q4: 43 * 6 ÷ 4',
      template: '43*6',
      divisor: 4,
      source: 'CBSE Class 5 Exam Standard',
      hint: 'Last two digits form *6. Find the smallest single digit * so *6 is divisible by 4.'
    },
    {
      id: 'puz_5',
      label: 'Q5: 94 * 2 ÷ 11',
      template: '94*2',
      divisor: 11,
      source: 'CBSE Advanced Exam Problem',
      hint: 'Odd places: 2 + 4 = 6. Even places: * + 9. Difference = (* + 9) − 6 = * + 3. For difference to be 11, * = 8!'
    }
  ];

  let currentPuzzleIdx = 0;
  let selectedCandidate = 0;

  function renderPuzzleBoard() {
    const puz = puzzles[currentPuzzleIdx];
    const solution = solveMissingDigitPuzzle(puz.template, puz.divisor);
    const chars = puz.template.split('');

    container.innerHTML = `
      <div class="missing-digit-wrap">
        <div class="puzzle-picker-row">
          ${puzzles.map((p, idx) => `
            <button class="puzzle-picker-btn ${idx === currentPuzzleIdx ? 'active' : ''}" data-idx="${idx}">
              ${p.label}
            </button>
          `).join('')}
        </div>

        <div class="puzzle-board-card">
          <div class="puzzle-target-header">
            Find the missing digit to make this number divisible by <strong>${puz.divisor}</strong>:
            <div style="font-size: 0.82rem; color: var(--text-dim); margin-top: 0.3rem;">Source: ${puz.source}</div>
          </div>

          <div class="puzzle-digits-display">
            ${chars.map(c => {
              if (c === '*') {
                return `<div class="digit-tile blank-tile" id="blank-tile">${selectedCandidate !== null ? selectedCandidate : '*'}</div>`;
              }
              return `<div class="digit-tile">${c}</div>`;
            }).join('')}
          </div>

          <div class="candidate-digits-picker">
            <div class="candidate-label">Click a candidate digit (0 to 9) to test:</div>
            <div class="candidate-tiles-row">
              ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => `
                <button class="candidate-tile-btn ${d === selectedCandidate ? 'selected' : ''}" data-digit="${d}">
                  ${d}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="puzzle-solution-box" id="puzzle-solution-display">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </div>
    `;

    // Attach puzzle picker listeners
    container.querySelectorAll('.puzzle-picker-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        currentPuzzleIdx = parseInt(btn.getAttribute('data-idx'));
        selectedCandidate = 0;
        renderPuzzleBoard();
      });
    });

    // Attach candidate tile listeners
    container.querySelectorAll('.candidate-tile-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedCandidate = parseInt(btn.getAttribute('data-digit'));
        playClickSound();
        container.querySelectorAll('.candidate-tile-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const blank = container.querySelector('#blank-tile');
        if (blank) blank.textContent = selectedCandidate;
        updateFeedback();
      });
    });

    updateFeedback();
  }

  function updateFeedback() {
    const puz = puzzles[currentPuzzleIdx];
    const solution = solveMissingDigitPuzzle(puz.template, puz.divisor);
    const candidateNum = parseInt(puz.template.replace('*', selectedCandidate.toString()));
    const check = checkDivisibility(candidateNum, puz.divisor);
    const box = container.querySelector('#puzzle-solution-display');
    if (!box) return;

    box.innerHTML = `
      <div style="margin-bottom: 0.6rem;">
        <strong>Testing with digit ${selectedCandidate}:</strong> The number becomes <span class="reason-calc-highlight">${candidateNum.toLocaleString()}</span>.<br>
        <strong>Divisibility check for ${puz.divisor}:</strong> ${check.reason}
      </div>

      <div style="margin-bottom: 0.6rem;">
        <span class="status-badge ${check.isDivisible ? 'pass' : 'fail'}">
          ${check.isDivisible ? `✓ SUCCESS! Digit ${selectedCandidate} works!` : `✗ Digit ${selectedCandidate} leaves remainder`}
        </span>
      </div>

      <div style="background: rgba(255,255,255,0.04); padding: 0.75rem; border-radius: 8px; margin-top: 0.6rem;">
        💡 <strong>Hint & Exam Working:</strong> ${puz.hint}<br>
        🏆 <strong>All Valid Digits:</strong> [${solution.validDigits.join(', ')}]<br>
        ⭐ <strong>Smallest Single Digit (Exam Answer):</strong> <strong style="color: var(--accent-amber-light); font-size: 1.1rem;">${solution.smallestDigit}</strong>
      </div>
    `;

    if (check.isDivisible) {
      playCorrectSound();
    }
  }

  renderPuzzleBoard();
}

/* Topic 2 - Module 5: Rule 11 Hopscotch */
function renderRule11HopscotchModule(container) {
  container.innerHTML = `
    <div class="hopscotch-wrap">
      <div class="calc-card">
        <h4>Hopscotch Interactive Number Inspector</h4>
        <p>Pick a preset number or enter any number to see the alternating odd vs even place digits:</p>
        
        <div class="calc-inputs">
          <div class="calc-inputs-row">
            <input type="number" id="hopscotch-num" class="calc-input" value="1331" min="1" max="99999999" placeholder="Number">
          </div>
          <div class="tester-presets" style="margin-top: 0.5rem;">
            <span style="font-size: 0.8rem; color: var(--text-dim);">Presets:</span>
            <button class="tester-preset-btn" data-val="1331">1,331</button>
            <button class="tester-preset-btn" data-val="9482">9,482</button>
            <button class="tester-preset-btn" data-val="71291">71,291</button>
            <button class="tester-preset-btn" data-val="10857">10,857</button>
            <button class="tester-preset-btn" data-val="65637">65,637</button>
            <button class="tester-preset-btn" data-val="28182">28,182</button>
          </div>
        </div>
      </div>

      <div class="hopscotch-demo-card" id="hopscotch-display-area">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;

  const input = container.querySelector('#hopscotch-num');
  const displayArea = container.querySelector('#hopscotch-display-area');
  const presetBtns = container.querySelectorAll('.tester-preset-btn');

  function updateHopscotch() {
    const val = parseInt(input.value) || 1331;
    const data = getHopscotch11Data(val);

    displayArea.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); font-size: 0.95rem;">
        Counting positions <strong>from right to left</strong>:
      </div>

      <div class="hopscotch-number-strip">
        ${data.positions.map(p => `
          <div class="hopscotch-digit-col">
            <div class="hopscotch-digit-box ${p.isOdd ? 'odd-place' : 'even-place'}">
              ${p.digit}
            </div>
            <span class="hopscotch-pos-label ${p.isOdd ? 'odd' : 'even'}">
              Pos ${p.posFromRight} (${p.isOdd ? 'Odd' : 'Even'})
            </span>
          </div>
        `).join('')}
      </div>

      <div class="hopscotch-calc-cards">
        <div class="hop-calc-card card-odd">
          <span class="hop-card-label">1. Sum of Digits at ODD Places</span>
          <div class="hop-card-val">${data.oddSum}</div>
          <div class="hop-card-sub">[${data.oddDigits.map(d => d.digit).join(' + ')}]</div>
        </div>

        <div class="hop-calc-card card-even">
          <span class="hop-card-label">2. Sum of Digits at EVEN Places</span>
          <div class="hop-card-val">${data.evenSum}</div>
          <div class="hop-card-sub">[${data.evenDigits.map(d => d.digit).join(' + ') || '0'}]</div>
        </div>

        <div class="hop-calc-card card-diff">
          <span class="hop-card-label">3. Absolute Difference</span>
          <div class="hop-card-val">${data.diff}</div>
          <div class="hop-card-sub">|${data.oddSum} − ${data.evenSum}| = ${data.diff}</div>
        </div>
      </div>

      <div class="puzzle-solution-box" style="border-left-color: ${data.isDivisible ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
        <div style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.4rem; color: ${data.isDivisible ? 'var(--accent-emerald-light)' : '#fb7185'};">
          ${data.isDivisible ? '✓ Divisible by 11!' : '✗ NOT Divisible by 11'}
        </div>
        <p style="margin: 0; color: #cbd5e1;">
          ${data.isDivisible
            ? `The difference is <strong>${data.diff}</strong>, which is ${data.diff === 0 ? '0' : 'a multiple of 11 (' + data.diff + ' ÷ 11 = ' + (data.diff / 11) + ')'}. Therefore, <strong>${val.toLocaleString()}</strong> is completely divisible by 11!`
            : `The difference is <strong>${data.diff}</strong>. Since ${data.diff} is neither 0 nor a multiple of 11, <strong>${val.toLocaleString()}</strong> is NOT divisible by 11.`
          }
        </p>
      </div>
    `;
  }

  input.addEventListener('input', updateHopscotch);

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      input.value = btn.getAttribute('data-val');
      updateHopscotch();
    });
  });

  updateHopscotch();
}

/* ==========================================================================
   TOPIC 3 LEARN RENDERERS: EXPRESSIONS & STATEMENTS
   ========================================================================== */

/* Topic 3 - Module 1: Clue Words Dictionary & Trap Matrix */
function renderClueWordsModule(container) {
  let activeFilter = 'all';

  function render() {
    const cats = activeFilter === 'all'
      ? Object.values(CLUE_WORDS_DATA)
      : [CLUE_WORDS_DATA[activeFilter]].filter(Boolean);

    container.innerHTML = `
      <div class="clue-words-wrap">
        <div class="think-callout-math">
          <div class="callout-header">💡 Think About It — The Mystery Box & The Bubble 📦</div>
          <p>In algebra, think of the unknown variable <em>x</em> as a <strong>sealed mystery gift box</strong>. The number outside (like 3 in 3x) tells you how many mystery boxes you have. Brackets (x + 4) are a <strong>protective bubble</strong>: whatever is inside must be grouped together before applying outside operations!</p>
        </div>

        <!-- Sub-filter pills -->
        <div class="filter-pills-bar" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
          <button class="filter-pill-btn ${activeFilter === 'all' ? 'active' : ''}" data-cat="all">🌟 All Operations</button>
          <button class="filter-pill-btn ${activeFilter === 'add' ? 'active' : ''}" data-cat="add">➕ Addition (+)</button>
          <button class="filter-pill-btn ${activeFilter === 'sub' ? 'active' : ''}" data-cat="sub">➖ Subtraction (−)</button>
          <button class="filter-pill-btn ${activeFilter === 'mul' ? 'active' : ''}" data-cat="mul">✖️ Multiplication (×)</button>
          <button class="filter-pill-btn ${activeFilter === 'div' ? 'active' : ''}" data-cat="div">➗ Division (÷)</button>
          <button class="filter-pill-btn ${activeFilter === 'grp' ? 'active' : ''}" data-cat="grp">📦 Parentheses ( )</button>
        </div>

        <!-- Clue Cards Grid -->
        <div class="clue-words-grid">
          ${cats.map(c => `
            <div class="clue-cat-card ${c.cls}">
              <div class="clue-cat-header">
                <h4><span class="clue-cat-sym">${c.symbol}</span> ${c.name}</h4>
              </div>
              <div>
                <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Trigger Clue Words:</span>
                <div class="clue-chip-list" style="margin-top: 0.4rem;">
                  ${c.chips.map(ch => `<span class="clue-chip">${ch}</span>`).join('')}
                </div>
              </div>
              <div class="clue-example-box">
                <span style="color: var(--text-muted); font-size: 0.8rem;">CBSE Example:</span><br>
                <strong>"${c.exampleText}"</strong> ➔ <span style="color: var(--accent-emerald-light); font-weight: 700;">${c.exampleExpr}</span>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-dim); margin: 0; line-height: 1.4;">${c.notes}</p>
            </div>
          `).join('')}
        </div>

        <!-- Exam Trap Alert Card -->
        <div class="trap-alert-card">
          <div class="trap-alert-header">
            <span class="trap-alert-icon">🚨</span>
            <div>
              <div class="trap-alert-title">THE #1 CBSE EXAM TRAP: The Reversal Words</div>
              <p style="margin: 0.2rem 0 0 0; color: #cbd5e1; font-size: 0.88rem;">
                In ordinary English, we read left to right. But in mathematics, words like <strong>"subtracted from"</strong> and <strong>"less than"</strong> FLIP the operands!
              </p>
            </div>
          </div>

          <div class="trap-examples-grid">
            <div class="trap-comp-box">
              <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Statement:</span>
              <div style="font-size: 0.95rem; font-weight: 600; color: #ffffff;">"8 subtracted from x"</div>
              <div class="trap-comp-wrong">✗ Wrong: 8 − x</div>
              <div class="trap-comp-right">✓ Correct: x − 8</div>
              <p style="font-size: 0.8rem; color: #94a3b8; margin: 0.2rem 0 0 0;">
                Reason: 8 is taken AWAY from x, so you had x first!
              </p>
            </div>

            <div class="trap-comp-box">
              <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Statement:</span>
              <div style="font-size: 0.95rem; font-weight: 600; color: #ffffff;">"5 less than 3 times y"</div>
              <div class="trap-comp-wrong">✗ Wrong: 5 − 3y</div>
              <div class="trap-comp-right">✓ Correct: 3y − 5</div>
              <p style="font-size: 0.8rem; color: #94a3b8; margin: 0.2rem 0 0 0;">
                Reason: Start with 3y, then make it 5 less!
              </p>
            </div>

            <div class="trap-comp-box">
              <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Statement:</span>
              <div style="font-size: 0.95rem; font-weight: 600; color: #ffffff;">"Difference between 10 and k"</div>
              <div class="trap-comp-right">✓ Correct: 10 − k</div>
              <p style="font-size: 0.8rem; color: #94a3b8; margin: 0.2rem 0 0 0;">
                Notice: "Difference between A and B" keeps natural order: A − B. Only "subtracted from" and "less than" reverse it!
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.filter-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        activeFilter = btn.getAttribute('data-cat');
        render();
      });
    });
  }

  render();
}

/* Topic 3 - Module 2: Dual-Way Live Expression Translator */
function renderTranslatorModule(container) {
  let subMode = 'stmt_to_math'; // 'stmt_to_math' | 'math_to_stmt'
  let activeStmtPreset = EXPR_PRESETS_STATEMENT_TO_MATH[0].id;
  let activeMathPreset = EXPR_PRESETS_MATH_TO_STATEMENT[0].id;

  function render() {
    container.innerHTML = `
      <div class="translator-box">
        <!-- Mode Switcher -->
        <div class="translator-nav">
          <button class="trans-nav-btn ${subMode === 'stmt_to_math' ? 'active' : ''}" data-mode="stmt_to_math">
            💬 Statement ➔ Expression
          </button>
          <button class="trans-nav-btn ${subMode === 'math_to_stmt' ? 'active' : ''}" data-mode="math_to_stmt">
            🔄 Expression ➔ Statement
          </button>
        </div>

        <div id="translator-dynamic-area"></div>
      </div>
    `;

    container.querySelectorAll('.trans-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        subMode = btn.getAttribute('data-mode');
        render();
      });
    });

    const area = container.querySelector('#translator-dynamic-area');
    if (subMode === 'stmt_to_math') {
      renderStmtToMath(area);
    } else {
      renderMathToStmt(area);
    }
  }

  function renderStmtToMath(area) {
    const item = EXPR_PRESETS_STATEMENT_TO_MATH.find(p => p.id === activeStmtPreset) || EXPR_PRESETS_STATEMENT_TO_MATH[0];

    area.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <!-- Presets Row -->
        <div class="trans-presets-row">
          <span class="trans-presets-label">Choose Preset:</span>
          ${EXPR_PRESETS_STATEMENT_TO_MATH.map(p => `
            <button class="trans-preset-btn ${p.id === activeStmtPreset ? 'active' : ''}" data-pid="${p.id}">
              ${p.statement.length > 25 ? p.statement.substring(0, 24) + '…' : p.statement}
            </button>
          `).join('')}
        </div>

        <!-- Statement Display & Grammar Dissection -->
        <div class="statement-display-card">
          <span class="statement-display-label">Verbal English Statement:</span>
          <div class="statement-display-text">"${item.statement}"</div>
          
          <div style="margin-top: 0.5rem;">
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Grammar Dissection:</span>
            <div class="dissection-chips">
              ${item.dissection.map(d => {
                const cls = d.type === 'var' ? 'chip-var' : d.type === 'op' ? 'chip-op' : d.type === 'grp' ? 'chip-grp' : 'chip-const';
                return `<span class="dissect-chip ${cls}">${d.text} ➔ <strong>${d.role}</strong></span>`;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Math Output Card -->
        <div class="math-output-card">
          <span class="math-output-label">Resulting Mathematical Expression:</span>
          <div class="math-output-expr">${item.expression}</div>
          <div class="math-output-steps">${item.steps}</div>
        </div>
      </div>
    `;

    area.querySelectorAll('.trans-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        activeStmtPreset = btn.getAttribute('data-pid');
        renderStmtToMath(area);
      });
    });
  }

  function renderMathToStmt(area) {
    const item = EXPR_PRESETS_MATH_TO_STATEMENT.find(p => p.id === activeMathPreset) || EXPR_PRESETS_MATH_TO_STATEMENT[0];

    area.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <!-- Presets Row -->
        <div class="trans-presets-row">
          <span class="trans-presets-label">Choose Expression:</span>
          ${EXPR_PRESETS_MATH_TO_STATEMENT.map(p => `
            <button class="trans-preset-btn ${p.id === activeMathPreset ? 'active' : ''}" data-pid="${p.id}">
              ${p.expression}
            </button>
          `).join('')}
        </div>

        <!-- Expression Preview Card -->
        <div class="math-output-card">
          <span class="math-output-label">Mathematical Expression:</span>
          <div class="math-output-expr">${item.expression}</div>
          <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem; flex-wrap: wrap; justify-content: center;">
            <span class="dissect-chip chip-var">Inner Component: <strong>${item.inner}</strong></span>
            <span class="dissect-chip chip-op">Outer Action: <strong>${item.outer}</strong></span>
          </div>
        </div>

        <!-- Phrasings list -->
        <div class="statement-display-card">
          <span class="statement-display-label">Acceptable CBSE Verbal Statement Translations:</span>
          <ol style="margin: 0.5rem 0 0 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; color: #f8fafc; font-size: 0.95rem;">
            ${item.phrasings.map(ph => `<li><strong>${ph}</strong></li>`).join('')}
          </ol>
          <div style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--text-dim);">
            💡 In Class 5 exams, any of these phrasings earn full marks, but the top one is the standard CBSE textbook format.
          </div>
        </div>
      </div>
    `;

    area.querySelectorAll('.trans-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        activeMathPreset = btn.getAttribute('data-pid');
        renderMathToStmt(area);
      });
    });
  }

  render();
}

/* Topic 3 - Module 3: Parentheses Grouping Lab */
function renderParenthesesLabModule(container) {
  let activeDilemmaId = 'd1';
  let varValue = 2;

  function render() {
    const dilemma = DILEMMA_PRESETS.find(d => d.id === activeDilemmaId) || DILEMMA_PRESETS[0];
    const calcA = dilemma.calcA(varValue);
    const calcB = dilemma.calcB(varValue);
    const isEqual = calcA.res === calcB.res;

    container.innerHTML = `
      <div class="parentheses-lab-card">
        <!-- Dilemma Switcher -->
        <div class="lab-dilemma-tabs">
          ${DILEMMA_PRESETS.map(d => `
            <button class="dilemma-tab-btn ${d.id === activeDilemmaId ? 'active' : ''}" data-did="${d.id}">
              ${d.title}
            </button>
          `).join('')}
        </div>

        <!-- Variable Slider Row -->
        <div class="slider-control-bar">
          <label for="lab-var-slider">
            Test Value for Variable <strong>${dilemma.varName}</strong>:
            <span class="var-val-pill" id="var-val-display">${varValue}</span>
          </label>
          <input type="range" id="lab-var-slider" class="lab-slider-input" min="1" max="10" value="${varValue}">
        </div>

        <!-- Side-by-Side Comparison Cards -->
        <div class="lab-compare-grid">
          <!-- WITH BRACKETS -->
          <div class="lab-side-card with-brackets">
            <div class="lab-side-header">
              <span class="lab-side-badge">With Brackets (Parentheses)</span>
              <span style="font-size: 0.8rem; color: var(--accent-emerald-light); font-weight: 700;">Bracket First!</span>
            </div>
            <div class="lab-expr-large" style="color: var(--accent-emerald-light);">${dilemma.exprA}</div>
            
            <div class="lab-calc-result-box">
              <div><strong>Step 1:</strong> ${calcA.step1}</div>
              <div style="margin-top: 0.25rem;"><strong>Step 2:</strong> ${calcA.step2}</div>
              <div style="margin-top: 0.5rem; font-size: 1.15rem; font-weight: 800; color: var(--accent-emerald-light);">
                Value = ${calcA.res}
              </div>
            </div>
          </div>

          <!-- WITHOUT BRACKETS -->
          <div class="lab-side-card without-brackets">
            <div class="lab-side-header">
              <span class="lab-side-badge">Without Brackets</span>
              <span style="font-size: 0.8rem; color: #fda4af; font-weight: 700;">BODMAS Standard</span>
            </div>
            <div class="lab-expr-large" style="color: #fda4af;">${dilemma.exprB}</div>
            
            <div class="lab-calc-result-box">
              <div><strong>Step 1:</strong> ${calcB.step1}</div>
              <div style="margin-top: 0.25rem;"><strong>Step 2:</strong> ${calcB.step2}</div>
              <div style="margin-top: 0.5rem; font-size: 1.15rem; font-weight: 800; color: #fda4af;">
                Value = ${calcB.res}
              </div>
            </div>
          </div>
        </div>

        <!-- Live Verdict Banner -->
        <div class="statement-display-card" style="border-left: 4px solid var(--accent-amber);">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.3rem;">⚖️</span>
            <div style="font-weight: 700; font-size: 1.05rem; color: #f8fafc;">
              Result Comparison for ${dilemma.varName} = ${varValue}:
              <span style="color: ${isEqual ? 'var(--accent-emerald-light)' : '#f87171'}; margin-left: 0.35rem;">
                ${calcA.res} ${isEqual ? '==' : '≠'} ${calcB.res} (${isEqual ? 'Equal' : 'NOT EQUAL!'})
              </span>
            </div>
          </div>
          <p style="margin: 0.5rem 0 0 0; color: #cbd5e1; font-size: 0.88rem; line-height: 1.5;">
            ${dilemma.reason}
          </p>
        </div>
      </div>
    `;

    container.querySelectorAll('.dilemma-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        activeDilemmaId = btn.getAttribute('data-did');
        const newDilemma = DILEMMA_PRESETS.find(d => d.id === activeDilemmaId);
        varValue = newDilemma ? newDilemma.defaultVal : 2;
        render();
      });
    });

    const slider = container.querySelector('#lab-var-slider');
    if (slider) {
      slider.addEventListener('input', (e) => {
        varValue = parseInt(e.target.value) || 2;
        render();
      });
    }
  }

  render();
}

/* Topic 3 - Module 4: Real-Life Situation Modeler */
function renderRealWorldModule(container) {
  container.innerHTML = `
    <div class="real-world-wrap">
      <div style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0.5rem;">
        In Class 5 word problems, the question describes a real-life situation and asks you to <strong>write an algebraic expression</strong>. Here are the 4 classic CBSE patterns:
      </div>

      <div class="real-world-grid">
        ${REAL_WORLD_PRESETS.map(p => `
          <div class="real-world-card">
            <h4>${p.category}</h4>
            <div class="rw-story-box">
              <strong>Context:</strong> "${p.story}"
            </div>
            
            <div style="font-size: 0.85rem; color: var(--accent-amber-light);">
              ${p.variableDecl}
            </div>

            <div class="rw-derivation">
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Step-by-step Formation:</span>
              ${p.derivation.map(s => `
                <div class="rw-step-row">
                  <span>${s.step}:</span>
                  <strong>${s.expr}</strong>
                </div>
              `).join('')}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.4rem;">
              <span style="font-size: 0.85rem; color: var(--text-muted);">Expression:</span>
              <span class="rw-expr-pill">${p.finalExpr}</span>
            </div>

            <div style="background: rgba(0, 0, 0, 0.2); border-radius: var(--radius-sm); padding: 0.5rem 0.75rem; font-size: 0.8rem; color: #94a3b8; line-height: 1.4;">
              🔍 <strong>Check:</strong> ${p.testScenario}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ==========================================================================
   TOPIC 4 LEARN RENDERERS: NUMBER PATTERNS
   ========================================================================== */

/* Topic 4 - Module 1: Pattern Detective */
function renderPatternDetectiveModule(container) {
  let activePresetId = PATTERN_PRESETS[0].id;
  let solved = false;
  let chosenAnswer = null;

  function render() {
    const p = PATTERN_PRESETS.find(item => item.id === activePresetId) || PATTERN_PRESETS[0];

    container.innerHTML = `
      <div class="pattern-board">
        <div class="think-callout-math">
          <div class="callout-header">💡 Think About It — The Gap Detective 🔍</div>
          <p>Every number sequence has a hidden clockwork rule! First calculate the gap between term 1 and term 2, then between term 2 and term 3. If the gap stays constant (+3, +3), it is an additive step. If the gap is multiplying (&times;2, &times;2), it is geometric. If the gap itself grows (+1, +2, +3), it is a triangular pattern!</p>
        </div>

        <!-- Preset Selector -->
        <div class="trans-presets-row">
          <span class="trans-presets-label">Choose Pattern:</span>
          ${PATTERN_PRESETS.map(item => `
            <button class="trans-preset-btn ${item.id === activePresetId ? 'active' : ''}" data-pid="${item.id}">
              ${item.title}
            </button>
          `).join('')}
        </div>

        <!-- Pattern Display Strip -->
        <div class="pattern-seq-strip">
          ${p.terms.map((term, idx) => {
            const isMissing = idx === p.missingIndex;
            const diff = idx < p.diffs.length ? p.diffs[idx] : null;
            const displayText = isMissing ? (solved ? p.correctAnswer : '?') : term;
            const isLong = String(displayText).length > 4;

            return `
              <div class="seq-item-wrap">
                <div class="seq-tile ${isMissing ? (solved ? 'seq-known' : 'seq-mystery') : 'seq-known'} ${isLong ? 'seq-tile-wide' : ''}" style="${isMissing && solved ? 'border-color: var(--accent-emerald); color: var(--accent-emerald-light);' : ''} ${isLong ? 'min-width: 96px; padding: 0 1.1rem; font-size: 1.15rem;' : ''}">
                  ${displayText}
                </div>
                ${diff ? `<span class="seq-diff-badge">${diff}</span>` : ''}
              </div>
            `;
          }).join('')}
        </div>

        <!-- Mystery Candidate Buttons -->
        <div style="text-align: center; margin-top: 0.5rem;">
          <span style="font-size: 0.88rem; color: var(--text-muted); font-weight: 600;">
            ${solved ? '🎉 Excellent Deduction!' : 'What number replaces the mystery (?) tile?'}
          </span>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-top: 0.6rem;">
            ${p.options.map(opt => {
              const isCorrect = opt === p.correctAnswer;
              const isChosen = chosenAnswer === opt;
              let btnClass = 'candidate-tile-btn';
              if (solved && isCorrect) btnClass += ' active-match';
              if (!solved && isChosen && !isCorrect) btnClass += ' wrong-match';
              const isLongOpt = String(opt).length > 4;

              return `
                <button class="${btnClass}" data-opt="${opt}" style="${isLongOpt ? 'min-width: 90px; padding: 0.4rem 1.1rem; font-size: 1.1rem;' : 'min-width: 56px; height: 48px; font-size: 1.25rem;'}">
                  ${opt}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Rule Explanation Card -->
        <div class="rule-explain-box">
          <div style="font-weight: 700; color: var(--accent-emerald-light); font-size: 1.05rem; margin-bottom: 0.35rem;">
            🔍 ${p.rule}
          </div>
          <p style="margin: 0; color: #cbd5e1; font-size: 0.88rem;">
            ${p.explanation}
          </p>
        </div>
        <!-- Special Section: 3-Number Set (Triplets) Masterclass -->
        <div style="margin-top: 1.5rem; background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: var(--radius-md, 12px); padding: 1.25rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
            <div style="font-weight: 700; color: #a5b4fc; font-size: 1.05rem;">
              🧩 3-Number Set Patterns (Triplets) Detective
            </div>
            <span class="badge badge-active" style="background: rgba(99, 102, 241, 0.2); color: #c7d2fe; border: 1px solid rgba(99, 102, 241, 0.4);">Exam Favorite</span>
          </div>
          <p style="font-size: 0.88rem; color: #e2e8f0; margin-bottom: 1rem; line-height: 1.5;">
            When you see a pattern grouped into sets of 3 numbers like <code>1, 2, 3; 2, 3, 6; 3, 4, 12; ____; ____</code>, <strong>break it down into 3 separate parallel tracks</strong>:
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
            <!-- Rule A: Doubling 3rd Number -->
            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 1rem;">
              <div style="font-weight: 700; color: var(--accent-amber-light); font-size: 0.95rem; margin-bottom: 0.5rem;">
                Rule 1: Doubling 3rd Number (Geometric)
              </div>
              <div style="font-family: monospace; background: rgba(0,0,0,0.3); padding: 0.5rem; border-radius: 6px; font-size: 0.9rem; color: #fef08a; margin-bottom: 0.6rem;">
                1, 2, <strong>3</strong> ; 2, 3, <strong>6</strong> ; 3, 4, <strong>12</strong> ; <u>4, 5, <strong>24</strong></u> ; <u>5, 6, <strong>48</strong></u>
              </div>
              <ul style="font-size: 0.82rem; color: #94a3b8; margin: 0; padding-left: 1.2rem; line-height: 1.45;">
                <li><strong>1st number:</strong> Increases by +1 (1 &rarr; 2 &rarr; 3 &rarr; <strong>4</strong> &rarr; <strong>5</strong>)</li>
                <li><strong>2nd number:</strong> Increases by +1 (2 &rarr; 3 &rarr; 4 &rarr; <strong>5</strong> &rarr; <strong>6</strong>)</li>
                <li><strong>3rd number:</strong> Doubles (&times;2) each step: 3 &rarr; 6 &rarr; 12 &rarr; <strong>24</strong> &rarr; <strong>48</strong>!</li>
              </ul>
            </div>

            <!-- Rule B: Product of First Two -->
            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 1rem;">
              <div style="font-weight: 700; color: var(--accent-emerald-light); font-size: 0.95rem; margin-bottom: 0.5rem;">
                Rule 2: Product of First Two [a, b, a &times; b]
              </div>
              <div style="font-family: monospace; background: rgba(0,0,0,0.3); padding: 0.5rem; border-radius: 6px; font-size: 0.9rem; color: #86efac; margin-bottom: 0.6rem;">
                1, 2, <strong>2</strong> ; 2, 3, <strong>6</strong> ; 3, 4, <strong>12</strong> ; <u>4, 5, <strong>20</strong></u> ; <u>5, 6, <strong>30</strong></u>
              </div>
              <ul style="font-size: 0.82rem; color: #94a3b8; margin: 0; padding-left: 1.2rem; line-height: 1.45;">
                <li>1 &times; 2 = <strong>2</strong></li>
                <li>2 &times; 3 = <strong>6</strong></li>
                <li>3 &times; 4 = <strong>12</strong></li>
                <li>4 &times; 5 = <strong>20</strong>, and 5 &times; 6 = <strong>30</strong>!</li>
              </ul>
            </div>

            <!-- Rule C: 3rd Number is 1st Number × 3 -->
            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 1rem;">
              <div style="font-weight: 700; color: #60a5fa; font-size: 0.95rem; margin-bottom: 0.5rem;">
                Rule 3: 3rd Number = 1st Number &times; 3 [n, n+1, 3n]
              </div>
              <div style="font-family: monospace; background: rgba(0,0,0,0.3); padding: 0.5rem; border-radius: 6px; font-size: 0.9rem; color: #93c5fd; margin-bottom: 0.6rem;">
                1, 2, <strong>3</strong> ; 2, 3, <strong>6</strong> ; 3, 4, <strong>9</strong> ; <u>4, 5, <strong>12</strong></u> ; <u>5, 6, <strong>15</strong></u>
              </div>
              <ul style="font-size: 0.82rem; color: #94a3b8; margin: 0; padding-left: 1.2rem; line-height: 1.45;">
                <li><strong>1st number:</strong> Increases by +1 (1 &rarr; 2 &rarr; 3 &rarr; <strong>4</strong> &rarr; <strong>5</strong>)</li>
                <li><strong>2nd number:</strong> Increases by +1 (2 &rarr; 3 &rarr; 4 &rarr; <strong>5</strong> &rarr; <strong>6</strong>)</li>
                <li><strong>3rd number:</strong> 1st number multiplied by 3: 1 &times; 3 = <strong>3</strong>, 2 &times; 3 = <strong>6</strong>, 3 &times; 3 = <strong>9</strong>, 4 &times; 3 = <strong>12</strong>, 5 &times; 3 = <strong>15</strong>!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.trans-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        activePresetId = btn.getAttribute('data-pid');
        solved = false;
        chosenAnswer = null;
        render();
      });
    });

    container.querySelectorAll('.candidate-tile-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const raw = btn.getAttribute('data-opt');
        const val = isNaN(Number(raw)) ? raw : Number(raw);
        chosenAnswer = val;
        if (val === p.correctAnswer || String(val) === String(p.correctAnswer)) {
          playCorrectSound();
          launchConfetti();
          solved = true;
        } else {
          playWrongSound();
        }
        render();
      });
    });
  }

  render();
}

/* Topic 4 - Module 2: Geometric Numbers (Triangular & Square Dots) */
function renderTriangularSquareModule(container) {
  let activeTriN = 4; // 1 to 6
  let activeSqN = 4;  // 1 to 6

  function render() {
    const tri = TRIANGULAR_NUMBERS_DATA.find(t => t.n === activeTriN) || TRIANGULAR_NUMBERS_DATA[3];
    const sq = SQUARE_NUMBERS_DATA.find(s => s.n === activeSqN) || SQUARE_NUMBERS_DATA[3];

    // Build triangular dot rows (row 1 has 1, row 2 has 2, ..., row n has n)
    const triRows = [];
    for (let r = 1; r <= activeTriN; r++) {
      triRows.push(Array(r).fill(0));
    }

    container.innerHTML = `
      <div class="geom-numbers-wrap">
        <div style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0.5rem;">
          In Class 5 CBSE, numbers that can be arranged in geometric shapes have special names: <strong>Triangular Numbers</strong> and <strong>Square Numbers</strong>!
        </div>

        <div class="geom-numbers-grid">
          <!-- TRIANGULAR NUMBERS CARD -->
          <div class="geom-number-card geom-card-tri">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4 style="margin: 0; color: var(--accent-amber-light);">🔺 Triangular Number T<sub>${activeTriN}</sub> = ${tri.val}</h4>
              <span class="badge badge-active">n = ${activeTriN}</span>
            </div>

            <!-- Selector Buttons -->
            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
              <span style="font-size: 0.78rem; color: var(--text-muted); align-self: center;">Select n:</span>
              ${[1, 2, 3, 4, 5, 6].map(n => `
                <button class="trans-preset-btn ${n === activeTriN ? 'active' : ''}" data-tri="${n}">
                  T<sub>${n}</sub> (${TRIANGULAR_NUMBERS_DATA[n-1].val})
                </button>
              `).join('')}
            </div>

            <!-- Dot Pyramid Canvas -->
            <div class="dot-canvas-wrap">
              <div style="display: flex; flex-direction: column; align-items: center;">
                ${triRows.map(row => `
                  <div class="dot-triangle-row">
                    ${row.map(() => `<span class="dot-particle"></span>`).join('')}
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="clue-example-box" style="border-left-color: var(--accent-amber);">
              <strong>Sum of consecutive natural numbers:</strong><br>
              ${tri.sumText}
            </div>

            <div style="background: rgba(0, 0, 0, 0.25); border-radius: var(--radius-sm); padding: 0.75rem; font-size: 0.82rem; color: #cbd5e1; line-height: 1.4;">
              ✨ <strong>CBSE Magic Theorem:</strong> Any two consecutive triangular numbers sum to a SQUARE number!<br>
              For example: <strong>T<sub>3</sub> (6) + T<sub>4</sub> (10) = 16 = 4²</strong>!
            </div>
          </div>

          <!-- SQUARE NUMBERS CARD -->
          <div class="geom-number-card geom-card-sq">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4 style="margin: 0; color: var(--accent-emerald-light);">🟩 Square Number ${activeSqN}² = ${sq.val}</h4>
              <span class="badge badge-active">n = ${activeSqN}</span>
            </div>

            <!-- Selector Buttons -->
            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
              <span style="font-size: 0.78rem; color: var(--text-muted); align-self: center;">Select n:</span>
              ${[1, 2, 3, 4, 5, 6].map(n => `
                <button class="trans-preset-btn ${n === activeSqN ? 'active' : ''}" data-sq="${n}">
                  ${n}² (${n * n})
                </button>
              `).join('')}
            </div>

            <!-- Dot Square Grid -->
            <div class="dot-canvas-wrap">
              <div class="dot-sq-grid" style="grid-template-columns: repeat(${activeSqN}, 14px);">
                ${Array(activeSqN * activeSqN).fill(0).map(() => `<span class="dot-particle dot-sq"></span>`).join('')}
              </div>
            </div>

            <div class="clue-example-box" style="border-left-color: var(--accent-emerald);">
              <strong>Sum of First ${activeSqN} Consecutive Odd Numbers:</strong><br>
              ${sq.oddSum}
            </div>

            <div style="background: rgba(0, 0, 0, 0.25); border-radius: var(--radius-sm); padding: 0.75rem; font-size: 0.82rem; color: #cbd5e1; line-height: 1.4;">
              ✨ <strong>CBSE Magic Theorem:</strong> The sum of the first <em>n</em> odd numbers is always equal to <strong>n²</strong>!
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('[data-tri]').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        activeTriN = parseInt(btn.getAttribute('data-tri')) || 4;
        render();
      });
    });

    container.querySelectorAll('[data-sq]').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        activeSqN = parseInt(btn.getAttribute('data-sq')) || 4;
        render();
      });
    });
  }

  render();
}

/* Topic 4 - Module 3: Number Towers (Pyramids) */
function renderNumberTowersModule(container) {
  let currentBase = [10, 20, 30];

  function render() {
    const tower = buildNumberTower(currentBase);

    container.innerHTML = `
      <div class="number-tower-wrap">
        <!-- Presets Row -->
        <div class="trans-presets-row" style="margin-bottom: 0.75rem;">
          <span class="trans-presets-label">Presets:</span>
          <button class="trans-preset-btn ${currentBase.join(',') === '10,20,30' ? 'active' : ''}" data-tower="10,20,30">[10, 20, 30]</button>
          <button class="trans-preset-btn ${currentBase.join(',') === '5,15,25' ? 'active' : ''}" data-tower="5,15,25">[5, 15, 25]</button>
          <button class="trans-preset-btn ${currentBase.join(',') === '7,8,9' ? 'active' : ''}" data-tower="7,8,9">[7, 8, 9]</button>
          <button class="trans-preset-btn ${currentBase.join(',') === '1,2,3,4' ? 'active' : ''}" data-tower="1,2,3,4">[1, 2, 3, 4] (4-Level)</button>
        </div>

        <!-- Interactive Tower Visualization -->
        <div class="tower-container">
          ${tower.slice().reverse().map((row, rowIdx) => {
            const isTop = row.length === 1;
            const isBase = row.length === currentBase.length;
            const blockClass = isTop ? 'top-block' : isBase ? 'base-block' : 'mid-block';

            return `
              <div class="tower-row">
                ${row.map(val => `
                  <div class="tower-block ${blockClass}">
                    ${val}
                  </div>
                `).join('')}
              </div>
            `;
          }).join('')}
        </div>

        <!-- Rule and Working Explanation -->
        <div class="rule-explain-box" style="margin-top: 1rem;">
          <div style="font-weight: 700; color: var(--accent-emerald-light); font-size: 1.05rem; margin-bottom: 0.4rem;">
            🏰 The Number Tower Rule: Block = Sum of Two Blocks Beneath
          </div>
          <p style="margin: 0; color: #cbd5e1; font-size: 0.88rem; line-height: 1.5;">
            ${currentBase.length === 3 ? `
              • <strong>Middle row:</strong> ${currentBase[0]} + ${currentBase[1]} = <strong>${currentBase[0] + currentBase[1]}</strong>, and ${currentBase[1]} + ${currentBase[2]} = <strong>${currentBase[1] + currentBase[2]}</strong>.<br>
              • <strong>Top block:</strong> ${currentBase[0] + currentBase[1]} + ${currentBase[1] + currentBase[2]} = <strong>${tower[tower.length-1][0]}</strong>.<br>
              💡 Notice that the middle base block (<strong>${currentBase[1]}</strong>) contributes to BOTH branches, so it is counted TWICE: <code>${currentBase[0]} + 2(${currentBase[1]}) + ${currentBase[2]} = ${tower[tower.length-1][0]}</code>!
            ` : `
              Each block is formed by adding the two adjacent blocks directly under it. The addition bubbles all the way to the top summit block!
            `}
          </p>
        </div>
      </div>
    `;

    container.querySelectorAll('[data-tower]').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        const str = btn.getAttribute('data-tower');
        currentBase = str.split(',').map(Number);
        render();
      });
    });
  }

  render();
}

/* Topic 4 - Module 4: Magic Shapes & Palindromes */
function renderMagicShapesModule(container) {
  let activePalNum = 43;

  function render() {
    const palData = computePalindromeSteps(activePalNum);

    container.innerHTML = `
      <div class="magic-shapes-wrap">
        <div style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0.5rem;">
          Two of the most delightful topics in the NCERT Class 5 syllabus: <strong>The 3×3 Magic Square</strong> and <strong>Palindromic Special Numbers</strong>!
        </div>

        <div class="geom-numbers-grid">
          <!-- 3x3 MAGIC SQUARE CARD -->
          <div class="geom-number-card geom-card-tri">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4 style="margin: 0; color: var(--accent-amber-light);">✨ 3×3 Magic Square (Sum = 15)</h4>
              <span class="badge badge-active">Constant: 15</span>
            </div>

            <!-- 3x3 Grid -->
            <div class="magic-grid-3x3">
              <div class="magic-cell">8</div>
              <div class="magic-cell">1</div>
              <div class="magic-cell">6</div>
              <div class="magic-cell">3</div>
              <div class="magic-cell center-cell">5</div>
              <div class="magic-cell">7</div>
              <div class="magic-cell">4</div>
              <div class="magic-cell">9</div>
              <div class="magic-cell">2</div>
            </div>

            <!-- Sums Verification Legend -->
            <div class="magic-sums-legend">
              <span class="seq-diff-badge">Row 1: 8+1+6 = 15</span>
              <span class="seq-diff-badge">Row 2: 3+5+7 = 15</span>
              <span class="seq-diff-badge">Row 3: 4+9+2 = 15</span>
              <span class="seq-diff-badge">Col 1: 8+3+4 = 15</span>
              <span class="seq-diff-badge">Diagonal: 8+5+2 = 15</span>
            </div>

            <div style="background: rgba(0, 0, 0, 0.25); border-radius: var(--radius-sm); padding: 0.75rem; font-size: 0.82rem; color: #cbd5e1; line-height: 1.4;">
              💡 <strong>Why 5 is in the center:</strong> Digits 1 to 9 add up to 45. There are 3 rows, so 45 ÷ 3 = 15. The center cell is used in 4 different lines, so it must be the exact median digit (5)!
            </div>
          </div>

          <!-- PALINDROMIC SPECIAL NUMBERS CARD -->
          <div class="geom-number-card geom-card-sq">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4 style="margin: 0; color: var(--accent-emerald-light);">🔄 Special Numbers (Palindromes)</h4>
              <span class="badge badge-active">Reverse & Add</span>
            </div>

            <div class="trans-presets-row" style="margin: 0.25rem 0;">
              <span class="trans-presets-label">Test Number:</span>
              <button class="trans-preset-btn ${activePalNum === 43 ? 'active' : ''}" data-pal="43">43 (1 step)</button>
              <button class="trans-preset-btn ${activePalNum === 28 ? 'active' : ''}" data-pal="28">28 (2 steps)</button>
              <button class="trans-preset-btn ${activePalNum === 78 ? 'active' : ''}" data-pal="78">78 (4 steps)</button>
            </div>

            <!-- Step by Step Palindrome Card -->
            <div class="palindrome-step-card">
              <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">
                Algorithm Steps to Palindrome:
              </span>
              ${palData.steps.map((s, idx) => `
                <div class="palindrome-math-row">
                  <span style="color: var(--accent-amber-light);">Step ${idx + 1}:</span>
                  <span>${s.original} + ${s.reversed} =</span>
                  <strong style="color: ${s.isPalindrome ? 'var(--accent-emerald-light)' : '#ffffff'};">${s.sum}</strong>
                  ${s.isPalindrome ? '<span class="badge badge-active" style="padding: 2px 6px; font-size: 0.7rem;">✓ Special Palindrome!</span>' : ''}
                </div>
              `).join('')}
            </div>

            <div style="background: rgba(0, 0, 0, 0.25); border-radius: var(--radius-sm); padding: 0.75rem; font-size: 0.82rem; color: #cbd5e1; line-height: 1.4;">
              📖 <strong>NCERT Definition:</strong> Special numbers read the same from left-to-right as right-to-left. <strong>${palData.final}</strong> reads the same backwards and forwards!
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('[data-pal]').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        activePalNum = parseInt(btn.getAttribute('data-pal')) || 43;
        render();
      });
    });
  }

  render();
}

/* ==========================================================================
   TOPIC 5: GEOMETRY LEARN MODULE RENDERERS
   ========================================================================== */

/* Topic 5 - Module 1: Basic Geometric Concepts (Point, Line, Segment, Ray) */
function renderGeomFoundationsModule(container) {
  let activeFigId = 'line_segment';
  let isCollinear = true;

  function render() {
    const activeFig = GEOMETRY_FOUNDATIONS.find(f => f.id === activeFigId) || GEOMETRY_FOUNDATIONS[2];

    container.innerHTML = `
      <div class="learn-container">
        <!-- Interactive Concept Selector -->
        <div class="learn-card">
          <div class="learn-card-header">
            <div>
              <h3>📍 Geometric Foundations: Point, Line, Segment & Ray</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                Explore the 4 core building blocks of geometry, their symbols, and measurable properties
              </p>
            </div>
          </div>

          <!-- Selector Pills -->
          <div class="learn-subnav" style="margin: 0.75rem 0 1.25rem 0;">
            ${GEOMETRY_FOUNDATIONS.map(f => `
              <button class="learn-pill ${f.id === activeFigId ? 'active' : ''}" data-fig="${f.id}">
                ${f.name}
              </button>
            `).join('')}
          </div>

          <!-- Active Concept Spotlight Card -->
          <div class="geom-canvas-box" style="margin-bottom: 1.25rem;">
            ${activeFig.svg}
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
            <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-md); padding: 1rem;">
              <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Symbol Notation:</span>
              <div class="geom-notation-badge" style="margin-top: 0.35rem;">${activeFig.symbolHtml}</div>
            </div>
            <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-md); padding: 1rem;">
              <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Number of Endpoints:</span>
              <div style="font-size: 1.1rem; font-weight: 800; color: #ffffff; margin-top: 0.35rem;">${activeFig.endpoints}</div>
            </div>
            <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-md); padding: 1rem;">
              <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Can Measure with Ruler?</span>
              <div style="font-size: 1.1rem; font-weight: 800; color: ${activeFig.id === 'line_segment' ? 'var(--accent-emerald-light)' : '#f87171'}; margin-top: 0.35rem;">
                ${activeFig.measurable}
              </div>
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.04); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem;">
            <p style="font-size: 0.95rem; color: #f1f5f9; line-height: 1.5; margin-bottom: 0.5rem;">
              ${activeFig.desc}
            </p>
            <p style="font-size: 0.85rem; color: var(--accent-amber-light);">
              🌍 <strong>Real-Life Examples:</strong> ${activeFig.realLife}
            </p>
          </div>

          <!-- CBSE Trap Alert -->
          <div style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; color: #fca5a5; font-weight: 700; margin-bottom: 0.35rem;">
              <span>🚨 CBSE EXAM TRAP:</span> Why Ray AB ≠ Ray BA!
            </div>
            <p style="font-size: 0.85rem; color: #e2e8f0; line-height: 1.45;">
              For a ray, the <strong>first letter is always the fixed starting point (origin)</strong>!
              <br>• <strong>Ray AB (<span style="border-top:2px solid;">→</span> AB)</strong> starts at point A and shoots forever through B.
              <br>• <strong>Ray BA (<span style="border-top:2px solid;">→</span> BA)</strong> starts at point B and shoots forever through A in the opposite direction.
              <br>They travel in completely different directions with different origins, so they are <strong>NOT the same ray</strong>!
            </p>
          </div>
        </div>

        <!-- Collinear vs Non-Collinear Interactive Studio -->
        <div class="learn-card" style="margin-top: 1.5rem;">
          <div class="learn-card-header">
            <div>
              <h3>📏 Collinear vs Non-Collinear Points</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                3 or more points lying on the exact same straight line are collinear
              </p>
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 1rem;">
            <button class="btn ${isCollinear ? 'btn-primary' : 'btn-outline'}" id="btn-collinear">
              ✓ Points in a Straight Line (Collinear)
            </button>
            <button class="btn ${!isCollinear ? 'btn-primary' : 'btn-outline'}" id="btn-non-collinear">
              ✗ Points Scattered (Non-Collinear)
            </button>
          </div>

          <div class="geom-canvas-box" style="margin-bottom: 1rem;">
            ${isCollinear ? `
              <svg width="280" height="120" viewBox="0 0 280 120">
                <line x1="20" y1="60" x2="260" y2="60" stroke="#10b981" stroke-width="3" stroke-dasharray="0" />
                <circle cx="60" cy="60" r="5" fill="#f59e0b" />
                <text x="55" y="45" fill="#ffffff" font-size="14" font-weight="bold">A</text>
                <circle cx="140" cy="60" r="5" fill="#f59e0b" />
                <text x="135" y="45" fill="#ffffff" font-size="14" font-weight="bold">B</text>
                <circle cx="220" cy="60" r="5" fill="#f59e0b" />
                <text x="215" y="45" fill="#ffffff" font-size="14" font-weight="bold">C</text>
                <text x="75" y="95" fill="#34d399" font-size="13" font-weight="bold">Single straight line passes through all 3 points!</text>
              </svg>
            ` : `
              <svg width="280" height="120" viewBox="0 0 280 120">
                <!-- Triangle formed by non-collinear points -->
                <polygon points="60,85 140,25 220,85" fill="rgba(239,68,68,0.12)" stroke="#f87171" stroke-width="2" stroke-dasharray="4,4" />
                <circle cx="60" cy="85" r="5" fill="#f59e0b" />
                <text x="45" y="90" fill="#ffffff" font-size="14" font-weight="bold">A</text>
                <circle cx="140" cy="25" r="5" fill="#f59e0b" />
                <text x="135" y="15" fill="#ffffff" font-size="14" font-weight="bold">B</text>
                <circle cx="220" cy="85" r="5" fill="#f59e0b" />
                <text x="230" y="90" fill="#ffffff" font-size="14" font-weight="bold">C</text>
                <text x="45" y="115" fill="#f87171" font-size="13" font-weight="bold">No single straight line can pass through all 3 points!</text>
              </svg>
            `}
          </div>

          <div style="background: rgba(0,0,0,0.25); border-radius: var(--radius-sm); padding: 0.75rem; font-size: 0.85rem; color: #cbd5e1;">
            📖 <strong>Key Rule:</strong> 3 or more points are <strong>collinear</strong> if they lie on a single straight line. If they do not lie on the same straight line, they are <strong>non-collinear</strong> and form a triangle!
          </div>
        </div>

        <!-- Master Comparison Table -->
        <div class="learn-card" style="margin-top: 1.5rem;">
          <div class="learn-card-header">
            <div>
              <h3>📊 Quick Comparison: Point vs Line vs Segment vs Ray</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                Summary table frequently tested in CBSE Class 5 exams
              </p>
            </div>
          </div>

          <table class="geom-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Point</th>
                <th>Line</th>
                <th>Line Segment</th>
                <th>Ray</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Endpoints</strong></td>
                <td>0 endpoints</td>
                <td>0 endpoints</td>
                <td><strong style="color: var(--accent-amber-light);">2 fixed endpoints</strong></td>
                <td>1 starting origin</td>
              </tr>
              <tr>
                <td><strong>Definite Length?</strong></td>
                <td>No (0 size)</td>
                <td>No (Infinite both ways)</td>
                <td><strong style="color: var(--accent-emerald-light);">Yes (Definite length)</strong></td>
                <td>No (Infinite one way)</td>
              </tr>
              <tr>
                <td><strong>Measurable with Ruler?</strong></td>
                <td>❌ No</td>
                <td>❌ No</td>
                <td><strong style="color: var(--accent-emerald-light);">✓ Yes!</strong></td>
                <td>❌ No</td>
              </tr>
              <tr>
                <td><strong>Symbol Notation</strong></td>
                <td>• P</td>
                <td><span style="border-top:2px solid;">↔</span> AB</td>
                <td><span style="text-decoration:overline;">AB</span></td>
                <td><span style="border-top:2px solid;">→</span> AB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.querySelectorAll('[data-fig]').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        activeFigId = btn.getAttribute('data-fig');
        render();
      });
    });

    const btnCol = container.querySelector('#btn-collinear');
    const btnNonCol = container.querySelector('#btn-non-collinear');
    if (btnCol) {
      btnCol.addEventListener('click', () => {
        playClickSound();
        isCollinear = true;
        render();
      });
    }
    if (btnNonCol) {
      btnNonCol.addEventListener('click', () => {
        playClickSound();
        isCollinear = false;
        render();
      });
    }
  }

  render();
}

/* Topic 5 - Module 2: Line Relationships (Parallel, Perpendicular, Intersecting, Concurrent) */
function renderLineRelationshipsModule(container) {
  let activeRelId = 'parallel';
  let quizAnswered = false;
  let quizResult = null;

  function render() {
    const rel = LINE_RELATIONSHIPS_DATA.find(r => r.id === activeRelId) || LINE_RELATIONSHIPS_DATA[1];

    container.innerHTML = `
      <div class="learn-container">
        <div class="learn-card">
          <div class="learn-card-header">
            <div>
              <h3>🛤️ Line Relationships in a Plane</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                Intersecting, Parallel (∥), Perpendicular (⊥), and Concurrent Lines
              </p>
            </div>
          </div>

          <!-- Selector Pills -->
          <div class="learn-subnav" style="margin: 0.75rem 0 1.25rem 0;">
            ${LINE_RELATIONSHIPS_DATA.map(r => `
              <button class="learn-pill ${r.id === activeRelId ? 'active' : ''}" data-rel="${r.id}">
                ${r.title}
              </button>
            `).join('')}
          </div>

          <!-- Visual Canvas Box -->
          <div class="geom-canvas-box" style="margin-bottom: 1.25rem;">
            ${rel.svg}
          </div>

          <!-- Property & Notation Strip -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
            <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-md); padding: 1rem;">
              <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Mathematical Symbol:</span>
              <div class="geom-notation-badge" style="margin-top: 0.35rem;">${rel.symbol}</div>
            </div>
            <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-md); padding: 1rem;">
              <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Key Rule:</span>
              <div style="font-size: 0.95rem; color: #f1f5f9; margin-top: 0.35rem;">${rel.keyRule}</div>
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.04); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem;">
            <p style="font-size: 0.95rem; color: #f1f5f9; line-height: 1.5; margin-bottom: 0.75rem;">
              ${rel.desc}
            </p>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Real-Life Models:</span>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
              ${rel.examples.map(ex => `
                <span style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); color: #fcd34d; padding: 4px 10px; border-radius: 9999px; font-size: 0.82rem;">
                  ✦ ${ex}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Real-Life Relationship Detective Quiz -->
        <div class="learn-card" style="margin-top: 1.5rem;">
          <div class="learn-card-header">
            <div>
              <h3>🕵️ Relationship Detective: Spot the Lines</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                Test your understanding on real-life objects
              </p>
            </div>
          </div>

          <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-md); padding: 1.25rem;">
            <p style="font-size: 1rem; color: #ffffff; font-weight: 600; margin-bottom: 1rem;">
              "The adjacent edges of a notebook or rectangular sheet of paper meet at a square corner. Which line relationship is this?"
            </p>

            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
              <button class="btn ${quizAnswered && quizResult === false ? 'btn-outline' : 'btn-outline'}" data-quiz-ans="parallel">
                Parallel Lines (AB ∥ CD)
              </button>
              <button class="btn ${quizAnswered && quizResult === true ? 'btn-primary' : 'btn-outline'}" data-quiz-ans="perpendicular">
                Perpendicular Lines (AB ⊥ CD)
              </button>
              <button class="btn btn-outline" data-quiz-ans="concurrent">
                Concurrent Lines
              </button>
            </div>

            ${quizAnswered ? `
              <div style="margin-top: 1rem; padding: 0.85rem; border-radius: var(--radius-sm); background: ${quizResult ? 'rgba(16,185,129,0.18)' : 'rgba(239,68,68,0.18)'}; border: 1px solid ${quizResult ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'};">
                <strong style="color: ${quizResult ? 'var(--accent-emerald-light)' : '#fca5a5'};">
                  ${quizResult ? '🎉 Correct!' : '❌ Not quite!'}
                </strong>
                <p style="font-size: 0.85rem; color: #e2e8f0; margin-top: 0.25rem;">
                  ${quizResult ? 'Adjacent edges meet at an exact 90° right angle forming a square corner ∟, so they are Perpendicular Lines (AB ⊥ CD)!' : 'Adjacent edges cross at an exact 90° right angle, which means they are Perpendicular Lines (AB ⊥ CD). Opposite edges would be parallel!'}
                </p>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('[data-rel]').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        activeRelId = btn.getAttribute('data-rel');
        render();
      });
    });

    container.querySelectorAll('[data-quiz-ans]').forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = btn.getAttribute('data-quiz-ans');
        quizAnswered = true;
        if (choice === 'perpendicular') {
          playCorrectSound();
          launchConfetti();
          quizResult = true;
        } else {
          playWrongSound();
          quizResult = false;
        }
        render();
      });
    });
  }

  render();
}

/* Topic 5 - Module 3: Angles & Virtual Protractor Studio */
function renderAnglesProtractorModule(container) {
  let currentAngle = 60; // 0 to 360

  function getAngleType(deg) {
    if (deg === 0) return ANGLE_TYPES_DATA[0]; // Zero
    if (deg > 0 && deg < 90) return ANGLE_TYPES_DATA[1]; // Acute
    if (deg === 90) return ANGLE_TYPES_DATA[2]; // Right
    if (deg > 90 && deg < 180) return ANGLE_TYPES_DATA[3]; // Obtuse
    if (deg === 180) return ANGLE_TYPES_DATA[4]; // Straight
    if (deg > 180 && deg < 360) return ANGLE_TYPES_DATA[5]; // Reflex
    return ANGLE_TYPES_DATA[6]; // Complete 360
  }

  function render() {
    const angleType = getAngleType(currentAngle);
    const rad = (currentAngle * Math.PI) / 180;

    // Protractor center at (180, 170), radius = 130
    const cx = 180;
    const cy = 170;
    const armLen = 135;
    const armX = cx + armLen * Math.cos(rad);
    const armY = cy - armLen * Math.sin(rad);

    // Angle arc path
    const arcRadius = 45;
    const arcEndX = cx + arcRadius * Math.cos(rad);
    const arcEndY = cy - arcRadius * Math.sin(rad);
    const largeArc = currentAngle > 180 ? 1 : 0;
    const arcPath = `M ${cx + arcRadius} ${cy} A ${arcRadius} ${arcRadius} 0 ${largeArc} 0 ${arcEndX} ${arcEndY}`;

    container.innerHTML = `
      <div class="learn-container">
        <div class="think-callout-math">
          <div class="callout-header">💡 Think About It — The Steering Wheel Metaphor 🧭</div>
          <p>Don't think of an angle as two stiff wooden sticks on paper. Think of it as a <strong>turn of a steering wheel</strong>! Facing straight ahead (0°), a quarter turn to the right is 90° (Right Angle ∟). Turning all the way around to face backwards is 180° (Straight Angle). Any turn past backwards is a Reflex Angle!</p>
        </div>

        <!-- Protractor Studio Card -->
        <div class="learn-card">
          <div class="learn-card-header">
            <div>
              <h3>🧭 Interactive Virtual Protractor Studio</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                Drag the angle slider or click presets to measure angles from 0° to 360°
              </p>
            </div>
            <div class="angle-badge ${angleType.badgeClass}" style="font-size: 1rem; padding: 0.4rem 1rem;">
              ${angleType.name} (${currentAngle}°)
            </div>
          </div>

          <!-- Virtual Protractor SVG Canvas -->
          <div class="protractor-studio" style="margin: 1rem 0;">
            <div class="protractor-svg-wrapper">
              <svg width="360" height="240" viewBox="0 0 360 240">
                <!-- Semicircular protractor body -->
                <path d="M 50 170 A 130 130 0 0 1 310 170 Z" fill="rgba(99, 102, 241, 0.08)" stroke="rgba(255, 255, 255, 0.25)" stroke-width="2" />
                <!-- Inner cutout -->
                <path d="M 120 170 A 60 60 0 0 1 240 170 Z" fill="rgba(0, 0, 0, 0.4)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1.5" />
                
                <!-- Baseline -->
                <line x1="35" y1="170" x2="325" y2="170" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2" />

                <!-- Protractor ticks every 10 degrees -->
                ${Array.from({ length: 19 }, (_, i) => i * 10).map(deg => {
                  const tickRad = (deg * Math.PI) / 180;
                  const x1 = cx + 130 * Math.cos(tickRad);
                  const y1 = cy - 130 * Math.sin(tickRad);
                  const isMajor = deg % 30 === 0 || deg === 90;
                  const len = isMajor ? 12 : 6;
                  const x2 = cx + (130 - len) * Math.cos(tickRad);
                  const y2 = cy - (130 - len) * Math.sin(tickRad);
                  const textX = cx + (130 - 24) * Math.cos(tickRad);
                  const textY = cy - (130 - 24) * Math.sin(tickRad);
                  return `
                    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${isMajor ? '#fcd34d' : 'rgba(255,255,255,0.4)'}" stroke-width="${isMajor ? '2' : '1'}" />
                    ${isMajor && deg > 0 && deg < 180 ? `
                      <text x="${textX}" y="${textY + 4}" fill="#94a3b8" font-size="10" text-anchor="middle" font-weight="600">${deg}°</text>
                    ` : ''}
                  `;
                }).join('')}

                <!-- Angle Arc -->
                ${currentAngle > 0 && currentAngle < 360 ? `
                  <path d="${arcPath}" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
                ` : ''}

                <!-- 90 Degree Square Marker if right angle -->
                ${currentAngle === 90 ? `
                  <path d="M 180 145 L 205 145 L 205 170" fill="none" stroke="#f59e0b" stroke-width="2.5" />
                ` : ''}

                <!-- Base Fixed Arm (Ray BC) -->
                <line x1="${cx}" y1="${cy}" x2="${cx + armLen}" y2="${cy}" stroke="#10b981" stroke-width="4" stroke-linecap="round" />
                <circle cx="${cx + armLen - 15}" cy="${cy}" r="3" fill="#ffffff" />
                <text x="${cx + armLen - 18}" y="${cy + 18}" fill="#a7f3d0" font-size="12" font-weight="bold">C (Arm)</text>

                <!-- Rotating Dynamic Arm (Ray BA) -->
                <line x1="${cx}" y1="${cy}" x2="${armX}" y2="${armY}" stroke="#f43f5e" stroke-width="4" stroke-linecap="round" />
                <circle cx="${cx + (armLen - 15) * Math.cos(rad)}" cy="${cy - (armLen - 15) * Math.sin(rad)}" r="3" fill="#ffffff" />
                <text x="${cx + (armLen - 10) * Math.cos(rad) + 6}" y="${cy - (armLen - 10) * Math.sin(rad) + 4}" fill="#fecdd3" font-size="12" font-weight="bold">A (Arm)</text>

                <!-- Vertex Center Point B -->
                <circle cx="${cx}" cy="${cy}" r="6" fill="#f59e0b" />
                <text x="${cx - 24}" y="${cy + 18}" fill="#fcd34d" font-size="13" font-weight="bold">B (Vertex)</text>

                <!-- Live angle label at center -->
                <text x="180" y="225" fill="#38bdf8" font-size="18" font-weight="bold" text-anchor="middle">
                  ∠ABC = ${currentAngle}°
                </text>
              </svg>
            </div>

            <!-- Slider Control Bar -->
            <div class="slider-control-bar" style="width: 100%; max-width: 480px; margin: 0.5rem 0;">
              <span style="font-weight: 700; color: #ffffff; white-space: nowrap;">Angle (θ):</span>
              <input type="range" id="angle-slider" min="0" max="360" step="5" value="${currentAngle}" style="flex: 1; accent-color: var(--accent-indigo); cursor: pointer;" />
              <span style="font-family: monospace; font-size: 1.2rem; font-weight: 800; color: var(--accent-amber-light); min-width: 50px; text-align: right;">
                ${currentAngle}°
              </span>
            </div>

            <!-- Presets Bar -->
            <div class="protractor-presets-bar">
              <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; align-self: center;">CBSE Presets:</span>
              ${[0, 30, 45, 60, 90, 120, 150, 180, 270, 360].map(p => `
                <button class="btn btn-outline ${currentAngle === p ? 'btn-primary' : ''}" style="padding: 4px 10px; font-size: 0.8rem;" data-deg="${p}">
                  ${p}°
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Angle Details Strip -->
          <div style="background: rgba(255,255,255,0.04); border-radius: var(--radius-md); padding: 1.25rem; margin-top: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
              <h4 style="color: var(--accent-amber-light); margin: 0;">${angleType.name} (${angleType.degrees})</h4>
              <span style="font-size: 0.85rem; color: #a5b4fc; font-family: monospace; font-weight: 700;">Range: ${angleType.range}</span>
            </div>
            <p style="font-size: 0.92rem; color: #f1f5f9; line-height: 1.5; margin-bottom: 0.5rem;">
              ${angleType.desc}
            </p>
            <p style="font-size: 0.85rem; color: #94a3b8;">
              🔍 <strong>Real-Life Analogy:</strong> ${angleType.realLife}
            </p>
          </div>
        </div>

        <!-- 7 Types of Angles Guide Grid -->
        <div class="learn-card" style="margin-top: 1.5rem;">
          <div class="learn-card-header">
            <div>
              <h3>📐 All 7 CBSE Class 5 Angle Types at a Glance</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                Official NCERT classifications from 0° (Zero) to 360° (Complete)
              </p>
            </div>
          </div>

          <div class="geom-cards-grid">
            ${ANGLE_TYPES_DATA.map(t => `
              <div class="geom-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="color: #ffffff; font-size: 1rem;">${t.name}</strong>
                  <span class="angle-badge ${t.badgeClass}">${t.degrees}</span>
                </div>
                <div style="font-size: 0.8rem; color: var(--accent-amber-light); font-family: monospace;">${t.symbol}</div>
                <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.4; margin: 0;">
                  ${t.desc}
                </p>
                <div style="font-size: 0.78rem; color: var(--text-muted); border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.5rem; margin-top: auto;">
                  e.g., ${t.realLife}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    const slider = container.querySelector('#angle-slider');
    if (slider) {
      slider.addEventListener('input', (e) => {
        currentAngle = parseInt(e.target.value);
        render();
      });
    }

    container.querySelectorAll('[data-deg]').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        currentAngle = parseInt(btn.getAttribute('data-deg'));
        render();
      });
    });
  }

  render();
}

/* Topic 5 - Module 4: Clock Hands & Real-Life Angle Detective */
function renderClockAnglesModule(container) {
  let activeHour = 3; // 1 to 12

  function render() {
    const preset = CLOCK_ANGLES_PRESETS.find(p => p.hour === activeHour) || {
      time: `${activeHour}:00`,
      hour: activeHour,
      min: 0,
      deg: Math.min(activeHour, 12 - activeHour) * 30,
      type: Math.min(activeHour, 12 - activeHour) * 30 < 90 ? 'Acute Angle' : (Math.min(activeHour, 12 - activeHour) * 30 === 90 ? 'Right Angle ∟' : (Math.min(activeHour, 12 - activeHour) * 30 < 180 ? 'Obtuse Angle' : 'Straight Angle')),
      reason: `${Math.min(activeHour, 12 - activeHour)} hour gaps × 30° = ${Math.min(activeHour, 12 - activeHour) * 30}°.`
    };

    const shortestGap = Math.min(activeHour, 12 - activeHour);
    const angleDeg = shortestGap * 30;

    // Clock center (100, 100), radius = 80
    const ccx = 100;
    const ccy = 100;

    // Minute hand points straight UP at 12
    const minX = ccx;
    const minY = 32;

    // Hour hand position (angle from top = activeHour * 30 deg)
    const hourAngleRad = ((activeHour * 30 - 90) * Math.PI) / 180;
    const hourX = ccx + 50 * Math.cos(hourAngleRad);
    const hourY = ccy + 50 * Math.sin(hourAngleRad);

    // Angle Arc between minute hand and hour hand
    let clockArcSvg = '';
    if (activeHour === 3) {
      clockArcSvg = `
        <path d="M ${ccx} ${ccy - 20} L ${ccx + 20} ${ccy - 20} L ${ccx + 20} ${ccy}" fill="none" stroke="#fcd34d" stroke-width="2" />
        <text x="${ccx + 26}" y="${ccy - 24}" fill="#fcd34d" font-size="10" font-weight="bold">90° ∟</text>
      `;
    } else if (activeHour === 9) {
      clockArcSvg = `
        <path d="M ${ccx} ${ccy - 20} L ${ccx - 20} ${ccy - 20} L ${ccx - 20} ${ccy}" fill="none" stroke="#fcd34d" stroke-width="2" />
        <text x="${ccx - 46}" y="${ccy - 24}" fill="#fcd34d" font-size="10" font-weight="bold">90° ∟</text>
      `;
    } else if (activeHour === 6) {
      clockArcSvg = `
        <path d="M ${ccx} ${ccy - 28} A 28 28 0 0 1 ${ccx} ${ccy + 28}" fill="none" stroke="#38bdf8" stroke-width="2.5" />
        <text x="${ccx + 36}" y="${ccy + 5}" fill="#38bdf8" font-size="10" font-weight="bold">180°</text>
      `;
    } else if (activeHour !== 12) {
      const hRad = ((activeHour * 30 - 90) * Math.PI) / 180;
      const endX = Math.round(ccx + 28 * Math.cos(hRad));
      const endY = Math.round(ccy + 28 * Math.sin(hRad));
      const sweep = activeHour < 6 ? 1 : 0;
      clockArcSvg = `
        <path d="M ${ccx} ${ccy - 28} A 28 28 0 0 ${sweep} ${endX} ${endY}" fill="none" stroke="#38bdf8" stroke-width="2" />
      `;
    }

    container.innerHTML = `
      <div class="learn-container">
        <!-- Clock Hands Hero Card -->
        <div class="learn-card">
          <div class="learn-card-header">
            <div>
              <h3>⏰ Clock Hands Angle Detective</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                Every 1 hour jump on a clock face equals exactly 30° ($360° ÷ 12 = 30°$)
              </p>
            </div>
            <div class="angle-badge ${angleDeg < 90 ? 'acute' : (angleDeg === 90 ? 'right' : (angleDeg < 180 ? 'obtuse' : 'straight'))}" style="font-size: 0.95rem; padding: 0.35rem 0.85rem;">
              ${preset.type} (${angleDeg}°)
            </div>
          </div>

          <!-- Studio Layout -->
          <div class="clock-studio" style="margin: 1rem 0;">
            <!-- Analog Clock SVG -->
            <div class="clock-svg-wrapper">
              <svg width="220" height="220" viewBox="0 0 200 200">
                <!-- Outer clock rim -->
                <circle cx="${ccx}" cy="${ccy}" r="90" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(255, 255, 255, 0.25)" stroke-width="4" />
                <circle cx="${ccx}" cy="${ccy}" r="82" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="2" />

                <!-- Hour Numbers (1 to 12) -->
                ${Array.from({ length: 12 }, (_, i) => i + 1).map(h => {
                  const hRad = ((h * 30 - 90) * Math.PI) / 180;
                  const numX = ccx + 68 * Math.cos(hRad);
                  const numY = ccy + 68 * Math.sin(hRad);
                  const isCurrent = h === activeHour || h === 12;
                  return `
                    <text x="${numX}" y="${numY + 5}" fill="${isCurrent ? '#fcd34d' : '#94a3b8'}" font-size="${isCurrent ? '13' : '11'}" font-weight="${isCurrent ? '800' : '600'}" text-anchor="middle">
                      ${h}
                    </text>
                  `;
                }).join('')}

                ${clockArcSvg}

                <!-- Minute Hand (points at 12, Rose color) -->
                <line x1="${ccx}" y1="${ccy}" x2="${minX}" y2="${minY}" stroke="#f43f5e" stroke-width="3.5" stroke-linecap="round" />

                <!-- Hour Hand (points at activeHour, Amber/Cyan color) -->
                <line x1="${ccx}" y1="${ccy}" x2="${hourX}" y2="${hourY}" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" />

                <!-- Center Pinion -->
                <circle cx="${ccx}" cy="${ccy}" r="6" fill="#f59e0b" />
                <circle cx="${ccx}" cy="${ccy}" r="2.5" fill="#ffffff" />
              </svg>
            </div>

            <!-- Interactive Hour Controls & Math Breakdown -->
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-md); padding: 1rem;">
                <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Selected Time:</span>
                <div style="font-size: 1.8rem; font-weight: 800; color: #ffffff; font-family: monospace; margin-top: 0.25rem;">
                  ${activeHour}:00
                </div>
              </div>

              <!-- Hour Slider -->
              <div class="slider-control-bar">
                <span style="font-weight: 700; color: #ffffff;">Hour:</span>
                <input type="range" id="clock-hour-slider" min="1" max="12" step="1" value="${activeHour}" style="flex: 1; accent-color: var(--accent-indigo); cursor: pointer;" />
                <span style="font-family: monospace; font-size: 1.1rem; font-weight: 800; color: var(--accent-amber-light); min-width: 35px; text-align: right;">
                  ${activeHour}
                </span>
              </div>

              <!-- Step by Step Math Card -->
              <div style="background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.35); border-radius: var(--radius-md); padding: 1rem;">
                <div style="font-size: 0.8rem; color: #a5b4fc; font-weight: 700; text-transform: uppercase;">Step-by-Step Calculation:</div>
                <div style="font-size: 0.95rem; color: #ffffff; margin-top: 0.4rem; line-height: 1.45;">
                  • Gap between hands: <strong>${shortestGap} hour spaces</strong>
                  <br>• Degrees per hour: <strong>30°</strong>
                  <br>• Angle measure: <strong>${shortestGap} × 30° = ${angleDeg}°</strong>
                  <br>• Classification: <strong style="color: var(--accent-amber-light);">${preset.type}</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Presets -->
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-top: 1rem;">
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; align-self: center;">Popular CBSE Clock Angles:</span>
            ${CLOCK_ANGLES_PRESETS.map(p => `
              <button class="btn btn-outline ${activeHour === p.hour ? 'btn-primary' : ''}" style="padding: 4px 10px; font-size: 0.8rem;" data-clock-h="${p.hour}">
                ${p.time} (${p.deg}°)
              </button>
            `).join('')}
          </div>
        </div>

        <!-- The 30 Degree Secret Explanation Card -->
        <div class="learn-card" style="margin-top: 1.5rem;">
          <div class="learn-card-header">
            <div>
              <h3>💡 The CBSE Clock Angle Formula Decoded</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                Why does each 1 hour mark equal 30 degrees?
              </p>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
            <div style="background: rgba(0,0,0,0.25); border-radius: var(--radius-md); padding: 1rem;">
              <h4 style="color: var(--accent-amber-light); margin-bottom: 0.5rem;">1. Full Revolution = 360°</h4>
              <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.45;">
                A clock face is a complete circle. One complete revolution around the dial is <strong>360°</strong>.
              </p>
            </div>
            <div style="background: rgba(0,0,0,0.25); border-radius: var(--radius-md); padding: 1rem;">
              <h4 style="color: var(--accent-amber-light); margin-bottom: 0.5rem;">2. 12 Equal Hour Numbers</h4>
              <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.45;">
                The dial is divided into 12 equal hours:
                <br><code>360° ÷ 12 = 30° per hour</code>
              </p>
            </div>
            <div style="background: rgba(0,0,0,0.25); border-radius: var(--radius-md); padding: 1rem;">
              <h4 style="color: var(--accent-amber-light); margin-bottom: 0.5rem;">3. 60 Minute Marks</h4>
              <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.45;">
                The dial also has 60 equal minute marks:
                <br><code>360° ÷ 60 = 6° per minute</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    const hourSlider = container.querySelector('#clock-hour-slider');
    if (hourSlider) {
      hourSlider.addEventListener('input', (e) => {
        activeHour = parseInt(e.target.value);
        render();
      });
    }

    container.querySelectorAll('[data-clock-h]').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        activeHour = parseInt(btn.getAttribute('data-clock-h'));
        render();
      });
    });
  }

  render();
}

/* Topic 5 - Module 5: Triangles Classification & Polygon Interior Angle Sum Theorem */
function renderTrianglesPolygonsModule(container) {
  let activePresetId = 'ws_1'; // 'ws_1' | 'ws_2' | 'ws_3' | 'ws_4' | 'equi' | 'iso_rt'
  let activePolySides = 9; // Nonagon by default! (Worksheet Q2)

  function render() {
    const preset = TRIANGLE_PRESETS.find(p => p.id === activePresetId) || TRIANGLE_PRESETS[0];
    const poly = POLYGON_DATA.find(p => p.sides === activePolySides) || POLYGON_DATA[6]; // Nonagon

    // Calculate dynamic polygon points for SVG triangulation
    const pcx = 110, pcy = 110, pr = 80;
    const polyPts = [];
    for (let i = 0; i < activePolySides; i++) {
      const a = (2 * Math.PI * i / activePolySides) - Math.PI / 2;
      polyPts.push([Math.round(pcx + pr * Math.cos(a)), Math.round(pcy + pr * Math.sin(a))]);
    }
    const polyPointsStr = polyPts.map(pt => pt.join(',')).join(' ');

    // Diagonals from Vertex 0 to create (n - 2) triangles
    const diagonals = [];
    for (let i = 2; i < activePolySides - 1; i++) {
      diagonals.push({
        x1: polyPts[0][0],
        y1: polyPts[0][1],
        x2: polyPts[i][0],
        y2: polyPts[i][1]
      });
    }

    // Calculate dynamic, mathematically exact triangle coordinates from preset angles
    function computeTriangleGeometry(anglesArr) {
      let a1, a2, a3;
      const maxA = Math.max(...anglesArr);
      const minA = Math.min(...anglesArr);

      if (maxA >= 90) {
        // Place obtuse or right angle at vertex A for prominent, authentic visualization
        a1 = maxA;
        a2 = minA;
        a3 = 180 - a1 - a2;
      } else if (anglesArr.every(a => a === 60)) {
        a1 = 60; a2 = 60; a3 = 60;
      } else {
        // Acute: largest acute at apex C, base angles at A and B
        a3 = maxA;
        const rest = anglesArr.slice();
        rest.splice(rest.indexOf(maxA), 1);
        a1 = rest[0];
        a2 = rest[1];
      }

      const alpha = (a1 * Math.PI) / 180;
      const beta = (a2 * Math.PI) / 180;
      const gamma = (a3 * Math.PI) / 180;

      // Law of Sines: c / sin(gamma) = b / sin(beta) => b = c * sin(beta) / sin(gamma)
      const c = 100;
      const b = (c * Math.sin(beta)) / Math.sin(gamma);

      const rawA = { x: 0, y: 0 };
      const rawB = { x: c, y: 0 };
      const rawC = { x: b * Math.cos(alpha), y: -b * Math.sin(alpha) };

      const pts = [rawA, rawB, rawC];
      const minX = Math.min(...pts.map(p => p.x));
      const maxX = Math.max(...pts.map(p => p.x));
      const minY = Math.min(...pts.map(p => p.y));
      const maxY = Math.max(...pts.map(p => p.y));

      const w = maxX - minX;
      const h = maxY - minY;
      const W = 240, H = 150;
      const padX = 36, padY = 28;
      const scale = Math.min((W - 2 * padX) / w, (H - 2 * padY) / h);
      const offX = (W - w * scale) / 2 - minX * scale;
      const offY = (H - h * scale) / 2 - minY * scale;

      const A = { x: Math.round(rawA.x * scale + offX), y: Math.round(rawA.y * scale + offY), deg: a1 };
      const B = { x: Math.round(rawB.x * scale + offX), y: Math.round(rawB.y * scale + offY), deg: a2 };
      const C = { x: Math.round(rawC.x * scale + offX), y: Math.round(rawC.y * scale + offY), deg: a3 };

      return { A, B, C };
    }

    const tGeom = computeTriangleGeometry(preset.angles);

    let arcSvgA = '';
    if (tGeom.A.deg === 90) {
      arcSvgA = `
        <path d="M ${tGeom.A.x + 16} ${tGeom.A.y} L ${tGeom.A.x + 16} ${tGeom.A.y - 16} L ${tGeom.A.x} ${tGeom.A.y - 16}" fill="none" stroke="#fcd34d" stroke-width="2" />
        <text x="${tGeom.A.x + 20}" y="${tGeom.A.y - 18}" fill="#fcd34d" font-size="11" font-weight="bold">90° ∟</text>
      `;
    } else if (tGeom.A.deg > 90) {
      const radA = (tGeom.A.deg * Math.PI) / 180;
      const arcEndX = Math.round(tGeom.A.x + 26 * Math.cos(-radA));
      const arcEndY = Math.round(tGeom.A.y + 26 * Math.sin(-radA));
      const bisectRad = (tGeom.A.deg * Math.PI) / 360;
      const lblX = Math.round(tGeom.A.x + 42 * Math.cos(-bisectRad));
      const lblY = Math.round(tGeom.A.y + 42 * Math.sin(-bisectRad));
      arcSvgA = `
        <path d="M ${tGeom.A.x + 26} ${tGeom.A.y} A 26 26 0 0 0 ${arcEndX} ${arcEndY}" fill="none" stroke="#e879f9" stroke-width="2.5" />
        <text x="${lblX}" y="${lblY}" fill="#f0abfc" font-size="12" font-weight="bold">${tGeom.A.deg}°</text>
      `;
    } else {
      const radA = (tGeom.A.deg * Math.PI) / 180;
      const arcEndX = Math.round(tGeom.A.x + 22 * Math.cos(-radA));
      const arcEndY = Math.round(tGeom.A.y + 22 * Math.sin(-radA));
      arcSvgA = `
        <path d="M ${tGeom.A.x + 22} ${tGeom.A.y} A 22 22 0 0 0 ${arcEndX} ${arcEndY}" fill="none" stroke="#6ee7b7" stroke-width="1.8" />
        <text x="${tGeom.A.x + 26}" y="${tGeom.A.y - 8}" fill="#6ee7b7" font-size="10" font-weight="bold">${tGeom.A.deg}°</text>
      `;
    }

    const radB = (tGeom.B.deg * Math.PI) / 180;
    const arcBx = Math.round(tGeom.B.x - 22 * Math.cos(radB));
    const arcBy = Math.round(tGeom.B.y - 22 * Math.sin(radB));
    const arcSvgB = `
      <path d="M ${tGeom.B.x - 22} ${tGeom.B.y} A 22 22 0 0 1 ${arcBx} ${arcBy}" fill="none" stroke="#94a3b8" stroke-width="1.8" />
      <text x="${tGeom.B.x - 36}" y="${tGeom.B.y - 8}" fill="#94a3b8" font-size="10">${tGeom.B.deg}°</text>
    `;

    const arcSvgC = `
      <text x="${tGeom.C.x + (tGeom.C.x < 120 ? 14 : -14)}" y="${tGeom.C.y + 22}" fill="#94a3b8" font-size="10" text-anchor="middle">${tGeom.C.deg}°</text>
    `;

    const strokeColor = preset.badge === 'obtuse' ? '#c084fc' : preset.badge === 'right' ? '#f59e0b' : '#34d399';
    const fillColor = preset.badge === 'obtuse' ? 'rgba(168, 85, 247, 0.15)' : preset.badge === 'right' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)';

    container.innerHTML = `
      <div class="learn-container">
        <!-- Part A: Triangle Classifier Studio -->
        <div class="learn-card">
          <div class="learn-card-header">
            <div>
              <h3>🔺 Triangle Classifier: Types by Angles & Sides</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                Every triangle's 3 interior angles must add up to exactly 180°!
              </p>
            </div>
            <div class="angle-badge ${preset.badge}" style="font-size: 0.95rem; padding: 0.35rem 0.85rem;">
              ${preset.type}
            </div>
          </div>

          <div style="margin: 0.75rem 0;">
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">
              Worksheet Presets (Term I Q4):
            </span>
            <div class="triangle-preset-chips">
              ${TRIANGLE_PRESETS.map(p => `
                <button class="preset-chip ${p.id === activePresetId ? 'active' : ''}" data-tri-id="${p.id}">
                  [${p.angles.join('°, ')}°] ➔ ${p.type.split(' ')[0]}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Triangle Showcase & Step Reasoning -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; align-items: center; margin: 1rem 0;">
            <div class="geom-canvas-box" style="flex-direction: column; padding: 1.25rem;">
              <svg width="240" height="150" viewBox="0 0 240 150">
                <!-- Dynamically constructed, mathematically exact triangle -->
                <polygon points="${tGeom.A.x},${tGeom.A.y} ${tGeom.B.x},${tGeom.B.y} ${tGeom.C.x},${tGeom.C.y}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="3" stroke-linejoin="round" />
                ${arcSvgA}
                ${arcSvgB}
                ${arcSvgC}
                <text x="${tGeom.A.x - 14}" y="${tGeom.A.y + 5}" fill="#ffffff" font-size="12" font-weight="bold">A</text>
                <text x="${tGeom.B.x + 10}" y="${tGeom.B.y + 5}" fill="#ffffff" font-size="12" font-weight="bold">B</text>
                <text x="${tGeom.C.x}" y="${tGeom.C.y - 8}" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">C</text>
              </svg>
              <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem; text-align: center;">
                Angle Sum: ${tGeom.A.deg}° + ${tGeom.B.deg}° + ${tGeom.C.deg}° = <strong>180°</strong>
              </div>
            </div>

            <!-- Mathematical Reasoning Card -->
            <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-md); padding: 1.2rem; border-left: 4px solid var(--accent-indigo);">
              <h4 style="color: var(--accent-amber-light); margin-bottom: 0.5rem;">Diagnostic Classification:</h4>
              <p style="font-size: 0.95rem; color: #f8fafc; line-height: 1.5;">
                ${preset.reason}
              </p>
              <div style="margin-top: 0.75rem; font-size: 0.85rem; color: #94a3b8; line-height: 1.45;">
                • <strong>Acute:</strong> All 3 angles &lt; 90°
                <br>• <strong>Right:</strong> Exactly one 90° angle (∟)
                <br>• <strong>Obtuse:</strong> Exactly one angle &gt; 90°
                <br>• <strong>Rule:</strong> Can a triangle have two right angles or two obtuse angles? <strong>NEVER!</strong> (Sum would exceed 180°).
              </div>
            </div>
          </div>
        </div>

        <!-- Part B: Polygons & The Interior Angle Sum Theorem -->
        <div class="learn-card" style="margin-top: 1.5rem;">
          <div class="learn-card-header">
            <div>
              <h3>⬡ The Polygon Interior Angle Sum Theorem</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                Worksheet Q2: Interior angle sum of a polygon with n sides is <strong>(n − 2) × 180°</strong>
              </p>
            </div>
            <div class="badge badge-active" style="font-size: 0.85rem;">
              Formula: (n − 2) × 180°
            </div>
          </div>

          <!-- Polygon Selector Pills -->
          <div class="poly-selector-grid">
            ${POLYGON_DATA.map(p => `
              <button class="poly-pill ${p.sides === activePolySides ? 'active' : ''}" data-poly-sides="${p.sides}">
                ${p.name} (${p.sides} sides) ${p.sides === 9 ? '⭐ Q2' : ''}
              </button>
            `).join('')}
          </div>

          <!-- Dynamic Polygon Triangulation Studio -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; align-items: center; margin: 1rem 0;">
            <div class="geom-canvas-box" style="flex-direction: column; padding: 1rem;">
              <svg width="220" height="220" viewBox="0 0 220 220">
                <!-- Polygon shape -->
                <polygon points="${polyPointsStr}" fill="rgba(99, 102, 241, 0.12)" stroke="#818cf8" stroke-width="3" />
                
                <!-- Triangulation diagonals from vertex 0 -->
                ${diagonals.map(d => `
                  <line x1="${d.x1}" y1="${d.y1}" x2="${d.x2}" y2="${d.y2}" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="4,4" />
                `).join('')}

                <!-- Vertices dots -->
                ${polyPts.map((pt, idx) => `
                  <circle cx="${pt[0]}" cy="${pt[1]}" r="4.5" fill="${idx === 0 ? '#ef4444' : '#38bdf8'}" />
                  <text x="${pt[0]}" y="${pt[1] < 110 ? pt[1] - 8 : pt[1] + 16}" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">
                    ${idx === 0 ? 'V1' : `V${idx + 1}`}
                  </text>
                `).join('')}
              </svg>
              <div style="font-size: 0.8rem; color: #f59e0b; margin-top: 0.4rem; text-align: center;">
                Dashed lines: ${poly.triangles} non-overlapping triangles connecting from V1!
              </div>
            </div>

            <!-- Calculation Card -->
            <div class="poly-calc-card">
              <div style="font-size: 0.78rem; color: var(--accent-amber-light); text-transform: uppercase; font-weight: 700;">
                Calculation for ${poly.name} (${poly.sides} sides):
              </div>
              <div style="font-size: 1.6rem; font-weight: 800; color: #ffffff; margin: 0.35rem 0;">
                Sum = (${poly.sides} − 2) × 180° = ${poly.sum}°
              </div>
              <div style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.5; margin-top: 0.5rem;">
                • Number of sides (n): <strong>${poly.sides}</strong>
                <br>• Triangles formed from one vertex (n − 2): <strong>${poly.triangles} triangles</strong>
                <br>• Angle sum per triangle: <strong>180°</strong>
                <br>• Total sum: <strong>${poly.triangles} × 180° = <span style="color: var(--accent-emerald-light); font-size: 1.1rem; font-weight: 800;">${poly.sum}°</span></strong>
              </div>
              ${poly.sides === 9 ? `
                <div style="margin-top: 0.85rem; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 8px; padding: 0.65rem; font-size: 0.85rem; color: #fef08a;">
                  🎯 <strong>Direct Worksheet Solution (Q2):</strong><br>
                  "Find the sum of all the interior angles of a nonagon."<br>
                  A nonagon has 9 sides $\\implies$ Sum = (9 − 2) × 180° = 7 × 180° = <strong>1260°</strong>!
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Master Polygons Table -->
          <div class="diff-table-wrap">
            <table class="diff-table">
              <thead>
                <tr>
                  <th>Polygon Name</th>
                  <th>Number of Sides (n)</th>
                  <th>Triangles (n − 2)</th>
                  <th>Interior Angle Sum</th>
                  <th>Real-World Example</th>
                </tr>
              </thead>
              <tbody>
                ${POLYGON_DATA.map(p => `
                  <tr style="${p.sides === activePolySides ? 'background: rgba(99, 102, 241, 0.18); font-weight: bold;' : ''}">
                    <td style="color: #ffffff;">${p.name} ${p.sides === 9 ? '⭐ (Worksheet Q2)' : ''}</td>
                    <td>${p.sides}</td>
                    <td>${p.triangles}</td>
                    <td style="color: var(--accent-emerald-light); font-weight: 700;">${p.sum}°</td>
                    <td style="color: var(--text-muted); font-size: 0.82rem;">${p.example}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Attach click listeners for triangle presets
    container.querySelectorAll('.preset-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        activePresetId = btn.getAttribute('data-tri-id');
        render();
      });
    });

    // Attach click listeners for polygon sides
    container.querySelectorAll('.poly-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        activePolySides = parseInt(btn.getAttribute('data-poly-sides'));
        render();
      });
    });
  }

  render();
}

/* Topic 5 - Module 6: Quadrilaterals, Rhombus vs Trapezium & Circles */
function renderQuadrilateralsCirclesModule(container) {
  let activeQuadTab = 'rhombus_trapezium'; // 'rhombus_trapezium' | 'missing_angles' | 'circles_constructions'

  function render() {
    let tabContent = '';

    if (activeQuadTab === 'rhombus_trapezium') {
      tabContent = `
        <!-- TAB 1: Rhombus vs Trapezium -->
        <div class="learn-card">
          <div class="learn-card-header">
            <div>
              <h3>⚖️ Rhombus vs. Trapezium: Key Differences</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                CBSE Class 5 Curriculum Worksheet Q8: Master the essential differences
              </p>
            </div>
          </div>

          <!-- Visual Comparison Cards -->
          <div class="quad-grid">
            <!-- Rhombus Card -->
            <div class="quad-item-card highlight">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="color: var(--accent-amber-light);">🔶 Rhombus (Equilateral Parallelogram)</h4>
                <span class="badge badge-active">All 4 Sides Equal</span>
              </div>
              <div class="geom-canvas-box" style="margin: 0.5rem 0;">
                <svg width="200" height="130" viewBox="0 0 200 130">
                  <!-- Rhombus: diamond -->
                  <polygon points="100,15 170,65 100,115 30,65" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="2.5" />
                  <!-- Diagonals meeting at 90 deg -->
                  <line x1="100" y1="15" x2="100" y2="115" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="3,3" />
                  <line x1="30" y1="65" x2="170" y2="65" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="3,3" />
                  <rect x="100" y="65" width="10" height="10" fill="none" stroke="#fcd34d" stroke-width="1.5" />
                  <text x="95" y="10" fill="#ffffff" font-size="11" font-weight="bold">A</text>
                  <text x="175" y="68" fill="#ffffff" font-size="11" font-weight="bold">B</text>
                  <text x="95" y="126" fill="#ffffff" font-size="11" font-weight="bold">C</text>
                  <text x="18" y="68" fill="#ffffff" font-size="11" font-weight="bold">D</text>
                  <text x="105" y="60" fill="#38bdf8" font-size="9">90° ∟</text>
                </svg>
              </div>
              <div style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.45;">
                • <strong>Sides:</strong> All 4 sides equal (AB = BC = CD = DA).
                <br>• <strong>Parallel pairs:</strong> <strong>Both pairs</strong> of opposite sides are parallel (AB ∥ CD and AD ∥ BC).
                <br>• <strong>Diagonals:</strong> Bisect each other at <strong>right angles (90° ⊥)</strong>!
                <br>• <strong>Opposite angles:</strong> Equal (∠A = ∠C, ∠B = ∠D).
              </div>
            </div>

            <!-- Trapezium Card -->
            <div class="quad-item-card">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="color: #60a5fa;">⏢ Trapezium</h4>
                <span class="badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">Only 1 Pair Parallel</span>
              </div>
              <div class="geom-canvas-box" style="margin: 0.5rem 0;">
                <svg width="200" height="130" viewBox="0 0 200 130">
                  <!-- Scalene Trapezium with visibly unequal non-parallel legs -->
                  <polygon points="50,25 135,25 185,105 20,105" fill="rgba(59, 130, 246, 0.15)" stroke="#60a5fa" stroke-width="2.5" />
                  <!-- Parallel marks on top and bottom -->
                  <line x1="88" y1="20" x2="98" y2="25" stroke="#fcd34d" stroke-width="2" />
                  <line x1="88" y1="30" x2="98" y2="25" stroke="#fcd34d" stroke-width="2" />
                  <line x1="98" y1="100" x2="108" y2="105" stroke="#fcd34d" stroke-width="2" />
                  <line x1="98" y1="110" x2="108" y2="105" stroke="#fcd34d" stroke-width="2" />
                  <text x="40" y="20" fill="#ffffff" font-size="11" font-weight="bold">A</text>
                  <text x="140" y="20" fill="#ffffff" font-size="11" font-weight="bold">B</text>
                  <text x="190" y="110" fill="#ffffff" font-size="11" font-weight="bold">C</text>
                  <text x="8" y="110" fill="#ffffff" font-size="11" font-weight="bold">D</text>
                  <text x="65" y="65" fill="#fcd34d" font-size="10">AB ∥ DC only (AD ≠ BC)</text>
                </svg>
              </div>
              <div style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.45;">
                • <strong>Sides:</strong> Sides are generally <strong>unequal</strong> in length.
                <br>• <strong>Parallel pairs:</strong> <strong>Only ONE pair</strong> of opposite sides is parallel (AB ∥ DC). The other pair (AD, BC) is non-parallel.
                <br>• <strong>Diagonals:</strong> Do <strong>NOT</strong> bisect each other at right angles.
                <br>• <strong>Opposite angles:</strong> Generally not equal.
              </div>
            </div>
          </div>

          <!-- Master Difference Table (Worksheet Q8 Direct Answer) -->
          <div class="diff-table-wrap">
            <table class="diff-table">
              <thead>
                <tr>
                  <th>Comparison Property</th>
                  <th style="color: var(--accent-amber-light);">🔶 Rhombus</th>
                  <th style="color: #93c5fd;">⏢ Trapezium</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>1. Parallel Sides</strong></td>
                  <td style="color: var(--accent-emerald-light);"><strong>Two pairs</strong> of parallel sides (AB ∥ CD and AD ∥ BC)</td>
                  <td style="color: #f87171;"><strong>Only one pair</strong> of parallel sides (AB ∥ CD)</td>
                </tr>
                <tr>
                  <td><strong>2. Side Lengths</strong></td>
                  <td style="color: var(--accent-emerald-light);"><strong>All 4 sides are equal</strong> in length</td>
                  <td style="color: #cbd5e1;">Sides are generally <strong>unequal</strong> in length</td>
                </tr>
                <tr>
                  <td><strong>3. Diagonals Intersection</strong></td>
                  <td style="color: var(--accent-emerald-light);">Diagonals <strong>bisect each other at 90° (perpendicular)</strong></td>
                  <td style="color: #cbd5e1;">Diagonals do <strong>not</strong> bisect at 90°</td>
                </tr>
                <tr>
                  <td><strong>4. Opposite Angles</strong></td>
                  <td style="color: var(--accent-emerald-light);">Opposite angles are <strong>equal</strong> (∠A = ∠C, ∠B = ∠D)</td>
                  <td style="color: #cbd5e1;">Opposite angles are generally <strong>not equal</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (activeQuadTab === 'missing_angles') {
      tabContent = `
        <!-- TAB 2: Missing Angle Solver -->
        <div class="learn-card">
          <div class="learn-card-header">
            <div>
              <h3>📐 Missing Angles in Quadrilaterals & Parallelograms</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                Theorem: The sum of all four interior angles of a quadrilateral is <strong>always 360°</strong>
              </p>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin: 1rem 0;">
            <!-- Example 1: General Quadrilateral (Worksheet Q11a) -->
            <div class="poly-calc-card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <h4 style="color: var(--accent-amber-light);">Worksheet Q11(a): Find '?'</h4>
                <span class="badge badge-active">360° Rule</span>
              </div>
              <div class="geom-canvas-box" style="margin-bottom: 0.75rem;">
                <svg width="220" height="130" viewBox="0 0 220 130">
                  <!-- Exact angles: A=85°, B=95°, C=70° (?), D=110° -->
                  <polygon points="41,46 164,15 155,108 35,108" fill="rgba(16, 185, 129, 0.12)" stroke="#34d399" stroke-width="2.5" />
                  <text x="36" y="65" fill="#fcd34d" font-size="11" font-weight="bold">D: 110°</text>
                  <text x="145" y="32" fill="#f43f5e" font-size="13" font-weight="extrabold">C: ?</text>
                  <text x="115" y="100" fill="#fcd34d" font-size="11" font-weight="bold">B: 95°</text>
                  <text x="45" y="100" fill="#fcd34d" font-size="11" font-weight="bold">A: 85°</text>
                </svg>
              </div>
              <div style="background: rgba(0,0,0,0.3); padding: 0.85rem; border-radius: 8px; font-size: 0.9rem; line-height: 1.5;">
                <strong>Step 1:</strong> Sum of known angles:
                <br><code>85° + 110° + 95° = 290°</code>
                <br><strong>Step 2:</strong> Subtract from 360°:
                <br><code>? = 360° − 290° = <span style="color: var(--accent-emerald-light); font-weight: 800; font-size: 1.1rem;">70°</span></code>
              </div>
            </div>

            <!-- Example 2: Parallelogram ABCD (Worksheet Q11b) -->
            <div class="poly-calc-card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <h4 style="color: #38bdf8;">Worksheet Q11(b): Parallelogram Angles</h4>
                <span class="badge" style="background: rgba(56, 189, 248, 0.2); color: #7dd3fc;">Opposite Equal</span>
              </div>
              <div class="geom-canvas-box" style="margin-bottom: 0.75rem;">
                <svg width="220" height="130" viewBox="0 0 220 130">
                  <!-- Exact angles: A=80°, B=100°, C=80°, D=100° -->
                  <polygon points="39,26 164,26 150,105 25,105" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" stroke-width="2.5" />
                  <text x="14" y="100" fill="#fcd34d" font-size="11" font-weight="bold">A: 80°</text>
                  <text x="155" y="100" fill="#ffffff" font-size="11" font-weight="bold">B: 100°</text>
                  <text x="168" y="32" fill="#fcd34d" font-size="11" font-weight="bold">C: 80°</text>
                  <text x="24" y="24" fill="#ffffff" font-size="11" font-weight="bold">D: 100°</text>
                </svg>
              </div>
              <div style="background: rgba(0,0,0,0.3); padding: 0.85rem; border-radius: 8px; font-size: 0.9rem; line-height: 1.5;">
                <strong>Given:</strong> ∠A = 80°.
                <br>• <strong>Opposite angles equal:</strong> ∠C = ∠A = <span style="color: #fcd34d; font-weight: 700;">80°</span>
                <br>• <strong>Adjacent angles supplementary (180°):</strong>
                <br>∠B = 180° − 80° = <span style="color: var(--accent-emerald-light); font-weight: 700;">100°</span>
                <br>∠D = 180° − 80° = <span style="color: var(--accent-emerald-light); font-weight: 700;">100°</span>
                <br>• <strong>Check Sum:</strong> 80° + 100° + 80° + 100° = <strong>360°</strong> ✓
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      tabContent = `
        <!-- TAB 3: Circles & Constructions -->
        <div class="learn-card">
          <div class="learn-card-header">
            <div>
              <h3>⭕ Circles Anatomy & Geometric Constructions</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                Master Radius vs Diameter and step-by-step constructions (Worksheet Q10)
              </p>
            </div>
          </div>

          <!-- Circle Anatomy Banner -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; margin: 1rem 0;">
            <div class="geom-canvas-box">
              <svg width="200" height="150" viewBox="0 0 200 150">
                <!-- Circle -->
                <circle cx="100" cy="75" r="60" fill="rgba(244, 63, 94, 0.1)" stroke="#f43f5e" stroke-width="2.5" />
                <!-- Center O -->
                <circle cx="100" cy="75" r="4" fill="#ffffff" />
                <text x="92" y="70" fill="#ffffff" font-size="11" font-weight="bold">O</text>
                <!-- Diameter AB -->
                <line x1="40" y1="75" x2="160" y2="75" stroke="#38bdf8" stroke-width="2" />
                <text x="25" y="79" fill="#38bdf8" font-size="10" font-weight="bold">A</text>
                <text x="165" y="79" fill="#38bdf8" font-size="10" font-weight="bold">B</text>
                <!-- Radius OC -->
                <line x1="100" y1="75" x2="142" y2="33" stroke="#fcd34d" stroke-width="2" />
                <text x="146" y="30" fill="#fcd34d" font-size="10" font-weight="bold">C</text>
                <!-- Chord DE -->
                <line x1="55" y1="117" x2="145" y2="117" stroke="#a78bfa" stroke-width="1.8" stroke-dasharray="3,3" />
                <text x="85" y="130" fill="#a78bfa" font-size="9">Chord DE</text>
              </svg>
            </div>

            <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-md); padding: 1rem; font-size: 0.9rem; line-height: 1.5;">
              <div style="color: var(--accent-amber-light); font-weight: 700; margin-bottom: 0.35rem;">Core Circle Formulas:</div>
              • <strong>Radius (r):</strong> Distance from center O to boundary.
              <br>• <strong>Diameter (d):</strong> Longest chord passing through center = <strong>2 × r</strong>
              <br>• <strong>The Golden Rule:</strong> <code>Radius = Diameter ÷ 2</code>
              <br>• <strong>Chord:</strong> Any line segment joining two points on the circle.
              <br>• <strong>Circumference:</strong> The perimeter / outer boundary of the circle.
            </div>
          </div>

          <!-- Step-by-Step Construction Guides (Worksheet Q10) -->
          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">CBSE Exam Constructions Step-by-Step:</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
            <!-- Circle Construction (Q10b) -->
            <div class="quad-item-card">
              <div style="font-weight: 700; color: #f43f5e;">1. Circle with Diameter 10 cm (Q10b)</div>
              <div class="construction-step-item">
                <div class="step-circle-num">1</div>
                <div style="font-size: 0.85rem; color: #cbd5e1;">Calculate radius: <strong>r = 10 cm ÷ 2 = 5 cm</strong>.</div>
              </div>
              <div class="construction-step-item">
                <div class="step-circle-num">2</div>
                <div style="font-size: 0.85rem; color: #cbd5e1;">Open your compass to exactly <strong>5 cm</strong> against a ruler.</div>
              </div>
              <div class="construction-step-item">
                <div class="step-circle-num">3</div>
                <div style="font-size: 0.85rem; color: #cbd5e1;">Mark center point O on paper with a sharp pencil.</div>
              </div>
              <div class="construction-step-item">
                <div class="step-circle-num">4</div>
                <div style="font-size: 0.85rem; color: #cbd5e1;">Place needle on O and rotate 360° to draw the circle.</div>
              </div>
            </div>

            <!-- Rectangle Construction (Q10a) -->
            <div class="quad-item-card">
              <div style="font-weight: 700; color: #34d399;">2. Quadrilateral 8 cm × 5 cm (Rectangle Q10a)</div>
              <div class="construction-step-item">
                <div class="step-circle-num">1</div>
                <div style="font-size: 0.85rem; color: #cbd5e1;">Draw base segment <strong>AB = 8 cm</strong> with a ruler.</div>
              </div>
              <div class="construction-step-item">
                <div class="step-circle-num">2</div>
                <div style="font-size: 0.85rem; color: #cbd5e1;">At A and B, construct <strong>90° right angles (perpendiculars)</strong> using protractor.</div>
              </div>
              <div class="construction-step-item">
                <div class="step-circle-num">3</div>
                <div style="font-size: 0.85rem; color: #cbd5e1;">Measure <strong>5 cm</strong> along each perpendicular to mark D and C.</div>
              </div>
              <div class="construction-step-item">
                <div class="step-circle-num">4</div>
                <div style="font-size: 0.85rem; color: #cbd5e1;">Join CD = 8 cm to complete rectangle ABCD.</div>
              </div>
            </div>

            <!-- Angle 135° Construction (Q10d) -->
            <div class="quad-item-card">
              <div style="font-weight: 700; color: #a78bfa;">3. Construct Angle of 135° (Q10d)</div>
              <div class="construction-step-item">
                <div class="step-circle-num">1</div>
                <div style="font-size: 0.85rem; color: #cbd5e1;">Draw initial ray <strong>OA (→)</strong> with a ruler.</div>
              </div>
              <div class="construction-step-item">
                <div class="step-circle-num">2</div>
                <div style="font-size: 0.85rem; color: #cbd5e1;">Place protractor center at vertex O and baseline over ray OA.</div>
              </div>
              <div class="construction-step-item">
                <div class="step-circle-num">3</div>
                <div style="font-size: 0.85rem; color: #cbd5e1;">Follow scale from 0° past 90° to mark <strong>135°</strong>.</div>
              </div>
              <div class="construction-step-item">
                <div class="step-circle-num">4</div>
                <div style="font-size: 0.85rem; color: #cbd5e1;">Join O to mark as ray OB. ∠AOB = 135° (<strong>Obtuse Angle</strong>).</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="learn-container">
        <!-- Subnav for Module 6 -->
        <div class="learn-subnav" style="margin-bottom: 1.25rem;">
          <button class="learn-pill ${activeQuadTab === 'rhombus_trapezium' ? 'active' : ''}" data-qtab="rhombus_trapezium">
            ⚖️ Rhombus vs Trapezium (Q8)
          </button>
          <button class="learn-pill ${activeQuadTab === 'missing_angles' ? 'active' : ''}" data-qtab="missing_angles">
            📐 Missing Angle Solver (Q11)
          </button>
          <button class="learn-pill ${activeQuadTab === 'circles_constructions' ? 'active' : ''}" data-qtab="circles_constructions">
            ⭕ Circles & Constructions (Q10)
          </button>
        </div>

        ${tabContent}
      </div>
    `;

    // Attach listeners for tab switching
    container.querySelectorAll('[data-qtab]').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        activeQuadTab = btn.getAttribute('data-qtab');
        render();
      });
    });
  }

  render();
}

/* --------------------------------------------------------------------------
   PRACTICE MODE RENDERER
   -------------------------------------------------------------------------- */

function getFilteredPracticeQuestions() {
  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
  if (state.currentTopic === 'tables_speed_master') {
    if (!state.tablesPracticeQueue || state.tablesPracticeQueue.length === 0 || state.tablesQueueFilter !== state.practiceFilter) {
      state.tablesPracticeQueue = generateTablesPracticeQueue(state.practiceFilter, 30);
      state.tablesQueueFilter = state.practiceFilter;
    }
    return state.tablesPracticeQueue;
  }
  if (state.currentTopic === 'fractions_master') {
    if (!state.fractionsPracticeQueue || state.fractionsPracticeQueue.length === 0 || state.fractionsQueueFilter !== state.practiceFilter) {
      state.fractionsPracticeQueue = generateFractionsPracticeQueue(state.practiceFilter, 30);
      state.fractionsQueueFilter = state.practiceFilter;
    }
    return state.fractionsPracticeQueue;
  }
  const pool = currentConfig.practicePool;
  if (state.practiceFilter === 'all') return pool;
  return pool.filter(q => q.skill === state.practiceFilter);
}

function renderPracticeView(container) {
  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
  const pool = currentConfig.practicePool;
  const categories = currentConfig.practiceCategories || [{ id: 'all', label: '🌟 All Questions' }];
  const questions = getFilteredPracticeQuestions();
  const qIndex = Math.min(state.currentQuestionIndex, Math.max(0, questions.length - 1));
  const q = questions[qIndex];

  const masteryBannerHtml = renderTopicMasteryBanner(currentConfig);
  const milestoneBannerHtml = state.currentTopic === 'tables_speed_master' ? renderTablesMilestoneBanner() : (state.currentTopic === 'fractions_master' ? renderFractionsMilestoneBanner() : '');

  container.innerHTML = `
    <div class="practice-container">
      ${masteryBannerHtml}
      ${milestoneBannerHtml}

      <!-- Skill Filter Bar -->
      <div class="skill-filter-bar">
        ${categories.map(cat => `
          <button class="skill-filter-btn ${state.practiceFilter === cat.id ? 'active' : ''}" data-skill="${cat.id}">
            ${cat.label} ${cat.id === 'all' && state.currentTopic !== 'tables_speed_master' ? `(${pool.length})` : ''}
          </button>
        `).join('')}
      </div>

      <!-- Practice Stats Bar -->
      <div class="practice-stats-bar">
        <div class="stat-pill">
          <span>Question:</span>
          <strong>${qIndex + 1} / ${questions.length}</strong>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <div class="stat-pill text-success">
            <span>✓ Correct:</span> <strong>${state.scoreCorrect}</strong>
          </div>
          <div class="stat-pill text-danger">
            <span>✗ Wrong:</span> <strong>${state.scoreWrong}</strong>
          </div>
          <button class="btn btn-restart-practice" id="btn-restart-practice" title="Restart Practice from Question 1">
            🔄 Restart
          </button>
        </div>
      </div>

      <!-- Question Card -->
      ${q ? `
        <div class="question-card" id="practice-card">
          <div class="question-header">
            <span class="question-num">Question ${qIndex + 1}</span>
            <span class="question-source-tag">${q.source || 'Class 5 CBSE'}</span>
          </div>

          <div class="question-prompt">${q.question}</div>

          <div class="options-grid">
            ${q.options.map((opt, optIdx) => `
              <button class="option-btn" data-opt-idx="${optIdx}" id="opt-btn-${optIdx}">
                <span class="option-label">${String.fromCharCode(65 + optIdx)}</span>
                <span class="option-text">${opt}</span>
              </button>
            `).join('')}
          </div>

          <div class="explanation-box" id="practice-explanation" style="display: none;">
            <div class="explanation-header">
              <span>💡 Step-by-Step Educational Explanation</span>
            </div>
            <div class="explanation-text">${q.explanation}</div>
          </div>

          <div class="question-nav" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <button class="btn btn-ghost" id="btn-prev-q" ${qIndex === 0 ? 'disabled' : ''}>
              ← Previous
            </button>
            <div style="display: flex; gap: 0.5rem;">
              ${(state.currentTopic === 'tables_speed_master' || state.currentTopic === 'fractions_master') ? `
                <button class="btn btn-secondary" id="btn-roll-new-numbers" title="Roll completely new random numbers for this question">
                  🎲 Roll New Numbers
                </button>
              ` : ''}
              <button class="btn btn-primary" id="btn-next-q">
                Next Question →
              </button>
            </div>
          </div>
        </div>
      ` : `
        <div class="question-card">
          <p>No questions found in this category.</p>
        </div>
      `}
    </div>
  `;

  // Attach filter buttons
  container.querySelectorAll('.skill-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      state.practiceFilter = btn.getAttribute('data-skill');
      state.currentQuestionIndex = 0;
      if (state.currentTopic === 'tables_speed_master') {
        state.tablesPracticeQueue = null; // force fresh generation
      }
      if (state.currentTopic === 'fractions_master') {
        state.fractionsPracticeQueue = null; // force fresh generation
      }
      saveActiveState();
      renderViewport();
    });
  });

  bindMasteryBannerEvents(container, currentConfig.id);

  // Attach restart button
  container.querySelector('#btn-restart-practice')?.addEventListener('click', () => {
    playClickSound();
    state.currentQuestionIndex = 0;
    state.scoreCorrect = 0;
    state.scoreWrong = 0;
    state.userAnswers = {};
    if (state.currentTopic === 'tables_speed_master') {
      state.tablesPracticeQueue = null; // generate fresh random queue
    }
    if (state.currentTopic === 'fractions_master') {
      state.fractionsPracticeQueue = null; // generate fresh random queue
    }
    saveActiveState();
    renderViewport();
  });

  if (!q) return;

  // Options click handler
  let answered = state.userAnswers[q.id] !== undefined;
  const expBox = container.querySelector('#practice-explanation');

  if (answered) {
    const selectedIdx = state.userAnswers[q.id];
    const isCorrect = selectedIdx === q.correct;
    container.querySelectorAll('.option-btn').forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) btn.classList.add('correct');
      if (!isCorrect && idx === selectedIdx) btn.classList.add('wrong');
    });
    expBox.style.display = 'flex';
  }

  container.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;

      if (typeof btn.blur === 'function') btn.blur();

      const selectedIdx = parseInt(btn.getAttribute('data-opt-idx'));
      state.userAnswers[q.id] = selectedIdx;

      const isCorrect = selectedIdx === q.correct;
      const flash = document.getElementById('feedback-flash');

      if (isCorrect) {
        state.scoreCorrect++;
        btn.classList.add('correct');
        playCorrectSound();
        flash.className = 'feedback-flash correct';
      } else {
        state.scoreWrong++;
        btn.classList.add('wrong');
        playWrongSound();
        flash.className = 'feedback-flash wrong';
        // Highlight correct
        const correctBtn = container.querySelector(`#opt-btn-${q.correct}`);
        if (correctBtn) correctBtn.classList.add('correct');
      }

      setTimeout(() => { flash.className = 'feedback-flash'; }, 400);

      // Disable all options and show explanation
      container.querySelectorAll('.option-btn').forEach(b => { b.disabled = true; });
      expBox.style.display = 'flex';

      // Record answer into topicProgress for 10-star mastery tracking
      state.topicProgress = state.topicProgress || {};
      const tp = state.topicProgress[state.currentTopic] = state.topicProgress[state.currentTopic] || {};
      tp.categorySolved = tp.categorySolved || {};
      tp.solvedQuestionIds = tp.solvedQuestionIds || {};
      tp.totalAttempted = (tp.totalAttempted || 0) + 1;
      if (isCorrect) {
        tp.totalSolved = (tp.totalSolved || 0) + 1;
        tp.solvedQuestionIds[q.id] = true;
        const skill = q.skill || state.practiceFilter || 'general';
        tp.categorySolved[skill] = (tp.categorySolved[skill] || 0) + 1;
      }
      tp.accuracy = Math.round(((tp.totalSolved || 0) / tp.totalAttempted) * 100);

      // Update topic-specific speed counts
      if (state.currentTopic === 'tables_speed_master') {
        if (isCorrect) {
          state.tablesPracticeSolvedCount = (state.tablesPracticeSolvedCount || 0) + 1;
        }
        updateTablesMasteryStars();
      } else if (state.currentTopic === 'fractions_master') {
        if (isCorrect) {
          state.fractionsPracticeSolvedCount = (state.fractionsPracticeSolvedCount || 0) + 1;
        }
        updateFractionsMasteryStars();
      }

      evaluateAndAwardStars(state.currentTopic);
      saveActiveState();
    });
  });

  // Roll new numbers button handler
  container.querySelector('#btn-roll-new-numbers')?.addEventListener('click', () => {
    playClickSound();
    if (state.currentTopic === 'tables_speed_master' && state.tablesPracticeQueue) {
      state.tablesPracticeQueue[state.currentQuestionIndex] = generateDynamicTableQuestion(state.practiceFilter);
      delete state.userAnswers[q.id];
      saveActiveState();
      renderViewport();
    } else if (state.currentTopic === 'fractions_master' && state.fractionsPracticeQueue) {
      state.fractionsPracticeQueue[state.currentQuestionIndex] = generateDynamicFractionQuestion(state.practiceFilter);
      delete state.userAnswers[q.id];
      saveActiveState();
      renderViewport();
    }
  });

  // Navigation handlers
  container.querySelector('#btn-prev-q')?.addEventListener('click', () => {
    playClickSound();
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex--;
      saveActiveState();
      renderViewport();
    }
  });

  container.querySelector('#btn-next-q')?.addEventListener('click', () => {
    playClickSound();
    const qs = getFilteredPracticeQuestions();
    if (state.currentQuestionIndex < qs.length - 1) {
      state.currentQuestionIndex++;
      saveActiveState();
      renderViewport();
    } else if (state.currentTopic === 'tables_speed_master') {
      state.tablesPracticeQueue.push(...generateTablesPracticeQueue(state.practiceFilter, 10));
      state.currentQuestionIndex++;
      saveActiveState();
      renderViewport();
    } else if (state.currentTopic === 'fractions_master') {
      state.fractionsPracticeQueue.push(...generateFractionsPracticeQueue(state.practiceFilter, 10));
      state.currentQuestionIndex++;
      saveActiveState();
      renderViewport();
    }
  });
}

/* --------------------------------------------------------------------------
   CHALLENGE MODE RENDERER (60-Second Speed Quiz)
   -------------------------------------------------------------------------- */

function startChallenge() {
  state.challengeActive = true;
  state.challengeTimeLeft = 60;
  state.challengeIndex = 0;
  state.challengeCorrect = 0;

  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
  if (state.currentTopic === 'tables_speed_master') {
    state.challengeQuestions = generateDynamicChallengePool(10);
  } else if (state.currentTopic === 'fractions_master') {
    state.challengeQuestions = generateDynamicFractionChallengePool(10);
  } else {
    const pool = currentConfig.challengePool || currentConfig.practicePool;
    state.challengeQuestions = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
  }

  if (state.challengeTimerId) clearInterval(state.challengeTimerId);

  state.challengeTimerId = setInterval(() => {
    state.challengeTimeLeft--;
    const timerElem = document.getElementById('challenge-timer-sec');
    const timerCircle = document.getElementById('timer-circle');
    if (timerElem) {
      timerElem.textContent = state.challengeTimeLeft;
      if (state.challengeTimeLeft <= 10 && timerCircle) {
        timerCircle.classList.add('warning');
      }
    }

    if (state.challengeTimeLeft <= 0) {
      clearInterval(state.challengeTimerId);
      endChallenge();
    }
  }, 1000);

  renderViewport();
}

function endChallenge() {
  state.challengeActive = false;
  if (state.challengeTimerId) clearInterval(state.challengeTimerId);

  const totalQ = state.challengeQuestions.length || 10;
  const accuracy = Math.round((state.challengeCorrect / totalQ) * 100);

  state.topicProgress = state.topicProgress || {};
  const tp = state.topicProgress[state.currentTopic] = state.topicProgress[state.currentTopic] || {};
  tp.challengeHighScore = Math.max(tp.challengeHighScore || 0, state.challengeCorrect);
  tp.challengeAccuracy = Math.max(tp.challengeAccuracy || 0, accuracy);

  if (state.currentTopic === 'tables_speed_master') {
    state.tablesChallengeHighScore = Math.max(state.tablesChallengeHighScore || 0, accuracy);
    updateTablesMasteryStars();
  } else if (state.currentTopic === 'fractions_master') {
    state.fractionsChallengeHighScore = Math.max(state.fractionsChallengeHighScore || 0, accuracy);
    updateFractionsMasteryStars();
  }

  const topicStars = evaluateAndAwardStars(state.currentTopic);
  saveActiveState();
  showResultsModal(state.challengeCorrect, totalQ, topicStars);
}

function renderChallengeView(container) {
  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;

  if (!state.challengeActive) {
    const masteryBannerHtml = renderTopicMasteryBanner(currentConfig);
    container.innerHTML = `
      <div class="challenge-container">
        ${masteryBannerHtml}
        <div class="challenge-header-card" style="text-align: center; flex-direction: column; gap: 1rem;">
          <div style="font-size: 3rem;">🎯</div>
          <h3>60-Second Speed Sprint</h3>
          <p style="color: var(--text-muted); max-width: 500px;">
            Test your quick mental math skills on <strong>${currentConfig.title}</strong>! Answer rapid questions in 60 seconds to unlock Speed Sprint mastery stars and verify your exam agility!
          </p>
          <button class="btn btn-primary" id="btn-start-challenge" style="padding: 0.8rem 2rem; font-size: 1.1rem;">
            🚀 Start 60s Challenge
          </button>
        </div>
      </div>
    `;

    bindMasteryBannerEvents(container, currentConfig.id);

    container.querySelector('#btn-start-challenge').addEventListener('click', () => {
      playClickSound();
      startChallenge();
    });
    return;
  }

  const q = state.challengeQuestions[state.challengeIndex];
  if (!q) {
    endChallenge();
    return;
  }

  // Ensure no residual focus from previous question causes accidental selection highlight
  if (document.activeElement && typeof document.activeElement.blur === 'function') {
    document.activeElement.blur();
  }

  container.innerHTML = `
    <div class="challenge-container">
      <div class="challenge-header-card">
        <div class="timer-wrap">
          <div class="timer-circle ${state.challengeTimeLeft <= 10 ? 'warning' : ''}" id="timer-circle">
            <span id="challenge-timer-sec">${state.challengeTimeLeft}</span>s
          </div>
          <div>
            <strong>Time Remaining</strong>
            <p style="font-size: 0.8rem; color: var(--text-muted);">60-second countdown</p>
          </div>
        </div>

        <div style="display: flex; gap: 1rem;">
          <div class="stat-pill text-success">
            <span>Score:</span> <strong>${state.challengeCorrect} / ${state.challengeQuestions.length}</strong>
          </div>
          <div class="stat-pill">
            <span>Question:</span> <strong>${state.challengeIndex + 1} / ${state.challengeQuestions.length}</strong>
          </div>
        </div>
      </div>

      <div class="question-card" style="margin-top: 1.25rem;">
        <div class="question-header">
          <span class="question-num">Challenge Question ${state.challengeIndex + 1}</span>
          <span class="question-source-tag">Rapid Fire</span>
        </div>

        <div class="question-prompt" style="font-size: 1.25rem;">${q.question}</div>

        <div class="options-grid">
          ${q.options.map((opt, optIdx) => `
            <button class="option-btn" data-opt-idx="${optIdx}" id="challenge-opt-${state.challengeIndex}-${optIdx}">
              <span class="option-label">${String.fromCharCode(65 + optIdx)}</span>
              <span class="option-text">${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Explicitly ensure new buttons start completely unfocused and clean
  container.querySelectorAll('.option-btn').forEach(b => {
    b.blur();
    b.classList.remove('correct', 'wrong');
  });

  // Attach option clicks
  let answered = false;
  container.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;

      if (typeof btn.blur === 'function') btn.blur();

      const selectedIdx = parseInt(btn.getAttribute('data-opt-idx'));
      const isCorrect = selectedIdx === q.correct;
      const flash = document.getElementById('feedback-flash');

      container.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

      if (isCorrect) {
        state.challengeCorrect++;
        btn.classList.add('correct');
        playCorrectSound();
        flash.className = 'feedback-flash correct';
      } else {
        btn.classList.add('wrong');
        playWrongSound();
        flash.className = 'feedback-flash wrong';
        const correctBtn = container.querySelector(`#challenge-opt-${state.challengeIndex}-${q.correct}`);
        if (correctBtn) correctBtn.classList.add('correct');
      }

      setTimeout(() => { flash.className = 'feedback-flash'; }, 250);

      setTimeout(() => {
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
          document.activeElement.blur();
        }
        state.challengeIndex++;
        if (state.challengeIndex < state.challengeQuestions.length) {
          renderViewport();
        } else {
          endChallenge();
        }
      }, 500);
    });
  });
}

/* --------------------------------------------------------------------------
   WORKSHEET VIEW RENDERERS (Topic 1 & Topic 2)
   -------------------------------------------------------------------------- */

function renderWorksheetView(container) {
  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
  if (currentConfig.worksheetRenderer) {
    currentConfig.worksheetRenderer(container);
  } else {
    renderWorksheetViewTopic1(container);
  }
}


/* ==========================================================================
   TERM REVISION LEARN MODULE RENDERERS
   ========================================================================== */

function renderBlueprintOverviewModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 CBSE Examination Strategy — How to Score Full Marks</div>
      <p>A CBSE Class 5 Mathematics examination tests <strong>conceptual reasoning, calculation accuracy, and neat geometric constructions</strong>. Don't rush into lengthy scratchpad calculations — first identify boundary rules, divisibility shortcuts, and formula relationships to eliminate impossible answers!</p>
    </div>

    <!-- Chapter Weightage Breakdown Table -->
    <div style="margin: 1.25rem 0;">
      <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">📋 CBSE Class 5 Term 1 Curriculum Blueprint (Total: 50 Marks)</h4>
      <div class="diff-table-wrap">
        <table class="diff-table">
          <thead>
            <tr>
              <th style="width: 25%;">Chapter</th>
              <th style="width: 35%;">Key Competencies & Question Types</th>
              <th style="width: 20%;">Recommended Marks</th>
              <th style="width: 20%;">Estimated Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Multiples, Factors, HCF & LCM</strong></td>
              <td>HCF (The Equal Cutter) vs LCM (Cycle Synchronizer) word problems, prime factorization, co-prime tests, product formula (a × b = HCF × LCM)</td>
              <td><span class="badge badge-active" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24;">12 Marks</span></td>
              <td>25 mins</td>
            </tr>
            <tr>
              <td><strong>2. Divisibility Rules (2 to 12)</strong></td>
              <td>Mental divisibility tests for composite numbers (6, 12, 15), missing-digit puzzles (*), alternating sum rule for 11</td>
              <td><span class="badge badge-active" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24;">8 Marks</span></td>
              <td>15 mins</td>
            </tr>
            <tr>
              <td><strong>3. Expressions & Statements (BODMAS)</strong></td>
              <td>Translating verbal statements to algebraic expressions, bracket priority traps, multi-step BODMAS operations</td>
              <td><span class="badge badge-active" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24;">10 Marks</span></td>
              <td>20 mins</td>
            </tr>
            <tr>
              <td><strong>4. Number Patterns & Towers</strong></td>
              <td>Growing differences, triangular numbers formula T = n(n+1)/2, square numbers, 3-number set triplets, number pyramids</td>
              <td><span class="badge badge-active" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24;">8 Marks</span></td>
              <td>15 mins</td>
            </tr>
            <tr>
              <td><strong>5. Geometry, Shapes & Angles</strong></td>
              <td>Clock angles (30°/hour), polygon interior sum (n−2)×180°, triangle classification, circle radius (r = d/2), compass & ruler constructions</td>
              <td><span class="badge badge-active" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24;">12 Marks</span></td>
              <td>25 mins</td>
            </tr>
            <tr style="background: rgba(99, 102, 241, 0.15); font-weight: 700;">
              <td><strong>TOTAL ASSESSMENT</strong></td>
              <td><strong>Comprehensive Multi-Topic Evaluation</strong></td>
              <td><strong style="color: #86efac;">50 Marks</strong></td>
              <td><strong style="color: #86efac;">100 Mins (+20 min buffer)</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Exam Time Allocation Phasing -->
    <div style="margin-top: 1.5rem;">
      <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">⏱️ 4-Phase Exam Time Allocation Strategy</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.85rem;">
        <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 1rem;">
          <div style="font-weight: 700; color: #86efac; margin-bottom: 0.35rem;">Phase 1 (0 – 25 mins)</div>
          <div style="font-size: 0.85rem; color: #e2e8f0; font-weight: 600;">Direct Objective & 1-Mark Questions</div>
          <p style="font-size: 0.78rem; color: #94a3b8; margin: 0.35rem 0 0 0;">Solve all divisibility checks, definitions, missing-digit puzzles, and pattern series while your mind is freshest.</p>
        </div>
        <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 1rem;">
          <div style="font-weight: 700; color: #38bdf8; margin-bottom: 0.35rem;">Phase 2 (25 – 60 mins)</div>
          <div style="font-size: 0.85rem; color: #e2e8f0; font-weight: 600;">BODMAS & Word Problems</div>
          <p style="font-size: 0.78rem; color: #94a3b8; margin: 0.35rem 0 0 0;">Carefully write step-by-step BODMAS evaluations and HCF/LCM word problems with units (meters, seconds, tiles).</p>
        </div>
        <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 1rem;">
          <div style="font-weight: 700; color: #fbbf24; margin-bottom: 0.35rem;">Phase 3 (60 – 90 mins)</div>
          <div style="font-size: 0.85rem; color: #e2e8f0; font-weight: 600;">Geometric Constructions & Proofs</div>
          <p style="font-size: 0.78rem; color: #94a3b8; margin: 0.35rem 0 0 0;">Draw line segments, angles with protractors, and compass circles with sharp pencils. Label center O and radius r.</p>
        </div>
        <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 1rem;">
          <div style="font-weight: 700; color: #c084fc; margin-bottom: 0.35rem;">Phase 4 (90 – 120 mins)</div>
          <div style="font-size: 0.85rem; color: #e2e8f0; font-weight: 600;">Diagnostic Revision & Verification</div>
          <p style="font-size: 0.78rem; color: #94a3b8; margin: 0.35rem 0 0 0;">Check every question: Did you write units? Did you check HCF ≤ min and LCM ≥ max? Did you verify triangle sum = 180°?</p>
        </div>
      </div>
    </div>
  `;
}

function renderFormulaCheatsheetModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 Grand Mental Formula Reference — Memorize Concepts, Not Rote Words</div>
      <p>Here is your complete Class 5 mathematical toolbox. Every formula is anchored to a visual or mental metaphor to guarantee you never blank out during an exam!</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1.25rem;">
      <!-- Chapter 1 Box -->
      <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 1.2rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
          <span style="font-size: 1.3rem;">⭐</span>
          <h4 style="color: var(--accent-amber-light); margin: 0;">1. Factors & Multiples Formulas</h4>
        </div>
        <ul style="font-size: 0.85rem; color: #e2e8f0; padding-left: 1.2rem; line-height: 1.55; margin: 0;">
          <li><strong>Product Formula:</strong> <code>First Number × Second Number = HCF × LCM</code></li>
          <li><strong>HCF Boundary:</strong> <code>HCF(a, b) ≤ Smaller Number</code> (Chopping down)</li>
          <li><strong>LCM Boundary:</strong> <code>LCM(a, b) ≥ Larger Number</code> (Growing up)</li>
          <li><strong>Multiple Rule:</strong> If b is a multiple of a (e.g. 7 & 35): <code>HCF = a (7)</code>, <code>LCM = b (35)</code></li>
          <li><strong>Co-prime Rule:</strong> Two numbers are co-prime if their only common factor is 1 (<code>HCF = 1</code>).</li>
          <li><strong>Consecutive Rule:</strong> Any two consecutive integers (n, n+1) are ALWAYS co-prime!</li>
        </ul>
      </div>

      <!-- Chapter 2 Box -->
      <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; padding: 1.2rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
          <span style="font-size: 1.3rem;">⚡</span>
          <h4 style="color: #38bdf8; margin: 0;">2. Divisibility Master Tests</h4>
        </div>
        <ul style="font-size: 0.85rem; color: #e2e8f0; padding-left: 1.2rem; line-height: 1.55; margin: 0;">
          <li><strong>Rule 3 & 9:</strong> Sum of digits is a multiple of 3 or 9.</li>
          <li><strong>Rule 4:</strong> Last 2 digits form a multiple of 4 (e.g., ...16, ...48, ...00).</li>
          <li><strong>Rule 8:</strong> Last 3 digits form a multiple of 8 (e.g., ...128, ...000).</li>
          <li><strong>Rule 6 (Composite):</strong> Must be EVEN (divisible by 2) AND sum of digits divisible by 3.</li>
          <li><strong>Rule 11 (Alternating):</strong> <code>|Sum(odd positions) − Sum(even positions)| = 0 or multiple of 11</code>.</li>
          <li><strong>Rule 12 (Composite):</strong> Must pass BOTH Rule 3 and Rule 4 simultaneously.</li>
          <li><strong>Rule 15 (Composite):</strong> Must end in 0 or 5 (passes 5) AND digit sum passes 3.</li>
        </ul>
      </div>

      <!-- Chapter 3 Box -->
      <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; padding: 1.2rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
          <span style="font-size: 1.3rem;">💬</span>
          <h4 style="color: #c084fc; margin: 0;">3. Expressions & BODMAS Order</h4>
        </div>
        <ul style="font-size: 0.85rem; color: #e2e8f0; padding-left: 1.2rem; line-height: 1.55; margin: 0;">
          <li><strong>B — Brackets:</strong> Evaluate inside (parentheses) first!</li>
          <li><strong>O — Of:</strong> "Of" means multiplication (e.g. 1/2 of 50 = 25).</li>
          <li><strong>DM — Division & Multiplication:</strong> Work left to right with equal precedence.</li>
          <li><strong>AS — Addition & Subtraction:</strong> Work left to right with equal precedence.</li>
          <li><strong>Subtraction Reversal Trap:</strong> "Subtract a from b" means <code>b − a</code> (NEVER a − b)!</li>
          <li><strong>"Product of sum":</strong> Requires brackets: <code>(x + y) × (p − q)</code>.</li>
        </ul>
      </div>

      <!-- Chapter 4 Box -->
      <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 12px; padding: 1.2rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
          <span style="font-size: 1.3rem;">🧩</span>
          <h4 style="color: #86efac; margin: 0;">4. Pattern & Tower Rules</h4>
        </div>
        <ul style="font-size: 0.85rem; color: #e2e8f0; padding-left: 1.2rem; line-height: 1.55; margin: 0;">
          <li><strong>Triangular Numbers:</strong> <code>1, 3, 6, 10, 15, 21, 28, 36...</code> Formula: <code>T = n(n + 1) ÷ 2</code></li>
          <li><strong>Square Numbers:</strong> <code>1, 4, 9, 16, 25, 36, 49, 64...</code> Formula: <code>S = n²</code></li>
          <li><strong>Geometric Theorem:</strong> <code>T_{n-1} + T_n = n²</code> (Sum of consecutive triangulars makes square!)</li>
          <li><strong>Odd Numbers Sum:</strong> Sum of first n odd numbers = <code>n²</code> (1+3+5+7 = 4² = 16).</li>
          <li><strong>Number Towers:</strong> Block above = sum of 2 blocks below. In base [a, b, c], top = <code>a + 2b + c</code>.</li>
          <li><strong>3-Number Sets (Triplets):</strong> Watch for doubling 3rd term (3→6→12→24) or product rule (a, b, a×b).</li>
        </ul>
      </div>

      <!-- Chapter 5 Box -->
      <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 1.2rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
          <span style="font-size: 1.3rem;">📐</span>
          <h4 style="color: #f87171; margin: 0;">5. Geometry & Spatial Formulas</h4>
        </div>
        <ul style="font-size: 0.85rem; color: #e2e8f0; padding-left: 1.2rem; line-height: 1.55; margin: 0;">
          <li><strong>Clock Hands Formula:</strong> <code>Each 1-hour step = 30°</code> (360° ÷ 12 = 30°). At 3:00 = 90°, at 6:00 = 180°.</li>
          <li><strong>Triangle Angle Sum:</strong> Sum of all 3 angles = <code>180°</code>. Can have at most 1 right/obtuse angle!</li>
          <li><strong>Polygon Triangulation:</strong> Interior Angle Sum = <code>(n − 2) × 180°</code> (Quadrilateral=360°, Nonagon=1260°).</li>
          <li><strong>Circle Anatomy:</strong> <code>d = 2r</code>, <code>r = d ÷ 2</code>. Longest chord is the diameter.</li>
          <li><strong>Quadrilateral Angle Sum:</strong> Sum of 4 angles = <code>360°</code>.</li>
          <li><strong>Parallelogram Rules:</strong> Opposite angles are equal; adjacent angles are supplementary (add to 180°).</li>
        </ul>
      </div>
    </div>
  `;
}

function renderTopExamTrapsModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">🚨 Spot the Exam Trap — Develop Immunity Against Mistakes</div>
      <p>Teachers across India report that over 80% of lost marks in Class 5 exams come from the same recurring traps! Study these 6 classic traps to safeguard your score.</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.25rem;">
      <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 12px; padding: 1rem 1.25rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <strong style="color: #fca5a5; font-size: 1rem;">🚨 Trap 1: "Subtracted From" Order Inversion</strong>
          <span class="badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">Algebra Trap</span>
        </div>
        <div style="font-size: 0.85rem; color: #f8fafc; margin-bottom: 0.35rem;">
          <strong>Question:</strong> "Subtract 9 from twice a number y."
        </div>
        <div style="font-size: 0.82rem; color: #f87171;">❌ <strong>Student Blunder:</strong> Writing <code>9 − 2y</code> (reading words left-to-right mechanically).</div>
        <div style="font-size: 0.82rem; color: #86efac; margin-top: 0.2rem;">✅ <strong>Golden Rule:</strong> The word <em>from</em> means start with the second quantity! Correct: <code>2y − 9</code>.</div>
      </div>

      <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 12px; padding: 1rem 1.25rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <strong style="color: #fde68a; font-size: 1rem;">🚨 Trap 2: HCF vs LCM Word Problem Confusion</strong>
          <span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">Arithmetic Trap</span>
        </div>
        <div style="font-size: 0.85rem; color: #f8fafc; margin-bottom: 0.35rem;">
          <strong>Question:</strong> "Two bells toll every 12 minutes and 18 minutes. When do they toll together next?"
        </div>
        <div style="font-size: 0.82rem; color: #f87171;">❌ <strong>Student Blunder:</strong> Finding HCF(12, 18) = 6 minutes (thinking they toll together in less time!).</div>
        <div style="font-size: 0.82rem; color: #86efac; margin-top: 0.2rem;">✅ <strong>Golden Rule:</strong> Repeating cycles meet in the future at a larger multiple! Use LCM(12, 18) = 36 minutes.</div>
      </div>

      <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 12px; padding: 1rem 1.25rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <strong style="color: #bae6fd; font-size: 1rem;">🚨 Trap 3: Rule of 6 Partial Verification</strong>
          <span class="badge" style="background: rgba(56, 189, 248, 0.2); color: #bae6fd;">Divisibility Trap</span>
        </div>
        <div style="font-size: 0.85rem; color: #f8fafc; margin-bottom: 0.35rem;">
          <strong>Question:</strong> "Is 45,615 divisible by 6?"
        </div>
        <div style="font-size: 0.82rem; color: #f87171;">❌ <strong>Student Blunder:</strong> Sum of digits is 4+5+6+1+5=21 (divisible by 3) so student writes "Yes"!</div>
        <div style="font-size: 0.82rem; color: #86efac; margin-top: 0.2rem;">✅ <strong>Golden Rule:</strong> 6 is a composite number (2 × 3). A number MUST be EVEN to be divisible by 6. Since 45,615 is odd, it fails immediately!</div>
      </div>

      <div style="background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.25); border-radius: 12px; padding: 1rem 1.25rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <strong style="color: #e9d5ff; font-size: 1rem;">🚨 Trap 4: Compass Diameter Radius Confusion</strong>
          <span class="badge" style="background: rgba(168, 85, 247, 0.2); color: #e9d5ff;">Geometry Trap</span>
        </div>
        <div style="font-size: 0.85rem; color: #f8fafc; margin-bottom: 0.35rem;">
          <strong>Question:</strong> "Draw a circle of diameter 10 cm using a compass."
        </div>
        <div style="font-size: 0.82rem; color: #f87171;">❌ <strong>Student Blunder:</strong> Opening compass legs to 10 cm, resulting in an enormous 20 cm circle!</div>
        <div style="font-size: 0.82rem; color: #86efac; margin-top: 0.2rem;">✅ <strong>Golden Rule:</strong> A compass ALWAYS measures the RADIUS, never diameter. First calculate <code>r = d ÷ 2 = 10 ÷ 2 = 5 cm</code>!</div>
      </div>

      <div style="background: rgba(34, 197, 94, 0.08); border: 1px solid rgba(34, 197, 94, 0.25); border-radius: 12px; padding: 1rem 1.25rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <strong style="color: #bbf7d0; font-size: 1rem;">🚨 Trap 5: Two Right Angles in a Triangle Fallacy</strong>
          <span class="badge" style="background: rgba(34, 197, 94, 0.2); color: #bbf7d0;">Geometry Trap</span>
        </div>
        <div style="font-size: 0.85rem; color: #f8fafc; margin-bottom: 0.35rem;">
          <strong>Question:</strong> "Can a triangle have two right angles or two obtuse angles?"
        </div>
        <div style="font-size: 0.82rem; color: #f87171;">❌ <strong>Student Blunder:</strong> Writing "Yes, if it is a large triangle."</div>
        <div style="font-size: 0.82rem; color: #86efac; margin-top: 0.2rem;">✅ <strong>Golden Rule:</strong> Triangle angle sum is strictly 180°. Two 90° angles already equal 180°, leaving 0° for the third angle! The two lines would be parallel and never close into a triangle.</div>
      </div>
    </div>
  `;
}


/* ==========================================================================
   CUSTOM WORKSHEET BUILDER & REVISION VIEW (TOPIC: term_revision)
   ========================================================================== */

const REVISION_TOPICS_METADATA = [
  {
    id: 'factors_multiples_hcf_lcm',
    icon: '⭐',
    title: '1. Multiples, Factors, HCF & LCM',
    desc: 'HCF division, LCM word problems, product relation, co-prime verification',
    questionsCount: 4,
    marks: 10,
    badge: '10 Marks'
  },
  {
    id: 'divisibility_rules',
    icon: '⚡',
    title: '2. Divisibility Rules (2 to 12)',
    desc: 'Divisibility by 15, simultaneous rules (4, 6, 10), missing digits (*), rule 11',
    questionsCount: 4,
    marks: 10,
    badge: '10 Marks'
  },
  {
    id: 'expressions_statements',
    icon: '💬',
    title: '3. Expressions & Statements (BODMAS)',
    desc: 'BODMAS step-by-step evaluations, verbal statement translation, bracket traps',
    questionsCount: 4,
    marks: 10,
    badge: '10 Marks'
  },
  {
    id: 'number_patterns',
    icon: '🧩',
    title: '4. Number Patterns & Towers',
    desc: '3-number set triplets, triangular/square dot numbers, pyramids, magic squares',
    questionsCount: 3,
    marks: 10,
    badge: '10 Marks'
  },
  {
    id: 'geometry_angles',
    icon: '📐',
    title: '5. Geometry, Shapes, Angles & Circles',
    desc: 'Collinear points, clock angles (30°/hr), polygon triangulation, compass circle',
    questionsCount: 4,
    marks: 10,
    badge: '10 Marks'
  }
];

function renderWorksheetViewRevision(container) {
  function getSelectedTopics() {
    return state.revisionSelectedTopics || [];
  }

  function calculateMetrics() {
    const selected = getSelectedTopics();
    const count = selected.length;
    const questions = selected.reduce((acc, tid) => {
      const meta = REVISION_TOPICS_METADATA.find(t => t.id === tid);
      return acc + (meta ? meta.questionsCount : 0);
    }, 0);
    const marks = count * 10;
    const mins = count * 18;
    return { count, questions, marks, mins };
  }

  function updatePreviewHTML() {
    const previewContainer = container.querySelector('#worksheet-preview-container');
    if (!previewContainer) return;

    const selected = getSelectedTopics();
    if (selected.length === 0) {
      previewContainer.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">📋</span>
          <h4 style="color: #e2e8f0; margin-bottom: 0.25rem;">No Topics Selected</h4>
          <p style="font-size: 0.88rem;">Select at least one curriculum chapter above to generate your customized worksheet.</p>
        </div>
      `;
      return;
    }

    let html = '';
    let sectionNum = 1;
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];

    selected.forEach((tid) => {
      const roman = romanNumerals[sectionNum - 1] || sectionNum;
      sectionNum++;

      if (tid === 'factors_multiples_hcf_lcm') {
        html += `
          <div style="margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px dashed rgba(255, 255, 255, 0.1);">
            <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">${roman}. Multiples, Factors, HCF & LCM (10 Marks):</h4>
            <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem;">
              <li><strong>HCF by Division:</strong> Find the HCF of 48 and 72 using the continuous division method.</li>
              <li><strong>LCM Cycle Synchronizer:</strong> Three bells toll together at intervals of 9, 12, and 15 minutes. After how many minutes will they toll together again?</li>
              <li><strong>Product Relationship:</strong> The product of two numbers is 840 and their HCF is 4. Find their LCM. Verify using: <code>a × b = HCF × LCM</code>.</li>
              <li><strong>Co-prime Verification:</strong> Show whether 14 and 15 are co-prime numbers. Give mathematical proof.</li>
            </ol>
          </div>
        `;
      } else if (tid === 'divisibility_rules') {
        html += `
          <div style="margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px dashed rgba(255, 255, 255, 0.1);">
            <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">${roman}. Divisibility Rules & Mental Shortcuts (10 Marks):</h4>
            <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem;">
              <li><strong>Divisibility by 15:</strong> Check the divisibility of <code>37,42,582</code> by 15 without doing long division. Give clear reasons.</li>
              <li><strong>Simultaneous Multi-Rule Check:</strong> Check which among the following numbers are divisible by 4, 6, and 10 simultaneously:
                <br>a) 12,480 &nbsp;&nbsp;&nbsp;&nbsp; b) 98,760 &nbsp;&nbsp;&nbsp;&nbsp; c) 75,310
              </li>
              <li><strong>Missing Digit for 9:</strong> In the number <code>4*78</code>, find the smallest digit in place of * so that the number is divisible by 9.</li>
              <li><strong>Rule 11 Alternating Test:</strong> Test whether <code>9,28,477</code> is divisible by 11 using the difference of alternating digit sums.</li>
            </ol>
          </div>
        `;
      } else if (tid === 'expressions_statements') {
        html += `
          <div style="margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px dashed rgba(255, 255, 255, 0.1);">
            <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">${roman}. Expressions, Statements & BODMAS (10 Marks):</h4>
            <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem;">
              <li><strong>BODMAS Step-by-Step Evaluation:</strong>
                <br>a) <code>28 + 45 ÷ 9 × 2 − 10</code>
                <br>b) <code>(48 − 35) × 2 + 30 ÷ 15</code>
              </li>
              <li><strong>Verbal Statements to Expressions:</strong>
                <br>a) 45 is divided by the sum of 2 and 3.
                <br>b) The sum of 56 and 4 is multiplied by the difference of 11 and 10.
              </li>
              <li><strong>Write in Words:</strong> Write the verbal statement for <code>(2 × 5) − 6</code> and <code>(90 − 30) ÷ (30 − 20)</code>.</li>
              <li><strong>Insert Parentheses:</strong> Place parentheses in <code>4 + 6 × 3 − 2</code> so that the answer equals 28.</li>
            </ol>
          </div>
        `;
      } else if (tid === 'number_patterns') {
        html += `
          <div style="margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px dashed rgba(255, 255, 255, 0.1);">
            <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">${roman}. Number Patterns, Triplets & Towers (10 Marks):</h4>
            <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem;">
              <li><strong>Pattern Sequences & 3-Number Sets:</strong>
                <br>a) <code>3, 7, 11, 15, ____, ____</code> &nbsp; (Rule: ____________)
                <br>b) <code>1, 2, 3; 2, 3, 6; 3, 4, 12; _______, _______</code> &nbsp; (Rule: ____________)
                <br>c) <code>(1, 2, 2), (2, 3, 6), (3, 4, 12), _______, (5, 6, 30)</code> &nbsp; (Rule: ____________)
              </li>
              <li><strong>Triangular & Square Numbers:</strong>
                <br>a) Write the first 6 triangular numbers.
                <br>b) Show that the sum of the 3rd triangular number (6) and 4th triangular number (10) equals a square number. Which square?
              </li>
              <li><strong>Number Tower Pyramid:</strong> Complete a 4-tier number pyramid with base row <code>[2, 3, 4, 5]</code> where each block is the sum of the two blocks directly beneath it.</li>
            </ol>
          </div>
        `;
      } else if (tid === 'geometry_angles') {
        html += `
          <div style="margin-bottom: 1.5rem;">
            <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">${roman}. Geometry, Shapes, Angles & Constructions (10 Marks):</h4>
            <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem;">
              <li><strong>Collinear Points & Lines:</strong> What figure is formed by connecting 3 collinear points? What if they are non-collinear?</li>
              <li><strong>Clock Angle Detective:</strong> Find the smaller angle between hour and minute hands at:
                <br>a) 3:00 o'clock &nbsp;&nbsp;&nbsp;&nbsp; b) 8:00 o'clock &nbsp;&nbsp;&nbsp;&nbsp; c) 1:00 o'clock &nbsp;&nbsp;&nbsp;&nbsp; (Formula: 30° per hour)
              </li>
              <li><strong>Polygon Triangulation:</strong> Using the formula <code>(n − 2) × 180°</code>, find the interior angle sum of an octagon (8-sided polygon) and a nonagon (9-sided polygon).</li>
              <li><strong>Practical Construction:</strong> Draw a circle of radius 4.5 cm (diameter = 9 cm) using a compass and ruler. Mark center O, radius OA, and diameter BOC.</li>
            </ol>
          </div>
        `;
      }
    });

    previewContainer.innerHTML = html;
  }

  function updateMetricsUI() {
    const { count, questions, marks, mins } = calculateMetrics();
    const countEl = container.querySelector('#builder-selected-count');
    const qEl = container.querySelector('#builder-total-questions');
    const marksEl = container.querySelector('#builder-total-marks');
    const timeEl = container.querySelector('#builder-est-time');

    if (countEl) countEl.textContent = `${count} of ${REVISION_TOPICS_METADATA.length}`;
    if (qEl) qEl.textContent = `${questions} Questions`;
    if (marksEl) marksEl.textContent = `${marks} Marks`;
    if (timeEl) timeEl.textContent = `${mins} Mins`;

    // Update card styles
    const selected = getSelectedTopics();
    container.querySelectorAll('.topic-check-card').forEach(card => {
      const tid = card.getAttribute('data-topic-id');
      const isChecked = selected.includes(tid);
      card.classList.toggle('checked', isChecked);
      const chk = card.querySelector('input[type="checkbox"]');
      if (chk) chk.checked = isChecked;
    });

    updatePreviewHTML();
  }

  container.innerHTML = `
    <div class="learn-container">
      <!-- Builder Controls Card -->
      <div class="worksheet-builder-controls">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem;">
          <div>
            <h3 style="margin: 0; font-size: 1.25rem; color: var(--text-main);">📋 Custom Worksheet & Exam Builder</h3>
            <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">
              Cherry-pick chapters below to compile a customized revision worksheet or comprehensive term exam.
            </p>
          </div>
          <button class="btn btn-primary" id="btn-print-custom-revision" style="display: flex; align-items: center; gap: 0.4rem; padding: 0.6rem 1.25rem;">
            <span>🖨️</span> Print Custom Worksheet
          </button>
        </div>

        <!-- Presets Row -->
        <div class="builder-presets">
          <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-right: 0.25rem;">Presets:</span>
          <button class="builder-preset-btn" data-preset="all">🌟 Full Term Exam (All 5)</button>
          <button class="builder-preset-btn" data-preset="arithmetic">🔢 Pure Arithmetic (Ch 1 & 2)</button>
          <button class="builder-preset-btn" data-preset="geometry">📐 Geometry & Patterns (Ch 4 & 5)</button>
          <button class="builder-preset-btn" data-preset="bodmas">⚡ BODMAS & Operations (Ch 1 & 3)</button>
          <button class="builder-preset-btn" data-preset="toggle">🔄 Toggle All</button>
        </div>

        <!-- Cherry-Pick Grid -->
        <div class="topic-check-grid">
          ${REVISION_TOPICS_METADATA.map(t => `
            <div class="topic-check-card ${getSelectedTopics().includes(t.id) ? 'checked' : ''}" data-topic-id="${t.id}">
              <input type="checkbox" ${getSelectedTopics().includes(t.id) ? 'checked' : ''} aria-label="${t.title}">
              <div class="topic-check-card-info">
                <div class="topic-check-card-title">${t.icon} ${t.title}</div>
                <div class="topic-check-card-meta">${t.desc}</div>
              </div>
              <span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); font-size: 0.75rem;">
                ${t.badge}
              </span>
            </div>
          `).join('')}
        </div>

        <!-- Summary Metrics Banner -->
        <div class="builder-summary-banner">
          <div class="builder-metrics">
            <div class="builder-metric-item">
              <span class="builder-metric-val" id="builder-selected-count">0 of 5</span>
              <span class="builder-metric-lbl">Chapters Chosen</span>
            </div>
            <div class="builder-metric-item">
              <span class="builder-metric-val" id="builder-total-questions">0 Questions</span>
              <span class="builder-metric-lbl">Total Tasks</span>
            </div>
            <div class="builder-metric-item">
              <span class="builder-metric-val" id="builder-total-marks">0 Marks</span>
              <span class="builder-metric-lbl">Total Weight</span>
            </div>
            <div class="builder-metric-item">
              <span class="builder-metric-val" id="builder-est-time">0 Mins</span>
              <span class="builder-metric-lbl">Recommended Duration</span>
            </div>
          </div>
          <button class="btn btn-secondary" id="btn-reset-builder" style="font-size: 0.85rem; padding: 0.4rem 0.9rem;">
            🔄 Reset All
          </button>
        </div>
      </div>

      <!-- Live Dynamic Worksheet Preview Card -->
      <div class="learn-card">
        <div class="learn-card-header">
          <div>
            <h3>📄 Live Custom Worksheet Preview</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
              Class V Mathematics — Preview of compiled question sections ready for print
            </p>
          </div>
        </div>

        <div class="worksheet-preview" id="worksheet-preview-container">
          <!-- Dynamic Content Injected Here -->
        </div>
      </div>
    </div>
  `;

  // Attach card click handlers
  container.querySelectorAll('.topic-check-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const tid = card.getAttribute('data-topic-id');
      const isInput = e.target.tagName.toLowerCase() === 'input';
      let selected = [...getSelectedTopics()];

      if (selected.includes(tid)) {
        selected = selected.filter(id => id !== tid);
      } else {
        selected.push(tid);
      }

      state.revisionSelectedTopics = selected;
      saveActiveState();
      playClickSound();
      updateMetricsUI();
    });
  });

  // Attach preset handlers
  container.querySelectorAll('.builder-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-preset');
      playClickSound();

      if (preset === 'all') {
        state.revisionSelectedTopics = REVISION_TOPICS_METADATA.map(t => t.id);
      } else if (preset === 'arithmetic') {
        state.revisionSelectedTopics = ['factors_multiples_hcf_lcm', 'divisibility_rules'];
      } else if (preset === 'geometry') {
        state.revisionSelectedTopics = ['number_patterns', 'geometry_angles'];
      } else if (preset === 'bodmas') {
        state.revisionSelectedTopics = ['factors_multiples_hcf_lcm', 'expressions_statements'];
      } else if (preset === 'toggle') {
        if (state.revisionSelectedTopics.length === REVISION_TOPICS_METADATA.length) {
          state.revisionSelectedTopics = [];
        } else {
          state.revisionSelectedTopics = REVISION_TOPICS_METADATA.map(t => t.id);
        }
      }

      saveActiveState();
      updateMetricsUI();
    });
  });

  // Attach reset button
  const btnReset = container.querySelector('#btn-reset-builder');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      playClickSound();
      state.revisionSelectedTopics = REVISION_TOPICS_METADATA.map(t => t.id);
      saveActiveState();
      updateMetricsUI();
    });
  }

  // Attach print button
  const btnPrint = container.querySelector('#btn-print-custom-revision');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      printWorksheetRevision();
    });
  }

  // Initial calculation & render
  updateMetricsUI();
}

function renderWorksheetViewTopic1(container) {
  container.innerHTML = `
    <div class="learn-container">
      <div class="learn-card">
        <div class="learn-card-header">
          <div>
            <h3>📄 School Worksheet 2026-27 Practice Sheet</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
              CBSE Class 5 Curriculum — Topic: Multiples and Factors (Class V)
            </p>
          </div>
          <button class="btn btn-primary" id="btn-print-action">
            🖨️ Print Worksheet
          </button>
        </div>

        <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 1.5rem; border: 1px solid var(--border-glass);">
          <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">I. Fill in the Blanks:</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li>The smallest multiple of a number is ________________.</li>
            <li>The HCF of two coprime numbers is always ________________.</li>
            <li>Two prime numbers that differ by 2 are called ________________ prime numbers.</li>
            <li>The HCF of two numbers can never be ________________ than either of the numbers.</li>
            <li>The LCM of two numbers is always ________________ than or equal to each of the numbers.</li>
            <li>A number divisible by both 3 and 5 is always divisible by ________________.</li>
          </ol>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">II. Write True or False:</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li>Every number is a factor of itself. [ ________ ]</li>
            <li>The number 1248 is divisible by 4. [ ________ ]</li>
            <li>A prime number has exactly two factors. [ ________ ]</li>
            <li>Every multiple of 5 ends in 5 only. [ ________ ]</li>
          </ol>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">III. Solve the Following:</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
            <li>Find the smallest missing digit to make the number <strong>62 _ 178</strong> divisible by 9.</li>
            <li>Find the HCF of <strong>144, 216 and 288</strong> by short division method.</li>
            <li>Find the HCF of <strong>96, 144 and 192</strong> by long division method.</li>
            <li>Find the LCM of <strong>60, 72 and 90</strong> by short division method.</li>
            <li>The HCF of 12 and 18 is 6. Find their LCM.</li>
            <li>Find the HCF and LCM of 48 and 32. Compare their product with the product of the given numbers.</li>
            <li>The LCM of two numbers is 60 and their HCF is 5. If one number is 15, find the other number.</li>
            <li>Two numbers have HCF = 6 and LCM = 72. If one number is 18, find the other number.</li>
            <li>The product of two numbers is 240 and their HCF is 4. Find their LCM.</li>
            <li>Find the smallest number that is divisible by 8, 12 and 18.</li>
            <li>Find the greatest number that divides 36, 60 and 84 exactly.</li>
            <li>A teacher has 24 red pencils and 36 blue pencils. She wants to make identical sets using all pencils, with the same number of red and blue pencils in each set. What is the greatest number of sets she can make?</li>
            <li>Three traffic lights change at intervals of 20 seconds, 30 seconds and 45 seconds. If they change together at a particular moment, after how many seconds will they change together again?</li>
            <li>A shopkeeper has pencils packed in groups of 4 and erasers packed in groups of 6. What is the smallest number of pencils and erasers he needs so that both can be packed into complete groups?</li>
          </ol>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#btn-print-action').addEventListener('click', () => {
    printWorksheetTopic1();
  });
}

function renderWorksheetViewTopic2(container) {
  container.innerHTML = `
    <div class="learn-container">
      <div class="learn-card">
        <div class="learn-card-header">
          <div>
            <h3>📄 Divisibility Rules (2 to 12) Practice Sheet</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
              Class 5 CBSE — Mental Divisibility Checks, Missing Digits & Co-Prime Reasoning
            </p>
          </div>
          <button class="btn btn-primary" id="btn-print-action-t2">
            🖨️ Print Worksheet
          </button>
        </div>

        <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 1.5rem; border: 1px solid var(--border-glass);">
          <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">I. Divisibility Check Matrix (Put a tick ✓ or cross ✗):</h4>
          <table class="inspector-table" style="margin: 0.5rem 0 1.25rem 0; font-size: 0.85rem;">
            <thead>
              <tr>
                <th>Number</th>
                <th>÷ 2</th>
                <th>÷ 3</th>
                <th>÷ 4</th>
                <th>÷ 5</th>
                <th>÷ 6</th>
                <th>÷ 8</th>
                <th>÷ 9</th>
                <th>÷ 10</th>
                <th>÷ 11</th>
                <th>÷ 12</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>216</strong></td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td></tr>
              <tr><td><strong>504</strong></td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td></tr>
              <tr><td><strong>1,331</strong></td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td></tr>
              <tr><td><strong>2,520</strong></td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td></tr>
              <tr><td><strong>6,237</strong></td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td><td>[ &nbsp; ]</td></tr>
            </tbody>
          </table>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">II. Missing Digit Exam Problems (Show Step-by-Step Working):</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
            <li>Find the smallest missing digit to replace * in <strong>62 * 178</strong> so that it is divisible by 9.</li>
            <li>Find the smallest missing digit to replace * in <strong>71 * 2</strong> so that it is divisible by 6.</li>
            <li>Find the single digit to replace * in <strong>5 * 84</strong> so that it is divisible by 11.</li>
            <li>What is the smallest digit that can replace * in <strong>43 * 6</strong> so that it is divisible by 4?</li>
            <li>Find the missing digit in <strong>94 * 2</strong> so that it is divisible by 11.</li>
          </ol>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">III. Mathematical Reasoning & Co-Prime Law:</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
            <li>Explain why a number divisible by 12 must be tested with 3 and 4, and why testing with 2 and 6 fails. Give an example.</li>
            <li>If a number is divisible by 10, is it always divisible by 5? Why or why not?</li>
            <li>Is every number divisible by 3 also divisible by 9? Give two counterexamples.</li>
          </ol>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">IV. Word Problems:</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
            <li>A bakery baked 1,428 cookies. Can the baker pack them into boxes of 6 without any leftover cookies? Use divisibility rules to prove your answer.</li>
            <li>A school distributes 2,520 notebooks equally among 9 sections. Prove using divisibility rules whether each section gets an equal share with 0 left over.</li>
          </ol>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#btn-print-action-t2').addEventListener('click', () => {
    printWorksheetTopic2();
  });
}

function renderWorksheetViewTopic3(container) {
  container.innerHTML = `
    <div class="learn-container">
      <div class="learn-card">
        <div class="learn-card-header">
          <div>
            <h3>📄 CBSE Class 5 Practice Sheet: Mathematical Expressions & Statements</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
              Class V Mathematics — Converting Statements to Expressions, Parentheses & Word Problems
            </p>
          </div>
          <button class="btn btn-primary" id="btn-print-action-t3">
            🖨️ Print Worksheet
          </button>
        </div>

        <div class="worksheet-preview">
          <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">I. Write Mathematical Expressions for Verbal Statements:</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem;">
            <li>7 more than 5 times a number x.</li>
            <li>9 subtracted from twice a number y.</li>
            <li>One-fourth of the sum of a and 8.</li>
            <li>Product of numbers m and n divided by 6.</li>
            <li>15 decreased by 3 times a number k.</li>
            <li>8 added to the quotient of p divided by 3.</li>
          </ol>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">II. Write Verbal Statements for Mathematical Expressions:</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem;">
            <li><code>4x − 7</code></li>
            <li><code>3(p + 5)</code></li>
            <li><code>y/2 + 10</code></li>
            <li><code>12 − 5m</code></li>
            <li><code>(a − 4) / 3</code></li>
            <li><code>2s + 4</code></li>
          </ol>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">III. Parentheses & Order Traps (True or False / Correct the Error):</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem;">
            <li>"8 less than y" is written as 8 − y. [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</li>
            <li>The value of 3(x + 2) is equal to 3x + 2 for any value of x. [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</li>
            <li>"Twice the sum of m and 5" requires brackets: 2(m + 5). [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</li>
            <li>"Product of 4 and p plus 7" is written as 4(p + 7). [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</li>
          </ol>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">IV. Real-Life CBSE Word Problems:</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
            <li>Rohan's age is 4 years more than twice his sister Priya's age s. Write an algebraic expression for Rohan's age, and calculate his age if Priya is 9 years old.</li>
            <li>Maya bought n notebooks at ₹20 each and 2 pens at ₹15 each. Write the total cost expression, and calculate the total bill for 6 notebooks.</li>
            <li>Kabir had a ₹100 note. He bought m ice creams at ₹14 each. Write the expression for the change returned to Kabir.</li>
            <li>The length of a rectangular park is 6m more than its breadth b. Write the formula for its perimeter in terms of b.</li>
          </ol>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#btn-print-action-t3').addEventListener('click', () => {
    printWorksheetTopic3();
  });
}

function renderWorksheetViewTopic4(container) {
  container.innerHTML = `
    <div class="learn-container">
      <div class="learn-card">
        <div class="learn-card-header">
          <div>
            <h3>📄 CBSE Class 5 Practice Sheet: Number Patterns & Sequences</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
              Class V Mathematics — Growing Patterns, Triangular & Square Numbers, Number Towers & Magic Squares
            </p>
          </div>
          <button class="btn btn-primary" id="btn-print-action-t4">
            🖨️ Print Worksheet
          </button>
        </div>

        <div class="worksheet-preview">
          <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">I. Pattern Detective (Identify the Rule and Complete the Series):</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li><code>3, 7, 11, 15, ____, ____</code> &nbsp; (Rule: _____________________)</li>
            <li><code>2, 6, 18, 54, ____, ____</code> &nbsp; (Rule: _____________________)</li>
            <li><code>100, 93, 86, 79, ____, ____</code> &nbsp; (Rule: _____________________)</li>
            <li><code>1, 4, 9, 16, 25, ____, ____</code> &nbsp; (Rule: _____________________)</li>
            <li><code>1, 3, 6, 10, 15, ____, ____</code> &nbsp; (Rule: _____________________)</li>
            <li><code>2, 6, 12, 20, 30, ____, ____</code> &nbsp; (Rule: _____________________)</li>
            <li><code>1, 2, 3; 2, 3, 6; 3, 4, 12; _______, _______</code> &nbsp; (Rule: _____________________)</li>
            <li><code>(1, 2, 2), (2, 3, 6), (3, 4, 12), _______, (5, 6, 30)</code> &nbsp; (Rule: _____________________)</li>
            <li><code>1, 2, 3; 2, 3, 6; 3, 4, 9; _______, _______</code> &nbsp; (Rule: _____________________)</li>
          </ol>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">II. Geometric Dot Numbers (Triangular & Square Numbers):</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li>Write the first 6 triangular numbers: __________________________________________________</li>
            <li>Sum of consecutive triangular numbers: 3rd Triangular (6) + 4th Triangular (10) = ________ (Which square number is this?)</li>
            <li>Express the square number 36 as the sum of first n odd numbers: 36 = 1 + 3 + __________________________________</li>
            <li>Find the 7th triangular number using the formula T = n × (n + 1) ÷ 2: __________________________________</li>
          </ol>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">III. Number Towers & Pyramids (Each block = Sum of two blocks beneath):</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li>Base row has numbers [5, 10, 15]. Calculate the middle tier and the top peak number.</li>
            <li>In a 3-tier tower with base [a, b, c], prove why the top number equals a + 2b + c. Which number counts twice?</li>
            <li>If base row is [1, 2, 3, 4], find the top number of this 4-tier pyramid step by step.</li>
          </ol>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">IV. Magic Squares & Special Palindromes:</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li>In a 3×3 magic square with digits 1 to 9, what is the magic sum of every row, column, and diagonal? What digit must always be at the center?</li>
            <li>Turn the number 57 into a palindromic special number using the Reverse & Add rule (show each step).</li>
            <li>Turn the number 28 into a palindromic special number (show each step).</li>
          </ol>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#btn-print-action-t4').addEventListener('click', () => {
    printWorksheetTopic4();
  });
}

function renderWorksheetViewTopic5(container) {
  container.innerHTML = `
    <div class="learn-container">
      <div class="learn-card">
        <div class="learn-card-header">
          <div>
            <h3>📄 CBSE Class 5 Practice Sheet: Geometry, Shapes, Angles & Constructions</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
              Class V Mathematics — Points, Lines, Rays, Clock Angles, Triangles, Polygons, Quadrilaterals, Circles & Constructions
            </p>
          </div>
          <button class="btn btn-primary" id="btn-print-action-t5">
            🖨️ Print Worksheet
          </button>
        </div>

        <div class="worksheet-preview">
          <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">I. Points, Lines, Line Segments, Rays & Relationships:</h4>
          <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem;">
            <li><strong>Definitions & Symbols:</strong> Write the mathematical symbol and number of endpoints for:
              <br>a) Line AB: Symbol: <code>⟷AB</code> (Endpoints: _____)
              <br>b) Line Segment CD: Symbol: <code>—CD</code> (Endpoints: _____)
              <br>c) Ray PQ: Symbol: <code>→PQ</code> (Endpoints: _____)
            </li>
            <li><strong>Collinear Points:</strong> What geometric shape do you get by connecting 3 collinear points? What if the 3 points are non-collinear?</li>
            <li><strong>Intersections & Parallel Lines:</strong>
              <br>a) What are parallel lines? Give two real-world examples.
              <br>b) What is the exact angle formed between two perpendicular lines? Write the symbol used.
              <br>c) How many straight lines can pass through a single point? How many through two distinct points?
            </li>
          </ol>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">II. Angles, Rotations & Clock Angle Detective:</h4>
          <ol start="4" style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem;">
            <li><strong>Angle Classification:</strong> Classify each angle as Acute, Right, Obtuse, Straight, Reflex, or Complete:
              <br>a) 48° &rarr; _____________________________ &nbsp;&nbsp;&nbsp;&nbsp; b) 90° &rarr; _____________________________
              <br>c) 135° &rarr; ____________________________ &nbsp;&nbsp;&nbsp;&nbsp; d) 180° &rarr; ____________________________
              <br>e) 245° &rarr; ____________________________ &nbsp;&nbsp;&nbsp;&nbsp; f) 360° &rarr; ____________________________
            </li>
            <li><strong>Clock Angle Detective (30° per hour):</strong> Find the smaller angle between hour and minute hands at:
              <br>a) 3:00 o'clock &rarr; _______° (Type: _____________________)
              <br>b) 6:00 o'clock &rarr; _______° (Type: _____________________)
              <br>c) 1:00 o'clock &rarr; _______° (Type: _____________________)
              <br>d) 4:00 o'clock &rarr; _______° (Type: _____________________)
            </li>
            <li><strong>Rotations:</strong>
              <br>a) Through how many degrees does the minute hand turn in 15 minutes? In 30 minutes?
              <br>b) How many right angles make a straight angle? How many make a complete 360° turn?
            </li>
          </ol>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">III. Triangles & Polygon Interior Angle Sums:</h4>
          <ol start="7" style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem;">
            <li><strong>Triangle Classification:</strong>
              <br>a) Classify by sides: Equilateral (all sides equal), Isosceles (2 sides equal), Scalene (no sides equal).
              <br>b) Classify by angles: A triangle with angles 30°, 60°, 90° &rarr; _____________________________
              <br>c) Can a triangle have two right angles or two obtuse angles? Explain using the Angle Sum Property (Sum = 180°).
            </li>
            <li><strong>Missing Triangle Angle:</strong> In &Delta;ABC, if &ang;A = 70° and &ang;B = 55°, find the measure of &ang;C.</li>
            <li><strong>Polygon Triangulation Formula $(n - 2) \times 180^\circ$:</strong>
              <br>Calculate the interior angle sum for:
              <br>a) Quadrilateral (4 sides): (4 − 2) &times; 180° = _______°
              <br>b) Pentagon (5 sides): __________________________________ = _______°
              <br>c) Hexagon (6 sides): ____________________________________ = _______°
              <br>d) Nonagon (9 sides): ____________________________________ = _______°
            </li>
          </ol>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">IV. Quadrilaterals & Circle Anatomy:</h4>
          <ol start="10" style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem;">
            <li><strong>Rhombus vs. Trapezium vs. Parallelogram:</strong> State two main differences between a Rhombus and a Trapezium (consider side lengths and parallel sides).</li>
            <li><strong>Missing Quadrilateral Angle:</strong> Three angles of a quadrilateral are 85°, 110°, and 95°. Find the measure of the fourth angle (Sum = 360°).</li>
            <li><strong>Parallelogram Opposite Angles:</strong> In parallelogram ABCD, if &ang;A = 80°, find &ang;B, &ang;C, and &ang;D with geometric reasons.</li>
            <li><strong>Circle Anatomy & Formulas:</strong>
              <br>a) If the diameter of a wheel is 14 cm, what is its radius? (r = d &divide; 2)
              <br>b) If the radius of a circular plate is 6.5 cm, what is its diameter? (d = 2 &times; r)
              <br>c) Define: Chord, Arc, and Circumference. What is the longest chord of a circle?
            </li>
          </ol>

          <h4 style="color: var(--accent-amber-light); margin: 1.25rem 0 0.75rem 0;">V. Practical Geometric Constructions (Ruler, Compass & Protractor):</h4>
          <ol start="14" style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem;">
            <li><strong>Line Segment:</strong> Draw a line segment <code>AB = 7.2 cm</code> using a ruler and sharp pencil. Mark the endpoints clearly.</li>
            <li><strong>Angle Construction:</strong> Using a protractor and ruler, construct an angle of 120°. Label vertex B and rays BA and BC. Classify the angle.</li>
            <li><strong>Compass Circle:</strong> Using a compass, draw a circle of radius 4 cm (diameter = 8 cm). Mark the center O, draw one radius OP, and one chord XY.</li>
            <li><strong>Rectangle Construction:</strong> Draw a rectangle of length 6 cm and breadth 4 cm using a ruler and protractor/set-square.</li>
          </ol>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#btn-print-action-t5').addEventListener('click', () => {
    printWorksheetTopic5();
  });
}

/* ==========================================================================
   TOPIC 6 (TABLES) & TOPIC 7 (FRACTIONS) LABS, WORKSHEETS & VISUAL MODULES
   Extracted into modular specialized lab engines:
   - maths/engines/tables_lab.js (1,400 lines)
   - maths/engines/fractions_lab.js (2,665 lines)
   ========================================================================== */


/* --------------------------------------------------------------------------
   PRINT ENGINES & WORKSHEET PREPARATION
   -------------------------------------------------------------------------- */

function preparePrintContent(topic) {
  const current = topic || state.currentTopic;
  const printContainer = document.getElementById('print-container');
  if (!printContainer) return;

  if (current === 'divisibility_rules') {
    populatePrintTopic2(printContainer);
  } else if (current === 'expressions_statements') {
    populatePrintTopic3(printContainer);
  } else if (current === 'number_patterns') {
    populatePrintTopic4(printContainer);
  } else if (current === 'geometry_angles') {
    populatePrintTopic5(printContainer);
  } else if (current === 'tables_speed_master') {
    populatePrintTopicTables(printContainer);
  } else if (current === 'fractions_master') {
    populatePrintTopicFractions(printContainer);
  } else if (current === 'term_revision') {
    populatePrintRevision(printContainer, state.revisionSelectedTopics);
  } else {
    populatePrintTopic1(printContainer);
  }
}

function printWorksheet() {
  preparePrintContent(state.currentTopic);
  window.print();
}

function printWorksheetTopic1() {
  const printContainer = document.getElementById('print-container');
  if (printContainer) populatePrintTopic1(printContainer);
  window.print();
}

function printWorksheetTopic2() {
  const printContainer = document.getElementById('print-container');
  if (printContainer) populatePrintTopic2(printContainer);
  window.print();
}

function printWorksheetTopic3() {
  const printContainer = document.getElementById('print-container');
  if (printContainer) populatePrintTopic3(printContainer);
  window.print();
}

function printWorksheetTopic4() {
  const printContainer = document.getElementById('print-container');
  if (printContainer) populatePrintTopic4(printContainer);
  window.print();
}

function printWorksheetTopic5() {
  const printContainer = document.getElementById('print-container');
  if (printContainer) populatePrintTopic5(printContainer);
  window.print();
}

// Automatic synchronization for browser-initiated Ctrl+P or System Print
window.addEventListener('beforeprint', () => {
  preparePrintContent(state.currentTopic);
});


function populatePrintRevision(printContainer, selectedTopics) {
  const selected = (selectedTopics && selectedTopics.length > 0)
    ? selectedTopics
    : (state.revisionSelectedTopics && state.revisionSelectedTopics.length > 0)
      ? state.revisionSelectedTopics
      : ['factors_multiples_hcf_lcm', 'divisibility_rules', 'expressions_statements', 'number_patterns', 'geometry_angles'];

  const totalMarks = selected.length * 10;
  const totalTime = selected.length * 18;

  let sectionsHTML = '';
  let sectionNum = 1;
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];

  selected.forEach(tid => {
    const roman = romanNumerals[sectionNum - 1] || sectionNum;
    sectionNum++;

    if (tid === 'factors_multiples_hcf_lcm') {
      sectionsHTML += `
        <div class="worksheet-q" style="margin-top: 15px;">
          <h4>${roman}. Multiples, Factors, HCF & LCM (10 Marks):</h4>
          <ol>
            <li>
              <strong>HCF by Continuous Division:</strong>
              <br>Find the HCF of 48 and 72 using the continuous division method:
              <div class="workspace-box" style="height: 55px;"></div>
            </li>
            <li>
              <strong>Repeating Cycles LCM:</strong>
              <br>Three bells toll together at intervals of 9, 12, and 15 minutes. After how many minutes will they toll together again?
              <div class="workspace-box" style="height: 50px;"></div>
            </li>
            <li>
              <strong>Product Relationship Verification:</strong>
              <br>The product of two numbers is 840 and their HCF is 4. Find their LCM using <code>Product = HCF × LCM</code>:
              <div class="workspace-box" style="height: 50px;"></div>
            </li>
            <li>
              <strong>Co-prime Verification:</strong>
              <br>Explain why two consecutive numbers (e.g. 14 and 15) are ALWAYS co-prime (HCF = 1):
              <div class="workspace-box" style="height: 45px;"></div>
            </li>
          </ol>
        </div>
      `;
    } else if (tid === 'divisibility_rules') {
      sectionsHTML += `
        <div class="worksheet-q" style="margin-top: 15px;">
          <h4>${roman}. Divisibility Rules & Mental Shortcuts (10 Marks):</h4>
          <ol>
            <li>
              <strong>Check divisibility of 37,42,582 by 15:</strong>
              <br>Explain the co-prime factor test (3 × 5 = 15) and write your conclusion:
              <div class="workspace-box" style="height: 50px;"></div>
            </li>
            <li>
              <strong>Simultaneous Divisibility:</strong>
              <br>Check which among the following numbers are divisible by 4, 6, and 10 simultaneously:
              <br>(a) 12,480 &nbsp;&nbsp;&nbsp;&nbsp; (b) 98,760 &nbsp;&nbsp;&nbsp;&nbsp; (c) 75,310
              <div class="workspace-box" style="height: 50px;"></div>
            </li>
            <li>
              <strong>Missing Digit Puzzle for 9:</strong>
              <br>In the number 4*78, find the smallest digit in place of * so that the number is divisible by 9:
              <div class="workspace-box" style="height: 45px;"></div>
            </li>
            <li>
              <strong>Alternating Sum Test for 11:</strong>
              <br>Test whether 9,28,477 is divisible by 11 using difference of alternating sums:
              <div class="workspace-box" style="height: 50px;"></div>
            </li>
          </ol>
        </div>
      `;
    } else if (tid === 'expressions_statements') {
      sectionsHTML += `
        <div class="worksheet-q" style="margin-top: 15px;">
          <h4>${roman}. Mathematical Expressions & BODMAS (10 Marks):</h4>
          <ol>
            <li>
              <strong>Evaluate step-by-step using BODMAS:</strong>
              <br>a) 28 + 45 ÷ 9 × 2 − 10
              <div class="workspace-box" style="height: 45px;"></div>
              b) (48 − 35) × 2 + 30 ÷ 15
              <div class="workspace-box" style="height: 45px;"></div>
            </li>
            <li>
              <strong>Write the mathematical expressions:</strong>
              <br>a) 45 is divided by the sum of 2 and 3: __________________________________________________
              <br>b) The sum of 56 and 4 is multiplied by the difference of 11 and 10: ____________________
            </li>
            <li>
              <strong>Write in words:</strong>
              <br>a) (2 × 5) − 6: __________________________________________________________________________
              <br>b) (90 − 30) ÷ (30 − 20): ______________________________________________________________
            </li>
            <li>
              <strong>Insert Parentheses:</strong>
              <br>Place brackets in 4 + 6 × 3 − 2 so that the expression equals 28:
              <div class="workspace-box" style="height: 40px;"></div>
            </li>
          </ol>
        </div>
      `;
    } else if (tid === 'number_patterns') {
      sectionsHTML += `
        <div class="worksheet-q" style="margin-top: 15px;">
          <h4>${roman}. Number Patterns, Triplets & Towers (10 Marks):</h4>
          <ol>
            <li>
              <strong>Series Completion & 3-Number Sets:</strong>
              <br>a) 3, 7, 11, 15, ______, ______ &nbsp;&nbsp;&nbsp;&nbsp; (Rule: _____________________)
              <br>b) 1, 2, 3; 2, 3, 6; 3, 4, 12; _______, _______ &nbsp;&nbsp;&nbsp;&nbsp; (Rule: _____________________)
              <br>c) (1, 2, 2), (2, 3, 6), (3, 4, 12), _______, (5, 6, 30) &nbsp;&nbsp;&nbsp;&nbsp; (Rule: _____________________)
            </li>
            <li>
              <strong>Triangular & Square Numbers:</strong>
              <br>a) Calculate the 8th triangular number using formula T = n × (n + 1) ÷ 2:
              <div class="workspace-box" style="height: 45px;"></div>
              b) Show that the sum of 3rd triangular (6) and 4th triangular (10) equals 16 (4²):
              <div class="workspace-box" style="height: 40px;"></div>
            </li>
            <li>
              <strong>Number Tower:</strong> Complete a 4-tier number pyramid with base row [2, 3, 4, 5]:
              <div class="workspace-box" style="height: 65px;"></div>
            </li>
          </ol>
        </div>
      `;
    } else if (tid === 'geometry_angles') {
      sectionsHTML += `
        <div class="worksheet-q" style="margin-top: 15px;">
          <h4>${roman}. Geometry, Shapes, Angles & Constructions (10 Marks):</h4>
          <ol>
            <li>
              <strong>Collinear Points:</strong> What figure do you get by joining 3 collinear points? What if they are non-collinear?
              <div class="workspace-box" style="height: 45px;"></div>
            </li>
            <li>
              <strong>Clock Hands Angle (30° per hour):</strong>
              <br>Find the smaller angle formed at:
              <br>a) 3:00 o'clock &rarr; _______° (Type: ________________________)
              <br>b) 8:00 o'clock &rarr; _______° (Type: ________________________)
            </li>
            <li>
              <strong>Polygon Triangulation (n − 2) × 180°:</strong>
              <br>Calculate the interior angle sum of a nonagon (9-sided polygon):
              <div class="workspace-box" style="height: 50px;"></div>
            </li>
            <li>
              <strong>Practical Construction:</strong>
              <br>Draw a circle of radius 4 cm (diameter 8 cm) using a compass and ruler. Mark center O and radius OA:
              <div class="workspace-box" style="height: 80px;"></div>
            </li>
          </ol>
        </div>
      `;
    }
  });

  printContainer.innerHTML = `
    <div class="worksheet-header">
      <h2>CENTRAL BOARD OF SECONDARY EDUCATION (CBSE)</h2>
      <h3>MATHEMATICS CUMULATIVE REVISION ASSESSMENT — CLASS V</h3>
      <p><strong>Custom-Compiled Cumulative Exam Practice Paper</strong></p>
      <div class="worksheet-student-info">
        <span>Name: __________________________</span>
        <span>Roll No: ______</span>
        <span>Section: _____</span>
        <span>Date: ____________</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 9.5pt; margin-top: 6px; font-weight: 600; border-top: 1px solid #ccc; padding-top: 4px;">
        <span>Time Allowed: ${totalTime} Minutes</span>
        <span>Chapters Selected: ${selected.length}</span>
        <span>Maximum Marks: ${totalMarks}</span>
      </div>
    </div>

    <div style="font-size: 8.5pt; font-style: italic; margin-bottom: 12px; color: #444; border-bottom: 1px solid #ddd; padding-bottom: 4px;">
      General Instructions: 1. All questions are compulsory. 2. Write clear calculations in the workspace boxes provided. 3. Draw diagrams neatly using pencil and geometric instruments.
    </div>

    ${sectionsHTML}
  `;
}

function printWorksheetRevision() {
  const printContainer = document.getElementById('print-container');
  if (printContainer) populatePrintRevision(printContainer, state.revisionSelectedTopics);
  window.print();
}

function populatePrintTopic1(printContainer) {
  printContainer.innerHTML = `
    <div class="worksheet-header">
      <h2>CENTRAL BOARD OF SECONDARY EDUCATION (CBSE)</h2>
      <h3>MATHEMATICS — CLASS V</h3>
      <p><strong>Topic: Multiples, Factors, HCF & LCM Practice Sheet</strong></p>
      <div class="worksheet-student-info">
        <span>Name: __________________________</span>
        <span>Roll No: ______</span>
        <span>Date: ____________</span>
      </div>
    </div>

    <div class="worksheet-q">
      <h4>I. Fill in the Blanks:</h4>
      <ol>
        <li>The smallest multiple of a number is ________________.</li>
        <li>The HCF of two coprime numbers is always ________________.</li>
        <li>Two prime numbers that differ by 2 are called ________________ prime numbers.</li>
        <li>The HCF of two numbers can never be ________________ than either of the numbers.</li>
        <li>The LCM of two numbers is always ________________ than or equal to each of the numbers.</li>
        <li>A number divisible by both 3 and 5 is always divisible by ________________.</li>
      </ol>
    </div>

    <div class="worksheet-q">
      <h4>II. Write True or False:</h4>
      <ol>
        <li>Every number is a factor of itself. [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</li>
        <li>The number 1248 is divisible by 4. [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</li>
        <li>A prime number has exactly two factors. [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</li>
        <li>Every multiple of 5 ends in 5 only. [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</li>
      </ol>
    </div>

    <div class="worksheet-q">
      <h4>III. Solve with Step-by-Step Working:</h4>
      <ol>
        <li>
          Find the HCF of 144, 216 and 288 by short division method:
          <div class="workspace-box" style="height: 65px;"></div>
        </li>
        <li>
          Find the HCF of 96, 144 and 192 by long division method:
          <div class="workspace-box" style="height: 65px;"></div>
        </li>
        <li>
          Find the LCM of 60, 72 and 90 by short division method:
          <div class="workspace-box" style="height: 65px;"></div>
        </li>
        <li>
          Three traffic lights change at intervals of 20s, 30s, and 45s. After how many seconds will they change together again?
          <div class="workspace-box" style="height: 65px;"></div>
        </li>
      </ol>
    </div>
  `;
}

function populatePrintTopic2(printContainer) {
  printContainer.innerHTML = `
    <div class="worksheet-header">
      <h2>CENTRAL BOARD OF SECONDARY EDUCATION (CBSE)</h2>
      <h3>MATHEMATICS — CLASS V</h3>
      <p><strong>Topic: Divisibility Rules (2 to 12) & Missing Digit Puzzles</strong></p>
      <div class="worksheet-student-info">
        <span>Name: __________________________</span>
        <span>Roll No: ______</span>
        <span>Date: ____________</span>
      </div>
    </div>

    <div class="worksheet-q">
      <h4>I. Divisibility Check Matrix (Put ✓ or ✗):</h4>
      <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 10pt;" border="1">
        <thead>
          <tr style="background: #eee;">
            <th style="padding: 4px;">Number</th>
            <th>÷2</th><th>÷3</th><th>÷4</th><th>÷5</th><th>÷6</th><th>÷8</th><th>÷9</th><th>÷10</th><th>÷11</th><th>÷12</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 4px;"><strong>216</strong></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td style="padding: 4px;"><strong>504</strong></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td style="padding: 4px;"><strong>1,331</strong></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td style="padding: 4px;"><strong>2,520</strong></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td style="padding: 4px;"><strong>6,237</strong></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        </tbody>
      </table>
    </div>

    <div class="worksheet-q" style="margin-top: 15px;">
      <h4>II. Missing Digit Exam Problems (Show Step-by-Step Working):</h4>
      <ol>
        <li>
          Find the smallest missing digit to make <strong>62 * 178</strong> divisible by 9:
          <div class="workspace-box" style="height: 60px;"></div>
        </li>
        <li>
          Find the smallest missing digit to make <strong>71 * 2</strong> divisible by 6:
          <div class="workspace-box" style="height: 60px;"></div>
        </li>
        <li>
          Find the single digit to replace * in <strong>5 * 84</strong> so that it is divisible by 11:
          <div class="workspace-box" style="height: 60px;"></div>
        </li>
        <li>
          Find the smallest digit to replace * in <strong>43 * 6</strong> so that it is divisible by 4:
          <div class="workspace-box" style="height: 60px;"></div>
        </li>
      </ol>
    </div>

    <div class="worksheet-q" style="margin-top: 15px;">
      <h4>III. Mathematical Reasoning:</h4>
      <ol>
        <li>
          Explain why testing divisibility by 12 using 2 and 6 fails, while testing with 3 and 4 works. Give an example.
          <div class="workspace-box" style="height: 60px;"></div>
        </li>
        <li>
          A bakery baked 1,428 cookies. Can they be packed into boxes of 6 without any left over? Prove using rules of 2 and 3.
          <div class="workspace-box" style="height: 60px;"></div>
        </li>
      </ol>
    </div>
  `;
}

function populatePrintTopic3(printContainer) {
  printContainer.innerHTML = `
    <div class="worksheet-header">
      <h2>CENTRAL BOARD OF SECONDARY EDUCATION (CBSE)</h2>
      <h3>MATHEMATICS — CLASS V</h3>
      <p><strong>Topic: Converting Mathematical Expressions into Statements & Vice-Versa</strong></p>
      <div class="worksheet-student-info">
        <span>Name: __________________________</span>
        <span>Roll No: ______</span>
        <span>Date: ____________</span>
      </div>
    </div>

    <div class="worksheet-q">
      <h4>I. Write Mathematical Expressions for each statement:</h4>
      <ol>
        <li>7 more than 5 times a number x: ___________________________________</li>
        <li>9 subtracted from twice a number y: ___________________________________</li>
        <li>One-fourth of the sum of a and 8: ___________________________________</li>
        <li>Product of numbers m and n divided by 6: ___________________________________</li>
        <li>15 decreased by 3 times a number k: ___________________________________</li>
        <li>8 added to the quotient of p divided by 3: ___________________________________</li>
      </ol>
    </div>

    <div class="worksheet-q" style="margin-top: 15px;">
      <h4>II. Write Verbal Statements in Words for each expression:</h4>
      <ol>
        <li>4x − 7 : ________________________________________________________________</li>
        <li>3(p + 5) : ________________________________________________________________</li>
        <li>y/2 + 10 : ________________________________________________________________</li>
        <li>12 − 5m : ________________________________________________________________</li>
        <li>(a − 4) / 3 : ________________________________________________________________</li>
      </ol>
    </div>

    <div class="worksheet-q" style="margin-top: 15px;">
      <h4>III. Identify the Traps & Brackets (Show Step-by-Step Working):</h4>
      <ol>
        <li>
          A student claims that "7 subtracted from twice y" is 7 − 2y. Explain why this is wrong and write the correct expression:
          <div class="workspace-box" style="height: 60px;"></div>
        </li>
        <li>
          Evaluate both 3(x + 2) and 3x + 2 when x = 5. Do they have the same value? Explain why brackets make a difference:
          <div class="workspace-box" style="height: 60px;"></div>
        </li>
      </ol>
    </div>

    <div class="worksheet-q" style="margin-top: 15px;">
      <h4>IV. Real-Life Word Problems:</h4>
      <ol>
        <li>
          Rohan is 4 years older than twice Priya’s age s. If Priya is 8 years old, find Rohan’s age:
          <div class="workspace-box" style="height: 60px;"></div>
        </li>
        <li>
          A boy had ₹100. He bought m chocolates at ₹12 each. Write the expression for remaining money, and find the change if m = 6:
          <div class="workspace-box" style="height: 60px;"></div>
        </li>
      </ol>
    </div>
  `;
}

function populatePrintTopic4(printContainer) {
  printContainer.innerHTML = `
    <div class="worksheet-header">
      <h2>CENTRAL BOARD OF SECONDARY EDUCATION (CBSE)</h2>
      <h3>MATHEMATICS — CLASS V</h3>
      <p><strong>Topic: Number Patterns, Triangular & Square Numbers, Towers & Magic Shapes</strong></p>
      <div class="worksheet-student-info">
        <span>Name: __________________________</span>
        <span>Roll No: ______</span>
        <span>Date: ____________</span>
      </div>
    </div>

    <div class="worksheet-q">
      <h4>I. Pattern Detective — Find the Rule & Fill the Missing Terms:</h4>
      <ol>
        <li>3, 7, 11, 15, ______, ______ &nbsp;&nbsp;&nbsp;&nbsp; (Rule: _____________________)</li>
        <li>2, 6, 18, 54, ______, ______ &nbsp;&nbsp;&nbsp;&nbsp; (Rule: _____________________)</li>
        <li>100, 93, 86, 79, ______, ______ &nbsp;&nbsp;&nbsp;&nbsp; (Rule: _____________________)</li>
        <li>1, 4, 9, 16, 25, ______, ______ &nbsp;&nbsp;&nbsp;&nbsp; (Rule: _____________________)</li>
        <li>1, 3, 6, 10, 15, ______, ______ &nbsp;&nbsp;&nbsp;&nbsp; (Rule: _____________________)</li>
        <li>2, 6, 12, 20, 30, ______, ______ &nbsp;&nbsp;&nbsp;&nbsp; (Rule: _____________________)</li>
        <li>1, 2, 3; 2, 3, 6; 3, 4, 12; _______, _______ &nbsp;&nbsp;&nbsp;&nbsp; (Rule: _____________________)</li>
        <li>(1, 2, 2), (2, 3, 6), (3, 4, 12), _______, (5, 6, 30) &nbsp;&nbsp;&nbsp;&nbsp; (Rule: _____________________)</li>
        <li>1, 2, 3; 2, 3, 6; 3, 4, 9; _______, _______ &nbsp;&nbsp;&nbsp;&nbsp; (Rule: _____________________)</li>
      </ol>
    </div>

    <div class="worksheet-q" style="margin-top: 15px;">
      <h4>II. Geometric Dot Numbers (Triangular & Square Numbers):</h4>
      <ol>
        <li>
          List the first 6 triangular numbers: __________________________________________________
        </li>
        <li>
          Add two consecutive triangular numbers: 3rd Triangular (6) + 4th Triangular (10) = _______
          <br>Does this make a perfect square number? Which one? ____________________
        </li>
        <li>
          Express 25 as the sum of first 5 consecutive odd numbers:
          <br>25 = 1 + _____ + _____ + _____ + _____
        </li>
        <li>
          Calculate the 8th triangular number using the formula T = n × (n + 1) ÷ 2:
          <div class="workspace-box" style="height: 50px;"></div>
        </li>
      </ol>
    </div>

    <div class="worksheet-q" style="margin-top: 15px;">
      <h4>III. Number Towers (Pyramids):</h4>
      <ol>
        <li>
          Given the base row [10, 20, 30], calculate Tier 2 and the top peak number:
          <div class="workspace-box" style="height: 55px;"></div>
        </li>
        <li>
          In a 3-tier tower with base [a, b, c], why does the top block equal a + 2b + c? Explain:
          <div class="workspace-box" style="height: 55px;"></div>
        </li>
        <li>
          Complete this 4-tier number tower step by step with base row [2, 3, 4, 5]:
          <div class="workspace-box" style="height: 65px;"></div>
        </li>
      </ol>
    </div>

    <div class="worksheet-q" style="margin-top: 15px;">
      <h4>IV. Magic Squares & Special Palindromes:</h4>
      <ol>
        <li>
          Complete the 3×3 Magic Square using digits 1 to 9 (Magic Sum = 15):
          <br>Center number is 5. Corner numbers are even (2, 4, 6, 8). Edge numbers are odd (1, 3, 7, 9).
          <div class="workspace-box" style="height: 60px;"></div>
        </li>
        <li>
          Turn the number 57 into a palindrome using Reverse-and-Add steps:
          <div class="workspace-box" style="height: 50px;"></div>
        </li>
        <li>
          Turn the number 69 into a palindrome using Reverse-and-Add steps:
          <div class="workspace-box" style="height: 50px;"></div>
        </li>
      </ol>
    </div>
  `;
}

function populatePrintTopic5(printContainer) {
  printContainer.innerHTML = `
    <div class="worksheet-header">
      <h2>CENTRAL BOARD OF SECONDARY EDUCATION (CBSE)</h2>
      <h3>MATHEMATICS — CLASS V</h3>
      <p><strong>Topic: Geometry, Shapes, Angles, Triangles, Quadrilaterals & Circles</strong></p>
      <div class="worksheet-student-info">
        <span>Name: __________________________</span>
        <span>Roll No: ______</span>
        <span>Section: _____</span>
        <span>Date: ____________</span>
      </div>
    </div>

    <div class="worksheet-q">
      <h4>I. Points, Lines, Line Segments, Rays & Line Relationships:</h4>
      <ol>
        <li>
          <strong>Geometric Notations & Properties:</strong> Fill in the details:
          <table style="width: 100%; margin-top: 6px; border-collapse: collapse; font-size: 9.5pt;" border="1">
            <thead>
              <tr style="background: #f0f0f0;">
                <th style="padding: 4px; width: 25%;">Geometric Figure</th>
                <th style="padding: 4px; width: 25%;">Mathematical Symbol</th>
                <th style="padding: 4px; width: 25%;">Number of Endpoints</th>
                <th style="padding: 4px; width: 25%;">Can Length be Measured?</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding: 5px;">Line AB</td><td>⟷AB</td><td>0</td><td>No (Infinite)</td></tr>
              <tr><td style="padding: 5px;">Line Segment CD</td><td>—CD</td><td>2</td><td>Yes (Definite)</td></tr>
              <tr><td style="padding: 5px;">Ray PQ</td><td>→PQ</td><td>1</td><td>No (One direction)</td></tr>
            </tbody>
          </table>
        </li>
        <li>
          <strong>Collinear vs. Non-Collinear Points:</strong>
          <br>What geometric figure or shape do you get by joining 3 collinear points? What if the 3 points are non-collinear?
          <div class="workspace-box" style="height: 45px;"></div>
        </li>
        <li>
          <strong>Parallel & Perpendicular Lines:</strong>
          <br>a) Define parallel lines and write the symbol used (l ∥ m):
          <div class="workspace-box" style="height: 40px;"></div>
          b) What is the exact angle formed between two perpendicular lines (AB ⊥ CD)?
          <div class="workspace-box" style="height: 40px;"></div>
        </li>
      </ol>
    </div>

    <div class="worksheet-q" style="margin-top: 15px;">
      <h4>II. Angles, Rotations & Clock Angle Detective:</h4>
      <ol start="4">
        <li>
          <strong>Classify each angle measure (Acute, Right, Obtuse, Straight, Reflex, or Complete):</strong>
          <br>a) 48° &rarr; __________________________________________________
          <br>b) 90° &rarr; __________________________________________________
          <br>c) 135° &rarr; _________________________________________________
          <br>d) 180° &rarr; _________________________________________________
          <br>e) 245° &rarr; _________________________________________________
          <br>f) 360° &rarr; _________________________________________________
        </li>
        <li>
          <strong>Clock Angle Detective (Formula: 30° per hour step):</strong>
          <br>Find the smaller angle formed between the hour and minute hands of a clock at:
          <br>a) 3:00 o'clock &rarr; _______° (Type: ________________________)
          <br>b) 6:00 o'clock &rarr; _______° (Type: ________________________)
          <br>c) 1:00 o'clock &rarr; _______° (Type: ________________________)
          <br>d) 4:00 o'clock &rarr; _______° (Type: ________________________)
        </li>
        <li>
          <strong>Rotations Reasoning:</strong>
          <br>a) Through how many degrees does the minute hand turn in 15 minutes? (Hint: 1/4 of full circle)
          <div class="workspace-box" style="height: 35px;"></div>
          b) How many right angles make a straight angle? How many right angles make a complete turn?
          <div class="workspace-box" style="height: 35px;"></div>
        </li>
      </ol>
    </div>

    <div class="worksheet-q" style="margin-top: 15px;">
      <h4>III. Triangles & Polygon Interior Angle Sums:</h4>
      <ol start="7">
        <li>
          <strong>Classify each triangle based on sides and angles:</strong>
          <br>a) A triangle with all 3 sides equal &rarr; ____________________________________
          <br>b) A triangle with angle measures 30°, 60°, 90° &rarr; ________________________
          <br>c) Can a triangle have two right angles? Explain using the Angle Sum Property (Sum = 180°):
          <div class="workspace-box" style="height: 45px;"></div>
        </li>
        <li>
          <strong>Missing Triangle Angle:</strong>
          <br>In &Delta;ABC, if &ang;A = 70° and &ang;B = 55°, find the measure of &ang;C:
          <div class="workspace-box" style="height: 45px;"></div>
        </li>
        <li>
          <strong>Polygon Triangulation Formula (n − 2) &times; 180°:</strong>
          <br>Calculate the interior angle sum of:
          <br>a) Quadrilateral (4 sides): _____________________________________________ = _______°
          <br>b) Pentagon (5 sides): __________________________________________________ = _______°
          <br>c) Hexagon (6 sides): ___________________________________________________ = _______°
          <br>d) Nonagon (9 sides): ___________________________________________________ = _______°
        </li>
      </ol>
    </div>

    <div class="worksheet-q" style="margin-top: 15px;">
      <h4>IV. Quadrilaterals & Circle Anatomy:</h4>
      <ol start="10">
        <li>
          <strong>State two key differences between a Rhombus and a Trapezium:</strong>
          <table style="width: 100%; margin-top: 6px; border-collapse: collapse; font-size: 9pt;" border="1">
            <thead>
              <tr style="background: #f0f0f0;">
                <th style="padding: 4px; width: 30%;">Property</th>
                <th style="padding: 4px; width: 35%;">Rhombus</th>
                <th style="padding: 4px; width: 35%;">Trapezium</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding: 5px;">Side Lengths</td><td>All 4 sides are equal</td><td>Sides need not be equal</td></tr>
              <tr><td style="padding: 5px;">Parallel Pairs</td><td>Both pairs are parallel</td><td>Only ONE pair of parallel sides</td></tr>
            </tbody>
          </table>
        </li>
        <li>
          <strong>Parallelogram Opposite Angles:</strong>
          <br>In parallelogram ABCD, &ang;A = 80°. Find &ang;B, &ang;C, and &ang;D (Opposite angles are equal, adjacent angles add up to 180°):
          <div class="workspace-box" style="height: 50px;"></div>
        </li>
        <li>
          <strong>Circle Formulas & Definitions (d = 2r, r = d &divide; 2):</strong>
          <br>a) If diameter of a coin is 16 cm, calculate its radius: ____________________
          <br>b) If radius of a circular clock is 7.5 cm, calculate its diameter: ____________
          <br>c) Define: Chord, Arc, and Circumference. What is the longest chord of a circle?
          <div class="workspace-box" style="height: 50px;"></div>
        </li>
      </ol>
    </div>

    <div class="worksheet-q" style="margin-top: 15px;">
      <h4>V. Practical Geometric Constructions (Using Ruler, Compass & Protractor):</h4>
      <ol start="13">
        <li>
          <strong>Draw a line segment AB of length 7.2 cm using a ruler and pencil:</strong>
          <div class="workspace-box" style="height: 60px;"></div>
        </li>
        <li>
          <strong>Draw an angle of 120° using a protractor and label vertex B, rays BA and BC:</strong>
          <div class="workspace-box" style="height: 75px;"></div>
        </li>
        <li>
          <strong>Using a compass, draw a circle of radius 4 cm (diameter 8 cm). Mark center O, radius OP, and a chord CD:</strong>
          <div class="workspace-box" style="height: 85px;"></div>
        </li>
        <li>
          <strong>Construct a rectangle of length 6 cm and breadth 4 cm:</strong>
          <div class="workspace-box" style="height: 80px;"></div>
        </li>
      </ol>
    </div>
  `;
}

/* ==========================================================================
   10. RESULTS MODAL & PROGRESS STORAGE
   ========================================================================== */

function showResultsModal(correct, total, stars) {
  const modal = document.getElementById('results-modal');
  if (!modal) return;

  const correctElem = document.getElementById('result-correct');
  const totalElem = document.getElementById('result-total');
  const accElem = document.getElementById('result-accuracy');
  const starsElem = document.getElementById('result-stars');
  const emojiElem = document.getElementById('result-emoji');
  const msgElem = document.getElementById('result-message');

  const pct = Math.round((correct / total) * 100);

  if (correctElem) correctElem.textContent = correct;
  if (totalElem) totalElem.textContent = total;
  if (accElem) accElem.textContent = `${pct}%`;

  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
  const currentTopicStars = getTopicStars(currentConfig.id);
  const targetStars = currentConfig.targetStars || 10;

  if (starsElem) {
    starsElem.innerHTML = `<span style="font-size: 1.15rem; font-weight:800; color: #fde047;">⭐ ${currentTopicStars} / ${targetStars} Topic Stars Earned</span>`;
  }

  if (currentTopicStars >= targetStars) {
    if (emojiElem) emojiElem.textContent = '🏆';
    if (msgElem) msgElem.textContent = `Master Level Certified! You completed 100% of all milestones for ${currentConfig.title}!`;
    playFanfare();
    launchConfetti();
  } else if (pct >= 80) {
    if (emojiElem) emojiElem.textContent = '🌟';
    if (msgElem) msgElem.textContent = `Fantastic Sprint! You scored ${correct}/${total} (${pct}%). Check your Learning Passport for unlocked milestones!`;
    playCorrectSound();
  } else {
    if (emojiElem) emojiElem.textContent = '💪';
    if (msgElem) msgElem.textContent = `Good effort! You scored ${correct}/${total}. Practice more questions or review concepts to earn more stars!`;
  }

  modal.classList.add('active');
}

function saveProgress() {
  evaluateAndAwardStars(state.currentTopic);
  updateSidebarProgress();
}

function loadAllProgress() {
  updateSidebarProgress();
  updateTopBarPassportButton();
}

function loadProgress() {
  updateSidebarProgress();
  updateTopBarPassportButton();
}

function updateProgressUI() {
  updateSidebarProgress();
  updateTopBarPassportButton();
}

function loadActiveState() {
  try {
    const saved = localStorage.getItem('cbse5_maths_active_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.currentTopic && TOPICS_CONFIG[parsed.currentTopic]) {
        state.currentTopic = parsed.currentTopic;
      }
      if (Array.isArray(parsed.revisionSelectedTopics)) {
        state.revisionSelectedTopics = parsed.revisionSelectedTopics;
      }
      if (['learn', 'practice', 'challenge', 'worksheet'].includes(parsed.activeMode)) {
        state.activeMode = parsed.activeMode;
      }
      if (parsed.activeLearnModule) {
        state.activeLearnModule = (parsed.activeLearnModule === 'spot_the_trap') ? 'spot_the_mistakes' : parsed.activeLearnModule;
      }
      if (parsed.practiceFilter) {
        state.practiceFilter = parsed.practiceFilter;
      }
      if (parsed.topicProgress && typeof parsed.topicProgress === 'object') {
        state.topicProgress = parsed.topicProgress;
      }
      if (parsed.tablesLearnCheckpoints) {
        state.tablesLearnCheckpoints = parsed.tablesLearnCheckpoints;
      }
      if (typeof parsed.tablesPracticeSolvedCount === 'number') {
        state.tablesPracticeSolvedCount = parsed.tablesPracticeSolvedCount;
      }
      if (typeof parsed.tablesChallengeHighScore === 'number') {
        state.tablesChallengeHighScore = parsed.tablesChallengeHighScore;
      }
      if (parsed.fractionsLearnCheckpoints) {
        state.fractionsLearnCheckpoints = parsed.fractionsLearnCheckpoints;
      }
      if (typeof parsed.fractionsPracticeSolvedCount === 'number') {
        state.fractionsPracticeSolvedCount = parsed.fractionsPracticeSolvedCount;
      }
      if (typeof parsed.fractionsChallengeHighScore === 'number') {
        state.fractionsChallengeHighScore = parsed.fractionsChallengeHighScore;
      }
      if (parsed.practiceProgress && parsed.practiceProgress.topicId === state.currentTopic) {
        state.currentQuestionIndex = parsed.practiceProgress.currentQuestionIndex || 0;
        state.scoreCorrect = parsed.practiceProgress.scoreCorrect || 0;
        state.scoreWrong = parsed.practiceProgress.scoreWrong || 0;
        state.userAnswers = parsed.practiceProgress.userAnswers || {};
        if (parsed.practiceProgress.practiceFilter) {
          state.practiceFilter = parsed.practiceProgress.practiceFilter;
        }
      }
    }
  } catch (e) {
    console.warn('Failed to load active state:', e);
  }
}

function saveActiveState() {
  try {
    const toSave = {
      currentTopic: state.currentTopic,
      activeMode: state.activeMode,
      activeLearnModule: state.activeLearnModule,
      practiceFilter: state.practiceFilter,
      revisionSelectedTopics: state.revisionSelectedTopics,
      topicProgress: state.topicProgress || {},
      tablesLearnCheckpoints: state.tablesLearnCheckpoints,
      tablesPracticeSolvedCount: state.tablesPracticeSolvedCount,
      tablesChallengeHighScore: state.tablesChallengeHighScore,
      fractionsLearnCheckpoints: state.fractionsLearnCheckpoints,
      fractionsPracticeSolvedCount: state.fractionsPracticeSolvedCount,
      fractionsChallengeHighScore: state.fractionsChallengeHighScore
    };
    if (state.activeMode === 'practice') {
      toSave.practiceProgress = {
        topicId: state.currentTopic,
        currentQuestionIndex: state.currentQuestionIndex,
        scoreCorrect: state.scoreCorrect,
        scoreWrong: state.scoreWrong,
        userAnswers: state.userAnswers,
        practiceFilter: state.practiceFilter
      };
    }
    localStorage.setItem('cbse5_maths_active_state', JSON.stringify(toSave));
  } catch (e) {
    console.warn('Failed to save active state:', e);
  }
}

function switchTopic(topicId, resetSubmodes = true) {
  if (!TOPICS_CONFIG[topicId]) return;
  state.currentTopic = topicId;
  const config = TOPICS_CONFIG[topicId];

  // Update sidebar active item
  document.querySelectorAll('.sidebar-topics .topic-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-topic-id') === topicId);
  });

  // Update header title & subtitle
  const titleEl = document.getElementById('top-bar-title');
  const subEl = document.getElementById('top-bar-subtitle');
  if (titleEl) titleEl.textContent = config.title;
  if (subEl) subEl.textContent = config.subtitle;

  // Reset view mode & learn module
  if (resetSubmodes) {
    state.activeMode = 'learn';
    state.activeLearnModule = config.defaultLearnModule;
    state.practiceFilter = 'all';
    state.currentQuestionIndex = 0;
    state.scoreCorrect = 0;
    state.scoreWrong = 0;
    state.userAnswers = {};
    if (topicId === 'tables_speed_master') {
      state.tablesPracticeQueue = null;
    }
    if (topicId === 'fractions_master') {
      state.fractionsPracticeQueue = null;
    }
  }

  // Close mobile drawer if open
  const sidebar = document.getElementById('sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('sidebar-open');
  if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');

  // Update tabs UI
  const modeTabs = document.querySelectorAll('.mode-tab');
  modeTabs.forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-mode') === state.activeMode);
  });

  // Evaluate & award stars for this topic
  evaluateAndAwardStars(topicId);
  updateSidebarProgress();
  updateTopBarPassportButton();
  saveActiveState();
  renderViewport();
}

/* ==========================================================================
   11. APPLICATION INITIALIZATION & EVENT LISTENERS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  loadActiveState();
  // Evaluate and sync stars across all registered topics to clean any inflated legacy values
  Object.keys(TOPICS_CONFIG).forEach(tId => evaluateAndAwardStars(tId));
  updateSidebarProgress();
  updateTopBarPassportButton();

  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
  document.querySelectorAll('.sidebar-topics .topic-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-topic-id') === state.currentTopic);
  });
  const titleEl = document.getElementById('top-bar-title');
  const subEl = document.getElementById('top-bar-subtitle');
  if (titleEl) titleEl.textContent = currentConfig.title;
  if (subEl) subEl.textContent = currentConfig.subtitle;

  // Top Bar Passport Button
  const btnPassport = document.getElementById('btn-passport');
  if (btnPassport) {
    btnPassport.addEventListener('click', () => {
      playClickSound();
      openLearningPassport(state.currentTopic);
    });
  }

  // Mobile Drawer toggles
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const sidebar = document.getElementById('sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');

  function openDrawer() {
    sidebar.classList.add('sidebar-open');
    sidebarBackdrop.classList.add('active');
  }

  function closeDrawer() {
    sidebar.classList.remove('sidebar-open');
    sidebarBackdrop.classList.remove('active');
  }

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openDrawer);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeDrawer);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeDrawer);

  // Topic switching listeners on sidebar items
  const topicItems = document.querySelectorAll('.sidebar-topics .topic-item:not(.disabled)');
  topicItems.forEach(item => {
    item.addEventListener('click', () => {
      const topicId = item.getAttribute('data-topic-id');
      if (topicId && topicId !== state.currentTopic) {
        playClickSound();
        switchTopic(topicId);
      }
    });
  });

  // Print button in top bar
  const btnPrint = document.getElementById('btn-print');
  if (btnPrint) btnPrint.addEventListener('click', () => {
    state.activeMode = 'worksheet';
    saveActiveState();
    updateTabsUI();
    renderViewport();
    printWorksheet();
  });

  // Reset button in top bar
  const btnReset = document.getElementById('btn-reset');
  if (btnReset) btnReset.addEventListener('click', () => {
    playClickSound();
    const config = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
    if (confirm(`Do you want to reset your score and progress for "${config.title}"?`)) {
      state.scoreCorrect = 0;
      state.scoreWrong = 0;
      state.userAnswers = {};
      state.stars = 0;
      state.topicProgress = state.topicProgress || {};
      state.topicProgress[state.currentTopic] = {
        modulesInteracted: {},
        checkpoints: {},
        categorySolved: {},
        totalSolved: 0,
        totalAttempted: 0,
        accuracy: 0,
        trapsDiagnosed: 0,
        challengeHighScore: 0,
        challengeAccuracy: 0,
        customWorksheetExported: false
      };
      try {
        localStorage.removeItem(config.starsKey);
      } catch (e) {}
      if (state.currentTopic === 'tables_speed_master') {
        state.tablesLearnCheckpoints = {};
        state.tablesPracticeSolvedCount = 0;
        state.tablesChallengeHighScore = 0;
      } else if (state.currentTopic === 'fractions_master') {
        state.fractionsLearnCheckpoints = {};
        state.fractionsPracticeSolvedCount = 0;
        state.fractionsChallengeHighScore = 0;
      }
      saveActiveState();
      updateSidebarProgress();
      updateTopBarPassportButton();
      renderViewport();
    }
  });

  // Mode tabs switcher
  const modeTabs = document.querySelectorAll('.mode-tab');
  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playClickSound();
      state.activeMode = tab.getAttribute('data-mode');
      saveActiveState();
      updateTabsUI();
      renderViewport();
    });
  });

  function updateTabsUI() {
    modeTabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-mode') === state.activeMode);
    });
  }
  updateTabsUI();

  // Modal actions
  const modal = document.getElementById('results-modal');
  const btnModalRetry = document.getElementById('btn-modal-retry');
  const btnModalReview = document.getElementById('btn-modal-review');
  const btnModalClose = document.getElementById('btn-modal-close');

  if (btnModalRetry) btnModalRetry.addEventListener('click', () => {
    modal.classList.remove('active');
    startChallenge();
  });

  if (btnModalReview) btnModalReview.addEventListener('click', () => {
    modal.classList.remove('active');
    state.activeMode = 'learn';
    saveActiveState();
    updateTabsUI();
    renderViewport();
  });

  if (btnModalClose) btnModalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Initial render
  renderViewport();
});
