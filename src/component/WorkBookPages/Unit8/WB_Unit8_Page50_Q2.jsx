import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd10pg50instruction1-adult-lady_B8YFlmMv.mp3"; // ← غيّر المسار حسب ملف الأوديو

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/6.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/7.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/8.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/9.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/10.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/11.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "red";
const captions = [
  { start: 0.44, end: 3.08, text: "Page 50, phonics exercise B." },
  { start: 3.08, end: 4.9, text: "Listen and circle." },
  { start: 5.98, end: 7.66, text: "1- princess." },
  { start: 8.7, end: 10.5, text: "2- bracelet." },
  { start: 11.54, end: 13.32, text: "3- present." },
  { start: 13.32, end: 16.32, text: "4- grandfather." },
  { start: 16.32, end: 19.02, text: "5- broom." },
  { start: 19.02, end: 22.0, text: "6- grapes." },
];
const ITEMS = [
  {
    id: 1,
    img: img1,
    options: ["cr", "dr", "pr"],
    correct: "pr",
  },
  {
    id: 2,
    img: img2,
    options: ["br", "tr", "dr"],
    correct: "br",
  },
  {
    id: 3,
    img: img3,
    options: ["fr", "pr", "cr"],
    correct: "pr",
  },
  {
    id: 4,
    img: img4,
    options: ["tr", "gr", "pr"],
    correct: "gr",
  },
  {
    id: 5,
    img: img5,
    options: ["cr", "tr", "br"],
    correct: "br",
  },
  {
    id: 6,
    img: img6,
    options: ["gr", "fr", "dr"],
    correct: "gr",
  },
];

export default function WB_LookReadCircle_PageJ() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns || showResults) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns || showResults) return;
    const allAnswered = ITEMS.every((i) => answers[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
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

  const getOptionStyle = (item, opt) => {
    const isSelected = answers[item.id] === opt;
    const isWrong =
      showResults &&
      !showAns &&
      answers[item.id] === opt &&
      opt !== item.correct;
    const isCorrectShown = showAns && opt === item.correct;

    if (isWrong) {
      return {
        border: `2px solid ${WRONG_COLOR}`,
        // color: WRONG_COLOR,
      };
    }

    if (isSelected || isCorrectShown) {
      return {
        border: `1px solid ${BORDER_COLOR}`,
        color: "#111",
      };
    }

    return {
      border: "1px solid transparent",
      color: "#444",
    };
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "35px",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">B</span> Listen and circle.
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <QuestionAudioPlayer
            src={sound1}
            captions={captions}
            stopAtSecond={4.9}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: "clamp(16px,2.5vw,32px)",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "clamp(6px,0.8vw,10px)",
              }}
            >
              <div className="flex gap-2">
                <span
                  style={{
                    fontSize: "clamp(16px,1.8vw,24px)",
                    fontWeight: 700,
                    color: "#111",
                    alignSelf: "flex-start",
                  }}
                >
                  {item.id}
                </span>
                <img
                  src={item.img}
                  alt={`item-${item.id}`}
                  style={{
                    width: "auto",
                    height: "100px",

                    display: "block",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  flexWrap: "nowrap",
                }}
              >
                {item.options.map((opt) => {
                  const isSelected = answers[item.id] === opt;
                  const isWrong =
                    showResults &&
                    !showAns &&
                    answers[item.id] === opt &&
                    opt !== item.correct;

                  return (
                    <div
                      key={opt}
                      style={{
                        position: "relative",
                        width: "auto",
                      }}
                    >
                      <button
                        onClick={() => handleSelect(item.id, opt)}
                        style={{
                          width: "auto",
                          minWidth: "44px",
                          padding:
                            "clamp(4px,0.6vw,8px) clamp(10px,1.2vw,16px)",
                          borderRadius: "999px",
                          fontSize: "clamp(13px,1.4vw,18px)",
                          fontWeight: isSelected ? 700 : 500,
                          cursor:
                            showAns || showResults ? "default" : "pointer",
                          transition: "all 0.15s",
                          userSelect: "none",
                          textAlign: "center",
                          boxSizing: "border-box",
                          background: "transparent",
                          ...getOptionStyle(item, opt),
                        }}
                      >
                        {opt}
                      </button>

                      {isWrong && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-6px",
                            right: "-6px",
                            width: "clamp(16px,1.8vw,20px)",
                            height: "clamp(16px,1.8vw,20px)",
                            borderRadius: "50%",
                            border: "1px solid #fff",
                            backgroundColor: WRONG_COLOR,
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "clamp(9px,0.9vw,11px)",
                            fontWeight: 700,
                            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                            pointerEvents: "none",
                          }}
                        >
                          ✕
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

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
