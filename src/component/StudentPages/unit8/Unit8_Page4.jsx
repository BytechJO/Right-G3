import React, { useState, useRef } from "react";
import page_4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 67.png";
import "./Unit8_Page4.css";
import grammarSound from "../../../assets/audio/ClassBook/Unit 8/P 67/unit8-pg67-grammar2.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 8/P 67/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 8/P 67/Pg67_3.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 8/P 67/Pg67_4.1_Adult Lady.mp3";

import video from "../../../assets/videos/grade 3 unit 8 page 67.mp4";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import AudioWithCaption from "../../AudioWithCaption";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit8_Page4 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
 
  const captionsExample = [
    {
      start: 0.399,
      end: 14.039,
      text: "Page sixty-seven, exercise 2. Right grammar. I, he, she, it, they, we, you, verb plus E-D.",
    },
    {
      start: 16.119,
      end: 27.579,
      text: "Did I, he, she, it, they, we, you, verb? He watched TV yesterday.",
    },
    { start: 28.879, end: 30.359, text: "Did he play football?" },
    {
      start: 31.379,
      end: 61.119,
      text: "He didn't play football. Tom and his sister enjoyed their time on the farm. Tom milked the cows and Tom's sister fed the horses. Tom's grandpa had a tractor. The tractor was big. It helped Grandpa do many jobs on the farm. Grandma and Grandpa were very happy. They had cows, sheep, horses, chickens, and a dog. There were lots of chickens on the farm. They had a rooster and yellow chicks",
    },
  ];

  const clickableAreas = [
    { x1: 5.61, y1: 8, x2: 94.03, y2: 27.8, sound: sound1 },
    { x1:6.03, y1: 53.82, x2: 52.66, y2:65.39, sound: sound2 },
    { x1: 5.69, y1: 84.20, x2: 52.66, y2: 95.66, sound: sound3 },
  ];

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
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
      style={{ backgroundImage: `url(${page_4})` }}
    >
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
                  // setActiveAreaIndex(area.sound);
                  playSound(area.sound, `p67-${area.sound}`);
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
        className="headset-icon-CD-unit8-page4-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit8-page4-1 hover:scale-110 transition"
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

export default Unit8_Page4;
