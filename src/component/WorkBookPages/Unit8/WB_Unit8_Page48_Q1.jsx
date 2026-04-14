import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// الصور
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/4.svg";
import img5 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/6.svg";
import img7 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/7.svg";

const ITEMS = [
  { id: 1, img: img1, pattern: "g■rd◆n", answer: "garden" },
  { id: 2, img: img2, pattern: "r▲▲f", answer: "roof" },
  { id: 3, img: img3, pattern: "ch★mn◆y", answer: "chimney" },
  { id: 4, img: img4, pattern: "n◆st", answer: "nest" },
  { id: 5, img: img5, pattern: "sw★ng", answer: "swing" },
  { id: 6, img: img6, pattern: "w■ll", answer: "wall" },
  { id: 7, img: img7, pattern: "fl▲▲r", answer: "floor" },
];

const WORD_BANK = [
  "garden",
  "roof",
  "chimney",
  "nest",
  "swing",
  "wall",
  "floor",
];

const SYMBOLS = [
  { symbol: "■", letter: "a" },
  { symbol: "▲", letter: "o" },
  { symbol: "◆", letter: "e" },
  { symbol: "★", letter: "i" },
];

export default function WB_Unit8_Page47_QG() {
  const [answers, setAnswers] = useState({});
  const [draggedWord, setDraggedWord] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedWords = Object.values(answers);

  const handleDragStart = (word) => {
    if (showAns || usedWords.includes(word)) return;
    setDraggedWord(word);
  };

  const handleDrop = (id) => {
    if (showAns || !draggedWord) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: draggedWord,
    }));

    setDraggedWord(null);
  };

  const getItemResult = (item) => {
    return answers[item.id] === item.answer;
  };

  const isWrong = (item) => {
    if (!showResults) return false;
    if (!answers[item.id]) return false;
    return !getItemResult(item);
  };

  const checkAnswers = () => {
    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    ITEMS.forEach((item) => {
      if (getItemResult(item)) score++;
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
      correctMap[item.id] = item.answer;
    });

    setAnswers(correctMap);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setDraggedWord(null);
    setShowResults(false);
    setShowAns(false);
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">G</span>
          Find the missing letters. Write the words.
        </h1>

        {/* بنك الكلمات */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {WORD_BANK.map((word) => {
            const disabled = usedWords.includes(word);

            return (
              <div
                key={word}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(word)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "10px",
                  backgroundColor: disabled ? "#d1d5db" : "#ef4444",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: disabled ? "not-allowed" : "grab",
                  opacity: disabled ? 0.5 : 1,
                  userSelect: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                }}
              >
                {word}
              </div>
            );
          })}
        </div>

        {/* المحتوى الرئيسي */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "26px 22px",
            alignItems: "start",
          }}
        >
          {ITEMS.slice(0, 4).map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  alignSelf: "flex-start",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#222",
                }}
              >
                {item.id}
              </div>

              <div
                style={{
                  width: "180px",
                  height: "150px",
                  border: "2px solid #a7a7a7",
                  borderRadius: "18px",
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.img}
                  alt={`item-${item.id}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              <div
                style={{
                  fontSize: "22px",
                  color: "#222",
                  letterSpacing: "1px",
                  minHeight: "28px",
                }}
              >
                {item.pattern}
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(item.id)}
                style={{
                  position: "relative",
                  width: "210px",
                  minHeight: "38px",
                  borderBottom: "2px solid #444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: answers[item.id] ? "#dc2626" : "#9ca3af",
                  fontSize: "20px",
                  lineHeight: "1.4",
                }}
              >
                {answers[item.id] || ""}

                {isWrong(item) && (
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
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "26px 22px",
            alignItems: "start",
          }}
        >
          {ITEMS.slice(4).map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  alignSelf: "flex-start",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#222",
                }}
              >
                {item.id}
              </div>

              <div
                style={{
                  width: "180px",
                  height: "150px",
                  border: "2px solid #a7a7a7",
                  borderRadius: "18px",
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.img}
                  alt={`item-${item.id}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              <div
                style={{
                  fontSize: "22px",
                  color: "#222",
                  letterSpacing: "1px",
                  minHeight: "28px",
                }}
              >
                {item.pattern}
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(item.id)}
                style={{
                  position: "relative",
                  width: "210px",
                  minHeight: "38px",
                  borderBottom: "2px solid #444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: answers[item.id] ? "#dc2626" : "#9ca3af",
                  fontSize: "20px",
                  lineHeight: "1.4",
                }}
              >
                {answers[item.id] || ""}

                {isWrong(item) && (
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
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* legend */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              justifyContent: "center",
              paddingTop: "30px",
            }}
          >
            {SYMBOLS.map((item) => (
              <div
                key={item.symbol}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "22px",
                  color: "#222",
                }}
              >
                <span style={{ minWidth: "28px", textAlign: "center" }}>
                  {item.symbol}
                </span>
                <span>=</span>
                <div
                  style={{
                    minWidth: "80px",
                    borderBottom: "2px solid #444",
                    color: "#222",
                    textAlign: "center",
                    lineHeight: "1.2",
                  }}
                >
                  {item.letter}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
}