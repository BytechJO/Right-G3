import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import mainImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/2.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";

const ITEMS = [
  {
    id: 1,
    correct: "him",
    choices: ["him", "her", "it", "you"],
    position: { top: "12%", left: "77%" },
  },
  {
    id: 2,
    correct: "her",
    choices: ["him", "her", "it", "me"],
    position: { top: "38%", left: "72%" },
  },
  {
    id: 3,
    correct: "it",
    choices: ["it", "him", "you", "me"],
    position: { top: "66%", left: "77%" },
  },
  {
    id: 4,
    correct: "you",
    choices: ["you", "him", "her", "it"],
    position: { top: "91%", left: "78%" },
  },
];

export default function WB_NewVersion() {
  const [answers, setAnswers] = useState({});
  const [openId, setOpenId] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns || showResults) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setOpenId(null);
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns || showResults) return;

    const allAnswered = ITEMS.every((i) => answers[i.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((i) => {
      if (answers[i.id] === i.correct) score++;
    });

    setShowResults(true);

    const total = ITEMS.length;

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => {
      filled[i.id] = i.correct;
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setOpenId(null);
  };

  const isWrong = (item) =>
    showResults && !showAns && answers[item.id] !== item.correct;

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "50px" }}>
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">B</span> Complete the sentences and write{" "}
          <span className="text-blue-900">him</span>,{" "}
          <span className="text-blue-900">her</span>,
          <span className="text-blue-900">you</span> ,
          <span className="text-blue-900">me</span> , and{" "}
          <span className="text-blue-900">it</span>.
        </h1>

        {/* الصورة */}
        <div style={{ position: "relative" }}>
          <img src={mainImg} style={{ width: "100%", height: "auto" }} />

          {/* dropdowns */}
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "absolute",
                top: item.position.top,
                left: item.position.left,
                transform: "translate(-50%, -50%)",

                width: "120px",
              }}
            >
              {/* selected */}
              <select
                value={answers[item.id] || ""}
                onChange={(e) => handleSelect(item.id, e.target.value)}
                disabled={showAns || showResults}
                style={{
                  width: "100%",
                  padding: "6px",
                  fontSize: "18px",
                  // borderRadius: "6px",
                  border: "none",
                  borderBottom: isWrong(item)
                    ? `2px solid ${WRONG_COLOR}`
                    : "1px solid gray",
                  background: "#fff",
                  cursor: showAns || showResults ? "not-allowed" : "pointer",
                }}
              >
                <option value="" disabled>
                  Select...
                </option>
                {item.choices.map((choice) => (
                  <option key={choice} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>

              {/* wrong icon */}
              {isWrong(item) && (
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    left: "-8px",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "red",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                    border: "2px solid white",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  ✕
                </div>
              )}
            </div>
          ))}
        </div>

        <Button
          checkAnswers={handleCheck}
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleStartAgain}
        />
      </div>
    </div>
  );
}
