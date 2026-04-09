import { useState, useRef } from "react";
import page_1 from "../../../assets/imgs/pages/Right_3_student/Right Int SB G3_page-0058.jpg";
import "./Unit7_Page1.css";
import Unit5_Page1_Read from "./Unit7_Page1_Read";
import Unit5_Page1_Vocab from "./Unit7_Page1_Vocab";
import Unit5_Page1_find from "./Unit7_Page1_find";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import allunit3 from "../../../assets/audio/ClassBook/Unit 7/P 58/CD41.Pg58_U7Intro_Adult Lady.mp3"
import sound1 from "../../../assets/audio/ClassBook/Unit 7/P 58/Pg58_1.1_Adult Lady.mp3";
// import sound2 from "../../../assets/img_unit3/sounds-unit3/U2-02.mp3";
// import sound3 from "../../../assets/img_unit3/sounds-unit3/U2-03.mp3";
// import sound4 from "../../../assets/img_unit3/sounds-unit3/U2-04.mp3";
// import sound5 from "../../../assets/img_unit3/sounds-unit3/U2-05.mp3";

const Unit7_Page1 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const captionsExample = [
    { start: 0, end: 4.0, text: " Page 58, Unit 7, It’s Boarding Time. " },
  ];

  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 56, y1: 17, x2: 77.0, y2: 30.0, sound: 1, isPrimary: true },

    // // الصوت الأول – منطقة إضافية
    { x1: 69.5, y1: 25.8, x2: 75.9, y2: 33.4, sound: 1, isPrimary: false },


    { x1: 50.26, y1: 20.98, x2: 77.0, y2: 30.0, sound: 2, isPrimary: true },
    { x1: 46.72, y1: 26.97, x2: 77.0, y2: 30.0, sound: 3, isPrimary: true },
    { x1: 62.23 , y1: 34.07, x2: 77.0, y2: 30.0, sound: 4, isPrimary: true },
   
    { x1: 49.23 , y1: 34.07, x2: 77.0, y2: 30.0, sound: 5, isPrimary: true },
    { x1: 55.77 , y1: 33.37, x2: 77.0, y2: 30.0, sound: 6, isPrimary: true },
    { x1: 59.22 , y1: 26.3, x2: 77.0, y2: 30.0, sound: 7, isPrimary: true },
    { x1: 65.90  , y1:  42.72, x2: 77.0, y2: 30.0, sound: 8, isPrimary: true },
    { x1: 36.09 , y1: 51.22, x2: 77.0, y2: 30.0, sound: 9, isPrimary: true },
    { x1: 25.27 , y1: 63.90, x2: 77.0, y2: 30.0, sound: 10, isPrimary: true },
    { x1: 75.38 , y1: 47.76, x2: 77.0, y2: 30.0, sound: 11, isPrimary: true },
    { x1: 56.99 , y1: 41.87, x2: 77.0, y2: 30.0, sound: 12, isPrimary: true },
    { x1: 76.16 , y1: 14.02, x2: 77.0, y2: 30.0, sound: 13, isPrimary: true },


  ];
  const sounds = {
    1: sound1,
    // 2: sound2,
    // 3: sound3,
    // 4: sound4,
    // 5: sound5,

  };

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };
  const playSound = (path) => {
    if (audioRef.current) {
      audioRef.current.src = path;
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
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <audio ref={audioRef} style={{ display: "none" }} />

      {areas.map((area, index) => {
        const isActive = activeAreaIndex === area.sound;

        // ============================
        // 1️⃣ المنطقة الأساسية → دائرة تظهر فقط عندما تكون Active
        // ============================
        if (area.isPrimary) {
          return (
            <div
              key={index}
              className={`circle-area ${isActive ? "active" : ""}`}
              style={{
                left: `${area.x1}%`,
                top: `${area.y1}%`,
              }}
              onClick={() => {
                setActiveAreaIndex(area.sound);
                playSound(sounds[area.sound]);
              }}
            ></div>
          );
        }

        // ============================
        // 2️⃣ المناطق الفرعية → مربعات داكنة مخفية ولازم
        //    عند الضغط عليها → تفعّل الدائرة الأساسية
        // ============================
        return (
          <div
            key={index}
            className="clickable-area"
            style={{
              position: "absolute",
              left: `${area.x1}%`,
              top: `${area.y1}%`,
              width: `${area.x2 - area.x1}%`,
              height: `${area.y2 - area.y1}%`,
            }}
            onClick={() => {
              setActiveAreaIndex(area.sound); // 👈 يفعل الدائرة فوق الرقم
              playSound(sounds[area.sound]);
            }}
          ></div>
        );
      })}

      <div
        className="headset-icon-CD-unit5-page1-1 hover:scale-110 transition"
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
                <AudioWithCaption src={allunit3} captions={captionsExample} />
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
        className="click-icon-unit5-page1-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <>
                <Unit5_Page1_find />
              </>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="50"
            y="-350"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <div
        className="headset-icon-CD-unit5-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <>
                <Unit5_Page1_Vocab />
              </>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <div
        className="click-icon-unit5-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <>
                <Unit5_Page1_Read />
              </>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="100"
            y="-230"
            width="90"
            height="90"
          />
        </svg>
      </div>
    </div>
  );
};

export default Unit7_Page1;
