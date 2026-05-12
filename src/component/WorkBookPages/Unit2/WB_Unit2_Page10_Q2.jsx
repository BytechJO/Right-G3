import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 8.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 9.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 10.svg";
import img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/66.svg";

const WRONG_COLOR = "#ef4444";

const LEFT_ITEMS = [
  { id: 1, img: img1, label: "go to school" },
  { id: 2, img: img2, label: "go to the library" },
  { id: 3, img: img3, label: "go to the gym" },
  { id: 4, img: img4, label: "go to summer camp" },
];

const RIGHT_ITEMS = [
  {
    id: 1,
    bars: 4,
    prefixTop: "She",
    correctAnswer: "usually rides a bike to the gym.",
  },
  {
    id: 2,
    bars: 0,
    prefixTop: "He",
    correctAnswer: "never walks to summer camp.",
  },
  {
    id: 3,
    bars: 5,
    prefixTop: "He always",
    correctAnswer: "takes a bus to school.",
  },
  {
    id: 4,
    bars: 2,
    prefixTop: "He",
    correctAnswer: "sometimes takes the train to the library.",
  },
];

const FREQUENCIES = ["always", "usually", "sometimes", "never"];

const buildOptions = (sentence) => {
  const rest = sentence.split(" ").slice(1).join(" ");
  return FREQUENCIES.map((freq) => `${freq} ${rest}`);
};

export default function WB_Unit2_Page10_QB() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [`r-${id}`]: value,
    }));
  };

  const handleCheck = () => {
    // ✅ تحقق إنو كلهم معبّيين
    if (showResults) return;
    const allFilled = RIGHT_ITEMS.every((i) => answers[`r-${i.id}`]);

    if (!allFilled) {
      ValidationAlert.info("Please fill all answers first.");
      return;
    }

    let score = 0;

    RIGHT_ITEMS.forEach((i) => {
      if (answers[`r-${i.id}`] === i.correctAnswer) score++;
    });

    setShowResults(true);

    if (score === RIGHT_ITEMS.length)
      ValidationAlert.success(`Score: ${score} / ${RIGHT_ITEMS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${RIGHT_ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${RIGHT_ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    RIGHT_ITEMS.forEach((i) => {
      filled[`r-${i.id}`] = i.correctAnswer;
    });

    setAnswers(filled);
    setShowResults(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
  };

  const isWrong = (item) =>
    showResults && answers[`r-${item.id}`] !== item.correctAnswer;

  const renderBars = (count) => (
    <span style={{ display: "inline-flex", marginRight: "6px" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            width: "20px",
            height: "14px",
            border: "1.5px solid #9e9e9e",
            background: n <= count ? WRONG_COLOR : "#fff",
          }}
        />
      ))}
    </span>
  );

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "12px" }}>
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span> Connect and write.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <img src={img} style={{ width: "100%", height: "100%" }} />

          <div className="flex flex-col gap-5">
            {RIGHT_ITEMS.map((item) => (
              <div key={item.id} style={{ position: "relative" }}>
                {/* ❌ ICON */}
                {isWrong(item) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "27px",
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

                <div
                  style={{
                    marginTop: "6px",
                    width: "100%",
                    fontSize: "18px",
                    borderBottom: "1px solid navy",
                  }}
                >
                  {renderBars(item.bars)}
                  {item.prefixTop}
                </div>

                <select
                  value={answers[`r-${item.id}`] || ""}
                  disabled={showResults}
                  onChange={(e) => handleSelectChange(item.id, e.target.value)}
                  style={{
                    marginTop: "25px",
                    width: "100%",
                    fontSize: "18px",

                    borderBottom: isWrong(item)
                      ? `2px solid red`
                      : "1px solid navy",
                  }}
                >
                  <option value="">Select answer</option>
                  {buildOptions(item.correctAnswer).map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
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
