import React, { useRef, useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 10.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 7.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 13.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 1.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 17.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 16.svg";

const ACTIVE_COLOR = "#f39b42";
const BORDER_COLOR = "#d9d9d9";
const ANSWER_COLOR = "#d62828";

const DRAG_ITEMS = [
  { id: 1, value: "glue" },
  { id: 2, value: "cup" },
  { id: 3, value: "bug" },
  { id: 4, value: "tune" },
  { id: 5, value: "blue" },
  { id: 6, value: "run" },
];

const ANSWERS = [
  { id: 1, correct: "glue", img: img1 },
  { id: 2, correct: "cup", img: img2 },
  { id: 3, correct: "bug", img: img3 },
  { id: 4, correct: "tune", img: img4 },
  { id: 5, correct: "blue", img: img5 },
  { id: 6, correct: "run", img: img6 },
];

// ✅ draggable wrapper (بدون ما نغير الشكل)
function DraggableWrapper({ item, disabled, showAns, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    disabled: disabled || showAns,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

// ✅ drop wrapper (بدون تغيير renderDropBox)
function DropWrapper({ id, children }) {
  const { setNodeRef } = useDroppable({ id });

  return <div ref={setNodeRef}>{children}</div>;
}

export default function WB_Unit3_Page17_QB() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const applyDrop = (boxKey, item) => {
    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key]?.dragId === item.id) {
        delete newAnswers[key];
      }
    });

    newAnswers[boxKey] = {
      dragId: item.id,
      value: item.value,
    };

    setAnswers(newAnswers);
    setShowResults(false);
  };

  // ✅ dnd-kit handler
  const handleDragEnd = (event) => {
    if (showAns ||showResults) return;

    const { active, over } = event;
    if (!over) return;

    const item = DRAG_ITEMS.find((i) => i.id === active.id);
    if (!item) return;

    applyDrop(over.id, item);
  };

  const handleRemoveAnswer = (boxKey) => {
    if (showAns) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[boxKey];
      return updated;
    });

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns ||showResults) return;

    const allAnswered = ANSWERS.every((item) => answers[`a-${item.id}`]?.value);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = ANSWERS.length;

    ANSWERS.forEach((item) => {
      if (answers[`a-${item.id}`]?.value === item.correct) {
        score++;
      }
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
    const filled = {};

    ANSWERS.forEach((item) => {
      const matched = DRAG_ITEMS.find((d) => d.value === item.correct);

      filled[`a-${item.id}`] = {
        dragId: matched?.id ?? item.id,
        value: item.correct,
      };
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults) return false;
    return answers[`a-${item.id}`]?.value !== item.correct;
  };

  const renderDropBox = (boxKey, wrong) => {
    const value = answers[boxKey]?.value || "";

    return (
      <div
        onClick={() => handleRemoveAnswer(boxKey)}
        style={{
          width: "100%",
        minWidth: "220px",
          minHeight: "42px",
          borderBottom: wrong ?"2px solid red":"1px solid #2f2f2f",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          textAlign: "center",
          fontSize: "clamp(12px, 1.7vw, 18px)",
          color: value ? "#111" : "#111",
          cursor: value && !showAns ? "pointer" : "default",
          position: "relative",
        }}
      >
        {value}

        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "red",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight:"700",
              border:"2px solid white",
              boxShadow:"0 2px 6px rgba(0,0,0,0.25)"
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="main-container-component">
        <div className="div-forall" style={{gap:"35px"}}>
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">B</span>
            Look and write.
          </h1>
          {/* 🔹 نفس UI بدون تغيير */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
              {DRAG_ITEMS.map((item) => {
                const isUsed = usedDragIds.includes(item.id);

                return (
                  <DraggableWrapper
                    key={item.id}
                    item={item}
                    disabled={isUsed}
                    showAns={showAns}
                  >
                    <div
                      style={{
                        padding: "8px 25px",
                        borderRadius: "16px",
                        border: `1px solid ${
                          isUsed ? BORDER_COLOR : ACTIVE_COLOR
                        }`,
                        opacity: isUsed ? 0.6 : 1,
                        cursor: isUsed || showAns ? "not-allowed" : "grab",
                      }}
                    >
                      {item.value}
                    </div>
                  </DraggableWrapper>
                );
              })}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "20px",
            }}
          >
            {ANSWERS.map((item) => (
              <div key={item.id}className="flex flex-col gap-5 justify-center items-center w-full"> 
                <div className="flex gap-5"> 
                <span className="text-[20px] font-semibold">{item.id} </span>
                <img src={item.img} style={{ width: "90px", height: "110px" }} />
</div>
                <DropWrapper id={`a-${item.id}`}>
                  {renderDropBox(`a-${item.id}`, isWrong(item))}
                </DropWrapper>
              </div>
            ))}
          </div>

          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </DndContext>
  );
}
