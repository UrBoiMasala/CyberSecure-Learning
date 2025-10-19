
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Settings
} from 'lucide-react';

interface EnhancedCyberDashboardProps {
  user: any;
  onLogout: () => void;
  onSkillLevelChange: (newSkillLevel: string) => void;
  onStartUnit: (unitId: number, unitTitle: string) => void;
}

export function EnhancedCyberDashboard({ user, onLogout, onSkillLevelChange, onStartUnit }: EnhancedCyberDashboardProps) {
  const [currentSkillLevel, setCurrentSkillLevel] = useState(user.skillLevel);
  
  // Calculate progress for each unit based on user data
  const getUnitProgress = (unitId: number) => {
    const unitKey = `unit_${unitId}`;
    const userProgress = user.progress?.[unitKey];
    if (!userProgress) return 0;
    
    const completed = userProgress.completedQuestions || 0;
    const total = userProgress.totalQuestions || 42;
    return Math.round((completed / total) * 100);
  };

  // Different curriculum based on skill level
  const getCurriculumBySkillLevel = (skillLevel: string | undefined) => {
    const normalizedSkillLevel = skillLevel || 'Student';
    
    const baseCurriculums = {
      Student: [
        { id: 1, title: 'What is Cybersecurity?', status: 'unlocked' },
        { id: 2, title: 'Creating Strong Passwords', status: 'unlocked' },
        { id: 3, title: 'Recognizing Suspicious Emails', status: 'unlocked' },
        { id: 4, title: 'Safe Internet Browsing', status: 'unlocked' },
        { id: 5, title: 'Social Media Safety', status: 'unlocked' },
        { id: 6, title: 'Mobile Device Security', status: 'locked' },
        { id: 7, title: 'Public WiFi Safety', status: 'locked' },
        { id: 8, title: 'Digital Footprints', status: 'locked' },
        { id: 9, title: 'Reporting Cyber Issues', status: 'locked' },
        { id: 10, title: 'Cyber Safety Review', status: 'locked' }
      ],
      Adult: [
        { id: 1, title: 'Personal Cybersecurity Basics', status: 'unlocked' },
        { id: 2, title: 'Advanced Password Management', status: 'unlocked' },
        { id: 3, title: 'Email Security & Phishing', status: 'unlocked' },
        { id: 4, title: 'Identity Theft Prevention', status: 'unlocked' },
        { id: 5, title: 'Financial Security Online', status: 'unlocked' },
        { id: 6, title: 'Home Network Protection', status: 'locked' },
        { id: 7, title: 'Privacy Controls & Settings', status: 'locked' },
        { id: 8, title: 'Backup & Recovery Planning', status: 'locked' },
        { id: 9, title: 'Family Cybersecurity', status: 'locked' },
        { id: 10, title: 'Advanced Threat Awareness', status: 'locked' }
      ],
      Professional: [
        { id: 1, title: 'Enterprise Security Fundamentals', status: 'unlocked' },
        { id: 2, title: 'Network Security Architecture', status: 'unlocked' },
        { id: 3, title: 'Incident Response Planning', status: 'unlocked' },
        { id: 4, title: 'Risk Assessment & Management', status: 'unlocked' },
        { id: 5, title: 'Compliance & Regulations', status: 'unlocked' },
        { id: 6, title: 'Advanced Threat Detection', status: 'locked' },
        { id: 7, title: 'Security Operations Center', status: 'locked' },
        { id: 8, title: 'Digital Forensics Basics', status: 'locked' },
        { id: 9, title: 'Security Awareness Training', status: 'locked' },
        { id: 10, title: 'Cybersecurity Leadership', status: 'locked' }
      ]
    };
    const baseCurriculum = baseCurriculums[normalizedSkillLevel as keyof typeof baseCurriculums] || baseCurriculums.Student;
    // Add dynamic progress to each unit
    return baseCurriculum.map(unit => ({
      ...unit,
      progress: getUnitProgress(unit.id)
    }));
  };

  const units = getCurriculumBySkillLevel(currentSkillLevel);

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

  const handleSkillLevelChange = (newLevel: string) => {
    setCurrentSkillLevel(newLevel);
    onSkillLevelChange(newLevel);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-educational-blue to-educational-purple rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-educational-blue to-educational-purple bg-clip-text text-transparent">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-muted-foreground text-sm">
                  {currentSkillLevel} Level • Continue your cybersecurity journey
                </p>
              </div>
            </div>
            
            <Button
              onClick={onLogout}
              variant="ghost"
              className="text-foreground hover:text-educational-blue hover:bg-secondary"
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
          <Card className="bg-white/80 backdrop-blur-sm border border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total XP</p>
                  <p className="text-2xl font-bold text-foreground">{user.xp}</p>
                </div>
                <Zap className="w-8 h-8 text-educational-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Learning Streak</p>
                  <p className="text-2xl font-bold text-foreground">{user.streak} days</p>
                </div>
                <Calendar className="w-8 h-8 text-educational-green" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Units Completed</p>
                  <p className="text-2xl font-bold text-foreground">{completedUnits}/10</p>
                </div>
                <Trophy className="w-8 h-8 text-educational-purple" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Overall Progress</p>
                  <p className="text-2xl font-bold text-foreground">{Math.round(totalProgress)}%</p>
                </div>
                <Target className="w-8 h-8 text-educational-teal" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="bg-white/80 backdrop-blur-sm border border-border shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-foreground">Course Progress</h3>
                <Badge className="bg-gradient-to-r from-educational-blue to-educational-purple text-white">
                  {completedUnits} of 10 completed
                </Badge>
              </div>
              <Progress 
                value={totalProgress} 
                className="h-3"
              />
              <p className="text-muted-foreground text-sm">
                Keep going! You're {Math.round(totalProgress)}% through the {currentSkillLevel.toLowerCase()} cybersecurity course.
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
                    className="bg-white/80 backdrop-blur-sm border border-border hover:border-educational-blue/50 transition-all duration-200 shadow-sm"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(unit.status, unit.progress)}
                            <span className="text-muted-foreground text-sm font-medium">
                              Unit {unit.id}
                            </span>
                          </div>
                          <CardTitle className="text-foreground text-lg leading-tight">
                            {unit.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {unit.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-foreground">{unit.progress}%</span>
                          </div>
                          <Progress 
                            value={unit.progress} 
                            className="h-2"
                          />
                        </div>
                      )}
                      
                      <Button 
                        className={`w-full ${
                          buttonConfig.variant === 'default' 
                            ? 'bg-gradient-to-r from-educational-blue to-educational-purple hover:opacity-90' 
                            : ''
                        }`}
                        variant={buttonConfig.variant}
                        disabled={buttonConfig.disabled}
                        onClick={() => !buttonConfig.disabled && onStartUnit(unit.id, unit.title)}
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
            {/* Skill Level Selector */}
            <Card className="bg-white/80 backdrop-blur-sm border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground text-lg flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Skill Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={currentSkillLevel} onValueChange={handleSkillLevelChange}>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Adult">Adult</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-muted-foreground text-xs mt-2">
                  Change your skill level to access different curriculum
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Review Mistakes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  View Achievements
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Daily Challenge
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-educational-green/10 rounded-lg border border-educational-green/30">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-educational-green" />
                    <span className="text-sm text-foreground">Completed Unit 1</span>
                  </div>
                  <Badge className="bg-educational-green/20 text-educational-green">
                    +50 XP
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-educational-blue/10 rounded-lg border border-educational-blue/30">
                  <div className="flex items-center space-x-2">
                    <Play className="w-4 h-4 text-educational-blue" />
                    <span className="text-sm text-foreground">Started Unit 2</span>
                  </div>
                  <Badge className="bg-educational-blue/20 text-educational-blue">
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
