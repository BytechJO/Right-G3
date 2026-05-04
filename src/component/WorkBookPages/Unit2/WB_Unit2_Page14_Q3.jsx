import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import AudioWithCaption from "../../AudioWithCaption";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd2pg14instruction-adult-lady_tUKGw1L9.mp3"; // ← غيّر المسار حسب ملف الأوديو

import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 19.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 20.svg";
import img2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 21.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 22.svg";
import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 23.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 24.svg";
import img4a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 25.svg";
import img4b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 26.svg";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";

const ITEMS = [
  {
    id: 1,
    leftImg: img1a,
    rightImg: img1b,
    correct: "✕",
  },
  {
    id: 2,
    leftImg: img2a,
    rightImg: img2b,
    correct: "✓",
  },
  {
    id: 3,
    leftImg: img3a,
    rightImg: img3b,
    correct: "✕",
  },
  {
    id: 4,
    leftImg: img4a,
    rightImg: img4b,
    correct: "✓",
  },
];

const OPTIONS = ["✓", "✕"];

export default function WB_Unit3_Page18_QB() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns || showResults) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns || showResults) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    setShowResults(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };
  const captions = [
    { start: 0.6, end: 3.42, text: "Page 14, phonics, exercise C." },
    { start: 3.42, end: 6.32, text: "Do they both have the same U sound?" },
    { start: 6.32, end: 9.68, text: "Listen and write check or X." },
    { start: 10.84, end: 13.58, text: "1- duck, glue." },
    { start: 13.58, end: 17.42, text: "2- tube, sue." },
    { start: 17.42, end: 21.16, text: "3- cup, cube." },
    { start: 21.16, end: 24.74, text: "4- sun, bug." },
  ];
  const handleShowAnswer = () => {
    const correctMap = {};
    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults) return false;
    return answers[item.id] !== item.correct;
  };

  const renderChoice = (item, value) => {
    const selected = answers[item.id] === value;
    const wrong = isWrong(item) && selected;
    const correctSelected = showAns && item.correct === value;

    return (
      <div
        onClick={() => {
          handleSelect(item.id, value);
        }}
        style={{
          position: "relative",
          width: "45px",
          height: "45px",
          borderRadius: "14px",
          border:
            selected || correctSelected
              ? "2px solid #f39b42"
              : "2px solid #cfcfcf",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: showAns || showResults ? "default" : "pointer",
          boxSizing: "border-box",
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontSize: "34px",
            fontWeight: "700",
            color: value === "✓" ? "#000000ff" : "#000000ff",
            lineHeight: 1,
          }}
        >
          {value === "✓" ? (
            <img src={trueIcon} style={{ height: "25px" }} />
          ) : (
            <img src={falseIcon} style={{ height: "25px" }} />
          )}
        </span>

        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
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
      <style>{`
  .wb-b-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 8px 14px 20px;
    box-sizing: border-box;
  }

  .wb-b-grid {
    display: flex;
    // grid-template-columns: repeat(2, minmax(0, 1fr));
    // column-gap: 44px;
    // row-gap: 18px;
    width: 100%;
    align-items: center;
  }

  .wb-b-item {
    display: flex;
    align-items: flex-start;
    gap: 5px;
    width: 100%;
  }

  .wb-b-num {
    font-size: 22px;
    font-weight: 700;
    color: #222;
    line-height: 1;
min-width: 16px;
    padding-top: 10px;
    margin-left: 20px;
  }

  .wb-b-card {
    width: 100%;
    /* max-width: 430px; */
    border: 1px solid #f39b42;
    border-radius: 18px;
    background: #fff;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    overflow: visible;
    box-sizing: border-box;
  }

  .wb-b-half {
    min-height: 135px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .wb-b-half:first-child {
    border-right: 1px solid #f39b42;
  }

  .wb-b-img {
    max-width: 100%;
    max-height: 110px;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
  }

  .wb-b-answer-box {
    position: absolute;
    left: 50%;
    bottom: -2px;
    transform: translateX(-50%);
    width: 54px;
    height: 42px;
    border: 1px solid #f39b42;
    border-radius: 8px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    z-index: 2;
  }

  .wb-b-answer-text {
    font-size: 34px;
    font-weight: 700;
    color: #000000;
    line-height: 1;
  }

  .wb-b-options-row {
    display: flex;
    justify-content: center;
    gap: 14px;
    margin-top: 8px;
    margin-left: 20%;
  }

  .wb-b-buttons {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }

  @media (max-width: 900px) {
    .wb-b-grid {
      grid-template-columns: 1fr;
    }
  }
`}</style>
      <div className="div-forall">
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">C</span> Do they both have the same{" "}
          <span className="text-blue-800">u sound</span> ? Listen and write{" "}
          <span className="text-red-500">✓</span> or
          <span className="text-red-500">✕</span> .
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <QuestionAudioPlayer src={sound1} captions={captions} />
        </div>{" "}
        <div className="wb-b-grid">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
              }}
            >
              <div className="wb-b-item">
                <div className="wb-b-num">{item.id}</div>

                <div className="wb-b-card">
                  <div className="wb-b-half">
                    <img
                      src={item.leftImg}
                      alt={`left-${item.id}`}
                      className="wb-b-img"
                    />
                  </div>

                  <div className="wb-b-half">
                    <img
                      src={item.rightImg}
                      alt={`right-${item.id}`}
                      className="wb-b-img"
                    />
                  </div>

                  {(answers[item.id] || showAns) && (
                    <div className="wb-b-answer-box">
                      <span className="wb-b-answer-text">
                        {answers[item.id] === "✓" ? (
                          <img src={trueIcon} style={{ height: "25px" }} />
                        ) : (
                          <img src={falseIcon} style={{ height: "25px" }} />
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="wb-b-options-row">
                {OPTIONS.map((option) => (
                  <div key={option}>{renderChoice(item, option)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="wb-b-buttons">
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
