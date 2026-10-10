/**
 * CBSE Learning Suite — Multi-Grade Curriculum Registry
 * Defines syllabus structure, subjects, and topics across Class 1 to Class 10.
 */

(function(root) {
  'use strict';

  const GRADES = {
    class_1: {
      id: 'class_1',
      title: 'Class 1',
      tagline: 'Foundational Early Learning',
      status: 'planned',
      totalSyllabusStars: 40,
      subjects: [
        { id: 'maths', name: 'Mathematics', icon: '🔢', theme: 'theme-cyan', desc: 'Numbers 1-100, addition, shapes, patterns, measurements.' },
        { id: 'evs', name: 'Environmental Studies (EVS)', icon: '🌱', theme: 'theme-green', desc: 'My family, animals, plants, seasons, good habits.' },
        { id: 'english', name: 'English Grammar & Phonics', icon: '📝', theme: 'theme-blue', desc: 'Phonics sounds, simple sight words, rhyming stories.' },
        { id: 'hindi', name: 'हिंदी वर्णमाला व शब्द', icon: '🇮🇳', theme: 'theme-pink', desc: 'स्वर, व्यंजन, मात्राएँ व सरल शब्द पहचान।' }
      ]
    },
    class_2: {
      id: 'class_2',
      title: 'Class 2',
      tagline: 'Basic Concepts & Word Mastery',
      status: 'planned',
      totalSyllabusStars: 50,
      subjects: [
        { id: 'maths', name: 'Mathematics', icon: '🔢', theme: 'theme-cyan', desc: '2-digit addition & subtraction, tables 1-5, time & money.' },
        { id: 'evs', name: 'Environmental Studies', icon: '🌍', theme: 'theme-green', desc: 'Our neighborhood, transport, food, water, air.' },
        { id: 'english', name: 'English Grammar', icon: '📝', theme: 'theme-blue', desc: 'Nouns, verbs, vowels, simple sentences, storytelling.' },
        { id: 'hindi', name: 'हिंदी व्याकरण व पठन', icon: '🇮🇳', theme: 'theme-pink', desc: 'संज्ञा, विलोम शब्द, चित्र पठन व वाक्य रचना।' }
      ]
    },
    class_3: {
      id: 'class_3',
      title: 'Class 3',
      tagline: 'Analytical Exploration & Skills',
      status: 'planned',
      totalSyllabusStars: 70,
      subjects: [
        { id: 'maths', name: 'Mathematics', icon: '🔢', theme: 'theme-cyan', desc: '4-digit numbers, tables 1-12, division, basic fractions, geometry.' },
        { id: 'science', name: 'Science (EVS)', icon: '🔬', theme: 'theme-green', desc: 'Living & non-living, plant parts, birds, solar system.' },
        { id: 'english', name: 'English Grammar', icon: '📝', theme: 'theme-blue', desc: 'Pronouns, adjectives, tenses intro, punctuation.' },
        { id: 'hindi', name: 'हिंदी व्याकरण', icon: '🇮🇳', theme: 'theme-pink', desc: 'संज्ञा, सर्वनाम, विशेषण, लिंग, वचन व अपठित गद्यांश।' },
        { id: 'sst', name: 'Social Studies', icon: '🗺️', theme: 'theme-amber', desc: 'Our community helpers, maps & globes, India festivals.' }
      ]
    },
    class_4: {
      id: 'class_4',
      title: 'Class 4',
      tagline: 'Critical Thinking & Applications',
      status: 'planned',
      totalSyllabusStars: 90,
      subjects: [
        { id: 'maths', name: 'Mathematics', icon: '🔢', theme: 'theme-cyan', desc: 'Large numbers, factors & multiples, decimals intro, perimeter.' },
        { id: 'science', name: 'Science', icon: '🔬', theme: 'theme-green', desc: 'Digestion, teeth, matter, forces, adaptations in plants & animals.' },
        { id: 'english', name: 'English Grammar', icon: '📝', theme: 'theme-blue', desc: 'Adverbs, prepositions, conjunctions, comprehension drills.' },
        { id: 'hindi', name: 'हिंदी व्याकरण', icon: '🇮🇳', theme: 'theme-pink', desc: 'कारक, क्रिया, पर्यायवाची, मुहावरे व निबंध लेखन।' },
        { id: 'sst', name: 'Social Studies', icon: '🗺️', theme: 'theme-amber', desc: 'Physical divisions of India, Northern Mountains, Coastal Plains.' }
      ]
    },
    class_5: {
      id: 'class_5',
      title: 'Class 5',
      tagline: 'Full Curriculum Ready & Interactive ⭐',
      status: 'active',
      totalSyllabusStars: 110,
      subjects: [
        {
          id: 'sst_maps',
          name: 'Social Science Maps',
          icon: '🗺️',
          theme: 'theme-blue',
          url: 'social_sicence_maps/index.html',
          desc: 'Practice SST maps with interactive quizzes — Saudi Arabia, World Deserts, Equatorial Regions, and DRC & Neighbours.',
          tags: ['✅ 4 Maps', '📖 Learn', '❓ Quiz', '⏱️ Timed', '🖨️ Print'],
          ready: true
        },
        {
          id: 'sst_chapters',
          name: 'Social Science (SST) Chapters',
          icon: '📚',
          theme: 'theme-green',
          url: 'sst_chapters/index.html',
          desc: 'Democratic Republic of Congo (L-5), Greenland (L-6), Saudi Arabia (L-7), Revolt of 1857 (L-17), and Our Government (L-20).',
          tags: ['✅ 5 Chapters', '⚡ Instant Flashcards', '❓ 25-Q Drill', '🖨️ Printable Worksheets'],
          ready: true
        },
        {
          id: 'maths',
          name: 'Mathematics',
          icon: '🔢',
          theme: 'theme-amber',
          url: 'maths/index.html',
          desc: 'Factors & Multiples, Divisibility Rules (2-12), Expressions, Patterns, Geometry & Angles, Tables Speed Master & Fractions.',
          tags: ['✅ 8 Modules Ready', '🔍 Visual Models', '❓ Multi-Format Quizzes', '🖨️ Printable Worksheets'],
          ready: true
        },
        {
          id: 'science',
          name: 'Science (EVS)',
          icon: '🔬',
          theme: 'theme-cyan',
          url: 'science/index.html',
          desc: 'Animal Adaptations, Skeletal & Muscular, Nervous System & Sense Organs, Health & Nutrition, Air & Water, States of Matter.',
          tags: ['✅ 6 Chapters', '🦴 Interactive 3D Anatomy', '❓ Concept Quizzes', '🖨️ Worksheets'],
          ready: true
        },
        {
          id: 'english',
          name: 'English Grammar',
          icon: '📝',
          theme: 'theme-blue',
          url: 'english_grammer/index.html',
          desc: 'Master Articles (A, An, The), Simple Tenses, Continuous Tenses, Personification, Perfect Tenses & Hyperbole with real-time feedback.',
          tags: ['✅ 7 Topics', '📖 Visual Rules', '❓ Multiple Choice', '⚡ Speed Challenge'],
          ready: true
        },
        {
          id: 'hindi',
          name: 'हिंदी व्याकरण व रचना',
          icon: '🇮🇳',
          theme: 'theme-pink',
          url: 'hindi_vyakaran/index.html',
          desc: 'संज्ञा व पाँच भेद (पहचान सूत्र, तुलना दर्पण, भाववाचक निर्माण प्रयोगशाला व 5-घड़े खेल), वाक्यांश के लिए एक शब्द और चित्र वर्णन।',
          tags: ['✅ 3 मुख्य विषय', '🏷️ संज्ञा व 5 भेद', '🏺 वर्गीकरण खेल', '✨ 12 वाक्यांश', '🖼️ चित्र वर्णन'],
          ready: true
        },
        {
          id: 'gk',
          name: 'General Knowledge (GK)',
          icon: '🌍',
          theme: 'theme-purple',
          url: 'general_knowledge/index.html',
          desc: 'Master Term 1 Global Awareness (June, July, August 2026) with memory sparks, international cipher decoders, picture rounds, and school worksheets.',
          tags: ['✅ June, Jul, Aug Ready', '💡 Memory Sparks', '🕵️ Codebreakers', '⚡ 60s Sprint'],
          ready: true
        }
      ]
    },
    class_6: {
      id: 'class_6',
      title: 'Class 6',
      tagline: 'Middle School Conceptual Mastery',
      status: 'planned',
      totalSyllabusStars: 120,
      subjects: [
        { id: 'maths', name: 'Mathematics', icon: '🔢', theme: 'theme-cyan', desc: 'Integers, algebra introduction, ratios & proportions, symmetry.' },
        { id: 'science', name: 'Science', icon: '🔬', theme: 'theme-green', desc: 'Components of food, sorting materials, light, electricity & circuits.' },
        { id: 'english', name: 'English Grammar', icon: '📝', theme: 'theme-blue', desc: 'Active/passive voice, direct/indirect speech, essay composition.' },
        { id: 'hindi', name: 'हिंदी व्याकरण', icon: '🇮🇳', theme: 'theme-pink', desc: 'संधि, समास परिचय, प्रत्यय, उपसर्ग व रचनात्मक लेखन।' },
        { id: 'history', name: 'History & Civics', icon: '🏛️', theme: 'theme-amber', desc: 'Early humans, Harappan civilization, Vedic age, Ashoka, Panchayati Raj.' },
        { id: 'geography', name: 'Geography', icon: '🌍', theme: 'theme-purple', desc: 'Globe: Latitudes & Longitudes, Motions of Earth, Major Landforms.' }
      ]
    },
    class_7: {
      id: 'class_7',
      title: 'Class 7',
      tagline: 'Advanced Middle School Topics',
      status: 'planned',
      totalSyllabusStars: 120,
      subjects: [
        { id: 'maths', name: 'Mathematics', icon: '🔢', theme: 'theme-cyan', desc: 'Fractions & decimals, algebraic expressions, linear equations, triangles.' },
        { id: 'science', name: 'Science', icon: '🔬', theme: 'theme-green', desc: 'Nutrition in plants/animals, acids & bases, physical & chemical changes.' },
        { id: 'english', name: 'English Grammar', icon: '📝', theme: 'theme-blue', desc: 'Clauses, reported speech, conjunctions, comprehension mastery.' },
        { id: 'hindi', name: 'हिंदी व्याकरण', icon: '🇮🇳', theme: 'theme-pink', desc: 'अलंकार, छंद, रस परिचय, शब्द विचार व निबंध।' }
      ]
    },
    class_8: {
      id: 'class_8',
      title: 'Class 8',
      tagline: 'Pre-High School Fundamentals',
      status: 'planned',
      totalSyllabusStars: 140,
      subjects: [
        { id: 'maths', name: 'Mathematics', icon: '🔢', theme: 'theme-cyan', desc: 'Rational numbers, linear equations in one variable, quadrilaterals, mensuration.' },
        { id: 'science', name: 'Science', icon: '🔬', theme: 'theme-green', desc: 'Microorganisms, cell structure, force & pressure, combustion & flame.' },
        { id: 'english', name: 'English Grammar', icon: '📝', theme: 'theme-blue', desc: 'Advanced voice, transformation of sentences, vocabulary builder.' },
        { id: 'hindi', name: 'हिंदी व्याकरण', icon: '🇮🇳', theme: 'theme-pink', desc: 'पद परिचय, वाच्य, वाक्य शुद्धि व औपचारिक पत्र।' }
      ]
    },
    class_9: {
      id: 'class_9',
      title: 'Class 9',
      tagline: 'Secondary School Rigor',
      status: 'planned',
      totalSyllabusStars: 160,
      subjects: [
        { id: 'maths', name: 'Mathematics', icon: '🔢', theme: 'theme-cyan', desc: 'Number systems, polynomials, coordinate geometry, lines & angles, triangles.' },
        { id: 'science', name: 'Science', icon: '🔬', theme: 'theme-green', desc: 'Matter in our surroundings, atom & molecules, cell fundamental unit of life, motion.' },
        { id: 'english', name: 'English Language & Literature', icon: '📝', theme: 'theme-blue', desc: 'Integrated grammar, analytical paragraphs, literature comprehension.' },
        { id: 'hindi', name: 'हिंदी व्याकरण व साहित्य', icon: '🇮🇳', theme: 'theme-pink', desc: 'शब्द व पद, अनुस्वार व अनुनासिक, संवाद व लघुकथा लेखन।' }
      ]
    },
    class_10: {
      id: 'class_10',
      title: 'Class 10',
      tagline: 'Board Exam Preparation & Excellence',
      status: 'planned',
      totalSyllabusStars: 180,
      subjects: [
        { id: 'maths', name: 'Mathematics', icon: '🔢', theme: 'theme-cyan', desc: 'Real numbers, polynomials, quadratic equations, trigonometry, circles, statistics.' },
        { id: 'science', name: 'Science', icon: '🔬', theme: 'theme-green', desc: 'Chemical reactions, electricity, light reflection/refraction, life processes, heredity.' },
        { id: 'english', name: 'English Communicative', icon: '📝', theme: 'theme-blue', desc: 'Editing, omission, reported speech, formal letter & analytical writing.' },
        { id: 'hindi', name: 'हिंदी कोर्स (A/B)', icon: '🇮🇳', theme: 'theme-pink', desc: 'रचना के आधार पर वाक्य भेद, वाच्य, पद परिचय, विज्ञापन लेखन।' }
      ]
    }
  };

  const AppCurriculum = {
    GRADES,
    getGrade(gradeId) {
      return GRADES[gradeId] || GRADES.class_5;
    },
    getAllGrades() {
      return Object.values(GRADES);
    }
  };

  root.AppCurriculum = AppCurriculum;

})(typeof window !== 'undefined' ? window : globalThis);
