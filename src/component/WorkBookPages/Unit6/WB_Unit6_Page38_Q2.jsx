import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.5.svg";
import AudioWithCaption from "../../AudioWithCaption";
import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd7pg38instruction-adult-lady_MkitoI5l.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const BORDER_COLOR = "#e0e0e0";
const WRONG_COLOR = "#ef4444";
const SELECT_COLOR = "#f39b42";

const OPTIONS = ["fl", "pl", "sl"];

const ITEMS = [
  { id: 1, img: img1, correct: "pl" },
  { id: 2, img: img2, correct: "fl" },
  { id: 3, img: img3, correct: "sl" },
  { id: 4, img: img4, correct: "pl" },
  { id: 5, img: img5, correct: "fl" },
];

export default function WB_ListenAndCircle_PageB() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const captions = [
    { start: 0.58, end: 4.36, text: "Page 38, phonics exercise B." },
    { start: 4.36, end: 8.74, text: "Listen and circle FL, PL, or SL." },
    { start: 9.86, end: 11.78, text: "1- plate." },
    { start: 11.78, end: 14.64, text: "2- fly." },
    { start: 14.64, end: 17.7, text: "3- slide." },
    { start: 17.7, end: 21.6, text: "4- plant." },
    { start: 21.6, end: 23.6, text: "5- flag." },
  ];
  const handleSelect = (id, value) => {
    if (showAns ||showResults) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns||showResults) return;
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
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) =>
    showResults && !showAns && answers[item.id] !== item.correct;

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
         
          // gap: "50px",
       
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          
        >
          <span className="WB-ex-A">B</span>
          Listen and circle <strong className="text-blue-900">fl</strong>,{" "}
          <strong className="text-blue-900">pl</strong>, or{" "}
          <strong className="text-blue-900">sl</strong>.
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <QuestionAudioPlayer
            src={sound1}
            captions={captions}
            stopAtSecond={8.74}
          />
        </div>

        {/* ── Cards: 5 في صف ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0,1fr))",
            gap: "clamp(10px,1.5vw,20px)",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => {
            const wrong = isWrong(item);

            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                

                {/* الصورة */}
                <div
                  style={{
                    // width: "100%",
                    // aspectRatio: "1 / 1",
                    // border: `2px solid ${wrong ? WRONG_COLOR : BORDER_COLOR}`,
                    // borderRadius: "clamp(10px,1.2vw,16px)",
                    // overflow: "hidden",
                    // background: "#f9f9f9",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {/* رقم */}
                <span
                  style={{
                    fontSize: "clamp(16px,1.8vw,24px)",
                    fontWeight: 700,
                    color: "#1e1e1eff",
                  }}
                >
                  {item.id}
                </span>
                  <img
                    src={item.img}
                    alt={`item-${item.id}`}
                    style={{
                      width: "auto",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />

                  {/* Wrong badge */}
                  {wrong && (
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
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>

                {/* الخيارات: fl / pl / sl */}
                <div
                  style={{
                    width: "100%",
                    border: `2px solid ${BORDER_COLOR}`,
                    borderRadius: "8px",
                    padding: "clamp(4px,0.6vw,8px) clamp(6px,0.8vw,10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    background: "#fff",
                    boxSizing: "border-box",
                    gap: "2px",
                  }}
                >
                  {OPTIONS.map((opt) => {
                    const isSelected = answers[item.id] === opt;
                    const isCorrectShown = showAns && item.correct === opt;
                    const isWrongSelected =
                      showResults &&
                      !showAns &&
                      answers[item.id] === opt &&
                      opt !== item.correct;

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(item.id, opt)}
                        style={{
                          fontSize: "clamp(13px,1.5vw,19px)",
                          // fontWeight: isSelected || isCorrectShown ? 800 : 500,
                          color: isWrongSelected
                            ? WRONG_COLOR
                            : isSelected || isCorrectShown
                              ? "#111"
                              : "#555",
                          background: "transparent",
                          border:
                            isSelected || isCorrectShown
                              ? `2px solid ${isWrongSelected ? WRONG_COLOR : SELECT_COLOR}`
                              : "2px solid transparent",
                          borderRadius: "999px",
                          padding: "clamp(2px,0.4vw,5px) clamp(6px,0.8vw,10px)",
                          cursor: showAns||showResults ? "default" : "pointer",
                          transition: "all 0.15s",
                          lineHeight: 1,
                          userSelect: "none",
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
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
