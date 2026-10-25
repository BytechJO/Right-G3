import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex A 4.svg";

import Button from "../../Button";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";

const page88Audio = (file) =>
  new URL(
    `../../../assets/audio/ClassBook/Unit 10/Page 88 - Exercise A/${file}`,
    import.meta.url,
  ).href;
const wordAudio = {
  was: page88Audio("Item_001_was.mp3"),
  were: page88Audio("Item_002_were.mp3"),
  "wasn’t": page88Audio("Item_003_wasn't.mp3"),
  "weren’t": page88Audio("Item_004_weren't.mp3"),
};
const fullAudio = [1, 2, 3, 4].map((id) => page88Audio(`full${id}.mp3`));

const Review9_Page1_Q1 = () => {
  const questions = [
    { id: 1, img: img1, correct: "were", sentence: "at the park." },
    { id: 2, img: img2, correct: "wasn’t", sentence: "at the store." },
    { id: 3, img: img3, correct: "was", sentence: "at the farm." },
    { id: 4, img: img4, correct: "weren’t", sentence: "at the mall." },
  ];

  const words = ["was", "were", "wasn’t", "weren’t"];

  const [wrongIds, setWrongIds] = useState([]);
  const [answers, setAnswers] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const pronouns = {
    1: "They",
    2: "She",
    3: "He",
    4: "They",
  };

  const handleSelect = (id, value) => {
    if (revealed || lockedIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [`slot-${id}`]: value,
    }));
    setWrongIds((previous) => previous.filter((wrongId) => wrongId !== id));
  };

  const checkAnswers = () => {
    if (revealed || lockedIds.length === questions.length) return;

    const empty = questions.some((q) => !answers[`slot-${q.id}`]);

    if (empty) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    questions.forEach((q) => {
      if (answers[`slot-${q.id}`] === q.correct) {
        score++;
      }
    });

    const total = questions.length;

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

    setLockedIds(
      questions.flatMap((q) =>
        answers[`slot-${q.id}`] === q.correct ? [q.id] : [],
      ),
    );
    setWrongIds(
      questions.flatMap((q) =>
        answers[`slot-${q.id}`] !== q.correct ? [q.id] : [],
      ),
    );
  };

  const showAnswers = () => {
    const correctAnswers = {};

    questions.forEach((q) => {
      correctAnswers[`slot-${q.id}`] = q.correct;
    });

    setAnswers(correctAnswers);
    setLockedIds(questions.map((q) => q.id));
    setRevealed(true);
    setWrongIds([]);
    stopAudio();
  };

  const reset = () => {
    setAnswers({});
    setLockedIds([]);
    setRevealed(false);
    setWrongIds([]);
    stopAudio();
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
      <div className="div-forall" style={{ gap: "10px" }}>
        <ExerciseHeaderReview
          sectionLetter="A"
          title="Look, read, and write. Use the words below."
          subTitle="Use the picture, word bank, or grammar clue, then complete every blank before checking."
        />
        <div
          className="w-full"
          style={{
            display: "flex",
            // gap: "12px",
            padding: "10px",
            // border: "2px dashed #ccc",
            borderRadius: "10px",
            // marginTop: "20px",
            justifyContent: "space-around",
            width: "100%",
            // marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {words.map((word) => (
            <span
              className="bg-[#fdc791] unit4-interactive unit4-audio-control"
              key={word}
              role="button"
              tabIndex={0}
              aria-label={`Play ${word}`}
              onClick={() => playAudio(`bank-${word}`, wordAudio[word])}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  playAudio(`bank-${word}`, wordAudio[word]);
                }
              }}
              style={{
                // padding: "7px 14px",
                height: "40px",
                width: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // border: "2px solid #2c5287",
                backgroundColor: "#fdc791",
                borderRadius: "50px",
                // background: "white",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              <Unit4PlayingAudioIcon
                active={activeAudioKey === `bank-${word}`}
              />
              {word}
            </span>
          ))}
        </div>
        {/* الأسئلة */}
        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            gap: "20px",
            // justifyContent: "center",
            columnGap: "80px",
            rowGap: "20px",
          }}
        >
          {questions.map((q) => {
            const isWrong =
              wrongIds.includes(q.id) &&
              answers[`slot-${q.id}`] &&
              answers[`slot-${q.id}`] !== q.correct;

            return (
              <div
                key={q.id}
                style={{ marginBottom: "20px", position: "relative" }}
                role={lockedIds.includes(q.id) ? "button" : undefined}
                tabIndex={lockedIds.includes(q.id) ? 0 : undefined}
                className={
                  lockedIds.includes(q.id)
                    ? "unit4-audio-control unit4-full-audio-enabled"
                    : ""
                }
                onClick={() =>
                  lockedIds.includes(q.id) &&
                  playAudio(`full-${q.id}`, fullAudio[q.id - 1])
                }
                onKeyDown={(event) => {
                  if (
                    lockedIds.includes(q.id) &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    playAudio(`full-${q.id}`, fullAudio[q.id - 1]);
                  }
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `full-${q.id}`}
                />
                <div className="flex gap-3">
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {q.id}
                  </span>

                  <img
                    src={q.img}
                    alt={
                      [
                        "Children playing together at the park.",
                        "A girl outside a store.",
                        "A boy at a farm.",
                        "A group of people at the mall.",
                      ][q.id - 1]
                    }
                    style={{
                      width: "auto",
                      height: "150px",
                      objectFit: "contain",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "18px",
                    gap: "5px",
                  }}
                >
                  <span>{pronouns[q.id]}</span>

                  <div style={{ fontSize: "20px", position: "relative" }}>
                    <select
                      disabled={revealed || lockedIds.includes(q.id)}
                      onClick={(event) => event.stopPropagation()}
                      value={answers[`slot-${q.id}`] || ""}
                      onChange={(e) => handleSelect(q.id, e.target.value)}
                      style={{
                        minWidth: "120px",
                        padding: "6px 10px",
                        // borderRadius: "6px",
                        borderBottom: `1px solid ${isWrong ? "red" : "#000"}`,
                        fontSize: "18px",
                        fontWeight: "500",
                        background: "#fff",
                      }}
                    >
                      <option value="">Select</option>

                      {words.map((word) => (
                        <option key={word} value={word}>
                          {word}
                        </option>
                      ))}
                    </select>

                    {/* ❌ Wrong mark */}
                    {isWrong && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          width: "22px",
                          height: "22px",
                          background: "red",
                          color: "white",
                          borderRadius: "50%",
                          fontSize: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          border: "2px solid white",
                          boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                          pointerEvents: "none",
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </div>

                  <span>{q.sentence}</span>
                </div>
              </div>
            );
          })}
        </div>

        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Review9_Page1_Q1;
