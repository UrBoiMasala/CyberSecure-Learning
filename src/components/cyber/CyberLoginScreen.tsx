
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';

interface CyberLoginScreenProps {
  onLogin: (userData: any) => void;
}

export function CyberLoginScreen({ onLogin }: CyberLoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      xp: 0,
      level: 1,
      streak: 0,
      totalUnits: 10,
      completedUnits: 0,
      lastActivity: new Date(),
    };
    
    onLogin(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-2">
            CyberSecure Learning
          </h1>
          <p className="text-purple-200/70 text-sm">
            Master cybersecurity skills in a safe environment
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-black/40 backdrop-blur-xl border border-purple-500/30 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-purple-200/70">
              Sign in to continue your cybersecurity journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-purple-200 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-purple-950/50 border-purple-500/30 text-white placeholder:text-purple-300/50 focus:border-pink-400 focus:ring-pink-400/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-purple-200 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-purple-950/50 border-purple-500/30 text-white placeholder:text-purple-300/50 focus:border-pink-400 focus:ring-pink-400/20 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-purple-300 hover:text-pink-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={!email || !password}
              >
                <Lock className="w-4 h-4 mr-2" />
                Sign In
              </Button>

              <div className="space-y-3 pt-4 border-t border-purple-500/20">
                <Button 
                  type="button"
                  variant="ghost" 
                  className="w-full text-purple-300 hover:text-pink-300 hover:bg-purple-800/30"
                >
                  Create New Account
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  className="w-full text-purple-300 hover:text-pink-300 hover:bg-purple-800/30 text-sm"
                >
                  Forgot Password?
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
