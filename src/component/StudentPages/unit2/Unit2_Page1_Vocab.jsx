import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/test.png";
import page2_2 from "../../../assets/imgs/test.png";
import num1 from "../../../assets/imgs/test6.png";
import num2 from "../../../assets/imgs/test6.png";
import num3 from "../../../assets/imgs/test6.png";
import num4 from "../../../assets/imgs/test6.png";
import num5 from "../../../assets/imgs/test6.png";
import num6 from "../../../assets/imgs/test6.png";
import num8 from "../../../assets/imgs/test6.png";
import num9 from "../../../assets/imgs/test6.png";
import num10 from "../../../assets/imgs/test6.png";
import num11 from "../../../assets/imgs/test6.png";
import num12 from "../../../assets/imgs/test6.png";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import vocabulary from "../../../assets/audio/ClassBook/Unit 2/P 10/Pg10_Vocab_Adult Lady.mp3";

import { FaPlay, FaPause } from "react-icons/fa";
import "../../../index.css";
import sound1 from "../../../assets/imgs/test6.png";
import sound4 from "../../../assets/imgs/test6.png";
import sound5 from "../../../assets/imgs/test6.png";
import sound2 from "../../../assets/imgs/test6.png";
import sound3 from "../../../assets/imgs/test6.png";
import sound6 from "../../../assets/imgs/test6.png";
import sound7 from "../../../assets/imgs/test6.png";
import sound8 from "../../../assets/imgs/test6.png";
import sound9 from "../../../assets/imgs/test6.png";
import sound10 from "../../../assets/imgs/test6.png";
import sound11 from "../../../assets/imgs/test6.png";
import sound12 from "../../../assets/imgs/test6.png";

const Unit2_Page1_Vocab = () => {
  const mainAudioRef = useRef(null);

  const [clickedIndex, setClickedIndex] = useState(null);
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const [showContinue, setShowContinue] = useState(false);

  const stopAtSecond = 2.5;

  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);

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
      end: 3.0,
      text: "Page 10, Unit 2. Vocabulary.",
    },
    { start: 2, end: 3, text: "1. France" },
    { start: 3, end: 4, text: "2. bus" },
    { start: 4, end: 5, text: "3. clock tower" },
    { start: 5, end: 6, text: "4. world map" },
    { start: 6, end: 7, text: "5. Nile River" },
    { start: 7, end: 8, text: "6. Egypt" },
    { start: 8, end: 9, text: "7. pyramids" },
    { start: 9, end: 10, text: "8. Australia" },
    { start: 10, end: 11, text: "9. South America" },
    { start: 11, end: 12, text: "10. Statue of Liberty" },
    { start: 12, end: 13, text: "11. tourist / tourists" },
    { start: 13, end: 15, text: "12. globe" },
  ];
  console.log(current);
  // ================================
  // ✔ Word timings
  // ================================
  const wordTimings = [
    { word: "1. scoreboard", start: 3, end: 5.2 }, //
    { word: "2. young", start: 5.2, end: 7.3 }, //
    { word: "3. old", start: 7.3, end: 9.5 }, //
    { word: "4. small", start: 9.5, end: 11 }, //
    { word: "5. big", start: 10.1, end: 12.0 }, //
    { word: "6. referee", start: 12.0, end: 14.1 }, //
    { word: "7. whistle", start: 14.1, end: 16.2 }, //
    { word: "8. fast", start: 16.2, end: 18.2 }, //
    { word: "9. slow", start: 18.2, end: 20.2 }, //
    { word: "10. tall", start: 20.2, end: 22.3 }, //
    { word: "11. short", start: 22.3, end: 24.3 }, //
    { word: "12. basketball court", start: 24.3, end: 27.5 }, //
  ];
  const words = [
    "France",
    "bus",
    "clock tower",
    "world map",
    "Nile River",
    "Egypt",
    "pyramids",
    "Australia",
    "South America",
    "Statue of Liberty",
    "tourist / tourists",
    "globe",
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

  // ================================
  // ✔ Update Word highlight
  // ================================
  const updateWord = (time) => {
    const wordIndex = wordTimings.findIndex(
      (w) => time >= w.start && time <= w.end,
    );
    setActiveIndex2(wordIndex);
  };

  // ================================
  // ✔ INITIAL PLAY & STOP AT SECOND
  // ================================
  useEffect(() => {
    const audio = mainAudioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();

    const interval = setInterval(() => {
      if (audio.currentTime >= stopAtSecond) {
        audio.pause();
        setPaused(true);
        setIsPlaying(false);
        setShowContinue(true);
        clearInterval(interval);
      }
    }, 100);

    const handleEnded = () => {
      mainAudioRef.current.currentTime = 0;
      setIsPlaying(false);
      setPaused(true);
      setShowContinue(true);
      setActiveIndex(null);
      setActiveIndex2(null);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      clearInterval(interval);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // ================================
  // ✔ Play/Pause toggle
  // ================================
  const togglePlay = () => {
    const audio = mainAudioRef.current;
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

  const wordAudios = [
    sound1,
    sound2,
    sound3,
    sound4,
    sound5,
    sound6,
    sound7,
    sound8,
    sound9,
    sound10,
    sound11,
    sound12,
  ];
  const playWordAudio = (index) => {
    // أوقفي الأوديو الرئيسي
    mainAudioRef.current.pause();

    // أوقفي أي كلمة شغالة
    wordRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });

    const audio = wordRefs.current[index].current;
    if (!audio) return;

    // تشغيل الصوت من البداية
    audio.currentTime = 0;
    audio.play();

    // 🔥 فعل الأنيميشن على طول فترة التشغيل
    setClickedIndex(index);

    // 🔥 عند انتهاء الصوت -> أطفئ الأنيميشن
    audio.onended = () => {
      setClickedIndex(null);
    };
  };

  const wordRefs = useRef(wordAudios.map(() => React.createRef()));

  const nums = [
    num1,
    num2,
    num3,
    num4,
    num5,
    num6,
    num8,
    num9,
    num10,
    num11,
    num12,
  ];

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* ============================
           AUDIO PLAYER
      ============================= */}
      <div
        className="audio-popup-vocab-container"
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0px 20px",
          position: "relative",
          alignItems: "center",
        }}
      >
        <div className="audio-popup-vocab">
          <div className="audio-inner player-ui">
            <audio
              ref={mainAudioRef}
              src={vocabulary}
              onTimeUpdate={(e) => {
                const t = e.target.currentTime;
                setCurrent(t);
                updateCaption(t);
                updateWord(t); // 🔥 أهم خطوة
              }}
              onLoadedMetadata={(e) => setDuration(e.target.duration)}
            ></audio>

            {/* Time + Slider */}
            <div className="top-row">
              <span className="audio-time">
                {new Date(current * 1000).toISOString().substring(14, 19)}
              </span>

              <input
                type="range"
                min="0"
                max={duration}
                value={current}
                className="audio-slider"
                onChange={(e) => {
                  mainAudioRef.current.currentTime = e.target.value;
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

            {/* Buttons */}
            <div className="bottom-row">
              <div
                className={`round-btn ${showCaption ? "active" : ""}`}
                onClick={() => setShowCaption(!showCaption)}
              >
                <TbMessageCircle size={36} />
              </div>

              <button className="play-btn2" onClick={togglePlay}>
                {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
              </button>

              <div>
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
                        mainAudioRef.current.volume = e.target.value;
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================
           IMAGE + WORDS
      ============================= */}
      <div
        style={{ position: "relative", marginTop: "5px", width: "fit-content" }}
      >
        <div className={`caption-inPopup ${showCaption ? "show" : ""}`}>
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
        {/* Image + Words */}
        <img
          src={page2_2}
          style={{
            height: "170px",
            position: "absolute",
            bottom: "0%",
            right: "0%",
            borderRadius: "5%",
          }}
        />

        <div className="vocab_container" style={{ bottom: "2%", right: "6%" }}>
          {words.map((text, i) => (
            <h6
              key={i}
              className={
                (activeIndex2 === i && current >= 2.8) || clickedIndex === i
                  ? "active"
                  : ""
              }
              onClick={() => playWordAudio(i)}
            >
              {i + 1} {text}
            </h6>
          ))}
        </div>

        {/* Numbers */}
        {nums.map((num, i) => (
          <img
            key={i}
            src={num}
            className={`num-img ${
              (activeIndex2 === i && current >= 2.8) || clickedIndex === i
                ? "active"
                : ""
            }`}
            style={{
              height: "20px",
              position: "absolute",
              top: ["43%", "44%", "42%", "27.5%", "24.5%"][i],
              left: ["19%", "52%", "66%", "34%", "32%"][i],
            }}
          />
        ))}

        {/* Background */}
        <img src={backgroundImage} style={{ height: "75vh" }} />
      </div>
      {wordAudios.map((src, i) => (
        <audio key={i} ref={wordRefs.current[i]} src={src} />
      ))}
    </div>
  );
};

export default Unit2_Page1_Vocab;
