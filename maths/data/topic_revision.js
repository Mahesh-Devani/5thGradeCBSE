/**
 * Maths Master — Class 5 CBSE
 * Modularized Architecture (Vanilla ES6+ JS)
 * Zero External Runtime Dependencies
 */

'use strict';

const LEARN_MODULES_REVISION = {
  blueprint_overview: {
    id: 'blueprint_overview',
    pillTitle: '📊 Exam Blueprint',
    title: 'CBSE Term 1 Exam Blueprint & Chapter Weightage',
    tag: 'Official CBSE Structure',
    lead: 'Review the CBSE Class 5 Term-End examination structure, chapter-wise marks distribution, and recommended time strategy.',
    renderContent: (...args) => renderBlueprintOverviewModule(...args)
  },
  formula_cheatsheet: {
    id: 'formula_cheatsheet',
    pillTitle: '⚡ Grand Formula Sheet',
    title: 'The Grand Mental Formula & Rules Reference',
    tag: 'Quick Revision',
    lead: 'All key mathematical properties, formulas, divisibility tests, and geometric rules across all 5 syllabus chapters in one place.',
    renderContent: (...args) => renderFormulaCheatsheetModule(...args)
  },
  top_exam_traps: {
    id: 'top_exam_traps',
    pillTitle: '🚨 Top 10 Exam Traps',
    title: 'Top 10 CBSE Exam Traps & Mistakes to Avoid',
    tag: 'Exam Immunity',
    lead: 'Diagnostic immunity against the most frequent blunders made by Class 5 students in arithmetic, brackets, patterns, and geometry.',
    renderContent: (...args) => renderTopExamTrapsModule(...args)
  }
};



const PRACTICE_POOL_REVISION = [
  // Chapter 1: Factors & Multiples
  {
    id: 'rev_q1',
    skill: 'factors_hcf_lcm',
    type: 'mcq',
    question: 'Two neon signs blink every 12 seconds and 18 seconds respectively. If they blink together right now, after how many seconds will they next blink together?',
    options: ['36 seconds', '72 seconds', '24 seconds', '6 seconds'],
    correct: 0,
    explanation: 'Synchronizing repeating cycles requires the LCM! LCM(12, 18): 12 = 2² × 3, 18 = 2 × 3² → LCM = 2² × 3² = 36 seconds.',
    source: 'CBSE Term Exam Revision (LCM Application)'
  },
  {
    id: 'rev_q2',
    skill: 'factors_hcf_lcm',
    type: 'mcq',
    question: 'The product of two numbers is 180 and their HCF is 6. What is their LCM?',
    options: ['30', '36', '24', '60'],
    correct: 0,
    explanation: 'Use the fundamental relationship: Product = HCF × LCM. Therefore, LCM = Product ÷ HCF = 180 ÷ 6 = 30.',
    source: 'CBSE Product Relation Formula'
  },
  {
    id: 'rev_q3',
    skill: 'factors_hcf_lcm',
    type: 'mcq',
    question: 'Which of the following number pairs is ALWAYS co-prime (HCF = 1)?',
    options: ['Any two consecutive natural numbers (e.g. 14 and 15)', 'Any two even numbers', 'Any two composite numbers', 'A prime number and its multiple'],
    correct: 0,
    explanation: 'Consecutive numbers (n and n+1) have a difference of 1. Any common factor must divide their difference (1), so their HCF is always 1!',
    source: 'CBSE Mathematical Property'
  },
  // Chapter 2: Divisibility Rules
  {
    id: 'rev_q4',
    skill: 'divisibility',
    type: 'mcq',
    question: 'Check the divisibility of 37,42,582 by 15. Is it divisible?',
    options: ['No, because its last digit is 2, so it is not divisible by 5', 'Yes, because the sum of digits is divisible by 15', 'Yes, because it is divisible by 3', 'No, because it is not divisible by 3'],
    correct: 0,
    explanation: 'To be divisible by composite 15 (3 × 5), a number must be divisible by BOTH 3 and 5. Since 37,42,582 ends in 2, it fails divisibility by 5. Thus, it cannot be divisible by 15!',
    source: 'CBSE Term Paper (Divisibility Test)'
  },
  {
    id: 'rev_q5',
    skill: 'divisibility',
    type: 'mcq',
    question: 'Which number is divisible by 4, 6, and 10 simultaneously?',
    options: ['12,480', '98,765', '75,310', '12,450'],
    correct: 0,
    explanation: '12,480: ends in 0 (divisible by 10); last two digits 80 are divisible by 4; sum of digits 1+2+4+8+0=15 (divisible by 3) and even (divisible by 2) → divisible by 6! All three tests pass.',
    source: 'CBSE Multi-Rule Divisibility'
  },
  {
    id: 'rev_q6',
    skill: 'divisibility',
    type: 'mcq',
    question: 'In 5*36, find the smallest non-zero digit * so the number is divisible by 9.',
    options: ['4', '5', '3', '6'],
    correct: 0,
    explanation: 'Sum of known digits = 5 + 3 + 6 = 14. The next multiple of 9 is 18. So * = 18 − 14 = 4. Check: 5436 → 5+4+3+6 = 18 (divisible by 9).',
    source: 'CBSE Missing Digit Puzzle'
  },
  // Chapter 3: Expressions & Statements
  {
    id: 'rev_q7',
    skill: 'expressions',
    type: 'mcq',
    question: 'Evaluate step by step using BODMAS: 28 + 45 ÷ 9 × 2 − 10',
    options: ['28', '24', '36', '18'],
    correct: 0,
    explanation: 'Step 1 (Division): 45 ÷ 9 = 5 → 28 + 5 × 2 − 10; Step 2 (Multiplication): 5 × 2 = 10 → 28 + 10 − 10; Step 3 (Addition & Subtraction): 28 + 10 − 10 = 28!',
    source: 'CBSE BODMAS Order of Operations'
  },
  {
    id: 'rev_q8',
    skill: 'expressions',
    type: 'mcq',
    question: 'Write the mathematical expression: "The sum of 56 and 4 is multiplied by the difference of 11 and 10"',
    options: ['(56 + 4) × (11 − 10)', '56 + 4 × 11 − 10', '(56 + 4) + (11 − 10)', '56 × (11 − 10) + 4'],
    correct: 0,
    explanation: '"Sum of 56 and 4" requires parentheses (56 + 4). "Difference of 11 and 10" requires (11 − 10). Their product is (56 + 4) × (11 − 10) = 60 × 1 = 60.',
    source: 'CBSE Word Problem to Expression'
  },
  {
    id: 'rev_q9',
    skill: 'expressions',
    type: 'mcq',
    question: 'Where must parentheses be placed in 4 + 6 × 3 − 2 to equal 28?',
    options: ['(4 + 6) × 3 − 2 = 28', '4 + 6 × (3 − 2) = 28', '4 + (6 × 3) − 2 = 28', 'No brackets needed'],
    correct: 0,
    explanation: 'Check (4 + 6) × 3 − 2 = 10 × 3 − 2 = 30 − 2 = 28! Without brackets, 4 + 6 × 3 − 2 = 4 + 18 − 2 = 20.',
    source: 'CBSE Parentheses Placement Trap'
  },
  // Chapter 4: Number Patterns
  {
    id: 'rev_q10',
    skill: 'patterns',
    type: 'mcq',
    question: 'Find the next two sets in the pattern: 1, 2, 3; 2, 3, 6; 3, 4, 12; _____; _____',
    options: ['4, 5, 24 and 5, 6, 48', '4, 5, 20 and 5, 6, 30', '4, 5, 18 and 5, 6, 24', '4, 5, 16 and 5, 6, 20'],
    correct: 0,
    explanation: '1st number: 1, 2, 3, 4, 5 (+1); 2nd number: 2, 3, 4, 5, 6 (+1); 3rd number: 3, 6, 12, 24, 48 (doubling ×2). Next sets are 4, 5, 24 and 5, 6, 48!',
    source: 'CBSE 3-Number Set Triplet Pattern'
  },
  {
    id: 'rev_q10_b',
    skill: 'patterns',
    type: 'mcq',
    question: 'Find the next two sets in the pattern: 1, 2, 3; 2, 3, 6; 3, 4, 9; _____; _____',
    options: ['4, 5, 12 and 5, 6, 15', '4, 5, 16 and 5, 6, 20', '4, 5, 10 and 5, 6, 12', '4, 5, 15 and 5, 6, 18'],
    correct: 0,
    explanation: '1st number: 1, 2, 3, 4, 5 (+1); 2nd number: 2, 3, 4, 5, 6 (+1); 3rd number is 1st number multiplied by 3 (1×3=3, 2×3=6, 3×3=9, 4×3=12, 5×3=15). Next sets are 4, 5, 12 and 5, 6, 15!',
    source: 'CBSE 3-Number Set Triplet Pattern (1st × 3)'
  },
  {
    id: 'rev_q11',
    skill: 'patterns',
    type: 'mcq',
    question: 'What is the sum of the 4th triangular number (10) and the 5th triangular number (15)?',
    options: ['25 (5² square number)', '24', '30', '20'],
    correct: 0,
    explanation: 'A fundamental geometric number theorem: The sum of two consecutive triangular numbers always equals a square number! 10 + 15 = 25 = 5².',
    source: 'NCERT Triangular Number Theorem'
  },
  {
    id: 'rev_q12',
    skill: 'patterns',
    type: 'mcq',
    question: 'In a 3-tier number tower with base row [4, 7, 3], what is the top peak block?',
    options: ['21', '14', '18', '24'],
    correct: 0,
    explanation: 'Tier 2: (4 + 7 = 11) and (7 + 3 = 10). Top Tier: 11 + 10 = 21! Notice the middle block 7 is counted twice: 4 + (2 × 7) + 3 = 21.',
    source: 'CBSE Number Tower Rule'
  },
  // Chapter 5: Geometry, Angles & Shapes
  {
    id: 'rev_q13',
    skill: 'geometry',
    type: 'mcq',
    question: 'What geometric shape or figure do you get by connecting 3 collinear points? What if they are non-collinear?',
    options: ['Collinear points form a straight line segment; non-collinear form a triangle', 'Both form triangles', 'Collinear points form an angle; non-collinear form a line', 'Collinear points form a circle'],
    correct: 0,
    explanation: 'By definition, collinear points lie on one single straight line. Connecting them produces a line segment. Three non-collinear points form a 3-sided polygon (a triangle)!',
    source: 'CBSE Class 5 Geometric Foundations'
  },
  {
    id: 'rev_q14',
    skill: 'geometry',
    type: 'mcq',
    question: 'What is the interior angle sum of a nonagon (a 9-sided polygon)?',
    options: ['1260°', '1080°', '1440°', '900°'],
    correct: 0,
    explanation: 'Use the polygon triangulation formula: Sum = (n − 2) × 180°. For nonagon (n = 9): (9 − 2) × 180° = 7 × 180° = 1260°.',
    source: 'CBSE Polygon Triangulation Formula'
  },
  {
    id: 'rev_q15',
    skill: 'geometry',
    type: 'mcq',
    question: 'At 8:00 o\'clock, what is the smaller angle between the hour hand and minute hand of a clock?',
    options: ['120°', '240°', '90°', '150°'],
    correct: 0,
    explanation: 'Count the hour spaces between 8 and 12: exactly 4 hours. Each 1-hour jump is 30° (360° ÷ 12 = 30°). Therefore, 4 × 30° = 120° (an obtuse angle).',
    source: 'CBSE Clock Hand Detective'
  },
  {
    id: 'rev_q16',
    skill: 'geometry',
    type: 'mcq',
    question: 'If the diameter of a circular swimming pool is 18 meters, what is its radius?',
    options: ['9 meters', '36 meters', '12 meters', '6 meters'],
    correct: 0,
    explanation: 'The radius is always half the diameter: r = d ÷ 2 = 18 ÷ 2 = 9 meters.',
    source: 'CBSE Circle Anatomy Formula'
  },
  {
    id: 'rev_q17',
    skill: 'geometry',
    type: 'mcq',
    question: 'In parallelogram ABCD, if ∠A = 75°, what is the measure of adjacent angle ∠B?',
    options: ['105°', '75°', '15°', '90°'],
    correct: 0,
    explanation: 'Adjacent angles in any parallelogram are supplementary (add up to 180°). Therefore, ∠B = 180° − 75° = 105°. Opposite angles are equal (∠C = 75°, ∠D = 105°).',
    source: 'CBSE Parallelogram Angle Rules'
  }
];



const CHALLENGE_QUESTIONS_REVISION = [
  {
    question: 'What is the HCF of any two consecutive natural numbers (e.g. 23 and 24)?',
    options: ['1', '0', '2', 'Their product'],
    correct: 0,
    explanation: 'Consecutive numbers are always co-prime, so their HCF is 1.'
  },
  {
    question: 'Check divisibility of 9,84,320 by 10 and 4. Does it pass both?',
    options: ['Yes, both pass', 'Only 10 passes', 'Only 4 passes', 'Neither passes'],
    correct: 0,
    explanation: 'Ends in 0 (passes 10) and last two digits 20 are divisible by 4 (passes 4).'
  },
  {
    question: 'Evaluate mentally: 15 − 3 × 4 + 2',
    options: ['5', '50', '9', '14'],
    correct: 0,
    explanation: 'Multiplication first: 3 × 4 = 12. Then: 15 − 12 + 2 = 3 + 2 = 5.'
  },
  {
    question: 'In the set pattern 1, 2, 3; 2, 3, 6; 3, 4, 12; what is the 4th set?',
    options: ['4, 5, 24', '4, 5, 20', '4, 5, 18', '4, 5, 16'],
    correct: 0,
    explanation: '1st: 4; 2nd: 5; 3rd doubles: 12 × 2 = 24 → 4, 5, 24.'
  },
  {
    question: 'What is the angle between clock hands at 3:00 o\'clock?',
    options: ['90° (Right angle)', '60°', '120°', '45°'],
    correct: 0,
    explanation: '3 hours × 30° = 90°.'
  },
  {
    question: 'What is the sum of interior angles of a triangle?',
    options: ['180°', '360°', '90°', '270°'],
    correct: 0,
    explanation: 'Angle sum of all triangles is always 180°.'
  },
  {
    question: 'If diameter = 24 cm, radius = ?',
    options: ['12 cm', '48 cm', '6 cm', '18 cm'],
    correct: 0,
    explanation: 'r = d ÷ 2 = 24 ÷ 2 = 12 cm.'
  },
  {
    question: 'Is 45,612 divisible by 3?',
    options: ['Yes (sum = 18)', 'No (sum = 17)', 'No (sum = 19)', 'Yes (sum = 15)'],
    correct: 0,
    explanation: '4 + 5 + 6 + 1 + 2 = 18, which is divisible by 3.'
  },
  {
    question: 'Which shape has only ONE pair of parallel sides?',
    options: ['Trapezium', 'Parallelogram', 'Rhombus', 'Rectangle'],
    correct: 0,
    explanation: 'A trapezium has exactly one pair of parallel sides.'
  },
  {
    question: 'The 3rd triangular number is 6 and the 4th is 10. Their sum is:',
    options: ['16 (4²)', '15', '20', '14'],
    correct: 0,
    explanation: '6 + 10 = 16 = 4².'
  }
];

