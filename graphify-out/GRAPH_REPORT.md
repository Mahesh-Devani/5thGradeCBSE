# Graph Report - 5thGradeCBSE  (2026-11-21)

## Corpus Check
- 60 files · ~1,084,063 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: .css 8, (none) 1, .webmanifest 1)

## Summary
- 1132 nodes · 2365 edges · 65 communities (50 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7edae71d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- HindiLearningApp
- science/app.js
- SSTApp
- maths/app.js
- social_sicence_maps/app.js
- english_grammer/app.js
- general_knowledge/app.js
- render
- 4. Mini-App Specifications
- 🔢 Mathematics Master — Class 5 CBSE Learning Hub
- check-invariants.py
- playClickSound
- renderPracticeView
- 🤖 AGENTS.md — Hindi Vyakaran & Rachna Guidelines
- initProfilesUI
- renderAnglesProtractorModule
- 📐 Data Schemas & Contracts — 5thGradeCBSE
- 📱 Multi-Platform App Distribution Roadmap — 5thGradeCBSE
- google-drive-sync.js
- solvers.js
- 🇮🇳 हिंदी व्याकरण व रचना — Class 5 CBSE Learning Hub
- storage.js
- TestArchitecturalInvariants
- hindi_vyakaran/app.js
- 🤖 Agent Guidelines — Mathematics Master
- profile.js
- 🗺️ SST Map Master — Class 5 CBSE Practice
- test_milestones.py
- 🤖 Agent Guidelines — 5thGradeCBSE
- run-regressions.py
- auth.js
- AGENTS.md — AI Agent Memory & Operational Guidelines
- 🎮 Interactive Modes & Pedagogical Pillars
- topic4_patterns.js
- topic5_geometry.js
- 📚 5th Grade CBSE — Interactive Learning Hub
- 🤖 Agent Guidelines — English Grammar Master
- Key Improvements
- 📝 English Grammar Master — Class 5 CBSE
- topic3_expressions.js
- 🌍 SST Chapters Practice — Class 5 CBSE
- topic8_area.js
- 🤖 Agent Guidelines — Science Master (Class 5 CBSE)
- 🤖 SST Chapters Practice — Agent Guidelines
- generateFreshWorksheetTablesData
- 🔬 Science Master — Class 5 CBSE (EVS Curriculum)
- format_remediation_box
- renderWorksheetViewRevision
- build_app.py
- confetti.js
- initDrawer
- topic1_hcf_lcm.js
- topic2_divisibility.js
- topic_revision.js
- speech.js
- topic9_volume.js
- sound.js
- data.js
- topic_fractions.js
- topic_tables.js
- sw.js

## God Nodes (most connected - your core abstractions)
1. `HindiLearningApp` - 70 edges
2. `render()` - 54 edges
3. `playClickSound()` - 47 edges
4. `SSTApp` - 37 edges
5. `renderPracticeView()` - 18 edges
6. `playWrongSound()` - 17 edges
7. `evaluateAndAwardStars()` - 16 edges
8. `init()` - 15 edges
9. `getRandomChoice()` - 15 edges
10. `InvariantResult` - 14 edges

## Surprising Connections (you probably didn't know these)
- `7. Architectural Invariant Verifier & Pre-Commit Regressions (MANDATORY)` --references--> `setStars()`  [INFERRED]
  AGENTS.md → english_grammer/app.js
- `📌 1. Project Overview` --references--> `HindiLearningApp`  [INFERRED]
  hindi_vyakaran/AGENTS.md → hindi_vyakaran/app.js
- `B. Procedural Dynamic Question Generator` --references--> `shuffleOptionsAndGetCorrect()`  [INFERRED]
  maths/AGENTS.md → maths/app.js
- `3. Storage Schema & Session Restore` --references--> `loadState()`  [INFERRED]
  general_knowledge/AGENTS.md → general_knowledge/app.js
- `2. Architecture & File Layout` --references--> `renderArcadeMode()`  [INFERRED]
  general_knowledge/AGENTS.md → general_knowledge/app.js

## Import Cycles
- None detected.

## Communities (65 total, 15 thin omitted)

### Community 0 - "HindiLearningApp"
Cohesion: 0.09
Nodes (3): ConfettiEngine, HindiLearningApp, SoundSynth

### Community 1 - "science/app.js"
Cohesion: 0.09
Nodes (64): attachGadgetEvents(), attachNervousGadgetEvents(), attachSkeletalGadgetEvents(), AudioController, bindMasteryBannerEvents(), CHAPTER_MILESTONES, CHAPTERS_DATA, closeMobileSidebar() (+56 more)

### Community 2 - "SSTApp"
Cohesion: 0.12
Nodes (6): CHAPTER_MILESTONES, CHAPTERS_DATA, ConfettiEngine, sfx, SoundFX, SSTApp

### Community 3 - "maths/app.js"
Cohesion: 0.06
Nodes (41): CHALLENGE_QUESTIONS_TOPIC_FRACTIONS, CHALLENGE_QUESTIONS_TOPIC_TABLES, MISTAKES_TOPIC_1, MISTAKES_TOPIC_2, MISTAKES_TOPIC_3, MISTAKES_TOPIC_4, MISTAKES_TOPIC_5, populatePrintRevision() (+33 more)

### Community 4 - "social_sicence_maps/app.js"
Cohesion: 0.10
Nodes (49): applyZoom(), clearTimer(), closeResultsModal(), closeSidebar(), closeWorksheetModal(), endQuiz(), fireConfetti(), getPathCenter() (+41 more)

### Community 5 - "english_grammer/app.js"
Cohesion: 0.12
Nodes (44): clearTimer(), closeModal(), closeSidebar(), diagnoseTrap(), evaluateAndAwardStars(), finishExercises(), flashFeedback(), formatTime() (+36 more)

### Community 6 - "general_knowledge/app.js"
Cohesion: 0.10
Nodes (44): 1. Content Boundary (MANDATORY), 2. Architecture & File Layout, 3. Storage Schema & Session Restore, 4. Front-End Gotchas & Verification, 🤖 Agent Guidelines — General Knowledge (GK Master), AppState, AudioController, closeModal() (+36 more)

### Community 7 - "render"
Cohesion: 0.08
Nodes (52): completeFractionsLearnCheckpoint(), formatFrac(), formatFracOrMixed(), formatMixed(), gcd(), generateDynamicFractionQuestion(), generateFreshWorksheetFractionsData(), getRandomChoice() (+44 more)

### Community 8 - "4. Mini-App Specifications"
Cohesion: 0.05
Nodes (41): 10-Star Chapter Mastery Architecture & Learning Passport, 1. Architectural Philosophy, 2. Design System & CSS Tokens, 3. Mobile-First Responsive Drawer Pattern, 4. Mini-App Specifications, 5. Developer Recipes & Extension Guides, 6. Testing & Quality Checklist, A. English Grammar Master (`/english_grammer/`) (+33 more)

### Community 9 - "🔢 Mathematics Master — Class 5 CBSE Learning Hub"
Cohesion: 0.06
Nodes (32): 1. 🧠 HCF vs LCM Detective: Which One To Use When?, 1. 🔲 The 20×20 Commutative Symmetry Fold ($A \times B = B \times A$), 1. 🍕 The Polygons Triangulation Secret: $(n - 2) \times 180^\circ$, 1. 🍕 Visual Foundations: The Golden Law of Equal Partitioning, 2. ⚖️ Proper, Improper & Mixed Numbers, 2. 🔨 The Distributive "Split-and-Add Hammer", 2. ⚡ The Mental Estimator: Boundary Deductions, 2. 🔺 Triangle Classification: By Angles & By Sides (+24 more)

### Community 10 - "check-invariants.py"
Cohesion: 0.14
Nodes (13): check_css_brace_balance(), check_git_hygiene_and_compliance(), check_image_asset_integrity(), check_js_syntax_integrity(), check_learn_mode_checkpoints(), check_mobile_drawer_contract(), check_progress_reset_contract(), check_question_schema_integrity() (+5 more)

### Community 11 - "playClickSound"
Cohesion: 0.08
Nodes (29): initAudio(), launchConfetti(), playClickSound(), playCorrectSound(), playFanfare(), playTone(), renderAllRulesTable(), renderCoprimeCompositeModule() (+21 more)

### Community 12 - "renderPracticeView"
Cohesion: 0.13
Nodes (32): bindMasteryBannerEvents(), completeTopicLearnCheckpoint(), endChallenge(), evaluateAndAwardStars(), generateDynamicFractionChallengePool(), generateFractionsPracticeQueue(), generateTablesPracticeQueue(), getFilteredPracticeQuestions() (+24 more)

### Community 13 - "🤖 AGENTS.md — Hindi Vyakaran & Rachna Guidelines"
Cohesion: 0.10
Nodes (21): 📌 1. Project Overview, 🏛️ 2. Tri-Module Architecture, 📷 3. Exam Photograph & Monochrome Print Features, 🌟 4.5. 10-Star Milestone Architecture & Learning Passport, ⚠️ 4. Critical Technical Gotchas & Rules, 🔗 5. DOM Contract (Element IDs in `index.html`), 🚀 6. Developer Extension Recipes, A. Real Exam Photo vs. Cartoon Illustration (`this.state.imageViewMode`) (+13 more)

### Community 14 - "initProfilesUI"
Cohesion: 0.22
Nodes (16): calculateTotalStars(), initAuthUI(), initBackupRestore(), initGoogleSyncUI(), closeModal(), formatTimeAgo(), renderModalState(), initProfilesUI() (+8 more)

### Community 15 - "renderAnglesProtractorModule"
Cohesion: 1.00
Nodes (3): renderAnglesProtractorModule(), getAngleType(), render()

### Community 16 - "📐 Data Schemas & Contracts — 5thGradeCBSE"
Cohesion: 0.10
Nodes (19): 1. Unified Question Object Schema, 2. Topic / Chapter Metadata Schema, 3. Diagnostic "Spot the Trap / Be the Teacher" Schema, 4. State Persistence Schema (`localStorage`), 5. 10-Star Mastery Architecture & Milestones Schema, 6. Pluggable Storage & Backup Contract (`window.AppStorage`), 6. Storage Key Conventions, 7. Multi-Child Profile Schema (`AppProfile` & `cbse_family_profiles`) (+11 more)

### Community 17 - "📱 Multi-Platform App Distribution Roadmap — 5thGradeCBSE"
Cohesion: 0.11
Nodes (18): 🎯 Architectural Philosophy, Architecture for Auto-Updates on iOS, Checklist, Distribution Options, 📱 Multi-Platform App Distribution Roadmap — 5thGradeCBSE, Objectives, Objectives, Objectives (+10 more)

### Community 18 - "google-drive-sync.js"
Cohesion: 0.26
Nodes (17): disconnect(), _emitStatusChange(), _fetchUserInfo(), _findOrCreateRemoteFile(), getClientId(), init(), isConnected(), _loadGisScript() (+9 more)

### Community 19 - "solvers.js"
Cohesion: 0.18
Nodes (15): areCoprime(), checkDivisibility(), gcd(), gcdArray(), getAllDivisibilityResults(), getLongDivision3Numbers(), getLongDivisionHCF(), getPrimesUpTo() (+7 more)

### Community 20 - "🇮🇳 हिंदी व्याकरण व रचना — Class 5 CBSE Learning Hub"
Cohesion: 0.12
Nodes (17): 🌟 10-Star Comprehensive Mastery Progression & Learning Passport, 📋 10-Star Progression Roadmap per Unit, 1. 🏷️ हिंदी व्याकरण: संज्ञा व संज्ञा के पाँच भेद (Nouns & 5 Types), 2. 🔤 हिंदी व्याकरण: वाक्यांश के लिए एक शब्द (One Word Substitution), 3. 🖼️ रचनात्मक लेखन: चित्र वर्णन (Picture Description), 🎮 4 Interactive Learning Modes for Sangya, 🎮 4 Interactive Learning Modes for Vakyansh, 🏆 6 CBSE Exam-Focused Scenes (Real Exam Photos & Cartoons) (+9 more)

### Community 21 - "storage.js"
Cohesion: 0.21
Nodes (10): clearAllAppData(), downloadBackup(), exportData(), get(), importData(), importFromFile(), isAppKey(), _migrate() (+2 more)

### Community 23 - "hindi_vyakaran/app.js"
Cohesion: 0.14
Nodes (12): BHAVVACHAK_NIRMAN_DATA, HINDI_EXAM_TRAPS, HINDI_MILESTONES, SANGYA_CHALLENGE_POOL, SANGYA_COMPARISON_DATA, SANGYA_QUIZ_POOL, SANGYA_SORT_ITEMS, SANGYA_TYPES_DATA (+4 more)

### Community 24 - "🤖 Agent Guidelines — Mathematics Master"
Cohesion: 0.18
Nodes (11): 1. Core Directives & Standards, 2. DOM Contract (`index.html` ↔ `app.js`), 3. Math Engine Schemas & Algorithms, 4.5 Modular Architecture & AI Token Efficiency (MANDATORY), 4. CSS Brace Balance & Mobile Drawer Gotchas, 5. Extension Recipes: Adding Subsequent Topics, 6. Pre-Commit Verification Checklist, A. Short Division Algorithms (+3 more)

### Community 25 - "profile.js"
Cohesion: 0.45
Nodes (13): _applyState(), _captureCurrentState(), createProfile(), deleteProfile(), generateId(), getActiveProfile(), getProfiles(), init() (+5 more)

### Community 26 - "🗺️ SST Map Master — Class 5 CBSE Practice"
Cohesion: 0.15
Nodes (12): 1. 📖 Learn Mode, 2. ❓ Quiz Mode, 3. ⏱️ Timed Challenge Mode, 4. 🏆 Progress Tracking, Persistence & Star Badges, 5. 🖨️ Printable Worksheets Generator, 📚 Curriculum Source & Syllabus Maps, 🎮 Features & Modes, 📁 File Structure (+4 more)

### Community 28 - "🤖 Agent Guidelines — 5thGradeCBSE"
Cohesion: 0.13
Nodes (15): 1. Core Directives, 2. Front-End Standards & Patterns, 3. Directory Layout & Link Conventions, 4. Verification Workflow for Agents, 5. Architectural References, 6. AI Token Optimization & Context Efficiency (MANDATORY), 7. Architectural Invariant Verifier & Pre-Commit Regressions (MANDATORY), 8. AI Agent Guardrails: Structural Knowledge Graph (Graphify) (+7 more)

### Community 29 - "run-regressions.py"
Cohesion: 0.17
Nodes (4): get_git_modified_files(), main(), resolve_tests_for_files(), run_test_suites()

### Community 30 - "auth.js"
Cohesion: 0.24
Nodes (6): _emitRedeemed(), init(), isLoggedIn(), login(), redeemCode(), _saveUser()

### Community 31 - "AGENTS.md — AI Agent Memory & Operational Guidelines"
Cohesion: 0.17
Nodes (12): 1. World Physical Map (`viewBox="0 0 1000 500"`), 2. Saudi Arabia & Neighbours Map (`viewBox="0 0 750 650"`), 3. DRC & Neighbours Map (`viewBox="250 250 340 380"`), AGENTS.md — AI Agent Memory & Operational Guidelines, 🔗 Contract Between `index.html` and `app.js`, ⚠️ Critical Rule 1: Official Indian Map Boundary (Survey of India), ⚠️ Critical Rule 2: World Physical Map Styling, 🚀 How to Add New Maps (e.g., Term II Syllabus) (+4 more)

### Community 32 - "🎮 Interactive Modes & Pedagogical Pillars"
Cohesion: 0.18
Nodes (10): 1. 📖 Stories & Brain Sparks (Learn Mode), 2. 🕵️ Detective & Decoder Arcade, 3. ❓ Monthly Quick Quiz, 4. 🖼️ Visual Picture Identification Rounds, 5. ⚡ 60-Second Rapid Fire Sprint, 6. 📄 Printable School Worksheets, 🌍 General Knowledge Master — Class 5 CBSE (June, July, August 2026), 🎮 Interactive Modes & Pedagogical Pillars (+2 more)

### Community 34 - "topic4_patterns.js"
Cohesion: 0.20
Nodes (7): CHALLENGE_QUESTIONS_TOPIC_4, computePalindromeSteps(), LEARN_MODULES_TOPIC_4, PATTERN_PRESETS, PRACTICE_POOL_TOPIC_4, SQUARE_NUMBERS_DATA, TRIANGULAR_NUMBERS_DATA

### Community 35 - "topic5_geometry.js"
Cohesion: 0.20
Nodes (9): ANGLE_TYPES_DATA, CHALLENGE_QUESTIONS_TOPIC_5, CLOCK_ANGLES_PRESETS, GEOMETRY_FOUNDATIONS, LEARN_MODULES_TOPIC_5, LINE_RELATIONSHIPS_DATA, POLYGON_DATA, PRACTICE_POOL_TOPIC_5 (+1 more)

### Community 36 - "📚 5th Grade CBSE — Interactive Learning Hub"
Cohesion: 0.20
Nodes (10): 1. View Locally, 2. Host on GitHub Pages, 📚 5th Grade CBSE — Interactive Learning Hub, 🛠️ Architecture & Development Standards, 📋 Available Subjects & Roadmap, 🤝 Contributing, 🔮 Future Roadmap & Scope, 🌟 Key Highlights (+2 more)

### Community 37 - "🤖 Agent Guidelines — English Grammar Master"
Cohesion: 0.22
Nodes (9): 10-Star Milestone Architecture Schema, 1. Pedagogical Directives (Class 5 CBSE), 2. DOM Contract (`index.html` ↔ `app.js`), 3. Data Schema & Content Architecture, 4. Native Web Audio Synthesizer, 5. Mobile Drawer & CSS Isolation Gotchas, 6. How to Add a New Grammar Topic (e.g. Prepositions), 7. Pre-Commit Verification Checklist (+1 more)

### Community 38 - "Key Improvements"
Cohesion: 0.22
Nodes (8): 1. Off-Canvas Mobile Navigation Drawer, 2. Touch-Friendly Top Navigation & Segmented Tabs, 3. Responsive Lesson & Exercise Experience, 4. Welcome Screen Call-to-Action, Git & Deployment Status, Key Improvements, Visual Verification, Walkthrough: English Grammar Mobile Optimization

### Community 39 - "📝 English Grammar Master — Class 5 CBSE"
Cohesion: 0.22
Nodes (9): 🌟 10 Pedagogical Stars Per Topic, 🛠️ Adding New Exercises, 📝 English Grammar Master — Class 5 CBSE, 🗂️ File Structure, 🎮 Learning Modes, 🎮 Learning Modes & 10-Star Mastery Architecture, 📋 Learning Passport & Parent Audit Report, 📱 Mobile-First Architecture (+1 more)

### Community 40 - "topic3_expressions.js"
Cohesion: 0.22
Nodes (8): CHALLENGE_QUESTIONS_TOPIC_3, CLUE_WORDS_DATA, DILEMMA_PRESETS, EXPR_PRESETS_MATH_TO_STATEMENT, EXPR_PRESETS_STATEMENT_TO_MATH, LEARN_MODULES_TOPIC_3, PRACTICE_POOL_TOPIC_3, REAL_WORLD_PRESETS

### Community 41 - "🌍 SST Chapters Practice — Class 5 CBSE"
Cohesion: 0.22
Nodes (8): ⭐ 10-Star Chapter Mastery Architecture, 🏗️ Adding New Chapters (Extensibility), 📚 Curriculum Coverage (Term Revision), 📋 Learning Passport & Parent Audit Report, 🛠️ Modes & Features, 🎯 Pedagogical Philosophy, 🌍 SST Chapters Practice — Class 5 CBSE, 📱 Technical Standards

### Community 42 - "topic8_area.js"
Cohesion: 0.36
Nodes (10): attachAreaCheckpointListeners(), CHALLENGE_QUESTIONS_TOPIC_8, LEARN_MODULES_TOPIC_8, PRACTICE_POOL_TOPIC_8, renderAreaCheckpointCard(), renderAreaFoundationsModule(), renderIrregularGridModule(), renderSameAreaModule() (+2 more)

### Community 43 - "🤖 Agent Guidelines — Science Master (Class 5 CBSE)"
Cohesion: 0.29
Nodes (6): 1. Core Directives, 2. Architecture & Data Schema, 3. State Persistence Pattern, 4. Front-End Gotchas & Verification, Adding a New Chapter, 🤖 Agent Guidelines — Science Master (Class 5 CBSE)

### Community 44 - "🤖 SST Chapters Practice — Agent Guidelines"
Cohesion: 0.29
Nodes (6): 1. Core Principles, 2. Data Schemas, 3. CSS & Responsive Drawer Rules, Chapter Schema (`CHAPTERS_DATA`), Milestone Schema (`CHAPTER_MILESTONES`), 🤖 SST Chapters Practice — Agent Guidelines

### Community 45 - "generateFreshWorksheetTablesData"
Cohesion: 0.16
Nodes (19): 5. Topic 6 Architecture: Tables (1 to 20) & Mental Speed Master, A. Anti-Rote 3-Star Milestone Rules, B. Procedural Dynamic Question Generator, C. Dynamic Printable Worksheet, completeTablesLearnCheckpoint(), generateDynamicChallengePool(), generateDynamicTableQuestion(), generateFreshWorksheetTablesData() (+11 more)

### Community 46 - "🔬 Science Master — Class 5 CBSE (EVS Curriculum)"
Cohesion: 0.33
Nodes (5): 🛠️ Modes & Features, 🎯 Pedagogical Philosophy: The 4 Thinking Pillars, 🔬 Science Master — Class 5 CBSE (EVS Curriculum), 📚 Syllabus & Worksheet Coverage, 📱 Technical Standards

### Community 48 - "renderWorksheetViewRevision"
Cohesion: 0.90
Nodes (5): renderWorksheetViewRevision(), calculateMetrics(), getSelectedTopics(), updateMetricsUI(), updatePreviewHTML()

### Community 51 - "initDrawer"
Cohesion: 0.50
Nodes (3): initDrawer(), close(), toggle()

### Community 52 - "topic1_hcf_lcm.js"
Cohesion: 0.50
Nodes (3): CHALLENGE_QUESTIONS_TOPIC_1, LEARN_MODULES_TOPIC_1, PRACTICE_POOL_TOPIC_1

### Community 53 - "topic2_divisibility.js"
Cohesion: 0.50
Nodes (3): CHALLENGE_QUESTIONS_TOPIC_2, LEARN_MODULES_TOPIC_2, PRACTICE_POOL_TOPIC_2

### Community 54 - "topic_revision.js"
Cohesion: 0.50
Nodes (3): CHALLENGE_QUESTIONS_REVISION, LEARN_MODULES_REVISION, PRACTICE_POOL_REVISION

### Community 56 - "topic9_volume.js"
Cohesion: 0.36
Nodes (10): attachVolumeCheckpointListeners(), CHALLENGE_QUESTIONS_TOPIC_9, LEARN_MODULES_TOPIC_9, PRACTICE_POOL_TOPIC_9, renderBaseAreaHeightModule(), renderCaseStudiesModule(), renderCubeCuboidFormulasModule(), renderSolids3DFoundationsModule() (+2 more)

## Knowledge Gaps
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `🤖 Agent Guidelines — Mathematics Master` connect `🤖 Agent Guidelines — Mathematics Master` to `AGENTS.md`, `generateFreshWorksheetTablesData`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Should `HindiLearningApp` be split into smaller, more focused modules?**
  _Cohesion score 0.09454983438723276 - nodes in this community are weakly interconnected._
- **Why does `5. Topic 6 Architecture: Tables (1 to 20) & Mental Speed Master` connect `generateFreshWorksheetTablesData` to `🤖 Agent Guidelines — Mathematics Master`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Should `science/app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08857808857808858 - nodes in this community are weakly interconnected._
- **Why does `HindiLearningApp` connect `HindiLearningApp` to `🤖 AGENTS.md — Hindi Vyakaran & Rachna Guidelines`, `hindi_vyakaran/app.js`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Should `SSTApp` be split into smaller, more focused modules?**
  _Cohesion score 0.12368972746331237 - nodes in this community are weakly interconnected._
- **Should `maths/app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0596078431372549 - nodes in this community are weakly interconnected._