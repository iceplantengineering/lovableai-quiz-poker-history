
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
  {
    question: "関ヶ原の戦いが行われたのは何年？",
    options: ["1600年", "1590年", "1615年"],
    correctAnswer: 0,
  },
  {
    question: "江戸幕府の初代将軍は？",
    options: ["徳川家光", "徳川秀忠", "徳川家康"],
    correctAnswer: 2,
  },
  {
    question: "大化の改新が行われたのは何年？",
    options: ["645年", "701年", "710年"],
    correctAnswer: 0,
  },
  {
    question: "平安京に遷都したのは誰の時代？",
    options: ["桓武天皇", "聖武天皇", "天智天皇"],
    correctAnswer: 0,
  },
  {
    question: "源平合戦の最後の戦いは？",
    options: ["壇ノ浦の戦い", "一ノ谷の戦い", "屋島の戦い"],
    correctAnswer: 0,
  },
  {
    question: "織田信長が本能寺で倒れたのは何年？",
    options: ["1582年", "1573年", "1590年"],
    correctAnswer: 0,
  },
  {
    question: "徳川幕府が大坂夏の陣で豊臣氏を滅ぼしたのは？",
    options: ["1615年", "1600年", "1614年"],
    correctAnswer: 0,
  },
  {
    question: "江戸幕府の最後の将軍は？",
    options: ["徳川慶喜", "徳川家茂", "徳川家定"],
    correctAnswer: 0,
  },
  {
    question: "明治維新が起こったのは？",
    options: ["1868年", "1858年", "1871年"],
    correctAnswer: 0,
  },
  {
    question: "平清盛が太政大臣になったのは？",
    options: ["1167年", "1185年", "1156年"],
    correctAnswer: 0,
  },
  {
    question: "鎌倉幕府が滅亡したのは？",
    options: ["1333年", "1336年", "1392年"],
    correctAnswer: 0,
  },
  {
    question: "応仁の乱が始まったのは？",
    options: ["1467年", "1477年", "1488年"],
    correctAnswer: 0,
  },
  {
    question: "豊臣秀吉が関白になったのは？",
    options: ["1585年", "1582年", "1590年"],
    correctAnswer: 0,
  },
  {
    question: "島原の乱が起きたのは？",
    options: ["1637年", "1627年", "1647年"],
    correctAnswer: 0,
  },
  {
    question: "ペリーが来航したのは？",
    options: ["1853年", "1858年", "1868年"],
    correctAnswer: 0,
  },
  {
    question: "大政奉還が行われたのは？",
    options: ["1867年", "1868年", "1858年"],
    correctAnswer: 0,
  },
  {
    question: "廃藩置県が行われたのは？",
    options: ["1871年", "1868年", "1889年"],
    correctAnswer: 0,
  }
];

// クイズをランダムに並び替える関数
export const shuffleQuestions = (questions: QuizQuestion[]): QuizQuestion[] => {
  return [...questions].sort(() => Math.random() - 0.5);
};
