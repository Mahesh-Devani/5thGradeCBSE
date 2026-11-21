"""
tests/test_milestones.py
========================
Automated regression tests verifying star progression monotonicity, milestone evaluators,
and progress reset behavior across subject mini-apps via WebKit JSC simulation.
"""

import unittest
import tempfile
import subprocess
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
JSC_BIN = Path('/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc')

BROWSER_MOCK_JS = """
var mockStorage = {};
function createMockEl() {
    return {
        classList: { add: () => {}, remove: () => {}, toggle: () => {} },
        innerHTML: '',
        innerText: '',
        textContent: '',
        style: {},
        dataset: {},
        appendChild: () => {},
        insertBefore: () => {},
        setAttribute: () => {},
        getAttribute: () => null,
        removeAttribute: () => {},
        getContext: () => ({ fillRect(){}, clearRect(){}, beginPath(){}, arc(){}, fill(){}, measureText: () => ({ width: 10 }) }),
        querySelector: () => createMockEl(),
        querySelectorAll: () => [],
        addEventListener: () => {},
        removeEventListener: () => {}
    };
}

var window = {
    AudioContext: class {
        createOscillator() { return { connect(){}, start(){}, stop(){}, frequency: { setValueAtTime(){} } }; }
        createGain() { return { connect(){}, gain: { setValueAtTime(){}, exponentialRampToValueAtTime(){} } }; }
        get currentTime() { return 0; }
        get destination() { return {}; }
    },
    webkitAudioContext: class {},
    localStorage: {
        getItem: (k) => mockStorage[k] || null,
        setItem: (k, v) => { mockStorage[k] = String(v); },
        removeItem: (k) => { delete mockStorage[k]; }
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    innerWidth: 1024,
    innerHeight: 768
};

var document = {
    addEventListener: () => {},
    removeEventListener: () => {},
    getElementById: () => createMockEl(),
    createElement: () => createMockEl(),
    querySelector: () => createMockEl(),
    querySelectorAll: () => []
};
var localStorage = window.localStorage;
"""


def run_jsc_simulation(source_files, test_script):
    """Run sequential JS source files with browser mocks followed by test script."""
    f_mock = tempfile.NamedTemporaryFile(suffix='_mock.js', mode='w', delete=False)
    f_mock.write(BROWSER_MOCK_JS)
    f_mock.close()

    f_test = tempfile.NamedTemporaryFile(suffix='_test.js', mode='w', delete=False)
    f_test.write(test_script)
    f_test.close()

    cmd = [str(JSC_BIN), f_mock.name] + [str(f) for f in source_files] + [f_test.name]
    res = subprocess.run(cmd, capture_output=True, text=True)

    Path(f_mock.name).unlink(missing_ok=True)
    Path(f_test.name).unlink(missing_ok=True)

    return res


class TestMilestoneProgression(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not JSC_BIN.exists():
            raise unittest.SkipTest("WebKit JSC not available on this platform")

    def test_sst_greenland_star_progression(self):
        """Simulate solving 10 questions in SST Greenland and verify star progression."""
        test_script = """
        let app = new SSTApp();
        app.activeChapterId = 'ch6_greenland';

        // 1. Initial stars must be 0
        let stars0 = app.evaluateAndAwardStars('ch6_greenland');
        if (stars0 !== 0) throw new Error('Initial stars should be 0, got ' + stars0);

        // 2. Simulate answering 10 questions correctly
        let chap = CHAPTERS_DATA.find(c => c.id === 'ch6_greenland');
        if (!chap) throw new Error('ch6_greenland not found');

        let qSubset = chap.practiceQuestions.slice(0, 10);
        qSubset.forEach(q => {
            app.practiceAnswered[q.id] = { answered: true, correct: true };
        });

        let stars10 = app.evaluateAndAwardStars('ch6_greenland');
        if (stars10 < 6) throw new Error('After 10 questions, expected >= 6 stars, got ' + stars10);

        // 3. Test Reset
        app.resetChapterProgress('ch6_greenland');
        let starsAfterReset = app.getChapterStars('ch6_greenland');
        if (starsAfterReset !== 0) throw new Error('Stars after reset should be 0, got ' + starsAfterReset);

        print('SST_SIMULATION_OK');
        """
        source_files = [
            PROJECT_ROOT / 'shared' / 'js' / 'sound.js',
            PROJECT_ROOT / 'shared' / 'js' / 'confetti.js',
            PROJECT_ROOT / 'sst_chapters' / 'data' / 'chapter_l5_drc.js',
            PROJECT_ROOT / 'sst_chapters' / 'data' / 'chapter_l6_greenland.js',
            PROJECT_ROOT / 'sst_chapters' / 'data' / 'chapter_l7_saudi.js',
            PROJECT_ROOT / 'sst_chapters' / 'data' / 'chapter_l17_revolt1857.js',
            PROJECT_ROOT / 'sst_chapters' / 'data' / 'chapter_l18_struggle.js',
            PROJECT_ROOT / 'sst_chapters' / 'data' / 'chapter_l19_freedom.js',
            PROJECT_ROOT / 'sst_chapters' / 'data' / 'chapter_l20_government.js',
            PROJECT_ROOT / 'sst_chapters' / 'data' / 'milestones.js',
            PROJECT_ROOT / 'sst_chapters' / 'app.js'
        ]
        res = run_jsc_simulation(source_files, test_script)
        self.assertIn("SST_SIMULATION_OK", res.stdout, f"SST simulation failed:\n{res.stdout}\n{res.stderr}")

    def test_science_star_reset(self):
        """Verify Science resetChapterProgress resets stars to 0 and clears chapter state."""
        source_files = [
            PROJECT_ROOT / 'shared' / 'js' / 'sound.js',
            PROJECT_ROOT / 'shared' / 'js' / 'confetti.js',
            PROJECT_ROOT / 'science' / 'data' / 'chapter_l2_animals.js',
            PROJECT_ROOT / 'science' / 'data' / 'chapter_l3_skeletal.js',
            PROJECT_ROOT / 'science' / 'data' / 'chapter_l4_nervous.js',
            PROJECT_ROOT / 'science' / 'data' / 'chapter_l5_health.js',
            PROJECT_ROOT / 'science' / 'data' / 'chapter_l7_air_water.js',
            PROJECT_ROOT / 'science' / 'data' / 'chapter_l11_rocks.js',
            PROJECT_ROOT / 'science' / 'data' / 'chapter_l13_matter.js',
            PROJECT_ROOT / 'science' / 'data' / 'milestones.js',
            PROJECT_ROOT / 'science' / 'app.js',
        ]
        test_script = """
        setChapterStars('ch3_skeletal', 8);
        if (getChapterStars('ch3_skeletal') !== 8) throw new Error('Failed to set chapter stars to 8');

        resetChapterProgress('ch3_skeletal');
        if (getChapterStars('ch3_skeletal') !== 0) throw new Error('Reset failed to set chapter stars to 0');

        print('SCIENCE_RESET_OK');
        """
        res = run_jsc_simulation(source_files, test_script)
        self.assertIn("SCIENCE_RESET_OK", res.stdout, f"Science simulation failed:\n{res.stdout}\n{res.stderr}")

    def test_maths_star_reset(self):
        """Verify Maths setTopicStars accepts 0 on reset."""
        source_files = [
            PROJECT_ROOT / 'shared' / 'js' / 'sound.js',
            PROJECT_ROOT / 'shared' / 'js' / 'confetti.js',
            PROJECT_ROOT / 'shared' / 'js' / 'drawer.js',
            PROJECT_ROOT / 'shared' / 'js' / 'storage.js',
            PROJECT_ROOT / 'maths' / 'engines' / 'solvers.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic1_hcf_lcm.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic2_divisibility.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic3_expressions.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic4_patterns.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic5_geometry.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic_tables.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic_fractions.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic_revision.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic8_area.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic9_volume.js',
            PROJECT_ROOT / 'maths' / 'app.js',
        ]
        test_script = """
        setTopicStars('factors_multiples_hcf_lcm', 7);
        if (getTopicStars('factors_multiples_hcf_lcm') !== 7) throw new Error('Failed to set math topic stars to 7');

        setTopicStars('factors_multiples_hcf_lcm', 0);
        if (getTopicStars('factors_multiples_hcf_lcm') !== 0) throw new Error('Maths setTopicStars failed to reset to 0');

        // Test Area topic milestones exist and evaluate
        let areaMilestones = TOPIC_MILESTONES['area_perimeter'];
        if (!areaMilestones || areaMilestones.length !== 10) throw new Error('Area topic must have 10 milestones');

        // Test Volume topic milestones exist and evaluate
        let volMilestones = TOPIC_MILESTONES['volume_capacity'];
        if (!volMilestones || volMilestones.length !== 10) throw new Error('Volume topic must have 10 milestones');

        // Test Zero-Effort Prevention: With 0 solved questions, NO topic may award stars merely by clicking modules!
        Object.keys(TOPICS_CONFIG).forEach(topicId => {
            state.topicProgress = state.topicProgress || {};
            state.topicProgress[topicId] = {
                modulesInteracted: {
                    area_foundations_perim: true,
                    same_area_diff_shapes: true,
                    triangle_grid_half: true,
                    irregular_shapes_grid: true,
                    solids_3d_foundations: true,
                    cube_cuboid_formulas: true,
                    base_area_height_relation: true,
                    volume_and_capacity: true,
                    hcf_lcm_detective: true,
                    all_rules_table: true,
                    clue_words_dictionary: true,
                    pattern_detective: true,
                    blueprint_overview: true
                },
                checkpoints: { checkpoint_grid: true, checkpoint_frac_1: true },
                categorySolved: {},
                totalSolved: 0,
                totalAttempted: 0,
                accuracy: 0,
                trapsDiagnosed: 0,
                challengeHighScore: 0
            };
            let stars = evaluateAndAwardStars(topicId);
            if (stars !== 0) {
                throw new Error('Topic ' + topicId + ' awarded ' + stars + ' stars with totalSolved = 0!');
            }
        });

        // Test legitimate progression: solving questions awards stars
        state.topicProgress['area_perimeter'] = {
            modulesInteracted: { area_foundations_perim: true },
            checkpoints: {},
            categorySolved: { foundations_formulas: 3 },
            totalSolved: 3,
            totalAttempted: 3,
            accuracy: 100,
            trapsDiagnosed: 0,
            challengeHighScore: 0
        };
        let areaStars = evaluateAndAwardStars('area_perimeter');
        if (areaStars < 2) throw new Error('Expected at least 2 stars for area_perimeter with 3 solved questions, got ' + areaStars);

        // Test downward sync: cleans corrupted 10 stars down to 0 when progress is 0
        localStorage.setItem('cbse5_math_topic_volume_capacity_stars', '10');
        state.topicProgress['volume_capacity'] = {
            modulesInteracted: {},
            checkpoints: {},
            categorySolved: {},
            totalSolved: 0,
            totalAttempted: 0,
            accuracy: 0,
            trapsDiagnosed: 0,
            challengeHighScore: 0
        };
        let cleanedStars = evaluateAndAwardStars('volume_capacity');
        if (cleanedStars !== 0) throw new Error('evaluateAndAwardStars failed to clean corrupted stars down to 0, got ' + cleanedStars);
        if (getTopicStars('volume_capacity') !== 0) throw new Error('localStorage stars not updated down to 0');

        print('MATHS_RESET_OK');
        """
        res = run_jsc_simulation(source_files, test_script)
        self.assertIn("MATHS_RESET_OK", res.stdout, f"Maths simulation failed:\n{res.stdout}\n{res.stderr}")

    def test_maths_area_volume_learn_checkpoints(self):
        """Verify that Area & Volume Learn mode checkpoints award stars monotonically."""
        source_files = [
            PROJECT_ROOT / 'shared' / 'js' / 'sound.js',
            PROJECT_ROOT / 'shared' / 'js' / 'confetti.js',
            PROJECT_ROOT / 'shared' / 'js' / 'drawer.js',
            PROJECT_ROOT / 'shared' / 'js' / 'storage.js',
            PROJECT_ROOT / 'maths' / 'engines' / 'solvers.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic1_hcf_lcm.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic2_divisibility.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic3_expressions.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic4_patterns.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic5_geometry.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic_tables.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic_fractions.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic_revision.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic8_area.js',
            PROJECT_ROOT / 'maths' / 'data' / 'topic9_volume.js',
            PROJECT_ROOT / 'maths' / 'app.js',
        ]
        test_script = """
        // Initialize state
        state.topicProgress = state.topicProgress || {};

        // 1. Area & Perimeter progression
        state.topicProgress['area_perimeter'] = {
            modulesInteracted: {},
            checkpoints: {},
            categorySolved: {},
            totalSolved: 0,
            totalAttempted: 0,
            accuracy: 0,
            trapsDiagnosed: 0,
            challengeHighScore: 0
        };
        let s0 = evaluateAndAwardStars('area_perimeter');
        if (s0 !== 0) throw new Error('Initial area stars must be 0, got ' + s0);

        // Checkpoint 1 -> 1 star
        state.topicProgress['area_perimeter'].checkpoints['checkpoint_area_1'] = true;
        let s1 = evaluateAndAwardStars('area_perimeter');
        if (s1 !== 1) throw new Error('Area checkpoint 1 should award 1 star, got ' + s1);

        // Checkpoint 2 -> 2 stars
        state.topicProgress['area_perimeter'].checkpoints['checkpoint_area_2'] = true;
        let s2 = evaluateAndAwardStars('area_perimeter');
        if (s2 !== 2) throw new Error('Area checkpoint 2 should award 2 stars, got ' + s2);

        // Checkpoint 3 -> 3 stars
        state.topicProgress['area_perimeter'].checkpoints['checkpoint_area_3'] = true;
        let s3 = evaluateAndAwardStars('area_perimeter');
        if (s3 !== 3) throw new Error('Area checkpoint 3 should award 3 stars, got ' + s3);

        // Checkpoint 4 -> 4 stars
        state.topicProgress['area_perimeter'].checkpoints['checkpoint_area_4'] = true;
        let s4 = evaluateAndAwardStars('area_perimeter');
        if (s4 !== 4) throw new Error('Area checkpoint 4 should award 4 stars, got ' + s4);

        // Checkpoint 5 -> 5 stars
        state.topicProgress['area_perimeter'].checkpoints['checkpoint_area_5'] = true;
        let s5 = evaluateAndAwardStars('area_perimeter');
        if (s5 !== 5) throw new Error('Area checkpoint 5 should award 5 stars, got ' + s5);

        // Practice solve advancement
        state.topicProgress['area_perimeter'].categorySolved = {
            foundations_formulas: 3,
            factor_pairs_same_area: 2,
            triangle_irregular_grids: 2,
            tiling_word_problems: 2
        };
        state.topicProgress['area_perimeter'].totalSolved = 10;
        state.topicProgress['area_perimeter'].totalAttempted = 10;
        state.topicProgress['area_perimeter'].accuracy = 100;
        let sAdv = evaluateAndAwardStars('area_perimeter');
        if (sAdv < 9) throw new Error('Expected at least 9 stars for comprehensive practice solving in Area, got ' + sAdv);

        // 2. Volume & Capacity progression
        state.topicProgress['volume_capacity'] = {
            modulesInteracted: {},
            checkpoints: {},
            categorySolved: {},
            totalSolved: 0,
            totalAttempted: 0,
            accuracy: 0,
            trapsDiagnosed: 0,
            challengeHighScore: 0
        };
        let vs0 = evaluateAndAwardStars('volume_capacity');
        if (vs0 !== 0) throw new Error('Initial volume stars must be 0, got ' + vs0);

        state.topicProgress['volume_capacity'].checkpoints['checkpoint_vol_1'] = true;
        let vs1 = evaluateAndAwardStars('volume_capacity');
        if (vs1 !== 1) throw new Error('Volume checkpoint 1 should award 1 star, got ' + vs1);

        state.topicProgress['volume_capacity'].checkpoints['checkpoint_vol_2'] = true;
        let vs2 = evaluateAndAwardStars('volume_capacity');
        if (vs2 !== 2) throw new Error('Volume checkpoint 2 should award 2 stars, got ' + vs2);

        state.topicProgress['volume_capacity'].checkpoints['checkpoint_vol_3'] = true;
        state.topicProgress['volume_capacity'].checkpoints['checkpoint_vol_4'] = true;
        state.topicProgress['volume_capacity'].checkpoints['checkpoint_vol_5'] = true;
        let vs5 = evaluateAndAwardStars('volume_capacity');
        if (vs5 !== 5) throw new Error('Volume checkpoints 1-5 should award 5 stars, got ' + vs5);

        print('MATHS_AREA_VOLUME_CHECKPOINTS_OK');
        """
        res = run_jsc_simulation(source_files, test_script)
        self.assertIn("MATHS_AREA_VOLUME_CHECKPOINTS_OK", res.stdout, f"Simulation failed:\n{res.stdout}\n{res.stderr}")


if __name__ == '__main__':
    unittest.main()
