import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, UserStats } from '../types';
import { speakText, VoiceRecognizer, stopSpeaking } from '../utils/speech';
import { Mic, Volume2, Sparkles, RefreshCw, VolumeX, Send, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VoiceCompanionProps {
  stats: UserStats;
  addStars: (count: number) => void;
}

export const VoiceCompanion: React.FC<VoiceCompanionProps> = ({ stats, addStars }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      english: 'Hello Elit! I am Sarah, your English friend. How are you today?',
      hebrewTranslation: 'שלום עלית! אני שרה, החברה שלך לאנגלית. מה שלומך היום?',
      hebrewTransliteration: 'הֶלוֹ עָלִית! איי אם סָרָה, יוּר אִינְגְלִישׁ פרֶנְד. הָאוּ אָר יוּ טוֹדֵיי?',
      encouragementHebrew: 'שלום עלית היקרה! איזה כיף להתחיל לדבר ביחד! 🌟',
      suggestedOptions: [
        { english: 'I am fine, thank you!', hebrew: 'אני מרגישה טוב, תודה!', transliteration: 'איי אם פיין, תֶּנְק יוּ!' },
        { english: 'Good morning, Sarah!', hebrew: 'בוקר טוב, שרה!', transliteration: 'גּוּד מוֹרְנִינְגּ, סָרָה!' },
        { english: 'I want a cup of tea, please.', hebrew: 'אני רוצה כוס תה, בבקשה.', transliteration: 'איי וּוּד לַייק אָ קַאפּ אוֹף טִי, פְּלִיז.' }
      ],
      timestamp: Date.now()
    }
  ]);

  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [userCustomText, setUserCustomText] = useState('');
  const recognizerRef = useRef<VoiceRecognizer | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    recognizerRef.current = new VoiceRecognizer('en-US');
  }, []);

  useEffect(() => {
    // Auto speak the initial greeting on mount
    if (messages.length === 1 && messages[0].sender === 'ai') {
      handlePlayAudio(messages[0].english, messages[0].id);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePlayAudio = (text: string, msgId: string) => {
    setCurrentlySpeakingId(msgId);
    speakText(text, 'en-US', stats.speechSpeed, () => {
      setCurrentlySpeakingId(null);
    });
  };

  const handleStopAudio = () => {
    stopSpeaking();
    setCurrentlySpeakingId(null);
  };

  const sendToAI = async (userInput: string) => {
    if (!userInput.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      english: userInput,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userSpeech: userInput,
          contextTopic: 'friendly conversation for 80yo Elit'
        })
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        english: data.english || 'Great job Elit!',
        hebrewTranslation: data.hebrewTranslation || 'כל הכבוד עלית!',
        hebrewTransliteration: data.hebrewTransliteration || 'גְרֵייט גְ\'וֹב עָלִית!',
        encouragementHebrew: data.encouragementHebrew || 'מקסימה עלית! 🌟',
        suggestedOptions: data.suggestedOptions || [
          { english: 'Thank you very much!', hebrew: 'תודה רבה רבה!', transliteration: 'תֶּנְק יוּ וֶורִי מָאץ\'!' },
          { english: 'Have a nice day!', hebrew: 'שיהיה לך יום נעים!', transliteration: 'הֶבְ אָ נַייְס דֵיי!' }
        ],
        timestamp: Date.now()
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);

      // Trigger reward
      addStars(2);
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      } catch (e) {
        // ignore
      }

      // Auto play Sarah's audio
      handlePlayAudio(aiMsg.english, aiMsg.id);
    } catch (err) {
      setIsLoading(false);
      console.error('Chat error:', err);
    }
  };

  const startVoiceInput = () => {
    if (!recognizerRef.current?.isSupported()) {
      alert('זיהוי הקול אינו זמין בדפדפן זה. ניתן ללחוץ על הכפתורים המוכנים למטה!');
      return;
    }

    handleStopAudio();
    setIsListening(true);

    recognizerRef.current.startListening({
      onResult: (transcript) => {
        setIsListening(false);
        sendToAI(transcript);
      },
      onError: (err) => {
        setIsListening(false);
        console.warn('Speech recognition error:', err);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-2">
      {/* Friendly Avatar Banner */}
      <div className="bg-pink-500 text-white rounded-[32px] p-6 border-b-8 border-pink-700 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-right">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center text-4xl shadow-md border-4 border-pink-200">
              👩🏼‍🏫
            </div>
            <div className="absolute -bottom-1 -left-1 bg-emerald-400 w-5 h-5 rounded-full border-2 border-white" title="סוזי מחוברת ומוכנה לדבר" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black font-serif">
                סוזי - החברה באנגלית
              </h2>
              <span className="bg-pink-700 text-white text-xs font-black px-3 py-1 rounded-full border border-pink-400">
                קולית
              </span>
            </div>
            <p className="text-pink-100 text-base font-bold mt-1">
              סוזי מדברת איתך באנגלית קלה ואיטית, עם הסבר עברי רך ומעודד!
            </p>
          </div>
        </div>

        {/* Quick Clear Conversation Button */}
        <button
          onClick={() => {
            setMessages([messages[0]]);
            handlePlayAudio(messages[0].english, messages[0].id);
          }}
          className="flex items-center gap-2 text-white bg-pink-600/80 hover:bg-pink-600 px-4 py-2.5 rounded-2xl text-sm font-bold border-2 border-pink-400 transition-all cursor-pointer shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          <span>שיחה חדשה</span>
        </button>
      </div>

      {/* Main Chat Stream Container */}
      <div className="space-y-5 min-h-[320px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-3 p-6 rounded-[32px] transition-all ${
              msg.sender === 'ai'
                ? 'bg-white border-4 border-blue-200 shadow-lg'
                : 'bg-orange-50 border-4 border-orange-300 shadow-md mr-8 sm:mr-16'
            }`}
          >
            {/* Message Header */}
            <div className="flex items-center justify-between border-b-2 border-stone-100 pb-3">
              <div className="flex items-center gap-2 font-bold">
                {msg.sender === 'ai' ? (
                  <>
                    <span className="text-2xl">👩🏼‍🏫</span>
                    <span className="text-blue-900 font-serif text-lg font-black">סוזי אמרה:</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">👵🏼</span>
                    <span className="text-orange-900 font-serif text-lg font-black">עלית אמרה:</span>
                  </>
                )}
              </div>

              {/* Audio Control for AI message */}
              {msg.sender === 'ai' && (
                <div className="flex items-center gap-2">
                  {currentlySpeakingId === msg.id ? (
                    <button
                      onClick={handleStopAudio}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500 text-white font-bold text-sm shadow-md hover:bg-rose-600 active:scale-95 cursor-pointer animate-bounce border-b-4 border-rose-700"
                    >
                      <VolumeX className="w-4 h-4" />
                      <span>עצרי קול</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePlayAudio(msg.english, msg.id)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500 text-white font-black text-base shadow-md hover:bg-blue-600 border-b-4 border-blue-700 active:scale-95 cursor-pointer"
                    >
                      <Volume2 className="w-5 h-5" />
                      <span>השמיעי שוב 🔊</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* English Text Display (Very Large & Clear) */}
            <div className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight font-sans dir-ltr text-right py-1">
              "{msg.english}"
            </div>

            {/* Hebrew Transliteration (Phonetic Guide in Hebrew) */}
            {msg.hebrewTransliteration && (
              <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-4 text-stone-900">
                <span className="text-xs text-blue-800 font-bold block mb-1">
                  תעתיק עברי (איך להגיד באותיות עבריות):
                </span>
                <span className="text-2xl sm:text-3xl font-black text-blue-950 font-serif">
                  {msg.hebrewTransliteration}
                </span>
              </div>
            )}

            {/* Hebrew Translation */}
            {msg.hebrewTranslation && (
              <div className="text-lg sm:text-xl text-stone-800 font-bold">
                <span className="font-extrabold text-blue-900">פירוש בעברית: </span>
                {msg.hebrewTranslation}
              </div>
            )}

            {/* Warm Encouragement Box */}
            {msg.encouragementHebrew && (
              <div className="mt-2 flex items-center gap-2 bg-emerald-100 text-emerald-900 border-2 border-emerald-300 rounded-2xl px-5 py-3 text-base font-black">
                <Sparkles className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>{msg.encouragementHebrew}</span>
              </div>
            )}

            {/* Suggested Quick Speech Options */}
            {msg.suggestedOptions && msg.suggestedOptions.length > 0 && (
              <div className="mt-3 pt-4 border-t-2 border-stone-100">
                <p className="text-base font-extrabold text-stone-900 mb-3">
                  עלית, לחצי על אחת התשובות שתרצי לענות לסוזי:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {msg.suggestedOptions.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendToAI(option.english)}
                      disabled={isLoading}
                      className="flex flex-col items-start text-right bg-orange-100 hover:bg-orange-200 border-4 border-orange-300 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer min-h-[80px] justify-center group"
                    >
                      <span className="text-lg font-black text-orange-950 dir-ltr group-hover:text-orange-900">
                        {option.english}
                      </span>
                      <span className="text-xs text-stone-700 font-bold mt-0.5">
                        {option.transliteration} ({option.hebrew})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center justify-center p-6 bg-orange-50 rounded-[32px] border-4 border-orange-200 animate-pulse text-orange-900 font-black text-xl gap-3">
            <RefreshCw className="w-7 h-7 animate-spin text-orange-600" />
            <span>סוזי חושבת ומכינה לך תשובה נהדרת...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Main Microphone Interaction Dock (Extra Big for Seniors!) */}
      <div className="sticky bottom-4 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-[40px] border-8 border-amber-300 shadow-2xl flex flex-col items-center gap-5">
        <div className="text-center">
          <p className="text-stone-900 font-black text-xl sm:text-2xl font-serif">
            לחצי על המיקרופון ודברי באנגלית אל סוזי:
          </p>
          <p className="text-amber-800 font-bold text-base mt-1">
            לא נורא אם יש טעויות - הכל בכיף ובאהבה!
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 w-full">
          {/* Big Microphone Button */}
          <button
            onClick={startVoiceInput}
            disabled={isLoading || isListening}
            className={`w-full max-w-md flex items-center justify-center gap-4 py-7 px-10 rounded-[36px] text-2xl sm:text-3xl font-black text-white shadow-2xl transition-all cursor-pointer border-b-8 ${
              isListening
                ? 'bg-rose-600 border-rose-800 ring-8 ring-rose-200 animate-pulse scale-102'
                : 'bg-emerald-500 hover:bg-emerald-600 border-emerald-800 hover:scale-102 active:scale-95'
            }`}
          >
            <Mic className={`w-10 h-10 ${isListening ? 'animate-bounce' : ''}`} />
            <span>{isListening ? 'מקשיבה לך עלית...' : 'דברי אל סוזי 🎙️'}</span>
          </button>
        </div>

        {/* Alternative Custom Sentence Input */}
        <div className="w-full max-w-lg flex items-center gap-3 pt-3 border-t-2 border-amber-100">
          <input
            type="text"
            value={userCustomText}
            onChange={(e) => setUserCustomText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendToAI(userCustomText);
                setUserCustomText('');
              }
            }}
            placeholder="או הקלידי כאן משפט באנגלית או עברית..."
            className="flex-1 bg-amber-50 border-2 border-amber-300 rounded-2xl px-4 py-3 text-base font-bold text-stone-900 focus:outline-none focus:ring-4 focus:ring-amber-300"
          />
          <button
            onClick={() => {
              if (userCustomText) {
                sendToAI(userCustomText);
                setUserCustomText('');
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-black px-5 py-3 rounded-2xl border-b-4 border-blue-800 cursor-pointer flex items-center gap-2 shadow-md"
          >
            <Send className="w-5 h-5" />
            <span>שלחי</span>
          </button>
        </div>
      </div>
    </div>
  );
};
