/* ==========================================================
   ENGLISH GRAMMAR MASTER — 10-Star Mastery Milestones
   Class 5 CBSE — Verified Pedagogical Unlock Rules
   Zero External Dependencies | Pure Vanilla ES6
   ========================================================== */

(typeof window !== 'undefined' ? window : this).TOPIC_MILESTONES = {
  articles: [
    {
      id: 'learn_foundations',
      title: 'Foundation: Indefinite Articles (A vs An)',
      desc: 'Understand and complete Lesson Cards 1 & 2 ("A — Any One Thing" & "An — Vowel Sounds").',
      hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 1 & 2.',
      check: (d) => !!(d.sectionsRead && d.sectionsRead[0] && d.sectionsRead[1])
    },
    {
      id: 'learn_advanced',
      title: 'Advanced: The & Zero Articles',
      desc: 'Understand and complete Lesson Cards 3 & 4 ("The — Specific One" & "Zero Articles").',
      hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 3 & 4.',
      check: (d) => !!(d.sectionsRead && d.sectionsRead[2] && d.sectionsRead[3])
    },
    {
      id: 'exam_traps',
      title: 'CBSE Exam Trap Detective',
      desc: 'Diagnose traps regarding silent "h", consonant "u" sound, and uncountable nouns.',
      hint: 'In Learn Mode, diagnose at least 2 CBSE Exam Traps in the traps section.',
      check: (d) => (d.trapsDiagnosedCount || 0) >= 2
    },
    {
      id: 'practice_fill',
      title: 'Fill-in-the-Blank Precision',
      desc: 'Correctly fill in articles in sentence contexts.',
      hint: 'In Practice Mode, complete at least 3 fill-in-the-gap article questions.',
      check: (d) => (d.fillSolved || 0) >= 3
    },
    {
      id: 'practice_mcq',
      title: 'Multiple-Choice Deduction',
      desc: 'Identify correct articles and eliminate distractor options.',
      hint: 'In Practice Mode, solve at least 3 multiple-choice questions.',
      check: (d) => (d.mcqSolved || 0) >= 3
    },
    {
      id: 'rule_detective',
      title: 'Sound Detective Mastery (Silent "H")',
      desc: 'Master the vowel-sound test for words like "hour" and "honest".',
      hint: 'Answer Question 1 ("She waited for ___ hour") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[0] && d.answered[0].correct)
    },
    {
      id: 'proper_noun_rule',
      title: 'Geography & Proper Noun Protocol',
      desc: 'Master article usage with mountain ranges and unique landmarks.',
      hint: 'Answer Question 2 ("___ Himalayas are the highest mountains") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[1] && d.answered[1].correct)
    },
    {
      id: 'practice_accuracy',
      title: 'High Practice Accuracy',
      desc: 'Demonstrate precision across the question bank.',
      hint: 'Solve at least 5 practice questions correctly.',
      check: (d) => (d.correctSolved || 0) >= 5
    },
    {
      id: 'practice_breadth',
      title: 'Full Curriculum Breadth',
      desc: 'Explore diverse article rules across the entire question bank.',
      hint: 'Complete at least 8 practice questions across the topic.',
      check: (d) => (d.totalSolved || 0) >= 8
    },
    {
      id: 'challenge_sprint',
      title: '15-Second Rapid Recall Sprint',
      desc: 'Demonstrate rapid, instinctive article mastery under time pressure.',
      hint: 'Score at least 7 points in timed Challenge Mode.',
      check: (d) => (d.challengeHighScore || 0) >= 7
    }
  ],

  simpleTenses: [
    {
      id: 'learn_foundations',
      title: 'Foundation: Simple Present & Daily Habits',
      desc: 'Understand habitual actions and universal facts in Simple Present.',
      hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 1 & 2.',
      check: (d) => !!(d.sectionsRead && d.sectionsRead[0] && d.sectionsRead[1])
    },
    {
      id: 'learn_advanced',
      title: 'Advanced: Past & Future Timeline Jump',
      desc: 'Master irregular past forms and simple future constructions with "will".',
      hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 3 & 4.',
      check: (d) => !!(d.sectionsRead && d.sectionsRead[2] && d.sectionsRead[3])
    },
    {
      id: 'exam_traps',
      title: 'CBSE Exam Trap Detective',
      desc: 'Diagnose 3rd person singular -s/-es drops and double-past errors with "did".',
      hint: 'In Learn Mode, diagnose at least 2 CBSE Exam Traps in the traps section.',
      check: (d) => (d.trapsDiagnosedCount || 0) >= 2
    },
    {
      id: 'practice_fill',
      title: 'Verb Conjugation Fill Precision',
      desc: 'Accurately conjugate base verbs into correct tense forms.',
      hint: 'In Practice Mode, complete at least 3 fill-in-the-gap tense questions.',
      check: (d) => (d.fillSolved || 0) >= 3
    },
    {
      id: 'practice_mcq',
      title: 'Multiple-Choice Timeline Deduction',
      desc: 'Classify sentences into Past, Present, or Future by detecting signal words.',
      hint: 'In Practice Mode, solve at least 3 multiple-choice tense questions.',
      check: (d) => (d.mcqSolved || 0) >= 3
    },
    {
      id: 'rule_detective',
      title: 'Universal Truth & Fact Rule',
      desc: 'Recognize that universal truths never change into the past tense.',
      hint: 'Answer Question 6 ("Water boils at 100°C — Why Simple Present?") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[5] && d.answered[5].correct)
    },
    {
      id: 'irregular_rule',
      title: 'Irregular Past & Habitual Deduction',
      desc: 'Conjugate irregular past forms like "bought" and "went" accurately.',
      hint: 'Answer Question 5 ("My father ___ a car last year") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[4] && d.answered[4].correct)
    },
    {
      id: 'practice_accuracy',
      title: 'High Practice Accuracy',
      desc: 'Maintain high precision across simple verb tenses.',
      hint: 'Solve at least 5 practice questions correctly.',
      check: (d) => (d.correctSolved || 0) >= 5
    },
    {
      id: 'practice_breadth',
      title: 'Full Curriculum Breadth',
      desc: 'Work through diverse habit, history, and future prediction problems.',
      hint: 'Complete at least 8 practice questions across the topic.',
      check: (d) => (d.totalSolved || 0) >= 8
    },
    {
      id: 'challenge_sprint',
      title: '15-Second Rapid Recall Sprint',
      desc: 'Demonstrate rapid tense recognition under time pressure.',
      hint: 'Score at least 7 points in timed Challenge Mode.',
      check: (d) => (d.challengeHighScore || 0) >= 7
    }
  ],

  continuousTenses: [
    {
      id: 'learn_foundations',
      title: 'Foundation: Snapshot Camera & Present Continuous',
      desc: 'Understand actions happening right at this very moment ("am/is/are + verb-ing").',
      hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 1 & 2.',
      check: (d) => !!(d.sectionsRead && d.sectionsRead[0] && d.sectionsRead[1])
    },
    {
      id: 'learn_advanced',
      title: 'Advanced: Future Continuous & Simple vs Continuous',
      desc: 'Distinguish habitual facts from ongoing snapshots in the future and past.',
      hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 3 & 4.',
      check: (d) => !!(d.sectionsRead && d.sectionsRead[2] && d.sectionsRead[3])
    },
    {
      id: 'exam_traps',
      title: 'CBSE Exam Trap Detective',
      desc: 'Diagnose stative verb traps and missing auxiliary verbs (is/are/was/were).',
      hint: 'In Learn Mode, diagnose at least 2 CBSE Exam Traps in the traps section.',
      check: (d) => (d.trapsDiagnosedCount || 0) >= 2
    },
    {
      id: 'practice_fill',
      title: 'Continuous Auxiliary + ing Fill Practice',
      desc: 'Select the right auxiliary and -ing participle in sentence contexts.',
      hint: 'In Practice Mode, complete at least 3 fill-in continuous questions.',
      check: (d) => (d.fillSolved || 0) >= 3
    },
    {
      id: 'practice_mcq',
      title: 'Tense Formula & Moment Identification',
      desc: 'Identify ongoing actions across past, present, and future timelines.',
      hint: 'In Practice Mode, solve at least 3 multiple-choice continuous questions.',
      check: (d) => (d.mcqSolved || 0) >= 3
    },
    {
      id: 'rule_detective',
      title: 'Interrupted Past Action Diagnostic',
      desc: 'Master the combination of Past Continuous background action and Simple Past interruption.',
      hint: 'Answer Question 2 ("She ___ a letter when the lights went off") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[1] && d.answered[1].correct)
    },
    {
      id: 'contrast_rule',
      title: 'Habit vs Ongoing Contrast Mastery',
      desc: 'Contrast everyday routine with actions happening at this exact second.',
      hint: 'Answer Question 7 ("I eat breakfast every day" vs "I am eating breakfast") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[6] && d.answered[6].correct)
    },
    {
      id: 'practice_accuracy',
      title: 'High Practice Accuracy',
      desc: 'Demonstrate consistency across continuous tense questions.',
      hint: 'Solve at least 5 practice questions correctly.',
      check: (d) => (d.correctSolved || 0) >= 5
    },
    {
      id: 'practice_breadth',
      title: 'Full Curriculum Breadth',
      desc: 'Solve problems across present, past, and future continuous structures.',
      hint: 'Complete at least 8 practice questions across the topic.',
      check: (d) => (d.totalSolved || 0) >= 8
    },
    {
      id: 'challenge_sprint',
      title: '15-Second Rapid Recall Sprint',
      desc: 'Deliver quick and accurate continuous tense responses.',
      hint: 'Score at least 7 points in timed Challenge Mode.',
      check: (d) => (d.challengeHighScore || 0) >= 7
    }
  ],

  personification: [
    {
      id: 'learn_foundations',
      title: 'Foundation: Giving Life to Things',
      desc: 'Understand how human qualities, actions, and feelings bring non-human objects alive.',
      hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 1 & 2.',
      check: (d) => !!(d.sectionsRead && d.sectionsRead[0] && d.sectionsRead[1])
    },
    {
      id: 'learn_advanced',
      title: 'Advanced: Feelings & Figurative Writing',
      desc: 'Contrast boring literal facts with rich, emotional personification.',
      hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 3 & 4.',
      check: (d) => !!(d.sectionsRead && d.sectionsRead[2] && d.sectionsRead[3])
    },
    {
      id: 'exam_traps',
      title: 'CBSE Exam Trap Detective',
      desc: 'Diagnose subtle traps separating actual animal behavior from genuine personification.',
      hint: 'In Learn Mode, diagnose at least 2 CBSE Exam Traps in the traps section.',
      check: (d) => (d.trapsDiagnosedCount || 0) >= 2
    },
    {
      id: 'practice_identify',
      title: 'Personification Detective',
      desc: 'Spot figurative language where objects perform human actions.',
      hint: 'In Practice Mode, solve at least 3 personification identification questions.',
      check: (d) => (d.mcqSolved || 0) >= 3
    },
    {
      id: 'rule_discriminator',
      title: 'Non-Personification Discriminator',
      desc: 'Distinguish genuine animal behaviors from figurative human actions.',
      hint: 'Answer Question 4 ("Which is NOT personification? — Lion roared") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[3] && d.answered[3].correct)
    },
    {
      id: 'rule_action',
      title: 'Human Action Attribution',
      desc: 'Select verbs that give inanimate items human personality and voice.',
      hint: 'Answer Question 5 ("My alarm clock yells at me every morning") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[4] && d.answered[4].correct)
    },
    {
      id: 'creative_authoring',
      title: 'Creative Personification Authoring',
      desc: 'Transform flat sentences into vivid, living mental imagery.',
      hint: 'Answer Question 10 ("Create personification! The old car wheezed and groaned") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[9] && d.answered[9].correct)
    },
    {
      id: 'practice_accuracy',
      title: 'High Practice Accuracy',
      desc: 'Demonstrate solid command over figurative language interpretation.',
      hint: 'Solve at least 5 practice questions correctly.',
      check: (d) => (d.correctSolved || 0) >= 5
    },
    {
      id: 'practice_breadth',
      title: 'Full Curriculum Breadth',
      desc: 'Explore personification across poetry, weather, objects, and abstract ideas.',
      hint: 'Complete at least 8 practice questions across the topic.',
      check: (d) => (d.totalSolved || 0) >= 8
    },
    {
      id: 'challenge_sprint',
      title: '15-Second Rapid Recall Sprint',
      desc: 'Rapidly spot and decipher personification under time pressure.',
      hint: 'Score at least 7 points in timed Challenge Mode.',
      check: (d) => (d.challengeHighScore || 0) >= 7
    }
  ],

  presentPerfect: [
    {
      id: 'learn_foundations',
      title: 'Foundation: The Past-to-Present Bridge',
      desc: 'Understand that Present Perfect links past actions to the present moment ("has/have + V3").',
      hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 1 & 2.',
      check: (d) => !!(d.sectionsRead && d.sectionsRead[0] && d.sectionsRead[1])
    },
    {
      id: 'learn_advanced',
      title: 'Advanced: Signal Words & Life Experiences',
      desc: 'Master clue words (already, just, never, yet, since, for) and lifetime inquiries.',
      hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 3 & 4.',
      check: (d) => !!(d.sectionsRead && d.sectionsRead[2] && d.sectionsRead[3])
    },
    {
      id: 'exam_traps',
      title: 'CBSE Exam Trap Detective',
      desc: 'Diagnose specific past timestamp restrictions and since vs for distinctions.',
      hint: 'In Learn Mode, diagnose at least 2 CBSE Exam Traps in the traps section.',
      check: (d) => (d.trapsDiagnosedCount || 0) >= 2
    },
    {
      id: 'practice_fill',
      title: 'Past Participle Fill Precision',
      desc: 'Conjugate irregular past participles (eaten, seen, arrived, broken) after has/have.',
      hint: 'In Practice Mode, complete at least 3 fill-in Present Perfect questions.',
      check: (d) => (d.fillSolved || 0) >= 3
    },
    {
      id: 'practice_mcq',
      title: 'Present Result Reasoning',
      desc: 'Deduce why a past action connects to now (e.g., lost phone = still missing!).',
      hint: 'In Practice Mode, solve at least 3 multiple-choice Present Perfect questions.',
      check: (d) => (d.mcqSolved || 0) >= 3
    },
    {
      id: 'rule_detective',
      title: 'Specific Past Time Restriction Rule',
      desc: 'Guard against using Present Perfect with exact past times like "yesterday".',
      hint: 'Answer Question 5 ("Which sentence is correct? I went to Delhi yesterday") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[4] && d.answered[4].correct)
    },
    {
      id: 'since_for_rule',
      title: '"Since" vs "For" Precision Rule',
      desc: 'Correctly pair starting points with "since" and durations with "for".',
      hint: 'Answer Question 8 ("We have lived in this house since 2018") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[7] && d.answered[7].correct)
    },
    {
      id: 'practice_accuracy',
      title: 'High Practice Accuracy',
      desc: 'Maintain high accuracy on participle forms and auxiliary choice (has vs have).',
      hint: 'Solve at least 5 practice questions correctly.',
      check: (d) => (d.correctSolved || 0) >= 5
    },
    {
      id: 'practice_breadth',
      title: 'Full Curriculum Breadth',
      desc: 'Master lifetime experience, recent completion, and continuing state questions.',
      hint: 'Complete at least 8 practice questions across the topic.',
      check: (d) => (d.totalSolved || 0) >= 8
    },
    {
      id: 'challenge_sprint',
      title: '15-Second Rapid Recall Sprint',
      desc: 'Rapidly bridge past and present under time pressure.',
      hint: 'Score at least 7 points in timed Challenge Mode.',
      check: (d) => (d.challengeHighScore || 0) >= 7
    }
  ],

  pastPerfect: [
    {
      id: 'learn_foundations',
      title: 'Foundation: The "Past of the Past" Flashback',
      desc: 'Understand that Past Perfect ("had + V3") marks the earlier of two past events.',
      hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 1 & 2.',
      check: (d) => !!(d.sectionsRead && d.sectionsRead[0] && d.sectionsRead[1])
    },
    {
      id: 'learn_advanced',
      title: 'Advanced: Connectors & Narrative Clarity',
      desc: 'Use "before", "after", "by the time", and "already" to order story events.',
      hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 3 & 4.',
      check: (d) => !!(d.sectionsRead && d.sectionsRead[2] && d.sectionsRead[3])
    },
    {
      id: 'exam_traps',
      title: 'CBSE Exam Trap Detective',
      desc: 'Diagnose single-event redundancy and reverse-chronology blunders.',
      hint: 'In Learn Mode, diagnose at least 2 CBSE Exam Traps in the traps section.',
      check: (d) => (d.trapsDiagnosedCount || 0) >= 2
    },
    {
      id: 'practice_fill',
      title: 'Auxiliary "Had" + V3 Fill Mastery',
      desc: 'Select "had" and the correct third-form participle across sequence sentences.',
      hint: 'In Practice Mode, complete at least 3 fill-in Past Perfect questions.',
      check: (d) => (d.fillSolved || 0) >= 3
    },
    {
      id: 'practice_mcq',
      title: 'Chronological Order Deduction',
      desc: 'Sequence two past events by identifying which occurred first.',
      hint: 'In Practice Mode, solve at least 3 multiple-choice sequence questions.',
      check: (d) => (d.mcqSolved || 0) >= 3
    },
    {
      id: 'rule_detective',
      title: 'Event 1 Chronology Detective',
      desc: 'Recognize that "had + participle" always signals the first completed action.',
      hint: 'Answer Question 1 ("When I reached the station, the train had already left") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[0] && d.answered[0].correct)
    },
    {
      id: 'sequence_rule',
      title: 'Conjunction & Sequence Mastery',
      desc: 'Order sentences using "after", "before", and "by the time" flawlessly.',
      hint: 'Answer Question 3 ("After the rain had stopped, the children went outside") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[2] && d.answered[2].correct)
    },
    {
      id: 'practice_accuracy',
      title: 'High Practice Accuracy',
      desc: 'Keep event timelines and participle spellings crystal clear.',
      hint: 'Solve at least 5 practice questions correctly.',
      check: (d) => (d.correctSolved || 0) >= 5
    },
    {
      id: 'practice_breadth',
      title: 'Full Curriculum Breadth',
      desc: 'Work through diverse cinematic flashbacks, departures, and realizations.',
      hint: 'Complete at least 8 practice questions across the topic.',
      check: (d) => (d.totalSolved || 0) >= 8
    },
    {
      id: 'challenge_sprint',
      title: '15-Second Rapid Recall Sprint',
      desc: 'Rapidly untangle complex past timelines under time pressure.',
      hint: 'Score at least 7 points in timed Challenge Mode.',
      check: (d) => (d.challengeHighScore || 0) >= 7
    }
  ],

  hyperbole: [
    {
      id: 'learn_foundations',
      title: 'Foundation: Extreme Exaggeration Station',
      desc: 'Understand that hyperbole stretches reality to impossible extremes for humor and drama.',
      hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 1 & 2.',
      check: (d) => !!(d.sectionsRead && d.sectionsRead[0] && d.sectionsRead[1])
    },
    {
      id: 'learn_advanced',
      title: 'Advanced: Spotting & Crafting Hyperbole',
      desc: 'Apply the "Really?!" test and the recipe to inflate normal descriptions.',
      hint: 'In Learn Mode, read and click "Mark Section Understood" on Sections 3 & 4.',
      check: (d) => !!(d.sectionsRead && d.sectionsRead[2] && d.sectionsRead[3])
    },
    {
      id: 'exam_traps',
      title: 'CBSE Exam Trap Detective',
      desc: 'Diagnose traps between believable high numbers, dishonesty, and true hyperbole.',
      hint: 'In Learn Mode, diagnose at least 2 CBSE Exam Traps in the traps section.',
      check: (d) => (d.trapsDiagnosedCount || 0) >= 2
    },
    {
      id: 'practice_spot',
      title: 'Hyperbole Spotter Detective',
      desc: 'Detect figurative exaggerations like "a million times" and "cried a river".',
      hint: 'In Practice Mode, solve at least 3 hyperbole identification questions.',
      check: (d) => (d.mcqSolved || 0) >= 3
    },
    {
      id: 'rule_discriminator',
      title: 'Literal vs Figurative Discriminator',
      desc: 'Separate normal factual statements from impossible humorous exaggerations.',
      hint: 'Answer Question 4 ("Which is NOT hyperbole? — He ate two sandwiches") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[3] && d.answered[3].correct)
    },
    {
      id: 'rule_translator',
      title: 'Real Meaning Translator',
      desc: 'Translate impossible figures of speech back to their true everyday meaning.',
      hint: 'Answer Question 3 ("This suitcase weighs a ton! — What does speaker mean?") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[2] && d.answered[2].correct)
    },
    {
      id: 'rule_creative',
      title: 'Creative Exaggerator Transformation',
      desc: 'Turn ordinary flat sentences into cosmic, unforgettable exaggerations.',
      hint: 'Answer Question 6 ("Turn this into hyperbole: The test was hard") correctly in Practice Mode.',
      check: (d) => !!(d.answered && d.answered[5] && d.answered[5].correct)
    },
    {
      id: 'practice_accuracy',
      title: 'High Practice Accuracy',
      desc: 'Accurately distinguish hyperbole from literal sentences and similes.',
      hint: 'Solve at least 5 practice questions correctly.',
      check: (d) => (d.correctSolved || 0) >= 5
    },
    {
      id: 'practice_breadth',
      title: 'Full Curriculum Breadth',
      desc: 'Explore hyperbole in speech, literature, humor, and everyday conversation.',
      hint: 'Complete at least 8 practice questions across the topic.',
      check: (d) => (d.totalSolved || 0) >= 8
    },
    {
      id: 'challenge_sprint',
      title: '15-Second Rapid Recall Sprint',
      desc: 'Rapidly spot and interpret hyperbole under time pressure.',
      hint: 'Score at least 7 points in timed Challenge Mode.',
      check: (d) => (d.challengeHighScore || 0) >= 7
    }
  ]
};
