import React, { useState, useContext } from "react";

import page_4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 43.png";
import "./Unit5_Page4.css";

import grammarSound from "../../../assets/audio/ClassBook/Unit 5/P 43/unit5-page43-grammar2.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 5/P 43/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 5/P 43/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 5/P 43/Pg43_3.1_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 5/P 43/Pg43_4.1_Adult Lady.mp3";

import video from "../../../assets/videos/grade 3 unit 5 page 43.mp4";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";

import AudioWithCaption from "../../AudioWithCaption";

import { AudioContext } from "../../../AudioContext";

const Unit5_Page4 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);

  const captionsExample = [
    {
      start: 0.399,
      end: 25.739,
      text: "Page 43, exercise 2. Right grammar. Is there a sink in the bathroom? Yes, there is. No, there isn't. Are there sinks in the kitchen? Yes, there are. No, there aren't. Is there a telephone behind the chair in the living room? No, there isn't. The telephone is next to the chair.",
    },
    {
      start: 27.0,
      end: 30.8,
      text: "Is there a sink in the kitchen? Yes, there is",
    },
  ];

  const clickableAreas = [
    {
      x1: 6.33,
      y1: 9.01,
      x2: 45.12,
      y2: 16.98,
      sound: sound1,
    },
    {
      x1: 55.03,
      y1: 8.84,
      x2: 94.46,
      y2: 17.47,
      sound: sound2,
    },
    {
      x1: 39.52,
      y1: 32.7,
      x2: 93.81,
      y2: 40.52,
      sound: sound3,
    },
    {
      x1: 57.18,
      y1: 66.04,
      x2: 90.15,
      y2: 71.46,
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
          pageId="unit5-page43-grammer"
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
          aria-label="Play Unit 5 page 43 grammar audio"
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
          aria-label="Play Unit 5 page 43 grammar video"
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
        const areaId = `p43-${index}`;
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

export default Unit5_Page4;
