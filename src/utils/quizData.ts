export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "日本で最初の永続的な首都はどこでしたか？",
    options: ["平城京", "難波宮", "藤原京"],
    correctAnswer: 0,
  },
  {
    question: "鎌倉幕府を開いた武将は誰ですか？",
    options: ["源義経", "源頼朝", "平清盛"],
    correctAnswer: 1,
  },
  {
    question: "室町時代に将軍の権力が最も強かったのは誰の時代？",
    options: ["足利義満", "足利義政", "足利義持"],
    correctAnswer: 0,
  },
  // 追加のクイズを記述...
];