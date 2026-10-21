import { useMemo, useState } from "react";
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
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import useUnit4TabDrag from "../unit4/useUnit4TabDrag";
import "../unit4/unit4Interactions.css";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 6.svg";
import sound from "../../../assets/audio/ClassBook/Unit 8/P 71/unit8-pg71-EXD.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const BANK = ["s", "v", "w", "b", "m", "d"].map((value, index) => ({
  id: `${value}-${index}`,
  value,
}));
const QUESTIONS = [
  { id: 1, image: img1, alt: "A milkshake", correct: "m" },
  { id: 2, image: img2, alt: "A bike", correct: "b" },
  { id: 3, image: img3, alt: "A duck", correct: "d" },
  { id: 4, image: img4, alt: "A van", correct: "v" },
  { id: 5, image: img5, alt: "A star", correct: "s" },
  { id: 6, image: img6, alt: "A wheel", correct: "w" },
];
const captions = [
  { start: 0.119, end: 3.439, text: "Page 71, review seven, exercise D." },
  {
    start: 4.44,
    end: 16.219,
    text: "What is the beginning sound of the word? Listen and write. One, milkshake. Two, bike. Three, duck. Four,",
  },
  { start: 17.299, end: 23.159, text: "van. Five, star. Six, wheel" },
];

function BankItem({ item, used, showAns, register, pick }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    disabled: used || showAns,
  });
  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(item.id, element);
      }}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={used || showAns ? -1 : 0}
      aria-disabled={used || showAns}
      aria-label={`Sound ${item.value}, press Enter or Space to pick up`}
      onKeyDown={(event) => {
        if (!used && !showAns && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          event.stopPropagation();
          pick();
        }
      }}
      className="unit4-interactive"
      style={{
        height: 40,
        width: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #F79530",
        borderRadius: 8,
        background: used ? "#eee" : "white",
        color: used ? "#999" : "#111",
        opacity: used ? 0.55 : 1,
        fontWeight: "bold",
        fontSize: 20,
        cursor: used || showAns ? "not-allowed" : "grab",
        touchAction: "none",
        transform: transform
          ? `translate(${transform.x}px,${transform.y}px)`
          : undefined,
      }}
    >
      {item.value}
    </div>
  );
}

function DropBox({
  question,
  answer,
  preview,
  wrong,
  locked,
  register,
  onKeyDown,
  onRemove,
}) {
  const { setNodeRef, isOver } = useDroppable({ id: String(question.id) });
  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(String(question.id), element);
      }}
      role="button"
      tabIndex={!locked && (answer || preview) ? 0 : -1}
      aria-disabled={locked}
      aria-label={`Beginning sound for ${question.alt}`}
      onKeyDown={onKeyDown}
      onClick={() => answer && !locked && onRemove(question.id)}
      className={`unit4-drop-target unit4-interactive ${preview && !answer ? "unit4-keyboard-preview" : ""}`}
      style={{
        position: "relative",
        marginTop: 6,
        width: "70%",
        borderBottom: `1px solid ${wrong ? "red" : isOver ? "#F79530" : "#000"}`,
        minHeight: 32,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        fontWeight: "bold",
        background: isOver ? "#ffefdd" : "transparent",
        cursor: answer && !locked ? "pointer" : "default",
      }}
    >
      {answer || preview || ""}
      {wrong && (
        <span
          style={{
            position: "absolute",
            right: "10%",
            top: "50%",
            transform: "translateY(-50%)",
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "red",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            border: "2px solid white",
          }}
        >
          ✕
        </span>
      )}
    </div>
  );
}

export default function Review7_Page2_Q2() {
  const [answers, setAnswers] = useState({});
  const [activeItemId, setActiveItemId] = useState(null);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const usedItemIds = useMemo(
    () =>
      Object.values(answers)
        .map((entry) => entry?.itemId)
        .filter(Boolean),
    [answers],
  );
  const place = (itemId, targetId) => {
    const questionId = Number(targetId);
    if (showAns || lockedIds.includes(questionId)) return;
    const item = BANK.find((entry) => entry.id === itemId);
    if (!item) return;
    setAnswers((previous) => {
      const updated = { ...previous };
      Object.keys(updated).forEach((key) => {
        if (updated[key]?.itemId === itemId) delete updated[key];
      });
      updated[questionId] = { itemId, value: item.value };
      return updated;
    });
    setWrongIds((previous) => previous.filter((id) => id !== questionId));
  };
  const keyboard = useUnit4TabDrag({
    itemIds: BANK.map((item) => item.id),
    targetIds: QUESTIONS.map((question) => String(question.id)),
    isItemDisabled: (id) => usedItemIds.includes(id) || showAns,
    isTargetDisabled: (id) => lockedIds.includes(Number(id)) || showAns,
    onPlace: place,
  });
  const remove = (questionId) => {
    if (showAns || lockedIds.includes(questionId)) return;
    const itemId = answers[questionId]?.itemId;
    setAnswers((previous) => {
      const updated = { ...previous };
      delete updated[questionId];
      return updated;
    });
    setWrongIds((previous) => previous.filter((id) => id !== questionId));
    if (itemId) keyboard.focusItem(itemId);
  };
  const check = () => {
    if (showAns || lockedIds.length === QUESTIONS.length) return;
    if (!QUESTIONS.every((question) => answers[question.id]?.value)) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const correct = QUESTIONS.flatMap((question) =>
      answers[question.id]?.value === question.correct ? [question.id] : [],
    );
    const wrong = QUESTIONS.flatMap((question) =>
      answers[question.id]?.value !== question.correct ? [question.id] : [],
    );
    setLockedIds(correct);
    setWrongIds(wrong);
    if (correct.length === QUESTIONS.length)
      ValidationAlert.success(`Score: ${correct.length} / ${QUESTIONS.length}`);
    else if (correct.length)
      ValidationAlert.warning(`Score: ${correct.length} / ${QUESTIONS.length}`);
    else ValidationAlert.error(`Score: 0 / ${QUESTIONS.length}`);
  };
  const show = () => {
    setAnswers(
      Object.fromEntries(
        QUESTIONS.map((question) => {
          const item = BANK.find((entry) => entry.value === question.correct);
          return [question.id, { itemId: item.id, value: item.value }];
        }),
      ),
    );
    setLockedIds(QUESTIONS.map((question) => question.id));
    setWrongIds([]);
    setShowAns(true);
    setActiveItemId(null);
    keyboard.cancel();
  };
  const reset = () => {
    setAnswers({});
    setLockedIds([]);
    setWrongIds([]);
    setShowAns(false);
    setActiveItemId(null);
    keyboard.cancel();
  };
  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => setActiveItemId(String(event.active.id))}
      onDragEnd={(event) => {
        if (event.over) place(String(event.active.id), String(event.over.id));
        setActiveItemId(null);
      }}
      onDragCancel={() => setActiveItemId(null)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 30,
        }}
      >
        <div className="div-forall mb-10" style={{ gap: 20 }}>
          <ExerciseHeaderReview
            sectionLetter="D"
            title={
              <>
                What is the{" "}
                <span style={{ color: "#2e3192" }}>beginning sound</span> of the
                word? Listen and write.
              </>
            }
            subTitle="Replay the word if needed, identify its sound, then drag the matching sound tile into place."
          />
          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={8.5}
            pageId="review7-page71-d"
          />
          <div
            className="w-full"
            style={{
              display: "flex",
              gap: 30,
              justifyContent: "center",
              padding: 10,
            }}
          >
            {BANK.map((item) => (
              <BankItem
                key={item.id}
                item={item}
                used={usedItemIds.includes(item.id)}
                showAns={showAns}
                register={keyboard.registerItem}
                pick={() => keyboard.pickItem(item.id)}
              />
            ))}
          </div>
          <div
            className="w-full"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 12,
            }}
          >
            {QUESTIONS.map((question) => {
              const answer = answers[question.id]?.value;
              const previewItem =
                keyboard.keyboardTargetId === String(question.id)
                  ? BANK.find((item) => item.id === keyboard.keyboardItemId)
                  : null;
              const locked = lockedIds.includes(question.id) || showAns;
              return (
                <div
                  key={question.id}
                  style={{ padding: 6, textAlign: "center" }}
                >
                  <div style={{ display: "flex", gap: 5 }}>
                    <strong style={{ fontSize: 20 }}>{question.id}</strong>
                    <img
                      src={question.image}
                      alt={question.alt}
                      style={{
                        width: "auto",
                        height: 120,
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <DropBox
                    question={question}
                    answer={answer}
                    preview={previewItem?.value}
                    wrong={wrongIds.includes(question.id)}
                    locked={locked}
                    register={keyboard.registerTarget}
                    onRemove={remove}
                    onKeyDown={(event) => {
                      if (
                        !keyboard.keyboardItemId &&
                        answer &&
                        !locked &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        remove(question.id);
                        return;
                      }
                      keyboard.handleTargetKeyDown(event, String(question.id));
                    }}
                  />
                </div>
              );
            })}
          </div>
          <Button
            handleShowAnswer={show}
            handleStartAgain={reset}
            checkAnswers={check}
          />
        </div>
      </div>
      <DragOverlay>
        {activeItemId ? (
          <div
            style={{
              height: 40,
              width: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #F79530",
              borderRadius: 10,
              background: "white",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {BANK.find((item) => item.id === activeItemId)?.value}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
