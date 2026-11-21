/* ==========================================================
   SCIENCE MASTER — L-7 Air and Water
   CBSE Class 5 Curriculum Data Store
   Zero External Dependencies | Pure Vanilla ES6
   ========================================================== */

const CHAPTER_L7_AIR_WATER = {
    id: 'ch7_air_water',
    number: 'L-7',
    targetStars: 7,
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
        thinkPrompt: 'Why do commercial jetliners love cruising in the lower stratosphere instead of flying down in the troposphere?',
        checkQuestions: [
                  {
                            "subtopic": "Stratosphere & Airplane Flight",
                            "question": "Why do commercial aeroplanes fly in the lower Stratosphere rather than the Troposphere below?",
                            "options": [
                                      "The stratosphere has zero gravity so planes glide without fuel.",
                                      "The stratosphere is above weather clouds, storms, and bumpy convective turbulence.",
                                      "The stratosphere contains pure liquid oxygen."
                            ],
                            "correct": 1,
                            "explanation": "All weather phenomena (clouds, thunderstorms, rain, strong updrafts) happen in the Troposphere. Flying in the lower Stratosphere provides calm, stable air and smooth, fuel-efficient flights!"
                  },
                  {
                            "subtopic": "Mesosphere & Meteor Shield",
                            "question": "In which layer of Earth's atmosphere do shooting stars (meteors) burn up before they can hit the ground?",
                            "options": [
                                      "The Mesosphere (the cold third layer of the atmosphere).",
                                      "Inside thunderstorm clouds in the Troposphere.",
                                      "Out beyond the Moon in outer space."
                            ],
                            "correct": 0,
                            "explanation": "The Mesosphere is Earth's protective meteor shield! Small rocks and space debris burn up due to friction with atmospheric gases in the mesosphere, creating 'shooting stars'."
                  }
        ]
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
        thinkPrompt: 'Why does soda shoot up into your mouth when you suck on a straw?',
        checkQuestions: [
                  {
                            "subtopic": "Atmospheric Pressure & Straws",
                            "question": "When you drink juice through a straw, what actually forces the juice up into your mouth?",
                            "options": [
                                      "Your mouth pulls the liquid like a magnetic tractor beam.",
                                      "Sucking removes air from inside the straw, and higher atmospheric pressure outside pushes the liquid up.",
                                      "The straw creates a miniature whirlpool that spins liquid upwards."
                            ],
                            "correct": 1,
                            "explanation": "When you suck, you create low pressure inside the straw. The standard atmospheric pressure pushing down on the surface of the juice in the glass pushes the juice up into the straw!"
                  },
                  {
                            "subtopic": "Oxygen & Combustion Support",
                            "question": "What happens when an inverted glass jar is placed over a burning candle on a table?",
                            "options": [
                                      "The flame burns forever because heat is trapped inside.",
                                      "The flame flickers and goes out as soon as the oxygen inside the jar is consumed.",
                                      "The glass jar melts and turns into carbon dioxide."
                            ],
                            "correct": 1,
                            "explanation": "Oxygen supports combustion! Once the burning candle consumes the limited oxygen sealed inside the jar, the flame is starved of oxygen and extinguishes."
                  }
        ]
      },
      {
        badge: 'Water Impurities',
        title: '🧪 Soluble vs Insoluble Impurities',
        metaphor: 'Water is the universal solvent, but how we separate what’s inside depends on whether it dissolved or is just floating!',
        points: [
          '<strong>Insoluble Impurities (Sand, Clay, Mud, Sawdust):</strong> Particles remain intact as solid suspensions. Purified by physical settling and straining.',
          '<strong>Soluble Impurities (Salt, Sugar, Chemicals):</strong> Molecules dissociate and spread throughout water. <em>Filter paper cannot catch them!</em> Purified by evaporation or distillation.'
        ],
        thinkPrompt: 'If you pour salty seawater through ten layers of filter paper, will the water come out sweet and fresh? Why not?',
        checkQuestions: [
                  {
                            "subtopic": "Soluble Impurities & Filtration Limit",
                            "question": "If you pour salty seawater through 10 layers of fine filter paper, will the water taste sweet? Why?",
                            "options": [
                                      "Yes, filter paper catches all minerals and salts.",
                                      "No, dissolved salt particles are individual molecules smaller than paper pores and pass right through.",
                                      "Yes, because filter paper chemically neutralizes salt into fresh water."
                            ],
                            "correct": 1,
                            "explanation": "Filtration only removes insoluble solids (like sand or mud). Dissolved salt molecules pass right through the microscopic pores of filter paper with the water molecules!"
                  },
                  {
                            "subtopic": "Sedimentation, Decantation & Alum",
                            "question": "In muddy river water, what is the process of letting heavy soil particles settle to the bottom of a container called?",
                            "options": [
                                      "Sedimentation (settling) followed by Decantation (pouring off clean water).",
                                      "Sublimation followed by Evaporation.",
                                      "Distillation followed by Freezing."
                            ],
                            "correct": 0,
                            "explanation": "Sedimentation allows heavy insoluble particles to settle at the bottom. Decantation is gently pouring out the clear water without disturbing the settled sediment. Alum accelerates this process!"
                  }
        ]
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
        thinkPrompt: 'Why shouldn’t a family install a distillation plant to prepare all their daily drinking water at home?',
        checkQuestions: [
                  {
                            "subtopic": "Distilled Water Properties",
                            "question": "Why is 100% pure distilled water NOT recommended for regular daily drinking by families?",
                            "options": [
                                      "Distilled water contains dangerous chemical acids from boiling.",
                                      "Distillation removes all beneficial natural minerals (like calcium and magnesium) needed by our bodies.",
                                      "Distilled water is too heavy for the human stomach to digest."
                            ],
                            "correct": 1,
                            "explanation": "While distilled water is chemically pure (ideal for car batteries and medicines), it lacks essential natural dissolved salts and minerals that human bodies require for electrolyte balance and bone health!"
                  },
                  {
                            "subtopic": "Boiling & Chlorination for Drinking",
                            "question": "Why is boiling water for 10\u201315 minutes the most effective household method to prevent water-borne epidemics like cholera?",
                            "options": [
                                      "Sustained high heat kills disease-causing bacteria, viruses, and parasites.",
                                      "Boiling turns all mud into oxygen gas.",
                                      "Boiling evaporates all poisonous heavy metals completely."
                            ],
                            "correct": 0,
                            "explanation": "Boiling is the simplest, most effective household sterilization method! High heat kills pathogenic bacteria, viruses, and amoebic cysts, making contaminated water safe to drink."
                  }
        ]
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
  };
