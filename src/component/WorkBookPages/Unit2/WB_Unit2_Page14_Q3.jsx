import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 19.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 20.svg";
import img2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 21.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 22.svg";
import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 23.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 24.svg";
import img4a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 25.svg";
import img4b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 26.svg";


const RED_COLOR = "#d62828";
const BORDER_COLOR = "#a8a8a8";
const WRONG_COLOR = "#ef4444";
const TEXT_COLOR = "#111";

const ITEMS = [
  {
    id: 1,
    leftImg: img1a,
    rightImg: img1b,
    correct: "x",
  },
  {
    id: 2,
    leftImg: img2a,
    rightImg: img2b,
    correct: "check",
  },
  {
    id: 3,
    leftImg: img3a,
    rightImg: img3b,
    correct: "x",
  },
  {
    id: 4,
    leftImg: img4a,
    rightImg: img4b,
    correct: "check",
  },
];

const styles = {
  pageWrap: {
    width: "100%",
  },

  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "clamp(14px, 1.8vw, 24px)",
    width: "100%",
    alignItems: "start",
  },

  cardWrap: {
    display: "flex",
    alignItems: "flex-start",
    gap: "clamp(8px, 1vw, 12px)",
    minWidth: 0,
    width: "100%",
  },

  number: {
    fontSize: "clamp(20px, 2.2vw, 34px)",
    fontWeight: 700,
    color: TEXT_COLOR,
    lineHeight: 1,
    minWidth: "clamp(18px, 2vw, 28px)",
    paddingTop: "clamp(8px, 1vw, 12px)",
    flexShrink: 0,
  },

  card: {
    position: "relative",
    flex: 1,
    minWidth: 0,
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: "clamp(16px, 1.6vw, 24px)",
    background: "#fff",
    overflow: "visible",
    aspectRatio: "1.16 / 1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    boxSizing: "border-box",
  },

  innerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    width: "100%",
    height: "100%",
  },

  imageCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(10px, 1.5vw, 18px)",
    boxSizing: "border-box",
    minWidth: 0,
    minHeight: 0,
  },

  dividerCell: {
    borderRight: `2px solid ${BORDER_COLOR}`,
  },

  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",
    userSelect: "none",
  },

  answerBox: {
    position: "absolute",
    left: "50%",
    bottom: "clamp(-14px, -1.1vw, -8px)",
    transform: "translateX(-50%)",
    width: "clamp(44px, 5vw, 58px)",
    height: "clamp(34px, 4vw, 46px)",
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: "clamp(6px, 0.8vw, 10px)",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxSizing: "border-box",
    zIndex: 2,
  },

  mark: {
    fontSize: "clamp(26px, 3.2vw, 52px)",
    fontWeight: 700,
    color: RED_COLOR,
    lineHeight: 1,
    transform: "translateY(-1px)",
    userSelect: "none",
  },

  wrongBadge: {
    position: "absolute",
    top: "clamp(-8px, -1vw, -4px)",
    right: "clamp(-8px, -1vw, -4px)",
    width: "clamp(18px, 2vw, 24px)",
    height: "clamp(18px, 2vw, 24px)",
    borderRadius: "50%",
    backgroundColor: WRONG_COLOR,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(10px, 1vw, 12px)",
    fontWeight: 700,
    border: "2px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
    zIndex: 4,
  },

  hintWrap: {
    display: "flex",
    justifyContent: "center",
    gap: "clamp(14px, 1.6vw, 18px)",
    marginTop: "clamp(16px, 2vw, 24px)",
  },

  hintBtn: {
    width: "clamp(48px, 5vw, 62px)",
    height: "clamp(48px, 5vw, 62px)",
    borderRadius: "999px",
    border: `2px solid #cfcfcf`,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
  },
};

export default function WB_Unit1_Page10_QC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const getNextValue = (current) => {
    if (!current) return "check";
    if (current === "check") return "x";
    return "";
  };

  const handleSelect = (id) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: getNextValue(prev[id]),
    }));

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score += 1;
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

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return answers[item.id] !== item.correct;
  };

  const renderMark = (value) => {
    if (value === "check") return <span style={styles.mark}>✓</span>;
    if (value === "x") return <span style={styles.mark}>✕</span>;
    return null;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-c-root * {
          box-sizing: border-box !important;
        }

        @media (max-width: 950px) {
          .wb-c-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            row-gap: clamp(20px, 3vw, 28px) !important;
          }
        }

        @media (max-width: 560px) {
          .wb-c-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div
        className="div-forall wb-c-root"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
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
            flexWrap: "wrap",
          }}
        >
          <span className="WB-ex-A">C</span>
          Do they both have the same <b>u</b> sound? Listen and write ✓ or ✕.
        </h1>

        <div style={styles.pageWrap}>
          <div className="wb-c-grid" style={styles.cardsGrid}>
            {ITEMS.map((item) => (
              <div key={item.id} style={styles.cardWrap}>
                <div style={styles.number}>{item.id}</div>

                <div style={styles.card}>
                  <div style={styles.innerGrid}>
                    <div style={{ ...styles.imageCell, ...styles.dividerCell }}>
                      <img
                        src={item.leftImg}
                        alt={`left-${item.id}`}
                        style={styles.image}
                      />
                    </div>

                    <div style={styles.imageCell}>
                      <img
                        src={item.rightImg}
                        alt={`right-${item.id}`}
                        style={styles.image}
                      />
                    </div>
                  </div>

                  <div
                    onClick={() => handleSelect(item.id)}
                    style={{
                      ...styles.answerBox,
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    {renderMark(answers[item.id])}
                    {isWrong(item) && <div style={styles.wrongBadge}>✕</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.hintWrap}>
            <div style={styles.hintBtn}>{renderMark("check")}</div>
            <div style={styles.hintBtn}>{renderMark("x")}</div>
          </div>
        </div>

        <div style={styles.buttonsWrap}>
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