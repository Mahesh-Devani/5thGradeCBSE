/* ==========================================================
   SCIENCE MASTER — L-4 The Nervous System & Sense Organs
   CBSE Class 5 Curriculum Data Store
   Zero External Dependencies | Pure Vanilla ES6
   ========================================================== */

const CHAPTER_L4_NERVOUS = {
  "id": "ch4_nervous",
  "number": "L-4",
  "title": "The Nervous System & Sense Organs",
  "sub": "Brain Regions, Spinal Cord Reflex Arc, Nerve Pathways & 5 Senses",
  "themeColor": "#8b5cf6",
  "icon": "🧠",
  "targetStars": 10,
  "summary": "Master the central command network: Cerebrum, Cerebellum, Medulla, contralateral brain control, lightning-fast spinal reflex arcs, sensory vs motor nerves, and the 5 precision sense organs.",
  "learnCards": [
    {
      "badge": "Central Command",
      "title": "💻 The Biological Supercomputer & Nerve Cables",
      "metaphor": "Your nervous system is the ultimate biological supercomputer: Brain is the CPU, spinal cord is the main data highway, and nerves are the fiber-optic cables!",
      "diagrams": [
        {
          "image": "images/l4_brain_parts.png",
          "caption": "<strong>Central Command Network:</strong> Cerebrum (CPU & Logic), Cerebellum (Balance), Medulla (Brainstem Vitals) & Spinal Cord Highway"
        }
      ],
      "points": [
        "<strong>3 Master Components:</strong> The human nervous system consists of the <strong>Brain</strong> (central command unit), the <strong>Spinal Cord</strong> (main communication highway), and a vast interconnected network of <strong>Nerves</strong> branching to every organ and tissue.",
        "<strong>The Neuron (Nerve Cell):</strong> Nerves are composed of billions of specialized microscopic cells called <strong>neurons</strong>. Spanish neuroscientist <em>Santiago Ramón y Cajal</em> proved that neurons communicate by transmitting electrochemical signals.",
        "<strong>Spinal Cord Highway:</strong> A thick, tubular bundle of millions of nerve fibers emerging from the medulla that extends down through the protective canal of the <strong>vertebral column (33 vertebrae)</strong>. It carries messages between the brain and the entire body.",
        "<strong>Cerebrospinal Fluid (CSF):</strong> The brain and spinal cord float inside a protective liquid bath called <strong>cerebrospinal fluid (CSF)</strong> between neural tissue and the hard cranial bones, acting as a hydraulic shock absorber against sudden knocks and bumps!"
      ],
      "thinkPrompt": "Why does a desktop computer need separate power, signal cables, and a central microprocessor, exactly like our nervous system has nerves, sensory inputs, and the brain?",
      "checkQuestions": [
        {
          "subtopic": "3 Nervous System Pillars",
          "question": "What are the three core structural components of the human nervous system?",
          "options": [
            "Heart, Blood Vessels, and Lungs",
            "Brain, Spinal Cord, and Nerves",
            "Stomach, Liver, and Small Intestine"
          ],
          "correct": 1,
          "explanation": "The human nervous system consists of the Brain (command center), the Spinal Cord (main communication highway), and Nerves (branching cables carrying signals to every organ)!"
        },
        {
          "subtopic": "Cerebrospinal Fluid (CSF)",
          "question": "Why does the human brain float inside a layer of cerebrospinal fluid (CSF) inside the skull?",
          "options": [
            "To act as a hydraulic shock absorber, cushioning delicate brain tissue against sudden bumps and jerks!",
            "To keep the skull light enough for walking upright.",
            "To dissolve nutrients directly through the skull bones."
          ],
          "correct": 0,
          "explanation": "Cerebrospinal fluid (CSF) surrounds and floats the brain, acting as a shock-absorbing liquid cushion to protect brain tissue from crashing against the hard cranial walls during movement!"
        }
      ]
    },
    {
      "badge": "The 3 Brain Departments",
      "title": "🧠 Cerebrum, Cerebellum & Medulla",
      "metaphor": "The brain has three specialized managers running your body's operations 24 hours a day!",
      "diagrams": [
        {
          "image": "images/l4_brain_parts.png",
          "caption": "<strong>Human Brain Architecture:</strong> Folded Cerebrum (~85% weight), Lower Cerebellum (Balance & Equilibrium), and Medulla Oblongata (24/7 Life Vitals)"
        }
      ],
      "points": [
        "<strong>1. Cerebrum (Thinking, Memory & Senses):</strong> The top dome-shaped, largest part of the brain (~85% of total brain weight). Its surface is folded into ridges and grooves resembling a walnut. It controls <strong>thinking, memory, logic, speech, emotions, learning</strong>, and processes incoming signals from all 5 sense organs!",
        "<strong>2. Cerebellum (Balance & Muscle Coordination):</strong> Located at the lower back of the head beneath the cerebrum. Coordinates voluntary muscle movements to maintain <strong>balance, equilibrium, and upright posture</strong> during walking, cycling, jumping, and gymnastics.",
        "<strong>3. Medulla Oblongata (Brain Stem — 24/7 Life Vitals):</strong> Connects the brain to the spinal cord. Governs <strong>involuntary vital reflexes</strong>: heartbeat, breathing, blood pressure, digestion, sneezing, and swallowing. <strong>It works continuously 24 hours a day, even while you are fast asleep!</strong>",
        "<strong>Contralateral Control:</strong> The left hemisphere of the cerebrum controls the <strong>right side</strong> of the body; the right hemisphere controls the <strong>left side</strong>! A left-side stroke affects right-side motor function."
      ],
      "thinkPrompt": "When you are in deep sleep at 2 AM, which part of your brain is tirelessly keeping your heart beating and lungs breathing?",
      "checkQuestions": [
        {
          "subtopic": "Cerebrum vs Cerebellum",
          "question": "When Priya is solving a difficult maths riddle while standing balanced on one foot, which brain regions are at work?",
          "options": [
            "Cerebrum processes the mathematical logic, while Cerebellum coordinates muscle balance on one foot!",
            "Medulla solves the math riddle, while Cerebrum handles leg balance.",
            "The spinal cord handles both math calculation and body balance."
          ],
          "correct": 0,
          "explanation": "The Cerebrum is the thinking center (logic, reasoning, memory), while the Cerebellum coordinates voluntary muscles to maintain balance and posture!"
        },
        {
          "subtopic": "Medulla 24/7 Vitals",
          "question": "Which brain region tirelessly keeps your heart pumping and lungs breathing even when you are fast asleep at night?",
          "options": [
            "The Cerebrum, which dreams about breathing.",
            "The Medulla (Brain Stem), which governs all involuntary vital life functions 24/7!",
            "The Optic nerve in the eyes."
          ],
          "correct": 1,
          "explanation": "The Medulla (Brain Stem) operates 24/7 without stopping, automatically controlling heartbeat, respiration, blood pressure, and digestion without requiring conscious thought!"
        }
      ]
    },
    {
      "badge": "Emergency Bypass",
      "title": "⚡ The Lightning Reflex Arc (Spinal Bypass)",
      "metaphor": "When a house catches fire, you don't wait for a letter from the president — the local emergency fire alarm rings instantly!",
      "diagrams": [
        {
          "image": "images/l4_reflex_arc.png",
          "caption": "<strong>The Reflex Arc:</strong> Skin Receptor → Sensory Nerve → Spinal Cord Emergency Bypass → Motor Nerve → Biceps Effector (Hand Yanked in ~0.05s!)"
        }
      ],
      "points": [
        "<strong>What is a Reflex Action?</strong> An extremely rapid, automatic, involuntary response to a sudden dangerous stimulus that <strong>DOES NOT wait for the brain to think</strong>!",
        "<strong>Controlled by the Spinal Cord:</strong> The emergency decision is integrated directly by the <strong>Spinal Cord</strong> to save precious milliseconds and prevent severe tissue damage or deep burns.",
        "<strong>The 5-Step Reflex Pathway:</strong> Skin heat receptors → <strong>1. Sensory nerve</strong> → <strong>2. Spinal cord interneuron</strong> → <strong>3. Motor nerve</strong> → <strong>4. Effector muscle</strong> (biceps contracts) → <strong>5. Hand is yanked away in ~0.05 seconds!</strong>",
        "<strong>Brain Learns Afterwards:</strong> The nerve impulse travels up to the conscious cerebrum <em>after</em> the hand is already pulled back, which is why you consciously register the burning pain only AFTER your hand is safely away!"
      ],
      "thinkPrompt": "Why would waiting for the brain's cerebrum to process the thought 'Ouch, this stove is hot, I should lift my finger' lead to severe third-degree burns?",
      "checkQuestions": [
        {
          "subtopic": "Reflex Arc Emergency Bypass",
          "question": "Why does your hand jerk away from a hot pan BEFORE you consciously feel the burning pain?",
          "options": [
            "The emergency reflex circuit is routed directly through the Spinal Cord, which commands muscles to yank back without waiting for slow brain analysis!",
            "The hot pan magnetically repels your fingers.",
            "The arm bones jump backwards on their own."
          ],
          "correct": 0,
          "explanation": "Reflex actions bypass conscious brain deliberation to save critical milliseconds! The spinal cord immediately triggers the motor nerve to pull the hand away before third-degree burns occur."
        },
        {
          "subtopic": "5-Step Reflex Loop Sequence",
          "question": "What is the correct biological sequence in a reflex arc upon touching a thorn?",
          "options": [
            "Brain → Motor Nerve → Muscle → Sensory Nerve",
            "Skin Receptor → Sensory Nerve → Spinal Cord → Motor Nerve → Muscle",
            "Muscle → Spinal Cord → Bone → Brain"
          ],
          "correct": 1,
          "explanation": "The reflex loop sequence is: Receptor (detects pain) → Sensory Nerve (transmits input) → Spinal Cord (integrates emergency command) → Motor Nerve (transmits output) → Effector Muscle (contracts instantly)!"
        }
      ]
    },
    {
      "badge": "Information Couriers",
      "title": "📡 Sensory, Motor & Mixed Nerves",
      "metaphor": "Nerves are one-way and two-way telephone lines transmitting biological telegrams across the body!",
      "diagrams": [
        {
          "image": "images/l4_reflex_arc.png",
          "caption": "<strong>Neural Signal Flow:</strong> Inbound Sensory Nerves (Receptors → CNS) vs Outbound Motor Nerves (CNS → Muscles)"
        }
      ],
      "points": [
        "<strong>Sensory Nerves (Inbound Inputs):</strong> Carry messages <strong>FROM the sense organs TO the brain and spinal cord</strong> ('I see red light', 'This ice is freezing', 'The bell is ringing', 'The flower smells sweet').",
        "<strong>Motor Nerves (Outbound Outputs):</strong> Carry orders <strong>FROM the brain and spinal cord TO muscles and glands</strong> ('Contract leg muscles', 'Secrete sweat', 'Blink eyelids', 'Salivate').",
        "<strong>Mixed Nerves (Two-Way Highways):</strong> Contain both sensory and motor nerve fibers running side-by-side, transmitting signals in <strong>both directions</strong> between the central nervous system and body tissues.",
        "<strong>No Isolated Nerves:</strong> A nerve can NEVER run directly from wrist to ankle on its own! All peripheral nerves must route through the spinal cord or brain central network."
      ],
      "thinkPrompt": "If an accident cuts only the sensory nerves to a person's hand while motor nerves remain intact, could they pick up an apple? Could they feel if it is cold?",
      "checkQuestions": [
        {
          "subtopic": "Sensory vs Motor Nerves",
          "question": "If a patient can feel an ice cube placed on their foot but is completely unable to move their toes, what type of nerve is impaired?",
          "options": [
            "Sensory nerve, because feeling is normal.",
            "Motor nerve, because sensory signals reach the CNS, but movement orders cannot reach the foot muscles!",
            "The optic nerve in the eye."
          ],
          "correct": 1,
          "explanation": "Sensory nerves carry feelings from receptors to the CNS (which is working). Motor nerves carry motion orders from the CNS to muscles. An inability to move muscles indicates damage to the motor nerve pathway!"
        },
        {
          "subtopic": "Contralateral Brain Control",
          "question": "Why does a stroke injury in the LEFT hemisphere of the cerebrum cause weakness or paralysis on the RIGHT side of the body?",
          "options": [
            "Because nerve tracts cross over to the opposite side in the brainstem (Contralateral Control)!",
            "Because the right side of the body forgets how to move.",
            "Because blood only flows to the left side of the human body."
          ],
          "correct": 0,
          "explanation": "Due to contralateral control, neural pathways cross over in the brainstem! The left cerebrum controls muscles on the right half of the body, and the right cerebrum controls the left half."
        }
      ]
    },
    {
      "badge": "Sensory Detectors",
      "title": "👁️ The 5 Precision Sense Organs",
      "metaphor": "Your 5 sense organs are high-definition environmental sensors streaming real-time data to your brain!",
      "diagrams": [
        {
          "image": "images/l4_eye_structure.png",
          "caption": "<strong>The Eye (Biological Camera):</strong> Cornea, Iris (colored ring), Pupil aperture, Lens, Retina screen (inverted image), & Optic Nerve"
        },
        {
          "image": "images/l4_ear_structure.png",
          "caption": "<strong>The Ear (Hearing & Balance):</strong> Pinna, Eardrum, 3 Bones, Cochlea (hearing), Semicircular Canals (balance!), & Auditory Nerve"
        }
      ],
      "points": [
        "<strong>Eye (Biological Camera):</strong> Light enters through the transparent <strong>cornea</strong> → passes through the <strong>pupil</strong> (aperture adjusted by colored <strong>iris</strong>) → focused by the biological lens → inverted image forms on the light-sensitive <strong>retina</strong> screen → <strong>optic nerve</strong> transmits signals to cerebrum, which flips the image upright!",
        "<strong>Ear (Hearing & Body Balance!):</strong> Outer ear (<strong>pinna</strong>) collects sound waves → <strong>eardrum</strong> vibrates → 3 tiny middle ear bones (hammer, anvil, stirrup — smallest bones in the human body!) amplify vibrations → fluid-filled snail <strong>cochlea</strong> converts vibrations into nerve signals → <strong>auditory nerve</strong>.",
        "<strong>Balance Semicircular Canals:</strong> The 3 fluid-filled semicircular canals in the inner ear detect head tilt and rotational motion, working closely with the cerebellum to maintain dynamic balance and prevent falling!",
        "<strong>Nose (Olfactory Detector):</strong> Upper nasal cavity lined with sensitive olfactory nerve endings that detect airborne scent molecules. Mucus and nasal hairs filter out dust and germs.",
        "<strong>Tongue (Taste Sensor):</strong> Covered with taste buds detecting 5 primary tastes: sweet, salty, sour, bitter, and umami. (Smell and taste work together to create flavor).",
        "<strong>Skin (Largest Sense Organ):</strong> Houses millions of microscopic sensory receptors for <strong>touch, pressure, heat, cold, and pain</strong>, while sweat glands regulate body temperature."
      ],
      "thinkPrompt": "Why does chocolate or hot soup taste completely bland and flavorless when your nose is severely blocked with a common cold?",
      "checkQuestions": [
        {
          "subtopic": "Retina Image Screen",
          "question": "On which light-sensitive back screen of the eye is an inverted image focused before being transmitted to the brain?",
          "options": [
            "The Pupil",
            "The Iris",
            "The Retina"
          ],
          "correct": 2,
          "explanation": "The Retina acts like the digital sensor screen in a camera! The lens focuses an inverted image onto retina photoreceptors, and the optic nerve transmits the signal to the cerebrum."
        },
        {
          "subtopic": "Inner Ear Balance Semicircular Canals",
          "question": "Besides hearing sound waves, what other vital role is performed by fluid inside the inner ear semicircular canals?",
          "options": [
            "Maintaining dynamic body balance and equilibrium as your head tilts and moves!",
            "Filtering dust from entering the skull.",
            "Controlling the vocal cords during singing."
          ],
          "correct": 0,
          "explanation": "The inner ear has two vital responsibilities: the cochlea enables hearing, while the semicircular canals and fluid sensors detect orientation and movement to maintain dynamic balance and equilibrium!"
        }
      ]
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
};
