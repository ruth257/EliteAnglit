import { ChatMessage } from '../types';

interface CachedResponse {
  keywords: string[];
  response: {
    english: string;
    hebrewTranslation: string;
    hebrewTransliteration: string;
    encouragementHebrew: string;
    suggestedOptions: Array<{
      english: string;
      hebrew: string;
      transliteration: string;
    }>;
  };
}

export const PRECACHED_RESPONSES: CachedResponse[] = [
  {
    keywords: ['hello', 'hi', 'morning', 'שלום', 'בוקר'],
    response: {
      english: "Good morning Elit! How are you feeling today?",
      hebrewTranslation: "בוקר טוב עלית! איך את מרגישה היום?",
      hebrewTransliteration: "גּוּד מוֹרְנִינְגּ עָלִית! הַאוּ אָר יוּ פִילִינְגּ טוּדֵיי?",
      encouragementHebrew: "איזו התחלה מתוקה עלית! 🍫",
      suggestedOptions: [
        { english: "I feel wonderful!", hebrew: "אני מרגישה נפלא!", transliteration: "אַיי פִיל וַואנְדֶרְפוּל!" },
        { english: "I would like some coffee", hebrew: "הייתי רוצה קפה", transliteration: "אַיי ווּד לַייק סַאם כּוֹפִי" },
        { english: "Thank you my friend!", hebrew: "תודה רבה חברה שלי!", transliteration: "תֶּנְק יוּ מַאי פְרֶנְד!" }
      ]
    }
  },
  {
    keywords: ['coffee', 'tea', 'drink', 'קפה', 'תה', 'שתיה'],
    response: {
      english: "A hot coffee with chocolate is wonderful! Enjoy your warm cup Elit!",
      hebrewTranslation: "קפה חם עם שוקולד זה נפלא! תיהני מהכוס החמה עלית!",
      hebrewTransliteration: "אֵי הוֹט כּוֹפִי וִויז שׁוֹקוֹלָט אִיז וַואנְדֶרְפוּל! אֶנְג'וֹי יוֹר וָואורְם כַּאפּ עָלִית!",
      encouragementHebrew: "כל הכבוד! דיברת מקסים ☕🍫",
      suggestedOptions: [
        { english: "It is delicious!", hebrew: "זה טעים מאוד!", transliteration: "אִיאט אִיז דֶלִישָׁאס!" },
        { english: "Thank you Suzy!", hebrew: "תודה לך סוזי!", transliteration: "תֶּנְק יוּ סוּזִי!" },
        { english: "I love chocolate!", hebrew: "אני אוהבת שוקולד!", transliteration: "אַיי לַאבְ שׁוֹקוֹלָט!" }
      ]
    }
  },
  {
    keywords: ['grandkids', 'family', 'love', 'משפחה', 'נכדים', 'אהבה', 'טוב'],
    response: {
      english: "Family is the most important thing! I love chatting with you Elit!",
      hebrewTranslation: "משפחה זה הדבר הכי חשוב! אני אוהבת לשוחח איתך עלית!",
      hebrewTransliteration: "פֶאמִילִי אִיז דֶה מוֹסְט אִמְפּוֹרְטַנְט תִ'ינְגּ! אַיי לַאבְ צָ'אטִינְגּ וִויז יוּ עָלִית!",
      encouragementHebrew: "טוב לי עם עלית! 🍫🌟",
      suggestedOptions: [
        { english: "You are so sweet!", hebrew: "את כל כך מתוקה!", transliteration: "יוּ אָר סוֹ סְוִויט!" },
        { english: "I love my family", hebrew: "אני אוהבת את המשפחה שלי", transliteration: "אַיי לַאבְ מַאי פֶאמִילִי" },
        { english: "See you soon!", hebrew: "נתראה בקרוב!", transliteration: "סִי יוּ סוּן!" }
      ]
    }
  },
  {
    keywords: ['thank', 'thanks', 'תודה', 'טוב'],
    response: {
      english: "You are very welcome Elit! You are doing great!",
      hebrewTranslation: "בכיף רב עלית! את עושה עבודה מעולה!",
      hebrewTransliteration: "יוּ אָר וֶורִי וֶולְקַאם עָלִית! יוּ אָר דּוּאִינְגּ גְרֵייט!",
      encouragementHebrew: "איזו תלמידה מופלאה עלית! 🌟",
      suggestedOptions: [
        { english: "Have a wonderful day!", hebrew: "שיהיה יום נפלא!", transliteration: "הֶבְ אָ וַואנְדֶרְפוּל דֵיי!" },
        { english: "I like learning English", hebrew: "אני אוהבת ללמוד אנגלית", transliteration: "אַיי לַאייק לֶרְנִינְגּ אִינְגְלִישׁ" }
      ]
    }
  }
];

export const DEFAULT_FALLBACK_RESPONSE = {
  english: "Very good Elit! Keep practicing speaking with me!",
  hebrewTranslation: "כל הכבוד עלית! המשיכי לתרגל איתי בדיבור!",
  hebrewTransliteration: "וֶורִי גּוּד עָלִית! כִּיפּ פְרַאקְטִיסִינְגּ סְפִּיכִּינְגּ וִויז מִי!",
  encouragementHebrew: "טוב לי עם עלית! 🍫⭐",
  suggestedOptions: [
    { english: "Thank you very much!", hebrew: "תודה רבה רבה!", transliteration: "תֶּנְק יוּ וֶורִי מָאץ'!" },
    { english: "I enjoy this lesson!", hebrew: "אני נהנית מהשיעור הזה!", transliteration: "אַיי אֶנְג'וֹי דִּיס לֶסוֹן!" },
    { english: "Have a nice day!", hebrew: "שיהיה לך יום נעים!", transliteration: "הֶבְ אָ נַייְס דֵיי!" }
  ]
};

export function getCachedAIResponse(userInput: string) {
  const lower = userInput.toLowerCase();
  for (const item of PRECACHED_RESPONSES) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.response;
    }
  }
  return DEFAULT_FALLBACK_RESPONSE;
}
