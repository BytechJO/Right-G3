import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd6pg32instruction-adult-lady_xXPh6TKj.mp3"; // ← غيّر المسار حسب ملف الأوديو
const ITEMS = [
  {
    id: 1,
    words: ["try", "grumpy", "fry", "cry"],
    correct: ["try", "fry", "cry"],
  },
  {
    id: 2,
    words: ["sandy", "hearty", "party", "spy"],
    correct: ["sandy", "hearty", "party"],
  },
];
export default function WB_Unit5_Page32_Qc() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
 const captions = [
  { start: 0.57, end: 9.88, text: "Page 32, phonics exercise D. Which words have the same Y sound? Listen and circle." },

  { start: 10.92, end: 16.79, text: "1- try, grumpy, fry, cry." },

  { start: 18.10, end: 22.73, text: "2- sandy, hardy, party, spy." },
];
const handleSelect = (id, word) => {
  if (showAns || checked) return;

  setAnswers((prev) => {
    const current = prev[id] || [];

    if (current.includes(word)) {
      return {
        ...prev,
        [id]: current.filter((w) => w !== word),
      };
    }

    return {
      ...prev,
      [id]: [...current, word],
    };
  });

  setChecked(false);
};

const handleCheck = () => {
  if (showAns || checked) return;

  const allAnswered = ITEMS.every(
    (item) => answers[item.id]?.length > 0
  );

  if (!allAnswered) {
    ValidationAlert.info("Please answer all questions first.");
    return;
  }

  let score = 0;

  ITEMS.forEach((item) => {
    const selected = answers[item.id] || [];

    const hasWrongChoice = selected.some(
      (word) => !item.correct.includes(word)
    );

    const missedCorrect = item.correct.some(
      (word) => !selected.includes(word)
    );

    const isCorrect = !hasWrongChoice && !missedCorrect;

    if (isCorrect) {
      score += 1;
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

  const isWrong = (item, word) => {
    if (!checked || showAns) return false;
    return answers[item.id] === word && word !== item.correct;
  };

 const isSelected = (item, word) => {
  return answers[item.id]?.includes(word);
};
const isQuestionWrong = (item) => {
  if (!checked || showAns) return false;

  const selected = answers[item.id] || [];

  const hasWrongChoice = selected.some(
    (word) => !item.correct.includes(word)
  );

  const missedCorrect = item.correct.some(
    (word) => !selected.includes(word)
  );

  return hasWrongChoice || missedCorrect;
};
  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "60px" }}>
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span>
          Which words have the same{" "}
          <span className="text-blue-900">-y sound</span>? Listen and circle.
        </h1>
     <QuestionAudioPlayer
            src={sound1}
            captions={captions}
            stopAtSecond={9.88}
          />
        {/* LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                   position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "20px",
                // flexWrap: "wrap",
              }}
            >
              {isQuestionWrong(item) && (
  <div
    style={{
      position: "absolute",
      top: "-10px",
      left: "-10px",
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      background: "red",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontWeight: "bold",
      border: "2px solid white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    }}
  >
    ✕
  </div>
)}
              {/* number */}
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  minWidth: "20px",
                }}
              >
                {item.id}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",

                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                {/* words row */}
                {item.words.map((word) => {
                  const selected = isSelected(item, word);
                  const wrong = isWrong(item, word);

                  return (
                    <div
                      key={word}
                      onClick={() => handleSelect(item.id, word)}
                      style={{
                        position: "relative",
                        padding: "6px 14px",
                        fontSize: "22px",
                        cursor: showAns || checked ? "default" : "pointer",
                        borderRadius: "50%",
                        border: selected
                          ? wrong
                            ? "2px solid red"
                            : "2px solid #f39b42"
                          : "2px solid transparent",
                      }}
                    >
                      {word}

                     
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div style={{ display: "flex", justifyContent: "center" }}>
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
