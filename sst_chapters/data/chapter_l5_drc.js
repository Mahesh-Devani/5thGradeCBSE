/* ==========================================================
   SST CHAPTERS — L-5 The DRC — The Land of Dense Forest
   CBSE Class 5 Social Science Curriculum Data Store
   Zero External Dependencies | Pure Vanilla ES6
   ========================================================== */

const CHAPTER_L5_DRC = {
    id: 'ch5_drc',
    number: 'L-5',
    title: 'The DRC — The Land of Dense Forest',
    themeColor: '#10b981',
    icon: '🌳',
    tag: 'Geography',
    targetStars: 10,
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
  };
