/* ==========================================================
   SCIENCE MASTER — L-13 States of Matter
   CBSE Class 5 Curriculum Data Store
   Zero External Dependencies | Pure Vanilla ES6
   ========================================================== */

const CHAPTER_L13_MATTER = {
    id: 'ch13_matter',
    number: 'L-13',
    targetStars: 8,
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
        thinkPrompt: 'If you pour 200 mL of water from a tall cylindrical glass into a wide flat plate, which property changes and which remains identical?',
        checkQuestions: [
                  {
                            "subtopic": "Liquid Volume vs Shape",
                            "question": "When you pour 250 mL of water from a tall thin bottle into a flat square baking dish, what happens?",
                            "options": [
                                      "Both the volume and the shape change completely.",
                                      "The volume stays exactly 250 mL, but the shape changes to match the flat square container.",
                                      "The water expands into 500 mL because the dish is wider."
                            ],
                            "correct": 1,
                            "explanation": "Liquids have a definite volume (250 mL remains 250 mL) but no fixed shape \u2014 their molecules slide past each other to take the shape of whatever vessel holds them!"
                  },
                  {
                            "subtopic": "Solid Rigidity vs Gas Diffusion",
                            "question": "Why does a wooden block maintain its rigid shape on a table, while perfume vapour spreads to fill the entire room?",
                            "options": [
                                      "In solids, strong attractive forces lock molecules in fixed positions; in gases, negligible attraction lets molecules fly freely everywhere.",
                                      "The wooden block has no molecules inside it.",
                                      "Gases are attracted to room walls by gravity magnets."
                            ],
                            "correct": 0,
                            "explanation": "In solids, intermolecular forces are very strong and molecules are locked in a rigid lattice. In gases, molecules are widely spaced with negligible attraction and move freely!"
                  }
        ]
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
        thinkPrompt: 'Why can you squish an air-filled syringe down with your thumb, but cannot push down a syringe filled with water or sand?',
        checkQuestions: [
                  {
                            "subtopic": "Intermolecular Space & CNG",
                            "question": "Why can huge amounts of natural gas be squeezed into a small vehicle fuel cylinder (CNG), while liquid water cannot be squished?",
                            "options": [
                                      "Gas molecules have massive empty spaces between them that can be pressed closer together.",
                                      "Natural gas turns into invisible ghost matter under pressure.",
                                      "Water molecules are much lighter than gas molecules."
                            ],
                            "correct": 0,
                            "explanation": "In gases, intermolecular spaces are huge! Applying pressure easily squeezes molecules closer together (high compressibility). In liquids and solids, molecules are already packed closely."
                  },
                  {
                            "subtopic": "The Syringe Incompressibility Proof",
                            "question": "In a classroom syringe experiment, why can you push the plunger down easily with air inside, but cannot push it down with water inside?",
                            "options": [
                                      "Liquid water molecules are already tightly packed with very little empty space, making liquids virtually incompressible.",
                                      "Water glues the rubber plunger permanently to the barrel.",
                                      "Air molecules dissolve into pure electricity under pressure."
                            ],
                            "correct": 0,
                            "explanation": "Gases have vast spaces between particles and compress easily. Liquids and solids have particles closely packed together, resisting further compression!"
                  }
        ]
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
        thinkPrompt: 'Why does incense stick smoke rise and scent the whole house only after you light it on fire?',
        checkQuestions: [
                  {
                            "subtopic": "Thermal Energy & Diffusion Rate",
                            "question": "Why does the aroma of sizzling hot food reach across the house in seconds, while cold food can only be smelled close up?",
                            "options": [
                                      "Heat gives molecules higher kinetic energy so they move much faster, increasing the rate of diffusion.",
                                      "Cold food does not contain any molecules at all.",
                                      "Heat makes air heavier, dragging the scent across the floor."
                            ],
                            "correct": 0,
                            "explanation": "Higher temperature increases the kinetic energy and thermal vibration of molecules! Gas particles move with greater speed, diffusing rapidly throughout the room."
                  },
                  {
                            "subtopic": "Thermal Expansion (Railway Track Gaps)",
                            "question": "Why do railway engineers leave small gaps between consecutive steel train rails?",
                            "options": [
                                      "Steel expands in hot summer heat; gaps prevent the tracks from expanding into each other and buckling!",
                                      "To let rainwater drain off the tracks easily.",
                                      "To make rhythmic clicking sounds so the driver stays awake."
                            ],
                            "correct": 0,
                            "explanation": "All matter expands when heated and contracts when cooled! On hot summer days, steel rails expand in length. The gaps provide space for this expansion, preventing dangerous buckling."
                  }
        ]
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
        thinkPrompt: 'When mothballs in your winter wardrobe shrink and disappear over months, did they melt and wet your clothes? Where did they go?',
        checkQuestions: [
                  {
                            "subtopic": "Sublimation (Naphthalene & Camphor)",
                            "question": "Naphthalene balls (mothballs) placed in a woolen wardrobe shrink and disappear over months without leaving any liquid spot. What is this called?",
                            "options": [
                                      "Evaporation of water.",
                                      "Sublimation (direct change from solid to gas without becoming liquid).",
                                      "Condensation into cold air."
                            ],
                            "correct": 1,
                            "explanation": "Sublimation is the special process where a solid converts directly into gas without passing through the liquid phase (e.g. camphor, dry ice, and naphthalene balls)!"
                  },
                  {
                            "subtopic": "Condensation on Cold Surfaces",
                            "question": "Why do tiny water droplets appear on the outer surface of a glass filled with ice water?",
                            "options": [
                                      "Water vapour in the warm surrounding air cools down on touching the cold glass and condenses into liquid droplets.",
                                      "Ice water leaks through microscopic pores in the glass.",
                                      "The cold glass produces water molecules from air electricity."
                            ],
                            "correct": 0,
                            "explanation": "Air contains invisible water vapour. When warm air strikes the icy cold surface of the glass, heat is transferred away, causing the water vapour to condense into visible liquid droplets!"
                  }
        ]
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
        thinkPrompt: 'If you paint an iron garden gate with oil paint, why does it stop the gate from rusting?',
        checkQuestions: [
                  {
                            "subtopic": "Reversibility & Chemical Changes",
                            "question": "Why is rusting of iron classified as a chemical change, while freezing water into ice cubes is a physical change?",
                            "options": [
                                      "Rusting forms a completely new substance (iron oxide) that cannot be easily reversed, whereas ice is still H2O molecules.",
                                      "Rusting happens in the dark, but ice only forms in the light.",
                                      "Ice change cannot be undone, but rust easily washes off with water."
                            ],
                            "correct": 0,
                            "explanation": "In a physical change (freezing ice), molecular identity remains H2O and melting reverses it. In rusting, iron atoms chemically react with oxygen and moisture to form a brand new compound (hydrated iron oxide), which cannot be reversed by simple physical cooling or heating!"
                  },
                  {
                            "subtopic": "Conditions for Rusting & Prevention",
                            "question": "Why does an iron gate in coastal Mumbai rust in weeks, while an identical iron gate in desert Jaisalmer remains rust-free for years?",
                            "options": [
                                      "Rusting requires BOTH oxygen and moisture (water vapour); coastal air is very humid, while desert air is extremely dry.",
                                      "Ocean salt attracts magnetic termites that eat iron.",
                                      "Desert sunlight destroys iron oxide completely."
                            ],
                            "correct": 0,
                            "explanation": "Rusting requires BOTH oxygen AND water/moisture! High humidity and salt in coastal air accelerate corrosion dramatically, whereas dry desert air lacks the moisture needed for rusting."
                  }
        ]
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
  };
