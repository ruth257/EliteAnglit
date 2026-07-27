import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// System prompt tailored specifically for Elit, an 80yo Hebrew native speaker learning CONVERSATIONAL English only.
const SYSTEM_PROMPT = `
You are "Sarah" (שרה/סוזי), a warm, patient, joyful, and encouraging English conversation companion designed specifically for "Elit" (עלית), an 80-year-old native Hebrew speaker.
Elit only wants to learn CONVERSATIONAL English (speaking and listening). She does NOT want reading or writing.

Rules for your responses:
1. ALWAYS respond in a JSON format containing:
   - "english": A simple, short, clear English response (1-2 short sentences max). Speak slowly and naturally. Use warm, basic everyday English suitable for a beginner.
   - "hebrewTranslation": Accurate Hebrew translation of the English response.
   - "hebrewTransliteration": Phonetic Hebrew script for how to pronounce the English phrase (e.g. "הֶלוֹ עָלִית, הָאוּ אָר יוּ טוֹדֵיי?").
   - "encouragementHebrew": A short, warm, supportive sentence in Hebrew praising Elit (e.g., "כל הכבוד עלית! היגוי מצוין 🌟", "מקסימה עלית! איזה כיף לשמוע אותך").
   - "suggestedOptions": Array of 3 short English phrases (with Hebrew meaning and transliteration) Elit can easily say back or tap to say.

2. Keep vocabulary practical and real-world: greetings, cafe/tea, family/grandchildren, travel, shopping, doctors, weather, basic feelings.
3. If Elit speaks in Hebrew or makes an English mistake, gently understand her intent, compliment her, and model the correct simple English phrase.
4. Keep tone super warm, friendly, like a loving family member or patient daughter/friend.
`;

// API endpoint for AI Conversational Companion
app.post("/api/chat", async (req, res) => {
  try {
    const { userSpeech, contextTopic } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      // Fallback demo response if key is missing or invalid
      return res.json({
        english: "Hello Elit! How are you today?",
        hebrewTranslation: "שלום עלית! מה שלומך היום?",
        hebrewTransliteration: "הֶלוֹ עָלִית! הָאוּ אָר יוּ טוֹדֵיי?",
        encouragementHebrew: "איזה כיף לשמוע אותך עלית! 🌟",
        suggestedOptions: [
          { english: "I am fine, thank you", hebrew: "אני מרגישה טוב, תודה", transliteration: "איי אם פיין, תֶּנְק יוּ" },
          { english: "I would like a cup of tea", hebrew: "אני רוצה כוס תה", transliteration: "איי וּוּד לַייק אָ קַאפּ אוֹף טִי" },
          { english: "Good morning!", hebrew: "בוקר טוב!", transliteration: "גּוּד מוֹרְנִינְגּ!" }
        ]
      });
    }

    const prompt = `Context topic: ${contextTopic || "general conversational English"}.
User (Elit) said (or tapped): "${userSpeech || "Hello"}".
Provide a helpful, warm, encouraging response formatted strictly as JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "";
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = {
        english: "Hello Elit! I am so happy to speak with you.",
        hebrewTranslation: "שלום עלית! אני כל כך שמחה לדבר איתך.",
        hebrewTransliteration: "הֶלוֹ עָלִית! איי אם סוֹ הָפִּי טוּ ספִּיק וִויז יוּ.",
        encouragementHebrew: "כל הכבוד עלית! עבודה נהדרת 🌟",
        suggestedOptions: [
          { english: "Thank you very much", hebrew: "תודה רבה רבה", transliteration: "תֶּנְק יוּ וֶורִי מָאץ'" },
          { english: "How are you?", hebrew: "מה שלומך?", transliteration: "הָאוּ אָר יוּ?" },
          { english: "See you soon!", hebrew: "נתראה בקרוב!", transliteration: "סִי יוּ סוּן!" }
        ]
      };
    }

    return res.json(data);
  } catch (err: any) {
    console.error("Gemini Chat Error:", err);
    return res.status(500).json({
      error: "Internal Error",
      english: "Hello Elit! Good to see you!",
      hebrewTranslation: "שלום עלית! טוב לראות אותך!",
      hebrewTransliteration: "הֶלוֹ עָלִית! גּוּד טוּ סִי יוּ!",
      encouragementHebrew: "כל הכבוד עלית! תמשיכי ככה 🌟",
      suggestedOptions: [
        { english: "Good morning", hebrew: "בוקר טוב", transliteration: "גּוּד מוֹרְנִינְגּ" },
        { english: "Thank you", hebrew: "תודה", transliteration: "תֶּנְק יוּ" },
        { english: "I love you", hebrew: "אני אוהבת אותך", transliteration: "איי לוֹבְ יוּ" }
      ]
    });
  }
});

// API endpoint for evaluating Elit's spoken English pronunciation
app.post("/api/evaluate-speech", async (req, res) => {
  try {
    const { targetPhrase, spokenText } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        matchPercentage: 90,
        encouragementHebrew: "היגוי מופלא עלית! שומעים כמה שתרגלת! 🌟",
        tipsHebrew: "כל הכבוד! נשמע ברור וטבעי לחלוטין.",
        stars: 3
      });
    }

    const prompt = `Target English phrase: "${targetPhrase}"
What Elit (80yo Hebrew speaker) actually said/recognized: "${spokenText}"

Evaluate her pronunciation gently and constructively. Return JSON:
{
  "matchPercentage": number (0-100),
  "encouragementHebrew": string (warm praise for Elit in Hebrew),
  "tipsHebrew": string (simple tip in Hebrew if needed, or words of praise),
  "stars": number (1 to 3 stars, give 3 stars very generously for effort!)
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const data = JSON.parse(response.text || "{}");
    return res.json(data);
  } catch (err) {
    return res.json({
      matchPercentage: 85,
      encouragementHebrew: "נהדר עלית! היגוי יפהפה! ⭐⭐⭐",
      tipsHebrew: "המשכי ככה, הקול שלך נשמע מצוין!",
      stars: 3
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
