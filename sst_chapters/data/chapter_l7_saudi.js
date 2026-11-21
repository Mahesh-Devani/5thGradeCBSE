/* ==========================================================
   SST CHAPTERS — L-7 Saudi Arabia — The Land of Hot Sands
   CBSE Class 5 Social Science Curriculum Data Store
   Zero External Dependencies | Pure Vanilla ES6
   ========================================================== */

const CHAPTER_L7_SAUDI = {
    id: 'ch7_saudi',
    number: 'L-7',
    title: 'Saudi Arabia — The Land of Hot Sands',
    themeColor: '#f59e0b',
    icon: '🏜️',
    tag: 'Geography',
    targetStars: 10,
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
  };
