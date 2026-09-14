# 🤖 Agent Guidelines — 5thGradeCBSE

Welcome, AI Agent! This guide defines the rules, technical constraints, pedagogical principles, and gotchas you must follow when writing or modifying code in the **5thGradeCBSE** repository.

---

## 1. Core Directives

1. **Zero External Runtime Dependencies**:
   - **DO NOT** install npm dependencies, build tools (Vite, Webpack, Babel), or runtime frameworks (React, Vue, Tailwind).
   - The entire app is deployed directly to **GitHub Pages** from the root static files.
   - All animations, sound synthesizers, confetti particles, and interactive logic MUST remain in vanilla HTML5, CSS3, and ES6+ JavaScript.

2. **CBSE / NCERT Curriculum Target**:
   - Content is designed for **Class 5 students (Ages 9–11)**.
   - Language must be clear, accessible, fun, and free of overly dense academic jargon.
   - Foster **thinking and deductive reasoning** over rote memorization. (e.g., Use *"The camera that freezes actions right now"* for continuous tense, *"The article detective looking for consonant sounds"* for articles).

3. **Cartographic Compliance (MANDATORY)**:
   - Any map depicting India **MUST** strictly adhere to the official boundaries published by the **Survey of India** (depicting Jammu & Kashmir, Ladakh, and Arunachal Pradesh as integral parts of India).

4. **State & Session Persistence Across Browser Refreshes (MANDATORY)**:
   - Students must **never lose their active place or progress** when refreshing the browser or navigating away.
   - Whenever students change topics, modes (`learn`, `practice`, `challenge`, `worksheet`), subtabs, or filters, the active state MUST be saved to `localStorage` and automatically restored during initialization (`DOMContentLoaded`).
   - Students should NEVER be booted back to the generic welcome screen or reset to topic 1 on page reload.
   - **Future Scope (User Accounts & Cloud Sync)**: In future phases, user authentication (Google Sign-In or direct email/password accounts) will be integrated to synchronize progress across devices. All client-side state schemas must remain clean, modular, and serializable JSON objects to facilitate effortless future migration and sync with user accounts.

---

## 2. Front-End Standards & Patterns

### A. Mobile-First & Responsive Drawer
When modifying or creating a subject mini-app:
- Always test on **390px × 844px** (standard mobile), **360px × 740px** (compact mobile), and **1280px × 800px** (desktop).
- On screens `≤ 860px`, navigation MUST collapse into an **off-canvas drawer**:
  - The drawer toggle button (`☰ Topics` / `☰ Menu`) must be visible in the sticky top bar.
  - A quick `🏠` Home button must be present in the top bar to return to `../index.html`.
  - Stacking Context Rule: Keep `.sidebar-backdrop` and `.sidebar` as sibling elements inside `.app-container` so the backdrop dims the content beneath without trapping or dimming the drawer itself.
  - Touch targets for buttons, tabs, and quiz options must be at least **44px to 50px** in height.
  - Set `touch-action: manipulation;` on clickable elements to eliminate mobile tap delays.

### B. Synthesized Audio Feedback
- Never request or link external `.mp3` or `.wav` sound files.
- Use the native `AudioContext` synthesizer pattern present in `english_grammer/app.js`:
  ```javascript
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playBeep(freq, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }
  ```

### C. Confetti Particle Canvas
- For celebratory reward feedback (e.g. 3 stars earned), use the canvas-based confetti particle system rather than heavy third-party CDNs.

### D. CSS Brace Balance & Media Query Isolation (CRITICAL GOTCHA)
- **Silent Parser Failure**: In vanilla CSS, an unclosed `{` or extra `}` before an `@media` block causes the browser parser to treat the `@media` rule as nested inside the preceding selector. This **silently disables all responsive mobile drawer rules** with ZERO browser console errors!
- **Mandatory Brace Verification**: Whenever editing any `styles.css` file, always run this command before testing or committing:
  ```bash
  node -e "const css=require('fs').readFileSync('<path_to_styles.css>','utf8');let o=0;for(let c of css){if(c==='{')o++;if(c==='}')o--;}console.log('Open braces:',o);"
  ```
  The output MUST be `Open braces: 0`.
- **Mobile Container Overflow**: On mobile screens (`max-width: 860px`), `.app-container` must be styled with:
  ```css
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  ```
  Ensure `html, body { overflow-x: hidden; width: 100%; }` to prevent horizontal page scrolling.

### E. State Persistence & Session Restore Pattern
Whenever creating or enhancing an interactive mini-app:
- Implement `loadActiveState()` and `saveActiveState()` to persist active topic, mode, subtabs, and star progress.
- **In-Progress Practice & Quiz Session Persistence (MANDATORY)**:
  - When students are mid-practice or mid-quiz and accidentally reload, switch apps on a tablet/mobile, or leave the page, their in-progress session MUST be saved and restored:
    - Current question index and randomized question queue/indices
    - Current score (correct/incorrect counters)
    - If a question was already answered: preserve the selected answer, show the explanation card, disable choice buttons, and display the "Next Question" button
    - Free-form text drafts (e.g., *Chitra Varnan* student essay notepad) must be autosaved to state on every input event
  - **Restart Drill Control (MANDATORY)**:
    - Always provide an easily accessible `🔄 Restart` (`🔄 पुनः आरंभ`) button in the practice/quiz header or stats bar so students can voluntarily reset and start fresh from Question 1 anytime.
- On initialization (`DOMContentLoaded` or `init()`), invoke `loadActiveState()`: if a previously viewed topic/mode exists, restore it immediately along with any in-progress practice session so the student resumes directly without being bounced to a welcome screen.
- Call `saveActiveState()` on every state change:
  - Topic/chapter selection
  - Mode/tab changes (`learn`, `practice`, `challenge`, `worksheet`)
  - Subtab/filter changes (math learn pills, grammar subtopics, categorization filters)
  - Answering a question, selecting an option, or clicking "Next Question"
  - View toggles (bilingual English, exam photo vs cartoon, monochrome print)
- **Namespaced Storage Keys**:
  - Hindi: `cbse5_hindi_active_state`, `cbse5_hindi_sangya_stars`, `cbse5_hindi_vakyansh_stars`, `cbse5_chitra_varnan_stars`
  - Mathematics: `cbse5_maths_active_state`, `cbse5_math_topic_*_stars`
  - English Grammar: `grammar-master-active-state`, `grammar-master-progress`
  - Social Science Maps: `sst-map-active-state`, `sst-map-progress`

---

## 3. Directory Layout & Link Conventions

- Landing page: `/index.html`
- Mini-apps are in subdirectories:
  - `/social_sicence_maps/`
  - `/english_grammer/`
  - `/hindi_vyakaran/`
  - `/maths/`
- Navigation links between mini-apps and the landing hub:
  - From landing page to mini-app: `<a href="maths/index.html">`
  - From mini-app back to landing page: `<a href="../index.html">`
- Keep paths relative so the site works both locally via `file://` and on GitHub Pages subpaths (`/5thGradeCBSE/`).

---

## 4. Verification Workflow for Agents

Before completing a turn or pushing commits:
1. **Validate JavaScript Syntax**:
   Run `node -c <path_to_js>` to catch syntax errors or misplaced brackets.
2. **Verify CSS Brace Balance**:
   Run `node -e "const css=require('fs').readFileSync('<path_to_styles.css>','utf8');let o=0;for(let c of css){if(c==='{')o++;if(c==='}')o--;}console.log('Open braces:',o);"` (must be 0).
3. **Browser Subagent Check**:
   Use `browser_subagent` to open the page at mobile viewport (390x844), test clicks, and verify there is no horizontal scroll (`overflow-x: hidden`).
4. **Inspect Console**:
   Ensure zero uncaught exceptions in browser developer console.
5. **Git Sync**:
   Stage changes, write descriptive commit messages, and push to branch `main`.

---

## 5. Architectural References

- **System Architecture**: Read **[ARCHITECTURE.md](ARCHITECTURE.md)** for data schemas, state machines, and extension recipes.
- **Mathematics Master**: Read **[maths/README.md](maths/README.md)** and **[maths/AGENTS.md](maths/AGENTS.md)**.
- **English Grammar**: Read **[english_grammer/README.md](english_grammer/README.md)** and **[english_grammer/AGENTS.md](english_grammer/AGENTS.md)**.
- **Social Science Maps**: Read **[social_sicence_maps/AGENTS.md](social_sicence_maps/AGENTS.md)**.
- **Hindi Vyakaran**: Read **[hindi_vyakaran/README.md](hindi_vyakaran/README.md)** and **[hindi_vyakaran/AGENTS.md](hindi_vyakaran/AGENTS.md)**.

