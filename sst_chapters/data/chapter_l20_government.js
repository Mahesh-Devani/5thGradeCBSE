/* ==========================================================
   SST CHAPTERS — L-20 Our Government
   CBSE Class 5 Social Science Curriculum Data Store
   Zero External Dependencies | Pure Vanilla ES6
   ========================================================== */

const CHAPTER_L20_GOVERNMENT = {
    id: 'ch20_government',
    number: 'L-20',
    title: 'Our Government',
    themeColor: '#3b82f6',
    icon: '🏛️',
    tag: 'Civics',
    targetStars: 10,
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
  };
