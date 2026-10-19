import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit3PlayingAudioIcon from "./WorkbookUnit3PlayingAudioIcon";
import useWorkbookUnit3Audio from "./useWorkbookUnit3Audio";
import "./workbookUnit3Interactions.css";
import passageAudio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise F/Item_001_Stella,_Helen,_and_Sarah_are_at_a_picnic_in_the_park._Stella_has_brought.mp3";
import question1Audio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise F/Item_002_Does_Stella_have_any.mp3";
import chipsAudio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise F/Item_003_chips.mp3";
import fruitAudio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise F/Item_004_fruit.mp3";
import cookiesAudio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise F/Item_005_cookies.mp3";
import yesAudio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise F/Item_006_Yes.mp3";
import question2Audio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise F/Item_007_Does_Sarah_have_any.mp3";
import peachesAudio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise F/Item_008_peaches.mp3";
import sandwichesAudio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise F/Item_009_sandwiches.mp3";
import question3Audio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise F/Item_010_Does_Helen_have_any.mp3";
import applesAudio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise F/Item_011_apples.mp3";

const QUESTION_AUDIO = {
  1: question1Audio,
  2: question2Audio,
  3: question3Audio,
};
const OPTION_AUDIO = {
  "chips?": chipsAudio,
  "fruit?": fruitAudio,
  "cookies?": cookiesAudio,
  "peaches?": peachesAudio,
  "sandwiches?": sandwichesAudio,
  "apples?": applesAudio,
};

const ACTIVE_COLOR = "#f39b42";
const WRONG_COLOR = "red";

const PASSAGE =
  "Stella, Helen, and Sarah are at a picnic in the park. Stella has brought fruit like apples and peaches. Helen has peanut butter sandwiches. Sarah has brought cookies and chips.";

const QUESTIONS = [
  {
    id: 1,
    text: "Does Stella have any ...",
    options: ["chips?", "fruit?", "cookies?"],
    correctOption: "fruit?",
    correctPronoun: "she has some",
  },
  {
    id: 2,
    text: "Does Sarah have any ...",
    options: ["cookies?", "peaches?", "sandwiches?"],
    correctOption: "cookies?",
    correctPronoun: "she has some",
  },
  {
    id: 3,
    text: "Does Helen have any ...",
    options: ["apples?", "sandwiches?", "chips?"],
    correctOption: "sandwiches?",
    correctPronoun: "she has some",
  },
];

export default function WB_Unit3_Page17_QF() {
  const [answers, setAnswers] = useState({});
  const [pronouns, setPronouns] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedKeys, setLockedKeys] = useState([]);
  const [wrongKeys, setWrongKeys] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit3Audio();

  const handleSelectOption = (id, value) => {
    if (showAns || lockedKeys.includes(`option-${id}`)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
    setWrongKeys((prev) => prev.filter((entry) => entry !== `option-${id}`));
  };

  const handlePronounChange = (id, value) => {
    if (showAns || lockedKeys.includes(`pronoun-${id}`)) return;

    setPronouns((prev) => ({
      ...prev,
      [id]: value,
    }));
    setWrongKeys((prev) => prev.filter((entry) => entry !== `pronoun-${id}`));
  };

  const checkAnswers = () => {
    if (showAns || lockedKeys.length === QUESTIONS.length * 2) return;

    const allAnswered = QUESTIONS.every((q) => answers[q.id] && pronouns[q.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = QUESTIONS.length * 2;

    QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctOption) score++;
      if (pronouns[q.id] === q.correctPronoun) score++;
    });

    setShowResults(true);
    setLockedKeys(
      QUESTIONS.flatMap((q) => [
        ...(answers[q.id] === q.correctOption ? [`option-${q.id}`] : []),
        ...(pronouns[q.id] === q.correctPronoun ? [`pronoun-${q.id}`] : []),
      ]),
    );
    setWrongKeys(
      QUESTIONS.flatMap((q) => [
        ...(answers[q.id] !== q.correctOption ? [`option-${q.id}`] : []),
        ...(pronouns[q.id] !== q.correctPronoun ? [`pronoun-${q.id}`] : []),
      ]),
    );

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const correctAnswers = {};
    const correctPronouns = {};

    QUESTIONS.forEach((q) => {
      correctAnswers[q.id] = q.correctOption;
      correctPronouns[q.id] = q.correctPronoun;
    });

    setAnswers(correctAnswers);
    setPronouns(correctPronouns);
    setShowResults(true);
    setShowAns(true);
    setLockedKeys(
      QUESTIONS.flatMap((q) => [`option-${q.id}`, `pronoun-${q.id}`]),
    );
    setWrongKeys([]);
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setPronouns({});
    setShowResults(false);
    setShowAns(false);
    setLockedKeys([]);
    setWrongKeys([]);
    stopAudio();
  };

  const isRowWrong = (q) => {
    return wrongKeys.includes(`pronoun-${q.id}`);
  };

  const renderOption = (q, option) => {
    const selected = answers[q.id] === option;
    const wrong = wrongKeys.includes(`option-${q.id}`) && selected;

    return (
      <div
        className="wb-unit3-audio-control wb-unit3-interactive"
        role="button"
        tabIndex={lockedKeys.includes(`option-${q.id}`) ? -1 : 0}
        aria-disabled={lockedKeys.includes(`option-${q.id}`)}
        onClick={() => {
          if (lockedKeys.includes(`option-${q.id}`)) return;
          handleSelectOption(q.id, option);
          playAudio(`option-${q.id}-${option}`, OPTION_AUDIO[option]);
        }}
        onKeyDown={(event) => {
          if (
            (event.key === "Enter" || event.key === " ") &&
            !lockedKeys.includes(`option-${q.id}`)
          ) {
            event.preventDefault();
            handleSelectOption(q.id, option);
            playAudio(`option-${q.id}-${option}`, OPTION_AUDIO[option]);
          }
        }}
        style={{
          position: "relative",
          padding: "6px 16px",
          borderRadius: "999px",
          border: selected
            ? wrong
              ? `2px solid ${WRONG_COLOR}`
              : `1px solid ${ACTIVE_COLOR}`
            : "1px solid transparent",
          cursor: showAns ? "default" : "pointer",
          fontSize: "18px",
          transition: "0.2s ease",
          userSelect: "none",
          color: "#222",
        }}
      >
        <WorkbookUnit3PlayingAudioIcon
          active={activeAudioKey === `option-${q.id}-${option}`}
        />
        {option}

        {/* ✕ فوق الدائرة */}
        {wrong && (
          <div
            className="wb-unit3-audio-control wb-unit3-interactive"
            role="button"
            tabIndex={0}
            onClick={() => playAudio("passage", passageAudio)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                playAudio("passage", passageAudio);
              }
            }}
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "red",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: "700",
              border: "2px solid white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component mb-10">
      <div
        className="div-forall"
        style={{
          gap: "28px",
        }}
      >
        <ExerciseHeader
          sectionLetter="F"
          title="Read, circle, and answer."
          subTitle="Use the picnic paragraph evidence for each have-any question to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />
        <div className="flex flex-col gap-10">
          <div
            style={{
              fontSize: "18px",
              lineHeight: "1.6",
              color: "#444",
            }}
          >
            <WorkbookUnit3PlayingAudioIcon
              active={activeAudioKey === "passage"}
            />
            {PASSAGE}
          </div>

          {QUESTIONS.map((q) => (
            <div
              key={q.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                position: "relative",
                paddingRight: "30px",
              }}
            >
              <div
                className="wb-unit3-audio-control wb-unit3-interactive"
                role="button"
                tabIndex={0}
                onClick={() =>
                  playAudio(`question-${q.id}`, QUESTION_AUDIO[q.id])
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio(`question-${q.id}`, QUESTION_AUDIO[q.id]);
                  }
                }}
                style={{
                  fontSize: "18px",
                  color: "#000000ff",
                  // fontWeight: "500",
                }}
              >
                <WorkbookUnit3PlayingAudioIcon
                  active={activeAudioKey === `question-${q.id}`}
                />
                <span className="font-semibold text-[20px] mr-2">{q.id}</span>{" "}
                {q.text}
              </div>

              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {q.options.map((opt) => (
                  <React.Fragment key={opt}>
                    {renderOption(q, opt)}
                  </React.Fragment>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  position: "relative",
                  width: "100%",
                }}
              >
                <span
                  className="wb-unit3-audio-control wb-unit3-interactive"
                  role="button"
                  tabIndex={0}
                  onClick={() => playAudio(`yes-${q.id}`, yesAudio)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`yes-${q.id}`, yesAudio);
                    }
                  }}
                  style={{ fontSize: "18px", color: "#000000ff" }}
                >
                  <WorkbookUnit3PlayingAudioIcon
                    active={activeAudioKey === `yes-${q.id}`}
                  />
                  Yes,
                </span>

                <select
                  value={pronouns[q.id] || ""}
                  onChange={(e) => handlePronounChange(q.id, e.target.value)}
                  disabled={showAns || lockedKeys.includes(`pronoun-${q.id}`)}
                  style={{
                    fontSize: "18px",
                    borderBottom: isRowWrong(q)
                      ? "2px solid red"
                      : "1px solid #444",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    background: "transparent",
                    color: "#000000ff",
                    width: "70%",
                  }}
                >
                  <option value="">Select...</option>
                  <option value="he has some">he has some</option>
                  <option value="she has some">she has some</option>
                  <option value="he have some">he have some</option>
                  <option value="she have some">she have some</option>
                </select>

                {isRowWrong(q) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-7px",
                      right: "25%",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      backgroundColor: "red",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "700",
                      border: "2px solid white",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>

              {/* <div style={{ borderBottom: "1px solid #444", width: "100%" }} /> */}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            checkAnswers={checkAnswers}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
