import { useContext } from "react";

import page_1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58.png";
import "./Unit7_Page1.css";

import Unit7_Page1_Read from "./Unit7_Page1_Read";
import Unit7_Page1_Vocab from "./Unit7_Page1_Vocab";
import Unit7_Page1_find from "./Unit7_Page1_find";

import AudioWithCaption from "../../AudioWithCaption";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

import allunit3 from "../../../assets/audio/ClassBook/Unit 7/P 58/CD41.Pg58_U7Intro_Adult Lady.mp3";

import sound1 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound13.mp3";

import { AudioContext } from "../../../AudioContext";

const Unit7_Page1 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const captionsExample = [
    {
      start: 0,
      end: 4.0,
      text: "Page 58, Unit 7, It’s Boarding Time.",
    },
  ];

  const areas = [
    { x1: 57.2, y1: 16.5, sound: 1, isPrimary: true },

    { x1: 50.1, y1: 19.1, sound: 2, isPrimary: true },

    { x1: 45.72, y1: 25.7, sound: 3, isPrimary: true },
    {
      x1: 44.41,
      y1: 28.3,
      x2: 52.17,
      y2: 32.87,
      sound: 3,
      isPrimary: false,
    },

    { x1: 63.23, y1: 33.5, sound: 4, isPrimary: true },
    {
      x1: 66.82,
      y1: 36.6,
      x2: 70.48,
      y2: 41,
      sound: 4,
      isPrimary: false,
    },

    { x1: 49.6, y1: 33.75, sound: 5, isPrimary: true },
    {
      x1: 44.41,
      y1: 35.24,
      x2: 52.81,
      y2: 40.83,
      sound: 5,
      isPrimary: false,
    },

    { x1: 56.5, y1: 33.1, sound: 6, isPrimary: true },
    {
      x1: 54.32,
      y1: 35.41,
      x2: 63.16,
      y2: 39.64,
      sound: 6,
      isPrimary: false,
    },

    { x1: 59.7, y1: 25.7, sound: 7, isPrimary: true },
    {
      x1: 53.03,
      y1: 27.63,
      x2: 63.37,
      y2: 32.2,
      sound: 7,
      isPrimary: false,
    },

    { x1: 67.4, y1: 43.2, sound: 8, isPrimary: true },

    { x1: 34.6, y1: 52.3, sound: 9, isPrimary: true },
    {
      x1: 29.33,
      y1: 52.84,
      x2: 70.05,
      y2: 62.15,
      sound: 9,
      isPrimary: false,
    },

    { x1: 23.5, y1: 65.9, sound: 10, isPrimary: true },
    {
      x1: 13.17,
      y1: 65.37,
      x2: 35.79,
      y2: 69.6,
      sound: 10,
      isPrimary: false,
    },

    { x1: 77.38, y1: 48.76, sound: 11, isPrimary: true },
    {
      x1: 77.38,
      y1: 45.9,
      x2: 82.33,
      y2: 51.32,
      sound: 11,
      isPrimary: false,
    },

    { x1: 77.7, y1: 12.5, sound: 12, isPrimary: true },
    {
      x1: 64.88,
      y1: 12.06,
      x2: 98.28,
      y2: 18.83,
      sound: 12,
      isPrimary: false,
    },

    { x1: 57.8, y1: 42.2, sound: 13, isPrimary: true },
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
  };

  const soundLabels = {
    1: "Sound 1",
    2: "Sound 2",
    3: "Sound 3",
    4: "Sound 4",
    5: "Sound 5",
    6: "Sound 6",
    7: "Sound 7",
    8: "Sound 8",
    9: "Sound 9",
    10: "Sound 10",
    11: "Sound 11",
    12: "Sound 12",
    13: "Sound 13",
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
          pageId="unit7-page58-main-audio"
        />
      </div>,
    );
  };

  const openFind = () => {
    openPopup(
      "html",
      <>
        <Unit7_Page1_find />
      </>,
    );
  };

  const openVocabulary = () => {
    openPopup(
      "html",
      <>
        <Unit7_Page1_Vocab />
      </>,
    );
  };

  const openRead = () => {
    openPopup(
      "html",
      <>
        <Unit7_Page1_Read />
      </>,
    );
  };

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <div
        className="headset-icon-CD-unit7-page1-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 7 page 58 audio"
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
        className="click-icon-unit7-page1-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open find the drum activity"
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
        className="headset-icon-CD-unit7-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open Unit 7 vocabulary activity"
          onClick={openVocabulary}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openVocabulary();
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
        className="click-icon-unit7-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open Unit 7 reading activity"
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
        const areaId = `p58-${area.sound}`;
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

export default Unit7_Page1;
