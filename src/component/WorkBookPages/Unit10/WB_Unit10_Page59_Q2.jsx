import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/10.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/12.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/13.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/14.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    boxMark: "check",
    correctSubject: "He",
    correctModal: "will",
    correctAction: "watch a movie.",
  },
  {
    id: 2,
    img: img2,
    boxMark: "x",
    correctSubject: "She",
    correctModal: "won’t",
    correctAction: "read a book.",
  },
  {
    id: 3,
    img: img3,
    boxMark: "x",
    correctSubject: "He",
    correctModal: "won’t",
    correctAction: "ride a bike.",
  },
  {
    id: 4,
    img: img4,
    boxMark: "check",
    correctSubject: "She",
    correctModal: "will",
    correctAction: "plant a flower.",
  },
];

const SUBJECT_OPTIONS = ["He", "She"];
const MODAL_OPTIONS = ["will", "won’t"];
const ACTION_OPTIONS = [
  "watch a movie.",
  "read a book.",
  "ride a bike.",
  "plant a flower.",
];

export default function WB_Unit8_Page59_QF() {
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
      ans.subject === item.correctSubject &&
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
      (item) =>
        answers[item.id]?.subject &&
        answers[item.id]?.modal &&
        answers[item.id]?.action
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
        subject: item.correctSubject,
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

  const renderCornerMark = (type) => {
    if (type === "check") {
      return (
        <span
          style={{
            color: "#d92525",
            fontSize: "36px",
            fontWeight: "700",
            lineHeight: "1",
            position: "relative",
            top: "-1px",
          }}
        >
          ✓
        </span>
      );
    }

    return (
      <span
        style={{
          color: "#777",
          fontSize: "34px",
          fontWeight: "700",
          lineHeight: "1",
          position: "relative",
          top: "-1px",
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
          gap: "24px",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">F</span>
          Look and write.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "26px 50px",
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
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
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
                      height: "145px",
                      border: "2px solid #b7b7b7",
                      borderRadius: "14px",
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
                        bottom: "6px",
                        right: "6px",
                        width: "34px",
                        height: "34px",
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
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                    paddingLeft: "28px",
                    borderBottom: "2px solid #666",
                    paddingBottom: "4px",
                    minHeight: "42px",
                  }}
                >
                  <select
                    value={current.subject || ""}
                    onChange={(e) =>
                      handleSelect(item.id, "subject", e.target.value)
                    }
                    disabled={showAns}
                    style={{
                      border: "1px solid #cfcfcf",
                      borderRadius: "8px",
                      padding: "4px 8px",
                      fontSize: "17px",
                      outline: "none",
                      backgroundColor: showAns ? "#f3f4f6" : "#fff",
                      color: current.subject ? "#dc2626" : "#444",
                      cursor: showAns ? "default" : "pointer",
                      minWidth: "80px",
                    }}
                  >
                    <option value="">Select</option>
                    {SUBJECT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={current.modal || ""}
                    onChange={(e) =>
                      handleSelect(item.id, "modal", e.target.value)
                    }
                    disabled={showAns}
                    style={{
                      border: "1px solid #cfcfcf",
                      borderRadius: "8px",
                      padding: "4px 8px",
                      fontSize: "17px",
                      outline: "none",
                      backgroundColor: showAns ? "#f3f4f6" : "#fff",
                      color: current.modal ? "#dc2626" : "#444",
                      cursor: showAns ? "default" : "pointer",
                      minWidth: "90px",
                    }}
                  >
                    <option value="">Select</option>
                    {MODAL_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={current.action || ""}
                    onChange={(e) =>
                      handleSelect(item.id, "action", e.target.value)
                    }
                    disabled={showAns}
                    style={{
                      border: "1px solid #cfcfcf",
                      borderRadius: "8px",
                      padding: "4px 8px",
                      fontSize: "17px",
                      outline: "none",
                      backgroundColor: showAns ? "#f3f4f6" : "#fff",
                      color: current.action ? "#dc2626" : "#444",
                      cursor: showAns ? "default" : "pointer",
                      minWidth: "180px",
                    }}
                  >
                    <option value="">Select action</option>
                    {ACTION_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  {isWrong(item) && (
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        backgroundColor: "#ef4444",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "700",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>
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