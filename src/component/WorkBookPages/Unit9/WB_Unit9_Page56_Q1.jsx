import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd11pg56instruction1-adult-lady_kdnJAymX.mp3";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
const ITEMS = [
  {
    id: 1,
    text: "The cats have cups and bats.",
    correct: true,
  },
  {
    id: 2,
    text: "The bees and dogs see the trees.",
    correct: true,
  },
  {
    id: 3,
    text: "The girl has books, peas, and dogs.",
    correct: false,
  },
];

export default function Phonics_QA() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const captions = [
      { start: 0.46, end: 3.42, text: "Page 56, phonics exercise A." },
      {
        start: 3.42,
        end: 8.62,
        text: "Do the words ending in S have the same S sound?",
      },
      { start: 8.62, end: 11.88, text: "Listen and write check or X." },
      { start: 13.0, end: 17.42, text: "1- the cats have cups and bats." },
      { start: 17.42, end: 21.58, text: "2- the bees and dogs see the trees." },
      {
        start: 21.58,
        end: 27.88,
        text: "3- the girl has books, peas, and dogs.",
      },
    ];
  const handleSelect = (id, value) => {
    if (showAns||checked) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: prev[id] === value ? undefined : value,
    }));
  };

  const isWrong = (item) => {
    if (!checked) return false;
    return answers[item.id] !== item.correct;
  };

  const handleCheck = () => {
    if (showAns||checked) return;

    const allAnswered = ITEMS.every((item) => answers[item.id] !== undefined);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions!");
      return;
    }
  
    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) score++;
    });

    setChecked(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const ans = {};
    ITEMS.forEach((item) => {
      ans[item.id] = item.correct;
    });

    setAnswers(ans);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const renderBox = (id, value) => {
    const selected = answers[id] === value;

    return (
      <div
        onClick={() => handleSelect(id, value)}
        style={{
          width: "38px",
          height: "38px",
          border: isWrong(answers[id]) ? "2px solid red":"1px solid #f39b42",
          borderRadius: "6px",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: showAns||checked ? "default" : "pointer",
        }}
      >
        {selected && (
          <span
            style={{
              fontSize: "24px",
              fontWeight: "bold",
             
            }}
          >
            {value ? (
              <img src={trueIcon} style={{ height: "25px" }} />
            ) : (
              <img src={falseIcon} style={{ height: "25px" }} />
            )}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "45px",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span>
          Do the words ending in "s" have the same
          <strong className="text-blue-900"> -s sound</strong>? Write{" "}
          <strong className="text-red-600">✓</strong> or{" "}
          <strong className="text-red-600">✕</strong>.
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <QuestionAudioPlayer
            src={sound1}
            captions={captions}
            stopAtSecond={11.88}
          />
        </div>

        {ITEMS.map((item) => (
          <div
            key={item.id}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            {/* sentence */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "700", fontSize: "22px" }}>
                {item.id}
              </span>
              <p style={{ margin: 0, fontSize: "20px" }}>{item.text}</p>
            </div>

            {/* choices */}
            <div style={{ display: "flex", gap: "10px" }}>
              {renderBox(item.id, true)}
              {renderBox(item.id, false)}
            </div>

            {/* wrong mark */}
            {isWrong(item) && (
              <div
                style={{
                  position: "absolute",
                  right: "-8px",
                  top: "-8px",
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
        ))}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}
