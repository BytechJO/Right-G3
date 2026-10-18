import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit2PlayingAudioIcon from "./WorkbookUnit2PlayingAudioIcon";
import useWorkbookUnit2Audio from "./useWorkbookUnit2Audio";
import "./workbookUnit2Interactions.css";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 9.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 11.svg";
import img2a from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 10.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 12.svg";
import img3a from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 14.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 13.svg";
import img4a from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 15.svg";
import img4b from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 16.svg";
import trueIcon from "../../../assets/imgs/true.svg";
import sentence1Audio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise H/Item_001_She_usually_rides_a_bike_to_school.mp3";
import sentence2Audio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise H/Item_002_He_never_rides_a_taxi_to_work.mp3";
import sentence3Audio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise H/Item_003_She_always_rides_the_bus_to_school.mp3";
import sentence4Audio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise H/Item_004_She_sometimes_walks_to_school.mp3";
const RED_COLOR = "#d62828";
const BORDER_COLOR = "#f39b42";
const ACTIVE_BORDER = "#f39b42";
const TEXT_COLOR = "#111";
const WRONG_COLOR = "#ef4444";

const ITEMS = [
  {
    id: 1,
    sentence: "She usually rides a bike to school.",
    audio: sentence1Audio,
    correct: "bike",
    images: [
      {
        key: "bike",
        src: img1a,
        alt: "bike to school",
        bars: 3,
        overlay: {
          box: { top: "16%", right: "8%" },
        },
      },
      {
        key: "walk",
        src: img1b,
        alt: "walk to school",
        bars: 0,
        overlay: {
          box: { top: "16%", right: "8%" },
        },
      },
    ],
  },
  {
    id: 2,
    sentence: "He never rides a taxi to work.",
    audio: sentence2Audio,
    correct: "taxi",
    images: [
      {
        key: "notTaxi",
        src: img2a,
        alt: "not taxi to work",
        bars: 1,
        overlay: {
          box: { top: "16%", right: "8%" },
        },
      },
      {
        key: "taxi",
        src: img2b,
        alt: "taxi",
        bars: 0,
        overlay: {
          box: { top: "16%", right: "8%" },
        },
      },
    ],
  },
  {
    id: 3,
    sentence: "She always rides the bus to school.",
    audio: sentence3Audio,
    correct: "bus",
    images: [
      {
        key: "bus",
        src: img3a,
        alt: "bus to school",
        bars: 4,
        overlay: {
          box: { top: "16%", right: "8%" },
        },
      },
      {
        key: "car",
        src: img3b,
        alt: "car",
        bars: 3,
        overlay: {
          box: { top: "16%", right: "8%" },
        },
      },
    ],
  },
  {
    id: 4,
    sentence: "She sometimes walks to school.",
    audio: sentence4Audio,
    correct: "walk",
    images: [
      {
        key: "walk",
        src: img4a,
        alt: "walk to school",
        bars: 2,
        overlay: {
          box: { top: "16%", right: "8%" },
        },
      },
      {
        key: "car",
        src: img4b,
        alt: "car",
        bars: 2,
        overlay: {
          box: { top: "16%", right: "8%" },
        },
      },
    ],
  },
];

const styles = {
  pageWrap: { width: "100%" },

  gridWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "clamp(18px, 3vw, 42px) clamp(18px, 4vw, 54px)",
    width: "100%",
  },

  itemCard: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(10px, 1.4vw, 16px)",
    minWidth: 0,
  },

  topLine: {
    display: "flex",
    alignItems: "flex-start",
    gap: "clamp(8px, 1vw, 12px)",
    minWidth: 0,
  },

  number: {
    fontSize: "20px",
    fontWeight: 700,
    color: TEXT_COLOR,
    lineHeight: 1,
    minWidth: "28px",
    flexShrink: 0,
    paddingTop: "2px",
  },

  sentence: {
    fontSize: "18px",
    color: TEXT_COLOR,
    lineHeight: 1.3,
    // fontWeight: 500,
    minWidth: 0,
    wordBreak: "break-word",
  },

  imagesRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 0,
    width: "100%",
    borderRadius: "clamp(10px, 1.3vw, 16px)",
    // overflow: "hidden",
  },

  imageOption: {
    position: "relative",
    // border: `1px solid ${BORDER_COLOR}`,
    background: "#fff",
    cursor: "pointer",
    // minWidth: 0,
    // aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // overflow: "hidden",
    userSelect: "none",
  },

  image: {
    width: "auto",
    height: "150px",
    objectFit: "contain",
    // border: `2px solid ${BORDER_COLOR}`,
  },

  // ✅ المربع الأبيض — دايماً موجود في نفس المكان
  emptyBox: {
    position: "absolute",

    top: "2px",
    right: "10px",

    width: "40px",
    height: "40px",

    border: "1px solid #9e9e9e",
    background: "#fff",
    borderRadius: "9px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    fontWeight: 700,
    fontSize: "clamp(12px, 1vw, 16px)",
    lineHeight: 1,

    zIndex: 5,

    boxSizing: "border-box",
  },

  // ✅ بادج الـ ✕ — تحت المربع الأبيض وليس فوقه
  wrongBadge: {
    position: "absolute",
    top: "0px",
    right: "0px",
    width: "clamp(18px, 2vw, 24px)",
    height: "clamp(18px, 2vw, 24px)",
    borderRadius: "50%",
    backgroundColor: "red",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(10px, 1vw, 12px)",
    fontWeight: 700,
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
    zIndex: 99,
    pointerEvents: "none",
    border: "2px solid white",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "clamp(8px, 1vw, 12px)",
  },
};

export default function WB_Unit2_Page12_QH() {
  const [answers, setAnswers] = useState({});
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit2Audio();

  const handleSelect = (itemId, optionKey) => {
    if (showAns || correctIds.includes(itemId)) return;
    setAnswers((prev) => ({ ...prev, [itemId]: optionKey }));
    setCheckedIds((previous) => previous.filter((id) => id !== itemId));
  };

  const handleCheck = () => {
    if (showAns || correctIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all items first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) score += 1;
    });
    setCheckedIds(ITEMS.map((item) => item.id));
    setCorrectIds(
      ITEMS.filter((item) => answers[item.id] === item.correct).map(
        (item) => item.id,
      ),
    );
    if (score === ITEMS.length)
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filledAnswers = {};
    ITEMS.forEach((item) => {
      filledAnswers[item.id] = item.correct;
    });
    setAnswers(filledAnswers);
    setCheckedIds(ITEMS.map((item) => item.id));
    setCorrectIds(ITEMS.map((item) => item.id));
    setShowAns(true);
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAns(false);
    stopAudio();
  };

  const isWrong = (itemId, optionKey, correctKey) => {
    if (!checkedIds.includes(itemId) || showAns) return false;
    return answers[itemId] === optionKey && optionKey !== correctKey;
  };

  // ✅ FIX: المربع يظهر ✓ على الخيار المحدد دايماً
  // عند Show Answer: الـ answers تتحدث للصحيح فبيظهر ✓ تلقائياً محله
  const getBoxContent = (itemId, imgKey, selected) => {
    if (selected)
      return <img src={trueIcon} alt="" style={{ height: "25px" }} />;
    return "";
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "55px" }}>
        <ExerciseHeader
          sectionLetter="H"
          title={
            <>
              Read, look, and write <span style={{ color: "red" }}>✓</span>.
            </>
          }
          subTitle="Look at the frequency statement against the two pictured options first, compare all available options, then tap only the answer that matches."
        />

        <div style={styles.pageWrap}>
          <div style={styles.gridWrap}>
            {ITEMS.map((item) => (
              <div key={item.id} style={styles.itemCard}>
                <div style={styles.topLine}>
                  <div style={styles.number}>{item.id}</div>
                  <div
                    role="button"
                    tabIndex={0}
                    className="wb-unit2-audio-control wb-unit2-interactive"
                    aria-label={`Play sentence: ${item.sentence}`}
                    onClick={() => playAudio(`sentence-${item.id}`, item.audio)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        playAudio(`sentence-${item.id}`, item.audio);
                      }
                    }}
                    style={styles.sentence}
                  >
                    {item.sentence}
                    <WorkbookUnit2PlayingAudioIcon
                      active={activeAudioKey === `sentence-${item.id}`}
                    />
                  </div>
                </div>

                <div style={styles.imagesRow}>
                  {item.images.map((img) => {
                    const selected = answers[item.id] === img.key;
                    const wrong = isWrong(item.id, img.key, item.correct);

                    return (
                      <div
                        key={img.key}
                        role="button"
                        tabIndex={0}
                        aria-pressed={selected}
                        aria-disabled={showAns || correctIds.includes(item.id)}
                        onClick={() => handleSelect(item.id, img.key)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            handleSelect(item.id, img.key);
                          }
                        }}
                        style={{
                          ...styles.imageOption,
                          borderColor: selected ? ACTIVE_BORDER : BORDER_COLOR,
                          cursor: showAns ? "default" : "pointer",
                        }}
                      >
                        <img src={img.src} alt={img.alt} style={styles.image} />

                        {/* ✅ المربع دايماً موجود — ✓ يظهر على الخيار المحدد فقط */}
                        <div style={styles.emptyBox}>
                          {getBoxContent(item.id, img.key, selected)}
                        </div>

                        {/* ✅ بادج الـ ✕ في الأسفل حتى ما يغطي المربع */}
                        {wrong && <div style={styles.wrongBadge}>✕</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.buttonsWrap}>
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}
