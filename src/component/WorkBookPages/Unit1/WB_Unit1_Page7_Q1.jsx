import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import exerciseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 1.svg";

import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

const ACTIVE_COLOR = "#f89631";
const BORDER_COLOR = "#d9d9d9";

const ANSWERS = [
  { id: 1, correct: "tall" },
  { id: 2, correct: "short" },
  { id: 3, correct: "fast" },
  { id: 4, correct: "slow" },
  { id: 5, correct: "old" },
  { id: 6, correct: "young" },
];

const DRAG_ITEMS = [
  { id: 1, value: "tall" },
  { id: 2, value: "short" },
  { id: 3, value: "fast" },
  { id: 4, value: "slow" },
  { id: 5, value: "old" },
  { id: 6, value: "young" },
];

/* ================= DRAG ================= */
function DraggableItem({ item, disabled }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
      data: item,
      disabled,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px,0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      // style={style}
      className={`h-[40px] w-[70px] flex items-center justify-center rounded-xl border-1 font-medium text-[17px] touch-none transition-all
        ${
          disabled
            ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
            : "bg-white text-gray-800 border-orange-400 cursor-grab hover:scale-105 hover:shadow-md"
        }`}
    >
      {item.value}
    </div>
  );
}

/* ================= DROP ================= */
function DropBox({ id, value, wrong, showAns, onRemove }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      onClick={() => value && !showAns && onRemove(id)}
      className={`relative w-full max-w-[320px] h-[42px] flex items-center px-2 text-[20px] font-medium border-b-1 transition-all ${!showAns ? "cursor-pointer hover:text-red-600":"cursor-default"}
        ${isOver ? "border-orange-500 bg-orange-50 scale-105" : ""}
        ${wrong ? "border-red-500" : "border-gray-400"}
      `}
    >
      {value}

      {wrong && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full border-2 border-white shadow">
          ✕
        </div>
      )}
    </div>
  );
}

/* ================= MAIN ================= */
export default function WB_Vocabulary_Page214_QI() {
  const [answers, setAnswers] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const usedIds = Object.values(answers).map((a) => a?.dragId);

  const applyDrop = (boxKey, item) => {
    setAnswers((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((k) => {
        if (updated[k]?.dragId === item.id) delete updated[k];
      });

      updated[boxKey] = { dragId: item.id, value: item.value };
      return updated;
    });

    setShowResults(false);
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over || showAns) return;
    applyDrop(over.id, active.data.current);
    setActiveItem(null);
  };

  const handleRemove = (key) => {
    if (showAns || showResults) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const handleCheck = () => {
    if (showAns || showResults) return;

    const allAnswered = ANSWERS.every(
      (item) => answers[`a-${item.id}`]?.value
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ANSWERS.forEach((item) => {
      if (answers[`a-${item.id}`]?.value === item.correct) score++;
    });

    setShowResults(true);

    const total = ANSWERS.length;

    if (score === total)
      ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};

    ANSWERS.forEach((item) => {
      filled[`a-${item.id}`] = {
        dragId: item.id,
        value: item.correct,
      };
    });

    setAnswers(filled);
    setShowAns(true);
    setShowResults(false);
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

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => setActiveItem(active.data.current)}
      onDragEnd={handleDragEnd}
    >
      <div className="main-container-component">
        <div className="div-forall mb-15" style={{gap:"20px"}}>
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">I</span>Look and write a vocabulary word.
          </h1>
            <div className="flex gap-10 items-center justify-center">
          <div className="flex flex-col gap-10 items-center justify-center w-[70%]">

            {/* IMAGE */}
            <img src={exerciseImg} className="object-contain"  style={{height:"auto",width:"100%"}} />

            {/* WORD BANK */}
            <div className="flex flex-wrap justify-between gap-4 w-[100%]">
              {DRAG_ITEMS.map((item) => (
                <DraggableItem
                  key={item.id}
                  item={item}
                  disabled={usedIds.includes(item.id) || showAns}
                />
              ))}
            </div>

            {/* ANSWERS */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-6 w-[100%]">
              {ANSWERS.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="font-bold">{item.id}</span>

                  <DropBox
                    id={`a-${item.id}`}
                    value={answers[`a-${item.id}`]?.value}
                    wrong={isWrong(item)}
                    showAns={showAns}
                    onRemove={handleRemove}
                  />
                </div>
              ))}
            </div>

            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
            />
          </div></div>
        </div>
      </div>

      {/* DRAG OVERLAY */}
      <DragOverlay>
        {activeItem && (
          <div className="px-4 py-2 bg-white border-1 border-orange-400 rounded-lg shadow-xl">
            {activeItem.value}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}