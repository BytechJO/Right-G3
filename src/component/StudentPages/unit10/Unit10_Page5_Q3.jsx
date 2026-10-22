import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Asset 64.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Asset 66.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Asset 65.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Asset 67.svg";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";
import heAudio from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise B/Item_001_He.mp3";
import sheAudio from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise B/Item_002_She.mp3";
import full1 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise B/full1.mp3";
import full2 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise B/full2.mp3";
import full3 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise B/full3.mp3";
import full4 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise B/full4.mp3";

const fullAudio = [full1, full2, full3, full4];

const Unit10_Page5_Q3 = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [revealed, setRevealed] = useState(false);

  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const actions = [
    "watch a movie",
    "read a book",
    "ride a bike",
    "plant flowers",
  ];

  const questions = [
    {
      id: 1,
      image: img1,
      word1: actions,
      word2: ["will", "won’t"],
    },
    {
      id: 2,
      image: img2,
      word1: actions,
      word2: ["will", "won’t"],
    },
    {
      id: 3,
      image: img3,
      word1: actions,
      word2: ["will", "won’t"],
    },
    {
      id: 4,
      image: img4,
      word1: actions,
      word2: ["will", "won’t"],
    },
  ];
  const correctAnswers = {
    1: { word1: "watch a movie", word2: "will" },
    2: { word1: "read a book", word2: "won’t" },
    3: { word1: "ride a bike", word2: "won’t" },
    4: { word1: "plant flowers", word2: "will" },
  };
  const isWordUsedInAnotherQuestion = (currentQuestionId, word) => {
    return Object.entries(userAnswers).some(
      ([id, answer]) =>
        Number(id) !== currentQuestionId && answer?.word1 === word,
    );
  };
  const handleChange = (id, field, value) => {
    if (revealed || lockedIds.includes(id)) return;

    setUserAnswers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
    setWrongIds((previous) =>
      previous.filter((questionId) => questionId !== id),
    );
  };
  const showAnswer = () => {
    setUserAnswers(correctAnswers);
    setLockedIds(questions.map((q) => q.id));
    setRevealed(true);
    setWrongIds([]);
    stopAudio();
  };
  const checkAnswers = () => {
    if (revealed || lockedIds.length === questions.length) return;

    // ✅ التحقق إذا في فراغ
    const empty = questions.some(
      (q) => !userAnswers[q.id]?.word1 || !userAnswers[q.id]?.word2,
    );

    if (empty) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    Object.keys(correctAnswers).forEach((id) => {
      // ✅ أول select
      if (userAnswers[id]?.word2 === correctAnswers[id].word2) {
        score += 1;
      }

      // ✅ ثاني select
      if (userAnswers[id]?.word1 === correctAnswers[id].word1) {
        score += 1;
      }
    });

    const total = Object.keys(correctAnswers).length * 2; // = 8

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    setWrongIds(
      questions.flatMap((q) =>
        userAnswers[q.id]?.word1 !== correctAnswers[q.id].word1 ||
        userAnswers[q.id]?.word2 !== correctAnswers[q.id].word2
          ? [q.id]
          : [],
      ),
    );
    setLockedIds(
      questions.flatMap((q) =>
        userAnswers[q.id]?.word1 === correctAnswers[q.id].word1 &&
        userAnswers[q.id]?.word2 === correctAnswers[q.id].word2
          ? [q.id]
          : [],
      ),
    );

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };
  const handleStartAgain = () => {
    setUserAnswers({});
    setWrongIds([]);
    setLockedIds([]);
    setRevealed(false);
    stopAudio();
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
          sectionLetter="B"
          title="Look and write."
          subTitle="Use each picture clue to write the correct future sentence with will or won't."
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
                rowGap: "45px",
                columnGap: "20px",
              }}
            >
              {questions.map((q) => (
                <div
                  key={q.id}
                  role={lockedIds.includes(q.id) ? "button" : undefined}
                  tabIndex={lockedIds.includes(q.id) ? 0 : undefined}
                  className={
                    lockedIds.includes(q.id)
                      ? "unit4-audio-control unit4-full-audio-enabled"
                      : ""
                  }
                  onClick={() =>
                    lockedIds.includes(q.id) &&
                    playAudio(`full-${q.id}`, fullAudio[q.id - 1])
                  }
                  onKeyDown={(event) => {
                    if (
                      lockedIds.includes(q.id) &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      playAudio(`full-${q.id}`, fullAudio[q.id - 1]);
                    }
                  }}
                  style={{
                    padding: "12px",
                    position: "relative",
                  }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `full-${q.id}`}
                  />
                  <div className="flex gap-2">
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        zIndex: 2,
                      }}
                    >
                      {" "}
                      {q.id}
                    </span>
                    <img
                      src={q.image}
                      alt={
                        [
                          "A boy at the movie theater with a check mark.",
                          "A girl reading a book with an X mark.",
                          "A boy riding a bicycle with an X mark.",
                          "A girl planting flowers with a check mark.",
                        ][q.id - 1]
                      }
                      style={{
                        width: "150px",
                        height: "auto",
                        objectFit: "contain",
                        marginTop: "10px",
                        marginBottom: "20px",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      marginTop: "5px",
                      borderBottom: "1px solid black",
                      paddingBottom: "3px",
                      width: "80%",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "6px",
                      fontSize: "18px",
                    }}
                  >
                    <span
                      role="button"
                      tabIndex={lockedIds.includes(q.id) ? -1 : 0}
                      className="unit4-interactive unit4-audio-control"
                      onClick={(event) => {
                        if (!lockedIds.includes(q.id)) {
                          event.stopPropagation();
                          playAudio(
                            `pronoun-${q.id}`,
                            q.id === 1 || q.id === 3 ? heAudio : sheAudio,
                          );
                        }
                      }}
                      onKeyDown={(event) => {
                        if (
                          !lockedIds.includes(q.id) &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          event.stopPropagation();
                          playAudio(
                            `pronoun-${q.id}`,
                            q.id === 1 || q.id === 3 ? heAudio : sheAudio,
                          );
                        }
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `pronoun-${q.id}`}
                      />
                      {q.id === 1 || q.id === 3 ? "He" : "She"}
                    </span>
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <select
                        value={userAnswers[q.id]?.word2 || ""}
                        onChange={(e) =>
                          handleChange(q.id, "word2", e.target.value)
                        }
                        disabled={revealed || lockedIds.includes(q.id)}
                        onClick={(event) => event.stopPropagation()}
                        style={{
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",

                          border: "none",
                          borderBottom:
                            wrongIds.includes(q.id) &&
                            userAnswers[q.id]?.word2 &&
                            userAnswers[q.id]?.word2 !==
                              correctAnswers[q.id].word2
                              ? "1px solid red"
                              : "1px dashed transparent",
                          backgroundColor: "transparent",

                          fontSize: "inherit",
                          fontWeight: "600",
                          // color: userAnswers[q.id]?.word2 ? "#1e3a8a" : "#aaa",

                          padding: "2px 18px 2px 4px",
                          minWidth: "90px",

                          cursor:
                            revealed || lockedIds.includes(q.id)
                              ? "default"
                              : "pointer",
                        }}
                      >
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {q.word2.map((w, i) => (
                          <option key={i} value={w} style={{ color: "black" }}>
                            {w}
                          </option>
                        ))}
                      </select>
                      {wrongIds.includes(q.id) &&
                        userAnswers[q.id]?.word2 &&
                        userAnswers[q.id]?.word2 !==
                          correctAnswers[q.id].word2 && (
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
                        value={userAnswers[q.id]?.word1 || ""}
                        onChange={(e) =>
                          handleChange(q.id, "word1", e.target.value)
                        }
                        disabled={revealed || lockedIds.includes(q.id)}
                        onClick={(event) => event.stopPropagation()}
                        style={{
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",

                          border: "none",
                          borderBottom:
                            wrongIds.includes(q.id) &&
                            userAnswers[q.id]?.word1 &&
                            userAnswers[q.id]?.word1 !==
                              correctAnswers[q.id].word1
                              ? "1px solid red"
                              : "1px dashed transparent",
                          backgroundColor: "transparent",

                          fontSize: "inherit",
                          fontWeight: "600",
                          // color: userAnswers[q.id]?.word1 ? "#1e3a8a" : "#aaa",

                          padding: "2px 18px 2px 4px",
                          minWidth: "90px",

                          cursor:
                            revealed || lockedIds.includes(q.id)
                              ? "default"
                              : "pointer",
                        }}
                      >
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {q.word1.map((w, i) => (
                          <option
                            key={i}
                            value={w}
                            style={{
                              color: isWordUsedInAnotherQuestion(q.id, w)
                                ? "#999"
                                : "#000",
                            }}
                          >
                            {w}
                          </option>
                        ))}
                      </select>
                      {wrongIds.includes(q.id) &&
                        userAnswers[q.id]?.word1 &&
                        userAnswers[q.id]?.word1 !==
                          correctAnswers[q.id].word1 && (
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

export default Unit10_Page5_Q3;
