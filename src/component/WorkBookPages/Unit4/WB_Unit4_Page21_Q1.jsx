import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import hotAudio from "../../../assets/audio/WorkBook/unit4/Page 21 - Exercise A/Item_001_hot.mp3";
import coldAudio from "../../../assets/audio/WorkBook/unit4/Page 21 - Exercise A/Item_002_cold.mp3";
import rainyAudio from "../../../assets/audio/WorkBook/unit4/Page 21 - Exercise A/Item_003_rainy.mp3";
import windyAudio from "../../../assets/audio/WorkBook/unit4/Page 21 - Exercise A/Item_004_windy.mp3";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 4.svg";
const WORD_AUDIO = {
  hot: hotAudio,
  cold: coldAudio,
  rainy: rainyAudio,
  windy: windyAudio,
};
const IMAGE_ALTS = [
  "Children building a snowman on a cold day",
  "Two girls walking under umbrellas in rainy weather",
  "Children playing on a hot beach",
  "Children playing while leaves blow in windy weather",
];

const WORDS = ["hot", "cold", "rainy", "windy"];

const ITEMS = [
  { id: 1, img: img1, correct: "cold" },
  { id: 2, img: img2, correct: "rainy" },
  { id: 3, img: img3, correct: "hot" },
  { id: 4, img: img4, correct: "windy" },
];

const styles = {
  page: {
    width: "100%",
    padding: "12px 20px 28px",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "980px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "26px",
  },

  title: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  wordBankWrap: {
    display: "flex",
    justifyContent: "center",
  },

  wordBank: {
    minWidth: "min(100%, 520px)",
    // maxWidth: "620px",
    border: "1px solid #f39b42",
    borderRadius: "18px",
    padding: "14px 22px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    // gap: "34px",
    background: "#fff",
    flexWrap: "wrap",
    boxSizing: "border-box",
  },

  word: {
    fontSize: "18px",
    color: "#222",
    lineHeight: 1.1,
    fontWeight: 500,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "34px 42px",
    alignItems: "start",
  },

  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  mediaWrap: {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    // justifyContent: "center",
    gap: "10px",
  },

  numberBadge: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#222",
    zIndex: 2,
  },

  imageBox: {
    width: "100%",
    height: "120px",

    background: "#fff",
  },

  image: {
    height: "auto",
    width: "300px",
    objectFit: "cover",
    display: "block",
  },

  answerWrap: {
    position: "relative",
    width: "100%",
    paddingTop: "6px",
    marginLeft: "20px",
  },

  answerLine: {
    width: "80%",
    borderBottom: "1px solid #4a4a4a",
    // paddingBottom: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "40px",
    boxSizing: "border-box",
  },

  selectBox: {
    position: "relative",
    width: "100%",
    height: "30px",
    borderRadius: "12px",
    background: "#fff",
    // border: "1.5px solid #d4d4d4",
    // boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    display: "flex",
    alignItems: "center",
  },

  select: {
    width: "100%",
    height: "100%",
    border: "none",
    background: "transparent",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    padding: "0 40px 0 14px",
    textAlign: "center",
    textAlignLast: "center",
    fontSize: "18px",
    // fontWeight: 600,
    cursor: "pointer",
    // borderRadius: "12px",
  },

  arrow: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "14px",
    color: "#666",
    pointerEvents: "none",
  },

  wrongBadge: {
    position: "absolute",
    top: "4px",
    right: "64px",
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
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
  },
};

export default function WB_Weather_Page228_QA() {
  const [answers, setAnswers] = useState({});
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleChange = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
    setWrongIds((previous) => previous.filter((wrongId) => wrongId !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score += 1;
      }
    });

    setLockedIds(
      ITEMS.flatMap((item) =>
        answers[item.id] === item.correct ? [item.id] : [],
      ),
    );
    setWrongIds(
      ITEMS.flatMap((item) =>
        answers[item.id] !== item.correct ? [item.id] : [],
      ),
    );

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
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    stopAudio();
  };

  const isWrong = (item) => {
    return wrongIds.includes(item.id);
  };

  const getSelectColor = (item) => {
    if (answers[item.id]) return "#000000ff";
    return "#222";
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall mb-10"
        style={{
          gap: "20px",
        }}
      >
        <ExerciseHeader
          sectionLetter="A"
          title="Look, read, and write."
          subTitle="Use the weather word for each scene to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        <div className=" w-full" style={styles.wordBankWrap}>
          <div style={styles.wordBank}>
            {WORDS.map((word) => (
              <span
                key={word}
                role="button"
                tabIndex={0}
                className="unit4-audio-control unit4-interactive"
                onClick={() => playAudio(`word-${word}`, WORD_AUDIO[word])}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio(`word-${word}`, WORD_AUDIO[word]);
                  }
                }}
                style={styles.word}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `word-${word}`}
                />
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className=" w-full" style={styles.grid}>
          {ITEMS.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.mediaWrap}>
                <div style={styles.numberBadge}>{item.id}</div>

                <div style={styles.imageBox}>
                  <img
                    src={item.img}
                    alt={IMAGE_ALTS[item.id - 1]}
                    style={styles.image}
                  />
                </div>
              </div>

              <div style={styles.answerWrap}>
                <div
                  style={{
                    ...styles.answerLine,
                    borderBottom: isWrong(item)
                      ? "2px solid red"
                      : "1px solid #4a4a4a",
                  }}
                >
                  <div
                    style={{
                      ...styles.selectBox,
                    }}
                  >
                    <select
                      value={answers[item.id] || ""}
                      disabled={showAns || lockedIds.includes(item.id)}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{
                        ...styles.select,
                        color: getSelectColor(item),
                        cursor:
                          showAns || lockedIds.includes(item.id)
                            ? "default"
                            : "pointer",
                      }}
                    >
                      <option value="" disabled hidden></option>
                      {WORDS.map((word) => (
                        <option key={word} value={word}>
                          {word}
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
