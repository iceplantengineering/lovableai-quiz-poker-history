export interface Card {
  suit: string;
  value: string;
  isFlipped: boolean;
}

export const suits = ["♠", "♣", "♥", "♦"];
export const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value, isFlipped: false });
    }
  }
  return deck;
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

export const evaluateHand = (hand: Card[]): { name: string; score: number } => {
  // 役の判定ロジック
  const values = hand.map(card => card.value);
  const suits = hand.map(card => card.suit);
  
  // フラッシュの判定
  const isFlush = suits.every(suit => suit === suits[0]);
  
  // ペアの判定
  const valueCounts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const pairs = Object.values(valueCounts).filter(count => count === 2).length;
  const hasThreeOfAKind = Object.values(valueCounts).some(count => count === 3);
  const hasFourOfAKind = Object.values(valueCounts).some(count => count === 4);

  if (hasFourOfAKind) return { name: "フォーカード", score: 100 };
  if (hasThreeOfAKind && pairs === 1) return { name: "フルハウス", score: 80 };
  if (isFlush) return { name: "フラッシュ", score: 60 };
  if (hasThreeOfAKind) return { name: "スリーカード", score: 40 };
  if (pairs === 2) return { name: "ツーペア", score: 30 };
  if (pairs === 1) return { name: "ワンペア", score: 20 };
  return { name: "ノーペア", score: 10 };
};