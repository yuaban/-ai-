
export enum Category {
  THINKING = '思维能力',
  ATTENTION = '注意力',
  CREATIVITY = '创造力',
  ARTISTIC = '艺术能力',
  MEMORY = '记忆力'
}

export interface Question {
  id: number;
  text: string;
  category: Category;
  options: {
    label: string;
    score: number;
  }[];
}

export interface AssessmentResult {
  scores: Record<Category, number>;
  totalScore: number;
  answers: Record<number, number>;
}

export interface AIReport {
  summary: string;
  strengths: string[];
  growthPotential: string;
  aiEmpowerment: string;
}
