import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";

const AUDIO_MODULES = import.meta.glob(
  "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise C/*.mp3",
  { eager: true, query: "?url", import: "default" },
);
const audioEndingWith = (ending) =>
  Object.entries(AUDIO_MODULES).find(([path]) => path.endsWith(ending))?.[1];
const CLUE_AUDIO = [
  audioEndingWith(
    "Item_001_It_is_the_sixth_month_of_the_year_and_the_second_day_of_the_week.mp3",
  ),
  audioEndingWith(
    "Item_004_It_is_the_ninth_month_of_the_year_and_the_fifth_day_of_the_week.mp3",
  ),
];
const MONTH_PHRASE_AUDIO = audioEndingWith("Item_002_The_month_is.mp3");
const DAY_PHRASE_AUDIO = audioEndingWith("Item_003_and_the_day_is.mp3");
const FULL_AUDIO = [audioEndingWith("full1.mp3"), audioEndingWith("full2.mp3")];

const Review6_Page1_Q3 = () => {
  const months = ["June", "July", "August", "September", "October"];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const correctAnswers = [
    ["June", "Monday"],
    ["September", "Thursday"],
  ];

  const [answers, setAnswers] = useState([
    ["", ""],
    ["", ""],
  ]);

  const [showAnswer, setShowAnswer] = useState(false);
  const [lockedMarks, setLockedMarks] = useState([]);
  const [wrongMarks, setWrongMarks] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  // ================= CHANGE =================
  const handleChange = (qIndex, blankIndex, value) => {
    if (showAnswer || lockedMarks.includes(`${qIndex}-${blankIndex}`)) return;

    const updated = [...answers];
    updated[qIndex][blankIndex] = value;
    setAnswers(updated);
    setWrongMarks((previous) =>
      previous.filter((id) => id !== `${qIndex}-${blankIndex}`),
    );
  };

  // ================= SHOW =================
  const showAnswers = () => {
    setAnswers(correctAnswers);
    setShowAnswer(true);
    setLockedMarks(["0-0", "0-1", "1-0", "1-1"]);
    setWrongMarks([]);
    stopAudio();
  };

  // ================= RESET =================
  const resetAll = () => {
    setAnswers([
      ["", ""],
      ["", ""],
    ]);
    setShowAnswer(false);
    setLockedMarks([]);
    setWrongMarks([]);
    stopAudio();
  };

  // ================= CHECK =================
  const checkAnswers = () => {
    if (showAnswer || lockedMarks.length === 4) return;

    if (answers.some((q) => q.includes(""))) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let score = 0;
    let wrong = [];

    answers.forEach((q, qi) => {
      q.forEach((ans, i) => {
        if (ans === correctAnswers[qi][i]) {
          score++;
        } else {
          wrong.push(`${qi}-${i}`);
        }
      });
    });

    setWrongMarks(wrong);
    setLockedMarks(
      ["0-0", "0-1", "1-0", "1-1"].filter((id) => !wrong.includes(id)),
    );

    const total = 4;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="div-forall w-[60%]">
        <ExerciseHeaderReview
          sectionLetter="C"
          title="Read and write."
          subTitle="Read both clues carefully, then choose the month and day that satisfy both clues."
        />

        {/* QUESTIONS */}
        <div className="mt-10 space-y-30 text-[22px] w-full">
          {[0, 1].map((qIndex) => (
            <div
              key={qIndex}
              className={`unit4-audio-control ${lockedMarks.includes(`${qIndex}-0`) && lockedMarks.includes(`${qIndex}-1`) ? "unit4-full-audio-enabled" : ""}`}
              role={
                lockedMarks.includes(`${qIndex}-0`) &&
                lockedMarks.includes(`${qIndex}-1`)
                  ? "button"
                  : undefined
              }
              tabIndex={
                lockedMarks.includes(`${qIndex}-0`) &&
                lockedMarks.includes(`${qIndex}-1`)
                  ? 0
                  : -1
              }
              onClick={() =>
                lockedMarks.includes(`${qIndex}-0`) &&
                lockedMarks.includes(`${qIndex}-1`) &&
                playAudio(`full-${qIndex}`, FULL_AUDIO[qIndex])
              }
              onKeyDown={(event) => {
                if (
                  lockedMarks.includes(`${qIndex}-0`) &&
                  lockedMarks.includes(`${qIndex}-1`) &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  playAudio(`full-${qIndex}`, FULL_AUDIO[qIndex]);
                }
              }}
            >
              <Unit4PlayingAudioIcon
                active={activeAudioKey === `full-${qIndex}`}
              />
              <div
                className="mb-2 unit4-audio-control unit4-interactive"
                role="button"
                tabIndex={
                  lockedMarks.includes(`${qIndex}-0`) &&
                  lockedMarks.includes(`${qIndex}-1`)
                    ? -1
                    : 0
                }
                onClick={(event) => {
                  event.stopPropagation();
                  playAudio(`clue-${qIndex}`, CLUE_AUDIO[qIndex]);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.stopPropagation();
                    playAudio(`clue-${qIndex}`, CLUE_AUDIO[qIndex]);
                  }
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `clue-${qIndex}`}
                />
                <b>{qIndex + 1}</b>{" "}
                {qIndex === 0
                  ? "It is the sixth month of the year and the second day of the week."
                  : "It is the ninth month of the year and the fifth day of the week."}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span
                  role="button"
                  tabIndex={0}
                  className="unit4-audio-control unit4-interactive"
                  onClick={(event) => {
                    event.stopPropagation();
                    playAudio(`month-phrase-${qIndex}`, MONTH_PHRASE_AUDIO);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      playAudio(`month-phrase-${qIndex}`, MONTH_PHRASE_AUDIO);
                    }
                  }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `month-phrase-${qIndex}`}
                  />
                  The month is
                </span>

                {/* MONTH DROPDOWN */}
                <div style={{ position: "relative", display: "inline-block" }}>
                  <select
                    disabled={showAnswer || lockedMarks.includes(`${qIndex}-0`)}
                    value={answers[qIndex][0]}
                    onChange={(e) => handleChange(qIndex, 0, e.target.value)}
                    style={{
                      borderBottom: wrongMarks.includes(`${qIndex}-0`)
                        ? "2px solid red"
                        : "1px solid black",
                      fontWeight: "bold",
                      padding: "4px",
                      // color: "#1C398E",
                    }}
                  >
                    <option value=""></option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>

                  {/* ✕ icon */}
                  {wrongMarks.includes(`${qIndex}-0`) && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        width: "24px",
                        height: "24px",
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
                      }}
                    >
                      ✕
                    </span>
                  )}
                </div>

                <span
                  role="button"
                  tabIndex={0}
                  className="unit4-audio-control unit4-interactive"
                  onClick={(event) => {
                    event.stopPropagation();
                    playAudio(`day-phrase-${qIndex}`, DAY_PHRASE_AUDIO);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      playAudio(`day-phrase-${qIndex}`, DAY_PHRASE_AUDIO);
                    }
                  }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `day-phrase-${qIndex}`}
                  />
                  , and the day is
                </span>

                {/* DAY DROPDOWN */}
                <div style={{ position: "relative", display: "inline-block" }}>
                  <select
                    value={answers[qIndex][1]}
                    disabled={showAnswer || lockedMarks.includes(`${qIndex}-1`)}
                    onChange={(e) => handleChange(qIndex, 1, e.target.value)}
                    style={{
                      borderBottom: wrongMarks.includes(`${qIndex}-1`)
                        ? "2px solid red"
                        : "1px solid black",
                      fontWeight: "bold",
                      padding: "4px",
                      // color: "#1C398E",
                    }}
                  >
                    <option value=""></option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  {wrongMarks.includes(`${qIndex}-1`) && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        width: "24px",
                        height: "24px",
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
                      }}
                    >
                      ✕
                    </span>
                  )}
                </div>

                <span>.</span>
              </div>

              <div className="border-b mt-2"></div>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container mt-6">
        <button onClick={resetAll} className="try-again-button">
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

export default Review6_Page1_Q3;
