import { ScenarioCategory, PhraseItem } from '../types';

export const SCENARIOS_DATA: ScenarioCategory[] = [
  {
    id: 'cafe',
    titleHebrew: 'בבית הקפה והמסעדה',
    titleEnglish: 'At the Cafe & Restaurant',
    descriptionHebrew: 'איך להזמין תה, קפה, מים או קינוח בקלות ובחיוך',
    iconName: 'Coffee',
    colorBg: 'bg-amber-100 text-amber-900 border-amber-300',
    colorText: 'text-amber-800',
    phrases: [
      {
        id: 'cafe-1',
        category: 'cafe',
        english: 'A cup of tea, please.',
        hebrew: 'כוס תה, בבקשה.',
        hebrewTransliteration: 'אָ קַאפּ אוֹף טִי, פְּלִיז',
        icon: '☕',
        usageContextHebrew: 'להזמנת תה חם בבית קפה או מסעדה',
        exampleResponseEnglish: 'Sure, with milk or lemon?',
        exampleResponseHebrew: 'בטח, עם חלב או לימון?'
      },
      {
        id: 'cafe-2',
        category: 'cafe',
        english: 'Water, please.',
        hebrew: 'מים, בבקשה.',
        hebrewTransliteration: 'וָואטֶר, פְּלִיז',
        icon: '🥛',
        usageContextHebrew: 'כשרוצים לבקש כוס מים צוננים',
        exampleResponseEnglish: 'Here you go, ma\'am!',
        exampleResponseHebrew: 'בבקשה, גברתי!'
      },
      {
        id: 'cafe-3',
        category: 'cafe',
        english: 'How much is it?',
        hebrew: 'כמה זה עולה?',
        hebrewTransliteration: 'הָאוּ מָאץ\' אִיז אִית?',
        icon: '💳',
        usageContextHebrew: 'לשאול לגבי המחיר או החשבון',
        exampleResponseEnglish: 'It is five dollars, please.',
        exampleResponseHebrew: 'זה חמישה דולרים, בבקשה.'
      },
      {
        id: 'cafe-4',
        category: 'cafe',
        english: 'Thank you very much!',
        hebrew: 'תודה רבה רבה!',
        hebrewTransliteration: 'תֶּנְק יוּ וֶורִי מָאץ\'!',
        icon: '🙏',
        usageContextHebrew: 'להגיד תודה לבבית למלצר או לקופאי',
        exampleResponseEnglish: 'You are welcome! Have a great day!',
        exampleResponseHebrew: 'בשמחה! שיהיה לך יום נהדר!'
      },
      {
        id: 'cafe-5',
        category: 'cafe',
        english: 'Delicious! Thank you.',
        hebrew: 'טעים מאוד! תודה.',
        hebrewTransliteration: 'דֶלִישֶׁס! תֶּנְק יוּ',
        icon: '🍰',
        usageContextHebrew: 'להחמיא על העוגה או האוכל',
        exampleResponseEnglish: 'Thank you! Glad you enjoyed it.',
        exampleResponseHebrew: 'תודה! שמחים שנהנית.'
      }
    ]
  },
  {
    id: 'grandchildren',
    titleHebrew: 'מדברים עם הנכדים והמשפחה',
    titleEnglish: 'Family & Grandchildren',
    descriptionHebrew: 'ביטויים חמים, חיבוקים ושאלות יומיומיות לנכדים',
    iconName: 'Heart',
    colorBg: 'bg-rose-100 text-rose-900 border-rose-300',
    colorText: 'text-rose-800',
    phrases: [
      {
        id: 'grand-1',
        category: 'grandchildren',
        english: 'I love you so much!',
        hebrew: 'אני אוהבת אותך כל כך!',
        hebrewTransliteration: 'איי לוֹבְ יוּ סוֹ מָאץ\'!',
        icon: '❤️',
        usageContextHebrew: 'המשפט הכי חשוב להגיד לנכד או נכדה',
        exampleResponseEnglish: 'I love you too, Grandma!',
        exampleResponseHebrew: 'גם אני אוהב/ת אותך, סבתא!'
      },
      {
        id: 'grand-2',
        category: 'grandchildren',
        english: 'How was school today?',
        hebrew: 'איך היה בבית הספר היום?',
        hebrewTransliteration: 'הָאוּ וָואז סְקוּל טוֹדֵיי?',
        icon: '🏫',
        usageContextHebrew: 'לשאול את הנכדים איך עבר עליהם היום',
        exampleResponseEnglish: 'It was great! I learned math.',
        exampleResponseHebrew: 'היה מעולה! למדתי חשבון.'
      },
      {
        id: 'grand-3',
        category: 'grandchildren',
        english: 'Are you hungry, darling?',
        hebrew: 'אתה/את רעב/ה, חמוד/ה?',
        hebrewTransliteration: 'אָר יוּ הַנְגְרִי, דָארְלִינְגּ?',
        icon: '🍲',
        usageContextHebrew: 'לשאול בחיבה אם רוצים לאכול',
        exampleResponseEnglish: 'Yes Grandma, I would love some cake!',
        exampleResponseHebrew: 'כן סבתא, אשמח לקצת עוגה!'
      },
      {
        id: 'grand-4',
        category: 'grandchildren',
        english: 'Give me a big hug!',
        hebrew: 'תני/תן לי חיבוק גדול!',
        hebrewTransliteration: 'גִּיבְ מִי אָ בִּיג הָאג!',
        icon: '🤗',
        usageContextHebrew: 'כשרוצים לחבק את הנכדים',
        exampleResponseEnglish: 'Big hug for Grandma!',
        exampleResponseHebrew: 'חיבוק גדול לסבתא!'
      },
      {
        id: 'grand-5',
        category: 'grandchildren',
        english: 'I am so proud of you!',
        hebrew: 'אני כל כך גאה בך!',
        hebrewTransliteration: 'איי אם סוֹ פְּרָאוּד אוֹף יוּ!',
        icon: '🌟',
        usageContextHebrew: 'להחמיא ולעודד נכד על הישג',
        exampleResponseEnglish: 'Thank you Grandma! You are the best.',
        exampleResponseHebrew: 'תודה סבתא! את הכי טובה בעולם.'
      }
    ]
  },
  {
    id: 'greetings',
    titleHebrew: 'ברכות ופגישות יומיומיות',
    titleEnglish: 'Greetings & Daily Talk',
    descriptionHebrew: 'בוקר טוב, מה שלומך, להתראות ומילים טובות',
    iconName: 'Sun',
    colorBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    colorText: 'text-emerald-800',
    phrases: [
      {
        id: 'greet-1',
        category: 'greetings',
        english: 'Good morning!',
        hebrew: 'בוקר טוב!',
        hebrewTransliteration: 'גּוּד מוֹרְנִינְגּ!',
        icon: '☀️',
        usageContextHebrew: 'ברכת בוקר טוב לכל מי שפוגשים',
        exampleResponseEnglish: 'Good morning! Beautiful day today.',
        exampleResponseHebrew: 'בוקר טוב! יום יפהפה היום.'
      },
      {
        id: 'greet-2',
        category: 'greetings',
        english: 'How are you today?',
        hebrew: 'מה שלומך היום?',
        hebrewTransliteration: 'הָאוּ אָר יוּ טוֹדֵיי?',
        icon: '😊',
        usageContextHebrew: 'לשאול לשלום חבר או מכר',
        exampleResponseEnglish: 'I am doing well, thank you!',
        exampleResponseHebrew: 'שלומי טוב מאוד, תודה!'
      },
      {
        id: 'greet-3',
        category: 'greetings',
        english: 'Nice to meet you.',
        hebrew: 'נעים להכיר אותך.',
        hebrewTransliteration: 'נַייְס טוּ מִיט יוּ.',
        icon: '🤝',
        usageContextHebrew: 'כשפוגשים אדם חדש',
        exampleResponseEnglish: 'Nice to meet you too!',
        exampleResponseHebrew: 'נעים להכיר אותך גם!'
      },
      {
        id: 'greet-4',
        category: 'greetings',
        english: 'Have a wonderful day!',
        hebrew: 'שיהיה לך יום נפלא!',
        hebrewTransliteration: 'הֶבְ אָ וָואנְדֶרְפוּל דֵיי!',
        icon: '🌸',
        usageContextHebrew: 'איחול חם ונחמד כשנפרדים',
        exampleResponseEnglish: 'Thank you, you too!',
        exampleResponseHebrew: 'תודה, גם לך!'
      },
      {
        id: 'greet-5',
        category: 'greetings',
        english: 'See you later!',
        hebrew: 'נתראה מאוחר יותר!',
        hebrewTransliteration: 'סִי יוּ לֵייטֶר!',
        icon: '👋',
        usageContextHebrew: 'להיפרד לשלום בקלילות',
        exampleResponseEnglish: 'Bye bye! Take care!',
        exampleResponseHebrew: 'ביי ביי! שמרי על עצמך!'
      }
    ]
  },
  {
    id: 'travel',
    titleHebrew: 'בטיסה ובשדה התעופה',
    titleEnglish: 'Travel & Airport',
    descriptionHebrew: 'שאלות פשוטות בשדה התעופה, במטוס ובמלון',
    iconName: 'Plane',
    colorBg: 'bg-sky-100 text-sky-900 border-sky-300',
    colorText: 'text-sky-800',
    phrases: [
      {
        id: 'travel-1',
        category: 'travel',
        english: 'Excuse me, where is gate 5?',
        hebrew: 'סליחה, איפה שער 5?',
        hebrewTransliteration: 'אֶקְסְקְיוּז מִי, וֶור אִיז גֵייט פָייבְ?',
        icon: '✈️',
        usageContextHebrew: 'לשאול איפה שער העלייה למטוס',
        exampleResponseEnglish: 'It is straight ahead, on the right.',
        exampleResponseHebrew: 'זה ישר קדימה, מצד ימין.'
      },
      {
        id: 'travel-2',
        category: 'travel',
        english: 'Where is my seat?',
        hebrew: 'איפה המקום/הכיסא שלי?',
        hebrewTransliteration: 'וֶור אִיז מַיי סִיט?',
        icon: '💺',
        usageContextHebrew: 'לשאול את הדייל/ת במטוס לגבי המושב',
        exampleResponseEnglish: 'Row 12, right next to the window.',
        exampleResponseHebrew: 'שורה 12, ממש ליד החלון.'
      },
      {
        id: 'travel-3',
        category: 'travel',
        english: 'Where is the restroom?',
        hebrew: 'איפה השירותים?',
        hebrewTransliteration: 'וֶור אִיז דֶה רֶסְטְרוּם?',
        icon: '🚻',
        usageContextHebrew: 'לשאול איפה השירותים בשדה או במטוס',
        exampleResponseEnglish: 'Just around the corner.',
        exampleResponseHebrew: 'ממש מעבר לפינה.'
      },
      {
        id: 'travel-4',
        category: 'travel',
        english: 'Where is my luggage?',
        hebrew: 'איפה המזוודה/המטען שלי?',
        hebrewTransliteration: 'וֶור אִיז מַיי לָאגֶּדְג\'?',
        icon: '🧳',
        usageContextHebrew: 'בעת איסוף המזוודות',
        exampleResponseEnglish: 'Belt number 3 over there.',
        exampleResponseHebrew: 'מסוע מספר 3 שם ממול.'
      }
    ]
  },
  {
    id: 'doctor',
    titleHebrew: 'אצל הרופא והרוקח',
    titleEnglish: 'Doctor & Pharmacy',
    descriptionHebrew: 'איך להסביר בקלות מה כואב או לבקש מים ותרופה',
    iconName: 'Activity',
    colorBg: 'bg-teal-100 text-teal-900 border-teal-300',
    colorText: 'text-teal-800',
    phrases: [
      {
        id: 'doc-1',
        category: 'doctor',
        english: 'I have a headache.',
        hebrew: 'יש לי כאב ראש.',
        hebrewTransliteration: 'איי הֶבְ אָ הֶדְאֵייק',
        icon: '💊',
        usageContextHebrew: 'להסביר לרוקח או לרופא שאינך מרגישה טוב',
        exampleResponseEnglish: 'I will give you some pain medicine.',
        exampleResponseHebrew: 'אתן לך תרופה להקלת הכאב.'
      },
      {
        id: 'doc-2',
        category: 'doctor',
        english: 'I need water, please.',
        hebrew: 'אני צריכה מים, בבקשה.',
        hebrewTransliteration: 'איי נִיד וָואטֶר, פְּלִיז',
        icon: '💧',
        usageContextHebrew: 'לבקש לשתות בבית מרקחת או מרפאה',
        exampleResponseEnglish: 'Here is a cup of fresh water.',
        exampleResponseHebrew: 'הנה כוס מים צוננים.'
      },
      {
        id: 'doc-3',
        category: 'doctor',
        english: 'I feel much better, thank you!',
        hebrew: 'אני מרגישה הרבה יותר טוב, תודה!',
        hebrewTransliteration: 'איי פִיל מָאץ\' בֵּטֶר, תֶּנְק יוּ!',
        icon: '🩺',
        usageContextHebrew: 'להגיד לרופא/ה או לאחות שההרגשה השתפרה',
        exampleResponseEnglish: 'Wonderful news! Stay healthy!',
        exampleResponseHebrew: 'חדשות נפלאות! תהיי בריאה!'
      }
    ]
  }
];

export const FUN_QUIZ_QUESTIONS = [
  {
    id: 'q1',
    englishAudio: 'Good morning!',
    hebrewMeaning: 'בוקר טוב!',
    hebrewTransliteration: 'גּוּד מוֹרְנִינְגּ!',
    optionsHebrew: ['בוקר טוב!', 'לילה טוב!', 'תודה רבה!', 'בבקשה!'],
    correctIndex: 0,
    icon: '☀️'
  },
  {
    id: 'q2',
    englishAudio: 'A cup of tea, please.',
    hebrewMeaning: 'כוס תה, בבקשה.',
    hebrewTransliteration: 'אָ קַאפּ אוֹף טִי, פְּלִיז',
    optionsHebrew: ['כוס קפה, בבקשה.', 'כוס תה, בבקשה.', 'בקבוק מים.', 'חשבון, בבקשה.'],
    correctIndex: 1,
    icon: '☕'
  },
  {
    id: 'q3',
    englishAudio: 'I love you so much!',
    hebrewMeaning: 'אני אוהבת אותך כל כך!',
    hebrewTransliteration: 'איי לוֹבְ יוּ סוֹ מָאץ\'!',
    optionsHebrew: ['איפה השירותים?', 'מה המצב?', 'אני אוהבת אותך כל כך!', 'איך קוראים לך?'],
    correctIndex: 2,
    icon: '❤️'
  },
  {
    id: 'q4',
    englishAudio: 'Thank you very much!',
    hebrewMeaning: 'תודה רבה רבה!',
    hebrewTransliteration: 'תֶּנְק יוּ וֶורִי מָאץ\'!',
    optionsHebrew: ['סליחה!', 'תודה רבה רבה!', 'בוקר אור!', 'אין בעיה!'],
    correctIndex: 1,
    icon: '🙏'
  }
];
