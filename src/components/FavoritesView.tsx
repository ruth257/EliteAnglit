import React from 'react';
import { SCENARIOS_DATA } from '../data/phrasesData';
import { PhraseItem, UserStats } from '../types';
import { speakText } from '../utils/speech';
import { Volume2, Snail, Heart, Mic, Trophy, Sparkles, ArrowRight } from 'lucide-react';

interface FavoritesViewProps {
  stats: UserStats;
  toggleFavorite: (id: string) => void;
  openPronunciationModal: (phrase: PhraseItem) => void;
  goToScenarios: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  stats,
  toggleFavorite,
  openPronunciationModal,
  goToScenarios,
}) => {
  // Collect all favorite phrases across categories
  const allPhrases = SCENARIOS_DATA.flatMap((cat) => cat.phrases);
  const favoritePhrases = allPhrases.filter((p) => stats.favoriteIds.includes(p.id));

  const handlePlayAudio = (phrase: PhraseItem, isSlow = false) => {
    const speed = isSlow ? 0.65 : stats.speechSpeed;
    speakText(phrase.english, 'en-US', speed);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-2">
      {/* Trophy Badges Cabinet Header */}
      <div className="bg-pink-500 text-white border-b-8 border-pink-700 rounded-[32px] p-6 text-right flex flex-col gap-5 shadow-xl">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-amber-300" />
          <h2 className="text-2xl sm:text-3xl font-black font-serif">
            המועדפים וההישגים של עלית
          </h2>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="bg-white/95 border-2 border-pink-200 rounded-2xl p-4 flex items-center gap-3 text-stone-900 shadow-sm">
            <span className="text-4xl">🥇</span>
            <div>
              <p className="font-black text-stone-900 text-base">אלופת ההתמדה</p>
              <p className="text-sm text-pink-900 font-bold">{stats.streakDays} ימי תרגול ברצף</p>
            </div>
          </div>

          <div className="bg-white/95 border-2 border-pink-200 rounded-2xl p-4 flex items-center gap-3 text-stone-900 shadow-sm">
            <span className="text-4xl">⭐</span>
            <div>
              <p className="font-black text-stone-900 text-base">כוכבת האנגלית</p>
              <p className="text-sm text-pink-900 font-bold">{stats.stars} כוכבים שנאספו</p>
            </div>
          </div>

          <div className="bg-white/95 border-2 border-pink-200 rounded-2xl p-4 flex items-center gap-3 text-stone-900 shadow-sm">
            <span className="text-4xl">💖</span>
            <div>
              <p className="font-black text-stone-900 text-base">משפטים מועדפים</p>
              <p className="text-sm text-pink-900 font-bold">{favoritePhrases.length} ביטויים ששמרת</p>
            </div>
          </div>
        </div>
      </div>

      {/* Favorite Phrases List */}
      {favoritePhrases.length === 0 ? (
        <div className="bg-white border-8 border-amber-300 rounded-[40px] p-10 text-center flex flex-col items-center gap-5 shadow-xl">
          <Heart className="w-20 h-20 text-rose-400 fill-rose-100 animate-pulse" />
          <h3 className="text-3xl font-black text-stone-900 font-serif">
            עדיין לא שמרת ביטויים מועדפים
          </h3>
          <p className="text-stone-700 text-lg font-bold max-w-md">
            בזמן התרגול בתרחישי השיחה, לחצי על סמל הלב ליד כל משפט שאת אוהבת כדי לשמור אותו כאן!
          </p>
          <button
            onClick={goToScenarios}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xl border-b-8 border-orange-800 shadow-xl transition-all active:scale-95 cursor-pointer"
          >
            <span>למעבר לתרחישי השיחה</span>
            <ArrowRight className="w-6 h-6 rotate-180" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xl font-black text-stone-900 text-right font-serif">
            ביטויים ששמרת לתרגול מהיר:
          </p>
          {favoritePhrases.map((phrase) => (
            <div
              key={phrase.id}
              className="bg-white border-4 border-rose-200 hover:border-rose-400 rounded-[32px] p-6 shadow-md flex flex-col gap-4 text-right"
            >
              <div className="flex items-center justify-between border-b-2 border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{phrase.icon}</span>
                  <span className="text-sm font-black text-rose-900 bg-rose-100 border border-rose-300 px-4 py-1 rounded-full">
                    {phrase.usageContextHebrew}
                  </span>
                </div>
                <button
                  onClick={() => toggleFavorite(phrase.id)}
                  title="הסרי מהמועדפים"
                  className="p-2.5 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 cursor-pointer"
                >
                  <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
                </button>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-stone-900 dir-ltr text-right font-sans tracking-tight">
                "{phrase.english}"
              </div>

              <div className="bg-amber-100/90 border-2 border-amber-300 rounded-2xl p-4">
                <span className="text-xs font-black text-amber-900 block mb-1">תעתיק עברי:</span>
                <span className="text-2xl font-black text-amber-950 font-serif">
                  {phrase.hebrewTransliteration}
                </span>
              </div>

              <p className="text-lg text-stone-800 font-bold">
                <span className="font-black text-stone-900">פירוש:</span> {phrase.hebrew}
              </p>

              <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-stone-100">
                <button
                  onClick={() => handlePlayAudio(phrase, false)}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-black text-base border-b-4 border-blue-800 cursor-pointer shadow-md"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>השמיעי 🔊</span>
                </button>
                <button
                  onClick={() => handlePlayAudio(phrase, true)}
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-100 text-amber-950 font-black text-base border-2 border-amber-300 border-b-4 cursor-pointer"
                >
                  <Snail className="w-5 h-5 text-amber-800" />
                  <span>לאט 🐢</span>
                </button>
                <button
                  onClick={() => openPronunciationModal(phrase)}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base border-b-4 border-emerald-800 cursor-pointer shadow-md"
                >
                  <Mic className="w-5 h-5" />
                  <span>תרגלי היגוי 🎙️</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
