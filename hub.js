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

  let currentViewingGrade = 'class_5';

  // 1. Calculate Aggregate Stars
  function calculateTotalStars() {
    let earnedStars = 0;
    const gradeMeta = window.AppCurriculum ? AppCurriculum.getGrade(currentViewingGrade) : { totalSyllabusStars: 110 };
    const TOTAL_SYLLABUS_STARS = gradeMeta.totalSyllabusStars || 110;

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

  // 4. Data Backup & Restore Controllers
  function showFeedback(msg, isError) {
    const toast = document.getElementById('backup-feedback-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = 'backup-feedback-toast' + (isError ? ' toast-error' : '');
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 4500);
  }

  function initBackupRestore() {
    const btnExport = document.getElementById('btn-backup-export');
    const btnImport = document.getElementById('btn-backup-import');
    const fileInput = document.getElementById('backup-file-input');

    if (btnExport) {
      btnExport.addEventListener('click', () => {
        if (window.AppStorage && typeof window.AppStorage.downloadBackup === 'function') {
          const res = window.AppStorage.downloadBackup();
          if (res.success) {
            showFeedback(`✅ Backup downloaded (${res.totalKeys} items saved)`);
          } else {
            showFeedback('❌ Could not create backup', true);
          }
        }
      });
    }

    if (btnImport && fileInput) {
      btnImport.addEventListener('click', () => {
        fileInput.click();
      });

      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        try {
          if (window.AppStorage && typeof window.AppStorage.importFromFile === 'function') {
            const res = await window.AppStorage.importFromFile(file);
            showFeedback(`✅ Restored ${res.count} items! Updating dashboard...`);
            calculateTotalStars();
            updateStreak();
            updateResumeCard();
          }
        } catch (err) {
          showFeedback(`❌ Restore failed: ${err.message}`, true);
        } finally {
          fileInput.value = '';
        }
      });
    }

    // Auto-refresh when storage changes internally or across browser tabs
    window.addEventListener('appstorage:change', () => {
      calculateTotalStars();
      updateResumeCard();
    });

    window.addEventListener('appstorage:imported', () => {
      calculateTotalStars();
      updateStreak();
      updateResumeCard();
    });

    window.addEventListener('appstorage:cleared', () => {
      calculateTotalStars();
      updateResumeCard();
    });
  }

  // 5. Family Profiles UI Controller
  function initProfilesUI() {
    if (!window.AppProfile) return;
    AppProfile.init();

    const pillBtn = document.getElementById('btn-profile-pill');
    const dropdown = document.getElementById('profile-dropdown');
    const dropdownList = document.getElementById('profile-dropdown-list');
    const activeAvatarEl = document.getElementById('active-profile-avatar');
    const activeNameEl = document.getElementById('active-profile-name');
    const activeGradeEl = document.getElementById('active-profile-grade');

    const modal = document.getElementById('modal-add-profile');
    const btnAddTrigger = document.getElementById('btn-add-profile-trigger');
    const btnCloseModal = document.getElementById('btn-close-profile-modal');
    const btnCancelModal = document.getElementById('btn-cancel-profile');
    const formAdd = document.getElementById('form-add-profile');
    const inputName = document.getElementById('input-child-name');
    const selectGrade = document.getElementById('select-child-grade');
    const avatarGrid = document.getElementById('avatar-picker-grid');

    let selectedAvatar = '🦁';

    function formatGradeLabel(gradeId) {
      if (!gradeId) return 'Class 5';
      const num = gradeId.replace('class_', '');
      return `Class ${num}`;
    }

    function renderActivePill(profile) {
      if (!profile) return;
      if (activeAvatarEl) activeAvatarEl.textContent = profile.avatar || '🦁';
      if (activeNameEl) activeNameEl.textContent = profile.name || 'Student';
      if (activeGradeEl) activeGradeEl.textContent = formatGradeLabel(profile.grade);
    }

    function renderDropdownList() {
      if (!dropdownList) return;
      const profiles = AppProfile.getProfiles();
      const active = AppProfile.getActiveProfile();

      dropdownList.innerHTML = '';
      profiles.forEach(p => {
        const item = document.createElement('div');
        const isActive = active && active.id === p.id;
        item.className = 'profile-dropdown-item' + (isActive ? ' active' : '');
        item.setAttribute('data-profile-id', p.id);
        item.innerHTML = `
          <span class="item-avatar">${p.avatar || '🦁'}</span>
          <div class="item-info">
            <span class="item-name">${p.name}</span>
            <span class="item-grade">${formatGradeLabel(p.grade)}</span>
          </div>
          ${isActive ? '<span class="item-badge-active">Active</span>' : ''}
        `;

        item.addEventListener('click', () => {
          if (!isActive) {
            AppProfile.switchProfile(p.id);
            if (dropdown) dropdown.style.display = 'none';
          }
        });

        dropdownList.appendChild(item);
      });
    }

    function renderAvatarPicker() {
      if (!avatarGrid) return;
      avatarGrid.innerHTML = '';
      AppProfile.DEFAULT_AVATARS.forEach(av => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'avatar-option-btn' + (av === selectedAvatar ? ' selected' : '');
        btn.textContent = av;
        btn.addEventListener('click', () => {
          selectedAvatar = av;
          document.querySelectorAll('.avatar-option-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
        });
        avatarGrid.appendChild(btn);
      });
    }

    // Toggle dropdown
    if (pillBtn && dropdown) {
      pillBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.style.display === 'block';
        dropdown.style.display = isOpen ? 'none' : 'block';
        pillBtn.setAttribute('aria-expanded', String(!isOpen));
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('#profile-switcher-wrapper')) {
          dropdown.style.display = 'none';
          pillBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Open Add Profile modal
    if (btnAddTrigger && modal) {
      btnAddTrigger.addEventListener('click', () => {
        if (dropdown) dropdown.style.display = 'none';
        selectedAvatar = '🦁';
        if (inputName) inputName.value = '';
        renderAvatarPicker();
        modal.style.display = 'flex';
        if (inputName) inputName.focus();
      });
    }

    function closeModal() {
      if (modal) modal.style.display = 'none';
    }

    if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
    if (btnCancelModal) btnCancelModal.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    // Submit Add Profile Form
    if (formAdd) {
      formAdd.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (inputName && inputName.value.trim()) || 'Child';
        const grade = (selectGrade && selectGrade.value) || 'class_5';

        const created = AppProfile.createProfile({
          name,
          avatar: selectedAvatar,
          grade,
          makeActive: true
        });

        closeModal();
        showFeedback(`🎉 Created profile for ${created.name}!`);
      });
    }

    // Initial render
    const active = AppProfile.getActiveProfile();
    currentViewingGrade = (active && active.grade) || 'class_5';
    renderActivePill(active);
    renderDropdownList();
    renderAvatarPicker();

    // Listen to profile events
    window.addEventListener('profile:switched', (e) => {
      const p = e.detail && e.detail.profile;
      currentViewingGrade = (p && p.grade) || 'class_5';
      renderActivePill(p);
      renderDropdownList();
      renderCurriculum(currentViewingGrade);
      calculateTotalStars();
      updateStreak();
      updateResumeCard();
      if (p) showFeedback(`Switched to ${p.name}'s profile (${formatGradeLabel(p.grade)})`);
    });

    window.addEventListener('profile:created', (e) => {
      const p = e.detail && e.detail.profile;
      if (p) currentViewingGrade = p.grade || 'class_5';
      renderDropdownList();
      renderCurriculum(currentViewingGrade);
    });

    window.addEventListener('profile:updated', () => {
      const p = AppProfile.getActiveProfile();
      renderActivePill(p);
      renderDropdownList();
    });
  }

  // 6. Multi-Grade Curriculum Grid Controller
  function selectCurriculumGrade(gradeId) {
    currentViewingGrade = gradeId;
    renderCurriculum(gradeId);
    calculateTotalStars();
    updateResumeCard();
  }

  function renderCurriculum(gradeId) {
    const grid = document.getElementById('subjects-grid');
    const titleEl = document.getElementById('curriculum-section-title');
    const pillsRow = document.getElementById('grade-pills-row');
    if (!grid) return;

    const grade = window.AppCurriculum ? AppCurriculum.getGrade(gradeId) : { title: 'Class 5', status: 'active', subjects: [] };
    if (titleEl) {
      titleEl.textContent = `Choose a Subject (${grade.title})`;
    }

    // Render Grade Pills Bar
    if (pillsRow && window.AppCurriculum) {
      pillsRow.innerHTML = '';
      AppCurriculum.getAllGrades().forEach(g => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'grade-pill-btn' + (g.id === gradeId ? ' active' : '') + (g.status === 'active' ? ' has-badge' : '');
        btn.innerHTML = `${g.title}${g.status === 'active' ? ' ⭐' : ''}`;
        btn.setAttribute('aria-label', `View ${g.title} syllabus`);
        btn.addEventListener('click', () => {
          selectCurriculumGrade(g.id);
        });
        pillsRow.appendChild(btn);
      });
    }

    // Render Subjects Grid
    grid.innerHTML = '';

    if (grade.status === 'active') {
      const c5Subjects = [
        {
          url: 'social_sicence_maps/index.html',
          id: 'card-sst-maps',
          icon: '🗺️',
          theme: 'theme-blue',
          title: 'Social Science Maps',
          desc: 'Practice SST maps with interactive quizzes — Saudi Arabia, World Deserts, Equatorial Regions, and DRC & Neighbours.',
          tags: ['✅ 4 Maps', '📖 Learn', '❓ Quiz', '⏱️ Timed', '🖨️ Print'],
          ready: true
        },
        {
          url: 'sst_chapters/index.html',
          id: 'card-sst-chapters',
          icon: '📚',
          theme: 'theme-green',
          title: 'Social Science (SST) Chapters',
          desc: 'Democratic Republic of Congo (L-5), Greenland (L-6), Saudi Arabia (L-7), Revolt of 1857 (L-17), and Our Government (L-20).',
          tags: ['✅ 5 Chapters', '⚡ Instant Flashcards', '❓ 25-Q Drill', '🖨️ Printable Worksheets'],
          ready: true
        },
        {
          url: 'maths/index.html',
          id: 'card-maths',
          icon: '🔢',
          theme: 'theme-amber',
          title: 'Mathematics',
          desc: 'Factors & Multiples, Divisibility Rules (2-12), Expressions, Patterns, Geometry & Angles, Tables Speed Master & Fractions.',
          tags: ['✅ 8 Modules Ready', '🔍 Visual Models', '❓ Multi-Format Quizzes', '🖨️ Printable Worksheets'],
          ready: true
        },
        {
          url: 'science/index.html',
          id: 'card-science',
          icon: '🔬',
          theme: 'theme-cyan',
          title: 'Science (EVS)',
          desc: 'Animal Adaptations, Skeletal & Muscular, Nervous System & Sense Organs, Health & Nutrition, Air & Water, States of Matter.',
          tags: ['✅ 6 Chapters', '🦴 Interactive 3D Anatomy', '❓ Concept Quizzes', '🖨️ Worksheets'],
          ready: true
        },
        {
          url: 'english_grammer/index.html',
          id: 'card-english',
          icon: '📝',
          theme: 'theme-blue',
          title: 'English Grammar',
          desc: 'Master Articles (A, An, The), Simple Tenses, Continuous Tenses, Personification, Perfect Tenses & Hyperbole with real-time feedback.',
          tags: ['✅ 7 Topics', '📖 Visual Rules', '❓ Multiple Choice', '⚡ Speed Challenge'],
          ready: true
        },
        {
          url: 'hindi_vyakaran/index.html',
          id: 'card-hindi',
          icon: '🇮🇳',
          theme: 'theme-pink',
          title: 'हिंदी व्याकरण व रचना',
          desc: 'संज्ञा व पाँच भेद (पहचान सूत्र, तुलना दर्पण, भाववाचक निर्माण प्रयोगशाला व 5-घड़े खेल), वाक्यांश के लिए एक शब्द और चित्र वर्णन।',
          tags: ['✅ 3 मुख्य विषय', '🏷️ संज्ञा व 5 भेद', '🏺 वर्गीकरण खेल', '✨ 12 वाक्यांश', '🖼️ चित्र वर्णन'],
          ready: true
        },
        {
          url: 'general_knowledge/index.html',
          id: 'card-gk',
          icon: '🌍',
          theme: 'theme-purple',
          title: 'General Knowledge (GK)',
          desc: 'Master Term 1 Global Awareness (June, July, August 2026) with memory sparks, international cipher decoders, picture rounds, and school worksheets.',
          tags: ['✅ June, Jul, Aug Ready', '💡 Memory Sparks', '🕵️ Codebreakers', '⚡ 60s Sprint', '🖨️ Worksheets'],
          ready: true
        }
      ];

      c5Subjects.forEach(s => {
        const card = document.createElement('a');
        card.href = s.url;
        card.className = 'subject-card';
        card.id = s.id;
        card.innerHTML = `
          <div class="card-icon ${s.theme}">${s.icon}</div>
          <div class="card-content">
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
          </div>
          <div class="card-tags">
            ${s.tags.map((t, idx) => `<span class="card-tag ${idx === 0 ? 'tag-active' : ''}">${t}</span>`).join('')}
          </div>
          <div class="card-footer">
            <div class="card-status status-ready">
              <span class="status-dot"></span>
              Ready to Practice
            </div>
            <div class="card-arrow">→</div>
          </div>
        `;
        grid.appendChild(card);
      });
    } else {
      // Non-Class-5 Grade: Roadmap & Syllabus Catalog
      const banner = document.createElement('div');
      banner.className = 'grade-roadmap-banner';
      banner.innerHTML = `
        <div class="banner-icon">🚀</div>
        <div class="banner-content">
          <h4>${grade.title} Syllabus Catalog &amp; Roadmap</h4>
          <p>${grade.tagline}. Interactive questions for ${grade.title} are under active development. You can explore the subject syllabus below or jump into our complete <strong>Class 5 Interactive Suite</strong> anytime!</p>
        </div>
        <button type="button" class="btn-switch-grade-c5" id="btn-goto-c5">Go to Class 5 (Ready ⭐)</button>
      `;
      grid.appendChild(banner);

      const c5Btn = banner.querySelector('#btn-goto-c5');
      if (c5Btn) {
        c5Btn.addEventListener('click', () => selectCurriculumGrade('class_5'));
      }

      grade.subjects.forEach(s => {
        const card = document.createElement('div');
        card.className = 'subject-card coming-soon';
        card.innerHTML = `
          <div class="card-icon ${s.theme}">${s.icon}</div>
          <div class="card-content">
            <h3>${s.name}</h3>
            <p>${s.desc}</p>
          </div>
          <div class="card-tags">
            <span class="card-tag">📋 CBSE Syllabus</span>
            <span class="card-tag">⏳ Modules Coming Soon</span>
          </div>
          <div class="card-footer">
            <div class="card-status status-coming">
              <span class="status-dot"></span>
              In Development
            </div>
            <div class="card-arrow">🔒</div>
          </div>
        `;
        grid.appendChild(card);
      });
    }
  }

  // 7. Access Gate & License Pass UI Controller
  function initAuthUI() {
    if (!window.AppAuth) return;
    AppAuth.init();

    const labelEl = document.getElementById('access-status-label');
    const dotEl = document.getElementById('access-badge-dot');
    const btnEnterCode = document.getElementById('btn-enter-access-code');
    const modal = document.getElementById('modal-access-code');
    const btnClose = document.getElementById('btn-close-access-modal');
    const btnCancel = document.getElementById('btn-cancel-access-modal');
    const formCode = document.getElementById('form-access-code');
    const inputCode = document.getElementById('input-access-code');

    function updateAccessBadge() {
      const status = AppAuth.getAccessStatus();
      if (labelEl) labelEl.textContent = status.label;
      if (dotEl) {
        dotEl.style.backgroundColor = status.badgeColor;
      }
    }

    function closeModal() {
      if (modal) modal.style.display = 'none';
      if (inputCode) inputCode.value = '';
    }

    if (btnEnterCode && modal) {
      btnEnterCode.addEventListener('click', () => {
        modal.style.display = 'flex';
        if (inputCode) inputCode.focus();
      });
    }

    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnCancel) btnCancel.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    if (formCode) {
      formCode.addEventListener('submit', async (e) => {
        e.preventDefault();
        const code = (inputCode && inputCode.value) || '';
        const res = await AppAuth.redeemCode(code);
        if (res.success) {
          updateAccessBadge();
          closeModal();
          showFeedback(`🎉 Access unlocked: ${res.label}!`);
        } else {
          showFeedback(`❌ ${res.error || 'Invalid code'}`, true);
        }
      });
    }

    window.addEventListener('auth:change', () => {
      updateAccessBadge();
    });

    updateAccessBadge();
  }

  // 8. Google Drive Family Cloud Sync UI Controller
  function initGoogleSyncUI() {
    if (!window.GoogleDriveSync) return;

    const btnOpenSync = document.getElementById('btn-open-google-sync');
    const modal = document.getElementById('modal-google-sync');
    const btnClose = document.getElementById('btn-close-sync-modal');
    const btnDismiss = document.getElementById('btn-dismiss-sync-modal');
    const accountBox = document.getElementById('sync-account-box');
    const actionControls = document.getElementById('sync-action-controls');
    const btnToggleSettings = document.getElementById('btn-toggle-sync-settings');
    const settingsPanel = document.getElementById('sync-advanced-panel');
    const inputClientId = document.getElementById('input-google-client-id');
    const btnSaveClientId = document.getElementById('btn-save-client-id');
    const btnSimulate = document.getElementById('btn-simulate-google-sync');

    function formatTimeAgo(timestamp) {
      if (!timestamp) return 'Never';
      const diffSec = Math.floor((Date.now() - timestamp) / 1000);
      if (diffSec < 60) return 'Just now';
      const diffMin = Math.floor(diffSec / 60);
      if (diffMin < 60) return `${diffMin}m ago`;
      const diffHr = Math.floor(diffMin / 60);
      if (diffHr < 24) return `${diffHr}h ago`;
      return new Date(timestamp).toLocaleDateString();
    }

    function renderModalState() {
      const isConnected = GoogleDriveSync.isConnected();
      const session = GoogleDriveSync.session;

      if (inputClientId) {
        inputClientId.value = GoogleDriveSync.getClientId();
      }

      if (accountBox) {
        if (isConnected && session) {
          accountBox.innerHTML = `
            <div class="sync-connected-card">
              <div class="sync-avatar-wrap">${session.picture && session.picture.startsWith('http') ? `<img src="${session.picture}" alt="" style="width:100%;height:100%;border-radius:50%;" />` : (session.picture || '☁️')}</div>
              <div class="sync-info-wrap">
                <div class="sync-user-name">${session.name || 'Parent'}</div>
                <div class="sync-user-email">${session.email}</div>
                <div class="sync-time-badge">🕒 Last synced: <strong>${formatTimeAgo(session.lastSyncTime)}</strong></div>
              </div>
              <div class="sync-badge-active" title="Connected to Google Drive">● Active</div>
            </div>
          `;
        } else {
          accountBox.innerHTML = `
            <div class="sync-disconnected-box">
              <div class="sync-promo-icon">☁️</div>
              <div class="sync-promo-text">
                <strong>Multi-Device Cloud Sync</strong>
                <p>Sign in with Google to keep all children's profiles, stars, and streaks synchronized across devices.</p>
              </div>
            </div>
          `;
        }
      }

      if (actionControls) {
        if (isConnected) {
          actionControls.innerHTML = `
            <div class="sync-btn-row">
              <button type="button" class="btn-cloud-action btn-sync-primary" id="btn-cloud-sync-now">
                🔄 Sync Now
              </button>
              <button type="button" class="btn-cloud-action btn-sync-secondary" id="btn-cloud-disconnect">
                Disconnect
              </button>
            </div>
          `;

          const btnSyncNow = actionControls.querySelector('#btn-cloud-sync-now');
          if (btnSyncNow) {
            btnSyncNow.addEventListener('click', async () => {
              btnSyncNow.disabled = true;
              btnSyncNow.textContent = '🔄 Syncing...';
              showFeedback('🔄 Syncing with Google Drive...');
              const res = await GoogleDriveSync.syncNow();
              btnSyncNow.disabled = false;
              btnSyncNow.textContent = '🔄 Sync Now';

              if (res.success) {
                showFeedback('✅ Google Drive sync complete!');
                calculateTotalStars();
                updateStreak();
                updateResumeCard();
                renderModalState();
              } else {
                showFeedback(`❌ Sync failed: ${res.error || res.reason}`, true);
              }
            });
          }

          const btnDisc = actionControls.querySelector('#btn-cloud-disconnect');
          if (btnDisc) {
            btnDisc.addEventListener('click', () => {
              GoogleDriveSync.disconnect();
              showFeedback('Disconnected from Google Drive.');
              renderModalState();
            });
          }
        } else {
          actionControls.innerHTML = `
            <div class="sync-btn-row">
              <button type="button" class="btn-cloud-action btn-sync-primary" id="btn-connect-google">
                🔗 Connect Google Drive
              </button>
            </div>
          `;

          const btnConnect = actionControls.querySelector('#btn-connect-google');
          if (btnConnect) {
            btnConnect.addEventListener('click', async () => {
              btnConnect.disabled = true;
              btnConnect.textContent = 'Connecting...';
              const res = await GoogleDriveSync.requestAuth(true);
              btnConnect.disabled = false;
              btnConnect.textContent = '🔗 Connect Google Drive';

              if (res.success) {
                showFeedback('🎉 Connected and synchronized with Google Drive!');
                calculateTotalStars();
                updateStreak();
                updateResumeCard();
                renderModalState();
              } else if (res.needsClientId) {
                if (settingsPanel) settingsPanel.style.display = 'block';
                showFeedback('💡 Set your Google Client ID or use the simulator below.', true);
              } else {
                showFeedback(`❌ ${res.error || 'Connection failed'}`, true);
              }
            });
          }
        }
      }
    }

    function closeModal() {
      if (modal) modal.style.display = 'none';
    }

    if (btnOpenSync && modal) {
      btnOpenSync.addEventListener('click', () => {
        renderModalState();
        modal.style.display = 'flex';
      });
    }

    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnDismiss) btnDismiss.addEventListener('click', closeModal);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    if (btnToggleSettings && settingsPanel) {
      btnToggleSettings.addEventListener('click', () => {
        const isHidden = settingsPanel.style.display === 'none';
        settingsPanel.style.display = isHidden ? 'block' : 'none';
      });
    }

    if (btnSaveClientId && inputClientId) {
      btnSaveClientId.addEventListener('click', () => {
        const id = inputClientId.value.trim();
        GoogleDriveSync.setClientId(id);
        showFeedback('💾 Google Client ID saved!');
      });
    }

    if (btnSimulate) {
      btnSimulate.addEventListener('click', async () => {
        btnSimulate.disabled = true;
        btnSimulate.textContent = 'Simulating...';
        const res = await GoogleDriveSync.simulateSync({
          email: 'parent.demo@gmail.com',
          name: 'Demo Family Account',
          avatar: '👨‍👩‍👧‍👦'
        });
        btnSimulate.disabled = false;
        btnSimulate.textContent = '🧪 Test / Simulate Cloud Sync';

        if (res.success) {
          showFeedback('🧪 Cloud Sync Simulation complete!');
          calculateTotalStars();
          updateStreak();
          updateResumeCard();
          renderModalState();
        } else {
          showFeedback(`❌ Simulation error: ${res.error}`, true);
        }
      });
    }

    // React to sync status events
    window.addEventListener('googlesync:status', () => {
      renderModalState();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initProfilesUI();
    initAuthUI();
    initGoogleSyncUI();
    renderCurriculum(currentViewingGrade);
    calculateTotalStars();
    updateStreak();
    updateResumeCard();
    initBackupRestore();
  });
})();


