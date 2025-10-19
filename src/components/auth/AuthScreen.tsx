
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Eye, EyeOff, ArrowLeft, GraduationCap, User, Briefcase } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (userData: any) => void;
  onBack: () => void;
}

// Simple mock storage using localStorage
const STORAGE_KEY = 'cyberSecure_users';

const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const storeUser = (user: any) => {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

const findUser = (email: string) => {
  const users = getStoredUsers();
  return users.find((user: any) => user.email === email);
};

export function AuthScreen({ onLogin, onBack }: AuthScreenProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [createError, setCreateError] = useState('');

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%]/.test(password)
    };
    
    const score = Object.values(requirements).filter(Boolean).length;
    const strength = score <= 2 ? 'Weak' : score <= 4 ? 'Medium' : 'Strong';
    const percentage = (score / 5) * 100;
    
    return { requirements, strength, percentage, isValid: score === 5 };
  };

  const passwordValidation = validatePassword(createPassword);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    const user = findUser(loginEmail);
    
    if (!user) {
      setLoginError('This email is not registered. Please create an account.');
      return;
    }
    
    if (user.password !== loginPassword) {
      setLoginError('Incorrect password. Please try again.');
      return;
    }
    
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      skillLevel: user.skillLevel,
      role: user.skillLevel, // For compatibility with existing components
      xp: user.xp || 0,
      level: user.level || 1,
      streak: user.streak || 0,
      totalUnits: 10,
      completedUnits: user.completedUnits || 0,
      lastActivity: new Date(),
      isFirstTime: false
    };
    
    onLogin(userData);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    
    if (!passwordValidation.isValid) {
      setCreateError('Please ensure your password meets all requirements.');
      return;
    }
    
    if (createPassword !== confirmPassword) {
      setCreateError('Passwords do not match.');
      return;
    }

    if (!skillLevel) {
      setCreateError('Please select your skill level.');
      return;
    }
    
    // Check if email already exists
    if (findUser(createEmail)) {
      setCreateError('This email is already in use. Please log in instead.');
      return;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: `${firstName} ${lastName}`,
      email: createEmail,
      password: createPassword,
      skillLevel: skillLevel,
      xp: 0,
      level: 1,
      streak: 0,
      completedUnits: 0,
      createdAt: new Date().toISOString()
    };
    
    storeUser(newUser);
    
    const userData = {
      ...newUser,
      role: skillLevel, // For compatibility with existing components
      totalUnits: 10,
      lastActivity: new Date(),
      isFirstTime: false // No longer need welcome screen since skill level is selected here
    };
    
    onLogin(userData);
  };

  const isCreateFormValid = firstName && lastName && createEmail && 
                           passwordValidation.isValid && createPassword === confirmPassword && skillLevel;

  const skillLevels = [
    { value: 'Student', label: 'Student', icon: GraduationCap, description: 'New to cybersecurity fundamentals' },
    { value: 'Adult', label: 'Adult', icon: User, description: 'Personal and family protection' },
    { value: 'Professional', label: 'Professional', icon: Briefcase, description: 'Advanced IT security training' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute top-6 left-6 text-purple-300 hover:text-pink-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            CyberSecure Learning
          </h1>
        </div>

        {/* Auth Card */}
        <Card className="bg-black/40 backdrop-blur-xl border border-purple-500/30 shadow-2xl">
          <CardContent className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-purple-950/50">
                <TabsTrigger value="login" className="text-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  Login
                </TabsTrigger>
                <TabsTrigger value="create" className="text-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  Create Account
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-purple-200">Email Address</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="bg-purple-950/50 border-purple-500/30 text-white placeholder:text-purple-300/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-purple-200">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showLoginPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        className="bg-purple-950/50 border-purple-500/30 text-white placeholder:text-purple-300/50 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-purple-300"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {loginError && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-300 text-sm">{loginError}</p>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={!loginEmail || !loginPassword}
                  >
                    Login
                  </Button>

                  <div className="text-center space-y-2">
                    <Button variant="ghost" className="text-purple-300 hover:text-pink-300 text-sm">
                      Forgot Password?
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Create Account Tab */}
              <TabsContent value="create">
                <form onSubmit={handleCreateAccount} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-purple-200">First Name</Label>
                      <Input
                        id="first-name"
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="bg-purple-950/50 border-purple-500/30 text-white placeholder:text-purple-300/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-purple-200">Last Name</Label>
                      <Input
                        id="last-name"
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="bg-purple-950/50 border-purple-500/30 text-white placeholder:text-purple-300/50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="create-email" className="text-purple-200">Email Address</Label>
                    <Input
                      id="create-email"
                      type="email"
                      placeholder="Enter your email"
                      value={createEmail}
                      onChange={(e) => setCreateEmail(e.target.value)}
                      required
                      className="bg-purple-950/50 border-purple-500/30 text-white placeholder:text-purple-300/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skill-level" className="text-purple-200">Skill Level</Label>
                    <Select value={skillLevel} onValueChange={setSkillLevel}>
                      <SelectTrigger className="bg-purple-950/50 border-purple-500/30 text-white">
                        <SelectValue placeholder="Select your skill level" />
                      </SelectTrigger>
                      <SelectContent className="bg-purple-950 border-purple-500/30">
                        {skillLevels.map((level) => {
                          const IconComponent = level.icon;
                          return (
                            <SelectItem 
                              key={level.value} 
                              value={level.value}
                              className="text-white hover:bg-purple-800 focus:bg-purple-800"
                            >
                              <div className="flex items-center space-x-2">
                                <IconComponent className="w-4 h-4" />
                                <div>
                                  <div className="font-medium">{level.label}</div>
                                  <div className="text-xs text-purple-300">{level.description}</div>
                                </div>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="create-password" className="text-purple-200">Password</Label>
                    <div className="relative">
                      <Input
                        id="create-password"
                        type={showCreatePassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={createPassword}
                        onChange={(e) => setCreatePassword(e.target.value)}
                        required
                        className="bg-purple-950/50 border-purple-500/30 text-white placeholder:text-purple-300/50 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-purple-300"
                        onClick={() => setShowCreatePassword(!showCreatePassword)}
                      >
                        {showCreatePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    
                    {createPassword && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-purple-200">Password Strength:</span>
                          <span className={`font-medium ${
                            passwordValidation.strength === 'Weak' ? 'text-red-400' :
                            passwordValidation.strength === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {passwordValidation.strength}
                          </span>
                        </div>
                        <Progress 
                          value={passwordValidation.percentage} 
                          className="h-2"
                        />
                        <div className="space-y-1 text-xs">
                          {Object.entries(passwordValidation.requirements).map(([key, met]) => (
                            <div key={key} className={`flex items-center space-x-2 ${met ? 'text-green-400' : 'text-red-400'}`}>
                              <span>{met ? '✓' : '✗'}</span>
                              <span>
                                {key === 'length' && 'At least 8 characters'}
                                {key === 'uppercase' && 'One uppercase letter'}
                                {key === 'lowercase' && 'One lowercase letter'}
                                {key === 'number' && 'One number'}
                                {key === 'special' && 'One special character (!@#$%)'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-purple-200">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="bg-purple-950/50 border-purple-500/30 text-white placeholder:text-purple-300/50 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-purple-300"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {confirmPassword && createPassword !== confirmPassword && (
                      <p className="text-red-400 text-xs">Passwords do not match</p>
                    )}
                  </div>

                  {createError && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-300 text-sm">{createError}</p>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={!isCreateFormValid}
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
