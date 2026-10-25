import React, { useState, useContext } from "react";

import page_4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 49.png";
import "./Unit6_Page4.css";

import grammarSound from "../../../assets/audio/ClassBook/Unit 6/P 49/unit6-pg49-grammar2.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 6/P 49/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 6/P 49/Pg49_3.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 6/P 49/Pg49_4.1_Adult Lady.mp3";

import video from "../../../assets/videos/grade 3 unit 6 page 49.mp4";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";

import AudioWithCaption from "../../AudioWithCaption";
import { AudioContext } from "../../../AudioContext";

const Unit6_Page4 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);

  const captionsExample = [
    {
      start: 0.419,
      end: 23.7,
      text: "Page 49, exercise 2. Right grammar. They, we, you, he, she must play in the playground. They, we, you, he, she mustn't play in the street. You must brush your teeth every day. They mustn't eat too many sweets",
    },
  ];

  const clickableAreas = [
    {
      x1: 5.9,
      y1: 8.84,
      x2: 82.61,
      y2: 21.03,
      sound: sound1,
    },
    {
      x1: 5.9,
      y1: 26.1,
      x2: 48.13,
      y2: 30.33,
      sound: sound2,
    },
    {
      x1: 72.05,
      y1: 61.9,
      x2: 93.6,
      y2: 67.56,
      sound: sound3,
    },
  ];

  const playSound = (path, id) => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    audioRef.current.src = path;
    audioRef.current.play();

    setActiveId(id);

    audioRef.current.onended = () => {
      setActiveId(null);
    };
  };

  const openGrammarAudio = () => {
    openPopup(
      "audio",
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <AudioWithCaption
          src={grammarSound}
          pageId="unit6-page49-grammer"
          captions={captionsExample}
        />
      </div>,
    );
  };

  const openGrammarVideo = () => {
    openPopup(
      "video",
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <video
          autoPlay
          controls
          style={{
            width: "auto",
            height: "80%",
            objectFit: "fill",
            borderRadius: "20px",
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>,
    );
  };

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_4})` }}
    >
      <div
        className="headset-icon-CD-unit6-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 6 page 49 grammar audio"
          onClick={openGrammarAudio}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openGrammarAudio();
            }
          }}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

      <div
        className="pauseBtn-icon-CD-unit6-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 6 page 49 grammar video"
          onClick={openGrammarVideo}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openGrammarVideo();
            }
          }}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
        >
          <image
            className="svg-img"
            href={pauseBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

      {clickableAreas.map((area, index) => {
        const areaId = `p49-${index}`;
        const isActive = activeId === areaId;

        return (
          <div
            key={index}
            role="button"
            tabIndex={0}
            aria-label={`Play sentence audio ${index + 1}`}
            aria-pressed={isActive}
            className={`clickable-area ${
              isActive || hoveredAreaIndex === index ? "highlight" : ""
            }`}
            style={{
              position: "absolute",
              left: `${area.x1}%`,
              top: `${area.y1}%`,
              width: `${area.x2 - area.x1}%`,
              height: `${area.y2 - area.y1}%`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              playSound(area.sound, areaId);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                playSound(area.sound, areaId);
              }
            }}
            onFocus={() => setHoveredAreaIndex(index)}
            onBlur={() => setHoveredAreaIndex(null)}
            onMouseEnter={() => setHoveredAreaIndex(index)}
            onMouseLeave={() => setHoveredAreaIndex(null)}
          />
        );
      })}
    </div>
  );
};

export default Unit6_Page4;
