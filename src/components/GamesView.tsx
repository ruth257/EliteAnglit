import React, { useState } from 'react';
import { FUN_QUIZ_QUESTIONS } from '../data/phrasesData';
import { UserStats } from '../types';
import { speakText } from '../utils/speech';
import { Volume2, Sparkles, CheckCircle2, XCircle, Trophy, RefreshCw, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GamesViewProps {
  stats: UserStats;
  addStars: (count: number) => void;
}

export const GamesView: React.FC<GamesViewProps> = ({ stats, addStars }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentQ = FUN_QUIZ_QUESTIONS[currentQuestionIndex];

  const handlePlayQuestionAudio = () => {
    setIsPlayingAudio(true);
    speakText(currentQ.englishAudio, 'en-US', stats.speechSpeed, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      setIsCorrect(true);
      addStars(3);
      try {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      } catch (e) {
        // ignore
      }
      speakText('Excellent Elit! Very good!', 'en-US', 0.9);
    } else {
      setIsCorrect(false);
      speakText('Let us try again Elit!', 'en-US', 0.9);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    const nextIdx = (currentQuestionIndex + 1) % FUN_QUIZ_QUESTIONS.length;
    setCurrentQuestionIndex(nextIdx);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto py-2">
      {/* Title Header */}
      <div className="bg-orange-500 text-white border-b-8 border-orange-700 rounded-[32px] p-6 text-right shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-amber-200" />
            <h2 className="text-2xl sm:text-3xl font-black font-serif">
              משחק שמיעה: מה סוזי אמרה?
            </h2>
          </div>
          <p className="text-orange-100 font-bold text-base mt-1">
            הקשיבי לקול, ולחצי על התשובה הנכונה בעברית לקבלת כוכבים! ⭐
          </p>
        </div>

        <div className="bg-orange-700 text-white border-2 border-orange-400 px-5 py-2.5 rounded-full font-black text-base shadow-sm shrink-0">
          שאלה {currentQuestionIndex + 1} מתוך {FUN_QUIZ_QUESTIONS.length}
        </div>
      </div>

      {/* Main Game Box */}
      <div className="bg-white border-8 border-amber-300 rounded-[40px] p-6 sm:p-10 shadow-2xl flex flex-col items-center gap-6 text-center">
        {/* Big Audio Play Button */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-6xl p-5 bg-amber-100 rounded-[32px] border-4 border-amber-300 shadow-md">
            {currentQ.icon}
          </span>

          <button
            onClick={handlePlayQuestionAudio}
            className={`flex items-center gap-4 px-8 py-6 rounded-[32px] text-2xl sm:text-3xl font-black text-white shadow-2xl transition-all active:scale-95 cursor-pointer border-b-8 ${
              isPlayingAudio
                ? 'bg-blue-600 border-blue-900 ring-8 ring-blue-200 animate-pulse'
                : 'bg-blue-500 hover:bg-blue-600 border-blue-800'
            }`}
          >
            <Volume2 className="w-9 h-9" />
            <span>לחצי כאן להשמעת הקול 🔊</span>
          </button>
        </div>

        {/* Phonetic Transliteration Guide */}
        <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-4 w-full">
          <span className="text-xs text-blue-800 font-black block mb-1">
            רמז לקול באותיות עבריות (תעתיק):
          </span>
          <span className="text-2xl sm:text-3xl font-black text-blue-950 font-serif">
            {currentQ.hebrewTransliteration}
          </span>
        </div>

        {/* Option Choice Buttons */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {currentQ.optionsHebrew.map((opt, idx) => {
            let buttonStyle = 'bg-amber-50 border-amber-200 hover:border-orange-400 hover:bg-orange-50 text-stone-900';

            if (isAnswered) {
              if (idx === currentQ.correctIndex) {
                buttonStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-4 ring-emerald-300';
              } else if (idx === selectedOption) {
                buttonStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-black';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`p-5 rounded-2xl border-4 text-xl sm:text-2xl font-serif text-right shadow-sm transition-all active:scale-95 cursor-pointer min-h-[85px] flex items-center justify-between font-bold ${buttonStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && idx === currentQ.correctIndex && (
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                )}
                {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                  <XCircle className="w-8 h-8 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Message */}
        {isAnswered && (
          <div className="w-full flex flex-col items-center gap-4 pt-4 border-t-2 border-stone-100">
            {isCorrect ? (
              <div className="flex items-center gap-3 text-emerald-900 bg-emerald-100 border-4 border-emerald-400 rounded-2xl p-5 font-black text-xl sm:text-2xl w-full justify-center shadow-md">
                <Trophy className="w-8 h-8 text-amber-500" />
                <span>נכון מאוד עלית! זכית ב-3 כוכבים! ⭐⭐⭐</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-900 bg-rose-100 border-4 border-rose-300 rounded-2xl p-5 font-black text-xl w-full justify-center shadow-md">
                <span>לא נורא עלית! התשובה הנכונה היא: "{currentQ.hebrewMeaning}"</span>
              </div>
            )}

            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-2xl border-b-8 border-emerald-800 shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-7 h-7" />
              <span>השאלה הבאה ➔</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
