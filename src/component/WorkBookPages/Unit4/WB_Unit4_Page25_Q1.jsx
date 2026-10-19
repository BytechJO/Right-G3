import React, { useMemo, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4TabDrag from "../../StudentPages/unit4/useUnit4TabDrag";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import sentence1Audio from "../../../assets/audio/WorkBook/unit4/Page 25 - Exercise H/Item_001_It_is_January._It_is_cold._I_made_a_snowman.mp3";
import sentence2Audio from "../../../assets/audio/WorkBook/unit4/Page 25 - Exercise H/Item_002_It_is_June.mp3";

import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 3.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 1.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 4.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 2.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 5.svg";

const IMAGES = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
];

const SENTENCES = [
  { id: 1, text: "It is January. It is cold. I made a snowman.", correct: 2 },
  { id: 2, text: "It is June. It is sunny. They are in the park.", correct: 3 },
  { id: 3, text: "It is October. It is windy. We wear jackets.", correct: 5 },
  {
    id: 4,
    text: "It is April. It is rainy. We are under our umbrellas.",
    correct: 4,
  },
  {
    id: 5,
    text: "It is August. It is hot. They are at the beach.",
    correct: 1,
  },
];

const NUMBERS = [1, 2, 3, 4, 5];
const SENTENCE_AUDIO = { 1: null, 2: null };

export default function WB_Unit_Months_Page232_QH() {
  const [answers, setAnswers] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const usedNumbers = useMemo(() => Object.values(answers), [answers]);

  const assignNumber = (sentenceId, number) => {
    if (showAns || lockedIds.includes(sentenceId)) return;

    setAnswers((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((k) => {
        if (updated[k] === number && !lockedIds.includes(Number(k)))
          delete updated[k];
      });

      updated[sentenceId] = number;
      return updated;
    });
    setWrongIds((prev) => prev.filter((id) => id !== sentenceId));
  };
  const tabDrag = useUnit4TabDrag({
    itemIds: NUMBERS,
    targetIds: SENTENCES.map((sentence) => sentence.id),
    isItemDisabled: (num) => usedNumbers.includes(num),
    isTargetDisabled: (id) => lockedIds.includes(id),
    onPlace: (num, sentenceId) => assignNumber(sentenceId, num),
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const number = active.id;
    const sentenceId = Number(over.id);

    assignNumber(sentenceId, number);
  };

  // 🔥 Draggable Number
  const DraggableNumber = ({ num }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id: num,
      disabled: usedNumbers.includes(num) || showAns,
    });

    return (
      <div
        ref={(element) => {
          setNodeRef(element);
          tabDrag.registerItem(num, element);
        }}
        {...listeners}
        {...attributes}
        tabIndex={usedNumbers.includes(num) || showAns ? -1 : 0}
        role="button"
        aria-label={`Pick number ${num}`}
        aria-disabled={usedNumbers.includes(num) || showAns}
        onKeyDown={(event) => {
          if (
            (event.key === "Enter" || event.key === " ") &&
            !usedNumbers.includes(num) &&
            !showAns
          ) {
            event.preventDefault();
            tabDrag.pickItem(num);
          }
        }}
        style={{
          width: "clamp(38px, 5vw, 42px)",
          height: "clamp(38px, 5vw, 42px)",
          borderRadius: "50%",
          backgroundColor: usedNumbers.includes(num) ? "#d1d5db" : "#f29a1f",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          touchAction: "none",
          fontSize: "clamp(18px, 2.3vw, 21px)",
          cursor: "grab",
          opacity: isDragging ? 0.3 : usedNumbers.includes(num) ? 0.5 : 1,
        }}
      >
        {num}
      </div>
    );
  };

  // 🔥 Drop Box
  const DropBox = ({ sentenceId }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: sentenceId,
    });

    const value = answers[sentenceId] || "";
    const wrong = wrongIds.includes(sentenceId);

    return (
      <div
        ref={(element) => {
          setNodeRef(element);
          tabDrag.registerTarget(sentenceId, element);
        }}
        onClick={() => value && removeAnswer(sentenceId)}
        tabIndex={
          tabDrag.keyboardItemId != null ||
          (value && !lockedIds.includes(sentenceId))
            ? 0
            : -1
        }
        role="button"
        aria-label={`Number slot for sentence ${sentenceId}`}
        onKeyDown={(event) => {
          if (tabDrag.keyboardItemId != null)
            tabDrag.handleTargetKeyDown(event, sentenceId);
          else if (
            (event.key === "Enter" || event.key === " ") &&
            value &&
            !lockedIds.includes(sentenceId)
          ) {
            event.preventDefault();
            removeAnswer(sentenceId);
          }
        }}
        style={{
          width: "clamp(38px, 4.5vw, 45px)",
          height: "clamp(38px,4.5vw, 45px)",
          border: `1px solid ${wrong ? "red" : "#f29a1f"}`,
          borderRadius: "8px",
          background: "#fff",
          boxShadow:
            isOver ||
            (tabDrag.keyboardItemId != null &&
              tabDrag.keyboardTargetId === sentenceId)
              ? "0 0 0 4px rgba(243,155,66,0.35)"
              : "none",
          transform: isOver ? "scale(1.03)" : "scale(1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(18px, 2.4vw, 22px)",
          fontWeight: "500",
          position: "relative",
          transition: "0.2s",
          cursor:
            value && !lockedIds.includes(sentenceId) && !showAns
              ? "pointer"
              : "default",
        }}
      >
        {value}

        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "red",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              border: "2px solid #fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };
  const handleCheck = () => {
    if (showAns || lockedIds.length === SENTENCES.length) return;

    const allAnswered = SENTENCES.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    SENTENCES.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    const correctIds = SENTENCES.filter(
      (item) => answers[item.id] === item.correct,
    ).map((item) => item.id);
    setLockedIds((prev) => [...new Set([...prev, ...correctIds])]);
    setWrongIds(
      SENTENCES.filter((item) => answers[item.id] !== item.correct).map(
        (item) => item.id,
      ),
    );

    if (score === SENTENCES.length) {
      ValidationAlert.success(`Score: ${score} / ${SENTENCES.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${SENTENCES.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${SENTENCES.length}`);
    }
  };
  const removeAnswer = (sentenceId) => {
    if (showAns || lockedIds.includes(sentenceId)) return;

    const removed = answers[sentenceId];

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[sentenceId];
      return updated;
    });
    setWrongIds((prev) => prev.filter((id) => id !== sentenceId));
    if (removed) tabDrag.focusItem(removed);
  };
  const handleShowAnswer = () => {
    const filled = {};

    SENTENCES.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setLockedIds(SENTENCES.map((item) => item.id));
    setWrongIds([]);
    setShowAns(true);
    setActiveId(null); // مهم مع dnd-kit
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setLockedIds([]);
    setWrongIds([]);
    setShowAns(false);
    setActiveId(null); // reset drag
    stopAudio();
  };
  return (
    <DndContext
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragEnd={handleDragEnd}
    >
      <div className="main-container-component mb-10">
        <div className="div-forall" style={{ gap: "28px" }}>
          <ExerciseHeader
            sectionLetter="H"
            title="Look, read, and match."
            subTitle="Read all weather and month sentences to the correct scene clues first, then assign the numbers carefully so each picture is used correctly."
          />

          {/* 🔥 Images */}
          <div
            className=" w-full"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "34px", flexWrap: "wrap" }}>
              {IMAGES.slice(0, 2).map((item) => (
                <img
                  key={item.id}
                  src={item.img}
                  alt={`Weather and month scene ${item.id}`}
                  style={{ height: "160px" }}
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: "34px", flexWrap: "wrap" }}>
              {IMAGES.slice(2).map((item) => (
                <img
                  key={item.id}
                  src={item.img}
                  alt={`Weather and month scene ${item.id}`}
                  style={{ height: "160px" }}
                />
              ))}
            </div>
          </div>
          {/* 🔥 Numbers */}
          <div
            className=" w-full"
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {NUMBERS.map((num) => (
              <DraggableNumber key={num} num={num} />
            ))}
          </div>
          {/* 🔥 Sentences */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              maxWidth: "760px",
              // margin: "0 auto",
            }}
          >
            {SENTENCES.map((item) => (
              <div
                className=" w-full"
                key={item.id}
                style={{ display: "flex", gap: "14px", alignItems: "center" }}
              >
                <DropBox sentenceId={item.id} />
                <div
                  style={{
                    fontSize: "clamp(15px, 1.4vw, 18px)",
                    cursor: SENTENCE_AUDIO[item.id] ? "pointer" : "default",
                    position: "relative",
                  }}
                  role={SENTENCE_AUDIO[item.id] ? "button" : undefined}
                  tabIndex={SENTENCE_AUDIO[item.id] ? 0 : undefined}
                  onClick={() =>
                    SENTENCE_AUDIO[item.id] &&
                    playAudio(`sentence-${item.id}`, SENTENCE_AUDIO[item.id])
                  }
                  onKeyDown={(event) => {
                    if (
                      SENTENCE_AUDIO[item.id] &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      playAudio(`sentence-${item.id}`, SENTENCE_AUDIO[item.id]);
                    }
                  }}
                >
                  {SENTENCE_AUDIO[item.id] && (
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `sentence-${item.id}`}
                    />
                  )}
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button />
          </div>
        </div>

        {/* 🔥 Drag Overlay */}
        <DragOverlay>
          {activeId ? (
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#f39b42",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "22px",
              }}
            >
              {activeId}
            </div>
          ) : null}
        </DragOverlay>
        <Button
          checkAnswers={handleCheck}
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleReset}
        />
      </div>
    </DndContext>
  );
}
