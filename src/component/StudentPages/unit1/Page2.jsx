import React, { useRef, useState, useEffect } from "react";

import page2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 2.png";

import arrowBtn from "../../../assets/Page 01/Arrow.svg";

import unit1Audio from "../../../assets/audio/ClassBook/Unit 1/page 2/unit1.mp3";
import unit2Audio from "../../../assets/audio/ClassBook/Unit 1/Page 2/unit2.mp3";
import unit3Audio from "../../../assets/audio/ClassBook/Unit 1/Page 2/unit3.mp3";
import unit4Audio from "../../../assets/audio/ClassBook/Unit 1/Page 2/unit4.mp3";
import unit5Audio from "../../../assets/audio/ClassBook/Unit 1/Page 2/unit5.mp3";

const Page2 = ({ goToUnit }) => {
  const audioRef = useRef(null);
  const [playingUnit, setPlayingUnit] = useState(null);

  const clickableAreas = [
    {
      title: "Unit 1",
      startIndex: 4,
      audio: unit1Audio,
      top: "10%",
      left: "13%",
      width: "31%",
      height: "3%",
      arrowTop: "10%",
      arrowLeft: "44.5%",
    },
    {
      title: "Unit 2",
      startIndex: 10,
      audio: unit2Audio,
      top: "27.5%",
      left: "13%",
      width: "25%",
      height: "3%",
      arrowTop: "27.5%",
      arrowLeft: "38.5%",
    },
    {
      title: "Unit 3",
      startIndex: 22,
      audio: unit3Audio,
      top: "44%",
      left: "13%",
      width: "27.4%",
      height: "3%",
      arrowTop: "44%",
      arrowLeft: "41%",
    },
    {
      title: "Unit 4",
      startIndex: 28,
      audio: unit4Audio,
      top: "62%",
      left: "13%",
      width: "20%",
      height: "3%",
      arrowTop: "62%",
      arrowLeft: "33%",
    },
    {
      title: "Unit 5",
      startIndex: 40,
      audio: unit5Audio,
      top: "78%",
      left: "13%",
      width: "24%",
      height: "3%",
      arrowTop: "78%",
      arrowLeft: "37%",
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

    if (!area.audio) return;

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
        backgroundImage: `url(${page2})`,
        position: "relative",
      }}
      role="group"
      aria-label="Book contents. Choose a unit to listen or navigate."
    >
      {clickableAreas.map((area) => (
        <React.Fragment key={area.title}>
          {/* UNIT AUDIO AREA */}
          <button
            type="button"
            onClick={() => playUnitAudio(area)}
            disabled={!area.audio}
            aria-label={`Play ${area.title} audio`}
            aria-pressed={playingUnit === area.title}
            className={`absolute cursor-pointer transition-all duration-150
              ${
                playingUnit === area.title
                  ? "ring-4 ring-green-500"
                  : "hover:ring-2 hover:ring-blue-400"
              }
            `}
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

export default Page2;
