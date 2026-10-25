import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex A  4.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex B  3.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex B  2.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex B  4.svg";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";

// كمل باقي الصور هون

const ITEMS = [
  {
    id: 1,
    img: img1,
    correct: "✕",
  },
  {
    id: 2,
    img: img2,
    correct: "✓",
  },
  {
    id: 3,
    img: img3, // حطي الصورة المناسبة
    correct: "✓",
  },
  {
    id: 4,
    img: img4, // حطي الصورة المناسبة
    correct: "✕",
  },
];

const OPTIONS = ["✓", "✕"];
const IMAGE_ALTS = {
  1: "A chicken and a seashell",
  2: "A fish and a dish",
  3: "A watch and a cake",
  4: "A peach and a ship",
};

export default function WB_Unit3_Page18_QB() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

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
    setLockedIds(
      ITEMS.filter((item) => answers[item.id] === item.correct).map(
        (item) => item.id,
      ),
    );

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
    setLockedIds(ITEMS.map((item) => item.id));
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
  };

  const isWrong = (item) => {
    if (!showResults) return false;
    return answers[item.id] !== item.correct;
  };

  const renderChoice = (item, value) => {
    const selected = answers[item.id] === value;
    const wrong = isWrong(item) && selected;
    return (
      <div
        onClick={() => handleSelect(item.id, value)}
        onKeyDown={(event) => {
          if (
            (event.key === "Enter" || event.key === " ") &&
            !lockedIds.includes(item.id)
          ) {
            event.preventDefault();
            handleSelect(item.id, value);
          }
        }}
        role="button"
        tabIndex={lockedIds.includes(item.id) ? -1 : 0}
        aria-label={value === "✓" ? "Same sound" : "Different sound"}
        aria-disabled={lockedIds.includes(item.id)}
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
          cursor:
            showAns || lockedIds.includes(item.id) ? "default" : "pointer",
        }}
      >
        {value === "✓" ? (
          <img src={trueIcon} alt="" style={{ height: "25px" }} />
        ) : (
          <img src={falseIcon} alt="" style={{ height: "25px" }} />
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
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
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
          bottom: -2px;
          transform: translateX(-50%);
          width: 54px;
          height: 42px;
          border: 2px solid #f39b42;
          border-radius: 8px;
          background: #fff;
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

      <div className="div-forall" style={{ gap: "50px" }}>
        <ExerciseHeader
          sectionLetter="B"
          title={
            <>
              Do they both have the same sound? Write{" "}
              <span style={{ color: "red" }}>✓</span> or{" "}
              <span style={{ color: "red" }}>✗</span>.
            </>
          }
          subTitle="Read each whether each picture pair has the same ch, tch, or sh sound carefully, use the picture or sentence evidence to check it, then choose the correct Yes/No or True/False response."
        />

        <div className="wb-b-grid w-full">
          {ITEMS.map((item) => (
            <div key={item.id}>
              <div className="wb-b-card">
                <div className="flex gap-5">
                  <span className="text-xl font-semibold">{item.id}</span>
                  <img
                    src={item.img}
                    alt={IMAGE_ALTS[item.id]}
                    className="wb-b-img"
                  />
                </div>
                {(answers[item.id] || showAns) && (
                  <div className="wb-b-answer-box">
                    {answers[item.id] === "✓" ? (
                      <img
                        src={trueIcon}
                        alt="Correct mark"
                        style={{ height: "25px" }}
                      />
                    ) : (
                      <img
                        src={falseIcon}
                        alt="Incorrect mark"
                        style={{ height: "25px" }}
                      />
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
