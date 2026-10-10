/**
 * Maths Master — Class 5 CBSE
 * Modularized Architecture (Vanilla ES6+ JS)
 * Zero External Runtime Dependencies
 */

'use strict';

const LEARN_MODULES_TOPIC_1 = {
  hcf_lcm_detective: {
    id: 'hcf_lcm_detective',
    pillTitle: '🧠 HCF vs LCM Detective',
    title: 'HCF vs LCM Detective: Which One To Use When?',
    tag: 'Concept & Real Life',
    lead: 'Class 5 students often get confused by word problems. Here is the secret detective rule: <strong>HCF divides/splits things down</strong> into the biggest possible equal groups, whereas <strong>LCM multiples/grows things up</strong> to find when cycles meet together again!',
    renderContent: (...args) => renderDetectiveModule(...args)
  },
  mental_estimator: {
    id: 'mental_estimator',
    pillTitle: '⚡ The Mental Estimator',
    title: 'The Mental Estimator: Deduce Before You Calculate!',
    tag: 'Deductive Thinking',
    lead: 'Great mathematicians never blindly start dividing. They use common-sense boundaries to test if an answer is even mathematically possible in 5 seconds!',
    renderContent: (...args) => renderMentalEstimatorModule(...args)
  },
  short_division: {
    id: 'short_division',
    pillTitle: '🪜 Short Division Ladder',
    title: 'Short Division Method: HCF vs LCM Difference',
    tag: 'Calculation Master',
    lead: 'Short division is the fastest way to calculate HCF and LCM. But there is a <strong>critical difference</strong> between the two approaches! In HCF, the divisor must divide ALL numbers simultaneously. In LCM, you divide if at least 2 divide and bring down the rest.',
    renderContent: (...args) => renderShortDivisionModule(...args)
  },
  long_division: {
    id: 'long_division',
    pillTitle: '➗ Long Division (Large Numbers)',
    title: 'Long Division Method for HCF (Euclidean Algorithm)',
    tag: 'Exam Technique',
    lead: 'When numbers are large (like 96, 144, 192), short division can take too many steps. The <strong>Long Division Method</strong> uses successive division where each remainder becomes the new divisor until the remainder reaches 0!',
    renderContent: (...args) => renderLongDivisionModule(...args)
  },
  product_formula: {
    id: 'product_formula',
    pillTitle: '⚖️ Product Relation Formula',
    title: 'Product of 2 Numbers = Product of their HCF & LCM',
    tag: 'Core Formula',
    lead: 'For ANY two numbers, the product of the numbers is always strictly equal to the product of their HCF and LCM: <strong>First Number × Second Number = HCF × LCM</strong>.',
    renderContent: (...args) => renderProductFormulaModule(...args)
  },
  coprimes_twinprimes: {
    id: 'coprimes_twinprimes',
    pillTitle: '🤝 Co-Primes & Twin Primes',
    title: 'Co-Primes & Twin Primes: Concepts & Properties',
    tag: 'Number Theory',
    lead: 'Co-primes do NOT need to be prime numbers themselves! Two numbers are co-prime if their <strong>only common factor is 1</strong> (e.g. 8 and 9). Twin primes are two prime numbers that differ by exactly 2 (e.g. 3 & 5, 11 & 13).',
    renderContent: (...args) => renderCoprimesModule(...args)
  },
  spot_the_mistakes: {
    id: 'spot_the_mistakes',
    pillTitle: '🕵️ Spot the Mistakes',
    title: 'Be the Teacher: Spot the Mistakes!',
    tag: 'Diagnostic Thinking',
    lead: 'Diagnosing mistakes is the fastest way to master mathematics. Step into the shoes of the teacher, examine student test sheets, and spot the exact blunder!',
    renderContent: (...args) => renderSpotMistakesTopic1(...args)
  }
};



const PRACTICE_POOL_TOPIC_1 = [
  // CBSE Class 5 Curriculum Worksheet — Section I: Fill in the Blanks
  {
    id: 'fib_1',
    skill: 'school_worksheet',
    type: 'mcq',
    question: 'The smallest multiple of any number is ______.',
    options: ['0', '1', 'The number itself', 'The square of the number'],
    correct: 2,
    explanation: 'Every number starts its table with itself multiplied by 1 (e.g., 5 × 1 = 5). Therefore, the smallest multiple of any number is the number itself.',
    source: 'Worksheet 2026-27 (Q I.1)'
  },
  {
    id: 'fib_2',
    skill: 'school_worksheet',
    type: 'mcq',
    question: 'The HCF of two co-prime numbers is always ______.',
    options: ['0', '1', 'Their sum', 'Their product'],
    correct: 1,
    explanation: 'By definition, co-prime numbers are two numbers that share NO common factors other than 1. Hence, their Highest Common Factor is always 1.',
    source: 'Worksheet 2026-27 (Q I.2)'
  },
  {
    id: 'fib_3',
    skill: 'school_worksheet',
    type: 'mcq',
    question: 'Two prime numbers that differ by 2 are called ______ prime numbers.',
    options: ['Co-', 'Even', 'Twin', 'Composite'],
    correct: 2,
    explanation: 'Twin prime numbers are pairs of prime numbers with a difference of 2. Examples include (3, 5), (5, 7), (11, 13), and (17, 19).',
    source: 'Worksheet 2026-27 (Q I.3)'
  },
  {
    id: 'fib_4',
    skill: 'school_worksheet',
    type: 'mcq',
    question: 'The HCF of two numbers can never be ______ than either of the numbers.',
    options: ['Smaller', 'Greater', 'Equal', 'A factor'],
    correct: 1,
    explanation: 'A factor divides a number completely. Since a factor cannot be larger than the number being divided, the HCF can never be greater than either number.',
    source: 'Worksheet 2026-27 (Q I.4)'
  },
  {
    id: 'fib_5',
    skill: 'school_worksheet',
    type: 'mcq',
    question: 'The LCM of two numbers is always ______ than or equal to each of the numbers.',
    options: ['Smaller', 'Greater', 'Half', 'Double'],
    correct: 1,
    explanation: 'Multiples of a number are greater than or equal to the number. Since LCM is a common multiple, it must be greater than or equal to each given number.',
    source: 'Worksheet 2026-27 (Q I.5)'
  },
  {
    id: 'fib_6',
    skill: 'school_worksheet',
    type: 'mcq',
    question: 'A number divisible by both 3 and 5 is always divisible by ______.',
    options: ['8', '15', '2', '35'],
    correct: 1,
    explanation: 'Since 3 and 5 are co-prime, any number divisible by both must also be divisible by their product: 3 × 5 = 15 (LCM of 3 and 5).',
    source: 'Worksheet 2026-27 (Q I.6)'
  },

  // CBSE Class 5 Curriculum Worksheet — Section II: True or False
  {
    id: 'tf_1',
    skill: 'school_worksheet',
    type: 'mcq',
    question: 'State True or False: "Every number is a factor of itself."',
    options: ['True', 'False'],
    correct: 0,
    explanation: 'True! Any number divided by itself equals 1 with remainder 0 (e.g. 17 ÷ 17 = 1). Therefore, every number is a factor of itself.',
    source: 'Worksheet 2026-27 (Q II.1)'
  },
  {
    id: 'tf_2',
    skill: 'school_worksheet',
    type: 'mcq',
    question: 'State True or False: "The number 1248 is divisible by 4."',
    options: ['True', 'False'],
    correct: 0,
    explanation: 'True! Divisibility rule for 4: Look at the last two digits. Here the last two digits are 48. Since 48 ÷ 4 = 12, 1248 is divisible by 4.',
    source: 'Worksheet 2026-27 (Q II.2)'
  },
  {
    id: 'tf_3',
    skill: 'school_worksheet',
    type: 'mcq',
    question: 'State True or False: "A prime number has exactly two factors."',
    options: ['True', 'False'],
    correct: 0,
    explanation: 'True! A prime number has strictly two distinct factors: 1 and the number itself. (Note: 1 is neither prime nor composite because it has only 1 factor).',
    source: 'Worksheet 2026-27 (Q II.3)'
  },
  {
    id: 'tf_4',
    skill: 'school_worksheet',
    type: 'mcq',
    question: 'State True or False: "Every multiple of 5 ends in 5 only."',
    options: ['True', 'False'],
    correct: 1,
    explanation: 'False! Multiples of 5 can end in either 0 or 5 (e.g., 5, 10, 15, 20, 25, 30).',
    source: 'Worksheet 2026-27 (Q II.4)'
  },

  // CBSE Class 5 Curriculum Worksheet — Section III: Calculations & Problems
  {
    id: 'calc_1',
    skill: 'division_methods',
    type: 'mcq',
    question: 'Find the smallest missing digit to make the number 62_178 divisible by 9:',
    options: ['1', '2', '3', '5'],
    correct: 2,
    explanation: 'Divisibility rule for 9: Sum of digits must be divisible by 9. Sum = 6 + 2 + _ + 1 + 7 + 8 = 24 + _. The next multiple of 9 after 24 is 27. So missing digit = 27 - 24 = 3.',
    source: 'Worksheet 2026-27 (Q III.1)'
  },
  {
    id: 'calc_2',
    skill: 'division_methods',
    type: 'mcq',
    question: 'Find the HCF of 144, 216 and 288 by short division method:',
    options: ['36', '48', '72', '144'],
    correct: 2,
    explanation: 'Common prime factors that divide all three: 2 × 2 × 2 × 3 × 3 = 72. At the end, the remaining quotient is 2, 3, 4, which have no common prime factor!',
    source: 'Worksheet 2026-27 (Q III.2)'
  },
  {
    id: 'calc_3',
    skill: 'division_methods',
    type: 'mcq',
    question: 'Find the HCF of 96, 144 and 192 by long division method:',
    options: ['24', '32', '48', '96'],
    correct: 2,
    explanation: 'First find HCF of 96 and 144: 144 ÷ 96 = 1 (rem 48), then 96 ÷ 48 = 2 (rem 0) → HCF(96, 144) = 48. Now 192 ÷ 48 = 4 (rem 0). Therefore, final HCF = 48.',
    source: 'Worksheet 2026-27 (Q III.3)'
  },
  {
    id: 'calc_4',
    skill: 'division_methods',
    type: 'mcq',
    question: 'Find the LCM of 60, 72 and 90 by short division method:',
    options: ['180', '240', '360', '720'],
    correct: 2,
    explanation: 'Dividing by prime factors 2, 2, 2, 3, 3, 5: LCM = 2 × 2 × 2 × 3 × 3 × 5 = 360.',
    source: 'Worksheet 2026-27 (Q III.4)'
  },
  {
    id: 'calc_5',
    skill: 'formula_relations',
    type: 'mcq',
    question: 'The HCF of 12 and 18 is 6. Find their LCM using the product formula:',
    options: ['24', '36', '48', '72'],
    correct: 1,
    explanation: 'Formula: a × b = HCF × LCM. Therefore LCM = (12 × 18) ÷ 6 = 216 ÷ 6 = 36.',
    source: 'Worksheet 2026-27 (Q III.5)'
  },
  {
    id: 'calc_6',
    skill: 'formula_relations',
    type: 'mcq',
    question: 'For numbers 48 and 32: HCF = 16 and LCM = 96. What is the product of the numbers and product of HCF × LCM?',
    options: ['1024', '1536', '1600', '1920'],
    correct: 1,
    explanation: 'Product of numbers = 48 × 32 = 1536. Product of HCF × LCM = 16 × 96 = 1536. They are strictly equal!',
    source: 'Worksheet 2026-27 (Q III.6)'
  },
  {
    id: 'calc_7',
    skill: 'formula_relations',
    type: 'mcq',
    question: 'The LCM of two numbers is 60 and their HCF is 5. If one number is 15, find the other number:',
    options: ['10', '20', '25', '30'],
    correct: 1,
    explanation: 'Other Number = (HCF × LCM) ÷ First Number = (5 × 60) ÷ 15 = 300 ÷ 15 = 20.',
    source: 'Worksheet 2026-27 (Q III.7)'
  },
  {
    id: 'calc_8',
    skill: 'formula_relations',
    type: 'mcq',
    question: 'Two numbers have HCF = 6 and LCM = 72. If one number is 18, find the other number:',
    options: ['12', '24', '36', '48'],
    correct: 1,
    explanation: 'Other Number = (HCF × LCM) ÷ Given Number = (6 × 72) ÷ 18 = 432 ÷ 18 = 24.',
    source: 'Worksheet 2026-27 (Q III.8)'
  },
  {
    id: 'calc_9',
    skill: 'formula_relations',
    type: 'mcq',
    question: 'The product of two numbers is 240 and their HCF is 4. Find their LCM:',
    options: ['40', '60', '80', '120'],
    correct: 1,
    explanation: 'Formula: LCM = Product of numbers ÷ HCF = 240 ÷ 4 = 60.',
    source: 'Worksheet 2026-27 (Q III.9)'
  },
  {
    id: 'calc_10',
    skill: 'word_problems',
    type: 'mcq',
    question: 'Find the smallest number that is divisible by 8, 12 and 18 exactly:',
    options: ['36', '48', '72', '144'],
    correct: 2,
    explanation: '"Smallest number divisible by..." means we need the Lowest Common Multiple (LCM). LCM(8, 12, 18) = 72.',
    source: 'Worksheet 2026-27 (Q III.10)'
  },
  {
    id: 'calc_11',
    skill: 'word_problems',
    type: 'mcq',
    question: 'Find the greatest number that divides 36, 60 and 84 exactly:',
    options: ['6', '12', '18', '24'],
    correct: 1,
    explanation: '"Greatest number that divides..." means we need the Highest Common Factor (HCF). HCF(36, 60, 84) = 12.',
    source: 'Worksheet 2026-27 (Q III.11)'
  },

  // Real-Life Word Problems from Worksheet
  {
    id: 'wp_1',
    skill: 'word_problems',
    type: 'mcq',
    question: 'A teacher has 24 red pencils and 36 blue pencils. She wants to make identical sets using all pencils, with the same number of red and blue pencils in each set. What is the greatest number of sets she can make?',
    options: ['6 sets', '8 sets', '12 sets', '18 sets'],
    correct: 2,
    explanation: 'Keyword detective: "Greatest number of identical sets" = HCF! HCF(24, 36) = 12 sets (each containing 2 red and 3 blue pencils).',
    source: 'Worksheet 2026-27 (Q III.12)'
  },
  {
    id: 'wp_2',
    skill: 'word_problems',
    type: 'mcq',
    question: 'Three traffic lights change at intervals of 20 seconds, 30 seconds, and 45 seconds. If they change together at a particular moment, after how many seconds will they change together again?',
    options: ['90 seconds', '120 seconds', '180 seconds', '360 seconds'],
    correct: 2,
    explanation: 'Keyword detective: "Change together again / repeating cycle" = LCM! LCM(20, 30, 45) = 180 seconds (or 3 minutes).',
    source: 'Worksheet 2026-27 (Q III.13)'
  },
  {
    id: 'wp_3',
    skill: 'word_problems',
    type: 'mcq',
    question: 'A shopkeeper has pencils packed in groups of 4 and erasers packed in groups of 6. What is the smallest number of pencils and erasers he needs so both can be packed into complete pairs without leftovers?',
    options: ['8', '12', '16', '24'],
    correct: 1,
    explanation: 'Keyword detective: "Smallest number for complete groups" = LCM! LCM(4, 6) = 12 (3 packs of pencils and 2 packs of erasers).',
    source: 'Worksheet 2026-27 (Q III.14)'
  },

  // Deductive Reasoning & No-Pen Thinking Questions
  {
    id: 'nopen_1',
    skill: 'word_problems',
    type: 'mcq',
    question: '🧠 [No-Pen Thinking] What is the HCF of 99 and 100 without doing any long division?',
    options: ['1', '9', '10', '99'],
    correct: 0,
    explanation: 'Deductive rule: Any two consecutive integers (like 99 and 100) are ALWAYS co-prime! Their only common factor is 1, so HCF(99, 100) = 1 immediately without calculating.',
    source: 'Deductive Thinking Master'
  },
  {
    id: 'nopen_2',
    skill: 'word_problems',
    type: 'mcq',
    question: '🧠 [No-Pen Thinking] Can the HCF of 16 and 24 ever be 32? Why or why not?',
    options: [
      'No, because HCF can never exceed the smaller number (16)',
      'Yes, because 32 is a multiple of 16',
      'Yes, because 16 + 24 = 40 > 32',
      'No, because both numbers are even'
    ],
    correct: 0,
    explanation: 'Upper Bound Rule! The Highest Common Factor divides both numbers, so it can NEVER be greater than the smallest number (16). 32 is larger than 16, so it is impossible.',
    source: 'Deductive Thinking Master'
  },
  {
    id: 'nopen_3',
    skill: 'word_problems',
    type: 'mcq',
    question: '🧠 [No-Pen Thinking] If two numbers a and b are co-prime, what is their LCM?',
    options: [
      'The product of the two numbers (a × b)',
      'Always 1',
      'The sum of the two numbers (a + b)',
      'The larger of the two numbers'
    ],
    correct: 0,
    explanation: 'Product Relation formula: a × b = HCF × LCM. Since co-prime numbers have HCF = 1, we get a × b = 1 × LCM, which means LCM = a × b!',
    source: 'Deductive Thinking Master'
  },
  {
    id: 'nopen_4',
    skill: 'word_problems',
    type: 'mcq',
    question: '🧠 [No-Pen Thinking] Two bells toll at 12:00 PM. Bell A tolls every 6 minutes, Bell B tolls every 9 minutes. Will they toll together at 12:12 PM?',
    options: [
      'No, because 12 is not a multiple of 9',
      'Yes, because 12 is divisible by 6',
      'Yes, because 12 is an even number',
      'No, bells never toll at 12 minutes'
    ],
    correct: 0,
    explanation: 'Meeting points require a COMMON multiple! 12 is a multiple of 6 (6 × 2 = 12), but 12 is NOT a multiple of 9 (9, 18, 27...). The first time they meet is at LCM(6, 9) = 18 minutes (12:18 PM).',
    source: 'Deductive Thinking Master'
  },
  {
    id: 'hcf_mult_prop',
    skill: 'school_worksheet',
    type: 'mcq',
    question: 'What is the HCF of two numbers when the larger number is a multiple of the smaller number?',
    options: [
      'The smaller number',
      'The larger number',
      '1',
      'Their product'
    ],
    correct: 0,
    explanation: 'When the larger number is a multiple of the smaller number, the smaller number divides the larger number completely with zero remainder. Hence, the smaller number is itself the Highest Common Factor (e.g. HCF of 6 and 18 is 6)!',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 6)'
  }
];



const CHALLENGE_QUESTIONS_TOPIC_1 = [...PRACTICE_POOL_TOPIC_1];



const LEARN_MODULES = LEARN_MODULES_TOPIC_1;
const PRACTICE_POOL = PRACTICE_POOL_TOPIC_1;
