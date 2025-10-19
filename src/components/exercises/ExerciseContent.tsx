
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { HelpCircle } from 'lucide-react';

interface ExerciseContentProps {
  question: any;
  onAnswer: (answer: any) => void;
  attempts: number;
  userRole: string;
}

export function ExerciseContent({ question, onAnswer, attempts, userRole }: ExerciseContentProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [textAnswer, setTextAnswer] = useState('');

  const handleSubmit = () => {
    if (question.type === 'multiple-choice' && selectedAnswer !== null) {
      onAnswer(selectedAnswer);
      setSelectedAnswer(null);
    } else if (question.type === 'text-input' && textAnswer.trim()) {
      onAnswer(textAnswer.trim());
      setTextAnswer('');
    }
  };

  const isAnswerReady = question.type === 'multiple-choice' 
    ? selectedAnswer !== null 
    : textAnswer.trim().length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-blue-500" />
          <span>Question</span>
          {attempts > 0 && (
            <span className="text-sm text-gray-500">
              (Attempt {attempts + 1})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg font-medium text-gray-900">
          {question.question}
        </div>

        {question.type === 'multiple-choice' && (
          <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => setSelectedAnswer(parseInt(value))}>
            <div className="space-y-3">
              {question.options.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}

        {question.type === 'text-input' && (
          <div className="space-y-2">
            <Label htmlFor="answer">Your Answer</Label>
            <Input
              id="answer"
              type="text"
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="text-lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && isAnswerReady) {
                  handleSubmit();
                }
              }}
            />
          </div>
        )}

        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={!isAnswerReady}
            size="lg"
            className={userRole === 'Kid' ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : ''}
          >
            {userRole === 'Kid' ? '✨ Submit Answer' : 'Submit Answer'}
          </Button>
        </div>

        {attempts > 0 && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              {userRole === 'Kid' 
                ? "💡 Take your time and think carefully!" 
                : "Take a moment to review your answer before submitting."
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
