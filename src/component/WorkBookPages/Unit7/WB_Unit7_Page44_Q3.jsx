import React, { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4TabDrag from "../../StudentPages/unit4/useUnit4TabDrag";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import netAudio from "../../../assets/audio/WorkBook/unit7/Page 44 - Exercise C/Item_001_n_t.mp3";
import bagAudio from "../../../assets/audio/WorkBook/unit7/Page 44 - Exercise C/Item_002_b_g.mp3";
import figAudio from "../../../assets/audio/WorkBook/unit7/Page 44 - Exercise C/Item_003_f_g.mp3";
import tentAudio from "../../../assets/audio/WorkBook/unit7/Page 44 - Exercise C/Item_004_t_n.mp3";
import legAudio from "../../../assets/audio/WorkBook/unit7/Page 44 - Exercise C/Item_005_l_g.mp3";
import bedAudio from "../../../assets/audio/WorkBook/unit7/Page 44 - Exercise C/Item_006_b_d.mp3";
import hatAudio from "../../../assets/audio/WorkBook/unit7/Page 44 - Exercise C/Item_007_h_t.mp3";
import gumAudio from "../../../assets/audio/WorkBook/unit7/Page 44 - Exercise C/Item_008_g_m.mp3";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/6.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/7.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/8.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/9.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/10.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/11.svg";
import img7 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/12.svg";
import img8 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/13.svg";

const BORDER_COLOR = "#e0e0e0";
const ACTIVE_COLOR = "#f39b42";
const WRONG_COLOR = "red";
const RED_COLOR = "#d62828";

const BOXES = [
  {
    id: 1,
    word: ["n", "t"],
    missingLetter: "e",
    options: ["a", "e", "i"],
    correctImgId: 3,
    audio: netAudio,
  },
  {
    id: 2,
    word: ["b", "g"],
    missingLetter: "a",
    options: ["a", "e", "u"],
    correctImgId: 6,
    audio: bagAudio,
  },
  {
    id: 3,
    word: ["f", "g"],
    missingLetter: "i",
    options: ["o", "i", "e"],
    correctImgId: 7,
    audio: figAudio,
  },
  {
    id: 4,
    word: ["t", "n"],
    missingLetter: "e",
    options: ["a", "e", "i"],
    correctImgId: 4,
    audio: tentAudio,
  },
  {
    id: 5,
    word: ["l", "g"],
    missingLetter: "e",
    options: ["u", "e", "a"],
    correctImgId: 2,
    audio: legAudio,
  },
  {
    id: 6,
    word: ["b", "d"],
    missingLetter: "e",
    options: ["e", "a", "u"],
    correctImgId: 1,
    audio: bedAudio,
  },
  {
    id: 7,
    word: ["h", "t"],
    missingLetter: "a",
    options: ["a", "i", "u"],
    correctImgId: 5,
    audio: hatAudio,
  },
  {
    id: 8,
    word: ["g", "m"],
    missingLetter: "u",
    options: ["o", "u", "a"],
    correctImgId: 8,
    audio: gumAudio,
  },
];
const DRAG_IMAGES = [
  { id: 1, img: img1, alt: "A bed" },
  { id: 2, img: img2, alt: "A leg" },
  { id: 3, img: img3, alt: "A net" },
  { id: 4, img: img4, alt: "A tent" },
  { id: 5, img: img5, alt: "A hat" },
  { id: 6, img: img6, alt: "A bag" },
  { id: 7, img: img7, alt: "A fig" },
  { id: 8, img: img8, alt: "Chewing gum" },
];

function DraggableImage({ item, isUsed, showAns, register, pick }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: item.id,
    disabled: isUsed || showAns,
  });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(String(item.id), element);
      }}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={isUsed || showAns ? -1 : 0}
      aria-disabled={isUsed || showAns}
      aria-label={`${item.alt}, press Enter or Space to pick up`}
      onKeyDown={(event) => {
        if (
          !isUsed &&
          !showAns &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          event.stopPropagation();
          pick();
        }
      }}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        touchAction: "none",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={item.img}
        alt={item.alt}
        style={{
          width: "80%",
          height: "80%",
          objectFit: "contain",
          display: "block",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
}
function DropBox({
  box,
  imgSrc,
  imgAlt,
  previewSrc,
  previewAlt,
  wrong,
  imgId,
  locked,
  handleRemove,
  renderWord,
  register,
  onKeyDown,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `box-${box.id}`,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "clamp(4px,0.5vw,7px)",
      }}
    >
      <div className="flex w-full">
        <span
          style={{
            fontSize: "clamp(14px,1.7vw,22px)",
            fontWeight: 700,
            color: "#111",
            lineHeight: 1,
          }}
        >
          {box.id}
        </span>
        <div className="flex flex-col items-center gap-5 w-full">
          <div
            ref={(element) => {
              setNodeRef(element);
              register(`box-${box.id}`, element);
            }}
            onClick={() => handleRemove(box.id)}
            onKeyDown={onKeyDown}
            role="button"
            tabIndex={
              !locked && (Boolean(imgId) || Boolean(previewSrc)) ? 0 : -1
            }
            aria-disabled={locked}
            aria-label={`Picture box ${box.id}${imgAlt ? `, ${imgAlt}` : ", empty"}`}
            className={`unit4-drop-target unit4-interactive ${previewSrc && !imgSrc ? "unit4-keyboard-preview" : ""}`}
            style={{
              position: "relative",
              width: "80%",
              aspectRatio: "1 / 1",
              border: `2px solid ${
                wrong ? WRONG_COLOR : isOver ? ACTIVE_COLOR : BORDER_COLOR
              }`,
              borderRadius: "clamp(8px,1vw,14px)",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: imgId && !locked ? "pointer" : "default",
              boxSizing: "border-box",
              overflow: "visible",
              transition: "border-color 0.2s",
            }}
          >
            {(imgSrc || previewSrc) && (
              <img
                src={imgSrc || previewSrc}
                alt={imgSrc ? imgAlt : previewAlt}
                style={{
                  width: "85%",
                  height: "85%",
                  objectFit: "contain",
                  display: "block",
                  userSelect: "none",
                  pointerEvents: "none",
                  opacity: imgSrc ? 1 : 0.55,
                }}
              />
            )}

            {wrong && (
              <div
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
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

                  zIndex: 5,
                  pointerEvents: "none",
                }}
              >
                ✕
              </div>
            )}
          </div>
          {renderWord(box)}
        </div>
      </div>
    </div>
  );
}

export default function WB_MissingLetter_PageC() {
  const [boxAnswers, setBoxAnswers] = useState({});
  const [showAns, setShowAns] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [letterAnswers, setLetterAnswers] = useState({});
  const [lockedImageIds, setLockedImageIds] = useState([]);
  const [lockedLetterIds, setLockedLetterIds] = useState([]);
  const [wrongImageIds, setWrongImageIds] = useState([]);
  const [wrongLetterIds, setWrongLetterIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const usedImgIds = useMemo(
    () => Object.values(boxAnswers).filter(Boolean),
    [boxAnswers],
  );

  const applyDrop = (boxId, imgId) => {
    if (showAns || lockedImageIds.includes(Number(boxId))) return;
    const numericImgId = Number(imgId);
    const updated = { ...boxAnswers };

    Object.keys(updated).forEach((k) => {
      if (updated[k] === numericImgId) delete updated[k];
    });

    updated[boxId] = numericImgId;

    setBoxAnswers(updated);
    setWrongImageIds((previous) =>
      previous.filter((id) => id !== Number(boxId)),
    );
  };
  const keyboard = useUnit4TabDrag({
    itemIds: DRAG_IMAGES.map((item) => String(item.id)),
    targetIds: BOXES.map((box) => `box-${box.id}`),
    isItemDisabled: (id) => usedImgIds.includes(Number(id)) || showAns,
    isTargetDisabled: (id) =>
      lockedImageIds.includes(Number(String(id).replace("box-", ""))) ||
      showAns,
    onPlace: (itemId, targetId) =>
      applyDrop(Number(String(targetId).replace("box-", "")), Number(itemId)),
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over || showAns) return;

    const imgId = active.id;
    const boxId = Number(over.id.replace("box-", ""));

    applyDrop(boxId, imgId);
  };
  const handleRemove = (boxId) => {
    if (showAns || lockedImageIds.includes(boxId)) return;
    const removed = boxAnswers[boxId];

    setBoxAnswers((prev) => {
      const u = { ...prev };
      delete u[boxId];
      return u;
    });

    setWrongImageIds((previous) => previous.filter((id) => id !== boxId));
    if (removed) keyboard.focusItem(String(removed));
  };

  const handleCheck = () => {
    if (
      showAns ||
      (lockedImageIds.length === BOXES.length &&
        lockedLetterIds.length === BOXES.length)
    )
      return;

    const allImagesAnswered = BOXES.every((b) => boxAnswers[b.id]);

    const allLettersAnswered = BOXES.every((b) => letterAnswers[b.id]);

    if (!allImagesAnswered || !allLettersAnswered) {
      ValidationAlert.info("Please fill all answers first.");
      return;
    }

    const correctImages = BOXES.flatMap((b) =>
      boxAnswers[b.id] === b.correctImgId ? [b.id] : [],
    );
    const correctLetters = BOXES.flatMap((b) =>
      letterAnswers[b.id] === b.missingLetter ? [b.id] : [],
    );
    const incorrectImages = BOXES.flatMap((b) =>
      boxAnswers[b.id] !== b.correctImgId ? [b.id] : [],
    );
    const incorrectLetters = BOXES.flatMap((b) =>
      letterAnswers[b.id] !== b.missingLetter ? [b.id] : [],
    );
    const score = correctImages.length + correctLetters.length;

    setLockedImageIds(correctImages);
    setLockedLetterIds(correctLetters);
    setWrongImageIds(incorrectImages);
    setWrongLetterIds(incorrectLetters);

    const total = BOXES.length * 2;

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const correctImages = {};
    const correctLetters = {};

    BOXES.forEach((b) => {
      correctImages[b.id] = b.correctImgId;
      correctLetters[b.id] = b.missingLetter;
    });

    setBoxAnswers(correctImages);
    setLetterAnswers(correctLetters);

    setShowAns(true);
    setLockedImageIds(BOXES.map((box) => box.id));
    setLockedLetterIds(BOXES.map((box) => box.id));
    setWrongImageIds([]);
    setWrongLetterIds([]);
    keyboard.cancel();
    stopAudio();
  };
  const handleReset = () => {
    setBoxAnswers({});
    setLetterAnswers({});
    setShowAns(false);
    setActiveId(null);
    setLockedImageIds([]);
    setLockedLetterIds([]);
    setWrongImageIds([]);
    setWrongLetterIds([]);
    keyboard.cancel();
    stopAudio();
  };

  const isWrong = (boxId) => {
    return wrongImageIds.includes(boxId);
  };

  const renderWord = (box) => {
    const [before, after] = box.word;

    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={`Play the word for picture ${box.id}`}
        className="unit4-audio-control unit4-interactive"
        onClick={() => playAudio(`word-${box.id}`, box.audio)}
        onKeyDown={(event) => {
          if (
            event.target === event.currentTarget &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            playAudio(`word-${box.id}`, box.audio);
          }
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          fontSize: "clamp(14px,2vw,24px)",
          fontWeight: 600,
          color: "#111",
          lineHeight: 1,
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
        }}
      >
        <Unit4PlayingAudioIcon active={activeAudioKey === `word-${box.id}`} />
        <span>{before}</span>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <select
            value={letterAnswers[box.id] || ""}
            disabled={showAns || lockedLetterIds.includes(box.id)}
            onChange={(e) => {
              setLetterAnswers((prev) => ({
                ...prev,
                [box.id]: e.target.value,
              }));
              setWrongLetterIds((previous) =>
                previous.filter((id) => id !== box.id),
              );
            }}
            style={{
              width: "clamp(38px,4vw,52px)",
              height: "clamp(28px,3vw,40px)",
              // borderRadius: "6px",
              borderBottom: `2px solid ${
                wrongLetterIds.includes(box.id) ? WRONG_COLOR : BORDER_COLOR
              }`,
              fontSize: "clamp(14px,1.8vw,20px)",
              fontWeight: 700,
              textAlign: "center",
              background: "#fff",
              cursor:
                showAns || lockedLetterIds.includes(box.id)
                  ? "default"
                  : "pointer",
            }}
          >
            <option value=""></option>

            {box.options.map((letter) => (
              <option key={letter} value={letter}>
                {letter}
              </option>
            ))}
          </select>

          {/* Wrong badge */}
          {wrongLetterIds.includes(box.id) && (
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

                zIndex: 5,
                pointerEvents: "none",
              }}
            >
              ✕
            </div>
          )}
        </div>

        <span>{after}</span>
      </div>
    );
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => setActiveId(event.active.id)}
      onDragEnd={handleDragEnd}
    >
      <div className="main-container-component">
        <div
          className="div-forall"
          style={{
            gap: "25px",
          }}
        >
          <ExerciseHeader
            sectionLetter="C"
            title="Write the missing letter for the pictures below. Then draw the pictures in the correct boxes."
            subTitle="Complete the missing beginning letter and the picture in the correct box first, then use the finished word to decide what belongs in each drawing box."
          />
          <div className="flex flex-col gap-10">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "35px",
                width: "100%",
              }}
            >
              {[BOXES.slice(0, 4), BOXES.slice(4, 8)].map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, minmax(0,1fr))",
                    gap: "clamp(10px,1.5vw,18px)",
                    width: "100%",
                  }}
                >
                  {row.map((box) => {
                    const wrong = isWrong(box.id);

                    const imgId = boxAnswers[box.id];

                    const imgSrc = imgId
                      ? DRAG_IMAGES.find((d) => d.id === imgId)?.img
                      : null;
                    const imgAlt = imgId
                      ? DRAG_IMAGES.find((d) => d.id === imgId)?.alt
                      : "";
                    const previewItem =
                      keyboard.keyboardTargetId === `box-${box.id}`
                        ? DRAG_IMAGES.find(
                            (item) =>
                              String(item.id) === keyboard.keyboardItemId,
                          )
                        : null;

                    return (
                      <DropBox
                        key={box.id}
                        box={box}
                        imgSrc={imgSrc}
                        imgAlt={imgAlt}
                        previewSrc={previewItem?.img}
                        previewAlt={previewItem?.alt || ""}
                        wrong={wrong}
                        imgId={imgId}
                        locked={lockedImageIds.includes(box.id) || showAns}
                        handleRemove={handleRemove}
                        renderWord={renderWord}
                        register={keyboard.registerTarget}
                        onKeyDown={(event) => {
                          if (
                            !keyboard.keyboardItemId &&
                            imgId &&
                            !lockedImageIds.includes(box.id) &&
                            (event.key === "Enter" || event.key === " ")
                          ) {
                            event.preventDefault();
                            handleRemove(box.id);
                            return;
                          }
                          keyboard.handleTargetKeyDown(event, `box-${box.id}`);
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, minmax(0,1fr))",
                gap: "clamp(6px,1vw,12px)",
                width: "100%",
                border: `2px solid ${ACTIVE_COLOR}`,
                borderRadius: "clamp(10px,1.2vw,16px)",
                padding: "clamp(8px,1vw,14px)",
                boxSizing: "border-box",
                background: "#fff",
              }}
            >
              {DRAG_IMAGES.map((item) => {
                const isUsed = usedImgIds.includes(item.id);
                const selected = activeId === item.id;

                return (
                  <div
                    key={item.id}
                    style={{
                      position: "relative",
                      aspectRatio: "1 / 1",
                      border: `2px solid ${
                        selected ? ACTIVE_COLOR : BORDER_COLOR
                      }`,
                      borderRadius: "clamp(8px,1vw,12px)",
                      background: isUsed ? "#f3f4f6" : "#fafafa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: isUsed || showAns ? "not-allowed" : "grab",
                      opacity: isUsed ? 0.45 : 1,
                      touchAction: "none",
                      transition: "0.2s ease",
                      transform: selected ? "scale(1.06)" : "scale(1)",
                      boxSizing: "border-box",
                      userSelect: "none",
                    }}
                  >
                    <DraggableImage
                      item={item}
                      isUsed={isUsed}
                      showAns={showAns}
                      register={keyboard.registerItem}
                      pick={() => keyboard.pickItem(String(item.id))}
                    />
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "clamp(6px,1vw,12px)",
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
      </div>
      <DragOverlay>
        {activeId ? (
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "10px",
              background: "#fff",
              border: `2px solid ${ACTIVE_COLOR}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src={DRAG_IMAGES.find((d) => d.id === activeId)?.img}
              alt={
                DRAG_IMAGES.find((d) => d.id === activeId)?.alt ||
                "Dragged picture"
              }
              style={{
                width: "80%",
                height: "80%",
                objectFit: "contain",
              }}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
