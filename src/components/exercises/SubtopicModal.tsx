import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Play, CheckCircle, XCircle } from 'lucide-react';
import { EnhancedExerciseContent } from './EnhancedExerciseContent';
import { SubTopic as Unit1SubTopic, Question as Unit1Question } from '@/data/unit1Questions';
import { SubTopic as Unit2SubTopic, Question as Unit2Question } from '@/data/unit2Questions';
import { Unit4Question } from '@/data/unit4Questions';
import { Unit5Question } from '@/data/unit5Questions';

type SubTopic = Unit1SubTopic | Unit2SubTopic | any; // Including Unit 3 and 4 subtopics
type Question = Unit1Question | Unit2Question | Unit4Question | Unit5Question;
import { useUser } from '@/contexts/UserContext';

interface SubtopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  subtopic: SubTopic;
  user: any;
  onComplete: (results: { xpEarned: number }) => void;
}

export function SubtopicModal({ isOpen, onClose, subtopic, user, onComplete }: SubtopicModalProps) {
  const { updateProgress } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [totalXP, setTotalXP] = useState(0);

  const currentQuestion = subtopic.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === subtopic.questions.length - 1;
  const canNavigateNext = answeredQuestions.has(currentQuestionIndex) || showExplanation;

  const handleAnswer = (answer: any, isCorrect: boolean, xpEarned: number) => {
    if (isCorrect || answer === null) { // Also handle "reveal answer" case
      setShowExplanation(true);
      setAnsweredQuestions(prev => new Set([...prev, currentQuestionIndex]));
      setTotalXP(prev => prev + xpEarned);
      
      // Update progress in user context - determine unit ID from subtopic
      const unitId = subtopic.id <= 9 ? 1 : subtopic.id <= 20 ? 2 : subtopic.id <= 30 ? 3 : subtopic.id <= 40 ? 4 : 5; // Unit 1: 1-9, Unit 2: 10-20, Unit 3: 21-30, Unit 4: 31-40, Unit 5: 41-50
      const newAnsweredCount = answeredQuestions.size + 1;
      updateProgress(unitId, subtopic.id, newAnsweredCount, subtopic.questions.length, totalXP + xpEarned);
      
      onComplete({ xpEarned });
      
      // Auto-advance after showing explanation for 2 seconds
      setTimeout(() => {
        if (!isLastQuestion) {
          handleNextQuestion();
        }
      }, 2000);
    } else {
      setAttempts(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < subtopic.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAttempts(0);
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setAttempts(0);
      setShowExplanation(false);
    }
  };

  const handleClose = () => {
    setCurrentQuestionIndex(0);
    setAttempts(0);
    setShowExplanation(false);
    setAnsweredQuestions(new Set());
    setTotalXP(0);
    onClose();
  };

  const progressPercentage = (answeredQuestions.size / subtopic.questions.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-educational-light/20">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-educational-dark">
                {subtopic.title}
              </DialogTitle>
              <p className="text-educational-muted mt-1">
                Question {currentQuestionIndex + 1} of {subtopic.questions.length}
              </p>
            </div>
            <Badge variant="secondary" className="bg-educational-accent/10 text-educational-accent">
              {answeredQuestions.size}/{subtopic.questions.length} Completed
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-educational-muted mb-2">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Video Placeholder - only show for subtopics that have video */}
          {subtopic.hasVideo && (
            <div className="mb-6 bg-educational-light/10 rounded-lg p-8 text-center text-educational-muted border-2 border-dashed border-educational-light/30">
              <Play className="w-12 h-12 mx-auto mb-3 opacity-60" />
              <h4 className="font-semibold mb-2">Watch & Learn</h4>
              <p className="text-sm">Video content will be available soon</p>
              <p className="text-xs mt-2 text-educational-muted/70">You can skip to questions or wait for the video</p>
            </div>
          )}

          {/* Question Content */}
          <EnhancedExerciseContent
            question={currentQuestion}
            onAnswer={handleAnswer}
            attempts={attempts}
            userRole={user.skillLevel || 'Student'}
            showExplanation={showExplanation}
          />

          {/* Completion Message */}
          {answeredQuestions.size === subtopic.questions.length && (
            <Card className="mt-6 bg-gradient-to-r from-educational-primary/10 to-educational-accent/10 border-educational-primary/20">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-educational-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-educational-dark mb-2">
                  Subtopic Complete!
                </h3>
                <p className="text-educational-muted mb-4">
                  You've earned {totalXP} XP from this subtopic.
                </p>
                <Button 
                  onClick={handleClose}
                  className="bg-educational-primary hover:bg-educational-primary/90"
                >
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="p-6 pt-4 border-t border-educational-light/20 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="border-educational-light/30 text-educational-dark hover:bg-educational-light/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            {showExplanation ? (
              <CheckCircle className="w-5 h-5 text-educational-primary" />
            ) : answeredQuestions.has(currentQuestionIndex) ? (
              <CheckCircle className="w-5 h-5 text-educational-primary" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-educational-light/30" />
            )}
          </div>

          <Button
            onClick={handleNextQuestion}
            disabled={!canNavigateNext || isLastQuestion}
            className="bg-educational-primary hover:bg-educational-primary/90 disabled:opacity-50"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}