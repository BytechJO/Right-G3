import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23//Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23//Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23//Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23//Ex E 4.svg";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ITEMS = [
  {
    id: 1,
    img: img1,
    correct: "February",
    fixed: true,
  },
  {
    id: 2,
    img: img2,
    correct: "July",
    fixed: false,
  },
  {
    id: 3,
    img: img3,
    correct: "October",
    fixed: false,
  },
  {
    id: 4,
    img: img4,
    correct: "May",
    fixed: false,
  },
];

export default function WB_Months_Page230_QE() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.filter((item) => !item.fixed).every(
      (item) => answers[item.id]
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = ITEMS.length;

    ITEMS.forEach((item) => {
      const userAnswer = item.fixed ? item.correct : answers[item.id];
      if (userAnswer === item.correct) {
        score++;
      }
    });

    setChecked(true);

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const filled = {};

    ITEMS.forEach((item) => {
      if (!item.fixed) {
        filled[item.id] = item.correct;
      }
    });

    setAnswers(filled);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!checked || item.fixed) return false;
    return answers[item.id] !== item.correct;
  };

  const textStyle = {
    fontSize: "34px",
    color: "#222",
    fontWeight: "400",
    lineHeight: "34px",
    display: "flex",
    alignItems: "center",
    margin: 0,
    padding: 0,
  };

  const renderAnswerField = (item) => {
    if (item.fixed) {
      return (
        <div
          style={{
            position: "relative",
            width: "340px",
            minHeight: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "8px",
              borderBottom: "3px solid #333",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "transparent",
            }}
          >
            <span
              style={{
                ...textStyle,
                color: "#222",
              }}
            >
              It’s
            </span>
            <span
              style={{
                ...textStyle,
                color: "#222",
                padding: "0 4px",
              }}
            >
              {item.correct}
            </span>
            <span
              style={{
                ...textStyle,
                color: "#222",
              }}
            >
              .
            </span>
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          position: "relative",
          width: "340px",
          minHeight: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "8px",
            borderBottom: "3px solid #333",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          <span
            style={{
              ...textStyle,
              color: showAns || answers[item.id] ? "#000000" : "#222",
            }}
          >
            It’s
          </span>

          <div
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "190px",
              height: "40px",
            }}
          >
            <select
              value={answers[item.id] || ""}
              disabled={showAns}
              onChange={(e) => handleChange(item.id, e.target.value)}
              style={{
                width: "100%",
                height: "40px",
                border: "none",
                outline: "none",
                background: "transparent",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                textAlign: "center",
                textAlignLast: "center",
                fontSize: "34px",
                lineHeight: "34px",
                color: showAns || answers[item.id] ? "#000000" : "#222",
                fontWeight: "400",
                cursor: showAns ? "default" : "pointer",
                padding: "0 28px 0 8px",
              }}
            >
              <option value="" disabled>
                —
              </option>
              {MONTHS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            {!showAns && (
              <span
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "14px",
                  color: "#666",
                  pointerEvents: "none",
                  lineHeight: 1,
                }}
              >
                ▼
              </span>
            )}
          </div>

          <span
            style={{
              ...textStyle,
              color: showAns || answers[item.id] ? "#000000" : "#222",
            }}
          >
            .
          </span>
        </div>

        {isWrong(item) && (
          <div
            style={{
              position: "absolute",
              top: "-2px",
              right: "-10px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#ef4444",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "700",
              zIndex: 3,
            }}
          >
            ✕
          </div>
        )}
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
          gap: "28px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
          }}
        >
          <span className="WB-ex-A">E</span>
          Read, look, and write.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(360px, 1fr))",
            gap: "48px 80px",
            alignItems: "start",
            justifyItems: "center",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                width: "100%",
                maxWidth: "420px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#222",
                    lineHeight: 1,
                  }}
                >
                  {item.id}
                </span>

                <span
                  style={{
                    fontSize: "30px",
                    color: "#222",
                    lineHeight: 1.2,
                    fontWeight: "400",
                  }}
                >
                  What month is it?
                </span>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={item.img}
                  alt={`month-${item.id}`}
                  style={{
                    width: "220px",
                    height: "220px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2px",
                }}
              >
                {renderAnswerField(item)}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "6px",
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