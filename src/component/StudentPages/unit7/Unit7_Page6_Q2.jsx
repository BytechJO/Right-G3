import { useRef, useState } from "react";
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
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import useUnit4TabDrag from "../unit4/useUnit4TabDrag";
import "../unit4/unit4Interactions.css";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 5.svg";
import himAudio from "../../../assets/audio/ClassBook/Unit 7/Page 63 - Exercise E/Item_001_him.mp3";
import usAudio from "../../../assets/audio/ClassBook/Unit 7/Page 63 - Exercise E/Item_002_us.mp3";
import meAudio from "../../../assets/audio/ClassBook/Unit 7/Page 63 - Exercise E/Item_003_me.mp3";
import themAudio from "../../../assets/audio/ClassBook/Unit 7/Page 63 - Exercise E/Item_004_them.mp3";
import herAudio from "../../../assets/audio/ClassBook/Unit 7/Page 63 - Exercise E/Item_005_her.mp3";

const ITEMS = [
  { id: "him", value: "him", audio: himAudio },
  { id: "us", value: "us", audio: usAudio },
  { id: "me", value: "me", audio: meAudio },
  { id: "them", value: "them", audio: themAudio },
  { id: "her", value: "her", audio: herAudio },
];
const QUESTIONS = [
  { id: "1", image: img1, alt: "A boy", correct: "him" },
  {
    id: "2",
    image: img2,
    alt: "Two people standing together",
    correct: "them",
  },
  { id: "3", image: img3, alt: "A woman", correct: "her" },
  { id: "4", image: img4, alt: "Two friends standing together", correct: "us" },
  { id: "5", image: img5, alt: "A girl pointing to herself", correct: "me" },
];
const emptyAnswers = () =>
  Object.fromEntries(QUESTIONS.map((question) => [question.id, ""]));

const WordChip = ({ item, used, register, pick, play, playing }) => {
  const pointer = useRef({ x: 0, y: 0, moved: false });
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
      tabIndex={0}
      aria-disabled={used}
      aria-label={`${item.value}${used ? ", already used; press to hear" : ", press Enter or Space to pick up"}`}
      onPointerDown={(event) => {
        pointer.current = { x: event.clientX, y: event.clientY, moved: false };
        listeners?.onPointerDown?.(event);
      }}
      onPointerMove={(event) => {
        if (
          Math.hypot(
            event.clientX - pointer.current.x,
            event.clientY - pointer.current.y,
          ) > 5
        )
          pointer.current.moved = true;
      }}
      onClick={() => {
        if (!pointer.current.moved) play();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          if (used) play();
          else pick();
        }
      }}
      className="unit4-audio-control unit4-interactive"
      style={{
        height: 35,
        width: 90,
        border: "1px solid #F79530",
        borderRadius: 8,
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        cursor: used ? "default" : "grab",
        fontSize: 16,
        opacity: used ? 0.35 : isDragging ? 0.6 : 1,
      }}
    >
      <Unit4PlayingAudioIcon active={playing} />
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
  remove,
  onKeyDown,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id, disabled: locked });
  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(id, element);
      }}
      role="button"
      tabIndex={!locked && (Boolean(value) || Boolean(preview)) ? 0 : -1}
      aria-disabled={locked}
      aria-label={`Answer slot ${id.replace("slot-", "")}${value ? `, ${value}` : ", empty"}`}
      onClick={() => value && !locked && remove()}
      onKeyDown={onKeyDown}
      className={`unit4-drop-target unit4-interactive ${preview && !value ? "unit4-keyboard-preview" : ""}`}
      style={{
        position: "relative",
        marginTop: 10,
        borderBottom: wrong ? "2px solid red" : "2px solid black",
        minHeight: 30,
        width: 120,
        marginInline: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 18,
        fontWeight: "bold",
        cursor: value && !locked ? "pointer" : "default",
        background: isOver && !locked ? "rgba(247,149,48,.12)" : "transparent",
      }}
    >
      <span style={{ color: value ? "black" : "#777" }}>
        {value || preview}
      </span>
      {wrong && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "105%",
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

const Unit7_Page6_Q2 = () => {
  const [answers, setAnswers] = useState(emptyAnswers);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
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
    onPick: (id) => {
      const item = ITEMS.find((candidate) => candidate.id === id);
      if (item) playAudio(`word-${id}`, item.audio);
    },
    onPlace: place,
  });
  const remove = (id) => {
    if (lockedIds.includes(id) || showAnswer) return;
    const removed = answers[id];
    setAnswers((previous) => ({ ...previous, [id]: "" }));
    setWrongIds((previous) => previous.filter((item) => item !== id));
    if (removed) keyboard.focusItem(removed);
  };
  const checkAnswers = () => {
    if (showAnswer || lockedIds.length === QUESTIONS.length) return;
    if (Object.values(answers).some((answer) => !answer)) {
      ValidationAlert.info();
      return;
    }
    const correctIds = QUESTIONS.flatMap((question) =>
      answers[question.id] === question.correct ? [question.id] : [],
    );
    const incorrectIds = QUESTIONS.flatMap((question) =>
      answers[question.id] !== question.correct ? [question.id] : [],
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
  const reveal = () => {
    setAnswers(
      Object.fromEntries(
        QUESTIONS.map((question) => [question.id, question.correct]),
      ),
    );
    setLockedIds(QUESTIONS.map((question) => question.id));
    setWrongIds([]);
    setShowAnswer(true);
    setActiveItem(null);
    keyboard.cancel();
    stopAudio();
  };
  const reset = () => {
    setAnswers(emptyAnswers());
    setLockedIds([]);
    setWrongIds([]);
    setShowAnswer(false);
    setActiveItem(null);
    keyboard.cancel();
    stopAudio();
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
        <div className="div-forall" style={{ gap: 30 }}>
          <ExerciseHeader
            sectionLetter="E"
            title="Look and write. Use the words below."
            subTitle="Identify who each picture refers to, then drag the correct object pronoun into place."
          />
          <div
            style={{
              display: "flex",
              gap: 30,
              justifyContent: "center",
              width: "100%",
            }}
          >
            {ITEMS.map((item) => (
              <WordChip
                key={item.id}
                item={item}
                used={used.includes(item.id)}
                register={keyboard.registerItem}
                pick={() => keyboard.pickItem(item.id)}
                play={() => playAudio(`word-${item.id}`, item.audio)}
                playing={activeAudioKey === `word-${item.id}`}
              />
            ))}
          </div>
          {[QUESTIONS.slice(0, 3), QUESTIONS.slice(3)].map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="w-full"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: rowIndex ? 140 : 80,
                marginTop: rowIndex ? 10 : 0,
              }}
            >
              {row.map((question) => {
                const targetId = `slot-${question.id}`;
                return (
                  <div
                    key={question.id}
                    style={{ textAlign: "center", width: 180 }}
                  >
                    <div className="flex gap-3">
                      <span
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        {question.id}
                      </span>
                      <img
                        src={question.image}
                        alt={question.alt}
                        style={{
                          width: 140,
                          height: 140,
                          objectFit: "contain",
                        }}
                      />
                    </div>
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
                      remove={() => remove(question.id)}
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
          ))}
          <Button
            handleShowAnswer={reveal}
            handleStartAgain={reset}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
      <DragOverlay>
        {activeItem && (
          <span
            style={{
              height: 35,
              width: 90,
              border: "1px solid #F79530",
              borderRadius: 8,
              background: "white",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            {activeItem}
          </span>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit7_Page6_Q2;
