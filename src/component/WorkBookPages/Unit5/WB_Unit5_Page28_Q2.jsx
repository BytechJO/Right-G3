import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import imgRoom from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/Asset 92.svg";

// ─── الكلمات المتاحة للسحب ────────────────────────────────────────────────────
const WORDS = [
  { id: "w1", label: "above" },
  { id: "w2", label: "next to" },
  { id: "w3", label: "in front of" },
  { id: "w4", label: "under" },
  { id: "w5", label: "above" },
  { id: "w6", label: "next to" },
];

// ─── الجمل والإجابات الصحيحة ──────────────────────────────────────────────────
const QUESTIONS = [
  { id: "q1", before: "The mirror is", after: "the dresser.", correct: "above" },
  { id: "q2", before: "The clock is next to the", after: ".", correct: "window" },
  { id: "q3", before: "The rug is", after: "the dresser.", correct: "in front of" },
  { id: "q4", before: "The chair is", after: "the clock.", correct: "under" },
  { id: "q5", before: "The window is", after: "the bed.", correct: "above" },
  { id: "q6", before: "The bed is", after: "the chair.", correct: "next to" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const buildInit = () => Object.fromEntries(QUESTIONS.map((q) => [q.id, null]));
const normalize = (s) => s?.trim().toLowerCase().replace(/\s+/g, " ") ?? "";

// ─── DropSlot ─────────────────────────────────────────────────────────────────
// ─── DropSlot ─────────────────────────────────────────────────────────────────
function DropSlot({ id, content, checked, isCorrect, provided }) {
  return (
    <span
      ref={provided.innerRef}
      {...provided.droppableProps}
      className={`inline-flex items-center justify-center min-w-[90px] px-2 py-0.5 
        border-b-2 border-blue-300 bg-blue-50 rounded text-sm font-semibold 
        text-blue-900 mx-1 relative`}
      style={{ minHeight: "28px" }}
    >
      {content ? (
        <>
          {content}

          {/* ❌ فقط علامة X بدون أي ألوان إضافية */}
          {checked && !isCorrect && (
            <span className="absolute -top-2 -right-1 w-4 h-4 bg-red-500 text-white 
              rounded-full flex items-center justify-center text-[10px] font-bold">
              ✕
            </span>
          )}
        </>
      ) : (
        <span className="text-gray-300 text-xs italic">drop here</span>
      )}
      {provided.placeholder}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const WB_Unit5_Page28_Q2 = () => {
  const [answers, setAnswers] = useState(buildInit());
  const [checked, setChecked] = useState(false);
  const [wrongKeys, setWrongKeys] = useState({});

  const usedWordIds = new Set(
    Object.values(answers)
      .filter(Boolean)
      .map((val) => WORDS.find((w) => w.label === val)?.id)
      .filter(Boolean)
  );

  const onDragEnd = ({ destination, draggableId }) => {
    if (!destination || checked) return;
    const word = WORDS.find((w) => w.id === draggableId);
    if (!word) return;
    setAnswers((prev) => ({ ...prev, [destination.droppableId]: word.label }));
  };

  const checkAnswers = () => {
    if (checked) return;
    const hasEmpty = Object.values(answers).some((v) => !v);
    if (hasEmpty) {
      ValidationAlert.info("Please answer all questions!");
      return;
    }

    let score = 0;
    const newWrong = {};
    QUESTIONS.forEach((q) => {
      const ok = normalize(answers[q.id]) === normalize(q.correct);
      newWrong[q.id] = !ok;
      if (ok) score++;
    });
    setWrongKeys(newWrong);
    setChecked(true);

    const total = QUESTIONS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const correct = {};
    QUESTIONS.forEach((q) => {
      correct[q.id] = q.correct;
    });
    setAnswers(correct);
    setChecked(true);
    setWrongKeys({});
  };

  const handleStartAgain = () => {
    setAnswers(buildInit());
    setChecked(false);
    setWrongKeys({});
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "14px" }}>

          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">D</span>Read, look, and write.
          </h1>

          <div className="flex justify-center">
            <img
              src={imgRoom}
              alt="room"
              className="w-64 h-48 object-contain rounded-xl border border-gray-200 shadow-sm"
            />
          </div>

          <Droppable droppableId="bank" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-wrap justify-center gap-2 p-3 
                  border-2 border-dashed border-blue-200 rounded-xl bg-blue-50"
              >
                {WORDS.map((word, index) => {
                  const isUsed = usedWordIds.has(word.id);
                  return (
                    <Draggable
                      key={word.id}
                      draggableId={word.id}
                      index={index}
                      isDragDisabled={checked || isUsed}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`px-4 py-1 rounded-lg border-2 text-sm font-semibold transition-all
                            ${isUsed
                              ? "border-gray-200 text-gray-300 bg-gray-50 cursor-default"
                              : snapshot.isDragging
                              ? "border-blue-500 bg-blue-100 shadow-lg text-blue-800 scale-105"
                              : "border-blue-400 bg-white text-blue-800 cursor-grab hover:shadow-md hover:border-blue-500"
                            }`}
                        >
                          {word.label}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <div className="flex flex-col gap-3">
            {QUESTIONS.map((q, i) => (
              <div key={q.id} className="flex items-center flex-wrap gap-1">
                <span className="text-gray-700 font-bold text-sm w-5 shrink-0">
                  {i + 1}
                </span>

                <span className="text-gray-700 text-sm font-medium">
                  {q.before}
                </span>

                <Droppable droppableId={q.id} direction="horizontal">
                  {(provided) => (
                    <DropSlot
                      id={q.id}
                      content={answers[q.id]}
                      checked={checked}
                      isCorrect={!wrongKeys[q.id]}
                      provided={provided}
                    />
                  )}
                </Droppable>

                <span className="text-gray-700 text-sm font-medium">
                  {q.after}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <Button
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
              checkAnswers={checkAnswers}
            />
          </div>

        </div>
      </div>
    </DragDropContext>
  );
};

export default WB_Unit5_Page28_Q2;