
import { useState } from 'react';
import { Trophy, Medal, Award, Code, ArrowLeft, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  // Sample leaderboard data
  const [participants] = useState([
    {
      rank: 1,
      name: "Arjun Sharma",
      college: "MIT Institute of Technology",
      score: 48,
      totalQuestions: 50,
      timeTaken: "78:45",
      languages: ["Python", "JavaScript", "C++"]
    },
    {
      rank: 2,
      name: "Priya Patel",
      college: "Indian Institute of Science",
      score: 46,
      totalQuestions: 50,
      timeTaken: "82:30",
      languages: ["Java", "Python", "SQL"]
    },
    {
      rank: 3,
      name: "Rohit Kumar",
      college: "Delhi Technological University",
      score: 45,
      totalQuestions: 50,
      timeTaken: "75:15",
      languages: ["C++", "JavaScript", "Go"]
    },
    {
      rank: 4,
      name: "Sneha Reddy",
      college: "National Institute of Technology",
      score: 44,
      totalQuestions: 50,
      timeTaken: "80:20",
      languages: ["Python", "Java", "C#"]
    },
    {
      rank: 5,
      name: "Vikram Singh",
      college: "Indian Institute of Technology",
      score: 43,
      totalQuestions: 50,
      timeTaken: "85:10",
      languages: ["JavaScript", "Python", "Ruby"]
    },
    {
      rank: 6,
      name: "Anita Gupta",
      college: "Birla Institute of Technology",
      score: 42,
      totalQuestions: 50,
      timeTaken: "77:55",
      languages: ["Java", "C++", "Python"]
    },
    {
      rank: 7,
      name: "Rahul Joshi",
      college: "Vellore Institute of Technology",
      score: 41,
      totalQuestions: 50,
      timeTaken: "83:40",
      languages: ["Python", "JavaScript", "PHP"]
    },
    {
      rank: 8,
      name: "Kavya Nair",
      college: "Anna University",
      score: 40,
      totalQuestions: 50,
      timeTaken: "81:25",
      languages: ["C++", "Java", "Kotlin"]
    }
  ]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-300" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-slate-400">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-400/30";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-slate-400/20 border-gray-400/30";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/30";
      default:
        return "bg-black/30 border-white/10";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-blue-400" />
              <Code className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">CodeQuest</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Leaderboard
            </h1>
            <p className="text-slate-300 text-lg">CodeQuest 2025 Competition Results</p>
          </div>

          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {participants.slice(0, 3).map((participant) => (
              <Card key={participant.rank} className={`${getRankStyle(participant.rank)} backdrop-blur-lg relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-4">
                  {getRankIcon(participant.rank)}
                </div>
                <CardHeader className="text-center pb-2">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{participant.name}</CardTitle>
                  <p className="text-slate-300 text-sm">{participant.college}</p>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                    {participant.score}/{participant.totalQuestions}
                  </div>
                  <div className="text-slate-300 text-sm">
                    Time: {participant.timeTaken}
                  </div>
                  <div className="flex flex-wrap justify-center gap-1">
                    {participant.languages.slice(0, 2).map((lang) => (
                      <Badge key={lang} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                    {participant.languages.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{participant.languages.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card className="bg-black/30 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Full Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {participants.map((participant) => (
                  <div
                    key={participant.rank}
                    className={`${getRankStyle(participant.rank)} backdrop-blur-lg rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12">
                          {getRankIcon(participant.rank)}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">{participant.name}</h3>
                          <p className="text-slate-300 text-sm">{participant.college}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">
                            {participant.score}/{participant.totalQuestions}
                          </div>
                          <div className="text-slate-400 text-xs">Score</div>
                        </div>

                        <div className="text-center">
                          <div className="text-lg font-semibold text-white">
                            {participant.timeTaken}
                          </div>
                          <div className="text-slate-400 text-xs">Time</div>
                        </div>

                        <div className="text-center">
                          <div className="text-lg font-semibold text-white">
                            {Math.round((participant.score / participant.totalQuestions) * 100)}%
                          </div>
                          <div className="text-slate-400 text-xs">Accuracy</div>
                        </div>

                        <div className="hidden md:flex flex-wrap gap-1 max-w-32">
                          {participant.languages.slice(0, 3).map((lang) => (
                            <Badge key={lang} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Competition Stats */}
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <Card className="bg-black/30 backdrop-blur-lg border-white/10 text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-400">{participants.length}</div>
                <div className="text-slate-300">Total Participants</div>
              </CardContent>
            </Card>
            <Card className="bg-black/30 backdrop-blur-lg border-white/10 text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-400">50</div>
                <div className="text-slate-300">Total Questions</div>
              </CardContent>
            </Card>
            <Card className="bg-black/30 backdrop-blur-lg border-white/10 text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-400">
                  {Math.round(participants.reduce((acc, p) => acc + (p.score / p.totalQuestions), 0) / participants.length * 100)}%
                </div>
                <div className="text-slate-300">Average Score</div>
              </CardContent>
            </Card>
            <Card className="bg-black/30 backdrop-blur-lg border-white/10 text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-yellow-400">90</div>
                <div className="text-slate-300">Minutes Duration</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
