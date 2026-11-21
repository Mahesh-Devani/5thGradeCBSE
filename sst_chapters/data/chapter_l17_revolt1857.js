/* ==========================================================
   SST CHAPTERS — L-17 The British Raj & The First War of Independence
   CBSE Class 5 Social Science Curriculum Data Store
   Zero External Dependencies | Pure Vanilla ES6
   ========================================================== */

const CHAPTER_L17_REVOLT1857 = {
    id: 'ch17_british_raj',
    number: 'L-17',
    title: 'The British Raj & The First War of Independence',
    themeColor: '#f43f5e',
    icon: '⚔️',
    tag: 'History',
    targetStars: 10,
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
  };
