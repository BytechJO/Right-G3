import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/8.svg";

const WRONG_COLOR = "red";
const RED_COLOR = "#000000ff";
const LINE_COLOR = "#333";
const BORDER_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";

// خيارات السؤال
const QUESTION_OPTIONS = [
  "she have a horse",
  "he play football",
  "they go to school",
];

// خيارات الإجابات
const ANSWER_OPTIONS = ["she did.", "she didn't.", "he didn't."];

const ITEMS = [
  {
    id: 1,
    img: img1,
    question: "Did she ride a bike?",
    answerPrefix: "Yes, ",
    answerKey: "ans-1",
    answerCorrect: "she did.",
  },
  {
    id: 2,
    img: img2,
    question: "Did she watch a TV?",
    answerPrefix: "No, ",
    answerKey: "ans-2",
    answerCorrect: "she didn't.",
  },
  {
    id: 3,
    img: img3,
    question: "Did he go to the supermarket?",
    answerPrefix: "No, ",
    answerKey: "ans-3",
    answerCorrect: "he didn't.",
  },
  {
    id: 4,
    img: img4,
    questionBefore: "Did ",
    questionAfter: "?",
    questionKey: "q-4",
    questionCorrect: "she have a horse",
    answerPrefix: "Yes, ",
    answerKey: "ans-4",
    answerCorrect: "she did.",
  },
];

const ALL_ZONES = [];

ITEMS.forEach((item) => {
  if (item.questionKey) {
    ALL_ZONES.push({
      key: item.questionKey,
      correct: item.questionCorrect,
    });
  }

  ALL_ZONES.push({
    key: item.answerKey,
    correct: item.answerCorrect,
  });
});

export default function WB_LookReadWrite_PageJ() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleChange = (key, value) => {
    if (showAns || showResults) return;

    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns ||showResults) return;

    const allFilled = ALL_ZONES.every(({ key }) => answers[key]);

    if (!allFilled) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ALL_ZONES.forEach(({ key, correct }) => {
      if (answers[key] === correct) score++;
    });

    setShowResults(true);

    const total = ALL_ZONES.length;

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};

    ALL_ZONES.forEach(({ key, correct }) => {
      filled[key] = correct;
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

  const isWrong = (key, correct) =>
    showResults && !showAns && answers[key] !== correct;

  // ── select ──
  const renderSelect = (
    boxKey,
    correct,
    options,
    minWidth = "clamp(120px,16vw,240px)",
  ) => {
    const value = answers[boxKey] || "";
    const wrong = isWrong(boxKey, correct);

    return (
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "flex-end",
        }}
      >
        <select
          disabled={showAns || showResults}
          value={value}
          onChange={(e) => handleChange(boxKey, e.target.value)}
          style={{
            appearance: "auto",
            WebkitAppearance: "auto",
            MozAppearance: "menulist",

            minWidth,

            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",

            borderBottom: wrong
              ? `2px solid ${WRONG_COLOR}`
              : `1px solid ${LINE_COLOR}`,

            borderRadius: 0,
            outline: "none",

            fontSize: "18px",
            // fontWeight: 700,
            // color: wrong ? WRONG_COLOR : RED_COLOR,

            padding: "0 4px 3px 4px",

            background: "transparent",

            cursor: showAns || showResults ? "default" : "pointer",

            boxSizing: "border-box",
          }}
        >
          <option value="" disabled hidden></option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-6px",
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
              pointerEvents: "none",
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  // ── card ──
  const renderItem = (item) => (
    <div
      key={item.id}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(8px,1vw,14px)",
      }}
    >
      {/* صورة */}
      <div className="flex gap-2">
        {/* رقم */}
        <span
          style={{
            fontSize: "clamp(16px,1.8vw,24px)",
            fontWeight: 500,
            color: "#111",
          }}
        >
          {item.id}
        </span>
        <img
          src={item.img}
          alt={`item-${item.id}`}
          style={{
            width: "auto",
            height: "120px",
            objectFit: "cover",
            display: "block",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* السؤال */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        {item.questionBefore ? (
          <>
            <span
              style={{
                fontSize: "18px",
                // fontWeight: 500,
                color: "#111",
              }}
            >
              {item.questionBefore}
            </span>

            {/* سيليكت السؤال */}
            {renderSelect(
              item.questionKey,
              item.questionCorrect,
              QUESTION_OPTIONS,
              "clamp(170px,22vw,300px)",
            )}

            <span
              style={{
                fontSize: "18px",
                // fontWeight: 500,
                color: "#111",
              }}
            >
              {item.questionAfter}
            </span>
          </>
        ) : (
          <span
            style={{
              fontSize: "18px",
              // fontWeight: 500,
              color: "#111",
            }}
          >
            {item.question}
          </span>
        )}
      </div>

      {/* الإجابة */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            // fontWeight: 500,
            color: "#111",
            borderBottom: `1px solid ${LINE_COLOR}`,
            paddingBottom: "2px",
          }}
        >
          {item.answerPrefix}
        </span>

        {/* سيليكت الإجابة */}
        {renderSelect(item.answerKey, item.answerCorrect, ANSWER_OPTIONS)}
      </div>
    </div>
  );

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
         
          gap: "25px",
      
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
       
        >
          <span className="WB-ex-A">J</span>
          Look, read, and write.
        </h1>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: "clamp(20px,3vw,40px)",
            width: "100%",
          }}
        >
          {ITEMS.map(renderItem)}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(6px,1vw,12px)",
          }}
        >
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
