import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import tuneImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 1.svg";
import gumImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 2.svg";
import runImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 3.svg";
import cupImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 7.svg";
import busImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 6.svg";
import tubeImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 5.svg";
import upImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 4.svg";
import sunImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 8.svg";
import sueImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 9.svg";
import juneImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 11.svg";
import glueImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 10.svg";

const CIRCLE_COLOR = "red";
const BORDER_COLOR = "#a9a9a9";
const WRONG_COLOR = "red";
const TEXT_COLOR = "#111";

const SECTIONS = [
  {
    id: "short-u",
    title: "short u",
    items: [
      { id: "s1", img: tuneImg, text: "tune", correct: false },
      { id: "s2", img: gumImg, text: "gum", correct: true },
      { id: "s3", img: runImg, text: "run", correct: true },
      { id: "s4", img: cupImg, text: "cup", correct: false },
      { id: "s5", img: busImg, text: "bus", falseText: false, correct: false },
      { id: "s6", img: tubeImg, text: "tube", correct: false },
      { id: "s7", img: upImg, text: "up", correct: true },
    ],
  },
  {
    id: "long-u",
    title: "long u",
    items: [
      { id: "l1", img: sunImg, text: "sun", correct: false },
      { id: "l2", img: tuneImg, text: "tune", correct: true },
      { id: "l3", img: sueImg, text: "sue", correct: true },
      { id: "l4", img: upImg, text: "up", correct: false },
      { id: "l5", img: runImg, text: "run", correct: false },
      { id: "l6", img: juneImg, text: "June", correct: true },
      { id: "l7", img: glueImg, text: "glue", correct: true },
    ],
  },
];

const styles = {
  pageWrap: {
    width: "100%",
  },

  sectionsWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "clamp(16px, 2vw, 34px)",
    width: "100%",
  },

  sectionBox: {
    position: "relative",
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: "clamp(12px, 1.4vw, 18px)",
    background: "#fff",
    padding:
      "clamp(18px, 2.3vw, 30px) clamp(12px, 1.6vw, 18px) clamp(12px, 1.6vw, 18px)",
    boxSizing: "border-box",
    minHeight: "clamp(260px, 38vw, 430px)",
  },

  badge: {
    position: "absolute",
    top: "clamp(-18px, -1.8vw, -12px)",
    left: "50%",
    transform: "translateX(-50%)",
    minWidth: "clamp(84px, 10vw, 120px)",
    height: "clamp(34px, 4vw, 42px)",
    padding: "0 clamp(10px, 1vw, 16px)",
    borderRadius: "clamp(12px, 1.2vw, 16px)",
    border: `2px solid ${BORDER_COLOR}`,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(18px, 1.7vw,20px)",
    fontWeight: 500,
    color: TEXT_COLOR,
    boxSizing: "border-box",
  },

  itemsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "0px",
    alignItems: "end",
    width: "100%",
  },

  itemBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "clamp(6px, 0.8vw, 10px)",
    minWidth: 0,
  },

  imgWrap: {
    width: "100%",
    height: "clamp(72px, 10vw, 90px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
    boxSizing: "border-box",
  },

  img: {
    // maxWidth: "100%",
    // maxHeight: "100%",
    width: "100px",
    height: "70px",
    objectFit: "contain",
    display: "block",
    cursor: "pointer",
  },

  wordBtn: {
    position: "relative",
    minHeight: "clamp(34px, 4vw, 46px)",
    padding: "0 clamp(10px, 1.1vw, 16px)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "999px",
    border: "2px solid transparent",
    background: "transparent",
    color: TEXT_COLOR,
    fontSize: "clamp(16px, 1.4vw, 18px)",
    // fontWeight: 500,
    lineHeight: 1.1,
    cursor: "pointer",
    boxSizing: "border-box",
    textAlign: "center",
    maxWidth: "100%",
    wordBreak: "break-word",
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
    fontWeight: 600,
    border: "2px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
    zIndex: 2,
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
  },
};

export default function WB_Unit1_Page9_QA() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const allItems = SECTIONS.flatMap((section) => section.items);

  const handleSelect = (itemId) => {
    if (showAns ||showResults) return;

    setAnswers((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns ||showResults) return;

    const total = allItems.length / 2;
    let score = 0;

    allItems.forEach((item) => {
      const selected = !!answers[item.id];
      if (selected === item.correct) {
        score += 1;
      }
    });

    setShowResults(true);

    if (score/2 === total) {
      ValidationAlert.success(`Score: ${Math.floor(score / 2)} / ${total}`);
    } else if (score/2 > 0) {
      ValidationAlert.warning(`Score: ${Math.floor(score / 2)} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${Math.floor(score / 2)} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const filled = {};

    allItems.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isSelected = (itemId) => !!answers[itemId];

  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return !!answers[item.id] !== item.correct && !!answers[item.id];
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-a-root * {
          box-sizing: border-box !important;
        }

        @media (max-width: 900px) {
          .wb-a-sections {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="div-forall" style={{ gap: "60px" }}>
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span>
          Does it have a <b>short u</b> or <b>long u</b> sound? Read and circle.
        </h1>

        <div style={styles.pageWrap}>
          <div style={styles.sectionsWrap} className="wb-a-sections">
            {SECTIONS.map((section) => (
              <div key={section.id} style={styles.sectionBox}>
                <div style={styles.badge}>{section.title}</div>

                <div style={styles.itemsGrid}>
                  {section.items.map((item) => {
                    const selected = isSelected(item.id);
                    const wrong = isWrong(item);

                    return (
                      <div key={item.id} style={styles.itemBox}>
                        <div style={styles.imgWrap}>
                          <img
                            onClick={() => handleSelect(item.id)}
                            src={item.img}
                            alt={item.text}
                            style={styles.img}
                          />
                        </div>

                        <div
                          onClick={() => handleSelect(item.id)}
                          style={{
                            ...styles.wordBtn,
                            borderColor: selected
                              ? CIRCLE_COLOR
                              : "transparent",
                            cursor: showAns ? "default" : "pointer",
                          }}
                        >
                          {item.text}
                          {wrong && <div style={styles.wrongBadge}>✕</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
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
