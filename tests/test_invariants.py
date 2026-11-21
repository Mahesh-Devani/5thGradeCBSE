"""
tests/test_invariants.py
========================
Unit test wrapper for architectural invariants in 5thGradeCBSE.
"""

import unittest
import importlib.util
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Dynamically import check-invariants.py
spec = importlib.util.spec_from_file_location("check_invariants", str(PROJECT_ROOT / "check-invariants.py"))
check_invariants = importlib.util.module_from_spec(spec)
spec.loader.exec_module(check_invariants)


class TestArchitecturalInvariants(unittest.TestCase):
    def test_inv1_css_brace_balance(self):
        res = check_invariants.check_css_brace_balance()
        self.assertTrue(res.passed, f"INV-1 Failed:\n" + "\n".join(res.details))

    def test_inv2_zero_external_runtime_deps(self):
        res = check_invariants.check_zero_external_runtime_deps()
        self.assertTrue(res.passed, f"INV-2 Failed:\n" + "\n".join(res.details))

    def test_inv3_js_syntax_integrity(self):
        res = check_invariants.check_js_syntax_integrity()
        self.assertTrue(res.passed, f"INV-3 Failed:\n" + "\n".join(res.details))

    def test_inv4_image_asset_integrity(self):
        res = check_invariants.check_image_asset_integrity()
        self.assertTrue(res.passed, f"INV-4 Failed:\n" + "\n".join(res.details))

    def test_inv5_question_schema_integrity(self):
        res = check_invariants.check_question_schema_integrity()
        self.assertTrue(res.passed, f"INV-5 Failed:\n" + "\n".join(res.details))

    def test_inv6_star_milestone_progression(self):
        res = check_invariants.check_star_milestone_progression()
        self.assertTrue(res.passed, f"INV-6 Failed:\n" + "\n".join(res.details))

    def test_inv7_progress_reset_contract(self):
        res = check_invariants.check_progress_reset_contract()
        self.assertTrue(res.passed, f"INV-7 Failed:\n" + "\n".join(res.details))

    def test_inv8_storage_key_isolation(self):
        res = check_invariants.check_storage_key_isolation()
        self.assertTrue(res.passed, f"INV-8 Failed:\n" + "\n".join(res.details))

    def test_inv9_mobile_drawer_contract(self):
        res = check_invariants.check_mobile_drawer_contract()
        self.assertTrue(res.passed, f"INV-9 Failed:\n" + "\n".join(res.details))

    def test_inv10_git_hygiene_and_compliance(self):
        res = check_invariants.check_git_hygiene_and_compliance()
        self.assertTrue(res.passed, f"INV-10 Failed:\n" + "\n".join(res.details))

    def test_inv11_learn_mode_checkpoints(self):
        res = check_invariants.check_learn_mode_checkpoints()
        self.assertTrue(res.passed, f"INV-11 Failed:\n" + "\n".join(res.details))


if __name__ == '__main__':
    unittest.main()
