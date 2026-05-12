import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import sceneImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/7.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "red";
const ANSWER_COLOR = "#000000ff";
const LINE_COLOR = "#2f2f2f";

const DRAG_ITEMS = [
  { id: "d3", value: "in the living room" },
  { id: "d4", value: "at the computer" },
  { id: "d5", value: "in the living room ironing clothes" },
];

const ITEMS = [
  {
    id: 1,
    fixed: false,
    question: "Can you see Helen?",
    beforeDrop: "Yes, I can see her",
    afterDrop: ".",
    correct: "in the living room",
  },
  {
    id: 2,
    fixed: false,
    question: "Can you see Helen's brother?",
    before: "Yes, I can see",
    middle: "him",
    middleFixed: true,
    after: "",
    dropKey: "loc",
    correct: "at the computer",
    beforeDrop: "Yes, I can see him",
    afterDrop: ".",
  },
  {
    id: 3,
    fixed: false,
    question: "Can you see Helen's mom?",
    beforeDrop: "Yes, I can see her",
    afterDrop: ".",
    correct: "in the living room ironing clothes",
  },
];

export default function WB_LookReadFind_PageD() {
  const [answers, setAnswers] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [touchItem, setTouchItem] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleCheck = () => {
    if (showAns ||showResults) return;
    const editables = ITEMS.filter((i) => !i.fixed);
    const allAnswered = editables.every((i) => answers[`a-${i.id}`]?.value);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    editables.forEach((i) => {
      if (answers[`a-${i.id}`]?.value === i.correct) score++;
    });
    setShowResults(true);
    const total = editables.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.filter((i) => !i.fixed).forEach((i) => {
      const d = DRAG_ITEMS.find((d) => d.value === i.correct);
      filled[`a-${i.id}`] = { dragId: d?.id, value: i.correct };
    });
    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setDraggedItem(null);
    setTouchItem(null);
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) =>
    showResults && !showAns && answers[`a-${item.id}`]?.value !== item.correct;

  const renderDropZone = (item) => {
    const boxKey = `a-${item.id}`;
    const value = answers[boxKey]?.value || "";
    const wrong = isWrong(item);

    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "6px",
          width: "100%",
        }}
      >
        {/* before */}
        <span
          style={{
            fontSize: "18px",
            // fontWeight: 500,
            color: "#111",
          }}
        >
          {item.beforeDrop}
        </span>

        {/* wrapper */}
        <div
          style={{
            position: "relative",
            minWidth: "clamp(120px,18vw,260px)",
          }}
        >
          {/* select مخفي */}
          <select
            value={value}
            onChange={(e) =>
              setAnswers((prev) => ({
                ...prev,
                [boxKey]: { value: e.target.value },
              }))
            }
            disabled={showAns||showResults}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: showAns||showResults ?"default":"pointer",
              zIndex: 2,
            }}
          >
            <option value="" disabled>
              Select...
            </option>
            {DRAG_ITEMS.map((opt) => (
              <option key={opt.id} value={opt.value}>
                {opt.value}
              </option>
            ))}
          </select>

          {/* الشكل القديم */}
          <div
            style={{
              minHeight: "clamp(28px,3.2vw,38px)",
              borderBottom: wrong
                ? `2px solid ${WRONG_COLOR}`
                : `1px solid ${LINE_COLOR}`,
              display: "flex",
              alignItems: "flex-end",
              paddingBottom: "3px",
            }}
          >
            {value ? (
              <span
                style={{
                  fontSize: "18px",
                  // fontWeight: 600,
                  color: ANSWER_COLOR,
                  lineHeight: 1,
                  wordBreak: "break-word",
                }}
              >
                {value}
              </span>
            ) : (
              <span
                style={{
                  fontSize: "18px",
                  color: "#aaa",
                }}
              >
                Select...
              </span>
            )}
          </div>

          {/* wrong icon */}
          {wrong && (
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
                border: "2px solid white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                zIndex: 3,
              }}
            >
              ✕
            </div>
          )}
        </div>

        {/* after */}
        <span
          style={{
            fontSize: "clamp(14px,1.6vw,20px)",
            fontWeight: 500,
            color: "#111",
          }}
        >
          {item.afterDrop}
        </span>
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
             
              gap: "55px",
            }}
      >
        {/* Title */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span> Look, read, and find. Write.
        </h1>

        {/* ── Layout: يسار أسئلة + يمين صورة ── */}
        <div
          style={{
            display: "flex",
         
            gap: "clamp(16px,2.5vw,30px)",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* ── يسار: Word Bank + الأسئلة ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px,2vw,24px)",
            }}
          >
            {/* الأسئلة */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height:"400px",
                justifyContent:"space-between"
                // gap: "45px",
              }}
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "25px",
                  }}
                >
                  {/* رقم + سؤال */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#111",
                        flexShrink: 0,
                      }}
                    >
                      {item.id}
                    </span>
                    <span
                      style={{
                        fontSize: "18px",
                        // fontWeight: 500,
                        color: "#111",
                      }}
                    >
                      {item.question}
                    </span>
                  </div>

                  {/* الإجابة */}
                  {item.fixed ? (
                    <div
                      style={{
                        fontSize: "18px",
                        // fontWeight: 500,
                        color: "#111",
                        borderBottom: `1px solid ${LINE_COLOR}`,
                        paddingBottom: "4px",
                        width: "100%",
                      }}
                    >
                      {item.answer}
                    </div>
                  ) : (
                    renderDropZone(item)
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── يمين: الصورة ── */}
          <div
            style={{
              // width: "clamp(220px,32vw,400px)",
              // border: `2px solid ${BORDER_COLOR}`,
              // borderRadius: "clamp(12px,1.4vw,18px)",
              // overflow: "hidden",
              // background: "#f7f7f7",
              // flexShrink: 0,
            }}
          >
            <img
              src={sceneImg}
              alt="scene"
              style={{
                width: "auto",
                height: "400px",
                display: "block",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
         
          }}
        >
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
