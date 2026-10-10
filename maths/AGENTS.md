# 🤖 Agent Guidelines — Mathematics Master

Welcome, AI Agent! This document defines the operational rules, DOM contracts, math calculation algorithms, mobile drawer patterns, and extension recipes for maintaining and expanding the **Mathematics Master** mini-app (`maths/`).

---

## 1. Core Directives & Standards

1. **Zero External Runtime Dependencies**:
   - Strictly 100% vanilla HTML5, CSS3, and ES6+ JavaScript.
   - Do NOT install npm packages or build tools. Runs directly from root static files on GitHub Pages.
2. **CBSE / NCERT Class 5 Curriculum Target (Ages 9–11)**:
   - Foster thinking and deductive reasoning over rote memorization.
   - Explain *why* a problem needs HCF vs LCM (e.g., *The Equal Cutter* vs *The Cycle Synchronizer*).
   - Maintain the **Mental Estimator** boundary rules (Upper/Lower bounds, Co-Prime shortcuts) and **Spot the Mistakes** diagnostic slips.
   - Provide concept-first "No-Pen" practice questions that reward logical deduction over tedious scratchpad calculation.
3. **Verified Mathematical Accuracy**:
   - All HCF, LCM, divisibility rules, and product relations must be mathematically validated before rendering.
   - School revision worksheet questions (e.g. Multiples and Factors, Geometry) must strictly match Class 5 syllabus expectations, transcribed cleanly into code without committing raw PDF files.

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
| `stars-tables-speed` | `<span>` | Star display inside Tables (1 to 20) topic card (⭐⭐⭐) |
| `stars-fractions` | `<span>` | Star display inside Fractions Master topic card (⭐⭐⭐) |
| `topic-item-fractions` | `<div>` | Topic 7 Fractions Master sidebar card |
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

3. **State & Session Persistence Across Refreshes (MANDATORY)**:
   - When users switch topics, modes (`learn`, `practice`, `challenge`, `worksheet`), learn pills, or skill filters, persist them via `saveActiveState()`.
   - On `DOMContentLoaded`, restore via `loadActiveState()` so the student resumes directly without being bounced to Topic 1.
   - Storage key: `cbse5_maths_active_state`.
   - **Future Scope (User Accounts)**: In upcoming phases, Google Sign-In or direct account sync will be added. Ensure JSON state payloads remain clean and serializable.

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

## 4.5 Modular Architecture & AI Token Efficiency (MANDATORY)

The Mathematics module is divided into dedicated data files and calculation engines to ensure high performance and minimize AI token overhead:

- `maths/engines/solvers.js`: Core math algorithms (`gcd`, `lcm`, primes, factors, short division, long division, divisibility).
- `maths/data/topic1_hcf_lcm.js`: Topic 1 learn modules, practice pool (20+ CBSE worksheet questions), and challenge pool.
- `maths/data/topic2_divisibility.js`: Topic 2 learn modules, practice pool, and challenge questions.
- `maths/data/topic3_expressions.js`: Topic 3 clue words, expression presets, learn modules, and practice pool.
- `maths/data/topic4_patterns.js`: Topic 4 number patterns presets, triangular/square numbers data, and practice pool.
- `maths/data/topic5_geometry.js`: Topic 5 foundations, angle/line relationships, and practice pool.
- `maths/data/topic_tables.js`: Topic 6 multiplication learn modules.
- `maths/data/topic_fractions.js`: Topic 7 fractions learn modules.
- `maths/data/topic_revision.js`: Mixed revision learn modules and practice pool.
- `maths/app.js`: State manager, view coordinators, and interactive UI renderers.

> **AI Agent Rule**: When modifying questions or adding curriculum content for a specific topic, ONLY read and edit the corresponding `maths/data/topic*.js` file. Do NOT load `maths/app.js` into context.

---

## 5. Topic 6 Architecture: Tables (1 to 20) & Mental Speed Master

Topic 6 (`tables_speed_master`) is designed to combat math anxiety, prevent rote memorization of static question options, and stop students from skipping lessons to farm stars:

### A. Anti-Rote 3-Star Milestone Rules
- ⭐ **Star 1**: Requires clearing all 4 interactive Learn Checkpoints:
  1. `checkpoint_grid`: Symmetry Fold & Commutative Law ($A \times B = B \times A$).
  2. `checkpoint_split`: Split-and-Add Hammer ($17 \times 8 = (10 \times 8) + (7 \times 8)$).
  3. `checkpoint_vedic`: Vedic Base-10 Cross-Addition ($13 \times 14 = (13 + 4) \times 10 + (3 \times 4)$).
  4. `checkpoint_traps`: 4 Diagnostic Exam Trap Slips.
- ⭐⭐ **Star 2**: Requires solving $\ge 10$ practice questions in the infinite dynamic practice pool.
- ⭐⭐⭐ **Star 3**: Requires achieving $\ge 80\%$ accuracy on the 60s Speed Challenge.

### B. Procedural Dynamic Question Generator
To prevent students from memorizing fixed options or precalculated numbers, all questions in Practice and Speed Challenge are generated on-the-fly:
- `generateDynamicTableQuestion(skill)`:
  - Generates random operands (e.g. $a \in [11, 19], b \in [6, 9]$ or teen $\times$ teen pairs).
  - Dynamically calculates the correct product and realistic distractors ($\pm 10$, $\pm 2$, unit-digit slips, reversed digits).
  - Shuffles options randomly via Fisher-Yates (`shuffleOptionsAndGetCorrect`).
  - Synthesizes pedagogical, step-by-step explanations anchored to mental models (Split-and-Add, Vedic Base-10, Doubling Ladders).
- `generateTablesPracticeQueue(count)` & `generateDynamicChallengePool(count)`:
  - Generates balanced queues across all 5 mental skills (`split_add`, `vedic_teen`, `doubling`, `pattern_9_11`, `unit_digit_trap`).
  - Provides a `🎲 Roll New Numbers` button in Practice mode allowing infinite fresh problem sets.

### C. Dynamic Printable Worksheet
- `renderWorksheetViewTables()` & `printWorksheetTables()`:
  - Generates 25 procedurally randomized questions split across 5 sections (Foundations, Split & Add, Teen × Teen Vedic, Speed Drills, and Word Applications).
  - Features an interactive **"👁️ Toggle Answer Key"** button and clean, ink-saving print layout.

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
