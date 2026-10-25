import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import yesAudio from "../../../assets/audio/WorkBook/unit10/Page 57 - Exercise B/Item_001_Yes,_I_will.mp3";
import noAudio from "../../../assets/audio/WorkBook/unit10/Page 57 - Exercise B/Item_002_No,_I_won't.mp3";
import full1Audio from "../../../assets/audio/WorkBook/unit10/Page 57 - Exercise B/Item_003_Will_you_go_to_school_-_Yes,_I_will.mp3";
import full2Audio from "../../../assets/audio/WorkBook/unit10/Page 57 - Exercise B/Item_004_Will_you_go_to_the_park_Yes,_I_will.mp3";
import full3Audio from "../../../assets/audio/WorkBook/unit10/Page 57 - Exercise B/Item_005_Will_you_eat_any_cake_Yes,_I_will.mp3";
import full4Audio from "../../../assets/audio/WorkBook/unit10/Page 57 - Exercise B/Item_006_Will_you_buy_new_clothes_Yes,_I_will.mp3";
import full5Audio from "../../../assets/audio/WorkBook/unit10/Page 57 - Exercise B/Item_007_Will_you_play_with_your_friends_-_Yes,_I_will.mp3";

// ── ثوابت ──────────────────────────────────────────────────────
const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "red";

// ── بيانات ─────────────────────────────────────────────────────
const QUESTIONS = [
  { id: 1, text: "Will you go to school?", audio: full1Audio },
  { id: 2, text: "Will you go to the park?", audio: full2Audio },
  { id: 3, text: "Will you eat any cake?", audio: full3Audio },
  { id: 4, text: "Will you buy new clothes?", audio: full4Audio },
  { id: 5, text: "Will you play with your friends?", audio: full5Audio },
];

const OPTIONS = ["Yes, I will.", "No, I won't."];
const OPTION_AUDIO = { "Yes, I will.": yesAudio, "No, I won't.": noAudio };

// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit8_Page57_QB() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, value) => {
    if (checked) return;

    setChecked(false);
    stopAudio();
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (checked) return;
    const allAnswered = QUESTIONS.every((q) => answers[q.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first! ✏️");
      return;
    }
    setChecked(true);
    ValidationAlert.success("Great! You answered all the questions. 🎉");
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "45px" }}>
        {/* ── العنوان ── */}
        <ExerciseHeader
          sectionLetter="B"
          title="What will you do tomorrow? Read and answer the questions."
          subTitle="Answer each Yes, I will or No, I won’t response to each personal question based on your own plan; choose one response and say the complete answer aloud."
        />

        {/* ── صناديق الخيارات العلوية ── */}
        <div
          className="w-full"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(40px,10vw,130px)",
            flexWrap: "wrap",
          }}
        >
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              className="unit4-audio-control"
              onClick={() => playAudio(`option-${opt}`, OPTION_AUDIO[opt])}
              style={{
                minWidth: "clamp(120px,16vw,170px)",
                height: "45px",
                border: `1px solid ${BORDER_COLOR}`,
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 500,
                color: "#222",
                backgroundColor: "#fff",
                padding: "0 clamp(12px,1.5vw,20px)",
                boxSizing: "border-box",
                position: "relative",
              }}
            >
              {opt}
              <Unit4PlayingAudioIcon
                active={activeAudioKey === `option-${opt}`}
              />
            </button>
          ))}
        </div>

        {/* ── الأسئلة ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(20px,4vw,40px)",
            width: "100%",
            maxWidth: "820px",
            margin: "0 auto",
          }}
        >
          {QUESTIONS.map((q) => {
            const selected = answers[q.id];
            const unanswered = checked && !selected;

            return (
              <div
                key={q.id}
                className={
                  checked
                    ? "unit4-audio-control unit4-full-audio-enabled"
                    : undefined
                }
                role={checked ? "button" : undefined}
                tabIndex={checked ? 0 : undefined}
                aria-label={checked ? `Play: ${q.text} ${selected}` : undefined}
                onClick={() => checked && playAudio(`full-${q.id}`, q.audio)}
                onKeyDown={(event) => {
                  if (checked && (event.key === "Enter" || event.key === " ")) {
                    event.preventDefault();
                    playAudio(`full-${q.id}`, q.audio);
                  }
                }}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(8px,1.2vw,16px)",
                  flexWrap: "wrap",
                }}
              >
                {/* رقم + نص السؤال */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "clamp(8px,1vw,12px)",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 500,
                      color: "#111",
                      minWidth: "clamp(14px,1.8vw,20px)",
                    }}
                  >
                    {q.id}
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#222",
                      lineHeight: 1.4,
                      // fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {q.text}
                  </span>
                </div>

                {/* أزرار الاختيار */}
                <div
                  style={{
                    display: "flex",
                    gap: "clamp(6px,0.8vw,10px)",
                    flexShrink: 0,
                  }}
                >
                  {OPTIONS.map((opt) => {
                    const active = selected === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(q.id, opt)}
                        style={{
                          padding:
                            "clamp(5px,0.7vw,8px) clamp(10px,1.2vw,14px)",
                          borderRadius: "20px",
                          border: `1.5px solid ${active ? BORDER_COLOR : "#e2e8f0"}`,
                          // backgroundColor: active ? "#ffca94" : "#f8fafc",
                          // color:           active ? "#fff" : "",
                          fontSize: "clamp(12px,1.4vw,15px)",
                          fontWeight: 600,
                          cursor: checked ? "default" : "pointer",
                          whiteSpace: "nowrap",
                          transition: "all 0.15s",
                          userSelect: "none",
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* خط الإجابة */}
                <div
                  style={{
                    flex: 1,
                    minWidth: "80px",
                    minHeight: "clamp(30px,3.5vw,40px)",
                    borderBottom: `1px solid ${unanswered ? WRONG_COLOR : "#7f7f7f"}`,
                    display: "flex",
                    alignItems: "center",
                    fontSize: "18px",
                    // fontWeight:   600,
                    color: "#000000ff",
                    paddingBottom: "2px",
                    transition: "border-color 0.2s",
                  }}
                >
                  {selected || ""}
                </div>

                {/* بادج الخطأ — فقط لو ما أجاب بعد Check */}
                {unanswered && (
                  <div
                    style={{
                      position: "absolute",
                      right: -10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "clamp(16px,1.8vw,20px)",
                      height: "clamp(16px,1.8vw,20px)",
                      borderRadius: "50%",
                      backgroundColor: WRONG_COLOR,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "clamp(8px,0.9vw,11px)",
                      fontWeight: 700,
                      border: "1.5px solid #fff",
                      pointerEvents: "none",
                    }}
                  >
                    ✕
                  </div>
                )}
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `full-${q.id}`}
                />
              </div>
            );
          })}
        </div>

        {/* ── الأزرار — بدون showAnswer ── */}
        <div className="mt-4 flex justify-center">
          <Button checkAnswers={handleCheck} handleStartAgain={handleReset} />
        </div>
      </div>
    </div>
  );
}
