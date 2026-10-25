import React, { useMemo, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4TabDrag from "../../StudentPages/unit4/useUnit4TabDrag";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.4.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.2.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.3.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.6.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.5.svg";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import sentence1Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise C/Item_001_A_small_cat_and_a_big_dog_are_running_down_the_hill.mp3";
import sentence2Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise C/Item_002_They're_running_across_the_street.mp3";
import sentence3Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise C/Item_003_The_cat_can_go_through_the_fence._The_dog_can't.mp3";
import sentence4Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise C/Item_004_The_dog_can't_jump_over_the_fence.mp3";
import sentence5Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise C/Item_005_The_cat_is_climbing_up_a_tree.mp3";
import sentence6Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise C/Item_006_The_cat_is_happy._The_dog_is_sad.mp3";

function DraggableNumber({ num, disabled, register, onKeyDown }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: num,
    disabled,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "grab",
  };

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(element);
      }}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onKeyDown={onKeyDown}
      className="unit4-interactive"
      style={{
        ...style,
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        background: "#f29a1f",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        touchAction: "none",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: "bold",
      }}
    >
      {num}
    </div>
  );
}

function DroppableCard({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: isOver ? "scale(1.05)" : "scale(1)",
        transition: "0.2s",
      }}
    >
      {children(isOver)}
    </div>
  );
}
const TEXT_COLOR = "#111";

const SENTENCES = [
  { id: 1, text: "A small cat and a big dog are running down the hill." },
  { id: 2, text: "They're running across the street." },
  { id: 3, text: "The cat can go through the fence. The dog can't." },
  { id: 4, text: "The dog can't jump over the fence." },
  { id: 5, text: "The cat is climbing up a tree." },
  { id: 6, text: "The cat is happy. The dog is sad." },
];

const IMAGE_CARDS = [
  { id: 1, img: img1, correctNumber: 3 },
  { id: 2, img: img2, correctNumber: 5 },
  { id: 3, img: img3, correctNumber: 2 },
  { id: 4, img: img4, correctNumber: 6 },
  { id: 5, img: img5, correctNumber: 1 },
  { id: 6, img: img6, correctNumber: 4 },
];

const DRAG_NUMBERS = [1, 2, 3, 4, 5, 6];
const SENTENCE_AUDIO = {
  1: sentence1Audio,
  2: sentence2Audio,
  3: sentence3Audio,
  4: sentence4Audio,
  5: sentence5Audio,
  6: sentence6Audio,
};
const IMAGE_ALT = {
  1: "A cat going through a fence while a dog stays behind it",
  2: "A cat climbing a tree",
  3: "A cat and a dog running across a street",
  4: "A happy cat and a sad dog",
  5: "A small cat and a big dog running down a hill",
  6: "A dog trying to jump over a fence",
};

export default function SB_ReadLookNumber_PageC() {
  const [imageAnswers, setImageAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [shakeDrops, setShakeDrops] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const usedNumbers = useMemo(
    () => Object.values(imageAnswers),
    [imageAnswers],
  );
  const tabDrag = useUnit4TabDrag({
    itemIds: DRAG_NUMBERS,
    targetIds: IMAGE_CARDS.map((card) => card.id),
    isItemDisabled: (id) => usedNumbers.includes(id) || showAns,
    isTargetDisabled: (id) => lockedIds.includes(id) || showAns,
    onPlace: (num, cardId) => applyDrop(Number(cardId), Number(num)),
  });

  const applyDrop = (cardId, num) => {
    if (showAns || lockedIds.includes(cardId)) return;
    const previousCardId = Number(
      Object.keys(imageAnswers).find((key) => imageAnswers[key] === num),
    );
    const updated = { ...imageAnswers };
    Object.keys(updated).forEach((k) => {
      if (updated[k] === num) delete updated[k];
    });
    updated[cardId] = num;
    setImageAnswers(updated);
    setDraggedNumber(null);
    setWrongIds((previous) =>
      previous.filter(
        (id) => id !== cardId && (!previousCardId || id !== previousCardId),
      ),
    );
  };

  const handleRemoveNumber = (cardId) => {
    if (showAns || lockedIds.includes(cardId)) return;
    const removedNumber = imageAnswers[cardId];
    setImageAnswers((prev) => {
      const updated = { ...prev };
      delete updated[cardId];
      return updated;
    });
    setWrongIds((previous) => previous.filter((id) => id !== cardId));
    if (removedNumber) tabDrag.focusItem(removedNumber);
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === IMAGE_CARDS.length) return;
    const allAnswered = IMAGE_CARDS.every((c) => imageAnswers[c.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    IMAGE_CARDS.forEach((c) => {
      if (imageAnswers[c.id] === c.correctNumber) score++;
    });
    setChecked(true);
    const correctIds = IMAGE_CARDS.filter(
      (card) => imageAnswers[card.id] === card.correctNumber,
    ).map((card) => card.id);
    setLockedIds((previous) => [...new Set([...previous, ...correctIds])]);
    setWrongIds(
      IMAGE_CARDS.filter(
        (card) => imageAnswers[card.id] !== card.correctNumber,
      ).map((card) => card.id),
    );
    const total = IMAGE_CARDS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const correct = {};
    IMAGE_CARDS.forEach((c) => {
      correct[c.id] = c.correctNumber;
    });
    setImageAnswers(correct);
    setChecked(true);
    setShowAns(true);
    setDraggedNumber(null);
    setLockedIds(IMAGE_CARDS.map((card) => card.id));
    setWrongIds([]);
    tabDrag.cancel();
    stopAudio();
  };

  const handleReset = () => {
    setImageAnswers({});
    setDraggedNumber(null);
    setChecked(false);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    tabDrag.cancel();
    stopAudio();
  };

  const isCardWrong = (cardId) => {
    return checked && !showAns && wrongIds.includes(cardId);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => {
        setDraggedNumber(event.active.id);
      }}
      onDragEnd={(event) => {
        const { active, over } = event;

        setDraggedNumber(null);

        if (!over) {
          setShakeDrops(false);
          window.requestAnimationFrame(() => setShakeDrops(true));
          return;
        }

        const cardId = over.id;

        applyDrop(Number(cardId), active.id);
      }}
    >
      <div className="main-container-component">
        <div
          className="div-forall"
          style={{
            gap: "35px",
          }}
        >
          {/* Title */}
          <ExerciseHeader
            sectionLetter="C"
            title="Read, look, and number the pictures. Point and say."
            subTitle="Read all six action sentences to the correct cat and dog pictures clues first, then assign the numbers carefully so the picture or order is used correctly."
          />

          {/* Sentences */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(6px,0.9vw,12px)",
              width: "100%",
            }}
          >
            {SENTENCES.map((s) => (
              <div
                key={s.id}
                className="unit4-audio-control unit4-interactive"
                role="button"
                tabIndex={0}
                onClick={() =>
                  playAudio(`sentence-${s.id}`, SENTENCE_AUDIO[s.id])
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio(`sentence-${s.id}`, SENTENCE_AUDIO[s.id]);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "clamp(8px,1vw,14px)",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `sentence-${s.id}`}
                />
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: TEXT_COLOR,
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: "clamp(16px,1.9vw,26px)",
                  }}
                >
                  {s.id}
                </span>
                <span
                  style={{
                    fontSize: "clamp(14px,1.4vw,18px)",
                    // fontWeight: 500,
                    color: TEXT_COLOR,
                    lineHeight: 1.35,
                    wordBreak: "break-word",
                  }}
                >
                  {s.text}
                </span>
              </div>
            ))}
          </div>
          {/* Drag numbers */}
          <div className="flex gap-5 justify-center">
            {DRAG_NUMBERS.map((num) => {
              const disabled = usedNumbers.includes(num);

              return (
                <DraggableNumber
                  key={num}
                  num={num}
                  disabled={disabled || showAns}
                  register={(element) => tabDrag.registerItem(num, element)}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    event.stopPropagation();
                    if (!disabled && !showAns) tabDrag.pickItem(num);
                  }}
                />
              );
            })}
          </div>
          {/* Image cards 3×2 */}
          <div
            className={shakeDrops ? "unit4-invalid-selection-shake" : ""}
            onAnimationEnd={() => setShakeDrops(false)}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              width: "100%",
            }}
          >
            {IMAGE_CARDS.map((card) => (
              <DroppableCard key={card.id} id={card.id}>
                {(isOver) => {
                  const wrong = isCardWrong(card.id);
                  const num = imageAnswers[card.id];

                  return (
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        // aspectRatio: "1.5 / 1",
                        // border: `2px solid ${
                        //   isOver ? "#f59e0b" : wrong ? "#ef4444" : "#f39b42"
                        // }`,
                        // borderRadius: "12px",
                        background:
                          isOver ||
                          (tabDrag.keyboardItemId != null &&
                            tabDrag.keyboardTargetId === card.id)
                            ? "#fff7ed"
                            : "white",
                        transition: "0.2s",
                      }}
                    >
                      {/* الصورة */}
                      <img
                        src={card.img}
                        alt={IMAGE_ALT[card.id]}
                        style={{
                          width: "90%",
                          height: "auto",
                          objectFit: "contain",
                          pointerEvents: "none",
                        }}
                      />

                      {/* الرقم */}
                      <div
                        ref={(element) =>
                          tabDrag.registerTarget(card.id, element)
                        }
                        onClick={() => handleRemoveNumber(card.id)}
                        onKeyDown={(event) => {
                          if (tabDrag.keyboardItemId != null)
                            tabDrag.handleTargetKeyDown(event, card.id);
                          else if (
                            (event.key === "Enter" || event.key === " ") &&
                            num &&
                            !lockedIds.includes(card.id)
                          ) {
                            event.preventDefault();
                            handleRemoveNumber(card.id);
                          }
                        }}
                        role="button"
                        tabIndex={
                          showAns || lockedIds.includes(card.id)
                            ? -1
                            : tabDrag.keyboardItemId != null || num
                              ? 0
                              : -1
                        }
                        aria-disabled={lockedIds.includes(card.id) || showAns}
                        className="unit4-interactive"
                        style={{
                          position: "absolute",
                          top: "2%",
                          right: "12%",
                          width: "40px",
                          height: "40px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "22px",
                          fontWeight: "bold",
                          color: wrong ? "red" : "#111",
                          cursor:
                            !showAns && !lockedIds.includes(card.id)
                              ? "pointer"
                              : "default",
                        }}
                      >
                        <span
                          className={
                            tabDrag.keyboardItemId != null &&
                            tabDrag.keyboardTargetId === card.id
                              ? "unit4-keyboard-preview"
                              : ""
                          }
                        >
                          {tabDrag.keyboardItemId != null &&
                          tabDrag.keyboardTargetId === card.id
                            ? tabDrag.keyboardItemId
                            : num || ""}
                        </span>
                      </div>

                      {/* ❌ علامة الخطأ */}
                      {wrong && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-6px",
                            right: "8%",
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
                  );
                }}
              </DroppableCard>
            ))}
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "clamp(6px,1vw,12px)",
            }}
          >
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleReset}
            />
          </div>
        </div>
      </div>
      <DragOverlay>
        {draggedNumber ? (
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "#f29a1f",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            {draggedNumber}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
