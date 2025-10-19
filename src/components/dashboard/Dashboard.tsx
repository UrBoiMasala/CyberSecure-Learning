
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Star, Zap, Calendar, Trophy, Play, BookOpen, Target } from 'lucide-react';
import { XPBar } from './XPBar';
import { StreakDisplay } from './StreakDisplay';
import { RecommendedActions } from './RecommendedActions';
import { SubjectGrid } from './SubjectGrid';

interface DashboardProps {
  user: any;
  onStartExercise: (exercise: any) => void;
}

export function Dashboard({ user, onStartExercise }: DashboardProps) {
  const [timeOfDay, setTimeOfDay] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 17) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  const getGreeting = () => {
    const greetings = {
      morning: user.role === 'Kid' ? '🌅 Good morning' : 'Good morning',
      afternoon: user.role === 'Kid' ? '☀️ Good afternoon' : 'Good afternoon', 
      evening: user.role === 'Kid' ? '🌙 Good evening' : 'Good evening'
    };
    return greetings[timeOfDay as keyof typeof greetings] || 'Hello';
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            {getGreeting()}, {user.name}! {user.role === 'Kid' ? '🌟' : ''}
          </h1>
          <p className="text-lg text-gray-600">
            {user.role === 'Kid' 
              ? "Ready for another awesome learning adventure?" 
              : "Let's continue your learning journey"
            }
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Level</p>
                  <p className="text-2xl font-bold">{user.level}</p>
                </div>
                <Star className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total XP</p>
                  <p className="text-2xl font-bold">{user.xp}</p>
                </div>
                <Zap className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Streak</p>
                  <p className="text-2xl font-bold">{user.streak} days</p>
                </div>
                <Calendar className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Achievements</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* XP Progress */}
        <XPBar user={user} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recommended Actions */}
          <div className="lg:col-span-2 space-y-6">
            <RecommendedActions user={user} onStartExercise={onStartExercise} />
            <SubjectGrid user={user} onStartExercise={onStartExercise} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <StreakDisplay user={user} />
            
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Completed: Basic Math</span>
                  </div>
                  <Badge variant="secondary">+15 XP</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Started: Reading Practice</span>
                  </div>
                  <Badge variant="secondary">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Unlocked: New Badge</span>
                  </div>
                  <Badge variant="secondary">🏆</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Review Mistakes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Set Daily Goal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Trophy className="w-4 h-4 mr-2" />
                  View Achievements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
