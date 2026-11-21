#!/usr/bin/env python3
"""
run-regressions.py — Change-Aware Regression Test Runner for 5thGradeCBSE
========================================================================
Runs architectural invariant checks and unit regression suites locally using
standard Python and macOS WebKit JSC (zero external npm dependencies, zero token cost).

Usage:
    python3 run-regressions.py              # Intelligently runs tests for changed files
    python3 run-regressions.py --all        # Runs ALL regression test suites
    python3 run-regressions.py --pre-commit # Fast pre-commit hook mode

Exit codes:
    0  All tests passed
    1  One or more tests failed
"""

import os
import sys
import time
import unittest
import subprocess
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

# Color codes
RED = '\033[91m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
CYAN = '\033[96m'
BOLD = '\033[1m'
RESET = '\033[0m'

# Mapping from source file patterns to test modules
FILE_TO_TESTS_MAP = {
    'check-invariants.py': ['tests.test_invariants', 'tests.test_milestones'],
    'tests/': ['tests.test_invariants', 'tests.test_milestones'],
    'styles.css': ['tests.test_invariants'],
    'maths/': ['tests.test_invariants', 'tests.test_milestones'],
    'science/': ['tests.test_invariants', 'tests.test_milestones'],
    'sst_chapters/': ['tests.test_invariants', 'tests.test_milestones'],
    'english_grammer/': ['tests.test_invariants'],
    'hindi_vyakaran/': ['tests.test_invariants'],
    'general_knowledge/': ['tests.test_invariants'],
    'social_sicence_maps/': ['tests.test_invariants'],
    'shared/': ['tests.test_invariants', 'tests.test_milestones'],
    'index.html': ['tests.test_invariants'],
    'hub.js': ['tests.test_invariants'],
}

ALL_TEST_MODULES = [
    'tests.test_invariants',
    'tests.test_milestones',
]


def get_git_modified_files():
    """Detect uncommitted and unstaged files via git status and diff."""
    files = set()
    try:
        # Check unstaged and untracked files
        res = subprocess.run(
            ['git', 'status', '--porcelain'],
            capture_output=True, text=True, cwd=str(PROJECT_ROOT)
        )
        for line in res.stdout.strip().split('\n'):
            if not line:
                continue
            path_part = line[3:].strip()
            # If renamed, take target
            if ' -> ' in path_part:
                path_part = path_part.split(' -> ')[1]
            files.add(path_part)

        # Check files modified in HEAD~1 if working tree is clean
        if not files:
            res_diff = subprocess.run(
                ['git', 'diff', '--name-only', 'HEAD~1'],
                capture_output=True, text=True, cwd=str(PROJECT_ROOT)
            )
            for line in res_diff.stdout.strip().split('\n'):
                if line:
                    files.add(line.strip())
    except Exception as e:
        print(f"{YELLOW}Warning: git detection failed ({e}). Defaulting to all tests.{RESET}")
        return None

    return files


def resolve_tests_for_files(changed_files):
    """Determine which test modules should run based on changed files."""
    if changed_files is None:
        return ALL_TEST_MODULES

    selected = set()
    for changed in changed_files:
        matched = False
        for pattern, test_modules in FILE_TO_TESTS_MAP.items():
            if changed.startswith(pattern) or pattern in changed:
                selected.update(test_modules)
                matched = True
        if not matched:
            selected.update(ALL_TEST_MODULES)

    return sorted(list(selected)) if selected else ALL_TEST_MODULES


def run_test_suites(test_module_names):
    """Run specified unittest modules and print styled output."""
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()

    for mod_name in test_module_names:
        try:
            mod = __import__(mod_name, fromlist=[''])
            suite.addTests(loader.loadTestsFromModule(mod))
        except Exception as e:
            print(f"{RED}Error loading {mod_name}: {e}{RESET}")
            return False

    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    return result.wasSuccessful()


def main():
    args = sys.argv[1:]
    is_all = '--all' in args
    is_pre_commit = '--pre-commit' in args

    print(f"\n{BOLD}{CYAN}5thGradeCBSE — Regression Test Runner{RESET}")
    print(f"{CYAN}{'═' * 55}{RESET}\n")

    t0 = time.time()

    # Pre-commit mode always runs check-invariants.py first
    if is_pre_commit:
        print(f"{BOLD}[Mode: Pre-Commit Fast Check]{RESET}")
        inv_res = subprocess.run([sys.executable, str(PROJECT_ROOT / 'check-invariants.py')])
        if inv_res.returncode != 0:
            return 1
        changed = get_git_modified_files()
        test_modules = resolve_tests_for_files(changed)
    elif is_all:
        print(f"{BOLD}[Mode: Full Regression Suite]{RESET}")
        test_modules = ALL_TEST_MODULES
    else:
        changed = get_git_modified_files()
        if changed:
            print(f"{BOLD}[Mode: Change-Aware]{RESET}")
            print(f"Changed files detected ({len(changed)}):")
            for f in sorted(list(changed))[:5]:
                print(f"  • {f}")
            if len(changed) > 5:
                print(f"  ... and {len(changed) - 5} more")
            test_modules = resolve_tests_for_files(changed)
        else:
            print(f"{BOLD}[Mode: Clean Working Tree — Running All Tests]{RESET}")
            test_modules = ALL_TEST_MODULES

    print(f"\nTargeted test suites ({len(test_modules)}):")
    for tm in test_modules:
        print(f"  → {tm}")
    print()

    success = run_test_suites(test_modules)
    elapsed = time.time() - t0

    print(f"\n{CYAN}{'─' * 55}{RESET}")
    if success:
        print(f"{GREEN}{BOLD}✓ ALL REGRESSION TESTS PASSED{RESET} ({elapsed:.2f}s)\n")
        return 0
    else:
        print(f"{RED}{BOLD}✗ REGRESSION TESTS FAILED{RESET} ({elapsed:.2f}s)\n")
        return 1


if __name__ == '__main__':
    sys.exit(main())
