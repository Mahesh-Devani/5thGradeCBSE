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
   5.5 TOPIC 2: DIVISIBILITY RULES MATHEMATICAL ENGINES
   ========================================================================== */

/**
 * Detailed step-by-step divisibility checker for divisors 2 to 12.
 */
function checkDivisibility(n, d) {
  n = Math.abs(Math.floor(n));
  if (n === 0) {
    return {
      isDivisible: true,
      rule: '0 is divisible by all numbers',
      reason: `0 is divisible by ${d} (0 ÷ ${d} = 0).`
    };
  }
  const str = n.toString();
  const digits = str.split('').map(Number);
  const sumDigits = digits.reduce((acc, digit) => acc + digit, 0);
  const lastDigit = digits[digits.length - 1];

  switch (d) {
    case 2: {
      const isEven = [0, 2, 4, 6, 8].includes(lastDigit);
      return {
        isDivisible: isEven,
        rule: 'Last digit must be even (0, 2, 4, 6, 8)',
        reason: isEven
          ? `The last digit is <strong>${lastDigit}</strong> (an even number). Therefore, ${n.toLocaleString()} is divisible by 2!`
          : `The last digit is <strong>${lastDigit}</strong> (an odd number, not 0, 2, 4, 6, 8). Therefore, ${n.toLocaleString()} is NOT divisible by 2.`
      };
    }
    case 3: {
      const isDiv = sumDigits % 3 === 0;
      const sumExpr = digits.join(' + ') + ' = ' + sumDigits;
      return {
        isDivisible: isDiv,
        rule: 'Sum of all digits must be divisible by 3',
        reason: isDiv
          ? `Sum of digits: <span class="reason-calc-highlight">${sumExpr}</span>. Since ${sumDigits} ÷ 3 = ${sumDigits / 3} (exact, remainder 0), ${n.toLocaleString()} is divisible by 3!`
          : `Sum of digits: <span class="reason-calc-highlight">${sumExpr}</span>. Since ${sumDigits} ÷ 3 leaves remainder ${sumDigits % 3}, ${n.toLocaleString()} is NOT divisible by 3.`
      };
    }
    case 4: {
      const lastTwo = parseInt(str.slice(-2)) || lastDigit;
      const isDiv = lastTwo % 4 === 0;
      return {
        isDivisible: isDiv,
        rule: 'Number formed by the last two digits must be divisible by 4 (or end in 00)',
        reason: isDiv
          ? `Last two digits form <span class="reason-calc-highlight">${lastTwo}</span>. Since ${lastTwo} ÷ 4 = ${lastTwo / 4} (exact), ${n.toLocaleString()} is divisible by 4!`
          : `Last two digits form <span class="reason-calc-highlight">${lastTwo}</span>. Since ${lastTwo} ÷ 4 leaves remainder ${lastTwo % 4}, ${n.toLocaleString()} is NOT divisible by 4.`
      };
    }
    case 5: {
      const isDiv = lastDigit === 0 || lastDigit === 5;
      return {
        isDivisible: isDiv,
        rule: 'Last digit must be 0 or 5',
        reason: isDiv
          ? `The last digit is <strong>${lastDigit}</strong> (ends in 0 or 5). Therefore, ${n.toLocaleString()} is divisible by 5!`
          : `The last digit is <strong>${lastDigit}</strong> (does not end in 0 or 5). Therefore, ${n.toLocaleString()} is NOT divisible by 5.`
      };
    }
    case 6: {
      const div2 = checkDivisibility(n, 2).isDivisible;
      const div3 = checkDivisibility(n, 3).isDivisible;
      const isDiv = div2 && div3;
      return {
        isDivisible: isDiv,
        rule: 'Must be divisible by BOTH 2 and 3 simultaneously (co-primes: 2 × 3 = 6)',
        reason: isDiv
          ? `Divisible by 2? <strong>Yes</strong> (even). Divisible by 3? <strong>Yes</strong> (digit sum ${sumDigits} ÷ 3 = ${sumDigits / 3}). Since it satisfies BOTH rules, ${n.toLocaleString()} is divisible by 6!`
          : `Divisible by 2: ${div2 ? 'Yes' : 'No'}. Divisible by 3: ${div3 ? 'Yes' : 'No'}. Since it fails ${!div2 && !div3 ? 'both tests' : !div2 ? 'the rule for 2' : 'the rule for 3'}, ${n.toLocaleString()} is NOT divisible by 6.`
      };
    }
    case 7: {
      let curr = n;
      const steps = [];
      while (curr > 70) {
        const last = curr % 10;
        const rest = Math.floor(curr / 10);
        const next = rest - (2 * last);
        steps.push(`${rest} − (2 × ${last}) = ${next}`);
        curr = Math.abs(next);
      }
      const isDiv = curr % 7 === 0;
      return {
        isDivisible: isDiv,
        rule: 'Double the last digit and subtract from truncated number; result must be 0 or multiple of 7',
        reason: isDiv
          ? `Double last digit & subtract: <span class="reason-calc-highlight">${steps.join(' ➔ ') || n + ' ÷ 7 = ' + (n / 7)}</span>. Result ${curr} is a multiple of 7 (${curr} ÷ 7 = ${curr / 7}). Divisible by 7!`
          : `Double last digit & subtract: <span class="reason-calc-highlight">${steps.join(' ➔ ') || n}</span>. Result ${curr} is NOT a multiple of 7. NOT divisible by 7.`
      };
    }
    case 8: {
      const lastThree = parseInt(str.slice(-3)) || n;
      const isDiv = lastThree % 8 === 0;
      return {
        isDivisible: isDiv,
        rule: 'Number formed by the last three digits must be divisible by 8 (or end in 000)',
        reason: isDiv
          ? `Last three digits form <span class="reason-calc-highlight">${lastThree}</span>. Since ${lastThree} ÷ 8 = ${lastThree / 8} (exact), ${n.toLocaleString()} is divisible by 8!`
          : `Last three digits form <span class="reason-calc-highlight">${lastThree}</span>. Since ${lastThree} ÷ 8 leaves remainder ${lastThree % 8}, ${n.toLocaleString()} is NOT divisible by 8.`
      };
    }
    case 9: {
      const isDiv = sumDigits % 9 === 0;
      const sumExpr = digits.join(' + ') + ' = ' + sumDigits;
      return {
        isDivisible: isDiv,
        rule: 'Sum of all digits must be divisible by 9',
        reason: isDiv
          ? `Sum of digits: <span class="reason-calc-highlight">${sumExpr}</span>. Since ${sumDigits} ÷ 9 = ${sumDigits / 9} (exact, remainder 0), ${n.toLocaleString()} is divisible by 9!`
          : `Sum of digits: <span class="reason-calc-highlight">${sumExpr}</span>. Since ${sumDigits} ÷ 9 leaves remainder ${sumDigits % 9}, ${n.toLocaleString()} is NOT divisible by 9.`
      };
    }
    case 10: {
      const isDiv = lastDigit === 0;
      return {
        isDivisible: isDiv,
        rule: 'Last digit must be 0',
        reason: isDiv
          ? `The last digit is <strong>0</strong>. Therefore, ${n.toLocaleString()} is divisible by 10!`
          : `The last digit is <strong>${lastDigit}</strong> (not 0). Therefore, ${n.toLocaleString()} is NOT divisible by 10.`
      };
    }
    case 11: {
      const reversedDigits = [...digits].reverse();
      let oddSum = 0;
      let evenSum = 0;
      const oddDigits = [];
      const evenDigits = [];
      reversedDigits.forEach((d, idx) => {
        if ((idx + 1) % 2 === 1) {
          oddSum += d;
          oddDigits.push(d);
        } else {
          evenSum += d;
          evenDigits.push(d);
        }
      });
      const diff = Math.abs(oddSum - evenSum);
      const isDiv = diff === 0 || diff % 11 === 0;
      return {
        isDivisible: isDiv,
        rule: 'Difference between sum of digits at odd places and sum of digits at even places must be 0 or divisible by 11',
        reason: isDiv
          ? `Sum at odd places (1st, 3rd... from right): [${[...oddDigits].reverse().join(' + ')}] = ${oddSum}. Sum at even places: [${[...evenDigits].reverse().join(' + ')}] = ${evenSum}. Difference = |${oddSum} − ${evenSum}| = <span class="reason-calc-highlight">${diff}</span>. Since the difference is ${diff === 0 ? '0' : 'a multiple of 11 (' + diff + ' ÷ 11 = ' + (diff / 11) + ')'}, ${n.toLocaleString()} is divisible by 11!`
          : `Sum at odd places: ${oddSum}. Sum at even places: ${evenSum}. Difference = |${oddSum} − ${evenSum}| = <span class="reason-calc-highlight">${diff}</span>. Since ${diff} is neither 0 nor a multiple of 11, ${n.toLocaleString()} is NOT divisible by 11.`
      };
    }
    case 12: {
      const div3 = checkDivisibility(n, 3).isDivisible;
      const div4 = checkDivisibility(n, 4).isDivisible;
      const isDiv = div3 && div4;
      return {
        isDivisible: isDiv,
        rule: 'Must be divisible by BOTH 3 and 4 simultaneously (co-primes: 3 × 4 = 12)',
        reason: isDiv
          ? `Divisible by 3? <strong>Yes</strong> (digit sum ${sumDigits} ÷ 3 = ${sumDigits / 3}). Divisible by 4? <strong>Yes</strong> (last 2 digits form ${n.toString().slice(-2)} ÷ 4 = ${parseInt(n.toString().slice(-2)) / 4}). Because 3 and 4 are co-prime (HCF = 1), ${n.toLocaleString()} is divisible by 12!`
          : `Divisible by 3: ${div3 ? 'Yes' : 'No'}. Divisible by 4: ${div4 ? 'Yes' : 'No'}. Since it fails ${!div3 && !div4 ? 'both tests' : !div3 ? 'rule for 3' : 'rule for 4'}, ${n.toLocaleString()} is NOT divisible by 12.`
      };
    }
    default:
      return { isDivisible: n % d === 0, reason: `${n} ÷ ${d} = ${n / d}` };
  }
}

/**
 * Returns divisibility results for all 11 curriculum divisors: 2 to 12.
 */
function getAllDivisibilityResults(n) {
  const divisors = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return divisors.map(d => ({
    divisor: d,
    ...checkDivisibility(n, d)
  }));
}

/**
 * Solves a missing digit template (e.g. "62*178", divisor 9).
 */
function solveMissingDigitPuzzle(template, divisor) {
  const matches = [];
  for (let d = 0; d <= 9; d++) {
    const numStr = template.replace('*', d.toString());
    const num = parseInt(numStr);
    if (checkDivisibility(num, divisor).isDivisible) {
      matches.push(d);
    }
  }
  return {
    template,
    divisor,
    validDigits: matches,
    smallestDigit: matches.length > 0 ? matches[0] : null
  };
}

/**
 * Returns structured Hopscotch data for Rule 11.
 */
function getHopscotch11Data(n) {
  n = Math.abs(Math.floor(n));
  const str = n.toString();
  const digits = str.split('').map(Number);
  const totalDigits = digits.length;

  const positions = digits.map((digit, idx) => {
    // Position from right (1-based: totalDigits - idx)
    const posFromRight = totalDigits - idx;
    const isOdd = posFromRight % 2 === 1;
    return {
      digit,
      index: idx,
      posFromRight,
      isOdd
    };
  });

  const oddDigits = positions.filter(p => p.isOdd);
  const evenDigits = positions.filter(p => !p.isOdd);

  const oddSum = oddDigits.reduce((acc, p) => acc + p.digit, 0);
  const evenSum = evenDigits.reduce((acc, p) => acc + p.digit, 0);
  const diff = Math.abs(oddSum - evenSum);
  const isDivisible = diff === 0 || diff % 11 === 0;

  return {
    number: n,
    positions,
    oddDigits,
    evenDigits,
    oddSum,
    evenSum,
    diff,
    isDivisible
  };
}

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

/* ==========================================================================
   6. LEARN MODULES DATA
   ========================================================================== */

const LEARN_MODULES_TOPIC_1 = {
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

const LEARN_MODULES_TOPIC_2 = {
  all_rules_table: {
    id: 'all_rules_table',
    pillTitle: '📋 Rules Cheat Sheet (2 to 12)',
    title: 'Divisibility Rules (2 to 12): Rules, Logic & Traps',
    tag: 'Master Reference',
    lead: 'Divisibility rules allow you to know whether a number divides evenly without performing long division! Explore each rule below to understand <strong>not just WHAT the rule is, but WHY it works mathematically</strong>.',
    renderContent: renderAllRulesTable
  },
  live_tester: {
    id: 'live_tester',
    pillTitle: '⚡ Live Inspector',
    title: 'Interactive Divisibility Inspector (Live Multi-Tester)',
    tag: 'Interactive Tool',
    lead: 'Type ANY number or pick an exam preset. The inspector will instantly test it against all 11 curriculum divisors (2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12) with full arithmetic reasons!',
    renderContent: renderLiveTester
  },
  coprime_composite: {
    id: 'coprime_composite',
    pillTitle: '🤝 Co-Prime Factor Law',
    title: 'Composite Divisors & The Co-Prime Factor Law (6 & 12)',
    tag: 'Advanced Concept',
    lead: 'Why can 12 be tested using 3 and 4, but CANNOT be tested using 2 and 6? Discover the <strong>fundamental Co-Prime Law</strong> that prevents tricky exam mistakes!',
    renderContent: renderCoprimeCompositeModule
  },
  missing_digit_puzzles: {
    id: 'missing_digit_puzzles',
    pillTitle: '🧩 Missing Digit Puzzles (*)',
    title: 'CBSE Section III: Missing Digit Puzzle Solver',
    tag: 'Exam Master',
    lead: 'Questions like <em>"Find the smallest digit to make 62*178 divisible by 9"</em> are guaranteed in Class 5 exams! Use this interactive board to solve them step by step.',
    renderContent: renderMissingDigitModule
  },
  rule_11_hopscotch: {
    id: 'rule_11_hopscotch',
    pillTitle: '🦘 Rule 11 Hopscotch',
    title: 'The Hopscotch Method: Odd vs Even Places for 11',
    tag: 'Visual Method',
    lead: 'Rule 11 is the most famous divisibility trick in math! Jump between odd and even place digits to find the difference without any confusion.',
    renderContent: renderRule11HopscotchModule
  }
};

const LEARN_MODULES_TOPIC_3 = {
  clue_words_dictionary: {
    id: 'clue_words_dictionary',
    pillTitle: '📖 Clue Words & Traps',
    title: 'Clue Words Dictionary & The "Order Trap" Alert',
    tag: 'Essential Vocabulary',
    lead: 'Algebra begins with translating everyday English into mathematical language! Learn the secret operation clue words for <strong>+, −, ×, ÷, and parentheses</strong>, and beware the famous <strong>"subtracted from" order trap</strong>.',
    renderContent: renderClueWordsModule
  },
  interactive_translator: {
    id: 'interactive_translator',
    pillTitle: '🔄 Dual-Way Translator',
    title: 'Dual-Way Live Translator (Statements ⇄ Expressions)',
    tag: 'Interactive Tool',
    lead: 'Convert verbal statements into clean mathematical expressions, or reverse mathematical expressions into standard CBSE verbal statements with dissected grammar chips.',
    renderContent: renderTranslatorModule
  },
  parentheses_grouping_lab: {
    id: 'parentheses_grouping_lab',
    pillTitle: '🔬 Parentheses Lab',
    title: 'The Parentheses Lab: Why Brackets Change Everything!',
    tag: 'Visual Experiment',
    lead: 'Does <code>3 × (x + 4)</code> equal <code>3x + 4</code>? Test both expressions side-by-side with an interactive variable slider to see why brackets alter the order of operations.',
    renderContent: renderParenthesesLabModule
  },
  real_world_scenarios: {
    id: 'real_world_scenarios',
    pillTitle: '🌍 Real-Life Word Modeler',
    title: 'Modeling Real-Life Situations with Expressions',
    tag: 'CBSE Word Problems',
    lead: 'Discover how to represent age comparisons, shopping bills, geometry perimeters, and number riddles using algebraic variables.',
    renderContent: renderRealWorldModule
  }
};

const LEARN_MODULES = LEARN_MODULES_TOPIC_1;

/* ==========================================================================
   7. PRACTICE QUESTIONS POOL (All 20+ School Worksheet Questions)
   ========================================================================== */

const PRACTICE_POOL_TOPIC_1 = [
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

const PRACTICE_POOL = PRACTICE_POOL_TOPIC_1;

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
  }
];

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
  }
];

const CHALLENGE_QUESTIONS_TOPIC_1 = [...PRACTICE_POOL_TOPIC_1];

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

/* ==========================================================================
   8. CURRICULUM TOPICS CONFIGURATION & REGISTRY
   ========================================================================== */

const TOPICS_CONFIG = {
  factors_multiples_hcf_lcm: {
    id: 'factors_multiples_hcf_lcm',
    title: 'Multiples, Factors, HCF & LCM',
    subtitle: 'CBSE Class 5 — Complete Conceptual & Calculation Master',
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
  }
};

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
  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
  const modules = currentConfig.learnModules;
  const mod = modules[state.activeLearnModule] || Object.values(modules)[0];
  if (!modules[state.activeLearnModule]) {
    state.activeLearnModule = mod.id;
  }

  container.innerHTML = `
    <div class="learn-container">
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

  // Attach subnav click listeners
  const pills = container.querySelectorAll('.learn-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      playClickSound();
      state.activeLearnModule = pill.getAttribute('data-mod-id');
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

/* --------------------------------------------------------------------------
   PRACTICE MODE RENDERER
   -------------------------------------------------------------------------- */

function getFilteredPracticeQuestions() {
  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
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

  container.innerHTML = `
    <div class="practice-container">
      <!-- Skill Filter Bar -->
      <div class="skill-filter-bar">
        ${categories.map(cat => `
          <button class="skill-filter-btn ${state.practiceFilter === cat.id ? 'active' : ''}" data-skill="${cat.id}">
            ${cat.label} ${cat.id === 'all' ? `(${pool.length})` : ''}
          </button>
        `).join('')}
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

  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
  const pool = currentConfig.challengePool || currentConfig.practicePool;

  // Shuffle and pick 10 questions
  state.challengeQuestions = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);

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
  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;

  if (!state.challengeActive) {
    container.innerHTML = `
      <div class="challenge-container">
        <div class="challenge-header-card" style="text-align: center; flex-direction: column; gap: 1rem;">
          <div style="font-size: 3rem;">🎯</div>
          <h3>60-Second Speed Challenge</h3>
          <p style="color: var(--text-muted); max-width: 500px;">
            Test your quick mental math skills on <strong>${currentConfig.title}</strong>! Answer up to 10 rapid questions in 60 seconds to earn 3 stars ⭐⭐⭐!
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
            <button class="option-btn" data-opt-idx="${optIdx}" id="challenge-opt-${optIdx}">
              <span class="option-label">${String.fromCharCode(65 + optIdx)}</span>
              <span class="option-text">${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Attach option clicks
  let answered = false;
  container.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;

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
        const correctBtn = container.querySelector(`#challenge-opt-${q.correct}`);
        if (correctBtn) correctBtn.classList.add('correct');
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

function renderWorksheetViewTopic1(container) {
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

/* --------------------------------------------------------------------------
   PRINT ENGINES
   -------------------------------------------------------------------------- */

function printWorksheet() {
  if (state.currentTopic === 'divisibility_rules') {
    printWorksheetTopic2();
  } else if (state.currentTopic === 'expressions_statements') {
    printWorksheetTopic3();
  } else {
    printWorksheetTopic1();
  }
}

function printWorksheetTopic1() {
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

function printWorksheetTopic2() {
  const printContainer = document.getElementById('print-container');
  if (!printContainer) return;

  printContainer.innerHTML = `
    <div class="worksheet-header">
      <h2>CLASS 5 CBSE MATHEMATICS MASTER</h2>
      <h3>HOMEWORK PRACTICE WORKSHEET (2026-27)</h3>
      <p><strong>Topic: Divisibility Rules (2 to 12) & Missing Digit Puzzles</strong></p>
      <div style="display: flex; justify-content: space-between; margin-top: 10px;">
        <span>Name: __________________________</span>
        <span>Roll No: ______</span>
        <span>Date: ____________</span>
      </div>
    </div>

    <div class="worksheet-q">
      <h4>I. Divisibility Check Matrix (Put ✓ or ✗):</h4>
      <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 11pt;" border="1">
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
          <div class="workspace-box"></div>
        </li>
        <li>
          Find the smallest missing digit to make <strong>71 * 2</strong> divisible by 6:
          <div class="workspace-box"></div>
        </li>
        <li>
          Find the single digit to replace * in <strong>5 * 84</strong> so that it is divisible by 11:
          <div class="workspace-box"></div>
        </li>
        <li>
          Find the smallest digit to replace * in <strong>43 * 6</strong> so that it is divisible by 4:
          <div class="workspace-box"></div>
        </li>
      </ol>
    </div>

    <div class="worksheet-q" style="margin-top: 15px;">
      <h4>III. Mathematical Reasoning:</h4>
      <ol>
        <li>
          Explain why testing divisibility by 12 using 2 and 6 fails, while testing with 3 and 4 works. Give an example.
          <div class="workspace-box"></div>
        </li>
        <li>
          A bakery baked 1,428 cookies. Can they be packed into boxes of 6 without any left over? Prove using rules of 2 and 3.
          <div class="workspace-box"></div>
        </li>
      </ol>
    </div>
  `;

  window.print();
}

function printWorksheetTopic3() {
  const printContainer = document.getElementById('print-container');
  if (!printContainer) return;

  printContainer.innerHTML = `
    <div class="worksheet-header">
      <h2>CENTRAL BOARD OF SECONDARY EDUCATION (CBSE)</h2>
      <h3>MATHEMATICS — CLASS V</h3>
      <p><strong>Topic: Converting Mathematical Expressions into Statements & Vice-Versa</strong></p>
      <div style="display: flex; justify-content: space-between; margin-top: 10px;">
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
          <div class="workspace-box"></div>
        </li>
        <li>
          Evaluate both 3(x + 2) and 3x + 2 when x = 5. Do they have the same value? Explain why brackets make a difference:
          <div class="workspace-box"></div>
        </li>
      </ol>
    </div>

    <div class="worksheet-q" style="margin-top: 15px;">
      <h4>IV. Real-Life Word Problems:</h4>
      <ol>
        <li>
          Rohan is 4 years older than twice Priya’s age s. If Priya is 8 years old, find Rohan’s age:
          <div class="workspace-box"></div>
        </li>
        <li>
          A boy had ₹100. He bought m chocolates at ₹12 each. Write the expression for remaining money, and find the change if m = 6:
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

  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;

  if (stars === 3) {
    starsElem.textContent = '⭐⭐⭐';
    emojiElem.textContent = '🏆';
    msgElem.textContent = `Master Level! You demonstrated perfect understanding of ${currentConfig.title}!`;
    playFanfare();
    launchConfetti();
  } else if (stars === 2) {
    starsElem.textContent = '⭐⭐';
    emojiElem.textContent = '🌟';
    msgElem.textContent = `Great Job! You have a solid grasp of ${currentConfig.title}!`;
    playCorrectSound();
  } else {
    starsElem.textContent = '⭐';
    emojiElem.textContent = '💪';
    msgElem.textContent = `Good effort! Review the lessons in ${currentConfig.title} to improve your score!`;
  }

  modal.classList.add('active');
}

function saveProgress() {
  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
  try {
    localStorage.setItem(currentConfig.starsKey, state.stars.toString());
  } catch (e) {
    // localStorage unavailable
  }
  loadAllProgress();
}

function loadAllProgress() {
  Object.values(TOPICS_CONFIG).forEach(topic => {
    try {
      const saved = localStorage.getItem(topic.starsKey);
      const stars = saved ? parseInt(saved) || 0 : 0;
      const el = document.getElementById(topic.sidebarStarId);
      if (el) {
        el.textContent = '⭐'.repeat(stars) + '☆'.repeat(Math.max(0, 3 - stars));
      }
    } catch (e) {}
  });

  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
  try {
    const saved = localStorage.getItem(currentConfig.starsKey);
    state.stars = saved ? parseInt(saved) || 0 : 0;
  } catch (e) {
    state.stars = 0;
  }
  updateProgressUI();
}

function loadProgress() {
  loadAllProgress();
}

function updateProgressUI() {
  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  const currentConfig = TOPICS_CONFIG[state.currentTopic] || TOPICS_CONFIG.factors_multiples_hcf_lcm;
  const starDisplay = document.getElementById(currentConfig.sidebarStarId);

  const pct = Math.round((state.stars / 3) * 100);
  if (fill) fill.style.width = `${pct}%`;
  if (label) label.textContent = `${state.stars} / 3 stars earned`;
  if (starDisplay) {
    starDisplay.textContent = '⭐'.repeat(state.stars) + '☆'.repeat(Math.max(0, 3 - state.stars));
  }
}

function switchTopic(topicId) {
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
  state.activeMode = 'learn';
  state.activeLearnModule = config.defaultLearnModule;
  state.practiceFilter = 'all';
  state.currentQuestionIndex = 0;
  state.scoreCorrect = 0;
  state.scoreWrong = 0;
  state.userAnswers = {};

  // Close mobile drawer if open
  const sidebar = document.getElementById('sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('sidebar-open');
  if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');

  // Update tabs UI
  const modeTabs = document.querySelectorAll('.mode-tab');
  modeTabs.forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-mode') === 'learn');
  });

  // Load progress for this topic
  try {
    const saved = localStorage.getItem(config.starsKey);
    state.stars = saved ? parseInt(saved) || 0 : 0;
  } catch (e) {
    state.stars = 0;
  }
  updateProgressUI();
  renderViewport();
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
