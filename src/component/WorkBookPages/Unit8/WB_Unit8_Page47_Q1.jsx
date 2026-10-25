import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import audio1 from "../../../assets/audio/WorkBook/unit8/Page 47 - Exercise E/Item_001_There_..._horses_on_Grandpa's_farm.mp3";
import audio2 from "../../../assets/audio/WorkBook/unit8/Page 47 - Exercise E/Item_002_a_tractor_on_Grandpa's_farm.mp3";
import audio3 from "../../../assets/audio/WorkBook/unit8/Page 47 - Exercise E/Item_003_a_dog_on_Grandpa's_farm.mp3";
import audio4 from "../../../assets/audio/WorkBook/unit8/Page 47 - Exercise E/Item_004_goats_on_Grandpa's_farm.mp3";
import audio5 from "../../../assets/audio/WorkBook/unit8/Page 47 - Exercise E/Item_005_cows_on_Grandpa's_farm.mp3";
import audio6 from "../../../assets/audio/WorkBook/unit8/Page 47 - Exercise E/Item_006_chickens_on_Grandpa's_farm.mp3";
import audio7 from "../../../assets/audio/WorkBook/unit8/Page 47 - Exercise E/Item_007_a_barn_on_Grandpa's_farm.mp3";
import audio8 from "../../../assets/audio/WorkBook/unit8/Page 47 - Exercise E/Item_008_a_big_tree_on_Grandpa's_farm.mp3";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/1.svg";
import trueIcon from "../../../assets/imgs/true.svg";
const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";

const OPTIONS = ["was", "were", "wasn't"];

const SENTENCES = [
  {
    id: 1,
    word: "horses",
    checkedAnswer: true,
    start: "There",
    firstAnswer: "were",
    end: "horses on Grandpa’s farm.",
    audio: audio1,
  },
  {
    id: 2,
    word: "tractor",
    checkedAnswer: false,
    start: "There",
    firstAnswer: "wasn't",
    end: "a tractor on Grandpa’s farm.",
    audio: audio2,
  },
  {
    id: 3,
    word: "dog",
    checkedAnswer: true,
    start: "There",
    firstAnswer: "was",
    end: "a dog on Grandpa’s farm.",
    audio: audio3,
  },
  {
    id: 4,
    word: "goats",
    checkedAnswer: true,
    start: "There",
    firstAnswer: "were",
    end: "goats on Grandpa’s farm.",
    audio: audio4,
  },
  {
    id: 5,
    word: "cows",
    checkedAnswer: true,
    start: "There",
    firstAnswer: "were",
    end: "cows on Grandpa’s farm.",
    audio: audio5,
  },
  {
    id: 6,
    word: "chickens",
    checkedAnswer: true,
    start: "There",
    firstAnswer: "were",
    end: "chickens on Grandpa’s farm.",
    audio: audio6,
  },
  {
    id: 7,
    word: "barn",
    checkedAnswer: true,
    start: "There",
    firstAnswer: "was",
    end: "a barn on Grandpa’s farm.",
    audio: audio7,
  },
  {
    id: 8,
    word: "big tree",
    checkedAnswer: false,
    start: "There",
    firstAnswer: "wasn't",
    end: "a big tree on Grandpa’s farm.",
    audio: audio8,
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

export default function WB_Unit8_Page46_QD() {
  const [answers, setAnswers] = useState({});
  const [checks, setChecks] = useState({});
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

  const handleCheckBox = (id) => {
    if (showAns || lockedIds.includes(id)) return;

    setChecks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setWrongIds((previous) => previous.filter((itemId) => itemId !== id));
  };

  const isCorrect = (item) => {
    return (
      answers[item.id] === item.firstAnswer &&
      checks[item.id] === item.checkedAnswer
    );
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === SENTENCES.length) return;

    const allSelectsAnswered = SENTENCES.every((item) => answers[item.id]);

    if (!allSelectsAnswered) {
      ValidationAlert.info("Please complete all selects first.");
      return;
    }

    let score = 0;

    SENTENCES.forEach((item) => {
      if (isCorrect(item)) score++;
    });

    setLockedIds(
      SENTENCES.flatMap((item) => (isCorrect(item) ? [item.id] : [])),
    );
    setWrongIds(
      SENTENCES.flatMap((item) => (!isCorrect(item) ? [item.id] : [])),
    );

    const total = SENTENCES.length;

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const solvedAnswers = {};
    const solvedChecks = {};

    SENTENCES.forEach((item) => {
      solvedAnswers[item.id] = item.firstAnswer;
      solvedChecks[item.id] = item.checkedAnswer;
    });

    setAnswers(solvedAnswers);
    setChecks(solvedChecks);

    setShowAns(true);
    setLockedIds(SENTENCES.map((item) => item.id));
    setWrongIds([]);
    stopAudio();
  };
  const handleStartAgain = () => {
    setAnswers({});
    setChecks({});
    setLockedIds([]);
    setWrongIds([]);
    setShowAns(false);
    stopAudio();
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "clamp(18px,2.5vw,28px)",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="E"
          title={
            <>
              Look and write <span style={{ color: "#D1232A" }}>✓</span>. Then
              write sentences.
            </>
          }
          subTitle="Use the what was and wasn’t on Grandpa’s farm to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        {/* Top Checkboxes */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "22px",
            justifyContent: "space-evenly",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "22px",
              alignItems: "flex-start",
            }}
          >
            {SENTENCES.map((item) => {
              const checkWrong =
                wrongIds.includes(item.id) &&
                checks[item.id] !== item.checkedAnswer;

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#111",
                    }}
                  >
                    {item.word}
                  </span>

                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <div
                      role="button"
                      tabIndex={showAns || lockedIds.includes(item.id) ? -1 : 0}
                      aria-disabled={showAns || lockedIds.includes(item.id)}
                      aria-label={`Mark ${item.word} as present on the farm`}
                      onClick={() => handleCheckBox(item.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleCheckBox(item.id);
                        }
                      }}
                      style={{
                        width: "35px",
                        height: "35px",
                        border: checkWrong
                          ? `2px solid ${WRONG_COLOR}`
                          : `1px solid ${BORDER_COLOR}`,
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor:
                          showAns || lockedIds.includes(item.id)
                            ? "default"
                            : "pointer",
                        // background: "#fff",
                        // color: "#ef4444",
                        // fontWeight: 700,
                        // fontSize: "18px",
                        userSelect: "none",
                      }}
                    >
                      {checks[item.id] ? (
                        <img
                          src={trueIcon}
                          alt="Selected"
                          style={{ height: "25px" }}
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    {checkWrong && <ErrorBadge />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2">
          {/* Sentences */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            {SENTENCES.map((item) => {
              const wrong = wrongIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  className="unit4-audio-control unit4-interactive"
                  onClick={() => playAudio(`sentence-${item.id}`, item.audio)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`sentence-${item.id}`, item.audio);
                    }
                  }}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(8px,1vw,12px)",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#111",
                    }}
                  >
                    {item.start}
                  </span>

                  {/* Select */}
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <select
                      disabled={showAns || lockedIds.includes(item.id)}
                      onClick={(event) => event.stopPropagation()}
                      onKeyDown={(event) => event.stopPropagation()}
                      value={answers[item.id] || ""}
                      onChange={(e) => handleSelect(item.id, e.target.value)}
                      style={{
                        minWidth: "110px",
                        minHeight: "36px",
                        borderBottom:
                          wrong && answers[item.id] !== item.firstAnswer
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

                    {wrong && answers[item.id] !== item.firstAnswer && (
                      <ErrorBadge />
                    )}
                  </div>

                  <span
                    style={{
                      fontSize: "18px",
                      color: "#111",
                    }}
                  >
                    {item.end}
                  </span>
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `sentence-${item.id}`}
                  />
                </div>
              );
            })}
          </div>
          <img
            src={img1}
            alt="Grandpa’s farm with animals, a barn, and a tractor"
            style={{ height: "350px", width: "auto" }}
          />
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
