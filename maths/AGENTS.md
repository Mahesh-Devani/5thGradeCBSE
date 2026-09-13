# 🤖 Agent Guidelines — Mathematics Master

Welcome, AI Agent! This document defines the operational rules, DOM contracts, math calculation algorithms, mobile drawer patterns, and extension recipes for maintaining and expanding the **Mathematics Master** mini-app (`maths/`).

---

## 1. Core Directives & Standards

1. **Zero External Runtime Dependencies**:
   - Strictly 100% vanilla HTML5, CSS3, and ES6+ JavaScript.
   - Do NOT install npm packages or build tools. Runs directly from root static files on GitHub Pages.
2. **CBSE / NCERT Class 5 Curriculum Target (Ages 9–11)**:
   - Foster thinking and deductive reasoning over rote memorization.
   - Explain *why* a problem needs HCF vs LCM (e.g., cutting/splitting into equal parts vs repeating cycles meeting together).
3. **Verified Mathematical Accuracy**:
   - All HCF, LCM, divisibility rules, and product relations must be mathematically validated before rendering.
   - School worksheet questions from `Multiples_and_Factors_1788791719.pdf` must strictly match syllabus expectations.

---

## 2. DOM Contract (`index.html` ↔ `app.js`)

Do **NOT** rename, remove, or alter the IDs of these DOM elements. They are hard-referenced in `app.js`:

| Element ID | Element Type | Role in `app.js` |
|---|---|---|
| `confetti-canvas` | `<canvas>` | Full-screen canvas for celebratory 3-star confetti particles |
| `feedback-flash` | `<div>` | Screen border indicator (green for correct, red for incorrect) |
| `sidebar` | `<aside>` | Sidebar drawer container (`.sidebar-open` applied on mobile) |
| `sidebar-backdrop` | `<div>` | Blurred dimming overlay when mobile drawer is open (`.active`) |
| `sidebar-close-btn` | `<button>` | Close button (✕) inside the mobile drawer |
| `menu-toggle-btn` | `<button>` | Hamburger button (☰ Topics) in mobile sticky top bar |
| `topic-item-hcf-lcm` | `<div>` | Active curriculum topic card in sidebar |
| `progress-fill` | `<div>` | Star progress bar fill (`style.width = pct + '%'`) |
| `progress-label` | `<div>` | Progress text (e.g. `"3 / 3 stars earned"`) |
| `stars-factors-multiples` | `<span>` | Star display inside topic card (⭐⭐⭐) |
| `top-bar-title` | `<h2>` | Displays active topic title |
| `top-bar-subtitle` | `<p>` | Displays active topic subtitle |
| `btn-print` | `<button>` | Triggers printable school worksheet |
| `btn-reset` | `<button>` | Resets user scores and progress |
| `tab-learn` | `<button>` | Mode tab switching to `learn` |
| `tab-practice` | `<button>` | Mode tab switching to `practice` |
| `tab-challenge` | `<button>` | Mode tab switching to `challenge` |
| `tab-worksheet` | `<button>` | Mode tab switching to `worksheet` |
| `content-viewport` | `<div>` | Main dynamic viewport where Learn, Practice, and Challenge modes render |
| `results-modal` | `<div>` | Results modal dialog rendered after challenge completion |
| `result-emoji` | `<div>` | Header emoji (🏆 / 🌟 / 💪) |
| `result-title` | `<h3>` | Modal heading |
| `result-stars` | `<div>` | Star icons display (⭐⭐⭐) |
| `result-message` | `<p>` | Encouraging feedback message |
| `result-correct` | `<div>` | Correct questions count |
| `result-total` | `<div>` | Total questions count |
| `result-accuracy` | `<div>` | Accuracy percentage |
| `btn-modal-retry` | `<button>` | Restarts 60s challenge |
| `btn-modal-review` | `<button>` | Switches to Learn mode |
| `btn-modal-close` | `<button>` | Closes modal |
| `print-container` | `<div>` | Formatted container rendered and printed via `window.print()` |

---

## 3. Math Engine Schemas & Algorithms

### A. Short Division Algorithms

1. **HCF Short Division (`getShortDivisionHCF(numbers)`)**:
   - Prime divisor $p$ **must divide all numbers**: `current.every(n => n % p === 0)`.
   - Stops immediately when no prime divides all.
   - $\text{HCF} = \prod \text{divisors}$.

2. **LCM Short Division (`getShortDivisionLCM(numbers)`)**:
   - Prime divisor $p$ only needs to divide **at least 2 numbers** (or 1 number).
   - Non-divisible numbers are brought down unchanged!
   - Runs until all numbers reach 1.
   - $\text{LCM} = \prod \text{divisors} \times \prod \text{bottom numbers}$.

### B. Long Division Algorithm (`getLongDivisionHCF(a, b)`)

- Successive division steps recorded as:
  ```javascript
  {
    stepNum: 1,
    dividend: 144,
    divisor: 96,
    quotient: 1,
    product: 96,
    remainder: 48
  }
  ```
- If remainder $> 0$, `dividend = divisor`, `divisor = remainder`.
- When remainder $=== 0$, `divisor` is the HCF!

---

## 4. CSS Brace Balance & Mobile Drawer Gotchas

1. **Mandatory CSS Brace Verification**:
   Unclosed `{` or extra `}` silently kills `@media (max-width: 860px)` rules. Always verify:
   ```bash
   node -e "const css=require('fs').readFileSync('styles.css','utf8');let o=0;for(let c of css){if(c==='{')o++;if(c==='}')o--;}console.log('Open braces:',o);"
   ```
   Must output `Open braces: 0`.

2. **Mobile Overflow Isolation**:
   On mobile screens (`≤ 860px`), `.app-container` must have:
   ```css
   flex-direction: column;
   width: 100%;
   overflow-x: hidden;
   ```
   Ensure touch targets have min 44px to 50px height with `touch-action: manipulation;`.

---

## 5. Extension Recipes: Adding Subsequent Topics

### Recipe: Adding Topic 2 (Divisibility Rules for 2 to 12)
1. In `index.html`:
   - In `.sidebar-topics`, change `data-topic-id="divisibility_rules"` from `.topic-item.disabled` to `.topic-item`.
   - Update badge to `Ready`.
2. In `app.js`:
   - Add Topic 2 definition to `CURRICULUM_TOPICS`.
   - Add Learn modules (Rules for 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 & 12, missing digit puzzles like $62\_178$).
   - Append questions to `PRACTICE_POOL` with `skill: 'divisibility'`.
3. Validate syntax:
   ```bash
   node -c app.js
   ```

---

## 6. Pre-Commit Verification Checklist

- [ ] `node -c maths/app.js` runs with exit code 0.
- [ ] `maths/styles.css` has strictly `Open braces: 0`.
- [ ] Tested on mobile viewport (390px × 844px) with zero horizontal scroll.
- [ ] Off-canvas drawer opens via `☰ Topics` and closes upon topic selection or backdrop tap.
- [ ] Short Division ladders correctly highlight HCF stopping point vs LCM continuation.
- [ ] Long Division ladder accurately handles 2 and 3 numbers (e.g. 96, 144, 192).
- [ ] Product Formula correctly verifies $a \times b = \text{HCF} \times \text{LCM}$.
- [ ] Co-Prime & Twin Prime live tester accurately identifies pairs.
- [ ] Practice mode provides instant educational step-by-step explanations.
- [ ] 60s Challenge timer counts down, awards stars, and triggers confetti.
- [ ] Printable worksheet renders clean ink-friendly layout.
