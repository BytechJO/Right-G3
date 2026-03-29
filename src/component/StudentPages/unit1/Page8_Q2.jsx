/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import "./Page8_Q2.css";
import sound1 from "../../../assets/audio/ClassBook/Unit 1/P 8/CD6.Pg8_Instruction1_Adult Lady.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";

const Page8_Q2 = () => {
  const groups = [
    { words: ["may", "lake", "jam", "paint"], correct: [0, 1, 3] },
    { words: ["bee", "bed", "feet", "tea"], correct: [0, 2, 3] },
    { words: ["kite", "bike", "light", "fish"], correct: [0, 1, 2] },
    { words: ["home", "boat", "box", "note"], correct: [0, 1, 3] },
    { words: ["run", "blue", "sue", "tube"], correct: [1, 2, 3] },
  ];
  const [showResult2, setShowResult2] = useState(false);
  const [selected, setSelected] = useState(groups.map(() => []));
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);

  const audioRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const stopAtSecond = 9;

  // إعدادات الصوت
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const settingsRef = useRef(null);
  const [forceRender, setForceRender] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCaption, setShowCaption] = useState(false);

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 9.04,
      text: "Page 8, exercise A number 2. Listen and circle the words with long vowel sounds.",
    },
    { start: 9.06, end: 13.14, text: "1. goose, gate, kiwi," },
    { start: 13.16, end: 17.17, text: "2. kick, goat, kite," },
    { start: 17.19, end: 22.06, text: "3. king, garlic, game,  " },
    { start: 22.08, end: 27.09, text: "4. kangaroo, key, grapes. " },
  ];

  // ================================
  // ✔ Update caption highlight
  // ================================
  const updateCaption = (time) => {
    const index = captions.findIndex(
      (cap) => time >= cap.start && time <= cap.end,
    );
    setActiveIndex(index);
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();

    const interval = setInterval(() => {
      if (audio.currentTime >= stopAtSecond) {
        audio.pause();
        setPaused(true);
        setIsPlaying(false);
        clearInterval(interval);
      }
    }, 100);

    // عند انتهاء الأوديو يرجع يبطل أنيميشن + يظهر Continue
    const handleEnded = () => {
      const audio = audioRef.current;
      audio.currentTime = 0; // ← يرجع للبداية
      setActiveIndex(null);
      setPaused(false);
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      clearInterval(interval);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setForceRender((prev) => prev + 1);
    }, 1000); // كل ثانية
    if (activeIndex === -1 || activeIndex === null) return;

    const el = document.getElementById(`caption-${activeIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return () => clearInterval(timer);
  }, [activeIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setPaused(false);
      setIsPlaying(true);
    } else {
      audio.pause();
      setPaused(true);
      setIsPlaying(false);
    }
  };

  const showAnswers = () => {
    const correctSelections = groups.map((g) => g.correct);

    setSelected(correctSelections);
    setShowResult2(true);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked || showResult2) return;
    const hasEmpty = selected.some((arr) => arr.length === 0);

    if (hasEmpty) {
      ValidationAlert.info("Please select at least one word in each group!");
      return;
    }
    let correctCount = 0;
    let total = 0;

    groups.forEach((group, index) => {
      total += group.correct.length;

      group.correct.forEach((correctIndex) => {
        if (selected[index].includes(correctIndex)) {
          correctCount++;
        }
      });
    });

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="font-weight:bold;">
        Score: ${correctCount} / ${total}
      </span>
    </div>
  `;

    if (correctCount === total) ValidationAlert.success(msg);
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setShowResult2(true);
    setLocked(true);
  };

  const reset = () => {
    setSelected(groups.map(() => []));
    setShowResult(false);
    setShowResult2(false);
    setLocked(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <h5 className="header-title-page8">
          <span style={{ color: "#2e3192", marginRight: "20px" }}>2</span>
          Listen and circle the words with
          <span style={{ color: "#2e3192" }}>long vowel</span> sounds.
        </h5>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            className="audio-popup-read"
            style={{
              width: "50%",
              marginTop: "0px",
            }}
          >
            <div className="audio-inner player-ui">
              <audio
                ref={audioRef}
                src={sound1}
                onTimeUpdate={(e) => {
                  const time = e.target.currentTime;
                  setCurrent(time);
                  updateCaption(time);
                }}
                onLoadedMetadata={(e) => setDuration(e.target.duration)}
              ></audio>
              {/* Play / Pause */}
              {/* الوقت - السلايدر - الوقت */}
              <div className="top-row">
                <span className="audio-time">
                  {new Date(current * 1000).toISOString().substring(14, 19)}
                </span>

                <input
                  type="range"
                  className="audio-slider"
                  min="0"
                  max={duration}
                  value={current}
                  onChange={(e) => {
                    audioRef.current.currentTime = e.target.value;
                    updateCaption(Number(e.target.value));
                  }}
                  style={{
                    background: `linear-gradient(to right, #430f68 ${
                      (current / duration) * 100
                    }%, #d9d9d9ff ${(current / duration) * 100}%)`,
                  }}
                />

                <span className="audio-time">
                  {new Date(duration * 1000).toISOString().substring(14, 19)}
                </span>
              </div>
              {/* الأزرار 3 أزرار بنفس السطر */}
              <div className="bottom-row">
                {/* فقاعة */}
                <div
                  className={`round-btn ${showCaption ? "active" : ""}`}
                  style={{ position: "relative" }}
                  onClick={() => setShowCaption(!showCaption)}
                >
                  <TbMessageCircle size={36} />
                  <div
                    className={`caption-inPopup ${showCaption ? "show" : ""}`}
                    style={{ top: "100%", left: "10%" }}
                  >
                    {captions.map((cap, i) => (
                      <p
                        key={i}
                        id={`caption-${i}`}
                        className={`caption-inPopup-line2 ${
                          activeIndex === i ? "active" : ""
                        }`}
                      >
                        {cap.text}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Play */}
                <button className="play-btn2" onClick={togglePlay}>
                  {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
                </button>

                {/* Settings */}
                <div className="settings-wrapper" ref={settingsRef}>
                  <button
                    className={`round-btn ${showSettings ? "active" : ""}`}
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <IoMdSettings size={36} />
                  </button>

                  {showSettings && (
                    <div className="settings-popup">
                      <label>Volume</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={(e) => {
                          setVolume(e.target.value);
                          audioRef.current.volume = e.target.value;
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "35px",
              marginTop: "30px",
            }}
          >
            {groups.map((group, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "-20px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {index + 1}
                </div>

                <div
                  style={{
                    background: "#FEF3E6",
                    padding: "1vw 2.5vw",
                    borderRadius: "1vw",
                    minWidth: "7vw",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {group.words.map((word, i) => {
                    const isSelected = selected[index].includes(i);
                    const isCorrect = group.correct.includes(i);

                    return (
                      <div
                        key={i}
                        onClick={() => {
                          if (locked) return;

                          const newSelected = [...selected];

                          if (newSelected[index].includes(i)) {
                            newSelected[index] = newSelected[index].filter(
                              (x) => x !== i,
                            );
                          } else {
                            newSelected[index].push(i);
                          }

                          setSelected(newSelected);
                        }}
                        style={{
                          fontSize: "18px",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        {word}

                        {isSelected && (
                          <>
                            {isSelected && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "-4px",
                                  left: "-6px",
                                  right: "-6px",
                                  bottom: "-4px",
                                  border: showResult2
                                    ? isCorrect
                                      ? "2px solid green"
                                      : "none" // ❌ هون تنشال الدائرة للغلط
                                    : "2px solid red",
                                  borderRadius: "20px",
                                  pointerEvents: "none",
                                }}
                              />
                            )}

                            {/* ❌ علامة الغلط */}
                            {showResult2 && !isCorrect && <WrongMark />}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button
        handleShowAnswer={showAnswers}
        handleStartAgain={reset}
        checkAnswers={checkAnswers}
      />
    </div>
  );
};

export default Page8_Q2;
