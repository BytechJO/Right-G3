import React, { useState, useContext } from "react";

import page24 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 74.png";
import "./Reading_Unit8_Page1.css";

import sound1 from "../../../assets/audio/ClassBook/Unit 8/P 74/unit8-pg74-readingall.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 8/P 74/Pg74_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 8/P 74/Pg74_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 8/P 74/Pg74_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 8/P 74/Pg74_1.4_Adult Lady.mp3";

import AudioWithCaption from "../../AudioWithCaption";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";

import video3 from "../../../assets/videos/reading/grade 3 unit 8 page 74-75 reading.mp4";

import { AudioContext } from "../../../AudioContext";

const Reading_Unit8_Page1 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);

  const captionsExample = [
    {
      start: 0.26,
      end: 63.66,
      text: "Page 74, Reading. Where's Hansel's camera? Last week, Hansel was at his friend's birthday party. There were many children at the party for Philip's birthday. Hansel wanted to take a picture with his camera. Oh, no! cried Hansel. What's wrong? asked Philip. I want to take some pictures, but I can't find my camera anywhere. I forgot where I put it, complained Hansel. Philip said, I'll help you look for your camera. What does it look like? It's white, and it has a long band, replied Hansel. Can you help us, Mom? asked Philip. We are looking for Hansel's camera. Philip's mom said, Sure, boys. I saw Stella taking a picture of her friends with a camera. That might be Hansel's camera. Thanks, Mom, said Philip. Stella was looking at some pictures she had taken with her camera. She said happily, Look, Hansel, I took some nice pictures. Do you want to look at them?",
    },
    {
      start: 64.67,
      end: 78.12,
      text: "No, Stella, not right now. I'm looking for my camera. Have you seen it? asked Hansel. Did you find your camera yet, Hansel? Philip asked. No, I didn't, answered Hansel. I guess it's lost.",
    },
    {
      start: 79.37,
      end: 93.98,
      text: "Have you found your camera, Hansel? asked Philip's mom. No, Mrs. Dewey. I believe I saw Harley taking a picture of Sarah with a camera, said Mrs. Dewey. I'll go find them. Thanks, Mrs. Dewey, replied Hansel.",
    },
    {
      start: 95.1,
      end: 99.74,
      text: "Sarah, that's my camera. How did you get it? asked Hansel, relieved.",
    },
    {
      start: 100.8,
      end: 122.74,
      text: "Harley found it in the grass. He took some pictures, then he gave it to me to hold. Here you are. We didn't know this was your camera, Sarah replied happily. Thank you. I'm so happy my camera is not lost, said Hansel.",
    },
  ];

  const clickableAreas = [
    {
      x1: 15.32,
      y1: 36.26,
      x2: 53.75,
      y2: 49.97,
      sound: sound2,
    },
    {
      x1: 55.4,
      y1: 32.45,
      x2: 94.07,
      y2: 49.97,
      sound: sound3,
    },
    {
      x1: 15.11,
      y1: 81.1,
      x2: 53.55,
      y2: 95.61,
      sound: sound4,
    },
    {
      x1: 55.62,
      y1: 81.1,
      x2: 94.07,
      y2: 96.09,
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

  const openReadingAudio = () => {
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
          src={sound1}
          captions={captionsExample}
          pageId="unit8-page74-reading"
        />
      </div>,
    );
  };

  const openReadingVideo = () => {
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
          <source src={video3} type="video/mp4" />
        </video>
      </div>,
    );
  };

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page24})` }}
    >
      <div
        className="headset-icon-CD-unit2-page11-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 8 page 74 reading audio"
          onClick={openReadingAudio}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openReadingAudio();
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
        className="pauseBtn-icon-CD-page21 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 8 page 74 reading video"
          onClick={openReadingVideo}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openReadingVideo();
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
        const areaId = `p74-${index}`;
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

export default Reading_Unit8_Page1;
