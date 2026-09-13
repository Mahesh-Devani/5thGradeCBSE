# 📚 5th Grade CBSE — Interactive Learning Hub

A modern, responsive, zero-dependency web application designed for **Class 5 CBSE students** to master school subjects through discovery-based learning, interactive drills, visual exploration, and printable worksheets.

> **🌐 Live Deployment:** [https://mahesh-devani.github.io/5thGradeCBSE/](https://mahesh-devani.github.io/5thGradeCBSE/)  
> **🎯 Target Audience:** Class 5 CBSE / NCERT Curriculum (Ages 9–11)  
> **💡 Learning Philosophy:** Thinking & logic-first mastery — *no rote memorization*.

---

## 📋 Available Subjects & Roadmap

| Subject | Status | Modules / Features | Link |
|---|---|---|---|
| 🗺️ **Social Science Maps** | ✅ **Live & Ready** | • Saudi Arabia (Deserts, Gulfs, Cities)<br>• World Hot Deserts (Sahara, Kalahari, Gobi, etc.)<br>• Equatorial Regions (Amazon, Congo, SE Asia)<br>• DRC & Neighbours (Central Africa)<br>• Learn Mode, Interactive Map Quiz, Timed Speed Drills, Printable Homework Worksheets | [`/social_sicence_maps/`](social_sicence_maps/) |
| 📝 **English Grammar Master** | ✅ **Live & Ready** | • **Articles** (A, An, The & sound rules)<br>• **Simple Tenses** (Past, Present, Future habits & facts)<br>• **Continuous Tenses** (Present, Past, Future ongoing actions)<br>• **Personification** (Poetic human qualities for objects)<br>• **Present Perfect Tense** (Past actions connected to now)<br>• **Past Perfect Tense** (The "earlier past" time-traveler)<br>• **Hyperbole** (Playful exaggeration for emphasis)<br>• Learn Mode with Detective Clues, Practice Mode with Instant Explanations, Timed Star Challenges, Mobile Off-Canvas Drawer | [`/english_grammer/`](english_grammer/) |
| 🔢 **Mathematics** | 🟡 *In Planning* | Fractions, Decimals, Visual Geometry, Factors & Multiples, Word Problem Solvers | *Upcoming* |
| 🔬 **Science (EVS)** | 🟡 *In Planning* | Skeletal & Nervous Systems, Seeds & Germination, Simple Machines, Aquatic Life, Ecosystems | *Upcoming* |
| 🇮🇳 **Hindi Vyakaran** | 🟡 *In Planning* | संज्ञा, सर्वनाम, विशेषण, क्रिया, काल, मुहावरे, अपठित गद्यांश | *Upcoming* |

---

## 🌟 Key Highlights

- **🧠 Concept-First Pedagogy**:
  - Lessons use analogies (e.g., *"The" is like pointing your finger*, *Continuous tense is like a snapshot camera*, *Past Perfect is a time traveler*).
  - Explanations break down *why* an option is right or wrong, building deep analytical comprehension.
- **📱 Mobile-Optimized & Touch-First**:
  - Full mobile responsiveness across viewports (360px smartphones, 390px iPhones, 768px tablets, and desktop displays).
  - Off-canvas slide-out topic drawer (`☰ Topics`) with dark blurred backdrop.
  - Finger-friendly 44px+ touch targets and active tap feedback.
- **⚡ 100% Zero Dependencies**:
  - Pure HTML5, CSS3, and ES6+ JavaScript.
  - Zero build step, zero package managers, runs completely offline from a local browser.
- **🎨 Modern Aesthetic**:
  - Dark glassmorphic design system, smooth ambient background blobs, Google Font Outfit, glowing neon accents, and celebratory confetti animations.
- **🖨️ Classroom & Homework Ready**:
  - Dedicated print stylesheets in Social Science Maps to generate clean, ink-friendly blank and labeled outline worksheets.
- **🇮🇳 Cartographic Compliance**:
  - All Indian maps strictly follow **Survey of India** official standards, accurately depicting Jammu & Kashmir, Ladakh, and Arunachal Pradesh.

---

## 🚀 Quick Start

### 1. View Locally
Clone the repository and open `index.html` in any browser:
```bash
git clone https://github.com/Mahesh-Devani/5thGradeCBSE.git
cd 5thGradeCBSE
# Open in browser:
# Windows
start index.html
# macOS
open index.html
# Linux
xdg-open index.html
```

### 2. Host on GitHub Pages
1. Push this repository to your GitHub account.
2. Navigate to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose branch `main` and folder `/ (root)`.
5. GitHub will build and host your site automatically at:
   ```
   https://<your-username>.github.io/5thGradeCBSE/
   ```

---

## 📁 Repository Architecture

```
5thGradeCBSE/
├── index.html                      # Central Hub — Subject navigation dashboard
├── styles.css                      # Central Hub design system & theme tokens
├── README.md                       # Main repository overview (this file)
├── ARCHITECTURE.md                 # Technical architecture & developer guidelines
├── AGENTS.md                       # Instructions and rules for AI coding agents
│
├── social_sicence_maps/            # Mini-App 1: Social Science Map Master
│   ├── index.html                  # Map app shell (Learn, Quiz, Timed, Print)
│   ├── styles.css                  # Map styling, responsive layout & print sheet
│   ├── app.js                      # SVG coordinate engine, quiz logic & timer
│   ├── scripts/                    # Map data builders & GeoJSON processors
│   └── extracted_pages/            # CBSE reference worksheets & syllabus scans
│
└── english_grammer/                # Mini-App 2: English Grammar Master
    ├── index.html                  # App shell, mobile header & results modal
    ├── styles.css                  # Glassmorphic styles, mobile off-canvas drawer
    ├── app.js                      # Grammar lesson data, exercise engine & timer
    └── README.md                   # Dedicated English Grammar module guide
```

---

## 🛠️ Architecture & Development Standards

For in-depth technical details on state management, data schemas, cartography compliance, responsive design rules, and step-by-step guides for adding new subjects or exercises, please read:

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — Architectural design, schemas, and extension guides.
- **[AGENTS.md](AGENTS.md)** — Operational guidelines, gotchas, and patterns for AI pair programmers.
- **[english_grammer/README.md](english_grammer/README.md)** — Topic catalog and question authoring guide.

---

## 🤝 Contributing

Contributions aligning with the **Class 5 CBSE / NCERT** curriculum are welcome!
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/maths-fractions`).
3. Commit your changes (`git commit -m 'Add Fractions interactive model'`).
4. Push to the branch (`git push origin feature/maths-fractions`).
5. Open a Pull Request.

---

<p align="center">
  Built with ❤️ for Class 5 CBSE students<br>
  <sub>Aligned to CBSE / NCERT Curriculum 2025–2026</sub>
</p>
