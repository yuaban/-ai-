
import { GoogleGenAI, Type } from "@google/genai";
import { AssessmentResult, AIReport, Category } from "../types";

export const generateAIReport = async (result: AssessmentResult): Promise<AIReport> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const scoreSummary = Object.entries(result.scores)
    .map(([cat, score]) => `${cat}: ${score}/30`)
    .join(', ');

  const prompt = `
    作为一名资深的少儿美育专家和AI教育专家，请根据以下测评数据为家长撰写一份极具说服力的“AI美育潜力分析报告”。
    
    测评得分：${scoreSummary}
    总分：${result.totalScore}/150
    
    要求：
    1. 分析报告要体现专业性，引用教育心理学观点。
    2. 核心观点：孩子拥有巨大的创造潜力，但受限于传统的画笔/工具控制能力（手脑协调发展阶段），AI（AIGC）是释放其脑中无限创意的“超级加速器”。
    3. 风格：亲切、肯定、前瞻性。
    4. 目标：让家长意识到如果不学习AI美育，孩子丰富的想象力可能会在传统的枯燥技法训练中被消磨，而AI能让孩子直接进行“思维创作”。
    
    请严格按照JSON格式输出，包含以下字段：
    - summary (200字左右的综合评价)
    - strengths (3个核心优势点列表)
    - growthPotential (孩子未来发展的可能性描述)
    - aiEmpowerment (为什么只有AIGC能解决孩子目前痛点的具体分析)
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            strengths: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            growthPotential: { type: Type.STRING },
            aiEmpowerment: { type: Type.STRING }
          },
          required: ["summary", "strengths", "growthPotential", "aiEmpowerment"]
        }
      }
    });

    const jsonText = response.text || "{}";
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Failed to generate AI report:", error);
    return {
      summary: "测评数据已记录，您的孩子在多个维度表现出极佳的潜质。在当前的AI时代，这种原生创造力是极其宝贵的资产。",
      strengths: ["想象力丰富", "观察力敏锐", "逻辑感强"],
      growthPotential: "通过AI辅助，孩子可以将复杂的想象力瞬间具象化。",
      aiEmpowerment: "传统技法门槛往往限制了孩子的表达。AI美育课程旨在移除这些障碍，让孩子的灵感直接转化为作品。"
    };
  }
};
