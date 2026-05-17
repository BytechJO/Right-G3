import React, { useState, useEffect, useRef } from "react";
import "./Unit3_Page6_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
const data = [
  {
    id: 1,
    text: "There are a few cars in the street.",
    secondText: "The street is full.",
    correct: false,
  },
  {
    id: 2,
    text: "Maria makes very few mistakes.",
    secondText: "She’s an excellent student.",
    correct: true,
  },
  {
    id: 3,
    text: "There is little light outside.",
    secondText: "It is almost dark.",
    correct: true,
  },
  {
    id: 4,
    text: "On Mondays, there are few people at the theater.",
    secondText: "The theater is full.",
    correct: false,
  },
  {
    id: 5,
    text: "There is little food in the fridge.",
    secondText: "It is almost empty.",
    correct: true,
  },
];

const Unit3_Page6_Q2 = () => {
  const [selected, setSelected] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);

  const checkAnswers = () => {
    if (locked) return; // 🔒 منع التعديل بعد رؤية الحل

    const totalQuestions = data.length;
    let correct = 0;

    // تأكد إنو جاوب كل الأسئلة
    for (let q of data) {
      if (selected[q.id] === undefined) {
        ValidationAlert.info("");
        return;
      }
    }

    // حساب عدد الإجابات الصحيحة
    data.forEach((q) => {
      if (selected[q.id] === q.correct) {
        correct++;
      }
    });
    const color =
      correct === totalQuestions ? "green" : correct === 0 ? "red" : "orange";
    const scoreMessage = `
    <div style="font-size: 20px; margin-top: 10px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
      Score: ${correct} / ${totalQuestions}
      </span>
    </div>
  `;

    // النتيجة
    if (correct === totalQuestions) {
      ValidationAlert.success(scoreMessage);
    } else if (correct === 0) {
      ValidationAlert.error(scoreMessage);
    } else {
      ValidationAlert.warning(scoreMessage);
    }
    setShowResult(true);
    setLocked(true);
  };
  const handleSelect = (qId, value) => {
    if (locked) return;
    setSelected((prev) => ({ ...prev, [qId]: value }));
  };
  const showAnswers = () => {
    const correctSelection = {};

    data.forEach((q) => {
      correctSelection[q.id] = q.correct;
    });

    setSelected(correctSelection);
    setShowResult(false);
    setLocked(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">E</span>Read the first sentences carefully. Are
          the second sentences right or wrong? Write<span style={{ color: "#D1232A" }}>✓</span>or
          <span style={{ color: "#D1232A" }}>✗</span>.
        </h5>

        <div className="w-full max-w-3xl space-y-6 mt-7">
          {data.map((q) => (
            <div key={q.id} className="flex justify-between items-start">
              {/* LEFT TEXT */}
              <div className="flex gap-3">
                <span className="font-bold">{q.id}</span>

                <div className="flex flex-col">
                  <span className="text-gray-900 text-[20px]">{q.text}</span>
                  <span className="text-gray-900 text-[20px]">
                    {/* 👇 حط الجملة الثانية هون */}
                    {q.secondText}
                  </span>
                </div>
              </div>

              {/* RIGHT CHECK BOX */}
              <div className="flex gap-2">
                {/* TRUE */}
                <div
                  onClick={() => handleSelect(q.id, true)}
                  className={`relative w-[45px] h-[45px] border-2 rounded-md cursor-pointer flex items-center justify-center
    ${selected[q.id] === true ? showResult &&
                    selected[q.id] === true &&
                    q.correct !== true? "border-red-500": "border-orange-400" : "border-gray-300"}`}
                >
                  {selected[q.id] === true && (
                    <img src={trueIcon} style={{ height: "25px" }} />
                  )}

                  {/* ❌ WRONG */}
                  {showResult &&
                    selected[q.id] === true &&
                    q.correct !== true && (
                      <span
                        className="absolute top-0 -right-3 -translate-y-1/2
      w-[22px] h-[22px]
rounded-full
bg-[red] text-white
flex items-center justify-center
text-[12px] font-bold
border-2 border-white
shadow-[0_2px_6px_rgba(0,0,0,0.2)]
pointer-events-nonel"
                      >
                        ✕
                      </span>
                    )}
                </div>

                {/* FALSE */}
                <div
                  onClick={() => handleSelect(q.id, false)}
                  className={`relative  w-[45px] h-[45px] border-2 rounded-md cursor-pointer flex items-center justify-center
    ${selected[q.id] === false ? showResult &&
                    selected[q.id] === false &&
                    q.correct !== false ?  "border-red-500": "border-orange-400" : "border-gray-300"} `}
                >
                  {selected[q.id] === false && (
                    <img src={falseIcon} style={{ height: "25px" }} />
                  )}

                  {/* ❌ WRONG */}
                  {showResult &&
                    selected[q.id] === false &&
                    q.correct !== false && (
                      <span
                        className="absolute top-0 -right-3 -translate-y-1/2
      w-[22px] h-[22px]
rounded-full
bg-[red] text-white
flex items-center justify-center
text-[12px] font-bold
border-2 border-white
shadow-[0_2px_6px_rgba(0,0,0,0.2)]
pointer-events-nonel"
                      >
                        ✕
                      </span>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons-container">
        <button
          className="try-again-button"
          onClick={() => {
            setSelected({});
            setShowResult(false);
            setLocked(false);
          }}
        >
          Start Again ↻
        </button>
        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit3_Page6_Q2;
