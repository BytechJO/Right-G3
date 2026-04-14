import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import roomImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/1.svg";

const QUESTIONS = [
  { id: 1, text: "Did Grandma have a radio?", correct: "Yes" },
  { id: 2, text: "Did she have a TV?", correct: "No" },
  { id: 3, text: "Did she have a cat?", correct: "No" },
  { id: 4, text: "Did she have a bird?", correct: "No" },
  { id: 5, text: "Did she have a lamp?", correct: "Yes" },
  { id: 6, text: "Did she have a phone?", correct: "No" },
  { id: 7, text: "Did she have a rug?", correct: "Yes" },
  { id: 8, text: "Did she have a mirror?", correct: "No" },
];

export default function WB_Unit6_Page46_Q1() {
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

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions!");
      return;
    }

    let score = 0;

    QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correct) {
        score++;
      }
    });

    setChecked(true);

    if (score === QUESTIONS.length) {
      ValidationAlert.success(`Score: ${score} / ${QUESTIONS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${QUESTIONS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${QUESTIONS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    QUESTIONS.forEach((q) => {
      correctMap[q.id] = q.correct;
    });

    setAnswers(correctMap);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (id) => {
    if (!checked) return false;
    return answers[id] !== QUESTIONS.find((q) => q.id === id).correct;
  };

  const getBoxStyle = (selected) => ({
    width: "22px",
    height: "22px",
    border: "1.5px solid #f59e0b",
    borderRadius: "4px",
    backgroundColor: selected ? "#ef4444" : "#fff",
    cursor: showAns ? "default" : "pointer",
  });

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">C</span>
          Look and write ✓ for Yes or No.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr",
            gap: "26px",
            alignItems: "start",
          }}
        >
          {/* left image */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={roomImg}
              alt="grandma-room"
              style={{
                width: "190px",
                height: "215px",
                objectFit: "contain",
                display: "block",
                borderRadius: "10px",
                border: "1.5px solid #f59e0b",
              }}
            />
          </div>

          {/* right questions */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 42px 42px",
                alignItems: "center",
                marginBottom: "2px",
                fontSize: "18px",
                color: "#222",
              }}
            >
              <div></div>
              <div style={{ textAlign: "center" }}>Yes</div>
              <div style={{ textAlign: "center" }}>No</div>
            </div>

            {QUESTIONS.map((q) => (
              <div
                key={q.id}
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "1fr 42px 42px",
                  alignItems: "center",
                  gap: "8px",
                  minHeight: "30px",
                }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    color: "#111",
                    lineHeight: "1.4",
                  }}
                >
                  <strong>{q.id}</strong> {q.text}
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={() => handleSelect(q.id, "Yes")}
                    style={getBoxStyle(answers[q.id] === "Yes")}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={() => handleSelect(q.id, "No")}
                    style={getBoxStyle(answers[q.id] === "No")}
                  />
                </div>

                {isWrong(q.id) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-24px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
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