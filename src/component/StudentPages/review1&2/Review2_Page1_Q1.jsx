import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";

import { SortableContext, useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Asset 18.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Asset 19.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Asset 21.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Asset 20.svg";
import Button from "../../Button";

function DraggableWord({ word, isUsed, locked }) {
 const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
  isDragging,
} = useSortable({
  id: word,
  disabled: isUsed || locked,
});

 const style = {
  transform: CSS.Transform.toString(transform),
  transition,
  opacity: isDragging || isUsed || locked ? 0.4 : 1,
};
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`flex items-center gap-2 bg-[#fff1e4] px-3 py-2 rounded-[20px]
${isUsed || locked ? "cursor-not-allowed" : "cursor-grab"}
`}
    >
      <div className="flex">
        {[1, 2, 3, 4].map((i) => {
          const activeCount =
            word === "always"
              ? 4
              : word === "usually"
                ? 3
                : word === "sometimes"
                  ? 2
                  : 0;

          return (
            <div
              key={i}
              style={{
                width: "20px",
                height: "15px",
                background: i <= activeCount ? "#ef4444" : "#fff",
                border: "1px solid #c72b2bff",
              }}
            />
          );
        })}
      </div>

      <span className="text-[18px]">= {word}</span>
    </div>
  );
}

function DropSlot({ id, value, correct, locked, showResult, onRemove }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "inline-block",
        width: "100px",
        height:"30px",
        borderBottom: locked
          ? value === correct
            ? "1px solid #000"
            : "2px solid red"
          : "1px solid #000",
        textAlign: "center",
        margin: "0 5px",
        background: isOver ? "#fff7ed" : "transparent",
      }}
    >
      {value && (
        <span onClick={onRemove} className={`${locked ? "cursor-default":"cursor-pointer hover:text-red-500"} font-medium`}>
          {value}
        </span>
      )}
    </div>
  );
}
const Review2_Page1_Q1 = () => {
  const questions = [
    { id: 1, img: img1, correct: "never", sentence: "clean my room." },
    { id: 2, img: img2, correct: "usually", sentence: "jump rope." },
    { id: 3, img: img3, correct: "always", sentence: "go to the store." },
    { id: 4, img: img4, correct: "sometimes", sentence: "go to bed." },
  ];

  const words = ["always", "usually", "sometimes", "never"];
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor),
  );
  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over || locked) return;

    const draggedWord = active.id;
    const slotId = over.id;

    if (!slotId.startsWith("slot-")) return;

    setAnswers((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((key) => {
        if (updated[key] === draggedWord) {
          updated[key] = "";
        }
      });

      updated[slotId] = draggedWord;

      return updated;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const empty = questions.some((q) => !answers[`slot-${q.id}`]);

    if (empty) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    questions.forEach((q) => {
      if (answers[`slot-${q.id}`] === q.correct) {
        score++;
      }
    });

    const total = questions.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color};font-weight:bold">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
    setShowResult(true);
    setLocked(true);
  };
  const showAnswers = () => {
    const correctAnswers = {};

    questions.forEach((q) => {
      correctAnswers[`slot-${q.id}`] = q.correct;
    });

    setAnswers(correctAnswers);
    setLocked(true);
  };

  const reset = () => {
    setAnswers({});
    setLocked(false);
    setShowResult(false);
  };

  const removeAnswer = (slotId) => {
    if (locked) return;

    setAnswers((prev) => ({
      ...prev,
      [slotId]: "",
    }));
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => setActiveId(event.active.id)}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "20px" }}>
          <h5 className="header-title-page8">
            <span style={{ marginRight: "20px" }}>A</span>
            Write sentences. Use the words below.
          </h5>
          <div className="flex flex-col gap-10">
            {/* بنك الكلمات */}
            <SortableContext items={words}>
              <div className="flex gap-3 p-3 justify-center mt-3 flex-wrap">
                {words.map((w) => (
                 <DraggableWord
  key={w}
  word={w}
  isUsed={Object.values(answers).includes(w)}
  locked={locked}
/>
                ))}
              </div>
            </SortableContext>
            {/* الأسئلة */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr", // 🔥 بدل 1fr
                gap: "20px",
                // justifyContent: "center",
                columnGap: "80px",
                rowGap: "2px",
              }}
            >
              {questions.map((q) => (
                <div key={q.id} style={{ marginBottom: "20px" }}>
                  <div className="flex gap-5">
                    <div className="text-[20px] font-bold">{q.id}</div>
                    <div className="flex flex-col gap-3">
                      <img
                        src={q.img}
                        style={{
                          width: "auto",
                          height: "120px",
                          objectFit: "contain",
                        }}
                      />
                      <div
                        style={{
                          marginTop: "10px",
                          minHeight: "35px",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            fontSize: "18px",
                            display: "flex",
                          alignItems: "center",

                          }}
                        >
                          I{" "}
                          <DropSlot
                            id={`slot-${q.id}`}
                            value={answers[`slot-${q.id}`]}
                            correct={q.correct}
                            locked={locked}
                            showResult={showResult}
                            onRemove={() => removeAnswer(`slot-${q.id}`)}
                          />{" "}
                          {q.sentence}
                          {/* ❌ WrongMark */}
                          {showResult &&
                            answers[`slot-${q.id}`] &&
                            answers[`slot-${q.id}`] !== q.correct && (
                              <div
                                style={{
                                  position: "absolute",
                                  left: "40%",
                                  marginLeft: "8px",
                                  top: "6%",
                                  transform: "translateY(-50%)",
                                }}
                              >
                                <WrongMark />
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            handleShowAnswer={showAnswers}
            handleStartAgain={reset}
            checkAnswers={checkAnswers}
          />
        </div>
        <DragOverlay>
          {activeId ? (
            <div className="bg-white border border-orange-400 px-3 py-2 rounded-xl shadow-xl">
              {activeId}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default Review2_Page1_Q1;
