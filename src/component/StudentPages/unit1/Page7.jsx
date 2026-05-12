import React, { useState, useRef } from "react";
import page_7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 7.png";
import grammarSound from "../../../assets/audio/ClassBook/Unit 1/P 7/unit1-pg7-grammer2.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 1/P 7/Pg7_2.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 1/P 7/Pg7_3.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 1/P 7/Pg7_4.1_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 1/P 7/Pg7_5.1_Adult Lady.mp3";
import "./Page7.css";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import video from "../../../assets/videos/grade 3 unit 1 page 7.mp4";
import AudioWithCaption from "../../AudioWithCaption";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Page7 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));

    checkAreaAndPlaySound(xPercent, yPercent);
  };
  const captionsExample = [
    {
      start: 0,
      end: 9.88,
      text: "Page 7, exercise 2. Right grammar. Who is older, Stella or Sarah? Stella is older than Sarah. ",
    },
    {
      start: 11.34,
      end: 21.26,
      text: "Stella and Helen are the same age. Which is heavier, the TV or the radio? The TV is heavier than the radio.",
    },
    {
      start: 22.6,
      end: 28.34,
      text: "Which is the biggest sea animal? The whale is the biggest sea animal. ",
    },
    {
      start: 29.6,
      end: 33.7,
      text: "Which barbell is bigger? They're both the same size. ",
    },
    {
      start: 34.9,
      end: 45.7,
      text: "Which is the longest snake? The brown snake is the longest snake. Which is the fastest vehicle? The motorcycle is the fastest vehicle",
    },
  ];

  const clickableAreas = [
    { x1: 7.41, y1: 9.52, x2: 85.8, y2: 20.98, sound: sound1 },
    { x1: 10.08, y1:57.56, x2: 42.26, y2: 63.73, sound: sound2 },
    { x1: 51.80, y1: 32.03, x2: 93.81, y2: 38.29, sound: sound3 },
    { x1: 6.12, y1: 64.85, x2: 49.06, y2: 71.12, sound: sound4 },
  ];

  const checkAreaAndPlaySound = (x, y) => {
    const area = clickableAreas.find(
      (a) => x >= a.x1 && x <= a.x2 && y >= a.y1 && y <= a.y2,
    );

    console.log("Matched Area:", area);

    if (area) playSound(area.sound);
  };
   const playSound = (path, id) => {
    if (!audioRef.current) return;

    // 🔥 وقف أي صوت شغال بأي صفحة
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    audioRef.current.src = path;
    audioRef.current.play();

    setActiveId(id); // 🔥 مهم للهايلايت

    audioRef.current.onended = () => {
      setActiveId(null);
    };
  };
  return (
    <div
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_7})` }}
    >
      {/* <img src={page_7} onClick={handleImageClick} /> */}
      {clickableAreas.map((area, index) => (
        <div
          key={index}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeId === index
              ? "highlight"
              : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={() => {
            playSound(area.sound, `p7-${area.sound}`);
          }}
          onMouseEnter={() => {
            if (!isPlaying) setHoveredAreaIndex(index);
          }}
          onMouseLeave={() => {
            if (!isPlaying) setHoveredAreaIndex(null);
          }}
        ></div>
      ))}
      <div
        className="headset-icon-CD-page7 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
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
                />
              </div>,
              true,
            )
          }
          style={{ overflow: "visible" }}
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

      <div
        className="pauseBtn-icon-CD-page7 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
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
          style={{ overflow: "visible" }}
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
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Page7;
