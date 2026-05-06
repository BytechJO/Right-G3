import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import roomImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 42/SVG/2.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "red";
const ANSWER_COLOR = "#000000ff";
const LINE_COLOR = "#2f2f2f";

const DRAG_ITEMS = [
  { id: "da", value: "a" },
  { id: "db", value: "b" },
  { id: "dc", value: "c" },
  { id: "dd", value: "d" },
  { id: "de", value: "e" },
  { id: "df", value: "f" },
  { id: "dg", value: "g" },
  { id: "dh", value: "h" },
];

const LEFT_ITEMS = [
  { id: 1, text: "The bag" },
  { id: 2, text: "The guitar" },
  { id: 3, text: "The cat" },
  { id: 4, text: "The game" },
  { id: 5, text: "The shirt" },
  { id: 6, text: "The doll" },
  { id: 7, text: "The teddy bear" },
  { id: 8, text: "The table lamp" },
];

const RIGHT_ITEMS = [
  { id: "a", text: "is on the bed." },
  { id: "b", text: "is next to the chair." },
  { id: "c", text: "is next to the bed." },
  { id: "d", text: "is on the chair." },
  { id: "e", text: "is under the bed." },
  { id: "f", text: "is on the table." },
  { id: "g", text: "is in front of the pillow." },
  { id: "h", text: "is under the table." },
];

const CORRECT = {
  1: "d",
  2: "e",
  3: "h",
  4: "f",
  5: "a",
  6: "g",
  7: "b",
  8: "c",
};
const DraggableItem = ({ item, isUsed, showAns }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    disabled: isUsed || showAns,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        // ...style,
        width: "45px",
        height: "45px",
        borderRadius: "10px",
        border: `1px solid ${isUsed ? "#d9d9d9" : BORDER_COLOR}`,
        backgroundColor: isUsed ? "#eeeeee" : "",
        color: isUsed ? "#aaa" : "#222",
        cursor: isUsed || showAns ? "not-allowed" : "grab",
        opacity: isUsed ? 0.55 : 1,
        fontSize: "20px",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: isUsed ? "none" : "0 2px 6px rgba(0,0,0,0.07)",
      }}
    >
      {item.value}
    </div>
  );
};

const DropZone = ({ boxKey, value, wrong, showAns, onRemove }) => {
  const { setNodeRef } = useDroppable({
    id: boxKey,
  });

  return (
    <div
      ref={setNodeRef}
      onClick={() => value && !showAns && onRemove(boxKey)}
      style={{
        position: "relative",
        width: "45px",
        height: "45px",
        borderRadius: "8px",
        border: `1px solid ${BORDER_COLOR}`,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: value && !showAns ? "pointer" : "default",
      }}
    >
      {value && (
        <span style={{ fontSize: "18px", fontWeight: 700 }}>{value}</span>
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
  );
};
export default function WB_LookReadMatch_PageH() {
  const [answers, setAnswers] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [touchItem, setTouchItem] = useState(null);

  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const usedIds = Object.values(answers)
    .filter(Boolean)
    .map((e) => e.dragId);

  const handleRemove = (boxKey) => {
    if (showAns || showResults) return;
    setAnswers((prev) => {
      const u = { ...prev };
      delete u[boxKey];
      return u;
    });
  };

  const handleCheck = () => {
    if (showAns || showResults) return;
    const allAnswered = LEFT_ITEMS.every((i) => answers[`a-${i.id}`]?.value);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    LEFT_ITEMS.forEach((i) => {
      if (answers[`a-${i.id}`]?.value === CORRECT[i.id]) score++;
    });
    setShowResults(true);
    const total = LEFT_ITEMS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    LEFT_ITEMS.forEach((i) => {
      const correctVal = CORRECT[i.id];
      const d = DRAG_ITEMS.find((d) => d.value === correctVal);
      filled[`a-${i.id}`] = { dragId: d?.id, value: correctVal };
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

  const isWrong = (id) =>
    showResults && !showAns && answers[`a-${id}`]?.value !== CORRECT[id];

  return (
    <DndContext
      onDragStart={(event) => {
        const dragged = DRAG_ITEMS.find((d) => d.id === event.active.id);
        setActiveItem(dragged);
      }}
      onDragEnd={(event) => {
        const { active, over } = event;

        if (!over || showAns) {
          setActiveItem(null);
          return;
        }

        const dragged = DRAG_ITEMS.find((d) => d.id === active.id);

        const updated = { ...answers };

        Object.keys(updated).forEach((k) => {
          if (updated[k]?.dragId === dragged.id) delete updated[k];
        });

        updated[over.id] = {
          dragId: dragged.id,
          value: dragged.value,
        };

        setAnswers(updated);
        setShowResults(false);
        setActiveItem(null);
      }}
    >
      <div className="main-container-component">
        <div
          className="div-forall"
          style={{
            gap: "clamp(18px,2.5vw,28px)",
          }}
        >
          {/* Title */}
          <h1
            className="WB-header-title-page8"
            style={{
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <span className="WB-ex-A">H</span> Look, read, and match.
          </h1>

          {/* ── الصورة ── */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // maxWidth: "520px",
              // margin: "0 auto",
              // border: `2px solid ${BORDER_COLOR}`,
              // borderRadius: "clamp(12px,1.4vw,18px)",
              // overflow: "hidden",
              // background: "#f7f7f7",
            }}
          >
            <img
              src={roomImg}
              alt="bedroom"
              style={{
                width: "auto",
                height: "300px",
                display: "block",
                objectFit: "contain",
              }}
            />
          </div>

          {/* ── Word Bank: الحروف a-h ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {DRAG_ITEMS.map((item) => {
              const isUsed = usedIds.includes(item.id);
              return (
                <DraggableItem
                  key={item.id}
                  item={item}
                  isUsed={isUsed}
                  showAns={showAns||showResults}
                />
              );
            })}
          </div>

          {/* ── القائمتان ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(16px,3vw,40px)",
              width: "100%",
              alignItems: "start",
            }}
          >
            {/* يسار: الأرقام مع drop zone */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                 gap: "clamp(6px,1vw,16px)",
              }}
            >
              {LEFT_ITEMS.map((item) => {
                const boxKey = `a-${item.id}`;
                const value = answers[boxKey]?.value || "";
                const wrong = isWrong(item.id);

                return (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(8px,1vw,14px)",
                    }}
                  >
                    {/* Drop zone — الحرف */}
                    <DropZone
                      boxKey={boxKey}
                      value={value}
                      wrong={wrong}
                      showAns={showAns||showResults}
                      onRemove={handleRemove}
                    />

                    {/* رقم + نص */}
                    <span
                      style={{
                        fontSize: "clamp(14px,1.6vw,20px)",
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
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* يمين: الحروف + النصوص */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(6px,1vw,10px)",
              }}
            >
              {RIGHT_ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(8px,1vw,14px)",
                    minHeight: "clamp(32px,4vw,48px)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(14px,1.6vw,20px)",
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
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "clamp(6px,1vw,12px)",
            }}
          >
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
            />
          </div>
        </div>

        <DragOverlay>
          {activeItem ? (
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "10px",
                border: `1px solid ${BORDER_COLOR}`,
                // backgroundColor: "#ffca94",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 700,
                color: "#222",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                cursor: "grabbing",
              }}
            >
              {activeItem.value}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
