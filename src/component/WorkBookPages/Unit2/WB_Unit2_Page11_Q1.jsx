import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/123/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/123/Asset 6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/123/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/123/Asset 8.svg";
import img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/Asset 24.svg";
const WRONG_COLOR = "#ef4444";

const ANSWERS = [
  {
    id: 1,
    correct: "She usually irons the clothes.",
    img: img1,
  },
  {
    id: 2,
    correct: "He rarely reads the newspaper.",
    img: img2,
  },
  {
    id: 3,
    correct: "They sometimes play chess.",
    img: img3,
  },
  {
    id: 4,
    correct: "She always goes to bed.",
    img: img4,
  },
];

const FREQUENCIES = ["always", "usually", "sometimes", "never","rarely"];

// 🔥 توليد 4 خيارات لكل سؤال
const buildOptions = (sentence) => {
  const words = sentence.split(" ");
  const subject = words[0]; // She
  const rest = words.slice(2).join(" "); // irons clothes.

  return FREQUENCIES.map((freq) => `${subject} ${freq} ${rest}`);
};

export default function WB_LookAndWrite_PageE() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectChange = (id, value) => {
      if (showResults) return;

    setAnswers((prev) => ({
      ...prev,
      [`a-${id}`]: value,
    }));
  };

  const handleCheck = () => {
      if (showResults) return;

    // ✅ تأكد كلهم معبّيين
    const allFilled = ANSWERS.every((item) => answers[`a-${item.id}`]);

    if (!allFilled) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ANSWERS.forEach((item) => {
      if (answers[`a-${item.id}`] === item.correct) {
        score++;
      }
    });

    setShowResults(true);

    if (score === ANSWERS.length)
      ValidationAlert.success(`Score: ${score} / ${ANSWERS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ANSWERS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ANSWERS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ANSWERS.forEach((item) => {
      filled[`a-${item.id}`] = item.correct;
    });

    setAnswers(filled);
    setShowResults(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
  };

  const isWrong = (item) =>
    showResults && answers[`a-${item.id}`] !== item.correct;

  return (
    <div className="main-container-component">
      <div className="div-forall mb-5" style={{ gap: "25px" }}>
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">E</span> Look and write the sentences.
        </h1>

        <div className="flex flex-col gap-10 items-center justify-center">
          <img src={img} style={{ width: "auto", height: "90px" }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              width: "100%",
              // justifyItems:"center",
              gap: "40px",

            }}
          >
            {ANSWERS.map((item) => (
              <div key={item.id}>
                <div className="flex gap-3">
                  <span className="text-lg font-bold">{item.id}</span>
                  <img
                    src={item.img}
                    style={{ width: "auto", height: "90px" }}
                  />
                </div>
                <div style={{ position: "relative", marginTop: "10px" }}>
                  {/* ❌ WRONG ICON */}
                  {isWrong(item) && (
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
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        border: "2px solid white",
                      }}
                    >
                      ✕
                    </div>
                  )}

                  {/* ✅ Dropdown */}
                  <select
                    value={answers[`a-${item.id}`] || ""}
                    onChange={(e) =>
                      handleSelectChange(item.id, e.target.value)
                    }
                    disabled={showResults}
                    style={{
                      width: "90%",
                      fontSize: "18px",
                      marginTop:"20px",
                      borderBottom: isWrong(item)
                        ? `2px solid red`
                        : "1px solid navy",
                      marginLeft: "25px",
                    }}
                  >
                    <option value="">Select answer</option>

                    {buildOptions(item.correct).map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
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
