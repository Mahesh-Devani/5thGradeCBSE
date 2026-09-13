import json
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
OUTPUT_PATH = os.path.join(PROJECT_DIR, 'app.js')

with open(os.path.join(SCRIPT_DIR, 'map_data_final.json'), 'r', encoding='utf-8') as f:
    d = json.load(f)

with open(os.path.join(SCRIPT_DIR, 'world_land_path.txt'), 'r', encoding='utf-8') as f:
    world_land_path = f.read().strip()

with open(os.path.join(SCRIPT_DIR, 'india_world_svg.txt'), 'r', encoding='utf-8') as f:
    india_world_path = f.read().strip()

# Desert approximate polygons (world projection coords)
# These are manually defined bounding regions for each desert
# Using world_proj: x = (lon+170)*(1000/350), y = (84-lat)*(500/154)
def wp(lon, lat):
    return (round((lon+170)*(1000/350)), round((84-lat)*(500/154)))

def make_polygon(coords):
    pts = [wp(lon, lat) for lon, lat in coords]
    segs = [f'{x},{y}' for x, y in pts]
    return 'M ' + ' L '.join(segs) + ' Z'

deserts = [
    {
        'id': 'great-basin', 'name': 'Great Basin Desert', 'number': 1,
        'continent': 'North America',
        'info': "Located in western USA between the Sierra Nevada and Rocky Mountains. It is a cold desert.",
        'coords': [(-120,42),(-112,42),(-112,37),(-114,35),(-120,37)]
    },
    {
        'id': 'peruvian', 'name': 'Peruvian Desert', 'number': 2,
        'continent': 'South America',
        'info': "Also called Sechura Desert, along Peru's Pacific coast.",
        'coords': [(-82,-3),(-77,-3),(-76,-8),(-76,-16),(-78,-16),(-82,-8)]
    },
    {
        'id': 'atacama', 'name': 'Atacama Desert', 'number': 3,
        'continent': 'South America',
        'info': 'The driest desert in the world, in northern Chile.',
        'coords': [(-72,-18),(-68,-18),(-68,-28),(-72,-28)]
    },
    {
        'id': 'patagonian', 'name': 'Patagonian Desert', 'number': 4,
        'continent': 'South America',
        'info': 'Located in Argentina, a cold desert in southern South America.',
        'coords': [(-72,-38),(-65,-38),(-65,-52),(-70,-52)]
    },
    {
        'id': 'sahara', 'name': 'Sahara Desert', 'number': 5,
        'continent': 'Africa',
        'info': "World's largest hot desert, covers most of North Africa.",
        'coords': [(-12,35),(-12,18),(10,12),(25,15),(35,22),(33,32),(10,37)]
    },
    {
        'id': 'arabian', 'name': 'Arabian Desert', 'number': 6,
        'continent': 'Asia',
        'info': 'Covers much of the Arabian Peninsula including Saudi Arabia.',
        'coords': [(35,32),(55,27),(60,22),(55,15),(45,13),(35,18)]
    },
    {
        'id': 'turkestan', 'name': 'Turkestan Desert', 'number': 7,
        'continent': 'Asia',
        'info': 'Includes Karakum and Kyzylkum deserts in Central Asia.',
        'coords': [(52,45),(68,45),(68,35),(52,35)]
    },
    {
        'id': 'thar', 'name': 'Thar Desert', 'number': 8,
        'continent': 'Asia',
        'info': 'Also called the Great Indian Desert, in India and Pakistan.',
        'coords': [(67,30),(72,30),(72,24),(67,24)]
    },
    {
        'id': 'gobi', 'name': 'Gobi Desert', 'number': 9,
        'continent': 'Asia',
        'info': 'A cold desert in Mongolia and northern China.',
        'coords': [(95,48),(120,48),(120,38),(100,38)]
    },
    {
        'id': 'kalahari-namib', 'name': 'Kalahari & Namib Desert', 'number': 10,
        'continent': 'Africa',
        'info': 'Located in southern Africa — Namibia, Botswana, South Africa.',
        'coords': [(12,-18),(28,-18),(28,-28),(15,-32),(12,-28)]
    },
    {
        'id': 'great-australian', 'name': 'Great Australian Desert', 'number': 11,
        'continent': 'Australia',
        'info': 'Covers most of central Australia. Includes Gibson, Simpson and others.',
        'coords': [(120,-20),(142,-20),(145,-28),(138,-32),(122,-30),(118,-26)]
    },
]

for desert in deserts:
    desert['path'] = make_polygon(desert['coords'])

# Equatorial region polygons
eq_regions = [
    {
        'id': 'eq-south-america', 'name': 'South America (Amazon Basin)',
        'info': "The Amazon Rainforest — world's largest tropical rainforest.",
        'coords': [(-78,5),(-50,5),(-45,-5),(-48,-15),(-65,-15),(-78,-5)]
    },
    {
        'id': 'eq-africa', 'name': 'Africa (Congo Basin)',
        'info': 'The Congo Rainforest — second largest tropical rainforest.',
        'coords': [(8,8),(32,8),(32,-5),(8,-5)]
    },
    {
        'id': 'eq-asia', 'name': 'Southeast Asia & Indonesia',
        'info': 'Tropical rainforests of Indonesia, Malaysia, and surrounding islands.',
        'coords': [(95,8),(130,8),(140,-2),(140,-10),(105,-10),(95,-2)]
    },
]

for eq in eq_regions:
    eq['path'] = make_polygon(eq['coords'])


# Now build the complete app.js
# Escape single quotes in paths
def esc(s):
    return s.replace("'", "\\'")

lines = []
lines.append('''/* ============================================
   SST Map Practice — Application Logic
   Class 5 CBSE — I Term Maps
   ============================================ */

// ============================================
// MAP DATA — Real geographic SVG paths from Natural Earth
// ============================================
''')

# === SAUDI ARABIA MAP ===
lines.append('const MAP_DATA = {')
lines.append('  saudiArabia: {')
lines.append("    id: 'saudiArabia',")
lines.append("    title: 'Saudi Arabia & Neighbours',")
lines.append("    subtitle: 'Outline Map — Identify neighbouring countries',")
lines.append("    icon: '🕌',")
lines.append("    viewBox: '0 0 750 650',")
lines.append("    bgColor: 'rgba(6, 182, 212, 0.03)',")
lines.append('    regions: [')

# Background (neighboring non-quiz countries like Egypt, Iran, etc.)
lines.append("      // Background countries")
lines.append("      {")
lines.append("        id: 'saudi-bg',")
lines.append("        name: 'Surrounding Region',")
lines.append("        isBackground: true,")
lines.append("        color: '#94a3c8',")
lines.append(f"        path: '{esc(d['saudi_bg_path'])}'")
lines.append("      },")

# Interactive countries
for r in d['saudi_regions']:
    lines.append("      {")
    lines.append(f"        id: '{r['id']}',")
    lines.append(f"        name: '{esc(r['name'])}',")
    lines.append(f"        direction: '{r['direction']}',")
    lines.append(f"        info: '{esc(r['info'])}',")
    lines.append(f"        color: '{r['color']}',")
    lines.append(f"        path: '{esc(r['path'])}'")
    lines.append("      },")

# Add Bahrain manually (too small for 110m resolution)
lines.append("      {")
lines.append("        id: 'bahrain',")
lines.append("        name: 'Bahrain',")
lines.append("        direction: 'East',")
lines.append("        info: 'Island nation east of Saudi Arabia in the Persian Gulf. Capital: Manama.',")
lines.append("        color: '#ec4899',")
# Bahrain is at roughly 50.5°E, 26°N - a small island
bx1, by1 = (50.2-32)*(750/28), (35-26.3)*(650/25)
bx2, by2 = (50.8-32)*(750/28), (35-26.3)*(650/25)
bx3, by3 = (50.8-32)*(750/28), (35-25.8)*(650/25)
bx4, by4 = (50.2-32)*(750/28), (35-25.8)*(650/25)
lines.append(f"        path: 'M {bx1:.0f},{by1:.0f} L {bx2:.0f},{by2:.0f} L {bx3:.0f},{by3:.0f} L {bx4:.0f},{by4:.0f} Z'")
lines.append("      },")

lines.append('    ],')
lines.append("    directions: {")
lines.append("      'North': ['Jordan', 'Iraq'],")
lines.append("      'East': ['Kuwait', 'Qatar', 'United Arab Emirates', 'Bahrain'],")
lines.append("      'South': ['Yemen', 'Oman']")
lines.append("    }")
lines.append('  },')

# === EQUATORIAL REGIONS MAP ===
lines.append('')
lines.append('  equatorialRegions: {')
lines.append("    id: 'equatorialRegions',")
lines.append("    title: 'Equatorial Regions of the World',")
lines.append("    subtitle: 'World Physical Map — Mark equatorial forest regions',")
lines.append("    icon: '🌍',")
lines.append("    viewBox: '0 0 1000 500',")
lines.append("    bgColor: 'rgba(16, 185, 129, 0.03)',")
lines.append('    regions: [')

# Clean World Continent Outlines (matching school physical map)
lines.append("      {")
lines.append("        id: 'world-land',")
lines.append("        name: 'World Continents',")
lines.append("        isContinent: true,")
lines.append("        color: '#6b7fa8',")
lines.append(f"        path: '{esc(world_land_path)}'")
lines.append("      },")
lines.append("      // Official Survey of India Boundary (As accepted by India)")
lines.append("      {")
lines.append("        id: 'india-official',")
lines.append("        name: 'India (Official Boundary)',")
lines.append("        isIndia: true,")
lines.append("        info: 'Republic of India — Official Survey of India boundary including Jammu & Kashmir and Ladakh.',")
lines.append("        color: 'rgba(59, 130, 246, 0.15)',")
lines.append("        stroke: '#60a5fa',")
lines.append(f"        path: '{esc(india_world_path)}'")
lines.append("      },")

# Equatorial regions
for eq in eq_regions:
    lines.append("      {")
    lines.append(f"        id: '{eq['id']}',")
    lines.append(f"        name: '{esc(eq['name'])}',")
    lines.append("        isEquatorial: true,")
    lines.append(f"        info: '{esc(eq['info'])}',")
    lines.append("        color: '#10b981',")
    lines.append(f"        path: '{esc(eq['path'])}'")
    lines.append("      },")

# Equator Y position: (84-0)*(500/154) = 273
lines.append('    ],')
lines.append('    equatorY: 273,')
lines.append('    directions: null')
lines.append('  },')

# === MAJOR DESERTS MAP ===
lines.append('')
lines.append('  majorDeserts: {')
lines.append("    id: 'majorDeserts',")
lines.append("    title: 'Major Deserts of the World',")
lines.append("    subtitle: 'World Physical Map — Locate all 11 major deserts',")
lines.append("    icon: '🏜️',")
lines.append("    viewBox: '0 0 1000 500',")
lines.append("    bgColor: 'rgba(245, 158, 11, 0.03)',")
lines.append('    regions: [')

# Same clean continent outlines and official Survey of India boundary
lines.append("      {")
lines.append("        id: 'world-land-d',")
lines.append("        name: 'World Continents',")
lines.append("        isContinent: true,")
lines.append("        color: '#6b7fa8',")
lines.append(f"        path: '{esc(world_land_path)}'")
lines.append("      },")
lines.append("      {")
lines.append("        id: 'india-official-d',")
lines.append("        name: 'India (Official Boundary)',")
lines.append("        isIndia: true,")
lines.append("        info: 'Republic of India — Official Survey of India boundary including Jammu & Kashmir and Ladakh.',")
lines.append("        color: 'rgba(59, 130, 246, 0.15)',")
lines.append("        stroke: '#60a5fa',")
lines.append(f"        path: '{esc(india_world_path)}'")
lines.append("      },")

# Desert regions
for desert in deserts:
    lines.append("      {")
    lines.append(f"        id: '{desert['id']}',")
    lines.append(f"        name: '{esc(desert['name'])}',")
    lines.append("        isDesert: true,")
    lines.append(f"        number: {desert['number']},")
    lines.append(f"        continent: '{desert['continent']}',")
    lines.append(f"        info: '{esc(desert['info'])}',")
    lines.append("        color: '#f59e0b',")
    lines.append(f"        path: '{esc(desert['path'])}'")
    lines.append("      },")

lines.append('    ],')
lines.append('    equatorY: 273,')
lines.append('    directions: null')
lines.append('  },')

# === DRC & NEIGHBOURS MAP ===
lines.append('')
lines.append('  drcNeighbours: {')
lines.append("    id: 'drcNeighbours',")
lines.append("    title: 'DRC & Its Neighbours',")
lines.append("    subtitle: 'Africa Political Map — Identify neighbouring countries',")
lines.append("    icon: '🌍',")
lines.append("    viewBox: '250 250 340 380',")
lines.append("    bgColor: 'rgba(139, 92, 246, 0.03)',")
lines.append('    regions: [')

# Africa background
lines.append("      {")
lines.append("        id: 'africa-bg',")
lines.append("        name: 'Africa',")
lines.append("        isBackground: true,")
lines.append("        color: '#94a3c8',")
lines.append(f"        path: '{esc(d['drc_bg_path'])}'")
lines.append("      },")

# DRC countries
for r in d['drc_regions']:
    lines.append("      {")
    lines.append(f"        id: '{r['id']}',")
    lines.append(f"        name: '{esc(r['name'])}',")
    lines.append(f"        direction: '{r['direction']}',")
    lines.append(f"        info: '{esc(r['info'])}',")
    lines.append(f"        color: '{r['color']}',")
    lines.append(f"        path: '{esc(r['path'])}'")
    lines.append("      },")

lines.append('    ],')
lines.append("    directions: {")
lines.append("      'North': ['Central African Republic', 'South Sudan'],")
lines.append("      'East': ['Uganda', 'Rwanda', 'Burundi', 'Tanzania'],")
lines.append("      'West': ['Republic of the Congo'],")
lines.append("      'South': ['Zambia', 'Angola']")
lines.append("    }")
lines.append('  }')
lines.append('};')

# Write to output file
output_path = OUTPUT_PATH

# Read the rest of app.js (everything after MAP_DATA)
# We'll append all the application logic
app_logic = '''

// ============================================
// APPLICATION STATE
// ============================================
const state = {
  currentMap: null,
  currentMode: 'learn',
  quizQueue: [],
  quizIndex: 0,
  score: { correct: 0, incorrect: 0, total: 0 },
  timer: null,
  timeLeft: 0,
  timeTotal: 0,
  bestScores: {},
  tooltip: null,
  worksheetType: 'blank'
};


// ============================================
// PERSISTENCE
// ============================================
function loadProgress() {
  try {
    const saved = localStorage.getItem('sst-map-progress');
    if (saved) state.bestScores = JSON.parse(saved);
  } catch (e) {}
}

function saveProgress() {
  try {
    localStorage.setItem('sst-map-progress', JSON.stringify(state.bestScores));
  } catch (e) {}
}

function getStars(mapId) {
  const best = state.bestScores[mapId];
  if (!best) return 0;
  const pct = best.correct / best.total;
  if (pct >= 1) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.4) return 1;
  return 0;
}

function renderStars(count) {
  return '\\u2B50'.repeat(count) + '\\u2606'.repeat(3 - count);
}


// ============================================
// SIDEBAR
// ============================================
function renderSidebar() {
  const sidebar = document.getElementById('sidebar-maps');
  sidebar.innerHTML = '';
  Object.values(MAP_DATA).forEach(map => {
    const stars = getStars(map.id);
    const card = document.createElement('div');
    card.className = 'map-card' + (state.currentMap?.id === map.id ? ' active' : '');
    card.id = 'card-' + map.id;
    card.onclick = () => selectMap(map.id);
    card.innerHTML =
      '<div class="map-card-icon" style="background:' + map.bgColor + '">' + map.icon + '</div>' +
      '<div class="map-card-info"><h3>' + map.title + '</h3>' +
      '<p>' + map.subtitle.split('\\u2014')[0].trim() + '</p></div>' +
      '<div class="map-card-progress"><div class="stars">' + renderStars(stars) + '</div></div>';
    sidebar.appendChild(card);
  });
  updateOverallProgress();
}

function updateOverallProgress() {
  const total = Object.keys(MAP_DATA).length * 3;
  let earned = 0;
  Object.keys(MAP_DATA).forEach(id => { earned += getStars(id); });
  const pct = total > 0 ? Math.round((earned / total) * 100) : 0;
  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = earned + ' / ' + total + ' stars earned';
}


// ============================================
// MAP SELECTION & MODE
// ============================================
function selectMap(mapId) {
  state.currentMap = MAP_DATA[mapId];
  state.currentMode = 'learn';
  clearTimer();
  resetZoom();
  renderSidebar();
  renderTopBar();
  renderMap();
  renderInfoPanel();
  hideWelcome();
}

function setMode(mode) {
  state.currentMode = mode;
  clearTimer();
  state.score = { correct: 0, incorrect: 0, total: 0 };
  renderTopBar();
  renderMap();
  renderInfoPanel();
  if (mode === 'quiz' || mode === 'timed') startQuiz();
}

function hideWelcome() {
  const w = document.getElementById('welcome-screen');
  const m = document.getElementById('map-area');
  if (w) w.style.display = 'none';
  if (m) m.style.display = 'flex';
}

function showWelcome() {
  const w = document.getElementById('welcome-screen');
  const m = document.getElementById('map-area');
  if (w) w.style.display = 'flex';
  if (m) m.style.display = 'none';
}


// ============================================
// TOP BAR
// ============================================
function renderTopBar() {
  const t = document.getElementById('top-bar-title');
  const s = document.getElementById('top-bar-subtitle');
  if (state.currentMap) {
    t.textContent = state.currentMap.title;
    s.textContent = state.currentMap.subtitle;
  }
  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === state.currentMode);
  });
}


// ============================================
// SVG MAP RENDERING
// ============================================
function renderMap() {
  const container = document.getElementById('map-svg-container');
  if (!state.currentMap || !container) return;
  const map = state.currentMap;
  container.style.background = map.bgColor;

  let svg = '<svg class="map-svg" viewBox="' + map.viewBox + '" xmlns="http://www.w3.org/2000/svg">';

  // Equator line for world maps
  if (map.equatorY) {
    const vbW = parseInt(map.viewBox.split(' ')[2]);
    svg += '<line x1="0" y1="' + map.equatorY + '" x2="' + vbW + '" y2="' + map.equatorY + '" ' +
           'stroke="rgba(239,68,68,0.25)" stroke-width="1" stroke-dasharray="8,4"/>';
    svg += '<text x="15" y="' + (map.equatorY - 5) + '" class="label-small" fill="rgba(239,68,68,0.5)" ' +
           'font-size="9" text-anchor="start">Equator</text>';
  }

  // Draw regions
  map.regions.forEach(region => {
    const isClickable = !region.isContinent && !region.isBackground && !region.isIndia;
    const fillOp = (region.isContinent || region.isBackground) ? 0.08 : region.isIndia ? 0.15 : 0.15;
    const strokeOp = region.isIndia ? 0.7 : (region.isContinent || region.isBackground) ? 0.12 : 0.4;
    const classes = ['region'];
    if (region.isContinent || region.isBackground) classes.push('continent-bg');
    if (region.isIndia) classes.push('india-official-border');
    if (isClickable) classes.push('clickable');

    svg += '<path id="region-' + region.id + '" class="' + classes.join(' ') + '" ' +
           'd="' + region.path + '" data-id="' + region.id + '" data-name="' + region.name + '" ' +
           'style="fill:rgba(' + hexToRgb(region.color) + ',' + fillOp + ');' +
           'stroke:rgba(' + hexToRgb(region.color) + ',' + strokeOp + ');"/>';
  });

  // Draw labels
  map.regions.forEach(region => {
    if (region.isBackground || region.isIndia) return;
    const center = getPathCenter(region.path);
    const showLabel = state.currentMode === 'learn' || region.isContinent;
    const labelClass = region.isContinent ? 'label label-small' : 'label';
    const hidden = (!showLabel && !region.isContinent) ? ' hidden' : '';

    if (region.isDesert && state.currentMode !== 'learn') {
      svg += '<text x="' + center.x + '" y="' + center.y + '" class="label" font-size="12" ' +
             'font-weight="800" fill="#f59e0b">' + region.number + '</text>';
    } else {
      let name = region.name;
      if (name.length > 22) {
        const parts = name.split(' ');
        name = parts.length > 2 ? parts.slice(0, 2).join(' ') : name.substring(0, 20);
      }
      const labelFontSize = (map.id === 'drcNeighbours') ? ' font-size="8.5"' : (region.isContinent ? ' font-size="9"' : '');
      svg += '<text x="' + center.x + '" y="' + center.y + '" class="' + labelClass + hidden + '"' + labelFontSize + ' ' +
             'data-label="' + region.id + '">' + name + '</text>';
    }
  });

  // Compass rose
  const vbParts = map.viewBox.split(' ').map(Number);
  const vbX = vbParts[0], vbY = vbParts[1], vbW = vbParts[2];
  const compassX = vbX + vbW - (vbW < 500 ? 28 : 45);
  const compassY = vbY + (vbW < 500 ? 24 : 30);
  const compassScale = vbW < 500 ? 0.65 : 1.0;
  svg += '<g transform="translate(' + compassX + ', ' + compassY + ') scale(' + compassScale + ')">' +
         '<circle r="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>' +
         '<text x="0" y="-8" class="compass" text-anchor="middle">N</text>' +
         '<text x="0" y="14" class="compass" text-anchor="middle" font-size="8">S</text>' +
         '<text x="-12" y="3" class="compass" text-anchor="middle" font-size="8">W</text>' +
         '<text x="12" y="3" class="compass" text-anchor="middle" font-size="8">E</text></g>';

  svg += '</svg>';
  container.innerHTML = svg;
  applyZoom(false);

  // Event listeners
  container.querySelectorAll('.region.clickable').forEach(el => {
    el.addEventListener('click', () => onRegionClick(el.dataset.id));
    el.addEventListener('mouseenter', (e) => onRegionHover(el.dataset.id, e));
    el.addEventListener('mouseleave', () => onRegionLeave());
  });
}


// ============================================
// INFO PANEL
// ============================================
function renderInfoPanel() {
  const panel = document.getElementById('info-panel');
  if (!panel || !state.currentMap) return;

  let html = '';

  if (state.currentMode === 'quiz' || state.currentMode === 'timed') {
    html += '<div class="quiz-prompt" id="quiz-prompt">' +
            '<div class="prompt-label">Find on the map</div>' +
            '<div class="prompt-text" id="prompt-text">Loading...</div>' +
            '<div class="prompt-hint" id="prompt-hint"></div></div>';
  }

  html += '<div class="timer-bar ' + (state.currentMode === 'timed' ? 'visible' : '') + '" id="timer-bar">' +
          '<div class="timer-display" id="timer-display">\\u23F1\\uFE0F 0:00</div>' +
          '<div class="timer-progress"><div class="timer-progress-fill" id="timer-progress-fill"></div></div></div>';

  html += '<div class="score-card"><h4>Score</h4><div class="score-grid">' +
          '<div class="score-item correct"><div class="score-value" id="score-correct">' + state.score.correct + '</div><div class="score-label">Correct</div></div>' +
          '<div class="score-item incorrect"><div class="score-value" id="score-incorrect">' + state.score.incorrect + '</div><div class="score-label">Incorrect</div></div>' +
          '<div class="score-item total"><div class="score-value" id="score-remaining">' + state.score.total + '</div><div class="score-label">Remaining</div></div>' +
          '<div class="score-item time"><div class="score-value" id="score-stars">' + renderStars(getStars(state.currentMap.id)) + '</div><div class="score-label">Best</div></div>' +
          '</div></div>';

  if (state.currentMap.directions) {
    const dc = { North: '#3b82f6', East: '#8b5cf6', South: '#ef4444', West: '#10b981' };
    html += '<div class="direction-legend"><h4>Direction Legend</h4>';
    Object.entries(state.currentMap.directions).forEach(([dir, countries]) => {
      html += '<div class="direction-item"><span class="direction-dot" style="background:' + (dc[dir]||'#94a3c8') + '"></span>' +
              '<strong>' + dir + ':</strong> ' + countries.join(', ') + '</div>';
    });
    html += '</div>';
  }

  panel.innerHTML = html;
}


// ============================================
// QUIZ ENGINE
// ============================================
function startQuiz() {
  if (!state.currentMap) return;
  const quizRegions = state.currentMap.regions.filter(r =>
    !r.isContinent && !r.isBackground && !r.isIndia &&
    r.id !== 'saudi-arabia' && r.id !== 'drc' && r.id !== 'saudi-bg' && r.id !== 'africa-bg'
  );
  state.quizQueue = shuffleArray([...quizRegions]);
  state.quizIndex = 0;
  state.score = { correct: 0, incorrect: 0, total: quizRegions.length };

  if (state.currentMode === 'timed') {
    state.timeTotal = quizRegions.length * 8;
    state.timeLeft = state.timeTotal;
    startTimer();
  }
  renderInfoPanel();
  showNextQuestion();
}

function showNextQuestion() {
  if (state.quizIndex >= state.quizQueue.length) { endQuiz(); return; }
  const region = state.quizQueue[state.quizIndex];
  const p = document.getElementById('prompt-text');
  const h = document.getElementById('prompt-hint');
  if (p) {
    p.textContent = region.name;
    p.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => { if (p) p.style.animation = ''; }, 300);
  }
  if (h) {
    if (region.direction) h.textContent = 'Direction: ' + region.direction;
    else if (region.continent) h.textContent = 'Continent: ' + region.continent;
    else h.textContent = 'Click on the correct region';
  }
  updateScoreDisplay();
}

function onRegionClick(regionId) {
  if (state.currentMode === 'learn') return;
  if (state.quizIndex >= state.quizQueue.length) return;
  const target = state.quizQueue[state.quizIndex];
  const el = document.querySelector('#region-' + regionId.replace(/[^a-zA-Z0-9-]/g, ''));

  if (regionId === target.id) {
    state.score.correct++;
    state.score.total--;
    if (el) {
      el.classList.add('correct');
      setTimeout(() => { el.classList.remove('correct'); el.classList.add('answered'); }, 800);
    }
    showFeedback(true, target.name);
    state.quizIndex++;
    setTimeout(() => showNextQuestion(), 900);
  } else {
    state.score.incorrect++;
    if (el) {
      el.classList.add('incorrect');
      setTimeout(() => el.classList.remove('incorrect'), 600);
    }
    showFeedback(false);
    const correctEl = document.querySelector('#region-' + target.id.replace(/[^a-zA-Z0-9-]/g, ''));
    if (correctEl) {
      correctEl.classList.add('target-highlight');
      setTimeout(() => {
        correctEl.classList.remove('target-highlight');
        correctEl.classList.add('answered');
        state.score.total--;
        state.quizIndex++;
        showNextQuestion();
      }, 1500);
    } else {
      state.score.total--;
      state.quizIndex++;
      setTimeout(() => showNextQuestion(), 1000);
    }
  }
}

function endQuiz() {
  clearTimer();
  const total = state.quizQueue.length;
  const correct = state.score.correct;
  const pct = total > 0 ? correct / total : 0;
  let stars = 0;
  if (pct >= 1) stars = 3;
  else if (pct >= 0.7) stars = 2;
  else if (pct >= 0.4) stars = 1;

  const mapId = state.currentMap.id;
  if (!state.bestScores[mapId] || correct > state.bestScores[mapId].correct) {
    state.bestScores[mapId] = { correct, total };
    saveProgress();
  }
  showResultsModal(correct, total, stars);
  renderSidebar();
}

function updateScoreDisplay() {
  const c = document.getElementById('score-correct');
  const i = document.getElementById('score-incorrect');
  const r = document.getElementById('score-remaining');
  if (c) c.textContent = state.score.correct;
  if (i) i.textContent = state.score.incorrect;
  if (r) r.textContent = state.score.total;
}


// ============================================
// TIMER
// ============================================
function startTimer() {
  clearTimer();
  updateTimerDisplay();
  state.timer = setInterval(() => {
    state.timeLeft--;
    updateTimerDisplay();
    if (state.timeLeft <= 0) endQuiz();
  }, 1000);
}

function clearTimer() {
  if (state.timer) { clearInterval(state.timer); state.timer = null; }
}

function updateTimerDisplay() {
  const d = document.getElementById('timer-display');
  const f = document.getElementById('timer-progress-fill');
  if (d) {
    const m = Math.floor(state.timeLeft / 60);
    const s = state.timeLeft % 60;
    d.textContent = '\\u23F1\\uFE0F ' + m + ':' + String(s).padStart(2, '0');
    d.className = 'timer-display' + (state.timeLeft <= 10 ? ' warning' : '');
  }
  if (f) {
    const pct = state.timeTotal > 0 ? (state.timeLeft / state.timeTotal) * 100 : 0;
    f.style.width = pct + '%';
    f.style.background = state.timeLeft <= 10 ? 'var(--accent-red)' : 'var(--accent-amber)';
  }
}


// ============================================
// LEARN MODE TOOLTIP
// ============================================
function onRegionHover(regionId, event) {
  if (state.currentMode !== 'learn') return;
  const region = state.currentMap.regions.find(r => r.id === regionId);
  if (!region || region.isContinent || region.isBackground) return;
  const tooltip = document.getElementById('learn-tooltip');
  if (!tooltip) return;

  let html = '<h5>' + region.name + '</h5>';
  if (region.info) html += '<p>' + region.info + '</p>';
  if (region.direction) html += '<p style="margin-top:4px;color:var(--accent-blue)">Direction: ' + region.direction + '</p>';
  if (region.number) html += '<p style="margin-top:4px;color:var(--accent-amber)">#' + region.number + '</p>';
  tooltip.innerHTML = html;

  const rect = event.target.getBoundingClientRect();
  tooltip.style.left = (rect.left + rect.width / 2) + 'px';
  tooltip.style.top = (rect.top - 10) + 'px';
  tooltip.classList.add('visible');

  const el = document.querySelector('#region-' + regionId.replace(/[^a-zA-Z0-9-]/g, ''));
  if (el) el.classList.add('highlighted');
}

function onRegionLeave() {
  const tooltip = document.getElementById('learn-tooltip');
  if (tooltip) tooltip.classList.remove('visible');
  document.querySelectorAll('.region.highlighted').forEach(el => el.classList.remove('highlighted'));
}


// ============================================
// FEEDBACK
// ============================================
function showFeedback(isCorrect, name) {
  const flash = document.getElementById('feedback-flash');
  if (!flash) return;
  flash.className = 'feedback-flash ' + (isCorrect ? 'correct' : 'incorrect');
  flash.textContent = isCorrect ? ('\\u2705 Correct! ' + (name || '')) : '\\u274C Try again!';
  flash.classList.add('show');
  setTimeout(() => flash.classList.remove('show'), 1500);
}


// ============================================
// RESULTS MODAL
// ============================================
function showResultsModal(correct, total, stars) {
  const overlay = document.getElementById('results-modal');
  if (!overlay) return;
  const pct = Math.round((correct / total) * 100);
  let message, icon;
  if (stars === 3) { message = 'Perfect Score! Amazing! \\uD83C\\uDF89'; icon = '\\uD83C\\uDFC6'; fireConfetti(); }
  else if (stars === 2) { message = 'Great job! Keep practicing!'; icon = '\\uD83C\\uDF1F'; }
  else if (stars === 1) { message = 'Good effort! You can do better!'; icon = '\\uD83D\\uDCAA'; }
  else { message = 'Keep trying! Practice makes perfect!'; icon = '\\uD83D\\uDCDA'; }

  overlay.querySelector('.result-icon').textContent = icon;
  overlay.querySelector('.modal h3').textContent = message;
  overlay.querySelector('.modal p').textContent = 'You scored ' + pct + '% on ' + state.currentMap.title;
  overlay.querySelector('.stars-display').textContent = renderStars(stars);
  overlay.querySelector('#result-correct').textContent = correct;
  overlay.querySelector('#result-correct').style.color = 'var(--accent-green)';
  overlay.querySelector('#result-total').textContent = total;
  overlay.querySelector('#result-total').style.color = 'var(--accent-blue)';
  overlay.classList.add('visible');
}

function closeResultsModal() {
  const o = document.getElementById('results-modal');
  if (o) o.classList.remove('visible');
}

function retryQuiz() { closeResultsModal(); startQuiz(); }


// ============================================
// CONFETTI
// ============================================
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = [];
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width, y: -20 - Math.random() * 200,
      w: 6 + Math.random() * 6, h: 4 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4, vy: 2 + Math.random() * 4,
      rot: Math.random() * 360, rotSpeed: (Math.random() - 0.5) * 10, life: 1
    });
  }
  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      if (p.life <= 0) return;
      alive = true;
      p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.rot += p.rotSpeed; p.life -= 0.005;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (alive && frame < 300) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  animate();
}


// ============================================
// WORKSHEET / PRINT
// ============================================
function openWorksheetModal() {
  const o = document.getElementById('worksheet-modal');
  if (o) o.classList.add('visible');
}

function closeWorksheetModal() {
  const o = document.getElementById('worksheet-modal');
  if (o) o.classList.remove('visible');
}

function selectWorksheetType(type) {
  state.worksheetType = type;
  document.querySelectorAll('.worksheet-option').forEach(el => {
    el.classList.toggle('selected', el.dataset.type === type);
  });
}

function printWorksheet() {
  if (!state.currentMap) return;
  closeWorksheetModal();
  const pc = document.getElementById('print-worksheet');
  const map = state.currentMap;
  const isBlank = state.worksheetType === 'blank';

  let svg = '<svg class="map-svg" viewBox="' + map.viewBox + '" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-height:55vh;">';
  if (map.equatorY) {
    const w = parseInt(map.viewBox.split(' ')[2]);
    svg += '<line x1="0" y1="' + map.equatorY + '" x2="' + w + '" y2="' + map.equatorY + '" stroke="#999" stroke-width="0.8" stroke-dasharray="6,3"/>';
    svg += '<text x="15" y="' + (map.equatorY - 4) + '" font-size="8" fill="#999" text-anchor="start" font-family="Outfit,sans-serif">Equator</text>';
  }
  map.regions.forEach(region => {
    const isMain = !region.isContinent && !region.isBackground && !region.isIndia;
    const strokeW = region.isIndia ? 1.0 : (isMain ? 1.2 : 0.6);
    const strokeColor = region.isIndia ? '#2563eb' : '#333';
    const strokeDash = region.isIndia ? ' stroke-dasharray="3,2"' : '';
    svg += '<path d="' + region.path + '" fill="' + (isMain ? '#f5f5f5' : '#fafafa') + '" stroke="' + strokeColor + '" stroke-width="' + strokeW + '"' + strokeDash + '/>';
    if (region.isBackground || region.isContinent || region.isIndia) return;
    const center = getPathCenter(region.path);
    if (isBlank) {
      if (region.isDesert) {
        svg += '<text x="' + center.x + '" y="' + center.y + '" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="700" font-family="Outfit,sans-serif" fill="#333">' + region.number + '</text>';
      } else {
        const idx = map.regions.filter(r => !r.isContinent && !r.isBackground && !r.isIndia).indexOf(region) + 1;
        svg += '<circle cx="' + center.x + '" cy="' + center.y + '" r="8" fill="white" stroke="#333" stroke-width="0.8"/>';
        svg += '<text x="' + center.x + '" y="' + center.y + '" text-anchor="middle" dominant-baseline="central" font-size="8" font-weight="600" font-family="Outfit,sans-serif" fill="#333">' + idx + '</text>';
      }
    } else {
      let name = region.name;
      if (name.length > 18) name = name.split(' ').slice(0, 2).join(' ');
      svg += '<text x="' + center.x + '" y="' + center.y + '" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="600" font-family="Outfit,sans-serif" fill="#222">' + name + '</text>';
    }
  });
  svg += '</svg>';

  let answerBox = '';
  if (isBlank) {
    const qr = map.regions.filter(r => !r.isContinent && !r.isBackground && !r.isIndia);
    answerBox = '<div class="ws-answer-box"><h4>Identify the following:</h4>';
    qr.forEach((r, i) => {
      const num = r.isDesert ? r.number : (i + 1);
      answerBox += '<div class="ws-answer-line"><span class="num">' + num + '.</span><span class="blank"></span></div>';
    });
    answerBox += '</div>';
  }

  let dirInfo = '';
  if (map.directions && !isBlank) {
    dirInfo = '<div class="ws-answer-box"><h4>Direction Guide</h4>';
    Object.entries(map.directions).forEach(([dir, items]) => {
      dirInfo += '<div class="ws-answer-line"><span class="num">' + dir + ':</span><span>' + items.join(', ') + '</span></div>';
    });
    dirInfo += '</div>';
  }

  pc.innerHTML =
    '<div class="ws-header"><h2>' + map.title + '</h2><p>' + map.subtitle + ' \\u2014 Class 5 CBSE SST</p></div>' +
    '<div class="ws-student-info"><span>Name: _________________________</span><span>Date: _______________</span><span>Section: _______</span></div>' +
    '<div style="border:2px solid #333;border-radius:4px;padding:12px;background:white;">' + svg + '</div>' +
    answerBox + dirInfo +
    '<div class="ws-footer">SST Map Practice \\u2014 Class 5 CBSE | Generated for practice</div>';
  pc.style.display = 'block';
  setTimeout(() => { window.print(); setTimeout(() => { pc.style.display = 'none'; }, 500); }, 300);
}


// ============================================
// UTILITIES
// ============================================
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r + ',' + g + ',' + b;
}

function getPathCenter(pathStr) {
  const nums = pathStr.match(/[\\d.]+/g);
  if (!nums || nums.length < 2) return { x: 0, y: 0 };
  let sumX = 0, sumY = 0, count = 0;
  for (let i = 0; i < nums.length - 1; i += 2) {
    sumX += parseFloat(nums[i]);
    sumY += parseFloat(nums[i + 1]);
    count++;
  }
  return { x: Math.round(sumX / count), y: Math.round(sumY / count) };
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


// ============================================
// ZOOM & PAN ENGINE
// ============================================
const zoomState = {
  scale: 1.0,
  x: 0,
  y: 0,
  isDragging: false,
  startX: 0,
  startY: 0
};

function applyZoom(isDragging = false) {
  const svg = document.querySelector('#map-svg-container svg');
  if (!svg) return;
  svg.style.transition = isDragging ? 'none' : 'transform 0.18s cubic-bezier(0.2, 0, 0, 1)';
  svg.style.transformOrigin = 'center center';
  svg.style.transform = 'translate(' + zoomState.x + 'px, ' + zoomState.y + 'px) scale(' + zoomState.scale + ')';

  const resetBtn = document.getElementById('btn-zoom-reset');
  if (resetBtn) {
    resetBtn.textContent = Math.round(zoomState.scale * 100) + '%';
  }

  const container = document.getElementById('map-svg-container');
  if (container) {
    if (zoomState.scale > 1.0) {
      container.style.cursor = isDragging ? 'grabbing' : 'grab';
    } else {
      container.style.cursor = 'default';
    }
  }
}

function zoomIn() {
  if (zoomState.scale < 3.0) {
    zoomState.scale = Math.min(3.0, +(zoomState.scale + 0.25).toFixed(2));
    applyZoom(false);
  }
}

function zoomOut() {
  if (zoomState.scale > 0.7) {
    zoomState.scale = Math.max(0.7, +(zoomState.scale - 0.25).toFixed(2));
    if (zoomState.scale <= 1.0) {
      zoomState.x = 0;
      zoomState.y = 0;
    }
    applyZoom(false);
  }
}

function resetZoom() {
  zoomState.scale = 1.0;
  zoomState.x = 0;
  zoomState.y = 0;
  applyZoom(false);
}

function setupZoomControls() {
  const inBtn = document.getElementById('btn-zoom-in');
  const outBtn = document.getElementById('btn-zoom-out');
  const resetBtn = document.getElementById('btn-zoom-reset');
  if (inBtn) inBtn.onclick = zoomIn;
  if (outBtn) outBtn.onclick = zoomOut;
  if (resetBtn) resetBtn.onclick = resetZoom;

  const container = document.getElementById('map-svg-container');
  if (!container) return;

  // Mouse wheel zoom
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  }, { passive: false });

  // Mouse drag pan
  container.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    if (zoomState.scale > 1.0) {
      zoomState.isDragging = true;
      zoomState.startX = e.clientX - zoomState.x;
      zoomState.startY = e.clientY - zoomState.y;
      applyZoom(true);
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!zoomState.isDragging) return;
    zoomState.x = e.clientX - zoomState.startX;
    zoomState.y = e.clientY - zoomState.startY;
    applyZoom(true);
  });

  window.addEventListener('mouseup', () => {
    if (zoomState.isDragging) {
      zoomState.isDragging = false;
      applyZoom(false);
    }
  });

  // Touch drag & pinch
  let initialDist = 0;
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1 && zoomState.scale > 1.0) {
      zoomState.isDragging = true;
      zoomState.startX = e.touches[0].clientX - zoomState.x;
      zoomState.startY = e.touches[0].clientY - zoomState.y;
    } else if (e.touches.length === 2) {
      initialDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && zoomState.isDragging) {
      zoomState.x = e.touches[0].clientX - zoomState.startX;
      zoomState.y = e.touches[0].clientY - zoomState.startY;
      applyZoom(true);
    } else if (e.touches.length === 2 && initialDist > 0) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (currentDist > initialDist + 25) {
        zoomIn();
        initialDist = currentDist;
      } else if (currentDist < initialDist - 25) {
        zoomOut();
        initialDist = currentDist;
      }
    }
  }, { passive: true });

  container.addEventListener('touchend', () => {
    zoomState.isDragging = false;
    applyZoom(false);
  }, { passive: true });
}


// ============================================
// INIT
// ============================================
function init() {
  loadProgress();
  renderSidebar();
  showWelcome();
  setupZoomControls();
  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.addEventListener('click', () => { if (state.currentMap) setMode(tab.dataset.mode); });
  });
  const pb = document.getElementById('btn-print');
  if (pb) pb.addEventListener('click', openWorksheetModal);
  const rb = document.getElementById('btn-reset');
  if (rb) rb.addEventListener('click', () => {
    if (state.currentMap) { state.score = { correct: 0, incorrect: 0, total: 0 }; setMode('learn'); }
  });
}

document.addEventListener('DOMContentLoaded', init);
'''

lines.append(app_logic)

# Write the final app.js
with open(output_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f"Written to {output_path}")
print(f"File size: {len(chr(10).join(lines))} chars")
