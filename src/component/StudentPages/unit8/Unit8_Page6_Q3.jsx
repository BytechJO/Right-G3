import React, { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Ex F 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Ex F 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Ex F 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Ex F 4.svg";
import audio1 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - Exercise F/Item_001_First,_she_washed_the_dishes.mp3";
import audio2 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - Exercise F/Item_002_Next,_she_shopped_in_the_supermarket.mp3";
import audio3 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - Exercise F/Item_003_She_carried_home_a_grocery_bag.mp3";
import audio4 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - Exercise F/Item_004_Then,_she_played_with_her_sister_Sarah.mp3";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4TabDrag from "../unit4/useUnit4TabDrag";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";

const SENTENCES = [
  { id: 1, text: "First, she washed the dishes.", audio: audio1 },
  { id: 2, text: "Next, she shopped in the supermarket.", audio: audio2 },
  { id: 3, text: "She carried home a grocery bag.", audio: audio3 },
  { id: 4, text: "Then, she played with her sister Sarah.", audio: audio4 },
];
const IMAGE_CARDS = [
  {
    id: 1,
    img: img1,
    alt: "A woman shopping in a supermarket",
    correctNumber: 2,
  },
  {
    id: 2,
    img: img2,
    alt: "A girl playing with her sister Sarah",
    correctNumber: 4,
  },
  { id: 3, img: img3, alt: "A woman washing the dishes", correctNumber: 1 },
  {
    id: 4,
    img: img4,
    alt: "A woman carrying a grocery bag home",
    correctNumber: 3,
  },
];
const DRAG_NUMBERS = [1, 2, 3, 4];

function NumberTile({ number, used, showAns, register, pick }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(number),
    disabled: used || showAns,
  });
  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(String(number), element);
      }}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={used || showAns ? -1 : 0}
      aria-disabled={used || showAns}
      aria-label={`Number ${number}, press Enter or Space to pick up`}
      onKeyDown={(event) => {
        if (!used && !showAns && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          event.stopPropagation();
          pick();
        }
      }}
      className="unit4-interactive"
      style={{
        width: "clamp(30px,5vw,40px)",
        height: "clamp(30px,5vw,40px)",
        borderRadius: "50%",
        background: used ? "#cfcfd4" : "#f29a1f",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "clamp(20px,2.4vw,25px)",
        cursor: used || showAns ? "not-allowed" : "grab",
        opacity: used ? 0.6 : 1,
        userSelect: "none",
        touchAction: "none",
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      {number}
    </div>
  );
}

function PictureCard({
  item,
  value,
  preview,
  wrong,
  locked,
  register,
  onKeyDown,
  onRemove,
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `card-${item.id}` });
  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(`card-${item.id}`, element);
      }}
      role="button"
      tabIndex={!locked && (value || preview) ? 0 : -1}
      aria-disabled={locked}
      aria-label={`${item.alt}. ${value ? `Number ${value}` : "Empty number slot"}`}
      onKeyDown={onKeyDown}
      onClick={() => value && !locked && onRemove(item.id)}
      className={`unit4-drop-target unit4-interactive ${preview && !value ? "unit4-keyboard-preview" : ""}`}
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "clamp(12px,1.4vw,18px)",
        cursor: value && !locked ? "pointer" : "default",
        transform: isOver ? "scale(1.03)" : undefined,
        transition: "0.2s ease",
      }}
    >
      <img
        src={item.img}
        alt={item.alt}
        draggable={false}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "contain",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "0.01%",
          left: "1.2%",
          width: "17%",
          aspectRatio: "1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: preview && !value ? "#777" : "#111",
          fontSize: "clamp(18px,1.7vw,20px)",
          pointerEvents: "none",
        }}
      >
        {value || preview || ""}
        {wrong && (
          <span
            style={{
              position: "absolute",
              top: "-10px",
              right: "-14px",
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "red",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              border: "2px solid #fff",
            }}
          >
            ✕
          </span>
        )}
      </div>
    </div>
  );
}

export default function Unit8_Page6_Q3() {
  const [imageAnswers, setImageAnswers] = useState({});
  const [activeNumber, setActiveNumber] = useState(null);
  const [showAns, setShowAns] = useState(false);
  const [lockedCardIds, setLockedCardIds] = useState([]);
  const [wrongCardIds, setWrongCardIds] = useState([]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const usedNumbers = useMemo(
    () => Object.values(imageAnswers),
    [imageAnswers],
  );

  const placeNumber = (numberId, targetId) => {
    const number = Number(numberId);
    const cardId = Number(String(targetId).replace("card-", ""));
    if (showAns || lockedCardIds.includes(cardId)) return;
    setImageAnswers((previous) => {
      const updated = { ...previous };
      Object.keys(updated).forEach((key) => {
        if (updated[key] === number) delete updated[key];
      });
      updated[cardId] = number;
      return updated;
    });
    setWrongCardIds((previous) => previous.filter((id) => id !== cardId));
  };
  const keyboard = useUnit4TabDrag({
    itemIds: DRAG_NUMBERS.map(String),
    targetIds: IMAGE_CARDS.map((card) => `card-${card.id}`),
    isItemDisabled: (id) => usedNumbers.includes(Number(id)) || showAns,
    isTargetDisabled: (id) =>
      lockedCardIds.includes(Number(String(id).replace("card-", ""))) ||
      showAns,
    onPlace: placeNumber,
  });

  const removeNumber = (cardId) => {
    if (showAns || lockedCardIds.includes(cardId)) return;
    const removed = imageAnswers[cardId];
    setImageAnswers((previous) => {
      const updated = { ...previous };
      delete updated[cardId];
      return updated;
    });
    setWrongCardIds((previous) => previous.filter((id) => id !== cardId));
    if (removed) keyboard.focusItem(String(removed));
  };
  const checkAnswers = () => {
    if (showAns || lockedCardIds.length === IMAGE_CARDS.length) return;
    if (!IMAGE_CARDS.every((card) => imageAnswers[card.id])) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const correctIds = IMAGE_CARDS.flatMap((card) =>
      imageAnswers[card.id] === card.correctNumber ? [card.id] : [],
    );
    const wrongIds = IMAGE_CARDS.flatMap((card) =>
      imageAnswers[card.id] !== card.correctNumber ? [card.id] : [],
    );
    setLockedCardIds(correctIds);
    setWrongCardIds(wrongIds);
    const score = correctIds.length;
    if (score === IMAGE_CARDS.length)
      ValidationAlert.success(`Score: ${score} / ${IMAGE_CARDS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${IMAGE_CARDS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${IMAGE_CARDS.length}`);
  };
  const showAnswers = () => {
    setImageAnswers(
      Object.fromEntries(
        IMAGE_CARDS.map((card) => [card.id, card.correctNumber]),
      ),
    );
    setLockedCardIds(IMAGE_CARDS.map((card) => card.id));
    setWrongCardIds([]);
    setShowAns(true);
    setActiveNumber(null);
    keyboard.cancel();
    stopAudio();
  };
  const reset = () => {
    setImageAnswers({});
    setLockedCardIds([]);
    setWrongCardIds([]);
    setShowAns(false);
    setActiveNumber(null);
    keyboard.cancel();
    stopAudio();
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => setActiveNumber(Number(event.active.id))}
      onDragEnd={(event) => {
        if (event.over) placeNumber(event.active.id, event.over.id);
        setActiveNumber(null);
      }}
      onDragCancel={() => setActiveNumber(null)}
    >
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: 30 }}>
          <ExerciseHeader
            sectionLetter="F"
            title="Read and number the pictures."
            subTitle="Read one sentence at a time, then place its number on the picture that matches it."
          />
          <div
            className="w-full"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            {DRAG_NUMBERS.map((number) => (
              <NumberTile
                key={number}
                number={number}
                used={usedNumbers.includes(number)}
                showAns={showAns}
                register={keyboard.registerItem}
                pick={() => keyboard.pickItem(String(number))}
              />
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,minmax(0,1fr))",
              gap: 18,
              width: "88%",
              margin: "0 auto",
            }}
          >
            {IMAGE_CARDS.map((item) => {
              const preview =
                keyboard.keyboardTargetId === `card-${item.id}`
                  ? Number(keyboard.keyboardItemId)
                  : null;
              const value = imageAnswers[item.id];
              const locked = lockedCardIds.includes(item.id) || showAns;
              return (
                <PictureCard
                  key={item.id}
                  item={item}
                  value={value}
                  preview={preview}
                  wrong={wrongCardIds.includes(item.id)}
                  locked={locked}
                  register={keyboard.registerTarget}
                  onRemove={removeNumber}
                  onKeyDown={(event) => {
                    if (
                      !keyboard.keyboardItemId &&
                      value &&
                      !locked &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      removeNumber(item.id);
                      return;
                    }
                    keyboard.handleTargetKeyDown(event, `card-${item.id}`);
                  }}
                />
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 25,
              width: "88%",
              margin: "0 auto",
            }}
          >
            {SENTENCES.map((item) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                className="unit4-audio-control unit4-interactive"
                onClick={() => playAudio(`sentence-${item.id}`, item.audio)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio(`sentence-${item.id}`, item.audio);
                  }
                }}
                style={{ display: "flex", gap: 16, fontSize: 18 }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `sentence-${item.id}`}
                />
                <strong>{item.id}.</strong>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <Button
            handleShowAnswer={showAnswers}
            handleStartAgain={reset}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
      <DragOverlay>
        {activeNumber ? (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#f29a1f",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            {activeNumber}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
