
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Zap, 
  Calendar, 
  Trophy, 
  Lock, 
  Unlock, 
  CheckCircle, 
  Play,
  RotateCcw,
  Award,
  Target,
  LogOut,
  User
} from 'lucide-react';

interface CyberDashboardProps {
  user: any;
  onLogout: () => void;
}

export function CyberDashboard({ user, onLogout }: CyberDashboardProps) {
  const [activeTab, setActiveTab] = useState('units');
  
  const units = [
    { id: 1, title: 'Introduction to Cyber Hygiene', status: 'unlocked', progress: 0 },
    { id: 2, title: 'Password Security & Management', status: 'unlocked', progress: 75 },
    { id: 3, title: 'Email Security & Phishing', status: 'unlocked', progress: 100 },
    { id: 4, title: 'Safe Web Browsing', status: 'unlocked', progress: 45 },
    { id: 5, title: 'Social Media Privacy', status: 'unlocked', progress: 0 },
    { id: 6, title: 'Mobile Device Security', status: 'locked', progress: 0 },
    { id: 7, title: 'Home Network Protection', status: 'locked', progress: 0 },
    { id: 8, title: 'Identity Theft Prevention', status: 'locked', progress: 0 },
    { id: 9, title: 'Backup & Recovery', status: 'locked', progress: 0 },
    { id: 10, title: 'Advanced Threat Awareness', status: 'locked', progress: 0 }
  ];

  const getStatusIcon = (status: string, progress: number) => {
    if (progress === 100) return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (status === 'unlocked') return <Unlock className="w-5 h-5 text-purple-400" />;
    return <Lock className="w-5 h-5 text-gray-500" />;
  };

  const getStatusButton = (status: string, progress: number) => {
    if (progress === 100) return { text: 'Review', variant: 'outline' as const };
    if (progress > 0) return { text: 'Resume', variant: 'default' as const };
    if (status === 'unlocked') return { text: 'Start', variant: 'default' as const };
    return { text: 'Locked', variant: 'ghost' as const, disabled: true };
  };

  const completedUnits = units.filter(unit => unit.progress === 100).length;
  const totalProgress = (completedUnits / units.length) * 100;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-purple-200/70 text-sm">
                  {user.skillLevel} Level • Continue your cybersecurity journey
                </p>
              </div>
            </div>
            
            <Button
              onClick={onLogout}
              variant="ghost"
              className="text-purple-300 hover:text-pink-300 hover:bg-purple-800/30"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 backdrop-blur-xl border border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200/70 text-sm">Total XP</p>
                  <p className="text-2xl font-bold text-white">{user.xp}</p>
                </div>
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200/70 text-sm">Learning Streak</p>
                  <p className="text-2xl font-bold text-white">{user.streak} days</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200/70 text-sm">Units Completed</p>
                  <p className="text-2xl font-bold text-white">{completedUnits}/10</p>
                </div>
                <Trophy className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200/70 text-sm">Overall Progress</p>
                  <p className="text-2xl font-bold text-white">{Math.round(totalProgress)}%</p>
                </div>
                <Target className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="bg-black/40 backdrop-blur-xl border border-purple-500/30 mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Course Progress</h3>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  {completedUnits} of 10 completed
                </Badge>
              </div>
              <Progress 
                value={totalProgress} 
                className="h-3 bg-purple-950/50"
              />
              <p className="text-purple-200/70 text-sm">
                Keep going! You're {Math.round(totalProgress)}% through the cybersecurity fundamentals course.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Units Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {units.map((unit) => {
                const buttonConfig = getStatusButton(unit.status, unit.progress);
                return (
                  <Card 
                    key={unit.id}
                    className="bg-black/40 backdrop-blur-xl border border-purple-500/30 hover:border-pink-400/50 transition-all duration-200"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(unit.status, unit.progress)}
                            <span className="text-purple-200/70 text-sm font-medium">
                              Unit {unit.id}
                            </span>
                          </div>
                          <CardTitle className="text-white text-lg leading-tight">
                            {unit.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {unit.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-purple-200/70">Progress</span>
                            <span className="text-purple-200">{unit.progress}%</span>
                          </div>
                          <Progress 
                            value={unit.progress} 
                            className="h-2 bg-purple-950/50"
                          />
                        </div>
                      )}
                      
                      <Button 
                        className={`w-full ${
                          buttonConfig.variant === 'default' 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                            : ''
                        }`}
                        variant={buttonConfig.variant}
                        disabled={buttonConfig.disabled}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {buttonConfig.text}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-black/40 backdrop-blur-xl border border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-purple-200 border-purple-500/30 hover:bg-purple-800/30">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Review Mistakes
                </Button>
                <Button variant="outline" className="w-full justify-start text-purple-200 border-purple-500/30 hover:bg-purple-800/30">
                  <Award className="w-4 h-4 mr-2" />
                  View Achievements
                </Button>
                <Button variant="outline" className="w-full justify-start text-purple-200 border-purple-500/30 hover:bg-purple-800/30">
                  <Target className="w-4 h-4 mr-2" />
                  Daily Challenge
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-black/40 backdrop-blur-xl border border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-white">Completed Unit 3</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                    +50 XP
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center space-x-2">
                    <Play className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-white">Started Unit 4</span>
                  </div>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    In Progress
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
