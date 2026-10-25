import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

import stellaImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/1.svg";
import yesAudio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise E/Item_001_Yes,_she_will.mp3";
import noAudio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise E/Item_002_No,_she_won't.mp3";
import tripAudio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise E/Item_003_Trip_to_the_Grand_Canyon.mp3";
import takeAudio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise E/Item_004_Things_to_Take.mp3";
import notTakeAudio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise E/Item_005_Things_Not_to_Take.mp3";
import q1Audio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise E/Item_006_Will_Stella_take_her_bag_on_the_trip_tomorrow.mp3";
import q2Audio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise E/Item_007_Will_she_take_her_red_skirt_on_the_trip.mp3";
import q3Audio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise E/Item_008_Will_she_take_an_umbrella.mp3";
import q4Audio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise E/Item_009_Will_she_take_her_shoes.mp3";
import q5Audio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise E/Item_010_Will_she_take_her_lunchbox.mp3";
import q6Audio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise E/Item_011_Will_she_take_her_green_shirt.mp3";

const WRONG_COLOR = "red";
const ACTIVE_COLOR = "#f39b42";
const RED_COLOR = "#000000ff";
const LINE_COLOR = "#333";

const QUESTIONS = [
  {
    id: 1,
    text: "Will Stella take her bag on the trip tomorrow?",
    correct: "Yes, she will.",
    audio: q1Audio,
  },
  {
    id: 2,
    text: "Will she take her red skirt on the trip?",
    correct: "No, she won't.",
    audio: q2Audio,
  },
  {
    id: 3,
    text: "Will she take an umbrella?",
    correct: "Yes, she will.",
    audio: q3Audio,
  },
  {
    id: 4,
    text: "Will she take her shoes?",
    correct: "Yes, she will.",
    audio: q4Audio,
  },
  {
    id: 5,
    text: "Will she take her lunchbox?",
    correct: "Yes, she will.",
    audio: q5Audio,
  },
  {
    id: 6,
    text: "Will she take her green shirt?",
    correct: "No, she won't.",
    audio: q6Audio,
  },
];

const ANSWER_OPTIONS = ["Yes, she will.", "No, she won't."];
const ANSWER_AUDIO = { "Yes, she will.": yesAudio, "No, she won't.": noAudio };

export default function WB_Unit8_Page59_QE() {
  const [selected, setSelected] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleChange = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setSelected((prev) => ({ ...prev, [id]: value }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === QUESTIONS.length) return;
    const allAnswered = QUESTIONS.every((q) => selected[q.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selected[q.id] === q.correct) score++;
    });
    setShowResults(true);
    setLockedIds(
      QUESTIONS.filter((q) => selected[q.id] === q.correct).map((q) => q.id),
    );
    const total = QUESTIONS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    QUESTIONS.forEach((q) => {
      filled[q.id] = q.correct;
    });
    setSelected(filled);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(QUESTIONS.map((q) => q.id));
  };

  const handleStartAgain = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
    stopAudio();
  };

  const isWrong = (q) =>
    showResults && !showAns && selected[q.id] !== q.correct;

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px,2vw,22px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="E"
          title="Read, look, and write."
          subTitle="Use the Yes, she will or No, she won’t answer from the packing list to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        {/* ── Top layout: Stella | Take | Not Take ── */}

        {/* Stella */}

        <div className="w-full" style={{ position: "relative", width: "80%" }}>
          <img
            src={stellaImg}
            alt="Stella's Grand Canyon trip packing list, showing things to take and things not to take"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              userSelect: "none",
            }}
          />
          {[
            {
              key: "yes",
              label: "yes,she will",
              source: yesAudio,
              left: "37%",
              top: "0%",
              height: "22%",
              width: "19%",
            },
            {
              key: "no",
              label: "no,she won't",
              source: noAudio,
              left: "68%",
              top: "0%",
              height: "22%",
              width: "21%",
            },
            {
              key: "trip",
              label: "Trip to the Grand Canyon",
              source: tripAudio,
              left: "41%",
              top: "21%",
              height: "22%",
              width: "35%",
            },
            {
              key: "take",
              label: "Things to Take",
              source: takeAudio,
              left: "20%",
              top: "42%",
              height: "55%",
              width: "32%",
            },
            {
              key: "not-take",
              label: "Things Not to Take",
              source: notTakeAudio,
              left: "56%",
              top: "42%",
              width: "42%",
              height: "55%",
            },
          ].map((area) => (
            <button
              key={area.key}
              type="button"
              className="unit4-audio-control unit4-interactive"
              aria-label={`Play: ${area.label}`}
              onClick={() => playAudio(`heading-${area.key}`, area.source)}
              style={{
                position: "absolute",
                top: area.top,
                left: area.left,
                width: area.width,
                height: area.height,
                border: "1px solid transparent",
                borderRadius: "10px",
                background: "transparent",
                color: "transparent",
                cursor: "pointer",
              }}
            >
              {area.label}
              <Unit4PlayingAudioIcon
                active={activeAudioKey === `heading-${area.key}`}
              />
            </button>
          ))}
        </div>

        {/* ── Questions with dropdown ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "100%",
          }}
        >
          {QUESTIONS.map((q) => {
            const wrong = isWrong(q);
            return (
              <div
                key={q.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(8px,1.2vw,16px)",
                  minWidth: 0,
                  flexWrap: "wrap",
                }}
              >
                {/* number */}
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#111",
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: "clamp(14px,1.8vw,22px)",
                  }}
                >
                  {q.id}
                </span>

                {/* question text */}
                <span
                  className="unit4-audio-control"
                  role="button"
                  tabIndex={0}
                  aria-label={`Play: ${q.text}`}
                  onClick={() => playAudio(`question-${q.id}`, q.audio)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`question-${q.id}`, q.audio);
                    }
                  }}
                  style={{
                    fontSize: "18px",
                    // fontWeight: 500,
                    color: "#222",
                    lineHeight: 1.35,
                    // flex:      1,
                    width: "400px",
                    wordBreak: "break-word",
                  }}
                >
                  {q.text}
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `question-${q.id}`}
                  />
                </span>

                {/* dropdown */}
                <div
                  style={{
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <select
                    disabled={showAns || lockedIds.includes(q.id)}
                    value={selected[q.id] || ""}
                    onChange={(e) => {
                      handleChange(q.id, e.target.value);
                    }}
                    style={{
                      minWidth: "clamp(140px,20vw,240px)",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      borderBottom: wrong
                        ? `2px solid ${WRONG_COLOR}`
                        : `1px solid ${LINE_COLOR}`,
                      borderRadius: 0,
                      fontSize: "18px",
                      // fontWeight:   600,
                      color: RED_COLOR,
                      padding: "0 clamp(4px,0.6vw,8px) 4px 2px",
                      background: "transparent",
                      cursor: showAns ? "default" : "pointer",
                      appearance: "auto",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="" disabled hidden></option>
                    {ANSWER_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `answer-${q.id}`}
                  />

                  {/* wrong badge — يسار أعلى */}
                  {wrong && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
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
              </div>
            );
          })}
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
