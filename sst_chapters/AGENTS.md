# 🤖 SST Chapters Practice — Agent Guidelines

Welcome, AI Agent! This guide specifies the architectural standards, 10-Star Mastery progression system, state persistence contract, and extension patterns for the **SST Chapters Practice** application (`/sst_chapters/`).

---

## 1. Core Principles

1. **Zero External Runtime Dependencies**:
   - Plain HTML5, CSS3, and ES6+ JavaScript only.
   - Deployed directly to GitHub Pages.
   - Confetti and audio feedback are 100% native (HTML5 canvas & Web Audio API `AudioContext`).

2. **10-Star Mastery Architecture**:
   - Each chapter features exactly **10 distinct pedagogical milestones** (70 max stars across 7 chapters).
   - Milestones are verified across all app modes:
     - **Star 1**: Foundational concept cards 1 & 2 or diagram exploration.
     - **Star 2**: Core concept cards 3, 4, 5.
     - **Star 3**: CBSE Exam Trap diagnosis ("Be the Teacher").
     - **Star 4**: Fill in the Blanks precision.
     - **Star 5**: True/False deductions with required exam corrections.
     - **Star 6**: Match the Following pairing.
     - **Star 7**: Short conceptual answer reasoning (2 Marks).
     - **Star 8**: Long Answer Scaffold Studio ("Chunk & Conquer" 5 Marks).
     - **Star 9**: Practice question breadth (≥10 questions solved).
     - **Star 10**: Mental Speed Sprint (60-second challenge with score ≥7).
   - Students inspect their milestone audit cards via the **Learning Passport & Parent Audit Report** modal.

3. **Session & Practice Persistence**:
   - Save active state to `localStorage.setItem('cbse5_sst_active_state', ...)` on every tab change, chapter switch, question answer, text draft input, and sprint run.
   - Individual chapter stars are stored in `cbse5_sst_stars_<chapterId>`.
   - On page reload (`DOMContentLoaded`), `loadActiveState()` restores active chapter, mode, filter, in-progress practice index, drafts, and solved map without booting the student to the welcome screen.

4. **Cartographic Compliance**:
   - Any maps of India must strictly depict Jammu & Kashmir, Ladakh, and Arunachal Pradesh as integral parts of India, adhering to Survey of India official maps.

---

## 2. Data Schemas

### Chapter Schema (`CHAPTERS_DATA`)
```javascript
{
  id: 'ch5_drc',
  number: 'L-5',
  title: 'The DRC — The Land of Dense Forest',
  themeColor: '#10b981',
  icon: '🌳',
  tag: 'Geography',
  targetStars: 10,
  summary: 'Equatorial climate, 4 o\'clock rain, 3 rainforest layers...',
  learnCards: [
    {
      title: 'Location & Historical Journey',
      icon: '🌍',
      body: 'HTML formatted body content...'
    }
  ],
  examTraps: [
    {
      trap: 'Believing evergreen trees never shed their leaves.',
      truth: 'Trees shed leaves at different times of the year, so the forest is never completely bare.'
    }
  ],
  practiceQuestions: [
    // blank | tf | match | short | long
  ]
}
```

### Milestone Schema (`CHAPTER_MILESTONES`)
```javascript
CHAPTER_MILESTONES['ch5_drc'] = [
  {
    id: 'learn_part1',
    title: 'Equatorial Zone & 4 O\'Clock Rain',
    desc: 'Studied Torrid Zone location, independence, and the 4 o\'clock daily convectional rain cycle',
    hint: 'Read concept cards 1 & 2 in Learn mode',
    check: (d) => (d.learnCardsRead >= 2 || d.interactiveExplored)
  },
  // ... exactly 10 milestones per chapter
];
```

The milestone check function receives a progress snapshot `d` from `getChapterProgressData(chapterId)`:
- `d.learnCardsRead`: Number of cards explicitly marked read.
- `d.trapsDiagnosed`: Number of traps diagnosed.
- `d.interactiveExplored`: Boolean indicating diagram/matrix exploration.
- `d.categorySolved.blank`: Number of blanks solved.
- `d.categorySolved.tf`: Number of True/False questions solved.
- `d.categorySolved.match`: Number of Match questions solved.
- `d.categorySolved.short`: Number of Short Answer questions solved.
- `d.categorySolved.long`: Number of Long Answer questions solved.
- `d.totalSolved`: Total questions solved across all categories.
- `d.sprintHighScore`: Highest score achieved in 60s sprint.

---

## 3. CSS & Responsive Drawer Rules

- Before committing any edits to `styles.css`, ALWAYS run:
  ```bash
  python3 -c "
  with open('sst_chapters/styles.css', 'r') as f:
      css = f.read()
  o = 0
  for c in css:
      if c == '{': o += 1
      elif c == '}': o -= 1
  print('Open braces:', o)
  "
  ```
  The output MUST be `Open braces: 0`.
- Mobile screens (`max-width: 860px`): Collapsible off-canvas drawer with `.sidebar-backdrop` sibling. Touch targets $\ge 44\text{px}$.
