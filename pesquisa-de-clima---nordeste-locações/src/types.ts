export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Question {
  id: string;
  text: string;
  type: 'rating' | 'open';
  category: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface SurveyResponse {
  answers: Record<string, Rating | string>;
  timestamp: string;
}
