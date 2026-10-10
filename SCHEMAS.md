# 📐 Data Schemas & Contracts — 5thGradeCBSE

This document defines the official, unified data contracts for curriculum content, question banks, and state persistence across all subjects in the **5thGradeCBSE** learning hub.

> **AI Coding Agent Directive**: Consult this file directly when authoring new questions, lessons, or modules. **DO NOT** scan large legacy JavaScript application files to deduce data structures.

---

## 1. Unified Question Object Schema

All interactive questions adhere to this core specification. Runtimes accept standard keys, with backward-compatible fallbacks noted.

```typescript
interface CBSEQuestion {
  /** Unique question identifier within the subject/topic (e.g., 'hcf_q1', 'sci_l2_05') */
  id: string;

  /** Question interaction type */
  type: 'mcq' | 'fib' | 'match' | 'sort' | 'spot_trap';

  /** The question prompt text (HTML markup supported for <strong>, <sub>, etc.) */
  question: string; // Legacy fallback in Science: 'body'

  /** Answer choices presented to the student (typically 4 options for Class 5) */
  options: string[];

  /** Zero-based index of the correct choice (0, 1, 2, or 3) */
  correct: number;

  /** Comprehensive pedagogical reasoning explaining WHY the correct option is right */
  explanation: string;

  /** Metacognitive prompt guiding the student's inner deduction (Thinking Pillar 2) */
  metacognitiveClue?: string; // e.g., "Ask yourself: Are we dividing into smaller chunks or expanding?"

  /** Diagnostic exam trap warning alerting against classic student blunders (Thinking Pillar 3) */
  examTrap?: string; // e.g., "⚠️ Common Exam Trap: Do not calculate LCM when cutting objects into equal sizes!"

  /** Key takeaway summary sentence (Thinking Pillar 4) */
  takeaway?: string;

  /** Optional curriculum reference citation */
  source?: string; // e.g., "CBSE Worksheet 2026-27 (Q II.3)"

  /** Optional illustration or diagram URL */
  image?: string; // e.g., "images/l2_camouflage.png"
}
```

### Clean JS Object Example (MCQ)
```javascript
{
  id: 'hcf_word_prob_01',
  type: 'mcq',
  question: 'Two ribbons of lengths 18 cm and 24 cm are to be cut into pieces of equal length. What is the maximum possible length of each piece?',
  options: ['3 cm', '6 cm', '12 cm', '72 cm'],
  correct: 1,
  metacognitiveClue: 'Ask yourself: Are you chopping down into equal parts (Equal Cutter) or waiting for cycles to meet?',
  examTrap: '⚠️ Exam Trap: 72 is the LCM (multiple), but ribbon pieces cannot be larger than the original ribbons!',
  explanation: 'To find the largest equal piece that cuts both 18 cm and 24 cm without remainder, we find the Highest Common Factor (HCF). Factors of 18 = {1, 2, 3, 6, 9, 18}; Factors of 24 = {1, 2, 3, 4, 6, 8, 12, 24}. The greatest common factor is 6 cm.',
  source: 'NCERT Exemplar Class 5'
}
```

---

## 2. Topic / Chapter Metadata Schema

Every curriculum topic or chapter defines its visual card, pedagogical metaphors, and supported learning modes:

```typescript
interface CBSETopic {
  /** Unique topic identifier (e.g., 'factors_multiples_hcf_lcm', 'ch2_animals') */
  id: string;

  /** Human-readable display title */
  title: string;

  /** Catchy subtitle or thematic focus */
  subtitle: string;

  /** Theme accent emoji or icon */
  icon: string;

  /** Accent color hex token matching the subject theme */
  themeColor: string;

  /** High-level pedagogical summary */
  summary: string;

  /** Supported modes in this topic */
  modes: Array<'learn' | 'practice' | 'challenge' | 'worksheet'>;

  /** Array of concept lesson cards */
  learnCards: Array<{
    badge: string;
    title: string;
    metaphor: string;
    points: string[];
    thinkPrompt: string;
  }>;

  /** Complete question bank for practice and challenges */
  questions: CBSEQuestion[];
}
```

---

## 3. Diagnostic "Spot the Trap / Be the Teacher" Schema

Used for diagnostic slips where students act as teachers diagnosing mistakes on sample student worksheets:

```typescript
interface DiagnosticTrapSlip {
  id: string;
  studentName: string; // e.g., "Rohan", "Ananya"
  questionGiven: string;
  studentWorking: string; // The flawed step-by-step arithmetic or logic
  studentAnswer: string;
  isCorrect: boolean; // Almost always false in diagnostic mode
  flawCategory: 'arithmetic' | 'conceptual_confusion' | 'boundary_violation';
  correctMethod: string;
  explanation: string;
}
```

---

## 4. State Persistence Schema (`localStorage`)

To guarantee state persistence across page refreshes and support future cloud profile sync, client-side state is serialized with a version tag:

```typescript
interface StudentActiveState {
  /** Schema version for forward-compatible migrations */
  schemaVersion: 1;

  /** Currently selected topic/chapter ID */
  activeTopicId: string;

  /** Currently selected tab/mode */
  activeMode: 'learn' | 'practice' | 'challenge' | 'worksheet';

  /** Active subtab or filter if applicable */
  subtab?: string;

  /** In-progress quiz session (restored if user reloads mid-quiz) */
  inProgressSession?: {
    questionIndex: number;
    questionQueue: string[]; // Array of question IDs in randomized order
    score: {
      correct: number;
      incorrect: number;
    };
    selectedAnswerIndex: number | null; // Null if current question unanswered
    isAnswered: boolean;
  };

  /** Earned star ratings keyed by topic ID (0 to 3 stars) */
  stars: Record<string, number>;

  /** Unix timestamp of last interaction */
  lastUpdated: number;
}
```

---

## 5. Storage Key Conventions

All `localStorage` keys are explicitly namespaced to prevent collisions between subjects:

| Subject | Active State Key | Progress / Star Key Pattern |
| :--- | :--- | :--- |
| **Central Hub** | `cbse5_last_active_session` | Aggregated from all subject keys |
| **Mathematics** | `cbse5_maths_active_state` | `cbse5_math_topic_{id}_stars` |
| **Science** | `cbse5_science_active_state` | `cbse5_science_stars_{id}` |
| **English Grammar** | `grammar-master-active-state` | `grammar-master-progress` |
| **Hindi Vyakaran** | `cbse5_hindi_active_state` | `cbse5_hindi_{module}_stars` |
| **SST Chapters** | `cbse5_sst_active_state` | `cbse5_sst_stars_{id}` |
| **SST Maps** | `sst-map-active-state` | `sst-map-progress` |
| **General Knowledge** | `cbse5_gk_active_state` | `cbse5_gk_stars_{id}` |

---

## 6. Pluggable Storage & Backup Contract (`window.AppStorage`)

The unified storage adapter at `shared/js/storage.js` provides zero-dependency access, schema versioning, and parent/teacher backup export:

### API Reference
- `AppStorage.get(key, defaultValue)`: Safely reads and migrates stored JSON objects.
- `AppStorage.set(key, value)`: Serializes object with `_v: 1` and `_updated: Date.now()` metadata, and dispatches `appstorage:change`.
- `AppStorage.remove(key)`: Safely removes key and dispatches change event.
- `AppStorage.exportData()`: Collects all namespaced application keys into an export object.
- `AppStorage.downloadBackup(filename?)`: Downloads structured `.json` backup file for multi-device migration.
- `AppStorage.importData(backupData, options?)`: Restores and merges backup keys into `localStorage`.
- `AppStorage.importFromFile(file)`: Parses and restores uploaded `.json` backup.
- `AppStorage.registerSyncProvider(provider)`: Extensibility point for future cloud sync adapters (Google OAuth / Supabase / Cloudflare).

### Backup JSON Schema
```typescript
interface AppStorageBackup {
  appName: '5thGradeCBSE';
  schemaVersion: number;
  exportedAt: string; // ISO 8601 timestamp
  totalKeys: number;
  data: Record<string, unknown>; // Map of namespaced keys to state objects
}
```

---

## 7. Multi-Child Profile Schema (`AppProfile` & `cbse_family_profiles`)

Multi-child profiles decouple student progress per child under a unified family container:

```typescript
interface FamilyProfilesContainer {
  schemaVersion: 2;
  lastUpdated: number; // Unix timestamp
  profiles: ChildProfile[];
}

interface ChildProfile {
  id: string;          // e.g. "child_default" or "child_m3k9_x4y2"
  name: string;        // e.g. "Aarav", "Ananya"
  avatar: string;      // e.g. "🦁", "🚀", "🦋", "🎨", "⚡", "🐼", "🐬", "🌟"
  grade: string;       // e.g. "class_5", "class_3", "class_1"
  createdAt: number;
  streak: {
    count: number;
    lastDate: string;  // "YYYY-MM-DD"
  };
  /** Isolated snapshot of subject progress & stars for this child */
  data: Record<string, string | unknown>;
}
```

### API Reference (`window.AppProfile`)
- `AppProfile.init()`: Initializes profiles, auto-migrates single-user legacy state into default profile.
- `AppProfile.getProfiles()`: Returns array of family child profiles.
- `AppProfile.getActiveProfile()`: Returns current active child profile.
- `AppProfile.switchProfile(profileId)`: Snapshots active child's local state, swaps active child, restores target child's state into `localStorage`, and emits `profile:switched`.
- `AppProfile.createProfile({ name, avatar, grade, makeActive })`: Creates and saves a new child profile.
- `AppProfile.updateProfile(profileId, updates)`: Updates name, avatar, or grade.
- [x] `AppProfile.deleteProfile(profileId)`: Deletes profile (safeguarded: minimum 1 profile must exist).
- `AppProfile.saveActiveProfileState()`: Persists current `localStorage` state into active child's data snapshot.

---

## 8. Google Drive Family Sync Contract (`window.GoogleDriveSync`)

Serverless multi-device family synchronization using the parent's private, sandboxed Google Drive AppData folder:

### Storage & OAuth Configuration
- **AppData File**: `cbse_family_progress.json` stored in hidden `drive.appdata` space.
- **OAuth Scopes**:
  - `https://www.googleapis.com/auth/drive.appdata`
  - `https://www.googleapis.com/auth/userinfo.profile`
  - `https://www.googleapis.com/auth/userinfo.email`
- **Session Key**: `cbse_google_drive_session` in `localStorage`

### Session Schema
```typescript
interface GoogleDriveSession {
  email: string;
  name: string;
  picture: string;
  accessToken: string;
  expiresAt: number;        // Unix timestamp
  lastSyncTime: number | null;
  fileId: string | null;     // Google Drive file ID
  isSimulated?: boolean;
}
```

### Merging Strategy
1. **Child Profiles Union**: Children present on either device are merged by profile `id`.
2. **Profile Data Merge**: Child subject progress is merged key-by-key based on newest `_updated` timestamp.
3. **Streak Preservation**: Highest continuous streak count and newest practice date are retained.
4. **General Subject Keys**: Root progress keys (`cbse5_*`, `grammar-master-*`, `sst-map-*`) merge using newest `_updated` timestamps.

### API Reference (`window.GoogleDriveSync`)
- `GoogleDriveSync.init()`: Restores session, connects to `AppAuth`, registers with `AppStorage.registerSyncProvider()`.
- `GoogleDriveSync.isConnected()`: Returns boolean indicating active Google connection.
- `GoogleDriveSync.getClientId()` / `setClientId(id)`: Reads/saves Google OAuth Client ID.
- `GoogleDriveSync.requestAuth(interactive)`: Launches Google Identity Services OAuth popup and signs in.
- `GoogleDriveSync.pull()`: Fetches remote container from Google Drive AppData folder.
- `GoogleDriveSync.pushAll(exportContainer)`: Uploads container to Google Drive AppData folder.
- `GoogleDriveSync.mergeContainers(local, remote)`: Conflict-free bidirectional merge engine.
- `GoogleDriveSync.syncNow()`: Orchestrates full pull, merge, import, and push cycle.
- `GoogleDriveSync.simulateSync(options)`: Offline / demo simulator mode for instant testing without Google credentials.
- `GoogleDriveSync.disconnect()`: Revokes token, signs out, and clears session.



