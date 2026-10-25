import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4TabDrag from "../../StudentPages/unit4/useUnit4TabDrag";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
// استبدلي كل imports تبعون drag العادي بهاد
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";

import { useDraggable, useDroppable } from "@dnd-kit/core";

import girlImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/1.svg";
import boy1Img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/2.svg";
import boy2Img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/3.svg";
import img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/11.svg";
import sentence1Audio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise C/Item_001_She_was_in_the_swimming_pool_this_morning.mp3";
import sentence2Audio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise C/Item_002_She_is_in_the_post_office_now.mp3";
import sentence3Audio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise C/Item_003_He_is_at_the_gym_now.mp3";
import sentence4Audio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise C/Item_004_He_was_at_the_bus_stop_this_morning.mp3";
import sentence5Audio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise C/Item_005_He_was_at_the_bakery_this_morning.mp3";
import sentence6Audio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise C/Item_006_He_is_on_the_playground_now.mp3";
import swimmingAudio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise C/Item_007_at_the_swimming_pool.mp3";
import busStopAudio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise C/Item_008_at_the_bus_stop.mp3";
import bakeryAudio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise C/Item_009_at_the_bakery.mp3";
import postOfficeAudio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise C/Item_010_at_the_post_office.mp3";
import gymAudio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise C/Item_011_at_the_gym.mp3";
import playgroundAudio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise C/Item_012_on_the_playground.mp3";
const PEOPLE = [
  {
    id: 1,
    img: girlImg,
    lines: [
      "She was in the swimming pool this morning.",
      "She is in the post office now.",
    ],
    alt: "A girl shown in two place-and-time scenes",
    audios: [sentence1Audio, sentence2Audio],
  },
  {
    id: 2,
    img: boy1Img,
    lines: ["He is at the gym now.", "He was at the bus stop this morning."],
    alt: "A boy shown in two place-and-time scenes",
    audios: [sentence3Audio, sentence4Audio],
  },
  {
    id: 3,
    img: boy2Img,
    lines: [
      "He was at the bakery this morning.",
      "He is on the playground now.",
    ],
    alt: "A boy shown in bakery and playground scenes",
    audios: [sentence5Audio, sentence6Audio],
  },
];

const DRAG_ITEMS = [
  "at the swimming pool",
  "at the bus stop",
  "at the bakery",
  "at the post office",
  "at the gym",
  "on the playground",
];
const ITEM_AUDIO = {
  "at the swimming pool": swimmingAudio,
  "at the bus stop": busStopAudio,
  "at the bakery": bakeryAudio,
  "at the post office": postOfficeAudio,
  "at the gym": gymAudio,
  "on the playground": playgroundAudio,
};

const CORRECT_ANSWERS = {
  "morning-1": "at the swimming pool",
  "morning-2": "at the bus stop",
  "morning-3": "at the bakery",
  "now-1": "at the post office",
  "now-2": "at the gym",
  "now-3": "on the playground",
};

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const DraggableItem = ({ item, disabled, register, pick, play, active }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: item,
    disabled,
  });

  const style = {
    // transform: CSS.Translate.toString(transform),
    // transition,
    padding: "clamp(6px,0.8vw,8px) clamp(10px,1.2vw,14px)",
    borderRadius: "10px",
    border: "1px solid #f39b42",
    fontSize: "clamp(12px,1.4vw,15px)",
    fontWeight: "600",
    cursor: disabled ? "not-allowed" : "grab",
    opacity: disabled ? 0.5 : 1,
    userSelect: "none",
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    background: "#fff",
    touchAction: "none",
  };

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(item, element);
      }}
      style={style}
      {...listeners}
      {...attributes}
      className="unit4-audio-control unit4-interactive"
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={`${item}, press Enter or Space to pick up`}
      onClick={() => !disabled && play()}
      onKeyDown={(event) => {
        if (!disabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          event.stopPropagation();
          play();
          pick();
        }
      }}
    >
      {item}
      <Unit4PlayingAudioIcon active={active} />
    </div>
  );
};

const DropCell = ({
  cellKey,
  value,
  preview,
  wrong,
  onRemove,
  locked,
  register,
  onKeyDown,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: cellKey,
  });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(cellKey, element);
      }}
      role="button"
      tabIndex={!locked && (value || preview) ? 0 : -1}
      aria-disabled={locked}
      onClick={() => value && !locked && onRemove(cellKey)}
      onKeyDown={onKeyDown}
      className={`unit4-drop-target unit4-interactive ${preview && !value ? "unit4-keyboard-preview" : ""}`}
      style={{
        position: "relative",
        height: "clamp(48px,6vw,68px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "6px 10px",
        fontSize: "clamp(12px,1.5vw,18px)",
        lineHeight: "1.3",
        boxSizing: "border-box",
        transition: "all 0.2s ease",
        background: isOver ? "rgba(243,155,66,0.12)" : "transparent",
        // border: isOver ? "2px dashed #f39b42" : "2px dashed transparent",

        transform: isOver ? "scale(1.03)" : "scale(1)",

        boxShadow: isOver ? "0 0 10px rgba(243,155,66,0.35)" : "none",
      }}
    >
      {(value || preview) && (
        <div
          style={{
            cursor: value && !locked ? "pointer" : "default",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {value || preview}
        </div>
      )}

      {wrong && (
        <div
          style={{
            position: "absolute",
            top: "-7px",
            right: "-7px",
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

const SentenceImageAudio = ({ img, people, activeAudioKey, playAudio }) => {
  const positions = [
    [8, 17],
    [45, 54],
    [82, 91],
  ];

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        height: "250px",
        maxWidth: "100%",
      }}
    >
      <img
        src={img}
        alt="Three people with sentences about past and current places"
        style={{
          height: "100%",
          width: "auto",
          maxWidth: "100%",
          display: "block",
        }}
      />

      {people.flatMap((person, personIndex) =>
        person.lines.map((sentence, lineIndex) => {
          const audioKey = `sentence-${person.id}-${lineIndex}`;
          const audio = person.audios[lineIndex];

          return (
            <button
              key={audioKey}
              type="button"
              className="unit4-audio-control unit4-interactive"
              aria-label={`Play: ${sentence}`}
              onClick={() => playAudio(audioKey, audio)}
              style={{
                position: "absolute",
                top: `${positions[personIndex][lineIndex]}%`,
                left: "20%",
                width: "78%",
                height: "9%",
                border: "none",
                background: "transparent",
                borderRadius: "4px",
                cursor: "pointer",
                padding: 0,
                textAlign: "left",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: "0",
                  pointerEvents: "none",
                }}
              >
                <Unit4PlayingAudioIcon active={activeAudioKey === audioKey} />
              </span>
            </button>
          );
        }),
      )}
    </div>
  );
};

export default function WB_Unit8_Page52_QC() {
  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);

  const usedValues = Object.values(answers);

  const [activeItem, setActiveItem] = useState(null);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 120,
        tolerance: 5,
      },
    }),
  );

  const place = (draggedValue, cellKey) => {
    if (showAns || lockedIds.includes(cellKey)) return;
    setAnswers((previous) => {
      const updated = { ...previous };
      Object.keys(updated).forEach((key) => {
        if (updated[key] === draggedValue) delete updated[key];
      });
      updated[cellKey] = draggedValue;
      return updated;
    });
    setWrongIds((previous) => previous.filter((id) => id !== cellKey));
  };
  const keyboard = useUnit4TabDrag({
    itemIds: DRAG_ITEMS,
    targetIds: Object.keys(CORRECT_ANSWERS),
    isItemDisabled: (id) => usedValues.includes(id) || showAns,
    isTargetDisabled: (id) => lockedIds.includes(id) || showAns,
    onPick: (id) => playAudio(`bank-${id}`, ITEM_AUDIO[id]),
    onPlace: place,
  });
  const handleDragEnd = ({ active, over }) => {
    if (over) place(String(active.id), String(over.id));
    setActiveItem(null);
  };
  /* ─── Button handlers ─── */
  const handleCheck = () => {
    if (showAns || lockedIds.length === Object.keys(CORRECT_ANSWERS).length)
      return;
    const allFilled = Object.keys(CORRECT_ANSWERS).every((key) => answers[key]);
    if (!allFilled) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    Object.keys(CORRECT_ANSWERS).forEach((key) => {
      if (answers[key] === CORRECT_ANSWERS[key]) score++;
    });
    setShowResults(true);
    const keys = Object.keys(CORRECT_ANSWERS);
    setLockedIds((prev) => [
      ...new Set([
        ...prev,
        ...keys.filter((key) => answers[key] === CORRECT_ANSWERS[key]),
      ]),
    ]);
    setWrongIds(keys.filter((key) => answers[key] !== CORRECT_ANSWERS[key]));
    const total = Object.keys(CORRECT_ANSWERS).length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    setAnswers(CORRECT_ANSWERS);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(Object.keys(CORRECT_ANSWERS));
    setWrongIds([]);
    keyboard.cancel();
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    keyboard.cancel();
    stopAudio();
  };

  const isWrongCell = (cellKey) => {
    return wrongIds.includes(cellKey);
  };

  /* ─── Drop cell renderer ─── */
  const renderDropCell = (cellKey) => {
    const value = answers[cellKey];
    const wrong = isWrongCell(cellKey);

    return (
      <DropCell
        cellKey={cellKey}
        value={value}
        preview={
          keyboard.keyboardTargetId === cellKey ? keyboard.keyboardItemId : ""
        }
        wrong={wrong}
        onRemove={handleRemoveFromCell}
        locked={showAns || lockedIds.includes(cellKey)}
        register={keyboard.registerTarget}
        onKeyDown={(event) => {
          if (
            !keyboard.keyboardItemId &&
            value &&
            !lockedIds.includes(cellKey) &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            handleRemoveFromCell(cellKey);
            return;
          }
          keyboard.handleTargetKeyDown(event, cellKey);
        }}
      />
    );
  };

  const handleRemoveFromCell = (cellKey) => {
    if (showAns || lockedIds.includes(cellKey)) return;

    const removed = answers[cellKey];
    setAnswers((previous) => {
      const updated = { ...previous };
      delete updated[cellKey];
      return updated;
    });
    setWrongIds((previous) => previous.filter((id) => id !== cellKey));
    if (removed) keyboard.focusItem(removed);
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        setActiveItem(event.active.id);
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveItem(null)}
    >
      <div className="main-container-component">
        <div
          className="div-forall"
          style={{
            gap: "30px",
          }}
        >
          {/* Title */}
          <ExerciseHeader
            sectionLetter="C"
            title="Read and write in the chart."
            subTitle="Say each current and past places in the correct chart cell aloud, identify its sound or category, then place it in the correct chart group."
          />

          {/* Sentences */}

          <div className="flex justify-start">
            <SentenceImageAudio
              img={img}
              people={PEOPLE}
              activeAudioKey={activeAudioKey}
              playAudio={playAudio}
            />
          </div>

          {/* Drag bank */}
          <div
            className="w-full"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(6px,1vw,10px)",
              flexWrap: "wrap",
              marginBottom: "4px",
            }}
          >
            {DRAG_ITEMS.map((item, index) => {
              const disabled = usedValues.includes(item);

              return (
                <DraggableItem
                  key={`${item}-${index}`}
                  item={item}
                  disabled={disabled || showAns}
                  register={keyboard.registerItem}
                  pick={() => keyboard.pickItem(item)}
                  play={() => playAudio(`bank-${item}`, ITEM_AUDIO[item])}
                  active={activeAudioKey === `bank-${item}`}
                />
              );
            })}
          </div>

          {/* Table */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              // overflowX: "auto",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "760px",
                minWidth: "320px",
                border: `1px solid ${BORDER_COLOR}`,
                borderRadius: "clamp(10px,1.5vw,18px)",
                // overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "clamp(70px,12vw,130px) 1fr 1fr 1fr",
                  borderBottom: `1px solid ${BORDER_COLOR}`,
                }}
              >
                <div
                  style={{
                    minHeight: "clamp(60px,8vw,86px)",
                    borderRight: `1px solid ${BORDER_COLOR}`,
                  }}
                />
                {PEOPLE.map((person, index) => (
                  <div
                    key={person.id}
                    style={{
                      minHeight: "clamp(60px,8vw,86px)",
                      borderRight:
                        index !== PEOPLE.length - 1
                          ? `1px solid ${BORDER_COLOR}`
                          : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={person.img}
                      alt={person.alt}
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Morning row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "clamp(70px,12vw,130px) 1fr 1fr 1fr",
                  borderBottom: `1px solid ${BORDER_COLOR}`,
                }}
              >
                <div
                  style={{
                    minHeight: "clamp(56px,7vw,82px)",
                    borderRight: `1px solid ${BORDER_COLOR}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(14px,1.8vw,20px)",
                    color: "#222",
                    fontWeight: 600,
                  }}
                >
                  Morning
                </div>
                <div style={{ borderRight: `1px solid ${BORDER_COLOR}` }}>
                  {renderDropCell("morning-1")}
                </div>
                <div style={{ borderRight: `1px solid ${BORDER_COLOR}` }}>
                  {renderDropCell("morning-2")}
                </div>
                <div>{renderDropCell("morning-3")}</div>
              </div>

              {/* Now row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "clamp(70px,12vw,130px) 1fr 1fr 1fr",
                }}
              >
                <div
                  style={{
                    minHeight: "clamp(56px,7vw,82px)",
                    borderRight: `1px solid ${BORDER_COLOR}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(14px,1.8vw,20px)",
                    color: "#222",
                    fontWeight: 600,
                  }}
                >
                  Now
                </div>
                <div style={{ borderRight: `1px solid ${BORDER_COLOR}` }}>
                  {renderDropCell("now-1")}
                </div>
                <div style={{ borderRight: `1px solid ${BORDER_COLOR}` }}>
                  {renderDropCell("now-2")}
                </div>
                <div>{renderDropCell("now-3")}</div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "clamp(4px,0.8vw,8px)",
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
        {activeItem ? (
          <div
            style={{
              padding: "8px 14px",
              borderRadius: "10px",
              // background: "#f39b42",
              border: "1px solid #f39b42",
              // color: "#fff",
              fontSize: "15px",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            {activeItem}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
