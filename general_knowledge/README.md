# 🌍 General Knowledge Master — Class 5 CBSE (June, July, August 2026)

An interactive, discovery-based General Knowledge and Global Awareness platform engineered for **Class 5 CBSE students (Ages 9–11)**. Transforms current affairs, global geography, science discoveries, and cultural heritage into memorable detective stories, interactive decoders, and classroom-aligned school worksheets.

---

## 📚 Syllabus Scope & Edition Breakdown

All content is strictly sourced and verified from the official **Global Awareness Program (GAP Level 2 for Classes 5 & 6)** booklets for:
1. **June 2026**: World Oceans Day, Artemis II Moon Mission, Parbati Barua ("Hasti Kanya"), Baku City of Winds & Rainbow Mountain.
2. **July 2026**: Commonwealth Games Glasgow 2026, Swaraj Dweep Twin Guinness Records, Dr. Kadambini Ganguly, Darjeeling Toy Train & Vietnamese Water Puppetry.
3. **August 2026**: Donald Duck 90th Anniversary, Sagrada Família (World's Tallest Church), 5.3M-Yr Whale Necropolis, Lt. Bharati Asha (INA), Silk City Bhagalpur & Nehru Trophy Boat Race.

---

## 🎮 Interactive Modes & Pedagogical Pillars

### 1. 📖 Stories & Brain Sparks (Learn Mode)
- **Unforgettable Memory Tricks**: Every topic features a dedicated *Brain Spark* box teaching students how to remember key facts in 5 seconds (e.g., *"Pacific = Pacifier = Peaceful Sea"*, *"Parbati = Goddess of Elephants = Hasti Kanya caught her first tusker at 14!"*).
- **Text-to-Speech Audio Read-Aloud**: Uses Web Speech API (`speechSynthesis`) so students can listen to stories hands-free.
- **Did You Know? Eureka Boxes**: Surprising real-world trivia anchoring every concept.

### 2. 🕵️ Detective & Decoder Arcade
- **Donald Duck Global Cipher**: Decode Donald's undercover names around the world (Finland's *Aku Ankka*, Italy's *Paperino*, Sweden's *Kalle Anka*, Denmark's *Anders And*, Spain's *Pato Donald*) using an interactive A=1, B=2 keypad!
- **Indian City Laser-Strike**: Tap stray numbers with arcade laser effects to reveal famous city nicknames (Jaipur Pink City, Lucknow City of Nawabs, Hyderabad Pearl City, Jamshedpur Steel City, Nagpur Orange City).
- **Earth Days Matchmaker**: Interactive matching game connecting World Water Day (22 March), Earth Day (22 April), World Environment Day (5 June), and World Ozone Day (16 September).
- **Vietnamese Water Puppetry Word Hunt**: Discover the 5 vital theatrical elements (Vietnam, Water, Musicians, Puppets, Bamboo rods).

### 3. ❓ Monthly Quick Quiz
- 10 curriculum questions per month directly from booklet pull-outs.
- Instant diagnostic feedback explaining why the correct choice is right and what the trap was.
- Full session state persistence: student progress is saved on every answer and restored on refresh.

### 4. 🖼️ Visual Picture Identification Rounds
- 4 deduction rounds per month identifying landmarks, historical figures, artifacts, and natural phenomena.

### 5. ⚡ 60-Second Rapid Fire Sprint
- Fast-paced arcade mode with combo streak multipliers (🔥 Combo ×2, ×3), ticking sound effects, and high score tracking in `localStorage`.

### 6. 📄 Printable School Worksheets
- Monochrome A4-ready test sheets for June, July, August, or Combined Term 1 Assessment.
- Includes Name, Class, Section, Roll No., Teacher's Marks Box, and toggleable Answer Key.

---

## 🛠️ Technical Specifications

- **Runtime Dependencies**: Zero external dependencies. Pure vanilla HTML5, CSS3, ES6+ JavaScript.
- **Audio Feedback**: Native Web Audio API oscillator synthesizer (chimes, wrong thud, victory fanfare, laser zaps, clock ticks).
- **Celebration Effects**: Native Canvas-based confetti explosion system.
- **Mobile Drawer**: Responsive drawer on screens $\le 860$px with touch-action manipulation, 44px+ touch targets, and zero horizontal scroll.
- **State Persistence**: Serialized JSON state saved in `localStorage` under `cbse5_gk_active_state`, `cbse5_gk_stars_v1`, and `cbse5_gk_sprint_high_score`.
