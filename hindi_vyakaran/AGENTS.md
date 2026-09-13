# 🤖 AGENTS.md — Hindi Vyakaran & Rachna Guidelines

> **Target Audience:** Future AI coding agents (Antigravity, Gemini, Claude, GPT, etc.) and software engineers maintaining or extending `hindi_vyakaran/`.

---

## 📌 1. Project Overview

- **Module Name:** हिंदी व्याकरण व रचना (Hindi Vyakaran & Creative Composition)
- **Target Audience:** Class 5 CBSE Students (Ages 9–11).
- **Pedagogical Goal:** Deductive, logic-first learning — teaching word formation rules (उपसर्ग, प्रत्यय, संधि) and structured writing (5-Step Golden Formula) rather than rote memorization.
- **Core Files:**
  - [`index.html`](index.html): Semantic layout, mobile off-canvas drawer, top bar controls, and dual workspaces.
  - [`styles.css`](styles.css): Saffron glassmorphic design system, CSS variables, B&W exam print filter, responsive media queries.
  - [`app.js`](app.js): Pure vanilla ES6+ engine (`HindiLearningApp`), state management, Web Audio synthesizer, and canvas confetti.
  - [`images/`](images/): High-resolution authentic exam-style photographs for all 6 scenes.
  - [`README.md`](README.md): Pedagogical reference, formula cheat sheet, and curriculum catalog.

---

## 🏛️ 2. Dual-Module Architecture

The application hosts two primary curriculum modules switchable via `switchModule(moduleName)`:

```
                  ┌──────────────────────────────┐
                  │      HindiLearningApp        │
                  └──────────────┬───────────────┘
                                 │
             ┌───────────────────┴───────────────────┐
             ▼                                       ▼
  🔤 वाक्यांश के लिए एक शब्द               🖼️ रचनात्मक लेखन: चित्र वर्णन
  (Module: 'vakyansh' — DEFAULT)          (Module: 'chitra')
  ├── 1. 📖 सीखें व समझें (Cards & Search) ├── 1. 🔍 चित्र अवलोकन (Hotspots)
  ├── 2. 🃏 मिलान खेल (Memory Match Game) ├── 2. 🔤 शब्द भंडार (Vocab Bank)
  ├── 3. ❓ अभ्यास क्विज़ (12 MCQ Quiz)   ├── 3. 🧩 वाक्य खेल (Jumbled Puzzle)
  └── 4. 🎯 60s स्पीड चैलेंज (Timed)      └── 4. ✍️ आदर्श उत्तर व नोटपैड
```

### Module 1: वाक्यांश के लिए एक शब्द (`vakyansh` — Default Topic)
- **12 CBSE Statements**: Broken down into prefixes, roots, and intuitive mental models.
- **Data Source**: `VAKYANSH_DATA` array and `VAKYANSH_QUIZ_POOL` array in `app.js`.
- **Search & Filter**: Real-time keyword filter across Hindi and English translations, plus category chips (*स्वभाव व आचरण*, *कर्म व परिश्रम*, *जीवन व प्रकृति*).

### Module 2: रचनात्मक लेखन: चित्र वर्णन (`chitra`)
- **6 CBSE Exam Scenes**: Park, Rainy Day, School Sports Day, Birthday Party, Village Morning, Zoo Excursion.
- **5-Step Golden Formula**:
  1. स्थान परिचय (Setting the Scene)
  2. वातावरण व मौसम (Atmosphere / Weather)
  3. मुख्य गतिविधि (Primary Actions)
  4. बारीक विवरण (Subtle Details & Objects)
  5. निष्कर्ष / भाव (Overall Emotion & Conclusion)

---

## 📷 3. Exam Photograph & Monochrome Print Features

CBSE Class 5 examinations present students with real photographs printed on black & white question papers. To provide authentic exam readiness, the app implements two dedicated view toggles:

### A. Real Exam Photo vs. Cartoon Illustration (`this.state.imageViewMode`)
- **Default**: `'real'` (Authentic photograph).
- **Alternative**: `'cartoon'` (Clean SVG vector illustration).
- **Dynamic Hotspot Mapping**:
  - SVG cartoons use coordinates in `scene.hotspots` (`{ x, y }`).
  - Real photographs use coordinates in `scene.hotspotsReal` (`{ x, y }`).
  - `getSceneHotspots(scene)` automatically selects the correct coordinate set.

### B. Black & White Exam Paper Print Simulation (`this.state.isBWMode`)
- **Default**: `false` (Full natural color).
- **Toggle Button**: `#btn-toggle-bw` (`[🖨️ B&W प्रिंट]`).
- **Mechanism**: Toggles class `.bw-exam-mode` on `#picture-illustration-wrapper`:
  ```css
  .picture-illustration-wrapper.bw-exam-mode .scene-real-photo,
  .picture-illustration-wrapper.bw-exam-mode .illustration-canvas svg {
    filter: grayscale(100%) contrast(1.25) brightness(0.95);
  }
  ```
- **Hotspot Visibility**: Hotspot buttons (`.hotspot-btn`) remain vivid amber/green with high contrast on top of the grayscale background.

---

## ⚠️ 4. Critical Technical Gotchas & Rules

### Gotcha 1: CSS Brace Balance Before Media Queries (CRITICAL)
> [!CAUTION]
> **A single unclosed brace `{` in CSS will silently disable all subsequent `@media` queries!**
> The browser parser treats the `@media` rule as nested inside the unclosed selector, causing the mobile drawer and responsive styling to fail silently without generating console errors.
>
> **Mandatory Verification**: Always run this check after modifying `styles.css`:
> ```bash
> node -e "const css=require('fs').readFileSync('hindi_vyakaran/styles.css','utf8');let o=0;for(let c of css){if(c==='{')o++;if(c==='}')o--;}console.log('Open braces:',o);"
> ```
> The output MUST be `Open braces: 0`.

### Gotcha 2: Mobile Overflow Prevention
In `@media (max-width: 860px)`, you must maintain:
```css
html, body {
  overflow-x: hidden;
  width: 100%;
}
.app-container {
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}
```
Without `flex-direction: column` and `overflow-x: hidden` on `.app-container`, the horizontal flex row will push `.main-content` past the viewport width when `.sidebar` is off-canvas.

### Gotcha 3: Stacking Context for Off-Canvas Drawer
Inside `.app-container`, `#sidebar-backdrop` and `#sidebar` must remain direct sibling elements:
- `#sidebar-backdrop`: `z-index: 95; position: fixed;`
- `#sidebar`: `z-index: 100; position: fixed;`
- `#menu-toggle-btn`: Visible only on mobile (`display: flex` at `≤ 860px`).

---

## 🔗 5. DOM Contract (Element IDs in `index.html`)

When modifying HTML or JavaScript, **DO NOT rename or delete these element IDs**:

| Element ID | Purpose in `app.js` |
|---|---|
| `nav-item-vakyansh` | Curriculum switcher button for Vakyansh |
| `nav-item-chitra` | Curriculum switcher button for Chitra Varnan |
| `sidebar-scenes-container`| Collapsible container for Chitra scenes (hidden in Vakyansh mode) |
| `sidebar-topics` | Container where the 6 scene buttons are populated dynamically |
| `menu-toggle-btn` | Mobile drawer hamburger button (`☰ विषय`) |
| `btn-translate-toggle` | Bilingual English ON/OFF toggle button |
| `btn-view-real` | Switch to Real Exam Photograph |
| `btn-view-cartoon` | Switch to Vector Cartoon Illustration |
| `btn-toggle-bw` | Toggle Black & White Exam Paper Print mode |
| `bw-toggle-label` | Text label for B&W toggle button (`B&W प्रिंट` / `B&W प्रिंट (ON)`) |
| `picture-illustration-wrapper`| Relative wrapper hosting the image/SVG and hotspots |
| `illustration-canvas` | Container where photo or SVG is injected |
| `hotspot-detail-box` | Bottom bar displaying tapped hotspot word & sentence |
| `vakyansh-area` | Main container for Vakyansh workspace |
| `vakyansh-workspace` | Dynamic container rendered by Vakyansh mode handlers |
| `mode-tabs` | Tab strip container (dynamically filled based on active module) |
| `confetti-canvas` | Fullscreen HTML5 canvas for celebratory star rewards |

---

## 🚀 6. Developer Extension Recipes

### Recipe 1: Adding a 13th Vakyansh Statement
1. Open `hindi_vyakaran/app.js`.
2. Locate `const VAKYANSH_DATA = [...]`.
3. Add a new object conforming to the schema:
   ```javascript
   {
     id: 13,
     phraseHi: 'जो सब कुछ जानता हो',
     phraseEn: 'One who knows everything',
     wordHi: 'सर्वज्ञ',
     wordEn: 'Omniscient',
     translit: 'Sarvajna',
     formula: 'सर्व (सब कुछ) + ज्ञ (जानने वाला)',
     clue: 'ईश्वर सर्वज्ञ हैं—उन्हें हर बात का पहले से ज्ञान होता है।',
     exampleHi: 'ईश्वर सर्वज्ञ और सर्वव्यापी हैं।',
     exampleEn: 'God is omniscient and omnipresent.',
     oppositeHi: 'अल्पज्ञ (कम जानने वाला)',
     category: 'nature' // 'behavior' | 'action' | 'nature'
   }
   ```
4. Add corresponding practice question(s) to `VAKYANSH_QUIZ_POOL`.
5. Run `node -c hindi_vyakaran/app.js` to verify syntax.

### Recipe 2: Adding a 7th Chitra Varnan Scene
1. Place the authentic exam photo in `hindi_vyakaran/images/scene_<id>_real.jpg`.
2. Open `hindi_vyakaran/app.js` and add a new object to `SCENE_DATA`:
   - `id`: Unique lowercase ID (e.g. `'railway'`).
   - `title`: Hindi scene title (e.g. `'रेलवे स्टेशन का दृश्य'`).
   - `realImage`: Path to image (`'images/scene_railway_real.jpg'`).
   - `hotspotsReal`: Array of 6 objects with `{ id, x, y }` coordinates matching the photo.
   - `hotspots`: Array of 6 objects with `{ id, x, y, title, translit, meaningEn, type, sentenceHi, sentenceEn }`.
   - `svg`: Vector SVG fallback markup.
   - `puzzleSteps`: 5-sentence jumbled word steps.
   - `modelAnswer`: 5-sentence model answer paragraph and grammar tips.
3. The sidebar scene list, navigation, and stars tracker will automatically adapt with zero extra HTML changes.
