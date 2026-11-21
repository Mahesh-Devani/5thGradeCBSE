"""
tests/invariant_metadata.py
===========================
Centralized repository of architectural invariant definitions, AGENTS.md rule references,
root-cause explanations, and actionable remediation guidance for 5thGradeCBSE.

Used by:
  - check-invariants.py (CLI and pre-commit verifier)
  - run-regressions.py (regression test runner)
"""

# Color codes
RED = '\033[91m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
CYAN = '\033[96m'
BOLD = '\033[1m'
RESET = '\033[0m'

INVARIANT_RULES = {
    'INV-1': {
        'title': 'CSS Brace Balance & Media Query Isolation',
        'rule_ref': 'AGENTS.md § 2.D (CSS Brace Balance & Media Query Isolation)',
        'root_cause': (
            "In vanilla CSS, an unclosed '{' or extra '}' before an '@media' block causes\n"
            "the browser parser to treat the '@media' rule as nested inside the preceding\n"
            "selector. This silently disables all responsive mobile drawer rules on phones\n"
            "with zero browser console errors."
        ),
        'remediation': (
            "Verify that open braces equal closing braces in all styles.css files.\n"
            "Count '{' minus '}' across the entire file; result must be exactly 0."
        ),
        'example_bad': ".header { font-size: 16px; /* missing closing brace */ \n@media (max-width: 860px) { ... }",
        'example_good': ".header { font-size: 16px; }\n@media (max-width: 860px) { ... }",
    },
    'INV-2': {
        'title': 'Zero External Runtime Dependencies',
        'rule_ref': 'AGENTS.md § 1.1 (Zero External Runtime Dependencies)',
        'root_cause': (
            "The entire app deploys directly to GitHub Pages from root static files.\n"
            "Introducing external frameworks (React, Vue, Tailwind, jQuery, npm runtime deps)\n"
            "or linking unapproved CDN scripts introduces network vulnerability, latency,\n"
            "and breaks offline PWA functionality."
        ),
        'remediation': (
            "Keep all UI rendering, sound synthesis (AudioContext), and confetti particles\n"
            "in vanilla HTML5, CSS3, and ES6+ JavaScript. Remote CDN scripts are banned\n"
            "(only whitelisted fonts like Google Fonts for Devanagari typography are permitted)."
        ),
        'example_bad': '<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>',
        'example_good': '<!-- Native vanilla ES6 script -->\n<script src="app.js"></script>',
    },
    'INV-3': {
        'title': 'JavaScript Syntax & AST Compilation Integrity',
        'rule_ref': 'AGENTS.md § 4.1 (Validate JavaScript Syntax)',
        'root_cause': (
            "A syntax error, stray character, or unbalanced bracket inside a client script\n"
            "causes the entire subject mini-app to crash on load, preventing initialization\n"
            "and locking the student out of the lesson."
        ),
        'remediation': (
            "Run all JavaScript files through syntax validation (via WebKit jsc compiler\n"
            "or AST parser) to ensure zero compilation or parsing errors."
        ),
        'example_bad': "const data = { id: 'q1', text: 'question' /* missing closing brace */ ;",
        'example_good': "const data = { id: 'q1', text: 'question' };",
    },
    'INV-4': {
        'title': 'Asset & Image Path Integrity (Zero 404s)',
        'rule_ref': 'AGENTS.md § 1.6 & SCHEMAS.md § 1 (Image URLs)',
        'root_cause': (
            "Referencing non-existent image paths in concept cards, question diagrams,\n"
            "or worksheets results in broken image icons and visual disruption for students."
        ),
        'remediation': (
            "Ensure that any file referenced in 'image', 'diagrams', or '<img src>' actually\n"
            "exists on disk relative to the declaring file or repository root."
        ),
        'example_bad': "{ id: 'q1', image: 'images/non_existent_diagram.png' }",
        'example_good': "{ id: 'q1', image: 'images/l6_greenland_map.png' }",
    },
    'INV-5': {
        'title': 'Question Data Schema & ID Uniqueness',
        'rule_ref': 'SCHEMAS.md § 1 (Unified Question Object Schema)',
        'root_cause': (
            "Missing required fields (e.g., 'id', 'question', 'options', 'explanation') or duplicate\n"
            "question IDs causes unpredictable quiz scoring, answer mismatching, and state corruption."
        ),
        'remediation': (
            "Ensure every question has a unique non-empty string 'id', prompt text, explanation,\n"
            "and valid format for its type (MCQ options array >= 2, blank acceptableAnswers array)."
        ),
        'example_bad': "{ question: 'Where is Nuuk?', options: 'A: Greenland' } // missing id, explanation, options is not array",
        'example_good': "{ id: 'grn_q1', question: 'Where is Nuuk?', options: ['Greenland', 'Canada', 'Norway'], correct: 0, explanation: 'Nuuk is the capital of Greenland.' }",
    },
    'INV-6': {
        'title': 'Star Milestone Evaluator Contract & Progressive Fallbacks',
        'rule_ref': 'AGENTS.md § 1.5 & ARCHITECTURE.md § 2 (State Machines)',
        'root_cause': (
            "Milestones that require strict, narrow question categories (e.g., exactly 5 blanks,\n"
            "3 match, 2 long) cause students who solve 10/10 questions in a randomized drill\n"
            "to receive ⭐ 0/10 stars because specific sub-quotas were not met."
        ),
        'remediation': (
            "Always include progressive fallbacks (e.g. '|| d.totalSolved >= X') in milestone\n"
            "evaluator rules across all subjects so students achieve stars monotonically."
        ),
        'example_bad': "check: (d) => (d.categorySolved.blank >= 5) // rigidly fails if quiz gave 4 blanks + 6 MCQs",
        'example_good': "check: (d) => ((d.categorySolved.blank || 0) >= 3 || d.totalSolved >= 2)",
    },
    'INV-7': {
        'title': 'Progress Reset & Practice Drill Integrity',
        'rule_ref': 'AGENTS.md § 2.E (Restart Drill & Reset Control)',
        'root_cause': (
            "1. 'if (stars > current)' guards inside star setters prevent resetting stars to 0.\n"
            "2. Wiping 'practiceAnswered = {}' on drill restart permanently erases the student's\n"
            "   earned chapter mastery and star achievements."
        ),
        'remediation': (
            "1. Allow star setters to accept 0: 'if (stars === 0 || stars > current)'.\n"
            "2. Ensure drill restart resets active quiz pointers (currentQIndex, sessionScore)\n"
            "   WITHOUT deleting the chapter's answered questions history."
        ),
        'example_bad': "function setStars(id, stars) { if (stars > current) localStorage.setItem(...); }\n// drill restart:\nthis.practiceAnswered = {};",
        'example_good': "function setStars(id, stars) { if (stars === 0 || stars > current) localStorage.setItem(...); }\n// drill restart:\nthis.currentQIndex = 0; this.sessionScore = 0;",
    },
    'INV-8': {
        'title': 'State Persistence & Storage Key Isolation',
        'rule_ref': 'AGENTS.md § 1.4 & § 2.E (Namespaced Storage Keys)',
        'root_cause': (
            "Unprefixed localStorage keys cause collisions across subjects, and missing\n"
            "loadActiveState/saveActiveState calls boot students back to welcome screens on reload."
        ),
        'remediation': (
            "Use subject-namespaced keys (e.g., 'cbse5_sst_*', 'science_master_*', 'cbse5_hindi_*',\n"
            "'cbse5_maths_*', 'grammar-master-*', 'sst-map-*', 'cbse5_gk_*') and persist active\n"
            "modes and topics across browser refreshes."
        ),
        'example_bad': "localStorage.setItem('active_topic', id); // Unprefixed key collides with other mini-apps",
        'example_good': "localStorage.setItem('cbse5_sst_active_state', JSON.stringify(state));",
    },
    'INV-9': {
        'title': 'Mobile Responsive Drawer Layout Contract',
        'rule_ref': 'AGENTS.md § 2.A (Mobile-First & Responsive Drawer)',
        'root_cause': (
            "Placing '.sidebar-backdrop' inside '.sidebar' traps the drawer in its own dimmed\n"
            "layer, and missing toggle buttons or home links leaves mobile students stranded."
        ),
        'remediation': (
            "Keep '.sidebar-backdrop' and '.sidebar' as sibling elements in '.app-container'.\n"
            "Include drawer toggle (☰ Topics / ☰ Menu) and Home link (../index.html) in the top bar."
        ),
        'example_bad': '<div class="sidebar"><div class="sidebar-backdrop"></div>...</div>',
        'example_good': '<div class="app-container"><div class="sidebar-backdrop"></div><aside class="sidebar">...</aside></div>',
    },
    'INV-10': {
        'title': 'Cartographic Compliance & Clean Git Hygiene',
        'rule_ref': 'AGENTS.md § 1.3 & § 1.6 (Cartographic Compliance & No PDF Worksheets)',
        'root_cause': (
            "1. Depicting incorrect Indian boundaries violates Survey of India regulations.\n"
            "2. Committing raw PDF question papers or heavy camera scans bloats git repository."
        ),
        'remediation': (
            "1. Maps depicting India MUST include J&K, Ladakh, and Arunachal Pradesh as integral parts.\n"
            "2. Keep '*.pdf' ignored in .gitignore; transcribe worksheet data directly into JS objects."
        ),
        'example_bad': 'git add reference_worksheet.pdf',
        'example_good': '// Transcribe questions into data.js; keep reference PDFs out of repository',
    },
}


def format_remediation_box(rule_id):
    """Format a clean terminal box explaining how to remediate the invariant failure."""
    rule = INVARIANT_RULES.get(rule_id)
    if not rule:
        return ""

    width = 76
    border = "═" * width
    thin_border = "─" * width

    lines = [
        f"\n  {YELLOW}╔{border}╗{RESET}",
        f"  {YELLOW}║{RESET}  {BOLD}{RED}REMEDIATION GUIDE: [{rule_id}] {rule['title'][:width-30]}{RESET}".ljust(width + 10) + f"{YELLOW}║{RESET}",
        f"  {YELLOW}╠{thin_border}╣{RESET}",
        f"  {YELLOW}║{RESET}  {BOLD}Rule Reference:{RESET} {rule['rule_ref']}".ljust(width + 10) + f"{YELLOW}║{RESET}",
        f"  {YELLOW}╠{thin_border}╣{RESET}",
        f"  {YELLOW}║{RESET}  {BOLD}Root Cause:{RESET}".ljust(width + 10) + f"{YELLOW}║{RESET}",
    ]

    for line in rule['root_cause'].split('\n'):
        lines.append(f"  {YELLOW}║{RESET}    {line}".ljust(width + 10) + f"{YELLOW}║{RESET}")

    lines.append(f"  {YELLOW}╠{thin_border}╣{RESET}")
    lines.append(f"  {YELLOW}║{RESET}  {BOLD}Actionable Fix:{RESET}".ljust(width + 10) + f"{YELLOW}║{RESET}")

    for line in rule['remediation'].split('\n'):
        lines.append(f"  {YELLOW}║{RESET}    {line}".ljust(width + 10) + f"{YELLOW}║{RESET}")

    if rule.get('example_bad'):
        lines.append(f"  {YELLOW}╠{thin_border}╣{RESET}")
        lines.append(f"  {YELLOW}║{RESET}  {BOLD}{RED}❌ Bad Pattern:{RESET}".ljust(width + 10) + f"{YELLOW}║{RESET}")
        for line in rule['example_bad'].split('\n'):
            lines.append(f"  {YELLOW}║{RESET}    {RED}{line}{RESET}".ljust(width + 19) + f"{YELLOW}║{RESET}")

    if rule.get('example_good'):
        lines.append(f"  {YELLOW}║{RESET}  {BOLD}{GREEN}✓ Good Pattern:{RESET}".ljust(width + 10) + f"{YELLOW}║{RESET}")
        for line in rule['example_good'].split('\n'):
            lines.append(f"  {YELLOW}║{RESET}    {GREEN}{line}{RESET}".ljust(width + 19) + f"{YELLOW}║{RESET}")

    lines.append(f"  {YELLOW}╚{border}╝{RESET}\n")
    return '\n'.join(lines)
