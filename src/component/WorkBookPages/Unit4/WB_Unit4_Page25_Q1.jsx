import React, { useMemo, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 3.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 1.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 4.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 2.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 5.svg";

const IMAGES = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
];

const SENTENCES = [
  { id: 1, text: "It is January. It is cold. I made a snowman.", correct: 2 },
  { id: 2, text: "It is June. It is sunny. They are in the park.", correct: 3 },
  { id: 3, text: "It is October. It is windy. We wear jackets.", correct: 5 },
  {
    id: 4,
    text: "It is April. It is rainy. We are under our umbrellas.",
    correct: 4,
  },
  {
    id: 5,
    text: "It is August. It is hot. They are at the beach.",
    correct: 1,
  },
];

const NUMBERS = [1, 2, 3, 4, 5];

export default function WB_Unit_Months_Page232_QH() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const usedNumbers = useMemo(() => Object.values(answers), [answers]);

  const assignNumber = (sentenceId, number) => {
    if (showAns || checked) return;

    setAnswers((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((k) => {
        if (updated[k] === number) delete updated[k];
      });

      updated[sentenceId] = number;
      return updated;
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const number = active.id;
    const sentenceId = Number(over.id);

    assignNumber(sentenceId, number);
  };

  // 🔥 Draggable Number
  const DraggableNumber = ({ num }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id: num,
      disabled: usedNumbers.includes(num) || showAns,
    });

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          width: "clamp(38px, 5vw, 42px)",
          height: "clamp(38px, 5vw, 42px)",
          borderRadius: "50%",
          backgroundColor: usedNumbers.includes(num) ? "#d1d5db" : "#f29a1f",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          fontSize: "clamp(18px, 2.3vw, 21px)",
          cursor: "grab",
          opacity: isDragging ? 0.3 : usedNumbers.includes(num) ? 0.5 : 1,
        }}
      >
        {num}
      </div>
    );
  };

  // 🔥 Drop Box
  const DropBox = ({ sentenceId }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: sentenceId,
    });

    const value = answers[sentenceId] || "";
    const sentence = SENTENCES.find((s) => s.id === sentenceId);
    const wrong = checked && value !== sentence.correct;

    return (
      <div
        ref={setNodeRef}
        onClick={() => value && removeAnswer(sentenceId)}
        style={{
          width: "clamp(38px, 4.5vw, 45px)",
          height: "clamp(38px,4.5vw, 45px)",
          border: `1px solid ${wrong ? "red" : "#f29a1f"}`,
          borderRadius: "8px",
          background: "#fff",
          boxShadow: isOver ? "0 0 0 4px rgba(243,155,66,0.35)" : "none",
          transform: isOver ? "scale(1.03)" : "scale(1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(18px, 2.4vw, 22px)",
          fontWeight: "500",
          position: "relative",
          transition: "0.2s",
          cursor: value && !checked && !showAns ? "pointer" : "default",
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
              fontWeight: 700,
              border: "2px solid #fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };
  const handleCheck = () => {
    if (showAns || checked) return;

    const allAnswered = SENTENCES.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    SENTENCES.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    setChecked(true);

    if (score === SENTENCES.length) {
      ValidationAlert.success(`Score: ${score} / ${SENTENCES.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${SENTENCES.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${SENTENCES.length}`);
    }
  };
  const removeAnswer = (sentenceId) => {
    if (showAns || checked) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[sentenceId];
      return updated;
    });
  };
  const handleShowAnswer = () => {
    const filled = {};

    SENTENCES.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setChecked(true);
    setShowAns(true);
    setActiveId(null); // مهم مع dnd-kit
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setActiveId(null); // reset drag
  };
  return (
    <DndContext
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragEnd={handleDragEnd}
    >
      <div className="main-container-component mb-10">
        <div className="div-forall" style={{ gap: "28px" }}>
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">H</span>
            Look, read, and match.
          </h1>

        

          {/* 🔥 Images */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "34px", flexWrap: "wrap" }}>
              {IMAGES.slice(0, 2).map((item) => (
                <img key={item.id} src={item.img} style={{ height: "160px" }} />
              ))}
            </div>

            <div style={{ display: "flex", gap: "34px", flexWrap: "wrap" }}>
              {IMAGES.slice(2).map((item) => (
                <img key={item.id} src={item.img} style={{ height: "160px" }} />
              ))}
            </div>
          </div>
  {/* 🔥 Numbers */}
          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {NUMBERS.map((num) => (
              <DraggableNumber key={num} num={num} />
            ))}
          </div>
          {/* 🔥 Sentences */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              maxWidth: "760px",
              // margin: "0 auto",
            }}
          >
            {SENTENCES.map((item) => (
              <div
                key={item.id}
                style={{ display: "flex", gap: "14px", alignItems: "center" }}
              >
                <DropBox sentenceId={item.id} />
                <div style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button />
          </div>
        </div>

        {/* 🔥 Drag Overlay */}
        <DragOverlay>
          {activeId ? (
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#f39b42",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "22px",
              }}
            >
              {activeId}
            </div>
          ) : null}
        </DragOverlay>
        <Button
          checkAnswers={handleCheck}
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleReset}
        />
      </div>
    </DndContext>
  );
}
