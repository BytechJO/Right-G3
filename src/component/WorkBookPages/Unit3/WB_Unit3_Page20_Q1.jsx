import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex A  1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex A  2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex A  3.svg";

const OPTIONS = ["ch", "tch", "sh"];

const SENTENCES = [
  {
    id: 1,
    parts: [
      "The ",
      "icken is eating a pea",
      " at the bea",
      ".",
    ],
    answers: ["ch", "ch", "ch"],
  },
  {
    id: 2,
    parts: [
      "He wants a ",
      "ell. He doesn’t want a wa",
      ".",
    ],
    answers: ["sh", "ch"],
  },
  {
    id: 3,
    parts: [
      "There is fi",
      " in the ki",
      "en.",
    ],
    answers: ["sh", "tch"],
  },
];

const IMAGES = [
  { id: 1, img: img1 }, // top image
  { id: 2, img: img2 }, // middle image
  { id: 3, img: img3 }, // bottom image
];

const correctImageAnswers = {
  1: 2, // top image = sentence 2
  2: 3, // middle image = sentence 3
  3: 1, // bottom image = sentence 1
};

const NUMBERS = [1, 2, 3];

export default function WB_Phonics_Page227_QA() {
  const [selectAnswers, setSelectAnswers] = useState({});
  const [imageAnswers, setImageAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedNumbers = Object.values(imageAnswers);

  const handleSelectChange = (key, value) => {
    if (showAns) return;
    setSelectAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    setDraggedNumber(num);
  };

  const handleDrop = (imageId) => {
    if (showAns || draggedNumber === null) return;

    setImageAnswers((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((key) => {
        if (updated[key] === draggedNumber) {
          delete updated[key];
        }
      });

      updated[imageId] = draggedNumber;
      return updated;
    });

    setDraggedNumber(null);
  };

  const getTotalBlanks = () =>
    SENTENCES.reduce((acc, s) => acc + s.answers.length, 0);

  const getScore = () => {
    let score = 0;

    SENTENCES.forEach((sentence) => {
      sentence.answers.forEach((ans, idx) => {
        const key = `s${sentence.id}-b${idx}`;
        if (selectAnswers[key] === ans) score++;
      });
    });

    IMAGES.forEach((img) => {
      if (imageAnswers[img.id] === correctImageAnswers[img.id]) score++;
    });

    return score;
  };

  const handleCheck = () => {
    if (showAns) return;

    const allSelectsAnswered = SENTENCES.every((sentence) =>
      sentence.answers.every((_, idx) => selectAnswers[`s${sentence.id}-b${idx}`])
    );

    const allImagesAnswered = IMAGES.every((img) => imageAnswers[img.id]);

    if (!allSelectsAnswered || !allImagesAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const total = getTotalBlanks() + IMAGES.length;
    const score = getScore();

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
    const filledSelects = {};

    SENTENCES.forEach((sentence) => {
      sentence.answers.forEach((ans, idx) => {
        filledSelects[`s${sentence.id}-b${idx}`] = ans;
      });
    });

    setSelectAnswers(filledSelects);
    setImageAnswers(correctImageAnswers);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelectAnswers({});
    setImageAnswers({});
    setDraggedNumber(null);
    setChecked(false);
    setShowAns(false);
  };

  const isSelectWrong = (sentenceId, blankIndex, correctValue) => {
    if (!checked) return false;
    return selectAnswers[`s${sentenceId}-b${blankIndex}`] !== correctValue;
  };

  const isImageWrong = (id) => {
    if (!checked) return false;
    return imageAnswers[id] !== correctImageAnswers[id];
  };

  const renderSelect = (sentenceId, blankIndex, correctValue) => {
    const key = `s${sentenceId}-b${blankIndex}`;
    const value = selectAnswers[key] || "";
    const wrong = isSelectWrong(sentenceId, blankIndex, correctValue);

    return (
      <span
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          margin: "0 4px",
        }}
      >
        <select
          value={value}
          disabled={showAns}
          onChange={(e) => handleSelectChange(key, e.target.value)}
          style={{
            minWidth: "78px",
            height: "42px",
            fontSize: "28px",
            fontWeight: "500",
            color: showAns ? "#000000ff" : value ? "#000000ff" : "#222",
            border: "none",
            borderBottom: "3px solid #6b7280",
            outline: "none",
            background: "transparent",
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            textAlign: "center",
            padding: "0 22px 2px 6px",
            cursor: showAns ? "default" : "pointer",
            lineHeight: 1,
          }}
        >
          <option value="" disabled>
            —
          </option>
          {OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {!showAns && (
          <span
            style={{
              position: "absolute",
              right: "4px",
              bottom: "10px",
              fontSize: "14px",
              color: "#666",
              pointerEvents: "none",
            }}
          >
            ▼
          </span>
        )}

        {wrong && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
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
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            ✕
          </span>
        )}
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
          <span className="WB-ex-A">A</span>Write ch, tch, or sh. Then number the pictures
          .
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 260px",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {/* left side sentences */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "62px",
              paddingTop: "18px",
            }}
          >
            {/* sentence 1 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#222",
                  minWidth: "24px",
                }}
              >
                1
              </span>

              <div
                style={{
                  fontSize: "28px",
                  color: "#222",
                  lineHeight: "1.7",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span>{SENTENCES[0].parts[0]}</span>
                {renderSelect(1, 0, "ch")}
                <span>{SENTENCES[0].parts[1]}</span>
                {renderSelect(1, 1, "ch")}
                <span>{SENTENCES[0].parts[2]}</span>
                {renderSelect(1, 2, "ch")}
                <span>{SENTENCES[0].parts[3]}</span>
              </div>
            </div>

            {/* sentence 2 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#222",
                  minWidth: "24px",
                }}
              >
                2
              </span>

              <div
                style={{
                  fontSize: "28px",
                  color: "#222",
                  lineHeight: "1.7",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span>{SENTENCES[1].parts[0]}</span>
                {renderSelect(2, 0, "sh")}
                <span>{SENTENCES[1].parts[1]}</span>
                {renderSelect(2, 1, "ch")}
                <span>{SENTENCES[1].parts[2]}</span>
              </div>
            </div>

            {/* sentence 3 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#222",
                  minWidth: "24px",
                }}
              >
                3
              </span>

              <div
                style={{
                  fontSize: "28px",
                  color: "#222",
                  lineHeight: "1.7",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span>{SENTENCES[2].parts[0]}</span>
                {renderSelect(3, 0, "sh")}
                <span>{SENTENCES[2].parts[1]}</span>
                {renderSelect(3, 1, "tch")}
                <span>{SENTENCES[2].parts[2]}</span>
              </div>
            </div>
          </div>

          {/* right side images */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              alignItems: "center",
            }}
          >
            {IMAGES.map((item) => (
              <div
                key={item.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(item.id)}
                style={{
                  position: "relative",
                  width: "230px",
                  height: "145px",
                  border: "3px solid #a3a3a3",
                  borderRadius: "18px",
                  background: "#fff",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={item.img}
                  alt={`phonics-${item.id}`}
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
                    right: "0",
                    bottom: "0",
                    width: "38px",
                    height: "38px",
                    borderTop: "3px solid #a3a3a3",
                    borderLeft: "3px solid #a3a3a3",
                    borderTopLeftRadius: "10px",
                    background: "#f8f8f8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    fontWeight: "700",
                    color: showAns || imageAnswers[item.id] ? "#111" : "#999",
                  }}
                >
                  {imageAnswers[item.id] || ""}
                </div>

                {isImageWrong(item.id) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "6px",
                      left: "6px",
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
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* draggable numbers */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            marginTop: "4px",
          }}
        >
          {NUMBERS.map((num) => {
            const disabled = usedNumbers.includes(num);

            return (
              <div
                key={num}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(num)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: disabled ? "#d1d5db" : "#f39b42",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "22px",
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

        {/* buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "6px",
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