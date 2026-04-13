import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.5.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    options: ["swimsuit", "glasses"],
    correctChecks: {
      swimsuit: "must",
      glasses: "mustNot",
    },
    correctFirst: "You must wear a swimsuit for swimming,",
    correctSecond: "you mustn’t wear glasses.",
  },
  {
    id: 2,
    img: img2,
    options: ["socks", "necklace"],
    correctChecks: {
      socks: "must",
      necklace: "mustNot",
    },
    correctFirst: "You must wear socks for tennis,",
    correctSecond: "you mustn’t wear a necklace.",
  },
  {
    id: 3,
    img: img3,
    options: ["apron", "boots"],
    correctChecks: {
      apron: "must",
      boots: "mustNot",
    },
    correctFirst: "You must wear an apron for cooking,",
    correctSecond: "you mustn’t wear boots.",
  },
  {
    id: 4,
    img: img4,
    options: ["helmet", "scarf"],
    correctChecks: {
      helmet: "must",
      scarf: "mustNot",
    },
    correctFirst: "You must wear a helmet for biking,",
    correctSecond: "you mustn’t wear a scarf.",
  },
  {
    id: 5,
    img: img5,
    options: ["coat", "shoes"],
    correctChecks: {
      shoes: "must",
      coat: "mustNot",
    },
    correctFirst: "You must wear shoes for running,",
    correctSecond: "you mustn’t wear a coat.",
  },
];

const DRAG_ITEMS = [
  { id: "1-a", value: "You must wear a swimsuit for swimming," },
  { id: "1-b", value: "you mustn’t wear glasses." },

  { id: "2-a", value: "You must wear socks for tennis," },
  { id: "2-b", value: "you mustn’t wear a necklace." },

  { id: "3-a", value: "You must wear an apron for cooking," },
  { id: "3-b", value: "you mustn’t wear boots." },

  { id: "4-a", value: "You must wear a helmet for biking," },
  { id: "4-b", value: "you mustn’t wear a scarf." },

  { id: "5-a", value: "You must wear shoes for running," },
  { id: "5-b", value: "you mustn’t wear a coat." },
];

export default function WB_Unit6_Page37_Q2() {
  const [checks, setChecks] = useState({});
  const [answers, setAnswers] = useState({});
  const [draggedText, setDraggedText] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedValues = Object.values(answers);

  const handleCheckSelect = (itemId, option, type) => {
    if (showAns) return;

    setChecks((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [option]: type,
      },
    }));
  };

  const handleDragStart = (value) => {
    if (showAns || usedValues.includes(value)) return;
    setDraggedText(value);
  };

  const handleDrop = (dropKey) => {
    if (showAns || !draggedText) return;

    setAnswers((prev) => ({
      ...prev,
      [dropKey]: draggedText,
    }));

    setDraggedText(null);
  };

  const getItemResult = (item) => {
    const checksCorrect = item.options.every(
      (option) => checks[item.id]?.[option] === item.correctChecks[option]
    );

    const firstCorrect = answers[`${item.id}-first`] === item.correctFirst;
    const secondCorrect = answers[`${item.id}-second`] === item.correctSecond;

    return checksCorrect && firstCorrect && secondCorrect;
  };

  const handleCheck = () => {
    if (showAns) return;

    const allChecksDone = ITEMS.every((item) =>
      item.options.every((option) => checks[item.id]?.[option])
    );

    const allDropsDone = ITEMS.every(
      (item) => answers[`${item.id}-first`] && answers[`${item.id}-second`]
    );

    if (!allChecksDone || !allDropsDone) {
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
    const correctChecksMap = {};
    const correctAnswersMap = {};

    ITEMS.forEach((item) => {
      correctChecksMap[item.id] = item.correctChecks;
      correctAnswersMap[`${item.id}-first`] = item.correctFirst;
      correctAnswersMap[`${item.id}-second`] = item.correctSecond;
    });

    setChecks(correctChecksMap);
    setAnswers(correctAnswersMap);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setChecks({});
    setAnswers({});
    setDraggedText(null);
    setShowResults(false);
    setShowAns(false);
  };

  const isItemWrong = (item) => {
    if (!showResults) return false;
    return !getItemResult(item);
  };

  const renderCheckButton = (itemId, option, type, symbol, color) => {
    const active = checks[itemId]?.[option] === type;

    return (
      <button
        onClick={() => handleCheckSelect(itemId, option, type)}
        style={{
          width: "28px",
          height: "28px",
          border: "1px solid #bdbdbd",
          borderRadius: "4px",
          backgroundColor: "#fff",
          color: active ? color : "#8f8f8f",
          fontSize: "22px",
          fontWeight: "700",
          lineHeight: "1",
          cursor: showAns ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {symbol}
      </button>
    );
  };

  const renderDropBox = (dropKey, minWidth = "250px") => {
    const value = answers[dropKey];

    return (
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(dropKey)}
        style={{
          minWidth,
          minHeight: "30px",
          padding: "2px 4px",
          borderBottom: "2px solid #7f7f7f",
          display: "flex",
          alignItems: "center",
          color: value ? "#dc2626" : "#9ca3af",
          fontSize: "15px",
          lineHeight: "1.4",
          backgroundColor: value ? "#fff7ed" : "transparent",
        }}
      >
        {value || ""}
      </div>
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
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">J</span>
          Look and write ✓ and ✗. Write sentences.
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
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
                  padding: "8px 10px",
                  borderRadius: "10px",
                  backgroundColor: disabled ? "#d1d5db" : "#ef4444",
                  color: "#fff",
                  fontSize: "13px",
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "18px",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: "18px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#222",
                    minWidth: "14px",
                  }}
                >
                  {item.id}
                </span>

                <div style={{ position: "relative" }}>
                  <img
                    src={item.img}
                    alt={`item-${item.id}`}
                    style={{
                      width: "85px",
                      height: "85px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />

                  <div
                    style={{
                      marginTop: "4px",
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                    }}
                  >
                    {item.options.map((option) => (
                      <div
                        key={option}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "4px",
                          minWidth: "44px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#444",
                          }}
                        >
                          {option}
                        </span>

                        <div
                          style={{
                            display: "flex",
                            gap: "6px",
                          }}
                        >
                          {renderCheckButton(
                            item.id,
                            option,
                            "must",
                            "✓",
                            "#16a34a"
                          )}
                          {renderCheckButton(
                            item.id,
                            option,
                            "mustNot",
                            "✕",
                            "#dc2626"
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  border: "2px solid #707070",
                  borderRadius: "16px",
                  backgroundColor: "#fff",
                  padding: "12px 14px",
                  minHeight: "82px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "-22px",
                    bottom: "14px",
                    width: "28px",
                    height: "2px",
                    backgroundColor: "#707070",
                    transform: "rotate(-28deg)",
                    transformOrigin: "right center",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "-7px",
                    bottom: "6px",
                    width: "0",
                    height: "0",
                    borderTop: "7px solid transparent",
                    borderBottom: "7px solid transparent",
                    borderRight: "10px solid #fff",
                    zIndex: 2,
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "6px",
                    color: "#dc2626",
                    fontSize: "15px",
                    lineHeight: "1.5",
                  }}
                >
                  {renderDropBox(`${item.id}-first`, "255px")}
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#333",
                    }}
                  >
                    but
                  </span>
                  {renderDropBox(`${item.id}-second`, "220px")}
                </div>

                {isItemWrong(item) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
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
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
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
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}