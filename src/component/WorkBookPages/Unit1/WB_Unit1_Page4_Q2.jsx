import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 8.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    firstOptions: ["The fridge", "The TV"],
    middle: "is bigger than",
    lastOptions: ["the fridge.", "the TV."],
    correctFirst: "The fridge",
    correctLast: "the TV.",
  },
  {
    id: 2,
    img: img2,
    firstOptions: ["The car", "The bike"],
    middle: "is faster than",
    lastOptions: ["the car.", "the bike."],
    correctFirst: "The car",
    correctLast: "the bike.",
  },
  {
    id: 3,
    img: img3,
    firstOptions: ["Harley", "His dad"],
    middle: "is younger than",
    lastOptions: ["Harley.", "his dad."],
    correctFirst: "Harley",
    correctLast: "his dad.",
  },
  {
    id: 4,
    img: img4,
    firstOptions: ["The ball", "The feathers"],
    middle: "is heavier than",
    lastOptions: ["the ball.", "the feathers."],
    correctFirst: "The ball",
    correctLast: "the feathers.",
  },
];

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "26px",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "8px 14px 20px",
    boxSizing: "border-box",
    width: "100%",
  },

  title: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "28px 34px",
    alignItems: "start",
  },

  card: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    width: "100%",
  },

  mediaWrap: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },

  number: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#222",
    lineHeight: 1,
    marginTop: "8px",
    minWidth: "20px",
  },

  imageBox: {
    width: "100%",
    maxWidth: "420px",
    height: "220px",
    borderRadius: "18px",
    overflow: "hidden",
    background: "#fff",
    boxSizing: "border-box",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },

  answerWrap: {
    position: "relative",
    width: "100%",
    paddingLeft: "32px",
    boxSizing: "border-box",
  },

  answerLine: {
    width: "100%",
    borderBottom: "3px solid #4a4a4a",
    paddingBottom: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    flexWrap: "wrap",
    minHeight: "58px",
    boxSizing: "border-box",
  },

  middleText: {
    fontSize: "24px",
    color: "#111",
    lineHeight: 1.3,
    fontWeight: 500,
  },

  selectBox: {
    position: "relative",
    minWidth: "150px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    border: "2px solid #bfbfbf",
    borderRadius: "14px",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  select: {
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    textAlign: "center",
    textAlignLast: "center",
    fontSize: "22px",
    fontWeight: 500,
    color: "#222",
    cursor: "pointer",
    padding: "0 42px 0 18px",
    boxSizing: "border-box",
  },

  arrow: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "12px",
    color: "#777",
    pointerEvents: "none",
  },

  wrongBadge: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    width: "22px",
    height: "22px",
    borderRadius: "999px",
    background: "#ef4444",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 700,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    border: "2px solid #fff",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "8px",
  },
};

export default function WB_Unit1_Page4_Q2() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleChange = (id, field, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));

    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every(
      (item) => answers[item.id]?.first && answers[item.id]?.last
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      const firstCorrect = answers[item.id]?.first === item.correctFirst;
      const lastCorrect = answers[item.id]?.last === item.correctLast;

      if (firstCorrect && lastCorrect) {
        score += 1;
      }
    });

    setChecked(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const filled = {};

    ITEMS.forEach((item) => {
      filled[item.id] = {
        first: item.correctFirst,
        last: item.correctLast,
      };
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
    if (!checked || showAns) return false;

    return (
      answers[item.id]?.first !== item.correctFirst ||
      answers[item.id]?.last !== item.correctLast
    );
  };

  const getValue = (itemId, field) => {
    return answers[itemId]?.[field] || "";
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
        <h1 className="WB-header-title-page8" style={styles.title}>
          <span className="WB-ex-A">D</span>
          Look and write.
        </h1>

        <div style={styles.grid}>
          {ITEMS.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.mediaWrap}>
                <div style={styles.number}>{item.id}</div>

                <div style={styles.imageBox}>
                  <img
                    src={item.img}
                    alt={`comparison-${item.id}`}
                    style={styles.image}
                  />
                </div>
              </div>

              <div style={styles.answerWrap}>
                <div style={styles.answerLine}>
                  <div style={{ ...styles.selectBox, minWidth: "220px" }}>
                    <select
                      value={getValue(item.id, "first")}
                      disabled={showAns}
                      onChange={(e) =>
                        handleChange(item.id, "first", e.target.value)
                      }
                      style={{
                        ...styles.select,
                        cursor: showAns ? "default" : "pointer",
                      }}
                    >
                      <option value="" disabled hidden>
                        Select
                      </option>
                      {item.firstOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    {!showAns && <span style={styles.arrow}>▼</span>}
                  </div>

                  <span style={styles.middleText}>{item.middle}</span>

                  <div style={{ ...styles.selectBox, minWidth: "190px" }}>
                    <select
                      value={getValue(item.id, "last")}
                      disabled={showAns}
                      onChange={(e) =>
                        handleChange(item.id, "last", e.target.value)
                      }
                      style={{
                        ...styles.select,
                        cursor: showAns ? "default" : "pointer",
                      }}
                    >
                      <option value="" disabled hidden>
                        Select
                      </option>
                      {item.lastOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    {!showAns && <span style={styles.arrow}>▼</span>}
                  </div>
                </div>

                {isWrong(item) && <div style={styles.wrongBadge}>✕</div>}
              </div>
            </div>
          ))}
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