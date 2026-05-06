import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// صور الأنشطة (اليسار)
import actImg1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.1.svg"; // swimming
import actImg2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.2.svg"; // tennis
import actImg3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.3.svg"; // cooking
import actImg4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.4.svg"; // biking
import actImg5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.5.svg"; // running

import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const CHECK_COLOR = "#16a34a";

const ITEMS = [
  {
    id: 1,
    actImg: actImg1,
    activity: "swimming",
    must: { word: "swimsuit", icon: "✓" },
    mustnt: { word: "glasses", icon: "✕" },
    options: ["swimsuit", "glasses"],
    correct1: "swimsuit",
    correct2: "glasses",

    boxPositions: [
      { top: "58%", left: "41%" }, // مربع 1
      { top: "58%", left: "70%" }, // مربع 2
    ],
    boxCorrect: ["true", "false"], // ✅ الأول صح، الثاني خطأ
  },

  {
    id: 2,
    actImg: actImg2,
    activity: "tennis",
    must: { word: "socks", icon: "✓" },
    mustnt: { word: "necklace", icon: "✕" },
    options: ["socks", "necklace"],
    correct1: "socks",
    correct2: "necklace",

    boxPositions: [
      { top: "47%", left: "37%" },
      { top: "47%", left: "68%" },
    ],
    boxCorrect: ["true", "false"], // ✅ الأول صح، الثاني خطأ
  },

  {
    id: 3,
    actImg: actImg3,
    activity: "cooking",
    must: { word: "apron", icon: "✓" },
    mustnt: { word: "boots", icon: "✕" },
    options: ["apron", "boots"],
    correct1: "apron",
    correct2: "boots",

    boxPositions: [
      { top: "54%", left: "35%" },
      { top: "54%", left: "66%" },
    ],
    boxCorrect: ["true", "false"], // ✅ الأول صح، الثاني خطأ
  },

  {
    id: 4,
    actImg: actImg4,
    activity: "biking",
    must: { word: "helmet", icon: "✓" },
    mustnt: { word: "scarf", icon: "✕" },
    options: ["helmet", "scarf"],
    correct1: "helmet",
    correct2: "scarf",

    boxPositions: [
      { top: "60%", left: "37%" },
      { top: "60%", left: "67%" },
    ],
    boxCorrect: ["true", "false"], // ✅ الأول صح، الثاني خطأ
  },

  {
    id: 5,
    actImg: actImg5,
    activity: "running",
    must: { word: "shoes", icon: "✕" },
    mustnt: { word: "coat", icon: "✓" },
    options: ["shoes", "coat"],
    correct1: "shoes",
    correct2: "coat",

    boxPositions: [
      { top: "72%", left: "38%" },
      { top: "72%", left: "68%" },
    ],
    boxCorrect: ["false", "true"], // ✅ الأول صح، الثاني خطأ
  },
];

export default function WB_LookAndWrite_PageJ() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [selected, setSelected] = useState({});
  const handleBoxClick = (id, box) => {
    const currentSelected = selected[id];
    // if (!currentSelected) return;

    setAnswers((prev) => ({
      ...prev,
      [`box-${id}-${box}`]: currentSelected,
    }));

    // 🔥 نخلي بس هاي الصورة active
    setSelected((prev) => ({
      [id]: prev[id],
    }));
  };
  const handleChange = (id, field, value) => {
    if (showAns) return;
    setAnswers((prev) => ({ ...prev, [`${id}-${field}`]: value }));
    setShowResults(false);
  };

  const getValue = (id, field) => answers[`${id}-${field}`] || "";

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every(
      (i) => getValue(i.id, "1") && getValue(i.id, "2"),
    );
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    let total2 = 0;

    ITEMS.forEach((i) => {
      // الجمل
      if (
        getValue(i.id, "1") === i.correct1 &&
        getValue(i.id, "2") === i.correct2
      ) {
        score++;
      }
      total2++;

      // المربعات
      i.boxPositions.forEach((_, idx) => {
        total2++;

        if (answers[`box-${i.id}-${idx + 1}`] === i.boxCorrect[idx]) {
          score++;
        }
      });
    });
    setShowResults(true);
    const total = ITEMS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};

    ITEMS.forEach((i) => {
      filled[`${i.id}-1`] = i.correct1;
      filled[`${i.id}-2`] = i.correct2;

      // 🔥 المربعات
      i.boxCorrect.forEach((val, idx) => {
        filled[`box-${i.id}-${idx + 1}`] = val;
      });
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };
  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setSelected({}); // 🔥 مهم تضيفيها
  };

  const isWrong1 = (item) =>
    showResults && !showAns && getValue(item.id, "1") !== item.correct1;
  const isWrong2 = (item) =>
    showResults && !showAns && getValue(item.id, "2") !== item.correct2;

  const renderSelect = (item, field, isWrong) => {
    const value = getValue(item.id, field);
    return (
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <select
          disabled={showAns}
          value={value}
          onChange={(e) => handleChange(item.id, field, e.target.value)}
          style={{
            height: "clamp(28px,3vw,38px)",
            border: "none",
            borderBottom: `1px solid ${isWrong ? WRONG_COLOR : "#2f2f2f"}`,
            background: "transparent",
            padding: "0 22px 0 4px",
            fontSize: "clamp(13px,1.4vw,18px)",
            // fontWeight:      700,
            color: isWrong ? "#2f2f2f" : "#2f2f2f",
            outline: "none",
            appearance: "none",
            WebkitAppearance: "none",
            cursor: showAns ? "default" : "pointer",
            minWidth: "clamp(70px,8vw,110px)",
            textAlign: "center",
            textAlignLast: "center",
          }}
        >
          <option value="" disabled hidden />
          {item.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {!showAns && (
          <span
            style={{
              position: "absolute",
              right: "4px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "10px",
              color: "#666",
              pointerEvents: "none",
            }}
          >
            ▼
          </span>
        )}

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
              pointerEvents: "none",
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        {/* Title */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">J</span> Look and write ✓ and ✕. Write
          sentences.
        </h1>

        {/* ── الأسطر الخمسة ── */}
        {ITEMS.map((item) => {
          const w1 = isWrong1(item);
          const w2 = isWrong2(item);

          return (
            <div
              key={item.id}
              style={{
                display: "flex",

                gap: "clamp(10px,1.5vw,20px)",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* ── يسار: رقم + صورة نشاط + الملابس ── */}
              <div className="flex flex-col gap-5 justify-center items-center">
                <div
                  style={{
                    position: "relative",
                    width: "350px",
                    height: "150px",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={item.actImg}
                    alt={`act-${item.id}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />

                  {/* 🔲 المربعات فوق الصورة */}
                  {item.boxPositions.map((pos, index) => {
                    const isWrongBox =
                      showResults &&
                      !showAns &&
                      answers[`box-${item.id}-${index + 1}`] &&
                      answers[`box-${item.id}-${index + 1}`] !==
                        item.boxCorrect[index];
                    return (
                      <div
                        key={index}
                        onClick={() => handleBoxClick(item.id, index+1)}
                        style={{
                          position: "absolute",
                          top: pos.top,
                          left: pos.left,
                          transform: "translate(-50%, -50%)",
                          width: "clamp(25px,2.5vw,35px)",
                          height: "clamp(25px,2.5vw,35px)",
                          // border: "2px solid #333",
                          borderRadius: "6px",
                          // background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        {answers[`box-${item.id}-${index + 1}`] === "true" && (
                          <img src={trueIcon} style={{ width: "65%" }} />
                        )}
                        {answers[`box-${item.id}-${index + 1}`] === "false" && (
                          <img src={falseIcon} style={{ width: "65%" }} />
                        )}
                        {isWrongBox && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-6px",
                              right: "-6px",
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
                  })}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "8px",
                  }}
                >
                  <div
                    onClick={() =>
                      setSelected((prev) => ({
                        ...prev,
                        [item.id]: "true",
                      }))
                    }
                    style={{
                      width: "35px",
                      height: "35px",
                      border:
                        selected[item.id] === "true"
                          ? `2px solid ${BORDER_COLOR}`
                          : "1px solid #747474ff",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img src={trueIcon} style={{ width: "20px" }} />
                  </div>

                  <div
                    onClick={() =>
                      setSelected((prev) => ({
                        ...prev,
                        [item.id]: "false",
                      }))
                    }
                    style={{
                      width: "35px",
                      height: "35px",
                      border:
                        selected[item.id] === "false"
                          ? `2px solid ${BORDER_COLOR}`
                          : "1px solid #747474ff",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img src={falseIcon} style={{ width: "20px" }} />
                  </div>
                </div>
              </div>
              {/* ── وسط: الجملة ── */}
              <div
                style={{
                  border: `1px solid ${BORDER_COLOR}`,
                  borderRadius: "clamp(10px,1.2vw,16px)",
                  padding: "clamp(8px,1vw,14px) clamp(10px,1.2vw,16px)",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "4px",
                  fontSize: "clamp(13px,1.4vw,17px)",
                  // fontWeight: 500,
                  color: "#111",
                  lineHeight: 1.5,
                  minWidth: 0,
                }}
              >
                <span>You must wear a</span>
                {renderSelect(item, "1", w1)}
                <span>for {item.activity}, but you mustn't wear a</span>
                {renderSelect(item, "2", w2)}
                <span>.</span>
              </div>
            </div>
          );
        })}

        {/* Buttons */}
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
