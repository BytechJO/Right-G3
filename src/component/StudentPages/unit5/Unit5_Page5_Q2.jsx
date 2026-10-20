import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import ExerciseHeader from "../../ExerciseHeader";
import Button from "../../Button";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "./Unit5_Page5_Q2.css";
import "../unit4/unit4Interactions.css";
import mainAudio from "../../../assets/audio/ClassBook/Unit 5/P 44/unit5-pg44-EXB.mp3";
import flyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise B/Item_001_fly.mp3";
import tryAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise B/Item_002_try.mp3";
import funnyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise B/Item_003_funny.mp3";
import cryAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise B/Item_004_cry.mp3";
import dryAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise B/Item_005_dry.mp3";
import slyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise B/Item_006_sly.mp3";
import myAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise B/Item_007_my.mp3";
import honeyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise B/Item_008_honey.mp3";
import whyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise B/Item_009_why.mp3";
import buyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise B/Item_010_buy.mp3";
import runnyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise B/Item_011_runny.mp3";
import candyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise B/Item_012_candy.mp3";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";

const WORD_AUDIO = {
  fly: flyAudio,
  try: tryAudio,
  funny: funnyAudio,
  cry: cryAudio,
  dry: dryAudio,
  sly: slyAudio,
  my: myAudio,
  honey: honeyAudio,
  why: whyAudio,
  buy: buyAudio,
  runny: runnyAudio,
  candy: candyAudio,
};

const GROUPS = [
  { id: 1, word1: "fly", word2: "try", answer: "yes" },
  { id: 2, word1: "funny", word2: "cry", answer: "no" },
  { id: 3, word1: "dry", word2: "sly", answer: "yes" },
  { id: 4, word1: "my", word2: "honey", answer: "no" },
  { id: 5, word1: "why", word2: "buy", answer: "yes" },
  { id: 6, word1: "runny", word2: "candy", answer: "yes" },
];

const CAPTIONS = [
  {
    start: 0.419,
    end: 26.739,
    text: "Page 44, write activities. Exercise B. Do both words have the same Y sound? Listen and write check or X. Fly. Try. Funny. Cry. Dry. Sly. My. Honey. Why. Buy. Runny. Candy",
  },
];

export default function Unit5_Page5_Q2() {
  const [selected, setSelected] = useState(Array(GROUPS.length).fill(null));
  const [wrongIds, setWrongIds] = useState([]);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (index, value) => {
    if (lockedIds.includes(index)) return;
    setSelected((previous) => {
      const next = [...previous];
      next[index] = value;
      return next;
    });
    setWrongIds((previous) => previous.filter((id) => id !== index));
  };

  const checkAnswers = () => {
    if (lockedIds.length === GROUPS.length) return;
    if (selected.some((value) => value === null)) {
      ValidationAlert.info("Please choose ✓ or ✗ for all items.");
      return;
    }

    const correctIds = GROUPS.flatMap((group, index) =>
      selected[index] === group.answer ? [index] : [],
    );
    const wrong = GROUPS.flatMap((group, index) =>
      selected[index] !== group.answer ? [index] : [],
    );
    setLockedIds((previous) => [...new Set([...previous, ...correctIds])]);
    setWrongIds(wrong);

    const score = correctIds.length;
    ValidationAlert[
      score === GROUPS.length ? "success" : score === 0 ? "error" : "warning"
    ](`Score: ${score} / ${GROUPS.length}`);
  };

  const showAnswers = () => {
    setSelected(GROUPS.map((group) => group.answer));
    setWrongIds([]);
    setLockedIds(GROUPS.map((_, index) => index));
    stopAudio();
  };

  const reset = () => {
    setSelected(Array(GROUPS.length).fill(null));
    setWrongIds([]);
    setLockedIds([]);
    stopAudio();
  };

  const renderChoice = (index, value, symbol) => {
    const isSelected = selected[index] === value;
    const isWrong = wrongIds.includes(index) && isSelected;
    const isLocked = lockedIds.includes(index);

    return (
      <div
        role="button"
        tabIndex={isLocked ? -1 : 0}
        aria-label={`Choose ${symbol} for item ${index + 1}`}
        aria-pressed={isSelected}
        aria-disabled={isLocked}
        className="unit4-interactive"
        onClick={() => handleSelect(index, value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSelect(index, value);
          }
        }}
        style={{
          width: "45px",
          height: "45px",
          border: isWrong ? "1px solid red" : "1px solid #F79530",
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: isLocked ? "default" : "pointer",
          background: "#fff",
          position: "relative",
          userSelect: "none",
        }}
      >
        {isSelected && (
          <img
            src={symbol === "✓" ? trueIcon : falseIcon}
            alt=""
            style={{ height: "25px" }}
          />
        )}
        {isWrong && (
          <span className="CB-unit5-p5-q1-wrong-x" aria-hidden="true">
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
      <div className="div-forall" style={{ gap: "50px" }}>
        <ExerciseHeader
          sectionLetter="B"
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
          src={mainAudio}
          captions={CAPTIONS}
          stopAtSecond={11.5}
          pageId="unit5-page44-exercise-b"
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
          {GROUPS.map((group, index) => (
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
                style={{ fontWeight: 700, fontSize: "20px", color: "#1f1f1f" }}
              >
                {group.id}
              </span>
              {[group.word1, group.word2].map((word, wordIndex) => (
                <span
                  key={word}
                  role="button"
                  tabIndex={0}
                  className="unit4-audio-control unit4-interactive"
                  aria-label={`Play ${word}`}
                  onClick={() =>
                    playAudio(`word-${index}-${wordIndex}`, WORD_AUDIO[word])
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`word-${index}-${wordIndex}`, WORD_AUDIO[word]);
                    }
                  }}
                  style={{ fontSize: "20px", color: "#2b2b2b" }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `word-${index}-${wordIndex}`}
                  />
                  {word}
                </span>
              ))}
              {renderChoice(index, "yes", "✓")}
              {renderChoice(index, "no", "✗")}
            </div>
          ))}
        </div>
      </div>
      <Button
        handleStartAgain={reset}
        handleShowAnswer={showAnswers}
        checkAnswers={checkAnswers}
      />
    </div>
  );
}
