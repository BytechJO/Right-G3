/* eslint-disable react-refresh/only-export-components */

import { useRef, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

import useUnit4TabDrag from "../unit4/useUnit4TabDrag";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";

import "../unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex E 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex E 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex E 6.svg";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

/* =====================================================
   AUDIO
===================================================== */

const page89E = (file) =>
  new URL(
    `../../../assets/audio/ClassBook/Unit 10/Page 89 - Exercise E/${file}`,
    import.meta.url,
  ).href;

const WORD_AUDIO = {
  ducks: page89E("Item_001_ducks.mp3"),
  cats: page89E("Item_002_cats.mp3"),
  caps: page89E("Item_003_caps.mp3"),
  peas: page89E("Item_004_peas.mp3"),
  girls: page89E("Item_005_girls.mp3"),
  bags: page89E("Item_006_bags.mp3"),
};

/* =====================================================
   DRAGGABLE WORD
===================================================== */

const DraggableWord = ({
  id,
  children,
  disabled,
  register,
  pick,
  play,
  active,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled,
    });

  const style = {
    transform: CSS.Translate.toString(transform),

    opacity: disabled ? 0.4 : isDragging ? 0.5 : 1,

    cursor: disabled ? "not-allowed" : "grab",

    touchAction: "none",
  };

  return (
    <div
      ref={(element) => {
        setNodeRef(element);

        register(id, element);
      }}
      style={style}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={() => {
        if (!disabled) {
          play();
        }
      }}
      onKeyDown={(event) => {
        if (disabled) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();

          play();

          pick();
        }
      }}
      className="unit4-interactive unit4-audio-control"
    >
      <Unit4PlayingAudioIcon active={active} />

      {children}
    </div>
  );
};

/* =====================================================
   DROP BOX
===================================================== */

const DropBox = ({
  id,
  children,
  checked,
  isWrong,
  locked,
  preview,
  register,
  onKeyDown,
  onRemove,
  onFocus,
  onBlur,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled: locked,
  });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(id, element);
      }}
      role="button"
      tabIndex={!locked && (children || preview) ? 0 : -1}
      aria-disabled={locked}
      aria-label={preview ? `Place ${preview} here.` : "Answer slot."}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onClick={() => {
        if (children && !locked) {
          onRemove();
        }
      }}
      className={`unit4-drop-target unit4-interactive ${
        preview ? "unit4-keyboard-preview" : ""
      }`}
      style={{
        position: "relative",
        marginTop: "6px",
        borderBottom: `1px solid ${
          checked && isWrong ? "red" : isOver ? "#F79530" : "#000"
        }`,
        minHeight: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        fontWeight: "bold",
        transition: "0.2s",
        background: isOver ? "#fff4e8" : "transparent",
        transform: isOver ? "scale(1.04)" : "scale(1)",
      }}
    >
      {preview || children || ""}
    </div>
  );
};

/* =====================================================
   MAIN
===================================================== */

const Review9_Page2_Q3 = () => {
  /* =====================================================
     STATE
  ===================================================== */

  const [userAnswers, setUserAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const [lockedIds, setLockedIds] = useState([]);

  const [revealed, setRevealed] = useState(false);

  const [checked, setChecked] = useState(false);

  const [activeWord, setActiveWord] = useState(null);

  /*
    مهم:
    نعرف أي DropBox عليه focus
    حتى نظهر preview عليه فقط
  */
  const [focusedDropId, setFocusedDropId] = useState(null);

  const draggedRef = useRef(false);

  /* =====================================================
     AUDIO
  ===================================================== */

  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  /* =====================================================
     DND SENSORS
  ===================================================== */

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  /* =====================================================
     DATA
  ===================================================== */

  const words = ["ducks", "cats", "caps", "peas", "girls", "bags"];

  const correctAnswers = {
    1: "cats",
    2: "bags",
    3: "caps",
    4: "girls",
    5: "peas",
    6: "ducks",
  };

  const questions = [
    {
      id: 1,
      image: img1,
    },
    {
      id: 2,
      image: img2,
    },
    {
      id: 3,
      image: img3,
    },
    {
      id: 4,
      image: img4,
    },
    {
      id: 5,
      image: img5,
    },
    {
      id: 6,
      image: img6,
    },
  ];

  const itemIds = words.map((word, index) => `${word}-${index}`);

  const targetIds = questions.map((question) => String(question.id));

  const usedWords = Object.values(userAnswers).filter(Boolean);

  /* =====================================================
     PLACE WORD
  ===================================================== */

  const placeWord = (itemId, targetId) => {
    if (revealed || lockedIds.includes(targetId)) {
      return;
    }

    const word = itemId.replace(/-\d+$/, "");

    setUserAnswers((previous) => {
      const next = {
        ...previous,
      };

      /*
          إذا نفس الكلمة كانت موجودة
          بخانة ثانية:
          شيلها من هناك
        */
      Object.keys(next).forEach((id) => {
        if (next[id] === word) {
          next[id] = "";
        }
      });

      next[targetId] = word;

      return next;
    });

    setChecked(false);
  };

  /* =====================================================
     KEYBOARD DRAG
  ===================================================== */

  const keyboard = useUnit4TabDrag({
    itemIds,

    targetIds,

    isItemDisabled: (id) =>
      revealed || usedWords.includes(id.replace(/-\d+$/, "")),

    isTargetDisabled: (id) => revealed || lockedIds.includes(id),

    onPlace: placeWord,
  });

  /* =====================================================
     MOUSE DRAG END
  ===================================================== */

  const onDragEnd = (event) => {
    const { over, active } = event;

    setActiveWord(null);

    if (!over || revealed) {
      return;
    }

    placeWord(String(active.id), String(over.id));
  };

  /* =====================================================
     REMOVE ANSWER
  ===================================================== */

  const removeAnswer = (questionId) => {
    const id = String(questionId);

    if (revealed || lockedIds.includes(id)) {
      return;
    }

    const removedWord = userAnswers[questionId];

    setUserAnswers((previous) => ({
      ...previous,
      [questionId]: "",
    }));

    setChecked(false);

    setFocusedDropId(null);

    /*
      بعد الإزالة:
      رجع focus على الكلمة بالبنك
    */
    if (removedWord) {
      const wordIndex = words.indexOf(removedWord);

      keyboard.focusItem(`${removedWord}-${wordIndex}`);
    }
  };

  /* =====================================================
     SHOW ANSWER
  ===================================================== */

  const showAnswer = () => {
    setUserAnswers(correctAnswers);

    setLockedIds(targetIds);

    setRevealed(true);

    setChecked(false);

    setFocusedDropId(null);

    keyboard.cancel();

    stopAudio();
  };

  /* =====================================================
     CHECK
  ===================================================== */

  const checkAnswers = () => {
    if (revealed || lockedIds.length === targetIds.length) {
      return;
    }

    const empty = Object.values(userAnswers).some((value) => !value?.trim());

    if (empty) {
      ValidationAlert.info();

      return;
    }

    let score = 0;

    Object.keys(correctAnswers).forEach((id) => {
      if (
        userAnswers[id]?.toLowerCase().trim() ===
        correctAnswers[id].toLowerCase()
      ) {
        score++;
      }
    });

    const total = Object.keys(correctAnswers).length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span
          style="
            color:${color};
            font-weight:bold;
          "
        >
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    setChecked(true);

    setLockedIds(
      targetIds.filter((id) => userAnswers[id] === correctAnswers[id]),
    );

    if (score === total) {
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  /* =====================================================
     RESET
  ===================================================== */

  const handleStartAgain = () => {
    setUserAnswers({
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
    });

    setChecked(false);

    setLockedIds([]);

    setRevealed(false);

    setFocusedDropId(null);

    keyboard.cancel();

    stopAudio();
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        draggedRef.current = true;

        setActiveWord(event.active.id.split("-")[0]);
      }}
      onDragEnd={(event) => {
        onDragEnd(event);

        window.setTimeout(() => {
          draggedRef.current = false;
        }, 0);
      }}
      onDragCancel={() => {
        setActiveWord(null);

        draggedRef.current = false;
      }}
    >
      <div
        style={{
          display: "flex",

          flexDirection: "column",

          justifyContent: "center",

          alignItems: "center",

          padding: "30px",
        }}
      >
        <div
          className="div-forall"
          style={{
            gap: "20px",
          }}
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <ExerciseHeaderReview
            sectionLetter="E"
            title="Look and write."
            subTitle="Say each plural noun aloud, then drag it to the matching picture."
          />

          <div
            className="w-full"
            style={{
              display: "flex",

              justifyContent: "center",

              padding: "20px",
            }}
          >
            <div
              style={{
                width: "100%",

                display: "flex",

                flexDirection: "column",

                gap: "30px",
              }}
            >
              {/* =================================================
                  WORD BANK
              ================================================= */}

              <div
                style={{
                  display: "flex",

                  gap: "30px",

                  padding: "10px",

                  borderRadius: "10px",

                  justifyContent: "center",

                  width: "100%",

                  marginBottom: "10px",

                  flexWrap: "wrap",
                }}
              >
                {words.map((word, index) => {
                  const usedCount = Object.values(userAnswers).filter(
                    (value) => value === word,
                  ).length;

                  const totalCount = words.filter(
                    (currentWord) => currentWord === word,
                  ).length;

                  const isUsed = usedCount >= totalCount;

                  return (
                    <DraggableWord
                      key={`${word}-${index}`}
                      id={`${word}-${index}`}
                      disabled={revealed || isUsed}
                      register={keyboard.registerItem}
                      pick={() => keyboard.pickItem(`${word}-${index}`)}
                      play={() => {
                        if (!draggedRef.current) {
                          playAudio(`word-${index}`, WORD_AUDIO[word]);
                        }
                      }}
                      active={activeAudioKey === `word-${index}`}
                    >
                      <div
                        style={{
                          padding: "7px 14px",

                          border: "1px solid #F79530",

                          borderRadius: "8px",

                          background: "white",

                          fontWeight: "bold",

                          fontSize: "16px",
                        }}
                      >
                        {word}
                      </div>
                    </DraggableWord>
                  );
                })}
              </div>

              {/* =================================================
                  QUESTIONS
              ================================================= */}

              <div
                style={{
                  display: "grid",

                  gridTemplateColumns: "repeat(3, 1fr)",

                  columnGap: "20px",

                  rowGap: "50px",
                }}
              >
                {questions.map((q) => {
                  const id = String(q.id);

                  const isLocked = revealed || lockedIds.includes(id);

                  const selectedWord = keyboard.keyboardItemId?.replace(
                    /-\d+$/,
                    "",
                  );

                  /*
                      Preview يظهر فقط:
                      - في كلمة picked
                      - وهذا الـdrop عليه focus
                    */
                  const preview =
                    keyboard.keyboardItemId && focusedDropId === id
                      ? selectedWord
                      : "";

                  return (
                    <div
                      key={q.id}
                      style={{
                        padding: "6px",

                        textAlign: "center",

                        position: "relative",
                      }}
                    >
                      {/* =====================================
                            NUMBER + IMAGE
                        ===================================== */}

                      <div className="flex gap-2">
                        <span
                          style={{
                            color: "black",

                            fontSize: "22px",

                            fontWeight: "bold",

                            zIndex: 2,
                          }}
                        >
                          {q.id}
                        </span>

                        <img
                          src={q.image}
                          alt={
                            [
                              "Three cats.",
                              "Colorful school bags.",
                              "Colorful caps.",
                              "Two girls.",
                              "Green pea pods.",
                              "Three ducks.",
                            ][q.id - 1]
                          }
                          style={{
                            width: "100%",

                            height: "90px",

                            objectFit: "contain",
                          }}
                        />
                      </div>

                      {/* =====================================
                            DROP
                        ===================================== */}

                      <DropBox
                        id={id}
                        checked={checked}
                        isWrong={userAnswers[q.id] !== correctAnswers[q.id]}
                        locked={isLocked}
                        preview={preview}
                        register={keyboard.registerTarget}
                        onFocus={() => {
                          if (!isLocked) {
                            setFocusedDropId(id);
                          }
                        }}
                        onBlur={() => {
                          setFocusedDropId(null);
                        }}
                        onRemove={() => removeAnswer(q.id)}
                        onKeyDown={(event) => {
                          const value = userAnswers[q.id];

                          /*
                              بدون picked item:
                              إذا الخانة فيها جواب وغلط/غير locked
                              Enter/Space يشيله
                            */
                          if (
                            !keyboard.keyboardItemId &&
                            value &&
                            !isLocked &&
                            (event.key === "Enter" || event.key === " ")
                          ) {
                            event.preventDefault();

                            event.stopPropagation();

                            removeAnswer(q.id);

                            return;
                          }

                          /*
                              مع picked item:
                              نفس keyboard drag
                            */
                          keyboard.handleTargetKeyDown(event, id);
                        }}
                      >
                        {userAnswers[q.id] && (
                          <span
                            style={{
                              cursor: isLocked ? "default" : "pointer",
                            }}
                          >
                            {userAnswers[q.id]}
                          </span>
                        )}

                        {/* =================================
                              WRONG X
                          ================================= */}

                        {checked &&
                          userAnswers[q.id] !== correctAnswers[q.id] && (
                            <span
                              style={{
                                position: "absolute",

                                left: "25%",

                                top: "50%",

                                transform: "translateY(-50%)",

                                width: "22px",

                                height: "22px",

                                background: "red",

                                color: "white",

                                borderRadius: "50%",

                                display: "flex",

                                alignItems: "center",

                                justifyContent: "center",

                                fontSize: "12px",

                                fontWeight: "bold",

                                border: "2px solid white",

                                boxShadow: "0 1px 6px rgba(0,0,0,0.2)",

                                pointerEvents: "none",

                                zIndex: 3,
                              }}
                            >
                              ✕
                            </span>
                          )}
                      </DropBox>
                    </div>
                  );
                })}
              </div>

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <Button
                handleShowAnswer={showAnswer}
                handleStartAgain={handleStartAgain}
                checkAnswers={checkAnswers}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          DRAG OVERLAY
      ================================================= */}

      <DragOverlay>
        {activeWord ? (
          <div
            style={{
              padding: "7px 14px",

              border: "2px solid #F79530",

              borderRadius: "8px",

              background: "white",

              fontWeight: "bold",

              fontSize: "16px",

              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",

              transform: "scale(1.08)",

              opacity: 0.95,
            }}
          >
            {activeWord}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Review9_Page2_Q3;
