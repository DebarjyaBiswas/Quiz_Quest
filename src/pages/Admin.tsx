
import { useState } from 'react';
import { Plus, Edit, Trash2, Users, FileText, BarChart3, Code, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is the time complexity of accessing an element in an array by index?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correct: "O(1)",
      difficulty: "Easy",
      category: "Data Structures"
    },
    {
      id: 2,
      question: "Which of the following is NOT a primitive data type in JavaScript?",
      options: ["string", "number", "array", "boolean"],
      correct: "array",
      difficulty: "Medium",
      category: "JavaScript"
    }
  ]);

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correct: '',
    difficulty: '',
    category: ''
  });

  const [participants] = useState([
    { id: 1, name: "Arjun Sharma", email: "arjun@email.com", college: "MIT", registered: "2024-03-01" },
    { id: 2, name: "Priya Patel", email: "priya@email.com", college: "IISc", registered: "2024-03-02" },
    { id: 3, name: "Rohit Kumar", email: "rohit@email.com", college: "DTU", registered: "2024-03-03" }
  ]);

  const handleAddQuestion = () => {
    if (!newQuestion.question || !newQuestion.correct || newQuestion.options.some(opt => !opt)) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    const question = {
      ...newQuestion,
      id: questions.length + 1
    };

    setQuestions([...questions, question]);
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      correct: '',
      difficulty: '',
      category: ''
    });

    toast({
      title: "Success",
      description: "Question added successfully",
    });
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast({
      title: "Success",
      description: "Question deleted successfully",
    });
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Admin Header */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">CodeQuest Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                Admin Panel
              </Badge>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-black/30 backdrop-blur-lg border border-white/10">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-500/20">
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="questions" className="data-[state=active]:bg-blue-500/20">
                <FileText className="h-4 w-4 mr-2" />
                Questions
              </TabsTrigger>
              <TabsTrigger value="participants" className="data-[state=active]:bg-blue-500/20">
                <Users className="h-4 w-4 mr-2" />
                Participants
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-blue-500/20">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-black/30 backdrop-blur-lg border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-400">{questions.length}</div>
                        <div className="text-slate-300 text-sm">Total Questions</div>
                      </div>
                      <FileText className="h-8 w-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 backdrop-blur-lg border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-green-400">{participants.length}</div>
                        <div className="text-slate-300 text-sm">Registered Users</div>
                      </div>
                      <Users className="h-8 w-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 backdrop-blur-lg border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-purple-400">0</div>
                        <div className="text-slate-300 text-sm">Active Quizzes</div>
                      </div>
                      <BarChart3 className="h-8 w-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 backdrop-blur-lg border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-yellow-400">7</div>
                        <div className="text-slate-300 text-sm">Days to Event</div>
                      </div>
                      <Settings className="h-8 w-8 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-black/30 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Registrations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {participants.slice(0, 5).map((participant) => (
                        <div key={participant.id} className="flex items-center justify-between py-2">
                          <div>
                            <div className="text-white font-medium">{participant.name}</div>
                            <div className="text-slate-400 text-sm">{participant.college}</div>
                          </div>
                          <div className="text-slate-400 text-sm">{participant.registered}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Question Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Data Structures</span>
                        <Badge variant="secondary">{questions.filter(q => q.category === 'Data Structures').length}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">JavaScript</span>
                        <Badge variant="secondary">{questions.filter(q => q.category === 'JavaScript').length}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Algorithms</span>
                        <Badge variant="secondary">{questions.filter(q => q.category === 'Algorithms').length}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Questions Tab */}
            <TabsContent value="questions" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Question Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black/90 backdrop-blur-lg border-white/10 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Question</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="question">Question</Label>
                        <Textarea
                          id="question"
                          value={newQuestion.question}
                          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                          className="bg-white/10 border-white/20 text-white"
                          placeholder="Enter the question"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {newQuestion.options.map((option, index) => (
                          <div key={index}>
                            <Label htmlFor={`option-${index}`}>Option {index + 1}</Label>
                            <Input
                              id={`option-${index}`}
                              value={option}
                              onChange={(e) => updateOption(index, e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                              placeholder={`Enter option ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Correct Answer</Label>
                          <Select onValueChange={(value) => setNewQuestion({ ...newQuestion, correct: value })}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select correct answer" />
                            </SelectTrigger>
                            <SelectContent>
                              {newQuestion.options.map((option, index) => (
                                option && (
                                  <SelectItem key={index} value={option}>
                                    {option}
                                  </SelectItem>
                                )
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Difficulty</Label>
                          <Select onValueChange={(value) => setNewQuestion({ ...newQuestion, difficulty: value })}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Easy">Easy</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Category</Label>
                          <Select onValueChange={(value) => setNewQuestion({ ...newQuestion, category: value })}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Data Structures">Data Structures</SelectItem>
                              <SelectItem value="Algorithms">Algorithms</SelectItem>
                              <SelectItem value="JavaScript">JavaScript</SelectItem>
                              <SelectItem value="Python">Python</SelectItem>
                              <SelectItem value="Java">Java</SelectItem>
                              <SelectItem value="C++">C++</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button onClick={handleAddQuestion} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        Add Question
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card className="bg-black/30 backdrop-blur-lg border-white/10">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {questions.map((question) => (
                      <div key={question.id} className="bg-white/5 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-white font-medium mb-2">{question.question}</h3>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              {question.options.map((option, index) => (
                                <div
                                  key={index}
                                  className={`text-sm p-2 rounded ${
                                    option === question.correct
                                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                      : 'bg-white/5 text-slate-300'
                                  }`}
                                >
                                  {option}
                                </div>
                              ))}
                            </div>
                            <div className="flex space-x-2">
                              <Badge variant="secondary">{question.difficulty}</Badge>
                              <Badge variant="outline" className="border-white/20 text-white">
                                {question.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleDeleteQuestion(question.id)}
                              className="border-red-400/20 text-red-400 hover:bg-red-500/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Participants Tab */}
            <TabsContent value="participants" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Participant Management</h2>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Export Data
                </Button>
              </div>

              <Card className="bg-black/30 backdrop-blur-lg border-white/10">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">{participant.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{participant.name}</h3>
                            <p className="text-slate-400 text-sm">{participant.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <div className="text-white">{participant.college}</div>
                            <div className="text-slate-400 text-sm">Registered: {participant.registered}</div>
                          </div>
                          <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                            Registered
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Quiz Settings</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-black/30 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Quiz Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="duration">Quiz Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        defaultValue="90"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="questions-count">Number of Questions</Label>
                      <Input
                        id="questions-count"
                        type="number"
                        defaultValue="50"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="start-date">Quiz Start Date</Label>
                      <Input
                        id="start-date"
                        type="datetime-local"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      Save Settings
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Competition Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="competition-name">Competition Name</Label>
                      <Input
                        id="competition-name"
                        defaultValue="CodeQuest 2024"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="prize-pool">Prize Pool</Label>
                      <Input
                        id="prize-pool"
                        defaultValue="₹10,000"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        defaultValue="The ultimate coding quiz competition for college students"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      Update Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
