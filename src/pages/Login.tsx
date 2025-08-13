
import { useState } from 'react';
import { Code, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (formData.email === 'admin@codequest.com' && formData.password === 'admin123') {
      toast({
        title: "Login Successful!",
        description: "Welcome to the admin panel",
      });
      navigate('/admin');
    } else if (formData.email && formData.password) {
      toast({
        title: "Login Successful!",
        description: "Welcome to CodeQuest 2025",
      });
      navigate('/quiz');
    } else {
      toast({
        title: "Error",
        description: "Please enter valid credentials",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
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

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Welcome Back</h1>
            <p className="text-slate-300">Login to access your CodeQuest account</p>
          </div>

          <Card className="bg-black/30 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white pr-10"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3"
                >
                  Login
                </Button>

                <div className="text-center">
                  <span className="text-slate-300">Don't have an account? </span>
                  <Link to="/register" className="text-blue-400 hover:text-blue-300">
                    Register here
                  </Link>
                </div>

                
                <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4 mt-6">
                  <p className="text-slate-300 text-sm mb-2">Demo Credentials:</p>
                  <p className="text-slate-300 text-xs">Participant: any email + any password</p>
                  <p className="text-slate-300 text-xs">Admin: admin@codequest.com / admin123</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
