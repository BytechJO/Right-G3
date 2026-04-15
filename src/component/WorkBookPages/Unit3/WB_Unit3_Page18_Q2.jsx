import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 18/Ex H 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 18/Ex H 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 18/Ex H 3.svg";

const ITEMS = [
  {
    id: 1,
    text: "I have some shorts, and I have some shoes. I don’t have any dresses, but I have some hats.",
    correct: "Shopkeeper 3",
  },
  {
    id: 2,
    text: "I have some shoes, and I have some socks. I have some dresses too. I don’t have any hats.",
    correct: "Shopkeeper 1",
  },
];

const OPTIONS = ["Shopkeeper 1", "Shopkeeper 2", "Shopkeeper 3"];

export default function WB_Unit3_Page18_QH() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
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
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults) return false;
    return answers[item.id] !== item.correct;
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
        <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A">H</span> Look, read, and write.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "22px",
            alignItems: "start",
            justifyItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={img1}
              alt="Shopkeeper 1"
              style={{
                width: "240px",
                height: "170px",
                objectFit: "contain",
                display: "block",
                margin: "0 auto 8px",
              }}
            />
            <div
              style={{
                fontSize: "18px",
                color: "#333",
                fontWeight: "500",
              }}
            >
              Shopkeeper 1
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <img
              src={img2}
              alt="Shopkeeper 2"
              style={{
                width: "240px",
                height: "170px",
                objectFit: "contain",
                display: "block",
                margin: "0 auto 8px",
              }}
            />
            <div
              style={{
                fontSize: "18px",
                color: "#333",
                fontWeight: "500",
              }}
            >
              Shopkeeper 2
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <img
              src={img3}
              alt="Shopkeeper 3"
              style={{
                width: "240px",
                height: "170px",
                objectFit: "contain",
                display: "block",
                margin: "0 auto 8px",
              }}
            />
            <div
              style={{
                fontSize: "18px",
                color: "#333",
                fontWeight: "500",
              }}
            >
              Shopkeeper 3
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "4px",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "34px minmax(0, 1fr) 260px",
                gap: "14px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#222",
                  lineHeight: "1",
                }}
              >
                {item.id}
              </div>

              <div
                style={{
                  fontSize: "18px",
                  lineHeight: "1.5",
                  color: "#333",
                  border: "2px solid #bfbfbf",
                  borderRadius: "16px",
                  padding: "12px 14px",
                  background: "#fff",
                }}
              >
                {item.text}
              </div>

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  minHeight: "48px",
                }}
              >
                <select
                  value={answers[item.id] || ""}
                  onChange={(e) => handleSelect(item.id, e.target.value)}
                  disabled={showAns}
                  style={{
                    width: "100%",
                    fontSize: "20px",
                    color: showAns ? "#000000ff" : "#000000ff",
                    border: "none",
                    borderBottom: isWrong(item)
                      ? "2px solid #000000ff"
                      : "2px solid #444",
                    outline: "none",
                    background: "transparent",
                    padding: "4px 0 6px",
                    appearance: "auto",
                  }}
                >
                  <option value=""></option>
                  {OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {isWrong(item) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-24px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "700",
                      border: "2px solid #fff",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
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
            marginTop: "6px",
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