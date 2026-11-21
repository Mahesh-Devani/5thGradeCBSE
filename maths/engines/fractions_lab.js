/**
 * Maths Master — Class 5 CBSE
 * Topic 7: Fractions Master — Visual Concepts to Advanced Operations Engine
 * Visual Partitioning, Mixed Numbers, Equivalence, Full Arithmetic (+, -, *, /) & Worksheets
 * Zero External Dependencies (Vanilla ES6+ JS)
 */

'use strict';

const _G_FRAC = (typeof window !== 'undefined' ? window : this);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ==========================================================================
   FRACTIONS MASTER DYNAMIC QUESTION ENGINE & HELPERS
   ========================================================================== */

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

function lcm(a, b) {
  if (!a || !b) return 0;
  return Math.abs((a * b) / gcd(a, b));
}

function simplifyFrac(n, d) {
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}

function formatFrac(n, d) {
  if (d === 1) return String(n);
  return `<span class="frac-stack"><span class="frac-num">${n}</span><span class="frac-den">${d}</span></span>`;
}

function formatMixed(w, n, d) {
  if (n === 0) return String(w);
  if (w === 0) return formatFrac(n, d);
  return `<span class="frac-mixed"><span class="frac-whole">${w}</span><span class="frac-stack"><span class="frac-num">${n}</span><span class="frac-den">${d}</span></span></span>`;
}

function toMixedString(n, d) {
  const simp = simplifyFrac(n, d);
  n = simp.n;
  d = simp.d;
  if (d === 1) return String(n);
  if (n < d) return `${n}/${d}`;
  const w = Math.floor(n / d);
  const rem = n % d;
  if (rem === 0) return String(w);
  return `${w} ${rem}/${d}`;
}

function formatFracOrMixed(n, d) {
  const simp = simplifyFrac(n, d);
  n = simp.n;
  d = simp.d;
  if (d === 1) return `${n}`;
  if (n < d) return formatFrac(n, d);
  const w = Math.floor(n / d);
  const rem = n % d;
  if (rem === 0) return `${w}`;
  return formatMixed(w, rem, d);
}

function shuffleFracOptionsAndGetCorrect(correctStr, distractorArray) {
  const validDistractors = [];
  const seen = new Set([correctStr]);
  for (const d of distractorArray) {
    if (d && !seen.has(d)) {
      seen.add(d);
      validDistractors.push(d);
    }
    if (validDistractors.length === 3) break;
  }
  let fallbackCount = 1;
  while (validDistractors.length < 3) {
    const fb = `${fallbackCount + 1}/${fallbackCount + 3}`;
    if (!seen.has(fb)) {
      seen.add(fb);
      validDistractors.push(fb);
    }
    fallbackCount++;
  }
  const all = [correctStr, ...validDistractors].sort(() => Math.random() - 0.5);
  return {
    options: all,
    correct: all.indexOf(correctStr)
  };
}

function generateDynamicFractionQuestion(skill = 'all') {
  let selectedSkill = skill;
  if (selectedSkill === 'all') {
    selectedSkill = getRandomChoice([
      'partition_basics',
      'types_and_mixed',
      'equivalent_simplest',
      'comparison_ordering',
      'add_sub_operations',
      'multiply_of',
      'divide_reciprocals'
    ]);
  }

  const id = 'dyn_frac_' + Date.now() + '_' + Math.floor(Math.random() * 100000);

  if (selectedSkill === 'partition_basics') {
    const subType = getRandomChoice(['ant_wall', 'roy_plate', 'bottle', 'chocolate']);
    if (subType === 'ant_wall') {
      const walked = getRandomChoice([3, 4, 6, 8, 12, 16, 18]);
      const simp = simplifyFrac(walked, 24);
      const correctStr = `${simp.n}/${simp.d}`;
      const distractors = [
        `${walked}/24`,
        `${walked}/12`,
        `1/${walked}`,
        `${simp.d}/${simp.n}`
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'partition_basics',
        type: 'mcq',
        question: `🐜 <strong>Ant Wall Crawl:</strong><br>An ant walks across a brick wall containing <strong>24 equal bricks</strong>. If it crawls over <strong>${walked} bricks</strong>, what fraction of the entire wall did it cover in simplest form?`,
        options,
        correct,
        explanation: `🧱 <strong>Wall Partitioning:</strong><br>The ant covered ${walked} out of 24 equal bricks: <br>Fraction = ${formatFrac(walked, 24)}.<br>Divide both by HCF(${walked}, 24) = ${gcd(walked, 24)}:<br>${formatFrac(walked, 24)} = <strong>${formatFrac(simp.n, simp.d)}</strong>.`,
        source: 'Thinkbook Visual Discovery'
      };
    } else if (subType === 'roy_plate') {
      const correctStr = 'No, because a fraction requires all parts to be equal in size.';
      const distractors = [
        'Yes, because there are 4 pieces in total.',
        'Yes, because any broken piece can be called 1/4.',
        'No, because a circle can only be cut into halves.'
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'partition_basics',
        type: 'mcq',
        question: `🍽️ <strong>Roy\'s Broken Plate:</strong><br>Roy accidentally dropped a ceramic dinner plate, breaking it into <strong>4 irregular, jagged pieces of different sizes</strong>. Roy claims that each piece represents <strong>1/4</strong> of the plate. Is his claim mathematically correct?`,
        options,
        correct,
        explanation: `🚨 <strong>The Golden Law of Fractions:</strong><br>A fraction only exists when the whole is divided into <strong>strictly EQUAL parts</strong>! Since Roy\'s pieces have different shapes and sizes, none of them can be called ${formatFrac(1, 4)}.`,
        source: 'Thinkbook Conceptual Foundations'
      };
    } else if (subType === 'bottle') {
      const ml = getRandomChoice([250, 500, 750]);
      const simp = simplifyFrac(ml, 1000);
      const correctStr = `${simp.n}/${simp.d}`;
      const distractors = [
        `${ml}/100`,
        simp.n === 1 && simp.d === 2 ? '1/4' : '1/2',
        simp.n === 3 && simp.d === 4 ? '2/3' : '3/4',
        '1/5'
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'partition_basics',
        type: 'mcq',
        question: `🧴 <strong>Water Bottle Benchmark:</strong><br>A water bottle has a total capacity of <strong>1000 mL</strong>. If water is filled up to <strong>${ml} mL</strong>, what fraction of the bottle is filled in simplest form?`,
        options,
        correct,
        explanation: `💧 <strong>Capacity Benchmark:</strong><br>Filled fraction = ${formatFrac(ml, 1000)}.<br>Divide numerator and denominator by 250: ${formatFrac(ml, 1000)} = <strong>${formatFrac(simp.n, simp.d)}</strong>.<br><em>Midline deduction:</em> 500 mL is the exact half (${formatFrac(1, 2)}).`,
        source: 'Thinkbook Estimation Benchmarks'
      };
    } else {
      const total = getRandomChoice([6, 8, 10, 12]);
      const shaded = getRandomChoice([2, 3, 4, 5]);
      const simp = simplifyFrac(shaded, total);
      const correctStr = `${simp.n}/${simp.d}`;
      const distractors = [`${total - shaded}/${total}`, `${shaded}/${total + 2}`, `1/${shaded}`, `${simp.d}/${simp.n}`];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'partition_basics',
        type: 'mcq',
        question: `🍫 <strong>Equal Bar Partitions:</strong><br>A chocolate slab is divided into <strong>${total} equal squares</strong>. Meera eats <strong>${shaded} squares</strong>. What fraction of the chocolate slab did she eat in simplest form?`,
        options,
        correct,
        explanation: `🍫 <strong>Fraction of Whole:</strong><br>Slices eaten = ${shaded}, Total equal slices = ${total}.<br>Fraction = ${formatFrac(shaded, total)} = <strong>${formatFrac(simp.n, simp.d)}</strong> in lowest terms.`,
        source: 'CBSE Visual Fractions'
      };
    }
  }

  if (selectedSkill === 'types_and_mixed') {
    const subType = getRandomChoice(['improper_to_mixed', 'mixed_to_improper', 'grocery_bill', 'classify']);
    if (subType === 'improper_to_mixed') {
      const d = getRandomChoice([3, 4, 5, 6, 7, 8]);
      const w = getRandomInt(2, 6);
      const r = getRandomInt(1, d - 1);
      const n = w * d + r;
      const correctStr = `${w} ${r}/${d}`;
      const distractors = [
        `${w + 1} ${r}/${d}`,
        `${w} ${d}/${r}`,
        `${w - 1} ${r + 1}/${d}`,
        `${r} ${w}/${d}`
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'types_and_mixed',
        type: 'mcq',
        question: `🍕 <strong>Convert Improper to Mixed:</strong><br>Express the improper fraction <strong>${formatFrac(n, d)}</strong> as a mixed number:`,
        options,
        correct,
        explanation: `🍕 <strong>Pizza Pan Division:</strong><br>Divide Numerator by Denominator: ${n} ÷ ${d} = <strong>${w}</strong> with remainder <strong>${r}</strong>.<br>• Quotient (${w}) = Whole Number<br>• Remainder (${r}) = New Numerator<br>• Denominator (${d}) remains unchanged!<br>Result = <strong>${formatMixed(w, r, d)}</strong>.`,
        source: 'Thinkbook Pizza Pan Converter'
      };
    } else if (subType === 'mixed_to_improper') {
      const d = getRandomChoice([3, 4, 5, 7, 9]);
      const w = getRandomInt(2, 5);
      const r = getRandomInt(1, d - 1);
      const n = w * d + r;
      const correctStr = `${n}/${d}`;
      const distractors = [
        `${w * r + d}/${d}`,
        `${n + 2}/${d}`,
        `${n - 1}/${d}`,
        `${d}/${n}`
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'types_and_mixed',
        type: 'mcq',
        question: `🔄 <strong>Convert Mixed to Improper:</strong><br>Express the mixed number <strong>${formatMixed(w, r, d)}</strong> as an improper fraction:`,
        options,
        correct,
        explanation: `🔄 <strong>Conversion Formula:</strong><br>Improper Numerator = (Whole × Denominator) + Numerator<br>= (${w} × ${d}) + ${r} = ${w * d} + ${r} = <strong>${n}</strong>.<br>Denominator stays ${d} $\implies$ <strong>${formatFrac(n, d)}</strong>.`,
        source: 'CBSE Mixed Number Conversions'
      };
    } else if (subType === 'grocery_bill') {
      const d = 4;
      const w = getRandomChoice([2, 3, 4]);
      const r = getRandomChoice([1, 3]);
      const n = w * d + r;
      const correctStr = `${w} ${r}/${d} kg`;
      const distractors = [
        `${w + 1} ${r}/${d} kg`,
        `${w} ${d}/${r} kg`,
        `${n} kg`,
        `${w} kg`
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'types_and_mixed',
        type: 'mcq',
        question: `🛒 <strong>The Grocery Bill Mystery:</strong><br>A supermarket bill reads: <em>Sugar weight = <strong>${formatFrac(n, 4)} kg</strong></em>.<br>How should this quantity be written as full 1 kg bags and remaining fraction for easy cooking?`,
        options,
        correct,
        explanation: `🛒 <strong>Real-Life Mixed Number:</strong><br>${n} quarters of a kg = ${n} ÷ 4 = <strong>${w} full 1 kg bags</strong> with <strong>${r} quarter-kg</strong> remaining.<br>Written as: <strong>${formatMixed(w, r, 4)} kg</strong>.`,
        source: 'Thinkbook Real-World Modeling'
      };
    } else {
      const correctStr = '11/4';
      const distractors = ['3/5', '7/8', '2/9'];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'types_and_mixed',
        type: 'mcq',
        question: `🔍 <strong>Classify Fractions:</strong><br>Which of the following is an <strong>improper fraction</strong> (where Numerator ≥ Denominator, so value ≥ 1)?`,
        options,
        correct,
        explanation: `🔍 <strong>Fraction Types:</strong><br>• <strong>Proper fraction:</strong> Numerator < Denominator (Value < 1, e.g., 3/5, 7/8).<br>• <strong>Improper fraction:</strong> Numerator ≥ Denominator (Value ≥ 1, e.g., <strong>11/4</strong>).`,
        source: 'CBSE Definitions'
      };
    }
  }

  if (selectedSkill === 'equivalent_simplest') {
    const subType = getRandomChoice(['missing_term', 'lowest_terms', 'find_equivalent']);
    if (subType === 'missing_term') {
      const n = getRandomChoice([2, 3, 4, 5]);
      const d = getRandomChoice([5, 7, 9, 11]);
      const k = getRandomChoice([3, 4, 5, 6]);
      const scaledN = n * k;
      const scaledD = d * k;
      const isMissingDen = Math.random() < 0.5;

      if (isMissingDen) {
        const correctStr = String(scaledD);
        const distractors = [String(scaledD + k), String(scaledD - k), String(d * (k + 1))];
        const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
        return {
          id,
          skill: 'equivalent_simplest',
          type: 'mcq',
          question: `🔍 <strong>Equivalent Fractions Missing Term:</strong><br>Find the missing denominator to make the fractions equivalent:<br><div style="font-size: 1.4rem; margin: 0.5rem 0;">${formatFrac(n, d)} = ${formatFrac(scaledN, '?')}</div>`,
          options,
          correct,
          explanation: `🔍 <strong>Scale Multiplier:</strong><br>Notice the numerator scaled from ${n} to ${scaledN} by multiplying by <strong>${k}</strong> (${n} × ${k} = ${scaledN}).<br>By the Golden Rule of Equivalence, we must multiply the denominator by the exact same number:<br>${d} × ${k} = <strong>${scaledD}</strong>.`,
          source: 'CBSE Equivalent Fractions'
        };
      } else {
        const correctStr = String(scaledN);
        const distractors = [String(scaledN + k), String(scaledN - k), String(n * (k + 1))];
        const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
        return {
          id,
          skill: 'equivalent_simplest',
          type: 'mcq',
          question: `🔍 <strong>Equivalent Fractions Missing Term:</strong><br>Find the missing numerator to make the fractions equivalent:<br><div style="font-size: 1.4rem; margin: 0.5rem 0;">${formatFrac(n, d)} = ${formatFrac('?', scaledD)}</div>`,
          options,
          correct,
          explanation: `🔍 <strong>Scale Multiplier:</strong><br>The denominator scaled from ${d} to ${scaledD} by multiplying by <strong>${k}</strong> (${d} × ${k} = ${scaledD}).<br>Multiply the numerator by ${k}:<br>${n} × ${k} = <strong>${scaledN}</strong>.`,
          source: 'CBSE Equivalent Fractions'
        };
      }
    } else if (subType === 'lowest_terms') {
      const base = getRandomChoice([{ n: 1, d: 3 }, { n: 2, d: 5 }, { n: 3, d: 4 }, { n: 2, d: 7 }, { n: 3, d: 5 }, { n: 5, d: 6 }]);
      const k = getRandomChoice([4, 6, 8, 9]);
      const n = base.n * k;
      const d = base.d * k;
      const correctStr = `${base.n}/${base.d}`;
      const distractors = [
        `${base.n * 2}/${base.d * 2}`,
        `${base.n}/${d}`,
        `${base.d}/${base.n}`,
        `${base.n + 1}/${base.d + 1}`
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'equivalent_simplest',
        type: 'mcq',
        question: `✂️ <strong>Reduce to Lowest Terms (Simplest Form):</strong><br>Reduce the fraction <strong>${formatFrac(n, d)}</strong> to its simplest form by dividing both numerator and denominator by their HCF:`,
        options,
        correct,
        explanation: `✂️ <strong>HCF Reduction:</strong><br>HCF of ${n} and ${d} is <strong>${k}</strong>.<br>Divide both by ${k}:<br>Numerator: ${n} ÷ ${k} = <strong>${base.n}</strong><br>Denominator: ${d} ÷ ${k} = <strong>${base.d}</strong><br>Simplest Form = <strong>${formatFrac(base.n, base.d)}</strong>.`,
        source: 'CBSE Simplest Form'
      };
    } else {
      const base = getRandomChoice([{ n: 2, d: 3 }, { n: 3, d: 5 }, { n: 4, d: 7 }]);
      const correctK = 4;
      const correctStr = `${base.n * correctK}/${base.d * correctK}`;
      const distractors = [
        `${base.n * 3}/${base.d * 4}`,
        `${base.n + 2}/${base.d + 2}`,
        `${base.n * 2}/${base.d * 5}`
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'equivalent_simplest',
        type: 'mcq',
        question: `⚖️ <strong>Identify Equivalent Fraction:</strong><br>Which of the following fractions is strictly equivalent to <strong>${formatFrac(base.n, base.d)}</strong>?`,
        options,
        correct,
        explanation: `⚖️ <strong>Equivalence Check:</strong><br>Multiply both numerator and denominator by 4:<br>${formatFrac(base.n, base.d)} × ${formatFrac(4, 4)} = <strong>${formatFrac(base.n * 4, base.d * 4)}</strong>.<br>Notice that simply adding numbers to top and bottom (like +2) does NOT preserve equivalence!`,
        source: 'CBSE Equivalence'
      };
    }
  }

  if (selectedSkill === 'comparison_ordering') {
    const subType = getRandomChoice(['same_den', 'same_num', 'mixed_whole', 'butterfly']);
    if (subType === 'same_den') {
      const d = getRandomChoice([7, 9, 11, 13, 15]);
      const n1 = getRandomInt(2, d - 2);
      let n2 = getRandomInt(2, d - 2);
      while (n2 === n1) n2 = getRandomInt(2, d - 2);
      const larger = Math.max(n1, n2);
      const smaller = Math.min(n1, n2);
      const correctStr = `${larger}/${d} is greater`;
      const distractors = [
        `${smaller}/${d} is greater`,
        'Both fractions are exactly equal',
        'Cannot be compared without decimals'
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'comparison_ordering',
        type: 'mcq',
        question: `📊 <strong>Shortcut 1 — Like Fractions:</strong><br>Compare the fractions <strong>${formatFrac(n1, d)}</strong> and <strong>${formatFrac(n2, d)}</strong>. Which fraction is larger?`,
        options,
        correct,
        explanation: `📊 <strong>Same Denominators:</strong><br>When denominators are identical, every piece is the exact same size. Therefore, the fraction with the larger numerator has more pieces!<br>Since ${larger} > ${smaller}, <strong>${formatFrac(larger, d)} > ${formatFrac(smaller, d)}</strong>.`,
        source: 'No-Pen Deductive Comparison'
      };
    } else if (subType === 'same_num') {
      const n = getRandomChoice([3, 4, 5, 7]);
      const d1 = getRandomChoice([6, 7, 8]);
      const d2 = getRandomChoice([10, 11, 12]);
      const correctStr = `${n}/${d1} is greater (smaller denominator means larger pieces)`;
      const distractors = [
        `${n}/${d2} is greater (larger denominator means larger pieces)`,
        'Both fractions are equal because numerators are the same',
        'Cannot determine without finding LCM'
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'comparison_ordering',
        type: 'mcq',
        question: `🔍 <strong>Shortcut 2 — Same Numerators:</strong><br>Compare <strong>${formatFrac(n, d1)}</strong> and <strong>${formatFrac(n, d2)}</strong>. Which is greater and why?`,
        options,
        correct,
        explanation: `💡 <strong>Mindset Deduction:</strong><br>You have ${n} slices in both cases. But cutting a cake into ${d1} slices gives <strong>much larger slices</strong> than cutting it into ${d2} slices!<br>Therefore, when numerators are equal, <strong>the smaller denominator produces the larger fraction</strong>!<br>So <strong>${formatFrac(n, d1)} > ${formatFrac(n, d2)}</strong>.`,
        source: 'Thinkbook Conceptual Deductions'
      };
    } else if (subType === 'mixed_whole') {
      const w1 = getRandomChoice([4, 5, 6, 7]);
      let w2 = getRandomChoice([2, 3, 4]);
      while (w2 === w1) w2 = getRandomChoice([2, 3]);
      const den = getRandomChoice([5, 7, 8, 9]);
      const r1 = getRandomInt(1, den - 2);
      const r2 = getRandomInt(r1 + 1, den - 1);
      const largerW = Math.max(w1, w2);
      const smallerW = Math.min(w1, w2);
      const correctStr = `${largerW} ${r1}/${den} is greater (compare whole numbers first)`;
      const distractors = [
        `${smallerW} ${r2}/${den} is greater (because ${r2}/${den} is larger than ${r1}/${den})`,
        'Both are equal',
        'Must convert to improper fractions first'
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'comparison_ordering',
        type: 'mcq',
        question: `⚡ <strong>Shortcut 3 — Mixed Number Whole Comparison:</strong><br>Compare <strong>${formatMixed(largerW, r1, den)}</strong> and <strong>${formatMixed(smallerW, r2, den)}</strong> without writing down calculations:`,
        options,
        correct,
        explanation: `⚡ <strong>Whole Number Priority:</strong><br>${largerW} whole units is ALWAYS more than ${smallerW} whole units, even if the fractional slice of the second is larger!<br>Since ${largerW} > ${smallerW}, <strong>${formatMixed(largerW, r1, den)} > ${formatMixed(smallerW, r2, den)}</strong> in 0.1 seconds!`,
        source: 'No-Pen Mental Math'
      };
    } else {
      const pairs = [
        { a: 2, b: 5, c: 3, d: 7 },
        { a: 3, b: 8, c: 4, d: 9 },
        { a: 5, b: 6, c: 7, d: 8 },
        { a: 3, b: 7, c: 4, d: 9 },
        { a: 4, b: 7, c: 5, d: 8 },
        { a: 2, b: 9, c: 3, d: 11 },
        { a: 5, b: 12, c: 4, d: 9 }
      ];
      const p = getRandomChoice(pairs);
      const a = p.a, b = p.b, c = p.c, d = p.d;
      const cross1 = a * d;
      const cross2 = b * c;
      const isLeftGreater = cross1 > cross2;
      const correctStr = isLeftGreater ? `${a}/${b} is greater (${cross1} > ${cross2})` : `${c}/${d} is greater (${cross2} > ${cross1})`;
      const distractors = [
        isLeftGreater ? `${c}/${d} is greater (${cross2} > ${cross1})` : `${a}/${b} is greater (${cross1} > ${cross2})`,
        'Both fractions are equal',
        'Neither, they are incomparable'
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'comparison_ordering',
        type: 'mcq',
        question: `🦋 <strong>Butterfly Cross-Multiplication:</strong><br>Compare <strong>${formatFrac(a, b)}</strong> and <strong>${formatFrac(c, d)}</strong> using cross-multiplication:`,
        options,
        correct,
        explanation: `🦋 <strong>Cross-Multiply Diagonals:</strong><br>• Left Wing: ${a} × ${d} = <strong>${cross1}</strong><br>• Right Wing: ${b} × ${c} = <strong>${cross2}</strong><br>Since ${Math.max(cross1, cross2)} > ${Math.min(cross1, cross2)}, <strong>${isLeftGreater ? formatFrac(a, b) : formatFrac(c, d)} > ${isLeftGreater ? formatFrac(c, d) : formatFrac(a, b)}</strong>.`,
        source: 'CBSE Cross-Multiplication'
      };
    }
  }

  if (selectedSkill === 'add_sub_operations') {
    const subType = getRandomChoice(['like_add', 'unlike_add', 'unlike_sub', 'word_ribbon', 'word_reading']);
    if (subType === 'like_add') {
      const d = getRandomChoice([7, 9, 11, 13]);
      const a = getRandomInt(1, 3);
      const b = getRandomInt(1, 3);
      const sumN = a + b;
      const correctStr = `${sumN}/${d}`;
      const distractors = [
        `${sumN}/${d * 2}`,
        `${a * b}/${d}`,
        `${sumN + 1}/${d}`
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'add_sub_operations',
        type: 'mcq',
        question: `➕ <strong>Like Fractions Addition:</strong><br>Find the sum: <div style="font-size: 1.3rem; margin: 0.5rem 0;">${formatFrac(a, d)} + ${formatFrac(b, d)} = ______</div>`,
        options,
        correct,
        explanation: `🚨 <strong>Avoid Rahul\'s Trap!</strong><br>When denominators are identical, you ONLY add the numerators! The denominator tells the slice size and NEVER adds together.<br>${formatFrac(a, d)} + ${formatFrac(b, d)} = ${formatFrac(`${a} + ${b}`, d)} = <strong>${formatFrac(sumN, d)}</strong>.<br><em>Notice:</em> Writing ${formatFrac(sumN, d * 2)} is Rahul\'s classic blunder!`,
        source: 'Thinkbook Rahul Trap'
      };
    } else if (subType === 'unlike_add') {
      const pairs = [
        { n1: 1, d1: 3, n2: 1, d2: 4 },
        { n1: 2, d1: 5, n2: 1, d2: 2 },
        { n1: 3, d1: 4, n2: 1, d2: 6 },
        { n1: 1, d1: 2, n2: 1, d2: 3 },
        { n1: 2, d1: 3, n2: 1, d2: 5 },
        { n1: 3, d1: 8, n2: 1, d2: 4 }
      ];
      const p = getRandomChoice(pairs);
      const commonD = lcm(p.d1, p.d2);
      const scaled1 = p.n1 * (commonD / p.d1);
      const scaled2 = p.n2 * (commonD / p.d2);
      const sumN = scaled1 + scaled2;
      const simp = simplifyFrac(sumN, commonD);
      const correctStr = `${simp.n}/${simp.d}`;
      const distractors = [
        `${p.n1 + p.n2}/${p.d1 + p.d2}`,
        `${sumN - 1}/${commonD}`,
        `${p.n1 * p.n2}/${commonD}`
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'add_sub_operations',
        type: 'mcq',
        question: `🔨 <strong>Unlike Fractions (LCM Hammer):</strong><br>Calculate the sum in simplest form:<br><div style="font-size: 1.3rem; margin: 0.5rem 0;">${formatFrac(p.n1, p.d1)} + ${formatFrac(p.n2, p.d2)} = ______</div>`,
        options,
        correct,
        explanation: `🔨 <strong>LCM Step-by-Step:</strong><br>1. LCM of ${p.d1} and ${p.d2} is <strong>${commonD}</strong>.<br>2. Convert to like fractions: ${formatFrac(p.n1, p.d1)} = ${formatFrac(scaled1, commonD)} and ${formatFrac(p.n2, p.d2)} = ${formatFrac(scaled2, commonD)}.<br>3. Add numerators: ${formatFrac(`${scaled1} + ${scaled2}`, commonD)} = ${formatFrac(sumN, commonD)} = <strong>${formatFrac(simp.n, simp.d)}</strong>.`,
        source: 'CBSE Unlike Fractions'
      };
    } else if (subType === 'unlike_sub') {
      const pairs = [
        { n1: 5, d1: 6, n2: 1, d2: 4 },
        { n1: 3, d1: 4, n2: 2, d2: 5 },
        { n1: 7, d1: 10, n2: 2, d2: 5 },
        { n1: 7, d1: 8, n2: 1, d2: 2 },
        { n1: 4, d1: 5, n2: 1, d2: 3 }
      ];
      const p = getRandomChoice(pairs);
      const commonD = lcm(p.d1, p.d2);
      const scaled1 = p.n1 * (commonD / p.d1);
      const scaled2 = p.n2 * (commonD / p.d2);
      const diffN = scaled1 - scaled2;
      const simp = simplifyFrac(diffN, commonD);
      const correctStr = `${simp.n}/${simp.d}`;
      const distractors = [
        `${p.n1 - p.n2}/${p.d1 - p.d2 || 2}`,
        `${diffN + 1}/${commonD}`,
        `${diffN}/${commonD * 2}`
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'add_sub_operations',
        type: 'mcq',
        question: `➖ <strong>Unlike Fractions Subtraction:</strong><br>Subtract and give the answer in lowest terms:<br><div style="font-size: 1.3rem; margin: 0.5rem 0;">${formatFrac(p.n1, p.d1)} − ${formatFrac(p.n2, p.d2)} = ______</div>`,
        options,
        correct,
        explanation: `➖ <strong>Subtraction Steps:</strong><br>1. LCM(${p.d1}, ${p.d2}) = <strong>${commonD}</strong>.<br>2. Equivalent fractions: ${formatFrac(scaled1, commonD)} − ${formatFrac(scaled2, commonD)}.<br>3. Subtract numerators: ${formatFrac(`${scaled1} − ${scaled2}`, commonD)} = <strong>${formatFrac(simp.n, simp.d)}</strong>.`,
        source: 'CBSE Subtraction'
      };
    } else if (subType === 'word_ribbon') {
      const ribbonPairs = [
        { totN: 7, totD: 8, cutN: 1, cutD: 4, ansN: 5, ansD: 8 },
        { totN: 5, totD: 6, cutN: 1, cutD: 3, ansN: 1, ansD: 2 },
        { totN: 3, totD: 4, cutN: 1, cutD: 2, ansN: 1, ansD: 4 },
        { totN: 9, totD: 10, cutN: 2, cutD: 5, ansN: 1, ansD: 2 },
        { totN: 5, totD: 8, cutN: 1, cutD: 4, ansN: 3, ansD: 8 }
      ];
      const rp = getRandomChoice(ribbonPairs);
      const correctStr = `${rp.ansN}/${rp.ansD} m`;
      const distractors = [
        `${rp.totN - rp.cutN}/${rp.totD} m`,
        `${rp.ansN + 1}/${rp.ansD} m`,
        `${rp.ansN}/${rp.ansD * 2} m`
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'add_sub_operations',
        type: 'mcq',
        question: `🎀 <strong>Applied Word Problem — Ribbon Cut:</strong><br>A ribbon was <strong>${formatFrac(rp.totN, rp.totD)} meter</strong> long. An art student cut off <strong>${formatFrac(rp.cutN, rp.cutD)} meter</strong> for a craft project. What length of ribbon is left?`,
        options,
        correct,
        explanation: `🎀 <strong>Ribbon Remaining:</strong><br>Remaining = ${formatFrac(rp.totN, rp.totD)} − ${formatFrac(rp.cutN, rp.cutD)}.<br>Convert to like fractions with common denominator: answer = <strong>${formatFrac(rp.ansN, rp.ansD)} meter</strong>.`,
        source: 'Worksheet 2026-27 (Ribbon Problem)'
      };
    } else {
      const readingPairs = [
        { d1N: 1, d1D: 3, d2N: 2, d2D: 5, ansN: 11, ansD: 15 },
        { d1N: 1, d1D: 4, d2N: 1, d2D: 2, ansN: 3, ansD: 4 },
        { d1N: 2, d1D: 7, d2N: 3, d2D: 7, ansN: 5, ansD: 7 },
        { d1N: 1, d1D: 6, d2N: 1, d2D: 3, ansN: 1, ansD: 2 },
        { d1N: 3, d1D: 10, d2N: 2, d2D: 5, ansN: 7, ansD: 10 }
      ];
      const rdp = getRandomChoice(readingPairs);
      const correctStr = `${rdp.ansN}/${rdp.ansD} of the book`;
      const distractors = [
        `${rdp.d1N + rdp.d2N}/${rdp.d1D + rdp.d2D} of the book`,
        `${rdp.ansN - 2}/${rdp.ansD} of the book`,
        `1/2 of the book`
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'add_sub_operations',
        type: 'mcq',
        question: `📖 <strong>Applied Word Problem — Weekend Reading:</strong><br>Rohan read <strong>${formatFrac(rdp.d1N, rdp.d1D)}</strong> of a storybook on Saturday and <strong>${formatFrac(rdp.d2N, rdp.d2D)}</strong> on Sunday. What fraction of the book did he read across the weekend?`,
        options,
        correct,
        explanation: `📖 <strong>Total Read:</strong><br>Total = ${formatFrac(rdp.d1N, rdp.d1D)} + ${formatFrac(rdp.d2N, rdp.d2D)}.<br>Find common denominator and sum: <strong>${formatFrac(rdp.ansN, rdp.ansD)} of the book</strong>.`,
        source: 'Worksheet 2026-27 (Word Problem)'
      };
    }
  }

  if (selectedSkill === 'multiply_of') {
    const subType = getRandomChoice(['of_number', 'slice_a_slice', 'cross_cancel', 'mixed_multiply']);
    if (subType === 'of_number') {
      const d = getRandomChoice([4, 5, 6, 8]);
      const n = getRandomChoice([2, 3, 5].filter(x => x < d));
      const mult = getRandomChoice([4, 6, 7, 8, 9]);
      const totalNum = d * mult;
      const ansVal = (totalNum / d) * n;
      const correctStr = String(ansVal);
      const distractors = [String(ansVal + mult), String(ansVal - mult), String(totalNum / d)];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'multiply_of',
        type: 'mcq',
        question: `✨ <strong>The Magic of "Of":</strong><br>Find: <div style="font-size: 1.3rem; margin: 0.5rem 0;">${formatFrac(n, d)} of ${totalNum} = ______</div>`,
        options,
        correct,
        explanation: `✨ <strong>"Of" Means Multiply:</strong><br>${formatFrac(n, d)} of ${totalNum} = (${totalNum} ÷ ${d}) × ${n} = ${mult} × ${n} = <strong>${ansVal}</strong>.`,
        source: 'Thinkbook "Of" Concept'
      };
    } else if (subType === 'slice_a_slice') {
      const slicePairs = [
        { a: 2, b: 4, ans: 8 },
        { a: 2, b: 3, ans: 6 },
        { a: 3, b: 4, ans: 12 },
        { a: 2, b: 5, ans: 10 },
        { a: 3, b: 3, ans: 9 }
      ];
      const sp = getRandomChoice(slicePairs);
      const correctStr = `1/${sp.ans}`;
      const distractors = [`2/${sp.a + sp.b}`, `1/${sp.a + sp.b}`, `1/${sp.a * 2}`];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'multiply_of',
        type: 'mcq',
        question: `📄 <strong>Slicing a Slice:</strong><br>Take a sheet of paper. Fold it into ${sp.a} equal sections (${formatFrac(1, sp.a)}). Now fold each section into ${sp.b} parts (${formatFrac(1, sp.b)}).<br>What fraction of the original paper is one small folded box? (${formatFrac(1, sp.a)} × ${formatFrac(1, sp.b)} = ?)`,
        options,
        correct,
        explanation: `📄 <strong>Paper Folding Discovery:</strong><br>Unfolding reveals ${sp.a} × ${sp.b} = ${sp.ans} identical sections!<br>Multiply numerators: 1 × 1 = 1.<br>Multiply denominators: ${sp.a} × ${sp.b} = ${sp.ans}.<br>Result = <strong>${formatFrac(1, sp.ans)}</strong>.`,
        source: 'Thinkbook Visual Paper Model'
      };
    } else if (subType === 'cross_cancel') {
      const sets = [
        { n1: 3, d1: 8, n2: 4, d2: 9, ansN: 1, ansD: 6 },
        { n1: 5, d1: 14, n2: 7, d2: 10, ansN: 1, ansD: 4 },
        { n1: 2, d1: 3, n2: 9, d2: 10, ansN: 3, ansD: 5 },
        { n1: 4, d1: 15, n2: 5, d2: 12, ansN: 1, ansD: 9 }
      ];
      const s = getRandomChoice(sets);
      const correctStr = `${s.ansN}/${s.ansD}`;
      const distractors = [
        `${s.n1 * s.n2}/${s.d1 * s.d2}`,
        `${s.ansN + 1}/${s.ansD}`,
        `${s.ansD}/${s.ansN}`
      ];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'multiply_of',
        type: 'mcq',
        question: `⚡ <strong>Cross-Cancellation Power Tool:</strong><br>Multiply and simplify in lowest terms:<br><div style="font-size: 1.3rem; margin: 0.5rem 0;">${formatFrac(s.n1, s.d1)} × ${formatFrac(s.n2, s.d2)} = ______</div>`,
        options,
        correct,
        explanation: `⚡ <strong>Cross-Cancel Before Multiplying!</strong><br>Cancel diagonally:<br>• ${s.n1} and ${s.d2} divide by their common factor.<br>• ${s.n2} and ${s.d1} divide by their common factor.<br>Multiplying the reduced numbers gives <strong>${formatFrac(s.ansN, s.ansD)}</strong> immediately without big calculations!`,
        source: 'CBSE Multiplication'
      };
    } else {
      const mixedPairs = [
        { w1: 1, n1: 1, d1: 2, w2: 2, n2: 2, d2: 3, ans: '4', trap: '2 1/3 (Rahul\'s trap)', exp: '3/2 × 8/3 = 24/6 = 4' },
        { w1: 1, n1: 1, d1: 4, w2: 1, n2: 3, d2: 5, ans: '2', trap: '1 3/20 (Rahul\'s trap)', exp: '5/4 × 8/5 = 40/20 = 2' },
        { w1: 2, n1: 1, d1: 2, w2: 1, n2: 1, d2: 5, ans: '3', trap: '2 1/10 (Rahul\'s trap)', exp: '5/2 × 6/5 = 30/10 = 3' },
        { w1: 1, n1: 2, d1: 3, w2: 1, n2: 4, d2: 5, ans: '3', trap: '1 8/15 (Rahul\'s trap)', exp: '5/3 × 9/5 = 45/15 = 3' }
      ];
      const mp = getRandomChoice(mixedPairs);
      const correctStr = mp.ans;
      const distractors = [mp.trap, String(parseInt(mp.ans) + 1), String(Math.max(1, parseInt(mp.ans) - 1))];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'multiply_of',
        type: 'mcq',
        question: `🚨 <strong>Mixed Number Multiplication Trap:</strong><br>Solve: <strong>${formatMixed(mp.w1, mp.n1, mp.d1)} × ${formatMixed(mp.w2, mp.n2, mp.d2)}</strong> = ______`,
        options,
        correct,
        explanation: `🚨 <strong>Avoid Rahul\'s Trap!</strong><br>Never multiply whole × whole and fraction × fraction separately!<br><strong>Correct Method:</strong> Convert both to improper fractions first!<br>${mp.exp} = <strong>${mp.ans}</strong>.`,
        source: 'Thinkbook Rahul Trap'
      };
    }
  }

  // divide_reciprocals
  const subType = getRandomChoice(['reciprocal_rule', 'measurement_cups', 'keep_change_flip', 'word_tailor']);
  if (subType === 'reciprocal_rule') {
    const kind = getRandomChoice(['fraction', 'whole', 'mixed', 'zero']);
    if (kind === 'fraction') {
      const n = getRandomChoice([3, 5, 7]);
      const d = getRandomChoice([4, 8, 9]);
      const correctStr = `${d}/${n}`;
      const distractors = [`${n}/${d}`, `1/${n}`, `1/${d}`];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'divide_reciprocals',
        type: 'mcq',
        question: `🔄 <strong>Find the Reciprocal:</strong><br>What is the reciprocal (multiplicative inverse) of <strong>${formatFrac(n, d)}</strong>?`,
        options,
        correct,
        explanation: `🔄 <strong>Reciprocal Definition:</strong><br>Two numbers are reciprocals if their product is 1.<br>To find the reciprocal of a fraction, simply flip numerator and denominator: ${formatFrac(n, d)} $\to$ <strong>${formatFrac(d, n)}</strong>.`,
        source: 'CBSE Reciprocals'
      };
    } else if (kind === 'whole') {
      const w = getRandomChoice([5, 6, 7, 8, 9]);
      const correctStr = `1/${w}`;
      const distractors = [String(w), `${w}/1`, '0'];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'divide_reciprocals',
        type: 'mcq',
        question: `🔄 <strong>Reciprocal of a Whole Number:</strong><br>What is the reciprocal of the whole number <strong>${w}</strong>?`,
        options,
        correct,
        explanation: `🔄 <strong>Whole Number as Fraction:</strong><br>Write ${w} as ${formatFrac(w, 1)}. Inverting gives <strong>${formatFrac(1, w)}</strong>.`,
        source: 'CBSE Reciprocals'
      };
    } else if (kind === 'mixed') {
      const mixedRecips = [
        { w: 2, n: 1, d: 3, imp: '7/3', ans: '3/7', trap: '2 3/1' },
        { w: 3, n: 1, d: 2, imp: '7/2', ans: '2/7', trap: '3 2/1' },
        { w: 1, n: 3, d: 4, imp: '7/4', ans: '4/7', trap: '1 4/3' },
        { w: 2, n: 2, d: 5, imp: '12/5', ans: '5/12', trap: '2 5/2' },
        { w: 4, n: 1, d: 2, imp: '9/2', ans: '2/9', trap: '4 2/1' }
      ];
      const mr = getRandomChoice(mixedRecips);
      const correctStr = mr.ans;
      const distractors = [mr.trap, `${mr.imp}`, `1/${mr.w}`];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'divide_reciprocals',
        type: 'mcq',
        question: `🔄 <strong>Reciprocal of a Mixed Number:</strong><br>What is the reciprocal of <strong>${formatMixed(mr.w, mr.n, mr.d)}</strong>?`,
        options,
        correct,
        explanation: `🚨 <strong>Mixed Reciprocal Rule:</strong><br>1. First convert mixed to improper: ${formatMixed(mr.w, mr.n, mr.d)} = ${mr.imp}.<br>2. Invert the improper fraction: reciprocal of ${mr.imp} is <strong>${mr.ans}</strong>!`,
        source: 'Thinkbook Reciprocal Trap'
      };
    } else {
      const correctStr = 'Does not exist (Undefined)';
      const distractors = ['0', '1', '1/0 = 0'];
      const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
      return {
        id,
        skill: 'divide_reciprocals',
        type: 'mcq',
        question: `🚨 <strong>The Zero Reciprocal Paradox:</strong><br>What is the reciprocal of the number <strong>0</strong>?`,
        options,
        correct,
        explanation: `🚨 <strong>Mathematical Law:</strong><br>Zero has <strong>NO reciprocal</strong>! There is no number that you can multiply with 0 to get 1 ($0 \times \text{anything} = 0$). Furthermore, 1 ÷ 0 is undefined in mathematics.`,
        source: 'Thinkbook Zero Rule'
      };
    }
  } else if (subType === 'measurement_cups') {
    const cupSets = [
      { total: 6, den: 2, cups: 12 },
      { total: 4, den: 2, cups: 8 },
      { total: 5, den: 2, cups: 10 },
      { total: 3, den: 4, cups: 12 },
      { total: 2, den: 4, cups: 8 },
      { total: 6, den: 3, cups: 18 }
    ];
    const cs = getRandomChoice(cupSets);
    const correctStr = `${cs.cups} cups`;
    const distractors = [`${cs.total / cs.den} cups`, `${cs.total} cups`, `${cs.cups / 2} cups`];
    const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
    return {
      id,
      skill: 'divide_reciprocals',
      type: 'mcq',
      question: `🥛 <strong>Measurement Model — How Many Fit In?</strong><br>If you have <strong>${cs.total} liters</strong> of milk and each drinking cup holds <strong>${formatFrac(1, cs.den)} liter</strong>, how many full cups can you fill? (${cs.total} ÷ ${formatFrac(1, cs.den)} = ?)`,
      options,
      correct,
      explanation: `🥛 <strong>Dividing by Fractions:</strong><br>${cs.total} ÷ ${formatFrac(1, cs.den)} = ${cs.total} × ${cs.den} = <strong>${cs.cups} cups</strong>!<br>Dividing by a fraction less than 1 produces a larger quotient!`,
      source: 'Thinkbook Measurement Model'
    };
  } else if (subType === 'keep_change_flip') {
    const pairs = [
      { n1: 4, d1: 5, n2: 8, d2: 15, ans: '1 1/2' },
      { n1: 3, d1: 7, n2: 6, d2: 7, ans: '1/2' },
      { n1: 2, d1: 3, n2: 4, d2: 9, ans: '1 1/2' },
      { n1: 5, d1: 6, n2: 5, d2: 12, ans: '2' },
      { n1: 3, d1: 8, n2: 9, d2: 16, ans: '2/3' }
    ];
    const p = getRandomChoice(pairs);
    const correctStr = p.ans;
    const distractors = ['8/15', '2/5', '3/4', '1/4'].filter(x => x !== p.ans).slice(0, 3);
    const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
    return {
      id,
      skill: 'divide_reciprocals',
      type: 'mcq',
      question: `🔄 <strong>Keep, Change, Flip Algorithm:</strong><br>Solve: <div style="font-size: 1.3rem; margin: 0.5rem 0;">${formatFrac(p.n1, p.d1)} ÷ ${formatFrac(p.n2, p.d2)} = ______</div>`,
      options,
      correct,
      explanation: `🔄 <strong>Keep, Change, Flip:</strong><br>1. <strong>Keep:</strong> ${formatFrac(p.n1, p.d1)}<br>2. <strong>Change:</strong> ÷ becomes ×<br>3. <strong>Flip:</strong> ${formatFrac(p.n2, p.d2)} becomes ${formatFrac(p.d2, p.n2)}<br>${formatFrac(p.n1, p.d1)} × ${formatFrac(p.d2, p.n2)} $\implies$ <strong>${p.ans}</strong>.`,
      source: 'CBSE Division'
    };
  } else {
    const tailorSets = [
      { fabric: 15, cutN: 3, cutD: 4, ans: 20 },
      { fabric: 12, cutN: 3, cutD: 4, ans: 16 },
      { fabric: 18, cutN: 3, cutD: 4, ans: 24 },
      { fabric: 21, cutN: 3, cutD: 4, ans: 28 },
      { fabric: 10, cutN: 1, cutD: 2, ans: 20 }
    ];
    const ts = getRandomChoice(tailorSets);
    const correctStr = `${ts.ans} aprons`;
    const distractors = [`${ts.fabric} aprons`, `${ts.ans - 4} aprons`, `${ts.ans + 4} aprons`];
    const { options, correct } = shuffleFracOptionsAndGetCorrect(correctStr, distractors);
    return {
      id,
      skill: 'divide_reciprocals',
      type: 'mcq',
      question: `✂️ <strong>Applied Word Problem — Tailor Masterji:</strong><br>A tailor has <strong>${ts.fabric} meters</strong> of fabric. If each child\'s apron requires <strong>${formatFrac(ts.cutN, ts.cutD)} meter</strong> of cloth, how many total aprons can he stitch?`,
      options,
      correct,
      explanation: `✂️ <strong>Tailor Division:</strong><br>Total aprons = ${ts.fabric} ÷ ${formatFrac(ts.cutN, ts.cutD)}.<br>Apply Keep, Change, Flip: ${ts.fabric} × ${formatFrac(ts.cutD, ts.cutN)} = <strong>${ts.ans} aprons</strong>!`,
      source: 'Worksheet 2026-27 (Tailor Problem)'
    };
  }
}

function generateFractionsPracticeQueue(filter = 'all', count = 30) {
  const queue = [];
  for (let i = 0; i < count; i++) {
    queue.push(generateDynamicFractionQuestion(filter));
  }
  return queue;
}

function generateDynamicFractionChallengePool(count = 10) {
  const pool = [];
  const skills = ['partition_basics', 'types_and_mixed', 'equivalent_simplest', 'comparison_ordering', 'add_sub_operations', 'multiply_of', 'divide_reciprocals'];
  for (let i = 0; i < count; i++) {
    const s = skills[i % skills.length];
    const q = generateDynamicFractionQuestion(s);
    pool.push({
      question: q.question,
      options: q.options,
      correct: q.correct,
      explanation: q.explanation
    });
  }
  return pool;
}

var PRACTICE_POOL_TOPIC_FRACTIONS = generateFractionsPracticeQueue('all', 30);
var CHALLENGE_QUESTIONS_TOPIC_FRACTIONS = generateDynamicFractionChallengePool(10);


/* ==========================================================================
   FRACTIONS MASTER VISUAL LEARN MODULES & MILESTONES
   ========================================================================== */

function updateFractionsMasteryStars() {
  if (state.currentTopic !== 'fractions_master') return;
  const cp = state.fractionsLearnCheckpoints || {};
  const cpKeys = ['checkpoint_frac_1', 'checkpoint_frac_2', 'checkpoint_frac_3', 'checkpoint_frac_4', 'checkpoint_frac_5', 'checkpoint_frac_6'];
  const cpCount = cpKeys.filter(k => cp[k]).length;
  const hasStar1 = cpCount >= 6;
  const hasStar2 = (state.fractionsPracticeSolvedCount || 0) >= 10;
  const hasStar3 = (state.fractionsChallengeHighScore || 0) >= 80;

  const totalStars = (hasStar1 ? 1 : 0) + (hasStar2 ? 1 : 0) + (hasStar3 ? 1 : 0);
  state.stars = totalStars;
  saveProgress();
  updateProgressUI();
}

function completeFractionsLearnCheckpoint(checkpointId, feedbackEl, boxEl) {
  state.fractionsLearnCheckpoints = state.fractionsLearnCheckpoints || {};
  const cpKeys = ['checkpoint_frac_1', 'checkpoint_frac_2', 'checkpoint_frac_3', 'checkpoint_frac_4', 'checkpoint_frac_5', 'checkpoint_frac_6'];
  const wasAllBefore = cpKeys.every(k => state.fractionsLearnCheckpoints[k]);

  state.fractionsLearnCheckpoints[checkpointId] = true;
  saveActiveState();
  updateFractionsMasteryStars();
  playCorrectSound();

  const isAllNow = cpKeys.every(k => state.fractionsLearnCheckpoints[k]);

  if (feedbackEl) {
    feedbackEl.className = 'checkpoint-feedback success';
    feedbackEl.innerHTML = `<strong>🎉 Checkpoint Cleared!</strong> You solved this correctly! ${isAllNow ? '🌟 <strong>All 6 Learn Checkpoints Complete! You earned Star 1 ⭐!</strong>' : 'Progress saved towards Star 1 ⭐.'}`;
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

function renderFractionsMilestoneBanner() {
  const cp = state.fractionsLearnCheckpoints || {};
  const cpKeys = ['checkpoint_frac_1', 'checkpoint_frac_2', 'checkpoint_frac_3', 'checkpoint_frac_4', 'checkpoint_frac_5', 'checkpoint_frac_6'];
  const cpCount = cpKeys.filter(k => cp[k]).length;
  const star1Done = cpCount >= 6;
  const solvedCount = state.fractionsPracticeSolvedCount || 0;
  const star2Done = solvedCount >= 10;
  const highScore = state.fractionsChallengeHighScore || 0;
  const star3Done = highScore >= 80;

  return `
    <div class="fractions-milestone-banner">
      <div class="milestone-title">🍕 Fractions Master — 3-Star Mastery Track</div>
      <div class="milestone-grid">
        <div class="milestone-card ${star1Done ? 'cleared' : ''}">
          <div class="m-star">${star1Done ? '⭐' : '☆'} Star 1: Visual Thinker</div>
          <div class="m-desc">Clear all 6 Learn Module Checkpoints</div>
          <div class="m-progress">${cpCount} / 6 Checkpoints Cleared</div>
        </div>
        <div class="milestone-card ${star2Done ? 'cleared' : ''}">
          <div class="m-star">${star2Done ? '⭐' : '☆'} Star 2: Calculation Ace</div>
          <div class="m-desc">Solve at least 10 Practice Questions</div>
          <div class="m-progress">${Math.min(solvedCount, 10)} / 10 Practice Solved</div>
        </div>
        <div class="milestone-card ${star3Done ? 'cleared' : ''}">
          <div class="m-star">${star3Done ? '⭐' : '☆'} Star 3: Speed Sprint Champ</div>
          <div class="m-desc">Score ≥ 80% on 60s Speed Challenge</div>
          <div class="m-progress">Best Challenge Score: ${highScore}%</div>
        </div>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   MODULE 1: EQUAL PARTITIONING, THE BROKEN PLATE & VISUAL SLICING
   -------------------------------------------------------------------------- */

function renderEqualSliceDetectiveModule(container) {
  let antWalked = 6;
  let bottleLevel = 500;

  function render() {
    const cp = state.fractionsLearnCheckpoints || {};
    const isCpCleared = !!cp.checkpoint_frac_1;
    const antSimp = simplifyFrac(antWalked, 24);

    container.innerHTML = `
      <div class="think-callout-math">
        <div class="callout-header">💡 Think About It — The Golden Law: Every Fraction Part MUST Be Equal!</div>
        <p>In mathematics, you cannot simply count the number of broken pieces. If a whole cake is sliced into 4 random uneven chunks and you eat one, <strong>you did NOT eat ¼</strong>! A fraction represents equal sharing — every single piece must have the exact same size!</p>
      </div>

      <!-- Case 1: Roy's Broken Plate vs Fair Cuts -->
      <div class="equal-slice-card" style="margin-top: 1.5rem;">
        <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem; font-size: 1.15rem;">
          🍽️ Case 1: Roy's Broken Plate vs The Fair Chef's Pizza
        </h4>
        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">
          Roy accidentally dropped a ceramic dinner plate, breaking it into 4 irregular jagged pieces. He told his sister: <em>"There are 4 pieces, so each piece is ¼ of the plate!"</em> Is Roy right?
        </p>

        <div class="plate-comparison-grid">
          <div class="plate-card flaw">
            <div class="plate-badge invalid">🚨 INVALID FRACTION</div>
            <svg class="plate-svg" width="130" height="130" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="72" fill="#1e293b" stroke="#ef4444" stroke-width="3" />
              <path d="M 80 8 L 82 50 L 50 80 L 10 90" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="2,2"/>
              <path d="M 82 50 L 130 55 L 152 75" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="2,2"/>
              <path d="M 50 80 L 85 115 L 80 152" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="2,2"/>
              <path d="M 85 115 L 140 120" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="2,2"/>
              <path d="M 80 8 A 72 72 0 0 0 10 90 L 50 80 L 82 50 Z" fill="rgba(239, 68, 68, 0.25)" />
            </svg>
            <strong>Roy's Broken Plate</strong>
            <p>4 irregular jagged pieces of different sizes. <strong>None can be called ¼</strong> because they are not equal!</p>
          </div>

          <div class="plate-card valid">
            <div class="plate-badge valid">✅ VALID FRACTION (¼ each)</div>
            <svg class="plate-svg" width="130" height="130" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="72" fill="#1e293b" stroke="#10b981" stroke-width="3" />
              <path d="M 80 80 L 80 8 A 72 72 0 0 1 152 80 Z" fill="rgba(16, 185, 129, 0.35)" />
              <line x1="80" y1="8" x2="80" y2="152" stroke="#10b981" stroke-width="2.5" />
              <line x1="8" y1="80" x2="152" y2="80" stroke="#10b981" stroke-width="2.5" />
            </svg>
            <strong>The Fair Chef's Pizza</strong>
            <p>Cut by 2 perpendicular lines into <strong>4 strictly identical 90° quadrants</strong>. Each piece is truly ¼!</p>
          </div>
        </div>
      </div>

      <!-- Case 2: The Wall of 24 Blocks -->
      <div class="equal-slice-card" style="margin-top: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
          <h4 style="color: var(--accent-amber-light); font-size: 1.15rem; margin: 0;">
            🐜 Case 2: The Ant on the 24-Block Wall
          </h4>
          <span style="font-size: 0.85rem; color: var(--text-muted);">
            Interactive Partitioning Explorer
          </span>
        </div>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
          An ant is crawling along a brick wall of <strong>24 identical bricks</strong>. Tap a button below to set how many bricks the ant walks, and see what fraction of the whole wall it covered!
        </p>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
          ${[3, 4, 6, 8, 12, 18].map(cnt => `
            <button class="btn ${antWalked === cnt ? 'btn-primary' : 'btn-ghost'}" data-ant-cnt="${cnt}" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">
              Walk ${cnt} Bricks
            </button>
          `).join('')}
        </div>

        <div class="ant-wall-grid">
          ${Array.from({ length: 24 }, (_, i) => {
            const bNum = i + 1;
            const isWalked = bNum <= antWalked;
            const isAntHere = bNum === antWalked;
            return `
              <div class="ant-brick ${isWalked ? 'walked' : ''}" data-brick-idx="${bNum}">
                ${bNum} ${isAntHere ? '🐜' : ''}
              </div>
            `;
          }).join('')}
        </div>

        <div class="ant-deduction-box">
          <div style="font-size: 1.05rem; font-weight: 700; color: #38bdf8;">
            Ant walked ${antWalked} out of 24 bricks:
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-top: 0.5rem; flex-wrap: wrap;">
            <div style="font-size: 1.3rem;">
              ${formatFrac(antWalked, 24)} = <strong>${formatFrac(antSimp.n, antSimp.d)}</strong>
            </div>
            <div style="color: var(--text-muted); font-size: 0.85rem;">
              (Divided top & bottom by HCF = ${gcd(antWalked, 24)})
            </div>
          </div>
          <p style="margin: 0.5rem 0 0 0; color: #cbd5e1; font-size: 0.85rem;">
            💡 <em>Think about it:</em> A group of ${antWalked} bricks fits exactly ${24 / antWalked} times into the 24-brick wall. Therefore, ${antWalked} bricks is exactly <strong>${formatFrac(antSimp.n, antSimp.d)}</strong> of the whole wall!
          </p>
        </div>
      </div>

      <!-- Case 3: Water Bottle Benchmark Visualizer -->
      <div class="equal-slice-card" style="margin-top: 1.5rem;">
        <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem; font-size: 1.15rem;">
          🧴 Case 3: Water Bottle Benchmark & The Midline Law
        </h4>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
          In CBSE Class 5, visual estimation starts with the <strong>Midline Rule</strong>: half-full (½ = 500 mL) is your anchor landmark. Test the water levels!
        </p>

        <div class="bottle-sim-wrap">
          <div class="bottle-container">
            <div class="bottle-neck"></div>
            <div class="bottle-body">
              <div class="bottle-midline-dash">
                <span class="bottle-midline-label">Midline (½ = 500 mL)</span>
              </div>
              <div class="bottle-water-fill" style="height: ${(bottleLevel / 1000) * 100}%;"></div>
            </div>
          </div>

          <div class="bottle-controls">
            <div style="display: flex; flex-direction: column; gap: 0.4rem;">
              ${[
                { ml: 0, frac: '0', label: 'Empty (0 mL)' },
                { ml: 250, frac: '¼', label: 'Quarter Full (250 mL)' },
                { ml: 500, frac: '½', label: 'Midline / Half Full (500 mL)' },
                { ml: 750, frac: '¾', label: 'Three-Quarters Full (750 mL)' },
                { ml: 1000, frac: '1', label: 'Completely Full (1000 mL)' }
              ].map(item => `
                <button class="btn ${bottleLevel === item.ml ? 'btn-primary' : 'btn-ghost'} btn-bottle-level" data-ml="${item.ml}" style="text-align: left; padding: 0.5rem 0.8rem; font-size: 0.85rem;">
                  <strong>${item.frac}</strong> — ${item.label}
                </button>
              `).join('')}
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); font-size: 0.85rem;">
              <strong>Current Fill Level:</strong> ${bottleLevel} mL / 1000 mL = <strong>${bottleLevel === 0 ? '0' : (bottleLevel === 1000 ? '1 Whole' : formatFracOrMixed(bottleLevel, 1000))}</strong>
              <div style="color: #38bdf8; margin-top: 0.25rem;">
                ${bottleLevel === 500 ? '⭐ Exactly at the midline landmark (½)!' : (bottleLevel < 500 ? '📉 Below midline: Less than half full.' : '📈 Above midline: More than half full.')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Checkpoint 1 -->
      <div class="checkpoint-box ${isCpCleared ? 'cleared' : ''}" id="cp-box-1" style="margin-top: 1.5rem;">
        <div class="checkpoint-header">
          <span class="checkpoint-badge ${isCpCleared ? 'cleared' : ''}">
            ${isCpCleared ? '✓ Checkpoint Cleared' : '🎯 Checkpoint 1: Visual Partition Test'}
          </span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Required for Star 1 ⭐</span>
        </div>
        <div class="checkpoint-prompt" style="margin: 0.75rem 0; font-size: 0.95rem; line-height: 1.45;">
          <strong>Diagnostic Question:</strong> A round pancake is sliced into 3 pieces: 1 big half and 2 small quarters. Sneha takes 1 small quarter and claims she ate ⅓ of the pancake because there are 3 total pieces. What is the correct deduction?
        </div>
        <div class="checkpoint-options" id="cp-opts-1">
          ${[
            { text: 'Sneha is incorrect. Because the pieces are not equal, her small slice is actually ¼ of the pancake, not ⅓!', isCorrect: true },
            { text: 'Sneha is correct because there were 3 total pieces on the plate.', isCorrect: false },
            { text: 'Sneha is correct because any piece can be called ⅓.', isCorrect: false }
          ].sort(() => Math.random() - 0.5).map((opt, i) => `
            <button class="option-btn cp-opt-btn" data-is-correct="${opt.isCorrect}">
              ${String.fromCharCode(65 + i)}) ${opt.text}
            </button>
          `).join('')}
        </div>
        <div class="checkpoint-feedback" id="cp-feedback-1" style="${isCpCleared ? 'display: block;' : 'display: none;'}">
          ${isCpCleared ? '<strong>🎉 Checkpoint Cleared!</strong> You mastered equal partitioning!' : ''}
        </div>
      </div>
    `;

    // Event listeners
    container.querySelectorAll('[data-ant-cnt]').forEach(b => {
      b.addEventListener('click', () => {
        playClickSound();
        antWalked = parseInt(b.getAttribute('data-ant-cnt'));
        render();
      });
    });

    container.querySelectorAll('.btn-bottle-level').forEach(b => {
      b.addEventListener('click', () => {
        playClickSound();
        bottleLevel = parseInt(b.getAttribute('data-ml'));
        render();
      });
    });

    container.querySelectorAll('#cp-opts-1 .cp-opt-btn').forEach(b => {
      b.addEventListener('click', () => {
        const isCorrect = b.getAttribute('data-is-correct') === 'true';
        const feedbackEl = container.querySelector('#cp-feedback-1');
        const boxEl = container.querySelector('#cp-box-1');
        if (isCorrect) {
          b.classList.add('correct');
          container.querySelectorAll('#cp-opts-1 .cp-opt-btn').forEach(btn => btn.disabled = true);
          completeFractionsLearnCheckpoint('checkpoint_frac_1', feedbackEl, boxEl);
        } else {
          b.classList.add('wrong');
          playWrongSound();
          if (feedbackEl) {
            feedbackEl.className = 'checkpoint-feedback wrong';
            feedbackEl.innerHTML = '<strong>❌ Not quite!</strong> Remember the Golden Law: A fraction only exists if all parts are EQUAL in size. Unequal pieces cannot be counted as ⅓!';
            feedbackEl.style.display = 'block';
          }
        }
      });
    });
  }

  render();
}

/* --------------------------------------------------------------------------
   MODULE 2: PROPER, IMPROPER & MIXED FRACTIONS & PIZZA PANS
   -------------------------------------------------------------------------- */

function renderProperImproperMixedModule(container) {
  let quartersCount = 11;
  let mixW = 2, mixN = 3, mixD = 4;
  let impN = 11, impD = 4;
  let cp2D = getRandomChoice([3, 4, 5, 6, 7]);
  let cp2W = getRandomInt(2, 5);
  let cp2Rem = getRandomInt(1, cp2D - 1);
  let cp2N = cp2W * cp2D + cp2Rem;

  function render() {
    const cp = state.fractionsLearnCheckpoints || {};
    const isCpCleared = !!cp.checkpoint_frac_2;

    const wholePans = Math.floor(quartersCount / 4);
    const remQuarters = quartersCount % 4;

    container.innerHTML = `
      <div class="think-callout-math">
        <div class="callout-header">💡 Think About It — The Grocery Secret: Why We Need Mixed Numbers!</div>
        <p>Imagine shopping at a grocery store. If your receipt says <em>"Sugar: 11/4 kg"</em>, you have to do mental division to know how many full 1 kg packets that is! But if it says <strong>2 ¾ kg</strong>, you instantly know: <strong>2 full 1 kg bags plus ¾ of a bag</strong>! Mixed numbers translate top-heavy fractions into real-world units!</p>
      </div>

      <!-- 3 Types Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
        <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; padding: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: #38bdf8; font-size: 1.1rem;">1. Proper Fraction</strong>
            <span style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; padding: 0.2rem 0.5rem; border-radius: 6px; font-size: 0.75rem;">Value &lt; 1</span>
          </div>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0.5rem 0 0.75rem 0;">
            Numerator is strictly LESS than Denominator (${formatFrac('N', 'D')}, N &lt; D). Less than one whole!
          </p>
          <div style="font-size: 1.2rem; background: rgba(15, 23, 42, 0.6); padding: 0.5rem; border-radius: 8px; text-align: center;">
            ${formatFrac(3, 4)} &nbsp; • &nbsp; ${formatFrac(5, 8)} &nbsp; • &nbsp; ${formatFrac(2, 5)}
          </div>
        </div>

        <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(251, 146, 60, 0.3); border-radius: 12px; padding: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: #fb923c; font-size: 1.1rem;">2. Improper Fraction</strong>
            <span style="background: rgba(251, 146, 60, 0.2); color: #fb923c; padding: 0.2rem 0.5rem; border-radius: 6px; font-size: 0.75rem;">Value ≥ 1</span>
          </div>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0.5rem 0 0.75rem 0;">
            Numerator is GREATER than or equal to Denominator (${formatFrac('N', 'D')}, N ≥ D). Top-heavy!
          </p>
          <div style="font-size: 1.2rem; background: rgba(15, 23, 42, 0.6); padding: 0.5rem; border-radius: 8px; text-align: center;">
            ${formatFrac(11, 4)} &nbsp; • &nbsp; ${formatFrac(9, 5)} &nbsp; • &nbsp; ${formatFrac(7, 2)}
          </div>
        </div>

        <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(52, 211, 153, 0.3); border-radius: 12px; padding: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: #34d399; font-size: 1.1rem;">3. Mixed Number</strong>
            <span style="background: rgba(52, 211, 153, 0.2); color: #34d399; padding: 0.2rem 0.5rem; border-radius: 6px; font-size: 0.75rem;">Whole + Proper</span>
          </div>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0.5rem 0 0.75rem 0;">
            A combination of a whole number and a proper fraction. Human-friendly quantity!
          </p>
          <div style="font-size: 1.2rem; background: rgba(15, 23, 42, 0.6); padding: 0.5rem; border-radius: 8px; text-align: center;">
            ${formatMixed(2, 3, 4)} &nbsp; • &nbsp; ${formatMixed(1, 4, 5)} &nbsp; • &nbsp; ${formatMixed(3, 1, 2)}
          </div>
        </div>
      </div>

      <!-- Pizza Pans Visualizer -->
      <div class="pizza-pans-card" style="margin-top: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <h4 style="color: var(--accent-amber-light); font-size: 1.15rem; margin: 0;">
            🍕 The Pizza Pan Visualizer: See Improper as Whole Pans + Slices!
          </h4>
          <span style="font-size: 0.85rem; color: var(--text-muted);">
            Each pan holds 4 quarter slices
          </span>
        </div>

        <div style="margin: 1rem 0; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <label style="font-weight: 600; font-size: 0.95rem;">Select Number of Quarter Slices (¼):</label>
          <input type="range" id="slider-quarters" min="1" max="16" value="${quartersCount}" style="flex: 1; min-width: 160px; accent-color: #f59e0b;" />
          <span style="font-size: 1.2rem; font-weight: 800; color: #f59e0b; min-width: 60px;">
            ${quartersCount} slices (${formatFrac(quartersCount, 4)})
          </span>
        </div>

        <div class="pizza-pans-grid">
          ${Array.from({ length: 4 }, (_, pIdx) => {
            const panNum = pIdx + 1;
            const panStartSlice = pIdx * 4;
            const slicesInThisPan = Math.max(0, Math.min(4, quartersCount - panStartSlice));

            // Generate 4 quadrant wedges in SVG
            const wedges = [
              { d: 'M 50 50 L 50 6 A 44 44 0 0 1 94 50 Z', active: slicesInThisPan >= 1 }, // top-right
              { d: 'M 50 50 L 94 50 A 44 44 0 0 1 50 94 Z', active: slicesInThisPan >= 2 }, // bottom-right
              { d: 'M 50 50 L 50 94 A 44 44 0 0 1 6 50 Z', active: slicesInThisPan >= 3 },  // bottom-left
              { d: 'M 50 50 L 6 50 A 44 44 0 0 1 50 6 Z', active: slicesInThisPan >= 4 }    // top-left
            ];

            return `
              <div class="pizza-pan-item ${slicesInThisPan === 4 ? 'full' : (slicesInThisPan > 0 ? 'partial' : 'empty')}">
                <div class="pan-title">Pan #${panNum} (${slicesInThisPan}/4)</div>
                <svg class="pizza-pan-svg" width="76" height="76" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="#1e293b" stroke="#475569" stroke-width="2"/>
                  ${wedges.map(w => `
                    <path d="${w.d}" fill="${w.active ? '#f59e0b' : 'rgba(71, 85, 105, 0.2)'}" stroke="#0f172a" stroke-width="1.5" />
                  `).join('')}
                </svg>
                <div class="pan-label">
                  ${slicesInThisPan === 4 ? '⭐ 1 Whole Pan' : (slicesInThisPan > 0 ? `🍕 ${slicesInThisPan}/4 Pan` : '⚪ Empty')}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="converter-summary-box">
          <div style="font-size: 1.15rem; font-weight: 700; color: #38bdf8;">
            Mathematical Conversion Step:
          </div>
          <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem; flex-wrap: wrap;">
            <div style="font-size: 1.4rem;">
              Improper: <strong>${formatFrac(quartersCount, 4)}</strong>
            </div>
            <div style="font-size: 1.4rem; color: #f59e0b;">➔</div>
            <div style="font-size: 1.4rem;">
              ${quartersCount} ÷ 4 = <strong>${wholePans}</strong> with remainder <strong>${remQuarters}</strong>
            </div>
            <div style="font-size: 1.4rem; color: #34d399;">➔</div>
            <div style="font-size: 1.4rem;">
              Mixed: <strong>${formatMixed(wholePans, remQuarters, 4)}</strong>
            </div>
          </div>
          <p style="margin: 0.5rem 0 0 0; color: var(--text-muted); font-size: 0.85rem;">
            Notice: Denominator 4 never changes! The quotient (${wholePans}) becomes the whole number of pans, and the remainder (${remQuarters}) is the leftover slices on the next pan!
          </p>
        </div>
      </div>

      <!-- Two-Way Live Converter Machine -->
      <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem; margin-top: 1.5rem;">
        <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem; font-size: 1.15rem;">
          ⚡ The Two-Way Live Conversion Calculator
        </h4>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
          <!-- Converter 1: Mixed to Improper -->
          <div style="background: rgba(15, 23, 42, 0.6); padding: 1rem; border-radius: 10px;">
            <strong style="color: #38bdf8;">A) Mixed ➔ Improper (${formatMixed('W', 'N', 'D')} ➔ ${formatFrac('?', 'D')})</strong>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0.25rem 0 0.75rem 0;">
              Formula: (Whole × Denom) + Numerator over Denominator
            </p>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <input type="number" id="in-mix-w" value="${mixW}" min="1" max="12" style="width: 50px; padding: 0.3rem; border-radius: 6px; text-align: center;" />
              <span style="font-size: 1.2rem;">&</span>
              <input type="number" id="in-mix-n" value="${mixN}" min="1" max="11" style="width: 50px; padding: 0.3rem; border-radius: 6px; text-align: center;" />
              <span style="font-size: 1.2rem;">/</span>
              <input type="number" id="in-mix-d" value="${mixD}" min="2" max="12" style="width: 50px; padding: 0.3rem; border-radius: 6px; text-align: center;" />
            </div>
            <div style="margin-top: 0.75rem; font-size: 1.1rem; color: #34d399;">
              = (${mixW} × ${mixD} + ${mixN}) / ${mixD} = <strong>${formatFrac(mixW * mixD + mixN, mixD)}</strong>
            </div>
          </div>

          <!-- Converter 2: Improper to Mixed -->
          <div style="background: rgba(15, 23, 42, 0.6); padding: 1rem; border-radius: 10px;">
            <strong style="color: #fb923c;">B) Improper ➔ Mixed (${formatFrac('N', 'D')} ➔ ${formatMixed('W', 'R', 'D')})</strong>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0.25rem 0 0.75rem 0;">
              Formula: Divide Numerator by Denominator. Q = Whole, R = Numerator
            </p>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <input type="number" id="in-imp-n" value="${impN}" min="2" max="99" style="width: 60px; padding: 0.3rem; border-radius: 6px; text-align: center;" />
              <span style="font-size: 1.2rem;">/</span>
              <input type="number" id="in-imp-d" value="${impD}" min="2" max="20" style="width: 60px; padding: 0.3rem; border-radius: 6px; text-align: center;" />
            </div>
            <div style="margin-top: 0.75rem; font-size: 1.1rem; color: #34d399;">
              = ${impN} ÷ ${impD} = ${Math.floor(impN / impD)} R ${impN % impD} = <strong>${formatMixed(Math.floor(impN / impD), impN % impD, impD)}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Checkpoint 2 -->
      <div class="checkpoint-box ${isCpCleared ? 'cleared' : ''}" id="cp-box-2" style="margin-top: 1.5rem;">
        <div class="checkpoint-header">
          <span class="checkpoint-badge ${isCpCleared ? 'cleared' : ''}">
            ${isCpCleared ? '✓ Checkpoint Cleared' : '🎯 Checkpoint 2: Mixed Conversion Test'}
          </span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Required for Star 1 ⭐</span>
        </div>
        <div class="checkpoint-prompt" style="margin: 0.75rem 0; font-size: 0.95rem; line-height: 1.45;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <span><strong>Diagnostic Question:</strong> Convert the improper fraction <strong>${formatFrac(cp2N, cp2D)}</strong> into a mixed number:</span>
            <button class="btn btn-secondary btn-sm" id="btn-roll-cp-frac-2" style="font-size: 0.78rem; padding: 4px 10px; min-height: 32px;">🎲 New Problem</button>
          </div>
        </div>
        <div class="checkpoint-options" id="cp-opts-2">
          ${[
            { text: `${cp2W} ${cp2Rem}/${cp2D} (${cp2N} ÷ ${cp2D} = ${cp2W} with remainder ${cp2Rem})`, isCorrect: true },
            { text: `${cp2W} ${cp2D}/${cp2Rem} (accidental flip of remainder and denominator)`, isCorrect: false },
            { text: `${cp2W + 1} 1/${cp2D} (overestimated whole number)`, isCorrect: false },
            { text: `${cp2Rem} ${cp2W}/${cp2D} (confusing quotient with remainder)`, isCorrect: false }
          ].sort(() => Math.random() - 0.5).map((opt, i) => `
            <button class="option-btn cp-opt-btn" data-is-correct="${opt.isCorrect}">
              ${String.fromCharCode(65 + i)}) ${opt.text}
            </button>
          `).join('')}
        </div>
        <div class="checkpoint-feedback" id="cp-feedback-2" style="${isCpCleared ? 'display: block;' : 'display: none;'}">
          ${isCpCleared ? '<strong>🎉 Checkpoint Cleared!</strong> You mastered mixed and improper conversions!' : ''}
        </div>
      </div>
    `;

    // Listeners
    container.querySelector('#slider-quarters')?.addEventListener('input', (e) => {
      quartersCount = parseInt(e.target.value);
      render();
    });

    container.querySelector('#in-mix-w')?.addEventListener('input', (e) => {
      mixW = Math.max(1, parseInt(e.target.value) || 1);
      render();
    });
    container.querySelector('#in-mix-n')?.addEventListener('input', (e) => {
      mixN = Math.max(1, parseInt(e.target.value) || 1);
      render();
    });
    container.querySelector('#in-mix-d')?.addEventListener('input', (e) => {
      mixD = Math.max(2, parseInt(e.target.value) || 2);
      render();
    });

    container.querySelector('#in-imp-n')?.addEventListener('input', (e) => {
      impN = Math.max(2, parseInt(e.target.value) || 2);
      render();
    });
    container.querySelector('#in-imp-d')?.addEventListener('input', (e) => {
      impD = Math.max(2, parseInt(e.target.value) || 2);
      render();
    });

    // Checkpoint 2 New Problem button
    container.querySelector('#btn-roll-cp-frac-2')?.addEventListener('click', () => {
      playClickSound();
      cp2D = getRandomChoice([3, 4, 5, 6, 7]);
      cp2W = getRandomInt(2, 5);
      cp2Rem = getRandomInt(1, cp2D - 1);
      cp2N = cp2W * cp2D + cp2Rem;
      render();
    });

    container.querySelectorAll('#cp-opts-2 .cp-opt-btn').forEach(b => {
      b.addEventListener('click', () => {
        const isCorrect = b.getAttribute('data-is-correct') === 'true';
        const feedbackEl = container.querySelector('#cp-feedback-2');
        const boxEl = container.querySelector('#cp-box-2');
        if (isCorrect) {
          b.classList.add('correct');
          container.querySelectorAll('#cp-opts-2 .cp-opt-btn').forEach(btn => btn.disabled = true);
          completeFractionsLearnCheckpoint('checkpoint_frac_2', feedbackEl, boxEl);
        } else {
          b.classList.add('wrong');
          playWrongSound();
          if (feedbackEl) {
            feedbackEl.className = 'checkpoint-feedback wrong';
            feedbackEl.innerHTML = `<strong>❌ Not quite!</strong> Divide ${cp2N} by ${cp2D}: ${cp2N} ÷ ${cp2D} = <strong>${cp2W}</strong> with remainder <strong>${cp2Rem}</strong>. The denominator remains ${cp2D}, giving <strong>${cp2W} ${cp2Rem}/${cp2D}</strong>!`;
            feedbackEl.style.display = 'block';
          }
        }
      });
    });
  }

  render();
}

/* --------------------------------------------------------------------------
   MODULE 3: EQUIVALENT FRACTIONS, SIMPLEST FORM & "NO-PEN" SHORTCUTS
   -------------------------------------------------------------------------- */

function renderEquivalentComparisonModule(container) {
  let bA = 3, bB = 7, bC = 4, bD = 9;
  let cp3Num = getRandomChoice([3, 4, 5, 7]);
  let cp3D1 = getRandomChoice([5, 6, 7, 8]);
  let cp3D2 = cp3D1 + getRandomChoice([3, 4, 5]);

  function render() {
    const cp = state.fractionsLearnCheckpoints || {};
    const isCpCleared = !!cp.checkpoint_frac_3;

    const wingLeft = bA * bD;
    const wingRight = bB * bC;
    const isGreater = wingLeft > wingRight;
    const isEqual = wingLeft === wingRight;

    container.innerHTML = `
      <div class="think-callout-math">
        <div class="callout-header">💡 Think About It — Scaling Fractions: The Equal Multiplier Law</div>
        <p>A fraction is a ratio. If you double the number of slices on a pizza and double the slices you eat, <strong>you eat the exact same amount of pizza</strong>! The Golden Rule of Equivalence: <em>Whatever you multiply or divide the numerator by, you MUST do the exact same to the denominator!</em></p>
      </div>

      <!-- Equivalence Strips Visualizer -->
      <div class="equal-slice-card" style="margin-top: 1.5rem;">
        <h4 style="color: var(--accent-amber-light); font-size: 1.15rem; margin-bottom: 0.5rem;">
          📏 The Equivalence Wall: Stacked Fraction Strips
        </h4>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1rem;">
          Notice how the cuts align perfectly along vertical guidelines! 1/2 = 2/4 = 3/6 = 4/8 = 6/12!
        </p>

        <div class="equiv-strips-wall">
          <div class="equiv-row">
            <span class="strip-label">1 Whole</span>
            <div class="strip-bar"><div class="strip-seg whole" style="width: 100%;">1</div></div>
          </div>
          <div class="equiv-row">
            <span class="strip-label">½</span>
            <div class="strip-bar">
              <div class="strip-seg half" style="width: 50%;">½</div>
              <div class="strip-seg half" style="width: 50%;">½</div>
            </div>
          </div>
          <div class="equiv-row">
            <span class="strip-label">¼</span>
            <div class="strip-bar">
              <div class="strip-seg quarter" style="width: 25%;">¼</div>
              <div class="strip-seg quarter" style="width: 25%;">¼</div>
              <div class="strip-seg quarter" style="width: 25%;">¼</div>
              <div class="strip-seg quarter" style="width: 25%;">¼</div>
            </div>
          </div>
          <div class="equiv-row">
            <span class="strip-label">⅛</span>
            <div class="strip-bar">
              ${Array.from({ length: 8 }, () => `<div class="strip-seg eighth" style="width: 12.5%;">⅛</div>`).join('')}
            </div>
          </div>
          <div class="equiv-row">
            <span class="strip-label">1/12</span>
            <div class="strip-bar">
              ${Array.from({ length: 12 }, () => `<div class="strip-seg twelfth" style="width: 8.33%;">1/12</div>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- 3 "No-Pen" Comparison Shortcuts -->
      <div style="margin-top: 1.5rem;">
        <h4 style="color: var(--accent-amber-light); font-size: 1.15rem; margin-bottom: 0.75rem;">
          ⚡ 3 "No-Pen" Deductive Comparison Shortcuts (Solve in 1 Second!)
        </h4>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
          <div style="background: rgba(30, 41, 59, 0.4); border-left: 4px solid #38bdf8; border-radius: 8px; padding: 1rem;">
            <strong style="color: #38bdf8;">1. Same Denominators (Like Fractions)</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.4rem 0;">
              Every slice is the exact same size. <strong>Larger numerator wins!</strong>
            </p>
            <div style="font-size: 1.15rem; color: #34d399; font-weight: 700;">
              ${formatFrac(7, 11)} &gt; ${formatFrac(4, 11)}
            </div>
          </div>

          <div style="background: rgba(30, 41, 59, 0.4); border-left: 4px solid #fb923c; border-radius: 8px; padding: 1rem;">
            <strong style="color: #fb923c;">2. Same Numerators (Mindset Flip!)</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.4rem 0;">
              You have the same slice count. But smaller denominator gives <strong>larger slices</strong>!
            </p>
            <div style="font-size: 1.15rem; color: #34d399; font-weight: 700;">
              ${formatFrac(3, 5)} &gt; ${formatFrac(3, 8)}
            </div>
          </div>

          <div style="background: rgba(30, 41, 59, 0.4); border-left: 4px solid #a855f7; border-radius: 8px; padding: 1rem;">
            <strong style="color: #a855f7;">3. Mixed Whole Priority</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.4rem 0;">
              Check the whole number first! 4 whole pizzas is always more than 3!
            </p>
            <div style="font-size: 1.15rem; color: #34d399; font-weight: 700;">
              ${formatMixed(4, 1, 7)} &gt; ${formatMixed(3, 6, 7)}
            </div>
          </div>
        </div>
      </div>

      <!-- Butterfly Cross-Multiplication Tool -->
      <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem; margin-top: 1.5rem;">
        <h4 style="color: var(--accent-amber-light); font-size: 1.15rem; margin-bottom: 0.5rem;">
          🦋 The Butterfly Cross-Multiplication Calculator (${formatFrac('a', 'b')} vs ${formatFrac('c', 'd')})
        </h4>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1rem;">
          For any two unlike fractions: Cross-multiply the diagonals! Left Wing = a × d, Right Wing = b × c!
        </p>

        <div style="display: flex; gap: 1.5rem; align-items: center; justify-content: center; flex-wrap: wrap;">
          <!-- Frac 1 -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.25rem;">
            <input type="number" id="in-bf-a" value="${bA}" min="1" max="15" style="width: 50px; text-align: center; padding: 0.3rem;" />
            <div style="width: 50px; height: 2px; background: #fff;"></div>
            <input type="number" id="in-bf-b" value="${bB}" min="1" max="20" style="width: 50px; text-align: center; padding: 0.3rem;" />
          </div>

          <div style="font-size: 1.5rem; font-weight: 800; color: #f59e0b;">
            ${isEqual ? '=' : (isGreater ? '&gt;' : '&lt;')}
          </div>

          <!-- Frac 2 -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.25rem;">
            <input type="number" id="in-bf-c" value="${bC}" min="1" max="15" style="width: 50px; text-align: center; padding: 0.3rem;" />
            <div style="width: 50px; height: 2px; background: #fff;"></div>
            <input type="number" id="in-bf-d" value="${bD}" min="1" max="20" style="width: 50px; text-align: center; padding: 0.3rem;" />
          </div>
        </div>

        <div style="margin-top: 1rem; text-align: center; font-size: 1.1rem; color: #38bdf8;">
          Left Wing: ${bA} × ${bD} = <strong>${wingLeft}</strong> &nbsp; | &nbsp; Right Wing: ${bB} × ${bC} = <strong>${wingRight}</strong>
          <div style="color: #34d399; font-weight: 700; margin-top: 0.25rem;">
            Since ${wingLeft} ${isEqual ? '=' : (isGreater ? '&gt;' : '&lt;')} ${wingRight}, ${formatFrac(bA, bB)} is ${isEqual ? 'equal to' : (isGreater ? 'GREATER than' : 'LESS than')} ${formatFrac(bC, bD)}!
          </div>
        </div>
      </div>

      <!-- Checkpoint 3 -->
      <div class="checkpoint-box ${isCpCleared ? 'cleared' : ''}" id="cp-box-3" style="margin-top: 1.5rem;">
        <div class="checkpoint-header">
          <span class="checkpoint-badge ${isCpCleared ? 'cleared' : ''}">
            ${isCpCleared ? '✓ Checkpoint Cleared' : '🎯 Checkpoint 3: Deductive Comparison'}
          </span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Required for Star 1 ⭐</span>
        </div>
        <div class="checkpoint-prompt" style="margin: 0.75rem 0; font-size: 0.95rem; line-height: 1.45;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <span><strong>Diagnostic Question:</strong> Which fraction is greater: <strong>${formatFrac(cp3Num, cp3D1)}</strong> or <strong>${formatFrac(cp3Num, cp3D2)}</strong>, and what is the fastest "No-Pen" deductive reason?</span>
            <button class="btn btn-secondary btn-sm" id="btn-roll-cp-frac-3" style="font-size: 0.78rem; padding: 4px 10px; min-height: 32px;">🎲 New Problem</button>
          </div>
        </div>
        <div class="checkpoint-options" id="cp-opts-3">
          ${[
            { text: `${cp3Num}/${cp3D1} is greater, because when numerators are equal, a smaller denominator means each slice is larger!`, isCorrect: true },
            { text: `${cp3Num}/${cp3D2} is greater, because ${cp3D2} is a larger number than ${cp3D1}.`, isCorrect: false },
            { text: `Both fractions are equal because both have ${cp3Num} as numerator.`, isCorrect: false }
          ].sort(() => Math.random() - 0.5).map((opt, i) => `
            <button class="option-btn cp-opt-btn" data-is-correct="${opt.isCorrect}">
              ${String.fromCharCode(65 + i)}) ${opt.text}
            </button>
          `).join('')}
        </div>
        <div class="checkpoint-feedback" id="cp-feedback-3" style="${isCpCleared ? 'display: block;' : 'display: none;'}">
          ${isCpCleared ? '<strong>🎉 Checkpoint Cleared!</strong> You mastered equivalence and comparison shortcuts!' : ''}
        </div>
      </div>
    `;

    // Listeners
    container.querySelector('#in-bf-a')?.addEventListener('input', e => { bA = parseInt(e.target.value) || 1; render(); });
    container.querySelector('#in-bf-b')?.addEventListener('input', e => { bB = parseInt(e.target.value) || 1; render(); });
    container.querySelector('#in-bf-c')?.addEventListener('input', e => { bC = parseInt(e.target.value) || 1; render(); });
    container.querySelector('#in-bf-d')?.addEventListener('input', e => { bD = parseInt(e.target.value) || 1; render(); });

    // Checkpoint 3 New Problem button
    container.querySelector('#btn-roll-cp-frac-3')?.addEventListener('click', () => {
      playClickSound();
      cp3Num = getRandomChoice([3, 4, 5, 7]);
      cp3D1 = getRandomChoice([5, 6, 7, 8]);
      cp3D2 = cp3D1 + getRandomChoice([3, 4, 5]);
      render();
    });

    container.querySelectorAll('#cp-opts-3 .cp-opt-btn').forEach(b => {
      b.addEventListener('click', () => {
        const isCorrect = b.getAttribute('data-is-correct') === 'true';
        const feedbackEl = container.querySelector('#cp-feedback-3');
        const boxEl = container.querySelector('#cp-box-3');
        if (isCorrect) {
          b.classList.add('correct');
          container.querySelectorAll('#cp-opts-3 .cp-opt-btn').forEach(btn => btn.disabled = true);
          completeFractionsLearnCheckpoint('checkpoint_frac_3', feedbackEl, boxEl);
        } else {
          b.classList.add('wrong');
          playWrongSound();
          if (feedbackEl) {
            feedbackEl.className = 'checkpoint-feedback wrong';
            feedbackEl.innerHTML = `<strong>❌ Not quite!</strong> When numerators are equal, smaller denominator means LARGER slices! Slicing into ${cp3D1} parts yields much bigger slices than slicing into ${cp3D2} parts!`;
            feedbackEl.style.display = 'block';
          }
        }
      });
    });
  }

  render();
}

/* --------------------------------------------------------------------------
   MODULE 4: ADDITION & SUBTRACTION LAB & THE DENOMINATOR TRAP
   -------------------------------------------------------------------------- */

function renderAddSubtractLabModule(container) {
  let opA = 2, opB = 3, opC = 1, opD = 4;
  let opType = '+';
  const cp4Pool = [
    { a: 5, b: 6, c: 1, d: 4, lcm: 12, ansN: 7, ansD: 12 },
    { a: 3, b: 4, c: 2, d: 5, lcm: 20, ansN: 7, ansD: 20 },
    { a: 7, b: 8, c: 1, d: 3, lcm: 24, ansN: 13, ansD: 24 },
    { a: 4, b: 5, c: 1, d: 2, lcm: 10, ansN: 3, ansD: 10 },
    { a: 2, b: 3, c: 1, d: 4, lcm: 12, ansN: 5, ansD: 12 },
    { a: 5, b: 8, c: 1, d: 6, lcm: 24, ansN: 11, ansD: 24 }
  ];
  let cp4Prob = getRandomChoice(cp4Pool);

  function render() {
    const cp = state.fractionsLearnCheckpoints || {};
    const isCpCleared = !!cp.checkpoint_frac_4;

    const commonD = lcm(opB, opD);
    const scaled1 = opA * (commonD / opB);
    const scaled2 = opC * (commonD / opD);
    const resultN = opType === '+' ? scaled1 + scaled2 : scaled1 - scaled2;
    const simp = simplifyFrac(resultN, commonD);

    const s1 = (cp4Prob.a * cp4Prob.lcm) / cp4Prob.b;
    const s2 = (cp4Prob.c * cp4Prob.lcm) / cp4Prob.d;
    const cp4Correct = `${cp4Prob.ansN}/${cp4Prob.ansD} (LCM(${cp4Prob.b}, ${cp4Prob.d}) = ${cp4Prob.lcm}, so ${s1}/${cp4Prob.lcm} − ${s2}/${cp4Prob.lcm} = ${cp4Prob.ansN}/${cp4Prob.ansD})`;
    const cp4Choices = [
      { text: cp4Correct, isCorrect: true },
      { text: `${Math.abs(cp4Prob.a - cp4Prob.c)}/${Math.abs(cp4Prob.b - cp4Prob.d) || 2} (subtracting top and bottom directly)`, isCorrect: false },
      { text: `${cp4Prob.ansN - 2}/${cp4Prob.ansD}`, isCorrect: false }
    ].sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <div class="think-callout-math">
        <div class="callout-header">💡 Think About It — Rahul's Denominator Trap: Why Denominators NEVER Add!</div>
        <p>Rahul has 2/7 of a cake. His sister gives him 3/7 more. Rahul writes: <em>2/7 + 3/7 = 5/14</em>. 🚨 <strong>DISASTER!</strong> The denominator 7 is the NAME of the slice size ("sevenths"). If you have 2 sevenths and add 3 sevenths, you have <strong>5 sevenths (5/7)</strong>! The cake did NOT magically slice itself into 14 tiny pieces!</p>
      </div>

      <!-- Ram's Truth Detective -->
      <div style="background: rgba(30, 41, 59, 0.4); border-left: 4px solid #10b981; border-radius: 8px; padding: 1.25rem; margin-top: 1.5rem;">
        <h4 style="color: #34d399; font-size: 1.15rem; margin-bottom: 0.5rem;">
          🕵️ Ram's Truth Detective: Is ⅓ + ¾ Greater or Less Than 1? (No Pen Needed!)
        </h4>
        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin: 0.5rem 0;">
          Ram looks at <strong>⅓ + ¾</strong> and immediately declares: <em>"The sum is definitely GREATER than 1!"</em> How did he know in 0.5 seconds?
        </p>
        <div style="background: rgba(15, 23, 42, 0.6); padding: 0.85rem; border-radius: 8px; font-size: 0.9rem;">
          • Look at ¾: How much does it need to make 1 whole? <strong>Only ¼!</strong><br>
          • Now look at the other fraction: ⅓. Since 3 &lt; 4, <strong>⅓ is larger than ¼</strong>!<br>
          • Since ⅓ gives more than the needed ¼, the sum MUST be &gt; 1!<br>
          <span style="color: #38bdf8; font-weight: 700; margin-top: 0.25rem; display: inline-block;">
            Exact check: 4/12 + 9/12 = 13/12 = 1 1/12 &gt; 1! Ram was right!
          </span>
        </div>
      </div>

      <!-- Interactive LCM Fraction Adder/Subtractor -->
      <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem; margin-top: 1.5rem;">
        <h4 style="color: var(--accent-amber-light); font-size: 1.15rem; margin-bottom: 0.5rem;">
          🔨 The 4-Step Unlike Fraction Hammer: Step-by-Step Explorer
        </h4>

        <div style="display: flex; gap: 1rem; align-items: center; justify-content: center; flex-wrap: wrap; margin: 1rem 0;">
          <!-- Frac 1 -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.25rem;">
            <input type="number" id="in-op-a" value="${opA}" min="1" max="15" style="width: 50px; text-align: center; padding: 0.3rem;" />
            <div style="width: 50px; height: 2px; background: #fff;"></div>
            <input type="number" id="in-op-b" value="${opB}" min="2" max="15" style="width: 50px; text-align: center; padding: 0.3rem;" />
          </div>

          <!-- Op Toggle -->
          <button class="btn btn-secondary" id="btn-toggle-op" style="font-size: 1.3rem; padding: 0.4rem 0.8rem;">
            ${opType}
          </button>

          <!-- Frac 2 -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.25rem;">
            <input type="number" id="in-op-c" value="${opC}" min="1" max="15" style="width: 50px; text-align: center; padding: 0.3rem;" />
            <div style="width: 50px; height: 2px; background: #fff;"></div>
            <input type="number" id="in-op-d" value="${opD}" min="2" max="15" style="width: 50px; text-align: center; padding: 0.3rem;" />
          </div>
        </div>

        <div style="background: rgba(15, 23, 42, 0.6); padding: 1rem; border-radius: 8px; font-size: 0.95rem; line-height: 1.6;">
          <strong>Step 1 (Find LCM):</strong> LCM(${opB}, ${opD}) = <strong>${commonD}</strong><br>
          <strong>Step 2 (Scale):</strong> ${formatFrac(opA, opB)} = ${formatFrac(scaled1, commonD)} &nbsp; and &nbsp; ${formatFrac(opC, opD)} = ${formatFrac(scaled2, commonD)}<br>
          <strong>Step 3 (${opType === '+' ? 'Add' : 'Subtract'} Numerators):</strong> ${formatFrac(`${scaled1} ${opType} ${scaled2}`, commonD)} = ${formatFrac(resultN, commonD)}<br>
          <strong>Step 4 (Lowest Terms / Mixed):</strong> <strong>${formatFracOrMixed(resultN, commonD)}</strong>
        </div>
      </div>

      <!-- Checkpoint 4 -->
      <div class="checkpoint-box ${isCpCleared ? 'cleared' : ''}" id="cp-box-4" style="margin-top: 1.5rem;">
        <div class="checkpoint-header">
          <span class="checkpoint-badge ${isCpCleared ? 'cleared' : ''}">
            ${isCpCleared ? '✓ Checkpoint Cleared' : '🎯 Checkpoint 4: Unlike Subtraction'}
          </span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Required for Star 1 ⭐</span>
        </div>
        <div class="checkpoint-prompt" style="margin: 0.75rem 0; font-size: 0.95rem; line-height: 1.45;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <span><strong>Diagnostic Question:</strong> Calculate <strong>${formatFrac(cp4Prob.a, cp4Prob.b)} − ${formatFrac(cp4Prob.c, cp4Prob.d)}</strong> in simplest form:</span>
            <button class="btn btn-secondary btn-sm" id="btn-roll-cp-frac-4" style="font-size: 0.78rem; padding: 4px 10px; min-height: 32px;">🎲 New Problem</button>
          </div>
        </div>
        <div class="checkpoint-options" id="cp-opts-4">
          ${cp4Choices.map((opt, i) => `
            <button class="option-btn cp-opt-btn" data-is-correct="${opt.isCorrect}">
              ${String.fromCharCode(65 + i)}) ${opt.text}
            </button>
          `).join('')}
        </div>
        <div class="checkpoint-feedback" id="cp-feedback-4" style="${isCpCleared ? 'display: block;' : 'display: none;'}">
          ${isCpCleared ? '<strong>🎉 Checkpoint Cleared!</strong> You mastered like & unlike fraction addition/subtraction!' : ''}
        </div>
      </div>
    `;

    // Listeners
    container.querySelector('#in-op-a')?.addEventListener('input', e => { opA = parseInt(e.target.value) || 1; render(); });
    container.querySelector('#in-op-b')?.addEventListener('input', e => { opB = parseInt(e.target.value) || 1; render(); });
    container.querySelector('#in-op-c')?.addEventListener('input', e => { opC = parseInt(e.target.value) || 1; render(); });
    container.querySelector('#in-op-d')?.addEventListener('input', e => { opD = parseInt(e.target.value) || 1; render(); });
    container.querySelector('#btn-toggle-op')?.addEventListener('click', () => { opType = opType === '+' ? '−' : '+'; render(); });

    // Checkpoint 4 New Problem button
    container.querySelector('#btn-roll-cp-frac-4')?.addEventListener('click', () => {
      playClickSound();
      cp4Prob = getRandomChoice(cp4Pool);
      render();
    });

    container.querySelectorAll('#cp-opts-4 .cp-opt-btn').forEach(b => {
      b.addEventListener('click', () => {
        const isCorrect = b.getAttribute('data-is-correct') === 'true';
        const feedbackEl = container.querySelector('#cp-feedback-4');
        const boxEl = container.querySelector('#cp-box-4');
        if (isCorrect) {
          b.classList.add('correct');
          container.querySelectorAll('#cp-opts-4 .cp-opt-btn').forEach(btn => btn.disabled = true);
          completeFractionsLearnCheckpoint('checkpoint_frac_4', feedbackEl, boxEl);
        } else {
          b.classList.add('wrong');
          playWrongSound();
          if (feedbackEl) {
            feedbackEl.className = 'checkpoint-feedback wrong';
            feedbackEl.innerHTML = `<strong>❌ Not quite!</strong> You cannot subtract denominators! First find LCM(${cp4Prob.b}, ${cp4Prob.d}) = ${cp4Prob.lcm}, convert to ${s1}/${cp4Prob.lcm} − ${s2}/${cp4Prob.lcm} = <strong>${cp4Prob.ansN}/${cp4Prob.ansD}</strong>!`;
            feedbackEl.style.display = 'block';
          }
        }
      });
    });
  }

  render();
}

/* --------------------------------------------------------------------------
   MODULE 5: MULTIPLICATION, "OF" & CROSS-CANCELLATION
   -------------------------------------------------------------------------- */

function renderMultiplicationOfMagicModule(container) {
  const cp5Pool = [
    { a: 5, b: 12, c: 4, d: 15, ans: '1/9', exp: 'Cancel 5 & 15 by 5 to 1 & 3; Cancel 4 & 12 by 4 to 1 & 3 => (1×1)/(3×3) = 1/9', distractors: ['20/180', '1/6', '4/15'] },
    { a: 3, b: 8, c: 4, d: 9, ans: '1/6', exp: 'Cancel 3 & 9 by 3 to 1 & 3; Cancel 4 & 8 by 4 to 1 & 2 => (1×1)/(2×3) = 1/6', distractors: ['12/72', '1/4', '3/8'] },
    { a: 7, b: 10, c: 5, d: 14, ans: '1/4', exp: 'Cancel 7 & 14 by 7 to 1 & 2; Cancel 5 & 10 by 5 to 1 & 2 => (1×1)/(2×2) = 1/4', distractors: ['35/140', '1/2', '7/20'] },
    { a: 2, b: 9, c: 3, d: 8, ans: '1/12', exp: 'Cancel 2 & 8 by 2 to 1 & 4; Cancel 3 & 9 by 3 to 1 & 3 => (1×1)/(3×4) = 1/12', distractors: ['6/72', '1/6', '2/9'] },
    { a: 4, b: 15, c: 5, d: 8, ans: '1/6', exp: 'Cancel 4 & 8 by 4 to 1 & 2; Cancel 5 & 15 by 5 to 1 & 3 => (1×1)/(3×2) = 1/6', distractors: ['20/120', '1/3', '5/12'] }
  ];
  let cp5Prob = getRandomChoice(cp5Pool);

  function render() {
    const cp = state.fractionsLearnCheckpoints || {};
    const isCpCleared = !!cp.checkpoint_frac_5;

    const cp5Choices = [
      { text: `${cp5Prob.ans} (${cp5Prob.exp})`, isCorrect: true },
      { text: `${cp5Prob.distractors[0]} (unreduced product)`, isCorrect: false },
      { text: cp5Prob.distractors[1], isCorrect: false },
      { text: cp5Prob.distractors[2], isCorrect: false }
    ].sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <div class="think-callout-math">
        <div class="callout-header">💡 Think About It — The Magic of "Of": It's Secretly Multiplication!</div>
        <p>When you hear <em>"half of 20"</em>, your brain calculates 10. In mathematics, <strong>"of" always means multiply (×)</strong>! ½ of 20 = ½ × 20 = 10. ¾ of 36 kg = (36 ÷ 4) × 3 = 27 kg!</p>
      </div>

      <!-- Slicing a Slice -->
      <div class="equal-slice-card" style="margin-top: 1.5rem;">
        <h4 style="color: var(--accent-amber-light); font-size: 1.15rem; margin-bottom: 0.5rem;">
          📄 Slicing a Slice: Paper Folding Discovery (${formatFrac(1, 2)} × ${formatFrac(1, 4)} = ${formatFrac(1, 8)})
        </h4>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
          What happens when you multiply a fraction by a fraction? You are taking a fraction OF a fraction!
        </p>

        <div style="display: flex; gap: 2rem; align-items: center; justify-content: center; flex-wrap: wrap;">
          <svg width="120" height="120" viewBox="0 0 160 160" style="width: 120px; height: 120px; max-width: 120px; max-height: 120px; border-radius: 8px; border: 2px solid #475569; flex-shrink: 0;">
            <!-- 8 sub-rectangles (2 rows x 4 cols) -->
            ${Array.from({ length: 8 }, (_, i) => {
              const r = Math.floor(i / 4);
              const c = i % 4;
              const isOverlapped = r === 0 && c === 0;
              const isHalf = r === 0;
              return `
                <rect x="${c * 40}" y="${r * 80}" width="40" height="80" 
                      fill="${isOverlapped ? '#38bdf8' : (isHalf ? 'rgba(56, 189, 248, 0.2)' : '#1e293b')}" 
                      stroke="#475569" stroke-width="1.5" />
              `;
            }).join('')}
          </svg>

          <div style="max-width: 380px; font-size: 0.9rem; line-height: 1.5;">
            <strong>How the Paper Model Works:</strong><br>
            1. Fold paper horizontally in half: Top half is shaded (½).<br>
            2. Fold vertically into 4 equal quarters: Left column is ¼.<br>
            3. The <strong>double-shaded overlapping region</strong> is exactly 1 small section out of 8 total sections = <strong>⅛</strong>!<br>
            <div style="color: #34d399; font-size: 1.1rem; font-weight: 700; margin-top: 0.5rem;">
              Formula: (Top × Top) / (Bottom × Bottom) = (1 × 1) / (2 × 4) = ⅛!
            </div>
          </div>
        </div>
      </div>

      <!-- Cross-Cancellation Tool -->
      <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem; margin-top: 1.5rem;">
        <h4 style="color: var(--accent-amber-light); font-size: 1.15rem; margin-bottom: 0.5rem;">
          ⚡ Cross-Cancellation: The Secret Power Tool Against Giant Numbers!
        </h4>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1rem;">
          Compare the two ways to solve <strong>${formatFrac(4, 9)} × ${formatFrac(3, 8)}</strong>:
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
          <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 1rem;">
            <strong style="color: #ef4444;">❌ The Slow & Painful Way:</strong>
            <p style="font-size: 0.85rem; margin: 0.4rem 0;">
              Multiply tops: 4 × 3 = 12<br>
              Multiply bottoms: 9 × 8 = 72<br>
              Get: 12/72... now struggle to divide by 12 on a scratchpad!
            </p>
          </div>

          <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 1rem;">
            <strong style="color: #10b981;">⚡ The Cross-Cancellation Shortcut:</strong>
            <p style="font-size: 0.85rem; margin: 0.4rem 0;">
              Look diagonally:<br>
              • 4 and 8 both divide by 4: (4 ➔ <strong>1</strong>, 8 ➔ <strong>2</strong>)<br>
              • 3 and 9 both divide by 3: (3 ➔ <strong>1</strong>, 9 ➔ <strong>3</strong>)<br>
              • 3 and 9 both divide by 3: (3 ➔ <strong>1</strong>, 9 ➔ <strong>3</strong>)<br>
              Multiply survivors: (1 × 1) / (3 × 2) = <strong>⅙</strong> in 2 seconds!
            </p>
          </div>
        </div>
      </div>

      <!-- Rahul's Mixed Multiplication Trap -->
      <div style="background: rgba(30, 41, 59, 0.4); border-left: 4px solid #ef4444; border-radius: 8px; padding: 1rem; margin-top: 1.5rem;">
        <h4 style="color: #ef4444; font-size: 1.1rem; margin: 0 0 0.5rem 0;">
          🚨 Beware: Rahul's Mixed Multiplication Trap!
        </h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0; line-height: 1.5;">
          Rahul solved 1 ½ × 2 ⅔ by multiplying wholes (1 × 2 = 2) and fractions (½ × ⅔ = ⅓) to get 2 ⅓.<br>
          <strong style="color: #fca5a5;">NEVER multiply mixed numbers directly!</strong> You must <strong>ALWAYS convert to improper fractions first</strong>:<br>
          1 ½ = 3/2 and 2 ⅔ = 8/3 $\implies$ (3/2) × (8/3) = 24/6 = <strong>4</strong>! Rahul was completely wrong!
        </p>
      </div>

      <!-- Checkpoint 5 -->
      <div class="checkpoint-box ${isCpCleared ? 'cleared' : ''}" id="cp-box-5" style="margin-top: 1.5rem;">
        <div class="checkpoint-header">
          <span class="checkpoint-badge ${isCpCleared ? 'cleared' : ''}">
            ${isCpCleared ? '✓ Checkpoint Cleared' : '🎯 Checkpoint 5: Cross-Cancellation Test'}
          </span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Required for Star 1 ⭐</span>
        </div>
        <div class="checkpoint-prompt" style="margin: 0.75rem 0; font-size: 0.95rem; line-height: 1.45;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <span><strong>Diagnostic Question:</strong> Find <strong>${formatFrac(cp5Prob.a, cp5Prob.b)} × ${formatFrac(cp5Prob.c, cp5Prob.d)}</strong> in simplest form using cross-cancellation:</span>
            <button class="btn btn-secondary btn-sm" id="btn-roll-cp-frac-5" style="font-size: 0.78rem; padding: 4px 10px; min-height: 32px;">🎲 New Problem</button>
          </div>
        </div>
        <div class="checkpoint-options" id="cp-opts-5">
          ${cp5Choices.map((opt, i) => `
            <button class="option-btn cp-opt-btn" data-is-correct="${opt.isCorrect}">
              ${String.fromCharCode(65 + i)}) ${opt.text}
            </button>
          `).join('')}
        </div>
        <div class="checkpoint-feedback" id="cp-feedback-5" style="${isCpCleared ? 'display: block;' : 'display: none;'}">
          ${isCpCleared ? '<strong>🎉 Checkpoint Cleared!</strong> You mastered fraction multiplication and cross-cancellation!' : ''}
        </div>
      </div>
    `;

    // Checkpoint 5 New Problem button
    container.querySelector('#btn-roll-cp-frac-5')?.addEventListener('click', () => {
      playClickSound();
      cp5Prob = getRandomChoice(cp5Pool);
      render();
    });

    container.querySelectorAll('#cp-opts-5 .cp-opt-btn').forEach(b => {
      b.addEventListener('click', () => {
        const isCorrect = b.getAttribute('data-is-correct') === 'true';
        const feedbackEl = container.querySelector('#cp-feedback-5');
        const boxEl = container.querySelector('#cp-box-5');
        if (isCorrect) {
          b.classList.add('correct');
          container.querySelectorAll('#cp-opts-5 .cp-opt-btn').forEach(btn => btn.disabled = true);
          completeFractionsLearnCheckpoint('checkpoint_frac_5', feedbackEl, boxEl);
        } else {
          b.classList.add('wrong');
          playWrongSound();
          if (feedbackEl) {
            feedbackEl.className = 'checkpoint-feedback wrong';
            feedbackEl.innerHTML = `<strong>❌ Not quite!</strong> Cross-cancel: ${cp5Prob.exp}!`;
            feedbackEl.style.display = 'block';
          }
        }
      });
    });
  }

  render();
}

/* --------------------------------------------------------------------------
   MODULE 6: RECIPROCALS, DIVISION & "KEEP, CHANGE, FLIP"
   -------------------------------------------------------------------------- */

function renderDivisionReciprocalsModule(container) {
  const cp6Pool = [
    { meters: 15, badgeN: 3, badgeD: 4, badges: 20, exp: '15 × 4/3 = (15÷3) × 4 = 5 × 4 = 20', distractors: ['11 badges (15 − 4)', '45 badges (15 × 3)'] },
    { meters: 12, badgeN: 2, badgeD: 3, badges: 18, exp: '12 × 3/2 = (12÷2) × 3 = 6 × 3 = 18', distractors: ['8 badges (12 × 2/3)', '14 badges (12 + 2)'] },
    { meters: 16, badgeN: 4, badgeD: 5, badges: 20, exp: '16 × 5/4 = (16÷4) × 5 = 4 × 5 = 20', distractors: ['12 badges (16 − 4)', '80 badges (16 × 5)'] },
    { meters: 18, badgeN: 3, badgeD: 4, badges: 24, exp: '18 × 4/3 = (18÷3) × 4 = 6 × 4 = 24', distractors: ['14 badges (18 − 4)', '54 badges (18 × 3)'] },
    { meters: 20, badgeN: 5, badgeD: 8, badges: 32, exp: '20 × 8/5 = (20÷5) × 8 = 4 × 8 = 32', distractors: ['12 badges (20 − 8)', '100 badges (20 × 5)'] },
    { meters: 24, badgeN: 2, badgeD: 3, badges: 36, exp: '24 × 3/2 = (24÷2) × 3 = 12 × 3 = 36', distractors: ['16 badges (24 × 2/3)', '48 badges (24 × 2)'] }
  ];
  let cp6Prob = getRandomChoice(cp6Pool);

  function render() {
    const cp = state.fractionsLearnCheckpoints || {};
    const isCpCleared = !!cp.checkpoint_frac_6;

    const cp6Choices = [
      { text: `${cp6Prob.badges} badges (${cp6Prob.exp})`, isCorrect: true },
      { text: cp6Prob.distractors[0], isCorrect: false },
      { text: cp6Prob.distractors[1], isCorrect: false }
    ].sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <div class="think-callout-math">
        <div class="callout-header">💡 Think About It — The Measurement Model: Why Dividing Makes Numbers LARGER!</div>
        <p>In whole numbers, division shrinks quantities: 10 ÷ 2 = 5. But with fractions: <strong>6 ÷ ½ = 12</strong>! Why does it get bigger? Because division asks: <em>"How many half-glasses fit inside 6 liters?"</em> Each liter holds TWO halves, so 6 liters hold <strong>6 × 2 = 12 half-glasses</strong>!</p>
      </div>

      <!-- 4 Golden Reciprocal Rules -->
      <div style="margin-top: 1.5rem;">
        <h4 style="color: var(--accent-amber-light); font-size: 1.15rem; margin-bottom: 0.75rem;">
          🔄 The 4 Golden Reciprocal Laws (Product MUST = 1)
        </h4>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
          <div style="background: rgba(30, 41, 59, 0.4); padding: 1rem; border-radius: 8px; border-top: 3px solid #38bdf8;">
            <strong style="color: #38bdf8;">1. Proper/Improper Fraction</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.25rem 0;">Simply invert top and bottom!</p>
            <div style="font-size: 1.1rem; color: #34d399;">${formatFrac(3, 7)} $\\to$ <strong>${formatFrac(7, 3)}</strong></div>
          </div>

          <div style="background: rgba(30, 41, 59, 0.4); padding: 1rem; border-radius: 8px; border-top: 3px solid #fb923c;">
            <strong style="color: #fb923c;">2. Whole Number</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.25rem 0;">Write as N/1, then flip!</p>
            <div style="font-size: 1.1rem; color: #34d399;">5 (${formatFrac(5, 1)}) $\\to$ <strong>${formatFrac(1, 5)}</strong></div>
          </div>

          <div style="background: rgba(30, 41, 59, 0.4); padding: 1rem; border-radius: 8px; border-top: 3px solid #a855f7;">
            <strong style="color: #a855f7;">3. Mixed Number</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.25rem 0;">Convert to improper first!</p>
            <div style="font-size: 1.1rem; color: #34d399;">2 ⅓ = 7/3 $\\to$ <strong>${formatFrac(3, 7)}</strong></div>
          </div>

          <div style="background: rgba(30, 41, 59, 0.4); padding: 1rem; border-radius: 8px; border-top: 3px solid #ef4444;">
            <strong style="color: #ef4444;">4. The Zero Law</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.25rem 0;">1/0 is undefined in math!</p>
            <div style="font-size: 1.1rem; color: #ef4444;">0 has <strong>NO Reciprocal</strong></div>
          </div>
        </div>
      </div>

      <!-- Keep Change Flip Algorithm -->
      <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem; margin-top: 1.5rem;">
        <h4 style="color: var(--accent-amber-light); font-size: 1.15rem; margin-bottom: 0.5rem;">
          🔄 The "Keep, Change, Flip" Division Algorithm
        </h4>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1rem;">
          To divide by any fraction, turn it into multiplication by its reciprocal!
        </p>

        <div style="display: flex; gap: 1rem; align-items: center; justify-content: center; flex-wrap: wrap; font-size: 1.25rem;">
          <div style="background: rgba(15, 23, 42, 0.7); padding: 0.6rem 1rem; border-radius: 8px;">
            <span style="color: #38bdf8;">1. KEEP</span><br>${formatFrac(3, 5)}
          </div>
          <div style="background: rgba(15, 23, 42, 0.7); padding: 0.6rem 1rem; border-radius: 8px;">
            <span style="color: #fb923c;">2. CHANGE</span><br>÷ ➔ ×
          </div>
          <div style="background: rgba(15, 23, 42, 0.7); padding: 0.6rem 1rem; border-radius: 8px;">
            <span style="color: #34d399;">3. FLIP</span><br>${formatFrac(9, 10)} ➔ ${formatFrac(10, 9)}
          </div>
          <div style="font-size: 1.4rem; color: #f59e0b;">=</div>
          <div style="background: rgba(15, 23, 42, 0.7); padding: 0.6rem 1rem; border-radius: 8px;">
            <strong>${formatFrac(2, 3)}</strong>
          </div>
        </div>
      </div>

      <!-- Checkpoint 6 -->
      <div class="checkpoint-box ${isCpCleared ? 'cleared' : ''}" id="cp-box-6" style="margin-top: 1.5rem;">
        <div class="checkpoint-header">
          <span class="checkpoint-badge ${isCpCleared ? 'cleared' : ''}">
            ${isCpCleared ? '✓ Checkpoint Cleared' : '🎯 Checkpoint 6: Tailor Ribbon Challenge'}
          </span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Required for Star 1 ⭐</span>
        </div>
        <div class="checkpoint-prompt" style="margin: 0.75rem 0; font-size: 0.95rem; line-height: 1.45;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <span><strong>Diagnostic Question:</strong> A tailor has <strong>${cp6Prob.meters} meters</strong> of ribbon. If each school badge takes <strong>${formatFrac(cp6Prob.badgeN, cp6Prob.badgeD)} meter</strong> of ribbon, how many total badges can he stitch? (${cp6Prob.meters} ÷ ${formatFrac(cp6Prob.badgeN, cp6Prob.badgeD)} = ?)</span>
            <button class="btn btn-secondary btn-sm" id="btn-roll-cp-frac-6" style="font-size: 0.78rem; padding: 4px 10px; min-height: 32px;">🎲 New Problem</button>
          </div>
        </div>
        <div class="checkpoint-options" id="cp-opts-6">
          ${cp6Choices.map((opt, i) => `
            <button class="option-btn cp-opt-btn" data-is-correct="${opt.isCorrect}">
              ${String.fromCharCode(65 + i)}) ${opt.text}
            </button>
          `).join('')}
        </div>
        <div class="checkpoint-feedback" id="cp-feedback-6" style="${isCpCleared ? 'display: block;' : 'display: none;'}">
          ${isCpCleared ? '<strong>🎉 Checkpoint Cleared!</strong> You mastered fraction division and reciprocals!' : ''}
        </div>
      </div>
    `;

    // Checkpoint 6 New Problem button
    container.querySelector('#btn-roll-cp-frac-6')?.addEventListener('click', () => {
      playClickSound();
      cp6Prob = getRandomChoice(cp6Pool);
      render();
    });

    container.querySelectorAll('#cp-opts-6 .cp-opt-btn').forEach(b => {
      b.addEventListener('click', () => {
        const isCorrect = b.getAttribute('data-is-correct') === 'true';
        const feedbackEl = container.querySelector('#cp-feedback-6');
        const boxEl = container.querySelector('#cp-box-6');
        if (isCorrect) {
          b.classList.add('correct');
          container.querySelectorAll('#cp-opts-6 .cp-opt-btn').forEach(btn => btn.disabled = true);
          completeFractionsLearnCheckpoint('checkpoint_frac_6', feedbackEl, boxEl);
        } else {
          b.classList.add('wrong');
          playWrongSound();
          if (feedbackEl) {
            feedbackEl.className = 'checkpoint-feedback wrong';
            feedbackEl.innerHTML = `<strong>❌ Not quite!</strong> To divide ${cp6Prob.meters} by ${cp6Prob.badgeN}/${cp6Prob.badgeD}: Keep ${cp6Prob.meters}, change ÷ to ×, flip ${cp6Prob.badgeN}/${cp6Prob.badgeD} to ${cp6Prob.badgeD}/${cp6Prob.badgeN}! ${cp6Prob.exp} = <strong>${cp6Prob.badges} badges</strong>!`;
            feedbackEl.style.display = 'block';
          }
        }
      });
    });
  }

  render();
}

/* --------------------------------------------------------------------------
   MODULE 7: SPOT THE EXAM TRAPS (5 DIAGNOSTIC TEST SLIPS)
   -------------------------------------------------------------------------- */

function renderSpotTheTrapsFractionsModule(container) {
  const slips = [
    {
      id: 'trap_1',
      student: 'Rahul M.',
      exam: 'Unit Test 1',
      question: 'Evaluate: 3/8 + 2/8',
      flawedWork: '3/8 + 2/8 = (3 + 2) / (8 + 8) = 5/16',
      flawTitle: 'Adding Denominators Together Trap',
      flawExplanation: 'Rahul added the denominators! The denominator indicates the size of the slice ("eighths"). If you have 3 eighths and add 2 eighths, you have 5 eighths! Denominators NEVER add together.',
      correctSolution: '3/8 + 2/8 = (3 + 2)/8 = 5/8'
    },
    {
      id: 'trap_2',
      student: 'Aman K.',
      exam: 'Term 1 Revision',
      question: 'Convert 4 ⅔ to an improper fraction',
      flawedWork: '4 ⅔ = (4 × 2 + 3) / 3 = 11/3',
      flawTitle: 'Flipped Multiplication in Mixed Conversion',
      flawExplanation: 'Aman multiplied the whole number by the numerator (4 × 2) instead of the denominator! The correct formula is (Whole × Denominator) + Numerator.',
      correctSolution: '4 ⅔ = (4 × 3 + 2) / 3 = (12 + 2) / 3 = 14/3'
    },
    {
      id: 'trap_3',
      student: 'Priya S.',
      exam: 'Weekly Speed Drill',
      question: 'Solve: 2 ½ × 1 ⅓',
      flawedWork: '2 ½ × 1 ⅓ = (2 × 1) + (½ × ⅓) = 2 ⅙',
      flawTitle: 'Multiplying Mixed Numbers Separately',
      flawExplanation: 'Priya multiplied whole × whole and fraction × fraction. You can NEVER multiply mixed numbers separately! You must convert both to improper fractions first.',
      correctSolution: '2 ½ = 5/2, 1 ⅓ = 4/3 $\\implies$ (5/2) × (4/3) = 20/6 = 10/3 = 3 ⅓'
    },
    {
      id: 'trap_4',
      student: 'Sneha R.',
      exam: 'Quarterly Exam',
      question: 'Solve: 4/5 ÷ 2/3',
      flawedWork: '4/5 ÷ 2/3 = 5/4 × 2/3 = 10/12 = 5/6',
      flawTitle: 'Upside-Down Reciprocal: Flipped the First Fraction!',
      flawExplanation: 'Sneha flipped the first fraction (4/5 ➔ 5/4)! In Keep, Change, Flip: the first fraction is KEPT untouched. Only the second fraction (the divisor) is inverted.',
      correctSolution: '4/5 ÷ 2/3 = 4/5 × 3/2 = 12/10 = 6/5 = 1 ⅕'
    },
    {
      id: 'trap_5',
      student: 'Karan D.',
      exam: 'Concept Viva',
      question: 'What is the reciprocal of 0?',
      flawedWork: 'Reciprocal of 0 is 1/0 = 0',
      flawTitle: 'The Zero Reciprocal Fallacy',
      flawExplanation: 'Karan wrote 1/0 = 0. Division by zero is undefined! Two numbers are reciprocals only if their product is 1. Since 0 × anything = 0, no number can multiply with 0 to give 1.',
      correctSolution: '0 has NO reciprocal (Undefined in mathematics)'
    }
  ];

  let revealedSlips = {};

  function render() {
    container.innerHTML = `
      <div class="think-callout-math">
        <div class="callout-header">🕵️ Be The Teacher — Diagnostic Examination Immunity</div>
        <p>A top student does not merely know how to solve problems; they can spot subtle arithmetic blunders in test papers instantly! Diagnose these 5 fictitious student test slips to build immunity against CBSE exam traps.</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1.5rem;">
        ${slips.map((s, idx) => {
          const isRev = !!revealedSlips[s.id];
          return `
            <div class="trap-slip-card">
              <div class="slip-header">
                <div>
                  <strong>Test Slip #${idx + 1}: ${s.student}</strong>
                  <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 0.5rem;">(${s.exam})</span>
                </div>
                <button class="btn ${isRev ? 'btn-ghost' : 'btn-secondary'} btn-reveal-trap" data-trap-id="${s.id}" style="padding: 0.3rem 0.75rem; font-size: 0.8rem;">
                  ${isRev ? '🙈 Hide Diagnosis' : '🔍 Diagnose Fault'}
                </button>
              </div>

              <div class="slip-body">
                <div style="margin-bottom: 0.5rem;">
                  <span style="color: var(--text-muted);">Question:</span> <strong>${s.question}</strong>
                </div>
                <div class="student-handwriting">
                  ❌ Student Wrote: ${s.flawedWork}
                </div>

                ${isRev ? `
                  <div class="diagnosis-box">
                    <strong style="color: #ef4444; font-size: 0.95rem;">🚨 Exam Trap: ${s.flawTitle}</strong>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.4rem 0;">
                      ${s.flawExplanation}
                    </p>
                    <div style="color: #34d399; font-weight: 700; font-size: 0.95rem; margin-top: 0.5rem;">
                      ✅ Teacher's Correction: ${s.correctSolution}
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.querySelectorAll('.btn-reveal-trap').forEach(b => {
      b.addEventListener('click', () => {
        playClickSound();
        const id = b.getAttribute('data-trap-id');
        revealedSlips[id] = !revealedSlips[id];
        render();
      });
    });
  }

  render();
}

/* --------------------------------------------------------------------------
   WORKSHEET GENERATOR & PRINT ENGINE FOR FRACTIONS MASTER
   -------------------------------------------------------------------------- */

let cachedWorksheetFractionsData = null;

function generateFreshWorksheetFractionsData() {
  // I. Basics
  const antBricks = getRandomChoice([4, 6, 8, 9, 12, 15, 16, 18]);
  const antSimp = simplifyFrac(antBricks, 24);

  const impD = getRandomChoice([3, 4, 5, 6, 7]);
  const impW = getRandomInt(2, 5);
  const impR = getRandomInt(1, impD - 1);
  const impN = impW * impD + impR;

  const mixD = getRandomChoice([3, 4, 5, 7, 8]);
  const mixW = getRandomInt(2, 5);
  const mixR = getRandomInt(1, mixD - 1);
  const mixN = mixW * mixD + mixR;

  const bottleMl = getRandomChoice([200, 250, 400, 500, 600, 750, 800]);
  const bottleSimp = simplifyFrac(bottleMl, 1000);

  const basics = [
    { q: `An ant crawls across a wall of 24 equal bricks. If it walks over ${antBricks} bricks, what fraction of the wall did it cover in simplest form?`, a: `${antBricks}/24 = ${antSimp.n}/${antSimp.d} of the wall` },
    { q: `Convert the improper fraction ${impN}/${impD} into a mixed number.`, a: `${impN} ÷ ${impD} = ${impW} R ${impR} = ${impW} ${impR}/${impD}` },
    { q: `Convert the mixed number ${mixW} ${mixR}/${mixD} into an improper fraction.`, a: `(${mixW} × ${mixD} + ${mixR})/${mixD} = (${mixW * mixD} + ${mixR})/${mixD} = ${mixN}/${mixD}` },
    { q: `A 1000 mL water bottle is filled to ${bottleMl} mL. What fraction of the bottle is filled in lowest terms?`, a: `${bottleMl}/1000 = ${bottleSimp.n}/${bottleSimp.d}` }
  ];

  // II. Equiv & Comparisons
  const eqN = getRandomChoice([2, 3, 4, 5]);
  const eqD = getRandomChoice([5, 7, 9, 11]);
  const eqK = getRandomChoice([3, 4, 5, 6]);

  const redBase = getRandomChoice([{ n: 2, d: 3 }, { n: 3, d: 4 }, { n: 2, d: 5 }, { n: 3, d: 5 }, { n: 5, d: 6 }]);
  const redK = getRandomChoice([4, 6, 8, 9, 12]);

  const numSame = getRandomChoice([3, 4, 5, 7]);
  const den1 = getRandomChoice([6, 7, 8]);
  const den2 = getRandomChoice([9, 11, 12, 13]);

  const bfPairs = [
    { a: 2, b: 5, c: 3, d: 7 },
    { a: 3, b: 8, c: 4, d: 9 },
    { a: 5, b: 6, c: 7, d: 8 },
    { a: 4, b: 7, c: 5, d: 9 },
    { a: 3, b: 7, c: 4, d: 9 }
  ];
  const bfp = getRandomChoice(bfPairs);
  const cross1 = bfp.a * bfp.d;
  const cross2 = bfp.b * bfp.c;
  const bfpGreater = cross1 > cross2 ? `${bfp.a}/${bfp.b} > ${bfp.c}/${bfp.d}` : `${bfp.c}/${bfp.d} > ${bfp.a}/${bfp.b}`;

  const equiv = [
    { q: `Find the missing number: ${eqN}/${eqD} = ______ / ${eqD * eqK}`, a: `${eqD * eqK} ÷ ${eqD} = ${eqK} => ${eqN} × ${eqK} = ${eqN * eqK}` },
    { q: `Reduce ${redBase.n * redK}/${redBase.d * redK} to its simplest form by dividing by HCF.`, a: `HCF = ${redK} => ${redBase.n}/${redBase.d}` },
    { q: `Compare using No-Pen deduction: ${numSame}/${den1} ______ ${numSame}/${den2}`, a: `${numSame}/${den1} > ${numSame}/${den2} (smaller denominator = larger pieces)` },
    { q: `Compare using cross-multiplication: ${bfp.a}/${bfp.b} ______ ${bfp.c}/${bfp.d}`, a: `${bfp.a} × ${bfp.d} = ${cross1} vs ${bfp.b} × ${bfp.c} = ${cross2} => ${bfpGreater}` }
  ];

  // III. Operations
  const likeD = getRandomChoice([9, 11, 13, 15]);
  const likeA = getRandomInt(2, 4);
  const likeB = getRandomInt(1, 3);

  const subPairs = [
    { n1: 5, d1: 6, n2: 1, d2: 4 },
    { n1: 3, d1: 4, n2: 2, d2: 5 },
    { n1: 7, d1: 10, n2: 2, d2: 5 },
    { n1: 7, d1: 8, n2: 1, d2: 2 }
  ];
  const sp = getRandomChoice(subPairs);
  const sLcm = lcm(sp.d1, sp.d2);
  const sDiffN = sp.n1 * (sLcm / sp.d1) - sp.n2 * (sLcm / sp.d2);
  const sSimp = simplifyFrac(sDiffN, sLcm);

  const addPairs = [
    { n1: 1, d1: 3, n2: 1, d2: 4 },
    { n1: 2, d1: 5, n2: 1, d2: 2 },
    { n1: 3, d1: 4, n2: 1, d2: 6 },
    { n1: 1, d1: 2, n2: 1, d2: 3 }
  ];
  const ap = getRandomChoice(addPairs);
  const aLcm = lcm(ap.d1, ap.d2);
  const aSumN = ap.n1 * (aLcm / ap.d1) + ap.n2 * (aLcm / ap.d2);
  const aSimp = simplifyFrac(aSumN, aLcm);

  const ofD = getRandomChoice([4, 5, 6, 8]);
  const ofN = getRandomChoice([2, 3, 5].filter(x => x < ofD));
  const ofMult = getRandomChoice([5, 6, 7, 8, 9]);
  const ofTotal = ofD * ofMult;
  const ofAns = ofN * ofMult;

  const ccSets = [
    { n1: 3, d1: 8, n2: 4, d2: 9, ansN: 1, ansD: 6 },
    { n1: 5, d1: 14, n2: 7, d2: 10, ansN: 1, ansD: 4 },
    { n1: 2, d1: 3, n2: 9, d2: 10, ansN: 3, ansD: 5 },
    { n1: 4, d1: 15, n2: 5, d2: 12, ansN: 1, ansD: 9 }
  ];
  const ccp = getRandomChoice(ccSets);

  const divPairs = [
    { n1: 4, d1: 5, n2: 8, d2: 15, ans: '1 1/2' },
    { n1: 3, d1: 7, n2: 6, d2: 7, ans: '1/2' },
    { n1: 2, d1: 3, n2: 4, d2: 9, ans: '1 1/2' },
    { n1: 5, d1: 6, n2: 5, d2: 12, ans: '2' }
  ];
  const divp = getRandomChoice(divPairs);

  const ops = [
    { q: `${likeA}/${likeD} + ${likeB}/${likeD} = ______`, a: `(${likeA} + ${likeB})/${likeD} = ${likeA + likeB}/${likeD} (Never add denominators!)` },
    { q: `${sp.n1}/${sp.d1} − ${sp.n2}/${sp.d2} = ______`, a: `LCM(${sp.d1}, ${sp.d2}) = ${sLcm} => ${sSimp.n}/${sSimp.d}` },
    { q: `${ap.n1}/${ap.d1} + ${ap.n2}/${ap.d2} = ______`, a: `LCM(${ap.d1}, ${ap.d2}) = ${aLcm} => ${aSimp.n}/${aSimp.d}` },
    { q: `Find ${ofN}/${ofD} of ${ofTotal} kilograms.`, a: `(${ofTotal} ÷ ${ofD}) × ${ofN} = ${ofMult} × ${ofN} = ${ofAns} kg` },
    { q: `${ccp.n1}/${ccp.d1} × ${ccp.n2}/${ccp.d2} in simplest form (use cross-cancellation).`, a: `Cancel common factors: ${ccp.ansN}/${ccp.ansD}` },
    { q: `${divp.n1}/${divp.d1} ÷ ${divp.n2}/${divp.d2} using Keep, Change, Flip.`, a: `${divp.n1}/${divp.d1} × ${divp.d2}/${divp.n2} = ${divp.ans}` }
  ];

  // IV. Words
  const ribbonSets = [
    { totN: 7, totD: 8, cutN: 1, cutD: 4, rem: '5/8' },
    { totN: 5, totD: 6, cutN: 1, cutD: 3, rem: '1/2' },
    { totN: 3, totD: 4, cutN: 1, cutD: 2, rem: '1/4' }
  ];
  const rSet = getRandomChoice(ribbonSets);

  const readSets = [
    { d1N: 1, d1D: 3, d2N: 2, d2D: 5, tot: '11/15' },
    { d1N: 1, d1D: 4, d2N: 1, d2D: 2, tot: '3/4' },
    { d1N: 2, d1D: 7, d2N: 3, d2D: 7, tot: '5/7' }
  ];
  const rdSet = getRandomChoice(readSets);

  const tailorFabric = getRandomChoice([12, 15, 18, 21, 24]);
  const tailorAprons = (tailorFabric / 3) * 4;

  const classStudents = getRandomChoice([30, 35, 40, 45, 50]);
  const busFraction = getRandomChoice([2, 3]);
  const busStudents = (classStudents / 5) * busFraction;

  const words = [
    { q: `A roll of ribbon was ${rSet.totN}/${rSet.totD} meter long. An art student cut off ${rSet.cutN}/${rSet.cutD} meter for a bow. What length of ribbon is left?`, a: `${rSet.totN}/${rSet.totD} − ${rSet.cutN}/${rSet.cutD} = ${rSet.rem} meter` },
    { q: `Rohan read ${rdSet.d1N}/${rdSet.d1D} of a book on Saturday and ${rdSet.d2N}/${rdSet.d2D} on Sunday. What fraction of the book did he read across the weekend?`, a: `Total = ${rdSet.d1N}/${rdSet.d1D} + ${rdSet.d2N}/${rdSet.d2D} = ${rdSet.tot} of the book` },
    { q: `A tailor needs 3/4 meter of cloth to stitch one child\'s apron. How many aprons can he make from ${tailorFabric} meters of cloth?`, a: `${tailorFabric} ÷ 3/4 = ${tailorFabric} × 4/3 = ${tailorAprons} aprons` },
    { q: `In a class of ${classStudents} students, ${busFraction}/5 of them travel by school bus. How many students travel by school bus?`, a: `(${classStudents} ÷ 5) × ${busFraction} = ${busStudents} students` }
  ];

  // V. Traps
  const trapLikeD = getRandomChoice([7, 9, 11, 13]);
  const trapLikeA = getRandomInt(1, 3);
  const trapLikeB = getRandomInt(1, 3);
  const traps = [
    { q: `Rahul wrote: ${trapLikeA}/${trapLikeD} + ${trapLikeB}/${trapLikeD} = ${trapLikeA + trapLikeB}/${trapLikeD * 2}. State the error and write the correct answer.`, a: `Rahul added the denominators! Denominators indicate slice size and never add together. Correct sum = ${trapLikeA + trapLikeB}/${trapLikeD}.` },
    { q: `Sneha wrote: The reciprocal of 0 is 0. Explain why Sneha is mistaken.`, a: `0 has NO reciprocal because 1 ÷ 0 is undefined in mathematics, and 0 × any number = 0 (never 1).` }
  ];

  return { basics, equiv, ops, words, traps };
}

function renderWorksheetViewFractions(container) {
  if (!cachedWorksheetFractionsData) {
    cachedWorksheetFractionsData = generateFreshWorksheetFractionsData();
  }
  const data = cachedWorksheetFractionsData;
  let showAnswers = false;

  function render() {
    container.innerHTML = `
      <div class="learn-container">
        <div class="learn-card">
          <div class="learn-card-header">
            <div>
              <h3>📄 Fractions Master Practice Worksheet</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                CBSE Class 5 Curriculum — Visual Partitioning, Mixed Numbers & Full Arithmetic (+, −, ×, ÷)
              </p>
            </div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button class="btn btn-secondary" id="btn-regen-frac-ws">
                🎲 Fresh Numbers
              </button>
              <button class="btn btn-ghost" id="btn-toggle-frac-key">
                ${showAnswers ? '🙈 Hide Answers' : '👁️ Show Answers'}
              </button>
              <button class="btn btn-primary" id="btn-print-action-frac">
                🖨️ Print Worksheet
              </button>
            </div>
          </div>

          <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.25rem; margin-top: 1rem;">
            
            <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">I. Visual Partitioning & Mixed Numbers:</h4>
            <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.5rem;">
              ${data.basics.map((item, idx) => `
                <div style="background: rgba(30, 41, 59, 0.4); padding: 0.65rem 0.85rem; border-radius: 8px;">
                  <strong>${idx + 1}.</strong> ${item.q}
                  ${showAnswers ? `<div style="color: #34d399; font-size: 0.85rem; margin-top: 0.25rem;">Ans: <strong>${item.a}</strong></div>` : ''}
                </div>
              `).join('')}
            </div>

            <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">II. Equivalence, Simplest Form & Comparisons:</h4>
            <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.5rem;">
              ${data.equiv.map((item, idx) => `
                <div style="background: rgba(30, 41, 59, 0.4); padding: 0.65rem 0.85rem; border-radius: 8px;">
                  <strong>${idx + 1}.</strong> ${item.q}
                  ${showAnswers ? `<div style="color: #34d399; font-size: 0.85rem; margin-top: 0.25rem;">Ans: <strong>${item.a}</strong></div>` : ''}
                </div>
              `).join('')}
            </div>

            <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">III. Fraction Operations (+, −, ×, ÷):</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.65rem; margin-bottom: 1.5rem;">
              ${data.ops.map((item, idx) => `
                <div style="background: rgba(30, 41, 59, 0.4); padding: 0.65rem 0.85rem; border-radius: 8px;">
                  <strong>${idx + 1}.</strong> ${item.q}
                  ${showAnswers ? `<div style="color: #34d399; font-size: 0.85rem; margin-top: 0.25rem;">Ans: <strong>${item.a}</strong></div>` : ''}
                </div>
              `).join('')}
            </div>

            <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">IV. Real-Life Applied Word Problems:</h4>
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
              ${data.words.map((item, idx) => `
                <div style="background: rgba(30, 41, 59, 0.4); padding: 0.75rem 1rem; border-radius: 8px;">
                  <strong>${idx + 1}.</strong> ${item.q}
                  ${showAnswers ? `<div style="color: #34d399; font-size: 0.85rem; margin-top: 0.35rem;">💡 ${item.a}</div>` : ''}
                </div>
              `).join('')}
            </div>

            <h4 style="color: var(--accent-amber-light); margin-bottom: 0.75rem;">V. Be the Teacher — Diagnostic Error Correction:</h4>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${data.traps.map((item, idx) => `
                <div style="background: rgba(30, 41, 59, 0.4); padding: 0.75rem 1rem; border-radius: 8px;">
                  <strong>${idx + 1}.</strong> ${item.q}
                  ${showAnswers ? `<div style="color: #34d399; font-size: 0.85rem; margin-top: 0.35rem;">💡 ${item.a}</div>` : ''}
                </div>
              `).join('')}
            </div>

          </div>
        </div>
      </div>
    `;

    container.querySelector('#btn-regen-frac-ws')?.addEventListener('click', () => {
      playClickSound();
      cachedWorksheetFractionsData = generateFreshWorksheetFractionsData();
      render();
    });

    container.querySelector('#btn-toggle-frac-key')?.addEventListener('click', () => {
      playClickSound();
      showAnswers = !showAnswers;
      render();
    });

    container.querySelector('#btn-print-action-frac')?.addEventListener('click', () => {
      printWorksheetFractions();
    });
  }

  render();
}

function populatePrintTopicFractions(printContainer) {
  if (!cachedWorksheetFractionsData) {
    cachedWorksheetFractionsData = generateFreshWorksheetFractionsData();
  }
  const data = cachedWorksheetFractionsData;

  printContainer.innerHTML = `
    <div class="print-header">
      <div class="print-school-name">KENDRIYA VIDYALAYA SANGATHAN / CBSE AFFILIATED SCHOOL</div>
      <div class="print-exam-title">CLASS V MATHEMATICS — FRACTIONS MASTER COMPREHENSIVE WORKSHEET</div>
      <div class="print-sub-title">Visual Partitioning, Mixed Numbers, Equivalence & Full Operations (+, −, ×, ÷)</div>
      <div class="print-meta-grid">
        <div class="print-meta-item"><span>Student Name:</span> ____________________________________</div>
        <div class="print-meta-item"><span>Roll No:</span> __________ &nbsp; <span>Section:</span> _____</div>
        <div class="print-meta-item"><span>Date:</span> ______________ &nbsp; <span>Time:</span> 35 Mins</div>
        <div class="print-meta-item"><span>Max Marks:</span> 40 &nbsp; <span>Marks Obtained:</span> _____</div>
      </div>
    </div>

    <div class="print-section">
      <div class="print-section-title">SECTION A: Visual Partitioning & Mixed Numbers (8 Marks)</div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.4rem;">
        ${data.basics.map((item, idx) => `
          <div><strong>${idx + 1}.</strong> ${item.q}<br><span style="color: #666; font-size: 0.85em;">Ans: __________________________________________________________________</span></div>
        `).join('')}
      </div>
    </div>

    <div class="print-section">
      <div class="print-section-title">SECTION B: Equivalence, Simplest Form & Comparisons (8 Marks)</div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.4rem;">
        ${data.equiv.map((item, idx) => `
          <div><strong>${idx + 1}.</strong> ${item.q}<br><span style="color: #666; font-size: 0.85em;">Ans: __________________________________________________________________</span></div>
        `).join('')}
      </div>
    </div>

    <div class="print-section">
      <div class="print-section-title">SECTION C: Calculations (+, −, ×, ÷) (12 Marks)</div>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-top: 0.4rem;">
        ${data.ops.map((item, idx) => `
          <div style="margin-bottom: 0.5rem;"><strong>${idx + 1}.</strong> &nbsp; ${item.q}<br><span style="color: #666; font-size: 0.85em;">Working: _______________________</span></div>
        `).join('')}
      </div>
    </div>

    <div class="print-section">
      <div class="print-section-title">SECTION D: Applied CBSE Word Problems (8 Marks)</div>
      <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.4rem;">
        ${data.words.map((item, idx) => `
          <div><strong>${idx + 1}.</strong> ${item.q}<br><span style="color: #666; font-size: 0.85em;">Ans: __________________________________________________________________</span></div>
        `).join('')}
      </div>
    </div>

    <div class="print-section">
      <div class="print-section-title">SECTION E: Spot the Mistake (4 Marks)</div>
      <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.4rem;">
        ${data.traps.map((item, idx) => `
          <div><strong>${idx + 1}.</strong> ${item.q}<br><span style="color: #666; font-size: 0.85em;">Ans: __________________________________________________________________</span></div>
        `).join('')}
      </div>
    </div>
  `;
}

function printWorksheetFractions() {
  const printContainer = document.getElementById('print-container');
  if (printContainer) populatePrintTopicFractions(printContainer);
  window.print();
}


// Register globals on window
_G_FRAC.gcd = gcd;
_G_FRAC.lcm = lcm;
_G_FRAC.simplifyFrac = simplifyFrac;
_G_FRAC.formatFrac = formatFrac;
_G_FRAC.formatMixed = formatMixed;
_G_FRAC.toMixedString = toMixedString;
_G_FRAC.formatFracOrMixed = formatFracOrMixed;
_G_FRAC.generateDynamicFractionQuestion = generateDynamicFractionQuestion;
_G_FRAC.generateFractionsPracticeQueue = generateFractionsPracticeQueue;
_G_FRAC.generateDynamicFractionChallengePool = generateDynamicFractionChallengePool;
_G_FRAC.PRACTICE_POOL_TOPIC_FRACTIONS = PRACTICE_POOL_TOPIC_FRACTIONS;
_G_FRAC.CHALLENGE_QUESTIONS_TOPIC_FRACTIONS = CHALLENGE_QUESTIONS_TOPIC_FRACTIONS;
_G_FRAC.updateFractionsMasteryStars = updateFractionsMasteryStars;
_G_FRAC.renderFractionsMilestoneBanner = renderFractionsMilestoneBanner;
_G_FRAC.renderEqualSliceDetectiveModule = renderEqualSliceDetectiveModule;
_G_FRAC.renderProperImproperMixedModule = renderProperImproperMixedModule;
_G_FRAC.renderEquivalentComparisonModule = renderEquivalentComparisonModule;
_G_FRAC.renderAddSubtractLabModule = renderAddSubtractLabModule;
_G_FRAC.renderMultiplicationOfMagicModule = renderMultiplicationOfMagicModule;
_G_FRAC.renderDivisionReciprocalsModule = renderDivisionReciprocalsModule;
_G_FRAC.renderSpotTheTrapsFractionsModule = renderSpotTheTrapsFractionsModule;
_G_FRAC.renderWorksheetViewFractions = renderWorksheetViewFractions;
_G_FRAC.populatePrintTopicFractions = populatePrintTopicFractions;
_G_FRAC.printWorksheetFractions = printWorksheetFractions;
