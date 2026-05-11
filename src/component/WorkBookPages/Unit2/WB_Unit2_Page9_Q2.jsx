import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 6.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 11.svg";
import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const ANSWER_COLOR = "#000000";
function DraggableItem({ item, isUsed, showAns }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: item,
    disabled: isUsed || showAns,
  });

  const style = {
    ...styles.dragItem,
    border: `1px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
    backgroundColor: isUsed ? "#eeeeee" : "white",
    color: isUsed ? "#999" : "#222",
    cursor: isUsed || showAns ? "not-allowed" : "grab",
    opacity: isUsed ? 0.6 : 1,
    boxShadow: isUsed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {item.value}
    </div>
  );
}
const DRAG_ITEMS = [
  { id: 1, value: "goes to the library by taxi." },
  { id: 2, value: "goes to the library by bus." },
  { id: 3, value: "goes to the mall by bike." },
  { id: 4, value: "goes to the mall by car." },
  { id: 5, value: "goes to the mall by the subway." },
];

const EXERCISE_GROUPS = [
  {
    id: "harley",
    personImg: img1,
    placeText: "going to\nthe library",

    questions: [
      {
        id: 1,
        prefix: "Harley rarely",
        fixed: "goes to the library by car.",
        mode: "fixed",
      },
      {
        id: 2,
        prefix: "Harley sometimes",
        correct: "goes to the library by taxi.",
        mode: "drop",
      },
      {
        id: 3,
        prefix: "Harley usually",
        correct: "goes to the library by bus.",
        mode: "drop",
      },
    ],
  },
  {
    id: "helen",
    personImg: img2,
    placeText: "going to\nthe mall",

    questions: [
      {
        id: 4,
        prefix: "Helen sometimes",
        correct: "goes to the mall by bike.",
        mode: "drop",
      },
      {
        id: 5,
        prefix: "Helen usually",
        correct: "goes to the mall by car.",
        mode: "drop",
      },
      {
        id: 6,
        prefix: "Helen rarely",
        correct: "goes to the mall by the subway.",
        mode: "drop",
      },
    ],
  },
];
function DropBox({ boxKey, value, wrong, onDrop, showAns }) {
  const { setNodeRef } = useDroppable({
    id: boxKey,
  });

  return (
    <div
      ref={setNodeRef}
      onClick={() => !showAns && onDrop(null)}
      style={{
        ...styles.dropBox,

        // ✅ هذا السطر المهم
        borderBottom: wrong ? `2px solid ${WRONG_COLOR}` : "1px solid #3f3f3f",

        color: value ? ANSWER_COLOR : "#111",
        cursor: value && !showAns ? "pointer" : showAns ? "default" : "pointer",
      }}
    >
      {value}
      {wrong && <div style={styles.wrongBadge}>✕</div>}
    </div>
  );
}
const styles = {
  pageWrap: {
    width: "100%",
  },

  contentWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(18px, 2.5vw, 30px)",
    width: "100%",
  },

  wordBankWrap: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },

  wordBank: {
    width: "100%",
    // maxWidth: "1000px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "clamp(2px, 0.5vw, 5px)",
    padding: "clamp(2px, 1vw, 8px)",
    // border: `2px solid ${BORDER_COLOR}`,
    borderRadius: "clamp(12px, 1.4vw, 18px)",
    boxSizing: "border-box",
    background: "#fff",
  },

  dragItem: {
    minHeight: "clamp(30px, 4vw, 52px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "clamp(5px, 0.8vw, 10px) clamp(8px, 1vw, 16px)",
    borderRadius: "clamp(8px, 1vw, 14px)",
    fontSize: "clamp(10px, 1.45vw, 18px)",
    // fontWeight: 500,
    userSelect: "none",
    // transition: "0.2s ease",
    boxSizing: "border-box",
    touchAction: "none",
    lineHeight: 1.2,
  },

  section: {
    display: "flex",
    flexDirection: "column",
    // gap: "clamp(14px, 1.8vw, 22px)",
    width: "100%",
  },

  questionsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(10px, 1.4vw, 14px)",
    width: "100%",
  },

  questionRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "clamp(6px, 1vw, 12px)",
    width: "100%",
    minWidth: 0,
  },

  qNumber: {
    fontSize: "clamp(14px, 1.7vw, 20px)",
    fontWeight: "700",
    color: "#111",
    lineHeight: 1,
    minWidth: "clamp(16px, 1.7vw, 30px)",
    flexShrink: 0,
  },

  qPrefix: {
    fontSize: "clamp(12px, 1.4vw, 18px)",
    color: "#111",
    lineHeight: 1.15,
    flexShrink: 1,
    minWidth: 0,
  },

  fixedAnswerLine: {
    flex: 1,
    height: "clamp(28px, 2.8vw, 54px)",
    borderBottom: "1px solid #3f3f3f",
    display: "flex",
    alignItems: "flex-end",
    padding: "0 4px 3px",
    boxSizing: "border-box",
    fontSize: "clamp(12px, 1.4vw, 18px)",
    color: "#111",
    lineHeight: 1.1,
    minWidth: 0,
    wordBreak: "break-word",
  },

  dropBox: {
    flex: 1,
    minHeight: "clamp(28px, 3.8vw, 54px)",
    borderBottom: "1px solid #3f3f3f",
    display: "flex",
    alignItems: "flex-end",
    padding: "0 4px 3px",
    boxSizing: "border-box",
    position: "relative",
    fontSize: "clamp(13px, 1.4vw, 18px)",
    lineHeight: 1.1,
    fontWeight: 500,
    minWidth: 0,
    wordBreak: "break-word",
  },

  wrongBadge: {
    position: "absolute",
    top: "clamp(-8px, -1vw, -4px)",
    right: "clamp(-8px, -1vw, -4px)",
    width: "clamp(15px, 1.8vw, 24px)",
    height: "clamp(15px, 1.8vw, 24px)",
    borderColor: "#fff",
    borderWidth: "2px",
    borderRadius: "50%",
    backgroundColor: "red",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 700,
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "6px",
  },
};

export default function WB_ReadLookWrite_Page() {
  const [answers, setAnswers] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [touchItem, setTouchItem] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // لازم تحركي 5px قبل ما يبدأ السحب
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, // ضغطة خفيفة قبل السحب
        tolerance: 5,
      },
    }),
  );

  const dropQuestions = EXERCISE_GROUPS.flatMap((group) =>
    group.questions.filter((q) => q.mode === "drop"),
  );

  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const applyDrop = (boxKey, item) => {
    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key]?.dragId === item.id) {
        delete newAnswers[key];
      }
    });

    newAnswers[boxKey] = {
      dragId: item.id,
      value: item.value,
    };

    setAnswers(newAnswers);
    setShowResults(false);
  };

  const handleDragEnd = (event) => {
    if (showAns || showResults) return;

    const { active, over } = event;

    if (!over) return;

    const draggedItem = DRAG_ITEMS.find((i) => i.id === active.id);

    if (!draggedItem) return;

    applyDrop(over.id, draggedItem);
  };
  const handleRemoveAnswer = (boxKey) => {
    if (showAns || showResults) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[boxKey];
      return updated;
    });

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns || showResults) return;

    const allAnswered = dropQuestions.every(
      (item) => answers[`a-${item.id}`]?.value,
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = dropQuestions.length;

    dropQuestions.forEach((item) => {
      if (answers[`a-${item.id}`]?.value === item.correct) {
        score++;
      }
    });

    setShowResults(true);

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const filled = {};

    dropQuestions.forEach((item) => {
      const matched = DRAG_ITEMS.find((d) => d.value === item.correct);

      filled[`a-${item.id}`] = {
        dragId: matched?.id ?? item.id,
        value: item.correct,
      };
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setDraggedItem(null);
    setTouchItem(null);
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (question) => {
    if (!showResults || question.mode !== "drop") return false;
    return answers[`a-${question.id}`]?.value !== question.correct;
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "25px" }}>
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">B</span> Read, look, and write.
          </h1>

          <div style={styles.pageWrap}>
            <div style={styles.contentWrap}>
              <div style={styles.wordBankWrap}>
                <div style={styles.wordBank}>
                  {DRAG_ITEMS.map((item) => {
                    const isUsed = usedDragIds.includes(item.id);

                    return (
                      <DraggableItem
                        key={item.id}
                        item={item}
                        isUsed={isUsed}
                        showAns={showAns}
                      />
                    );
                  })}
                </div>
              </div>

              {EXERCISE_GROUPS.map((group, index) => (
                <div key={group.id} style={styles.section}>
                  {/* ✅ الصورة + النص */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      width: "100%",
                      marginBottom: "10px",
                    }}
                  >
                    <img
                      src={group.personImg}
                      alt={group.id}
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </div>

                  {/* ✅ الأسئلة */}
                  <div style={styles.questionsWrap}>
                    {group.questions.map((question) => (
                      <div key={question.id} style={styles.questionRow}>
                        <span style={styles.qNumber}>{question.id}</span>

                        <span style={styles.qPrefix}>{question.prefix}</span>

                        {question.mode === "fixed" ? (
                          <div style={styles.fixedAnswerLine}>
                            {question.fixed}
                          </div>
                        ) : (
                          <DropBox
                            boxKey={`a-${question.id}`}
                            value={answers[`a-${question.id}`]?.value || ""}
                            wrong={isWrong(question)}
                            showAns={showAns}
                            onDrop={() =>
                              handleRemoveAnswer(`a-${question.id}`)
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.buttonsWrap}>
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
            />
          </div>
        </div>

        {touchItem && (
          <div
            style={{
              position: "fixed",
              left: touchPos.x - 90,
              top: touchPos.y - 22,
              background: "#fff",
              padding: "8px 12px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              pointerEvents: "none",
              zIndex: 9999,
              fontSize: "clamp(12px, 1.4vw, 18px)",
              fontWeight: 600,
              color: "#222",
              maxWidth: "clamp(120px, 35vw, 240px)",
              textAlign: "center",
            }}
          >
            {touchItem.value}
          </div>
        )}
      </div>
    </DndContext>
  );
}
