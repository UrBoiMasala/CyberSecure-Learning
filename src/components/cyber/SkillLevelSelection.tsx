
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Briefcase, Shield, User } from 'lucide-react';

interface SkillLevelSelectionProps {
  user: any;
  onSkillSelect: (skillLevel: string) => void;
}

export function SkillLevelSelection({ user, onSkillSelect }: SkillLevelSelectionProps) {
  const skillLevels = [
    {
      id: 'student',
      title: 'Student',
      description: 'New to cybersecurity? Start with fundamental concepts and basic security practices.',
      icon: GraduationCap,
      features: ['Basic Security Concepts', 'Password Management', 'Safe Browsing', 'Email Security'],
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'adult',
      title: 'Adult',
      description: 'Enhance your digital security knowledge for personal and family protection.',
      icon: User,
      features: ['Identity Protection', 'Financial Security', 'Privacy Controls', 'Threat Awareness'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'professional',
      title: 'Professional',
      description: 'Advanced cybersecurity training for IT professionals and security specialists.',
      icon: Briefcase,
      features: ['Network Security', 'Incident Response', 'Risk Assessment', 'Compliance'],
      color: 'from-pink-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">
            Welcome, {user.name}!
          </h1>
          <p className="text-purple-200/80 text-lg max-w-2xl mx-auto">
            Choose your skill level to get personalized cybersecurity training tailored to your needs and experience.
          </p>
        </div>

        {/* Skill Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillLevels.map((level) => {
            const IconComponent = level.icon;
            return (
              <Card 
                key={level.id}
                className="bg-black/40 backdrop-blur-xl border border-purple-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => onSkillSelect(level.title)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${level.color} rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white mb-2">
                    {level.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-purple-200/70 text-center leading-relaxed">
                    {level.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-purple-200 font-semibold text-sm uppercase tracking-wide">
                      What You'll Learn:
                    </h4>
                    <ul className="space-y-2">
                      {level.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-purple-200/80 text-sm">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    className={`w-full bg-gradient-to-r ${level.color} hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl`}
                    onClick={() => onSkillSelect(level.title)}
                  >
                    Select {level.title} Level
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
