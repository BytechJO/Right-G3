import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/1.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/2.svg";
import img2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/3.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/4.svg";
import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/5.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/6.svg";
import img4a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/7.svg";
import img4b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/8.svg";

import trueIcon from "../../../assets/imgs/true.svg";
const ITEMS = [
  {
    id: 1,
    sentence: "They are at the bus stop.",
    options: [
      { id: "a", img: img1a },
      { id: "b", img: img1b },
    ],
    correct: "a",
  },
  {
    id: 2,
    sentence: "She is at the train station.",
    options: [
      { id: "a", img: img2a },
      { id: "b", img: img2b },
    ],
    correct: "b",
  },
  {
    id: 3,
    sentence: "He was at school.",
    options: [
      { id: "a", img: img3a },
      { id: "b", img: img3b },
    ],
    correct: "b",
  },
  {
    id: 4,
    sentence: "They were at the airport.",
    options: [
      { id: "a", img: img4a },
      { id: "b", img: img4b },
    ],
    correct: "b",
  },
];

export default function WB_Unit8_Page53_QE() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (questionId, optionId) => {
    if (showAns||checked) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };



  const handleCheck = () => {
    if (showAns||checked) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;
    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) score++;
    });

    setChecked(true);

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
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };
  const isWrongOption = (questionId, optionId, correctId) => {
    if (!checked) return false;

    return answers[questionId] === optionId && optionId !== correctId;
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
          <span className="WB-ex-A">E</span>
          Read, look, and write <strong className="text-red-600">✓</strong>.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px 40px",
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
                gap: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#222",
                    minWidth: "18px",
                  }}
                >
                  {item.id}
                </span>

                <p
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    color: "#222",
                    lineHeight: "1.4",
                    fontWeight: "500",
                  }}
                >
                  {item.sentence}
                </p>
              </div>

              <div
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {item.options.map((option) => (
                  <div
                    key={option.id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* wrapper للصورة */}
                    <div
                      style={{
                        position: "relative",

                        width: "170px",
                      }}
                    >
                      <img
                        src={option.img}
                         onClick={() => handleSelect(item.id, option.id)}
                        alt={`${item.id}-${option.id}`}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          objectFit: "contain",
                           cursor: showAns||checked ? "default" : "pointer",
                        }}
                      />

                      {/* مربع الاختيار */}
                      <div
                        onClick={() => handleSelect(item.id, option.id)}
                        style={{
                          position: "absolute",

                          // ثابت مع الصورة نفسها
                          top: "0%",
                          right: "0%",

                          width: "clamp(32px,3.5vw,40px)",
                          height: "clamp(32px,3.5vw,40px)",

                          // backgroundColor: "#fff",
                          // border: "2px solid #f39b42",
                          // borderRadius: "8px",

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",

                          cursor: showAns||checked ? "default" : "pointer",

                          zIndex: 2,
                          boxSizing: "border-box",

                          transition: "0.2s ease",
                        }}
                      >
                        {answers[item.id] === option.id && (
                          <img
                            src={trueIcon}
                            style={{
                              width: "65%",
                              height: "65%",
                              objectFit: "contain",
                            }}
                          />
                        )}
                      </div>
                      {isWrongOption(item.id, option.id, item.correct) && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-6px",
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
                            zIndex: 3,
                          }}
                        >
                          ✕
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}
