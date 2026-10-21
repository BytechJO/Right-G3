import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import audio1 from "../../../assets/audio/WorkBook/unit7/Page 40 - Exercise D/Item_001_Can_you_see_Helen.mp3";
import audio2 from "../../../assets/audio/WorkBook/unit7/Page 40 - Exercise D/Item_002_Yes,_I_can_see_her.mp3";
import audio3 from "../../../assets/audio/WorkBook/unit7/Page 40 - Exercise D/Item_003_Can_you_see_Helen's_brother.mp3";
import audio4 from "../../../assets/audio/WorkBook/unit7/Page 40 - Exercise D/Item_004_Yes,_I_can_see_him.mp3";
import audio5 from "../../../assets/audio/WorkBook/unit7/Page 40 - Exercise D/Item_005_Can_you_see_Helen's_mom.mp3";

import sceneImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/7.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "red";
const ANSWER_COLOR = "#000000ff";
const LINE_COLOR = "#2f2f2f";

const DRAG_ITEMS = [
  { id: "d3", value: "in the living room" },
  { id: "d4", value: "at the computer" },
  { id: "d5", value: "in the living room ironing clothes" },
];

const ITEMS = [
  {
    id: 1,
    fixed: false,
    question: "Can you see Helen?",
    beforeDrop: "Yes, I can see her",
    afterDrop: ".",
    correct: "in the living room",
    questionAudio: audio1,
    prefixAudio: audio2,
  },
  {
    id: 2,
    fixed: false,
    question: "Can you see Helen's brother?",
    before: "Yes, I can see",
    middle: "him",
    middleFixed: true,
    after: "",
    dropKey: "loc",
    correct: "at the computer",
    beforeDrop: "Yes, I can see him",
    afterDrop: ".",
    questionAudio: audio3,
    prefixAudio: audio4,
  },
  {
    id: 3,
    fixed: false,
    question: "Can you see Helen's mom?",
    beforeDrop: "Yes, I can see her",
    afterDrop: ".",
    correct: "in the living room ironing clothes",
    questionAudio: audio5,
  },
];

export default function WB_LookReadFind_PageD() {
  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const [focusedSelect, setFocusedSelect] = useState(null);
  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const editables = ITEMS.filter((i) => !i.fixed);
    const allAnswered = editables.every((i) => answers[`a-${i.id}`]?.value);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const correctIds = editables.flatMap((i) =>
      answers[`a-${i.id}`]?.value === i.correct ? [i.id] : [],
    );
    const incorrectIds = editables.flatMap((i) =>
      answers[`a-${i.id}`]?.value !== i.correct ? [i.id] : [],
    );
    const score = correctIds.length;
    setShowResults(true);
    setLockedIds(correctIds);
    setWrongIds(incorrectIds);
    const total = editables.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.filter((i) => !i.fixed).forEach((i) => {
      const d = DRAG_ITEMS.find((d) => d.value === i.correct);
      filled[`a-${i.id}`] = { dragId: d?.id, value: i.correct };
    });
    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(ITEMS.map((i) => i.id));
    setWrongIds([]);
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    stopAudio();
  };

  const isWrong = (item) => wrongIds.includes(item.id);

  const renderDropZone = (item) => {
    const boxKey = `a-${item.id}`;
    const value = answers[boxKey]?.value || "";
    const wrong = isWrong(item);

    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "6px",
          width: "100%",
        }}
      >
        {/* before */}
        <span
          role={item.prefixAudio ? "button" : undefined}
          tabIndex={item.prefixAudio ? 0 : -1}
          className={
            item.prefixAudio
              ? "unit4-audio-control unit4-interactive"
              : undefined
          }
          onClick={() =>
            item.prefixAudio && playAudio(`prefix-${item.id}`, item.prefixAudio)
          }
          onKeyDown={(event) => {
            if (
              item.prefixAudio &&
              (event.key === "Enter" || event.key === " ")
            ) {
              event.preventDefault();
              playAudio(`prefix-${item.id}`, item.prefixAudio);
            }
          }}
          style={{
            fontSize: "18px",
            // fontWeight: 500,
            color: "#111",
          }}
        >
          <Unit4PlayingAudioIcon
            active={activeAudioKey === `prefix-${item.id}`}
          />
          {item.beforeDrop}
        </span>

        {/* wrapper */}
        <div
          style={{
            position: "relative",
            minWidth: "clamp(120px,18vw,260px)",
          }}
        >
          {/* select مخفي */}
          <select
            value={value}
            onChange={(e) => {
              setAnswers((prev) => ({
                ...prev,
                [boxKey]: { value: e.target.value },
              }));
              setWrongIds((prev) => prev.filter((id) => id !== item.id));
            }}
            disabled={showAns || lockedIds.includes(item.id)}
            onFocus={(e) => {
              if (e.target.matches(":focus-visible")) {
                setFocusedSelect(item.id);
              }
            }}
            onBlur={() => setFocusedSelect(null)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor:
                showAns || lockedIds.includes(item.id) ? "default" : "pointer",
              zIndex: 2,
            }}
          >
            <option value="" disabled>
              Select...
            </option>
            {DRAG_ITEMS.map((opt) => (
              <option key={opt.id} value={opt.value}>
                {opt.value}
              </option>
            ))}
          </select>

          {/* الشكل القديم */}
          <div
            style={{
              minHeight: "clamp(28px,3.2vw,38px)",
              borderBottom: wrong
                ? `2px solid ${WRONG_COLOR}`
                : `1px solid ${LINE_COLOR}`,
              display: "flex",
              alignItems: "flex-end",
              paddingBottom: "3px",

              outline: focusedSelect === item.id ? "3px solid #2563eb" : "none",
              outlineOffset: "4px",
              borderRadius: "4px",
            }}
          >
            {value ? (
              <span
                style={{
                  fontSize: "18px",
                  // fontWeight: 600,
                  color: ANSWER_COLOR,
                  lineHeight: 1,
                  wordBreak: "break-word",
                }}
              >
                {value}
              </span>
            ) : (
              <span
                style={{
                  fontSize: "18px",
                  color: "#aaa",
                }}
              >
                Select...
              </span>
            )}
          </div>

          {/* wrong icon */}
          {wrong && (
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
                zIndex: 3,
              }}
            >
              ✕
            </div>
          )}
        </div>

        {/* after */}
        <span
          style={{
            fontSize: "clamp(14px,1.6vw,20px)",
            fontWeight: 500,
            color: "#111",
          }}
        >
          {item.afterDrop}
        </span>
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "55px",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="D"
          title="Look, read, and find. Write."
          subTitle="Use the person and location found in the room scene to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        {/* ── Layout: يسار أسئلة + يمين صورة ── */}
        <div
          style={{
            display: "flex",

            gap: "clamp(16px,2.5vw,30px)",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* ── يسار: Word Bank + الأسئلة ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px,2vw,24px)",
            }}
          >
            {/* الأسئلة */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "400px",
                justifyContent: "space-between",
                // gap: "45px",
              }}
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "25px",
                  }}
                >
                  {/* رقم + سؤال */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#111",
                        flexShrink: 0,
                      }}
                    >
                      {item.id}
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        playAudio(`question-${item.id}`, item.questionAudio)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(`question-${item.id}`, item.questionAudio);
                        }
                      }}
                      className="unit4-audio-control unit4-interactive"
                      style={{
                        fontSize: "18px",
                        // fontWeight: 500,
                        color: "#111",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `question-${item.id}`}
                      />
                      {item.question}
                    </span>
                  </div>

                  {/* الإجابة */}
                  {item.fixed ? (
                    <div
                      style={{
                        fontSize: "18px",
                        // fontWeight: 500,
                        color: "#111",
                        borderBottom: `1px solid ${LINE_COLOR}`,
                        paddingBottom: "4px",
                        width: "100%",
                      }}
                    >
                      {item.answer}
                    </div>
                  ) : (
                    renderDropZone(item)
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── يمين: الصورة ── */}
          <div
            style={
              {
                // width: "clamp(220px,32vw,400px)",
                // border: `2px solid ${BORDER_COLOR}`,
                // borderRadius: "clamp(12px,1.4vw,18px)",
                // overflow: "hidden",
                // background: "#f7f7f7",
                // flexShrink: 0,
              }
            }
          >
            <img
              src={sceneImg}
              alt="A living room scene with Helen, her brother at a computer, and her mother ironing"
              style={{
                width: "auto",
                height: "400px",
                display: "block",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
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
