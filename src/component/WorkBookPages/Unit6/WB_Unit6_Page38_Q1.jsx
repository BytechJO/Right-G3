import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import roomImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/A.1.svg";
const BORDER_COLOR = "#e0e0e0";
const WRONG_COLOR = "#ef4444";
const CHECK_COLOR = "#ef4444";
import trueIcon from "../../../assets/imgs/true.svg";
const ITEMS = [
  { id: 1, text: "The cat is playing with a flag.", correct: "false" },
  { id: 2, text: "The man is sleeping.", correct: "true" },
  { id: 3, text: "There are flowers on the chair.", correct: "false" },
  { id: 4, text: "There are plates on the table.", correct: "true" },
];

export default function WB_TrueFalse_PageA() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns||showResults) return;
    setAnswers((prev) => ({
      ...prev,
      [id]: prev[id] === value ? undefined : value,
    }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns||showResults) return;
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

  const isWrong = (item) =>
    showResults && !showAns && answers[item.id] !== item.correct;

  // ── Checkbox component ──
  const renderCheckbox = (item, value) => {
    const selected = answers[item.id] === value;
    const wrong = isWrong(item) && selected;
    const showCheck = selected;

    return (
      <div
        onClick={() => handleSelect(item.id, value)}
        style={{
          position: "relative",
          width: "45px",
          height: "45px",
          border: wrong ? `2px solid ${ WRONG_COLOR}` : "1px solid gray",
          borderRadius: "clamp(5px,0.6vw,8px)",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: showAns ||showResults? "default" : "pointer",
          boxSizing: "border-box",
          flexShrink: 0,
          transition: "border-color 0.2s",
        }}
      >
        {/* checkmark */}
        {showCheck && (
          <span
            style={{
              fontSize: "clamp(18px,2.8vw,36px)",
              fontWeight: 900,
              color: wrong ? WRONG_COLOR : CHECK_COLOR,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            <img src={trueIcon} style={{ height: "25px" }} />
          </span>
        )}

        {/* wrong badge */}
        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-7px",
              right: "-7px",
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
              zIndex: 5,
              pointerEvents: "none",
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
       
          gap: "23px",
    
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
         
        >
          <span className="WB-ex-A">A</span>
          Look, read, and write <strong style={{ color: "red" }}>✓</strong> for{" "}
          <strong style={{ fontWeight: 900,color: "navy" }}>true</strong> or{" "}
          <strong style={{ fontWeight: 900,color: "navy" }}>false</strong>.
        </h1>

        {/* Room image */}
        
          <img
            src={roomImg}
            alt="room"
            style={{
              width: "auto",
              height: "190px",
            
            }}
          />
       

        {/* Table: sentences + True + False */}
        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr clamp(60px,10vw,120px) clamp(60px,10vw,120px)",
              gap: "clamp(8px,1vw,14px)",
              marginBottom: "clamp(8px,1vw,12px)",
              paddingRight: "clamp(4px,0.5vw,8px)",
            }}
          >
            <div />
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                // fontWeight: 700,
                color: "#111",
              }}
            >
              True
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                // fontWeight: 700,
                color: "#111",
              }}
            >
              False
            </div>
          </div>

          {/* Item rows */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {ITEMS.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr clamp(60px,10vw,120px) clamp(60px,10vw,120px)",
                  gap: "clamp(8px,1vw,14px)",
                  alignItems: "center",
                }}
              >
                {/* sentence */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 500,
                      color: "#111",
                      lineHeight: 1,
                      flexShrink: 0,
                      minWidth: "clamp(14px,1.8vw,24px)",
                    }}
                  >
                    {item.id}
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      // fontWeight: 500,
                      color: "#111",
                      lineHeight: 1.35,
                      wordBreak: "break-word",
                      transition: "color 0.2s",
                    }}
                  >
                    {item.text}
                  </span>
                </div>

                {/* True checkbox */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {renderCheckbox(item, "true")}
                </div>

                {/* False checkbox */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {renderCheckbox(item, "false")}
                </div>
              </div>
            ))}
          </div>
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
