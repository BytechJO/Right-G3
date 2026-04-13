import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.5.svg";
import img6 from "../../../assets/imgs/pages/wB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.6.svg";

const ITEMS = [
  { id: 1, img: img1, correct: true },
  { id: 2, img: img2, correct: false },
  { id: 3, img: img3, correct: true },
  { id: 4, img: img4, correct: false },
  { id: 5, img: img5, correct: false },
  { id: 6, img: img6, correct: true },
];

export default function WB_Unit5_Page32_Q1() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: prev[id] === value ? undefined : value,
    }));
  };

  // ✅ Check (يتوقف تماماً إذا Show Answer شغال)
  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every(
      (item) => answers[item.id] !== undefined
    );

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions!");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
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

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "15px" }}>
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span>{" "}
          Does it have a <strong>-y sound</strong>? Write ✓ or ✗
        </h1>

        <div className="flex flex-wrap gap-4 justify-center">
          {ITEMS.map((item) => {
            const chosen = answers[item.id];

            return (
              <div
                key={item.id}
                className="relative flex flex-col items-center rounded-2xl p-2 bg-white shadow-sm"
                style={{
                  border: "2px solid #e5e7eb",
                  width: 220,
                }}
              >
                <span className="text-xs font-bold text-gray-400 self-start mb-1">
                  {item.id}
                </span>

                <img
                  src={item.img}
                  alt=""
                  style={{ width: 140, height: 120, objectFit: "contain" }}
                />

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleSelect(item.id, true)}
                    className="rounded-full font-bold text-lg"
                    style={{
                      width: 34,
                      height: 34,
                      background: chosen === true ? "#22c55e" : "#f3f4f6",
                      color: chosen === true ? "#fff" : "#9ca3af",
                      border: "2px solid #e5e7eb",
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    ✓
                  </button>

                  <button
                    onClick={() => handleSelect(item.id, false)}
                    className="rounded-full font-bold text-lg"
                    style={{
                      width: 34,
                      height: 34,
                      background: chosen === false ? "#ef4444" : "#f3f4f6",
                      color: chosen === false ? "#fff" : "#9ca3af",
                      border: "2px solid #e5e7eb",
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    ✗
                  </button>
                </div>

                {/* ❌ علامة الغلط */}
                {checked &&
                  answers[item.id] !== undefined &&
                  answers[item.id] !== item.correct && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow">
                      ✕
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center">
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