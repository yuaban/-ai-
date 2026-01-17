
import React, { useState, useEffect, useMemo } from 'react';
import { QUESTIONS } from './constants';
import { AssessmentResult, AIReport, Category, Question } from './types';
import { generateAIReport } from './services/geminiService';
import QuestionCard from './components/QuestionCard';
import Results from './components/Results';
import InfoPage from './components/InfoPage';

const App: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(-1); // -1: Landing, -2: Info, 0-29: Questions, 30: Results
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [aiReport, setAiReport] = useState<AIReport | null>(null);
  const [displayCount, setDisplayCount] = useState(134);

  useEffect(() => {
    const BASE_COUNT = 134;
    const storedOffset = localStorage.getItem('visit_count_offset');
    const currentOffset = storedOffset ? parseInt(storedOffset, 10) : 0;
    const newOffset = currentOffset + 1;
    localStorage.setItem('visit_count_offset', newOffset.toString());
    setDisplayCount(BASE_COUNT + newOffset);
  }, []);

  const isResultsPage = currentIdx === QUESTIONS.length && aiReport;

  const currentQuestion = useMemo(() => {
    if (currentIdx >= 0 && currentIdx < QUESTIONS.length) {
      return QUESTIONS[currentIdx];
    }
    return null;
  }, [currentIdx]);

  const progress = useMemo(() => {
    if (currentIdx < 0) return 0;
    return ((currentIdx + 1) / QUESTIONS.length) * 100;
  }, [currentIdx]);

  const handleStartLanding = () => setCurrentIdx(-2); // Go to Info Page
  const handleStartAssessment = () => setCurrentIdx(0); // Go to First Question

  const handleSelectAnswer = async (score: number) => {
    if (!currentQuestion) return;
    const newAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(newAnswers);

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setLoading(true);
      try {
        const scores = QUESTIONS.reduce((acc: Record<Category, number>, q: Question) => {
          const cat = q.category;
          acc[cat] = (acc[cat] || 0) + (newAnswers[q.id] || 0);
          return acc;
        }, {} as Record<Category, number>);

        const totalScore = (Object.values(scores) as number[]).reduce((a: number, b: number) => a + b, 0);
        const result: AssessmentResult = { scores, totalScore, answers: newAnswers };
        
        // Pass name and age to context for a more personal report
        const report = await generateAIReport(result);
        setAiReport(report);
        setCurrentIdx(QUESTIONS.length);
      } catch (err) {
        console.error("Critical assessment error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(-1);
    setAnswers({});
    setAiReport(null);
    setChildName("");
    setChildAge("");
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isResultsPage ? 'bg-[#F3F0FF]' : 'bg-[#fcfdff]'} text-slate-900 selection:bg-blue-100`}>
      <div className="max-w-xl mx-auto px-6 pt-12">
        
        {/* Landing Page */}
        {currentIdx === -1 && (
          <div className="space-y-12 py-8 animate-in fade-in duration-1000">
            <div className="text-center space-y-6">
              <div className="inline-block bg-blue-600 p-4 rounded-3xl shadow-2xl rotate-3">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                了解孩子的<br/>
                <span className="text-blue-600">AI时代创造力</span>
              </h1>
              <p className="text-lg text-gray-500 max-w-sm mx-auto">
                基于托兰斯创造力测验等国际标准，深度分析孩子思维、审美与AI赋能潜力。
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
              <h2 className="font-bold text-gray-800 text-xl border-l-4 border-blue-600 pl-3">测评说明</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span>共 30 道精选问题，预计用时 5 分钟</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span>由家长根据孩子日常表现客观选择</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span>测评结束后将获得米多多智能陪伴AI精灵的分析报告</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleStartLanding}
              className="w-full bg-blue-600 text-white py-5 rounded-full text-xl font-bold shadow-2xl hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              开始免费测评
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <div className="flex justify-center">
              <div className="px-6 py-2 border-2 border-blue-500 text-gray-400 text-sm">
                已有 {displayCount}+ 位家长完成测评
              </div>
            </div>
          </div>
        )}

        {/* Info Page */}
        {currentIdx === -2 && (
          <InfoPage 
            name={childName}
            age={childAge}
            setName={setChildName}
            setAge={setChildAge}
            onNext={handleStartAssessment}
          />
        )}

        {/* Questionnaire Page */}
        {currentIdx >= 0 && currentIdx < QUESTIONS.length && currentQuestion && (
          <div className="space-y-8 py-4">
            <div className="space-y-2">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-right text-xs font-bold text-blue-600 uppercase tracking-widest">
                Progress {Math.round(progress)}%
              </p>
            </div>

            <QuestionCard 
              question={currentQuestion}
              selectedScore={answers[currentQuestion.id]}
              onSelect={handleSelectAnswer}
            />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-12 text-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">米多多 AI 正在深度分析中...</h2>
              <p className="text-gray-500 animate-pulse">正在为 {childName} 生成个性化报告，请稍候</p>
            </div>
          </div>
        )}

        {/* Results Page */}
        {currentIdx === QUESTIONS.length && aiReport && (
          <Results 
            childName={childName}
            result={{
              scores: QUESTIONS.reduce((acc: Record<Category, number>, q: Question) => {
                const cat = q.category;
                acc[cat] = (acc[cat] || 0) + (answers[q.id] || 0);
                return acc;
              }, {} as Record<Category, number>),
              totalScore: (Object.values(answers) as number[]).reduce((a: number, b: number) => a + b, 0),
              answers
            }}
            aiReport={aiReport}
            onRestart={handleRestart}
          />
        )}

      </div>
    </div>
  );
};

export default App;
