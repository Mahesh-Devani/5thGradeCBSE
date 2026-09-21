# 🤖 Agent Guidelines — Science Master (Class 5 CBSE)

Welcome, AI Agent! This guide specifies the rules, technical constraints, data schemas, and gotchas you must follow when modifying or extending the **Science Master** mini-app.

---

## 1. Core Directives

1. **Zero External Runtime Dependencies**:
   - Do NOT install npm dependencies or build tools.
   - All interactive simulations, sound synthesis, and particle effects MUST remain in vanilla HTML5, CSS3, and ES6+ JavaScript.
2. **School Worksheets Heavy Weightage**:
   - All worksheet questions, tests, answer keys, diagrams, and case studies must be transcribed directly into clean, structured JavaScript/JSON objects inside `science/app.js`.
   - Never commit raw PDF worksheets or heavy camera images to git. `science/chapters/` and `science/WS/` are ignored in `.gitignore`.
3. **The 4 Thinking Pillars**:
   - Every chapter MUST feature:
     1. *Unforgettable Mental Metaphors* (Visual models).
     2. *Metacognitive Self-Talk (`💡 Think About It` Prompts)*.
     3. *Diagnostic "Spot the Exam Trap / Be the Teacher"*.
     4. *Common-Sense Reasoning & Deductive Questions* (e.g. food chains, balloon balance, diffusion speeds).

---

## 2. Architecture & Data Schema

### Adding a New Chapter
To add a new chapter (e.g., L-1 Plants, L-6 Simple Machines):
1. Open `science/app.js`.
2. Add a new chapter object to `CHAPTERS_DATA` conforming to this schema:
```javascript
{
  id: 'ch1_plants',
  number: 'L-1',
  title: 'Reproduction in Plants',
  sub: 'Seeds, Germination, Dispersal & Vegetative Propagation',
  themeColor: '#10b981',
  icon: '🌱',
  summary: 'Explore seed anatomy, conditions for germination, dispersal agents, and crops.',
  learnCards: [
    {
      badge: 'Seed Blueprint',
      title: '🌱 Seed Anatomy',
      metaphor: 'A seed is a baby plant packed with a packed lunch!',
      points: [ ... ],
      thinkPrompt: 'Why do seeds need water, air, and warmth to sprout?'
    }
  ],
  examTraps: [
    {
      id: 'trap_l1_cotyledon',
      student: 'Aditya',
      question: 'Where does a baby plant get food before leaves grow?',
      studentAnswer: 'From soil minerals.',
      prompt: 'Diagnose Aditya’s error:',
      options: [ ... ],
      correctIndex: 0,
      teacherFeedback: '...'
    }
  ],
  questions: [
    {
      id: 'l1_q1',
      category: 'mcq', // 'mcq' | 'whoami' | 'compare' | 'oddone' | 'scenario'
      source: 'Worksheet I • Q1',
      marks: '1 Mark',
      body: '...',
      options: [ ... ],
      correct: 0,
      explanation: '...',
      takeaway: '...'
    }
  ]
}
```

---

## 3. State Persistence Pattern

The app persists state in `localStorage`:
- Active state key: `cbse5_science_active_state` (JSON string containing `activeChapterId`, `activeMode`, `activePracticeFilter`, `currentQuestionIndex`, `scoreCorrect`, `scoreWrong`, `answeredMap`, `trapAnswers`, `worksheetSettings`).
- Star ratings: `cbse5_science_stars_<chapterId>` (integer 0 to 3).
- Always restore state on `DOMContentLoaded` and save state on state modifications.
- Ensure the `🔄 Restart Drill` button resets `scoreCorrect`, `scoreWrong`, `currentQuestionIndex`, and `answeredMap`.

---

## 4. Front-End Gotchas & Verification

1. **CSS Brace Balance**:
   Run this command after any edit to `science/styles.css`:
   ```bash
   python -c "css=open('science/styles.css', encoding='utf-8').read(); o=0; [o := o + (1 if c=='{' else -1 if c=='}' else 0) for c in css]; print('Open braces:', o)"
   ```
   Must output `Open braces: 0`.
2. **Mobile Drawer Stacking Context**:
   `.sidebar-backdrop` and `.sidebar` are sibling elements inside `.app-container`.
3. **No Horizontal Scrolling**:
   `html, body { overflow-x: hidden; width: 100%; }` and `.app-container { flex-direction: column; overflow-x: hidden; }` on `max-width: 860px`.
