import { useState } from "react";
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

import imgRoom1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C1.svg";
import imgRoom2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C2.svg";
import imgRoom3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C3.svg";
import imgRoom4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C4.svg";
import imgRoom5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C5.svg";

import imgBoy from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C6.svg";
import imgGirl from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C7.svg";
import imgSofa from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C8.svg";
import imgFridge from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C9.svg";

// ─── البيانات ───────────────────────────────────────
const ANSWERS_BANK = [
  { id: "ans1", text: "No, he isn't." },
  { id: "ans2", text: "He's in the bathroom." },
  { id: "ans3", text: "Yes, he is." },
  { id: "ans4", text: "Yes, she is." },
  { id: "ans5", text: "No, she isn't." },
  { id: "ans6", text: "She's in the kitchen." },
  { id: "ans7", text: "It's in the living room." },
  { id: "ans8", text: "It's in the kitchen." },
];

const QUESTIONS = [
  {
    id: "q1",
    avatar: imgBoy,
    question: "Is he in the bedroom?",
    slots: ["q1_s1", "q1_s2"],
    correct: { q1_s1: "ans1", q1_s2: "ans2" },
  },
  {
    id: "q2",
    avatar: imgBoy,
    question: "Is he in the living room?",
    slots: ["q2_s1"],
    correct: { q2_s1: "ans3" },
  },
  {
    id: "q3",
    avatar: imgGirl,
    question: "Is she in the bedroom?",
    slots: ["q3_s1"],
    correct: { q3_s1: "ans4" },
  },
  {
    id: "q4",
    avatar: imgGirl,
    question: "Is she in the dining room?",
    slots: ["q4_s1", "q4_s2"],
    correct: { q4_s1: "ans5", q4_s2: "ans6" },
  },
  {
    id: "q5",
    avatar: imgSofa,
    question: "Where's the sofa?",
    slots: ["q5_s1"],
    correct: { q5_s1: "ans7" },
  },
  {
    id: "q6",
    avatar: imgFridge,
    question: "Where's the fridge?",
    slots: ["q6_s1"],
    correct: { q6_s1: "ans8" },
  },
];

const buildInit = () => {
  const init = {};
  QUESTIONS.forEach((q) => q.slots.forEach((s) => (init[s] = null)));
  return init;
};

const CORRECT_MAP = {};
QUESTIONS.forEach((q) => Object.assign(CORRECT_MAP, q.correct));

// ─── DraggableAnswer ─────────────────────────────────
function DraggableAnswer({ item, isUsed }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging || isUsed ? 0.4 : 1,
        padding: "8px 12px",
        background: "#fff",
        border: "2px solid #e5e7eb",
        borderRadius: "12px",
        color: "#1d4ed8",
        fontWeight: "600",
        fontSize: "13px",
        textAlign: "center",
        cursor: isUsed ? "default" : "grab",
        pointerEvents: isUsed ? "none" : "auto",
        userSelect: "none",
      }}
      {...attributes}
      {...listeners}
    >
      {item.text}
    </div>
  );
}

// ─── DropSlot ─────────────────────────────────────────
function DropSlot({ id, content, isCorrect, isSubmitted, isOver }) {
  const { setNodeRef, isOver: over } = useSortable({ id });

  const borderColor = isSubmitted
    ? isCorrect
      ? "#d1d5db"
      : "#ef4444"
    : over
    ? "#60a5fa"
    : "#d1d5db";

  const bg = isSubmitted
    ? isCorrect
      ? "transparent"
      : "#fef2f2"
    : over
    ? "#eff6ff"
    : "transparent";

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "36px",
        borderBottom: `2px solid ${borderColor}`,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 8px",
        borderRadius: "2px",
        transition: "all 0.2s",
      }}
    >
      {/* دائرة الخطأ الحمراء */}
      {isSubmitted && content && !isCorrect && (
        <div
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "#fff",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "bold",
            border: "2px solid #fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          ✕
        </div>
      )}

      {content ? (
        <span
          style={{
            color: "#1e3a8a",
            fontWeight: "700",
            fontSize: "13px",
            textAlign: "center",
            padding: "4px 0",
          }}
        >
          {ANSWERS_BANK.find((a) => a.id === content)?.text}
        </span>
      ) : (
        <span
          style={{
            color: "#d1d5db",
            fontStyle: "italic",
            fontSize: "12px",
          }}
        >
          Drop answer here...
        </span>
      )}
    </div>
  );
}

// ─── Component ──────────────────────────────────────
export default function WB_Unit5_Page28_Q1() {
  const [answers, setAnswers] = useState(buildInit());
  const [activeId, setActiveId] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const usedIds = new Set(Object.values(answers).filter(Boolean));

  const checkAnswers = () => {
    if (showResults) return;
    const hasEmpty = Object.values(answers).some((v) => !v);
    if (hasEmpty) return ValidationAlert.info("Answer everything");

    let score = 0;
    let total = 0;
    QUESTIONS.forEach((q) => {
      q.slots.forEach((s) => {
        total++;
        if (answers[s] === CORRECT_MAP[s]) score++;
      });
    });

    setShowResults(true);
    if (score === total) ValidationAlert.success(`Score: ${score}/${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score}/${total}`);
    else ValidationAlert.error(`Score: ${score}/${total}`);
  };

  const handleShowAnswer = () => {
    const correct = {};
    QUESTIONS.forEach((q) =>
      q.slots.forEach((s) => (correct[s] = CORRECT_MAP[s]))
    );
    setAnswers(correct);
    setShowResults(true);
  };

  const handleStartAgain = () => {
    setAnswers(buildInit());
    setShowResults(false);
  };

  const renderQ = (item) => (
    <div
      key={item.id}
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
      }}
    >
      <span
        style={{
          fontWeight: "bold",
          fontSize: "14px",
          width: "16px",
          flexShrink: 0,
        }}
      >
        {item.id.replace("q", "")}
      </span>

      <img
        src={item.avatar}
        alt=""
        style={{
          width: "32px",
          height: "32px",
          objectFit: "contain",
          marginTop: "4px",
          flexShrink: 0,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flex: 1,
        }}
      >
        <p style={{ fontSize: "14px", margin: "0 0 4px 0" }}>
          {item.question}
        </p>

        {item.slots.map((slotId) => (
          <DropSlot
            key={slotId}
            id={slotId}
            content={answers[slotId]}
            isCorrect={answers[slotId] === CORRECT_MAP[slotId]}
            isSubmitted={showResults}
          />
        ))}

        {/* سطر فاضي إذا سؤال بـ slot واحد */}
        {item.slots.length === 1 && (
          <div
            style={{ borderBottom: "2px solid #e5e7eb", width: "100%", height: "6px" }}
          />
        )}
      </div>
    </div>
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragEnd={(e) => {
        if (e.over && !showResults) {
          setAnswers((prev) => ({ ...prev, [e.over.id]: e.active.id }));
        }
        setActiveId(null);
      }}
    >
      <div style={{ padding: "16px", maxWidth: "896px", margin: "0 auto" }}>
         <h1 className="WB-header-title-page8 mb-2">
            <span className="WB-ex-A">D</span>Read, look, and write.
          </h1>


        {/* صور الغرف */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          {[imgRoom1, imgRoom2, imgRoom3, imgRoom4, imgRoom5].map((src, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: "80px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <img
                src={src}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          ))}
        </div>

        {/* الأسئلة */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[QUESTIONS[0], QUESTIONS[2], QUESTIONS[4]].map(renderQ)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[QUESTIONS[1], QUESTIONS[3], QUESTIONS[5]].map(renderQ)}
          </div>
        </div>

        {/* بنك الإجابات */}
        <div
          style={{
            background: "#eff6ff",
            padding: "20px",
            borderRadius: "16px",
            border: "2px solid #dbeafe",
            marginTop: "24px",
          }}
        >
          <h3
            style={{
              fontWeight: "bold",
              color: "#1e40af",
              marginBottom: "16px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            Answers Bank
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
            }}
          >
            <SortableContext items={ANSWERS_BANK.map((a) => a.id)}>
              {ANSWERS_BANK.map((ans) => (
                <DraggableAnswer
                  key={ans.id}
                  item={ans}
                  isUsed={usedIds.has(ans.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        {/* الأزرار */}
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            checkAnswers={checkAnswers}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <div
            style={{
              padding: "10px 14px",
              background: "#fff",
              border: "2px solid #3b82f6",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              color: "#1d4ed8",
              fontWeight: "700",
              fontSize: "13px",
              textAlign: "center",
              transform: "scale(1.05)",
              maxWidth: "200px",
              marginBottom: "20px"
            }}
          >
            {ANSWERS_BANK.find((a) => a.id === activeId)?.text}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}