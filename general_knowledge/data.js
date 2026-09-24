/**
 * ==========================================================================
 * GENERAL KNOWLEDGE MASTER (CLASS 5 CBSE / GLOBAL AWARENESS PROGRAM)
 * Comprehensive Data for June 2026, July 2026, and August 2026 Booklets
 * ==========================================================================
 */

const GK_DATA = {
  months: [
    {
      id: "june",
      name: "June 2026",
      shortName: "June",
      badge: "🌊 World Oceans & Moon Voyage",
      color: "#06b6d4", // Cyan
      themeDescription: "World Oceans Day, Artemis II Moon Mission, Parbati Barua, Baku City of Winds & Rainbow Mountain",
      stats: { topics: 8, questions: 14, puzzles: 2 }
    },
    {
      id: "jul",
      name: "July 2026",
      shortName: "July",
      badge: "🦄 Commonwealth Games & Undersea Records",
      color: "#8b5cf6", // Purple
      themeDescription: "Glasgow 2026 CWG, Swaraj Dweep Flag Record, Dr. Kadambini Ganguly, Toy Train & Water Puppetry",
      stats: { topics: 8, questions: 14, puzzles: 2 }
    },
    {
      id: "aug",
      name: "August 2026",
      shortName: "August",
      badge: "🦆 Donald Duck 90 & Whale Necropolis",
      color: "#f59e0b", // Amber
      themeDescription: "Donald Duck 90th Year, World's Tallest Church, 5M-Yr Whale Graveyard, Lt. Bharati Asha & Nehru Boat Race",
      stats: { topics: 8, questions: 14, puzzles: 2 }
    }
  ],

  // --------------------------------------------------------------------------
  // TOPICS CATALOG (LEARN & EXPLORE)
  // --------------------------------------------------------------------------
  topics: [
    // ==================== JUNE 2026 ====================
    {
      id: "june-oceans",
      monthId: "june",
      category: "pick",
      categoryName: "Pick of the Month",
      title: "World Oceans Day & Our Amazing Oceans",
      tagline: "The blue heartbeat of planet Earth",
      icon: "🌊",
      memorySpark: {
        headline: "The Calm Pacifier & The Atlas Sea!",
        hook: "Pacific Ocean means 'Peaceful Sea' (think of a soothing pacifier!). Atlantic Ocean means 'Sea of Atlas'. And the Indian Ocean is the ONLY ocean in the world named after a country!",
        funFact: "Oceans produce over 50% of the oxygen we breathe — thanks to tiny ocean phytoplankton!"
      },
      summary: "Observed annually on 8th June, World Oceans Day was established in 1992 and officially recognized by the United Nations in 2008. It reminds us to protect our marine ecosystems.",
      keyFacts: [
        "**Date**: 8th June every year (UN recognized since 2008).",
        "**Pacific Ocean**: The world's largest ocean; its name means 'peaceful sea' (given by explorer Ferdinand Magellan).",
        "**Atlantic Ocean**: The second largest ocean; means 'Sea of Atlas' from Greek mythology.",
        "**Indian Ocean**: The only ocean named after a country.",
        "**Southern Ocean (Antarctic)**: Formed from the southern waters of Atlantic, Indian, and Pacific oceans.",
        "**Arctic Ocean**: The world's smallest and shallowest ocean.",
        "**Great Pacific Garbage Patch**: An enormous vortex of floating plastic debris in the Pacific Ocean that degrades very slowly and threatens marine life."
      ],
      didYouKnow: "Ocean waves and tidal movements are harnessed by scientists to generate renewable green electricity!"
    },
    {
      id: "june-artemis",
      monthId: "june",
      category: "global",
      categoryName: "Global Lens",
      title: "NASA's Artemis II — Back to the Moon!",
      tagline: "Humanity's first crewed lunar voyage in over 50 years",
      icon: "🚀",
      memorySpark: {
        headline: "Apollo's Twin Sister Goes Further Than Ever!",
        hook: "In Greek mythology, Artemis is the Goddess of the Moon and the twin sister of Apollo (the Sun God). Apollo took humans to the Moon in 1969; now Artemis II carries four astronauts around the Moon in the Orion spacecraft!",
        funFact: "Christina Koch made history on this mission as the first woman ever to travel around the Moon!"
      },
      summary: "Artemis II is NASA's 10-day crewed mission around the Moon using the Orion spacecraft. It prepares humanity for landing astronauts back on the lunar surface.",
      keyFacts: [
        "**Spacecraft**: Orion spacecraft carried a crew of four astronauts.",
        "**Historic Milestone**: First crewed lunar mission in over 50 years; took humans farther from Earth than ever before.",
        "**Trailblazer**: Astronaut Christina Koch became the first woman to voyage around the Moon.",
        "**Moon Latin Name**: 'Luna'. It shines by reflecting light from the Sun.",
        "**Tidal Locking**: We always see the same face of the Moon because it rotates on its axis at the exact same rate it orbits Earth!",
        "**The Far Side**: Often called the 'dark side', it receives sunlight just like the near side, but humans on Earth never see it directly."
      ],
      didYouKnow: "Neil Armstrong and Buzz Aldrin were the first two humans to set foot on the Moon on 20 July 1969 during the Apollo 11 mission."
    },
    {
      id: "june-antarctica",
      monthId: "june",
      category: "global",
      categoryName: "Global Lens",
      title: "Antarctic Species on IUCN Red List",
      tagline: "Emperor Penguins & Fur Seals declared Endangered",
      icon: "🐧",
      memorySpark: {
        headline: "Giant Huddle & Deep-Diving Krill!",
        hook: "Emperor Penguins are the tallest and heaviest birds in Antarctica. To survive brutal -60°C blizzards, they huddle together in giant rotating groups! But warming seas are melting their breeding sea-ice.",
        funFact: "Antarctic fur seals feed on krill (tiny shrimp). When oceans warm, krill dive into deep icy trenches, leaving seals hungry!"
      },
      summary: "The International Union for Conservation of Nature (IUCN) Red List officially classified Antarctica's Emperor Penguin and Antarctic Fur Seal as 'Endangered' due to climate change.",
      keyFacts: [
        "**IUCN Status**: Categorized as 'Endangered' (very high risk of extinction in the wild).",
        "**Emperor Penguins**: Flightless aquatic birds; tallest and heaviest of all penguin species.",
        "**Cold Adaptations**: Several dense layers of scale-like waterproof feathers, special insulating fat in feet, and community huddling.",
        "**Sea-Ice Dependency**: They need firm sea-ice attached to the coast to lay eggs and nurture their fluffy chicks.",
        "**Antarctic Fur Seals**: The smallest of the Antarctic seal species. They feed on krill, which are moving deeper as upper ocean waters warm."
      ],
      didYouKnow: "Antarctic fur seals were hunted almost to extinction in the 19th century for their fur, recovered due to conservation bans, and now face climate threats."
    },
    {
      id: "june-parbati",
      monthId: "june",
      category: "people",
      categoryName: "Person of the Month",
      title: "Parbati Barua — India's 'Hasti Kanya'",
      tagline: "India's first woman mahout and Padma Shri conservationist",
      icon: "🐘",
      memorySpark: {
        headline: "Hasti Kanya: The Elephant Whisperer at 14!",
        hook: "Parbati Barua was nicknamed 'Hasti Kanya' (Elephant Maiden). At just 14 years old, she caught her very first wild elephant using the traditional 'Mela Shikar' rope technique!",
        funFact: "Her daily routine includes bathing giant tuskers in jungle rivers, feeding them jaggery and grass, and talking to them in elephant language!"
      },
      summary: "Parbati Barua broke centuries of male dominance to become India's first female mahout in 1972. Honoured with the Padma Shri, she has dedicated her life to Asian elephant conservation.",
      keyFacts: [
        "**Padma Shri Awardee**: Honoured by the Government of India for exceptional wildlife conservation.",
        "**First Woman Mahout**: Achieved in 1972, breaking age-old gender barriers in forest handling.",
        "**Child Prodigy**: Caught her first elephant alongside her father at age 14.",
        "**Tamed 500+ Elephants**: Helped state governments in Assam, Bihar, and West Bengal capture and rehabilitate wild rogue tuskers.",
        "**Mela Shikar Technique**: Traditional humane capturing method using a long-noosed lasso rope without hurting the elephant.",
        "**Conflict Resolution**: Her expertise resolves human-elephant conflict in agricultural forest borders."
      ],
      didYouKnow: "Commercial elephant capturing was completely banned by the Indian government in 1977 to protect the endangered wild elephant population."
    },
    {
      id: "june-baku",
      monthId: "june",
      category: "places",
      categoryName: "Wonderful World",
      title: "Baku, Azerbaijan — The Submarine City of Winds",
      tagline: "The world's lowest-lying capital, 28 metres below sea level!",
      icon: "🏙️",
      memorySpark: {
        headline: "Below Sea Level with Giant Flame Towers!",
        hook: "Baku is the lowest-lying capital on Earth (-28m below sea level, like living in a submarine city!). It is nicknamed the 'City of Winds' and features a museum shaped exactly like a giant rolled-up carpet!",
        funFact: "The three Flame Towers light up like blazing flames at night, honoring Azerbaijan's ancient Zoroastrian fire-worship roots!"
      },
      summary: "Baku, the capital of Azerbaijan on the Caspian Sea, hosted World Environment Day on 5th June. It blends 1,000-year-old historic fortresses with futuristic skyscrapers.",
      keyFacts: [
        "**Lowest Capital**: Sits 28 metres below sea level along the Caspian Sea.",
        "**Nickname**: 'City of Winds' due to frequent, fierce gale-force breezes.",
        "**World Environment Day**: Baku hosted the official global event on 5th June.",
        "**Azerbaijan Carpet Museum**: Designed to look like a giant rolled-up carpet; holds the world's largest collection of Azerbaijani carpets.",
        "**Flame Towers**: Three flame-shaped skyscrapers dominating the skyline, representing the historic land of fire.",
        "**Maiden Tower**: Cylindrical ancient UNESCO stone tower in the Old City dating back to the 12th century.",
        "**Little Venice**: Picturesque network of waterways where visitors cruise on Italian gondolas over clean water."
      ],
      didYouKnow: "Azerbaijan is situated at the crossroads between Eastern Europe and Western Asia, known historically as the Land of Fire."
    },
    {
      id: "june-ajmer",
      monthId: "june",
      category: "pride",
      categoryName: "Pride of India",
      title: "Ajmer Sharif Dargah, Rajasthan",
      tagline: "Sacred 13th-century shrine of Sufi Saint Khwaja Moinuddin Chishti",
      icon: "🕌",
      memorySpark: {
        headline: "Pure Silver Doors & Giant Cauldrons of Free Food!",
        hook: "Ajmer Sharif in Rajasthan welcomes people of all religions with pure open doors. Its majestic Buland Darwaza leads to a marble sanctum where two gigantic cauldrons (Deghs) cook sweet rice and porridge to feed thousands of hungry visitors for free every day!",
        funFact: "Mughal Emperors Humayun, Akbar, and Shah Jahan all built marble mosques and grand gates inside the shrine complex!"
      },
      summary: "Located in Ajmer, Rajasthan, Ajmer Sharif Dargah is one of India's most venerated Sufi shrines, dedicated to the 13th-century Persian Sufi saint and philosopher Khwaja Moinuddin Chishti.",
      keyFacts: [
        "**Location**: Ajmer, Rajasthan.",
        "**Saint**: Khwaja Moinuddin Chishti (13th-century Persian Sufi saint who preached universal brotherhood and selfless service).",
        "**Architecture**: Pure silver doors, white marble tomb, and the towering Buland Darwaza entrance.",
        "**Mughal Patrons**: Emperor Humayun expanded the shrine; Akbar and Shah Jahan added mosques inside.",
        "**Langar (Community Kitchen)**: Famous giant deghs (cooking pots) serve free warm meals to thousands of devotees and travelers daily, regardless of caste or faith."
      ],
      didYouKnow: "Devotees tie sacred threads on the marble screens of the shrine, believing every pure prayer made from the heart is fulfilled."
    },
    {
      id: "june-rainbow-mountain",
      monthId: "june",
      category: "curious",
      categoryName: "Be Curious",
      title: "Vinicunca — Peru's Rainbow Mountain",
      tagline: "Seven vibrant mineral stripes hidden under ice for centuries",
      icon: "🌈",
      memorySpark: {
        headline: "The Painted Mountain Unlocked by Melting Snow!",
        hook: "High in the Andes Mountains of Peru at 5,000 metres above sea level sits 'Vinicunca' (Rainbow Mountain). For hundreds of years it was completely buried under snow and glaciers until warmer temperatures melted the ice and revealed 7 brilliant stripes of turquoise, lavender, and gold minerals!",
        funFact: "Friendly furry llamas and alpacas accompany hikers all along the high Andean trail!"
      },
      summary: "Vinicunca, or Rainbow Mountain, is an Andean geological marvel in Peru. Its vibrant stripes are formed by centuries of weathering of different colored mineral sediments.",
      keyFacts: [
        "**Local Name**: 'Vinicunca' in the Quechua language (meaning 'mountain of colors').",
        "**Altitude**: Over 5,000 metres (16,400+ feet) above sea level in the Andes Range.",
        "**Formation**: Layers of sandstone, iron oxide, chlorite, and sulfur minerals weathered over millions of years.",
        "**Discovery**: Uncovered only recently after thick perpetual snow and ice melted off its ridges.",
        "**Sacred Site**: Revered by indigenous Quechua people as a holy protector of Mother Earth (Pachamama).",
        "**Animals on Trail**: Herds of llamas, alpacas, and mountain horses."
      ],
      didYouKnow: "Decathlon's famous outdoor brand 'Quechua' is named after the native Quechua people who have thrived in the high Andes mountains for thousands of years."
    },
    {
      id: "june-quick-facts",
      monthId: "june",
      category: "facts",
      categoryName: "Quick Facts & Snippets",
      title: "June Brain Sparkers & Famous Birthdays",
      tagline: "Lemon villages, royal cats & first GI tags",
      icon: "💡",
      memorySpark: {
        headline: "Darjeeling Tea #1 & Chief Mouser Larry!",
        hook: "Darjeeling tea was the very first product in India to win a GI Tag! Meanwhile in London, Larry the cat holds the official title of 'Chief Mouser to the Cabinet Office' at 10 Downing Street!",
        funFact: "Amaravati was officially declared the permanent capital of Andhra Pradesh, while Hyderabad remains Telangana's capital!"
      },
      summary: "Fascinating snippets from the June booklet including Amaravati, Larry the Cat, Kachai lemon village, and famous birthdays.",
      keyFacts: [
        "**Capital Declaration**: Amaravati was officially declared the permanent capital of Andhra Pradesh.",
        "**Airport Logo**: Noida International Airport chose the Sarus Crane (UP's state bird) for its official flying logo.",
        "**First Indian GI Tag**: Awarded to Darjeeling Tea in 2004 for its distinctive aroma and quality.",
        "**Lemon Village**: Kachai village in Ukhrul district, Manipur, is famous for its unique high-vitamin C lemons.",
        "**Pattachitra**: Traditional cloth painting art of Odisha ('Patta' = cloth, 'Chitra' = picture).",
        "**Larry the Cat**: The famous rescue cat serving as Britain's Chief Mouser at 10 Downing Street since 2011.",
        "**Sangri**: A drought-resistant slender bean tree pods native to the deserts of Rajasthan (used in Ker Sangri).",
        "**Born in June**: Sundar Pichai (Google CEO, 10 June), George Thomas (Badminton Champion), Krishnaraja Wadiyar IV (Maharaja of Mysuru), Animesh Kujur (Sprinter)."
      ],
      didYouKnow: "The Mid-Atlantic Ridge runs down the center of the Atlantic Ocean floor for 16,000 km, making it the longest mountain range on Earth, but almost all of it is hidden underwater!"
    },

    // ==================== JULY 2026 ====================
    {
      id: "jul-cwg",
      monthId: "jul",
      category: "pick",
      categoryName: "Pick of the Month",
      title: "Glasgow 2026 Commonwealth Games",
      tagline: "The 'Friendly Games' and Finnie the Unicorn!",
      icon: "🦄",
      memorySpark: {
        headline: "Finnie the Unicorn & Ahmedabad 2030!",
        hook: "Scotland's national animal is a mythical Unicorn! So Glasgow 2026 chose 'Finnie the Unicorn' as the official mascot, designed by local schoolchildren. And in 2030, Ahmedabad, India will host the 100-year Centenary Games!",
        funFact: "During the opening ceremony parade, the previous host nation marches in FIRST, and the current host marches LAST!"
      },
      summary: "The 2026 Commonwealth Games (CWG) take place in Glasgow, Scotland from 23 July to 2 August 2026. First held in 1930 as the British Empire Games, it is known worldwide as the 'Friendly Games'.",
      keyFacts: [
        "**Dates & Venue**: 23 July to 2 August 2026 in Glasgow, Scotland (Glasgow previously hosted in 2014).",
        "**Original Name**: Started in Hamilton, Canada in 1930 as the 'British Empire Games'.",
        "**Official Mascot**: 'Finnie the Unicorn' (Scotland's national animal), created by Scottish school students.",
        "**King's Baton Relay**: Prestigious tradition where a baton carrying the monarch's 'Message of Greeting' travels across Commonwealth nations before the Games.",
        "**Host Marching Order**: The previous host marches in first, other nations enter alphabetically, and the host nation marches last.",
        "**Ahmedabad 2030**: Scheduled to host the Games in India, celebrating 100 years since the inaugural 1930 edition.",
        "**Sports Lineup**: Features Swimming, Track Cycling, Lawn Bowls, Artistic Gymnastics, Netball, Basketball, and Para-Sports."
      ],
      didYouKnow: "The Commonwealth Games were cancelled only during World War II (1942 and 1946)."
    },
    {
      id: "jul-swaraj",
      monthId: "jul",
      category: "global",
      categoryName: "Global Lens",
      title: "Swaraj Dweep's Undersea World Records",
      tagline: "Giant National Flag & Tallest Human Stack beneath the sea!",
      icon: "🤿",
      memorySpark: {
        headline: "A Football-Field Flag Under the Ocean Waves!",
        hook: "Swaraj Dweep (formerly Havelock Island in Andaman & Nicobar) achieved two Guinness World Records: 200 divers unfurled a gigantic Indian Tricolour flag the size of a football field underwater, then built the tallest vertical underwater human tower!",
        funFact: "The island was renamed 'Swaraj Dweep' to honour freedom fighter Netaji Subhas Chandra Bose!"
      },
      summary: "Swaraj Dweep in the Andaman and Nicobar Islands set two back-to-back Guinness World Records underwater, showcasing India's marine tourism and deep-sea diving capabilities.",
      keyFacts: [
        "**Two Guinness Records**: (1) Giant Indian National Flag (football-field size) unfurled underwater by 200 divers; (2) Tallest vertical human stack on the ocean floor.",
        "**Location**: Swaraj Dweep (Ritchie Archipelago in Great Andaman region), famous for Radhanagar Beach.",
        "**Key Collaborators**: Indian Navy, Indian Coast Guard, and the Lt. Governor of Andaman & Nicobar.",
        "**Famous Beaches**: Radhanagar Beach (frequently ranked among Asia's best), Kalapathar, Vijaynagar, and Elephant Beach.",
        "**Adventure Hub**: Known globally for white-sand beaches, coral reefs, scuba diving, snorkelling, sea kayaking, and parasailing."
      ],
      didYouKnow: "Netaji Subhas Chandra Bose hoisted the Indian flag at Port Blair in 1943 and named the islands Shaheed and Swaraj Dweep."
    },
    {
      id: "jul-krithi",
      monthId: "jul",
      category: "global",
      categoryName: "Global Lens",
      title: "Dr. Krithi K. Karanth — Nat Geo Explorer of the Year",
      tagline: "First Indian scientist to win the prestigious Rolex Explorer Award",
      icon: "🐆",
      memorySpark: {
        headline: "Wild Shaale: Teaching Kids to Live with Wild Animals!",
        hook: "Dr. Krithi grew up trailing wild tigers and elephants in India's jungles with her scientist dad. She created 'Wild Shaale' (Wild School) to teach rural children living near jungles how to love and peacefully coexist with wildlife!",
        funFact: "She has partnered with over 10,000 farmers to prevent elephant crop raids without hurting the animals!"
      },
      summary: "Dr. Krithi K. Karanth was awarded the 2026 Rolex National Geographic Explorer of the Year — the first Indian scientist to win this global honour — for her groundbreaking work in human-wildlife coexistence.",
      keyFacts: [
        "**Historic Honor**: First Indian to receive the Rolex National Geographic Explorer of the Year award.",
        "**Field of Expertise**: Conservation biologist focusing on human-wildlife conflict and ecological harmony.",
        "**'Wild Shaale' Program**: Innovative environmental curriculum designed for school children living on the borders of tiger and elephant reserves.",
        "**Farmer Partnerships**: Trained over 10,000 farmers in wildlife-friendly farming techniques and compensation procedures.",
        "**Documentary Star**: Her conservation research has been featured across three award-winning BBC nature series."
      ],
      didYouKnow: "The National Geographic Explorer of the Year award is one of the highest honors in science, granting funding and worldwide recognition to pioneers."
    },
    {
      id: "jul-kadambini",
      monthId: "jul",
      category: "people",
      categoryName: "Person of the Month",
      title: "Dr. Kadambini Ganguly — India's First Woman Doctor",
      tagline: "Pioneering physician who shattered 19th-century gender barriers",
      icon: "🩺",
      memorySpark: {
        headline: "From Calcutta to Edinburgh: Medicine Pioneer!",
        hook: "In the 1880s when girls were barred from college, Kadambini Ganguly fought all odds, became one of India's first female graduates, entered Calcutta Medical College, and became the first Indian woman to practice Western medicine!",
        funFact: "She was born in Bhagalpur (Bihar) and also became one of the first female speakers at the Indian National Congress!"
      },
      summary: "Dr. Kadambini Ganguly (1861–1923) was a fearless trailblazer who gained admission to Calcutta Medical College and earned qualifications in England to champion women's healthcare in British India.",
      keyFacts: [
        "**Birth**: Born 18 July 1861 in Bhagalpur (Bihar).",
        "**First Woman Graduate**: Graduated with a Bachelor of Arts in 1883 alongside Chandramukhi Basu.",
        "**Medical Pioneer**: First woman admitted to Calcutta Medical College; earned Western medical credentials despite fierce prejudice.",
        "**Studies in England**: Sailed to the United Kingdom to earn advanced medical certifications from Edinburgh and Glasgow.",
        "**Social Reformer**: Fought for women's voting rights, education, and health; worked tirelessly for coal mine workers and social justice."
      ],
      didYouKnow: "Even Florence Nightingale wrote admiring letters praising Kadambini Ganguly's extraordinary courage and medical service in India!"
    },
    {
      id: "jul-seychelles",
      monthId: "jul",
      category: "places",
      categoryName: "Wonderful World",
      title: "Seychelles — Archipelago of Giant Tortoises",
      tagline: "115 tropical islands, little Big Ben, and the robber crab!",
      icon: "🏝️",
      memorySpark: {
        headline: "Esmeralda the Giant Tortoise & The Tree-Climbing Crab!",
        hook: "Seychelles is home to 'Esmeralda', one of the heaviest giant tortoises on Earth! It also has the 'Coconut Crab' (or Robber Crab) which climbs trees, snaps open coconuts with super-claws, and steals shiny camping pans!",
        funFact: "The capital city Victoria has a miniature silver clock tower nicknamed 'Little Big Ben' built in 1901!"
      },
      summary: "Seychelles is an archipelago nation of 115 granite and coral islands in the Indian Ocean near East Africa. It is famous for pristine beaches, unique flora, and the world's largest giant tortoise colony.",
      keyFacts: [
        "**Capital**: Victoria (on the island of Mahé), spotted by Portuguese explorer Vasco da Gama in 1502.",
        "**Little Big Ben**: Victoria Clock Tower erected in 1901 to commemorate Queen Victoria's death.",
        "**Bird Island & Esmeralda**: Home to thousands of seabirds and Esmeralda, one of the world's largest living giant tortoises.",
        "**Jellyfish Tree**: Rare endemic tree with unusual fruit capsules that resemble swimming jellyfish.",
        "**Black Parrot**: The national bird of Seychelles, found only in the palm forests of Praslin island.",
        "**Coconut Crab (Robber Crab)**: The world's largest terrestrial crab; climbs palm trees to crack coconuts and steals shiny silverware.",
        "**La Digue Island**: Famous for shallow crystal-clear turquoise waters framed by massive pink granite boulders."
      ],
      didYouKnow: "Seychelles is home to the world's largest population of giant Aldabra tortoises, outnumbering humans on several islands!"
    },
    {
      id: "jul-toy-train",
      monthId: "jul",
      category: "pride",
      categoryName: "Pride of India",
      title: "Darjeeling Himalayan Railway — The Toy Train",
      tagline: "India's first hill railway on a 2-foot narrow gauge track!",
      icon: "🚂",
      memorySpark: {
        headline: "Batasia 360° Loop & Ghoom Highest Station!",
        hook: "Built in 1881, the Darjeeling Toy Train runs on tracks only 2 feet wide! To climb the steep Himalayas, it snakes through the famous 'Batasia Loop' doing a full 360-degree circle around a hilltop garden!",
        funFact: "It chugs all the way up to Ghoom railway station — the highest railway station in India at 2,258 metres (7,407 ft)!"
      },
      summary: "The Darjeeling Himalayan Railway (DHR) is an iconic UNESCO World Heritage hill railway connecting the plains of Siliguri to the hill station of Darjeeling in West Bengal.",
      keyFacts: [
        "**Route**: Connects Siliguri to Darjeeling in West Bengal.",
        "**Gauge**: Runs on an ultra-narrow gauge track of just 2 feet (610 mm) width.",
        "**Toy Train Day**: Celebrated on 4th July, marking the day the first train chugged into Darjeeling in 1881 (over 145 years ago!).",
        "**Engineering Marvel**: Uses ingenious 'Z-reverses' and loops to climb steep hills without tunnels.",
        "**Batasia Loop**: A dramatic 360-degree spiral loop offering panoramic views of Mount Kanchenjunga.",
        "**Ghoom Station**: India's highest railway station at 2,258 m above sea level.",
        "**Vistadome Coaches**: Modern tourist coaches with glass roofs and huge viewing windows alongside vintage heritage steam engines."
      ],
      didYouKnow: "The Toy Train often chugs directly alongside bustling street markets, shops, and children playing on the hillside roads!"
    },
    {
      id: "jul-water-puppetry",
      monthId: "jul",
      category: "curious",
      categoryName: "Be Curious",
      title: "Vietnamese Water Puppetry & Uncle Teu",
      tagline: "1,000-year-old theatrical magic dancing over water",
      icon: "🎭",
      memorySpark: {
        headline: "Dancing on Water with Secret Bamboo Rods!",
        hook: "A thousand years ago, Vietnamese rice farmers got bored when monsoons flooded their paddy fields — so they invented puppets that dance on water! Puppeteers stand waist-deep behind screens controlling wooden puppets with secret underwater bamboo rods!",
        funFact: "The comedic host puppet is 'Uncle Teu', a chubby, grinning character whose name literally means 'Laugh'!"
      },
      summary: "Vietnamese Water Puppetry (Múa Rối Nước) is a vibrant traditional art form originating from northern Vietnam, where wooden puppets act out folklore upon a pool of shimmering water.",
      keyFacts: [
        "**Origin**: 11th century Red River Delta of Vietnam, developed by farmers during seasonal floods.",
        "**Stage**: A waist-deep pool of water serves as the stage for carved lacquered wooden puppets.",
        "**Hidden Puppeteers**: A team of puppeteers stands behind a bamboo screen, controlling puppets using underwater bamboo rods and strings invisible to the audience.",
        "**Uncle Teu**: The cheerful, humorous narrator puppet who opens the show with witty jokes ('Teu' means 'laugh').",
        "**Live Orchestra**: Accompanied by traditional live music with drums, wooden bells, bamboo flutes, and cymbals.",
        "**Themes**: Celebrates daily rural life: duck herding, rice planting, boat racing, dragon dances, and fishing."
      ],
      didYouKnow: "For hundreds of years, the secret mechanics of how puppeteers moved the puppets from under the water was guarded as a strictly kept family secret!"
    },
    {
      id: "jul-quick-facts",
      monthId: "jul",
      category: "facts",
      categoryName: "Quick Facts & Snippets",
      title: "July Sports Champions & Forest Mysteries",
      tagline: "F2 Monaco victory, Everest records & tufted caracals",
      icon: "⚡",
      memorySpark: {
        headline: "Kush Maini Monaco Win & Kami Rita 32!",
        hook: "Kush Maini became the first Indian driver to win a Formula 2 race at the glamorous Monaco Grand Prix! Meanwhile on Mount Everest, Kami Rita Sherpa reached the peak for a world-record 32nd time!",
        funFact: "The caracal is a wild desert cat with long black-tufted ears that act like mini satellite dishes to hear tiny mice!"
      },
      summary: "Thrilling achievements from July including Kush Maini's F2 victory, Everest climbing records, and unique Indian cultural snippets.",
      keyFacts: [
        "**F2 Champion**: Kush Maini (25) became the first Indian driver to win a Formula 2 race at the Monaco Grand Prix; the Indian tricolour was raised on the podium.",
        "**Everest Records**: Kami Rita Sherpa ('Everest Man') reached the summit for the 32nd time; Lhakpa Sherpa ('Mountain Queen') broke the female record with her 11th ascent.",
        "**Caracal**: A wild cat with distinctive long black ear tufts that improve hearing and communication.",
        "**Siliguri Corridor**: Narrow strip of land (nicknamed 'Chicken's Neck') connecting northeastern India to the rest of the nation.",
        "**Dhaan Ki Bori**: Traditional Indian sack race where one player carries their teammate on their back like a sack of harvested grain.",
        "**Kannadippaya**: Traditional 'mirror mat' handwoven from reeds by indigenous tribes of Kerala.",
        "**Born in July**: Giorgio Armani (Italian designer, 11 July), Dr. E.V. Chitnis (Indian space pioneer, 25 July), Sultan Hassanal Bolkiah (Brunei, 15 July), Aruna Asaf Ali (Freedom fighter & educator, 16 July)."
      ],
      didYouKnow: "In Formula 2 racing, every team uses the exact same car and engine, so races are decided entirely by the driver's pure skill and reaction speed!"
    },

    // ==================== AUGUST 2026 ====================
    {
      id: "aug-donald",
      monthId: "aug",
      category: "pick",
      categoryName: "Pick of the Month",
      title: "Donald Duck — 90 Years of Quacks & Laughs",
      tagline: "Walt Disney's resilient, short-tempered superstar",
      icon: "🦆",
      memorySpark: {
        headline: "Donald Fauntleroy Duck of Duckburg!",
        hook: "Donald's full middle name is 'Fauntleroy'! He was born on 9th June 1934 in 'The Wise Little Hen'. He has a fiery temper, lives in Duckburg, and is uncle to cheeky triplets Huey, Dewey, and Louie!",
        funFact: "Donald has appeared in more movies than Mickey Mouse, has a star on Hollywood Boulevard, and even has an asteroid named after him!"
      },
      summary: "Created by Walt Disney in 1934, Donald Duck is one of the world's most beloved cartoon icons. He teaches children that getting frustrated is natural, but bouncing back from mistakes is what makes a true hero.",
      keyFacts: [
        "**Full Name**: Donald Fauntleroy Duck.",
        "**First Appearance**: 9th June 1934 in the animated short film 'The Wise Little Hen'.",
        "**Home**: The fictional bustling city of Duckburg.",
        "**Family**: Nephew of billionaire Scrooge McDuck, twin brother of Della Duck, and uncle to mischievous triplets Huey, Dewey, and Louie Duck.",
        "**Best Pals**: Mickey Mouse, Goofy, Pluto, and Daisy Duck.",
        "**Hidden Talents**: An expert deep-sea fisherman, a capable ice hockey player, and a skilled classical pianist!",
        "**Life Lessons**: Teaches kids how to manage temper, love family, and bounce back cheerfully whenever things go wrong."
      ],
      didYouKnow: "Donald Duck has distinct international names: In Finland he is called 'Aku Ankka', in Sweden 'Kalle Anka', in Italy 'Paperino', in Denmark 'Anders And', and in Spain 'Pato Donald'!"
    },
    {
      id: "aug-church",
      monthId: "aug",
      category: "global",
      categoryName: "Global Lens",
      title: "Sagrada Família — World's Tallest Church",
      tagline: "Antoni Gaudí's forest canopy cathedral reaches 566 feet!",
      icon: "⛪",
      memorySpark: {
        headline: "A Forest of Stone Under Construction for 140 Years!",
        hook: "Barcelona's Sagrada Família has been under construction since 1882! With its central Tower of Jesus Christ and cross, it reached 566 feet — becoming the tallest church in the entire world!",
        funFact: "Architect Antoni Gaudí designed the interior columns to look like towering trees spreading into a leafy forest canopy!"
      },
      summary: "Barcelona's Basílica de la Sagrada Família in Spain took over the title of the world's tallest church from Germany's Ulm Minster after completing its majestic 566-foot central tower.",
      keyFacts: [
        "**Record Height**: 566 feet (approx. 172.5 metres), making it the tallest church structure in the world.",
        "**Location**: Barcelona, Catalonia, Spain.",
        "**Architect**: Master modernist architect Antoni Gaudí (1852–1926).",
        "**Name Meaning**: 'Holy Family' in Catalan/Spanish, dedicated to Jesus, Mary, and Joseph.",
        "**140+ Years of Building**: Construction began in 1882; funded entirely by private donations and visitor ticket sales.",
        "**Nature-Inspired Design**: Stone pillars branch out like forest trees supporting ceilings of kaleidoscopic stained glass.",
        "**18 Spires**: Dedicated to the 12 Apostles, 4 Evangelists, Virgin Mary, and Jesus Christ."
      ],
      didYouKnow: "A small primary school was built right on the church grounds by Gaudí so the children of the construction workers could receive free schooling!"
    },
    {
      id: "aug-whale",
      monthId: "aug",
      category: "global",
      categoryName: "Global Lens",
      title: "The Deep-Sea 'Whale Necropolis'",
      tagline: "World's deepest 5.3-million-year-old whale fossil graveyard",
      icon: "🐋",
      memorySpark: {
        headline: "Undersea Graveyard 7 Kilometres Below Sunlight!",
        hook: "In the pitch-black abyss 5 to 7 kilometres beneath the Indian Ocean off Australia, scientists discovered a 5.3-million-year-old 'Whale Necropolis' with 500 fossilized whale skeletons!",
        funFact: "A V-shaped underwater trench acted like a giant funnel, collecting whale remains over millions of years to feed bone-eating zombie worms!"
      },
      summary: "International researchers using deep-sea submersibles discovered the oldest, largest, and deepest whale fossil graveyard in the Indian Ocean off Western Australia.",
      keyFacts: [
        "**Depth**: Discovered 5 to 7 kilometres (over 16,000 to 23,000 feet) beneath the ocean surface where zero sunlight reaches.",
        "**Fossil Age**: Some fossils date back 5.3 million years, situated in ocean basins formed 50 to 60 million years ago.",
        "**Number of Sites**: Close to 500 whale-fossil sites, containing ancient baleen and toothed whale skulls.",
        "**The Funnel Effect**: A massive V-shaped tectonic seafloor trench channeled sinking whale carcasses into a single underwater cemetery.",
        "**Alien Ecosystem**: The decaying bones support unique deep-sea life like tubeworms, bone-eating *Osedax* worms, deep-sea snails, and brittle stars."
      ],
      didYouKnow: "When a whale dies, its carcass sinking to the seabed is called a 'whale fall', providing food for hundreds of deep-sea species for over 50 years!"
    },
    {
      id: "aug-asha",
      monthId: "aug",
      category: "people",
      categoryName: "Person of the Month",
      title: "Lt. Bharati 'Asha' Sahay Choudhry (INA)",
      tagline: "Teenage warrior of Netaji's Rani of Jhansi Regiment",
      icon: "🎖️",
      memorySpark: {
        headline: "Asha-San: Netaji's Teenage Freedom Warrior!",
        hook: "Born in Japan to exiled Indian revolutionaries, Bharati joined Netaji Subhas Chandra Bose's all-women combat army (Rani of Jhansi Regiment) at age 17! Known affectionately in Japan as 'Asha-san', she kept a brave wartime diary!",
        funFact: "Her father named her Bharati (for India) and Asha (meaning 'freedom and hope')!"
      },
      summary: "Lt. Bharati 'Asha' Sahay Choudhry (1928–2025) was an Indian National Army (INA) veteran who fought fearlessly as a teenager in World War II to free India from British rule.",
      keyFacts: [
        "**Birth & Upbringing**: Born in Kobe, Japan in 1928 to exiled Indian revolutionaries Anand Mohan Sahay and Sati Sen.",
        "**Rani of Jhansi Regiment**: Joined the INA's famous all-women combat regiment in 1945 at just 17 years old.",
        "**Inspiration**: Mentored by Netaji Subhas Chandra Bose, who envisioned women on the frontlines of India's independence.",
        "**Wartime Diary**: Maintained a vivid diary documenting the struggles of teenage volunteer soldiers fighting in Southeast Asia.",
        "**Long Life of Service**: Lived to age 97, dedicating her later years to strengthening cultural friendship between India and Japan."
      ],
      didYouKnow: "The Rani of Jhansi Regiment was one of the very first all-female military combat units anywhere in the world during World War II!"
    },
    {
      id: "aug-bhagalpur",
      monthId: "aug",
      category: "places",
      categoryName: "Wonderful World",
      title: "Bhagalpur — The Silk City of India",
      tagline: "Tussar silk, Vikramshila ruins & Gangetic dolphins",
      icon: "🧣",
      memorySpark: {
        headline: "Golden Tussar Silk & India's National River Dolphin!",
        hook: "Bhagalpur in Bihar is called the 'Silk City of India' for its world-famous Tussar silk! It is also home to India's ONLY river dolphin sanctuary, where endangered blind Gangetic dolphins swim in the holy River Ganga!",
        funFact: "In the Mahabharata, Bhagalpur was known as the Kingdom of Anga, ruled by the generous warrior Karna!"
      },
      summary: "Bhagalpur is an ancient heritage city along the River Ganga in Bihar. Famous globally for its handwoven Tussar silk, it houses ancient Buddhist ruins and India's river dolphin sanctuary.",
      keyFacts: [
        "**Nickname**: 'Silk City of India' for its premium hand-spun Bhagalpur Tussar silk.",
        "**Gangetic Dolphin Sanctuary**: Home to the Vikramshila Gangetic Dolphin Sanctuary, protecting India's National Aquatic Animal.",
        "**Ancient Vikramshila University**: Historic 8th-century Buddhist seat of learning founded by Pala king Dharmapala (now ruins being revived).",
        "**Historical Legacy**: Known in ancient epics as Anga; also called Bhagdatpuram ('City of Good Luck').",
        "**Mandar Hill**: Sacred hill mentioned in the Samudra Manthan legends, featuring rock inscriptions and a tranquil base lake.",
        "**Pioneering Doctor**: Birthplace of Dr. Kadambini Ganguly, one of India's first female Western-trained doctors."
      ],
      didYouKnow: "The Gangetic river dolphin is practically blind and navigates the muddy waters of the Ganga using advanced ultrasonic echolocation (clicks)!"
    },
    {
      id: "aug-boat-race",
      monthId: "aug",
      category: "pride",
      categoryName: "Pride of India",
      title: "Nehru Trophy Boat Race — 'Olympics on Water'",
      tagline: "100-foot snake boats racing on Punnamada Lake, Kerala",
      icon: "🛶",
      memorySpark: {
        headline: "Nehru Jumped In! 100 Rowers in a 100-Foot Cobra Boat!",
        hook: "When Prime Minister Jawaharlal Nehru visited Kerala in 1952, the boatmen gave him a surprise snake boat race. Nehru was so thrilled he leaped aboard the winning boat and gifted a silver snake-boat trophy on a wooden pedestal!",
        funFact: "Known as 'Chundan Vallams', these boats are over 100 feet long with raised hoods like a cobra and hold 100+ singing oarsmen!"
      },
      summary: "Held annually on the fourth Saturday of August in Punnamada Lake near Alappuzha, the Nehru Trophy Boat Race is Kerala's most thrilling water sport spectacle, celebrated as the 'Olympics on Water'.",
      keyFacts: [
        "**Venue**: Punnamada Lake near Alappuzha (Alleppey), Kerala.",
        "**Nicknamed**: 'The Olympics on Water'.",
        "**Chundan Vallams (Snake Boats)**: Over 100 feet long with a stern rising 10 to 12 feet resembling a rearing snake hood.",
        "**The Crew**: Each snake boat is powered by 100+ oarsmen, 25 cheering singers (singing traditional 'Vanchipattu' boat songs), and 4 helmsmen.",
        "**Origins**: Started in 1952 when Pandit Jawaharlal Nehru visited Kerala and was welcomed by an electrifying boat race.",
        "**The Silver Trophy**: Nehru personally donated a silver replica of a snake boat mounted on a wooden abacus.",
        "**War History**: In ancient times, the Kings of Alleppey built these swift boats for naval battles in narrow backwater canals."
      ],
      didYouKnow: "Lakhs of cheering spectators line the palm-fringed banks of Punnamada Lake to roar for their favorite village snake boat!"
    },
    {
      id: "aug-utilidor",
      monthId: "aug",
      category: "curious",
      categoryName: "Be Curious",
      title: "Disney's Secret Underground 'Utilidor'",
      tagline: "The secret tunnel city preserving the Magic Kingdom illusion",
      icon: "🏰",
      memorySpark: {
        headline: "The Mouseketeria & The Secret Cowboy Problem!",
        hook: "Walt Disney saw a Frontierland cowboy strolling through futuristic Tomorrowland and thought: 'This ruins the magic!' So in Florida, Disney built a secret underground city with the 'Mouseketeria' cafeteria and 'Kingdom Kutters' barber shop!",
        funFact: "The Utilidor is actually at ground level — the entire Magic Kingdom theme park was built on top of the tunnels using soil dug out from the Seven Seas Lagoon!"
      },
      summary: "The Utilidor ('utility corridors') is an 9-acre network of subterranean tunnels beneath Walt Disney World's Magic Kingdom in Florida, allowing costumed characters and crew to move invisibly.",
      keyFacts: [
        "**Name**: Portmanteau of 'Utility' and 'Corridor'.",
        "**Purpose**: Preserves theme-park illusion so costumed characters never cross into out-of-character zones.",
        "**The Mouseketeria**: The cast-member cafeteria hidden inside the tunnel network.",
        "**Kingdom Kutters**: The in-tunnel hair salon ensuring cast members' haircuts strictly match Disney style guides.",
        "**Color-Coded Walls**: Tunnels are painted in distinct colors so staff know exactly which themed land is above them.",
        "**Vehicle Transit**: Cast members travel using electric golf carts, bicycles, and emergency pedestrian walkways.",
        "**Age Restriction**: Only guests aged 16+ on special backstage tours are allowed inside, preserving the magic for children."
      ],
      didYouKnow: "The Utilidor once housed the largest working wardrobe in the world, with over 1.2 million Disney costumes!"
    },
    {
      id: "aug-quick-facts",
      monthId: "aug",
      category: "facts",
      categoryName: "Quick Facts & Snippets",
      title: "August Records, Hot Chillies & Magic Birds",
      tagline: "Airplane bleed holes, Great Potoo, and Olympic rings",
      icon: "🌶️",
      memorySpark: {
        headline: "Dalle Chilli Fire & The Bird That Sees With Closed Eyes!",
        hook: "Sikkim's round Dalle Chilli is one of the hottest chillies on Earth! Meanwhile the Great Potoo bird has tiny magic slits in its eyelids that let it spot predators even while completely asleep with eyes shut!",
        funFact: "The tiny hole at the bottom of an airplane window is called a 'bleed hole' — it regulates air pressure so windows don't crack!"
      },
      summary: "Exciting trivia from August including national sports records, aircraft safety engineering, rare glass craft, and legendary birthdays.",
      keyFacts: [
        "**Athletics Records**: Ancy Sojan leaped 6.88m in women's long jump, breaking Anju Bobby George's 22-year-old record; Sarvesh Anil Kushare cleared 2.31m in men's high jump.",
        "**Songwriters Hall of Fame**: Taylor Swift became the youngest woman inducted into the SHOF at age 36.",
        "**Bleed Hole**: The tiny pinhole at the bottom of commercial aircraft windows that balances air pressure between inner and outer panes.",
        "**Murano Glass**: Renowned blown glassware crafted for centuries on the Venetian island of Murano, Italy.",
        "**Dalle Chilli**: Round fiery cherry-pepper chilli grown in Sikkim, celebrated for intense aroma and heat.",
        "**Great Potoo**: Master of camouflage whose eyelids have tiny gaps, allowing it to see its surroundings with eyes closed.",
        "**Olympic Flag**: Five interlocking rings of blue, yellow, black, green, and red on a white field, representing the five inhabited continents united in sport.",
        "**Born in August**: Dr. Homi N. Sethna (Nuclear pioneer, 24 August), Kobe Bryant (NBA legend, 23 August), Bhagyashree Thipsay (Chess champion, 4 August), Jannik Sinner (Tennis star, 16 August)."
      ],
      didYouKnow: "The five colors of the Olympic rings (plus white background) were chosen because at least one of these colors appears in every national flag on Earth!"
    }
  ],

  // --------------------------------------------------------------------------
  // MONTHLY QUIZZES (10 QUESTIONS PER MONTH DIRECTLY FROM BOOKLETS)
  // --------------------------------------------------------------------------
  quizzes: {
    june: [
      {
        id: "june-q1",
        question: "Name the spacecraft of the Artemis II mission that carried astronauts on a journey around the Moon.",
        options: ["Orion", "Phoenix", "Apollo 17", "Voyager"],
        answer: 0,
        explanation: "NASA's Orion spacecraft was tested during the 10-day Artemis II crewed voyage around the Moon."
      },
      {
        id: "june-q2",
        question: "Antarctica's emperor penguin was recently categorised as _____ by the IUCN Red List.",
        options: ["Extinct", "Endangered", "Vulnerable", "Near Threatened"],
        answer: 1,
        explanation: "Due to rapid melting of sea-ice caused by climate change, both the emperor penguin and Antarctic fur seal were classified as Endangered."
      },
      {
        id: "june-q3",
        question: "Amaravati was officially declared as the permanent capital of which Indian state?",
        options: ["Telangana", "Andhra Pradesh", "Karnataka", "Odisha"],
        answer: 1,
        explanation: "Amaravati was officially declared the permanent capital of Andhra Pradesh, while Hyderabad continues as Telangana's capital."
      },
      {
        id: "june-q4",
        question: "The name of which ocean means 'peaceful sea'?",
        options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
        answer: 1,
        explanation: "Ferdinand Magellan named it 'Pacific' (meaning peaceful sea) because the waters seemed calm during his expedition."
      },
      {
        id: "june-q5",
        question: "Parbati Barua is India's first woman _____ to be honoured with the prestigious Padma Shri.",
        options: ["Locomotive Pilot", "Mahout", "Fighter Pilot", "Mountaineer"],
        answer: 1,
        explanation: "Parbati Barua, popularly known as 'Hasti Kanya', is India's first female mahout and has tamed over 500 elephants."
      },
      {
        id: "june-q6",
        question: "Baku, the host city of this year's World Environment Day, is the capital of which country?",
        options: ["Mongolia", "Azerbaijan", "Kazakhstan", "Armenia"],
        answer: 1,
        explanation: "Baku is the capital of Azerbaijan, situated on the Caspian Sea, and is the world's lowest-lying capital city (-28m below sea level)."
      },
      {
        id: "june-q7",
        question: "Located in the Andes Mountain Range, this natural wonder is renowned for its vibrant layers of mineral colours. Name it.",
        options: ["Uluru", "Rainbow Mountain (Vinicunca)", "Mount Everest", "Matterhorn"],
        answer: 1,
        explanation: "Rainbow Mountain (Vinicunca) in Peru sits over 5,000 metres high and was revealed when glaciers melted."
      },
      {
        id: "june-q8",
        question: "Where is the Mid-Atlantic Ridge, the longest mountain range on Earth, located?",
        options: ["The Himalayas", "Atlantic Ocean", "Pacific Ocean", "The Andes"],
        answer: 1,
        explanation: "The Mid-Atlantic Ridge runs along the seabed of the Atlantic Ocean. Almost all of it remains hidden underwater."
      },
      {
        id: "june-q9",
        question: "Which of these famous holy Sufi shrines is located in Rajasthan?",
        options: ["Haji Ali Dargah", "Ajmer Sharif Dargah", "Nizamuddin Dargah", "Salim Chishti Dargah"],
        answer: 1,
        explanation: "Ajmer Sharif Dargah in Ajmer, Rajasthan, is the marble shrine of the 13th-century Sufi saint Khwaja Moinuddin Chishti."
      },
      {
        id: "june-q10",
        question: "Who is Britain's famous 'Chief Mouser' residing at 10 Downing Street?",
        options: ["Tom the Cat", "Larry the Cat", "Garfield", "Felix"],
        answer: 1,
        explanation: "Larry the Cat has served as Britain's official Chief Mouser to the Cabinet Office at 10 Downing Street since 2011."
      }
    ],

    jul: [
      {
        id: "jul-q1",
        question: "Which island in the Andaman and Nicobar Islands set two underwater Guinness World Records?",
        options: ["Lakshadweep", "Swaraj Dweep", "Barren Island", "Ross Island"],
        answer: 1,
        explanation: "Swaraj Dweep (formerly Havelock Island) set records for unfurling a football-field-sized Indian flag and making the tallest underwater human stack."
      },
      {
        id: "jul-q2",
        question: "Name the first Indian scientist to win the '2026 Rolex National Geographic Explorer of the Year' award.",
        options: ["Dr. Sunita Narain", "Dr. Krithi K. Karanth", "Dr. Salim Ali", "Dr. Madhav Gadgil"],
        answer: 1,
        explanation: "Dr. Krithi K. Karanth won for her 'Wild Shaale' curriculum and work reducing human-wildlife conflict with over 10,000 farmers."
      },
      {
        id: "jul-q3",
        question: "Name the first Indian racing driver to win a Formula 2 race at the Monaco Grand Prix.",
        options: ["Narain Karthikeyan", "Kush Maini", "Karun Chandhok", "Jehan Daruvala"],
        answer: 1,
        explanation: "25-year-old Kush Maini made motorsport history by winning an F2 race in Monaco and having the Indian national anthem played on the podium."
      },
      {
        id: "jul-q4",
        question: "The Commonwealth Games was originally called _____ when it began in Hamilton, Canada in 1930.",
        options: ["British Empire Games", "Asian Games", "Friendly Games", "Olympic Games"],
        answer: 0,
        explanation: "The first Commonwealth Games took place in 1930 in Canada under the name 'British Empire Games'."
      },
      {
        id: "jul-q5",
        question: "Seychelles' Bird Island is home to one of the world's biggest giant tortoises named:",
        options: ["Lonesome George", "Esmeralda", "Jonathan", "Harriet"],
        answer: 1,
        explanation: "Esmeralda is one of the heaviest and oldest living giant tortoises on Bird Island in the Seychelles."
      },
      {
        id: "jul-q6",
        question: "Uncle Teu is a famous cheerful, comedic narrator puppet in the water puppetry shows of which country?",
        options: ["Vietnam", "Japan", "Thailand", "Indonesia"],
        answer: 0,
        explanation: "Uncle Teu ('Teu' means laugh) is the beloved host in Vietnamese Water Puppetry (Múa Rối Nước), which originated 1,000 years ago in rice fields."
      },
      {
        id: "jul-q7",
        question: "The Darjeeling Himalayan Railway connects the plains of _____ to the hill station of Darjeeling in West Bengal.",
        options: ["Shimla", "Siliguri", "Kolkata", "Guwahati"],
        answer: 1,
        explanation: "The 2-foot narrow gauge 'Toy Train' connects Siliguri to Darjeeling, passing through Ghoom (India's highest station)."
      },
      {
        id: "jul-q8",
        question: "What kind of animal is a 'caracal'?",
        options: ["Wild dog", "Wild cat", "Desert rodent", "Mountain bird"],
        answer: 1,
        explanation: "A caracal is a sleek wild cat recognized by its distinctive, striking black-tufted ears."
      },
      {
        id: "jul-q9",
        question: "Victoria is the capital city of which tropical island nation?",
        options: ["Seychelles", "Maldives", "Mauritius", "Madagascar"],
        answer: 0,
        explanation: "Victoria, home to the 'Little Big Ben' clock tower, is the capital of Seychelles in the Indian Ocean."
      },
      {
        id: "jul-q10",
        question: "Who was the first Indian woman to gain admission to Calcutta Medical College and earn a Western medical degree?",
        options: ["Annie Besant", "Dr. Kadambini Ganguly", "Sarojini Naidu", "Anandi Gopal Joshi"],
        answer: 1,
        explanation: "Dr. Kadambini Ganguly graduated from Calcutta Medical College and earned higher qualifications in Edinburgh, blazing trails for Indian women."
      }
    ],

    aug: [
      {
        id: "aug-q1",
        question: "Which of these is currently the tallest church structure in the world at 566 feet?",
        options: ["St. Peter's Basilica", "Sagrada Família", "Ulm Minster", "Cologne Cathedral"],
        answer: 1,
        explanation: "Barcelona's Sagrada Família, designed by Antoni Gaudí, reached 566 feet after placing the cross atop the Tower of Jesus Christ."
      },
      {
        id: "aug-q2",
        question: "Where have scientists discovered the world's deepest, largest 5.3-million-year-old whale fossil graveyard?",
        options: ["Pacific Ocean", "Indian Ocean (off Australia)", "Atlantic Ocean", "Arctic Ocean"],
        answer: 1,
        explanation: "International scientists found the 'Whale Necropolis' with 500 fossil sites 5 to 7 km deep in the Indian Ocean off Western Australia."
      },
      {
        id: "aug-q3",
        question: "Indian athlete Ancy Sojan made history in the women's long jump by breaking whose 22-year-old national record?",
        options: ["P.T. Usha", "Anju Bobby George", "Hima Das", "Dutee Chand"],
        answer: 1,
        explanation: "Ancy Sojan leaped 6.88 metres, surpassing legendary Anju Bobby George's record set 22 years prior."
      },
      {
        id: "aug-q4",
        question: "What is Donald Duck's official middle name?",
        options: ["Quackmore", "Fauntleroy", "Scrooge", "Dewey"],
        answer: 1,
        explanation: "His full name is Donald Fauntleroy Duck, first introduced by Walt Disney on 9 June 1934."
      },
      {
        id: "aug-q5",
        question: "Indian National Army (INA) veteran Lt. Bharati Asha Sahay Choudhry was fondly called _____ in Japan.",
        options: ["Choudhry-san", "Asha-san", "Bharati-chan", "Sensei"],
        answer: 1,
        explanation: "Growing up in Japan before joining Netaji's Rani of Jhansi Regiment at age 17, she was warmly known as 'Asha-san'."
      },
      {
        id: "aug-q6",
        question: "Bhagalpur Silk from Bihar is famously known across the world as:",
        options: ["Chanderi Silk", "Tussar Silk", "Muga Silk", "Mulberry Silk"],
        answer: 1,
        explanation: "Bhagalpur is known as the 'Silk City of India' for its handwoven, high-quality Tussar silk."
      },
      {
        id: "aug-q7",
        question: "Disney Magic Kingdom's secret underground tunnel system in Florida is called the:",
        options: ["Adventureland", "Utilidor", "Tomorrowland Vault", "Wonderways"],
        answer: 1,
        explanation: "The 'Utilidor' (short for utility corridors) connects the park so costumed characters move unseen by visitors."
      },
      {
        id: "aug-q8",
        question: "What famous boat race held on Punnamada Lake is referred to as the 'Olympics on Water' in Kerala?",
        options: ["Dragon Water Race", "Nehru Trophy Boat Race", "Champakulam Boat Race", "Payippad Jalotsavam"],
        answer: 1,
        explanation: "The Nehru Trophy Boat Race features 100-foot snake boats (Chundan Vallams) competing for a silver trophy donated by Pt. Nehru in 1952."
      },
      {
        id: "aug-q9",
        question: "At Disney's underground Utilidor, what is the cast members' cafeteria called?",
        options: ["The Magicteria", "The Mouseketeria", "Goofy's Diner", "Duckburg Bistro"],
        answer: 1,
        explanation: "Cast members eat at 'The Mouseketeria' and get their haircuts at 'Kingdom Kutters' inside the Utilidor."
      },
      {
        id: "aug-q10",
        question: "Dalle Chilli is among the hottest cherry chillies in the world. In which Indian state are they primarily grown?",
        options: ["Andhra Pradesh", "Sikkim", "Kerala", "Rajasthan"],
        answer: 1,
        explanation: "Sikkim's round red Dalle Chilli is celebrated for its fiery heat, sweet aroma, and GI-tagged culinary status."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // PICTURE QUIZ ROUND (4 QUESTIONS PER MONTH)
  // --------------------------------------------------------------------------
  pictureQuizzes: {
    june: [
      {
        id: "june-pic-1",
        title: "Pacific Garbage Vortex",
        imageBadge: "🌊🗑️",
        svgGraphic: "garbage-patch",
        prompt: "Identify this massive expanse of floating marine debris and plastic waste located in the North Pacific Ocean.",
        options: ["Great Pacific Garbage Patch", "Sargasso Sea", "Indian Ocean Gyre", "Bermuda Triangle"],
        answer: 0,
        explanation: "The Great Pacific Garbage Patch is a vortex of plastic waste trapped by circulating ocean currents."
      },
      {
        id: "june-pic-2",
        title: "Padma Shri Conservationist",
        imageBadge: "🐘🎖️",
        svgGraphic: "parbati-barua",
        prompt: "Identify India's first woman mahout receiving the Padma Shri for her legendary work protecting wild elephants in Assam.",
        options: ["Bachendri Pal", "Parbati Barua", "Sunita Williams", "Karnam Malleswari"],
        answer: 1,
        explanation: "Parbati Barua, 'Hasti Kanya', caught her first wild elephant at age 14 and has tamed over 500 elephants."
      },
      {
        id: "june-pic-3",
        title: "Baku Architectural Marvel",
        imageBadge: "🏛️📜",
        svgGraphic: "carpet-museum",
        prompt: "This unique building in Baku, Azerbaijan is shaped like a giant rolled-up scroll. What does it house the world's largest collection of?",
        options: ["Ancient Coins", "Azerbaijani Carpets", "Stained Glass", "Clay Pots"],
        answer: 1,
        explanation: "The Azerbaijan Carpet Museum is world-famous for being architecturally designed as a huge rolled carpet!"
      },
      {
        id: "june-pic-4",
        title: "Andean Striped Wonder",
        imageBadge: "🏔️🌈",
        svgGraphic: "rainbow-mountain",
        prompt: "Locally known as 'Vinicunca' in Peru, how is this 5,000-metre-high multi-colored mountain better known to the world?",
        options: ["Mount Fuji", "Rainbow Mountain", "Mount Kilimanjaro", "K2"],
        answer: 1,
        explanation: "Vinicunca, or Rainbow Mountain, in the Peruvian Andes features 7 colorful mineral layers revealed when snow melted."
      }
    ],

    jul: [
      {
        id: "jul-pic-1",
        title: "First Hill Railway in India",
        imageBadge: "🚂🏔️",
        svgGraphic: "darjeeling-train",
        prompt: "Name this iconic 2-foot narrow gauge 'Toy Train' in West Bengal that climbs through the Batasia 360-degree loop.",
        options: ["Kalka-Shimla Railway", "Darjeeling Himalayan Railway", "Nilgiri Mountain Railway", "Matheran Hill Railway"],
        answer: 1,
        explanation: "The Darjeeling Himalayan Railway (DHR) was built in 1881 and runs between Siliguri and Darjeeling."
      },
      {
        id: "jul-pic-2",
        title: "Native Island Flora",
        imageBadge: "🌳🪼",
        svgGraphic: "jellyfish-tree",
        prompt: "This rare tree is named after its distinctive jellyfish-shaped fruit capsules. To which Indian Ocean island nation is it native?",
        options: ["Madagascar", "Seychelles", "Mauritius", "Sri Lanka"],
        answer: 1,
        explanation: "The Jellyfish Tree (*Medusagyne oppositifolia*) is critically endangered and native exclusively to Seychelles."
      },
      {
        id: "jul-pic-3",
        title: "Traditional Performing Art",
        imageBadge: "🎭🌊",
        svgGraphic: "water-puppetry",
        prompt: "Wooden puppets like Uncle Teu dance and glide across waist-deep water pools in this 1,000-year-old performing art of:",
        options: ["Japan", "Vietnam", "Cambodia", "China"],
        answer: 1,
        explanation: "Vietnamese Water Puppetry (Múa Rối Nước) was invented by rice farmers in the flooded Red River Delta."
      },
      {
        id: "jul-pic-4",
        title: "Commonwealth Games Tradition",
        imageBadge: "👑🏃",
        svgGraphic: "baton-relay",
        prompt: "Name this historic Commonwealth Games tradition where a baton carries the monarch's Message of Greeting across member nations.",
        options: ["Olympic Torch Run", "King's Baton Relay", "Commonwealth Freedom Torch", "Friendship Flame"],
        answer: 1,
        explanation: "The King's Baton Relay begins at Buckingham Palace in London and journeys to the host city for the opening ceremony."
      }
    ],

    aug: [
      {
        id: "aug-pic-1",
        title: "Iconic Disney Character",
        imageBadge: "🦆✨",
        svgGraphic: "donald-duck",
        prompt: "Who is the legendary animator and studio founder who created Donald Fauntleroy Duck in 1934?",
        options: ["Ub Iwerks", "Walt Disney", "Stan Lee", "Chuck Jones"],
        answer: 1,
        explanation: "Walt Disney created Donald Duck, who made his screen debut in 'The Wise Little Hen' on 9th June 1934."
      },
      {
        id: "aug-pic-2",
        title: "Teenage Freedom Fighter",
        imageBadge: "🎖️🇮🇳",
        svgGraphic: "bharati-asha",
        prompt: "Identify this veteran freedom fighter who joined Netaji's all-women Rani of Jhansi Regiment at age 17 during World War II.",
        options: ["Captain Lakshmi Sahgal", "Lt. Bharati 'Asha' Sahay Choudhry", "Aruna Asaf Ali", "Usha Mehta"],
        answer: 1,
        explanation: "Lt. Bharati 'Asha' Sahay Choudhry (1928–2025) was known as 'Asha-san' in Japan and chronicled her battles in a diary."
      },
      {
        id: "aug-pic-3",
        title: "National Aquatic Animal",
        imageBadge: "🐬🌊",
        svgGraphic: "gangetic-dolphin",
        prompt: "Bhagalpur hosts a sanctuary along the Ganga to protect this endangered National Aquatic Animal of India. Name it.",
        options: ["Gharial", "Gangetic River Dolphin", "Olive Ridley Turtle", "Golden Mahseer"],
        answer: 1,
        explanation: "The Vikramshila Gangetic Dolphin Sanctuary in Bhagalpur, Bihar protects India's blind river dolphin (*Platanista gangetica*)."
      },
      {
        id: "aug-pic-4",
        title: "Silver Snake Boat Trophy",
        imageBadge: "🏆🛶",
        svgGraphic: "nehru-trophy",
        prompt: "For which electrifying Kerala water race is this prestigious silver snake-boat trophy awarded annually on Punnamada Lake?",
        options: ["Nehru Trophy Boat Race", "President's Water Cup", "Kerala Backwater Derby", "Malabar Regatta"],
        answer: 0,
        explanation: "Pt. Jawaharlal Nehru donated the silver snake-boat model after being thrilled by a spontaneous boat race in 1952."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // DETECTIVE & DECODER ARCADE GAMES
  // --------------------------------------------------------------------------
  arcadeGames: [
    {
      id: "game-donald-cipher",
      title: "🦆 Donald's Secret Agent Cipher",
      monthId: "aug",
      type: "cipher",
      instruction: "Donald Duck is known by undercover codenames around the globe! Use the A=1, B=2, C=3 cipher to decode his international names!",
      cipherKey: "A=1, B=2, C=3 ... Z=26",
      challenges: [
        {
          country: "Finland 🇫🇮",
          coded: [1, 11, 21, " ", 1, 14, 11, 11, 1],
          solution: "AKU ANKKA",
          hint: "Starts with 'A' and ends with 'ANKKA' (Duck in Finnish)!"
        },
        {
          country: "Italy 🇮🇹",
          coded: [16, 1, 16, 5, 18, 9, 14, 15],
          solution: "PAPERINO",
          hint: "Famous Italian nickname meaning 'little gosling'!"
        },
        {
          country: "Sweden 🇸🇪",
          coded: [11, 1, 12, 12, 5, " ", 1, 14, 11, 1],
          solution: "KALLE ANKA",
          hint: "Beloved Swedish household name since 1958!"
        },
        {
          country: "Denmark 🇩🇰",
          coded: [1, 14, 4, 5, 18, 19, " ", 1, 14, 4],
          solution: "ANDERS AND",
          hint: "'And' means duck in Danish!"
        },
        {
          country: "Spain 🇪🇸",
          coded: [16, 1, 20, 15, " ", 4, 15, 14, 1, 12, 4],
          solution: "PATO DONALD",
          hint: "'Pato' means duck in Spanish!"
        }
      ]
    },
    {
      id: "game-city-strike",
      title: "🏙️ Indian City Laser-Strike",
      monthId: "aug",
      type: "strike",
      instruction: "Secret agents scrambled famous Indian city names by injecting stray digits! Zap away all numbers to reveal the real city!",
      challenges: [
        {
          nickname: "The Pink City 🌸",
          scrambled: "4SJA781P987UR24",
          solution: "JAIPUR",
          state: "Rajasthan",
          clue: "Famous for Hawa Mahal and Amer Fort!"
        },
        {
          nickname: "City of Nawabs 👑",
          scrambled: "894L3USCK76NOW",
          solution: "LUCKNOW",
          state: "Uttar Pradesh",
          clue: "Capital city famous for Bara Imambara and Chikankari embroidery!"
        },
        {
          nickname: "The Pearl / Twin City 🦪",
          scrambled: "H896YD44ERA8B9AD",
          solution: "HYDERABAD",
          state: "Telangana",
          clue: "Home of Charminar, Golconda Fort, and Biryani!"
        },
        {
          nickname: "The Steel City ⚙️",
          scrambled: "JS2A3M7SHE84DPZUR",
          solution: "JAMSHEDPUR",
          state: "Jharkhand",
          clue: "India's first planned industrial city founded by Jamsetji Tata!"
        },
        {
          nickname: "The Orange City 🍊",
          scrambled: "357NA98GP45U72R8",
          solution: "NAGPUR",
          state: "Maharashtra",
          clue: "Geographic center of India, famous for juicy sweet oranges!"
        }
      ]
    },
    {
      id: "game-earth-days",
      title: "🌍 Earth Celebration Matchmaker",
      monthId: "june",
      type: "match",
      instruction: "Connect each important environmental day to its official international calendar date!",
      pairs: [
        { day: "World Water Day 💧", date: "22 March", hint: "Springtime reminder to save fresh drinking water." },
        { day: "Earth Day 🌎", date: "22 April", hint: "Exactly one month after Water Day!" },
        { day: "World Environment Day 🌿", date: "5 June", hint: "Celebrated in Baku this year to protect nature." },
        { day: "World Ozone Day 🛡️", date: "16 September", hint: "Marks the Montreal Protocol saving Earth's sky shield." }
      ]
    },
    {
      id: "game-water-puppet-hunt",
      title: "🎭 Vietnamese Puppetry Word Hunt",
      monthId: "jul",
      type: "wordhunt",
      instruction: "From the Vietnamese Water Puppetry performance, identify all 5 key elements hidden on stage!",
      words: [
        { word: "VIETNAM", meaning: "Origin nation of this 1,000-year-old water art." },
        { word: "WATER", meaning: "The shimmering pool that acts as the stage." },
        { word: "MUSICIANS", meaning: "Play traditional drums, flutes, and cymbals alongside the pool." },
        { word: "PUPPETS", meaning: "Carved wooden figures lacquered to resist water." },
        { word: "BAMBOO RODS", meaning: "The hidden poles under the screen controlling the characters." }
      ]
    }
  ]
};

// Expose on global window object
if (typeof window !== "undefined") {
  window.GK_DATA = GK_DATA;
}
