import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";
import ExerciseHeader from "../../ExerciseHeader";
import trueIcon from "../../../assets/imgs/true.svg";
import trueAudio from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise A/Item_001_True.mp3";
import falseAudio from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise A/Item_002_False.mp3";
import sentence1 from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise A/Item_003_The_car_is_faster_than_the_skateboard.mp3";
import sentence2 from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise A/Item_004_The_grandpa_is_younger_than_the_grandson.mp3";
import sentence3 from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise A/Item_005_The_lion_is_larger_than_the_cat.mp3";
import sentence4 from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise A/Item_006_The_truck_is_smaller_than_the_car.mp3";
import sentence5 from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise A/Item_007_The_snake_is_longer_than_the_worm.mp3";
import sentence6 from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise A/Item_008_The_book_is_heavier_than_the_pen.mp3";
import WorkbookUnit1PlayingAudioIcon from "./WorkbookUnit1PlayingAudioIcon";
import useWorkbookUnit1Audio from "./useWorkbookUnit1Audio";
import "./workbookUnit1Interactions.css";
const ACTIVE_COLOR = "#c81e1e";
const BORDER_COLOR = "#f39b42";
const TEXT_COLOR = "#2b2b2b";
const HEADER_BG = "#ffffff";

const EXERCISE_DATA = [
  {
    id: 1,
    text: "The car is faster than the skateboard.",
    correctAnswer: "true",
    audio: sentence1,
  },
  {
    id: 2,
    text: "The grandpa is younger than the grandson.",
    correctAnswer: "false",
    audio: sentence2,
  },
  {
    id: 3,
    text: "The lion is larger than the cat.",
    correctAnswer: "true",
    audio: sentence3,
  },
  {
    id: 4,
    text: "The truck is smaller than the car.",
    correctAnswer: "false",
    audio: sentence4,
  },
  {
    id: 5,
    text: "The snake is longer than the worm.",
    correctAnswer: "true",
    audio: sentence5,
  },
  {
    id: 6,
    text: "The book is heavier than the pen.",
    correctAnswer: "true",
    audio: sentence6,
  },
];

const styles = {
  wrapper: { width: "100%", overflowX: "auto" },

  table: {
    width: "100%",
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: "clamp(10px, 1.5vw, 18px)",
    overflow: "hidden",
    background: "#fff",
  },

  headerRow: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1fr) clamp(70px, 10vw, 95px) clamp(70px, 10vw, 95px)",
    minHeight: "clamp(42px, 5vw, 58px)",
    background: HEADER_BG,
    borderBottom: `2px solid ${BORDER_COLOR}`,
  },

  headerCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(14px, 1.6vw, 20px)",
    fontWeight: "700",
    color: TEXT_COLOR,
    padding: "8px",
    boxSizing: "border-box",
  },

  bodyRow: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1fr) clamp(70px, 10vw, 95px) clamp(70px, 10vw, 95px)",
    minHeight: "clamp(52px, 6vw, 65px)",
    borderBottom: `1.5px solid ${BORDER_COLOR}`,
  },

  sentenceCell: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(8px, 1vw, 16px)",
    padding: "clamp(8px, 1.2vw, 14px)",
    boxSizing: "border-box",
    minWidth: 0,
  },

  number: {
    flexShrink: 0,
    fontSize: "clamp(16px, 1.8vw, 22px)",
    fontWeight: "700",
    color: TEXT_COLOR,
    width: "clamp(18px, 2vw, 26px)",
    textAlign: "center",
  },

  sentenceText: {
    fontSize: "clamp(14px, 2vw, 19px)",
    fontWeight: "500",
    color: TEXT_COLOR,
    lineHeight: 1.25,
    wordBreak: "break-word",
  },

  optionCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderLeft: `1.5px solid ${BORDER_COLOR}`,
    padding: "6px",
    boxSizing: "border-box",
    cursor: "pointer",
    position: "relative",
    userSelect: "none",
  },

  checkMark: {
    fontSize: "clamp(34px, 5vw, 62px)",
    fontWeight: "900",
    lineHeight: 1,
    transform: "rotate(-6deg)",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },
};

const WB_TrueFalse_Table = () => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [correctRows, setCorrectRows] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit1Audio();

  const handleSelect = (questionId, value) => {
    if (showAns || correctRows.includes(questionId)) return;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setShowResults(false);
  };

  const checkAnswers = () => {
    if (showAns || correctRows.length === EXERCISE_DATA.length) return;
    const allAnswered = EXERCISE_DATA.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all items first.");
      return;
    }

    const nextCorrectRows = [];
    const total = EXERCISE_DATA.length;
    EXERCISE_DATA.forEach((item) => {
      if (answers[item.id] === item.correctAnswer)
        nextCorrectRows.push(item.id);
    });
    const score = nextCorrectRows.length;
    setCorrectRows(nextCorrectRows);
    setShowResults(true);

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const correctAnswers = {};
    EXERCISE_DATA.forEach((item) => {
      correctAnswers[item.id] = item.correctAnswer;
    });
    setAnswers(correctAnswers);
    setShowResults(true);
    setShowAns(true);
    setCorrectRows(EXERCISE_DATA.map((item) => item.id));
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setCorrectRows([]);
    stopAudio();
  };

  /* ── helpers ── */
  const isWrong = (item) =>
    showResults &&
    !showAns &&
    answers[item.id] &&
    answers[item.id] !== item.correctAnswer;

  const getCheckColor = (item) => (isWrong(item) ? "#ef4444" : ACTIVE_COLOR);

  const renderMark = (item, optionValue) => {
    if (answers[item.id] !== optionValue) return null;
    return (
      <span style={{ ...styles.checkMark, color: getCheckColor(item) }}>
        <img src={trueIcon} alt="" style={{ height: "30px" }} />
      </span>
    );
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "45px" }}>
        <ExerciseHeader
          sectionLetter="A"
          title={<>Read and write <span className="text-red-600">✓</span>.</>}
          subTitle="Read each comparison statement carefully, use the picture or sentence evidence to check it, then choose the correct True or False response."
        />

        <div style={styles.wrapper}>
          <div style={styles.table}>
            {/* Header */}
            <div style={styles.headerRow}>
              <div style={styles.headerCell}></div>
              <div
                style={{
                  ...styles.headerCell,
                  borderLeft: `1.5px solid ${BORDER_COLOR}`,
                }}
              >
                True
              </div>
              <div
                style={{
                  ...styles.headerCell,
                  borderLeft: `1.5px solid ${BORDER_COLOR}`,
                }}
              >
                False
              </div>
            </div>

            {/* Rows */}
            {EXERCISE_DATA.map((item, index) => (
              <div
                key={item.id}
                style={{
                  ...styles.bodyRow,
                  borderBottom:
                    index === EXERCISE_DATA.length - 1
                      ? "none"
                      : `1.5px solid ${BORDER_COLOR}`,
                  background: "transparent",
                  transition: "background 0.2s",
                }}
              >
                {/* Sentence */}
                <div style={styles.sentenceCell}>
                  <span style={styles.number}>{item.id}</span>
                  <button
                    type="button"
                    className="wb-unit1-audio-control wb-unit1-interactive"
                    onClick={(event) => {
                      event.stopPropagation();
                      playAudio(`sentence-${item.id}`, item.audio);
                    }}
                    style={{
                      ...styles.sentenceText,
                      border: 0,
                      background: "transparent",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    {item.text}
                    <WorkbookUnit1PlayingAudioIcon
                      active={activeAudioKey === `sentence-${item.id}`}
                    />
                  </button>

                  {/* ✗ badge */}
                  {isWrong(item) && (
                    <span
                      style={{
                        marginLeft: "auto",
                        flexShrink: 0,
                        background: "red",
                        color: "#fff",
                        border: "2px solid #fff ",
                        borderRadius: "50%",
                        width: "clamp(18px,2vw,26px)",
                        height: "clamp(18px,2vw,26px)",
                        fontSize: "clamp(11px,1.2vw,15px)",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 1px 5px rgba(0,0,0,0.18)",
                      }}
                    >
                      ✕
                    </span>
                  )}
                </div>

                {/* True cell */}
                <div
                  role="button"
                  tabIndex={correctRows.includes(item.id) || showAns ? -1 : 0}
                  onClick={(event) => {
                    event.stopPropagation();
                    playAudio(`choice-${item.id}-true`, trueAudio);
                    handleSelect(item.id, "true");
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      playAudio(`choice-${item.id}-true`, trueAudio);
                      handleSelect(item.id, "true");
                    }
                  }}
                  style={{
                    ...styles.optionCell,
                    cursor: showAns ? "default" : "pointer",
                  }}
                >
                  {renderMark(item, "true")}
                  <WorkbookUnit1PlayingAudioIcon
                    active={activeAudioKey === `choice-${item.id}-true`}
                  />
                </div>

                {/* False cell */}
                <div
                  role="button"
                  tabIndex={correctRows.includes(item.id) || showAns ? -1 : 0}
                  onClick={(event) => {
                    event.stopPropagation();
                    playAudio(`choice-${item.id}-false`, falseAudio);
                    handleSelect(item.id, "false");
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      playAudio(`choice-${item.id}-false`, falseAudio);
                      handleSelect(item.id, "false");
                    }
                  }}
                  style={{
                    ...styles.optionCell,
                    cursor: showAns ? "default" : "pointer",
                  }}
                >
                  {renderMark(item, "false")}
                  <WorkbookUnit1PlayingAudioIcon
                    active={activeAudioKey === `choice-${item.id}-false`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.buttonsWrap}>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
            checkDisabled={
              showAns || correctRows.length === EXERCISE_DATA.length
            }
          />
        </div>
      </div>
    </div>
  );
};

export default WB_TrueFalse_Table;
