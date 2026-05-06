import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// صور الأنشطة
import actImg1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.1.svg";
import actImg2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.2.svg";
import actImg3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.3.svg";
import actImg4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.4.svg";
import actImg5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.5.svg";

import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";

const ITEMS = [
  {
    id: 1,
    actImg: actImg1,
    activity: "swimming",
    options: ["swimsuit", "glasses"],
    correct1: "swimsuit",
    correct2: "glasses",

    boxPositions: [
      { top: "58%", left: "41%" },
      { top: "81%", left: "41%" },
      { top: "58%", left: "70%" },
      { top: "81%", left: "70%" },
    ],
    // boxCorrect: ["true", "false", "true", "false"],
  },
  {
    id: 2,
    actImg: actImg2,
    activity: "tennis",
    options: ["socks", "necklace"],
    correct1: "socks",
    correct2: "necklace",

    boxPositions: [
      { top: "48%", left: "37%" },
      { top: "72%", left: "37%" },
      { top: "48%", left: "68%" },
      { top: "72%", left: "68%" },
    ],
    // boxCorrect: ["true", "false", "true", "false"],
  },
  {
    id: 3,
    actImg: actImg3,
    activity: "cooking",
    options: ["apron", "boots"],
    correct1: "apron",
    correct2: "boots",

    boxPositions: [
      { top: "54%", left: "35%" },
      { top: "76%", left: "35%" },
      { top: "54%", left: "66%" },
      { top: "76%", left: "66%" },
    ],
    // boxCorrect: ["true", "false", "true", "false"],
  },
  {
    id: 4,
    actImg: actImg4,
    activity: "biking",
    options: ["helmet", "scarf"],
    correct1: "helmet",
    correct2: "scarf",

    boxPositions: [
      { top: "60%", left: "37%" },
      { top: "82%", left: "37%" },
      { top: "60%", left: "67%" },
      { top: "82%", left: "67%" },
    ],
    // boxCorrect: ["true", "false", "true", "false"],
  },
  {
    id: 5,
    actImg: actImg5,
    activity: "running",
    options: ["coat", "shoes"],
    correct1: "shoes",
    correct2: "coat",

    boxPositions: [
      { top: "68%", left: "38%" },
      { top: "90%", left: "38%" },
      { top: "68%", left: "68%" },
      { top: "90%", left: "68%" },
    ],
    // boxCorrect: ["false", "true", "false", "true"],
  },
];

export default function WB_LookAndWrite_PageJ() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleBoxClick = (id, index) => {
    const isTop = index === 0 || index === 2;
    const value = isTop ? "true" : "false";

    // تحديد العمود (يسار أو يمين)
    const pairIndex = index % 2 === 0 ? index + 1 : index - 1;

    setAnswers((prev) => ({
      ...prev,
      [`box-${id}-${index + 1}`]: value,
      [`box-${id}-${pairIndex + 1}`]: undefined, // 🔥 يمسح الخيار الثاني
    }));
  };

  const handleChange = (id, field, value) => {
    if (showAns || showResults) return;
    setAnswers((prev) => ({ ...prev, [`${id}-${field}`]: value }));
    setShowResults(false);
  };

  const getValue = (id, field) => answers[`${id}-${field}`] || "";
  const getCorrectValue = (item, word) => {
    if (word === item.correct1) return "true"; // ✓
    if (word === item.correct2) return "false"; // ✕
    return null;
  };
  const handleCheck = () => {
    if (showAns || showResults) return;

    const allAnswered = ITEMS.every((i) => {
      const leftChosen = answers[`box-${i.id}-1`] || answers[`box-${i.id}-2`];

      const rightChosen = answers[`box-${i.id}-3`] || answers[`box-${i.id}-4`];

      return (
        getValue(i.id, "1") && getValue(i.id, "2") && leftChosen && rightChosen
      );
    });
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    let total = 0;
    ITEMS.forEach((i) => {
      total++;

      if (
        getValue(i.id, "1") === i.correct1 &&
        getValue(i.id, "2") === i.correct2
      ) {
        score++;
      }

      // العمود الأول (الكلمة الأولى)
      total++;
      const leftWord = i.options[0];
      const leftCorrect = getCorrectValue(i, leftWord);
      const leftAnswer = answers[`box-${i.id}-1`] || answers[`box-${i.id}-2`];

      if (leftAnswer === leftCorrect) score++;

      // العمود الثاني (الكلمة الثانية)
      total++;
      const rightWord = i.options[1];
      const rightCorrect = getCorrectValue(i, rightWord);
      const rightAnswer = answers[`box-${i.id}-3`] || answers[`box-${i.id}-4`];

      if (rightAnswer === rightCorrect) score++;
    });
    setShowResults(true);

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

 const handleShowAnswer = () => {
  const filled = {};

  ITEMS.forEach((i) => {
    filled[`${i.id}-1`] = i.correct1;
    filled[`${i.id}-2`] = i.correct2;

    // LEFT
    const leftCorrect = getCorrectValue(i, i.options[0]);
    if (leftCorrect === "true") {
      filled[`box-${i.id}-1`] = "true";
    } else {
      filled[`box-${i.id}-2`] = "false";
    }

    // RIGHT
    const rightCorrect = getCorrectValue(i, i.options[1]);
    if (rightCorrect === "true") {
      filled[`box-${i.id}-3`] = "true";
    } else {
      filled[`box-${i.id}-4`] = "false";
    }
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

  const isWrong1 = (item) =>
    showResults && !showAns && getValue(item.id, "1") !== item.correct1;

  const isWrong2 = (item) =>
    showResults && !showAns && getValue(item.id, "2") !== item.correct2;

  const renderSelect = (item, field, isWrong) => {
    const value = getValue(item.id, field);

    return (
      <div style={{ position: "relative", display: "inline-flex" }}>
        <select
          disabled={showAns||showResults}
          value={value}
          onChange={(e) => handleChange(item.id, field, e.target.value)}
          style={{
            borderBottom:isWrong ? `2px solid ${ WRONG_COLOR }`: "1px solid #2f2f2f",
            background: "transparent",
          }}
        >
          <option value="" disabled hidden />
          {item.options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>

        {isWrong && (
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
    );
  };

  return (
    <div className="main-container-component mb-15">
      <div className="div-forall" style={{ gap: "30px" }}>
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">J</span> Look and write{" "}
          <span className="text-red-500">✓</span> and
          <span className="text-red-500">✕</span> . Write sentences.
        </h1>
        <div className="w-full flex flex-col gap-10">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", gap: "20px" }}
            >
              <div style={{ position: "relative"}}>
                <img
                  src={item.actImg}
                  style={{ width: "450px", height: "auto" }}
                />

                {item.boxPositions.map((pos, index) => {
                  const value = answers[`box-${item.id}-${index + 1}`];
                  const isWrongBox =
                    showResults &&
                    !showAns &&
                    (() => {
                      const value = answers[`box-${item.id}-${index + 1}`];

                      // العمود الأول لازم ✓
                      if (index === 0 || index === 1) {
                        return value && value !== "true";
                      }

                      // العمود الثاني لازم ✕
                      if (index === 2 || index === 3) {
                        return value && value !== "false";
                      }
                    })();

                  return (
                    <div
                      key={index}
                      onClick={() =>{
                        if(showResults ||showAns)return
                         handleBoxClick(item.id, index)}}
                      style={{
                        position: "absolute",
                        top: pos.top,
                        left: pos.left,
                        transform: "translate(-50%, -50%)",
                        width: "30px",
                        height: "30px",
                        // border: "1px solid #333",
                        // background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: showResults ||showAns ? "default":"pointer",
                      }}
                    >
                      {value === "true" && (
                        <img src={trueIcon} style={{ height: "25px" }} />
                      )}
                      {value === "false" && (
                        <img src={falseIcon} style={{ height: "25px" }} />
                      )}

                      {isWrongBox && <span style={{ color: "red" }}>✕</span>}
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  border: `1px solid ${BORDER_COLOR}`,
                  borderRadius: "clamp(10px,1.2vw,16px)",
                  padding: "clamp(8px,1vw,14px) clamp(10px,1.2vw,16px)",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "5px",
                  fontSize: "clamp(13px,1.4vw,17px)",
                  // fontWeight: 500,
                  color: "#111",
                  // lineHeight: 1.5,
                  width: "60%",
                }}
              >
                <span>You must wear a</span>
                {renderSelect(item, "1", isWrong1(item))} for{" "}
                <span>for {item.activity}, but you mustn't wear a</span>
                {renderSelect(item, "2", isWrong2(item))}
                <span>.</span>
              </div>
            </div>
          ))}
        </div>
        <Button
          checkAnswers={handleCheck}
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleStartAgain}
        />
      </div>
    </div>
  );
}
