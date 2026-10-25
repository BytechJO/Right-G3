import React, { useState } from "react";
import "./Unit9_Page5_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Ex A 3.svg";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import instructionAudio from "../../../assets/audio/ClassBook/Unit 9/P 80/CD60.Pg80_Instruction_Adult Lady.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";

const Unit9_Page5_Q1 = () => {
  const [lockedIds, setLockedIds] = useState([]);
  const [showAns, setShowAns] = useState(false);

  const questions = [
    {
      id: 1,
      image1: img1,

      label1: "ducks",
      label2: "girls",
      correct: "✗",
    },
    {
      id: 2,
      image1: img2,

      label1: "cats",
      label2: "cups",
      correct: "✓",
    },
    {
      id: 3,
      image1: img3,

      label1: "trees",
      label2: "bees",
      correct: "✓",
    },
  ];
  const captions = [
    {
      start: 0,
      end: 60,
      text: "Page 80, Exercise A. Do they both have the same final -s sound? Write check or X.",
    },
  ];
  const [answers, setAnswers] = useState({});
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const selectAnswer = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers({ ...answers, [id]: value });
    setWrongIds((previous) => previous.filter((wrongId) => wrongId !== id));
  };

  const showAnswers = () => {
    const corrects = {};
    questions.forEach((q) => {
      corrects[q.id] = q.correct;
    });
    setAnswers(corrects);
    setWrongIds([]);
    setLockedIds(questions.map((question) => question.id));
    setShowAns(true);
    stopAudio();
  };

  const checkAnswers = () => {
    if (showAns || lockedIds.length === questions.length) return;
    const isEmpty = questions.some((q) => !answers[q.id]);
    if (isEmpty) {
      ValidationAlert.info("Please choose ✓ or ✗ for all questions!");
      return;
    }

    const nextLockedIds = questions
      .filter((q) => answers[q.id] === q.correct)
      .map((q) => q.id);
    const nextWrongIds = questions
      .filter((q) => answers[q.id] !== q.correct)
      .map((q) => q.id);
    setLockedIds(nextLockedIds);
    setWrongIds(nextWrongIds);

    const correctCount = nextLockedIds.length;
    const total = questions.length;
    const scoreMsg = `${correctCount} / ${total}`;

    let color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const resultHTML = `
      <div style="font-size: 20px; text-align:center; margin-top: 8px;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${scoreMsg}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(resultHTML);
    else if (correctCount === 0) ValidationAlert.error(resultHTML);
    else ValidationAlert.warning(resultHTML);
  };

  const resetAnswers = () => {
    setAnswers({});
    setWrongIds([]);
    setLockedIds([]);
    setShowAns(false);
    stopAudio();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div
          className="div-forall mb-10"
          style={{
            gap: "30px",
          }}
        >
          <ExerciseHeader
            sectionLetter="A"
            title={
              <>
                Do they both have the same final{" "}
                <span style={{ color: "#2e3192" }}>-s sound</span>? Write{" "}
                <span style={{ color: "#D1232A" }}>✓</span> or{" "}
                <span style={{ color: "#D1232A" }}>✗</span>.
              </>
            }
            subTitle="Say both words aloud, compare their final -s sounds, then mark whether the sounds are the same."
          />
          <QuestionAudioPlayer
            src={instructionAudio}
            captions={captions}
            pageId="unit9-page80-a"
          />

          <div className="grid grid-cols-3 gap-[30px] u8p5-grid">
            {questions.map((q) => (
              <div
                key={q.id}
                className="u8p5-card p-4 bg-white flex flex-col items-center gap-3 relative"
              >
                <div className="flex flex-col items-center gap-3.5">
                  {/* الصور */}
                  <div
                    className="flex gap-2 rounded-xl p-4 w-[200px] unit4-audio-control unit4-interactive"
                    style={{ position: "relative" }}
                  >
                    {/* الديف الأول */}
                    <span className="text-[darkblue] font-bold">{q.id}.</span>
                    <img
                      src={q.image1}
                      alt={
                        {
                          1: "Two ducks and two girls.",
                          2: "Two cats and three cups.",
                          3: "Two trees and three bees.",
                        }[q.id]
                      }
                      style={{ height: "120px", objectFit: "contain" }}
                    />
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `pair-${q.id}`}
                    />
                  </div>

                  {/* الخيارات */}
                  <div className="u8p5-opts-row flex gap-5 ml-5">
                    {/* ✓ */}
                    <div className="relative">
                      <div
                        className={`u8p5-opt-btn w-[45px] h-[45px] rounded-md flex items-center justify-center cursor-pointer text-[22px] font-bold transition-all duration-150 ${showAns || lockedIds.includes(q.id) ? "" : " hover:border-[#F79530]"} ${
                          answers[q.id] === "✓"
                            ? wrongIds.includes(q.id)
                              ? "border-2 border-red-500"
                              : "border-2 border-[#F79530] text-white"
                            : "border border-gray-300 bg-white"
                        }`}
                        role="button"
                        tabIndex={showAns || lockedIds.includes(q.id) ? -1 : 0}
                        aria-label={`Question ${q.id}: yes, the final sounds match`}
                        aria-disabled={showAns || lockedIds.includes(q.id)}
                        onClick={() => selectAnswer(q.id, "✓")}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            selectAnswer(q.id, "✓");
                          }
                        }}
                      >
                        <img src={trueIcon} alt="" style={{ height: "25px" }} />
                      </div>

                      {wrongIds.includes(q.id) && answers[q.id] === "✓" && (
                        <div className="u8p5-wrong-badge absolute -top-2.5 -right-2.5 w-[22px] h-[22px] rounded-full bg-red-500 text-white flex items-center justify-center text-[14px] font-bold border-2 border-white z-3">
                          ✕
                        </div>
                      )}
                    </div>

                    {/* ✗ */}
                    <div className="relative">
                      <div
                        className={`u8p5-opt-btn w-[45px] h-[45px] rounded-md flex items-center justify-center cursor-pointer text-[22px] font-bold transition-all duration-150 ${showAns || lockedIds.includes(q.id) ? "" : " hover:border-[#F79530]"} ${
                          answers[q.id] === "✗"
                            ? wrongIds.includes(q.id)
                              ? "border-2 border-red-500"
                              : "border-2 border-[#F79530] text-white"
                            : "border border-gray-300 bg-white"
                        }`}
                        role="button"
                        tabIndex={showAns || lockedIds.includes(q.id) ? -1 : 0}
                        aria-label={`Question ${q.id}: no, the final sounds do not match`}
                        aria-disabled={showAns || lockedIds.includes(q.id)}
                        onClick={() => selectAnswer(q.id, "✗")}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            selectAnswer(q.id, "✗");
                          }
                        }}
                      >
                        <img
                          src={falseIcon}
                          alt=""
                          style={{ height: "25px" }}
                        />
                      </div>

                      {wrongIds.includes(q.id) && answers[q.id] === "✗" && (
                        <div className="u8p5-wrong-badge absolute -top-2.5 -right-2.5 w-[22px] h-[22px] rounded-full bg-red-500 text-white flex items-center justify-center text-[14px] font-bold border-2 border-white z-3">
                          ✕
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="action-buttons-container">
            <button onClick={resetAnswers} className="try-again-button">
              Start Again ↻
            </button>
            <button
              onClick={showAnswers}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button onClick={checkAnswers} className="check-button2">
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unit9_Page5_Q1;
