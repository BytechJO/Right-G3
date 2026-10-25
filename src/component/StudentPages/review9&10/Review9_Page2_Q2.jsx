import React, { useState } from "react";
import "./Review9_Page2_Q2.css";

import ValidationAlert from "../../Popup/ValidationAlert";
import blue from "../../../assets/audio/ClassBook/Unit 10/P 89/full.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";

const page89D = (file) =>
  new URL(
    `../../../assets/audio/ClassBook/Unit 10/Page 89 - Exercise D/${file}`,
    import.meta.url,
  ).href;
const WORD_AUDIO = [
  [page89D("Item_001_trees.mp3"), page89D("Item_002_vets.mp3")],
  [page89D("Item_003_keys.mp3"), page89D("Item_004_bees.mp3")],
  [page89D("Item_005_rabbits.mp3"), page89D("Item_006_maps.mp3")],
  [page89D("Item_007_ducks.mp3"), page89D("Item_008_tools.mp3")],
];
const Review9_Page2_Q2 = () => {
  const captions = [
    {
      start: 0.399,
      end: 3.859,
      text: "Page 89, review nine, exercise D.",
    },
    {
      start: 5.119,
      end: 27.559,
      text: "Do both words have the same final S sound? Listen and write check or X. One, trees, vets. Two, keys, bees. Three, rabbits, maps. Four, ducks, tools",
    },
  ];

  const groups = [
    { id: 1, word1: "trees", word2: "vets", answer: "no" },
    { id: 2, word1: "keys", word2: "bees", answer: "yes" },
    { id: 3, word1: "rabbits", word2: "maps", answer: "yes" },
    { id: 4, word1: "ducks", word2: "tools", answer: "no" },
  ];

  const [selected, setSelected] = useState(Array(groups.length).fill(null));
  const [wrongIds, setWrongIds] = useState([]);
  const [lockedIds, setLockedIds] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (groupIndex, value) => {
    if (revealed || lockedIds.includes(groupIndex)) return;

    const updated = [...selected];
    updated[groupIndex] = value;
    setSelected(updated);
    setWrongIds((previous) => previous.filter((id) => id !== groupIndex));
  };

  const showAnswers = () => {
    const correctSelections = groups.map((g) => g.answer);
    setSelected(correctSelections);
    setLockedIds(groups.map((_, index) => index));
    setRevealed(true);
    setWrongIds([]);
    stopAudio();
  };

  const checkAnswers = () => {
    if (revealed || lockedIds.length === groups.length) return;

    if (selected.some((val) => val === null)) {
      ValidationAlert.info("Please choose ✓ or ✗ for all items!");
      return;
    }

    let correctCount = 0;

    groups.forEach((group, index) => {
      if (selected[index] === group.answer) {
        correctCount++;
      }
    });

    const total = groups.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size: 20px; margin-top: 10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) {
      ValidationAlert.success(scoreMessage);
    } else if (correctCount === 0) {
      ValidationAlert.error(scoreMessage);
    } else {
      ValidationAlert.warning(scoreMessage);
    }

    setLockedIds(
      groups.flatMap((group, index) =>
        selected[index] === group.answer ? [index] : [],
      ),
    );
    setWrongIds(
      groups.flatMap((group, index) =>
        selected[index] !== group.answer ? [index] : [],
      ),
    );
  };

  const reset = () => {
    setSelected(Array(groups.length).fill(null));
    setWrongIds([]);
    setLockedIds([]);
    setRevealed(false);
    stopAudio();
  };

  const renderChoiceBox = (index, value, symbol) => {
    const isSelected = selected[index] === value;
    const isWrong =
      wrongIds.includes(index) &&
      selected[index] === value &&
      groups[index].answer !== value;

    return (
      <div
        onClick={() => handleSelect(index, value)}
        role="button"
        tabIndex={lockedIds.includes(index) ? -1 : 0}
        aria-disabled={lockedIds.includes(index)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSelect(index, value);
          }
        }}
        style={{
          width: "40px",
          height: "40px",
          border: isSelected
            ? isWrong
              ? "2px solid red"
              : "1px solid #F79530"
            : "1px solid gray",
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: revealed || lockedIds.includes(index) ? "default" : "pointer",
          background: isSelected ? "#fff" : "#fff",
          position: "relative",
          fontSize: "22px",
          fontWeight: "700",
          // color: isSelected ? "#2c5287" : "transparent",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {isSelected ? (
          symbol === "✓" ? (
            <img src={trueIcon} alt="" style={{ height: "25px" }} />
          ) : (
            <img src={falseIcon} alt="" style={{ height: "25px" }} />
          )
        ) : (
          ""
        )}

        {isWrong && (
          <span
            style={{
              position: "absolute",
              right: "-14px",
              top: "0%",
              transform: "translateY(-50%)",
              width: "22px",
              height: "22px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
              border: "2px solid white",
              boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
              pointerEvents: "none",
              zIndex: 3,
            }}
          >
            ✕
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{ gap: "40px" }}>
        <ExerciseHeaderReview
          sectionLetter="D"
          title={
            <>
              Do both words have the same final{" "}
              <span style={{ color: "#2e3192" }}>-s sound</span>? Listen and
              write <span style={{ color: "#D1232A" }}>✓</span> or{" "}
              <span style={{ color: "#D1232A" }}>✗</span>.
            </>
          }
          subTitle="Listen to the final sound in each word, then select or mark the matching -s sound."
        />

        <QuestionAudioPlayer
          src={blue}
          captions={captions}
          stopAtSecond={11.22}
          pageId="review9-page89-d"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            columnGap: "70px",
            rowGap: "34px",
            marginTop: "10px",
          }}
        >
          {groups.map((group, index) => (
            <div
              key={group.id}
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "14px",
                minHeight: "52px",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "22px",
                  color: "#1f1f1f",
                }}
              >
                {group.id}
              </span>

              <span
                role="button"
                tabIndex={0}
                className="unit4-interactive unit4-audio-control"
                onClick={() =>
                  playAudio(`word-${index}-0`, WORD_AUDIO[index][0])
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio(`word-${index}-0`, WORD_AUDIO[index][0]);
                  }
                }}
                style={{
                  fontSize: "20px",
                  color: "#2b2b2b",
                  width: "120px", // 🔥 ثابت
                  display: "inline-block",
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `word-${index}-0`}
                />
                {group.word1}
              </span>
              <span
                role="button"
                tabIndex={0}
                className="unit4-interactive unit4-audio-control"
                onClick={() =>
                  playAudio(`word-${index}-1`, WORD_AUDIO[index][1])
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio(`word-${index}-1`, WORD_AUDIO[index][1]);
                  }
                }}
                style={{
                  fontSize: "20px",
                  color: "#2b2b2b",
                  width: "120px",
                  display: "inline-block",
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `word-${index}-1`}
                />
                {group.word2}
              </span>

              {renderChoiceBox(index, "yes", "✓")}
              {renderChoiceBox(index, "no", "✗")}
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>
        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>
        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review9_Page2_Q2;
