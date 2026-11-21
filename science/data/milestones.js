/* ==========================================================
   SCIENCE MASTER — CHAPTER MILESTONES (10 STARS PER CHAPTER)
   Monotonic Progressive Milestone Evaluators (INV-6)
   ========================================================== */

const CHAPTER_MILESTONES = {
  'ch3_skeletal': [
    {
      id: 'learn_part1',
      title: 'Framework & Biological Armor',
      desc: 'Solved concept checkpoint questions on the 206-bone framework, bone marrow blood factory, and skull helmet protection',
      hint: 'Answer concept check questions on cards 1 & 2 in Learn mode',
      check: (d) => (d.learnCards[0] && d.learnCards[1])
    },
    {
      id: 'learn_part2',
      title: 'Joints & Antagonistic Muscles',
      desc: 'Solved concept checkpoint questions on 4 movable joints, tendons vs ligaments (3 Ls / 3 Ts), and antagonistic muscle pairs',
      hint: 'Answer concept check questions on cards 3 & 4 in Learn mode',
      check: (d) => (d.learnCards[2] && (d.learnCards[3] || d.learnCards[4]))
    },
    {
      id: 'lab_investigation',
      title: 'Skeletal Biomechanics & Muscle Lab',
      desc: 'Tested interactive joint types (ball-socket, hinge, pivot, gliding) and biceps-triceps antagonistic arm flexion',
      hint: 'Operate the interactive lab in Learn mode',
      check: (d) => d.labInteracted
    },
    {
      id: 'exam_traps',
      title: 'Skeletal & Muscular Exam Traps',
      desc: 'Diagnosed tricky CBSE student misconceptions in "Be the Teacher" (jaw mobility, tendons vs ligaments, muscles only pull)',
      hint: 'Diagnose at least 4 traps in Spot Traps mode',
      check: (d) => d.trapsCount >= 4
    },
    {
      id: 'practice_mcq',
      title: 'Skeletal Anatomy & Bone Factory MCQs',
      desc: 'Solved foundational multiple-choice deduction questions on bones, joints, and marrow',
      hint: 'Solve at least 4 MCQs correctly in Practice mode',
      check: (d) => (d.categorySolved.mcq || 0) >= 4
    },
    {
      id: 'practice_whoami',
      title: 'Who Am I? Anatomical Riddles',
      desc: 'Identified bones, joints, and muscles from functional and structural clues',
      hint: 'Solve at least 3 Who Am I riddles in Practice mode',
      check: (d) => (d.categorySolved.whoami || 0) >= 3
    },
    {
      id: 'practice_compare',
      title: 'Compare & Contrast Anatomies',
      desc: 'Differentiated tendons vs ligaments, voluntary vs involuntary muscles, and hinge vs ball-and-socket joints',
      hint: 'Solve at least 3 Compare & Contrast questions in Practice mode',
      check: (d) => (d.categorySolved.compare || 0) >= 3
    },
    {
      id: 'practice_scenarios',
      title: 'Clinical & Biomechanical Scenarios',
      desc: 'Solved real-world application scenarios (sports sprains, muscle cramps, cricket pads, posture)',
      hint: 'Solve at least 3 scenario questions in Practice mode',
      check: (d) => (d.categorySolved.scenario || 0) >= 3
    },
    {
      id: 'practice_worksheet',
      title: 'School Worksheet Master',
      desc: 'Solved comprehensive questions from School Worksheets I, II, and III across all categories',
      hint: 'Solve at least 15 total practice questions',
      check: (d) => d.totalSolved >= 15
    },
    {
      id: 'sprint_mastery',
      title: 'Mental Speed & Exam Readiness',
      desc: 'Achieved ≥40 points in the 60s Sprint and ≥80% practice accuracy',
      hint: 'Score 40+ points in 60-Second Science Sprint and maintain ≥80% accuracy',
      check: (d) => d.sprintHighScore >= 40 && d.accuracy >= 80
    }
  ],

  'ch4_nervous': [
    {
      id: 'learn_part1',
      title: 'Central Command & Brain Regions',
      desc: 'Solved concept checkpoint questions on the biological supercomputer, Cerebrum, Cerebellum, and Medulla',
      hint: 'Answer concept check questions on cards 1 & 2 in Learn mode',
      check: (d) => (d.learnCards[0] && d.learnCards[1])
    },
    {
      id: 'learn_part2',
      title: 'Reflex Arc & 5 Precision Senses',
      desc: 'Solved concept checkpoint questions on lightning-fast spinal reflex arcs, sensory vs motor nerves, and sense organs',
      hint: 'Answer concept check questions on cards 3 & 4 in Learn mode',
      check: (d) => (d.learnCards[2] && (d.learnCards[3] || d.learnCards[4]))
    },
    {
      id: 'lab_investigation',
      title: 'Brain Blueprint & Reflex Arc Lab',
      desc: 'Tested cerebrum, cerebellum, and medulla roles and triggered the lightning-fast spinal emergency reflex loop',
      hint: 'Operate the interactive lab in Learn mode',
      check: (d) => d.labInteracted
    },
    {
      id: 'exam_traps',
      title: 'Nervous System Exam Traps',
      desc: 'Diagnosed tricky CBSE student exam traps in "Be the Teacher" (reflex vs brain thinking, contralateral control, ear balance)',
      hint: 'Diagnose at least 4 traps in Spot Traps mode',
      check: (d) => d.trapsCount >= 4
    },
    {
      id: 'practice_mcq',
      title: 'Brain, Nerves & Sense Organ MCQs',
      desc: 'Solved foundational multiple-choice deduction questions',
      hint: 'Solve at least 4 MCQs correctly in Practice mode',
      check: (d) => (d.categorySolved.mcq || 0) >= 4
    },
    {
      id: 'practice_whoami',
      title: 'Who Am I? Neural Riddles',
      desc: 'Identified brain parts, sensory receptors, and nerves from functional clues',
      hint: 'Solve at least 2 Who Am I riddles in Practice mode',
      check: (d) => (d.categorySolved.whoami || 0) >= 2
    },
    {
      id: 'practice_compare',
      title: 'Neural & Sensory Comparisons',
      desc: 'Compared sensory vs motor nerves, cerebrum vs cerebellum, and voluntary vs involuntary reflex actions',
      hint: 'Solve Compare & Contrast questions in Practice mode',
      check: (d) => (d.categorySolved.compare || 0) >= 1
    },
    {
      id: 'practice_scenarios',
      title: 'Clinical & Reflex Scenarios',
      desc: 'Solved real-world application scenarios (stove reflex, tightrope balance, eye blink)',
      hint: 'Solve at least 2 scenario questions in Practice mode',
      check: (d) => (d.categorySolved.scenario || 0) >= 2
    },
    {
      id: 'practice_breadth',
      title: 'Nervous System Comprehensive Practice',
      desc: 'Solved at least 12 questions across all practice categories',
      hint: 'Solve at least 12 questions correctly in Practice mode',
      check: (d) => d.totalSolved >= 12
    },
    {
      id: 'sprint_mastery',
      title: 'Mental Speed & Exam Readiness',
      desc: 'Achieved ≥40 points in the 60s Sprint and ≥80% practice accuracy',
      hint: 'Score 40+ points in 60-Second Science Sprint and maintain ≥80% accuracy',
      check: (d) => d.sprintHighScore >= 40 && d.accuracy >= 80
    }
  ],

  'ch7_air_water': [
    {
      id: 'learn_part1',
      title: 'Atmosphere & Air Properties',
      desc: 'Solved concept checkpoint questions on Atmosphere layers and Air properties (mass & space)',
      hint: 'Answer concept check questions on cards 1 & 2 in Learn mode',
      check: (d) => (d.learnCards[0] && d.learnCards[1])
    },
    {
      id: 'learn_part2',
      title: 'Combustion & Water Purification',
      desc: 'Solved concept checkpoint questions on Combustion and Soluble/Insoluble purification methods',
      hint: 'Answer concept check questions on cards 3 & 4 in Learn mode',
      check: (d) => (d.learnCards[2] && (d.learnCards[3] || d.learnCards[4]))
    },
    {
      id: 'lab_investigation',
      title: "Tina's Balloon Balance Lab",
      desc: 'Tested the interactive balance scale proving air has measurable mass',
      hint: 'Operate the interactive lab in Learn mode',
      check: (d) => d.labInteracted
    },
    {
      id: 'exam_traps',
      title: 'Air & Water Exam Traps',
      desc: 'Diagnosed all 4 tricky CBSE student exam slips in "Be the Teacher"',
      hint: 'Diagnose all 4 traps in Spot Traps mode',
      check: (d) => d.trapsCount >= 4
    },
    {
      id: 'practice_mcq',
      title: 'Atmosphere & Purification MCQs',
      desc: 'Solved foundational multiple-choice deduction questions',
      hint: 'Solve at least 4 MCQs correctly in Practice mode',
      check: (d) => (d.categorySolved.mcq || 0) >= 4
    },
    {
      id: 'practice_scenarios',
      title: 'Case Studies & Pure Water Paradox',
      desc: 'Solved scenarios (Meena’s tilted bottle, candle jar, distilled water)',
      hint: 'Solve at least 3 case study/scenario questions in Practice mode',
      check: (d) => (d.categorySolved.scenario || 0) >= 3
    },
    {
      id: 'sprint_mastery',
      title: 'Mental Speed & Exam Readiness',
      desc: 'Achieved ≥40 points in the 60s Sprint and ≥80% practice accuracy',
      hint: 'Score 40+ points in 60-Second Science Sprint',
      check: (d) => d.sprintHighScore >= 40 && d.accuracy >= 80
    }
  ],

  'ch13_matter': [
    {
      id: 'learn_part1',
      title: 'Molecular Kinetic Theory',
      desc: 'Solved concept checkpoint questions on Molecular motion and Gas compressibility (CNG/LPG)',
      hint: 'Answer concept check questions on cards 1 & 2 in Learn mode',
      check: (d) => (d.learnCards[0] && d.learnCards[1])
    },
    {
      id: 'learn_part2',
      title: 'Thermal Diffusion & Changes of State',
      desc: 'Solved concept checkpoint questions on Thermal diffusion, Sublimation, and Physical vs Chemical changes',
      hint: 'Answer concept check questions on cards 3, 4 & 5 in Learn mode',
      check: (d) => (d.learnCards[2] && (d.learnCards[3] || d.learnCards[4]))
    },
    {
      id: 'lab_investigation',
      title: 'Molecular Agitator Lab',
      desc: 'Operated the interactive solid, liquid, and gas particle agitator simulation',
      hint: 'Operate the interactive lab in Learn mode',
      check: (d) => d.labInteracted
    },
    {
      id: 'exam_traps',
      title: 'Matter & Reaction Exam Traps',
      desc: 'Diagnosed all 4 tricky CBSE student exam slips in "Be the Teacher"',
      hint: 'Diagnose all 4 traps in Spot Traps mode',
      check: (d) => d.trapsCount >= 4
    },
    {
      id: 'practice_mcq',
      title: 'Kinetic States & Transitions MCQs',
      desc: 'Solved foundational multiple-choice deduction questions',
      hint: 'Solve at least 4 MCQs correctly in Practice mode',
      check: (d) => (d.categorySolved.mcq || 0) >= 4
    },
    {
      id: 'practice_compare',
      title: 'Physical vs Chemical Comparisons',
      desc: 'Correctly distinguished reversible state changes from irreversible chemical changes',
      hint: 'Solve at least 3 Compare & Contrast questions in Practice mode',
      check: (d) => (d.categorySolved.compare || 0) >= 3
    },
    {
      id: 'practice_scenarios',
      title: 'Real-World Case Studies & Rusting',
      desc: 'Solved application scenarios (Anshul in Kerala vs Charu in Rajasthan, mothballs)',
      hint: 'Solve at least 3 scenario questions in Practice mode',
      check: (d) => (d.categorySolved.scenario || 0) >= 3
    },
    {
      id: 'sprint_mastery',
      title: 'Mental Speed & Exam Readiness',
      desc: 'Achieved ≥40 points in the 60s Sprint and ≥80% practice accuracy',
      hint: 'Score 40+ points in 60-Second Science Sprint',
      check: (d) => d.sprintHighScore >= 40 && d.accuracy >= 80
    }
  ],

  'ch2_animals': [
    {
      id: 'learn_part1',
      title: 'Habitats & Protective Coverings',
      desc: 'Solved concept checkpoint questions on Animal adaptations, Habitats, and Protective body coverings',
      hint: 'Answer concept check questions on cards 1 & 2 in Learn mode',
      check: (d) => (d.learnCards[0] && d.learnCards[1])
    },
    {
      id: 'learn_part2',
      title: 'Respiration, Limbs & Food Chains',
      desc: 'Solved concept checkpoint questions on Respiration organs, Flippers/talons, and Carnivore/herbivore dentition',
      hint: 'Answer concept check questions on cards 3 & 4 in Learn mode',
      check: (d) => (d.learnCards[2] && (d.learnCards[3] || d.learnCards[4]))
    },
    {
      id: 'lab_investigation',
      title: 'Animal Adaptation Blueprint Lab',
      desc: 'Explored interactive animal adaptation blueprints (eagle, penguin, whale, snake)',
      hint: 'Operate the interactive lab in Learn mode',
      check: (d) => d.labInteracted
    },
    {
      id: 'exam_traps',
      title: 'Animal Adaptation Exam Traps',
      desc: 'Diagnosed all 4 tricky CBSE student exam slips in "Be the Teacher"',
      hint: 'Diagnose all 4 traps in Spot Traps mode',
      check: (d) => d.trapsCount >= 4
    },
    {
      id: 'practice_mcq',
      title: 'Habitats & Breathing MCQs',
      desc: 'Solved foundational multiple-choice deduction questions',
      hint: 'Solve at least 4 MCQs correctly in Practice mode',
      check: (d) => (d.categorySolved.mcq || 0) >= 4
    },
    {
      id: 'practice_whoami',
      title: 'Who Am I? Animal Riddles',
      desc: 'Identified animals from respiratory, locomotion, and camouflage clues',
      hint: 'Solve at least 3 Who Am I riddles in Practice mode',
      check: (d) => (d.categorySolved.whoami || 0) >= 3
    },
    {
      id: 'practice_compare',
      title: 'Compare & Contrast Anatomies',
      desc: 'Compared blowholes vs gills, herbivore vs carnivore skulls',
      hint: 'Solve at least 3 Compare & Contrast questions in Practice mode',
      check: (d) => (d.categorySolved.compare || 0) >= 3
    },
    {
      id: 'practice_scenarios',
      title: 'Camouflage & Migration Case Studies',
      desc: 'Solved scenarios (Gerry & Freddy camouflage, Arctic tern long-distance migration)',
      hint: 'Solve at least 3 scenario questions in Practice mode',
      check: (d) => (d.categorySolved.scenario || 0) >= 3
    },
    {
      id: 'sprint_mastery',
      title: 'Mental Speed & Exam Readiness',
      desc: 'Achieved ≥40 points in the 60s Sprint and ≥85% practice accuracy',
      hint: 'Score 40+ points in 60-Second Science Sprint',
      check: (d) => d.sprintHighScore >= 40 && d.accuracy >= 85
    }
  ],

  'ch5_health': [
    {
      id: 'learn_part1',
      title: 'Nutrients & Energy Metabolism',
      desc: 'Solved concept checkpoint questions on Nutrient architecture, Energy fuel, and Fasting glycogen/fat reserves',
      hint: 'Answer concept check questions on cards 1 & 2 in Learn mode',
      check: (d) => (d.learnCards[0] && d.learnCards[1])
    },
    {
      id: 'learn_part2',
      title: 'Deficiency Diseases & Prevention',
      desc: 'Solved concept checkpoint questions on Deficiency diseases (Rickets/Scurvy) and Immune defense & Vectors',
      hint: 'Answer concept check questions on cards 3 & 4 in Learn mode',
      check: (d) => (d.learnCards[3] && d.learnCards[4])
    },
    {
      id: 'lab_investigation',
      title: 'Nutrient Inspector Lab',
      desc: 'Explored the interactive nutrient role & deficiency visualizer',
      hint: 'Operate the interactive lab in Learn mode',
      check: (d) => d.labInteracted
    },
    {
      id: 'exam_traps',
      title: 'Nutrition & Disease Exam Traps',
      desc: 'Diagnosed all 4 tricky CBSE student exam slips in "Be the Teacher"',
      hint: 'Diagnose all 4 traps in Spot Traps mode',
      check: (d) => d.trapsCount >= 4
    },
    {
      id: 'practice_mcq',
      title: 'Dietary Nutrient MCQs',
      desc: 'Solved foundational multiple-choice deduction questions',
      hint: 'Solve at least 4 MCQs correctly in Practice mode',
      check: (d) => (d.categorySolved.mcq || 0) >= 4
    },
    {
      id: 'practice_whoami',
      title: 'Who Am I? Deficiency Riddles',
      desc: 'Identified nutrients and diseases from symptoms and food sources',
      hint: 'Solve at least 3 Who Am I riddles in Practice mode',
      check: (d) => (d.categorySolved.whoami || 0) >= 3
    },
    {
      id: 'practice_compare',
      title: 'Disease Classification Comparisons',
      desc: 'Compared Communicable vs Non-communicable diseases and Vectors vs Pathogens',
      hint: 'Solve at least 3 Compare & Contrast questions in Practice mode',
      check: (d) => (d.categorySolved.compare || 0) >= 3
    },
    {
      id: 'practice_oddone',
      title: 'Odd One Out with Justifications',
      desc: 'Classified dietary sources and disease types with justifications',
      hint: 'Solve at least 3 Odd One Out questions in Practice mode',
      check: (d) => (d.categorySolved.oddone || 0) >= 3
    },
    {
      id: 'practice_scenarios',
      title: 'Dietary Case Studies & Fasting',
      desc: 'Solved clinical scenarios (Shama’s fasting metabolism, Anu’s breakfast, Danny’s rickets)',
      hint: 'Solve at least 3 scenario questions in Practice mode',
      check: (d) => (d.categorySolved.scenario || 0) >= 3
    },
    {
      id: 'sprint_mastery',
      title: 'Mental Speed & Exam Readiness',
      desc: 'Achieved ≥40 points in the 60s Sprint and ≥85% practice accuracy',
      hint: 'Score 40+ points in 60-Second Science Sprint',
      check: (d) => d.sprintHighScore >= 40 && d.accuracy >= 85
    }
  ],

  'ch11_rocks': [
    {
      id: 'learn_part1',
      title: 'Rock Genesis & Sedimentary Layers',
      desc: 'Solved concept checkpoint questions on Igneous genesis (magma/lava, pumice) and Sedimentary compaction (limestone, fossils)',
      hint: 'Answer concept check questions on cards 1 & 2 in Learn mode',
      check: (d) => (d.learnCards[0] && d.learnCards[1])
    },
    {
      id: 'learn_part2',
      title: 'Metamorphic Magic, Cycle & Minerals',
      desc: 'Solved concept checkpoint questions on Metamorphic transformation, Rock cycle dynamics, and Mineral/Fossil fuel genesis',
      hint: 'Answer concept check questions on cards 3, 4 & 5 in Learn mode',
      check: (d) => (d.learnCards[2] && (d.learnCards[3] || d.learnCards[4]))
    },
    {
      id: 'lab_investigation',
      title: 'Rock Detective Lab Investigation',
      desc: 'Operated the interactive Rock & Mineral Detective Lab (pumice floatability, granite crystals, metamorphosis chamber, coal/petroleum)',
      hint: 'Operate the interactive lab in Learn mode',
      check: (d) => d.labInteracted
    },
    {
      id: 'exam_traps',
      title: 'Rock & Mineral Exam Traps',
      desc: 'Diagnosed all 4 tricky CBSE student exam slips in "Be the Teacher" (Rohan, Priya, Arjun, Sneha)',
      hint: 'Diagnose all 4 traps in Spot Traps mode',
      check: (d) => d.trapsCount >= 4
    },
    {
      id: 'practice_mcq',
      title: 'Geological MCQs & Deductions',
      desc: 'Solved foundational multiple-choice deduction questions',
      hint: 'Solve at least 4 MCQs correctly in Practice mode',
      check: (d) => (d.categorySolved.mcq || 0) >= 4
    },
    {
      id: 'practice_whoami',
      title: 'Who Am I? Rock & Mineral Riddles',
      desc: 'Identified rocks and ores from geological clues (floating pumice, lunar basalt, marble, gneiss)',
      hint: 'Solve at least 3 Who Am I riddles in Practice mode',
      check: (d) => (d.categorySolved.whoami || 0) >= 3
    },
    {
      id: 'practice_compare',
      title: 'Compare & Contrast Formations',
      desc: 'Compared Shale vs Slate, Peat vs Anthracite coal, and Metallic Ores to Metals',
      hint: 'Solve at least 3 Compare & Contrast questions in Practice mode',
      check: (d) => (d.categorySolved.compare || 0) >= 3
    },
    {
      id: 'practice_oddone',
      title: 'Odd One Out with Justifications',
      desc: 'Classified rock families, mineral ores, and energy renewability with justifications',
      hint: 'Solve at least 3 Odd One Out questions in Practice mode',
      check: (d) => (d.categorySolved.oddone || 0) >= 3
    },
    {
      id: 'practice_scenarios',
      title: 'Real-World Case Studies',
      desc: 'Solved application scenarios (volcanic island exploration, scratch test, eco-house, oil map)',
      hint: 'Solve at least 3 scenario questions in Practice mode',
      check: (d) => (d.categorySolved.scenario || 0) >= 3
    },
    {
      id: 'sprint_mastery',
      title: 'Mental Speed & Exam Readiness',
      desc: 'Achieved ≥40 points in the 60s Sprint and ≥85% practice accuracy',
      hint: 'Score 40+ points in 60-Second Science Sprint',
      check: (d) => d.sprintHighScore >= 40 && d.accuracy >= 85
    }
  ]
};
