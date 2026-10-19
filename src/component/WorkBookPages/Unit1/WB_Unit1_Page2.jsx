import React, { useEffect, useRef, useState } from "react";

import page_1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 2.png";

import arrowBtn from "../../../assets/Page 01/Arrow.svg";

import unit1Audio from "../../../assets/audio/WorkBook/units/page 2/unit1.mp3";
import unit2Audio from "../../../assets/audio/WorkBook/units/page 2/unit2.mp3";
import unit3Audio from "../../../assets/audio/WorkBook/units/page 2/unit3.mp3";
import unit4Audio from "../../../assets/audio/WorkBook/units/page 2/unit4.mp3";
import unit5Audio from "../../../assets/audio/WorkBook/units/page 2/unit5.mp3";
import unit6Audio from "../../../assets/audio/WorkBook/units/page 2/unit6.mp3";
import unit7Audio from "../../../assets/audio/WorkBook/units/page 2/unit7.mp3";
import unit8Audio from "../../../assets/audio/WorkBook/units/page 2/unit8.mp3";
import unit9Audio from "../../../assets/audio/WorkBook/units/page 2/unit9.mp3";
import unit10Audio from "../../../assets/audio/WorkBook/units/page 2/unit10.mp3";

const clickableAreas = [
  {
    title: "Unit 1",
    startIndex: 3,
    audio: unit1Audio,
    top: "17.5%",
    left: "19.8%",
    width: "27%",
    arrowLeft: "48.5%",
  },
  {
    title: "Unit 2",
    startIndex: 9,
    audio: unit2Audio,
    top: "22.6%",
    left: "19.8%",
    width: "21%",
    arrowLeft: "41.5%",
  },
  {
    title: "Unit 3",
    startIndex: 15,
    audio: unit3Audio,
    top: "27.7%",
    left: "19.8%",
    width: "23%",
    arrowLeft: "44%",
  },
  {
    title: "Unit 4",
    startIndex: 21,
    audio: unit4Audio,
    top: "32.8%",
    left: "19.8%",
    width: "15%",
    arrowLeft: "35%",
  },
  {
    title: "Unit 5",
    startIndex: 27,
    audio: unit5Audio,
    top: "37.9%",
    left: "19.8%",
    width: "18%",
    arrowLeft: "39.5%",
  },
  {
    title: "Unit 6",
    startIndex: 33,
    audio: unit6Audio,
    top: "43%",
    left: "19.8%",
    width: "12%",
    arrowLeft: "32.5%",
  },
  {
    title: "Unit 7",
    startIndex: 39,
    audio: unit7Audio,
    top: "48.1%",
    left: "19.8%",
    width: "20%",
    arrowLeft: "40.5%",
  },
  {
    title: "Unit 8",
    startIndex: 45,
    audio: unit8Audio,
    top: "53.2%",
    left: "19.8%",
    width: "31.5%",
    arrowLeft: "52%",
  },
  {
    title: "Unit 9",
    startIndex: 51,
    audio: unit9Audio,
    top: "58.3%",
    left: "19.8%",
    width: "16%",
    arrowLeft: "37.5%",
  },
  {
    title: "Unit 10",
    startIndex: 57,
    audio: unit10Audio,
    top: "63.4%",
    left: "19.8%",
    width: "40%",
    arrowLeft: "60.5%",
  },
];

const WB_Unit2_Page1 = ({ goToUnit }) => {
  const audioRef = useRef(null);
  const [playingUnit, setPlayingUnit] = useState(null);

  const stopAudio = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current = null;
  };

  const playUnitAudio = (area) => {
    stopAudio();

    const audio = new Audio(area.audio);
    audioRef.current = audio;

    setPlayingUnit(area.title);

    audio.onended = () => {
      audioRef.current = null;
      setPlayingUnit(null);
    };

    audio.play().catch(() => {
      audioRef.current = null;
      setPlayingUnit(null);
    });
  };

  const handleGoToUnit = (area) => {
    stopAudio();
    setPlayingUnit(null);

    goToUnit?.(area.startIndex);
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div
      className="page1-img-wrapper"
      style={{
        backgroundImage: `url(${page_1})`,
        position: "relative",
      }}
    >
      {clickableAreas.map((area) => (
        <React.Fragment key={area.title}>
          {/* Unit audio area */}
          <button
            type="button"
            onClick={() => playUnitAudio(area)}
            aria-label={`Play ${area.title} audio`}
            aria-pressed={playingUnit === area.title}
            className={`absolute cursor-pointer transition-all duration-150 ${
              playingUnit === area.title
                ? "ring-4 ring-green-500"
                : "hover:ring-2 hover:ring-blue-400"
            }`}
            style={{
              top: area.top,
              left: area.left,
              width: area.width,
              height: "3%",
              background: "transparent",
              border: "none",
              borderRadius: "8px",
            }}
          >
            {playingUnit === area.title && (
              <span
                style={{
                  position: "absolute",
                  top: "-25px",
                  left: 0,
                  background: "#16a34a",
                  color: "#fff",
                  padding: "2px 8px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                🔊 Playing
              </span>
            )}
          </button>

          {/* Arrow to unit */}
          <button
            type="button"
            onClick={() => handleGoToUnit(area)}
            aria-label={`Go to ${area.title}`}
            className="absolute z-20 flex items-center justify-center p-0 bg-transparent border-0 cursor-pointer transition-all duration-150 hover:scale-110 active:scale-95 rounded-full focus:outline-none"
            style={{
              top: area.top,
              left: area.arrowLeft,
              width: "18px",
              height: "18px",
              minWidth: "18px",
              minHeight: "18px",
              maxWidth: "18px",
              maxHeight: "18px",
              padding: 0,
            }}
          >
            <img
              src={arrowBtn}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain pointer-events-none"
            />
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default WB_Unit2_Page1;
