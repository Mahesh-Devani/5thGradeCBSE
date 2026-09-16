/**
 * ==========================================================================
 * SST CHAPTERS PRACTICE — CLASS 5 CBSE
 * Interactive Conceptual Learning & Revision Engine
 * Aligned to CBSE Curriculum & Term 1 School Revision Worksheet
 * ==========================================================================
 */

// ==================== STORAGE & STATE KEYS ====================
const STORAGE_KEY_STATE = 'cbse5_sst_active_state';
const STORAGE_KEY_STARS_PREFIX = 'cbse5_sst_stars_';

// ==================== CHAPTER DATA STORE ====================
const CHAPTERS_DATA = [
  // --------------------------------------------------------------------------
  // CHAPTER 1: L-5 THE DRC - THE LAND OF DENSE FOREST
  // --------------------------------------------------------------------------
  {
    id: 'ch5_drc',
    number: 'L-5',
    title: 'The DRC — The Land of Dense Forest',
    themeColor: '#10b981',
    icon: '🌳',
    tag: 'Geography',
    summary: 'Explore equatorial rainforests, 4 o\'clock convectional rain, 3 forest layers, shifting agriculture, and mineral riches of Central Africa.',
    learnCards: [
      {
        title: 'Location & Historical Journey',
        icon: '🌍',
        body: 'The Democratic Republic of the Congo (DRC) is located in Central Africa in the hot and wet <strong>Torrid Zone</strong>. The Equator passes through its northern part. Formerly known as <em>Belgian Congo</em> and later <em>Zaire (1971–1997)</em>, it gained independence from Belgium in <strong>1960</strong>. Its capital city is <strong>Kinshasa</strong>.'
      },
      {
        title: 'The Daily "4 O\'Clock Rain"',
        icon: '⛈️',
        body: 'Because of intense equatorial heat, mornings are bright and sunny. Strong sun evaporates huge amounts of water from the Congo River and dense jungle. By early afternoon, heavy dark clouds form, leading to a sudden, heavy thunderstorm almost every afternoon between 3:00 PM and 4:00 PM. This is called <strong>4 o\'clock convectional rain</strong>.'
      },
      {
        title: 'Three Layers of the Rainforest',
        icon: '🌲',
        body: 'The tropical rainforest has three distinct storeys:<ul><li><strong>Emergent Layer:</strong> Giant tall trees (over 40–50 m) that poke high above the jungle to catch direct sunlight.</li><li><strong>Canopy:</strong> A dense, intertwined umbrella roof of leaves that blocks sunlight from reaching the ground.</li><li><strong>Understory / Forest Floor:</strong> Dark and damp ground layer home to shade-loving ferns, mosses, and shrubs.</li></ul>'
      },
      {
        title: 'Why Are Rainforests "Evergreen"?',
        icon: '🍃',
        body: 'Tropical rainforests look lush and green throughout the year. This is <em>not</em> because trees never shed leaves, but because different species of trees <strong>shed their leaves at different times of the year</strong>. As a result, the forest is never completely bare!'
      },
      {
        title: 'Wildlife & The Dreaded Tsetse Fly',
        icon: '🦟',
        body: 'The DRC is home to diverse fauna like okapis, bonobos, gorillas, and pygmy hippos (active at night). However, the dangerous <strong>tsetse fly</strong> transmits a parasite causing the dreaded disease called <strong>sleeping sickness</strong> in humans and animals.'
      },
      {
        title: 'Shifting Cultivation & Natural Wealth',
        icon: '💎',
        body: 'Farmers practice <strong>shifting cultivation (slash-and-burn)</strong>. Heavy rains wash away topsoil nutrients (leaching), so farmers burn small forest plots for ash fertilizer, crop for 2–3 years, and then shift to let the forest naturally regenerate. The DRC holds the world\'s largest deposits of <strong>cobalt and industrial diamonds</strong>, which are exported worldwide.'
      }
    ],
    examTraps: [
      {
        trap: 'Thinking evergreen trees never shed their leaves.',
        truth: 'All trees shed leaves! Evergreen trees shed leaves gradually at different times of the year, so the forest as a whole always appears green.'
      },
      {
        trap: 'Assuming the minerals mined in the DRC are used by local citizens.',
        truth: 'The DRC lacks major heavy manufacturing industries. Most mineral wealth (cobalt, diamonds, copper) is exported abroad to industrialized nations.'
      }
    ],
    practiceQuestions: [
      // Fill in Blanks
      {
        id: 'drc_b1',
        type: 'blank',
        prompt: 'The DRC became independent in the year _______.',
        acceptableAnswers: ['1960'],
        hint: 'Belgian colonial rule ended in the early 1960s.',
        explanation: 'The Democratic Republic of the Congo gained independence from Belgium on June 30, 1960.'
      },
      {
        id: 'drc_b2',
        type: 'blank',
        prompt: 'The landscape of the country is dominated by the _______ River.',
        acceptableAnswers: ['congo', 'the congo', 'congo river'],
        hint: 'Second longest river in Africa, also called the Highway of Central Africa.',
        explanation: 'The Congo River curves through the entire DRC and forms the nation’s primary transport artery.'
      },
      {
        id: 'drc_b3',
        type: 'blank',
        prompt: 'Dense grasslands with a few scattered trees found in the southern parts of the DRC are called _______.',
        acceptableAnswers: ['savanna', 'savannas', 'savannah', 'savannahs'],
        hint: 'Tropical grasslands where zebras and antelopes graze.',
        explanation: 'Savannas are warm grasslands with scattered trees found south and north of the dense rainforests.'
      },
      {
        id: 'drc_b4',
        type: 'blank',
        prompt: '_______ transport over the Congo River is the major mode of transportation in the DRC.',
        acceptableAnswers: ['water', 'river', 'boat', 'waterway'],
        hint: 'Roads and railways are difficult to build in thick jungles, so people travel by water.',
        explanation: 'Because dense rainforests and marshy terrain make road construction difficult, water transport along the Congo River is paramount.'
      },
      {
        id: 'drc_b5',
        type: 'blank',
        prompt: 'The DRC has one of the largest deposits of _______ in the world, essential for batteries.',
        acceptableAnswers: ['cobalt', 'industrial diamonds', 'diamonds'],
        hint: 'A silvery-blue metal crucial for rechargeable batteries and jet engines.',
        explanation: 'The DRC produces over 70% of the world’s cobalt and possesses enormous industrial diamond reserves.'
      },

      // True / False
      {
        id: 'drc_tf1',
        type: 'tf',
        prompt: 'The Equator passes through the southern part of the DRC.',
        isTrue: false,
        correction: 'The Equator passes through the northern and central part of the DRC, not the south.',
        explanation: 'The Equator traverses northern DRC. Southern DRC extends towards the temperate southern hemisphere.'
      },
      {
        id: 'drc_tf2',
        type: 'tf',
        prompt: 'Evergreen trees shed all their leaves at the exact same time of the year.',
        isTrue: false,
        correction: 'Evergreen trees shed leaves at different times across the year, keeping the canopy perpetually green.',
        explanation: 'Deciduous trees shed leaves simultaneously before winter/dry season, but rainforest evergreen trees shed old leaves in continuous rotation.'
      },
      {
        id: 'drc_tf3',
        type: 'tf',
        prompt: 'Pygmy hippopotamuses are mainly active during the day.',
        isTrue: false,
        correction: 'Pygmy hippos are nocturnal creatures; they rest in swamps during the day and forage actively at night.',
        explanation: 'Like many dense-forest animals, the pygmy hippopotamus is nocturnal to conserve energy and avoid daytime heat.'
      },
      {
        id: 'drc_tf4',
        type: 'tf',
        prompt: 'The Bambuti, Twa, and Babinga are some of the native tribes of the DRC.',
        isTrue: true,
        explanation: 'The Bambuti and other Pygmy groups are the earliest indigenous inhabitants of the Congo rainforest.'
      },
      {
        id: 'drc_tf5',
        type: 'tf',
        prompt: 'Most of the mineral resources mined in the DRC are consumed locally and not exported.',
        isTrue: false,
        correction: 'Almost all mined mineral resources are exported abroad to foreign industrial markets.',
        explanation: 'The DRC exports its cobalt, diamonds, gold, and copper to industrial economies across Asia, Europe, and America.'
      },

      // Match the Following
      {
        id: 'drc_m1',
        type: 'match',
        prompt: 'Match the Rainforest Features & DRC Terms with their correct descriptions:',
        pairs: [
          { left: 'Emergent Layer', right: 'Tallest trees towering 40–50 m above' },
          { left: 'Canopy', right: 'Dense leafy umbrella blocking sunlight' },
          { left: 'Understory', right: 'Dark, humid floor with ferns and mosses' },
          { left: 'Tsetse Fly', right: 'Causes dangerous sleeping sickness' }
        ]
      },
      {
        id: 'drc_m2',
        type: 'match',
        prompt: 'Match the Crops & Resources of the DRC to their categories:',
        pairs: [
          { left: 'Cassava', right: 'Staple food crop with starchy root' },
          { left: 'Coffee & Cocoa', right: 'Commercial cash crops exported' },
          { left: 'Cobalt', right: 'Mineral vital for electric batteries' },
          { left: 'Bambuti', right: 'Indigenous forest hunter-gatherers' }
        ]
      },

      // Short Answer Questions
      {
        id: 'drc_s1',
        type: 'short',
        prompt: 'Why does an evergreen forest look green all year round?',
        thinkingClue: '💡 Think About It: Do the trees hold the same leaf forever, or do they take turns shedding?',
        keyPoints: [
          'Different tree species shed their leaves at different times of the year.',
          'There is no single dry or cold season when all trees lose leaves together, so the forest stays green.'
        ]
      },
      {
        id: 'drc_s2',
        type: 'short',
        prompt: 'Name three food crops and three cash crops grown in the DRC.',
        thinkingClue: '💡 Think About It: Food crops feed the family; cash crops are sold for money abroad.',
        keyPoints: [
          'Food Crops: Cassava (staple), Maize, Rice, and Plantains/Bananas.',
          'Cash Crops: Coffee, Cocoa, Rubber, Palm oil, and Cotton.'
        ]
      },
      {
        id: 'drc_s3',
        type: 'short',
        prompt: 'Briefly describe the living conditions of the tribal people in the DRC (such as the Bambuti).',
        thinkingClue: '💡 Think About It: Consider their height, housing, and how they find food in the deep jungle.',
        keyPoints: [
          'Short stature helps them navigate dense, tangled forest undergrowth easily.',
          'They live a nomadic hunting-and-gathering life in temporary dome-shaped huts made of branches and leaves.'
        ]
      },

      // Long Answer Scaffold Studio
      {
        id: 'drc_l1',
        type: 'long',
        prompt: 'Explain the three main layers of trees found in the tropical rainforests of the DRC.',
        blueprintTitle: 'Rainforest Layer Architecture',
        pillars: [
          {
            id: 'p1',
            title: 'Emergent Layer (The Giant Towers)',
            prompt: 'Describe the tallest trees that break above the canopy.',
            keywords: ['emergent', 'tall trees', 'sunlight', '40 to 50 meters', 'umbrella']
          },
          {
            id: 'p2',
            title: 'Canopy Layer (The Green Roof)',
            prompt: 'Explain how intertwined branches form an unbroken ceiling.',
            keywords: ['canopy', 'umbrella', 'blocks sunlight', 'branches', 'thick leaves']
          },
          {
            id: 'p3',
            title: 'Understory & Forest Floor (The Shady Ground)',
            prompt: 'Describe what survives on the dark, damp jungle ground.',
            keywords: ['understory', 'forest floor', 'dark', 'damp', 'ferns', 'shrubs', 'little sunlight']
          }
        ],
        modelAnswer: `<strong>Three Main Layers of Tropical Rainforests:</strong>
<ol>
  <li><strong>Emergent Layer:</strong> The uppermost layer where giant trees (reaching 40 to 50 metres or more) punch above the surrounding jungle. These trees have small, tough leaves and enjoy direct sunlight and strong breezes.</li>
  <li><strong>Canopy:</strong> The middle layer consisting of a dense, continuous umbrella formed by overlapping branches and broad leaves. It acts like a roof that traps moisture and blocks almost all sunlight from reaching below. Most birds, monkeys, and tree-frogs dwell here.</li>
  <li><strong>Understory & Forest Floor:</strong> The bottom ground layer receives less than 2% of sunlight. It is warm, dark, and humid, supporting shade-loving plants such as ferns, mushrooms, and shrubs. Decaying leaves enrich the damp soil.</li>
</ol>`
      },
      {
        id: 'drc_l2',
        type: 'long',
        prompt: 'Describe the climate of the DRC and explain how it affects daily rainfall in the region.',
        blueprintTitle: 'Equatorial Heat & 4 O\'Clock Rain Engine',
        pillars: [
          {
            id: 'p1',
            title: 'Equatorial Climate Foundation',
            prompt: 'What are the general temperature and humidity levels year-round?',
            keywords: ['torrid zone', 'equator', 'hot and humid', 'throughout the year', 'high temperature']
          },
          {
            id: 'p2',
            title: 'Morning Heating & Evaporation',
            prompt: 'What happens when morning sun hits rivers and forests?',
            keywords: ['morning sun', 'intense heat', 'evaporation', 'water vapour', 'clouds']
          },
          {
            id: 'p3',
            title: 'Afternoon Thunderstorm ("4 O\'Clock Rain")',
            prompt: 'How and when does the rain burst?',
            keywords: ['4 o\'clock rain', 'afternoon', 'heavy thunderstorm', 'convectional rain', 'cooling']
          }
        ],
        modelAnswer: `<strong>Climate and Daily Rainfall in the DRC:</strong>
<ol>
  <li><strong>Equatorial Climate:</strong> Because the DRC lies across the Equator in the Torrid Zone, it experiences high temperatures (average 25°C–30°C) and heavy humidity throughout the year with very little seasonal variation.</li>
  <li><strong>Morning Heating Cycle:</strong> In the morning, intense vertical sunrays heat up the damp forest floor and abundant water bodies (like the Congo River), causing rapid evaporation and transpiration. Warm, moisture-laden air rises rapidly into the atmosphere.</li>
  <li><strong>4 O'Clock Convectional Rain:</strong> By early afternoon, rising water vapour condenses into dark, towering cumulonimbus clouds. Almost every day between 3:00 PM and 4:00 PM, thunderous downpours occur, known as <strong>4 o'clock rain</strong>, leaving evenings pleasantly cool.</li>
</ol>`
      },
      {
        id: 'drc_l3',
        type: 'long',
        prompt: 'Identify the type of farming practised in the DRC. Why do you think this type of farming is done in this region?',
        blueprintTitle: 'Shifting Cultivation Breakdown',
        pillars: [
          {
            id: 'p1',
            title: 'Identify the Farming Method',
            prompt: 'What is the name of this traditional method?',
            keywords: ['shifting cultivation', 'slash and burn', 'traditional farming']
          },
          {
            id: 'p2',
            title: 'Step-by-Step Procedure',
            prompt: 'How do farmers clear land and use ash for crops?',
            keywords: ['cleared', 'trees burned', 'ash fertilizes', '2 to 3 years', 'move to new land']
          },
          {
            id: 'p3',
            title: 'Environmental Reasons (Leaching & Regrowth)',
            prompt: 'Why must they move after 2–3 years?',
            keywords: ['heavy rain', 'soil loses fertility', 'leaching', 'natural regeneration', 'forest regrows']
          }
        ],
        modelAnswer: `<strong>Farming in the DRC — Shifting Cultivation:</strong>
<ol>
  <li><strong>Identification:</strong> The primary traditional method of farming in the forested regions of the DRC is <strong>Shifting Cultivation</strong> (also known as <em>Slash-and-Burn agriculture</em>).</li>
  <li><strong>How It Is Practiced:</strong> Farmers clear a small forest patch by cutting down trees and burning the undergrowth. The leftover ash provides natural minerals that fertilize the otherwise nutrient-poor soil. They grow crops like cassava and maize for 2 to 3 years.</li>
  <li><strong>Why It Is Done Here:</strong> Heavy, daily equatorial rains wash away soluble nutrients deep into the ground (a process called <strong>soil leaching</strong>). As a result, the soil rapidly loses fertility after a few harvests. Farmers then abandon that plot and shift to a new patch, allowing the old forest to regrow naturally over 10–15 years.</li>
</ol>`
      }
    ]
  },

  // --------------------------------------------------------------------------
  // CHAPTER 2: L-7 SAUDI ARABIA - THE LAND OF HOT SANDS
  // --------------------------------------------------------------------------
  {
    id: 'ch7_saudi',
    number: 'L-7',
    title: 'Saudi Arabia — The Land of Hot Sands',
    themeColor: '#f59e0b',
    icon: '🏜️',
    tag: 'Geography',
    summary: 'Discover desert landforms, sand dunes, oasis lifelines, petroleum transformation, Bedouin nomadic culture, and climate adaptations.',
    learnCards: [
      {
        title: 'Geographic Location & Seas',
        icon: '📍',
        body: 'Saudi Arabia occupies most of the <strong>Arabian Peninsula</strong> in southwest Asia. It is bordered by the <strong>Red Sea</strong> to the west and the <strong>Persian Gulf</strong> to the east. Its capital city is <strong>Riyadh</strong>.'
      },
      {
        title: 'Desert Landforms & Sand Dunes',
        icon: '⏳',
        body: 'Most of the country is a vast, dry desert plateau (Nejd). High sand dunes—mounds or hills of loose sand formed and continuously shifted by fierce winds (called <em>shamals</em>)—dominate the landscape. The south contains the vast <strong>Rub\' al Khali</strong> ("The Empty Quarter"), the world’s largest continuous sand desert.'
      },
      {
        title: 'Water Scarcity & Oasis Lifelines',
        icon: '🌴',
        body: 'There are <strong>no permanent rivers or lakes</strong> in Saudi Arabia. Dry riverbeds called <strong>wadis</strong> fill with water only after rare rainstorms. An <strong>oasis</strong> is an isolated green haven where underground water reaches the surface, allowing date palms, wheat, and vegetables to thrive and permanent towns to develop.'
      },
      {
        title: 'The Miracle of "Liquid Gold"',
        icon: '🛢️',
        body: 'In the 1930s, vast underground reserves of <strong>petroleum (mineral oil)</strong> were discovered. Exporting this "liquid gold" transformed Saudi Arabia from a poor desert kingdom into one of the world\'s richest economies, financing modern highways, airports, air-conditioned skyscrapers, and top-tier healthcare.'
      },
      {
        title: 'Overcoming Water & Agricultural Limits',
        icon: '💧',
        body: 'To supply drinking water and farm fresh vegetables, Saudi Arabia built the world\'s largest network of <strong>desalination plants</strong> (which remove salt from seawater), drilled ultra-deep tube wells, and built high-tech greenhouse farms utilizing computer-controlled <strong>drip irrigation</strong>.'
      },
      {
        title: 'Bedouin Heritage & Desert Clothing',
        icon: '🐫',
        body: 'Nomadic herders known as <strong>Bedouins</strong> travel with herds of camels, sheep, and goats seeking pastures and water. Men traditionally wear a loose, ankle-length white cotton robe called a <strong>Thobe</strong> to reflect blazing sun, and a headcloth called a <strong>Ghutrah</strong> secured by an <strong>Egal</strong> to ward off stinging sandstorms. Women wear a black cloak called an <strong>Abaya</strong>.'
      }
    ],
    examTraps: [
      {
        trap: 'Saying the central part of Saudi Arabia is covered with high mountains.',
        truth: 'The central part is a high, rocky plateau (Nejd) and desert! High mountains (Asir mountains) are located only in the southwest near the Red Sea coast.'
      },
      {
        trap: 'Confusing wadis with permanent rivers.',
        truth: 'Wadis are dry channels for 99% of the year; they only carry water for a few hours after a rare desert cloudburst.'
      }
    ],
    practiceQuestions: [
      // Fill in Blanks
      {
        id: 'sau_b1',
        type: 'blank',
        prompt: 'The capital city of Saudi Arabia is _______.',
        acceptableAnswers: ['riyadh'],
        hint: 'A bustling modern metropolis situated in the central desert plateau.',
        explanation: 'Riyadh is the capital and largest city of Saudi Arabia.'
      },
      {
        id: 'sau_b2',
        type: 'blank',
        prompt: 'Name the sea located to the west of Saudi Arabia: _______ Sea.',
        acceptableAnswers: ['red', 'the red', 'red sea'],
        hint: 'It separates the Arabian Peninsula from the African continent.',
        explanation: 'The Red Sea lies to the west of Saudi Arabia.'
      },
      {
        id: 'sau_b3',
        type: 'blank',
        prompt: '_______ is an important natural resource found abundantly in Saudi Arabia, also known as liquid gold.',
        acceptableAnswers: ['petroleum', 'mineral oil', 'crude oil', 'oil'],
        hint: 'The dark liquid fuel pumped from underground desert rocks.',
        explanation: 'Petroleum constitutes the backbone of Saudi Arabia\'s massive global wealth.'
      },
      {
        id: 'sau_b4',
        type: 'blank',
        prompt: '_______ is a group of traditional desert people also known as nomadic herders.',
        acceptableAnswers: ['bedouins', 'bedouin'],
        hint: 'They live in tents woven from camel and goat hair and move with their livestock.',
        explanation: 'Bedouins are the traditional nomadic pastoralists of the Arabian deserts.'
      },
      {
        id: 'sau_b5',
        type: 'blank',
        prompt: 'A fertile area in a desert where underground water reaches the surface is called an _______.',
        acceptableAnswers: ['oasis', 'an oasis'],
        hint: 'Date palms grow naturally around these desert water holes.',
        explanation: 'An oasis is formed where underground aquifers reach the surface in depressions.'
      },

      // True / False
      {
        id: 'sau_tf1',
        type: 'tf',
        prompt: 'Mecca and Medina are important pilgrimage centres for Muslims.',
        isTrue: true,
        explanation: 'Mecca (the birthplace of Prophet Muhammad) and Medina are the two holiest cities in Islam, visited by millions for the annual Hajj.'
      },
      {
        id: 'sau_tf2',
        type: 'tf',
        prompt: 'The central part of Saudi Arabia is mostly covered with high mountains.',
        isTrue: false,
        correction: 'The central part is a high rocky and sandy plateau (Nejd); high mountains (Asir) are located in the southwest along the Red Sea.',
        explanation: 'The Asir mountains lie on the southwestern Red Sea border; the central heartland is the arid Nejd plateau.'
      },
      {
        id: 'sau_tf3',
        type: 'tf',
        prompt: 'Desalination is the process of extracting petroleum from desert sand.',
        isTrue: false,
        correction: 'Desalination is the industrial process of removing salt and minerals from seawater to produce fresh drinking water.',
        explanation: 'Because it lacks fresh rivers, Saudi Arabia produces most of its municipal drinking water from seawater desalination.'
      },
      {
        id: 'sau_tf4',
        type: 'tf',
        prompt: 'Bedouins traditionally built multi-storey concrete houses in the desert.',
        isTrue: false,
        correction: 'Bedouins lived in portable tents made of woven camel or goat hair so they could migrate with their herds.',
        explanation: 'Nomadic pastoral life requires lightweight, easily dismantled shelters rather than permanent stone or concrete houses.'
      },

      // Match the Following
      {
        id: 'sau_m1',
        type: 'match',
        prompt: 'Match the Traditional Saudi Clothing & Terms with their descriptions:',
        pairs: [
          { left: 'Thobe', right: 'Long loose white cotton robe reflecting sun' },
          { left: 'Ghutrah', right: 'Square head cloth shielding sun and dust' },
          { left: 'Egal', right: 'Black rope cord holding head cloth in place' },
          { left: 'Abaya', right: 'Traditional flowing black cloak worn by women' }
        ]
      },
      {
        id: 'sau_m2',
        type: 'match',
        prompt: 'Match the Geographic Features of Saudi Arabia:',
        pairs: [
          { left: 'Rub\' al Khali', right: 'Vast southern desert known as Empty Quarter' },
          { left: 'Wadi', right: 'Dry riverbed filling only after rare flash flood' },
          { left: 'Riyadh', right: 'Ultramodern capital city in central plateau' },
          { left: 'Red Sea', right: 'Major water body bounding western coast' }
        ]
      },

      // Short Answer Questions
      {
        id: 'sau_s1',
        type: 'short',
        prompt: 'Dunes are commonly found in Saudi Arabia. Give reasons.',
        thinkingClue: '💡 Think About It: What two things make a dune? Loose dry sand + strong winds!',
        keyPoints: [
          'Saudi Arabia has vast arid deserts covered with loose, dry sand particles.',
          'Strong desert winds (shamals) continuously blow and deposit sand into shifting mounds called sand dunes.'
        ]
      },
      {
        id: 'sau_s2',
        type: 'short',
        prompt: 'Bedouins traditionally lived a nomadic life. Give reasons.',
        thinkingClue: '💡 Think About It: What do grazing camels and goats need to survive in an arid climate?',
        keyPoints: [
          'Water and grazing pastures are scarce and dry up quickly in the desert.',
          'Bedouins had to continuously move their flocks of camels, goats, and sheep in search of fresh grass and water wells.'
        ]
      },
      {
        id: 'sau_s3',
        type: 'short',
        prompt: 'Identify the traditional dress and head gear worn by the men of Saudi Arabia.',
        thinkingClue: '💡 Think About It: White robe, head cloth, and black securing cord.',
        keyPoints: [
          'Dress: A loose, full-length white cotton robe called the <strong>Thobe</strong>.',
          'Headgear: A square cloth called the <strong>Ghutrah</strong>, held securely by a black cord called the <strong>Egal</strong>.'
        ]
      },

      // Long Answer Scaffold Studio
      {
        id: 'sau_l1',
        type: 'long',
        prompt: 'Why is agriculture difficult in Saudi Arabia? How do farmers and the government overcome these difficulties?',
        blueprintTitle: 'Agriculture & Water Solutions Blueprint',
        pillars: [
          {
            id: 'p1',
            title: 'Natural Difficulties of Desert Farming',
            prompt: 'Explain why natural conditions oppose crops.',
            keywords: ['no permanent rivers', 'extreme heat', 'scanty rainfall', 'sandy soil', 'arid']
          },
          {
            id: 'p2',
            title: 'Modern Water Engineering Solutions',
            prompt: 'How do they generate fresh water from the sea and underground?',
            keywords: ['desalination plants', 'seawater', 'deep tube wells', 'underground aquifers']
          },
          {
            id: 'p3',
            title: 'Modern Agricultural Practices',
            prompt: 'What techniques preserve water while growing vegetables?',
            keywords: ['drip irrigation', 'greenhouses', 'oasis farming', 'date palms', 'wheat']
          }
        ],
        modelAnswer: `<strong>Agriculture in Saudi Arabia — Difficulties & Solutions:</strong>
<ol>
  <li><strong>Why Agriculture is Difficult:</strong>
    <ul>
      <li>Saudi Arabia has an extremely hot and arid desert climate with scanty, erratic rainfall.</li>
      <li>There are no permanent rivers, streams, or freshwater lakes.</li>
      <li>The soil is predominantly loose sand with virtually no organic matter or water-retention capacity.</li>
    </ul>
  </li>
  <li><strong>How Difficulties are Overcome:</strong>
    <ul>
      <li><strong>Desalination Plants:</strong> Huge coastal industrial plants convert salty Red Sea and Persian Gulf water into fresh water for drinking and farming.</li>
      <li><strong>Deep Tube Wells:</strong> Powerful pumps extract ancient underground water stored deep beneath desert rock layers.</li>
      <li><strong>Drip Irrigation & Greenhouses:</strong> Modern climate-controlled greenhouses use computerised drip pipes to deliver water directly to plant roots with zero waste.</li>
      <li><strong>Oasis Cultivation:</strong> Around natural oases, farmers grow hardy crops such as date palms, wheat, barley, and melons.</li>
    </ul>
  </li>
</ol>`
      },
      {
        id: 'sau_l2',
        type: 'long',
        prompt: 'How has the discovery of petroleum helped Saudi Arabia become one of the richest countries in the world?',
        blueprintTitle: 'Petroleum Transformation Engine',
        pillars: [
          {
            id: 'p1',
            title: 'The Discovery of Petroleum ("Liquid Gold")',
            prompt: 'When was oil found and what makes it so valuable?',
            keywords: ['petroleum', 'liquid gold', '1930s', 'crude oil reserves', 'fossil fuel']
          },
          {
            id: 'p2',
            title: 'Massive Global Export Revenue',
            prompt: 'Why do nations worldwide purchase Saudi oil?',
            keywords: ['exports', 'world demand', 'revenue', 'foreign wealth', 'energy']
          },
          {
            id: 'p3',
            title: 'Modern Infrastructure & Quality of Life',
            prompt: 'How was oil money invested inside the country?',
            keywords: ['modern cities', 'riyadh', 'airports', 'highways', 'hospitals', 'free education', 'desalination']
          }
        ],
        modelAnswer: `<strong>How Petroleum Transformed Saudi Arabia:</strong>
<ol>
  <li><strong>Discovery of "Liquid Gold":</strong> In the 1930s, geologists struck massive underground petroleum reserves beneath the eastern deserts of Saudi Arabia. Crude oil is in universal demand worldwide to power vehicles, industries, and electricity plants.</li>
  <li><strong>Global Export Powerhouse:</strong> As the leading exporter of petroleum, Saudi Arabia earns billions of dollars in oil revenues every year, shifting from an impoverished desert nation into an economic superpower.</li>
  <li><strong>National Modernisation:</strong> The government invested oil profits directly into transforming the country:
    <ul>
      <li>Building ultramodern, air-conditioned cities with glass skyscrapers (Riyadh, Jeddah, Dhahran).</li>
      <li>Constructing world-class expressways, international airports, and seaports.</li>
      <li>Establishing modern hospitals and universities offering free healthcare and education to all citizens.</li>
      <li>Financing mega desalination plants to guarantee endless drinking water in the desert.</li>
    </ul>
  </li>
</ol>`
      },
      {
        id: 'sau_l3',
        type: 'long',
        prompt: 'A country\'s natural environment influences the lifestyle of its people. Explain this statement using Saudi Arabia as an example.',
        blueprintTitle: 'Human Adaptation to Desert Blueprint',
        pillars: [
          {
            id: 'p1',
            title: 'Clothing Adapted to Sun & Sandstorms',
            prompt: 'Why do men wear thobes and ghutrahs?',
            keywords: ['thobe', 'ghutrah', 'egal', 'white cotton', 'reflect sunlight', 'protect against sand']
          },
          {
            id: 'p2',
            title: 'Shelter & Architecture',
            prompt: 'How do traditional and modern homes beat desert heat?',
            keywords: ['thick mud walls', 'small windows', 'tents', 'hair of camels', 'air conditioning']
          },
          {
            id: 'p3',
            title: 'Transportation & Food Choices',
            prompt: 'How did the camel and dates fit desert survival?',
            keywords: ['camel', 'ship of the desert', 'padded feet', 'date palms', 'milk']
          }
        ],
        modelAnswer: `<strong>Environmental Influence on Saudi Lifestyle:</strong>
<ol>
  <li><strong>Clothing:</strong> Blazing heat and sudden sandstorms dictate traditional dress. Men wear the <em>Thobe</em> (loose, light-colored cotton robe reflecting harsh sunrays) and the <em>Ghutrah</em> (headcloth held by an <em>Egal</em>) to guard eyes and respiratory passages from flying sand. Women wear the lightweight <em>Abaya</em>.</li>
  <li><strong>Shelter:</strong> Traditional houses were built with thick mud walls and tiny windows to trap cool night air and exclude daytime glare. Nomadic Bedouins crafted portable tents woven from insulating camel/goat hair. Today, modern homes rely universally on central air conditioning.</li>
  <li><strong>Transportation & Diet:</strong> The <em>Camel</em> ("Ship of the Desert") provided optimal transport with wide padded feet that never sink in dunes, along with meat and nutrient-rich milk. Sweet date palms, which require little water, became the staple energy food.</li>
</ol>`
      }
    ]
  },

  // --------------------------------------------------------------------------
  // CHAPTER 3: L-17 THE BRITISH RAJ AND THE FIRST WAR OF INDEPENDENCE
  // --------------------------------------------------------------------------
  {
    id: 'ch17_british_raj',
    number: 'L-17',
    title: 'The British Raj & The First War of Independence',
    themeColor: '#f43f5e',
    icon: '⚔️',
    tag: 'History',
    summary: 'Trace European traders, East India Company rule, the Battle of Plassey, severe social exploitation, Mangal Pandey\'s sacrifice, and the 1857 Uprising.',
    learnCards: [
      {
        title: 'Arrival of European Traders',
        icon: '⛵',
        body: 'In <strong>1498</strong>, Portuguese explorer <strong>Vasco da Gama</strong> found a sea route to India by sailing around the southern tip of Africa (Cape of Good Hope) and landed at Calicut in Kerala. Portuguese, Dutch, French, and English merchants soon arrived to trade in spices, silk, cotton, and indigo.'
      },
      {
        title: 'The English East India Company & Plassey',
        icon: '📜',
        body: 'Formed in London in <strong>1600</strong> by a royal charter from Queen Elizabeth I, the English East India Company began as peaceful traders. Over time, they maintained private armies. In <strong>1757</strong>, British forces led by Robert Clive defeated Nawab Siraj-ud-Daulah in the famous <strong>Battle of Plassey</strong>, establishing British political rule over Bengal.'
      },
      {
        title: 'Exploitation of Indian Society',
        icon: '⛓️',
        body: 'British rule devastated India\'s traditional economy:<ul><li><strong>Farmers:</strong> Forced to grow cash crops (indigo, cotton) instead of food grains; paid extortionate land taxes (Lagaan).</li><li><strong>Weavers:</strong> Cheap machine-made cloth from British mills flooded India, destroying domestic handloom artisans.</li><li><strong>Traders:</strong> Paid high discriminatory duties, while British goods traded tax-free.</li><li><strong>Rulers:</strong> Deprived of kingdoms through Lord Dalhousie\'s <em>Doctrine of Lapse</em> (annexing lands if a king had no natural biological son).</li></ul>'
      },
      {
        title: 'The Immediate Spark: Greased Cartridges',
        icon: '🔫',
        body: 'In 1857, the British introduced the new <strong>Enfield Rifle</strong>. Soldiers had to bite open the cartridge paper before loading. Rumours spread that the grease was made from <strong>cow fat</strong> (sacred to Hindus) and <strong>pig fat</strong> (forbidden to Muslims). Indian sepoys felt this was a deliberate insult to their faiths.'
      },
      {
        title: 'Mangal Pandey & Outbreak of 1857',
        icon: '🔥',
        body: 'On <strong>29 March 1857</strong>, young sepoy <strong>Mangal Pandey</strong> openly defied British officers at <strong>Barrackpore</strong> (Bengal) and was hanged on 8 April. On <strong>10 May 1857</strong>, Indian sepoys in <strong>Meerut</strong> rose in open mutiny, freed jailed comrades, and marched to Delhi to declare aged Mughal Emperor <strong>Bahadur Shah Zafar II</strong> as Emperor of India.'
      },
      {
        title: 'Heroes of 1857 & Historic Aftermath',
        icon: '👑',
        body: 'Prominent leaders arose across northern India: <strong>Rani Lakshmibai</strong> in Jhansi, <strong>Nana Sahib and Tatya Tope</strong> in Kanpur, <strong>Begum Hazrat Mahal</strong> in Lucknow, and <strong>Kunwar Singh</strong> in Bihar. In <strong>1858</strong>, British Parliament ended East India Company rule; governance passed directly to the <strong>British Crown (Queen Victoria)</strong>, and the Governor-General became the <strong>Viceroy</strong>.'
      }
    ],
    examTraps: [
      {
        trap: 'Confusing the year the East India Company was formed (1600) with the Battle of Plassey (1757) or the Revolt (1857).',
        truth: 'Remember: 1600 (Company formed) -> 1757 (Battle of Plassey) -> 1857 (First War of Independence, exactly 100 years later!).'
      },
      {
        trap: 'Thinking Vasco da Gama walked across land to India.',
        truth: 'Vasco da Gama sailed on ships around the entire African continent via the Cape of Good Hope.'
      }
    ],
    practiceQuestions: [
      // Fill in Blanks
      {
        id: 'raj_b1',
        type: 'blank',
        prompt: 'The English East India Company was formed in the year _______.',
        acceptableAnswers: ['1600'],
        hint: 'Chartered by Queen Elizabeth I at the turn of the 17th century.',
        explanation: 'The English East India Company received its royal charter on 31 December 1600.'
      },
      {
        id: 'raj_b2',
        type: 'blank',
        prompt: 'Vasco da Gama reached Calicut in 1498 by travelling around the continent of _______.',
        acceptableAnswers: ['africa', 'the continent of africa'],
        hint: 'Sailing around the Cape of Good Hope.',
        explanation: 'Portuguese navigator Vasco da Gama circumnavigated Africa to reach the Malabar coast in 1498.'
      },
      {
        id: 'raj_b3',
        type: 'blank',
        prompt: 'The Battle of Plassey was fought in the year _______.',
        acceptableAnswers: ['1757'],
        hint: 'Exactly 100 years before the 1857 revolt.',
        explanation: 'Robert Clive defeated Nawab Siraj-ud-Daulah of Bengal at Plassey in 1757.'
      },
      {
        id: 'raj_b4',
        type: 'blank',
        prompt: 'The Revolt of 1857 began with a brave incident at Barrackpore involving soldier _______ Pandey.',
        acceptableAnswers: ['mangal', 'mangal pandey'],
        hint: 'Young sepoy of the 34th Bengal Native Infantry.',
        explanation: 'Mangal Pandey fired the first shot against British superiors at Barrackpore on 29 March 1857.'
      },
      {
        id: 'raj_b5',
        type: 'blank',
        prompt: 'The last Mughal emperor asked to lead the Revolt of 1857 was Bahadur Shah _______.',
        acceptableAnswers: ['zafar', 'zafar ii', 'bahadur shah zafar', 'ii'],
        hint: 'He was later exiled by the British to Rangoon (Burma).',
        explanation: 'Rebel sepoys marched to Delhi and proclaimed Bahadur Shah Zafar II as Emperor of Hindustan.'
      },

      // True / False
      {
        id: 'raj_tf1',
        type: 'tf',
        prompt: 'Vasco da Gama reached Calicut by travelling around Africa.',
        isTrue: true,
        explanation: 'Vasco da Gama sailed south around Africa’s Cape of Good Hope, reaching Calicut in May 1498.'
      },
      {
        id: 'raj_tf2',
        type: 'tf',
        prompt: 'The Revolt of 1857 began with an incident involving Mangal Pandey.',
        isTrue: true,
        explanation: 'Mangal Pandey’s defiance at Barrackpore ignited the spirit of rebellion among Indian sepoys.'
      },
      {
        id: 'raj_tf3',
        type: 'tf',
        prompt: 'Under the Doctrine of Lapse, an Indian ruler without a natural heir was permitted to pass his kingdom to an adopted son.',
        isTrue: false,
        correction: 'Under Lord Dalhousie\'s Doctrine of Lapse, adopted sons were forbidden from inheriting the throne, and the kingdom was annexed by the British.',
        explanation: 'The Doctrine of Lapse was an aggressive British policy designed to seize kingdoms like Jhansi, Satara, and Nagpur.'
      },
      {
        id: 'raj_tf4',
        type: 'tf',
        prompt: 'British rule flourished traditional Indian handloom textile industries.',
        isTrue: false,
        correction: 'British mill cloth flooded Indian markets duty-free, throwing thousands of traditional Indian weavers and artisans out of work.',
        explanation: 'Cheap machine-woven British fabrics destroyed the livelihood of traditional Indian spinners and handloom weavers.'
      },

      // Match the Following
      {
        id: 'raj_m1',
        type: 'match',
        prompt: 'Match the Prominent Leaders of the 1857 Revolt to the regions they led:',
        pairs: [
          { left: 'Rani Lakshmibai', right: 'Jhansi' },
          { left: 'Nana Sahib & Tatya Tope', right: 'Kanpur' },
          { left: 'Begum Hazrat Mahal', right: 'Lucknow (Awadh)' },
          { left: 'Kunwar Singh', right: 'Bihar (Jagdishpur)' }
        ]
      },
      {
        id: 'raj_m2',
        type: 'match',
        prompt: 'Match Historical Milestones with the correct calendar years:',
        pairs: [
          { left: 'Vasco da Gama at Calicut', right: '1498' },
          { left: 'East India Company Formed', right: '1600' },
          { left: 'Battle of Plassey', right: '1757' },
          { left: 'First War of Independence', right: '1857' }
        ]
      },

      // Short Answer Questions
      {
        id: 'raj_s1',
        type: 'short',
        prompt: 'Why did the British want to expand their control over India? Give three reasons.',
        thinkingClue: '💡 Think About It: Consider raw materials for factories, selling machine goods, and collecting land taxes.',
        keyPoints: [
          'To acquire cheap raw materials (cotton, indigo, spices) for British factories.',
          'To use India as a captive market to sell expensive machine-made British manufactured goods.',
          'To collect heavy land revenue (taxes) to fund their military and global empire.'
        ]
      },
      {
        id: 'raj_s2',
        type: 'short',
        prompt: 'How did the greased cartridges become an immediate cause of the Revolt of 1857?',
        thinkingClue: '💡 Think About It: What animal fats were used, and why did that hurt both Hindu and Muslim sepoys?',
        keyPoints: [
          'Enfield rifle cartridges were coated with grease made from cow fat (sacred to Hindus) and pig fat (forbidden to Muslims).',
          'Soldiers had to bite the cartridge paper with their teeth before loading, which outraged religious sentiments of both communities.'
        ]
      },
      {
        id: 'raj_s3',
        type: 'short',
        prompt: 'Identify the Indian soldier who revolted at Barrackpore and evaluate his impact on the First War of Independence.',
        thinkingClue: '💡 Think About It: Sepoy Mangal Pandey; his sacrifice broke soldiers\' fear of British officers.',
        keyPoints: [
          'The soldier was <strong>Mangal Pandey</strong> of the 34th Bengal Native Infantry at Barrackpore.',
          'His defiance and martyrdom broke the psychological barrier of fear, inspiring Meerut soldiers to launch a nationwide rebellion.'
        ]
      },

      // Long Answer Scaffold Studio
      {
        id: 'raj_l1',
        type: 'long',
        prompt: 'Explain how British rule affected different sections of Indian society, such as farmers, weavers, traders and Indian rulers.',
        blueprintTitle: 'Impact of British Rule on Indian Society',
        pillars: [
          {
            id: 'p1',
            title: 'Impact on Farmers',
            prompt: 'How did cash crops and heavy taxes harm farmers?',
            keywords: ['farmers', 'cash crops', 'indigo', 'cotton', 'heavy taxes', 'lagaan', 'famines', 'debt']
          },
          {
            id: 'p2',
            title: 'Impact on Weavers & Artisans',
            prompt: 'What happened when British machine cloth flooded India?',
            keywords: ['weavers', 'machine made cloth', 'mills', 'handloom destroyed', 'lost livelihood']
          },
          {
            id: 'p3',
            title: 'Impact on Indian Traders',
            prompt: 'How did unequal taxes favor British companies?',
            keywords: ['traders', 'heavy duties', 'taxes', 'british goods tax free', 'unfair trade']
          },
          {
            id: 'p4',
            title: 'Impact on Indian Rulers',
            prompt: 'How did the Doctrine of Lapse confiscate kingdoms?',
            keywords: ['indian rulers', 'doctrine of lapse', 'dalhousie', 'annexed', 'adopted son', 'jhansi']
          }
        ],
        modelAnswer: `<strong>Impact of British Rule on Different Sections of Indian Society:</strong>
<ol>
  <li><strong>Farmers:</strong> British officials forced farmers to cultivate industrial cash crops like indigo and cotton instead of essential food grains (wheat/rice). Farmers were forced to pay heavy land revenue (<em>Lagaan</em>) even during crop failures, pushing millions into moneylender debt and devastating famines.</li>
  <li><strong>Weavers & Artisans:</strong> Inexpensive machine-made textiles from Manchester and Lancashire mills flooded Indian bazaars duty-free. Traditional handloom weavers could not compete against cheap factory cloth, resulting in the collapse of India's world-famous textile industry and widespread poverty.</li>
  <li><strong>Traders:</strong> Indian merchants were forced to pay heavy discriminatory customs duties and transport taxes, while the East India Company traded completely duty-free, systematically driving Indian businessmen out of profitable trade.</li>
  <li><strong>Indian Rulers:</strong> Royal kings and nawabs faced aggressive British policies such as Lord Dalhousie\'s <em>Doctrine of Lapse</em>. If an Indian ruler died without a natural biological son, the British refused to recognise adopted heirs and annexed kingdoms (e.g. Jhansi, Satara, Nagpur), causing deep resentment among royal courts.</li>
</ol>`
      },
      {
        id: 'raj_l2',
        type: 'long',
        prompt: 'Describe the major events of the Revolt of 1857, from its beginning at Barrackpore and Meerut to its spread, and mention the changes introduced by the British after the Revolt.',
        blueprintTitle: '1857 Timeline & Constitutional Shift',
        pillars: [
          {
            id: 'p1',
            title: 'Outbreak: Barrackpore & Meerut',
            prompt: 'Explain Mangal Pandey\'s shot and the Meerut march.',
            keywords: ['barrackpore', 'mangal pandey', 'meerut', '10 may 1857', 'marched to delhi', 'bahadur shah zafar']
          },
          {
            id: 'p2',
            title: 'Spread Across Northern India',
            prompt: 'Name prominent leaders and their centers.',
            keywords: ['rani lakshmibai', 'jhansi', 'nana sahib', 'tatya tope', 'kanpur', 'begum hazrat mahal', 'lucknow', 'kunwar singh']
          },
          {
            id: 'p3',
            title: 'Post-Revolt British Reforms (1858)',
            prompt: 'What changed in how Britain governed India?',
            keywords: ['company rule ended', 'british crown', 'queen victoria', 'viceroy', 'doctrine of lapse abolished']
          }
        ],
        modelAnswer: `<strong>Major Events of the 1857 Revolt & Changes Introduced:</strong>
<ol>
  <li><strong>Beginning at Barrackpore & Meerut:</strong>
    <ul>
      <li>On 29 March 1857, Mangal Pandey refused to use greased cartridges and revolted at Barrackpore near Kolkata.</li>
      <li>On 10 May 1857, Indian soldiers at Meerut mutinied, broke open the prison to release fellow sepoys, and marched overnight to Delhi. They declared Mughal Emperor Bahadur Shah Zafar II as the symbolic leader of India.</li>
    </ul>
  </li>
  <li><strong>Spread Across India:</strong> The rebellion rapidly spread across northern and central India under fearless local leaders:
    <ul>
      <li><strong>Rani Lakshmibai</strong> fought bravely in Jhansi and Gwalior.</li>
      <li><strong>Nana Sahib and Tatya Tope</strong> led forces in Kanpur.</li>
      <li><strong>Begum Hazrat Mahal</strong> led the uprising in Lucknow (Awadh).</li>
      <li><strong>Kunwar Singh</strong> led the freedom struggle in Jagdishpur, Bihar.</li>
    </ul>
  </li>
  <li><strong>Changes Introduced After the Revolt:</strong>
    <ul>
      <li><strong>End of Company Rule:</strong> The British Parliament passed the Government of India Act 1858, dissolving the East India Company. Control of India was transferred directly to the <strong>British Crown (Queen Victoria)</strong>.</li>
      <li><strong>Appointment of Viceroy:</strong> The Governor-General was designated the <strong>Viceroy of India</strong> (Lord Canning became the first Viceroy).</li>
      <li><strong>Policy Changes:</strong> The Doctrine of Lapse was abolished, religious non-interference was pledged, and the Indian army was restructured to prevent future unified uprisings.</li>
    </ul>
  </li>
</ol>`
      }
    ]
  },

  // --------------------------------------------------------------------------
  // CHAPTER 4: L-20 OUR GOVERNMENT
  // --------------------------------------------------------------------------
  {
    id: 'ch20_government',
    number: 'L-20',
    title: 'Our Government',
    themeColor: '#3b82f6',
    icon: '🏛️',
    tag: 'Civics',
    summary: 'Master the three organs of democracy (Legislature, Executive, Judiciary), three levels of government, Lok Sabha vs Rajya Sabha, and the Supreme Court.',
    learnCards: [
      {
        title: 'The Three Organs of Government',
        icon: '⚖️',
        body: 'To run smoothly, the Government of India operates through three distinct organs:<ul><li><strong>Legislature (Law Making):</strong> Parliament (Lok Sabha + Rajya Sabha) frames laws for the nation.</li><li><strong>Executive (Law Enforcing):</strong> President, Prime Minister, and Council of Ministers put laws into action.</li><li><strong>Judiciary (Delivering Justice):</strong> Supreme Court and lower courts interpret laws and resolve disputes.</li></ul>'
      },
      {
        title: 'Three Levels of Government',
        icon: '🪜',
        body: 'India is a vast federal nation governed at three tiers:<ul><li><strong>Central (Union) Level:</strong> Governs entire nation on defense, foreign affairs, currency, railways. (Supreme Court; Prime Minister & President).</li><li><strong>State Level:</strong> Governs state police, health, and roads. (High Court; Chief Minister & Governor).</li><li><strong>Local Level:</strong> Solves neighborhood issues. Cities: Municipalities (Mayor); Villages: Gram Panchayats (Sarpanch/Pradhan).</li></ul>'
      },
      {
        title: 'Lok Sabha — House of the People',
        icon: '🗳️',
        body: 'The <strong>Lok Sabha</strong> (Lower House) is called the House of the People because its Members of Parliament (MPs) are <strong>directly elected</strong> by adult citizens (18 years and above) via secret ballot. Its tenure is <strong>5 years</strong>, and its meetings are presided over by the <strong>Speaker</strong>.'
      },
      {
        title: 'Rajya Sabha — Council of States',
        icon: '🏛️',
        body: 'The <strong>Rajya Sabha</strong> (Upper House) represents India\'s states. It is a <strong>permanent house</strong> that can never be dissolved. Members serve 6-year terms (with 1/3 retiring every two years). Members are elected <em>indirectly</em> by State MLAs, while 12 distinguished experts are nominated by the President. The <strong>Vice President of India</strong> is its ex-officio Chairman.'
      },
      {
        title: 'Head of State vs Head of Government',
        icon: '🇮🇳',
        body: 'Do not confuse these two roles!<ul><li><strong>President of India:</strong> The <em>Head of State</em>, first citizen of India, and Supreme Commander of the Armed Forces. Acts as constitutional guardian.</li><li><strong>Prime Minister of India:</strong> The <em>Head of Government</em>, who exercises actual executive power and leads the Union Cabinet.</li><li>At the state level, the <strong>Governor</strong> is the nominal head, while the <strong>Chief Minister</strong> is the executive head.</li></ul>'
      },
      {
        title: 'Supreme Court & Union Territories',
        icon: '🏛️',
        body: 'The <strong>Supreme Court of India</strong> in New Delhi is the apex court and guardian of the Constitution. It is presided over by the <strong>Chief Justice of India (CJI)</strong>. Areas administered directly by the Central Government through Administrators or Lieutenant Governors are called <strong>Union Territories</strong> (e.g. Chandigarh, Ladakh, Delhi).'
      }
    ],
    examTraps: [
      {
        trap: 'Saying the President is the Head of the Government.',
        truth: 'The President is the Head of the State! The Prime Minister is the Head of the Government.'
      },
      {
        trap: 'Confusing Lok Sabha with Rajya Sabha dissolution.',
        truth: 'Lok Sabha dissolves every 5 years; Rajya Sabha is a permanent house that never dissolves!'
      }
    ],
    practiceQuestions: [
      // Fill in Blanks
      {
        id: 'gov_b1',
        type: 'blank',
        prompt: 'The Lok Sabha is called the House of the People because its members are _______ elected by Indian citizens.',
        acceptableAnswers: ['directly'],
        hint: 'Citizens cast their votes directly for their MP.',
        explanation: 'Every Indian citizen aged 18 and older votes directly to elect members of the Lok Sabha.'
      },
      {
        id: 'gov_b2',
        type: 'blank',
        prompt: 'Name one territory administered directly by the Central Government: _______.',
        acceptableAnswers: ['chandigarh', 'delhi', 'ladakh', 'puducherry', 'andaman and nicobar islands', 'lakshadweep'],
        hint: 'A shared capital city between Punjab and Haryana, or Ladakh in the north.',
        explanation: 'Chandigarh is a Union Territory governed directly by the Central Government.'
      },
      {
        id: 'gov_b3',
        type: 'blank',
        prompt: 'In local governments, rural villages are governed by institutions like the Gram _______ or the Nyaya Panchayat.',
        acceptableAnswers: ['panchayat', 'gram panchayat'],
        hint: 'The grassroots council of five elders heading village affairs.',
        explanation: 'A Gram Panchayat manages sanitation, village schools, and street lights in rural areas.'
      },
      {
        id: 'gov_b4',
        type: 'blank',
        prompt: 'Name the democratic process of choosing a representative by voting: _______.',
        acceptableAnswers: ['election', 'elections', 'voting'],
        hint: 'Conducted every five years using Electronic Voting Machines (EVMs).',
        explanation: 'An election is the formal democratic decision-making process by which a population chooses an individual to hold public office.'
      },
      {
        id: 'gov_b5',
        type: 'blank',
        prompt: 'Who is the nominal constitutional head of each State in India? The _______.',
        acceptableAnswers: ['governor', 'the governor'],
        hint: 'Appointed by the President of India to represent the Center in each state.',
        explanation: 'The Governor is the nominal constitutional head of a State, while the Chief Minister heads the executive cabinet.'
      },
      {
        id: 'gov_b6',
        type: 'blank',
        prompt: 'Who is responsible to preside over the proceedings of the Supreme Court of India? The Chief _______ of India.',
        acceptableAnswers: ['justice', 'chief justice', 'justice of india', 'chief justice of india'],
        hint: 'The highest-ranking judicial officer in the republic.',
        explanation: 'The Chief Justice of India (CJI) heads the Supreme Court and the country’s judiciary.'
      },

      // True / False
      {
        id: 'gov_tf1',
        type: 'tf',
        prompt: 'The President is the head of the Government in India.',
        isTrue: false,
        correction: 'The President is the Head of the State; the Prime Minister is the Head of the Government.',
        explanation: 'In India’s parliamentary democracy, the President is the ceremonial Head of State, while the Prime Minister wields real executive authority.'
      },
      {
        id: 'gov_tf2',
        type: 'tf',
        prompt: 'The Supreme Court of India is situated in Mumbai.',
        isTrue: false,
        correction: 'The Supreme Court of India is situated in the national capital, New Delhi.',
        explanation: 'The apex court of India is located at Tilak Marg, New Delhi.'
      },
      {
        id: 'gov_tf3',
        type: 'tf',
        prompt: 'The Lok Sabha is a permanent house that can never be dissolved.',
        isTrue: false,
        correction: 'The Rajya Sabha is the permanent house; the Lok Sabha has a 5-year term and is dissolved before fresh general elections.',
        explanation: 'The Lok Sabha dissolves at the end of its 5-year tenure (or earlier), whereas the Rajya Sabha never dissolves.'
      },
      {
        id: 'gov_tf4',
        type: 'tf',
        prompt: 'Chandigarh is administered directly by the Central Government as a Union Territory.',
        isTrue: true,
        explanation: 'Union Territories like Chandigarh are administered directly by the President/Central Government through an appointed administrator.'
      },

      // Match the Following
      {
        id: 'gov_m1',
        type: 'match',
        prompt: 'Match the Level of Government with its Judiciary and Executive Leaders:',
        pairs: [
          { left: 'Central Judiciary', right: 'Supreme Court of India' },
          { left: 'State Judiciary', right: 'High Court' },
          { left: 'Central Real Executive Head', right: 'Prime Minister of India' },
          { left: 'State Nominal Head', right: 'Governor' }
        ]
      },
      {
        id: 'gov_m2',
        type: 'match',
        prompt: 'Match Parliamentary Features with the correct house (Lok Sabha vs Rajya Sabha):',
        pairs: [
          { left: 'House of the People', right: 'Lok Sabha (Directly elected)' },
          { left: 'Council of States', right: 'Rajya Sabha (Permanent house)' },
          { left: 'Presided by Speaker', right: 'Lok Sabha' },
          { left: 'Presided by Vice President', right: 'Rajya Sabha' }
        ]
      },

      // Short Answer Questions
      {
        id: 'gov_s1',
        type: 'short',
        prompt: 'The Lok Sabha is called the House of the People. Give two reasons why.',
        thinkingClue: '💡 Think About It: Who votes for its MPs, and who do they represent?',
        keyPoints: [
          'Its members (MPs) are directly voted and elected by the citizens of India aged 18 and above.',
          'It directly represents the voice, aspirations, and sovereignty of the Indian people in Parliament.'
        ]
      },
      {
        id: 'gov_s2',
        type: 'short',
        prompt: 'Explain the significance of the Supreme Court of India and state who presides over it.',
        thinkingClue: '💡 Think About It: Where is it located, what does it protect, and who is the top judge?',
        keyPoints: [
          'It is situated in New Delhi and acts as the apex court and guardian of the Constitution and Fundamental Rights.',
          'The Chief Justice of India (CJI) presides over its judicial proceedings.'
        ]
      },
      {
        id: 'gov_s3',
        type: 'short',
        prompt: 'Do you agree that the structure and functions of State Governments are exactly the same as those of the Central Government? Give reasons.',
        thinkingClue: '💡 Think About It: The structure is similar (Legislature, Executive, Judiciary), but their jurisdiction and subject areas differ!',
        keyPoints: [
          'Similar in structure: Both feature a Legislature, Executive (Governor/CM vs President/PM), and Judiciary (High Court vs Supreme Court).',
          'Different in functions: Central Government oversees national issues (Defense, Foreign Affairs), while State Governments manage regional matters (Police, Public Health, Agriculture).'
        ]
      },

      // Long Answer Scaffold Studio
      {
        id: 'gov_l1',
        type: 'long',
        prompt: 'Complete the table and explain the three levels of government in India (Central, State, and Local) along with their judiciary and executive heads.',
        blueprintTitle: 'Structure of Indian Government Table & Blueprint',
        pillars: [
          {
            id: 'p1',
            title: 'Central / Union Government Tier',
            prompt: 'Identify the judicial body and head of executive at the national level.',
            keywords: ['central', 'supreme court', 'prime minister', 'president', 'head of state', 'head of government']
          },
          {
            id: 'p2',
            title: 'State Government Tier',
            prompt: 'Identify the judicial body and head of executive at the state level.',
            keywords: ['state', 'high court', 'chief minister', 'governor', 'nominal head', 'executive']
          },
          {
            id: 'p3',
            title: 'Local Self-Government Tier',
            prompt: 'Identify municipal and village institutions and their leaders.',
            keywords: ['local', 'district court', 'gram panchayat', 'mayor', 'sarpanch', 'panchayat pradhan', 'municipal corporation']
          }
        ],
        modelAnswer: `<strong>The Three Levels of Government in India:</strong>

<table style="width:100%; border-collapse:collapse; margin: 12px 0;">
  <tr style="background:rgba(255,255,255,0.06); text-align:left;">
    <th style="padding:8px; border:1px solid #475569;">Level of Government</th>
    <th style="padding:8px; border:1px solid #475569;">Judiciary</th>
    <th style="padding:8px; border:1px solid #475569;">Head of Executive</th>
  </tr>
  <tr>
    <td style="padding:8px; border:1px solid #475569;"><strong>Central Government</strong></td>
    <td style="padding:8px; border:1px solid #475569;">Supreme Court of India</td>
    <td style="padding:8px; border:1px solid #475569;">Prime Minister (Real) / President (Head of State)</td>
  </tr>
  <tr>
    <td style="padding:8px; border:1px solid #475569;"><strong>State Government</strong></td>
    <td style="padding:8px; border:1px solid #475569;">High Court</td>
    <td style="padding:8px; border:1px solid #475569;">Chief Minister (Real) / Governor (Nominal)</td>
  </tr>
  <tr>
    <td style="padding:8px; border:1px solid #475569;"><strong>Local Government</strong></td>
    <td style="padding:8px; border:1px solid #475569;">District Courts / Nyaya Panchayat</td>
    <td style="padding:8px; border:1px solid #475569;">Mayor (Urban) / Panchayat Pradhan or Sarpanch (Rural)</td>
  </tr>
</table>

<ol>
  <li><strong>Central Government:</strong> Responsible for matters of national importance such as national defense, railways, foreign policy, and currency. The Supreme Court in New Delhi is its highest court.</li>
  <li><strong>State Government:</strong> Operates within state borders handling state subjects like law and order, police, health, and agriculture. The High Court is the highest judicial authority within the state.</li>
  <li><strong>Local Government:</strong> Grassroots administration solving day-to-day neighborhood issues. Urban areas are governed by Municipal Corporations (led by a Mayor), while villages are governed by Gram Panchayats (led by a Sarpanch/Pradhan).</li>
</ol>`
      },
      {
        id: 'gov_l2',
        type: 'long',
        prompt: 'Differentiate between Rajya Sabha and Lok Sabha on the basis of election method, tenure, dissolution, and presiding officer.',
        blueprintTitle: 'Lok Sabha vs Rajya Sabha Comparison Matrix',
        pillars: [
          {
            id: 'p1',
            title: 'Election Method & Composition',
            prompt: 'How are MPs chosen for each house?',
            keywords: ['lok sabha', 'rajya sabha', 'directly elected', 'citizens 18 years', 'indirectly elected', 'mlas', 'president nominates 12']
          },
          {
            id: 'p2',
            title: 'Tenure & Dissolution',
            prompt: 'How long do members serve and can the house dissolve?',
            keywords: ['5 years', 'term', 'permanent house', 'never dissolves', '1/3 members retire', 'every 2 years']
          },
          {
            id: 'p3',
            title: 'Presiding Officers',
            prompt: 'Who chairs the meetings in each house?',
            keywords: ['speaker', 'lok sabha speaker', 'vice president', 'chairman of rajya sabha']
          }
        ],
        modelAnswer: `<strong>Differences Between Lok Sabha and Rajya Sabha:</strong>

<ol>
  <li><strong>Meaning & Role:</strong>
    <ul>
      <li><strong>Lok Sabha:</strong> The "House of the People" (Lower House). Represents the collective citizens of India.</li>
      <li><strong>Rajya Sabha:</strong> The "Council of States" (Upper House). Represents India's federal states and Union Territories.</li>
    </ul>
  </li>
  <li><strong>Election Method:</strong>
    <ul>
      <li><strong>Lok Sabha:</strong> Members are <strong>directly elected</strong> by citizens aged 18 and older through universal adult franchise.</li>
      <li><strong>Rajya Sabha:</strong> Members are <strong>indirectly elected</strong> by elected members of State Legislative Assemblies (MLAs). 12 members are nominated by the President for excellence in literature, science, art, and social service.</li>
    </ul>
  </li>
  <li><strong>Tenure & Dissolution:</strong>
    <ul>
      <li><strong>Lok Sabha:</strong> Elected for a term of <strong>5 years</strong>. It can be dissolved before completing its term by the President.</li>
      <li><strong>Rajya Sabha:</strong> A <strong>permanent house</strong> that can never be dissolved. Each member serves for 6 years, with one-third of the members retiring every 2 years.</li>
    </ul>
  </li>
  <li><strong>Presiding Officer:</strong>
    <ul>
      <li><strong>Lok Sabha:</strong> Presided over by the <strong>Speaker</strong>, elected by its own members.</li>
      <li><strong>Rajya Sabha:</strong> Presided over by the <strong>Vice President of India</strong>, who is the ex-officio Chairman.</li>
    </ul>
  </li>
</ol>`
      }
    ]
  }
];

// ==================== NATIVE AUDIO SYNTHESIZER ====================
class SoundFX {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }
  playTone(freq, duration, type = 'sine', gainVal = 0.12) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio feedback failed:', e);
    }
  }
  correct() {
    this.playTone(523.25, 0.12, 'triangle', 0.15); // C5
    setTimeout(() => this.playTone(659.25, 0.22, 'triangle', 0.18), 100); // E5
  }
  wrong() {
    this.playTone(220, 0.2, 'sawtooth', 0.1);
    setTimeout(() => this.playTone(180, 0.25, 'sawtooth', 0.12), 120);
  }
  click() {
    this.playTone(400, 0.04, 'sine', 0.05);
  }
  complete() {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.2, 'triangle', 0.15), idx * 120);
    });
  }
}
const sfx = new SoundFX();

// ==================== CANVAS CONFETTI SYSTEM ====================
class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animId = null;
    this.colors = ['#f59e0b', '#10b981', '#38bdf8', '#f43f5e', '#a855f7', '#fbbf24'];
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  resize() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }
  blast() {
    if (!this.canvas) return;
    this.particles = [];
    for (let i = 0; i < 90; i++) {
      this.particles.push({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 8 + 4,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.35,
        alpha: 1
      });
    }
    if (this.animId) cancelAnimationFrame(this.animId);
    this.loop();
  }
  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let activeCount = 0;
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rSpeed;
      p.alpha -= 0.012;
      if (p.alpha > 0) {
        activeCount++;
        this.ctx.save();
        this.ctx.globalAlpha = Math.max(p.alpha, 0);
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        this.ctx.restore();
      }
    });
    if (activeCount > 0) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// ==================== APP STATE MACHINE ====================
class SSTApp {
  constructor() {
    this.activeChapterId = 'ch5_drc';
    this.activeMode = 'learn'; // 'learn' | 'practice' | 'challenge' | 'worksheet'
    this.activePracticeFilter = 'all'; // 'all' | 'blank' | 'tf' | 'match' | 'short' | 'long'
    
    // In-progress Practice Session
    this.practiceIndex = 0;
    this.practiceAnswered = {}; // { qId: { answered: bool, correct: bool, studentAnswer: str, revealed: bool } }
    this.practiceScore = { correct: 0, incorrect: 0 };
    this.studentDrafts = {}; // { qId: text }

    // Match interaction state
    this.matchSelectedLeft = null;
    this.matchedPairs = {}; // { qId: [leftId, ...] }

    // 60s Challenge State
    this.challengeTimer = null;
    this.challengeTimeLeft = 60;
    this.challengeScore = 0;
    this.challengeIndex = 0;
    this.challengeQuestions = [];

    // Confetti
    this.confetti = new ConfettiEngine('confetti-canvas');
  }

  init() {
    this.loadActiveState();
    this.renderSidebar();
    this.bindGlobalEvents();
    this.switchChapter(this.activeChapterId, false);
    this.setMode(this.activeMode, false);
    this.updateProgressHUD();
  }

  // ==================== STATE PERSISTENCE ====================
  saveActiveState() {
    try {
      const stateObj = {
        activeChapterId: this.activeChapterId,
        activeMode: this.activeMode,
        activePracticeFilter: this.activePracticeFilter,
        practiceIndex: this.practiceIndex,
        practiceAnswered: this.practiceAnswered,
        practiceScore: this.practiceScore,
        studentDrafts: this.studentDrafts
      };
      localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(stateObj));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  loadActiveState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_STATE);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.activeChapterId && CHAPTERS_DATA.some(c => c.id === parsed.activeChapterId)) {
          this.activeChapterId = parsed.activeChapterId;
        }
        if (['learn', 'practice', 'challenge', 'worksheet'].includes(parsed.activeMode)) {
          this.activeMode = parsed.activeMode;
        }
        if (parsed.activePracticeFilter) {
          this.activePracticeFilter = parsed.activePracticeFilter;
        }
        if (typeof parsed.practiceIndex === 'number') {
          this.practiceIndex = parsed.practiceIndex;
        }
        if (parsed.practiceAnswered) this.practiceAnswered = parsed.practiceAnswered;
        if (parsed.practiceScore) this.practiceScore = parsed.practiceScore;
        if (parsed.studentDrafts) this.studentDrafts = parsed.studentDrafts;
      }
    } catch (e) {
      console.warn('LocalStorage load failed:', e);
    }
  }

  getChapterStars(chapterId) {
    try {
      return parseInt(localStorage.getItem(STORAGE_KEY_STARS_PREFIX + chapterId) || '0', 10);
    } catch (e) {
      return 0;
    }
  }

  setChapterStars(chapterId, stars) {
    try {
      const cur = this.getChapterStars(chapterId);
      if (stars > cur) {
        localStorage.setItem(STORAGE_KEY_STARS_PREFIX + chapterId, stars.toString());
      }
    } catch (e) {
      console.warn(e);
    }
  }

  // ==================== SIDEBAR & NAVIGATION ====================
  renderSidebar() {
    const listEl = document.getElementById('sidebar-topics');
    if (!listEl) return;
    listEl.innerHTML = '';

    CHAPTERS_DATA.forEach(chap => {
      const stars = this.getChapterStars(chap.id);
      const starStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

      const item = document.createElement('div');
      item.className = `topic-item ${chap.id === this.activeChapterId ? 'active' : ''}`;
      item.dataset.chapterId = chap.id;
      item.innerHTML = `
        <div class="topic-item-header">
          <span class="topic-icon">${chap.icon}</span>
          <span class="topic-title">${chap.number}: ${chap.title}</span>
        </div>
        <p class="topic-desc">${chap.summary}</p>
        <div class="topic-meta">
          <span class="badge badge-active">${chap.tag}</span>
          <span class="topic-stars" title="${stars} Stars">${starStr}</span>
        </div>
      `;
      item.addEventListener('click', () => {
        sfx.click();
        this.switchChapter(chap.id);
        this.closeSidebar();
      });
      listEl.appendChild(item);
    });
  }

  switchChapter(chapterId, shouldSave = true) {
    this.activeChapterId = chapterId;
    const chap = CHAPTERS_DATA.find(c => c.id === chapterId) || CHAPTERS_DATA[0];

    // Update Topbar
    const titleEl = document.getElementById('top-bar-title');
    const subEl = document.getElementById('top-bar-subtitle');
    if (titleEl) titleEl.textContent = `${chap.number} — ${chap.title}`;
    if (subEl) subEl.textContent = chap.summary;

    // Update Sidebar Active state
    document.querySelectorAll('.topic-item').forEach(el => {
      el.classList.toggle('active', el.dataset.chapterId === chapterId);
    });

    // Reset index if switching chapters and not stored
    if (shouldSave) {
      this.practiceIndex = 0;
      this.saveActiveState();
    }

    this.renderCurrentMode();
    this.updateProgressHUD();
  }

  setMode(mode, shouldSave = true) {
    this.activeMode = mode;
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });
    if (shouldSave) this.saveActiveState();
    this.renderCurrentMode();
  }

  bindGlobalEvents() {
    // Mobile Drawer Open / Close
    const menuBtn = document.getElementById('menu-toggle-btn');
    const closeBtn = document.getElementById('sidebar-close-btn');
    const backdrop = document.getElementById('sidebar-backdrop');
    const sidebar = document.getElementById('sidebar');

    if (menuBtn && sidebar && backdrop) {
      menuBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        backdrop.classList.add('active');
      });
    }
    if (closeBtn && sidebar && backdrop) {
      closeBtn.addEventListener('click', () => this.closeSidebar());
    }
    if (backdrop && sidebar) {
      backdrop.addEventListener('click', () => this.closeSidebar());
    }

    // Mode Tabs
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.addEventListener('click', e => {
        sfx.click();
        const mode = tab.dataset.mode;
        this.setMode(mode);
      });
    });

    // Top Bar Reset button
    const resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('🔄 Restart practice session for this chapter from Question 1?')) {
          this.practiceIndex = 0;
          this.practiceAnswered = {};
          this.practiceScore = { correct: 0, incorrect: 0 };
          this.studentDrafts = {};
          this.saveActiveState();
          this.renderCurrentMode();
          sfx.click();
        }
      });
    }

    // Print Button
    const printBtn = document.getElementById('btn-print');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        this.setMode('worksheet');
        setTimeout(() => window.print(), 300);
      });
    }
  }

  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  }

  updateProgressHUD() {
    let totalStars = 0;
    CHAPTERS_DATA.forEach(c => {
      totalStars += this.getChapterStars(c.id);
    });
    const maxStars = CHAPTERS_DATA.length * 3;
    const fillEl = document.getElementById('progress-fill');
    const labelEl = document.getElementById('progress-label');
    if (fillEl) {
      fillEl.style.width = `${Math.round((totalStars / maxStars) * 100)}%`;
    }
    if (labelEl) {
      labelEl.textContent = `${totalStars} / ${maxStars} Stars Earned`;
    }
  }

  // ==================== DISPATCH RENDERER ====================
  renderCurrentMode() {
    const container = document.getElementById('content-viewport');
    if (!container) return;
    container.innerHTML = '';

    switch (this.activeMode) {
      case 'learn':
        this.renderLearnMode(container);
        break;
      case 'practice':
        this.renderPracticeMode(container);
        break;
      case 'challenge':
        this.renderChallengeMode(container);
        break;
      case 'worksheet':
        this.renderWorksheetMode(container);
        break;
      default:
        this.renderLearnMode(container);
    }
  }

  // ==========================================================
  // MODE 1: LEARN & EXPLORE
  // ==========================================================
  renderLearnMode(container) {
    if (!container) container = document.getElementById('content-viewport');
    if (!container) return;
    container.innerHTML = '';
    const chap = CHAPTERS_DATA.find(c => c.id === this.activeChapterId) || CHAPTERS_DATA[0];

    const wrap = document.createElement('div');
    wrap.className = 'learn-container';

    // Hero banner
    wrap.innerHTML = `
      <div class="chapter-hero-banner" style="border-left: 6px solid ${chap.themeColor};">
        <div class="chapter-hero-icon">${chap.icon}</div>
        <div class="chapter-hero-info">
          <h2>${chap.number}: ${chap.title}</h2>
          <p>${chap.summary}</p>
        </div>
      </div>

      <!-- Thinking Pillars Strip -->
      <div class="thinking-pillars-strip">
        <div class="pillar-card">
          <div class="pillar-icon">🧠</div>
          <div>
            <h4>Thinking & Deduction</h4>
            <p>Reason out causes rather than memorising dry lines.</p>
          </div>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon">💡</div>
          <div>
            <h4>Metacognitive Prompts</h4>
            <p>Guided self-talk before every question.</p>
          </div>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon">🧩</div>
          <div>
            <h4>Scaffold Studio</h4>
            <p>Break 5-mark long answers into easy bite-sized chunks.</p>
          </div>
        </div>
      </div>
    `;

    // Special Visual Feature for Rainforest Layers if DRC
    if (chap.id === 'ch5_drc') {
      const diag = document.createElement('div');
      diag.className = 'visual-diagram-card';
      diag.innerHTML = `
        <div class="diagram-title">🌲 3-Storey Rainforest Architectural Diagram</div>
        <div class="rainforest-layers-box">
          <div class="rf-layer rf-layer-emergent">
            <div class="rf-layer-text">
              <h4>1. Emergent Layer</h4>
              <p>Giant tall trees (40–50 m) piercing the canopy to grab direct sunlight and air currents.</p>
            </div>
            <div class="rf-layer-height">Top 40–50+ m</div>
          </div>
          <div class="rf-layer rf-layer-canopy">
            <div class="rf-layer-text">
              <h4>2. Canopy Layer</h4>
              <p>Thick, continuous umbrella roof formed by interlaced leaves; traps humidity & blocks sun.</p>
            </div>
            <div class="rf-layer-height">Mid 20–35 m</div>
          </div>
          <div class="rf-layer rf-layer-understory">
            <div class="rf-layer-text">
              <h4>3. Understory & Forest Floor</h4>
              <p>Dark, humid underworld with < 2% light; home to ferns, decomposing fungi, and shrubs.</p>
            </div>
            <div class="rf-layer-height">Ground 0–5 m</div>
          </div>
        </div>
      `;
      wrap.appendChild(diag);
    }

    // Special Visual Table for Government Structure if L-20
    if (chap.id === 'ch20_government') {
      const diag = document.createElement('div');
      diag.className = 'visual-diagram-card';
      diag.innerHTML = `
        <div class="diagram-title">🏛️ Three Tiers & Three Organs of Indian Governance</div>
        <div class="gov-table-wrapper">
          <table class="gov-table">
            <thead>
              <tr>
                <th>Tier / Level</th>
                <th>Legislative (Law Making)</th>
                <th>Judiciary (Justice)</th>
                <th>Executive Head</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Central Level</strong></td>
                <td>Parliament (Lok Sabha + Rajya Sabha)</td>
                <td>Supreme Court (New Delhi)</td>
                <td>Prime Minister (Real) / President (State)</td>
              </tr>
              <tr>
                <td><strong>State Level</strong></td>
                <td>State Legislative Assembly (Vidhan Sabha)</td>
                <td>High Court</td>
                <td>Chief Minister (Real) / Governor (Nominal)</td>
              </tr>
              <tr>
                <td><strong>Local Level</strong></td>
                <td>Municipalities (Urban) / Gram Sabha (Rural)</td>
                <td>District Courts / Nyaya Panchayat</td>
                <td>Mayor (Cities) / Sarpanch (Villages)</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      wrap.appendChild(diag);
    }

    // Key Concept Grid
    const grid = document.createElement('div');
    grid.className = 'concept-grid';

    chap.learnCards.forEach(c => {
      const card = document.createElement('div');
      card.className = 'concept-card';
      card.innerHTML = `
        <div class="concept-card-header">
          <span class="concept-card-icon">${c.icon}</span>
          <h3 class="concept-card-title">${c.title}</h3>
        </div>
        <div class="concept-card-body">${c.body}</div>
      `;
      grid.appendChild(card);
    });
    wrap.appendChild(grid);

    // Spot the Exam Trap Section
    if (chap.examTraps && chap.examTraps.length > 0) {
      chap.examTraps.forEach(trap => {
        const trapCard = document.createElement('div');
        trapCard.className = 'trap-card';
        trapCard.innerHTML = `
          <div class="trap-card-icon">🚨</div>
          <div class="trap-card-content">
            <h3>Spot the Exam Trap: ${trap.trap}</h3>
            <p><strong>Examiner\'s Truth:</strong> ${trap.truth}</p>
          </div>
        `;
        wrap.appendChild(trapCard);
      });
    }

    // Call to Action to Practice
    const cta = document.createElement('div');
    cta.style.textAlign = 'center';
    cta.style.marginTop = '16px';
    cta.innerHTML = `
      <button class="btn btn-primary" style="font-size: 1.05rem; padding: 12px 28px;">
        🧩 Ready to Practice Chapter Questions →
      </button>
    `;
    cta.querySelector('button').addEventListener('click', () => {
      sfx.click();
      this.setMode('practice');
    });
    wrap.appendChild(cta);

    container.appendChild(wrap);
  }

  // ==========================================================
  // MODE 2: PRACTICE & SOLVE
  // ==========================================================
  renderPracticeMode(container) {
    if (!container) container = document.getElementById('content-viewport');
    if (!container) return;
    container.innerHTML = '';
    const chap = CHAPTERS_DATA.find(c => c.id === this.activeChapterId) || CHAPTERS_DATA[0];
    const allQuestions = chap.practiceQuestions || [];

    // Filter questions based on filter chip
    let filteredQuestions = allQuestions;
    if (this.activePracticeFilter !== 'all') {
      filteredQuestions = allQuestions.filter(q => q.type === this.activePracticeFilter);
    }
    if (filteredQuestions.length === 0) {
      filteredQuestions = allQuestions;
    }

    // Ensure index bounds
    if (this.practiceIndex >= filteredQuestions.length) {
      this.practiceIndex = 0;
    }
    const currentQ = filteredQuestions[this.practiceIndex];

    const wrap = document.createElement('div');
    wrap.className = 'practice-container';

    // 1. Filter Chips Row
    const filterRow = document.createElement('div');
    filterRow.className = 'filter-bar';
    const filters = [
      { id: 'all', label: `✨ All (${allQuestions.length})` },
      { id: 'blank', label: `✏️ Blanks` },
      { id: 'tf', label: `⚖️ True/False` },
      { id: 'match', label: `🔗 Match` },
      { id: 'short', label: `💬 Short Qs` },
      { id: 'long', label: `🏗️ Long Answer Scaffolder` }
    ];

    filters.forEach(f => {
      const chip = document.createElement('button');
      chip.className = `filter-chip ${this.activePracticeFilter === f.id ? 'active' : ''}`;
      chip.textContent = f.label;
      chip.addEventListener('click', () => {
        sfx.click();
        this.activePracticeFilter = f.id;
        this.practiceIndex = 0;
        this.saveActiveState();
        this.renderPracticeMode(container);
      });
      filterRow.appendChild(chip);
    });
    wrap.appendChild(filterRow);

    // 2. Practice Stats Bar
    const statsBar = document.createElement('div');
    statsBar.className = 'practice-header-card';
    statsBar.innerHTML = `
      <div class="practice-progress-info">
        <span class="question-count-badge">Question ${this.practiceIndex + 1} of ${filteredQuestions.length}</span>
        <span class="practice-score-tally">
          Score: <span class="score-correct">${this.practiceScore.correct}</span> Correct | 
          <span class="score-incorrect">${this.practiceScore.incorrect}</span> Incorrect
        </span>
      </div>
      <div class="practice-actions-row">
        <button class="btn btn-secondary btn-sm" id="btn-practice-restart">🔄 Restart Drill</button>
      </div>
    `;
    statsBar.querySelector('#btn-practice-restart').addEventListener('click', () => {
      this.practiceIndex = 0;
      this.practiceAnswered = {};
      this.practiceScore = { correct: 0, incorrect: 0 };
      this.studentDrafts = {};
      this.saveActiveState();
      this.renderPracticeMode(container);
      sfx.click();
    });
    wrap.appendChild(statsBar);

    // 3. Render Specific Question Card
    const qCard = document.createElement('div');
    qCard.className = 'question-card';

    // Header with type badge
    const qHeader = document.createElement('div');
    qHeader.className = 'question-header';
    const typeNames = {
      blank: 'Fill in the Blank',
      tf: 'True / False Reasoning',
      match: 'Match the Following',
      short: 'Short Conceptual Answer (2 Marks)',
      long: 'Long Answer Chunk & Conquer Studio (5 Marks)'
    };
    qHeader.innerHTML = `
      <span class="question-type-badge">${typeNames[currentQ.type] || 'Practice'}</span>
      <span class="thinking-prompt-pill">💡 CBSE Class 5</span>
    `;
    qCard.appendChild(qHeader);

    // Prompt
    const qPrompt = document.createElement('h3');
    qPrompt.className = 'question-prompt';
    qPrompt.textContent = currentQ.prompt;
    qCard.appendChild(qPrompt);

    // Interaction Body depending on type
    const interactionBody = document.createElement('div');
    interactionBody.className = 'question-interactive-body';

    const qState = this.practiceAnswered[currentQ.id] || { answered: false, correct: false };

    switch (currentQ.type) {
      case 'blank':
        this.renderBlankInteraction(interactionBody, currentQ, qState, () => this.renderPracticeMode(container));
        break;
      case 'tf':
        this.renderTFInteraction(interactionBody, currentQ, qState, () => this.renderPracticeMode(container));
        break;
      case 'match':
        this.renderMatchInteraction(interactionBody, currentQ, qState, () => this.renderPracticeMode(container));
        break;
      case 'short':
        this.renderShortInteraction(interactionBody, currentQ, qState, () => this.renderPracticeMode(container));
        break;
      case 'long':
        this.renderLongScaffoldInteraction(interactionBody, currentQ, qState, () => this.renderPracticeMode(container));
        break;
    }
    qCard.appendChild(interactionBody);

    // Explanation / Feedback Card if answered or revealed
    if (qState.answered || qState.revealed) {
      const exp = document.createElement('div');
      exp.className = 'explanation-card';
      exp.innerHTML = `
        <h4>${qState.correct ? '✅ Conceptual Victory!' : '💡 Conceptual Explanation:'}</h4>
        <p>${currentQ.explanation || (currentQ.keyPoints ? currentQ.keyPoints.join(' ') : '')}</p>
      `;
      qCard.appendChild(exp);
    }

    // Navigation Buttons Row (Prev / Next)
    const navRow = document.createElement('div');
    navRow.className = 'question-nav-row';
    navRow.innerHTML = `
      <button class="btn btn-secondary" id="btn-prev-q" ${this.practiceIndex === 0 ? 'disabled' : ''}>
        ← Previous
      </button>
      <button class="btn btn-primary" id="btn-next-q">
        ${this.practiceIndex + 1 === filteredQuestions.length ? '🏁 Complete Drill' : 'Next Question →'}
      </button>
    `;

    navRow.querySelector('#btn-prev-q').addEventListener('click', () => {
      if (this.practiceIndex > 0) {
        sfx.click();
        this.practiceIndex--;
        this.saveActiveState();
        this.renderPracticeMode(container);
      }
    });

    navRow.querySelector('#btn-next-q').addEventListener('click', () => {
      sfx.click();
      if (this.practiceIndex + 1 < filteredQuestions.length) {
        this.practiceIndex++;
        this.saveActiveState();
        this.renderPracticeMode(container);
      } else {
        // Complete Drill
        this.showResultsModal(chap, filteredQuestions.length);
      }
    });

    qCard.appendChild(navRow);
    wrap.appendChild(qCard);
    container.appendChild(wrap);
  }

  // ==================== INTERACTION RENDERERS ====================

  // A. Fill in Blank
  renderBlankInteraction(container, question, qState, rerender) {
    const row = document.createElement('div');
    row.className = 'blank-input-row';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'blank-input';
    input.placeholder = 'Type your answer here...';
    input.value = qState.studentAnswer || '';
    if (qState.answered) {
      input.disabled = true;
      input.style.borderColor = qState.correct ? 'var(--color-success)' : 'var(--color-error)';
    }

    const checkBtn = document.createElement('button');
    checkBtn.className = 'btn btn-primary';
    checkBtn.textContent = 'Check Answer';
    if (qState.answered) checkBtn.disabled = true;

    const feedbackText = document.createElement('div');
    feedbackText.style.fontSize = '0.9rem';
    feedbackText.style.marginTop = '8px';

    const checkAnswer = () => {
      const val = input.value.trim().toLowerCase();
      if (!val) return;
      const isCorrect = question.acceptableAnswers.some(ans => val.includes(ans.toLowerCase()) || ans.toLowerCase().includes(val));

      if (isCorrect) {
        sfx.correct();
        this.flashFeedback('correct');
        this.practiceScore.correct++;
      } else {
        sfx.wrong();
        this.flashFeedback('wrong');
        this.practiceScore.incorrect++;
      }

      this.practiceAnswered[question.id] = {
        answered: true,
        correct: isCorrect,
        studentAnswer: input.value.trim()
      };
      this.saveActiveState();
      rerender();
    };

    checkBtn.addEventListener('click', checkAnswer);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') checkAnswer();
    });

    row.appendChild(input);
    row.appendChild(checkBtn);
    container.appendChild(row);

    // Hint toggle if not answered
    if (!qState.answered && question.hint) {
      const hintBtn = document.createElement('button');
      hintBtn.className = 'btn btn-ghost btn-sm';
      hintBtn.style.marginTop = '8px';
      hintBtn.textContent = '💡 Show Hint';
      hintBtn.addEventListener('click', () => {
        hintBtn.textContent = `💡 Hint: ${question.hint}`;
      });
      container.appendChild(hintBtn);
    }
  }

  // B. True / False
  renderTFInteraction(container, question, qState, rerender) {
    const row = document.createElement('div');
    row.className = 'tf-buttons-row';

    const btnTrue = document.createElement('button');
    btnTrue.className = `btn-tf ${qState.studentAnswer === 'true' ? (question.isTrue ? 'selected-true' : 'selected-false') : ''}`;
    btnTrue.innerHTML = `<span>👍</span> <span>True</span>`;

    const btnFalse = document.createElement('button');
    btnFalse.className = `btn-tf ${qState.studentAnswer === 'false' ? (!question.isTrue ? 'selected-true' : 'selected-false') : ''}`;
    btnFalse.innerHTML = `<span>👎</span> <span>False</span>`;

    if (qState.answered) {
      btnTrue.disabled = true;
      btnFalse.disabled = true;
    }

    const selectChoice = choiceBool => {
      const isCorrect = choiceBool === question.isTrue;
      if (isCorrect) {
        sfx.correct();
        this.flashFeedback('correct');
        this.practiceScore.correct++;
      } else {
        sfx.wrong();
        this.flashFeedback('wrong');
        this.practiceScore.incorrect++;
      }

      this.practiceAnswered[question.id] = {
        answered: true,
        correct: isCorrect,
        studentAnswer: choiceBool ? 'true' : 'false'
      };
      this.saveActiveState();
      rerender();
    };

    btnTrue.addEventListener('click', () => selectChoice(true));
    btnFalse.addEventListener('click', () => selectChoice(false));

    row.appendChild(btnTrue);
    row.appendChild(btnFalse);
    container.appendChild(row);

    // If false and answered, highlight the student correction
    if (qState.answered && question.correction) {
      const corrBox = document.createElement('div');
      corrBox.style.marginTop = '12px';
      corrBox.style.padding = '12px 16px';
      corrBox.style.borderRadius = 'var(--radius-sm)';
      corrBox.style.background = 'rgba(245, 158, 11, 0.1)';
      corrBox.style.border = '1px solid rgba(245, 158, 11, 0.3)';
      corrBox.innerHTML = `<strong>📝 Correction Required in Exam:</strong> ${question.correction}`;
      container.appendChild(corrBox);
    }
  }

  // C. Match the Following
  renderMatchInteraction(container, question, qState, rerender) {
    const matchWrap = document.createElement('div');
    matchWrap.className = 'match-interactive-container';

    if (!this.matchedPairs[question.id]) {
      this.matchedPairs[question.id] = [];
    }
    const matchedList = this.matchedPairs[question.id];

    // Left Column
    const leftCol = document.createElement('div');
    leftCol.className = 'match-column';
    leftCol.innerHTML = `<div class="match-col-header">Column A (Tap an item)</div>`;

    question.pairs.forEach((p, idx) => {
      const isMatched = matchedList.includes(idx);
      const isSelected = this.matchSelectedLeft === idx;
      const item = document.createElement('div');
      item.className = `match-item ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}`;
      item.innerHTML = `<span>${p.left}</span> <span>${isMatched ? '✅' : '👉'}</span>`;

      if (!isMatched) {
        item.addEventListener('click', () => {
          sfx.click();
          this.matchSelectedLeft = idx;
          rerender();
        });
      }
      leftCol.appendChild(item);
    });

    // Right Column (Shuffled order)
    const rightCol = document.createElement('div');
    rightCol.className = 'match-column';
    rightCol.innerHTML = `<div class="match-col-header">Column B (Match with selected)</div>`;

    // Static shuffle based on question id
    const indices = question.pairs.map((_, i) => i).reverse();

    indices.forEach(targetIdx => {
      const p = question.pairs[targetIdx];
      const isMatched = matchedList.includes(targetIdx);
      const item = document.createElement('div');
      item.className = `match-item ${isMatched ? 'matched' : ''}`;
      item.innerHTML = `<span>${p.right}</span> <span>${isMatched ? '✅' : '🎯'}</span>`;

      if (!isMatched) {
        item.addEventListener('click', () => {
          if (this.matchSelectedLeft === null) {
            alert('Please select an item from Column A first!');
            return;
          }
          if (this.matchSelectedLeft === targetIdx) {
            // Correct match
            sfx.correct();
            matchedList.push(targetIdx);
            this.matchSelectedLeft = null;
            if (matchedList.length === question.pairs.length) {
              this.practiceScore.correct++;
              this.practiceAnswered[question.id] = { answered: true, correct: true };
              this.flashFeedback('correct');
            }
            this.saveActiveState();
            rerender();
          } else {
            // Wrong match
            sfx.wrong();
            this.flashFeedback('wrong');
            alert('Not a match! Think carefully and try again.');
          }
        });
      }
      rightCol.appendChild(item);
    });

    matchWrap.appendChild(leftCol);
    matchWrap.appendChild(rightCol);
    container.appendChild(matchWrap);

    if (matchedList.length === question.pairs.length) {
      const allDone = document.createElement('div');
      allDone.style.marginTop = '12px';
      allDone.style.color = 'var(--color-success)';
      allDone.style.fontWeight = '700';
      allDone.textContent = '🎉 All pairs perfectly matched!';
      container.appendChild(allDone);
    }
  }

  // D. Short Answer (2-Marks Thinking Check)
  renderShortInteraction(container, question, qState, rerender) {
    const box = document.createElement('div');
    box.className = 'short-answer-box';

    if (question.thinkingClue) {
      const clue = document.createElement('div');
      clue.className = 'thinking-clue-card';
      clue.textContent = question.thinkingClue;
      box.appendChild(clue);
    }

    // Student answer input textarea
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'short-input-wrapper';
    inputWrapper.innerHTML = `
      <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">
        ✍️ Your Answer (Write 1-2 points in your own words):
      </label>
    `;

    const textarea = document.createElement('textarea');
    textarea.className = 'student-textarea';
    textarea.style.minHeight = '90px';
    textarea.placeholder = 'Type your answer here... (e.g., mention key reasons or examples)';
    const savedDraft = this.studentDrafts[question.id] || qState.studentAnswer || '';
    textarea.value = savedDraft;

    textarea.addEventListener('input', e => {
      this.studentDrafts[question.id] = e.target.value;
      this.saveActiveState();
    });
    inputWrapper.appendChild(textarea);
    box.appendChild(inputWrapper);

    // Action buttons row
    const btnRow = document.createElement('div');
    btnRow.style.display = 'flex';
    btnRow.style.gap = '10px';
    btnRow.style.flexWrap = 'wrap';

    const checkBtn = document.createElement('button');
    checkBtn.className = 'btn btn-primary';
    checkBtn.textContent = qState.answered ? '✅ Check / Update Answer' : 'Submit & Check My Answer';

    const revealBtn = document.createElement('button');
    revealBtn.className = 'btn btn-secondary';
    revealBtn.textContent = qState.revealed ? '🔒 Hide Model Key Points' : '👁️ Reveal 2-Mark Model Key Points';

    checkBtn.addEventListener('click', () => {
      const val = textarea.value.trim();
      if (!val) {
        alert('Please type a few words or bullet points first!');
        textarea.focus();
        return;
      }
      sfx.correct();
      this.flashFeedback('correct');

      if (!qState.answered) {
        this.practiceScore.correct++;
      }

      this.practiceAnswered[question.id] = {
        answered: true,
        correct: true,
        revealed: true,
        studentAnswer: val
      };
      this.studentDrafts[question.id] = val;
      this.saveActiveState();
      rerender();
    });

    revealBtn.addEventListener('click', () => {
      sfx.click();
      const nextRevealed = !qState.revealed;
      this.practiceAnswered[question.id] = {
        answered: qState.answered || false,
        correct: qState.correct || false,
        revealed: nextRevealed,
        studentAnswer: textarea.value.trim() || qState.studentAnswer || ''
      };
      this.saveActiveState();
      rerender();
    });

    btnRow.appendChild(checkBtn);
    btnRow.appendChild(revealBtn);
    box.appendChild(btnRow);

    // If revealed or answered, show model key points
    if (qState.revealed) {
      const pointsCard = document.createElement('div');
      pointsCard.className = 'self-check-points';
      pointsCard.innerHTML = `
        <h4>🎯 2-Mark Standard CBSE Key Points (Self-Check):</h4>
        <ul>
          ${question.keyPoints.map(pt => `<li>${pt}</li>`).join('')}
        </ul>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px;">
          💡 <em>Compare your answer above with these CBSE examiner points. Did you cover both key reasons?</em>
        </p>
      `;
      box.appendChild(pointsCard);
    }

    container.appendChild(box);
  }

  // E. Long Answer Scaffold Studio ("Chunk & Conquer")
  renderLongScaffoldInteraction(container, question, qState, rerender) {
    const scaffold = document.createElement('div');
    scaffold.className = 'long-answer-scaffold';

    // Blueprint header
    const bpHeader = document.createElement('div');
    bpHeader.className = 'scaffold-blueprint-header';
    bpHeader.innerHTML = `
      <div class="scaffold-icon">🏗️</div>
      <div class="scaffold-text">
        <h3>Memory Scaffold: ${question.blueprintTitle || 'Answer Architect'}</h3>
        <p>Don't be bogged down by a huge answer! Master these <strong>${question.pillars.length} core building blocks</strong> to recollect effortlessly.</p>
      </div>
    `;
    scaffold.appendChild(bpHeader);

    // Current student draft text
    const currentDraft = this.studentDrafts[question.id] || '';

    // Pillars grid
    const pillarsGrid = document.createElement('div');
    pillarsGrid.className = 'scaffold-pillars-grid';

    question.pillars.forEach((pillar, idx) => {
      // Check if student draft covers keywords in this pillar
      const draftLower = currentDraft.toLowerCase();
      const matchCount = pillar.keywords.filter(kw => draftLower.includes(kw.toLowerCase())).length;
      const isCovered = matchCount >= 1;

      const pCard = document.createElement('div');
      pCard.className = `scaffold-pillar-card ${isCovered ? 'covered' : ''}`;
      pCard.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span class="pillar-number">${idx + 1}</span>
          <span style="font-size: 0.75rem; color: ${isCovered ? 'var(--color-success)' : 'var(--text-muted)'}; font-weight: 700;">
            ${isCovered ? '✅ Covered in your draft' : '⏳ Include in your draft'}
          </span>
        </div>
        <div class="pillar-heading">${pillar.title}</div>
        <div class="pillar-prompt">${pillar.prompt}</div>
        <div class="pillar-keywords">
          ${pillar.keywords.map(kw => {
            const kwMatched = draftLower.includes(kw.toLowerCase());
            return `<span class="keyword-tag ${kwMatched ? 'matched' : ''}">${kw}</span>`;
          }).join('')}
        </div>
      `;
      pillarsGrid.appendChild(pCard);
    });
    scaffold.appendChild(pillarsGrid);

    // Student Writing Scratchpad with Smart Live Concept Checker
    const notepad = document.createElement('div');
    notepad.className = 'student-notepad-card';
    notepad.innerHTML = `
      <div class="notepad-label">
        <span>✍️ Practice Writing / Bullet Notes Scratchpad</span>
        <span style="font-size: 0.75rem; color: var(--accent-amber);">Type your points below to test your recall</span>
      </div>
    `;

    const textarea = document.createElement('textarea');
    textarea.className = 'student-textarea';
    textarea.placeholder = 'Write your thoughts or bullet points here... (e.g. 1. Emergent layer has tall trees... 2. Canopy blocks sunlight...)';
    textarea.value = currentDraft;

    const feedbackBox = document.createElement('div');
    feedbackBox.className = 'keyword-detector-feedback';
    feedbackBox.style.display = currentDraft.trim() ? 'block' : 'none';

    const updateFeedback = text => {
      const textLower = text.toLowerCase();
      let coveredCount = 0;
      question.pillars.forEach(p => {
        if (p.keywords.some(kw => textLower.includes(kw.toLowerCase()))) {
          coveredCount++;
        }
      });
      feedbackBox.style.display = 'block';
      if (coveredCount === question.pillars.length) {
        feedbackBox.innerHTML = `
          <div style="color: var(--color-success); font-weight: 700;">
            🌟 Brilliant Recall! You touched upon all ${question.pillars.length} memory pillars in your notes!
          </div>
        `;
      } else {
        feedbackBox.innerHTML = `
          <div style="color: var(--accent-amber); font-weight: 600;">
            🔍 Progress: Covered <strong>${coveredCount} of ${question.pillars.length}</strong> pillars. Notice the highlighted tags above!
          </div>
        `;
      }
    };

    textarea.addEventListener('input', e => {
      this.studentDrafts[question.id] = e.target.value;
      this.saveActiveState();
      updateFeedback(e.target.value);
    });

    notepad.appendChild(textarea);
    notepad.appendChild(feedbackBox);

    // Actions Row: Check & Reveal Model Answer
    const notepadActions = document.createElement('div');
    notepadActions.style.display = 'flex';
    notepadActions.style.gap = '10px';
    notepadActions.style.marginTop = '6px';

    const revealModelBtn = document.createElement('button');
    revealModelBtn.className = 'btn btn-secondary';
    revealModelBtn.textContent = qState.revealed ? '🔒 Hide 5-Mark Model Answer' : '📖 Read 5-Mark CBSE Model Answer';

    revealModelBtn.addEventListener('click', () => {
      sfx.click();
      this.practiceAnswered[question.id] = {
        answered: true,
        correct: true,
        revealed: !qState.revealed
      };
      this.saveActiveState();
      rerender();
    });

    notepadActions.appendChild(revealModelBtn);
    notepad.appendChild(notepadActions);
    scaffold.appendChild(notepad);

    // Model Answer Box
    if (qState.revealed && question.modelAnswer) {
      const modelCard = document.createElement('div');
      modelCard.className = 'model-answer-card';
      modelCard.innerHTML = `
        <div class="model-answer-header">
          <span style="font-weight: 700; color: var(--color-success); font-size: 1.05rem;">
            🏆 Standard 5-Mark Model Answer
          </span>
          <span class="model-badge">CBSE Format</span>
        </div>
        <div class="model-answer-body">
          ${question.modelAnswer}
        </div>
      `;
      scaffold.appendChild(modelCard);
    }

    container.appendChild(scaffold);
  }

  // ==========================================================
  // MODE 3: 60-SECOND SPEED CHALLENGE
  // ==========================================================
  renderChallengeMode(container) {
    if (!container) container = document.getElementById('content-viewport');
    if (!container) return;
    container.innerHTML = '';
    const chap = CHAPTERS_DATA.find(c => c.id === this.activeChapterId) || CHAPTERS_DATA[0];

    const wrap = document.createElement('div');
    wrap.className = 'challenge-container';

    // If challenge not active
    if (!this.challengeTimer && this.challengeQuestions.length === 0) {
      wrap.innerHTML = `
        <div style="font-size: 4rem;">⚡</div>
        <h2>60-Second Rapid Recall Challenge</h2>
        <p style="color: var(--text-secondary); max-width: 500px;">
          Test how fast you can recall facts, dates, definitions, and concepts from <strong>${chap.title}</strong> before time runs out!
        </p>
        <button class="btn btn-primary" id="btn-start-challenge" style="padding: 14px 32px; font-size: 1.1rem; margin-top: 14px;">
          🚀 Start 60s Challenge!
        </button>
      `;
      wrap.querySelector('#btn-start-challenge').addEventListener('click', () => {
        this.startChallenge(chap, container);
      });
      container.appendChild(wrap);
      return;
    }

    // Active Challenge HUD
    const hud = document.createElement('div');
    hud.className = 'challenge-hud';
    hud.innerHTML = `
      <div class="hud-item">
        <span class="hud-value ${this.challengeTimeLeft <= 10 ? 'time-warning' : ''}" id="challenge-timer-display">${this.challengeTimeLeft}s</span>
        <span class="hud-label">Time Remaining</span>
      </div>
      <div class="hud-item">
        <span class="hud-value" style="color: var(--color-success);">${this.challengeScore}</span>
        <span class="hud-label">Score</span>
      </div>
      <div class="hud-item">
        <span class="hud-value" style="color: var(--accent-amber);">${this.challengeIndex + 1}/${this.challengeQuestions.length}</span>
        <span class="hud-label">Question</span>
      </div>
    `;
    wrap.appendChild(hud);

    // Current Question
    const q = this.challengeQuestions[this.challengeIndex];
    if (!q) {
      this.endChallenge(container);
      return;
    }

    const qCard = document.createElement('div');
    qCard.className = 'question-card';
    qCard.style.width = '100%';
    qCard.style.textAlign = 'left';

    qCard.innerHTML = `
      <div class="question-header">
        <span class="question-type-badge">Sprint Question</span>
      </div>
      <h3 class="question-prompt" style="font-size: 1.15rem;">${q.prompt}</h3>
    `;

    const btnRow = document.createElement('div');
    btnRow.style.display = 'grid';
    btnRow.style.gridTemplateColumns = '1fr 1fr';
    btnRow.style.gap = '12px';
    btnRow.style.marginTop = '14px';

    // Generate 4 options (1 correct + 3 plausible distractors)
    const options = this.getChallengeOptions(q);

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-secondary';
      btn.style.height = '48px';
      btn.style.fontSize = '0.95rem';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (opt === q.correctAnswer) {
          sfx.correct();
          this.challengeScore++;
          this.flashFeedback('correct');
        } else {
          sfx.wrong();
          this.flashFeedback('wrong');
        }
        this.challengeIndex++;
        if (this.challengeIndex >= this.challengeQuestions.length) {
          this.endChallenge(container);
        } else {
          this.renderChallengeMode(container);
        }
      });
      btnRow.appendChild(btn);
    });

    qCard.appendChild(btnRow);
    wrap.appendChild(qCard);
    container.appendChild(wrap);
  }

  startChallenge(chapter, container) {
    sfx.complete();
    this.challengeScore = 0;
    this.challengeIndex = 0;
    this.challengeTimeLeft = 60;

    // Build sprint questions from chapter
    this.challengeQuestions = this.generateSprintQuestions(chapter);

    if (this.challengeTimer) clearInterval(this.challengeTimer);
    this.challengeTimer = setInterval(() => {
      this.challengeTimeLeft--;
      const timerDisplay = document.getElementById('challenge-timer-display');
      if (timerDisplay) {
        timerDisplay.textContent = `${this.challengeTimeLeft}s`;
        if (this.challengeTimeLeft <= 10) timerDisplay.classList.add('time-warning');
      }
      if (this.challengeTimeLeft <= 0) {
        clearInterval(this.challengeTimer);
        this.challengeTimer = null;
        this.endChallenge(container);
      }
    }, 1000);

    this.renderChallengeMode(container);
  }

  endChallenge(container) {
    if (this.challengeTimer) {
      clearInterval(this.challengeTimer);
      this.challengeTimer = null;
    }
    sfx.complete();
    const chap = CHAPTERS_DATA.find(c => c.id === this.activeChapterId);

    // Stars awarded
    let stars = 1;
    if (this.challengeScore >= 7) stars = 3;
    else if (this.challengeScore >= 4) stars = 2;

    this.setChapterStars(chap.id, stars);
    this.updateProgressHUD();
    this.renderSidebar();

    if (stars === 3) this.confetti.blast();

    const wrap = document.createElement('div');
    wrap.className = 'challenge-container';
    wrap.innerHTML = `
      <div style="font-size: 4rem;">🏆</div>
      <h2>Challenge Complete!</h2>
      <div class="stars-display" style="font-size: 2.2rem; margin: 10px 0;">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
      <p style="font-size: 1.1rem; color: var(--text-secondary);">
        You scored <strong>${this.challengeScore} / ${this.challengeQuestions.length}</strong> points!
      </p>
      <div style="display: flex; gap: 12px; margin-top: 20px;">
        <button class="btn btn-primary" id="btn-retry-sprint">🔁 Try Sprint Again</button>
        <button class="btn btn-secondary" id="btn-sprint-learn">📖 Review Concepts</button>
      </div>
    `;
    wrap.querySelector('#btn-retry-sprint').addEventListener('click', () => {
      this.startChallenge(chap, container);
    });
    wrap.querySelector('#btn-sprint-learn').addEventListener('click', () => {
      this.setMode('learn');
    });

    container.innerHTML = '';
    container.appendChild(wrap);
    this.challengeQuestions = [];
  }

  generateSprintQuestions(chapter) {
    const list = [];
    // Extract blanks and true/false as quick sprint MCQs
    chapter.practiceQuestions.forEach(q => {
      if (q.type === 'blank') {
        list.push({
          prompt: q.prompt.replace(/______+/g, '_____'),
          correctAnswer: q.acceptableAnswers[0],
          distractors: ['1947', 'Africa', 'Wheat', 'Savannas', 'Kinshasa', 'Riyadh', '1757', 'Speaker', 'Governor', 'New Delhi']
        });
      } else if (q.type === 'tf') {
        list.push({
          prompt: `Is this statement True or False: "${q.prompt}"`,
          correctAnswer: q.isTrue ? 'True' : 'False',
          distractors: [q.isTrue ? 'False' : 'True', 'Cannot be determined', 'Partially True']
        });
      }
    });
    // Shuffle
    return list.sort(() => Math.random() - 0.5).slice(0, 10);
  }

  getChallengeOptions(q) {
    const options = [q.correctAnswer];
    const filteredDistractors = q.distractors.filter(d => d.toLowerCase() !== q.correctAnswer.toLowerCase());
    while (options.length < 4 && filteredDistractors.length > 0) {
      const rand = filteredDistractors.splice(Math.floor(Math.random() * filteredDistractors.length), 1)[0];
      options.push(rand);
    }
    return options.sort(() => Math.random() - 0.5);
  }

  // ==========================================================
  // MODE 4: PRINTABLE WORKSHEET
  // ==========================================================
  renderWorksheetMode(container) {
    if (!container) container = document.getElementById('content-viewport');
    if (!container) return;
    container.innerHTML = '';
    const chap = CHAPTERS_DATA.find(c => c.id === this.activeChapterId) || CHAPTERS_DATA[0];

    const wrap = document.createElement('div');
    wrap.className = 'worksheet-preview-container';

    // Controls bar
    const controls = document.createElement('div');
    controls.className = 'worksheet-controls-bar no-print';
    controls.innerHTML = `
      <div>
        <h3 style="font-size: 1.1rem; font-weight: 700;">🖨️ Revision Worksheet Preview</h3>
        <p style="font-size: 0.82rem; color: var(--text-secondary);">Formatted for standard A4 printing. Ready for school submission & self-study.</p>
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="btn btn-primary" id="btn-trigger-print">🖨️ Print Now</button>
      </div>
    `;
    controls.querySelector('#btn-trigger-print').addEventListener('click', () => {
      window.print();
    });
    wrap.appendChild(controls);

    // Printable Paper
    const paper = document.createElement('div');
    paper.className = 'worksheet-paper';
    paper.innerHTML = `
      <div class="paper-header">
        <h2>Freedom International School / CBSE Term 1 Assessment</h2>
        <h3>Revision Worksheet: ${chap.number} — ${chap.title}</h3>
        <div class="paper-meta-row">
          <span>Student Name: ___________________________</span>
          <span>Grade: V &nbsp;&nbsp; Sec: _____</span>
          <span>Date: ____________</span>
        </div>
      </div>

      <div class="paper-section">
        <h4>I. Fill in the Blanks / Objective Questions</h4>
        ${chap.practiceQuestions.filter(q => q.type === 'blank').map((q, idx) => `
          <div class="paper-q">
            <strong>${idx + 1}.</strong> ${q.prompt}
          </div>
        `).join('')}
      </div>

      <div class="paper-section">
        <h4>II. State Whether True or False (Correct if False)</h4>
        ${chap.practiceQuestions.filter(q => q.type === 'tf').map((q, idx) => `
          <div class="paper-q">
            <strong>${idx + 1}.</strong> ${q.prompt} [ &nbsp; &nbsp; &nbsp; &nbsp; ]
            <div class="paper-lines" style="height: 26px;">Correction (if False): </div>
          </div>
        `).join('')}
      </div>

      <div class="paper-section">
        <h4>III. Match the Following</h4>
        ${chap.practiceQuestions.filter(q => q.type === 'match').map(q => `
          <div class="paper-q">
            <p><strong>${q.prompt}</strong></p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
              ${q.pairs.map((p, i) => `
                <tr>
                  <td style="padding: 4px; width: 45%;">(${i + 1}) ${p.left}</td>
                  <td style="padding: 4px; width: 10%;">[ &nbsp; &nbsp; ]</td>
                  <td style="padding: 4px; width: 45%;">(${String.fromCharCode(65 + i)}) ${p.right}</td>
                </tr>
              `).join('')}
            </table>
          </div>
        `).join('')}
      </div>

      <div class="paper-section">
        <h4>IV. Subjective & Conceptual Reasoning Questions</h4>
        ${chap.practiceQuestions.filter(q => q.type === 'short' || q.type === 'long').map((q, idx) => `
          <div class="paper-q">
            <strong>${idx + 1}.</strong> ${q.prompt}
            <div class="paper-lines"></div>
            <div class="paper-lines"></div>
          </div>
        `).join('')}
      </div>
    `;

    wrap.appendChild(paper);
    container.appendChild(wrap);
  }

  // ==================== FEEDBACK HELPERS ====================
  flashFeedback(type) {
    const flash = document.getElementById('feedback-flash');
    if (!flash) return;
    flash.className = `feedback-flash ${type}`;
    setTimeout(() => {
      flash.className = 'feedback-flash';
    }, 350);
  }

  showResultsModal(chapter, totalQuestions) {
    sfx.complete();
    const modal = document.getElementById('results-modal');
    if (!modal) return;

    const correct = this.practiceScore.correct;
    const accuracy = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 100;

    let stars = 1;
    if (accuracy >= 80) stars = 3;
    else if (accuracy >= 50) stars = 2;

    this.setChapterStars(chapter.id, stars);
    this.updateProgressHUD();
    this.renderSidebar();

    if (stars === 3) this.confetti.blast();

    const titleEl = document.getElementById('result-title');
    const msgEl = document.getElementById('result-message');
    const starsEl = document.getElementById('result-stars');
    const corEl = document.getElementById('result-correct');
    const totEl = document.getElementById('result-total');
    const accEl = document.getElementById('result-accuracy');

    if (titleEl) titleEl.textContent = stars === 3 ? 'Outstanding Thinking!' : 'Great Effort!';
    if (msgEl) msgEl.textContent = `You completed the revision drill for ${chapter.number}: ${chapter.title}!`;
    if (starsEl) starsEl.textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    if (corEl) corEl.textContent = correct.toString();
    if (totEl) totEl.textContent = totalQuestions.toString();
    if (accEl) accEl.textContent = `${accuracy}%`;

    modal.classList.add('active');

    const retryBtn = document.getElementById('btn-modal-retry');
    const reviewBtn = document.getElementById('btn-modal-review');
    const closeBtn = document.getElementById('btn-modal-close');

    if (retryBtn) {
      retryBtn.onclick = () => {
        modal.classList.remove('active');
        this.practiceIndex = 0;
        this.practiceAnswered = {};
        this.practiceScore = { correct: 0, incorrect: 0 };
        this.saveActiveState();
        this.renderPracticeMode(document.getElementById('content-viewport'));
      };
    }
    if (reviewBtn) {
      reviewBtn.onclick = () => {
        modal.classList.remove('active');
        this.setMode('learn');
      };
    }
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove('active');
      };
    }
  }
}

// ==================== INITIALIZE ON DOM READY ====================
document.addEventListener('DOMContentLoaded', () => {
  window.sstApp = new SSTApp();
  window.sstApp.init();
});
