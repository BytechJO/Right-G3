import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/7.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/8.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/9.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/10.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    subject: "He",
    boxMark: "x",
    modalOptions: ["will", "won’t"],
    actionOptions: ["sit in the sun.", "build a sandcastle."],
    correctModal: "won’t",
    correctAction: "sit in the sun.",
  },
  {
    id: 2,
    img: img2,
    subject: "She",
    boxMark: "check",
    modalOptions: ["will", "won’t"],
    actionOptions: ["go to the beach.", "read a book."],
    correctModal: "will",
    correctAction: "read a book.",
  },
  {
    id: 3,
    img: img3,
    subject: "They",
    boxMark: "x",
    modalOptions: ["will", "won’t"],
    actionOptions: ["watch a movie.", "go to the mall."],
    correctModal: "won’t",
    correctAction: "watch a movie.",
  },
  {
    id: 4,
    img: img4,
    subject: "He",
    boxMark: "check",
    modalOptions: ["will", "won’t"],
    actionOptions: ["plant a tree.", "swim in the sea."],
    correctModal: "will",
    correctAction: "plant a tree.",
  },
];

export default function WB_Unit8_Page58_QD() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, field, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const isCorrect = (item) => {
    const ans = answers[item.id];
    if (!ans) return false;

    return (
      ans.modal === item.correctModal &&
      ans.action === item.correctAction
    );
  };

  const isWrong = (item) => {
    if (!checked) return false;
    return !isCorrect(item);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every(
      (item) => answers[item.id]?.modal && answers[item.id]?.action
    );

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;
    ITEMS.forEach((item) => {
      if (isCorrect(item)) score++;
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
      correctMap[item.id] = {
        modal: item.correctModal,
        action: item.correctAction,
      };
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

  const renderCircledText = (selected, text, onClick, minWidth = "unset") => {
    return (
      <div
        onClick={onClick}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth,
          padding: "2px 10px",
          cursor: showAns ? "default" : "pointer",
          userSelect: "none",
          fontSize: "20px",
          lineHeight: "1.2",
          color: "#222",
        }}
      >
        {selected && (
          <div
            style={{
              position: "absolute",
              inset: "-2px -4px",
              border: "4px solid #d92525",
              borderRadius: "999px",
              pointerEvents: "none",
            }}
          />
        )}
        <span style={{ position: "relative", zIndex: 1 }}>{text}</span>
      </div>
    );
  };

  const renderCornerMark = (type) => {
    if (type === "check") {
      return (
        <span
          style={{
            color: "#d92525",
            fontSize: "44px",
            fontWeight: "700",
            lineHeight: "1",
            position: "relative",
            top: "-2px",
          }}
        >
          ✓
        </span>
      );
    }

    return (
      <span
        style={{
          color: "#d92525",
          fontSize: "42px",
          fontWeight: "700",
          lineHeight: "1",
          position: "relative",
          top: "-2px",
        }}
      >
        ✕
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
          gap: "26px",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span>
          Look, read, and circle. Say.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "22px 55px",
            alignItems: "start",
          }}
        >
          {ITEMS.map((item) => {
            const current = answers[item.id] || {};

            return (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginBottom:"60px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#222",
                      minWidth: "18px",
                      lineHeight: "1.3",
                    }}
                  >
                    {item.id}
                  </span>

                  <div
                    style={{
                      width: "220px",
                      height: "170px",
                      border: "2px solid #b7b7b7",
                      borderRadius: "16px",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={item.img}
                      alt={`item-${item.id}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        top: "6px",
                        right: "6px",
                        width: "38px",
                        height: "38px",
                        backgroundColor: "#fff",
                        border: "2px solid #bdbdbd",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxSizing: "border-box",
                      }}
                    >
                      {renderCornerMark(item.boxMark)}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    paddingLeft: "26px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#222",
                      lineHeight: "42px",
                      minWidth: "42px",
                    }}
                  >
                    {item.subject}
                  </div>

                  <div
                    style={{
                      borderLeft: "3px solid #222",
                      paddingLeft: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      minWidth: "85px",
                    }}
                  >
                    {item.modalOptions.map((option) => (
                      <div key={option}>
                        {renderCircledText(
                          current.modal === option,
                          option,
                          () => handleSelect(item.id, "modal", option),
                          "56px"
                        )}
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      borderLeft: "3px solid #222",
                      paddingLeft: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      minWidth: "220px",
                    }}
                  >
                    {item.actionOptions.map((option) => (
                      <div key={option}>
                        {renderCircledText(
                          current.action === option,
                          option,
                          () => handleSelect(item.id, "action", option),
                          "170px"
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {isWrong(item) && (
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
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
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