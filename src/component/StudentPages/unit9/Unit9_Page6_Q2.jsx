import { useEffect as useCheckEffect, useRef as useCheckRef } from "react";
import missingAudio0 from "../../../assets/audio/missings/Was he at the zoo.mp3";
import missingAudio1 from "../../../assets/audio/missings/Was she in the restaurant.mp3";
import missingAudio2 from "../../../assets/audio/missings/Was she at the bakery.mp3";
import missingAudio3 from "../../../assets/audio/missings/Where is she now.mp3";
import missingAudio4 from "../../../assets/audio/missings/Yes, he was..mp3";
import missingAudio5 from "../../../assets/audio/missings/No, he wasn’t..mp3";
import missingAudio6 from "../../../assets/audio/missings/Yes, she was..mp3";
import missingAudio7 from "../../../assets/audio/missings/No, she wasn’t..mp3";
import missingAudio8 from "../../../assets/audio/missings/She is on the train..mp3";
import missingAudio9 from "../../../assets/audio/missings/She is in the computer lab..mp3";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex E 4.svg";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";

function useNativeCheck(disabled) {
  const root = useCheckRef(null);
  useCheckEffect(() => {
    const button = root.current?.querySelector(".check-button2");
    if (!button) return;
    button.disabled = disabled;
    button.style.cursor = disabled ? "not-allowed" : "";
    button.setAttribute("aria-disabled", String(disabled));
  }, [disabled]);
  return root;
}














const MISSING_AUDIO = {
  "Was he at the zoo": missingAudio0,
  "Was she in the restaurant": missingAudio1,
  "Was she at the bakery": missingAudio2,
  "Where is she now": missingAudio3,
  "Yes, he was.": missingAudio4,
  "No, he wasn’t.": missingAudio5,
  "Yes, she was.": missingAudio6,
  "No, she wasn’t.": missingAudio7,
  "She is on the train.": missingAudio8,
  "She is in the computer lab.": missingAudio9
};











const Unit9_Page6_Q2 = () => {
  const items = [
    {
      img: img1,
      imgAlt: "A boy and a girl at a playground with swings and slides.",
      q: "Was he at the zoo?",
      options: ["Yes, he was.", "No, he wasn’t."],
      correct: "No, he wasn’t.",
    },
    {
      q: "Was she in the restaurant?",
      img: img2,
      imgAlt: "A family eating together at a restaurant.",
      options: ["Yes, she was.", "No, she wasn’t."],
      correct: "Yes, she was.",
    },
    {
      q: "Was she at the bakery?",
      img: img3,
      imgAlt: "A girl standing at the zoo near animal enclosures.",
      options: ["Yes, she was.", "No, she wasn’t."],
      correct: "No, she wasn’t.",
    },
    {
      q: "Where is she now?",
      img: img4,
      imgAlt: "A girl sitting at a computer in a computer lab.",
      options: ["She is on the train.", "She is in the computer lab."],
      correct: "She is in the computer lab.",
    },
  ];

  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);

  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const audioFor = (text) => MISSING_AUDIO[text.replace(/\?$/, "")];
  const hearProps = (key, text) => ({
    role: "button", tabIndex: 0, className: "unit4-audio-control unit4-interactive",
    onClick: () => playAudio(key, audioFor(text)),
    onKeyDown: (event) => {
      if (!["Enter", " "].includes(event.key)) return;
      event.preventDefault(); event.stopPropagation();
      if (!event.repeat) playAudio(key, audioFor(text));
    },
    onKeyUp: (event) => { if (["Enter", " "].includes(event.key)) event.stopPropagation(); },
  });
  const chooseOption = (i, value) => {
    playAudio(`option-${i}-${value}`, audioFor(value));
    if (showAns || lockedIds.includes(i)) return;

    const newSelected = [...selected];
    newSelected[i] = value;
    setSelected(newSelected);
    setWrongIds((previous) => previous.filter((id) => id !== i));
  };

  const resetAll = () => {
    stopAudio();
    setSelected(Array(items.length).fill(""));
    setLockedIds([]);
    setWrongIds([]);
    setShowAns(false);
  };

  const showAnswers = () => {
    stopAudio();
    setSelected(items.map((i) => i.correct));
    setLockedIds(items.map((_, index) => index));
    setWrongIds([]);
    setShowAns(true);
  };

  const checkAnswers = () => {
    stopAudio();
    if (showAns || lockedIds.length === items.length) return;

    if (selected.includes("")) {
      ValidationAlert.info();
      return;
    }

    const nextLockedIds = items.flatMap((item, index) =>
      selected[index] === item.correct ? [index] : [],
    );
    const nextWrongIds = items.flatMap((item, index) =>
      selected[index] === item.correct ? [] : [index],
    );
    const score = nextLockedIds.length;

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

    setLockedIds(nextLockedIds);
    setWrongIds(nextWrongIds);
  };

  const exerciseRoot = useNativeCheck(showAns || lockedIds.length === items.length);

  return (
    <div ref={exerciseRoot}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{ gap: "20px" }}>
        <ExerciseHeader
          sectionLetter="E"
          title="Read, look, and tap or click."
          subTitle="Look at each picture, read the question, and choose the correct answer."
        />
        <div className="grid grid-cols-2 gap-y-5 gap-x-20 mb-10 w-full">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                position: "relative",
              }}
            >
              {/* الرقم + السؤال */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {i + 1}.
                </span>
                <span {...hearProps(`question-${i}`, item.q)} style={{ fontSize: "18px", position: "relative", borderRadius: 4 }}>
                  <Unit4PlayingAudioIcon active={activeAudioKey === `question-${i}`} />{item.q}
                </span>
              </div>

              {/* الصورة */}
              <img
                src={item.img}
                alt={item.imgAlt}
                style={{
                  width: "250px",
                  height: "auto",
                }}
              />

              {/* الخيارات */}
              <div className="flex flex-col gap-2 text-[18px]">
                {item.options.map((opt, idx) => (
                  <div key={idx} style={{ position: "relative" }}>
                    <span
                      className="unit4-audio-control unit4-interactive"
                      role="button"
                      tabIndex={showAns || lockedIds.includes(i) ? -1 : 0}
                      aria-disabled={showAns || lockedIds.includes(i)}
                      onClick={() => chooseOption(i, opt)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          event.stopPropagation();
                          if (!event.repeat) chooseOption(i, opt);
                        }
                      }}
                      style={{
                        display: "inline-block",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        cursor: "pointer",
                        minWidth: "90px",

                        border:
                          selected[i] === opt
                            ? wrongIds.includes(i)
                              ? "2px solid red"
                              : "1px solid #F79530"
                            : "1px solid transparent",
                      }}
                    >
                      <Unit4PlayingAudioIcon active={activeAudioKey === `option-${i}-${opt}`} />
                      {opt}
                    </span>

                    {/* ❌ */}
                    {wrongIds.includes(i) &&
                      selected[i] === opt &&
                      opt !== item.correct && (
                        <div
                          style={{
                            position: "absolute",
                            top: "6px",
                            right: "50%",
                            transform: "translateY(-50%)",
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
                ))}
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

export default Unit9_Page6_Q2;
