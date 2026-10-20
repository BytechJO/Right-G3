import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

// صور الأنشطة
import actImg1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.1.svg";
import actImg2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.2.svg";
import actImg3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.3.svg";
import actImg4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.4.svg";
import actImg5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.5.svg";

import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
import swimsuitAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise J/Item_001_swimsuit.mp3";
import glassesAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise J/Item_002_glasses.mp3";
import socksAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise J/Item_003_socks.mp3";
import necklaceAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise J/Item_004_necklace.mp3";
import apronAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise J/Item_005_apron.mp3";
import bootsAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise J/Item_006_boots.mp3";
import mustWearAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise J/Item_007_You_must_wear_a.mp3";
import forAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise J/Item_008_for.mp3";
import swimmingPhraseAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise J/Item_009_for_swimming,_but_you_mustn't_wear_a.mp3";
import tennisPhraseAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise J/Item_010_for_tennis,_but_you_mustn't_wear_a.mp3";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const OPTION_AUDIO = {
  swimsuit: swimsuitAudio,
  glasses: glassesAudio,
  socks: socksAudio,
  necklace: necklaceAudio,
  apron: apronAudio,
  boots: bootsAudio,
};
const MIDDLE_AUDIO = { 1: swimmingPhraseAudio, 2: tennisPhraseAudio };
const IMAGE_ALT = {
  1: "Swimming clothes with swimsuit and glasses choices",
  2: "Tennis clothes with socks and necklace choices",
  3: "Cooking clothes with apron and boots choices",
  4: "Biking clothes with helmet and scarf choices",
  5: "Running clothes with coat and shoes choices",
};

const ITEMS = [
  {
    id: 1,
    actImg: actImg1,
    activity: "swimming",
    options: ["swimsuit", "glasses"],
    correct1: "swimsuit",
    correct2: "glasses",

    boxPositions: [
      { top: "58%", left: "41%" },
      { top: "81%", left: "41%" },
      { top: "58%", left: "70%" },
      { top: "81%", left: "70%" },
    ],
    // boxCorrect: ["true", "false", "true", "false"],
  },
  {
    id: 2,
    actImg: actImg2,
    activity: "tennis",
    options: ["socks", "necklace"],
    correct1: "socks",
    correct2: "necklace",

    boxPositions: [
      { top: "48%", left: "37%" },
      { top: "72%", left: "37%" },
      { top: "48%", left: "68%" },
      { top: "72%", left: "68%" },
    ],
    // boxCorrect: ["true", "false", "true", "false"],
  },
  {
    id: 3,
    actImg: actImg3,
    activity: "cooking",
    options: ["apron", "boots"],
    correct1: "apron",
    correct2: "boots",

    boxPositions: [
      { top: "54%", left: "35%" },
      { top: "76%", left: "35%" },
      { top: "54%", left: "66%" },
      { top: "76%", left: "66%" },
    ],
    // boxCorrect: ["true", "false", "true", "false"],
  },
  {
    id: 4,
    actImg: actImg4,
    activity: "biking",
    options: ["helmet", "scarf"],
    correct1: "helmet",
    correct2: "scarf",

    boxPositions: [
      { top: "60%", left: "37%" },
      { top: "82%", left: "37%" },
      { top: "60%", left: "67%" },
      { top: "82%", left: "67%" },
    ],
    // boxCorrect: ["true", "false", "true", "false"],
  },
  {
    id: 5,
    actImg: actImg5,
    activity: "running",
    options: ["coat", "shoes"],
    correct1: "shoes",
    correct2: "coat",

    boxPositions: [
      { top: "68%", left: "38%" },
      { top: "90%", left: "38%" },
      { top: "68%", left: "68%" },
      { top: "90%", left: "68%" },
    ],
    // boxCorrect: ["false", "true", "false", "true"],
  },
];

export default function WB_LookAndWrite_PageJ() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedKeys, setLockedKeys] = useState([]);
  const [wrongKeys, setWrongKeys] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleBoxClick = (id, index) => {
    const columnKey = `box-${id}-${index < 2 ? "left" : "right"}`;
    if (showAns || lockedKeys.includes(columnKey)) return;
    const isTop = index === 0 || index === 2;
    const value = isTop ? "true" : "false";

    // تحديد العمود (يسار أو يمين)
    const pairIndex = index % 2 === 0 ? index + 1 : index - 1;

    setAnswers((prev) => ({
      ...prev,
      [`box-${id}-${index + 1}`]: value,
      [`box-${id}-${pairIndex + 1}`]: undefined, // 🔥 يمسح الخيار الثاني
    }));
    setWrongKeys((previous) => previous.filter((key) => key !== columnKey));
  };

  const handleChange = (id, field, value) => {
    const key = `select-${id}-${field}`;
    if (showAns || lockedKeys.includes(key)) return;
    setAnswers((prev) => ({ ...prev, [`${id}-${field}`]: value }));
    setWrongKeys((previous) => previous.filter((entry) => entry !== key));
    playAudio(`option-${id}-${field}`, OPTION_AUDIO[value]);
  };

  const getValue = (id, field) => answers[`${id}-${field}`] || "";
  const getCorrectValue = (item, word) => {
    if (word === item.correct1) return "true"; // ✓
    if (word === item.correct2) return "false"; // ✕
    return null;
  };
  const handleCheck = () => {
    if (showAns || lockedKeys.length === ITEMS.length * 4) return;

    const allAnswered = ITEMS.every((i) => {
      const leftChosen = answers[`box-${i.id}-1`] || answers[`box-${i.id}-2`];

      const rightChosen = answers[`box-${i.id}-3`] || answers[`box-${i.id}-4`];

      return (
        getValue(i.id, "1") && getValue(i.id, "2") && leftChosen && rightChosen
      );
    });
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    let total = 0;
    ITEMS.forEach((i) => {
      total++;

      if (
        getValue(i.id, "1") === i.correct1 &&
        getValue(i.id, "2") === i.correct2
      ) {
        score++;
      }

      // العمود الأول (الكلمة الأولى)
      total++;
      const leftWord = i.options[0];
      const leftCorrect = getCorrectValue(i, leftWord);
      const leftAnswer = answers[`box-${i.id}-1`] || answers[`box-${i.id}-2`];

      if (leftAnswer === leftCorrect) score++;

      // العمود الثاني (الكلمة الثانية)
      total++;
      const rightWord = i.options[1];
      const rightCorrect = getCorrectValue(i, rightWord);
      const rightAnswer = answers[`box-${i.id}-3`] || answers[`box-${i.id}-4`];

      if (rightAnswer === rightCorrect) score++;
    });
    setShowResults(true);
    const nextLocked = [];
    const nextWrong = [];
    ITEMS.forEach((item) => {
      ["1", "2"].forEach((field) => {
        const key = `select-${item.id}-${field}`;
        const correct = field === "1" ? item.correct1 : item.correct2;
        (getValue(item.id, field) === correct ? nextLocked : nextWrong).push(
          key,
        );
      });
      const leftKey = `box-${item.id}-left`;
      const rightKey = `box-${item.id}-right`;
      const leftAnswer =
        answers[`box-${item.id}-1`] || answers[`box-${item.id}-2`];
      const rightAnswer =
        answers[`box-${item.id}-3`] || answers[`box-${item.id}-4`];
      (leftAnswer === getCorrectValue(item, item.options[0])
        ? nextLocked
        : nextWrong
      ).push(leftKey);
      (rightAnswer === getCorrectValue(item, item.options[1])
        ? nextLocked
        : nextWrong
      ).push(rightKey);
    });
    setLockedKeys((previous) => [...new Set([...previous, ...nextLocked])]);
    setWrongKeys(nextWrong);

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};

    ITEMS.forEach((i) => {
      filled[`${i.id}-1`] = i.correct1;
      filled[`${i.id}-2`] = i.correct2;

      // LEFT
      const leftCorrect = getCorrectValue(i, i.options[0]);
      if (leftCorrect === "true") {
        filled[`box-${i.id}-1`] = "true";
      } else {
        filled[`box-${i.id}-2`] = "false";
      }

      // RIGHT
      const rightCorrect = getCorrectValue(i, i.options[1]);
      if (rightCorrect === "true") {
        filled[`box-${i.id}-3`] = "true";
      } else {
        filled[`box-${i.id}-4`] = "false";
      }
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
    setLockedKeys(
      ITEMS.flatMap((item) => [
        `select-${item.id}-1`,
        `select-${item.id}-2`,
        `box-${item.id}-left`,
        `box-${item.id}-right`,
      ]),
    );
    setWrongKeys([]);
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setLockedKeys([]);
    setWrongKeys([]);
    stopAudio();
  };

  const isWrong1 = (item) =>
    showResults && !showAns && wrongKeys.includes(`select-${item.id}-1`);

  const isWrong2 = (item) =>
    showResults && !showAns && wrongKeys.includes(`select-${item.id}-2`);

  const renderSelect = (item, field, isWrong) => {
    const value = getValue(item.id, field);
    const fieldKey = `select-${item.id}-${field}`;

    return (
      <div style={{ position: "relative", display: "inline-flex" }}>
        <select
          disabled={showAns || lockedKeys.includes(fieldKey)}
          value={value}
          onChange={(e) => handleChange(item.id, field, e.target.value)}
          style={{
            borderBottom: isWrong
              ? `2px solid ${WRONG_COLOR}`
              : "1px solid #2f2f2f",
            background: "transparent",
          }}
        >
          <option value="" disabled hidden />
          {item.options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <Unit4PlayingAudioIcon
          active={activeAudioKey === `option-${item.id}-${field}`}
        />

        {isWrong && (
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
              border: "2px solid white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component mb-15">
      <div className="div-forall" style={{ gap: "30px" }}>
        <ExerciseHeader
          sectionLetter="J"
          title={
            <>
              Look and write <span style={{ color: "#D1232A" }}>✓</span> and{" "}
              <span style={{ color: "#D1232A" }}>✗</span>. Write sentences.
            </>
          }
          subTitle="Use the correct clothing item for each activity and sentence to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />
        <div className="w-full flex flex-col gap-10">
          {ITEMS.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: "20px" }}>
              <div style={{ position: "relative" }}>
                <img
                  src={item.actImg}
                  alt={IMAGE_ALT[item.id]}
                  style={{ width: "450px", height: "auto" }}
                />

                {item.boxPositions.map((pos, index) => {
                  const value = answers[`box-${item.id}-${index + 1}`];
                  const isWrongBox =
                    showResults &&
                    !showAns &&
                    wrongKeys.includes(
                      `box-${item.id}-${index < 2 ? "left" : "right"}`,
                    ) &&
                    Boolean(value);
                  const boxKey = `box-${item.id}-${
                    index < 2 ? "left" : "right"
                  }`;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (showAns || lockedKeys.includes(boxKey)) return;
                        handleBoxClick(item.id, index);
                      }}
                      onKeyDown={(event) => {
                        if (
                          (event.key === "Enter" || event.key === " ") &&
                          !showAns &&
                          !lockedKeys.includes(boxKey)
                        ) {
                          event.preventDefault();
                          handleBoxClick(item.id, index);
                        }
                      }}
                      role="button"
                      tabIndex={lockedKeys.includes(boxKey) ? -1 : 0}
                      aria-label={`${index % 2 === 0 ? "Check" : "Cross"} ${item.options[index < 2 ? 0 : 1]}`}
                      style={{
                        position: "absolute",
                        top: pos.top,
                        left: pos.left,
                        transform: "translate(-50%, -50%)",
                        width: "30px",
                        height: "30px",
                        // border: "1px solid #333",
                        // background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor:
                          showAns || lockedKeys.includes(boxKey)
                            ? "default"
                            : "pointer",
                      }}
                    >
                      {value === "true" && (
                        <img src={trueIcon} alt="" style={{ height: "25px" }} />
                      )}
                      {value === "false" && (
                        <img
                          src={falseIcon}
                          alt=""
                          style={{ height: "25px" }}
                        />
                      )}

                      {isWrongBox && (
                        <span
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-18px",
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
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  border: `1px solid ${BORDER_COLOR}`,
                  borderRadius: "clamp(10px,1.2vw,16px)",
                  padding: "clamp(8px,1vw,14px) clamp(10px,1.2vw,16px)",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "5px",
                  fontSize: "clamp(13px,1.4vw,17px)",
                  // fontWeight: 500,
                  color: "#111",
                  // lineHeight: 1.5,
                  width: "60%",
                }}
              >
                <span
                  className="unit4-audio-control unit4-interactive"
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    playAudio(`must-wear-${item.id}`, mustWearAudio)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`must-wear-${item.id}`, mustWearAudio);
                    }
                  }}
                  style={{ position: "relative", cursor: "pointer" }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `must-wear-${item.id}`}
                  />
                  You must wear a
                </span>
                {renderSelect(item, "1", isWrong1(item))} for{" "}
                <span
                  className="unit4-audio-control unit4-interactive"
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    playAudio(
                      `middle-${item.id}`,
                      MIDDLE_AUDIO[item.id] || forAudio,
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(
                        `middle-${item.id}`,
                        MIDDLE_AUDIO[item.id] || forAudio,
                      );
                    }
                  }}
                  style={{ position: "relative", cursor: "pointer" }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `middle-${item.id}`}
                  />
                  for {item.activity}, but you mustn't wear a
                </span>
                {renderSelect(item, "2", isWrong2(item))}
                <span>.</span>
              </div>
            </div>
          ))}
        </div>
        <Button
          checkAnswers={handleCheck}
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleStartAgain}
        />
      </div>
    </div>
  );
}
