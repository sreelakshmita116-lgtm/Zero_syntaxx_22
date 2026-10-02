import React, { useState, useEffect, useEffectEvent, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, ShieldAlert, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { InterviewCard } from '../components/InterviewCard';
import { QUESTION_BANK, PRESSURE_QUESTIONS } from '../data/questions';
import { evaluateAnswer, generateFinalReport } from '../utils/evaluator';
import { saveInterviewResult, clearActiveSession } from '../utils/storage';

export function Interview() {
  const navigate = useNavigate();
  const location = useLocation();

  const sessionSetup = location.state?.sessionSetup || {
    type: 'hr',
    typeLabel: 'HR Interview',
    difficulty: 'Intermediate',
    questionCount: 5,
    isPressureMode: false
  };

  // Build question queue for this session
  const [questionList, setQuestionList] = useState(() => {
    let pool = [];
    if (sessionSetup.isPressureMode) {
      pool = [...PRESSURE_QUESTIONS];
    } else {
      pool = QUESTION_BANK[sessionSetup.type] || QUESTION_BANK.hr;
    }

    if (sessionSetup.preSelectedQuestion) {
      const rest = pool.filter((q) => q.id !== sessionSetup.preSelectedQuestion.id);
      return [sessionSetup.preSelectedQuestion, ...rest].slice(0, sessionSetup.questionCount);
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, sessionSetup.questionCount);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFollowUpPhase, setIsFollowUpPhase] = useState(false);
  const [currentQuestionText, setCurrentQuestionText] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const [isLoadingQuestionAudio, setIsLoadingQuestionAudio] = useState(false);
  const [questionAudioError, setQuestionAudioError] = useState('');
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [qnaHistory, setQnaHistory] = useState([]);

  // Timer configuration
  const defaultSeconds = sessionSetup.isPressureMode ? 45 : 90;
  const questionLimit = Math.max(1, Number(sessionSetup.questionCount) || 5);
  const [timeLeft, setTimeLeft] = useState(defaultSeconds);

  const recognitionRef = useRef(null);
  const answerInputRef = useRef(null);
  const audioRef = useRef(null);
  const audioUrlRef = useRef(null);
  const speechRequestRef = useRef(null);

  const stopQuestionAudio = () => {
    speechRequestRef.current?.abort();
    speechRequestRef.current = null;
    audioRef.current?.pause();
    audioRef.current = null;
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    setIsSpeakingQuestion(false);
    setIsLoadingQuestionAudio(false);
  };

  const releaseQuestionAudio = (audio, audioUrl) => {
    if (audioRef.current === audio) {
      audioRef.current = null;
      setIsSpeakingQuestion(false);
    }
    if (audioUrlRef.current === audioUrl) {
      URL.revokeObjectURL(audioUrl);
      audioUrlRef.current = null;
    }
  };

  const handlePlayQuestion = async () => {
    if (isSpeakingQuestion || isLoadingQuestionAudio) {
      stopQuestionAudio();
      return;
    }

    if (!currentQuestionText.trim()) return;

    setQuestionAudioError('');
    setIsLoadingQuestionAudio(true);
    const controller = new AbortController();
    speechRequestRef.current = controller;

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/speech`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: currentQuestionText }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error('Question audio is unavailable. Check that the Edge TTS service is running.');
      }

      const audioUrl = URL.createObjectURL(await response.blob());
      if (controller.signal.aborted) {
        URL.revokeObjectURL(audioUrl);
        return;
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audioUrlRef.current = audioUrl;
      audio.onended = () => releaseQuestionAudio(audio, audioUrl);
      audio.onerror = () => {
        releaseQuestionAudio(audio, audioUrl);
        setQuestionAudioError('Question audio could not be played. Try again.');
      };

      speechRequestRef.current = null;
      setIsLoadingQuestionAudio(false);
      setIsSpeakingQuestion(true);
      await audio.play();
    } catch (error) {
      if (error.name !== 'AbortError') {
        stopQuestionAudio();
        setQuestionAudioError(error.message || 'Question audio could not be generated. Try again.');
      }
    } finally {
      if (speechRequestRef.current === controller) {
        speechRequestRef.current = null;
        setIsLoadingQuestionAudio(false);
      }
    }
  };

  const playQuestion = useEffectEvent(handlePlayQuestion);

  useEffect(() => {
    if (!currentQuestionText.trim()) return;
    const playbackTimer = window.setTimeout(() => playQuestion(), 0);
    return () => window.clearTimeout(playbackTimer);
  }, [currentQuestionText]);

  useEffect(() => () => {
    speechRequestRef.current?.abort();
    audioRef.current?.pause();
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
  }, []);

  useEffect(() => {
    if (questionList.length > 0) {
      setCurrentQuestionText(questionList[0].question);
    }
  }, [questionList]);

  // Speech Recognition setup (Web Speech API)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserAnswer((prev) => `${prev} ${transcript}`.trim());
      };

      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
      recognitionRef.current = recognition;
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isAnalyzing) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isFollowUpPhase, isAnalyzing]);

  const handleToggleVoice = () => {
    if (!recognitionRef.current) {
      alert("Speech-to-text isn't supported in this browser. You can type your answer directly into the response box.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        setIsRecording(false);
      }
    }
  };

  const finishInterview = async (qnaList) => {
    setIsAnalyzing(true);
    stopQuestionAudio();
    const finalReport = await generateFinalReport({
      sessionSetup,
      qnaList: qnaList.slice(-questionLimit)
    });
    saveInterviewResult(finalReport);
    clearActiveSession();
    navigate('/results', { state: { report: finalReport } });
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) {
      alert("Please provide an answer before submitting or use 'Skip Question' if you wish to proceed.");
      return;
    }

    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    setIsAnalyzing(true);
    const activeQuestionObj = questionList[currentIndex] || {};

    const evaluation = await evaluateAnswer({
      question: {
        ...activeQuestionObj,
        question: currentQuestionText
      },
      answer: userAnswer,
      difficulty: sessionSetup.difficulty,
      isPressureMode: sessionSetup.isPressureMode,
      category: sessionSetup.typeLabel
    });

    const recordedItem = {
      question: currentQuestionText,
      answer: userAnswer,
      isFollowUp: isFollowUpPhase,
      evaluation
    };

    const updatedHistory = [...qnaHistory, recordedItem];
    setQnaHistory(updatedHistory);
    setUserAnswer('');

    if (updatedHistory.length >= questionLimit) {
      await finishInterview(updatedHistory);
      return;
    }

    // Check if we should present a follow-up question
    const followUps = activeQuestionObj.followUps || [];
    if (!isFollowUpPhase && followUps.length > 0 && Math.random() > 0.35) {
      const chosenFollowUp = followUps[Math.floor(Math.random() * followUps.length)];
      stopQuestionAudio();
      setCurrentQuestionText(chosenFollowUp);
      setIsFollowUpPhase(true);
      setTimeLeft(sessionSetup.isPressureMode ? 35 : 60);
      setIsAnalyzing(false);
      return;
    }

    // Advance to next question or compile report
    const nextIdx = currentIndex + 1;
    if (nextIdx < questionList.length) {
      stopQuestionAudio();
      setCurrentIndex(nextIdx);
      setIsFollowUpPhase(false);
      setCurrentQuestionText(questionList[nextIdx].question);
      setTimeLeft(defaultSeconds);
      setIsAnalyzing(false);
    } else {
      await finishInterview(updatedHistory);
    }
  };

  const handleSkipQuestion = async () => {
    const recordedItem = {
      question: currentQuestionText,
      answer: '(Question was skipped by candidate)',
      isFollowUp: isFollowUpPhase,
      evaluation: {
        scores: { communication: 40, confidence: 40, relevance: 40, technicalKnowledge: 40, grammar: 70, overall: 45 },
        feedback: "Skipping questions affects your confidence score. In real interviews, attempting a structured guess is better than leaving it completely blank."
      }
    };

    const updatedHistory = [...qnaHistory, recordedItem];
    setQnaHistory(updatedHistory);
    setUserAnswer('');

    if (updatedHistory.length >= questionLimit) {
      await finishInterview(updatedHistory);
      return;
    }

    const nextIdx = currentIndex + 1;
    if (nextIdx < questionList.length) {
      stopQuestionAudio();
      setCurrentIndex(nextIdx);
      setIsFollowUpPhase(false);
      setCurrentQuestionText(questionList[nextIdx].question);
      setTimeLeft(defaultSeconds);
    } else {
      await finishInterview(updatedHistory);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const currentQuestionNumber = Math.min(questionLimit, qnaHistory.length + 1);
  const progressPercent = Math.round((currentQuestionNumber / questionLimit) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-6">
      
      {/* Top Header & Status Bar */}
      <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30">
              {sessionSetup.typeLabel}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {sessionSetup.difficulty}
            </span>
            {sessionSetup.isPressureMode && (
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse flex items-center space-x-1">
                <ShieldAlert className="w-3 h-3" />
                <span>Pressure Mode</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Timer */}
            <div className={`flex min-w-[5.5rem] items-center justify-center space-x-1.5 rounded-xl border bg-white px-3 py-2 font-mono text-sm font-bold text-red-600 shadow-[0_0_18px_rgba(249,115,22,0.24)] ${
              timeLeft < 15
                ? 'border-red-500 shadow-[0_0_18px_rgba(239,68,68,0.32)] animate-pulse'
                : 'border-orange-400'
            }`}>
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-red-600">{formatTime(timeLeft)}</span>
            </div>

            {/* Quit confirmation trigger */}
            <button
              onClick={() => setShowExitConfirm(true)}
              className="text-xs text-slate-500 hover:text-rose-400 transition"
              title="End interview early"
            >
              Quit
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
            <span>Question {currentQuestionNumber} of {questionLimit}</span>
            <span>{progressPercent}% Complete</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main AI Interviewer Card Component */}
      <InterviewCard
        currentQuestionText={currentQuestionText}
        isFollowUpPhase={isFollowUpPhase}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        isAnalyzing={isAnalyzing}
        isRecording={isRecording}
        onToggleVoice={handleToggleVoice}
        onPlayQuestion={handlePlayQuestion}
        isSpeakingQuestion={isSpeakingQuestion}
        isLoadingQuestionAudio={isLoadingQuestionAudio}
        questionAudioError={questionAudioError}
        onSubmitAnswer={handleSubmitAnswer}
        onSkipQuestion={handleSkipQuestion}
        answerInputRef={answerInputRef}
      />

      {/* Confirmation Modal when quitting early */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#11182D] border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">End Interview Early?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              If you exit now, your current session progress will not be compiled into a completed feedback report.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowExitConfirm(false)}
              >
                Continue Interview
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  clearActiveSession();
                  navigate('/setup');
                }}
              >
                Confirm Exit
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
