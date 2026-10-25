import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import introAudio from "../../../assets/audio/WorkBook/unit8/Page 47 - Exercise F/Item_001_My_father_was_a_farmer._We_had_dogs,_sheep,_and_goats._I_had_a_horse.mp3";
import audio1 from "../../../assets/audio/WorkBook/unit8/Page 47 - Exercise F/Item_002_There_was_..._on_the_farm.mp3";
import audio2 from "../../../assets/audio/WorkBook/unit8/Page 47 - Exercise F/Item_003_There_wasn't_..._on_the_farm.mp3";
import audio3 from "../../../assets/audio/WorkBook/unit8/Page 47 - Exercise F/Item_004_They_had_..._on_the_farm.mp3";
import audio4 from "../../../assets/audio/WorkBook/unit8/Page 47 - Exercise F/Item_005_They_didn't_have.mp3";

import boyImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/2.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";

const OPTIONS = ["a horse", "a TV", "dogs, sheep, and goats", "a cat"];

const QUESTIONS = [
  {
    id: 1,
    before: "There was",
    answer: "a horse",
    after: "on the farm.",
    audio: audio1,
  },
  {
    id: 2,
    before: "There wasn't",
    answer: "a TV",
    after: "on the farm.",
    audio: audio2,
  },
  {
    id: 3,
    before: "They had",
    answer: "dogs, sheep, and goats",
    after: "on the farm.",
    audio: audio3,
  },
  {
    id: 4,
    before: "They didn't have",
    answer: "a cat",
    after: "on the farm.",
    audio: audio4,
  },
];

const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: "-8px",
      right: "-8px",
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
      pointerEvents: "none",
      zIndex: 5,
    }}
  >
    ✕
  </div>
);

export default function WB_Page47_F() {
  const [answers, setAnswers] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setWrongIds((previous) => previous.filter((itemId) => itemId !== id));
  };

  const isComplete = (q) => {
    return answers[q.id];
  };

  const isCorrect = (q) => {
    return answers[q.id] === q.answer;
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === QUESTIONS.length) return;

    const allAnswered = QUESTIONS.every((q) => isComplete(q));

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    QUESTIONS.forEach((q) => {
      if (isCorrect(q)) score++;
    });

    setLockedIds(
      QUESTIONS.flatMap((question) =>
        isCorrect(question) ? [question.id] : [],
      ),
    );
    setWrongIds(
      QUESTIONS.flatMap((question) =>
        !isCorrect(question) ? [question.id] : [],
      ),
    );

    const total = QUESTIONS.length;

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const solved = {};

    QUESTIONS.forEach((q) => {
      solved[q.id] = q.answer;
    });

    setAnswers(solved);
    setShowAns(true);
    setLockedIds(QUESTIONS.map((question) => question.id));
    setWrongIds([]);
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setLockedIds([]);
    setWrongIds([]);
    setShowAns(false);
    stopAudio();
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall mb-5"
        style={{
          gap: "10px",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="F"
          title="Read and write."
          subTitle="Use the there was/wasn’t and had/didn’t have items on the farm to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />
        <div className="flex flex-col gap-5 w-full">
          <div
            role="button"
            tabIndex={0}
            className="unit4-audio-control unit4-interactive"
            onClick={() => playAudio("intro", introAudio)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                playAudio("intro", introAudio);
              }
            }}
          >
            <Unit4PlayingAudioIcon active={activeAudioKey === "intro"} />
            <img
              src={boyImg}
              alt="A man remembering the animals and objects on his childhood farm"
              style={{
                width: "100%",
                height: "280px",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Questions */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            {QUESTIONS.map((q) => {
              const wrong = wrongIds.includes(q.id);

              return (
                <div
                  key={q.id}
                  role="button"
                  tabIndex={0}
                  className="unit4-audio-control unit4-interactive"
                  onClick={() => playAudio(`sentence-${q.id}`, q.audio)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`sentence-${q.id}`, q.audio);
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#111",
                    }}
                  >
                    {q.id}
                  </span>

                  {/* Before */}
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#111",
                    }}
                  >
                    {q.before}
                  </span>

                  {/* Select */}
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <select
                      disabled={showAns || lockedIds.includes(q.id)}
                      onClick={(event) => event.stopPropagation()}
                      onKeyDown={(event) => event.stopPropagation()}
                      value={answers[q.id] || ""}
                      onChange={(e) => handleSelect(q.id, e.target.value)}
                      style={{
                        minWidth: "220px",
                        minHeight: "38px",
                        borderBottom: wrong
                          ? `2px solid ${WRONG_COLOR}`
                          : `1px solid ${BORDER_COLOR}`,
                        padding: "4px 8px",
                        fontSize: "18px",
                        background: "#fff",
                        color: "#111",
                      }}
                    >
                      <option value="">Select</option>

                      {OPTIONS.map((op) => (
                        <option key={op} value={op}>
                          {op}
                        </option>
                      ))}
                    </select>

                    {wrong && <ErrorBadge />}
                  </div>

                  {/* After */}
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#111",
                    }}
                  >
                    {q.after}
                  </span>
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `sentence-${q.id}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(6px,1vw,12px)",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}
