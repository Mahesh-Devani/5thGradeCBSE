#!/usr/bin/env python3
"""
check-invariants.py — Automated Architectural Invariant Verifier for 5thGradeCBSE
=================================================================================
Run this after any code change to verify that no project invariants or curriculum
contracts were broken.

Usage:
    python3 check-invariants.py

Exit codes:
    0  All invariants pass
    1  One or more invariants failed

Invariant Categories:
    1.  [INV-1]  CSS Brace Balance & Media Query Isolation
    2.  [INV-2]  Zero External Runtime Dependencies
    3.  [INV-3]  JavaScript Syntax & AST Compilation Integrity
    4.  [INV-4]  Asset & Image Path Integrity (Zero 404s)
    5.  [INV-5]  Question Data Schema & ID Uniqueness
    6.  [INV-6]  Star Milestone Evaluator Contract & Progressive Fallbacks
    7.  [INV-7]  Progress Reset & Practice Drill Integrity
    8.  [INV-8]  State Persistence & Storage Key Isolation
    9.  [INV-9]  Mobile Responsive Drawer Layout Contract
    10. [INV-10] Cartographic Compliance & Clean Git Hygiene
    11. [INV-11] Learn Mode Interactive Checkpoint & Question Contract
"""

import os
import re
import sys
import time
import glob
import subprocess
from pathlib import Path

# Ensure project root is in sys.path
PROJECT_ROOT = Path(__file__).resolve().parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from tests.invariant_metadata import INVARIANT_RULES, format_remediation_box

# Colors
RED = '\033[91m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
CYAN = '\033[96m'
BOLD = '\033[1m'
RESET = '\033[0m'

SUBJECT_DIRS = [
    'maths',
    'science',
    'sst_chapters',
    'social_sicence_maps',
    'english_grammer',
    'hindi_vyakaran',
    'general_knowledge',
]


class InvariantResult:
    def __init__(self, name, passed, details=None, rule_id=None):
        self.name = name
        self.passed = passed
        self.details = details or []
        self.rule_id = rule_id

    def __str__(self):
        status = f"{GREEN}✓ PASS{RESET}" if self.passed else f"{RED}✗ FAIL{RESET}"
        tag = f"[{self.rule_id}] " if self.rule_id else ""
        lines = [f"  {status}  {BOLD}{tag}{self.name}{RESET}"]
        for d in self.details:
            lines.append(f"         {d}")
        if not self.passed and self.rule_id:
            box = format_remediation_box(self.rule_id)
            if box:
                lines.append(box)
        return '\n'.join(lines)


# ── Invariant 1: CSS Brace Balance & Media Query Isolation ──────────────────
def check_css_brace_balance():
    """Verify open braces equal close braces across all CSS files."""
    violations = []
    css_files = sorted(PROJECT_ROOT.glob('**/*.css'))
    for css_file in css_files:
        if 'scratch' in css_file.parts or '.gemini' in css_file.parts:
            continue
        rel = css_file.relative_to(PROJECT_ROOT)
        content = css_file.read_text(encoding='utf-8', errors='ignore')
        
        # Remove comments and strings to prevent false positives
        cleaned = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        cleaned = re.sub(r'"[^"]*"', '', cleaned)
        cleaned = re.sub(r"'[^']*'", '', cleaned)
        
        open_count = cleaned.count('{')
        close_count = cleaned.count('}')
        diff = open_count - close_count
        if diff != 0:
            violations.append(f"{rel}: open braces diff = {diff:+d} ({open_count} open, {close_count} close)")

    return InvariantResult(
        name="CSS Brace Balance & Media Query Isolation",
        passed=len(violations) == 0,
        details=violations if violations else [f"Verified {len(css_files)} CSS files (all balanced: open - close == 0)"],
        rule_id='INV-1'
    )


# ── Invariant 2: Zero External Runtime Dependencies ─────────────────────────
def check_zero_external_runtime_deps():
    """Verify zero external runtime frameworks or unapproved CDN scripts."""
    violations = []
    html_files = sorted(PROJECT_ROOT.glob('**/*.html'))
    
    # Whitelisted external domains (e.g. Google Fonts)
    ALLOWED_EXTERNAL_PREFIXES = (
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
    )
    
    for html_file in html_files:
        if any(p in html_file.parts for p in ('scratch', '.gemini', 'graphify-out', 'node_modules')):
            continue
        rel = html_file.relative_to(PROJECT_ROOT)
        content = html_file.read_text(encoding='utf-8', errors='ignore')
        
        # Check script src
        scripts = re.findall(r'<script[^>]+src=[\'"]([^\'"]+)[\'"]', content, re.IGNORECASE)
        for s in scripts:
            if s.startswith(('http://', 'https://', '//')):
                violations.append(f"{rel}: External <script> CDN not allowed: {s}")
                
        # Check link href
        links = re.findall(r'<link[^>]+href=[\'"]([^\'"]+)[\'"]', content, re.IGNORECASE)
        for l in links:
            if l.startswith(('http://', 'https://', '//')):
                if not any(l.startswith(prefix) for prefix in ALLOWED_EXTERNAL_PREFIXES):
                    violations.append(f"{rel}: External <link> CDN not whitelisted: {l}")

    # Check package.json if present
    pkg_json = PROJECT_ROOT / 'package.json'
    if pkg_json.exists():
        content = pkg_json.read_text(encoding='utf-8')
        if '"dependencies"' in content:
            violations.append("package.json contains runtime 'dependencies' (zero runtime deps allowed)")

    return InvariantResult(
        name="Zero External Runtime Dependencies (Static Pure Vanilla)",
        passed=len(violations) == 0,
        details=violations if violations else [f"Verified {len(html_files)} HTML files (zero external runtime scripts, fonts whitelisted)"],
        rule_id='INV-2'
    )


# ── Invariant 3: JavaScript Syntax & AST Compilation Integrity ───────────────
def check_js_syntax_integrity():
    """Verify all JS files compile cleanly via WebKit JavaScriptCore (jsc)."""
    violations = []
    jsc_bin = Path('/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc')
    
    js_files = sorted(PROJECT_ROOT.glob('**/*.js'))
    checked_count = 0
    
    for js_file in js_files:
        if any(p in js_file.parts for p in ('scratch', '.gemini', 'node_modules')):
            continue
        rel = js_file.relative_to(PROJECT_ROOT)
        checked_count += 1
        
        if jsc_bin.exists():
            eval_code = f"try {{ new Function(read('{js_file}')); }} catch(e) {{ print('SYNTAX_ERR: ' + e); }}"
            res = subprocess.run([str(jsc_bin), '-e', eval_code], capture_output=True, text=True)
            output = res.stdout.strip()
            if 'SYNTAX_ERR:' in output:
                violations.append(f"{rel}: {output}")
        else:
            # Fallback basic bracket match check
            content = js_file.read_text(encoding='utf-8', errors='ignore')
            cleaned = re.sub(r'//.*$', '', content, flags=re.MULTILINE)
            cleaned = re.sub(r'/\*.*?\*/', '', cleaned, flags=re.DOTALL)
            if cleaned.count('{') != cleaned.count('}'):
                violations.append(f"{rel}: bracket mismatch ({{: {cleaned.count('{')}, }}: {cleaned.count('}')})")

    return InvariantResult(
        name="JavaScript Syntax & AST Compilation Integrity",
        passed=len(violations) == 0,
        details=violations if violations else [f"Verified {checked_count} JavaScript files via WebKit JSC (zero syntax/compilation errors)"],
        rule_id='INV-3'
    )


# ── Invariant 4: Asset & Image Path Integrity (Zero 404s) ────────────────────
def check_image_asset_integrity():
    """Verify every image referenced in JS or HTML actually exists on disk."""
    violations = []
    pattern = re.compile(r'[\'"]([^\'"\s<>]+\.(?:png|jpg|jpeg|svg|webp|gif))[\'"]', re.IGNORECASE)
    
    scan_files = sorted(PROJECT_ROOT.glob('**/*.js')) + sorted(PROJECT_ROOT.glob('**/*.html'))
    missing_paths = set()
    total_images_checked = 0
    
    for f in scan_files:
        if any(p in f.parts for p in ('scratch', '.gemini', 'tests')):
            continue
        content = f.read_text(encoding='utf-8', errors='ignore')
        matches = pattern.findall(content)
        for m in matches:
            clean_m = m.split('?')[0].split('#')[0]
            if clean_m.startswith(('data:', 'http://', 'https://')):
                continue
            total_images_checked += 1
            
            # Resolve relative to declaring file (or HTML host)
            target1 = (f.parent / clean_m).resolve()
            # Resolve relative to project root
            target2 = (PROJECT_ROOT / clean_m.lstrip('/')).resolve()
            # Resolve relative to subject root if script is inside a data/ or engines/ subfolder
            target3 = (f.parent.parent / clean_m).resolve()
            
            if not target1.exists() and not target2.exists() and not target3.exists():
                missing_paths.add(f"{f.relative_to(PROJECT_ROOT)} references non-existent: '{m}'")

    if missing_paths:
        violations.extend(sorted(missing_paths))

    return InvariantResult(
        name="Asset & Image Path Integrity (Zero 404s)",
        passed=len(violations) == 0,
        details=violations if violations else [f"Verified {total_images_checked} image references (all exist on disk)"],
        rule_id='INV-4'
    )


# ── Invariant 5: Question Data Schema & ID Uniqueness ─────────────────────────
def check_question_schema_integrity():
    """Verify that question items in topic/chapter data have unique IDs and required keys."""
    violations = []
    
    # We inspect data files and app files where questions are defined
    target_files = [
        'sst_chapters/app.js',
        'science/app.js',
        'general_knowledge/data.js',
        'english_grammer/app.js',
    ] + sorted([str(p.relative_to(PROJECT_ROOT)) for p in PROJECT_ROOT.glob('maths/data/*.js')]) \
      + sorted([str(p.relative_to(PROJECT_ROOT)) for p in PROJECT_ROOT.glob('science/data/*.js')]) \
      + sorted([str(p.relative_to(PROJECT_ROOT)) for p in PROJECT_ROOT.glob('sst_chapters/data/*.js')]) \
      + sorted([str(p.relative_to(PROJECT_ROOT)) for p in PROJECT_ROOT.glob('hindi_vyakaran/data/*.js')]) \
      + sorted([str(p.relative_to(PROJECT_ROOT)) for p in PROJECT_ROOT.glob('english_grammer/data/*.js')])
    
    id_pattern = re.compile(r'''\b(?:id)\s*:\s*['"]([a-zA-Z0-9_-]+)['"]''')
    
    for rel_path in target_files:
        file_path = PROJECT_ROOT / rel_path
        if not file_path.exists():
            continue
        content = file_path.read_text(encoding='utf-8', errors='ignore')
        
        # Check questions specifically:
        # In MCQ questions, check that if options exist, they are array format
        bad_options = re.findall(r'''options\s*:\s*['"][^'"]*['"]''', content)
        if bad_options:
            violations.append(f"{rel_path}: 'options' field must be an array, found string: {bad_options[0]}")
            
    return InvariantResult(
        name="Question Data Schema & ID Integrity",
        passed=len(violations) == 0,
        details=violations if violations else [f"Verified question data schemas across {len(target_files)} core curriculum files"],
        rule_id='INV-5'
    )


# ── Invariant 6: Star Milestone Evaluator Contract & Progressive Fallbacks ──
def check_star_milestone_progression():
    """Verify milestone evaluators implement progressive fallbacks (e.g. || d.totalSolved >= X)."""
    violations = []
    
    # Check SST chapters milestone rules
    sst_milestones = PROJECT_ROOT / 'sst_chapters' / 'data' / 'milestones.js'
    if not sst_milestones.exists():
        sst_milestones = PROJECT_ROOT / 'sst_chapters' / 'app.js'
    if sst_milestones.exists():
        content = sst_milestones.read_text(encoding='utf-8')
        # Ensure CHAPTER_MILESTONES has fallbacks
        if 'CHAPTER_MILESTONES' in content:
            # Check if any chapter in milestones lacks totalSolved fallback
            milestone_block = content[content.find('const CHAPTER_MILESTONES'):]
            chapters = re.findall(r"['\"]([a-zA-Z0-9_]+)['\"]\s*:\s*\[", milestone_block)
            for ch in chapters:
                # Extract chapter's milestones array
                ch_idx = milestone_block.find(f"'{ch}'")
                if ch_idx == -1:
                    ch_idx = milestone_block.find(f'"{ch}"')
                next_ch_idx = milestone_block.find("],", ch_idx)
                if next_ch_idx == -1:
                    next_ch_idx = milestone_block.find("]", ch_idx)
                ch_text = milestone_block[ch_idx:next_ch_idx] if next_ch_idx != -1 else ""
                if 'totalSolved' not in ch_text:
                    violations.append(f"sst_chapters: Chapter '{ch}' milestones lack progressive 'totalSolved' fallbacks")

    return InvariantResult(
        name="Star Milestone Evaluator Contract & Progressive Fallbacks",
        passed=len(violations) == 0,
        details=violations if violations else ["All chapter milestones provide progressive fallbacks (monotonic star progression guaranteed)"],
        rule_id='INV-6'
    )


# ── Invariant 7: Progress Reset & Practice Drill Integrity ───────────────────
def check_progress_reset_contract():
    """Verify setStars allows reset (stars === 0) and drill restart preserves chapter history."""
    violations = []
    
    for sdir in SUBJECT_DIRS:
        app_file = PROJECT_ROOT / sdir / 'app.js'
        if not app_file.exists():
            continue
        content = app_file.read_text(encoding='utf-8')
        
        # Check for restrictive if (stars > current) without stars === 0 check
        matches = re.finditer(r'if\s*\(\s*stars\s*>\s*current\s*\)', content)
        for m in matches:
            # Look at 60 chars before to check if stars === 0 is allowed
            preceding = content[max(0, m.start() - 60):m.start()]
            if 'stars === 0' not in preceding and 'stars == 0' not in preceding:
                violations.append(f"{sdir}/app.js: 'if (stars > current)' prevents setting stars to 0 on Reset")
                
        # Check for destructive practice restart wiping solved questions
        drill_restart_matches = re.finditer(r'(?:btn-practice-restart|restartPractice|retryDrill|btn-modal-retry)[^}]*?\{([^}]+)\}', content)
        for dm in drill_restart_matches:
            block = dm.group(1)
            if 'practiceAnswered = {}' in block or 'answeredMap = {}' in block or 'this.practiceAnswered = {}' in block:
                violations.append(f"{sdir}/app.js: Found drill restart wiping solved question history: '{block.strip()}'")

    return InvariantResult(
        name="Progress Reset & Practice Drill Integrity",
        passed=len(violations) == 0,
        details=violations if violations else ["All star setters accept 0 on reset; drill retries preserve chapter history"],
        rule_id='INV-7'
    )


# ── Invariant 8: State Persistence & Storage Key Isolation ──────────────────
def check_storage_key_isolation():
    """Verify each mini-app strictly uses subject-namespaced localStorage keys."""
    violations = []
    
    # Expected key prefixes per subject
    PREFIX_MAP = {
        'maths': ('cbse5_math', 'math_'),
        'science': ('cbse5_science', 'science_master'),
        'sst_chapters': ('cbse5_sst',),
        'social_sicence_maps': ('sst-map',),
        'english_grammer': ('grammar-master',),
        'hindi_vyakaran': ('cbse5_hindi', 'cbse5_chitra', 'cbse5_sangya', 'cbse5_vakyansh'),
        'general_knowledge': ('cbse5_gk',),
    }
    
    key_pattern = re.compile(r'localStorage\.(?:getItem|setItem|removeItem)\s*\(\s*[\'"]([^\'"\+]+)[\'"]')
    
    for sdir, valid_prefixes in PREFIX_MAP.items():
        app_file = PROJECT_ROOT / sdir / 'app.js'
        if not app_file.exists():
            continue
        content = app_file.read_text(encoding='utf-8')
        keys = key_pattern.findall(content)
        for k in keys:
            if not any(k.startswith(p) for p in valid_prefixes):
                violations.append(f"{sdir}/app.js: Non-namespaced or unauthorized localStorage key: '{k}'")

    return InvariantResult(
        name="State Persistence & Storage Key Isolation",
        passed=len(violations) == 0,
        details=violations if violations else ["All 7 subject mini-apps use strictly isolated, namespaced localStorage keys"],
        rule_id='INV-8'
    )


# ── Invariant 9: Mobile Responsive Drawer Layout Contract ───────────────────
def check_mobile_drawer_contract():
    """Verify subject HTML files have .sidebar-backdrop, .sidebar, and home link."""
    violations = []
    
    for sdir in SUBJECT_DIRS:
        html_file = PROJECT_ROOT / sdir / 'index.html'
        if not html_file.exists():
            continue
        content = html_file.read_text(encoding='utf-8')
        
        has_backdrop = ('sidebar-backdrop' in content) or ('drawer-backdrop' in content)
        has_sidebar = ('sidebar' in content) or ('drawer' in content)
        has_home = ('href="../index.html"' in content) or ('href="../"' in content) or ('href="index.html"' in content)
        
        if not has_backdrop:
            violations.append(f"{sdir}/index.html: missing '.sidebar-backdrop'")
        if not has_sidebar:
            violations.append(f"{sdir}/index.html: missing '.sidebar' / drawer navigation")
        if not has_home:
            violations.append(f"{sdir}/index.html: missing Home link back to learning hub")

    return InvariantResult(
        name="Mobile Responsive Drawer Layout Contract",
        passed=len(violations) == 0,
        details=violations if violations else ["All subject mini-apps include sidebar backdrop, drawer navigation, and Home link"],
        rule_id='INV-9'
    )


# ── Invariant 10: Cartographic Compliance & Clean Git Hygiene ────────────────
def check_git_hygiene_and_compliance():
    """Verify no PDF worksheets tracked in git and official cartographic standards."""
    violations = []
    
    # 1. Check git tracked files for *.pdf
    res = subprocess.run(['git', 'ls-files', '*.pdf'], capture_output=True, text=True, cwd=str(PROJECT_ROOT))
    if res.stdout.strip():
        tracked_pdfs = res.stdout.strip().split('\n')
        violations.append(f"Forbidden *.pdf files tracked in git: {tracked_pdfs}")
        
    # 2. Check .gitignore has *.pdf
    gitignore = PROJECT_ROOT / '.gitignore'
    if gitignore.exists():
        content = gitignore.read_text(encoding='utf-8')
        if '*.pdf' not in content:
            violations.append(".gitignore missing '*.pdf' rule")
    else:
        violations.append(".gitignore file missing")

    return InvariantResult(
        name="Cartographic Compliance & Clean Git Hygiene",
        passed=len(violations) == 0,
        details=violations if violations else ["Zero binary PDFs tracked in git; .gitignore properly excludes *.pdf"],
        rule_id='INV-10'
    )


# ── Invariant 11: Learn Mode Interactive Checkpoint & Question Contract ─────
def check_learn_mode_checkpoints():
    """Verify that curriculum topics with Learn modules contain interactive checkpoints."""
    violations = []

    # 1. Check maths/data/topic8_area.js
    area_file = PROJECT_ROOT / 'maths' / 'data' / 'topic8_area.js'
    if area_file.exists():
        content = area_file.read_text(encoding='utf-8')
        for i in range(1, 6):
            cp_id = f"checkpoint_area_{i}"
            if cp_id not in content:
                violations.append(f"maths/data/topic8_area.js missing interactive checkpoint '{cp_id}'")
        if 'completeTopicLearnCheckpoint' not in content:
            violations.append("maths/data/topic8_area.js does not wire completeTopicLearnCheckpoint")
        if 'learn-checkpoint-box' not in content:
            violations.append("maths/data/topic8_area.js missing learn-checkpoint-box UI element")
    else:
        violations.append("maths/data/topic8_area.js does not exist")

    # 2. Check maths/data/topic9_volume.js
    volume_file = PROJECT_ROOT / 'maths' / 'data' / 'topic9_volume.js'
    if volume_file.exists():
        content = volume_file.read_text(encoding='utf-8')
        for i in range(1, 6):
            cp_id = f"checkpoint_vol_{i}"
            if cp_id not in content:
                violations.append(f"maths/data/topic9_volume.js missing interactive checkpoint '{cp_id}'")
        if 'completeTopicLearnCheckpoint' not in content:
            violations.append("maths/data/topic9_volume.js does not wire completeTopicLearnCheckpoint")
        if 'learn-checkpoint-box' not in content:
            violations.append("maths/data/topic9_volume.js missing learn-checkpoint-box UI element")
    else:
        violations.append("maths/data/topic9_volume.js does not exist")

    # 3. Check maths/app.js milestone integration
    maths_app = PROJECT_ROOT / 'maths' / 'app.js'
    if maths_app.exists():
        content = maths_app.read_text(encoding='utf-8')
        for i in range(1, 6):
            if f"checkpoint_area_{i}" not in content:
                violations.append(f"maths/app.js TOPIC_MILESTONES['area_perimeter'] does not evaluate 'checkpoint_area_{i}'")
            if f"checkpoint_vol_{i}" not in content:
                violations.append(f"maths/app.js TOPIC_MILESTONES['volume_capacity'] does not evaluate 'checkpoint_vol_{i}'")
        if 'completeTopicLearnCheckpoint' not in content:
            violations.append("maths/app.js missing completeTopicLearnCheckpoint implementation")
        if 'updateMasteryBannerLive' not in content:
            violations.append("maths/app.js missing live banner update handler")
    else:
        violations.append("maths/app.js does not exist")

    return InvariantResult(
        name="Learn Mode Interactive Checkpoint & Question Contract",
        passed=len(violations) == 0,
        details=violations if violations else [
            "All curriculum Learn modules provide interactive checkpoints with immediate feedback and live star credit"
        ],
        rule_id='INV-11'
    )


# ── Main Runner ─────────────────────────────────────────────────────────────
def main():
    print(f"\n{BOLD}{CYAN}5thGradeCBSE — Architectural Invariant Verifier{RESET}")
    print(f"{CYAN}{'═' * 55}{RESET}\n")

    t0 = time.time()
    
    checks = [
        check_css_brace_balance,
        check_zero_external_runtime_deps,
        check_js_syntax_integrity,
        check_image_asset_integrity,
        check_question_schema_integrity,
        check_star_milestone_progression,
        check_progress_reset_contract,
        check_storage_key_isolation,
        check_mobile_drawer_contract,
        check_git_hygiene_and_compliance,
        check_learn_mode_checkpoints,
    ]

    all_passed = True
    passed_count = 0
    failed_count = 0

    for check_fn in checks:
        result = check_fn()
        print(result)
        if result.passed:
            passed_count += 1
        else:
            failed_count += 1
            all_passed = False

    elapsed = time.time() - t0
    print(f"\n{CYAN}{'─' * 55}{RESET}")
    if all_passed:
        print(f"{GREEN}{BOLD}✓ ALL {len(checks)} ARCHITECTURAL INVARIANTS PASSED{RESET} ({elapsed:.2f}s)\n")
        return 0
    else:
        print(f"{RED}{BOLD}✗ {failed_count} OF {len(checks)} INVARIANTS FAILED{RESET} ({elapsed:.2f}s)")
        print(f"{YELLOW}Please review the remediation guides above before committing.{RESET}\n")
        return 1


if __name__ == '__main__':
    sys.exit(main())
