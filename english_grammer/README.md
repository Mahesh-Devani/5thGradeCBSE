# 📝 English Grammar Master — Class 5 CBSE

An interactive, concept-first web application designed for **Class 5 CBSE students** to build genuine understanding of English grammar rules through detective work, storytelling, and analytical thinking — moving away from rote memorization.

---

## 🎯 Pedagogical Concept: Thinking Over Memorizing

Traditional grammar worksheets ask children to memorize rules like formulas. **Grammar Master** turns every rule into an intuitive mental model:

| Topic | Intuitive Mental Model | Detective Clue |
|---|---|---|
| **Articles** | *The Finger Pointer* | "The" is like pointing your finger at an exact item. "A/An" is for any one item. It's about the **sound**, not the spelling (e.g. *an M.B.B.S. doctor*, *a university*). |
| **Simple Tenses** | *Habits, History & Promises* | Simple Present = Daily habits & eternal facts. Simple Past = Finished timeline. Simple Future = Tomorrow's promise. |
| **Continuous Tenses** | *The Snapshot Camera* | A camera that freezes a moment in action right then (*is eating*, *was playing*, *will be sleeping*). |
| **Personification** | *The Magic Wand* | Lending human feelings, thoughts, and actions to trees, clouds, or clocks (*The wind howled*, *Opportunity knocked*). |
| **Present Perfect** | *The Invisible Thread* | Action happened in the past, but the rope still connects to right now (*I have lost my key — so I can't open the door now*). |
| **Past Perfect** | *The Time Traveler* | Two past events happened. Past Perfect (**had + V3**) flags the one that happened *first* (*When we reached, the train had already left*). |
| **Hyperbole** | *The Mega Magnifier* | Playful, dramatic exaggeration meant to emphasize a feeling, not to be taken literally (*I'm so hungry I could eat a horse*). |

---

## 🎮 Learning Modes

1. **📖 Learn Mode**:
   - Structured visual lessons with real-world examples.
   - Distinct green highlights for correct usage and red strikethroughs for common pitfalls.
   - **🧠 Think About It** callouts providing memory tricks and logic rules.

2. **🧩 Practice Mode**:
   - Untimed, stress-free practice questions.
   - Live score tracker: **Correct**, **Wrong**, and **Left**.
   - Immediate explanatory feedback on every question breaking down *why* an answer is correct and why other choices fail.

3. **🎯 Challenge Mode**:
   - Timed speed quiz (15 seconds per question).
   - Dynamic countdown timer with warning colors.
   - Performance scoring with up to 3 stars ⭐⭐⭐ and celebratory confetti! 🎉
   - Progress saved automatically in the browser's `localStorage`.

---

## 📱 Mobile-First Architecture

The application is engineered with an **off-canvas responsive drawer** pattern:
- **Small Screens (`≤ 860px`)**:
  - Pinned sidebar collapses into an off-canvas drawer accessed via the **`☰ Topics`** button.
  - Selecting any topic card smoothly scrolls to the top of the lesson and closes the drawer automatically.
  - Mode switcher operates as a 3-way segmented control with minimum **42px** finger tap targets.
  - All quiz options provide minimum **50px** touch height and active state feedback.
- **Desktop Screens (`> 860px`)**:
  - Sticky sidebar with persistent progress indicator and topic list.
- **💾 Session & State Persistence**:
  - Active grammar topic and mode (`learn`, `practice`, `challenge`) are automatically stored in `localStorage` (`grammar-master-active-state`).
  - Refreshing the browser preserves the student's exact topic and exercise mode without kicking back to the landing screen.
- **🔐 Future Scope (User Accounts & Cloud Sync)**:
  - Ready for future integration with Google Sign-In and student account authentication to synchronize stars, badges, and learning progress across devices.

---

## 🗂️ File Structure

```
english_grammer/
├── index.html        # Shell markup, mobile top bar, modals & backdrop
├── styles.css        # Glassmorphic dark design system & responsive drawer
├── app.js            # Topic lessons, 70+ exercises, audio synthesizer, game state
└── README.md         # This documentation file
```

---

## 🛠️ Adding New Exercises

To add new exercises, open `app.js` and locate `TOPIC_DATA['topic_id'].exercises`. Append question objects following this schema:

```javascript
{
  type: 'mcq', // 'mcq' | 'fill' | 'spot'
  question: 'Choose the sentence that uses HYPERBOLE:',
  options: [
    'The building is twenty stories tall.',
    'I have told you a million times!',
    'He runs faster than his brother.',
    'The water was cold.'
  ],
  correct: 1, // Index of the correct option (0-based)
  explanation: 'Telling someone "a million times" is an intentional exaggeration for dramatic effect.'
}
```
