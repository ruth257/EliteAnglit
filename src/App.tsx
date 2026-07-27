import React, { useState, useEffect } from 'react';
import { ActiveTab, UserStats, PhraseItem } from './types';
import { Header } from './components/Header';
import { VoiceCompanion } from './components/VoiceCompanion';
import { ScenariosView } from './components/ScenariosView';
import { GamesView } from './components/GamesView';
import { FavoritesView } from './components/FavoritesView';
import { PronunciationModal } from './components/PronunciationModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('tutor');

  const [stats, setStats] = useState<UserStats>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elit_english_stats');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // fallback
        }
      }
    }
    return {
      stars: 12,
      streakDays: 3,
      completedPractices: 5,
      favoriteIds: ['cafe-1', 'grand-1', 'greet-1'],
      speechSpeed: 0.75, // Default slower audio for 80yo Elit
    };
  });

  const [activePronunciationPhrase, setActivePronunciationPhrase] = useState<PhraseItem | null>(null);

  useEffect(() => {
    localStorage.setItem('elit_english_stats', JSON.stringify(stats));
  }, [stats]);

  const addStars = (count: number) => {
    setStats((prev) => ({
      ...prev,
      stars: prev.stars + count,
      completedPractices: prev.completedPractices + 1,
    }));
  };

  const toggleSpeed = () => {
    setStats((prev) => ({
      ...prev,
      speechSpeed: prev.speechSpeed < 1.0 ? 1.0 : 0.75,
    }));
  };

  const toggleFavorite = (id: string) => {
    setStats((prev) => {
      const exists = prev.favoriteIds.includes(id);
      const newFavs = exists
        ? prev.favoriteIds.filter((favId) => favId !== id)
        : [...prev.favoriteIds, id];
      return { ...prev, favoriteIds: newFavs };
    });
  };

  return (
    <div className="min-h-screen bg-amber-50 text-stone-900 font-sans dir-rtl selection:bg-amber-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
        toggleSpeed={toggleSpeed}
      />

      {/* Main Content View Container */}
      <main className="max-w-5xl mx-auto px-4 py-6 sm:px-6">
        {activeTab === 'tutor' && (
          <VoiceCompanion stats={stats} addStars={addStars} />
        )}

        {activeTab === 'scenarios' && (
          <ScenariosView
            stats={stats}
            toggleFavorite={toggleFavorite}
            openPronunciationModal={(phrase) => setActivePronunciationPhrase(phrase)}
          />
        )}

        {activeTab === 'games' && (
          <GamesView stats={stats} addStars={addStars} />
        )}

        {activeTab === 'favorites' && (
          <FavoritesView
            stats={stats}
            toggleFavorite={toggleFavorite}
            openPronunciationModal={(phrase) => setActivePronunciationPhrase(phrase)}
            goToScenarios={() => setActiveTab('scenarios')}
          />
        )}
      </main>

      {/* Pronunciation Recording Practice Modal */}
      {activePronunciationPhrase && (
        <PronunciationModal
          phrase={activePronunciationPhrase}
          onClose={() => setActivePronunciationPhrase(null)}
          addStars={addStars}
        />
      )}

      {/* Senior-Friendly Footer */}
      <footer className="border-t-4 border-amber-200 bg-amber-100 py-8 text-center text-stone-800 text-base mt-12">
        <p className="font-serif font-black text-amber-950 text-lg mb-1">
          עלית לומדת אנגלית 💛 באהבה גדולה למשפחה
        </p>
        <p className="text-sm font-bold text-amber-900">
          ללא קריאה וללא כתיבה - לימוד קולי בלבד בכיף, בסבלנות ובחיוך
        </p>
      </footer>
    </div>
  );
}
