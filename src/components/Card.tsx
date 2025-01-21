import { useState, useEffect } from "react";
import { Card as CardType } from "../utils/pokerRules";

interface CardProps {
  card: CardType;
  index: number;
  onFlip: () => void;
}

const Card = ({ card, index, onFlip }: CardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      onFlip();
    }, index * 1000);

    return () => clearTimeout(timer);
  }, [index, onFlip]);

  const getColor = (suit: string) => {
    return suit === "♥" || suit === "♦" ? "text-red-600" : "text-black";
  };

  return (
    <div
      className={`relative w-24 h-36 ${
        isAnimating ? "animate-card-deal" : ""
      } transition-transform duration-500`}
    >
      <div
        className={`w-full h-full ${
          card.isFlipped ? "rotate-y-180" : ""
        } transform-style-preserve-3d transition-transform duration-500`}
      >
        <div
          className={`absolute w-full h-full bg-white border-2 border-gameGold rounded-lg shadow-lg ${
            card.isFlipped ? "hidden" : "flex"
          } items-center justify-center`}
        >
          <div className="text-gameGreen text-2xl">🎴</div>
        </div>
        <div
          className={`absolute w-full h-full bg-white border-2 border-gameGold rounded-lg shadow-lg ${
            card.isFlipped ? "flex" : "hidden"
          } items-center justify-center ${getColor(card.suit)}`}
        >
          <div className="text-3xl font-bold">
            {card.value}
            {card.suit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;