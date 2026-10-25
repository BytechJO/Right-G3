import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";

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

const IMAGE_ALTS = {
  1: "A refrigerator beside a television for a size comparison",
  2: "A car beside a bicycle for a speed comparison",
  3: "Harley standing beside his dad for an age comparison",
  4: "A ball beside feathers for a weight comparison",
};

export default function WB_Unit1_Page4_Q2() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [correctItems, setCorrectItems] = useState([]);

  const handleChange = (id, value) => {
    if (showAns || correctItems.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns || correctItems.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const nextCorrect = ITEMS.filter(
      (item) => answers[item.id] === item.correct,
    ).map((item) => item.id);
    const score = nextCorrect.length;

    setCorrectItems(nextCorrect);
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
    setCorrectItems(ITEMS.map((item) => item.id));
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setCorrectItems([]);
  };

  const isWrong = (item) => {
    if (!checked || showAns) return false;
    return answers[item.id] !== item.correct;
  };

  return (
    <div className="main-container-component">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="D"
          title="Look and write."
          subTitle="Use the comparison sentence shown by each picture to decide the missing word or phrase, then reread the completed sentence."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 relative">
              {/* Image */}
              <div className="flex items-start gap-3">
                <span className="font-bold text-lg">{item.id}</span>
                <img
                  src={item.img}
                  alt={IMAGE_ALTS[item.id]}
                  className="h-[130px] object-contain"
                  style={{ height: "120px" }}
                />
              </div>

              {/* Select */}
              <div className="relative">
                <select
                  value={answers[item.id] || ""}
                  disabled={showAns || correctItems.includes(item.id)}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  className={`w-[80%] border-b-1 p-2 text-lg outline-none
    ${isWrong(item) ? "border-b-2 border-red-500" : "border-gray-400"}
    focus-visible:ring-2
    focus-visible:ring-blue-500
    focus-visible:ring-offset-2
  `}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>

                  {[item.correct, item.wrong].map((opt) => (
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
            checkDisabled={showAns || correctItems.length === ITEMS.length}
          />
        </div>
      </div>
    </div>
  );
}
