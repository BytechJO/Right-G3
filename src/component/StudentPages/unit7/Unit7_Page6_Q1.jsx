import { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";

const Unit7_Page6_Q1 = () => {
  const [userAnswers, setUserAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const [checked, setChecked] = useState(false);

  const words = ["them", "it", "you", "her", "us"];

  const correctAnswers = {
    1: "it",
    2: "her",
    3: "them",
    4: "them",
    5: "you",
    6: "us",
  };

  const questions = [
    {
      parts: [
        { type: "text", value: "1. Look! There's a car. Can you see " },
        { type: "blank", id: "1" },
        { type: "text", value: "?" },
      ],
    },
    {
      parts: [
        { type: "text", value: "2. There's Mom. Can you see " },
        { type: "blank", id: "2" },
        { type: "text", value: "?" },
      ],
    },
    {
      parts: [
        { type: "text", value: "3. There are crayons. Can you see " },
        { type: "blank", id: "3" },
        { type: "text", value: "?" },
      ],
    },
    {
      parts: [
        { type: "text", value: "4. There are two dogs. Can you see " },
        { type: "blank", id: "4" },
        { type: "text", value: "?" },
      ],
    },
    {
      parts: [
        { type: "text", value: "5. There you are. I can see " },
        { type: "blank", id: "5" },
        { type: "text", value: "!" },
      ],
    },
    {
      parts: [
        { type: "text", value: "6. Here we are. Can you see " },
        { type: "blank", id: "6" },
        { type: "text", value: "?" },
      ],
    },
  ];

  const handleChange = (id, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const checkAnswers = () => {
    if (checked) return;

    const hasEmptyInputs = Object.keys(correctAnswers).some(
      (id) => !userAnswers[id] || userAnswers[id].trim() === "",
    );

    if (hasEmptyInputs) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let currentScore = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    Object.keys(correctAnswers).forEach((id) => {
      const userAnswer = userAnswers[id]?.toLowerCase().trim();
      const correctAnswer = correctAnswers[id].toLowerCase();

      if (userAnswer === correctAnswer) currentScore++;
    });

    setChecked(true);

    ValidationAlert[
      currentScore === totalQuestions
        ? "success"
        : currentScore === 0
        ? "error"
        : "warning"
    ](`
      Score: ${currentScore} / ${totalQuestions}
    `);
  };

  const handleShowAnswer = () => {
    setUserAnswers({ ...correctAnswers });
    setChecked(true);
  };

  const handleStartAgain = () => {
    setUserAnswers({
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
    });

    setChecked(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{ gap: "0px" }}>
        <h5 className="header-title-page8 pb-2.5">
          <span
            className="ex-A"
            style={{ marginRight: "10px", marginBottom: 7 }}
          >
            D
          </span>
          Read and complete.
        </h5>

        <div className="flex-1 bg-white rounded-2xl p-6 space-y-10 text-xl">
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="flex items-center gap-2 flex-wrap">
              {q.parts.map((part, i) => {
                if (part.type === "text") {
                  return <span key={i}>{part.value}</span>;
                }

                const isWrong =
                  checked &&
                  userAnswers[part.id] &&
                  userAnswers[part.id].toLowerCase().trim() !==
                    correctAnswers[part.id].toLowerCase();

                return (
                  <div key={i} className="relative inline-block">
                    <select
                      value={userAnswers[part.id]}
                      disabled={checked}
                      onChange={(e) =>
                        handleChange(part.id, e.target.value)
                      }
                      className={`border-b-2 outline-none bg-transparent px-2 py-1 min-w-[120px] text-center font-semibold ${
                        isWrong
                          ? "border-red-500"
                          : "border-black"
                      }`}
                    >
                      <option value="">Select</option>

                      {words.map((word, index) => (
                        <option key={index} value={word}>
                          {word}
                        </option>
                      ))}
                    </select>

                    {isWrong && (
                      <span
                        style={{
                          position: "absolute",
                          left: "105%",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "20px",
                          height: "20px",
                          background: "red",
                          color: "white",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          border: "2px solid white",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          pointerEvents: "none",
                          zIndex: 3,
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <Button
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleStartAgain}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit7_Page6_Q1;