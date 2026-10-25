import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.6.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const RIGHT_COLOR = "#22c55e";

const ITEMS = [
  { id: 1, img: img1, correct: "✓" },
  { id: 2, img: img2, correct: "✕" },
  { id: 3, img: img3, correct: "✓" },
  { id: 4, img: img4, correct: "✕" },
  { id: 5, img: img5, correct: "✕" },
  { id: 6, img: img6, correct: "✓" },
];

import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";

// كمل باقي الصور هون

const OPTIONS = ["✓", "✕"];

export default function WB_Unit5_Page32_QA() {
  const [answers, setAnswers] = useState({});
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setWrongIds((prev) => prev.filter((entry) => entry !== id));
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

    setLockedIds((prev) => [
      ...new Set([
        ...prev,
        ...ITEMS.filter((item) => answers[item.id] === item.correct).map(
          (item) => item.id,
        ),
      ]),
    ]);
    setWrongIds(
      ITEMS.filter((item) => answers[item.id] !== item.correct).map(
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
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
  };

  const handleReset = () => {
    setAnswers({});
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
  };

  const isWrong = (item) => {
    return wrongIds.includes(item.id);
  };

  const renderChoice = (item, value) => {
    const selected = answers[item.id] === value;
    const wrong = isWrong(item) && selected;

    return (
      <div
        onClick={() => handleSelect(item.id, value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSelect(item.id, value);
          }
        }}
        role="button"
        tabIndex={showAns || lockedIds.includes(item.id) ? -1 : 0}
        aria-label={`${value === "✓" ? "Yes" : "No"} for picture ${item.id}`}
        aria-disabled={showAns || lockedIds.includes(item.id)}
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
          <img src={trueIcon} alt="Yes" style={{ height: "25px" }} />
        ) : (
          <img src={falseIcon} alt="No" style={{ height: "25px" }} />
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
          height: 150px;
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
              // margin-left: 30px;
        }
      `}</style>

      <div className="div-forall" style={{ gap: "150px" }}>
        <ExerciseHeader
          sectionLetter="A"
          title={
            <>
              Does it have a <span class="text-blue-900">-y sound</span>? Write{" "}
              <span class="text-red-600">✓</span> or{" "}
              <span class="text-red-600">✗</span>.
            </>
          }
          subTitle="Read each whether each word has the -y sound carefully, use the picture or sentence evidence to check it, then choose the correct Yes/No or True/False response."
        />

        <div className="wb-b-grid w-full">
          {ITEMS.map((item) => (
            <div key={item.id} className="w-full">
              <div className="wb-b-card">
                <img
                  src={item.img}
                  alt={
                    [
                      "Candy",
                      "A foot",
                      "A crying boy",
                      "An umbrella",
                      "A ship",
                      "A party",
                    ][item.id - 1]
                  }
                  className="wb-b-img"
                />

                {/* {(answers[item.id] || showAns) && (
                  <div className="wb-b-answer-box">
                    {answers[item.id] === "✓" ? (
                      <img src={trueIcon} style={{ height: "25px" }} />
                    ) : (
                      <img src={falseIcon} style={{ height: "25px" }} />
                    )}
                  </div>
                )} */}
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
