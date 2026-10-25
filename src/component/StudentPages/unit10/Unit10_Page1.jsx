import { useContext } from "react";

import page_1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 82.png";
import "./Unit10_Page1.css";

import Unit5_Page1_Read from "./Unit10_Pag1_Read";
import Unit5_Page1_Vocab from "./Unit10_Page1_Vocab";
import Unit5_Page1_find from "./Unit10_Page1_find";

import AudioWithCaption from "../../AudioWithCaption";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

import allunit3 from "../../../assets/audio/ClassBook/Unit 10/P 82/unit10-pg82-unitall.mp3";

import sound1 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound14.mp3";
import sound15 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound15.mp3";

import { AudioContext } from "../../../AudioContext";

const Unit10_Page1 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const captionsExample = [
    {
      start: 0.36,
      end: 16.219,
      text: "Page 82. Unit 10. What will we do on the weekend? Page 82. Unit 10 Vocabulary. One, beach. Two, sea. Three, swim.",
    },
    {
      start: 17.5,
      end: 20.12,
      text: "Four, beach umbrella.",
    },
    {
      start: 21.16,
      end: 28.58,
      text: "Five, float. Six, sunglasses. Seven, sunscreen.",
    },
    {
      start: 29.62,
      end: 33.68,
      text: "Eight, pail. Nine, shovel.",
    },
    {
      start: 34.76,
      end: 40.1,
      text: "Ten, build a sandcastle. Eleven, dig.",
    },
    {
      start: 41.28,
      end: 69.24,
      text: "Twelve, beach ball. Thirteen, read a book. Fourteen, sand. Fifteen, goggles. Page 82. Listen and read along. C-R, D-R, T-R. Crab, dream, tree. Page 83. Reading. Listen and read along. Preparing for a garage sale.",
    },
    {
      start: 69.78,
      end: 71.1,
      text: "Dad, what are you doing?",
    },
    {
      start: 71.96,
      end: 73.62,
      text: "I'm going to clean out the basement.",
    },
    {
      start: 74.32,
      end: 75.9,
      text: "There's a lot of things here, Dad.",
    },
    {
      start: 76.48,
      end: 79.06,
      text: "Yes, there is. Why don't you help me, Tom?",
    },
    {
      start: 79.86,
      end: 80.44,
      text: "Sure, Dad.",
    },
    {
      start: 81.1,
      end: 85.52,
      text: "I will put these books in a box. You can dust some of those lamps over there.",
    },
    {
      start: 86.08,
      end: 88.4,
      text: "Will we throw all of these things away?",
    },
    {
      start: 89.12,
      end: 90.06,
      text: "No, we won't.",
    },
    {
      start: 90.86,
      end: 92.92,
      text: "But I thought you were cleaning out the basement.",
    },
    {
      start: 93.62,
      end: 95.96,
      text: "Yes, but we won't throw everything away.",
    },
    {
      start: 96.88,
      end: 98.2,
      text: "What will you do with all of it?",
    },
    {
      start: 98.94,
      end: 104.08,
      text: "I will keep some of things, and the rest, I will sell in a garage sale next weekend.",
    },
    {
      start: 104.92,
      end: 108.26,
      text: "That sounds great. Can I sell some of my things too?",
    },
    {
      start: 109.36,
      end: 116.84,
      text: "Sure, son. If there's anything you don't need anymore, we will sell it in the garage sale. You can make a little bit of money that way.",
    },
    {
      start: 117.74,
      end: 123.12,
      text: "Maybe if I sell my skateboard and video game set, I will have enough money to buy a new bike.",
    },
    {
      start: 123.82,
      end: 125.26,
      text: "Then let's get started.",
    },
    {
      start: 126.08,
      end: 126.7,
      text: "Sure, Dad.",
    },
    {
      start: 127.48,
      end: 131.18,
      text: "Page 83. Listen, read, and repeat.",
    },
    {
      start: 131.94,
      end: 132.96,
      text: "I'm having a sale.",
    },
    {
      start: 133.76,
      end: 134.56,
      text: "That's great.",
    },
    {
      start: 135.04,
      end: 144.8,
      text: "Page 83. Listen and read along. C-R, D-R, T-R. Cry, dress, truck.",
    },
  ];
  const areas = [
    { x1: 28.3, y1: 39.2, sound: 1, isPrimary: true },

    { x1: 22.4, y1: 22.4, sound: 2, isPrimary: true },

    { x1: 32.4, y1: 24.8, sound: 3, isPrimary: true },
    {
      x1: 37.09,
      y1: 25.26,
      x2: 46.14,
      y2: 28.66,
      sound: 3,
      isPrimary: false,
    },

    { x1: 56.9, y1: 20, sound: 4, isPrimary: true },
    {
      x1: 49.37,
      y1: 14.77,
      x2: 77.59,
      y2: 25.43,
      sound: 4,
      isPrimary: false,
    },

    { x1: 32, y1: 31.3, sound: 5, isPrimary: true },
    {
      x1: 22.0,
      y1: 29.49,
      x2: 32.56,
      y2: 35.07,
      sound: 5,
      isPrimary: false,
    },

    { x1: 72.2, y1: 28.9, sound: 6, isPrimary: true },
    {
      x1: 67.25,
      y1: 32.37,
      x2: 73.5,
      y2: 32.7,
      sound: 6,
      isPrimary: false,
    },

    { x1: 58.7, y1: 34, sound: 7, isPrimary: true },
    {
      x1: 63.37,
      y1: 35.07,
      x2: 66.82,
      y2: 41.84,
      sound: 7,
      isPrimary: false,
    },

    { x1: 38.5, y1: 47.5, sound: 8, isPrimary: true },

    { x1: 46, y1: 42.7, sound: 9, isPrimary: true },

    { x1: 48, y1: 58.2, sound: 10, isPrimary: true },
    {
      x1: 47.86,
      y1: 53.69,
      x2: 62.08,
      y2: 62.49,
      sound: 10,
      isPrimary: false,
    },

    { x1: 28.9, y1: 78.1, sound: 11, isPrimary: true },

    { x1: 38.5, y1: 61.6, sound: 12, isPrimary: true },
    {
      x1: 30.41,
      y1: 61.3,
      x2: 40.1,
      y2: 67.9,
      sound: 12,
      isPrimary: false,
    },

    { x1: 71.6, y1: 68.7, sound: 13, isPrimary: true },
    {
      x1: 65.96,
      y1: 63.84,
      x2: 82.98,
      y2: 75.2,
      sound: 13,
      isPrimary: false,
    },

    { x1: 53.9, y1: 66.1, sound: 14, isPrimary: true },

    { x1: 34.3, y1: 56.45, sound: 15, isPrimary: true },
    {
      x1: 26.31,
      y1: 55.21,
      x2: 33.21,
      y2: 59.44,
      sound: 15,
      isPrimary: false,
    },
  ];

  const soundLabels = {
    1: "Beach",
    2: "Sea",
    3: "Swim",
    4: "Beach umbrella",
    5: "Float",
    6: "Sunglasses",
    7: "Sunscreen",
    8: "Pail",
    9: "Shovel",
    10: "Build a sandcastle",
    11: "Dig",
    12: "Beach ball",
    13: "Read a book",
    14: "Sand",
    15: "Goggles",
  };

  const sounds = {
    1: sound1,
    2: sound2,
    3: sound3,
    4: sound4,
    5: sound5,
    6: sound6,
    7: sound7,
    8: sound8,
    9: sound9,
    10: sound10,
    11: sound11,
    12: sound12,
    13: sound13,
    14: sound14,
    15: sound15,
  };

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

  const openMainAudio = () => {
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
          src={allunit3}
          captions={captionsExample}
          pageId="unit10-page82-main-audio"
        />
      </div>,
    );
  };

  const openFind = () => {
    openPopup(
      "html",
      <>
        <Unit5_Page1_find />
      </>,
    );
  };

  const openVocab = () => {
    openPopup(
      "html",
      <>
        <Unit5_Page1_Vocab />
      </>,
    );
  };

  const openRead = () => {
    openPopup(
      "html",
      <>
        <Unit5_Page1_Read />
      </>,
    );
  };

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <div
        className="headset-icon-CD-unit10-page1-1 hover:scale-110 transition"
        style={{
          overflow: "visible",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
          padding: "5px",
          top: "8%",
          right: "14%",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 10 page 82 audio"
          onClick={openMainAudio}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openMainAudio();
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
        className="click-icon-unit10-page1-1 hover:scale-110 transition"
        style={{
          overflow: "visible",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
          padding: "5px",
          left: "19%",
          top: "27%",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open find activity"
          onClick={openFind}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openFind();
            }
          }}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

      <div
        className="headset-icon-CD-unit10-page1-2 hover:scale-110 transition"
        style={{
          overflow: "visible",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
          padding: "5px",
          bottom: "53.5%",
          left: "26.2%",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open Unit 10 vocabulary activity"
          onClick={openVocab}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openVocab();
            }
          }}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

      <div
        className="click-icon-unit10-page1-2 hover:scale-110 transition"
        style={{
          overflow: "visible",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
          padding: "5px",
          bottom: "10.5%",
          right: "37%",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open Unit 10 reading activity"
          onClick={openRead}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openRead();
            }
          }}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

      {areas.map((area, index) => {
        const areaId = `p82-${area.sound}`;
        const isActive = activeId === areaId;

        if (area.isPrimary) {
          return (
            <div
              key={index}
              className={`circle-area page4-audio-hotspot ${
                isActive ? "active" : ""
              }`}
              role="button"
              tabIndex={0}
              aria-label={`Play pronunciation: ${soundLabels[area.sound]}`}
              aria-pressed={isActive}
              style={{
                left: `${area.x1}%`,
                top: `${area.y1}%`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                playSound(sounds[area.sound], areaId);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  playSound(sounds[area.sound], areaId);
                }
              }}
            />
          );
        }

        return (
          <div
            key={index}
            className="clickable-area"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${area.x1}%`,
              top: `${area.y1}%`,
              width: `${area.x2 - area.x1}%`,
              height: `${area.y2 - area.y1}%`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              playSound(sounds[area.sound], areaId);
            }}
          />
        );
      })}
    </div>
  );
};

export default Unit10_Page1;
