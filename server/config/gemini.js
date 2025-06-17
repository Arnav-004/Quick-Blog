import { GoogleGenAI } from "@google/genai";

// add your own Gemini key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate( prompt ) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt     // prompt will be passed by user
  });
  return response.text;
}

export default generate;