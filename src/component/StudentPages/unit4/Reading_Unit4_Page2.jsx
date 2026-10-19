import React, { useState } from "react";
import page25 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 39.png";
import "./Reading_Unit4_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/Unit 4/P 39/Pg39_1.5_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 4/P 39/Pg39_1.6_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 4/P 39/Pg39_1.7_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 4/P 39/Pg39_1.8_Adult Lady.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Reading_Unit4_Page2 = () => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const clickableAreas = [
    { x1: 8.27, y1: 38.55, x2: 46.12, y2: 49.9, sound: sound1 },
    { x1: 48.37, y1: 36.63, x2: 86.84, y2: 50.1, sound: sound2 },
    { x1: 8.27, y1: 84.52, x2: 46.12, y2: 95.62, sound: sound3 },
    { x1: 48.37, y1: 84.85, x2: 86.64, y2: 95.77, sound: sound4 },
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

      {clickableAreas.map((area, index) => {
        const areaId = `p39-${index}`;
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
            onFocus={() => setHoveredAreaIndex(index)}
            onBlur={() => setHoveredAreaIndex(null)}
            onMouseEnter={() => setHoveredAreaIndex(index)}
            onMouseLeave={() => setHoveredAreaIndex(null)}
          />
        );
      })}
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Reading_Unit4_Page2;
