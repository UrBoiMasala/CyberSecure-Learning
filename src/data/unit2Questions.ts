export interface Question {
  id: number;
  type: 'MC' | 'SR' | 'RANKING' | 'MATCH';
  question: string;
  choices?: string[];
  correctAnswer: any;
  expectedResponse?: string;
  explanation: string;
  xpValue: number;
}

export interface SubTopic {
  id: number;
  title: string;
  hasVideo: boolean;
  questions: Question[];
}

export const unit2Data: SubTopic[] = [
  {
    id: 1,
    title: "Why Passwords are Important?",
    hasVideo: true,
    questions: [
      {
        id: 46,
        type: 'SR',
        question: 'Your friend says, "It\'s fine to have a weak password. Nobody would want my account anyway." How would you explain why that\'s wrong?',
        correctAnswer: 'even if you think your account isn\'t important, hackers can still use it to send scams or steal information',
        expectedResponse: 'Even if you think your account isn\'t important, hackers can still use it to send scams or steal information.',
        explanation: 'Even accounts that seem unimportant can be valuable to hackers. They can use compromised accounts to send spam, scams, or gather personal information that leads to bigger attacks.',
        xpValue: 15
      },
      {
        id: 47,
        type: 'MC',
        question: 'What could happen if someone learns your email password?',
        choices: [
          'They can only read your emails, nothing else.',
          'They can log in as you, reset other passwords, and steal information.',
          'They can only see your games.',
          'Nothing bad will happen.'
        ],
        correctAnswer: 1,
        explanation: 'Email access is particularly dangerous because most password reset requests go to your email. A hacker with email access can reset passwords for other accounts and take control of multiple services.',
        xpValue: 20
      },
      {
        id: 48,
        type: 'RANKING',
        question: 'Rank these accounts from least harmful to most harmful if a hacker got the password:',
        choices: [
          'School email account',
          'Banking app account', 
          'Game account',
          'Social media account'
        ],
        correctAnswer: [2, 0, 3, 1], // Game, School email, Social media, Banking
        explanation: 'Banking accounts can cause direct financial harm. Social media and email can be used to scam others and reset other passwords. Game accounts typically have the least impact but can still be used maliciously.',
        xpValue: 25
      },
      {
        id: 49,
        type: 'SR',
        question: 'Why is having a password like having a key to your house?',
        correctAnswer: 'because a password locks your account the same way a key locks your door',
        expectedResponse: 'Because a password locks your account the same way a key locks your door. Without it, anyone could get in.',
        explanation: 'Just like a key controls who can enter your house, a password controls who can access your account. Both are security barriers that protect what\'s important to you.',
        xpValue: 15
      },
      {
        id: 50,
        type: 'MC',
        question: 'A hacker steals the password to a kid\'s game account. Which of these is the biggest risk?',
        choices: [
          'The hacker will change the background color.',
          'The hacker might send scams to friends or spend real money in the game.',
          'The hacker will delete the app for fun.',
          'Nothing—they can\'t do anything.'
        ],
        correctAnswer: 1,
        explanation: 'Even game accounts can be used to scam friends through the game\'s messaging system, or to make unauthorized purchases if payment methods are saved.',
        xpValue: 20
      }
    ]
  },
  {
    id: 2,
    title: "How Hackers Steal Passwords",
    hasVideo: true,
    questions: [
      {
        id: 51,
        type: 'SR',
        question: 'Your friend uses "123456" as their password. Explain why this password would be easy for a hacker to steal.',
        correctAnswer: 'because it\'s very common and short, so hackers can guess it quickly',
        expectedResponse: 'Because it\'s very common and short, so hackers can guess it quickly with simple tools.',
        explanation: 'Simple, common passwords like "123456" are among the first that hacking tools try. They appear on "most common passwords" lists that hackers use for quick attacks.',
        xpValue: 15
      },
      {
        id: 52,
        type: 'MC',
        question: 'A hacker uses a computer program that tries millions of password guesses every second until one works. What kind of attack is this?',
        choices: [
          'Phishing Attack',
          'Brute Force Attack',
          'Shoulder Surfing',
          'Password Reset'
        ],
        correctAnswer: 1,
        explanation: 'A brute force attack uses automated tools to try many password combinations rapidly until the correct one is found. This is why long, complex passwords are important.',
        xpValue: 20
      },
      {
        id: 53,
        type: 'RANKING',
        question: 'Rank these passwords from easiest to hardest for a hacker to guess:',
        choices: [
          'soccer',
          'P@ssw0rd1',
          'dragonfly8tree!',
          '12345'
        ],
        correctAnswer: [3, 0, 1, 2], // 12345, soccer, P@ssw0rd1, dragonfly8tree!
        explanation: 'Simple number sequences are easiest, then common words, then common patterns with substitutions, and finally long random combinations are hardest.',
        xpValue: 25
      },
      {
        id: 54,
        type: 'SR',
        question: 'Why do hackers like to use "leaked password lists" instead of guessing random passwords?',
        correctAnswer: 'because leaked lists contain real passwords that people have already used',
        expectedResponse: 'Because leaked lists contain real passwords that people have already used, making it faster to break into accounts.',
        explanation: 'Leaked password lists contain passwords that real people actually use, making them much more likely to work than random guesses. Many people also reuse these passwords across multiple accounts.',
        xpValue: 15
      },
      {
        id: 55,
        type: 'MC',
        question: 'A student uses their dog\'s name as a password. A hacker finds this on the student\'s social media page. What kind of mistake did the student make?',
        choices: [
          'Using personal info that\'s easy to find online',
          'Using too many symbols',
          'Writing the password on paper',
          'Forgetting to log out'
        ],
        correctAnswer: 0,
        explanation: 'Using personal information that can be found on social media makes passwords very easy to guess. Hackers often research their targets online before attempting to crack passwords.',
        xpValue: 20
      }
    ]
  },
  {
    id: 3,
    title: "What Makes a Password Weak?",
    hasVideo: true,
    questions: [
      {
        id: 56,
        type: 'SR',
        question: 'Your classmate uses "alex2009" as their password because it\'s their name and birth year. Why is this a weak password?',
        correctAnswer: 'because it\'s short and uses personal information that someone could easily guess',
        expectedResponse: 'Because it\'s short and uses personal information that someone could easily guess.',
        explanation: 'Personal information like names and birth years are not secret and can often be found online. This makes such passwords very predictable and easy to guess.',
        xpValue: 15
      },
      {
        id: 57,
        type: 'MC',
        question: 'Which of these passwords is the weakest, and why?',
        choices: [
          'Tree!Rocket72',
          'J3llyFish#92',
          'qwerty',
          'SunDog!2024'
        ],
        correctAnswer: 2,
        explanation: 'It\'s a very common, short, and predictable keyboard pattern.',
        xpValue: 20
      },
      {
        id: 58,
        type: 'RANKING',
        question: 'Rank these passwords from weakest to strongest:',
        choices: [
          '1234567',
          'Football2023',
          'C@tTree9$',
          'Banana'
        ],
        correctAnswer: [0, 3, 1, 2], // 1234567, Banana, Football2023, C@tTree9$
        explanation: 'Number sequences are weakest, then simple words, then words with years, and finally complex combinations with symbols are strongest.',
        xpValue: 25
      },
      {
        id: 59,
        type: 'SR',
        question: 'Why is using the same password for all accounts considered weak, even if it\'s long and complex?',
        correctAnswer: 'because if one account is hacked, all other accounts become easy to break into',
        expectedResponse: 'Because if one account is hacked, all other accounts become easy to break into.',
        explanation: 'Password reuse creates a single point of failure. No matter how strong a password is, if it\'s compromised in one breach, all accounts using that password become vulnerable.',
        xpValue: 15
      },
      {
        id: 60,
        type: 'MC',
        question: 'A hacker tries "password123" as a first guess on a student\'s email and gets in immediately. What mistake did the student make?',
        choices: [
          'Password was too long',
          'Password was common and predictable',
          'Password used too many symbols',
          'Password was stored safely'
        ],
        correctAnswer: 1,
        explanation: '"Password123" is one of the most common passwords that hackers try first. Using predictable, common passwords makes accounts extremely vulnerable.',
        xpValue: 20
      }
    ]
  },
  {
    id: 4,
    title: "Building a Strong Password",
    hasVideo: true,
    questions: [
      {
        id: 61,
        type: 'SR',
        question: 'Your teacher asks you to create a new password. Write one example of a password that would be strong and explain why it is strong.',
        correctAnswer: 'long password with letters numbers and symbols',
        expectedResponse: 'Blue$Rocket!93 – it is long, has letters, numbers, and a symbol, and isn\'t easy to guess.',
        explanation: 'A strong password should be long (12+ characters), use a mix of uppercase and lowercase letters, numbers, and symbols, and be unpredictable rather than based on personal information.',
        xpValue: 15
      },
      {
        id: 62,
        type: 'MC',
        question: 'Which of these passwords is the strongest?',
        choices: [
          'Soccer2024',
          'P!neApp13_Rain!92',
          'Password123',
          'Dragon88'
        ],
        correctAnswer: 1,
        explanation: 'It\'s long, random, and mixes uppercase, lowercase, numbers, and symbols.',
        xpValue: 20
      },
      {
        id: 63,
        type: 'RANKING',
        question: 'Rank these passwords from weakest to strongest:',
        choices: [
          'Pizza123',
          'B3ar!Lemon29',
          'Qwerty',
          '78910'
        ],
        correctAnswer: [2, 3, 0, 1], // Qwerty, 78910, Pizza123, B3ar!Lemon29
        explanation: 'Keyboard patterns are weakest, then number sequences, then predictable words with numbers, and finally complex random combinations are strongest.',
        xpValue: 25
      },
      {
        id: 64,
        type: 'SR',
        question: 'Why is it better to make a password long and complex instead of just complex?',
        correctAnswer: 'because longer passwords take much more time to guess',
        expectedResponse: 'Because longer passwords take much more time to guess, even if hackers use special programs.',
        explanation: 'Length is crucial because each additional character exponentially increases the number of possible combinations, making brute force attacks take significantly longer.',
        xpValue: 15
      },
      {
        id: 65,
        type: 'MC',
        question: 'Two students create passwords: Student A: RainDrop!82, Student B: Giraffe_Pine!28Banana. Which password is stronger, and why?',
        choices: [
          'Student A, because it has a symbol',
          'Student B, because it\'s longer and uses random words',
          'Both are the same strength',
          'Student A, because it\'s easier to remember'
        ],
        correctAnswer: 1,
        explanation: 'Student B\'s password is significantly longer and uses more random elements, making it much harder to crack despite both having good complexity.',
        xpValue: 20
      }
    ]
  },
  {
    id: 5,
    title: "Passphrases Explained",
    hasVideo: true,
    questions: [
      {
        id: 66,
        type: 'SR',
        question: 'Your friend wants to use the password rocketdog123. How could they turn it into a strong passphrase?',
        correctAnswer: 'they could add more random words and symbols',
        expectedResponse: 'They could add more random words and symbols, like RocketDog!Tree92Sun.',
        explanation: 'A strong passphrase combines multiple random words with symbols and numbers, making it both long and unpredictable while potentially easier to remember than random characters.',
        xpValue: 15
      },
      {
        id: 67,
        type: 'MC',
        question: 'Which of these is the best passphrase?',
        choices: [
          'Blue!Monkey_Train#95',
          'Password123',
          'Dog2023',
          'abcdefg'
        ],
        correctAnswer: 0,
        explanation: 'It\'s long, unpredictable, and uses letters, numbers, and symbols.',
        xpValue: 20
      },
      {
        id: 68,
        type: 'RANKING',
        question: 'Rank these from weakest to strongest:',
        choices: [
          'redapple',
          'IceCream!House72',
          'sky',
          'RainForest_Lion!88'
        ],
        correctAnswer: [2, 0, 1, 3], // sky, redapple, IceCream!House72, RainForest_Lion!88
        explanation: 'Single short words are weakest, then compound words, then passphrases with some complexity, and finally long passphrases with symbols and numbers are strongest.',
        xpValue: 25
      },
      {
        id: 69,
        type: 'SR',
        question: 'Why are passphrases often easier to remember than random passwords?',
        correctAnswer: 'because passphrases are made of real words or ideas that make sense together',
        expectedResponse: 'Because passphrases are made of real words or ideas that make sense together, like a mini sentence.',
        explanation: 'Passphrases use real words that our brains can more easily remember and associate with each other, unlike random character strings that have no meaning.',
        xpValue: 15
      },
      {
        id: 70,
        type: 'MC',
        question: 'A student creates Train$Sun89Horse. Why is this a good passphrase?',
        choices: [
          'It is long, uses random words, and has symbols/numbers.',
          'It\'s short and easy.',
          'It uses their birthday.',
          'It is the same as their email password.'
        ],
        correctAnswer: 0,
        explanation: 'This passphrase combines length, randomness, and complexity - it uses unrelated words with symbols and numbers, making it both strong and potentially memorable.',
        xpValue: 20
      }
    ]
  },
  {
    id: 6,
    title: "Why Password Reuse is Dangerous?",
    hasVideo: true,
    questions: [
      {
        id: 71,
        type: 'SR',
        question: 'You use the same password for your game account and your email. If hackers steal the password from the game, what could they do next?',
        correctAnswer: 'they could log in to my email and other accounts that use the same password',
        expectedResponse: 'They could log in to my email and other accounts that use the same password.',
        explanation: 'Password reuse means that one compromised account can lead to many compromised accounts, as hackers will try the same credentials on other popular services.',
        xpValue: 15
      },
      {
        id: 72,
        type: 'MC',
        question: 'Why is password reuse risky even if your password is long and complex?',
        choices: [
          'Long passwords are never hacked.',
          'If one account is hacked, all accounts using it can be hacked too.',
          'Hackers can\'t read passwords from one site.',
          'Companies never get hacked.'
        ],
        correctAnswer: 1,
        explanation: 'Even the strongest password becomes a vulnerability when reused, because a breach at any one service exposes all accounts using that password.',
        xpValue: 20
      },
      {
        id: 73,
        type: 'RANKING',
        question: 'Rank these situations from safest to riskiest:',
        choices: [
          'Each account has a unique strong password',
          'Using the same strong password for two accounts',
          'Using the same weak password for all accounts',
          'Using the same password for three accounts, but with slight changes'
        ],
        correctAnswer: [0, 1, 3, 2], // Unique strong, Same strong for two, Same with slight changes, Same weak for all
        explanation: 'Unique passwords are safest, slight variations offer minimal protection, and weak reused passwords are most dangerous.',
        xpValue: 25
      },
      {
        id: 74,
        type: 'SR',
        question: 'What is one way to make having different passwords for every account easier?',
        correctAnswer: 'using a password manager so i don\'t have to remember them all',
        expectedResponse: 'Using a password manager so I don\'t have to remember them all.',
        explanation: 'Password managers solve the complexity of using unique passwords by securely storing and auto-filling different passwords for each account.',
        xpValue: 15
      },
      {
        id: 75,
        type: 'MC',
        question: 'A hacker steals one password from a music app and tries the same password on email and social media accounts. What is this type of attack called?',
        choices: [
          'Phishing',
          'Credential Stuffing',
          'Brute Force',
          'Spyware'
        ],
        correctAnswer: 1,
        explanation: 'Credential stuffing is when hackers use stolen username/password combinations from one breach to try accessing accounts on other services.',
        xpValue: 20
      }
    ]
  },
  {
    id: 7,
    title: "Multi-Factor Authentication",
    hasVideo: true,
    questions: [
      {
        id: 76,
        type: 'SR',
        question: 'Your email requires you to type a code sent to your phone after you log in with your password. Why is this safer than just using a password?',
        correctAnswer: 'because even if someone knows my password, they still need my phone to get in',
        expectedResponse: 'Because even if someone knows my password, they still need my phone to get in.',
        explanation: 'Multi-factor authentication requires multiple forms of verification, so even if one factor (password) is compromised, the account remains protected by the second factor.',
        xpValue: 15
      },
      {
        id: 77,
        type: 'MC',
        question: 'Which of these is NOT an example of MFA?',
        choices: [
          'Typing a code texted to your phone',
          'Using a fingerprint scan',
          'Getting an email verification code',
          'Only using a password'
        ],
        correctAnswer: 3,
        explanation: 'MFA requires multiple factors for authentication. Using only a password is single-factor authentication, not multi-factor.',
        xpValue: 20
      },
      {
        id: 78,
        type: 'SR',
        question: 'Which account is more secure? Account A: A strong password but no MFA. Account B: A weaker password but MFA enabled.',
        correctAnswer: 'account b because mfa adds an extra lock even if the password isn\'t perfect',
        expectedResponse: 'Account B, because MFA adds an extra lock even if the password isn\'t perfect.',
        explanation: 'While strong passwords are important, MFA provides additional security that often outweighs password strength alone, as it requires attackers to compromise multiple factors.',
        xpValue: 15
      },
      {
        id: 79,
        type: 'SR',
        question: 'Give one real-life example of something you have that can be used for MFA.',
        correctAnswer: 'my phone',
        expectedResponse: 'My phone, a security key, or a special code sent to me.',
        explanation: 'Common MFA factors include phones (for SMS or app codes), biometrics (fingerprints), hardware keys, or authenticator apps that generate time-based codes.',
        xpValue: 15
      },
      {
        id: 80,
        type: 'MC',
        question: 'A hacker guesses your password correctly but doesn\'t have your phone for the code. What happens?',
        choices: [
          'They can\'t log in because MFA blocks them.',
          'They get in anyway because they know the password.',
          'They can just skip the code.',
          'They can\'t ever try again.'
        ],
        correctAnswer: 0,
        explanation: 'MFA requires all factors to be successful. Without access to the second factor (phone), the hacker cannot complete the login process.',
        xpValue: 20
      }
    ]
  },
  {
    id: 8,
    title: "Safe Password Storage and Sharing",
    hasVideo: true,
    questions: [
      {
        id: 81,
        type: 'SR',
        question: 'Your friend asks for your school account password so they can "just check something quickly." What should you do, and why?',
        correctAnswer: 'i should not share my password because they could misuse my account',
        expectedResponse: 'I should not share my password because they could misuse my account, and I\'m responsible for it.',
        explanation: 'Passwords should never be shared because you remain responsible for all activity on your account, and sharing passwords violates most security policies.',
        xpValue: 15
      },
      {
        id: 82,
        type: 'MC',
        question: 'Which is the best way to store your passwords?',
        choices: [
          'Writing them on sticky notes near your computer',
          'Saving them in a text file named "passwords"',
          'Using a password manager or remembering them',
          'Telling them to your friends so you don\'t forget'
        ],
        correctAnswer: 2,
        explanation: 'Password managers provide secure, encrypted storage for passwords, while physical notes and unencrypted files are easily accessible to others.',
        xpValue: 20
      },
      {
        id: 83,
        type: 'SR',
        question: 'Why is it risky to save your passwords in a web browser without any extra security?',
        correctAnswer: 'because someone who uses your computer could log in to your accounts',
        expectedResponse: 'Because someone who uses your computer could log in to your accounts without needing your password.',
        explanation: 'Browser-saved passwords are often easily accessible to anyone who can use your computer, and may not have strong encryption or master password protection.',
        xpValue: 15
      },
      {
        id: 84,
        type: 'MC',
        question: 'Your classmate takes a photo of their written password list and saves it on their phone. What is the biggest risk?',
        choices: [
          'They will forget the photo exists.',
          'If someone steals their phone, they get every password.',
          'They will lose the passwords forever.',
          'The photo will delete itself.'
        ],
        correctAnswer: 1,
        explanation: 'Storing password photos on phones creates a single point of failure - if the phone is lost, stolen, or hacked, all passwords are immediately compromised.',
        xpValue: 20
      },
      {
        id: 85,
        type: 'SR',
        question: 'What should you do if you think someone knows your password?',
        correctAnswer: 'change the password immediately and tell a trusted adult',
        expectedResponse: 'Change the password immediately and tell a trusted adult or the teacher/IT staff if it\'s for school.',
        explanation: 'Quick action is essential when passwords are compromised. Change the password immediately and report the incident to appropriate authorities who can help secure other accounts.',
        xpValue: 15
      }
    ]
  },
  {
    id: 9,
    title: "Password Managers",
    hasVideo: true,
    questions: [
      {
        id: 86,
        type: 'SR',
        question: 'Why might someone use a password manager instead of trying to remember every password?',
        correctAnswer: 'because it can create and store strong passwords so you don\'t have to remember them all',
        expectedResponse: 'Because it can create and store strong passwords so you don\'t have to remember them all.',
        explanation: 'Password managers eliminate the human limitation of remembering many complex passwords while enabling the use of unique, strong passwords for every account.',
        xpValue: 15
      },
      {
        id: 87,
        type: 'MC',
        question: 'Which is a main benefit of a password manager?',
        choices: [
          'It guesses other people\'s passwords.',
          'It keeps all passwords the same.',
          'It securely stores different strong passwords for each account.',
          'It writes passwords on paper.'
        ],
        correctAnswer: 2,
        explanation: 'The primary benefit of password managers is enabling unique, strong passwords for every account while securely storing them with encryption.',
        xpValue: 20
      },
      {
        id: 88,
        type: 'SR',
        question: 'Why is it safer to let a password manager create passwords for you instead of making your own?',
        correctAnswer: 'because it can make long, random passwords that hackers can\'t guess easily',
        expectedResponse: 'Because it can make long, random passwords that hackers can\'t guess easily.',
        explanation: 'Password managers generate truly random passwords without the predictable patterns that humans naturally create, making them much harder for attackers to guess.',
        xpValue: 15
      },
      {
        id: 89,
        type: 'MC',
        question: 'Your friend says, "Password managers are unsafe because if someone hacks it, they get every password." What is the best reply?',
        choices: [
          'You\'re right—never use them.',
          'Password managers don\'t lock at all.',
          'They are encrypted and protected by one strong master password.',
          'They guess passwords for you.'
        ],
        correctAnswer: 2,
        explanation: 'Reputable password managers use strong encryption and are protected by a master password, making them much safer than reusing weak passwords across multiple accounts.',
        xpValue: 20
      },
      {
        id: 90,
        type: 'SR',
        question: 'What is one thing you must always do if you use a password manager?',
        correctAnswer: 'use a very strong master password and never share it',
        expectedResponse: 'Use a very strong master password and never share it.',
        explanation: 'The master password is the key to all your stored passwords, so it must be extremely strong and never shared, as it protects your entire digital life.',
        xpValue: 15
      }
    ]
  },
  {
    id: 10,
    title: "What to do after a password leak",
    hasVideo: true,
    questions: [
      {
        id: 91,
        type: 'SR',
        question: 'You find out that a game you play had its passwords leaked online. What is the first thing you should do, and why?',
        correctAnswer: 'change my password right away because hackers could use it to log in',
        expectedResponse: 'Change my password right away because hackers could use it to log in to my account.',
        explanation: 'Time is critical after a breach. Changing your password immediately prevents hackers from using the leaked credentials to access your account.',
        xpValue: 15
      },
      {
        id: 92,
        type: 'MC',
        question: 'Why should you change your password on other accounts if you used the same one?',
        choices: [
          'To make the password easier to remember',
          'Because hackers can try the leaked password on all your accounts',
          'Because the old password is unlucky',
          'Because the site will delete your account'
        ],
        correctAnswer: 1,
        explanation: 'Hackers often use leaked passwords to attempt credential stuffing attacks on other popular services, trying the same credentials everywhere.',
        xpValue: 20
      },
      {
        id: 93,
        type: 'SR',
        question: 'Why is it helpful to turn on MFA (multi-factor authentication) after a password leak?',
        correctAnswer: 'because mfa adds an extra layer of security so hackers can\'t log in even if they have the password',
        expectedResponse: 'Because MFA adds an extra layer of security so hackers can\'t log in even if they have the password.',
        explanation: 'MFA provides crucial additional protection after a breach, ensuring that even if hackers have your password, they still cannot access your account without the second factor.',
        xpValue: 15
      },
      {
        id: 94,
        type: 'MC',
        question: 'A company emails you saying your password was part of a data breach. What is the best response?',
        choices: [
          'Ignore it—nothing will happen.',
          'Change the password immediately and turn on MFA if possible.',
          'Post about it on social media.',
          'Use the same password again.'
        ],
        correctAnswer: 1,
        explanation: 'Immediate action is essential: change the compromised password and enable additional security measures like MFA to protect your account.',
        xpValue: 20
      },
      {
        id: 95,
        type: 'SR',
        question: 'What is one thing you can do to protect yourself in the future from password leaks?',
        correctAnswer: 'use a unique password for each account or use a password manager',
        expectedResponse: 'Use a unique password for each account or use a password manager so I don\'t reuse passwords.',
        explanation: 'Using unique passwords for each account ensures that a breach at one service cannot compromise your other accounts, limiting the damage from any single leak.',
        xpValue: 15
      }
    ]
  }
];

// Helper function to check short response answers with more lenient matching
export const checkShortResponseAnswer = (userAnswer: string, correctAnswer: string, expectedResponse?: string): boolean => {
  if (!userAnswer || typeof userAnswer !== 'string') return false;
  
  const userLower = userAnswer.toLowerCase().trim();
  const correctLower = correctAnswer.toLowerCase().trim();
  const expectedLower = expectedResponse?.toLowerCase().trim() || '';
  
  // Check for exact match first
  if (userLower === correctLower || userLower === expectedLower) return true;
  
  // For Unit 2 - Password-related questions - more flexible keyword matching
  const unit2Keywords: Record<string, string[]> = {
    // Password importance keywords
    'important': ['security', 'protect', 'safety', 'lock', 'guard', 'safe'],
    'hacker': ['criminal', 'attacker', 'bad person', 'thief', 'scammer'],
    'password': ['key', 'lock', 'code', 'access'],
    'account': ['profile', 'login', 'email', 'social media'],
    
    // Password creation keywords
    'strong': ['secure', 'good', 'safe', 'complex', 'difficult'],
    'weak': ['bad', 'easy', 'simple', 'unsafe', 'poor'],
    'long': ['longer', 'length', 'many characters'],
    'random': ['unpredictable', 'mixed', 'different', 'varied'],
    
    // Attack methods
    'guess': ['crack', 'break', 'figure out', 'find out'],
    'common': ['popular', 'typical', 'usual', 'predictable'],
    'personal': ['private', 'about me', 'my info', 'information'],
    
    // Security concepts
    'unique': ['different', 'separate', 'distinct', 'individual'],
    'reuse': ['same', 'repeat', 'duplicate', 'copy'],
    'manager': ['app', 'tool', 'program', 'software'],
    'mfa': ['two factor', '2fa', 'verification', 'extra step', 'second step']
  };
  
  // Check if answer contains key concepts
  let keywordMatches = 0;
  const totalKeywords = Object.keys(unit2Keywords).length;
  
  for (const [concept, synonyms] of Object.entries(unit2Keywords)) {
    if (userLower.includes(concept) || synonyms.some(synonym => userLower.includes(synonym))) {
      keywordMatches++;
    }
  }
  
  // Also check against expected response keywords
  if (expectedResponse) {
    const expectedWords = expectedLower.split(' ').filter(word => word.length > 3);
    for (const word of expectedWords) {
      if (userLower.includes(word)) {
        keywordMatches++;
      }
    }
  }
  
  // Accept answer if it contains relevant concepts (more lenient than Unit 1)
  return keywordMatches >= 2 || userLower.length > 50; // Longer responses are often thoughtful
};