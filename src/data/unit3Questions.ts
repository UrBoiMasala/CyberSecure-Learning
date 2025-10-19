export interface Question {
  id: number;
  type: 'multiple_choice' | 'short_answer' | 'ranking' | 'matching' | 'sorting';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  explanation: string;
  xpReward: number;
  hint?: string;
  expectedResponse?: string;
}

export function checkShortResponseAnswer(userAnswer: string, correctAnswer: any, expectedResponse?: string): boolean {
  if (!userAnswer || typeof userAnswer !== 'string') return false;
  
  const userLower = userAnswer.toLowerCase().trim();
  
  // Define key concepts for each expected response
  const keywordChecks = [
    // Common phishing keywords
    ['scare', 'tactic', 'threaten', 'urgent', 'quickly', 'panic', 'fear'],
    ['trick', 'steal', 'personal', 'information', 'password', 'data'],
    ['fake', 'suspicious', 'not real', 'scam', 'fraudulent'],
    ['trust', 'legitimate', 'official', 'company', 'bank'],
    ['malware', 'virus', 'harm', 'damage', 'computer'],
    ['verify', 'confirm', 'check', 'authentic', 'real'],
    ['delete', 'report', 'ignore', 'don\'t click', 'avoid'],
    ['spelling', 'grammar', 'error', 'mistake', 'poor'],
    ['attachment', 'link', 'url', 'download', 'file'],
    ['impersonate', 'pretend', 'fake', 'disguise', 'mimic']
  ];
  
  // Check if user answer contains relevant keywords
  const hasRelevantKeywords = keywordChecks.some(keywords => 
    keywords.some(keyword => userLower.includes(keyword))
  );
  
  // Minimum length requirement for meaningful answers
  const hasMinimumLength = userAnswer.trim().length >= 10;
  
  return hasRelevantKeywords && hasMinimumLength;
}

export interface SubTopic {
  id: number;
  title: string;
  description: string;
  hasVideo: boolean;
  questions: Question[];
}

export const unit3Subtopics: SubTopic[] = [
  {
    id: 21,
    title: "What is Phishing?",
    description: "Learn to recognize phishing emails and understand their purpose",
    hasVideo: true,
    questions: [
      {
        id: 1,
        type: 'short_answer',
        question: 'Your friend gets an email saying, "Your account will be deleted in 24 hours unless you click here to log in." Explain why this might be a phishing email.',
        explanation: 'This is likely phishing because it uses scare tactics to make someone click quickly, and real companies don\'t threaten customers this way.',
        xpReward: 15,
        hint: 'Think about how legitimate companies communicate with customers.'
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: 'What is the main goal of a phishing email?',
        options: [
          'To send friendly messages',
          'To fix computer problems', 
          'To trick people into giving personal information or passwords',
          'To teach cybersecurity'
        ],
        correctAnswer: 'To trick people into giving personal information or passwords',
        explanation: 'Phishing emails are designed to steal personal information, passwords, or money by tricking victims.',
        xpReward: 10,
        hint: 'Think about what hackers want to steal from you.'
      },
      {
        id: 3,
        type: 'matching',
        question: 'Match each example to whether it\'s likely phishing or safe email:',
        options: [
          '"Click here to claim your $1,000 prize!" - Likely Phishing',
          'Email from your teacher about homework - Safe Email',
          'Email asking you to confirm your password - Likely Phishing', 
          'Receipt for something you actually bought - Safe Email'
        ],
        correctAnswer: '"Click here to claim your $1,000 prize!" - Likely Phishing',
        explanation: 'Unexpected prizes are common phishing tactics, while emails from known contacts about expected topics are usually safe.',
        xpReward: 15,
        hint: 'Consider whether you were expecting the email and if it asks for something unusual.'
      },
      {
        id: 4,
        type: 'short_answer',
        question: 'Why do phishing emails often pretend to be from real companies like banks or stores?',
        explanation: 'Because people are more likely to trust and click if they think the email is from a real, legitimate company they recognize.',
        xpReward: 15,
        hint: 'Think about which emails you would be more likely to trust.'
      },
      {
        id: 5,
        type: 'multiple_choice',
        question: 'You get an email saying you\'ve won a free phone, but you never entered a contest. It asks you to click a link to claim your prize. What should you do?',
        options: [
          'Click the link—free phone!',
          'Reply and ask if it\'s real',
          'Delete the email or report it as phishing',
          'Send it to your friends'
        ],
        correctAnswer: 'Delete the email or report it as phishing',
        explanation: 'If you never entered a contest, this is likely a phishing scam. Delete or report it without clicking.',
        xpReward: 10,
        hint: 'If something seems too good to be true and you didn\'t expect it, it probably is.'
      }
    ]
  },
  {
    id: 22,
    title: "Common Tricks in Suspicious Emails",
    description: "Identify the tactics hackers use to manipulate victims",
    hasVideo: true,
    questions: [
      {
        id: 1,
        type: 'short_answer',
        question: 'An email says, "URGENT! Your account will be closed unless you confirm your password now!" What trick is the hacker using here, and why is it effective?',
        explanation: 'They are using scare tactics and urgency to make you act quickly without thinking carefully about whether the email is legitimate.',
        xpReward: 15,
        hint: 'What emotion is the email trying to create?'
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: 'Which of these is NOT a common trick used in phishing emails?',
        options: [
          'Saying you won a prize',
          'Pretending to be a company you know',
          'Teaching you how to make strong passwords',
          'Creating a fake link that looks real'
        ],
        correctAnswer: 'Teaching you how to make strong passwords',
        explanation: 'Legitimate cybersecurity education doesn\'t ask for personal information. The other options are all common phishing tactics.',
        xpReward: 10,
        hint: 'Which option would actually help you stay safe online?'
      },
      {
        id: 3,
        type: 'sorting',
        question: 'Sort these email lines into Suspicious or Normal:',
        options: [
          '"Click here to claim your $500 gift card!" - Suspicious',
          '"Your teacher sent you homework instructions." - Normal',
          '"We noticed unusual login activity. Confirm your password." - Suspicious',
          '"This is your monthly school newsletter." - Normal'
        ],
        correctAnswer: '"Click here to claim your $500 gift card!" - Suspicious',
        explanation: 'Unexpected prizes and password requests are suspicious, while expected communications from known sources are normal.',
        xpReward: 15,
        hint: 'Look for unexpected offers or requests for sensitive information.'
      },
      {
        id: 4,
        type: 'short_answer',
        question: 'Why do phishing emails often have words like "limited time," "urgent," or "act now"?',
        explanation: 'To create panic and pressure so people rush to respond without stopping to think carefully about whether the email is legitimate.',
        xpReward: 15,
        hint: 'What happens when people feel rushed or panicked?'
      },
      {
        id: 5,
        type: 'multiple_choice',
        question: 'Which email is most likely phishing?',
        options: [
          'An email from your school about tomorrow\'s field trip',
          'An email saying you\'ve won a free gift card even though you didn\'t enter a contest',
          'An email receipt for something you actually bought',
          'A message from your teacher with class notes'
        ],
        correctAnswer: 'An email saying you\'ve won a free gift card even though you didn\'t enter a contest',
        explanation: 'Unexpected prizes, especially when you didn\'t enter any contest, are classic phishing tactics.',
        xpReward: 10,
        hint: 'Which email offers something you didn\'t expect or ask for?'
      }
    ]
  },
  {
    id: 23,
    title: "Recognizing Strange Email Addresses",
    description: "Learn to spot fake and suspicious email addresses",
    hasVideo: true,
    questions: [
      {
        id: 1,
        type: 'short_answer',
        question: 'You get an email from support@amaz0n-help.com saying you won a gift card. Why should you be suspicious of this email address?',
        explanation: 'Because it looks like Amazon but uses a zero instead of an "o" and has an unofficial domain name that isn\'t the real Amazon address.',
        xpReward: 15,
        hint: 'Look carefully at the spelling and domain name.'
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: 'Which of these is the most trustworthy email address?',
        options: [
          'freegift@amaz0n-prize.com',
          'winner@amazon-support123.com',
          'support@amazon.com',
          'claimprize@amazonfree.com'
        ],
        correctAnswer: 'support@amazon.com',
        explanation: 'This is the official Amazon domain. The others use fake domains with extra words, numbers, or misspellings.',
        xpReward: 10,
        hint: 'Which one looks like the official company website address?'
      },
      {
        id: 3,
        type: 'sorting',
        question: 'Sort these into Suspicious or Safe email addresses:',
        options: [
          'teacher@myschool.org - Safe',
          'te4cher@myschool-help.net - Suspicious',
          'help@google.com - Safe',
          'googlesupport@freebonus.biz - Suspicious'
        ],
        correctAnswer: 'teacher@myschool.org - Safe',
        explanation: 'Official school and company domains are safe, while addresses with numbers, extra words, or strange domains are suspicious.',
        xpReward: 15,
        hint: 'Look for official domains versus made-up or suspicious ones.'
      },
      {
        id: 4,
        type: 'short_answer',
        question: 'Why do hackers create email addresses that look almost like real ones?',
        explanation: 'So people will quickly trust the email without noticing small changes like extra letters, numbers, or different domains.',
        xpReward: 15,
        hint: 'What do hackers want you to do without thinking carefully?'
      },
      {
        id: 5,
        type: 'multiple_choice',
        question: 'Which email should you be most suspicious of?',
        options: [
          'contact@schoollibrary.org',
          'info@citymuseum.com',
          'supprt@paypal-login-secure.net',
          'All of the above are safe'
        ],
        correctAnswer: 'supprt@paypal-login-secure.net',
        explanation: 'This email has a misspelling ("supprt") and uses a fake domain instead of the real PayPal address.',
        xpReward: 10,
        hint: 'Look for spelling errors and overly complex domain names.'
      }
    ]
  },
  {
    id: 24,
    title: "Spotting Fake Links and Attachments",
    description: "Learn to identify dangerous links and attachments",
    hasVideo: true,
    questions: [
      {
        id: 1,
        type: 'short_answer',
        question: 'You get an email that says "Click here to claim your prize!" and the link shows www.amaz0n-prizes.com. Why should you not click the link?',
        explanation: 'Because the link is not the real Amazon website and could take you to a fake page designed to steal your information.',
        xpReward: 15,
        hint: 'Compare the link to what the real Amazon website address should be.'
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: 'Which of these is the safest action when you see a suspicious link?',
        options: [
          'Click it to see where it goes',
          'Hover over the link to see the real URL without clicking',
          'Copy and paste it into a new browser tab',
          'Forward it to friends to ask if it\'s real'
        ],
        correctAnswer: 'Hover over the link to see the real URL without clicking',
        explanation: 'Hovering shows you the real destination without the risk of clicking on a malicious link.',
        xpReward: 10,
        hint: 'How can you check a link safely without activating it?'
      },
      {
        id: 3,
        type: 'sorting',
        question: 'Sort these attachments into Safe or Suspicious:',
        options: [
          'Homework_Notes.pdf from your teacher - Safe',
          'Invoice_1234.zip from a stranger - Suspicious',
          'GameUpdate.exe from someone you don\'t know - Suspicious',
          'ClassSchedule.docx from your school - Safe'
        ],
        correctAnswer: 'Homework_Notes.pdf from your teacher - Safe',
        explanation: 'Files from trusted sources about expected topics are safe, while files from strangers or executable files are suspicious.',
        xpReward: 15,
        hint: 'Consider who sent the file and whether you were expecting it.'
      },
      {
        id: 4,
        type: 'short_answer',
        question: 'Why can downloading attachments from strangers be dangerous?',
        explanation: 'Because the file might contain malware that can steal your information, harm your computer, or give hackers access to your system.',
        xpReward: 15,
        hint: 'What could be hidden inside a file that looks innocent?'
      },
      {
        id: 5,
        type: 'multiple_choice',
        question: 'You receive an email saying it has your "account statement" attached, but you never signed up for that account. What should you do?',
        options: [
          'Open the attachment to see what it is',
          'Reply to ask if it\'s safe',
          'Delete or report the email without opening the attachment',
          'Forward it to your friends to check'
        ],
        correctAnswer: 'Delete or report the email without opening the attachment',
        explanation: 'If you never signed up for the account, this is likely malicious. Don\'t open unexpected attachments.',
        xpReward: 10,
        hint: 'Should you open files related to accounts you never created?'
      }
    ]
  },
  {
    id: 25,
    title: "Grammar and Design Clues",
    description: "Spot phishing through poor writing and design",
    hasVideo: true,
    questions: [
      {
        id: 1,
        type: 'short_answer',
        question: 'You get an email that says: "Helo! Your accont is clos! Clik here to verify!" Why should you be suspicious?',
        explanation: 'Because the email has multiple spelling and grammar errors, which legitimate companies usually don\'t make in official communications.',
        xpReward: 15,
        hint: 'Count the spelling mistakes in the message.'
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: 'Which email is most likely phishing?',
        options: [
          '"Hi John, here is the homework you asked for. Thanks – Mr. Smith"',
          '"URGENT!! YOUR ACCT IS BLOCK!! CLICK LINK FAST!!"',
          '"Your order from the bookstore is ready for pickup."',
          '"School lunch menu for next week is attached."'
        ],
        correctAnswer: '"URGENT!! YOUR ACCT IS BLOCK!! CLICK LINK FAST!!"',
        explanation: 'This email has poor grammar, excessive punctuation, urgency tactics, and unprofessional language.',
        xpReward: 10,
        hint: 'Which email looks the most unprofessional and urgent?'
      },
      {
        id: 3,
        type: 'sorting',
        question: 'Sort these into Suspicious or Safe based on writing style:',
        options: [
          '"Your account will be close if you not pay today!!" - Suspicious',
          '"Reminder: Parent-teacher conference on Friday." - Safe',
          '"Yuo Win Prizze noww!!!" - Suspicious',
          '"School Newsletter – March Edition" - Safe'
        ],
        correctAnswer: '"Your account will be close if you not pay today!!" - Suspicious',
        explanation: 'Poor grammar, spelling errors, and excessive punctuation are signs of phishing attempts.',
        xpReward: 15,
        hint: 'Look for proper grammar, spelling, and professional formatting.'
      },
      {
        id: 4,
        type: 'short_answer',
        question: 'Why do phishing emails often have poor spelling and grammar?',
        explanation: 'Because hackers want to target people who aren\'t paying close attention and will click without thinking carefully.',
        xpReward: 15,
        hint: 'What kind of people are hackers trying to target?'
      },
      {
        id: 5,
        type: 'multiple_choice',
        question: 'Which of these is a good clue that an email might be fake?',
        options: [
          'A few spelling errors in a very official-looking email',
          'It includes your correct name and looks well-designed',
          'The email has the school logo and correct address',
          'It came from your teacher about homework'
        ],
        correctAnswer: 'A few spelling errors in a very official-looking email',
        explanation: 'Legitimate companies proofread their official communications. Spelling errors in professional emails are suspicious.',
        xpReward: 10,
        hint: 'What would a real company never do in an official email?'
      }
    ]
  },
  {
    id: 26,
    title: "Requests for Personal Information",
    description: "Recognize when emails inappropriately ask for personal data",
    hasVideo: true,
    questions: [
      {
        id: 1,
        type: 'short_answer',
        question: 'An email says, "We need your username and password to verify your account. Reply now." Why should you never reply?',
        explanation: 'Because legitimate companies never ask for passwords by email, and this is definitely a phishing scam trying to steal your login information.',
        xpReward: 15,
        hint: 'Do real companies ever ask for passwords in emails?'
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: 'Which of these is a red flag that an email is fake?',
        options: [
          'It asks you to confirm your password',
          'It asks you to give your credit card number',
          'It says you must send your personal info to keep your account',
          'All of the above'
        ],
        correctAnswer: 'All of the above',
        explanation: 'Legitimate companies never ask for passwords, credit card info, or personal information via email.',
        xpReward: 10,
        hint: 'What should companies never ask for in an email?'
      },
      {
        id: 3,
        type: 'sorting',
        question: 'Sort these into Safe Requests or Suspicious Requests:',
        options: [
          'Asking you to share your password - Suspicious',
          'Asking you to confirm your address on a secure school portal - Safe',
          'Asking for your credit card info in an email - Suspicious',
          'Sending a reset link you requested - Safe'
        ],
        correctAnswer: 'Asking you to share your password - Suspicious',
        explanation: 'Password and financial information requests via email are always suspicious, while secure portals and requested actions are safer.',
        xpReward: 15,
        hint: 'Which requests involve sharing sensitive information directly?'
      },
      {
        id: 4,
        type: 'short_answer',
        question: 'Why do hackers want personal information like birthdays, addresses, or passwords?',
        explanation: 'Because they can use this information to steal your identity, break into your accounts, or commit fraud in your name.',
        xpReward: 15,
        hint: 'What can criminals do with your personal information?'
      },
      {
        id: 5,
        type: 'multiple_choice',
        question: 'You get an email that says, "We detected unusual activity. Please reply with your login details to keep your account open." What should you do?',
        options: [
          'Reply right away so your account isn\'t deleted',
          'Ignore or report the email—real companies don\'t ask for passwords this way',
          'Forward it to your friends to warn them',
          'Change your password and reply'
        ],
        correctAnswer: 'Ignore or report the email—real companies don\'t ask for passwords this way',
        explanation: 'This is a classic phishing tactic. Real companies have secure ways to verify identity that don\'t involve emailing passwords.',
        xpReward: 10,
        hint: 'How do legitimate companies handle security issues?'
      }
    ]
  },
  {
    id: 27,
    title: "Unexpected Attachments or Links",
    description: "Handle suspicious files and links safely",
    hasVideo: true,
    questions: [
      {
        id: 1,
        type: 'short_answer',
        question: 'You receive an email with an attachment called FreeGame.exe from someone you don\'t know. Why should you not open it?',
        explanation: 'Because .exe files can contain malware that can harm your computer, steal information, or give hackers control of your system.',
        xpReward: 15,
        hint: 'What can executable files (.exe) do to your computer?'
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: 'Which is the safest choice when you get an unexpected email attachment?',
        options: [
          'Open it to see what it is',
          'Forward it to friends first',
          'Delete it or check with the sender before opening',
          'Rename the file and open it anyway'
        ],
        correctAnswer: 'Delete it or check with the sender before opening',
        explanation: 'Never open unexpected attachments. Either delete them or verify with the sender through a different communication method.',
        xpReward: 10,
        hint: 'What\'s the safest approach to unexpected files?'
      },
      {
        id: 3,
        type: 'sorting',
        question: 'Sort these attachments into Safe or Suspicious:',
        options: [
          'HomeworkNotes.pdf from your teacher - Safe',
          'WinPrizeNow.zip from a stranger - Suspicious',
          'Invoice123.docx from an unknown sender - Suspicious',
          'ClassSchedule.docx from school - Safe'
        ],
        correctAnswer: 'HomeworkNotes.pdf from your teacher - Safe',
        explanation: 'Files from trusted sources about expected topics are safe, while files from unknown senders or about unexpected topics are suspicious.',
        xpReward: 15,
        hint: 'Consider the sender and whether you were expecting the file.'
      },
      {
        id: 4,
        type: 'short_answer',
        question: 'Why do hackers often send attachments instead of just links?',
        explanation: 'Because attachments can contain hidden malware programs that automatically install when opened, giving hackers access to your computer.',
        xpReward: 15,
        hint: 'What can be hidden inside an innocent-looking file?'
      },
      {
        id: 5,
        type: 'multiple_choice',
        question: 'You get an email from a "bank" saying, "See attached invoice." You don\'t have an account with that bank. What should you do?',
        options: [
          'Open the attachment to check',
          'Reply asking why they emailed you',
          'Delete or report the email without opening the attachment',
          'Send the file to a friend to see what it is'
        ],
        correctAnswer: 'Delete or report the email without opening the attachment',
        explanation: 'If you don\'t have an account with that bank, this is definitely a scam. Never open suspicious attachments.',
        xpReward: 10,
        hint: 'Should you open files from companies you don\'t have accounts with?'
      }
    ]
  },
  {
    id: 28,
    title: "How Hackers Pretend to Be Someone You Know",
    description: "Recognize impersonation and social engineering tactics",
    hasVideo: true,
    questions: [
      {
        id: 1,
        type: 'short_answer',
        question: 'You get an email that looks like it\'s from your teacher, but it says, "Send me your password so I can fix your account." What clues suggest it might be a hacker pretending to be your teacher?',
        explanation: 'Teachers would never ask for passwords via email, and the email address might be fake or the account might be compromised.',
        xpReward: 15,
        hint: 'What would a real teacher never ask for?'
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: 'Which example shows a hacker pretending to be someone you know?',
        options: [
          'An email from your bank about a password reset you requested',
          'An email that looks like it\'s from your principal asking for money',
          'A newsletter from your school\'s real address',
          'A friend sending a link in person'
        ],
        correctAnswer: 'An email that looks like it\'s from your principal asking for money',
        explanation: 'School officials would never ask for money via email. This is a clear impersonation attempt.',
        xpReward: 10,
        hint: 'Which request would never come from a legitimate school official?'
      },
      {
        id: 3,
        type: 'sorting',
        question: 'Sort these emails into Likely Real or Suspicious/Impersonation:',
        options: [
          '"Reminder: Field trip permission slips due Friday" from teacher\'s real email - Likely Real',
          '"Urgent! Please send gift cards to help me" from principal\'s weird email - Suspicious',
          '"Class notes for today" from teacher\'s normal email - Likely Real',
          '"Hi! I need your password" from friend\'s hacked email - Suspicious'
        ],
        correctAnswer: '"Reminder: Field trip permission slips due Friday" from teacher\'s real email - Likely Real',
        explanation: 'Normal school communications from verified addresses are real, while unusual requests or strange addresses are suspicious.',
        xpReward: 15,
        hint: 'Which messages sound like normal school business versus strange requests?'
      },
      {
        id: 4,
        type: 'short_answer',
        question: 'Why do hackers pretend to be people you know?',
        explanation: 'Because you\'re more likely to trust them and do what they ask, like clicking links or sharing information, when you think it\'s from someone familiar.',
        xpReward: 15,
        hint: 'Who are you more likely to trust and help?'
      },
      {
        id: 5,
        type: 'multiple_choice',
        question: 'You get an email from "mom@gmail.com" saying, "Send me your school login." You\'re suspicious because your mom doesn\'t use Gmail. What should you do?',
        options: [
          'Reply with the password to be safe',
          'Click the links to see if they\'re real',
          'Ignore the email and ask your mom directly if she sent it',
          'Forward it to your friends'
        ],
        correctAnswer: 'Ignore the email and ask your mom directly if she sent it',
        explanation: 'When suspicious, always verify through a different communication method like calling or asking in person.',
        xpReward: 10,
        hint: 'How can you verify if someone really sent you an email?'
      }
    ]
  },
  {
    id: 29,
    title: "Verifying Emails Safely",
    description: "Learn safe methods to verify suspicious communications",
    hasVideo: true,
    questions: [
      {
        id: 1,
        type: 'short_answer',
        question: 'You get an email from "your bank" asking you to click a link to confirm your account. What is a safer way to check if the email is real?',
        explanation: 'Go directly to the bank\'s official website by typing the URL yourself, or call them using the phone number from their official website instead of clicking the email link.',
        xpReward: 15,
        hint: 'How can you contact the company without using anything from the suspicious email?'
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: 'Which is the best way to verify an email that seems suspicious?',
        options: [
          'Click the link to see what happens',
          'Reply to the email asking if it\'s real',
          'Contact the company or person directly using official contact info',
          'Forward the email to friends for advice'
        ],
        correctAnswer: 'Contact the company or person directly using official contact info',
        explanation: 'Always verify through independent contact methods, not through the suspicious email itself.',
        xpReward: 10,
        hint: 'What\'s the most independent way to verify an email?'
      },
      {
        id: 3,
        type: 'sorting',
        question: 'Sort these actions into Safe or Unsafe ways to verify emails:',
        options: [
          'Calling the company with a phone number from their real website - Safe',
          'Clicking the email link to log in - Unsafe',
          'Checking the sender\'s full email address - Safe',
          'Replying with personal info to "confirm" the email - Unsafe'
        ],
        correctAnswer: 'Calling the company with a phone number from their real website - Safe',
        explanation: 'Safe verification uses independent sources, while unsafe methods use information or links from the suspicious email itself.',
        xpReward: 15,
        hint: 'Which methods don\'t rely on the suspicious email itself?'
      },
      {
        id: 4,
        type: 'short_answer',
        question: 'Why is it better to check a company\'s real website than to trust a link in an email?',
        explanation: 'Because hackers can create fake websites that look real, and clicking their links can take you to these fraudulent sites instead of the legitimate company.',
        xpReward: 15,
        hint: 'What can hackers do with links in emails?'
      },
      {
        id: 5,
        type: 'multiple_choice',
        question: 'You receive an email saying you need to update your school password. What is the best response?',
        options: [
          'Click the link and update it immediately',
          'Reply with your password to confirm',
          'Ask a teacher or go to the official school login page yourself',
          'Ignore all emails from the school'
        ],
        correctAnswer: 'Ask a teacher or go to the official school login page yourself',
        explanation: 'Verify the request through official channels and use the official login page, not email links.',
        xpReward: 10,
        hint: 'How can you access your school account safely?'
      }
    ]
  },
  {
    id: 30,
    title: "What to Do When You Get a Suspicious Email",
    description: "Learn proper response procedures for suspicious emails",
    hasVideo: true,
    questions: [
      {
        id: 1,
        type: 'short_answer',
        question: 'You get an email saying you\'ve won a free gaming console if you click a link. What should you do first, and why?',
        explanation: 'Delete the email or report it as phishing because it\'s likely a scam designed to steal personal information or install malware.',
        xpReward: 15,
        hint: 'What\'s the safest first response to unexpected prizes?'
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: 'What is the best way to handle a suspicious email?',
        options: [
          'Reply and ask if it\'s real',
          'Forward it to friends',
          'Delete it or use the report button without clicking any links',
          'Save it in case you want the prize later'
        ],
        correctAnswer: 'Delete it or use the report button without clicking any links',
        explanation: 'The safest approach is to delete or report suspicious emails without interacting with any of their content.',
        xpReward: 10,
        hint: 'What action involves the least risk?'
      },
      {
        id: 3,
        type: 'sorting',
        question: 'Sort these actions into Safe or Unsafe responses to suspicious emails:',
        options: [
          'Deleting the email without opening it - Safe',
          'Clicking the link to see if it\'s fake - Unsafe',
          'Reporting it as phishing - Safe',
          'Replying with personal info to verify it - Unsafe'
        ],
        correctAnswer: 'Deleting the email without opening it - Safe',
        explanation: 'Safe responses avoid any interaction with the suspicious content, while unsafe responses involve clicking or replying.',
        xpReward: 15,
        hint: 'Which actions involve interacting with the suspicious email?'
      },
      {
        id: 4,
        type: 'short_answer',
        question: 'Why is replying to a suspicious email a bad idea even if you don\'t share any personal information?',
        explanation: 'Because replying confirms to the hacker that your email address is active and real, leading them to send you more scam emails.',
        xpReward: 15,
        hint: 'What does replying tell the hacker about your email address?'
      },
      {
        id: 5,
        type: 'multiple_choice',
        question: 'Your classmate opens a suspicious email and clicks the link. What is the best next step?',
        options: [
          'Ignore it and hope nothing happens',
          'Tell a teacher or adult immediately so they can report it and check for problems',
          'Delete the email and do nothing else',
          'Forward it to more friends so they know'
        ],
        correctAnswer: 'Tell a teacher or adult immediately so they can report it and check for problems',
        explanation: 'When someone falls for a phishing attempt, immediate adult intervention is needed to minimize damage and secure systems.',
        xpReward: 10,
        hint: 'Who should handle potential security incidents?'
      }
    ]
  }
];