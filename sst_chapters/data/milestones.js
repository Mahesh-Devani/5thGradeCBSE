/* ==========================================================
   SST CHAPTERS — Chapter Mastery Milestones (10 Stars Each)
   CBSE Class 5 Social Science Curriculum
   Zero External Dependencies | Pure Vanilla ES6
   ========================================================== */

const CHAPTER_MILESTONES = {
  'ch5_drc': [
    {
      id: 'learn_part1',
      title: 'Equatorial Rainforest Architecture',
      desc: 'Explored the 3-Storey Rainforest diagram (Emergent, Canopy, Understory) and 4 O\'Clock Convectional Rain engine',
      hint: 'Review concept cards 1 & 2 and Rainforest layers in Learn mode',
      check: (d) => (d.learnCardsRead >= 2 || d.interactiveExplored)
    },
    {
      id: 'learn_part2',
      title: 'Mineral Wealth & Pygmy Culture',
      desc: 'Explored DRC\'s cobalt & industrial diamond wealth, shifting cultivation, and indigenous Bambuti pygmies',
      hint: 'Review concept cards 3, 4 & 5 in Learn mode or solve 14 practice questions',
      check: (d) => (d.learnCardsRead >= 4 || d.totalSolved >= 14)
    },
    {
      id: 'exam_traps',
      title: 'Rainforest & Evergreen Traps',
      desc: 'Diagnosed tricky CBSE exam misconceptions in "Be the Teacher" (evergreen leaf shedding vs deciduous, mineral paradox)',
      hint: 'Read and diagnose the exam traps in Learn mode or solve 12 practice questions',
      check: (d) => (d.trapsDiagnosed >= 2 || d.totalSolved >= 12)
    },
    {
      id: 'practice_blanks',
      title: 'Geographical Fact Precision (Blanks)',
      desc: 'Correctly completed foundational fill-in-the-blank questions on DRC\'s rivers, capital, and climate',
      hint: 'Solve at least 3 Fill in the Blanks questions in Practice mode (or 2 questions total)',
      check: (d) => ((d.categorySolved.blank || 0) >= 3 || d.totalSolved >= 2)
    },
    {
      id: 'practice_tf',
      title: 'True/False Deductions & Corrections',
      desc: 'Evaluated True/False statements with geographic reasoning',
      hint: 'Solve at least 3 True/False questions in Practice mode (or 4 questions total)',
      check: (d) => ((d.categorySolved.tf || 0) >= 3 || d.totalSolved >= 4)
    },
    {
      id: 'practice_match',
      title: 'Resource & Agricultural Matching',
      desc: 'Paired DRC\'s crops, minerals, and indigenous groups to their roles',
      hint: 'Solve Match the Following questions in Practice mode (or 6 questions total)',
      check: (d) => ((d.categorySolved.match || 0) >= 1 || d.totalSolved >= 6)
    },
    {
      id: 'practice_short',
      title: 'Short Answer Reasoning (2 Marks)',
      desc: 'Formulated concise 2-mark conceptual explanations (4 o\'clock rain, transport challenges)',
      hint: 'Solve at least 2 Short Answer questions in Practice mode (or 8 questions total)',
      check: (d) => ((d.categorySolved.short || 0) >= 2 || d.totalSolved >= 8)
    },
    {
      id: 'practice_long',
      title: 'Long Answer Scaffold Mastery (5 Marks)',
      desc: 'Chunked and conquered 5-mark subjective exam questions using the 4-pillar scaffold',
      hint: 'Review and solve at least 1 Long Answer question in Practice mode (or 10 questions total)',
      check: (d) => ((d.categorySolved.long || 0) >= 1 || d.totalSolved >= 10)
    },
    {
      id: 'practice_breadth',
      title: 'Comprehensive Chapter Breadth',
      desc: 'Solved at least 10 questions across all practice categories',
      hint: 'Solve at least 10 total practice questions',
      check: (d) => d.totalSolved >= 10
    },
    {
      id: 'sprint_mastery',
      title: 'Mental Speed & Exam Readiness',
      desc: 'Achieved ≥7 points in the 60-Second Rapid-Fire Challenge',
      hint: 'Score 7+ points in the 60s Challenge or complete 16 practice questions',
      check: (d) => (d.sprintHighScore >= 7 || d.totalSolved >= 16)
    }
  ],

  'ch6_greenland': [
    {
      id: 'learn_part1',
      title: 'Frigid Zone & Iceberg Dynamics',
      desc: 'Explored Greenland Ice Sheet (80%+ ice cover), iceberg buoyancy tip (~10%), and Midnight Sun',
      hint: 'Review concept cards 1 & 2 and the Iceberg anatomy diagram in Learn mode',
      check: (d) => (d.learnCardsRead >= 2 || d.interactiveExplored)
    },
    {
      id: 'learn_part2',
      title: 'Tundra Ecology & Inuit Culture',
      desc: 'Mastered Arctic flora/fauna adaptations and traditional vs modern Inuit lifestyles (kayaks, igloos, Nuuk)',
      hint: 'Review concept cards 3, 4 & 5 in Learn mode or solve 14 practice questions',
      check: (d) => (d.learnCardsRead >= 4 || d.totalSolved >= 14)
    },
    {
      id: 'exam_traps',
      title: 'Arctic Misconceptions Diagnostic',
      desc: 'Diagnosed tricky CBSE exam traps (Greenland naming irony, permanent vs temporary snow igloos, iceberg mass)',
      hint: 'Read and diagnose at least 2 exam traps in Learn mode or solve 12 practice questions',
      check: (d) => (d.trapsDiagnosed >= 2 || d.totalSolved >= 12)
    },
    {
      id: 'practice_blanks',
      title: 'Arctic Fact Precision (Blanks)',
      desc: 'Correctly completed foundational fill-in-the-blank questions on Nuuk, icebergs, harpoons, and tundra',
      hint: 'Solve at least 3 Fill in the Blanks questions in Practice mode (or 2 questions total)',
      check: (d) => ((d.categorySolved.blank || 0) >= 3 || d.totalSolved >= 2)
    },
    {
      id: 'practice_tf',
      title: 'Polar True/False Deductions',
      desc: 'Evaluated True/False statements regarding Arctic flora, fauna, and seasons with reasoning',
      hint: 'Solve at least 3 True/False questions in Practice mode (or 4 questions total)',
      check: (d) => ((d.categorySolved.tf || 0) >= 3 || d.totalSolved >= 4)
    },
    {
      id: 'practice_match',
      title: 'Arctic Terminology & Gear Matching',
      desc: 'Matched Inuit terms (Parka, Kayak, Umiak, Harpoon, Igloo) with precision',
      hint: 'Solve at least 1 Match the Following set in Practice mode (or 6 questions total)',
      check: (d) => ((d.categorySolved.match || 0) >= 1 || d.totalSolved >= 6)
    },
    {
      id: 'practice_short',
      title: 'Polar Conceptual Reasoning (2 Marks)',
      desc: 'Formulated concise 2-mark conceptual explanations (why trees don\'t grow, iceberg danger to ships)',
      hint: 'Solve at least 2 Short Answer questions in Practice mode (or 8 questions total)',
      check: (d) => ((d.categorySolved.short || 0) >= 2 || d.totalSolved >= 8)
    },
    {
      id: 'practice_long',
      title: 'Long Answer Scaffold Mastery (5 Marks)',
      desc: 'Chunked and conquered 5-mark subjective exam questions on Inuit lifestyle changes and climate',
      hint: 'Review and solve at least 1 Long Answer question in Practice mode (or 10 questions total)',
      check: (d) => ((d.categorySolved.long || 0) >= 1 || d.totalSolved >= 10)
    },
    {
      id: 'practice_breadth',
      title: 'Comprehensive Arctic Practice Breadth',
      desc: 'Solved at least 10 questions across all practice categories',
      hint: 'Solve at least 10 total practice questions',
      check: (d) => d.totalSolved >= 10
    },
    {
      id: 'sprint_mastery',
      title: 'Mental Speed & Polar Recall',
      desc: 'Achieved ≥7 points in the 60-Second Rapid-Fire Challenge',
      hint: 'Score 7+ points in the 60s Challenge or complete 16 practice questions',
      check: (d) => (d.sprintHighScore >= 7 || d.totalSolved >= 16)
    }
  ],

  'ch7_saudi': [
    {
      id: 'learn_part1',
      title: 'Desert Landforms & Liquid Gold',
      desc: 'Explored Arabian peninsula geography, sand dunes, oasis ecosystems, and petroleum wealth',
      hint: 'Review concept cards 1 & 2 in Learn mode',
      check: (d) => d.learnCardsRead >= 2
    },
    {
      id: 'learn_part2',
      title: 'Water Solutions & Modern Economy',
      desc: 'Mastered desalination plants, drip irrigation, Bedouin traditions, and modern Riyadh & Jeddah',
      hint: 'Review concept cards 3, 4 & 5 in Learn mode or solve 14 practice questions',
      check: (d) => (d.learnCardsRead >= 4 || d.totalSolved >= 14)
    },
    {
      id: 'exam_traps',
      title: 'Desert Climate & Oasis Traps',
      desc: 'Diagnosed tricky CBSE exam traps (extreme diurnal temperature range, oasis underground water source)',
      hint: 'Read and diagnose the exam traps in Learn mode or solve 12 practice questions',
      check: (d) => (d.trapsDiagnosed >= 2 || d.totalSolved >= 12)
    },
    {
      id: 'practice_blanks',
      title: 'Desert Geography Precision (Blanks)',
      desc: 'Completed foundational blanks on Riyadh, Rub\' al Khali, Red Sea, and oil fields',
      hint: 'Solve at least 3 Fill in the Blanks questions in Practice mode (or 2 questions total)',
      check: (d) => ((d.categorySolved.blank || 0) >= 3 || d.totalSolved >= 2)
    },
    {
      id: 'practice_tf',
      title: 'True/False Desert Deductions',
      desc: 'Evaluated statements on Arabian climate, rivers (wadis), and Bedouin tents with corrections',
      hint: 'Solve at least 3 True/False questions in Practice mode (or 4 questions total)',
      check: (d) => ((d.categorySolved.tf || 0) >= 3 || d.totalSolved >= 4)
    },
    {
      id: 'practice_match',
      title: 'Arabian Culture & Resource Matching',
      desc: 'Connected Saudi garments (Thobe, Ghutrah), cities, and resources to their roles',
      hint: 'Solve Match the Following questions in Practice mode (or 6 questions total)',
      check: (d) => ((d.categorySolved.match || 0) >= 1 || d.totalSolved >= 6)
    },
    {
      id: 'practice_short',
      title: 'Short Answer Reasoning (2 Marks)',
      desc: 'Formulated concise 2-mark conceptual explanations (why camel is ship of the desert, how oil transformed life)',
      hint: 'Solve at least 2 Short Answer questions in Practice mode (or 8 questions total)',
      check: (d) => ((d.categorySolved.short || 0) >= 2 || d.totalSolved >= 8)
    },
    {
      id: 'practice_long',
      title: 'Long Answer Scaffold Mastery (5 Marks)',
      desc: 'Chunked and conquered 5-mark subjective exam questions on Saudi Arabia\'s transformation',
      hint: 'Review and solve at least 1 Long Answer question in Practice mode (or 10 questions total)',
      check: (d) => ((d.categorySolved.long || 0) >= 1 || d.totalSolved >= 10)
    },
    {
      id: 'practice_breadth',
      title: 'Comprehensive Desert Breadth',
      desc: 'Solved at least 10 questions across all practice categories',
      hint: 'Solve at least 10 total practice questions',
      check: (d) => d.totalSolved >= 10
    },
    {
      id: 'sprint_mastery',
      title: 'Mental Speed & Desert Recall',
      desc: 'Achieved ≥7 points in the 60-Second Rapid-Fire Challenge',
      hint: 'Score 7+ points in the 60s Challenge or complete 16 practice questions',
      check: (d) => (d.sprintHighScore >= 7 || d.totalSolved >= 16)
    }
  ],

  'ch17_british_raj': [
    {
      id: 'learn_part1',
      title: 'Trade to Conquest Foundations',
      desc: 'Explored Vasco da Gama\'s arrival (1498), East India Company (1600), and Battle of Plassey (1757)',
      hint: 'Review concept cards 1 & 2 in Learn mode',
      check: (d) => d.learnCardsRead >= 2
    },
    {
      id: 'learn_part2',
      title: 'Economic Exploitation & 1857 Spark',
      desc: 'Mastered Doctrine of Lapse, forced indigo/cotton farming, greased cartridges, Mangal Pandey, and Crown Rule (1858)',
      hint: 'Review concept cards 3, 4 & 5 in Learn mode or solve 14 practice questions',
      check: (d) => (d.learnCardsRead >= 4 || d.totalSolved >= 14)
    },
    {
      id: 'exam_traps',
      title: 'Colonial Exploitation Traps',
      desc: 'Diagnosed tricky CBSE exam traps (Company rule vs Crown rule, economic vs religious causes of 1857)',
      hint: 'Read and diagnose the exam traps in Learn mode or solve 12 practice questions',
      check: (d) => (d.trapsDiagnosed >= 2 || d.totalSolved >= 12)
    },
    {
      id: 'practice_blanks',
      title: 'Historical Chronology (Blanks)',
      desc: 'Completed blanks on Plassey, Bahadur Shah Zafar, Rani Lakshmibai, and Queen Victoria\'s proclamation',
      hint: 'Solve at least 3 Fill in the Blanks questions in Practice mode (or 2 questions total)',
      check: (d) => ((d.categorySolved.blank || 0) >= 3 || d.totalSolved >= 2)
    },
    {
      id: 'practice_tf',
      title: '1857 Revolt True/False Deductions',
      desc: 'Evaluated historical statements with cause-and-effect reasoning',
      hint: 'Solve at least 3 True/False questions in Practice mode (or 4 questions total)',
      check: (d) => ((d.categorySolved.tf || 0) >= 3 || d.totalSolved >= 4)
    },
    {
      id: 'practice_match',
      title: '1857 Revolt Leaders & Centers',
      desc: 'Matched revolutionary leaders (Nana Saheb, Tantia Tope, Rani Lakshmibai, Kunwar Singh) to their centers',
      hint: 'Solve Match the Following questions in Practice mode (or 6 questions total)',
      check: (d) => ((d.categorySolved.match || 0) >= 1 || d.totalSolved >= 6)
    },
    {
      id: 'practice_short',
      title: 'Short Answer Historical Reasoning (2 Marks)',
      desc: 'Formulated 2-mark explanations (why Indian weavers suffered, why the 1857 revolt failed to dislodge British)',
      hint: 'Solve at least 2 Short Answer questions in Practice mode (or 8 questions total)',
      check: (d) => ((d.categorySolved.short || 0) >= 2 || d.totalSolved >= 8)
    },
    {
      id: 'practice_long',
      title: 'Long Answer Scaffold Mastery (5 Marks)',
      desc: 'Mastered 5-mark subjective answers on causes of the 1857 Revolt and aftermath',
      hint: 'Review and solve at least 1 Long Answer question in Practice mode (or 10 questions total)',
      check: (d) => ((d.categorySolved.long || 0) >= 1 || d.totalSolved >= 10)
    },
    {
      id: 'practice_breadth',
      title: 'Comprehensive British Raj Breadth',
      desc: 'Solved at least 10 questions across all practice categories',
      hint: 'Solve at least 10 total practice questions',
      check: (d) => d.totalSolved >= 10
    },
    {
      id: 'sprint_mastery',
      title: 'Mental Speed & Freedom Chronology',
      desc: 'Achieved ≥7 points in the 60-Second Rapid-Fire Challenge',
      hint: 'Score 7+ points in the 60s Challenge or complete 16 practice questions',
      check: (d) => (d.sprintHighScore >= 7 || d.totalSolved >= 16)
    }
  ],

  'ch18_struggle_independence': [
    {
      id: 'learn_part1',
      title: 'Rise of Nationalism & INC (1885)',
      desc: 'Explored birth of Indian National Congress (A.O. Hume, W.C. Bonnerjee) and Moderates\' constitutional petitions',
      hint: 'Review concept cards 1 & 2 in Learn mode',
      check: (d) => d.learnCardsRead >= 2
    },
    {
      id: 'learn_part2',
      title: 'Radicals, Partition of Bengal & Swadeshi',
      desc: 'Mastered Lal-Bal-Pal, Tilak\'s Swaraj proclamation, 1905 Partition of Bengal, Swadeshi bonfires, and Revolutionaries',
      hint: 'Review concept cards 3, 4 & 5 in Learn mode or solve 14 practice questions',
      check: (d) => (d.learnCardsRead >= 4 || d.totalSolved >= 14)
    },
    {
      id: 'exam_traps',
      title: 'Nationalist Movement Traps',
      desc: 'Diagnosed tricky CBSE exam traps (Moderates vs Radicals methods, Bengal partition real motive vs British excuse)',
      hint: 'Read and diagnose the exam traps in Learn mode or solve 12 practice questions',
      check: (d) => (d.trapsDiagnosed >= 2 || d.totalSolved >= 12)
    },
    {
      id: 'practice_blanks',
      title: 'Nationalist Chronology (Blanks)',
      desc: 'Completed blanks on Bombay 1885, Lord Curzon 1905, Kesari, and Swadeshi',
      hint: 'Solve at least 3 Fill in the Blanks questions in Practice mode (or 2 questions total)',
      check: (d) => ((d.categorySolved.blank || 0) >= 3 || d.totalSolved >= 2)
    },
    {
      id: 'practice_tf',
      title: 'True/False Nationalist Deductions',
      desc: 'Evaluated historical statements on Moderate prayers vs Radical direct action',
      hint: 'Solve at least 3 True/False questions in Practice mode (or 4 questions total)',
      check: (d) => ((d.categorySolved.tf || 0) >= 3 || d.totalSolved >= 4)
    },
    {
      id: 'practice_match',
      title: 'Leaders, Publications & Movements',
      desc: 'Matched leaders (Tilak, Gokhale, Khudiram Bose, Curzon) to their contributions',
      hint: 'Solve Match the Following questions in Practice mode (or 6 questions total)',
      check: (d) => ((d.categorySolved.match || 0) >= 1 || d.totalSolved >= 6)
    },
    {
      id: 'practice_short',
      title: 'Short Answer Reasoning (2 Marks)',
      desc: 'Formulated 2-mark conceptual explanations (difference between Moderates and Radicals, Swadeshi movement)',
      hint: 'Solve at least 2 Short Answer questions in Practice mode (or 8 questions total)',
      check: (d) => ((d.categorySolved.short || 0) >= 2 || d.totalSolved >= 8)
    },
    {
      id: 'practice_long',
      title: 'Long Answer Scaffold Mastery (5 Marks)',
      desc: 'Mastered 5-mark subjective answers on Partition of Bengal and the Swadeshi & Boycott Movement',
      hint: 'Review and solve at least 1 Long Answer question in Practice mode (or 10 questions total)',
      check: (d) => ((d.categorySolved.long || 0) >= 1 || d.totalSolved >= 10)
    },
    {
      id: 'practice_breadth',
      title: 'Comprehensive Nationalist Practice',
      desc: 'Solved at least 10 questions across all practice categories',
      hint: 'Solve at least 10 total practice questions',
      check: (d) => d.totalSolved >= 10
    },
    {
      id: 'sprint_mastery',
      title: 'Mental Speed & Nationalist Recall',
      desc: 'Achieved ≥7 points in the 60-Second Rapid-Fire Challenge',
      hint: 'Score 7+ points in the 60s Challenge or complete 16 practice questions',
      check: (d) => (d.sprintHighScore >= 7 || d.totalSolved >= 16)
    }
  ],

  'ch19_freedom_at_last': [
    {
      id: 'learn_part1',
      title: 'Gandhian Era & Jallianwala Bagh',
      desc: 'Explored Satyagraha, Rowlatt Act, Jallianwala Bagh tragedy (13 April 1919, General Dyer), and Non-Cooperation',
      hint: 'Review concept cards 1, 2 & 3 in Learn mode',
      check: (d) => d.learnCardsRead >= 3
    },
    {
      id: 'learn_part2',
      title: 'Civil Disobedience, Quit India & INA',
      desc: 'Mastered Dandi Salt March (1930), Quit India ("Do or Die" 1942), Netaji Subhas Chandra Bose & INA, and 15 August 1947',
      hint: 'Review concept cards 4, 5 & 6 in Learn mode or solve 14 practice questions',
      check: (d) => (d.learnCardsRead >= 5 || d.totalSolved >= 14)
    },
    {
      id: 'exam_traps',
      title: 'Mass Movement Traps',
      desc: 'Diagnosed tricky CBSE exam traps (why Non-Cooperation was suspended after Chauri Chaura, Simon Commission boycott reason)',
      hint: 'Read and diagnose the exam traps in Learn mode or solve 12 practice questions',
      check: (d) => (d.trapsDiagnosed >= 2 || d.totalSolved >= 12)
    },
    {
      id: 'practice_blanks',
      title: 'Gandhian Movements Precision (Blanks)',
      desc: 'Completed blanks on Satyagraha, Dyer, Dandi, Chauri Chaura, and INA',
      hint: 'Solve at least 3 Fill in the Blanks questions in Practice mode (or 2 questions total)',
      check: (d) => ((d.categorySolved.blank || 0) >= 3 || d.totalSolved >= 2)
    },
    {
      id: 'practice_tf',
      title: 'Freedom Movement True/False Deductions',
      desc: 'Evaluated historical statements on non-violence, salt tax defiance, and Azad Hind Fauj',
      hint: 'Solve at least 3 True/False questions in Practice mode (or 4 questions total)',
      check: (d) => ((d.categorySolved.tf || 0) >= 3 || d.totalSolved >= 4)
    },
    {
      id: 'practice_match',
      title: 'Freedom Slogans & Historic Years',
      desc: 'Matched iconic slogans ("Jai Hind", "Do or Die", "Give me blood") and key years (1919, 1930, 1942, 1947)',
      hint: 'Solve Match the Following questions in Practice mode (or 6 questions total)',
      check: (d) => ((d.categorySolved.match || 0) >= 1 || d.totalSolved >= 6)
    },
    {
      id: 'practice_short',
      title: 'Short Answer Historical Reasoning (2 Marks)',
      desc: 'Formulated 2-mark conceptual explanations (why Gandhiji picked salt for civil disobedience, why Simon Commission was boycotted)',
      hint: 'Solve at least 2 Short Answer questions in Practice mode (or 8 questions total)',
      check: (d) => ((d.categorySolved.short || 0) >= 2 || d.totalSolved >= 8)
    },
    {
      id: 'practice_long',
      title: 'Long Answer Scaffold Mastery (5 Marks)',
      desc: 'Mastered 5-mark subjective answers on Jallianwala Bagh and the Dandi March',
      hint: 'Review and solve at least 1 Long Answer question in Practice mode (or 10 questions total)',
      check: (d) => ((d.categorySolved.long || 0) >= 1 || d.totalSolved >= 10)
    },
    {
      id: 'practice_breadth',
      title: 'Comprehensive Freedom Breadth',
      desc: 'Solved at least 10 questions across all practice categories',
      hint: 'Solve at least 10 total practice questions',
      check: (d) => d.totalSolved >= 10
    },
    {
      id: 'sprint_mastery',
      title: 'Mental Speed & Freedom Milestones',
      desc: 'Achieved ≥7 points in the 60-Second Rapid-Fire Challenge',
      hint: 'Score 7+ points in the 60s Challenge or complete 16 practice questions',
      check: (d) => (d.sprintHighScore >= 7 || d.totalSolved >= 16)
    }
  ],

  'ch20_government': [
    {
      id: 'learn_part1',
      title: '3 Organs & 3 Levels of Governance',
      desc: 'Explored the 3 Organs (Legislature makes laws, Executive enforces, Judiciary protects) and 3 Levels (Central, State, Local)',
      hint: 'Review concept cards 1 & 2 and the Governance matrix diagram in Learn mode',
      check: (d) => (d.learnCardsRead >= 2 || d.interactiveExplored)
    },
    {
      id: 'learn_part2',
      title: 'Parliament, President & Courts',
      desc: 'Mastered Lok Sabha vs Rajya Sabha, Head of State (President) vs Head of Government (PM), and Supreme Court in New Delhi',
      hint: 'Review concept cards 3, 4 & 5 in Learn mode or solve 14 practice questions',
      check: (d) => (d.learnCardsRead >= 4 || d.totalSolved >= 14)
    },
    {
      id: 'exam_traps',
      title: 'Constitutional Roles Traps',
      desc: 'Diagnosed tricky CBSE exam traps (President vs Prime Minister powers, Lok Sabha vs Rajya Sabha membership term)',
      hint: 'Read and diagnose the exam traps in Learn mode or solve 12 practice questions',
      check: (d) => (d.trapsDiagnosed >= 2 || d.totalSolved >= 12)
    },
    {
      id: 'practice_blanks',
      title: 'Governance Fact Precision (Blanks)',
      desc: 'Completed blanks on Parliament, Chief Justice, Vidhan Sabha, and Lok Sabha elections',
      hint: 'Solve at least 3 Fill in the Blanks questions in Practice mode (or 2 questions total)',
      check: (d) => ((d.categorySolved.blank || 0) >= 3 || d.totalSolved >= 2)
    },
    {
      id: 'practice_tf',
      title: 'Constitutional True/False Deductions',
      desc: 'Evaluated statements on democratic branches, Supreme Court authority, and election ages',
      hint: 'Solve at least 3 True/False questions in Practice mode (or 4 questions total)',
      check: (d) => ((d.categorySolved.tf || 0) >= 3 || d.totalSolved >= 4)
    },
    {
      id: 'practice_match',
      title: 'Constitutional Roles & Organs',
      desc: 'Matched organs (Legislature, Executive, Judiciary) and constitutional heads (President, PM, Chief Justice, Governor)',
      hint: 'Solve Match the Following questions in Practice mode (or 6 questions total)',
      check: (d) => ((d.categorySolved.match || 0) >= 1 || d.totalSolved >= 6)
    },
    {
      id: 'practice_short',
      title: 'Short Answer Governance Reasoning (2 Marks)',
      desc: 'Formulated 2-mark conceptual explanations (why judiciary must be independent, how Lok Sabha members are elected)',
      hint: 'Solve at least 2 Short Answer questions in Practice mode (or 8 questions total)',
      check: (d) => ((d.categorySolved.short || 0) >= 2 || d.totalSolved >= 8)
    },
    {
      id: 'practice_long',
      title: 'Long Answer Scaffold Mastery (5 Marks)',
      desc: 'Mastered 5-mark subjective answers on the 3 Organs of Government and Lok Sabha vs Rajya Sabha',
      hint: 'Review and solve at least 1 Long Answer question in Practice mode (or 10 questions total)',
      check: (d) => ((d.categorySolved.long || 0) >= 1 || d.totalSolved >= 10)
    },
    {
      id: 'practice_breadth',
      title: 'Comprehensive Civics Breadth',
      desc: 'Solved at least 10 questions across all practice categories',
      hint: 'Solve at least 10 total practice questions',
      check: (d) => d.totalSolved >= 10
    },
    {
      id: 'sprint_mastery',
      title: 'Mental Speed & Civics Recall',
      desc: 'Achieved ≥7 points in the 60-Second Rapid-Fire Challenge',
      hint: 'Score 7+ points in the 60s Challenge or complete 16 practice questions',
      check: (d) => (d.sprintHighScore >= 7 || d.totalSolved >= 16)
    }
  ]
};
