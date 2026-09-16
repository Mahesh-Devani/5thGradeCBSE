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
4. **Seamless State Persistence & Session Recovery**:
   - Every subject automatically saves the student's active topic, mode (`learn`, `practice`, `challenge`, `worksheet`), subtabs, filters, and earned stars to `localStorage`.
   - On page refresh or reopening, the application immediately resumes where the student left off instead of bouncing to a welcome screen.
   - **Future Scope (User Accounts & Cloud Sync)**: In future phases, student authentication (Google Sign-In or direct accounts) will be integrated to sync progress across devices. All client-side `localStorage` state schemas are modeled as clean, JSON-serializable payloads to ensure friction-free sync with user profiles.

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

### C. हिंदी व्याकरण व रचना (`/hindi_vyakaran/`)

#### Tri-Module State Model
```javascript
const state = {
  activeModule: 'vakyansh',     // 'vakyansh' (Default) | 'sangya' | 'chitra'
  currentSceneId: 'park',       // Active picture scene ('park', 'rainy', 'school', etc.)
  imageViewMode: 'real',        // 'real' (Default Exam Photo) | 'cartoon' (Vector SVG)
  isBWMode: false,              // false (Default Full Color) | true (B&W Exam Print)
  chitraMode: 'explore',        // 'explore' | 'vocab' | 'puzzle' | 'write'
  vakyanshMode: 'learn',        // 'learn' | 'match' | 'quiz' | 'challenge'
  sangyaMode: 'learn',          // 'learn' | 'sort' | 'quiz' | 'challenge'
  sangyaSubtab: 'types',        // 'types' | 'mirror' | 'lab'
  sangyaLabFilter: 'all',       // 'all' | 'jati' | 'visheshan' | 'kriya'
  showEnglish: true,            // Real-time bilingual gloss toggle
  activeHotspotId: null,
  vocabFilter: 'all',
  vakyanshFilter: 'all',        // 'all' | 'behavior' | 'action' | 'nature'
  stars: {},                    // Chitra Varnan stars per scene (0-3 each)
  vakyanshStars: 0,             // Vakyansh challenge stars (0-3)
  sangyaStars: 0,               // Sangya challenge stars (0-3)
  sangyaSortState: { items: [], currentIndex: 0, score: 0, streak: 0, answered: false },
  sangyaQuizState: { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false },
  sangyaChallengeState: { timer: 60, timerInterval: null, qIndex: 0, score: 0, streak: 0, answered: false }
};
```

#### Sangya Data Schemas
- **5 Types (`SANGYA_TYPES_DATA`)**: Schema for Proper, Common, Abstract, Material, and Collective nouns with bilingual definition, clue, examples, and exam trap.
```javascript
{
  id: 'proper',                 // 'proper' | 'common' | 'abstract' | 'material' | 'collective'
  titleHi: 'व्यक्तिवाचक संज्ञा',
  titleEn: 'Proper Noun',
  badge: 'विशेष नाम • केवल एक (Unique)',
  themeClass: 'theme-proper',
  defHi: 'किसी विशेष व्यक्ति, विशेष स्थान या विशेष वस्तु के नाम को व्यक्तिवाचक संज्ञा कहते हैं।',
  defEn: 'Name of a specific person, specific place, or specific object.',
  clueHi: 'यह दुनिया में अपने प्रकार का केवल एक होता है। इसका बहुवचन नहीं बनता।',
  clueEn: 'Represents a one-of-a-kind entity; plural form is typically not used.',
  examples: ['भारत', 'गंगा', 'हिमालय', 'महात्मा गांधी', 'रामायण', 'दिल्ली', 'सोमवार', 'सचिन'],
  trapHi: '⚠️ परीक्षा सावधानी: ‘नदी’ जातिवाचक है, किंतु ‘गंगा’ व्यक्तिवाचक है।'
}
```

- **Comparison Mirror (`SANGYA_COMPARISON_DATA`)**: Traps and contrasts (e.g. Proper vs Common, Material vs Common, Collective vs Common).
```javascript
{
  typeA: 'जातिवाचक संज्ञा (Common)',
  wordA: 'नदी (River)',
  typeB: 'व्यक्तिवाचक संज्ञा (Proper)',
  wordB: 'गंगा (Ganga)',
  reason: '‘नदी’ दुनिया की किसी भी नदी के लिए प्रयुक्त हो सकती है, जबकि ‘गंगा’ एक विशेष पवित्र नदी का नाम है।'
}
```

- **Abstract Formation Lab (`BHAVVACHAK_NIRMAN_DATA`)**: Derivation of abstract nouns from common nouns, adjectives, and verbs with suffixes.
```javascript
{
  originType: 'jati',           // 'jati' (Common Noun) | 'visheshan' (Adjective) | 'kriya' (Verb)
  baseWord: 'मित्र',
  baseMeaning: 'Friend',
  abstractNoun: 'मित्रता',
  abstractMeaning: 'Friendship',
  suffix: '+ ता',
  sentenceHi: 'कृष्ण और सुदामा की मित्रता अमर है।'
}
```

#### Vakyansh Data Schema (`VAKYANSH_DATA`)
```javascript
{
  id: 1,
  phraseHi: 'जो कभी न मरे',
  phraseEn: 'One who never dies',
  wordHi: 'अमर',
  wordEn: 'Immortal',
  translit: 'Amar',
  formula: 'अ (नहीं) + मर (मरना)',
  clue: 'देवलोक के देवता और देश के अमर शहीद कभी नहीं मरते।',
  exampleHi: 'भगत सिंह देश के लिए अपना बलिदान देकर अमर हो गए।',
  exampleEn: 'Bhagat Singh became immortal by sacrificing his life for the nation.',
  oppositeHi: 'मर्त्य (नाशवान)',
  category: 'nature' // 'behavior' | 'action' | 'nature'
}
```

#### Chitra Varnan Scene Schema (`SCENE_DATA`)
```javascript
{
  id: 'park',
  title: 'बगीचा / बाल उद्यान',
  titleEn: 'Children Park & Playground',
  subtitle: 'हरे-भरे पेड़, झूले, फिसलपट्टी और खेलते हुए बच्चे',
  icon: '🌳',
  realImage: 'images/scene_park_real.jpg',
  hotspotsReal: [{ id: 1, x: 39, y: 55 }, ...],  // Coordinates mapped to real exam photo
  hotspots: [                                      // Coordinates & linguistic data for SVG
    {
      id: 1, x: 35, y: 57,
      title: 'झूला (Swing)',
      translit: 'Jhoola',
      meaningEn: 'Swing',
      type: 'संज्ञा (Noun)',
      sentenceHi: 'एक बच्चा आनंद से झूले पर झूल रहा है।',
      sentenceEn: 'A child is joyfully swinging on the swing.'
    },
    ...
  ],
  svg: '<svg>...</svg>',
  puzzleSteps: [ ... ],
  modelAnswer: { steps: [...], fullParagraphHi: '...', fullParagraphEn: '...', tips: [...] }
}
```

#### Exam Simulation Controls
- **Real Photo vs Vector Cartoon**: Toggled via `#btn-view-real` and `#btn-view-cartoon`. Numbered hotspots dynamically remap between `hotspotsReal` and `hotspots`.
- **Black & White Exam Paper Print**: Toggled via `#btn-toggle-bw`. Applies `.bw-exam-mode` with CSS `filter: grayscale(100%) contrast(1.25) brightness(0.95);` to simulate photocopied school examination question sheets.

---

### D. Mathematics Mini-App (`/maths/`)

#### Directory Structure
```
maths/
├── index.html                      # App shell, responsive off-canvas drawer, top bar, modals
├── styles.css                      # Modern glassmorphic theme (Amber/Emerald/Indigo), division ladders, print sheet
├── app.js                          # State engine, interactive calculators, solvers, practice pools, Web Audio
├── README.md                       # Pedagogical guide & curriculum reference
├── AGENTS.md                       # Operational rules, DOM contract, and extension recipes
└── Multiples_and_Factors_...pdf    # Reference school worksheet PDF
```

#### State Machine (`app.js`)
```javascript
const state = {
  activeMode: 'learn',              // 'learn' | 'practice' | 'challenge' | 'worksheet'
  activeLearnModule: 'hcf_lcm_detective', // 'hcf_lcm_detective' | 'short_division' | 'long_division' | 'product_formula' | 'coprimes_twinprimes'
  practiceFilter: 'all',            // 'all' | 'school_worksheet' | 'word_problems' | 'division_methods' | 'formula_relations'
  currentQuestionIndex: 0,
  scoreCorrect: 0,
  scoreWrong: 0,
  userAnswers: {},
  challengeActive: false,
  challengeTimeLeft: 60,
  challengeTimerId: null,
  challengeQuestions: [],
  challengeIndex: 0,
  challengeCorrect: 0,
  stars: 0                          // Stars earned (0-3)
};
```

#### Math Engine Algorithms
- **Short Division HCF**: Prime divisor MUST divide all numbers simultaneously; stops when no prime divides all.
- **Short Division LCM**: Prime divisor divides at least 2 numbers; non-divisible numbers are brought down unchanged until all reach 1.
- **Long Division HCF (Euclid)**: Successive division where each remainder becomes the next divisor.
- **Product Formula**: Verified balance $a \times b = \text{HCF} \times \text{LCM}$.

---

### E. Social Science (SST) Chapters Practice Mini-App (`/sst_chapters/`)

#### Directory Structure
```
sst_chapters/
├── index.html                      # App shell, responsive off-canvas drawer, top bar, modals
├── styles.css                      # Modern dark theme (Gold/Emerald/Rose/Blue), Chunk & Conquer UI, print layout
├── app.js                          # State engine, 4 Term 1 chapters, Long Answer Scaffolder, Web Audio, Confetti
├── README.md                       # Comprehensive guide, pedagogical principles, extension schema
└── REV_WS_T1_G5__1788952775.pdf    # Term 1 school revision worksheet
```

#### State Machine & Storage Keys (`app.js`)
- **Active State (`cbse5_sst_active_state`)**:
  ```javascript
  {
    activeChapterId: 'ch5_drc',       // 'ch5_drc' | 'ch7_saudi' | 'ch17_british_raj' | 'ch20_government'
    activeMode: 'learn',              // 'learn' | 'practice' | 'challenge' | 'worksheet'
    activePracticeFilter: 'all',      // 'all' | 'blank' | 'tf' | 'match' | 'short' | 'long'
    practiceIndex: 0,
    practiceAnswered: { qId: { answered: true, correct: true, studentAnswer: '...' } },
    practiceScore: { correct: 0, incorrect: 0 },
    studentDrafts: { qId: '...' }      // Free-form student essay/bullet drafts
  }
  ```
- **Star Progress (`cbse5_sst_stars_<chapterId>`)**: Tracks 0–3 stars earned per chapter.

#### Long Answer Chunk & Conquer Engine
- Breaks heavy 5-mark subjective questions into 3–4 bite-sized visual **Pillars**.
- Real-time client-side keyword detector monitors student drafts and highlights covered concepts without test anxiety.
- Standard CBSE 5-mark model answer presentation with bold keywords and examiner formatting tips.

---

## 5. Developer Recipes & Extension Guides

### Recipe 1: Adding a New English Grammar Topic
1. Open `english_grammer/app.js`.
2. Add a new key to the `TOPIC_DATA` object matching the schema in Section 4.A.
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

### Recipe 3: Adding a New Hindi Sangya Word, Formation Pair, or Quiz Question
1. **Adding to 5-Bucket Classifier**: In `hindi_vyakaran/app.js`, append an object to `SANGYA_SORT_ITEMS`:
   ```javascript
   { word: 'सोना', type: 'material', hint: 'मापा या तौला जाता है (Material)', en: 'Gold' }
   ```
2. **Adding to Abstract Formation Lab**: Append an object to `BHAVVACHAK_NIRMAN_DATA`:
   ```javascript
   { originType: 'jati', baseWord: 'शिशु', baseMeaning: 'Infant', abstractNoun: 'शैशव', abstractMeaning: 'Infancy', suffix: '+ अ', sentenceHi: 'शैशव काल जीवन का सबसे कोमल समय होता है।' }
   ```
3. **Adding to Practice Quiz**: Append a question object to `SANGYA_QUIZ_POOL`:
   ```javascript
   { question: '...', options: ['A', 'B', 'C', 'D'], correct: 0, clue: '...', explanation: '...', explanationEn: '...' }
   ```

### Recipe 4: Adding a New Hindi Vakyansh Statement
1. Open `hindi_vyakaran/app.js`.
2. Append a new object to `VAKYANSH_DATA` with `id`, `phraseHi`, `phraseEn`, `wordHi`, `wordEn`, `translit`, `formula`, `clue`, `exampleHi`, `exampleEn`, `oppositeHi`, and `category`.
3. Add corresponding multiple-choice question(s) to `VAKYANSH_QUIZ_POOL`.
4. The Learn card grid, search bar, Match Game, Practice Quiz, and 60s Challenge will automatically include the new phrase!

### Recipe 5: Adding a New Chitra Varnan Scene
1. Save the authentic exam photograph in `hindi_vyakaran/images/scene_<id>_real.jpg`.
2. In `hindi_vyakaran/app.js`, append a new scene object to `SCENE_DATA` with `id`, `title`, `realImage`, `hotspotsReal`, `hotspots`, `svg`, `puzzleSteps`, and `modelAnswer`.
3. The sidebar scene list, navigation, hotspot renderer, and progress tracker will automatically recognize the new scene.

### Recipe 6: Adding a New Mathematics Topic (e.g. Divisibility Rules)
1. In `maths/index.html`, remove `.disabled` from the corresponding topic in `.sidebar-topics` and update the badge to `Ready`.
2. In `maths/app.js`, add the topic's learn modules and practice question objects to `PRACTICE_POOL`.
3. The curriculum drawer, progress bar, practice filters, and challenge pool will dynamically scale to include the new topic.

---

## 6. Testing & Quality Checklist

Before committing changes to this repository, verify:

- [ ] **CSS Brace Balance (MANDATORY)**: Run `node -e "const css=require('fs').readFileSync('<path_to_css>','utf8');let o=0;for(let c of css){if(c==='{')o++;if(c==='}')o--;}console.log(o);"` to ensure open brace count is strictly `0`. (An unclosed brace silently kills all subsequent `@media` queries!).
- [ ] **Mobile Viewport (390px × 844px)**: Drawer slides out cleanly, backdrop dims background, all buttons have min 44px touch height, no horizontal scrolling (`overflow-x: hidden`).
- [ ] **Desktop Viewport (1280px × 800px)**: Sidebar stays pinned, layout fills viewport comfortably.
- [ ] **Zero Console Errors**: Open Developer Tools (`F12`) and ensure 0 uncaught exceptions or network 404s.
- [ ] **Bilingual Toggle Verification**: English translation labels appear and disappear correctly when toggled.
- [ ] **Keyboard & Focus Accessibility**: Tab key navigates between interactive buttons; `Escape` key closes drawers/modals.
- [ ] **Cartographic Integrity**: Indian boundaries strictly respect Survey of India demarcations.
