# AGENTS.md — AI Agent Memory & Operational Guidelines

> **Target Audience:** Future AI coding agents (Antigravity, Gemini, Claude, GPT, etc.) and software engineers maintaining or extending this codebase.

---

## 📌 Project Overview
- **Project Name:** SST Map Master — Class 5 CBSE Practice
- **Primary Users:** Class 5 CBSE students (e.g. studying for school Social Studies / SST exams) and parents/teachers.
- **Curriculum Source:** Based directly on the school worksheet PDF [`I_TERM_SST_MAP_1789047876.pdf`](extracted_pages/).
- **Core Files:**
  - [`index.html`](index.html): Semantic HTML5 structure.
  - [`styles.css`](styles.css): Curated modern CSS design system (dark/light themes, animations, print styling).
  - [`app.js`](app.js): Pure Vanilla JavaScript application logic and bundled geographic SVG path data.
  - [`scripts/build_app.py`](scripts/build_app.py): Regeneration script that bundles map path data and application logic into `app.js`.

---

## ⚠️ Critical Rule 1: Official Indian Map Boundary (Survey of India)
> **MANDATORY REQUIREMENT:**
> Under Indian law, NCERT, and CBSE curriculum standards, **any representation of India MUST depict the official sovereign boundary recognized by the Survey of India**:
> 1. **Jammu & Kashmir and Ladakh** (including Pakistan-occupied Jammu & Kashmir / Gilgit-Baltistan and Aksai Chin) MUST be shown as integral parts of India (the northern "crown").
> 2. **Arunachal Pradesh** MUST be shown as part of India.
> 3. Standard open international datasets (like Natural Earth standard `admin_0_countries`) default to de facto control lines which truncate Kashmir and remove Aksai Chin. **DO NOT** use default Natural Earth Admin-0 country polygons for India.
> 4. For India, always use the Survey of India composite boundary (available in [`scripts/india_world_svg.txt`](scripts/india_world_svg.txt)).

---

## ⚠️ Critical Rule 2: World Physical Map Styling
> **LESSON LEARNED:**
> In school Social Studies worksheets (e.g., Pages 1 and 3 in `I_TERM_SST_MAP_1789047876.pdf`):
> - The world map is a **Physical Outline Map of Continents**, NOT a cluttered political map with hundreds of national boundary lines.
> - Continent landmasses are rendered cleanly (`world-land`), and India is delineated with its official Survey of India boundary.
> - The Equator ($0^\circ$) is drawn as a horizontal dashed line.
> - Active syllabus regions (the 3 Equatorial rainforest basins or the 11 Major Deserts) are overlaid cleanly.

---

## 📐 Map Projections & Coordinate Systems

All maps are vector SVGs using specific coordinate transformation formulas:

### 1. World Physical Map (`viewBox="0 0 1000 500"`)
- Used for: **Equatorial Regions** and **Major Deserts**.
- Geographic Bounds: Longitude $-170^\circ \text{ to } 180^\circ$ (span $350^\circ$), Latitude $84^\circ \text{ to } -70^\circ$ (span $154^\circ$).
- Transformation Formulas:
  ```python
  x = round((lon + 170) * (1000 / 350))
  y = round((84 - lat) * (500 / 154))
  ```
- Equator ($0^\circ$ Latitude) Y position: `y = (84 - 0) * (500 / 154) = 273`.

### 2. Saudi Arabia & Neighbours Map (`viewBox="0 0 750 650"`)
- Geographic Bounds: Longitude $32^\circ \text{ to } 60^\circ$ (span $28^\circ$), Latitude $10^\circ \text{ to } 35^\circ$ (span $25^\circ$).
- Transformation Formulas:
  ```python
  x = round((lon - 32) * (750 / 28))
  y = round((35 - lat) * (650 / 25))
  ```

### 3. DRC & Neighbours Map (`viewBox="250 250 340 380"`)
- Focused directly on the DRC and all 9 neighbouring nations (CAR, South Sudan, Uganda, Rwanda, Burundi, Tanzania, Zambia, Angola, Republic of the Congo).
- Previous full-continent `viewBox="0 0 700 800"` was zoomed out; the focused `viewBox="250 250 340 380"` provides optimal 2.2x zoom and legibility matching school worksheets.
- Interactive Zoom Controls (`➕`, `100%`, `➖`) and mouse-wheel zoom / drag-to-pan are available across all maps.

---

## 🔗 Contract Between `index.html` and `app.js`

When modifying code, **DO NOT rename or break these DOM element IDs**:

| Element ID in `index.html` | Purpose in `app.js` |
|---|---|
| `sidebar` | Sidebar container (`.sidebar-open` applied on mobile drawer toggle) |
| `sidebar-backdrop` | Blurred dimming overlay when mobile drawer is open |
| `sidebar-close-btn` | Close button (✕) inside the mobile drawer |
| `menu-toggle-btn` | Hamburger button (☰ Maps) in mobile sticky top bar |
| `mobile-home-btn` | Quick home navigation button (🏠) in mobile top bar |
| `sidebar-maps` | Container where sidebar map cards are rendered by `renderSidebar()` |
| `progress-fill` | Overall progress bar fill element (`style.width = pct + '%'`) |
| `progress-label` | Overall progress label text (e.g. `"X / 12 stars earned"`) |
| `top-bar-title` | Active map title display |
| `top-bar-subtitle` | Active map subtitle display |
| `tab-learn`, `tab-quiz`, `tab-timed` | Mode tab buttons (`.mode-tab` with `data-mode`) |
| `btn-print` | Opens worksheet generation modal |
| `btn-reset` | Resets current map score and returns to Learn mode |
| `welcome-screen` | Welcome banner (hidden when map is selected) |
| `map-area` | Main map view container (`display: flex`) |
| `map-svg-container` | SVG rendering viewport for active map |
| `info-panel` | Dynamic sidebar panel for Learn notes / Quiz prompt / Score display |
| `results-modal` | Quiz completion celebration modal with stars |
| `result-correct`, `result-total` | Stat values inside results modal |
| `worksheet-modal` | Modal dialog to choose Blank vs. Labeled worksheet |
| `print-worksheet` | Printable container populated during `printWorksheet()` |

---

## 📱 Mobile-First Drawer & CSS Isolation Gotcha

1. **CSS Brace Balance Check**:
   Before committing changes to `styles.css`, run:
   ```bash
   node -e "const css=require('fs').readFileSync('styles.css','utf8');let o=0;for(let c of css){if(c==='{')o++;if(c==='}')o--;}console.log('Open braces:',o);"
   ```
   An unclosed brace before `@media (max-width: 860px)` silently disables mobile drawer styling without any console errors.
2. **Mobile Overflow Isolation**:
   On mobile viewports, `.app-container` must be `flex-direction: column; width: 100%; overflow-x: hidden;` so the map SVG viewport scales cleanly without causing horizontal body scrolling.

---

## 🛠️ How to Rebuild `app.js`

If you ever modify map data or geographic paths:
1. Edit or verify data files in `scripts/`:
   - `scripts/world_land_path.txt`: Clean world continental outlines SVG path.
   - `scripts/india_world_svg.txt`: Survey of India boundary SVG path.
   - `scripts/map_data_final.json`: Neighboring country paths for Saudi Arabia & DRC.
2. Run the build script:
   ```bash
   python scripts/build_app.py
   ```
3. Test JavaScript syntax:
   ```bash
   node -c app.js
   ```
4. Verify visually in a browser:
   Open `social_sicence_maps/index.html` (or serve locally).

---

## 🚀 How to Add New Maps (e.g., Term II Syllabus)

To add a new map (e.g., *Major Grasslands of the World*, *Indian States*, or *Continents & Oceans*):
1. In `scripts/build_app.py`, add a new key to `MAP_DATA` (e.g., `grasslands`, `indiaStates`).
2. Provide:
   - `id`, `title`, `subtitle`, `icon`, `viewBox`, `bgColor`.
   - `regions`: List of region objects (`id`, `name`, `info`, `color`, `path`, optional `direction` / `number`).
3. If applicable, add a direction guide under `directions: { 'North': [...], ... }`.
4. Run `python scripts/build_app.py`.
5. The sidebar, Learn mode, Quiz mode, Timed mode, scoring, and Printable worksheets will **automatically** adapt without any further code changes!
