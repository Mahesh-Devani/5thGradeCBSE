/**
 * 5th Grade CBSE — Pure Rule-Based Grader & Normalizer
 * ===================================================
 * Zero DOM dependencies | Pure functional JavaScript
 *
 * Provides:
 * - normalize(text, lang): Cleans punctuation, whitespace, filler words,
 *   spoken conversational wrappers, and converts spoken numbers to digits.
 * - gradeClosed({transcript, accepted, lang}): Evaluates spoken transcript
 *   against an array of acceptable answers using exact match, token match,
 *   and length-scaled fuzzy Levenshtein match with strict short-answer guardrails.
 */

(function(root) {
  'use strict';

  // Basic number word mapping
  const SMALL_NUMS = {
    'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4,
    'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
    'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13,
    'fourteen': 14, 'fifteen': 15, 'sixteen': 16, 'seventeen': 17,
    'eighteen': 18, 'nineteen': 19
  };

  const TENS = {
    'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50,
    'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90
  };

  // Conversational leading filler prefixes to strip
  const FILLER_PREFIXES = [
    /^i think (the answer is|it is|it's)\s+/i,
    /^(the answer is|my answer is|answer is)\s+/i,
    /^i think\s+/i,
    /^(it is|it's|is it)\s+/i,
    /^(well maybe|maybe|well)\s+/i
  ];

  // Isolated filler hesitation words
  const HESITATION_WORDS = /\b(um|uh|erm|er|ah|like|you know)\b/gi;

  /**
   * Convert compound spoken numbers in text (e.g. "twenty five", "a hundred and twenty") into digits
   */
  function convertSpokenNumbers(str) {
    if (!str || typeof str !== 'string') return '';

    // Handle "a hundred and [tens] [unit]" or "a hundred [twenty]"
    str = str.replace(/\b(?:a|one)\s+hundred(?:\s+and)?(?:\s+([a-z]+))?(?:\s+([a-z]+))?\b/gi, function(match, t, u) {
      let val = 100;
      if (t) {
        t = t.toLowerCase();
        if (TENS[t]) val += TENS[t];
        else if (SMALL_NUMS[t]) val += SMALL_NUMS[t];
      }
      if (u) {
        u = u.toLowerCase();
        if (SMALL_NUMS[u]) val += SMALL_NUMS[u];
      }
      return String(val);
    });

    // Handle tens + unit (e.g. "twenty-five" or "twenty five")
    str = str.replace(/\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)[ -](one|two|three|four|five|six|seven|eight|nine)\b/gi, function(m, ten, unit) {
      const tVal = TENS[ten.toLowerCase()] || 0;
      const uVal = SMALL_NUMS[unit.toLowerCase()] || 0;
      return String(tVal + uVal);
    });

    // Handle standalone tens
    str = str.replace(/\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)\b/gi, function(m, word) {
      return String(TENS[word.toLowerCase()] || word);
    });

    // Handle standalone 0-19
    str = str.replace(/\b(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen)\b/gi, function(m, word) {
      const val = SMALL_NUMS[word.toLowerCase()];
      return val !== undefined ? String(val) : word;
    });

    return str;
  }

  /**
   * Normalize input text:
   * - Lowercase & trim
   * - Remove punctuation
   * - Strip conversational lead-ins and hesitation fillers
   * - Convert spoken number words to digits
   */
  function normalize(text, lang) {
    if (!text || typeof text !== 'string') return '';

    let s = text.toLowerCase().trim();

    // Replace hyphens in numbers with space (e.g. "twenty-five" -> "twenty five")
    s = s.replace(/-/g, ' ');

    // Strip punctuation
    s = s.replace(/[.,\/#!$%\^&\*;:{}=\_`~()?"'–—]/g, ' ');

    // Collapse multiple spaces
    s = s.replace(/\s+/g, ' ').trim();

    // Strip hesitation fillers ("um", "uh", etc.)
    s = s.replace(HESITATION_WORDS, ' ').replace(/\s+/g, ' ').trim();

    // Strip conversational lead-in prefixes (apply iteratively in case of compounds)
    let changed = true;
    while (changed) {
      changed = false;
      for (const prefix of FILLER_PREFIXES) {
        if (prefix.test(s)) {
          s = s.replace(prefix, '').trim();
          changed = true;
        }
      }
    }

    // Convert spoken numbers
    s = convertSpokenNumbers(s);

    // Final whitespace collapse & trim
    return s.replace(/\s+/g, ' ').trim();
  }

  /**
   * Compute Levenshtein distance between two strings
   */
  function levenshteinDistance(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;

    const row = [];
    for (let i = 0; i <= b.length; i++) {
      row[i] = i;
    }

    for (let i = 1; i <= a.length; i++) {
      let prev = i;
      for (let j = 1; j <= b.length; j++) {
        let val;
        if (a[i - 1] === b[j - 1]) {
          val = row[j - 1];
        } else {
          val = Math.min(row[j - 1] + 1, Math.min(prev + 1, row[j] + 1));
        }
        row[j - 1] = prev;
        prev = val;
      }
      row[b.length] = prev;
    }

    return row[b.length];
  }

  /**
   * Rule-based grader for closed Q&A answers.
   *
   * @param {Object} params
   * @param {string} params.transcript - The raw spoken or typed student input
   * @param {string[]} params.accepted - Array of accepted correct answer strings
   * @param {string} [params.lang='en-IN'] - Language code
   * @returns {{ correct: boolean, score: number, matched: string|null, reason: string }}
   */
  function gradeClosed({ transcript, accepted, lang = 'en-IN' }) {
    if (!transcript || typeof transcript !== 'string') {
      return { correct: false, score: 0, matched: null, reason: 'Empty answer received' };
    }
    if (!Array.isArray(accepted) || accepted.length === 0) {
      return { correct: false, score: 0, matched: null, reason: 'No accepted answers defined' };
    }

    const normTranscript = normalize(transcript, lang);
    const transcriptTokens = normTranscript.split(/\s+/).filter(Boolean);

    // 1. Exact Match against any accepted candidate
    for (const cand of accepted) {
      const normCand = normalize(cand, lang);
      if (normTranscript === normCand) {
        return {
          correct: true,
          score: 1.0,
          matched: cand,
          reason: 'Exact match'
        };
      }
    }

    // 2. Token & Sub-Phrase Match
    // Matches e.g. "Option B" when accepted includes "b", or "an university" when accepted is "a university"
    for (const cand of accepted) {
      const normCand = normalize(cand, lang);
      const candTokens = normCand.split(/\s+/).filter(Boolean);

      // Single token match (e.g. accepted = "b", transcript = "option b")
      if (candTokens.length === 1) {
        const targetToken = candTokens[0];
        // If target is single letter A, B, C, D: look for "option X", "choice X", or exact token
        if (/^[a-d]$/i.test(targetToken)) {
          if (
            normTranscript === targetToken ||
            normTranscript === `option ${targetToken}` ||
            normTranscript === `choice ${targetToken}` ||
            transcriptTokens.includes(targetToken)
          ) {
            return {
              correct: true,
              score: 1.0,
              matched: cand,
              reason: 'Option token match'
            };
          }
        } else if (normCand.length > 3 && transcriptTokens.includes(targetToken)) {
          return {
            correct: true,
            score: 1.0,
            matched: cand,
            reason: 'Keyword token match'
          };
        }
      } else {
        // Multi-word phrase contained in transcript
        if (normTranscript.includes(normCand)) {
          return {
            correct: true,
            score: 1.0,
            matched: cand,
            reason: 'Sub-phrase match'
          };
        }
      }
    }

    // 3. Fuzzy Match with length-scaled Levenshtein threshold
    // STRICT RULE: For short answers (length <= 3, e.g. "a", "an", "the", "in", "on", "at"),
    // fuzzy threshold is strictly 0. Never mark "a" correct for "an" or vice versa!
    let bestMatch = null;
    let lowestDistance = Infinity;

    for (const cand of accepted) {
      const normCand = normalize(cand, lang);

      // Short answers require strict exact equality (already evaluated above)
      if (normCand.length <= 3) {
        continue;
      }

      // Max allowed edit distance based on target length
      let maxAllowed = 0;
      if (normCand.length >= 8) {
        maxAllowed = Math.min(3, Math.floor(normCand.length * 0.2));
      } else if (normCand.length >= 4) {
        maxAllowed = 1;
      }

      // Check distance against whole transcript
      const distWhole = levenshteinDistance(normTranscript, normCand);
      if (distWhole <= maxAllowed && distWhole < lowestDistance) {
        lowestDistance = distWhole;
        bestMatch = cand;
      }
    }

    if (bestMatch !== null) {
      return {
        correct: true,
        score: 1.0,
        matched: bestMatch,
        reason: `Fuzzy match (distance: ${lowestDistance})`
      };
    }

    return {
      correct: false,
      score: 0,
      matched: null,
      reason: 'No matching answer found'
    };
  }

  const VoiceGrader = {
    normalize,
    gradeClosed,
    levenshteinDistance
  };

  // Export to global window or Node/JSC environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = VoiceGrader;
  }
  root.VoiceGrader = VoiceGrader;

})(typeof window !== 'undefined' ? window : this);
