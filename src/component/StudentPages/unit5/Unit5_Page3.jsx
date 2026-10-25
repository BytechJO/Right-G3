import React, { useState, useContext } from "react";

import page_3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 42.png";
import "./Unit5_Page3.css";

import grammarSound from "../../../assets/audio/ClassBook/Unit 5/P 42/unit5-pg42-grammar1.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 5/P 42/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 5/P 42/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 5/P 42/Pg42_2.1_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 5/P 42/Pg42_3.1_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 5/P 42/Pg42_4.1_Adult Lady.mp3";

import { AudioContext } from "../../../AudioContext";

import AudioWithCaption from "../../AudioWithCaption";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";

import video from "../../../assets/videos/grade 3 unit 5 page 42.mp4";

const Unit5_Page3 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);

  const captionsExample = [
    {
      start: 0.199,
      end: 12.84,
      text: "Page 42, exercise 1. Right grammar. Where's the sofa? It's in the living room. Where's the fridge? It's in the kitchen. Where's the computer?",
    },
    {
      start: 13.899,
      end: 34.68,
      text: "It's in the bedroom. Where's the sofa? It's in the living room. The sofa is in front of the window. Where's the computer? It's in the bedroom. There is a nightstand next to the bed. Where's the fridge? It's in the kitchen. The fridge is near the sink. The dining table is in front of the sink",
    },
  ];

  const clickableAreas = [
    {
      x1: 6.06,
      y1: 9.01,
      x2: 40.75,
      y2: 21.2,
      sound: sound1,
    },
    {
      x1: 60.36,
      y1: 9.18,
      x2: 93.75,
      y2: 21.37,
      sound: sound2,
    },
    {
      x1: 5.63,
      y1: 33.21,
      x2: 40.1,
      y2: 41.17,
      sound: sound3,
    },
    {
      x1: 51.52,
      y1: 33.38,
      x2: 88.37,
      y2: 40.83,
      sound: sound4,
    },
    {
      x1: 51.74,
      y1: 65.37,
      x2: 93.75,
      y2: 72.98,
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
          pageId="unit5-page42-grammer"
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
        className="headset-icon-CD-unit5-page3-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 5 page 42 grammar audio"
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
        className="pauseBtn-icon-CD-unit5-page3-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 5 page 42 grammar video"
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
        const areaId = `p42-${index}`;
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

export default Unit5_Page3;
