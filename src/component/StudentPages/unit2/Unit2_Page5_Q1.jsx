import React, { useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import Button from "../../Button";
import WrongMark from "../../WrongMark";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex A 3.svg";
import ExerciseHeader from "../../ExerciseHeader";
import Unit2PlayingAudioIcon from "./Unit2PlayingAudioIcon";
import useUnit2Audio from "./useUnit2Audio";
import useUnit2TabDrag from "./useUnit2TabDrag";
import "./unit2Interactions.css";
import bugAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A1/Item_001_bug.mp3";
import glueAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A1/Item_002_glue.mp3";
import tuneAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A1/Item_003_tune.mp3";
const Unit2_Page5_Q1 = () => {
  const questions = [
    { image: img1, answer: "glue", alt: "A bottle of glue" },
    { image: img2, answer: "tune", alt: "A musical note representing a tune" },
    { image: img3, answer: "bug", alt: "A red and black ladybug" },
  ];

  const wordBank = [
    { id: "bug", text: "bug", audio: bugAudio },
    { id: "glue", text: "glue", audio: glueAudio },
    { id: "tune", text: "tune", audio: tuneAudio },
  ];

  const [answers, setAnswers] = useState(questions.map(() => ""));
  const [wrongInputs, setWrongInputs] = useState([]);
  const [correctTargets, setCorrectTargets] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shakeRow, setShakeRow] = useState(false);
  const pointerStateRef = useRef({});
  const { activeAudioKey, playAudio, stopAudio } = useUnit2Audio();

  const usedWords = answers.filter(Boolean);

  const placeWord = (wordId, qIndex) => {
    if (showAnswer || correctTargets.includes(qIndex)) return;
    setAnswers((prev) => {
      const copy = [...prev];
      copy.forEach((value, index) => {
        if (value === wordId) copy[index] = "";
      });
      copy[qIndex] = wordId;
      return copy;
    });
    setWrongInputs((prev) => prev.filter((item) => item !== `${qIndex}`));
  };

  const keyboard = useUnit2TabDrag({
    itemIds: wordBank.map((word) => word.id),
    targetIds: questions.map((_, index) => `drop-${index}`),
    isItemDisabled: (id) => usedWords.includes(id) || showAnswer,
    isTargetDisabled: (id) =>
      correctTargets.includes(Number(id.replace("drop-", ""))) || showAnswer,
    onPick: (id) => {
      const word = wordBank.find((item) => item.id === id);
      playAudio(`word-${id}`, word?.audio);
    },
    onPlace: (wordId, targetId) =>
      placeWord(wordId, Number(targetId.replace("drop-", ""))),
  });

  const onDragEnd = (result) => {
    if (!result.destination || showAnswer) {
      setShakeRow(false);
      window.requestAnimationFrame(() => setShakeRow(true));
      return;
    }

    const { draggableId, destination } = result;

    if (destination.droppableId.startsWith("drop-")) {
      placeWord(
        draggableId,
        Number(destination.droppableId.replace("drop-", "")),
      );
    } else {
      setShakeRow(false);
      window.requestAnimationFrame(() => setShakeRow(true));
    }
  };

  const checkAnswers = () => {
    if (showAnswer || correctTargets.length === questions.length) return;

    if (answers.some((a) => a === "")) {
      ValidationAlert.info();
      return;
    }

    let wrong = [];
    let score = 0;
    const total = questions.length;

    questions.forEach((q, qIndex) => {
      const selectedWord =
        wordBank.find((w) => w.id === answers[qIndex])?.text || "";

      if (selectedWord === q.answer) score++;
      else wrong.push(`${qIndex}`);
    });

    setWrongInputs(wrong);
    setCorrectTargets(
      questions.flatMap((q, qIndex) =>
        answers[qIndex] === q.answer ? [qIndex] : [],
      ),
    );

    const msg = `Score: ${score} / ${total}`;
    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers(
      questions.map((q) => wordBank.find((w) => w.text === q.answer)?.id || ""),
    );
    setWrongInputs([]);
    setCorrectTargets(questions.map((_, index) => index));
    setShowAnswer(true);
    keyboard.cancel();
    stopAudio();
  };

  const reset = () => {
    setAnswers(questions.map(() => ""));
    setWrongInputs([]);
    setCorrectTargets([]);
    setShowAnswer(false);
    setShakeRow(false);
    keyboard.cancel();
    stopAudio();
  };

  const removeAnswer = (qIndex) => {
    if (showAnswer || correctTargets.includes(qIndex)) return;

    setAnswers((prev) => {
      const copy = [...prev];
      copy[qIndex] = "";
      return copy;
    });

    setWrongInputs((prev) => prev.filter((item) => item !== `${qIndex}`));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall">
          <ExerciseHeader
            sectionLetter="A"
            questionNumber="1"
            title="Look and write."
            subTitle="Match each word or answer to its target first, then drag it into place and check the snap position."
          />

          <div className="mt-2 flex flex-col gap-5">
            <Droppable droppableId="word-bank" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex gap-16 p-3 rounded-xl justify-center mb-6"
                >
                  {wordBank.map((w, i) => {
                    const isUsed = usedWords.includes(w.id);

                    return (
                      <Draggable
                        key={w.id}
                        draggableId={w.id}
                        index={i}
                        isDragDisabled={showAnswer || isUsed}
                      >
                        {(provided) => (
                          <span
                            ref={(element) => {
                              provided.innerRef(element);
                              keyboard.registerItem(w.id, element);
                            }}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            role="button"
                            tabIndex={0}
                            aria-disabled={showAnswer || isUsed}
                            aria-label={`${w.text}${isUsed ? ", already placed; press to hear" : ", press to pick up"}`}
                            className="unit2-audio-control unit2-drag-item px-4 py-1 rounded-lg border-1 border-[#2c5287] font-bold bg-white text-sm cursor-grab select-none"
                            onPointerDownCapture={(event) => {
                              pointerStateRef.current[w.id] = {
                                x: event.clientX,
                                y: event.clientY,
                                moved: false,
                              };
                            }}
                            onPointerMoveCapture={(event) => {
                              const state = pointerStateRef.current[w.id];
                              if (!state) return;
                              if (
                                Math.hypot(
                                  event.clientX - state.x,
                                  event.clientY - state.y,
                                ) > 5
                              ) {
                                state.moved = true;
                              }
                            }}
                            onClick={(event) => {
                              if (event.detail === 0) return;
                              if (pointerStateRef.current[w.id]?.moved) return;
                              playAudio(`word-${w.id}`, w.audio);
                            }}
                            onKeyDown={(event) => {
                              if (event.key !== "Enter" && event.key !== " ")
                                return;
                              event.preventDefault();
                              event.stopPropagation();
                              if (isUsed || showAnswer)
                                playAudio(`word-${w.id}`, w.audio);
                              else keyboard.pickItem(w.id);
                            }}
                            style={{
                              padding: "6px 30px",
                              border: "1px solid #f39b42",
                              borderRadius: "10px",
                              background: "#fff",
                              fontWeight: "bold",
                              fontSize: "20px",
                              cursor: isUsed ? "not-allowed" : "grab",
                              opacity: isUsed ? 0.4 : 1, // 🔥 فاتح
                              ...provided.draggableProps.style,
                            }}
                          >
                            {w.text}
                            <Unit2PlayingAudioIcon
                              active={activeAudioKey === `word-${w.id}`}
                            />
                          </span>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <div
              className={`flex justify-center gap-20 mt-10 ${
                shakeRow ? "unit2-invalid-drop-shake" : ""
              }`}
              onAnimationEnd={() => setShakeRow(false)}
            >
              {questions.map((q, qIndex) => (
                <div key={qIndex} className="flex flex-col items-center gap-3">
                  {/* حاوية الصورة + الرقم */}
                  <div className="relative">
                    {/* الرقم على زاوية الصورة */}
                    <span className="absolute -top-2 -left-4 font-bold text-lg">
                      {qIndex + 1}
                    </span>

                    {/* الصورة */}
                    <img
                      src={q.image}
                      alt={q.alt}
                      style={{
                        width: "20vw",
                        height: "20vh",
                        objectFit: "contain",
                        marginBottom: "20px",
                      }}
                    />

                    <Droppable
                      droppableId={`drop-${qIndex}`}
                      isDropDisabled={
                        showAnswer || correctTargets.includes(qIndex)
                      }
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={(element) => {
                            provided.innerRef(element);
                            keyboard.registerTarget(`drop-${qIndex}`, element);
                          }}
                          {...provided.droppableProps}
                          role="button"
                          tabIndex={
                            !showAnswer &&
                            !correctTargets.includes(qIndex) &&
                            (keyboard.keyboardItemId || answers[qIndex])
                              ? 0
                              : -1
                          }
                          aria-disabled={
                            showAnswer || correctTargets.includes(qIndex)
                          }
                          onClick={() =>
                            answers[qIndex] && removeAnswer(qIndex)
                          }
                          onKeyDown={(event) => {
                            if (
                              !keyboard.keyboardItemId &&
                              answers[qIndex] &&
                              (event.key === "Enter" || event.key === " ")
                            ) {
                              event.preventDefault();
                              removeAnswer(qIndex);
                              return;
                            }
                            keyboard.handleTargetKeyDown(
                              event,
                              `drop-${qIndex}`,
                            );
                          }}
                          className={`unit2-drop-target w-full min-h-10 flex items-center justify-center text-center text-[18px] font-semibold px-1 relative ${
                            snapshot.isDraggingOver
                              ? "bg-orange-100 border-b border-orange-500"
                              : ""
                          }`}
                          style={{
                            borderBottom: wrongInputs.includes(`${qIndex}`)
                              ? "2px solid red"
                              : "1px solid #000",
                          }}
                        >
                          <span
                            className={`${answers[qIndex] && !showAnswer && !correctTargets.includes(qIndex) ? "hover:text-red-500" : ""} ${keyboard.keyboardTargetId === `drop-${qIndex}` ? "unit2-keyboard-preview" : ""}`}
                            style={{
                              fontWeight: answers[qIndex] ? "bold" : "normal",
                              cursor: answers[qIndex] ? "pointer" : "default",
                            }}
                          >
                            {keyboard.keyboardTargetId === `drop-${qIndex}`
                              ? wordBank.find(
                                  (w) => w.id === keyboard.keyboardItemId,
                                )?.text
                              : wordBank.find((w) => w.id === answers[qIndex])
                                  ?.text || ""}
                          </span>

                          {provided.placeholder}

                          {wrongInputs.includes(`${qIndex}`) && <WrongMark />}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Button
        handleShowAnswer={showAnswers}
        handleStartAgain={reset}
        checkAnswers={checkAnswers}
      />
    </DragDropContext>
  );
};

export default Unit2_Page5_Q1;
