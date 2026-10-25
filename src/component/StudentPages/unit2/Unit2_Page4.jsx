import React, { useState, useContext } from "react";

import page_4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page 13.png";
import "./Unit2_Page4.css";

import grammarSound from "../../../assets/audio/ClassBook/Unit 2/P 13/unit2-pg13-grammer2.mp3";

import sound1 from "../../../assets/audio/ClassBook/Unit 2/P 13/Pg13_2.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 2/P 13/Pg13_2.2_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 2/P 13/Pg13_4.1_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 2/P 13/Pg13_5.1_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 2/P 13/Pg13_6.1_Adult Lady.mp3";

import video from "../../../assets/videos/grade 3 unit 2 page 13.mp4";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";

import AudioWithCaption from "../../AudioWithCaption";

import { AudioContext } from "../../../AudioContext";

const Unit2_Page4 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);

  const captionsExample = [
    {
      start: 0.539,
      end: 4.539,
      text: "Page 13, exercise 2, Right grammar.",
    },
    {
      start: 5.619,
      end: 10.3,
      text: "How often do you, they, we walk to school?",
    },
    {
      start: 11.42,
      end: 27.819,
      text: "How often does she, he, it walk to school? I, they, we always walk to school. He, she, it always rides a motorcycle to work.",
    },
    {
      start: 28.979,
      end: 53.159,
      text: "How often do they walk to school? They always walk to school. They never ride their bikes to school. How often does he ride a motorcycle to work? He always rides a motorcycle to work. He never takes a taxi. How often do they take the subway to work? They usually take the subway to work. They sometimes take a bus.",
    },
  ];

  const clickableAreas = [
    {
      x1: 14.25,
      y1: 8,
      x2: 86.86,
      y2: 16.27,
      sound: sound1,
    },
    {
      x1: 14.26,
      y1: 17.08,
      x2: 87.26,
      y2: 25.94,
      sound: sound2,
    },
    {
      x1: 5.61,
      y1: 35.18,
      x2: 45.92,
      y2: 41.94,
      sound: sound3,
    },
    {
      x1: 49.6,
      y1: 35.16,
      x2: 93.8,
      y2: 44.34,
      sound: sound4,
    },
    {
      x1: 45.4,
      y1: 67.42,
      x2: 94.32,
      y2: 74.82,
      sound: sound5,
    },
  ];

  const handleImageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
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

  return (
    <div
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_4})` }}
    >
      <audio ref={audioRef} style={{ display: "none" }} />

      {/* GRAMMAR AUDIO */}
      <div
        className="headset-icon-CD-unit2-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play page 13 grammar audio with captions"
          onClick={() =>
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
                  pageId="unit2-page13-grammar"
                />
              </div>,
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();

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
                    pageId="unit2-page13-grammar"
                  />
                </div>,
              );
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

      {/* VIDEO */}
      <div
        className="pauseBtn-icon-CD-unit2-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play page 13 grammar video"
          onClick={() =>
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
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();

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

      {/* SENTENCE AUDIOS - LAST */}
      {clickableAreas.map((area, index) => {
        const areaId = `p13-${index}`;
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
            onFocus={() => {
              setHoveredAreaIndex(index);
            }}
            onBlur={() => {
              setHoveredAreaIndex(null);
            }}
            onMouseEnter={() => {
              setHoveredAreaIndex(index);
            }}
            onMouseLeave={() => {
              setHoveredAreaIndex(null);
            }}
          />
        );
      })}
    </div>
  );
};

export default Unit2_Page4;
