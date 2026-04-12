import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import imgHouse from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/7.svg";

const ACTIVITIES = [
  { id: "act1", text: "Yes, I can see her in the living room." },
  { id: "act2", text: "Yes, I can see him at the computer" },
  { id: "act3", text: "Yes, I can see her in the living room ironing clothes." },
];

const CORRECT_ANSWERS = {
  q1: "act1",
  q2: "act2",
  q3: "act3",
};

const QUESTIONS = [
  { id: "q1", text: "1. Can you see Helen?" },
  { id: "q2", text: "2. Can you see Helen’s brother?" },
  { id: "q3", text: "3. Can you see Helen’s mom?" },

];

function DraggableActivity({ item, isUsed }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isUsed ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-2 bg-white border-2 border-gray-200 rounded-xl shadow-sm text-blue-700 font-medium text-sm text-center
        ${
          isUsed
            ? "bg-gray-50 text-gray-300 pointer-events-none cursor-default"
            : "cursor-grab hover:border-blue-400 hover:shadow-md transition-all"
        }`}
    >
      {item.text}
    </div>
  );
}

function DropSlot({ id, content, isCorrect, isSubmitted }) {
  const { setNodeRef, isOver } = useSortable({ id });

const borderColor = isSubmitted
  ? isCorrect
    ? "border-gray-300 bg-white"
    : "border-red-500 bg-red-50"
  : isOver
  ? "border-blue-400 bg-blue-50"
  : "border-gray-300";
  return (
    <div
      ref={setNodeRef}
      className={`relative w-full min-h-[40px] border-b-2 flex items-center justify-center px-2 transition-all rounded-sm ${borderColor}`}
    >
      {/* علامة الخطأ فقط */}
      {isSubmitted && content && !isCorrect && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow">
          ✕
        </div>
      )}

      {content ? (
        <span className="text-blue-900 font-bold text-sm text-center py-1">
          {ACTIVITIES.find((a) => a.id === content)?.text}
        </span>
      ) : (
        <span className="text-gray-300 italic text-xs">Drop answer here...</span>
      )}
    </div>
  );
}

const WB_Unit7_Page40_Q2 = () => {
  const initialAnswers = Object.fromEntries(
    QUESTIONS.map((q) => [q.id, null])
  );

  const [answers, setAnswers] = useState(initialAnswers);
  const [activeId, setActiveId] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const checkAnswers = () => {
    const unanswered = QUESTIONS.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      ValidationAlert.info();
      return;
    }
    setShowResults(true);

    let score = 0;
    const total = QUESTIONS.length;

    QUESTIONS.forEach((q) => {
      if (answers[q.id] === CORRECT_ANSWERS[q.id]) score++;
    });

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleReset = () => {
    setAnswers(initialAnswers);
    setShowResults(false);
  };

  const handleShowAnswer = () => {
    setAnswers(CORRECT_ANSWERS);
    setShowResults(true);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragEnd={(e) => {
        if (e.over) {
          setAnswers((prev) => ({ ...prev, [e.over.id]: e.active.id }));
        }
        setActiveId(null);
      }}
    >
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "15px" }}>
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">A</span>Look and answer the questions.
          </h1>

          {/* layout مضبوط */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">

            {/* الصورة بدون wrapper زائد */}
            <div className="flex-1 flex justify-center items-start">
              <img
                src={imgHouse}
                alt="house scene"
                className="w-full h-auto max-h-[520px] object-contain"
              />
            </div>

            {/* الأسئلة */}
            <div className="flex-1 flex flex-col gap-6">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-2">
                  <p className="text-gray-700 font-bold text-sm">{q.text}</p>
                  <DropSlot
                    id={q.id}
                    content={answers[q.id]}
                    isCorrect={answers[q.id] === CORRECT_ANSWERS[q.id]}
                    isSubmitted={showResults}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* بنك الإجابات */}
          <div className="bg-blue-50 p-5 rounded-2xl border-2 border-blue-100 mt-4">
            <h3 className="font-bold text-blue-800 mb-4 text-center text-sm">
              Answers Bank
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <SortableContext items={ACTIVITIES.map((a) => a.id)}>
                {ACTIVITIES.map((act) => (
                  <DraggableActivity
                    key={act.id}
                    item={act}
                    isUsed={Object.values(answers).includes(act.id)}
                  />
                ))}
              </SortableContext>
            </div>
          </div>

          {/* الأزرار */}
          <div className="mt-8 flex justify-center">
            <Button
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleReset}
              checkAnswers={checkAnswers}
            />
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="p-3 bg-white border-2 border-blue-500 rounded-xl shadow-2xl text-blue-700 font-bold text-xs scale-105 max-w-xs text-center">
            {ACTIVITIES.find((a) => a.id === activeId)?.text}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit7_Page40_Q2;