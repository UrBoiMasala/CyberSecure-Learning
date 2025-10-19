// Unit 1: What is Cybersecurity? - Complete Overhaul
// 9 subtopics with comprehensive question sets

export interface Question {
  id: number;
  type: 'MC' | 'SR' | 'MATCH' | 'RANKING';
  question: string;
  choices?: string[];
  correctAnswer: any;
  expectedResponse?: string; // For flexible SR checking
  explanation: string;
  xpValue: number;
}

export interface SubTopic {
  id: number;
  title: string;
  questions: Question[];
  hasVideo?: boolean;
}

// Helper function to check if short response is close enough
export function checkShortResponseAnswer(userAnswer: string, expectedAnswer: string, expectedResponse?: string): boolean {
  const normalizeText = (text: string) => text.toLowerCase().trim().replace(/[^\w\s]/g, '');
  
  const userNormalized = normalizeText(userAnswer);
  const expectedNormalized = normalizeText(expectedAnswer);
  const responseNormalized = expectedResponse ? normalizeText(expectedResponse) : '';
  
  // Check exact match first
  if (userNormalized === expectedNormalized) return true;
  
  // Check against expected response if provided
  if (expectedResponse && userNormalized === responseNormalized) return true;
  
  // More lenient checking - split into key concepts
  const expectedWords = expectedNormalized.split(/\s+/).filter(word => word.length > 2);
  const responseWords = responseNormalized ? responseNormalized.split(/\s+/).filter(word => word.length > 2) : [];
  const userWords = userNormalized.split(/\s+/).filter(word => word.length > 2);
  
  // Combine all key words from expected answer and response
  const allKeyWords = [...new Set([...expectedWords, ...responseWords])];
  
  // Check for partial matches and synonyms
  const matchingWords = allKeyWords.filter(keyWord => {
    return userWords.some(userWord => {
      // Direct match or contains
      if (userWord.includes(keyWord) || keyWord.includes(userWord)) return true;
      
      // Common synonyms and variations
      const synonyms: Record<string, string[]> = {
        'data': ['information', 'info', 'content', 'files'],
        'information': ['data', 'info', 'content', 'files'],
        'network': ['connection', 'internet', 'system'],
        'protect': ['secure', 'guard', 'defend', 'safety', 'safe'],
        'hacker': ['attacker', 'cybercriminal', 'criminal'],
        'password': ['passcode', 'login', 'credentials'],
        'private': ['personal', 'secret', 'confidential'],
        'steal': ['take', 'theft', 'rob', 'grab']
      };
      
      // Check if user word is a synonym of the key word
      if (synonyms[keyWord]?.includes(userWord)) return true;
      if (synonyms[userWord]?.includes(keyWord)) return true;
      
      return false;
    });
  });
  
  // Accept answer if it has at least 30% of key concepts (more lenient)
  const threshold = Math.max(1, Math.ceil(allKeyWords.length * 0.3));
  return matchingWords.length >= threshold;
}

export const unit1Data: SubTopic[] = [
  {
    id: 1,
    title: "Digital World & Assets",
    hasVideo: true,
    questions: [
      {
        id: 1,
        type: 'SR',
        question: "You're on a friend's tablet playing a game. It asks you to enter your full name and birthday to save your score. What should you do, and why?",
        correctAnswer: "I should say no or ask an adult because my name and birthday are private information",
        expectedResponse: "say no ask adult private information",
        explanation: "Personal information should be protected, even in games.",
        xpValue: 12
      },
      {
        id: 2,
        type: 'RANKING',
        question: "Rank these four types of data from least important to protect to most important to protect:",
        choices: [
          "Your high score in a game",
          "Your pet's name", 
          "Your school login password",
          "Your full name and birthday"
        ],
        correctAnswer: [1, 0, 3, 2], // Pet's name, Game score, Name/birthday, School password
        explanation: "Passwords are most critical, then personal info, then less sensitive data.",
        xpValue: 15
      },
      {
        id: 3,
        type: 'SR',
        question: "In your own words, explain what 'data' means.",
        correctAnswer: "Data is information that is stored or shared on computers or devices, like pictures, messages, or files",
        expectedResponse: "information stored computers devices pictures messages files",
        explanation: "Data is any information we use with technology.",
        xpValue: 12
      },
      {
        id: 4,
        type: 'MC',
        question: "Your school uses a printer that every classroom laptop can connect to. Why did your school set it up this way?",
        choices: [
          "To decorate the printer.",
          "To keep laptops separate.", 
          "So all devices share the printer using a network.",
          "So each teacher can buy their own printer."
        ],
        correctAnswer: 2,
        explanation: "Networks allow devices to share resources efficiently.",
        xpValue: 10
      },
      {
        id: 5,
        type: 'SR',
        question: "Explain why a network is like a road or highway.",
        correctAnswer: "A network is like a road because it lets data travel between devices, like cars travel between cities",
        expectedResponse: "network road data travel devices cars cities highway",
        explanation: "Both networks and roads connect different places and allow movement.",
        xpValue: 12
      }
    ]
  },
  {
    id: 2,
    title: "Why We Protect - CIA Triad",
    questions: [
      {
        id: 6,
        type: 'SR',
        question: "Someone sneaks into your school account and changes your grades without permission. Which part of the CIA Triad is broken, and why?",
        correctAnswer: "Integrity, because my information was changed when it shouldn't have been",
        expectedResponse: "integrity information changed shouldnt",
        explanation: "Integrity means data stays accurate and unchanged.",
        xpValue: 12
      },
      {
        id: 7,
        type: 'RANKING',
        question: "Rank these actions based on which protects Confidentiality, from strongest to weakest:",
        choices: [
          "Using a long password",
          "Keeping your password secret",
          "Not locking your screen", 
          "Sharing your password with a friend"
        ],
        correctAnswer: [1, 0, 2, 3], // Keep secret, Long password, Not locking, Sharing
        explanation: "Keeping secrets is most important, then making them strong.",
        xpValue: 15
      },
      {
        id: 8,
        type: 'SR',
        question: "Explain in your own words what Availability means in cybersecurity.",
        correctAnswer: "Availability means that information or services are ready and working when people need them",
        expectedResponse: "availability information services ready working when needed",
        explanation: "Systems must be accessible when authorized users need them.",
        xpValue: 12
      },
      {
        id: 9,
        type: 'MC',
        question: "A hospital system is hacked and doctors can't open patient records during an emergency. Which CIA Triad part failed?",
        choices: [
          "Confidentiality",
          "Availability", 
          "Integrity",
          "None"
        ],
        correctAnswer: 1,
        explanation: "The system is unavailable when needed most.",
        xpValue: 10
      },
      {
        id: 10,
        type: 'SR',
        question: "Your school locks important files in a special folder so only teachers can open it. Which part of the CIA Triad are they protecting, and why?",
        correctAnswer: "They're protecting Confidentiality, so that only people allowed to see the files can open them",
        expectedResponse: "confidentiality only people allowed see files open",
        explanation: "Access controls protect confidential information.",
        xpValue: 12
      }
    ]
  },
  {
    id: 3,
    title: "Data Types & Classification",
    questions: [
      {
        id: 11,
        type: 'SR',
        question: "Your favorite game asks you to enter your pet's name. Is this sensitive data? Why or why not?",
        correctAnswer: "No, because my pet's name is not private or important information. It doesn't identify me",
        expectedResponse: "no pets name not private important identify",
        explanation: "Pet names are generally not sensitive personal information.",
        xpValue: 12
      },
      {
        id: 12,
        type: 'RANKING',
        question: "Rank these types of data from least valuable to most valuable to a hacker:",
        choices: [
          "Your favorite color",
          "Your email address",
          "Your home address", 
          "Your password"
        ],
        correctAnswer: [0, 1, 2, 3], // Color, Email, Address, Password
        explanation: "Passwords give direct access, addresses enable targeting, emails allow contact.",
        xpValue: 15
      },
      {
        id: 13,
        type: 'MC',
        question: "Which of these is an example of personal and sensitive data that should be kept private?",
        choices: [
          "The school mascot",
          "Your top game score",
          "Your full name and birthdate",
          "Your favorite snack"
        ],
        correctAnswer: 2,
        explanation: "Name and birthdate can identify you personally.",
        xpValue: 10
      },
      {
        id: 14,
        type: 'SR',
        question: "In your own words, explain why a hacker might steal student IDs or school records, even though students don't have money.",
        correctAnswer: "So they can use the information later to pretend to be someone else or steal identities",
        expectedResponse: "use information later pretend someone else steal identities",
        explanation: "Identity theft can happen to anyone, including students.",
        xpValue: 12
      },
      {
        id: 15,
        type: 'MATCH',
        question: "Match each type of data to the correct category:",
        correctAnswer: {
          "Your school's public website": "Public Data",
          "Your report card": "Sensitive Data",
          "Your school login password": "Private Data",
          "Your favorite sports team": "Public Data"
        },
        explanation: "Different data types need different levels of protection.",
        xpValue: 15
      }
    ]
  },
  {
    id: 4,
    title: "Threat Actors & Motives",
    questions: [
      {
        id: 16,
        type: 'SR',
        question: "A hacker breaks into a video game company's servers to steal unreleased games and post them online for everyone. What do you think their motive was, and why?",
        correctAnswer: "To show off or gain fame by leaking secret games",
        expectedResponse: "show off gain fame leaking secret games",
        explanation: "Some hackers seek attention and recognition.",
        xpValue: 12
      },
      {
        id: 17,
        type: 'MATCH',
        question: "Match each type of threat actor to why they might attack:",
        correctAnswer: {
          "Script Kiddie": "Uses easy tools for fun or to cause chaos",
          "Hacktivist": "Hacks to protest or spread a message", 
          "Insider Threat": "Someone inside a company who misuses access",
          "Cybercriminal": "Hacks to make money"
        },
        explanation: "Different attackers have different motivations.",
        xpValue: 15
      },
      {
        id: 18,
        type: 'MC',
        question: "A person works at a school and secretly gives hackers the school's Wi-Fi password. What kind of threat actor are they?",
        choices: [
          "Cybercriminal",
          "Insider Threat",
          "Hacktivist", 
          "Script Kiddie"
        ],
        correctAnswer: 1,
        explanation: "They have inside access and are misusing it.",
        xpValue: 10
      },
      {
        id: 19,
        type: 'SR',
        question: "Why can even beginner hackers (script kiddies) cause real damage?",
        correctAnswer: "Because they use powerful tools made by other hackers, even if they don't understand them",
        expectedResponse: "use powerful tools made other hackers dont understand",
        explanation: "Dangerous tools are easily available online.",
        xpValue: 12
      },
      {
        id: 20,
        type: 'SR',
        question: "If a hacker demands money from a school to unlock its computers, are they motivated by: Money, Fame, Fun, or Protest? Explain your choice.",
        correctAnswer: "Money, because they're trying to get paid to unlock the computers",
        expectedResponse: "money trying get paid unlock computers",
        explanation: "Ransomware attacks are primarily financially motivated.",
        xpValue: 12
      }
    ]
  },
  {
    id: 5,
    title: "Common Attack Methods",
    questions: [
      {
        id: 21,
        type: 'SR',
        question: "Your friend gets an email saying, 'Click here to win a free iPad!' What type of cyber attack is this, and how does it try to trick people?",
        correctAnswer: "It's a phishing attack. It tries to trick people by offering a prize to make them click",
        expectedResponse: "phishing attack trick people offering prize make click",
        explanation: "Phishing uses enticing offers to lure victims.",
        xpValue: 12
      },
      {
        id: 22,
        type: 'MATCH',
        question: "Match each cyber attack to what it tries to do:",
        correctAnswer: {
          "Phishing": "Tricks people into giving information",
          "DDoS Attack": "Overloads a website to shut it down",
          "Malware": "Damages or controls devices",
          "Password Guessing": "Tries to unlock accounts"
        },
        explanation: "Each attack method has a specific goal.",
        xpValue: 15
      },
      {
        id: 23,
        type: 'MC',
        question: "A popular website suddenly shuts down for everyone because it gets too many fake requests at once. What type of attack is this?",
        choices: [
          "Phishing",
          "Malware",
          "DDoS Attack",
          "Password Guessing"
        ],
        correctAnswer: 2,
        explanation: "DDoS attacks overwhelm systems with traffic.",
        xpValue: 10
      },
      {
        id: 24,
        type: 'SR',
        question: "Why is phishing dangerous, even though it doesn't break into your computer directly?",
        correctAnswer: "Because it tricks people into giving their passwords or private information by themselves",
        expectedResponse: "tricks people giving passwords private information themselves",
        explanation: "Social engineering exploits human psychology.",
        xpValue: 12
      },
      {
        id: 25,
        type: 'SR',
        question: "Imagine you're playing an online game and someone sends you a strange file, saying it will give you free coins if you open it. What should you do, and why?",
        correctAnswer: "I should not open the file, because it could be malware trying to hurt my device or steal my information",
        expectedResponse: "not open file malware hurt device steal information",
        explanation: "Unknown files from strangers are high-risk.",
        xpValue: 12
      }
    ]
  },
  {
    id: 6,
    title: "Layers of Defense",
    questions: [
      {
        id: 26,
        type: 'SR',
        question: "Your house has a front door lock, a security camera, and a fence around the yard. Why is having more than one layer of protection a smart idea?",
        correctAnswer: "Because if one layer fails, like the door is unlocked, the others can still help protect the house",
        expectedResponse: "one layer fails door unlocked others help protect house",
        explanation: "Defense in depth provides redundancy.",
        xpValue: 12
      },
      {
        id: 27,
        type: 'MATCH',
        question: "Match each defense to the correct layer:",
        correctAnswer: {
          "Password": "Device Layer",
          "Firewall": "Network Layer", 
          "Security Training": "Human Layer",
          "Locking the server room door": "Physical Layer"
        },
        explanation: "Security works at multiple levels.",
        xpValue: 15
      },
      {
        id: 28,
        type: 'MC',
        question: "Why is teaching people about online safety considered part of cybersecurity defenses?",
        choices: [
          "Because people are the problem",
          "Because people can stop attacks by making smart choices",
          "Because robots protect better",
          "Because training adds more passwords"
        ],
        correctAnswer: 1,
        explanation: "Educated users are a strong defense layer.",
        xpValue: 10
      },
      {
        id: 29,
        type: 'SR',
        question: "Why might a company that only uses passwords but no backups or firewalls be at risk?",
        correctAnswer: "Because if someone guesses the password or it gets stolen, there's nothing else to protect the data",
        expectedResponse: "someone guesses password stolen nothing else protect data",
        explanation: "Single points of failure are dangerous.",
        xpValue: 12
      },
      {
        id: 30,
        type: 'SR',
        question: "You're in charge of securing a computer lab. You can only pick two defenses from: Passwords on each computer, Locked door to the lab, A firewall on the network, Training students to recognize scams. Which two would you choose, and why?",
        correctAnswer: "Any reasonable combination with explanation",
        expectedResponse: "passwords locked door firewall training explanation",
        explanation: "Multiple valid answers exist - look for sound reasoning.",
        xpValue: 12
      }
    ]
  },
  {
    id: 7,
    title: "Usability vs Security",
    questions: [
      {
        id: 31,
        type: 'SR',
        question: "Your school laptop locks every 10 seconds, and you have to type a 25-character password each time. Why could this be a bad idea, even if it's secure?",
        correctAnswer: "Because it's too annoying. People might stop using the security or choose weak passwords just to make it easier",
        expectedResponse: "too annoying people stop using security choose weak passwords easier",
        explanation: "Excessive security can lead to poor practices.",
        xpValue: 12
      },
      {
        id: 32,
        type: 'MC',
        question: "Your teacher wants to protect classroom tablets but not slow down lessons. Which two security options together would be the best balance of usability and security?",
        choices: [
          "No passwords at all",
          "4-digit PIN + auto-lock after 2 minutes",
          "Password changing every hour",
          "Fingerprint unlock + daily password reset"
        ],
        correctAnswer: 1,
        explanation: "Simple but effective security doesn't disrupt workflow.",
        xpValue: 10
      },
      {
        id: 33,
        type: 'SR',
        question: "Why does too much security sometimes create new risks?",
        correctAnswer: "Because people might try to avoid the security if it's too hard, like writing down passwords or turning off settings",
        expectedResponse: "people avoid security too hard writing passwords turning off settings",
        explanation: "Users will find workarounds for inconvenient security.",
        xpValue: 12
      },
      {
        id: 34,
        type: 'SR',
        question: "You're making a login system for a kids' gaming website. What is one rule you would set to make sure it's both safe and easy for kids to use?",
        correctAnswer: "Use a short but strong password and allow remembering the device so they don't need to log in every time",
        expectedResponse: "short strong password remember device dont login every time",
        explanation: "Balance security with user experience.",
        xpValue: 12
      },
      {
        id: 35,
        type: 'MC',
        question: "A school bans all internet access to stop hacking. Why might this not be a good cybersecurity plan?",
        choices: [
          "It keeps hackers out, so it's perfect.",
          "Students can't learn or do their work online.",
          "It makes websites load faster.",
          "It only protects devices at home."
        ],
        correctAnswer: 1,
        explanation: "Over-restrictive security can prevent legitimate activities.",
        xpValue: 10
      }
    ]
  },
  {
    id: 8,
    title: "Digital Ethics",
    questions: [
      {
        id: 36,
        type: 'SR',
        question: "Your classmate forgets to log out of their school account on a shared computer. You notice it's open. What is the right thing to do, and why?",
        correctAnswer: "I should log them out and tell the teacher, because it's wrong to read or use someone else's account",
        expectedResponse: "log them out tell teacher wrong read use someone else account",
        explanation: "Respecting others' privacy is ethical behavior.",
        xpValue: 12
      },
      {
        id: 37,
        type: 'MC',
        question: "Which action is ethical and legal?",
        choices: [
          "Sharing answers from a hacked test",
          "Pretending to be a teacher to prank someone",
          "Reporting a found problem to an adult or website",
          "Sending fake links to friends for fun"
        ],
        correctAnswer: 2,
        explanation: "Responsible disclosure helps everyone stay safe.",
        xpValue: 10
      },
      {
        id: 38,
        type: 'SR',
        question: "Why is it unfair to use someone's personal pictures or messages without asking them first?",
        correctAnswer: "Because it's their private information and sharing it without permission could hurt them or embarrass them",
        expectedResponse: "private information sharing without permission hurt embarrass",
        explanation: "Consent is crucial for personal content.",
        xpValue: 12
      },
      {
        id: 39,
        type: 'SR',
        question: "A game lets you report players who cheat or bully. Your friend asks you to ignore someone breaking the rules because 'it's no big deal.' What would you do, and why?",
        correctAnswer: "I would report the player anyway because following rules keeps the game safe and fair for everyone",
        expectedResponse: "report player anyway following rules keeps game safe fair everyone",
        explanation: "Maintaining community standards benefits everyone.",
        xpValue: 12
      },
      {
        id: 40,
        type: 'MATCH',
        question: "Drag each action into 'RIGHT' or 'WRONG':",
        correctAnswer: {
          "RIGHT": ["Reporting a security problem to your school", "Asking permission before sharing a photo of a friend"],
          "WRONG": ["Using a friend's password to log into their account", "Copying someone's art and claiming it as yours"]
        },
        explanation: "Ethical behavior respects others' rights and property.",
        xpValue: 15
      }
    ]
  },
  {
    id: 9,
    title: "Careers in Cyber",
    questions: [
      {
        id: 41,
        type: 'SR',
        question: "Why do you think companies hire ethical hackers, called 'white-hat hackers'?",
        correctAnswer: "To find and fix problems before bad hackers find them",
        expectedResponse: "find fix problems before bad hackers find",
        explanation: "Proactive security testing prevents attacks.",
        xpValue: 12
      },
      {
        id: 42,
        type: 'MATCH',
        question: "Match each job to what that person does:",
        correctAnswer: {
          "Penetration Tester": "Tries to break into systems (legally) to find weaknesses",
          "Security Awareness Trainer": "Teaches people how to stay safe online",
          "Incident Responder": "Solves problems during cyber attacks", 
          "Policy Writer": "Makes rules about digital safety"
        },
        explanation: "Cybersecurity has many different specializations.",
        xpValue: 15
      },
      {
        id: 43,
        type: 'MC',
        question: "A school's computers all get locked by ransomware. Which cybersecurity expert should be called first?",
        choices: [
          "Game developer",
          "Incident Responder",
          "Graphic designer", 
          "Web page editor"
        ],
        correctAnswer: 1,
        explanation: "Incident responders handle active security crises.",
        xpValue: 10
      },
      {
        id: 44,
        type: 'SR',
        question: "If you were a cybersecurity expert, would you rather teach people how to stay safe, or try to break into systems like a hacker to test them? Why?",
        correctAnswer: "Either answer with clear reasoning",
        expectedResponse: "teach people stay safe break systems test clear reasoning",
        explanation: "Both roles are valuable - look for thoughtful reasoning.",
        xpValue: 12
      },
      {
        id: 45,
        type: 'MC',
        question: "What skill might be useful for someone working in cybersecurity?",
        choices: [
          "Being good at swimming",
          "Drawing cartoons",
          "Solving puzzles and thinking logically",
          "Running fast"
        ],
        correctAnswer: 2,
        explanation: "Cybersecurity requires analytical and problem-solving skills.",
        xpValue: 10
      }
    ]
  }
];