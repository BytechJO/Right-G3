import React, { useState, useContext } from "react";

import page_4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 61.png";
import "./Unit7_Page4.css";

import grammarSound from "../../../assets/audio/ClassBook/Unit 7/P 61/unit7-pg61-grammar2.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 7/P 61/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 7/P 61/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 7/P 61/Pg61_4.1_Boy.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 7/P 61/Pg61_4.2_Boy.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 7/P 61/Pg61_5.1_Adult Lady.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 7/P 61/Pg61_6.1_Adult Lady.mp3";

import video from "../../../assets/videos/grade 3 unit 7 page 61.mp4";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";

import AudioWithCaption from "../../AudioWithCaption";
import { AudioContext } from "../../../AudioContext";

const Unit7_Page4 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);

  const captionsExample = [
    {
      start: 0.239,
      end: 4.859,
      text: "Page 61, exercise 2. Right grammar.",
    },
    {
      start: 4.859,
      end: 6.019,
      text: "Can you see them?",
    },
    {
      start: 6.019,
      end: 10.5,
      text: "Yes, I can see them next to the gym.",
    },
    {
      start: 10.5,
      end: 12.5,
      text: "Can you see us?",
    },
    {
      start: 12.5,
      end: 14.619,
      text: "Yes, I can see you behind the bus station.",
    },
    {
      start: 14.619,
      end: 15.679,
      text: "Can you see me?",
    },
    {
      start: 15.679,
      end: 19.1,
      text: "No, I can't see you between the trees.",
    },
    {
      start: 19.1,
      end: 21.059,
      text: "Can you see me?",
    },
    {
      start: 21.059,
      end: 25.0,
      text: "Yes, I can see you. You are between the trees.",
    },
    {
      start: 25.0,
      end: 27.5,
      text: "Where are Harley and Tom?",
    },
    {
      start: 27.5,
      end: 30.0,
      text: "They are in the music room.",
    },
    {
      start: 30.0,
      end: 32.0,
      text: "Can you see them?",
    },
    {
      start: 32.0,
      end: 33.5,
      text: "Yes, I can see them.",
    },
    {
      start: 33.5,
      end: 36.0,
      text: "Where are the soccer players?",
    },
    {
      start: 36.0,
      end: 38.5,
      text: "They are playing on the soccer field.",
    },
    {
      start: 38.5,
      end: 40.44,
      text: "Can you see them?",
    },
    {
      start: 40.44,
      end: 42.0,
      text: "Yes, I can see them.",
    },
  ];

  const clickableAreas = [
    {
      x1: 5.69,
      y1: 9.35,
      x2: 33.91,
      y2: 21.04,
      sound: sound1,
    },
    {
      x1: 38.22,
      y1: 9.52,
      x2: 93.6,
      y2: 21.53,
      sound: sound2,
    },
    {
      x1: 6.77,
      y1: 31.35,
      x2: 27.5,
      y2: 35.34,
      sound: sound3,
    },
    {
      x1: 15.38,
      y1: 56.06,
      x2: 46.41,
      y2: 61.15,
      sound: sound4,
    },
    {
      x1: 62.14,
      y1: 25.9,
      x2: 94.24,
      y2: 35.59,
      sound: sound5,
    },
    {
      x1: 8.7,
      y1: 63.9,
      x2: 50.07,
      y2: 72.4,
      sound: sound6,
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
          pageId="unit7-page61-grammer"
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
        className="headset-icon-CD-unit5-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 7 page 61 grammar audio"
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
        className="pauseBtn-icon-CD-unit5-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 7 page 61 grammar video"
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
        const areaId = `p61-${index}`;
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

export default Unit7_Page4;
