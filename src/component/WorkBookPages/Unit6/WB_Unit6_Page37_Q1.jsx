import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/I.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/I.3.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/I.2.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/I.4.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const HOVER_COLOR = "#f59e0b";
const SOFT_COLOR = "#ffca94";
const LINE_COLOR = "#333";

/* ───────── Draggable ───────── */
function DraggableItem({ item, disabled }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        // transform: transform
        //   ? `translate(${transform.x}px, ${transform.y}px)`
        //   : undefined,
        padding: "8px 14px",
        borderRadius: "12px",
        border: `1px solid ${BORDER_COLOR}`,
        background: disabled ? "#eee" : "",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "grab",
        fontWeight: "600",
        // boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {item.value}
    </div>
  );
}

/* ───────── Drop ───────── */
function DropBox({ id, children, wrong }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "relative",
        minHeight: "38px",
        borderBottom: `2px solid ${
          wrong ? WRONG_COLOR : isOver ? HOVER_COLOR : LINE_COLOR
        }`,
        background: isOver ? "#fce8d3" : "",
        transition: "0.2s",
      }}
    >
      {children(isOver)}
    </div>
  );
}

/* ───────── Data ───────── */
const ITEMS = [
  {
    id: 1,
    img: img1,
    example: false,
    question: "What month is it ?",
    answer: "It's July.",
  },
  {
    id: 2,
    img: img2,
    example: false,
    question: "What month is it ?",
    answer: "It's April.",
  },
  {
    id: 3,
    img: img3,
    example: false,
    question: "What month is it ?",
    answer: "It's September.",
  },
  {
    id: 4,
    img: img4,
    example: false,
    question: "What month is it ?",
    answer: "It's November.",
  },
];

const DRAG_ITEMS = ITEMS.filter((i) => !i.example).map((i) => ({
  id: `ans-${i.id}`,
  value: i.answer,
}));

/* ───────── Component ───────── */
export default function SB_ReadLookWrite_PageI() {
  const [answers, setAnswers] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedIds = Object.values(answers).map((a) => a.dragId);

  const applyDrop = (boxKey, itemId) => {
    const item = DRAG_ITEMS.find((i) => i.id === itemId);

    const updated = { ...answers };

    Object.keys(updated).forEach((k) => {
      if (updated[k]?.dragId === itemId) delete updated[k];
    });

    updated[boxKey] = { dragId: item.id, value: item.value };

    setAnswers(updated);
   
  };

  const handleCheck = () => {
    if(showResults||showAns)return
    const editables = ITEMS.filter((i) => !i.example);

    const allAnswered = editables.every((i) => answers[`a-${i.id}`]);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    editables.forEach((i) => {
      if (answers[`a-${i.id}`]?.value === i.answer) score++;
    });

    setShowResults(true);

    if (score === editables.length)
      ValidationAlert.success(`Score: ${score} / ${editables.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${editables.length}`);
    else ValidationAlert.error(`Score: ${score} / ${editables.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.filter((i) => !i.example).forEach((i) => {
      const d = DRAG_ITEMS.find((d) => d.value === i.answer);
      filled[`a-${i.id}`] = { dragId: d.id, value: i.answer };
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
    showResults && !showAns && answers[`a-${item.id}`]?.value !== item.answer;

  return (
    <DndContext
      onDragStart={({ active }) => {
        const item = DRAG_ITEMS.find((i) => i.id === active.id);
        setActiveItem(item);
      }}
      onDragEnd={({ active, over }) => {
        if (over) applyDrop(over.id, active.id);
        setActiveItem(null);
      }}
    >
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "55px" }}>
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">I</span> Read, look, and write.
          </h1>

          {/* Word Bank */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
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

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "40px",
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
                    // flexDirection: "column",
                    alignItems:"center",
                    gap: "10px",
                  }}
                >
                  <div className="flex">
                    <span className="text-xl font-semibold">{item.id}</span>
                    <img
                      src={item.img}
                      style={{
                        width: "auto",
                        height: "120px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-5 w-70">
                    <div
                      style={{
                        borderBottom: `2px solid ${LINE_COLOR}`,
                        fontWeight: "600",
                      }}
                    >
                      {item.question}
                    </div>

                    {item.example ? (
                      <div style={{ borderBottom: `2px solid ${LINE_COLOR}` }}>
                        {item.answer}
                      </div>
                    ) : (
                      <DropBox id={boxKey} wrong={wrong}>
                        {() => (
                          <div style={{ minHeight: "40px" }}>
                            {value && <span>{value}</span>}

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
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>

      {/* Overlay */}
      <DragOverlay>
        {activeItem && (
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "12px",
              background: "white",
              border: `1px solid ${BORDER_COLOR}`,
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              // fontWeight: "700",
              fontSize: "16px",
              transform: "scale(1.1)",
            }}
          >
            {activeItem.value}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
