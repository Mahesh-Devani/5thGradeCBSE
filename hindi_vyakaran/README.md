# 🖼️ हिंदी व्याकरण व रचनात्मक लेखन: चित्र वर्णन (Class 5 CBSE)

An interactive, concept-first Hindi learning module designed for **Class 5 CBSE students (Ages 9–11)** to master **रचनात्मक लेखन: चित्र वर्णन (Picture Description)**.

In standard CBSE examinations, students are presented with a picture and required to write **5–7 grammatically correct sentences** describing what they observe. This module builds deductive thinking, vocabulary mastery, and structured writing skills, moving far away from rote memorization.

---

## 🎯 5-Step Formula for CBSE Picture Description

Rather than asking children to memorize sample essays, this app teaches the **5-Step Golden Formula**:

| चरण (Step) | उद्देश्य (Objective) | उदाहरण (Example - बगीचा) | Clue / Mental Model |
|---|---|---|---|
| **1. स्थान परिचय** | चित्र किस स्थान का है? | *यह चित्र एक सुंदर और हरे-भरे बगीचे का है।* | **The Location Tag**: Always begin by naming the place. |
| **2. वातावरण / मौसम** | मौसम और परिवेश कैसा है? | *बगीचे में चारों ओर हरी घास और छायादार पेड़ हैं।* | **The Background Canvas**: Look at the sky, greenery, weather. |
| **3. मुख्य गतिविधि** | कौन क्या कर रहा है? | *यहाँ कई बच्चे झूलों और फिसलपट्टी पर खेल रहे हैं।* | **The Action Spotlight**: Identify the central subjects and verbs. |
| **4. बारीक विवरण** | अन्य वस्तुएँ या सूक्ष्म दृश्य क्या हैं? | *मैदान में एक लड़का फुटबॉल से खेल रहा है तथा फूल खिले हैं।* | **The Detective Eye**: Notice small props, balls, animals, benches. |
| **5. निष्कर्ष / भाव** | समग्र माहौल और संदेश क्या है? | *सभी बच्चे बहुत खुश हैं और वातावरण अत्यंत आनंददायक है।* | **The Big Smile**: Conclude with the mood, emotion, or takeaway. |

---

## 🎮 4 Interactive Learning Modes

1. **🔍 चित्र अवलोकन (Observe & Hotspots)**:
   - High-contrast, clean vector SVG illustrations with numbered interactive hotspots (1 to 6).
   - Tapping any hotspot reveals the Hindi word, Hinglish transliteration, English translation, Part of Speech (संज्ञा / क्रिया / विशेषण), and a contextual model sentence.

2. **🔤 शब्द भंडार (Vocabulary Bank)**:
   - Curated vocabulary categorized into:
     - **संज्ञा (Nouns)**: बगीचा, झूला, फिसलपट्टी, बादल, नाव, तिरंगा, केक, किसान, आदि।
     - **क्रियाएँ (Verbs)**: झूलना, फिसलना, दौड़ना, तैरना, सजाना, जोतना, आदि।
     - **विशेषण (Adjectives)**: हरा-भरा, सुहावना, रंग-बिरंगा, मूसलाधार, भव्य, आदि।
     - **दिशा / स्थिति (Positions)**: के ऊपर, के सामने, के पीछे, चारों ओर।
     - **योजक (Connectors)**: और, तथा, क्योंकि, जबकि, जिससे कि।
   - Instant filter buttons to isolate grammatical categories.

3. **🧩 वाक्य खेल (Jumbled Sentence Puzzle)**:
   - Interactive, step-by-step puzzle engine for all 5 steps of the formula.
   - Tap-to-slot mechanics with instantaneous Web Audio feedback and congratulatory confetti.
   - Teaches correct Hindi Subject-Object-Verb (SOV) grammatical sequence.

4. **✍️ 5-वाक्य रचना (Guided Writing & Model Answer)**:
   - Complete CBSE standard 5–7 sentence continuous model answer.
   - Step-by-step grammatical breakdown table.
   - Bilingual English translation toggle for all explanations.
   - Live interactive student writing notepad with word and sentence counter.

---

## 🌐 Bilingual Support (English Translation Toggle)

For students who learn Hindi as a second language, the app features an instantaneous **`[🌐 English: ON/OFF]`** switch in the sticky top bar:
- When **ON**: Roman phonetic transliteration (e.g. *Jhoola*, *Baarish*) and complete English sentence translations appear alongside Devanagari text.
- When **OFF**: Immerses native/fluent students directly in pure Hindi text.

---

## 📱 Mobile-First Architecture & Design Standards

- **Collapsible Off-Canvas Drawer**:
  - Pinned sidebar collapses cleanly on screens `≤ 860px` with an accessible `☰ चित्र` toggle and `🏠` Home button.
  - Backdrop and drawer use separate sibling stacking contexts (`z-index: 95` for backdrop, `z-index: 100` for drawer) to prevent touch traps.
- **Touch Ergonomics**:
  - All clickable touch targets have a minimum height of **42px to 50px**.
  - Enabled `touch-action: manipulation;` to eliminate 300ms mobile tap delays.
- **Zero External Dependencies**:
  - Pure vanilla HTML5, CSS3, and ES6+ JavaScript.
  - Synthesized Web Audio API sound effects (`AudioContext`) — no external audio CDN dependencies.
  - Devanagari matra clipping prevented with `line-height: 1.7+`.

---

## 🗂️ File Layout

```
hindi_vyakaran/
├── index.html        # Semantic markup, drawer shell, top bar, canvas & modal
├── styles.css        # Saffron/amber glassmorphic design system & drawer CSS
├── app.js            # 6 rich CBSE scenes, SVG vectors, puzzles, vocabulary & game engine
└── README.md         # Documentation & pedagogical reference
```

---

## 🏆 Current 6 CBSE Scenes Included

1. **बगीचा / बाल उद्यान (Children Park & Playground)** — Swings, slides, football, lush trees.
2. **वर्षा ऋतु / बारिश का दिन (A Rainy Day Scene)** — Dark clouds, umbrellas, paper boats, puddles.
3. **विद्यालय का खेल मैदान (School Playground / Sports Day)** — Track, running race, coach whistle, banner.
4. **जन्मदिन की पार्टी (Birthday Party Celebration)** — Cake, candles, balloons, party hats, gifts.
5. **गाँव का प्रातःकाल (A Village Morning Scene)** — Rising sun, mud huts, water well, farmer with plough.
6. **चिड़ियाघर की सैर (A Visit to the Zoo)** — Lion on rock, tall giraffe, monkey, safety fence, visitors.
