import React, { useMemo, useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  PointerSensor,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

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
    correctImgId:3,
  },
  {
    id: 2,
    word: ["b", "g"],
    missingLetter: "a",
    options: ["a", "e", "u"],
    correctImgId: 6,
  },
  {
    id: 3,
    word: ["f", "g"],
    missingLetter: "i",
    options: ["o", "i", "e"],
    correctImgId: 7,
  },
  {
    id: 4,
    word: ["t", "n"],
    missingLetter: "e",
    options: ["a", "e", "i"],
    correctImgId: 4,
  },
  {
    id: 5,
    word: ["l", "g"],
    missingLetter: "e",
    options: ["u", "e", "a"],
    correctImgId: 2,
  },
  {
    id: 6,
    word: ["b", "d"],
    missingLetter: "e",
    options: ["e", "a", "u"],
    correctImgId: 1,
  },
  {
    id: 7,
    word: ["h", "t"],
    missingLetter: "a",
    options: ["a", "i", "u"],
    correctImgId: 5,
  },
  {
    id: 8,
    word: ["g", "m"],
    missingLetter: "u",
    options: ["o", "u", "a"],
    correctImgId: 8,
  },
];
const DRAG_IMAGES = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
  { id: 6, img: img6 },
  { id: 7, img: img7 },
  { id: 8, img: img8 },
];

function DraggableImage({ item, isUsed, showAns }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: item.id,
    disabled: isUsed || showAns,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={item.img}
        alt={`drag-${item.id}`}
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
function DropBox({ box, imgSrc, wrong, imgId, handleRemove, renderWord }) {
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
        ref={setNodeRef}
        onClick={() => handleRemove(box.id)}
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
          cursor: imgId ? "pointer" : "default",
          boxSizing: "border-box",
          overflow: "visible",
          transition: "border-color 0.2s",
        }}
      >
        {imgSrc && (
          <img
            src={imgSrc}
            alt={`box-${box.id}`}
            style={{
              width: "85%",
              height: "85%",
              objectFit: "contain",
              display: "block",
              userSelect: "none",
              pointerEvents: "none",
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
        {renderWord(box)}</div>
</div>
    
    </div>
  );
}

export default function WB_MissingLetter_PageC() {
  const [boxAnswers, setBoxAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [letterAnswers, setLetterAnswers] = useState({});

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor),
  );

  const usedImgIds = useMemo(
    () => Object.values(boxAnswers).filter(Boolean),
    [boxAnswers],
  );

  const applyDrop = (boxId, imgId) => {
    const updated = { ...boxAnswers };

    Object.keys(updated).forEach((k) => {
      if (updated[k] === imgId) delete updated[k];
    });

    updated[boxId] = imgId;

    setBoxAnswers(updated);
    setChecked(false);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over || showAns) return;

    const imgId = active.id;
    const boxId = Number(over.id.replace("box-", ""));

    applyDrop(boxId, imgId);
  };
  const handleRemove = (boxId) => {
    if (showAns || checked) return;

    setBoxAnswers((prev) => {
      const u = { ...prev };
      delete u[boxId];
      return u;
    });

    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns || checked) return;

    const allImagesAnswered = BOXES.every((b) => boxAnswers[b.id]);

    const allLettersAnswered = BOXES.every((b) => letterAnswers[b.id]);

    if (!allImagesAnswered || !allLettersAnswered) {
      ValidationAlert.info("Please fill all answers first.");
      return;
    }

    let score = 0;

    BOXES.forEach((b) => {
      const correctImage = boxAnswers[b.id] === b.correctImgId;

      const correctLetter = letterAnswers[b.id] === b.missingLetter;

      if (correctImage) score++;
      if (correctLetter) score++;
    });

    setChecked(true);

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

    setChecked(true);
    setShowAns(true);
  };
  const handleReset = () => {
    setBoxAnswers({});
    setLetterAnswers({});
    setChecked(false);
    setShowAns(false);
    setActiveId(null);
  };

  const isWrong = (boxId) => {
    if (!checked || showAns) return false;

    const box = BOXES.find((b) => b.id === boxId);

    return boxAnswers[boxId] !== box.correctImgId;
  };

  const renderWord = (box) => {
    const [before, after] = box.word;

    return (
      <div
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
            disabled={showAns || checked}
            onChange={(e) => {
              setLetterAnswers((prev) => ({
                ...prev,
                [box.id]: e.target.value,
              }));
              setChecked(false);
            }}
            style={{
              width: "clamp(38px,4vw,52px)",
              height: "clamp(28px,3vw,40px)",
              // borderRadius: "6px",
              borderBottom: `2px solid ${
                checked &&
                !showAns &&
                letterAnswers[box.id] !== box.missingLetter
                  ? WRONG_COLOR
                  : BORDER_COLOR
              }`,
              fontSize: "clamp(14px,1.8vw,20px)",
              fontWeight: 700,
              textAlign: "center",
              outline: "none",
              background: "#fff",
              cursor: showAns || checked ? "default" : "pointer",
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
          {checked &&
            !showAns &&
            letterAnswers[box.id] &&
            letterAnswers[box.id] !== box.missingLetter && (
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
          <h1
            className="WB-header-title-page8"
            style={{
              alignItems: "start",
            }}
          >
            <span className="WB-ex-A">C</span>
            Write the missing letter for the pictures below. Then draw the
            pictures <br /> in the correct boxes.
          </h1>
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

                  return (
                    <DropBox
                      key={box.id}
                      box={box}
                      imgSrc={imgSrc}
                      wrong={wrong}
                      imgId={imgId}
                      handleRemove={handleRemove}
                      renderWord={renderWord}
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
                  draggable={!isUsed && !showAns}
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
                    cursor:
                      isUsed || showAns || checked ? "not-allowed" : "grab",
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
                    showAns={showAns || checked}
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
        </div></div>
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
              alt="drag-overlay"
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
