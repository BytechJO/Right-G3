import React, { useState } from "react";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";
import Unit1PlayingAudioIcon from "./Unit1PlayingAudioIcon";
import useUnit1Audio from "./useUnit1Audio";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex B 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex B 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex B 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex B 7.svg";
import sentence1 from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise B/Item_001_Jad_is_older_than_his_dad.mp3";
import trueAudio from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise B/Item_002_true.mp3";
import falseAudio from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise B/Item_003_false.mp3";
import sentence2 from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise B/Item_004_The_giraffe_is_taller_than_the_bear.mp3";
import sentence3 from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise B/Item_005_The_bus_is_faster_than_the_airplane.mp3";
import sentence4 from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise B/Item_006_The_car_is_bigger_than_the_bike.mp3";
import "./Page8_Q3.css";
import "./unit1Interactions.css";

const QUESTIONS = [
  {
    id: 1,
    text: "Jad is older than his dad.",
    answer: "false",
    audio: sentence1,
    images: [{ src: img1, alt: "Jad standing next to his father" }],
  },
  {
    id: 2,
    text: "The giraffe is taller than the bear.",
    answer: "true",
    audio: sentence2,
    images: [
      { src: img2, alt: "A giraffe" },
      { src: img3, alt: "A bear" },
    ],
  },
  {
    id: 3,
    text: "The bus is faster than the airplane.",
    answer: "false",
    audio: sentence3,
    images: [
      { src: img4, alt: "A bus" },
      { src: img5, alt: "An airplane" },
    ],
  },
  {
    id: 4,
    text: "The car is bigger than the bike.",
    answer: "true",
    audio: sentence4,
    images: [
      { src: img6, alt: "A car" },
      { src: img7, alt: "A bicycle" },
    ],
  },
];

const optionAudio = { true: trueAudio, false: falseAudio };

export default function Page8_Q3() {
  const { activeAudioKey, playAudio, stopAudio } = useUnit1Audio();
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [correctIds, setCorrectIds] = useState([]);

  const selectAnswer = (event, question, value) => {
    event.stopPropagation();
    playAudio(`option-${question.id}-${value}`, optionAudio[value]);
    if (revealed || correctIds.includes(question.id)) return;
    setAnswers((previous) => ({ ...previous, [question.id]: value }));
    setChecked(false);
  };

  const playSentence = (event, question) => {
    event.stopPropagation();
    playAudio(`sentence-${question.id}`, question.audio);
  };

  const checkAnswers = () => {
    if (revealed || correctIds.length === QUESTIONS.length) return;
    if (QUESTIONS.some((question) => !answers[question.id])) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }
    const correct = QUESTIONS.filter(
      (question) => answers[question.id] === question.answer,
    ).map((question) => question.id);
    setCorrectIds(correct);
    setChecked(true);
    if (correct.length === QUESTIONS.length)
      ValidationAlert.success(`Score: ${correct.length} / ${QUESTIONS.length}`);
    else if (correct.length === 0)
      ValidationAlert.error(`Score: 0 / ${QUESTIONS.length}`);
    else
      ValidationAlert.warning(`Score: ${correct.length} / ${QUESTIONS.length}`);
  };

  const showAnswers = () => {
    setAnswers(
      Object.fromEntries(
        QUESTIONS.map((question) => [question.id, question.answer]),
      ),
    );
    setCorrectIds(QUESTIONS.map((question) => question.id));
    setChecked(true);
    setRevealed(true);
    stopAudio();
  };

  const reset = () => {
    setAnswers({});
    setChecked(false);
    setRevealed(false);
    setCorrectIds([]);
    stopAudio();
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "20px" }}>
        <ExerciseHeader
          sectionLetter="B"
          title="Look and write true or false."
          subTitle="Read each statement and compare it with the picture or sentence before choosing the two-way answer."
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "12px",
          }}
        >
          {QUESTIONS.map((question) => {
            const isCorrect = correctIds.includes(question.id);
            const cardAudioEnabled = checked && isCorrect;
            return (
              <div
                key={question.id}
                className={`unit1-audio-control ${cardAudioEnabled ? "unit1-completed-audio" : ""}`}
                role={cardAudioEnabled ? "button" : undefined}
                tabIndex={cardAudioEnabled ? 0 : undefined}
                aria-label={
                  cardAudioEnabled
                    ? `Play complete sentence: ${question.text}`
                    : undefined
                }
                onClick={() =>
                  cardAudioEnabled &&
                  playAudio(`full-${question.id}`, question.audio)
                }
                onKeyDown={(event) => {
                  if (
                    cardAudioEnabled &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    playAudio(`full-${question.id}`, question.audio);
                  }
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(290px, 1.2fr) minmax(190px, .75fr) minmax(180px, .8fr)",
                  alignItems: "center",
                  gap: "20px",
                  minHeight: "100px",
                  padding: "10px 16px",
                  borderRadius: "14px",
                }}
              >
                <Unit1PlayingAudioIcon
                  active={activeAudioKey === `full-${question.id}`}
                />
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <strong style={{ fontSize: "20px" }}>{question.id}.</strong>
                  <button
                    type="button"
                    className="unit1-audio-control unit1-interactive"
                    onClick={(event) => playSentence(event, question)}
                    style={{
                      padding: "8px",
                      background: "transparent",
                      textAlign: "left",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    {question.text}
                    <Unit1PlayingAudioIcon
                      active={activeAudioKey === `sentence-${question.id}`}
                    />
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "22px",
                    borderBottom: "1px solid #6b7280",
                    paddingBottom: "10px",
                  }}
                >
                  {["true", "false"].map((value) => {
                    const selected = answers[question.id] === value;
                    const wrong =
                      checked && selected && value !== question.answer;
                    return (
                      <button
                        type="button"
                        key={value}
                        className="unit1-audio-control unit1-interactive"
                        onClick={(event) =>
                          selectAnswer(event, question, value)
                        }
                        aria-pressed={selected}
                        style={{
                          position: "relative",
                          padding: "7px 14px",
                          border: selected
                            ? `2px solid ${wrong ? "#dc2626" : "#f39b42"}`
                            : "2px solid transparent",
                          borderRadius: "20px",
                          background: "transparent",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                      >
                        {value}
                        <Unit1PlayingAudioIcon
                          active={
                            activeAudioKey === `option-${question.id}-${value}`
                          }
                        />
                        {wrong && <WrongMark />}
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {question.images.map((image) => (
                    <img
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      style={{
                        width: question.images.length === 1 ? "105px" : "76px",
                        height: "78px",
                        objectFit: "contain",
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
          checkDisabled={revealed || correctIds.length === QUESTIONS.length}
        />
      </div>
    </div>
  );
}
