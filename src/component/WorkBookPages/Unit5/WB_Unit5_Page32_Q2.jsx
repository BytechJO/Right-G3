import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useWorkbookMatchingKeyboard from "../Unit4/useWorkbookMatchingKeyboard";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import sentence1Audio from "../../../assets/audio/WorkBook/unit5/Page 32 - Exercise B/Item_001_Sally_eats_candy_on_the_ferry.mp3";
import sentence2Audio from "../../../assets/audio/WorkBook/unit5/Page 32 - Exercise B/Item_002_The_bunny_goes_to_a_party_by_ship.mp3";
import sentence3Audio from "../../../assets/audio/WorkBook/unit5/Page 32 - Exercise B/Item_003_Jenny_and_Mr._Sky_cry_and_cry.mp3";
import sentence4Audio from "../../../assets/audio/WorkBook/unit5/Page 32 - Exercise B/Item_004_It's_hot_and_sunny_in_July.mp3";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/B.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/B.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/B.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/B.4.svg";

const DOT_COLOR = "#9ca3af";
const ACTIVE_COLOR = "#f39b42";
const BORDER_COLOR = "#e0e0e0";
const WRONG_COLOR = "red";
const PATH_COLOR = "#f39b42";
const TEXT_COLOR = "#111";

const LEFT_ITEMS = [
  { id: 1, text: "Sally eats candy on the ferry." },
  { id: 2, text: "The bunny goes to a party by ship." },
  { id: 3, text: "Jenny and Mr. Sky cry and cry." },
  { id: 4, text: "It's hot and sunny in July." },
];

const RIGHT_ITEMS = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
];

const CORRECT_MATCHES = { 1: 3, 2: 4, 3: 1, 4: 2 };
const SENTENCE_AUDIO = {
  1: sentence1Audio,
  2: sentence2Audio,
  3: sentence3Audio,
  4: sentence4Audio,
};

// eslint-disable-next-line react-refresh/only-export-components
const WrongBadge = () => (
  <div
    style={{
      position: "absolute",
      top: "-8px",
      left: "-8px",
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
      pointerEvents: "none",
    }}
  >
    ✕
  </div>
);

export default function WB_ReadLookMatch_PageB() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [paths, setPaths] = useState([]);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const [selectedRight, setSelectedRight] = useState(null);
  const boardRef = useRef(null);
  const pointRefs = useRef({});
  const interactiveRefs = useRef({});

  const getKeyboardElement = useCallback(
    (side, id) => interactiveRefs.current[`${side}-${id}`],
    [],
  );
  const getKeyboardAnchor = useCallback(
    (side, id) => pointRefs.current[`${side}-${id}`],
    [],
  );
  const isLeftLocked = useCallback(
    (id) => showAns || lockedIds.includes(id),
    [lockedIds, showAns],
  );
  const isRightLocked = useCallback(
    (rightId) => {
      const owner = Object.keys(matches).find(
        (leftId) => matches[leftId] === rightId,
      );
      return showAns || (owner && lockedIds.includes(Number(owner)));
    },
    [lockedIds, matches, showAns],
  );

  const commitMatch = useCallback(
    (leftId, rightId) => {
      const numericLeftId = Number(leftId);
      const numericRightId = Number(rightId);
      if (
        showAns ||
        lockedIds.includes(numericLeftId) ||
        isRightLocked(numericRightId)
      )
        return;
      setMatches((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          if (
            updated[key] === numericRightId &&
            !lockedIds.includes(Number(key))
          )
            delete updated[key];
        });
        updated[numericLeftId] = numericRightId;
        return updated;
      });
      setWrongIds((prev) => prev.filter((id) => id !== numericLeftId));
      setSelectedLeft(null);
    },
    [isRightLocked, lockedIds, showAns],
  );

  const matchingKeyboard = useWorkbookMatchingKeyboard({
    boardRef,
    leftIds: LEFT_ITEMS.map((item) => item.id),
    rightIds: RIGHT_ITEMS.map((item) => item.id),
    getElement: getKeyboardElement,
    getAnchorElement: getKeyboardAnchor,
    isLeftLocked,
    isRightLocked,
    onStart: (side, id) => {
      if (side === "left") {
        setSelectedLeft(id);
        setSelectedRight(null);
        playAudio(`sentence-${id}`, SENTENCE_AUDIO[id]);
      } else {
        setSelectedRight(id);
        setSelectedLeft(null);
      }
    },
    onCommit: (leftId, rightId) => {
      commitMatch(leftId, rightId);
      setSelectedLeft(null);
      setSelectedRight(null);
    },
  });

  useLayoutEffect(() => {
    const update = () => {
      if (!boardRef.current) return;
      const br = boardRef.current.getBoundingClientRect();

      const newPaths = Object.entries(matches)
        .map(([leftId, rightId]) => {
          const s = pointRefs.current[`left-${leftId}`];
          const e = pointRefs.current[`right-${rightId}`];
          if (!s || !e) return null;

          const sr = s.getBoundingClientRect();
          const er = e.getBoundingClientRect();
          const x1 = sr.left + sr.width / 2 - br.left;
          const y1 = sr.top + sr.height / 2 - br.top;
          const x2 = er.left + er.width / 2 - br.left;
          const y2 = er.top + er.height / 2 - br.top;
          const dx = Math.abs(x2 - x1);

          return {
            id: `path-${leftId}-${rightId}`,
            d: `M ${x1} ${y1} C ${x1 + dx * 0.42} ${y1}, ${x2 - dx * 0.42} ${y2}, ${x2} ${y2}`,
            color: PATH_COLOR,
          };
        })
        .filter(Boolean);

      setPaths(newPaths);
    };

    update();
    window.addEventListener("resize", update);
    let obs;
    if (boardRef.current && typeof ResizeObserver !== "undefined") {
      obs = new ResizeObserver(update);
      obs.observe(boardRef.current);
    }
    return () => {
      window.removeEventListener("resize", update);
      obs?.disconnect();
    };
  }, [matches, showResults]);

  const handleLeftSelect = (id) => {
    playAudio(`sentence-${id}`, SENTENCE_AUDIO[id]);

    if (showAns || lockedIds.includes(id)) return;

    if (selectedRight !== null) {
      commitMatch(id, selectedRight);
      setSelectedRight(null);
      setSelectedLeft(null);
      return;
    }

    setSelectedLeft((prev) => (prev === id ? null : id));
  };

  const handleRightSelect = (rightId) => {
    if (showAns || isRightLocked(rightId)) return;

    if (selectedLeft !== null) {
      commitMatch(selectedLeft, rightId);
      setSelectedLeft(null);
      setSelectedRight(null);
      return;
    }

    setSelectedRight((prev) => (prev === rightId ? null : rightId));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === LEFT_ITEMS.length) return;
    const allConnected = LEFT_ITEMS.every((i) => matches[i.id]);
    if (!allConnected) {
      ValidationAlert.info("Please connect all sentences first.");
      return;
    }
    let score = 0;
    LEFT_ITEMS.forEach((i) => {
      if (matches[i.id] === CORRECT_MATCHES[i.id]) score++;
    });
    setShowResults(true);
    const correctIds = LEFT_ITEMS.filter(
      (item) => matches[item.id] === CORRECT_MATCHES[item.id],
    ).map((item) => item.id);
    setLockedIds((prev) => [...new Set([...prev, ...correctIds])]);
    setWrongIds(
      LEFT_ITEMS.filter(
        (item) => matches[item.id] !== CORRECT_MATCHES[item.id],
      ).map((item) => item.id),
    );
    const total = LEFT_ITEMS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    setMatches({ ...CORRECT_MATCHES });
    setShowResults(true);
    setShowAns(true);
    setSelectedLeft(null);
    setLockedIds(LEFT_ITEMS.map((item) => item.id));
    setWrongIds([]);
    matchingKeyboard.clear();
    stopAudio();
  };

  const handleStartAgain = () => {
    setSelectedLeft(null);
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setPaths([]);
    setLockedIds([]);
    setWrongIds([]);
    matchingKeyboard.clear();
    stopAudio();
  };

  const getLeftConn = (id) => !!matches[id];
  const getRightConn = (id) => Object.values(matches).includes(id);
  const isWrongMatch = (leftId) => wrongIds.includes(leftId);

  /* ── DOT_SIZE: ثابت لكل الـ dots ── */
  const DOT_SIZE = "clamp(12px,1.4vw,18px)";

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="B"
          title="Read, look, and match."
          subTitle="Read each sentence with -y words to the matching picture first, then connect it to the matching picture or answer one pair at a time."
        />

        {/* Board */}
        <div ref={boardRef} style={{ position: "relative", width: "100%" }}>
          {/* SVG lines */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
              zIndex: 1,
            }}
          >
            {paths.map((p) => (
              <path
                key={p.id}
                d={p.d}
                fill="none"
                stroke={p.color}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            ))}
            {matchingKeyboard.preview && (
              <line
                x1={matchingKeyboard.preview.x1}
                y1={matchingKeyboard.preview.y1}
                x2={matchingKeyboard.preview.x2}
                y2={matchingKeyboard.preview.y2}
                stroke={ACTIVE_COLOR}
                strokeWidth="2.4"
                strokeDasharray="7 6"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/*
            ── Grid: 5 columns ──
            [sentence] [left-dot] [gap-spacer] [right-dot] [image]

            الـ gap-spacer هو div فارغ بعرض ثابت يعطي مسافة واضحة ومتساوية
            بين الـ dots اليسار واليمين — هذا هو حل مشكلة الـ spacing
          */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "325px auto clamp(80px,12vw,180px) auto auto",
              columnGap: "clamp(6px,1vw,14px)",
              // rowGap: "5px",
              alignItems: "center",
              width: "100%",
            }}
          >
            {LEFT_ITEMS.map((lItem, idx) => {
              const rItem = RIGHT_ITEMS[idx];
              const lConn = getLeftConn(lItem.id);
              const rConn = getRightConn(rItem.id);
              const lSelected =
                selectedLeft === lItem.id ||
                matchingKeyboard.selectedLeftId === lItem.id;
              const rSelected = selectedRight === rItem.id;
              const wrong = isWrongMatch(lItem.id);

              return (
                <React.Fragment key={lItem.id}>
                  {/* col 1 — sentence */}
                  <div
                    className="unit4-audio-control unit4-interactive"
                    ref={(element) => {
                      interactiveRefs.current[`left-${lItem.id}`] = element;
                    }}
                    onClick={() => handleLeftSelect(lItem.id)}
                    role="button"
                    tabIndex={0}
                    aria-disabled={lockedIds.includes(lItem.id) || showAns}
                    aria-label={`Sentence ${lItem.id}: ${lItem.text}`}
                    onKeyDown={(event) => {
                      if (
                        (lockedIds.includes(lItem.id) || showAns) &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        playAudio(
                          `sentence-${lItem.id}`,
                          SENTENCE_AUDIO[lItem.id],
                        );
                        return;
                      }
                      matchingKeyboard.handleKeyDown(event, "left", lItem.id);
                    }}
                    onFocus={() =>
                      matchingKeyboard.handleFocus("left", lItem.id)
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(6px,0.9vw,12px)",
                      minWidth: 0,
                      zIndex: 2,
                      padding: "clamp(4px,0.6vw,8px) clamp(8px,1vw,14px)",
                      borderRadius: "clamp(8px,1vw,12px)",
                      border: lSelected
                        ? wrong
                          ? "1px solid red"
                          : `1px solid ${ACTIVE_COLOR}`
                        : "1px solid transparent",
                      background: lSelected
                        ? "rgba(243,155,66,0.08)"
                        : "transparent",
                      cursor:
                        showAns || lockedIds.includes(lItem.id)
                          ? "default"
                          : "pointer",
                      transition: "border-color 0.2s, background 0.2s",
                      userSelect: "none",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(16px,1.7vw,20px)",
                        fontWeight: 500,
                        color: TEXT_COLOR,
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      {lItem.id}
                    </span>

                    <span
                      style={{
                        fontSize: "clamp(13px,1.4vw,18px)",
                        // fontWeight: 500,
                        color: lSelected ? ACTIVE_COLOR : TEXT_COLOR,
                        lineHeight: 1.3,
                        wordBreak: "break-word",
                        textWrap: "nowrap",
                        transition: "color 0.2s",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `sentence-${lItem.id}`}
                      />
                      {lItem.text}
                    </span>

                    {wrong && <WrongBadge />}
                  </div>

                  {/* col 2 — left dot */}
                  <div
                    ref={(el) => (pointRefs.current[`left-${lItem.id}`] = el)}
                    onClick={() => handleLeftSelect(lItem.id)}
                    style={{
                      width: DOT_SIZE,
                      height: DOT_SIZE,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: lSelected || lConn ? ACTIVE_COLOR : DOT_COLOR,
                      cursor: showAns ? "default" : "pointer",
                      transition: "background 0.2s",
                      boxShadow: lSelected
                        ? `0 0 0 3px rgba(243,155,66,0.3)`
                        : "none",
                      zIndex: 2,
                      justifySelf: "center",
                    }}
                  />

                  {/* col 3 — spacer (the gap between left & right dots) */}
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      pointerEvents: "none",
                    }}
                  />

                  {/* col 4 — right dot */}
                  <div
                    ref={(el) => (pointRefs.current[`right-${rItem.id}`] = el)}
                    onClick={() => handleRightSelect(rItem.id)}
                    style={{
                      width: DOT_SIZE,
                      height: DOT_SIZE,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: rSelected || rConn ? ACTIVE_COLOR : DOT_COLOR,
                      boxShadow: rSelected
                        ? "0 0 0 3px rgba(243,155,66,0.3)"
                        : "none",
                      cursor:
                        showAns || selectedLeft === null
                          ? "default"
                          : "pointer",
                      transition: "background 0.2s",
                      zIndex: 2,
                      justifySelf: "center",
                    }}
                  />

                  {/* col 5 — image */}
                  <div
                    ref={(element) => {
                      interactiveRefs.current[`right-${rItem.id}`] = element;
                    }}
                    onClick={() => handleRightSelect(rItem.id)}
                    role="button"
                    tabIndex={isRightLocked(rItem.id) ? -1 : 0}
                    aria-disabled={isRightLocked(rItem.id)}
                    aria-label={`Picture option ${rItem.id}`}
                    onKeyDown={(event) =>
                      matchingKeyboard.handleKeyDown(event, "right", rItem.id)
                    }
                    onFocus={() =>
                      matchingKeyboard.handleFocus("right", rItem.id)
                    }
                    style={{
                      position: "relative",
                      width: "clamp(100px,14vw,170px)",
                      aspectRatio: "1.5 / 1",
                      overflow: "visible",
                      flexShrink: 0,
                      zIndex: 2,
                      border: rSelected
                        ? `2px solid ${ACTIVE_COLOR}`
                        : "2px solid transparent",

                      borderRadius: "12px",

                      backgroundColor: rSelected
                        ? "rgba(243,155,66,0.08)"
                        : "transparent",

                      boxShadow: rSelected
                        ? "0 0 0 3px rgba(243,155,66,0.18)"
                        : "none",

                      transition:
                        "border 0.2s, background 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <div
                      style={{
                        // borderRadius: "clamp(8px,1vw,14px)",
                        // border: `1px solid ${rConn ? ACTIVE_COLOR : BORDER_COLOR}`,
                        // background: "#f7f7f7",
                        cursor:
                          showAns || selectedLeft === null
                            ? "default"
                            : "pointer",
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                      }}
                    >
                      <img
                        src={rItem.img}
                        alt={
                          [
                            "Jenny and Mr. Sky crying",
                            "A sunny day in July",
                            "Sally eating candy on a ferry",
                            "A bunny going to a party by ship",
                          ][rItem.id - 1]
                        }
                        style={{
                          width: "120px",
                          height: "100%",
                          objectFit: "contain",
                          display: "block",
                          userSelect: "none",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(8px,1.5vw,16px)",
            zIndex: 100,
          }}
        >
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
