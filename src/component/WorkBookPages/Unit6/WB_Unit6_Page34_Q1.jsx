import React, { useMemo, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.4.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.2.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.3.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.6.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.5.svg";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
function DraggableNumber({ num, disabled }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: num,
    disabled,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
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
        borderRadius: "50%",
        background: "#f29a1f",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: "bold",
      }}
    >
      {num}
    </div>
  );
}

function DroppableCard({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: isOver ? "scale(1.05)" : "scale(1)",
        transition: "0.2s",
      }}
    >
      {children(isOver)}
    </div>
  );
}
const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const DRAG_BG = "#f29a1f";
const TEXT_COLOR = "#111";

const SENTENCES = [
  { id: 1, text: "A small cat and a big dog are running down the hill." },
  { id: 2, text: "They're running across the street." },
  { id: 3, text: "The cat can go through the fence. The dog can't." },
  { id: 4, text: "The dog can't jump over the fence." },
  { id: 5, text: "The cat is climbing up a tree." },
  { id: 6, text: "The cat is happy. The dog is sad." },
];

const IMAGE_CARDS = [
  { id: 1, img: img1, correctNumber: 3 },
  { id: 2, img: img2, correctNumber: 5 },
  { id: 3, img: img3, correctNumber: 2 },
  { id: 4, img: img4, correctNumber: 6 },
  { id: 5, img: img5, correctNumber: 1 },
  { id: 6, img: img6, correctNumber: 4 },
];

const DRAG_NUMBERS = [1, 2, 3, 4, 5, 6];

export default function SB_ReadLookNumber_PageC() {
  const [imageAnswers, setImageAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [touchItem, setTouchItem] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedNumbers = useMemo(
    () => Object.values(imageAnswers),
    [imageAnswers],
  );

  const applyDrop = (cardId, num) => {
    const updated = { ...imageAnswers };
    Object.keys(updated).forEach((k) => {
      if (updated[k] === num) delete updated[k];
    });
    updated[cardId] = num;
    setImageAnswers(updated);
    setDraggedNumber(null);
    setChecked(false);
  };

  const handleRemoveNumber = (cardId) => {
    if (showAns||checked) return;
    setImageAnswers((prev) => {
      const updated = { ...prev };
      delete updated[cardId];
      return updated;
    });
    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns||checked) return;
    const allAnswered = IMAGE_CARDS.every((c) => imageAnswers[c.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    IMAGE_CARDS.forEach((c) => {
      if (imageAnswers[c.id] === c.correctNumber) score++;
    });
    setChecked(true);
    const total = IMAGE_CARDS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const correct = {};
    IMAGE_CARDS.forEach((c) => {
      correct[c.id] = c.correctNumber;
    });
    setImageAnswers(correct);
    setChecked(true);
    setShowAns(true);
    setDraggedNumber(null);
    setTouchItem(null);
  };

  const handleReset = () => {
    setImageAnswers({});
    setDraggedNumber(null);
    setTouchItem(null);
    setChecked(false);
    setShowAns(false);
  };

  const isCardWrong = (cardId) => {
    if (!checked || showAns) return false;
    const card = IMAGE_CARDS.find((c) => c.id === cardId);
    return imageAnswers[cardId] !== card.correctNumber;
  };

  return (
    <DndContext
      onDragStart={(event) => {
        setDraggedNumber(event.active.id);
      }}
      onDragEnd={(event) => {
        const { active, over } = event;

        setDraggedNumber(null);

        if (!over) return;

        const cardId = over.id;

        applyDrop(Number(cardId), active.id);
      }}
    >
      <div className="main-container-component">
        <div
          className="div-forall"
          style={{
            gap: "35px",
          }}
        >
          {/* Title */}
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">C</span>
            Read, look, and number the pictures. Point and say.
          </h1>

          {/* Sentences */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(6px,0.9vw,12px)",
              width: "100%",
            }}
          >
            {SENTENCES.map((s) => (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "clamp(8px,1vw,14px)",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: TEXT_COLOR,
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: "clamp(16px,1.9vw,26px)",
                  }}
                >
                  {s.id}
                </span>
                <span
                  style={{
                    fontSize: "clamp(14px,1.4vw,18px)",
                    // fontWeight: 500,
                    color: TEXT_COLOR,
                    lineHeight: 1.35,
                    wordBreak: "break-word",
                  }}
                >
                  {s.text}
                </span>
              </div>
            ))}
          </div>
          {/* Drag numbers */}
          <div className="flex gap-5 justify-center">
            {DRAG_NUMBERS.map((num) => {
              const disabled = usedNumbers.includes(num);

              return (
                <DraggableNumber
                  key={num}
                  num={num}
                  disabled={disabled || showAns}
                />
              );
            })}
          </div>
          {/* Image cards 3×2 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              width: "100%",
            }}
          >
            {IMAGE_CARDS.map((card) => (
              <DroppableCard key={card.id} id={card.id}>
                {(isOver) => {
                  const wrong = isCardWrong(card.id);
                  const num = imageAnswers[card.id];

                  return (
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        // aspectRatio: "1.5 / 1",
                        // border: `2px solid ${
                        //   isOver ? "#f59e0b" : wrong ? "#ef4444" : "#f39b42"
                        // }`,
                        // borderRadius: "12px",
                        background: isOver ? "#fff7ed" : "white",
                        transition: "0.2s",
                      }}
                    >
                      {/* الصورة */}
                      <img
                        src={card.img}
                        style={{
                          width: "90%",
                          height: "auto",
                          objectFit: "contain",
                          pointerEvents: "none",
                        }}
                      />

                      {/* الرقم */}
                      <div
                        onClick={() => handleRemoveNumber(card.id)}
                        style={{
                          position: "absolute",
                          top: "2%",
                          right: "12%",
                          width: "40px",
                          height: "40px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "22px",
                          fontWeight: "bold",
                          color: wrong ? "red" : "#111",
                          cursor: num && !showAns ? "pointer" : "default",
                        }}
                      >
                        {num || ""}
                      </div>

                      {/* ❌ علامة الخطأ */}
                      {wrong && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-6px",
                            right: "8%",
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
                }}
              </DroppableCard>
            ))}
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
              handleStartAgain={handleReset}
            />
          </div>
        </div>

        {/* Touch ghost */}
        {touchItem !== null && (
          <div
            style={{
              position: "fixed",
              left: touchPos.x - 28,
              top: touchPos.y - 28,
              width: "clamp(40px,5vw,56px)",
              height: "clamp(40px,5vw,56px)",
              borderRadius: "50%",
              background: DRAG_BG,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(18px,2.4vw,30px)",
              fontWeight: 700,
              pointerEvents: "none",
              zIndex: 9999,
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            {touchItem}
          </div>
        )}
      </div>
      <DragOverlay>
        {draggedNumber ? (
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "#f29a1f",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            {draggedNumber}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
