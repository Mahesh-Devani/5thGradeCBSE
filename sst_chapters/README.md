# 🌍 SST Chapters Practice — Class 5 CBSE

An interactive, pedagogy-first Social Studies (SST) learning and revision platform for CBSE Class 5 students (Ages 9–11), specifically tailored around school revision worksheets and the official NCERT / CBSE curriculum.

---

## 🎯 Pedagogical Philosophy

Rather than passive memorization or tedious copy-writing, this app empowers students through:
1. **Unforgettable Mental Metaphors**: Anchoring complex concepts to vivid models (e.g., *The 3-Storey Rainforest Apartment*, *The 4 O'Clock Convectional Rain Engine*, *Liquid Gold Desert Transformation*, *The Three Pillars of Democracy*).
2. **Metacognitive Self-Talk (`💡 Think About It` Prompts)**: Guiding questions that prompt students on *how to reason through the problem* before answering.
3. **Diagnostic "Spot the Exam Trap"**: Exposing classic 5th-grade misconceptions (e.g., assuming evergreen trees never drop leaves, confusing the Head of State with the Head of Government).
4. **Long Answer "Chunk & Conquer" Studio**: Breaking overwhelming 5-mark subjective questions into 3–4 logical memory pillars, interactive keyword indicators, and an active writing scratchpad with real-time feedback.

---

## 📚 Curriculum Coverage (Term 1)

The platform launches with full coverage of the 4 Term 1 chapters from the school revision worksheet (`REV_WS_T1_G5__1788952775.pdf`):

| Chapter | Topic Title | Focus Areas |
|---|---|---|
| **L-5** | **The DRC — The Land of Dense Forest** | Equatorial climate, 4 o'clock rain, 3 rainforest layers (Emergent, Canopy, Understory), shifting cultivation (slash & burn), mineral wealth (cobalt, diamonds), Bambuti pygmies. |
| **L-7** | **Saudi Arabia — The Land of Hot Sands** | Desert landforms, sand dunes, oasis lifelines, petroleum discovery ("Liquid Gold"), water solutions (desalination & drip irrigation), Bedouin nomadic herders, traditional dress (Thobe, Ghutrah, Egal). |
| **L-17** | **The British Raj & The First War of Independence** | European traders (Vasco da Gama 1498), East India Company (1600), Battle of Plassey (1757), economic exploitation (farmers, weavers, traders, rulers & Doctrine of Lapse), greased cartridges, Mangal Pandey, 1857 Revolt & leaders, transfer to British Crown rule (1858). |
| **L-20** | **Our Government** | Three Organs (Legislature, Executive, Judiciary), Three Levels (Central, State, Local), Lok Sabha (House of the People) vs Rajya Sabha (Council of States), Head of State (President) vs Head of Government (Prime Minister), Governor vs Chief Minister, Union Territories, Supreme Court in New Delhi. |

---

## 🛠️ Modes & Features

1. **📖 Learn & Explore**:
   - Visual concept cards with bite-sized highlights.
   - Interactive diagrams (e.g. Rainforest 3-Storey architecture, Government 3-tier matrix).
   - "🚨 Spot the Exam Trap" diagnostic callouts.
2. **🧩 Practice & Solve**:
   - Filterable drills: **Fill in the Blanks**, **True / False with Corrections**, **Match the Following**, **Short Answers (2 Marks)**, and **Long Answer Scaffolder (5 Marks)**.
   - In-progress session persistence across browser reloads.
   - Prominent `🔄 Restart Drill` button.
3. **⚡ 60-Second Challenge**:
   - Gamified rapid-fire recall sprint testing retention under gentle time pressure.
   - Earn up to 3 stars per chapter based on performance.
4. **📄 Printable Worksheet Mode**:
   - Formatted for crisp A4 black-and-white printing matching school exam papers.
   - Student lines and teacher/parent review layout.

---

## 🏗️ Adding New Chapters (Extensibility)

To add a new chapter (e.g., L-1 The Globe, L-2 Maps, or Term 2 chapters):
1. Open `sst_chapters/app.js`.
2. Add a new object to the `CHAPTERS_DATA` array following this schema:

```javascript
{
  id: 'ch1_globe',
  number: 'L-1',
  title: 'The Globe — A Model of the Earth',
  themeColor: '#38bdf8',
  icon: '🌐',
  tag: 'Geography',
  summary: 'Latitudes, longitudes, hemispheres, poles, and grid systems.',
  learnCards: [ ... ],
  examTraps: [ ... ],
  practiceQuestions: [
    // Type: 'blank' | 'tf' | 'match' | 'short' | 'long'
  ]
}
```

The app will automatically render the new chapter in the sidebar, update star calculations, and include it in print and practice modes!

---

## 📱 Technical Standards

- **Zero External Dependencies**: Pure vanilla HTML5, CSS3, and ES6+ JavaScript.
- **Mobile First**: Sliding drawer on screens `≤ 860px`, `touch-action: manipulation;`, 44px+ touch targets.
- **Audio Feedback**: Native Web Audio API (`AudioContext`) oscillator synthesizer.
- **State Persistence**: `localStorage` key `cbse5_sst_active_state` and `cbse5_sst_stars_*`.
