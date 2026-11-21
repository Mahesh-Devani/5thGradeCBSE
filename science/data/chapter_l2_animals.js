/* ==========================================================
   SCIENCE MASTER — L-2 Animals in Their Surroundings
   CBSE Class 5 Curriculum Data Store
   Zero External Dependencies | Pure Vanilla ES6
   ========================================================== */

const CHAPTER_L2_ANIMALS = {
    id: 'ch2_animals',
    number: 'L-2',
    targetStars: 9,
    title: 'Animals in Their Surroundings',
    sub: 'Habitats, Adaptations, Breathing Organs & Locomotion',
    themeColor: '#10b981',
    icon: '🐾',
    summary: 'Master how animals adapt to survive: body coverings, breathing organs, feeding dentition, limbs, camouflage, and seasonal migration.',
    
    // Pillar 1: Concept Cards & Metaphors
    learnCards: [
      {
        badge: 'Survival Engineering',
        title: '🕵️ The Adaptation Detective',
        metaphor: 'Animals do not wear winter coats or carry scuba tanks — their bodies are living blueprints built to survive their habitat!',
        points: [
          '<strong>Habitat:</strong> The natural place where an organism lives, feeds, and reproduces.',
          '<strong>Structural Adaptation:</strong> Physical body features like eagle talons, camel humps, or fish scales.',
          '<strong>Behavioural Adaptation:</strong> Actions animals take to survive, such as migration in winter or nocturnal hunting.'
        ],
        thinkPrompt: 'Ask yourself: If a duck was born with sharp eagle claws instead of webbed feet, what would happen when it entered the pond?',
        checkQuestions: [
                  {
                            "subtopic": "Structural Adaptations",
                            "question": "If a duck had sharp eagle talons instead of webbed feet, what would happen in water?",
                            "options": [
                                      "It would swim twice as fast by grabbing the water.",
                                      "It could not paddle efficiently and would struggle to swim forward.",
                                      "Its feathers would immediately absorb water and become heavy."
                            ],
                            "correct": 1,
                            "explanation": "Webbed feet act like broad oars to push water backwards for forward thrust. Talons are built for grasping prey, not swimming!"
                  },
                  {
                            "subtopic": "Behavioural Adaptation & Migration",
                            "question": "Why does the Arctic Tern fly over 70,000 km every year between the Arctic and Antarctic?",
                            "options": [
                                      "To escape freezing polar winters and find abundant food in warmer summer daylight (Migration).",
                                      "Because birds get dizzy if they stay in one place for more than a month.",
                                      "To escape ocean predators by staying in high altitude clouds permanently."
                            ],
                            "correct": 0,
                            "explanation": "Migration is a behavioural adaptation! Animals travel thousands of miles to escape severe winters, secure food, and find safe nesting grounds."
                  }
        ]
      },
      {
        badge: 'Breathing Organs',
        title: '🤿 Gills, Spiracles & Blowholes',
        metaphor: 'Every creature needs oxygen, but how they extract it depends on their environment!',
        points: [
          '<strong>Gills (Fish):</strong> Absorb dissolved oxygen from water. Water enters mouth and flows over blood-rich gills.',
          '<strong>Spiracles (Insects):</strong> Tiny air holes along the sides of Gerry the grasshopper’s body connecting to breathing tubes.',
          '<strong>Moist Skin & Lungs (Amphibians):</strong> Frogs breathe through smooth moist skin underwater, and through lungs on land!',
          '<strong>Lungs & Blowholes (Marine Mammals):</strong> Whales and dolphins are NOT fish! They have blowholes on top of their head to inhale atmospheric air.'
        ],
        thinkPrompt: 'Why can a whale drown if it stays submerged too long, while a goldfish can stay underwater forever?',
        checkQuestions: [
                  {
                            "subtopic": "Gills vs Blowholes & Lungs",
                            "question": "Why does a whale or dolphin need to come to the ocean surface to breathe, while a goldfish stays underwater?",
                            "options": [
                                      "Whales breathe atmospheric air using lungs and blowholes, whereas fish extract dissolved oxygen using gills.",
                                      "Whales need sunlight to keep their blowholes warm.",
                                      "Fish do not need any oxygen at all to survive in water."
                            ],
                            "correct": 0,
                            "explanation": "Whales and dolphins are mammals with lungs! They cannot extract dissolved oxygen from water like fish do with gills, so they must surface for air."
                  },
                  {
                            "subtopic": "Spiracles in Insects & Amphibian Skin",
                            "question": "If you cover a grasshopper's head in oil, it continues breathing; but if you cover its abdomen sides, it suffocates! Why?",
                            "options": [
                                      "Grasshoppers breathe through tiny side holes called spiracles along their abdomen, not through a mouth or nose.",
                                      "Grasshoppers store all their air inside their back legs.",
                                      "The oil absorbs oxygen directly from the grasshopper's antennae."
                            ],
                            "correct": 0,
                            "explanation": "Insects do not have lungs or nostrils. They breathe through tiny openings called spiracles located along the sides of their thorax and abdomen!"
                  }
        ]
      },
      {
        badge: 'Body Armor & Coverings',
        title: '🛡️ Scales, Shells, Cuticles & Fur',
        metaphor: 'From waterproof fish scales to insect armor, coverings protect against predators and harsh climates.',
        points: [
          '<strong>Cuticle (Insects):</strong> Hard outer exoskeleton providing toughness and preventing water loss.',
          '<strong>Shells (Turtles, Crabs, Armadillos):</strong> Hard calcium-rich dome for defense against predators.',
          '<strong>Overlapping Scales (Fish & Reptiles):</strong> Waterproof shield in fish; grip-assisting belly scales in snakes.',
          '<strong>Thick Fur & Blubber (Polar Bears):</strong> Double-layer thermal insulation for freezing Arctic cold.'
        ],
        thinkPrompt: 'Why are fish scales overlapping backwards like roof tiles instead of pointing forward?',
        checkQuestions: [
                  {
                            "subtopic": "Overlapping Scales in Fish & Reptiles",
                            "question": "Why do fish scales overlap backwards (head to tail) like tiles on a roof?",
                            "options": [
                                      "To stop sunlight from heating up the fish's internal organs.",
                                      "To streamline water flow smoothly, reduce friction, and protect the skin.",
                                      "To help the fish bite through predator shells."
                            ],
                            "correct": 1,
                            "explanation": "Backwards-overlapping scales allow water to slide effortlessly over the body (reducing drag) while forming a flexible, waterproof protective shield!"
                  },
                  {
                            "subtopic": "Cuticles, Shells & Thermal Insulation",
                            "question": "Why do land insects have a tough waxy outer layer (cuticle), while polar bears have thick fur and blubber?",
                            "options": [
                                      "Both are adaptations: insect cuticles prevent water loss in dry air, while fur and blubber trap body heat in freezing cold.",
                                      "Cuticles produce honey for the insect colony.",
                                      "Fur absorbs ice to keep polar bears cool."
                            ],
                            "correct": 0,
                            "explanation": "Body coverings match the habitat! Waxy cuticles stop tiny insects from drying out in air, while dense fur and fat (blubber) insulate polar bears against freezing arctic winds."
                  }
        ]
      },
      {
        badge: 'Movement & Feeding',
        title: '🦅 Talons, Flippers & Dentition',
        metaphor: 'A predator’s claws and teeth reveal its diet like a detective inspecting tools in a workshop!',
        points: [
          '<strong>Talons:</strong> Sharp, curved claws in raptors (eagles, hawks) engineered to grip and tear prey.',
          '<strong>Flippers vs Wings:</strong> Wings propel birds through air; flippers paddle penguins and seals through water.',
          '<strong>Nares:</strong> Nostril openings at the base of a bird’s beak for breathing air (NOT for locomotion!).',
          '<strong>Carnivore vs Herbivore Skulls:</strong> Carnivores possess dagger-like canines and sharp shearing molars; herbivores have broad, flat grinding molars.'
        ],
        thinkPrompt: 'If you discover an unknown animal skull in the jungle with sharp dagger canines, what was on its dinner menu?',
        checkQuestions: [
                  {
                            "subtopic": "Carnivore vs Herbivore Dentition",
                            "question": "You discover an unknown animal skull with large, pointed dagger canines and shear-like molars. What was on its dinner menu?",
                            "options": [
                                      "Grass, leaves, and tree bark (Herbivore).",
                                      "Flesh and meat of other animals (Carnivore).",
                                      "Only soft fruits, grains, and flower nectar."
                            ],
                            "correct": 1,
                            "explanation": "Sharp dagger canines are built to pierce and tear flesh, while shearing molars cut meat like scissors \u2014 definitive hallmarks of a carnivore!"
                  },
                  {
                            "subtopic": "Herbivore Molars & Rodent Chisel Teeth",
                            "question": "Why do cows and horses have wide, flat molar teeth and no sharp canine teeth?",
                            "options": [
                                      "They only swallow food whole without chewing.",
                                      "To thoroughly crush, grind, and pulp tough fibrous grass and plant leaves like millstones.",
                                      "To help them suck water through their teeth like straws."
                            ],
                            "correct": 1,
                            "explanation": "Herbivores eat tough plant cellulose! They need wide, ridged, flat molars to grind grass down for digestion, with no need for tearing canine teeth."
                  }
        ]
      }
    ],

    // Pillar 3: Spot the Exam Trap
    examTraps: [
      {
        id: 'trap_l2_whale',
        student: 'Rohan',
        question: 'Explain how whales breathe underwater.',
        studentAnswer: 'Whales live in the ocean, so they are big fish and breathe dissolved oxygen through their gills underwater.',
        prompt: 'What is Rohan’s misconception about whales?',
        options: [
          'Whales absorb dissolved oxygen through their skin while swimming, not through gills.',
          'Whales are mammals that breathe atmospheric air through lungs via a blowhole on top of their head.',
          'Whales swallow seawater and extract trapped oxygen inside stomach air pockets.'
        ],
        correctIndex: 1,
        teacherFeedback: 'Spot on! Whales and dolphins are warm-blooded mammals. They surface to inhale air through their blowhole directly into their lungs.'
      },
      {
        id: 'trap_l2_snake',
        student: 'Priya',
        question: 'How do limbless snakes crawl so swiftly across rocks and sand?',
        studentAnswer: 'Snakes have tiny microscopic legs tucked inside their belly that push them forward.',
        prompt: 'Diagnose Priya’s biological error:',
        options: [
          'Snakes are truly limbless; they move using strong body muscles, a flexible spine, and gripping belly scales.',
          'Snakes secrete a slippery slime layer beneath their belly that lets them slide frictionlessly.',
          'Snakes pull themselves forward only by hooking their fangs and lower jaw onto rocks.'
        ],
        correctIndex: 0,
        teacherFeedback: 'Outstanding deduction! Snakes have broad transverse scales on their underside that grip uneven surfaces while muscular body waves push them forward.'
      },
      {
        id: 'trap_l2_nares',
        student: 'Arjun',
        question: 'Choose the odd one out: Flippers, Sticky pads, Nares, Hooves.',
        studentAnswer: 'Hooves is the odd one out because only cows have hooves and the others are for birds and sea animals.',
        prompt: 'Why is Arjun’s classification scientifically flawed?',
        options: [
          'Flippers is the odd one out because it is aquatic, while hooves, nares, and sticky pads are terrestrial.',
          'Hooves is the odd one out because it is made of keratin while the others are made of bone.',
          'Nares is the odd one out: they are bird nostrils for breathing air, whereas flippers, sticky pads, and hooves are all locomotion organs!'
        ],
        correctIndex: 2,
        teacherFeedback: 'Brilliant teacher diagnosis! Nares are nasal openings on a bird’s beak for respiration. Flippers, sticky pads, and hooves all perform locomotion.'
      },
      {
        id: 'trap_l2_skull',
        student: 'Ananya',
        question: 'Identify the diet of an animal with large, sharp pointed canines and sharp slicing molars.',
        studentAnswer: 'This animal is a herbivore like a cow, because cows need sharp teeth to cut tall grass.',
        prompt: 'Where did Ananya slip up?',
        options: [
          'Cows have sharp canines to strip tough bark from trees, so sharp teeth still indicate a herbivore.',
          'Sharp canines and shearing molars are specialized for gripping and tearing meat → Carnivore! Herbivores have flat grinding molars.',
          'Sharp pointed teeth only indicate an omnivore, because carnivores swallow meat whole without chewing.'
        ],
        correctIndex: 1,
        teacherFeedback: 'Excellent! Herbivores have chisel incisors and flat, wide molars for grinding grass. Dagger canines are the unmistakable hallmark of a carnivore.'
      }
    ],

    // Pillar 4: Practice Questions & School Worksheets
    questions: [
      {
        id: 'l2_q1',
        category: 'mcq',
        source: 'Worksheet I • Q1',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'The large-scale seasonal movement of animals from one region to another to escape extreme cold and find food is called __________.',
        options: [
          'Locomotion',
          'Migration',
          'Hibernation',
          'Aestivation'
        ],
        correct: 1,
        explanation: 'Migration is the seasonal journey of animals (e.g. Arctic Tern, Siberian Crane) to favorable breeding and feeding grounds.',
        takeaway: 'Migration = Traveling journey | Hibernation = Winter sleep | Aestivation = Summer sleep'
      },
      {
        id: 'l2_q2',
        category: 'mcq',
        source: 'Worksheet I • Q2',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'In an ecosystem: <strong>P</strong> feeds on Q, R, and S. <strong>Q</strong> prepares its own food using sunlight. <strong>R</strong> feeds on Q. <strong>S</strong> only feeds on R. Which statement is most probably true?',
        options: [
          'P is an omnivore',
          'S is an omnivore',
          'Q is a herbivore',
          'R is a carnivore'
        ],
        correct: 0,
        explanation: 'Q is a producer (plant). R eats Q, so R is a herbivore. S eats R, so S is a carnivore. Since P feeds on plant (Q), herbivore (R), and carnivore (S), P consumes both plants and animals → Omnivore!',
        takeaway: 'Deductive reasoning: Producer (Q) → Herbivore (R) → Carnivore (S). P eats all three → Omnivore.'
      },
      {
        id: 'l2_q3_jaw',
        category: 'mcq',
        source: 'Worksheet I • Q3',
        wsNumber: 1,
        marks: '1 Mark',
        image: 'images/l2_jawbones.png',
        body: 'The following images show the jaw bones of animals A, B, C, and D.<br><strong>Which of the animals are likely to have a similar diet?</strong>',
        options: [
          'A and B',
          'C and D',
          'B and C',
          'A and D'
        ],
        correct: 2,
        explanation: 'Animals B and C both feature sharp, pointed dagger canines and scissor-like shearing molars specialized for seizing prey and slicing meat, indicating a carnivorous diet. (Animals A and D have broad flat molars for grinding plants).',
        takeaway: 'Dentition deduction: Prominent pointed canines = Carnivore meat-eater diet (B & C).'
      },
      {
        id: 'l2_q3',
        category: 'mcq',
        source: 'Worksheet I • Q4',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Which among the following organisms use a hard shell for physical protection against predators?',
        options: [
          'Turtle only',
          'Crab and snail only',
          'Armadillo only',
          'All of the above'
        ],
        correct: 3,
        explanation: 'Turtles, crabs, snails, and armadillos all rely on hard calcified or bony shells/plates as defensive body armor.',
        takeaway: 'Shells provide passive armor protection across reptiles, crustaceans, mollusks, and mammals.'
      },
      {
        id: 'l2_q4',
        category: 'mcq',
        source: 'Worksheet I • Q5',
        wsNumber: 1,
        marks: '1 Mark',
        image: 'images/l2_camouflage.png',
        body: 'Observe the insect in the image below blending seamlessly into the wooden twig.<br>Its elongated body shape, mottled brown texture, and motionless posture deceive predators into mistaking it for a dry branch. This survival adaptation is called __________.',
        options: [
          'Hibernation',
          'Camouflaging',
          'Migration',
          'Aestivation'
        ],
        correct: 1,
        explanation: 'Camouflage (cryptic mimicry) is a structural and behavioral adaptation where an organism’s coloration, shape, and pattern mimic its natural surroundings (such as a stick insect looking identical to a twig) to remain undetected by hungry predators.',
        takeaway: 'Camouflage = Body shape & color blending into surroundings to evade predators.'
      },
      {
        id: 'l2_q5',
        category: 'mcq',
        source: 'Worksheet I • Q6',
        wsNumber: 1,
        marks: '1 Mark',
        image: 'images/l2_bat.png',
        body: 'A bat is capable of sustained flight like a bird. What is the primary body covering of a bat?',
        options: [
          'Feathers',
          'Scales',
          'Fur / Hair',
          'Hard cuticle'
        ],
        correct: 2,
        explanation: 'Bats are mammals, not birds! Mammals possess hair or fur on their body, and nurse their young.',
        takeaway: 'Flight $\\ne$ bird! Bats fly with leathery skin membranes, but their body is covered in mammalian fur.'
      },
      {
        id: 'l2_q6',
        category: 'mcq',
        source: 'Worksheet I • Q7',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Both penguins and ostriches are flightless birds. How is an ostrich adapted differently from a penguin for movement?',
        options: [
          'An ostrich has flippers for swimming underwater',
          'An ostrich has long, muscular hind limbs for fast running',
          'An ostrich breathes through gills',
          'An ostrich body is covered in fish scales'
        ],
        correct: 1,
        explanation: 'Penguins evolved paddle-like flippers for agile ocean swimming; ostriches evolved powerful, elongated two-toed legs for running across grasslands up to 70 km/h!',
        takeaway: 'Locomotion fits habitat: Penguin = aquatic swimmer (flippers) | Ostrich = grassland sprinter (hind limbs).'
      },
      {
        id: 'l2_q7',
        category: 'whoami',
        source: 'Worksheet II • Part II',
        wsNumber: 2,
        marks: '1 Mark',
        body: '<strong>Who am I?</strong><br>I am a sharp, curved claw used by birds of prey like eagles and hawks to snatch and grip live prey.',
        options: [
          'Flipper',
          'Talon',
          'Webbed foot',
          'Proboscis'
        ],
        correct: 1,
        explanation: 'Talons are razor-sharp curved claws engineered to deliver lethal gripping force on moving prey.',
        takeaway: 'Raptor claw = Talon.'
      },
      {
        id: 'l2_q8',
        category: 'whoami',
        source: 'Worksheet II • Part II',
        wsNumber: 2,
        marks: '1 Mark',
        body: '<strong>Who am I?</strong><br>I am a long, straw-like tube in butterflies and mosquitoes used to siphon and suck liquid nectar or blood.',
        options: [
          'Antenna',
          'Proboscis',
          'Spiracle',
          'Cuticle'
        ],
        correct: 1,
        explanation: 'The proboscis is an elongated sucking mouthpart found in insects like butterflies, moths, and mosquitoes.',
        takeaway: 'Insect straw = Proboscis.'
      },
      {
        id: 'l2_q9',
        category: 'whoami',
        source: 'Worksheet II • Part II',
        wsNumber: 2,
        marks: '1 Mark',
        body: '<strong>Who am I?</strong><br>I form a tough, water-resistant outer exoskeleton covering an insect’s body to protect its delicate organs.',
        options: [
          'Blubber',
          'Cuticle',
          'Scale',
          'Feather'
        ],
        correct: 1,
        explanation: 'Insects are covered by a rigid, protective cuticle made of chitin that serves as both armor and an exoskeleton.',
        takeaway: 'Insect armor = Cuticle.'
      },
      {
        id: 'l2_q10',
        category: 'compare',
        source: 'Worksheet II • Part III',
        wsNumber: 2,
        marks: '2 Marks',
        body: '<strong>Compare & Contrast:</strong> Wings vs Flippers.<br>What is the fundamental difference between them?',
        options: [
          'Wings are for flying through air (e.g. Eagle); Flippers are paddle-shaped limbs for swimming in water (e.g. Penguin).',
          'Wings are breathing organs; Flippers are feeding organs.',
          'Wings are found in insects only; Flippers are found in reptiles only.'
        ],
        correct: 0,
        explanation: 'Both are modified forelimbs for locomotion: Wings are aerodynamically contoured for flight; Flippers are flattened oars for aquatic propulsion.',
        takeaway: 'Wings = aerial flight | Flippers = aquatic swimming.'
      },
      {
        id: 'l2_q11',
        category: 'compare',
        source: 'Worksheet II • Part III',
        wsNumber: 2,
        marks: '2 Marks',
        body: '<strong>Compare & Contrast:</strong> Spiracles vs Gills.<br>How do their respiratory mechanisms contrast?',
        options: [
          'Spiracles are tiny body pores used by insects to breathe air; Gills are feathery organs used by fish to extract dissolved oxygen from water.',
          'Spiracles extract oxygen from water; Gills breathe atmospheric air.',
          'Spiracles are used by birds; Gills are used by frogs.'
        ],
        correct: 0,
        explanation: 'Insects breathe atmospheric air through spiracles into tracheal tubes; fish take in water through their mouth and pass it over gills to extract dissolved oxygen.',
        takeaway: 'Spiracles = Insect air pores | Gills = Fish aquatic oxygen filters.'
      },
      {
        id: 'l2_q12',
        category: 'oddone',
        source: 'Worksheet II • Part IV',
        wsNumber: 2,
        marks: '1.5 Marks',
        body: '<strong>Choose the Odd One Out and Justify:</strong><br>Flippers, Sticky pads, Nares, Hooves.',
        options: [
          'Nares is the odd one out: It is a breathing organ (nostril on a bird’s beak), while flippers, sticky pads, and hooves are all locomotion organs.',
          'Sticky pads because only tree frogs have them.',
          'Flippers because they are wet.'
        ],
        correct: 0,
        explanation: 'Nares are the nostrils of birds used for respiration. Flippers (swimming), sticky pads (climbing), and hooves (running) are all organs of locomotion.',
        takeaway: 'Always group by biological function: Respiration vs Locomotion!'
      },
      {
        id: 'l2_q13',
        category: 'scenario',
        source: 'Worksheet III • Scenario I (Tim’s Aquarium)',
        wsNumber: 3,
        marks: '3 Marks',
        body: 'Tim removed both a goldfish and a frog from his aquarium. His mother urged him to put the fish back immediately, warning that the fish would die while the frog would survive.<br><strong>Why will only the frog survive out of water?</strong>',
        options: [
          'Fish possess gills that collapse in air and can only extract oxygen dissolved in water; Frogs have lungs to breathe atmospheric air on land and moist skin in water.',
          'Fish need to drink aquarium water every 5 seconds to stay awake.',
          'Frogs have gills hidden in their back legs.'
        ],
        correct: 0,
        explanation: 'Fish gills require water support to keep gill filaments separated; in air, they stick together and cannot absorb oxygen. Amphibians (frogs) possess dual breathing systems: moist skin underwater and lungs on land!',
        takeaway: 'Dual breathers: Frogs breathe via skin in water & lungs on land. Fish gills collapse in dry air.'
      },
      {
        id: 'l2_q14',
        category: 'scenario',
        source: 'Worksheet III • Scenario II (Gerry & Freddy)',
        wsNumber: 3,
        marks: '2 Marks',
        body: 'Freddy the frog attempted to catch Gerry the grasshopper with his long sticky tongue, but Gerry leaped high into tall grass and vanished.<br><strong>What two adaptations saved Gerry’s life?</strong>',
        options: [
          'Powerful elongated hind legs for high jumping + green coloration for camouflage in tall grass',
          'Sharp talons for fighting + gills for breathing underground',
          'Large flippers for swimming + proboscis for stinging'
        ],
        correct: 0,
        explanation: 'Gerry used powerful hind legs for rapid vertical evasion and green pigmentation to blend (camouflage) with grass blades, confounding the predator.',
        takeaway: 'Locomotion evasion + Camouflage disguise = Twin survival adaptations.'
      },
      {
        id: 'l2_q15',
        category: 'scenario',
        source: 'Worksheet II • Part VI (Snake Adaptations)',
        wsNumber: 2,
        marks: '2 Marks',
        image: 'images/l2_snake.png',
        body: 'Observe the limbless reptile depicted in the illustration below.<br><strong>How does this limbless animal crawl with great speed across rocks and soil, and how is its jaw adapted to consume prey?</strong>',
        options: [
          'It uses broad belly scales to grip the ground, propelled by strong body muscles and a flexible spine with hundreds of vertebrae, and possesses loosely hinged elastic jaws to swallow prey larger than its head.',
          'It rolls itself into a wheel and chews prey with grinding molars.',
          'It moves using microscopic suction pads on its back and dissolves prey with acid.',
          'It glides using compressed air and feeds only on liquid dew.'
        ],
        correct: 0,
        explanation: 'Snakes are limbless reptiles. They move through lateral undulation powered by strong body muscles, a highly flexible vertebral column with hundreds of ribs, and broad transverse belly scales that provide friction against the ground. Moreover, their lower jaw bones are connected by elastic ligaments, allowing them to swallow whole prey much wider than their head!',
        takeaway: 'Snake adaptations: Muscular waves + gripping belly scales for limbless locomotion; elastic hinged jaws for swallowing large prey.'
      },
      {
        id: 'l2_q16',
        category: 'scenario',
        source: 'Worksheet III • Section III',
        wsNumber: 3,
        marks: '3 Marks',
        image: 'images/l2_skull_carnivore.png',
        body: 'Observe the diagram of the animal skull found in a jungle.<br><strong>Based on the prominent sharp, curved canines and shearing molars shown, how is this organism classified, and what is the primary role of these teeth?</strong>',
        options: [
          'Carnivore; the sharp dagger canines and shearing molars are engineered to grip, tear, and slice the flesh of live prey.',
          'Herbivore; the teeth are broad and flat to grind rough meadow grasses.',
          'Frugivore; the teeth are specialized exclusively to crack walnut shells.',
          'Filter feeder; the teeth strain plankton out of open water.'
        ],
        correct: 0,
        explanation: 'Large, curved, dagger-like canines and sharp shearing premolars are the definitive anatomical signature of a carnivore, designed to pierce, grip, and tear muscle tissue.',
        takeaway: 'Dagger canines + shearing molars = Carnivore dentition for seizing and tearing prey.'
      },
      {
        id: 'l2_q17',
        category: 'mcq',
        source: 'Worksheet I • Q8',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Most aquatic mammals such as whales and dolphins have a special opening on top of their head for breathing atmospheric air. This opening is called __________.',
        options: [
          'Spiracles',
          'Moist skin pores',
          'Blowholes',
          'Nares'
        ],
        correct: 2,
        explanation: 'Whales and dolphins are mammals with lungs (NOT gills). They surface to inhale air through a blowhole — a nostril-like opening on top of their head.',
        takeaway: 'Aquatic mammals breathe air through blowholes, NOT gills like fish!'
      },
      {
        id: 'l2_q18',
        category: 'mcq',
        source: 'Worksheet I • Q9',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Polar bears survive freezing Arctic temperatures thanks to thick double-layer fur and a special insulating layer of fat beneath their skin. These adaptations are examples of __________.',
        options: [
          'Physiological adaptations',
          'Behavioural adaptations',
          'Camouflage',
          'All of the above'
        ],
        correct: 0,
        explanation: 'Thick fur and blubber (subcutaneous fat) are physical body features that regulate internal body temperature — these are physiological (structural) adaptations, not behavioural choices.',
        takeaway: 'Fur + blubber = Physiological adaptation for thermal insulation in polar animals.'
      },
      {
        id: 'l2_q19',
        category: 'mcq',
        source: 'Worksheet I • Q10',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'The tiny openings along the body of an insect that connect to internal breathing tubes (trachea) and help it take in oxygen are called __________.',
        options: [
          'Antennae',
          'Spiracles',
          'Proboscis',
          'Cuticle'
        ],
        correct: 1,
        explanation: 'Spiracles are tiny air holes along the sides of an insect\'s abdomen. Air enters through spiracles into tracheal tubes that deliver oxygen directly to body tissues.',
        takeaway: 'Insects breathe through spiracles → trachea (NOT lungs or gills).'
      },
      {
        id: 'l2_q20',
        category: 'scenario',
        source: 'Worksheet II • Part I (Definitions)',
        wsNumber: 2,
        marks: '1.5 Marks',
        body: 'In carnivorous mammals like lions and tigers, there are specialized pairs of sharp cheek teeth adapted for shearing and slicing flesh, functioning like biological scissors.<br><strong>What is the scientific term for these specialized shearing teeth?</strong>',
        options: [
          'Carnassial teeth — sharp, blade-like premolars and molars in carnivores that shear meat like scissors.',
          'Incisors — the flat front teeth used for biting off food.',
          'Canines — the pointed fang teeth used for gripping prey.',
          'Molars — the broad flat teeth used for grinding grass.'
        ],
        correct: 0,
        explanation: 'Carnassial teeth are specialized blade-like premolars and first molars found in carnivorous mammals. They function as biological scissors to shear tendons and slice meat.',
        takeaway: 'Carnassial teeth = Scissor-like cheek teeth unique to carnivores for slicing flesh.'
      },
      {
        id: 'l2_q21',
        category: 'scenario',
        source: 'Worksheet III • Section IV (Adaptation Classification)',
        wsNumber: 3,
        marks: '3 Marks',
        body: 'Read each example and classify the adaptation type:<br>• Arctic Terns fly thousands of kilometers from pole to pole each year.<br>• Camels have long eyelashes and broad padded feet for desert survival.<br>• Frogs bury themselves in mud and enter deep sleep during winter.<br><strong>Classify each as structural, behavioural, or physiological adaptation.</strong>',
        options: [
          'Arctic Tern migration = Behavioural; Camel eyelashes & padded feet = Structural; Frog hibernation = Behavioural.',
          'All three are structural adaptations because they involve the body.',
          'Arctic Tern migration = Structural; Camel features = Behavioural; Frog hibernation = Physiological.',
          'All three are physiological adaptations because they help survival.'
        ],
        correct: 0,
        explanation: 'Migration and hibernation are choices animals make (behavioural). Camel\'s long eyelashes and padded feet are permanent physical body features (structural).',
        takeaway: 'Behavioural = actions/choices (migration, hibernation). Structural = physical body features (eyelashes, padded feet). Physiological = internal body processes (blubber insulation, venom production).'
      }
    ]
  };
