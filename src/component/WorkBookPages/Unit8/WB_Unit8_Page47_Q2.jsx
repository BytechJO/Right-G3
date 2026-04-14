import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// الصور
import boyImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/2.svg";
import sheep from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/3.svg";
import cat from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/4.svg";
import dogs from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/5.svg";
import fish from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/6.svg";
import horse from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/7.svg";
import goats from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/8.svg";
import tv from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/9.svg";

const DRAG_ITEMS = [
  "a horse",
  "a TV on the farm",
  "dogs, sheep, and goats",
  "a cat on the farm",
];

const QUESTIONS = [
  {
    id: 1,
    before: "There was",
    after: "on the farm.",
    correct: "a horse",
  },
  {
    id: 2,
    before: "There wasn’t",
    after: ".",
    correct: "a TV on the farm",
  },
  {
    id: 3,
    before: "They had",
    after: ".",
    correct: "dogs, sheep, and goats",
  },
  {
    id: 4,
    before: "They didn’t have",
    after: ".",
    correct: "a cat on the farm",
  },
];

export default function WB_Page47_F() {
  const [answers, setAnswers] = useState({});
  const [dragged, setDragged] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedValues = Object.values(answers);

  const handleDragStart = (item) => {
    if (showAns || usedValues.includes(item)) return;
    setDragged(item);
  };

  const handleDrop = (id) => {
    if (!dragged || showAns) return;

    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key] === dragged) {
        delete newAnswers[key];
      }
    });

    newAnswers[id] = dragged;
    setAnswers(newAnswers);
    setDragged(null);
  };

  const checkAnswers = () => {
    if (showAns) return;

    const all = QUESTIONS.every((q) => answers[q.id]);
    if (!all) {
      ValidationAlert.info("Complete all answers first.");
      return;
    }

    let score = 0;
    QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correct) score++;
    });

    setShowResults(true);

    if (score === QUESTIONS.length) {
      ValidationAlert.success(`Score: ${score} / ${QUESTIONS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${QUESTIONS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${QUESTIONS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correct = {};
    QUESTIONS.forEach((q) => {
      correct[q.id] = q.correct;
    });
    setAnswers(correct);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setDragged(null);
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (id) =>
    showResults && answers[id] !== QUESTIONS.find((q) => q.id === id).correct;

  const renderDropBox = (id, width) => (
    <span
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleDrop(id)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        minWidth: width,
        minHeight: "30px",
        borderBottom: "2px solid #555",
        padding: "0 4px 2px 4px",
        color: answers[id] ? "#d92d20" : "#999",
        fontSize: "18px",
        lineHeight: "1.4",
        backgroundColor: answers[id] ? "transparent" : "transparent",
        verticalAlign: "middle",
      }}
    >
      {answers[id] || ""}
    </span>
  );

  return (
    <div
      className="main-container-component"
      style={{
        width: "100%",
      }}
    >
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          width: "100%",
          maxWidth: "920px",
          margin: "0 auto",
          padding: "10px 18px 20px 18px",
          boxSizing: "border-box",
        }}
      >
        {/* العنوان */}
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
          }}
        >
          <span className="WB-ex-A">F</span> Read and write.
        </h1>

        {/* الفقاعة + الولد */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "6px",
            marginTop: "0",
            marginBottom: "0",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "520px",
              minHeight: "76px",
              border: "2px solid #8a8a8a",
              borderRadius: "14px",
              backgroundColor: "#fff",
              padding: "12px 16px",
              boxSizing: "border-box",
              fontSize: "18px",
              lineHeight: "1.15",
              color: "#222",
            }}
          >
            My father was a farmer. We had dogs, sheep,
            <br />
            and goats. I had a horse.
            <div
              style={{
                position: "absolute",
                right: "-34px",
                top: "44px",
                width: "42px",
                height: "2px",
                backgroundColor: "#8a8a8a",
                transform: "rotate(-16deg)",
                transformOrigin: "left center",
              }}
            />
          </div>

          <img
            src={boyImg}
            alt="boy"
            style={{
              width: "118px",
              height: "118px",
              objectFit: "contain",
              display: "block",
              marginTop: "-6px",
            }}
          />
        </div>

        {/* صف الصور */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "10px",
            flexWrap: "nowrap",
            marginTop: "0",
            marginBottom: "0",
            overflowX: "auto",
            paddingBottom: "2px",
          }}
        >
          <img
            src={sheep}
            alt="sheep"
            style={{
              width: "86px",
              height: "70px",
              objectFit: "contain",
              display: "block",
              flexShrink: 0,
            }}
          />
          <img
            src={cat}
            alt="cat"
            style={{
              width: "58px",
              height: "62px",
              objectFit: "contain",
              display: "block",
              flexShrink: 0,
            }}
          />
          <img
            src={dogs}
            alt="dogs"
            style={{
              width: "140px",
              height: "72px",
              objectFit: "contain",
              display: "block",
              flexShrink: 0,
            }}
          />
          <img
            src={fish}
            alt="fish"
            style={{
              width: "40px",
              height: "38px",
              objectFit: "contain",
              display: "block",
              flexShrink: 0,
            }}
          />
          <img
            src={horse}
            alt="horse"
            style={{
              width: "98px",
              height: "96px",
              objectFit: "contain",
              display: "block",
              flexShrink: 0,
            }}
          />
          <img
            src={goats}
            alt="goats"
            style={{
              width: "86px",
              height: "68px",
              objectFit: "contain",
              display: "block",
              flexShrink: 0,
            }}
          />
          <img
            src={tv}
            alt="tv"
            style={{
              width: "84px",
              height: "56px",
              objectFit: "contain",
              display: "block",
              flexShrink: 0,
            }}
          />
        </div>

        {/* بنك الإجابات */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
            marginTop: "2px",
            marginBottom: "2px",
          }}
        >
          {DRAG_ITEMS.map((item, i) => {
            const disabled = usedValues.includes(item);

            return (
              <div
                key={i}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(item)}
                style={{
                  backgroundColor: disabled ? "#cfcfcf" : "#ef4444",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  cursor: disabled ? "not-allowed" : "grab",
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "1.2",
                  userSelect: "none",
                  opacity: disabled ? 0.55 : 1,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.12)",
                }}
              >
                {item}
              </div>
            );
          })}
        </div>

        {/* الأسئلة */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "100%",
            marginTop: "0",
          }}
        >
          {QUESTIONS.map((q) => (
            <div
              key={q.id}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "6px",
                fontSize: "19px",
                color: "#222",
                lineHeight: "1.5",
                paddingLeft: "24px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: "1px",
                  fontWeight: "700",
                }}
              >
                {q.id}
              </span>

              <span>{q.before}</span>

              {renderDropBox(q.id, q.id === 1 ? "165px" : "290px")}

              <span>{q.after}</span>

              {isWrong(q.id) && (
                <span
                  style={{
                    position: "absolute",
                    right: "-8px",
                    top: "-6px",
                    backgroundColor: "#ef4444",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "22px",
                    height: "22px",
                    textAlign: "center",
                    lineHeight: "22px",
                    fontSize: "12px",
                    fontWeight: "700",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                  }}
                >
                  ✕
                </span>
              )}
            </div>
          ))}
        </div>

        {/* الأزرار */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <Button
            checkAnswers={checkAnswers}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}