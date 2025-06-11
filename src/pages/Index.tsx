
import { useState, useEffect } from 'react'
import { Calendar, Clock, Trophy, Users, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Competition date - set to 7 days from now for demo
  const competitionDate = new Date();
  competitionDate.setDate(competitionDate.getDate() + 7);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = competitionDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Code,
      title: "Coding MCQs",
      description: "Multiple choice questions covering various programming languages and concepts"
    },
    {
      icon: Clock,
      title: "Timed Challenge",
      description: "90-minute competition to test your coding knowledge under pressure"
    },
    {
      icon: Trophy,
      title: "Prizes & Recognition",
      description: "Win exciting prizes and get recognition for your programming skills"
    },
    {
      icon: Users,
      title: "College Competition",
      description: "Compete with fellow students from across different colleges"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-blue-400" />
              
              <span className="text-xl font-bold text-white">CodeQuest</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/register">
                <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CodeQuest 2024
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            The ultimate coding quiz competition for college students. Test your programming knowledge and compete for glory!
          </p>

          {/* Countdown Timer */}
          <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-6">Competition Starts In:</h2>
            <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl md:text-4xl font-bold py-4 rounded-lg">
                  {timeLeft.days}
                </div>
                <div className="text-slate-300 mt-2">Days</div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl md:text-4xl font-bold py-4 rounded-lg">
                  {timeLeft.hours}
                </div>
                <div className="text-slate-300 mt-2">Hours</div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl md:text-4xl font-bold py-4 rounded-lg">
                  {timeLeft.minutes}
                </div>
                <div className="text-slate-300 mt-2">Minutes</div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl md:text-4xl font-bold py-4 rounded-lg">
                  {timeLeft.seconds}
                </div>
                <div className="text-slate-300 mt-2">Seconds</div>
              </div>
            </div>
          </div>

          <Link to="/register">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4">
              Register Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why Join CodeQuest?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-black/30 backdrop-blur-lg border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <feature.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competition Details */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Competition Details</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Date & Time</h3>
              <p className="text-slate-300">March 15, 2024<br />2:00 PM - 3:30 PM</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <Clock className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Duration</h3>
              <p className="text-slate-300">90 Minutes<br />50 MCQ Questions</p>
            </div>
            <div className="bg-gradient-to-br from-pink-500/20 to-red-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <Trophy className="h-12 w-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Prizes</h3>
              <p className="text-slate-300">₹10,000 Prize Pool<br />Certificates & Goodies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-bold text-white">CodeQuest 2024</span>
          </div>
          <p className="text-slate-400">© 2024 CodeQuest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
