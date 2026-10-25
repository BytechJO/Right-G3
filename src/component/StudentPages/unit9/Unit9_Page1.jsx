import { useContext } from "react";

import page_1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 76.png";
import "./Unit9_Page1.css";

import Unit5_Page1_Read from "./Unit9_Pag1_Read";
import Unit5_Page1_Vocab from "./Unit9_Page1_Vocab";
import Unit5_Page1_find from "./Unit9_Page1_find";

import AudioWithCaption from "../../AudioWithCaption";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

import allunit3 from "../../../assets/audio/ClassBook/Unit 9/P 76/unit9-pg76-unitall.mp3";

import sound1 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound14.mp3";
import sound15 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound15.mp3";

import { AudioContext } from "../../../AudioContext";

const Unit9_Page1 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const captionsExample = [
    {
      start: 0.92,
      end: 7.91,
      text: "Page 76, unit 9. Where's Dad? Page 76, unit 9, vocabulary.",
    },
    {
      start: 9.06,
      end: 28.44,
      text: "One: clinic. Two: post office. Three: restaurant. Four: swimming pool. Five: hospital. Six: car wash. Seven: zoo. Eight: airport.",
    },
    {
      start: 29.5,
      end: 36.42,
      text: "Nine: bus stop. Ten: gym. Eleven: bakery.",
    },
    {
      start: 37.6,
      end: 51.64,
      text: "Twelve: theater. Thirteen: playground. Fourteen: toy shop. Fifteen: bank. Page 76, listen and read along.",
    },
    {
      start: 53.0,
      end: 53.32,
      text: "S.",
    },
    {
      start: 54.34,
      end: 64.12,
      text: "Caps, cats, ducks. Page 77, reading. Listen and read along. A brave mouse.",
    },
    {
      start: 64.12,
      end: 112.0,
      text: "I'm a brave mouse. I visit many places every day. I was at school today. I got a full mark. In the afternoon, I was in the park. There is a big, fat cat in the park. What? A cat? I'm scared of cats. I was at the bus stop. My friend was there. We took a bus and went to a restaurant. We had two glasses of orange juice. I've just returned home. There was cheese in my house. Mm, I like cheese. There was a trap in the house. What? A trap? I'm scared of traps. I'm a brave mouse, but I'm scared. Scared of traps. Squeak, snap. Squeak, snap.",
    },
    {
      start: 112.0,
      end: 116.26,
      text: "Page 77. Listen, read, and repeat.",
    },
    {
      start: 116.26,
      end: 117.28,
      text: "Let's meet tomorrow.",
    },
    {
      start: 118.36,
      end: 120.039,
      text: "Okay, sounds good.",
    },
    {
      start: 120.04,
      end: 126.94,
      text: "Page 77. Listen and read along. S. Bags, girls, peas.",
    },
  ];

  const soundLabels = {
    1: "Clinic",
    2: "Post office",
    3: "Restaurant",
    4: "Swimming pool",
    5: "Hospital",
    6: "Car wash",
    7: "Zoo",
    8: "Airport",
    9: "Bus stop",
    10: "Gym",
    11: "Bakery",
    12: "Theater",
    13: "Playground",
    14: "Toy shop",
    15: "Bank",
  };

  const areas = [
    { x1: 86.21, y1: 22.05, sound: 1, isPrimary: true },
    {
      x1: 76.73,
      y1: 15.95,
      x2: 86.21,
      y2: 22.05,
      sound: 1,
      isPrimary: false,
    },

    { x1: 66.7, y1: 17.5, sound: 2, isPrimary: true },
    {
      x1: 58.85,
      y1: 13.07,
      x2: 66.7,
      y2: 17.5,
      sound: 2,
      isPrimary: false,
    },

    { x1: 43.5, y1: 15.9, sound: 3, isPrimary: true },
    {
      x1: 43.55,
      y1: 13.41,
      x2: 55.4,
      y2: 20.18,
      sound: 3,
      isPrimary: false,
    },

    { x1: 29.5, y1: 13.8, sound: 4, isPrimary: true },
    {
      x1: 28.0,
      y1: 17.47,
      x2: 40.96,
      y2: 21.87,
      sound: 4,
      isPrimary: false,
    },

    { x1: 91.3, y1: 33.3, sound: 5, isPrimary: true },
    {
      x1: 79.75,
      y1: 26.27,
      x2: 90.95,
      y2: 32.26,
      sound: 5,
      isPrimary: false,
    },

    { x1: 61, y1: 41.2, sound: 6, isPrimary: true },
    {
      x1: 56.91,
      y1: 38.12,
      x2: 65.31,
      y2: 41.33,
      sound: 6,
      isPrimary: false,
    },

    { x1: 39.2, y1: 59.4, sound: 7, isPrimary: true },
    {
      x1: 32.35,
      y1: 56.06,
      x2: 54.54,
      y2: 62.15,
      sound: 7,
      isPrimary: false,
    },

    { x1: 44, y1: 48.9, sound: 8, isPrimary: true },
    {
      x1: 39.03,
      y1: 46.24,
      x2: 55.62,
      y2: 52.67,
      sound: 8,
      isPrimary: false,
    },

    { x1: 75.3, y1: 55.4, sound: 9, isPrimary: true },
    {
      x1: 71.99,
      y1: 50.13,
      x2: 81.47,
      y2: 55.72,
      sound: 9,
      isPrimary: false,
    },

    { x1: 71.6, y1: 36.6, sound: 10, isPrimary: true },
    {
      x1: 70.05,
      y1: 33.72,
      x2: 82.33,
      y2: 38.97,
      sound: 10,
      isPrimary: false,
    },

    { x1: 65.7, y1: 47.4, sound: 11, isPrimary: true },
    {
      x1: 57.77,
      y1: 44.72,
      x2: 65.7,
      y2: 47.4,
      sound: 11,
      isPrimary: false,
    },

    { x1: 60.3, y1: 27.4, sound: 12, isPrimary: true },
    {
      x1: 53.68,
      y1: 23.9,
      x2: 62.3,
      y2: 29.4,
      sound: 12,
      isPrimary: false,
    },

    { x1: 63.1, y1: 54.14, sound: 13, isPrimary: true },
    {
      x1: 60.14,
      y1: 51.32,
      x2: 69.19,
      y2: 54,
      sound: 13,
      isPrimary: false,
    },

    { x1: 69, y1: 27.4, sound: 14, isPrimary: true },
    {
      x1: 66.17,
      y1: 22.21,
      x2: 74.79,
      y2: 28.98,
      sound: 14,
      isPrimary: false,
    },

    { x1: 40.5, y1: 33.4, sound: 15, isPrimary: true },
    {
      x1: 40.53,
      y1: 31.01,
      x2: 54.75,
      y2: 36.43,
      sound: 15,
      isPrimary: false,
    },
  ];

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
          pageId="unit9-page76-main-audio"
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
        className="headset-icon-CD-unit9-page1-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 9 page 76 audio"
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
        className="click-icon-unit9-page1-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
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
        className="headset-icon-CD-unit9-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open Unit 9 vocabulary activity"
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
        className="click-icon-unit9-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open Unit 9 reading activity"
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
        const areaId = `p76-${area.sound}`;
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

export default Unit9_Page1;
