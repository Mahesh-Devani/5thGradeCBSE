# 🗺️ SST Map Master — Class 5 CBSE Practice

A rich, interactive, gamified web application designed specifically for Class 5 CBSE students to practice Social Science (SST) maps and generate printable worksheets for pen-and-paper homework and exams.

---

## 📚 Curriculum Source & Syllabus Maps

All content is directly based on the Class 5 CBSE Social Studies Term 1 map curriculum:

| Map Topic | Type | Key Syllabus Elements |
|---|---|---|
| **🕌 Saudi Arabia & Neighbours** | Regional Outline Map | • **Saudi Arabia** (Center)<br>• **North**: Jordan, Iraq<br>• **East**: Kuwait, Qatar, Bahrain, UAE<br>• **South**: Yemen, Oman<br>• Bodies of water: Red Sea, Persian Gulf |
| **🌍 Equatorial Regions of the World** | World Physical Map | • **Equator Line ($0^\circ$)**<br>• **South America**: Amazon Basin Rainforest<br>• **Africa**: Congo Basin Rainforest<br>• **Asia**: Southeast Asia & Indonesia Rainforest |
| **🏜️ Major Deserts of the World** | World Physical Map | **11 CBSE Deserts**:<br>1. Great Basin Desert (North America)<br>2. Peruvian Desert (South America)<br>3. Atacama Desert (South America)<br>4. Patagonian Desert (South America)<br>5. Sahara Desert (Africa)<br>6. Arabian Desert (Asia)<br>7. Turkestan Desert (Asia)<br>8. Thar Desert (Asia — India/Pakistan)<br>9. Gobi Desert (Asia)<br>10. Kalahari & Namib Desert (Africa)<br>11. Great Australian Desert (Australia) |
| **🌿 Democratic Republic of Congo (DRC) & Neighbours** | Africa Political Map | • **DRC** (Center)<br>• **North**: Central African Republic, South Sudan<br>• **East**: Uganda, Rwanda, Burundi, Tanzania<br>• **West**: Republic of the Congo<br>• **South**: Zambia, Angola |

---

## 🇮🇳 Official Survey of India Compliance

Under Indian curriculum guidelines (CBSE / NCERT) and Survey of India standards:
- The base physical map cleanly renders the **official sovereign boundary of India**.
- **Jammu & Kashmir and Ladakh** (including the northern crown, Gilgit-Baltistan, and Aksai Chin) and **Arunachal Pradesh** are depicted accurately.
- Continental outlines avoid confusing political partitioning, matching the exact worksheets used in CBSE schools.

---

## 🎮 Features & Modes

### 1. 📖 Learn Mode
- **Interactive Exploration**: Hover or click on any country or region to highlight it.
- **CBSE Notes Panel**: Shows capital cities, cardinal directions (North, East, South, West), and key textbook notes (e.g. *"World's driest desert: Atacama"*, *"Pearl of Africa: Uganda"*).

### 2. ❓ Quiz Mode
- Labels are hidden on the map.
- The student is prompted to find and click regions (e.g., *"Find on the map: Jordan [Located to the North]"*).
- **Audio Feedback**: Pleasant synth chime for correct answers, gentle reminder tone for mistakes.
- **Visual Feedback**: Green pulse for correct picks, red reminder + highlight for misses.
- **Scoreboard**: Tracks correct answers, mistakes, and remaining items.

### 3. ⏱️ Timed Challenge Mode
- An adrenaline-packed speed drill with a ticking countdown timer (~8 seconds per item).
- Perfect for building rapid exam recall.
- Timer turns amber and red in the final 10 seconds.

### 4. 🏆 Progress Tracking, Persistence & Star Badges
- Performance is saved automatically in the browser (`localStorage`).
- **💾 Session & State Persistence**: The active map selection and mode (`learn`, `quiz`, `timed`, `worksheet`) are preserved in `localStorage` (`sst-map-active-state`). If a student refreshes or reopens the page, their selected map and current mode resume seamlessly.
- **🔐 Future Scope (User Accounts & Cloud Sync)**: Designed with modular, JSON-serializable state payloads to support future Google Sign-In and student profile sync across multiple devices.
- Star ratings earned per map:
  - ⭐ **1 Star**: $\ge 40\%$
  - ⭐⭐ **2 Stars**: $\ge 70\%$
  - ⭐⭐⭐ **3 Stars**: $100\%$ (Perfection! Includes confetti celebration 🎉)
- Overall progress bar in the sidebar tracking total stars out of 12.

### 5. 🖨️ Printable Worksheets Generator
Click the **"Print Worksheet"** button anytime to generate exam-standard worksheets:
- **📝 Blank Outline Worksheet**: Clean, high-contrast outline map with numbered regions and fill-in-the-blank answer lines for pencil practice.
- **🏷️ Labeled Reference Key**: Complete labeled map with answers and direction tables for self-study and revision.
- Print CSS formats the page cleanly for A4 paper and hides sidebars and navigation controls.

---

## 🚀 How to Run Locally

1. **No Installation Required**:
   Simply open `index.html` in any web browser:
   ```text
   file:///c:/Users/mdevani/images_pdf/tools/social_sicence_maps/index.html
   ```
2. **100% Offline**:
   - Zero external dependencies or npm packages required.
   - All SVG map coordinates, audio synthesizers (Web Audio API), styles, and interactive scripts run completely offline.

---

## 📁 File Structure

```text
social_sicence_maps/
├── index.html                 # Main web application entry point
├── styles.css                 # CSS styles & responsive theme
├── app.js                     # Main JavaScript logic & vector SVG map data
├── AGENTS.md                  # AI Agent memory & developer contract guidelines
├── README.md                  # Human-friendly documentation & usage guide
├── extracted_pages/           # Extracted page PNG images from syllabus reference sheets
└── scripts/                   # Rebuild & data bundling pipeline
    ├── build_app.py           # Regenerates app.js from source paths
    ├── world_land_path.txt    # Clean world continental outline SVG path
    ├── india_world_svg.txt    # Official Survey of India SVG path
    └── map_data_final.json    # Regional path data for Saudi Arabia & DRC
```

---

## 🛠️ Rebuilding `app.js`

If you modify map data or add new maps:
```bash
python scripts/build_app.py
```
This re-bundles `scripts/world_land_path.txt`, `scripts/india_world_svg.txt`, and `scripts/map_data_final.json` into `app.js`.
