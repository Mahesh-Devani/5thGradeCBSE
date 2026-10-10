/**
 * Maths Master — Class 5 CBSE
 * Modularized Architecture (Vanilla ES6+ JS)
 * Zero External Runtime Dependencies
 */

'use strict';

/* ==========================================================================
   5.8 TOPIC 5: GEOMETRY, LINES & ANGLES DATA & ENGINES
   ========================================================================== */

const GEOMETRY_FOUNDATIONS = [
  {
    id: 'point',
    name: 'Point',
    symbol: 'P (or • P)',
    symbolHtml: '<strong>• P</strong>',
    endpoints: '0 endpoints',
    measurable: 'No (Dimensionless)',
    desc: 'An exact location in space. It has zero length, width, or thickness. Denoted by a capital letter like A, B, or P.',
    realLife: 'Sharp pencil tip, pinpoint on a map, star in the night sky.',
    svg: `<svg width="240" height="90" viewBox="0 0 240 90">
      <circle cx="120" cy="45" r="6" fill="#38bdf8" />
      <text x="132" y="48" fill="#ffffff" font-size="16" font-weight="bold">P</text>
    </svg>`
  },
  {
    id: 'line',
    name: 'Line',
    symbol: '↔ AB',
    symbolHtml: '<strong><span style="border-top:2px solid; padding-top:2px;">↔</span> AB</strong>',
    endpoints: '0 endpoints',
    measurable: 'No (Extends infinitely both ways)',
    desc: 'A continuous straight path of points that extends indefinitely in BOTH directions without ending. Marked with arrowheads at both ends.',
    realLife: 'Endless horizon, long telephone line stretching across the desert.',
    svg: `<svg width="240" height="90" viewBox="0 0 240 90">
      <defs>
        <marker id="arrow-both-1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#38bdf8"/>
        </marker>
        <marker id="arrow-both-2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#38bdf8"/>
        </marker>
      </defs>
      <line x1="25" y1="45" x2="215" y2="45" stroke="#38bdf8" stroke-width="3" marker-start="url(#arrow-both-1)" marker-end="url(#arrow-both-2)" />
      <circle cx="70" cy="45" r="4" fill="#f59e0b" />
      <text x="65" y="32" fill="#ffffff" font-size="14" font-weight="bold">A</text>
      <circle cx="170" cy="45" r="4" fill="#f59e0b" />
      <text x="165" y="32" fill="#ffffff" font-size="14" font-weight="bold">B</text>
    </svg>`
  },
  {
    id: 'line_segment',
    name: 'Line Segment',
    symbol: '— AB',
    symbolHtml: '<strong><span style="text-decoration:overline;">AB</span></strong>',
    endpoints: '2 fixed endpoints',
    measurable: 'Yes (Can be measured with a ruler!)',
    desc: 'A definite, measurable part of a line bounded by two fixed endpoints A and B. It has a definite, measurable length.',
    realLife: 'Edge of a 15 cm ruler, matchstick, side of a tablet screen.',
    svg: `<svg width="240" height="90" viewBox="0 0 240 90">
      <line x1="50" y1="45" x2="190" y2="45" stroke="#10b981" stroke-width="4" stroke-linecap="round" />
      <circle cx="50" cy="45" r="5" fill="#f59e0b" />
      <text x="45" y="32" fill="#ffffff" font-size="14" font-weight="bold">A</text>
      <circle cx="190" cy="45" r="5" fill="#f59e0b" />
      <text x="185" y="32" fill="#ffffff" font-size="14" font-weight="bold">B</text>
    </svg>`
  },
  {
    id: 'ray',
    name: 'Ray',
    symbol: '→ AB',
    symbolHtml: '<strong><span style="border-top:2px solid; padding-top:2px;">→</span> AB</strong>',
    endpoints: '1 starting endpoint (origin)',
    measurable: 'No (Extends infinitely in one direction)',
    desc: 'Starts at a fixed starting point (origin A) and extends infinitely in one direction through B. Note: Ray AB (starts at A) is NOT the same as Ray BA (starts at B)!',
    realLife: 'Sun rays radiating into space, beam of light from a torch/flashlight, arrow in flight.',
    svg: `<svg width="240" height="90" viewBox="0 0 240 90">
      <defs>
        <marker id="arrow-ray" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#f43f5e"/>
        </marker>
      </defs>
      <line x1="50" y1="45" x2="205" y2="45" stroke="#f43f5e" stroke-width="3" marker-end="url(#arrow-ray)" />
      <circle cx="50" cy="45" r="5" fill="#f59e0b" />
      <text x="43" y="32" fill="#ffffff" font-size="14" font-weight="bold">A (Origin)</text>
      <circle cx="140" cy="45" r="4" fill="#ffffff" />
      <text x="135" y="32" fill="#ffffff" font-size="14" font-weight="bold">B</text>
    </svg>`
  }
];

const LINE_RELATIONSHIPS_DATA = [
  {
    id: 'intersecting',
    title: 'Intersecting Lines',
    symbol: 'Lines crossing at P',
    desc: 'Two lines in the same plane that cross or meet at exactly ONE common point called the <strong>Point of Intersection</strong>.',
    keyRule: 'Intersecting lines create 4 angles. The vertically opposite angles are always equal in measure!',
    examples: ['Letter X', 'Pair of open scissors', 'Road crossroads', 'Crosshairs in telescope'],
    svg: `<svg width="240" height="150" viewBox="0 0 240 150">
      <defs>
        <marker id="arr-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#38bdf8"/>
        </marker>
        <marker id="arr-amber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b"/>
        </marker>
      </defs>
      <line x1="30" y1="125" x2="210" y2="25" stroke="#38bdf8" stroke-width="3" marker-end="url(#arr-blue)" />
      <line x1="30" y1="25" x2="210" y2="125" stroke="#f59e0b" stroke-width="3" marker-end="url(#arr-amber)" />
      <circle cx="120" cy="75" r="5" fill="#ef4444" />
      <text x="128" y="70" fill="#ffffff" font-size="14" font-weight="bold">P (Intersection)</text>
    </svg>`
  },
  {
    id: 'parallel',
    title: 'Parallel Lines',
    symbol: 'AB ∥ CD',
    desc: 'Lines in the same plane that <strong>never intersect or cross</strong>, no matter how far they are extended in either direction.',
    keyRule: 'The perpendicular distance between parallel lines remains <strong>strictly constant</strong> at all points! Symbol: ∥',
    examples: ['Railway track rails', 'Opposite edges of a ruler', 'Opposite margins of a textbook', 'Electric cables'],
    svg: `<svg width="240" height="150" viewBox="0 0 240 150">
      <defs>
        <marker id="arr-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#10b981"/>
        </marker>
      </defs>
      <line x1="25" y1="45" x2="215" y2="45" stroke="#10b981" stroke-width="3" marker-end="url(#arr-green)" />
      <text x="25" y="35" fill="#a7f3d0" font-size="13" font-weight="bold">Line AB</text>
      <line x1="25" y1="105" x2="215" y2="105" stroke="#10b981" stroke-width="3" marker-end="url(#arr-green)" />
      <text x="25" y="125" fill="#a7f3d0" font-size="13" font-weight="bold">Line CD</text>
      <line x1="120" y1="45" x2="120" y2="105" stroke="#f59e0b" stroke-dasharray="4,4" stroke-width="2" />
      <text x="126" y="80" fill="#fcd34d" font-size="12">Distance d = constant</text>
    </svg>`
  },
  {
    id: 'perpendicular',
    title: 'Perpendicular Lines',
    symbol: 'AB ⊥ CD',
    desc: 'Two intersecting lines that meet at an exact <strong>90° Right Angle</strong> (quarter turn). Symbol: ⊥',
    keyRule: 'All 4 adjacent angles formed at the intersection point are exact 90° right angles! Marked with a square corner ∟.',
    examples: ['Letter L and Letter T', 'Adjacent sides of a rectangular paper', 'Floor and wall meeting edge', 'Cross (+) sign'],
    svg: `<svg width="240" height="150" viewBox="0 0 240 150">
      <defs>
        <marker id="arr-purple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#a855f7"/>
        </marker>
      </defs>
      <line x1="30" y1="100" x2="210" y2="100" stroke="#a855f7" stroke-width="3" marker-end="url(#arr-purple)" />
      <line x1="120" y1="140" x2="120" y2="20" stroke="#a855f7" stroke-width="3" marker-end="url(#arr-purple)" />
      <path d="M 120 85 L 135 85 L 135 100" fill="none" stroke="#fcd34d" stroke-width="2.5" />
      <text x="142" y="80" fill="#fcd34d" font-size="13" font-weight="bold">90° (Right Angle)</text>
    </svg>`
  },
  {
    id: 'concurrent',
    title: 'Concurrent Lines',
    symbol: '3+ lines at point O',
    desc: 'Three or more lines in a plane that all pass through the exact <strong>same common point</strong> (Point of Concurrence).',
    keyRule: 'Unlike intersecting lines (only 2 lines), concurrent lines involve 3, 4, or more lines meeting at one single hub!',
    examples: ['Spokes of a bicycle wheel', 'Hands of a clock radiating from central pinion', 'Star pattern'],
    svg: `<svg width="240" height="150" viewBox="0 0 240 150">
      <line x1="30" y1="75" x2="210" y2="75" stroke="#38bdf8" stroke-width="2" />
      <line x1="45" y1="30" x2="195" y2="120" stroke="#ec4899" stroke-width="2" />
      <line x1="45" y1="120" x2="195" y2="30" stroke="#10b981" stroke-width="2" />
      <line x1="120" y1="20" x2="120" y2="130" stroke="#f59e0b" stroke-width="2" />
      <circle cx="120" cy="75" r="5" fill="#ffffff" />
      <text x="126" y="70" fill="#ffffff" font-size="13" font-weight="bold">O (Point of Concurrence)</text>
    </svg>`
  }
];

const ANGLE_TYPES_DATA = [
  {
    id: 'zero',
    name: 'Zero Angle',
    degrees: '0°',
    range: 'Exactly 0°',
    badgeClass: 'acute',
    desc: 'Both rays lie directly on top of each other without any rotation or opening.',
    realLife: 'Clock hands at 12:00 overlapping, closed pair of compasses.',
    symbol: 'θ = 0°'
  },
  {
    id: 'acute',
    name: 'Acute Angle',
    degrees: '< 90°',
    range: 'Greater than 0° and less than 90°',
    badgeClass: 'acute',
    desc: 'A sharp, narrow angle that is smaller than a right angle. Mnemonic: Think "A cute little angle"!',
    realLife: 'Slice of pizza, open scissors slightly, alligator mouth open a little, clock at 2:00 (60°).',
    symbol: '0° < θ < 90°'
  },
  {
    id: 'right',
    name: 'Right Angle',
    degrees: '90°',
    range: 'Exactly 90° (Quarter of a full turn)',
    badgeClass: 'right',
    desc: 'A perfect square corner formed by perpendicular rays. Always marked with a square corner box ∟.',
    realLife: 'Corner of a textbook, adjacent edges of a laptop screen, cross of window pane, clock at 3:00.',
    symbol: 'θ = 90°'
  },
  {
    id: 'obtuse',
    name: 'Obtuse Angle',
    degrees: '> 90° & < 180°',
    range: 'Greater than 90° and less than 180°',
    badgeClass: 'obtuse',
    desc: 'A wide angle that is larger than a right angle, but smaller than a straight line.',
    realLife: 'Reclined lounge chair, open laptop screen tilted back, hand fan opened wide, clock at 4:00 (120°).',
    symbol: '90° < θ < 180°'
  },
  {
    id: 'straight',
    name: 'Straight Angle',
    degrees: '180°',
    range: 'Exactly 180° (Half of a full turn)',
    badgeClass: 'straight',
    desc: 'Two opposite rays extending in opposite directions to form a single continuous straight line.',
    realLife: 'Completely flat open book, horizontal ruler, clock hands at 6:00 (180°).',
    symbol: 'θ = 180°'
  },
  {
    id: 'reflex',
    name: 'Reflex Angle',
    degrees: '> 180° & < 360°',
    range: 'Greater than 180° and less than 360°',
    badgeClass: 'reflex',
    desc: 'An angle that is larger than a straight line but less than a complete rotation.',
    realLife: 'Outside bend of an elbow, major reflex angle of an open door, reflex angle at 8:00 (240°).',
    symbol: '180° < θ < 360°'
  },
  {
    id: 'complete',
    name: 'Complete Angle',
    degrees: '360°',
    range: 'Exactly 360° (One full revolution)',
    badgeClass: 'complete',
    desc: 'One full complete turn of a ray around its vertex back to where it started.',
    realLife: 'Full rotation of minute hand in 1 hour, spinning top complete spin.',
    symbol: 'θ = 360°'
  }
];

const CLOCK_ANGLES_PRESETS = [
  { time: '1:00', hour: 1, min: 0, deg: 30, type: 'Acute Angle', reason: '1 hour gap = 1 × 30° = 30°.' },
  { time: '2:00', hour: 2, min: 0, deg: 60, type: 'Acute Angle', reason: '2 hour gaps = 2 × 30° = 60°.' },
  { time: '3:00', hour: 3, min: 0, deg: 90, type: 'Right Angle ∟', reason: '3 hour gaps = 3 × 30° = 90° (Exact Quarter Turn!).' },
  { time: '4:00', hour: 4, min: 0, deg: 120, type: 'Obtuse Angle', reason: '4 hour gaps = 4 × 30° = 120° (> 90°).' },
  { time: '5:00', hour: 5, min: 0, deg: 150, type: 'Obtuse Angle', reason: '5 hour gaps = 5 × 30° = 150°.' },
  { time: '6:00', hour: 6, min: 0, deg: 180, type: 'Straight Angle', reason: '6 hour gaps = 6 × 30° = 180° (Forms a straight line!).' },
  { time: '8:00', hour: 8, min: 0, deg: 120, type: 'Obtuse Angle (Inside)', reason: 'Shortest angle between 8 and 12 is 4 hour gaps = 120° (Reflex outside = 240°).' },
  { time: '9:00', hour: 9, min: 0, deg: 90, type: 'Right Angle ∟', reason: 'Shortest angle between 9 and 12 is 3 hour gaps = 90° (Quarter Turn!).' }
];

const POLYGON_DATA = [
  { sides: 3, name: 'Triangle', triangles: 1, sum: 180, example: 'Equilateral / Scalene triangle' },
  { sides: 4, name: 'Quadrilateral', triangles: 2, sum: 360, example: 'Square, Rectangle, Rhombus, Trapezium' },
  { sides: 5, name: 'Pentagon', triangles: 3, sum: 540, example: 'US Pentagon building, school sign' },
  { sides: 6, name: 'Hexagon', triangles: 4, sum: 720, example: 'Bee honeycomb cells, hex nut' },
  { sides: 7, name: 'Heptagon', triangles: 5, sum: 900, example: '7-sided polygon, British 50p coin' },
  { sides: 8, name: 'Octagon', triangles: 6, sum: 1080, example: 'Red stop sign on roads' },
  { sides: 9, name: 'Nonagon', triangles: 7, sum: 1260, example: '9-sided polygon (Worksheet Q2: (9 - 2) × 180° = 1260°)' },
  { sides: 10, name: 'Decagon', triangles: 8, sum: 1440, example: '10-sided polygon, star polygon core' }
];

const TRIANGLE_PRESETS = [
  { id: 'ws_1', angles: [20, 60, 100], type: 'Obtuse-angled Triangle', reason: 'One angle (100°) is greater than 90°. (Worksheet Q4a)', badge: 'obtuse' },
  { id: 'ws_2', angles: [37, 23, 120], type: 'Obtuse-angled Triangle', reason: 'One angle (120°) is greater than 90°. (Worksheet Q4b)', badge: 'obtuse' },
  { id: 'ws_3', angles: [55, 45, 80], type: 'Acute-angled Triangle', reason: 'All three angles (55°, 45°, 80°) are less than 90°. (Worksheet Q4c)', badge: 'acute' },
  { id: 'ws_4', angles: [25, 65, 90], type: 'Right-angled Triangle', reason: 'Exactly one angle is 90° (square corner ∟). (Worksheet Q4d)', badge: 'right' },
  { id: 'equi', angles: [60, 60, 60], type: 'Equilateral & Acute Triangle', reason: 'All 3 angles are 60° (all equal) and < 90°. All 3 sides are equal.', badge: 'acute' },
  { id: 'iso_rt', angles: [45, 45, 90], type: 'Right Isosceles Triangle', reason: 'One angle is 90° and two angles are 45° with two equal sides.', badge: 'right' }
];



const LEARN_MODULES_TOPIC_5 = {
  geom_foundations: {
    id: 'geom_foundations',
    pillTitle: '📍 Points, Lines & Rays',
    title: 'Basic Geometric Concepts: Point, Line, Segment & Ray',
    tag: 'Foundations & Notations',
    lead: 'Master the fundamental building blocks of CBSE Class 5 geometry. Learn how to identify, draw, and correctly write mathematical notations for <strong>Points</strong>, <strong>Lines (↔)</strong>, <strong>Line Segments (—)</strong>, and <strong>Rays (→)</strong>.',
    renderContent: (...args) => renderGeomFoundationsModule(...args)
  },
  line_relationships: {
    id: 'line_relationships',
    pillTitle: '🛤️ Parallel & Perpendicular Lines',
    title: 'Line Relationships: Intersecting, Parallel (∥) & Perpendicular (⊥)',
    tag: 'Spatial Reasoning',
    lead: 'Discover how pairs of lines relate in a plane! Explore why <strong>railway tracks must be parallel (constant distance)</strong>, how <strong>perpendicular lines meet at exact 90° right angles (∟)</strong>, and when lines are <strong>concurrent</strong>.',
    renderContent: (...args) => renderLineRelationshipsModule(...args)
  },
  angles_protractor: {
    id: 'angles_protractor',
    pillTitle: '🧭 Angles & Virtual Protractor',
    title: 'Understanding Angles & The Interactive Virtual Protractor',
    tag: 'Measurement & Types',
    lead: 'An angle is formed when two rays meet at a common vertex. Use the <strong>Interactive Virtual Protractor</strong> to rotate arms from 0° to 360° and master all 7 CBSE Class 5 angle types: <strong>Zero, Acute, Right, Obtuse, Straight, Reflex, and Complete</strong>!',
    renderContent: (...args) => renderAnglesProtractorModule(...args)
  },
  triangles_polygons: {
    id: 'triangles_polygons',
    pillTitle: '🔺 Triangles & Polygon Sums',
    title: 'Triangles Classification & The Polygon Interior Angle Sum Theorem',
    tag: 'Shapes & Interior Angles',
    lead: 'Classify triangles by <strong>angles (Acute, Right, Obtuse)</strong> and <strong>sides (Equilateral, Isosceles, Scalene)</strong>. Discover the powerful theorem to find the <strong>sum of interior angles of ANY polygon: $(n - 2) \times 180^\circ$</strong>!',
    renderContent: (...args) => renderTrianglesPolygonsModule(...args)
  },
  quadrilaterals_circles: {
    id: 'quadrilaterals_circles',
    pillTitle: '⬠ Quadrilaterals & Circles',
    title: 'Quadrilateral Properties, Rhombus vs Trapezium & Circle Anatomy',
    tag: '2D Figures & Constructions',
    lead: 'Explore the Quadrilateral Family! Master the <strong>differences between a Rhombus and a Trapezium</strong>, solve <strong>missing angles in quadrilaterals ($360^\circ$ sum)</strong>, and learn how to construct <strong>circles ($r = d/2$) and shapes</strong>.',
    renderContent: (...args) => renderQuadrilateralsCirclesModule(...args)
  },
  clock_angles: {
    id: 'clock_angles',
    pillTitle: '⏰ Clock Hands & Real-Life Angles',
    title: 'Clock Face Angles: The 30° Per Hour Rule',
    tag: 'Real-Life Application',
    lead: 'A clock face is a circular 360° protractor divided into 12 hours! Discover the secret CBSE formula: <strong>Each 1-hour jump equals exactly 30°</strong> ($360° ÷ 12 = 30°$). Test hands at 3:00, 6:00, 2:00, 4:00, and more.',
    renderContent: (...args) => renderClockAnglesModule(...args)
  },
  spot_the_mistakes: {
    id: 'spot_the_mistakes',
    pillTitle: '🕵️ Spot the Mistakes',
    title: 'Be the Teacher: Spot the Mistakes!',
    tag: 'Diagnostic Thinking',
    lead: 'Master geometric concepts by debugging common student errors in ray directions, triangle angle limits, compass diameter settings, and quadrilateral diagonals!',
    renderContent: (...args) => renderSpotMistakesTopic5(...args)
  }
};




const PRACTICE_POOL_TOPIC_5 = [
  // Category 1: foundations
  {
    id: 'geom_1',
    skill: 'foundations',
    type: 'mcq',
    question: 'A part of a line that has two fixed endpoints and a definite, measurable length is called a:',
    options: ['Line', 'Line Segment', 'Ray', 'Point'],
    correct: 1,
    explanation: 'A line segment has two fixed endpoints (A and B). It is the only linear figure that has a definite length that can be measured with a ruler.',
    source: 'CBSE Class 5 Geometry'
  },
  {
    id: 'geom_2',
    skill: 'foundations',
    type: 'mcq',
    question: 'How many endpoints does a Ray have?',
    options: ['0 endpoints', '1 starting endpoint (origin)', '2 endpoints', 'Infinite endpoints'],
    correct: 1,
    explanation: 'A ray has exactly 1 endpoint called its initial point or origin. It extends endlessly in the other direction.',
    source: 'CBSE Class 5 Geometry'
  },
  {
    id: 'geom_3',
    skill: 'foundations',
    type: 'mcq',
    question: 'Which of the following geometric figures extends indefinitely in both directions with no endpoints?',
    options: ['Line Segment', 'Ray', 'Line', 'Angle'],
    correct: 2,
    explanation: 'A line has no endpoints and extends infinitely in both opposite directions. It is marked with arrowheads on both ends.',
    source: 'CBSE Class 5 Geometry'
  },
  {
    id: 'geom_4',
    skill: 'foundations',
    type: 'mcq',
    question: 'Which statement about Ray AB and Ray BA is TRUE?',
    options: [
      'Ray AB and Ray BA are identical rays.',
      'Ray AB starts at A and extends through B; Ray BA starts at B and extends through A.',
      'Neither ray has any endpoints.',
      'Both rays have two fixed endpoints.'
    ],
    correct: 1,
    explanation: 'For a ray, the first letter is the starting origin point! Ray AB starts at A, while Ray BA starts at B. Therefore, they are two completely different rays!',
    source: 'CBSE Class 5 Geometry Trap'
  },
  {
    id: 'geom_5',
    skill: 'foundations',
    type: 'mcq',
    question: 'Three or more points that lie on the exact same straight line are called:',
    options: ['Collinear points', 'Concurrent points', 'Perpendicular points', 'Intersecting points'],
    correct: 0,
    explanation: 'Points lying on the same straight line are called collinear points. If they do not lie on the same line, they are non-collinear.',
    source: 'CBSE Class 5 Geometry'
  },

  // Category 2: line_relationships
  {
    id: 'geom_6',
    skill: 'line_relationships',
    type: 'mcq',
    question: 'Lines in the same plane that never meet or intersect no matter how far they are extended are called:',
    options: ['Intersecting lines', 'Perpendicular lines', 'Parallel lines', 'Collinear lines'],
    correct: 2,
    explanation: 'Parallel lines (symbol: ∥) lie in the same plane and never intersect, keeping a constant perpendicular distance throughout.',
    source: 'CBSE Class 5 Geometry'
  },
  {
    id: 'geom_7',
    skill: 'line_relationships',
    type: 'mcq',
    question: 'The rails of a straight railway track are an excellent real-life example of:',
    options: ['Parallel lines', 'Perpendicular lines', 'Intersecting lines', 'Concurrent lines'],
    correct: 0,
    explanation: 'Railway track rails must remain parallel so the wheels of the train never derail or slip off the track!',
    source: 'CBSE Class 5 Real-Life Geometry'
  },
  {
    id: 'geom_8',
    skill: 'line_relationships',
    type: 'mcq',
    question: 'Two lines that intersect to form an exact 90° right angle (quarter turn) are called:',
    options: ['Parallel lines', 'Perpendicular lines', 'Concurrent lines', 'Opposite rays'],
    correct: 1,
    explanation: 'Perpendicular lines (symbol: ⊥) intersect at an exact 90° right angle, forming a square corner ∟.',
    source: 'CBSE Class 5 Geometry'
  },
  {
    id: 'geom_9',
    skill: 'line_relationships',
    type: 'mcq',
    question: 'Which of the following symbols is used to represent "is perpendicular to"?',
    options: ['∥', '⊥', '∠', '≈'],
    correct: 1,
    explanation: 'The upside-down T symbol (⊥) denotes perpendicularity (e.g., AB ⊥ CD means Line AB is perpendicular to Line CD).',
    source: 'CBSE Class 5 Notations'
  },
  {
    id: 'geom_10',
    skill: 'line_relationships',
    type: 'mcq',
    question: 'Three or more lines that pass through the exact same common point are called:',
    options: ['Concurrent lines', 'Parallel lines', 'Collinear lines', 'Intersecting pairs'],
    correct: 0,
    explanation: 'When 3 or more lines pass through a single common point, they are called concurrent lines, and the meeting point is the Point of Concurrence (like spokes of a bicycle wheel).',
    source: 'CBSE Class 5 Geometry'
  },

  // Category 3: angle_types
  {
    id: 'geom_11',
    skill: 'angle_types',
    type: 'mcq',
    question: 'An angle whose measure is greater than 0° but less than 90° is called an:',
    options: ['Right angle', 'Acute angle', 'Obtuse angle', 'Straight angle'],
    correct: 1,
    explanation: 'An acute angle measures between 0° and 90°. Think: "A-cute little angle" smaller than a square corner.',
    source: 'CBSE Class 5 Angles'
  },
  {
    id: 'geom_12',
    skill: 'angle_types',
    type: 'mcq',
    question: 'An angle measuring exactly 90° is called a:',
    options: ['Acute angle', 'Straight angle', 'Right angle', 'Reflex angle'],
    correct: 2,
    explanation: 'A 90° angle is a Right Angle, representing one-quarter of a full turn (marked with a square corner ∟).',
    source: 'CBSE Class 5 Angles'
  },
  {
    id: 'geom_13',
    skill: 'angle_types',
    type: 'mcq',
    question: 'An angle measuring 135° is classified as an:',
    options: ['Acute angle', 'Right angle', 'Obtuse angle', 'Straight angle'],
    correct: 2,
    explanation: 'Because 135° is greater than 90° and less than 180°, it is an Obtuse Angle.',
    source: 'CBSE Class 5 Angles'
  },
  {
    id: 'geom_14',
    skill: 'angle_types',
    type: 'mcq',
    question: 'An angle that measures exactly 180° is called a:',
    options: ['Right angle', 'Straight angle', 'Reflex angle', 'Complete angle'],
    correct: 1,
    explanation: 'A 180° angle forms a flat straight line (half turn of a full circle) and is called a Straight Angle.',
    source: 'CBSE Class 5 Angles'
  },
  {
    id: 'geom_15',
    skill: 'angle_types',
    type: 'mcq',
    question: 'In the angle written as ∠PQR, which letter represents the vertex?',
    options: ['Point P', 'Point Q (the middle letter)', 'Point R', 'Any letter'],
    correct: 1,
    explanation: 'In angle notation, the middle letter is ALWAYS the vertex where the two arms meet! Here, Q is the vertex, and QP and QR are the arms.',
    source: 'CBSE Class 5 Angle Rules'
  },

  // Category 4: clock_geometry
  {
    id: 'geom_16',
    skill: 'clock_geometry',
    type: 'mcq',
    question: 'At 3:00, what type of angle is formed between the hour hand and minute hand of a clock?',
    options: ['Acute angle (45°)', 'Right angle (90°)', 'Obtuse angle (120°)', 'Straight angle (180°)'],
    correct: 1,
    explanation: 'At 3:00, the minute hand points at 12 and the hour hand points at 3. The 3-hour gap equals 3 × 30° = 90°, which is an exact Right Angle ∟.',
    source: 'CBSE Class 5 Clock Geometry'
  },
  {
    id: 'geom_17',
    skill: 'clock_geometry',
    type: 'mcq',
    question: 'At 6:00, what angle do the hands of a clock form?',
    options: ['Right angle (90°)', 'Straight angle (180°)', 'Reflex angle (270°)', 'Acute angle (60°)'],
    correct: 1,
    explanation: 'At 6:00, the minute hand is at 12 and hour hand is at 6, forming a continuous straight line = 180° (Straight Angle).',
    source: 'CBSE Class 5 Clock Geometry'
  },
  {
    id: 'geom_18',
    skill: 'clock_geometry',
    type: 'mcq',
    question: 'On a 12-hour clock face (360° total), how many degrees are between each consecutive hour number?',
    options: ['15°', '30°', '45°', '60°'],
    correct: 1,
    explanation: 'There are 12 hour divisions in a full 360° circle. 360° ÷ 12 = 30° per hour.',
    source: 'CBSE Class 5 Clock Geometry'
  },
  {
    id: 'geom_19',
    skill: 'clock_geometry',
    type: 'mcq',
    question: 'At 2:00, what is the measure of the smaller angle between the clock hands?',
    options: ['30° (Acute)', '60° (Acute)', '90° (Right)', '120° (Obtuse)'],
    correct: 1,
    explanation: 'There are 2 hour gaps between 12 and 2. 2 × 30° = 60°, which is an Acute Angle (< 90°).',
    source: 'CBSE Class 5 Clock Geometry'
  },
  {
    id: 'geom_20',
    skill: 'clock_geometry',
    type: 'mcq',
    question: 'At 5:00, what is the classification of the smaller angle between the hands of a clock?',
    options: ['Acute angle (75°)', 'Right angle (90°)', 'Obtuse angle (150°)', 'Straight angle (180°)'],
    correct: 2,
    explanation: '5 hour gaps × 30° = 150°. Since 150° is between 90° and 180°, it is an Obtuse Angle.',
    source: 'CBSE Class 5 Clock Geometry'
  },

  // Category 5: triangles_polygons (Worksheet Q2, Q4)
  {
    id: 'geom_21',
    skill: 'triangles_polygons',
    type: 'mcq',
    question: 'What is the sum of all the interior angles of a nonagon (a 9-sided polygon)?',
    options: ['900°', '1080°', '1260°', '1440°'],
    correct: 2,
    explanation: 'The formula for the sum of interior angles of any n-sided polygon is (n − 2) × 180°. For a nonagon (n = 9): (9 − 2) × 180° = 7 × 180° = 1260°!',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 2)'
  },
  {
    id: 'geom_22',
    skill: 'triangles_polygons',
    type: 'mcq',
    question: 'A triangle has interior angles measuring 20°, 60°, and 100°. What type of triangle is it according to its angles?',
    options: ['Acute-angled triangle', 'Right-angled triangle', 'Obtuse-angled triangle', 'Equilateral triangle'],
    correct: 2,
    explanation: 'Because one of the angles measures 100° (which is strictly greater than 90°), this is an Obtuse-angled triangle. (Notice: 20° + 60° + 100° = 180°).',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 4a)'
  },
  {
    id: 'geom_23',
    skill: 'triangles_polygons',
    type: 'mcq',
    question: 'A triangle has angles measuring 37°, 23°, and 120°. Write the type of triangle according to its angles:',
    options: ['Acute-angled triangle', 'Right-angled triangle', 'Obtuse-angled triangle', 'Straight triangle'],
    correct: 2,
    explanation: 'Since 120° is greater than 90°, it contains an obtuse angle, making it an Obtuse-angled triangle. (37° + 23° + 120° = 180°).',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 4b)'
  },
  {
    id: 'geom_24',
    skill: 'triangles_polygons',
    type: 'mcq',
    question: 'Classify the type of triangle having angles: 55°, 45°, and 80°:',
    options: ['Acute-angled triangle', 'Right-angled triangle', 'Obtuse-angled triangle', 'Scalene angle'],
    correct: 0,
    explanation: 'Every single angle (55°, 45°, and 80°) is strictly less than 90°. A triangle in which all three angles are acute (< 90°) is an Acute-angled triangle!',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 4c)'
  },
  {
    id: 'geom_25',
    skill: 'triangles_polygons',
    type: 'mcq',
    question: 'Write the type of triangle according to its angles: 25°, 65°, 90°:',
    options: ['Acute-angled triangle', 'Right-angled triangle', 'Obtuse-angled triangle', 'Isosceles triangle'],
    correct: 1,
    explanation: 'One of the angles is exactly 90° (a right angle, forming a square corner ∟). Therefore, it is a Right-angled triangle!',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 4d)'
  },
  {
    id: 'geom_26',
    skill: 'triangles_polygons',
    type: 'mcq',
    question: 'Which formula gives the sum of all interior angles of a polygon with n sides?',
    options: ['(n − 2) × 180°', '(n + 2) × 180°', 'n × 180°', '(n − 1) × 360°'],
    correct: 0,
    explanation: 'Connecting one vertex to all non-adjacent vertices divides any n-sided polygon into (n − 2) non-overlapping triangles. Since each triangle has 180°, the total sum is (n − 2) × 180°!',
    source: 'CBSE Class 5 Polygon Theorem'
  },
  {
    id: 'geom_27',
    skill: 'triangles_polygons',
    type: 'mcq',
    question: 'What is the sum of all interior angles of an octagon (8 sides)?',
    options: ['720°', '900°', '1080°', '1260°'],
    correct: 2,
    explanation: 'For an octagon (n = 8): Sum = (8 − 2) × 180° = 6 × 180° = 1080°.',
    source: 'CBSE Class 5 Polygons'
  },

  // Category: foundations (Worksheet Q7)
  {
    id: 'geom_28',
    skill: 'foundations',
    type: 'mcq',
    question: 'When we join three collinear points, we get a ______.',
    options: ['Triangle', 'Straight line / Line segment', 'Circle', 'Right angle'],
    correct: 1,
    explanation: 'Collinear points lie on the exact same straight line! Joining them produces a straight line (or line segment). (Note: joining three non-collinear points forms a triangle!).',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 7)'
  },

  // Category 6: quadrilaterals_circles (Worksheet Q8, Q10, Q11)
  {
    id: 'geom_29',
    skill: 'quadrilaterals_circles',
    type: 'mcq',
    question: 'Which of the following is a key difference between a rhombus and a trapezium?',
    options: [
      'A rhombus has 2 pairs of parallel sides and all 4 sides equal; a trapezium has only 1 pair of parallel sides.',
      'A trapezium has all 4 sides equal; a rhombus does not.',
      'A rhombus has 5 vertices; a trapezium has 4.',
      'Both shapes have diagonals of equal length.'
    ],
    correct: 0,
    explanation: 'A rhombus has all 4 sides of equal length and both pairs of opposite sides are parallel. A trapezium has only ONE pair of opposite sides parallel, and its sides are generally unequal!',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 8)'
  },
  {
    id: 'geom_30',
    skill: 'quadrilaterals_circles',
    type: 'mcq',
    question: 'At what angle do the diagonals of a rhombus intersect each other?',
    options: ['45°', '60°', '90° (Right angle ⊥)', '180°'],
    correct: 2,
    explanation: 'The diagonals of a rhombus always bisect each other perpendicularly at an exact right angle (90° ⊥)! In contrast, the diagonals of a trapezium do not.',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 8)'
  },
  {
    id: 'geom_31',
    skill: 'quadrilaterals_circles',
    type: 'mcq',
    question: 'In a quadrilateral, three interior angles measure 85°, 110°, and 95°. Find the missing fourth angle:',
    options: ['65°', '70°', '75°', '80°'],
    correct: 1,
    explanation: 'The sum of all four angles in any quadrilateral is always 360°. Sum of given angles = 85° + 110° + 95° = 290°. Therefore, the missing angle = 360° − 290° = 70°!',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 11a)'
  },
  {
    id: 'geom_32',
    skill: 'quadrilaterals_circles',
    type: 'mcq',
    question: 'In a parallelogram ABCD, angle A = 80°. What are the measures of angles B, C, and D?',
    options: [
      '∠B = 100°, ∠C = 80°, ∠D = 100°',
      '∠B = 80°, ∠C = 100°, ∠D = 80°',
      '∠B = 90°, ∠C = 90°, ∠D = 90°',
      '∠B = 100°, ∠C = 100°, ∠D = 80°'
    ],
    correct: 0,
    explanation: 'In a parallelogram: 1) Opposite angles are equal $\\implies$ ∠C = ∠A = 80°. 2) Adjacent angles are supplementary (sum to 180°) $\\implies$ ∠B = 180° − 80° = 100° and ∠D = 180° − 80° = 100°. (Total: 80° + 100° + 80° + 100° = 360°).',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 11b)'
  },
  {
    id: 'geom_33',
    skill: 'quadrilaterals_circles',
    type: 'mcq',
    question: 'To construct a circle with a diameter of 10 cm, to what radius should you set your compass?',
    options: ['20 cm', '10 cm', '5 cm', '2.5 cm'],
    correct: 2,
    explanation: 'Radius is always half of diameter (Radius = Diameter ÷ 2). For a 10 cm diameter circle, set the compass radius to 10 ÷ 2 = 5 cm!',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 10b)'
  },
  {
    id: 'geom_34',
    skill: 'quadrilaterals_circles',
    type: 'mcq',
    question: 'What is the longest chord that can be drawn inside a circle?',
    options: ['The radius', 'The diameter', 'The circumference', 'The arc'],
    correct: 1,
    explanation: 'A chord joins any two points on a circle. The chord passing through the center of the circle is the Diameter, and it is the longest chord possible in that circle!',
    source: 'CBSE Class 5 Circle Geometry'
  },
  {
    id: 'geom_35',
    skill: 'clock_geometry',
    type: 'mcq',
    question: 'When constructing an angle of 135° with a protractor, what type of angle is drawn?',
    options: ['Acute angle', 'Right angle', 'Obtuse angle', 'Straight angle'],
    correct: 2,
    explanation: 'An angle measuring between 90° and 180° is an Obtuse Angle. Since 135° is greater than 90° and less than 180°, it is an obtuse angle.',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 10d)'
  },
  {
    id: 'geom_36',
    skill: 'quadrilaterals_circles',
    type: 'mcq',
    question: 'A quadrilateral is constructed with length 8 cm and breadth 5 cm, with four 90° right angles. What is this quadrilateral called?',
    options: ['Square', 'Rectangle', 'Rhombus', 'Trapezium'],
    correct: 1,
    explanation: 'A quadrilateral with opposite sides equal (length 8 cm, breadth 5 cm) and all four interior angles equal to 90° is a Rectangle!',
    source: 'CBSE Class 5 Curriculum Worksheet (Q 10a)'
  }
];



const CHALLENGE_QUESTIONS_TOPIC_5 = [
  {
    question: 'How many endpoints does a line segment have?',
    options: ['2', '1', '0', 'Infinite'],
    correct: 0,
    explanation: 'A line segment has 2 fixed endpoints.'
  },
  {
    question: 'How many endpoints does a line have?',
    options: ['0', '1', '2', 'Infinite'],
    correct: 0,
    explanation: 'A line extends endlessly both ways, so it has 0 endpoints.'
  },
  {
    question: 'Which figure can be measured with a ruler?',
    options: ['Line Segment', 'Line', 'Ray', 'Point'],
    correct: 0,
    explanation: 'Only a line segment has a fixed measurable length.'
  },
  {
    question: 'Symbol for perpendicular lines is:',
    options: ['⊥', '∥', '∠', '°'],
    correct: 0,
    explanation: '⊥ denotes perpendicular.'
  },
  {
    question: 'Symbol for parallel lines is:',
    options: ['∥', '⊥', '∠', '↔'],
    correct: 0,
    explanation: '∥ denotes parallel.'
  },
  {
    question: 'An angle of 89° is:',
    options: ['Acute', 'Right', 'Obtuse', 'Straight'],
    correct: 0,
    explanation: '89° is less than 90°, so it is acute.'
  },
  {
    question: 'An angle of 91° is:',
    options: ['Obtuse', 'Right', 'Acute', 'Reflex'],
    correct: 0,
    explanation: '91° is greater than 90° and less than 180°, so it is obtuse.'
  },
  {
    question: 'An angle of exactly 90° is:',
    options: ['Right angle', 'Acute', 'Obtuse', 'Straight'],
    correct: 0,
    explanation: '90° is a right angle.'
  },
  {
    question: 'An angle of exactly 180° is:',
    options: ['Straight angle', 'Right angle', 'Complete angle', 'Reflex angle'],
    correct: 0,
    explanation: '180° is a straight angle.'
  },
  {
    question: 'At 4:00, the angle between clock hands is:',
    options: ['120° (Obtuse)', '90° (Right)', '60° (Acute)', '150° (Obtuse)'],
    correct: 0,
    explanation: '4 hour gaps × 30° = 120°.'
  },
  {
    question: 'At 9:00, the smaller angle between clock hands is:',
    options: ['90° (Right angle)', '120°', '60°', '180°'],
    correct: 0,
    explanation: '3 hour gaps between 9 and 12 = 90°.'
  },
  {
    question: 'In ∠ABC, which point is the vertex?',
    options: ['B', 'A', 'C', 'None'],
    correct: 0,
    explanation: 'The middle letter B is the vertex.'
  },
  {
    question: 'Points on the same straight line are called:',
    options: ['Collinear', 'Concurrent', 'Parallel', 'Coplanar'],
    correct: 0,
    explanation: 'Collinear points lie on the same line.'
  },
  {
    question: 'An angle of 210° is called a:',
    options: ['Reflex angle', 'Obtuse angle', 'Straight angle', 'Complete angle'],
    correct: 0,
    explanation: 'Between 180° and 360° is a reflex angle.'
  },
  {
    question: 'Railway tracks never meet. They are:',
    options: ['Parallel lines', 'Perpendicular lines', 'Intersecting lines', 'Collinear'],
    correct: 0,
    explanation: 'Parallel lines never intersect.'
  }
];

