
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap, Star } from 'lucide-react';

interface XPBarProps {
  user: any;
}

export function XPBar({ user }: XPBarProps) {
  const currentLevelXP = (user.level - 1) * 100;
  const nextLevelXP = user.level * 100;
  const progressInLevel = user.xp - currentLevelXP;
  const xpNeeded = nextLevelXP - user.xp;
  const progressPercentage = (progressInLevel / 100) * 100;

  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Star className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-bold">Level {user.level}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-lg">{user.xp} XP</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm opacity-90">
            <span>Progress to Level {user.level + 1}</span>
            <span>{xpNeeded} XP to go</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-3 bg-white/20"
          />
          <div className="flex justify-between text-xs opacity-75">
            <span>{currentLevelXP} XP</span>
            <span>{nextLevelXP} XP</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
