import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// الصور
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/D.1.svg";

const WRONG_COLOR = "#ef4444";
const CORRECT_COLOR = "#22c55e";

const ITEMS = [
  {
    id: 1,
    // img: img3,
    sentence: { before: "The third boy", after: "." },
    correct: "is running",
    options: ["is running", "is singing", "is eating an ice cream"],
  },
  {
    id: 2,
    // img: img1,
    sentence: { before: "The", after: "boy is riding a bike." },
    correct: "first",
    options: ["first", "second", "fifth"],
  },
  {
    id: 3,
    // img: img6,
    sentence: { before: "The sixth boy", after: "." },
    correct: "is eating an ice cream",
    options: ["is running", "is eating an ice cream", "is singing"],
  },
  {
    id: 4,
    // img: img5,
    sentence: { before: "The", after: "boy is kicking the ball." },
    correct: "fifth",
    options: ["first", "second", "fifth"],
  },
  {
    id: 5,
    // img: img4,
    sentence: { before: "The fourth boy", after: "." },
    correct: "is singing",
    options: ["is singing", "is running", "is eating an ice cream"],
  },
  {
    id: 6,
    // img: img2,
    sentence: { before: "The", after: "boy is skateboarding." },
    correct: "second",
    options: ["first", "second", "fifth"],
  },
];

export default function WB_LookReadWrite_PageD() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
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
  };

  const isWrong = (item) =>
    showResults && !showAns && answers[item.id] !== item.correct;

  return (
    <div className="main-container-component">
      <div className="div-forall">
        {/* Title */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span> Look, read, and choose.
        </h1>
           
       <div className="flex flex-col justify-start items-start gap-20">
          <img
            src={img1}
            alt=""
            style={{ width: "auto", height: "150px", objectFit: "contain" }}
          />
    

        {/* Questions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                {item.id}
              </span>

              <span style={{ fontSize: "18px" }}>{item.sentence.before}</span>

              <select
                value={answers[item.id] || ""}
                onChange={(e) => handleSelect(item.id, e.target.value)}
                disabled={showAns || showResults}
                style={{
                  minWidth: "140px",
                  height: "36px",
                  // borderRadius: "8px",
                  borderBottom: `2px solid ${
                    isWrong(item) ? WRONG_COLOR : "#ccc"
                  }`,
                  padding: "4px 8px",
                  fontSize: "18px",
                }}
              >
                <option value="" disabled>
                  Select
                </option>

                {item.options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              {/* wrong icon */}
              {isWrong(item) && (
                <span
                  style={{
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
                </span>
              )}

              <span style={{ fontSize: "18px" }}>{item.sentence.after}</span>
            </div>
          ))}
        </div>
</div>
        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}
