/* eslint-disable react-refresh/only-export-components */
import React, { useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  useDraggable,
} from "@dnd-kit/core";
import WrongMark from "../../WrongMark";
import { useDroppable } from "@dnd-kit/core";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex A 4.svg";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import useUnit4TabDrag from "../unit4/useUnit4TabDrag";
import "../unit4/unit4Interactions.css";
import sentence1Audio from "../../../assets/audio/ClassBook/Unit 4/Page 36 - Exercise A/Item_001_It_is_cold._There_is_snow_on_the_ground._The_trees_have_no_leaves.mp3";
import itsAudio from "../../../assets/audio/ClassBook/Unit 4/Page 36 - Exercise A/Item_002_It's.mp3";
import sentence2Audio from "../../../assets/audio/ClassBook/Unit 4/Page 36 - Exercise A/Item_003_It_is_hot._The_sun_is_shining._We_are_playing_in_the_yard.mp3";
import sentence3Audio from "../../../assets/audio/ClassBook/Unit 4/Page 36 - Exercise A/Item_004_It_is_cool._The_leaves_on_the_trees_are_turning_brown._We_like_to_play_i.mp3";
import sentence4Audio from "../../../assets/audio/ClassBook/Unit 4/Page 36 - Exercise A/Item_005_It_is_warm._The_flowers_and_plants_are_growing._There_are_baby_birds_in.mp3";

const SENTENCE_AUDIO = [
  sentence1Audio,
  sentence2Audio,
  sentence3Audio,
  sentence4Audio,
];
const ImageDrop = ({
  i,
  children,
  registerTarget,
  onKeyDown,
  preview,
  editable,
}) => {
  const { setNodeRef } = useDroppable({
    id: `image-${i}`,
  });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        registerTarget(`image-${i}`, element);
      }}
      role="button"
      tabIndex={preview || editable ? 0 : -1}
      onKeyDown={onKeyDown}
      className="unit4-drop-target"
      style={{
        position: "relative",
        borderRadius: "16px",
        padding: "6px",
        background: "#fff",
      }}
    >
      {children}

      {preview && (
        <span
          className="unit4-keyboard-preview"
          style={{
            position: "absolute",
            right: "7px",
            bottom: "7px",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            border: "2px solid #F79530",
            borderRadius: "12px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#000",
            boxSizing: "border-box",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {preview}
        </span>
      )}
    </div>
  );
};
const WrongIcon = () => (
  <span
    style={{
      width: "22px",
      height: "22px",
      background: "red",
      color: "white",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      border: "2px solid white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      fontSize: "14px",
    }}
  >
    ✕
  </span>
);
const Review4_Page1_Q1 = () => {
  const questions = [
    {
      text: "It is cold. There is snow on the ground. The trees have no leaves.",
      answer: "winter",
      correctImage: 3,
    },
    {
      text: "It is hot. The sun is shining. We are playing in the yard.",
      answer: "summer",
      correctImage: 4,
    },
    {
      text: "It is cool. The leaves on the trees are turning brown. We like to play in the leaves.",
      answer: "autumn",
      correctImage: 1,
    },
    {
      text: "It is warm. The flowers and plants are growing. There are baby birds in the trees.",
      answer: "spring",
      correctImage: 2,
    },
  ];

  const wordBank = ["spring", "summer", "autumn", "winter"];
  const images = [img1, img2, img3, img4];

  const [answers, setAnswers] = useState(Array(4).fill(""));
  const [imageNumbers, setImageNumbers] = useState([null, null, null, null]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);
  const [lockedWords, setLockedWords] = useState([]);
  const [lockedImages, setLockedImages] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const clearWrongAspect = (questionIndex, aspect) => {
    setWrongMarks((previous) =>
      previous.flatMap((mark) => {
        if (mark.qIndex !== questionIndex) return [mark];
        const updated = { ...mark, [aspect]: false };
        return updated.wordWrong || updated.imageWrong ? [updated] : [];
      }),
    );
  };

  // =========================
  // dnd-kit sensors
  // =========================
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  // =========================
  // DRAG END
  // =========================
  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggableId = active.id;
    const destinationId = over.id;

    // ✨ words
    if (draggableId.startsWith("season-")) {
      const value = draggableId.replace("season-", "");
      const index = Number(destinationId);

      if (!isNaN(index)) {
        const updated = [...answers];
        updated[index] = value;
        setAnswers(updated);
      }
    }

    // 🔢 numbers
    if (draggableId.startsWith("num-")) {
      const number = Number(draggableId.split("-")[1]);

      if (destinationId.startsWith("image-")) {
        const index = Number(destinationId.split("-")[1]);

        if (lockedImages.includes(index)) return;
        const updated = imageNumbers.map((value) =>
          value === number ? null : value,
        );
        updated[index] = number;
        setImageNumbers(updated);
        clearWrongAspect(index, "imageWrong");
      }
    }
  };

  const keyboard = useUnit4TabDrag({
    itemIds: [1, 2, 3, 4].map((number) => `num-${number}`),
    targetIds: [0, 1, 2, 3].map((index) => `image-${index}`),
    isItemDisabled: (id) => imageNumbers.includes(Number(id.split("-")[1])),
    isTargetDisabled: (id) => lockedImages.includes(Number(id.split("-")[1])),
    onPlace: (id, targetId) =>
      onDragEnd({ active: { id }, over: { id: targetId } }),
  });

  // =========================
  const showAnswers = () => {
    setAnswers(questions.map((q) => q.answer));
    setImageNumbers(questions.map((q) => q.correctImage));
    setShowCorrect(true);
    setWrongMarks([]);
    setLockedWords([0, 1, 2, 3]);
    setLockedImages([0, 1, 2, 3]);
    keyboard.cancel();
    stopAudio();
  };

  const resetAll = () => {
    setAnswers(questions.map(() => ""));
    setImageNumbers([null, null, null, null]);
    setShowCorrect(false);
    setWrongMarks([]);
    setLockedWords([]);
    setLockedImages([]);
    keyboard.cancel();
    stopAudio();
  };

  const checkAnswers = () => {
    if (
      lockedWords.length === questions.length &&
      lockedImages.length === questions.length
    )
      return;

    if (answers.includes("") || imageNumbers.some((number) => number == null)) {
      ValidationAlert.info();
      return;
    }

    let score = 0;
    let wrong = [];

    questions.forEach((q, i) => {
      const wordCorrect =
        answers[i]?.trim().toLowerCase() === q.answer.toLowerCase();

      const imageCorrect = imageNumbers[i] === q.correctImage;

      if (!wordCorrect || !imageCorrect) {
        wrong.push({
          qIndex: i,
          wordWrong: !wordCorrect,
          imageWrong: !imageCorrect,
        });
      }

      if (wordCorrect) score++;
      if (imageCorrect) score++;
    });

    setWrongMarks(wrong);
    setShowCorrect(true);
    setLockedWords(
      questions.flatMap((q, i) =>
        answers[i]?.trim().toLowerCase() === q.answer.toLowerCase() ? [i] : [],
      ),
    );
    setLockedImages(
      questions.flatMap((q, i) =>
        imageNumbers[i] === q.correctImage ? [i] : [],
      ),
    );

    const total = questions.length * 2;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  // =========================
  // DRAGGABLE NUMBER (same UI)
  // =========================
  const NumberItem = ({ num, isUsed }) => {
    const pointerStart = useRef(null);
    const pointerMoved = useRef(false);
    const { setNodeRef, listeners, attributes, transform } = useDraggable({
      id: `num-${num}`,
      disabled: isUsed,
    });

    return (
      <div
        ref={(element) => {
          setNodeRef(element);
          keyboard.registerItem(`num-${num}`, element);
        }}
        {...listeners}
        {...attributes}
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          backgroundColor: isUsed ? "#cfcfd4" : "#f39b42",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: "20px",
          cursor: isUsed ? "not-allowed" : "grab",
          opacity: isUsed ? 0.5 : 1,
          userSelect: "none",
          touchAction: "none",
          zIndex: 9999999,
          ...(transform
            ? {
                transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              }
            : {}),
        }}
        role="button"
        tabIndex={0}
        aria-disabled={isUsed}
        onPointerDownCapture={(event) => {
          pointerStart.current = { x: event.clientX, y: event.clientY };
          pointerMoved.current = false;
        }}
        onPointerMoveCapture={(event) => {
          if (
            pointerStart.current &&
            Math.hypot(
              event.clientX - pointerStart.current.x,
              event.clientY - pointerStart.current.y,
            ) > 5
          )
            pointerMoved.current = true;
        }}
        onKeyDown={(event) => {
          if ((event.key === "Enter" || event.key === " ") && !isUsed) {
            event.preventDefault();
            keyboard.pickItem(`num-${num}`);
          }
        }}
      >
        {num}
      </div>
    );
  };

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "5px" }}>
          <ExerciseHeaderReview
            sectionLetter="A"
            title="Read and write the season. Number the pictures."
            subTitle="Read one sentence at a time, then place its number on the picture that matches it."
          />

          {/* ========================= */}
          {/* NUMBERS BANK */}
          {/* ========================= */}
          <div
            className="w-full"
            style={{
              display: "flex",
              gap: "8px",
              padding: "8px",
              // border: "2px dashed #ccc",
              borderRadius: "10px",
              marginTop: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[1, 2, 3, 4].map((num) => {
              const isUsed = imageNumbers.includes(num);
              return <NumberItem key={num} num={num} isUsed={isUsed} />;
            })}
          </div>

          {/* ========================= */}
          {/* QUESTIONS */}
          {/* ========================= */}
          <div className="w-full">
            {questions.map((q, i) => {
              const wrongItem = wrongMarks.find((w) => w.qIndex === i);
              const isWordWrong = wrongItem?.wordWrong;
              const isImageWrong = wrongItem?.imageWrong;

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    gap: "20px",
                  }}
                >
                  {/* TEXT */}
                  <div
                    className="unit4-audio-control"
                    style={{ flex: 1, fontSize: "18px" }}
                  >
                    <span
                      role="button"
                      tabIndex={0}
                      className="unit4-interactive"
                      onClick={() =>
                        playAudio(`sentence-${i}`, SENTENCE_AUDIO[i])
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(`sentence-${i}`, SENTENCE_AUDIO[i]);
                        }
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `sentence-${i}`}
                      />
                      <span style={{ fontWeight: "bold" }}>{i + 1}</span>{" "}
                      {q.text}
                    </span>
                    <br />
                    <span
                      role="button"
                      tabIndex={0}
                      className="unit4-audio-control unit4-interactive"
                      onClick={() => playAudio(`its-${i}`, itsAudio)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(`its-${i}`, itsAudio);
                        }
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `its-${i}`}
                      />
                      It’s
                    </span>{" "}
                    <div
                      id={`${i}`}
                      style={{
                        display: "inline-block",
                        borderBottom:
                          showCorrect && isWordWrong
                            ? "2px solid red"
                            : "1px solid",
                        minWidth: "120px",
                        // fontWeight: "bold",
                        position: "relative",
                        marginLeft: "8px",
                      }}
                    >
                      <select
                        value={answers[i]}
                        disabled={lockedWords.includes(i)}
                        onChange={(e) => {
                          const updated = [...answers];
                          updated[i] = e.target.value;
                          setAnswers(updated);
                          clearWrongAspect(i, "wordWrong");
                        }}
                        style={{
                          border: "none",
                          // fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        <option value="">Choose</option>
                        {wordBank.map((word) => (
                          <option key={word} value={word}>
                            {word}
                          </option>
                        ))}
                      </select>
                      {showCorrect && isWordWrong && (
                        <span
                          style={{
                            position: "absolute",
                            right: "-10px",
                            top: "0px",
                          }}
                        >
                          <WrongIcon />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* IMAGE */}
                  <ImageDrop
                    i={i}
                    registerTarget={keyboard.registerTarget}
                    editable={
                      !lockedImages.includes(i) && imageNumbers[i] != null
                    }
                    preview={
                      keyboard.keyboardTargetId === `image-${i}`
                        ? keyboard.keyboardItemId?.split("-")[1]
                        : ""
                    }
                    onKeyDown={(event) => {
                      if (
                        !keyboard.keyboardItemId &&
                        imageNumbers[i] != null &&
                        !lockedImages.includes(i) &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        const removed = imageNumbers[i];
                        setImageNumbers((previous) =>
                          previous.map((value, index) =>
                            index === i ? null : value,
                          ),
                        );
                        clearWrongAspect(i, "imageWrong");
                        keyboard.focusItem(`num-${removed}`);
                        return;
                      }
                      keyboard.handleTargetKeyDown(event, `image-${i}`);
                    }}
                  >
                    <img
                      src={images[i]}
                      alt={
                        [
                          "Children playing among autumn leaves",
                          "A spring scene with flowers and baby birds",
                          "Children playing in winter snow",
                          "Children playing sports on a hot summer day",
                        ][i]
                      }
                      style={{
                        width: "auto",
                        height: "100px",
                        objectFit: "contain",
                        borderRadius: "12px",
                      }}
                    />
                    {showCorrect && isImageWrong && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-2px",
                          right: "11px",
                        }}
                      >
                        <WrongIcon />
                      </span>
                    )}
                    <div
                      onClick={() => {
                        if (lockedImages.includes(i)) return;
                        const updated = [...imageNumbers];
                        updated[i] = null;
                        setImageNumbers(updated);
                        clearWrongAspect(i, "imageWrong");
                      }}
                      style={{
                        position: "absolute",
                        right: "8px",
                        bottom: "8px",
                        width: "40px",
                        height: "40px",
                        // background: "white",
                        // border: "2px solid orange",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",

                        fontSize: "20px",
                        color: showCorrect && isImageWrong ? "red" : "black",
                      }}
                    >
                      {imageNumbers[i]}
                    </div>
                  </ImageDrop>
                </div>
              );
            })}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="action-buttons-container">
          <button onClick={resetAll} className="try-again-button">
            Start Again ↻
          </button>
          <button onClick={showAnswers} className="show-answer-btn">
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>
    </DndContext>
  );
};

export default Review4_Page1_Q1;
