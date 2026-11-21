/* ==========================================================
   SCIENCE MASTER — L-5 Good Health & Nutrition
   CBSE Class 5 Curriculum Data Store
   Zero External Dependencies | Pure Vanilla ES6
   ========================================================== */

const CHAPTER_L5_HEALTH = {
    id: 'ch5_health',
    number: 'L-5',
    targetStars: 10,
    title: 'Good Health & Nutrition',
    sub: 'Nutrients, Food Pyramid, Deficiency Diseases & Hygiene',
    themeColor: '#06b6d4',
    icon: '🥗',
    summary: 'Explore balanced diets, the body’s energy reserves during fasting, deficiency diseases, vectors like mosquitoes, and the immune defense shield.',

    learnCards: [
      {
        badge: 'Nutrient Architecture',
        title: '🧱 The Body’s Construction & Fuel',
        metaphor: 'Your body is an active skyscraper: Carbs are the electricity, Proteins are the steel beams, Fats are the thermal insulation, and Vitamins are the master repair tools!',
        points: [
          '<strong>Carbohydrates:</strong> Immediate energy providers (rice, potatoes, bread, glucose).',
          '<strong>Proteins:</strong> Body-building nutrients for growth, cellular repair, and muscle building (eggs, pulses, fish, milk).',
          '<strong>Fats:</strong> Concentrated reserve fuel, shock absorbers for vital organs, and thermal blankets keeping the body warm (butter, ghee, oil, nuts).',
          '<strong>Vitamins & Minerals:</strong> Protective nutrients required in small amounts to ward off infections and sustain organ function.',
          '<strong>Roughage (Dietary Fiber):</strong> Indigestible plant material essential for bowel regularity and waste elimination.'
        ],
        thinkPrompt: 'Why does a marathon runner drink glucose water right before a race instead of eating a big block of cheese?',
        checkQuestions: [
                  {
                            "subtopic": "Energy Fuel (Carbohydrates & Fats)",
                            "question": "Why does a sports coach give athletes glucose water right before a sprint instead of a block of cheese?",
                            "options": [
                                      "Glucose is a simple carbohydrate that absorbs into the blood almost instantly for quick energy.",
                                      "Glucose builds bone and muscle fibers in seconds during a sprint.",
                                      "Cheese makes human bones too heavy to run fast."
                            ],
                            "correct": 0,
                            "explanation": "Carbohydrates (especially simple sugars like glucose) provide rapid, accessible fuel! Fats and proteins take hours of complex digestion to release energy."
                  },
                  {
                            "subtopic": "Body-Building Proteins & Roughage",
                            "question": "Why does a growing 10-year-old child need pulses, milk, and eggs (proteins), plus raw vegetable salads (roughage)?",
                            "options": [
                                      "Proteins build new cells and muscle tissues, while roughage (fiber) prevents constipation by adding bulk to food.",
                                      "Proteins turn directly into red blood cells in minutes.",
                                      "Roughage destroys all stomach acid immediately."
                            ],
                            "correct": 0,
                            "explanation": "Proteins are body-building nutrients essential for cellular growth and tissue repair. Roughage (fiber) cannot be digested but is crucial for healthy bowel movement!"
                  }
        ]
      },
      {
        badge: 'Metabolic Deduction',
        title: '🔋 The Emergency Power Bank',
        metaphor: 'Why didn’t Shama faint after fasting for 2 whole days? Her body activated its secret internal pantry!',
        points: [
          'When food intake pauses, blood glucose levels are maintained by breaking down <strong>glycogen</strong> stored in the liver.',
          'Once glycogen is depleted, the body taps into <strong>adipose fat reserves</strong>, burning them to release continuous energy for the brain and heart.',
          'This stored reserve keeps vital organs functioning smoothly during temporary fasting.'
        ],
        thinkPrompt: 'If fats give more energy than carbs, why don’t we just eat 100% butter every single day?',
        checkQuestions: [
                  {
                            "subtopic": "Balanced Diet Proportions",
                            "question": "Why shouldn't a person eat only butter and fat, even though fat stores the most energy per gram?",
                            "options": [
                                      "Fats have zero calories and starve the brain cells.",
                                      "The body also needs proteins for repair, vitamins for protection, and excess fat causes heart disease.",
                                      "Butter neutralizes stomach acid completely."
                            ],
                            "correct": 1,
                            "explanation": "A balanced diet requires all 5 nutrient groups. Fats are backup insulation and energy reserves, but excess fats lead to obesity and heart disease, and cannot replace proteins or vitamins!"
                  },
                  {
                            "subtopic": "Emergency Energy Reserves in Fasting",
                            "question": "When a person fasts for two whole days without food, what does the body consume to keep the heart beating and brain working?",
                            "options": [
                                      "Stored glycogen in the liver and backup fat reserves under the skin.",
                                      "The stomach absorbs oxygen from the lungs directly.",
                                      "The body runs entirely on saliva."
                            ],
                            "correct": 0,
                            "explanation": "The human body is an efficient metabolic machine! During fasting, it first burns glycogen stored in the liver, and then taps into fat deposits under the skin for fuel."
                  }
        ]
      },
      {
        badge: 'Nutritional Traps',
        title: '⚠️ Deficiency Diseases',
        metaphor: 'Missing just one micronutrient is like missing a tiny screw in an aircraft engine — symptoms begin showing quickly!',
        points: [
          '<strong>Vitamin A → Night Blindness:</strong> Inability to see in dim light (Sources: carrots, papaya, green leafy vegetables).',
          '<strong>Vitamin B1 → Beriberi:</strong> Affects the heart and nervous system, causing muscle weakness (Sources: unpolished rice, cereals, milk).',
          '<strong>Vitamin C → Scurvy:</strong> Bleeding gums and loose teeth (Sources: amla, citrus fruits, tomatoes).',
          '<strong>Vitamin D & Calcium → Rickets:</strong> Soft bones leading to bowed legs and pigeon chest in children (Sources: sunlight, milk, eggs).',
          '<strong>Iron → Anaemia:</strong> Lack of red blood cell haemoglobin; person feels chronically tired and pale (Sources: dates, spinach, apples, jaggery).',
          '<strong>Iodine → Goitre:</strong> Swelling of the thyroid gland in the neck region (Source: iodised salt).'
        ],
        thinkPrompt: 'Why do doctors tell kids with bowed legs to play outside in morning sunlight and drink fresh milk?',
        checkQuestions: [
                  {
                            "subtopic": "Vitamin D & Calcium (Rickets)",
                            "question": "Why do pediatricians prescribe vitamin D and calcium to children suffering from bowed legs (Rickets)?",
                            "options": [
                                      "Vitamin D helps bones absorb calcium and harden properly under body weight.",
                                      "Vitamin D kills the bacteria that infect bone marrow.",
                                      "Calcium increases the volume of blood in the leg veins."
                            ],
                            "correct": 0,
                            "explanation": "Calcium provides the hard mineral structure of bones, while Vitamin D is the essential catalyst needed for intestines to absorb calcium! Without both, bones remain soft and bow under weight (Rickets)."
                  },
                  {
                            "subtopic": "Vitamin C & Scurvy (Bleeding Gums)",
                            "question": "If an ancient sailor on a long voyage has bleeding gums and slow-healing wounds, which food will quickly cure him?",
                            "options": [
                                      "Dry salted meat and white bread (starch).",
                                      "Fresh lemons, oranges, and amla (rich in Vitamin C).",
                                      "Boiled eggs and cheese (proteins)."
                            ],
                            "correct": 1,
                            "explanation": "Bleeding gums and loose teeth are classic symptoms of Scurvy, caused by deficiency of Vitamin C! Fresh citrus fruits and amla cure scurvy quickly."
                  },
                  {
                            "subtopic": "Iron (Anaemia) & Iodine (Goitre)",
                            "question": "A student looks pale, feels chronically tired and weak, and has low haemoglobin. What nutrient is missing from their diet?",
                            "options": [
                                      "Iron (found in spinach, jaggery, beetroot, and apples).",
                                      "Vitamin D from sunlight.",
                                      "Iodised salt for thyroid gland."
                            ],
                            "correct": 0,
                            "explanation": "Iron is the essential mineral required to build haemoglobin in red blood cells. Lack of iron leads to Anaemia, causing paleness and fatigue!"
                  }
        ]
      },
      {
        badge: 'Disease & Defense',
        title: '🛡️ The Immune Fortress & Vectors',
        metaphor: 'Germs are microscopic invaders; your immune system is the castle guard; and mosquitoes are hostile transport helicopters!',
        points: [
          '<strong>Pathogen:</strong> Disease-causing microscopic germ (bacteria, virus, protozoa, fungi). When it multiplies inside you, it causes an <strong>infection</strong>.',
          '<strong>Vector:</strong> An organism (like female Anopheles mosquito) that carries pathogens from an infected person to a healthy host.',
          '<strong>Mosquito Control:</strong> Mosquitoes lay eggs in stagnant water. Spraying a thin film of kerosene or oil on water prevents larvae from breathing oxygen, cutting off the life cycle!',
          '<strong>Vaccination:</strong> Introduces weakened antigens to train your immune system to produce antibodies without falling ill.'
        ],
        thinkPrompt: 'How does pouring a spoonful of oil on a puddle in your garden protect your whole neighborhood from dengue?',
        checkQuestions: [
                  {
                            "subtopic": "Vector Control (Mosquitoes)",
                            "question": "Why does pouring a thin film of oil on stagnant puddle water stop mosquito breeding?",
                            "options": [
                                      "Mosquito larvae breathe atmospheric air through surface tubes; the oil film cuts off their oxygen supply.",
                                      "The smell of oil scares adult mosquitoes away to another city.",
                                      "Oil instantly dissolves all mosquito eggs into water."
                            ],
                            "correct": 0,
                            "explanation": "Mosquito larvae hang upside down beneath the water surface, poking tiny breathing tubes into the air. An oil film suffocates them without using toxic chemical sprays!"
                  },
                  {
                            "subtopic": "Communicable Diseases vs Vaccination",
                            "question": "Which of the following diseases can NOT spread from person to person through sneezing, coughing, or touch?",
                            "options": [
                                      "Common cold, Influenza, and Chickenpox (Communicable infections).",
                                      "Scurvy, Rickets, and Anaemia (Non-communicable deficiency diseases).",
                                      "Cholera and Typhoid (Water-borne germ diseases)."
                            ],
                            "correct": 1,
                            "explanation": "Deficiency diseases (like Scurvy, Rickets, and Anaemia) are non-communicable! They are caused by dietary nutrient deficiencies, never by infectious pathogens or germs."
                  }
        ]
      }
    ],

    examTraps: [
      {
        id: 'trap_l5_fasting',
        student: 'Sameer',
        question: 'Shama did not eat food for two days during a religious fast, yet she remained healthy and active. Explain why.',
        studentAnswer: 'Shama didn’t need any energy because she was resting and sleeping all day.',
        prompt: 'What physiological principle did Sameer overlook?',
        options: [
          'The human body completely shuts down internal energy consumption during sleep and fasting.',
          'The stomach produces its own carbohydrates when empty to sustain daily physical activity.',
          'Even when resting, the body requires continuous energy for vital organs (heart, lungs, brain), which it obtains by breaking down stored liver glycogen and body fats.'
        ],
        correctIndex: 2,
        teacherFeedback: 'Spot on! The basal metabolic rate keeps organs functioning. Shama’s body unlocked energy by hydrolyzing stored glycogen and adipose fat reserves.'
      },
      {
        id: 'trap_l5_milk',
        student: 'Kavya',
        question: 'Is milk a complete food for growing school children? Justify.',
        studentAnswer: 'Yes, milk has 100% of everything, so children never need to eat fruits, vegetables, or green salads if they drink milk.',
        prompt: 'Diagnose Kavya’s dangerous nutrition misconception:',
        options: [
          'While milk is nutritious and provides calcium and protein, it lacks iron, vitamin C, and dietary roughage (fiber) needed for a balanced diet!',
          'Milk contains too much dietary fiber, which blocks the absorption of essential vitamins in the intestine.',
          'Milk only provides water and fats, so it cannot support bone or muscle development.'
        ],
        correctIndex: 0,
        teacherFeedback: 'Brilliant catch! Milk is an excellent food for infants, but growing kids and adults require iron (for blood), vitamin C (for immunity), and dietary fiber (for digestion).'
      },
      {
        id: 'trap_l5_mosquito',
        student: 'Sneha',
        question: 'What is the most effective way to prevent the spread of malaria in a neighborhood?',
        studentAnswer: 'Take malaria tablets every day before going to school so mosquitoes will not breed in garden puddles.',
        prompt: 'Where did Sneha confuse preventive measures?',
        options: [
          'Malaria tablets only kill mosquito larvae when washed into puddles through rainwater runoff.',
          'Tablets treat disease in humans after infection, but eliminating stagnant water and applying an oil film suffocates mosquito larvae, stopping vector breeding at the source!',
          'Malaria is airborne like influenza, so wearing face masks in the classroom is more effective than eliminating standing water.'
        ],
        correctIndex: 1,
        teacherFeedback: 'Exactly right! Breaking the vector breeding cycle by removing stagnant water is public health priority #1.'
      },
      {
        id: 'trap_l5_nutrients',
        student: 'Vikram',
        question: 'Classify carbohydrates and proteins based on their nutritional functions.',
        studentAnswer: 'Carbohydrates build body muscles and heal wounds, while proteins are fast fuels burned for sprint energy.',
        prompt: 'Identify Vikram’s nutrient swap error:',
        options: [
          'Carbohydrates and proteins both build muscle tissue equally, while only fats supply daily calories.',
          'Vikram reversed them: Carbohydrates are primary energy fuels (glucose); Proteins are body-building blocks for growth and tissue repair!',
          'Proteins only protect the body from germs like vitamins, while carbohydrates provide structural bone strength.'
        ],
        correctIndex: 1,
        teacherFeedback: 'Perfect teacher diagnosis! Carbohydrates supply quick fuel (glucose). Proteins supply amino acids to construct and repair muscle fibers.'
      }
    ],

    questions: [
      {
        id: 'l5_q1',
        category: 'mcq',
        source: 'Worksheet I • Q1',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'When a disease-causing pathogen enters and multiplies inside your body tissues, the medical condition is termed a/an __________.',
        options: [
          'Vaccination',
          'Infection',
          'Treatment',
          'Injection'
        ],
        correct: 1,
        explanation: 'Infection occurs when pathogenic microorganisms (bacteria, viruses) invade and multiply within the host’s tissues.',
        takeaway: 'Pathogen multiplication = Infection.'
      },
      {
        id: 'l5_q2',
        category: 'mcq',
        source: 'Worksheet I • Q2',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Deficiency of which vitamin causes soft, weakened bones resulting in bowed legs and pigeon chest among growing children?',
        options: [
          'Vitamin A',
          'Vitamin B1',
          'Vitamin C',
          'Vitamin D'
        ],
        correct: 3,
        explanation: 'Vitamin D facilitates calcium absorption into bone matrices. Its deficiency leads to Rickets in children, characterized by soft, curved leg bones.',
        takeaway: 'Bowed legs & pigeon chest → Rickets (Vitamin D & Calcium deficiency).'
      },
      {
        id: 'l5_q3',
        category: 'mcq',
        source: 'Worksheet I • Q4',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Complete the scientific analogy:<br><strong>Virus : Polio :: __________ : Typhoid</strong>',
        options: [
          'Protozoa',
          'Fungi',
          'Bacteria',
          'Algae'
        ],
        correct: 2,
        explanation: 'Polio is caused by a virus (Poliovirus); Typhoid is caused by a bacterium (Salmonella Typhi).',
        takeaway: 'Polio = Virus | Typhoid = Bacteria | Malaria = Protozoa | Ringworm = Fungi.'
      },
      {
        id: 'l5_q4',
        category: 'mcq',
        source: 'Worksheet I • Q6 & Worksheet II • Section V',
        wsNumber: 1,
        marks: '1 Mark',
        image: 'images/l5_vector_mosquito.png',
        body: 'The illustration below shows insect <strong>Z</strong> (a mosquito vector) feeding on a human host. Mosquitoes lay eggs on stagnant water surfaces and transmit life-threatening diseases like malaria and dengue.<br><strong>Which combination of measures effectively controls the population of vector Z?</strong><br>i. Keeping our surroundings clean<br>ii. Spraying chemicals that kill mosquitoes<br>iii. Taking medicines that prevent such diseases<br>iv. Spraying a thin film of oil on stagnant water surfaces',
        options: [
          'i, ii, and iv',
          'i and ii only',
          'i and iii only',
          'All of the above options'
        ],
        correct: 0,
        explanation: 'Keeping surroundings clean (i), spraying insecticides (ii), and applying a thin film of oil on stagnant water (iv) directly eradicate mosquitoes and suffocate their larvae (oil blocks their breathing siphon tubes). Taking medicines (iii) treats infected individuals, but does not control or reduce the mosquito vector population in the environment.',
        takeaway: 'Vector control = Sanitation + chemical spraying + oil film on stagnant water to suffocate larvae (i, ii, iv).'
      },
      {
        id: 'l5_q5',
        category: 'mcq',
        source: 'Worksheet I • Q10',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Which nutrient provides the fastest, most readily accessible energy to the human bloodstream?',
        options: [
          'Butter',
          'Boiled egg',
          'Glucose',
          'Lemon'
        ],
        correct: 2,
        explanation: 'Glucose is a simple monosaccharide sugar that requires no complex digestion and is absorbed directly into the bloodstream for immediate cellular respiration.',
        takeaway: 'Instant energy = Glucose.'
      },
      {
        id: 'l5_q6',
        category: 'whoami',
        source: 'Worksheet II • Part V & VI',
        wsNumber: 2,
        marks: '1 Mark',
        body: '<strong>Who am I?</strong><br>I am an organism (such as a mosquito or housefly) that carries pathogens from an infected person to a healthy host without suffering from the disease myself.',
        options: [
          'Parasite',
          'Vector',
          'Antibiotic',
          'Vaccine'
        ],
        correct: 1,
        explanation: 'A vector is an intermediate biological carrier that transmits infectious pathogens from one host to another.',
        takeaway: 'Disease carrier organism = Vector.'
      },
      {
        id: 'l5_q7',
        category: 'whoami',
        source: 'Worksheet II • Part VI',
        wsNumber: 2,
        marks: '1 Mark',
        body: '<strong>Who am I?</strong><br>I am the fibrous, undigested plant material in whole grains and raw fruits that adds bulk to stools and prevents constipation.',
        options: [
          'Roughage (Dietary Fiber)',
          'Glucose',
          'Cholesterol',
          'Adipose tissue'
        ],
        correct: 0,
        explanation: 'Roughage cannot be digested by human enzymes, but it absorbs water and facilitates peristaltic movement through the intestines.',
        takeaway: 'Digestive cleaner bulk = Roughage.'
      },
      {
        id: 'l5_q8',
        category: 'compare',
        source: 'Worksheet II • Part III',
        wsNumber: 2,
        marks: '2 Marks',
        body: '<strong>Compare & Contrast:</strong> Beriberi vs Anaemia.<br>What is the key causative deficiency and symptom difference?',
        options: [
          'Beriberi is caused by Vitamin B1 deficiency affecting the nervous system & heart; Anaemia is caused by Iron deficiency causing fatigue and pallor.',
          'Beriberi is caused by lack of water; Anaemia is caused by lack of fats.',
          'Beriberi causes bleeding gums; Anaemia causes bowed leg bones.'
        ],
        correct: 0,
        explanation: 'Beriberi arises from deficient thiamine (Vit B1) impacting nerve conduction; Anaemia arises from insufficient iron to synthesize oxygen-carrying haemoglobin.',
        takeaway: 'Beriberi = Vitamin B1 (Nerves/Heart) | Anaemia = Iron (Low Haemoglobin/Fatigue).'
      },
      {
        id: 'l5_q9',
        category: 'compare',
        source: 'Worksheet III • Long Answer',
        wsNumber: 3,
        marks: '2 Marks',
        body: '<strong>Compare & Contrast:</strong> Communicable vs Non-communicable Diseases.<br>What is the fundamental distinction?',
        options: [
          'Communicable diseases spread from person to person via germs/air/water/vectors (e.g. flu, cholera); Non-communicable diseases do not spread (e.g. diabetes, rickets).',
          'Communicable diseases are caused by eating apples; Non-communicable diseases are caused by drinking water.',
          'Communicable diseases only affect animals; Non-communicable diseases affect humans.'
        ],
        correct: 0,
        explanation: 'Infectious diseases pass between individuals through biological agents; non-infectious conditions stem from nutritional deficiencies, lifestyle, or genetics.',
        takeaway: 'Communicable = Spreads via germs | Non-communicable = Deficiency or lifestyle, does not spread.'
      },
      {
        id: 'l5_q10',
        category: 'oddone',
        source: 'Worksheet I & II Synthesis',
        wsNumber: 1,
        marks: '1.5 Marks',
        body: '<strong>Choose the Odd One Out and Justify:</strong><br>Scurvy, Goitre, Malaria, Rickets.',
        options: [
          'Malaria is the odd one out: It is a communicable disease caused by a protozoan parasite and spread by a mosquito; Scurvy, Goitre, and Rickets are non-communicable nutritional deficiency diseases.',
          'Goitre because it affects the neck.',
          'Rickets because adults do not get it.'
        ],
        correct: 0,
        explanation: 'Scurvy (Vit C), Goitre (Iodine), and Rickets (Vit D) are nutritional deficiency disorders. Malaria is a protozoan infection transmitted by the female Anopheles mosquito vector.',
        takeaway: 'Vector-borne infection vs Nutrient deficiencies.'
      },
      {
        id: 'l5_q11',
        category: 'scenario',
        source: 'Worksheet II • Scenario I (Shama’s Fasting)',
        wsNumber: 2,
        marks: '2 Marks',
        body: 'Shama fasted for two days drinking only water, yet she felt perfectly alert and walked normally. What biological mechanism supplied her energy?',
        options: [
          'Her body hydrolyzed stored liver glycogen and tapped into adipose fat reserves to release glucose and ketones for energy.',
          'Her body went into hibernation and required zero calories.',
          'Water provided her body with 2,000 calories per glass.'
        ],
        correct: 0,
        explanation: 'The liver and adipose tissue act as metabolic buffers. During periods of fasting, stored glycogen is broken down first, followed by triglycerides from fat stores.',
        takeaway: 'Body energy backup: Stored Glycogen → Stored Fats.'
      },
      {
        id: 'l5_q12',
        category: 'scenario',
        source: 'Worksheet II • Scenario VII (Danny’s Legs)',
        wsNumber: 2,
        marks: '2 Marks',
        image: 'images/l5_danny_rickets.png',
        body: 'A school health checkup reveals that 10-year-old Danny has curved, outward-bowed leg bones and complains of bone ache.<br><strong>What disorder is Danny suffering from, and what dietary changes are prescribed?</strong>',
        options: [
          'Rickets caused by Vitamin D & Calcium deficiency; he must consume milk, eggs, fish, and get morning sunlight exposure.',
          'Goitre caused by lack of salt; he must eat more potato chips.',
          'Scurvy caused by lack of lemons; he must drink lemonade only.'
        ],
        correct: 0,
        explanation: 'In growing children, inadequate calcium and vitamin D prevent bone mineralization, causing the weight of the upper body to bow the leg bones outward (Rickets).',
        takeaway: 'Rickets treatment: Calcium-rich dairy, eggs, and sunlight for Vitamin D synthesis.'
      },
      {
        id: 'l5_q13',
        category: 'scenario',
        source: 'Worksheet II • Part IV (Tim & Bob’s Classroom Rule)',
        wsNumber: 2,
        marks: '2 Marks',
        body: 'When Tim sneezed without covering his face, his friend Bob asked him to cover his mouth with a handkerchief. Why is Bob’s advice scientifically vital?',
        options: [
          'Sneezing propels thousands of microscopic droplet nuclei laden with germs into the air, spreading airborne communicable diseases to nearby peers.',
          'Sneezing in open air causes the room temperature to drop rapidly.',
          'Covering the mouth makes the sound softer for people sleeping.'
        ],
        correct: 0,
        explanation: 'Respiratory pathogens (like influenza virus) travel in microscopic aerosols. Covering the mouth stops droplet expulsion and prevents disease transmission.',
        takeaway: 'Respiratory hygiene halts the airborne spread of communicable pathogens.'
      },
      {
        id: 'l5_q14',
        category: 'worksheet',
        source: 'Worksheet III • Long Answer I',
        wsNumber: 3,
        marks: '2 Marks',
        image: 'images/l5_food_pyramid.png',
        body: 'Observe the Food Pyramid diagram below with levels <strong>P, Q, R, and S</strong>.<br>Bob met with an accident and underwent major surgery. His doctor advised him to consume a large quantity of the nutrient represented by <strong>Level Q</strong> during his hospital recovery.<br><strong>Why was Level Q prescribed for Bob?</strong>',
        options: [
          'Level Q represents Proteins (pulses, milk, eggs, fish), which are bodybuilding nutrients essential for cellular growth and rapid repair of damaged body tissues post-surgery.',
          'Level Q represents Carbohydrates needed only for running sprints.',
          'Level Q represents Fats (Level P) to keep his body warm.',
          'Level Q represents roughage to clean his teeth.'
        ],
        correct: 0,
        explanation: 'Proteins (Level Q) are the fundamental building blocks of the human body. They are indispensable for cellular mitosis, synthesis of new muscle fibers, wound healing, and tissue regeneration after surgery. (Level P = Fats & Sweets, Level R = Fruits & Vegetables / Vitamins & Minerals, Level S = Cereals & Grains / Carbohydrates).',
        takeaway: 'Food Pyramid Level Q = Proteins (body-building & tissue repair post-surgery).'
      },
      {
        id: 'l5_q15',
        category: 'scenario',
        source: 'Worksheet II & III • Clinical Case Study',
        wsNumber: 3,
        marks: '2 Marks',
        image: 'images/l5_goitre.png',
        body: 'The illustration below depicts a patient suffering from abnormal enlargement of the thyroid gland in the front of the neck.<br><strong>Identify this disease, its root deficiency cause, and how it is easily prevented at home:</strong>',
        options: [
          'Goitre; caused by deficiency of mineral Iodine; prevented by using iodised salt regularly in daily meals.',
          'Scurvy; caused by lack of Vitamin C; prevented by eating oranges.',
          'Anaemia; caused by lack of Iron; prevented by drinking apple juice.',
          'Rickets; caused by lack of Vitamin D; prevented by sitting under electric lamps.'
        ],
        correct: 0,
        explanation: 'Goitre is an abnormal swelling of the thyroid gland in the neck caused by a deficiency of Iodine. Using iodised salt in cooking supplies the required trace iodine.',
        takeaway: 'Neck swelling = Goitre caused by Iodine deficiency. Prevent with iodised salt.'
      },
      {
        id: 'l5_q16',
        category: 'scenario',
        source: 'Worksheet III • Section IV (Tim\'s Backyard)',
        wsNumber: 3,
        marks: '2 Marks',
        image: 'images/l5_stagnant_water.png',
        body: 'The sketch below depicts conditions in Tim\'s backyard with uncollected refuse, discarded open containers, and puddles of stagnant water.<br><strong>What type of diseases are Tim and his family most prone to in this environment, and what are the two most crucial preventive steps?</strong>',
        options: [
          'Communicable diseases like malaria and dengue; prevented by disposing of garbage properly and eliminating stagnant water so mosquitoes cannot breed.',
          'Non-communicable deficiency diseases like scurvy; prevented by eating oranges.',
          'Genetic disorders; prevented by taking hot baths.',
          'Pneumonia caused by air conditioning; prevented by opening windows.'
        ],
        correct: 0,
        explanation: 'Uncollected rubbish and stagnant rainwater pools create ideal breeding grounds for disease vectors (female Anopheles mosquitoes for malaria, Aedes mosquitoes for dengue, and houseflies for cholera). The best defense is maintaining clean surroundings, covering water storage containers, and preventing water from stagnating.',
        takeaway: 'Stagnant water + open trash = Mosquito breeding → Communicable vector-borne outbreaks (Malaria & Dengue).'
      },
      {
        id: 'l5_q17',
        category: 'scenario',
        source: 'Worksheet I • Q5 (Uncovered Food & Vectors)',
        wsNumber: 1,
        marks: '1 Mark',
        image: 'images/l5_uncovered_food_flies.png',
        body: 'Observe the scenario in the illustration below where food is left uncovered and swarmed by houseflies.<br><strong>The scenario in this picture will lead directly to the spread of which disease?</strong>',
        options: [
          'Cholera',
          'Malaria',
          'Ringworm',
          'Night blindness'
        ],
        correct: 0,
        explanation: 'Houseflies sit on garbage, drains, and fecal matter, collecting pathogenic bacteria on their hairy legs and mouthparts. When they land on uncovered food, they transfer these microbes. Consuming this contaminated food or water leads to cholera, typhoid, and severe diarrheal infections.',
        takeaway: 'Uncovered food + housefly vectors = Food-borne diseases like Cholera. Always keep food covered!'
      },
      {
        id: 'l5_q18',
        category: 'mcq',
        source: 'Worksheet I • Q7 (Match Nutrients & Sources)',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Match the following vitamins and minerals with their food sources:<br><strong>P</strong> Calcium → (i) peas<br><strong>Q</strong> Vitamin B → (ii) amla<br><strong>R</strong> Iron → (iii) milk<br><strong>S</strong> Vitamin C → (iv) dates<br><strong>Choose the correct matching:</strong>',
        options: [
          'P–i, Q–ii, R–iii, S–iv',
          'P–iii, Q–i, R–iv, S–ii',
          'P–ii, Q–i, R–iv, S–iii',
          'P–iv, Q–iii, R–ii, S–i'
        ],
        correct: 1,
        explanation: 'Calcium is abundant in milk (P–iii). Vitamin B is found in peas and unpolished rice (Q–i). Iron is rich in dates and spinach (R–iv). Vitamin C is abundant in amla and citrus fruits (S–ii).',
        takeaway: 'Calcium→Milk | Vitamin B→Peas/Unpolished rice | Iron→Dates/Spinach | Vitamin C→Amla/Citrus'
      },
      {
        id: 'l5_q19',
        category: 'mcq',
        source: 'Worksheet I • Q9 (Immune System)',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Our body has a natural defense system that produces white blood cells and antibodies to fight against invading pathogens (germs). This protective system is called the __________.',
        options: [
          'Digestive system',
          'Muscular system',
          'Respiratory system',
          'Immune system'
        ],
        correct: 3,
        explanation: 'The immune system is the body\'s defense shield. White blood cells (WBCs) identify and destroy bacteria and viruses, while antibodies neutralize toxins produced by pathogens.',
        takeaway: 'Immune system = Body\'s defense army of WBCs + Antibodies fighting germs.'
      },
      {
        id: 'l5_q20',
        category: 'mcq',
        source: 'Worksheet I • Q11 (Naseem\'s Diet)',
        wsNumber: 1,
        marks: '1 Mark',
        body: 'Naseem\'s doctor suggested she should include fish, unpolished rice, and cereals in her diet regularly. Based on these food recommendations, Naseem is suffering from __________ deficiency.',
        options: [
          'Vitamin A',
          'Vitamin C',
          'Vitamin D',
          'Vitamin B'
        ],
        correct: 3,
        explanation: 'Fish, unpolished rice, and cereals are all rich sources of Vitamin B complex. Deficiency of Vitamin B causes Beriberi (affecting heart and nervous system).',
        takeaway: 'Vitamin B sources: Fish, unpolished rice, cereals, peas. Deficiency → Beriberi.'
      },
      {
        id: 'l5_q21',
        category: 'scenario',
        source: 'Worksheet II • Section II (Night Blindness)',
        wsNumber: 2,
        marks: '2 Marks',
        body: 'Complete the table:<br>A person cannot see properly in dim light or darkness. This condition is called __________.<br><strong>Identify the deficiency disease, the missing vitamin, and name two food sources rich in this vitamin.</strong>',
        options: [
          'Night blindness; caused by Vitamin A deficiency. Food sources: carrots, green leafy vegetables, milk, and liver.',
          'Color blindness; caused by Vitamin C deficiency. Food sources: oranges and lemons.',
          'Short-sightedness; caused by Iron deficiency. Food sources: dates and spinach.',
          'Snow blindness; caused by Calcium deficiency. Food sources: milk and cheese.'
        ],
        correct: 0,
        explanation: 'Vitamin A is essential for the light-sensitive pigment rhodopsin in the retina. Without it, the eyes cannot adjust to low-light conditions, causing night blindness.',
        takeaway: 'Night blindness = Vitamin A deficiency. Eat: Carrots 🥕, leafy greens 🥬, milk 🥛.'
      },
      {
        id: 'l5_q22',
        category: 'scenario',
        source: 'Worksheet II • Section VIII (True/False Reasoning)',
        wsNumber: 2,
        marks: '2 Marks',
        body: '"Milk is called a complete food because it contains ALL nutrients required by the human body." <br><strong>Is this statement TRUE or FALSE? Reason out your answer.</strong>',
        options: [
          'FALSE — Milk contains most nutrients (proteins, fats, carbohydrates, calcium, Vitamin A, D) and is nearly complete for infants. However, it lacks sufficient Vitamin C, Iron, and dietary roughage (fiber) needed by older children and adults.',
          'TRUE — Milk contains every single nutrient including Vitamin C, Iron, and fiber in perfect quantities.',
          'FALSE — Milk only contains water and calcium, nothing else.',
          'TRUE — Milk is the only food anyone ever needs to survive forever.'
        ],
        correct: 0,
        explanation: 'Milk is called an almost-complete food because it provides proteins, fats, carbs, calcium, and several vitamins. But it is deficient in Vitamin C, Iron, and roughage (fiber).',
        takeaway: 'Milk = Almost complete food, but LACKS Vitamin C, Iron, and dietary fiber.'
      },
      {
        id: 'l5_q23',
        category: 'scenario',
        source: 'Worksheet III • Section II (Karan & Raj Picnic)',
        wsNumber: 3,
        marks: '3 Marks',
        body: 'Karan and Raj went for a school picnic. Raj carried drinking water from home. Karan drank water from pouches available at a roadside stall and later fell very sick with severe diarrhea and vomiting.<br><strong>Why did Karan fall sick? What disease could he have? Suggest one method to make water safe for drinking.</strong>',
        options: [
          'Karan drank contaminated/unsafe roadside water containing harmful germs → Water-borne disease Cholera. Water can be made safe by boiling it before drinking.',
          'Karan ate too much food at the picnic causing overeating → Obesity. Solution: eat less food.',
          'Karan was bitten by a mosquito at the picnic → Malaria. Solution: use mosquito net.',
          'Karan drank cold water causing a sore throat → Common cold. Solution: drink warm water.'
        ],
        correct: 0,
        explanation: 'Roadside water pouches may contain harmful bacteria from unclean water sources. Cholera is a dangerous water-borne disease caused by contaminated drinking water. Boiling kills bacteria and parasites.',
        takeaway: 'Unhygienic water → Cholera (water-borne). Prevention: Boil water before drinking!'
      },
      {
        id: 'l5_q24',
        category: 'scenario',
        source: 'Worksheet III • Section III (Dr. Meera\'s Clinic)',
        wsNumber: 3,
        marks: '5 Marks',
        body: 'At Dr. Meera\'s clinic: <strong>Ben</strong> eats junk food and is overweight; <strong>Tom</strong> can\'t see in the dark; <strong>Bob</strong> has bleeding gums; <strong>Kim</strong> has neck swelling; <strong>Jim</strong> fractures bones easily.<br><strong>Identify the disease AND nutritional cause for EACH patient.</strong>',
        options: [
          'Ben: Obesity (excess junk food/fats) | Tom: Night blindness (Vitamin A deficiency) | Bob: Scurvy (Vitamin C deficiency) | Kim: Goitre (Iodine deficiency) | Jim: Osteoporosis (Calcium/Vitamin D deficiency).',
          'All five patients have the same disease: Malaria from mosquito bites.',
          'Ben: Malaria | Tom: Cholera | Bob: Typhoid | Kim: Dengue | Jim: Beriberi.',
          'Ben: Scurvy | Tom: Goitre | Bob: Obesity | Kim: Night blindness | Jim: Beriberi.'
        ],
        correct: 0,
        explanation: 'Each patient\'s symptoms map to a specific nutritional deficiency: excess fats→Obesity, no Vitamin A→Night blindness, no Vitamin C→Scurvy (bleeding gums), no Iodine→Goitre (neck swelling), no Calcium→weak brittle bones.',
        takeaway: 'Match symptoms to deficiency: Bleeding gums→Scurvy(VitC) | Can\'t see in dark→Night blindness(VitA) | Neck swelling→Goitre(Iodine) | Brittle bones→Calcium/VitD deficiency.'
      }
    ]
  };
