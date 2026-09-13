/**
 * Maths Master — Class 5 CBSE
 * Topic 1: Multiples, Factors, HCF & LCM
 * Zero External Dependencies (Vanilla ES6+ JS)
 */

'use strict';

/* ==========================================================================
   1. MATHEMATICAL CORE UTILITIES
   ========================================================================== */

/**
 * Computes Greatest Common Divisor (HCF) of two numbers using Euclidean algorithm.
 */
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

/**
 * Computes HCF of an array of numbers.
 */
function gcdArray(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((acc, val) => gcd(acc, val));
}

/**
 * Computes Lowest Common Multiple (LCM) of two numbers.
 */
function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Computes LCM of an array of numbers.
 */
function lcmArray(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((acc, val) => lcm(acc, val));
}

/**
 * Returns all factors of a number sorted ascending.
 */
function getFactors(n) {
  n = Math.abs(n);
  if (n === 0) return [];
  const factors = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i !== n / i) factors.push(n / i);
    }
  }
  return factors.sort((a, b) => a - b);
}

/**
 * Checks if a number is prime.
 */
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Checks if two numbers are co-prime (HCF === 1).
 */
function areCoprime(a, b) {
  return gcd(a, b) === 1;
}

/**
 * Checks if two numbers are twin primes (both prime and difference === 2).
 */
function isTwinPrime(a, b) {
  return isPrime(a) && isPrime(b) && Math.abs(a - b) === 2;
}

/**
 * Generates prime numbers up to limit.
 */
function getPrimesUpTo(limit) {
  const primes = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
}

/* ==========================================================================
   2. SHORT DIVISION STEP ENGINES (HCF vs LCM)
   ========================================================================== */

/**
 * Short Division for HCF:
 * Prime divisor MUST divide ALL numbers simultaneously.
 * Stops as soon as no prime divides all numbers.
 */
function getShortDivisionHCF(numbers) {
  const current = [...numbers];
  const steps = [];
  const primes = getPrimesUpTo(Math.max(...current, 100));
  const divisors = [];

  let continueDividing = true;
  while (continueDividing) {
    let found = false;
    for (const p of primes) {
      // Check if p divides ALL numbers
      const dividesAll = current.every(n => n % p === 0);
      if (dividesAll) {
        steps.push({
          divisor: p,
          values: [...current],
          dividesAll: true
        });
        divisors.push(p);
        for (let i = 0; i < current.length; i++) {
          current[i] = current[i] / p;
        }
        found = true;
        break;
      }
    }
    if (!found) {
      continueDividing = false;
    }
  }

  const hcfValue = divisors.reduce((acc, d) => acc * d, 1);

  return {
    initialNumbers: numbers,
    steps,
    finalRow: current,
    divisors,
    result: hcfValue,
    explanation: divisors.length > 0
      ? `HCF = ${divisors.join(' × ')} = ${hcfValue}. Notice that the division stopped because no prime number divides ${current.join(', ')} simultaneously!`
      : `No prime number divides all of ${numbers.join(', ')} together. Therefore, HCF = 1.`
  };
}

/**
 * Short Division for LCM:
 * Prime divisor divides at least TWO numbers (or at least 1 when finishing).
 * Numbers not divisible are brought down unchanged!
 * Continues until all numbers become 1.
 */
function getShortDivisionLCM(numbers) {
  const current = [...numbers];
  const steps = [];
  const primes = getPrimesUpTo(Math.max(...current, 100));
  const divisors = [];

  let safety = 0;
  while (current.some(n => n > 1) && safety < 40) {
    safety++;
    let chosenPrime = null;

    // Prefer prime that divides at least 2 numbers
    for (const p of primes) {
      const count = current.filter(n => n % p === 0).length;
      if (count >= 2) {
        chosenPrime = p;
        break;
      }
    }

    // Fallback: prime dividing at least 1 number
    if (!chosenPrime) {
      for (const p of primes) {
        if (current.some(n => n % p === 0)) {
          chosenPrime = p;
          break;
        }
      }
    }

    if (!chosenPrime) break;

    steps.push({
      divisor: chosenPrime,
      values: [...current],
      changedIndices: current.map((n, idx) => (n % chosenPrime === 0 ? idx : -1)).filter(i => i !== -1)
    });

    divisors.push(chosenPrime);
    for (let i = 0; i < current.length; i++) {
      if (current[i] % chosenPrime === 0) {
        current[i] = current[i] / chosenPrime;
      }
    }
  }

  const lcmValue = divisors.reduce((acc, d) => acc * d, 1);

  return {
    initialNumbers: numbers,
    steps,
    finalRow: current,
    divisors,
    result: lcmValue,
    explanation: `LCM = ${divisors.join(' × ')} = ${lcmValue}. Notice how numbers not divisible by the prime were brought down to the next row until all numbers reached 1!`
  };
}

/* ==========================================================================
   3. LONG DIVISION STEP ENGINE FOR HCF (Euclidean Algorithm)
   ========================================================================== */

/**
 * Computes Long Division steps for HCF of two numbers.
 */
function getLongDivisionHCF(a, b) {
  let dividend = Math.max(a, b);
  let divisor = Math.min(a, b);
  const steps = [];

  let stepNum = 1;
  while (divisor > 0) {
    const quotient = Math.floor(dividend / divisor);
    const product = quotient * divisor;
    const remainder = dividend % divisor;

    steps.push({
      stepNum,
      dividend,
      divisor,
      quotient,
      product,
      remainder
    });

    if (remainder === 0) break;

    dividend = divisor;
    divisor = remainder;
    stepNum++;
  }

  const hcfValue = steps[steps.length - 1].divisor;
  return {
    num1: a,
    num2: b,
    steps,
    hcf: hcfValue
  };
}

/**
 * Long Division for 3 numbers (e.g. 96, 144, 192):
 * Phase 1: HCF of first two.
 * Phase 2: HCF of (HCF_1 and third number).
 */
function getLongDivision3Numbers(a, b, c) {
  const phase1 = getLongDivisionHCF(a, b);
  const hcf1 = phase1.hcf;
  const phase2 = getLongDivisionHCF(hcf1, c);
  const finalHCF = phase2.hcf;

  return {
    phase1: { ...phase1, desc: `Step 1: Find HCF of ${a} and ${b}` },
    phase2: { ...phase2, desc: `Step 2: Find HCF of the result (${hcf1}) and ${c}` },
    finalHCF
  };
}

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
  if (!canvas) return;
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
   6. LEARN MODULES DATA
   ========================================================================== */

const LEARN_MODULES = {
  hcf_lcm_detective: {
    id: 'hcf_lcm_detective',
    pillTitle: '🧠 HCF vs LCM Detective',
    title: 'HCF vs LCM Detective: Which One To Use When?',
    tag: 'Concept & Real Life',
    lead: 'Class 5 students often get confused by word problems. Here is the secret detective rule: <strong>HCF divides/splits things down</strong> into the biggest possible equal groups, whereas <strong>LCM multiples/grows things up</strong> to find when cycles meet together again!',
    renderContent: renderDetectiveModule
  },
  short_division: {
    id: 'short_division',
    pillTitle: '🪜 Short Division Ladder',
    title: 'Short Division Method: HCF vs LCM Difference',
    tag: 'Calculation Master',
    lead: 'Short division is the fastest way to calculate HCF and LCM. But there is a <strong>critical difference</strong> between the two approaches! In HCF, the divisor must divide ALL numbers simultaneously. In LCM, you divide if at least 2 divide and bring down the rest.',
    renderContent: renderShortDivisionModule
  },
  long_division: {
    id: 'long_division',
    pillTitle: '➗ Long Division (Large Numbers)',
    title: 'Long Division Method for HCF (Euclidean Algorithm)',
    tag: 'Exam Technique',
    lead: 'When numbers are large (like 96, 144, 192), short division can take too many steps. The <strong>Long Division Method</strong> uses successive division where each remainder becomes the new divisor until the remainder reaches 0!',
    renderContent: renderLongDivisionModule
  },
  product_formula: {
    id: 'product_formula',
    pillTitle: '⚖️ Product Relation Formula',
    title: 'Product of 2 Numbers = Product of their HCF & LCM',
    tag: 'Core Formula',
    lead: 'For ANY two numbers, the product of the numbers is always strictly equal to the product of their HCF and LCM: <strong>First Number × Second Number = HCF × LCM</strong>.',
    renderContent: renderProductFormulaModule
  },
  coprimes_twinprimes: {
    id: 'coprimes_twinprimes',
    pillTitle: '🤝 Co-Primes & Twin Primes',
    title: 'Co-Primes & Twin Primes: Concepts & Properties',
    tag: 'Number Theory',
    lead: 'Co-primes do NOT need to be prime numbers themselves! Two numbers are co-prime if their <strong>only common factor is 1</strong> (e.g. 8 and 9). Twin primes are two prime numbers that differ by exactly 2 (e.g. 3 & 5, 11 & 13).',
    renderContent: renderCoprimesModule
  }
};

/* ==========================================================================
   7. PRACTICE QUESTIONS POOL (All 20+ School Worksheet Questions)
   ========================================================================== */

const PRACTICE_POOL = [
  // Freedom International School Worksheet — Section I: Fill in the Blanks
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

  // Freedom International School Worksheet — Section II: True or False
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

  // Freedom International School Worksheet — Section III: Calculations & Problems
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
  }
];

/* ==========================================================================
   8. APPLICATION STATE
   ========================================================================== */

const state = {
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

  // Stars earned
  stars: 0
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
  const mod = LEARN_MODULES[state.activeLearnModule] || LEARN_MODULES.hcf_lcm_detective;

  container.innerHTML = `
    <div class="learn-container">
      <div class="learn-subnav">
        ${Object.values(LEARN_MODULES).map(m => `
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

  // Attach subnav click listeners
  container.querySelectorAll('.learn-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      state.activeLearnModule = btn.getAttribute('data-mod-id');
      renderViewport();
    });
  });

  // Render module-specific interactive content
  const contentArea = container.querySelector('#module-dynamic-content');
  if (contentArea && typeof mod.renderContent === 'function') {
    mod.renderContent(contentArea);
  }
}

/* Module 1: HCF vs LCM Detective */
function renderDetectiveModule(container) {
  container.innerHTML = `
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
        <select id="clue-selector" class="calc-input" style="width: auto; flex-grow: 1;">
          <option value="hcf1">"What is the greatest number of identical gift boxes she can pack?"</option>
          <option value="lcm1">"After how many seconds will three church bells toll together again?"</option>
          <option value="hcf2">"Find the largest capacity measuring container to empty 48L and 72L cans."</option>
          <option value="lcm2">"Find the smallest number that is exactly divisible by 8, 12, and 18."</option>
          <option value="hcf3">"Find the greatest number that divides 36, 60, and 84 without remainder."</option>
        </select>
        <button class="btn btn-primary" id="btn-diagnose">Diagnose Clue 🔍</button>
      </div>
      
      <div class="calc-result-area" id="clue-result">
        Click <strong>Diagnose Clue</strong> above to see the detective analysis!
      </div>
    </div>
  `;

  container.querySelector('#btn-diagnose').addEventListener('click', () => {
    playClickSound();
    const val = container.querySelector('#clue-selector').value;
    const resBox = container.querySelector('#clue-result');

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
  });
}

/* Module 2: Short Division Ladder (HCF vs LCM Comparison) */
function renderShortDivisionModule(container) {
  container.innerHTML = `
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

/* --------------------------------------------------------------------------
   PRACTICE MODE RENDERER
   -------------------------------------------------------------------------- */

function getFilteredPracticeQuestions() {
  if (state.practiceFilter === 'all') return PRACTICE_POOL;
  return PRACTICE_POOL.filter(q => q.skill === state.practiceFilter);
}

function renderPracticeView(container) {
  const questions = getFilteredPracticeQuestions();
  const qIndex = Math.min(state.currentQuestionIndex, Math.max(0, questions.length - 1));
  const q = questions[qIndex];

  container.innerHTML = `
    <div class="practice-container">
      <!-- Skill Filter Bar -->
      <div class="skill-filter-bar">
        <button class="skill-filter-btn ${state.practiceFilter === 'all' ? 'active' : ''}" data-skill="all">
          🌟 All Questions (${PRACTICE_POOL.length})
        </button>
        <button class="skill-filter-btn ${state.practiceFilter === 'school_worksheet' ? 'active' : ''}" data-skill="school_worksheet">
          🏫 Worksheet 2026-27
        </button>
        <button class="skill-filter-btn ${state.practiceFilter === 'word_problems' ? 'active' : ''}" data-skill="word_problems">
          🧠 Word Problems (HCF vs LCM)
        </button>
        <button class="skill-filter-btn ${state.practiceFilter === 'division_methods' ? 'active' : ''}" data-skill="division_methods">
          🪜 Division Calculations
        </button>
        <button class="skill-filter-btn ${state.practiceFilter === 'formula_relations' ? 'active' : ''}" data-skill="formula_relations">
          ⚖️ Product Formula (a × b)
        </button>
      </div>

      <!-- Practice Stats Bar -->
      <div class="practice-stats-bar">
        <div class="stat-pill">
          <span>Question:</span>
          <strong>${qIndex + 1} / ${questions.length}</strong>
        </div>
        <div style="display: flex; gap: 1rem;">
          <div class="stat-pill text-success">
            <span>✓ Correct:</span> <strong>${state.scoreCorrect}</strong>
          </div>
          <div class="stat-pill text-danger">
            <span>✗ Wrong:</span> <strong>${state.scoreWrong}</strong>
          </div>
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

          <div class="question-nav">
            <button class="btn btn-ghost" id="btn-prev-q" ${qIndex === 0 ? 'disabled' : ''}>
              ← Previous
            </button>
            <button class="btn btn-primary" id="btn-next-q" ${qIndex === questions.length - 1 ? 'disabled' : ''}>
              Next Question →
            </button>
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
      renderViewport();
    });
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

      // Update stars if achieved 10+ correct
      if (state.scoreCorrect >= 10 && state.stars < 3) {
        state.stars = 3;
        saveProgress();
      }
    });
  });

  // Navigation handlers
  container.querySelector('#btn-prev-q').addEventListener('click', () => {
    playClickSound();
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex--;
      renderViewport();
    }
  });

  container.querySelector('#btn-next-q').addEventListener('click', () => {
    playClickSound();
    const qs = getFilteredPracticeQuestions();
    if (state.currentQuestionIndex < qs.length - 1) {
      state.currentQuestionIndex++;
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

  // Shuffle and pick 10 questions
  state.challengeQuestions = [...PRACTICE_POOL].sort(() => Math.random() - 0.5).slice(0, 10);

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

  // Determine stars
  let starsAwarded = 1;
  if (state.challengeCorrect >= 8) starsAwarded = 3;
  else if (state.challengeCorrect >= 5) starsAwarded = 2;

  state.stars = Math.max(state.stars, starsAwarded);
  saveProgress();

  showResultsModal(state.challengeCorrect, state.challengeQuestions.length, starsAwarded);
}

function renderChallengeView(container) {
  if (!state.challengeActive) {
    container.innerHTML = `
      <div class="challenge-container">
        <div class="challenge-header-card" style="text-align: center; flex-direction: column; gap: 1rem;">
          <div style="font-size: 3rem;">🎯</div>
          <h3>60-Second Speed Challenge</h3>
          <p style="color: var(--text-muted); max-width: 500px;">
            Test your quick mental math skills on HCF, LCM, divisibility, and co-primes! Answer up to 10 questions in 60 seconds to earn 3 stars ⭐⭐⭐!
          </p>
          <button class="btn btn-primary" id="btn-start-challenge" style="padding: 0.8rem 2rem; font-size: 1.1rem;">
            🚀 Start 60s Challenge
          </button>
        </div>
      </div>
    `;

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

        <div style="text-align: right;">
          <div style="font-size: 0.9rem; color: var(--text-muted);">Question Progress</div>
          <strong style="font-size: 1.2rem; color: var(--accent-amber-light);">
            ${state.challengeIndex + 1} / ${state.challengeQuestions.length}
          </strong>
        </div>
      </div>

      <div class="question-card">
        <div class="question-prompt">${q.question}</div>

        <div class="options-grid">
          ${q.options.map((opt, optIdx) => `
            <button class="option-btn challenge-opt-btn" data-opt-idx="${optIdx}">
              <span class="option-label">${String.fromCharCode(65 + optIdx)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  let answered = false;
  container.querySelectorAll('.challenge-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;

      const sel = parseInt(btn.getAttribute('data-opt-idx'));
      const isCorrect = sel === q.correct;
      const flash = document.getElementById('feedback-flash');

      if (isCorrect) {
        state.challengeCorrect++;
        btn.classList.add('correct');
        playCorrectSound();
        flash.className = 'feedback-flash correct';
      } else {
        btn.classList.add('wrong');
        playWrongSound();
        flash.className = 'feedback-flash wrong';
      }

      setTimeout(() => { flash.className = 'feedback-flash'; }, 250);

      setTimeout(() => {
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
   WORKSHEET VIEW RENDERER (Freedom International School 2026-27 Format)
   -------------------------------------------------------------------------- */

function renderWorksheetView(container) {
  container.innerHTML = `
    <div class="learn-container">
      <div class="learn-card">
        <div class="learn-card-header">
          <div>
            <h3>📄 School Worksheet 2026-27 Practice Sheet</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
              Freedom International School — Topic: Multiples and Factors (Class V)
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
    printWorksheet();
  });
}

/* --------------------------------------------------------------------------
   PRINT ENGINE
   -------------------------------------------------------------------------- */

function printWorksheet() {
  const printContainer = document.getElementById('print-container');
  if (!printContainer) return;

  printContainer.innerHTML = `
    <div class="worksheet-header">
      <h2>FREEDOM INTERNATIONAL SCHOOL</h2>
      <h3>MATHEMATICS — CLASS V (2026-27)</h3>
      <p><strong>Topic: Multiples and Factors (HCF & LCM Practice Sheet)</strong></p>
      <div style="display: flex; justify-content: space-between; margin-top: 10px;">
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
          <div class="workspace-box"></div>
        </li>
        <li>
          Find the HCF of 96, 144 and 192 by long division method:
          <div class="workspace-box"></div>
        </li>
        <li>
          Find the LCM of 60, 72 and 90 by short division method:
          <div class="workspace-box"></div>
        </li>
        <li>
          Three traffic lights change at intervals of 20s, 30s, and 45s. After how many seconds will they change together again?
          <div class="workspace-box"></div>
        </li>
      </ol>
    </div>
  `;

  window.print();
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

  if (stars === 3) {
    starsElem.textContent = '⭐⭐⭐';
    emojiElem.textContent = '🏆';
    msgElem.textContent = 'Master Level! You demonstrated perfect understanding of Factors, Multiples, HCF & LCM!';
    playFanfare();
    launchConfetti();
  } else if (stars === 2) {
    starsElem.textContent = '⭐⭐';
    emojiElem.textContent = '🌟';
    msgElem.textContent = 'Great Job! You have a solid grasp of HCF and LCM calculations!';
    playCorrectSound();
  } else {
    starsElem.textContent = '⭐';
    emojiElem.textContent = '💪';
    msgElem.textContent = 'Good effort! Review the Short Division and Detective lessons to improve your score!';
  }

  modal.classList.add('active');
}

function saveProgress() {
  try {
    localStorage.setItem('cbse_maths_factors_stars', state.stars.toString());
    updateProgressUI();
  } catch (e) {
    // localStorage unavailable
  }
}

function loadProgress() {
  try {
    const saved = localStorage.getItem('cbse_maths_factors_stars');
    if (saved) {
      state.stars = parseInt(saved) || 0;
    }
  } catch (e) {
    // localStorage unavailable
  }
  updateProgressUI();
}

function updateProgressUI() {
  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  const starDisplay = document.getElementById('stars-factors-multiples');

  const pct = Math.round((state.stars / 3) * 100);
  if (fill) fill.style.width = `${pct}%`;
  if (label) label.textContent = `${state.stars} / 3 stars earned`;
  if (starDisplay) {
    starDisplay.textContent = '⭐'.repeat(state.stars) || '☆☆☆';
  }
}

/* ==========================================================================
   11. APPLICATION INITIALIZATION & EVENT LISTENERS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  loadProgress();

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

  // Print button in top bar
  const btnPrint = document.getElementById('btn-print');
  if (btnPrint) btnPrint.addEventListener('click', () => {
    state.activeMode = 'worksheet';
    updateTabsUI();
    renderViewport();
    printWorksheet();
  });

  // Reset button in top bar
  const btnReset = document.getElementById('btn-reset');
  if (btnReset) btnReset.addEventListener('click', () => {
    playClickSound();
    if (confirm('Do you want to reset your score and progress for this topic?')) {
      state.scoreCorrect = 0;
      state.scoreWrong = 0;
      state.userAnswers = {};
      state.stars = 0;
      saveProgress();
      renderViewport();
    }
  });

  // Mode tabs switcher
  const modeTabs = document.querySelectorAll('.mode-tab');
  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playClickSound();
      state.activeMode = tab.getAttribute('data-mode');
      updateTabsUI();
      renderViewport();
    });
  });

  function updateTabsUI() {
    modeTabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-mode') === state.activeMode);
    });
  }

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
    updateTabsUI();
    renderViewport();
  });

  if (btnModalClose) btnModalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Initial render
  renderViewport();
});
