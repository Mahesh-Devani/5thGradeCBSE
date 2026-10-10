/**
 * Maths Master — Class 5 CBSE
 * Modularized Architecture (Vanilla ES6+ JS)
 * Zero External Runtime Dependencies
 */

'use strict';

/* ==========================================================================
   5.6 TOPIC 3: MATHEMATICAL EXPRESSIONS & STATEMENTS DATA & PRESETS
   ========================================================================== */

const CLUE_WORDS_DATA = {
  add: {
    id: 'add',
    name: 'Addition (+)',
    symbol: '+',
    cls: 'cat-add',
    chips: ['sum of', 'increased by', 'more than', 'total of', 'added to', 'exceeds by', 'greater than', 'combined'],
    exampleText: '7 more than x',
    exampleExpr: 'x + 7',
    notes: 'Addition is commutative: x + 7 is the same value as 7 + x.'
  },
  sub: {
    id: 'sub',
    name: 'Subtraction (−)',
    symbol: '−',
    cls: 'cat-sub',
    chips: ['difference of', 'decreased by', 'less than', 'diminished by', 'subtracted from', 'taken away from', 'minus', 'reduced by'],
    exampleText: '8 subtracted from twice y',
    exampleExpr: '2y − 8',
    notes: '⚠️ ORDER MATTERS! "subtracted from" and "less than" flip the operands! 8 subtracted from y is y − 8, NEVER 8 − y.'
  },
  mul: {
    id: 'mul',
    name: 'Multiplication (×)',
    symbol: '×',
    cls: 'cat-mul',
    chips: ['product of', 'times', 'twice (2×)', 'thrice (3×)', 'multiplied by', 'double', 'triple', 'of'],
    exampleText: 'product of 4 and m',
    exampleExpr: '4m (or 4 × m)',
    notes: 'In algebra, we write 4m without a multiplication sign to avoid confusing × with variable x.'
  },
  div: {
    id: 'div',
    name: 'Division (÷)',
    symbol: '÷',
    cls: 'cat-div',
    chips: ['quotient of', 'divided by', 'ratio of', 'half of (÷2)', 'one-third of (÷3)', 'one-fourth / quarter (÷4)'],
    exampleText: 'quotient of p divided by 5',
    exampleExpr: 'p / 5',
    notes: 'In algebra, division is written as a fraction p / 5 rather than using the ÷ symbol.'
  },
  grp: {
    id: 'grp',
    name: 'Parentheses / Grouping ( )',
    symbol: '( )',
    cls: 'cat-grp',
    chips: ['sum of ... multiplied by', 'twice the sum of', 'one-third of the difference of', 'difference of ... times'],
    exampleText: 'twice the sum of a and 6',
    exampleExpr: '2(a + 6)',
    notes: 'Parentheses group operations to happen FIRST before multiplication or division.'
  }
};

const EXPR_PRESETS_STATEMENT_TO_MATH = [
  {
    id: 'p1',
    statement: '7 more than 5 times a number x',
    dissection: [
      { text: '5 times a number x', type: 'var', role: '5x' },
      { text: 'more than (+)', type: 'op', role: '+' },
      { text: '7', type: 'const', role: '7' }
    ],
    expression: '5x + 7',
    steps: '1. "5 times a number x" is written as <strong>5x</strong>.<br>2. "7 more than" indicates addition of 7.<br>3. Combining them gives <strong>5x + 7</strong>.',
    isTrap: false
  },
  {
    id: 'p2',
    statement: '8 subtracted from twice a number y',
    dissection: [
      { text: 'twice a number y', type: 'var', role: '2y' },
      { text: 'subtracted from (−)', type: 'op', role: '−' },
      { text: '8', type: 'const', role: '8' }
    ],
    expression: '2y − 8',
    steps: '🚨 <strong>EXAM TRAP ALERT:</strong> The phrase "subtracted from" means 8 is taken away from 2y. Therefore, 2y comes FIRST: <strong>2y − 8</strong> (NOT 8 − 2y)!',
    isTrap: true
  },
  {
    id: 'p3',
    statement: 'One-third of the sum of p and 12',
    dissection: [
      { text: 'sum of p and 12', type: 'grp', role: '(p + 12)' },
      { text: 'One-third of (÷3)', type: 'op', role: '/ 3' }
    ],
    expression: '(p + 12) / 3',
    steps: '1. "sum of p and 12" is grouped in brackets: <strong>(p + 12)</strong>.<br>2. "One-third of" means divide the entire sum by 3.<br>3. Result: <strong>(p + 12) / 3</strong>.',
    isTrap: false
  },
  {
    id: 'p4',
    statement: 'Twice the difference of m and 4',
    dissection: [
      { text: 'difference of m and 4', type: 'grp', role: '(m − 4)' },
      { text: 'Twice (×2)', type: 'op', role: '2 ×' }
    ],
    expression: '2(m − 4)',
    steps: '1. "difference of m and 4" is <strong>(m − 4)</strong> in parentheses.<br>2. "Twice" means multiply the entire bracket by 2: <strong>2(m − 4)</strong>.',
    isTrap: false
  },
  {
    id: 'p5',
    statement: '10 less than 4 times a number k',
    dissection: [
      { text: '4 times a number k', type: 'var', role: '4k' },
      { text: 'less than (−)', type: 'op', role: '−' },
      { text: '10', type: 'const', role: '10' }
    ],
    expression: '4k − 10',
    steps: '🚨 <strong>EXAM TRAP ALERT:</strong> "10 less than" means start with 4k and subtract 10. The correct expression is <strong>4k − 10</strong> (NOT 10 − 4k)!',
    isTrap: true
  },
  {
    id: 'p6',
    statement: 'Product of a and b divided by 5',
    dissection: [
      { text: 'Product of a and b', type: 'var', role: 'ab' },
      { text: 'divided by (÷)', type: 'op', role: '/ 5' }
    ],
    expression: 'ab / 5',
    steps: '1. "Product of a and b" is <strong>ab</strong>.<br>2. "divided by 5" puts 5 in the denominator: <strong>ab / 5</strong>.',
    isTrap: false
  }
];

const EXPR_PRESETS_MATH_TO_STATEMENT = [
  {
    id: 'm1',
    expression: '3x + 8',
    inner: '3 times x (3x)',
    outer: '8 added to it',
    phrasings: [
      '8 added to 3 times a number x',
      '8 more than the product of 3 and x',
      'Sum of thrice x and 8'
    ]
  },
  {
    id: 'm2',
    expression: '2(y − 5)',
    inner: 'Difference between y and 5 in brackets',
    outer: 'Multiplied by 2 (Twice)',
    phrasings: [
      'Twice the difference of y and 5',
      '2 multiplied by the difference between y and 5',
      'Double the quantity (y − 5)'
    ]
  },
  {
    id: 'm3',
    expression: '4m − 7',
    inner: '4 times m (4m)',
    outer: '7 is subtracted',
    phrasings: [
      '7 subtracted from 4 times a number m (CBSE Standard)',
      '7 less than the product of 4 and m',
      'Difference between 4m and 7'
    ]
  },
  {
    id: 'm4',
    expression: '(p + 6) / 2',
    inner: 'Sum of p and 6 in brackets',
    outer: 'Divided by 2 (Half)',
    phrasings: [
      'Half of the sum of p and 6',
      'Sum of p and 6 divided by 2',
      'Quotient when (p + 6) is divided by 2'
    ]
  },
  {
    id: 'm5',
    expression: '15 − 3k',
    inner: '3 times k (3k)',
    outer: 'Subtracted from 15',
    phrasings: [
      '3 times k subtracted from 15',
      '15 decreased by thrice of k',
      'Difference between 15 and 3k'
    ]
  }
];

const DILEMMA_PRESETS = [
  {
    id: 'd1',
    title: '3(x + 4) vs 3x + 4',
    varName: 'x',
    defaultVal: 2,
    exprA: '3(x + 4)',
    labelA: 'With Brackets: 3 × (x + 4)',
    exprB: '3x + 4',
    labelB: 'Without Brackets: 3x + 4',
    calcA: (x) => ({
      step1: `${x} + 4 = ${x + 4} (bracket first)`,
      step2: `3 × ${x + 4} = ${3 * (x + 4)}`,
      res: 3 * (x + 4)
    }),
    calcB: (x) => ({
      step1: `3 × ${x} = ${3 * x} (multiplication first)`,
      step2: `${3 * x} + 4 = ${3 * x + 4}`,
      res: 3 * x + 4
    }),
    reason: 'In <strong>3(x + 4)</strong>, parentheses force the addition to occur first, so BOTH x and 4 are tripled! In <strong>3x + 4</strong>, only x is tripled, and 4 is added at the end.'
  },
  {
    id: 'd2',
    title: '2(y − 5) vs 2y − 5',
    varName: 'y',
    defaultVal: 8,
    exprA: '2(y − 5)',
    labelA: 'With Brackets: 2 × (y − 5)',
    exprB: '2y − 5',
    labelB: 'Without Brackets: 2y − 5',
    calcA: (y) => ({
      step1: `${y} − 5 = ${y - 5} (bracket first)`,
      step2: `2 × ${y - 5} = ${2 * (y - 5)}`,
      res: 2 * (y - 5)
    }),
    calcB: (y) => ({
      step1: `2 × ${y} = ${2 * y} (multiplication first)`,
      step2: `${2 * y} − 5 = ${2 * y - 5}`,
      res: 2 * y - 5
    }),
    reason: 'In <strong>2(y − 5)</strong>, you subtract 5 first, then multiply by 2. In <strong>2y − 5</strong>, you double y first, then subtract 5.'
  },
  {
    id: 'd3',
    title: '(p + 6)/2 vs p/2 + 6',
    varName: 'p',
    defaultVal: 4,
    exprA: '(p + 6) / 2',
    labelA: 'With Brackets: (p + 6) ÷ 2',
    exprB: 'p/2 + 6',
    labelB: 'Without Brackets: p ÷ 2 + 6',
    calcA: (p) => ({
      step1: `${p} + 6 = ${p + 6} (bracket first)`,
      step2: `${p + 6} ÷ 2 = ${(p + 6) / 2}`,
      res: (p + 6) / 2
    }),
    calcB: (p) => ({
      step1: `${p} ÷ 2 = ${p / 2} (division first)`,
      step2: `${p / 2} + 6 = ${p / 2 + 6}`,
      res: p / 2 + 6
    }),
    reason: 'In <strong>(p + 6)/2</strong>, the whole sum is divided by 2. In <strong>p/2 + 6</strong>, only p is halved, and 6 remains whole!'
  }
];

const REAL_WORLD_PRESETS = [
  {
    id: 'rw1',
    category: '🎂 Age Comparison',
    story: 'Rohan is 4 years older than twice his sister Priya’s age.',
    variableDecl: 'Let Priya’s age be <strong>s</strong> years.',
    derivation: [
      { step: 'Twice Priya’s age', expr: '2s' },
      { step: '4 years older (+4)', expr: '+ 4' },
      { step: 'Rohan’s age expression', expr: '2s + 4' }
    ],
    finalExpr: '2s + 4',
    testScenario: 'If Priya is 8 years old, Rohan is 2(8) + 4 = 16 + 4 = 20 years old.'
  },
  {
    id: 'rw2',
    category: '🛍️ Shopping & Pocket Money',
    story: 'Kabir had ₹100. He bought m packets of chips at ₹12 each.',
    variableDecl: 'Number of packets bought = <strong>m</strong>.',
    derivation: [
      { step: 'Cost of 1 packet', expr: '₹12' },
      { step: 'Cost of m packets', expr: '12m' },
      { step: 'Money left from ₹100', expr: '100 − 12m' }
    ],
    finalExpr: '100 − 12m',
    testScenario: 'If Kabir buys 5 packets, he spends 12 × 5 = ₹60. Money remaining = 100 − 60 = ₹40.'
  },
  {
    id: 'rw3',
    category: '📐 Geometry & Ribbons',
    story: 'The length of a rectangular garden is 5m more than its breadth b.',
    variableDecl: 'Breadth = <strong>b</strong> meters. Length = <strong>b + 5</strong> meters.',
    derivation: [
      { step: 'Perimeter formula', expr: '2 × (Length + Breadth)' },
      { step: 'Substitute Length', expr: '2 × ((b + 5) + b)' },
      { step: 'Simplify inside', expr: '2 × (2b + 5) = 4b + 10' }
    ],
    finalExpr: '2(2b + 5) or 4b + 10',
    testScenario: 'If breadth b = 10m, length = 15m. Perimeter = 2(15 + 10) = 50m.'
  },
  {
    id: 'rw4',
    category: '🔮 Number Riddle',
    story: 'I think of a secret number k, multiply it by 6, subtract 9, and divide the result by 3.',
    variableDecl: 'Secret number = <strong>k</strong>.',
    derivation: [
      { step: 'Multiply by 6', expr: '6k' },
      { step: 'Subtract 9', expr: '6k − 9' },
      { step: 'Divide result by 3', expr: '(6k − 9) / 3 = 2k − 3' }
    ],
    finalExpr: '(6k − 9) / 3',
    testScenario: 'If secret number k = 7: 6(7) = 42. 42 − 9 = 33. 33 ÷ 3 = 11.'
  }
];



const LEARN_MODULES_TOPIC_3 = {
  clue_words_dictionary: {
    id: 'clue_words_dictionary',
    pillTitle: '📖 Clue Words & Traps',
    title: 'Clue Words Dictionary & The "Order Trap" Alert',
    tag: 'Essential Vocabulary',
    lead: 'Algebra begins with translating everyday English into mathematical language! Learn the secret operation clue words for <strong>+, −, ×, ÷, and parentheses</strong>, and beware the famous <strong>"subtracted from" order trap</strong>.',
    renderContent: (...args) => renderClueWordsModule(...args)
  },
  interactive_translator: {
    id: 'interactive_translator',
    pillTitle: '🔄 Dual-Way Translator',
    title: 'Dual-Way Live Translator (Statements ⇄ Expressions)',
    tag: 'Interactive Tool',
    lead: 'Convert verbal statements into clean mathematical expressions, or reverse mathematical expressions into standard CBSE verbal statements with dissected grammar chips.',
    renderContent: (...args) => renderTranslatorModule(...args)
  },
  parentheses_grouping_lab: {
    id: 'parentheses_grouping_lab',
    pillTitle: '🔬 Parentheses Lab',
    title: 'The Parentheses Lab: Why Brackets Change Everything!',
    tag: 'Visual Experiment',
    lead: 'Does <code>3 × (x + 4)</code> equal <code>3x + 4</code>? Test both expressions side-by-side with an interactive variable slider to see why brackets alter the order of operations.',
    renderContent: (...args) => renderParenthesesLabModule(...args)
  },
  real_world_scenarios: {
    id: 'real_world_scenarios',
    pillTitle: '🌍 Real-Life Word Modeler',
    title: 'Modeling Real-Life Situations with Expressions',
    tag: 'CBSE Word Problems',
    lead: 'Discover how to represent age comparisons, shopping bills, geometry perimeters, and number riddles using algebraic variables.',
    renderContent: (...args) => renderRealWorldModule(...args)
  },
  spot_the_mistakes: {
    id: 'spot_the_mistakes',
    pillTitle: '🕵️ Spot the Mistakes',
    title: 'Be the Teacher: Spot the Mistakes!',
    tag: 'Diagnostic Thinking',
    lead: 'Diagnosing algebraic translation and order-of-operation slips builds total exam immunity. Catch classic bracket omissions, BODMAS slips, and subtraction reversals!',
    renderContent: (...args) => renderSpotMistakesTopic3(...args)
  }
};



const PRACTICE_POOL_TOPIC_3 = [
  // Category 1: Statement to Mathematical Expression
  {
    id: 'expr_q1',
    skill: 'statement_to_expr',
    type: 'mcq',
    question: 'Which mathematical expression represents "7 more than 5 times a number x"?',
    options: ['5x + 7', '7x + 5', '5(x + 7)', '5x − 7'],
    correct: 0,
    explanation: '"5 times a number x" is 5x. "7 more than" means adding 7. Therefore, the expression is 5x + 7.',
    source: 'CBSE Class 5 Exam Standard'
  },
  {
    id: 'expr_q2',
    skill: 'statement_to_expr',
    type: 'mcq',
    question: 'Which mathematical expression represents "9 subtracted from twice a number y"?',
    options: ['2y − 9', '9 − 2y', '2(y − 9)', '2y + 9'],
    correct: 0,
    explanation: '🚨 EXAM TRAP: The phrase "subtracted from" means 9 is taken away from 2y. So 2y comes FIRST: 2y − 9 (NOT 9 − 2y)!',
    source: 'CBSE Class 5 Exam Trap'
  },
  {
    id: 'expr_q3',
    skill: 'statement_to_expr',
    type: 'mcq',
    question: 'Which expression represents "One-fourth of the sum of a number a and 8"?',
    options: ['(a + 8) / 4', 'a/4 + 8', '4(a + 8)', 'a + 8/4'],
    correct: 0,
    explanation: '"Sum of a and 8" is grouped in brackets (a + 8). One-fourth of this sum means dividing the whole sum by 4: (a + 8) / 4.',
    source: 'CBSE Class 5 Exam Standard'
  },
  {
    id: 'expr_q4',
    skill: 'statement_to_expr',
    type: 'mcq',
    question: 'Which expression represents "Product of numbers m and n divided by 6"?',
    options: ['mn / 6', '6 / mn', 'm + n / 6', '6(m + n)'],
    correct: 0,
    explanation: '"Product of m and n" is mn. Dividing by 6 gives mn / 6.',
    source: 'CBSE Class 5 Exam Standard'
  },
  {
    id: 'expr_q5',
    skill: 'statement_to_expr',
    type: 'mcq',
    question: 'Which expression represents "15 decreased by 3 times a number k"?',
    options: ['15 − 3k', '3k − 15', '3(15 − k)', '15 / 3k'],
    correct: 0,
    explanation: '"15 decreased by" means starting with 15 and subtracting 3 times k (3k). Result: 15 − 3k.',
    source: 'CBSE Class 5 Exam Standard'
  },
  {
    id: 'expr_q6',
    skill: 'statement_to_expr',
    type: 'mcq',
    question: 'Which expression represents "8 added to the quotient of p divided by 3"?',
    options: ['p/3 + 8', '(p + 8)/3', '3/p + 8', '8p / 3'],
    correct: 0,
    explanation: '"Quotient of p divided by 3" is p/3. Adding 8 to it gives p/3 + 8.',
    source: 'CBSE Class 5 Exam Standard'
  },

  // Category 2: Expression to Verbal Statement
  {
    id: 'expr_q7',
    skill: 'expr_to_statement',
    type: 'mcq',
    question: 'Which verbal statement correctly describes the mathematical expression 4x − 7?',
    options: [
      '7 subtracted from 4 times a number x',
      '4 times a number x subtracted from 7',
      '4 subtracted from 7 times x',
      'Difference between 7 and 4 times x'
    ],
    correct: 0,
    explanation: 'In 4x − 7, 7 is being subtracted from 4x. Therefore, the standard statement is "7 subtracted from 4 times x".',
    source: 'CBSE Class 5 Reverse Translation'
  },
  {
    id: 'expr_q8',
    skill: 'expr_to_statement',
    type: 'mcq',
    question: 'Which verbal statement correctly describes the expression 3(p + 5)?',
    options: [
      '3 times the sum of a number p and 5',
      '5 added to 3 times a number p',
      'Product of 3 and p plus 5',
      'Sum of 3 times p and 15'
    ],
    correct: 0,
    explanation: 'The brackets group (p + 5), which is the sum of p and 5. Multiplying by 3 outside means "3 times the sum of p and 5".',
    source: 'CBSE Class 5 Reverse Translation'
  },
  {
    id: 'expr_q9',
    skill: 'expr_to_statement',
    type: 'mcq',
    question: 'Which verbal statement correctly describes the expression y/2 + 10?',
    options: [
      '10 added to half of a number y',
      'Half of the sum of y and 10',
      'y divided by 12',
      '10 subtracted from half of y'
    ],
    correct: 0,
    explanation: 'y/2 is half of y. Adding 10 means "10 added to half of y". (Note: "Half of the sum of y and 10" would be (y + 10)/2, which is different!).',
    source: 'CBSE Class 5 Reverse Translation'
  },
  {
    id: 'expr_q10',
    skill: 'expr_to_statement',
    type: 'mcq',
    question: 'Which verbal statement correctly describes 12 − 5m?',
    options: [
      '5 times m subtracted from 12',
      '12 subtracted from 5 times m',
      'Difference between 5m and 12',
      '12 less than 5m'
    ],
    correct: 0,
    explanation: 'Since 5m is being subtracted from 12, the correct statement is "5 times m subtracted from 12" or "12 decreased by 5 times m".',
    source: 'CBSE Class 5 Reverse Translation'
  },
  {
    id: 'expr_q11',
    skill: 'expr_to_statement',
    type: 'mcq',
    question: 'Which statement correctly describes (a − 4) / 3?',
    options: [
      'One-third of the difference between a and 4',
      '4 subtracted from one-third of a',
      'Difference between a and 4 divided by 4',
      '3 divided by the difference of a and 4'
    ],
    correct: 0,
    explanation: '(a − 4) is the difference between a and 4. Dividing by 3 means "One-third of the difference between a and 4".',
    source: 'CBSE Class 5 Reverse Translation'
  },

  // Category 3: Bracket & Order Traps
  {
    id: 'expr_q12',
    skill: 'bracket_traps',
    type: 'mcq',
    question: 'Which expression correctly represents "Twice the sum of a number x and 9"?',
    options: ['2(x + 9)', '2x + 9', '2x + 18', 'x + 18'],
    correct: 0,
    explanation: '"Twice the sum" requires parentheses around the sum: 2(x + 9). Writing 2x + 9 means "9 added to twice x", which does not double the 9!',
    source: 'CBSE Parentheses Rule'
  },
  {
    id: 'expr_q13',
    skill: 'bracket_traps',
    type: 'mcq',
    question: 'What is the value of 3(x + 2) and 3x + 2 when x = 4?',
    options: [
      '18 and 14 (they have different values)',
      '18 and 18 (they are always equal)',
      '14 and 18',
      '12 and 14'
    ],
    correct: 0,
    explanation: '• For 3(x + 2) with x = 4: 3(4 + 2) = 3(6) = 18.\\n• For 3x + 2 with x = 4: 3(4) + 2 = 12 + 2 = 14.\\nThis proves that brackets fundamentally change the result!',
    source: 'CBSE Numerical Proof'
  },
  {
    id: 'expr_q14',
    skill: 'bracket_traps',
    type: 'mcq',
    question: 'A student wrote "8 − y" for the statement "8 less than a number y". Is the student correct?',
    options: [
      'No, the correct expression is y − 8',
      'Yes, 8 − y is correct',
      'Both y − 8 and 8 − y are the same',
      'No, it should be 8y'
    ],
    correct: 0,
    explanation: '"8 less than y" means you start with y and take away 8. For example, 8 less than 10 is 10 − 8 = 2, not 8 − 10! The correct expression is y − 8.',
    source: 'CBSE Exam Pitfall'
  },
  {
    id: 'expr_q15',
    skill: 'bracket_traps',
    type: 'mcq',
    question: 'Which expression represents "Sum of 4 times a number p and 7"?',
    options: ['4p + 7', '4(p + 7)', 'p + 28', '7p + 4'],
    correct: 0,
    explanation: '"4 times p" is 4p. The sum of 4p and 7 is 4p + 7. Brackets are NOT needed here because 4 only multiplies p, not the 7.',
    source: 'CBSE Class 5 Exam Standard'
  },
  {
    id: 'expr_q16',
    skill: 'bracket_traps',
    type: 'mcq',
    question: 'Which expression correctly represents "Half of the difference between m and 6"?',
    options: ['(m − 6) / 2', 'm/2 − 6', 'm − 6/2', '2(m − 6)'],
    correct: 0,
    explanation: '"Difference between m and 6" is (m − 6). Half of this entire difference is (m − 6) / 2.',
    source: 'CBSE Parentheses Rule'
  },

  // Category 4: Real-Life CBSE Scenarios
  {
    id: 'expr_q17',
    skill: 'word_problems',
    type: 'mcq',
    question: 'Rohan’s age is 5 years more than twice his sister Priya’s age s. What is Rohan’s age?',
    options: ['2s + 5', '5s + 2', '2(s + 5)', 's/2 + 5'],
    correct: 0,
    explanation: 'Priya’s age = s.\\nTwice Priya’s age = 2s.\\n5 years more than that = 2s + 5.',
    source: 'CBSE Age Problem'
  },
  {
    id: 'expr_q18',
    skill: 'word_problems',
    type: 'mcq',
    question: 'Maya bought n notebooks at ₹25 each and 1 pen for ₹15. Which expression shows the total cost?',
    options: ['25n + 15', '15n + 25', '25(n + 15)', '40n'],
    correct: 0,
    explanation: 'Cost of n notebooks at ₹25 each = 25n.\\nCost of pen = ₹15.\\nTotal cost = 25n + 15.',
    source: 'CBSE Money Problem'
  },
  {
    id: 'expr_q19',
    skill: 'word_problems',
    type: 'mcq',
    question: 'The breadth of a rectangle is b cm. Its length is 4 cm more than its breadth. What is its perimeter?',
    options: ['2(2b + 4) or 4b + 8', '2(b + 4)', 'b + 4', '4b + 4'],
    correct: 0,
    explanation: 'Breadth = b.\\nLength = b + 4.\\nPerimeter = 2 × (Length + Breadth) = 2 × ((b + 4) + b) = 2 × (2b + 4) = 4b + 8 cm.',
    source: 'CBSE Geometry Problem'
  },
  {
    id: 'expr_q20',
    skill: 'word_problems',
    type: 'mcq',
    question: 'Kabir had ₹100. He bought m chocolates at ₹8 each. How much money is left with him?',
    options: ['100 − 8m', '8m − 100', '100 + 8m', '100 / 8m'],
    correct: 0,
    explanation: 'Initial money = ₹100.\\nMoney spent on m chocolates at ₹8 each = 8m.\\nMoney left = Total − Spent = 100 − 8m.',
    source: 'CBSE Word Problem Application'
  },
  {
    id: 'expr_q21',
    skill: 'bracket_traps',
    type: 'mcq',
    question: 'Simplify using BODMAS: 28 + 45 ÷ 9 × 2 − 10',
    options: ['28', '36', '18', '24'],
    correct: 0,
    explanation: 'Step 1 (Division): 45 ÷ 9 = 5 ➔ 28 + 5 × 2 − 10\\nStep 2 (Multiplication): 5 × 2 = 10 ➔ 28 + 10 − 10\\nStep 3 (Addition & Subtraction): 28 + 10 = 38, and 38 − 10 = 28!',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 9a)'
  },
  {
    id: 'expr_q22',
    skill: 'bracket_traps',
    type: 'mcq',
    question: 'Simplify using BODMAS: (48 − 35) × 2 + 30 ÷ 15',
    options: ['28', '26', '30', '15'],
    correct: 0,
    explanation: 'Step 1 (Brackets first): 48 − 35 = 13 ➔ 13 × 2 + 30 ÷ 15\\nStep 2 (Multiply & Divide): 13 × 2 = 26, and 30 ÷ 15 = 2\\nStep 3 (Addition): 26 + 2 = 28!',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 9b)'
  },
  {
    id: 'expr_q23',
    skill: 'expr_to_statement',
    type: 'mcq',
    question: 'Write the numerical expression in words: (2 × 5) − 6',
    options: [
      '6 subtracted from the product of 2 and 5',
      'The product of 2 and 5 subtracted from 6',
      '2 multiplied by 5 minus 6 times 2',
      'Difference of 6 and 10'
    ],
    correct: 0,
    explanation: 'The brackets group (2 × 5) which is "the product of 2 and 5". Subtracting 6 means "6 subtracted from the product of 2 and 5".',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 12a)'
  },
  {
    id: 'expr_q24',
    skill: 'expr_to_statement',
    type: 'mcq',
    question: 'Write the numerical expression in words: (90 − 30) ÷ (30 − 20)',
    options: [
      'The quotient of the difference of 90 and 30, and the difference of 30 and 20',
      'The product of 60 and 10',
      '90 minus 30 divided by 30 minus 20 without brackets',
      'The sum of 90 and 30 divided by 10'
    ],
    correct: 0,
    explanation: '(90 − 30) is the difference of 90 and 30 (= 60). (30 − 20) is the difference of 30 and 20 (= 10). The division symbol represents their quotient: 60 ÷ 10 = 6.',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 12b)'
  },
  {
    id: 'expr_q25',
    skill: 'statement_to_expr',
    type: 'mcq',
    question: 'Write the numerical expression for: "The quotient of 45 and the sum of 2 and 3"',
    options: ['45 ÷ (2 + 3)', '(45 ÷ 2) + 3', '45 × (2 + 3)', '(2 + 3) ÷ 45'],
    correct: 0,
    explanation: '"The sum of 2 and 3" is grouped as (2 + 3). The quotient of 45 and this sum means 45 divided by (2 + 3): 45 ÷ (2 + 3) = 45 ÷ 5 = 9.',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 13a)'
  },
  {
    id: 'expr_q26',
    skill: 'statement_to_expr',
    type: 'mcq',
    question: 'Write the numerical expression for: "The product of the sum of 56 and 4 and the difference of 11 and 10"',
    options: [
      '(56 + 4) × (11 − 10)',
      '(56 + 4) + (11 − 10)',
      '56 + 4 × 11 − 10',
      '(56 − 4) × (11 + 10)'
    ],
    correct: 0,
    explanation: '"Sum of 56 and 4" is (56 + 4) = 60. "Difference of 11 and 10" is (11 − 10) = 1. Their product is (56 + 4) × (11 − 10) = 60 × 1 = 60.',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 13b)'
  }
];



const CHALLENGE_QUESTIONS_TOPIC_3 = [
  {
    question: 'Which expression represents "5 more than 3 times x"?',
    options: ['3x + 5', '5x + 3', '3(x + 5)', '3x − 5'],
    correct: 0,
    explanation: '3 times x is 3x, plus 5 gives 3x + 5.'
  },
  {
    question: 'Does "7 subtracted from y" mean y − 7 or 7 − y?',
    options: ['y − 7', '7 − y'],
    correct: 0,
    explanation: '"Subtracted from" flips the order: y − 7!'
  },
  {
    question: 'Which expression has brackets: "Twice the sum of a and 4"?',
    options: ['2(a + 4)', '2a + 4', '2a + 8', 'a + 8'],
    correct: 0,
    explanation: '"Twice the sum" doubles the entire group (a + 4).'
  },
  {
    question: 'What is 4(x + 1) when x = 3?',
    options: ['16', '13', '12', '7'],
    correct: 0,
    explanation: 'Bracket first: 3 + 1 = 4. Then 4 × 4 = 16!'
  },
  {
    question: 'What is 4x + 1 when x = 3?',
    options: ['13', '16', '12', '7'],
    correct: 0,
    explanation: 'Multiply first: 4 × 3 = 12. Then 12 + 1 = 13!'
  },
  {
    question: 'Translate 2m − 5 into words:',
    options: ['5 subtracted from twice m', 'Twice m subtracted from 5', '2 subtracted from 5m', '5 less than m'],
    correct: 0,
    explanation: '5 is taken away from 2m: "5 subtracted from twice m".'
  },
  {
    question: 'Which expression represents "Half of a number p"?',
    options: ['p / 2', '2 / p', 'p − 2', '2p'],
    correct: 0,
    explanation: 'Half of a number is p / 2.'
  },
  {
    question: 'Rohan is 3 years older than twice Anil’s age a. Rohan’s age is:',
    options: ['2a + 3', '3a + 2', '2(a + 3)', 'a + 6'],
    correct: 0,
    explanation: 'Twice Anil’s age = 2a. 3 years older = 2a + 3.'
  },
  {
    question: 'Cost of 4 notebooks at ₹x each and 1 eraser for ₹5:',
    options: ['4x + 5', '5x + 4', '4(x + 5)', '20x'],
    correct: 0,
    explanation: 'Cost = 4 × x + 5 = 4x + 5.'
  },
  {
    question: 'Translate "One-third of the sum of x and 9":',
    options: ['(x + 9) / 3', 'x/3 + 9', '3(x + 9)', 'x + 3'],
    correct: 0,
    explanation: 'Sum is in brackets (x + 9), divided by 3: (x + 9) / 3.'
  },
  {
    question: 'Is 10 − 2y the same as 2y − 10?',
    options: ['No, subtraction is not commutative', 'Yes, they have the same value', 'Only when y = 0', 'Only when y = 10'],
    correct: 0,
    explanation: 'Subtraction order matters! E.g. if y = 2: 10 − 4 = 6, but 4 − 10 = −6.'
  },
  {
    question: 'Perimeter of a square of side length s is:',
    options: ['4s', 's + 4', 's²', '4 + s'],
    correct: 0,
    explanation: 'Perimeter of square = 4 × side = 4s.'
  },
  {
    question: 'Translate "6 less than 5 times k":',
    options: ['5k − 6', '6 − 5k', '5(k − 6)', '6k − 5'],
    correct: 0,
    explanation: '"6 less than" means subtract 6 from 5k: 5k − 6.'
  },
  {
    question: 'Translate (m − 8) / 4 into words:',
    options: ['One-fourth of the difference between m and 8', '8 subtracted from one-fourth of m', '4 divided by m − 8', 'm divided by 32'],
    correct: 0,
    explanation: 'Difference (m − 8) is divided by 4.'
  },
  {
    question: 'Kabir has ₹50 and spends ₹c on candy. Money left is:',
    options: ['50 − c', 'c − 50', '50 + c', '50c'],
    correct: 0,
    explanation: 'Remaining money = 50 − c.'
  }
];

