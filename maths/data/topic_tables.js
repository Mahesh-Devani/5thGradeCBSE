/**
 * Maths Master — Class 5 CBSE
 * Modularized Architecture (Vanilla ES6+ JS)
 * Zero External Runtime Dependencies
 */

'use strict';

const LEARN_MODULES_TOPIC_TABLES = {
  grid_explorer_20: {
    id: 'grid_explorer_20',
    pillTitle: '🗺️ 20×20 Visual Grid',
    title: 'Interactive 20×20 Multiplication Matrix & Symmetry Explorer',
    tag: 'Visual Landmark',
    lead: 'Demystify the 400 facts! Discover how the <strong>Commutative Law (A × B = B × A)</strong> cuts the table in half, highlight square number landmarks, and explore any product visually.',
    renderContent: (...args) => renderGridExplorerModule(...args)
  },
  split_add_lab: {
    id: 'split_add_lab',
    pillTitle: '🔨 Split & Add Lab',
    title: 'The Split-and-Add Hammer: Distributive Mental Math',
    tag: 'Mental Power Tool',
    lead: 'Never get stuck on teen tables again! Break tricky numbers into (10 + Unit) or (20 − Unit) to derive products in <strong>1.5 seconds flat</strong> without a scratchpad.',
    renderContent: (...args) => renderSplitAddLabModule(...args)
  },
  vedic_teen_teen: {
    id: 'vedic_teen_teen',
    pillTitle: '⚡ Vedic Teen × Teen',
    title: 'Vedic Base-10 Shortcut: Multiply 11×11 to 19×19 in 2 Seconds',
    tag: 'Speed Secret',
    lead: 'The world\'s most famous mental math trick! Follow the simple 2-step base-10 addition and unit multiplication method to solve any teen × teen problem in seconds.',
    renderContent: (...args) => renderVedicTeenTeenModule(...args)
  },
  table_tricks_cards: {
    id: 'table_tricks_cards',
    pillTitle: '💡 Table Secrets (11–20)',
    title: 'Table-by-Table Mental Hooks, Mnemonics & Clock Tricks',
    tag: 'Memory Hooks',
    lead: 'Every table has an intuitive secret: the 15s Clock Half, the 19s Step-Down, the 14s Double-Seven, and the 169 ↔ 196 Square Mirror. Explore them all!',
    renderContent: (...args) => renderTableTricksCardsModule(...args)
  },
  spot_exam_traps: {
    id: 'spot_exam_traps',
    pillTitle: '🕵️ Spot the Traps',
    title: 'Be the Teacher: Spot Calculation Traps & Unit-Digit Faults',
    tag: 'Diagnostic Thinking',
    lead: 'Diagnose flawed test slips from fictitious students. Learn how <strong>unit-digit deduction</strong> catches wrong answers in 0.1 seconds without full arithmetic!',
    renderContent: (...args) => renderSpotExamTrapsModule(...args)
  }
};

