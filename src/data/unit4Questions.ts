export interface Unit4Question {
  id: number;
  type: 'MC' | 'SR' | 'SORTING' | 'RANKING' | 'MATCHING' | 'TRUE_FALSE' | 'FILL_BLANK' | 'ORDERING';
  question: string;
  choices?: string[];
  options?: string[];
  correctAnswer: any;
  expectedResponse?: string;
  explanation: string;
  xpValue: number;
  subtopicId: number;
}

export const checkUnit4ShortResponseAnswer = (userAnswer: string, correctAnswer: any, expectedResponse?: string): boolean => {
  const cleanAnswer = userAnswer.toLowerCase().trim();
  const expectedClean = expectedResponse?.toLowerCase() || correctAnswer?.toLowerCase() || '';
  
  // Check if user answer contains key concepts from expected response
  const keywords = expectedClean.split(/[\s,\.]+/).filter(word => word.length > 3);
  const matchCount = keywords.filter(keyword => cleanAnswer.includes(keyword)).length;
  
  return matchCount >= Math.max(1, Math.floor(keywords.length * 0.4));
};

export const unit4Questions: Unit4Question[] = [
  // Subtopic 1: Understanding Digital Footprints
  {
    id: 151,
    type: 'SORTING',
    question: 'Sort these online actions into "Creates a Digital Footprint" or "Does Not Create a Digital Footprint":',
    choices: [
      'Posting a photo on social media',
      'Browsing a website', 
      'Talking to a friend in person',
      'Liking a video online'
    ],
    correctAnswer: [0, 0, 1, 0], // 0 = Creates, 1 = Does Not Create
    explanation: 'Most online activities create digital footprints that can be tracked and stored.',
    xpValue: 15,
    subtopicId: 1
  },
  {
    id: 152,
    type: 'SR',
    question: 'Why can a digital footprint affect someone even years later?',
    correctAnswer: 'permanent online record',
    expectedResponse: 'Because what you post or do online can stay there forever and might be seen by schools, jobs, or strangers later.',
    explanation: 'Digital footprints are permanent records that can be accessed by future employers, schools, and others.',
    xpValue: 20,
    subtopicId: 1
  },
  {
    id: 153,
    type: 'MC',
    question: 'Which action leaves the biggest digital footprint?',
    choices: [
      'Writing a private note on paper',
      'Posting a video on a public website',
      'Talking to a friend at school', 
      'Drawing in a notebook'
    ],
    correctAnswer: 1,
    explanation: 'Public posts create the largest and most permanent digital footprints.',
    xpValue: 10,
    subtopicId: 1
  },
  {
    id: 154,
    type: 'SR',
    question: 'Alex posts a funny photo online but deletes it later. His friends already shared it with others. Why does this show how digital footprints work?',
    correctAnswer: 'shared content persists',
    expectedResponse: 'Because once something is shared online, it can still exist even if you delete it.',
    explanation: 'Once content is shared, you lose control over it and it can continue to exist.',
    xpValue: 15,
    subtopicId: 1
  },
  {
    id: 155,
    type: 'RANKING',
    question: 'Rank these from least permanent to most permanent:',
    choices: [
      'Writing in a paper diary',
      'Sending a disappearing message in a private app',
      'Commenting on a public post',
      'Creating a YouTube video'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Physical items are least permanent online, while public videos are most permanent.',
    xpValue: 20,
    subtopicId: 1
  },

  // Subtopic 2: Recognizing Safe vs. Unsafe Websites
  {
    id: 156,
    type: 'MC',
    question: 'Which website is most likely safe to enter personal information?',
    choices: [
      'http://freestuff.com',
      'https://www.myschool.org',
      'http://prizes123.net',
      'http://claim-reward.info'
    ],
    correctAnswer: 1,
    explanation: 'School websites with HTTPS are generally safe and trustworthy.',
    xpValue: 10,
    subtopicId: 2
  },
  {
    id: 157,
    type: 'SORTING',
    question: 'Sort these website clues into "Safe" or "Unsafe":',
    choices: [
      'A padlock symbol next to the web address',
      'Website name has misspellings (e.g., go0gle.com)',
      'The address starts with https',
      'Pop-ups appear asking for your password'
    ],
    correctAnswer: [0, 1, 0, 1], // 0 = Safe, 1 = Unsafe
    explanation: 'Padlocks and HTTPS indicate security, while misspellings and password pop-ups are red flags.',
    xpValue: 15,
    subtopicId: 2
  },
  {
    id: 158,
    type: 'SR',
    question: 'Samantha finds a shopping site with amazing deals but lots of spelling mistakes and no https. What should she do, and why?',
    correctAnswer: 'avoid fake site',
    expectedResponse: 'She should not buy anything because the site could be fake and steal her information.',
    explanation: 'Poor design and lack of security indicate an untrustworthy site.',
    xpValue: 20,
    subtopicId: 2
  },
  {
    id: 159,
    type: 'RANKING',
    question: 'Rank these websites from most trustworthy to least trustworthy:',
    choices: [
      'https://www.library.gov',
      'http://claimprizefree.com', 
      'https://www.amazon.com',
      'http://amaz0n-support.net'
    ],
    correctAnswer: [0, 2, 3, 1],
    explanation: 'Government sites are most trustworthy, while fake domains are least trustworthy.',
    xpValue: 20,
    subtopicId: 2
  },
  {
    id: 160,
    type: 'SR',
    question: 'Why is the padlock icon important when entering personal information on a website?',
    correctAnswer: 'encryption security',
    expectedResponse: 'Because it means the site is using encryption to keep your information safe.',
    explanation: 'The padlock indicates SSL/TLS encryption protecting your data.',
    xpValue: 15,
    subtopicId: 2
  },

  // Subtopic 3: Protecting Personal Information Online
  {
    id: 161,
    type: 'SR',
    question: 'Why should you avoid posting your full name, address, or school online?',
    correctAnswer: 'stranger danger identity theft',
    expectedResponse: 'Because strangers could use that information to find you or pretend to be you.',
    explanation: 'Personal information can be used by criminals for identity theft or stalking.',
    xpValue: 20,
    subtopicId: 3
  },
  {
    id: 162,
    type: 'SORTING',
    question: 'Sort these pieces of information into "Safe to Share Publicly" or "Keep Private":',
    choices: [
      'Favorite color',
      'Full home address',
      'School name', 
      'A photo of your pet (without personal info)'
    ],
    correctAnswer: [0, 1, 1, 0], // 0 = Safe, 1 = Private
    explanation: 'General preferences are safe, but identifying information should be private.',
    xpValue: 15,
    subtopicId: 3
  },
  {
    id: 163,
    type: 'MC',
    question: 'Which of these is the best example of protecting personal information online?',
    choices: [
      'Sharing your birthday only on safe sites',
      'Using a nickname instead of your real name on public forums',
      'Posting your phone number so friends can text you',
      'Sharing your school name on social media'
    ],
    correctAnswer: 1,
    explanation: 'Using nicknames instead of real names provides the best protection.',
    xpValue: 10,
    subtopicId: 3
  },
  {
    id: 164,
    type: 'SR',
    question: 'Liam posts a photo of himself at his school with the school\'s name in the caption. Why could this be unsafe?',
    correctAnswer: 'reveals location',
    expectedResponse: 'Because it reveals where he goes to school, which strangers shouldn\'t know.',
    explanation: 'Location information can be used by predators to find children.',
    xpValue: 15,
    subtopicId: 3
  },
  {
    id: 165,
    type: 'RANKING',
    question: 'Rank these from least risky to most risky to share publicly:',
    choices: [
      'Favorite TV show',
      'Your first and last name',
      'Your phone number',
      'Your home address'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Contact and location information poses the highest risk.',
    xpValue: 20,
    subtopicId: 3
  },

  // Subtopic 4: Safe Searching and Click Habits
  {
    id: 166,
    type: 'SORTING',
    question: 'Sort these actions into "Safe" or "Unsafe" search habits:',
    choices: [
      'Clicking on the first link without checking the URL',
      'Checking the website address before clicking',
      'Clicking flashy "Download Now!" buttons on random sites',
      'Reading the description under the search result'
    ],
    correctAnswer: [1, 0, 1, 0], // 0 = Safe, 1 = Unsafe
    explanation: 'Always verify links and avoid suspicious downloads.',
    xpValue: 15,
    subtopicId: 4
  },
  {
    id: 167,
    type: 'SR',
    question: 'Emma searches for free games and sees a site with lots of pop-ups and strange links. What should she do, and why?',
    correctAnswer: 'avoid malware site',
    expectedResponse: 'She should avoid the site because it might have viruses or fake downloads.',
    explanation: 'Sites with excessive pop-ups often contain malware.',
    xpValue: 20,
    subtopicId: 4
  },
  {
    id: 168,
    type: 'MC',
    question: 'Which is the best way to choose a safe search result?',
    choices: [
      'Click the one with the biggest "FREE" text',
      'Look for websites that are well-known and start with https',
      'Click any link as long as it loads quickly',
      'Always pick the first result, no matter what'
    ],
    correctAnswer: 1,
    explanation: 'Trusted sites with HTTPS are the safest choice.',
    xpValue: 10,
    subtopicId: 4
  },
  {
    id: 169,
    type: 'SR',
    question: 'Why should you be careful about clicking ads at the top of search results?',
    correctAnswer: 'fake malware ads',
    expectedResponse: 'Because some ads lead to fake websites that want to steal information or trick you into downloading malware.',
    explanation: 'Malicious ads can redirect to dangerous sites.',
    xpValue: 15,
    subtopicId: 4
  },
  {
    id: 170,
    type: 'RANKING',
    question: 'Rank these actions from safest to riskiest:',
    choices: [
      'Checking the website name before clicking',
      'Clicking a trusted school website link',
      'Clicking a random flashing ad promising free stuff',
      'Hovering over a link before clicking'
    ],
    correctAnswer: [1, 0, 3, 2],
    explanation: 'Trusted sites are safest, while random ads are most dangerous.',
    xpValue: 20,
    subtopicId: 4
  },

  // Subtopic 5: Understanding Online Tracking and Ads
  {
    id: 171,
    type: 'MC',
    question: 'Why do websites track what pages you visit?',
    choices: [
      'Just to keep you safe',
      'To show you ads based on what you like',
      'To delete your account',
      'To stop you from visiting other sites'
    ],
    correctAnswer: 1,
    explanation: 'Websites track users primarily for targeted advertising.',
    xpValue: 10,
    subtopicId: 5
  },
  {
    id: 172,
    type: 'SORTING',
    question: 'Sort these into "Examples of Online Tracking" or "Not Online Tracking":',
    choices: [
      'Seeing ads for shoes right after looking at shoe websites',
      'Writing homework in a notebook',
      'A website remembering items in your shopping cart',
      'Talking to a friend offline'
    ],
    correctAnswer: [0, 1, 0, 1], // 0 = Tracking, 1 = Not Tracking
    explanation: 'Online activities that remember your behavior are examples of tracking.',
    xpValue: 15,
    subtopicId: 5
  },
  {
    id: 173,
    type: 'SR',
    question: 'Ethan looked at a bike online. The next day, he sees bike ads on different websites. Why is this happening?',
    correctAnswer: 'website tracking ads',
    expectedResponse: 'Because the website tracked what he searched for and used it to show ads.',
    explanation: 'This is called retargeting - showing ads based on previous browsing.',
    xpValue: 15,
    subtopicId: 5
  },
  {
    id: 174,
    type: 'SR',
    question: 'Why might someone want to limit how much websites track them?',
    correctAnswer: 'privacy protection',
    expectedResponse: 'So companies can\'t collect too much personal information or show too many targeted ads.',
    explanation: 'Limiting tracking protects privacy and reduces manipulation.',
    xpValue: 20,
    subtopicId: 5
  },
  {
    id: 175,
    type: 'RANKING',
    question: 'Rank these actions from most private to least private:',
    choices: [
      'Using private browsing mode',
      'Logging into social media accounts on every site',
      'Clearing cookies regularly',
      'Clicking every ad you see'
    ],
    correctAnswer: [0, 2, 1, 3],
    explanation: 'Private browsing and clearing cookies protect privacy most.',
    xpValue: 20,
    subtopicId: 5
  },

  // Subtopic 6: Recognizing Online Scams Beyond Email
  {
    id: 176,
    type: 'SR',
    question: 'A website pops up saying, "Your computer has a virus! Click here to fix it!" What makes this look like a scam?',
    correctAnswer: 'fake scare tactic',
    expectedResponse: 'It uses a scary message to make you click quickly, and real antivirus programs don\'t work like that.',
    explanation: 'Legitimate antivirus software doesn\'t use pop-up warnings.',
    xpValue: 20,
    subtopicId: 6
  },
  {
    id: 177,
    type: 'SORTING',
    question: 'Sort these into "Likely Scam" or "Likely Safe":',
    choices: [
      'Congratulations! You won $1,000! Click to claim.',
      'Reminder: Your library book is due tomorrow.',
      'Click here for a free iPhone!',
      'Teacher shared a class assignment file.'
    ],
    correctAnswer: [0, 1, 0, 1], // 0 = Scam, 1 = Safe
    explanation: 'Unsolicited prizes are scams, while educational messages are typically safe.',
    xpValue: 15,
    subtopicId: 6
  },
  {
    id: 178,
    type: 'SR',
    question: 'Why do scammers promise free prizes or money?',
    correctAnswer: 'excitement manipulation',
    expectedResponse: 'Because people get excited and click without thinking if the offer is real.',
    explanation: 'Scammers use greed and excitement to bypass critical thinking.',
    xpValue: 15,
    subtopicId: 6
  },
  {
    id: 179,
    type: 'RANKING',
    question: 'Rank these websites from most suspicious to least suspicious:',
    choices: [
      'http://winfreeprize-now.com',
      'https://www.schoollibrary.org',
      'http://claim-reward.info',
      'https://www.khanacademy.org'
    ],
    correctAnswer: [0, 2, 1, 3],
    explanation: 'Prize sites are most suspicious, educational sites are least suspicious.',
    xpValue: 20,
    subtopicId: 6
  },
  {
    id: 180,
    type: 'MC',
    question: 'Which is the best thing to do if a pop-up says you won money?',
    choices: [
      'Click the link to claim it',
      'Reply with your information',
      'Close the pop-up without clicking anything',
      'Share it with friends to see if it\'s real'
    ],
    correctAnswer: 2,
    explanation: 'Never interact with suspicious pop-ups - just close them.',
    xpValue: 10,
    subtopicId: 6
  },

  // Subtopic 7: Using Privacy Settings and Tools
  {
    id: 181,
    type: 'MATCHING',
    question: 'Match each privacy tool to what it does:',
    choices: [
      'Private Browsing Mode',
      'Ad Blocker', 
      'Password Manager',
      'VPN'
    ],
    correctAnswer: {
      'Private Browsing Mode': 'Doesn\'t save your history or cookies',
      'Ad Blocker': 'Hides ads on websites',
      'Password Manager': 'Stores strong passwords securely',
      'VPN': 'Hides your location and encrypts internet traffic'
    },
    explanation: 'Each privacy tool serves a specific security function.',
    xpValue: 20,
    subtopicId: 7
  },
  {
    id: 182,
    type: 'FILL_BLANK',
    question: 'Using ___________ mode in your browser can prevent it from saving your search history.',
    correctAnswer: 'Private',
    explanation: 'Private or Incognito browsing mode doesn\'t save history.',
    xpValue: 10,
    subtopicId: 7
  },
  {
    id: 183,
    type: 'MC',
    question: 'Why are privacy settings important on websites and apps?',
    choices: [
      'To make the app look better',
      'To control what information is shared with others',
      'To let strangers see your information',
      'To make accounts easier to hack'
    ],
    correctAnswer: 1,
    explanation: 'Privacy settings control information sharing and protect users.',
    xpValue: 10,
    subtopicId: 7
  },
  {
    id: 184,
    type: 'SR',
    question: 'Olivia signs up for a new social media app. It asks if she wants her account to be public or private. Which should she pick, and why?',
    correctAnswer: 'private approved friends',
    expectedResponse: 'She should choose private so only approved friends can see her posts.',
    explanation: 'Private accounts provide better control over who sees your content.',
    xpValue: 15,
    subtopicId: 7
  },
  {
    id: 185,
    type: 'RANKING',
    question: 'Rank these actions from best to worst for protecting your privacy:',
    choices: [
      'Turning on 2FA (two-factor authentication)',
      'Making your account private',
      'Sharing your location on every post',
      'Reviewing app permissions'
    ],
    correctAnswer: [0, 3, 1, 2],
    explanation: '2FA provides the strongest security, while location sharing is most risky.',
    xpValue: 20,
    subtopicId: 7
  },

  // Subtopic 8: Downloading Safely
  {
    id: 186,
    type: 'TRUE_FALSE',
    question: 'It is always safe to download apps from any website as long as the file looks normal.',
    correctAnswer: false,
    explanation: 'Files can contain malware even if they look normal. Only download from trusted sources.',
    xpValue: 10,
    subtopicId: 8
  },
  {
    id: 187,
    type: 'MC',
    question: 'Jake finds a link to download a free version of a paid game. What should he do?',
    choices: [
      'Download it quickly to save money',
      'Avoid downloading it because pirated games can contain malware',
      'Send it to friends to check if it\'s safe',
      'Try downloading it on another device first'
    ],
    correctAnswer: 1,
    explanation: 'Pirated software often contains malware and should be avoided.',
    xpValue: 15,
    subtopicId: 8
  },
  {
    id: 188,
    type: 'MATCHING',
    question: 'Match the download source to its safety level:',
    choices: [
      'Official App Store',
      'Random Website with Pop-ups',
      'Trusted School Website',
      'Torrent or Unknown File Sharing Site'
    ],
    correctAnswer: {
      'Official App Store': 'Safer',
      'Random Website with Pop-ups': 'Risky',
      'Trusted School Website': 'Safer', 
      'Torrent or Unknown File Sharing Site': 'Risky'
    },
    explanation: 'Official and trusted sources are safer than random or file-sharing sites.',
    xpValue: 15,
    subtopicId: 8
  },
  {
    id: 189,
    type: 'ORDERING',
    question: 'Put these steps in the correct order for safe downloading:',
    choices: [
      'Check the website\'s URL',
      'Make sure the site is trusted (https)',
      'Download the file only from the official source',
      'Scan the file with antivirus software'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Always verify the source before downloading, then scan files after.',
    xpValue: 20,
    subtopicId: 8
  },
  {
    id: 190,
    type: 'SR',
    question: 'Why should you avoid downloading free programs or games from random websites?',
    correctAnswer: 'malware hidden programs',
    expectedResponse: 'Because they might have hidden malware that can steal your information or harm your device.',
    explanation: 'Unknown sites often bundle malware with free software.',
    xpValue: 15,
    subtopicId: 8
  },

  // Subtopic 9: Avoiding Cyberbullying and Unsafe Interactions
  {
    id: 191,
    type: 'SR',
    question: 'Alex gets a mean message online from someone at school. What is the safest thing Alex should do instead of replying with another mean message?',
    correctAnswer: 'block report adult',
    expectedResponse: 'Alex should block the person, take a screenshot as proof, and tell a trusted adult or teacher.',
    explanation: 'Documentation and adult intervention are better than retaliation.',
    xpValue: 20,
    subtopicId: 9
  },
  {
    id: 192,
    type: 'TRUE_FALSE',
    question: 'If someone is bullying you online, you should always reply to defend yourself.',
    correctAnswer: false,
    explanation: 'Responding can make things worse. It\'s safer to block and report.',
    xpValue: 10,
    subtopicId: 9
  },
  {
    id: 193,
    type: 'MATCHING',
    question: 'Match the action to whether it is Safe or Unsafe:',
    choices: [
      'Blocking and reporting a bully',
      'Sharing personal info with someone you just met online',
      'Telling an adult if you feel uncomfortable online',
      'Meeting up with an online stranger without parents'
    ],
    correctAnswer: {
      'Blocking and reporting a bully': 'Safe',
      'Sharing personal info with someone you just met online': 'Unsafe',
      'Telling an adult if you feel uncomfortable online': 'Safe',
      'Meeting up with an online stranger without parents': 'Unsafe'
    },
    explanation: 'Blocking bullies and telling adults are safe, while sharing info or meeting strangers is unsafe.',
    xpValue: 15,
    subtopicId: 9
  },
  {
    id: 194,
    type: 'MC',
    question: 'Mia is playing an online game, and a stranger keeps asking for her address. What should she do?',
    choices: [
      'Give the address if they seem nice',
      'Ignore it but keep playing with the person',
      'Block the user and tell a trusted adult',
      'Make up a fake address to trick them'
    ],
    correctAnswer: 2,
    explanation: 'Block immediately and tell an adult when strangers ask for personal information.',
    xpValue: 15,
    subtopicId: 9
  },
  {
    id: 195,
    type: 'ORDERING',
    question: 'Put these steps in the best order if you\'re being cyberbullied:',
    choices: [
      'Take screenshots as evidence',
      'Block the bully',
      'Report the bully to the platform', 
      'Tell a trusted adult'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Document first, then block, report, and tell an adult.',
    xpValue: 20,
    subtopicId: 9
  },

  // Subtopic 10: What to Do If Something Feels Wrong Online
  {
    id: 196,
    type: 'MC',
    question: 'You are on a website, and a pop-up asks for your login info. You feel like something isn\'t right. What should you do?',
    choices: [
      'Enter your login info quickly',
      'Refresh the page to see if it goes away',
      'Close the site and tell a trusted adult or teacher',
      'Save the link to visit later'
    ],
    correctAnswer: 2,
    explanation: 'Trust your instincts and leave suspicious sites immediately.',
    xpValue: 15,
    subtopicId: 10
  },
  {
    id: 197,
    type: 'ORDERING',
    question: 'Put these steps in the best order if you think a website or message is unsafe:',
    choices: [
      'Leave the site or stop talking to the person',
      'Take a screenshot if needed',
      'Tell a trusted adult or teacher',
      'Report the site or user if possible'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Leave first for safety, then document, inform adults, and report.',
    xpValue: 20,
    subtopicId: 10
  },
  {
    id: 198,
    type: 'TRUE_FALSE',
    question: 'If a website feels strange or unsafe, it\'s okay to keep using it as long as you don\'t enter any personal info.',
    correctAnswer: false,
    explanation: 'You should leave the site right away even if you don\'t enter info.',
    xpValue: 10,
    subtopicId: 10
  },
  {
    id: 199,
    type: 'MATCHING',
    question: 'Match the situation to the safest response:',
    choices: [
      'Strange pop-up asking for passwords',
      'Message from a stranger asking personal questions',
      'Email from a company you never used'
    ],
    correctAnswer: {
      'Strange pop-up asking for passwords': 'Close the site',
      'Message from a stranger asking personal questions': 'Block and tell an adult',
      'Email from a company you never used': 'Report or delete'
    },
    explanation: 'Each suspicious situation requires an appropriate defensive response.',
    xpValue: 15,
    subtopicId: 10
  },
  {
    id: 200,
    type: 'SR',
    question: 'While browsing, you find a website with scary warnings and weird links. What should you do, and why?',
    correctAnswer: 'leave tell adult unsafe',
    expectedResponse: 'Leave the website immediately and tell a trusted adult because it might be a scam or unsafe site.',
    explanation: 'Suspicious sites should be avoided and reported to adults.',
    xpValue: 20,
    subtopicId: 10
  }
];

export const unit4Subtopics = [
  {
    id: 1,
    title: "Understanding Digital Footprints",
    description: "Learn what digital footprints are and how they can affect you",
    questions: unit4Questions.filter(q => q.subtopicId === 1),
    videoUrl: null
  },
  {
    id: 2,
    title: "Recognizing Safe vs. Unsafe Websites", 
    description: "Identify signs of trustworthy and suspicious websites",
    questions: unit4Questions.filter(q => q.subtopicId === 2),
    videoUrl: null
  },
  {
    id: 3,
    title: "Protecting Personal Information Online",
    description: "Learn what information to keep private online",
    questions: unit4Questions.filter(q => q.subtopicId === 3),
    videoUrl: null
  },
  {
    id: 4,
    title: "Safe Searching and Click Habits",
    description: "Develop safe browsing and search habits",
    questions: unit4Questions.filter(q => q.subtopicId === 4),
    videoUrl: null
  },
  {
    id: 5,
    title: "Understanding Online Tracking and Ads",
    description: "Learn how websites track you and show targeted ads",
    questions: unit4Questions.filter(q => q.subtopicId === 5),
    videoUrl: null
  },
  {
    id: 6,
    title: "Recognizing Online Scams Beyond Email",
    description: "Identify scams on websites and social media",
    questions: unit4Questions.filter(q => q.subtopicId === 6),
    videoUrl: null
  },
  {
    id: 7,
    title: "Using Privacy Settings and Tools",
    description: "Learn to use privacy settings and protection tools",
    questions: unit4Questions.filter(q => q.subtopicId === 7),
    videoUrl: null
  },
  {
    id: 8,
    title: "Downloading Safely",
    description: "Learn safe downloading practices and avoid malware",
    questions: unit4Questions.filter(q => q.subtopicId === 8),
    videoUrl: null
  },
  {
    id: 9,
    title: "Avoiding Cyberbullying and Unsafe Interactions",
    description: "Stay safe from cyberbullying and dangerous online interactions",
    questions: unit4Questions.filter(q => q.subtopicId === 9),
    videoUrl: null
  },
  {
    id: 10,
    title: "What to Do If Something Feels Wrong Online",
    description: "Learn how to respond when something online seems unsafe",
    questions: unit4Questions.filter(q => q.subtopicId === 10),
    videoUrl: null
  }
];