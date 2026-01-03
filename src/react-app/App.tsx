import React, { useState, useEffect } from 'react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswers: string[];
}

interface QuizQuestion extends Question {
  displayId: number;
}

const NaturalizationTestPractice: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'setup' | 'quiz' | 'results'>('setup');
  const [questionPool, setQuestionPool] = useState<string>('100');
  const [questionsPerPage, setQuestionsPerPage] = useState<string>('5');
  const [currentQuizPage, setCurrentQuizPage] = useState<number>(1);
  const [practiceMode, setPracticeMode] = useState<'multiple-choice' | 'type-answer'>('multiple-choice');
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [showHelp, setShowHelp] = useState(false);

  // Fuzzy matching helper - calculates similarity between two strings
  const calculateSimilarity = (str1: string, str2: string): number => {
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();
    
    if (s1 === s2) return 1;
    
    const longer = s1.length > s2.length ? s1 : s2;
    // const shorter = s1.length > s2.length ? s2 : s1;
    
    if (longer.length === 0) return 1;
    
    const editDistance = getEditDistance(s1, s2);
    return (longer.length - editDistance) / longer.length;
  };

  // Levenshtein distance algorithm
  const getEditDistance = (s1: string, s2: string): number => {
    const costs: number[] = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  };

  // Fetch all questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/questions');
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      
      const data = await response.json();
      setAllQuestions(data);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };


  const generateQuizQuestions = () => {
    const poolSize = Math.min(parseInt(questionPool) || 100, allQuestions.length);
    
    // Shuffle ALL questions first
    const shuffledAll = [...allQuestions].sort(() => Math.random() - 0.5);
    
    // Take the poolSize questions from the shuffled array - this becomes our quiz
    const selected = shuffledAll.slice(0, poolSize);
    
    // Add display IDs
    const withDisplayIds: QuizQuestion[] = selected.map((q, index) => ({
      ...q,
      displayId: index + 1
    }));
    
    setQuizQuestions(withDisplayIds);
  };

  const handleStartQuiz = () => {
    if (allQuestions.length === 0) {
      setError('Questions not loaded. Please wait or refresh the page.');
      return;
    }
    
    generateQuizQuestions();
    setCurrentPage('quiz');
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuizPage(1);
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers(prev => {
      const question = quizQuestions.find(q => q.id === questionId);
      
      // For multiple choice with 2-3 correct answers (checkbox mode)
      if (practiceMode === 'multiple-choice' && question && question.correctAnswers.length > 1 && question.correctAnswers.length < 4) {
        const currentAnswers = Array.isArray(prev[questionId]) ? prev[questionId] as string[] : [];
        
        // Toggle the answer
        if (currentAnswers.includes(answer)) {
          // Remove if already selected
          const newAnswers = currentAnswers.filter(a => a !== answer);
          return {
            ...prev,
            [questionId]: newAnswers.length > 0 ? newAnswers : []
          };
        } else {
          // Add to selection
          return {
            ...prev,
            [questionId]: [...currentAnswers, answer]
          };
        }
      }
      
      // For single selection (radio buttons) or type-answer
      // This includes: 1 correct answer, or 4+ correct answers (with "All of the above")
      return {
        ...prev,
        [questionId]: answer
      };
    });
  };

  const handleSubmitAnswers = () => {
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewTest = () => {
    setCurrentPage('setup');
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuizPage(1);
  };

  const handleRetryTest = () => {
    // Regenerate quiz with same settings
    generateQuizQuestions();
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuizPage(1);
  };

  const isAnswerCorrect = (question: QuizQuestion) => {
    const userAnswer = userAnswers[question.id];
    if (!userAnswer) return false;
    
    // Check if user selected "All of the above"
    if (userAnswer === "All of the above") {
      // Check if all options are actually correct answers
      const allOptionsCorrect = question.options.every(opt => 
        question.correctAnswers.some(correctAnswer => 
          opt.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
        )
      );
      return allOptionsCorrect && question.correctAnswers.length >= 4;
    }
    
    // For multiple choice with multiple correct answers (checkbox mode)
    if (Array.isArray(userAnswer)) {
      // User must select all correct answers and no incorrect ones
      if (userAnswer.length !== question.correctAnswers.length) return false;
      return userAnswer.every(ans => 
        question.correctAnswers.some(correctAnswer => 
          ans.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
        )
      );
    }
    
    // For typed answers - use fuzzy matching (85% similarity threshold)
    if (practiceMode === 'type-answer' && typeof userAnswer === 'string') {
      const SIMILARITY_THRESHOLD = 0.85; // 85% similarity required
      
      return question.correctAnswers.some(correctAnswer => {
        const similarity = calculateSimilarity(userAnswer, correctAnswer);
        return similarity >= SIMILARITY_THRESHOLD;
      });
    }
    
    // For single selection multiple choice - exact match
    return question.correctAnswers.some(correctAnswer => 
      userAnswer.toString().toLowerCase().trim() === correctAnswer.toLowerCase().trim()
    );
  };

  const getCorrectAnswersDisplay = (question: QuizQuestion) => {
    return question.correctAnswers.join(', ');
  };

  const calculateScore = () => {
    let correctCount = 0;
    quizQuestions.forEach(question => {
      if (isAnswerCorrect(question)) {
        correctCount++;
      }
    });
    
    const totalQuestions = quizQuestions.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    
    return {
      correct: correctCount,
      total: totalQuestions,
      percentage
    };
  };

  // Help Dialog Component
  const HelpDialog = () => {
    if (!showHelp) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">📚 How This App Works</h2>
                <p className="text-blue-100">N-400 Naturalization Test Practice Guide</p>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="text-white hover:text-gray-200 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* About the Test */}
            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                🇺🇸 About the N-400 Civics Test
              </h3>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <ul className="space-y-2 text-gray-700">
                  <li>• The actual test has <strong>128 possible questions</strong></li>
                  <li>• During your interview, you'll be asked <strong>20 questions</strong></li>
                  <li>• You must answer <strong>12 out of 20 correctly (60%)</strong> to pass</li>
                  <li>• Questions cover American government, history, and civics</li>
                </ul>
              </div>
            </section>

            {/* How to Use This App */}
            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                ⚙️ How to Use This App
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">1️⃣ Setup Your Test</h4>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• <strong>Number of Questions:</strong> Choose how many questions (1-128) you want to practice</li>
                    <li>• <strong>Questions Per Page:</strong> Set how many questions appear on each page</li>
                    <li>• <strong>Practice Mode:</strong> Choose Multiple Choice or Type Your Answer</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">2️⃣ Take the Test</h4>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Questions are randomly selected from the pool</li>
                    <li>• Navigate between pages using Previous/Next buttons</li>
                    <li>• Your answers are saved automatically</li>
                    <li>• Submit when you're done with all questions</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">3️⃣ Review Results</h4>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• See your score and percentage</li>
                    <li>• Review correct answers for each question</li>
                    <li>• Green = correct, Red = incorrect</li>
                    <li>• Click <strong>Retry</strong> for new questions with same settings</li>
                    <li>• Click <strong>New Test</strong> to change settings</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Question Types */}
            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                📝 Question Types
              </h3>
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 bg-green-50 p-3 rounded">
                  <h4 className="font-semibold text-gray-800 mb-1">✓ Single Answer (Radio Buttons)</h4>
                  <p className="text-sm text-gray-700">Select one correct answer from the options</p>
                </div>

                <div className="border-l-4 border-purple-500 bg-purple-50 p-3 rounded">
                  <h4 className="font-semibold text-gray-800 mb-1">☑️ Multiple Answers (Checkboxes)</h4>
                  <p className="text-sm text-gray-700">Select all correct answers (shown when there are 2-3 correct options)</p>
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded">
                  <h4 className="font-semibold text-gray-800 mb-1">📄 All of the Above</h4>
                  <p className="text-sm text-gray-700">Appears when all options are correct (4+ correct answers)</p>
                </div>

                <div className="border-l-4 border-orange-500 bg-orange-50 p-3 rounded">
                  <h4 className="font-semibold text-gray-800 mb-1">⌨️ Type Your Answer</h4>
                  <p className="text-sm text-gray-700">Type the answer in your own words. Allows up to 15% spelling errors (85% similarity required)</p>
                </div>
              </div>
            </section>

            {/* Tips */}
            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                💡 Study Tips
              </h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Start with a small pool (20-30 questions) and increase gradually</li>
                  <li>✓ Practice both Multiple Choice and Type Your Answer modes</li>
                  <li>✓ Review incorrect answers carefully to learn the material</li>
                  <li>✓ Take multiple tests to cover all 128 questions</li>
                  <li>✓ Aim for 80%+ scores to ensure you're well-prepared</li>
                  <li>✓ The actual test is oral - practice saying answers out loud!</li>
                </ul>
              </div>
            </section>

            {/* Footer */}
            <div className="text-center pt-4 border-t">
              <p className="text-gray-600 text-sm">
                Good luck with your U.S. Citizenship Interview! 🇺🇸
              </p>
            </div>
          </div>

          {/* Close Button */}
          <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-2xl border-t">
            <button
              onClick={() => setShowHelp(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Setup Page
  if (currentPage === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              N-400 Naturalization Test Practice
            </h1>
            <p className="text-gray-600 text-lg">
              Practice for your U.S. Citizenship Interview - 2025
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Setup Your Practice Test
            </h2>

            {loading && (
              <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
                Loading questions...
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="mb-8">
              <label htmlFor="questionPool" className="block text-gray-700 font-medium mb-3">
                Number of Questions in Pool (1-{allQuestions.length})
              </label>
              <input
                id="questionPool"
                type="number"
                min="1"
                max={allQuestions.length}
                value={questionPool}
                onChange={(e) => setQuestionPool(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                disabled={loading}
              />
              <p className="text-gray-500 text-sm mt-2">
                Select how many questions you want in your quiz
              </p>
            </div>

            <div className="mb-8">
              <label htmlFor="questionsPerPage" className="block text-gray-700 font-medium mb-3">
                Questions Per Page
              </label>
              <input
                id="questionsPerPage"
                type="number"
                min="1"
                max="20"
                value={questionsPerPage}
                onChange={(e) => setQuestionsPerPage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                disabled={loading}
              />
              <p className="text-gray-500 text-sm mt-2">
                How many questions to display per page?
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-4">
                Select Practice Mode:
              </label>
              
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                  <input
                    type="radio"
                    name="practiceMode"
                    value="multiple-choice"
                    checked={practiceMode === 'multiple-choice'}
                    onChange={(e) => setPracticeMode(e.target.value as 'multiple-choice')}
                    className="mt-1 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 mb-1">Multiple Choice</div>
                    <div className="text-sm text-gray-600">
                      Choose from 4 answer options (A, B, C, D)
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                  <input
                    type="radio"
                    name="practiceMode"
                    value="type-answer"
                    checked={practiceMode === 'type-answer'}
                    onChange={(e) => setPracticeMode(e.target.value as 'type-answer')}
                    className="mt-1 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 mb-1">Type Your Answer</div>
                    <div className="text-sm text-gray-600">
                      Type the answer in your own words
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              disabled={loading || allQuestions.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Start Quiz'}
            </button>
          </div>

          <button 
            onClick={() => setShowHelp(true)}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all flex items-center justify-center"
            aria-label="Help"
          >
            <span className="text-xl">?</span>
          </button>
          
          <HelpDialog />
        </div>
      </div>
    );
  }

  // Quiz Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            N-400 Naturalization Test Practice
          </h1>
          <p className="text-gray-600 text-lg">
            Practice for your U.S. Citizenship Interview - 2025
          </p>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Practice Test</h2>
              <p className="text-gray-600">Answer all {quizQuestions.length} questions below</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRetryTest}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                title="Retry with same settings"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retry
              </button>
              <button
                onClick={handleNewTest}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                title="Start new test with different settings"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                New Test
              </button>
            </div>
          </div>

          {isSubmitted && (
            <>
              <div className="mt-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                Test submitted! Review the correct answers below each question.
              </div>
              
              {/* Score Display */}
              {(() => {
                const score = calculateScore();
                const isPassing = score.percentage >= 60; // 60% is passing for N-400 test
                
                return (
                  <div className={`mt-4 p-6 rounded-lg border-2 ${
                    isPassing 
                      ? 'bg-green-50 border-green-400' 
                      : 'bg-red-50 border-red-400'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-800">Your Score</h3>
                      <div className={`text-5xl font-bold ${
                        isPassing ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {score.percentage}%
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Correct Answers</div>
                        <div className="text-2xl font-bold text-green-600">
                          {score.correct} / {score.total}
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Wrong Answers</div>
                        <div className="text-2xl font-bold text-red-600">
                          {score.total - score.correct} / {score.total}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isPassing ? (
                        <>
                          <span className="text-3xl">🎉</span>
                          <span className="text-green-700 font-semibold">
                            Congratulations! You passed! (60% or higher required)
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-3xl">📚</span>
                          <span className="text-red-700 font-semibold">
                            Keep practicing! You need 60% or higher to pass.
                          </span>
                        </>
                      )}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            isPassing ? 'bg-green-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${score.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </div>

        {/* Pagination Info */}
        {(() => {
          const perPage = parseInt(questionsPerPage) || 5;
          const totalPages = Math.ceil(quizQuestions.length / perPage);
          const startIndex = (currentQuizPage - 1) * perPage;
          const endIndex = Math.min(startIndex + perPage, quizQuestions.length);
          const currentQuestions = quizQuestions.slice(startIndex, endIndex);

          return (
            <>
              {/* Page Info */}
              {totalPages > 1 && (
                <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-gray-700 text-sm sm:text-base">
                      Page {currentQuizPage} of {totalPages} • Questions {startIndex + 1}-{endIndex} of {quizQuestions.length}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentQuizPage(prev => Math.max(1, prev - 1))}
                        disabled={currentQuizPage === 1}
                        className="px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => setCurrentQuizPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentQuizPage === totalPages}
                        className="px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Questions */}
              <div className="space-y-6">
                {currentQuestions.map((q) => (
                  <div key={q.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Question {q.displayId}
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-800 mb-4">{q.question}</h3>

                    {/* Multiple Choice Mode */}
                    {practiceMode === 'multiple-choice' && (
                      <div className="space-y-3">
                        {/* Show instruction for multiple answers */}
                        {q.correctAnswers.length > 1 && q.correctAnswers.length < 4 && !isSubmitted && (
                          <div className="mb-2 text-sm text-blue-600 font-medium">
                            ✓ Select all that apply ({q.correctAnswers.length} correct answers)
                          </div>
                        )}
                        
                        {(() => {
                          // Check if all options are in correct answers (meaning all are correct)
                          const allOptionsCorrect = q.options.every(opt => 
                            q.correctAnswers.some(correct => 
                              opt.toLowerCase().trim() === correct.toLowerCase().trim()
                            )
                          );
                          
                          // Add "All of the above" if there are 4+ correct answers and all options are correct
                          const displayOptions = allOptionsCorrect && q.correctAnswers.length >= 4
                            ? [...q.options, "All of the above"]
                            : q.options;
                          
                          const isMultipleChoice = q.correctAnswers.length > 1 && q.correctAnswers.length < 4;
                          
                          return displayOptions.map((option, optIndex) => {
                            const isAllOfAbove = option === "All of the above";
                            const userAnswerArray = Array.isArray(userAnswers[q.id]) ? userAnswers[q.id] as string[] : [];
                            
                            // Check selection based on whether it's checkbox or radio
                            let isSelected = false;
                            if (isMultipleChoice) {
                              // Checkbox mode - check if in array
                              isSelected = userAnswerArray.includes(option);
                            } else {
                              // Radio mode - check direct equality (string comparison)
                              isSelected = userAnswers[q.id] === option;
                            }
                            
                            // Check if this option is a correct answer
                            const isCorrectOption = q.correctAnswers.some(correctAnswer => 
                              option.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
                            ) || (isAllOfAbove && allOptionsCorrect && q.correctAnswers.length >= 4);
                            
                            // Determine border color after submission
                            let borderColorClass = 'border-gray-200';
                            let bgColorClass = '';
                            
                            if (isSubmitted) {
                              if (isSelected) {
                                // User selected this option
                                if (isCorrectOption) {
                                  borderColorClass = 'border-green-500 border-2';
                                  bgColorClass = 'bg-green-50';
                                } else {
                                  borderColorClass = 'border-red-500 border-2';
                                  bgColorClass = 'bg-red-50';
                                }
                              } else {
                                // User didn't select this option
                                if (isCorrectOption) {
                                  // Show all correct answers (both for multiple choice and single answer)
                                  borderColorClass = 'border-green-300 border-2';
                                  bgColorClass = 'bg-green-50/50';
                                }
                              }
                            } else if (isSelected && !isSubmitted) {
                              borderColorClass = 'border-blue-400';
                              bgColorClass = 'bg-blue-50';
                            }
                            
                            return (
                              <label
                                key={optIndex}
                                className={`flex items-start gap-3 p-4 border rounded-lg transition-all ${borderColorClass} ${bgColorClass} ${
                                  isSubmitted ? 'cursor-default' : 'cursor-pointer hover:bg-gray-50'
                                }`}
                              >
                                {isMultipleChoice ? (
                                  // Checkbox for multiple answers (but not all)
                                  <input
                                    type="checkbox"
                                    name={`question-${q.id}`}
                                    value={option}
                                    checked={isSelected}
                                    onChange={() => !isSubmitted && handleAnswerSelect(q.id, option)}
                                    disabled={isSubmitted}
                                    className={`mt-1 w-4 h-4 rounded ${
                                      isSubmitted && isSelected
                                        ? isCorrectOption
                                          ? 'text-green-600 border-green-600'
                                          : 'text-red-600 border-red-600'
                                        : 'text-blue-600'
                                    }`}
                                  />
                                ) : (
                                  // Radio button for single answer or "all of the above" scenario
                                  <input
                                    type="radio"
                                    name={`question-${q.id}`}
                                    value={option}
                                    checked={isSelected}
                                    onChange={() => !isSubmitted && handleAnswerSelect(q.id, option)}
                                    disabled={isSubmitted}
                                    className={`mt-1 w-4 h-4 ${
                                      isSubmitted && isSelected
                                        ? isCorrectOption
                                          ? 'text-green-600 border-green-600'
                                          : 'text-red-600 border-red-600'
                                        : 'text-blue-600'
                                    }`}
                                  />
                                )}
                                <div className="flex-1">
                                  <span className="font-medium text-gray-700">
                                    {isAllOfAbove ? 'E' : String.fromCharCode(65 + optIndex)}.
                                  </span>{' '}
                                  <span className={`${
                                    isSubmitted && isSelected
                                      ? isCorrectOption
                                        ? 'text-green-800 font-medium'
                                        : 'text-red-800 font-medium'
                                      : 'text-gray-800'
                                  }`}>
                                    {option}
                                  </span>
                                  {/* Show checkmark or X for submitted answers */}
                                  {isSubmitted && isSelected && (
                                    <span className="ml-2">
                                      {isCorrectOption ? '✓' : '✗'}
                                    </span>
                                  )}
                                  {/* Show missed correct answers */}
                                  {isSubmitted && !isSelected && isCorrectOption && (
                                    <span className="ml-2 text-green-600 text-sm font-medium">(Correct answer)</span>
                                  )}
                                </div>
                              </label>
                            );
                          });
                        })()}
                      </div>
                    )}

                    {/* Type Your Answer Mode */}
                    {practiceMode === 'type-answer' && (
                      <div>
                        <input
                          type="text"
                          name={`question-${q.id}`}
                          value={userAnswers[q.id] || ''}
                          onChange={(e) => !isSubmitted && handleAnswerSelect(q.id, e.target.value)}
                          disabled={isSubmitted}
                          placeholder="Type your answer here..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                      </div>
                    )}

                    {isSubmitted && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="mb-2">
                          <span className="font-medium text-gray-700">Correct Answer{q.correctAnswers.length > 1 ? 's' : ''}:</span>
                        </div>
                        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-2">
                          {getCorrectAnswersDisplay(q)}
                        </div>
                        <div className={`${
                          isAnswerCorrect(q) ? 'text-green-600' : 'text-red-600'
                        } font-medium flex items-start gap-1`}>
                          <span>Your answer: </span>
                          <span className="flex-1">
                            {Array.isArray(userAnswers[q.id]) 
                              ? (userAnswers[q.id] as string[]).join(', ') || 'Not answered'
                              : userAnswers[q.id] || 'Not answered'
                            }
                          </span>
                          {isAnswerCorrect(q) ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-red-600">✗</span>
                          )}
                        </div>
                        
                        {/* Show similarity score for typed answers */}
                        {practiceMode === 'type-answer' && userAnswers[q.id] && typeof userAnswers[q.id] === 'string' && (
                          <div className="mt-2 text-sm text-gray-600">
                            {(() => {
                              const bestMatch = q.correctAnswers
                                .map(ans => ({
                                  answer: ans,
                                  similarity: calculateSimilarity(userAnswers[q.id] as string, ans)
                                }))
                                .sort((a, b) => b.similarity - a.similarity)[0];
                              
                              const percentage = Math.round(bestMatch.similarity * 100);
                              return `Match: ${percentage}% similar to "${bestMatch.answer}" (85% required)`;
                            })()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Pagination */}
              {totalPages > 1 && (
                <div className="bg-white rounded-xl shadow-md p-4 mt-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <button
                      onClick={() => setCurrentQuizPage(prev => Math.max(1, prev - 1))}
                      disabled={currentQuizPage === 1}
                      className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                    >
                      Previous
                    </button>
                    
                    {/* Scrollable page numbers */}
                    <div className="flex gap-2 overflow-x-auto max-w-full px-2 py-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentQuizPage(pageNum)}
                          className={`min-w-[40px] h-10 px-3 rounded-lg transition-all flex-shrink-0 ${
                            currentQuizPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentQuizPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentQuizPage === totalPages}
                      className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              {!isSubmitted && (
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                  <button
                    onClick={handleSubmitAnswers}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                  >
                    Submit Answers
                  </button>
                </div>
              )}
            </>
          );
        })()}

        <button 
          onClick={() => setShowHelp(true)}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all flex items-center justify-center"
          aria-label="Help"
        >
          <span className="text-xl">?</span>
        </button>
        
        <HelpDialog />
      </div>
    </div>
  );
};

export default NaturalizationTestPractice;