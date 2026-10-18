/* eslint-disable react-refresh/only-export-components */
import React, { useRef, useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";

import imgShower from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex B 1.svg";
import imgBike from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex B 2.svg";
import imgSoccer from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex B 3.svg";
import imgFlowers from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex B 4.svg";
import WrongMark from "../../WrongMark";
import ExerciseHeader from "../../ExerciseHeader";
import Unit2PlayingAudioIcon from "./Unit2PlayingAudioIcon";
import useUnit2Audio from "./useUnit2Audio";
import useUnit2TabDrag from "./useUnit2TabDrag";
import "./unit2Interactions.css";
import taxiAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise B/Item_001_take_a_taxi.mp3";
import subwayAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise B/Item_002_take_the_subway.mp3";
import busAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise B/Item_003_take_a_bus.mp3";
import bikeAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise B/Item_004_ride_a_bike.mp3";

const ACTIVITIES = [
  { id: "act4", text: "take a taxi.", audio: taxiAudio },
  { id: "act1", text: "take the subway.", audio: subwayAudio },
  { id: "act3", text: "take a bus.", audio: busAudio },
  { id: "act2", text: "ride a bike.", audio: bikeAudio },
];

const CORRECT_ANSWERS = {
  q1: "act1",
  q2: "act2",
  q3: "act3",
  q4: "act4",
};

function DraggableActivity({
  item,
  isUsed,
  registerItem,
  onKeyboardPick,
  onPlayAudio,
  activeAudio,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled: isUsed });
  const pointerStart = useRef(null);
  const pointerMoved = useRef(false);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isUsed ? 0.5 : 1,
  };
  return (
    <button
      type="button"
      ref={(element) => {
        setNodeRef(element);
        registerItem(item.id, element);
      }}
      style={{ ...style, touchAction: "none" }}
      {...attributes}
      {...listeners}
      aria-disabled={isUsed}
      onPointerDownCapture={(event) => {
        pointerStart.current = { x: event.clientX, y: event.clientY };
        pointerMoved.current = false;
      }}
      onPointerMoveCapture={(event) => {
        if (!pointerStart.current) return;
        if (
          Math.hypot(
            event.clientX - pointerStart.current.x,
            event.clientY - pointerStart.current.y,
          ) > 5
        ) {
          pointerMoved.current = true;
        }
      }}
      onClick={(event) => {
        if (event.detail === 0 || pointerMoved.current) return;
        onPlayAudio();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        if (isUsed) onPlayAudio();
        else onKeyboardPick();
      }}
      className={`unit2-audio-control unit2-drag-item p-2 bg-white border-1 border-gray-200 rounded-xl shadow-sm cursor-grab text-[#f39b42] text-[18px] text-center ${isUsed ? "bg-gray-50 text-gray-300" : "hover:border-orange-400 hover:shadow-md transition-all"}`}
    >
      {item.text}
      <Unit2PlayingAudioIcon active={activeAudio} />
    </button>
  );
}

function DropSlot({
  id,
  content,
  isCorrect,
  isSubmitted,
  onRemove,
  locked,
  wrong,
  preview,
  tabIndex,
  registerTarget,
  onKeyDown,
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const borderColor = isSubmitted
    ? isCorrect
      ? "border-black"
      : "border-red-500"
    : isOver
      ? "border-orange-400 bg-orange-50"
      : "border-black";
  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        registerTarget(id, element);
      }}
      role="button"
      tabIndex={tabIndex}
      aria-disabled={locked}
      onKeyDown={onKeyDown}
      onClick={() => content && !locked && onRemove()}
      className={`unit2-drop-target w-full min-h-10 border-b-1 flex items-center justify-center px-2 transition-all ${borderColor}`}
    >
      {content ? (
        <div className="relative flex items-center justify-center">
          <span
            className={`text-[18px] text-center cursor-pointer ${
              locked ? "" : "hover:text-red-500"
            } ${preview ? "unit2-keyboard-preview" : ""}`}
          >
            {preview || ACTIVITIES.find((a) => a.id === content)?.text}
          </span>

          {/* ❌ إذا الجواب غلط */}
          {wrong && (
            <div className="absolute -right-4">
              <WrongMark />
            </div>
          )}
        </div>
      ) : preview ? (
        <span className="unit2-keyboard-preview text-[18px]">{preview}</span>
      ) : (
        <span className="text-gray-300 italic text-xs">
          Drop answer here...
        </span>
      )}
    </div>
  );
}

const Unit2_Page5_Q3 = () => {
  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null,
    q8: null,
  });
  const [activeId, setActiveId] = useState(null);
  const [correctTargets, setCorrectTargets] = useState([]);
  const [wrongTargets, setWrongTargets] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shakeGrid, setShakeGrid] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit2Audio();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor),
  );

  const usedActivities = Object.values(answers).filter(Boolean);

  const placeActivity = (activityId, questionId) => {
    if (showAnswer || correctTargets.includes(questionId)) return;
    setAnswers((previous) => {
      const next = { ...previous };
      Object.keys(next).forEach((key) => {
        if (next[key] === activityId) next[key] = null;
      });
      next[questionId] = activityId;
      return next;
    });
    setWrongTargets((previous) =>
      previous.filter((target) => target !== questionId),
    );
  };

  const keyboard = useUnit2TabDrag({
    itemIds: ACTIVITIES.map((activity) => activity.id),
    targetIds: Object.keys(CORRECT_ANSWERS),
    isItemDisabled: (id) => usedActivities.includes(id) || showAnswer,
    isTargetDisabled: (id) => correctTargets.includes(id) || showAnswer,
    onPick: (id) => {
      const activity = ACTIVITIES.find((item) => item.id === id);
      playAudio(`activity-${id}`, activity?.audio);
    },
    onPlace: placeActivity,
  });

  const checkAnswers = () => {
    if (
      showAnswer ||
      correctTargets.length === Object.keys(CORRECT_ANSWERS).length
    )
      return;

    const unanswered = Object.keys(CORRECT_ANSWERS).filter(
      (id) => !answers[id],
    );
    if (unanswered.length > 0) {
      ValidationAlert.info();
      return;
    }
    let score = 0;
    let total = Object.keys(CORRECT_ANSWERS).length;
    Object.keys(CORRECT_ANSWERS).forEach((id) => {
      if (answers[id] === CORRECT_ANSWERS[id]) score++;
    });
    const nextCorrect = Object.keys(CORRECT_ANSWERS).filter(
      (id) => answers[id] === CORRECT_ANSWERS[id],
    );
    setCorrectTargets(nextCorrect);
    setWrongTargets(
      Object.keys(CORRECT_ANSWERS).filter(
        (id) => answers[id] !== CORRECT_ANSWERS[id],
      ),
    );
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };
  const removeAnswer = (questionId) => {
    if (showAnswer || correctTargets.includes(questionId)) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: null,
    }));
    setWrongTargets((previous) =>
      previous.filter((target) => target !== questionId),
    );
  };
  const handleReset = () => {
    setAnswers({
      q1: null,
      q2: null,
      q3: null,
      q4: null,
      q5: null,
      q6: null,
      q7: null,
      q8: null,
    });
    setCorrectTargets([]);
    setWrongTargets([]);
    setShowAnswer(false);
    setShakeGrid(false);
    setActiveId(null);
    keyboard.cancel();
    stopAudio();
  };

  const QUESTIONS = [
    { id: "q1", img: imgShower },
    { id: "q2", img: imgBike },
    { id: "q3", img: imgSoccer },
    { id: "q4", img: imgFlowers },
  ];

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragCancel={() => setActiveId(null)}
      onDragEnd={(e) => {
        const { active, over } = e;

        // إذا مو فوق drop area حقيقية
        if (!over || !QUESTIONS.some((q) => q.id === over.id)) {
          setActiveId(null);
          setShakeGrid(false);
          window.requestAnimationFrame(() => setShakeGrid(true));
          return;
        }

        placeActivity(String(active.id), String(over.id));

        setActiveId(null);
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div
          className="div-forall"
          style={
            {
              // gap: "45px",
            }
          }
        >
          <ExerciseHeader
            sectionLetter="B"
            title="Look, read, and write. Use the words below."
            subTitle="Match each word or answer to its target first, then drag it into place and check the snap position."
          />
          <div className="flex flex-col lg:flex-row gap-8 items-center w-full">
            <div className="flex-1 p-5 rounded-2xl border-1 border-gray-200 h-fit sticky top-4">
              <h3 className="font-bold text-[#f39b42] mb-4 text-center">
                Activities Bank
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <SortableContext items={ACTIVITIES.map((a) => a.id)}>
                  {ACTIVITIES.map((act) => (
                    <DraggableActivity
                      key={act.id}
                      item={act}
                      isUsed={usedActivities.includes(act.id) || showAnswer}
                      registerItem={keyboard.registerItem}
                      onKeyboardPick={() => keyboard.pickItem(act.id)}
                      onPlayAudio={() =>
                        playAudio(`activity-${act.id}`, act.audio)
                      }
                      activeAudio={activeAudioKey === `activity-${act.id}`}
                    />
                  ))}
                </SortableContext>
              </div>
            </div>

            <div
              className={`flex-3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 ${
                shakeGrid ? "unit2-invalid-drop-shake" : ""
              }`}
              onAnimationEnd={() => setShakeGrid(false)}
            >
              {QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-3">
                  <img
                    src={q.img}
                    alt={
                      q.id === "q1"
                        ? "People waiting beside a subway train"
                        : q.id === "q2"
                          ? "A person riding a bicycle"
                          : q.id === "q3"
                            ? "Children riding on a bus"
                            : "Passengers riding in a taxi"
                    }
                    className="max-h-32 object-contain rounded-lg"
                  />

                  <DropSlot
                    id={q.id}
                    content={answers[q.id]}
                    isCorrect={answers[q.id] === CORRECT_ANSWERS[q.id]}
                    isSubmitted={wrongTargets.includes(q.id)}
                    wrong={wrongTargets.includes(q.id)}
                    locked={showAnswer || correctTargets.includes(q.id)}
                    registerTarget={keyboard.registerTarget}
                    tabIndex={
                      !showAnswer &&
                      !correctTargets.includes(q.id) &&
                      (keyboard.keyboardItemId || answers[q.id])
                        ? 0
                        : -1
                    }
                    preview={
                      keyboard.keyboardTargetId === q.id
                        ? ACTIVITIES.find(
                            (item) => item.id === keyboard.keyboardItemId,
                          )?.text
                        : ""
                    }
                    onRemove={() => removeAnswer(q.id)}
                    onKeyDown={(event) => {
                      if (
                        !keyboard.keyboardItemId &&
                        answers[q.id] &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        removeAnswer(q.id);
                        return;
                      }
                      keyboard.handleTargetKeyDown(event, q.id);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            handleShowAnswer={() => {
              setAnswers(CORRECT_ANSWERS);
              setCorrectTargets(Object.keys(CORRECT_ANSWERS));
              setWrongTargets([]);
              setShowAnswer(true);
              setActiveId(null);
              keyboard.cancel();
              stopAudio();
            }}
            handleStartAgain={handleReset}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="p-2 bg-white border-2 border-orange-500 rounded-xl shadow-2xl text-orange-700 font-bold text-[15px] scale-105">
            {ACTIVITIES.find((a) => a.id === activeId).text}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit2_Page5_Q3;
