import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/8.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    question: "Did she ride a bike?",
    answerPrefix: "Yes,",
    correct: "she did.",
  },
  {
    id: 2,
    img: img2,
    question: "Did she watch a TV?",
    answerPrefix: "No,",
    correct: "she didn’t.",
  },
  {
    id: 3,
    img: img3,
    question: "Did he go to the supermarket?",
    answerPrefix: "No,",
    correct: "he didn’t.",
  },
  {
    id: 4,
    img: img4,
    questionPrefix: "Did",
    questionBlank: true,
    questionSuffix: "?",
    correctQuestionPart: "she have a horse",
    answerPrefix: "Yes,",
    correct: "she did.",
  },
];

const DRAG_ITEMS = [
  { id: 1, value: "she did." },
  { id: 2, value: "she didn’t." },
  { id: 1, value: " she did." },

  { id: 3, value: "he didn’t." },
  { id: 4, value: "she have a horse" },
];

export default function WB_Unit8_Page49_QJ() {
  const [answers, setAnswers] = useState({});
  const [draggedText, setDraggedText] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedValues = Object.values(answers);

  const handleDragStart = (value) => {
    if (showAns || usedValues.includes(value)) return;
    setDraggedText(value);
  };

  const handleDrop = (dropKey) => {
    if (showAns || !draggedText) return;

    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key] === draggedText) {
        delete newAnswers[key];
      }
    });

    newAnswers[dropKey] = draggedText;
    setAnswers(newAnswers);
    setDraggedText(null);
  };

  const getItemResult = (item) => {
    const answerCorrect = answers[`${item.id}-answer`] === item.correct;

    if (item.questionBlank) {
      const questionCorrect =
        answers[`${item.id}-question`] === item.correctQuestionPart;
      return answerCorrect && questionCorrect;
    }

    return answerCorrect;
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => {
      if (item.questionBlank) {
        return answers[`${item.id}-question`] && answers[`${item.id}-answer`];
      }
      return answers[`${item.id}-answer`];
    });

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (getItemResult(item)) {
        score++;
      }
    });

    setShowResults(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctMap = {};

    ITEMS.forEach((item) => {
      correctMap[`${item.id}-answer`] = item.correct;

      if (item.questionBlank) {
        correctMap[`${item.id}-question`] = item.correctQuestionPart;
      }
    });

    setAnswers(correctMap);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedText(null);
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults) return false;
    return !getItemResult(item);
  };

  const renderDropBox = (dropKey, width = "180px", isRed = true) => {
    const value = answers[dropKey];

    return (
      <span
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(dropKey)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          minWidth: width,
          minHeight: "34px",
          padding: "0 4px 4px 4px",
          borderBottom: "2px solid #555",
          color: value ? (isRed ? "#d92d20" : "#222") : "#999",
          fontSize: "22px",
          lineHeight: "1.3",
          verticalAlign: "middle",
        }}
      >
        {value || ""}
      </span>
    );
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          width: "100%",
          maxWidth: "980px",
          margin: "0 auto",
          padding: "10px 18px 20px 18px",
          boxSizing: "border-box",
        }}
      >
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
          }}
        >
          <span className="WB-ex-A">J</span> Look, read, and write.
        </h1>

        {/* بنك السحب */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "4px",
          }}
        >
          {DRAG_ITEMS.map((item) => {
            const disabled = usedValues.includes(item.value);

            return (
              <div
                key={item.id}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(item.value)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "10px",
                  backgroundColor: disabled ? "#d1d5db" : "#ef4444",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: disabled ? "not-allowed" : "grab",
                  opacity: disabled ? 0.5 : 1,
                  userSelect: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                }}
              >
                {item.value}
              </div>
            );
          })}
        </div>

        {/* العناصر */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "26px 40px",
            alignItems: "start",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#222",
                    minWidth: "18px",
                    lineHeight: "1",
                    marginTop: "8px",
                  }}
                >
                  {item.id}
                </span>

                <img
                  src={item.img}
                  alt={`question-${item.id}`}
                  style={{
                    width: "300px",
                    height: "170px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              {/* السؤال */}
              <div
                style={{
                  fontSize: "24px",
                  color: "#222",
                  lineHeight: "1.4",
                  paddingLeft: "28px",
                }}
              >
                {item.questionBlank ? (
                  <>
                    <span>{item.questionPrefix} </span>
                    {renderDropBox(`${item.id}-question`, "250px", true)}
                    <span>{item.questionSuffix}</span>
                  </>
                ) : (
                  item.question
                )}
              </div>

              {/* الجواب */}
              <div
                style={{
                  fontSize: "24px",
                  color: "#222",
                  lineHeight: "1.4",
                  paddingLeft: "28px",
                }}
              >
                <span>{item.answerPrefix} </span>
                {renderDropBox(`${item.id}-answer`, "170px", true)}
              </div>

              {isWrong(item) && (
                <div
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#ef4444",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "700",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                  }}
                >
                  ✕
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}