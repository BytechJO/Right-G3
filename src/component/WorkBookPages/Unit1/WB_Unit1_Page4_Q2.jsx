import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 8.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    correct: "The fridge is bigger than the TV.",
    wrong: "The TV is bigger than the fridge.",
  },
  {
    id: 2,
    img: img2,
    correct: "The car is faster than the bike.",
    wrong: "The bike is faster than the car.",
  },
  {
    id: 3,
    img: img3,
    correct: "Harley is younger than his dad.",
    wrong: "His dad is younger than Harley.",
  },
  {
    id: 4,
    img: img4,
    correct: "The ball is heavier than the feathers.",
    wrong: "The feathers are heavier than the ball.",
  },
];

export default function WB_Unit1_Page4_Q2() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleChange = (id, value) => {
    if (showAns || checked) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheck = () => {
    if (showAns || checked) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
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
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!checked || showAns) return false;
    return answers[item.id] !== item.correct;
  };

  return (
    <div className="main-container-component">
      <div className="div-forall">
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span>
          Look and choose the correct sentence.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 relative">

              {/* Image */}
              <div className="flex items-start gap-3">
                <span className="font-bold text-lg">{item.id}</span>
                <img src={item.img} className="h-[130px] object-contain" style={{height:"120px"}}/>
              </div>

              {/* Select */}
              <div className="relative">
                <select
                  value={answers[item.id] || ""}
                  disabled={showAns}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  className={`w-[80%] border-b-1 p-2 text-lg outline-none
                    ${isWrong(item) ? "border-b-2 border-red-500" : "border-gray-400"}
                  `}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>

                  {/* خيارين فقط */}
                  {[item.correct, item.wrong].sort(() => Math.random() - 0.5).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {/* ❌ */}
                {isWrong(item) && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold border-2 border-white shadow">
                    ✕
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
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