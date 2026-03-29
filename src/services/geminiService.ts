import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export type AnalysisType = 'pros-cons' | 'comparison' | 'swot';

export async function analyzeDecision(decision: string, type: AnalysisType) {
  const model = "gemini-3-flash-preview";
  
  let prompt = "";
  let systemInstruction = "You are a professional decision-making consultant. Your goal is to provide objective, clear, and actionable analysis to help users make better choices.";

  switch (type) {
    case 'pros-cons':
      prompt = `Analyze the following decision by providing a detailed list of Pros and Cons: "${decision}". Use a clear structure with bullet points.`;
      break;
    case 'comparison':
      prompt = `Analyze the following decision by creating a comparison table or structured comparison of options: "${decision}". If there are multiple options, compare them across key criteria. Use Markdown tables where appropriate.`;
      break;
    case 'swot':
      prompt = `Perform a SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) for the following decision: "${decision}". Use a structured format with headings for each section.`;
      break;
  }

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction,
    },
  });

  return response.text;
}
