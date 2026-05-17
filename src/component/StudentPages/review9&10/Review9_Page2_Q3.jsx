import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex E 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex E 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex E 6.svg";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

/* ===== Draggable ===== */

const DraggableWord = ({ id, children, disabled }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: disabled ? 0.4 : isDragging ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "grab",
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

/* ===== DropBox ===== */

const DropBox = ({ id, children, checked, isWrong }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "relative",
        marginTop: "6px",
        borderBottom: `1px solid ${
          checked && isWrong ? "red" : isOver ? "#F79530" : "#000"
        }`,
        minHeight: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        // color: "#1C398E",
        fontWeight: "bold",
        transition: "0.2s",
        background: isOver ? "#fff4e8" : "transparent",
        transform: isOver ? "scale(1.04)" : "scale(1)",
        // borderRadius: "4px",
      }}
    >
      {children}
    </div>
  );
};

/* ===== Main ===== */

const Review9_Page2_Q3 = () => {
  const [userAnswers, setUserAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const [locked, setLocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const words = ["ducks", "cats", "caps", "peas", "girls", "bags"];

  const correctAnswers = {
    1: "cats",
    2: "bags",
    3: "caps",
    4: "girls",
    5: "peas",
    6: "ducks",
  };

  const questions = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
    { id: 6, image: img6 },
  ];

  const onDragEnd = (event) => {
    const { over, active } = event;

    setActiveWord(null);

    if (!over || locked) return;

    const word = active.id.split("-")[0];

    setUserAnswers((prev) => ({
      ...prev,
      [over.id]: word,
    }));
  };

  const removeAnswer = (questionId) => {
    if (locked) return;

    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: "",
    }));
  };

  const showAnswer = () => {
    setUserAnswers(correctAnswers);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    const empty = Object.values(userAnswers).some((v) => !v?.trim());

    if (empty) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    Object.keys(correctAnswers).forEach((id) => {
      if (
        userAnswers[id]?.toLowerCase().trim() ===
        correctAnswers[id].toLowerCase()
      ) {
        score++;
      }
    });

    const total = Object.keys(correctAnswers).length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    setChecked(true);
    setLocked(true);

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleStartAgain = () => {
    setUserAnswers({
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
    });

    setChecked(false);
    setLocked(false);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        setActiveWord(event.active.id.split("-")[0]);
      }}
      onDragEnd={onDragEnd}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div
          className="div-forall"
          style={{
            gap: "20px",
          }}
        >
          <div>
            <h5 className="header-title-page8">
              <span style={{ marginRight: "10px" }}>E</span>
              Look and write.
            </h5>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                // maxWidth: "900px",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              {/* الكلمات */}
              <div
                style={{
                  display: "flex",
                  gap: "30px",
                  padding: "10px",
                  // border: "2px dashed #ccc",
                  borderRadius: "10px",
                  justifyContent: "center",
                  width: "100%",
                  marginBottom: "10px",
                  flexWrap: "wrap",
                }}
              >
                {words.map((word, index) => {
                  const usedCount = Object.values(userAnswers).filter(
                    (v) => v === word,
                  ).length;

                  const totalCount = words.filter((w) => w === word).length;

                  const isUsed = usedCount >= totalCount;

                  return (
                    <DraggableWord
                      key={`${word}-${index}`}
                      id={`${word}-${index}`}
                      disabled={checked || isUsed}
                    >
                      <div
                        style={{
                          padding: "7px 14px",
                          border: "1px solid #F79530",
                          borderRadius: "8px",
                          background: "white",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        {word}
                      </div>
                    </DraggableWord>
                  );
                })}
              </div>

              {/* الأسئلة */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  columnGap: "20px",
                  rowGap: "50px",
                }}
              >
                {questions.map((q) => (
                  <div
                    key={q.id}
                    style={{
                      padding: "6px",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    {/* الرقم */}
                    <div className="flex gap-2">
                      <span
                        style={{
                          color: "black",
                          fontSize: "22px",
                          fontWeight: "bold",
                          zIndex: 2,
                        }}
                      >
                        {q.id}
                      </span>
                    

                    {/* الصورة */}
                    <img
                      src={q.image}
                      alt={`q${q.id}`}
                      style={{
                        width: "100%",
                        height: "90px",
                        objectFit: "contain",
                      }}
                    />
</div>
                    {/* Drop */}
                    <DropBox
                      id={String(q.id)}
                      checked={checked}
                      isWrong={userAnswers[q.id] !== correctAnswers[q.id]}
                    >
                      {userAnswers[q.id] && (
                        <span
                          onClick={() => removeAnswer(q.id)}
                          style={{
                            cursor: locked ? "default" : "pointer",
                          }}
                        >
                          {userAnswers[q.id]}
                        </span>
                      )}

                      {/* ❌ */}
                      {checked &&
                        userAnswers[q.id] !== correctAnswers[q.id] && (
                          <span
                            style={{
                              position: "absolute",
                              left: "25%",
                              top: "50%",
                              transform: "translateY(-50%)",
                              width: "22px",
                              height: "22px",
                              background: "red",
                              color: "white",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: "bold",
                              border: "2px solid white",
                              boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                              pointerEvents: "none",
                              zIndex: 3,
                            }}
                          >
                            ✕
                          </span>
                        )}
                    </DropBox>
                  </div>
                ))}
              </div>

              <Button
                handleShowAnswer={showAnswer}
                handleStartAgain={handleStartAgain}
                checkAnswers={checkAnswers}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <DragOverlay>
        {activeWord ? (
          <div
            style={{
              padding: "7px 14px",
              border: "2px solid #F79530",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              transform: "scale(1.08)",
              opacity: 0.95,
            }}
          >
            {activeWord}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Review9_Page2_Q3;
