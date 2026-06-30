// ─── TYPES ────────────────────────────────────────────────────────────────────
export type AppStatus   = 'ready' | 'wip' | 'soon';
export type AppSize     = 'large' | 'wide' | 'tall' | '';
export type Category    = 'Games' | 'Tools' | 'Media' | 'Productivity' | 'Editors' | 'Visualize';

export interface AppMeta {
  source: string;
  date:   string;
  model:  string;
  time:   string;
  prompt: string; // may contain HTML tags like <code>
}

export interface AppData {
  id:     string;
  title:  string;
  sub:    string;
  cat:    Category;
  status: AppStatus;
  size:   AppSize;
  desc:   string;
  cover?: string;
  url?:   string;
  tags:   string[];
  meta?:  AppMeta;
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  'Games', 'Tools', 'Media', 'Productivity', 'Editors', 'Visualize',
];

export const CAT_COLOR: Record<Category, string> = {
  Games:        '#ff4d6d',
  Tools:        '#38bdf8',
  Media:        '#fb923c',
  Productivity: '#4ade80',
  Editors:      '#c084fc',
  Visualize:    '#facc15',
};

export const CAT_GRAD_DARK: Record<Category, string> = {
  Games:        'linear-gradient(145deg,#1a0508 0%,#3a0c16 100%)',
  Tools:        'linear-gradient(145deg,#040d18 0%,#082240 100%)',
  Media:        'linear-gradient(145deg,#180900 0%,#3a1800 100%)',
  Productivity: 'linear-gradient(145deg,#031208 0%,#0a2e14 100%)',
  Editors:      'linear-gradient(145deg,#0d0518 0%,#1e0a40 100%)',
  Visualize:    'linear-gradient(145deg,#141000 0%,#302400 100%)',
};

export const CAT_GRAD_LIGHT: Record<Category, string> = {
  Games:        'linear-gradient(145deg,#fff0f2 0%,#ffd6dd 100%)',
  Tools:        'linear-gradient(145deg,#f0f8ff 0%,#d0ecff 100%)',
  Media:        'linear-gradient(145deg,#fff8f0 0%,#ffeacc 100%)',
  Productivity: 'linear-gradient(145deg,#f0fff4 0%,#ccf5d9 100%)',
  Editors:      'linear-gradient(145deg,#faf0ff 0%,#ead5ff 100%)',
  Visualize:    'linear-gradient(145deg,#fffbee 0%,#fff0b3 100%)',
};

export const APP_EMOJI: Record<string, string> = {
  // by category fallback
  Games: '🚀', Tools: '🔧', Media: '🎬', Productivity: '📋', Editors: '📝', Visualize: '🧠',
  // by id
  asteroids:        '🚀',
  'file-converter': '🔄',
  'component-gen':  '⚛️',
  'image-editor':   '🎨',
  'video-editor':   '🎬',
  'music-sequencer':'🎹',
  'event-logger':   '📓',
  kanban:           '📋',
  'task-assign':    '✅',
  'csv-editor':     '📊',
  'word-editor':    '📝',
  'neural-viz':     '🧠',
};

export function getEmoji(app: AppData): string {
  return APP_EMOJI[app.id] ?? APP_EMOJI[app.cat] ?? '🔧';
}

// ─── APP REGISTRY ─────────────────────────────────────────────────────────────
export const APPS: AppData[] = [
  {
    id: 'asteroids',
    title: 'ASTEROIDS',
    sub:   'Blast Rocks! 95',
    cat:   'Games',
    status:'ready',
    size:  'large',
    desc:  'Classic browser arcade game. Pilot your ship, blast rocks into smaller pieces, survive endless waves. Pure HTML + Canvas, no install.',
    cover: '/atlas/screenshots/asteroids.jpg',
    url:   '/atlas/apps/asteroids/index.html',
    tags:  ['game', 'canvas', 'arcade', 'browser'],
    meta: {
      source: 'Claude Cowork',
      date:   '2026-06-29',
      model:  'Claude Sonnet 4.6',
      time:   '~5 minutes',
      prompt: 'In the <code>atlas/apps</code> directory, create an <code>asteroids</code> folder with a small browser-based Asteroids game, independent of the main app, generating a single HTML file.',
    },
  },
  // {
  //   id: 'image-editor',
  //   title: 'IMAGE EDITOR',
  //   sub:   'Edit & Modify Photos',
  //   cat:   'Media',
  //   status:'soon',
  //   size:  'tall',
  //   desc:  'Crop, filter, resize and convert images — all locally, nothing uploaded.',
  //   tags:  ['images', 'canvas', 'filters', 'crop', 'resize'],
  // },
  // {
  //   id: 'file-converter',
  //   title: 'FILE CONVERTERS',
  //   sub:   'Convert Anything!',
  //   cat:   'Tools',
  //   status:'soon',
  //   size:  '',
  //   desc:  'Convert between JSON, CSV, YAML, XML and more. Works offline.',
  //   tags:  ['json', 'csv', 'yaml', 'xml'],
  // },
  // {
  //   id: 'component-gen',
  //   title: 'COMPONENT GEN',
  //   sub:   'Shadcn style',
  //   cat:   'Tools',
  //   status:'soon',
  //   size:  '',
  //   desc:  'React component generator in shadcn style. Copy and paste instantly.',
  //   tags:  ['react', 'shadcn', 'jsx', 'tailwind'],
  // },
  // {
  //   id: 'video-editor',
  //   title: 'VIDEO EDITOR',
  //   sub:   'Quick Cut Video',
  //   cat:   'Media',
  //   status:'soon',
  //   size:  'wide',
  //   desc:  'Trim and merge video clips in your browser. Nothing leaves your device.',
  //   tags:  ['video', 'trim', 'merge'],
  // },
  // {
  //   id: 'music-sequencer',
  //   title: 'MUSIC SEQUENCER',
  //   sub:   'Make Simple Beats',
  //   cat:   'Media',
  //   status:'soon',
  //   size:  '',
  //   desc:  'Step sequencer + synthesizer. Create and export beats entirely offline.',
  //   tags:  ['audio', 'beats', 'web audio'],
  // },
  // {
  //   id: 'event-logger',
  //   title: 'EVENT LOGGER',
  //   sub:   'Event Journal',
  //   cat:   'Productivity',
  //   status:'soon',
  //   size:  '',
  //   desc:  'Log events with tags, search, and Markdown export.',
  //   tags:  ['journal', 'notes', 'markdown'],
  // },
  // {
  //   id: 'kanban',
  //   title: 'KANBAN BOARD',
  //   sub:   'Drag & Drop Tasks',
  //   cat:   'Productivity',
  //   status:'soon',
  //   size:  '',
  //   desc:  'Kanban board with drag & drop, column colors and JSON export.',
  //   tags:  ['kanban', 'tasks', 'drag-drop'],
  // },
  // {
  //   id: 'task-assign',
  //   title: 'TASK ASSIGN',
  //   sub:   'Delegate Tasks',
  //   cat:   'Productivity',
  //   status:'soon',
  //   size:  '',
  //   desc:  'Create and share task lists via link or exported file.',
  //   tags:  ['tasks', 'share', 'collaborate'],
  // },
  // {
  //   id: 'csv-editor',
  //   title: 'CSV & EXCEL',
  //   sub:   'Spreadsheet Sync',
  //   cat:   'Editors',
  //   status:'soon',
  //   size:  'wide',
  //   desc:  'Edit, filter and sort CSV/XLSX spreadsheets. Export to both formats.',
  //   tags:  ['csv', 'excel', 'tables', 'spreadsheet'],
  // },
  // {
  //   id: 'word-editor',
  //   title: 'WORD EDITOR',
  //   sub:   'Writer',
  //   cat:   'Editors',
  //   status:'soon',
  //   size:  '',
  //   desc:  'Lightweight rich-text editor with PDF/DOCX export.',
  //   tags:  ['word', 'document', 'pdf', 'docx'],
  // },
  // {
  //   id: 'neural-viz',
  //   title: 'NEURAL NET VIZ',
  //   sub:   'Build & Visualize AI',
  //   cat:   'Visualize',
  //   status:'soon',
  //   size:  'tall',
  //   desc:  'Interactively build and animate neural network architectures.',
  //   tags:  ['AI', 'neural', 'd3', 'visualize'],
  // },
];
