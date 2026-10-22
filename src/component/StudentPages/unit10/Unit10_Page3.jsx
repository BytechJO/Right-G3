import React, { useState, useContext } from "react";

import page_3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 84.png";
import "./Unit10_Page3.css";

import grammarSound from "../../../assets/audio/ClassBook/Unit 10/P 84/unit10-pg84-grammar1.mp3";

import sound1 from "../../../assets/audio/ClassBook/Unit 10/P 84/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 10/P 84/Pg84_2.1_Stella.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 10/P 84/Pg84_3.1_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 10/P 84/Pg84_4.1_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 10/P 84/Pg84_5.1_Adult Lady.mp3";

import AudioWithCaption from "../../AudioWithCaption";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";

import video from "../../../assets/videos/grade 3 unit 10 page 84.mp4";

import { AudioContext } from "../../../AudioContext";

const Unit10_Page3 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);

  const captionsExample = [
    {
      start: 0.379,
      end: 18.079,
      text: "Page 84, exercise 1, Right grammar. She/he will/won't plant a tree. I/you/we/they will/won't water the plants.",
    },
    {
      start: 18.079,
      end: 20.779,
      text: "I will plant flowers.",
    },
    {
      start: 20.779,
      end: 32.819,
      text: "He will build a sandcastle. He won't swim in the sea. She will go to the mall. She won't go to the grocery store. She won't go to the park. She will play at home with Stella",
    },
  ];

  const clickableAreas = [
    {
      x1: 5.41,
      y1: 7.83,
      x2: 81.69,
      y2: 20.69,
      sound: sound1,
    },
    {
      x1: 25.88,
      y1: 56.6,
      x2: 49.58,
      y2: 60.12,
      sound: sound2,
    },
    {
      x1: 53.03,
      y1: 55.5,
      x2: 83.19,
      y2: 60.6,
      sound: sound3,
    },
    {
      x1: 5.63,
      y1: 89.8,
      x2: 44.2,
      y2: 94.9,
      sound: sound4,
    },
    {
      x1: 53.5,
      y1: 90.5,
      x2: 90.09,
      y2: 96.0,
      sound: sound5,
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
          pageId="unit10-page84-grammer"
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
      style={{ backgroundImage: `url(${page_3})` }}
    >
      <div
        className="headset-icon-CD-unit10-page3-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 10 page 84 grammar audio"
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
        className="pauseBtn-icon-CD-unit10-page3-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 10 page 84 grammar video"
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
        const areaId = `p84-${index}`;
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

export default Unit10_Page3;
