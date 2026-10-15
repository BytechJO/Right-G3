/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";
import Unit1PlayingAudioIcon from "./Unit1PlayingAudioIcon";
import useUnit1Audio from "./useUnit1Audio";
import useUnit1TabDrag from "./useUnit1TabDrag";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 2.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 3.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 4.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 5.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 6.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 7.svg";
import sentence1 from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise D/Item_001_The_clown_is_taller_than_the_boy.mp3";
import sentence2 from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise D/Item_002_The_car_is_faster_than_the_bike.mp3";
import sentence3 from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise D/Item_003_The_couch_is_bigger_than_the_TV.mp3";
import sentence4 from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise D/Item_004_The_book_is_heavier_than_the_pen.mp3";
import sentence5 from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise D/Item_005_The_clown_is_thinner_than_the_panda_bear.mp3";
import sentence6 from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise D/Item_006_The_feather_is_lighter_than_the_bag.mp3";
import "./Page9_Q1.css";
import "./unit1Interactions.css";

const QUESTIONS = [
  {
    id: 1,
    text: "The clown is taller than the boy.",
    answer: 2,
    audio: sentence1,
  },
  {
    id: 2,
    text: "The car is faster than the bike.",
    answer: 3,
    audio: sentence2,
  },
  {
    id: 3,
    text: "The couch is bigger than the TV.",
    answer: 6,
    audio: sentence3,
  },
  {
    id: 4,
    text: "The book is heavier than the pen.",
    answer: 1,
    audio: sentence4,
  },
  {
    id: 5,
    text: "The clown is thinner than the panda bear.",
    answer: 4,
    audio: sentence5,
  },
  {
    id: 6,
    text: "The feather is lighter than the bag.",
    answer: 5,
    audio: sentence6,
  },
];

const IMAGES = [
  { src: img1, alt: "A car moving faster than a bicycle" },
  { src: img2, alt: "A couch that is bigger than a television" },
  { src: img3, alt: "A feather that is lighter than a bag" },
  { src: img4, alt: "A clown standing taller than a boy" },
  { src: img5, alt: "A clown that is thinner than a panda bear" },
  { src: img6, alt: "A book that is heavier than a pen" },
];

const ITEM_IDS = QUESTIONS.map((question) => `number-${question.id}`);
const TARGET_IDS = IMAGES.map((_, index) => `image-${index}`);

const NUMBER_SLOT_STYLE = {
  position: "absolute",
  left: "0.41%",
  top: "73.77%",
  width: "16%",
  height: "25.47%",
  display: "grid",
  placeItems: "center",
  boxSizing: "border-box",
  borderRadius: "42%",
  background: "#f39b42",
  color: "#fff",
  fontWeight: 700,
  fontSize: "clamp(13px, 2vw, 20px)",
};

function NumberTile({
  id,
  value,
  disabled,
  registerItem,
  onActivate,
  onKeyDown,
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  });
  return (
    <button
      type="button"
      ref={(element) => {
        setNodeRef(element);
        registerItem(id, element);
      }}
      {...listeners}
      {...attributes}
      disabled={disabled}
      className="unit1-drag-item"
      onKeyDown={onKeyDown}
      onClick={(event) => {
        event.preventDefault();
        onActivate();
      }}
      style={{
        width: "45px",
        height: "45px",
        border: 0,
        borderRadius: "50%",
        background: disabled ? "#cfcfd4" : "#f39b42",
        color: "#fff",
        fontWeight: 700,
        fontSize: "20px",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "grab",
        boxShadow: isDragging
          ? "0 16px 32px rgba(0,0,0,.25)"
          : "0 3px 10px rgba(0,0,0,.12)",
        touchAction: "none",
      }}
    >
      {value}
    </button>
  );
}

function ImageTarget({
  id,
  children,
  registerTarget,
  onKeyDown,
  tabIndex,
  preview,
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        registerTarget(id, element);
      }}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      className={`unit1-drop-target ${preview ? "unit1-keyboard-preview" : ""}`}
      style={{
        position: "relative",
        borderRadius: "16px",
        transform: isOver ? "scale(1.03)" : "scale(1)",
        boxShadow: isOver ? "0 0 12px #f39b429a" : "none",
        transition: "all .2s ease",
      }}
    >
      {children}
    </div>
  );
}

export default function Page9_Q1() {
  const { activeAudioKey, playAudio, stopAudio } = useUnit1Audio();
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [correctTargets, setCorrectTargets] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const numberAt = (targetIndex) => answers[targetIndex];
  const usedNumbers = Object.values(answers);
  const isItemDisabled = (id) =>
    usedNumbers.includes(Number(id.replace("number-", "")));
  const isTargetDisabled = (id) =>
    correctTargets.includes(Number(id.replace("image-", "")));

  const placeNumber = (itemId, targetId) => {
    const value = Number(itemId.replace("number-", ""));
    const target = Number(targetId.replace("image-", ""));
    if (revealed || correctTargets.includes(target)) return;
    setAnswers((previous) => {
      const next = { ...previous };
      Object.keys(next).forEach((key) => {
        if (next[key] === value) delete next[key];
      });
      next[target] = value;
      return next;
    });
    setChecked(false);
  };

  const keyboard = useUnit1TabDrag({
    itemIds: ITEM_IDS,
    targetIds: TARGET_IDS,
    isItemDisabled,
    isTargetDisabled,
    onPick: (id) => {
      const number = Number(id.replace("number-", ""));
      playAudio(`number-${number}`, QUESTIONS[number - 1].audio);
    },
    onPlace: placeNumber,
  });

  const returnNumber = (event, targetIndex) => {
    event.stopPropagation();
    if (revealed || correctTargets.includes(targetIndex)) return;
    const value = answers[targetIndex];
    setAnswers((previous) => {
      const next = { ...previous };
      delete next[targetIndex];
      return next;
    });
    setChecked(false);
    if (value) keyboard.focusItem(`number-${value}`);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || !String(over.id).startsWith("image-")) return;
    placeNumber(String(active.id), String(over.id));
  };

  const checkAnswers = () => {
    if (revealed || correctTargets.length === QUESTIONS.length) return;
    if (Object.keys(answers).length < IMAGES.length)
      return ValidationAlert.info(
        "Please number every picture before checking.",
      );
    const correct = IMAGES.map(
      (_, index) => QUESTIONS[index].answer === answers[index],
    );
    const ids = correct
      .map((value, index) => (value ? index : null))
      .filter((value) => value !== null);
    setCorrectTargets(ids);
    setChecked(true);
    if (ids.length === QUESTIONS.length)
      ValidationAlert.success(`Score: ${ids.length} / ${QUESTIONS.length}`);
    else if (ids.length === 0)
      ValidationAlert.error(`Score: 0 / ${QUESTIONS.length}`);
    else ValidationAlert.warning(`Score: ${ids.length} / ${QUESTIONS.length}`);
  };

  const showAnswer = () => {
    setAnswers(
      Object.fromEntries(
        QUESTIONS.map((question, index) => [index, question.answer]),
      ),
    );
    setCorrectTargets(IMAGES.map((_, index) => index));
    setChecked(true);
    setRevealed(true);
    stopAudio();
  };

  const reset = () => {
    setAnswers({});
    setCorrectTargets([]);
    setChecked(false);
    setRevealed(false);
    setActiveId(null);
    keyboard.cancel();
    stopAudio();
  };

  return (
    <DndContext
      onDragStart={({ active }) => {
        setActiveId(String(active.id));
        const number = Number(String(active.id).replace("number-", ""));
        playAudio(`number-${number}`, QUESTIONS[number - 1].audio);
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="main-container-component">
        <div className="div-forall mb-10" style={{ gap: "10px" }}>
          <ExerciseHeader
            sectionLetter="D"
            title="Read and number the pictures."
            subTitle="Read one sentence at a time, then place its number on the picture that matches it."
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "18px",
              width: "100%",
            }}
          >
            {QUESTIONS.map((question) => (
              <NumberTile
                key={question.id}
                id={`number-${question.id}`}
                value={question.id}
                disabled={isItemDisabled(`number-${question.id}`)}
                registerItem={keyboard.registerItem}
                onActivate={() => keyboard.pickItem(`number-${question.id}`)}
                onKeyDown={(event) =>
                  keyboard.handleItemKeyDown(event, `number-${question.id}`)
                }
              />
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "34px",
              width: "100%",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {QUESTIONS.map((question) => (
                <button
                  type="button"
                  key={question.id}
                  className="unit1-audio-control unit1-interactive"
                  onClick={() =>
                    playAudio(`sentence-${question.id}`, question.audio)
                  }
                  style={{
                    display: "flex",
                    gap: "10px",
                    padding: "8px",
                    border: 0,
                    background: "transparent",
                    textAlign: "left",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  <strong>{question.id}.</strong>
                  <span>{question.text}</span>
                  <Unit1PlayingAudioIcon
                    active={activeAudioKey === `sentence-${question.id}`}
                  />
                </button>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              {IMAGES.map((image, index) => {
                const assigned = numberAt(index);
                const correct = correctTargets.includes(index);
                const fullAudioEnabled = checked && correct;
                const fullQuestion = assigned ? QUESTIONS[assigned - 1] : null;
                return (
                  <ImageTarget
                    key={index}
                    id={`image-${index}`}
                    registerTarget={keyboard.registerTarget}
                    preview={keyboard.keyboardTargetId === `image-${index}`}
                    tabIndex={
                      keyboard.keyboardItemId || fullAudioEnabled ? 0 : -1
                    }
                    onKeyDown={(event) => {
                      if (keyboard.keyboardItemId)
                        keyboard.handleTargetKeyDown(event, `image-${index}`);
                      else if (
                        fullAudioEnabled &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        playAudio(`full-${index}`, fullQuestion.audio);
                      }
                    }}
                  >
                    <div
                      className={`unit1-audio-control ${fullAudioEnabled ? "unit1-completed-audio" : ""}`}
                      onClick={() =>
                        fullAudioEnabled &&
                        playAudio(`full-${index}`, fullQuestion.audio)
                      }
                      style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        padding: "8px",
                        borderRadius: "16px",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                        }}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          style={{
                            width: "80%",
                            height: "auto",
                            display: "block",
                          }}
                        />
                        {!assigned &&
                          keyboard.keyboardTargetId === `image-${index}` &&
                          keyboard.keyboardItemId && (
                            <span
                              aria-hidden="true"
                              style={{
                                ...NUMBER_SLOT_STYLE,
                              }}
                            >
                              {keyboard.keyboardItemId.replace("number-", "")}
                            </span>
                          )}
                        {assigned && (
                          <button
                            type="button"
                            onClick={(event) => {
                              if (fullAudioEnabled) {
                                event.stopPropagation();
                                playAudio(`full-${index}`, fullQuestion.audio);
                              } else {
                                returnNumber(event, index);
                              }
                            }}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                if (fullAudioEnabled) {
                                  event.stopPropagation();
                                  playAudio(
                                    `full-${index}`,
                                    fullQuestion.audio,
                                  );
                                } else {
                                  returnNumber(event, index);
                                }
                              }
                            }}
                            aria-label={
                              fullAudioEnabled
                                ? `Number ${assigned}. Play the complete sentence.`
                                : `Number ${assigned}. Activate to return it to the choices.`
                            }
                            style={{
                              ...NUMBER_SLOT_STYLE,
                              border: 0,
                              cursor:
                                correct || revealed ? "default" : "pointer",
                            }}
                          >
                            {assigned}
                          </button>
                        )}
                      </div>
                      <Unit1PlayingAudioIcon
                        active={activeAudioKey === `full-${index}`}
                      />
                      {checked && assigned && !correct && (
                        <div
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "8px",
                          }}
                        >
                          <WrongMark />
                        </div>
                      )}
                    </div>
                  </ImageTarget>
                );
              })}
            </div>
          </div>

          <Button
            handleShowAnswer={showAnswer}
            handleStartAgain={reset}
            checkAnswers={checkAnswers}
            checkDisabled={
              revealed || correctTargets.length === QUESTIONS.length
            }
          />
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <div
            style={{
              width: "45px",
              height: "45px",
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              background: "#f39b42",
              color: "#fff",
              fontWeight: 700,
              fontSize: "20px",
            }}
          >
            {activeId.replace("number-", "")}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
