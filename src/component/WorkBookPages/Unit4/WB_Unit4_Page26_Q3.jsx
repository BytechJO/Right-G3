import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  4.svg";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";

// كمل باقي الصور هون

const ITEMS = [
  {
    id: 1,
    img: img1,
    correct: "✓",
  },
  {
    id: 2,
    img: img2,
    correct: "✕",
  },
  {
    id: 3,
    img: img3, // حطي الصورة المناسبة
    correct: "✓",
  },
  {
    id: 4,
    img: img4, // حطي الصورة المناسبة
    correct: "✓",
  },
];

const OPTIONS = ["✓", "✕"];

export default function WB_Unit4_Page26_QC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns ||showResults) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns||showResults) return;

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
        onClick={() => handleSelect(item.id, value)}
        style={{
          position: "relative",
          width: "45px",
          height: "45px",
          borderRadius: "14px",
          border: selected
            ? wrong
              ? "2px solid red"
              : "2px solid #f39b42"
            : "1px solid #cfcfcf",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: showAns ||showResults? "default" : "pointer",
        }}
      >
        {value === "✓" ? (
          <img src={trueIcon} style={{ height: "25px" }} />
        ) : (
          <img src={falseIcon} style={{ height: "25px" }} />
        )}

        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
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
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-b-grid {
          display:flex;
          gap: 18px;
    //           display: grid;
    // gap: 18px;
    // grid-template-columns: 1fr 1fr;
    // width: 100%;
        }

        .wb-b-card {
          width: 100%;
          // border: 2px solid #f39b42;
          // border-radius: 18px;
          // background: #fff;
          position: relative;
          // overflow: hidden;
          display: flex;
    justify-content: center;
        }

        .wb-b-img {
          width: auto;
          height: 120px;
          object-fit: contain;
        }

        .wb-b-answer-box {
          position: absolute;
          left: 54%;
          bottom: -6px;
          transform: translateX(-50%);
          width: 54px;
          height: 42px;
          // border: 2px solid #f39b42;
          border-radius: 8px;
          // background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          
        }

        .wb-b-options-row {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 10px;
              margin-left: 30px;
        }
      `}</style>

      <div className="div-forall" style={{ gap: "150px" }}>
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">B</span>Do they both have the same <span className="text-blue-900">th sound</span>? Listen and write
          <span className="text-red-500">✓</span> or
          <span className="text-red-500">✕</span> .
        </h1>

        <div className="wb-b-grid">
          {ITEMS.map((item) => (
            <div key={item.id}>
              <div className="wb-b-card">
                <div className="flex gap-1">
                  <span className="text-xl font-semibold">{item.id}</span>
                  <img src={item.img} className="wb-b-img" />
                </div>
                {(answers[item.id] || showAns) && (
                  <div className="wb-b-answer-box">
                    {answers[item.id] === "✓" ? (
                      <img src={trueIcon} style={{ height: "25px" }} />
                    ) : (
                      <img src={falseIcon} style={{ height: "25px" }} />
                    )}
                  </div>
                )}
              </div>

              <div className="wb-b-options-row">
                {OPTIONS.map((opt) => (
                  <div key={opt}>{renderChoice(item, opt)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button
          checkAnswers={handleCheck}
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleReset}
        />
      </div>
    </div>
  );
}
