import React, { useState } from "react";
import "./Unit8_Page5_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Ex A2-1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Ex A2-2.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Ex A2-3.svg";

import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import blue from "../../../assets/audio/ClassBook/Unit 8/P 68/unit8-pg68-EXA2.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import "../unit4/unit4Interactions.css";

const Unit8_Page5_Q2 = () => {
  const [lockedIds, setLockedIds] = useState([]);
  const [showAns, setShowAns] = useState(false);

  const questions = [
    {
      id: 1,
      image1: img1,
      alt: "Two bikes and two horses",

      correct: "✗",
    },
    { id: 2, image1: img2, alt: "Two foxes and three boxes", correct: "✓" },
    {
      id: 3,
      image1: img3,
      alt: "Two buses and four sandwiches",

      correct: "✓",
    },
  ];
  const captions = [
    {
      start: 0.459,
      end: 13.119,
      text: "Page sixty-eight, Write Activities. Exercise A, number two. Does it have the same E-S sound? Listen and write check or X.",
    },
    {
      start: 14.139,
      end: 25.179,
      text: "One, bikes, horses. Two, foxes, boxes. Three, buses, sandwiches",
    },
  ];
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState([]);

  const selectAnswer = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers({ ...answers, [id]: value });
    setShowResult((previous) =>
      previous.map((result, index) => (index === id - 1 ? undefined : result)),
    );
  };

  const showAnswers = () => {
    const corrects = {};
    questions.forEach((q) => {
      corrects[q.id] = q.correct;
    });
    setAnswers(corrects);
    setShowResult([]);
    setLockedIds(questions.map((question) => question.id));
    setShowAns(true);
  };

  const checkAnswers = () => {
    if (showAns || lockedIds.length === questions.length) return;
    const isEmpty = questions.some((q) => !answers[q.id]);
    if (isEmpty) {
      ValidationAlert.info("Please choose ✓ or ✗ for all questions!");
      return;
    }

    const results = questions.map((q) =>
      answers[q.id] === q.correct ? "correct" : "wrong",
    );
    setShowResult(results);
    setLockedIds(
      questions
        .filter((question) => answers[question.id] === question.correct)
        .map((question) => question.id),
    );

    const correctCount = results.filter((r) => r === "correct").length;
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
    setShowResult([]);
    setLockedIds([]);
    setShowAns(false);
  };

  return (
    <>
      <div
        className="u8p5-wrapper"
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
            questionNumber="2"
            title={
              <>
                Does it have the same{" "}
                <span style={{ color: "#2e3192" }}>-es</span> sound? Listen and
                write <span style={{ color: "#D1232A" }}>✓</span> or{" "}
                <span style={{ color: "#D1232A" }}>✗</span>.
              </>
            }
            subTitle="Listen to both endings, then mark whether the -es sounds are the same."
          />
          <QuestionAudioPlayer
            src={blue}
            captions={captions}
            stopAtSecond={13.2}
            pageId="unit8-page68-a2"
          />

          <div className="grid grid-cols-3 gap-[30px] u8p5-grid w-full">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className="u8p5-card p-4 bg-white flex flex-col items-center gap-3 relative"
              >
                <div className="flex flex-col items-center gap-3.5">
                  {/* الصور */}
                  <div className="flex gap-2 rounded-xl p-4 w-[250px]">
                    {/* الديف الأول */}
                    <span className="text-[darkblue] font-bold">{q.id}.</span>
                    <img
                      src={q.image1}
                      alt={q.alt}
                      style={{ height: "120px", objectFit: "contain" }}
                    />
                  </div>

                  {/* الخيارات */}
                  <div className="u8p5-opts-row flex gap-5">
                    {/* ✓ */}
                    <div className="relative">
                      <button
                        type="button"
                        tabIndex={lockedIds.includes(q.id) || showAns ? -1 : 0}
                        aria-disabled={lockedIds.includes(q.id) || showAns}
                        aria-label={`Question ${q.id}: same ending sound`}
                        className={`unit4-interactive u8p5-opt-btn w-[45px] h-[45px] rounded-md flex items-center justify-center cursor-pointer text-[22px] font-bold transition-all duration-150 ${lockedIds.includes(q.id) || showAns ? "" : " hover:border-[#F79530]"} ${
                          answers[q.id] === "✓"
                            ? showResult[index] === "wrong" &&
                              answers[q.id] === "✓"
                              ? "border-2 border-red-500"
                              : "border-2 border-[#F79530] text-white"
                            : "border border-gray-300 bg-white"
                        }`}
                        onClick={() => selectAnswer(q.id, "✓")}
                      >
                        <img
                          src={trueIcon}
                          alt="Check mark"
                          style={{ height: "25px" }}
                        />
                      </button>

                      {showResult[index] === "wrong" &&
                        answers[q.id] === "✓" && (
                          <div className="u8p5-wrong-badge absolute -top-2.5 -right-2.5 w-[22px] h-[22px] rounded-full bg-red-500 text-white flex items-center justify-center text-[14px] font-bold border-2 border-white z-3">
                            ✕
                          </div>
                        )}
                    </div>

                    {/* ✗ */}
                    <div className="relative">
                      <button
                        type="button"
                        tabIndex={lockedIds.includes(q.id) || showAns ? -1 : 0}
                        aria-disabled={lockedIds.includes(q.id) || showAns}
                        aria-label={`Question ${q.id}: different ending sound`}
                        className={`unit4-interactive u8p5-opt-btn w-[45px] h-[45px] rounded-md flex items-center justify-center cursor-pointer text-[22px] font-bold transition-all duration-150 ${lockedIds.includes(q.id) || showAns ? "" : " hover:border-[#F79530]"} ${
                          answers[q.id] === "✗"
                            ? showResult[index] === "wrong" &&
                              answers[q.id] === "✗"
                              ? "border-2 border-red-500"
                              : "border-2 border-[#F79530] text-white"
                            : "border border-gray-300 bg-white"
                        }`}
                        onClick={() => selectAnswer(q.id, "✗")}
                      >
                        <img
                          src={falseIcon}
                          alt="X mark"
                          style={{ height: "25px" }}
                        />
                      </button>

                      {showResult[index] === "wrong" &&
                        answers[q.id] === "✗" && (
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

export default Unit8_Page5_Q2;
