/**
 * Maths Master — Class 5 CBSE
 * Modularized Architecture (Vanilla ES6+ JS)
 * Zero External Runtime Dependencies
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

