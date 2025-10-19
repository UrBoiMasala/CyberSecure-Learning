export interface Unit5Question {
  id: number;
  type: 'multiple-choice' | 'short-answer' | 'matching' | 'sorting' | 'ordering' | 'true-false' | 'ranking';
  question: string;
  options?: string[];
  correctAnswer?: string | string[] | { [key: string]: string | string[] };
  explanation: string;
  points: number;
}

export interface Unit5SubTopic {
  id: number;
  title: string;
  description: string;
  questions: Unit5Question[];
  hasVideo: boolean;
}

// Helper function to check short answers for Unit 5
export function checkUnit5ShortAnswer(userAnswer: string, questionId: number): boolean {
  const normalizedAnswer = userAnswer.toLowerCase().trim();
  
  const expectedAnswers: { [key: number]: string[] } = {
    1: ["risky", "dangerous", "unsafe", "strangers", "see", "posts", "personal", "information", "public", "anyone"],
    5: ["regret", "personal", "photos", "public", "everyone", "see", "private", "strangers", "unwanted", "contact"],
    7: ["unsafe", "risky", "school", "name", "visible", "location", "find", "identify", "jersey", "stranger"],
    12: ["trust", "scammers", "real", "trick", "people", "believe", "gain", "confidence", "fake"],
    16: ["block", "stranger", "tell", "adult", "don't", "share", "city", "location", "refuse"],
    20: ["trust", "personal", "info", "information", "strangers", "gain", "confidence", "trick", "comfortable"],
    22: ["help", "support", "tell", "adult", "teacher", "report", "friend", "bullied", "encourage"],
    24: ["evidence", "proof", "show", "adult", "report", "bullying", "screenshots", "document"],
    27: ["reputation", "permanent", "future", "jobs", "schools", "see", "posts", "digital", "footprint", "character"],
    32: ["shocking", "promises", "prizes", "click", "attention", "trick", "people", "scam", "exciting"],
    36: ["balance", "sleep", "relationships", "health", "addiction", "time", "offline", "activities", "breaks"],
    41: ["location", "real-time", "current", "risky", "dangerous", "strangers", "find", "know", "where", "unsafe"],
    47: ["exit", "leave", "tell", "adult", "scary", "uncomfortable", "report", "block", "stop"],
    50: ["adult", "help", "experience", "report", "support", "better", "handle", "problem", "trust"]
  };

  const expected = expectedAnswers[questionId] || [];
  return expected.some(keyword => normalizedAnswer.includes(keyword));
}

export const unit5SubTopics: Unit5SubTopic[] = [
  {
    id: 41,
    title: "Understanding Privacy on Social Media",
    description: "Learn how privacy settings protect your personal information online",
    hasVideo: true,
    questions: [
      {
        id: 1,
        type: 'short-answer',
        question: "Your friend keeps their account public so anyone can see their posts. Explain why this could be risky.",
        explanation: "Public accounts allow strangers to see personal information, photos, and activities, which could be used to find, contact, or harm someone.",
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: "Which setting gives you the most control over who sees your posts?",
        options: [
          "Public account",
          "Private account", 
          "Posting without a setting",
          "No difference"
        ],
        correctAnswer: "Private account",
        explanation: "Private accounts require approval before people can follow and see your posts, giving you control over your audience.",
        points: 10
      },
      {
        id: 3,
        type: 'matching',
        question: "Match each account type to its description:",
        correctAnswer: {
          "Private account": "Only approved people see your posts",
          "Public account": "Everyone can see your posts", 
          "Custom settings": "Choose who sees each post"
        },
        explanation: "Understanding different privacy levels helps you choose the right protection for your content.",
        points: 15
      },
      {
        id: 4,
        type: 'ordering',
        question: "Put these steps in order to make an account private:",
        options: [
          "Open account settings",
          "Go to privacy options", 
          "Change to private",
          "Remove followers you don't know"
        ],
        correctAnswer: ["Open account settings", "Go to privacy options", "Change to private", "Remove followers you don't know"],
        explanation: "Following these steps in order ensures your account is properly secured.",
        points: 15
      },
      {
        id: 5,
        type: 'short-answer',
        question: "Why might someone regret having a public account after posting personal photos?",
        explanation: "Personal photos on public accounts can be seen by anyone, potentially leading to unwanted contact, harassment, or misuse of images.",
        points: 10
      }
    ]
  },
  {
    id: 42,
    title: "Sharing Personal Information Safely",
    description: "Learn what information is safe to share and what should stay private",
    hasVideo: true,
    questions: [
      {
        id: 6,
        type: 'sorting',
        question: "Sort these into Safe or Unsafe to share:",
        options: [
          "Favorite movie",
          "Full home address",
          "Birthday", 
          "Pet picture (no tags)"
        ],
        correctAnswer: {
          "Safe": ["Favorite movie", "Pet picture (no tags)"],
          "Unsafe": ["Full home address", "Birthday"]
        },
        explanation: "General interests are usually safe, but personal details like addresses and birthdays can be used to find or impersonate you.",
        points: 15
      },
      {
        id: 7,
        type: 'short-answer',
        question: "Liam posts a selfie wearing his school's sports jersey with the school name visible. Why might this be unsafe?",
        explanation: "School names reveal your location and where you can be found regularly, which strangers shouldn't know.",
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        question: "Which is the best way to make a profile?",
        options: [
          "Use real name, birthday, and city",
          "Use a nickname and avoid private info",
          "Include school name and photo of house", 
          "Post your full phone number"
        ],
        correctAnswer: "Use a nickname and avoid private info",
        explanation: "Nicknames protect your identity while still allowing you to connect with friends safely.",
        points: 10
      },
      {
        id: 9,
        type: 'matching',
        question: "Match each action to its safety level:",
        correctAnswer: {
          "Sharing location": "Unsafe",
          "Sharing favorite color": "Safer"
        },
        explanation: "Location data can be used to find you, while preferences like favorite colors are generally harmless.",
        points: 10
      },
      {
        id: 10,
        type: 'ranking',
        question: "Rank these from safest to riskiest to share:",
        options: [
          "Using a nickname only",
          "Using full name and birthday",
          "Sharing phone number publicly",
          "Posting home address"
        ],
        correctAnswer: ["Using a nickname only", "Using full name and birthday", "Sharing phone number publicly", "Posting home address"],
        explanation: "The more specific and personal the information, the riskier it becomes.",
        points: 15
      }
    ]
  },
  {
    id: 43,
    title: "Recognizing Fake Profiles",
    description: "Learn to identify and avoid fake accounts and scammers",
    hasVideo: true,
    questions: [
      {
        id: 11,
        type: 'multiple-choice',
        question: "You get a friend request from someone with no photos, few posts, and random friends. What should you do?",
        options: [
          "Accept it",
          "Ignore or block the request",
          "Ask for their password",
          "Send them your info"
        ],
        correctAnswer: "Ignore or block the request",
        explanation: "Profiles with little content and random connections are often fake accounts used for scams.",
        points: 10
      },
      {
        id: 12,
        type: 'short-answer',
        question: "Why do scammers make fake profiles that look real?",
        explanation: "Scammers create realistic-looking profiles to gain trust and trick people into sharing personal information or money.",
        points: 10
      },
      {
        id: 13,
        type: 'matching',
        question: "Match each profile sign to its likelihood:",
        correctAnswer: {
          "Few posts, random requests": "Likely fake",
          "Posts with people you know": "Likely real"
        },
        explanation: "Real profiles have authentic connections and content history.",
        points: 10
      },
      {
        id: 14,
        type: 'ordering',
        question: "Put these steps in order if you get a suspicious friend request:",
        options: [
          "Ignore request",
          "Block", 
          "Report"
        ],
        correctAnswer: ["Ignore request", "Block", "Report"],
        explanation: "This sequence protects you and helps protect others from the same fake account.",
        points: 15
      },
      {
        id: 15,
        type: 'sorting',
        question: "Sort these signs into Fake Profile or Real Profile:",
        options: [
          "Generic messages",
          "Posts with people you know"
        ],
        correctAnswer: {
          "Fake Profile": ["Generic messages"],
          "Real Profile": ["Posts with people you know"]
        },
        explanation: "Real profiles show genuine interactions, while fake ones use generic or copied content.",
        points: 15
      }
    ]
  },
  {
    id: 44,
    title: "Handling Strangers Online",
    description: "Learn safe practices when interacting with unknown people online",
    hasVideo: true,
    questions: [
      {
        id: 16,
        type: 'short-answer',
        question: "Ella is playing a game when a stranger asks for her city. What should she do, and why?",
        explanation: "Ella should refuse to share her city, block the person, and tell an adult because strangers don't need location information.",
        points: 10
      },
      {
        id: 17,
        type: 'multiple-choice',
        question: "Best response when a stranger asks for your phone number:",
        options: [
          "Give it to them",
          "Block them and tell an adult",
          "Keep talking but don't answer",
          "Ask for theirs instead"
        ],
        correctAnswer: "Block them and tell an adult",
        explanation: "Strangers requesting personal contact information is a red flag that requires immediate action.",
        points: 10
      },
      {
        id: 18,
        type: 'matching',
        question: "Match each action to its safety level:",
        correctAnswer: {
          "Blocking and reporting": "Safe",
          "Sharing school name": "Unsafe"
        },
        explanation: "Blocking protects you, while sharing personal details like school names puts you at risk.",
        points: 10
      },
      {
        id: 19,
        type: 'ordering',
        question: "Put these steps in order when a stranger bothers you online:",
        options: [
          "Stop replying",
          "Block",
          "Report", 
          "Tell adult"
        ],
        correctAnswer: ["Stop replying", "Block", "Report", "Tell adult"],
        explanation: "This sequence protects you immediately and gets help to handle the situation properly.",
        points: 15
      },
      {
        id: 20,
        type: 'short-answer',
        question: "Why might strangers online try to gain your trust first before asking for personal info?",
        explanation: "Strangers build trust to make you feel comfortable so you'll be more likely to share personal information when they ask.",
        points: 15
      }
    ]
  },
  {
    id: 45,
    title: "Cyberbullying Awareness", 
    description: "Understand cyberbullying and learn how to respond safely",
    hasVideo: true,
    questions: [
      {
        id: 21,
        type: 'sorting',
        question: "Sort these into Safe Actions or Unsafe Actions when bullied:",
        options: [
          "Blocking bully",
          "Fighting back",
          "Reporting",
          "Sharing mean posts"
        ],
        correctAnswer: {
          "Safe Actions": ["Blocking bully", "Reporting"],
          "Unsafe Actions": ["Fighting back", "Sharing mean posts"]
        },
        explanation: "Safe responses protect you and get help, while fighting back or sharing can make the situation worse.",
        points: 15
      },
      {
        id: 22,
        type: 'short-answer',
        question: "What should you do if your friend is bullied online?",
        explanation: "Support your friend, encourage them to tell an adult, help report the bully, and don't participate in spreading mean content.",
        points: 10
      },
      {
        id: 23,
        type: 'multiple-choice',
        question: "What's the best response to cyberbullying?",
        options: [
          "Fight back",
          "Ignore completely",
          "Block, take screenshots, report, and tell an adult",
          "Share it with friends"
        ],
        correctAnswer: "Block, take screenshots, report, and tell an adult",
        explanation: "This comprehensive approach protects you, documents evidence, and gets proper help.",
        points: 10
      },
      {
        id: 24,
        type: 'short-answer',
        question: "Why should you screenshot bullying before reporting it?",
        explanation: "Screenshots provide evidence of the bullying that can be used when reporting to adults, schools, or platforms.",
        points: 10
      },
      {
        id: 25,
        type: 'ordering',
        question: "Put these steps in order when dealing with cyberbullying:",
        options: [
          "Take screenshots",
          "Block bully",
          "Report bully",
          "Tell adult"
        ],
        correctAnswer: ["Take screenshots", "Block bully", "Report bully", "Tell adult"],
        explanation: "Documenting first ensures you have evidence, then blocking protects you while you report and get help.",
        points: 15
      }
    ]
  },
  {
    id: 46,
    title: "Thinking Before You Post",
    description: "Learn to consider the long-term impact of your online posts",
    hasVideo: true,
    questions: [
      {
        id: 26,
        type: 'multiple-choice',
        question: "Why is it risky to post when upset?",
        options: [
          "It deletes later",
          "You may regret it, and posts can stay forever",
          "It hides from friends",
          "It makes your account private"
        ],
        correctAnswer: "You may regret it, and posts can stay forever",
        explanation: "Emotional posts often contain things you later regret, and they can remain online permanently.",
        points: 10
      },
      {
        id: 27,
        type: 'short-answer',
        question: "Why could posting a rude comment hurt you later when applying to schools or jobs?",
        explanation: "Schools and employers often check social media, and rude posts can show poor character and judgment.",
        points: 10
      },
      {
        id: 28,
        type: 'matching',
        question: "Match each post type to its impact:",
        correctAnswer: {
          "Kind post": "Positive reputation",
          "Offensive post": "Negative reputation"
        },
        explanation: "Your online behavior creates a digital reputation that follows you.",
        points: 10
      },
      {
        id: 29,
        type: 'ranking',
        question: "Rank these posts from safest to riskiest:",
        options: [
          "Positive comment about a hobby",
          "Silly meme in private group",
          "Posting fight video",
          "Sharing phone number"
        ],
        correctAnswer: ["Positive comment about a hobby", "Silly meme in private group", "Posting fight video", "Sharing phone number"],
        explanation: "Positive content and limited sharing are safer than controversial or personal information.",
        points: 15
      },
      {
        id: 30,
        type: 'sorting',
        question: "Sort these into Good or Bad digital footprints:",
        options: [
          "Helping others online",
          "Posting insults"
        ],
        correctAnswer: {
          "Good": ["Helping others online"],
          "Bad": ["Posting insults"]
        },
        explanation: "Your digital footprint should reflect the person you want others to see.",
        points: 15
      }
    ]
  },
  {
    id: 47,
    title: "Recognizing Clickbait and Scams",
    description: "Learn to identify and avoid misleading content and scams",
    hasVideo: true,
    questions: [
      {
        id: 31,
        type: 'multiple-choice',
        question: "Which is most likely clickbait?",
        options: [
          "10 fun study tips!",
          "OMG! You won't BELIEVE this! Click now!",
          "Math help for students",
          "School lunch menu"
        ],
        correctAnswer: "OMG! You won't BELIEVE this! Click now!",
        explanation: "Clickbait uses excessive excitement, urgency, and vague promises to get clicks.",
        points: 10
      },
      {
        id: 32,
        type: 'short-answer',
        question: "Why do scammers use shocking titles or promises of prizes?",
        explanation: "Shocking titles and prize promises grab attention and make people click without thinking carefully about whether it's real.",
        points: 10
      },
      {
        id: 33,
        type: 'matching',
        question: "Match each content type to its trustworthiness:",
        correctAnswer: {
          "Clickbait": "Shocking headlines, lots of emojis",
          "Real news": "Reliable sources, no tricks"
        },
        explanation: "Legitimate content provides clear information while clickbait uses manipulation tactics.",
        points: 10
      },
      {
        id: 34,
        type: 'sorting',
        question: "Sort these posts into Safe or Suspicious:",
        options: [
          "Free iPhone!!! Click NOW!!!",
          "Homework due Friday"
        ],
        correctAnswer: {
          "Safe": ["Homework due Friday"],
          "Suspicious": ["Free iPhone!!! Click NOW!!!"]
        },
        explanation: "Normal school-related content is safe, while promises of free expensive items are usually scams.",
        points: 15
      },
      {
        id: 35,
        type: 'ordering',
        question: "Put these steps in order before clicking a link:",
        options: [
          "Check URL",
          "Think if it makes sense",
          "Only click if it's from a trusted source"
        ],
        correctAnswer: ["Check URL", "Think if it makes sense", "Only click if it's from a trusted source"],
        explanation: "Checking the source and thinking critically before clicking protects you from scams.",
        points: 15
      }
    ]
  },
  {
    id: 48,
    title: "Managing Screen Time and Balance",
    description: "Learn healthy habits for social media use",
    hasVideo: true,
    questions: [
      {
        id: 36,
        type: 'short-answer',
        question: "Why is it important to have some screen-free time daily?",
        explanation: "Screen-free time helps maintain physical health, sleep quality, real-world relationships, and prevents addiction to devices.",
        points: 10
      },
      {
        id: 37,
        type: 'multiple-choice',
        question: "Which is a good social media habit?",
        options: [
          "Taking breaks and setting time limits",
          "Scrolling late every night",
          "Checking notifications every minute",
          "Posting all day"
        ],
        correctAnswer: "Taking breaks and setting time limits",
        explanation: "Healthy boundaries with social media help maintain balance in your life.",
        points: 10
      },
      {
        id: 38,
        type: 'matching',
        question: "Match each habit to its health impact:",
        correctAnswer: {
          "Taking breaks": "Healthy habit",
          "Using all night": "Unhealthy habit"
        },
        explanation: "Regular breaks maintain mental health while excessive use can harm sleep and wellbeing.",
        points: 10
      },
      {
        id: 39,
        type: 'ordering',
        question: "Put these steps in order for balanced screen time:",
        options: [
          "Decide how long you'll spend online",
          "Set timers or reminders",
          "Take breaks after long sessions"
        ],
        correctAnswer: ["Decide how long you'll spend online", "Set timers or reminders", "Take breaks after long sessions"],
        explanation: "Planning your screen time and sticking to limits helps maintain healthy habits.",
        points: 15
      },
      {
        id: 40,
        type: 'ranking',
        question: "Rank these habits from healthiest to least healthy:",
        options: [
          "Taking breaks",
          "Checking before bed",
          "Scrolling all day",
          "Logging off regularly"
        ],
        correctAnswer: ["Taking breaks", "Logging off regularly", "Checking before bed", "Scrolling all day"],
        explanation: "Regular breaks and controlled usage are healthier than constant checking or all-day scrolling.",
        points: 15
      }
    ]
  },
  {
    id: 49,
    title: "Avoiding Oversharing in Stories/Posts",
    description: "Learn what not to share and when it's safer to post",
    hasVideo: true,
    questions: [
      {
        id: 41,
        type: 'short-answer',
        question: "Why is posting your location in real-time risky?",
        explanation: "Real-time location sharing lets strangers know exactly where you are right now, which could be dangerous.",
        points: 10
      },
      {
        id: 42,
        type: 'multiple-choice',
        question: "When is it safer to post about your location?",
        options: [
          "While you're still there",
          "After you've already left",
          "Right before you go there",
          "Anytime, it doesn't matter"
        ],
        correctAnswer: "After you've already left",
        explanation: "Posting after you leave means strangers can't use the information to find you there.",
        points: 10
      },
      {
        id: 43,
        type: 'matching',
        question: "Match each posting habit to its safety level:",
        correctAnswer: {
          "Posting current location": "Risky",
          "Posting vacation photos after you're home": "Safer"
        },
        explanation: "Delayed posting prevents strangers from knowing your current whereabouts.",
        points: 10
      },
      {
        id: 44,
        type: 'ordering',
        question: "Put these steps in order to post safely:",
        options: [
          "Think before posting",
          "Check privacy settings",
          "Post only after you leave"
        ],
        correctAnswer: ["Think before posting", "Check privacy settings", "Post only after you leave"],
        explanation: "Planning and privacy protection keep you safe when sharing experiences.",
        points: 15
      },
      {
        id: 45,
        type: 'sorting',
        question: "Sort these into Oversharing or Safe Posting:",
        options: [
          "Sharing your phone number",
          "Sharing a picture of a pet (no location tag)"
        ],
        correctAnswer: {
          "Oversharing": ["Sharing your phone number"],
          "Safe Posting": ["Sharing a picture of a pet (no location tag)"]
        },
        explanation: "Personal contact information is oversharing, while general photos without location data are safer.",
        points: 15
      }
    ]
  },
  {
    id: 50,
    title: "What to Do If You Feel Unsafe Online",
    description: "Know how to respond when something feels wrong online",
    hasVideo: true,
    questions: [
      {
        id: 46,
        type: 'multiple-choice',
        question: "If you feel unsafe online, what should you do first?",
        options: [
          "Reply to the person",
          "Block and tell a trusted adult",
          "Keep chatting but be careful",
          "Share your password so they stop"
        ],
        correctAnswer: "Block and tell a trusted adult",
        explanation: "Immediate blocking protects you while getting adult help ensures proper handling of the situation.",
        points: 10
      },
      {
        id: 47,
        type: 'short-answer',
        question: "What should you do if you see something scary or uncomfortable online?",
        explanation: "Exit the site/app immediately, don't interact with the content, and tell a trusted adult about what you saw.",
        points: 10
      },
      {
        id: 48,
        type: 'matching',
        question: "Match each response to its safety level:",
        correctAnswer: {
          "Blocking and reporting": "Safe action",
          "Giving personal info to stop problem": "Unsafe"
        },
        explanation: "Proper reporting protects you, while giving information to make problems stop usually makes them worse.",
        points: 10
      },
      {
        id: 49,
        type: 'ordering',
        question: "Put these steps in order when you feel unsafe online:",
        options: [
          "Exit the app/site",
          "Take a screenshot if needed",
          "Block/report",
          "Tell a trusted adult"
        ],
        correctAnswer: ["Exit the app/site", "Take a screenshot if needed", "Block/report", "Tell a trusted adult"],
        explanation: "Getting to safety first, then documenting and reporting, ensures your protection while getting help.",
        points: 15
      },
      {
        id: 50,
        type: 'short-answer',
        question: "Why is it better to tell an adult instead of keeping the problem secret?",
        explanation: "Adults have experience handling these situations and can provide support, report properly, and help keep you safe.",
        points: 15
      }
    ]
  }
];