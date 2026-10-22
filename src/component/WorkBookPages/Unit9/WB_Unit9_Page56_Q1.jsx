import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd11pg56instruction1-adult-lady_kdnJAymX.mp3";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
import sentence1Audio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise A/Item_001_The_cats_have_cups_and_bats.mp3";
import sentence2Audio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise A/Item_002_The_bees_and_dogs_see_the_trees.mp3";
import sentence3Audio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise A/Item_003_The_girl_has_books,_peas,_and_dogs.mp3";

const ITEMS = [
  {
    id: 1,
    text: "The cats have cups and bats.",
    correct: true,
    audio: sentence1Audio,
  },
  {
    id: 2,
    text: "The bees and dogs see the trees.",
    correct: true,
    audio: sentence2Audio,
  },
  {
    id: 3,
    text: "The girl has books, peas, and dogs.",
    correct: false,
    audio: sentence3Audio,
  },
];

export default function Phonics_QA() {
  const [answers, setAnswers] = useState({});
  const [, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const [forceStopPlayer, setForceStopPlayer] = useState(0);
  const handleSentenceAudio = (item) => {
    // Stop the main audio player
    setForceStopPlayer((prev) => prev + 1);

    // Play the selected sentence
    playAudio(`sentence-${item.id}`, item.audio);
  };
  const captions = [
    { start: 0.46, end: 3.42, text: "Page 56, phonics exercise A." },
    {
      start: 3.42,
      end: 8.62,
      text: "Do the words ending in S have the same S sound?",
    },
    { start: 8.62, end: 11.88, text: "Listen and write check or X." },
    { start: 13.0, end: 17.42, text: "1- the cats have cups and bats." },
    { start: 17.42, end: 21.58, text: "2- the bees and dogs see the trees." },
    {
      start: 21.58,
      end: 27.88,
      text: "3- the girl has books, peas, and dogs.",
    },
  ];
  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: prev[id] === value ? undefined : value,
    }));
    setWrongIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const isWrong = (item) => {
    return wrongIds.includes(item.id);
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[item.id] !== undefined);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions!");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) score++;
    });

    setChecked(true);
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
    const ans = {};
    ITEMS.forEach((item) => {
      ans[item.id] = item.correct;
    });

    setAnswers(ans);
    setChecked(true);
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    stopAudio();
  };

  const renderBox = (id, value) => {
    const selected = answers[id] === value;
    const wrong = wrongIds.includes(id) && selected;
    const locked = showAns || lockedIds.includes(id);

    return (
      <div
        className="unit4-interactive"
        role="checkbox"
        aria-checked={selected}
        aria-disabled={locked}
        aria-label={value ? "True" : "False"}
        tabIndex={locked ? -1 : 0}
        onClick={() => handleSelect(id, value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSelect(id, value);
          }
        }}
        style={{
          position: "relative",
          width: "38px",
          height: "38px",
          border: wrong ? "2px solid red" : "1px solid #f39b42",
          borderRadius: "6px",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: locked ? "default" : "pointer",
        }}
      >
        {selected && (
          <span
            style={{
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {value ? (
              <img src={trueIcon} alt="" style={{ height: "25px" }} />
            ) : (
              <img src={falseIcon} alt="" style={{ height: "25px" }} />
            )}
          </span>
        )}

        {/* Wrong mark on the selected box only */}
        {wrong && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "red",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
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
    );
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "45px",
        }}
      >
        <ExerciseHeader
          sectionLetter="A"
          title={
            <>
              Do the words ending in "s" have the same{" "}
              <span style={{ color: "#2e3192" }}>-s sound</span>? Listen and
              write <span style={{ color: "#D1232A" }}>✓</span> or{" "}
              <span style={{ color: "#D1232A" }}>✗</span>.
            </>
          }
          subTitle="Listen to each item more than once if needed, compare the same final -s sound across the words in each sentence, then mark whether the sounds match."
        />
        <div
          className="w-full"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <QuestionAudioPlayer
            pageId="WB_Unit9_Page56_Q1"
            src={sound1}
            captions={captions}
            stopAtSecond={11.88}
            forceStop={forceStopPlayer}
            onInteract={() => {
              stopAudio();
            }}
          />
        </div>

        {ITEMS.map((item) => (
          <div
            key={item.id}
            className="w-full"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            {/* sentence */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "700", fontSize: "22px" }}>
                {item.id}
              </span>

              <p
                className="unit4-audio-control unit4-interactive"
                role="button"
                tabIndex={0}
                aria-label={`Play: ${item.text}`}
                onClick={() => handleSentenceAudio(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleSentenceAudio(item);
                  }
                }}
                style={{
                  margin: 0,
                  fontSize: "20px",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                {item.text}
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `sentence-${item.id}`}
                />
              </p>
            </div>

            {/* choices */}
            <div style={{ display: "flex", gap: "10px" }}>
              {renderBox(item.id, true)}
              {renderBox(item.id, false)}
            </div>

            {/* wrong mark */}
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}
