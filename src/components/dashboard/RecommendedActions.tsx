
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, Lightbulb, Clock } from 'lucide-react';

interface RecommendedActionsProps {
  user: any;
  onStartExercise: (exercise: any) => void;
}

export function RecommendedActions({ user, onStartExercise }: RecommendedActionsProps) {
  const recommendations = [
    {
      id: 'resume',
      title: 'Continue Reading Practice',
      description: 'You were 75% through this exercise',
      icon: Play,
      priority: 'high',
      badge: 'Resume',
      badgeColor: 'bg-green-500',
      exercise: {
        id: 'reading-1',
        title: 'Reading Comprehension',
        subject: 'Language Arts',
        difficulty: 'medium',
        progress: 75
      }
    },
    {
      id: 'retry',
      title: 'Retry Multiplication Tables',
      description: 'Practice makes perfect! Try the 7x table again',
      icon: RotateCcw,
      priority: 'medium',
      badge: 'Retry',
      badgeColor: 'bg-orange-500',
      exercise: {
        id: 'math-1',
        title: 'Multiplication Tables',
        subject: 'Math',
        difficulty: 'easy',
        progress: 0
      }
    },
    {
      id: 'new',
      title: 'Explore Fractions',
      description: 'Based on your progress, you\'re ready for fractions',
      icon: Lightbulb,
      priority: 'low',
      badge: 'New',
      badgeColor: 'bg-blue-500',
      exercise: {
        id: 'math-2',
        title: 'Introduction to Fractions',
        subject: 'Math',
        difficulty: 'medium',
        progress: 0
      }
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <span>Recommended for You</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                rec.priority === 'high' ? 'bg-green-100' :
                rec.priority === 'medium' ? 'bg-orange-100' : 'bg-blue-100'
              }`}>
                <rec.icon className={`w-5 h-5 ${
                  rec.priority === 'high' ? 'text-green-600' :
                  rec.priority === 'medium' ? 'text-orange-600' : 'text-blue-600'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-gray-900">{rec.title}</h3>
                  <Badge className={`${rec.badgeColor} text-white text-xs`}>
                    {rec.badge}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{rec.description}</p>
                {rec.exercise.progress > 0 && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {rec.exercise.progress}% complete
                    </span>
                  </div>
                )}
              </div>
            </div>
            <Button 
              onClick={() => onStartExercise(rec.exercise)}
              variant={rec.priority === 'high' ? 'default' : 'outline'}
              size="sm"
            >
              {rec.badge === 'Resume' ? 'Continue' : 'Start'}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
