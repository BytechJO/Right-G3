import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4TabDrag from "../../StudentPages/unit4/useUnit4TabDrag";
import "../../StudentPages/unit4/unit4Interactions.css";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/A.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/A.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/A.3.svg";
import helenAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise A/Item_001_Helen.mp3";
import stellaAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise A/Item_002_Stella.mp3";
import harleyAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise A/Item_003_Harley.mp3";
import johnAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise A/Item_004_John.mp3";
import hanselAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise A/Item_005_Hansel.mp3";
import tomAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise A/Item_006_Tom.mp3";
import firstQuestionAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise A/Item_007_What_is_the_first_name.mp3";
import fourthQuestionAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise A/Item_008_What_is_the_fourth_name.mp3";
import thirdQuestionAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise A/Item_009_What_is_the_third_name.mp3";
import sixthQuestionAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise A/Item_010_What_is_the_sixth_name.mp3";

const NAME_BANK = ["Helen", "Stella", "John", "Harley", "Tom", "Hansel"];
const CORRECT_ORDER = ["Hansel", "Harley", "Helen", "John", "Stella", "Tom"];

const NAME_IMGS = {
  Hansel: img1,
  Harley: img2,
  Helen: img3,
};
const NAME_AUDIO = {
  Helen: helenAudio,
  Stella: stellaAudio,
  Harley: harleyAudio,
  John: johnAudio,
  Hansel: hanselAudio,
  Tom: tomAudio,
};
const QUESTION_AUDIO = {
  1: firstQuestionAudio,
  2: fourthQuestionAudio,
  3: sixthQuestionAudio,
  4: thirdQuestionAudio,
};
function DraggableName({
  name,
  disabled,
  style,
  register,
  active,
  onClick,
  onKeyDown,
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: name,
    disabled,
  });

  const dragStyle = {
    // transform: transform
    //   ? `translate(${transform.x}px, ${transform.y}px)`
    //   : undefined,
    cursor: disabled ? "not-allowed" : "grab",
  };

  return (
    <span
      ref={(element) => {
        setNodeRef(element);
        register(element);
      }}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className="unit4-audio-control unit4-interactive px-4 py-1 rounded-full text-[17px] border border-[#f39b42]"
      style={{
        ...dragStyle,
        ...style,
        touchAction: "none",
        // background: "#f3f4f6",
        // color: "#374151",
      }}
    >
      <Unit4PlayingAudioIcon active={active} />
      {name}
    </span>
  );
}

function DroppableSlot({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transition: "0.2s",
        transform: isOver ? "scale(1.05)" : "scale(1)",
        width: "50%",
      }}
    >
      {children(isOver)}
    </div>
  );
}
const QUESTIONS = [
  { id: 1, question: "What is the first name?", answer: "Hansel" },
  { id: 2, question: "What is the fourth name?", answer: "John" },
  { id: 3, question: "What is the sixth name?", answer: "Tom" },
  { id: 4, question: "What is the third name?", answer: "Helen" },
  { id: 5, question: "Is Hansel first?", answer: "Yes, he is." },
  { id: 6, question: "Is Helen fifth?", answer: "No, she isn't." },
  { id: 7, question: "Is Stella third?", answer: "No, she isn't." },
  { id: 8, question: "Is Tom sixth?", answer: "Yes, he is." },
];

const YES_NO_OPTIONS = [
  "Yes, he is.",
  "No, he isn't.",
  "Yes, she is.",
  "No, she isn't.",
];

const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: -6,
      right: -6,
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
);

export default function WB_Unit6_Page33_Q1() {
  const [orderAnswers, setOrderAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  const [qAnswers, setQAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [wrongSlots, setWrongSlots] = useState({});
  const [wrongQIds, setWrongQIds] = useState({});
  const [activeDrag, setActiveDrag] = useState(null);
  const [shakeDrops, setShakeDrops] = useState(false);
  const [lockedSlots, setLockedSlots] = useState([]);
  const [lockedQIds, setLockedQIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );
  const usedNames = Object.values(orderAnswers).filter(Boolean);
  const tabDrag = useUnit4TabDrag({
    itemIds: NAME_BANK,
    targetIds: ["1", "2", "3", "4", "5", "6"],
    isItemDisabled: (id) => usedNames.includes(id) || showAns,
    isTargetDisabled: (id) => lockedSlots.includes(Number(id)) || showAns,
    onPick: (id) => playAudio(`name-${id}`, NAME_AUDIO[id]),
    onPlace: (name, slot) => applyDrop(Number(slot), name),
  });

  const applyDrop = (slot, name) => {
    if (showAns || lockedSlots.includes(slot)) return;
    const previousSlot = Object.keys(orderAnswers).find(
      (key) => orderAnswers[key] === name,
    );
    setOrderAnswers((previous) => {
      const updated = { ...previous };
      Object.keys(updated).forEach((key) => {
        if (updated[key] === name) updated[key] = "";
      });
      updated[slot] = name;
      return updated;
    });
    setWrongSlots((previous) => ({
      ...previous,
      [slot]: false,
      ...(previousSlot ? { [previousSlot]: false } : {}),
    }));
  };

  const handleQSelect = (id, val) => {
    if (showAns || lockedQIds.includes(id)) return;
    setQAnswers((prev) => ({ ...prev, [id]: val }));
    setWrongQIds((previous) => ({ ...previous, [id]: false }));
  };

  const handleCheck = () => {
    if (
      showAns ||
      (lockedSlots.length === CORRECT_ORDER.length &&
        lockedQIds.length === QUESTIONS.length)
    )
      return;

    const allOrder = Object.values(orderAnswers).every(Boolean);
    const allQ = QUESTIONS.every((q) => qAnswers[q.id]);
    if (!allOrder || !allQ) {
      ValidationAlert.info("Please answer all questions first! ✏️");
      return;
    }

    const newWrongSlots = {};
    Object.entries(orderAnswers).forEach(([slot, name]) => {
      if (name !== CORRECT_ORDER[+slot - 1]) newWrongSlots[slot] = true;
    });

    const newWrongQIds = {};
    QUESTIONS.forEach((q) => {
      if (qAnswers[q.id] !== q.answer) newWrongQIds[q.id] = true;
    });

    setWrongSlots(newWrongSlots);
    setWrongQIds(newWrongQIds);
    setChecked(true);
    setLockedSlots((previous) => [
      ...new Set([
        ...previous,
        ...CORRECT_ORDER.flatMap((name, index) =>
          orderAnswers[index + 1] === name ? [index + 1] : [],
        ),
      ]),
    ]);
    setLockedQIds((previous) => [
      ...new Set([
        ...previous,
        ...QUESTIONS.filter(
          (question) => qAnswers[question.id] === question.answer,
        ).map((question) => question.id),
      ]),
    ]);
    setShowAns(false);

    const correct =
      6 -
      Object.keys(newWrongSlots).length +
      (QUESTIONS.length - Object.keys(newWrongQIds).length);
    const total = 6 + QUESTIONS.length;

    if (correct === total) {
      ValidationAlert.success(`Score :${correct} / ${total}`);
    } else if (correct > 0) {
      ValidationAlert.warning(`Score :${correct} / ${total}`);
    } else {
      ValidationAlert.error(`Score :${correct} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    // تعبئة الترتيب
    const newOrder = {};
    CORRECT_ORDER.forEach((name, i) => {
      newOrder[i + 1] = name;
    });

    // تعبئة الأسئلة
    const newQ = {};
    QUESTIONS.forEach((q) => {
      newQ[q.id] = q.answer;
    });

    setOrderAnswers(newOrder);
    setQAnswers(newQ);

    // مهم جداً
    setChecked(false); // حتى ما يظهر ❌
    setShowAns(true); // لتفعيل وضع عرض الإجابة

    setWrongSlots({});
    setWrongQIds({});
    setLockedSlots([1, 2, 3, 4, 5, 6]);
    setLockedQIds(QUESTIONS.map((question) => question.id));
    tabDrag.cancel();
    stopAudio();
  };

  const handleReset = () => {
    setOrderAnswers({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
    setQAnswers({});
    setChecked(false);
    setShowAns(false);
    setWrongSlots({});
    setWrongQIds({});
    setLockedSlots([]);
    setLockedQIds([]);
    tabDrag.cancel();
    stopAudio();
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => {
        setActiveDrag(event.active.id);
      }}
      onDragEnd={(event) => {
        const { active, over } = event;
        setActiveDrag(null);

        if (over) applyDrop(Number(over.id), active.id);
        else {
          setShakeDrops(false);
          window.requestAnimationFrame(() => setShakeDrops(true));
        }
      }}
    >
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "18px" }}>
          <ExerciseHeader
            sectionLetter="A"
            title="Write the names in ABC order. Answer the questions."
            subTitle="Identify each names into alphabetical order and the related ordinal questions before dragging it, then place one item at a time and review every target before checking."
          />

          {/* Word Bank */}
          <div className="w-full">
            <div className="flex flex-wrap gap-2 justify-center p-3 rounded-2xl w-full">
              {NAME_BANK.map((name) => {
                const isUsed = usedNames.includes(name);

                return (
                  <DraggableName
                    key={name}
                    name={name}
                    disabled={isUsed}
                    register={(element) => tabDrag.registerItem(name, element)}
                    active={activeAudioKey === `name-${name}`}
                    onClick={(event) => {
                      if (event.detail > 0)
                        playAudio(`name-${name}`, NAME_AUDIO[name]);
                    }}
                    onKeyDown={(event) => {
                      if (event.key !== "Enter" && event.key !== " ") return;
                      event.preventDefault();
                      if (isUsed || showAns)
                        playAudio(`name-${name}`, NAME_AUDIO[name]);
                      else tabDrag.pickItem(name);
                    }}
                    style={{
                      opacity: isUsed ? 0.4 : 1,
                    }}
                  />
                );
              })}
            </div>

            {/* ── الجزء الأول: الترتيب ── */}
            <div
              className={shakeDrops ? "unit4-invalid-selection-shake" : ""}
              onAnimationEnd={() => setShakeDrops(false)}
              style={{ display: "flex", gap: "50px" }}
            >
              {/* 🔹 العمود الأول: الصور */}
              <div className="flex flex-col">
                {[1, 2, 3].map((slot) => {
                  const name = CORRECT_ORDER[slot - 1]; // ترتيب الصور ثابت

                  return (
                    <img
                      src={NAME_IMGS[name]}
                      alt={`Portrait of ${name}`}
                      style={{ width: "auto", height: 120 }}
                    />
                  );
                })}
              </div>

              {/* 🔹 العمود الثاني: الأرقام + drop areas */}
              <div className="flex flex-col justify-between gap-4 flex-1 w-full">
                {[1, 2, 3, 4, 5, 6].map((slot) => (
                  <div key={slot} className="flex items-center gap-3 w-full">
                    <span className="font-bold text-gray-600 w-4 text-xl">
                      {slot}
                    </span>

                    <DroppableSlot id={String(slot)}>
                      {(isOver) => (
                        <div
                          ref={(element) =>
                            tabDrag.registerTarget(String(slot), element)
                          }
                          onClick={() => {
                            if (
                              showAns ||
                              lockedSlots.includes(slot) ||
                              !orderAnswers[slot]
                            )
                              return;
                            const removedName = orderAnswers[slot];
                            setOrderAnswers((prev) => ({
                              ...prev,
                              [slot]: "",
                            }));
                            setWrongSlots((previous) => ({
                              ...previous,
                              [slot]: false,
                            }));
                            tabDrag.focusItem(removedName);
                          }}
                          onKeyDown={(event) => {
                            if (tabDrag.keyboardItemId != null)
                              tabDrag.handleTargetKeyDown(event, String(slot));
                            else if (
                              (event.key === "Enter" || event.key === " ") &&
                              orderAnswers[slot] &&
                              !lockedSlots.includes(slot)
                            ) {
                              event.preventDefault();
                              const removedName = orderAnswers[slot];
                              setOrderAnswers((previous) => ({
                                ...previous,
                                [slot]: "",
                              }));
                              setWrongSlots((previous) => ({
                                ...previous,
                                [slot]: false,
                              }));
                              tabDrag.focusItem(removedName);
                            }
                          }}
                          role="button"
                          tabIndex={
                            showAns || lockedSlots.includes(slot)
                              ? -1
                              : tabDrag.keyboardItemId !== null ||
                                  orderAnswers[slot]
                                ? 0
                                : -1
                          }
                          aria-disabled={lockedSlots.includes(slot) || showAns}
                          className="unit4-interactive"
                          style={{
                            flex: 1,
                            minHeight: 36,
                            borderBottom: `1px solid ${isOver ? "#f59e0b" : wrongSlots[slot] ? "red" : "#464646ff"}`,
                            // borderRadius: 12,
                            background: isOver ? "#fff7ed" : "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            cursor: "pointer",
                            transition: "0.2s ease",
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "#374151",
                            width: "100%",
                          }}
                        >
                          <span
                            className={
                              tabDrag.keyboardItemId != null &&
                              tabDrag.keyboardTargetId === String(slot)
                                ? "unit4-keyboard-preview"
                                : ""
                            }
                          >
                            {tabDrag.keyboardItemId != null &&
                            tabDrag.keyboardTargetId === String(slot)
                              ? tabDrag.keyboardItemId
                              : orderAnswers[slot]}
                          </span>

                          {checked && wrongSlots[slot] && <ErrorBadge />}
                        </div>
                      )}
                    </DroppableSlot>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* ── الجزء الثاني: الأسئلة ── */}
            <div
              className="grid grid-cols-1 gap-3 mt-3"
              style={{ gridTemplateColumns: "1fr 1fr" }}
            >
              {QUESTIONS.map((q) => {
                const value = qAnswers[q.id] || "";

                // تحديد الخيارات حسب نوع السؤال
                const options = q.id <= 4 ? CORRECT_ORDER : YES_NO_OPTIONS;

                const isWrong = checked && !showAns && wrongQIds[q.id];

                return (
                  <div key={q.id} className="flex flex-col gap-1 w-[70%]">
                    <p
                      className={
                        QUESTION_AUDIO[q.id]
                          ? "unit4-audio-control unit4-interactive text-lg text-gray-800"
                          : "text-lg text-gray-800"
                      }
                      role={QUESTION_AUDIO[q.id] ? "button" : undefined}
                      tabIndex={QUESTION_AUDIO[q.id] ? 0 : undefined}
                      onClick={() =>
                        playAudio(`question-${q.id}`, QUESTION_AUDIO[q.id])
                      }
                      onKeyDown={(event) => {
                        if (
                          QUESTION_AUDIO[q.id] &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          playAudio(`question-${q.id}`, QUESTION_AUDIO[q.id]);
                        }
                      }}
                      style={{ position: "relative" }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `question-${q.id}`}
                      />
                      <span className="text-[xl] mr-2">{q.id}</span>
                      {q.question}
                    </p>

                    <div style={{ position: "relative", width: "100%" }}>
                      <select
                        value={value}
                        disabled={showAns || lockedQIds.includes(q.id)}
                        onChange={(e) => handleQSelect(q.id, e.target.value)}
                        style={{
                          padding: "6px 10px",
                          // borderRadius: "10px",
                          borderBottom: `1px solid ${
                            isWrong ? "red" : "#374151"
                          }`,
                          fontSize: "16px",
                          background: "#fff",
                          color: "#374151",
                          minWidth: "160px",
                          cursor:
                            showAns || lockedQIds.includes(q.id)
                              ? "default"
                              : "pointer",
                          width: "100%",
                        }}
                      >
                        <option value="" disabled>
                          Select
                        </option>

                        {options.map((op) => (
                          <option key={op} value={op}>
                            {op}
                          </option>
                        ))}
                      </select>

                      {/* ❌ إشارة الخطأ */}
                      {isWrong && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-6px",
                            right: "-6px",
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
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              checkAnswers={handleCheck}
              handleStartAgain={handleReset}
              handleShowAnswer={handleShowAnswer}
            />
          </div>
          <DragOverlay>
            {activeDrag ? (
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{
                  background: "#fff",
                  border: "1.5px solid #f39b42",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              >
                {activeDrag}
              </span>
            ) : null}
          </DragOverlay>
        </div>
      </div>
    </DndContext>
  );
}
