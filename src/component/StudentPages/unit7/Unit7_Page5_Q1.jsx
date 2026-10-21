import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4TabDrag from "../unit4/useUnit4TabDrag";
import "../unit4/unit4Interactions.css";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 8.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 9.svg";
import img10 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 10.svg";

const ITEMS = ["j", "d", "h", "f", "b", "r", "c", "d", "v", "w"].map(
  (value, index) => ({ id: `${value}-${index}`, value }),
);
const QUESTIONS = [
  { id: "1", image: img1, alt: "A fish", correct: "f" },
  { id: "2", image: img2, alt: "A bird", correct: "b" },
  { id: "3", image: img3, alt: "A jacket", correct: "j" },
  { id: "4", image: img4, alt: "A cake", correct: "c" },
  { id: "5", image: img5, alt: "A door", correct: "d" },
  { id: "6", image: img6, alt: "A rabbit", correct: "r" },
  { id: "7", image: img7, alt: "A duck", correct: "d" },
  { id: "8", image: img8, alt: "A house", correct: "h" },
  { id: "9", image: img9, alt: "A veterinarian", correct: "v" },
  { id: "10", image: img10, alt: "A window", correct: "w" },
];
const emptyAnswers = () =>
  Object.fromEntries(QUESTIONS.map((question) => [question.id, ""]));
const valueOf = (itemId) =>
  ITEMS.find((item) => item.id === itemId)?.value || "";

const WordChip = ({ item, used, register, pick }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
    disabled: used,
  });
  return (
    <button
      type="button"
      ref={(element) => {
        setNodeRef(element);
        register(item.id, element);
      }}
      {...attributes}
      {...listeners}
      tabIndex={used ? -1 : 0}
      aria-disabled={used}
      aria-label={`${item.value}${used ? ", already used" : ", press Enter or Space to pick up"}`}
      onKeyDown={(event) => {
        if (!used && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          event.stopPropagation();
          pick();
        }
      }}
      className="unit4-interactive"
      style={{
        padding: "7px 14px",
        border: "1px solid #F79530",
        borderRadius: 8,
        background: "white",
        fontWeight: "bold",
        cursor: used ? "not-allowed" : "grab",
        fontSize: 16,
        opacity: used ? 0.4 : isDragging ? 0.6 : 1,
      }}
    >
      {item.value}
    </button>
  );
};

const AnswerSlot = ({
  id,
  value,
  preview,
  wrong,
  locked,
  register,
  onRemove,
  onKeyDown,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id, disabled: locked });
  const shown = value || preview;
  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(id, element);
      }}
      role="button"
      tabIndex={!locked && (Boolean(value) || Boolean(preview)) ? 0 : -1}
      aria-disabled={locked}
      aria-label={`Answer slot ${id.replace("slot-", "")}${value ? `, ${valueOf(value)}` : ", empty"}`}
      onClick={() => value && !locked && onRemove()}
      onKeyDown={onKeyDown}
      className={`unit4-drop-target unit4-interactive ${preview && !value ? "unit4-keyboard-preview" : ""}`}
      style={{
        position: "relative",
        marginTop: 6,
        borderBottom: wrong ? "2px solid red" : "1px solid #000",
        minHeight: 35,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        fontWeight: "bold",
        cursor: value && !locked ? "pointer" : "default",
        background: isOver && !locked ? "rgba(247,149,48,.12)" : "transparent",
      }}
    >
      <span style={{ color: value ? "black" : "#777" }}>
        {shown ? valueOf(shown) : ""}
      </span>
      {wrong && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "18%",
            top: "50%",
            transform: "translateY(-50%)",
            width: 20,
            height: 20,
            background: "red",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: "bold",
            border: "2px solid white",
          }}
        >
          ✕
        </span>
      )}
    </div>
  );
};

const Unit7_Page5_Q1 = () => {
  const [answers, setAnswers] = useState(emptyAnswers);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const used = Object.values(answers).filter(Boolean);

  const place = (itemId, targetId) => {
    const questionId = String(targetId).replace("slot-", "");
    if (lockedIds.includes(questionId) || showAnswer) return;
    setAnswers((previous) => {
      const updated = Object.fromEntries(
        Object.entries(previous).map(([key, value]) => [
          key,
          value === itemId ? "" : value,
        ]),
      );
      updated[questionId] = itemId;
      return updated;
    });
    setWrongIds((previous) => previous.filter((id) => id !== questionId));
  };
  const keyboard = useUnit4TabDrag({
    itemIds: ITEMS.map((item) => item.id),
    targetIds: QUESTIONS.map((question) => `slot-${question.id}`),
    isItemDisabled: (id) => used.includes(id) || showAnswer,
    isTargetDisabled: (id) =>
      lockedIds.includes(String(id).replace("slot-", "")) || showAnswer,
    onPlace: place,
  });
  const remove = (questionId) => {
    if (lockedIds.includes(questionId) || showAnswer) return;
    const removed = answers[questionId];
    setAnswers((previous) => ({ ...previous, [questionId]: "" }));
    setWrongIds((previous) => previous.filter((id) => id !== questionId));
    if (removed) keyboard.focusItem(removed);
  };
  const checkAnswers = () => {
    if (showAnswer || lockedIds.length === QUESTIONS.length) return;
    if (Object.values(answers).some((answer) => !answer)) {
      ValidationAlert.info();
      return;
    }
    const correctIds = QUESTIONS.flatMap((question) =>
      valueOf(answers[question.id]) === question.correct ? [question.id] : [],
    );
    const incorrectIds = QUESTIONS.flatMap((question) =>
      valueOf(answers[question.id]) !== question.correct ? [question.id] : [],
    );
    setLockedIds(correctIds);
    setWrongIds(incorrectIds);
    ValidationAlert[
      correctIds.length === QUESTIONS.length
        ? "success"
        : correctIds.length
          ? "warning"
          : "error"
    ](`Score: ${correctIds.length} / ${QUESTIONS.length}`);
  };
  const showAnswers = () => {
    const available = [...ITEMS];
    const solved = {};
    QUESTIONS.forEach((question) => {
      const index = available.findIndex(
        (item) => item.value === question.correct,
      );
      solved[question.id] = available.splice(index, 1)[0].id;
    });
    setAnswers(solved);
    setLockedIds(QUESTIONS.map((question) => question.id));
    setWrongIds([]);
    setShowAnswer(true);
    setActiveItem(null);
    keyboard.cancel();
  };
  const reset = () => {
    setAnswers(emptyAnswers());
    setLockedIds([]);
    setWrongIds([]);
    setShowAnswer(false);
    setActiveItem(null);
    keyboard.cancel();
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => setActiveItem(String(event.active.id))}
      onDragCancel={() => setActiveItem(null)}
      onDragEnd={(event) => {
        if (event.over) place(String(event.active.id), String(event.over.id));
        setActiveItem(null);
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
        }}
      >
        <div className="div-forall" style={{ gap: 25 }}>
          <ExerciseHeader
            sectionLetter="A"
            questionNumber="1"
            title={
              <>
                Look and write the{" "}
                <span style={{ color: "#2e3192" }}>beginning sound</span> for
                each word.
              </>
            }
            subTitle="Say each picture name first, then drag the correct beginning sound to each word."
          />
          <div
            style={{
              width: "100%",
              maxWidth: 900,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 12,
                padding: 10,
                borderRadius: 10,
                marginTop: 20,
                justifyContent: "center",
                width: "100%",
                marginBottom: 20,
              }}
            >
              {ITEMS.map((item) => (
                <WordChip
                  key={item.id}
                  item={item}
                  used={used.includes(item.id)}
                  register={keyboard.registerItem}
                  pick={() => keyboard.pickItem(item.id)}
                />
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 30,
              }}
            >
              {QUESTIONS.map((question) => {
                const targetId = `slot-${question.id}`;
                return (
                  <div
                    key={question.id}
                    style={{
                      padding: 6,
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        color: "black",
                        fontSize: 16,
                        fontWeight: "bold",
                        zIndex: 2,
                      }}
                    >
                      {question.id}
                    </div>
                    <img
                      src={question.image}
                      alt={question.alt}
                      style={{
                        width: "100%",
                        height: 90,
                        objectFit: "contain",
                      }}
                    />
                    <AnswerSlot
                      id={targetId}
                      value={answers[question.id]}
                      preview={
                        keyboard.keyboardTargetId === targetId
                          ? keyboard.keyboardItemId
                          : ""
                      }
                      wrong={wrongIds.includes(question.id)}
                      locked={lockedIds.includes(question.id) || showAnswer}
                      register={keyboard.registerTarget}
                      onRemove={() => remove(question.id)}
                      onKeyDown={(event) => {
                        if (
                          !keyboard.keyboardItemId &&
                          answers[question.id] &&
                          !lockedIds.includes(question.id) &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          remove(question.id);
                          return;
                        }
                        keyboard.handleTargetKeyDown(event, targetId);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <Button
              handleShowAnswer={showAnswers}
              handleStartAgain={reset}
              checkAnswers={checkAnswers}
            />
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeItem && (
          <span
            style={{
              padding: "7px 14px",
              border: "1px solid #F79530",
              borderRadius: 8,
              background: "white",
              fontWeight: "bold",
            }}
          >
            {valueOf(activeItem)}
          </span>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit7_Page5_Q1;
