import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import imgNut from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/6.svg";
import imgBag from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/7.svg";
import imgFig from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/8.svg";
import imgTen from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/9.svg";
import imgLog from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/10.svg";
import imgBed from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/11.svg";
import imgHat from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/12.svg";
import imgGum from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/13.svg";

const WORDS = [
  { id: "w1", before: "n", after: "t", answer: "u", img: imgNut, imgId: "img1" },
  { id: "w2", before: "b", after: "g", answer: "a", img: imgBag, imgId: "img2" },
  { id: "w3", before: "f", after: "g", answer: "i", img: imgFig, imgId: "img3" },
  { id: "w4", before: "t", after: "n", answer: "e", img: imgTen, imgId: "img4" },
  { id: "w5", before: "l", after: "g", answer: "o", img: imgLog, imgId: "img5" },
  { id: "w6", before: "b", after: "d", answer: "e", img: imgBed, imgId: "img6" },
  { id: "w7", before: "h", after: "t", answer: "a", img: imgHat, imgId: "img7" },
  { id: "w8", before: "g", after: "m", answer: "u", img: imgGum, imgId: "img8" },
];

const IMAGE_BANK = [
  { id: "img1", img: imgNut },
  { id: "img5", img: imgLog },
  { id: "img3", img: imgFig },
  { id: "img7", img: imgHat },
  { id: "img4", img: imgTen },
  { id: "img8", img: imgGum },
  { id: "img2", img: imgBag },
  { id: "img6", img: imgBed },
];

const LETTER_BANK = WORDS.map((w) => ({
  id: `letter-${w.id}`,
  value: w.answer,
}));

function DraggableImg({ item, isUsed }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isUsed ? 0.35 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`w-14 sm:w-16 lg:w-12 xl:w-10 h-14 sm:h-16 lg:h-12 xl:h-10 rounded-xl border-2 bg-white flex items-center justify-center select-none
        ${
          isUsed
            ? "border-gray-100 pointer-events-none"
            : "border-orange-200 cursor-grab hover:border-orange-400 hover:shadow-md transition-all"
        }`}
    >
      <img src={item.img} alt="" className="w-full h-full object-contain" />
    </div>
  );
}

function DraggableLetter({ item, isUsed }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isUsed ? 0.35 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg border-2 bg-white flex items-center justify-center font-bold text-orange-600 select-none
        ${
          isUsed
            ? "border-gray-100 pointer-events-none"
            : "border-orange-200 cursor-grab hover:border-orange-400 hover:shadow-md transition-all"
        }`}
    >
      {item.value}
    </div>
  );
}

function ImageDropBox({ wordId, droppedImgId, isSubmitted, isCorrect }) {
  const { setNodeRef, isOver } = useDroppable({ id: wordId });

  const droppedItem = IMAGE_BANK.find((i) => i.id === droppedImgId);

  const borderClass = isSubmitted
    ? isCorrect
      ? "border-gray-200"
      : "border-red-400 bg-red-50"
    : isOver
    ? "border-orange-400 bg-orange-50"
    : "border-gray-200";

  return (
    <div
      ref={setNodeRef}
      className={`relative w-full h-20 sm:h-24 rounded-xl border-2 flex items-center justify-center transition-all bg-white ${borderClass}`}
    >
      {isSubmitted && droppedImgId && !isCorrect && (
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow">
          ✕
        </span>
      )}

      {droppedItem ? (
        <img
          src={droppedItem.img}
          alt=""
          className="w-14 sm:w-16 lg:w-16 xl:w-16 h-14 sm:h-16 lg:h-16 xl:h-16 object-contain"
        />
      ) : (
        <span className="text-gray-300 text-xs italic">Drop here</span>
      )}
    </div>
  );
}

function LetterDropBox({ wordId, value, setLetters, isSubmitted, isCorrect }) {
  const { setNodeRef, isOver } = useDroppable({ id: `letter-slot-${wordId}` });

  const border = isSubmitted
    ? isCorrect
      ? "border-gray-400 text-gray-700"
      : "border-red-500 text-red-500"
    : isOver
    ? "border-orange-500 text-orange-600"
    : "border-orange-400 text-orange-600";

  return (
    <div
      ref={setNodeRef}
      className={`w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center border-b-2 ${border}`}
    >
      <input
        value={value}
        maxLength={1}
        disabled={isSubmitted}
        onChange={(e) =>
          setLetters((prev) => ({
            ...prev,
            [wordId]: e.target.value,
          }))
        }
        className="w-full h-full text-center font-bold bg-transparent outline-none"
      />
    </div>
  );
}

export default function WB_Unit7_Page44_Q3() {
  const initialLetters = Object.fromEntries(WORDS.map((w) => [w.id, ""]));
  const initialImages = Object.fromEntries(WORDS.map((w) => [w.id, null]));

  const [letters, setLetters] = useState(initialLetters);
  const [droppedImgs, setDroppedImgs] = useState(initialImages);
  const [activeId, setActiveId] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const usedImgIds = Object.values(droppedImgs).filter(Boolean);

  const checkAnswers = () => {
    const emptyLetter = WORDS.some((w) => !letters[w.id]);
    const emptyImg = WORDS.some((w) => !droppedImgs[w.id]);

    if (emptyLetter || emptyImg) {
      ValidationAlert.info();
      return;
    }

    setSubmitted(true);

    const total = WORDS.length * 2;
    let score = 0;

    WORDS.forEach((w) => {
      if (letters[w.id].toLowerCase() === w.answer) score++;
      if (droppedImgs[w.id] === w.imgId) score++;
    });

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleReset = () => {
    setLetters(initialLetters);
    setDroppedImgs(initialImages);
    setSubmitted(false);
  };

  const handleShowAnswer = () => {
    setLetters(Object.fromEntries(WORDS.map((w) => [w.id, w.answer])));
    setDroppedImgs(Object.fromEntries(WORDS.map((w) => [w.id, w.imgId])));
    setSubmitted(true);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragEnd={(e) => {
        if (e.over) {
          const targetId = e.over.id;
          const draggedId = e.active.id;

          if (WORDS.find((w) => w.id === targetId)) {
            setDroppedImgs((prev) => ({
              ...prev,
              [targetId]: draggedId.startsWith("img") ? draggedId : prev[targetId],
            }));
          }

          if (targetId.startsWith("letter-slot-")) {
            const wordId = targetId.replace("letter-slot-", "");
            const letterItem = LETTER_BANK.find((l) => l.id === draggedId);

            if (letterItem) {
              setLetters((prev) => ({
                ...prev,
                [wordId]: letterItem.value,
              }));
            }
          }
        }

        setActiveId(null);
      }}
    >
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "20px" }}>
          <h1 className="WB-header-title-page8 text-sm sm:text-lg">
            <span className="WB-ex-A" style={{ background: "#f97316" }}>
              C
            </span>
            Write the missing letter for the pictures below. Then drag the pictures into the correct boxes.
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-8">
            {WORDS.map((w, i) => {
              const isCorrectLetter =
                letters[w.id]?.toLowerCase() === w.answer;
              const isCorrectImg = droppedImgs[w.id] === w.imgId;

              return (
                <div key={w.id} className="flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">
                    {i + 1}
                  </span>

                  <ImageDropBox
                    wordId={w.id}
                    droppedImgId={droppedImgs[w.id]}
                    isSubmitted={submitted}
                    isCorrect={isCorrectImg}
                  />

                  <div className="flex items-center gap-0.5 text-base font-bold text-gray-700">
                    <span>{w.before}</span>

                    <LetterDropBox
                      wordId={w.id}
                      value={letters[w.id]}
                      setLetters={setLetters}
                      isSubmitted={submitted}
                      isCorrect={isCorrectLetter}
                    />

                    <span>{w.after}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-orange-50 rounded-2xl border-2 border-orange-100 p-3 sm:p-4 mt-2">
            <p className="text-xs text-orange-400 font-medium mb-3 text-center">
              Images & Letters Bank — drag to correct place
            </p>

            <SortableContext items={IMAGE_BANK.map((i) => i.id)}>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
                {IMAGE_BANK.map((item) => (
                  <DraggableImg
                    key={item.id}
                    item={item}
                    isUsed={usedImgIds.includes(item.id)}
                  />
                ))}
              </div>
            </SortableContext>

            <SortableContext items={LETTER_BANK.map((l) => l.id)}>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {LETTER_BANK.map((item) => (
                  <DraggableLetter
                    key={item.id}
                    item={item}
                    isUsed={false}
                  />
                ))}
              </div>
            </SortableContext>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              checkAnswers={checkAnswers}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleReset}
            />
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeId
          ? (() => {
              const img = IMAGE_BANK.find((i) => i.id === activeId);
              const letter = LETTER_BANK.find((l) => l.id === activeId);

              if (img) {
                return (
                  <div className="w-16 h-16 bg-white border-2 border-orange-500 rounded-xl flex items-center justify-center">
                    <img src={img.img} className="w-12 h-12" />
                  </div>
                );
              }

              if (letter) {
                return (
                  <div className="w-12 h-12 bg-white border-2 border-orange-500 rounded-lg flex items-center justify-center font-bold text-orange-600">
                    {letter.value}
                  </div>
                );
              }

              return null;
            })()
          : null}
      </DragOverlay>
    </DndContext>
  );
}