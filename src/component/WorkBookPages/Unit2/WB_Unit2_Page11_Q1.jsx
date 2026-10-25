import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit2PlayingAudioIcon from "./WorkbookUnit2PlayingAudioIcon";
import useWorkbookUnit2Audio from "./useWorkbookUnit2Audio";
import "./workbookUnit2Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/123/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/123/Asset 6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/123/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/123/Asset 8.svg";
import img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/Asset 24.svg";
import alwaysAudio from "../../../assets/audio/WorkBook/unit2/Page 11 - Exercise E/Item_001_always.mp3";
import usuallyAudio from "../../../assets/audio/WorkBook/unit2/Page 11 - Exercise E/Item_002_usually.mp3";
import sometimesAudio from "../../../assets/audio/WorkBook/unit2/Page 11 - Exercise E/Item_003_sometimes.mp3";
import rarelyAudio from "../../../assets/audio/WorkBook/unit2/Page 11 - Exercise E/Item_004_rarely.mp3";
import neverAudio from "../../../assets/audio/WorkBook/unit2/Page 11 - Exercise E/Item_005_never.mp3";
const WRONG_COLOR = "#ef4444";

const ANSWERS = [
  {
    id: 1,
    correct: "She usually irons the clothes.",
    img: img1,
  },
  {
    id: 2,
    correct: "He rarely reads the newspaper.",
    img: img2,
  },
  {
    id: 3,
    correct: "They sometimes play chess.",
    img: img3,
  },
  {
    id: 4,
    correct: "She always goes to bed.",
    img: img4,
  },
];

const FREQUENCIES = ["always", "usually", "sometimes", "never", "rarely"];
const leftPositions = ["10%", "30%", "47%", "65%", "85%"];
const FREQUENCY_AUDIO = {
  always: alwaysAudio,
  usually: usuallyAudio,
  sometimes: sometimesAudio,
  rarely: rarelyAudio,
  never: neverAudio,
};

// 🔥 توليد 4 خيارات لكل سؤال
const buildOptions = (sentence) => {
  const words = sentence.split(" ");
  const subject = words[0]; // She
  const rest = words.slice(2).join(" "); // irons clothes.

  return FREQUENCIES.map((freq) => `${subject} ${freq} ${rest}`);
};

export default function WB_LookAndWrite_PageE() {
  const [answers, setAnswers] = useState({});
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit2Audio();

  const handleSelectChange = (id, value) => {
    if (showAns || correctIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [`a-${id}`]: value,
    }));
    setCheckedIds((previous) => previous.filter((itemId) => itemId !== id));
  };

  const handleCheck = () => {
    if (showAns || correctIds.length === ANSWERS.length) return;

    // ✅ تأكد كلهم معبّيين
    const allFilled = ANSWERS.every((item) => answers[`a-${item.id}`]);

    if (!allFilled) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ANSWERS.forEach((item) => {
      if (answers[`a-${item.id}`] === item.correct) {
        score++;
      }
    });

    setCheckedIds(ANSWERS.map((item) => item.id));
    setCorrectIds(
      ANSWERS.filter((item) => answers[`a-${item.id}`] === item.correct).map(
        (item) => item.id,
      ),
    );

    if (score === ANSWERS.length)
      ValidationAlert.success(`Score: ${score} / ${ANSWERS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ANSWERS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ANSWERS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ANSWERS.forEach((item) => {
      filled[`a-${item.id}`] = item.correct;
    });

    setAnswers(filled);
    setCheckedIds(ANSWERS.map((item) => item.id));
    setCorrectIds(ANSWERS.map((item) => item.id));
    setShowAns(true);
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAns(false);
    stopAudio();
  };

  const isWrong = (item) =>
    checkedIds.includes(item.id) && answers[`a-${item.id}`] !== item.correct;

  return (
    <div className="main-container-component">
      <div className="div-forall mb-5" style={{ gap: "25px" }}>
        <ExerciseHeader
          sectionLetter="E"
          title="Look and write sentences. Use the words from the box."
          subTitle="Use the frequency adverb sentence from the picture to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        <div className="flex flex-col gap-10 items-center justify-center w-full">
          <div style={{ position: "relative", width: "auto", height: "90px" }}>
            <img
              src={img}
              alt="Frequency chart for always, usually, sometimes, rarely, and never"
              style={{ width: "auto", height: "90px" }}
            />
            {FREQUENCIES.map((frequency, index) => (
              <button
                key={frequency}
                type="button"
                aria-label={`Play ${frequency}`}
                className="wb-unit2-audio-control wb-unit2-interactive"
                onClick={() =>
                  playAudio(`legend-${frequency}`, FREQUENCY_AUDIO[frequency])
                }
                style={{
                  position: "absolute",
                  left: leftPositions[index],
                  bottom: 0,
                  width: "15%",
                  height: "45%",
                  border: 0,
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <WorkbookUnit2PlayingAudioIcon
                  active={activeAudioKey === `legend-${frequency}`}
                />
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              width: "100%",
              // justifyItems:"center",
              gap: "40px",
            }}
          >
            {ANSWERS.map((item) => (
              <div key={item.id}>
                <div className="flex gap-3">
                  <span className="text-lg font-bold">{item.id}</span>
                  <img
                    src={item.img}
                    alt={
                      item.id === 1
                        ? "A woman ironing clothes"
                        : item.id === 2
                          ? "A man reading a newspaper"
                          : item.id === 3
                            ? "Two children playing chess"
                            : "A girl sleeping in bed"
                    }
                    style={{ width: "auto", height: "90px" }}
                  />
                </div>
                <div style={{ position: "relative", marginTop: "10px" }}>
                  {/* ❌ WRONG ICON */}
                  {isWrong(item) && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "red",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        border: "2px solid white",
                      }}
                    >
                      ✕
                    </div>
                  )}

                  {/* ✅ Dropdown */}
                  <select
                    value={answers[`a-${item.id}`] || ""}
                    onChange={(e) =>
                      handleSelectChange(item.id, e.target.value)
                    }
                    disabled={showAns || correctIds.includes(item.id)}
                    style={{
                      width: "90%",
                      fontSize: "18px",
                      marginTop: "20px",
                      borderBottom: isWrong(item)
                        ? `2px solid red`
                        : "1px solid navy",
                      marginLeft: "25px",
                    }}
                  >
                    <option value="">Select answer</option>

                    {buildOptions(item.correct).map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}
