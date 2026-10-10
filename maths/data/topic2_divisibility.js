/**
 * Maths Master — Class 5 CBSE
 * Modularized Architecture (Vanilla ES6+ JS)
 * Zero External Runtime Dependencies
 */

'use strict';

const LEARN_MODULES_TOPIC_2 = {
  all_rules_table: {
    id: 'all_rules_table',
    pillTitle: '📋 Rules Cheat Sheet (2 to 12)',
    title: 'Divisibility Rules (2 to 12): Rules, Logic & Traps',
    tag: 'Master Reference',
    lead: 'Divisibility rules allow you to know whether a number divides evenly without performing long division! Explore each rule below to understand <strong>not just WHAT the rule is, but WHY it works mathematically</strong>.',
    renderContent: (...args) => renderAllRulesTable(...args)
  },
  live_tester: {
    id: 'live_tester',
    pillTitle: '⚡ Live Inspector',
    title: 'Interactive Divisibility Inspector (Live Multi-Tester)',
    tag: 'Interactive Tool',
    lead: 'Type ANY number or pick an exam preset. The inspector will instantly test it against all 11 curriculum divisors (2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12) with full arithmetic reasons!',
    renderContent: (...args) => renderLiveTester(...args)
  },
  coprime_composite: {
    id: 'coprime_composite',
    pillTitle: '🤝 Co-Prime Factor Law',
    title: 'Composite Divisors & The Co-Prime Factor Law (6 & 12)',
    tag: 'Advanced Concept',
    lead: 'Why can 12 be tested using 3 and 4, but CANNOT be tested using 2 and 6? Discover the <strong>fundamental Co-Prime Law</strong> that prevents tricky exam mistakes!',
    renderContent: (...args) => renderCoprimeCompositeModule(...args)
  },
  missing_digit_puzzles: {
    id: 'missing_digit_puzzles',
    pillTitle: '🧩 Missing Digit Puzzles (*)',
    title: 'CBSE Section III: Missing Digit Puzzle Solver',
    tag: 'Exam Master',
    lead: 'Questions like <em>"Find the smallest digit to make 62*178 divisible by 9"</em> are guaranteed in Class 5 exams! Use this interactive board to solve them step by step.',
    renderContent: (...args) => renderMissingDigitModule(...args)
  },
  rule_11_hopscotch: {
    id: 'rule_11_hopscotch',
    pillTitle: '🦘 Rule 11 Hopscotch',
    title: 'The Hopscotch Method: Odd vs Even Places for 11',
    tag: 'Visual Method',
    lead: 'Rule 11 is the most famous divisibility trick in math! Jump between odd and even place digits to find the difference without any confusion.',
    renderContent: (...args) => renderRule11HopscotchModule(...args)
  },
  spot_the_mistakes: {
    id: 'spot_the_mistakes',
    pillTitle: '🕵️ Spot the Mistakes',
    title: 'Be the Teacher: Spot the Mistakes!',
    tag: 'Diagnostic Thinking',
    lead: 'Diagnosing divisibility mistakes is the fastest way to master mental division tricks. Step into the teacher\'s shoes and catch sneaky divisibility blunders!',
    renderContent: (...args) => renderSpotMistakesTopic2(...args)
  }
};



const PRACTICE_POOL_TOPIC_2 = [
  // Rule 3 & 9 (Digit Sums)
  {
    id: 'div_q1',
    skill: 'rule_3_9',
    type: 'mcq',
    question: 'Which of the following numbers is completely divisible by 3?',
    options: ['248', '517', '462', '815'],
    correct: 2,
    explanation: 'Rule for 3: Add all digits! For 462: 4 + 6 + 2 = 12. Since 12 ÷ 3 = 4 (exact, remainder 0), 462 is divisible by 3. The other options: 248 (sum 14), 517 (sum 13), 815 (sum 14) are not multiples of 3.',
    source: 'CBSE Class 5 Exam Standard'
  },
  {
    id: 'div_q2',
    skill: 'rule_3_9',
    type: 'mcq',
    question: 'If the sum of all digits of a number is 27, the number is definitely divisible by:',
    options: ['Both 3 and 9', 'Only 9', 'Only 3', 'Neither 3 nor 9'],
    correct: 0,
    explanation: '27 is a multiple of 9 (9 × 3 = 27) AND a multiple of 3 (3 × 9 = 27). Every multiple of 9 is also automatically a multiple of 3 because 3 is a factor of 9!',
    source: 'CBSE Conceptual Rule'
  },
  {
    id: 'div_q3',
    skill: 'rule_3_9',
    type: 'mcq',
    question: 'Is every number that is divisible by 3 also divisible by 9?',
    options: [
      'No, because numbers like 6, 12, 15, 21, 24 are divisible by 3 but not 9',
      'Yes, always without exception',
      'Only if the number is an even number',
      'Only if the number ends in the digit 3'
    ],
    correct: 0,
    explanation: 'Classic CBSE trap! While all multiples of 9 are divisible by 3, the reverse is NOT true. For example, 12 ÷ 3 = 4, but 12 ÷ 9 = 1 remainder 3. A number must have a digit sum that is a multiple of 9 to be divisible by 9.',
    source: 'CBSE Conceptual Rule'
  },
  {
    id: 'div_q4',
    skill: 'rule_3_9',
    type: 'mcq',
    question: 'Check if 62,370 is divisible by 9:',
    options: [
      'Yes, because 6 + 2 + 3 + 7 + 0 = 18, and 18 ÷ 9 = 2',
      'No, because it ends in 0',
      'No, because 62 is not divisible by 9',
      'Only divisible by 3, not by 9'
    ],
    correct: 0,
    explanation: 'Rule for 9: Calculate digit sum: 6 + 2 + 3 + 7 + 0 = 18. Since 18 is a multiple of 9 (18 ÷ 9 = 2), 62,370 is divisible by 9!',
    source: 'CBSE Class 5 Exam Standard'
  },

  // Rule 4 & 8 (Last 2 / 3 Digits)
  {
    id: 'div_q5',
    skill: 'rule_4_8',
    type: 'mcq',
    question: 'A large number is divisible by 4 if and only if:',
    options: [
      'The number formed by its last two digits is divisible by 4 (or ends in 00)',
      'The last single digit is 4 or 8',
      'The sum of all its digits is divisible by 4',
      'It is an odd number'
    ],
    correct: 0,
    explanation: 'Why does this work? 100 is divisible by 4 (100 ÷ 4 = 25). So any hundreds, thousands, or lakhs are already divisible by 4. Only the last two digits determine if the rest divides evenly!',
    source: 'CBSE Mathematical Principle'
  },
  {
    id: 'div_q6',
    skill: 'rule_4_8',
    type: 'mcq',
    question: 'Which of the following numbers is divisible by 8?',
    options: ['1,428', '3,816', '5,126', '7,114'],
    correct: 1,
    explanation: 'Rule for 8: Look at the last three digits! For 3,816, the last three digits are 816. 816 ÷ 8 = 102 (exact, remainder 0). So 3,816 is divisible by 8! For 1,428: 428 ÷ 8 = 53 rem 4. For 5,126: 126 ÷ 8 = 15 rem 6.',
    source: 'CBSE Class 5 Exam Standard'
  },
  {
    id: 'div_q7',
    skill: 'rule_4_8',
    type: 'mcq',
    question: 'Is 9,500 divisible by 4 and by 8?',
    options: [
      'Divisible by 4 (ends in 00), but not by 8 (500 ÷ 8 = 62.5)',
      'Divisible by both 4 and 8',
      'Not divisible by either 4 or 8',
      'Divisible by 8, but not by 4'
    ],
    correct: 0,
    explanation: '9,500 ends in 00, so it is divisible by 4 (100 is divisible by 4). But for 8, the last three digits are 500. 500 ÷ 8 = 62 with remainder 4, so it is NOT divisible by 8.',
    source: 'CBSE Class 5 Exam Standard'
  },

  // Rule 6 & 12 (Composite & Co-Prime Divisors)
  {
    id: 'div_q8',
    skill: 'rule_6_12',
    type: 'mcq',
    question: 'To test whether a number is divisible by 6 without actual division, it must satisfy:',
    options: [
      'It must be an even number AND the sum of its digits must be divisible by 3',
      'It must end in the digit 6',
      'It must be divisible by 6 and 12',
      'The sum of its digits must equal 6'
    ],
    correct: 0,
    explanation: 'Since 6 = 2 × 3 and HCF(2, 3) = 1 (co-prime), a number is divisible by 6 if and only if it is divisible by BOTH 2 (last digit is even) and 3 (digit sum is multiple of 3).',
    source: 'CBSE Class 5 Textbook Rule'
  },
  {
    id: 'div_q9',
    skill: 'rule_6_12',
    type: 'mcq',
    question: 'Why do we test divisibility by 12 using factors 3 and 4, instead of 2 and 6?',
    options: [
      'Because 3 and 4 are co-prime (HCF = 1), whereas 2 and 6 share common factor 2',
      'Because 2 and 6 are too small',
      'Because 12 is an odd number',
      'Because 3 × 4 gives a different result than 2 × 6'
    ],
    correct: 0,
    explanation: 'Crucial Co-Prime Factor Law: For a composite divisor m = a × b to work, a and b MUST be co-prime (HCF = 1). Since HCF(2, 6) = 2, using 2 and 6 causes false positives! For example, 18 is divisible by 2 and 6, but NOT by 12.',
    source: 'CBSE Advanced Number Theory'
  },
  {
    id: 'div_q10',
    skill: 'rule_6_12',
    type: 'mcq',
    question: 'The number 18 is divisible by 2 and divisible by 6. Is 18 divisible by 12?',
    options: [
      'No, because 18 ÷ 12 = 1 with remainder 6 (proving that 2 and 6 cannot be used to test 12)',
      'Yes, because 2 × 6 = 12',
      'Yes, because 18 is an even multiple of 3',
      'Only if 18 is multiplied by 2'
    ],
    correct: 0,
    explanation: '18 is the famous counterexample! 18 ÷ 2 = 9 (Yes), 18 ÷ 6 = 3 (Yes). But 18 ÷ 12 = 1 remainder 6 (No!). This proves why composite test factors must always be CO-PRIME (like 3 and 4).',
    source: 'CBSE Class 5 Exam Trap'
  },
  {
    id: 'div_q11',
    skill: 'rule_6_12',
    type: 'mcq',
    question: 'Which of the following numbers is divisible by 12?',
    options: ['216', '504', '1,524', 'All of the above'],
    correct: 3,
    explanation: 'Let us check all three for both 3 (digit sum) and 4 (last two digits):\\n• 216: Sum = 9 (div by 3), last two = 16 (div by 4) ➔ Divisible by 12!\\n• 504: Sum = 9 (div by 3), last two = 04 (div by 4) ➔ Divisible by 12!\\n• 1,524: Sum = 12 (div by 3), last two = 24 (div by 4) ➔ Divisible by 12!\\nAll three pass both rules!',
    source: 'CBSE Class 5 Practice'
  },

  // Rule 11 (Odd / Even Place Alternating Sum)
  {
    id: 'div_q12',
    skill: 'rule_11',
    type: 'mcq',
    question: 'According to the Rule of 11, a number is divisible by 11 if the difference between the sum of digits at odd places and sum of digits at even places is:',
    options: [
      'Either 0 or a multiple of 11 (11, 22, 33...)',
      'Always equal to 11',
      'An even number',
      'Divisible by 2 and 3'
    ],
    correct: 0,
    explanation: 'Rule of 11: Add the digits at odd places (1st, 3rd, 5th from right) and digits at even places (2nd, 4th, 6th). Subtract the smaller sum from the larger sum. If the difference is 0 or divisible by 11, the whole number is divisible by 11!',
    source: 'CBSE Class 5 Textbook Rule'
  },
  {
    id: 'div_q13',
    skill: 'rule_11',
    type: 'mcq',
    question: 'Test whether 1,331 is divisible by 11:',
    options: [
      'Yes, odd places sum (1 + 3 = 4), even places sum (3 + 1 = 4), difference = 4 − 4 = 0',
      'No, because 1,331 is an odd number',
      'No, because 1 + 3 + 3 + 1 = 8',
      'Yes, but only because it ends in 1'
    ],
    correct: 0,
    explanation: 'In 1,331: From right to left, odd positions are 1st digit (1) and 3rd digit (3), sum = 4. Even positions are 2nd digit (3) and 4th digit (1), sum = 4. Difference is 4 − 4 = 0. Therefore, 1,331 is divisible by 11! (In fact, 1,331 = 11 × 11 × 11).',
    source: 'CBSE Class 5 Exam Standard'
  },
  {
    id: 'div_q14',
    skill: 'rule_11',
    type: 'mcq',
    question: 'Test whether 9,482 is divisible by 11:',
    options: [
      'Yes, odd places sum is 2 + 4 = 6; even places sum is 8 + 9 = 17; difference = 17 − 6 = 11',
      'No, because the difference is 11, which is not 0',
      'No, because 9,482 is not divisible by 2',
      'Yes, because 9 + 4 + 8 + 2 = 23'
    ],
    correct: 0,
    explanation: 'In 9,482: Odd places (1st and 3rd from right) = 2 + 4 = 6. Even places (2nd and 4th) = 8 + 9 = 17. Difference = 17 − 6 = 11. Since 11 is a multiple of 11 (11 ÷ 11 = 1), 9,482 is divisible by 11!',
    source: 'CBSE Class 5 Exam Standard'
  },

  // Missing Digit Exam Puzzles (*)
  {
    id: 'div_q15',
    skill: 'missing_digit',
    type: 'mcq',
    question: 'Find the smallest missing digit to replace * in 62*178 so that it is divisible by 9:',
    options: ['1', '2', '3', '4'],
    correct: 2,
    explanation: 'From School Worksheet 2026-27 (Q III.1):\\nSum of known digits = 6 + 2 + 1 + 7 + 8 = 24.\\nTotal sum with missing digit = 24 + *.\\nThe next multiple of 9 after 24 is 27.\\nSo 24 + * = 27 ➔ * = 27 − 24 = 3!\\nCheck: 623,178 ÷ 9 = 69,242 exact!',
    source: 'School Worksheet 2026-27 (Q III.1)'
  },
  {
    id: 'div_q16',
    skill: 'missing_digit',
    type: 'mcq',
    question: 'Find the smallest digit to replace * in 71*2 so that the number is divisible by 6:',
    options: ['0', '2', '3', '5'],
    correct: 1,
    explanation: 'For divisibility by 6, the number must be divisible by 2 and 3:\\n1. Divisible by 2: Last digit is 2 (even) ➔ PASSES for any digit *!\\n2. Divisible by 3: Sum = 7 + 1 + * + 2 = 10 + *.\\nNext multiple of 3 after 10 is 12.\\n10 + * = 12 ➔ * = 2!\\n(Other valid digits are 5 and 8, but 2 is the smallest single digit).',
    source: 'CBSE Section III Exam Standard'
  },
  {
    id: 'div_q17',
    skill: 'missing_digit',
    type: 'mcq',
    question: 'What single digit must replace * in 5*84 so that the number is divisible by 11?',
    options: ['3', '5', '7', '9'],
    correct: 3,
    explanation: 'Rule of 11 from right to left:\\nOdd places (1st & 3rd): 4 + *\\nEven places (2nd & 4th): 8 + 5 = 13\\nFor difference to be 0: (4 + *) − 13 = 0 ➔ 4 + * = 13 ➔ * = 13 − 4 = 9!\\nCheck: 5,984 ÷ 11 = 544 exact!',
    source: 'CBSE Section III Exam Standard'
  },
  {
    id: 'div_q18',
    skill: 'missing_digit',
    type: 'mcq',
    question: 'What is the SMALLEST single digit that can replace * in 43*6 so that it is divisible by 4?',
    options: ['0', '1', '2', '4'],
    correct: 1,
    explanation: 'Rule of 4: Last two digits form the number *6.\\nLet us test digits: 06 (No), 16 (16 ÷ 4 = 4 ➔ YES!).\\nTherefore, the smallest digit is 1! (Number is 4,316).',
    source: 'CBSE Class 5 Practice'
  },
  {
    id: 'div_q19',
    skill: 'rule_6_12',
    type: 'mcq',
    question: 'A shopkeeper has 1,428 mangoes. Can he pack them into boxes of 6 mangoes each without any left over?',
    options: [
      'Yes, because 1,428 is even (ends in 8) and digit sum is 1+4+2+8 = 15 (divisible by 3)',
      'No, because 1,428 ends in 8',
      'No, because 1,428 is not divisible by 4',
      'Yes, but 2 mangoes will be left over'
    ],
    correct: 0,
    explanation: 'Keyword detective: Packaging into groups of 6 means testing divisibility by 6!\\n• Divisible by 2? Yes (ends in 8, even).\\n• Divisible by 3? 1 + 4 + 2 + 8 = 15 ÷ 3 = 5 (Yes).\\nSince both pass, 1,428 ÷ 6 = 238 boxes exactly with 0 left over!',
    source: 'CBSE Word Problem Application'
  },
  {
    id: 'div_q20',
    skill: 'rule_3_9',
    type: 'mcq',
    question: 'A library received 2,520 books to distribute equally among 9 primary schools. Will each school receive an exact equal share with 0 books left over?',
    options: [
      'Yes, because sum of digits is 2 + 5 + 2 + 0 = 9, which is divisible by 9',
      'No, because 2,520 ends in 0',
      'No, each school gets books with 3 left over',
      'Only if they distribute to 8 schools'
    ],
    correct: 0,
    explanation: 'To distribute equally among 9 schools with 0 left over, 2,520 must be divisible by 9. Sum of digits = 2 + 5 + 2 + 0 = 9. Since 9 ÷ 9 = 1 (remainder 0), 2,520 ÷ 9 = 280 books per school with exactly 0 left over!',
    source: 'CBSE Word Problem Application'
  },
  {
    id: 'div_ws1',
    skill: 'rule_6_12',
    type: 'mcq',
    question: 'Check whether 236,892 is divisible by 15 using divisibility rules:',
    options: [
      'No, because its last digit is 2 (not 0 or 5), so it is not divisible by 5, meaning it cannot divide by 15 (3 × 5).',
      'Yes, because 2 + 3 + 6 + 8 + 9 + 2 = 30, and 30 is divisible by 15.',
      'Yes, because 236,892 is an even number ending in 2.',
      'No, because 236,892 is not divisible by 3.'
    ],
    correct: 0,
    explanation: 'Co-Prime Factor Law for 15 (15 = 3 × 5, HCF=1): A number must be divisible by BOTH 3 and 5 to be divisible by 15! While sum of digits is 30 (divisible by 3), the last digit is 2, so it fails divisibility by 5. Therefore, 236,892 is NOT divisible by 15!',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 1)'
  },
  {
    id: 'div_ws3',
    skill: 'rule_4_8',
    type: 'mcq',
    question: 'Which of the following numbers are divisible by 4, 6 and 10 simultaneously: 12480, 98760, 24640, 13570?',
    options: [
      '12480 and 98760 only',
      'All four numbers',
      '24640 and 13570 only',
      '98760 only'
    ],
    correct: 0,
    explanation: '• Divisible by 10: Must end in 0 (all 4 do).\\n• Divisible by 4: Last 2 digits must divide by 4 (80: yes, 60: yes, 40: yes, 70: NO ➔ eliminates 13570).\\n• Divisible by 6: Must be even AND divisible by 3 (digit sum):\\n  - 12480: 1+2+4+8+0 = 15 (÷3 = 5, YES!)\\n  - 98760: 9+8+7+6+0 = 30 (÷3 = 10, YES!)\\n  - 24640: 2+4+6+4+0 = 16 (Not div by 3, NO).\\nTherefore, only 12480 and 98760 are divisible by 4, 6, and 10!',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 3)'
  }
];



const CHALLENGE_QUESTIONS_TOPIC_2 = [
  {
    question: 'Is 726 divisible by 6?',
    options: ['Yes', 'No'],
    correct: 0,
    explanation: '726 is even (ends in 6) and 7 + 2 + 6 = 15 (divisible by 3). Both pass!'
  },
  {
    question: 'Which digit makes 4_5 divisible by 9?',
    options: ['0', '9', '4', '2'],
    correct: 0,
    explanation: '4 + 0 + 5 = 9, which is divisible by 9! (9 also works, 4 + 9 + 5 = 18).'
  },
  {
    question: 'Is 1,331 divisible by 11?',
    options: ['Yes', 'No'],
    correct: 0,
    explanation: 'Odd places sum (1 + 3 = 4) minus even places sum (3 + 1 = 4) = 0. Yes!'
  },
  {
    question: 'Is 8,124 divisible by 4?',
    options: ['Yes', 'No'],
    correct: 0,
    explanation: 'Last two digits are 24. 24 ÷ 4 = 6 exact! Yes!'
  },
  {
    question: 'Is 428 divisible by 3?',
    options: ['Yes', 'No'],
    correct: 1,
    explanation: '4 + 2 + 8 = 14. 14 is not divisible by 3!'
  },
  {
    question: 'Is 935 divisible by 5?',
    options: ['Yes', 'No'],
    correct: 0,
    explanation: 'Last digit is 5. Always divisible by 5!'
  },
  {
    question: 'Is 3,816 divisible by 8?',
    options: ['Yes', 'No'],
    correct: 0,
    explanation: 'Last three digits 816 ÷ 8 = 102 exact! Yes!'
  },
  {
    question: 'What is the smallest digit for 62_178 to be divisible by 9?',
    options: ['3', '2', '1', '0'],
    correct: 0,
    explanation: 'Known sum = 24. Next multiple of 9 is 27. 27 − 24 = 3!'
  },
  {
    question: 'Is 504 divisible by 12?',
    options: ['Yes', 'No'],
    correct: 0,
    explanation: 'Digit sum = 9 (div by 3), last two digits 04 (div by 4). Both pass!'
  },
  {
    question: 'Is 18 divisible by 12?',
    options: ['Yes', 'No'],
    correct: 1,
    explanation: '18 ÷ 12 = 1 remainder 6. Not divisible!'
  },
  {
    question: 'Is 343 divisible by 7?',
    options: ['Yes', 'No'],
    correct: 0,
    explanation: '34 − (2 × 3) = 28. 28 is a multiple of 7 (7 × 4 = 28)!'
  },
  {
    question: 'Which digit makes 71_2 divisible by 6?',
    options: ['2', '0', '3', '4'],
    correct: 0,
    explanation: 'Sum = 7 + 1 + 2 = 10. Next multiple of 3 is 12. 12 − 10 = 2!'
  },
  {
    question: 'Is 9,482 divisible by 11?',
    options: ['Yes', 'No'],
    correct: 0,
    explanation: 'Odd places: 2 + 4 = 6. Even places: 8 + 9 = 17. Difference: 17 − 6 = 11. Divisible by 11!'
  },
  {
    question: 'Is 6,210 divisible by 10?',
    options: ['Yes', 'No'],
    correct: 0,
    explanation: 'Ends in 0. Always divisible by 10!'
  },
  {
    question: 'Is 1,524 divisible by 4?',
    options: ['Yes', 'No'],
    correct: 0,
    explanation: 'Last two digits are 24. 24 ÷ 4 = 6 exact!'
  }
];

