import { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// بيانات التمرين
const exerciseData = {
  questions: [
    {
      id: 1,
      question: "Our teacher likes ...",
      options: [
        { id: "a", text: "us" },
        { id: "b", text: "we" },
      ],
      correct: "a",
    },
    {
      id: 2,
      question: "Can you see ... ",
      options: [
        { id: "a", text: "me" },
        { id: "b", text: "i" },
      ],
      correct: "a",
    },
    {
      id: 3,
      question: "I don't like snakes, but my btother likes ...",
      options: [
        { id: "a", text: "they" },
        { id: "b", text: "them" },
      ],
      correct: "b",
    },
    {
      id: 4,
      question: "My friends likes ...",
      options: [
        { id: "a", text: "I" },
        { id: "b", text: "me" },
      ],
      correct: "b",
    },
  ],
};

const Unit7_Page5_Q3 = () => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
    setShowResults(false);
  };

  const checkAnswers = () => {
    const allAnswered = exerciseData.questions.every(
      (q) => answers[q.id]
    );

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    setShowResults(true);

    let score = 0;

    exerciseData.questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        score++;
      }
    });

    if (score === exerciseData.questions.length) {
      ValidationAlert.success(`Score: ${score} / ${exerciseData.questions.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${exerciseData.questions.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${exerciseData.questions.length}`);
    }
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
  };

  const handleShowAnswer = () => {
    const autoAnswers = {};
    exerciseData.questions.forEach((q) => {
      autoAnswers[q.id] = q.correct;
    });
    setAnswers(autoAnswers);
    setShowResults(true);
  };

  const getOptionStyle = (qId, optId) => {
    const isSelected = answers[qId] === optId;

    if (!showResults) {
      return isSelected ? "bg-blue-500 text-white" : "bg-gray-200";
    }

    const isCorrect = exerciseData.questions.find((q) => q.id === qId).correct === optId;

    if (isCorrect) return "bg-green-500 text-white";
    if (isSelected && !isCorrect) return "bg-red-500 text-white";

    return "bg-gray-200";
  };

  return (
    <div className="main-container-component">
      <div className="div-forall">
        <h1 className="WB-header-title-page8">Read and choose the correct answer</h1>

        <div className="space-y-6 mt-6">
          {exerciseData.questions.map((q) => (
            <div key={q.id} className="p-4 bg-white shadow rounded-lg">
              <p className="text-lg mb-3">{q.question}</p>

              <div className="flex gap-4">
                {q.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(q.id, opt.id)}
                    className={`px-4 py-2 rounded-lg transition-all ${getOptionStyle(
                      q.id,
                      opt.id
                    )}`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button
          checkAnswers={checkAnswers}
          handleStartAgain={handleStartAgain}
          handleShowAnswer={handleShowAnswer}
        />
      </div>
    </div>
  );
};

export default Unit7_Page5_Q3;