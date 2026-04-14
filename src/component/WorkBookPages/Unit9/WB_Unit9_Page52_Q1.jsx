import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import girlImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/1.svg";
import boy1Img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/2.svg";
import boy2Img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/3.svg";

const PEOPLE = [
  {
    id: 1,
    img: girlImg,
    lines: [
      "She was in the swimming pool this morning.",
      "She is in the post office now.",
    ],
  },
  {
    id: 2,
    img: boy1Img,
    lines: [
      "He is at the gym now.",
      "He was at the bus stop this morning.",
    ],
  },
  {
    id: 3,
    img: boy2Img,
    lines: [
      "He was at the bakery this morning.",
      "He is on the playground now.",
    ],
  },
];

const DRAG_ITEMS = [
  "at the swimming pool",
  "at the bus stop",
  "at the bakery",
  "at the post office",
  "at the gym",
  "on the playground",
];

const CORRECT_ANSWERS = {
  "morning-1": "at the swimming pool",
  "morning-2": "at the bus stop",
  "morning-3": "at the bakery",
  "now-1": "at the post office",
  "now-2": "at the gym",
  "now-3": "on the playground",
};

export default function WB_Unit8_Page52_QC() {
  const [answers, setAnswers] = useState({});
  const [draggedText, setDraggedText] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedValues = Object.values(answers);

  const handleDragStart = (value) => {
    if (showAns || usedValues.includes(value)) return;
    setDraggedText(value);
  };

  const handleDrop = (cellKey) => {
    if (showAns || !draggedText) return;

    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key] === draggedText) {
        delete newAnswers[key];
      }
    });

    newAnswers[cellKey] = draggedText;
    setAnswers(newAnswers);
    setDraggedText(null);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allFilled = Object.keys(CORRECT_ANSWERS).every((key) => answers[key]);

    if (!allFilled) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    Object.keys(CORRECT_ANSWERS).forEach((key) => {
      if (answers[key] === CORRECT_ANSWERS[key]) {
        score++;
      }
    });

    setShowResults(true);

    const total = Object.keys(CORRECT_ANSWERS).length;

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    setAnswers(CORRECT_ANSWERS);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedText(null);
    setShowResults(false);
    setShowAns(false);
  };

  const isWrongCell = (cellKey) => {
    if (!showResults) return false;
    if (!answers[cellKey]) return false;
    return answers[cellKey] !== CORRECT_ANSWERS[cellKey];
  };

  const renderDropCell = (cellKey) => {
    const value = answers[cellKey];

    return (
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(cellKey)}
        style={{
          position: "relative",
          minHeight: "58px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "6px 10px",
          fontSize: "18px",
          lineHeight: "1.3",
          color: value ? "#d92d20" : "#999",
          backgroundColor: "transparent",
          borderBottom: "2px solid #666",
          boxSizing: "border-box",
        }}
      >
        {value || ""}

        {isWrongCell(cellKey) && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-8px",
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
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
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
          gap: "18px",
          width: "100%",
          maxWidth: "980px",
          margin: "0 auto",
          padding: "10px 18px 20px 18px",
          boxSizing: "border-box",
        }}
      >
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0 }}
        >
          <span className="WB-ex-A">C</span> Read and write in the chart.
        </h1>

        {/* الجمل فوق */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            marginBottom: "6px",
          }}
        >
          {PEOPLE.map((person) => (
            <div
              key={person.id}
              style={{
                display: "grid",
                gridTemplateColumns: "28px 70px 1fr",
                alignItems: "center",
                columnGap: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#222",
                }}
              >
                {person.id}
              </div>

              <img
                src={person.img}
                alt={`person-${person.id}`}
                style={{
                  width: "56px",
                  height: "74px",
                  objectFit: "contain",
                  display: "block",
                }}
              />

              <div
                style={{
                  fontSize: "18px",
                  lineHeight: "1.25",
                  color: "#222",
                }}
              >
                <div>{person.lines[0]}</div>
                <div>{person.lines[1]}</div>
              </div>
            </div>
          ))}
        </div>

        {/* بنك السحب */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "8px",
          }}
        >
          {DRAG_ITEMS.map((item, index) => {
            const disabled = usedValues.includes(item);

            return (
              <div
                key={`${item}-${index}`}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(item)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "10px",
                  backgroundColor: disabled ? "#d1d5db" : "#ef4444",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: disabled ? "not-allowed" : "grab",
                  opacity: disabled ? 0.5 : 1,
                  userSelect: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                }}
              >
                {item}
              </div>
            );
          })}
        </div>

        {/* الجدول */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "760px",
              border: "2px solid #9ca3af",
              borderRadius: "18px",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            {/* الصف الأول */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "130px 1fr 1fr 1fr",
                borderBottom: "2px solid #9ca3af",
              }}
            >
              <div
                style={{
                  minHeight: "86px",
                  borderRight: "2px solid #9ca3af",
                }}
              />
              {PEOPLE.map((person, index) => (
                <div
                  key={person.id}
                  style={{
                    minHeight: "86px",
                    borderRight: index !== PEOPLE.length - 1 ? "2px solid #9ca3af" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={person.img}
                    alt={`head-${person.id}`}
                    style={{
                      width: "56px",
                      height: "68px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* صف Morning */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "130px 1fr 1fr 1fr",
                borderBottom: "2px solid #9ca3af",
              }}
            >
              <div
                style={{
                  minHeight: "82px",
                  borderRight: "2px solid #9ca3af",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  color: "#222",
                }}
              >
                Morning
              </div>

              <div style={{ borderRight: "2px solid #9ca3af" }}>
                {renderDropCell("morning-1")}
              </div>

              <div style={{ borderRight: "2px solid #9ca3af" }}>
                {renderDropCell("morning-2")}
              </div>

              <div>{renderDropCell("morning-3")}</div>
            </div>

            {/* صف Now */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "130px 1fr 1fr 1fr",
              }}
            >
              <div
                style={{
                  minHeight: "82px",
                  borderRight: "2px solid #9ca3af",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  color: "#222",
                }}
              >
                Now
              </div>

              <div style={{ borderRight: "2px solid #9ca3af" }}>
                {renderDropCell("now-1")}
              </div>

              <div style={{ borderRight: "2px solid #9ca3af" }}>
                {renderDropCell("now-2")}
              </div>

              <div>{renderDropCell("now-3")}</div>
            </div>
          </div>
        </div>

        {/* الأزرار */}
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