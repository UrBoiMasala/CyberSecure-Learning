import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { EnhancedExerciseContent } from './EnhancedExerciseContent';
import { unit1Data } from '@/data/unit1Questions';

interface ExerciseInterfaceProps {
  user: any;
  exercise: { unitId: number; unitTitle: string };
  onBack: () => void;
  onComplete: (results: { xpEarned: number }) => void;
}

export function ExerciseInterface({ user, exercise, onBack, onComplete }: ExerciseInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // For now, only Unit 1 has questions - others will show coming soon
  const questions = exercise.unitId === 1 ? unit1Data.flatMap(subtopic => subtopic.questions) : [];
  
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-educational-light/30 to-educational-soft/40 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-card border-border shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-educational-blue" />
                <span>{exercise.unitTitle}</span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-center py-12">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Coming Soon!
            </h3>
            <p className="text-muted-foreground">
              This unit's questions are currently being prepared. Check back soon!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: any, isCorrect: boolean, xpEarned: number) => {
    if (isCorrect) {
      setShowExplanation(true);
      onComplete({ xpEarned });
      
      // Move to next question after a short delay
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setAttempts(0);
          setShowExplanation(false);
        } else {
          // All questions completed, go back to dashboard
          onBack();
        }
      }, 2000);
    } else {
      setAttempts(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-educational-light/30 to-educational-soft/40 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="text-foreground hover:bg-secondary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">{exercise.unitTitle}</h1>
            <p className="text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          
          <div className="w-32" /> {/* Spacer for alignment */}
        </div>

        {/* Question Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-educational-blue to-educational-purple h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Content */}
        <EnhancedExerciseContent
          question={currentQuestion}
          onAnswer={handleAnswer}
          attempts={attempts}
          userRole={user.skillLevel || 'Student'}
          showExplanation={showExplanation}
        />
      </div>
    </div>
  );
}