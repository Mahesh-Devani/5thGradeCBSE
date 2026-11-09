# 🤖 Agent Guidelines — English Grammar Master

Welcome, AI Agent! This document contains the operational rules, DOM contracts, data schemas, audio patterns, and architectural gotchas for maintaining and extending the **English Grammar Master** mini-app (`english_grammer/`).

---

## 1. Pedagogical Directives (Class 5 CBSE)

1. **Thinking Over Memorizing**:
   - Never present grammar rules as sterile mathematical formulas to be memorized blindly.
   - Use intuitive mental models and detective analogies:
     - **Articles**: *The Finger Pointer* (sound rules, not spelling).
     - **Continuous Tenses**: *The Snapshot Camera* (freezing live actions).
     - **Present Perfect**: *The Invisible Thread* (past action tethered to right now).
     - **Past Perfect**: *The Time Traveler* (the event that occurred *first* in the past).
     - **Personification**: *The Magic Wand* (human feelings to inanimate objects).
     - **Hyperbole**: *The Mega Magnifier* (playful, intentional exaggeration).
2. **Accessible Feedback**:
   - Practice and quiz explanations must explain **both** why the correct answer succeeds AND why the attractive distractors fail.

---

## 2. DOM Contract (`index.html` ↔ `app.js`)

Do **NOT** rename, remove, or alter the IDs of these DOM elements. They are hard-referenced in `app.js`:

| Element ID | Element Type | Role in `app.js` |
|---|---|---|
| `confetti-canvas` | `<canvas>` | Full-screen canvas for celebratory confetti particles |
| `feedback-flash` | `<div>` | Screen border flash indicator (green for correct, red for incorrect) |
| `sidebar` | `<aside>` | Sidebar drawer container |
| `sidebar-backdrop` | `<div>` | Blurred dimming overlay when mobile drawer is open |
| `sidebar-close-btn` | `<button>` | Close button (✕) inside the sidebar header |
| `menu-toggle-btn` | `<button>` | Hamburger button (☰ Topics) in mobile sticky top bar |
| `sidebar-topics` | `<div>` | Container populated dynamically by `renderSidebar()` |
| `progress-fill` | `<div>` | Width set dynamically (`pct + '%'`) based on stars earned |
| `progress-label` | `<div>` | Star progress counter (e.g., `"42 / 70 stars earned"`) |
| `top-bar-title` | `<h2>` | Displays active topic title |
| `top-bar-subtitle` | `<p>` | Displays active topic subtitle |
| `btn-passport` | `<button>` | Top bar Passport button displaying `⭐ X/10 Passport` |
| `btn-modal-passport` | `<button>` | Modal action to open Passport directly from Results modal |
| `passport-modal` | `<div>` | Learning Passport modal backdrop and container |
| `passport-icon` | `<div>` | Topic emoji icon in Passport header |
| `passport-title` | `<h3>` | Topic title in Passport header |
| `passport-subtitle` | `<p>` | Subtitle / audit summary in Passport header |
| `passport-stars-display` | `<div>` | `⭐ X / 10 Stars Earned` tally in Passport summary bar |
| `passport-progress-fill` | `<div>` | Progress percentage bar in Passport summary |
| `passport-status-text` | `<div>` | Status text showing completion percentage and remaining milestones |
| `passport-milestones-list` | `<div>` | Dynamic container rendering all 10 milestone cards |
| `passport-guarantee-box` | `<div>` | Official Parent & Teacher Mastery Certificate seal (visible at 10/10) |
| `btn-passport-action` | `<button>` | Smart action button navigating to next pending milestone mode |
| `btn-passport-close` | `<button>` | Close button in Passport footer |
| `btn-passport-close-x` | `<button>` | Close button (✕) in Passport header |
| `btn-reset` | `<button>` | Resets stored progress for the active topic |
| `tab-learn` | `<button>` | Mode tab switching to `learn` |
| `tab-practice` | `<button>` | Mode tab switching to `practice` |
| `tab-challenge` | `<button>` | Mode tab switching to `challenge` |
| `welcome-screen` | `<div>` | Landing hero screen displayed when no topic is selected |
| `welcome-start-btn` | `<button>` | CTA button opening the drawer or starting the first topic |
| `content-area` | `<div>` | Main dynamic viewport where lessons, practice cards, and timed drills render |
| `results-modal` | `<div>` | Modal dialog rendered upon completing challenge mode |
| `result-emoji` | `<div>` | Modal emoji header (🏆 / ⭐ / 💪) |
| `result-title` | `<h3>` | Modal heading text |
| `result-stars` | `<div>` | Rendered star icons (⭐⭐⭐) |
| `result-message` | `<p>` | Personalized encouraging message |
| `result-correct` | `<div>` | Score count of correct questions |
| `result-total` | `<div>` | Total question count |
| `btn-retry` | `<button>` | Modal action to restart challenge |
| `btn-review` | `<button>` | Modal action to switch to Learn mode |
| `btn-close-modal` | `<button>` | Closes results modal |

---

## 3. Data Schema & Content Architecture

Topics are defined in `TOPIC_DATA` inside `app.js` with 10 Mastery Stars and diagnostic exam traps:

```javascript
TOPIC_DATA['articles'] = {
  id: 'articles',
  title: 'Articles',
  subtitle: 'The Article Detective 🔍',
  icon: '🔍',
  color: '#3b82f6',
  targetStars: 10,
  examTraps: [
    {
      trap: 'Looking at spelling letters instead of the starting SOUND for A vs An.',
      truth: '"University" starts with vowel letter \'u\', but sounds like "yoo-niversity" (consonant sound). So say "A university"!'
    }
  ],
  lesson: {
    intro: 'Articles are tiny words...',
    sections: [
      {
        title: '🅰️ "A" — Any One Thing',
        content: '<p>Use "a" before words that start with a consonant SOUND.</p>',
        examples: [{ text: '<span class="correct">a</span> ball' }],
        think: '💡 It\'s about the SOUND, not the letter!'
      }
    ]
  },
  exercises: [
    {
      type: 'fill', // 'mcq' | 'fill'
      question: 'She waited for ___ hour.',
      options: ['a', 'an', 'the', 'no article'],
      correct: 1, // 0-based index of correct option
      explanation: '"Hour" starts with a silent "h", so the starting sound is "our" (vowel sound) → use "an"!'
    }
  ]
};
```

### 10-Star Milestone Architecture Schema

Every topic must have an array of 10 pedagogical milestones in `TOPIC_MILESTONES[topicId]`:

```javascript
TOPIC_MILESTONES['articles'] = [
  {
    id: 'learn_foundations',
    title: 'Foundation: Indefinite Articles (A vs An)',
    desc: 'Understand and complete Lesson Cards 1 & 2.',
    hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 1 & 2.',
    check: (d) => !!(d.sectionsRead && d.sectionsRead[0] && d.sectionsRead[1])
  },
  // ... Star 2 to Star 10
];
```

The milestone evaluation engine receives `d = getTopicProgressData(topicId)` containing:
- `sectionsRead`: map of section indices marked understood
- `trapsDiagnosed`: map of diagnosed exam traps
- `totalSolved`: total questions answered in practice mode
- `correctSolved`: correct answers in practice mode
- `mcqSolved`: MCQ questions solved
- `fillSolved`: fill-in-the-gap questions solved
- `answered`: map of question index to `{ answered, correct }`
- `challengeHighScore`: high score achieved in 15-second timed Challenge mode

---

## 4. Native Web Audio Synthesizer

Audio feedback uses the native HTML5 Web Audio API `AudioContext` with zero external audio files.

```javascript
// Synthesizer patterns in app.js:
playClickSound();   // Quick 600Hz blip (30ms) for button taps
playCorrectSound(); // Ascending pleasant arpeggio (C5 -> E5 -> G5)
playWrongSound();   // Low buzz (180Hz -> 140Hz descending sawtooth)
playFanfare();      // Celebratory multi-tone fanfare for 3-star challenge victory
```

**Rule:** Never add `<audio>` tags or link `.mp3`/`.wav` files. Always route audio through `playTone()`.

---

## 5. Mobile Drawer & CSS Isolation Gotchas

1. **CSS Brace Balance Check**:
   Before committing, verify `styles.css` has zero unclosed braces:
   ```bash
   node -e "const css=require('fs').readFileSync('styles.css','utf8');let o=0;for(let c of css){if(c==='{')o++;if(c==='}')o--;}console.log('Open braces:',o);"
   ```
   An unclosed brace before `@media (max-width: 860px)` silently breaks the mobile drawer.

2. **Mobile Container Stack**:
   On mobile screens (`≤ 860px`):
   - `.app-container` must be `flex-direction: column; width: 100%; overflow-x: hidden;`.
   - `.sidebar` is positioned `fixed; left: -100%; top: 0; bottom: 0; z-index: 1000;`.
   - Adding class `.sidebar-open` to `.sidebar` slides it in (`left: 0;`).
   - `.sidebar-backdrop` sits at `z-index: 999;` as a sibling element, dimming the content underneath.

3. **Touch Targets**:
   All interactive buttons, mode tabs, and quiz option cards must have a minimum tap height of **44px to 50px** with `touch-action: manipulation;`.

4. **State & Session Persistence Across Refreshes (MANDATORY)**:
   - When users switch topics or modes (`learn`, `practice`, `challenge`), active state is saved to `localStorage` via `saveActiveState()`.
   - On `init()`, `loadActiveState()` checks for saved topic/mode and resumes directly without showing the welcome screen.
   - Storage key: `grammar-master-active-state`.
   - **Future Scope (User Accounts)**: In upcoming phases, Google Sign-In or direct account sync will be added. Ensure JSON state payloads remain clean and serializable.

---

## 6. How to Add a New Grammar Topic (e.g. Prepositions)

1. Open `app.js` and locate `const TOPIC_ORDER = [...]`. Add your new topic ID:
   ```javascript
   const TOPIC_ORDER = [
     'articles',
     'simple_tenses',
     'continuous_tenses',
     'personification',
     'present_perfect',
     'past_perfect',
     'hyperbole',
     'prepositions' // <--- New topic
   ];
   ```
2. In `TOPIC_DATA`, add the topic definition matching the schema in Section 3 with:
   - At least 2-3 structured `lessons`.
   - At least 8-10 thinking-based `exercises`.
3. Update `progress-label` maximum star count calculation (each topic yields 3 stars: `TOPIC_ORDER.length * 3`).
4. Validate syntax:
   ```bash
   node -c app.js
   ```

---

## 7. Pre-Commit Verification Checklist

- [ ] `node -c app.js` runs with exit code 0.
- [ ] `styles.css` has `Open braces: 0`.
- [ ] Tested on mobile viewport (390px × 844px) with zero horizontal scroll (`overflow-x: hidden`).
- [ ] Off-canvas drawer opens smoothly via `☰ Topics` and closes upon topic selection.
- [ ] Practice mode provides instant feedback with explanations.
- [ ] Challenge mode timer counts down, awards stars, and triggers confetti.
