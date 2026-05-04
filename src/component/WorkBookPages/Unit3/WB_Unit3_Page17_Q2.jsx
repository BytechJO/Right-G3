import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const ACTIVE_COLOR = "#f39b42";
const WRONG_COLOR = "red";

const PASSAGE =
  "Stella, Helen, and Sarah are at a picnic in the park. Stella has brought fruit like apples and peaches. Helen has peanut butter sandwiches. Sarah has brought cookies and chips.";

const QUESTIONS = [
  {
    id: 1,
    text: "Does Stella have any ...",
    options: ["chips?", "fruit?", "cookies?"],
    correctOption: "fruit?",
    correctPronoun: "she has some",
  },
  {
    id: 2,
    text: "Does Sarah have any ...",
    options: ["cookies?", "peaches?", "sandwiches?"],
    correctOption: "cookies?",
    correctPronoun: "she has some",
  },
  {
    id: 3,
    text: "Does Helen have any ...",
    options: ["apples?", "sandwiches?", "chips?"],
    correctOption: "sandwiches?",
    correctPronoun: "she has some",
  },
];

export default function WB_Unit3_Page17_QF() {
  const [answers, setAnswers] = useState({});
  const [pronouns, setPronouns] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelectOption = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const handlePronounChange = (id, value) => {
    if (showAns) return;

    setPronouns((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const checkAnswers = () => {
    if (showAns) return;

    const allAnswered = QUESTIONS.every(
      (q) => answers[q.id] && pronouns[q.id]
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = QUESTIONS.length * 2;

    QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctOption) score++;
      if (pronouns[q.id] === q.correctPronoun) score++;
    });

    setShowResults(true);

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const correctAnswers = {};
    const correctPronouns = {};

    QUESTIONS.forEach((q) => {
      correctAnswers[q.id] = q.correctOption;
      correctPronouns[q.id] = q.correctPronoun;
    });

    setAnswers(correctAnswers);
    setPronouns(correctPronouns);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setPronouns({});
    setShowResults(false);
    setShowAns(false);
  };

  const isRowWrong = (q) => {
    if (!showResults) return false;

    return (
      answers[q.id] !== q.correctOption ||
      pronouns[q.id] !== q.correctPronoun
    );
  };

 const renderOption = (q, option) => {
  const selected = answers[q.id] === option;
  const wrong = showResults && selected && option !== q.correctOption;

  return (
    <div
      onClick={() => handleSelectOption(q.id, option)}
      style={{
        position: "relative",
        padding: "6px 16px",
        borderRadius: "999px",
        border: selected
          ? wrong
            ? `2px solid ${WRONG_COLOR}`
            : `1px solid ${ACTIVE_COLOR}`
          : "1px solid transparent",
        cursor: showAns ? "default" : "pointer",
        fontSize: "18px",
        transition: "0.2s ease",
        userSelect: "none",
        color: "#222",
      }}
    >
      {option}

      {/* ✕ فوق الدائرة */}
      {wrong && (
        <div
          style={{
            position: "absolute",
            top: "-6px",
            right: "-6px",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            backgroundColor: "red",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "700",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          }}
        >
          ✕
        </div>
      )}
    </div>
  );
};

  return (
  <div className="main-container-component mb-10">
      <div
        className="div-forall"
            style={{
          
          gap: "28px",
         
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">F</span> Read, circle, and answer.
        </h1>
 <div className="flex flex-col gap-10">
        <div
          style={{
            fontSize: "18px",
            lineHeight: "1.6",
            color: "#444",
          }}
        >
          {PASSAGE}
        </div>

        {QUESTIONS.map((q) => (
          <div
            key={q.id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              position: "relative",
              paddingRight: "30px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                color: "#000000ff",
                // fontWeight: "500",
              }}
            >
              <span className="font-semibold text-[20px] mr-2">{q.id}</span> {q.text}
            </div>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {q.options.map((opt) => (
                <React.Fragment key={opt}>
                  {renderOption(q, opt)}
                </React.Fragment>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                position: "relative",
                width: "100%",
             
              }}
            >
              <span style={{ fontSize: "18px", color: "#000000ff" }}>
                Yes,
              </span>

              <select
                value={pronouns[q.id] || ""}
                onChange={(e) => handlePronounChange(q.id, e.target.value)}
                style={{
                  fontSize: "18px",
                  borderBottom:isRowWrong(q)? "2px solid red": "1px solid #444",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#000000ff",
                  width:"70%"
                }}
              >
                <option value=""></option>
                <option value="he has some">he has some</option>
                <option value="she has some">she has some</option>
                <option value="he have some">he have some</option>
                <option value="she have some">she have some</option>
              </select>

          

              {isRowWrong(q) && (
                <div
                  style={{
                   position: "absolute",
              top: "-7px",
              right: "25%",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "red",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "700",
              border: "2px solid white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                  }}
                >
                  ✕
                </div>
              )}
            </div>

            {/* <div style={{ borderBottom: "1px solid #444", width: "100%" }} /> */}
          </div>
        ))}
</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            checkAnswers={checkAnswers}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}