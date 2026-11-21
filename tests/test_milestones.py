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
        res = run_jsc_simulation([PROJECT_ROOT / 'sst_chapters' / 'app.js'], test_script)
        self.assertIn("SST_SIMULATION_OK", res.stdout, f"SST simulation failed:\n{res.stdout}\n{res.stderr}")

    def test_science_star_reset(self):
        """Verify Science resetChapterProgress resets stars to 0 and clears chapter state."""
        test_script = """
        setChapterStars('ch3_skeletal', 8);
        if (getChapterStars('ch3_skeletal') !== 8) throw new Error('Failed to set chapter stars to 8');

        resetChapterProgress('ch3_skeletal');
        if (getChapterStars('ch3_skeletal') !== 0) throw new Error('Reset failed to set chapter stars to 0');

        print('SCIENCE_RESET_OK');
        """
        res = run_jsc_simulation([PROJECT_ROOT / 'science' / 'app.js'], test_script)
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

        print('MATHS_RESET_OK');
        """
        res = run_jsc_simulation(source_files, test_script)
        self.assertIn("MATHS_RESET_OK", res.stdout, f"Maths simulation failed:\n{res.stdout}\n{res.stderr}")


if __name__ == '__main__':
    unittest.main()
