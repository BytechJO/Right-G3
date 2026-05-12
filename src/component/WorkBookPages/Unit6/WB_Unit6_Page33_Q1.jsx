import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/A.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/A.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/A.3.svg";

const NAME_BANK = ["Helen", "Stella", "John", "Harley", "Tom", "Hansel"];
const CORRECT_ORDER = ["Hansel", "Harley", "Helen", "John", "Stella", "Tom"];

const NAME_IMGS = {
  Hansel: img1,
  Harley:img2,
  Helen:img3,
 
};
function DraggableName({ name, disabled, style }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: name,
    disabled,
  });

  const dragStyle = {
    // transform: transform
    //   ? `translate(${transform.x}px, ${transform.y}px)`
    //   : undefined,
    cursor: disabled ? "not-allowed" : "grab",
  };

  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="px-4 py-1 rounded-full text-[17px] border border-[#f39b42]"
      style={{
        ...dragStyle,
        ...style,
        // background: "#f3f4f6",
        // color: "#374151",
      }}
    >
      {name}
    </span>
  );
}

function DroppableSlot({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transition: "0.2s",
        transform: isOver ? "scale(1.05)" : "scale(1)",
        width: "50%",
      }}
    >
      {children(isOver)}
    </div>
  );
}
const QUESTIONS = [
  { id: 1, question: "What is the first name?", answer: "Hansel" },
  { id: 2, question: "What is the fourth name?", answer: "John" },
  { id: 3, question: "What is the sixth name?", answer: "Tom" },
  { id: 4, question: "What is the third name?", answer: "Helen" },
  { id: 5, question: "Is Hansel first?", answer: "Yes, he is." },
  { id: 6, question: "Is Helen fifth?", answer: "No, she isn't." },
  { id: 7, question: "Is Stella third?", answer: "No, she isn't." },
  { id: 8, question: "Is Tom sixth?", answer: "Yes, he is." },
];

const YES_NO_OPTIONS = [
  "Yes, he is.",
  "No, he isn't.",
  "Yes, she is.",
  "No, she isn't.",
];

const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: -6,
      right: -6,
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      background: "red",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: "bold",
      border: "2px solid white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    }}
  >
    ✕
  </div>
);

export default function WB_Unit6_Page33_Q1() {
  const [orderAnswers, setOrderAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  const [qAnswers, setQAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [wrongSlots, setWrongSlots] = useState({});
  const [wrongQIds, setWrongQIds] = useState({});
  const [activeDrag, setActiveDrag] = useState(null);
  const usedNames = Object.values(orderAnswers).filter(Boolean);

  const handleQSelect = (id, val) => {
    if (showAns || checked) return;
    setChecked(false);
    setWrongSlots({});
    setWrongQIds({});
    setQAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleCheck = () => {
    if (showAns || checked) return;

    const allOrder = Object.values(orderAnswers).every(Boolean);
    const allQ = QUESTIONS.every((q) => qAnswers[q.id]);
    if (!allOrder || !allQ) {
      ValidationAlert.info("Please answer all questions first! ✏️");
      return;
    }

    const newWrongSlots = {};
    Object.entries(orderAnswers).forEach(([slot, name]) => {
      if (name !== CORRECT_ORDER[+slot - 1]) newWrongSlots[slot] = true;
    });

    const newWrongQIds = {};
    QUESTIONS.forEach((q) => {
      if (qAnswers[q.id] !== q.answer) newWrongQIds[q.id] = true;
    });

    setWrongSlots(newWrongSlots);
    setWrongQIds(newWrongQIds);
    setChecked(true);
    setShowAns(false);

    const correct =
      6 -
      Object.keys(newWrongSlots).length +
      (QUESTIONS.length - Object.keys(newWrongQIds).length);
    const total = 6 + QUESTIONS.length;

    if (correct === total) {
      ValidationAlert.success(`Score :${correct} / ${total}`);
    } else if (correct > 0) {
      ValidationAlert.warning(`Score :${correct} / ${total}`);
    } else {
      ValidationAlert.error(`Score :${correct} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    // تعبئة الترتيب
    const newOrder = {};
    CORRECT_ORDER.forEach((name, i) => {
      newOrder[i + 1] = name;
    });

    // تعبئة الأسئلة
    const newQ = {};
    QUESTIONS.forEach((q) => {
      newQ[q.id] = q.answer;
    });

    setOrderAnswers(newOrder);
    setQAnswers(newQ);

    // مهم جداً
    setChecked(false); // حتى ما يظهر ❌
    setShowAns(true); // لتفعيل وضع عرض الإجابة

    setWrongSlots({});
    setWrongQIds({});
  };

  const handleReset = () => {
    setOrderAnswers({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
    setQAnswers({});
    setChecked(false);
    setShowAns(false);
    setWrongSlots({});
    setWrongQIds({});
  };

  // ستايل ثابت — بدون أي تغيير عند التحقق
  const qBtnStyle = (qId, option) => {
    const isSelected = qAnswers[qId] === option;
    return {
      color: isSelected ? "#374151" : "#374151",
      border: isSelected ? "1px solid #f39b42" : "1px solid #374151",
    };
  };

  return (
    <DndContext
      onDragStart={(event) => {
        setActiveDrag(event.active.id);
      }}
      onDragEnd={(event) => {
        const { active, over } = event;
        setActiveDrag(null);

        if (!over) return;

        const slot = over.id;

        setChecked(false);
        setWrongSlots({});
        setWrongQIds({});

        const newAnswers = { ...orderAnswers };

        // شيل الاسم من أي مكان
        Object.keys(newAnswers).forEach((k) => {
          if (newAnswers[k] === active.id) newAnswers[k] = "";
        });

        // استبدال مباشر (حتى لو فيه اسم)
        newAnswers[slot] = active.id;

        setOrderAnswers(newAnswers);
      }}
    >
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "18px" }}>
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">A</span> Write the names in ABC order.
            Answer the questions.
          </h1>

          {/* Word Bank */}

          <div className="flex flex-wrap gap-2 justify-center p-3 rounded-2xl">
            {NAME_BANK.map((name) => {
              const isUsed = usedNames.includes(name);

              return (
                <DraggableName
                  key={name}
                  name={name}
                  disabled={isUsed}
                  style={{
                    opacity: isUsed ? 0.4 : 1,
                  }}
                />
              );
            })}
          </div>

          {/* ── الجزء الأول: الترتيب ── */}
          <div style={{ display: "flex", gap: "50px" }}>
            {/* 🔹 العمود الأول: الصور */}
            <div className="flex flex-col">
              {[1, 2, 3].map((slot) => {
                const name = CORRECT_ORDER[slot - 1]; // ترتيب الصور ثابت

                return (
                
                    <img
                      src={NAME_IMGS[name]}
                      alt={name}
                      style={{ width: "auto", height: 120,  }}
                    />

                );
              })}
            </div>

            {/* 🔹 العمود الثاني: الأرقام + drop areas */}
            <div className="flex flex-col justify-between gap-4 flex-1 w-full">
              {[1, 2, 3, 4, 5, 6].map((slot) => (
                <div key={slot} className="flex items-center gap-3 w-full">
                  <span className="font-bold text-gray-600 w-4 text-xl">
                    {slot}
                  </span>

                  <DroppableSlot id={String(slot)}>
                    {(isOver) => (
                      <div
                        onClick={() => {
                          if (showAns || checked) return;

                          setOrderAnswers((prev) => ({
                            ...prev,
                            [slot]: "",
                          }));

                          setChecked(false);
                          setWrongSlots({});
                        }}
                        style={{
                          flex: 1,
                          minHeight: 36,
                          borderBottom: `1px solid ${isOver ? "#f59e0b" :  (wrongSlots[slot] )? "red" :"#464646ff"}`,
                          // borderRadius: 12,
                          background: isOver ? "#fff7ed" : "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          cursor: "pointer",
                          transition: "0.2s ease",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#374151",
                          width: "100%",
                        }}
                      >
                        {orderAnswers[slot]}

                        {checked && wrongSlots[slot] && <ErrorBadge />}
                      </div>
                    )}
                  </DroppableSlot>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* ── الجزء الثاني: الأسئلة ── */}
          <div
            className="grid grid-cols-1 gap-3"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            {QUESTIONS.map((q) => {
              const value = qAnswers[q.id] || "";

              // تحديد الخيارات حسب نوع السؤال
              const options = q.id <= 4 ? CORRECT_ORDER : YES_NO_OPTIONS;

              const isWrong =
                checked && !showAns && value && value !== q.answer;

              return (
                <div key={q.id} className="flex flex-col gap-1 w-[70%]">
                  <p className="text-lg text-gray-800">
                    <span className="text-[xl] mr-2">{q.id}</span>
                    {q.question}
                  </p>

                  <div style={{ position: "relative", width: "100%" }}>
                    <select
                      value={value}
                      disabled={showAns || checked}
                      onChange={(e) => handleQSelect(q.id, e.target.value)}
                      style={{
                        padding: "6px 10px",
                        // borderRadius: "10px",
                        borderBottom: `1px solid ${
                          isWrong ? "red" : "#374151"
                        }`,
                        fontSize: "16px",
                        background: "#fff",
                        color: "#374151",
                        minWidth: "160px",
                        cursor: showAns || checked ? "default" : "pointer",
                        width: "100%",
                      }}
                    >
                      <option value="" disabled>
                        Select
                      </option>

                      {options.map((op) => (
                        <option key={op} value={op}>
                          {op}
                        </option>
                      ))}
                    </select>

                    {/* ❌ إشارة الخطأ */}
                    {isWrong && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-6px",
                          right: "-6px",
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          background: "red",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          fontWeight: "bold",
                          border: "2px solid white",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        }}
                      >
                        ✕
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              checkAnswers={handleCheck}
              handleStartAgain={handleReset}
              handleShowAnswer={handleShowAnswer}
            />
          </div>
          <DragOverlay>
            {activeDrag ? (
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{
                  background: "#fff",
                  border: "1.5px solid #f39b42",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              >
                {activeDrag}
              </span>
            ) : null}
          </DragOverlay>
        </div>
      </div>
    </DndContext>
  );
}
