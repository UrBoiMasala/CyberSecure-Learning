import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, CheckCircle, Lock } from 'lucide-react';
import { SubtopicModal } from './SubtopicModal';
import { unit1Data, SubTopic } from '@/data/unit1Questions';
import { unit2Data } from '@/data/unit2Questions';
import { unit3Subtopics } from '@/data/unit3Questions';
import { unit4Subtopics } from '@/data/unit4Questions';
import { unit5SubTopics } from '@/data/unit5Questions';

interface UnitSubtopicsProps {
  unitId: number;
  unitTitle: string;
  user: any;
  onBack: () => void;
  onComplete: (results: { xpEarned: number }) => void;
}

export function UnitSubtopics({ unitId, unitTitle, user, onBack, onComplete }: UnitSubtopicsProps) {
  const [selectedSubtopic, setSelectedSubtopic] = useState<SubTopic | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Unit 1 has 9 subtopics, Unit 2 has 10 subtopics, Unit 3 has 10 subtopics, Unit 4 has 10 subtopics, Unit 5 has 10 subtopics - others will show coming soon
  const subtopics = unitId === 1 ? unit1Data : unitId === 2 ? unit2Data : unitId === 3 ? unit3Subtopics : unitId === 4 ? unit4Subtopics : unitId === 5 ? unit5SubTopics : [];

  const getSubtopicProgress = (subtopicId: number) => {
    // Get user's progress for this subtopic
    const userProgress = user.progress?.[`${unitId}_${subtopicId}`];
    if (!userProgress) return 0;
    
    const completed = userProgress.completedQuestions || 0;
    const total = userProgress.totalQuestions || 5; // Each subtopic has 5 questions
    return Math.round((completed / total) * 100);
  };

  const getSubtopicStatus = (subtopicId: number, index: number) => {
    // All subtopics are now unlocked so users can choose any order
    return 'unlocked';
  };

  const handleSubtopicClick = (subtopic: SubTopic, index: number) => {
    // All subtopics are unlocked now
    setSelectedSubtopic(subtopic);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSubtopic(null);
  };

  if (subtopics.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-educational-light/30 to-educational-soft/40 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-card border-educational-light/20 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={onBack} className="text-educational-dark hover:bg-educational-light/10">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
              <CardTitle className="flex items-center space-x-2 text-educational-dark">
                <Play className="w-5 h-5 text-educational-primary" />
                <span>{unitTitle}</span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-center py-12">
            <h3 className="text-xl font-semibold text-educational-dark mb-4">
              Coming Soon!
            </h3>
            <p className="text-educational-muted">
              This unit's subtopics are currently being prepared. Check back soon!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-educational-light/30 to-educational-soft/40 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="text-educational-dark hover:bg-educational-light/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-educational-dark">{unitTitle}</h1>
            <p className="text-educational-muted mt-1">
              Choose a subtopic to begin learning
            </p>
          </div>
          
          <div className="w-32" /> {/* Spacer for alignment */}
        </div>

        {/* Subtopics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subtopics.map((subtopic, index) => {
            const progress = getSubtopicProgress(subtopic.id);
            const status = getSubtopicStatus(subtopic.id, index);
            const isLocked = status === 'locked';
            const isCompleted = progress >= 70;

            return (
              <Card 
                key={subtopic.id}
                className={`
                  bg-card border-educational-light/20 shadow-lg transition-all duration-200 
                  ${!isLocked ? 'hover:shadow-xl hover:border-educational-primary/30 cursor-pointer' : 'opacity-60'}
                `}
                onClick={() => !isLocked && handleSubtopicClick(subtopic, index)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {isLocked ? (
                          <Lock className="w-5 h-5 text-educational-muted" />
                        ) : isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-educational-primary" />
                        ) : (
                          <Play className="w-5 h-5 text-educational-accent" />
                        )}
                        <Badge 
                          variant="secondary" 
                          className="bg-educational-light/20 text-educational-dark text-xs"
                        >
                          {subtopic.questions.length} Questions
                        </Badge>
                      </div>
                      <CardTitle className="text-educational-dark text-lg leading-tight">
                        {subtopic.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-educational-muted">Progress</span>
                        <span className="text-educational-dark font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                  
                  <Button 
                    className={`
                      w-full transition-all
                      ${isLocked 
                        ? 'bg-educational-muted/20 text-educational-muted cursor-not-allowed' 
                        : isCompleted 
                          ? 'bg-educational-primary hover:bg-educational-primary/90 text-white'
                          : 'bg-educational-accent hover:bg-educational-accent/90 text-white'
                      }
                    `}
                    disabled={isLocked}
                  >
                    {isLocked ? (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Locked
                      </>
                    ) : isCompleted ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Review
                      </>
                    ) : progress > 0 ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Subtopic Modal */}
        {selectedSubtopic && (
          <SubtopicModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            subtopic={selectedSubtopic}
            user={user}
            onComplete={onComplete}
          />
        )}
      </div>
    </div>
  );
}