import { GoogleGenAI, Type } from "@google/genai";
import { Reading, TarotCard } from "@/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateTarotReading(
  question: string,
  spreadName: string,
  drawnCards: { card: TarotCard; isReversed: boolean; position: string; positionMeaning: string }[]
) {
  const model = "gemini-3-flash-preview";

  const cardsDescription = drawnCards.map((c, i) => 
    `${i+1}. ${c.card.name} (${c.isReversed ? 'Reversed' : 'Upright'}) in the "${c.position}" position (${c.positionMeaning}).`
  ).join('\n');

  const systemInstruction = `
    You are "Arcana", a sovereign wealth architect and master tarot reader. 
    Your tone is elegant, insightful, emotionally intelligent, and deeply symbolic.
    You provide guidance, not deterministic predictions.
    
    The user is asking: "${question || 'A general check-in on my path'}"
    The spread type is: "${spreadName}"
    
    Here are the cards drawn:
    ${cardsDescription}
    
    Provide a deeply personalized reading in JSON format.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: "Please provide my tarot reading based on the drawn cards.",
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { 
            type: Type.STRING, 
            description: "A high-level 2-3 sentence overview of the reading's energy." 
          },
          aiGuidance: { 
            type: Type.STRING, 
            description: "Detailed, insightful guidance synthesizing all cards. Include sections: 'The Lesson', 'Current Energy', 'What to Watch For', and a 'Suggested Action'." 
          },
          individualInterpretations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                cardName: { type: Type.STRING },
                meaningInPosition: { type: Type.STRING, description: "How this card specifically relates to its position and the question." }
              }
            }
          }
        },
        required: ["summary", "aiGuidance", "individualInterpretations"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}
