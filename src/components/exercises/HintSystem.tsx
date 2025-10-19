
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, AlertCircle, BookOpen } from 'lucide-react';

interface HintSystemProps {
  hint: string;
  attempts: number;
  userRole: string;
}

export function HintSystem({ hint, attempts, userRole }: HintSystemProps) {
  const getHintType = () => {
    if (attempts === 2) return 'hint';
    if (attempts >= 3) return 'scaffolding';
    return 'encouragement';
  };

  const hintType = getHintType();

  const getIcon = () => {
    switch (hintType) {
      case 'hint': return Lightbulb;
      case 'scaffolding': return BookOpen;
      default: return AlertCircle;
    }
  };

  const getTitle = () => {
    if (userRole === 'Kid') {
      switch (hintType) {
        case 'hint': return '💡 Helpful Hint';
        case 'scaffolding': return '📚 Step-by-Step Help';
        default: return '🌟 Keep Going!';
      }
    } else {
      switch (hintType) {
        case 'hint': return 'Hint';
        case 'scaffolding': return 'Step-by-Step Guide';
        default: return 'Guidance';
      }
    }
  };

  const getCardStyle = () => {
    switch (hintType) {
      case 'hint': return 'border-yellow-200 bg-yellow-50';
      case 'scaffolding': return 'border-blue-200 bg-blue-50';
      default: return 'border-green-200 bg-green-50';
    }
  };

  const Icon = getIcon();

  return (
    <Card className={getCardStyle()}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Icon className="w-5 h-5" />
          <span>{getTitle()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed">
          {hint}
        </p>
        
        {attempts >= 3 && (
          <div className="mt-4 p-3 bg-white/60 rounded-lg">
            <p className="text-xs text-gray-600">
              {userRole === 'Kid' 
                ? "🤗 Don't worry! Learning takes practice. You're doing great!"
                : "Remember: Making mistakes is part of learning. Keep trying!"
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
