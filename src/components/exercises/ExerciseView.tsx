import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Lightbulb, CheckCircle, XCircle } from 'lucide-react';

interface ExerciseViewProps {
  exercise: any;
  user: any;
  onComplete: (results: any) => void;
  onBack: () => void;
}

export function ExerciseView({ exercise, user, onComplete, onBack }: ExerciseViewProps) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setAttempts(0);
    setFeedback('');
    setShowHint(false);
  }, [exercise]);

  const handleSubmit = (answer: string) => {
    const isCorrect = String(answer).toLowerCase() === String(exercise.correctAnswer).toLowerCase();
    
    if (isCorrect) {
      const xpGained = 10 + (Math.max(0, 3 - attempts) * 5);
      const starsEarned = Math.max(1, 4 - attempts);
      
      onComplete({
        xp: xpGained,
        stars: starsEarned,
        completed: true
      });
    } else {
      setAttempts(prev => prev + 1);
      setFeedback('Incorrect answer. Try again!');
      
      if (attempts >= 2) {
        setShowHint(true);
      }
      
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <CardTitle>{exercise.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>{exercise.description}</CardDescription>
          
          <div className="space-y-2">
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
              Your Answer:
            </label>
            <input
              type="text"
              id="answer"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          {feedback && (
            <div className={`p-3 rounded-md ${attempts > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {feedback}
            </div>
          )}

          {showHint && (
            <div className="p-3 bg-yellow-100 text-yellow-700 rounded-md flex items-center space-x-2">
              <Lightbulb className="w-4 h-4" />
              <span>Hint: {exercise.hint}</span>
            </div>
          )}
          
          <Button onClick={() => handleSubmit(answer)}>Submit Answer</Button>
        </CardContent>
      </Card>
    </div>
  );
}
