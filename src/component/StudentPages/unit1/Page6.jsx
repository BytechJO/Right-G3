import React, { useState, useContext } from "react";

import page_6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 6.png";

import grammarSound from "../../../assets/audio/ClassBook/Unit 1/P 6/unit1-pg6-grammar1.mp3";

import sound1 from "../../../assets/audio/ClassBook/Unit 1/P 6/Pg6_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 1/P 6/Pg6_2.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 1/P 6/Pg6_3.1_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 1/P 6/Pg6_4.1_Adult Lady.mp3";

import AudioWithCaption from "../../AudioWithCaption";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";

import video from "../../../assets/videos/grade 3 unit 1 page 6.mp4";

import "./Page6.css";

import { AudioContext } from "../../../AudioContext";

const Page6 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);

  const captionsExample = [
    {
      start: 0.16,
      end: 2.04,
      text: "Page 6, exercise 1.",
    },
    {
      start: 2.58,
      end: 3.5,
      text: "Right grammar.",
    },
    {
      start: 3.96,
      end: 6.24,
      text: "The bear is shorter than the giraffe.",
    },
    {
      start: 6.86,
      end: 9.06,
      text: "The giraffe is taller than the bear.",
    },
    {
      start: 9.74,
      end: 12.66,
      text: "The elephant is the biggest animal in the zoo.",
    },
    {
      start: 13.18,
      end: 15.28,
      text: "The bear is shorter than the giraffe.",
    },
    {
      start: 16.04,
      end: 18.68,
      text: "The giraffe is taller than the bear.",
    },
    {
      start: 19.0,
      end: 21.16,
      text: "The bush is younger than the tree.",
    },
    {
      start: 22.08,
      end: 24.22,
      text: "The tree is older than the bush.",
    },
    {
      start: 24.7,
      end: 27.1,
      text: "Is the bicycle faster than the skateboard?",
    },
    {
      start: 27.8,
      end: 29.12,
      text: "Yes, it is.",
    },
  ];

  const clickableAreas = [
    {
      x1: 6.92,
      y1: 9.52,
      x2: 64.76,
      y2: 20.37,
      sound: sound1,
    },
    {
      x1: 5.37,
      y1: 32.49,
      x2: 45.13,
      y2: 38.86,
      sound: sound2,
    },
    {
      x1: 54.81,
      y1: 32.7,
      x2: 94.32,
      y2: 38.45,
      sound: sound3,
    },
    {
      x1: 47.86,
      y1: 90.75,
      x2: 93.54,
      y2: 96.67,
      sound: sound4,
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
      style={{ backgroundImage: `url(${page_6})` }}
    >
      <audio ref={audioRef} style={{ display: "none" }} />

      {/* =====================================================
          GRAMMAR AUDIO
      ===================================================== */}

      <div
        className="headset-icon-CD-page6 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play page 6 grammar audio with captions"
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
                  pageId="unit1-page6-grammar"
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
                    pageId="unit1-page6-grammar"
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
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>

      {/* =====================================================
          VIDEO
      ===================================================== */}

      <div
        className="pauseBtn-icon-CD-page6 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play page 6 grammar video"
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
                    display: "block",
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
                      display: "block",
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
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>

      {/* =====================================================
          SENTENCE AUDIOS
      ===================================================== */}

      {clickableAreas.map((area, index) => {
        const areaId = `p6-${index}`;
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

export default Page6;
