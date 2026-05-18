import React, { useRef,useState } from "react";
import page25 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 93.png";
import "./Reading_Unit10_Page2.css";
import { FaHeadphones } from "react-icons/fa";
import sound1 from "../../../assets/audio/ClassBook/Unit 10/P 93/Pg93_1.2_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 10/P 93/Pg93_1.3_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 10/P 93/Pg93_1.4_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 10/P 93/Pg93_1.5_Adult Lady.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Reading_Unit10_Page2 = () => {
    const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const clickableAreas = [
    { x1: 8.27, y1: 38.8, x2: 46.53, y2: 49.97, sound: sound1 },
    { x1: 48.35, y1:  38.88, x2: 86.84, y2: 50.13, sound: sound2 },
    { x1: 8.06, y1: 83.13, x2: 46.33, y2: 96.57, sound: sound3 },
    { x1: 48.35, y1: 79.58, x2: 86.84, y2: 96.84, sound: sound4 },
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
    <div className="page1-img-wrapper"
          onClick={handleImageClick}
          style={{ backgroundImage: `url(${page25})` }}>
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
                  playSound(area.sound, `p93-${area.sound}`);
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

export default Reading_Unit10_Page2;
