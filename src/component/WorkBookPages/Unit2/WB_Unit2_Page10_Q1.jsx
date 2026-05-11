import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 6.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const ANSWER_COLOR = "#000000";

const DRAG_ITEMS = [
  { id: 1, value: "France" },
  { id: 2, value: "Nile River" },
  { id: 3, value: "pyramids" },
  { id: 4, value: "clock tower" },
  { id: 5, value: "Egypt" },
  { id: 6, value: "bus" },
];

const ANSWERS = [
  { id: 1, correct: "France", img: img1 },
  { id: 2, correct: "clock tower", img: img2 },
  { id: 3, correct: "Nile River", img: img3 },
  { id: 4, correct: "bus", img: img4 },
  { id: 5, correct: "pyramids", img: img5 },
  { id: 6, correct: "Egypt", img: img6 },
];

/* ================= DRAG ================= */
const DraggableWord = ({ item, disabled }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.value,
    data: item,
    disabled,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      // style={style}
      className={`px-4 py-2 rounded-xl border-1 text-sm font-medium transition
        ${
          disabled
            ? "bg-gray-200 text-gray-400 border-gray-200"
            : "border-orange-400 cursor-grab hover:scale-105"
        }
      `}
    >
      {item.value}
    </div>
  );
};

/* ================= DROP ================= */
const DropBox = ({ id, value, isWrong, showAns }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative w-full h-[42px] flex items-end justify-center border-b-1 text-lg
        ${isOver ? "border-orange-400 bg-orange-50" : "border-[#2e3192]"}
        ${isWrong ? "border-red-500" : ""}
      `}
    >
      {value}

      {isWrong && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
          ✕
        </div>
      )}
    </div>
  );
};

export default function WB_LookAndWrite_PageC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor)
  );

  const usedWords = Object.values(answers).map((a) => a.value);

  /* ================= DROP LOGIC ================= */
  const handleDragEnd = ({ active, over }) => {
    if (!over || showAns) return;

    const word = active.data.current;
    const dropId = over.id;

    setAnswers((prev) => {
      const updated = { ...prev };

      // remove from old place
      Object.keys(updated).forEach((key) => {
        if (updated[key]?.value === word.value) {
          delete updated[key];
        }
      });

      updated[dropId] = word;

      return updated;
    });

    setActiveWord(null);
    setShowResults(false);
  };

  /* ================= CHECK ================= */
  const handleCheck = () => {
    if (showAns) return;

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

    const msg = `Score: ${score} / ${ANSWERS.length}`;

    if (score === ANSWERS.length) ValidationAlert.success(msg);
    else if (score > 0) ValidationAlert.warning(msg);
    else ValidationAlert.error(msg);
  };

  const handleShowAnswer = () => {
    const filled = {};

    ANSWERS.forEach((item) => {
      const match = DRAG_ITEMS.find((d) => d.value === item.correct);
      filled[`a-${item.id}`] = match;
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
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
      onDragStart={(e) => setActiveWord(e.active.data.current)}
      onDragEnd={handleDragEnd}
    >
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "25px" }}>
  <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">C</span> Look and write.
          </h1>
          <div>
          {/* WORD BANK */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {DRAG_ITEMS.map((item) => (
              <DraggableWord
                key={item.id}
                item={item}
                disabled={usedWords.includes(item.value)}
              />
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-3 gap-10">
            {ANSWERS.map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-3">
                <img src={item.img} className="h-32 object-contain" style={{height:"110px"}} />

                <DropBox
                  id={`a-${item.id}`}
                  value={answers[`a-${item.id}`]?.value}
                  isWrong={isWrong(item)}
                  showAns={showAns}
                />
              </div>
            ))}
          </div>
</div>
          {/* BUTTONS */}
          <div className="flex justify-center">
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
            />
          </div>
        </div>

        {/* DRAG PREVIEW */}
        <DragOverlay>
          {activeWord && (
            <div className="px-4 py-2 bg-white border rounded shadow">
              {activeWord.value}
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}