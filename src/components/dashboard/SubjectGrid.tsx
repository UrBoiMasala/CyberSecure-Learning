
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calculator, Globe, Beaker, Palette, Music } from 'lucide-react';

interface SubjectGridProps {
  user: any;
  onStartExercise: (exercise: any) => void;
}

export function SubjectGrid({ user, onStartExercise }: SubjectGridProps) {
  const subjects = [
    {
      id: 'math',
      title: 'Mathematics',
      icon: Calculator,
      color: 'from-blue-500 to-blue-600',
      progress: 65,
      exercises: 24,
      description: 'Numbers, operations, and problem solving'
    },
    {
      id: 'language',
      title: 'Language Arts',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      progress: 80,
      exercises: 18,
      description: 'Reading, writing, and comprehension'
    },
    {
      id: 'science',
      title: 'Science',
      icon: Beaker,
      color: 'from-purple-500 to-purple-600',
      progress: 45,
      exercises: 16,
      description: 'Explore how the world works'
    },
    {
      id: 'geography',
      title: 'Geography',
      icon: Globe,
      color: 'from-orange-500 to-orange-600',
      progress: 30,
      exercises: 12,
      description: 'Countries, capitals, and cultures'
    },
    {
      id: 'art',
      title: 'Art & Creativity',
      icon: Palette,
      color: 'from-pink-500 to-pink-600',
      progress: 55,
      exercises: 8,
      description: 'Express yourself through art'
    },
    {
      id: 'music',
      title: 'Music',
      icon: Music,
      color: 'from-indigo-500 to-indigo-600',
      progress: 20,
      exercises: 6,
      description: 'Rhythm, melody, and harmony'
    }
  ];

  const handleSubjectClick = (subject: any) => {
    const exercise = {
      id: `${subject.id}-exercise`,
      title: `${subject.title} Practice`,
      subject: subject.title,
      difficulty: 'medium',
      progress: 0
    };
    onStartExercise(exercise);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <span>Subjects</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <Card key={subject.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleSubjectClick(subject)}>
              <CardContent className="p-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center mb-3`}>
                  <subject.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1">{subject.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{subject.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Progress</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{subject.exercises} exercises</span>
                    <Button size="sm" variant="outline">
                      Practice
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
