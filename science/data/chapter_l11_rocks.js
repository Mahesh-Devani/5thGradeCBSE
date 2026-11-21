/* ==========================================================
   SCIENCE MASTER — L-11 Rocks and Minerals
   CBSE Class 5 Curriculum Data Store
   Zero External Dependencies | Pure Vanilla ES6
   ========================================================== */

const CHAPTER_L11_ROCKS = {
    id: 'ch11_rocks',
    number: 'L-11',
    targetStars: 10,
    title: 'Rocks and Minerals',
    sub: 'Igneous, Sedimentary, Metamorphic, Rock Cycle, Ores & Fossil Fuels',
    themeColor: '#d97706',
    icon: '🪨',
    summary: 'Discover how magma, weathering, and heat create igneous, sedimentary, and metamorphic rocks. Explore the rock cycle, mineral ores, coal grades, petroleum, and resource conservation.',

    learnCards: [
      {
        badge: 'Igneous Genesis',
        title: '🌋 Fire-Born Rocks: Magma, Lava & Cooling Rates',
        metaphor: 'The Earth’s kitchen cooks with fiery magma! If it cools slowly underground, it grows sparkling mineral crystals; if it burps onto the surface as lava, it freezes quickly or traps frothy gas bubbles!',
        points: [
          '<strong>Formation:</strong> Igneous rocks are formed when molten rock (magma deep inside Earth or lava on the surface) cools and solidifies. They were the very first rocks formed on Earth (parent rocks).',
          '<strong>Granite (Intrusive):</strong> Forms when magma cools slowly <em>beneath</em> Earth\'s surface. Named from Latin <em>granum</em> (grain). Composed of three primary minerals: <strong>mica</strong> (shiny flakes), <strong>quartz</strong> (glassy hardness), and <strong>feldspar</strong>. White, pink, or grey. Extremely hard — used for building construction, flooring, and statues.',
          '<strong>Pumice (Extrusive & Frothy):</strong> Formed when lava with high gas bubbles under high temperature and pressure erupts from volcanoes and solidifies rapidly. The escaping gas bubbles create millions of tiny pores. Ground into powder called <strong>pumicite</strong>. <em>It is so light it floats on water!</em> Used as decorative stone, body/foot scrubbers, floor polish, and by dentists to polish teeth.',
          '<strong>Basalt (Ocean Basins & Moon):</strong> Dark-coloured, fine-grained rock formed when lava >1000°C pours out from cracks and cools quickly in weeks. <em>Most abundant rock in Earth\'s crust</em> (forms ocean basins). Rich in iron and magnesium (feldspar and pyroxene). Used in building construction and crushed for roads and pavements. Also forms dark flat plains on the Moon called <strong>lunar maria</strong>.'
        ],
        thinkPrompt: 'Why does pumice float like a sponge on water, while basalt from the same volcano sinks like an iron anchor?',
        checkQuestions: [
                  {
                            "subtopic": "Pumice (Frothy Lava & Density)",
                            "question": "Why does pumice float on water like a sponge, while basalt from the same volcano sinks?",
                            "options": [
                                      "Pumice is made of frozen ocean foam.",
                                      "Pumice cooled so rapidly that escaping frothy gas bubbles were trapped as air pockets, making it lighter than water.",
                                      "Basalt contains heavy iron magnets that pull it underwater."
                            ],
                            "correct": 1,
                            "explanation": "Frothy, gas-rich lava erupted and chilled in mid-air, freezing gas pockets inside pumice like sponge cake. This porous structure gives pumice a density lower than water!"
                  },
                  {
                            "subtopic": "Granite (Intrusive) vs Obsidian (Glass)",
                            "question": "Which igneous rock cools so quickly on the surface that no crystals can form, creating smooth, dark volcanic glass with razor edges?",
                            "options": [
                                      "Granite.",
                                      "Obsidian.",
                                      "Sandstone."
                            ],
                            "correct": 1,
                            "explanation": "Obsidian is volcanic glass! When lava cools almost instantaneously on the surface, mineral crystals have zero time to organize, producing smooth, glassy obsidian with sharp edges."
                  }
        ]
      },
      {
        badge: 'Sedimentary Layers',
        title: '🌊 The Layer-Cake Builders: Weathering & Compaction',
        metaphor: 'Think of a gigantic multi-decker sandwich pressed over millions of years! Wind and rivers grind mountain rocks into sand and mud, stacking them layer upon layer until gravity cements them into stone.',
        points: [
          '<strong>Sedimentation Process:</strong> Weathering by wind, water, rain, ice, and glaciers breaks rocks into small fragments. Flowing rivers carry them into lakes and oceans where they sink to the bottom in layers. Top layers squeeze bottom layers over millions of years, cementing them into hard sedimentary rock.',
          '<strong>Sandstone:</strong> Formed when sand grains get compressed and cemented together. The principal mineral is <strong>quartz</strong>. Yellow, brown, pink, or red. <em>The famous Red Fort in Delhi and Qutub Minar are built of red sandstone!</em>',
          '<strong>Shale:</strong> Formed from hardened layers of fine clay and mud. Smooth, split-prone rock used to manufacture building bricks and tiles.',
          '<strong>Limestone:</strong> Mainly composed of skeletal fragments and shells of marine organisms (corals, molluscs, clams). Rich in <strong>calcite and aragonite</strong> (calcium carbonate). <em>Chalk is a common soft limestone!</em> Used to make cement, bricks, and glass.',
          '<strong>Conglomerate:</strong> Rounded river pebbles and gravel cemented together with sand and mineral paste. Grey or orange. Used to polish ornaments and as decorative stone.'
        ],
        thinkPrompt: 'If you discover a rock containing fossilized sea shells and coral fragments high up on a dry hill, what does it prove about that hill’s ancient past?',
        checkQuestions: [
                  {
                            "subtopic": "Limestone & Marine Fossils",
                            "question": "If a geologist finds marine seashells and fish skeletons fossilized inside limestone on a dry desert hill, what does it prove?",
                            "options": [
                                      "Birds dropped fresh shells onto the desert hill yesterday.",
                                      "That dry land was once submerged under an ancient ocean where sediments and shells accumulated over millions of years.",
                                      "Volcanic lava baked desert sand into fake shell shapes."
                            ],
                            "correct": 1,
                            "explanation": "Sedimentary rocks preserve Earth's historical diary! Finding marine fossils on modern hilltops proves that plate tectonics uplifted what was once an ancient ocean floor."
                  },
                  {
                            "subtopic": "Sandstone (Red Fort) & Conglomerate",
                            "question": "The historic Red Fort in Delhi and Agra Fort were constructed from which sedimentary rock made of cemented quartz grains?",
                            "options": [
                                      "Sandstone.",
                                      "Pumice.",
                                      "Slate."
                            ],
                            "correct": 0,
                            "explanation": "Sandstone is formed when quartz sand grains are compacted and cemented together with mineral silica or iron oxide (giving it a warm red or golden colour)!"
                  }
        ]
      },
      {
        badge: 'Metamorphic Changes',
        title: '⚡ Metamorphic Magic: Extreme Heat & Crushing Pressure',
        metaphor: 'Metamorphosis means "complete change"! Just as a caterpillar transforms into a butterfly, intense underground heat and tectonic weight transform ordinary rocks into dazzling crystalline gems.',
        points: [
          '<strong>Formation:</strong> Deep inside Earth\'s crust, existing igneous or sedimentary rocks are subjected to intense baking heat and crushing pressure, changing their mineral composition and texture without melting them into liquid.',
          '<strong>Limestone → Marble:</strong> Soft, dull limestone recrystallizes into hard, glistening marble. Can be polished to a mirror-like shine. <em>The world-famous Taj Mahal in Agra is carved from white Makrana marble!</em>',
          '<strong>Sandstone → Quartzite:</strong> Gritty sandstone fuses into interlocking quartz crystals. <em>Quartzite is so extraordinarily hard that it can scratch a steel knife!</em> Used for statues, watches (quartz crystals), glassmaking, and gemstones.',
          '<strong>Shale → Slate:</strong> Soft clay shale transforms into dense, flat-splitting slate. Usually black or grey, but also purple and green. Used to make blackboards, writing slates, and rainproof roofing tiles.',
          '<strong>Granite → Gneiss (pronounced "nice"):</strong> Coarse granite undergoes directional shear. Its mica flakes align into glistening ribbon-like dark and light bands of different colours.'
        ],
        thinkPrompt: 'Why can you split a slab of slate into razor-thin flat sheets for roofing tiles, but granite only fractures into rough, irregular chunks?',
        checkQuestions: [
                  {
                            "subtopic": "Limestone \u2192 Marble (Taj Mahal)",
                            "question": "Why does limestone transform into dazzling marble when buried deep inside the crust?",
                            "options": [
                                      "Intense geothermal heat and crushing pressure cause calcite crystals to recrystallize and lock together tightly.",
                                      "Underground rivers bleach the limestone white with chlorine.",
                                      "Underground earthquakes break limestone into liquid marble."
                            ],
                            "correct": 0,
                            "explanation": "Metamorphism doesn't melt the rock entirely; instead, extreme heat and pressure recrystallize the minerals into a denser, interlocking crystalline texture (limestone becomes marble)!"
                  },
                  {
                            "subtopic": "Shale \u2192 Slate & Sandstone \u2192 Quartzite",
                            "question": "Which metamorphic rock transforms from soft clay shale into thin, flat-splitting sheets used for school blackboards and roof tiles?",
                            "options": [
                                      "Slate.",
                                      "Pumice.",
                                      "Sandstone."
                            ],
                            "correct": 0,
                            "explanation": "Slate is a fine-grained metamorphic rock formed from shale! Because of directional pressure, its minerals align into thin, flat, smooth sheets perfect for roofing and blackboards."
                  }
        ]
      },
      {
        badge: 'Rock Cycle Dynamics',
        title: '🔄 Earth\'s Eternal Recycling Loop: The Rock Cycle',
        metaphor: 'Earth never throws away a single pebble! No rock stays the same forever — every stone is on an endless multi-million-year voyage through fire, water, pressure, and crustal uplift.',
        points: [
          '<strong>Metamorphic to Igneous:</strong> Deep tectonic subduction pushes metamorphic rocks into the hot mantle where they melt into magma → cools and solidifies into new igneous rock.',
          '<strong>Igneous to Sedimentary:</strong> Surface igneous rocks undergo weathering by rain, wind, and ice → washed into oceans as sediments → compacted into sedimentary rocks.',
          '<strong>Sedimentary to Metamorphic:</strong> Sedimentary layers sink deeper under accumulating sediment weight, encountering fierce magma heat and tectonic pressure → deform into metamorphic rocks.',
          '<strong>Dynamic Shortcuts:</strong> Sedimentary rocks can melt directly into magma during deep tectonic earthquakes; metamorphic rocks can be uplifted by mountain-building, weathered by rivers, and deposited directly as new sedimentary layers!'
        ],
        thinkPrompt: 'Could a quartz grain in your beach sand today have been part of an ancient granite mountain 200 million years ago and quartzite 100 million years ago?',
        checkQuestions: [
                  {
                            "subtopic": "Subduction & Melting into Magma",
                            "question": "Can a grain of sand on a beach today eventually turn into part of a granite mountain millions of years from now?",
                            "options": [
                                      "No, sand grains can only ever remain sand forever.",
                                      "Yes, if subducted deep underground, melted into magma, and slowly cooled below the surface as granite.",
                                      "Yes, by leaving it in the hot summer sun for two weeks."
                            ],
                            "correct": 1,
                            "explanation": "The rock cycle is continuous! Weathered sediments get buried, compressed into sandstone, subducted into the mantle to melt into magma, and re-crystallize as plutonic granite over geologic eras."
                  },
                  {
                            "subtopic": "Weathering & Uplift in the Rock Cycle",
                            "question": "How can hard igneous granite on a high mountain summit eventually turn into ocean sedimentary rock?",
                            "options": [
                                      "Wind, rain, and ice weather and break down the granite into tiny sand grains, which rivers wash down and deposit in ocean layers.",
                                      "Birds carry the entire mountain down to the beach in their claws.",
                                      "Sunlight dissolves granite rock into rainwater."
                            ],
                            "correct": 0,
                            "explanation": "Weathering by frost, rain, and wind breaks mountain rocks into loose fragments. Flowing rivers carry them downstream to oceans, where they settle as sediments!"
                  }
        ]
      },
      {
        badge: 'Minerals & Energy',
        title: '⛏️ Mineral Wealth, Fossil Fuels & Conservation',
        metaphor: 'Minerals are the crystalline Lego bricks of our planet. When packed with valuable metals, we call them ores. When packed with ancient prehistoric solar energy, we call them fossil fuels!',
        points: [
          '<strong>Minerals:</strong> Naturally occurring crystalline chemical substances. They are the basic building blocks of rocks; rocks are made of different minerals and varying percentages of each mineral.',
          '<strong>Metallic Minerals (Ores):</strong> Natural rocks from which valuable metals are economically extracted: <strong>Sphalerite</strong> → Zinc, <strong>Haematite</strong> → Iron, <strong>Bauxite</strong> → Aluminium, <strong>Cuprite</strong> → Copper, <strong>Galena</strong> → Lead. Precious metals: Gold and Silver for jewellery.',
          '<strong>Coal (Sedimentary Rock!):</strong> Formed from prehistoric swamp forests buried millions of years ago under intense mud pressure. Four types: (1) <strong>Peat:</strong> earliest form, high moisture, low heat; (2) <strong>Lignite:</strong> brown coal, largest portion of world\'s reserves (Neyveli); (3) <strong>Bituminous:</strong> soft coal, burns with smoke, widely used in power and steel plants (Dhanbad, Raniganj); (4) <strong>Anthracite:</strong> hard coal, <em>best coal</em> with maximum heat and very little smoke.',
          '<strong>Petroleum ("Black Gold"):</strong> Crude oil formed from buried marine plankton and organisms under ocean sediments over millions of years. Refined into petrol, diesel, LPG, CNG, kerosene, and <strong>paraffin wax</strong> (candles and polish). Major Indian fields: <strong>Bombay High</strong> (off Mumbai coast) and <strong>Digboi</strong> (Assam).',
          '<strong>Conservation:</strong> Minerals and fossil fuels are non-renewable and take millions of years to regenerate. Conserve by keeping vehicle engines tuned, using clean alternative energy (solar, wind, hydroelectric), preventing mining wastage, and switching off lights.'
        ],
        thinkPrompt: 'Why do geologists classify coal as a sedimentary rock, even though it formed from dead trees rather than sand or silt?',
        checkQuestions: [
                  {
                            "subtopic": "Coal Genesis (Sedimentary Fossil Fuel)",
                            "question": "Why do geologists classify coal as a sedimentary rock, rather than an igneous or metamorphic rock?",
                            "options": [
                                      "Coal is formed from volcanic ash ejected by active craters.",
                                      "Coal formed from ancient swamp plants and ferns compacted in sequential layers under heavy sediments over millions of years.",
                                      "Coal is a pure mineral crystal that grew in underground caves."
                            ],
                            "correct": 1,
                            "explanation": "Coal is an organic sedimentary rock! Ancient swamp forests died and were buried under layers of mud and sand, where pressure and heat slowly compressed the carbon layers into solid coal seams."
                  },
                  {
                            "subtopic": "Metallic Ores & Petroleum Conservation",
                            "question": "A rock from which valuable metals (like Aluminium from Bauxite or Iron from Haematite) can be profitably extracted is called an:",
                            "options": [
                                      "Ore.",
                                      "Igneous bubble.",
                                      "Alluvial soil layer."
                            ],
                            "correct": 0,
                            "explanation": "Ores are naturally occurring rocks rich in metallic minerals from which metals like iron, aluminium, copper, and gold are economically mined and refined!"
                  }
        ]
      }
    ],

    examTraps: [
      {
        id: 'trap_l11_minerals',
        student: 'Rohan',
        question: 'What is the relationship between rocks and minerals?',
        studentAnswer: 'Rocks and minerals are exact synonyms. Minerals are made of crushed rocks.',
        prompt: 'Diagnose Rohan’s conceptual error:',
        options: [
          'Minerals are naturally occurring pure crystalline chemical substances (the basic building blocks); rocks are solid mixtures composed of one or more minerals in varying proportions.',
          'Rocks are living biological animals, whereas minerals are synthetic plastics made in chemical factories.',
          'Minerals contain only rainwater, while rocks contain only gold and silver.'
        ],
        correctIndex: 0,
        teacherFeedback: 'Spot-on diagnosis! Think of a chocolate chip cookie: the cookie is the rock, and the chocolate chips, flour, and sugar are the individual minerals that build it.'
      },
      {
        id: 'trap_l11_pumice',
        student: 'Priya',
        question: 'Why does a piece of pumice float on water while a piece of basalt sinks immediately?',
        studentAnswer: 'Because pumice is completely hollow inside like an empty plastic ball, while basalt is filled with solid lead.',
        prompt: 'What volcanic formation fact did Priya miss?',
        options: [
          'Pumice formed from frothy volcanic lava ejected with high gas pressure; rapid cooling trapped gas bubbles into millions of porous holes, lowering its overall density below water.',
          'Pumice floats because it is magnetized and repelled by water molecules.',
          'Pumice is made of dried wood ashes from ancient forest fires.'
        ],
        correctIndex: 0,
        teacherFeedback: 'Outstanding teacher reasoning! Pumice is a sponge-like volcanic rock riddled with trapped air pockets. Basalt cools into dense, compact rock rich in heavy iron and magnesium, so it sinks!'
      },
      {
        id: 'trap_l11_monuments',
        student: 'Arjun',
        question: 'Identify the rocks used to construct the Red Fort in Delhi and the Taj Mahal in Agra.',
        studentAnswer: 'The Red Fort is built of Red Granite (igneous), and the Taj Mahal is built of White Quartzite (metamorphic).',
        prompt: 'Correct Arjun’s architectural rock identification:',
        options: [
          'Red Fort is made of Red Sandstone (a sedimentary rock of quartz sand); Taj Mahal is made of White Marble (a metamorphic rock transformed from limestone).',
          'Red Fort is made of baked clay shale; Taj Mahal is made of polished basalt.',
          'Both monuments are constructed from crushed pumice mixed with river clay.'
        ],
        correctIndex: 0,
        teacherFeedback: 'Brilliant historical geology catch! Delhi’s Red Fort is built from sedimentary Red Sandstone, while Agra’s Taj Mahal is carved from metamorphic Makrana White Marble.'
      },
      {
        id: 'trap_l11_coal',
        student: 'Sneha',
        question: 'Between Peat, Lignite, Bituminous, and Anthracite, which is the highest quality coal and why?',
        studentAnswer: 'Peat is the best coal because it is soft and easy to dig, while Anthracite is the worst because it is too hard and produces only smoke.',
        prompt: 'Diagnose Sneha’s grading blunder:',
        options: [
          'Anthracite is the highest grade ("best coal") because it has the highest carbon concentration, burning with maximum heat and almost zero smoke; Peat is the earliest, lowest-grade stage with low heat and heavy smoke.',
          'Lignite is the only usable coal; neither Peat nor Anthracite can catch fire.',
          'Bituminous coal produces no heat at all and is only used to make blackboard chalk.'
        ],
        correctIndex: 0,
        teacherFeedback: 'Masterful correction! Coal quality is determined by carbon content and heat output (calorific value), NOT ease of digging. Anthracite is the undisputed king of coals!'
      }
    ],

    questions: [
      // --- SECTION 1: MCQs & DEDUCTIONS ---
      {
        id: 'l11_q1',
        category: 'mcq',
        source: 'Worksheet I • Section A • Q1',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Which of the following was the FIRST type of rock to be formed on Earth, formed when molten magma or lava cooled and hardened?',
        options: [
          'Igneous rocks (Parent rocks)',
          'Sedimentary rocks',
          'Metamorphic rocks',
          'Fossil fuels'
        ],
        correct: 0,
        explanation: 'Igneous rocks were the first rocks formed on Earth when molten magma or lava cooled and solidified. Because all other rocks ultimately originate from them, they are also known as primary or parent rocks.',
        takeaway: 'First rocks on Earth = Igneous rocks (formed from cooling magma/lava).'
      },
      {
        id: 'l11_q2',
        category: 'mcq',
        source: 'Worksheet I • Section A • Q2',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Granite is a hard, coarse-grained igneous rock formed slowly beneath Earth’s surface. What are the THREE primary minerals that compose granite?',
        options: [
          'Mica, quartz, and feldspar',
          'Calcite, aragonite, and clay',
          'Iron, magnesium, and pyroxene',
          'Coal, petroleum, and bauxite'
        ],
        correct: 0,
        explanation: 'Granite (from the Latin word "granum", meaning grain) forms when magma cools slowly beneath Earth\'s crust. It consists of three key minerals: shiny flakes of mica, hard glassy quartz, and pink, white, or grey feldspar.',
        takeaway: 'Granite = Mica + Quartz + Feldspar (magma cooled beneath Earth\'s surface).'
      },
      {
        id: 'l11_q3',
        category: 'mcq',
        source: 'Worksheet I • Section A • Q3',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Basalt is the most abundant rock in the Earth’s crust and forms most ocean basins. Which minerals give basalt its characteristic dark colour and high density?',
        options: [
          'Iron and magnesium (in feldspar and pyroxene)',
          'Calcite and aragonite',
          'Pure silica and mica',
          'Aluminium and lead'
        ],
        correct: 0,
        explanation: 'Basalt is a dark, fine-grained igneous rock formed from quick-cooling lava (>1000°C). Its dark colour and heavy density are due to high contents of iron and magnesium present in the minerals feldspar and pyroxene.',
        takeaway: 'Basalt = Dark, fine-grained, rich in Iron & Magnesium, forms ocean floors & lunar maria.'
      },
      {
        id: 'l11_q4',
        category: 'mcq',
        source: 'Worksheet I • Section A • Q4',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'The Red Fort in Delhi is a world-renowned historical monument. Which type of rock was quarried and used to construct its imposing red walls?',
        options: [
          'Red Sandstone (a sedimentary rock)',
          'Red Granite (an igneous rock)',
          'Red Slate (a metamorphic rock)',
          'Conglomerate (a decorative rock)'
        ],
        correct: 0,
        explanation: 'The Red Fort in Delhi was built from red sandstone, a sedimentary rock formed when small grains of quartz sand were compressed and cemented together over millions of years.',
        takeaway: 'Delhi Red Fort = Red Sandstone (Sedimentary rock formed from quartz sand).'
      },
      {
        id: 'l11_q5',
        category: 'mcq',
        source: 'Worksheet II • Section A • Q5',
        wsNumber: 2,
        marks: '1 Mark',
        body: 'Limestone is composed mainly of skeletal fragments of marine organisms (corals and molluscs). What common classroom item is a soft, white type of limestone?',
        options: [
          'Chalk',
          'Graphite',
          'Charcoal',
          'Wax crayon'
        ],
        correct: 0,
        explanation: 'Chalk is a very common, soft, porous form of sedimentary limestone composed of microscopic calcite shells of marine plankton. Limestone is also used to make cement, bricks, and glass.',
        takeaway: 'Chalk = Soft limestone rock formed from marine organism skeletal fragments.'
      },
      {
        id: 'l11_q6',
        category: 'mcq',
        source: 'Worksheet II • Section A • Q6',
        wsNumber: 2,
        marks: '1 Mark',
        body: 'When sedimentary sandstone is subjected to intense subterranean heat and pressure, into which exceptionally hard metamorphic rock does it transform?',
        options: [
          'Quartzite (which can scratch steel!)',
          'Marble',
          'Slate',
          'Gneiss'
        ],
        correct: 0,
        explanation: 'Under intense heat and pressure, sandstone metamorphoses into quartzite. Quartzite is so hard that it can leave a clear scratch mark on steel! Used for statues, watches, and gemstones.',
        takeaway: 'Sandstone → Quartzite (Metamorphic rock that scratches steel).'
      },
      {
        id: 'l11_q7',
        category: 'mcq',
        source: 'Worksheet II • Section A • Q7',
        wsNumber: 2,
        marks: '1 Mark',
        body: 'Which form of coal is universally recognized as the "best coal" because it contains the highest carbon percentage, burning with maximum heat and almost zero smoke?',
        options: [
          'Anthracite (Hard coal)',
          'Bituminous (Soft coal)',
          'Lignite (Brown coal)',
          'Peat (Earliest form)'
        ],
        correct: 0,
        explanation: 'Anthracite (hard coal) has the highest carbon concentration (>90%). When burned, it releases great amounts of heat with very little smoke, making it the finest grade of coal.',
        takeaway: 'Best Coal = Anthracite (>90% carbon, highest heat, minimal smoke).'
      },
      {
        id: 'l11_q8',
        category: 'mcq',
        source: 'Worksheet III • Section A • Q8',
        wsNumber: 3,
        marks: '1 Mark',
        body: 'Petroleum is called "Black Gold" because of its immense value. Which useful byproduct obtained during petroleum refining is used to make candles and polishes?',
        options: [
          'Paraffin wax',
          'Kerosene',
          'Compressed Natural Gas (CNG)',
          'Bitumen'
        ],
        correct: 0,
        explanation: 'Paraffin wax is obtained from petroleum refining. It is widely used to make candles, shoe and floor polishes, wax paper, and cosmetic ointments.',
        takeaway: 'Paraffin wax is refined from petroleum and used for candles and polish.'
      },

      // --- SECTION 2: WHO AM I? RIDDLES ---
      {
        id: 'l11_q9',
        category: 'whoami',
        source: 'Textbook Page 136 • Track Your Progress 1a',
        wsNumber: 1,
        marks: '1.5 Marks',
        body: 'Who am I? <em>"I am a light-coloured volcanic rock formed when gas bubbles in frothy lava solidifying rapidly get trapped inside me. I have millions of pores, dentists use my powder to polish teeth, and I can float on water!"</em>',
        options: [
          'Pumice',
          'Basalt',
          'Obsidian',
          'Granite'
        ],
        correct: 0,
        explanation: 'Pumice is an extrusive igneous rock formed from frothy, gas-rich lava. Its sponge-like porous network traps air, making it less dense than water so it floats! Dentists use powdered pumicite to polish teeth.',
        takeaway: 'Pumice = Porous volcanic rock that floats on water; used as scrubber and dental polish.'
      },
      {
        id: 'l11_q10',
        category: 'whoami',
        source: 'Textbook Page 136 • Track Your Progress 1b',
        wsNumber: 1,
        marks: '1.5 Marks',
        body: 'Who am I? <em>"I am a dark-coloured, heavy, fine-grained rock and the most abundant rock in Earth’s crust. Oceans lie in basins made of me, and astronauts discovered me on the Moon forming dark plains called lunar maria!"</em>',
        options: [
          'Basalt',
          'Pumice',
          'Shale',
          'Quartzite'
        ],
        correct: 0,
        explanation: 'Basalt forms when lava >1000°C cools quickly on Earth\'s surface. It makes up the bedrock of ocean basins and forms the dark, flat basaltic plains on the Moon known as lunar maria.',
        takeaway: 'Basalt = Dark, dense crust rock; ocean basins & Moon\'s lunar maria.'
      },
      {
        id: 'l11_q11',
        category: 'whoami',
        source: 'Textbook Page 136 • Track Your Progress 1c',
        wsNumber: 1,
        marks: '1.5 Marks',
        body: 'Who am I? <em>"I am a strong metamorphic rock formed from limestone under immense heat and pressure. I can be polished to a mirror shine, and Emperor Shah Jahan chose my pure white variety to build the Taj Mahal in Agra!"</em>',
        options: [
          'Marble',
          'Sandstone',
          'Slate',
          'Gneiss'
        ],
        correct: 0,
        explanation: 'Marble is formed when sedimentary limestone is subjected to underground heat and pressure. White marble from Makrana (Rajasthan) was used to construct the Taj Mahal.',
        takeaway: 'Marble = Metamorphic rock formed from limestone; Taj Mahal & flooring.'
      },
      {
        id: 'l11_q12',
        category: 'whoami',
        source: 'Textbook Page 136 • Track Your Progress 1d',
        wsNumber: 1,
        marks: '1.5 Marks',
        body: 'Who am I? <em>"I am a metamorphic rock formed from granite. I contain glittering flakes of mica that make me sparkle, and I feature alternating light and dark bands of colours (ribbon stripes)!"</em>',
        options: [
          'Gneiss (pronounced "nice")',
          'Shale',
          'Conglomerate',
          'Basalt'
        ],
        correct: 0,
        explanation: 'Gneiss is a foliated metamorphic rock formed when granite is heated and squeezed deep within Earth. Its minerals segregate into glistening mica ribbons and alternating dark and light bands.',
        takeaway: 'Gneiss = Metamorphic rock from granite; shiny mica flakes and ribbon-like stripes.'
      },

      // --- SECTION 3: COMPARE & CONTRAST ---
      {
        id: 'l11_q13',
        category: 'compare',
        source: 'Textbook Page 140 • Section E • Q2',
        wsNumber: 2,
        marks: '2 Marks',
        body: 'Compare and contrast <strong>Shale</strong> and <strong>Slate</strong>. Which statement accurately identifies their rock families and transformation relationship?',
        options: [
          'Shale is a sedimentary rock formed from hardened clay; Slate is a fine-grained metamorphic rock formed when shale is subjected to underground heat and pressure.',
          'Shale is an igneous rock formed from lava; Slate is a sedimentary rock formed from sand.',
          'Shale is formed on the Moon; Slate is formed inside ocean coral reefs.',
          'Both Shale and Slate are identical igneous rocks with different colours.'
        ],
        correct: 0,
        explanation: 'Shale is sedimentary (hardened clay/mud layers used for bricks). When subjected to metamorphic heat and pressure, its clay minerals recrystallize into slate, a metamorphic rock that splits into smooth, flat sheets (ideal for blackboards and roof shingles).',
        takeaway: 'Shale (Sedimentary clay) → Slate (Metamorphic sheets for blackboards/roofs).'
      },
      {
        id: 'l11_q14',
        category: 'compare',
        source: 'Textbook Page 140 • Section E • Q7 & Section G • Q3',
        wsNumber: 2,
        marks: '2 Marks',
        body: 'Compare <strong>Peat</strong>, <strong>Lignite</strong>, and <strong>Bituminous coal</strong>. Why is Bituminous coal far more commonly used in thermal power plants and steel mills than Lignite or Peat?',
        options: [
          'Bituminous coal has much higher carbon content and produces significantly more heat than Peat (which gives off very little heat) or Lignite (brown coal with high moisture).',
          'Peat explodes if heated, while Bituminous coal is as cold as ice.',
          'Lignite is only found in space, whereas Bituminous coal is dug from river beds.',
          'Bituminous coal is a renewable plant that grows back every rainy season.'
        ],
        correct: 0,
        explanation: 'Peat is the earliest, least compact stage with high water content and low heat output. Lignite (brown coal) is soft with high moisture. Bituminous coal ("soft coal") has high carbon concentration, burns hotter, and is readily available for power generation and steel smelting.',
        takeaway: 'Coal rank: Peat (lowest heat) < Lignite (brown) < Bituminous (industrial fuel) < Anthracite (best heat).'
      },
      {
        id: 'l11_q15',
        category: 'compare',
        source: 'Textbook Page 140 • Section F • Q1',
        wsNumber: 2,
        marks: '2 Marks',
        body: 'How do <strong>Igneous rocks</strong> and <strong>Metamorphic rocks</strong> fundamentally differ in their process of formation?',
        options: [
          'Igneous rocks form from the cooling and solidification of molten magma or lava; Metamorphic rocks form when existing rocks are chemically and physically transformed by intense subterranean heat and pressure without melting.',
          'Igneous rocks form only inside ocean shells, while metamorphic rocks form from river sand.',
          'Igneous rocks are always soft and soluble in water, while metamorphic rocks are made of gas.',
          'Igneous rocks are made in factories, while metamorphic rocks fall from outer space.'
        ],
        correct: 0,
        explanation: 'Igneous rocks crystallize from a liquid melt (magma or lava). Metamorphic rocks transform in the solid state when existing rocks are baked by geothermal heat and squeezed by tectonic pressure deep underground without melting into magma.',
        takeaway: 'Igneous = Solidification of liquid molten rock | Metamorphic = Solid-state transformation by heat & pressure.'
      },
      {
        id: 'l11_q16',
        category: 'compare',
        source: 'Textbook Page 140 • Section D • Mineral-Metal Match',
        wsNumber: 2,
        marks: '2 Marks',
        body: 'Compare the metallic mineral ores <strong>Bauxite</strong>, <strong>Haematite</strong>, and <strong>Cuprite</strong>. Which option correctly matches each ore with its extracted metal?',
        options: [
          'Bauxite → Aluminium | Haematite → Iron | Cuprite → Copper',
          'Bauxite → Gold | Haematite → Lead | Cuprite → Zinc',
          'Bauxite → Iron | Haematite → Aluminium | Cuprite → Silver',
          'Bauxite → Copper | Haematite → Zinc | Cuprite → Iron'
        ],
        correct: 0,
        explanation: 'Bauxite is the ore of Aluminium (lightweight metal for airplanes and foils). Haematite is the principal ore of Iron (used for steel and construction). Cuprite is an ore of Copper (used in electrical wiring and cookware). Sphalerite yields Zinc and Galena yields Lead.',
        takeaway: 'Ores: Bauxite → Aluminium | Haematite → Iron | Cuprite → Copper | Galena → Lead | Sphalerite → Zinc.'
      },

      // --- SECTION 4: ODD ONE OUT WITH JUSTIFICATION ---
      {
        id: 'l11_q17',
        category: 'oddone',
        source: 'Textbook Page 139 • Section B • Q1 & Page 140',
        wsNumber: 3,
        marks: '2 Marks',
        body: 'Find the <strong>ODD ONE OUT</strong> among these rocks and identify the scientific justification:<br><strong>Granite, Pumice, Sandstone, Basalt</strong>',
        options: [
          'Sandstone — because it is a SEDIMENTARY rock formed from sand layers, whereas Granite, Pumice, and Basalt are all IGNEOUS rocks formed from cooled magma/lava.',
          'Granite — because it is the only rock found on the Moon.',
          'Pumice — because it is made of melted gold.',
          'Basalt — because it cannot be touched by human hands.'
        ],
        correct: 0,
        explanation: 'Granite, Pumice, and Basalt are all igneous rocks formed from cooling magma or lava. Sandstone is a sedimentary rock formed from compressed grains of quartz sand cemented together over time.',
        takeaway: 'Odd One: Sandstone (Sedimentary rock; others are all Igneous rocks).'
      },
      {
        id: 'l11_q18',
        category: 'oddone',
        source: 'Textbook Page 133-134 • Metamorphic Family',
        wsNumber: 3,
        marks: '2 Marks',
        body: 'Find the <strong>ODD ONE OUT</strong> among these transformation pairs:<br><strong>Limestone → Marble &nbsp;|&nbsp; Sandstone → Quartzite &nbsp;|&nbsp; Shale → Slate &nbsp;|&nbsp; Pumice → Coal</strong>',
        options: [
          'Pumice → Coal — because Pumice is volcanic and Coal is formed from compressed swamp plant remains; Coal does NOT form from Pumice!',
          'Limestone → Marble — because limestone never changes.',
          'Sandstone → Quartzite — because quartzite is softer than talcum powder.',
          'Shale → Slate — because slate is made of melted plastic.'
        ],
        correct: 0,
        explanation: 'Limestone → Marble, Sandstone → Quartzite, and Shale → Slate are valid metamorphic parent-daughter transformations. Pumice is a volcanic igneous rock; Coal is a sedimentary fossil fuel formed from buried prehistoric swamp vegetation!',
        takeaway: 'Odd One: Pumice → Coal (Pumice does not form coal; coal forms from ancient plant debris).'
      },
      {
        id: 'l11_q19',
        category: 'oddone',
        source: 'Textbook Page 136 • Metallic Ores',
        wsNumber: 3,
        marks: '2 Marks',
        body: 'Find the <strong>ODD ONE OUT</strong> among these minerals:<br><strong>Haematite, Bauxite, Sphalerite, Petroleum</strong>',
        options: [
          'Petroleum — because it is a liquid NON-METALLIC fossil fuel mineral, whereas Haematite (Iron), Bauxite (Aluminium), and Sphalerite (Zinc) are solid METALLIC mineral ores.',
          'Haematite — because it does not contain any metal.',
          'Bauxite — because it is only found inside rain clouds.',
          'Sphalerite — because it is an animal bone.'
        ],
        correct: 0,
        explanation: 'Haematite, Bauxite, and Sphalerite are metallic ores used to extract Iron, Aluminium, and Zinc respectively. Petroleum is an organic non-metallic mineral / fossil fuel formed from marine organisms.',
        takeaway: 'Odd One: Petroleum (Non-metallic liquid fossil fuel; others are metallic mineral ores).'
      },
      {
        id: 'l11_q20',
        category: 'oddone',
        source: 'Textbook Page 138 • Conservation of Resources',
        wsNumber: 3,
        marks: '2 Marks',
        body: 'Find the <strong>ODD ONE OUT</strong> in terms of resource renewability:<br><strong>Solar energy, Wind energy, Hydroelectric (water) energy, Coal</strong>',
        options: [
          'Coal — because it is a NON-RENEWABLE fossil fuel that takes millions of years to form and gets depleted, whereas Solar, Wind, and Water are RENEWABLE, inexhaustible clean energy sources.',
          'Solar energy — because sunlight produces thick smoke.',
          'Wind energy — because wind cannot generate electricity.',
          'Hydroelectric energy — because water is made of coal.'
        ],
        correct: 0,
        explanation: 'Sun, wind, and water provide inexhaustible renewable energy that does not deplete Earth\'s reserves. Coal is a finite non-renewable fossil fuel being depleted at an alarming rate.',
        takeaway: 'Odd One: Coal (Finite non-renewable fossil fuel; Sun, Wind, and Water are renewable alternatives).'
      },

      // --- SECTION 5: REAL-WORLD SCENARIOS & CASE STUDIES ---
      {
        id: 'l11_q21',
        category: 'scenario',
        source: 'Textbook Page 141 • Competency Based Q1',
        wsNumber: 3,
        marks: '3 Marks',
        body: 'Maya is on a field trip to a volcanic island. She picks up a light grey rock with dozens of tiny holes that floats when dropped into a tide pool. Her teammate Rahul finds a dark, heavy, fine-grained rock that sinks to the bottom like lead.<br><strong>Identify both rocks and explain why Maya’s rock floats while Rahul’s sinks:</strong>',
        options: [
          'Maya found Pumice and Rahul found Basalt. Pumice floats because frothy lava rapidly trapped gas bubbles into porous chambers (density < water); Basalt sinks because it cooled into dense, compact rock rich in heavy iron and magnesium.',
          'Maya found Chalk and Rahul found Marble. Chalk floats because it is made of birds’ feathers.',
          'Maya found Coal and Rahul found Granite. Coal always floats on sea water.',
          'Both found pieces of dried coral reef that differ only in paint colour.'
        ],
        correct: 0,
        explanation: 'During volcanic eruptions, frothy lava expelled under high pressure cools quickly into pumice, trapping millions of tiny air holes that lower its bulk density below that of water (1 g/cm³). Basalt forms from dense, iron-rich liquid lava cooling into heavy, compact stone with no trapped gas pores.',
        takeaway: 'Pumice floats due to trapped air pores; Basalt sinks due to compact iron-magnesium mineral density.'
      },
      {
        id: 'l11_q22',
        category: 'scenario',
        source: 'Textbook Page 141 • Project Work & Scratch Hardness Test',
        wsNumber: 3,
        marks: '3 Marks',
        body: 'In a science laboratory, Ananya is given four rock specimens: <strong>Marble</strong>, <strong>Granite</strong>, <strong>Sandstone</strong>, and <strong>Quartzite</strong>. She performs a scratch test using an ordinary steel nail and a glass slide.<br><strong>Which rock is so exceptionally hard that it can leave a clear scratch mark on steel?</strong>',
        options: [
          'Quartzite (Metamorphic rock formed from sandstone)',
          'Marble (Metamorphic rock formed from limestone)',
          'Shale (Sedimentary rock formed from clay)',
          'Chalk (Sedimentary rock formed from shells)'
        ],
        correct: 0,
        explanation: 'Quartzite is an extraordinarily hard metamorphic rock composed of interlocking quartz crystals. It has a Mohs hardness of 7, easily scratching glass (hardness ~5.5) and common steel (hardness ~5 to 6.5).',
        takeaway: 'Quartzite is so hard it can scratch steel and glass!'
      },
      {
        id: 'l11_q23',
        category: 'scenario',
        source: 'Textbook Page 141 • Section G • Q5 • House Architect',
        wsNumber: 3,
        marks: '3 Marks',
        body: 'Kabir is designing an eco-friendly CBSE model house. He needs to choose the most suitable rocks for four distinct structural parts:<br><strong>(1) Durable kitchen slab &nbsp;|&nbsp; (2) Bathroom floor scrubber &nbsp;|&nbsp; (3) Rainproof flat roof &nbsp;|&nbsp; (4) Window glass</strong><br>Which rock selection is scientifically correct?',
        options: [
          '(1) Granite | (2) Pumice | (3) Slate | (4) Quartzite / Silica sand',
          '(1) Pumice | (2) Granite | (3) Limestone | (4) Coal',
          '(1) Shale | (2) Marble | (3) Pumice | (4) Basalt',
          '(1) Chalk | (2) Slate | (3) Conglomerate | (4) Petroleum'
        ],
        correct: 0,
        explanation: 'Granite is hard, heat-resistant, and non-porous (ideal for kitchen counters). Pumice is porous and abrasive (ideal for foot scrubbers). Slate splits into waterproof flat slabs (ideal for roofs). Quartzite/silica sand is melted to make glass windows!',
        takeaway: 'Rock uses: Granite for slabs | Pumice for scrubbers | Slate for roofs | Quartzite/sand for glass.'
      },
      {
        id: 'l11_q24',
        category: 'scenario',
        source: 'Textbook Page 138 • Subject Connect • Map of India',
        wsNumber: 3,
        marks: '3 Marks',
        body: 'Arnav is marking energy and mineral extraction centers on an outline map of India for his CBSE project. Which location correctly identifies India’s premier offshore petroleum extraction platform and India’s oldest active oil refinery?',
        options: [
          'Bombay High (off the coast of Mumbai in the Arabian Sea) and Digboi (in Assam)',
          'Dhanbad (Jharkhand) and Neyveli (Tamil Nadu)',
          'Raniganj (West Bengal) and Delhi',
          'Kolkata and Chennai'
        ],
        correct: 0,
        explanation: 'Bombay High is an offshore petroleum field located in the Arabian Sea off the Mumbai coast. Digboi in Assam is India’s (and Asia’s) oldest commercial oil field and operating refinery.',
        takeaway: 'Indian Oil Reserves: Bombay High (Mumbai coast offshore) & Digboi (Assam oldest onshore field).'
      }
    ]
  };
