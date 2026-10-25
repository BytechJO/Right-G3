import React, { useState } from "react";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Ex D 4.svg";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";

const statementAudio = [
  "Item_001_She_will_go_to_the_beach.mp3",
  "Item_002_She_will_go_to_the_library.mp3",
  "Item_003_He_will_plant_a_tree.mp3",
  "Item_004_He_will_go_to_his_grandparents'_farm.mp3",
  "Item_005_She_will_go_to_the_park.mp3",
  "Item_006_She_will_go_to_a_restaurant.mp3",
  "Item_007_She_will_do_her_homework.mp3",
  "Item_008_She_will_watch_TV.mp3",
].map(
  (file) =>
    new URL(
      `../../../assets/audio/ClassBook/Unit 10/Page 87 - Exercise D/${file}`,
      import.meta.url,
    ).href,
);
const exerciseQuestions = [
  {
    id: "g1",
    img: img1,
    questions: [
      { id: "q1", text: "She will go to the beach.", correctAnswer: true },
      {
        id: "q2",
        text: "She will go to the library.",
        correctAnswer: false,
      },
    ],
  },
  {
    id: "g2",
    img: img2,
    questions: [
      { id: "q3", text: "He will plant a tree.", correctAnswer: false },
      {
        id: "q4",
        text: "He will go to his grandparents’ farm.",
        correctAnswer: true,
      },
    ],
  },
  {
    id: "g3",
    img: img3,
    questions: [
      { id: "q5", text: "She will go to the park.", correctAnswer: true },
      {
        id: "q6",
        text: "She will go to a restaurant.",
        correctAnswer: false,
      },
    ],
  },
  {
    id: "g4",
    img: img4,
    questions: [
      { id: "q7", text: "She will do her homework.", correctAnswer: true },
      { id: "q8", text: "She will watch TV.", correctAnswer: false },
    ],
  },
];

const Unit10_Page6_Q1 = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelectAnswer = (questionId, answer) => {
    if (lockedIds.includes(questionId)) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleShowAnswer = () => {
    const correct = {};

    exerciseQuestions.forEach((group) => {
      group.questions.forEach((q) => {
        correct[q.id] = q.correctAnswer;
      });
    });

    setUserAnswers(correct);
    setShowResults(true);
    setLockedIds(
      exerciseQuestions.flatMap((group) => group.questions.map((q) => q.id)),
    );
    stopAudio();
  };
  const handleStartAgain = () => {
    setUserAnswers({});
    setShowResults(false);
    setLockedIds([]);
    stopAudio();
  };

  const checkAnswers = () => {
    if (
      lockedIds.length ===
      exerciseQuestions.reduce((sum, group) => sum + group.questions.length, 0)
    )
      return;

    let totalQuestions = 0;
    let correctCount = 0;

    exerciseQuestions.forEach((group) => {
      group.questions.forEach((q) => {
        totalQuestions++;

        if (userAnswers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      });
    });

    if (Object.keys(userAnswers).length < totalQuestions) {
      ValidationAlert.info();
      return;
    }

    setShowResults(true);
    setLockedIds(
      exerciseQuestions.flatMap((group) =>
        group.questions
          .filter((q) => userAnswers[q.id] === q.correctAnswer)
          .map((q) => q.id),
      ),
    );

    if (correctCount === totalQuestions) {
      ValidationAlert.success(`Score: ${correctCount}/${totalQuestions}`);
    } else if (correctCount === 0) {
      ValidationAlert.error(`Score: ${correctCount}/${totalQuestions}`);
    } else {
      ValidationAlert.warning(`Score: ${correctCount}/${totalQuestions}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{ gap: "20px" }}>
        <ExerciseHeader
          sectionLetter="D"
          title={
            <>
              Read, look, and write <span style={{ color: "#D1232A" }}>✓</span>{" "}
              and <span style={{ color: "#D1232A" }}>✗</span>.
            </>
          }
          subTitle="Read each statement and compare it with the picture or sentence before choosing the two-way answer."
        />

        <div className="flex flex-col gap-2 w-full">
          {exerciseQuestions.map((group, groupIndex) => (
            <div key={group.id} className="mb-5">
              <div className="grid grid-cols-[220px_1fr_auto] gap-x-6 items-start ">
                {/* left side: number + image */}
                <div className="flex items-start gap-3 ">
                  <span className="font-bold text-black text-[22px] leading-none mt-2 w-6">
                    {groupIndex + 1}
                  </span>

                  <img
                    src={group.img}
                    alt={
                      [
                        "A girl choosing between the beach and the library.",
                        "A boy choosing between planting a tree and visiting his grandparents' farm.",
                        "A girl choosing between the park and a restaurant.",
                        "A girl choosing between doing homework and watching TV.",
                      ][groupIndex]
                    }
                    style={{
                      width: "200px",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* right: true / false boxes */}
                <div className="flex flex-col gap-3">
                  {group.questions.map((question, questionIndex) => (
                    <div
                      key={question.id}
                      className="flex items-center justify-between"
                    >
                      {/* النص */}
                      <p
                        className="text-[18px] text-black unit4-interactive unit4-audio-control"
                        role="button"
                        tabIndex={0}
                        aria-label={`Play ${question.text}`}
                        onClick={() =>
                          playAudio(
                            `statement-${groupIndex}-${questionIndex}`,
                            statementAudio[groupIndex * 2 + questionIndex],
                          )
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            playAudio(
                              `statement-${groupIndex}-${questionIndex}`,
                              statementAudio[groupIndex * 2 + questionIndex],
                            );
                          }
                        }}
                      >
                        <Unit4PlayingAudioIcon
                          active={
                            activeAudioKey ===
                            `statement-${groupIndex}-${questionIndex}`
                          }
                        />
                        {question.text}
                      </p>

                      {/* البوكسات */}
                      {/* البوكسات */}
                      <div className="flex items-center gap-x-4">
                        {/* ✓ */}
                        <div
                          style={{ position: "relative" }}
                          onClick={() => handleSelectAnswer(question.id, true)}
                          role="button"
                          tabIndex={lockedIds.includes(question.id) ? -1 : 0}
                          aria-disabled={lockedIds.includes(question.id)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              handleSelectAnswer(question.id, true);
                            }
                          }}
                          className={`w-[40px] h-[40px] rounded-md cursor-pointer flex items-center justify-center border-1 transition-all ${
                            showResults &&
                            userAnswers[question.id] === true &&
                            userAnswers[question.id] !== question.correctAnswer
                              ? "border-red-500"
                              : "border-orange-500"
                          }`}
                        >
                          {userAnswers[question.id] === true && (
                            <span className="text-blue-900 font-bold text-2xl">
                              <img src={trueIcon} style={{ height: "25px" }} />
                            </span>
                          )}

                          {/* WRONG MARK */}
                          {showResults &&
                            userAnswers[question.id] === true &&
                            userAnswers[question.id] !==
                              question.correctAnswer && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "-8px",
                                  right: "-8px",
                                  width: "20px",
                                  height: "20px",
                                  background: "red",
                                  color: "white",
                                  borderRadius: "50%",
                                  fontSize: "12px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: "bold",
                                  border: "2px solid white",
                                  boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                                  pointerEvents: "none",
                                  zIndex: 10,
                                }}
                              >
                                ✕
                              </div>
                            )}
                        </div>

                        {/* ✕ */}
                        <div
                          style={{ position: "relative" }}
                          onClick={() => handleSelectAnswer(question.id, false)}
                          role="button"
                          tabIndex={lockedIds.includes(question.id) ? -1 : 0}
                          aria-disabled={lockedIds.includes(question.id)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              handleSelectAnswer(question.id, false);
                            }
                          }}
                          className={`w-[40px] h-[40px] rounded-md cursor-pointer flex items-center justify-center border-1 transition-all ${
                            showResults &&
                            userAnswers[question.id] === false &&
                            userAnswers[question.id] !== question.correctAnswer
                              ? "border-red-500"
                              : "border-orange-500"
                          }`}
                        >
                          {userAnswers[question.id] === false && (
                            <span className="text-blue-900 font-bold text-2xl">
                              <img src={falseIcon} style={{ height: "25px" }} />
                            </span>
                          )}

                          {/* WRONG MARK */}
                          {showResults &&
                            userAnswers[question.id] === false &&
                            userAnswers[question.id] !==
                              question.correctAnswer && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "-8px",
                                  right: "-8px",
                                  width: "20px",
                                  height: "20px",
                                  background: "red",
                                  color: "white",
                                  borderRadius: "50%",
                                  fontSize: "12px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: "bold",
                                  border: "2px solid white",
                                  boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                                  pointerEvents: "none",
                                  zIndex: 10,
                                }}
                              >
                                ✕
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
};

export default Unit10_Page6_Q1;
