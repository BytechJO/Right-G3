import React, { useState, useRef } from "react";
import page_3 from "../../../assets/imgs/pages/Right_3_student/Right Int SB G3_page-0060.jpg";
import "./Unit7_Page3.css";
import grammarSound from "../../../assets/audio/ClassBook/U 7/CD41.Pg60_Grammar1_Adult Lady.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 7/P 60/Pg60_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 7/P 60/Pg60_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 7/P 60/Pg60_5.1_Boy.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 7/P 60/Pg60_3.1_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 7/P 60/Pg60_4.1_Adult Lady.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 7/P 60/Pg60_5.2_Girl.mp3";


import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
// import video from "../../../assets/img_unit5/sounds-unit5/p12 1920.mp4";
const Unit7_Page3 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 3.22, text: "Page 60, Exercise 1. Right Grammar." },
  ];

  const clickableAreas = [
{ x1: 9.5, y1: 12.7, x2: 35.0, y2: 22.0, sound: sound1 },   
  { x1: 39.5, y1: 11.8, x2: 91.6, y2: 23.0, sound: sound2 },
{ x1: 58.5, y1: 26.8, x2: 87.6, y2: 36.0, sound: sound5 },
// { x1: 8.5, y1: 26.8, x2: 39.6, y2: 36.0, sound: sound2 },
{ x1: 8.5, y1: 26.8, x2: 39.6, y2: 36.0, sound: sound4 },
{ x1: 8.5, y1: 64.8, x2: 48.6, y2: 68.0, sound: sound3 },
{ x1: 31.5, y1: 89.2, x2: 54.6, y2: 92.4, sound: sound6 }


  ];
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };
  const playSound = (soundPath) => {
    if (audioRef.current) {
      audioRef.current.src = soundPath;
      audioRef.current.play();
      setIsPlaying(true);
      setHoveredAreaIndex(null); // إزالة الهايلايت عند بدء الصوت

      audioRef.current.onended = () => {
        setIsPlaying(false);
        setHoveredAreaIndex(null);
        setActiveAreaIndex(null); // مسح الهايلايت بعد انتهاء الصوت
      };
    }
  };

  return (
    <div
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_3})` }}
    >
      {/* <img
        src={page_3}
        style={{ display: "block" }}
        onClick={handleImageClick}
      /> */}
      {clickableAreas.map((area, index) => (
        <div
          key={index}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeAreaIndex === index
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
            setActiveAreaIndex(index); // لتثبيت الهايلايت أثناء الصوت
            playSound(area.sound);
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
        className="headset-icon-CD-unit5-page3-1 hover:scale-110 transition"
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
            )
          }
          style={{ overflow: "visible" }}
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
                  {/* <source src={video} type="video/mp4" /> */}
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

export default Unit7_Page3;
