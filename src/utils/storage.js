/**
 * Storage helpers for InterVue AI
 * Handles Profile, Interview History, Active Session & Theme in localStorage
 */

const KEYS = {
  PROFILE: 'intervue_ai_profile_v1',
  HISTORY: 'intervue_ai_history_v1',
  ACTIVE_SESSION: 'intervue_ai_active_session_v1',
  THEME: 'intervue_ai_theme_v1'
};

// Initial profile defaults
export const DEFAULT_PROFILE = {
  name: 'Alex Morgan',
  college: 'National Institute of Technology',
  course: 'Computer Science & Engineering',
  skills: 'React, Node.js, Python, Data Structures & Algorithms, SQL, Git',
  careerGoal: 'Full-Stack Software Engineer at high-growth tech product company',
  targetRoles: 'Software Development Engineer, Full Stack Developer, Frontend Engineer'
};

// Seed mock history so dashboard visualizer and progress are immediately insightful
export const DEFAULT_HISTORY = [
  {
    id: 'mock-1',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    sessionSetup: {
      type: 'hr',
      typeLabel: 'HR Interview',
      difficulty: 'Beginner',
      questionCount: 5,
      isPressureMode: false
    },
    totalQuestions: 5,
    overallPercentage: 62,
    scores: {
      communication: 65,
      confidence: 58,
      relevance: 68,
      technicalKnowledge: 60,
      grammar: 72
    },
    strengths: [
      'Genuine enthusiasm and clear tone',
      'Good basic overview of academic projects'
    ],
    areasToImprove: [
      'Structure answers using the STAR technique',
      'Reduce hesitation phrases ("I think maybe", "sort of")'
    ],
    commonMistakes: [
      'Giving overly brief one-sentence responses',
      'Not elaborating on personal contributions in group tasks'
    ],
    aiFeedback: 'Good initial foundation! Working on response depth and structuring your answers will yield immediate improvements.',
    qnaList: []
  },
  {
    id: 'mock-2',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    sessionSetup: {
      type: 'technical',
      typeLabel: 'Technical Interview',
      difficulty: 'Intermediate',
      questionCount: 5,
      isPressureMode: false
    },
    totalQuestions: 5,
    overallPercentage: 70,
    scores: {
      communication: 72,
      confidence: 66,
      relevance: 74,
      technicalKnowledge: 70,
      grammar: 80
    },
    strengths: [
      'Clear definition of Object-Oriented Programming concepts',
      'Effective explanation of algorithmic complexity'
    ],
    areasToImprove: [
      'Explain practical trade-offs (e.g. time vs space complexity)',
      'Speak with more assertiveness when describing technical choices'
    ],
    commonMistakes: [
      'Assuming the interviewer already knows project context'
    ],
    aiFeedback: 'Noticeable step forward in technical vocabulary and explanation precision.',
    qnaList: []
  },
  {
    id: 'mock-3',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    sessionSetup: {
      type: 'placement',
      typeLabel: 'College Placement',
      difficulty: 'Intermediate',
      questionCount: 5,
      isPressureMode: false
    },
    totalQuestions: 5,
    overallPercentage: 78,
    scores: {
      communication: 80,
      confidence: 75,
      relevance: 82,
      technicalKnowledge: 76,
      grammar: 85
    },
    strengths: [
      'Solid project architecture breakdown',
      'Well-structured explanation of capstone engineering hurdles'
    ],
    areasToImprove: [
      'Quantify results with measurable metrics (e.g. % performance increase)',
      'Prepare stronger closing questions for the interviewer'
    ],
    commonMistakes: [
      'Rushing through answers without pausing to organize thoughts'
    ],
    aiFeedback: 'Strong, well-rounded performance. You demonstrated clear ownership of your achievements.',
    qnaList: []
  },
  {
    id: 'mock-4',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    sessionSetup: {
      type: 'behavioral',
      typeLabel: 'Behavioral Interview',
      difficulty: 'Advanced',
      questionCount: 5,
      isPressureMode: true
    },
    totalQuestions: 5,
    overallPercentage: 84,
    scores: {
      communication: 88,
      confidence: 85,
      relevance: 86,
      technicalKnowledge: 80,
      grammar: 90
    },
    strengths: [
      'Masterful use of STAR method under Pressure Mode constraints',
      'High-impact executive summaries on conflict resolution'
    ],
    areasToImprove: [
      'Fine-tune transition phrases between problem and resolution'
    ],
    commonMistakes: [
      'Occasionally slight wordiness before getting to the punchline'
    ],
    aiFeedback: 'Excellent performance under high-pressure timing! You demonstrated composure, leadership, and crisp articulation.',
    qnaList: []
  }
];

// Profile storage
export function getProfile() {
  try {
    const raw = localStorage.getItem(KEYS.PROFILE);
    if (!raw) return DEFAULT_PROFILE;
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

// History storage
export function getInterviewHistory() {
  try {
    const raw = localStorage.getItem(KEYS.HISTORY);
    if (!raw) {
      localStorage.setItem(KEYS.HISTORY, JSON.stringify(DEFAULT_HISTORY));
      return DEFAULT_HISTORY;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_HISTORY;
  }
}

export function saveInterviewResult(result) {
  try {
    const history = getInterviewHistory();
    const updated = [result, ...history];
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save interview result', e);
    return [];
  }
}

export function clearInterviewHistory() {
  try {
    localStorage.setItem(KEYS.HISTORY, JSON.stringify([]));
  } catch (e) {
    console.error('Failed to clear history', e);
  }
}

// Active session storage (for recovering state if refreshed)
export function getActiveSession() {
  try {
    const raw = localStorage.getItem(KEYS.ACTIVE_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveActiveSession(session) {
  try {
    if (!session) {
      localStorage.removeItem(KEYS.ACTIVE_SESSION);
    } else {
      localStorage.setItem(KEYS.ACTIVE_SESSION, JSON.stringify(session));
    }
  } catch (e) {}
}

export function clearActiveSession() {
  try {
    localStorage.removeItem(KEYS.ACTIVE_SESSION);
  } catch (e) {}
}

// Theme storage
export function getStoredTheme() {
  try {
    return localStorage.getItem(KEYS.THEME) || 'dark';
  } catch (e) {
    return 'dark';
  }
}

export function setStoredTheme(theme) {
  try {
    localStorage.setItem(KEYS.THEME, theme);
  } catch (e) {}
}
