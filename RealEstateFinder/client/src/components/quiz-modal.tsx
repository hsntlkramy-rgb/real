import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { quizQuestions } from '@/lib/mock-data';
import { UserPersonas } from '@/lib/types';

interface QuizModalProps {
  isOpen: boolean;
  onComplete: (profile: UserPersonas) => void;
}

export function QuizModal({ isOpen, onComplete }: QuizModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // Calculate final profile
      const profile: UserPersonas = {
        remoteWorker: 0,
        family: 0,
        investor: 0,
        retiree: 0,
        luxury: 0
      };

      newAnswers.forEach((answerIndex, questionIndex) => {
        const question = quizQuestions[questionIndex];
        const selectedAnswer = question.options[answerIndex];
        
        Object.entries(selectedAnswer.scores).forEach(([persona, score]) => {
          if (score) {
            profile[persona as keyof UserPersonas] = Math.min(1, profile[persona as keyof UserPersonas] + score);
          }
        });
      });

      // Normalize scores
      const total = Object.values(profile).reduce((sum, score) => sum + score, 0);
      if (total > 0) {
        Object.keys(profile).forEach(persona => {
          profile[persona as keyof UserPersonas] = profile[persona as keyof UserPersonas] / total;
        });
      }

      onComplete(profile);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[currentQuestionIndex - 1] ?? null);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-2xl font-bold text-gray-800 mb-2 text-center">Lifestyle Quiz</DialogTitle>
        <div className="text-center mb-6">
          <p className="text-gray-600">Help us understand your preferences</p>
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <span className="text-sm text-gray-500 mt-2 block">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            {currentQuestion.question}
          </h4>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedOption === index
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`quiz-${currentQuestionIndex}`}
                  value={index}
                  checked={selectedOption === index}
                  onChange={() => handleOptionSelect(index)}
                  className="mr-3 text-primary"
                />
                <span className="text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="bg-primary hover:bg-secondary"
          >
            {currentQuestionIndex === quizQuestions.length - 1 ? 'Start Matching' : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
