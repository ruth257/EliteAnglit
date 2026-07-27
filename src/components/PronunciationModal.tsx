import React, { useState, useRef, useEffect } from 'react';
import { PhraseItem } from '../types';
import { VoiceRecognizer, speakText } from '../utils/speech';
import { Mic, Volume2, X, Sparkles, Trophy, CheckCircle2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PronunciationModalProps {
  phrase: PhraseItem | null;
  onClose: () => void;
  addStars: (count: number) => void;
}

export const PronunciationModal: React.FC<PronunciationModalProps> = ({
  phrase,
  onClose,
  addStars,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<{
    matchPercentage: number;
    encouragementHebrew: string;
    stars: number;
  } | null>(null);

  const recognizerRef = useRef<VoiceRecognizer | null>(null);

  useEffect(() => {
    recognizerRef.current = new VoiceRecognizer('en-US');
  }, []);

  if (!phrase) return null;

  const handlePlayReference = () => {
    speakText(phrase.english, 'en-US', 0.8);
  };

  const handleStartRecording = () => {
    if (!recognizerRef.current?.isSupported()) {
      alert('זיהוי דיבור אינו זמין בדפדפן זה. השמיעי את הקול ותרגלי בקול רם!');
      return;
    }

    setSpokenTranscript(null);
    setEvaluation(null);
    setIsRecording(true);

    recognizerRef.current.startListening({
      onResult: async (transcript) => {
        setIsRecording(false);
        setSpokenTranscript(transcript);

        // Evaluate pronunciation via backend or generous local logic
        try {
          const res = await fetch('/api/evaluate-speech', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              targetPhrase: phrase.english,
              spokenText: transcript
            })
          });
          const data = await res.json();
          setEvaluation({
            matchPercentage: data.matchPercentage || 90,
            encouragementHebrew: data.encouragementHebrew || 'היגוי מקסים עלית! שומעים את המאמץ! 🌟',
            stars: data.stars || 3
          });
          addStars(data.stars || 3);
          try {
            confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
          } catch (e) {
            // ignore
          }
          speakText('Wonderful job Elit!', 'en-US', 0.9);
        } catch (e) {
          setEvaluation({
            matchPercentage: 90,
            encouragementHebrew: 'כל הכבוד עלית! היגוי יפהפה וברור! 🌟',
            stars: 3
          });
          addStars(3);
        }
      },
      onError: (err) => {
        setIsRecording(false);
        setEvaluation({
          matchPercentage: 85,
          encouragementHebrew: 'נפלא עלית! העיקר העזת לדבר! ⭐⭐⭐',
          stars: 3
        });
        addStars(3);
      },
      onEnd: () => {
        setIsRecording(false);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-8 border-amber-300 rounded-[40px] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative flex flex-col gap-6 text-center animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all cursor-pointer font-bold border-2 border-stone-200"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center justify-center gap-2 text-orange-950">
          <Sparkles className="w-7 h-7 text-orange-500" />
          <h3 className="text-2xl sm:text-3xl font-black font-serif">אימון היגוי אישי לעלית</h3>
        </div>

        {/* Target Phrase Box */}
        <div className="bg-blue-50 border-4 border-blue-200 rounded-[32px] p-6 flex flex-col gap-3 shadow-sm">
          <span className="text-3xl sm:text-4xl font-black text-stone-900 font-sans dir-ltr tracking-tight">
            "{phrase.english}"
          </span>
          <div className="text-2xl font-black text-blue-950 font-serif">
            תעתיק עברי: {phrase.hebrewTransliteration}
          </div>
          <p className="text-base font-bold text-stone-700">({phrase.hebrew})</p>

          <button
            onClick={handlePlayReference}
            className="mt-2 self-center flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-black text-base border-b-4 border-blue-800 shadow-md cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span>הקשיבי קודם להגייה הנכונה 🔊</span>
          </button>
        </div>

        {/* Big Recording Button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleStartRecording}
            disabled={isRecording}
            className={`w-full flex items-center justify-center gap-4 py-6 px-10 rounded-[32px] text-2xl font-black text-white shadow-2xl transition-all cursor-pointer border-b-8 ${
              isRecording
                ? 'bg-rose-600 border-rose-800 ring-8 ring-rose-200 animate-pulse scale-102'
                : 'bg-emerald-500 hover:bg-emerald-600 border-emerald-800 hover:scale-102 active:scale-95'
            }`}
          >
            <Mic className={`w-9 h-9 ${isRecording ? 'animate-bounce' : ''}`} />
            <span>{isRecording ? 'מקשיבה לך... דברי!' : 'לחצי ודברי עכשיו 🎙️'}</span>
          </button>
        </div>

        {/* Result & Star Feedback */}
        {evaluation && (
          <div className="bg-emerald-100 border-4 border-emerald-400 rounded-[28px] p-6 flex flex-col items-center gap-3 text-emerald-950 animate-in fade-in shadow-md">
            <div className="flex items-center gap-2 text-3xl">
              {'⭐'.repeat(evaluation.stars)}
            </div>
            <p className="font-black text-2xl font-serif text-center">
              {evaluation.encouragementHebrew}
            </p>
            {spokenTranscript && (
              <p className="text-base text-emerald-900 font-bold dir-ltr">
                שמענו אותך אומרת: "{spokenTranscript}"
              </p>
            )}
          </div>
        )}

        {/* Finish Button */}
        <button
          onClick={onClose}
          className="mt-2 w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xl border-b-8 border-orange-800 shadow-xl cursor-pointer"
        >
          חזרה לתרחישים
        </button>
      </div>
    </div>
  );
};
