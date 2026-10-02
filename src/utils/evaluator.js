/**
 * InterVue AI - Evaluation Engine
 * Analyzes answers based on length, keyword presence, structure (STAR),
 * grammar/clarity, and confidence indicators.
 *
 * Designed to be modular so a real Gemini/OpenAI API endpoint can be swapped in.
 */

// Helper: Word count
function countWords(str = '') {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

// Helper: check presence of keywords
function matchKeywords(text = '', keywords = []) {
  const lower = text.toLowerCase();
  return keywords.filter(kw => lower.includes(kw.toLowerCase()));
}

// Positive and hesitant phrases
const CONFIDENT_PHRASES = [
  'i successfully', 'i led', 'i built', 'i implemented', 'i designed',
  'i managed', 'my approach', 'i achieved', 'i am confident', 'specifically',
  'i discovered', 'i resolved', 'i prioritized', 'my experience'
];

const HESITANT_PHRASES = [
  'i guess', "i'm not sure", 'maybe', 'probably', 'kinda', 'sort of',
  'i think perhaps', 'honestly i have no idea', 'dunno', 'i dont know'
];

const STRUCTURE_MARKERS = [
  'firstly', 'secondly', 'for example', 'for instance', 'specifically',
  'as a result', 'because', 'therefore', 'subsequently', 'in conclusion',
  'the challenge was', 'my role was', 'we achieved'
];

const FILLER_WORDS = ['um', 'uh', 'like literally', 'basically basically', 'you know'];

/**
 * Evaluates an individual question answer
 */
export async function evaluateAnswer({ question, answer, difficulty, isPressureMode, category }) {
  // Simulate AI evaluation latency (600 - 1000ms)
  await new Promise(r => setTimeout(r, 800));

  const words = countWords(answer);
  const lower = answer.toLowerCase();

  // 1. Length & Depth Score (0 - 100)
  let depthScore = 60;
  if (words < 12) {
    depthScore = 30; // Very brief
  } else if (words < 25) {
    depthScore = 55;
  } else if (words >= 25 && words <= 160) {
    depthScore = 90; // Sweet spot
  } else if (words > 160 && words <= 240) {
    depthScore = 80;
  } else {
    depthScore = 70; // Slightly too long/rambling
  }

  // 2. Keyword & Relevance Score (0 - 100)
  const matchedKws = matchKeywords(answer, question.keywords || []);
  const kwRatio = (question.keywords?.length > 0) ? (matchedKws.length / question.keywords.length) : 0.5;
  let relevanceScore = Math.min(100, Math.round(50 + kwRatio * 50));
  if (words < 10) relevanceScore = Math.min(relevanceScore, 35);

  // 3. Confidence Score (0 - 100)
  let confidenceScore = 75;
  CONFIDENT_PHRASES.forEach(p => {
    if (lower.includes(p)) confidenceScore += 5;
  });
  HESITANT_PHRASES.forEach(p => {
    if (lower.includes(p)) confidenceScore -= 12;
  });
  confidenceScore = Math.max(35, Math.min(98, confidenceScore));

  // 4. Structure Score (0 - 100)
  let structureScore = 65;
  STRUCTURE_MARKERS.forEach(marker => {
    if (lower.includes(marker)) structureScore += 7;
  });
  if (words > 30 && (lower.includes('result') || lower.includes('learned') || lower.includes('outcome'))) {
    structureScore += 10;
  }
  structureScore = Math.max(30, Math.min(95, structureScore));

  // 5. Grammar & Clarity (0 - 100)
  let grammarScore = 85;
  FILLER_WORDS.forEach(fw => {
    if (lower.includes(fw)) grammarScore -= 8;
  });
  // Check if first character is capitalized
  if (answer.length > 0 && answer[0] !== answer[0].toUpperCase()) {
    grammarScore -= 5;
  }
  // Check ending punctuation (. or ! or ?)
  if (answer.length > 0 && !['.', '!', '?'].includes(answer.trim().slice(-1))) {
    grammarScore -= 5;
  }
  grammarScore = Math.max(40, Math.min(98, grammarScore));

  // 6. Technical Score (if technical/placement/coding)
  let technicalScore = 70;
  if (category?.toLowerCase().includes('technical') || question.category?.toLowerCase().includes('technical')) {
    technicalScore = Math.round((relevanceScore * 0.6) + (depthScore * 0.4));
  } else {
    technicalScore = Math.round((confidenceScore * 0.5) + (relevanceScore * 0.5));
  }

  // Generate specific feedback for this answer
  const answerCritiques = [];
  if (words < 20) {
    answerCritiques.push("Answer was quite concise. Try backing up your points with concrete situations or examples.");
  } else if (words > 180) {
    answerCritiques.push("Good depth, but be mindful of brevity. Highlighting 1-2 core points prevents rambling.");
  }

  if (matchedKws.length >= 2) {
    answerCritiques.push(`Excellent mention of industry concepts (${matchedKws.slice(0, 3).join(', ')}).`);
  }

  if (confidenceScore < 65) {
    answerCritiques.push("Avoid softening phrases like 'I guess' or 'maybe'. Speak with conviction about your skills.");
  }

  const overallSingle = Math.round(
    (relevanceScore * 0.3) +
    (confidenceScore * 0.25) +
    (structureScore * 0.2) +
    (grammarScore * 0.15) +
    (technicalScore * 0.1)
  );

  return {
    wordCount: words,
    scores: {
      communication: Math.round((structureScore + grammarScore) / 2),
      confidence: confidenceScore,
      relevance: relevanceScore,
      technicalKnowledge: technicalScore,
      grammar: grammarScore,
      overall: overallSingle
    },
    matchedKeywords: matchedKws,
    feedback: answerCritiques.join(' ') || "Clear and focused response that addressed the core prompt well."
  };
}

/**
 * Generates comprehensive final report from all completed Q&As
 */
export async function generateFinalReport({ sessionSetup, qnaList }) {
  // Simulate compilation latency
  await new Promise(r => setTimeout(r, 600));

  if (!qnaList || qnaList.length === 0) {
    return null;
  }

  // Compute aggregate averages
  let totalComm = 0;
  let totalConf = 0;
  let totalRel = 0;
  let totalTech = 0;
  let totalGram = 0;

  qnaList.forEach(item => {
    const s = item.evaluation?.scores || {
      communication: 75,
      confidence: 75,
      relevance: 75,
      technicalKnowledge: 75,
      grammar: 80
    };
    totalComm += s.communication;
    totalConf += s.confidence;
    totalRel += s.relevance;
    totalTech += s.technicalKnowledge;
    totalGram += s.grammar;
  });

  const count = qnaList.length;
  const avgComm = Math.round(totalComm / count);
  const avgConf = Math.round(totalConf / count);
  const avgRel = Math.round(totalRel / count);
  const avgTech = Math.round(totalTech / count);
  const avgGram = Math.round(totalGram / count);

  const overall = Math.round((avgComm * 0.25) + (avgConf * 0.25) + (avgRel * 0.2) + (avgTech * 0.15) + (avgGram * 0.15));

  // Determine strengths
  const strengths = [];
  if (avgRel >= 75) strengths.push('Strong prompt relevance — accurately targeted what the interviewer asked.');
  if (avgConf >= 75) strengths.push('High confidence presence — used definitive action verbs and assertive statements.');
  if (avgComm >= 75) strengths.push('Structured communication — ideas followed a logical sequence.');
  if (avgTech >= 75) strengths.push('Solid domain knowledge — integrated appropriate technical terminology.');
  if (avgGram >= 80) strengths.push('Professional language & tone — free of disruptive filler words.');
  if (strengths.length < 2) {
    strengths.push('Willingness to tackle difficult, situational scenarios under timed conditions.');
    strengths.push('Clear articulation of basic background and personal project interests.');
  }

  // Determine areas to improve
  const areasToImprove = [];
  if (avgConf < 75) {
    areasToImprove.push('Confidence delivery: Replace tentative words ("maybe", "I guess") with definitive achievements.');
  }
  if (avgComm < 75) {
    areasToImprove.push('Structure (STAR Method): Clearly outline the Situation, Task, Action you took, and final Result.');
  }
  if (avgRel < 75) {
    areasToImprove.push('Question precision: Directly address the core prompt before adding background context.');
  }
  if (avgTech < 75) {
    areasToImprove.push('Technical depth: Explain the architectural trade-offs rather than just high-level definitions.');
  }
  if (areasToImprove.length < 2) {
    areasToImprove.push('Quantify results: Mention real metrics (e.g. "improved load time by 30%", "tested with 50 users").');
  }

  // Common mistakes detected
  const commonMistakes = [
    'Answering hypothetically rather than citing a specific past project or incident.',
    'Under-elaborating on the actual outcome and lesson learned.',
    'Spending too much time on background story and rushing the technical solution.'
  ];

  // Executive summary
  let summary = '';
  if (overall >= 80) {
    summary = 'Outstanding performance! You conveyed authority, targeted technical keywords with precision, and maintained a confident tone throughout the session.';
  } else if (overall >= 65) {
    summary = 'Solid interview performance. Your answers were relevant and knowledgeable, though polishing your answer structure (STAR method) will elevate you into the top tier of candidates.';
  } else {
    summary = 'Good effort! You showed foundational understanding, but working on response depth, reducing filler words, and providing concrete project evidence will drastically boost your score.';
  }

  return {
    id: `result-${Date.now()}`,
    date: new Date().toISOString(),
    sessionSetup,
    totalQuestions: count,
    overallPercentage: overall,
    scores: {
      communication: avgComm,
      confidence: avgConf,
      relevance: avgRel,
      technicalKnowledge: avgTech,
      grammar: avgGram
    },
    strengths,
    areasToImprove,
    commonMistakes,
    aiFeedback: summary,
    qnaList
  };
}
