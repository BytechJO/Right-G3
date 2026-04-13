import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

// الصور
import imgDesk   from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E1.svg";
import imgBed    from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E2.svg";
import imgTeddy  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E3.svg";
import imgToyBox from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E4.svg";
import imgChair  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E5.svg";

// بنك الكلمات
const WORDS = [
  { id: "w_in",      label: "in" },
  { id: "w_on",      label: "on" },
  { id: "w_next",    label: "next to" },
  { id: "w_between", label: "between" },
  { id: "w_under",   label: "under" },
];

// الأسئلة
const QUESTIONS = [
  { id: "q1", before: "Where is the pen?",   mid: "It is", after: "the desk.",    correct: "on" },
  { id: "q2", before: "Where is the doll?",  mid: "It is", after: "the bed.",     correct: "under" },
  { id: "q3", before: "Where is the teddy?", mid: "It is", after: "the books.",   correct: "between" },
  { id: "q4", before: "Where is the car?",   mid: "It is", after: "the toy box.", correct: "in" },
  { id: "q5", before: "Where is the ball?",  mid: "It is", after: "the chair.",   correct: "next to" },
];

const buildInit = () => Object.fromEntries(QUESTIONS.map((q) => [q.id, null]));
const normalize = (s) => s?.trim().toLowerCase().replace(/\s+/g, " ") ?? "";

// DropSlot
function DropSlot({ content, checked, isCorrect, provided }) {
  const border = !checked
    ? "border-blue-300 bg-blue-50"
    : isCorrect
    ? "border-green-500 bg-green-50"
    : "border-red-400 bg-red-50";

  return (
    <span
      ref={provided.innerRef}
      {...provided.droppableProps}
      className={`inline-flex items-center justify-center min-w-[70px] px-2 py-0.5
        border-b-2 ${border} rounded text-sm font-bold text-blue-900 mx-1 relative transition-all`}
      style={{ minHeight: "26px" }}
    >
      {content ? (
        <>
          {content}
          {checked && !isCorrect && (
            <span className="absolute -top-2 -right-1 w-4 h-4 bg-red-500 text-white
              rounded-full flex items-center justify-center text-[10px] font-bold">✕</span>
          )}
        </>
      ) : (
        <span className="text-gray-300 text-xs">_______</span>
      )}
      {provided.placeholder}
    </span>
  );
}

// Main
const WB_Unit5_Page29_Q1 = () => {
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
        <div className="div-forall flex flex-col">

          {/* عنوان */}
          <h1 className="WB-header-title-page8 text-center">
            <span className="WB-ex-A">E</span> Look, read, and answer.
          </h1>

          {/* الصور */}
          <div className="grid grid-cols-5 gap-2 justify-items-center ">
            {[imgDesk, imgBed, imgTeddy, imgToyBox, imgChair].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-16 h-16 object-contain "
              />
            ))}
          </div>

          {/* بنك الكلمات */}
          <Droppable droppableId="bank" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-wrap justify-center gap-2 
                  border-2 border-gray-300 rounded-xl bg-gray-50  "
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
                          className={`px-4 py-1 rounded-full border-2 text-sm font-semibold transition-all
                            ${isUsed
                              ? "border-gray-200 text-gray-300 bg-white cursor-default"
                              : snapshot.isDragging
                              ? "border-blue-500 bg-blue-100 shadow-lg text-blue-800"
                              : "border-blue-400 bg-white text-blue-800 cursor-grab hover:shadow-md"
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

          {/* الجمل */}
          <div className="flex flex-col gap-3 mt-2 max-w-xl mx-auto">
            {QUESTIONS.map((q, i) => (
              <div key={q.id} className="flex items-center flex-wrap gap-1">
                <span className="text-gray-700 font-bold text-sm w-5">{i + 1}</span>
                <span className="text-gray-700 text-sm font-medium">{q.before}</span>
                <span className="text-gray-500 text-sm mx-1">{q.mid}</span>

                <Droppable droppableId={q.id} direction="horizontal">
                  {(provided) => (
                    <DropSlot
                      content={answers[q.id]}
                      checked={checked}
                      isCorrect={!wrongKeys[q.id]}
                      provided={provided}
                    />
                  )}
                </Droppable>

                <span className="text-gray-700 text-sm font-medium">{q.after}</span>
              </div>
            ))}
          </div>

          {/* أزرار */}
          <div className=" flex justify-center">
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

export default WB_Unit5_Page29_Q1;