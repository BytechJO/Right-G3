import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import bowlAudio from "../../../assets/audio/WorkBook/unit5/Page 31 - Exercise J/Item_001_The_bowl_of_fruit_is.mp3";
import roomAudio from "../../../assets/audio/WorkBook/unit5/Page 31 - Exercise J/Item_002_room.mp3";
import catAudio from "../../../assets/audio/WorkBook/unit5/Page 31 - Exercise J/Item_003_The_cat_is.mp3";
import fridgeAudio from "../../../assets/audio/WorkBook/unit5/Page 31 - Exercise J/Item_004_The_fridge_is.mp3";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/J1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/J2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/J3.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "red";
const ANSWER_COLOR = "#000";
const LINE_COLOR = "#333";

const ITEMS = [
  {
    id: 1,
    img: img1,
    correct1: "on the table",
    correct2: "in the living",
    options1: ["on the table", "in the table", "next to the table"],
    options2: ["in the living", "on the living", "next to the living"],
    before: "The bowl of fruit is",
    middle: ",",
    after: "room.",
  },
  {
    id: 2,
    img: img2,
    correct1: "in the basket",
    correct2: "in the living",
    options1: ["on the basket", "in the basket", "next to the basket"],
    options2: ["in the living", "on the living", "next to the living"],
    before: "The cat is",
    middle: ",",
    after: "room.",
  },
  {
    id: 3,
    img: img3,
    correct1: "in the",
    correct2: "kitchen",
    options1: ["on the", "in the", "next to the"],
    options2: ["kitchen", "living", "bedroom"],
    before: "The fridge is",
    middle: "",
    after: ".",
  },
];
const BEFORE_AUDIO = { 1: bowlAudio, 2: catAudio, 3: fridgeAudio };
const fieldKey = (id, key) => `${id}-${key}`;

export default function SB_LookAndWrite_PageJ() {
  const [answers, setAnswers] = useState({});
  const [showAns, setShowAns] = useState(false);
  const [lockedKeys, setLockedKeys] = useState([]);
  const [wrongKeys, setWrongKeys] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleChange = (id, key, value) => {
    const currentKey = fieldKey(id, key);
    if (showAns || lockedKeys.includes(currentKey)) return;
    setAnswers((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));
    setWrongKeys((prev) => prev.filter((entry) => entry !== currentKey));
  };

  const handleCheck = () => {
    if (showAns || lockedKeys.length === ITEMS.length * 2) return;

    const allAnswered = ITEMS.every(
      (i) => answers[i.id]?.a1 && answers[i.id]?.a2,
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((i) => {
      if (
        answers[i.id]?.a1 === i.correct1 &&
        answers[i.id]?.a2 === i.correct2
      ) {
        score++;
      }
    });

    const correctKeys = [];
    const incorrectKeys = [];
    ITEMS.forEach((item) => {
      ["a1", "a2"].forEach((key) => {
        const expected = key === "a1" ? item.correct1 : item.correct2;
        const currentKey = fieldKey(item.id, key);
        if (answers[item.id]?.[key] === expected) correctKeys.push(currentKey);
        else incorrectKeys.push(currentKey);
      });
    });
    setLockedKeys((prev) => [...new Set([...prev, ...correctKeys])]);
    setWrongKeys(incorrectKeys);

    if (score === ITEMS.length)
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => {
      filled[i.id] = { a1: i.correct1, a2: i.correct2 };
    });
    setAnswers(filled);
    setShowAns(true);
    setLockedKeys(
      ITEMS.flatMap((item) => [
        fieldKey(item.id, "a1"),
        fieldKey(item.id, "a2"),
      ]),
    );
    setWrongKeys([]);
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowAns(false);
    setLockedKeys([]);
    setWrongKeys([]);
    stopAudio();
  };

  const isWrongA1 = (item) => {
    return wrongKeys.includes(fieldKey(item.id, "a1"));
  };

  const isWrongA2 = (item) => {
    return wrongKeys.includes(fieldKey(item.id, "a2"));
  };
  return (
    <div className="main-container-component mb-10">
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        <ExerciseHeader
          sectionLetter="J"
          title="Look and write."
          subTitle="Use the object, preposition, and room in each sentence to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />
        <div className="flex flex-col gap-10 px-10 w-full">
          {ITEMS.map((item) => {
            const val1 = answers[item.id]?.a1 || "";
            const val2 = answers[item.id]?.a2 || "";
            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  <span className="text-[22px] font-bold">{item.id}</span>

                  <img
                    src={item.img}
                    alt={
                      [
                        "A bowl of fruit on a table in the living room",
                        "A cat in a basket in the living room",
                        "A fridge in the kitchen",
                      ][item.id - 1]
                    }
                    style={{ width: "auto", height: "120px" }}
                  />
                </div>

                <div
                  style={{
                    borderBottom: `1px solid ${LINE_COLOR}`,
                    paddingBottom: "10px",
                  }}
                >
                  <span
                    className="text-[20px] m-2 unit4-audio-control unit4-interactive"
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      playAudio(`before-${item.id}`, BEFORE_AUDIO[item.id])
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        playAudio(`before-${item.id}`, BEFORE_AUDIO[item.id]);
                      }
                    }}
                    style={{ position: "relative", cursor: "pointer" }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `before-${item.id}`}
                    />
                    {item.before}{" "}
                  </span>

                  {!showAns ? (
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <select
                        value={val1}
                        disabled={
                          showAns ||
                          lockedKeys.includes(fieldKey(item.id, "a1"))
                        }
                        onChange={(e) =>
                          handleChange(item.id, "a1", e.target.value)
                        }
                        style={{
                          borderBottom: `${
                            isWrongA1(item)
                              ? `2px solid ${WRONG_COLOR} `
                              : `1px solid ${LINE_COLOR} `
                          }`,
                          fontSize: "20px",
                        }}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {item.options1.map((op) => (
                          <option key={op} value={op}>
                            {op}
                          </option>
                        ))}
                      </select>

                      {isWrongA1(item) && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            background: "red",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "11px",
                            fontWeight: "bold",
                          }}
                        >
                          ✕
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-[20px] m-2">{item.correct1}</span>
                  )}

                  <span className="text-[20px] m-2"> {item.middle} </span>

                  {!showAns ? (
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <select
                        value={val2}
                        disabled={
                          showAns ||
                          lockedKeys.includes(fieldKey(item.id, "a2"))
                        }
                        onChange={(e) =>
                          handleChange(item.id, "a2", e.target.value)
                        }
                        style={{
                          borderBottom: `${
                            isWrongA2(item)
                              ? `2px solid ${WRONG_COLOR} `
                              : `1px solid ${LINE_COLOR} `
                          }`,
                          fontSize: "20px",
                        }}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {item.options2.map((op) => (
                          <option key={op} value={op}>
                            {op}
                          </option>
                        ))}
                      </select>

                      {isWrongA2(item) && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            width: "22px",
                            height: "22px",
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
                          }}
                        >
                          ✕
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-[20px] m-2">{item.correct2}</span>
                  )}

                  <span
                    className="text-[20px] m-2 unit4-audio-control unit4-interactive"
                    role={item.after === "room." ? "button" : undefined}
                    tabIndex={item.after === "room." ? 0 : undefined}
                    onClick={() =>
                      item.after === "room." &&
                      playAudio(`room-${item.id}`, roomAudio)
                    }
                    onKeyDown={(event) => {
                      if (
                        item.after === "room." &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        playAudio(`room-${item.id}`, roomAudio);
                      }
                    }}
                    style={{
                      position: "relative",
                      cursor: item.after === "room." ? "pointer" : "default",
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `room-${item.id}`}
                    />{" "}
                    {item.after}
                  </span>
                </div>
              </div>
            );
          })}
        </div>{" "}
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
