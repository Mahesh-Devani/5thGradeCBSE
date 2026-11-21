/**
 * Maths Master — Class 5 CBSE
 * Chapter 8: Area & Perimeter Master
 * Modularized Architecture (Vanilla ES6+ JS)
 * Zero External Runtime Dependencies
 */

'use strict';

/* ==========================================================================
   CHAPTER 8: AREA & PERIMETER DATA & LEARN MODULES
   ========================================================================== */

const LEARN_MODULES_TOPIC_8 = {
  area_foundations_perim: {
    id: 'area_foundations_perim',
    pillTitle: '📏 Perimeter vs Area',
    title: 'Perimeter vs Area: Boundary Fence vs Surface Carpet',
    tag: 'Core Concept & Units',
    lead: 'Never confuse perimeter and area! <strong>Perimeter</strong> is the total outer boundary fence measured in linear units (cm, m). <strong>Area</strong> is the flat surface covered inside measured in square units (sq cm, sq m).',
    renderContent: (container) => renderAreaFoundationsModule(container)
  },
  same_area_diff_shapes: {
    id: 'same_area_diff_shapes',
    pillTitle: '🔲 Same Area, Different Shapes',
    title: 'Same Area, Different Shapes: The Power of Factor Pairs',
    tag: 'Factor Reasoning',
    lead: 'Did you know? Two shapes can look completely different and have totally different perimeters, yet cover the <strong>exact same area</strong>! Any pair of factors whose product is the area can form a valid rectangle.',
    renderContent: (container) => renderSameAreaModule(container)
  },
  triangle_grid_half: {
    id: 'triangle_grid_half',
    pillTitle: '📐 Triangles on Grids',
    title: 'Area of Triangles: The Half-Rectangle Secret',
    tag: 'Geometric Deduction',
    lead: 'Every right triangle occupies exactly <strong>half the area of its bounding rectangle</strong>! For asymmetric triangles, split the triangle into two right-angled halves across two bounding rectangles.',
    renderContent: (container) => renderTriangleGridModule(container)
  },
  irregular_shapes_grid: {
    id: 'irregular_shapes_grid',
    pillTitle: '🍃 Irregular Shapes & Grids',
    title: 'Area of Irregular Shapes: The 4-Step Grid Counting Rule',
    tag: 'Approximation & Real Life',
    lead: 'Real-world objects like leaves, garden plots, footprints, and lakes are rarely neat rectangles. Learn the official CBSE 4-step grid approximation rule to estimate irregular areas.',
    renderContent: (container) => renderIrregularGridModule(container)
  },
  tiling_and_word_problems: {
    id: 'tiling_and_word_problems',
    pillTitle: '🧱 Floor Tiling & Word Problems',
    title: 'Floor Tiling, Crosswords & CBSE Exam Applications',
    tag: 'CBSE Exam Master',
    lead: 'Master classic exam problems: finding how many square tiles pave a room, calculating carpeting costs, working backwards from area to perimeter, and avoiding sneaky unit mismatch traps!',
    renderContent: (container) => renderTilingWordProblemsModule(container)
  }
};

/* ==========================================================================
   INTERACTIVE LEARN RENDERERS FOR TOPIC 8
   ========================================================================== */

function renderAreaFoundationsModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 The Mental Metaphor: The Fence vs The Turf Carpet</div>
      <p>Imagine a playground: <strong>Perimeter is the fence</strong> running around the outer boundary (1D distance). <strong>Area is the grass turf</strong> covering the flat surface inside (2D square units).</p>
    </div>

    <div class="formula-card-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
      <div class="rule-card" style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 1.25rem;">
        <h4 style="color: #10b981; margin-bottom: 0.5rem;">🟦 Rectangle Formulas</h4>
        <p><strong>Perimeter</strong> = 2 × (Length + Breadth) units</p>
        <p><strong>Area</strong> = Length × Breadth (l × b) sq units</p>
        <div style="margin-top: 0.75rem; font-size: 0.9rem; color: #cbd5e1;">
          Example: 6 cm long, 3 cm wide<br>
          • Perimeter = 2 × (6 + 3) = <strong>18 cm</strong><br>
          • Area = 6 × 3 = <strong>18 sq cm</strong>
        </div>
      </div>

      <div class="rule-card" style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; padding: 1.25rem;">
        <h4 style="color: #60a5fa; margin-bottom: 0.5rem;">⏹️ Square Formulas</h4>
        <p><strong>Perimeter</strong> = 4 × Side units</p>
        <p><strong>Area</strong> = Side × Side (s × s) sq units</p>
        <div style="margin-top: 0.75rem; font-size: 0.9rem; color: #cbd5e1;">
          Example: Square of side 4 cm<br>
          • Perimeter = 4 × 4 = <strong>16 cm</strong><br>
          • Area = 4 × 4 = <strong>16 sq cm</strong>
        </div>
      </div>
    </div>

    <!-- Beware Units Trap Box -->
    <div style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 10px; padding: 1rem 1.25rem; margin-top: 1rem;">
      <strong style="color: #f87171;">⚠️ Beware!! Classic CBSE Unit Mistake</strong>
      <p style="margin: 0.4rem 0 0 0; font-size: 0.92rem; color: #cbd5e1;">
        The area of a square of side 4 cm is 16 cm. <span style="color:#ef4444; font-weight:bold;">❌ WRONG (cm is length!)</span><br>
        The area of a square of side 4 cm is <strong>16 sq cm</strong> (or 16 cm²). <span style="color:#10b981; font-weight:bold;">✓ CORRECT</span>
      </p>
    </div>

    <!-- Interactive Grid Comparison SVG -->
    <div style="text-align: center; margin-top: 1.5rem; padding: 1.25rem; background: rgba(15, 23, 42, 0.6); border-radius: 12px;">
      <h5 style="color: #38bdf8; margin-bottom: 0.75rem;">Interactive Grid Comparison: Square vs Rectangle</h5>
      <svg width="340" height="130" viewBox="0 0 340 130" style="max-width: 100%;">
        <!-- Square 3x3 = 9 sq cm -->
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="90" height="90" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="2"/>
          <line x1="30" y1="0" x2="30" y2="90" stroke="#10b981" stroke-dasharray="3,3"/>
          <line x1="60" y1="0" x2="60" y2="90" stroke="#10b981" stroke-dasharray="3,3"/>
          <line x1="0" y1="30" x2="90" y2="30" stroke="#10b981" stroke-dasharray="3,3"/>
          <line x1="0" y1="60" x2="90" y2="60" stroke="#10b981" stroke-dasharray="3,3"/>
          <text x="45" y="-6" fill="#10b981" font-size="12" text-anchor="middle" font-weight="bold">3 cm</text>
          <text x="-6" y="50" fill="#10b981" font-size="12" text-anchor="end" font-weight="bold">3 cm</text>
          <text x="45" y="108" fill="#cbd5e1" font-size="11" text-anchor="middle">Area = 3×3 = 9 sq cm</text>
        </g>

        <!-- Rectangle 5x2 = 10 sq cm -->
        <g transform="translate(170, 35)">
          <rect x="0" y="0" width="150" height="60" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="2"/>
          <line x1="30" y1="0" x2="30" y2="60" stroke="#38bdf8" stroke-dasharray="3,3"/>
          <line x1="60" y1="0" x2="60" y2="60" stroke="#38bdf8" stroke-dasharray="3,3"/>
          <line x1="90" y1="0" x2="90" y2="60" stroke="#38bdf8" stroke-dasharray="3,3"/>
          <line x1="120" y1="0" x2="120" y2="60" stroke="#38bdf8" stroke-dasharray="3,3"/>
          <line x1="0" y1="30" x2="150" y2="30" stroke="#38bdf8" stroke-dasharray="3,3"/>
          <text x="75" y="-6" fill="#38bdf8" font-size="12" text-anchor="middle" font-weight="bold">5 cm</text>
          <text x="-6" y="35" fill="#38bdf8" font-size="12" text-anchor="end" font-weight="bold">2 cm</text>
          <text x="75" y="78" fill="#cbd5e1" font-size="11" text-anchor="middle">Area = 5×2 = 10 sq cm</text>
        </g>
      </svg>
    </div>
  `;
}

function renderSameAreaModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 The Detective Secret: Factor Pairs of Area</div>
      <p>If an architect wants to build a room of <strong>12 sq metres</strong>, what dimensions can they pick? Look at factor pairs of 12: <strong>12 × 1</strong> (long hallway), <strong>6 × 2</strong> (balcony), or <strong>4 × 3</strong> (square-ish room). All 3 have identical area!</p>
    </div>

    <div style="margin: 1.5rem 0;">
      <h4 style="color: #f59e0b; margin-bottom: 0.75rem;">🔍 Comparing Rectangles with Area = 12 sq cm</h4>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid #334155; border-radius: 10px; padding: 1rem; text-align: center;">
          <strong style="color: #38bdf8;">Rectangle A (6 cm × 2 cm)</strong>
          <p style="font-size: 0.9rem; color: #94a3b8; margin: 0.5rem 0;">Area = 12 sq cm<br>Perimeter = 2×(6+2) = <strong>16 cm</strong></p>
        </div>
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid #334155; border-radius: 10px; padding: 1rem; text-align: center;">
          <strong style="color: #10b981;">Rectangle B (4 cm × 3 cm)</strong>
          <p style="font-size: 0.9rem; color: #94a3b8; margin: 0.5rem 0;">Area = 12 sq cm<br>Perimeter = 2×(4+3) = <strong>14 cm</strong></p>
        </div>
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid #334155; border-radius: 10px; padding: 1rem; text-align: center;">
          <strong style="color: #f59e0b;">Rectangle C (12 cm × 1 cm)</strong>
          <p style="font-size: 0.9rem; color: #94a3b8; margin: 0.5rem 0;">Area = 12 sq cm<br>Perimeter = 2×(12+1) = <strong>26 cm</strong></p>
        </div>
      </div>
    </div>

    <!-- Perimeter Insight Box -->
    <div style="background: rgba(56, 189, 248, 0.08); border-left: 4px solid #38bdf8; padding: 1rem; border-radius: 0 8px 8px 0;">
      <strong style="color: #38bdf8;">🧠 Key Mathematical Insight:</strong>
      <p style="margin: 0.35rem 0 0 0; font-size: 0.92rem; color: #cbd5e1;">
        For a fixed area, the closer length and breadth are to each other (more square-shaped), the <strong>smaller the perimeter</strong>! Long skinny shapes have a huge perimeter for the same area.
      </p>
    </div>
  `;
}

function renderTriangleGridModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 The Half-Rectangle Rule for Triangles</div>
      <p>A diagonal line cuts any rectangle into two equal right triangles. Therefore:
      <br><strong>Area of Right Triangle = ½ × (Base × Height) = ½ × Area of Rectangle</strong></p>
    </div>

    <!-- Split Asymmetric Triangle Diagram -->
    <div style="text-align: center; margin: 1.5rem 0; padding: 1.25rem; background: rgba(15, 23, 42, 0.6); border-radius: 12px;">
      <h5 style="color: #fbbf24; margin-bottom: 0.75rem;">Textbook Method: Dividing an Asymmetric Triangle Across 2 Rectangles</h5>
      <svg width="320" height="150" viewBox="0 0 320 150" style="max-width: 100%;">
        <!-- Yellow Rectangle (4cm x 5cm) -->
        <rect x="30" y="20" width="120" height="100" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" stroke-width="2"/>
        <!-- Pink Rectangle (2cm x 5cm) -->
        <rect x="150" y="20" width="60" height="100" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" stroke-width="2"/>
        <!-- Triangle lines -->
        <polygon points="30,120 150,20 210,120" fill="rgba(239, 68, 68, 0.35)" stroke="#ef4444" stroke-width="3"/>
        <!-- Dividing dashed line -->
        <line x1="150" y1="20" x2="150" y2="120" stroke="#38bdf8" stroke-dasharray="4,4" stroke-width="2"/>

        <text x="90" y="75" fill="#f59e0b" font-size="11" text-anchor="middle" font-weight="bold">Yellow: ½×20 = 10</text>
        <text x="180" y="75" fill="#f43f5e" font-size="11" text-anchor="middle" font-weight="bold">Pink: ½×10 = 5</text>
        <text x="120" y="142" fill="#38bdf8" font-size="13" text-anchor="middle" font-weight="bold">Total Area = 10 + 5 = 15 sq cm</text>
      </svg>
    </div>

    <div style="background: rgba(15, 23, 42, 0.7); border-radius: 10px; padding: 1rem; border: 1px solid #334155;">
      <h5 style="color: #38bdf8; margin-bottom: 0.5rem;">Step-by-Step Calculation:</h5>
      <p style="margin: 0.25rem 0; font-size: 0.92rem; color: #cbd5e1;">1. Yellow rectangle: 4 cm × 5 cm = 20 sq cm ⟹ Triangle part = ½ × 20 = <strong>10 sq cm</strong></p>
      <p style="margin: 0.25rem 0; font-size: 0.92rem; color: #cbd5e1;">2. Pink rectangle: 2 cm × 5 cm = 10 sq cm ⟹ Triangle part = ½ × 10 = <strong>5 sq cm</strong></p>
      <p style="margin: 0.25rem 0; font-size: 0.92rem; color: #10b981; font-weight: bold;">3. Total Triangle Area = 10 sq cm + 5 sq cm = 15 sq cm</p>
    </div>
  `;
}

function renderIrregularGridModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 The CBSE 4-Step Grid Approximation Rule</div>
      <p>When measuring leaves, hearts, flowers, or island maps on a 1 cm square grid paper:</p>
      <ol style="margin: 0.5rem 0 0 1.25rem; font-size: 0.92rem; color: #cbd5e1;">
        <li>Count fully covered squares = <strong>1 sq unit each</strong></li>
        <li>Count more than half-covered squares = <strong>1 sq unit each</strong></li>
        <li>Count exactly half-covered squares = <strong>½ (0.5) sq unit each</strong></li>
        <li>Ignore less than half-covered squares = <strong>0 sq units</strong></li>
      </ol>
    </div>

    <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid #334155; border-radius: 10px; padding: 1.25rem; margin-top: 1.25rem;">
      <h4 style="color: #38bdf8; margin-bottom: 0.5rem;">⛳ Example: Heart-Shaped Golf Course (From Page 154)</h4>
      <p style="font-size: 0.92rem; color: #cbd5e1; margin-bottom: 0.75rem;">
        Suppose you are to design a heart-shaped golf green within 8 sq units.
        <br>• Fully covered unit squares = <strong>2 squares</strong>
        <br>• More than half-covered squares = <strong>6 squares</strong>
        <br>• Total approximate area = 2 + 6 = <strong>8 sq units</strong>.
      </p>
    </div>
  `;
}

function renderTilingWordProblemsModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 The Floor Tiling Master Formula</div>
      <p>How many square marble tiles are needed to pave a rectangular floor?
      <br><strong>Number of Tiles = (Area of Floor) ÷ (Area of 1 Tile) = (L × B) ÷ (s × s)</strong></p>
    </div>

    <div style="background: rgba(15, 23, 42, 0.7); border-radius: 10px; padding: 1.25rem; border: 1px solid #334155; margin-top: 1rem;">
      <h4 style="color: #f59e0b; margin-bottom: 0.5rem;">🏫 Textbook Problem Walkthrough (Page 156, Q 3.a)</h4>
      <p style="font-size: 0.92rem; color: #cbd5e1; margin-bottom: 0.5rem;">
        <strong>Question:</strong> A room has length 120 cm and breadth 90 cm. It is covered with square marble slabs of side 15 cm. How many slabs are needed?
      </p>
      <div style="background: rgba(245, 158, 11, 0.08); padding: 0.85rem; border-radius: 8px; font-size: 0.9rem; color: #cbd5e1;">
        • Area of floor = 120 cm × 90 cm = 10,800 sq cm<br>
        • Area of 1 slab = 15 cm × 15 cm = 225 sq cm<br>
        • Number of slabs = 10,800 ÷ 225 = <strong>48 slabs</strong><br>
        <em>⚡ Shortcut: Along length: 120 ÷ 15 = 8 slabs; Along breadth: 90 ÷ 15 = 6 slabs; Total = 8 × 6 = <strong>48 slabs</strong>!</em>
      </div>
    </div>
  `;
}

/* ==========================================================================
   PRACTICE QUESTION POOL FOR TOPIC 8 (AREA & PERIMETER)
   ========================================================================== */

const PRACTICE_POOL_TOPIC_8 = [
  // Category 1: foundations_formulas
  {
    id: 'area_q01',
    skill: 'foundations_formulas',
    type: 'mcq',
    question: 'What is the area of a square of side 1 cm?',
    options: ['1 cm', '10 sq cm', '1 sq cm', '4 sq cm'],
    correct: 2,
    explanation: 'Area of a square = side × side. Here, 1 cm × 1 cm = 1 sq cm. Remember: units of area are always square units!',
    source: 'CBSE Textbook Page 156 (Q 1.a)'
  },
  {
    id: 'area_q02',
    skill: 'foundations_formulas',
    type: 'mcq',
    question: 'The area of a rectangle is 35 sq m. If its breadth is 5 m, what is its length?',
    options: ['8 m', '7 cm', '10 m', '7 m'],
    correct: 3,
    explanation: 'Length = Area ÷ Breadth = 35 ÷ 5 = 7 m. Note that length is linear, so the unit is metres (m).',
    source: 'CBSE Textbook Page 156 (Q 1.b)'
  },
  {
    id: 'area_q03',
    skill: 'foundations_formulas',
    type: 'mcq',
    question: 'The area of a square is 81 sq cm. What is the length of each side of the square?',
    options: ['9 cm', '18 cm', '12 cm', '4 cm'],
    correct: 0,
    explanation: 'Since Area = side × side, we find the number which multiplied by itself gives 81: 9 × 9 = 81. Thus, side = 9 cm.',
    source: 'CBSE Textbook Page 156 (Q 1.c)'
  },
  {
    id: 'area_q04',
    skill: 'foundations_formulas',
    type: 'mcq',
    question: 'Calculate the perimeter of a rectangle having length 5.8 cm and breadth 4.5 cm.',
    options: ['20.6 cm', '26.1 sq cm', '10.3 cm', '20.6 sq cm'],
    correct: 0,
    explanation: 'Perimeter = 2 × (Length + Breadth) = 2 × (5.8 + 4.5) = 2 × 10.3 = 20.6 cm. Perimeter is length, not area!',
    source: 'CBSE Textbook Page 150 (Let\'s Recap Q1)'
  },
  {
    id: 'area_q05',
    skill: 'foundations_formulas',
    type: 'mcq',
    question: 'Calculate the perimeter of a square of side 4.5 cm.',
    options: ['18 cm', '20.25 sq cm', '9 cm', '18 sq cm'],
    correct: 0,
    explanation: 'Perimeter of square = 4 × side = 4 × 4.5 = 18 cm.',
    source: 'CBSE Textbook Page 150 (Let\'s Recap Q2)'
  },
  {
    id: 'area_q06',
    skill: 'foundations_formulas',
    type: 'mcq',
    question: 'Find the area of a rectangle with length 2.5 m and breadth 25 cm. (Watch the units!)',
    options: ['62.5 sq m', '0.625 sq m (or 6250 sq cm)', '625 sq cm', '50 sq cm'],
    correct: 1,
    explanation: 'Unit conversion trap! First convert 25 cm to metres: 25 cm = 0.25 m. Area = 2.5 m × 0.25 m = 0.625 sq m (or 250 cm × 25 cm = 6250 sq cm).',
    source: 'CBSE Textbook Page 154 (Q 6.c)'
  },

  // Category 2: factor_pairs_same_area
  {
    id: 'area_q07',
    skill: 'factor_pairs_same_area',
    type: 'mcq',
    question: 'Which of the following is NOT a possible whole-number (length × breadth) combination for a rectangle of area 36 sq cm?',
    options: ['36 cm × 1 cm', '18 cm × 2 cm', '12 cm × 3 cm', '7 cm × 5 cm'],
    correct: 3,
    explanation: '7 × 5 = 35 sq cm, not 36 sq cm! The factor pairs of 36 are 36×1, 18×2, 12×3, 9×4, and 6×6.',
    source: 'CBSE Textbook Page 154 (Q 4.a)'
  },
  {
    id: 'area_q08',
    skill: 'factor_pairs_same_area',
    type: 'mcq',
    question: 'How many different whole-number factor pairs (length × breadth) exist for an area of 24 sq cm?',
    options: ['2 pairs', '3 pairs', '4 pairs', '6 pairs'],
    correct: 2,
    explanation: 'The 4 factor pairs for 24 are: (24 × 1), (12 × 2), (8 × 3), and (6 × 4).',
    source: 'CBSE Textbook Page 152'
  },
  {
    id: 'area_q09',
    skill: 'factor_pairs_same_area',
    type: 'mcq',
    question: 'Two rectangles both have an area of 18 sq cm. Rectangle A is 9 cm × 2 cm. Rectangle B is 6 cm × 3 cm. Which has the smaller perimeter?',
    options: ['Rectangle A (perimeter 22 cm)', 'Rectangle B (perimeter 18 cm)', 'Both have the exact same perimeter', 'Cannot be determined'],
    correct: 1,
    explanation: 'Perimeter of A = 2 × (9 + 2) = 22 cm. Perimeter of B = 2 × (6 + 3) = 18 cm. Rectangle B is closer to a square, so it has a smaller perimeter!',
    source: 'CBSE Class 5 Reasoning'
  },

  // Category 3: triangle_irregular_grids
  {
    id: 'area_q10',
    skill: 'triangle_irregular_grids',
    type: 'mcq',
    question: 'A right-angled triangle occupies half of a 6 cm by 5 cm rectangle. What is the area of the triangle?',
    options: ['30 sq cm', '15 sq cm', '11 sq cm', '20 sq cm'],
    correct: 1,
    explanation: 'Area of surrounding rectangle = 6 × 5 = 30 sq cm. Since the triangle occupies half, Area = ½ × 30 = 15 sq cm.',
    source: 'CBSE Textbook Page 153'
  },
  {
    id: 'area_q11',
    skill: 'triangle_irregular_grids',
    type: 'mcq',
    question: 'In a 4 cm × 4 cm unit square grid, a triangle has a base of 4 cm and a height of 4 cm. What is its area?',
    options: ['16 sq cm', '8 sq cm', '12 sq cm', '4 sq cm'],
    correct: 1,
    explanation: 'Area of bounding square grid = 4 × 4 = 16 sq cm. The triangle occupies half of the square: ½ × 16 = 8 sq cm.',
    source: 'CBSE Textbook Page 154 (Q 3)'
  },
  {
    id: 'area_q12',
    skill: 'triangle_irregular_grids',
    type: 'mcq',
    question: 'When estimating an irregular shape on a 1 cm grid, what do you do with a square that is more than half covered by the shape?',
    options: ['Ignore it completely (0)', 'Count it as a full 1 sq unit', 'Count it as 0.25 sq units', 'Subtract it from the total'],
    correct: 1,
    explanation: 'According to the official CBSE grid estimation rule, any square covered more than half is counted as a full 1 square unit.',
    source: 'CBSE Textbook Page 154'
  },

  // Category 4: tiling_word_problems
  {
    id: 'area_q13',
    skill: 'tiling_word_problems',
    type: 'mcq',
    question: 'A rectangular floor measures 120 cm by 90 cm. It is to be covered with square marble slabs of side 15 cm. How many slabs are needed?',
    options: ['24 slabs', '48 slabs', '96 slabs', '72 slabs'],
    correct: 1,
    explanation: 'Along length: 120 ÷ 15 = 8 slabs. Along breadth: 90 ÷ 15 = 6 slabs. Total slabs = 8 × 6 = 48 slabs (or 10,800 ÷ 225 = 48).',
    source: 'CBSE Textbook Page 156 (Q 3.a)'
  },
  {
    id: 'area_q14',
    skill: 'tiling_word_problems',
    type: 'mcq',
    question: 'A Sunday crossword puzzle has 225 squares. 60 squares are black and the rest are white. If each square has an area of 2.5 sq cm, find the total area of the white squares.',
    options: ['150 sq cm', '412.5 sq cm', '562.5 sq cm', '300 sq cm'],
    correct: 1,
    explanation: 'White squares = 225 - 60 = 165 squares. Total area of white squares = 165 × 2.5 = 412.5 sq cm.',
    source: 'CBSE Textbook Page 156 (Q 3.b)'
  },
  {
    id: 'area_q15',
    skill: 'tiling_word_problems',
    type: 'mcq',
    question: 'The area of a square is 144 sq cm. What is its perimeter?',
    options: ['12 cm', '24 cm', '48 cm', '36 cm'],
    correct: 2,
    explanation: 'Step 1: Side of square = √144 = 12 cm (since 12 × 12 = 144). Step 2: Perimeter = 4 × side = 4 × 12 = 48 cm.',
    source: 'CBSE Textbook Page 156 (Q 3.c)'
  },
  {
    id: 'area_q16',
    skill: 'tiling_word_problems',
    type: 'mcq',
    question: 'Geeta carpets her square study room (side 6 m, area 36 sq m) and hall (9 m by 7 m, area 63 sq m). Total carpeting needed is 99 sq m. If carpeting costs ₹ 40 per sq m, what is the total cost?',
    options: ['₹ 3,600', '₹ 3,960', '₹ 4,000', '₹ 2,520'],
    correct: 1,
    explanation: 'Total carpeting = 36 + 63 = 99 sq m. Total cost = 99 × ₹ 40 = ₹ 3,960.',
    source: 'CBSE Textbook Page 157 (Fun with Mental Maths)'
  },
  {
    id: 'area_q17',
    skill: 'tiling_word_problems',
    type: 'mcq',
    question: 'A shopping market has a perimeter of 90 m. Mr. Sharma wants to put a light after every 5 m starting from corner X. How many lights does he need?',
    options: ['15 lights', '18 lights', '20 lights', '25 lights'],
    correct: 1,
    explanation: 'Total distance around market = 90 m. Lights placed every 5 m: 90 ÷ 5 = 18 lights.',
    source: 'CBSE Textbook Page 157 (Maths Around Us)'
  }
];

const CHALLENGE_QUESTIONS_TOPIC_8 = [
  {
    id: 'area_ch01',
    question: 'What is the area of a square with side 8 cm?',
    options: ['32 cm', '64 sq cm', '16 sq cm', '64 cm'],
    correct: 1,
    explanation: 'Area = 8 × 8 = 64 sq cm.'
  },
  {
    id: 'area_ch02',
    question: 'A rectangle has area 42 sq m and length 7 m. What is its breadth?',
    options: ['6 m', '7 m', '14 m', '6 sq m'],
    correct: 0,
    explanation: 'Breadth = 42 ÷ 7 = 6 m.'
  },
  {
    id: 'area_ch03',
    question: 'If a triangle covers half of a 10 cm × 4 cm rectangle, what is its area?',
    options: ['40 sq cm', '20 sq cm', '14 sq cm', '10 sq cm'],
    correct: 1,
    explanation: 'Area = ½ × (10 × 4) = 20 sq cm.'
  },
  {
    id: 'area_ch04',
    question: 'A square has perimeter 36 cm. What is its area?',
    options: ['9 sq cm', '81 sq cm', '144 sq cm', '72 sq cm'],
    correct: 1,
    explanation: 'Side = 36 ÷ 4 = 9 cm. Area = 9 × 9 = 81 sq cm.'
  },
  {
    id: 'area_ch05',
    question: 'How many 10 cm × 10 cm tiles cover a 100 cm × 100 cm floor?',
    options: ['10 tiles', '50 tiles', '100 tiles', '1000 tiles'],
    correct: 2,
    explanation: 'Floor area = 10,000 sq cm. Tile area = 100 sq cm. 10,000 ÷ 100 = 100 tiles.'
  }
];
