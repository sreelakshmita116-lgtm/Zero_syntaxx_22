// Question bank organized by Interview Type and Difficulty
export const QUESTION_BANK = {
  hr: [
    {
      id: 'hr-1',
      question: 'Tell me about yourself and your background.',
      category: 'HR Interview',
      difficulty: 'Beginner',
      keywords: ['education', 'experience', 'skills', 'passion', 'projects', 'background', 'growth'],
      followUps: [
        'How do your past experiences specifically align with what this role demands?',
        'What sparked your initial interest in this career path?'
      ]
    },
    {
      id: 'hr-2',
      question: 'What are your greatest professional strengths, and how do you apply them?',
      category: 'HR Interview',
      difficulty: 'Beginner',
      keywords: ['problem-solving', 'adaptability', 'communication', 'teamwork', 'leadership', 'fast learner'],
      followUps: [
        'Can you provide a concrete example of a time when that strength directly benefited your team?',
        'How do you keep improving this strength over time?'
      ]
    },
    {
      id: 'hr-3',
      question: 'What is your biggest weakness, and what active steps are you taking to overcome it?',
      category: 'HR Interview',
      difficulty: 'Intermediate',
      keywords: ['improvement', 'self-awareness', 'learning', 'time management', 'delegation', 'public speaking'],
      followUps: [
        'Has this weakness ever created a major obstacle for you, and how did you resolve it?',
        'What tools or strategies do you use daily to keep this in check?'
      ]
    },
    {
      id: 'hr-4',
      question: 'Why should we hire you over other qualified candidates?',
      category: 'HR Interview',
      difficulty: 'Intermediate',
      keywords: ['value', 'unique', 'commitment', 'culture', 'impact', 'work ethic', 'skills'],
      followUps: [
        'What unique trait or perspective will you bring to our team on day one?',
        'How do you handle situations where your ideas disagree with team leadership?'
      ]
    },
    {
      id: 'hr-5',
      question: 'Where do you see yourself professionally in the next three to five years?',
      category: 'HR Interview',
      difficulty: 'Intermediate',
      keywords: ['goals', 'growth', 'mentorship', 'responsibility', 'skills', 'leadership', 'impact'],
      followUps: [
        'What specific milestones have you set for yourself in year one to reach that target?',
        'How will this company help you achieve that vision?'
      ]
    },
    {
      id: 'hr-6',
      question: 'Describe a situation where you experienced significant workplace or academic stress. How did you cope?',
      category: 'HR Interview',
      difficulty: 'Advanced',
      keywords: ['prioritization', 'deadlines', 'calm', 'focus', 'communication', 'resilience'],
      followUps: [
        'If the deadline had slipped regardless of your efforts, how would you have communicated with stakeholders?',
        'What preventative measures do you now take to avoid similar bottlenecks?'
      ]
    }
  ],

  technical: [
    {
      id: 'tech-1',
      question: 'Explain the core principles of Object-Oriented Programming (OOP) and why they matter.',
      category: 'Technical Interview',
      difficulty: 'Beginner',
      keywords: ['encapsulation', 'inheritance', 'polymorphism', 'abstraction', 'modularity', 'reusability', 'classes'],
      followUps: [
        'What is the key difference between abstraction and encapsulation in practice?',
        'Can you give an example of composition over inheritance?'
      ]
    },
    {
      id: 'tech-2',
      question: 'What is an algorithm, and how do you evaluate its time and space complexity?',
      category: 'Technical Interview',
      difficulty: 'Beginner',
      keywords: ['big-o', 'time complexity', 'space complexity', 'efficiency', 'worst-case', 'memory', 'scaling'],
      followUps: [
        'Why might an O(N log N) algorithm sometimes be preferred over an O(N) algorithm with huge constants?',
        'How do you optimize an algorithm that is running out of memory?'
      ]
    },
    {
      id: 'tech-3',
      question: 'What is the fundamental difference between a compiler and an interpreter?',
      category: 'Technical Interview',
      difficulty: 'Intermediate',
      keywords: ['machine code', 'bytecode', 'execution', 'syntax', 'translation', 'runtime', 'jit'],
      followUps: [
        'How does a JIT (Just-In-Time) compiler combine the benefits of both approaches?',
        'Why are interpreted languages often easier to debug during rapid prototyping?'
      ]
    },
    {
      id: 'tech-4',
      question: 'Walk me through a significant software project you built. What architecture and tech stack did you choose?',
      category: 'Technical Interview',
      difficulty: 'Intermediate',
      keywords: ['architecture', 'database', 'frontend', 'backend', 'api', 'state', 'framework', 'scalability'],
      followUps: [
        'If your project experienced a 10x spike in daily traffic tomorrow, where would the primary bottleneck occur?',
        'Knowing what you know now, what technical decision would you change if you rewrote it today?'
      ]
    },
    {
      id: 'tech-5',
      question: 'Explain what a relational database is versus a NoSQL database, and when you would select each.',
      category: 'Technical Interview',
      difficulty: 'Intermediate',
      keywords: ['acid', 'schema', 'sql', 'nosql', 'joins', 'indexing', 'horizontal scaling', 'document'],
      followUps: [
        'How would you handle a sudden requirement for frequent full-text search across millions of records?',
        'What is an index, and what are the trade-offs of adding too many indexes to a table?'
      ]
    },
    {
      id: 'tech-6',
      question: 'Explain RESTful API design principles and how HTTP status codes should be used effectively.',
      category: 'Technical Interview',
      difficulty: 'Advanced',
      keywords: ['stateless', 'get', 'post', 'put', 'delete', 'endpoints', 'json', 'authentication', 'headers', '404', '500'],
      followUps: [
        'How do you secure your endpoints against unauthorized tampering and rate abuse?',
        'What is the difference between idempotent and non-idempotent HTTP methods?'
      ]
    }
  ],

  internship: [
    {
      id: 'intern-1',
      question: 'Why are you specifically interested in doing an internship with our organization?',
      category: 'Internship Interview',
      difficulty: 'Beginner',
      keywords: ['mission', 'learning', 'growth', 'industry', 'culture', 'mentorship', 'contribution'],
      followUps: [
        'What specific skills are you most eager to develop during your first month here?',
        'How do you plan to measure your own success by the end of the internship?'
      ]
    },
    {
      id: 'intern-2',
      question: 'Tell me about a course, lab, or personal project where you had to learn a technology independently.',
      category: 'Internship Interview',
      difficulty: 'Beginner',
      keywords: ['self-taught', 'documentation', 'curiosity', 'tutorials', 'troubleshooting', 'experimenting'],
      followUps: [
        'When you get stuck on an unfamiliar bug, what is your step-by-step debugging workflow?',
        'How do you balance spending time trying to solve it yourself versus asking a mentor?'
      ]
    },
    {
      id: 'intern-3',
      question: 'How do you balance academic coursework, extracurricular activities, and internship responsibilities?',
      category: 'Internship Interview',
      difficulty: 'Intermediate',
      keywords: ['time management', 'calendar', 'prioritization', 'focus', 'communication', 'deadlines'],
      followUps: [
        'Tell me about a time you realized you had overcommitted. How did you rectify the situation?',
        'How do you handle unexpected changes in priority on short notice?'
      ]
    },
    {
      id: 'intern-4',
      question: 'How do you handle receiving critical feedback or code review suggestions from a senior mentor?',
      category: 'Internship Interview',
      difficulty: 'Intermediate',
      keywords: ['open-minded', 'growth mindset', 'actionable', 'receptive', 'improvement', 'professionalism'],
      followUps: [
        'Can you recall a piece of advice that changed the way you write code or approach problems?',
        'What would you do if you disagreed with a mentor’s review comment?'
      ]
    }
  ],

  placement: [
    {
      id: 'place-1',
      question: 'How has your college education and coursework prepared you for the demands of the corporate industry?',
      category: 'College Placement',
      difficulty: 'Beginner',
      keywords: ['fundamentals', 'curriculum', 'practical labs', 'team projects', 'problem-solving', 'discipline'],
      followUps: [
        'What was the most challenging academic project you completed, and what was your individual contribution?',
        'How do you bridge the gap between theoretical classroom knowledge and production-ready applications?'
      ]
    },
    {
      id: 'place-2',
      question: 'Tell me about your final year capstone project or a major group assignment.',
      category: 'College Placement',
      difficulty: 'Intermediate',
      keywords: ['architecture', 'teamwork', 'milestones', 'deliverables', 'git', 'challenges', 'presentation'],
      followUps: [
        'How did your team divide tasks and handle members who lagged behind schedule?',
        'If you had another semester to work on it, what feature would you prioritize adding next?'
      ]
    },
    {
      id: 'place-3',
      question: 'Are you open to relocating or working in rotational shifts if required by company projects?',
      category: 'College Placement',
      difficulty: 'Beginner',
      keywords: ['flexible', 'adaptable', 'open', 'relocation', 'learning', 'commitment'],
      followUps: [
        'How quickly do you adapt to unfamiliar environments and team structures?',
        'What steps do you take to integrate smoothly into a brand-new city or team?'
      ]
    },
    {
      id: 'place-4',
      question: 'Where do your technical interests lean most: frontend, backend, cloud, data, or systems?',
      category: 'College Placement',
      difficulty: 'Intermediate',
      keywords: ['passion', 'specialization', 'full-stack', 'data', 'cloud', 'architecture', 'user experience'],
      followUps: [
        'What recent industry trend or breakthrough in that domain has caught your attention lately?',
        'Are you willing to work in a different domain if company needs require it?'
      ]
    }
  ],

  self_intro: [
    {
      id: 'intro-1',
      question: 'Give me your 90-second elevator pitch: who you are, what you build, and what drives you.',
      category: 'Self Introduction',
      difficulty: 'Beginner',
      keywords: ['identity', 'skills', 'passion', 'accomplishments', 'future goal', 'drive', 'clarity'],
      followUps: [
        'What is one thing not on your resume that defines your character or work style?',
        'What was the defining moment that made you want to become a software engineer?'
      ]
    },
    {
      id: 'intro-2',
      question: 'Walk me through your resume, highlighting the two achievements you are most proud of.',
      category: 'Self Introduction',
      difficulty: 'Beginner',
      keywords: ['achievements', 'metrics', 'impact', 'milestones', 'initiative', 'recognition'],
      followUps: [
        'Why does that particular achievement stand out as your proudest milestone?',
        'What was the biggest hurdle you had to overcome while achieving it?'
      ]
    },
    {
      id: 'intro-3',
      question: 'How would your professors, teammates, or previous managers describe your work ethic in three words?',
      category: 'Self Introduction',
      difficulty: 'Intermediate',
      keywords: ['reliable', 'proactive', 'diligent', 'collaborative', 'curious', 'resilient'],
      followUps: [
        'Can you share an incident that validates one of those three words in action?',
        'What is one misconception people might have about you before getting to know you?'
      ]
    }
  ],

  behavioral: [
    {
      id: 'beh-1',
      question: 'Tell me about a difficult technical or personal problem you encountered and how you solved it.',
      category: 'Behavioral Questions',
      difficulty: 'Beginner',
      keywords: ['situation', 'task', 'action', 'result', 'star', 'root cause', 'analysis', 'solution'],
      followUps: [
        'What other alternative solutions did you consider before settling on this one?',
        'What was the measurable outcome or lesson you walked away with?'
      ]
    },
    {
      id: 'beh-2',
      question: 'Describe a time when you experienced a major disagreement with a teammate or peer. How was it resolved?',
      category: 'Behavioral Questions',
      difficulty: 'Intermediate',
      keywords: ['conflict', 'empathy', 'communication', 'compromise', 'objective', 'respect', 'consensus'],
      followUps: [
        'Looking back, is there anything you could have done earlier to prevent the tension from escalating?',
        'How did your relationship with that peer evolve afterward?'
      ]
    },
    {
      id: 'beh-3',
      question: 'Describe a significant failure or mistake you made. How did you take ownership and respond?',
      category: 'Behavioral Questions',
      difficulty: 'Intermediate',
      keywords: ['accountability', 'transparency', 'fix', 'ownership', 'recovery', 'growth', 'lesson'],
      followUps: [
        'How did you communicate the failure to mentors or stakeholders without making excuses?',
        'What safeguards did you implement to guarantee that specific mistake won’t recur?'
      ]
    },
    {
      id: 'beh-4',
      question: 'Give an example of a time you went above and beyond your defined responsibilities to deliver a project.',
      category: 'Behavioral Questions',
      difficulty: 'Advanced',
      keywords: ['initiative', 'ownership', 'proactive', 'quality', 'impact', 'extra mile'],
      followUps: [
        'Did anyone ask you to do that, or did you identify the gap yourself?',
        'How did your extra contribution impact the final user or customer experience?'
      ]
    }
  ]
};

// Pressure mode challenging, high-stakes questions
export const PRESSURE_QUESTIONS = [
  {
    id: 'press-1',
    question: 'Why should we choose you over another candidate with higher grades and more experience?',
    category: 'Pressure Mode',
    difficulty: 'Advanced',
    timeLimitSeconds: 45,
    keywords: ['value', 'tenacity', 'adaptability', 'drive', 'execution', 'proven', 'culture'],
    followUps: [
      'That sounds like what any candidate would say. What is concrete evidence of your execution speed?',
      'If you could only prove your worth through one single metric, what would it be?'
    ]
  },
  {
    id: 'press-2',
    question: 'You have 30 seconds. Explain your most impressive project and the exact technical bottleneck you solved.',
    category: 'Pressure Mode',
    difficulty: 'Advanced',
    timeLimitSeconds: 30,
    keywords: ['architecture', 'bottleneck', 'optimization', 'latency', 'scale', 'result', 'code'],
    followUps: [
      'Why did that bottleneck exist in the first place? Was it poor design or unforeseen scale?',
      'How would your architecture survive a sudden failure of the primary database?'
    ]
  },
  {
    id: 'press-3',
    question: 'What is your biggest personal or professional flaw, and why won’t it jeopardize our team?',
    category: 'Pressure Mode',
    difficulty: 'Advanced',
    timeLimitSeconds: 45,
    keywords: ['flaw', 'honesty', 'mitigation', 'awareness', 'boundaries', 'safeguards'],
    followUps: [
      'How would you respond if your manager publicly called you out on that exact flaw during a sprint review?',
      'Give me an example of when that flaw actively hurt a project outcome.'
    ]
  },
  {
    id: 'press-4',
    question: 'If you join our team and find out the codebase is a legacy mess with zero documentation, what do you do in your first 48 hours?',
    category: 'Pressure Mode',
    difficulty: 'Advanced',
    timeLimitSeconds: 45,
    keywords: ['observe', 'tests', 'logging', 'architecture', 'questions', 'map', 'do not break'],
    followUps: [
      'Would you immediately propose a total rewrite, or would you patch it incrementally? Defend your choice.',
      'How do you ship features while concurrently refactoring legacy debt?'
    ]
  },
  {
    id: 'press-5',
    question: 'Convince me right now: Why should we offer you the job before you walk out of this room?',
    category: 'Pressure Mode',
    difficulty: 'Advanced',
    timeLimitSeconds: 35,
    keywords: ['confidence', 'impact', 'readiness', 'immediate contribution', 'passion', 'loyalty'],
    followUps: [
      'What is the highest risk we take by extending you an offer today?',
      'What will you achieve in your first 30 days to prove this wasn’t a mistake?'
    ]
  }
];

// Flat list of all questions for Question Bank page
export const ALL_QUESTIONS = [
  ...QUESTION_BANK.hr,
  ...QUESTION_BANK.technical,
  ...QUESTION_BANK.internship,
  ...QUESTION_BANK.placement,
  ...QUESTION_BANK.self_intro,
  ...QUESTION_BANK.behavioral,
  ...PRESSURE_QUESTIONS
];

export const INTERVIEW_TYPES = [
  { id: 'hr', label: 'HR Interview', icon: 'Users', description: 'Behavioral, cultural fit, strengths & career goals' },
  { id: 'technical', label: 'Technical Interview', icon: 'Code', description: 'Core CS concepts, system design, coding & architecture' },
  { id: 'internship', label: 'Internship Interview', icon: 'GraduationCap', description: 'Learning mindset, adaptability & college project exposure' },
  { id: 'placement', label: 'College Placement', icon: 'Briefcase', description: 'Campus hiring, engineering foundations & situational queries' },
  { id: 'self_intro', label: 'Self Introduction', icon: 'UserCheck', description: 'Elevator pitches, resume walkthroughs & personal branding' },
  { id: 'behavioral', label: 'Behavioral Interview', icon: 'Target', description: 'STAR method problem-solving, teamwork & conflict resolution' }
];
