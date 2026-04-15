import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 5.svg";

const IMAGES = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
];

const SENTENCES = [
  {
    id: 1,
    text: "It is January. It is cold. I made a snowman.",
    correct: 2,
  },
  {
    id: 2,
    text: "It is June. It is sunny. They are in the park.",
    correct: 3,
  },
  {
    id: 3,
    text: "It is October. It is windy. We wear jackets.",
    correct: 5,
  },
  {
    id: 4,
    text: "It is April. It is rainy. We are under our umbrellas.",
    correct: 4,
  },
  {
    id: 5,
    text: "It is August. It is hot. They are at the beach.",
    correct: 1,
  },
];

const NUMBERS = [1, 2, 3, 4, 5];

export default function WB_Unit_Months_Page232_QH() {
  const [answers, setAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedNumbers = Object.values(answers);

  const handleDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    setDraggedNumber(num);
  };

  const handleDrop = (sentenceId) => {
    if (showAns || draggedNumber === null) return;

    setAnswers((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((key) => {
        if (updated[key] === draggedNumber) {
          delete updated[key];
        }
      });

      updated[sentenceId] = draggedNumber;
      return updated;
    });

    setDraggedNumber(null);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = SENTENCES.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    SENTENCES.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    setChecked(true);

    if (score === SENTENCES.length) {
      ValidationAlert.success(`Score: ${score} / ${SENTENCES.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${SENTENCES.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${SENTENCES.length}`);
    }
  };

  const handleShowAnswer = () => {
    const filled = {};
    SENTENCES.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedNumber(null);
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (sentenceId) => {
    if (!checked) return false;
    const sentence = SENTENCES.find((item) => item.id === sentenceId);
    return answers[sentenceId] !== sentence.correct;
  };

  const renderNumberBox = (sentenceId) => {
    const value = answers[sentenceId] || "";

    return (
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(sentenceId)}
        style={{
          width: "42px",
          height: "42px",
          border: "2px solid #a8a8a8",
          borderRadius: "8px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          fontWeight: "500",
          color: value ? "#000000ff" : "#666",
          position: "relative",
          flexShrink: 0,
          boxSizing: "border-box",
        }}
      >
        {value}

        {isWrong(sentenceId) && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#ef4444",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: "700",
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  const renderImageCard = (item) => (
    <div
      key={item.id}
      style={{
        position: "relative",
        width: item.id <= 2 ? "200px" : "180px",
        height: item.id <= 2 ? "148px" : "160px",
        border: "2px solid #a8a8a8",
        borderRadius: "14px",
        overflow: "visible",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={item.img}
        alt={`match-${item.id}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "14px",
          display: "block",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-12px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: "2px solid #888",
          background: "#f7f7f7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: "700",
          color: "#444",
          boxSizing: "border-box",
        }}
      >
        {item.id}
      </div>
    </div>
  );

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
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span className="WB-ex-A">H</span>
          Look, read, and match.
        </h1>

        {/* numbers to drag */}
        <div style={{ display: "flex",justifyContent: "center",gap: "14px", marginTop: "-6px",}} >
          {NUMBERS.map((num) => {
            const disabled = usedNumbers.includes(num);

            return (
              <div
                key={num}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(num)}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  backgroundColor: disabled ? "#d1d5db" : "#f39b42",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "21px",
                  cursor: disabled || showAns ? "not-allowed" : "grab",
                  opacity: disabled ? 0.55 : 1,
                  userSelect: "none",
                  boxShadow: disabled ? "none" : "0 2px 8px rgba(0,0,0,0.12)",
                }}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* images */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "42px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "34px",
              flexWrap: "wrap",
            }}
          >
            {IMAGES.slice(0, 2).map(renderImageCard)}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "34px",
              flexWrap: "wrap",
            }}
          >
            {IMAGES.slice(2).map(renderImageCard)}
          </div>
        </div>

        {/* sentence list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "760px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {SENTENCES.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
              }}
            >
              {renderNumberBox(item.id)}

              <div
                style={{
                  fontSize: "18px",
                  lineHeight: "1.5",
                  color: "#222",
                  paddingTop: "4px",
                }}
              >
                {item.text}
              </div>
            </div>
          ))}
        </div>

        {/* buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
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