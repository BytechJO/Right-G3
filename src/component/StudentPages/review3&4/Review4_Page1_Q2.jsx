import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const items = [
  {
    sentence: "rispng",
    scrambled: ["rispng"],
    correct: ["spring"],
  },
  {
    sentence: "mersum",
    scrambled: ["mersum"],
    correct: ["summer"],
  },
  {
    sentence: "ntauum",
    scrambled: ["ntauum"],
    correct: ["autumn"],
  },
  {
    sentence: "reniwt",
    scrambled: ["reniwt"],
    correct: ["winter"],
  },
];

export default function Review4_Page1_Q2() {
  const [answers, setAnswers] = useState(items.map(() => []));
  const [hoveredWord, setHoveredWord] = useState(null);
  // ✅ بنك الحروف مع حالة used
  const [letterBank, setLetterBank] = useState(
    items.map((item) =>
      item.scrambled[0].split("").map((l) => ({
        value: l,
        used: false,
      })),
    ),
  );

  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);

  // ✅ حذف حرف وإرجاعه للبنك
  const handleRemoveLetter = (questionIndex, letterIndex) => {
    if (lockedIds.includes(questionIndex)) return;

    const updatedAnswers = [...answers];
    const updatedBank = [...letterBank];

    const removedLetter = updatedAnswers[questionIndex][letterIndex];

    updatedAnswers[questionIndex].splice(letterIndex, 1);

    // 🔁 إعادة تفعيل أول حرف مطابق
    const bankLetters = updatedBank[questionIndex];

    const indexToEnable = bankLetters.findIndex(
      (l) => l.value === removedLetter && l.used === true,
    );

    if (indexToEnable !== -1) {
      bankLetters[indexToEnable].used = false;
    }

    setAnswers(updatedAnswers);
    setLetterBank(updatedBank);
    setWrongIds((previous) => previous.filter((id) => id !== questionIndex));
  };

  const resetAll = () => {
    setAnswers(items.map(() => []));
    setLetterBank(
      items.map((item) =>
        item.scrambled[0].split("").map((l) => ({
          value: l,
          used: false,
        })),
      ),
    );
    setLockedIds([]);
    setWrongIds([]);
  };

  const showAnswers = () => {
    // حط الإجابات
    setAnswers(items.map((item) => item.correct[0].split("")));

    // 🔥 خلّي كل الحروف used
    const updatedBank = items.map((item) =>
      item.scrambled[0].split("").map((l) => ({
        value: l,
        used: true,
      })),
    );

    setLetterBank(updatedBank);

    setLockedIds(items.map((_, i) => i));
    setWrongIds([]);
  };
  const checkAnswers = () => {
    if (lockedIds.length === items.length) return;

    const empty = answers.some(
      (letters, i) => letters.length !== items[i].correct[0].length,
    );

    if (empty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let score = 0;

    answers.forEach((letters, i) => {
      if (letters.join("") === items[i].correct[0]) {
        score++;
      }
    });
    setLockedIds(
      items.flatMap((item, i) =>
        answers[i].join("") === item.correct[0] ? [i] : [],
      ),
    );
    setWrongIds(
      items.flatMap((item, i) =>
        answers[i].join("") !== item.correct[0] ? [i] : [],
      ),
    );

    const total = items.length;

    let color = score === total ? "green" : score === 0 ? "red" : "orange";

    const message = `
      <div style="font-size: 20px; text-align:center; margin-top: 8px;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} /${total}
        </span>
      </div>
    `;

    if (score === total) ValidationAlert.success(message);
    else if (score === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);
  };

  const handleAddLetter = (i, letterObj, index) => {
    if (lockedIds.includes(i)) return;
    if (letterObj.used) return;

    const updatedAnswers = [...answers];
    const updatedBank = [...letterBank];

    // منع امتلاء الكلمة
    if (updatedAnswers[i].length >= items[i].correct[0].length) return;

    updatedAnswers[i] = [...updatedAnswers[i], letterObj.value];
    updatedBank[i][index].used = true;

    setAnswers(updatedAnswers);
    setLetterBank(updatedBank);
    setWrongIds((previous) => previous.filter((id) => id !== i));
  };
  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "90px" }}>
        <ExerciseHeaderReview
          sectionLetter="B"
          title="Unscramble and write."
          subTitle="Say the complete answer first, then arrange the word tiles in sentence order and add punctuation."
        />
        <div className="flex flex-col gap-15">
          {items.map((item, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex items-center gap-6">
                <span className="font-bold text-lg">{i + 1}</span>
                <span className="font-bold text-lg">{item.sentence}</span>

                {/* 🔤 BANK */}
                <div className="w-full">
                  <div className="flex gap-2 w-full">
                    {letterBank[i].map((letter, index) => {
                      const id = `letter-${i}-${index}-${letter.value}`;

                      return (
                        <span
                          key={id}
                          role="button"
                          tabIndex={
                            letter.used || lockedIds.includes(i) ? -1 : 0
                          }
                          aria-disabled={letter.used || lockedIds.includes(i)}
                          onClick={() => handleAddLetter(i, letter, index)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              handleAddLetter(i, letter, index);
                            }
                          }}
                          className={`
    w-9 h-9 flex items-center justify-center rounded border
    ${
      letter.used
        ? "bg-gray-300 text-gray-500 opacity-60 cursor-not-allowed"
        : "bg-white border-1 border-[#F79530] cursor-pointer hover:bg-orange-50"
    }
  `}
                        >
                          {letter.value}
                        </span>
                      );
                    })}
                  </div>
                </div>
                {/* ✍️ SLOT */}
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      width: "200px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 8px",
                      position: "relative",
                      borderBottom: "1px solid gray",
                      // ❌ حالة الخطأ
                      ...(wrongIds.includes(i)
                        ? {
                            borderBottom: "2px solid red",
                            // backgroundColor: "#fee2e2",
                          }
                        : {}),
                    }}
                  >
                    {answers[i].map((letter, letterIndex) => {
                      const key = `${i}-${letterIndex}`;

                      return (
                        <span
                          key={key}
                          onMouseEnter={() => setHoveredWord(key)}
                          onMouseLeave={() => setHoveredWord(null)}
                          onClick={() => handleRemoveLetter(i, letterIndex)}
                          role="button"
                          tabIndex={lockedIds.includes(i) ? -1 : 0}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              handleRemoveLetter(i, letterIndex);
                            }
                          }}
                          className={`
        text-xl font-semibold
        ${lockedIds.includes(i) ? "cursor-default" : "cursor-pointer"}
      `}
                          style={{
                            marginRight: "2px",
                            color: hoveredWord === key ? "red" : "black",
                            transition: "0.2s",
                          }}
                        >
                          {letter}
                        </span>
                      );
                    })}

                    {wrongIds.includes(i) && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                        }}
                      >
                        <WrongMark />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={resetAll}>
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
    </div>
  );
}
