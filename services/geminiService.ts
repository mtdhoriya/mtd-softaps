import { GoogleGenAI, Type } from "@google/genai";

// Fix: Initialize GoogleGenAI with apiKey from process.env directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartServiceRecommendation = async (userQuery: string): Promise<{ category: string; reasoning: string } | null> => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found for Gemini Service");
    return null;
  }

  try {
    // Fix: Use ai.models.generateContent with systemInstruction in config
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User says: "${userQuery}". Map this to the most relevant category from the allowed list.`,
      config: {
        systemInstruction: "You are a helpful assistant for a Local Service Provider App. Your job is to analyze a user's problem and map it to one of the following categories: 'Electrician', 'Plumber', 'Carpenter', 'Cleaning', 'AC Repair', 'Painter', 'Salon', 'Mechanic'. Return JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, description: "The exact name of the matched category" },
            reasoning: { type: Type.STRING, description: "A short, friendly sentence explaining why this category was chosen." }
          },
          required: ["category", "reasoning"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export const generateProviderDescription = async (details: { name: string, job: string, experience: string }): Promise<string> => {
   if (!process.env.API_KEY) return "Professional service provider available for hire.";

   try {
     // Fix: Use ai.models.generateContent directly
     const response = await ai.models.generateContent({
       model: "gemini-2.5-flash",
       contents: `Write a professional, catchy, short description (max 150 chars) for a service provider profile. Name: ${details.name}, Job: ${details.job}, Experience: ${details.experience}.`
     });
     
     return response.text || "Experienced professional ready to help.";
   } catch (e) {
     return "Experienced professional ready to help.";
   }
}