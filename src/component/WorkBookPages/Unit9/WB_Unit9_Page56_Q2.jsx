import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import ducksAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise B/Item_001_ducks.mp3";
import girlsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise B/Item_002_girls.mp3";
import beesAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise B/Item_003_bees.mp3";
import catsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise B/Item_004_cats.mp3";
import cupsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise B/Item_005_cups.mp3";
import batsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise B/Item_006_bats.mp3";
import socksAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise B/Item_007_socks.mp3";
import nutsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise B/Item_008_nuts.mp3";
import topsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise B/Item_009_tops.mp3";
import beetsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise B/Item_010_beets.mp3";
import bagsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise B/Item_011_bags.mp3";
import ratsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise B/Item_012_rats.mp3";
import capsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise B/Item_013_caps.mp3";
import cubsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise B/Item_014_cubs.mp3";

const WORD_AUDIO = {
  ducks: ducksAudio,
  girls: girlsAudio,
  bees: beesAudio,
  cats: catsAudio,
  cups: cupsAudio,
  bats: batsAudio,
  socks: socksAudio,
  nuts: nutsAudio,
  tops: topsAudio,
  beets: beetsAudio,
  bags: bagsAudio,
  rats: ratsAudio,
  caps: capsAudio,
  cubs: cubsAudio,
};

const ITEMS = [
  {
    id: 1,
    words: ["cats", "bats", "bees", "tops"],
    correct: "bees",
  },
  {
    id: 2,
    words: ["ducks", "cups", "bags", "cats"],
    correct: "bags",
  },
  {
    id: 3,
    words: ["girls", "socks", "beets", "bats"],
    correct: "girls",
  },
  {
    id: 4,
    words: ["cups", "nuts", "caps", "cubs"],
    correct: "cubs",
  },
  {
    id: 5,
    words: ["bees", "tops", "rats", "socks"],
    correct: "bees",
  },
];

export default function WB_Unit9_Page56_QB() {
  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (columnId, word) => {
    if (showAns || lockedIds.includes(columnId)) return;

    setAnswers((prev) => ({
      ...prev,
      [columnId]: word,
    }));
    setWrongIds((prev) => prev.filter((id) => id !== columnId));
    playAudio(`word-${columnId}-${word}`, WORD_AUDIO[word]);
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all columns first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    setShowResults(true);
    setLockedIds((prev) => [
      ...new Set([
        ...prev,
        ...ITEMS.filter((item) => answers[item.id] === item.correct).map(
          (item) => item.id,
        ),
      ]),
    ]);
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
    const correctMap = {};
    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    stopAudio();
  };

  const isWrong = (id) => {
    return wrongIds.includes(id);
  };

  const getWordStyle = (columnId, word) => {
    const selected = answers[columnId] === word;

    return {
      minWidth: "70px",
      minHeight: "52px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      lineHeight: "1.2",
      color: "#222",
      cursor: showAns || lockedIds.includes(columnId) ? "default" : "pointer",
      border: selected ? "1px solid #f39b42" : "1px solid transparent",
      borderRadius: "999px",
      backgroundColor: "transparent",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
      padding: "0 10px",
    };
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "120px",
        }}
      >
        <ExerciseHeader
          sectionLetter="B"
          title={
            <>
              Read and say. Circle the word with a different{" "}
              <span style={{ color: "#2e3192" }}>-s sound</span>.
            </>
          }
          subTitle="Look at the odd word with a different final -s sound first, compare all available options, then tap only the answer that matches."
        />

        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "26px",
            alignItems: "start",
            justifyItems: "center",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                // flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#222",
                }}
              >
                {item.id}
              </span>

              <div
                style={{
                  width: "100px",
                  minHeight: "280px",
                  border: isWrong(item.id)
                    ? "2px solid red"
                    : "2px solid #a3a3a3",
                  borderRadius: "24px",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  padding: "12px 8px",
                  boxSizing: "border-box",
                  position: "relative",
                }}
              >
                {item.words.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(item.id, word)}
                    onKeyDown={(event) => {
                      if (
                        (event.key === "Enter" || event.key === " ") &&
                        !lockedIds.includes(item.id)
                      ) {
                        event.preventDefault();
                        handleSelect(item.id, word);
                      }
                    }}
                    tabIndex={lockedIds.includes(item.id) ? -1 : 0}
                    aria-disabled={lockedIds.includes(item.id)}
                    className="unit4-audio-control unit4-interactive"
                    style={getWordStyle(item.id, word)}
                  >
                    {word}
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `word-${item.id}-${word}`}
                    />
                  </button>
                ))}

                {isWrong(item.id) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "red",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: "700",
                      border: "2px solid white",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.25)",

                      zIndex: 5,
                      pointerEvents: "none",
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
