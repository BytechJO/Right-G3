import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import question1Audio from "../../../assets/audio/WorkBook/unit5/Page 30 - Exercise H/Item_001_Where's_the_telephone.mp3";
import answer1Audio from "../../../assets/audio/WorkBook/unit5/Page 30 - Exercise H/Item_002_It's_in_the_living_room.mp3";
import question2Audio from "../../../assets/audio/WorkBook/unit5/Page 30 - Exercise H/Item_003_Is_there_a_bathtub_in_the_kitchen.mp3";
import answer2Audio from "../../../assets/audio/WorkBook/unit5/Page 30 - Exercise H/Item_004_No,_there_isn't.mp3";

// ── House image (one full image)
import houseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H1.svg";

// ── Character images
import girlImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H2.svg";
import boyImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H3.svg";

// ── Bottom item images
import armchairImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H4.svg";
import chairImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H5.svg";
import bathtubImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H6.svg";
import fridgeImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H7.svg";
import telephoneImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H8.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const RED_COLOR = "#000000ff";

const LABELS = [
  { id: 1, correct: "bedroom", style: { top: "12%", left: "30%" } },
  { id: 2, correct: "living room", style: { top: "12%", left: "72%" } },
  { id: 3, correct: "bathroom", style: { top: "58%", left: "30%" } },
  { id: 4, correct: "kitchen", style: { top: "58%", left: "72%" } },
];

const OPTIONS = ["bedroom", "living room", "bathroom", "kitchen"];
const DIALOGUE_AUDIO = {
  "Where's the telephone?": question1Audio,
  "It's in the living room.": answer1Audio,
  "Is there a bathtub in the kitchen?": question2Audio,
  "No, there isn't.": answer2Audio,
};

const BOTTOM_ITEMS = [
  { id: 1, img: armchairImg, alt: "armchair" },
  { id: 2, img: chairImg, alt: "chair" },
  { id: 3, img: bathtubImg, alt: "bathtub" },
  { id: 4, img: fridgeImg, alt: "fridge" },
  { id: 5, img: telephoneImg, alt: "telephone" },
];

export default function WB_Unit5_Page30_Q2() {
  const [selected, setSelected] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleChange = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setSelected((prev) => ({ ...prev, [id]: value }));
    setWrongIds((prev) => prev.filter((entry) => entry !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === LABELS.length) return;
    const allAnswered = LABELS.every((l) => selected[l.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    LABELS.forEach((l) => {
      if (selected[l.id] === l.correct) score++;
    });
    setLockedIds((prev) => [
      ...new Set([
        ...prev,
        ...LABELS.filter((label) => selected[label.id] === label.correct).map(
          (label) => label.id,
        ),
      ]),
    ]);
    setWrongIds(
      LABELS.filter((label) => selected[label.id] !== label.correct).map(
        (label) => label.id,
      ),
    );
    if (score === LABELS.length)
      ValidationAlert.success(`Score: ${score} / ${LABELS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${LABELS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${LABELS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    LABELS.forEach((l) => {
      filled[l.id] = l.correct;
    });
    setSelected(filled);
    setShowAns(true);
    setLockedIds(LABELS.map((label) => label.id));
    setWrongIds([]);
    stopAudio();
  };

  const handleStartAgain = () => {
    setSelected({ 1: "", 2: "", 3: "", 4: "" });
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    stopAudio();
  };

  const isWrong = (label) => wrongIds.includes(label.id);

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "28px",
        }}
      >
        {/* ── Title ── */}
        <ExerciseHeader
          sectionLetter="H"
          title="Label the rooms and ask a friend."
          subTitle="Choose the correct room labels and location questions with a partner from the picture first, then say the full sentence aloud using the model pattern."
        />

        {/* ── House image + overlaid dropdowns ── */}
        <div className="flex justify-center w-full">
          <div
            style={{
              position: "relative",
              width: "75%",
              // border: `2px solid ${BORDER_COLOR}`,
              borderRadius: "clamp(12px, 1.4vw, 18px)",
              overflow: "hidden",
              background: "#f7f7f7",
            }}
          >
            <img
              src={houseImg}
              alt="A two-story house showing a bedroom, living room, bathroom, and kitchen"
              style={{ width: "100%", height: "auto", display: "block" }}
            />

            {LABELS.map((label) => {
              const wrong = isWrong(label);
              return (
                <div
                  key={label.id}
                  style={{
                    position: "absolute",
                    ...label.style,
                    transform: "translateX(-50%)",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <select
                      disabled={showAns || lockedIds.includes(label.id)}
                      value={selected[label.id]}
                      onChange={(e) => handleChange(label.id, e.target.value)}
                      style={{
                        background: "#fff",
                        border: `${wrong ? "2px solid red" : `1px solid  ${BORDER_COLOR}`}`,
                        borderRadius: "999px",
                        padding: "5px 22px",
                        fontSize: "clamp(12px,1.4vw,16px)",
                        // fontWeight: 700,
                        color: RED_COLOR,
                        cursor: showAns ? "default" : "pointer",
                        appearance: "auto",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                        width: "150px",
                      }}
                    >
                      <option value="" disabled hidden></option>
                      {OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    {wrong && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-6px",
                          right: "-6px",
                          width: "clamp(16px,1.8vw,22px)",
                          height: "clamp(16px,1.8vw,22px)",
                          borderRadius: "50%",
                          backgroundColor: "red",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "clamp(9px,0.9vw,12px)",
                          fontWeight: 700,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          border: "2px solid white",
                          zIndex: 3,
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
        {/* ── Dialogue section: girl LEFT | boy RIGHT ── */}
        <div
          className="w-full"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(10px,2vw,24px)",
            flexWrap: "wrap",
          }}
        >
          {/* ── Girl + her bubbles ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px,1vw,14px)",
              flex: 1,
              minWidth: 0,
            }}
          >
            {/* Bubbles LEFT of girl */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(6px,0.8vw,10px)",
                alignItems: "flex-end",
              }}
            >
              {[
                "Where's the telephone?",
                "Is there a bathtub in the kitchen?",
              ].map((text, i) => (
                <div
                  key={i}
                  className="unit4-audio-control unit4-interactive"
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    playAudio(`dialogue-${text}`, DIALOGUE_AUDIO[text])
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`dialogue-${text}`, DIALOGUE_AUDIO[text]);
                    }
                  }}
                  style={{
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "clamp(10px,1.2vw,16px)",
                    padding: "clamp(5px,0.7vw,9px) clamp(10px,1.3vw,16px)",
                    fontSize: "clamp(12px,1.4vw,16px)",
                    // fontWeight: 500,
                    color: "#222",
                    maxWidth: "clamp(160px,24vw,280px)",
                    lineHeight: 1.3,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `dialogue-${text}`}
                  />
                  {text}
                </div>
              ))}
            </div>

            {/* Girl image */}
            <img
              src={girlImg}
              alt="A girl asking location questions"
              style={{
                height: "clamp(70px,11vw,130px)",
                width: "auto",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          </div>

          {/* ── Boy + his bubbles ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px,1vw,14px)",
              flex: 1,
              minWidth: 0,
              justifyContent: "flex-end",
            }}
          >
            {/* Boy image */}
            <img
              src={boyImg}
              alt="A boy answering location questions"
              style={{
                height: "clamp(70px,11vw,130px)",
                width: "auto",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />

            {/* Bubbles RIGHT of boy */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(6px,0.8vw,10px)",
                alignItems: "flex-start",
              }}
            >
              {["It's in the living room.", "No, there isn't."].map(
                (text, i) => (
                  <div
                    key={i}
                    className="unit4-audio-control unit4-interactive"
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      playAudio(`dialogue-${text}`, DIALOGUE_AUDIO[text])
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        playAudio(`dialogue-${text}`, DIALOGUE_AUDIO[text]);
                      }
                    }}
                    style={{
                      background: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "clamp(10px,1.2vw,16px)",
                      padding: "clamp(5px,0.7vw,9px) clamp(10px,1.3vw,16px)",
                      fontSize: "clamp(12px,1.4vw,16px)",
                      // fontWeight: 500,
                      color: "#222",
                      maxWidth: "clamp(160px,24vw,280px)",
                      lineHeight: 1.3,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `dialogue-${text}`}
                    />
                    {text}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom item images ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "clamp(14px,2.5vw,36px)",
            flexWrap: "wrap",
            padding: "clamp(6px,1vw,12px) 0",
          }}
        >
          {BOTTOM_ITEMS.map((item) => (
            <img
              key={item.id}
              src={item.img}
              alt={item.alt}
              style={{
                height: "90px",
                width: "auto",
                objectFit: "contain",
                display: "block",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          ))}
        </div>

        {/* ── Buttons ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(6px,1vw,12px)",
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
