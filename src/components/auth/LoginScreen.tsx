
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BookOpen, Star, Zap, Target } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (userData: any) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isReturningUser, setIsReturningUser] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ageNum = parseInt(age);
    const role = ageNum <= 13 ? 'Kid' : 'Adult';
    
    const userData = {
      id: Date.now().toString(),
      name,
      age: ageNum,
      role,
      xp: isReturningUser ? 250 : 0,
      level: isReturningUser ? 3 : 1,
      streak: isReturningUser ? 5 : 0,
      conceptMastery: {},
      lastActivity: new Date(),
      preferences: {
        theme: role === 'Kid' ? 'colorful' : 'professional',
        difficulty: 'adaptive',
        pace: 'normal'
      }
    };
    
    onLogin(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Learn & Grow
            </h1>
            <p className="text-xl text-gray-600 max-w-md mx-auto lg:mx-0">
              An adaptive learning platform that grows with you. Perfect for kids and adults!
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-sm font-medium">Earn Stars</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
              <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-sm font-medium">Gain XP</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
              <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-sm font-medium">Learn Topics</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
              <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-sm font-medium">Track Progress</div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome!</CardTitle>
            <CardDescription>
              Let's personalize your learning experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white/70"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Your Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  min="5"
                  max="99"
                  className="bg-white/70"
                />
              </div>

              <div className="space-y-3">
                <Label>Account Type</Label>
                <RadioGroup
                  value={isReturningUser ? 'returning' : 'new'}
                  onValueChange={(value) => setIsReturningUser(value === 'returning')}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new">New Learner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="returning" id="returning" />
                    <Label htmlFor="returning">Returning Learner</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={!name || !age}
              >
                Start Learning Journey
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
