# 🏛️ Technical Architecture & Developer Guide

This document details the architectural decisions, code conventions, state management models, responsive layout rules, and authoring recipes for the **5th Grade CBSE Interactive Learning Hub**.

---

## 1. Architectural Philosophy

1. **Zero Runtime Dependencies**:
   - The entire platform is built with vanilla **HTML5**, **CSS3**, and **ES6+ JavaScript**.
   - No node modules, no bundlers (Webpack, Vite, Rollup), and no external JavaScript frameworks.
   - Every mini-app runs directly by double-clicking `index.html` or serving static assets via GitHub Pages.
2. **Offline-First & Fast Loading**:
   - Audio feedback is synthesized on the fly via the browser's native **Web Audio API** (`AudioContext`). No audio asset files (MP3/WAV) to download or fail over slow connections.
   - Vector graphics use inline SVG, guaranteeing crisp visuals at 1x, 2x, or 3x device pixel ratios.
3. **Modular Subject Mini-Apps**:
   - The root (`index.html`) acts as a central springboard.
   - Each subject resides in an isolated directory (`social_sicence_maps/`, `english_grammer/`, etc.) with its own `index.html`, `styles.css`, and `app.js`.
   - Mini-apps share design tokens and visual consistency, but maintain independent runtimes so bugs in one subject never cascade to another.

---

## 2. Design System & CSS Tokens

Both mini-apps and the central hub inherit a shared glassmorphic dark design system:

```css
:root {
  /* Color Palette */
  --bg-primary: #0a0f1d;
  --bg-secondary: #0f172a;
  --bg-card: rgba(15, 23, 42, 0.75);
  --bg-glass: rgba(255, 255, 255, 0.03);
  --bg-glass-hover: rgba(255, 255, 255, 0.07);

  /* Border & Glass */
  --border-glass: 1px solid rgba(255, 255, 255, 0.08);
  --border-glass-active: 1px solid rgba(16, 185, 129, 0.35);

  /* Typography */
  --font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Theme Accents (Per subject accents) */
  --accent-green: #10b981;    /* English Grammar accent */
  --accent-cyan: #06b6d4;     /* Secondary cyan */
  --accent-blue: #3b82f6;     /* Social Science Maps accent */
  --accent-purple: #8b5cf6;   /* Analytical callouts */
  --accent-amber: #f59e0b;    /* Warning / timer / highlight */
  --accent-red: #ef4444;      /* Incorrect state */

  /* Dimensions */
  --sidebar-width: 280px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;
}
```

---

## 3. Mobile-First Responsive Drawer Pattern

To provide equal usability for students on desktop monitors, iPads, and budget smartphones, the application employs an **Off-Canvas Responsive Drawer** pattern.

### The Stacking Context Pattern

```
┌────────────────────────────────────────────────────────┐
│ .app-container (position: relative; z-index: 1)         │
│                                                        │
│  ├── .sidebar-backdrop (position: fixed; z-index: 95)  │
│  │    (Dims and blurs main content when drawer opens)   │
│  │                                                     │
│  ├── .sidebar (position: fixed; z-index: 100)          │
│  │    (Slides out: transform: translateX(-100% -> 0))   │
│  │                                                     │
│  └── .main-content (position: relative; z-index: 5)   │
│       ├── .top-bar (position: sticky; top: 0; z: 20)   │
│       └── .content-area                                │
└────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **Stacking Context Rule**: `.sidebar-backdrop` and `.sidebar` **MUST** be direct siblings inside `.app-container`. If `.sidebar-backdrop` is placed outside `.app-container` while `.app-container` has `z-index: 1`, the backdrop will render *in front* of the sidebar and intercept all click events.

### Breakpoint Strategy

- **`> 860px` (Desktop)**:
  - Sidebar is permanently pinned (`position: fixed; width: 280px;`).
  - Main content has `margin-left: 280px`.
  - Mobile hamburger toggle (`.menu-toggle-btn`) is hidden (`display: none`).
- **`≤ 860px` (Tablets & Smartphones)**:
  - Sidebar is off-canvas (`transform: translateX(-100%)`).
  - Tapping `☰ Topics` toggles class `.open` on `.sidebar` and `.active` on `.sidebar-backdrop`.
  - Mode switcher (`Learn`, `Practice`, `Challenge`) transforms into a 3-column segmented button grid with min 42px touch height.
  - Options and buttons have min 48px height with touch-action set to `manipulation` to prevent 300ms mobile tap delays.
- **`≤ 400px` (Compact Smartphones)**:
  - Subtitles hide from top header to prioritize topic readability.
  - Option padding adjusts for 320px–360px screens.

---

## 4. Mini-App Specifications

### A. English Grammar Master (`/english_grammer/`)

#### State Model
```javascript
const state = {
  currentTopic: null,          // e.g. 'articles', 'simple-tenses'
  currentMode: 'learn',        // 'learn' | 'practice' | 'challenge'
  exerciseIndex: 0,            // Current question pointer
  shuffledExercises: [],       // Randomized exercise array for this run
  score: {
    correct: 0,
    incorrect: 0,
    total: 0
  },
  answered: false,             // Prevents double-clicking options
  timeLeft: 0,                 // Countdown timer in seconds (Challenge mode)
  timerInterval: null
};
```

#### Topic Data Schema
Every grammar topic in `TOPIC_DATA` adheres to this schema:
```javascript
TOPIC_DATA['topic_id'] = {
  id: 'topic_id',
  title: 'Human Readable Title',
  subtitle: 'Catchy Subtitle (e.g., The Time Detective)',
  icon: '🔍',
  lesson: {
    intro: 'High-level intro paragraph.',
    sections: [
      {
        title: 'Section Heading',
        content: '<p>Pedagogical explanation with <strong>bold</strong> emphasis.</p>',
        examples: [
          { text: '<span class="correct">Example text</span> — reason why.' }
        ],
        think: '🧠 Intuitive rule of thumb (e.g. "The" points your finger).'
      }
    ]
  },
  exercises: [
    {
      type: 'mcq' | 'fill' | 'spot',
      question: 'Question text or sentence with ___ blank',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 0, // 0-indexed correct option index
      explanation: 'Clear explanation of why option A is correct and others are wrong.'
    }
  ]
};
```

#### Native Audio Synthesizer
Instead of downloading external audio files, `app.js` synthesizes sounds using the Web Audio API:
- **Correct Sound**: Dual ascending chime (523.25 Hz [C5] -> 659.25 Hz [E5]) with smooth exponential gain decay.
- **Incorrect Sound**: Low descending buzz (220 Hz [A3] -> 180 Hz) using a `sawtooth` wave.

---

### B. Social Science Maps (`/social_sicence_maps/`)

#### Coordinate System & SVG Engine
- Maps are rendered in responsive SVG viewports (`viewBox="0 0 800 600"`).
- Each geographic entity (province, desert, water body, capital city) is defined as an SVG `<path>`, `<polygon>`, or `<circle>` with:
  - `class="region"`
  - `data-id="unique-region-id"`
  - `data-name="Display Name"`
- Hover and selection states are purely CSS-driven via SVG presentation attributes (`fill`, `stroke`, `stroke-width`, `filter`).

#### Worksheet Print Engine (`@media print`)
- Automatically hides UI chrome (`.sidebar`, `.top-bar`, `.btn`, timer, feedback).
- Inverts SVG fills to pure ink-saving white with dark `#333` strokes.
- Renders an automated student metadata header:
  `Name: ____________________   Class: 5th ____   Date: __________`
- Appends numbered answer lines matching the active map's regions.

---

## 5. Developer Recipes & Extension Guides

### Recipe 1: Adding a New English Grammar Topic
1. Open `english_grammer/app.js`.
2. Add a new key to the `TOPIC_DATA` object matching the schema in Section 4.
3. Include at least 8–12 questions with varied types (`mcq`, `fill`, `spot`).
4. The sidebar, stars tracker, lesson viewer, and challenge modes will automatically discover and render the new topic with zero additional HTML changes.

### Recipe 2: Adding a New Subject Card to the Main Hub
1. Open `index.html`.
2. Locate the `.subjects-grid` container.
3. Replace the "coming-soon" placeholder card with an active link:
   ```html
   <a href="subject_folder/index.html" class="subject-card" id="card-subject">
     <div class="card-icon theme-purple">🔢</div>
     <div class="card-content">
       <h3>Subject Name</h3>
       <p>Brief 1-sentence description of what students will learn.</p>
       <div class="card-meta">
         <span class="meta-tag">6 Chapters</span>
         <span class="meta-tag">Interactive</span>
       </div>
     </div>
     <div class="card-footer">
       <span class="card-status status-ready">
         <span class="status-dot"></span> Ready to Practice
       </span>
       <span class="card-arrow">→</span>
     </div>
   </a>
   ```
4. Create `subject_folder/` following the zero-dependency structure.

---

## 6. Testing & Quality Checklist

Before committing changes to this repository, verify:

- [ ] **Mobile Viewport (390px × 844px)**: Drawer slides out cleanly, backdrop dims background, all buttons have min 44px touch height, no horizontal scrolling.
- [ ] **Desktop Viewport (1280px × 800px)**: Sidebar stays pinned, layout fills viewport comfortably.
- [ ] **Zero Console Errors**: Open Developer Tools (`F12`) and ensure 0 uncaught exceptions or network 404s.
- [ ] **Keyboard & Focus Accessibility**: Tab key navigates between interactive buttons; `Escape` key closes drawers/modals.
- [ ] **Cartographic Integrity**: Indian boundaries strictly respect Survey of India demarcations.
