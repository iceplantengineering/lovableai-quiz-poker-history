import { useState } from "react";
import { useToast } from "../components/ui/use-toast";
import Card from "./Card";
import { Card as CardType, evaluateHand } from "../utils/pokerRules";

interface PokerHandProps {
  cards: CardType[];
  onHandComplete: (score: number) => void;
}

const PokerHand = ({ cards, onHandComplete }: PokerHandProps) => {
  const [flippedCount, setFlippedCount] = useState(0);
  const { toast } = useToast();

  const handleCardFlip = () => {
    setFlippedCount(prev => {
      const newCount = prev + 1;
      
      // 最後のカードがめくられた時
      if (newCount === 5) {
        // 少し待ってから役を判定
        setTimeout(() => {
          const result = evaluateHand(cards);
          toast({
            title: "ポーカーの役",
            description: `${result.name}！ ${result.score}点獲得！`,
            duration: 3000,
          });
          onHandComplete(result.score);
        }, 1000); // 最後のカードがめくられてから1秒後に判定
      }
      return newCount;
    });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center p-8">
      {cards.map((card, index) => (
        <Card
          key={`${card.suit}-${card.value}`}
          card={card}
          index={index}
          onFlip={handleCardFlip}
        />
      ))}
    </div>
  );
};

export default PokerHand;