import { useState, useEffect } from "react";
import Quiz from "../components/Quiz";
import PokerHand from "../components/PokerHand";
import { quizQuestions } from "../utils/quizData";
import { createDeck, shuffleDeck, Card } from "../utils/pokerRules";
import { useToast } from "../components/ui/use-toast";

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [showCards, setShowCards] = useState(false);
  const { toast } = useToast();

  const dealCards = () => {
    const deck = shuffleDeck(createDeck());
    setCards(deck.slice(0, 5));
    setShowCards(true);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      toast({
        title: "正解！",
        description: "カードが配られます...",
      });
      dealCards();
    } else {
      toast({
        title: "不正解",
        description: "もう一度挑戦してください",
        variant: "destructive",
      });
    }
  };

  const handleHandComplete = (handScore: number) => {
    setScore(prev => prev + handScore);
    setTimeout(() => {
      setShowCards(false);
      setCurrentQuestionIndex(prev => prev + 1);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gameGreen p-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gameGold mb-4">日本史ポーカークイズ</h1>
          <p className="text-2xl text-white mb-4">現在のスコア: {score}</p>
        </div>

        {currentQuestionIndex < quizQuestions.length ? (
          <>
            {!showCards ? (
              <Quiz
                question={quizQuestions[currentQuestionIndex]}
                onAnswer={handleAnswer}
              />
            ) : (
              <PokerHand cards={cards} onHandComplete={handleHandComplete} />
            )}
          </>
        ) : (
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">ゲーム終了！</h2>
            <p className="text-2xl">最終スコア: {score}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;