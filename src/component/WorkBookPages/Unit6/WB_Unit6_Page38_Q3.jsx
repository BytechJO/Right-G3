import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import useWorkbookMatchingKeyboard from "../Unit4/useWorkbookMatchingKeyboard";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/C.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/C.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/C.3.svg";
import sentence1Audio from "../../../assets/audio/WorkBook/unit6/Page 38 - Exercise C/Item_001_The_plums_play_on_the_plate.mp3";
import sentence2Audio from "../../../assets/audio/WorkBook/unit6/Page 38 - Exercise C/Item_002_The_slug_sleeps_on_the_slide.mp3";
import sentence3Audio from "../../../assets/audio/WorkBook/unit6/Page 38 - Exercise C/Item_003_The_fly_and_the_flea_float_on_the_flag.mp3";
const DOT_COLOR = "#9ca3af";
const ACTIVE_COLOR = "#f39b42";
const BORDER_COLOR = "#e0e0e0";
const WRONG_COLOR = "#ef4444";
const PATH_COLOR = "#f39b42";
const TEXT_COLOR = "#111";

const LEFT_ITEMS = [
  { id: 1, text: "The plums play on the plate." },
  { id: 2, text: "The slug sleeps on the slide." },
  { id: 3, text: "The fly and the flea float on the flag." },
];

const RIGHT_ITEMS = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
];

const CORRECT_MATCHES = { 1: 2, 2: 3, 3: 1 };
const SENTENCE_AUDIO = {
  1: sentence1Audio,
  2: sentence2Audio,
  3: sentence3Audio,
};
const IMAGE_ALT = {
  1: "A fly and a flea floating on a flag",
  2: "Plums playing on a plate",
  3: "A slug sleeping on a playground slide",
};
const IDS = LEFT_ITEMS.map((item) => item.id);

// ── Wrong badge يسار أعلى فقط بدون أي تأثير تاني
const WrongBadge = () => (
  <div
    style={{
      position: "absolute",
      top: "-7px",
      left: "-7px",
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
      zIndex: 5,
      pointerEvents: "none",
    }}
  >
    ✕
  </div>
);

export default function WB_ReadAndMatch_PageC() {
  const [selected, setSelected] = useState(null);
  const [matches, setMatches] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [paths, setPaths] = useState([]);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const boardRef = useRef(null);
  const pointRefs = useRef({});
  const endpointRefs = useRef({});
  const isLeftLocked = useCallback((id) => lockedIds.includes(id), [lockedIds]);
  const isRightLocked = useCallback(
    (id) =>
      Object.keys(matches).some(
        (key) => matches[key] === id && lockedIds.includes(Number(key)),
      ),
    [lockedIds, matches],
  );
  const getElement = useCallback(
    (side, id) => endpointRefs.current[`${side}-${id}`],
    [],
  );
  const getAnchor = useCallback(
    (side, id) => pointRefs.current[`${side}-${id}`],
    [],
  );

  const commit = (leftId, rightId) => {
    if (showAns || isLeftLocked(leftId) || isRightLocked(rightId)) return;
    setMatches((previous) => {
      const updated = { ...previous };
      Object.keys(updated).forEach((key) => {
        if (updated[key] === rightId && !lockedIds.includes(Number(key)))
          delete updated[key];
      });
      updated[leftId] = rightId;
      return updated;
    });
    setWrongIds((previous) => previous.filter((id) => id !== leftId));
    setSelected(null);
  };

  const choose = (side, id) => {
    if (side === "left") playAudio(`sentence-${id}`, SENTENCE_AUDIO[id]);
    if (showAns || (side === "left" ? isLeftLocked(id) : isRightLocked(id)))
      return;
    if (!selected || selected.side === side) {
      setSelected({ side, id });
      return;
    }
    commit(
      side === "left" ? id : selected.id,
      side === "right" ? id : selected.id,
    );
  };

  const keyboard = useWorkbookMatchingKeyboard({
    boardRef,
    leftIds: IDS,
    rightIds: IDS,
    getElement,
    getAnchorElement: getAnchor,
    isLeftLocked,
    isRightLocked,
    onCommit: commit,
    onStart: (side, id) => {
      setSelected({ side, id });
      if (side === "left") playAudio(`sentence-${id}`, SENTENCE_AUDIO[id]);
    },
    onCancel: () => setSelected(null),
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
            color: wrongIds.includes(Number(leftId)) ? WRONG_COLOR : PATH_COLOR,
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
  }, [matches, wrongIds]);

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
    setLockedIds((previous) => [...new Set([...previous, ...correctIds])]);
    setWrongIds(
      LEFT_ITEMS.filter(
        (item) => matches[item.id] !== CORRECT_MATCHES[item.id],
      ).map((item) => item.id),
    );
    setSelected(null);
    keyboard.clear();
    const total = LEFT_ITEMS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    setMatches({ ...CORRECT_MATCHES });
    setShowResults(true);
    setShowAns(true);
    setSelected(null);
    setLockedIds(IDS);
    setWrongIds([]);
    keyboard.clear();
    stopAudio();
  };

  const handleStartAgain = () => {
    setSelected(null);
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setPaths([]);
    setLockedIds([]);
    setWrongIds([]);
    keyboard.clear();
    stopAudio();
  };

  const getLeftConn = (id) => !!matches[id];
  const getRightConn = (id) => Object.values(matches).includes(id);
  const isWrongMatch = (leftId) => wrongIds.includes(leftId);
  const handleBoardTabOrder = (event) => {
    if (event.key !== "Tab") return;

    // أثناء اختيار عنصر للتوصيل، خلي الـ hook يتحكم بالتاب
    if (keyboard.preview) return;

    const order = [
      ...LEFT_ITEMS.map((item) => `left-${item.id}`),
      ...RIGHT_ITEMS.map((item) => `right-${item.id}`),
    ];

    const currentIndex = order.findIndex(
      (key) => endpointRefs.current[key] === event.target,
    );

    if (currentIndex === -1) return;

    const nextIndex = event.shiftKey ? currentIndex - 1 : currentIndex + 1;

    // تجاهل العناصر المقفولة
    let index = nextIndex;

    while (index >= 0 && index < order.length) {
      const [side, id] = order[index].split("-");
      const locked =
        showAns ||
        (side === "left"
          ? isLeftLocked(Number(id))
          : isRightLocked(Number(id)));

      if (!locked) break;

      index += event.shiftKey ? -1 : 1;
    }

    // السماح بالخروج من التمرين عند الأطراف
    if (index < 0 || index >= order.length) return;

    const nextElement = endpointRefs.current[order[index]];

    if (nextElement) {
      event.preventDefault();
      event.stopPropagation();

      nextElement.focus({ preventScroll: true });
      nextElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  };
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
          sectionLetter="C"
          title="Read and match."
          subTitle="Read each fl, pl, or sl sentence to the matching picture first, then connect it to the matching picture or answer one pair at a time."
        />

        {/* Board */}
        <div
          ref={boardRef}
          onKeyDownCapture={handleBoardTabOrder}
          style={{ position: "relative", width: "100%" }}
        >
          {" "}
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
            {keyboard.preview && (
              <line
                {...keyboard.preview}
                className="unit4-keyboard-preview"
                stroke={ACTIVE_COLOR}
                strokeWidth="2.4"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            )}
          </svg>
          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "340px 150px 10px auto",
              columnGap: "clamp(10px,2vw,28px)",
              rowGap: "20px",
              alignItems: "center",
              width: "100%",
            }}
          >
            {LEFT_ITEMS.map((lItem, idx) => {
              const rItem = RIGHT_ITEMS[idx];
              const lConn = getLeftConn(lItem.id);
              const rConn = getRightConn(rItem.id);
              const lSelected =
                selected?.side === "left" && selected.id === lItem.id;
              const rSelected =
                selected?.side === "right" && selected.id === rItem.id;
              const wrong = isWrongMatch(lItem.id);

              return (
                <React.Fragment key={lItem.id}>
                  {/* ── sentence ── */}
                  <div
                    ref={(element) => {
                      endpointRefs.current[`left-${lItem.id}`] = element;
                    }}
                    onClick={() => choose("left", lItem.id)}
                    onKeyDown={(event) => {
                      if (
                        isLeftLocked(lItem.id) &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        playAudio(
                          `sentence-${lItem.id}`,
                          SENTENCE_AUDIO[lItem.id],
                        );
                      } else keyboard.handleKeyDown(event, "left", lItem.id);
                    }}
                    onFocus={() => keyboard.handleFocus("left", lItem.id)}
                    role="button"
                    tabIndex={0}
                    aria-disabled={isLeftLocked(lItem.id) || showAns}
                    className="unit4-audio-control unit4-interactive"
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(6px,0.9vw,12px)",
                      minWidth: 0,
                      zIndex: 2,
                      padding: "clamp(4px,0.6vw,8px) clamp(8px,1vw,14px)",
                      borderRadius: "clamp(8px,1vw,12px)",
                      border: lSelected
                        ? `2.5px solid ${ACTIVE_COLOR}`
                        : "2px solid transparent",
                      background: lSelected
                        ? "rgba(243,155,66,0.08)"
                        : "transparent",
                      cursor: isLeftLocked(lItem.id) ? "default" : "pointer",
                      transition: "border-color 0.2s, background 0.2s",
                      userSelect: "none",
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `sentence-${lItem.id}`}
                    />
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: TEXT_COLOR,
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      {lItem.id}
                    </span>

                    <span
                      style={{
                        fontSize: "18px",
                        // fontWeight: 500,
                        color: TEXT_COLOR,
                        lineHeight: 1.3,
                        wordBreak: "break-word",
                        textWrap: "nowrap",
                        transition: "color 0.2s",
                      }}
                    >
                      {lItem.text}
                    </span>

                    {/* ── wrong badge يسار فقط ── */}
                    {wrong && <WrongBadge />}
                  </div>

                  {/* ── left dot ── */}
                  <div
                    ref={(el) => (pointRefs.current[`left-${lItem.id}`] = el)}
                    onClick={() => choose("left", lItem.id)}
                    style={{
                      width: "clamp(10px,1.3vw,16px)",
                      height: "clamp(10px,1.3vw,16px)",
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: lSelected
                        ? ACTIVE_COLOR
                        : lConn
                          ? ACTIVE_COLOR
                          : DOT_COLOR,
                      cursor: showAns ? "default" : "pointer",
                      transition: "background 0.2s",
                      boxShadow: lSelected
                        ? `0 0 0 3px rgba(243,155,66,0.3)`
                        : "none",
                      zIndex: 2,
                    }}
                  />

                  {/* ── right dot ── */}
                  <div
                    ref={(el) => (pointRefs.current[`right-${rItem.id}`] = el)}
                    onClick={() => choose("right", rItem.id)}
                    style={{
                      width: "clamp(10px,1.3vw,16px)",
                      height: "clamp(10px,1.3vw,16px)",
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: rConn ? ACTIVE_COLOR : DOT_COLOR,
                      cursor: isRightLocked(rItem.id) ? "default" : "pointer",
                      transition: "background 0.2s",
                      zIndex: 2,
                    }}
                  />

                  {/* ── image — بدون أي تأثير للخطأ ── */}
                  <div
                    ref={(element) => {
                      endpointRefs.current[`right-${rItem.id}`] = element;
                    }}
                    onClick={() => choose("right", rItem.id)}
                    onKeyDown={(event) =>
                      keyboard.handleKeyDown(event, "right", rItem.id)
                    }
                    onFocus={() => keyboard.handleFocus("right", rItem.id)}
                    role="button"
                    tabIndex={isRightLocked(rItem.id) ? -1 : 0}
                    aria-disabled={isRightLocked(rItem.id) || showAns}
                    className="unit4-interactive"
                    style={{
                      position: "relative",
                      width: "clamp(90px,13vw,160px)",
                      aspectRatio: "1.2 / 1",
                      overflow: "hidden",

                      flexShrink: 0,
                      cursor: isRightLocked(rItem.id) ? "default" : "pointer",
                      border: rSelected
                        ? `2px solid ${ACTIVE_COLOR}`
                        : "2px solid transparent",
                      borderRadius: "12px",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                      zIndex: 2,
                    }}
                  >
                    <img
                      src={rItem.img}
                      alt={IMAGE_ALT[rItem.id]}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                        padding: "clamp(4px,0.6vw,8px)",
                        boxSizing: "border-box",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    />
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
