import React, { useMemo, useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "./Unit4PlayingAudioIcon";
import useUnit4Audio from "./useUnit4Audio";
import "./unit4Interactions.css";
import weatherAudio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise E/Item_002_weather.mp3";
import theAudio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise E/Item_003_the.mp3";
import likeAudio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise E/Item_004_like.mp3";
import winterAudio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise E/Item_005_winter.mp3";
import whatsAudio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise E/Item_006_What's.mp3";
import inAudio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise E/Item_007_in.mp3";
import itsAudio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise E/Item_008_It's.mp3";
import summerAudio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise E/Item_010_summer.mp3";
import autumnAudio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise E/Item_012_autumn.mp3";
import prompt1Audio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise E/Item_001_weather_what's_winter_in_like_the.mp3";
import prompt2Audio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise E/Item_009_like_summer_the_what's_in_weather.mp3";
import prompt3Audio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise E/Item_011_the_in_weather_like_what's_autumn.mp3";

const WORD_AUDIO = { weather: weatherAudio, the: theAudio, like: likeAudio, winter: winterAudio, "What’s": whatsAudio, in: inAudio, "It's": itsAudio, summer: summerAudio, autumn: autumnAudio };
const PROMPT_AUDIO = { 1: prompt1Audio, 2: prompt2Audio, 3: prompt3Audio };

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ITEMS = [
  {
    id: 1,
    prompt: "weather what’s winter in like the?",
    words: ["What’s", "the", "weather", "like", "in", "winter", "?"],
    season: "cold",
  },
  {
    id: 2,
    prompt: "like summer the what’s in weather?",
    words: ["What’s", "the", "weather", "like", "in", "summer", "?"],
    season: "hot",
  },

  {
    id: 3,
    prompt: "the in weather like what’s autumn?",
    words: ["What’s", "the", "weather", "like", "in", "autumn", "?"],
    season: "cool",
  },
  {
    id: 4,
    prompt: "in what’s spring weather the",
    words: ["What’s", "the", "weather", "like", "in", "spring", "?"],
    season: "warm",
  },
];

const WEATHER_OPTIONS = ["cool", "hot", "cold", "warm"];

export default function Unit4_Page6_Q2() {
  const [answers, setAnswers] = useState({});
  const [showAns, setShowAns] = useState(false);
  const [wordBanksSeed, setWordBanksSeed] = useState(0);
  const [seasonAnswers, setSeasonAnswers] = useState({});
  const [lockedSentences, setLockedSentences] = useState([]);
  const [lockedSeasons, setLockedSeasons] = useState([]);
  const [wrongSentences, setWrongSentences] = useState([]);
  const [wrongSeasons, setWrongSeasons] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const shuffledBanks = useMemo(() => {
    void wordBanksSeed;
    const banks = {};
    ITEMS.forEach((item) => {
      banks[item.id] = shuffleArray(item.words);
    });
    return banks;
  }, [wordBanksSeed]);

  const handleSelectWord = (itemId, wordIndex) => {
    if (showAns || lockedSentences.includes(itemId)) return;

    const currentAnswer = answers[itemId] || [];
    const selectedWord = shuffledBanks[itemId][wordIndex];

    if (!selectedWord) return;

    setAnswers((prev) => ({
      ...prev,
      [itemId]: [...currentAnswer, selectedWord],
    }));
    setWrongSentences((previous) => previous.filter((id) => id !== itemId));
  };

  const handleRemoveWord = (itemId, answerIndex) => {
    if (showAns || lockedSentences.includes(itemId)) return;

    const currentAnswer = [...(answers[itemId] || [])];
    currentAnswer.splice(answerIndex, 1);

    setAnswers((prev) => ({
      ...prev,
      [itemId]: currentAnswer,
    }));
    setWrongSentences((previous) => previous.filter((id) => id !== itemId));
  };
  const getVisibleBankWords = (item) => {
    const chosenWords = answers[item.id] || [];
    const tempChosen = [...chosenWords];

    return shuffledBanks[item.id].map((word) => {
      const foundIndex = tempChosen.indexOf(word);

      if (foundIndex !== -1) {
        tempChosen.splice(foundIndex, 1);

        return {
          word,
          disabled: true,
        };
      }

      return {
        word,
        disabled: false,
      };
    });
  };

  const isSentenceComplete = (item) => {
    return (answers[item.id] || []).length === item.words.length;
  };

  const isSentenceCorrect = (item) => {
    return (answers[item.id] || []).join(" ") === item.words.join(" ");
  };

  const handleCheck = () => {
    if (showAns || (lockedSentences.length === ITEMS.length && lockedSeasons.length === ITEMS.length)) return;

    const allCompleted = ITEMS.every(
      (item) => isSentenceComplete(item) && seasonAnswers[item.id],
    );

    if (!allCompleted) {
      ValidationAlert.info("Please complete all sentences first.");
      return;
    }

    let score = 0;
    const total = ITEMS.length * 2;

    ITEMS.forEach((item) => {
      // sentence
      if (isSentenceCorrect(item)) {
        score++;
      }

      // dropdown
      if (seasonAnswers[item.id] === item.season) {
        score++;
      }
    });

    setLockedSentences(ITEMS.flatMap((item) => isSentenceCorrect(item) ? [item.id] : []));
    setLockedSeasons(ITEMS.flatMap((item) => seasonAnswers[item.id] === item.season ? [item.id] : []));
    setWrongSentences(ITEMS.flatMap((item) => !isSentenceCorrect(item) ? [item.id] : []));
    setWrongSeasons(ITEMS.flatMap((item) => seasonAnswers[item.id] !== item.season ? [item.id] : []));

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const solved = {};
    const solvedSeasons = {};

    ITEMS.forEach((item) => {
      solved[item.id] = [...item.words];
      solvedSeasons[item.id] = item.season;
    });

    setAnswers(solved);
    setSeasonAnswers(solvedSeasons);

    setShowAns(true);
    setLockedSentences(ITEMS.map((item) => item.id)); setLockedSeasons(ITEMS.map((item) => item.id));
    setWrongSentences([]); setWrongSeasons([]); stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setSeasonAnswers({});
    setShowAns(false);
    setLockedSentences([]); setLockedSeasons([]); setWrongSentences([]); setWrongSeasons([]); stopAudio();
    setWordBanksSeed((prev) => prev + 1);
  };
  const handleSeasonChange = (itemId, value) => {
    if (showAns || lockedSeasons.includes(itemId)) return;
    setSeasonAnswers((prev) => ({
      ...prev,
      [itemId]: value,
    }));
    setWrongSeasons((previous) => previous.filter((id) => id !== itemId));
  };
  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        <ExerciseHeader sectionLetter="E" title="Look, unscramble, and answer. Use the words below." subTitle="Say the complete answer first, then arrange the word tiles in sentence order and add punctuation." />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => {
            const builtWords = answers[item.id] || [];
            const visibleWords = getVisibleBankWords(item);
            const sentenceWrong = wrongSentences.includes(item.id);
            const seasonWrong = wrongSeasons.includes(item.id);

            return (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "12px 14px",
                  border: "1px solid #f39b42",
                  borderRadius: "14px",
                  backgroundColor: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#111",
                      minWidth: "20px",
                    }}
                  >
                    {item.id}
                  </span>

                  <span
                    role={PROMPT_AUDIO[item.id] ? "button" : undefined}
                    tabIndex={PROMPT_AUDIO[item.id] ? 0 : -1}
                    className={PROMPT_AUDIO[item.id] ? "unit4-audio-control unit4-interactive" : undefined}
                    onClick={() => PROMPT_AUDIO[item.id] && playAudio(`prompt-${item.id}`, PROMPT_AUDIO[item.id])}
                    onKeyDown={(event) => { if (PROMPT_AUDIO[item.id] && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); playAudio(`prompt-${item.id}`, PROMPT_AUDIO[item.id]); } }}
                    style={{
                      fontSize: "18px",
                      color: "#444",
                      lineHeight: "1.5",
                    }}
                  >
                    <Unit4PlayingAudioIcon active={activeAudioKey === `prompt-${item.id}`} />
                    {item.prompt}
                  </span>
                </div>

                {/* built answer */}
                <div
                  style={{
                    minHeight: "52px",
                    borderBottom: sentenceWrong
                      ? "2px solid red"
                      : "1px solid  #8f8f8f",
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    // gap: "8px",
                    // paddingBottom: "6px",
                  }}
                >
                  {builtWords.map((word, index) => (
                    <button
                      key={`${item.id}-built-${index}-${word}`}
                      onClick={() => handleRemoveWord(item.id, index)}
                      style={{
                        padding: "5px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "18px",
                        // fontWeight: "500",
                        cursor: showAns || lockedSentences.includes(item.id) ? "default" : "pointer",
                      }}
                      className={`${!showAns && !lockedSentences.includes(item.id) && "hover:text-red-500"}`}
                    >
                      {word}
                    </button>
                  ))}
                </div>

                {/* word bank */}
                {/* word bank */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {visibleWords.map((wordItem, index) => (
                    <button
                      key={`${item.id}-bank-${index}-${wordItem.word}`}
                      aria-disabled={wordItem.disabled || lockedSentences.includes(item.id)}
                      className="unit4-audio-control"
                      onClick={() => {
                        const audio = WORD_AUDIO[wordItem.word];
                        if (audio) playAudio(`word-${item.id}-${index}`, audio);
                        if (!wordItem.disabled) handleSelectWord(item.id, index);
                      }}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",

                        backgroundColor: wordItem.disabled
                          ? "#d1d5db"
                          : "#f8fafc",

                        color: wordItem.disabled ? "#535353ff" : "#111827",

                        opacity: wordItem.disabled ? 0.6 : 1,

                        fontSize: "15px",
                        fontWeight: "500",

                        cursor:
                          showAns || wordItem.disabled
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      <Unit4PlayingAudioIcon active={activeAudioKey === `word-${item.id}-${index}`} />
                      {wordItem.word}
                    </button>
                  ))}
                </div>

                {sentenceWrong && (
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

                {/* season answer */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "8px",
                  }}
                >
                  <span
                    role="button"
                    tabIndex={0}
                    className="unit4-audio-control unit4-interactive"
                    onClick={() => playAudio(`its-${item.id}`, itsAudio)}
                    onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); playAudio(`its-${item.id}`, itsAudio); } }}
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    <Unit4PlayingAudioIcon active={activeAudioKey === `its-${item.id}`} />
                    It's
                  </span>

                  <select
                    value={seasonAnswers[item.id] || ""}
                    onChange={(e) =>
                      handleSeasonChange(item.id, e.target.value)
                    }
                    disabled={showAns || lockedSeasons.includes(item.id)}
                    style={{
                      padding: "8px 12px",
                      // borderRadius: "8px",
                      borderBottom: seasonWrong
                        ? "2px solid red"
                        : "1px solid  #8f8f8f",
                      fontSize: "15px",
                      minWidth: "120px",
                      background: "#fff",
                      cursor: showAns || lockedSeasons.includes(item.id) ? "default" : "pointer",
                    }}
                  >
                    <option value="">Select</option>

                    {WEATHER_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {seasonWrong && <span aria-hidden="true" style={{ width: 22, height: 22, borderRadius: "50%", background: "red", color: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>✕</span>}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}
