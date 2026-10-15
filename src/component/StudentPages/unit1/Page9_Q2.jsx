/* eslint-disable react-refresh/only-export-components */
import React, { useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";
import Unit1PlayingAudioIcon from "./Unit1PlayingAudioIcon";
import useUnit1Audio from "./useUnit1Audio";
import useUnit1TabDrag from "./useUnit1TabDrag";
import full1 from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_001_basketball_player_young_referee.mp3";
import theAudio from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_002_The.mp3";
import basketballAudio from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_003_basketball.mp3";
import isAudio from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_004_is.mp3";
import thanAudio from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_005_than.mp3";
import refereeAudio from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_006_referee.mp3";
import playerAudio from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_007_player.mp3";
import youngerAudio from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_008_younger.mp3";
import full2 from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_009_cat_short_bear.mp3";
import bearAudio from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_010_bear.mp3";
import shorterAudio from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_011_shorter.mp3";
import catAudio from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_012_cat.mp3";
import full3 from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_013_mouse_small_dog.mp3";
import smallerAudio from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_014_smaller.mp3";
import dogAudio from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_015_dog.mp3";
import mouseAudio from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/Item_016_mouse.mp3";
import basketballFullAudio from "../../../assets/audio/ClassBook/Unit 1/Page 9 - Exercise E/item-003-basketball_K7Yj5kKn_[cut_4sec].mp3";
import "./unit1Interactions.css";
const COMMON_AUDIO = {
  The: theAudio,
  the: theAudio,
  basketball: basketballAudio,
  is: isAudio,
  than: thanAudio,
};

const ITEMS = [
  {
    id: 1,
    prompt: "basketball player / young / referee",
    words: [
      "The",
      "basketball",
      "player",
      "is",
      "younger",
      "than",
      "the",
      "referee",
      ".",
    ],
    audio: {
      ...COMMON_AUDIO,
      player: playerAudio,
      younger: youngerAudio,
      referee: refereeAudio,
    },
    fullAudio: full1,
  },
  {
    id: 2,
    prompt: "cat / short / bear",
    words: ["The", "cat", "is", "shorter", "than", "the", "bear", "."],
    audio: {
      ...COMMON_AUDIO,
      cat: catAudio,
      shorter: shorterAudio,
      bear: bearAudio,
    },
    fullAudio: full2,
  },
  {
    id: 3,
    prompt: "mouse / small / dog",
    words: ["The", "mouse", "is", "smaller", "than", "the", "dog", "."],
    audio: {
      ...COMMON_AUDIO,
      mouse: mouseAudio,
      smaller: smallerAudio,
      dog: dogAudio,
    },
    fullAudio: full3,
  },
  {
    id: 4,
    prompt: "basketball court / big / scoreboard",
    words: [
      "The",
      "basketball",
      "court",
      "is",
      "bigger",
      "than",
      "the",
      "scoreboard",
      ".",
    ],
    audio: COMMON_AUDIO,
    fullAudio: basketballFullAudio,
  },
];

const tileId = (itemId, wordIndex) => `tile-${itemId}-${wordIndex}`;
const slotId = (itemId, position) => `slot-${itemId}-${position}`;
const parseTile = (id) => {
  const [, itemId, wordIndex] = id.split("-");
  return { itemId: Number(itemId), wordIndex: Number(wordIndex) };
};
const parseSlot = (id) => {
  const [, itemId, position] = id.split("-");
  return { itemId: Number(itemId), position: Number(position) };
};

const shuffle = (values) => {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const random = Math.floor(Math.random() * (index + 1));
    [result[index], result[random]] = [result[random], result[index]];
  }
  return result;
};

const createBanks = () =>
  Object.fromEntries(
    ITEMS.map((item) => [
      item.id,
      shuffle(item.words.map((_, index) => tileId(item.id, index))),
    ]),
  );

function WordTile({
  id,
  word,
  disabled,
  registerItem,
  onKeyboardPick,
  onPlayAudio,
  active,
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  });
  const pointerStartRef = useRef(null);
  const pointerMovedRef = useRef(false);

  const handlePointerDownCapture = (event) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    pointerMovedRef.current = false;
  };

  const handlePointerMoveCapture = (event) => {
    if (!pointerStartRef.current) return;
    const dx = event.clientX - pointerStartRef.current.x;
    const dy = event.clientY - pointerStartRef.current.y;
    if (Math.sqrt(dx * dx + dy * dy) > 5) pointerMovedRef.current = true;
  };

  const handleClick = (event) => {
    if (event.detail === 0) return; // تجاهل Click الناتج عن الكيبورد

    if (pointerMovedRef.current) {
      pointerMovedRef.current = false;
      return;
    }

    onPlayAudio();
  };
  const handleKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (disabled) onPlayAudio();
    else onKeyboardPick();
  };

  return (
    <button
      type="button"
      ref={(element) => {
        setNodeRef(element);
        registerItem(id, element);
      }}
      {...attributes}
      {...listeners}
      aria-disabled={disabled}
      className="unit1-audio-control unit1-drag-item"
      onPointerDownCapture={handlePointerDownCapture}
      onPointerMoveCapture={handlePointerMoveCapture}
      onPointerUpCapture={() => {
        window.requestAnimationFrame(() => {
          pointerStartRef.current = null;
        });
      }}
      onPointerCancel={() => {
        pointerStartRef.current = null;
        pointerMovedRef.current = false;
      }}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      style={{
        position: "relative",
        padding: "7px 11px",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        background: disabled ? "#d1d5db" : "#f8fafc",
        color: disabled ? "#535353" : "#111827",
        opacity: disabled ? 0.55 : 1,
        fontSize: "16px",
        cursor: disabled ? "pointer" : "grab",
        touchAction: "none",
        boxShadow: isDragging ? "0 12px 24px rgba(0,0,0,.2)" : "none",
      }}
    >
      {word}
      <Unit1PlayingAudioIcon active={active} />
    </button>
  );
}

function AnswerSlot({
  id,
  registerTarget,
  preview,
  onKeyDown,
  tabIndex,
  children,
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
      className="unit1-drop-target"
      style={{
        minWidth: "68px",
        minHeight: "42px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `2px dashed ${isOver || preview ? "#f39b42" : "#cbd5e1"}`,
        borderRadius: "9px",
        background: isOver || preview ? "#fff7ed" : "#fff",
      }}
    >
      {children}
    </div>
  );
}

export default function Page9_Q2() {
  const { activeAudioKey, playAudio, stopAudio } = useUnit1Audio();
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [correctItems, setCorrectItems] = useState([]);
  const [banks, setBanks] = useState(createBanks);
  const [activeId, setActiveId] = useState(null);

  const answerFor = (item) =>
    answers[item.id] || Array(item.words.length).fill(null);
  const allItemIds = ITEMS.flatMap((item) =>
    item.words.map((_, index) => tileId(item.id, index)),
  );
  const allTargetIds = ITEMS.flatMap((item) =>
    item.words.map((_, index) => slotId(item.id, index)),
  );
  const isItemDisabled = (id) => {
    const { itemId } = parseTile(id);
    return answerFor(ITEMS.find((item) => item.id === itemId)).includes(id);
  };
  const isTargetDisabled = (id) => {
    const { itemId } = parseSlot(id);
    return revealed || correctItems.includes(itemId);
  };
  const audioForTile = (id) => {
    const { itemId, wordIndex } = parseTile(id);
    const item = ITEMS.find((entry) => entry.id === itemId);
    return item.audio[item.words[wordIndex]] || null;
  };
  const wordForTile = (id) => {
    const { itemId, wordIndex } = parseTile(id);
    return ITEMS.find((item) => item.id === itemId).words[wordIndex];
  };

  const placeTile = (itemIdValue, targetIdValue) => {
    const tile = parseTile(itemIdValue);
    const target = parseSlot(targetIdValue);
    if (tile.itemId !== target.itemId || isTargetDisabled(targetIdValue))
      return;
    const item = ITEMS.find((entry) => entry.id === tile.itemId);
    setAnswers((previous) => {
      const current = [
        ...(previous[item.id] || Array(item.words.length).fill(null)),
      ];
      const oldPosition = current.indexOf(itemIdValue);
      if (oldPosition !== -1) current[oldPosition] = null;
      current[target.position] = itemIdValue;
      return { ...previous, [item.id]: current };
    });
    setChecked(false);
  };

  const keyboard = useUnit1TabDrag({
    itemIds: allItemIds,
    targetIds: allTargetIds,
    getTargetIds: (id) => {
      const { itemId } = parseTile(id);
      const item = ITEMS.find((entry) => entry.id === itemId);
      return item.words.map((_, index) => slotId(itemId, index));
    },
    getItemIdsForItem: (id) => {
      const { itemId } = parseTile(id);
      return banks[itemId];
    },
    isItemDisabled,
    isTargetDisabled,
    onPick: (id) => playAudio(`word-${id}`, audioForTile(id)),
    onPlace: placeTile,
  });

  const removeTile = (event, itemId, position) => {
    event.stopPropagation();
    if (revealed || correctItems.includes(itemId)) return;
    const removed = answerFor(ITEMS.find((item) => item.id === itemId))[
      position
    ];
    setAnswers((previous) => {
      const current = [...(previous[itemId] || [])];
      current[position] = null;
      return { ...previous, [itemId]: current };
    });
    setChecked(false);
    if (removed) keyboard.focusItem(removed);
  };

  const isComplete = (item) => answerFor(item).every(Boolean);
  const isCorrect = (item) =>
    answerFor(item).map(wordForTile).join(" ") === item.words.join(" ");

  const checkAnswers = () => {
    if (revealed || correctItems.length === ITEMS.length) return;
    if (ITEMS.some((item) => !isComplete(item)))
      return ValidationAlert.info(
        "Please complete all sentences before checking.",
      );
    const correct = ITEMS.filter(isCorrect).map((item) => item.id);
    setCorrectItems(correct);
    setChecked(true);
    if (correct.length === ITEMS.length)
      ValidationAlert.success(`Score: ${correct.length} / ${ITEMS.length}`);
    else if (correct.length === 0)
      ValidationAlert.error(`Score: 0 / ${ITEMS.length}`);
    else ValidationAlert.warning(`Score: ${correct.length} / ${ITEMS.length}`);
  };

  const showAnswers = () => {
    setAnswers(
      Object.fromEntries(
        ITEMS.map((item) => [
          item.id,
          item.words.map((_, index) => tileId(item.id, index)),
        ]),
      ),
    );
    setCorrectItems(ITEMS.map((item) => item.id));
    setChecked(true);
    setRevealed(true);
    keyboard.cancel();
    stopAudio();
  };

  const reset = () => {
    setAnswers({});
    setCorrectItems([]);
    setChecked(false);
    setRevealed(false);
    setActiveId(null);
    setBanks(createBanks());
    keyboard.cancel();
    stopAudio();
  };

  return (
    <DndContext
      onDragStart={({ active }) => {
        const id = String(active.id);

        setActiveId(id);

        // Play word audio when dragging with mouse or touch
        playAudio(`word-${id}`, audioForTile(id));
      }}
      onDragEnd={({ active, over }) => {
        setActiveId(null);
        if (over) placeTile(String(active.id), String(over.id));
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="main-container-component">
        <div className="div-forall mb-10" style={{ gap: "24px" }}>
          <ExerciseHeader
            sectionLetter="E"
            title="Read and write the sentences."
            subTitle="Say the complete answer first, then arrange the word tiles in sentence order and add punctuation."
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              width: "100%",
            }}
          >
            {ITEMS.map((item) => {
              const answer = answerFor(item);
              const correct = correctItems.includes(item.id);
              return (
                <section
                  key={item.id}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    padding: "14px",
                    border: `2px solid ${checked && !correct ? "#dc2626" : "#f39b42"}`,
                    borderRadius: "14px",
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      fontSize: "18px",
                      alignItems: "center",
                    }}
                  >
                    <strong>{item.id}.</strong>
                    {item.fullAudio ? (
                      <button
                        type="button"
                        className="unit1-audio-control unit1-interactive"
                        aria-label={`Play sentence ${item.id}: ${item.prompt}`}
                        onClick={() =>
                          playAudio(`full-${item.id}`, item.fullAudio)
                        }
                        style={{
                          position: "relative",
                          display: "inline-flex",
                          alignItems: "center",
                          border: 0,
                          background: "transparent",
                          color: "inherit",
                          font: "inherit",
                          textAlign: "left",
                          cursor: "pointer",
                          padding: "2px 22px 2px 0",
                        }}
                      >
                        <span>{item.prompt}</span>
                        <Unit1PlayingAudioIcon
                          active={activeAudioKey === `full-${item.id}`}
                        />
                      </button>
                    ) : (
                      <span>{item.prompt}</span>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      paddingBottom: "10px",
                      borderBottom: "1px solid #8f8f8f",
                    }}
                  >
                    {answer.map((placedId, position) => (
                      <AnswerSlot
                        key={slotId(item.id, position)}
                        id={slotId(item.id, position)}
                        registerTarget={keyboard.registerTarget}
                        preview={
                          keyboard.keyboardTargetId ===
                          slotId(item.id, position)
                        }
                        tabIndex={keyboard.keyboardItemId ? 0 : -1}
                        onKeyDown={(event) =>
                          keyboard.handleTargetKeyDown(
                            event,
                            slotId(item.id, position),
                          )
                        }
                      >
                        {keyboard.keyboardTargetId ===
                          slotId(item.id, position) &&
                        keyboard.keyboardItemId ? (
                          <span
                            aria-hidden="true"
                            className="unit1-keyboard-preview"
                            style={{
                              width: "100%",
                              minHeight: "38px",
                              display: "grid",
                              placeItems: "center",
                              boxSizing: "border-box",
                              padding: "7px 10px",
                              borderRadius: "8px",
                              background: "#eef2ff",
                              fontSize: "16px",
                            }}
                          >
                            {wordForTile(keyboard.keyboardItemId)}
                          </span>
                        ) : placedId ? (
                          <button
                            type="button"
                            className="unit1-audio-control unit1-interactive"
                            onClick={(event) => {
                              if (correct || revealed) {
                                event.stopPropagation();
                                playAudio(
                                  `word-${placedId}`,
                                  audioForTile(placedId),
                                );
                              } else {
                                removeTile(event, item.id, position);
                              }
                            }}
                            aria-label={
                              correct || revealed
                                ? `Play word ${wordForTile(placedId)}`
                                : `${wordForTile(placedId)}. Activate to return it to the choices.`
                            }
                            style={{
                              width: "100%",
                              minHeight: "38px",
                              display: "grid",
                              placeItems: "center",
                              boxSizing: "border-box",
                              padding: "7px 10px",
                              border: 0,
                              borderRadius: "8px",
                              background: "#eef2ff",
                              fontSize: "16px",
                              cursor:
                                correct || revealed ? "default" : "pointer",
                            }}
                          >
                            {wordForTile(placedId)}
                            <Unit1PlayingAudioIcon
                              active={activeAudioKey === `word-${placedId}`}
                            />
                          </button>
                        ) : null}
                      </AnswerSlot>
                    ))}
                  </div>

                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {banks[item.id].map((id) => (
                      <WordTile
                        key={id}
                        id={id}
                        word={wordForTile(id)}
                        disabled={isItemDisabled(id) || revealed || correct}
                        registerItem={keyboard.registerItem}
                        active={activeAudioKey === `word-${id}`}
                        onKeyboardPick={() => keyboard.pickItem(id)}
                        onPlayAudio={() =>
                          playAudio(`word-${id}`, audioForTile(id))
                        }
                      />
                    ))}
                  </div>
                  {checked && !correct && (
                    <span
                      aria-label="Incorrect sentence"
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "-10px",
                        width: "24px",
                        height: "24px",
                        display: "grid",
                        placeItems: "center",
                        borderRadius: "50%",
                        background: "#dc2626",
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    >
                      ×
                    </span>
                  )}
                </section>
              );
            })}
          </div>

          <Button
            handleShowAnswer={showAnswers}
            handleStartAgain={reset}
            checkAnswers={checkAnswers}
            checkDisabled={revealed || correctItems.length === ITEMS.length}
          />
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <div
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              background: "#eef2ff",
              boxShadow: "0 12px 24px rgba(0,0,0,.2)",
              fontSize: "16px",
            }}
          >
            {wordForTile(activeId)}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
