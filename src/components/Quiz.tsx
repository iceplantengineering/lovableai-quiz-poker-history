
import { useState } from "react";
import { QuizQuestion } from "../utils/quizData";
import { Button } from "../components/ui/button";

interface QuizProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
}

const Quiz = ({ question, onAnswer }: QuizProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    const isCorrect = index === question.correctAnswer;
    onAnswer(isCorrect);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gamePaper rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gameGreen mb-6">{question.question}</h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            className={`w-full p-4 text-lg ${
              selectedAnswer === index
                ? selectedAnswer === question.correctAnswer
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
                : "bg-gameGreen hover:bg-gameGreen/90"
            }`}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
