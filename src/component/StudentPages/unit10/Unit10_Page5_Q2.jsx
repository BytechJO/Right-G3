import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 5.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 6.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 7.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 8.svg";
import Button from "../../Button";
import blue from "../../../assets/audio/ClassBook/Unit 10/P 86/unit10-pg86-EXA2.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";
import brAudio from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise A2/Item_001_br.mp3";
import grAudio from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise A2/Item_002_gr.mp3";
import trAudio from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise A2/Item_003_tr.mp3";
import crAudio from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise A2/Item_004_cr.mp3";
import drAudio from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise A2/Item_005_dr.mp3";
import frAudio from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise A2/Item_006_fr.mp3";

const optionAudio = {
  br: brAudio,
  gr: grAudio,
  tr: trAudio,
  cr: crAudio,
  dr: drAudio,
  fr: frAudio,
};

const Unit10_Page5_Q2 = () => {
  const items = [
    {
      img: img1,
      options: ["br", "gr", "tr"],
      correct: "gr",
    },
    {
      img: img2,
      options: ["tr", "cr", "dr"],
      correct: "tr",
    },
    {
      img: img3,
      options: ["fr", "tr", "br"],
      correct: "fr",
    },
    {
      img: img4,
      options: ["br", "dr", "cr"],
      correct: "br",
    },
  ];
  const captions = [
    {
      start: 0.28,
      end: 6.899,
      text: "Page 86, write activities, exercise A, number two. Listen and choose.",
    },
    {
      start: 6.899,
      end: 15.46,
      text: "One, grapes. Two, train. Three, fries. Four, broom.",
    },
  ];
  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const chooseOption = (i, value) => {
    if (lockedIds.includes(i)) return;

    const newSelected = [...selected];
    newSelected[i] = value;
    setSelected(newSelected);

    const newAnswers = [...answers];
    newAnswers[i] = items[i].start + value + items[i].end;
    setAnswers(newAnswers);
    setWrongIds((previous) => previous.filter((id) => id !== i));
  };

  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setAnswers(Array(items.length).fill(""));
    setLockedIds([]);
    setWrongIds([]);
    stopAudio();
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setAnswers(items.map((i) => i.start + i.correct + i.end));
    setLockedIds(items.map((_, index) => index));
    setWrongIds([]);
    stopAudio();
  };

  const checkAnswers = () => {
    if (lockedIds.length === items.length) return;

    if (selected.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    items.forEach((item, i) => {
      if (selected[i] === item.correct) {
        score++;
      }
    });

    const total = items.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
  <div style="font-size:20px;text-align:center;">
    <span style="color:${color}; font-weight:bold;">
      Score: ${score} / ${total}
    </span>
  </div>
`;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLockedIds(
      items.flatMap((item, index) =>
        selected[index] === item.correct ? [index] : [],
      ),
    );
    setWrongIds(
      items.flatMap((item, index) =>
        selected[index] !== item.correct ? [index] : [],
      ),
    );
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
          gap: "50px",
        }}
      >
        <ExerciseHeader
          sectionLetter="A"
          questionNumber="2"
          title="Listen and choose."
          subTitle="Listen to the beginning blend, then choose the letters that match the sound you hear."
        />
        <QuestionAudioPlayer
          src={blue}
          captions={captions}
          stopAtSecond={6.3}
          pageId="unit10-page86-a2"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mb-10 px-2">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center", // لتوسيط كل العناصر داخل العمود
              }}
            >
              <div className="flex gap-2">
                {/* الرقم */}
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {i + 1}
                </div>

                {/* الصورة */}
                <img
                  src={item.img}
                  alt={
                    [
                      "A bunch of purple grapes.",
                      "A blue and red train.",
                      "A carton of French fries.",
                      "A broom.",
                    ][i]
                  }
                  style={{
                    width: "100%",

                    height: "120px",
                    objectFit: "contain",
                  }}
                />
              </div>
              {/* الخيارات */}
              <div
                style={{
                  display: "flex",
                  gap: "10px", // مسافة منطقية بين الخيارات (بدل gap-12)
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {item.options.map((opt, idx) => {
                  // تحديد الألوان بناءً على الحالة
                  let borderColor = "#ebe8e5ff"; // رمادي افتراضي
                  let bgColor = "#fbfaf9ff"; // خلفية افتراضية

                  if (selected[i] === opt) {
                    borderColor = "#F79530";
                    bgColor = "#fff6ebff"; // أزرق فاتح لما يختار
                  }

                  if (
                    wrongIds.includes(i) &&
                    selected[i] === opt &&
                    opt !== item.correct
                  ) {
                    borderColor = "red";
                  }

                  return (
                    <div
                      key={idx}
                      role="button"
                      tabIndex={lockedIds.includes(i) ? -1 : 0}
                      aria-disabled={lockedIds.includes(i)}
                      onClick={() => {
                        if (lockedIds.includes(i)) return;
                        playAudio(`option-${i}-${idx}`, optionAudio[opt]);
                        chooseOption(i, opt);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          if (lockedIds.includes(i)) return;
                          playAudio(`option-${i}-${idx}`, optionAudio[opt]);
                          chooseOption(i, opt);
                        }
                      }}
                      className="unit4-interactive unit4-audio-control"
                      style={{
                        flex: 1,
                        textAlign: "center",
                        padding: "4px 8px", // padding شامل عشان يبان كـ زر
                        borderRadius: "20px",
                        cursor: lockedIds.includes(i) ? "default" : "pointer",
                        border: `2px solid ${borderColor}`,
                        backgroundColor: bgColor,
                        fontWeight: "500",
                        fontSize: "16px",
                        position: "relative",
                        transition: "all 0.2s ease", // حركة ناعمة لما يتغير اللون
                        // maxWidth: "120px", // حتى لو الكلام قصير ما يكبر أوي
                      }}
                    >
                      {opt}
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `option-${i}-${idx}`}
                      />

                      {/* ❌ أيقونة الخطأ */}
                      {wrongIds.includes(i) &&
                        selected[i] === opt &&
                        opt !== item.correct && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-10px",
                              left: "90%",
                              transform: "translateX(-50%)", // ضبط التوسيط فوق الزر بالظبط
                              width: "22px",
                              height: "22px",
                              background: "red",
                              color: "white",
                              borderRadius: "50%",
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "bold",
                              border: "2px solid white",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                              pointerEvents: "none",
                            }}
                          >
                            ✕
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={resetAll}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit10_Page5_Q2;
