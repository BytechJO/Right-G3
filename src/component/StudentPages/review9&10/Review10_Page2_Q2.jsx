// ExerciseC.jsx

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const wordBank = [
  "marks",
  "makes",
  "sandwiches",
  "plays",
  "eats",
  "girls",
  "boys",
  "bags",
  "downstairs",
];

const correctAnswers = {
  s: ["marks", "makes", "eats"],
  z: ["sandwiches", "plays", "girls", "boys", "bags", "downstairs"],
};

/* ===== كلمة قابلة للسحب ===== */
function DraggableWord({ id, word, disabled, className, style, onClick }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  });

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        ...style,
        opacity: isDragging ? 0.3 : (style?.opacity ?? 1),
        touchAction: "none",
        cursor: disabled ? "not-allowed" : "grab",
      }}
    >
      {word}
    </button>
  );
}

/* ===== منطقة قابلة للإفلات ===== */
function DroppableZone({ id, children, className }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={className}
      style={{ outline: isOver ? "2px solid #f97316" : "none" }}
    >
      {children}
    </div>
  );
}

export default function Review10_Page2_Q2() {
  const [columns, setColumns] = useState({ s: [], z: [] });
  const [showResult, setShowResult] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  // pointer sensor مع مسافة تفعيل، عشان الضغطة العادية ما تتحول لسحب
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const addWordToColumn = (col, word) => {
    if (showResult || !word) return;

    setColumns((prev) => {
      const alreadyUsed = prev.s.includes(word) || prev.z.includes(word);
      if (alreadyUsed) return prev;

      return { ...prev, [col]: [...prev[col], word] };
    });
  };

  const moveWordBetweenColumns = (fromCol, toCol, word) => {
    if (showResult || !word || fromCol === toCol) return;

    setColumns((prev) => {
      if (prev[toCol].includes(word)) return prev;

      return {
        ...prev,
        [fromCol]: prev[fromCol].filter((w) => w !== word),
        [toCol]: [...prev[toCol], word],
      };
    });
  };

  const returnWordToBank = (fromCol, word) => {
    if (showResult || !word) return;

    setColumns((prev) => ({
      ...prev,
      [fromCol]: prev[fromCol].filter((w) => w !== word),
    }));
  };

  /* ===== dnd-kit handlers ===== */
  const handleDragStart = (event) => {
    if (showResult) return;
    const [, word] = String(event.active.id).split(":");
    setActiveWord(word);
  };

  const handleDragEnd = (event) => {
    setActiveWord(null);
    if (showResult) return;

    const { active, over } = event;
    if (!over) return;

    const [source, word] = String(active.id).split(":");
    const [, destination] = String(over.id).split(":");

    if (!word || !destination || source === destination) return;

    if (source === "bank") {
      addWordToColumn(destination, word);
    } else if (source === "s" || source === "z") {
      if (destination === "bank") {
        returnWordToBank(source, word);
      } else {
        moveWordBetweenColumns(source, destination, word);
      }
    }
  };

  const handleDragCancel = () => setActiveWord(null);

  const checkAnswers = () => {
    if (showResult) return;

    const usedWordsCount = columns.s.length + columns.z.length;

    if (usedWordsCount < wordBank.length) {
      ValidationAlert.info(
        "Please place all words before checking your answers!",
      );
      return;
    }

    const results = wordBank.map((word) => {
      const inS = columns.s.includes(word);
      const inZ = columns.z.includes(word);

      if (
        (inS && correctAnswers.s.includes(word)) ||
        (inZ && correctAnswers.z.includes(word))
      ) {
        return "correct";
      }
      return "wrong";
    });

    setShowResult(true);

    const correctCount = results.filter((r) => r === "correct").length;
    const total = wordBank.length;
    const scoreMsg = `${correctCount} / ${total}`;

    let color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const resultHTML = `
    <div style="font-size: 20px; text-align:center; margin-top: 8px;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${scoreMsg}
      </span>
    </div>
  `;

    if (correctCount === total) ValidationAlert.success(resultHTML);
    else if (correctCount === 0) ValidationAlert.error(resultHTML);
    else ValidationAlert.warning(resultHTML);
  };

  const handleShowAnswer = () => {
    setColumns({ s: [...correctAnswers.s], z: [...correctAnswers.z] });
    setShowResult(true);
  };

  const handleStartAgain = () => {
    setColumns({ s: [], z: [] });
    setShowResult(false);
    setActiveWord(null);
  };

  const getWordClass = (col, word) => {
    const base =
      "px-3 py-2 rounded-lg text-[17px] font-semibold cursor-move transition-all border-1 ";

    if (!showResult) {
      return base + "border-gray-300 hover:border-orange-500";
    }

    const isCorrect = correctAnswers[col].includes(word);
    return base + (isCorrect ? "border-blue-500" : "border-red-500");
  };

  const colClass =
    "border-2 border-dashed border-gray-300 rounded-xl p-4 min-h-[140px] transition-all bg-white";

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
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
          <h5 className="header-title-page8" style={{ display: "flex" }}>
            <span style={{ marginRight: "15px" }}>D</span>
            <div>
              Does the underlined word have an{" "}
              <span style={{ color: "#2e3192" }}>/s/</span> or{" "}
              <span style={{ color: "#2e3192" }}>/z/</span> sound at the end?
              Drag and drop the words in the correct columns.
            </div>
          </h5>

          {/* Word Bank */}
          <DroppableZone
            id="dropzone:bank"
            className="flex flex-wrap gap-2 p-4 w-full justify-center rounded-xl min-h-20"
          >
            {wordBank.map((word) => {
              const isUsed =
                columns.s.includes(word) || columns.z.includes(word);

              return (
                <DraggableWord
                  key={word}
                  id={`bank:${word}`}
                  word={word}
                  disabled={showResult || isUsed}
                  className="px-4 py-2 bg-white border-1 border-gray-300 rounded-lg text-[17px] text-gray-700 transition-all"
                  style={{ opacity: isUsed ? 0.4 : 1 }}
                />
              );
            })}
          </DroppableZone>

          <div className="flex flex-col gap-5">
            {/* Columns */}
            <div className="grid grid-cols-2 gap-6">
              {["s", "z"].map((col) => (
                <div key={col}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-blue-800 text-lg">
                      /{col}/
                    </span>
                  </div>

                  <DroppableZone id={`dropzone:${col}`} className={colClass}>
                    <div className="flex flex-wrap gap-2">
                      {columns[col].map((word) => {
                        const isCorrect = correctAnswers[col].includes(word);

                        return (
                          <div key={word} style={{ position: "relative" }}>
                            <DraggableWord
                              id={`${col}:${word}`}
                              word={word}
                              disabled={showResult}
                              className={getWordClass(col, word)}
                              onClick={() => {
                                if (!showResult) returnWordToBank(col, word);
                              }}
                            />

                            {showResult && !isCorrect && (
                              <div
                                style={{
                                  position: "absolute",
                                  right: "-10px",
                                  top: "00%",
                                  transform: "translateY(-50%)",
                                  width: "22px",
                                  height: "22px",
                                  background: "red",
                                  color: "white",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: "bold",
                                  border: "2px solid white",
                                  boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                                  pointerEvents: "none",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "13px",
                                    lineHeight: "1",
                                    transform: "translateY(-1px)",
                                  }}
                                >
                                  ✕
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {columns[col].length === 0 && (
                      <div className="text-gray-400 text-sm mt-2">
                        Drag words here
                      </div>
                    )}
                  </DroppableZone>
                </div>
              ))}
            </div>

            <div
              style={{ marginTop: "20px", fontSize: "18px", lineHeight: "2" }}
            >
              <div>
                <strong>1</strong> She gets full{" "}
                <span style={{ textDecoration: "underline" }}>marks</span>.
              </div>
              <div>
                <strong>2</strong> Dad{" "}
                <span style={{ textDecoration: "underline" }}>makes</span> us{" "}
                <span style={{ textDecoration: "underline" }}>sandwiches</span>.
              </div>
              <div>
                <strong>3</strong> Jacob usually{" "}
                <span style={{ textDecoration: "underline" }}>plays</span>, then{" "}
                <span style={{ textDecoration: "underline" }}>eats</span> his
                lunch.
              </div>
              <div>
                <strong>4</strong> The{" "}
                <span style={{ textDecoration: "underline" }}>girls</span> and{" "}
                <span style={{ textDecoration: "underline" }}>boys</span> are
                carrying the{" "}
                <span style={{ textDecoration: "underline" }}>bags</span>{" "}
                <span style={{ textDecoration: "underline" }}>downstairs</span>.
              </div>
            </div>
          </div>

          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>

      <DragOverlay>
        {activeWord ? (
          <div className="px-4 py-2 bg-white border-1 border-orange-500 rounded-lg text-[17px] text-gray-700 shadow-lg">
            {activeWord}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
