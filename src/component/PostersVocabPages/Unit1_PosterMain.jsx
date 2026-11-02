import React, { useState, useRef } from "react";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import AudioWithCaption from "../AudioWithCaption";
import "../../index.css";
import "./Unit1_PosterMain.css";

const PosterMain = ({ openPopup, data }) => {
  const {
    image,
    unit,
    nums,
    words,
    sounds,
    positions,
    vocabularyAudio,
    captions,
    vocabBottom,
    vocabRight,
    vocabWidth,
    vocabSize,
  } = data;

  const [clickedIndex, setClickedIndex] = useState(null);
  const wordRefs = useRef(sounds.map(() => React.createRef()));

  const playWordAudio = (index) => {
    wordRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });

    const audio = wordRefs.current[index].current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();

    setClickedIndex(index);

    audio.onended = () => {
      setClickedIndex(null);
    };
  };

  const openVocabulary = () => {
    openPopup(
      "audio",
      <AudioWithCaption
        src={vocabularyAudio}
        captions={captions}
        pageId={`poster_unit_${unit}_vocabulary`}
      />,
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      if (!event.repeat) {
        openVocabulary();
      }
    }
  };

  const handleWordKeyDown = (event, index) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) playWordAudio(index);
  };

  return (
    <div style={{ width: "850px" }}>
      {/* Audio Button */}
      <div
        className="audio-btn-poster hover:scale-110 transition"
        role="button"
        tabIndex={0}
        aria-label="Open vocabulary"
        onClick={openVocabulary}
        onKeyDown={handleKeyDown}
      >
        <svg width="22" height="22" viewBox="0 0 90 90">
          <image
            href={audioBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
      {/* Image + Words */}
      <div
        className="poster-wrapper"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        {/* Words */}
        <div
          className="vocab_container_poster_vocab"
          style={{
            bottom: vocabBottom,
            right: vocabRight,
            height: "2%",
            width: vocabWidth,
            fontSize: vocabSize,
          }}
        >
          {words.map((text, i) => (
            <h6
              key={i}
              className={clickedIndex === i ? "active" : ""}
              role="button"
              tabIndex={0}
              aria-label={`Play ${text}`}
              onClick={() => playWordAudio(i)}
              onKeyDown={(event) => handleWordKeyDown(event, i)}
            >
              {i + 1} {text}
            </h6>
          ))}
        </div>

        {/* Numbers */}
        {nums.map((num, i) => (
          <img
            key={i}
            src={num}
            alt={`${i + 1}. ${words[i] || "Vocabulary item"}`}
            className={`num-img-posterVocab ${
              clickedIndex === i ? "active" : ""
            }`}
            style={{
              position: "absolute",
              top: positions[i]?.top,
              left: positions[i]?.left,
              height: "2vw",
            }}
          />
        ))}
      </div>

      {/* Hidden audios */}
      {sounds.map((src, i) => (
        <audio key={i} ref={wordRefs.current[i]} src={src} />
      ))}
    </div>
  );
};

export default PosterMain;
