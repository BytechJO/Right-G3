import React, { useEffect, useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex C 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex C 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex C 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex C 5.svg";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import cloudyAudio from "../../../assets/audio/ClassBook/Unit 4/Page 36 - Exercise C/Item_001_cloudy.mp3";
import rainyAudio from "../../../assets/audio/ClassBook/Unit 4/Page 36 - Exercise C/Item_002_rainy.mp3";
import coldAudio from "../../../assets/audio/ClassBook/Unit 4/Page 36 - Exercise C/Item_003_cold.mp3";
import warmAudio from "../../../assets/audio/ClassBook/Unit 4/Page 36 - Exercise C/Item_004_warm.mp3";
import hotAudio from "../../../assets/audio/ClassBook/Unit 4/Page 36 - Exercise C/Item_005_hot.mp3";

const WORD_AUDIO = [cloudyAudio, rainyAudio, coldAudio, warmAudio, hotAudio];

const Review4_Page1_Q3 = () => {
  const [lines, setLines] = useState([]);
  const [startDot, setStartDot] = useState(null);

  const imageDotRefs = useRef([]);
  const textDotRefs = useRef([]);
  const containerRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showedAnswer, setShowedAnswer] = useState(false);
  const [lockedImages, setLockedImages] = useState([]);
  const [wrongImages, setWrongImages] = useState([]);
  const [keyboardOrigin, setKeyboardOrigin] = useState(null);
  const [keyboardTarget, setKeyboardTarget] = useState(null);
  const endpointRefs = useRef({});
  const [pointerPreview, setPointerPreview] = useState(null);
  const [, setLayoutTick] = useState(0);
  const pointerOrigin = useRef(null);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  useEffect(() => {
    const update = () => setLayoutTick((value) => value + 1);
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);
  const images = [
    { image: img1 },
    { image: img2 },
    { image: img3 },
    { image: img4 },
    { image: img5 },
  ];

  const words = [`cloudy`, `rainy`, `cold`, `warm`, `hot`];
  const correctMatches = {
    4: 0,
    3: 1,
    0: 2,
    1: 3,
    2: 4,
  };

  const handleDotClick = (index, type) => {
    if (showedAnswer) return;
    const endpointLocked =
      type === "image"
        ? lockedImages.includes(index)
        : lines.some(
            (line) =>
              line.to.index === index && lockedImages.includes(line.from.index),
          );
    if (type === "text") playAudio(`word-${index}`, WORD_AUDIO[index]);
    if (endpointLocked) return;
    if (!startDot) {
      setStartDot({ index, type });
      return;
    }

    if (startDot.type === type) {
      setStartDot(null);
      return;
    }

    const imageIndex = startDot.type === "image" ? startDot.index : index;

    const textIndex = startDot.type === "text" ? startDot.index : index;

    if (lockedImages.includes(imageIndex)) {
      setStartDot(null);
      return;
    }
    const lockedTargetUsed = lines.some(
      (line) =>
        line.to.index === textIndex && lockedImages.includes(line.from.index),
    );
    if (lockedTargetUsed) {
      setStartDot(null);
      return;
    }

    setLines((prevLines) => {
      let updatedLines = [...prevLines];

      updatedLines = updatedLines.filter((line) => {
        const img =
          line.from.type === "image" ? line.from.index : line.to.index;

        return img !== imageIndex;
      });

      updatedLines = updatedLines.filter((line) => {
        const txt = line.from.type === "text" ? line.from.index : line.to.index;

        return txt !== textIndex;
      });

      updatedLines.push({
        from: { index: imageIndex, type: "image" },
        to: { index: textIndex, type: "text" },
      });

      return updatedLines;
    });

    setWrongImages((previous) => previous.filter((id) => id !== imageIndex));

    setStartDot(null);
  };

  const availableTargets = (origin) =>
    [0, 1, 2, 3, 4].filter((id) => {
      if (origin.type === "image")
        return !lines.some(
          (line) =>
            line.to.index === id && lockedImages.includes(line.from.index),
        );
      return !lockedImages.includes(id);
    });
  const focusEndpoint = (type, id) =>
    requestAnimationFrame(() =>
      endpointRefs.current[`${type}-${id}`]?.focus({ preventScroll: true }),
    );
  const handleEndpointKeyDown = (event, index, type) => {
    if (!keyboardOrigin) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (type === "text") playAudio(`word-${index}`, WORD_AUDIO[index]);
        const origin = { index, type };
        const targets = availableTargets(origin);
        if (!targets.length) return;
        setKeyboardOrigin(origin);
        setStartDot(origin);
        setKeyboardTarget(targets[0]);
        focusEndpoint(type === "image" ? "text" : "image", targets[0]);
      }
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      const origin = keyboardOrigin;
      setKeyboardOrigin(null);
      setKeyboardTarget(null);
      setStartDot(null);
      focusEndpoint(origin.type, origin.index);
      return;
    }
    const targetType = keyboardOrigin.type === "image" ? "text" : "image";
    if (type !== targetType) return;
    if (event.key === "Tab") {
      event.preventDefault();
      const targets = availableTargets(keyboardOrigin);
      const current = targets.indexOf(index);
      const next =
        targets[
          (current + (event.shiftKey ? -1 : 1) + targets.length) %
            targets.length
        ];
      setKeyboardTarget(next);
      focusEndpoint(type, next);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const origin = keyboardOrigin;
      handleDotClick(index, type);
      setKeyboardOrigin(null);
      setKeyboardTarget(null);
      focusEndpoint(origin.type, origin.index);
    }
  };
  const beginPointerMatch = (event, index, type) => {
    if (showedAnswer) return;
    const dot =
      type === "image"
        ? imageDotRefs.current[index]
        : textDotRefs.current[index];
    if (!dot || !containerRef.current) return;
    const dotRect = dot.getBoundingClientRect();
    const box = containerRef.current.getBoundingClientRect();
    pointerOrigin.current = {
      index,
      type,
      startX: event.clientX,
      startY: event.clientY,
    };
    setPointerPreview({
      x1: dotRect.left - box.left + dotRect.width / 2,
      y1: dotRect.top - box.top + dotRect.height / 2,
      x2: dotRect.left - box.left + dotRect.width / 2,
      y2: dotRect.top - box.top + dotRect.height / 2,
      moved: false,
    });
  };
  const movePointerMatch = (event) => {
    if (!pointerOrigin.current || !containerRef.current) return;
    const box = containerRef.current.getBoundingClientRect();
    const moved =
      Math.hypot(
        event.clientX - pointerOrigin.current.startX,
        event.clientY - pointerOrigin.current.startY,
      ) > 5;
    setPointerPreview((previous) =>
      previous
        ? {
            ...previous,
            x2: event.clientX - box.left,
            y2: event.clientY - box.top,
            moved,
          }
        : previous,
    );
  };
  const endPointerMatch = (event) => {
    if (!pointerOrigin.current) return;
    const origin = pointerOrigin.current;
    if (pointerPreview?.moved) {
      const endpoint = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest("[data-match-side]");
      setStartDot(origin);
      if (endpoint && endpoint.dataset.matchSide !== origin.type)
        handleDotClick(
          Number(endpoint.dataset.matchId),
          endpoint.dataset.matchSide,
        );
      else setStartDot(null);
    } else handleDotClick(origin.index, origin.type);
    pointerOrigin.current = null;
    setPointerPreview(null);
  };

  const showAnswers = () => {
    const answerLines = Object.keys(correctMatches).map((imgIndex) => ({
      from: { index: parseInt(imgIndex), type: "image" },
      to: { index: correctMatches[imgIndex], type: "text" },
    }));

    setLines(answerLines);
    setShowedAnswer(true);
    setLockedImages([0, 1, 2, 3, 4]);
    setWrongImages([]);
    setKeyboardOrigin(null);
    setKeyboardTarget(null);
    setPointerPreview(null);
    stopAudio();
  };
  const resetAll = () => {
    setLines([]);
    setStartDot(null);
    setIsChecked(false);
    setShowedAnswer(false);
    setLockedImages([]);
    setWrongImages([]);
    setKeyboardOrigin(null);
    setKeyboardTarget(null);
    setPointerPreview(null);
    stopAudio();
  };

  const checkAnswers = () => {
    if (showedAnswer || lockedImages.length === images.length) return;
    if (lines.length !== images.length) {
      ValidationAlert.info(
        "Oops!",
        "Please complete all matches before checking.",
      );
      return;
    }

    let score = 0;

    lines.forEach((line) => {
      const imageIndex =
        line.from.type === "image" ? line.from.index : line.to.index;

      const textIndex =
        line.from.type === "text" ? line.from.index : line.to.index;

      if (correctMatches[imageIndex] === textIndex) {
        score++;
      }
    });

    const total = images.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">
          Score: ${score} / ${total}
        </span>
      </div>
    `;
    setIsChecked(true);
    const correct = lines.flatMap((line) =>
      correctMatches[line.from.index] === line.to.index
        ? [line.from.index]
        : [],
    );
    const wrong = lines.flatMap((line) =>
      correctMatches[line.from.index] !== line.to.index
        ? [line.from.index]
        : [],
    );
    setLockedImages(correct);
    setWrongImages(wrong);
    setStartDot(null);
    setKeyboardOrigin(null);
    setKeyboardTarget(null);
    setPointerPreview(null);
    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };
  const wrongWords = [];

  if (isChecked) {
    lines.forEach((line) => {
      const imageIndex =
        line.from.type === "image" ? line.from.index : line.to.index;

      const textIndex =
        line.from.type === "text" ? line.from.index : line.to.index;

      if (wrongImages.includes(imageIndex)) {
        wrongWords.push(textIndex);
      }
    });
  }
  return (
    <div
      ref={containerRef}
      onPointerMove={movePointerMatch}
      onPointerUp={endPointerMatch}
      onPointerCancel={() => {
        pointerOrigin.current = null;
        setPointerPreview(null);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        position: "relative",
      }}
    >
      <div className="div-forall" style={{ gap: "20px" }}>
        <ExerciseHeaderReview
          sectionLetter="C"
          title="Match and write the words."
          subTitle="Start with one word or picture, then connect it to the partner that means the same thing."
        />

        {/* TEXTS TOP */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-12 lg:gap-15 mb-10 md:mb-20 lg:mb-30 mt-5 md:mt-10 lg:mt-7 w-full">
          {words.map((word, i) => {
            const isWrong = wrongWords.includes(i);

            return (
              <div key={`text-${i}`} className="relative inline-block">
                <p
                  ref={(element) => {
                    endpointRefs.current[`text-${i}`] = element;
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Match ${word}`}
                  data-match-side="text"
                  data-match-id={i}
                  className={`px-10 py-2 rounded-[20px] font-semibold text-[15px] cursor-pointer min-w-[120px] text-center whitespace-pre-line
        ${
          startDot?.index === i && startDot?.type === "text"
            ? "border-2 border-[#F79530] bg-[#fdecea]"
            : isChecked && isWrong
              ? "border-2 border-red-500 bg-[#fdecea]"
              : "border-2 border-transparent bg-[#fdecea]"
        }
      
        `}
                  onPointerDown={(event) => beginPointerMatch(event, i, "text")}
                  onKeyDown={(event) => handleEndpointKeyDown(event, i, "text")}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `word-${i}`}
                  />
                  {word}
                </p>

                {/* ❌ */}
                {isChecked && isWrong && (
                  <div
                    style={{
                      position: "absolute",
                      right: "-20px",
                      top: "50%",
                      transform: "translateY(-50%)",
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
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        lineHeight: "1",
                        transform: "translateY(-1px)",
                      }}
                    >
                      ✕
                    </span>
                  </div>
                )}

                <div
                  ref={(el) => (textDotRefs.current[i] = el)}
                  aria-hidden="true"
                  className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-3 h-3 bg-[#F79530] rounded-full cursor-pointer"
                />
              </div>
            );
          })}
        </div>

        {/* IMAGES BOTTOM */}
        <div className="flex flex-wrap justify-center gap-4 mt-16 w-full" >
          {images.map((item, i) => (
            <div
              key={`img-${i}`}
              ref={(element) => {
                endpointRefs.current[`image-${i}`] = element;
              }}
              role="button"
              tabIndex={0}
              aria-label={`Match ${["Cold weather", "Warm sunny weather", "Hot sunny weather", "Rainy weather", "Cloudy weather"][i]}`}
              data-match-side="image"
              data-match-id={i}
              onPointerDown={(event) => beginPointerMatch(event, i, "image")}
              onKeyDown={(event) => handleEndpointKeyDown(event, i, "image")}
              className="flex flex-col items-center relative"
              style={{ touchAction: "none" }}
            >
              <div
                ref={(el) => (imageDotRefs.current[i] = el)}
                aria-hidden="true"
                className="w-3 h-3 bg-[#F79530] rounded-full cursor-pointer "
              />

              <img
                src={item.image}
                alt={
                  [
                    "Cold weather",
                    "Warm sunny weather",
                    "Hot sunny weather",
                    "Rainy weather",
                    "Cloudy weather",
                  ][i]
                }
                draggable={false}
                style={{
                  height:
                    window.innerWidth >= 768 && window.innerWidth < 1024
                      ? "120px" // iPad
                      : "120px", // باقي الأجهزة
                  width:
                    window.innerWidth >= 768 && window.innerWidth < 1024
                      ? "180px"
                      : "150px",
                  objectFit: "cover",
                  cursor: "pointer",
                  borderRadius: "16px",
                  // border: "2px solid #F79530",
                  transition: "all 0.3s ease",
                  transform:
                    startDot?.index === i && startDot?.type === "image"
                      ? "scale(1.05)"
                      : "scale(1)",
                  boxShadow:
                    startDot?.index === i && startDot?.type === "image"
                      ? "0 4px 10px rgba(0,0,0,0.2)"
                      : "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {lines.map((line, i) => {
          const imageIndex =
            line.from.type === "image" ? line.from.index : line.to.index;

          const textIndex =
            line.from.type === "text" ? line.from.index : line.to.index;

          const imgDot = imageDotRefs.current[imageIndex];
          const txtDot = textDotRefs.current[textIndex];

          if (!imgDot || !txtDot || !containerRef.current) return null;

          const imgRect = imgDot.getBoundingClientRect();
          const txtRect = txtDot.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();

          const x1 = txtRect.left + txtRect.width / 2 - containerRect.left;
          const y1 = txtRect.top + txtRect.height / 2 - containerRect.top;

          const x2 = imgRect.left + imgRect.width / 2 - containerRect.left;
          const y2 = imgRect.top + imgRect.height / 2 - containerRect.top;

          const midY = (y1 + y2) / 2;

          return (
            <path
              key={i}
              d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
              stroke="#F79530"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          );
        })}
        {pointerPreview?.moved && (
          <line
            x1={pointerPreview.x1}
            y1={pointerPreview.y1}
            x2={pointerPreview.x2}
            y2={pointerPreview.y2}
            stroke="#F79530"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />
        )}
        {keyboardOrigin &&
          keyboardTarget != null &&
          (() => {
            const originDot =
              keyboardOrigin.type === "image"
                ? imageDotRefs.current[keyboardOrigin.index]
                : textDotRefs.current[keyboardOrigin.index];
            const targetType =
              keyboardOrigin.type === "image" ? "text" : "image";
            const targetDot =
              targetType === "image"
                ? imageDotRefs.current[keyboardTarget]
                : textDotRefs.current[keyboardTarget];
            if (!originDot || !targetDot || !containerRef.current) return null;
            const box = containerRef.current.getBoundingClientRect();
            const a = originDot.getBoundingClientRect();
            const b = targetDot.getBoundingClientRect();
            return (
              <line
                x1={a.left - box.left + a.width / 2}
                y1={a.top - box.top + a.height / 2}
                x2={b.left - box.left + b.width / 2}
                y2={b.top - box.top + b.height / 2}
                stroke="#F79530"
                strokeWidth="3.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            );
          })()}
      </svg>

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
  );
};

export default Review4_Page1_Q3;
