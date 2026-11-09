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

## 🎮 Learning Modes & 10-Star Mastery Architecture

Unlike superficial quizzes where children get 3 stars for clicking through questions once, **English Grammar Master** features a deep, rigorous **10-Star Mastery Architecture** with 70 stars total across all 7 topics.

### 🌟 10 Pedagogical Stars Per Topic
1. **Star 1 (Foundations I)**: Read and mark Lesson Cards 1 & 2 as understood.
2. **Star 2 (Advanced Rules II)**: Read and mark Lesson Cards 3 & 4 as understood.
3. **Star 3 (CBSE Exam Trap Detective)**: Diagnose subtle exam pitfalls (silent letters, stative verbs, specific past timestamps, double-past auxiliary errors).
4. **Star 4 (Fill-in / Identification Precision)**: Complete at least 3 fill-in-the-gap or identification exercises with correct conjugation.
5. **Star 5 (Multiple-Choice Deduction)**: Successfully solve at least 3 multiple-choice conceptual questions.
6. **Star 6 (Rule Detective Mastery)**: Correctly answer the topic's hallmark rule deduction question (e.g., silent 'h' sound rule, stative verb rule, past timeline restriction).
7. **Star 7 (Contrast & Application Mastery)**: Correctly answer the topic's comparative contrast question (e.g., Simple vs Continuous, Present Perfect vs Simple Past).
8. **Star 8 (High Practice Accuracy)**: Achieve high precision with at least 5 correctly solved practice questions.
9. **Star 9 (Full Curriculum Breadth)**: Solve at least 8 questions across the entire question bank.
10. **Star 10 (15s Rapid Recall Sprint)**: Score at least 7 in the high-pressure 15-second timed Challenge mode.

---

## 📋 Learning Passport & Parent Audit Report

- Accessible anytime via the **`📋 ⭐ X/10 Passport`** top bar button or topic mastery banner.
- Displays an itemized checklist of all 10 pedagogical milestones with real-time status (`✓ Verified ⭐` or `In Progress`).
- Provides explicit **"How to unlock"** guidance for pending milestones.
- Unlocks the **Official Parent & Teacher Mastery Certificate** upon reaching 10/10 stars.

---

## 🎮 Learning Modes

1. **📖 Learn Mode**:
   - Structured visual lessons with real-world examples.
   - Distinct green highlights for correct usage and red strikethroughs for common pitfalls.
   - **🧠 Think About It** callouts providing memory tricks and logic rules.
   - Interactive **📖 Mark Section Understood (+1 ⭐)** verification buttons on every card.
   - **🚨 Spot the CBSE Exam Traps** diagnostic section with reveal-and-learn remedies.

2. **🧩 Practice Mode**:
   - Untimed, stress-free practice questions.
   - Live score tracker: **Correct**, **Wrong**, **Left**, and clickable **Mastery ⭐ X/10** pill.
   - Immediate explanatory feedback on every question breaking down *why* an answer is correct and why other choices fail.
   - Question-by-question progress autosaved to `localStorage` so in-progress drills resume automatically on refresh.

3. **🎯 Challenge Mode**:
   - Timed speed quiz (15 seconds per question).
   - Dynamic countdown timer with warning colors.
   - High score tracking toward Star 10 certification and celebratory confetti! 🎉
   - Comprehensive performance feedback and direct button to inspect the Learning Passport.

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
