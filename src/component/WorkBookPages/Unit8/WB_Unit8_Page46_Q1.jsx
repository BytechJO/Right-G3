import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import roomImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/1.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "red";
const CHECK_COLOR = "#ef4444";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
const ITEMS = [
  { id: 1, text: "Did Grandma have a radio?", correct: "yes" },
  { id: 2, text: "Did she have a TV?", correct: "no" },
  { id: 3, text: "Did she have a cat?", correct: "no" },
  { id: 4, text: "Did she have a bird?", correct: "no" },
  { id: 5, text: "Did she have a lamp?", correct: "yes" },
  { id: 6, text: "Did she have a phone?", correct: "no" },
  { id: 7, text: "Did she have a rug?", correct: "yes" },
  { id: 8, text: "Did she have a mirror?", correct: "no" },
];

export default function WB_YesNo_PageC() {
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

  const renderCheckbox = (item, value) => {
    const selected = answers[item.id] === value;
    const wrong = isWrong(item) && selected;

    return (
      <div
        onClick={() => handleSelect(item.id, value)}
        style={{
          position: "relative",
          width: "40px",
          height: "40px",
          border: wrong ? "2px solid red":`1px solid ${BORDER_COLOR}`,
          borderRadius: "clamp(5px,0.6vw,8px)",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: showAns||showResults ? "default" : "pointer",
          boxSizing: "border-box",
          flexShrink: 0,
          transition: "border-color 0.2s",
        }}
      >
        {selected && <img src={trueIcon} style={{ height: "25px" }} />}

        {/* wrong badge — يسار أعلى */}
        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-7px",
              right: "-10px",
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
          gap: "30px",
        }}
      >
        {/* Title */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">C</span>
          Look and write<strong className="text-red-600"> ✓</strong> for{" "}
          <strong className="text-blue-900">Yes</strong> or{" "}
          <strong className="text-blue-900">No</strong>.
        </h1>

        {/* Main layout: image LEFT | table RIGHT */}
        <div
          style={{
            display: "flex",
            gap: "clamp(16px,2.5vw,32px)",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Room image */}
         
            <img
              src={roomImg}
              alt="grandma room"
              style={{
                width: "auto",
                height: "390px",
                display: "block",
                userSelect: "none",
              }}
            />
       

          {/* Questions table */}
          <div style={{ minWidth: 0 
}}>
            {/* Header */}
            <div
              style={{
                display:"flex",
                justifyContent:"flex-end",
                gap: "35px",
                marginBottom: "clamp(8px,1vw,12px)",
                paddingRight: "clamp(4px,0.5vw,8px)",
              }}
            >
              <div />
              <div
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#111",
                }}
              >
                Yes
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#111",
                }}
              >
                No
              </div>
            </div>

            {/* Rows */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",height:"370px",
                justifyContent:"space-between",
                // gap: "9px",
              }}
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "clamp(6px,1vw,12px)",
                    alignItems: "center",
                  }}
                >
                  {/* sentence */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(6px,0.8vw,12px)",
                      width: 300,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: 500,
                        color: "#111",
                        lineHeight: 1,
                        flexShrink: 0,
                        minWidth: "clamp(12px,1.6vw,22px)",
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

                  {/* Yes checkbox */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {renderCheckbox(item, "yes")}
                  </div>

                  {/* No checkbox */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {renderCheckbox(item, "no")}
                  </div>
                </div>
              ))}
            </div>
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
