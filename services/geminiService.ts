
import { GoogleGenAI, Type } from "@google/genai";
import { AssessmentResult, AIReport, Category } from "../types";

export const generateAIReport = async (result: AssessmentResult): Promise<AIReport> => {
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
    // 动态获取 API KEY 并在 try 块内初始化，防止 process.env 未定义导致崩溃
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY is not configured in environment variables.");
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
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

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Report Generation Error:", error);
    // 返回兜底数据，确保用户至少能看到结果
    return {
      summary: "您的孩子在多个维度表现出极佳的艺术潜质。在当前的AI时代，这种原生创造力是孩子最核心的竞争力。",
      strengths: ["想象力表达独特", "对色彩感知敏锐", "具备优秀的逻辑联想能力"],
      growthPotential: "孩子目前处于创意迸发期，通过AI辅助，可以将大脑中复杂的想象力瞬间具象化，突破手部动作发育的物理限制。",
      aiEmpowerment: "传统美术学习中，复杂的技法往往会消磨孩子的耐心。米多多 AI 课程旨在让孩子直接通过‘思维创作’，用 AI 工具释放被技法限制的灵感。"
    };
  }
};
