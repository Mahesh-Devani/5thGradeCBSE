/**
 * Maths Master — Class 5 CBSE
 * Modularized Architecture (Vanilla ES6+ JS)
 * Zero External Runtime Dependencies
 */

'use strict';

/* ==========================================================================
   5.7 TOPIC 4: NUMBER PATTERNS DATA & ENGINES
   ========================================================================== */

const PATTERN_PRESETS = [
  {
    id: 'pat_1',
    title: 'Multiples of 7 (Constant Step)',
    terms: [7, 14, 21, 28, '?', 42],
    missingIndex: 4,
    correctAnswer: 35,
    options: [32, 35, 34, 36],
    diffs: ['+7', '+7', '+7', '+7', '+7'],
    rule: 'Rule: Add 7 to the previous number (+7 step pattern).',
    explanation: '28 + 7 = 35, and 35 + 7 = 42. Each term is a multiple of 7!'
  },
  {
    id: 'pat_2',
    title: 'Subtracting 9 (Decreasing Step)',
    terms: [85, 76, 67, 58, '?', 40],
    missingIndex: 4,
    correctAnswer: 49,
    options: [50, 48, 49, 47],
    diffs: ['−9', '−9', '−9', '−9', '−9'],
    rule: 'Rule: Subtract 9 from the previous number (−9 step pattern).',
    explanation: '58 − 9 = 49, and 49 − 9 = 40. The numbers decrease by 9 each step.'
  },
  {
    id: 'pat_3',
    title: 'Growing Differences (+2, +4, +6, +8...)',
    terms: [1, 3, 7, 13, 21, '?'],
    missingIndex: 5,
    correctAnswer: 31,
    options: [29, 31, 33, 30],
    diffs: ['+2', '+4', '+6', '+8', '+10'],
    rule: 'Rule: The amount added grows by +2 each step (+2, +4, +6, +8, +10).',
    explanation: '1 + 2 = 3; 3 + 4 = 7; 7 + 6 = 13; 13 + 8 = 21; 21 + 10 = 31!'
  },
  {
    id: 'pat_4',
    title: 'Tripling Pattern (Multiplication ×3)',
    terms: [2, 6, 18, 54, '?'],
    missingIndex: 4,
    correctAnswer: 162,
    options: [108, 162, 144, 156],
    diffs: ['×3', '×3', '×3', '×3'],
    rule: 'Rule: Multiply by 3 each step (geometric progression).',
    explanation: '2 × 3 = 6; 6 × 3 = 18; 18 × 3 = 54; 54 × 3 = 162!'
  },
  {
    id: 'pat_5',
    title: 'Fibonacci Sequence (Sum of Previous Two)',
    terms: [1, 1, 2, 3, 5, 8, '?', 21],
    missingIndex: 6,
    correctAnswer: 13,
    options: [11, 12, 13, 14],
    diffs: ['1+1', '1+2', '2+3', '3+5', '5+8', '8+13'],
    rule: 'Rule: Each number is the sum of the two numbers immediately before it.',
    explanation: '5 + 8 = 13, and 8 + 13 = 21!'
  },
  {
    id: 'pat_6',
    title: '3-Number Set (Triplets): 1,2,3; 2,3,6; 3,4,12...',
    terms: ['(1, 2, 3)', '(2, 3, 6)', '(3, 4, 12)', '?', '(5, 6, 48)'],
    missingIndex: 3,
    correctAnswer: '(4, 5, 24)',
    options: ['(4, 5, 20)', '(4, 5, 24)', '(4, 5, 18)', '(4, 6, 24)'],
    diffs: ['Set 1', 'Set 2', 'Set 3', 'Set 4', 'Set 5'],
    rule: 'Rule: 1st number = n, 2nd number = n+1, 3rd number doubles (3 → 6 → 12 → 24 → 48).',
    explanation: 'First number increases by 1 (1, 2, 3, 4, 5). Second number increases by 1 (2, 3, 4, 5, 6). The third number doubles each step (3 × 2 = 6; 6 × 2 = 12; 12 × 2 = 24; 24 × 2 = 48). Hence the next set is (4, 5, 24)!'
  },
  {
    id: 'pat_7',
    title: 'Product Triplets: (1,2,2), (2,3,6), (3,4,12)...',
    terms: ['(1, 2, 2)', '(2, 3, 6)', '(3, 4, 12)', '?', '(5, 6, 30)'],
    missingIndex: 3,
    correctAnswer: '(4, 5, 20)',
    options: ['(4, 5, 20)', '(4, 5, 24)', '(4, 5, 16)', '(5, 6, 25)'],
    diffs: ['1×2=2', '2×3=6', '3×4=12', '4×5=20', '5×6=30'],
    rule: 'Rule: 3rd number is the product of the first two numbers [a, b, a × b].',
    explanation: '1 × 2 = 2; 2 × 3 = 6; 3 × 4 = 12; 4 × 5 = 20; 5 × 6 = 30. Each set has the product as its third member!'
  },
  {
    id: 'pat_8',
    title: '3-Number Set (1st × 3): 1,2,3; 2,3,6; 3,4,9...',
    terms: ['(1, 2, 3)', '(2, 3, 6)', '(3, 4, 9)', '?', '(5, 6, 15)'],
    missingIndex: 3,
    correctAnswer: '(4, 5, 12)',
    options: ['(4, 5, 12)', '(4, 5, 16)', '(4, 5, 10)', '(4, 6, 12)'],
    diffs: ['1×3=3', '2×3=6', '3×3=9', '4×3=12', '5×3=15'],
    rule: 'Rule: 1st number = n, 2nd number = n+1, 3rd number is 1st number multiplied by 3 (1×3, 2×3, 3×3, 4×3, 5×3).',
    explanation: '1st number increases by 1 (1, 2, 3, 4, 5). 2nd number increases by 1 (2, 3, 4, 5, 6). The 3rd number in each set is the 1st number multiplied by 3: 1 × 3 = 3; 2 × 3 = 6; 3 × 3 = 9; 4 × 3 = 12; 5 × 3 = 15. Hence the missing set is (4, 5, 12)!'
  }
];

const TRIANGULAR_NUMBERS_DATA = [
  { n: 1, val: 1, sumText: '1' },
  { n: 2, val: 3, sumText: '1 + 2 = 3' },
  { n: 3, val: 6, sumText: '1 + 2 + 3 = 6' },
  { n: 4, val: 10, sumText: '1 + 2 + 3 + 4 = 10' },
  { n: 5, val: 15, sumText: '1 + 2 + 3 + 4 + 5 = 15' },
  { n: 6, val: 21, sumText: '1 + 2 + 3 + 4 + 5 + 6 = 21' },
  { n: 7, val: 28, sumText: '1 + 2 + 3 + 4 + 5 + 6 + 7 = 28' },
  { n: 8, val: 36, sumText: '1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36' }
];

const SQUARE_NUMBERS_DATA = [
  { n: 1, val: 1, oddSum: '1' },
  { n: 2, val: 4, oddSum: '1 + 3 = 4' },
  { n: 3, val: 9, oddSum: '1 + 3 + 5 = 9' },
  { n: 4, val: 16, oddSum: '1 + 3 + 5 + 7 = 16' },
  { n: 5, val: 25, oddSum: '1 + 3 + 5 + 7 + 9 = 25' },
  { n: 6, val: 36, oddSum: '1 + 3 + 5 + 7 + 9 + 11 = 36' },
  { n: 7, val: 49, oddSum: '1 + 3 + 5 + 7 + 9 + 11 + 13 = 49' },
  { n: 8, val: 64, oddSum: '1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 = 64' }
];

function buildNumberTower(baseArray) {
  const levels = [baseArray];
  while (levels[levels.length - 1].length > 1) {
    const current = levels[levels.length - 1];
    const nextLevel = [];
    for (let i = 0; i < current.length - 1; i++) {
      nextLevel.push(current[i] + current[i + 1]);
    }
    levels.push(nextLevel);
  }
  return levels;
}

function computePalindromeSteps(n) {
  const steps = [];
  let cur = Math.abs(parseInt(n)) || 43;
  let iterations = 0;

  function isPal(num) {
    const s = num.toString();
    return s === s.split('').reverse().join('');
  }

  while (!isPal(cur) && iterations < 8) {
    const rev = parseInt(cur.toString().split('').reverse().join(''));
    const next = cur + rev;
    steps.push({
      original: cur,
      reversed: rev,
      sum: next,
      isPalindrome: isPal(next)
    });
    cur = next;
    iterations++;
  }

  return {
    initial: n,
    steps,
    final: cur,
    isFinalPalindrome: isPal(cur)
  };
}



const LEARN_MODULES_TOPIC_4 = {
  pattern_detective: {
    id: 'pattern_detective',
    pillTitle: '🕵️ Pattern Detective',
    title: 'Pattern Detective: Discover Rules & Missing Terms',
    tag: 'Core Logic',
    lead: 'Every mathematical pattern follows a hidden rule! Discover step patterns, growing differences, and multiplication rules by inspecting the differences between consecutive terms.',
    renderContent: (...args) => renderPatternDetectiveModule(...args)
  },
  triangular_square_numbers: {
    id: 'triangular_square_numbers',
    pillTitle: '🔺 Triangular & Square Dots',
    title: 'Geometric Numbers: Triangular & Square Patterns',
    tag: 'Visual Geometry',
    lead: 'Numbers can form shapes! Explore <strong>Triangular Numbers</strong> arranged as dot pyramids, and discover why the sum of any two consecutive triangular numbers makes a <strong>Square Number</strong> ($T_{n-1} + T_n = n^2$)!',
    renderContent: (...args) => renderTriangularSquareModule(...args)
  },
  number_towers: {
    id: 'number_towers',
    pillTitle: '🏰 Number Towers (Pyramids)',
    title: 'Number Towers: The Block-Sum Pyramid Rule',
    tag: 'CBSE Classic',
    lead: 'In a CBSE number tower, <strong>each block is the sum of the two blocks directly beneath it</strong>. Test presets or build your own custom pyramid to watch the addition bubble up!',
    renderContent: (...args) => renderNumberTowersModule(...args)
  },
  magic_shapes_palindromes: {
    id: 'magic_shapes_palindromes',
    pillTitle: '✨ Magic Shapes & Special Numbers',
    title: '3×3 Magic Square & Palindromic Special Numbers',
    tag: 'Fun Puzzles',
    lead: 'Explore the famous <strong>3×3 Magic Square</strong> where all rows, columns, and diagonals add up to 15! Plus, learn the NCERT algorithm to turn ANY number into a <strong>Palindromic Special Number</strong>.',
    renderContent: (...args) => renderMagicShapesModule(...args)
  },
  spot_the_mistakes: {
    id: 'spot_the_mistakes',
    pillTitle: '🕵️ Spot the Mistakes',
    title: 'Be the Teacher: Spot the Mistakes!',
    tag: 'Diagnostic Thinking',
    lead: 'Can you spot where students made a false pattern assumption? Inspect number towers, geometric dots, and palindrome algorithms to catch the slip!',
    renderContent: (...args) => renderSpotMistakesTopic4(...args)
  }
};



const PRACTICE_POOL_TOPIC_4 = [
  // Category 1: Arithmetic & Step Patterns
  {
    id: 'pat_q_triplet_1',
    skill: 'arithmetic_patterns',
    type: 'mcq',
    question: 'Find the next two sets in the pattern: 1, 2, 3; 2, 3, 6; 3, 4, 12; _____; _____',
    options: [
      '4, 5, 24 and 5, 6, 48',
      '4, 5, 20 and 5, 6, 30',
      '4, 5, 18 and 5, 6, 24',
      '4, 5, 15 and 5, 6, 20'
    ],
    correct: 0,
    explanation: 'Deconstruct the 3 numbers in each set: 1st number increases by 1 (1, 2, 3, 4, 5); 2nd number increases by 1 (2, 3, 4, 5, 6); 3rd number doubles (3 → 6 → 12 → 24 → 48). Therefore, the next sets are 4, 5, 24 and 5, 6, 48!',
    source: 'CBSE Class 5 Triplet Set Pattern'
  },
  {
    id: 'pat_q_triplet_2',
    skill: 'arithmetic_patterns',
    type: 'mcq',
    question: 'In the product-triplet pattern (1, 2, 2), (2, 3, 6), (3, 4, 12), _____, (5, 6, 30), what is the missing set?',
    options: [
      '(4, 5, 20)',
      '(4, 5, 24)',
      '(4, 5, 18)',
      '(4, 6, 24)'
    ],
    correct: 0,
    explanation: 'In each triplet [a, b, c], the 3rd number is the product of the first two: 1 × 2 = 2; 2 × 3 = 6; 3 × 4 = 12; 4 × 5 = 20; 5 × 6 = 30. The missing set is (4, 5, 20).',
    source: 'CBSE Class 5 Number Set Puzzle'
  },
  {
    id: 'pat_q_triplet_3',
    skill: 'arithmetic_patterns',
    type: 'mcq',
    question: 'Find the next two sets in the pattern: 1, 2, 3; 2, 3, 6; 3, 4, 9; _____; _____',
    options: [
      '4, 5, 12 and 5, 6, 15',
      '4, 5, 16 and 5, 6, 20',
      '4, 5, 10 and 5, 6, 12',
      '4, 5, 15 and 5, 6, 18'
    ],
    correct: 0,
    explanation: 'Deconstruct the 3 numbers in each set: 1st number increases by 1 (1, 2, 3, 4, 5); 2nd number increases by 1 (2, 3, 4, 5, 6); 3rd number is the 1st number multiplied by 3 (1 × 3 = 3, 2 × 3 = 6, 3 × 3 = 9, 4 × 3 = 12, 5 × 3 = 15). Therefore, the next sets are 4, 5, 12 and 5, 6, 15!',
    source: 'CBSE Class 5 Triplet Set Pattern (1st × 3)'
  },
  {
    id: 'pat_q1',
    skill: 'arithmetic_patterns',
    type: 'mcq',
    question: 'Find the next number in the sequence: 12, 19, 26, 33, 40, _____',
    options: ['47', '46', '48', '45'],
    correct: 0,
    explanation: 'Check the difference between consecutive terms: 19 − 12 = 7; 26 − 19 = 7; 33 − 26 = 7; 40 − 33 = 7. The rule is (+7). Therefore, 40 + 7 = 47.',
    source: 'CBSE Class 5 Pattern Rule'
  },
  {
    id: 'pat_q2',
    skill: 'arithmetic_patterns',
    type: 'mcq',
    question: 'Find the missing number in: 95, 87, 79, 71, _____, 55',
    options: ['63', '64', '62', '65'],
    correct: 0,
    explanation: 'The difference between each term is: 95 − 87 = 8; 87 − 79 = 8; 79 − 71 = 8. The rule is (−8). So 71 − 8 = 63, and 63 − 8 = 55.',
    source: 'CBSE Class 5 Decreasing Pattern'
  },
  {
    id: 'pat_q3',
    skill: 'arithmetic_patterns',
    type: 'mcq',
    question: 'What comes next in the growing pattern: 2, 4, 8, 14, 22, _____?',
    options: ['32', '30', '34', '36'],
    correct: 0,
    explanation: 'Look at the differences: 4 − 2 = +2; 8 − 4 = +4; 14 − 8 = +6; 22 − 14 = +8. The difference grows by +2 each step! Next difference is +10: 22 + 10 = 32.',
    source: 'CBSE Growing Differences'
  },
  {
    id: 'pat_q4',
    skill: 'arithmetic_patterns',
    type: 'mcq',
    question: 'Find the next term in: 3, 6, 12, 24, 48, _____',
    options: ['96', '92', '84', '108'],
    correct: 0,
    explanation: 'Each number is doubled (multiplied by 2): 3 × 2 = 6, 6 × 2 = 12, 12 × 2 = 24, 24 × 2 = 48, 48 × 2 = 96.',
    source: 'CBSE Multiplicative Pattern'
  },
  {
    id: 'pat_q5',
    skill: 'arithmetic_patterns',
    type: 'mcq',
    question: 'In the Fibonacci sequence 1, 1, 2, 3, 5, 8, 13, what is the next number?',
    options: ['21', '20', '19', '22'],
    correct: 0,
    explanation: 'In the Fibonacci sequence, each term is the sum of the two preceding terms: 8 + 13 = 21.',
    source: 'NCERT Fibonacci Sequence'
  },

  // Category 2: Geometric Numbers (Triangular & Square Numbers)
  {
    id: 'pat_q6',
    skill: 'geom_numbers',
    type: 'mcq',
    question: 'Which of the following numbers is a Triangular Number?',
    options: ['15', '14', '16', '18'],
    correct: 0,
    explanation: 'Triangular numbers are formed by sum of consecutive natural numbers: 1 + 2 + 3 + 4 + 5 = 15. The first triangular numbers are 1, 3, 6, 10, 15, 21...',
    source: 'NCERT Triangular Numbers'
  },
  {
    id: 'pat_q7',
    skill: 'geom_numbers',
    type: 'mcq',
    question: 'What is the sum of any two consecutive triangular numbers, such as 6 and 10?',
    options: ['16, which is always a square number (4²)', '16, which is always a prime number', '16, which is always an odd number', '16, which is always a triangular number'],
    correct: 0,
    explanation: 'A fundamental theorem in Class 5 geometry: The sum of two consecutive triangular numbers is always a square number! E.g. 1+3=4 (2²), 3+6=9 (3²), 6+10=16 (4²), 10+15=25 (5²).',
    source: 'NCERT Geometry Theorem'
  },
  {
    id: 'pat_q8',
    skill: 'geom_numbers',
    type: 'mcq',
    question: 'What is the sum of the first 5 odd numbers (1 + 3 + 5 + 7 + 9)?',
    options: ['25 (which is 5²)', '20', '24', '30'],
    correct: 0,
    explanation: 'The sum of the first n odd numbers is always n²! For 5 odd numbers: 1 + 3 + 5 + 7 + 9 = 25 = 5².',
    source: 'NCERT Odd Sum Theorem'
  },
  {
    id: 'pat_q9',
    skill: 'geom_numbers',
    type: 'mcq',
    question: 'How many dots are in the 6th triangular number?',
    options: ['21', '20', '18', '24'],
    correct: 0,
    explanation: 'Formula for nth triangular number = n(n + 1) / 2 = 6 × 7 / 2 = 42 / 2 = 21 dots. (1 + 2 + 3 + 4 + 5 + 6 = 21).',
    source: 'NCERT Triangular Formula'
  },
  {
    id: 'pat_q10',
    skill: 'geom_numbers',
    type: 'mcq',
    question: 'Which of the following is BOTH a triangular number and a square number?',
    options: ['36', '16', '25', '49'],
    correct: 0,
    explanation: '36 is a square number (6 × 6 = 36) AND a triangular number (1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36)!',
    source: 'CBSE Math Olympiad'
  },
  {
    id: 'pat_q_ws5',
    skill: 'geom_numbers',
    type: 'mcq',
    question: 'Which sequence lists the first 10 triangular numbers correctly in order?',
    options: [
      '1, 3, 6, 10, 15, 21, 28, 36, 45, 55',
      '1, 4, 9, 16, 25, 36, 49, 64, 81, 100',
      '1, 2, 4, 8, 16, 32, 64, 128, 256, 512',
      '3, 6, 9, 12, 15, 18, 21, 24, 27, 30'
    ],
    correct: 0,
    explanation: 'Triangular numbers are generated by progressively adding natural numbers: 1, 1+2=3, 3+3=6, 6+4=10, 10+5=15, 15+6=21, 21+7=28, 28+8=36, 36+9=45, 45+10=55. (Note: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 are the first 10 square numbers).',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 5)'
  },

  // Category 3: Number Towers (Pyramids)
  {
    id: 'pat_q11',
    skill: 'number_towers',
    type: 'mcq',
    question: 'In a number tower with base [10, 20, 30], what is the number at the top of the tower?',
    options: ['80', '60', '70', '90'],
    correct: 0,
    explanation: 'Base row: 10, 20, 30.\\nMiddle row: 10 + 20 = 30, and 20 + 30 = 50.\\nTop block: 30 + 50 = 80.',
    source: 'NCERT Number Towers'
  },
  {
    id: 'pat_q12',
    skill: 'number_towers',
    type: 'mcq',
    question: 'In a number tower with base [5, 15, 25], what is the number at the top?',
    options: ['60', '50', '70', '45'],
    correct: 0,
    explanation: 'Base row: 5, 15, 25.\\nMiddle row: 5 + 15 = 20, and 15 + 25 = 40.\\nTop block: 20 + 40 = 60.',
    source: 'NCERT Number Towers'
  },
  {
    id: 'pat_q13',
    skill: 'number_towers',
    type: 'mcq',
    question: 'In a 4-level number tower with base [1, 2, 3, 4], what is the top block?',
    options: ['20', '18', '24', '16'],
    correct: 0,
    explanation: 'Row 1 (base): [1, 2, 3, 4].\\nRow 2: [1+2=3, 2+3=5, 3+4=7] = [3, 5, 7].\\nRow 3: [3+5=8, 5+7=12] = [8, 12].\\nTop block: 8 + 12 = 20.',
    source: 'NCERT Number Towers 4-Level'
  },
  {
    id: 'pat_q14',
    skill: 'number_towers',
    type: 'mcq',
    question: 'In a number tower, the top block is 50. The middle row has 22 and another block X. What is X?',
    options: ['28', '26', '30', '32'],
    correct: 0,
    explanation: 'Since the top block is the sum of the middle row: 22 + X = 50 ➔ X = 50 − 22 = 28.',
    source: 'CBSE Missing Block Puzzle'
  },
  {
    id: 'pat_q15',
    skill: 'number_towers',
    type: 'mcq',
    question: 'In a number tower with base [a, b, c], the top block is mathematically equal to:',
    options: ['a + 2b + c', 'a + b + c', '2(a + b + c)', '3(a + b + c)'],
    correct: 0,
    explanation: 'Middle row: (a + b) and (b + c).\\nTop block = (a + b) + (b + c) = a + 2b + c. Notice the middle block b counts twice!',
    source: 'CBSE Tower Algebraic Property'
  },

  // Category 4: Magic Shapes & Special Palindromes
  {
    id: 'pat_q16',
    skill: 'magic_palindromes',
    type: 'mcq',
    question: 'In a 3×3 Magic Square using digits 1 to 9, what must be the sum of each row, column, and diagonal?',
    options: ['15', '12', '18', '21'],
    correct: 0,
    explanation: 'Sum of digits 1 to 9 is 45. Since there are 3 rows, each row must sum to 45 ÷ 3 = 15! The magic constant is 15.',
    source: 'NCERT Magic Square'
  },
  {
    id: 'pat_q17',
    skill: 'magic_palindromes',
    type: 'mcq',
    question: 'In a standard 3×3 Magic Square (numbers 1 to 9), what digit MUST be in the exact center cell?',
    options: ['5', '1', '9', '3'],
    correct: 0,
    explanation: 'The center cell participates in 4 lines (row 2, col 2, and both diagonals). It must be the median number of 1 to 9, which is 5!',
    source: 'NCERT Magic Square Center Rule'
  },
  {
    id: 'pat_q18',
    skill: 'magic_palindromes',
    type: 'mcq',
    question: 'What is a "Special Number" (Palindrome number) in NCERT Class 5?',
    options: [
      'A number that reads the same forwards and backwards (e.g. 121, 353, 4884)',
      'Any number divisible by 10',
      'Any number ending in 5',
      'A number with only even digits'
    ],
    correct: 0,
    explanation: 'In NCERT Chapter "Can You See the Pattern?", special numbers are palindromes that read the exact same from left to right and right to left (like 121, 656, 1331).',
    source: 'NCERT Special Numbers'
  },
  {
    id: 'pat_q19',
    skill: 'magic_palindromes',
    type: 'mcq',
    question: 'Apply the palindrome rule to 43: Add 43 to its reverse. What is the special number formed?',
    options: ['77', '74', '86', '66'],
    correct: 0,
    explanation: 'Number = 43. Reversed digits = 34. Sum = 43 + 34 = 77. 77 reads the same forwards and backwards, so it is a special palindromic number!',
    source: 'NCERT Palindrome Algorithm'
  },
  {
    id: 'pat_q20',
    skill: 'magic_palindromes',
    type: 'mcq',
    question: 'Secret Number Riddle: "It is larger than half of 100 (50). More than 6 tens and less than 7 tens. The tens digit is 1 more than the ones digit. Sum of digits is 11." What is the number?',
    options: ['65', '74', '64', '56'],
    correct: 0,
    explanation: '• Larger than 50, between 60 and 70 ➔ tens digit is 6.\\n• Tens digit is 1 more than ones digit ➔ ones digit = 6 − 1 = 5.\\n• Sum of digits: 6 + 5 = 11 (matches!).\\nThe number is 65!',
    source: 'NCERT Secret Number Clues'
  }
];



const CHALLENGE_QUESTIONS_TOPIC_4 = [
  {
    question: 'Next term: 5, 11, 17, 23, _____?',
    options: ['29', '28', '30', '27'],
    correct: 0,
    explanation: 'Difference is +6. 23 + 6 = 29.'
  },
  {
    question: 'Next term in decreasing pattern: 100, 85, 70, 55, _____?',
    options: ['40', '45', '35', '30'],
    correct: 0,
    explanation: 'Subtracting 15 each step. 55 − 15 = 40.'
  },
  {
    question: 'Is 10 a Triangular Number?',
    options: ['Yes (1 + 2 + 3 + 4 = 10)', 'No'],
    correct: 0,
    explanation: '1 + 2 + 3 + 4 = 10 dots form a triangle!'
  },
  {
    question: 'Sum of first 4 odd numbers (1 + 3 + 5 + 7) equals:',
    options: ['16 (4²)', '14', '15', '18'],
    correct: 0,
    explanation: '1 + 3 + 5 + 7 = 16 = 4².'
  },
  {
    question: 'Base of tower is [20, 30, 40]. What is the top block?',
    options: ['120', '100', '110', '90'],
    correct: 0,
    explanation: 'Middle: [50, 70]. Top: 50 + 70 = 120.'
  },
  {
    question: 'Magic sum of 3×3 square using digits 1 to 9 is:',
    options: ['15', '18', '12', '20'],
    correct: 0,
    explanation: 'Total sum 45 ÷ 3 = 15.'
  },
  {
    question: 'Which digit is in the center of the 3×3 magic square?',
    options: ['5', '1', '9', '4'],
    correct: 0,
    explanation: 'Center is always 5.'
  },
  {
    question: 'Turn 28 into a palindrome: 28 + 82 = 110, then 110 + 011 = _____?',
    options: ['121', '111', '122', '131'],
    correct: 0,
    explanation: '110 + 11 = 121 (a palindrome!).'
  },
  {
    question: 'Sum of triangular numbers 3 and 6 is:',
    options: ['9 (which is 3²)', '10', '8', '12'],
    correct: 0,
    explanation: 'Two consecutive triangular numbers sum to a square: 3 + 6 = 9 = 3².'
  },
  {
    question: 'Next term: 1, 4, 9, 16, 25, _____?',
    options: ['36', '35', '49', '30'],
    correct: 0,
    explanation: 'Square numbers: 6² = 36.'
  },
  {
    question: 'Next term in Fibonacci: 3, 5, 8, 13, _____?',
    options: ['21', '20', '19', '22'],
    correct: 0,
    explanation: '8 + 13 = 21.'
  },
  {
    question: 'Base of tower is [7, 8, 9]. Top block is:',
    options: ['32', '30', '28', '34'],
    correct: 0,
    explanation: 'Middle: [15, 17]. Top: 15 + 17 = 32.'
  },
  {
    question: 'Growing pattern: 10, 11, 13, 16, 20, _____?',
    options: ['25', '24', '26', '23'],
    correct: 0,
    explanation: 'Differences are +1, +2, +3, +4, +5. 20 + 5 = 25.'
  },
  {
    question: 'Is 252 a palindromic special number?',
    options: ['Yes', 'No'],
    correct: 0,
    explanation: '252 reads the same forwards and backwards!'
  },
  {
    question: 'Secret riddle: "Between 70 and 80. Sum of digits is 12. Tens is 2 more than ones." The number is:',
    options: ['75', '74', '76', '84'],
    correct: 0,
    explanation: 'Tens is 7, ones is 5. 7 + 5 = 12. Number is 75!'
  },
  {
    question: 'Next set in pattern 1, 2, 3; 2, 3, 6; 3, 4, 9; _____?',
    options: ['(4, 5, 12)', '(4, 5, 16)', '(4, 5, 10)', '(4, 6, 12)'],
    correct: 0,
    explanation: '1st is 4, 2nd is 5, 3rd is 1st × 3 = 4 × 3 = 12: (4, 5, 12).'
  }
];

