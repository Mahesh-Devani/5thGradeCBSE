/**
 * 5th Grade CBSE — Central Hub Controller
 * Cross-Subject Progress Aggregation, Study Streak, and Jump-Back-In Resume Card
 */

(function() {
  'use strict';

  const SUBJECT_METADATA = {
    maths: {
      name: 'Mathematics',
      icon: '🔢',
      url: 'maths/index.html',
      storageKey: 'cbse5_maths_active_state',
      topics: {
        factors_multiples_hcf_lcm: 'Multiples, Factors, HCF & LCM',
        divisibility_rules: 'Divisibility Rules',
        expressions_statements: 'Math Expressions & Statements',
        number_patterns: 'Number Patterns',
        geometry_angles: 'Geometry, Lines & Angles',
        tables_speed_master: 'Multiplication Tables (1-20)',
        fractions_master: 'Fractions Master',
        term_revision: 'Term Revision',
        decimals_percentages: 'Decimals & Percentages'
      }
    },
    science: {
      name: 'Science (EVS)',
      icon: '🔬',
      url: 'science/index.html',
      storageKey: 'cbse5_science_active_state',
      topics: {
        ch2_animals: 'Animals in Their Surroundings',
        ch3_skeletal: 'Skeletal & Muscular System',
        ch4_nervous: 'Nervous System & Sense Organs',
        ch5_health: 'Good Health & Nutrition',
        ch7_airwater: 'Air and Water',
        ch13_matter: 'States of Matter'
      }
    },
    english: {
      name: 'English Grammar',
      icon: '📝',
      url: 'english_grammer/index.html',
      storageKey: 'grammar-master-active-state',
      topics: {
        articles: 'Articles (A, An, The)',
        'simple-tenses': 'Simple Tenses',
        'continuous-tenses': 'Continuous Tenses',
        personification: 'Personification',
        'present-perfect': 'Present Perfect Tense',
        'past-perfect': 'Past Perfect Tense',
        hyperbole: 'Hyperbole'
      }
    },
    hindi: {
      name: 'Hindi Vyakaran',
      icon: '🇮🇳',
      url: 'hindi_vyakaran/index.html',
      storageKey: 'cbse5_hindi_active_state',
      topics: {
        sangya: 'संज्ञा व संज्ञा के भेद',
        vakyansh: 'वाक्यांश के लिए एक शब्द',
        chitra: 'चित्र वर्णन (Picture Description)'
      }
    },
    sst_chapters: {
      name: 'SST Chapters',
      icon: '🌍',
      url: 'sst_chapters/index.html',
      storageKey: 'cbse5_sst_active_state',
      topics: {
        drc: 'L-5 Democratic Republic of Congo',
        greenland: 'L-6 Greenland (Land of Snow)',
        saudi: 'L-7 Saudi Arabia (Land of Sand)',
        revolt1857: 'L-17 British Raj & The 1857 Revolt',
        government: 'L-20 Our Government'
      }
    },
    maps: {
      name: 'Social Science Maps',
      icon: '🗺️',
      url: 'social_sicence_maps/index.html',
      storageKey: 'sst-map-active-state',
      topics: {
        saudi: 'Saudi Arabia Map',
        deserts: 'World Hot Deserts',
        equatorial: 'Equatorial Regions',
        drc: 'DRC & Neighbours'
      }
    },
    gk: {
      name: 'General Knowledge',
      icon: '💡',
      url: 'general_knowledge/index.html',
      storageKey: 'cbse5_gk_active_state',
      topics: {
        june2026: 'June 2026 Issue',
        july2026: 'July 2026 Issue',
        aug2026: 'August 2026 Issue'
      }
    }
  };

  // 1. Calculate Aggregate Stars
  function calculateTotalStars() {
    let earnedStars = 0;
    const TOTAL_SYLLABUS_STARS = 110;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      if (key.includes('stars') || key.includes('progress')) {
        const val = localStorage.getItem(key);
        if (!val) continue;

        // Plain integer star rating (e.g. "3")
        const num = parseInt(val, 10);
        if (!isNaN(num) && num >= 1 && num <= 3 && !val.includes('{')) {
          earnedStars += num;
        } else {
          // JSON object containing stars
          try {
            const parsed = JSON.parse(val);
            if (typeof parsed === 'object' && parsed !== null) {
              Object.values(parsed).forEach(v => {
                const s = typeof v === 'number' ? v : (v && v.stars);
                if (typeof s === 'number') earnedStars += Math.min(3, Math.max(0, s));
              });
            }
          } catch(e) {}
        }
      }
    }

    const displayEarned = Math.min(TOTAL_SYLLABUS_STARS, earnedStars);
    const pct = Math.min(100, Math.round((displayEarned / TOTAL_SYLLABUS_STARS) * 100));

    const starCountEl = document.getElementById('mastery-star-count');
    const barFillEl = document.getElementById('mastery-bar-fill');
    if (starCountEl) starCountEl.textContent = `⭐ ${displayEarned} / ${TOTAL_SYLLABUS_STARS} Stars (${pct}%)`;
    if (barFillEl) barFillEl.style.width = `${pct}%`;
  }

  // 2. Daily Study Streak
  function updateStreak() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const streakRaw = localStorage.getItem('cbse5_daily_streak');
      let streak = { count: 1, lastDate: today };

      if (streakRaw) {
        streak = JSON.parse(streakRaw);
        if (streak.lastDate !== today) {
          const last = new Date(streak.lastDate);
          const curr = new Date(today);
          const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            streak.count += 1;
            streak.lastDate = today;
          } else if (diffDays > 1) {
            streak.count = 1;
            streak.lastDate = today;
          }
          localStorage.setItem('cbse5_daily_streak', JSON.stringify(streak));
        }
      } else {
        localStorage.setItem('cbse5_daily_streak', JSON.stringify(streak));
      }

      const streakEl = document.getElementById('streak-text');
      if (streakEl) {
        streakEl.textContent = `${streak.count}-Day Streak`;
      }
    } catch(e) {}
  }

  // 3. Resume Last Active Session
  function updateResumeCard() {
    const resumeCard = document.getElementById('resume-card');
    if (!resumeCard) return;

    let latest = null;

    Object.entries(SUBJECT_METADATA).forEach(([subKey, meta]) => {
      const raw = localStorage.getItem(meta.storageKey);
      if (!raw) return;
      try {
        const data = JSON.parse(raw);
        const topicId = data.currentTopic || data.activeTopicId || data.activeChapterId || data.activeModule || data.activeMonth || data.currentMap;
        const mode = data.activeMode || data.currentMode || 'learn';
        const updated = data.lastUpdated || (data.practiceProgress ? 1 : 0);

        if (topicId) {
          if (!latest || updated >= (latest.updated || 0)) {
            const topicName = meta.topics[topicId] || topicId;
            latest = {
              subKey,
              name: meta.name,
              icon: meta.icon,
              url: meta.url,
              topicName,
              mode,
              updated
            };
          }
        }
      } catch(e) {}
    });

    if (latest) {
      resumeCard.style.display = 'flex';
      resumeCard.href = latest.url;
      const iconEl = document.getElementById('resume-icon');
      const titleEl = document.getElementById('resume-title');
      const subEl = document.getElementById('resume-sub');

      if (iconEl) iconEl.textContent = latest.icon;
      if (titleEl) titleEl.textContent = `${latest.name}: ${latest.topicName}`;
      if (subEl) subEl.textContent = `Pick up right where you left off in ${latest.mode.toUpperCase()} mode →`;
    } else {
      resumeCard.style.display = 'none';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    calculateTotalStars();
    updateStreak();
    updateResumeCard();
  });
})();
