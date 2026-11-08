import { useEffect as useCheckEffect, useRef as useCheckRef } from "react";
import missingAudio0 from "../../../assets/audio/missings/Where were they yesterday.mp3";
import missingAudio1 from "../../../assets/audio/missings/Where are they now.mp3";
import missingAudio2 from "../../../assets/audio/missings/They.mp3";
import missingAudio3 from "../../../assets/audio/missings/are at.mp3";
import missingAudio4 from "../../../assets/audio/missings/were at.mp3";
import missingAudio5 from "../../../assets/audio/missings/are in.mp3";
import missingAudio6 from "../../../assets/audio/missings/were in.mp3";
import missingAudio7 from "../../../assets/audio/missings/the train stop.mp3";
import missingAudio8 from "../../../assets/audio/missings/the airport.mp3";
import missingAudio9 from "../../../assets/audio/missings/work.mp3";
import missingAudio10 from "../../../assets/audio/missings/the clinic.mp3";
import missingAudio11 from "../../../assets/audio/missings/the library.mp3";
import missingAudio12 from "../../../assets/audio/missings/the bus stop.mp3";
import missingAudio13 from "../../../assets/audio/missings/the theater.mp3";
import missingAudio14 from "../../../assets/audio/missings/the bakery.mp3";
import missingAudio15 from "../../../assets/audio/missings/Yesterday at the train station.mp3";
import missingAudio16 from "../../../assets/audio/missings/Now at the airport.mp3";
import missingAudio17 from "../../../assets/audio/missings/Yesterday at work.mp3";
import missingAudio18 from "../../../assets/audio/missings/Now at the clinic.mp3";
import missingAudio19 from "../../../assets/audio/missings/Yesterday in the library.mp3";
import missingAudio20 from "../../../assets/audio/missings/Now at the bus stop.mp3";
import missingAudio21 from "../../../assets/audio/missings/Yesterday at the theater.mp3";
import missingAudio22 from "../../../assets/audio/missings/Now at the bakery.mp3";
import { useCallback, useEffect, useRef } from "react";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";
import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex D 2.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex D 3.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex D 4.svg";
import ExerciseHeader from "../../ExerciseHeader";

function useNativeCheck(disabled) {
  const root = useCheckRef(null);
  useCheckEffect(() => {
    const button = root.current?.querySelector(".check-button2");
    if (!button) return;
    button.disabled = disabled;
    button.style.cursor = disabled ? "not-allowed" : "";
    button.setAttribute("aria-disabled", String(disabled));
  }, [disabled]);
  return root;
}



























const MISSING_AUDIO = {
  "Where were they yesterday": missingAudio0,
  "Where are they now": missingAudio1,
  "They": missingAudio2,
  "are at": missingAudio3,
  "were at": missingAudio4,
  "are in": missingAudio5,
  "were in": missingAudio6,
  "the train stop": missingAudio7,
  "the airport": missingAudio8,
  "work": missingAudio9,
  "the clinic": missingAudio10,
  "the library": missingAudio11,
  "the bus stop": missingAudio12,
  "the theater": missingAudio13,
  "the bakery": missingAudio14
};
const SCENE_AUDIO = {
  1: [missingAudio15, missingAudio16],
  2: [missingAudio17, missingAudio18],
  3: [missingAudio19, missingAudio20],
  4: [missingAudio21, missingAudio22],
};









function useReadingAudio() {
  const current = useRef(null), generation = useRef(0);
  const [activeAudioKey, setActiveAudioKey] = useState(null);
  const stopAudio = useCallback(() => {
    generation.current += 1;
    if (current.current) {
      current.current.pause();
      current.current.onended = null;
      current.current.onerror = null;
      current.current = null;
    }
    setActiveAudioKey(null);
  }, []);
  const playAudio = useCallback((key, sources) => {
    stopAudio();
    const tracks = (Array.isArray(sources) ? sources : [sources]).filter(Boolean);
    if (!tracks.length) return;
    const token = generation.current;
    setActiveAudioKey(key);
    const next = (index) => {
      if (token !== generation.current) return;
      if (index === tracks.length) { current.current = null; setActiveAudioKey(null); return; }
      const audio = new Audio(tracks[index]);
      current.current = audio;
      let settled = false;
      const finish = (failed = false) => {
        if (settled || token !== generation.current || current.current !== audio) return;
        settled = true;
        if (failed) { current.current = null; setActiveAudioKey(null); }
        else next(index + 1);
      };
      audio.onended = () => finish();
      audio.onerror = () => finish(true);
      audio.play().catch(() => finish(true));
    };
    next(0);
  }, [stopAudio]);
  useEffect(() => stopAudio, [stopAudio]);
  return { activeAudioKey, playAudio, stopAudio };
}

const Unit9_Page6_Q1 = () => {
  const { activeAudioKey, playAudio, stopAudio } = useReadingAudio();
  const hearProps = (key, sources, label) => ({
    role: "button", tabIndex: 0, "aria-label": label,
    className: "unit4-audio-control unit4-interactive",
    onClick: () => playAudio(key, sources),
    onKeyDown: (event) => {
      if (!["Enter", " "].includes(event.key)) return;
      event.preventDefault(); event.stopPropagation();
      if (!event.repeat) playAudio(key, sources);
    },
    onKeyUp: (event) => { if (["Enter", " "].includes(event.key)) event.stopPropagation(); },
  });
  const [userAnswers, setUserAnswers] = useState({});
  const [lockedFields, setLockedFields] = useState([]);
  const [wrongFields, setWrongFields] = useState([]);
  const [showAns, setShowAns] = useState(false);

  const questions = [
    {
      id: 1,
      image: img1,
      imageAlt:
        "Yesterday, two people are at the train station. Now, they are at the airport.",
      sentence: "Where were they yesterday?",
      word1: ["the train stop", "the airport"],
      word2: ["are at", "were at", "are in", "were in"],
    },
    {
      id: 2,
      image: img2,
      imageAlt:
        "Yesterday, two people are at the theater. Now, they are at the bakery.",
      sentence: "Where are they now?",
      word1: ["work", "the clinic"],
      word2: ["are at", "were at", "are in", "were in"],
    },
    {
      id: 3,
      image: img3,
      imageAlt:
        "Yesterday, two people are at work. Now, they are at the clinic.",
      sentence: "Where are they now?",
      word1: ["the library", "the bus stop"],
      word2: ["are at", "were at", "are in", "were in"],
    },
    {
      id: 4,
      image: img4,
      imageAlt:
        "Yesterday, two people are in the library. Now, they are at the bus stop.",
      sentence: "Where were they yesterday?",
      word1: ["the theater", "the bakery"],
      word2: ["are at", "were at", "are in", "were in"],
    },
  ];
  const correctAnswers = {
    1: { word1: "the train stop", word2: "were at" },
    2: { word1: "the clinic", word2: "are at" },
    3: { word1: "the bus stop", word2: "are at" },
    4: { word1: "the theater", word2: "were at" },
  };
  const handleChange = (id, field, value) => {
    const key = `${id}-${field}`;
    if (showAns || lockedFields.includes(key)) return;
    playAudio(`answer-${key}`, MISSING_AUDIO[value]);

    setUserAnswers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
    setWrongFields((previous) => previous.filter((item) => item !== key));
  };
  const showAnswer = () => {
    stopAudio();
    setUserAnswers(correctAnswers);
    setLockedFields(
      questions.flatMap((question) => [
        `${question.id}-word1`,
        `${question.id}-word2`,
      ]),
    );
    setWrongFields([]);
    setShowAns(true);
  };
  const checkAnswers = () => {
    stopAudio();
    if (showAns || lockedFields.length === questions.length * 2) return;

    // ✅ التحقق إذا في فراغ
    const empty = questions.some(
      (q) => !userAnswers[q.id]?.word1 || !userAnswers[q.id]?.word2,
    );

    if (empty) {
      ValidationAlert.info();
      return;
    }

    const nextLockedFields = [];
    const nextWrongFields = [];
    Object.keys(correctAnswers).forEach((id) => {
      ["word1", "word2"].forEach((field) => {
        const key = `${id}-${field}`;
        if (userAnswers[id]?.[field] === correctAnswers[id][field])
          nextLockedFields.push(key);
        else nextWrongFields.push(key);
      });
    });
    const score = nextLockedFields.length;

    const total = Object.keys(correctAnswers).length * 2; // = 8

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    setLockedFields(nextLockedFields);
    setWrongFields(nextWrongFields);

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };
  const handleStartAgain = () => {
    stopAudio();
    setUserAnswers({});
    setLockedFields([]);
    setWrongFields([]);
    setShowAns(false);
  };

  const exerciseRoot = useNativeCheck(showAns || lockedFields.length === questions.length * 2);

  return (
    <div ref={exerciseRoot}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{
          gap: "10px",
        }}
      >
        <ExerciseHeader
          sectionLetter="D"
          title="Read and answer the questions."
          subTitle="Look at the pictures, read each question, and choose the correct words to complete the answer."
        />
        <div
          className="w-full"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",

              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* الأسئلة بالصور */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
              }}
            >
              {questions.map((q) => (
                <div
                  key={q.id}
                  style={{
                    padding: "12px",
                    position: "relative",
                  }}
                >
                  <div className="flex gap-2">
                    <span
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        zIndex: 2,
                      }}
                    >
                      {q.id}
                    </span>
                    <span {...hearProps(`scene-${q.id}`, SCENE_AUDIO[q.id], "Hear yesterday and now for picture " + q.id)} style={{ position: "relative", display: "inline-flex", borderRadius: 4 }}>
                    <img
                      src={q.image}
                      alt={q.imageAlt}
                      style={{
                        width: "280px",
                        height: "auto",
                        objectFit: "contain",
                        marginTop: "10px",
                      }}
                    />
                    <Unit4PlayingAudioIcon active={activeAudioKey === `scene-${q.id}`} />
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: "8px",
                      // fontWeight: "500",
                      marginBottom: 15,
                    }}
                  >
                    <span {...hearProps(`question-${q.id}`, MISSING_AUDIO[q.sentence.replace(/\?$/, "")], q.sentence)} style={{ position: "relative", borderRadius: 4 }}><Unit4PlayingAudioIcon active={activeAudioKey === `question-${q.id}`} />{q.sentence}</span>
                  </div>

                  <div
                    style={{
                      marginTop: "5px",
                      borderBottom: "1px solid black",
                      paddingBottom: "3px",
                      width: "70%",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "6px",
                      fontSize: "16px",
                    }}
                  >
                    <span {...hearProps(`they-${q.id}`, MISSING_AUDIO.They, "Hear They")} style={{ position: "relative", borderRadius: 4 }}><Unit4PlayingAudioIcon active={activeAudioKey === `they-${q.id}`} />They</span>
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <select
                        aria-label={`Question ${q.id}: verb and preposition`}
                        value={userAnswers[q.id]?.word2 || ""}
                        onChange={(e) =>
                          handleChange(q.id, "word2", e.target.value)
                        }
                        disabled={
                          showAns || lockedFields.includes(`${q.id}-word2`)
                        }
                        style={{
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",

                          border: "none",
                          borderBottom: wrongFields.includes(`${q.id}-word2`)
                            ? "2px solid red"
                            : "1px solid transparent",
                          backgroundColor: "transparent",

                          fontSize: "inherit",
                          fontWeight: "600",
                          // color: userAnswers[q.id]?.word2 ? "#1e3a8a" : "#aaa",

                          padding: "2px 18px 2px 4px",
                          minWidth: "90px",
                          // outline: "none",
                          cursor:
                            showAns || lockedFields.includes(`${q.id}-word2`)
                              ? "default"
                              : "pointer",
                        }}
                      >
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {q.word2.map((w, i) => (
                          <option key={i} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                      <Unit4PlayingAudioIcon active={activeAudioKey === `answer-${q.id}-word2`} />
                      {wrongFields.includes(`${q.id}-word2`) && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-6px",
                            right: "-6px",
                            transform: "translateY(-50%)",
                            width: "22px",
                            height: "22px",
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            border: "2px solid white",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            pointerEvents: "none",
                          }}
                        >
                          ✕
                        </div>
                      )}
                      <span
                        style={{
                          position: "absolute",
                          right: "4px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                          fontSize: "18px",
                          // color: "#666",
                        }}
                      >
                        ▾
                      </span>
                    </div>
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <select
                        aria-label={`Question ${q.id}: place`}
                        value={userAnswers[q.id]?.word1 || ""}
                        onChange={(e) =>
                          handleChange(q.id, "word1", e.target.value)
                        }
                        disabled={
                          showAns || lockedFields.includes(`${q.id}-word1`)
                        }
                        style={{
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",

                          border: "none",
                          borderBottom: wrongFields.includes(`${q.id}-word1`)
                            ? "2px solid red"
                            : "1px dashed transparent",
                          backgroundColor: "transparent",

                          fontSize: "inherit",
                          fontWeight: "600",
                          // color: userAnswers[q.id]?.word1 ? "#1e3a8a" : "#aaa",
                          // outline: "none",
                          padding: "2px 18px 2px 4px",
                          minWidth: "90px",

                          cursor:
                            showAns || lockedFields.includes(`${q.id}-word1`)
                              ? "default"
                              : "pointer",
                        }}
                      >
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {q.word1.map((w, i) => (
                          <option key={i} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                      <Unit4PlayingAudioIcon active={activeAudioKey === `answer-${q.id}-word1`} />
                      {wrongFields.includes(`${q.id}-word1`) && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-6px",
                            right: "-6px",
                            transform: "translateY(-50%)",
                            width: "22px",
                            height: "22px",
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            border: "2px solid white",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            pointerEvents: "none",
                          }}
                        >
                          ✕
                        </div>
                      )}
                      <span
                        style={{
                          position: "absolute",
                          right: "4px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                          fontSize: "18px",
                          // color: "#666",
                        }}
                      >
                        ▾
                      </span>
                    </div>
                    .
                  </div>
                </div>
              ))}
            </div>
            <Button
              handleShowAnswer={showAnswer}
              handleStartAgain={handleStartAgain}
              checkAnswers={checkAnswers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unit9_Page6_Q1;
