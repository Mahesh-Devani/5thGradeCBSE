#!/usr/bin/env python3
"""
tests/test_voice_grader.py — Test Suite for Voice Grader & Normalizer
====================================================================
Tests the rule-based grader, normalizer, homophone & number parsers,
strict short-answer constraints, and key isolation from backup/sync.
"""

import sys
import tempfile
import unittest
import subprocess
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
JSC_BIN = Path('/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc')

BROWSER_MOCK_JS = """
var mockStorage = {};
var localStorage = {
    getItem: function(k) { return mockStorage[k] !== undefined ? mockStorage[k] : null; },
    setItem: function(k, v) { mockStorage[k] = String(v); },
    removeItem: function(k) { delete mockStorage[k]; },
    clear: function() { mockStorage = {}; },
    key: function(i) { return Object.keys(mockStorage)[i] || null; },
    get length() { return Object.keys(mockStorage).length; }
};
var window = this;
var console = {
    log: function() {},
    warn: function() {},
    error: function() {}
};
window.localStorage = localStorage;
window.console = console;
window.addEventListener = function() {};
window.removeEventListener = function() {};
window.dispatchEvent = function() {};
"""


def run_jsc_simulation(source_files, test_script):
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


class TestVoiceGrader(unittest.TestCase):

    def setUp(self):
        self.grader_file = PROJECT_ROOT / 'shared' / 'js' / 'grader.js'
        self.storage_file = PROJECT_ROOT / 'shared' / 'js' / 'storage.js'

    def test_normalize_basic_and_fillers(self):
        """Verify normalizer cleans punctuation, whitespace, and spoken filler words."""
        test_script = """
        if (typeof VoiceGrader === 'undefined') throw new Error('VoiceGrader not defined');

        // Punctuation and casing
        var n1 = VoiceGrader.normalize('An apple!', 'en-IN');
        if (n1 !== 'an apple') throw new Error('Failed punctuation strip: got ' + n1);

        // Fillers
        var n2 = VoiceGrader.normalize('Um, uh, the answer is an umbrella.', 'en-IN');
        if (n2 !== 'an umbrella') throw new Error('Failed filler strip: got ' + n2);

        var n3 = VoiceGrader.normalize('I think it is option B', 'en-IN');
        if (n3 !== 'option b') throw new Error('Failed lead-in strip: got ' + n3);

        var n4 = VoiceGrader.normalize('Well maybe the Taj Mahal', 'en-IN');
        if (n4 !== 'the taj mahal') throw new Error('Failed hesitation strip: got ' + n4);

        print('NORMALIZE_FILLERS_OK');
        """
        res = run_jsc_simulation([self.grader_file], test_script)
        self.assertIn("NORMALIZE_FILLERS_OK", res.stdout, f"Normalization failed:\n{res.stdout}\n{res.stderr}")

    def test_normalize_spoken_numbers(self):
        """Verify spoken numbers are normalized to digits."""
        test_script = """
        if (typeof VoiceGrader === 'undefined') throw new Error('VoiceGrader not defined');

        var n1 = VoiceGrader.normalize('one', 'en-IN');
        if (n1 !== '1') throw new Error('one -> 1 failed, got ' + n1);

        var n2 = VoiceGrader.normalize('twelve', 'en-IN');
        if (n2 !== '12') throw new Error('twelve -> 12 failed, got ' + n2);

        var n3 = VoiceGrader.normalize('twenty-five', 'en-IN');
        if (n3 !== '25') throw new Error('twenty-five -> 25 failed, got ' + n3);

        var n4 = VoiceGrader.normalize('a hundred and twenty', 'en-IN');
        if (n4 !== '120') throw new Error('a hundred and twenty -> 120 failed, got ' + n4);

        var n5 = VoiceGrader.normalize('three apples', 'en-IN');
        if (n5 !== '3 apples') throw new Error('three apples -> 3 apples failed, got ' + n5);

        print('NORMALIZE_NUMBERS_OK');
        """
        res = run_jsc_simulation([self.grader_file], test_script)
        self.assertIn("NORMALIZE_NUMBERS_OK", res.stdout, f"Number normalization failed:\n{res.stdout}\n{res.stderr}")

    def test_grade_closed_exact_and_token_match(self):
        """Verify exact and token matches return correct with score 1.0."""
        test_script = """
        if (typeof VoiceGrader === 'undefined') throw new Error('VoiceGrader not defined');

        // Exact match
        var r1 = VoiceGrader.gradeClosed({
            transcript: 'an',
            accepted: ['an'],
            lang: 'en-IN'
        });
        if (!r1.correct || r1.score !== 1) throw new Error('Exact match failed: ' + JSON.stringify(r1));

        // Exact multi-word match
        var r2 = VoiceGrader.gradeClosed({
            transcript: 'a university',
            accepted: ['a university'],
            lang: 'en-IN'
        });
        if (!r2.correct || r2.score !== 1) throw new Error('Exact multi-word failed: ' + JSON.stringify(r2));

        // Token match with conversational wrapper
        var r3 = VoiceGrader.gradeClosed({
            transcript: 'The answer is an university',
            accepted: ['a university', 'an university'],
            lang: 'en-IN'
        });
        if (!r3.correct) throw new Error('Token match failed: ' + JSON.stringify(r3));

        // Option letter match
        var r4 = VoiceGrader.gradeClosed({
            transcript: 'Option B',
            accepted: ['b', 'an honest man'],
            lang: 'en-IN'
        });
        if (!r4.correct || r4.matched !== 'b') throw new Error('Option letter match failed: ' + JSON.stringify(r4));

        print('GRADE_EXACT_TOKEN_OK');
        """
        res = run_jsc_simulation([self.grader_file], test_script)
        self.assertIn("GRADE_EXACT_TOKEN_OK", res.stdout, f"Grade closed failed:\n{res.stdout}\n{res.stderr}")

    def test_strictness_on_short_answers(self):
        """Verify zero fuzzy tolerance on short answers (<= 3 chars). Never mark 'a' for 'an'."""
        test_script = """
        if (typeof VoiceGrader === 'undefined') throw new Error('VoiceGrader not defined');

        // 'a' vs 'an' must NEVER match fuzzily
        var r1 = VoiceGrader.gradeClosed({
            transcript: 'a',
            accepted: ['an'],
            lang: 'en-IN'
        });
        if (r1.correct) throw new Error('False positive: a marked correct for an!');

        var r2 = VoiceGrader.gradeClosed({
            transcript: 'an',
            accepted: ['a'],
            lang: 'en-IN'
        });
        if (r2.correct) throw new Error('False positive: an marked correct for a!');

        var r3 = VoiceGrader.gradeClosed({
            transcript: 'the',
            accepted: ['a'],
            lang: 'en-IN'
        });
        if (r3.correct) throw new Error('False positive: the marked correct for a!');

        var r4 = VoiceGrader.gradeClosed({
            transcript: 'to',
            accepted: ['no'],
            lang: 'en-IN'
        });
        if (r4.correct) throw new Error('False positive: to marked correct for no!');

        print('STRICT_SHORT_ANSWERS_OK');
        """
        res = run_jsc_simulation([self.grader_file], test_script)
        self.assertIn("STRICT_SHORT_ANSWERS_OK", res.stdout, f"Strict short answers failed:\n{res.stdout}\n{res.stderr}")

    def test_fuzzy_match_on_long_answers(self):
        """Verify reasonable fuzzy tolerance for longer phrases with minor mishearings."""
        test_script = """
        if (typeof VoiceGrader === 'undefined') throw new Error('VoiceGrader not defined');

        // Minor misspelling / mishearing in long phrase
        var r1 = VoiceGrader.gradeClosed({
            transcript: 'becuase hour starts with a vowel sound',
            accepted: ['because hour starts with a vowel sound'],
            lang: 'en-IN'
        });
        if (!r1.correct) throw new Error('Fuzzy match failed on long phrase: ' + JSON.stringify(r1));

        // Substantially different answer must fail
        var r2 = VoiceGrader.gradeClosed({
            transcript: 'because house is bigger than hour',
            accepted: ['because hour starts with a vowel sound'],
            lang: 'en-IN'
        });
        if (r2.correct) throw new Error('False positive on wrong phrase: ' + JSON.stringify(r2));

        print('FUZZY_LONG_ANSWERS_OK');
        """
        res = run_jsc_simulation([self.grader_file], test_script)
        self.assertIn("FUZZY_LONG_ANSWERS_OK", res.stdout, f"Fuzzy long answers failed:\n{res.stdout}\n{res.stderr}")

    def test_api_keys_isolated_from_export_and_sync(self):
        """Verify API keys and AI credentials are strictly excluded from backup export & cloud sync."""
        test_script = """
        if (typeof AppStorage === 'undefined') throw new Error('AppStorage not defined');

        // Store standard CBSE state
        AppStorage.set('cbse5_maths_active_state', { topic: 'hcf' });
        AppStorage.set('grammar-master-active-state', { topic: 'articles' });

        // Store secret AI keys in dedicated key
        var secretKey = 'sk-ant-api03-test-secret-key-12345';
        localStorage.setItem('cbse5_voice_ai_keys', JSON.stringify({
            anthropic: secretKey,
            openai: 'sk-proj-test987',
            gemini: 'AIzaSyTest123'
        }));

        // Verify exportData excludes the secret keys
        var exported = AppStorage.exportData();
        var jsonStr = JSON.stringify(exported);

        if (jsonStr.indexOf(secretKey) !== -1) {
            throw new Error('SECURITY VIOLATION: Secret API key found in AppStorage.exportData()!');
        }
        if (jsonStr.indexOf('cbse5_voice_ai_keys') !== -1) {
            throw new Error('SECURITY VIOLATION: cbse5_voice_ai_keys found in AppStorage.exportData()!');
        }

        print('KEY_ISOLATION_OK');
        """
        res = run_jsc_simulation([self.storage_file], test_script)
        self.assertIn("KEY_ISOLATION_OK", res.stdout, f"Key isolation failed:\n{res.stdout}\n{res.stderr}")


if __name__ == '__main__':
    unittest.main()
