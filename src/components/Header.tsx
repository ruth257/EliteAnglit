import React from 'react';
import { ActiveTab, UserStats } from '../types';
import { Sparkles, MessageCircle, Volume2, Trophy, Heart, Snail, Zap } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  stats: UserStats;
  toggleSpeed: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  stats,
  toggleSpeed,
}) => {
  return (
    <header className="bg-white border-b-4 border-amber-200 relative z-20 shadow-md">
      <div className="max-w-5xl mx-auto px-3 py-3 sm:px-6 sm:py-4">
        {/* Top Branding & Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b-2 border-amber-100">
          <div className="flex items-center gap-3 text-right w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl shadow-md border-2 border-orange-600 font-black shrink-0">
                ע
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-black text-orange-950 tracking-tight font-serif">
                  עלית לומדת אנגלית
                </h1>
                <p className="text-xs sm:text-base text-amber-900 font-bold">
                  שיחה, אוצר מילים והיגוי בקול 🍫 טוב לי עם עלית
                </p>
              </div>
            </div>

            {/* Quick Speed toggle on mobile */}
            <button
              onClick={toggleSpeed}
              title="לחצי לשינוי מהירות הדיבור"
              className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-stone-900 font-black text-xs active:scale-95 transition-all cursor-pointer shrink-0"
            >
              {stats.speechSpeed < 1.0 ? (
                <>
                  <Snail className="w-4 h-4 text-amber-800" />
                  <span>0.75x</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>1.0x</span>
                </>
              )}
            </button>
          </div>

          {/* Stats & Desktop Quick Audio Controls */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end">
            {/* Audio Speed Toggle Button (Tablet/Desktop) */}
            <button
              onClick={toggleSpeed}
              title="לחצי לשינוי מהירות הדיבור"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border-2 border-amber-300 text-stone-900 font-bold text-sm shadow-xs hover:bg-amber-100 active:scale-95 transition-all cursor-pointer"
            >
              {stats.speechSpeed < 1.0 ? (
                <>
                  <Snail className="w-4 h-4 text-amber-700 animate-pulse" />
                  <span>קול איטי (0.75x)</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>קול רגיל (1.0x)</span>
                </>
              )}
            </button>

            {/* Stars Count Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-black text-xs sm:text-base shadow-xs">
              <span className="text-base sm:text-xl">🌟</span>
              <span>{stats.stars} כוכבים</span>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-orange-100 border-2 border-orange-300 text-orange-950 font-black text-xs sm:text-base shadow-xs">
              <span className="text-base sm:text-xl">🔥</span>
              <span>{stats.streakDays} ימי תרגול</span>
            </div>
          </div>
        </div>

        {/* Big Touch Navigation Tabs */}
        <nav className="flex items-center justify-start gap-2 sm:gap-3 pt-2.5 overflow-x-auto pb-1 no-scrollbar touch-pan-x">
          <button
            onClick={() => setActiveTab('tutor')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer whitespace-nowrap min-h-[48px] sm:min-h-[52px] ${
              activeTab === 'tutor'
                ? 'bg-orange-500 text-white shadow-md border-b-4 border-orange-700'
                : 'bg-amber-100/80 text-stone-900 hover:bg-amber-200 border-2 border-amber-300'
            }`}
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span>שיחה קולית עם סוזי</span>
          </button>

          <button
            onClick={() => setActiveTab('scenarios')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer whitespace-nowrap min-h-[48px] sm:min-h-[52px] ${
              activeTab === 'scenarios'
                ? 'bg-orange-500 text-white shadow-md border-b-4 border-orange-700'
                : 'bg-amber-100/80 text-stone-900 hover:bg-amber-200 border-2 border-amber-300'
            }`}
          >
            <Volume2 className="w-5 h-5 shrink-0" />
            <span>תרחישי שיחה לחיים</span>
          </button>

          <button
            onClick={() => setActiveTab('games')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer whitespace-nowrap min-h-[48px] sm:min-h-[52px] ${
              activeTab === 'games'
                ? 'bg-orange-500 text-white shadow-md border-b-4 border-orange-700'
                : 'bg-amber-100/80 text-stone-900 hover:bg-amber-200 border-2 border-amber-300'
            }`}
          >
            <Sparkles className="w-5 h-5 shrink-0" />
            <span>משחקי שמיעה וחידונים</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer whitespace-nowrap min-h-[48px] sm:min-h-[52px] ${
              activeTab === 'favorites'
                ? 'bg-orange-500 text-white shadow-md border-b-4 border-orange-700'
                : 'bg-amber-100/80 text-stone-900 hover:bg-amber-200 border-2 border-amber-300'
            }`}
          >
            <Heart className="w-5 h-5 fill-rose-400 text-rose-500 shrink-0" />
            <span>המועדפים ({stats.favoriteIds.length})</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
