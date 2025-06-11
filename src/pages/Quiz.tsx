
import { useState, useEffect } from 'react';
import { Clock, Code, CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Quiz = () => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Sample quiz questions
  const questions = [
    {
      id: 1,
      question: "What is the time complexity of accessing an element in an array by index?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correct: "O(1)"
    },
    {
      id: 2,
      question: "Which of the following is NOT a primitive data type in JavaScript?",
      options: ["string", "number", "array", "boolean"],
      correct: "array"
    },
    {
      id: 3,
      question: "In Python, which method is used to add an element at the end of a list?",
      options: ["add()", "append()", "insert()", "push()"],
      correct: "append()"
    },
    {
      id: 4,
      question: "What does SQL stand for?",
      options: ["Structured Query Language", "Sequential Query Language", "Standard Query Language", "Simple Query Language"],
      correct: "Structured Query Language"
    },
    {
      id: 5,
      question: "Which sorting algorithm has the best average-case time complexity?",
      options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
      correct: "Merge Sort"
    }
  ];

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quizStarted, quizCompleted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const score = questions.reduce((acc, question, index) => {
      return acc + (selectedAnswers[index] === question.correct ? 1 : 0);
    }, 0);

    setQuizCompleted(true);
    toast({
      title: "Quiz Completed!",
      description: `You scored ${score} out of ${questions.length}`,
    });
  };

  const startQuiz = () => {
    setQuizStarted(true);
    toast({
      title: "Quiz Started!",
      description: "Good luck! You have 90 minutes to complete the quiz.",
    });
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <Code className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold text-white">CodeQuest</span>
              </Link>
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4">
          <Card className="bg-black/30 backdrop-blur-lg border-white/10 max-w-2xl w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-3xl mb-4">CodeQuest 2024 Quiz</CardTitle>
              <p className="text-slate-300">Welcome to the coding quiz competition!</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-slate-300">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span>Duration: 90 minutes</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Total Questions: {questions.length}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <span>No negative marking</span>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-lg p-4">
                <h3 className="text-yellow-400 font-semibold mb-2">Instructions:</h3>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Read each question carefully before selecting an answer</li>
                  <li>• You can navigate between questions using the navigation buttons</li>
                  <li>• Make sure to submit your quiz before time runs out</li>
                  <li>• Once submitted, you cannot change your answers</li>
                </ul>
              </div>

              <Button 
                onClick={startQuiz}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 text-lg"
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const score = questions.reduce((acc, question, index) => {
      return acc + (selectedAnswers[index] === question.correct ? 1 : 0);
    }, 0);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <Code className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold text-white">CodeQuest</span>
              </Link>
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4">
          <Card className="bg-black/30 backdrop-blur-lg border-white/10 max-w-2xl w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-3xl mb-4">Quiz Completed!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                {score}/{questions.length}
              </div>
              <p className="text-slate-300 text-lg">
                You scored {Math.round((score / questions.length) * 100)}%
              </p>
              <div className="space-y-4">
                <Link to="/leaderboard">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    View Leaderboard
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Quiz Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Code className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">CodeQuest Quiz</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-400" />
              <span className="text-white font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
            <div className="text-white">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <Progress 
              value={((currentQuestion + 1) / questions.length) * 100} 
              className="h-2 bg-white/10"
            />
          </div>

          {/* Question Card */}
          <Card className="bg-black/30 backdrop-blur-lg border-white/10 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-xl">
                Question {currentQuestion + 1}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-slate-300 text-lg leading-relaxed">
                  {questions[currentQuestion].question}
                </p>

                <RadioGroup 
                  value={selectedAnswers[currentQuestion] || ''} 
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="text-white cursor-pointer flex-1">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-4">
              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={handleSubmitQuiz}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Question Navigation */}
          <div className="mt-8">
            <Card className="bg-black/30 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Question Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, index) => (
                    <Button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      variant={currentQuestion === index ? "default" : "outline"}
                      className={`
                        ${currentQuestion === index 
                          ? "bg-gradient-to-r from-blue-500 to-purple-600" 
                          : "border-white/20 text-white hover:bg-white/10"
                        }
                        ${selectedAnswers[index] ? "ring-2 ring-green-400" : ""}
                      `}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
                    <span className="text-slate-300">Current</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-green-400 rounded"></div>
                    <span className="text-slate-300">Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-white/20 rounded"></div>
                    <span className="text-slate-300">Not Answered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
