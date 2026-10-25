import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4TabDrag from "../../StudentPages/unit4/useUnit4TabDrag";
import "../../StudentPages/unit4/unit4Interactions.css";
import bedroomAudio from "../../../assets/audio/WorkBook/unit5/Page 27 - Exercise B/Item_001_bedroom.mp3";
import basementAudio from "../../../assets/audio/WorkBook/unit5/Page 27 - Exercise B/Item_002_basement.mp3";
import kitchenAudio from "../../../assets/audio/WorkBook/unit5/Page 27 - Exercise B/Item_003_kitchen.mp3";
import garageAudio from "../../../assets/audio/WorkBook/unit5/Page 27 - Exercise B/Item_004_garage.mp3";
import officeAudio from "../../../assets/audio/WorkBook/unit5/Page 27 - Exercise B/Item_005_office.mp3";
import livingRoomAudio from "../../../assets/audio/WorkBook/unit5/Page 27 - Exercise B/Item_006_living_room.mp3";
import diningRoomAudio from "../../../assets/audio/WorkBook/unit5/Page 27 - Exercise B/Item_007_dining_room.mp3";
import bathroomAudio from "../../../assets/audio/WorkBook/unit5/Page 27 - Exercise B/Item_008_bathroom.mp3";

import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import imgHouse from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 27/B1.svg";

const DRAG_ITEMS = [
  { id: "act1", value: "bedroom" },
  { id: "act2", value: "basement" },
  { id: "act3", value: "garage" },
  { id: "act4", value: "kitchen" },
  { id: "act5", value: "living room" },
  { id: "act6", value: "dining room" },
  { id: "act7", value: "office" },
  { id: "act8", value: "bathroom" },
];

const ITEMS = [
  { id: 1, correct: "bedroom" },
  { id: 2, correct: "basement" },
  { id: 3, correct: "garage" },
  { id: 4, correct: "kitchen" },
  { id: 5, correct: "living room" },
  { id: 6, correct: "dining room" },
  { id: 7, correct: "office" },
  { id: 8, correct: "bathroom" },
];
const ITEM_AUDIO = {
  act1: bedroomAudio,
  act2: basementAudio,
  act3: garageAudio,
  act4: kitchenAudio,
  act5: livingRoomAudio,
  act6: diningRoomAudio,
  act7: officeAudio,
  act8: bathroomAudio,
};

export default function WB_Unit5_Page27_Q2() {
  const [answers, setAnswers] = useState({});

  const [showAns, setShowAns] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const audioRef = useRef(null);
  const activeAudioIconRef = useRef(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }
    if (activeAudioIconRef.current) {
      activeAudioIconRef.current.hidden = true;
      activeAudioIconRef.current = null;
    }
  };

  const playAudio = (key, src) => {
    if (!src) return;
    stopAudio();

    const audio = new Audio(src);
    audioRef.current = audio;
    window.requestAnimationFrame(() => {
      if (audioRef.current !== audio) return;
      const icon = document.querySelector(`[data-audio-key="${key}"]`);
      if (icon) {
        icon.hidden = false;
        activeAudioIconRef.current = icon;
      }
    });
    audio.onended = () => {
      if (audioRef.current !== audio) return;
      if (activeAudioIconRef.current) {
        activeAudioIconRef.current.hidden = true;
        activeAudioIconRef.current = null;
      }
      audioRef.current = null;
    };
    audio.onerror = audio.onended;
    audio.play().catch(audio.onended);
  };

  useEffect(() => () => stopAudio(), []);

  const usedDragIds = Object.entries(answers)
    .filter(([, entry]) => entry)
    .map(([, entry]) => entry.dragId);

  const tabDrag = useUnit4TabDrag({
    itemIds: DRAG_ITEMS.map((item) => item.id),
    targetIds: ITEMS.map((item) => `a-${item.id}`),
    isItemDisabled: (id) => usedDragIds.includes(id) || showAns,
    isTargetDisabled: (id) =>
      lockedIds.includes(Number(String(id).replace("a-", ""))) || showAns,
    onPick: (id) => playAudio(`bank-${id}`, ITEM_AUDIO[id]),
    onPlace: (dragId, boxKey) => {
      const item = DRAG_ITEMS.find((entry) => entry.id === dragId);
      if (item) applyDrop(boxKey, item);
    },
  });

  const applyDrop = (boxKey, item) => {
    const targetItem = ITEMS.find((q) => `a-${q.id}` === boxKey);
    if (!targetItem || lockedIds.includes(targetItem.id) || showAns) return;

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
    setWrongIds((prev) => prev.filter((id) => id !== targetItem.id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    const dragged = DRAG_ITEMS.find((d) => d.id === active.id);
    if (!dragged) return;

    applyDrop(over.id, dragged);
  };

  const handleRemoveAnswer = (boxKey) => {
    const targetItem = ITEMS.find((q) => `a-${q.id}` === boxKey);
    if (!targetItem || lockedIds.includes(targetItem.id) || showAns) return;

    const removedId = answers[boxKey]?.dragId;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[boxKey];
      return updated;
    });

    setWrongIds((prev) => prev.filter((id) => id !== targetItem.id));
    if (removedId) tabDrag.focusItem(removedId);
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[`a-${item.id}`]?.value);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[`a-${item.id}`]?.value === item.correct) {
        score++;
      }
    });

    setLockedIds((prev) => [
      ...new Set([
        ...prev,
        ...ITEMS.filter(
          (item) => answers[`a-${item.id}`]?.value === item.correct,
        ).map((item) => item.id),
      ]),
    ]);
    setWrongIds(
      ITEMS.filter(
        (item) => answers[`a-${item.id}`]?.value !== item.correct,
      ).map((item) => item.id),
    );

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const filled = {};

    ITEMS.forEach((item) => {
      const matched = DRAG_ITEMS.find((d) => d.value === item.correct);
      filled[`a-${item.id}`] = {
        dragId: matched?.id ?? `act-${item.id}`,
        value: item.correct,
      };
    });

    setAnswers(filled);
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
    tabDrag.cancel();
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setShowAns(false);
    setActiveItem(null);
    setLockedIds([]);
    setWrongIds([]);
    tabDrag.cancel();
    stopAudio();
  };

  const isWrong = (item) => {
    return wrongIds.includes(item.id);
  };

  // 🔥 Draggable
  const DraggableChip = ({ item, isUsed }) => {
    const pointerStart = useRef(null);
    const pointerMoved = useRef(false);
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id: item.id,
      disabled: isUsed || showAns,
    });

    return (
      <div
        ref={(element) => {
          setNodeRef(element);
          tabDrag.registerItem(item.id, element);
        }}
        {...listeners}
        {...attributes}
        role="button"
        tabIndex={0}
        aria-disabled={isUsed || showAns}
        aria-label={`${isUsed ? "Listen to" : "Pick"} ${item.value}`}
        onPointerDownCapture={(event) => {
          pointerStart.current = { x: event.clientX, y: event.clientY };
          pointerMoved.current = false;
        }}
        onPointerMoveCapture={(event) => {
          if (!pointerStart.current) return;
          pointerMoved.current =
            Math.hypot(
              event.clientX - pointerStart.current.x,
              event.clientY - pointerStart.current.y,
            ) > 5;
        }}
        onClick={(event) => {
          if (event.detail === 0) return;

          playAudio(`bank-${item.id}`, ITEM_AUDIO[item.id]);
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          if (!isUsed && !showAns) tabDrag.pickItem(item.id);
        }}
        className={`wb-house-chip unit4-audio-control unit4-interactive ${
          isUsed || showAns ? "wb-house-chip--used" : "wb-house-chip--active"
        }`}
        style={{
          opacity: isDragging ? 0.3 : 1,
          cursor: isUsed || showAns ? "pointer" : "grab",
        }}
      >
        <span
          data-audio-key={`bank-${item.id}`}
          className="unit4-playing-audio-icon"
          hidden
          aria-hidden="true"
        >
          <FaVolumeUp />
        </span>
        {item.value}
      </div>
    );
  };

  // 🔥 DropBox
  const DropBox = ({ item }) => {
    const boxKey = `a-${item.id}`;
    const { setNodeRef, isOver } = useDroppable({ id: boxKey });

    const value = answers[boxKey]?.value || "";
    const previewItem = DRAG_ITEMS.find(
      (entry) => entry.id === tabDrag.keyboardItemId,
    );
    const showKeyboardPreview =
      !!previewItem && tabDrag.keyboardTargetId === boxKey;
    const displayedValue = showKeyboardPreview ? previewItem.value : value;

    return (
      <div className="wb-house-line-wrap">
        <div
          ref={(element) => {
            setNodeRef(element);
            tabDrag.registerTarget(boxKey, element);
          }}
          onClick={() => handleRemoveAnswer(boxKey)}
          role="button"
          tabIndex={
            tabDrag.keyboardItemId != null ||
            (value && !lockedIds.includes(item.id))
              ? 0
              : -1
          }
          aria-disabled={lockedIds.includes(item.id) || showAns}
          aria-label={`Room ${item.id} answer slot${value ? `, ${value}` : ""}`}
          onKeyDown={(event) => {
            if (tabDrag.keyboardItemId != null)
              tabDrag.handleTargetKeyDown(event, boxKey);
            else if (
              (event.key === "Enter" || event.key === " ") &&
              value &&
              !lockedIds.includes(item.id)
            ) {
              event.preventDefault();
              handleRemoveAnswer(boxKey);
            }
          }}
          className={`wb-house-line ${
            item.fixed ? "wb-house-line--fixed" : ""
          }`}
          style={{
            cursor:
              item.fixed || showAns || lockedIds.includes(item.id)
                ? "default"
                : "pointer",
            // boxShadow: isOver
            //   ? "0 0 0 3px rgba(243,155,66,0.25)"
            //   : "none",
            borderBottom: isOver
              ? "1px solid rgba(255, 132, 8, 0.95)"
              : isWrong(item)
                ? "2px solid red"
                : "1px solid",
            backgroundColor:
              isOver ||
              (tabDrag.keyboardItemId != null &&
                tabDrag.keyboardTargetId === boxKey)
                ? "rgba(243, 155, 66, 0.18)"
                : "",
            transform: isOver ? "scale(1.02)" : "scale(1)",
            transition: "0.15s",
          }}
        >
          {displayedValue ? (
            <span
              className={`wb-house-answer ${
                showKeyboardPreview ? "unit4-keyboard-preview" : ""
              }`}
            >
              {displayedValue}
            </span>
          ) : (
            <span className="wb-house-placeholder"></span>
          )}
        </div>

        {isWrong(item) && <div className="wb-house-wrong">✕</div>}
      </div>
    );
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => {
        const item = DRAG_ITEMS.find((d) => d.id === e.active.id);
        setActiveItem(item);
      }}
      onDragEnd={handleDragEnd}
    >
      <style>{`
  .wb-house-wrap {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 8px 0 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .wb-house-title {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .wb-house-chips {
       width: 100%;
    display: grid;
    flex-wrap: wrap;
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .wb-house-chip {
    min-height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 5px 12px;
    border-radius: 15px;
    font-size: clamp(11px, 1.4vw, 18px);
    // font-weight: 500;
    user-select: none;
    box-sizing: border-box;
    transition: 0.2s ease;
    touch-action: none;
    word-break: break-word;
    // background: #ffd09b;
    color: #111;
    border: 1px solid #ee9a42;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }

  .wb-house-chip--used {
    background: #ececec;
    color: #b7b7b7;
    border-color: #dadada;
    box-shadow: none;
    opacity: 0.95;
    cursor: not-allowed;
  }

  .wb-house-chip--active {
    cursor: grab;
  }

  .wb-house-layout {
    display: grid;
    grid-template-columns: minmax(170px, 1fr) minmax(337px, 0.95fr) minmax(170px, 1fr);
    gap: 20px;
    align-items: center;
    width: 100%;
  }

  .wb-house-col {
    display: flex;
    flex-direction: column;
    gap: clamp(16px, 2vw, 26px);
    min-width: 0;
  }

  .wb-house-item {
    display: flex;
    gap: 12px;
    align-items: center;
    width: 100%;
  }

  .wb-house-num {
    font-size: clamp(14px, 1.7vw, 20px);
    font-weight: 500;
    line-height: 1;
    color: #1f1f1f;
  }

  .wb-house-line-wrap {
    position: relative;
    width: 100%;
  }

  .wb-house-line {
    width: 100%;
    min-height: 36px;
    border-bottom: 1px solid #2c2c2c;
    display: flex;
    align-items: center;
    padding: 0 4px 4px;
    box-sizing: border-box;
    user-select: none;
  }

  .wb-house-line--fixed {
    cursor: default !important;
  }

  .wb-house-answer {
    font-size: clamp(13px, 1.4vw, 18px);
    line-height: 1.1;
    color: #000000ff;
    font-weight: 500;
    word-break: break-word;
  }

  .wb-house-answer--fixed {
    color: #1f1f1f;
  }

  .wb-house-placeholder {
    display: block;
    width: 100%;
    min-height: 26px;
  }

  .wb-house-wrong {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 22px;
    height: 22px;
      border-radius: 50%;
    background-color: red;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    border: 2px solid #fff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.18);
  }

  .wb-house-image-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wb-house-image {
    display: block;
    width: 100%;
    max-width: clamp(340px, 42vw, 600px);
    height: auto;
    object-fit: contain;
  }

  .wb-house-buttons {
    display: flex;
    justify-content: center;
    margin-top: 4px;
  }

  @media (max-width: 980px) {
    .wb-house-layout {
      grid-template-columns: 1fr;
      gap: 22px;
    }

    .wb-house-image-wrap {
      order: -1;
    }

    .wb-house-image {
      max-width: min(100%, 480px);
    }

    .wb-house-col {
      gap: 16px;
    }
  }

  @media (max-width: 700px) {
    .wb-house-item {
      grid-template-columns: 26px minmax(0, 1fr);
      gap: 10px;
    }

    .wb-house-line {
      min-height: 36px;
    }

    .wb-house-chips {
      justify-content: flex-start;
    }
  }

  @media (max-width: 520px) {
    .wb-house-wrap {
      gap: 18px;
    }

    .wb-house-chip {
      font-size: 11px;
      padding: 5px 10px;
    }

    .wb-house-wrong {
      right: -4px;
    }
  }
`}</style>
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "55px" }}>
          <ExerciseHeader
            sectionLetter="B"
            title="Label the rooms in Tom's house."
            subTitle="Identify each room name to the numbered room in Tom’s house before dragging it, then place one item at a time and review every target before checking."
          />

          <div className="wb-house-chips">
            {DRAG_ITEMS.map((item) => {
              const isUsed = usedDragIds.includes(item.id);

              return (
                <DraggableChip key={item.id} item={item} isUsed={isUsed} />
              );
            })}
          </div>

          <div className="wb-house-layout">
            <div className="wb-house-col">
              {ITEMS.filter((i) => [1, 3, 5, 7].includes(i.id)).map((item) => (
                <div key={item.id} className="wb-house-item">
                  <div className="wb-house-num">{item.id}</div>
                  <DropBox item={item} />
                </div>
              ))}
            </div>

            <div className="wb-house-image-wrap">
              <img
                src={imgHouse}
                className="wb-house-image"
                alt="A cutaway view of Tom's house with eight numbered rooms"
              />
            </div>

            <div className="wb-house-col">
              {ITEMS.filter((i) => [2, 4, 6, 8].includes(i.id)).map((item) => (
                <div key={item.id} className="wb-house-item">
                  <div className="wb-house-num">{item.id}</div>
                  <DropBox item={item} />
                </div>
              ))}
            </div>
          </div>

          <div className="wb-house-buttons">
            <Button
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleReset}
              checkAnswers={handleCheck}
            />
          </div>
        </div>

        {/* 🔥 Overlay */}
        <DragOverlay>
          {activeItem ? (
            <div
              style={{
                background: "#fff",
                padding: "8px 12px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                fontSize: "17px",
                fontWeight: 600,

                border: "1px solid #ff901aff",
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
