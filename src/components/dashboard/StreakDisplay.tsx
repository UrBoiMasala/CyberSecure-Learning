
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Flame } from 'lucide-react';

interface StreakDisplayProps {
  user: any;
}

export function StreakDisplay({ user }: StreakDisplayProps) {
  const streakDays = Array.from({ length: 7 }, (_, i) => {
    const isActive = i < user.streak;
    return {
      day: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][i],
      active: isActive
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span>Learning Streak</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-orange-500 mb-1">
            {user.streak}
          </div>
          <div className="text-sm text-gray-600">
            days in a row
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          {streakDays.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500 mb-1">{day.day}</div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                day.active 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {day.active ? '✓' : '○'}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-orange-50 rounded-lg text-center">
          <p className="text-sm text-orange-700">
            {user.streak >= 7 
              ? "🔥 Amazing! You're on fire!" 
              : `Keep going! ${7 - user.streak} more days for a week streak!`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
