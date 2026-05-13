/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";

import imgShower from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex B 1.svg";
import imgBike from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex B 2.svg";
import imgSoccer from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex B 3.svg";
import imgFlowers from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex B 4.svg";
import WrongMark from "../../WrongMark";

const ACTIVITIES = [
  { id: "act4", text: "take a taxi." },
  { id: "act1", text: "take the subway." },
  { id: "act3", text: "take a bus." },
  { id: "act2", text: "ride a bike." },
];

const CORRECT_ANSWERS = {
  q1: "act1",
  q2: "act2",
  q3: "act3",
  q4: "act4",
};

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
      style={{ ...style, touchAction: "none" }}
      {...attributes}
      {...listeners}
      className={`p-2 bg-white border-1 border-gray-200 rounded-xl shadow-sm cursor-grab text-[#f39b42] text-[18px] text-center ${isUsed ? "bg-gray-50 text-gray-300 pointer-events-none" : "hover:border-orange-400 hover:shadow-md transition-all"}`}
    >
      {item.text}
    </div>
  );
}

function DropSlot({
  id,
  content,
  isCorrect,
  isSubmitted,
  onRemove,
}) {
 const { setNodeRef, isOver } = useDroppable({ id });
  const borderColor = isSubmitted
    ? isCorrect
      ? "border-black"
      : "border-red-500"
    : isOver
      ? "border-orange-400 bg-orange-50"
      : "border-black";
  return (
    <div
      ref={setNodeRef}
      className={`w-full min-h-10 border-b-1 flex items-center justify-center px-2 transition-all ${borderColor}`}
    >
      {content ? (
        <div className="relative flex items-center justify-center">
        <span
  onClick={onRemove}
  className={`text-[18px] text-center cursor-pointer ${isSubmitted?"":"hover:text-red-500" }`}
>
            {ACTIVITIES.find((a) => a.id === content).text}
          </span>

          {/* ❌ إذا الجواب غلط */}
          {isSubmitted && !isCorrect && (
            <div className="absolute -right-4">
              <WrongMark />
            </div>
          )}
        </div>
      ) : (
        <span className="text-gray-300 italic text-xs">
          Drop answer here...
        </span>
      )}
    </div>
  );
}

const Unit2_Page5_Q3 = () => {
  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null,
    q8: null,
  });
  const [activeId, setActiveId] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [locked, setLocked] = useState(false);

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

  const checkAnswers = () => {
    if (locked) return;

    const unanswered = Object.keys(CORRECT_ANSWERS).filter(
      (id) => !answers[id],
    );
    if (unanswered.length > 0) {
      ValidationAlert.info();
      return;
    }
    setShowResults(true);
    let score = 0;
    let total = Object.keys(CORRECT_ANSWERS).length;
    Object.keys(CORRECT_ANSWERS).forEach((id) => {
      if (answers[id] === CORRECT_ANSWERS[id]) score++;
    });
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };
const removeAnswer = (questionId) => {
  if (locked) return;

  setAnswers((prev) => ({
    ...prev,
    [questionId]: null,
  }));
};
  const handleReset = () => {
    setAnswers({
      q1: null,
      q2: null,
      q3: null,
      q4: null,
      q5: null,
      q6: null,
      q7: null,
      q8: null,
    });
    setShowResults(false);
    setLocked(false);
  };

  const QUESTIONS = [
    { id: "q1", img: imgShower },
    { id: "q2", img: imgBike },
    { id: "q3", img: imgSoccer },
    { id: "q4", img: imgFlowers },
  ];

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveId(e.active.id)}
     onDragEnd={(e) => {
  const { active, over } = e;

  // إذا مو فوق drop area حقيقية
  if (!over || !QUESTIONS.some((q) => q.id === over.id)) {
    setActiveId(null);
    return;
  }

  setAnswers((prev) => {
    const updated = { ...prev };

    // احذف العنصر من مكانه القديم
    Object.keys(updated).forEach((key) => {
      if (updated[key] === active.id) {
        updated[key] = null;
      }
    });

    // ضيفه بالمكان الجديد
    updated[over.id] = active.id;

    return updated;
  });

  setActiveId(null);
}}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div
          className="div-forall"
          style={{
            
            // gap: "45px",
          }}
        >
          <h5 className="header-title-page8">
            <span className="ex-A" style={{ marginRight: "10px" }}>
              B
            </span>
            Look, read, and write. Use the words below.
          </h5>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 p-5 rounded-2xl border-1 border-gray-200 h-fit sticky top-4">
              <h3 className="font-bold text-[#f39b42] mb-4 text-center">
                Activities Bank
              </h3>
              <div className="grid grid-cols-1 gap-2">
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

            <div className="flex-3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-3">
                
                    <img
                      src={q.img}
                      alt="activity"
                      className="max-h-32 object-contain rounded-lg"
                    />
                
                 <DropSlot
  id={q.id}
  content={answers[q.id]}
  isCorrect={answers[q.id] === CORRECT_ANSWERS[q.id]}
  isSubmitted={showResults}
  onRemove={() => removeAnswer(q.id)}
/>
                </div>
              ))}
            </div>
          </div>

          <Button
            handleShowAnswer={() => {
              setAnswers(CORRECT_ANSWERS);
              setShowResults(true);
              setLocked(true);
            }}
            handleStartAgain={handleReset}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="p-2 bg-white border-2 border-orange-500 rounded-xl shadow-2xl text-orange-700 font-bold text-[15px] scale-105">
            {ACTIVITIES.find((a) => a.id === activeId).text}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit2_Page5_Q3;
