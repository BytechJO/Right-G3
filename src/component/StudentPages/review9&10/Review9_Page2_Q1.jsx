import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review9_Page2_Q1.css";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import useWorkbookMatchingKeyboard from "../../WorkBookPages/Unit4/useWorkbookMatchingKeyboard";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";

const page89C = (file) =>
  new URL(
    `../../../assets/audio/ClassBook/Unit 10/Page 89 - Exercise C/${file}`,
    import.meta.url,
  ).href;
const matchAudio = [
  "Item_001_girls.mp3",
  "Item_002_ducks.mp3",
  "Item_003_caps.mp3",
  "Item_004_cats.mp3",
  "Item_005_bags.mp3",
  "Item_006_peas.mp3",
].map(page89C);

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex C 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex C 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex C 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex C 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 89/Ex C 6.svg";

const Review9_Page2_Q1 = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [matches, setMatches] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [selectedSentence, setSelectedSentence] = useState(null);

  const imageRefs = useRef([]);
  const sentenceRefs = useRef([]);
  const containerRef = useRef(null);
  const imageControlRefs = useRef([]);
  const sentenceControlRefs = useRef([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const images = [
    { id: 0, img: img1 },
    { id: 1, img: img2 },
    { id: 2, img: img3 },
    { id: 3, img: img4 },
    { id: 4, img: img5 },
    { id: 5, img: img6 },
  ];

  const sentences = [
    { id: 0, text: "girls" },
    { id: 1, text: "ducks" },
    { id: 2, text: "caps" },
    { id: 3, text: "cats" },
    { id: 4, text: "bags" },
    { id: 5, text: "peas" },
  ];

  const correct = {
    0: 2,
    1: 4,
    2: 0,
    3: 5,
    4: 1,
    5: 3,
  };
  const isImageLocked = (id) => revealed || lockedIds.includes(id);
  const isSentenceLocked = (id) =>
    revealed || lockedIds.some((imageId) => matches[imageId] === id);

  const commitMatch = (imageId, sentenceId) => {
    if (isImageLocked(imageId) || isSentenceLocked(sentenceId)) return;
    setMatches((previous) => {
      const updated = { ...previous };
      Object.keys(updated).forEach((key) => {
        if (updated[key] === sentenceId && !lockedIds.includes(Number(key)))
          delete updated[key];
      });
      updated[imageId] = sentenceId;
      return updated;
    });
    setWrongIds((previous) => previous.filter((id) => id !== imageId));
    setSelectedImg(null);
    setSelectedSentence(null);
  };

  const keyboardMatch = useWorkbookMatchingKeyboard({
    boardRef: containerRef,
    leftIds: images.map((image) => image.id),
    rightIds: sentences.map((sentence) => sentence.id),
    getElement: (side, id) =>
      side === "left"
        ? imageControlRefs.current[id]
        : sentenceControlRefs.current[id],
    getAnchorElement: (side, id) =>
      side === "left" ? imageRefs.current[id] : sentenceRefs.current[id],
    isLeftLocked: isImageLocked,
    isRightLocked: isSentenceLocked,
    onCommit: commitMatch,
    onStart: (side, id) => {
      if (side === "left") setSelectedImg(id);
      else setSelectedSentence(id);
    },
    onCancel: () => {
      setSelectedImg(null);
      setSelectedSentence(null);
    },
  });

  const selectImage = (id) => {
    if (isImageLocked(id)) return;

    // إذا اختار جملة → اربط
    if (selectedSentence !== null) {
      commitMatch(id, selectedSentence);
      return;
    }

    // السلوك القديم (اختيار صورة)
    setSelectedImg(id);
  };

  const selectSentence = (id) => {
    if (isSentenceLocked(id)) return;

    // إذا في صورة مختارة → اربط
    if (selectedImg !== null) {
      commitMatch(selectedImg, id);
      return;
    }
    setSelectedSentence(id);
  };
  const checkAnswers = () => {
    if (revealed || lockedIds.length === images.length) return;

    if (Object.keys(matches).length !== images.length) {
      ValidationAlert.info("Please match all.");
      return;
    }

    let correctCount = 0;

    Object.entries(matches).forEach(([imgId, sentId]) => {
      if (correct[imgId] === sentId) correctCount++;
    });

    const total = images.length;

    const message = `
        Score: ${correctCount} / ${total}
  `;

    if (correctCount === total) {
      ValidationAlert.success(message);
    } else if (correctCount === 0) {
      ValidationAlert.error(message);
    } else {
      ValidationAlert.warning(message);
    }

    setLockedIds(
      images.flatMap((image) =>
        correct[image.id] === matches[image.id] ? [image.id] : [],
      ),
    );
    setWrongIds(
      images.flatMap((image) =>
        correct[image.id] !== matches[image.id] ? [image.id] : [],
      ),
    );
  };

  const showAnswers = () => {
    setMatches(correct);
    setLockedIds(images.map((image) => image.id));
    setRevealed(true);
    setWrongIds([]);
    keyboardMatch.clear();
    stopAudio();
  };

  const reset = () => {
    setSelectedSentence(null);
    setSelectedImg(null);
    setMatches({});
    setWrongIds([]);
    setLockedIds([]);
    setRevealed(false);
    keyboardMatch.clear();
    stopAudio();
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        position: "relative",
      }}
    >
      <div className="div-forall" style={{ gap: "30px" }}>
        <ExerciseHeaderReview
          sectionLetter="C"
          title="Look, read, and match."
          subTitle="Start with one word or picture, then connect it to the partner that means the same thing."
        />

        <div className="w-full flex flex-col items-center gap-40">
          {/* 🔥 الصور فوق */}
          <div className="grid grid-cols-6 gap-10 w-full justify-items-center">
            {images.map((img, i) => (
              <div
                key={i}
                ref={(element) => {
                  imageControlRefs.current[i] = element;
                }}
                onClick={() => selectImage(i)}
                role="button"
                tabIndex={isImageLocked(i) ? -1 : 0}
                aria-disabled={isImageLocked(i)}
                aria-label={`Picture ${i + 1}, start or complete a match`}
                onKeyDown={(event) =>
                  keyboardMatch.handleKeyDown(event, "left", i)
                }
                onFocus={() => keyboardMatch.handleFocus("left", i)}
                className="relative flex flex-col items-center gap-2 cursor-pointer transition"
              >
                <div className="flex gap-2">
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {i + 1}
                  </span>
                  <img
                    src={img.img}
                    alt={
                      [
                        "Colorful caps.",
                        "Colorful school bags.",
                        "Two girls.",
                        "Green pea pods.",
                        "Three ducks.",
                        "Three cats.",
                      ][i]
                    }
                    style={{
                      width: "100px",
                      height: "85px",
                      objectFit: "contain",
                      border:
                        selectedImg === i
                          ? "2px solid #f97316"
                          : "2px solid transparent",
                      borderRadius: "12px",
                      padding: "4px",
                      backgroundColor:
                        selectedImg === i ? "#ffedd5" : "transparent",
                    }}
                  />
                </div>
                <div
                  ref={(el) => (imageRefs.current[i] = el)} // 🔥 الريف هون على الدوت
                  className="w-3 h-3 rounded-full mt-2 transition"
                  style={{
                    backgroundColor: selectedImg === i ? "#f97316" : "#fb923c",
                    transform: selectedImg === i ? "scale(1.4)" : "scale(1)",
                    boxShadow:
                      selectedImg === i
                        ? "0 0 0 4px rgba(249,115,22,0.2)"
                        : "none",
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* 🔥 الجمل تحت */}
          <div className="grid grid-cols-6 gap-8 w-full justify-items-center mt-10">
            {sentences.map((sent, i) => (
              <div
                key={i}
                ref={(element) => {
                  sentenceControlRefs.current[i] = element;
                }}
                onClick={() => {
                  playAudio(`match-word-${i}`, matchAudio[i]);
                  selectSentence(i);
                }}
                role="button"
                tabIndex={isSentenceLocked(i) ? -1 : 0}
                aria-disabled={isSentenceLocked(i)}
                aria-label={`${sent.text}, start or complete a match`}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ")
                    playAudio(`match-word-${i}`, matchAudio[i]);
                  keyboardMatch.handleKeyDown(event, "right", i);
                }}
                onFocus={() => keyboardMatch.handleFocus("right", i)}
                className="relative flex flex-col items-center cursor-pointer unit4-interactive unit4-audio-control"
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `match-word-${i}`}
                />
                {/* 🔥 الدوت */}
                <div
                  ref={(el) => (sentenceRefs.current[i] = el)} // 🔥 هون كمان
                  className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full z-10 transition"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#f97316",
                    transform:
                      selectedSentence === i ? "scale(1.4)" : "scale(1)",
                    boxShadow:
                      selectedSentence === i
                        ? "0 0 0 4px rgba(249,115,22,0.2)"
                        : "none",
                  }}
                ></div>

                {/* 🔥 البوكس */}
                <div
                  className="relative px-4 py-2 rounded-2xl text-[18px] text-center transition"
                  style={{
                    backgroundColor:
                      selectedSentence === i ? "#fed7aa" : "#ffedd5",
                    border:
                      selectedSentence === i
                        ? "2px solid #f97316"
                        : "2px solid transparent",
                  }}
                >
                  {sent.text}
                  {wrongIds.length > 0 &&
                    Object.entries(matches).some(
                      ([imgId, sentId]) =>
                        sentId == i && wrongIds.includes(Number(imgId)),
                    ) && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-10px",
                          transform: "translateY(-50%)",
                          width: "24px",
                          height: "24px",
                          background: "red",
                          color: "white",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {keyboardMatch.preview && (
          <line
            {...keyboardMatch.preview}
            stroke="orange"
            strokeWidth="2.5"
            strokeDasharray="7 6"
            strokeLinecap="round"
          />
        )}
        {Object.entries(matches).map(([imgId, sentId], i) => {
          const imgDot = imageRefs.current[imgId];
          const sentDot = sentenceRefs.current[sentId];

          if (!imgDot || !sentDot || !containerRef.current) return null;

          const imgRect = imgDot.getBoundingClientRect();
          const sentRect = sentDot.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();

          const x1 = sentRect.left + sentRect.width / 2 - containerRect.left;
          const y1 = sentRect.top + sentRect.height / 2 - containerRect.top;

          const x2 = imgRect.left + imgRect.width / 2 - containerRect.left;
          const y2 = imgRect.top + imgRect.height / 2 - containerRect.top;
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="orange"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review9_Page2_Q1;
