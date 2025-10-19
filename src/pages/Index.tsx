
import { useState } from 'react';
import { UserProvider } from '@/contexts/UserContext';
import { HomePage } from '@/components/landing/HomePage';
import { AuthScreen } from '@/components/auth/AuthScreen';
import { EnhancedCyberDashboard } from '@/components/cyber/EnhancedCyberDashboard';
import { UnitSubtopics } from '@/components/exercises/UnitSubtopics';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentView, setCurrentView] = useState<'homepage' | 'auth' | 'dashboard' | 'subtopics'>('homepage');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUnit, setCurrentUnit] = useState(null);
  const { toast } = useToast();

  const handleShowAuth = () => {
    setCurrentView('auth');
  };

  const handleBackToHome = () => {
    setCurrentView('homepage');
  };

  const handleLogin = (userData: any) => {
    setCurrentUser(userData);
    setCurrentView('dashboard');
    
    if (userData.isFirstTime) {
      toast({
        title: "🔐 Account Created Successfully",
        description: `Welcome to CyberSecure Learning, ${userData.name}!`,
      });
    } else {
      toast({
        title: "🔐 Login Successful",
        description: `Welcome back, ${userData.name}!`,
      });
    }
  };

  const handleSkillLevelChange = (newSkillLevel: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, skillLevel: newSkillLevel, role: newSkillLevel };
      setCurrentUser(updatedUser);
      
      // Update stored user data
      const users = JSON.parse(localStorage.getItem('cyberSecure_users') || '[]');
      const userIndex = users.findIndex((user: any) => user.email === currentUser.email);
      if (userIndex !== -1) {
        users[userIndex].skillLevel = newSkillLevel;
        localStorage.setItem('cyberSecure_users', JSON.stringify(users));
      }
      
      toast({
        title: "🔄 Skill Level Updated",
        description: `Switched to ${newSkillLevel} level curriculum`,
      });
    }
  };

  const handleStartUnit = (unitId: number, unitTitle: string) => {
    setCurrentUnit({ unitId, unitTitle });
    setCurrentView('subtopics');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentUnit(null);
  };

  const handleSubtopicComplete = (results: any) => {
    if (currentUser && currentUnit) {
      // Update user progress
      const updatedUser = { ...currentUser };
      if (!updatedUser.progress) updatedUser.progress = {};
      
      // Track progress per unit
      const unitKey = `unit_${currentUnit.unitId}`;
      if (!updatedUser.progress[unitKey]) {
        updatedUser.progress[unitKey] = { completedQuestions: 0, totalQuestions: 42 };
      }
      
      updatedUser.progress[unitKey].completedQuestions += 1;
      updatedUser.xp = (updatedUser.xp || 0) + results.xpEarned;
      
      setCurrentUser(updatedUser);
      
      // Save to localStorage
      const users = JSON.parse(localStorage.getItem('cyberSecure_users') || '[]');
      const userIndex = users.findIndex((user: any) => user.email === currentUser.email);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('cyberSecure_users', JSON.stringify(users));
      }
      
      toast({
        title: "✅ Great Job!",
        description: `You earned ${results.xpEarned} XP!`,
      });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('homepage');
    toast({
      title: "👋 Logged Out",
      description: "See you next time!",
    });
  };

  return (
    <UserProvider>
      <div className="min-h-screen">
        {currentView === 'homepage' && (
          <HomePage onLoginClick={handleShowAuth} />
        )}
        
        {currentView === 'auth' && (
          <AuthScreen onLogin={handleLogin} onBack={handleBackToHome} />
        )}
        
        {currentView === 'dashboard' && currentUser && (
          <EnhancedCyberDashboard 
            user={currentUser}
            onLogout={handleLogout}
            onSkillLevelChange={handleSkillLevelChange}
            onStartUnit={handleStartUnit}
          />
        )}
        
        {currentView === 'subtopics' && currentUser && currentUnit && (
          <UnitSubtopics
            unitId={currentUnit.unitId}
            unitTitle={currentUnit.unitTitle}
            user={currentUser}
            onBack={handleBackToDashboard}
            onComplete={handleSubtopicComplete}
          />
        )}
      </div>
    </UserProvider>
  );
};

export default Index;
