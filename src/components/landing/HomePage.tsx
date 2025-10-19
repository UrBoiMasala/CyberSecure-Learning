
import { Button } from '@/components/ui/button';
import { Shield, Users, Target, Award } from 'lucide-react';

interface HomePageProps {
  onLoginClick: () => void;
}

export function HomePage({ onLoginClick }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            CyberSecure Learning
          </h1>
        </div>
        <Button 
          onClick={onLoginClick}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2"
        >
          Login
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-6">
              CyberSecure Learning
            </h1>
            <p className="text-xl md:text-2xl text-purple-200/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Master cybersecurity skills in a safe environment — personalized for students, adults, and professionals.
            </p>
            <Button 
              onClick={onLoginClick}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg"
            >
              Get Started
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-lg p-6">
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">For Everyone</h3>
              <p className="text-purple-200/70">
                Tailored learning paths for students, adults, and professionals
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-lg p-6">
              <Target className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Personalized</h3>
              <p className="text-purple-200/70">
                Adaptive curriculum that adjusts to your skill level and progress
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-lg p-6">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Gamified</h3>
              <p className="text-purple-200/70">
                Earn XP, maintain streaks, and unlock achievements as you learn
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
