import React, { useRef, useState, useEffect } from "react";

import page3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 3.png";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

// Unit audio files
import unit6Audio from "../../../assets/audio/ClassBook/Unit 1/page 3/unit6.mp3";
import unit7Audio from "../../../assets/audio/ClassBook/Unit 1/page 3/unit7.mp3";
import unit8Audio from "../../../assets/audio/ClassBook/Unit 1/page 3/unit8.mp3";
import unit9Audio from "../../../assets/audio/ClassBook/Unit 1/page 3/unit9.mp3";
import unit10Audio from "../../../assets/audio/ClassBook/Unit 1/page 3/unit10.mp3";

const Page3 = ({ goToUnit }) => {
  const audioRef = useRef(null);
  const [playingUnit, setPlayingUnit] = useState(null);

  const clickableAreas = [
    {
      title: "Unit 6",
      startIndex: 46,
      audio: unit6Audio,
      top: "10.5%",
      left: "13%",
      width: "16.5%",
      height: "3%",
      arrowTop: "10.5%",
      arrowLeft: "30%",
    },
    {
      title: "Unit 7",
      startIndex: 58,
      audio: unit7Audio,
      top: "28%",
      left: "13%",
      width: "24%",
      height: "2.5%",
      arrowTop: "27.5%",
      arrowLeft: "38%",
    },
    {
      title: "Unit 8",
      startIndex: 64,
      audio: unit8Audio,
      top: "44%",
      left: "13%",
      width: "35%",
      height: "3%",
      arrowTop: "44%",
      arrowLeft: "48.5%",
    },
    {
      title: "Unit 9",
      startIndex: 76,
      audio: unit9Audio,
      top: "62%",
      left: "13%",
      width: "21%",
      height: "3%",
      arrowTop: "62%",
      arrowLeft: "35%",
    },
    {
      title: "Unit 10",
      startIndex: 82,
      audio: unit10Audio,
      top: "78%",
      left: "13%",
      width: "43%",
      height: "3%",
      arrowTop: "78%",
      arrowLeft: "56.5%",
    },
  ];

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.onended = null;
      audioRef.current = null;
    }

    setPlayingUnit(null);
  };

  const playUnitAudio = (area) => {
    stopAudio();

    const audio = new Audio(area.audio);
    audioRef.current = audio;

    setPlayingUnit(area.title);

    audio.onended = () => {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setPlayingUnit(null);
      }
    };

    audio.play().catch(() => {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setPlayingUnit(null);
      }
    });
  };

  const handleGoToUnit = (area) => {
    stopAudio();
    goToUnit(area.startIndex);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.onended = null;
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="page1-img-wrapper"
      style={{
        backgroundImage: `url(${page3})`,
        position: "relative",
      }}
      role="group"
      aria-label="Book contents. Units 6 through 10."
    >
      {clickableAreas.map((area) => (
        <React.Fragment key={area.title}>
          {/* UNIT AUDIO AREA */}
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
              height: area.height,
              background: "transparent",
              border: "none",
              borderRadius: "8px",
            }}
          >
            {playingUnit === area.title && (
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-25px",
                  left: "0",
                  background: "#16a34a",
                  color: "#fff",
                  padding: "2px 8px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                🔊 Playing
              </span>
            )}
          </button>

          {/* NAVIGATION ARROW */}
          <button
            type="button"
            onClick={() => handleGoToUnit(area)}
            aria-label={`Go to ${area.title}`}
            className="
              absolute z-20
              flex items-center justify-center
              p-0 bg-transparent border-0
              cursor-pointer
              transition-all duration-150
              hover:scale-110
              active:scale-95
              rounded-full
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-blue-500
            "
            style={{
              top: area.arrowTop,
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
              className="w-full h-full object-contain pointer-events-none"
            />
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Page3;
