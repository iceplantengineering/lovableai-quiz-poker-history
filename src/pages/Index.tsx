
import { useState, useEffect } from "react";
import Quiz from "../components/Quiz";
import PokerHand from "../components/PokerHand";
import { quizQuestions, shuffleQuestions } from "../utils/quizData";
import { createDeck, shuffleDeck, Card } from "../utils/pokerRules";
import { useToast } from "../components/ui/use-toast";
import { Button } from "../components/ui/button";

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [showCards, setShowCards] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lives, setLives] = useState(3);
  const [heartBreaking, setHeartBreaking] = useState<number | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState(shuffleQuestions(quizQuestions));
  const [showGoodbye, setShowGoodbye] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setShuffledQuestions(shuffleQuestions(quizQuestions));
  }, []);

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setLives(3);
    setShowCards(false);
    setShuffledQuestions(shuffleQuestions(quizQuestions));
  };

  const handleGameEnd = () => {
    setShowGoodbye(true);
    setTimeout(() => {
      window.close();
    }, 2000);
  };

  const dealCards = () => {
    const deck = shuffleDeck(createDeck());
    setCards(deck.slice(0, 5));
    setShowCards(true);
  };

  const handleAnswer = (correct: boolean) => {
    setIsCorrect(correct);
    if (correct) {
      toast({
        title: "正解！",
        description: "カードが配られます...",
        duration: 2000,
      });
      dealCards();
    } else {
      const newLives = lives - 1;
      setHeartBreaking(newLives);
      
      setTimeout(() => {
        setLives(newLives);
        setHeartBreaking(null);
      }, 500);
      
      if (newLives <= 0) {
        toast({
          title: "ゲームオーバー",
          description: "ライフが尽きました",
          variant: "destructive",
          duration: 2000,
        });
        setCurrentQuestionIndex(shuffledQuestions.length);
      } else {
        toast({
          title: "不正解",
          description: `残りライフ: ${newLives}`,
          variant: "destructive",
          duration: 2000,
        });
        setTimeout(() => {
          setShowCards(false);
          setCurrentQuestionIndex(prev => prev + 1);
        }, 2000);
      }
    }
  };

  const handleHandComplete = (handScore: number) => {
    if (isCorrect) {
      setScore(prev => prev + handScore);
    }
    setTimeout(() => {
      setShowCards(false);
      setCurrentQuestionIndex(prev => prev + 1);
    }, 2000);
  };

  if (showGoodbye) {
    return (
      <div className="min-h-screen bg-gameGreen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">また頑張ろう！</h2>
          <p className="text-2xl">次回の挑戦をお待ちしています</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gameGreen p-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gameGold mb-4">日本史ポーカークイズ</h1>
          <div className="flex justify-center items-center gap-4 mb-4">
            <p className="text-2xl text-white">現在のスコア: {score}</p>
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-2xl transition-all duration-500 transform ${
                    heartBreaking === i ? 'scale-150 opacity-0' : ''
                  }`}
                  style={{ opacity: i < lives ? 1 : 0.2 }}
                >
                  ❤️
                </span>
              ))}
            </div>
          </div>
        </div>

        {currentQuestionIndex < shuffledQuestions.length && lives > 0 ? (
          <>
            {!showCards ? (
              <Quiz
                question={shuffledQuestions[currentQuestionIndex]}
                onAnswer={handleAnswer}
              />
            ) : (
              <PokerHand 
                cards={cards} 
                onHandComplete={handleHandComplete}
                isCorrect={isCorrect}
              />
            )}
          </>
        ) : (
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">ゲーム終了！</h2>
            <p className="text-2xl mb-6">最終スコア: {score}</p>
            {lives <= 0 && <p className="text-xl text-red-400 mb-8">ライフが尽きました</p>}
            <div className="space-x-4">
              <Button 
                onClick={resetGame}
                className="bg-gameGold hover:bg-gameGold/90 text-black px-8 py-3 text-lg"
              >
                もう一度プレイ
              </Button>
              <Button 
                onClick={handleGameEnd}
                variant="destructive"
                className="px-8 py-3 text-lg"
              >
                終わる
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
