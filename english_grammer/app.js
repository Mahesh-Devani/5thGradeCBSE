/* ============================================
   English Grammar Master — Application Logic
   Class 5 CBSE — Fun Thinking-Based Learning
   ============================================ */

// ============================================
// TOPIC DATA — Lessons & Exercise Banks
// ============================================

const TOPIC_DATA = {
  articles: {
    id: 'articles',
    title: 'Articles',
    subtitle: 'The Article Detective 🔍',
    icon: '🔍',
    color: '#3b82f6',
    lesson: {
      intro: 'Articles are tiny words — <strong>a</strong>, <strong>an</strong>, and <strong>the</strong> — that go before nouns. They might be small, but getting them wrong changes everything!',
      sections: [
        {
          title: '🅰️ "A" — Any One Thing',
          content: '<p>Use <strong>"a"</strong> before words that start with a <strong>consonant SOUND</strong>.</p>',
          examples: [
            { text: '<span class="correct">a</span> ball, <span class="correct">a</span> cat, <span class="correct">a</span> dog' },
            { text: '<span class="correct">a</span> university — sounds like "yoo-niversity" (consonant sound!)' },
            { text: '<span class="correct">a</span> one-eyed pirate — sounds like "wun" (consonant sound!)' }
          ],
          think: '💡 It\'s about the SOUND, not the letter! "A university" is correct because "university" starts with a "yoo" sound.'
        },
        {
          title: '🔤 "An" — Any One Thing (Vowel Sound)',
          content: '<p>Use <strong>"an"</strong> before words that start with a <strong>vowel SOUND</strong> (a, e, i, o, u sounds).</p>',
          examples: [
            { text: '<span class="correct">an</span> apple, <span class="correct">an</span> egg, <span class="correct">an</span> umbrella' },
            { text: '<span class="correct">an</span> honest man — the "h" is silent, so it sounds like "onest"!' },
            { text: '<span class="correct">an</span> hour — sounds like "our" (vowel sound!)' }
          ],
          think: '💡 "An honest man" — the H is silent! Your ear hears "onest", which starts with a vowel sound. Trust your ears, not your eyes!'
        },
        {
          title: '👉 "The" — That Specific One',
          content: '<p>Use <strong>"the"</strong> when both the speaker and listener know <strong>exactly which one</strong> you mean.</p>',
          examples: [
            { text: '<span class="correct">The</span> sun is shining — there\'s only ONE sun!' },
            { text: 'Please close <span class="correct">the</span> door — we both know WHICH door' },
            { text: '<span class="correct">The</span> Taj Mahal is in Agra — there\'s only one Taj Mahal' }
          ],
          think: '💡 "The" is like pointing your finger. If you can point at the exact thing, use "the"!'
        },
        {
          title: '🚫 When NOT to Use Articles',
          content: '<p>Some nouns don\'t need any article at all!</p>',
          examples: [
            { text: 'I love <span class="incorrect">the</span> music → I love music ✅ (general idea)' },
            { text: '<span class="incorrect">The</span> India is a great country → India is a great country ✅ (country names)' },
            { text: 'She plays <span class="incorrect">the</span> cricket → She plays cricket ✅ (sports)' }
          ],
          think: '💡 No article needed for: general ideas (music, love), most country names (India, Japan), sports (cricket, football), and meals (breakfast, lunch).'
        }
      ]
    },
    exercises: [
      { type: 'mcq', question: 'Why do we say "an hour" but "a house"?', options: ['Because "hour" is longer than "house"', 'Because "hour" starts with a vowel SOUND (silent H), while "house" starts with a consonant "h" sound', 'Because "hour" is about time', 'Because "house" is bigger'], correct: 1, explanation: 'The H in "hour" is silent — it sounds like "our" (vowel sound). But "house" has a clear "h" sound. Articles follow SOUNDS, not letters!' },
      { type: 'mcq', question: 'Which is correct: "a university" or "an university"?', options: ['"an university" — because U is a vowel', '"a university" — because it starts with a "yoo" consonant sound', 'Both are correct', 'Neither — no article needed'], correct: 1, explanation: '"University" starts with a "yoo" sound, which is a consonant sound. So we say "a university", not "an university". Listen to the sound!' },
      { type: 'fill', question: 'Please give me ___ orange from ___ basket on the table.', options: ['a, a', 'an, a', 'an, the', 'the, an'], correct: 2, explanation: '"An orange" — orange starts with a vowel sound. "The basket" — we know which specific basket (the one on the table).' },
      { type: 'fill', question: '___ elephant is ___ largest land animal.', options: ['A, a', 'An, the', 'The, the', 'An, a'], correct: 2, explanation: '"The elephant" — we\'re talking about elephants in general (as a species). "The largest" — there can only be one largest!' },
      { type: 'mcq', question: '"She is ___ honest girl." Why is "an" correct here?', options: ['Because "girl" starts with a consonant', 'Because "honest" starts with a vowel SOUND — the H is silent', 'Because she is very honest', 'Because "honest" is a long word'], correct: 1, explanation: 'In "honest", the H is silent. We hear "onest" which starts with a vowel sound "o". So it\'s "an honest", not "a honest"!' },
      { type: 'fill', question: 'I want to be ___ engineer when I grow up.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Engineer" starts with a vowel sound "en". Since we\'re talking about any engineer (not a specific one), we use "an".' },
      { type: 'mcq', question: 'Which sentence is WRONG?', options: ['The Ganga is a holy river.', 'She plays the piano beautifully.', 'I like the cricket very much.', 'An owl can see in the dark.'], correct: 2, explanation: 'Sports don\'t take "the"! It should be "I like cricket very much." But musical instruments DO take "the" — "She plays the piano" is correct!' },
      { type: 'fill', question: 'My father is ___ M.B.B.S. doctor.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"M.B.B.S." is pronounced "em-bee-bee-ess". It starts with the vowel sound "em". So we say "an M.B.B.S. doctor"!' },
      { type: 'mcq', question: '"I saw ___ one-eyed man." Which article fits?', options: ['"an" — because "one" starts with O, a vowel', '"a" — because "one" sounds like "wun" (consonant sound)', '"the" — because there was only one', 'No article needed'], correct: 1, explanation: 'Even though "one" starts with the letter O, it SOUNDS like "wun" — a consonant sound. So we say "a one-eyed man"!' },
      { type: 'mcq', question: 'When do we use "the"?', options: ['Before every noun', 'When we\'re talking about something general', 'When both speaker and listener know exactly WHICH thing', 'Only before vowels'], correct: 2, explanation: '"The" points to a SPECIFIC thing. "Pass me the salt" — we both know which salt. "I like salt" — salt in general, no "the" needed.' },
      { type: 'fill', question: '___ Amazon is ___ longest river in South America.', options: ['A, a', 'The, the', 'An, the', 'The, a'], correct: 1, explanation: '"The Amazon" — specific river. "The longest" — superlatives always use "the" because there can be only one longest!' },
      { type: 'mcq', question: 'Which sentence uses articles correctly?', options: ['An European tourist visited a India.', 'A European tourist visited India.', 'The European tourist visited an India.', 'An European tourist visited the India.'], correct: 1, explanation: '"European" sounds like "yoo-ropean" — consonant sound, so "a European". Country names like "India" don\'t take articles!' }
    ]
  },

  simpleTenses: {
    id: 'simpleTenses',
    title: 'Simple Tenses',
    subtitle: 'The Time Machine ⏰',
    icon: '⏰',
    color: '#8b5cf6',
    lesson: {
      intro: 'Imagine you have a <strong>Time Machine</strong>! Simple tenses take you to three zones: <strong>Yesterday</strong> (Past), <strong>Today</strong> (Present), and <strong>Tomorrow</strong> (Future).',
      sections: [
        {
          title: '📅 Simple Present — "Every day" zone',
          content: '<p>Use for <strong>habits</strong>, <strong>facts</strong>, and things that are <strong>always true</strong>.</p>',
          examples: [
            { text: 'I <span class="highlight">play</span> cricket every evening. (habit)' },
            { text: 'The sun <span class="highlight">rises</span> in the east. (fact — always true)' },
            { text: 'She <span class="highlight">goes</span> to school by bus. (routine)' }
          ],
          think: '💡 Signal words: every day, always, usually, sometimes, often, never. If you see these, it\'s Simple Present!'
        },
        {
          title: '⬅️ Simple Past — "Yesterday" zone',
          content: '<p>Use for actions that are <strong>done and finished</strong>. The event is over!</p>',
          examples: [
            { text: 'I <span class="highlight">played</span> cricket yesterday. (finished action)' },
            { text: 'She <span class="highlight">went</span> to the market last week. (over and done)' },
            { text: 'We <span class="highlight">ate</span> pizza for dinner. (already happened)' }
          ],
          think: '💡 Signal words: yesterday, last week, last year, ago, in 2020. These tell you the action is in the past!'
        },
        {
          title: '➡️ Simple Future — "Tomorrow" zone',
          content: '<p>Use for things that <strong>haven\'t happened yet</strong> but will happen.</p>',
          examples: [
            { text: 'I <span class="highlight">will play</span> cricket tomorrow. (hasn\'t happened yet)' },
            { text: 'She <span class="highlight">will go</span> to college next year. (future plan)' },
            { text: 'It <span class="highlight">will rain</span> tonight. (prediction)' }
          ],
          think: '💡 Signal words: tomorrow, next week, next year, soon, later. The magic word is "will" — it always points to the future!'
        },
        {
          title: '🔄 The Transformation Trick',
          content: '<p>You can transform any sentence across time zones!</p>',
          examples: [
            { text: 'Present: I <span class="highlight">eat</span> rice. → Past: I <span class="highlight">ate</span> rice. → Future: I <span class="highlight">will eat</span> rice.' },
            { text: 'Present: She <span class="highlight">writes</span> a letter. → Past: She <span class="highlight">wrote</span> a letter. → Future: She <span class="highlight">will write</span> a letter.' }
          ],
          think: '💡 Notice: Present uses the base verb. Past changes the verb (often adding -ed, but many are irregular!). Future adds "will" before the base verb.'
        }
      ]
    },
    exercises: [
      { type: 'mcq', question: '"I go to school every day." What tense is this?', options: ['Simple Past', 'Simple Present', 'Simple Future', 'Present Continuous'], correct: 1, explanation: '"Every day" is the signal — it\'s a habit/routine. The verb "go" is in base form. This is Simple Present!' },
      { type: 'mcq', question: '"She visited her grandmother last Sunday." What tense?', options: ['Simple Present', 'Simple Future', 'Simple Past', 'Past Continuous'], correct: 2, explanation: '"Last Sunday" tells us it already happened. "Visited" is the past form of "visit" (verb + ed). This is Simple Past!' },
      { type: 'fill', question: 'We ___ to the zoo tomorrow.', options: ['go', 'went', 'will go', 'going'], correct: 2, explanation: '"Tomorrow" is a future signal word. We need "will + base verb" = "will go".' },
      { type: 'fill', question: 'The children ___ in the park yesterday.', options: ['play', 'played', 'will play', 'plays'], correct: 1, explanation: '"Yesterday" = Simple Past. "Play" becomes "played" (add -ed) in the past.' },
      { type: 'mcq', question: 'Transform to Simple Past: "She writes a poem."', options: ['She writed a poem.', 'She will write a poem.', 'She wrote a poem.', 'She is writing a poem.'], correct: 2, explanation: '"Write" is an irregular verb — its past form is "wrote", not "writed"! Some verbs don\'t follow the -ed rule.' },
      { type: 'fill', question: 'The Earth ___ around the Sun.', options: ['revolved', 'will revolve', 'revolves', 'revolving'], correct: 2, explanation: 'This is a scientific fact — always true! Facts use Simple Present. With "The Earth" (singular), we add -s → "revolves".' },
      { type: 'mcq', question: 'Which signal word tells you to use Simple Future?', options: ['Yesterday', 'Every day', 'Last month', 'Next week'], correct: 3, explanation: '"Next week" is in the future — it hasn\'t happened yet! "Yesterday" and "last month" = past. "Every day" = present.' },
      { type: 'fill', question: 'My father ___ a car last year.', options: ['buys', 'bought', 'will buy', 'buy'], correct: 1, explanation: '"Last year" = Simple Past. "Buy" is irregular — its past form is "bought", not "buyed"!' },
      { type: 'mcq', question: '"Water boils at 100°C." Why is this Simple Present?', options: ['Because water is boiling right now', 'Because it happened in the past', 'Because it\'s a scientific fact — always true', 'Because it will happen tomorrow'], correct: 2, explanation: 'Universal facts and scientific truths ALWAYS use Simple Present, even though they\'re true in past, present, and future. "Water boils" = fact.' },
      { type: 'fill', question: 'She always ___ her homework before dinner.', options: ['did', 'does', 'will do', 'done'], correct: 1, explanation: '"Always" is a Simple Present signal word — it\'s a habit. With "she" (third person), we use "does".' },
      { type: 'mcq', question: 'Transform to Simple Future: "They eat mangoes."', options: ['They ate mangoes.', 'They will eat mangoes.', 'They are eating mangoes.', 'They eated mangoes.'], correct: 1, explanation: 'Simple Future = will + base verb. "Will eat" — just add "will" before the original verb. Easy!' },
      { type: 'fill', question: 'Ravi ___ to Mumbai three days ago.', options: ['goes', 'will go', 'went', 'go'], correct: 2, explanation: '"Three days ago" = Simple Past. "Go" is irregular — its past form is "went".' }
    ]
  },

  continuousTenses: {
    id: 'continuousTenses',
    title: 'Continuous Tenses',
    subtitle: 'Caught in the Act! 📸',
    icon: '📸',
    color: '#06b6d4',
    lesson: {
      intro: 'Imagine you have a <strong>camera</strong> 📸 that freezes a moment in time. Continuous tenses describe actions that are <strong>happening right at that moment</strong> — like a snapshot!',
      sections: [
        {
          title: '📸 Present Continuous — "Right NOW!"',
          content: '<p>Use when something is happening <strong>at this very moment</strong>.</p><p><strong>Formula:</strong> am/is/are + verb-<strong>ing</strong></p>',
          examples: [
            { text: 'I <span class="highlight">am reading</span> a book right now.' },
            { text: 'She <span class="highlight">is playing</span> in the garden.' },
            { text: 'They <span class="highlight">are watching</span> TV at this moment.' }
          ],
          think: '💡 If someone asks "What are you doing RIGHT NOW?" — your answer is in Present Continuous! I am reading. I am studying. I am eating.'
        },
        {
          title: '⏮️ Past Continuous — "Was happening THEN"',
          content: '<p>Use when something <strong>was happening at a specific moment in the past</strong>.</p><p><strong>Formula:</strong> was/were + verb-<strong>ing</strong></p>',
          examples: [
            { text: 'I <span class="highlight">was sleeping</span> when the phone rang.' },
            { text: 'They <span class="highlight">were playing</span> cricket at 5 PM yesterday.' },
            { text: 'She <span class="highlight">was cooking</span> dinner when I arrived.' }
          ],
          think: '💡 Picture a moment in the past. What was the camera showing? "At 5 PM yesterday, I was studying" — the camera caught you studying at that exact moment!'
        },
        {
          title: '⏭️ Future Continuous — "Will be happening THEN"',
          content: '<p>Use when something <strong>will be happening at a specific moment in the future</strong>.</p><p><strong>Formula:</strong> will be + verb-<strong>ing</strong></p>',
          examples: [
            { text: 'I <span class="highlight">will be sleeping</span> at midnight tonight.' },
            { text: 'She <span class="highlight">will be traveling</span> to Delhi this time tomorrow.' },
            { text: 'They <span class="highlight">will be playing</span> the match at 4 PM.' }
          ],
          think: '💡 Imagine tomorrow at 3 PM. What will the camera show? "I will be sitting in class." The action will be ongoing at that future moment!'
        },
        {
          title: '🆚 Simple vs Continuous — What\'s the Difference?',
          content: '<p>Simple = the action is a <strong>fact</strong>. Continuous = the action is <strong>in progress</strong> at a specific moment.</p>',
          examples: [
            { text: 'Simple: I <span class="highlight">eat</span> breakfast every day. (habit/fact)' },
            { text: 'Continuous: I <span class="highlight">am eating</span> breakfast right now. (happening NOW)' },
            { text: 'Simple: She <span class="highlight">sang</span> a song. (fact — it happened)' },
            { text: 'Continuous: She <span class="highlight">was singing</span> a song when I entered. (in progress at that moment)' }
          ],
          think: '💡 Simple = completed action or habit. Continuous = you catch the action mid-way, still happening!'
        }
      ]
    },
    exercises: [
      { type: 'mcq', question: '"I am eating lunch right now." What tense is this?', options: ['Simple Present', 'Present Continuous', 'Past Continuous', 'Simple Past'], correct: 1, explanation: '"Right now" + am + eating (verb-ing) = Present Continuous. The action is happening at this very moment!' },
      { type: 'fill', question: 'She ___ a letter when the lights went off.', options: ['writes', 'wrote', 'was writing', 'will write'], correct: 2, explanation: 'Two past actions: one ongoing (writing) interrupted by another (lights went off). The ongoing action uses Past Continuous: "was writing".' },
      { type: 'mcq', question: 'Which is the correct formula for Past Continuous?', options: ['am/is/are + verb-ing', 'will be + verb-ing', 'was/were + verb-ing', 'had + verb-ed'], correct: 2, explanation: 'Past Continuous = was/were + verb-ing. "Was" for I/he/she/it, "were" for you/we/they.' },
      { type: 'fill', question: 'This time tomorrow, I ___ on a train to Delhi.', options: ['travel', 'traveled', 'am traveling', 'will be traveling'], correct: 3, explanation: '"This time tomorrow" = a specific future moment. The action will be ongoing → Future Continuous: "will be traveling".' },
      { type: 'mcq', question: '"The children were playing in the rain." When was this happening?', options: ['Right now', 'At some moment in the past', 'Tomorrow', 'Every day'], correct: 1, explanation: '"Were playing" = Past Continuous. The camera caught the children mid-action at some moment in the past.' },
      { type: 'fill', question: 'Look! The baby ___ !', options: ['walks', 'walked', 'is walking', 'will walk'], correct: 2, explanation: '"Look!" tells us it\'s happening RIGHT NOW. The baby is walking at this moment → Present Continuous: "is walking".' },
      { type: 'mcq', question: '"I eat breakfast every day." vs "I am eating breakfast." What\'s the difference?', options: ['No difference', 'First is a habit, second is happening right now', 'First is future, second is past', 'Both are wrong'], correct: 1, explanation: '"I eat breakfast every day" = habit (Simple Present). "I am eating breakfast" = it\'s happening at this very moment (Present Continuous).' },
      { type: 'fill', question: 'At 8 PM yesterday, we ___ dinner.', options: ['eat', 'ate', 'were eating', 'will eat'], correct: 2, explanation: '"At 8 PM yesterday" = specific past moment. The action was ongoing at that time → Past Continuous: "were eating".' },
      { type: 'fill', question: 'Be quiet! The baby ___ .', options: ['sleeps', 'slept', 'is sleeping', 'will sleep'], correct: 2, explanation: '"Be quiet!" implies the baby is sleeping RIGHT NOW → Present Continuous: "is sleeping".' },
      { type: 'mcq', question: 'Which sentence uses Future Continuous correctly?', options: ['I will study tomorrow.', 'I will be studying at 9 PM tonight.', 'I studied yesterday at 9 PM.', 'I am studying now.'], correct: 1, explanation: '"Will be studying at 9 PM tonight" = action ongoing at a specific future moment. "Will study tomorrow" is just Simple Future (fact, not ongoing).' },
      { type: 'fill', question: 'Don\'t disturb me! I ___ for my exam.', options: ['study', 'studied', 'am studying', 'will study'], correct: 2, explanation: '"Don\'t disturb me" implies the action is happening RIGHT NOW → Present Continuous: "am studying".' }
    ]
  },

  personification: {
    id: 'personification',
    title: 'Personification',
    subtitle: 'Things Come Alive! 🌟',
    icon: '🌟',
    color: '#ec4899',
    lesson: {
      intro: 'What if your shoes could talk? What if the wind could whisper secrets? <strong>Personification</strong> is when we give <strong>human qualities to non-human things</strong> — and it makes writing magical! ✨',
      sections: [
        {
          title: '🎭 What IS Personification?',
          content: '<p>Personification = giving <strong>human actions, feelings, or qualities</strong> to animals, objects, or ideas that can\'t actually do those things.</p>',
          examples: [
            { text: '<span class="highlight">The sun smiled</span> down on the children. (Can the sun really smile? No! But you can picture it!)' },
            { text: '<span class="highlight">The wind whispered</span> through the trees. (Wind can\'t whisper, but you can hear it!)' },
            { text: '<span class="highlight">The flowers danced</span> in the breeze. (Flowers don\'t dance, but they sway beautifully!)' }
          ],
          think: '💡 The test: Ask "Can this thing REALLY do that?" If the answer is NO, but it creates a beautiful picture in your mind — that\'s personification!'
        },
        {
          title: '💪 Human Actions Given to Things',
          content: '<p>Objects doing things only humans can do:</p>',
          examples: [
            { text: 'The alarm clock <span class="highlight">screamed</span> at me to wake up.' },
            { text: 'The old house <span class="highlight">groaned</span> in the wind.' },
            { text: 'Lightning <span class="highlight">danced</span> across the sky.' },
            { text: 'The last piece of cake <span class="highlight">called</span> my name.' }
          ],
          think: '💡 Alarm clocks can\'t scream, houses can\'t groan, lightning can\'t dance, and cake can\'t call your name — but these descriptions paint a vivid picture!'
        },
        {
          title: '❤️ Human Feelings Given to Things',
          content: '<p>Non-human things experiencing emotions:</p>',
          examples: [
            { text: 'The <span class="highlight">angry</span> waves crashed on the shore.' },
            { text: 'The <span class="highlight">cruel</span> winter refused to end.' },
            { text: 'The <span class="highlight">cheerful</span> sunflowers greeted us.' }
          ],
          think: '💡 Waves can\'t be angry, winter can\'t be cruel, sunflowers can\'t be cheerful — but giving them emotions makes the writing come alive!'
        },
        {
          title: '🆚 Personification vs Normal Description',
          content: '<p>See the difference? One is plain, the other paints a picture:</p>',
          examples: [
            { text: 'Normal: The wind blew hard. ← OK, but boring.' },
            { text: 'Personification: The wind <span class="highlight">howled angrily</span>. ← Wow, I can feel it!' },
            { text: 'Normal: The car stopped. ← Just a fact.' },
            { text: 'Personification: The car <span class="highlight">coughed and died</span>. ← I can picture the old car!' }
          ],
          think: '💡 Personification doesn\'t just describe — it makes readers FEEL something. That\'s why poets and writers love it!'
        }
      ]
    },
    exercises: [
      { type: 'mcq', question: '"The stars winked at us from the sky." Is this personification?', options: ['No — stars really do wink', 'Yes — stars can\'t wink, only humans can wink', 'No — this is a simile', 'Yes — but only if it\'s nighttime'], correct: 1, explanation: 'Stars can\'t actually wink — that\'s a human action! Giving the stars this human ability is personification.' },
      { type: 'mcq', question: 'Which sentence uses personification?', options: ['The dog barked loudly.', 'The trees whispered to each other.', 'The bird flew over the lake.', 'The cat sat on the mat.'], correct: 1, explanation: 'Trees can\'t whisper — that\'s a human action! Dogs barking, birds flying, and cats sitting are all normal animal behaviors, not personification.' },
      { type: 'mcq', question: '"The sun hid behind the clouds." Why is this personification?', options: ['Because the sun is alive', 'Because clouds are alive', 'Because "hid" is a human action — the sun can\'t deliberately hide', 'Because this is about weather'], correct: 2, explanation: '"Hiding" requires intention — only humans (and animals) can deliberately hide. The sun can\'t choose to hide, but saying it did creates a fun image!' },
      { type: 'mcq', question: 'Which is NOT personification?', options: ['The thunder growled.', 'The flowers danced in the wind.', 'The lion roared fiercely.', 'The opportunity knocked on my door.'], correct: 2, explanation: 'Lions CAN actually roar — that\'s normal animal behavior! Thunder can\'t growl, flowers can\'t dance, and opportunity can\'t knock. Those three are personification.' },
      { type: 'mcq', question: '"My alarm clock ___ at me every morning." Which word creates personification?', options: ['rings', 'beeps', 'yells', 'sounds'], correct: 2, explanation: '"Yells" is a human action — alarm clocks can\'t yell! "Rings", "beeps", and "sounds" are things alarm clocks actually do.' },
      { type: 'mcq', question: '"The leaves ___ goodbye as they fell from the tree." What fits?', options: ['fell', 'dropped', 'waved', 'moved'], correct: 2, explanation: '"Waved goodbye" is something humans do! Leaves can\'t wave or say goodbye. This personification makes the autumn scene feel emotional.' },
      { type: 'mcq', question: '"Time flies when you\'re having fun." Is this personification?', options: ['No — it\'s literal', 'Yes — time is given the human/animal ability to fly', 'No — this is a metaphor', 'Yes — but only during vacations'], correct: 1, explanation: 'Time can\'t literally fly — it\'s given the ability of movement/flight. This is personification that\'s so common we barely notice it!' },
      { type: 'mcq', question: 'Which sentence has the BEST personification?', options: ['The wind was strong.', 'The wind blew the leaves.', 'The wind angrily slammed the door shut.', 'The wind moved fast.'], correct: 2, explanation: '"Angrily slammed" gives the wind human emotion (anger) AND a human action (slamming). The other sentences just describe what happened without personification.' },
      { type: 'mcq', question: '"The chocolate cake was calling my name from the fridge." What human quality does the cake have?', options: ['The ability to be cold', 'The ability to speak and call someone', 'The ability to taste good', 'The ability to stay fresh'], correct: 1, explanation: 'Cake can\'t speak or call your name! The writer gives it the human ability of speech to show how tempting the cake was.' },
      { type: 'mcq', question: 'Create personification! "The old car ___."', options: ['drove slowly', 'was very old', 'wheezed and groaned up the hill', 'had four wheels'], correct: 2, explanation: '"Wheezed and groaned" are human actions (sounds of effort/pain). Giving these to the car creates a vivid image of a struggling old car!' }
    ]
  },

  presentPerfect: {
    id: 'presentPerfect',
    title: 'Present Perfect',
    subtitle: 'Have You Ever...? ✅',
    icon: '✅',
    color: '#10b981',
    lesson: {
      intro: 'The Present Perfect is the <strong>"bridge" tense</strong> — it connects something that happened in the <strong>past</strong> to <strong>right now</strong>. "I have eaten" means I ate (past) and it matters NOW (I\'m full!).',
      sections: [
        {
          title: '🔗 Connecting Past to Present',
          content: '<p><strong>Formula:</strong> has/have + <strong>past participle</strong> (eaten, gone, written, played)</p><p>Use "has" with he/she/it. Use "have" with I/you/we/they.</p>',
          examples: [
            { text: 'I <span class="highlight">have finished</span> my homework. (I\'m free now!)' },
            { text: 'She <span class="highlight">has lost</span> her keys. (She still can\'t find them!)' },
            { text: 'We <span class="highlight">have visited</span> the Taj Mahal. (We know what it looks like!)' }
          ],
          think: '💡 The key question: Does the past action STILL MATTER right now? If yes → Present Perfect!'
        },
        {
          title: '🆚 Simple Past vs Present Perfect',
          content: '<p>This is the trickiest part! Both talk about the past, but there\'s a big difference:</p>',
          examples: [
            { text: 'Simple Past: I <span class="highlight">lost</span> my key. (Just telling you what happened)' },
            { text: 'Present Perfect: I <span class="highlight">have lost</span> my key. (I STILL can\'t get in — it matters NOW!)' },
            { text: 'Simple Past: She <span class="highlight">ate</span> lunch. (Fact about the past)' },
            { text: 'Present Perfect: She <span class="highlight">has eaten</span> lunch. (She\'s not hungry NOW)' }
          ],
          think: '💡 Simple Past = "It happened." (end of story). Present Perfect = "It happened AND it still matters right now!" The result continues.'
        },
        {
          title: '📌 Signal Words',
          content: '<p>These words are clues that you need Present Perfect:</p>',
          examples: [
            { text: '<span class="highlight">already</span> — She has already left. (done before expected)' },
            { text: '<span class="highlight">just</span> — I have just eaten. (very recently)' },
            { text: '<span class="highlight">never / ever</span> — Have you ever been to Paris? I have never seen snow.' },
            { text: '<span class="highlight">yet</span> — She hasn\'t arrived yet. (expected but not happened)' },
            { text: '<span class="highlight">since / for</span> — I have lived here since 2020. / I have lived here for 5 years.' }
          ],
          think: '💡 If you see "already, just, never, ever, yet, since, for" — it\'s almost always Present Perfect!'
        },
        {
          title: '🎯 The "Have You Ever" Game',
          content: '<p>The most fun way to use Present Perfect — asking about life experiences!</p>',
          examples: [
            { text: '<span class="highlight">Have you ever</span> eaten sushi? → Yes, I have! / No, I haven\'t.' },
            { text: '<span class="highlight">Have you ever</span> climbed a mountain?' },
            { text: '<span class="highlight">Have you ever</span> seen a shooting star?' }
          ],
          think: '💡 "Have you ever...?" asks about your entire life up to NOW. That\'s why it\'s Present Perfect — the past connects to the present moment!'
        }
      ]
    },
    exercises: [
      { type: 'mcq', question: '"I have lost my phone." Why is this Present Perfect, not Simple Past?', options: ['Because "lost" is past tense', 'Because the phone is still missing RIGHT NOW — the past action has a present result', 'Because "have" is always present tense', 'Because it happened recently'], correct: 1, explanation: 'The phone was lost (past) AND is still missing (present). The past action matters NOW. That connection = Present Perfect!' },
      { type: 'fill', question: 'She ___ already ___ her lunch.', options: ['has, eaten', 'had, eaten', 'have, eaten', 'is, eating'], correct: 0, explanation: '"Already" is a Present Perfect signal word. With "she" we use "has". Has + eaten = Present Perfect.' },
      { type: 'mcq', question: '"Have you ever been to Jaipur?" What does this question ask about?', options: ['Your plans for tomorrow', 'A specific past trip', 'Any time in your entire life until now', 'What you\'re doing right now'], correct: 2, explanation: '"Have you ever..." asks about your entire life experience up to THIS moment. It doesn\'t matter when — just if it ever happened!' },
      { type: 'fill', question: 'I ___ never ___ such a beautiful sunset.', options: ['have, seen', 'has, seen', 'had, seen', 'was, seeing'], correct: 0, explanation: '"Never" is a Present Perfect signal. With "I" we use "have". "Have never seen" = never in my life until now.' },
      { type: 'mcq', question: 'Which sentence is correct?', options: ['I have gone to Delhi yesterday.', 'I went to Delhi yesterday.', 'I have went to Delhi.', 'I have go to Delhi.'], correct: 1, explanation: '"Yesterday" is a specific past time → use Simple Past "went". Present Perfect CANNOT be used with specific past times like "yesterday" or "last week"!' },
      { type: 'fill', question: 'They ___ not ___ yet.', options: ['have, arrived', 'has, arrived', 'did, arrived', 'are, arriving'], correct: 0, explanation: '"Yet" = Present Perfect signal (used in negatives and questions). With "they" → "have not arrived yet".' },
      { type: 'mcq', question: '"She ate dinner." vs "She has eaten dinner." What\'s the real difference?', options: ['No difference', '"She ate" = we know when. "She has eaten" = she\'s not hungry NOW.', '"She has eaten" is more formal', '"She ate" is wrong'], correct: 1, explanation: '"She ate dinner" is a fact about the past. "She has eaten dinner" connects to NOW — she\'s full, don\'t offer her food! The result matters now.' },
      { type: 'fill', question: 'We have lived in this house ___ 2018.', options: ['for', 'since', 'from', 'ago'], correct: 1, explanation: '"Since" is used with a specific point in time (2018). "For" is used with a duration (5 years). Since 2018 = from 2018 until now.' },
      { type: 'mcq', question: '"I have just finished my test!" What does "just" tell us?', options: ['It happened a long time ago', 'It happened very recently — maybe seconds ago', 'It will happen soon', 'It happens every day'], correct: 1, explanation: '"Just" with Present Perfect means very recently — it happened moments ago and the feeling is still fresh NOW!' },
      { type: 'fill', question: '___ you ever ___ a tiger in the wild?', options: ['Have, seen', 'Has, seen', 'Did, seen', 'Were, seeing'], correct: 0, explanation: '"Ever" = Present Perfect signal. "Have you ever...?" asks about lifetime experience. With "you" → "Have you ever seen".' },
      { type: 'fill', question: 'Rohan ___ his leg. He can\'t play today.', options: ['broke', 'has broken', 'breaks', 'will break'], correct: 1, explanation: 'He broke his leg (past) and can\'t play TODAY (present result). The past action matters NOW → Present Perfect "has broken".' }
    ]
  },

  pastPerfect: {
    id: 'pastPerfect',
    title: 'Past Perfect',
    subtitle: 'The Flashback ⏪',
    icon: '⏪',
    color: '#f59e0b',
    lesson: {
      intro: 'You know how movies sometimes show a <strong>flashback</strong>? The Past Perfect is like that — when you\'re already in the past, and you need to go <strong>even further back</strong>! It\'s the "past of the past." 🎬',
      sections: [
        {
          title: '⏪ The "Before That" Tense',
          content: '<p><strong>Formula:</strong> had + <strong>past participle</strong></p><p>Use it when you have <strong>two past events</strong> and need to show which one happened <strong>FIRST</strong>.</p>',
          examples: [
            { text: 'When I reached the station, the train <span class="highlight">had already left</span>.' },
            { text: 'She <span class="highlight">had finished</span> her homework before she went out to play.' },
            { text: 'The movie <span class="highlight">had started</span> by the time we arrived.' }
          ],
          think: '💡 Two past events. Which happened FIRST? The FIRST one gets "had + past participle". The SECOND one uses Simple Past.'
        },
        {
          title: '📋 The Order Matters!',
          content: '<p>Event 1 (happened first) → <strong>Past Perfect</strong><br>Event 2 (happened second) → <strong>Simple Past</strong></p>',
          examples: [
            { text: 'Event 1: The bell <span class="highlight">had rung</span>. (FIRST) → Event 2: I <span class="highlight">reached</span> school. (SECOND)' },
            { text: 'Sentence: "The bell <span class="highlight">had rung</span> before I <span class="highlight">reached</span> school."' },
            { text: 'Event 1: She <span class="highlight">had studied</span> hard. (FIRST) → Event 2: She <span class="highlight">passed</span> the exam. (SECOND)' }
          ],
          think: '💡 Think of it as a TIMELINE: ←←← [had + pp] ←← [simple past] ←← NOW. Past Perfect is further back than Simple Past!'
        },
        {
          title: '🔗 Connector Words',
          content: '<p>These words help join the two events:</p>',
          examples: [
            { text: '<span class="highlight">before</span> — She had eaten before she left.' },
            { text: '<span class="highlight">after</span> — After he had washed his hands, he ate.' },
            { text: '<span class="highlight">by the time</span> — By the time I arrived, they had gone.' },
            { text: '<span class="highlight">already</span> — The show had already ended when we reached.' }
          ],
          think: '💡 "Before", "after", "by the time", "when", and "already" are your clue words for Past Perfect!'
        },
        {
          title: '🆚 Past Perfect vs Simple Past',
          content: '<p>Why not just use Simple Past for both events?</p>',
          examples: [
            { text: 'Simple Past for both: "I reached the station. The train left." (Confusing — which happened first?)' },
            { text: 'With Past Perfect: "When I reached the station, the train <span class="highlight">had left</span>." (Clear — train left BEFORE I arrived!)' }
          ],
          think: '💡 Past Perfect removes confusion! It tells the reader exactly which event came first, like adding timestamps to a story.'
        }
      ]
    },
    exercises: [
      { type: 'mcq', question: '"When I reached the station, the train had already left." Which happened FIRST?', options: ['I reached the station', 'The train left', 'Both happened at the same time', 'We can\'t tell'], correct: 1, explanation: '"Had left" = Past Perfect = happened FIRST. The train left, and THEN I reached. I was too late!' },
      { type: 'fill', question: 'She ___ already ___ dinner before her parents came home.', options: ['had, cooked', 'has, cooked', 'was, cooking', 'did, cook'], correct: 0, explanation: 'Two past events: cooking (first) and parents coming (second). First event → Past Perfect: "had cooked".' },
      { type: 'mcq', question: '"After the rain had stopped, the children went outside." Put the events in order:', options: ['Children went outside → Rain stopped', 'Rain stopped → Children went outside', 'Both happened at the same time', 'The rain never stopped'], correct: 1, explanation: '"Had stopped" = Past Perfect = happened FIRST. Rain stopped (first), then children went outside (second). The Past Perfect clarifies the order!' },
      { type: 'fill', question: 'By the time we reached the cinema, the movie ___ already ___.', options: ['had, started', 'has, started', 'was, starting', 'did, start'], correct: 0, explanation: 'Movie starting (first event) happened BEFORE we reached (second event). "By the time" is a Past Perfect clue! → "had started".' },
      { type: 'mcq', question: 'Which sentence uses Past Perfect correctly?', options: ['I had go to the market yesterday.', 'She had finished her work before she left.', 'They had playing in the park.', 'We has eaten dinner already.'], correct: 1, explanation: '"Had finished" (first event) before "she left" (second event). Past Perfect formula: had + past participle (finished). Perfect!' },
      { type: 'fill', question: 'The thief ___ ___ before the police arrived.', options: ['had, escaped', 'has, escaped', 'was, escaping', 'did, escape'], correct: 0, explanation: 'Thief escaping (first) happened BEFORE police arrived (second). First event → Past Perfect: "had escaped".' },
      { type: 'mcq', question: '"I realized I had forgotten my lunch at home." What was forgotten FIRST?', options: ['The realization', 'The lunch — it was forgotten before the realization', 'Both at the same time', 'The lunch was never forgotten'], correct: 1, explanation: '"Had forgotten" = Past Perfect = happened first. The lunch was forgotten earlier, and then later the person realized it.' },
      { type: 'fill', question: 'After Ravi ___ ___ his homework, he went to play.', options: ['had, finished', 'has, finished', 'was, finishing', 'have, finished'], correct: 0, explanation: 'Finishing homework (first) → then going to play (second). "After" + first event = Past Perfect: "had finished".' },
      { type: 'mcq', question: 'Why do we need Past Perfect when Simple Past already talks about the past?', options: ['We don\'t — they\'re the same', 'Past Perfect shows which of two past events happened FIRST', 'Past Perfect sounds more formal', 'Past Perfect is for old events only'], correct: 1, explanation: 'When you have two past events, Past Perfect tells the reader which one happened first. Without it, the order could be confusing!' },
      { type: 'fill', question: 'She ___ never ___ snow before she visited Shimla.', options: ['had, seen', 'has, seen', 'was, seeing', 'did, see'], correct: 0, explanation: 'Not seeing snow (entire life before Shimla) happened BEFORE visiting Shimla. "Never" + first past event → Past Perfect: "had never seen".' }
    ]
  },

  hyperbole: {
    id: 'hyperbole',
    title: 'Hyperbole',
    subtitle: 'Exaggeration Station 🎪',
    icon: '🎪',
    color: '#ef4444',
    lesson: {
      intro: 'Have you ever been SO hungry you could eat a horse? 🐴 No? Well, that\'s <strong>HYPERBOLE</strong> (say: hy-PER-bo-lee) — making things sound WAAAY bigger, longer, worse, or better than they really are!',
      sections: [
        {
          title: '🎯 What is Hyperbole?',
          content: '<p>Hyperbole is <strong>extreme exaggeration</strong> used for <strong>emphasis or humor</strong>. Everyone knows you\'re not being literal — that\'s the point!</p>',
          examples: [
            { text: 'I\'m so hungry I could <span class="highlight">eat a horse</span>! (Not really — just very hungry!)' },
            { text: 'I\'ve told you <span class="highlight">a million times</span>! (Maybe 5 times, but it feels like a million!)' },
            { text: 'This bag weighs <span class="highlight">a ton</span>! (It\'s heavy, but not literally 1000 kg!)' }
          ],
          think: '💡 Hyperbole ≠ lying. When you say "I died laughing," everyone knows you\'re alive. It\'s exaggeration for effect!'
        },
        {
          title: '🤣 Why Do We Use Hyperbole?',
          content: '<p>Two main reasons: to make a point STRONGER, and to be FUNNY.</p>',
          examples: [
            { text: '<strong>For emphasis:</strong> "I waited <span class="highlight">forever</span> for the bus." (It felt really long!)' },
            { text: '<strong>For humor:</strong> "My grandmother is <span class="highlight">older than the hills</span>." (She\'s old, but not THAT old!)' },
            { text: '<strong>For emotion:</strong> "My heart <span class="highlight">broke into a million pieces</span>." (Very sad, but hearts don\'t literally break!)' }
          ],
          think: '💡 Without hyperbole, our speech would be boring! "I\'m hungry" vs "I\'m so hungry I could eat a whale" — which one is more fun?'
        },
        {
          title: '🔍 Spotting Hyperbole',
          content: '<p>Ask yourself: "Is this LITERALLY true?" If the answer is "no way!" — it\'s probably hyperbole.</p>',
          examples: [
            { text: '"I could <span class="highlight">sleep for a year</span>." — Can anyone really sleep for a year? No → Hyperbole!' },
            { text: '"She <span class="highlight">runs faster than the wind</span>." — No human can outrun wind → Hyperbole!' },
            { text: '"I have <span class="highlight">a mountain</span> of homework." — Homework isn\'t a mountain → Hyperbole!' }
          ],
          think: '💡 The "Really?" test: If someone says it and you think "Oh come on, really?!" — that\'s hyperbole!'
        },
        {
          title: '✍️ Creating Hyperbole',
          content: '<p>Take a normal feeling and blow it up to EXTREME size:</p>',
          examples: [
            { text: 'Normal: "I\'m tired." → Hyperbole: "I\'m so tired I could <span class="highlight">sleep for a century</span>!"' },
            { text: 'Normal: "It\'s hot." → Hyperbole: "It\'s so hot you could <span class="highlight">fry an egg on the sidewalk</span>!"' },
            { text: 'Normal: "She\'s fast." → Hyperbole: "She\'s <span class="highlight">faster than a speeding bullet</span>!"' }
          ],
          think: '💡 Recipe for hyperbole: Take any description + make it IMPOSSIBLY extreme = fun hyperbole!'
        }
      ]
    },
    exercises: [
      { type: 'mcq', question: '"I\'m so hungry I could eat a horse." Is this hyperbole?', options: ['No — some people really eat horses', 'Yes — it\'s an extreme exaggeration to show how hungry they are', 'No — it\'s a metaphor', 'Yes — but only if they\'re vegetarian'], correct: 1, explanation: 'Nobody can eat an entire horse! This is classic hyperbole — extreme exaggeration to emphasize how hungry the person feels.' },
      { type: 'mcq', question: 'Which sentence is hyperbole?', options: ['The cake was delicious.', 'I ran 5 kilometers today.', 'I have a million things to do.', 'The movie was two hours long.'], correct: 2, explanation: '"A million things" is an exaggeration — nobody literally has a million tasks. The other sentences are plain facts with no exaggeration.' },
      { type: 'mcq', question: '"This suitcase weighs a ton!" What does the speaker really mean?', options: ['The suitcase literally weighs 1000 kg', 'The suitcase is very heavy', 'The suitcase is broken', 'The suitcase needs wheels'], correct: 1, explanation: 'A ton is 1000 kg — no suitcase weighs that much! The speaker is using hyperbole to say "this is really, really heavy."' },
      { type: 'mcq', question: 'Which is NOT hyperbole?', options: ['I died laughing.', 'She cried a river of tears.', 'He ate two sandwiches for lunch.', 'I\'ve been waiting forever.'], correct: 2, explanation: 'Eating two sandwiches is perfectly normal and literal! "Died laughing", "river of tears", and "waiting forever" are all impossible exaggerations.' },
      { type: 'mcq', question: '"My teacher\'s voice could be heard from Mars." What does this mean?', options: ['The teacher is an astronaut', 'The teacher speaks very loudly', 'Mars has good speakers', 'The classroom is on Mars'], correct: 1, explanation: 'Sound can\'t travel to Mars (there\'s no air in space!). This hyperbole means the teacher has a very loud voice.' },
      { type: 'mcq', question: 'Turn this into hyperbole: "The test was hard."', options: ['The test was quite difficult.', 'The test was the hardest thing in the entire universe!', 'The test had many questions.', 'The test took one hour.'], correct: 1, explanation: '"Hardest thing in the entire universe" is extreme exaggeration — definitely hyperbole! The other options are normal statements.' },
      { type: 'mcq', question: '"Her smile was a mile wide." Is this really possible?', options: ['Yes, some people have very wide smiles', 'No — a mile-wide smile is impossible. This is hyperbole meaning she had a very big, happy smile', 'Only if she\'s very tall', 'Yes, if she stretches her face'], correct: 1, explanation: 'A mile is 1.6 km — no smile can be that wide! This hyperbole shows she had an extremely big, radiant smile.' },
      { type: 'mcq', question: 'Why do writers use hyperbole?', options: ['To confuse readers', 'To lie about facts', 'To make their writing more vivid, funny, or emphatic', 'Because they don\'t know the real numbers'], correct: 2, explanation: 'Hyperbole adds drama, humor, and emphasis. "I have tons of homework" is more expressive than "I have lots of homework." It makes writing come alive!' },
      { type: 'mcq', question: '"I\'ve told you a thousand times to clean your room!" How many times did the parent probably say it?', options: ['Exactly 1000 times', 'Maybe 5-10 times, but it feels like a lot', 'Zero times', 'More than 1000 times'], correct: 1, explanation: 'Nobody counts to exactly 1000! The parent probably said it several times, but the hyperbole emphasizes their frustration.' },
      { type: 'mcq', question: 'Match the hyperbole to its real meaning: "I could sleep for a year."', options: ['I need exactly 365 days of sleep', 'I am very tired', 'I don\'t like being awake', 'I have insomnia'], correct: 1, explanation: 'Sleeping for a year is impossible! This hyperbole simply means "I am extremely tired." The exaggeration emphasizes the tiredness.' }
    ]
  }
};

// ============================================
// APPLICATION STATE
// ============================================

const state = {
  currentTopic: null,
  currentMode: 'learn',
  exerciseIndex: 0,
  score: { correct: 0, incorrect: 0, total: 0 },
  answered: false,
  timerInterval: null,
  timeLeft: 0,
  progress: {},
  shuffledExercises: [],
  sortState: { selectedItem: null, placements: {} }
};

const STORAGE_KEY = 'grammar-master-progress';
const CHALLENGE_TIME_PER_Q = 15;

// ============================================
// AUDIO FEEDBACK (Web Audio API)
// ============================================

let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playCorrectSound() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
    osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
}

function playIncorrectSound() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.setValueAtTime(180, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {}
}

// ============================================
// CONFETTI
// ============================================

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const pieces = [];
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#ef4444'];
  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      w: 6 + Math.random() * 6,
      h: 10 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 4,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 10
    });
  }
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;
    pieces.forEach(p => {
      if (p.y < canvas.height + 20) active = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.rot += p.rotV;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - frame / 120);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (active && frame < 150) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

// ============================================
// FEEDBACK FLASH
// ============================================

function flashFeedback(type) {
  const el = document.getElementById('feedback-flash');
  if (!el) return;
  el.className = 'feedback-flash flash-' + type;
  setTimeout(() => { el.className = 'feedback-flash'; }, 400);
}

// ============================================
// PROGRESS MANAGEMENT
// ============================================

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) state.progress = JSON.parse(saved);
  } catch (e) {}
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch (e) {}
}

function getStars(topicId) {
  return state.progress[topicId] || 0;
}

function setStars(topicId, stars) {
  const current = getStars(topicId);
  if (stars > current) {
    state.progress[topicId] = stars;
    saveProgress();
  }
}

function calcStars(correct, total) {
  if (total === 0) return 0;
  const pct = correct / total;
  if (pct >= 1) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.4) return 1;
  return 0;
}

function renderStars(count) {
  return '⭐'.repeat(count) + '☆'.repeat(Math.max(0, 3 - count));
}

function updateOverallProgress() {
  const topicIds = Object.keys(TOPIC_DATA);
  const totalPossible = topicIds.length * 3;
  let totalEarned = 0;
  topicIds.forEach(id => { totalEarned += getStars(id); });
  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  if (fill) fill.style.width = (totalEarned / totalPossible * 100) + '%';
  if (label) label.textContent = totalEarned + ' / ' + totalPossible + ' stars earned';
}

// ============================================
// SIDEBAR RENDERING
// ============================================

function renderSidebar() {
  const container = document.getElementById('sidebar-topics');
  if (!container) return;
  container.innerHTML = '';
  Object.values(TOPIC_DATA).forEach(topic => {
    const card = document.createElement('div');
    card.className = 'topic-card' + (state.currentTopic === topic.id ? ' active' : '');
    card.id = 'topic-' + topic.id;
    const stars = getStars(topic.id);
    card.innerHTML = `
      <div class="topic-icon">${topic.icon}</div>
      <div class="topic-info">
        <div class="topic-name">${topic.title}</div>
        <div class="topic-subtitle">${topic.subtitle}</div>
      </div>
      <div class="topic-stars">${renderStars(stars)}</div>
    `;
    card.addEventListener('click', () => selectTopic(topic.id));
    container.appendChild(card);
  });
  updateOverallProgress();
}

// ============================================
// TOPIC SELECTION & MODE SWITCHING
// ============================================

function selectTopic(topicId) {
  state.currentTopic = topicId;
  state.currentMode = 'learn';
  state.exerciseIndex = 0;
  state.score = { correct: 0, incorrect: 0, total: 0 };
  state.answered = false;
  clearTimer();

  const topic = TOPIC_DATA[topicId];
  document.getElementById('top-bar-title').textContent = topic.icon + ' ' + topic.title;
  document.getElementById('top-bar-subtitle').textContent = topic.subtitle;

  document.getElementById('welcome-screen').style.display = 'none';
  document.getElementById('content-area').classList.add('visible');

  renderSidebar();
  setMode('learn');
}

function setMode(mode) {
  state.currentMode = mode;
  state.exerciseIndex = 0;
  state.score = { correct: 0, incorrect: 0, total: 0 };
  state.answered = false;
  clearTimer();

  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });

  if (mode === 'learn') renderLearnMode();
  else if (mode === 'practice') startExercises(false);
  else if (mode === 'challenge') startExercises(true);
}

function showWelcome() {
  document.getElementById('welcome-screen').style.display = 'flex';
  document.getElementById('content-area').classList.remove('visible');
}

// ============================================
// LEARN MODE
// ============================================

function renderLearnMode() {
  const topic = TOPIC_DATA[state.currentTopic];
  if (!topic) return;
  const area = document.getElementById('content-area');
  const lesson = topic.lesson;

  let html = `<div class="lesson-container">
    <div class="lesson-header">
      <div class="lesson-icon">${topic.icon}</div>
      <h3>${topic.title}</h3>
      <p>${lesson.intro}</p>
    </div>`;

  lesson.sections.forEach((section, i) => {
    html += `<div class="lesson-card" style="animation-delay: ${i * 0.1}s">
      <h4>${section.title}</h4>
      ${section.content}`;

    if (section.examples) {
      section.examples.forEach(ex => {
        html += `<div class="example-box">${ex.text}</div>`;
      });
    }
    if (section.think) {
      html += `<div class="think-box">
        <div class="label">🧠 Think About It</div>
        <p>${section.think}</p>
      </div>`;
    }
    html += `</div>`;
  });

  html += `<div class="lesson-nav">
    <button class="btn btn-primary" onclick="setMode('practice')">🧩 Start Practice →</button>
    <button class="btn" onclick="setMode('challenge')">🎯 Jump to Challenge</button>
  </div></div>`;

  area.innerHTML = html;
}

// ============================================
// EXERCISE MODES (Practice & Challenge)
// ============================================

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startExercises(timed) {
  const topic = TOPIC_DATA[state.currentTopic];
  if (!topic) return;

  state.shuffledExercises = shuffleArray(topic.exercises);
  if (timed) {
    state.shuffledExercises = state.shuffledExercises.slice(0, 10);
  }
  state.exerciseIndex = 0;
  state.score = { correct: 0, incorrect: 0, total: state.shuffledExercises.length };
  state.answered = false;

  if (timed) {
    state.timeLeft = state.shuffledExercises.length * CHALLENGE_TIME_PER_Q;
    startTimer();
  }

  renderExercise();
}

function renderExercise() {
  const area = document.getElementById('content-area');
  if (state.exerciseIndex >= state.shuffledExercises.length) {
    finishExercises();
    return;
  }

  const ex = state.shuffledExercises[state.exerciseIndex];
  const total = state.shuffledExercises.length;
  const num = state.exerciseIndex + 1;
  state.answered = false;

  let html = `<div class="exercise-container">`;

  // Score bar
  html += `<div class="score-bar">
    <div class="score-item score-correct"><div class="score-value">${state.score.correct}</div><div class="score-label">Correct</div></div>
    <div class="score-item score-wrong"><div class="score-value">${state.score.incorrect}</div><div class="score-label">Wrong</div></div>
    <div class="score-item score-remaining"><div class="score-value">${total - num + 1}</div><div class="score-label">Left</div></div>
  </div>`;

  // Timer
  if (state.currentMode === 'challenge') {
    const timerClass = state.timeLeft <= 10 ? 'danger' : state.timeLeft <= 30 ? 'warning' : '';
    html += `<div class="exercise-timer ${timerClass}" id="timer-display">⏱️ ${formatTime(state.timeLeft)}</div>`;
  }

  // Progress bar
  html += `<div class="exercise-progress">
    <div class="exercise-progress-bar"><div class="exercise-progress-fill" style="width: ${(num - 1) / total * 100}%"></div></div>
    <div class="exercise-progress-text">${num} / ${total}</div>
  </div>`;

  // Question card
  html += `<div class="question-card" id="question-card">`;

  const typeBadge = ex.type === 'mcq' ? '🤔 Think & Choose' :
                    ex.type === 'fill' ? '✏️ Fill the Gap' :
                    ex.type === 'spot' ? '🔍 Spot the Error' : '🧩 Exercise';

  html += `<div class="question-type-badge">${typeBadge}</div>`;

  if (ex.type === 'mcq' || ex.type === 'fill') {
    html += `<div class="question-text">${ex.question}</div>`;
    html += `<div class="options-grid">`;
    const letters = ['A', 'B', 'C', 'D'];
    ex.options.forEach((opt, i) => {
      html += `<button class="option-btn" data-index="${i}" onclick="handleAnswer(${i})">
        <span class="option-letter">${letters[i]}</span>
        <span>${opt}</span>
      </button>`;
    });
    html += `</div>`;
  }

  html += `<div id="explanation-area"></div>`;
  html += `</div>`; // question-card
  html += `</div>`; // exercise-container

  area.innerHTML = html;
}

function handleAnswer(selectedIndex) {
  if (state.answered) return;
  state.answered = true;

  const ex = state.shuffledExercises[state.exerciseIndex];
  const isCorrect = selectedIndex === ex.correct;

  // Update score
  if (isCorrect) {
    state.score.correct++;
    playCorrectSound();
    flashFeedback('correct');
  } else {
    state.score.incorrect++;
    playIncorrectSound();
    flashFeedback('incorrect');
  }

  // Highlight options
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === ex.correct) btn.classList.add('correct');
    if (i === selectedIndex && !isCorrect) btn.classList.add('incorrect');
  });

  // Show explanation
  const expArea = document.getElementById('explanation-area');
  if (expArea) {
    expArea.innerHTML = `
      <div class="explanation-box ${isCorrect ? 'correct-exp' : 'incorrect-exp'}">
        <strong>${isCorrect ? '✅ Correct!' : '❌ Not quite!'}</strong> ${ex.explanation}
      </div>
      <div class="next-btn-row">
        <button class="btn btn-primary" onclick="nextExercise()">
          ${state.exerciseIndex < state.shuffledExercises.length - 1 ? 'Next Question →' : 'See Results 🏆'}
        </button>
      </div>
    `;
  }

  // Update score display
  document.querySelector('.score-correct .score-value').textContent = state.score.correct;
  document.querySelector('.score-wrong .score-value').textContent = state.score.incorrect;
}

function nextExercise() {
  state.exerciseIndex++;
  if (state.exerciseIndex >= state.shuffledExercises.length) {
    finishExercises();
  } else {
    renderExercise();
  }
}

// ============================================
// TIMER
// ============================================

function startTimer() {
  clearTimer();
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    const display = document.getElementById('timer-display');
    if (display) {
      display.textContent = '⏱️ ' + formatTime(state.timeLeft);
      display.className = 'exercise-timer' +
        (state.timeLeft <= 10 ? ' danger' : state.timeLeft <= 30 ? ' warning' : '');
    }
    if (state.timeLeft <= 0) {
      clearTimer();
      finishExercises();
    }
  }, 1000);
}

function clearTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}

// ============================================
// FINISH & RESULTS
// ============================================

function finishExercises() {
  clearTimer();

  const correct = state.score.correct;
  const total = state.shuffledExercises.length;
  const stars = calcStars(correct, total);

  if (state.currentMode === 'challenge') {
    setStars(state.currentTopic, stars);
    renderSidebar();
  }

  // Update modal
  const pct = total > 0 ? Math.round(correct / total * 100) : 0;
  let emoji = '🏆', title = 'Great Job!', msg = '';

  if (stars === 3) { emoji = '🌟'; title = 'PERFECT! 🎉'; msg = 'Incredible — you got every single one right!'; launchConfetti(); }
  else if (stars === 2) { emoji = '🎯'; title = 'Well Done!'; msg = `${pct}% correct! Almost there — try again for all 3 stars!`; }
  else if (stars === 1) { emoji = '💪'; title = 'Good Start!'; msg = `${pct}% correct. Review the lesson and try again!`; }
  else { emoji = '📖'; title = 'Keep Learning!'; msg = `${pct}% correct. Go back to the lesson and you\'ll improve!`; }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-stars').textContent = renderStars(stars);
  document.getElementById('result-message').textContent = msg;
  document.getElementById('result-correct').textContent = correct;
  document.getElementById('result-total').textContent = total;

  document.getElementById('results-modal').classList.add('visible');
}

function closeModal() {
  document.getElementById('results-modal').classList.remove('visible');
}

// ============================================
// INIT
// ============================================

function init() {
  loadProgress();
  renderSidebar();
  showWelcome();

  // Mode tabs
  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (state.currentTopic) setMode(tab.dataset.mode);
    });
  });

  // Reset button
  const rb = document.getElementById('btn-reset');
  if (rb) rb.addEventListener('click', () => {
    if (state.currentTopic) {
      state.score = { correct: 0, incorrect: 0, total: 0 };
      clearTimer();
      setMode('learn');
    }
  });

  // Modal buttons
  document.getElementById('btn-retry').addEventListener('click', () => {
    closeModal();
    setMode(state.currentMode);
  });
  document.getElementById('btn-review').addEventListener('click', () => {
    closeModal();
    setMode('learn');
  });
  document.getElementById('btn-close-modal').addEventListener('click', closeModal);
}

document.addEventListener('DOMContentLoaded', init);
