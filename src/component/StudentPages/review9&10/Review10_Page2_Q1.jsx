import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";

const page91C = (file) =>
  new URL(
    `../../../assets/audio/ClassBook/Unit 10/Page 91 - Exercise C/${file}`,
    import.meta.url,
  ).href;
const blendAudio = {
  cr: page91C("Item_001_cr.mp3"),
  dr: page91C("Item_002_dr.mp3"),
  tr: page91C("Item_003_tr.mp3"),
};
const colorAudio = {
  red: page91C("Item_004_red.mp3"),
  blue: page91C("Item_005_blue.mp3"),
  green: page91C("Item_006_green.mp3"),
};
const wordAudio = Object.fromEntries(
  [
    ["train", "Item_007_train.mp3"],
    ["cry", "Item_008_cry.mp3"],
    ["draw", "Item_009_draw.mp3"],
    ["truck", "Item_010_truck.mp3"],
    ["crescent", "Item_011_crescent.mp3"],
    ["drop", "Item_012_drop.mp3"],
    ["tree", "Item_013_tree.mp3"],
    ["crown", "Item_014_crown.mp3"],
    ["drapes", "Item_015_drapes.mp3"],
    ["drill", "Item_016_drill.mp3"],
    ["crab", "Item_017_crab.mp3"],
    ["traffic light", "Item_018_traffic_light.mp3"],
    ["drain", "Item_019_drain.mp3"],
    ["triangle", "Item_020_triangle.mp3"],
    ["dress", "Item_021_dress.mp3"],
    ["drink", "Item_022_drink.mp3"],
    ["trash", "Item_023_trash.mp3"],
    ["crowd", "Item_024_crowd.mp3"],
    ["cream", "Item_025_cream.mp3"],
    ["driver", "Item_026_driver.mp3"],
  ].map(([word, file]) => [word, page91C(file)]),
);

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 8.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 9.svg";
import img10 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 10.svg";
import img11 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 11.svg";
import img12 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 12.svg";
import img13 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 13.svg";
import img14 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 14.svg";
import img15 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 15.svg";
import img16 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 16.svg";
import img17 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 17.svg";
import img18 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 18.svg";
import img19 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 19.svg";
import img20 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 20.svg";
import img21 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 21.svg";

const Review10_Page2_Q1 = () => {
  const options = [
    { key: "cr", color: "red" },
    { key: "dr", color: "blue" },
    { key: "tr", color: "green" },
  ];
  const questions = [
    { id: 1, img: img1, word: "train", correct: "tr" },
    { id: 2, img: img2, word: "cry", correct: "cr" },
    { id: 3, img: img3, word: "draw", correct: "dr" },
    { id: 4, img: img4, word: "truck", correct: "tr" },
    { id: 5, img: img5, word: "crescent", correct: "cr" },
    { id: 6, img: img6, word: "drop", correct: "dr" },
    { id: 7, img: img7, word: "tree", correct: "tr" },

    { id: 8, img: img8, word: "crown", correct: "cr" },
    { id: 9, img: img9, word: "drapes", correct: "dr" },
    { id: 10, img: img10, word: "drill", correct: "dr" },
    { id: 11, img: img11, word: "crab", correct: "cr" },
    { id: 12, img: img12, word: "traffic light", correct: "tr" },
    { id: 13, img: img13, word: "drain", correct: "dr" },
    { id: 14, img: img14, word: "triangle", correct: "tr" },

    { id: 15, img: img15, word: "dress", correct: "dr" },
    { id: 16, img: img16, word: "trash", correct: "tr" },
    { id: 17, img: img17, word: "crowd", correct: "cr" },
    { id: 18, img: img18, word: "cream", correct: "cr" },
    { id: 19, img: img19, word: "driver", correct: "dr" },
    { id: 20, img: img20, word: "treasure", correct: "tr" },
    { id: 21, img: img21, word: "drink", correct: "dr" },
  ];

  const [lockedIds, setLockedIds] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const showAnswers = () => {
    const corrects = {};

    questions.forEach((q) => {
      corrects[q.id] = q.correct;
    });

    setAnswers(corrects);
    setShowResult([]);
    setLockedIds(questions.map((q) => q.id));
    setRevealed(true);
    stopAudio();
  };

  const checkAnswers = () => {
    if (revealed || lockedIds.length === questions.length) return;

    const isEmpty = questions.some((q) => !answers[q.id]);

    if (isEmpty) {
      ValidationAlert.info("Please choose an answer for all questions!");
      return;
    }

    const results = questions.map((q) =>
      answers[q.id] === q.correct ? "correct" : "wrong",
    );

    setShowResult(results);
    setLockedIds(
      questions.flatMap((q) => (answers[q.id] === q.correct ? [q.id] : [])),
    );

    const correctCount = results.filter((r) => r === "correct").length;
    const total = questions.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const resultHTML = `
      <div style="font-size: 20px; text-align:center; margin-top: 8px;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(resultHTML);
    else if (correctCount === 0) ValidationAlert.error(resultHTML);
    else ValidationAlert.warning(resultHTML);
  };

  const resetAnswers = () => {
    setAnswers({});
    setShowResult([]);
    setLockedIds([]);
    setRevealed(false);
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
      <div className="div-forall" style={{ gap: "30px" }}>
        <ExerciseHeaderReview
          sectionLetter="C"
          title="Color each box according to the sound you hear in the word."
          subTitle="Listen to each word, identify its target sound, then apply the matching color carefully."
        />
        <div
          className="w-full"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            // marginBottom: "20px",
          }}
        >
          {" "}
          {options.map((opt) => (
            <div className="flex flex-col gap-1 items-center justify-center unit4-interactive unit4-audio-control">
              <button
                tabIndex={0}
                onClick={() =>
                  playAudio(`blend-${opt.key}`, blendAudio[opt.key])
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio(`blend-${opt.key}`, blendAudio[opt.key]);
                  }
                }}
                key={opt.key}
                style={{
                  backgroundColor: "#fee7ce",
                  height: "30px",
                  width: "100px",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  // color: "white",
                  margin: "10px",
                  padding: "10px 20px",
                  borderRadius: "50px",
                  cursor: "pointer",
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `blend-${opt.key}`}
                />{" "}
                {opt.key}{" "}
              </button>
              <span
                role="button"
                tabIndex={0}
                className="unit4-interactive unit4-audio-control"
                aria-label={`Play ${opt.color}`}
                onClick={() =>
                  playAudio(`color-${opt.color}`, colorAudio[opt.color])
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();

                    playAudio(`color-${opt.color}`, colorAudio[opt.color]);
                  }
                }}
                style={{
                  color: opt.color,
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `color-${opt.color}`}
                />

                {opt.color}
              </span>
            </div>
          ))}{" "}
        </div>
        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "15px",
            marginBottom: "50px",
          }}
        >
          {questions.map((q, index) => {
            const userAnswer = answers[q.id];
            const selectedOpt = options.find((o) => o.key === userAnswer);

            return (
              <div
                key={q.id}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* الصورة */}
                <div
                  role={wordAudio[q.word] ? "button" : undefined}
                  tabIndex={wordAudio[q.word] ? 0 : undefined}
                  className={
                    wordAudio[q.word]
                      ? "unit4-interactive unit4-audio-control"
                      : ""
                  }
                  onClick={() =>
                    wordAudio[q.word] &&
                    playAudio(`word-${q.id}`, wordAudio[q.word])
                  }
                  onKeyDown={(event) => {
                    if (
                      wordAudio[q.word] &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      playAudio(`word-${q.id}`, wordAudio[q.word]);
                    }
                  }}
                  style={{
                    border: "1px solid #f4a261",
                    borderRadius: "10px",
                    padding: "5px",
                    width: "100%",
                    textAlign: "center",
                    background: "#fff",
                  }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `word-${q.id}`}
                  />
                  <img
                    src={q.img}
                    alt={q.word}
                    style={{ width: "100%", height: "70px" }}
                  />

                  <div
                    style={{
                      marginTop: "5px",
                      // fontWeight: "bold",
                    }}
                  >
                    {q.word}
                  </div>
                </div>

                {/* dropdown */}
                <div
                  style={{
                    marginTop: "8px",
                    width: "80%",
                    position: "relative",
                  }}
                >
                  <select
                    disabled={revealed || lockedIds.includes(q.id)}
                    value={answers[q.id] || ""}
                    onChange={(e) => {
                      setAnswers((prev) => ({
                        ...prev,
                        [q.id]: e.target.value,
                      }));
                      setShowResult((previous) =>
                        previous.map((result, resultIndex) =>
                          resultIndex === index ? undefined : result,
                        ),
                      );
                    }}
                    style={{
                      width: "100%",
                      height: "35px",
                      borderRadius: "8px",
                      border:
                        showResult[index] === "wrong"
                          ? "2px solid red"
                          : "1px solid #f4a261",
                      // fontWeight: "bold",
                      textAlign: "center",
                      backgroundColor: userAnswer
                        ? selectedOpt?.color
                        : "white",
                      color: userAnswer ? "white" : "black",
                      cursor:
                        revealed || lockedIds.includes(q.id)
                          ? "default"
                          : "pointer",
                    }}
                  >
                    <option value="">Choose</option>

                    {options.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.key}
                      </option>
                    ))}
                  </select>

                  {/* ❌ */}
                  {showResult[index] === "wrong" && (
                    <div
                      style={{
                        position: "absolute",
                        right: "-10px",
                        top: "-8px",
                        width: "22px",
                        height: "22px",
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // fontWeight: "bold",
                        fontSize: "12px",
                        border: "2px solid white",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                        pointerEvents: "none",
                        zIndex: 2,
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

        <div className="action-buttons-container">
          <button onClick={resetAnswers} className="try-again-button">
            Start Again ↻
          </button>

          <button
            onClick={showAnswers}
            className="show-answer-btn swal-continue"
          >
            Show Answer
          </button>

          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review10_Page2_Q1;
