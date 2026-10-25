import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import a1 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_001_the.mp3";
import a2 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_002_thin.mp3";
import a3 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_003_thank.mp3";
import a4 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_004_father.mp3";
import a5 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_005_birthday.mp3";
import a6 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_006_mother.mp3";
import a7 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_007_that.mp3";
import a8 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_008_this.mp3";
import a9 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_009_these.mp3";
import a10 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_010_they.mp3";
import a11 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_011_math.mp3";
import a12 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_012_bath.mp3";
import a13 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_013_thick.mp3";
import a14 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_014_thirsty.mp3";
import a15 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_015_think.mp3";
import a16 from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise B/Item_016_brother.mp3";

const ITEMS = [
  {
    id: 1,
    words: ["the", "mother", "they", "think"],
    correct: "think",
  },
  {
    id: 2,
    words: ["thin", "that", "math", "thirsty"],
    correct: "that",
  },
  {
    id: 3,
    words: ["thank", "this", "bath", "thin"],
    correct: "thank",
  },
  {
    id: 4,
    words: ["father", "the", "thick", "brother"],
    correct: "thick",
  },
  {
    id: 5,
    words: ["birthday", "these", "thin", "thank"],
    correct: "these",
  },
];
const WORD_AUDIO = {
  the: a1,
  thin: a2,
  thank: a3,
  father: a4,
  birthday: a5,
  mother: a6,
  that: a7,
  this: a8,
  these: a9,
  they: a10,
  math: a11,
  bath: a12,
  thick: a13,
  thirsty: a14,
  think: a15,
  brother: a16,
};

const styles = {
  page: {
    width: "100%",
    padding: "12px 20px 28px",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },

  title: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  grid: {
    display: "flex",

    gap: "26px 22px",
    alignItems: "start",
  },

  itemWrap: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },

  itemNumber: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#222",
    lineHeight: 1,
    marginTop: "8px",
    minWidth: "18px",
  },

  card: {
    width: "100%",
    maxWidth: "160px",
    minHeight: "290px",
    border: "1px solid  #f39b42",
    borderRadius: "20px",
    background: "#fff",
    padding: "16px 10px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  wordBtn: {
    position: "relative",
    width: "90px",
    height: "48px",
    padding: "4px 12px",
    borderRadius: "999px",
    border: "1px solid transparent",
    background: "transparent",
    color: "#222",
    fontSize: "18px",
    // fontWeight: 500,
    // lineHeight: 1.1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    userSelect: "none",
    boxSizing: "border-box",
    textAlign: "center",
  },

  selectedWord: {
    border: "1px solid #f39b42",
    // backgroundColor :"#ffefe2ff"
  },

  wrongBadge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    width: "22px",
    height: "22px",
    borderRadius: "999px",
    background: "red",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 700,
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
    border: "2px solid #fff",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
  },
};

export default function WB_Unit4_Page233_QB() {
  const [answers, setAnswers] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, word) => {
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: word,
    }));

    setWrongIds((prev) => prev.filter((wrongId) => wrongId !== id));
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

    const correctIds = ITEMS.filter(
      (item) => answers[item.id] === item.correct,
    ).map((item) => item.id);
    setLockedIds((prev) => [...new Set([...prev, ...correctIds])]);
    setWrongIds(
      ITEMS.filter((item) => answers[item.id] !== item.correct).map(
        (item) => item.id,
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
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
    setShowAns(true);
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setLockedIds([]);
    setWrongIds([]);
    setShowAns(false);
    stopAudio();
  };

  const isWrong = (item, word) => {
    return !showAns && wrongIds.includes(item.id) && answers[item.id] === word;
  };

  const isSelected = (item, word) => {
    if (showAns) return item.correct === word;
    return answers[item.id] === word;
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "110px" }}>
        <ExerciseHeader
          sectionLetter="B"
          title="Circle the word in each box that has a different th sound."
          subTitle="Look at the word with a different th sound in each group first, compare all available options, then tap only the answer that matches."
        />

        <div className=" w-full" style={styles.grid}>
          {ITEMS.map((item) => (
            <div key={item.id} style={styles.itemWrap}>
              <div style={styles.itemNumber}>{item.id}</div>

              <div style={styles.card}>
                {item.words.map((word, wordIndex) => {
                  const selected = isSelected(item, word);
                  const wrong = isWrong(item, word);
                  const audioKey = `word-${item.id}-${wordIndex}`;

                  return (
                    <div
                      key={word}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${word} and play its audio`}
                      onClick={() => {
                        playAudio(audioKey, WORD_AUDIO[word]);
                        handleSelect(item.id, word);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(audioKey, WORD_AUDIO[word]);
                          handleSelect(item.id, word);
                        }
                      }}
                      style={{
                        ...styles.wordBtn,
                        ...(selected ? styles.selectedWord : {}),
                        cursor:
                          showAns || lockedIds.includes(item.id)
                            ? "default"
                            : "pointer",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === audioKey}
                      />
                      {word}

                      {wrong && <div style={styles.wrongBadge}>✕</div>}
                    </div>
                  );
                })}
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
