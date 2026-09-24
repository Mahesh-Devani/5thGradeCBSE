# 🤖 Agent Guidelines — General Knowledge (GK Master)

This guide defines the specific architecture, data conventions, pedagogical principles, and gotchas for the **general_knowledge** mini-app in the **5thGradeCBSE** repository.

---

## 1. Content Boundary (MANDATORY)

- **Strict Source Limitation**: All GK content is strictly limited to the official **June 2026, July 2026, and August 2026** Global Awareness Program (GAP Level 2) booklets.
- Do NOT inject facts, persons, or questions outside these 3 months unless explicitly requested by the user.
- **Reference Scans**: The raw PDF reference files reside in `general_knowledge/pdf/` and are strictly ignored in `.gitignore`. All questions, facts, and quiz answers must be maintained directly in `general_knowledge/data.js`.

---

## 2. Architecture & File Layout

- `index.html`: Entry point, semantic layout, sidebar drawer, mode tabs, and results modal.
- `styles.css`: CSS design system, dark glassmorphism, responsive drawer rules ($\le 860$px), and `@media print` monochrome styles.
- `data.js`: Structured content catalog (`GK_DATA`) containing:
  - `months`: June, July, August metadata
  - `topics`: Learn cards with memory sparks, key facts, and eureka trivia
  - `quizzes`: 10 multiple-choice questions per month with pedagogical explanations
  - `pictureQuizzes`: 4 picture deduction questions per month
  - `arcadeGames`: Donald cipher, city laser strike, Earth day matchmaker, water puppetry hunt
- `app.js`: Application logic:
  - `AudioController`: Web Audio API tone synthesizer
  - `ConfettiController`: HTML5 Canvas particle system
  - `AppState`: Central state management
  - Mode renderers: `renderLearnMode()`, `renderArcadeMode()`, `renderQuizMode()`, `renderPictureMode()`, `renderSprintMode()`, `renderWorksheetMode()`

---

## 3. Storage Schema & Session Restore

State is persisted under namespaced `localStorage` keys:
- `cbse5_gk_active_state`: Active month (`june` | `jul` | `aug`), active mode (`learn` | `arcade` | `quiz` | `picture` | `sprint` | `worksheet`), in-progress question index, selected answers, and arcade progress.
- `cbse5_gk_stars_v1`: Star counts per month (0 to 3 each).
- `cbse5_gk_sprint_high_score`: Highest sprint score.

**Session Continuity**:
On page reload (`DOMContentLoaded`), `loadState()` restores the user's active month, mode, and question position so the student never loses their place.

---

## 4. Front-End Gotchas & Verification

1. **CSS Open Braces Rule**:
   Before committing, verify that `styles.css` has `Open braces: 0`:
   ```bash
   python -c "css=open('general_knowledge/styles.css').read(); print('Open braces:', css.count('{') - css.count('}'))"
   ```
2. **JavaScript Syntax Verification**:
   Verify `data.js` and `app.js` using `python scratch/verify_js_syntax.py`.
3. **No Horizontal Scroll**:
   Ensure `overflow-x: hidden` on `html, body` and `.app-container`.
4. **Touch Targets**:
   All interactive buttons and choices must maintain a minimum height of 44px for smooth tablet and mobile usage.
