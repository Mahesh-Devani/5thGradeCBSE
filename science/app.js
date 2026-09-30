/**
 * ==========================================================================
 * SCIENCE MASTER (CLASS 5 CBSE / EVS CURRICULUM)
 * Pedagogy-First Thinking Classroom, Diagnostic Traps & School Worksheets
 * ==========================================================================
 */

// ==========================================================================
// 1. SOUND SYNTHESIZER (Pure Web Audio API — Zero External Audio Assets)
// ==========================================================================
const AudioController = (function() {
  let audioCtx = null;

  function getContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, type, duration, gainLevel = 0.12) {
    try {
      const ctx = getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  return {
    correct: () => {
      playTone(587.33, 'sine', 0.12, 0.15); // D5
      setTimeout(() => playTone(880.00, 'sine', 0.25, 0.15), 90); // A5
    },
    wrong: () => {
      playTone(220.00, 'sawtooth', 0.15, 0.1);
      setTimeout(() => playTone(185.00, 'sawtooth', 0.22, 0.1), 110);
    },
    fanfare: () => {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        setTimeout(() => playTone(freq, 'triangle', 0.28, 0.18), i * 110);
      });
    },
    click: () => {
      playTone(440, 'sine', 0.05, 0.04);
    }
  };
})();

// ==========================================================================
// 2. CELEBRATORY CONFETTI CANVAS
// ==========================================================================
const ConfettiController = (function() {
  const canvas = document.getElementById('confetti-canvas');
  let ctx = canvas ? canvas.getContext('2d') : null;
  let particles = [];
  let animId = null;

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function createParticles(count = 70) {
    const colors = ['#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6'];
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2 + (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }
  }

  function loop() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vRot;
      p.alpha -= 0.012;
      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive) {
      animId = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  return {
    launch: () => {
      resize();
      createParticles(85);
      cancelAnimationFrame(animId);
      loop();
    }
  };
})();

// ==========================================================================
// 3. CURRICULUM DATA: 4 CHAPTERS & 13 SCHOOL WORKSHEETS TRANSCRIBED
// ==========================================================================
const CHAPTERS_DATA = [
  // ------------------------------------------------------------------------
  // CHAPTER 1: L-2 ANIMALS IN THEIR SURROUNDINGS
  // ------------------------------------------------------------------------
  {
    id: 'ch2_animals',
    number: 'L-2',
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
        thinkPrompt: 'Ask yourself: If a duck was born with sharp eagle claws instead of webbed feet, what would happen when it entered the pond?'
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
        thinkPrompt: 'Why can a whale drown if it stays submerged too long, while a goldfish can stay underwater forever?'
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
        thinkPrompt: 'Why are fish scales overlapping backwards like roof tiles instead of pointing forward?'
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
        thinkPrompt: 'If you discover an unknown animal skull in the jungle with sharp dagger canines, what was on its dinner menu?'
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
  },

  // ------------------------------------------------------------------------
  // CHAPTER 2: L-3 THE SKELETAL AND MUSCULAR SYSTEM
  // ------------------------------------------------------------------------
{
  "id": "ch3_skeletal",
  "number": "L-3",
  "title": "The Skeletal and Muscular System",
  "sub": "Framework of 206 Bones, 4 Movable Joints, Tendons vs Ligaments & Antagonistic Muscles",
  "themeColor": "#f59e0b",
  "icon": "🦴",
  "summary": "Master the architectural framework of 206 bones, bone marrow blood cell factory, skull helmet, flexible vertebral column, ribcage shield, 4 movable joints, and antagonistic muscle pairs that only pull!",
  "learnCards": [
    {
      "badge": "Architectural Framework",
      "title": "🏗️ The Living Scaffolding & Blood Factory",
      "metaphor": "The skeleton is not a dried-up museum relic — it is a living, blood-rich architectural marvel that holds our body upright!",
      "points": [
        "<strong>Living Framework:</strong> An adult human skeleton contains <strong>206 bones</strong>. A newborn baby has over <strong>300 bones</strong>, but as the baby grows, many small bones fuse together!",
        "<strong>Vertebral Column (Spine):</strong> Made up of <strong>33 ring-like bones called vertebrae</strong>. It forms the main axis of our body, encloses and protects the delicate spinal cord, and allows bending and twisting.",
        "<strong>Bone Marrow Factory:</strong> The hollow interior of long bones (like the femur) contains a soft, spongy tissue called <strong>bone marrow</strong>, which manufactures millions of new red and white blood cells every day!",
        "<strong>Mineral Storage:</strong> Bones serve as the body’s primary storage bank for vital minerals like <strong>calcium and phosphorus</strong>."
      ],
      "thinkPrompt": "If an adult human had a single solid spine bone instead of 33 vertebrae, how would tying your shoelaces or sitting on a chair be affected?"
    },
    {
      "badge": "Biological Armor",
      "title": "🛡️ The Skull Helmet & The Ribcage Shield",
      "metaphor": "Your most precious organs are shielded inside biological helmets and cages engineered by nature!",
      "points": [
        "<strong>The Skull (22 Bones):</strong> 8 flat interlocking cranial bones fuse tightly like a motorcycle helmet to safeguard the brain. The remaining 14 bones form the facial framework.",
        "<strong>Only ONE Movable Skull Bone:</strong> Out of all 22 skull bones, <strong>only the lower jaw (mandible) is movable</strong>! This lets us chew, talk, and yawn. The upper jaw is fused immovable.",
        "<strong>The Ribcage (12 Pairs / 25 Bones):</strong> Made of 12 pairs of bow-shaped ribs plus the central breastbone (<strong>sternum</strong>). It forms a protective cage around the heart and lungs.",
        "<strong>Floating Ribs:</strong> The first 10 pairs attach to the sternum in front, but the <strong>last 2 pairs (11th and 12th)</strong> attach only to the backbone behind. They are called <strong>floating ribs</strong>, giving the diaphragm and lungs freedom to expand during deep breathing!"
      ],
      "thinkPrompt": "Try to talk or chew while keeping your lower jaw completely still. Why is it biologically impossible to move only your upper jaw?"
    },
    {
      "badge": "Mechanical Bearings",
      "title": "🔗 Movable Joints — Nature's Mechanical Bearings",
      "metaphor": "Wherever two bones meet, joints determine the directions and freedom of movement like mechanical hinges and swivels!",
      "points": [
        "<strong>Ball and Socket Joint:</strong> The rounded ball-head of one bone fits inside the cup-like socket of another. Allows full <strong>360° rotary motion in all directions</strong> (like a joystick!). Present in <strong>shoulders</strong> (humerus in pectoral girdle) and <strong>hips</strong> (femur in pelvic girdle).",
        "<strong>Hinge Joint:</strong> Works exactly like a <strong>door hinge</strong>, allowing movement back and forth in <strong>ONE direction only</strong>. Found in <strong>elbows, knees, fingers, and toes</strong>.",
        "<strong>Pivot Joint:</strong> One bone rotates around a ring-like peg of another bone. Found between the <strong>skull and the first vertebra (spine)</strong>. Allows our head to turn sideways, nod up, and tilt down!",
        "<strong>Gliding Joint (Planar Joint):</strong> Flat bone surfaces slide or glide smoothly past one another in multiple directions. Present in <strong>wrists, ankles</strong>, and between adjacent vertebrae in the backbone."
      ],
      "thinkPrompt": "Why did nature give us a hinge joint at the knee instead of a ball and socket joint? What would happen when you try to kick a football or run?"
    },
    {
      "badge": "Force & Locomotion",
      "title": "💪 Tendons, Ligaments & Antagonistic Muscle Pairs",
      "metaphor": "Muscles are biological pull-cords — they can ONLY PULL, they NEVER PUSH!",
      "points": [
        "<strong>The 3 Ls Rule:</strong> <strong>L</strong>igaments connect <strong>L</strong>ike to <strong>L</strong>ike → <strong>Bone to Bone</strong> at joints!",
        "<strong>The 3 Ts Rule:</strong> <strong>T</strong>endons connect <strong>T</strong>wo <strong>T</strong>ypes → <strong>Bone to Muscle</strong>!",
        "<strong>Antagonistic Muscle Pairs:</strong> Because muscle fibers can only contract (shorten and pull), they must work in opposing pairs! To <strong>bend the elbow</strong>, the <strong>Biceps contracts</strong> (pulls forearm up) while the <strong>Triceps relaxes</strong>. To <strong>straighten the arm</strong>, the <strong>Triceps contracts</strong> (pulls forearm down) while the <strong>Biceps relaxes</strong>.",
        "<strong>3 Muscle Types:</strong> <strong>Striated/Skeletal</strong> (voluntary, striped, attached to bones for walking/writing), <strong>Smooth</strong> (involuntary, unstriped, in stomach/intestines/blood vessels), and <strong>Cardiac</strong> (involuntary, striated, in heart walls — works 24/7 without fatigue!)."
      ],
      "thinkPrompt": "Can regular exercise convert body fat directly into muscle tissue? (Exam trap: Fat cells and muscle fibers are completely different biological tissues!)"
    }
  ],
  "examTraps": [
    {
      "id": "trap_l3_jaw",
      "student": "Rohan",
      "question": "When we chew a slice of bread, how do our jaws move?",
      "studentAnswer": "Both our upper jaw and lower jaw move up and down to crush the food between our teeth.",
      "prompt": "What is Rohan’s anatomical misconception?",
      "options": [
        "Only the upper jaw moves up and down; the lower jaw remains stationary against the neck.",
        "The upper jaw is fused immovable to the skull; ONLY the lower jaw (mandible) is movable during chewing and talking!",
        "Both jaws are completely immovable; teeth move independently on elastic gums."
      ],
      "correctIndex": 1,
      "teacherFeedback": "Brilliant deduction! The upper jaw is rigidly fused to the skull. Only the lower jaw is equipped with movable joints that allow chewing and speech."
    },
    {
      "id": "trap_l3_tendon_ligament",
      "student": "Priya",
      "question": "Differentiate between a tendon and a ligament.",
      "studentAnswer": "Tendons connect bone to bone at joints, while ligaments attach muscles to bones.",
      "prompt": "How should Priya correct her definitions using the 3 Ls and 3 Ts rule?",
      "options": [
        "Ligament = Like to Like (Bone to Bone); Tendon = Two Types (Muscle to Bone). Priya completely swapped their definitions!",
        "Both tendons and ligaments connect muscle to muscle; bones do not need connecting tissues.",
        "Tendons are made of bone marrow, while ligaments are made of cardiac muscle fibers."
      ],
      "correctIndex": 0,
      "teacherFeedback": "Outstanding! Remember the master mnemonic: Ligament joins Like to Like (Bone to Bone). Tendon joins Two Types (Muscle to Bone)."
    },
    {
      "id": "trap_l3_muscle_push",
      "student": "Aman",
      "question": "How do muscles extend our forearm when pushing open a door?",
      "studentAnswer": "The bicep muscle pushes the forearm bones forward like a piston.",
      "prompt": "Why is Aman’s understanding of muscle mechanics physically impossible?",
      "options": [
        "Biceps pull the shoulder backward, which causes the arm to push forward by momentum.",
        "Muscles can ONLY PULL by contracting; they can NEVER PUSH! To straighten the arm, the opposing tricep muscle contracts and pulls the forearm down.",
        "Muscles only push when we run; when using our arms, muscles pull."
      ],
      "correctIndex": 1,
      "teacherFeedback": "Spot on! Biological muscle fibers can only exert tensile force (pulling by shortening). They never push. Straightening the arm requires the triceps to pull!"
    },
    {
      "id": "trap_l3_floating_ribs",
      "student": "Sneha",
      "question": "What are floating ribs in the human ribcage?",
      "studentAnswer": "Floating ribs are broken ribs that detached from the spine and float freely in the stomach.",
      "prompt": "Diagnose Sneha’s medical and anatomical error:",
      "options": [
        "Floating ribs are the top two ribs that float above the collarbone.",
        "Floating ribs are normal, healthy ribs (pairs 11 & 12) attached to the backbone behind, but unattached to the sternum in front to allow lung expansion.",
        "Floating ribs are extra bones found only in birds and flying animals."
      ],
      "correctIndex": 1,
      "teacherFeedback": "Perfect teacher correction! Pairs 11 and 12 are permanently attached to the thoracic vertebrae behind, but end freely in front, allowing diaphragmatic movement."
    },
    {
      "id": "trap_l3_fat_muscle",
      "student": "Kunal",
      "question": "Can regular gym workouts turn body fat directly into muscle?",
      "studentAnswer": "Yes, when we do heavy exercise, fat turns directly into muscle tissue.",
      "prompt": "Why is Kunal’s statement scientifically flawed?",
      "options": [
        "Fat turns into bone first, and then bone turns into muscle tissue.",
        "Fat and muscle are two entirely different biological tissues; exercise burns fat for fuel and builds muscle fibers, but fat never morphs into muscle!",
        "Fat turns into muscle only if you drink cold water immediately after running."
      ],
      "correctIndex": 1,
      "teacherFeedback": "Excellent! Fat (adipose tissue) and muscle fibers are distinct cell lineages. You burn fat as metabolic fuel and synthesize new muscle proteins, but one cannot morph into the other."
    }
  ],
  "questions": [
    {
      "id": "l3_q1",
      "category": "mcq",
      "source": "Textbook • Section A • Q1",
      "wsNumber": 1,
      "marks": "1 Mark",
      "body": "How many bones are present in the adult human skeleton?",
      "options": [
        "300 bones",
        "206 bones",
        "106 bones",
        "250 bones"
      ],
      "correct": 1,
      "explanation": "An adult human skeleton has 206 bones. A newborn baby has over 300 bones, some of which fuse together as the baby matures.",
      "takeaway": "Adult skeleton = 206 bones | Newborn baby = 300+ bones (fused during growth)."
    },
    {
      "id": "l3_q2",
      "category": "mcq",
      "source": "Thinkbook • Sheet 1 • Q4",
      "wsNumber": 1,
      "marks": "1 Mark",
      "body": "A newborn baby is born with more than 300 bones. Why does an adult have only 206 bones?",
      "options": [
        "The extra bones dissolve and are excreted from the body",
        "As the baby grows, several small bones fuse and join together into larger bones",
        "Excess bones turn into muscle tissues during toddler years",
        "Bones break down to produce teeth in growing children"
      ],
      "correct": 1,
      "explanation": "Many bones in an infant (such as in the skull and sacrum/pelvis) are in smaller segments that fuse together into single rigid bones during childhood development.",
      "takeaway": "Bone count reduces from 300+ to 206 due to natural bone fusion."
    },
    {
      "id": "l3_q3",
      "category": "mcq",
      "source": "Textbook • Section A • Q4",
      "wsNumber": 1,
      "marks": "1 Mark",
      "body": "Long bones like the femur are filled inside with a soft, spongy tissue that produces new blood cells. What is this tissue called?",
      "options": [
        "Cartilage",
        "Bone marrow",
        "Ligament",
        "Tendon"
      ],
      "correct": 1,
      "explanation": "Bone marrow is the soft, flexible, spongy tissue located in the interior cavities of bones where new red blood cells, white blood cells, and platelets are manufactured.",
      "takeaway": "Bone marrow = Blood cell factory inside hollow bones."
    },
    {
      "id": "l3_q4",
      "category": "mcq",
      "source": "Textbook • Limbs • Q2",
      "wsNumber": 1,
      "marks": "1 Mark",
      "image": "images/l3_limbs_girdles.png",
      "body": "Observe the bones of the human limb shown below.<br>Which bone is the <strong>longest and strongest bone</strong> in the human body, supporting the full weight of the upright body?",
      "options": [
        "Humerus (upper arm)",
        "Femur (thigh bone)",
        "Tibia (shin bone)",
        "Ulna (forearm)"
      ],
      "correct": 1,
      "explanation": "The femur (thigh bone) is the longest, heaviest, and strongest bone in the human skeleton. It connects the pelvic girdle (hip) to the knee joint.",
      "takeaway": "Femur = Longest & strongest bone in human body (thigh)."
    },
    {
      "id": "l3_q5",
      "category": "mcq",
      "source": "Textbook • Skull • Q1",
      "wsNumber": 1,
      "marks": "1 Mark",
      "body": "The human skull is made up of 22 bones. Out of these 22 bones, how many bones are movable?",
      "options": [
        "All 22 bones are movable",
        "8 cranial bones are movable",
        "Only ONE bone is movable: the lower jaw (mandible)",
        "None of the bones can move"
      ],
      "correct": 2,
      "explanation": "In the skull, 21 bones are fused firmly with immovable interlocking sutures. Only the lower jaw (mandible) is movable, which allows chewing, speaking, and yawning.",
      "takeaway": "Skull: 22 bones total (8 cranial + 14 facial) → ONLY lower jaw moves!"
    },
    {
      "id": "l3_q6",
      "category": "mcq",
      "source": "Textbook • Backbone • Q2",
      "wsNumber": 1,
      "marks": "1 Mark",
      "body": "The human backbone (vertebral column) protects the delicate spinal cord. It is composed of a flexible chain of how many small bones called vertebrae?",
      "options": [
        "12 vertebrae",
        "24 vertebrae",
        "33 vertebrae",
        "46 vertebrae"
      ],
      "correct": 2,
      "explanation": "The human vertebral column consists of 33 vertebrae stacked on top of each other, separated by cartilage discs that provide flexibility for bending and twisting.",
      "takeaway": "Vertebral column = 33 vertebrae protecting the spinal cord."
    },
    {
      "id": "l3_q7",
      "category": "mcq",
      "source": "Textbook • Ribcage • Q3",
      "wsNumber": 1,
      "marks": "1 Mark",
      "image": "images/l3_ribcage.png",
      "body": "Observe the ribcage diagram below.<br>Why are the <strong>11th and 12th pairs of ribs</strong> called <strong>floating ribs</strong>?",
      "options": [
        "They float in water if removed from the body",
        "They are attached only to the backbone behind and are NOT connected to the breastbone (sternum) in front",
        "They are made of cartilage instead of real bone",
        "They are attached to the collarbone instead of the spine"
      ],
      "correct": 1,
      "explanation": "The human ribcage has 12 pairs of ribs. The first 10 pairs attach to the sternum in front, while the last two pairs (11 and 12) attach only to the thoracic spine, leaving their front ends free (floating).",
      "takeaway": "Floating ribs = 2 pairs (11th & 12th) attached ONLY to backbone, free in front."
    },
    {
      "id": "l3_q8",
      "category": "mcq",
      "source": "Textbook • Section A • Q2",
      "wsNumber": 2,
      "marks": "1 Mark",
      "body": "What is the biological term for a place in the skeletal system where two or more bones meet?",
      "options": [
        "A marrow",
        "A tendon",
        "A joint",
        "A vertebrae"
      ],
      "correct": 2,
      "explanation": "A joint (articulation) is the junction where two or more bones connect. Joints enable movement and provide mechanical support.",
      "takeaway": "Joint = Place where two or more bones meet."
    },
    {
      "id": "l3_q9",
      "category": "mcq",
      "source": "Textbook • Movable Joints • Q1",
      "wsNumber": 2,
      "marks": "1 Mark",
      "image": "images/l3_joints.png",
      "body": "Which type of movable joint allows <strong>rotary motion in all directions (360°)</strong>, similar to a computer gaming joystick?",
      "options": [
        "Hinge joint",
        "Gliding joint",
        "Ball and socket joint",
        "Pivot joint"
      ],
      "correct": 2,
      "explanation": "The ball and socket joint (found in shoulders and hips) features a rounded bone head fitting into a cup cavity, permitting circular rotary movement in all planes.",
      "takeaway": "Ball and socket = 360° rotary motion in all directions (Shoulder & Hip)."
    },
    {
      "id": "l3_q10",
      "category": "mcq",
      "source": "Textbook • Movable Joints • Q2",
      "wsNumber": 2,
      "marks": "1 Mark",
      "body": "A door hinge allows a wooden door to open and close in only one direction. Which joints in the human body are <strong>hinge joints</strong>?",
      "options": [
        "Shoulder and hip joints",
        "Knee, elbow, finger, and toe joints",
        "Neck and skull joint",
        "Wrist and ankle joints"
      ],
      "correct": 1,
      "explanation": "Hinge joints allow movement in a single plane (bending and straightening only), just like door hinges. Examples include elbows, knees, fingers, and toes.",
      "takeaway": "Hinge joint = One-direction planar motion (Elbow, Knee, Fingers, Toes)."
    },
    {
      "id": "l3_q11",
      "category": "mcq",
      "source": "Textbook • Movable Joints • Q3",
      "wsNumber": 2,
      "marks": "1 Mark",
      "body": "The joint present between the skull and the first vertebra of the backbone that allows us to turn our head sideways and nod up and down is called a __________.",
      "options": [
        "Gliding joint",
        "Hinge joint",
        "Pivot joint",
        "Ball and socket joint"
      ],
      "correct": 2,
      "explanation": "The pivot joint (atlantoaxial joint) between the skull base and top vertebra permits rotation around a single central axis, letting you turn your head side-to-side and tilt up-and-down.",
      "takeaway": "Pivot joint = Neck rotation between skull and spine."
    },
    {
      "id": "l3_q12",
      "category": "mcq",
      "source": "Textbook • Movable Joints • Q4",
      "wsNumber": 2,
      "marks": "1 Mark",
      "body": "Which joints allow bones to slide smoothly over each other in multiple directions, such as when you wave your hand at the wrist or roll your ankle?",
      "options": [
        "Gliding joints",
        "Hinge joints",
        "Ball and socket joints",
        "Immovable joints"
      ],
      "correct": 0,
      "explanation": "Gliding joints (planar joints) have flat bone surfaces that slide past each other. They are found in the wrists (carpals), ankles (tarsals), and between vertebrae.",
      "takeaway": "Gliding joint = Sliding planar motion (Wrists, Ankles, Vertebrae)."
    },
    {
      "id": "l3_q13",
      "category": "mcq",
      "source": "Textbook • Section A • Q3",
      "wsNumber": 2,
      "marks": "1 Mark",
      "body": "Tough, elastic fibrous bands of tissue that hold <strong>bone to bone</strong> together at joints are called __________.",
      "options": [
        "Tendons",
        "Ligaments",
        "Cartilages",
        "Vertebrae"
      ],
      "correct": 1,
      "explanation": "Ligaments join bone to bone at joints (3 Ls: Ligaments for Like to Like). Tendons connect muscle to bone (3 Ts: Tendons for Two Types).",
      "takeaway": "Ligaments = Bone to Bone (Like to Like) | Tendons = Muscle to Bone (Two Types)."
    },
    {
      "id": "l3_q14",
      "category": "mcq",
      "source": "Thinkbook • Sheet 4 • Q5",
      "wsNumber": 3,
      "marks": "1 Mark",
      "image": "images/l3_bow_analogy.png",
      "body": "Observe the archer's bow shown below.<br>In the human body's movement system, which components function like the <strong>wooden bow</strong> and the <strong>flexible pulled string</strong>?",
      "options": [
        "Bow functions like Muscles; String functions like Bones",
        "Bow functions like Bones (rigid frame); String functions like Muscles (pulling cord)",
        "Bow functions like Bone Marrow; String functions like Blood Vessels",
        "Bow functions like Tendons; String functions like Ligaments"
      ],
      "correct": 1,
      "explanation": "The stiff wooden bow acts like rigid bones that provide skeletal structure, while the elastic pulled string acts like muscles that contract and pull to generate kinetic force!",
      "takeaway": "Bow & Arrow analogy: Rigid wooden bow = Bones | Contracting pulling string = Muscles."
    },
    {
      "id": "l3_q15",
      "category": "mcq",
      "source": "Thinkbook • Sheet 4 • Q6",
      "wsNumber": 3,
      "marks": "1 Mark",
      "image": "images/l3_arm_muscles.png",
      "body": "When you bend your elbow to lift an apple to your mouth, what happens to the bicep and tricep muscles of your arm?",
      "options": [
        "Biceps contracts (bulges and pulls); Triceps relaxes (lengthens)",
        "Triceps contracts; Biceps relaxes",
        "Both biceps and triceps contract simultaneously",
        "Both biceps and triceps relax completely"
      ],
      "correct": 0,
      "explanation": "When bending the arm, the front muscle (biceps) contracts and bulges, pulling the forearm bones upward. At the same time, the back muscle (triceps) relaxes and stretches.",
      "takeaway": "Bending elbow: Biceps contracts (pulls UP), Triceps relaxes. Straightening: Triceps contracts, Biceps relaxes."
    },
    {
      "id": "l3_q16",
      "category": "mcq",
      "source": "Textbook • Muscles • Q1",
      "wsNumber": 3,
      "marks": "1 Mark",
      "body": "Why do skeletal muscles always work in <strong>antagonistic (opposing) pairs</strong> like the biceps and triceps?",
      "options": [
        "Because one muscle pushes while the other muscle pulls",
        "Because muscles can ONLY PULL by contracting; they CANNOT PUSH!",
        "Because one muscle produces blood while the other stores calcium",
        "Because bones only respond when two electrical signals arrive together"
      ],
      "correct": 1,
      "explanation": "Muscle fibers generate mechanical force solely by contracting (shortening and pulling). They have no mechanism to push bones outward. Therefore, an opposing partner muscle is needed to pull the bone back!",
      "takeaway": "Fundamental rule: Muscles can ONLY PULL, never push! Opposing pairs are mandatory."
    },
    {
      "id": "l3_q17",
      "category": "mcq",
      "source": "Textbook • Muscle Types • Q2",
      "wsNumber": 3,
      "marks": "1 Mark",
      "body": "Which type of muscle is found ONLY in the walls of the heart, works 24 hours a day without stopping, and never gets fatigued?",
      "options": [
        "Striated voluntary muscle",
        "Smooth involuntary muscle",
        "Cardiac muscle",
        "Skeletal muscle"
      ],
      "correct": 2,
      "explanation": "Cardiac muscle is specialized heart muscle. It is involuntary (not under conscious control), rhythmic, and continuously pumps blood throughout our entire lifetime without fatigue.",
      "takeaway": "Cardiac muscle = Heart wall, involuntary, tireless 24/7 pumper."
    },
    {
      "id": "l3_q18",
      "category": "whoami",
      "source": "Textbook • Section B • Q1",
      "wsNumber": 2,
      "marks": "1 Mark",
      "body": "<strong>Who am I?</strong><br>I am the long flat bone located in the center of the chest (also called breastbone). The first 10 pairs of ribs are attached to me in front.",
      "options": [
        "Femur",
        "Sternum",
        "Humerus",
        "Clavicle"
      ],
      "correct": 1,
      "explanation": "The sternum (breastbone) is the dagger-shaped bone in the middle of the chest to which the true ribs and false ribs attach anteriorly.",
      "takeaway": "Sternum = Breastbone anchoring the front of the ribcage."
    },
    {
      "id": "l3_q19",
      "category": "whoami",
      "source": "Textbook • Section B • Q2",
      "wsNumber": 2,
      "marks": "1 Mark",
      "body": "<strong>Who am I?</strong><br>I am the single bone of your upper arm. My upper rounded ball fits into the shoulder girdle, and my lower end forms the elbow joint with the radius and ulna.",
      "options": [
        "Femur",
        "Fibula",
        "Humerus",
        "Tibia"
      ],
      "correct": 2,
      "explanation": "The humerus is the upper arm bone extending from the shoulder socket to the elbow.",
      "takeaway": "Humerus = Upper arm bone (shoulder to elbow)."
    },
    {
      "id": "l3_q20",
      "category": "compare",
      "source": "Textbook • Section D • Q3",
      "wsNumber": 3,
      "marks": "2 Marks",
      "body": "Which statement correctly differentiates <strong>voluntary muscles</strong> from <strong>involuntary muscles</strong>?",
      "options": [
        "Voluntary muscles are under our conscious control (e.g. arm and leg muscles); involuntary muscles work automatically without our conscious effort (e.g. stomach and heart)",
        "Voluntary muscles work when we sleep; involuntary muscles work only when we run",
        "Voluntary muscles are found inside blood vessels; involuntary muscles are attached to the skeleton",
        "Voluntary muscles can push bones; involuntary muscles can only pull"
      ],
      "correct": 0,
      "explanation": "Voluntary (skeletal) muscles are governed by our conscious will via the cerebrum. Involuntary (smooth and cardiac) muscles operate autonomously via autonomic nerve centers without requiring conscious thought.",
      "takeaway": "Voluntary = Conscious will (limbs) | Involuntary = Automatic 24/7 (stomach, lungs, heart)."
    },
    {
      "id": "l3_q21",
      "category": "oddone",
      "source": "Textbook • Section E • Q2",
      "wsNumber": 3,
      "marks": "1 Mark",
      "body": "<strong>Find the Odd One Out:</strong><br>Humerus, Radius, Femur, Ulna.",
      "options": [
        "Humerus — because it is attached to the collarbone",
        "Femur — because it is a bone of the lower limb (leg), while the others belong to the upper limb (arm)!",
        "Radius — because it has no bone marrow",
        "Ulna — because it is made of cartilage"
      ],
      "correct": 1,
      "explanation": "Humerus, Radius, and Ulna are the three long bones of the upper limb (arm). The Femur is the thigh bone of the lower limb (leg).",
      "takeaway": "Odd one out: Femur (Leg / Lower limb) vs Humerus, Radius, Ulna (Arm / Upper limb)."
    },
    {
      "id": "l3_q22",
      "category": "scenario",
      "source": "Thinkbook • Sheet 2 • Q1",
      "wsNumber": 3,
      "marks": "2 Marks",
      "body": "Rahul slipped while playing football and suffered a bone fracture in one of his <strong>lower limbs</strong> (legs). Which of the following daily activities will be <strong>directly affected</strong> while he heals in a cast?",
      "options": [
        "Walking and jumping",
        "Chewing food and swallowing",
        "Thinking and memorizing spelling",
        "Breathing and heartbeat"
      ],
      "correct": 0,
      "explanation": "The lower limbs consist of the thighs, knees, legs, ankles, and feet (femur, patella, tibia, fibula). A fracture directly impairs walking, running, and jumping. Chewing uses facial muscles, breathing uses the diaphragm/ribcage, and thinking uses the cerebrum.",
      "takeaway": "Lower limb = Locomotion (walking, jumping, standing). Non-limb functions remain unaffected."
    }
  ]
},

  // ------------------------------------------------------------------------
  // CHAPTER 3: L-4 THE NERVOUS SYSTEM & SENSE ORGANS
  // ------------------------------------------------------------------------
{
  "id": "ch4_nervous",
  "number": "L-4",
  "title": "The Nervous System & Sense Organs",
  "sub": "Brain Regions, Spinal Cord Reflex Arc, Nerve Pathways & 5 Senses",
  "themeColor": "#8b5cf6",
  "icon": "🧠",
  "summary": "Master the central command network: Cerebrum, Cerebellum, Medulla, contralateral brain control, lightning-fast spinal reflex arcs, sensory vs motor nerves, and the 5 precision sense organs.",
  "learnCards": [
    {
      "badge": "Central Command",
      "title": "💻 The Biological Supercomputer & Nerve Cables",
      "metaphor": "Your nervous system is the ultimate biological supercomputer: Brain is the CPU, spinal cord is the main data highway, and nerves are the fiber-optic cables!",
      "points": [
        "<strong>3 Master Components:</strong> The human nervous system consists of the <strong>Brain</strong>, the <strong>Spinal Cord</strong>, and a vast interconnected network of <strong>Nerves</strong> spreading throughout the body.",
        "<strong>The Neuron (Nerve Cell):</strong> Nerves are composed of billions of specialized microscopic cells called <strong>neurons</strong>. Spanish neuroscientist <em>Santiago Ramón y Cajal</em> proved that neurons communicate by transmitting electrochemical signals.",
        "<strong>Spinal Cord Highway:</strong> A thick, tubular bundle of nerves emerging from the medulla that extends down through the protective vertebral column. It carries messages between the brain and the entire body.",
        "<strong>Cerebrospinal Fluid (CSF):</strong> The brain floats in a protective liquid layer between the brain tissue and the hard skull that acts as a hydraulic shock absorber, cushioning against sudden jerks and bumps!"
      ],
      "thinkPrompt": "Why does a desktop computer need separate power, signal cables, and a central microprocessor, exactly like our nervous system has nerves, sensory inputs, and the brain?"
    },
    {
      "badge": "The 3 Brain Departments",
      "title": "🧠 Cerebrum, Cerebellum & Medulla",
      "metaphor": "The brain has three specialized managers running your body's operations 24 hours a day!",
      "points": [
        "<strong>1. Cerebrum (Thinking & Senses):</strong> The top dome-shaped, largest part (~85% of brain weight). Its surface is folded into ridges and grooves resembling a walnut. It controls <strong>thinking, memory, logic, speech, emotions, learning</strong>, and interprets signals from all 5 sense organs!",
        "<strong>2. Cerebellum (Balance & Muscle Coordination):</strong> Located at the lower back of the head beneath the cerebrum. Coordinates voluntary muscle movements to maintain <strong>balance, equilibrium, and upright posture</strong> (walking, cycling, dancing).",
        "<strong>3. Medulla (Brain Stem — 24/7 Life Vitals):</strong> Connects the brain to the spinal cord. Governs <strong>involuntary vital reflexes</strong>: heartbeat, breathing, blood pressure, digestion, sneezing, and swallowing. <strong>It works continuously 24 hours a day, even while you are fast asleep!</strong>",
        "<strong>Contralateral Control:</strong> The left hemisphere of the cerebrum controls the <strong>right side</strong> of the body; the right hemisphere controls the <strong>left side</strong>!"
      ],
      "thinkPrompt": "When you are in deep sleep at 2 AM, which part of your brain is tirelessly keeping your heart beating and lungs breathing?"
    },
    {
      "badge": "Emergency Bypass",
      "title": "⚡ The Lightning Reflex Arc (Spinal Bypass)",
      "metaphor": "When a house catches fire, you don't wait for a letter from the president — the local emergency fire alarm rings instantly!",
      "points": [
        "<strong>What is a Reflex Action?</strong> An extremely rapid, automatic, involuntary response to a dangerous stimulus that <strong>DOES NOT wait for the brain to think</strong>!",
        "<strong>Controlled by Spinal Cord:</strong> The emergency decision is made directly by the <strong>Spinal Cord</strong> to save precious milliseconds and prevent severe tissue damage.",
        "<strong>The 5-Step Reflex Pathway:</strong> Skin heat receptors → <strong>Sensory nerve</strong> → <strong>Spinal cord</strong> → <strong>Motor nerve</strong> → Arm bicep muscle contracts → Hand is yanked away in ~0.05 seconds!",
        "<strong>Brain Learns Afterwards:</strong> The sensory signal travels up to the conscious cerebrum <em>after</em> the hand is already pulled back, which is why you consciously register the burning pain only AFTER your hand is safely away!"
      ],
      "thinkPrompt": "Why would waiting for the brain's cerebrum to process the thought 'Ouch, this stove is hot, I should lift my finger' lead to severe third-degree burns?"
    },
    {
      "badge": "Information Couriers",
      "title": "📡 Sensory, Motor & Mixed Nerves",
      "metaphor": "Nerves are one-way and two-way telephone lines transmitting biological telegrams across the body!",
      "points": [
        "<strong>Sensory Nerves (Inputs):</strong> Carry messages <strong>FROM the sense organs TO the brain and spinal cord</strong> ('I see red light', 'This ice is freezing', 'The bell is ringing').",
        "<strong>Motor Nerves (Outputs):</strong> Carry orders <strong>FROM the brain and spinal cord TO muscles and glands</strong> ('Contract leg muscles', 'Secrete sweat', 'Blink eyelids').",
        "<strong>Mixed Nerves (Two-Way):</strong> Contain both sensory and motor nerve fibers, transmitting signals in <strong>both directions</strong> between the central nervous system and body tissues.",
        "<strong>No Isolated Nerves:</strong> A nerve can NEVER run directly from wrist to ankle on its own! All peripheral nerves must route through the spinal cord or brain central network."
      ],
      "thinkPrompt": "If an accident cuts only the sensory nerves to a person's hand while motor nerves remain intact, could they pick up an apple? Could they feel if it is cold?"
    },
    {
      "badge": "Sensory Detectors",
      "title": "👁️ The 5 Precision Sense Organs",
      "metaphor": "Your 5 sense organs are high-definition environmental sensors streaming real-time data to your brain!",
      "points": [
        "<strong>Eye (Biological Camera):</strong> Light passes through the transparent <strong>cornea</strong> → enters through the <strong>pupil</strong> (regulated by colored <strong>iris</strong>) → focused by lens → inverted image forms on the <strong>retina</strong> → <strong>optic nerve</strong> transmits image signals to cerebrum.",
        "<strong>Ear (Hearing & Balance!):</strong> Outer ear (<strong>pinna</strong>) collects sound waves → <strong>eardrum</strong> vibrates → 3 tiny middle ear bones amplify → fluid-filled snail <strong>cochlea</strong> turns vibrations into nerve signals → auditory nerve. <em>Inner ear semicircular canals maintain body balance!</em>",
        "<strong>Nose:</strong> Nasal cavity lined with olfactory nerve receptors. Hair and mucus trap airborne dirt and bacteria.",
        "<strong>Tongue:</strong> Taste buds detect sweet, salty, sour, and bitter. Nerves send taste signals to cerebrum. (Also essential for speech and swallowing!).",
        "<strong>Skin (Largest Organ):</strong> Contains microscopic receptors sensitive to <strong>touch, pressure, heat, cold, and pain</strong>. Sweat glands regulate body temperature."
      ],
      "thinkPrompt": "Why does chocolate or hot soup taste completely bland and flavorless when your nose is severely blocked with a common cold?"
    }
  ],
  "examTraps": [
    {
      "id": "trap_l4_reflex_brain",
      "student": "Ravi",
      "question": "Explain how your hand pulls away after touching a scorching hot electric iron.",
      "studentAnswer": "The sensory nerves sent a message to my brain, my cerebrum thought about how hot it was, decided it was dangerous, and sent an order to pull my hand back.",
      "prompt": "What critical biological error did Ravi make regarding reflex actions?",
      "options": [
        "The heart decides reflex actions, not the cerebrum.",
        "Reflex actions bypass the brain completely! The spinal cord receives the sensory signal and immediately fires the motor command to save vital seconds.",
        "The fingers pull back automatically without any nerves or spinal cord involvement."
      ],
      "correctIndex": 1,
      "teacherFeedback": "Outstanding teacher diagnosis! If signals had to travel all the way to the cerebrum for conscious deliberation, the skin would be severely burned before you reacted. The spinal cord executes the emergency loop directly!"
    },
    {
      "id": "trap_l4_contralateral",
      "student": "Karan",
      "question": "A patient suffered a head injury affecting the left side of his cerebrum. Which side of his body shows weakness or paralysis?",
      "studentAnswer": "The left side of his brain was injured, so the left side of his body is paralysed.",
      "prompt": "Where did Karan stumble regarding brain wiring?",
      "options": [
        "The cerebrum has no control over muscles; that is handled solely by the stomach.",
        "Brain motor control is contralateral (criss-crossed): the left cerebrum controls the RIGHT side of the body, and the right cerebrum controls the LEFT side!",
        "Both sides of the body are always paralysed equally regardless of injury location."
      ],
      "correctIndex": 1,
      "teacherFeedback": "Perfect! Nerve pathways cross over in the brainstem. A left-hemisphere injury manifests as motor and sensory impairment on the right side of the body."
    },
    {
      "id": "trap_l4_ear_balance",
      "student": "Rohan",
      "question": "What are the biological functions of the human ear?",
      "studentAnswer": "The ears have only one function: to hear sounds. Our legs and spine alone maintain our body balance.",
      "prompt": "What important secondary function of the ear did Rohan overlook?",
      "options": [
        "The ear is the primary organ for smelling pleasant aromas.",
        "The inner ear contains fluid-filled semicircular canals that detect body posture and work with the cerebellum to maintain balance and equilibrium!",
        "The outer ear pumps oxygen into the bloodstream."
      ],
      "correctIndex": 1,
      "teacherFeedback": "Brilliant deduction! The inner ear houses the vestibular balance mechanism. When inner ear fluid gets agitated (like after spinning in circles), you feel dizzy even though your legs are perfectly healthy!"
    },
    {
      "id": "trap_l4_sensory_motor_cut",
      "student": "Sneha",
      "question": "Suppose an accident severs only the sensory nerves to a player's hand, while motor nerves are undamaged. Can the player move their hand?",
      "studentAnswer": "No, because without sensory nerves the hand is completely paralysed and cannot move at all.",
      "prompt": "How should Sneha clarify the distinct functions of sensory vs motor nerves?",
      "options": [
        "Motor nerves carry brain commands to muscles, so the player CAN still move their fingers; however, because sensory nerves are cut, they CANNOT feel touch, temperature, or pain!",
        "Sensory nerves move the bones, while motor nerves only carry pain.",
        "The hand will only move when the player is asleep."
      ],
      "correctIndex": 0,
      "teacherFeedback": "Spot on! Movement is governed by motor nerves. Feeling and sensation are carried by sensory nerves. With motor nerves intact, muscle motion remains functional, but sensation is lost."
    },
    {
      "id": "trap_l4_brain_percentage",
      "student": "Ananya",
      "question": "Is it true that human beings use only 10% of their brain capacity?",
      "studentAnswer": "Yes, scientists found that 90% of the human brain remains permanently asleep and dormant.",
      "prompt": "Why is the '10% brain myth' scientifically false?",
      "options": [
        "We use only 5% of our brain, and animals use 50%.",
        "Brain imaging proves that humans use virtually 100% of the brain; different regions coordinate continuously, even during sleep (medulla, cerebellum, sensory cortex)!",
        "We use 10% during the daytime and the other 90% only while eating lunch."
      ],
      "correctIndex": 1,
      "teacherFeedback": "Excellent! Every single area of the human brain has a designated function. The brain consumes 20% of the body's daily energy and remains active around the clock."
    }
  ],
  "questions": [
    {
      "id": "l4_q1",
      "category": "mcq",
      "source": "Textbook • Section A • Q1",
      "wsNumber": 1,
      "marks": "1 Mark",
      "body": "What are the three main organs that constitute the human nervous system?",
      "options": [
        "Heart, lungs, and blood vessels",
        "Brain, spinal cord, and nerves",
        "Bones, joints, and muscles",
        "Stomach, liver, and intestines"
      ],
      "correct": 1,
      "explanation": "The human nervous system is composed of the Brain (command center), Spinal Cord (main communication conduit), and a widespread network of Nerves (data cables).",
      "takeaway": "Nervous System = Brain + Spinal Cord + Nerves."
    },
    {
      "id": "l4_q2",
      "category": "mcq",
      "source": "Textbook • Section A • Q2",
      "wsNumber": 1,
      "marks": "1 Mark",
      "image": "images/l4_brain_parts.png",
      "body": "Observe the diagram of the human brain below.<br>Which is the <strong>largest part of the brain</strong>, characterized by walnut-like convolutions, ridges, and grooves?",
      "options": [
        "Cerebellum",
        "Medulla",
        "Cerebrum",
        "Spinal cord"
      ],
      "correct": 2,
      "explanation": "The cerebrum is the upper, dome-shaped, and largest part of the brain (~85% of total brain mass). It controls thinking, intelligence, memory, speech, and sense organs.",
      "takeaway": "Cerebrum = Largest brain part (walnut appearance, thinking & memory)."
    },
    {
      "id": "l4_q3",
      "category": "mcq",
      "source": "Textbook • Section A • Q5",
      "wsNumber": 1,
      "marks": "1 Mark",
      "image": "images/l4_brain_parts.png",
      "body": "Which part of the brain is located at the lower back of the head beneath the cerebrum and is responsible for <strong>coordinating voluntary muscle movements and maintaining body balance</strong>?",
      "options": [
        "Cerebrum",
        "Cerebellum",
        "Medulla",
        "Spinal cord"
      ],
      "correct": 1,
      "explanation": "The cerebellum coordinates muscle activities for balance, walking, running, and maintaining upright body posture. If damaged, body movements become clumsy and jerky.",
      "takeaway": "Cerebellum = Balance, muscle coordination, and posture."
    },
    {
      "id": "l4_q4",
      "category": "mcq",
      "source": "Textbook • Section B • Q3",
      "wsNumber": 1,
      "marks": "1 Mark",
      "image": "images/l4_brain_parts.png",
      "body": "Which stem-like brain structure connects the brain to the spinal cord and controls vital <strong>involuntary activities like heartbeat, breathing, and blood circulation even during sleep</strong>?",
      "options": [
        "Cerebrum",
        "Cerebellum",
        "Medulla (Brain stem)",
        "Optic nerve"
      ],
      "correct": 2,
      "explanation": "The medulla oblongata (brain stem) regulates autonomic life-support functions 24/7 without conscious effort. It keeps you breathing and your heart beating while asleep.",
      "takeaway": "Medulla = Autonomous 24/7 vitals: breathing, heartbeat, blood pressure."
    },
    {
      "id": "l4_q5",
      "category": "mcq",
      "source": "Textbook • Brain Protection • Q1",
      "wsNumber": 1,
      "marks": "1 Mark",
      "body": "What is the primary function of the cerebrospinal fluid present in the space between the brain tissue and the skull bone?",
      "options": [
        "It digests food nutrients for the brain",
        "It acts as a shock absorber to protect the delicate brain from minor bumps and mechanical jerks",
        "It manufactures red blood cells for the head",
        "It produces tears to clean the eyes"
      ],
      "correct": 1,
      "explanation": "Cerebrospinal fluid acts as a hydraulic cushion that buffers and protects the brain from physical impacts, mechanical shocks, and pressure changes.",
      "takeaway": "Cerebrospinal fluid = Liquid shock absorber cushioning the brain inside the skull."
    },
    {
      "id": "l4_q6",
      "category": "mcq",
      "source": "Textbook • Section B • Q1",
      "wsNumber": 1,
      "marks": "1 Mark",
      "image": "images/l4_reflex_arc.png",
      "body": "Observe the reflex action pathway shown below.<br>Which part of the central nervous system controls these <strong>lightning-quick, automatic emergency actions without waiting for the brain</strong>?",
      "options": [
        "Cerebrum",
        "Cerebellum",
        "Spinal cord",
        "Medulla"
      ],
      "correct": 2,
      "explanation": "Reflex actions (like jerking your hand away from a hot pan or blinking at flying dust) are controlled directly by the spinal cord to protect tissues with maximum speed.",
      "takeaway": "Reflex action = Controlled by Spinal Cord (bypasses brain for emergency speed)."
    },
    {
      "id": "l4_q7",
      "category": "mcq",
      "source": "Thinkbook • Sheet 3 • Q1",
      "wsNumber": 2,
      "marks": "1 Mark",
      "image": "images/l4_reflex_arc.png",
      "body": "What is the correct sequential pathway of nerve impulses during an emergency reflex action when touching a hot cup?",
      "options": [
        "Brain → Motor nerve → Skin receptor → Spinal cord",
        "Skin receptor → Sensory nerve → Spinal cord → Motor nerve → Arm muscle contracts",
        "Arm muscle → Motor nerve → Spinal cord → Sensory nerve",
        "Skin receptor → Cerebrum → Cerebellum → Spinal cord"
      ],
      "correct": 1,
      "explanation": "In a reflex arc: Receptors in skin detect heat → Sensory neuron carries electrical signal to Spinal Cord → Spinal cord fires immediate motor response → Motor neuron commands arm biceps to contract and yank hand away.",
      "takeaway": "Reflex Arc Sequence: Receptor → Sensory Nerve → Spinal Cord → Motor Nerve → Muscle."
    },
    {
      "id": "l4_q8",
      "category": "mcq",
      "source": "Textbook • Section B • Q2",
      "wsNumber": 2,
      "marks": "1 Mark",
      "body": "What are the specialized microscopic cells that form the structural and functional units of the nervous system called?",
      "options": [
        "Platelets",
        "Neurons (nerve cells)",
        "Vertebrae",
        "Nephrons"
      ],
      "correct": 1,
      "explanation": "Neurons (nerve cells) are the building blocks of the nervous system. They possess dendrites to receive signals, a cell body, and an elongated axon to transmit electrical impulses.",
      "takeaway": "Neuron = Fundamental nerve cell transmitting electrical impulses."
    },
    {
      "id": "l4_q9",
      "category": "mcq",
      "source": "Textbook • Section C • Q6",
      "wsNumber": 2,
      "marks": "1 Mark",
      "body": "A person suffered a stroke that damaged the <strong>left hemisphere of his cerebrum</strong>. Which side of his body is most likely to suffer weakness or paralysis?",
      "options": [
        "Left side of his body",
        "Right side of his body",
        "Both sides of his body equally",
        "Neither side, because the brain does not control limbs"
      ],
      "correct": 1,
      "explanation": "Due to contralateral innervation, motor nerve pathways cross over in the brainstem. The left side of the brain governs the right side of the body, and vice versa.",
      "takeaway": "Contralateral brain rule: Left brain controls right body; Right brain controls left body."
    },
    {
      "id": "l4_q10",
      "category": "mcq",
      "source": "Textbook • Nerve Types • Q1",
      "wsNumber": 2,
      "marks": "1 Mark",
      "body": "Which type of nerves carry sensory information (like seeing a red traffic signal or feeling an ice cube) <strong>from sense organs TO the brain and spinal cord</strong>?",
      "options": [
        "Motor nerves",
        "Sensory nerves",
        "Mixed nerves",
        "Cranial bones"
      ],
      "correct": 1,
      "explanation": "Sensory nerves transmit incoming sensory signals from receptors to the central nervous system. Motor nerves carry outgoing commands from the CNS to muscles and glands.",
      "takeaway": "Sensory nerves = Sense organ → Brain/Spinal cord | Motor nerves = Brain/Spinal cord → Muscles."
    },
    {
      "id": "l4_q11",
      "category": "mcq",
      "source": "Textbook • Section A • Q3",
      "wsNumber": 2,
      "marks": "1 Mark",
      "image": "images/l4_eye_structure.png",
      "body": "Observe the eye anatomy below.<br>Which circular, colored part of the eye contains pigments that give a person their <strong>distinctive eye color</strong> (brown, black, blue, or green)?",
      "options": [
        "Cornea",
        "Retina",
        "Iris",
        "Pupil"
      ],
      "correct": 2,
      "explanation": "The iris is the colored muscular ring surrounding the pupil. It regulates the size of the pupil to control how much light enters the eye.",
      "takeaway": "Iris = Colored muscular ring controlling light aperture (eye color)."
    },
    {
      "id": "l4_q12",
      "category": "mcq",
      "source": "Textbook • Eye Structure • Q2",
      "wsNumber": 2,
      "marks": "1 Mark",
      "image": "images/l4_eye_structure.png",
      "body": "In the human eye, light rays pass through the transparent cornea and lens to form an inverted image on which <strong>light-sensitive screen at the back of the eyeball</strong>?",
      "options": [
        "Retina",
        "Iris",
        "Pupil",
        "Optic nerve"
      ],
      "correct": 0,
      "explanation": "The retina is the inner, light-sensitive sensory lining at the rear of the eye containing photoreceptor rod and cone cells where visual images are focused.",
      "takeaway": "Retina = Light-sensitive screen where visual images form."
    },
    {
      "id": "l4_q13",
      "category": "mcq",
      "source": "Textbook • Eye Structure • Q3",
      "wsNumber": 3,
      "marks": "1 Mark",
      "image": "images/l4_eye_structure.png",
      "body": "Which specialized sensory nerve connects the retina of the eye to the visual cortex of the brain?",
      "options": [
        "Auditory nerve",
        "Optic nerve",
        "Olfactory nerve",
        "Spinal nerve"
      ],
      "correct": 1,
      "explanation": "The optic nerve carries electrical visual impulses from the retina directly to the cerebrum, which decodes the signals so you perceive an upright, colorful image.",
      "takeaway": "Optic nerve = Cable carrying visual signals from retina to brain."
    },
    {
      "id": "l4_q14",
      "category": "mcq",
      "source": "Textbook • Section A • Q4",
      "wsNumber": 3,
      "marks": "1 Mark",
      "image": "images/l4_ear_structure.png",
      "body": "Observe the ear diagram below.<br>Which part of the ear contains the delicate membrane called the <strong>eardrum (tympanic membrane)</strong> that vibrates when sound waves strike it?",
      "options": [
        "Outer ear",
        "Middle ear",
        "Inner ear",
        "Auditory nerve"
      ],
      "correct": 1,
      "explanation": "The eardrum separates the outer ear canal from the middle ear cavity, which houses the 3 tiny auditory ossicle bones (hammer, anvil, stirrup).",
      "takeaway": "Middle ear = Contains eardrum and 3 tiny acoustic amplifier bones."
    },
    {
      "id": "l4_q15",
      "category": "mcq",
      "source": "Textbook • Ear Structure • Q2",
      "wsNumber": 3,
      "marks": "1 Mark",
      "image": "images/l4_ear_structure.png",
      "body": "In the inner ear, which <strong>spiral, fluid-filled snail-shell structure</strong> transforms mechanical sound vibrations into electrical nerve signals?",
      "options": [
        "Pinna",
        "Cochlea",
        "Eardrum",
        "Orbit"
      ],
      "correct": 1,
      "explanation": "The cochlea is the snail-shaped cavity of the inner ear. Microscopic hair cells inside fluid chambers translate physical sound vibrations into electrical signals sent to the auditory nerve.",
      "takeaway": "Cochlea = Snail-shaped inner ear organ converting sound vibrations to nerve signals."
    },
    {
      "id": "l4_q16",
      "category": "mcq",
      "source": "Thinkbook • Sheet 4 • Q2",
      "wsNumber": 3,
      "marks": "1 Mark",
      "body": "Besides sensing sound waves for hearing, what other crucial function is performed by the <strong>inner ear</strong>?",
      "options": [
        "Maintaining body balance and equilibrium",
        "Digesting solid food particles",
        "Filtering dust from inhaling air",
        "Producing hormones for leg growth"
      ],
      "correct": 0,
      "explanation": "The inner ear contains semicircular canals filled with sensory fluid that detect changes in head position and signal the cerebellum to maintain balance and posture.",
      "takeaway": "Ears perform TWO functions: Hearing sound + Maintaining body balance!"
    },
    {
      "id": "l4_q17",
      "category": "mcq",
      "source": "Textbook • Section A • Q2",
      "wsNumber": 3,
      "marks": "1 Mark",
      "body": "Which is the <strong>largest organ of the human body</strong>, covering the entire exterior surface?",
      "options": [
        "The liver",
        "The brain",
        "The skin",
        "The tongue"
      ],
      "correct": 2,
      "explanation": "The skin is the largest organ of the human body. It protects internal organs, detects touch/temperature/pain, and regulates body temperature via sweating.",
      "takeaway": "Skin = Largest organ of human body (protective shield & sensory receptor)."
    },
    {
      "id": "l4_q18",
      "category": "whoami",
      "source": "Textbook • Section B • Q4",
      "wsNumber": 2,
      "marks": "1 Mark",
      "body": "<strong>Who am I?</strong><br>I am the circular, transparent dome at the front of the eye that receives incoming light and protects the inner eyeball.",
      "options": [
        "Retina",
        "Cornea",
        "Iris",
        "Pupil"
      ],
      "correct": 1,
      "explanation": "The cornea is the clear, transparent anterior window of the eyeball through which light first passes into the eye.",
      "takeaway": "Cornea = Clear front dome of the eye receiving light."
    },
    {
      "id": "l4_q19",
      "category": "whoami",
      "source": "Thinkbook • Sheet 4 • Q2",
      "wsNumber": 2,
      "marks": "1 Mark",
      "body": "<strong>Who am I?</strong><br>I am the visible outer flap of the ear made of cartilage that acts like a sound-funnel to collect acoustic waves from the environment.",
      "options": [
        "Cochlea",
        "Pinna",
        "Eardrum",
        "Stirrup"
      ],
      "correct": 1,
      "explanation": "The pinna (auricle) is the external cartilage structure of the ear designed to collect sound vibrations and guide them into the ear canal.",
      "takeaway": "Pinna = Outer ear flap that collects sound waves."
    },
    {
      "id": "l4_q20",
      "category": "compare",
      "source": "Textbook • Section D • Q2",
      "wsNumber": 3,
      "marks": "2 Marks",
      "body": "Which option accurately compares a <strong>reflex action</strong> with a <strong>voluntary action</strong>?",
      "options": [
        "Reflex action: quick, automatic, controlled by the spinal cord (e.g. blinking); Voluntary action: conscious, deliberate, controlled by the cerebrum (e.g. writing an essay)",
        "Reflex action is controlled by the heart; Voluntary action is controlled by the liver",
        "Reflex action works only when you are asleep; Voluntary action works only when running",
        "Reflex actions take 5 minutes; Voluntary actions take 1 second"
      ],
      "correct": 0,
      "explanation": "Reflex actions are involuntary rapid responses managed by the spinal cord without conscious thinking. Voluntary actions involve conscious analysis and decision-making by the brain's cerebrum.",
      "takeaway": "Reflex = Spinal cord automatic protection | Voluntary = Cerebrum conscious decision."
    },
    {
      "id": "l4_q21",
      "category": "scenario",
      "source": "Thinkbook • Sheet 2 • Q2",
      "wsNumber": 3,
      "marks": "2 Marks",
      "body": "During Suman's day: at 6:50 AM she is in deep sleep breathing steadily; at 7:00 AM she walks downstairs balancing on each step; at 8:00 AM she solves a tough puzzle. Which parts of her brain are primarily active in these three events?",
      "options": [
        "6:50 AM: Medulla (breathing) | 7:00 AM: Cerebellum (balance) | 8:00 AM: Cerebrum (logic & thinking)",
        "6:50 AM: Cerebrum | 7:00 AM: Medulla | 8:00 AM: Cerebellum",
        "6:50 AM: Cerebellum | 7:00 AM: Cerebrum | 8:00 AM: Medulla",
        "The brain is completely turned off during all three activities"
      ],
      "correct": 0,
      "explanation": "The Medulla manages involuntary life-support (breathing while asleep); the Cerebellum coordinates muscles for balance while walking; the Cerebrum processes logical deductions when solving puzzles.",
      "takeaway": "Suman's day: Sleeping breathing = Medulla | Walking balance = Cerebellum | Thinking puzzle = Cerebrum."
    },
    {
      "id": "l4_q22",
      "category": "scenario",
      "source": "Thinkbook • Sheet 3 • Q3",
      "wsNumber": 3,
      "marks": "2 Marks",
      "body": "In Thinkbook Sheet 3, a diagram depicts an isolated nerve running directly from the right wrist straight down to the right ankle, without any connection to the spine or brain. Could such a nerve exist in a living human body?",
      "options": [
        "Yes, because wrists and ankles need to communicate directly when running",
        "No, because ALL peripheral nerves must connect to the Central Nervous System (brain or spinal cord) to send and receive commands!",
        "Yes, but only in professional gymnasts and sprinters",
        "No, because nerves only exist inside the skull"
      ],
      "correct": 1,
      "explanation": "Nerves do not communicate in isolated loops between distant limbs. All peripheral nerve pathways route into the Central Nervous System (spinal cord or brain) to process data and dispatch coordinated muscle commands.",
      "takeaway": "Biological law: All nerves must route through the Central Nervous System (Brain / Spine)."
    }
  ]
},

  // ------------------------------------------------------------------------
  // CHAPTER 4: L-5 GOOD HEALTH
  // ------------------------------------------------------------------------
  {
    id: 'ch5_health',
    number: 'L-5',
    title: 'Good Health & Nutrition',
    sub: 'Nutrients, Food Pyramid, Deficiency Diseases & Hygiene',
    themeColor: '#06b6d4',
    icon: '🥗',
    summary: 'Explore balanced diets, the body’s energy reserves during fasting, deficiency diseases, vectors like mosquitoes, and the immune defense shield.',

    learnCards: [
      {
        badge: 'Nutrient Architecture',
        title: '🧱 The Body’s Construction & Fuel',
        metaphor: 'Your body is an active skyscraper: Carbs are the electricity, Proteins are the steel beams, Fats are the thermal insulation, and Vitamins are the master repair tools!',
        points: [
          '<strong>Carbohydrates:</strong> Immediate energy providers (rice, potatoes, bread, glucose).',
          '<strong>Proteins:</strong> Body-building nutrients for growth, cellular repair, and muscle building (eggs, pulses, fish, milk).',
          '<strong>Fats:</strong> Concentrated reserve fuel, shock absorbers for vital organs, and thermal blankets keeping the body warm (butter, ghee, oil, nuts).',
          '<strong>Vitamins & Minerals:</strong> Protective nutrients required in small amounts to ward off infections and sustain organ function.',
          '<strong>Roughage (Dietary Fiber):</strong> Indigestible plant material essential for bowel regularity and waste elimination.'
        ],
        thinkPrompt: 'Why does a marathon runner drink glucose water right before a race instead of eating a big block of cheese?'
      },
      {
        badge: 'Metabolic Deduction',
        title: '🔋 The Emergency Power Bank',
        metaphor: 'Why didn’t Shama faint after fasting for 2 whole days? Her body activated its secret internal pantry!',
        points: [
          'When food intake pauses, blood glucose levels are maintained by breaking down <strong>glycogen</strong> stored in the liver.',
          'Once glycogen is depleted, the body taps into <strong>adipose fat reserves</strong>, burning them to release continuous energy for the brain and heart.',
          'This stored reserve keeps vital organs functioning smoothly during temporary fasting.'
        ],
        thinkPrompt: 'If fats give more energy than carbs, why don’t we just eat 100% butter every single day?'
      },
      {
        badge: 'Nutritional Traps',
        title: '⚠️ Deficiency Diseases',
        metaphor: 'Missing just one micronutrient is like missing a tiny screw in an aircraft engine — symptoms begin showing quickly!',
        points: [
          '<strong>Vitamin A → Night Blindness:</strong> Inability to see in dim light (Sources: carrots, papaya, green leafy vegetables).',
          '<strong>Vitamin B1 → Beriberi:</strong> Affects the heart and nervous system, causing muscle weakness (Sources: unpolished rice, cereals, milk).',
          '<strong>Vitamin C → Scurvy:</strong> Bleeding gums and loose teeth (Sources: amla, citrus fruits, tomatoes).',
          '<strong>Vitamin D & Calcium → Rickets:</strong> Soft bones leading to bowed legs and pigeon chest in children (Sources: sunlight, milk, eggs).',
          '<strong>Iron → Anaemia:</strong> Lack of red blood cell haemoglobin; person feels chronically tired and pale (Sources: dates, spinach, apples, jaggery).',
          '<strong>Iodine → Goitre:</strong> Swelling of the thyroid gland in the neck region (Source: iodised salt).'
        ],
        thinkPrompt: 'Why do doctors tell kids with bowed legs to play outside in morning sunlight and drink fresh milk?'
      },
      {
        badge: 'Disease & Defense',
        title: '🛡️ The Immune Fortress & Vectors',
        metaphor: 'Germs are microscopic invaders; your immune system is the castle guard; and mosquitoes are hostile transport helicopters!',
        points: [
          '<strong>Pathogen:</strong> Disease-causing microscopic germ (bacteria, virus, protozoa, fungi). When it multiplies inside you, it causes an <strong>infection</strong>.',
          '<strong>Vector:</strong> An organism (like female Anopheles mosquito) that carries pathogens from an infected person to a healthy host.',
          '<strong>Mosquito Control:</strong> Mosquitoes lay eggs in stagnant water. Spraying a thin film of kerosene or oil on water prevents larvae from breathing oxygen, cutting off the life cycle!',
          '<strong>Vaccination:</strong> Introduces weakened antigens to train your immune system to produce antibodies without falling ill.'
        ],
        thinkPrompt: 'How does pouring a spoonful of oil on a puddle in your garden protect your whole neighborhood from dengue?'
      }
    ],

    examTraps: [
      {
        id: 'trap_l5_fasting',
        student: 'Sameer',
        question: 'Shama did not eat food for two days during a religious fast, yet she remained healthy and active. Explain why.',
        studentAnswer: 'Shama didn’t need any energy because she was resting and sleeping all day.',
        prompt: 'What physiological principle did Sameer overlook?',
        options: [
          'The human body completely shuts down internal energy consumption during sleep and fasting.',
          'The stomach produces its own carbohydrates when empty to sustain daily physical activity.',
          'Even when resting, the body requires continuous energy for vital organs (heart, lungs, brain), which it obtains by breaking down stored liver glycogen and body fats.'
        ],
        correctIndex: 2,
        teacherFeedback: 'Spot on! The basal metabolic rate keeps organs functioning. Shama’s body unlocked energy by hydrolyzing stored glycogen and adipose fat reserves.'
      },
      {
        id: 'trap_l5_milk',
        student: 'Kavya',
        question: 'Is milk a complete food for growing school children? Justify.',
        studentAnswer: 'Yes, milk has 100% of everything, so children never need to eat fruits, vegetables, or green salads if they drink milk.',
        prompt: 'Diagnose Kavya’s dangerous nutrition misconception:',
        options: [
          'While milk is nutritious and provides calcium and protein, it lacks iron, vitamin C, and dietary roughage (fiber) needed for a balanced diet!',
          'Milk contains too much dietary fiber, which blocks the absorption of essential vitamins in the intestine.',
          'Milk only provides water and fats, so it cannot support bone or muscle development.'
        ],
        correctIndex: 0,
        teacherFeedback: 'Brilliant catch! Milk is an excellent food for infants, but growing kids and adults require iron (for blood), vitamin C (for immunity), and dietary fiber (for digestion).'
      },
      {
        id: 'trap_l5_mosquito',
        student: 'Sneha',
        question: 'What is the most effective way to prevent the spread of malaria in a neighborhood?',
        studentAnswer: 'Take malaria tablets every day before going to school so mosquitoes will not breed in garden puddles.',
        prompt: 'Where did Sneha confuse preventive measures?',
        options: [
          'Malaria tablets only kill mosquito larvae when washed into puddles through rainwater runoff.',
          'Tablets treat disease in humans after infection, but eliminating stagnant water and applying an oil film suffocates mosquito larvae, stopping vector breeding at the source!',
          'Malaria is airborne like influenza, so wearing face masks in the classroom is more effective than eliminating standing water.'
        ],
        correctIndex: 1,
        teacherFeedback: 'Exactly right! Breaking the vector breeding cycle by removing stagnant water is public health priority #1.'
      },
      {
        id: 'trap_l5_nutrients',
        student: 'Vikram',
        question: 'Classify carbohydrates and proteins based on their nutritional functions.',
        studentAnswer: 'Carbohydrates build body muscles and heal wounds, while proteins are fast fuels burned for sprint energy.',
        prompt: 'Identify Vikram’s nutrient swap error:',
        options: [
          'Carbohydrates and proteins both build muscle tissue equally, while only fats supply daily calories.',
          'Vikram reversed them: Carbohydrates are primary energy fuels (glucose); Proteins are body-building blocks for growth and tissue repair!',
          'Proteins only protect the body from germs like vitamins, while carbohydrates provide structural bone strength.'
        ],
        correctIndex: 1,
        teacherFeedback: 'Perfect teacher diagnosis! Carbohydrates supply quick fuel (glucose). Proteins supply amino acids to construct and repair muscle fibers.'
      }
    ],

    questions: [
      {
        id: 'l5_q1',
        category: 'mcq',
        source: 'Worksheet I • Q1',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'When a disease-causing pathogen enters and multiplies inside your body tissues, the medical condition is termed a/an __________.',
        options: [
          'Vaccination',
          'Infection',
          'Treatment',
          'Injection'
        ],
        correct: 1,
        explanation: 'Infection occurs when pathogenic microorganisms (bacteria, viruses) invade and multiply within the host’s tissues.',
        takeaway: 'Pathogen multiplication = Infection.'
      },
      {
        id: 'l5_q2',
        category: 'mcq',
        source: 'Worksheet I • Q2',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Deficiency of which vitamin causes soft, weakened bones resulting in bowed legs and pigeon chest among growing children?',
        options: [
          'Vitamin A',
          'Vitamin B1',
          'Vitamin C',
          'Vitamin D'
        ],
        correct: 3,
        explanation: 'Vitamin D facilitates calcium absorption into bone matrices. Its deficiency leads to Rickets in children, characterized by soft, curved leg bones.',
        takeaway: 'Bowed legs & pigeon chest → Rickets (Vitamin D & Calcium deficiency).'
      },
      {
        id: 'l5_q3',
        category: 'mcq',
        source: 'Worksheet I • Q4',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Complete the scientific analogy:<br><strong>Virus : Polio :: __________ : Typhoid</strong>',
        options: [
          'Protozoa',
          'Fungi',
          'Bacteria',
          'Algae'
        ],
        correct: 2,
        explanation: 'Polio is caused by a virus (Poliovirus); Typhoid is caused by a bacterium (Salmonella Typhi).',
        takeaway: 'Polio = Virus | Typhoid = Bacteria | Malaria = Protozoa | Ringworm = Fungi.'
      },
      {
        id: 'l5_q4',
        category: 'mcq',
        source: 'Worksheet I • Q6 & Worksheet II • Section V',
        wsNumber: 1,
        marks: '1 Mark',
        image: 'images/l5_vector_mosquito.png',
        body: 'The illustration below shows insect <strong>Z</strong> (a mosquito vector) feeding on a human host. Mosquitoes lay eggs on stagnant water surfaces and transmit life-threatening diseases like malaria and dengue.<br><strong>Which combination of measures effectively controls the population of vector Z?</strong><br>i. Keeping our surroundings clean<br>ii. Spraying chemicals that kill mosquitoes<br>iii. Taking medicines that prevent such diseases<br>iv. Spraying a thin film of oil on stagnant water surfaces',
        options: [
          'i, ii, and iv',
          'i and ii only',
          'i and iii only',
          'All of the above options'
        ],
        correct: 0,
        explanation: 'Keeping surroundings clean (i), spraying insecticides (ii), and applying a thin film of oil on stagnant water (iv) directly eradicate mosquitoes and suffocate their larvae (oil blocks their breathing siphon tubes). Taking medicines (iii) treats infected individuals, but does not control or reduce the mosquito vector population in the environment.',
        takeaway: 'Vector control = Sanitation + chemical spraying + oil film on stagnant water to suffocate larvae (i, ii, iv).'
      },
      {
        id: 'l5_q5',
        category: 'mcq',
        source: 'Worksheet I • Q10',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Which nutrient provides the fastest, most readily accessible energy to the human bloodstream?',
        options: [
          'Butter',
          'Boiled egg',
          'Glucose',
          'Lemon'
        ],
        correct: 2,
        explanation: 'Glucose is a simple monosaccharide sugar that requires no complex digestion and is absorbed directly into the bloodstream for immediate cellular respiration.',
        takeaway: 'Instant energy = Glucose.'
      },
      {
        id: 'l5_q6',
        category: 'whoami',
        source: 'Worksheet II • Part V & VI',
        wsNumber: 2,
        marks: '1 Mark',
        body: '<strong>Who am I?</strong><br>I am an organism (such as a mosquito or housefly) that carries pathogens from an infected person to a healthy host without suffering from the disease myself.',
        options: [
          'Parasite',
          'Vector',
          'Antibiotic',
          'Vaccine'
        ],
        correct: 1,
        explanation: 'A vector is an intermediate biological carrier that transmits infectious pathogens from one host to another.',
        takeaway: 'Disease carrier organism = Vector.'
      },
      {
        id: 'l5_q7',
        category: 'whoami',
        source: 'Worksheet II • Part VI',
        wsNumber: 2,
        marks: '1 Mark',
        body: '<strong>Who am I?</strong><br>I am the fibrous, undigested plant material in whole grains and raw fruits that adds bulk to stools and prevents constipation.',
        options: [
          'Roughage (Dietary Fiber)',
          'Glucose',
          'Cholesterol',
          'Adipose tissue'
        ],
        correct: 0,
        explanation: 'Roughage cannot be digested by human enzymes, but it absorbs water and facilitates peristaltic movement through the intestines.',
        takeaway: 'Digestive cleaner bulk = Roughage.'
      },
      {
        id: 'l5_q8',
        category: 'compare',
        source: 'Worksheet II • Part III',
        wsNumber: 2,
        marks: '2 Marks',
        body: '<strong>Compare & Contrast:</strong> Beriberi vs Anaemia.<br>What is the key causative deficiency and symptom difference?',
        options: [
          'Beriberi is caused by Vitamin B1 deficiency affecting the nervous system & heart; Anaemia is caused by Iron deficiency causing fatigue and pallor.',
          'Beriberi is caused by lack of water; Anaemia is caused by lack of fats.',
          'Beriberi causes bleeding gums; Anaemia causes bowed leg bones.'
        ],
        correct: 0,
        explanation: 'Beriberi arises from deficient thiamine (Vit B1) impacting nerve conduction; Anaemia arises from insufficient iron to synthesize oxygen-carrying haemoglobin.',
        takeaway: 'Beriberi = Vitamin B1 (Nerves/Heart) | Anaemia = Iron (Low Haemoglobin/Fatigue).'
      },
      {
        id: 'l5_q9',
        category: 'compare',
        source: 'Worksheet III • Long Answer',
        wsNumber: 3,
        marks: '2 Marks',
        body: '<strong>Compare & Contrast:</strong> Communicable vs Non-communicable Diseases.<br>What is the fundamental distinction?',
        options: [
          'Communicable diseases spread from person to person via germs/air/water/vectors (e.g. flu, cholera); Non-communicable diseases do not spread (e.g. diabetes, rickets).',
          'Communicable diseases are caused by eating apples; Non-communicable diseases are caused by drinking water.',
          'Communicable diseases only affect animals; Non-communicable diseases affect humans.'
        ],
        correct: 0,
        explanation: 'Infectious diseases pass between individuals through biological agents; non-infectious conditions stem from nutritional deficiencies, lifestyle, or genetics.',
        takeaway: 'Communicable = Spreads via germs | Non-communicable = Deficiency or lifestyle, does not spread.'
      },
      {
        id: 'l5_q10',
        category: 'oddone',
        source: 'Worksheet I & II Synthesis',
        wsNumber: 1,
        marks: '1.5 Marks',
        body: '<strong>Choose the Odd One Out and Justify:</strong><br>Scurvy, Goitre, Malaria, Rickets.',
        options: [
          'Malaria is the odd one out: It is a communicable disease caused by a protozoan parasite and spread by a mosquito; Scurvy, Goitre, and Rickets are non-communicable nutritional deficiency diseases.',
          'Goitre because it affects the neck.',
          'Rickets because adults do not get it.'
        ],
        correct: 0,
        explanation: 'Scurvy (Vit C), Goitre (Iodine), and Rickets (Vit D) are nutritional deficiency disorders. Malaria is a protozoan infection transmitted by the female Anopheles mosquito vector.',
        takeaway: 'Vector-borne infection vs Nutrient deficiencies.'
      },
      {
        id: 'l5_q11',
        category: 'scenario',
        source: 'Worksheet II • Scenario I (Shama’s Fasting)',
        wsNumber: 2,
        marks: '2 Marks',
        body: 'Shama fasted for two days drinking only water, yet she felt perfectly alert and walked normally. What biological mechanism supplied her energy?',
        options: [
          'Her body hydrolyzed stored liver glycogen and tapped into adipose fat reserves to release glucose and ketones for energy.',
          'Her body went into hibernation and required zero calories.',
          'Water provided her body with 2,000 calories per glass.'
        ],
        correct: 0,
        explanation: 'The liver and adipose tissue act as metabolic buffers. During periods of fasting, stored glycogen is broken down first, followed by triglycerides from fat stores.',
        takeaway: 'Body energy backup: Stored Glycogen → Stored Fats.'
      },
      {
        id: 'l5_q12',
        category: 'scenario',
        source: 'Worksheet II • Scenario VII (Danny’s Legs)',
        wsNumber: 2,
        marks: '2 Marks',
        image: 'images/l5_danny_rickets.png',
        body: 'A school health checkup reveals that 10-year-old Danny has curved, outward-bowed leg bones and complains of bone ache.<br><strong>What disorder is Danny suffering from, and what dietary changes are prescribed?</strong>',
        options: [
          'Rickets caused by Vitamin D & Calcium deficiency; he must consume milk, eggs, fish, and get morning sunlight exposure.',
          'Goitre caused by lack of salt; he must eat more potato chips.',
          'Scurvy caused by lack of lemons; he must drink lemonade only.'
        ],
        correct: 0,
        explanation: 'In growing children, inadequate calcium and vitamin D prevent bone mineralization, causing the weight of the upper body to bow the leg bones outward (Rickets).',
        takeaway: 'Rickets treatment: Calcium-rich dairy, eggs, and sunlight for Vitamin D synthesis.'
      },
      {
        id: 'l5_q13',
        category: 'scenario',
        source: 'Worksheet II • Part IV (Tim & Bob’s Classroom Rule)',
        wsNumber: 2,
        marks: '2 Marks',
        body: 'When Tim sneezed without covering his face, his friend Bob asked him to cover his mouth with a handkerchief. Why is Bob’s advice scientifically vital?',
        options: [
          'Sneezing propels thousands of microscopic droplet nuclei laden with germs into the air, spreading airborne communicable diseases to nearby peers.',
          'Sneezing in open air causes the room temperature to drop rapidly.',
          'Covering the mouth makes the sound softer for people sleeping.'
        ],
        correct: 0,
        explanation: 'Respiratory pathogens (like influenza virus) travel in microscopic aerosols. Covering the mouth stops droplet expulsion and prevents disease transmission.',
        takeaway: 'Respiratory hygiene halts the airborne spread of communicable pathogens.'
      },
      {
        id: 'l5_q14',
        category: 'worksheet',
        source: 'Worksheet III • Long Answer I',
        wsNumber: 3,
        marks: '2 Marks',
        image: 'images/l5_food_pyramid.png',
        body: 'Observe the Food Pyramid diagram below with levels <strong>P, Q, R, and S</strong>.<br>Bob met with an accident and underwent major surgery. His doctor advised him to consume a large quantity of the nutrient represented by <strong>Level Q</strong> during his hospital recovery.<br><strong>Why was Level Q prescribed for Bob?</strong>',
        options: [
          'Level Q represents Proteins (pulses, milk, eggs, fish), which are bodybuilding nutrients essential for cellular growth and rapid repair of damaged body tissues post-surgery.',
          'Level Q represents Carbohydrates needed only for running sprints.',
          'Level Q represents Fats (Level P) to keep his body warm.',
          'Level Q represents roughage to clean his teeth.'
        ],
        correct: 0,
        explanation: 'Proteins (Level Q) are the fundamental building blocks of the human body. They are indispensable for cellular mitosis, synthesis of new muscle fibers, wound healing, and tissue regeneration after surgery. (Level P = Fats & Sweets, Level R = Fruits & Vegetables / Vitamins & Minerals, Level S = Cereals & Grains / Carbohydrates).',
        takeaway: 'Food Pyramid Level Q = Proteins (body-building & tissue repair post-surgery).'
      },
      {
        id: 'l5_q15',
        category: 'scenario',
        source: 'Worksheet II & III • Clinical Case Study',
        wsNumber: 3,
        marks: '2 Marks',
        image: 'images/l5_goitre.png',
        body: 'The illustration below depicts a patient suffering from abnormal enlargement of the thyroid gland in the front of the neck.<br><strong>Identify this disease, its root deficiency cause, and how it is easily prevented at home:</strong>',
        options: [
          'Goitre; caused by deficiency of mineral Iodine; prevented by using iodised salt regularly in daily meals.',
          'Scurvy; caused by lack of Vitamin C; prevented by eating oranges.',
          'Anaemia; caused by lack of Iron; prevented by drinking apple juice.',
          'Rickets; caused by lack of Vitamin D; prevented by sitting under electric lamps.'
        ],
        correct: 0,
        explanation: 'Goitre is an abnormal swelling of the thyroid gland in the neck caused by a deficiency of Iodine. Using iodised salt in cooking supplies the required trace iodine.',
        takeaway: 'Neck swelling = Goitre caused by Iodine deficiency. Prevent with iodised salt.'
      },
      {
        id: 'l5_q16',
        category: 'scenario',
        source: 'Worksheet III • Section IV (Tim\'s Backyard)',
        wsNumber: 3,
        marks: '2 Marks',
        image: 'images/l5_stagnant_water.png',
        body: 'The sketch below depicts conditions in Tim\'s backyard with uncollected refuse, discarded open containers, and puddles of stagnant water.<br><strong>What type of diseases are Tim and his family most prone to in this environment, and what are the two most crucial preventive steps?</strong>',
        options: [
          'Communicable diseases like malaria and dengue; prevented by disposing of garbage properly and eliminating stagnant water so mosquitoes cannot breed.',
          'Non-communicable deficiency diseases like scurvy; prevented by eating oranges.',
          'Genetic disorders; prevented by taking hot baths.',
          'Pneumonia caused by air conditioning; prevented by opening windows.'
        ],
        correct: 0,
        explanation: 'Uncollected rubbish and stagnant rainwater pools create ideal breeding grounds for disease vectors (female Anopheles mosquitoes for malaria, Aedes mosquitoes for dengue, and houseflies for cholera). The best defense is maintaining clean surroundings, covering water storage containers, and preventing water from stagnating.',
        takeaway: 'Stagnant water + open trash = Mosquito breeding → Communicable vector-borne outbreaks (Malaria & Dengue).'
      },
      {
        id: 'l5_q17',
        category: 'scenario',
        source: 'Worksheet I • Q5 (Uncovered Food & Vectors)',
        wsNumber: 1,
        marks: '1 Mark',
        image: 'images/l5_uncovered_food_flies.png',
        body: 'Observe the scenario in the illustration below where food is left uncovered and swarmed by houseflies.<br><strong>The scenario in this picture will lead directly to the spread of which disease?</strong>',
        options: [
          'Cholera',
          'Malaria',
          'Ringworm',
          'Night blindness'
        ],
        correct: 0,
        explanation: 'Houseflies sit on garbage, drains, and fecal matter, collecting pathogenic bacteria on their hairy legs and mouthparts. When they land on uncovered food, they transfer these microbes. Consuming this contaminated food or water leads to cholera, typhoid, and severe diarrheal infections.',
        takeaway: 'Uncovered food + housefly vectors = Food-borne diseases like Cholera. Always keep food covered!'
      },
      {
        id: 'l5_q18',
        category: 'mcq',
        source: 'Worksheet I • Q7 (Match Nutrients & Sources)',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Match the following vitamins and minerals with their food sources:<br><strong>P</strong> Calcium → (i) peas<br><strong>Q</strong> Vitamin B → (ii) amla<br><strong>R</strong> Iron → (iii) milk<br><strong>S</strong> Vitamin C → (iv) dates<br><strong>Choose the correct matching:</strong>',
        options: [
          'P–i, Q–ii, R–iii, S–iv',
          'P–iii, Q–i, R–iv, S–ii',
          'P–ii, Q–i, R–iv, S–iii',
          'P–iv, Q–iii, R–ii, S–i'
        ],
        correct: 1,
        explanation: 'Calcium is abundant in milk (P–iii). Vitamin B is found in peas and unpolished rice (Q–i). Iron is rich in dates and spinach (R–iv). Vitamin C is abundant in amla and citrus fruits (S–ii).',
        takeaway: 'Calcium→Milk | Vitamin B→Peas/Unpolished rice | Iron→Dates/Spinach | Vitamin C→Amla/Citrus'
      },
      {
        id: 'l5_q19',
        category: 'mcq',
        source: 'Worksheet I • Q9 (Immune System)',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Our body has a natural defense system that produces white blood cells and antibodies to fight against invading pathogens (germs). This protective system is called the __________.',
        options: [
          'Digestive system',
          'Muscular system',
          'Respiratory system',
          'Immune system'
        ],
        correct: 3,
        explanation: 'The immune system is the body\'s defense shield. White blood cells (WBCs) identify and destroy bacteria and viruses, while antibodies neutralize toxins produced by pathogens.',
        takeaway: 'Immune system = Body\'s defense army of WBCs + Antibodies fighting germs.'
      },
      {
        id: 'l5_q20',
        category: 'mcq',
        source: 'Worksheet I • Q11 (Naseem\'s Diet)',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Naseem\'s doctor suggested she should include fish, unpolished rice, and cereals in her diet regularly. Based on these food recommendations, Naseem is suffering from __________ deficiency.',
        options: [
          'Vitamin A',
          'Vitamin C',
          'Vitamin D',
          'Vitamin B'
        ],
        correct: 3,
        explanation: 'Fish, unpolished rice, and cereals are all rich sources of Vitamin B complex. Deficiency of Vitamin B causes Beriberi (affecting heart and nervous system).',
        takeaway: 'Vitamin B sources: Fish, unpolished rice, cereals, peas. Deficiency → Beriberi.'
      },
      {
        id: 'l5_q21',
        category: 'scenario',
        source: 'Worksheet II • Section II (Night Blindness)',
        wsNumber: 2,
        marks: '2 Marks',
        body: 'Complete the table:<br>A person cannot see properly in dim light or darkness. This condition is called __________.<br><strong>Identify the deficiency disease, the missing vitamin, and name two food sources rich in this vitamin.</strong>',
        options: [
          'Night blindness; caused by Vitamin A deficiency. Food sources: carrots, green leafy vegetables, milk, and liver.',
          'Color blindness; caused by Vitamin C deficiency. Food sources: oranges and lemons.',
          'Short-sightedness; caused by Iron deficiency. Food sources: dates and spinach.',
          'Snow blindness; caused by Calcium deficiency. Food sources: milk and cheese.'
        ],
        correct: 0,
        explanation: 'Vitamin A is essential for the light-sensitive pigment rhodopsin in the retina. Without it, the eyes cannot adjust to low-light conditions, causing night blindness.',
        takeaway: 'Night blindness = Vitamin A deficiency. Eat: Carrots 🥕, leafy greens 🥬, milk 🥛.'
      },
      {
        id: 'l5_q22',
        category: 'scenario',
        source: 'Worksheet II • Section VIII (True/False Reasoning)',
        wsNumber: 2,
        marks: '2 Marks',
        body: '"Milk is called a complete food because it contains ALL nutrients required by the human body." <br><strong>Is this statement TRUE or FALSE? Reason out your answer.</strong>',
        options: [
          'FALSE — Milk contains most nutrients (proteins, fats, carbohydrates, calcium, Vitamin A, D) and is nearly complete for infants. However, it lacks sufficient Vitamin C, Iron, and dietary roughage (fiber) needed by older children and adults.',
          'TRUE — Milk contains every single nutrient including Vitamin C, Iron, and fiber in perfect quantities.',
          'FALSE — Milk only contains water and calcium, nothing else.',
          'TRUE — Milk is the only food anyone ever needs to survive forever.'
        ],
        correct: 0,
        explanation: 'Milk is called an almost-complete food because it provides proteins, fats, carbs, calcium, and several vitamins. But it is deficient in Vitamin C, Iron, and roughage (fiber).',
        takeaway: 'Milk = Almost complete food, but LACKS Vitamin C, Iron, and dietary fiber.'
      },
      {
        id: 'l5_q23',
        category: 'scenario',
        source: 'Worksheet III • Section II (Karan & Raj Picnic)',
        wsNumber: 3,
        marks: '3 Marks',
        body: 'Karan and Raj went for a school picnic. Raj carried drinking water from home. Karan drank water from pouches available at a roadside stall and later fell very sick with severe diarrhea and vomiting.<br><strong>Why did Karan fall sick? What disease could he have? Suggest one method to make water safe for drinking.</strong>',
        options: [
          'Karan drank contaminated/unsafe roadside water containing harmful germs → Water-borne disease Cholera. Water can be made safe by boiling it before drinking.',
          'Karan ate too much food at the picnic causing overeating → Obesity. Solution: eat less food.',
          'Karan was bitten by a mosquito at the picnic → Malaria. Solution: use mosquito net.',
          'Karan drank cold water causing a sore throat → Common cold. Solution: drink warm water.'
        ],
        correct: 0,
        explanation: 'Roadside water pouches may contain harmful bacteria from unclean water sources. Cholera is a dangerous water-borne disease caused by contaminated drinking water. Boiling kills bacteria and parasites.',
        takeaway: 'Unhygienic water → Cholera (water-borne). Prevention: Boil water before drinking!'
      },
      {
        id: 'l5_q24',
        category: 'scenario',
        source: 'Worksheet III • Section III (Dr. Meera\'s Clinic)',
        wsNumber: 3,
        marks: '5 Marks',
        body: 'At Dr. Meera\'s clinic: <strong>Ben</strong> eats junk food and is overweight; <strong>Tom</strong> can\'t see in the dark; <strong>Bob</strong> has bleeding gums; <strong>Kim</strong> has neck swelling; <strong>Jim</strong> fractures bones easily.<br><strong>Identify the disease AND nutritional cause for EACH patient.</strong>',
        options: [
          'Ben: Obesity (excess junk food/fats) | Tom: Night blindness (Vitamin A deficiency) | Bob: Scurvy (Vitamin C deficiency) | Kim: Goitre (Iodine deficiency) | Jim: Osteoporosis (Calcium/Vitamin D deficiency).',
          'All five patients have the same disease: Malaria from mosquito bites.',
          'Ben: Malaria | Tom: Cholera | Bob: Typhoid | Kim: Dengue | Jim: Beriberi.',
          'Ben: Scurvy | Tom: Goitre | Bob: Obesity | Kim: Night blindness | Jim: Beriberi.'
        ],
        correct: 0,
        explanation: 'Each patient\'s symptoms map to a specific nutritional deficiency: excess fats→Obesity, no Vitamin A→Night blindness, no Vitamin C→Scurvy (bleeding gums), no Iodine→Goitre (neck swelling), no Calcium→weak brittle bones.',
        takeaway: 'Match symptoms to deficiency: Bleeding gums→Scurvy(VitC) | Can\'t see in dark→Night blindness(VitA) | Neck swelling→Goitre(Iodine) | Brittle bones→Calcium/VitD deficiency.'
      }
    ]
  },

  // ------------------------------------------------------------------------
  // CHAPTER 3: L-7 AIR AND WATER
  // ------------------------------------------------------------------------
  {
    id: 'ch7_air_water',
    number: 'L-7',
    title: 'Air and Water',
    sub: 'Atmosphere Layers, Air Properties, Impurities & Purification',
    themeColor: '#3b82f6',
    icon: '💧',
    summary: 'Discover atmospheric layers, air’s mass and pressure, combustion support, water impurities, sedimentation, decantation, filtration, and distillation.',

    learnCards: [
      {
        badge: 'Atmospheric Layers',
        title: '☁️ The Five Atmospheric Blankets',
        metaphor: 'Earth’s atmosphere is a 5-storey protective bubble shield guarding us against the harsh vacuum of outer space!',
        points: [
          '<strong>Troposphere (0–12 km):</strong> Lowest layer where we live; contains 75% of all air mass and all weather phenomena (clouds, rain, storms).',
          '<strong>Stratosphere (12–50 km):</strong> Calm layer where airplanes fly; contains the critical <strong>Ozone layer</strong> that absorbs harmful UV rays.',
          '<strong>Mesosphere (50–80 km):</strong> Coldest layer where incoming space meteors burn up due to friction with gas molecules.',
          '<strong>Thermosphere (80–500 km):</strong> High temperature layer containing the ionosphere, bouncing radio signals back to Earth.',
          '<strong>Exosphere (>500 km):</strong> Farthest, thinnest boundary transitioning gradually into the vacuum of space.'
        ],
        thinkPrompt: 'Why do commercial jetliners love cruising in the lower stratosphere instead of flying down in the troposphere?'
      },
      {
        badge: 'Properties of Air',
        title: '🎈 Air is NOT "Nothing"!',
        metaphor: 'You cannot grab air in your hand, but it has mass, takes up space, and pushes with tremendous atmospheric pressure!',
        points: [
          '<strong>Air has Mass / Weight:</strong> Tina’s balance experiment proves an inflated balloon tips the scale downward compared to a deflated one.',
          '<strong>Air Occupies Space:</strong> Meena’s tilted bottle in a bucket of water releases bubbles — water cannot enter until trapped air escapes!',
          '<strong>Air Exerts Pressure:</strong> Atmospheric air presses in all directions, allowing us to drink through a straw and suck medicine into a dropper.',
          '<strong>Air Supports Combustion:</strong> Fires require oxygen to burn. Covering a lighted candle with a jar extinguishes the flame as oxygen is consumed.'
        ],
        thinkPrompt: 'Why does soda shoot up into your mouth when you suck on a straw?'
      },
      {
        badge: 'Water Impurities',
        title: '🧪 Soluble vs Insoluble Impurities',
        metaphor: 'Water is the universal solvent, but how we separate what’s inside depends on whether it dissolved or is just floating!',
        points: [
          '<strong>Insoluble Impurities (Sand, Clay, Mud, Sawdust):</strong> Particles remain intact as solid suspensions. Purified by physical settling and straining.',
          '<strong>Soluble Impurities (Salt, Sugar, Chemicals):</strong> Molecules dissociate and spread throughout water. <em>Filter paper cannot catch them!</em> Purified by evaporation or distillation.'
        ],
        thinkPrompt: 'If you pour salty seawater through ten layers of filter paper, will the water come out sweet and fresh? Why not?'
      },
      {
        badge: 'Purification Science',
        title: '🪜 The Purification Staircase & Distilled Water',
        metaphor: 'From dirty river mud to sparkling pure laboratory water, each step uses physical properties to separate components.',
        points: [
          '<strong>Sedimentation:</strong> Leaving muddy water undisturbed so heavy insoluble sand and clay settle to the bottom.',
          '<strong>Decantation:</strong> Gently tilting the beaker to pour off the clearer liquid from the top without disturbing the sediment.',
          '<strong>Filtration:</strong> Passing liquid through porous filter paper. The solid left behind is the <strong>residue</strong>; the clear liquid passed is the <strong>filtrate</strong>.',
          '<strong>Distillation:</strong> Boils water into vapor (leaving soluble salts behind), then cools the vapor in a condenser back into pure liquid.',
          '<strong>The Pure Water Paradox:</strong> Distilled water is 100% chemically pure, ideal for car batteries, inverters, and science labs. However, it is <em>not ideal for daily drinking</em> because it lacks essential minerals like calcium and magnesium!'
        ],
        thinkPrompt: 'Why shouldn’t a family install a distillation plant to prepare all their daily drinking water at home?'
      }
    ],

    examTraps: [
      {
        id: 'trap_l7_salt',
        student: 'Aditya',
        question: 'Sheena collected salty ocean water. Can she remove the salt by passing it through laboratory filter paper? Explain.',
        studentAnswer: 'Yes! Filter paper has tiny microscopic holes, so if you pour salty water through it, the salt gets trapped on top as residue.',
        prompt: 'What physical error did Aditya commit?',
        options: [
          'Filter paper can separate salt, but only if the saltwater is first cooled to freezing temperature.',
          'Salt is a soluble impurity dissolved at the molecular level; its molecules slip right through filter pores! It requires distillation or evaporation.',
          'Filtration separates soluble substances, but evaporation is only used for insoluble sand and chalk.'
        ],
        correctIndex: 1,
        teacherFeedback: 'Outstanding! Filtration only separates insoluble suspended particles (like sand or clay). Dissolved salt ions are smaller than filter pores and require thermal phase change.'
      },
      {
        id: 'trap_l7_distilled',
        student: 'Meera',
        question: 'Should humans exclusively drink distilled water to ensure 100% purity? Justify your answer.',
        studentAnswer: 'Yes, distilled water has zero impurities, so it is the healthiest possible water for our heart and bones to drink forever.',
        prompt: 'Why is Meera’s health assumption flawed?',
        options: [
          'Distilled water lacks vital dietary minerals (calcium, magnesium) that our bodies require for healthy bone structure and metabolic function!',
          'Distilled water contains excessive amounts of chlorine added during the boiling and condensing process.',
          'Distilled water still contains bacterial spores because boiling water cannot kill microorganisms.'
        ],
        correctIndex: 0,
        teacherFeedback: 'Brilliant scientific reasoning! While pure for car batteries and chemistry experiments, natural drinking water must contain dissolved minerals for healthy human physiology.'
      },
      {
        id: 'trap_l7_balloon',
        student: 'Pooja',
        question: 'Does air have weight? Describe what happens on a balance with an inflated and deflated balloon.',
        studentAnswer: 'Air has no weight because balloons float in the sky like clouds.',
        prompt: 'Diagnose Pooja’s misconception:',
        options: [
          'Air only has weight when it is heated, because hot air molecules expand and become heavier.',
          'The scale tilts only because the rubber skin shrinks when deflated, not because air has any measurable mass.',
          'Air has mass and weight. Tina’s balance experiment proves the arm with the inflated balloon tilts down when the other balloon is punctured and deflated!'
        ],
        correctIndex: 2,
        teacherFeedback: 'Spot on! The compressed air inside the inflated balloon adds measurable mass, tipping the balance beam downward.'
      },
      {
        id: 'trap_l7_clouds',
        student: 'Rahul',
        question: 'In which atmospheric layer do clouds, thunderstorms, and rainfall form?',
        studentAnswer: 'Clouds form in the Stratosphere because it is high up and cold.',
        prompt: 'Identify Rahul’s atmospheric layer mistake:',
        options: [
          'Clouds form in the Mesosphere because its freezing temperatures below -90°C freeze moisture instantly.',
          'Clouds, rain, and almost all weather phenomena occur exclusively in the Troposphere, the lowest atmospheric layer containing 75% of air and water vapor!',
          'Clouds form in the Thermosphere where electrical radio waves condense moisture into raindrops.'
        ],
        correctIndex: 1,
        teacherFeedback: 'Perfect teacher deduction! The Troposphere holds 99% of atmospheric water vapor. The Stratosphere is dry and calm, with virtually no cloud formation.'
      }
    ],

    questions: [
      {
        id: 'l7_q1',
        category: 'mcq',
        source: 'Worksheet I • Q1',
        wsNumber: 1,
        marks: '1 Mark',
        image: 'images/l7_balloon_balance.png',
        body: 'Tina balanced two identical inflated balloons on a wooden ruler. When she pricked one balloon, the other side tilted down immediately.<br><strong>Which property of air was demonstrated?</strong>',
        options: [
          'Air is tasteless and odorless',
          'Air has mass / weight',
          'Air supports combustion',
          'Air only moves when heated'
        ],
        correct: 1,
        explanation: 'The balance tipped toward the remaining inflated balloon because the air trapped inside possesses mass and exerts downward gravitational pull.',
        takeaway: 'Inflated balloon tilts balance → Air has mass and weight.'
      },
      {
        id: 'l7_q2',
        category: 'mcq',
        source: 'Worksheet I • Q2',
        wsNumber: 1,
        marks: '1 Mark',
        image: 'images/l7_cockroach_candle.png',
        body: 'When Gauri placed a live cockroach and a lighted candle together under an airtight inverted glass jar (as shown below), she noticed that the flame died out after a short while.<br><strong>What caused the flame to die out?</strong><br>(i) The carbon dioxide that was released by the cockroach.<br>(ii) The oxygen in the jar was used up by the cockroach.<br>(iii) The oxygen in the jar was used up by the flame.<br>(iv) The water vapor that was given out by the cockroach.',
        options: [
          '(ii) and (iii)',
          '(i) and (ii)',
          '(ii), (iii), and (iv)',
          '(i), (ii), and (iii)'
        ],
        correct: 0,
        explanation: 'Combustion is a chemical reaction that requires a continuous supply of oxygen gas ($O_2$). Both the living cockroach (aerobic respiration) and the candle flame (combustion) consumed the finite quantity of oxygen enclosed in the jar (statements ii and iii). Once the oxygen was depleted, the flame could not burn.',
        takeaway: 'Both combustion and respiration consume Oxygen; once depleted, flames extinguish immediately.'
      },
      {
        id: 'l7_q3',
        category: 'mcq',
        source: 'Worksheet I • Q6',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'In which layer of the atmosphere are water vapor clouds formed and all weather systems generated?',
        options: [
          'Ionosphere',
          'Stratosphere',
          'Troposphere',
          'Exosphere'
        ],
        correct: 2,
        explanation: 'The Troposphere extends roughly 10–12 km above sea level and contains almost all atmospheric moisture and convection currents that form clouds.',
        takeaway: 'Troposphere = Weather & cloud layer.'
      },
      {
        id: 'l7_q4',
        category: 'mcq',
        source: 'Worksheet I • Q7',
        wsNumber: 1,
        marks: '1 Mark',
        image: 'images/l7_air_composition.png',
        body: 'The pie graph below illustrates the composition of atmospheric air.<br><strong>Identify the gases represented by slices L and M respectively:</strong>',
        options: [
          'L: Oxygen (21%), M: Nitrogen (78%)',
          'L: Nitrogen (78%), M: Oxygen (21%)',
          'L: Carbon dioxide (21%), M: Nitrogen (78%)',
          'L: Argon (21%), M: Hydrogen (78%)'
        ],
        correct: 0,
        explanation: 'Clean dry air consists of approximately 78% Nitrogen (slice M), 21% Oxygen (slice L), and 1% other trace gases including argon, carbon dioxide, and water vapor.',
        takeaway: 'Air composition pie chart: M = Nitrogen (78%), L = Oxygen (21%). Together = 99%.'
      },
      {
        id: 'l7_q5',
        category: 'whoami',
        source: 'Worksheet II • Section VI',
        wsNumber: 2,
        marks: '1 Mark',
        image: 'images/l7_purification_flowchart.png',
        body: 'Examine the Water Impurities & Purification flowchart below.<br><strong>Which choice accurately identifies impurity categories \'a\' and \'b\', along with purification process \'e\'?</strong>',
        options: [
          'a: Insoluble Impurities (clay, sand) | b: Soluble Impurities (salt) | e: Distillation (or Evaporation)',
          'a: Soluble Impurities | b: Insoluble Impurities | e: Freezing',
          'a: Toxic Chemicals | b: Clean Water | e: Boiling',
          'a: Muddy Water | b: Mineral Water | e: Chlorination'
        ],
        correct: 0,
        explanation: 'Water impurities are divided into two fundamental classes: (a) Insoluble impurities (sand, clay) which settle by gravity and can be removed by sedimentation, decantation (c), or filtration (d); and (b) Soluble impurities (dissolved minerals/salts) which require thermal methods like evaporation or distillation (e).',
        takeaway: 'Impurities flowchart: a = Insoluble (sand/clay) → filtration; b = Soluble (salt) → distillation/evaporation.'
      },
      {
        id: 'l7_q6',
        category: 'whoami',
        source: 'Worksheet I • Q4 & Worksheet II • Section VII',
        wsNumber: 1,
        marks: '1 Mark',
        image: 'images/l7_filtration.png',
        body: 'Observe the filtration setup illustrated below.<br><strong>What type of impurity can be separated from water using this apparatus, and what is the solid material caught on the filter paper called?</strong>',
        options: [
          'Insoluble impurities like sand and clay; the trapped solid is called residue (the clear liquid below is the filtrate).',
          'Soluble impurities like salt; the trapped solid is called solute.',
          'Dissolved sugar; the trapped solid is called sediment.',
          'Atmospheric gases; the trapped solid is called condensation.'
        ],
        correct: 0,
        explanation: 'Filtration separates insoluble solids (like chalk powder, clay, or tea leaves) suspended in a liquid. The solid particles trapped on the filter paper are called the residue, while the clear liquid that passes through into the flask is the filtrate.',
        takeaway: 'Filtration separates insoluble impurities. Trapped on paper = Residue | Liquid in flask = Filtrate.'
      },
      {
        id: 'l7_q7',
        category: 'oddone',
        source: 'Worksheet II • Part I',
        wsNumber: 2,
        marks: '1.5 Marks',
        body: '<strong>Choose the Odd One Out and Justify:</strong><br>Troposphere, Biosphere, Exosphere, Mesosphere.',
        options: [
          'Biosphere is the odd one out: It is the global zone of Earth where living organisms exist, while Troposphere, Mesosphere, and Exosphere are atmospheric layers.',
          'Exosphere because it starts with E.',
          'Mesosphere because it is cold.'
        ],
        correct: 0,
        explanation: 'Troposphere, Mesosphere, and Exosphere are vertical subdivisions of the atmosphere. The Biosphere is the global ecological system of living organisms.',
        takeaway: 'Atmospheric layer classification vs Biological life zone.'
      },
      {
        id: 'l7_q8',
        category: 'oddone',
        source: 'Worksheet II • Part I',
        wsNumber: 2,
        marks: '1.5 Marks',
        body: '<strong>Choose the Odd One Out and Justify:</strong><br>Salt, Sand, Sugar, Alcohol.',
        options: [
          'Sand is the odd one out: It is completely insoluble in water, whereas salt, sugar, and alcohol are all soluble substances that dissolve in water.',
          'Alcohol because it is a liquid.',
          'Salt because it comes from the sea.'
        ],
        correct: 0,
        explanation: 'Salt, sugar, and alcohol dissolve homogeneously in water (soluble). Sand is insoluble and settles as a sediment.',
        takeaway: 'Solubility test: Insoluble (Sand) vs Soluble (Salt, Sugar, Alcohol).'
      },
      {
        id: 'l7_q9',
        category: 'scenario',
        source: 'Worksheet II • Scenario II (Meena’s Bottle)',
        wsNumber: 2,
        marks: '2 Marks',
        image: 'images/l7_tilted_bottle.png',
        body: 'Meena submerged an "empty" glass bottle opening-downward into a bucket of water. No water entered. When she tilted the bottle slightly, air bubbles gushed out and water rushed inside.<br><strong>Which property of air does this prove?</strong>',
        options: [
          'Air occupies space; water could not enter until the trapped air escaped as bubbles.',
          'Air supports combustion.',
          'Water is lighter than air.',
          'Air has no mass.'
        ],
        correct: 0,
        explanation: 'An "empty" bottle is full of invisible air. Because air occupies volume, water cannot enter the rigid container until the air is displaced.',
        takeaway: 'Bubbles escaping tilted bottle → Air occupies space.'
      },
      {
        id: 'l7_q10',
        category: 'scenario',
        source: 'Worksheet II • Scenario IV (Sheena’s Water Samples)',
        wsNumber: 2,
        marks: '3 Marks',
        body: 'Sheena received two contaminated water jars: <strong>Sample A</strong> is clear water with dissolved sea salt. <strong>Sample B</strong> is murky water with heavy insoluble garden clay.<br><strong>What purification methods should she apply to purify both samples?</strong>',
        options: [
          'Sample A requires Distillation (or Evaporation); Sample B requires Sedimentation, Decantation, and Filtration.',
          'Both samples can be cleaned using a common tea strainer.',
          'Sample A requires Filtration; Sample B requires Evaporation.',
          'Pouring cooking oil on both samples.'
        ],
        correct: 0,
        explanation: 'Sample A contains soluble salt that passes through filters, requiring phase-change Distillation. Sample B contains suspended clay, which can be settled (sedimentation), poured off (decantation), and strained through filter paper (filtration).',
        takeaway: 'Soluble salt = Distillation | Insoluble clay = Sedimentation + Decantation + Filtration.'
      },
      {
        id: 'l7_q11',
        category: 'scenario',
        source: 'Worksheet I • Q5 (Distillation Setup)',
        wsNumber: 1,
        marks: '2 Marks',
        image: 'images/l7_distillation.png',
        body: 'Use the distillation setup shown in the diagram below to answer:<br><strong>What is the function of condenser O, and what would happen to the liquid collected in receiving flask N if condenser O were absent from the setup?</strong>',
        options: [
          'Condenser O cools hot steam back into pure liquid droplets; without O, water vapor would escape into the room as steam, resulting in no distilled water collected in flask N.',
          'Condenser O filters insoluble sand particles out of boiling water; without O, flask N would fill with mud.',
          'Condenser O adds essential minerals into the flask; without O, water would taste salty.',
          'Condenser O freezes steam directly into dry ice blocks in flask N.'
        ],
        correct: 0,
        explanation: 'Distillation involves two continuous phase changes: (1) Boiling impure water into steam, leaving soluble impurities behind; (2) The steam passes into the Liebig condenser (O) where cold circulating water cools the vapor, condensing it back into pure liquid that drips into flask N. Without condenser O, hot vapor escapes into the room and cannot be collected!',
        takeaway: 'Distillation setup: Boiling flask → Condenser O (condensation) → Flask N (pure distillate). Without O, vapor escapes!'
      },
      {
        id: 'l7_q12',
        category: 'scenario',
        source: 'Worksheet I • Investigation',
        wsNumber: 1,
        marks: '2 Marks',
        image: 'images/l7_combustion_candle.png',
        body: 'When an inverted glass tumbler is placed over a burning candle as shown below, the flame burns for a few seconds and then extinguishes completely.<br><strong>What does this classic experiment conclusively demonstrate?</strong>',
        options: [
          'Oxygen gas present in the trapped air is essential to support combustion; once the trapped oxygen is consumed, burning stops immediately.',
          'Glass absorbs fire through its transparent walls.',
          'Candles only burn when exposed to direct sunlight.',
          'Carbon dioxide inside the jar is turned into ice.'
        ],
        correct: 0,
        explanation: 'Fire requires oxygen ($O_2$) for chemical combustion. When inverted glass cuts off fresh air, the flame consumes the finite enclosed oxygen and goes out.',
        takeaway: 'Inverted jar over candle → Oxygen is required to support combustion.'
      },
      {
        id: 'l7_q13',
        category: 'mcq',
        source: 'Worksheet I • Q3 (Respiration & Photosynthesis Cycle)',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'In the natural cycle of life, animals breathe in oxygen and release carbon dioxide (respiration). Plants, in the presence of sunlight, absorb carbon dioxide and release oxygen (photosynthesis). This keeps our atmosphere balanced.<br><strong>Which gas do plants release during photosynthesis?</strong>',
        options: [
          'Carbon dioxide',
          'Nitrogen',
          'Oxygen',
          'Hydrogen'
        ],
        correct: 2,
        explanation: 'During photosynthesis, green plants absorb CO₂ and water, and using sunlight energy, produce glucose and release O₂ — the very oxygen animals need to breathe!',
        takeaway: 'Respiration (animals): O₂ in → CO₂ out. Photosynthesis (plants): CO₂ in → O₂ out. Nature\'s perfect balance!'
      },
      {
        id: 'l7_q14',
        category: 'mcq',
        source: 'Worksheet I • Q8 (Humidity)',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'The amount of invisible water vapour present in atmospheric air is called __________.',
        options: [
          'Amount of carbon dioxide present in the air',
          'Amount of rainfall received each day',
          'Humidity',
          'Wind speed'
        ],
        correct: 2,
        explanation: 'Humidity measures the concentration of water vapour (gaseous water) in the atmosphere. High humidity makes air feel sticky and heavy; low humidity makes it feel dry.',
        takeaway: 'Humidity = Water vapour content in air. High humidity → muggy/sticky weather.'
      },
      {
        id: 'l7_q15',
        category: 'scenario',
        source: 'Worksheet II • Section III (Distilled Water Drinking)',
        wsNumber: 2,
        marks: '2 Marks',
        body: 'Distilled water is the purest form of water obtained through distillation. It is free from all impurities, germs, and dissolved substances.<br><strong>Is it advisable to drink distilled water regularly? Justify your answer.</strong>',
        options: [
          'No — distilled water lacks essential dissolved minerals like calcium and magnesium that our body needs for bones, teeth, and proper functioning. Mineral-rich safe drinking water is preferred.',
          'Yes — distilled water is the healthiest water because it has zero impurities.',
          'No — distilled water is poisonous and dangerous to consume.',
          'Yes — distilled water has extra vitamins added during distillation.'
        ],
        correct: 0,
        explanation: 'While distilled water is extremely pure, it has had ALL dissolved minerals removed during the boiling and condensation process. Our body requires trace minerals (calcium, magnesium, fluoride) from drinking water for bone and tooth health.',
        takeaway: 'Distilled water = Pure but mineral-free. Not recommended for daily drinking. Best for labs and batteries.'
      },
      {
        id: 'l7_q16',
        category: 'scenario',
        source: 'Worksheet II • Section VIII (Real-World Applications)',
        wsNumber: 2,
        marks: '2 Marks',
        body: 'Match each real-world scenario with the correct scientific property of air or water purification method:<br>• Muddy river water left standing overnight in a bucket → ________<br>• Using a tea strainer every morning → ________<br>• Hot air balloons rising in the sky → ________<br>• Blowing on a campfire to make it burn brighter → ________',
        options: [
          'Sedimentation & Decantation; Filtration; Hot air rises (less dense); Air supports combustion (oxygen supply).',
          'Distillation; Evaporation; Gravity; Carbon dioxide release.',
          'Filtration; Boiling; Cold air sinks; Air has mass.',
          'Condensation; Sublimation; Air occupies space; Nitrogen release.'
        ],
        correct: 0,
        explanation: 'Mud settles at the bottom (sedimentation), clear water is poured off (decantation). A strainer separates tea leaves (filtration). Heated air becomes less dense and rises (hot air balloon). Blowing supplies more oxygen for combustion.',
        takeaway: 'Everyday science: Muddy water→Sedimentation | Strainer→Filtration | Balloon→Hot air rises | Blowing fire→Oxygen supports combustion.'
      },
      {
        id: 'l7_q17',
        category: 'scenario',
        source: 'Worksheet III • Section IV (Atmospheric Layers Mystery)',
        wsNumber: 3,
        marks: '5 Marks',
        body: '<strong>X</strong> is a layer of the atmosphere where meteoroids entering from space burn up completely due to friction. <strong>Y</strong> is present in layer <strong>Z</strong> and absorbs harmful UV rays from the sun.<br><strong>Identify X, Y, and Z. Also explain how the fourth layer of the atmosphere is helpful to us.</strong>',
        options: [
          'X = Mesosphere (meteoroids burn up from friction); Y = Ozone layer; Z = Stratosphere. The fourth layer (Thermosphere/Ionosphere) reflects radio waves for wireless communication and is where the ISS orbits.',
          'X = Troposphere; Y = Oxygen; Z = Exosphere. The fourth layer stores rainwater.',
          'X = Exosphere; Y = Nitrogen; Z = Troposphere. The fourth layer blocks all sunlight.',
          'X = Stratosphere; Y = Carbon dioxide; Z = Mesosphere. The fourth layer produces wind.'
        ],
        correct: 0,
        explanation: 'The mesosphere (X) burns up space debris through intense atmospheric friction. The ozone layer (Y) in the stratosphere (Z) absorbs harmful ultraviolet radiation. The thermosphere contains the ionosphere, which reflects radio waves enabling broadcasting, and is where the International Space Station orbits.',
        takeaway: 'Layers: Troposphere→Stratosphere (Ozone)→Mesosphere (meteors burn)→Thermosphere (radio waves, ISS)→Exosphere.'
      }
    ]
  },

  // ------------------------------------------------------------------------
  // CHAPTER 4: L-13 STATES OF MATTER
  // ------------------------------------------------------------------------
  {
    id: 'ch13_matter',
    number: 'L-13',
    title: 'States of Matter',
    sub: 'Molecules, Compressibility, Changes of State & Chemical Reactions',
    themeColor: '#8b5cf6',
    icon: '⚗️',
    summary: 'Master solids, liquids, and gases, molecular arrangements, thermal diffusion, sublimation, physical vs chemical changes, solubility, and rusting.',

    learnCards: [
      {
        badge: 'Molecular States',
        title: '💃 The Dance Floor of Molecules',
        metaphor: 'All matter is built of tiny molecules. How tightly they dance determines whether you can walk on it, swim in it, or breathe it!',
        points: [
          '<strong>Solids:</strong> Molecules are tightly packed in an orderly pattern with strong attractive forces. Definite shape and definite volume. Particles only vibrate in fixed spots.',
          '<strong>Liquids:</strong> Molecules are moderately packed with weaker attraction. Indefinite shape (takes the shape of the container) but definite volume. Molecules slide past each other.',
          '<strong>Gases:</strong> Molecules are widely spaced with negligible attractive forces. Indefinite shape and indefinite volume. Molecules zip around at high speeds.'
        ],
        thinkPrompt: 'If you pour 200 mL of water from a tall cylindrical glass into a wide flat plate, which property changes and which remains identical?'
      },
      {
        badge: 'Gas Dynamics',
        title: '💨 Compressibility & CNG Fuel',
        metaphor: 'Because gas molecules have huge empty spaces between them, you can squish an entire room’s worth of gas into a small steel cylinder!',
        points: [
          '<strong>Compressibility:</strong> Gases exhibit maximum compressibility because of vast intermolecular spaces.',
          '<strong>Daily Applications:</strong> Compressed Natural Gas (CNG) cylinders in city buses and Liquefied Petroleum Gas (LPG) kitchen cylinders store massive gas quantities in compact volume under high pressure.',
          'Solids and liquids have virtually zero compressibility because their molecules are already touching.'
        ],
        thinkPrompt: 'Why can you squish an air-filled syringe down with your thumb, but cannot push down a syringe filled with water or sand?'
      },
      {
        badge: 'Thermal Physics',
        title: '☕ The Hot Coffee Scent Rocket',
        metaphor: 'Why does freshly brewed hot coffee aroma reach across the living room in seconds, while cold leftover pizza must be sniffed right at the plate?',
        points: [
          'Molecules in hot substances have <strong>high thermal energy</strong> and high kinetic velocity.',
          'High kinetic energy causes hot vapor molecules to <strong>diffuse</strong> (mix and spread) rapidly through ambient air.',
          'Molecules in cold food move sluggishly, diffusing slowly over short distances.'
        ],
        thinkPrompt: 'Why does incense stick smoke rise and scent the whole house only after you light it on fire?'
      },
      {
        badge: 'Changes of State',
        title: '🧊 Phase Transitions & Sublimation',
        metaphor: 'Heating and cooling change how molecules dance without altering what the substance is made of!',
        points: [
          '<strong>Melting:</strong> Solid → Liquid (Ice turns to water).',
          '<strong>Freezing:</strong> Liquid → Solid (Water turns to ice cubes).',
          '<strong>Evaporation / Boiling:</strong> Liquid → Gas (Water turns to steam).',
          '<strong>Condensation:</strong> Gas → Liquid (Steam forms tiny water droplets on cold pot lid).',
          '<strong>Sublimation:</strong> Solid changes <em>directly into gas</em> without melting into a liquid (e.g. Naphthalene mothballs, Dry Ice / solid $CO_2$, Camphor).',
          '<strong>Deposition:</strong> Gas changes directly into solid (e.g. Frost formation, dry ice manufacturing).'
        ],
        thinkPrompt: 'When mothballs in your winter wardrobe shrink and disappear over months, did they melt and wet your clothes? Where did they go?'
      },
      {
        badge: 'Chemistry Lab',
        title: '🍳 Physical vs Chemical Changes & Rusting',
        metaphor: 'A physical change changes only the suit a molecule wears; a chemical change transforms the molecule into someone entirely new!',
        points: [
          '<strong>Physical Change:</strong> No new substance formed; molecular arrangement changes, but composition is preserved. Usually reversible (e.g. ice melting, cutting apples, cracking egg shells, condensation on bathroom mirror).',
          '<strong>Chemical Change:</strong> New substances with different chemical properties are formed; irreversible (e.g. frying an omelette, sliced apple turning brown due to oxidation, burning wood, rusting iron).',
          '<strong>The Tale of Two Hooks:</strong> Anshul’s iron hook in coastal Kerala rusted in weeks, while Charu’s hook in Rajasthan stayed shiny for years! Why? <em>Rusting requires BOTH oxygen AND moisture!</em> Kerala has humid coastal air; Rajasthan is dry desert air.'
        ],
        thinkPrompt: 'If you paint an iron garden gate with oil paint, why does it stop the gate from rusting?'
      }
    ],

    examTraps: [
      {
        id: 'trap_l13_hotscent',
        student: 'Tina',
        question: 'Why does the aroma of a hot cup of coffee reach you across the room much faster than the smell of cold food?',
        studentAnswer: 'Because cold air is heavier and sinks to the floor, trapping all the cold food smell down there.',
        prompt: 'What kinetic theory fact did Tina miss?',
        options: [
          'Molecules in hot vapors possess high temperature and high kinetic energy, enabling rapid molecular diffusion through air; cold molecules have low kinetic energy and diffuse slowly.',
          'Cold food aroma molecules react chemically with nitrogen in the air, neutralizing their scent before reaching human noses.',
          'Room air currents only circulate towards warm objects, pulling hot scent molecules directly into people’s faces.'
        ],
        correctIndex: 0,
        teacherFeedback: 'Spot on! Temperature is a measure of average kinetic energy. Higher temperature → higher velocity → faster rate of molecular diffusion.'
      },
      {
        id: 'trap_l13_rust',
        student: 'Siddharth',
        question: 'An iron nail was placed in a sealed tube with completely dry air (zero moisture). Will it rust after two months? Explain.',
        studentAnswer: 'Yes, because air contains 21% oxygen and iron only needs oxygen gas to rust.',
        prompt: 'Diagnose Siddharth’s chemical error:',
        options: [
          'Iron only rusts in the presence of carbon dioxide; atmospheric oxygen gas has no role in rusting.',
          'Rusting is an electrochemical oxidation reaction requiring BOTH oxygen gas AND water/moisture! Without moisture, iron cannot rust.',
          'Rusting only requires liquid water, so the oxygen content of dry air is completely irrelevant.'
        ],
        correctIndex: 1,
        teacherFeedback: 'Brilliant teacher diagnosis! This is demonstrated by the Tale of Two Hooks: Charu’s iron hook in arid Rajasthan did not rust because the dry desert air lacked moisture.'
      },
      {
        id: 'trap_l13_sublimation',
        student: 'Varun',
        question: 'Naphthalene balls kept in woollen clothes disappear over a few months without leaving any liquid stain. Name and explain the process.',
        studentAnswer: 'The naphthalene balls melted into a clear liquid oil that soaked invisibly into the clothes.',
        prompt: 'Where did Varun misunderstand the state change?',
        options: [
          'The mothballs condensed into water vapor that dissolved into room humidity during temperature fluctuations.',
          'The mothballs were eaten and chemically digested by microscopic clothes insects.',
          'Naphthalene undergoes Sublimation — it transitions directly from a solid into a gas without passing through an intermediate liquid phase!'
        ],
        correctIndex: 2,
        teacherFeedback: 'Outstanding! Sublimation skips the liquid phase entirely, which is why clothes stay completely dry while absorbing the insect-repelling vapor.'
      },
      {
        id: 'trap_l13_sugar',
        student: 'Diya',
        question: 'When sugar crystals dissolve in water, is it a physical or a chemical change? Justify.',
        studentAnswer: 'It is a chemical change because the solid sugar disappeared completely, so the sugar molecules were destroyed.',
        prompt: 'Why is Diya’s conclusion incorrect?',
        options: [
          'It is a physical change: Sugar molecules simply disperse into spaces between water molecules. No new substance is formed, the solution tastes sweet, and sugar crystals can be recovered by evaporating the water!',
          'It is a chemical change because a new liquid compound with a different boiling point and density is created.',
          'Dissolving is neither physical nor chemical, because the sugar molecules are permanently split into individual atoms.'
        ],
        correctIndex: 0,
        teacherFeedback: 'Perfect teacher deduction! Dissolution is a physical change. The molecular identity of sucrose ($C_{12}H_{22}O_{11}$) remains unchanged throughout.'
      }
    ],

    questions: [
      {
        id: 'l13_q1',
        category: 'mcq',
        source: 'Worksheet I • Q2',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Match each state of matter with its definitive shape and volume properties:<br><strong>X. Liquids &nbsp;|&nbsp; Y. Gases &nbsp;|&nbsp; Z. Solids</strong>',
        options: [
          'X: Indefinite shape, definite volume | Y: Indefinite shape and volume | Z: Definite shape and volume',
          'X: Definite shape, indefinite volume | Y: Definite shape and volume | Z: Indefinite shape and volume',
          'X: Definite shape and volume | Y: Indefinite shape, definite volume | Z: Indefinite shape and volume'
        ],
        correct: 0,
        explanation: 'Solids have fixed shapes and volumes; liquids take the shape of their container while keeping a fixed volume; gases expand to fill any container shape and volume.',
        takeaway: 'Solids = Fixed Shape & Volume | Liquids = Fixed Volume only | Gases = Indefinite Shape & Volume.'
      },
      {
        id: 'l13_q2',
        category: 'mcq',
        source: 'Worksheet I • Q4',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Naphthalene mothballs placed in a wardrobe disappear slowly over time without leaving any wet trace on the fabric due to __________.',
        options: [
          'Evaporation',
          'Condensation',
          'Sublimation',
          'Freezing'
        ],
        correct: 2,
        explanation: 'Sublimation is the direct transition from the solid state into the gaseous state without passing through the liquid phase.',
        takeaway: 'Solid → Gas directly = Sublimation.'
      },
      {
        id: 'l13_q3',
        category: 'mcq',
        source: 'Worksheet I • Q5 (Intermolecular Arrangement)',
        wsNumber: 1,
        marks: '1 Mark',
        image: 'images/l13_intermolecular_efg.png',
        body: 'Observe the hot teacup diagram with components <strong>E</strong> (steam rising into air), <strong>F</strong> (hot liquid tea in cup), and <strong>G</strong> (solid ceramic saucer).<br><strong>Arrange E, F, and G in ASCENDING order (smallest to largest) of their intermolecular space:</strong>',
        options: [
          'G, F, and E (Solid saucer < Liquid tea < Gaseous steam)',
          'E, F, and G',
          'G, E, and F',
          'F, E, and G'
        ],
        correct: 0,
        explanation: 'Intermolecular space is smallest in solids (G: solid ceramic saucer) where particles are tightly locked in position; intermediate in liquids (F: liquid tea) where molecules slide past one another; and largest in gases (E: steam) where molecules are widely dispersed.',
        takeaway: 'Ascending intermolecular space: G (Solid: least) < F (Liquid) < E (Gas: largest).'
      },
      {
        id: 'l13_q4',
        category: 'mcq',
        source: 'Worksheet I • Q6',
        wsNumber: 1,
        marks: '1 Mark',
        image: 'images/l13_condensation_droplets.png',
        body: 'Neenu was sipping hot tea when her phone rang. She placed the cup on the table and covered it with a saucer. Ten minutes later, she lifted the lid and observed water droplets on its underside (as illustrated below).<br><strong>Which process caused the formation of these droplets?</strong>',
        options: [
          'Condensation (hot water vapor cooled on contact with the cooler lid and liquefied)',
          'Melting',
          'Boiling',
          'Sublimation'
        ],
        correct: 0,
        explanation: 'Hot liquid tea evaporates into hot water vapor. When this rising steam strikes the cooler surface of the ceramic saucer or glass lid, it loses heat energy. The gaseous molecules slow down, draw closer together, and condense into liquid water droplets.',
        takeaway: 'Rising steam cooling against lid → Liquid droplets = Condensation.'
      },
      {
        id: 'l13_q5',
        category: 'mcq',
        source: 'Worksheet I • Q9',
        wsNumber: 1,
        marks: '1 Mark',
        image: 'images/l13_oil_containers.png',
        body: 'Rupa transferred 100 mL of sunflower oil from tall cylindrical bottle P into wide shallow cooking pan Q as shown in the picture below.<br><strong>Which property of the oil undergoes a change?</strong>',
        options: [
          'Shape (it conforms to the shape of the new vessel)',
          'Volume (becomes more than 100 mL)',
          'Mass (becomes heavier)',
          'Chemical composition (turns into water)'
        ],
        correct: 0,
        explanation: 'Liquids have a definite volume (100 mL) and definite mass, but NO fixed shape. When poured from tall bottle P to wide pan Q, only the shape changes to take the contours of the new vessel.',
        takeaway: 'Liquids: Definite volume and mass, but indefinite shape.'
      },
      {
        id: 'l13_q6',
        category: 'whoami',
        source: 'Worksheet I & III Definitions',
        wsNumber: 1,
        marks: '1 Mark',
        body: '<strong>Who am I?</strong><br>I am the property that describes the ability of a substance (solute) to dissolve completely into another substance (solvent) at a given temperature.',
        options: [
          'Compressibility',
          'Solubility',
          'Density',
          'Sublimation'
        ],
        correct: 1,
        explanation: 'Solubility measures the maximum amount of a solute that dissolves in a given solvent at a specified temperature.',
        takeaway: 'Dissolving capacity = Solubility.'
      },
      {
        id: 'l13_q7',
        category: 'whoami',
        source: 'Worksheet III • Section II (Solubility in Lab)',
        wsNumber: 3,
        marks: '1 Mark',
        image: 'images/l13_miscible_immiscible.png',
        body: 'Anika added substance X to glass L and substance Y to glass M, each half-filled with water, and stirred them thoroughly (as shown below).<br>Substance X dissolved completely into the water, whereas substance Y floated on the surface forming a separate layer.<br><strong>How are the mixtures in glass L and glass M classified?</strong>',
        options: [
          'Glass L forms a miscible / homogeneous solution (like salt in water); Glass M forms an immiscible mixture (like oil in water).',
          'Glass L is an amorphous solid; Glass M is a gas.',
          'Glass L is an irreversible chemical reaction; Glass M is a reversible phase change.',
          'Glass L is immiscible; Glass M is miscible.'
        ],
        correct: 0,
        explanation: 'Solutes or liquids that dissolve uniformly into water without forming distinct boundaries create miscible / homogeneous solutions (Glass L, e.g. salt or sugar in water). Liquids that do not dissolve and form separate, distinct layers are termed immiscible (Glass M, e.g. cooking oil floating on water due to lower density).',
        takeaway: 'Glass L (completely dissolved) = Miscible/Soluble | Glass M (separate floating layer) = Immiscible/Insoluble.'
      },
      {
        id: 'l13_q8',
        category: 'compare',
        source: 'Worksheet II • Section IV (Changes Venn Diagram)',
        wsNumber: 2,
        marks: '2 Marks',
        image: 'images/l13_venn_changes.png',
        body: 'Observe the Venn diagram below comparing <strong>Physical Changes</strong> and <strong>Chemical Changes</strong>.<br><strong>Which everyday phenomenon belongs in region \'c\' (the intersection), because it involves BOTH a physical change and a chemical change occurring simultaneously?</strong>',
        options: [
          'Burning of a candle (melting of solid wax is physical; burning of the wick and wax vapor with oxygen is chemical)',
          'Freezing water into ice cubes',
          'Tearing a notebook page into strips',
          'Dissolving sugar crystals in warm milk'
        ],
        correct: 0,
        explanation: 'Burning a candle uniquely exhibits both changes simultaneously: (1) Physical change: Heat melts solid wax around the wick into liquid wax, which solidifies again upon cooling without altering chemical composition; (2) Chemical change: Liquid wax is drawn up the wick, vaporizes, and combusts with atmospheric oxygen to produce new substances (carbon dioxide, water vapor, soot, and light/heat).',
        takeaway: 'Venn region \'c\' = Burning candle (simultaneous physical melting of wax + chemical burning of wick/vapor).'
      },
      {
        id: 'l13_q9',
        category: 'oddone',
        source: 'Worksheet II • Part V (Classification)',
        wsNumber: 2,
        marks: '1.5 Marks',
        body: '<strong>Choose the Odd One Out and Justify:</strong><br>Cutting wood, Cracking eggshells, Curdling milk, Melting wax.',
        options: [
          'Curdling milk is the odd one out: It is a chemical change where bacteria produce lactic acid and form new curd; Cutting wood, cracking eggs, and melting wax are physical changes.',
          'Cutting wood because trees grow in soil.',
          'Melting wax because it gets hot.'
        ],
        correct: 0,
        explanation: 'Curdling milk creates new acidic chemical compounds (chemical change). Cutting, cracking, and melting change shape or phase without forming new chemical substances.',
        takeaway: 'Chemical transformation vs physical shape/phase changes.'
      },
      {
        id: 'l13_q10',
        category: 'scenario',
        source: 'Worksheet II • Scenario III (Hot Coffee vs Cold Plate)',
        wsNumber: 2,
        marks: '2 Marks',
        body: 'Why does the aroma of a hot cup of coffee reach you across the living room much faster than the scent of a cold plate of salad?',
        options: [
          'Hot coffee releases vapor molecules with high thermal kinetic energy, allowing them to diffuse and travel rapidly through air; cold salad molecules have low kinetic energy and diffuse slowly.',
          'Hot coffee molecules have wings to fly through windows.',
          'Cold food has no molecules at all.'
        ],
        correct: 0,
        explanation: 'Diffusion rate is proportional to temperature. At higher temperatures, gaseous molecules possess greater kinetic energy and spread rapidly through ambient air.',
        takeaway: 'High temperature → High kinetic energy → Fast diffusion.'
      },
      {
        id: 'l13_q11',
        category: 'scenario',
        source: 'Worksheet II • Scenario IV (Anu’s IT Morning Breakfast)',
        wsNumber: 2,
        marks: '3 Marks',
        body: 'Anu observed six events: 1) Cracking eggs into a bowl, 2) Frying an omelette in a hot pan, 3) Slicing an apple, 4) Sliced apple pieces turning brown, 5) Bathroom mirror fogging with droplets, 6) Iron door latch rusting.<br><strong>Which of these represent Chemical Changes?</strong>',
        options: [
          'Frying an omelette, sliced apple turning brown, and iron door latch rusting',
          'Cracking eggs, slicing apple, and mirror fogging',
          'All six events are chemical changes',
          'Only mirror fogging'
        ],
        correct: 0,
        explanation: 'Frying an omelette denatures proteins permanently; sliced apple browning is enzymatic oxidation; rusting is iron oxidation. Cracking eggs, slicing apples, and mirror condensation are physical changes.',
        takeaway: 'Cooked food, browning fruit, and rusting metal = Chemical changes.'
      },
      {
        id: 'l13_q12',
        category: 'scenario',
        source: 'Worksheet III • Scenario IV (Tale of Two Hooks)',
        wsNumber: 3,
        marks: '3 Marks',
        image: 'images/l13_iron_hook_rack.png',
        body: 'Anshul lives in coastal Kerala, while Charu resides in desert Rajasthan. Both purchased identical iron wall hook racks (pictured below) on the same day. Within four months, Anshul’s hook was coated in flaky orange-brown rust, while Charu’s hook remained clean and shiny.<br><strong>Why did Anshul’s hook rust while Charu’s did not?</strong>',
        options: [
          'Rusting requires both oxygen AND moisture; coastal Kerala has high ambient humidity providing constant moisture, whereas desert Rajasthan has dry air with minimal moisture.',
          'Anshul received a counterfeit iron hook made of cardboard.',
          'Charu covered her hook with sand to protect it.',
          'Iron only rusts when exposed to salt-free mountain air.'
        ],
        correct: 0,
        explanation: 'Rusting is a chemical oxidation reaction ($4Fe + 3O_2 + 2xH_2O → 2Fe_2O_3 \\cdot xH_2O$). It strictly requires BOTH oxygen and water vapor. Coastal Kerala has a humid maritime climate with high moisture in the air, causing rapid rust. Desert Rajasthan has low humidity, so the lack of water vapor prevents rusting.',
        takeaway: 'Rusting formula: Iron + Oxygen + Moisture. High humidity (Kerala) = Rapid rust | Dry air (Rajasthan) = No rust.'
      },
      {
        id: 'l13_q13',
        category: 'mcq',
        source: 'Worksheet III • Section III (Compressibility Investigation)',
        wsNumber: 3,
        marks: '1 Mark',
        image: 'images/l13_compressibility_pqr.png',
        body: 'Observe the three piston cylinders <strong>P</strong>, <strong>Q</strong>, and <strong>R</strong> illustrating matter in three states.<br><strong>Which of the substances possesses the MAXIMUM compressibility, and why?</strong>',
        options: [
          'P (Gas), because its particles are far apart with large empty spaces between them that allow them to be pushed closer together when pressure is applied.',
          'R (Solid), because its particles are arranged in rigid orderly rows.',
          'Q (Liquid), because liquids have an indefinite shape and take the form of their container.',
          'All three substances have identical compressibility.'
        ],
        correct: 0,
        explanation: 'In cylinder P (Gas), intermolecular spaces are vast and intermolecular attraction is negligible. When downward force is applied via the piston, the particles are easily forced closer together → maximum compressibility (which allows CNG fuel and LPG cooking gas to be compressed into cylinders). In liquids (Q) and solids (R), particles are already in close contact and cannot be compressed significantly.',
        takeaway: 'Maximum compressibility = Gas (P) due to large intermolecular spaces. Application: Compressed Natural Gas (CNG).'
      },
      {
        id: 'l13_q14',
        category: 'mcq',
        source: 'Worksheet I • Q3 (Deposition)',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'When gaseous carbon dioxide (CO₂) is cooled to extremely low temperatures (-78°C), it converts directly into solid dry ice WITHOUT passing through the liquid state. This reverse of sublimation is called __________.',
        options: [
          'Evaporation',
          'Condensation',
          'Deposition',
          'Freezing'
        ],
        correct: 2,
        explanation: 'Deposition is the direct conversion of gas → solid, skipping the liquid phase entirely. It is the exact reverse of sublimation (solid → gas). Dry ice (solid CO₂) is the classic example.',
        takeaway: 'Sublimation: Solid→Gas (camphor, naphthalene). Deposition: Gas→Solid (dry ice). Both SKIP the liquid state!'
      },
      {
        id: 'l13_q15',
        category: 'mcq',
        source: 'Worksheet I • Q7 (Gas Compressibility)',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Which of the following substances can be easily compressed into a smaller volume?',
        options: [
          'Water and milk',
          'Iron and wood',
          'Steam, oxygen, and nitrogen',
          'Ice and diamond'
        ],
        correct: 2,
        explanation: 'Gases (steam, oxygen, nitrogen) have vast intermolecular spaces and negligible attractive forces, so they can be easily compressed when pressure is applied. This is why CNG and LPG are stored as compressed gases in cylinders.',
        takeaway: 'Only gases are highly compressible (large spaces between molecules). Solids and liquids resist compression.'
      },
      {
        id: 'l13_q16',
        category: 'mcq',
        source: 'Worksheet I • Q8 (Water in Three States)',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Water can exist as solid ice, liquid water, and gaseous steam. In all three states, the water molecules (H₂O) are __________.',
        options: [
          'Different molecules in each state',
          'The same molecules — only the spacing and movement change',
          'Sometimes the same and sometimes different',
          'Arranged identically with the same spacing in all states'
        ],
        correct: 1,
        explanation: 'In all three states, water is made of identical H₂O molecules. What changes is the intermolecular spacing and kinetic energy: tightly packed in ice, loosely arranged in liquid, and far apart with high energy in steam.',
        takeaway: 'Same H₂O molecules in ice, water, and steam. Only spacing and motion change, not the molecule itself!'
      },
      {
        id: 'l13_q17',
        category: 'scenario',
        source: 'Worksheet II • Section 2 (Strawberry Crush Solution)',
        wsNumber: 2,
        marks: '2 Marks',
        body: 'Neha mixed strawberry crush with water and stirred it well. A uniform pink drink was formed with no separate layers visible. When she tasted it at different spots, the flavor was identical throughout.<br><strong>What type of solution is formed? Why does it taste the same everywhere?</strong>',
        options: [
          'Homogeneous solution — strawberry crush completely dissolved in water forming a uniform mixture. It tastes the same throughout because the dissolved particles are evenly distributed.',
          'Heterogeneous mixture — the strawberry settles at the bottom if left standing.',
          'Immiscible solution — the crush floats on top of the water.',
          'Suspension — the crush particles are too large to dissolve.'
        ],
        correct: 0,
        explanation: 'When strawberry crush dissolves completely in water with no visible layers or settling, it forms a homogeneous solution. The flavor is identical throughout because the dissolved crush molecules distribute uniformly.',
        takeaway: 'Homogeneous solution = uniform, same taste everywhere, no visible layers. Heterogeneous = uneven, layers/settling visible.'
      },
      {
        id: 'l13_q18',
        category: 'scenario',
        source: 'Worksheet III • Section I (Tom\'s Lab Solubility Table)',
        wsNumber: 3,
        marks: '5 Marks',
        body: 'Tom mixed three materials X, Y, and Z with water in the lab:<br>• <strong>X</strong>: Dissolves completely (tightly packed molecules)<br>• <strong>Y</strong>: Heavy particles settle down rapidly<br>• <strong>Z</strong>: Fine particles take longer to settle<br><strong>Classify X, Y, Z by solubility and name the separation technique for each.</strong>',
        options: [
          'X = Soluble (use Evaporation, e.g., salt); Y = Insoluble heavy (use Sedimentation & Decantation, e.g., sand); Z = Insoluble fine (use Filtration, e.g., sawdust).',
          'All three are soluble and can be separated by distillation.',
          'X = Insoluble; Y = Soluble; Z = Miscible. All use filtration.',
          'X, Y, Z are all gases that can be separated by condensation.'
        ],
        correct: 0,
        explanation: 'X dissolves completely (soluble) — recovered by evaporation (e.g., salt). Y\'s heavy particles settle quickly (insoluble) — separated by sedimentation and decantation (e.g., sand). Z\'s fine particles settle slowly (insoluble) — separated by filtration (e.g., sawdust or chalk powder).',
        takeaway: 'Soluble (dissolves)→Evaporation | Heavy insoluble→Sedimentation | Fine insoluble→Filtration.'
      },
      {
        id: 'l13_q19',
        category: 'scenario',
        source: 'Worksheet III • Section IV (Preventing Rust)',
        wsNumber: 3,
        marks: '3 Marks',
        body: 'Anshul lives in coastal Kerala where humidity is very high. He bought iron wall hooks for his new home, but within weeks they turned reddish-brown and flaky.<br><strong>Define rusting, explain why Anshul\'s hooks rusted, and suggest TWO methods to prevent it.</strong>',
        options: [
          'Rusting = Chemical change where iron reacts with oxygen and moisture to form iron oxide (reddish-brown, flaky). Coastal Kerala has high humidity accelerating rust. Prevention: (1) Painting with anti-rust paint, (2) Galvanization (zinc coating).',
          'Rusting = Physical change where iron changes color. Prevention: wash hooks daily.',
          'Rusting = Iron melting in sunlight. Prevention: keep hooks in the refrigerator.',
          'Rusting = Iron dissolving in rainwater. Prevention: cover hooks with paper towels.'
        ],
        correct: 0,
        explanation: 'Rusting is a chemical change: Iron + Oxygen + Water → Iron oxide (rust). Coastal areas have salt-laden humid air that accelerates rusting. Prevention methods: painting, oiling/greasing, or galvanization (applying a protective zinc coating).',
        takeaway: 'Rusting = Iron + O₂ + H₂O → Iron oxide (chemical change). Prevent: Paint, oil/grease, galvanize (zinc coat).'
      }
    ]
  }
];

// ==========================================================================
// 4. ACTIVE STATE & LOCALSTORAGE PERSISTENCE ENGINE
// ==========================================================================
const STORAGE_KEY_STATE = 'cbse5_science_active_state';
const STORAGE_KEY_STARS_PREFIX = 'cbse5_science_stars_';

let state = {
  activeChapterId: 'ch2_animals',
  activeMode: 'learn', // 'learn' | 'traps' | 'practice' | 'challenge' | 'worksheet'
  activePracticeFilter: 'all', // 'all' | 'mcq' | 'whoami' | 'compare' | 'oddone' | 'scenario'
  activeWsFilter: 'all', // 'all' | 1 | 2 | 3
  currentQuestionIndex: 0,
  questionQueue: [],
  scoreCorrect: 0,
  scoreWrong: 0,
  answeredMap: {}, // questionId -> { selectedIndex, isCorrect }
  trapAnswers: {}, // trapId -> selectedIndex
  // Interactive Labs state
  labStates: {
    moleculeState: 'solid',
    balloonState: 'balanced',
    dietNutrient: 'protein',
    animalSelected: 'eagle',
    // L-3 Skeletal Lab
    jointType: 'ball_socket',
    muscleArmState: 'flexed',
    // L-4 Nervous Lab
    brainPart: 'cerebrum',
    reflexTriggered: false
  },
  // Printable Worksheet settings
  worksheetSettings: {
    selectedWs: 'all',
    showAnswers: false
  },
  // Sprint state
  sprint: {
    running: false,
    timeLeft: 60,
    score: 0,
    currentIndex: 0,
    timerId: null
  }
};

function saveActiveState() {
  try {
    const serialized = {
      activeChapterId: state.activeChapterId,
      activeMode: state.activeMode,
      activePracticeFilter: state.activePracticeFilter,
      currentQuestionIndex: state.currentQuestionIndex,
      scoreCorrect: state.scoreCorrect,
      scoreWrong: state.scoreWrong,
      answeredMap: state.answeredMap,
      trapAnswers: state.trapAnswers,
      worksheetSettings: state.worksheetSettings,
      activeWsFilter: state.activeWsFilter
    };
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(serialized));
  } catch (e) {
    // Storage quota or privacy fallback
  }
}

function loadActiveState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATE);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.activeChapterId && CHAPTERS_DATA.some(c => c.id === parsed.activeChapterId)) {
        state.activeChapterId = parsed.activeChapterId;
      }
      if (['learn', 'traps', 'practice', 'revision', 'challenge', 'worksheet'].includes(parsed.activeMode)) {
        state.activeMode = parsed.activeMode;
      }
      if (parsed.activePracticeFilter) {
        state.activePracticeFilter = parsed.activePracticeFilter;
      }
      if (typeof parsed.currentQuestionIndex === 'number') {
        state.currentQuestionIndex = parsed.currentQuestionIndex;
      }
      if (typeof parsed.scoreCorrect === 'number') {
        state.scoreCorrect = parsed.scoreCorrect;
      }
      if (typeof parsed.scoreWrong === 'number') {
        state.scoreWrong = parsed.scoreWrong;
      }
      if (parsed.answeredMap) {
        state.answeredMap = parsed.answeredMap;
      }
      if (parsed.trapAnswers) {
        state.trapAnswers = parsed.trapAnswers;
      }
      if (parsed.worksheetSettings) {
        state.worksheetSettings = parsed.worksheetSettings;
      }
      if (parsed.activeWsFilter) {
        state.activeWsFilter = parsed.activeWsFilter;
      }
    }
  } catch (e) {
    // Parsing error fallback
  }
}

function getChapterStars(chapterId) {
  try {
    const v = localStorage.getItem(STORAGE_KEY_STARS_PREFIX + chapterId);
    return v ? parseInt(v, 10) : 0;
  } catch (e) {
    return 0;
  }
}

function setChapterStars(chapterId, stars) {
  try {
    const current = getChapterStars(chapterId);
    if (stars > current) {
      localStorage.setItem(STORAGE_KEY_STARS_PREFIX + chapterId, stars.toString());
      updateSidebarProgress();
    }
  } catch (e) {
    // Storage fallback
  }
}

function evaluateAndAwardStars(chapterId) {
  const ch = CHAPTERS_DATA.find(c => c.id === chapterId);
  if (!ch) return 0;

  let correctPracticeCount = 0;
  ch.questions.forEach(q => {
    if (state.answeredMap[q.id] && state.answeredMap[q.id].isCorrect) {
      correctPracticeCount++;
    }
  });

  let correctTrapsCount = 0;
  if (ch.examTraps && ch.examTraps.length > 0) {
    ch.examTraps.forEach(trap => {
      const correctIdx = (typeof trap.correctIndex === 'number') ? trap.correctIndex : (typeof trap.correct === 'number' ? trap.correct : 0);
      if (state.trapAnswers[trap.id] === correctIdx) {
        correctTrapsCount++;
      }
    });
  }

  const totalQuestions = ch.questions.length;
  // Progress-based stars rewarding:
  // 1 Star: Solved at least 3 practice questions correctly (or 20%) OR diagnosed all traps in the chapter
  // 2 Stars: Solved at least 50% of questions correctly
  // 3 Stars: Solved at least 85% of questions correctly
  let stars = 0;
  if (correctPracticeCount >= Math.ceil(totalQuestions * 0.85)) {
    stars = 3;
  } else if (correctPracticeCount >= Math.ceil(totalQuestions * 0.50)) {
    stars = 2;
  } else if (correctPracticeCount >= Math.max(1, Math.min(3, Math.ceil(totalQuestions * 0.20))) || (ch.examTraps && ch.examTraps.length > 0 && correctTrapsCount >= ch.examTraps.length)) {
    stars = 1;
  }

  const oldStars = getChapterStars(chapterId);
  if (stars > oldStars) {
    setChapterStars(chapterId, stars);
    AudioController.fanfare();
    ConfettiController.launch();
  }
  return stars;
}

function getActiveChapter() {
  return CHAPTERS_DATA.find(c => c.id === state.activeChapterId) || CHAPTERS_DATA[0];
}

// ==========================================================================
// 5. UI INITIALIZATION & SIDEBAR CONTROLS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadActiveState();
  try {
    const params = new URLSearchParams(window.location.search);
    const qCh = params.get('ch');
    const qMode = params.get('mode');
    if (qCh && CHAPTERS_DATA.some(c => c.id === qCh)) {
      state.activeChapterId = qCh;
    }
    if (qMode && ['learn', 'traps', 'practice', 'revision', 'challenge', 'worksheet'].includes(qMode)) {
      state.activeMode = qMode;
    }
  } catch (e) {}
  initSidebar();
  initTopBar();
  initModeTabs();
  renderCurrentView();
  updateSidebarProgress();
});

function initSidebar() {
  const container = document.getElementById('sidebar-topics');
  if (!container) return;
  container.innerHTML = '';

  CHAPTERS_DATA.forEach(ch => {
    const stars = getChapterStars(ch.id);
    const starString = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

    const btn = document.createElement('button');
    btn.className = `chapter-btn ${ch.id === state.activeChapterId ? 'active' : ''}`;
    btn.setAttribute('data-chapter-id', ch.id);
    btn.innerHTML = `
      <span class="chapter-badge">${ch.number}</span>
      <div class="chapter-info">
        <div class="chapter-name">${ch.title}</div>
        <div class="chapter-sub">${ch.sub}</div>
      </div>
      <div class="chapter-stars" title="${stars} of 3 Stars">${starString}</div>
    `;

    btn.addEventListener('click', () => {
      AudioController.click();
      if (state.activeChapterId !== ch.id) {
        state.activeChapterId = ch.id;
        state.currentQuestionIndex = 0;
        // Recalculate session scores from answeredMap for this chapter
        const currentCh = CHAPTERS_DATA.find(c => c.id === ch.id);
        let correctInCh = 0;
        let wrongInCh = 0;
        if (currentCh) {
          currentCh.questions.forEach(q => {
            if (state.answeredMap[q.id]) {
              if (state.answeredMap[q.id].isCorrect) correctInCh++;
              else wrongInCh++;
            }
          });
        }
        state.scoreCorrect = correctInCh;
        state.scoreWrong = wrongInCh;
        saveActiveState();
        updateActiveSidebarButton();
        renderCurrentView();
        closeMobileSidebar();
      }
    });

    container.appendChild(btn);
  });

  // Mobile Drawer Toggle
  const toggleBtn = document.getElementById('menu-toggle-btn');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const closeBtn = document.getElementById('sidebar-close-btn');

  if (toggleBtn && sidebar && backdrop) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      backdrop.classList.add('active');
    });

    const closeHandler = () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeHandler);
    backdrop.addEventListener('click', closeHandler);
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('active');
}

function updateActiveSidebarButton() {
  const btns = document.querySelectorAll('.chapter-btn');
  btns.forEach(btn => {
    if (btn.getAttribute('data-chapter-id') === state.activeChapterId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const ch = getActiveChapter();
  const titleEl = document.getElementById('top-bar-title');
  const subEl = document.getElementById('top-bar-subtitle');
  if (titleEl) titleEl.textContent = `${ch.number}: ${ch.title}`;
  if (subEl) subEl.textContent = ch.sub;
}

function updateSidebarProgress() {
  let totalStars = 0;
  CHAPTERS_DATA.forEach(ch => {
    const s = getChapterStars(ch.id);
    totalStars += s;
    const starEl = document.querySelector(`.chapter-btn[data-chapter-id="${ch.id}"] .chapter-stars`);
    if (starEl) {
      starEl.textContent = '⭐'.repeat(s) + '☆'.repeat(3 - s);
      starEl.title = `${s} of 3 Stars`;
    }
  });
  const maxStars = CHAPTERS_DATA.length * 3;
  const pct = Math.round((totalStars / maxStars) * 100);

  const fillEl = document.getElementById('progress-fill');
  const labelEl = document.getElementById('progress-label');
  const badgeEl = document.getElementById('star-badge-total');

  if (fillEl) fillEl.style.width = `${pct}%`;
  if (labelEl) labelEl.textContent = `${pct}% Syllabus Mastered`;
  if (badgeEl) badgeEl.textContent = `⭐ ${totalStars} / ${maxStars}`;
}

function initTopBar() {
  const resetBtn = document.getElementById('btn-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      AudioController.click();
      if (confirm('🔄 Restart current chapter drill? Your score for this session will reset.')) {
        state.currentQuestionIndex = 0;
        state.scoreCorrect = 0;
        state.scoreWrong = 0;
        state.answeredMap = {};
        state.trapAnswers = {};
        saveActiveState();
        renderCurrentView();
      }
    });
  }

  const printBtn = document.getElementById('btn-print');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      AudioController.click();
      switchMode('worksheet');
      setTimeout(() => window.print(), 350);
    });
  }
}

function updateActiveModeTabs() {
  const tabs = document.querySelectorAll('.mode-tab');
  tabs.forEach(tab => {
    if (tab.getAttribute('data-mode') === state.activeMode) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}

function initModeTabs() {
  updateActiveModeTabs();
  const tabs = document.querySelectorAll('.mode-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetMode = tab.getAttribute('data-mode');
      if (targetMode && state.activeMode !== targetMode) {
        AudioController.click();
        switchMode(targetMode);
      }
    });
  });
}

function switchMode(newMode) {
  state.activeMode = newMode;
  saveActiveState();
  updateActiveModeTabs();
  renderCurrentView();
}

function renderCurrentView() {
  updateActiveSidebarButton();
  updateActiveModeTabs();
  const viewport = document.getElementById('content-viewport');
  if (!viewport) return;

  switch (state.activeMode) {
    case 'learn':
      renderLearnView(viewport);
      break;
    case 'traps':
      renderTrapsView(viewport);
      break;
    case 'practice':
      renderPracticeView(viewport);
      break;
    case 'revision':
      renderRevisionView(viewport);
      break;
    case 'challenge':
      renderChallengeView(viewport);
      break;
    case 'worksheet':
      renderWorksheetView(viewport);
      break;
    default:
      renderLearnView(viewport);
  }
}

// ==========================================================================
// 6. MODE 1: LEARN & VISUAL LABS
// ==========================================================================
function renderLearnView(container) {
  const ch = getActiveChapter();

  let html = `
    <div class="view-header">
      <div class="view-header-title">
        <h3>${ch.icon} ${ch.number}: ${ch.title}</h3>
        <p>${ch.summary}</p>
      </div>
    </div>
  `;

  // Render Interactive Visual Gadget
  html += renderInteractiveGadget(ch);

  // Concept Cards Grid
  html += `<div class="learn-grid">`;
  ch.learnCards.forEach(card => {
    html += `
      <div class="concept-card">
        <span class="concept-badge">${card.badge}</span>
        <h4>${card.title}</h4>
        <div class="concept-metaphor">${card.metaphor}</div>
        <ul class="concept-points">
          ${card.points.map(pt => `<li>${pt}</li>`).join('')}
        </ul>
        <div class="think-box">
          <div class="think-icon">💡</div>
          <div class="think-text">
            <h5>Think About It:</h5>
            <p>${card.thinkPrompt}</p>
          </div>
        </div>
      </div>
    `;
  });
  html += `</div>`;

  container.innerHTML = html;
  attachGadgetEvents(ch);
}

function renderInteractiveGadget(ch) {
  if (ch.id === 'ch3_skeletal') {
    return renderSkeletalGadget();
  } else if (ch.id === 'ch4_nervous') {
    return renderNervousGadget();
  } else if (ch.id === 'ch13_matter') {
    return `
      <div class="interactive-lab-container">
        <div class="lab-title-bar">
          <h4>🧪 Interactive Molecular Agitator</h4>
          <div class="lab-controls">
            <button class="lab-btn ${state.labStates.moleculeState === 'solid' ? 'active' : ''}" data-state="solid">🧊 Solid</button>
            <button class="lab-btn ${state.labStates.moleculeState === 'liquid' ? 'active' : ''}" data-state="liquid">💧 Liquid</button>
            <button class="lab-btn ${state.labStates.moleculeState === 'gas' ? 'active' : ''}" data-state="gas">💨 Gas</button>
          </div>
        </div>
        <div class="lab-stage" id="molecule-stage">
          <!-- Molecule Canvas Simulation rendered via SVG -->
          <svg viewBox="0 0 400 160" width="100%" height="160" id="molecule-svg"></svg>
        </div>
        <div class="lab-explanation" id="molecule-explanation">
          ${getMoleculeExplanation(state.labStates.moleculeState)}
        </div>
      </div>
    `;
  } else if (ch.id === 'ch7_air_water') {
    return `
      <div class="interactive-lab-container">
        <div class="lab-title-bar">
          <h4>🎈 Tina’s Balloon Balance & Mass Simulator</h4>
          <div class="lab-controls">
            <button class="lab-btn ${state.labStates.balloonState === 'balanced' ? 'active' : ''}" data-balloon="balanced">⚖️ Two Inflated Balloons</button>
            <button class="lab-btn ${state.labStates.balloonState === 'pricked' ? 'active' : ''}" data-balloon="pricked">📌 Prick Right Balloon!</button>
          </div>
        </div>
        <div class="lab-stage">
          <svg viewBox="0 0 440 180" class="balance-scale-svg" id="balance-svg"></svg>
        </div>
        <div class="lab-explanation" id="balloon-explanation">
          ${state.labStates.balloonState === 'balanced' 
            ? 'Both balloons are inflated with equal air. <strong>The scale remains balanced</strong>, proving both sides hold equal mass.' 
            : 'When the right balloon is pricked, air escapes! <strong>The left inflated balloon dips down</strong>, proving air has measurable weight and mass!'}
        </div>
      </div>
    `;
  } else if (ch.id === 'ch5_health') {
    return `
      <div class="interactive-lab-container">
        <div class="lab-title-bar">
          <h4>🥗 Nutrient Role & Deficiency Inspector</h4>
          <div class="lab-controls">
            <button class="lab-btn ${state.labStates.dietNutrient === 'protein' ? 'active' : ''}" data-nutrient="protein">🥩 Proteins</button>
            <button class="lab-btn ${state.labStates.dietNutrient === 'carbs' ? 'active' : ''}" data-nutrient="carbs">🍞 Carbohydrates</button>
            <button class="lab-btn ${state.labStates.dietNutrient === 'fats' ? 'active' : ''}" data-nutrient="fats">🧈 Fats</button>
            <button class="lab-btn ${state.labStates.dietNutrient === 'vitd' ? 'active' : ''}" data-nutrient="vitd">☀️ Vitamin D & Calcium</button>
            <button class="lab-btn ${state.labStates.dietNutrient === 'iron' ? 'active' : ''}" data-nutrient="iron">🥬 Iron</button>
            <button class="lab-btn ${state.labStates.dietNutrient === 'iodine' ? 'active' : ''}" data-nutrient="iodine">🧂 Iodine</button>
          </div>
        </div>
        <div class="lab-stage" id="nutrient-stage">
          ${getNutrientCard(state.labStates.dietNutrient)}
        </div>
      </div>
    `;
  } else {
    // L-2 Animals
    return `
      <div class="interactive-lab-container">
        <div class="lab-title-bar">
          <h4>🐾 Animal Adaptation & Survival Blueprint</h4>
          <div class="lab-controls">
            <button class="lab-btn ${state.labStates.animalSelected === 'eagle' ? 'active' : ''}" data-animal="eagle">🦅 Eagle</button>
            <button class="lab-btn ${state.labStates.animalSelected === 'penguin' ? 'active' : ''}" data-animal="penguin">🐧 Penguin</button>
            <button class="lab-btn ${state.labStates.animalSelected === 'fish' ? 'active' : ''}" data-animal="fish">🐟 Fish</button>
            <button class="lab-btn ${state.labStates.animalSelected === 'frog' ? 'active' : ''}" data-animal="frog">🐸 Frog</button>
            <button class="lab-btn ${state.labStates.animalSelected === 'whale' ? 'active' : ''}" data-animal="whale">🐋 Whale</button>
            <button class="lab-btn ${state.labStates.animalSelected === 'snake' ? 'active' : ''}" data-animal="snake">🐍 Snake</button>
          </div>
        </div>
        <div class="lab-stage" id="animal-stage">
          ${getAnimalCard(state.labStates.animalSelected)}
        </div>
      </div>
    `;
  }
}

function getMoleculeExplanation(stateType) {
  if (stateType === 'solid') {
    return '<strong>SOLID:</strong> Molecules are locked in tight, orderly positions with maximum attractive force. They only <strong>vibrate in place</strong>, giving solids a definite shape and fixed volume.';
  } else if (stateType === 'liquid') {
    return '<strong>LIQUID:</strong> Molecules are moderately spaced with moderate attraction. They <strong>slide smoothly past one another</strong>, allowing liquids to flow and take any container’s shape.';
  } else {
    return '<strong>GAS:</strong> Molecules are spaced far apart with minimal attraction. They possess <strong>high kinetic energy</strong> and bounce in all directions. Highly compressible!';
  }
}

function renderMoleculeSVG(svgEl, stateType) {
  if (!svgEl) return;
  svgEl.innerHTML = '';

  let particles = [];
  if (stateType === 'solid') {
    // Tight 4x8 grid with slight jitter
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 8; c++) {
        particles.push({ cx: 130 + c * 18, cy: 45 + r * 18, r: 7, color: '#38bdf8' });
      }
    }
  } else if (stateType === 'liquid') {
    // Flowing undulating arrangement
    for (let i = 0; i < 28; i++) {
      particles.push({
        cx: 90 + (i % 7) * 32 + (Math.sin(i) * 10),
        cy: 50 + Math.floor(i / 7) * 26 + (Math.cos(i) * 8),
        r: 7,
        color: '#06b6d4'
      });
    }
  } else {
    // Wide scatter
    const gasCoords = [
      [30, 30], [80, 110], [140, 40], [190, 130], [250, 60],
      [310, 120], [360, 45], [90, 80], [280, 25], [200, 70], [330, 85], [50, 135]
    ];
    gasCoords.forEach(([x, y]) => {
      particles.push({ cx: x, cy: y, r: 7, color: '#ec4899' });
    });
  }

  particles.forEach(p => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', p.cx);
    circle.setAttribute('cy', p.cy);
    circle.setAttribute('r', p.r);
    circle.setAttribute('fill', p.color);
    circle.setAttribute('filter', 'drop-shadow(0px 0px 4px rgba(6,182,212,0.6))');
    svgEl.appendChild(circle);
  });
}

function renderBalanceSVG(svgEl, isPricked) {
  if (!svgEl) return;
  svgEl.innerHTML = '';

  const rotation = isPricked ? -14 : 0; // negative rotates left side down

  svgEl.innerHTML = `
    <!-- Fulcrum Stand -->
    <polygon points="220,90 205,160 235,160" fill="#64748b" />
    <rect x="180" y="160" width="80" height="12" rx="4" fill="#475569" />
    <circle cx="220" cy="90" r="6" fill="#f1f5f9" />

    <!-- Tilting Beam -->
    <g transform="rotate(${rotation}, 220, 90)" style="transition: transform 0.6s ease-out;">
      <rect x="70" y="87" width="300" height="6" rx="3" fill="#cbd5e1" />
      
      <!-- Left String & Balloon -->
      <line x1="90" y1="90" x2="90" y2="125" stroke="#94a3b8" stroke-width="2" />
      <ellipse cx="90" cy="142" rx="18" ry="22" fill="#06b6d4" />
      <polygon points="90,120 86,125 94,125" fill="#06b6d4" />
      <text x="90" y="146" font-size="10" font-weight="bold" fill="#090e17" text-anchor="middle">Air</text>

      <!-- Right String & Balloon -->
      <line x1="350" y1="90" x2="350" y2="125" stroke="#94a3b8" stroke-width="2" />
      ${isPricked ? `
        <!-- Punctured Deflated Balloon -->
        <path d="M344,125 Q350,135 356,125 L353,130 Q350,138 347,130 Z" fill="#ef4444" />
        <text x="350" y="148" font-size="10" font-weight="bold" fill="#ef4444" text-anchor="middle">Empty</text>
      ` : `
        <!-- Full Balloon -->
        <ellipse cx="350" cy="142" rx="18" ry="22" fill="#10b981" />
        <polygon points="350,120 346,125 354,125" fill="#10b981" />
        <text x="350" y="146" font-size="10" font-weight="bold" fill="#090e17" text-anchor="middle">Air</text>
      `}
    </g>
  `;
}

function getNutrientCard(nutrient) {
  const map = {
    protein: {
      name: '🥩 Proteins (Body Builders)',
      role: 'Growth, muscle construction, and repairing worn-out tissues.',
      sources: 'Milk, eggs, fish, pulses, soybeans, lean meat.',
      deficiency: 'Kwashiorkor & stunted growth, muscle wasting.'
    },
    carbs: {
      name: '🍞 Carbohydrates (Instant Energy)',
      role: 'Primary fuel source broken down into glucose for physical activities and brain function.',
      sources: 'Rice, wheat, bread, potatoes, bananas, glucose.',
      deficiency: 'General weakness, loss of stamina, fatigue.'
    },
    fats: {
      name: '🧈 Fats (Reserve Batteries)',
      role: 'Long-term concentrated energy storage, thermal blanket against cold, and shock absorbers for kidneys and liver.',
      sources: 'Butter, ghee, vegetable oils, almonds, walnuts.',
      deficiency: 'Dry scaly skin, sensitivity to cold temperatures.'
    },
    vitd: {
      name: '☀️ Vitamin D & Calcium (Bone Hardeners)',
      role: 'Strengthens teeth and mineralizes bone matrices to support body weight.',
      sources: 'Morning sunlight, milk, fortified eggs, cheese.',
      deficiency: 'Rickets (bowed legs, pigeon chest, soft fragile bones).'
    },
    iron: {
      name: '🥬 Iron (Oxygen Transporter)',
      role: 'Synthesizes haemoglobin inside red blood cells to transport oxygen from lungs to muscles.',
      sources: 'Spinach, dates, jaggery, beetroot, red meat.',
      deficiency: 'Anaemia (chronic tiredness, pale skin, shortness of breath).'
    },
    iodine: {
      name: '🧂 Iodine (Metabolism Regulator)',
      role: 'Regulates thyroid gland secretions governing growth and mental development.',
      sources: 'Iodised salt, marine seafood.',
      deficiency: 'Goitre (visible swelling at base of neck), mental sluggishness.'
    }
  };

  const item = map[nutrient] || map.protein;
  return `
    <div style="max-width: 600px; text-align: left; width: 100%;">
      <h4 style="color: var(--accent-cyan); font-size: 1.2rem; margin-bottom: 0.5rem;">${item.name}</h4>
      <p style="font-size: 0.95rem; margin-bottom: 0.5rem;"><strong>Primary Function:</strong> ${item.role}</p>
      <p style="font-size: 0.95rem; margin-bottom: 0.5rem;"><strong>Rich Food Sources:</strong> <span style="color: #6ee7b7;">${item.sources}</span></p>
      <div style="background: rgba(239, 68, 68, 0.12); border-left: 3px solid var(--color-danger); padding: 0.6rem 0.9rem; border-radius: 4px; font-size: 0.9rem;">
        <strong>⚠️ Deficiency Disease:</strong> <span style="color: #fca5a5;">${item.deficiency}</span>
      </div>
    </div>
  `;
}

function getAnimalCard(animal) {
  const map = {
    eagle: {
      name: '🦅 Eagle (Aerial Raptor)',
      habitat: 'Mountain cliffs & open skies',
      breathing: 'Lungs & Nares (nostril openings on beak)',
      covering: 'Feathers (aerodynamic flight & thermal insulation)',
      locomotion: 'Wings for high soaring',
      weapon: 'Talons (razor-sharp curved claws to seize prey)'
    },
    penguin: {
      name: '🐧 Penguin (Aquatic Flightless Bird)',
      habitat: 'Freezing Antarctic ice & oceans',
      breathing: 'Lungs (surfaces to breathe air)',
      covering: 'Dense waterproof plumage + thick layer of blubber',
      locomotion: 'Flippers (hydrodynamic paddles for fast underwater swimming)',
      weapon: 'Torpedo-shaped body cutting through icy waves'
    },
    fish: {
      name: '🐟 Goldfish (Aquatic Vertebrate)',
      habitat: 'Freshwater ponds & rivers',
      breathing: 'Gills (extracts oxygen dissolved in water)',
      covering: 'Overlapping waterproof scales preventing water seepage',
      locomotion: 'Fins & tail for balance and propulsion',
      weapon: 'Continuous mouth-pumping over gill filaments'
    },
    frog: {
      name: '🐸 Frog (Amphibian Dual-Breather)',
      habitat: 'Ponds and moist land',
      breathing: 'Moist skin in water + Lungs on land',
      covering: 'Smooth, slime-coated moist skin',
      locomotion: 'Webbed hind feet for swimming; strong legs for leaping',
      weapon: 'Long sticky tongue darting out to catch insects'
    },
    whale: {
      name: '🐋 Blue Whale (Marine Mammal)',
      habitat: 'Deep oceans',
      breathing: 'Lungs via Blowhole on very top of head',
      covering: 'Smooth skin + thick insulating blubber layer',
      locomotion: 'Powerful horizontal tail flukes and fore flippers',
      weapon: 'Can hold breath for over an hour during deep ocean dives'
    },
    snake: {
      name: '🐍 Snake (Limbless Reptile)',
      habitat: 'Forests, deserts, and wetlands',
      breathing: 'Lungs (aquatic snakes have nostrils on top of snout)',
      covering: 'Dry scales and transverse belly scales',
      locomotion: 'Limbless! Muscular body waves + belly scale traction',
      weapon: 'Flexible jaws that dislocate to swallow prey whole'
    }
  };

  const item = map[animal] || map.eagle;
  return `
    <div style="max-width: 600px; text-align: left; width: 100%;">
      <h4 style="color: var(--accent-cyan); font-size: 1.2rem; margin-bottom: 0.5rem;">${item.name}</h4>
      <p style="font-size: 0.95rem; margin-bottom: 0.4rem;"><strong>Natural Habitat:</strong> ${item.habitat}</p>
      <p style="font-size: 0.95rem; margin-bottom: 0.4rem;"><strong>Breathing Mechanism:</strong> <span style="color: #38bdf8;">${item.breathing}</span></p>
      <p style="font-size: 0.95rem; margin-bottom: 0.4rem;"><strong>Body Covering:</strong> ${item.covering}</p>
      <p style="font-size: 0.95rem; margin-bottom: 0.4rem;"><strong>Movement Organs:</strong> ${item.locomotion}</p>
      <div style="background: rgba(16, 185, 129, 0.12); border-left: 3px solid var(--color-success); padding: 0.6rem 0.9rem; border-radius: 4px; font-size: 0.9rem; margin-top: 0.6rem;">
        <strong>⭐ Secret Survival Feature:</strong> <span style="color: #6ee7b7;">${item.weapon}</span>
      </div>
    </div>
  `;
}


// --------------------------------------------------------------------------
// L-3 SKELETAL & MUSCULAR SYSTEM INTERACTIVE GADGET
// --------------------------------------------------------------------------
function renderSkeletalGadget() {
  const joint = state.labStates.jointType || 'ball_socket';
  const arm = state.labStates.muscleArmState || 'flexed';

  return `
    <div class="interactive-lab-container skeletal-lab-theme">
      <div class="lab-title-bar">
        <h4>🦴 Interactive Joint Mechanics & Antagonistic Muscle Simulator</h4>
        <div class="lab-controls">
          <button class="lab-btn ${joint === 'ball_socket' ? 'active' : ''}" data-joint="ball_socket">🕹️ Ball & Socket</button>
          <button class="lab-btn ${joint === 'hinge' ? 'active' : ''}" data-joint="hinge">🚪 Hinge Joint</button>
          <button class="lab-btn ${joint === 'pivot' ? 'active' : ''}" data-joint="pivot">🔄 Pivot Joint</button>
          <button class="lab-btn ${joint === 'gliding' ? 'active' : ''}" data-joint="gliding">🎚️ Gliding Joint</button>
          <button class="lab-btn ${arm === 'flexed' ? 'active' : ''}" data-arm-toggle="true" style="margin-left: 0.5rem; border-color: var(--accent-amber);">${arm === 'flexed' ? '💪 Arm: BENT (Flexed)' : '🦾 Arm: STRAIGHT (Extended)'}</button>
        </div>
      </div>
      <div class="lab-stage" id="skeletal-stage">
        ${getSkeletalStageHTML(joint, arm)}
      </div>
      <div class="lab-explanation" id="skeletal-explanation">
        ${getSkeletalExplanationHTML(joint, arm)}
      </div>
    </div>
  `;
}

function getSkeletalStageHTML(joint, arm) {
  // If user clicked arm toggle or joint
  return `
    <div class="skeletal-gadget-dual-wrap" style="display: flex; gap: 1.5rem; width: 100%; max-width: 820px; align-items: center; justify-content: space-around; flex-wrap: wrap;">
      <!-- Joint Mechanics Visualization -->
      <div class="joint-vis-card" style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 1rem; width: 340px; text-align: center;">
        <h5 style="color: var(--accent-amber); margin-bottom: 0.5rem; font-size: 1rem;">Mechanical Joint Model</h5>
        <svg viewBox="0 0 300 180" width="100%" height="160" class="joint-mechanics-svg">
          ${renderJointSVG(joint)}
        </svg>
      </div>

      <!-- Antagonistic Muscle Arm Visualization -->
      <div class="muscle-vis-card" style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 1rem; width: 380px; text-align: center;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h5 style="color: #fbbf24; font-size: 1rem;">Antagonistic Pair (Biceps / Triceps)</h5>
          <button class="btn btn-sm btn-ghost" id="btn-toggle-arm" style="padding: 0.2rem 0.6rem; font-size: 0.75rem; border: 1px solid #f59e0b;">Toggle Move</button>
        </div>
        <svg viewBox="0 0 340 180" width="100%" height="160" class="muscle-arm-svg">
          ${renderArmSVG(arm)}
        </svg>
      </div>
    </div>
  `;
}

function renderJointSVG(joint) {
  if (joint === 'ball_socket') {
    return `
      <!-- Ball and Socket Joint (Shoulder / Hip) -->
      <!-- Socket (Cup) -->
      <path d="M 80 40 A 55 55 0 0 0 80 140 L 40 140 L 40 40 Z" fill="#334155" stroke="#94a3b8" stroke-width="3" />
      <text x="50" y="25" fill="#94a3b8" font-size="12" font-weight="bold">Cup Socket (Scapula/Pelvis)</text>
      <!-- Ball Head -->
      <circle cx="95" cy="90" r="42" fill="#f59e0b" stroke="#fbbf24" stroke-width="3" opacity="0.9" />
      <!-- Bone Shaft (Humerus/Femur) with rotary 360 degree arrows -->
      <path d="M 130 90 L 260 90" stroke="#f59e0b" stroke-width="18" stroke-linecap="round" />
      <text x="180" y="80" fill="#fde68a" font-size="12" font-weight="bold">Bone Shaft</text>
      <!-- Rotary arrows -->
      <circle cx="210" cy="90" r="28" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="8,4" />
      <polygon points="238,90 232,82 244,82" fill="#38bdf8" />
      <text x="175" y="145" fill="#38bdf8" font-size="12" font-weight="bold">360° Rotary Freedom</text>
    `;
  } else if (joint === 'hinge') {
    return `
      <!-- Hinge Joint (Elbow / Knee) -->
      <rect x="30" y="75" width="90" height="26" rx="6" fill="#475569" stroke="#94a3b8" stroke-width="2" />
      <text x="40" y="65" fill="#94a3b8" font-size="12" font-weight="bold">Fixed Upper Bone</text>
      <!-- Hinge Pin -->
      <circle cx="120" cy="88" r="14" fill="#f59e0b" stroke="#fbbf24" stroke-width="3" />
      <!-- Swinging arm -->
      <line x1="120" y1="88" x2="230" y2="40" stroke="#f59e0b" stroke-width="16" stroke-linecap="round" />
      <!-- 1-direction Arc -->
      <path d="M 230 40 A 120 120 0 0 1 230 135" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="6,4" />
      <polygon points="230,135 222,125 238,125" fill="#10b981" />
      <text x="140" y="165" fill="#10b981" font-size="12" font-weight="bold">1-Direction Swing (180°)</text>
    `;
  } else if (joint === 'pivot') {
    return `
      <!-- Pivot Joint (Neck / Atlas-Axis) -->
      <!-- Central Cylindrical Peg -->
      <rect x="135" y="40" width="30" height="95" rx="10" fill="#f59e0b" stroke="#fbbf24" stroke-width="3" />
      <text x="110" y="25" fill="#fde68a" font-size="12" font-weight="bold">Axis Peg (Spine)</text>
      <!-- Rotating Ring (Atlas) -->
      <ellipse cx="150" cy="85" rx="55" ry="24" fill="none" stroke="#06b6d4" stroke-width="10" />
      <!-- Rotational arrows -->
      <path d="M 90 85 A 60 25 0 0 1 210 85" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6,4" />
      <polygon points="210,85 204,78 214,78" fill="#38bdf8" />
      <polygon points="90,85 96,92 86,92" fill="#38bdf8" />
      <text x="100" y="155" fill="#06b6d4" font-size="12" font-weight="bold">Rotation Left & Right</text>
    `;
  } else {
    // Gliding Joint (Wrist / Ankle)
    return `
      <!-- Gliding Joint (Carpals/Tarsals) -->
      <!-- Flat Bone Plate 1 -->
      <rect x="60" y="55" width="180" height="30" rx="8" fill="#334155" stroke="#94a3b8" stroke-width="2.5" />
      <!-- Flat Bone Plate 2 -->
      <rect x="80" y="95" width="180" height="30" rx="8" fill="#f59e0b" stroke="#fbbf24" stroke-width="2.5" />
      <!-- Sliding arrows between them -->
      <line x1="120" y1="90" x2="220" y2="90" stroke="#ec4899" stroke-width="3" />
      <polygon points="220,90 212,85 212,95" fill="#ec4899" />
      <polygon points="120,90 128,85 128,95" fill="#ec4899" />
      <text x="85" y="40" fill="#94a3b8" font-size="12" font-weight="bold">Upper Bone Plate</text>
      <text x="105" y="150" fill="#fde68a" font-size="12" font-weight="bold">Lower Bone Plate</text>
      <text x="80" y="172" fill="#ec4899" font-size="12" font-weight="bold">Smooth Multi-directional Slide</text>
    `;
  }
}

function renderArmSVG(armState) {
  const isFlexed = armState === 'flexed';
  if (isFlexed) {
    // BENT ARM: Biceps bulged/contracted (orange), Triceps stretched (grayish)
    return `
      <!-- Humerus (Upper arm) -->
      <line x1="50" y1="120" x2="160" y2="120" stroke="#cbd5e1" stroke-width="16" stroke-linecap="round" />
      <text x="70" y="145" fill="#94a3b8" font-size="11">Humerus</text>
      <!-- Elbow Hinge Joint -->
      <circle cx="160" cy="120" r="10" fill="#f59e0b" stroke="#fff" stroke-width="2" />
      <!-- Forearm (bent up at 50 degrees) -->
      <line x1="160" y1="120" x2="250" y2="40" stroke="#cbd5e1" stroke-width="14" stroke-linecap="round" />
      <text x="220" y="25" fill="#94a3b8" font-size="11">Radius & Ulna</text>
      <!-- Biceps (TOP - Bulged & Contracting) -->
      <path d="M 75 110 Q 140 60 195 90" fill="none" stroke="#ef4444" stroke-width="14" stroke-linecap="round" filter="drop-shadow(0 0 6px rgba(239,68,68,0.7))" />
      <text x="95" y="65" fill="#fca5a5" font-size="12" font-weight="bold">Biceps: CONTRACTED! (Bulging & Pulling)</text>
      <!-- Triceps (BOTTOM - Relaxed & Stretched) -->
      <path d="M 65 130 Q 120 145 155 132" fill="none" stroke="#64748b" stroke-width="8" stroke-linecap="round" />
      <text x="80" y="165" fill="#94a3b8" font-size="11">Triceps: RELAXED (Lengthened)</text>
    `;
  } else {
    // STRAIGHT ARM: Triceps contracted/bulged (orange), Biceps relaxed/stretched (grayish)
    return `
      <!-- Humerus (Upper arm) -->
      <line x1="40" y1="90" x2="150" y2="90" stroke="#cbd5e1" stroke-width="16" stroke-linecap="round" />
      <text x="65" y="75" fill="#94a3b8" font-size="11">Humerus</text>
      <!-- Elbow Hinge Joint -->
      <circle cx="150" cy="90" r="10" fill="#f59e0b" stroke="#fff" stroke-width="2" />
      <!-- Forearm (straightened out horizontally) -->
      <line x1="150" y1="90" x2="290" y2="90" stroke="#cbd5e1" stroke-width="14" stroke-linecap="round" />
      <text x="210" y="75" fill="#94a3b8" font-size="11">Radius & Ulna</text>
      <!-- Biceps (TOP - Relaxed & Thinned) -->
      <path d="M 70 80 Q 140 76 210 82" fill="none" stroke="#64748b" stroke-width="8" stroke-linecap="round" />
      <text x="95" y="55" fill="#94a3b8" font-size="11">Biceps: RELAXED (Stretched)</text>
      <!-- Triceps (BOTTOM - Contracted & Bulged) -->
      <path d="M 60 100 Q 125 125 158 102" fill="none" stroke="#ef4444" stroke-width="14" stroke-linecap="round" filter="drop-shadow(0 0 6px rgba(239,68,68,0.7))" />
      <text x="75" y="145" fill="#fca5a5" font-size="12" font-weight="bold">Triceps: CONTRACTED! (Pulling Forearm Down)</text>
    `;
  }
}

function getSkeletalExplanationHTML(joint, arm) {
  let jointText = '';
  if (joint === 'ball_socket') {
    jointText = '<strong>BALL & SOCKET JOINT:</strong> Ball fits in cup-like socket → <strong>360° Rotary Movement</strong>. Found in <strong>Shoulder & Hip</strong>. Like a computer joystick!';
  } else if (joint === 'hinge') {
    jointText = '<strong>HINGE JOINT:</strong> Opens and closes in <strong>1 Direction Only (180°)</strong> like a door hinge. Found in <strong>Knees, Elbows, Fingers, and Toes</strong>.';
  } else if (joint === 'pivot') {
    jointText = '<strong>PIVOT JOINT:</strong> Ring rotates around a central peg. Located between <strong>Skull & Backbone (Atlas & Axis)</strong>. Allows nodding "yes" and turning "no".';
  } else {
    jointText = '<strong>GLIDING JOINT:</strong> Flat bone surfaces slide past each other. Present in <strong>Wrists, Ankles, and Spine</strong>. Enables flexible twisting and waving.';
  }

  const armText = arm === 'flexed'
    ? '<span style="color: #fbbf24;">Arm Flexion:</span> <strong>Biceps CONTRACTS</strong> (pulls forearm up) while <strong>Triceps RELAXES</strong>.'
    : '<span style="color: #fbbf24;">Arm Extension:</span> <strong>Triceps CONTRACTS</strong> (pulls forearm down) while <strong>Biceps RELAXES</strong>.';

  return `
    <div style="margin-bottom: 0.5rem;">${jointText}</div>
    <div style="background: rgba(245, 158, 11, 0.12); padding: 0.5rem 0.8rem; border-radius: 6px; border-left: 3px solid #f59e0b;">
      ${armText} <em>(Golden rule: Muscles can ONLY PULL, they NEVER PUSH!)</em>
    </div>
  `;
}

function attachSkeletalGadgetEvents() {
  const jointBtns = document.querySelectorAll('.lab-btn[data-joint]');
  jointBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      AudioController.click();
      jointBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.labStates.jointType = btn.getAttribute('data-joint');
      updateSkeletalGadgetView();
    });
  });

  const armToggleBtn = document.querySelector('.lab-btn[data-arm-toggle]');
  if (armToggleBtn) {
    armToggleBtn.addEventListener('click', toggleArmMovement);
  }

  const armMiniBtn = document.getElementById('btn-toggle-arm');
  if (armMiniBtn) {
    armMiniBtn.addEventListener('click', toggleArmMovement);
  }
}

function toggleArmMovement() {
  AudioController.click();
  state.labStates.muscleArmState = (state.labStates.muscleArmState === 'flexed') ? 'extended' : 'flexed';
  updateSkeletalGadgetView();
}

function updateSkeletalGadgetView() {
  const stage = document.getElementById('skeletal-stage');
  const exp = document.getElementById('skeletal-explanation');
  if (stage) stage.innerHTML = getSkeletalStageHTML(state.labStates.jointType, state.labStates.muscleArmState);
  if (exp) exp.innerHTML = getSkeletalExplanationHTML(state.labStates.jointType, state.labStates.muscleArmState);

  // Update button label
  const armToggleBtn = document.querySelector('.lab-btn[data-arm-toggle]');
  if (armToggleBtn) {
    armToggleBtn.textContent = (state.labStates.muscleArmState === 'flexed') ? '💪 Arm: BENT (Flexed)' : '🦾 Arm: STRAIGHT (Extended)';
  }
  const armMiniBtn = document.getElementById('btn-toggle-arm');
  if (armMiniBtn) {
    armMiniBtn.addEventListener('click', toggleArmMovement);
  }
}

// --------------------------------------------------------------------------
// L-4 NERVOUS SYSTEM & SENSE ORGANS INTERACTIVE GADGET
// --------------------------------------------------------------------------
function renderNervousGadget() {
  const part = state.labStates.brainPart || 'cerebrum';
  const isReflex = state.labStates.reflexTriggered || false;

  return `
    <div class="interactive-lab-container nervous-lab-theme">
      <div class="lab-title-bar">
        <h4>🧠 Interactive Brain Regions & Spinal Reflex Arc Simulator</h4>
        <div class="lab-controls">
          <button class="lab-btn ${part === 'cerebrum' ? 'active' : ''}" data-brain="cerebrum">🧠 Cerebrum (Thinking & Senses)</button>
          <button class="lab-btn ${part === 'cerebellum' ? 'active' : ''}" data-brain="cerebellum">🤸 Cerebellum (Balance)</button>
          <button class="lab-btn ${part === 'medulla' ? 'active' : ''}" data-brain="medulla">🫀 Medulla (24/7 Vitals)</button>
          <button class="lab-btn ${isReflex ? 'active' : ''}" id="btn-trigger-reflex" style="border-color: #ef4444; color: #fca5a5;">🔥 Test Reflex Arc!</button>
        </div>
      </div>
      <div class="lab-stage" id="nervous-stage">
        ${getNervousStageHTML(part, isReflex)}
      </div>
      <div class="lab-explanation" id="nervous-explanation">
        ${getNervousExplanationHTML(part, isReflex)}
      </div>
    </div>
  `;
}

function getNervousStageHTML(part, isReflex) {
  if (isReflex) {
    return `
      <!-- Animated Reflex Arc Simulation -->
      <div style="width: 100%; max-width: 720px; text-align: center;">
        <h5 style="color: #f87171; margin-bottom: 0.5rem; font-size: 1.05rem;">⚡ Emergency Reflex Loop: Skin → Sensory → Spinal Cord → Motor → Muscle</h5>
        <svg viewBox="0 0 520 200" width="100%" height="190" class="reflex-arc-svg">
          <!-- Hot Pan -->
          <rect x="20" y="145" width="70" height="35" rx="6" fill="#475569" stroke="#ef4444" stroke-width="2" />
          <path d="M 30 145 Q 40 125 50 145 Q 60 120 70 145" fill="none" stroke="#f97316" stroke-width="3" />
          <text x="32" y="170" fill="#fca5a5" font-size="11" font-weight="bold">HOT PAN</text>
          
          <!-- Hand touching -->
          <circle cx="55" cy="120" r="16" fill="#fbcfe8" stroke="#ec4899" stroke-width="2" />
          <text x="15" y="105" fill="#f472b6" font-size="11">Skin Receptor</text>

          <!-- Sensory Nerve Cable (Red Pulse to Spinal Cord) -->
          <path d="M 68 112 C 140 50, 240 50, 360 85" fill="none" stroke="#ef4444" stroke-width="4" stroke-dasharray="8,4" class="animated-nerve-pulse" />
          <text x="140" y="45" fill="#f87171" font-size="11" font-weight="bold">1. Sensory Nerve (Input Signal) →</text>

          <!-- Spinal Cord Butterfly Section -->
          <rect x="360" y="55" width="130" height="110" rx="16" fill="#1e293b" stroke="#8b5cf6" stroke-width="3" />
          <path d="M 390 90 Q 425 110 400 135 Q 425 110 460 135 Q 435 110 460 90 Q 425 105 390 90 Z" fill="#ec4899" opacity="0.85" />
          <text x="375" y="80" fill="#c084fc" font-size="12" font-weight="bold">SPINAL CORD</text>
          <text x="370" y="155" fill="#a78bfa" font-size="10">(Brain Bypassed!)</text>

          <!-- Motor Nerve Cable (Green Pulse Back to Muscle) -->
          <path d="M 360 125 C 260 165, 180 160, 110 125" fill="none" stroke="#10b981" stroke-width="4" stroke-dasharray="8,4" class="animated-nerve-pulse-reverse" />
          <text x="150" y="185" fill="#34d399" font-size="11" font-weight="bold">← 2. Motor Nerve (Yank Arm Command!)</text>

          <!-- Arm Muscle Jerk Indicator -->
          <rect x="75" y="85" width="55" height="24" rx="6" fill="#10b981" stroke="#34d399" stroke-width="2" />
          <text x="80" y="101" fill="#fff" font-size="10" font-weight="bold">BICEPS</text>
        </svg>
      </div>
    `;
  }

  // Brain Model
  return `
    <div style="display: flex; gap: 1.5rem; width: 100%; max-width: 820px; align-items: center; justify-content: space-around; flex-wrap: wrap;">
      <!-- Brain SVG with active highlight -->
      <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(139, 92, 246, 0.35); border-radius: 14px; padding: 1rem; width: 360px; text-align: center;">
        <h5 style="color: var(--accent-purple); margin-bottom: 0.4rem; font-size: 1rem;">Human Brain Architecture</h5>
        <svg viewBox="0 0 320 220" width="100%" height="190" class="brain-vis-svg">
          <!-- Cerebrum (Top Dome with Convolutions) -->
          <path d="M 60 130 C 40 80, 70 30, 150 25 C 230 20, 280 60, 270 120 C 260 145, 210 150, 180 140 C 130 145, 80 145, 60 130 Z" 
                fill="${part === 'cerebrum' ? '#8b5cf6' : '#475569'}" 
                stroke="${part === 'cerebrum' ? '#c084fc' : '#94a3b8'}" 
                stroke-width="3" 
                filter="${part === 'cerebrum' ? 'drop-shadow(0 0 10px rgba(139,92,246,0.8))' : 'none'}" />
          <!-- Cerebrum walnut folds lines -->
          <path d="M 90 60 Q 140 80 120 110 M 150 45 Q 170 95 190 65 M 200 80 Q 240 105 220 130" fill="none" stroke="#cbd5e1" stroke-width="2" opacity="0.6" />
          <text x="120" y="85" fill="#fff" font-size="13" font-weight="bold">CEREBRUM</text>

          <!-- Cerebellum (Back Bottom Cauliflower) -->
          <path d="M 195 135 C 240 135, 270 160, 250 185 C 220 205, 180 190, 175 160 Z" 
                fill="${part === 'cerebellum' ? '#10b981' : '#334155'}" 
                stroke="${part === 'cerebellum' ? '#34d399' : '#64748b'}" 
                stroke-width="3" 
                filter="${part === 'cerebellum' ? 'drop-shadow(0 0 10px rgba(16,185,129,0.8))' : 'none'}" />
          <text x="185" y="165" fill="#fff" font-size="11" font-weight="bold">CEREBELLUM</text>

          <!-- Medulla (Brain Stem leading to spinal cord) -->
          <path d="M 150 145 L 175 155 L 145 215 L 125 210 Z" 
                fill="${part === 'medulla' ? '#f59e0b' : '#1e293b'}" 
                stroke="${part === 'medulla' ? '#fbbf24' : '#475569'}" 
                stroke-width="3" 
                filter="${part === 'medulla' ? 'drop-shadow(0 0 10px rgba(245,158,11,0.8))' : 'none'}" />
          <text x="75" y="195" fill="${part === 'medulla' ? '#fbbf24' : '#94a3b8'}" font-size="11" font-weight="bold">MEDULLA →</text>
        </svg>
      </div>

      <!-- Clinical / Daily Life Info Card -->
      <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(139, 92, 246, 0.35); border-radius: 14px; padding: 1.2rem; width: 380px; text-align: left;">
        ${getBrainCardHTML(part)}
      </div>
    </div>
  `;
}

function getBrainCardHTML(part) {
  if (part === 'cerebrum') {
    return `
      <span class="badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc; font-weight: 700; font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 4px;">Top Dome • ~85% of Mass</span>
      <h4 style="color: #fff; margin: 0.5rem 0; font-size: 1.25rem;">🧠 The Cerebrum (CPU)</h4>
      <p style="font-size: 0.9rem; color: #cbd5e1; margin-bottom: 0.6rem;">Has deep grooves and ridges resembling a walnut. Controls all mental and conscious operations.</p>
      <ul style="font-size: 0.88rem; color: #94a3b8; padding-left: 1.2rem; line-height: 1.5;">
        <li><strong>Mental Powers:</strong> Thinking, reasoning, logic, memory, spelling, imagination.</li>
        <li><strong>Sensory Center:</strong> Decodes vision from eyes, hearing from ears, taste, touch, smell.</li>
        <li><strong>Contralateral Rule:</strong> Left hemisphere controls right side of body; right hemisphere controls left!</li>
      </ul>
      <div style="margin-top: 0.75rem; background: rgba(139, 92, 246, 0.15); padding: 0.4rem 0.7rem; border-radius: 6px; font-size: 0.85rem; color: #e9d5ff;">
        <strong>Daily Example:</strong> Memorizing your times tables and solving a science test!
      </div>
    `;
  } else if (part === 'cerebellum') {
    return `
      <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7; font-weight: 700; font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 4px;">Lower Back • Muscle Master</span>
      <h4 style="color: #fff; margin: 0.5rem 0; font-size: 1.25rem;">🤸 The Cerebellum (Gymnast)</h4>
      <p style="font-size: 0.9rem; color: #cbd5e1; margin-bottom: 0.6rem;">Located under the cerebrum. Coordinates muscle timing and equilibrium.</p>
      <ul style="font-size: 0.88rem; color: #94a3b8; padding-left: 1.2rem; line-height: 1.5;">
        <li><strong>Muscle Coordination:</strong> Makes limb movements smooth and graceful instead of clumsy.</li>
        <li><strong>Balance & Posture:</strong> Works closely with inner ear fluid canals so you stay upright.</li>
        <li><strong>If Damaged:</strong> Walking becomes staggering, movements become jerky, speech slurs.</li>
      </ul>
      <div style="margin-top: 0.75rem; background: rgba(16, 185, 129, 0.15); padding: 0.4rem 0.7rem; border-radius: 6px; font-size: 0.85rem; color: #a7f3d0;">
        <strong>Daily Example:</strong> Riding a two-wheel bicycle or balancing on one foot!
      </div>
    `;
  } else {
    return `
      <span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a; font-weight: 700; font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 4px;">Brain Stem • Autonomous Life</span>
      <h4 style="color: #fff; margin: 0.5rem 0; font-size: 1.25rem;">🫀 The Medulla (24/7 Life Guard)</h4>
      <p style="font-size: 0.9rem; color: #cbd5e1; margin-bottom: 0.6rem;">Connects the brain to the spinal cord. Controls involuntary vitals.</p>
      <ul style="font-size: 0.88rem; color: #94a3b8; padding-left: 1.2rem; line-height: 1.5;">
        <li><strong>Never Sleeps:</strong> Operates 24 hours a day, 365 days a year without a single break!</li>
        <li><strong>Vital Functions:</strong> Heartbeat, breathing rate, blood circulation, blood pressure.</li>
        <li><strong>Protective Reflexes:</strong> Sneezing, coughing, swallowing food down food pipe.</li>
      </ul>
      <div style="margin-top: 0.75rem; background: rgba(245, 158, 11, 0.15); padding: 0.4rem 0.7rem; border-radius: 6px; font-size: 0.85rem; color: #fef3c7;">
        <strong>Daily Example:</strong> Keeping your heart pumping and lungs breathing while you sleep at 3 AM!
      </div>
    `;
  }
}

function getNervousExplanationHTML(part, isReflex) {
  if (isReflex) {
    return `
      <strong style="color: #ef4444;">⚡ REFLEX ACTION EMERGENCY LOOP:</strong> 
      Reaction time is only <strong>~0.05 seconds</strong>! Heat is sensed by skin → Sensory nerve carries signal to <strong>Spinal Cord</strong> → Spinal cord directly fires motor nerve → Biceps contracts and jerks hand away! 
      <em>(The message reaches your cerebrum only AFTER your hand is safe, which is why you scream "OUCH!" a fraction of a second later!)</em>
    `;
  }

  return `
    <strong>CENTRAL NERVOUS SYSTEM BLUEPRINT:</strong> 
    The <strong>Cerebrum</strong> thinks and stores memories; the <strong>Cerebellum</strong> balances muscles; the <strong>Medulla</strong> keeps you alive 24/7. 
    Click <em>"🔥 Test Reflex Arc!"</em> to see how your spinal cord saves your hand from severe burns without waiting for the brain!
  `;
}

function attachNervousGadgetEvents() {
  const brainBtns = document.querySelectorAll('.lab-btn[data-brain]');
  brainBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      AudioController.click();
      brainBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.labStates.brainPart = btn.getAttribute('data-brain');
      state.labStates.reflexTriggered = false;
      const reflexBtn = document.getElementById('btn-trigger-reflex');
      if (reflexBtn) reflexBtn.classList.remove('active');
      updateNervousGadgetView();
    });
  });

  const reflexBtn = document.getElementById('btn-trigger-reflex');
  if (reflexBtn) {
    reflexBtn.addEventListener('click', () => {
      AudioController.fanfare();
      state.labStates.reflexTriggered = true;
      brainBtns.forEach(b => b.classList.remove('active'));
      reflexBtn.classList.add('active');
      updateNervousGadgetView();
    });
  }
}

function updateNervousGadgetView() {
  const stage = document.getElementById('nervous-stage');
  const exp = document.getElementById('nervous-explanation');
  if (stage) stage.innerHTML = getNervousStageHTML(state.labStates.brainPart, state.labStates.reflexTriggered);
  if (exp) exp.innerHTML = getNervousExplanationHTML(state.labStates.brainPart, state.labStates.reflexTriggered);
}

function attachGadgetEvents(ch) {
  if (ch.id === 'ch3_skeletal') {
    attachSkeletalGadgetEvents();
  } else if (ch.id === 'ch4_nervous') {
    attachNervousGadgetEvents();
  } else if (ch.id === 'ch13_matter') {
    const svgEl = document.getElementById('molecule-svg');
    renderMoleculeSVG(svgEl, state.labStates.moleculeState);

    const btns = document.querySelectorAll('.lab-btn[data-state]');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        AudioController.click();
        btns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        state.labStates.moleculeState = b.getAttribute('data-state');
        renderMoleculeSVG(svgEl, state.labStates.moleculeState);
        const expEl = document.getElementById('molecule-explanation');
        if (expEl) expEl.innerHTML = getMoleculeExplanation(state.labStates.moleculeState);
      });
    });
  } else if (ch.id === 'ch7_air_water') {
    const svgEl = document.getElementById('balance-svg');
    renderBalanceSVG(svgEl, state.labStates.balloonState === 'pricked');

    const btns = document.querySelectorAll('.lab-btn[data-balloon]');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        AudioController.click();
        btns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        state.labStates.balloonState = b.getAttribute('data-balloon');
        const isPricked = state.labStates.balloonState === 'pricked';
        renderBalanceSVG(svgEl, isPricked);
        const expEl = document.getElementById('balloon-explanation');
        if (expEl) {
          expEl.innerHTML = isPricked 
            ? 'When the right balloon is pricked, air escapes! <strong>The left inflated balloon dips down</strong>, proving air has measurable weight and mass!'
            : 'Both balloons are inflated with equal air. <strong>The scale remains balanced</strong>, proving both sides hold equal mass.';
        }
      });
    });
  } else if (ch.id === 'ch5_health') {
    const btns = document.querySelectorAll('.lab-btn[data-nutrient]');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        AudioController.click();
        btns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        state.labStates.dietNutrient = b.getAttribute('data-nutrient');
        const stage = document.getElementById('nutrient-stage');
        if (stage) stage.innerHTML = getNutrientCard(state.labStates.dietNutrient);
      });
    });
  } else {
    // L-2 Animals
    const btns = document.querySelectorAll('.lab-btn[data-animal]');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        AudioController.click();
        btns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        state.labStates.animalSelected = b.getAttribute('data-animal');
        const stage = document.getElementById('animal-stage');
        if (stage) stage.innerHTML = getAnimalCard(state.labStates.animalSelected);
      });
    });
  }
}

// ==========================================================================
// 7. MODE 2: SPOT THE EXAM TRAP ("BE THE TEACHER")
// ==========================================================================
function renderTrapsView(container) {
  const ch = getActiveChapter();

  // Calculate chapter traps progress
  let diagnosedCount = 0;
  let correctDiagnoses = 0;
  ch.examTraps.forEach(trap => {
    const saved = state.trapAnswers[trap.id];
    if (typeof saved === 'number') {
      diagnosedCount++;
      const correctIdx = (typeof trap.correctIndex === 'number') ? trap.correctIndex : (typeof trap.correct === 'number' ? trap.correct : 0);
      if (saved === correctIdx) correctDiagnoses++;
    }
  });

  let html = `
    <div class="view-header">
      <div class="view-header-title">
        <h3>🔍 ${ch.number}: Spot the Exam Traps</h3>
        <p>You are the Teacher! Diagnose simulated CBSE student mistakes and <strong>choose the 1 correct diagnosis option</strong> for each student paper.</p>
      </div>
    </div>

    <!-- High-Visibility Mission Instruction Banner -->
    <div class="traps-mission-banner">
      <div class="mission-banner-icon">🎯</div>
      <div class="mission-banner-body">
        <div class="mission-banner-title">
          <span>TEACHER MISSION: CHOOSE 1 CORRECT DIAGNOSIS</span>
          <span class="mission-banner-type-badge">Multiple Choice • Pick 1</span>
        </div>
        <p class="mission-banner-desc">
          Each card below shows a simulated student test paper with a classic misconception.
          <strong>Choose the 1 correct option</strong> that accurately diagnoses why their answer is wrong. The other options are tempting distractor traps!
        </p>
      </div>
      <div class="mission-banner-stats">
        <div class="mission-stat-badge">
          <span>Diagnosed:</span>
          <strong>${diagnosedCount} / ${ch.examTraps.length}</strong>
          ${diagnosedCount > 0 ? `<span class="stat-correct-count">(${correctDiagnoses} Correct)</span>` : ''}
        </div>
        ${diagnosedCount > 0 ? `
          <button class="btn-reset-traps-all" id="btn-reset-all-traps" title="Clear your answers and retry diagnosing all traps in this chapter">
            🔄 Reset Traps
          </button>
        ` : ''}
      </div>
    </div>

    <div class="traps-container">
  `;

  ch.examTraps.forEach((trap, i) => {
    const savedAnswer = state.trapAnswers[trap.id];
    const isAnswered = typeof savedAnswer === 'number';
    const correctIdx = (typeof trap.correctIndex === 'number') ? trap.correctIndex : (typeof trap.correct === 'number' ? trap.correct : 0);
    const isCorrect = isAnswered && (savedAnswer === correctIdx);

    html += `
      <div class="trap-card ${isAnswered ? (isCorrect ? 'trap-card-correct' : 'trap-card-wrong') : ''}" id="card-${trap.id}">
        <div class="trap-header">
          <span class="student-tag">⚠️ Simulated Student Paper: ${trap.student}</span>
          <div class="trap-header-right">
            ${isAnswered ? (isCorrect ? '<span class="trap-status-badge badge-success">✓ Diagnosed Correctly</span>' : '<span class="trap-status-badge badge-warning">⚠️ Reviewed</span>') : '<span class="trap-status-badge badge-pending">Needs Diagnosis</span>'}
            <span class="trap-number">Trap ${i + 1} of ${ch.examTraps.length}</span>
          </div>
        </div>

        <div class="student-answer-slip">
          <div class="slip-label">Exam Question:</div>
          <div class="slip-question">${trap.question}</div>
          <div class="slip-label">${trap.student}’s Written Answer:</div>
          <div class="slip-response">"${trap.studentAnswer}"</div>
        </div>

        <div class="trap-prompt">
          <span class="prompt-icon">🧑‍🏫</span>
          <div>
            <span class="prompt-title">Teacher Diagnostic Question:</span>
            <span class="prompt-text">${trap.prompt}</span>
          </div>
        </div>

        <div class="trap-choose-instruction">
          <div class="instruction-main">
            <span class="instruction-badge">👉 YOUR TASK</span>
            <strong>Choose 1 Correct Diagnosis:</strong>
          </div>
          <span class="instruction-sub">Only ONE option below correctly identifies the error — tap the correct one:</span>
        </div>

        <div class="trap-options" role="radiogroup" aria-label="Diagnostic options for Trap ${i + 1}">
          ${trap.options.map((opt, optIndex) => {
            const letters = ['Option A', 'Option B', 'Option C', 'Option D'];
            let cls = '';
            let radioContent = '<span class="trap-radio-circle"></span>';
            let pillBadge = '<span class="opt-hint-pill">Tap to choose</span>';

            if (isAnswered) {
              if (optIndex === correctIdx) {
                cls = 'selected-correct';
                radioContent = '<span class="trap-radio-symbol correct">✓</span>';
                pillBadge = optIndex === savedAnswer 
                  ? '<span class="opt-status-tag tag-correct">✓ Your Choice: Correct Diagnosis!</span>'
                  : '<span class="opt-status-tag tag-actual">✓ True Scientific Diagnosis</span>';
              } else if (optIndex === savedAnswer) {
                cls = 'selected-wrong';
                radioContent = '<span class="trap-radio-symbol wrong">✗</span>';
                pillBadge = '<span class="opt-status-tag tag-wrong">✗ Your Choice: Incorrect</span>';
              } else {
                cls = 'opt-distractor';
                radioContent = '<span class="trap-radio-circle dim"></span>';
                pillBadge = '<span class="opt-status-tag tag-distractor">Distractor Trap</span>';
              }
            }

            return `
              <button class="trap-option-btn ${cls}" 
                data-trap-id="${trap.id}" 
                data-opt-index="${optIndex}"
                ${isAnswered ? 'disabled' : ''}
                aria-label="${letters[optIndex]}: ${opt}">
                <div class="trap-opt-left">
                  <span class="trap-opt-letter">${letters[optIndex]}</span>
                  ${radioContent}
                </div>
                <div class="trap-opt-content">
                  <span class="trap-opt-text">${opt}</span>
                  ${pillBadge}
                </div>
              </button>
            `;
          }).join('')}
        </div>

        ${isAnswered ? `
          <div class="trap-feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}">
            <div class="feedback-heading">
              <span class="feedback-icon">${isCorrect ? '🎉' : '💡'}</span>
              <h5>${isCorrect ? 'Excellent Teacher Diagnosis!' : 'Teacher Diagnosis & Master Explanation:'}</h5>
            </div>
            <p>${trap.teacherFeedback}</p>
          </div>
        ` : ''}
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;

  // Event Listeners for Trap Options
  const optionBtns = container.querySelectorAll('.trap-option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const trapId = btn.getAttribute('data-trap-id');
      const optIndex = parseInt(btn.getAttribute('data-opt-index'), 10);
      const trap = ch.examTraps.find(t => t.id === trapId);
      if (!trap) return;

      state.trapAnswers[trapId] = optIndex;
      saveActiveState();

      const correctIdx = (typeof trap.correctIndex === 'number') ? trap.correctIndex : (typeof trap.correct === 'number' ? trap.correct : 0);
      if (optIndex === correctIdx) {
        AudioController.correct();
        triggerFlash('correct');
        ConfettiController.launch();
      } else {
        AudioController.wrong();
        triggerFlash('wrong');
      }

      // Re-evaluate chapter stars whenever a trap is answered
      evaluateAndAwardStars(state.activeChapterId);

      renderTrapsView(container);
    });
  });

  // Reset all traps for active chapter listener
  const resetBtn = container.querySelector('#btn-reset-all-traps');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      ch.examTraps.forEach(t => {
        delete state.trapAnswers[t.id];
      });
      saveActiveState();
      renderTrapsView(container);
    });
  }
}

// ==========================================================================
// 8. MODE 3: PRACTICE & SCHOOL WORKSHEETS
// ==========================================================================
function renderPracticeView(container) {
  const ch = getActiveChapter();

  // Filter questions by worksheet number first
  let filtered = ch.questions;
  if (state.activeWsFilter !== 'all') {
    filtered = filtered.filter(q => q.wsNumber === state.activeWsFilter);
  }
  // Then filter by category
  if (state.activePracticeFilter !== 'all') {
    filtered = filtered.filter(q => q.category === state.activePracticeFilter);
  }
  // Fallback if no questions match
  if (filtered.length === 0) {
    state.activePracticeFilter = 'all';
    state.activeWsFilter = 'all';
    filtered = ch.questions;
  }

  // Ensure valid current index
  if (state.currentQuestionIndex >= filtered.length) {
    state.currentQuestionIndex = 0;
  }
  const q = filtered[state.currentQuestionIndex];
  const answeredInfo = state.answeredMap[q.id];
  const isAnswered = !!answeredInfo;

  let html = `
    <div class="practice-container">
      <div class="view-header">
        <div class="view-header-title">
          <h3>🧩 ${ch.number} School Worksheet Practice</h3>
          <p>Real thinking exercises, diagrams, and questions from CBSE school revision worksheets.</p>
        </div>
      </div>

      <!-- Worksheet Filter Pills -->
      <div class="practice-filters" style="margin-bottom: 0.5rem;">
        <button class="filter-pill ws-filter ${state.activeWsFilter === 'all' ? 'active' : ''}" data-wsfilter="all">📚 All Worksheets</button>
        <button class="filter-pill ws-filter ${state.activeWsFilter === 1 ? 'active' : ''}" data-wsfilter="1">📄 WS I</button>
        <button class="filter-pill ws-filter ${state.activeWsFilter === 2 ? 'active' : ''}" data-wsfilter="2">📄 WS II</button>
        <button class="filter-pill ws-filter ${state.activeWsFilter === 3 ? 'active' : ''}" data-wsfilter="3">📄 WS III</button>
      </div>

      <!-- Category Filter Pills -->
      <div class="practice-filters">
        <button class="filter-pill ${state.activePracticeFilter === 'all' ? 'active' : ''}" data-filter="all">🎯 All Types (${ch.questions.length})</button>
        <button class="filter-pill ${state.activePracticeFilter === 'mcq' ? 'active' : ''}" data-filter="mcq">🔘 MCQs & Deductions</button>
        <button class="filter-pill ${state.activePracticeFilter === 'whoami' ? 'active' : ''}" data-filter="whoami">❓ Who Am I? Riddles</button>
        <button class="filter-pill ${state.activePracticeFilter === 'compare' ? 'active' : ''}" data-filter="compare">⚖️ Compare & Contrast</button>
        <button class="filter-pill ${state.activePracticeFilter === 'oddone' ? 'active' : ''}" data-filter="oddone">🔍 Odd One Out</button>
        <button class="filter-pill ${state.activePracticeFilter === 'scenario' ? 'active' : ''}" data-filter="scenario">🧪 Case Studies & Scenarios</button>
      </div>

      <!-- Status Bar -->
      <div class="practice-header-bar">
        <div class="practice-counter">
          Question <span>${state.currentQuestionIndex + 1}</span> of <span>${filtered.length}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div class="practice-score-badge">
            <span class="score-item score-correct">✅ ${state.scoreCorrect}</span>
            <span class="score-item score-wrong">❌ ${state.scoreWrong}</span>
          </div>
          <div class="practice-stars-display" title="Mastery Stars for ${ch.number}" style="font-size: 1.15rem; letter-spacing: 2px;">
            ${'⭐'.repeat(getChapterStars(ch.id))}${'☆'.repeat(3 - getChapterStars(ch.id))}
          </div>
        </div>
      </div>

      <!-- Question Card -->
      <div class="question-card">
        <div class="question-meta-row">
          <span class="question-source-tag">${q.source}</span>
          <span class="question-marks">${q.marks}</span>
        </div>

        <div class="question-body">${q.body}</div>
        ${q.image ? `<div class="question-diagram-wrap"><img src="${q.image}" alt="Worksheet Diagram" class="question-diagram-img" /></div>` : ''}

        <div class="options-grid">
          ${q.options.map((opt, idx) => {
            const letters = ['A', 'B', 'C', 'D'];
            let cls = '';
            if (isAnswered) {
              if (idx === q.correct) cls = 'correct';
              else if (idx === answeredInfo.selectedIndex) cls = 'wrong';
            }
            return `
              <button class="option-btn ${cls}" 
                data-idx="${idx}" 
                ${isAnswered ? 'disabled' : ''}>
                <span class="option-letter">${letters[idx] || (idx + 1)}</span>
                <span class="option-text">${opt}</span>
              </button>
            `;
          }).join('')}
        </div>

        ${isAnswered ? `
          <div class="explanation-card">
            <div class="explanation-header">
              ${answeredInfo.isCorrect ? '✅ Brilliant Scientific Deduction!' : '💡 Conceptual Explanation:'}
            </div>
            <div class="explanation-text">${q.explanation}</div>
            <div class="explanation-key-takeaway">
              📌 Key Takeaway: ${q.takeaway}
            </div>
          </div>
        ` : ''}

        <!-- Navigation Buttons -->
        <div class="question-nav-row">
          <button class="btn btn-secondary" id="btn-prev-q" ${state.currentQuestionIndex === 0 ? 'disabled' : ''}>
            ← Previous
          </button>
          <button class="btn btn-primary" id="btn-next-q">
            ${state.currentQuestionIndex === filtered.length - 1 ? 'Finish Drill 🏆' : 'Next Question →'}
          </button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Worksheet filter click handlers
  const wsFilterPills = container.querySelectorAll('.ws-filter');
  wsFilterPills.forEach(p => {
    p.addEventListener('click', () => {
      AudioController.click();
      const val = p.getAttribute('data-wsfilter');
      state.activeWsFilter = val === 'all' ? 'all' : parseInt(val, 10);
      state.currentQuestionIndex = 0;
      saveActiveState();
      renderPracticeView(container);
    });
  });

  // Category filter click handlers
  const filterPills = container.querySelectorAll('.filter-pill:not(.ws-filter)');
  filterPills.forEach(p => {
    p.addEventListener('click', () => {
      AudioController.click();
      state.activePracticeFilter = p.getAttribute('data-filter');
      state.currentQuestionIndex = 0;
      saveActiveState();
      renderPracticeView(container);
    });
  });

  // Option selection
  const optionBtns = container.querySelectorAll('.option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      const isCorrect = (idx === q.correct);

      state.answeredMap[q.id] = { selectedIndex: idx, isCorrect };

      if (isCorrect) {
        state.scoreCorrect++;
        AudioController.correct();
        triggerFlash('correct');
        evaluateAndAwardStars(state.activeChapterId);
      } else {
        state.scoreWrong++;
        AudioController.wrong();
        triggerFlash('wrong');
      }

      saveActiveState();
      renderPracticeView(container);
    });
  });

  // Navigation handlers
  const prevBtn = document.getElementById('btn-prev-q');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.currentQuestionIndex > 0) {
        AudioController.click();
        state.currentQuestionIndex--;
        saveActiveState();
        renderPracticeView(container);
      }
    });
  }

  const nextBtn = document.getElementById('btn-next-q');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      AudioController.click();
      if (state.currentQuestionIndex < filtered.length - 1) {
        state.currentQuestionIndex++;
        saveActiveState();
        renderPracticeView(container);
      } else {
        // Complete drill & show modal
        showResultsModal(state.scoreCorrect, filtered.length);
      }
    });
  }
}

// ==========================================================================
// 9. MODE 4: 60-SECOND SCIENCE SPRINT
// ==========================================================================
function renderChallengeView(container) {
  const ch = getActiveChapter();

  let html = `
    <div class="sprint-container">
      <div class="view-header" style="justify-content: center; text-align: center;">
        <div class="view-header-title">
          <h3>⚡ 60-Second Science Sprint</h3>
          <p>Put your scientific instincts to the test under rapid-fire conditions!</p>
        </div>
      </div>

      <div class="sprint-intro-card" id="sprint-intro">
        <div class="sprint-badge">⏱️</div>
        <h3>Rapid-Fire Recall: ${ch.title}</h3>
        <p>Answer as many conceptual science questions as you can in 60 seconds. Accuracy and quick thinking earn stars!</p>

        <div class="sprint-rules">
          <div class="rule-box">
            <div class="rule-icon">⚡</div>
            <div class="rule-title">60 Seconds</div>
            <div class="rule-desc">Fast-paced timer</div>
          </div>
          <div class="rule-box">
            <div class="rule-icon">🎯</div>
            <div class="rule-title">+10 Points</div>
            <div class="rule-desc">Per correct deduction</div>
          </div>
          <div class="rule-box">
            <div class="rule-icon">⭐</div>
            <div class="rule-title">Up to 3 Stars</div>
            <div class="rule-desc">Earn syllabus mastery</div>
          </div>
        </div>

        <button class="btn btn-primary" id="btn-start-sprint" style="font-size: 1.1rem; padding: 0.85rem 2rem;">
          🚀 Start 60s Sprint Now!
        </button>
      </div>

      <!-- Live Sprint Interface -->
      <div class="sprint-game-wrap" id="sprint-live">
        <div class="sprint-timer-bar-wrap">
          <div class="sprint-timer-bar-fill" id="sprint-timer-bar"></div>
        </div>

        <div class="sprint-live-stats">
          <div class="sprint-clock">⏳ <span id="sprint-time-label">60</span>s</div>
          <div class="sprint-score">Score: <span id="sprint-score-label">0</span></div>
        </div>

        <div class="question-card" id="sprint-q-card">
          <!-- Dynamically injected during sprint loop -->
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  const startBtn = document.getElementById('btn-start-sprint');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      AudioController.click();
      startSprintGame();
    });
  }
}

function startSprintGame() {
  const intro = document.getElementById('sprint-intro');
  const live = document.getElementById('sprint-live');
  if (!intro || !live) return;

  intro.style.display = 'none';
  live.style.display = 'block';

  const ch = getActiveChapter();
  // Shuffle questions for sprint
  state.sprint.questions = [...ch.questions].sort(() => Math.random() - 0.5);
  state.sprint.running = true;
  state.sprint.timeLeft = 60;
  state.sprint.score = 0;
  state.sprint.currentIndex = 0;

  renderSprintQuestion();

  // Timer loop
  clearInterval(state.sprint.timerId);
  state.sprint.timerId = setInterval(() => {
    state.sprint.timeLeft--;
    const timeLabel = document.getElementById('sprint-time-label');
    const timeBar = document.getElementById('sprint-timer-bar');
    if (timeLabel) timeLabel.textContent = state.sprint.timeLeft;
    if (timeBar) timeBar.style.width = `${(state.sprint.timeLeft / 60) * 100}%`;

    if (state.sprint.timeLeft <= 0) {
      endSprintGame();
    }
  }, 1000);
}

function renderSprintQuestion() {
  const card = document.getElementById('sprint-q-card');
  if (!card) return;

  const q = state.sprint.questions[state.sprint.currentIndex % state.sprint.questions.length];

  card.innerHTML = `
    <div class="question-meta-row">
      <span class="question-source-tag">${q.source}</span>
      <span class="question-marks">Speed Drill</span>
    </div>
    <div class="question-body">${q.body}</div>
    ${q.image ? `<div class="question-diagram-wrap" style="padding: 0.5rem; margin: 0.5rem 0;"><img src="${q.image}" alt="Worksheet Diagram" class="question-diagram-img" style="max-height: 130px;" /></div>` : ''}
    <div class="options-grid">
      ${q.options.map((opt, idx) => `
        <button class="option-btn" data-idx="${idx}">
          <span class="option-letter">${idx + 1}</span>
          <span class="option-text">${opt}</span>
        </button>
      `).join('')}
    </div>
  `;

  const btns = card.querySelectorAll('.option-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      if (idx === q.correct) {
        state.sprint.score += 10;
        AudioController.correct();
        triggerFlash('correct');
      } else {
        AudioController.wrong();
        triggerFlash('wrong');
      }

      const scoreLabel = document.getElementById('sprint-score-label');
      if (scoreLabel) scoreLabel.textContent = state.sprint.score;

      if (typeof btn.blur === 'function') btn.blur();
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }

      state.sprint.currentIndex++;
      renderSprintQuestion();
    });
  });
}

function endSprintGame() {
  clearInterval(state.sprint.timerId);
  state.sprint.running = false;

  const totalPossible = state.sprint.currentIndex;
  const correctCount = Math.round(state.sprint.score / 10);

  showResultsModal(correctCount, Math.max(correctCount, totalPossible));
}

// ==========================================================================
// 10. MODE 5: PRINTABLE WORKSHEET STUDIO
// ==========================================================================
function renderWorksheetView(container) {
  const ch = getActiveChapter();

  let html = `
    <div class="worksheet-studio">
      <div class="worksheet-controls-bar no-print">
        <div class="worksheet-select-group">
          <label>View Mode:</label>
          <select class="worksheet-select" id="ws-mode-select">
            <option value="test" ${!state.worksheetSettings.showAnswers ? 'selected' : ''}>📝 Student Test Paper (Blank Lines)</option>
            <option value="key" ${state.worksheetSettings.showAnswers ? 'selected' : ''}>🔑 Teacher Answer Key (With Solutions)</option>
          </select>
        </div>

        <button class="btn btn-primary" id="btn-do-print">
          🖨️ Print A4 Worksheet
        </button>
      </div>

      <div class="worksheet-paper">
        <div class="ws-school-header">
          <h3>CBSE SCIENCE ASSESSMENT</h3>
          <h4>THINKING CLASSROOM REVISION WORKSHEET</h4>
          <p>Class: V &nbsp;|&nbsp; Subject: Science (EVS) &nbsp;|&nbsp; Unit: ${ch.number} ${ch.title.toUpperCase()}</p>
        </div>

        <div class="ws-student-meta-grid">
          <div class="ws-meta-field">Student Name: _______________________</div>
          <div class="ws-meta-field">Roll No: ___________ &nbsp; Sec: _____</div>
          <div class="ws-meta-field">Date: ____________ &nbsp; Marks: ____/25</div>
        </div>

        <!-- Section A: Multiple Choice Thinking Questions -->
        <div class="ws-section">
          <div class="ws-section-title">SECTION A: DEDUCTIVE THINKING & MULTIPLE CHOICE (1 Mark Each)</div>
          ${ch.questions.filter(q => q.category === 'mcq').slice(0, 5).map((q, i) => `
            <div class="ws-question-item">
              <div class="ws-question-text">
                <strong>Q${i + 1}.</strong> ${q.body} <span class="ws-marks">[1M]</span>
              </div>
              ${q.image ? `<div class="ws-question-diagram-wrap"><img src="${q.image}" alt="Question Diagram" class="ws-question-diagram-img" /></div>` : ''}
              <div style="margin-left: 1.25rem; font-size: 0.88rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.25rem;">
                ${q.options.map((opt, idx) => `<div>(${String.fromCharCode(97 + idx)}) ${opt}</div>`).join('')}
              </div>
              ${state.worksheetSettings.showAnswers ? `
                <div class="ws-answer-key-box">
                  <strong>Answer:</strong> (${String.fromCharCode(97 + q.correct)}) ${q.options[q.correct]}<br>
                  <em>Reasoning:</em> ${q.explanation}
                </div>
              ` : `
                <div style="margin-top: 0.4rem; font-weight: 600;">Ans: (___)</div>
              `}
            </div>
          `).join('')}
        </div>

        <!-- Section B: Scientific Riddles & Concept Classification -->
        <div class="ws-section">
          <div class="ws-section-title">SECTION B: SCIENTIFIC TERMS & CLASSIFICATION (1.5 Marks Each)</div>
          ${ch.questions.filter(q => q.category === 'whoami' || q.category === 'oddone').slice(0, 3).map((q, i) => `
            <div class="ws-question-item">
              <div class="ws-question-text">
                <strong>Q${i + 6}.</strong> ${q.body} <span class="ws-marks">[1.5M]</span>
              </div>
              ${q.image ? `<div class="ws-question-diagram-wrap"><img src="${q.image}" alt="Question Diagram" class="ws-question-diagram-img" /></div>` : ''}
              ${state.worksheetSettings.showAnswers ? `
                <div class="ws-answer-key-box">
                  <strong>Answer:</strong> ${q.options[q.correct]}<br>
                  <em>Reasoning:</em> ${q.explanation}
                </div>
              ` : `
                <div class="ws-answer-lines"></div>
              `}
            </div>
          `).join('')}
        </div>

        <!-- Section C: Scenario Reasoning & Case Studies -->
        <div class="ws-section">
          <div class="ws-section-title">SECTION C: CASE STUDIES & APPLICATION (3 Marks Each)</div>
          ${ch.questions.filter(q => q.category === 'scenario' || q.category === 'compare').slice(0, 3).map((q, i) => `
            <div class="ws-question-item">
              <div class="ws-question-text">
                <strong>Q${i + 9}.</strong> ${q.body} <span class="ws-marks">[3M]</span>
              </div>
              ${q.image ? `<div class="ws-question-diagram-wrap"><img src="${q.image}" alt="Question Diagram" class="ws-question-diagram-img" /></div>` : ''}
              ${state.worksheetSettings.showAnswers ? `
                <div class="ws-answer-key-box">
                  <strong>Model Answer:</strong> ${q.options[q.correct]}<br>
                  <em>Marking Criteria:</em> ${q.explanation}
                </div>
              ` : `
                <div class="ws-answer-lines" style="height: 72px;"></div>
              `}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  const modeSelect = document.getElementById('ws-mode-select');
  if (modeSelect) {
    modeSelect.addEventListener('change', (e) => {
      AudioController.click();
      state.worksheetSettings.showAnswers = (e.target.value === 'key');
      saveActiveState();
      renderWorksheetView(container);
    });
  }

  const wsNumSelect = document.getElementById('ws-number-select');
  if (wsNumSelect) {
    wsNumSelect.addEventListener('change', (e) => {
      AudioController.click();
      state.worksheetSettings.selectedWs = e.target.value;
      saveActiveState();
      renderWorksheetView(container);
    });
  }

  const printBtn = document.getElementById('btn-do-print');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      AudioController.click();
      window.print();
    });
  }
}

// ==========================================================================
// 11. MODE 5: QUICK REVISION — COMPARISON TABLES
// ==========================================================================
const REVISION_TABLES_DATA = {
  'ch3_skeletal': [
    {
      title: '🦴 4 Movable Joints — Mechanism, Motion & Body Locations',
      icon: '🔗',
      columns: ['Joint Type', 'Mechanical Analogy', 'Degree of Movement', 'Where in Human Body', 'Action Enabled'],
      rows: [
        ['Ball and Socket', 'Joystick / Mortar & Pestle', '360° Rotary motion in all planes', 'Shoulder (Humerus in Scapula) & Hip (Femur in Pelvis)', 'Bowling a cricket ball, swinging arm, kicking leg sideways'],
        ['Hinge Joint', 'Door hinge / Pocket knife', '180° Single plane (Back and forth only)', 'Elbows, Knees, Fingers (phalanges), Toes', 'Bending elbow to drink water, kicking football, walking'],
        ['Pivot Joint', 'Steering wheel / Peg & ring', 'Rotary motion around central axis', 'Neck (between Skull and first vertebra Atlas)', 'Shaking head "No" (side to side) and nodding "Yes"'],
        ['Gliding Joint', 'Sliding floor tiles / Ice skates', 'Smooth sliding/gliding in multiple directions', 'Wrists (Carpals), Ankles (Tarsals), between Vertebrae', 'Waving goodbye, rolling ankle, twisting torso']
      ],
      takeaway: 'Ball & Socket = 360° (Shoulder/Hip) | Hinge = 1-way (Elbow/Knee) | Pivot = Neck rotation | Gliding = Sliding (Wrist/Ankle)'
    },
    {
      title: '💪 The 3 Muscle Types — Striated, Smooth & Cardiac',
      icon: '🥩',
      columns: ['Muscle Type', 'Appearance / Structure', 'Control Type', 'Locations in Body', 'Key Special Power'],
      rows: [
        ['Striated (Skeletal) Muscle', 'Striped bands like a zebra, cylindrical fibers', 'Voluntary (Under our conscious control)', 'Attached to bones of arms, legs, face, neck', 'Fast, powerful contractions for running, writing, chewing'],
        ['Smooth Muscle', 'No stripes, smooth spindle-shaped fibers', 'Involuntary (Automatic, no conscious control)', 'Walls of stomach, intestines, bladder, blood vessels', 'Slow, steady rhythmic contractions (peristalsis pushing food)'],
        ['Cardiac Muscle', 'Faintly striped, branched interconnected network', 'Involuntary (Automatic, controlled by pacemaker)', 'Found EXCLUSIVELY in the walls of the Heart', 'Never gets tired! Pumps blood 24/7 throughout your entire life']
      ],
      takeaway: 'Striated = Voluntary (Arms/Legs) | Smooth = Involuntary (Digestive/Vessels) | Cardiac = Heart wall, tireless 24/7'
    },
    {
      title: '🔗 Tendons vs Ligaments — The Master Rule',
      icon: '🧬',
      columns: ['Feature', 'Ligament (3 Ls Rule)', 'Tendon (3 Ts Rule)'],
      rows: [
        ['What it connects', 'Like to Like: Bone to Bone', 'Two Types: Muscle to Bone'],
        ['Primary Function', 'Holds bones together at joints and prevents dislocations', 'Transmits pulling force from contracting muscle to bone'],
        ['Elasticity', 'More elastic and flexible to allow joint motion', 'Tough, inelastic cord with extreme tensile strength'],
        ['Classic Example', 'Anterior Cruciate Ligament (ACL) stabilizing the knee', 'Achilles tendon connecting calf muscle to heel bone']
      ],
      takeaway: 'Remember: 3 Ls = Ligaments for Like to Like (Bone-Bone) | 3 Ts = Tendons for Two Types (Muscle-Bone)'
    },
    {
      title: '🏗️ Human Skeleton Master Blueprint — 206 Bones',
      icon: '💀',
      columns: ['Skeletal Component', 'Number of Bones', 'Key Structural Parts', 'Vital Organs Protected'],
      rows: [
        ['Skull', '22 Bones (8 Cranial + 14 Facial)', 'Braincase sutures + only ONE movable lower jaw (mandible)', 'Brain, eyes, inner ears, olfactory bulb'],
        ['Vertebral Column (Spine)', '33 Vertebrae', 'Stacked ring bones separated by flexible cartilage discs', 'Spinal cord (central communication superhighway)'],
        ['Ribcage', '25 Bones (12 pairs = 24 ribs + 1 sternum)', 'First 10 pairs attach to sternum; last 2 pairs are floating ribs', 'Heart and Lungs (allows thoracic volume expansion)'],
        ['Upper Limbs (Arms)', '60 Bones (30 per arm)', 'Humerus (upper arm), Radius & Ulna (forearm), carpals & fingers', 'Carrying, lifting, precision manipulation, tool use'],
        ['Lower Limbs (Legs)', '60 Bones (30 per leg)', 'Femur (thigh — longest bone!), Patella (knee), Tibia & Fibula', 'Locomotion, upright posture, supporting full body mass'],
        ['Girdles', '6 Bones (2 Pectoral + 2 Pelvic)', 'Pectoral (shoulder blades & collarbones), Pelvic (hip bones)', 'Anchors limbs to torso and supports abdominal viscera']
      ],
      takeaway: 'Adult = 206 bones | Skull = 22 | Spine = 33 | Ribcage = 25 | Upper + Lower limbs = 120 | Girdles = 6'
    }
  ],
  'ch4_nervous': [
    {
      title: '🧠 The 3 Brain Departments — Cerebrum, Cerebellum & Medulla',
      icon: '💻',
      columns: ['Brain Part', 'Location & Appearance', 'What It Controls (Functions)', 'What Happens If Impaired?', 'Daily Life Example'],
      rows: [
        ['Cerebrum', 'Top dome; largest part (~85%); folded walnut convolutions', 'Thinking, memory, logic, speech, reading, emotions, 5 senses', 'Memory loss, inability to speak, loss of conscious thought', 'Solving a maths puzzle, remembering a friend\'s name'],
        ['Cerebellum', 'Lower back below cerebrum; cauliflower-like folds', 'Voluntary muscle coordination, body balance, posture', 'Loss of equilibrium, staggering/clumsy walk, slurred speech', 'Riding a bicycle without falling, gymnastics, walking a line'],
        ['Medulla (Brain Stem)', 'Bottom stem connecting brain to top of spinal cord', 'Involuntary life vitals: heartbeat, breathing, swallowing, blood pressure', 'Fatal! Cessation of breathing and heart pumping', 'Breathing smoothly while in deep sleep at night']
      ],
      takeaway: 'Cerebrum = Thinking & Senses | Cerebellum = Balance & Muscle Coordination | Medulla = 24/7 Life Vitals (never sleeps!)'
    },
    {
      title: '⚡ Reflex Action vs Voluntary Action — Who Decides?',
      icon: '⚡',
      columns: ['Feature', 'Reflex Action (Emergency Bypass)', 'Voluntary Action (Conscious Choice)'],
      rows: [
        ['Controlling Center', 'Spinal Cord (Bypasses brain to save vital milliseconds!)', 'Cerebrum of Brain (Analyzes, thinks, and decides)'],
        ['Speed & Nature', 'Lightning-fast (~0.05 s), automatic, involuntary', 'Slower, deliberate, conscious, thoughtful'],
        ['Involvement of Thought', 'Zero thinking! Reaction occurs before conscious awareness', 'Requires conscious attention, evaluation, and choice'],
        ['Primary Purpose', 'Immediate protection against burns, cuts, and bodily trauma', 'Goal-directed daily tasks, learning, and communication'],
        ['Classic Examples', 'Pulling hand from hot iron, blinking at flying dust, knee jerk', 'Writing an essay, packing school bag after bell rings, kicking ball']
      ],
      takeaway: 'Reflex = Spinal Cord instant emergency protection | Voluntary = Cerebrum conscious decision'
    },
    {
      title: '📡 The 3 Nerve Types — Biological Telegrams',
      icon: '📞',
      columns: ['Nerve Type', 'Direction of Signal', 'From Where → To Where?', 'Information Carried', 'Real-World Analogy'],
      rows: [
        ['Sensory Nerves', 'Incoming (Afferent)', 'Sense Organs → Brain & Spinal Cord', '"The stove is hot", "Traffic light is green", "Aroma of pizza"', 'Input microphone / webcam streaming data to computer'],
        ['Motor Nerves', 'Outgoing (Efferent)', 'Brain & Spinal Cord → Muscles & Glands', '"Contract bicep muscle", "Salivate saliva", "Blink eyelids"', 'Output motor / speaker executing computer instructions'],
        ['Mixed Nerves', 'Two-way traffic', 'Bidirectional between CNS and body tissues', 'Both sensory inputs and motor muscle instructions in same cable', 'Broadband internet fiber cable handling both upload and download']
      ],
      takeaway: 'Sensory = Inputs to CNS | Motor = Outputs to Muscles | Mixed = Two-way bidirectional traffic'
    },
    {
      title: '👁️ The 5 Sense Organs — Master Structure & Secret Powers',
      icon: '👁️',
      columns: ['Sense Organ', 'Sense Provided', 'Key Internal Structures', 'Connecting Nerve', 'Secret Survival Superpower'],
      rows: [
        ['Eyes', 'Vision (Sight)', 'Cornea (clear window), Iris (aperture), Pupil, Lens, Retina (screen)', 'Optic Nerve', 'Forms inverted image on retina; brain flips it right-side up!'],
        ['Ears', 'Hearing & Balance!', 'Pinna (sound funnel), Eardrum, 3 ossicle bones, Cochlea (fluid snail)', 'Auditory Nerve', 'Inner ear semicircular canals keep you upright without falling!'],
        ['Nose', 'Smell (Olfaction) & Respiration', 'Nostrils, Nasal cavity, olfactory receptors, mucus & filtering cilia', 'Olfactory Nerve', 'Detects smoke/spoiled food; smell contributes 80% to taste flavor!'],
        ['Tongue', 'Taste (Gustation) & Speech', 'Thousands of taste buds sensitive to sweet, salty, sour, bitter, umami', 'Glossopharyngeal Nerves', 'Protects against poisons (bitter warning); essential for speech'],
        ['Skin', 'Touch, Temp, Pain, Pressure', 'Epidermis shield, dermis with specialized nerve endings, sweat glands', 'Cutaneous Spinal Nerves', 'Largest organ of the body; thermal thermostat via sweating!']
      ],
      takeaway: 'Eyes → Optic | Ears → Auditory (+ Balance!) | Nose → Olfactory | Tongue → Taste | Skin → Largest Organ'
    }
  ],

  'ch2_animals': [
    {
      title: '🤿 Breathing Organs — Who Breathes How?',
      icon: '🫁',
      columns: ['Organ', 'Animals', 'Environment', 'How It Works'],
      rows: [
        ['Gills', 'Fish, tadpoles', 'Aquatic (underwater)', 'Extract dissolved O₂ from water flowing over blood-rich gill filaments.'],
        ['Spiracles → Trachea', 'Insects (grasshoppers, beetles)', 'Land & some aquatic', 'Tiny air holes along abdomen connect to tracheal tubes delivering O₂ directly to tissues.'],
        ['Moist Skin', 'Frogs, toads (amphibians)', 'Water & damp land', 'Absorb dissolved O₂ through thin, moist skin membrane underwater.'],
        ['Lungs', 'Mammals, birds, reptiles, adult frogs', 'Land', 'Inhale atmospheric air; O₂ absorbed by alveoli in lungs into blood.'],
        ['Blowholes → Lungs', 'Whales, dolphins (marine mammals)', 'Aquatic (surface to breathe)', 'Nostril-like opening on top of head; surface to inhale air into lungs.']
      ],
      takeaway: 'Fish → Gills | Insects → Spiracles | Frogs → Moist Skin + Lungs | Mammals → Lungs | Whales/Dolphins → Blowholes → Lungs'
    },
    {
      title: '🛡️ Body Coverings — Nature\'s Armor',
      icon: '🐚',
      columns: ['Covering', 'Animals', 'Material', 'Main Function'],
      rows: [
        ['Overlapping Scales', 'Fish, reptiles (snakes)', 'Keratin/bone', 'Waterproofing (fish); grip & movement assist (snake belly scales).'],
        ['Fur / Hair', 'Polar bears, dogs, cats', 'Keratin', 'Thermal insulation; double-layer fur traps warm air near skin.'],
        ['Cuticle (Exoskeleton)', 'Insects, spiders', 'Chitin', 'Hard outer armor; prevents water loss; structural support.'],
        ['Shell', 'Turtles, crabs, snails, armadillos', 'Calcium carbonate / bone', 'Tough dome for physical defense against predators.'],
        ['Feathers', 'Birds (eagles, penguins)', 'Keratin', 'Flight (wing feathers); insulation (down feathers); waterproofing.'],
        ['Blubber (under skin)', 'Whales, seals, polar bears', 'Fat layer', 'Thick subcutaneous fat providing thermal insulation in freezing water.']
      ],
      takeaway: 'Scales → Waterproofing | Fur → Warmth | Cuticle → Insect Armor | Shell → Defense | Feathers → Flight + Warmth | Blubber → Fat Insulation'
    },
    {
      title: '🦷 Dentition & Diet — What Teeth Reveal',
      icon: '🍖',
      columns: ['Diet Type', 'Teeth Features', 'Examples', 'Key Clue'],
      rows: [
        ['Herbivore', 'Flat, broad grinding molars; chisel-like incisors for cutting grass', 'Cow, horse, deer, rabbit', 'No pointed canines; wide jaw for side-to-side grinding.'],
        ['Carnivore', 'Sharp dagger canines; scissor-like carnassial (shearing) molars', 'Lion, tiger, eagle, shark', 'Prominent pointed fangs; strong jaw for gripping & tearing meat.'],
        ['Omnivore', 'Mix of both: moderate canines + broad molars', 'Bear, human, pig, crow', 'Versatile teeth for both plant and animal food.'],
        ['Rodent', 'Strong continuously-growing gnawing incisors', 'Rat, squirrel, beaver', 'Front teeth never stop growing; constant gnawing keeps them filed.']
      ],
      takeaway: 'Flat grinding molars → Herbivore | Dagger canines + shearing molars → Carnivore | Mixed teeth → Omnivore | Ever-growing incisors → Rodent'
    },
    {
      title: '🐾 Animal Locomotion — Movement Organs Across Habitats',
      icon: '🦅',
      columns: ['Habitat / Animal Group', 'Locomotion Organ', 'Movement Type', 'Key Examples', 'Special Adaptation Clue'],
      rows: [
        ['Terrestrial Mammals', 'Hooves & strong muscular legs', 'Running, galloping, leaping', 'Horse, cow, deer, cheetah', 'Hard hooves absorb shock on rough ground; long stride.'],
        ['Aerial Birds', 'Wings with flight feathers & hollow bones', 'Flying, soaring, gliding', 'Eagle, pigeon, sparrow, hawk', 'Pneumatic (hollow) bones reduce body weight for effortless flight.'],
        ['Aquatic Birds', 'Webbed feet (skin between toes)', 'Paddling, steering in water', 'Duck, swan, pelican', 'Webbed toes push maximum water like boat oars.'],
        ['Marine Animals', 'Flippers (paddle-shaped limbs)', 'Swimming, diving', 'Penguin, seal, sea turtle', 'Modified forelimbs act as underwater oars & steering rudders.'],
        ['Aquatic Fish', 'Fins & flexible muscular tail', 'Swimming, balancing', 'Shark, rohu, salmon, goldfish', 'Caudal (tail) fin provides forward thrust; dorsal fins provide balance.'],
        ['Amphibians (Frogs)', 'Webbed hind legs with muscular thighs', 'Hopping on land, paddling in water', 'Bullfrog, tree frog, toad', 'Powerful folded legs act as biological springs for jumping.'],
        ['Limbless Reptiles (Snakes)', 'Broad ventral belly scales & body muscles', 'Slithering / undulating crawl', 'Cobra, python, viper', 'Belly scales grip ground irregularities as muscular curves push forward.'],
        ['Insects', '6 jointed legs & wings', 'Walking, crawling, jumping, flying', 'Grasshopper, housefly, beetle', 'Grasshopper has enlarged hind legs for leaping; exoskeleton supports joints.']
      ],
      takeaway: 'Ducks → Webbed feet | Penguins/Seals → Flippers | Snakes → Ventral scales + muscles | Note: Nares are bird nostrils for breathing, NOT movement!'
    },
    {
      title: '🧭 Survival Strategies — Migration, Hibernation, Aestivation & Camouflage',
      icon: '❄️',
      columns: ['Strategy', 'Scientific Definition', 'Seasonal Trigger', 'Famous Animal Examples', 'Key Exam Clue'],
      rows: [
        ['Migration', 'Long-distance seasonal journey to escape extreme cold and find food/breeding sites', 'Severe winter freeze / food shortage', 'Arctic Tern (pole to pole!), Siberian Crane, Monarch Butterfly, Salmon', 'Moving away to another region; returning in spring.'],
        ['Hibernation ("Winter Sleep")', 'Prolonged deep dormant state with drastically slowed heart rate and reduced body temperature', 'Freezing winter cold & food scarcity', 'Polar bear, grizzly bear, hedgehog, bat, ground squirrel', 'Sleeping through the entire winter; lives off stored body fat.'],
        ['Aestivation ("Summer Sleep")', 'State of dormancy to survive scorching heat and prolonged dryness / drought', 'Blistering summer heat & water scarcity', 'Desert snail, lungfish, crocodile, desert tortoise', 'Burrowing into mud or sealing shell to prevent water loss.'],
        ['Camouflage (Colour Blending)', 'Ability to blend body colour, pattern, or texture with surroundings to become invisible', 'Threat from predators or hunting prey', 'Chameleon, stick insect, polar bear (white fur), tiger (stripes)', 'Concealment in habitat; avoids detection by predators and prey.']
      ],
      takeaway: 'Migration = Seasonal Travel | Hibernation = Winter Sleep (Bears) | Aestivation = Summer Sleep (Snails/Lungfish) | Camouflage = Blending In (Chameleon)'
    }
  ],
  'ch5_health': [
    {
      title: '🏥 Deficiency Diseases — Spot the Missing Nutrient',
      icon: '💊',
      columns: ['Nutrient Missing', 'Disease', 'Key Symptoms', 'Food Sources to Fix It'],
      rows: [
        ['Vitamin A', 'Night Blindness', 'Cannot see in dim light / darkness', 'Carrots 🥕, green leafy vegetables, milk, liver'],
        ['Vitamin B₁', 'Beriberi', 'Weakness, fatigue, nerve damage, heart problems', 'Unpolished rice, cereals, peas, fish'],
        ['Vitamin C', 'Scurvy', 'Bleeding gums, slow wound healing, bruising', 'Amla, oranges 🍊, guava, lemon'],
        ['Vitamin D', 'Rickets', 'Soft/bowed bones, pigeon chest, leg deformities', 'Sunlight ☀️, milk, fish, egg, butter'],
        ['Calcium', 'Osteoporosis', 'Brittle bones, frequent fractures', 'Milk 🥛, cheese, green leafy vegetables'],
        ['Iron', 'Anaemia', 'Tiredness, pale skin, shortness of breath', 'Dates, spinach 🥬, jaggery, liver'],
        ['Iodine', 'Goitre', 'Swelling in neck region (enlarged thyroid)', 'Iodised salt, seafood']
      ],
      takeaway: 'Night blindness→VitA | Beriberi→VitB | Scurvy→VitC | Rickets→VitD | Weak bones→Calcium | Tiredness→Iron | Neck swelling→Iodine'
    },
    {
      title: '🍽️ Nutrients — The Body\'s Building Blocks',
      icon: '🥗',
      columns: ['Nutrient', 'Main Function', 'Rich Food Sources', 'What Happens Without It?'],
      rows: [
        ['Carbohydrates', 'Instant energy provider (fuel for muscles & brain)', 'Rice, bread, potatoes, sugar, wheat', 'Fatigue, weakness, low energy'],
        ['Proteins', 'Body building; growth & repair of tissues', 'Eggs, fish, milk, pulses/dal, soybean', 'Slow growth, poor wound healing'],
        ['Fats', 'Stored energy; insulation; shock absorption', 'Butter, ghee, nuts, oil, cheese', 'Weight loss, poor insulation'],
        ['Vitamins (A, B, C, D)', 'Regulate body functions; boost immunity', 'Fruits, vegetables, milk, sunlight', 'Various deficiency diseases (see table above)'],
        ['Minerals (Ca, Fe, I)', 'Strong bones, blood formation, thyroid function', 'Milk, spinach, dates, iodised salt', 'Osteoporosis, anaemia, goitre'],
        ['Roughage (Fiber)', 'Aids digestion; removes waste from body', 'Whole grains, fruits, vegetables, salad', 'Constipation, digestive problems'],
        ['Water', 'Dissolves nutrients; regulates temperature; removes waste', 'Drinking water, fruits, soups', 'Dehydration, organ failure']
      ],
      takeaway: 'Carbs→Energy | Proteins→Growth & Repair | Fats→Stored Energy | Vitamins→Regulate | Minerals→Bones & Blood | Roughage→Digestion | Water→Everything!'
    },
    {
      title: '🦠 Communicable vs Non-Communicable Diseases — Spot the Difference',
      icon: '🛡️',
      columns: ['Comparison Parameter', 'Communicable (Infectious)', 'Non-Communicable (Non-Infectious)', 'Rule of Thumb'],
      rows: [
        ['Definition', 'Can spread from an infected person to a healthy person', 'Cannot spread from person to person', 'Communicable = Catchy / contagious.'],
        ['Causative Factor', 'Living microscopic pathogens (viruses, bacteria, protozoa, fungi)', 'Nutrient deficiencies, organ malfunction, lifestyle, or genetics', 'Pathogen vs Internal body cause.'],
        ['Mode of Spread', 'Air droplets (cough/sneeze), contaminated food/water, insect vectors, touch', 'Never transmitted through air, water, touch, or vectors', 'Coughing near someone cannot transmit non-communicable diseases.'],
        ['Prevention Strategy', 'Hygiene, sanitation, vector control, safe drinking water, vaccination, masks', 'Balanced diet, regular physical exercise, healthy lifestyle, food supplements', 'Sanitation & clean environment vs Proper nutrition.'],
        ['Classic Examples', 'Influenza, common cold, cholera, malaria, typhoid, dengue, tuberculosis', 'Scurvy (Vit C), Rickets (Vit D), Anaemia (Iron), Goitre (Iodine), Diabetes', 'Deficiency diseases are ALWAYS non-communicable!']
      ],
      takeaway: 'Communicable = Germs & spread between people (Flu, Malaria, Typhoid) | Non-Communicable = Deficiencies/lifestyle & cannot spread (Scurvy, Rickets, Anaemia)'
    },
    {
      title: '🦟 Disease Vectors & Modes of Transmission',
      icon: '🔬',
      columns: ['Transmission Route / Vector', 'Microbe Type', 'Disease Caused', 'How It Spreads', 'Prevention & Control Rule'],
      rows: [
        ['Female Anopheles Mosquito', 'Protozoan (Plasmodium)', 'Malaria', 'Injects parasite directly into bloodstream during blood meal', 'Clear stagnant water; use mosquito nets and repellents.'],
        ['Female Aedes Mosquito', 'Virus (Dengue virus)', 'Dengue & Chikungunya', 'Bites during daytime; breeds in clean domestic stagnant water', 'Empty and scrub water coolers and plant saucers weekly.'],
        ['Housefly', 'Bacteria & Parasites', 'Cholera, Typhoid, Diarrhoea', 'Carries germs on hairy legs from filth/faeces to uncovered food', 'Keep all food covered; wash hands thoroughly before eating.'],
        ['Air Droplets (Cough / Sneeze)', 'Viruses & Bacteria', 'Common cold, Influenza, Tuberculosis', 'Sneezing releases thousands of infectious moisture droplets into air', 'Cover mouth and nose with a handkerchief when sneezing; wear masks.'],
        ['Contaminated Water & Food', 'Bacteria & Viruses', 'Jaundice (Hepatitis A), Typhoid, Dysentery', 'Consuming untreated water or food prepared with dirty water', 'Drink boiled or filtered water; avoid exposed street food.'],
        ['Direct Contact / Fungi', 'Fungi & Parasites', 'Ringworm, Scabies, Athlete\'s Foot', 'Skin-to-skin contact or sharing towels, combs, clothes of infected person', 'Maintain personal hygiene; never share combs or towels.']
      ],
      takeaway: 'Female Anopheles → Malaria (Protozoa) | Aedes → Dengue (Virus) | Housefly → Cholera/Typhoid (Bacteria) | Sneezing → Airborne droplets'
    }
  ],
  'ch7_air_water': [
    {
      title: '💧 Water Purification Methods — Choosing the Right Technique',
      icon: '🔬',
      columns: ['Method', 'What It Removes', 'How It Works', 'Real-World Example'],
      rows: [
        ['Sedimentation', 'Heavy insoluble particles (sand, mud)', 'Let water stand still → heavy particles settle at bottom by gravity', 'Muddy river water left overnight in a bucket'],
        ['Decantation', 'Settled particles (after sedimentation)', 'Carefully pour the clear top water into another container, leaving settled mud behind', 'Pouring clear water off after sedimentation'],
        ['Filtration', 'Fine suspended particles (chalk, sawdust)', 'Pass water through filter paper / fine cloth to trap tiny particles', 'Morning tea strainer; water filter at home'],
        ['Evaporation', 'Soluble impurities remain (recovers solid)', 'Heat solution → water evaporates → solid left behind', 'Salt production from sea water'],
        ['Distillation', 'ALL impurities (soluble + insoluble)', 'Boil water → collect steam → condense back into pure liquid', 'Science labs; producing distilled water for batteries'],
        ['Boiling', 'Germs and bacteria', 'Heat water to 100°C → kills harmful microorganisms', 'Making drinking water safe at home']
      ],
      takeaway: 'Heavy particles→Sedimentation | Fine particles→Filtration | Dissolved salt→Evaporation/Distillation | Germs→Boiling'
    },
    {
      title: '🌍 Atmospheric Layers — Earth\'s Protective Blanket',
      icon: '☁️',
      columns: ['Layer (Bottom→Top)', 'Altitude', 'Temperature Trend', 'Key Facts & Significance'],
      rows: [
        ['1. Troposphere', '0 – 12 km', 'Decreases with altitude', 'Where WE live! All weather, clouds, rain happen here. Contains 75% of atmosphere\'s mass.'],
        ['2. Stratosphere', '12 – 50 km', 'Increases (ozone absorbs UV)', 'Contains the Ozone Layer (O₃) that shields Earth from harmful UV rays. Jets fly here.'],
        ['3. Mesosphere', '50 – 80 km', 'Decreases sharply', 'Meteoroids burn up here due to intense friction with air → shooting stars! Coldest layer.'],
        ['4. Thermosphere (Ionosphere)', '80 – 700 km', 'Increases dramatically', 'Electrically charged ions reflect radio waves → wireless communication! ISS orbits here.'],
        ['5. Exosphere', '700 – 10,000 km', 'Extremely hot but sparse', 'Outermost layer; merges into outer space. Satellites orbit here.']
      ],
      takeaway: 'Troposphere→Weather | Stratosphere→Ozone (UV shield) | Mesosphere→Meteors burn | Thermosphere→Radio waves & ISS | Exosphere→Space boundary'
    },
    {
      title: '🌬️ Composition of Atmospheric Air — Gases & Vital Functions',
      icon: '🎈',
      columns: ['Component', 'Percentage in Air', 'Key Property', 'Vital Role in Nature', 'Daily Life & Industrial Use'],
      rows: [
        ['Nitrogen (N₂)', '~78%', 'Colourless, odourless, does not burn or support burning', 'Dilutes oxygen so fires do not burn uncontrollably; builds plant proteins', 'Flushed into chips/snack packets to prevent rancidity; liquid nitrogen cooling.'],
        ['Oxygen (O₂)', '~21%', 'Supports combustion; active life-sustaining gas', 'Essential for cellular respiration in plants and animals to release energy', 'Hospital oxygen cylinders for patients; scuba diving and high-altitude tanks.'],
        ['Carbon Dioxide (CO₂)', '~0.04%', 'Heavier than air, non-flammable, extinguishes flames', 'Absorbed by green plants in sunlight for photosynthesis to make food', 'Used in fire extinguishers; fizz in carbonated soft drinks; solid dry ice cooling.'],
        ['Noble / Inert Gases', '~0.93% (Argon, Neon, Helium)', 'Chemically unreactive, non-toxic, odorless', 'Trace atmospheric gases', 'Argon in incandescent light bulbs; Neon in glowing display signs; Helium in balloons.'],
        ['Water Vapour', 'Variable (0.1% – 4%)', 'Invisible gaseous water; determines humidity', 'Drives the water cycle; forms clouds, dew, frost, and rain', 'Higher in coastal regions; lower in winter resulting in dry skin.'],
        ['Dust Particles & Smoke', 'Variable', 'Microscopic suspended solid particles', 'Act as condensation nuclei around which water vapour condenses into raindrops', 'Excessive amounts cause smog, reduced visibility, and respiratory allergies.']
      ],
      takeaway: 'Nitrogen (78%) = Protein builder & flame damper | Oxygen (21%) = Breathing & burning | CO₂ (0.04%) = Photosynthesis & fire extinguishers'
    },
    {
      title: '🎈 Scientific Properties of Air — Classroom Experiments & Daily Proofs',
      icon: '⚖️',
      columns: ['Property of Air', 'Classic Classroom Experiment', 'What You Observe', 'Scientific Deduction', 'Everyday Life Application'],
      rows: [
        ['Air Has Mass (Weight)', 'Two identical inflated balloons balanced on a ruler; prick one balloon', 'The side with the inflated balloon dips down immediately', 'Air trapped inside the balloon has weight, tipping the balance down', 'Inflated vehicle tyres weigh measurably more than deflated tyres.'],
        ['Air Occupies Space', 'Push an inverted open glass tumbler straight down into a bucket of water', 'Water cannot enter the tumbler until you tilt it to let air bubbles out', 'Air trapped inside the tumbler occupies space and blocks water from entering', 'Parachutes trap air to slow descent; footballs expand when pumped.'],
        ['Air Exerts Pressure in All Directions', 'Fill a glass with water, cover with thick cardboard, and turn upside down', 'Water does not spill; cardboard remains firmly pressed against the glass rim', 'Upward atmospheric pressure pushing on the cardboard exceeds downward weight of water', 'Drinking straws, medicine droppers, suction rubber wall hooks, injection syringes.'],
        ['Air Supports Combustion', 'Place an inverted glass tumbler over a burning candle on a table', 'The candle flickers and extinguishes after 10–15 seconds', 'Oxygen in the trapped air is consumed; burning ceases once O₂ is depleted', 'Covering a fire with a heavy blanket cuts off oxygen to extinguish it.'],
        ['Air Contains Water Vapour', 'Place ice cubes in a dry metal or glass tumbler on a humid day', 'Tiny water droplets appear on the OUTSIDE dry surface of the glass', 'Invisible water vapour in room air cools and condenses upon contacting cold glass', 'Morning dew on grass blades; fogging of car windows and spectacles in winter.']
      ],
      takeaway: 'Air has mass (dipping balloon balance) | Occupies space (inverted glass bubbles) | Exerts pressure (straw & suction cups) | Supports burning (candle under jar)'
    }
  ],
  'ch13_matter': [
    {
      title: '⚗️ States of Matter — Solid vs Liquid vs Gas',
      icon: '🧊',
      columns: ['Property', 'Solid 🧊', 'Liquid 💧', 'Gas 💨'],
      rows: [
        ['Shape', 'Fixed, definite shape', 'No fixed shape (takes container\'s shape)', 'No fixed shape (fills entire container)'],
        ['Volume', 'Fixed, definite volume', 'Fixed, definite volume', 'No fixed volume (expands to fill space)'],
        ['Compressibility', 'Cannot be compressed (particles tightly packed)', 'Very slightly compressible', 'Highly compressible (large empty spaces between particles)'],
        ['Molecular Spacing', 'Tightly packed in orderly rows', 'Loosely packed, can slide past each other', 'Very far apart, move freely and randomly'],
        ['Intermolecular Force', 'Very strong (holds rigid structure)', 'Moderate (allows flow)', 'Very weak / negligible'],
        ['Kinetic Energy', 'Low (vibrate in place)', 'Moderate (slide & tumble)', 'Very high (zoom in all directions)'],
        ['Examples', 'Ice, iron, wood, diamond', 'Water, milk, oil, juice', 'Steam, oxygen, nitrogen, CO₂'],
        ['Diffusion Speed', 'Extremely slow', 'Slow (ink in water)', 'Fast (perfume fills room quickly)']
      ],
      takeaway: 'Solid: Fixed shape + volume, tightly packed | Liquid: Fixed volume but flows, loosely packed | Gas: No fixed shape or volume, particles far apart'
    },
    {
      title: '🔄 Changes of State — The Phase Transition Matrix',
      icon: '🔥',
      columns: ['Phase Transition', 'State Change', 'Thermal Energy Action', 'Molecular Behaviour', 'Everyday Examples', 'Exam Keyword Clue'],
      rows: [
        ['Melting (Fusion)', 'Solid → Liquid', 'Heat ABSORBED (Warming)', 'Particles gain kinetic energy, vibrate faster, and break out of fixed positions', 'Ice turning into water at 0°C; butter melting on a warm pan', 'Loses fixed shape, retains fixed volume.'],
        ['Freezing (Solidification)', 'Liquid → Solid', 'Heat RELEASED (Cooling)', 'Particles slow down; intermolecular attraction locks them into fixed lattice', 'Water freezing into ice at 0°C; molten candle wax hardening', 'Becomes rigid with fixed shape and definite volume.'],
        ['Evaporation & Boiling', 'Liquid → Gas', 'Heat ABSORBED (Warming)', 'Particles gain high speed, overcome liquid attraction, and escape into air', 'Wet clothes drying in sun; water boiling into steam at 100°C', 'Boiling occurs at 100°C throughout liquid; evaporation occurs at surface at any temp.'],
        ['Condensation', 'Gas → Liquid', 'Heat RELEASED (Cooling)', 'Gas particles lose speed on cold surface, draw closer, and form liquid droplets', 'Water drops on teacup lid; dew on grass; mist on cold bathroom mirror', 'Water vapour turns back into liquid upon cooling.'],
        ['Sublimation', 'Solid → Gas directly (NO liquid phase!)', 'Heat ABSORBED', 'Surface molecules gain enough energy to jump directly into gas phase', 'Naphthalene mothballs in cupboard; Camphor (kapoor); Dry ice (solid CO₂)', 'Vanishes over time without leaving any liquid puddle behind!'],
        ['Deposition (Desublimation)', 'Gas → Solid directly (NO liquid phase!)', 'Heat RELEASED rapidly', 'Gas molecules cool extremely rapidly and bond directly into solid crystal lattice', 'Frost forming on freezing car windshield; industrial dry ice production from CO₂ gas', 'Direct vapour to solid crystal formation without liquid phase.']
      ],
      takeaway: 'Melting = Solid → Liquid | Boiling = Liquid → Gas | Condensation = Gas → Liquid | Sublimation = Solid → Gas directly (Naphthalene/Camphor)'
    },
    {
      title: '🧪 Physical Changes vs Chemical Changes — Spot the Difference',
      icon: '⚗️',
      columns: ['Comparison Criteria', 'Physical Change', 'Chemical Change', 'Diagnostic Rule'],
      rows: [
        ['New Substance Formation', 'NO new substance is formed; only shape, size, appearance, or state changes', 'One or more ENTIRELY NEW substances with different properties are formed', '"Is a new chemical created?"'],
        ['Reversibility', 'Usually REVERSIBLE (can return to original form easily)', 'Mostly IRREVERSIBLE (cannot be undone by simple physical methods)', '"Can you un-fry an omelette? No!"'],
        ['Molecular Identity', 'Chemical composition stays identical (e.g. H₂O in ice, water, steam)', 'Chemical composition changes; molecular bonds break and new bonds form', 'Chemical bonds permanently altered.'],
        ['Energy Change', 'Little or no heat/light energy is absorbed or released', 'Significant heat, light, sound, or gas bubbles are released or absorbed', 'Look for heat, flame, or fizzing.'],
        ['Mass Change of Original', 'Mass of original substance remains strictly unchanged', 'Original substance transforms into products with different properties', 'Total mass conserved in closed system.'],
        ['Everyday Examples', 'Melting ice, tearing paper, breaking glass, dissolving sugar in water, stretching rubber band', 'Frying an egg, burning wood/paper, rusting iron, curdling milk into paneer, baking a cake', 'Cooked, rusted, burned, or curdled ⟹ Chemical!']
      ],
      takeaway: 'Physical = Reversible, NO new substance (Melting, Tearing, Dissolving) | Chemical = Irreversible, NEW substance formed (Rusting, Burning, Curdling, Cooking)'
    },
    {
      title: '🥣 Solutions, Solutes & Solvents — Dissolving Science',
      icon: '🧂',
      columns: ['Scientific Term', 'Exact Definition', 'Classroom Concept / Formula', 'Everyday Examples', 'Factors That Speed It Up'],
      rows: [
        ['Solute', 'The substance that dissolves in a liquid', 'Solute + Solvent = Solution', 'Sugar crystals, table salt, coffee powder, instant drink mix', 'Crushing into fine powder increases surface area → dissolves faster.'],
        ['Solvent', 'The liquid in which the solute dissolves (usually larger quantity)', 'Water is the "Universal Solvent" because it dissolves more substances than any other liquid', 'Water, milk, alcohol', 'Heating the solvent increases molecular spacing → dissolves solute faster.'],
        ['Solution', 'A uniform, homogeneous mixture formed when solute completely dissolves in solvent', 'Solute particles spread evenly and become completely invisible', 'Saltwater, sweet lemonade, clear tea', 'Stirring vigorously spreads solute particles throughout solvent.'],
        ['Soluble vs Insoluble', 'Soluble dissolves completely; Insoluble does NOT dissolve and remains separate', 'Soluble: clear liquid; Insoluble: cloudy or settles at bottom', 'Soluble: Sugar, salt | Insoluble: Sand, chalk, sawdust, oil', 'Insoluble solids can be separated by filtration or sedimentation.'],
        ['Miscible vs Immiscible', 'Miscible liquids mix completely; Immiscible liquids do NOT mix and form separate layers', 'Miscible: single uniform layer; Immiscible: 2 layers (lighter liquid floats)', 'Miscible: Milk + water, lemon juice + water | Immiscible: Cooking oil + water, petrol + water', 'Density difference causes oil to float on water.']
      ],
      takeaway: 'Solute (Sugar) + Solvent (Water) = Solution (Sweet Water) | Water = Universal Solvent | Dissolves faster with: Heat 🔥, Stirring 🥄, Smaller grain size 🧂'
    }
  ]
};

function renderRevisionView(container) {
  const ch = getActiveChapter();
  const tables = REVISION_TABLES_DATA[ch.id] || [];

  if (tables.length === 0) {
    container.innerHTML = `
      <div class="view-header">
        <div class="view-header-title">
          <h3>📊 Quick Revision Tables</h3>
          <p>No comparison tables available for this chapter yet.</p>
        </div>
      </div>
    `;
    return;
  }

  let html = `
    <div class="revision-container">
      <div class="view-header">
        <div class="view-header-title">
          <h3>📊 ${ch.number}: Quick Revision Tables</h3>
          <p>Visual comparison tables for fast exam revision. Study patterns, spot differences, and memorize key facts at a glance!</p>
        </div>
      </div>

      ${tables.map((table, tIdx) => `
        <div class="revision-table-card" style="--card-accent: ${ch.themeColor}">
          <div class="revision-table-header">
            <span class="revision-table-icon">${table.icon}</span>
            <h4>${table.title}</h4>
          </div>

          <div class="revision-table-scroll">
            <table class="revision-table">
              <thead>
                <tr>
                  ${table.columns.map(col => `<th>${col}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${table.rows.map((row, rIdx) => `
                  <tr class="${rIdx % 2 === 0 ? 'even-row' : 'odd-row'}">
                    ${row.map((cell, cIdx) => `<td class="${cIdx === 0 ? 'row-label' : ''}">${cell}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="revision-takeaway-box">
            <span class="takeaway-icon">📌</span>
            <div>
              <strong>Key Takeaway:</strong>
              <span>${table.takeaway}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  container.innerHTML = html;
}

// ==========================================================================
// 12. RESULTS MODAL & PROGRESS EVALUATION
// ==========================================================================
function showResultsModal(correct, total) {
  const modal = document.getElementById('results-modal');
  if (!modal) return;

  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  let stars = 1;
  let emoji = '👍';
  let title = 'Good Science Effort!';
  let msg = 'Keep exploring the concept labs and revising the worksheets!';

  if (pct >= 85) {
    stars = 3;
    emoji = '🏆';
    title = 'Master Scientist!';
    msg = 'Outstanding deductive reasoning and full syllabus mastery!';
    ConfettiController.launch();
    AudioController.fanfare();
  } else if (pct >= 60) {
    stars = 2;
    emoji = '🌟';
    title = 'Great Progress!';
    msg = 'Solid scientific deduction! Review the diagnostic traps to reach 3 stars.';
    AudioController.fanfare();
  } else {
    AudioController.correct();
  }

  // Update stars in persistent storage
  setChapterStars(state.activeChapterId, stars);
  updateSidebarProgress();

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-stars').textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  document.getElementById('result-message').textContent = msg;
  document.getElementById('result-correct').textContent = correct;
  document.getElementById('result-total').textContent = total;
  document.getElementById('result-accuracy').textContent = `${pct}%`;

  modal.classList.add('active');

  const retryBtn = document.getElementById('btn-modal-retry');
  const reviewBtn = document.getElementById('btn-modal-review');
  const closeBtn = document.getElementById('btn-modal-close');

  const closeModal = () => {
    modal.classList.remove('active');
  };

  if (retryBtn) {
    retryBtn.onclick = () => {
      closeModal();
      state.currentQuestionIndex = 0;
      state.scoreCorrect = 0;
      state.scoreWrong = 0;
      state.answeredMap = {};
      saveActiveState();
      renderCurrentView();
    };
  }

  if (reviewBtn) {
    reviewBtn.onclick = () => {
      closeModal();
      switchMode('learn');
    };
  }

  if (closeBtn) {
    closeBtn.onclick = closeModal;
  }
}

function triggerFlash(type) {
  const el = document.getElementById('feedback-flash');
  if (!el) return;
  el.className = `feedback-flash flash-${type}`;
  setTimeout(() => {
    el.className = 'feedback-flash';
  }, 350);
}
