import React, { useContext, useState } from "react";

import page_4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 31.png";
import "./Unit4_Page4.css";

import grammarSound from "../../../assets/audio/ClassBook/Unit 4/P 31/gram2.mp3";

import sound1 from "../../../assets/audio/ClassBook/Unit 4/P 31/Pg31_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 4/P 31/Pg31_2.1_Boy.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 4/P 31/Pg31_3.1_Boy.mp3";

import { AudioContext } from "../../../AudioContext";

import video from "../../../assets/videos/grade 3 unit 4 page 31.mp4";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";

import AudioWithCaption from "../../AudioWithCaption";

const Unit4_Page4 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);

  const captionsExample = [
    {
      start: 0.239,
      end: 5.0,
      text: "Page 31, exercise 2. Right grammar.",
    },

    {
      start: 5.0,
      end: 6.139,
      text: "What season is it?",
    },
    {
      start: 6.139,
      end: 7.859,
      text: "It's spring.",
    },
    {
      start: 7.859,
      end: 9.579,
      text: "It's summer.",
    },
    {
      start: 9.579,
      end: 11.479,
      text: "It's autumn.",
    },
    {
      start: 11.479,
      end: 13.979,
      text: "It's winter.",
    },

    {
      start: 13.979,
      end: 15.659,
      text: "In their country, it's hot.",
    },
    {
      start: 15.659,
      end: 18.6,
      text: "They wear shorts and T-shirts.",
    },
    {
      start: 18.6,
      end: 21.84,
      text: "They go to the beach and swim daily.",
    },
    {
      start: 21.84,
      end: 23.519,
      text: "It's summer.",
    },

    {
      start: 24.539,
      end: 26.539,
      text: "In her country, it's cold.",
    },
    {
      start: 26.539,
      end: 29.659,
      text: "She wears boots and gloves.",
    },
    {
      start: 29.659,
      end: 32.079,
      text: "She builds a snowman.",
    },

    {
      start: 33.319,
      end: 34.88,
      text: "She plays with her friends.",
    },

    {
      start: 36.139,
      end: 36.979,
      text: "It's winter.",
    },
  ];

  const clickableAreas = [
    {
      x1: 6.33,
      y1: 9.69,
      x2: 93.38,
      y2: 20.69,
      sound: sound1,
    },

    {
      x1: 6.12,
      y1: 34.4,
      x2: 52.4,
      y2: 41.61,
      sound: sound3,
    },

    {
      x1: 6.12,
      y1: 64.75,
      x2: 56.11,
      y2: 72.63,
      sound: sound4,
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
          captions={captionsExample}
          pageId="unit4-page31-grammar"
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
        className="headset-icon-CD-unit4-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 4 page 31 grammar audio"
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
        className="pauseBtn-icon-CD-unit4-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 4 page 31 grammar video"
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
        const areaId = `p31-${index}`;
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

export default Unit4_Page4;
