import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, HelpCircle, ArrowUpDown } from 'lucide-react';
import { Question as Unit1Question, checkShortResponseAnswer } from '@/data/unit1Questions';
import { checkShortResponseAnswer as checkUnit2ShortResponseAnswer, Question as Unit2Question } from '@/data/unit2Questions';
import { checkShortResponseAnswer as checkUnit3ShortResponseAnswer, Question as Unit3Question } from '@/data/unit3Questions';
import { checkUnit4ShortResponseAnswer, Unit4Question } from '@/data/unit4Questions';
import { checkUnit5ShortAnswer, Unit5Question } from '@/data/unit5Questions';

type Question = Unit1Question | Unit2Question | Unit3Question | Unit4Question | Unit5Question;

interface EnhancedExerciseContentProps {
  question: Question;
  onAnswer: (answer: any, isCorrect: boolean, xpEarned: number) => void;
  attempts: number;
  userRole: string;
  showExplanation?: boolean;
}

export function EnhancedExerciseContent({ 
  question, 
  onAnswer, 
  attempts, 
  userRole,
  showExplanation = false 
}: EnhancedExerciseContentProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [matchPairs, setMatchPairs] = useState<Record<string, string>>({});
  const [rankingOrder, setRankingOrder] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [revealAnswer, setRevealAnswer] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setTextAnswer('');
    setMatchPairs({});
    setRankingOrder((question as any).choices ? (question as any).choices.map((_: any, index: number) => index) : 
                   (question as any).options ? (question as any).options.map((_: any, index: number) => index) : []);
    setIsSubmitted(false);
    setShowIncorrect(false);
    setRevealAnswer(false);
  }, [question]);

  const checkAnswer = (userAnswer: any): boolean => {
    switch (question.type) {
      case 'MC':
      case 'multiple_choice':
      case 'multiple-choice':
        // For multiple choice, check if the selected option index matches the correct answer
        const options = (question as any).choices || (question as any).options;
        if (options && typeof userAnswer === 'number') {
          return options[userAnswer] === question.correctAnswer;
        }
        return userAnswer === question.correctAnswer;
      case 'SR':
      case 'short_answer':
        // Determine which unit this question belongs to and use appropriate checker
        if (question.id <= 45) {
          return checkShortResponseAnswer(userAnswer, question.correctAnswer, (question as any).expectedResponse);
        } else if (question.id <= 95) {
          return checkUnit2ShortResponseAnswer(userAnswer, question.correctAnswer, (question as any).expectedResponse);
        } else if (question.id <= 150) {
          return checkUnit3ShortResponseAnswer(userAnswer, question.correctAnswer, (question as any).expectedResponse);
        } else if (question.id <= 200) {
          return checkUnit4ShortResponseAnswer(userAnswer, question.correctAnswer, (question as any).expectedResponse);
        } else {
          return checkUnit5ShortAnswer(userAnswer, question.id);
        }
      case 'MATCH':
      case 'matching':
        const correctPairs = question.correctAnswer;
        return Object.keys(correctPairs).every(key => 
          matchPairs[key] === correctPairs[key]
        );
      case 'RANKING':
      case 'ranking':
        return JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
      case 'sorting':
      case 'SORTING':
        // For sorting questions, check if user answered correctly
        return JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
      case 'TRUE_FALSE':
        return userAnswer === question.correctAnswer;
      case 'FILL_BLANK':
        return userAnswer.toLowerCase().includes(question.correctAnswer.toLowerCase());
      case 'ORDERING':
        return JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    let userAnswer;
    
    switch (question.type) {
      case 'MC':
      case 'multiple_choice':
      case 'multiple-choice':
        userAnswer = selectedAnswer;
        break;
      case 'SR':
      case 'short_answer':
        userAnswer = textAnswer;
        break;
      case 'MATCH':
      case 'matching':
        userAnswer = matchPairs;
        break;
      case 'RANKING':
      case 'ranking':
        userAnswer = rankingOrder;
        break;
      case 'sorting':
      case 'SORTING':
        userAnswer = rankingOrder; // Sorting uses ranking UI
        break;
      case 'TRUE_FALSE':
        userAnswer = selectedAnswer === 0; // 0 = true, 1 = false
        break;
      case 'FILL_BLANK':
        userAnswer = textAnswer;
        break;
      case 'ORDERING':
        userAnswer = rankingOrder;
        break;
      default:
        return;
    }

    if (userAnswer === null || userAnswer === '' || 
        ((question.type === 'MATCH' || question.type === 'matching') && Object.keys(matchPairs).length === 0) ||
        ((question.type === 'RANKING' || question.type === 'ranking' || question.type === 'SORTING' || question.type === 'ORDERING') && rankingOrder.length === 0)) {
      return;
    }

    const isCorrect = checkAnswer(userAnswer);
    let xpEarned = 0;
    
    if (isCorrect) {
      xpEarned = (question as any).xpValue || (question as any).xpReward || 10;
      setIsSubmitted(true);
      onAnswer(userAnswer, isCorrect, xpEarned);
    } else {
      setShowIncorrect(true);
      setIsSubmitted(true);
      // Don't auto-advance - let user see feedback and choose retry or reveal
    }
  };

  const handleRetry = () => {
    setShowIncorrect(false);
    setIsSubmitted(false);
    setSelectedAnswer(null);
    setTextAnswer('');
    setMatchPairs({});
    setRankingOrder((question as any).choices ? (question as any).choices.map((_: any, index: number) => index) : 
                    (question as any).options ? (question as any).options.map((_: any, index: number) => index) : []);
  };

  const handleRevealAnswer = () => {
    setRevealAnswer(true);
    setShowIncorrect(false);
    onAnswer(null, true, 0); // Move to next without XP
  };

  const isAnswerReady = (): boolean => {
    switch (question.type) {
      case 'MC':
      case 'multiple_choice':
      case 'multiple-choice':
        return selectedAnswer !== null;
      case 'TRUE_FALSE':
        return selectedAnswer !== null;
      case 'SR':
      case 'short_answer':
      case 'FILL_BLANK':
        return textAnswer.trim() !== '';
      case 'MATCH':
      case 'matching':
        return Object.keys(matchPairs).length > 0;
      case 'RANKING':
      case 'ranking':
      case 'SORTING':
      case 'ORDERING':
        return rankingOrder.length === ((question as any).choices?.length || (question as any).options?.length);
      default:
        return false;
    }
  };

  const renderMultipleChoice = () => (
    <div className="space-y-3">
      {((question as any).choices || (question as any).options)?.map((choice: string, index: number) => (
        <Button
          key={index}
          variant={selectedAnswer === index ? "default" : "outline"}
          className="w-full justify-start text-left p-4 h-auto"
          onClick={() => setSelectedAnswer(index)}
          disabled={isSubmitted}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full border-2 ${
              selectedAnswer === index 
                ? 'bg-educational-primary border-educational-primary' 
                : 'border-educational-light/50'
            }`}>
              {selectedAnswer === index && (
                <div className="w-2 h-2 bg-white rounded-full m-0.5" />
              )}
            </div>
            <span className="text-educational-dark">{choice}</span>
          </div>
        </Button>
      ))}
    </div>
  );

  const renderShortResponse = () => (
    <div className="space-y-3">
      <Textarea
        value={textAnswer}
        onChange={(e) => setTextAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className="min-h-[100px] border-educational-light/30 focus:border-educational-primary"
        disabled={isSubmitted}
      />
      <p className="text-xs text-educational-muted">
        Explain your thinking clearly. Your answer will be checked for key concepts.
      </p>
    </div>
  );

  const renderMatchExercise = () => {
    const pairs = Object.keys(question.correctAnswer || {});
    const options = Object.values(question.correctAnswer || {}) as string[];

    return (
      <div className="space-y-4">
        <p className="text-educational-muted mb-4">
          Match the items on the left with the correct options on the right:
        </p>
        
        {pairs.map((item, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 bg-educational-light/5 rounded-lg">
            <div className="flex-1 font-medium text-educational-dark">
              {item}
            </div>
            <div className="flex-1">
              <select
                value={matchPairs[item] || ''}
                onChange={(e) => setMatchPairs(prev => ({ ...prev, [item]: e.target.value }))}
                className="w-full p-2 border border-educational-light/30 rounded focus:border-educational-primary focus:outline-none"
                disabled={isSubmitted}
              >
                <option value="">Select match...</option>
                {options.map((option, optIndex) => (
                  <option key={optIndex} value={option as string}>
                    {option as string}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderRankingExercise = () => {
    const moveItem = (fromIndex: number, toIndex: number) => {
      if (isSubmitted) return;
      
      const newOrder = [...rankingOrder];
      const [movedItem] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, movedItem);
      setRankingOrder(newOrder);
    };

    return (
      <div className="space-y-4">
        <p className="text-educational-muted mb-4">
          Drag to reorder from {question.question.includes('least') ? 'least to most' : 'first to last'}:
        </p>
        
        <div className="space-y-2">
          {rankingOrder.map((choiceIndex, position) => (
            <div
              key={`${choiceIndex}-${position}`}
              className="flex items-center space-x-3 p-3 bg-educational-light/5 rounded-lg border border-educational-light/20"
            >
              <div className="flex flex-col space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveItem(position, Math.max(0, position - 1))}
                  disabled={position === 0 || isSubmitted}
                  className="p-1 h-6 w-6"
                >
                  ↑
                </Button>
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={() => moveItem(position, Math.min(rankingOrder.length - 1, position + 1))}
                  disabled={position === rankingOrder.length - 1 || isSubmitted}
                  className="p-1 h-6 w-6"
                >
                  ↓
                </Button>
              </div>
              
              <div className="flex items-center space-x-3 flex-1">
                <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                  {position + 1}
                </Badge>
                <span className="font-medium text-educational-dark">
                  {((question as any).choices || (question as any).options)?.[choiceIndex]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTrueFalse = () => (
    <div className="space-y-3">
      <Button
        variant={selectedAnswer === 0 ? "default" : "outline"}
        className="w-full justify-start text-left p-4 h-auto"
        onClick={() => setSelectedAnswer(0)}
        disabled={isSubmitted}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-4 h-4 rounded-full border-2 ${
            selectedAnswer === 0 
              ? 'bg-educational-primary border-educational-primary' 
              : 'border-educational-light/50'
          }`}>
            {selectedAnswer === 0 && (
              <div className="w-2 h-2 bg-white rounded-full m-0.5" />
            )}
          </div>
          <span className="text-educational-dark">True</span>
        </div>
      </Button>
      <Button
        variant={selectedAnswer === 1 ? "default" : "outline"}
        className="w-full justify-start text-left p-4 h-auto"
        onClick={() => setSelectedAnswer(1)}
        disabled={isSubmitted}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-4 h-4 rounded-full border-2 ${
            selectedAnswer === 1 
              ? 'bg-educational-primary border-educational-primary' 
              : 'border-educational-light/50'
          }`}>
            {selectedAnswer === 1 && (
              <div className="w-2 h-2 bg-white rounded-full m-0.5" />
            )}
          </div>
          <span className="text-educational-dark">False</span>
        </div>
      </Button>
    </div>
  );

  return (
    <Card className="bg-card border-educational-light/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-educational-primary/10 to-educational-accent/10 border-b border-educational-light/20">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-educational-primary" />
            <span className="text-educational-dark">Question {question.id}</span>
            <Badge variant="outline" className="bg-educational-light/20 text-educational-dark text-xs">
              {(question.type === 'MC' || question.type === 'multiple_choice' || question.type === 'multiple-choice') ? 'Multiple Choice' : 
               (question.type === 'SR' || question.type === 'short_answer' || question.type === 'short-answer') ? 'Short Response' : 
               (question.type === 'RANKING' || question.type === 'ranking') ? 'Ranking' : 
               (question.type === 'sorting' || question.type === 'SORTING') ? 'Sorting' : 
               (question.type === 'ordering' || question.type === 'ORDERING') ? 'Ordering' :
               (question.type === 'true-false' || question.type === 'TRUE_FALSE') ? 'True/False' : 'Matching'}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-educational-accent/10 text-educational-accent">
              {(question as any).xpValue || (question as any).xpReward || 10} XP
            </Badge>
            {attempts > 0 && (
              <Badge variant="outline" className="text-educational-muted">
                Attempt {attempts + 1}
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6">
        <div className="text-lg font-medium text-educational-dark leading-relaxed">
          {question.question}
        </div>

        <div className="space-y-4">
          {(question.type === 'MC' || question.type === 'multiple-choice' || question.type === 'multiple_choice') && renderMultipleChoice()}
          {(question.type === 'TRUE_FALSE' || question.type === 'true-false') && renderTrueFalse()}
          {(question.type === 'SR' || question.type === 'short_answer' || question.type === 'short-answer' || question.type === 'FILL_BLANK') && renderShortResponse()}
          {(question.type === 'MATCH' || question.type === 'matching') && renderMatchExercise()}
          {(question.type === 'RANKING' || question.type === 'ranking' || question.type === 'SORTING' || question.type === 'sorting' || question.type === 'ORDERING' || question.type === 'ordering') && renderRankingExercise()}
        </div>

        {showExplanation && (
          <div className="p-4 bg-educational-primary/10 border border-educational-primary/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-educational-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-educational-primary">Correct!</p>
                <p className="text-sm text-educational-dark mt-1">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {showIncorrect && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
            <div className="flex items-start space-x-2">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-red-700">Incorrect Answer</p>
                <p className="text-sm text-red-600 mt-1">That's not quite right. Try thinking about it differently.</p>
                <div className="flex space-x-3 mt-3">
                  <Button 
                    onClick={handleRetry}
                    variant="outline"
                    size="sm"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    Try Again
                  </Button>
                  <Button 
                    onClick={handleRevealAnswer}
                    variant="outline"
                    size="sm"
                    className="border-orange-300 text-orange-700 hover:bg-orange-50"
                  >
                    Reveal Answer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {revealAnswer && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fade-in">
            <div className="flex items-start space-x-2">
              <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700">Answer Revealed</p>
                <div className="text-sm text-blue-600 mt-2 space-y-2">
                  <p><strong>Correct Answer:</strong> {
                    (question.type === 'MC' || question.type === 'multiple_choice') ? 
                      ((question as any).choices || (question as any).options)?.[question.correctAnswer as number] || question.correctAnswer :
                    (question.type === 'SR' || question.type === 'short_answer') ? (question as any).expectedResponse || 'See explanation below' :
                    (question.type === 'RANKING' || question.type === 'ranking') ? 'See ranking below' :
                    'See matches below'
                  }</p>
                  <p><strong>Explanation:</strong> {question.explanation}</p>
                  {(question as any).expectedResponse && (question.type === 'SR' || question.type === 'short_answer') && (
                    <p><strong>Sample Response:</strong> "{(question as any).expectedResponse}"</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-educational-light/20">
          {!showExplanation && !showIncorrect && !revealAnswer && (
            <Button 
              onClick={handleSubmit}
              disabled={!isAnswerReady() || isSubmitted}
              className="bg-educational-primary hover:bg-educational-primary/90 text-white font-semibold px-6 py-2 ml-auto shadow-lg border-2 border-educational-primary"
            >
              Submit Answer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}