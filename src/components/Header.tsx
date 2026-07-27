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
    <header className="bg-white border-b-4 border-amber-200 sticky top-0 z-30 shadow-sm backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6">
        {/* Top Branding & Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b-2 border-amber-100">
          <div className="flex items-center gap-4 text-right">
            <div className="w-14 h-14 bg-orange-400 rounded-full flex items-center justify-center text-white text-3xl shadow-md border-2 border-orange-500 font-bold shrink-0">
              ע
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-orange-900 tracking-tight font-serif">
                עלית לומדת אנגלית
              </h1>
              <p className="text-sm sm:text-base text-amber-800 font-bold">
                שיחה, אוצר מילים והיגוי בקול בלבד 💛
              </p>
            </div>
          </div>

          {/* Stats & Quick Audio Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            {/* Audio Speed Toggle Button */}
            <button
              onClick={toggleSpeed}
              title="לחצי לשינוי מהירות הדיבור"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border-2 border-amber-300 text-stone-900 font-bold text-sm shadow-xs hover:bg-amber-100 active:scale-95 transition-all cursor-pointer"
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
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-800 font-black text-sm sm:text-base shadow-xs">
              <span className="text-xl">🌟</span>
              <span>{stats.stars} כוכבים</span>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border-2 border-orange-300 text-orange-900 font-black text-sm sm:text-base shadow-xs">
              <span className="text-xl">🔥</span>
              <span>{stats.streakDays} ימי תרגול</span>
            </div>
          </div>
        </div>

        {/* Big Touch Navigation Tabs */}
        <nav className="flex items-center justify-around sm:justify-start gap-3 pt-3 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('tutor')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-base transition-all cursor-pointer whitespace-nowrap min-h-[52px] ${
              activeTab === 'tutor'
                ? 'bg-orange-500 text-white shadow-lg border-b-4 border-orange-700 scale-102'
                : 'bg-amber-50 text-stone-800 hover:bg-amber-100 border-2 border-amber-200'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>שיחה קולית עם סוזי</span>
          </button>

          <button
            onClick={() => setActiveTab('scenarios')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-base transition-all cursor-pointer whitespace-nowrap min-h-[52px] ${
              activeTab === 'scenarios'
                ? 'bg-orange-500 text-white shadow-lg border-b-4 border-orange-700 scale-102'
                : 'bg-amber-50 text-stone-800 hover:bg-amber-100 border-2 border-amber-200'
            }`}
          >
            <Volume2 className="w-5 h-5" />
            <span>תרחישי שיחה לחיים</span>
          </button>

          <button
            onClick={() => setActiveTab('games')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-base transition-all cursor-pointer whitespace-nowrap min-h-[52px] ${
              activeTab === 'games'
                ? 'bg-orange-500 text-white shadow-lg border-b-4 border-orange-700 scale-102'
                : 'bg-amber-50 text-stone-800 hover:bg-amber-100 border-2 border-amber-200'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span>משחקי שמיעה וחידונים</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-base transition-all cursor-pointer whitespace-nowrap min-h-[52px] ${
              activeTab === 'favorites'
                ? 'bg-orange-500 text-white shadow-lg border-b-4 border-orange-700 scale-102'
                : 'bg-amber-50 text-stone-800 hover:bg-amber-100 border-2 border-amber-200'
            }`}
          >
            <Heart className="w-5 h-5 fill-rose-400 text-rose-500" />
            <span>המועדפים של עלית ({stats.favoriteIds.length})</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
