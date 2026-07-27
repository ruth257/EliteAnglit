// Speech Synthesis (Text to Speech) and Speech Recognition helpers

// Pre-load voices for Android Chrome
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

export function speakText(
  text: string,
  lang: 'en-US' | 'he-IL' = 'en-US',
  rate: number = 0.85,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    if (onEnd) onEnd();
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = Math.max(0.6, Math.min(rate, 1.2)); // safe range for senior listening
  utterance.pitch = 1.0;

  // Try to find a warm, natural voice if available (Android / iOS / Chrome)
  const getAndSetVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const targetVoice =
        voices.find(
          (v) =>
            v.lang.startsWith(lang.split('-')[0]) &&
            (v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('Samantha') ||
              v.name.includes('Karen') ||
              v.name.includes('Siri'))
        ) || voices.find((v) => v.lang.startsWith(lang.split('-')[0]));

      if (targetVoice) {
        utterance.voice = targetVoice;
      }
    }
  };

  getAndSetVoice();

  if (onEnd) {
    utterance.onend = () => onEnd();
    utterance.onerror = () => onEnd();
  }

  // Small timeout to prevent Android Chrome audio cancel race condition
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 30);

  return true;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Browser Speech Recognition Wrapper (Supports Android WebKit Speech Recognition)
export interface SpeechRecognitionResultHandler {
  onResult: (transcript: string) => void;
  onError: (errorMsg: string) => void;
  onEnd: () => void;
}

export class VoiceRecognizer {
  private recognition: any = null;

  constructor(lang: 'en-US' | 'he-IL' = 'en-US') {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition ||
        (window as any).mozSpeechRecognition ||
        (window as any).msSpeechRecognition;

      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = lang;
      }
    }
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }

  public startListening(handlers: SpeechRecognitionResultHandler) {
    if (!this.recognition) {
      handlers.onError('זיהוי דיבור אינו נתמך בדפדפן זה. ניתן להשתמש בלחצנים.');
      handlers.onEnd();
      return;
    }

    try {
      this.recognition.onresult = (event: any) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          const transcript = event.results[0][0].transcript;
          handlers.onResult(transcript);
        }
      };

      this.recognition.onerror = (event: any) => {
        let msg = 'לא הצלחנו לשמוע בבירור, נסי שוב עלית!';
        if (event.error === 'no-speech') msg = 'לא נשמע דיבור, לחצי שוב על המיקרופון.';
        if (event.error === 'not-allowed') msg = 'נדרש אישור גישה למיקרופון בדפדפן הנייד.';
        handlers.onError(msg);
      };

      this.recognition.onend = () => {
        handlers.onEnd();
      };

      this.recognition.start();
    } catch (e) {
      handlers.onError('שגיאה בהפעלת הטיפול בקול.');
      handlers.onEnd();
    }
  }

  public stop() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
  }
}

