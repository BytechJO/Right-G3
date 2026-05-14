import React, { useRef, useState } from "react";
import page25 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 57.png";
import "./Reading_Unit6_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/Unit 6/P 57/Pg57_1.5_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 6/P 57/Pg57_1.6_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 6/P 57/Pg57_1.7_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 6/P 57/Pg57_1.8_Adult Lady.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Reading_Unit6_Page2 = () => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const clickableAreas = [
    { x1: 8.06, y1: 39.3, x2: 46.53, y2: 49.81, sound: sound1 },
    { x1: 48.35, y1: 39.13, x2: 86.7, y2: 49.97, sound: sound2 },
    { x1: 8.06, y1:79.58, x2: 46.26, y2: 95.77, sound: sound3 },
    { x1: 48.56, y1: 86.35, x2: 86.84, y2: 95.61, sound: sound4 },
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
      style={{ backgroundImage: `url(${page25})` }}
    >
      {/* <img
        src={page25}
        style={{ display: "block" }}
        onClick={handleImageClick}
      /> */}

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
                  playSound(area.sound, `p57-${area.sound}`);
                }}
          onMouseEnter={() => {
            if (!isPlaying) setHoveredAreaIndex(index);
          }}
          onMouseLeave={() => {
            if (!isPlaying) setHoveredAreaIndex(null);
          }}
        ></div>
      ))}
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Reading_Unit6_Page2;
