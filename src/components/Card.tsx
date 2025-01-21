import { useState, useEffect } from "react";
import { Card as CardType } from "../utils/pokerRules";

interface CardProps {
  card: CardType;
  index: number;
  onFlip: () => void;
}

const Card = ({ card, index, onFlip }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
      onFlip();
    }, (index + 1) * 1000); // インデックスに1を加えて、最初のカードも遅延を持つようにする

    return () => clearTimeout(timer);
  }, [index, onFlip]);

  const getColor = (suit: string) => {
    return suit === "♥" || suit === "♦" ? "text-red-600" : "text-black";
  };

  return (
    <div className="relative w-24 h-36">
      <div
        className={`w-full h-full transition-all duration-500 transform ${
          isFlipped ? "rotate-y-180" : ""
        } preserve-3d`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={`absolute w-full h-full bg-white border-2 border-gameGold rounded-lg shadow-lg ${
            isFlipped ? "opacity-0" : "opacity-100"
          } flex items-center justify-center backface-hidden`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-gameGreen text-2xl">🎴</div>
        </div>
        <div
          className={`absolute w-full h-full bg-white border-2 border-gameGold rounded-lg shadow-lg ${
            isFlipped ? "opacity-100" : "opacity-0"
          } flex items-center justify-center backface-hidden rotate-y-180`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className={`text-3xl font-bold ${getColor(card.suit)}`}>
            {card.value}
            {card.suit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;