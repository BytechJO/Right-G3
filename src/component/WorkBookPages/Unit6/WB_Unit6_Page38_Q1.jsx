import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

import roomImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/A.1.svg";
const BORDER_COLOR = "#e0e0e0";
const WRONG_COLOR = "#ef4444";
const CHECK_COLOR = "#ef4444";
import trueIcon from "../../../assets/imgs/true.svg";
import falseAudio from "../../../assets/audio/WorkBook/unit6/Page 38 - Exercise A/Item_001_False.mp3";
import trueAudio from "../../../assets/audio/WorkBook/unit6/Page 38 - Exercise A/Item_002_True.mp3";
import sentence1Audio from "../../../assets/audio/WorkBook/unit6/Page 38 - Exercise A/Item_003_The_cat_is_playing_with_a_flag.mp3";
import sentence3Audio from "../../../assets/audio/WorkBook/unit6/Page 38 - Exercise A/Item_004_There_are_flowers_on_the_chair.mp3";
import sentence4Audio from "../../../assets/audio/WorkBook/unit6/Page 38 - Exercise A/Item_005_There_are_plates_on_the_table.mp3";
const ITEMS = [
  { id: 1, text: "The cat is playing with a flag.", correct: "false" },
  { id: 2, text: "The man is sleeping.", correct: "true" },
  { id: 3, text: "There are flowers on the chair.", correct: "false" },
  { id: 4, text: "There are plates on the table.", correct: "true" },
];
const OPTION_AUDIO = { true: trueAudio, false: falseAudio };
const SENTENCE_AUDIO = {
  1: sentence1Audio,
  3: sentence3Audio,
  4: sentence4Audio,
};
const itemAudioKey = (id, value) => `${id}-${value}`;

export default function WB_TrueFalse_PageA() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, value) => {
    playAudio(`option-${itemAudioKey(id, value)}`, OPTION_AUDIO[value]);
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({
      ...prev,
      [id]: prev[id] === value ? undefined : value,
    }));
    setWrongIds((previous) => previous.filter((wrongId) => wrongId !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((i) => answers[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((i) => {
      if (answers[i.id] === i.correct) score++;
    });
    setShowResults(true);
    setLockedIds((previous) => [
      ...new Set([
        ...previous,
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
    const total = ITEMS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => {
      filled[i.id] = i.correct;
    });
    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    stopAudio();
  };

  const isWrong = (item) =>
    showResults && !showAns && wrongIds.includes(item.id);

  // ── Checkbox component ──
  const renderCheckbox = (item, value) => {
    const selected = answers[item.id] === value;
    const wrong = isWrong(item) && selected;
    const showCheck = selected;

    return (
      <div
        onClick={() => handleSelect(item.id, value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSelect(item.id, value);
          }
        }}
        role="button"
        tabIndex={lockedIds.includes(item.id) ? -1 : 0}
        aria-pressed={selected}
        aria-disabled={lockedIds.includes(item.id) || showAns}
        className="unit4-audio-control unit4-interactive"
        style={{
          position: "relative",
          width: "45px",
          height: "45px",
          border: wrong ? `2px solid ${WRONG_COLOR}` : "1px solid gray",
          borderRadius: "clamp(5px,0.6vw,8px)",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor:
            showAns || lockedIds.includes(item.id) ? "default" : "pointer",
          boxSizing: "border-box",
          flexShrink: 0,
          transition: "border-color 0.2s",
        }}
      >
        <Unit4PlayingAudioIcon
          active={activeAudioKey === `option-${itemAudioKey(item.id, value)}`}
        />
        {/* checkmark */}
        {showCheck && (
          <span
            style={{
              fontSize: "clamp(18px,2.8vw,36px)",
              fontWeight: 900,
              color: wrong ? WRONG_COLOR : CHECK_COLOR,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            <img src={trueIcon} alt="" style={{ height: "25px" }} />
          </span>
        )}

        {/* wrong badge */}
        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-7px",
              right: "-7px",
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
          gap: "23px",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="A"
          title={
            <>
              Look, read, and write <span style={{ color: "#D1232A" }}>✓</span>{" "}
              for <span style={{ color: "#2e3192" }}>true</span> or{" "}
              <span style={{ color: "#2e3192" }}>false</span>.
            </>
          }
          subTitle="Read each room-scene statement carefully, use the picture or sentence evidence to check it, then choose the correct Yes/No or True/False response."
        />

        {/* Room image */}
        <img
          src={roomImg}
          alt="A living room where a man sleeps on a sofa, a cat plays by a flag, flowers sit on a table, and plates are on a shelf"
          style={{
            width: "auto",
            height: "190px",
            display: "block",
            margin: "0 auto",
          }}
        />

        {/* Table: sentences + True + False */}
        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr clamp(60px,10vw,120px) clamp(60px,10vw,120px)",
              gap: "clamp(8px,1vw,14px)",
              marginBottom: "clamp(8px,1vw,12px)",
              paddingRight: "clamp(4px,0.5vw,8px)",
            }}
          >
            <div />
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                // fontWeight: 700,
                color: "#111",
              }}
            >
              True
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                // fontWeight: 700,
                color: "#111",
              }}
            >
              False
            </div>
          </div>

          {/* Item rows */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {ITEMS.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr clamp(60px,10vw,120px) clamp(60px,10vw,120px)",
                  gap: "clamp(8px,1vw,14px)",
                  alignItems: "center",
                }}
              >
                {/* sentence */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    minWidth: 0,
                  }}
                >
                  <span
                    className={
                      SENTENCE_AUDIO[item.id]
                        ? "unit4-audio-control unit4-interactive"
                        : ""
                    }
                    role={SENTENCE_AUDIO[item.id] ? "button" : undefined}
                    tabIndex={SENTENCE_AUDIO[item.id] ? 0 : undefined}
                    onClick={() =>
                      playAudio(`sentence-${item.id}`, SENTENCE_AUDIO[item.id])
                    }
                    onKeyDown={(event) => {
                      if (
                        SENTENCE_AUDIO[item.id] &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        playAudio(
                          `sentence-${item.id}`,
                          SENTENCE_AUDIO[item.id],
                        );
                      }
                    }}
                    style={{
                      fontSize: "20px",
                      fontWeight: 500,
                      color: "#111",
                      lineHeight: 1,
                      flexShrink: 0,
                      minWidth: "clamp(14px,1.8vw,24px)",
                    }}
                  >
                    {item.id}
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      // fontWeight: 500,
                      color: "#111",
                      lineHeight: 1.35,
                      wordBreak: "break-word",
                      transition: "color 0.2s",
                      position: "relative",
                      cursor: SENTENCE_AUDIO[item.id] ? "pointer" : "default",
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `sentence-${item.id}`}
                    />
                    {item.text}
                  </span>
                </div>

                {/* True checkbox */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {renderCheckbox(item, "true")}
                </div>

                {/* False checkbox */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {renderCheckbox(item, "false")}
                </div>
              </div>
            ))}
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
