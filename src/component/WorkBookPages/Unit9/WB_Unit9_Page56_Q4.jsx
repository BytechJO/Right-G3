import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";

import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";

import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd12pg56instruction2-adult-lady_tx74LOXb.mp3";

import audio1 from "../../../assets/audio/ClassBook/Grade 3/Pg56_2.1_Adult Lady.mp3";
import audio2 from "../../../assets/audio/ClassBook/Grade 3/Pg56_2.2_Adult Lady.mp3";
import audio3 from "../../../assets/audio/ClassBook/Grade 3/Pg56_2.3_Adult Lady.mp3";
import audio4 from "../../../assets/audio/ClassBook/Grade 3/Pg56_2.4_Adult Lady.mp3";
import audio5 from "../../../assets/audio/ClassBook/Grade 3/Pg56_2.5_Adult Lady.mp3";
import audio6 from "../../../assets/audio/ClassBook/Grade 3/Pg56_2.6_Adult Lady.mp3";

const WRONG_COLOR = "red";

const ITEMS = [
  {
    id: 1,
    text: "please, trees",
    correct: true,
    audio: audio1,
  },
  {
    id: 2,
    text: "boxes, socks",
    correct: false,
    audio: audio2,
  },
  {
    id: 3,
    text: "ropes, boats",
    correct: true,
    audio: audio3,
  },
  {
    id: 4,
    text: "noses, caps",
    correct: false,
    audio: audio4,
  },
  {
    id: 5,
    text: "stones, bones",
    correct: true,
    audio: audio5,
  },
  {
    id: 6,
    text: "bats, cubs",
    correct: false,
    audio: audio6,
  },
];

const captions = [
  {
    start: 0.36,
    end: 4.58,
    text: "Page 56. Phonics. Exercise D.",
  },
  {
    start: 4.58,
    end: 7.96,
    text: "Do they both have the same S sound?",
  },
  {
    start: 7.96,
    end: 11.62,
    text: "Listen and write check or X.",
  },
  {
    start: 13.56,
    end: 16.58,
    text: "1- please, trees.",
  },
  {
    start: 17.68,
    end: 20.64,
    text: "2- boxes, socks.",
  },
  {
    start: 21.7,
    end: 24.94,
    text: "3- ropes, boats.",
  },
  {
    start: 26.18,
    end: 29.54,
    text: "4- noses, caps.",
  },
  {
    start: 29.54,
    end: 34.1,
    text: "5- stones, bones.",
  },
  {
    start: 34.1,
    end: 38.1,
    text: "6- bats, cubs.",
  },
];

const ErrorBadge = () => (
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      top: "-8px",
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
);

export default function Phonics_Page56_QD() {
  const [answers, setAnswers] = useState({});
  const [, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);

  const [forceStopPlayer, setForceStopPlayer] = useState(0);

  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  // Play individual question audio and stop the main player.
  const handleItemAudio = (item) => {
    setForceStopPlayer((prev) => prev + 1);

    playAudio(`item-${item.id}`, item.audio);
  };

  // Select an answer.
  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;

    setChecked(false);

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setWrongIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  // Check answers.
  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[item.id] !== undefined);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first! ✏️");
      return;
    }

    let correct = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        correct++;
      }
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

    if (correct === ITEMS.length) {
      ValidationAlert.success(`Score: ${correct} / ${ITEMS.length}`);
    } else if (correct > 0) {
      ValidationAlert.warning(`Score: ${correct} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${correct} / ${ITEMS.length}`);
    }
  };

  // Show correct answers.
  const handleShowAnswer = () => {
    const correctMap = {};

    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
    setChecked(false);
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
  };

  // Reset.
  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);

    stopAudio();
  };

  const isWrong = (item) => wrongIds.includes(item.id);

  return (
    <div className="main-container-component">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="D"
          title={
            <>
              Do they both have the same{" "}
              <span style={{ color: "#2e3192" }}>-s sound</span>? Listen and
              write <span style={{ color: "#D1232A" }}>✓</span> or{" "}
              <span style={{ color: "#D1232A" }}>✗</span>.
            </>
          }
          subTitle="Listen to each item more than once if needed, compare the whether each pair has the same final -s sound, then mark whether the sounds match."
        />

        {/* Main Audio Player */}
        <div
          className="w-full"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <QuestionAudioPlayer
            pageId="WB_Unit9_Page56_Q4"
            src={sound1}
            captions={captions}
            stopAtSecond={11.62}
            forceStop={forceStopPlayer}
            onInteract={() => {
              stopAudio();
            }}
          />
        </div>

        {/* Questions */}
        <div
          className="w-full"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "clamp(24px,5vw,70px)",
            marginTop: "8px",
          }}
        >
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const locked = showAns || lockedIds.includes(item.id);

            return (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "clamp(8px,1.2vw,14px)",
                }}
              >
                {/* Individual question audio */}
                <div
                  className="unit4-audio-control unit4-interactive"
                  role="button"
                  tabIndex={0}
                  aria-label={`Play: ${item.text}`}
                  onClick={() => handleItemAudio(item)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();

                      handleItemAudio(item);
                    }
                  }}
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "5px 8px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 500,
                      color: "#222",
                    }}
                  >
                    {item.id}
                  </span>

                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `item-${item.id}`}
                  />
                </div>

                {/* Answer boxes */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    position: "relative",
                  }}
                >
                  {/* True box */}
                  <div
                    className="unit4-interactive"
                    role="checkbox"
                    aria-label={`Question ${item.id}: same sound`}
                    aria-checked={answers[item.id] === true}
                    aria-disabled={locked}
                    tabIndex={locked ? -1 : 0}
                    onClick={() => handleSelect(item.id, true)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();

                        handleSelect(item.id, true);
                      }
                    }}
                    style={{
                      width: "45px",
                      height: "45px",
                      border: `1px solid ${
                        answers[item.id] === true
                          ? wrong
                            ? WRONG_COLOR
                            : "#f39b42"
                          : "#ababab"
                      }`,
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: locked ? "default" : "pointer",
                      transition: "0.2s",
                      position: "relative",
                    }}
                  >
                    {answers[item.id] === true && (
                      <img src={trueIcon} alt="" style={{ height: "25px" }} />
                    )}

                    {wrong && answers[item.id] === true && <ErrorBadge />}
                  </div>

                  {/* False box */}
                  <div
                    className="unit4-interactive"
                    role="checkbox"
                    aria-label={`Question ${item.id}: different sound`}
                    aria-checked={answers[item.id] === false}
                    aria-disabled={locked}
                    tabIndex={locked ? -1 : 0}
                    onClick={() => handleSelect(item.id, false)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();

                        handleSelect(item.id, false);
                      }
                    }}
                    style={{
                      width: "45px",
                      height: "45px",
                      border: `1px solid ${
                        answers[item.id] === false
                          ? wrong
                            ? WRONG_COLOR
                            : "#f39b42"
                          : "#ababab"
                      }`,
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: locked ? "default" : "pointer",
                      transition: "0.2s",
                      position: "relative",
                    }}
                  >
                    {answers[item.id] === false && (
                      <img src={falseIcon} alt="" style={{ height: "25px" }} />
                    )}

                    {wrong && answers[item.id] === false && <ErrorBadge />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-center">
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
