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
// check
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/J1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/J2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/J3.svg";



const ACTIVITIES = [
  { id: "act1", text: "The bowl of fruit is on thr table in the living room." },
  { id: "act2", text: "The cat is in basket in the living room." },
  { id: "act3", text: "The fridge is in the kithen." },
];

const CORRECT_ANSWERS = {
  q1: "act1",
  q2: "act2",
  q3: "act3",

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
      style={style}
      {...attributes}
      {...listeners}
      className={`p-2 bg-white border-2 border-gray-200 rounded-xl shadow-sm cursor-grab text-blue-700 font-medium text-sm text-center ${isUsed ? "bg-gray-50 text-gray-300 pointer-events-none" : "hover:border-blue-400 hover:shadow-md transition-all"}`}
    >
      {item.text}
    </div>
  );
}
function DropSlot({ id, content, isCorrect, isSubmitted }) {
  const { setNodeRef, isOver } = useSortable({ id });

  const borderColor = isSubmitted
    ? isCorrect
      ? "border-blue-400"
      : "border-red-500"
    : isOver
      ? "border-blue-400 bg-blue-50"
      : "border-gray-300";

  return (
    <div
      ref={setNodeRef}
      className={`relative w-full min-h-[40px] border-b-2 flex items-center justify-center px-2 transition-all ${borderColor}`}
    >
      {/* ❌ Wrong Answer Icon */}
      {isSubmitted && content && !isCorrect && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow">
          ✕
        </div>
      )}

      {content ? (
        <span className="text-blue-900 font-bold text-sm text-center">
          {ACTIVITIES.find((a) => a.id === content).text}
        </span>
      ) : (
        <span className="text-gray-300 italic text-xs">
          Drop answer here...
        </span>
      )}
    </div>
  );
}

const WB_UNIT5_Page31_Q2 = () => {
  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
    q3: null,
  
  });
  const [activeId, setActiveId] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const checkAnswers = () => {
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

  const handleReset = () => {
    setAnswers({
      q1: null,
      q2: null,
      q3: null,

    });
    setShowResults(false);
  };

  const QUESTIONS = [
    { id: "q1", text: "1", img: img1 },
    { id: "q2", text: "2", img: img2 },
    { id: "q3", text: "3", img: img3 },

  ];

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragEnd={(e) => {
        if (e.over)
          setAnswers((prev) => ({ ...prev, [e.over.id]: e.active.id }));
        setActiveId(null);
      }}
    >
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "15px" }}>
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">J</span>Look and write.
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* شبكة الأسئلة */}
            <div className="flex-[2] grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-3">
                  <p className="text-gray-700 font-bold text-sm">{q.text}</p>
                  <div className="bg-gray-50 p-2 rounded-xl border border-gray-100 flex justify-center">
                    <img
                      src={q.img}
                      alt="activity"
                      className="max-h-32 object-contain rounded-lg"
                    />
                  </div>
                  <DropSlot
                    id={q.id}
                    content={answers[q.id]}
                    isCorrect={answers[q.id] === CORRECT_ANSWERS[q.id]}
                    isSubmitted={showResults}
                  />
                </div>
              ))}
            </div>

            {/* بنك الإجابات */}
            <div className="flex-1 bg-blue-50 p-5 rounded-2xl border-2 border-blue-100 h-fit sticky top-4">
              <h3 className="font-bold text-blue-800 mb-4 text-center">
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
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              handleShowAnswer={() => {
                setAnswers(CORRECT_ANSWERS);
                setShowResults(true);
              }}
              handleStartAgain={handleReset}
              checkAnswers={checkAnswers}
            />
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="p-3 bg-white border-2 border-blue-500 rounded-xl shadow-2xl text-blue-700 font-bold text-xs scale-105">
            {ACTIVITIES.find((a) => a.id === activeId).text}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_UNIT5_Page31_Q2;
