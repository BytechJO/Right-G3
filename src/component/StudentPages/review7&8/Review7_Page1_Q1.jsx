import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review7_Page1_Q1.css";

import imgA from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 1.svg";
import imgB from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 2.svg";
import imgC from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 3.svg";
import imgD from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 4.svg";
import imgE from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 5.svg";
import imgF from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 6.svg";
import big from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Asset 17.svg";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import audioA from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise A/Item_001_I_can't_see_you.mp3";
import audioB from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise A/Item_002_Can_you_hear_me.mp3";
import audioC from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise A/Item_003_Look_at_me!.mp3";
import audioD from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise A/Item_004_Please,_help_me!.mp3";
import audioE from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise A/Item_005_We_can_see_it.mp3";
import audioF from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise A/Item_006_I'm_drawing_her.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const Review7_Page1_Q1 = () => {
  const wordBank = ["A", "B", "C", "D", "E", "F"];
  const questions = [
    { id: 1, img: imgA, alt: "A boy saying Look at me", correct: "C" },
    { id: 2, img: imgB, alt: "A person asking Please help me", correct: "D" },
    { id: 3, img: imgC, alt: "A person saying I can't see you", correct: "A" },
    { id: 4, img: imgD, alt: "Children saying We can see it", correct: "E" },
    { id: 5, img: imgE, alt: "A girl asking Can you hear me", correct: "B" },
    { id: 6, img: imgF, alt: "A girl drawing her", correct: "F" },
  ];
  const audioPositions = [
    { top: "22%", left: "5%", width: "26%", height: "80%" }, // A
    { top: "22%", left: "40%", width: "29%", height: "80%" }, // C
    { top: "22%", left: "76%", width: "18%", height: "80%" }, // E
    { top: "65%", left: "6%", width: "27%", height: "80%" }, // B
    { top: "65%", left: "39%", width: "22%", height: "80%" }, // D
    { top: "65%", left: "76%", width: "25%", height: "80%" }, // F
  ];
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [answers, setAnswers] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const sentenceAudio = [audioA, audioB, audioC, audioD, audioE, audioF];
  const handleChange = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
    setWrongAnswers((previous) => ({ ...previous, [id]: false }));
  };

  const reset = () => {
    setAnswers({});
    setWrongAnswers({});
    setShowAns(false);
    setLockedIds([]);
    stopAudio();
  };
  const showAnswers = () => {
    const filled = {};

    questions.forEach((q) => {
      filled[q.id] = q.correct;
    });

    setAnswers(filled);
    setShowAns(true);
    setLockedIds(questions.map((question) => question.id));
    setWrongAnswers({});
    stopAudio();
  };

  const checkAnswers = () => {
    if (showAns || lockedIds.length === questions.length) return;

    const empty = questions.some((q) => !answers[q.id]);
    if (empty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const wrong = {};

    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correct++;
      } else {
        wrong[q.id] = true;
      }
    });

    setWrongAnswers(wrong);

    const total = questions.length;

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <b style="color:${color};">Score: ${correct} / ${total}</b>
    </div>
  `;
    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLockedIds(
      questions
        .filter((question) => answers[question.id] === question.correct)
        .map((question) => question.id),
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
      <div className="div-forall" style={{ gap: "10px" }}>
        <ExerciseHeaderReview
          sectionLetter="A"
          title="Read and match. Write the letters."
          subTitle="Start with one word or picture, then connect it to the partner that means the same thing."
        />

        <div className="w-full mx-auto mb-10">
          <div
            style={{
              display: "flex",
              // justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <div style={{ position: "relative", width: "fit-content" }}>
              <img
                src={big}
                alt="Six sentences labeled A through F"
                style={{
                  width: "auto",
                  height: "150px",
                  display: "block",
                }}
              />

              {sentenceAudio.map((audio, index) => (
                <button
                  type="button"
                  key={index}
                  aria-label={`Play sentence ${String.fromCharCode(65 + index)}`}
                  className="unit4-audio-control unit4-interactive"
                  onClick={() => playAudio(`sentence-${index}`, audio)}
                  style={{
                    position: "absolute",
                    top: audioPositions[index].top,
                    left: audioPositions[index].left,
                    width: audioPositions[index].width,
                    height: "30%",
                    border: 0,
                    padding: 0,
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `sentence-${index}`}
                  />
                </button>
              ))}
            </div>
          </div>
          {/*  BANK */}

          {/* QUESTIONS GRID */}
          <div className="grid grid-cols-3 gap-5 mb-10">
            {questions.map((q) => (
              <div key={q.id} className="flex flex-col items-start">
                <div className="flex gap-2 items-start">
                  <span className="font-bold text-lg">{q.id}</span>
                  <img
                    src={q.img}
                    alt={q.alt}
                    style={{
                      height: "120px",
                      // border: "2px solid orange",
                      // borderRadius: "10px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {questions.map((q) => (
              <div
                key={q.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{q.id}</span>
                <div
                  style={{
                    position: "relative",
                    minWidth: "120px",
                  }}
                >
                  <select
                    value={answers[q.id] || ""}
                    disabled={showAns || lockedIds.includes(q.id)}
                    aria-label={`Letter for picture ${q.id}`}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    style={{
                      width: "90px",
                      border: "none",
                      borderBottom: `1px solid ${
                        wrongAnswers[q.id] && !showAns ? "red" : "black"
                      }`,
                      background: "transparent",
                      textAlign: "center",
                      fontWeight: "400",
                      // color: answers[q.id] ? "#2c5287" : "black",
                      fontSize: "18px",
                      paddingBottom: "4px",
                      cursor:
                        showAns || lockedIds.includes(q.id)
                          ? "default"
                          : "pointer",
                    }}
                  >
                    <option value="">Select</option>

                    {wordBank.map((word) => (
                      <option key={word} value={word}>
                        {word}
                      </option>
                    ))}
                  </select>

                  {wrongAnswers[q.id] && !showAns && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "25px",
                        transform: "translateY(-50%)",
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
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        pointerEvents: "none",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="action-buttons-container mt-10">
          <button onClick={reset} className="try-again-button">
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

export default Review7_Page1_Q1;
