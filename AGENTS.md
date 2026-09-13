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

---

## 3. Directory Layout & Link Conventions

- Landing page: `/index.html`
- Mini-apps are in subdirectories:
  - `/social_sicence_maps/`
  - `/english_grammer/`
- Navigation links between mini-apps and the landing hub:
  - From landing page to mini-app: `<a href="english_grammer/index.html">`
  - From mini-app back to landing page: `<a href="../index.html">`
- Keep paths relative so the site works both locally via `file://` and on GitHub Pages subpaths (`/5thGradeCBSE/`).

---

## 4. Verification Workflow for Agents

Before completing a turn or pushing commits:
1. **Validate JavaScript Syntax**:
   Run `node -c <path_to_js>` to catch syntax errors or misplaced brackets.
2. **Browser Subagent Check**:
   Use `browser_subagent` to open the page at mobile viewport (390x844), test clicks, and verify there is no horizontal scroll (`overflow-x: hidden`).
3. **Inspect Console**:
   Ensure zero uncaught exceptions in browser developer console.
4. **Git Sync**:
   Stage changes, write descriptive commit messages, and push to branch `main`.

---

## 5. Architectural References

- Read **[ARCHITECTURE.md](ARCHITECTURE.md)** for data schemas and state machines.
- Read **[english_grammer/README.md](english_grammer/README.md)** for grammar topic definitions.
