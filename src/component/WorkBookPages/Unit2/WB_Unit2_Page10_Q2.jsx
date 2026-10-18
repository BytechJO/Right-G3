import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit2PlayingAudioIcon from "./WorkbookUnit2PlayingAudioIcon";
import useWorkbookUnit2Audio from "./useWorkbookUnit2Audio";
import "./workbookUnit2Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 8.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 9.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 10.svg";
import img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/66.svg";
import schoolAudio from "../../../assets/audio/WorkBook/unit2/Page 10 - Exercise D/Item_001_go_to_school.mp3";
import libraryAudio from "../../../assets/audio/WorkBook/unit2/Page 10 - Exercise D/Item_002_go_to_the_library.mp3";
import gymAudio from "../../../assets/audio/WorkBook/unit2/Page 10 - Exercise D/Item_003_go_to_the_gym.mp3";
import campAudio from "../../../assets/audio/WorkBook/unit2/Page 10 - Exercise D/Item_004_go_to_summer_camp.mp3";
import sheAudio from "../../../assets/audio/WorkBook/unit2/Page 10 - Exercise D/Item_005_She.mp3";
import heAudio from "../../../assets/audio/WorkBook/unit2/Page 10 - Exercise D/Item_006_He.mp3";
import heAlwaysAudio from "../../../assets/audio/WorkBook/unit2/Page 10 - Exercise D/Item_007_He_always.mp3";

const WRONG_COLOR = "#ef4444";

const LEFT_ITEMS = [
  { id: 1, img: img1, label: "go to school", audio: schoolAudio },
  { id: 2, img: img2, label: "go to the library", audio: libraryAudio },
  { id: 3, img: img3, label: "go to the gym", audio: gymAudio },
  { id: 4, img: img4, label: "go to summer camp", audio: campAudio },
];

const RIGHT_ITEMS = [
  {
    id: 1,
    bars: 4,
    prefixTop: "She",
    prefixAudio: sheAudio,
    correctAnswer: "usually rides a bike to the gym.",
  },
  {
    id: 2,
    bars: 0,
    prefixTop: "He",
    prefixAudio: heAudio,
    correctAnswer: "never walks to summer camp.",
  },
  {
    id: 3,
    bars: 5,
    prefixTop: "He always",
    prefixAudio: heAlwaysAudio,
    correctAnswer: "takes a bus to school.",
  },
  {
    id: 4,
    bars: 2,
    prefixTop: "He",
    prefixAudio: heAudio,
    correctAnswer: "sometimes takes the train to the library.",
  },
];

const FREQUENCIES = ["always", "usually", "sometimes", "never"];

const buildOptions = (item) => {
  if (item.id === 3) {
    return [
      "takes a bus to school.",
      "rides a bike to school.",
      "walks to school.",
      "takes the train to school.",
    ];
  }

  const rest = item.correctAnswer.split(" ").slice(1).join(" ");

  return FREQUENCIES.map((freq) => `${freq} ${rest}`);
};
export default function WB_Unit2_Page10_QB() {
  const [answers, setAnswers] = useState({});
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit2Audio();

  const handleSelectChange = (id, value) => {
    if (showAns || correctIds.includes(id)) return;
    setAnswers((prev) => ({
      ...prev,
      [`r-${id}`]: value,
    }));
    setCheckedIds((previous) => previous.filter((itemId) => itemId !== id));
  };

  const handleCheck = () => {
    // ✅ تحقق إنو كلهم معبّيين
    if (showAns || correctIds.length === RIGHT_ITEMS.length) return;
    const allFilled = RIGHT_ITEMS.every((i) => answers[`r-${i.id}`]);

    if (!allFilled) {
      ValidationAlert.info("Please fill all answers first.");
      return;
    }

    let score = 0;

    RIGHT_ITEMS.forEach((i) => {
      if (answers[`r-${i.id}`] === i.correctAnswer) score++;
    });

    setCheckedIds(RIGHT_ITEMS.map((item) => item.id));
    setCorrectIds(
      RIGHT_ITEMS.filter(
        (item) => answers[`r-${item.id}`] === item.correctAnswer,
      ).map((item) => item.id),
    );

    if (score === RIGHT_ITEMS.length)
      ValidationAlert.success(`Score: ${score} / ${RIGHT_ITEMS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${RIGHT_ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${RIGHT_ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    RIGHT_ITEMS.forEach((i) => {
      filled[`r-${i.id}`] = i.correctAnswer;
    });

    setAnswers(filled);
    setCheckedIds(RIGHT_ITEMS.map((item) => item.id));
    setCorrectIds(RIGHT_ITEMS.map((item) => item.id));
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
    checkedIds.includes(item.id) &&
    answers[`r-${item.id}`] !== item.correctAnswer;

  const renderBars = (count) => (
    <span style={{ display: "inline-flex", marginRight: "6px" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            width: "20px",
            height: "14px",
            border: "1.5px solid #9e9e9e",
            background: n <= count ? WRONG_COLOR : "#fff",
          }}
        />
      ))}
    </span>
  );

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "12px" }}>
        <ExerciseHeader
          sectionLetter="D"
          title="Connect and write."
          subTitle="Complete the travel picture to the correct frequency sentence first, then make the matching connection and reread the full result."
        />

        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img
              src={img}
              alt="Four travel pictures connected to their matching frequency sentence rows"
              style={{ width: "100%", height: "100%" }}
            />
            {LEFT_ITEMS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Play ${item.label}`}
                className="wb-unit2-audio-control wb-unit2-interactive"
                onClick={() => playAudio(`left-${item.id}`, item.audio)}
                style={{
                  position: "absolute",
                  left: 0,
                  top: `${index * 25}%`,
                  width: "72%",
                  height: "25%",
                  border: 0,
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <WorkbookUnit2PlayingAudioIcon
                  active={activeAudioKey === `left-${item.id}`}
                />
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            {RIGHT_ITEMS.map((item) => (
              <div key={item.id} style={{ position: "relative" }}>
                {/* ❌ ICON */}
                {isWrong(item) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "27px",
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
                      border: "2px solid white",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </div>
                )}

                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Play ${item.prefixTop}`}
                  className="wb-unit2-audio-control wb-unit2-interactive"
                  onClick={() =>
                    playAudio(`prefix-${item.id}`, item.prefixAudio)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`prefix-${item.id}`, item.prefixAudio);
                    }
                  }}
                  style={{
                    marginTop: "6px",
                    width: "100%",
                    fontSize: "18px",
                    borderBottom: "1px solid navy",
                  }}
                >
                  {renderBars(item.bars)}
                  {item.prefixTop}
                  <WorkbookUnit2PlayingAudioIcon
                    active={activeAudioKey === `prefix-${item.id}`}
                  />
                </div>

                <select
                  value={answers[`r-${item.id}`] || ""}
                  disabled={showAns || correctIds.includes(item.id)}
                  onChange={(e) => handleSelectChange(item.id, e.target.value)}
                  style={{
                    marginTop: "25px",
                    width: "100%",
                    fontSize: "18px",

                    borderBottom: isWrong(item)
                      ? `2px solid red`
                      : "1px solid navy",
                  }}
                >
                  <option value="">Select answer</option>
                  {buildOptions(item).map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
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
