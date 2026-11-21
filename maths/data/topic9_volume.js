/**
 * Maths Master — Class 5 CBSE
 * Chapter 9: Volume & Capacity Master
 * Modularized Architecture (Vanilla ES6+ JS)
 * Zero External Runtime Dependencies
 */

'use strict';

/* ==========================================================================
   CHAPTER 9: VOLUME & CAPACITY DATA & LEARN MODULES
   ========================================================================== */

const LEARN_MODULES_TOPIC_9 = {
  solids_3d_foundations: {
    id: 'solids_3d_foundations',
    pillTitle: '🧊 Solid 3D Shapes & Units',
    title: 'Solid 3D Shapes: Faces, Edges, Vertices & Units of Volume',
    tag: 'Core Concept & 3D Geometry',
    lead: 'Solid shapes have three dimensions: <strong>length, breadth, and height</strong>. The amount of 3D space occupied by an object is called its <strong>volume</strong>, measured in cubic units (cm³, m³).',
    renderContent: (container) => renderSolids3DFoundationsModule(container)
  },
  cube_cuboid_formulas: {
    id: 'cube_cuboid_formulas',
    pillTitle: '📦 Cube & Cuboid Formulas',
    title: 'Volume Formulas: Length × Breadth × Height (l × b × h)',
    tag: 'Formula Mastery',
    lead: 'Learn how to calculate the exact volume of rectangular blocks and cubes by multiplying their three dimensions, or by counting layers of unit centimetre cubes.',
    renderContent: (container) => renderCubeCuboidFormulasModule(container)
  },
  base_area_height_relation: {
    id: 'base_area_height_relation',
    pillTitle: '📐 Base Area × Height',
    title: 'The Master Relation: Volume = Base Area × Height',
    tag: 'Deductive Relations',
    lead: 'Master the powerful connection: <strong>Volume = Area of Base × Height</strong> (or Area × Thickness). Use inverse division to easily deduce missing heights or base areas in seconds!',
    renderContent: (container) => renderBaseAreaHeightModule(container)
  },
  volume_and_capacity: {
    id: 'volume_and_capacity',
    pillTitle: '💧 Volume & Capacity (Litres)',
    title: 'Volume & Capacity: The Golden 1000 Rule (1 L = 1000 cm³)',
    tag: 'Liquids & Conversions',
    lead: 'Liquids take the shape of their container. Discover the fundamental scientific equivalence: <strong>1 Litre = 1000 mL = 1000 cm³</strong>, and master the water displacement method!',
    renderContent: (container) => renderVolumeCapacityModule(container)
  },
  real_world_case_studies: {
    id: 'real_world_case_studies',
    pillTitle: '🐠 Fish Tanks & Packing Case Studies',
    title: 'Real-World Applications: Fish Tanks, Tile Packs & Cube Nets',
    tag: 'Case Studies & Nets',
    lead: 'Explore realistic Class 5 word problems: designing home aquariums, packing ice cubes into boxes, calculating rainwater harvesting tank storage, and folding 2D nets into 3D cubes.',
    renderContent: (container) => renderCaseStudiesModule(container)
  }
};

/* ==========================================================================
   INTERACTIVE LEARN RENDERERS FOR TOPIC 9
   ========================================================================== */

function renderSolids3DFoundationsModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 What is Volume? Space Occupied</div>
      <p>When you pack books into your school bag or park a car in a garage, they take up 3D space. <strong>The space occupied by any object is called its volume.</strong></p>
    </div>

    <!-- 3D Solid Shapes Table -->
    <div style="margin: 1.5rem 0; overflow-x: auto;">
      <h4 style="color: #a78bfa; margin-bottom: 0.75rem;">🧊 3D Solid Shapes Reference Table (Page 159)</h4>
      <table style="width: 100%; border-collapse: collapse; font-size: 0.92rem; text-align: left; background: rgba(15, 23, 42, 0.6); border-radius: 8px;">
        <thead>
          <tr style="border-bottom: 2px solid #475569; color: #a78bfa;">
            <th style="padding: 0.6rem;">Solid Shape</th>
            <th style="padding: 0.6rem;">Faces</th>
            <th style="padding: 0.6rem;">Edges</th>
            <th style="padding: 0.6rem;">Vertices</th>
            <th style="padding: 0.6rem;">Real-World Example</th>
          </tr>
        </thead>
        <tbody style="color: #cbd5e1;">
          <tr style="border-bottom: 1px solid #334155;">
            <td style="padding: 0.6rem; font-weight: bold; color: #38bdf8;">Cube</td>
            <td style="padding: 0.6rem;">6 flat square faces</td>
            <td style="padding: 0.6rem;">12 straight edges</td>
            <td style="padding: 0.6rem;">8 corners</td>
            <td style="padding: 0.6rem;">Dice, Rubik's cube, sugar cube</td>
          </tr>
          <tr style="border-bottom: 1px solid #334155;">
            <td style="padding: 0.6rem; font-weight: bold; color: #38bdf8;">Cuboid</td>
            <td style="padding: 0.6rem;">6 flat rectangular faces</td>
            <td style="padding: 0.6rem;">12 straight edges</td>
            <td style="padding: 0.6rem;">8 corners</td>
            <td style="padding: 0.6rem;">Shoe box, geometry box, textbook</td>
          </tr>
          <tr style="border-bottom: 1px solid #334155;">
            <td style="padding: 0.6rem; font-weight: bold; color: #10b981;">Cylinder</td>
            <td style="padding: 0.6rem;">2 circular + 1 curved</td>
            <td style="padding: 0.6rem;">2 curved edges</td>
            <td style="padding: 0.6rem;">0 corners</td>
            <td style="padding: 0.6rem;">Cold drink can, battery cell, pipe</td>
          </tr>
          <tr style="border-bottom: 1px solid #334155;">
            <td style="padding: 0.6rem; font-weight: bold; color: #f59e0b;">Cone</td>
            <td style="padding: 0.6rem;">1 circular + 1 curved</td>
            <td style="padding: 0.6rem;">1 curved edge</td>
            <td style="padding: 0.6rem;">1 apex (corner)</td>
            <td style="padding: 0.6rem;">Ice cream cone, birthday party cap</td>
          </tr>
          <tr>
            <td style="padding: 0.6rem; font-weight: bold; color: #f43f5e;">Sphere</td>
            <td style="padding: 0.6rem;">1 curved surface</td>
            <td style="padding: 0.6rem;">0 edges</td>
            <td style="padding: 0.6rem;">0 corners</td>
            <td style="padding: 0.6rem;">Football, globe, cricket ball</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Beware Units Trap Box -->
    <div style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 10px; padding: 1rem 1.25rem;">
      <strong style="color: #f87171;">⚠️ Beware!! Classic CBSE Unit Mistake</strong>
      <p style="margin: 0.4rem 0 0 0; font-size: 0.92rem; color: #cbd5e1;">
        The volume of a cube of side 1 cm is 1 cm. <span style="color:#ef4444; font-weight:bold;">❌ WRONG (cm is length!)</span><br>
        The volume of a cube of side 1 cm is 1 sq cm. <span style="color:#ef4444; font-weight:bold;">❌ WRONG (sq cm is area!)</span><br>
        The volume of a cube of side 1 cm is <strong>1 cu cm</strong> (or 1 cm³). <span style="color:#10b981; font-weight:bold;">✓ CORRECT</span>
      </p>
    </div>
  `;
}

function renderCubeCuboidFormulasModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 Volume Formula = Length × Breadth × Height</div>
      <p>To find how many 1 cm³ blocks fit inside any box, multiply its 3 dimensions:
      <br>• <strong>Volume of Cuboid = l × b × h cubic units</strong>
      <br>• <strong>Volume of Cube = side × side × side = s³ cubic units</strong></p>
    </div>

    <!-- Visual 3D Cuboid SVG Diagram -->
    <div style="text-align: center; margin: 1.5rem 0; padding: 1.25rem; background: rgba(15, 23, 42, 0.6); border-radius: 12px;">
      <h5 style="color: #a78bfa; margin-bottom: 0.75rem;">Textbook Example: Cuboid of 24 Centimetre Cubes (Page 161)</h5>
      <svg width="300" height="150" viewBox="0 0 300 150" style="max-width: 100%;">
        <!-- Isometric cuboid representation (3cm x 2cm x 4cm) -->
        <g transform="translate(70, 30)">
          <!-- Front Face (3cm x 4cm = 12 sq cm) -->
          <rect x="0" y="30" width="100" height="80" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" stroke-width="2"/>
          <!-- Top Face (3cm x 2cm) -->
          <polygon points="0,30 40,0 140,0 100,30" fill="rgba(167, 139, 250, 0.4)" stroke="#a78bfa" stroke-width="2"/>
          <!-- Right Face (2cm x 4cm) -->
          <polygon points="100,30 140,0 140,80 100,110" fill="rgba(124, 58, 237, 0.5)" stroke="#7c3aed" stroke-width="2"/>

          <!-- Dimension labels -->
          <text x="50" y="125" fill="#a78bfa" font-size="12" text-anchor="middle" font-weight="bold">Length = 3 cm</text>
          <text x="135" y="100" fill="#a78bfa" font-size="12" text-anchor="start" font-weight="bold">Height = 4 cm</text>
          <text x="70" y="-6" fill="#a78bfa" font-size="12" text-anchor="middle" font-weight="bold">Breadth = 2 cm</text>
        </g>
      </svg>
      <div style="margin-top: 0.75rem; font-size: 0.95rem; color: #cbd5e1;">
        Volume = 3 cm × 2 cm × 4 cm = <strong>24 cm³</strong> (or 24 cu cm)
      </div>
    </div>
  `;
}

function renderBaseAreaHeightModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 Master Relation: Base Area × Height</div>
      <p>Since <strong>Length × Breadth = Base Area</strong>, we get the master formula:
      <br>• <strong>Volume = Area of Base × Height</strong> (or Surface Area × Thickness)</p>
    </div>

    <div class="formula-card-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
      <div style="background: rgba(139, 92, 246, 0.08); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 10px; padding: 1.25rem;">
        <h5 style="color: #a78bfa; margin-bottom: 0.5rem;">Finding Height from Volume:</h5>
        <p style="font-size: 0.95rem; color: #cbd5e1;">
          <strong>Height = Volume ÷ Area of Base</strong>
        </p>
        <div style="margin-top: 0.5rem; font-size: 0.88rem; color: #94a3b8;">
          Example (Steel Cupboard):<br>
          Volume = 6 m³, Base Area = 3 m²<br>
          Height = 6 ÷ 3 = <strong>2 m</strong>
        </div>
      </div>

      <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 10px; padding: 1.25rem;">
        <h5 style="color: #10b981; margin-bottom: 0.5rem;">Finding Base Area from Volume:</h5>
        <p style="font-size: 0.95rem; color: #cbd5e1;">
          <strong>Area of Base = Volume ÷ Height</strong>
        </p>
        <div style="margin-top: 0.5rem; font-size: 0.88rem; color: #94a3b8;">
          Example (Storage Box):<br>
          Volume = 144 cm³, Height = 5 cm<br>
          Base Area = 144 ÷ 5 = <strong>28.8 sq cm</strong>
        </div>
      </div>
    </div>
  `;
}

function renderVolumeCapacityModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 The Golden Equivalence: Volume & Capacity</div>
      <p>When an aluminium foil box of 10 cm × 10 cm × 10 cm is filled with water, it holds exactly 1 Litre!
      <br>• <strong>1 Litre = 1000 mL = 1000 cm³</strong>
      <br>• <strong>1 mL = 1 cm³</strong></p>
    </div>

    <!-- Capacity Conversion Table -->
    <div style="margin: 1.5rem 0; background: rgba(15, 23, 42, 0.7); border: 1px solid #334155; border-radius: 10px; padding: 1.25rem;">
      <h4 style="color: #38bdf8; margin-bottom: 0.75rem;">💧 Instant Capacity Conversion Cheat Sheet (Page 162)</h4>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.9rem; color: #cbd5e1;">
        <div style="background: rgba(56, 189, 248, 0.1); padding: 0.75rem; border-radius: 6px;">
          <strong>63 cm³</strong> = <strong>63 mL</strong>
        </div>
        <div style="background: rgba(56, 189, 248, 0.1); padding: 0.75rem; border-radius: 6px;">
          <strong>430 cm³</strong> = <strong>430 mL</strong>
        </div>
        <div style="background: rgba(167, 139, 250, 0.1); padding: 0.75rem; border-radius: 6px;">
          <strong>1226 cm³</strong> = <strong>1.226 Litres</strong>
        </div>
        <div style="background: rgba(167, 139, 250, 0.1); padding: 0.75rem; border-radius: 6px;">
          <strong>3492 cm³</strong> = <strong>3.492 Litres</strong>
        </div>
      </div>
    </div>
  `;
}

function renderCaseStudiesModule(container) {
  container.innerHTML = `
    <div class="think-callout-math">
      <div class="callout-header">💡 Real-World Problem Solving: Sanya's Fish Tank</div>
      <p>Sanya builds an aquarium: <strong>Length = 40 cm</strong>, <strong>Breadth = 20 cm</strong> (half of length), <strong>Height = 30 cm</strong>.
      <br>• Full Volume = 40 × 20 × 30 = <strong>24,000 cm³ (24 Litres)</strong>
      <br>• If water is filled to 15 cm: 40 × 20 × 15 = <strong>12,000 cm³ (12 Litres)</strong>
      <br>• Water that can still be added = 24,000 - 12,000 = <strong>12,000 cm³ (12 Litres)</strong></p>
    </div>

    <!-- Cube Packing Rule -->
    <div style="background: rgba(15, 23, 42, 0.7); border-radius: 10px; padding: 1.25rem; border: 1px solid #334155; margin-top: 1rem;">
      <h4 style="color: #f59e0b; margin-bottom: 0.5rem;">🧊 Cube Packing Puzzle (Page 165, Mental Maths Q3)</h4>
      <p style="font-size: 0.92rem; color: #cbd5e1;">
        How many small ice cubes of side 2 cm can fit inside a box of 4 cm × 4 cm × 4 cm?
      </p>
      <div style="background: rgba(245, 158, 11, 0.08); padding: 0.75rem; border-radius: 6px; font-size: 0.9rem; color: #cbd5e1; margin-top: 0.5rem;">
        • Volume of box = 4 × 4 × 4 = 64 cm³<br>
        • Volume of 1 ice cube = 2 × 2 × 2 = 8 cm³<br>
        • Number of ice cubes = 64 ÷ 8 = <strong>8 ice cubes</strong>!
      </div>
    </div>
  `;
}

/* ==========================================================================
   PRACTICE QUESTION POOL FOR TOPIC 9 (VOLUME & CAPACITY)
   ========================================================================== */

const PRACTICE_POOL_TOPIC_9 = [
  // Category 1: solids_3d_properties
  {
    id: 'vol_q01',
    skill: 'solids_3d_properties',
    type: 'mcq',
    question: 'What is the volume of a cube of side 10 m?',
    options: ['100 cm', '1000 m³', '1000 sq cm', '1000 cm'],
    correct: 1,
    explanation: 'Volume of cube = side × side × side = 10 m × 10 m × 10 m = 1000 m³. Note the unit is cubic metres (m³)!',
    source: 'CBSE Textbook Page 164 (Stop A While Q 1.a)'
  },
  {
    id: 'vol_q02',
    skill: 'solids_3d_properties',
    type: 'mcq',
    question: 'Which of the following 3D shapes has 6 flat rectangular faces, 12 edges, and 8 vertices?',
    options: ['Cylinder', 'Sphere', 'Cuboid', 'Cone'],
    correct: 2,
    explanation: 'A cuboid is a 3D rectangular solid with 6 rectangular faces, 12 straight edges, and 8 corners (vertices).',
    source: 'CBSE Textbook Page 159 (Let\'s Recap)'
  },
  {
    id: 'vol_q03',
    skill: 'solids_3d_properties',
    type: 'mcq',
    question: 'How many vertices (corners) does a sphere have?',
    options: ['0', '1', '2', '4'],
    correct: 0,
    explanation: 'A sphere is completely round with 1 curved surface, 0 edges, and 0 vertices (corners).',
    source: 'CBSE Class 5 Solid Shapes'
  },

  // Category 2: cube_cuboid_volume
  {
    id: 'vol_q04',
    skill: 'cube_cuboid_volume',
    type: 'mcq',
    question: 'What is the volume of a cuboid with length 9 m, breadth 6 m, and height 3 m?',
    options: ['162 m³', '160 m³', '27 m³', '54 m³'],
    correct: 0,
    explanation: 'Volume of cuboid = l × b × h = 9 m × 6 m × 3 m = 54 × 3 = 162 m³.',
    source: 'CBSE Textbook Page 164 (Stop A While Q 1.b)'
  },
  {
    id: 'vol_q05',
    skill: 'cube_cuboid_volume',
    type: 'mcq',
    question: 'The volume of a cuboid is 200 cm³. If its length is 10 cm and breadth is 5 cm, what is its height?',
    options: ['14 cm', '40 cm', '20 cm', '4 cm'],
    correct: 3,
    explanation: 'Base area = length × breadth = 10 × 5 = 50 sq cm. Height = Volume ÷ Base Area = 200 ÷ 50 = 4 cm.',
    source: 'CBSE Textbook Page 164 (Stop A While Q 1.c)'
  },
  {
    id: 'vol_q06',
    skill: 'cube_cuboid_volume',
    type: 'mcq',
    question: 'Find the volume of a geometry box that is 12 cm long, 4 cm broad, and 2 cm thick.',
    options: ['96 cm³', '48 cm³', '18 cm', '96 sq cm'],
    correct: 0,
    explanation: 'Volume = length × breadth × thickness = 12 × 4 × 2 = 96 cm³.',
    source: 'CBSE Textbook Page 163 (Q 4.c)'
  },

  // Category 3: base_area_height
  {
    id: 'vol_q07',
    skill: 'base_area_height',
    type: 'mcq',
    question: 'The volume of a box is 144 cm³ and its height is 5 cm. What is the area of its base?',
    options: ['28.8 sq cm', '28.8 cm', '720 sq cm', '14.4 sq cm'],
    correct: 0,
    explanation: 'Area of base = Volume ÷ Height = 144 ÷ 5 = 28.8 sq cm.',
    source: 'CBSE Textbook Page 163 (Q 4.a)'
  },
  {
    id: 'vol_q08',
    skill: 'base_area_height',
    type: 'mcq',
    question: 'The area of the base of a steel cupboard is 3 m² and its volume is 6 m³. What is the height of the cupboard?',
    options: ['18 m', '2 m', '3 m', '9 m'],
    correct: 1,
    explanation: 'Height = Volume ÷ Base Area = 6 m³ ÷ 3 m² = 2 m.',
    source: 'CBSE Textbook Page 163 (Q 4.b)'
  },
  {
    id: 'vol_q09',
    skill: 'base_area_height',
    type: 'mcq',
    question: 'Which has greater volume: A book with surface area 462 cm² and thickness 3 cm, OR a box of 22 cm × 14 cm × 3 cm?',
    options: ['The book has greater volume (1386 cm³ vs 924 cm³)', 'The box has greater volume', 'Both have the exact same volume', 'Cannot be compared'],
    correct: 0,
    explanation: 'Book volume = 462 × 3 = 1386 cm³. Box volume = 22 × 14 × 3 = 924 cm³. The book has a significantly greater volume!',
    source: 'CBSE Textbook Page 165 (Q 3)'
  },

  // Category 4: capacity_conversions
  {
    id: 'vol_q10',
    skill: 'capacity_conversions',
    type: 'mcq',
    question: 'How many millilitres (mL) is equal to 63 cm³?',
    options: ['6.3 mL', '63 mL', '630 mL', '0.063 mL'],
    correct: 1,
    explanation: 'Since 1 cm³ = 1 mL, 63 cm³ is exactly equal to 63 mL.',
    source: 'CBSE Textbook Page 163 (Q 3.a)'
  },
  {
    id: 'vol_q11',
    skill: 'capacity_conversions',
    type: 'mcq',
    question: 'Convert 1226 cm³ into litres.',
    options: ['12.26 Litres', '122.6 Litres', '1.226 Litres', '0.1226 Litres'],
    correct: 2,
    explanation: 'Since 1 Litre = 1000 cm³, we divide by 1000: 1226 ÷ 1000 = 1.226 Litres.',
    source: 'CBSE Textbook Page 163 (Q 3.b)'
  },
  {
    id: 'vol_q12',
    skill: 'capacity_conversions',
    type: 'mcq',
    question: 'If a measuring cylinder has 100 mL of water, and dropping a stone causes the water level to rise to 145 mL, what is the volume of the stone?',
    options: ['100 cm³', '145 cm³', '45 cm³ (or 45 mL)', '245 cm³'],
    correct: 2,
    explanation: 'Water displacement: Volume of object = New level - Old level = 145 - 100 = 45 mL = 45 cm³.',
    source: 'CBSE Textbook Page 163 (Hands-on Activity)'
  },

  // Category 5: real_world_packing
  {
    id: 'vol_q13',
    skill: 'real_world_packing',
    type: 'mcq',
    question: 'Sanya builds a fish tank of length 40 cm, breadth 20 cm, and height 30 cm. What is the total volume of the fish tank?',
    options: ['24,000 cm³ (24 Litres)', '90 cm³', '2,400 cm³', '12,000 cm³'],
    correct: 0,
    explanation: 'Volume = 40 × 20 × 30 = 24,000 cm³. In litres: 24,000 ÷ 1000 = 24 Litres.',
    source: 'CBSE Textbook Page 164 (Case Study Q1)'
  },
  {
    id: 'vol_q14',
    skill: 'real_world_packing',
    type: 'mcq',
    question: 'How many small ice cubes of side 2 cm can fit inside a box of 4 cm × 4 cm × 4 cm?',
    options: ['2 cubes', '4 cubes', '8 cubes', '16 cubes'],
    correct: 2,
    explanation: 'Box volume = 4 × 4 × 4 = 64 cm³. Ice cube volume = 2 × 2 × 2 = 8 cm³. Number of cubes = 64 ÷ 8 = 8 cubes.',
    source: 'CBSE Textbook Page 165 (Fun with Mental Maths Q3)'
  },
  {
    id: 'vol_q15',
    skill: 'real_world_packing',
    type: 'mcq',
    question: 'There are 100 tiles in a pack. Each tile is 15 cm × 15 cm and 3 cm thick. What is the total volume of the whole pack?',
    options: ['675 cm³', '6,750 cm³', '67,500 cm³', '15,000 cm³'],
    correct: 2,
    explanation: 'Volume of 1 tile = 15 × 15 × 3 = 675 cm³. Total volume of 100 tiles = 675 × 100 = 67,500 cm³.',
    source: 'CBSE Textbook Page 164 (Q 2)'
  },
  {
    id: 'vol_q16',
    skill: 'real_world_packing',
    type: 'mcq',
    question: 'A rainwater storage tank has length 10 m, breadth 7 m, and height 8 m. What is its total storage capacity in litres? (1 m³ = 1000 Litres)',
    options: ['560 Litres', '56,000 Litres', '560,000 Litres', '5,600 Litres'],
    correct: 2,
    explanation: 'Tank volume = 10 × 7 × 8 = 560 m³. Since 1 m³ = 1000 Litres, total capacity = 560 × 1000 = 560,000 Litres.',
    source: 'CBSE Textbook Page 165 (Maths Around Us)'
  }
];

const CHALLENGE_QUESTIONS_TOPIC_9 = [
  {
    id: 'vol_ch01',
    question: 'What is the volume of a cube of side 5 cm?',
    options: ['25 cm³', '125 cm³', '15 cm', '100 cm³'],
    correct: 1,
    explanation: 'Volume = 5 × 5 × 5 = 125 cm³.'
  },
  {
    id: 'vol_ch02',
    question: 'A box is 8 cm long, 5 cm wide, and 10 cm high. What is its volume?',
    options: ['400 cm³', '40 cm³', '23 cm', '80 cm³'],
    correct: 0,
    explanation: 'Volume = 8 × 5 × 10 = 400 cm³.'
  },
  {
    id: 'vol_ch03',
    question: 'How many cubic centimetres (cm³) are in 2.5 Litres?',
    options: ['25 cm³', '250 cm³', '2500 cm³', '25,000 cm³'],
    correct: 2,
    explanation: '2.5 × 1000 = 2500 cm³.'
  },
  {
    id: 'vol_ch04',
    question: 'A tank has base area 25 sq cm and height 4 cm. What is its volume?',
    options: ['100 cm³', '29 cm³', '50 cm³', '100 sq cm'],
    correct: 0,
    explanation: 'Volume = Base Area × Height = 25 × 4 = 100 cm³.'
  },
  {
    id: 'vol_ch05',
    question: 'If a cuboid has volume 120 cm³, length 6 cm, and height 4 cm, what is its breadth?',
    options: ['20 cm', '5 cm', '10 cm', '24 cm'],
    correct: 1,
    explanation: 'Breadth = Volume ÷ (Length × Height) = 120 ÷ 24 = 5 cm.'
  }
];
