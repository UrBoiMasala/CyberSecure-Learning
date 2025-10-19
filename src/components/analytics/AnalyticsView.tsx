
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Target, Brain, Clock, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsViewProps {
  user: any;
}

export function AnalyticsView({ user }: AnalyticsViewProps) {
  // Mock analytics data
  const conceptMastery = [
    { concept: 'Addition', mastery: 85, attempts: 45, lastPracticed: '2 days ago' },
    { concept: 'Subtraction', mastery: 92, attempts: 38, lastPracticed: '1 day ago' },
    { concept: 'Multiplication', mastery: 76, attempts: 52, lastPracticed: '3 hours ago' },
    { concept: 'Division', mastery: 68, attempts: 29, lastPracticed: '1 week ago' },
    { concept: 'Fractions', mastery: 54, attempts: 23, lastPracticed: '4 days ago' },
    { concept: 'Decimals', mastery: 71, attempts: 31, lastPracticed: '2 days ago' }
  ];

  const weeklyProgress = [
    { day: 'Mon', xp: 45, exercises: 3 },
    { day: 'Tue', xp: 62, exercises: 4 },
    { day: 'Wed', xp: 58, exercises: 4 },
    { day: 'Thu', xp: 71, exercises: 5 },
    { day: 'Fri', xp: 85, exercises: 6 },
    { day: 'Sat', xp: 93, exercises: 7 },
    { day: 'Sun', xp: 67, exercises: 4 }
  ];

  const subjectDistribution = [
    { name: 'Math', value: 40, color: '#8884d8' },
    { name: 'Language Arts', value: 30, color: '#82ca9d' },
    { name: 'Science', value: 20, color: '#ffc658' },
    { name: 'Other', value: 10, color: '#ff7300' }
  ];

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'text-green-600 bg-green-100';
    if (mastery >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskLevel = (mastery: number, lastPracticed: string) => {
    if (mastery < 60) return { level: 'High Risk', color: 'bg-red-500' };
    if (lastPracticed.includes('week')) return { level: 'Needs Review', color: 'bg-yellow-500' };
    return { level: 'On Track', color: 'bg-green-500' };
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Analytics</h1>
          <p className="text-lg text-gray-600">
            Detailed insights into {user.name}'s learning journey
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Study Time</p>
                  <p className="text-2xl font-bold">24.5h</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Concepts Mastered</p>
                  <p className="text-2xl font-bold">12/18</p>
                </div>
                <Brain className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold">78%</p>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Achievements</p>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Weekly Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="xp" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subject Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Subject Focus</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subjectDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subjectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Concept Mastery Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Concept Mastery Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conceptMastery.map((concept, index) => {
                const risk = getRiskLevel(concept.mastery, concept.lastPracticed);
                return (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold">{concept.concept}</h3>
                        <Badge className={`${risk.color} text-white text-xs`}>
                          {risk.level}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium px-2 py-1 rounded ${getMasteryColor(concept.mastery)}`}>
                          {concept.mastery}% Mastery
                        </div>
                      </div>
                    </div>
                    
                    <Progress value={concept.mastery} className="h-2 mb-2" />
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{concept.attempts} attempts</span>
                      <span>Last practiced: {concept.lastPracticed}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Priority: Review Division</h4>
                <p className="text-sm text-red-700">
                  Concept mastery is below 70%. Recommend focused practice sessions.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Suggestion: Practice Fractions</h4>
                <p className="text-sm text-yellow-700">
                  Haven't practiced in 4 days. Schedule a refresher session to maintain progress.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Strength: Subtraction Skills</h4>
                <p className="text-sm text-green-700">
                  Excellent mastery! Consider moving to more advanced subtraction topics.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
