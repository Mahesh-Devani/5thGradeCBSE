/**
 * Maths Master — Class 5 CBSE
 * Modularized Architecture (Vanilla ES6+ JS)
 * Zero External Runtime Dependencies
 */

'use strict';

const LEARN_MODULES_TOPIC_FRACTIONS = {
  equal_slice_detective: {
    id: 'equal_slice_detective',
    pillTitle: '🍕 1. Equal Slice & Basics',
    title: 'Equal Partitioning, The Broken Plate & Visual Slicing',
    tag: 'Thinkbook Discovery',
    lead: 'Discover the golden law of fractions: <strong>every single part MUST be identical in size</strong>! Explore Roy\'s broken plate, the 24-block wall crawl, and water bottle visual estimation.',
    renderContent: (...args) => renderEqualSliceDetectiveModule(...args)
  },
  proper_improper_mixed: {
    id: 'proper_improper_mixed',
    pillTitle: '⚖️ 2. Proper, Improper & Mixed',
    title: 'Proper vs Improper Fractions & The Real-Life Mixed Converter',
    tag: 'Visual Pan Model',
    lead: 'Why do grocery bills use 2 ¾ kg instead of 11/4 kg? See improper fractions as whole pizza pans plus leftover slices, and master quick conversions!',
    renderContent: (...args) => renderProperImproperMixedModule(...args)
  },
  equivalent_comparison: {
    id: 'equivalent_comparison',
    pillTitle: '🔍 3. Equivalence & Shortcuts',
    title: 'Equivalent Fractions, Simplest Form & 3 "No-Pen" Comparison Tricks',
    tag: 'Speed Deduction',
    lead: 'Scale fractions without changing their value, reduce to lowest terms in seconds, and eliminate scratchpad work with 3 instant common-sense comparison shortcuts!',
    renderContent: (...args) => renderEquivalentComparisonModule(...args)
  },
  addition_subtraction_lab: {
    id: 'addition_subtraction_lab',
    pillTitle: '➕ 4. Add & Subtract Lab',
    title: 'Like & Unlike Addition/Subtraction & The Denominator Trap',
    tag: 'Mental Power Tool',
    lead: 'Never add denominators together! Master like fractions, use the <strong>LCM Hammer</strong> for unlike fractions, and use Ram\'s truth detective to test sums mentally.',
    renderContent: (...args) => renderAddSubtractLabModule(...args)
  },
  multiplication_of_magic: {
    id: 'multiplication_of_magic',
    pillTitle: '✖️ 5. "Of" & Multiplication',
    title: 'The Magic of "Of", Slicing a Slice & Cross-Cancellation',
    tag: 'Advanced Operations',
    lead: 'Discover why "of" is multiplication, see how ½ × ¼ = ⅛ by slicing a slice, and use cross-cancellation to avoid messy calculations!',
    renderContent: (...args) => renderMultiplicationOfMagicModule(...args)
  },
  division_reciprocals: {
    id: 'division_reciprocals',
    pillTitle: '➗ 6. Reciprocals & Division',
    title: 'The Measurement Model: Dividing by Fractions & Reciprocal Secrets',
    tag: 'Conceptual Breakthrough',
    lead: 'Why does dividing by a fraction make numbers LARGER? Learn "Keep, Change, Flip", explore the 4 reciprocal rules, and solve real tailor and recipe challenges!',
    renderContent: (...args) => renderDivisionReciprocalsModule(...args)
  },
  spot_the_traps_fractions: {
    id: 'spot_the_traps_fractions',
    pillTitle: '🚨 7. Spot Exam Traps',
    title: 'Be the Teacher: Diagnose 5 Classic CBSE Fraction Blunders',
    tag: 'Diagnostic Immunity',
    lead: 'Examine test slips from fictitious students. Spot the denominator addition blunder, improper conversion slip, mixed multiplication trap, and upside-down reciprocal.',
    renderContent: (...args) => renderSpotTheTrapsFractionsModule(...args)
  }
};

