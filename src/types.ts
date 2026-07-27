export type ActiveTab = 'tutor' | 'scenarios' | 'games' | 'favorites';

export interface PhraseItem {
  id: string;
  category: string;
  english: string;
  hebrew: string;
  hebrewTransliteration: string; // Phonetic Hebrew guide e.g. "גּוּד מוֹרְנִינְגּ"
  icon: string;
  audioSlowText?: string;
  audioNormalText?: string;
  usageContextHebrew?: string;
  exampleResponseEnglish?: string;
  exampleResponseHebrew?: string;
}

export interface ScenarioCategory {
  id: string;
  titleHebrew: string;
  titleEnglish: string;
  descriptionHebrew: string;
  iconName: string;
  colorBg: string;
  colorText: string;
  phrases: PhraseItem[];
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  english: string;
  hebrewTranslation?: string;
  hebrewTransliteration?: string;
  encouragementHebrew?: string;
  suggestedOptions?: Array<{
    english: string;
    hebrew: string;
    transliteration: string;
  }>;
  timestamp: number;
}

export interface UserStats {
  stars: number;
  streakDays: number;
  completedPractices: number;
  favoriteIds: string[];
  speechSpeed: number; // 0.75 or 1.0
}
