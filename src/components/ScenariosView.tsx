import React, { useState } from 'react';
import { SCENARIOS_DATA } from '../data/phrasesData';
import { PhraseItem, UserStats } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';
import { Volume2, Snail, Heart, Mic, CheckCircle2, Coffee, HeartHandshake, Sun, Plane, Activity, Sparkles } from 'lucide-react';

interface ScenariosViewProps {
  stats: UserStats;
  toggleFavorite: (id: string) => void;
  openPronunciationModal: (phrase: PhraseItem) => void;
}

export const ScenariosView: React.FC<ScenariosViewProps> = ({
  stats,
  toggleFavorite,
  openPronunciationModal
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('cafe');
  const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);

  const activeCategory = SCENARIOS_DATA.find((c) => c.id === activeCategoryId) || SCENARIOS_DATA[0];

  const handlePlayAudio = (phrase: PhraseItem, isSlow = false) => {
    setPlayingPhraseId(phrase.id);
    const speed = isSlow ? 0.65 : stats.speechSpeed;
    speakText(phrase.english, 'en-US', speed, () => {
      setPlayingPhraseId(null);
    });
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="w-6 h-6" />;
      case 'Heart': return <Heart className="w-6 h-6 text-rose-500 fill-rose-300" />;
      case 'Sun': return <Sun className="w-6 h-6 text-amber-500" />;
      case 'Plane': return <Plane className="w-6 h-6 text-sky-500" />;
      case 'Activity': return <Activity className="w-6 h-6 text-teal-500" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto py-2">
      {/* Header Description */}
      <div className="bg-blue-500 text-white border-b-8 border-blue-700 rounded-[32px] p-6 text-right shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif">
            תרחישי שיחה לחיים היומיומיים
          </h2>
          <p className="text-blue-100 text-base font-bold mt-1">
            למדי משפטים שימושיים לקפה, לנכדים, לשדה התעופה ולרופא - הכל עם קול ותעתיק עברי!
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {SCENARIOS_DATA.map((cat) => {
          const isSelected = cat.id === activeCategoryId;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-4 transition-all cursor-pointer min-h-[96px] text-center ${
                isSelected
                  ? 'bg-orange-500 text-white border-orange-700 shadow-lg border-b-8 scale-102 font-black'
                  : 'bg-white text-stone-900 border-amber-200 hover:bg-amber-100/80 font-bold'
              }`}
            >
              <div className="mb-1">{getCategoryIcon(cat.iconName)}</div>
              <span className="text-base font-serif font-black">{cat.titleHebrew}</span>
            </button>
          );
        })}
      </div>

      {/* Phrases Cards List */}
      <div className="space-y-5">
        {activeCategory.phrases.map((phrase) => {
          const isFavorite = stats.favoriteIds.includes(phrase.id);
          const isPlaying = playingPhraseId === phrase.id;

          return (
            <div
              key={phrase.id}
              className="bg-white border-4 border-amber-200 hover:border-amber-400 rounded-[32px] p-6 shadow-md transition-all hover:shadow-xl flex flex-col gap-4"
            >
              {/* Top Row: Icon, Usage Context, Favorite Heart */}
              <div className="flex items-center justify-between border-b-2 border-stone-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-3 bg-amber-100 rounded-2xl border-2 border-amber-200">
                    {phrase.icon}
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-black text-amber-900 bg-amber-100 border border-amber-300 px-4 py-1.5 rounded-full">
                      {phrase.usageContextHebrew}
                    </span>
                  </div>
                </div>

                {/* Favorite Toggle Button */}
                <button
                  onClick={() => toggleFavorite(phrase.id)}
                  title={isFavorite ? 'הסרי מהמועדפים' : 'הוסיפי למועדפים'}
                  className={`p-3 rounded-full border-2 transition-all cursor-pointer ${
                    isFavorite
                      ? 'bg-rose-100 border-rose-400 text-rose-600 scale-110 shadow-sm'
                      : 'bg-stone-50 border-stone-200 text-stone-400 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Main Content: English & Hebrew Transliteration */}
              <div className="flex flex-col gap-3 text-right">
                {/* Large English Phrase */}
                <div className="text-3xl sm:text-4xl font-black text-stone-900 dir-ltr text-right font-sans tracking-tight">
                  "{phrase.english}"
                </div>

                {/* Hebrew Transliteration */}
                <div className="bg-amber-100/90 border-2 border-amber-300 rounded-2xl p-4 text-right">
                  <span className="text-xs font-black text-amber-900 block mb-1">
                    איך להגיד בקול עברי (תעתיק):
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-950 font-serif">
                    {phrase.hebrewTransliteration}
                  </span>
                </div>

                {/* Hebrew Meaning */}
                <p className="text-lg sm:text-xl text-stone-800 font-bold">
                  <span className="font-extrabold text-stone-900">פירוש: </span>
                  {phrase.hebrew}
                </p>

                {/* Example Reply if available */}
                {phrase.exampleResponseEnglish && (
                  <div className="mt-1 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 text-sm sm:text-base text-stone-800">
                    <span className="font-black text-blue-900 block mb-1">
                      מה הצד השני עשוי להשיב:
                    </span>
                    <span className="font-extrabold text-rose-800 dir-ltr inline-block mr-2 text-lg">
                      "{phrase.exampleResponseEnglish}"
                    </span>
                    <span className="text-stone-700 font-bold">({phrase.exampleResponseHebrew})</span>
                  </div>
                )}
              </div>

              {/* Action Audio Buttons Bar */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t-2 border-stone-100">
                {/* Play Audio Button */}
                <button
                  onClick={() => handlePlayAudio(phrase, false)}
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-base transition-all active:scale-95 cursor-pointer border-b-4 ${
                    isPlaying
                      ? 'bg-amber-600 text-white border-amber-800 ring-4 ring-amber-300 animate-pulse'
                      : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-800 shadow-md'
                  }`}
                >
                  <Volume2 className="w-6 h-6" />
                  <span>השמיעי בקול 🔊</span>
                </button>

                {/* Slow Audio Button */}
                <button
                  onClick={() => handlePlayAudio(phrase, true)}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-base border-2 border-amber-300 border-b-4 transition-all active:scale-95 cursor-pointer"
                >
                  <Snail className="w-5 h-5 text-amber-800" />
                  <span>השמיעי לאט 🐢</span>
                </button>

                {/* Record / Practice Speech Button */}
                <button
                  onClick={() => openPronunciationModal(phrase)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base border-b-4 border-emerald-800 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Mic className="w-5 h-5" />
                  <span>תרגלי היגוי 🎙️</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
