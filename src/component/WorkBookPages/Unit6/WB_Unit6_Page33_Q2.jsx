import React, { useEffect, useRef, useState } from "react";
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
// ─── استبدل هذه المسارات بمساراتك الحقيقية ──────────────────
import imgCar1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/B.1.svg";
import imgCar2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/B.1.svg";
import imgCar3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/B.1.svg";
import imgMedals from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/B.2.svg";
import secondAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise B/Item_001_second.mp3";
import blueAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise B/Item_002_blue.mp3";
import firstAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise B/Item_003_first.mp3";
import redAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise B/Item_004_red.mp3";
import thirdAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise B/Item_005_third.mp3";
import orangeAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise B/Item_006_orange.mp3";
import theAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise B/Item_007_The.mp3";
import carIsInAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise B/Item_008_car_is_in.mp3";
import placeAudio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise B/Item_009_place.mp3";
import full1Audio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise B/full1.mp3";
import full2Audio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise B/full2.mp3";
import full3Audio from "../../../assets/audio/WorkBook/unit6/Page 33 - Exercise B/full3.mp3";
// ─────────────────────────────────────────────────────────────

// ─── ألوان الفرشاة ───────────────────────────────────────────
const BRUSH_COLORS = [
  { name: "red", hex: "#ef4444" },
  { name: "blue", hex: "#3b82f6" },
  { name: "orange", hex: "#f97316" },
  { name: "green", hex: "#22c55e" },
  { name: "yellow", hex: "#eab308" },
  { name: "purple", hex: "#a855f7" },
  { name: "pink", hex: "#ec4899" },
  { name: "brown", hex: "#92400e" },
];

// ─── بيانات الجمل ────────────────────────────────────────────
const SENTENCES = [
  {
    id: 1,
    parts: [
      { type: "text", value: "The " },
      { type: "slot", slotId: "1-color", answer: "red" },
      { type: "text", value: " car is in " },
      { type: "slot", slotId: "1-place", answer: "second" },
      { type: "text", value: " place." },
    ],
  },
  {
    id: 2,
    parts: [
      { type: "text", value: "The " },
      { type: "slot", slotId: "2-color", answer: "blue" },
      { type: "text", value: " car is in " },
      { type: "slot", slotId: "2-place", answer: "first" },
      { type: "text", value: " place." },
    ],
  },
  {
    id: 3,
    parts: [
      { type: "text", value: "The " },
      { type: "slot", slotId: "3-color", answer: "orange" },
      { type: "text", value: " car is in " },
      { type: "slot", slotId: "3-place", answer: "third" },
      { type: "text", value: " place." },
    ],
  },
];

const WORD_BANK_WORDS = ["second", "blue", "first", "red", "third", "orange"];
const WORD_AUDIO = {
  second: secondAudio,
  blue: blueAudio,
  first: firstAudio,
  red: redAudio,
  third: thirdAudio,
  orange: orangeAudio,
};
const FIXED_AUDIO = [theAudio, carIsInAudio, placeAudio];
const FULL_AUDIO = { 1: full1Audio, 2: full2Audio, 3: full3Audio };

function DraggableWord({
  word,
  disabled,
  register,
  onClick,
  onKeyDown,
  active,
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: word,
    disabled,
  });

  const style = {
    // transform: transform
    //   ? `translate(${transform.x}px, ${transform.y}px)`
    //   : undefined,
    cursor: disabled ? "not-allowed" : "grab",
    touchAction: "none",
    opacity: disabled ? 0.4 : 1,
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
      style={style}
    >
      <Unit4PlayingAudioIcon active={active} />
      {word}
    </span>
  );
}

function DroppableSlot({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: isOver ? "scale(1.05)" : "scale(1)",
        transition: "0.2s",
      }}
    >
      {children(isOver)}
    </div>
  );
}
const processSvgForColoring = (svgContent) => {
  if (!svgContent) return svgContent;

  let modified = svgContent;

  modified = modified.replace(/<style>[\s\S]*?<\/style>/g, (styleTag) => {
    return styleTag.replace(/fill:\s*[^;]*;?/g, "fill: currentColor;");
  });

  modified = modified.replace(/fill="[^"]*"/g, 'fill="currentColor"');

  return modified;
};
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
function ColorableSVG({
  svgSrc,
  id,
  colors,
  setColors,
  activeItem,
  setActiveItem,
}) {
  const [processedSvg, setProcessedSvg] = useState("");
  const carRef = useRef(null);
  const colorRefs = useRef([]);

  useEffect(() => {
    if (activeItem === id) {
      window.requestAnimationFrame(() => {
        colorRefs.current[0]?.focus({ preventScroll: true });
      });
    }
  }, [activeItem, id]);

  useEffect(() => {
    fetch(svgSrc)
      .then((res) => res.text())
      .then((data) => {
        setProcessedSvg(processSvgForColoring(data));
      });
  }, [svgSrc]);

  const handleColorSelect = (color) => {
    setColors((prev) => ({ ...prev, [id]: color }));
    setActiveItem(null);
    window.requestAnimationFrame(() =>
      carRef.current?.focus({ preventScroll: true }),
    );
  };

  return (
    <div
      ref={carRef}
      onClick={(event) => {
        if (event.target.closest("button")) return;
        setActiveItem(id);
      }}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Escape") {
          event.preventDefault();
          setActiveItem(null);
        } else if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setActiveItem(id);
        }
      }}
      role="button"
      tabIndex={0}
      className="unit4-interactive"
      aria-label={`Select race car ${id.replace("car", "")} for coloring`}
      style={{
        width: 200,
        height: 120,
        cursor: "pointer",
        position: "relative",
        border: activeItem === id ? "2px solid #333" : "1.5px solid #e2e8f0",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
      }}
    >
      {/* SVG */}
      {processedSvg && (
        <div
          style={{
            width: "100%",
            height: "100%",
            color: colors[id] || "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          dangerouslySetInnerHTML={{ __html: processedSvg }}
        />
      )}

      {/* 🎨 Palette */}
      {activeItem === id && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            display: "flex",
            gap: 6,
            background: "#fff",
            padding: 6,
            borderRadius: 10,
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            zIndex: 10,
          }}
        >
          {BRUSH_COLORS.map((c) => (
            <button
              type="button"
              key={c.name}
              ref={(element) => {
                colorRefs.current[BRUSH_COLORS.indexOf(c)] = element;
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleColorSelect(c.hex);
              }}
              onKeyDown={(event) => {
                event.stopPropagation();
                if (event.key === "Escape") {
                  event.preventDefault();
                  setActiveItem(null);
                  window.requestAnimationFrame(() =>
                    carRef.current?.focus({ preventScroll: true }),
                  );
                }
              }}
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: c.hex,
                cursor: "pointer",
                border: "2px solid #fff",
                padding: 0,
              }}
              aria-label={`Color this car ${c.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
// ─── المكوّن الرئيسي ──────────────────────────────────────────
export default function WB_Unit6_Page33_Q2() {
  const [activeDrag, setActiveDrag] = useState(null);
  const [shakeDrops, setShakeDrops] = useState(false);
  const [colors, setColors] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  // drag & drop
  const [slots, setSlots] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [wrongIds, setWrongIds] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const usedWords = Object.values(slots).filter(Boolean);
  const allSlotIds = SENTENCES.flatMap((sentence) =>
    sentence.parts
      .filter((part) => part.type === "slot")
      .map((part) => part.slotId),
  );
  const tabDrag = useUnit4TabDrag({
    itemIds: WORD_BANK_WORDS,
    targetIds: allSlotIds,
    isItemDisabled: (id) => usedWords.includes(id) || showAns,
    isTargetDisabled: (id) => lockedIds.includes(id) || showAns,
    onPick: (id) => playAudio(`word-${id}`, WORD_AUDIO[id]),
    onPlace: (word, slotId) => applyDrop(word, slotId),
  });

  const applyDrop = (word, slotId) => {
    if (showAns || lockedIds.includes(slotId)) return;
    const previousSlot = Object.keys(slots).find((key) => slots[key] === word);
    setSlots((previous) => {
      const updated = { ...previous };
      Object.keys(updated).forEach((key) => {
        if (updated[key] === word) updated[key] = null;
      });
      updated[slotId] = word;
      return updated;
    });
    setWrongIds((previous) => ({
      ...previous,
      [slotId]: false,
      ...(previousSlot ? { [previousSlot]: false } : {}),
    }));
  };

  // ── Check ──
  const handleCheck = () => {
    if (showAns || lockedIds.length === allSlotIds.length) return;
    if (!allSlotIds.every((id) => slots[id])) {
      ValidationAlert.info("Please fill all the blanks first! ✏️");
      return;
    }
    const newWrong = {};
    let correct = 0;
    SENTENCES.forEach((s) =>
      s.parts
        .filter((p) => p.type === "slot")
        .forEach((p) => {
          if (slots[p.slotId] === p.answer) correct++;
          else newWrong[p.slotId] = true;
        }),
    );
    setWrongIds(newWrong);
    setChecked(true);
    setLockedIds((previous) => [
      ...new Set([
        ...previous,
        ...SENTENCES.flatMap((sentence) =>
          sentence.parts
            .filter(
              (part) =>
                part.type === "slot" && slots[part.slotId] === part.answer,
            )
            .map((part) => part.slotId),
        ),
      ]),
    ]);
    setShowAns(false);
    const total = allSlotIds.length;
    if (correct === total)
      ValidationAlert.success(`Score :${correct} / ${total}`);
    else if (correct > 0)
      ValidationAlert.warning(`Score :${correct} / ${total}`);
    else ValidationAlert.error(`Score :${correct} / ${total}`);
  };

  // ── Show Answer ──
  const handleShowAnswer = () => {
    const newSlots = {};
    SENTENCES.forEach((s) =>
      s.parts
        .filter((p) => p.type === "slot")
        .forEach((p) => {
          newSlots[p.slotId] = p.answer;
        }),
    );
    setSlots(newSlots);
    setWrongIds({});
    setChecked(false);
    setShowAns(true);
    setLockedIds(allSlotIds);
    tabDrag.cancel();
    stopAudio();
  };

  // ── Reset ──
  const handleReset = () => {
    setSlots({});
    setChecked(false);
    setShowAns(false);
    setWrongIds({});
    setLockedIds([]);
    tabDrag.cancel();
    stopAudio();

    // 👇 هاي المهمة
    setColors({});
    setActiveItem(null);
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

        if (over) applyDrop(active.id, over.id);
        else {
          setShakeDrops(false);
          window.requestAnimationFrame(() => setShakeDrops(true));
        }
      }}
    >
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: 40 }}>
          {/* ── العنوان ── */}
          <ExerciseHeader
            sectionLetter="B"
            title="Read, color, and complete."
            subTitle="Use the picture and ordinal clues to color the cars by place and color, then complete each sentence after the visual is finished."
          />

          {/* ── السيارات للتلوين ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            <ColorableSVG
              svgSrc={imgCar1}
              id="car1"
              colors={colors}
              setColors={setColors}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />

            <ColorableSVG
              svgSrc={imgCar2}
              id="car2"
              colors={colors}
              setColors={setColors}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />

            <ColorableSVG
              svgSrc={imgCar3}
              id="car3"
              colors={colors}
              setColors={setColors}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          </div>

          {/* ── بنك الكلمات ── */}
          <div className="flex flex-wrap gap-2 justify-center p-3 rounded-2xl">
            {WORD_BANK_WORDS.map((word) => {
              const isUsed = usedWords.includes(word);

              return (
                <DraggableWord
                  key={word}
                  word={word}
                  disabled={isUsed || showAns}
                  register={(element) => tabDrag.registerItem(word, element)}
                  active={activeAudioKey === `word-${word}`}
                  onClick={(event) => {
                    if (event.detail > 0)
                      playAudio(`word-${word}`, WORD_AUDIO[word]);
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    if (isUsed || showAns)
                      playAudio(`word-${word}`, WORD_AUDIO[word]);
                    else tabDrag.pickItem(word);
                  }}
                />
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "40px",
              width: "100%",
            }}
          >
            {/* ── صورة الميداليات ── */}
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <img
                src={imgMedals}
                alt="Gold, silver, and bronze medals labeled first, second, and third"
                style={{ height: 130, objectFit: "contain" }}
              />
            </div>
            {/* ── الجمل ── */}
            <div
              className={shakeDrops ? "unit4-invalid-selection-shake" : ""}
              onAnimationEnd={() => setShakeDrops(false)}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              {SENTENCES.map((sentence) => (
                <div
                  key={sentence.id}
                  className={
                    sentence.parts
                      .filter((part) => part.type === "slot")
                      .every((part) => lockedIds.includes(part.slotId))
                      ? "unit4-full-audio-enabled unit4-audio-control"
                      : ""
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    flexWrap: "wrap",
                    position: "relative",
                  }}
                  role={
                    sentence.parts
                      .filter((part) => part.type === "slot")
                      .every((part) => lockedIds.includes(part.slotId))
                      ? "button"
                      : undefined
                  }
                  tabIndex={
                    sentence.parts
                      .filter((part) => part.type === "slot")
                      .every((part) => lockedIds.includes(part.slotId))
                      ? 0
                      : undefined
                  }
                  onClick={() => {
                    const complete = sentence.parts
                      .filter((part) => part.type === "slot")
                      .every((part) => lockedIds.includes(part.slotId));
                    if (complete)
                      playAudio(`full-${sentence.id}`, FULL_AUDIO[sentence.id]);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      const complete = sentence.parts
                        .filter((part) => part.type === "slot")
                        .every((part) => lockedIds.includes(part.slotId));
                      if (complete) {
                        event.preventDefault();
                        playAudio(
                          `full-${sentence.id}`,
                          FULL_AUDIO[sentence.id],
                        );
                      }
                    }
                  }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `full-${sentence.id}`}
                  />
                  <span
                    style={{
                      fontWeight: 700,
                      // color: "#f97316",
                      fontSize: 20,
                      marginRight: 2,
                    }}
                  >
                    {sentence.id}
                  </span>

                  {sentence.parts.map((part, i) => {
                    if (part.type === "text") {
                      const audioIndex = i === 0 ? 0 : i === 2 ? 1 : 2;
                      return (
                        <span
                          key={i}
                          style={{
                            fontSize: 18,
                            color: "#1f2937",
                            position: "relative",
                            cursor: "pointer",
                            // fontWeight: 500,
                          }}
                          role="button"
                          tabIndex={0}
                          onClick={(event) => {
                            const complete = sentence.parts
                              .filter((entry) => entry.type === "slot")
                              .every((entry) =>
                                lockedIds.includes(entry.slotId),
                              );
                            if (complete) return;
                            event.stopPropagation();
                            playAudio(
                              `fixed-${sentence.id}-${i}`,
                              FIXED_AUDIO[audioIndex],
                            );
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              const complete = sentence.parts
                                .filter((entry) => entry.type === "slot")
                                .every((entry) =>
                                  lockedIds.includes(entry.slotId),
                                );
                              if (complete) return;
                              event.preventDefault();
                              event.stopPropagation();
                              playAudio(
                                `fixed-${sentence.id}-${i}`,
                                FIXED_AUDIO[audioIndex],
                              );
                            }
                          }}
                        >
                          <Unit4PlayingAudioIcon
                            active={
                              activeAudioKey === `fixed-${sentence.id}-${i}`
                            }
                          />
                          {part.value}
                        </span>
                      );
                    }

                    const word = slots[part.slotId];
                    return (
                      <DroppableSlot id={part.slotId}>
                        {(isOver) => (
                          <span
                            ref={(element) =>
                              tabDrag.registerTarget(part.slotId, element)
                            }
                            style={{
                              minWidth: 120,
                              minHeight: 34,
                              borderBottom: `2px solid ${
                                isOver
                                  ? "#f59e0b"
                                  : wrongIds[part.slotId]
                                    ? "red"
                                    : "#e5e7eb"
                              }`,
                              // borderRadius: 12,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: isOver ? "#fff7ed" : "#fff",
                              transition: "0.2s",
                              cursor: "pointer",
                              position: "relative",
                              padding: "0 10px",
                            }}
                            role="button"
                            tabIndex={
                              tabDrag.keyboardItemId != null ||
                              (word && !lockedIds.includes(part.slotId))
                                ? 0
                                : -1
                            }
                            aria-disabled={
                              lockedIds.includes(part.slotId) || showAns
                            }
                            onClick={() => {
                              if (
                                showAns ||
                                lockedIds.includes(part.slotId) ||
                                !word
                              )
                                return;
                              setSlots((prev) => ({
                                ...prev,
                                [part.slotId]: null,
                              }));
                              setWrongIds((prev) => ({
                                ...prev,
                                [part.slotId]: false,
                              }));
                              tabDrag.focusItem(word);
                            }}
                            onKeyDown={(event) => {
                              if (tabDrag.keyboardItemId != null)
                                tabDrag.handleTargetKeyDown(event, part.slotId);
                              else if (
                                (event.key === "Enter" || event.key === " ") &&
                                word &&
                                !lockedIds.includes(part.slotId)
                              ) {
                                event.preventDefault();
                                setSlots((prev) => ({
                                  ...prev,
                                  [part.slotId]: null,
                                }));
                                setWrongIds((prev) => ({
                                  ...prev,
                                  [part.slotId]: false,
                                }));
                                tabDrag.focusItem(word);
                              }
                            }}
                          >
                            <span
                              className={
                                tabDrag.keyboardItemId &&
                                tabDrag.keyboardTargetId === part.slotId
                                  ? "unit4-keyboard-preview"
                                  : ""
                              }
                            >
                              {tabDrag.keyboardItemId &&
                              tabDrag.keyboardTargetId === part.slotId
                                ? tabDrag.keyboardItemId
                                : slots[part.slotId]}
                            </span>

                            {checked && wrongIds[part.slotId] && <ErrorBadge />}
                          </span>
                        )}
                      </DroppableSlot>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <DragOverlay>
            {activeDrag ? (
              <span
                className="px-4 py-1 rounded-full text-[17px] border border-[#f39b42]"
                style={{
                  background: "#fff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              >
                {activeDrag}
              </span>
            ) : null}
          </DragOverlay>
          {/* ── الأزرار ── */}
          <div className="flex justify-center">
            <Button
              checkAnswers={handleCheck}
              handleStartAgain={handleReset}
              handleShowAnswer={handleShowAnswer}
            />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
