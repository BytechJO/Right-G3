import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit2PlayingAudioIcon from "./WorkbookUnit2PlayingAudioIcon";
import useWorkbookUnit2Audio from "./useWorkbookUnit2Audio";
import "./workbookUnit2Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 2.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 5.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 4.svg";
import taxiAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise A/Item_001_take_a_taxi.mp3";
import subwayAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise A/Item_002_take_a_subway.mp3";
import busAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise A/Item_003_take_a_bus.mp3";
import bikeAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise A/Item_004_ride_a_bike.mp3";

const WRONG_COLOR = "#ef4444";
const BORDER_COLOR = "#f39b42";

const OPTIONS = ["take a taxi", "take a subway", "take a bus", "ride a bike"];
const OPTION_AUDIO = {
  "take a taxi": taxiAudio,
  "take a subway": subwayAudio,
  "take a bus": busAudio,
  "ride a bike": bikeAudio,
};

const ANSWERS = [
  { id: 1, correct: "take a subway", img: img1 },
  { id: 2, correct: "ride a bike", img: img2 },
  { id: 3, correct: "take a bus", img: img3 },
  { id: 4, correct: "take a taxi", img: img4 },
];

export default function WB_Transport_Dropdown() {
  const [selected, setSelected] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit2Audio();

  const handleChange = (id, value) => {
    if (showAns || correctIds.includes(id)) return;
    setSelected((prev) => ({ ...prev, [id]: value }));
    setCheckedIds((previous) => previous.filter((itemId) => itemId !== id));
    playAudio(`option-${id}-${value}`, OPTION_AUDIO[value]);
  };

  const handleCheck = () => {
    if (showAns || correctIds.length === ANSWERS.length) return;
    const allAnswered = ANSWERS.every((a) => selected[a.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    ANSWERS.forEach((a) => {
      if (selected[a.id] === a.correct) score++;
    });
    setCheckedIds(ANSWERS.map((answer) => answer.id));
    setCorrectIds(
      ANSWERS.filter((answer) => selected[answer.id] === answer.correct).map(
        (answer) => answer.id,
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
    ANSWERS.forEach((a) => {
      filled[a.id] = a.correct;
    });
    setSelected(filled);
    setCheckedIds(ANSWERS.map((answer) => answer.id));
    setCorrectIds(ANSWERS.map((answer) => answer.id));
    setShowAns(true);
    stopAudio();
  };

  const handleStartAgain = () => {
    setSelected({ 1: "", 2: "", 3: "", 4: "" });
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAns(false);
    stopAudio();
  };

  const isWrong = (item) =>
    checkedIds.includes(item.id) && selected[item.id] !== item.correct;

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "45px" }}>
        <ExerciseHeader
          sectionLetter="A"
          title="Look and write."
          subTitle="Use the transportation picture to the correct travel phrase to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        {/* ── Main layout: word bank LEFT  |  grid RIGHT ── */}
        <div
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Word Bank */}
          <div
            style={{ display: "flex", justifyContent: "center", width: "30%" }}
          >
            <div
              style={{
                width: "100%",
                // maxWidth: "clamp(160px, 20vw, 230px)",
                border: `2px solid ${BORDER_COLOR}`,
                borderRadius: "clamp(12px, 1.4vw, 18px)",
                padding: "clamp(12px, 1.8vw, 22px) clamp(10px, 1.4vw, 16px)",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(8px, 1vw, 12px)",
                background: "#fff",
              }}
            >
              {OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  className="wb-unit2-audio-control wb-unit2-interactive"
                  onClick={() => playAudio(`bank-${opt}`, OPTION_AUDIO[opt])}
                  style={{
                    textAlign: "center",
                    fontSize: "clamp(12px, 1.4vw, 18px)",
                    fontWeight: 500,
                    color: "#222",
                    lineHeight: 1.3,
                    background: "transparent",
                    border: 0,
                    cursor: "pointer",
                  }}
                >
                  {opt}
                  <WorkbookUnit2PlayingAudioIcon
                    active={activeAudioKey === `bank-${opt}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 2×2 Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "90px",
              width: "100%",
            }}
          >
            {ANSWERS.map((item) => {
              const wrong = isWrong(item);
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "clamp(8px, 1.2vw, 14px)",
                    minWidth: 0,
                  }}
                >
                  {/* Number + Image row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "clamp(6px, 0.8vw, 12px)",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(12px, 1.4vw, 18px)",
                        fontWeight: "700",
                        color: "#111",
                        lineHeight: 1,
                        paddingTop: "12px",
                        flexShrink: 0,
                      }}
                    >
                      {item.id}
                    </span>

                    <img
                      src={item.img}
                      alt={
                        item.id === 1
                          ? "A subway train at a station"
                          : item.id === 2
                            ? "A person riding a bicycle"
                            : item.id === 3
                              ? "Passengers riding a bus"
                              : "Passengers riding in a taxi"
                      }
                      style={{
                        width: "auto",
                        height: "100px",
                        // objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>

                  {/* Dropdown answer */}
                  <div style={{ width: "100%", position: "relative" }}>
                    <select
                      disabled={showAns || correctIds.includes(item.id)}
                      value={selected[item.id]}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{
                        width: "100%",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        borderBottom: `${wrong ? `2px solid  ${WRONG_COLOR}` : "1px solid #3f3f3f"}`,
                        borderRadius: 0,
                        fontSize: "clamp(12px, 1.7vw, 18px)",
                        // fontWeight: 500,
                        color: "#000",
                        padding: "4px clamp(4px, 0.8vw, 10px) 4px 2px",
                        background: "transparent",
                        cursor:
                          showAns || correctIds.includes(item.id)
                            ? "default"
                            : "pointer",
                        appearance: "auto",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="" disabled hidden></option>
                      {OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <WorkbookUnit2PlayingAudioIcon
                      active={
                        activeAudioKey ===
                        `option-${item.id}-${selected[item.id]}`
                      }
                    />

                    {/* Wrong badge */}
                    {wrong && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "clamp(18px, 2.2vw, 28px)",
                          transform: "translateY(-50%)",
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          backgroundColor: "red",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          boxShadow: "0 2px 2px rgba(0,0,0,0.2)",
                          border: "2px solid white",
                        }}
                      >
                        ✕
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(8px, 1.5vw, 14px)",
          }}
        >
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
