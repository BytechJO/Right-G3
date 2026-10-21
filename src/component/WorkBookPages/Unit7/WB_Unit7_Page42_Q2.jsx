import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useUnit4TabDrag from "../../StudentPages/unit4/useUnit4TabDrag";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import bagAudio from "../../../assets/audio/WorkBook/unit7/Page 42 - Exercise H/Item_001_The_bag.mp3";
import bedAudio from "../../../assets/audio/WorkBook/unit7/Page 42 - Exercise H/Item_002_is_on_the_bed.mp3";
import guitarAudio from "../../../assets/audio/WorkBook/unit7/Page 42 - Exercise H/Item_003_The_guitar.mp3";
import chairAudio from "../../../assets/audio/WorkBook/unit7/Page 42 - Exercise H/Item_004_is_next_to_the_chair.mp3";
import catAudio from "../../../assets/audio/WorkBook/unit7/Page 42 - Exercise H/Item_005_The_cat.mp3";
import roomImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 42/SVG/2.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "red";
const ANSWER_COLOR = "#000000ff";
const LINE_COLOR = "#2f2f2f";

const DRAG_ITEMS = [
  { id: "da", value: "a" },
  { id: "db", value: "b" },
  { id: "dc", value: "c" },
  { id: "dd", value: "d" },
  { id: "de", value: "e" },
  { id: "df", value: "f" },
  { id: "dg", value: "g" },
  { id: "dh", value: "h" },
];

const LEFT_ITEMS = [
  { id: 1, text: "The bag", audio: bagAudio },
  { id: 2, text: "The guitar", audio: guitarAudio },
  { id: 3, text: "The cat", audio: catAudio },
  { id: 4, text: "The game" },
  { id: 5, text: "The shirt" },
  { id: 6, text: "The doll" },
  { id: 7, text: "The teddy bear" },
  { id: 8, text: "The table lamp" },
];

const RIGHT_ITEMS = [
  { id: "a", text: "is on the bed.", audio: bedAudio },
  { id: "b", text: "is next to the chair.", audio: chairAudio },
  { id: "c", text: "is next to the bed." },
  { id: "d", text: "is on the chair." },
  { id: "e", text: "is under the bed." },
  { id: "f", text: "is on the table." },
  { id: "g", text: "is in front of the pillow." },
  { id: "h", text: "is under the table." },
];

const CORRECT = {
  1: "d",
  2: "e",
  3: "h",
  4: "f",
  5: "a",
  6: "g",
  7: "b",
  8: "c",
};
const DraggableItem = ({ item, isUsed, showAns, register, pick }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: item.id,
    disabled: isUsed || showAns,
  });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(item.id, element);
      }}
      {...listeners}
      {...attributes}
      tabIndex={isUsed || showAns ? -1 : 0}
      role="button"
      aria-disabled={isUsed || showAns}
      aria-label={`Letter ${item.value}, press Enter or Space to pick up`}
      onKeyDown={(event) => {
        if (
          !isUsed &&
          !showAns &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          event.stopPropagation();
          pick();
        }
      }}
      style={{
        // ...style,
        width: "45px",
        height: "45px",
        borderRadius: "10px",
        border: `1px solid ${isUsed ? "#d9d9d9" : BORDER_COLOR}`,
        backgroundColor: isUsed ? "#eeeeee" : "",
        color: isUsed ? "#aaa" : "#222",
        cursor: isUsed || showAns ? "not-allowed" : "grab",
        opacity: isUsed ? 0.55 : 1,
        fontSize: "20px",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        touchAction: "none",
        justifyContent: "center",
        boxShadow: isUsed ? "none" : "0 2px 6px rgba(0,0,0,0.07)",
      }}
    >
      {item.value}
    </div>
  );
};

const DropZone = ({
  boxKey,
  value,
  preview,
  wrong,
  showAns,
  onRemove,
  register,
  onKeyDown,
}) => {
  const { setNodeRef } = useDroppable({
    id: boxKey,
  });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(boxKey, element);
      }}
      onClick={() => value && !showAns && onRemove(boxKey)}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={!showAns && (Boolean(value) || Boolean(preview)) ? 0 : -1}
      aria-disabled={showAns}
      className={`unit4-drop-target unit4-interactive ${preview && !value ? "unit4-keyboard-preview" : ""}`}
      style={{
        position: "relative",
        width: "45px",
        height: "45px",
        borderRadius: "8px",
        border: `1px solid ${BORDER_COLOR}`,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: value && !showAns ? "pointer" : "default",
      }}
    >
      {(value || preview) && (
        <span
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: value ? "#111" : "#777",
          }}
        >
          {value || preview}
        </span>
      )}

      {wrong && (
        <div
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
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
};
export default function WB_LookReadMatch_PageH() {
  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const usedIds = Object.values(answers)
    .filter(Boolean)
    .map((e) => e.dragId);

  const place = (dragId, boxKey) => {
    const itemId = Number(String(boxKey).replace("a-", ""));
    if (showAns || lockedIds.includes(itemId)) return;
    const dragged = DRAG_ITEMS.find((item) => item.id === dragId);
    if (!dragged) return;
    setAnswers((previous) => {
      const updated = { ...previous };
      Object.keys(updated).forEach((key) => {
        if (updated[key]?.dragId === dragged.id) delete updated[key];
      });
      updated[boxKey] = { dragId: dragged.id, value: dragged.value };
      return updated;
    });
    setWrongIds((previous) => previous.filter((id) => id !== itemId));
  };
  const keyboard = useUnit4TabDrag({
    itemIds: DRAG_ITEMS.map((item) => item.id),
    targetIds: LEFT_ITEMS.map((item) => `a-${item.id}`),
    isItemDisabled: (id) => usedIds.includes(id) || showAns,
    isTargetDisabled: (id) =>
      lockedIds.includes(Number(String(id).replace("a-", ""))) || showAns,
    onPlace: place,
  });
  const handleRemove = (boxKey) => {
    const itemId = Number(String(boxKey).replace("a-", ""));
    if (showAns || lockedIds.includes(itemId)) return;
    const removed = answers[boxKey]?.dragId;
    setAnswers((prev) => {
      const u = { ...prev };
      delete u[boxKey];
      return u;
    });
    setWrongIds((previous) => previous.filter((id) => id !== itemId));
    if (removed) keyboard.focusItem(removed);
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === LEFT_ITEMS.length) return;
    const allAnswered = LEFT_ITEMS.every((i) => answers[`a-${i.id}`]?.value);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const correctIds = LEFT_ITEMS.flatMap((i) =>
      answers[`a-${i.id}`]?.value === CORRECT[i.id] ? [i.id] : [],
    );
    const incorrectIds = LEFT_ITEMS.flatMap((i) =>
      answers[`a-${i.id}`]?.value !== CORRECT[i.id] ? [i.id] : [],
    );
    const score = correctIds.length;
    setShowResults(true);
    setLockedIds(correctIds);
    setWrongIds(incorrectIds);
    const total = LEFT_ITEMS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    LEFT_ITEMS.forEach((i) => {
      const correctVal = CORRECT[i.id];
      const d = DRAG_ITEMS.find((d) => d.value === correctVal);
      filled[`a-${i.id}`] = { dragId: d?.id, value: correctVal };
    });
    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(LEFT_ITEMS.map((item) => item.id));
    setWrongIds([]);
    keyboard.cancel();
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    keyboard.cancel();
    stopAudio();
  };

  const isWrong = (id) => wrongIds.includes(id);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => {
        const dragged = DRAG_ITEMS.find((d) => d.id === event.active.id);
        setActiveItem(dragged);
      }}
      onDragEnd={(event) => {
        const { active, over } = event;

        if (!over || showAns) {
          setActiveItem(null);
          return;
        }

        place(String(active.id), String(over.id));
        setActiveItem(null);
      }}
    >
      <div className="main-container-component">
        <div
          className="div-forall"
          style={{
            gap: "clamp(18px,2.5vw,28px)",
          }}
        >
          {/* Title */}
          <ExerciseHeader
            sectionLetter="H"
            title="Look, read, and match."
            subTitle="Read each bedroom object to its location description first, then connect it to the matching picture or answer one pair at a time."
          />

          {/* ── الصورة ── */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // maxWidth: "520px",
              // margin: "0 auto",
              // border: `2px solid ${BORDER_COLOR}`,
              // borderRadius: "clamp(12px,1.4vw,18px)",
              // overflow: "hidden",
              // background: "#f7f7f7",
            }}
          >
            <img
              src={roomImg}
              alt="A bedroom containing a bag, guitar, cat, game, shirt, doll, teddy bear, and table lamp"
              style={{
                width: "auto",
                height: "300px",
                display: "block",
                objectFit: "contain",
              }}
            />
          </div>

          {/* ── Word Bank: الحروف a-h ── */}
          <div
            className="w-full"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {DRAG_ITEMS.map((item) => {
              const isUsed = usedIds.includes(item.id);
              return (
                <DraggableItem
                  key={item.id}
                  item={item}
                  isUsed={isUsed}
                  showAns={showAns}
                  register={keyboard.registerItem}
                  pick={() => keyboard.pickItem(item.id)}
                />
              );
            })}
          </div>

          {/* ── القائمتان ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(16px,3vw,40px)",
              width: "100%",
              alignItems: "start",
            }}
          >
            {/* يسار: الأرقام مع drop zone */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(6px,1vw,16px)",
              }}
            >
              {LEFT_ITEMS.map((item) => {
                const boxKey = `a-${item.id}`;
                const value = answers[boxKey]?.value || "";
                const wrong = isWrong(item.id);

                return (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(8px,1vw,14px)",
                    }}
                  >
                    {/* Drop zone — الحرف */}
                    <DropZone
                      boxKey={boxKey}
                      value={value}
                      preview={
                        keyboard.keyboardTargetId === boxKey
                          ? keyboard.keyboardItemId?.replace("d", "")
                          : ""
                      }
                      wrong={wrong}
                      showAns={showAns || lockedIds.includes(item.id)}
                      onRemove={handleRemove}
                      register={keyboard.registerTarget}
                      onKeyDown={(event) => {
                        if (
                          !keyboard.keyboardItemId &&
                          value &&
                          !lockedIds.includes(item.id) &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          handleRemove(boxKey);
                          return;
                        }
                        keyboard.handleTargetKeyDown(event, boxKey);
                      }}
                    />

                    {/* رقم + نص */}
                    <span
                      style={{
                        fontSize: "clamp(14px,1.6vw,20px)",
                        fontWeight: 700,
                        color: "#111",
                        flexShrink: 0,
                      }}
                    >
                      {item.id}
                    </span>
                    <span
                      role={item.audio ? "button" : undefined}
                      tabIndex={item.audio ? 0 : -1}
                      className={
                        item.audio
                          ? "unit4-audio-control unit4-interactive"
                          : undefined
                      }
                      onClick={() =>
                        item.audio && playAudio(`left-${item.id}`, item.audio)
                      }
                      onKeyDown={(event) => {
                        if (
                          item.audio &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          playAudio(`left-${item.id}`, item.audio);
                        }
                      }}
                      style={{
                        fontSize: "18px",
                        // fontWeight: 500,
                        color: "#111",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `left-${item.id}`}
                      />
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* يمين: الحروف + النصوص */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(6px,1vw,10px)",
              }}
            >
              {RIGHT_ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(8px,1vw,14px)",
                    minHeight: "clamp(32px,4vw,48px)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(14px,1.6vw,20px)",
                      fontWeight: 700,
                      color: "#111",
                      flexShrink: 0,
                    }}
                  >
                    {item.id}
                  </span>
                  <span
                    role={item.audio ? "button" : undefined}
                    tabIndex={item.audio ? 0 : -1}
                    className={
                      item.audio
                        ? "unit4-audio-control unit4-interactive"
                        : undefined
                    }
                    onClick={() =>
                      item.audio && playAudio(`right-${item.id}`, item.audio)
                    }
                    onKeyDown={(event) => {
                      if (
                        item.audio &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        playAudio(`right-${item.id}`, item.audio);
                      }
                    }}
                    style={{
                      fontSize: "18px",
                      // fontWeight: 500,
                      color: "#111",
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `right-${item.id}`}
                    />
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
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
              handleStartAgain={handleStartAgain}
            />
          </div>
        </div>

        <DragOverlay>
          {activeItem ? (
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "10px",
                border: `1px solid ${BORDER_COLOR}`,
                // backgroundColor: "#ffca94",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 700,
                color: "#222",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                cursor: "grabbing",
              }}
            >
              {activeItem.value}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
