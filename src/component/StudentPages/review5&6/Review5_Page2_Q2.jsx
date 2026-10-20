import React, { useState } from "react";
import "./Review5_Page2_Q2.css";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import blue from "../../../assets/audio/ClassBook/Unit 6/P 53/unit6-pg53-EXD.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
import tryAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise D/Item_001_try.mp3";
import flyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise D/Item_002_fly.mp3";
import bunnyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise D/Item_003_bunny.mp3";
import spyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise D/Item_004_spy.mp3";
import cryAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise D/Item_005_cry.mp3";
import fryAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise D/Item_006_fry.mp3";
import candyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise D/Item_007_candy.mp3";
import babyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise D/Item_008_baby.mp3";
import sunnyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise D/Item_009_sunny.mp3";
import slyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise D/Item_010_sly.mp3";
import fluffyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise D/Item_011_fluffy.mp3";
import skyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise D/Item_012_sky.mp3";
const WORD_AUDIO = {
  try: tryAudio,
  fly: flyAudio,
  bunny: bunnyAudio,
  spy: spyAudio,
  cry: cryAudio,
  fry: fryAudio,
  candy: candyAudio,
  baby: babyAudio,
  sunny: sunnyAudio,
  sly: slyAudio,
  fluffy: fluffyAudio,
  sky: skyAudio,
};
const Review5_Page2_Q2 = () => {
  const captions = [
    {
      start: 0.659,
      end: 33.34,
      text: "Page 53, review five, exercise D. Do both words have the same Y sound? Listen and write check or X. One, try, fly. Two, bunny, spy. Three, cry, fry. Four, candy, baby. Five, sunny, sly. Six, fluffy, sky",
    },
  ];
  const groups = [
    { id: 1, word1: "try", word2: "fly", answer: "yes" },
    { id: 2, word1: "bunny", word2: "spy", answer: "no" },
    { id: 3, word1: "cry", word2: "fry", answer: "yes" },
    { id: 4, word1: "candy", word2: "baby", answer: "yes" },
    { id: 5, word1: "sunny", word2: "sly", answer: "no" },
    { id: 6, word1: "fluffy", word2: "sky", answer: "no" },
  ];

  const [selected, setSelected] = useState(Array(groups.length).fill(null));
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [forceStop, setForceStop] = useState(0);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const playWordAudio = (key, source) => {
    setForceStop((value) => value + 1);
    playAudio(key, source);
  };

  const handleSelect = (groupIndex, value) => {
    if (lockedIds.includes(groupIndex) || showAnswer) return;

    const updated = [...selected];
    updated[groupIndex] = value;
    setSelected(updated);
    setWrongIds((previous) => previous.filter((id) => id !== groupIndex));
  };

  const showAnswers = () => {
    const correctSelections = groups.map((g) => g.answer);
    setSelected(correctSelections);
    setLockedIds(groups.map((_, index) => index));
    setWrongIds([]);
    setShowAnswer(true);
    setForceStop((value) => value + 1);
    stopAudio();
  };

  const checkAnswers = () => {
    if (showAnswer || lockedIds.length === groups.length) return;

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
    setLockedIds([]);
    setWrongIds([]);
    setShowAnswer(false);
    setForceStop((value) => value + 1);
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
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSelect(index, value);
          }
        }}
        role="button"
        tabIndex={lockedIds.includes(index) || showAnswer ? -1 : 0}
        aria-pressed={isSelected}
        aria-label={
          value === "yes" ? "The sounds match" : "The sounds do not match"
        }
        className="unit4-interactive"
        style={{
          width: "45px",
          height: "45px",
          border: isWrong ? "1px solid red" : "1px solid #F79530",
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor:
            lockedIds.includes(index) || showAnswer ? "default" : "pointer",
          background: isSelected ? "#fff" : "#fff",
          position: "relative",
          fontSize: "22px",
          fontWeight: "700",
          color: isSelected ? "#2c5287" : "transparent",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {isSelected ? (
          symbol === "✓" ? (
            <img src={trueIcon} alt="Check mark" style={{ height: "25px" }} />
          ) : (
            <img src={falseIcon} alt="X mark" style={{ height: "25px" }} />
          )
        ) : (
          ""
        )}

        {isWrong && (
          <span
            style={{
              position: "absolute",
              right: "-10px",
              top: "5%",
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
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
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
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{
          gap: "50px",
        }}
      >
        <ExerciseHeaderReview
          sectionLetter="D"
          title={
            <>
              Do both words have the same{" "}
              <span style={{ color: "#2e3192" }}>-y sound</span>? Listen and
              write <span style={{ color: "#D1232A" }}>✓</span> or{" "}
              <span style={{ color: "#D1232A" }}>✗</span>.
            </>
          }
          subTitle="Listen to both words carefully, then mark whether their final -y sounds match."
        />

        <QuestionAudioPlayer
          src={blue}
          captions={captions}
          stopAtSecond={11.5}
          pageId="review5-page2-q2"
          forceStop={forceStop}
          onInteract={stopAudio}
        />

        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "70px",
            rowGap: "34px",
            marginTop: "10px",
          }}
        >
          {groups.map((group, index) => (
            <div
              key={group.id}
              style={{
                display: "grid",
                gridTemplateColumns: "32px 70px 70px 40px 40px",
                alignItems: "center",
                columnGap: "14px",
                minHeight: "52px",
              }}
            >
              <span
                role="button"
                tabIndex={0}
                className="unit4-audio-control unit4-interactive"
                onClick={() =>
                  playWordAudio(`word-${group.id}-1`, WORD_AUDIO[group.word1])
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playWordAudio(
                      `word-${group.id}-1`,
                      WORD_AUDIO[group.word1],
                    );
                  }
                }}
                style={{
                  fontWeight: "700",
                  fontSize: "20px",
                  color: "#1f1f1f",
                }}
              >
                {group.id}
              </span>

              <span
                style={{
                  fontSize: "20px",
                  color: "#2b2b2b",
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `word-${group.id}-1`}
                />
                {group.word1}
              </span>

              <span
                role="button"
                tabIndex={0}
                className="unit4-audio-control unit4-interactive"
                onClick={() =>
                  playWordAudio(`word-${group.id}-2`, WORD_AUDIO[group.word2])
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playWordAudio(
                      `word-${group.id}-2`,
                      WORD_AUDIO[group.word2],
                    );
                  }
                }}
                style={{
                  fontSize: "20px",
                  color: "#2b2b2b",
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `word-${group.id}-2`}
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

export default Review5_Page2_Q2;
