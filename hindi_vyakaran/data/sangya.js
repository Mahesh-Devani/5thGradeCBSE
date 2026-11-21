/* ==========================================================
   HINDI VYAKARAN — Sangya Aur 5 Bhed (संज्ञा व 5 भेद)
   Noun Types, Bhavvachak Nirman Lab, Sort & Quiz Pools
   Zero External Dependencies | Pure Vanilla ES6
   ========================================================== */

(typeof window !== 'undefined' ? window : this).SANGYA_TYPES_DATA = [
  {
    id: 'proper',
    num: 1,
    nameHi: 'व्यक्तिवाचक संज्ञा',
    nameEn: 'Proper Noun',
    icon: '👑',
    themeClass: 'card-proper',
    defHi: 'जिस संज्ञा शब्द से किसी <strong>विशेष व्यक्ति, विशेष स्थान या विशेष वस्तु</strong> के नाम का बोध होता है, उसे व्यक्तिवाचक संज्ञा कहते हैं।',
    defEn: 'A Proper Noun is the specific name of a particular person, place, or thing.',
    clueHi: 'यह संसार में अपने प्रकार का <strong>केवल एक (Unique)</strong> होता है। इसका सामान्यतः बहुवचन नहीं बनता।',
    clueEn: 'Refers to a single unique entity. Generally cannot be pluralized.',
    examples: ['भारत', 'गंगा', 'हिमालय', 'महात्मा गांधी', 'रामायण', 'दिल्ली', 'सोमवार', 'ताजमहल'],
    trapHi: '⚠️ <strong>परीक्षा सावधानी:</strong> ‘नदी’ जातिवाचक है, किंतु ‘गंगा’ व्यक्तिवाचक है। ‘पुस्तक’ जातिवाचक है, किंतु ‘रामायण’ व्यक्तिवाचक है।',
    trapEn: "'River' is a Common Noun, but 'Ganga' is a Proper Noun."
  },
  {
    id: 'common',
    num: 2,
    nameHi: 'जातिवाचक संज्ञा',
    nameEn: 'Common Noun',
    icon: '🌳',
    themeClass: 'card-common',
    defHi: 'जिस संज्ञा शब्द से किसी <strong>संपूर्ण जाति, वर्ग या श्रेणी</strong> के सभी प्राणियों, स्थानों या वस्तुओं का बोध होता है, उसे जातिवाचक संज्ञा कहते हैं।',
    defEn: 'A Common Noun represents the entire class or category of persons, animals, places, or things.',
    clueHi: 'यह एक पूरी जाति को दर्शाता है। इसका <strong>बहुवचन आसानी से बन सकता है</strong> (जैसे: नदी ➔ नदियाँ, लड़का ➔ लड़के)।',
    clueEn: 'Applies to an entire category and can easily be pluralized.',
    examples: ['नदी', 'पर्वत', 'लड़का', 'देश', 'पुस्तक', 'पेड़', 'पक्षी', 'विद्यालय', 'डॉक्टर', 'शहर'],
    trapHi: '⚠️ <strong>परीक्षा सावधानी:</strong> जब किसी विशेष नाम के बदले सामान्य श्रेणी की बात हो (जैसे ‘शहर’, ‘खिलाड़ी’), तो वह जातिवाचक संज्ञा होगी।',
    trapEn: "Generic categories ('city', 'player') are Common Nouns."
  },
  {
    id: 'abstract',
    num: 3,
    nameHi: 'भाववाचक संज्ञा',
    nameEn: 'Abstract Noun',
    icon: '💖',
    themeClass: 'card-abstract',
    defHi: 'जिस संज्ञा शब्द से किसी व्यक्ति, वस्तु या स्थान के <strong>गुण, दोष, दशा, अवस्था या भाव</strong> का बोध होता है, उसे भाववाचक संज्ञा कहते हैं।',
    defEn: 'An Abstract Noun refers to qualities, emotions, states, or concepts that cannot be seen or touched.',
    clueHi: 'इन्हें न तो आँखों से देखा जा सकता है और न ही हाथों से छुआ जा सकता है; इन्हें <strong>केवल अनुभव (Feel)</strong> किया जा सकता है।',
    clueEn: 'Intangible qualities or emotions. You can only feel or perceive them.',
    examples: ['बचपन', 'मिठास', 'ईमानदारी', 'वीरता', 'बुढ़ापा', 'थकावट', 'सुंदरता', 'खुशी', 'हरियाली', 'क्रोध'],
    trapHi: '⚠️ <strong>परीक्षा सावधानी:</strong> ‘मीठा’ विशेषण है, किंतु ‘मिठास’ भाववाचक संज्ञा है! ‘मित्र’ जातिवाचक है, किंतु ‘मित्रता’ भाववाचक संज्ञा है।',
    trapEn: "'Sweet' is an adjective, but 'Sweetness' is an Abstract Noun!"
  },
  {
    id: 'material',
    num: 4,
    nameHi: 'द्रव्यवाचक संज्ञा',
    nameEn: 'Material Noun',
    icon: '🪙',
    themeClass: 'card-material',
    defHi: 'जिस संज्ञा शब्द से किसी <strong>धातु, खनिज, तरल, ठोस या पदार्थ</strong> का बोध होता है जिससे अन्य वस्तुएं बनाई जाती हैं, उसे द्रव्यवाचक संज्ञा कहते हैं।',
    defEn: 'A Material Noun denotes substances, liquids, metals, or raw materials from which other things are made.',
    clueHi: 'इन्हें <strong>मापा या तौला (Weighed/Measured)</strong> जाता है, गिना (Counted) नहीं जाता। ये अगणनीय (Uncountable) होते हैं।',
    clueEn: 'Measured or weighed, not counted as individual units.',
    examples: ['सोना', 'चाँदी', 'लोहा', 'दूध', 'पानी', 'तेल', 'घी', 'गेहूँ', 'चावल', 'मिट्टी'],
    trapHi: '⚠️ <strong>परीक्षा सावधानी:</strong> ‘दूध’ द्रव्यवाचक है (मापा जाता है), किंतु ‘बोतल’ जातिवाचक है (गिनी जाती है)।',
    trapEn: "'Milk' is a Material Noun, while 'Bottle' is a Common Noun."
  },
  {
    id: 'collective',
    num: 5,
    nameHi: 'समुदायवाचक संज्ञा',
    nameEn: 'Collective Noun',
    icon: '👥',
    themeClass: 'card-collective',
    defHi: 'जिस संज्ञा शब्द से व्यक्तियों, प्राणियों या वस्तुओं के <strong>पूरे समूह, झुंड या सभा</strong> का बोध होता है, उसे समुदायवाचक या समूहवाचक संज्ञा कहते हैं।',
    defEn: 'A Collective Noun refers to a group, collection, or gathering of individuals or things taken as a single unit.',
    clueHi: 'यह शब्द एकवचन जैसा दिखता है, किंतु इसके अंदर <strong>अनेक सदस्यों का समूह</strong> समाहित होता है।',
    clueEn: 'Singular in grammatical form, but represents a gathering or collection of members.',
    examples: ['सेना', 'कक्षा', 'भीड़', 'परिवार', 'सभा', 'गुच्छा', 'झुंड', 'गुलदस्ता', 'जुलूस', 'टोली'],
    trapHi: '⚠️ <strong>परीक्षा सावधानी:</strong> ‘छात्र’ जातिवाचक है, किंतु छात्रों का समूह ‘कक्षा’ समुदायवाचक संज्ञा है!',
    trapEn: "'Student' is a Common Noun, but 'Class' is a Collective Noun!"
  }
];

(typeof window !== 'undefined' ? window : this).BHAVVACHAK_NIRMAN_DATA = [
  // 1. जातिवाचक संज्ञा से
  {
    origin: 'jati',
    base: 'मित्र',
    suffix: 'ता',
    result: 'मित्रता',
    en: 'Friend ➔ Friendship',
    sentence: 'सच्ची <strong>मित्रता</strong> संकट के समय काम आती है।'
  },
  {
    origin: 'jati',
    base: 'बच्चा',
    suffix: 'पन',
    result: 'बचपन',
    en: 'Child ➔ Childhood',
    sentence: '<strong>बचपन</strong> के दिन बहुत सुहावने होते हैं।'
  },
  {
    origin: 'jati',
    base: 'मानव',
    suffix: 'ता',
    result: 'मानवता',
    en: 'Human ➔ Humanity',
    sentence: 'दीन-दुखियों की सेवा करना ही सच्ची <strong>मानवता</strong> है।'
  },
  {
    origin: 'jati',
    base: 'पशु',
    suffix: 'ता',
    result: 'पशुता',
    en: 'Animal ➔ Brutality',
    sentence: 'किसी को सताना <strong>पशुता</strong> की निशानी है।'
  },
  {
    origin: 'jati',
    base: 'दास',
    suffix: 'ता',
    result: 'दासता',
    en: 'Slave ➔ Slavery',
    sentence: 'स्वतंत्रता संग्राम ने देश को <strong>दासता</strong> से मुक्त कराया।'
  },

  // 2. विशेषण से
  {
    origin: 'visheshan',
    base: 'मीठा',
    suffix: 'आस',
    result: 'मिठास',
    en: 'Sweet ➔ Sweetness',
    sentence: 'आम की <strong>मिठास</strong> सभी को आकर्षित करती है।'
  },
  {
    origin: 'visheshan',
    base: 'सुंदर',
    suffix: 'ता',
    result: 'सुंदरता',
    en: 'Beautiful ➔ Beauty',
    sentence: 'प्रकृति की <strong>सुंदरता</strong> देखकर मन प्रसन्न हो गया।'
  },
  {
    origin: 'visheshan',
    base: 'वीर',
    suffix: 'ता',
    result: 'वीरता',
    en: 'Brave ➔ Bravery',
    sentence: 'सैनिकों ने युद्ध में अद्भुत <strong>वीरता</strong> दिखाई।'
  },
  {
    origin: 'visheshan',
    base: 'गरम',
    suffix: 'ई',
    result: 'गरमी',
    en: 'Hot ➔ Heat / Summer',
    sentence: 'मई के महीने में भीषण <strong>गरमी</strong> पड़ती है।'
  },
  {
    origin: 'visheshan',
    base: 'चालाक',
    suffix: 'ई',
    result: 'चालाकी',
    en: 'Cunning ➔ Cunningness',
    sentence: 'लोमड़ी अपनी <strong>चालाकी</strong> से बच निकली।'
  },

  // 3. क्रिया से
  {
    origin: 'kriya',
    base: 'पढ़ना',
    suffix: 'आई',
    result: 'पढ़ाई',
    en: 'To study ➔ Studies',
    sentence: 'परीक्षा के दिनों में मन लगाकर <strong>पढ़ाई</strong> करनी चाहिए।'
  },
  {
    origin: 'kriya',
    base: 'लिखना',
    suffix: 'आई',
    result: 'लिखाई',
    en: 'To write ➔ Handwriting',
    sentence: 'रोहन की <strong>लिखाई</strong> बहुत सुंदर और साफ है।'
  },
  {
    origin: 'kriya',
    base: 'थकना',
    suffix: 'आवट',
    result: 'थकावट',
    en: 'To tire ➔ Fatigue',
    sentence: 'दिनभर की यात्रा के बाद बहुत <strong>थकावट</strong> हो गई।'
  },
  {
    origin: 'kriya',
    base: 'दौड़ना',
    suffix: '—',
    result: 'दौड़',
    en: 'To run ➔ Race / Run',
    sentence: 'आज विद्यालय में 100 मीटर की <strong>दौड़</strong> प्रतियोगिता है।'
  },
  {
    origin: 'kriya',
    base: 'हंसना',
    suffix: 'ई',
    result: 'हंसी',
    en: 'To laugh ➔ Laughter',
    sentence: 'बच्चों की मासूम <strong>हंसी</strong> देखकर सारा दुख भूल जाते हैं।'
  }
];

(typeof window !== 'undefined' ? window : this).SANGYA_COMPARISON_DATA = [
  {
    wordA: 'नदी',
    typeA: 'जातिवाचक संज्ञा',
    tagA: 'tag-common',
    wordB: 'गंगा',
    typeB: 'व्यक्तिवाचक संज्ञा',
    tagB: 'tag-proper',
    reason: '‘नदी’ संसार की किसी भी नदी का बोध कराती है (पूरी जाति), जबकि ‘गंगा’ एक विशेष पवित्र नदी का नाम है (व्यक्तिवाचक)।'
  },
  {
    wordA: 'पर्वत',
    typeA: 'जातिवाचक संज्ञा',
    tagA: 'tag-common',
    wordB: 'हिमालय',
    typeB: 'व्यक्तिवाचक संज्ञा',
    tagB: 'tag-proper',
    reason: '‘पर्वत’ समस्त पहाड़ों की सामान्य श्रेणी है, जबकि ‘हिमालय’ एक विशिष्ट पर्वत श्रृंखला का नाम है।'
  },
  {
    wordA: 'शहर',
    typeA: 'जातिवाचक संज्ञा',
    tagA: 'tag-common',
    wordB: 'दिल्ली',
    typeB: 'व्यक्तिवाचक संज्ञा',
    tagB: 'tag-proper',
    reason: '‘शहर’ कोई भी नगर हो सकता है, जबकि ‘दिल्ली’ भारत की एक निश्चित और विशेष राजधानी का नाम है।'
  },
  {
    wordA: 'पुस्तक',
    typeA: 'जातिवाचक संज्ञा',
    tagA: 'tag-common',
    wordB: 'रामायण',
    typeB: 'व्यक्तिवाचक संज्ञा',
    tagB: 'tag-proper',
    reason: '‘पुस्तक’ कोई भी साधारण किताब हो सकती है, जबकि ‘रामायण’ एक विशेष धार्मिक महाकाव्य का नाम है।'
  },
  {
    wordA: 'खिलाड़ी',
    typeA: 'जातिवाचक संज्ञा',
    tagA: 'tag-common',
    wordB: 'सचिन तेंदुलकर',
    typeB: 'व्यक्तिवाचक संज्ञा',
    tagB: 'tag-proper',
    reason: '‘खिलाड़ी’ खेल खेलने वाले किसी भी व्यक्ति को कहते हैं, जबकि ‘सचिन तेंदुलकर’ एक प्रसिद्ध विशिष्ट व्यक्ति का नाम है।'
  },
  {
    wordA: 'दूध',
    typeA: 'द्रव्यवाचक संज्ञा',
    tagA: 'tag-material',
    wordB: 'बोतल',
    typeB: 'जातिवाचक संज्ञा',
    tagB: 'tag-common',
    reason: '‘दूध’ तरल पदार्थ है जिसे लीटर में मापा जाता है (द्रव्यवाचक), जबकि ‘बोतल’ वह पात्र है जिसे 1, 2, 3 करके गिना जा सकता है (जातिवाचक)।'
  },
  {
    wordA: 'छात्र',
    typeA: 'जातिवाचक संज्ञा',
    tagA: 'tag-common',
    wordB: 'कक्षा',
    typeB: 'समुदायवाचक संज्ञा',
    tagB: 'tag-proper',
    reason: '‘छात्र’ एक व्यक्ति की सामान्य जाति है, जबकि अनेक छात्रों का संगठित समूह मिलकर ‘कक्षा’ (Class) समुदायवाचक संज्ञा बनाता है।'
  },
  {
    wordA: 'सैनिक',
    typeA: 'जातिवाचक संज्ञा',
    tagA: 'tag-common',
    wordB: 'सेना',
    typeB: 'समुदायवाचक संज्ञा',
    tagB: 'tag-proper',
    reason: '‘सैनिक’ अकेला सिपाही है (जातिवाचक), जबकि देश की रक्षा करने वाले सैनिकों का पूरा दल ‘सेना’ (Army) समुदायवाचक संज्ञा है।'
  }
];

(typeof window !== 'undefined' ? window : this).SANGYA_SORT_ITEMS = [
  { word: 'हिमालय', en: 'Himalayas', type: 'proper', sentence: '<strong>हिमालय</strong> भारत के उत्तर में स्थित प्रहरी है।' },
  { word: 'नदी', en: 'River', type: 'common', sentence: 'पहाड़ों से कलकल करती <strong>नदी</strong> बहती है।' },
  { word: 'मिठास', en: 'Sweetness', type: 'abstract', sentence: 'रसगुल्ले की <strong>मिठास</strong> सबको बहुत पसंद है।' },
  { word: 'सोना', en: 'Gold', type: 'material', sentence: '<strong>सोना</strong> एक अत्यंत बहुमूल्य पीली धातु है।' },
  { word: 'सेना', en: 'Army', type: 'collective', sentence: 'भारतीय <strong>सेना</strong> सीमाओं की दिन-रात रक्षा करती है।' },
  { word: 'ताजमहल', en: 'Taj Mahal', type: 'proper', sentence: 'आगरा का <strong>ताजमहल</strong> विश्वप्रसिद्ध स्मारक है।' },
  { word: 'पेड़', en: 'Tree', type: 'common', sentence: 'बगीचे में एक छायादार <strong>पेड़</strong> लगा है।' },
  { word: 'ईमानदारी', en: 'Honesty', type: 'abstract', sentence: '<strong>ईमानदारी</strong> सबसे अच्छा और सच्चा गुण है।' },
  { word: 'दूध', en: 'Milk', type: 'material', sentence: 'स्वास्थ्य के लिए प्रतिदिन ताजा <strong>दूध</strong> पिएं।' },
  { word: 'भीड़', en: 'Crowd', type: 'collective', sentence: 'बाज़ार में त्योहार के कारण भारी <strong>भीड़</strong> थी।' },
  { word: 'सचिन तेंदुलकर', en: 'Sachin Tendulkar', type: 'proper', sentence: '<strong>सचिन तेंदुलकर</strong> ने क्रिकेट में अनेक कीर्तिमान बनाए।' },
  { word: 'विद्यालय', en: 'School', type: 'common', sentence: 'सभी बच्चे सुबह तैयार होकर <strong>विद्यालय</strong> जाते हैं।' },
  { word: 'बचपन', en: 'Childhood', type: 'abstract', sentence: '<strong>बचपन</strong> में हम सब खूब खेलकूद और मस्ती करते थे।' },
  { word: 'लोहा', en: 'Iron', type: 'material', sentence: 'पुल और रेल की पटरियाँ मजबूत <strong>लोहा</strong> से बनती हैं।' },
  { word: 'चाबियों का गुच्छा', en: 'Bunch of keys', type: 'collective', sentence: 'दादाजी ने <strong>चाबियों का गुच्छा</strong> खूंटी पर टांग दिया।' },
  { word: 'रामायण', en: 'Ramayana', type: 'proper', sentence: 'दादीजी प्रतिदिन <strong>रामायण</strong> का पाठ करती हैं।' },
  { word: 'डॉक्टर', en: 'Doctor', type: 'common', sentence: 'अस्पताल में <strong>डॉक्टर</strong> रोगियों का उपचार करते हैं।' },
  { word: 'वीरता', en: 'Bravery', type: 'abstract', sentence: 'रानी लक्ष्मीबाई ने अंग्रेजों के सामने अद्भुत <strong>वीरता</strong> दिखाई।' },
  { word: 'घी', en: 'Clarified Butter', type: 'material', sentence: 'हलवे में शुद्ध देसी <strong>घी</strong> की खुशबू आ रही है।' },
  { word: 'कक्षा', en: 'Classroom / Class', type: 'collective', sentence: '<strong>कक्षा</strong> पाँच के विद्यार्थी चुपचाप पढ़ाई कर रहे हैं।' }
];

(typeof window !== 'undefined' ? window : this).SANGYA_QUIZ_POOL = [
  {
    qHi: 'किसी व्यक्ति, वस्तु, स्थान, प्राणी या भाव के नाम को क्या कहते हैं?',
    qEn: 'What is the name of a person, place, thing, animal, or emotion called?',
    options: ['सर्वनाम (Pronoun)', 'संज्ञा (Noun)', 'विशेषण (Adjective)', 'क्रिया (Verb)'],
    correct: 1,
    exp: 'किसी भी व्यक्ति, वस्तु, स्थान, प्राणी या भाव के नाम को ‘संज्ञा’ (Noun) कहते हैं। जैसे: राम, दिल्ली, पुस्तक, मिठास।'
  },
  {
    qHi: '‘गंगा भारत की सबसे पवित्र और लंबी नदी है।’ इस वाक्य में व्यक्तिवाचक संज्ञा शब्द कौन-सा है?',
    qEn: 'In "Ganga is the holiest and longest river of India", which word is a Proper Noun?',
    options: ['नदी', 'लंबी', 'गंगा', 'पवित्र'],
    correct: 2,
    exp: '‘गंगा’ एक विशेष नदी का नाम है, इसलिए यह व्यक्तिवाचक संज्ञा है। ‘नदी’ शब्द जातिवाचक संज्ञा है।'
  },
  {
    qHi: 'निम्न में से कौन-सा शब्द ‘जातिवाचक संज्ञा’ (Common Noun) का उदाहरण है?',
    qEn: 'Which of the following is an example of a Common Noun?',
    options: ['हिमालय', 'पर्वत', 'दिल्ली', 'रामायण'],
    correct: 1,
    exp: '‘पर्वत’ समस्त पर्वतों की संपूर्ण जाति का बोध कराता है, इसलिए यह जातिवाचक संज्ञा है। हिमालय विशेष पर्वत का नाम है।'
  },
  {
    qHi: '‘सैनिकों ने युद्ध में अद्भुत वीरता दिखाई।’ रेखांकित शब्द ‘वीरता’ किस संज्ञा का उदाहरण है?',
    qEn: 'In "Soldiers showed immense bravery in war", the word "Bravery" is which type of noun?',
    options: ['भाववाचक संज्ञा', 'जातिवाचक संज्ञा', 'द्रव्यवाचक संज्ञा', 'व्यक्तिवाचक संज्ञा'],
    correct: 0,
    exp: '‘वीरता’ एक आंतरिक गुण और भाव है जिसे देखा या छुआ नहीं जा सकता, केवल अनुभव किया जा सकता है। अतः यह भाववाचक संज्ञा है।'
  },
  {
    qHi: '‘सोना, चाँदी, दूध, तेल, पानी’ — ये सभी शब्द किस संज्ञा भेद के अंतर्गत आते हैं?',
    qEn: 'Gold, silver, milk, oil, water — these words belong to which category of noun?',
    options: ['व्यक्तिवाचक संज्ञा', 'द्रव्यवाचक संज्ञा', 'समुदायवाचक संज्ञा', 'जातिवाचक संज्ञा'],
    correct: 1,
    exp: 'धातुओं, खनिजों और तरल पदार्थों के नाम जिन्हें मापा या तौला जाता है, ‘द्रव्यवाचक संज्ञा’ (Material Noun) कहलाते हैं।'
  },
  {
    qHi: '‘चाबियों का गुच्छा’, ‘सैनिकों की सेना’ व ‘छात्रों की कक्षा’ — ये शब्द किस संज्ञा भेद के उदाहरण हैं?',
    qEn: 'Bunch of keys, Army of soldiers, Class of students — which noun type are these?',
    options: ['समुदायवाचक / समूहवाचक संज्ञा', 'भाववाचक संज्ञा', 'द्रव्यवाचक संज्ञा', 'व्यक्तिवाचक संज्ञा'],
    correct: 0,
    exp: 'जो संज्ञा शब्द किसी व्यक्ति या वस्तु के पूरे समूह या झुंड का बोध कराते हैं, उन्हें ‘समुदायवाचक संज्ञा’ (Collective Noun) कहते हैं।'
  },
  {
    qHi: '‘मीठा’ विशेषण शब्द से बनने वाली सही भाववाचक संज्ञा चुनिए:',
    qEn: 'Select the correct Abstract Noun formed from the adjective "Meetha" (Sweet):',
    options: ['मिठाई', 'मिठास', 'मीठे', 'मीठी'],
    correct: 1,
    exp: '‘मीठा’ विशेषण में ‘आस’ प्रत्यय जुड़ने से ‘मिठास’ भाववाचक संज्ञा बनती है। ‘मिठाई’ तो एक खाद्य वस्तु (जातिवाचक) है!'
  },
  {
    qHi: '‘मित्र’ जातिवाचक संज्ञा से बनने वाली सही भाववाचक संज्ञा क्या होगी?',
    qEn: 'What is the correct Abstract Noun formed from Common Noun "Mitra" (Friend)?',
    options: ['मित्रता', 'मित्रगण', 'दोस्त', 'मैत्रीपूर्ण'],
    correct: 0,
    exp: '‘मित्र’ में ‘ता’ प्रत्यय जोड़कर ‘मित्रता’ (Friendship) भाववाचक संज्ञा बनाई जाती है।'
  },
  {
    qHi: 'इनमें से कौन-सा शब्द अन्य तीन से भिन्न (व्यक्तिवाचक संज्ञा) है?',
    qEn: 'Which of the following words is different from the other three (Proper Noun)?',
    options: ['नदी', 'शहर', 'ताजमहल', 'पुस्तक'],
    correct: 2,
    exp: '‘ताजमहल’ एक विशिष्ट ऐतिहासिक इमारत का नाम (व्यक्तिवाचक) है, जबकि नदी, शहर और पुस्तक तीनों जातिवाचक संज्ञाएँ हैं।'
  },
  {
    qHi: 'द्रव्यवाचक संज्ञा (Material Noun) की सबसे मुख्य पहचान क्या है?',
    qEn: 'What is the most important identifying feature of a Material Noun?',
    options: ['इन्हें गिना जाता है (Counted)', 'इन्हें मापा या तौला जाता है (Measured/Weighed)', 'इनमें भावनाएं होती हैं', 'इनका कभी बहुवचन नहीं बनता'],
    correct: 1,
    exp: 'द्रव्यवाचक संज्ञा की प्रमुख पहचान है कि इसे मापा या तौला (जैसे: 1 लीटर दूध, 10 ग्राम सोना) जाता है, 1-2 करके गिना नहीं जाता।'
  },
  {
    qHi: '‘लिखना’ क्रिया से बनने वाला सही भाववाचक संज्ञा शब्द कौन-सा है?',
    qEn: 'Which is the correct Abstract Noun formed from the verb "Likhna" (To write)?',
    options: ['लेखक', 'लिखाई', 'लिखित', 'लिखकर'],
    correct: 1,
    exp: '‘लिखना’ क्रिया से ‘आई’ प्रत्यय लगकर ‘लिखाई’ भाववाचक संज्ञा बनती है (जैसे: रोहन की लिखाई सुंदर है)। ‘लेखक’ जातिवाचक संज्ञा है।'
  },
  {
    qHi: '‘बचपन के दिन बहुत सुहावने और आनंददायक होते हैं।’ इस वाक्य में भाववाचक संज्ञा शब्द है:',
    qEn: 'In "Days of childhood are pleasant and joyful", the Abstract Noun is:',
    options: ['दिन', 'बचपन', 'सुहावने', 'होते'],
    correct: 1,
    exp: '‘बचपन’ (Childhood) जीवन की एक अवस्था और भाव है जिसे अनुभव किया जाता है, अतः यह भाववाचक संज्ञा है।'
  },
  {
    qHi: '‘डॉ. एपीजे अब्दुल कलाम भारत के महान वैज्ञानिक थे।’ इस वाक्य में ‘वैज्ञानिक’ शब्द किस संज्ञा का है?',
    qEn: 'In "Dr. APJ Abdul Kalam was a great scientist of India", the word "Scientist" is which noun?',
    options: ['व्यक्तिवाचक संज्ञा', 'जातिवाचक संज्ञा', 'भाववाचक संज्ञा', 'द्रव्यवाचक संज्ञा'],
    correct: 1,
    exp: '‘वैज्ञानिक’ शब्द संपूर्ण वैज्ञानिक वर्ग/जाति का बोध कराता है, अतः यह जातिवाचक संज्ञा है। ‘डॉ. कलाम’ व्यक्तिवाचक संज्ञा है।'
  },
  {
    qHi: 'हाथियों अथवा हिरणों के समूह को हिंदी व्याकरण में क्या कहा जाता है?',
    qEn: 'What is a group of elephants or deer called in Hindi grammar?',
    options: ['गुच्छा', 'झुंड', 'कक्षा', 'भीड़'],
    correct: 1,
    exp: 'पशुओं (हाथी, हिरण आदि) के समूह को ‘झुंड’ (Herd) कहा जाता है। चाबियों/अंगूरों के लिए ‘गुच्छा’ प्रयुक्त होता है।'
  },
  {
    qHi: 'कक्षा 5 CBSE पाठ्यक्रम के अनुसार संज्ञा के कुल कितने भेद विस्तार से पढ़ाए जाते हैं?',
    qEn: 'According to CBSE Class 5 curriculum, how many types of noun are taught?',
    options: ['तीन (3)', 'चार (4)', 'पाँच (5)', 'सात (7)'],
    correct: 2,
    exp: 'CBSE कक्षा 5 में संज्ञा के 5 भेद पढ़ाए जाते हैं: व्यक्तिवाचक, जातिवाचक, भाववाचक, द्रव्यवाचक और समुदायवाचक।'
  }
];

(typeof window !== 'undefined' ? window : this).SANGYA_CHALLENGE_POOL = [
  {
    word: 'हिमालय',
    en: 'Himalayas',
    question: '‘हिमालय’ किस प्रकार की संज्ञा है?',
    options: ['व्यक्तिवाचक', 'जातिवाचक', 'भाववाचक', 'द्रव्यवाचक'],
    correct: 0,
    exp: 'हिमालय एक विशेष पर्वत का नाम है ➔ व्यक्तिवाचक संज्ञा।'
  },
  {
    word: 'मिठास',
    en: 'Sweetness',
    question: '‘मिठास’ किस प्रकार की संज्ञा है?',
    options: ['जातिवाचक', 'भाववाचक', 'द्रव्यवाचक', 'समुदायवाचक'],
    correct: 1,
    exp: 'मिठास को केवल अनुभव किया जा सकता है ➔ भाववाचक संज्ञा।'
  },
  {
    word: 'सेना',
    en: 'Army',
    question: '‘सेना’ किस प्रकार की संज्ञा है?',
    options: ['व्यक्तिवाचक', 'समुदायवाचक', 'द्रव्यवाचक', 'भाववाचक'],
    correct: 1,
    exp: 'सैनिकों का समूह ➔ समुदायवाचक संज्ञा।'
  },
  {
    word: 'दूध',
    en: 'Milk',
    question: '‘दूध’ किस प्रकार की संज्ञा है?',
    options: ['द्रव्यवाचक', 'जातिवाचक', 'व्यक्तिवाचक', 'भाववाचक'],
    correct: 0,
    exp: 'दूध एक तरल पदार्थ है जिसे मापा जाता है ➔ द्रव्यवाचक संज्ञा।'
  },
  {
    word: 'नदी',
    en: 'River',
    question: '‘नदी’ किस प्रकार की संज्ञा है?',
    options: ['व्यक्तिवाचक', 'जातिवाचक', 'द्रव्यवाचक', 'भाववाचक'],
    correct: 1,
    exp: 'नदी समस्त नदियों की जाति को दर्शाती है ➔ जातिवाचक संज्ञा।'
  },
  {
    word: 'सचिन तेंदुलकर',
    en: 'Sachin Tendulkar',
    question: '‘सचिन तेंदुलकर’ किस प्रकार की संज्ञा है?',
    options: ['व्यक्तिवाचक', 'जातिवाचक', 'समुदायवाचक', 'भाववाचक'],
    correct: 0,
    exp: 'एक विशिष्ट व्यक्ति का नाम ➔ व्यक्तिवाचक संज्ञा।'
  },
  {
    word: 'बचपन',
    en: 'Childhood',
    question: '‘बचपन’ किस प्रकार की संज्ञा है?',
    options: ['द्रव्यवाचक', 'भाववाचक', 'जातिवाचक', 'व्यक्तिवाचक'],
    correct: 1,
    exp: 'जीवन की अवस्था व भाव ➔ भाववाचक संज्ञा।'
  },
  {
    word: 'सोना',
    en: 'Gold',
    question: '‘सोना’ (धातु) किस प्रकार की संज्ञा है?',
    options: ['जातिवाचक', 'द्रव्यवाचक', 'व्यक्तिवाचक', 'समुदायवाचक'],
    correct: 1,
    exp: 'बहुमूल्य धातु जिसे तौला जाता है ➔ द्रव्यवाचक संज्ञा।'
  },
  {
    word: 'भीड़',
    en: 'Crowd',
    question: '‘भीड़’ किस प्रकार की संज्ञा है?',
    options: ['समुदायवाचक', 'जातिवाचक', 'व्यक्तिवाचक', 'द्रव्यवाचक'],
    correct: 0,
    exp: 'व्यक्तियों का बड़ा समूह ➔ समुदायवाचक संज्ञा।'
  },
  {
    word: 'विद्यालय',
    en: 'School',
    question: '‘विद्यालय’ किस प्रकार की संज्ञा है?',
    options: ['व्यक्तिवाचक', 'जातिवाचक', 'भाववाचक', 'द्रव्यवाचक'],
    correct: 1,
    exp: 'सामान्य स्थान वर्ग ➔ जातिवाचक संज्ञा।'
  },
  {
    word: 'मित्रता',
    en: 'Friendship',
    question: '‘मित्रता’ किस प्रकार की संज्ञा है?',
    options: ['जातिवाचक', 'व्यक्तिवाचक', 'भाववाचक', 'समुदायवाचक'],
    correct: 2,
    exp: 'मित्रता एक भाव व संबंध है ➔ भाववाचक संज्ञा।'
  },
  {
    word: 'चाबियों का गुच्छा',
    en: 'Bunch of keys',
    question: '‘गुच्छा’ किस प्रकार की संज्ञा है?',
    options: ['द्रव्यवाचक', 'समुदायवाचक', 'जातिवाचक', 'व्यक्तिवाचक'],
    correct: 1,
    exp: 'चाबियों का समूह ➔ समुदायवाचक संज्ञा।'
  },
  {
    word: 'तेल',
    en: 'Oil',
    question: '‘तेल’ किस प्रकार की संज्ञा है?',
    options: ['द्रव्यवाचक', 'जातिवाचक', 'भाववाचक', 'व्यक्तिवाचक'],
    correct: 0,
    exp: 'तरल पदार्थ जिसे लीटर में मापते हैं ➔ द्रव्यवाचक संज्ञा।'
  },
  {
    word: 'रामायण',
    en: 'Ramayana',
    question: '‘रामायण’ किस प्रकार की संज्ञा है?',
    options: ['व्यक्तिवाचक', 'जातिवाचक', 'भाववाचक', 'समुदायवाचक'],
    correct: 0,
    exp: 'एक विशेष पवित्र ग्रंथ का नाम ➔ व्यक्तिवाचक संज्ञा।'
  },
  {
    word: 'वीरता',
    en: 'Bravery',
    question: '‘वीरता’ किस प्रकार की संज्ञा है?',
    options: ['जातिवाचक', 'द्रव्यवाचक', 'भाववाचक', 'व्यक्तिवाचक'],
    correct: 2,
    exp: 'साहस का आंतरिक गुण व भाव ➔ भाववाचक संज्ञा।'
  }
];
