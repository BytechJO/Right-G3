import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { DragOverlay } from "@dnd-kit/core";
import raceImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 36/H.1.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const HOVER_COLOR = "#f59e0b";
const DRAG_BG = "#f29a1f";
const LINE_COLOR = "#2f2f2f";

/* ───────── Draggable ───────── */
function DraggableItem({ item, disabled }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    disabled,
  });

  const style = {
    // transform: transform
    //   ? `translate(${transform.x}px, ${transform.y}px)`
    //   : undefined,
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        ...style,
        width: "45px",
        height: "45px",
        borderRadius: "10px",
        border: `1px solid ${BORDER_COLOR}`,
        background: disabled ? "#eee" : "",
        // color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: "20px",
        // boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
        transition: "0.2s",
      }}
    >
      {item.value}
    </div>
  );
}

/* ───────── Droppable ───────── */
function DropBox({ id, children, wrong }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: isOver ? "scale(1.05)" : "scale(1)",
        borderBottom: `2px solid ${
          wrong ? "red" : isOver ? "#f59e0b" : "#2f2f2f"
        }`,
        backgroundColor: isOver ? "#fce8d3ff" : "",
        transition: "0.2s",
      }}
    >
      {children(isOver)}
    </div>
  );
}

/* ───────── Data ───────── */
const DRAG_ITEMS = [
  { id: "dA", value: "A" },
  { id: "dB", value: "B" },
  { id: "dC", value: "C" },
  { id: "dD", value: "D" },
  { id: "dE", value: "E" },
  { id: "dF", value: "F" },
  { id: "dG", value: "G" },
  { id: "dH", value: "H" },
  { id: "dI", value: "I" },
  { id: "dJ", value: "J" },
  { id: "dK", value: "K" },
  { id: "dL", value: "L" },
];

const ITEMS = [
  { id: 1, question: "Who is first?", correct: "L" },
  { id: 2, question: "Who is third?", correct: "J" },
  { id: 3, question: "Who is ninth?", correct: "D" },
  { id: 4, question: "Who is fifth?", correct: "H" },
  { id: 5, question: "Who is fourth?", correct: "I" },
  { id: 6, question: "Who is eleventh?", correct: "B" },
  { id: 7, question: "Who is seventh?", correct: "F" },
  { id: 8, question: "Who is tenth?", correct: "C" },
];

/* ───────── Component ───────── */
export default function WB_ReadAndWrite_PageH() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const usedIds = Object.values(answers).map((a) => a.dragId);

  const applyDrop = (boxKey, itemId) => {
    const item = DRAG_ITEMS.find((i) => i.id === itemId);

    const updated = { ...answers };

    // remove from other boxes
    Object.keys(updated).forEach((k) => {
      if (updated[k]?.dragId === itemId) delete updated[k];
    });

    updated[boxKey] = {
      dragId: item.id,
      value: item.value,
    };

    setAnswers(updated);
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showResults || showAns) return;
    const allAnswered = ITEMS.every((i) => answers[`a-${i.id}`]);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    ITEMS.forEach((i) => {
      if (answers[`a-${i.id}`]?.value === i.correct) score++;
    });

    setShowResults(true);

    if (score === ITEMS.length)
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => {
      const d = DRAG_ITEMS.find((d) => d.value === i.correct);
      filled[`a-${i.id}`] = { dragId: d.id, value: i.correct };
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) =>
    showResults && !showAns && answers[`a-${item.id}`]?.value !== item.correct;

  return (
    <DndContext
      onDragStart={({ active }) => {
        const item = DRAG_ITEMS.find((i) => i.id === active.id);
        setActiveItem(item);
      }}
      onDragEnd={({ active, over }) => {
        if (over) {
          applyDrop(over.id, active.id);
        }
        setActiveItem(null);
      }}
    >
      <div className="main-container-component mb-10">
        <div className="div-forall" style={{ gap: "20px" }}>
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">H</span>
            Read and write the answers.
          </h1>
          <div className="flex flex-col gap-10">
          {/* Image */}
          <img src={raceImg} style={{ width: "100%", height: "150px" }} />

          {/* Drag letters */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {DRAG_ITEMS.map((item) => (
              <DraggableItem
                key={item.id}
                item={item}
                disabled={usedIds.includes(item.id) || showAns}
              />
            ))}
          </div>

          {/* Questions */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "20px",
            }}
          >
            {ITEMS.map((item) => {
              const boxKey = `a-${item.id}`;
              const value = answers[boxKey]?.value;
              const wrong = isWrong(item);

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "10px",
                  }}
                >
                  <span className="text-xl font-semibold">{item.id}</span>
                  <span className="text-[18px] w-40">{item.question}</span>

                  <DropBox id={boxKey} wrong={wrong}>
                    {(isOver) => (
                      <div
                        style={{
                          minWidth: "150px",
                          height: "40px",
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "center",
                          cursor:
                            (value && !showAns) || !showResults
                              ? "pointer"
                              : "default",
                        }}
                      >
                        {value && (
                          <span
                            style={{
                              color: "#000",
                              // fontWeight: "700",
                           
                              fontSize: "22px",
                            }}
                          >
                            {value}
                          </span>
                        )}

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
                            }}
                          >
                            ✕
                          </div>
                        )}
                      </div>
                    )}
                  </DropBox>
                </div>
              );
            })}
          </div>
</div>
          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleReset}
            />
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeItem ? (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "white",
              border: "1px solid #f39b42",
              // color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "26px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              transform: "scale(1.1)",
              opacity: 0.95,
            }}
          >
            {activeItem.value}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
