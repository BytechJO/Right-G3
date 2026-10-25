import React, { useEffect, useRef, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import { FaVolumeUp } from "react-icons/fa";
import "./Review5_Page1_Q2.css";

import behind from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex B 1.svg";
import under from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex B 2.svg";
import between from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex B 3.svg";
import inFrontOf from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex B 4.svg";
import on from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Asset 10.svg";
import nextTo from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Asset 9.svg";

import behindAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise B/Item_001_behind.mp3";
import inFrontAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise B/Item_002_in_front_of.mp3";
import nextToAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise B/Item_003_next_to.mp3";
import betweenAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise B/Item_004_between.mp3";
import onAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise B/Item_005_on.mp3";
import underAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise B/Item_006_under.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const ITEMS = [
  {
    id: 1,
    text: "behind",
    audio: behindAudio,
  },
  {
    id: 2,
    text: "in front of",
    audio: inFrontAudio,
  },
  {
    id: 3,
    text: "next to",
    audio: nextToAudio,
  },
  {
    id: 4,
    text: "between",
    audio: betweenAudio,
  },
  {
    id: 5,
    text: "on",
    audio: onAudio,
  },
  {
    id: 6,
    text: "under",
    audio: underAudio,
  },
];

const IMAGES = [
  {
    id: "a",
    src: behind,
    alt: "A red ball behind a box.",
  },
  {
    id: "b",
    src: under,
    alt: "A red ball under a box.",
  },
  {
    id: "c",
    src: between,
    alt: "A red ball between two boxes.",
  },
  {
    id: "d",
    src: inFrontOf,
    alt: "A red ball in front of a box.",
  },
  {
    id: "e",
    src: nextTo,
    alt: "A red ball next to a box.",
  },
  {
    id: "f",
    src: on,
    alt: "A red ball on a box.",
  },
];

const CORRECT_ANSWERS = {
  1: "a",
  2: "d",
  3: "e",
  4: "c",
  5: "f",
  6: "b",
};

const Review5_Page1_Q2 = () => {
  const containerRef = useRef(null);

  // Anchor points for lines
  const leftAnchorRefs = useRef({});
  const rightAnchorRefs = useRef({});

  // Focusable elements
  const leftFocusRefs = useRef({});
  const rightFocusRefs = useRef({});

  // Audio
  const audioRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);

  // Connections
  const [connections, setConnections] = useState([]);

  // Mouse selection
  const [selected, setSelected] = useState(null);

  // Keyboard matching
  const [keyboardStart, setKeyboardStart] = useState(null);
  const [keyboardTarget, setKeyboardTarget] = useState(null);

  // Validation
  const [wrongMap, setWrongMap] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [checkCompleted, setCheckCompleted] = useState(false);

  // Force lines to recalculate on resize
  const [, forceLineUpdate] = useState(0);

  /* =====================================================
     AUDIO
  ===================================================== */

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();

      try {
        audioRef.current.currentTime = 0;
      } catch {
        // ignore
      }

      audioRef.current = null;
    }

    setPlayingId(null);
  };

  const playWordAudio = (item) => {
    if (!item?.audio) return;

    stopAudio();

    const audio = new Audio(item.audio);

    audioRef.current = audio;
    setPlayingId(item.id);

    audio.onended = () => {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setPlayingId(null);
      }
    };

    audio.onerror = () => {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setPlayingId(null);
      }
    };

    audio.play().catch(() => {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setPlayingId(null);
      }
    });
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  /* =====================================================
     RESIZE
  ===================================================== */

  useEffect(() => {
    const handleResize = () => {
      forceLineUpdate((prev) => prev + 1);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* =====================================================
     LOCK HELPERS
  ===================================================== */

  const isSourceLocked = (sourceId) => lockedIds.includes(sourceId);

  const isTargetLocked = (targetId) =>
    connections.some(
      (connection) =>
        connection.to === targetId && lockedIds.includes(connection.from),
    );

  /* =====================================================
     LINE POSITION
  ===================================================== */

  const getCenter = (element) => {
    if (!element || !containerRef.current) {
      return null;
    }

    const parentRect = containerRef.current.getBoundingClientRect();

    const rect = element.getBoundingClientRect();

    return {
      x: rect.left - parentRect.left + rect.width / 2,

      y: rect.top - parentRect.top + rect.height / 2,
    };
  };

  const getConnectionPositions = (from, to) => {
    const leftElement = leftAnchorRefs.current[from];

    const rightElement = rightAnchorRefs.current[to];

    const leftPos = getCenter(leftElement);
    const rightPos = getCenter(rightElement);

    if (!leftPos || !rightPos) {
      return null;
    }

    return {
      x1: leftPos.x,
      y1: leftPos.y,
      x2: rightPos.x,
      y2: rightPos.y,
    };
  };

  /* =====================================================
     PERMANENT LINE PATH
  ===================================================== */

  const makePath = (line) => {
    if (!line) return "";

    return `
      M ${line.x1} ${line.y1}
      C ${(line.x1 + line.x2) / 2} ${line.y1},
        ${(line.x1 + line.x2) / 2} ${line.y2},
        ${line.x2} ${line.y2}
    `;
  };

  /* =====================================================
     KEYBOARD PREVIEW LINE
  ===================================================== */

  const getKeyboardPreviewLine = () => {
    if (!keyboardStart || !keyboardTarget) {
      return null;
    }

    /*
      LEFT -> RIGHT
    */

    if (keyboardStart.side === "left" && keyboardTarget.side === "right") {
      return getConnectionPositions(keyboardStart.id, keyboardTarget.id);
    }

    /*
      RIGHT -> LEFT

      Line still needs:
      source anchor -> image anchor
    */

    if (keyboardStart.side === "right" && keyboardTarget.side === "left") {
      return getConnectionPositions(keyboardTarget.id, keyboardStart.id);
    }

    return null;
  };

  const keyboardPreviewLine = getKeyboardPreviewLine();

  /* =====================================================
     AVAILABLE TARGETS
  ===================================================== */

  const getAvailableTargets = () =>
    IMAGES.map((image) => image.id).filter(
      (targetId) => !isTargetLocked(targetId),
    );

  const getAvailableSources = () =>
    ITEMS.map((item) => item.id).filter(
      (sourceId) => !isSourceLocked(sourceId),
    );

  /* =====================================================
     FOCUS HELPERS
  ===================================================== */

  const focusSource = (sourceId) => {
    window.requestAnimationFrame(() => {
      leftFocusRefs.current[sourceId]?.focus({
        preventScroll: true,
      });
    });
  };

  const focusTarget = (targetId) => {
    window.requestAnimationFrame(() => {
      rightFocusRefs.current[targetId]?.focus({
        preventScroll: true,
      });
    });
  };

  /* =====================================================
     COMMIT CONNECTION
     ONE TO ONE
  ===================================================== */

  const commitConnection = (sourceId, targetId) => {
    if (
      showAnswer ||
      checkCompleted ||
      isSourceLocked(sourceId) ||
      isTargetLocked(targetId)
    ) {
      return;
    }

    /*
      Find displaced wrong source before replacing.
    */

    const displacedConnection = connections.find(
      (connection) =>
        connection.to === targetId &&
        connection.from !== sourceId &&
        !isSourceLocked(connection.from),
    );

    /*
      One-to-one:
      remove previous line from this source
      AND previous line using this target.
    */

    setConnections((previous) => [
      ...previous.filter(
        (connection) =>
          connection.from !== sourceId && connection.to !== targetId,
      ),
      {
        from: sourceId,
        to: targetId,
      },
    ]);

    /*
      Clear wrong X only for edited source
      and displaced wrong source.
    */

    setWrongMap((previous) => {
      const next = {
        ...previous,
      };

      delete next[sourceId];

      if (displacedConnection) {
        delete next[displacedConnection.from];
      }

      return next;
    });

    setSelected(null);
    setKeyboardStart(null);
    setKeyboardTarget(null);
  };

  /* =====================================================
     MOUSE SOURCE
  ===================================================== */

  const handleSourceClick = (sourceId) => {
    const item = ITEMS.find((entry) => entry.id === sourceId);

    /*
      Word click always plays audio.
    */

    if (item) {
      playWordAudio(item);
    }

    /*
      Correct locked source:
      audio only.
    */

    if (showAnswer || checkCompleted || isSourceLocked(sourceId)) {
      return;
    }

    /*
      Mouse selection started from image side.
    */

    if (selected?.side === "right") {
      commitConnection(sourceId, selected.id);
      return;
    }

    setSelected({
      side: "left",
      id: sourceId,
    });

    /*
      Mouse mode cancels keyboard preview.
    */

    setKeyboardStart(null);
    setKeyboardTarget(null);
  };

  /* =====================================================
     MOUSE TARGET
  ===================================================== */

  const handleTargetClick = (targetId) => {
    if (showAnswer || checkCompleted || isTargetLocked(targetId)) {
      return;
    }

    /*
      Mouse selection started from word side.
    */

    if (selected?.side === "left") {
      commitConnection(selected.id, targetId);
      return;
    }

    setSelected({
      side: "right",
      id: targetId,
    });

    setKeyboardStart(null);
    setKeyboardTarget(null);
  };

  /* =====================================================
     KEYBOARD START FROM SOURCE
  ===================================================== */

  const startKeyboardFromSource = (sourceId) => {
    const item = ITEMS.find((entry) => entry.id === sourceId);

    /*
      Enter / Space on word plays audio.
    */

    if (item) {
      playWordAudio(item);
    }

    /*
      Locked correct word remains audio accessible.
    */

    if (showAnswer || checkCompleted || isSourceLocked(sourceId)) {
      return;
    }

    const targets = getAvailableTargets();

    if (!targets.length) return;

    setSelected({
      side: "left",
      id: sourceId,
    });

    setKeyboardStart({
      side: "left",
      id: sourceId,
    });

    setKeyboardTarget({
      side: "right",
      id: targets[0],
    });

    focusTarget(targets[0]);
  };

  /* =====================================================
     KEYBOARD START FROM TARGET
  ===================================================== */

  const startKeyboardFromTarget = (targetId) => {
    if (showAnswer || checkCompleted || isTargetLocked(targetId)) {
      return;
    }

    const sources = getAvailableSources();

    if (!sources.length) return;

    setSelected({
      side: "right",
      id: targetId,
    });

    setKeyboardStart({
      side: "right",
      id: targetId,
    });

    setKeyboardTarget({
      side: "left",
      id: sources[0],
    });

    focusSource(sources[0]);
  };

  /* =====================================================
     CANCEL KEYBOARD
  ===================================================== */

  const cancelKeyboardMatch = () => {
    const origin = keyboardStart;

    setKeyboardStart(null);
    setKeyboardTarget(null);
    setSelected(null);

    if (!origin) return;

    if (origin.side === "left") {
      focusSource(origin.id);
    } else {
      focusTarget(origin.id);
    }
  };
  const focusNextUnconnectedSource = (justConnectedSourceId) => {
    window.requestAnimationFrame(() => {
      const connectedSourceIds = new Set(
        connections
          .filter((connection) => connection.from !== justConnectedSourceId)
          .map((connection) => connection.from),
      );

      connectedSourceIds.add(justConnectedSourceId);

      const nextSource = ITEMS.find(
        (item) => !connectedSourceIds.has(item.id) && !isSourceLocked(item.id),
      );

      if (nextSource) {
        focusSource(nextSource.id);
      }
    });
  };
  /* =====================================================
     SOURCE KEYBOARD
  ===================================================== */

  const handleSourceKeyDown = (event, sourceId) => {
    /* =====================================================
     ACTIVE MATCH:
     started from RIGHT -> cycling LEFT
  ===================================================== */

    if (keyboardStart?.side === "right" && keyboardTarget?.side === "left") {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();

        cancelKeyboardMatch();
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();

        const sources = getAvailableSources();

        if (!sources.length) return;

        const currentIndex = sources.indexOf(sourceId);

        const direction = event.shiftKey ? -1 : 1;

        const nextIndex =
          (currentIndex + direction + sources.length) % sources.length;

        const nextSource = sources[nextIndex];

        setKeyboardTarget({
          side: "left",
          id: nextSource,
        });

        focusSource(nextSource);

        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();

        const item = ITEMS.find((entry) => entry.id === sourceId);

        if (item) {
          playWordAudio(item);
        }

        commitConnection(sourceId, keyboardStart.id);

        focusNextUnconnectedSource(sourceId);

        return;
      }
    }

    /* =====================================================
     NORMAL TAB ORDER:
     SOURCE 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> TARGET a
  ===================================================== */

    if (event.key === "Tab" && !keyboardStart) {
      const sourceIds = ITEMS.map((item) => item.id);

      const currentIndex = sourceIds.indexOf(sourceId);

      /* Shift + Tab */

      if (event.shiftKey) {
        /*
        من أول source نخلي المتصفح يطلع للعنصر السابق
        الطبيعي خارج السؤال.
      */
        if (currentIndex === 0) {
          return;
        }

        event.preventDefault();

        focusSource(sourceIds[currentIndex - 1]);

        return;
      }

      /* Normal Tab */

      event.preventDefault();

      /*
      إذا مش آخر كلمة:
      روح للكلمة اللي بعدها.
    */

      if (currentIndex < sourceIds.length - 1) {
        focusSource(sourceIds[currentIndex + 1]);

        return;
      }

      /*
      آخر كلمة -> أول صورة
    */

      const targets = getAvailableTargets();

      if (targets.length) {
        focusTarget(targets[0]);
      }

      return;
    }

    /* =====================================================
     ENTER / SPACE START MATCH
  ===================================================== */

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      startKeyboardFromSource(sourceId);

      return;
    }

    /* =====================================================
     ESCAPE
  ===================================================== */

    if (event.key === "Escape" && selected?.side === "left") {
      event.preventDefault();
      event.stopPropagation();

      setSelected(null);
      setKeyboardStart(null);
      setKeyboardTarget(null);
    }
  };

  /* =====================================================
     TARGET KEYBOARD
  ===================================================== */

  const handleTargetKeyDown = (event, targetId) => {
    /* =====================================================
     ACTIVE MATCH:
     started from LEFT -> cycling RIGHT
  ===================================================== */

    if (keyboardStart?.side === "left" && keyboardTarget?.side === "right") {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();

        cancelKeyboardMatch();
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();

        const targets = getAvailableTargets();

        if (!targets.length) return;

        const currentIndex = targets.indexOf(targetId);

        const direction = event.shiftKey ? -1 : 1;

        const nextIndex =
          (currentIndex + direction + targets.length) % targets.length;

        const nextTarget = targets[nextIndex];

        setKeyboardTarget({
          side: "right",
          id: nextTarget,
        });

        focusTarget(nextTarget);

        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();

        const connectedSourceId = keyboardStart.id;

        commitConnection(connectedSourceId, targetId);

        focusNextUnconnectedSource(connectedSourceId);

        return;
      }
    }

    /* =====================================================
     NORMAL TAB ORDER:
     TARGET a -> b -> c -> d -> e -> f
  ===================================================== */

    if (event.key === "Tab" && !keyboardStart) {
      const targets = getAvailableTargets();

      const currentIndex = targets.indexOf(targetId);

      /*
      Shift + Tab
    */

      if (event.shiftKey) {
        event.preventDefault();

        /*
        أول صورة -> آخر كلمة يسار
      */

        if (currentIndex === 0) {
          const sources = ITEMS.map((item) => item.id).filter(
            (id) => !isSourceLocked(id),
          );

          if (sources.length) {
            focusSource(sources[sources.length - 1]);
          }

          return;
        }

        focusTarget(targets[currentIndex - 1]);

        return;
      }

      /*
      Normal Tab
    */

      /*
      آخر target:
      لا نمنع الـTab،
      خليه يطلع طبيعي للأزرار اللي بعد السؤال.
    */

      if (currentIndex === targets.length - 1) {
        return;
      }

      event.preventDefault();

      focusTarget(targets[currentIndex + 1]);

      return;
    }

    /* =====================================================
     ENTER / SPACE START FROM TARGET
  ===================================================== */

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      startKeyboardFromTarget(targetId);

      return;
    }

    /* =====================================================
     ESCAPE
  ===================================================== */

    if (event.key === "Escape" && selected?.side === "right") {
      event.preventDefault();
      event.stopPropagation();

      setSelected(null);
      setKeyboardStart(null);
      setKeyboardTarget(null);
    }
  };

  /* =====================================================
     CHECK
  ===================================================== */

  const checkAnswers = () => {
    if (showAnswer || checkCompleted) {
      return;
    }

    if (connections.length !== ITEMS.length) {
      ValidationAlert.info("Complete all matches first!");
      return;
    }

    let score = 0;

    const nextWrong = {};
    const correctIds = [];

    connections.forEach((connection) => {
      const correct = CORRECT_ANSWERS[connection.from] === connection.to;

      if (correct) {
        score++;

        correctIds.push(connection.from);
      } else {
        nextWrong[connection.from] = true;
      }
    });

    /*
      Lock only correct sources.
    */

    setLockedIds((previous) => [...new Set([...previous, ...correctIds])]);

    setWrongMap(nextWrong);

    setSelected(null);
    setKeyboardStart(null);
    setKeyboardTarget(null);

    const total = ITEMS.length;

    if (score === total) {
      setLockedIds(ITEMS.map((item) => item.id));

      setCheckCompleted(true);

      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score === 0) {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    }
  };

  /* =====================================================
     SHOW ANSWER
  ===================================================== */

  const showAnswers = () => {
    const answers = ITEMS.map((item) => ({
      from: item.id,
      to: CORRECT_ANSWERS[item.id],
    }));

    setConnections(answers);

    setWrongMap({});

    setLockedIds(ITEMS.map((item) => item.id));

    setSelected(null);
    setKeyboardStart(null);
    setKeyboardTarget(null);

    setShowAnswer(true);
    setCheckCompleted(true);

    stopAudio();
  };

  /* =====================================================
     RESET
  ===================================================== */

  const resetAll = () => {
    setConnections([]);

    setSelected(null);

    setKeyboardStart(null);
    setKeyboardTarget(null);

    setWrongMap({});

    setLockedIds([]);

    setShowAnswer(false);
    setCheckCompleted(false);

    stopAudio();
  };

  /* =====================================================
     SELECTION HELPERS
  ===================================================== */

  const isSourceSelected = (id) =>
    selected?.side === "left" && selected.id === id;

  const isTargetSelected = (id) =>
    selected?.side === "right" && selected.id === id;

  const isKeyboardSourceTarget = (id) =>
    keyboardTarget?.side === "left" && keyboardTarget.id === id;

  const isKeyboardRightTarget = (id) =>
    keyboardTarget?.side === "right" && keyboardTarget.id === id;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      {/* =================================================
          LOCAL STYLE
      ================================================= */}

      <style>{`
        .review5-match-source,
        .review5-match-target {
          outline: none;
          border-radius: 8px;
          transition:
            outline 0.15s ease,
            transform 0.15s ease,
            background-color 0.15s ease;
        }

        /* NORMAL TAB FOCUS */
        .review5-match-source:focus-visible,
        .review5-match-target:focus-visible {
          outline: 3px solid #2563eb !important;
          outline-offset: 4px;
        }

        /* SELECTED ORIGIN */
        .review5-match-selected {
          outline: 3px solid #2563eb !important;
          outline-offset: 4px;
        }

        /* CURRENT KEYBOARD TARGET */
        .review5-match-keyboard-target {
          outline: 3px dashed #2563eb !important;
          outline-offset: 4px;
        }

        .review5-match-source:hover,
        .review5-match-target:hover {
          transform: scale(1.02);
        }

        .review5-match-locked {
          cursor: default;
        }

        .review5-match-image {
          width: 80px;
          height: 60px;
          object-fit: contain;
          display: block;
          user-select: none;
          pointer-events: none;
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          gap: "15px",
        }}
      >
        <ExerciseHeaderReview
          sectionLetter="B"
          title="Read, match, and write."
          subTitle="Start with one word or picture, then connect it to the partner that means the same thing."
        />
        <div
          ref={containerRef}
          className="container relative w-full h-[500px] px-5"
        >
          {/* =================================================
              LINES
          ================================================= */}

          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
            style={{
              zIndex: 0,
              overflow: "visible",
            }}
          >
            {/* PERMANENT CONNECTIONS */}

            {connections.map((connection) => {
              const line = getConnectionPositions(
                connection.from,
                connection.to,
              );

              if (!line) return null;

              return (
                <path
                  key={`${connection.from}-${connection.to}`}
                  d={makePath(line)}
                  stroke="red"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5 5"
                />
              );
            })}

            {/* =========================================
                KEYBOARD PREVIEW
            ========================================= */}

            {keyboardPreviewLine && (
              <path
                d={makePath(keyboardPreviewLine)}
                stroke="#2563eb"
                strokeWidth="3"
                fill="none"
                strokeDasharray="7 5"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* =================================================
              ROWS
          ================================================= */}

          <div
            className="w-full flex flex-col gap-6"
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            {ITEMS.map((item, index) => {
              const img = IMAGES[index];

              const isRight = index % 2 !== 0;

              const sourceLocked = isSourceLocked(item.id);

              const targetLocked = isTargetLocked(img.id);

              const sourceSelected = isSourceSelected(item.id);

              const targetSelected = isTargetSelected(img.id);

              const sourceKeyboardTarget = isKeyboardSourceTarget(item.id);

              const targetKeyboardTarget = isKeyboardRightTarget(img.id);

              const connected = connections.find(
                (connection) => connection.from === item.id,
              );

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between w-[90%]"
                >
                  {/* =========================================
                      LEFT
                  ========================================= */}

                  <div
                    ref={(element) => {
                      leftFocusRefs.current[item.id] = element;
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={
                      sourceLocked
                        ? `Play ${item.text}`
                        : `${item.text}. Press Enter or Space to start matching.`
                    }
                    onClick={() => handleSourceClick(item.id)}
                    onKeyDown={(event) => handleSourceKeyDown(event, item.id)}
                    className={`
                      flex items-center gap-4
                      review5-match-source
                      ${sourceSelected ? "review5-match-selected" : ""}
                      ${
                        sourceKeyboardTarget
                          ? "review5-match-keyboard-target"
                          : ""
                      }
                      ${sourceLocked ? "review5-match-locked" : ""}
                    `}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {/* WORD */}

                    <div
                      style={{
                        width: "150px",
                        position: "relative",
                        paddingRight: "22px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          marginRight: "10px",
                        }}
                      >
                        {item.id}
                      </span>

                      {item.text}

                      {/* AUDIO ICON ONLY WHILE PLAYING */}

                      {playingId === item.id && (
                        <FaVolumeUp
                          aria-hidden="true"
                          size={15}
                          style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            pointerEvents: "none",
                            zIndex: 5,
                          }}
                        />
                      )}

                      {/* WRONG */}

                      {wrongMap[item.id] && (
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            top: "-10px",
                            right: "-8px",
                            width: "20px",
                            height: "20px",
                            background: "#ef4444",
                            color: "#fff",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: "bold",
                            border: "2px solid white",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            pointerEvents: "none",
                            zIndex: 5,
                          }}
                        >
                          ✕
                        </span>
                      )}
                    </div>

                    {/* LEFT DOT / BOX */}

                    <div
                      ref={(element) => {
                        leftAnchorRefs.current[item.id] = element;
                      }}
                      aria-hidden="true"
                      style={{
                        width: "40px",
                        height: "40px",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        border:
                          sourceSelected || sourceKeyboardTarget
                            ? "3px solid #2563eb"
                            : "2px solid orange",

                        borderRadius: "10px",

                        backgroundColor:
                          sourceSelected || sourceKeyboardTarget
                            ? "#fde68a"
                            : "#fff",

                        boxSizing: "border-box",

                        transition: "border 0.15s ease, background 0.15s ease",
                      }}
                    >
                      {connected?.to}
                    </div>
                  </div>

                  {/* =========================================
                      RIGHT
                  ========================================= */}

                  <div
                    ref={(element) => {
                      rightFocusRefs.current[img.id] = element;
                    }}
                    role="button"
                    tabIndex={targetLocked ? -1 : 0}
                    aria-label={`Option ${img.id}. ${img.alt}`}
                    onClick={() => handleTargetClick(img.id)}
                    onKeyDown={(event) => handleTargetKeyDown(event, img.id)}
                    className={`
                      flex items-center gap-3
                      review5-match-target
                      ${targetSelected ? "review5-match-selected" : ""}
                      ${
                        targetKeyboardTarget
                          ? "review5-match-keyboard-target"
                          : ""
                      }
                      ${targetLocked ? "review5-match-locked" : ""}
                    `}
                    style={{
                      marginRight: isRight ? "40px" : "0px",

                      cursor: targetLocked ? "default" : "pointer",
                    }}
                  >
                    {/* RIGHT DOT / BOX */}

                    <div
                      ref={(element) => {
                        rightAnchorRefs.current[img.id] = element;
                      }}
                      aria-hidden="true"
                      style={{
                        width: "30px",
                        height: "30px",

                        border:
                          targetSelected || targetKeyboardTarget
                            ? "3px solid #2563eb"
                            : "2px solid orange",

                        borderRadius: "8px",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        backgroundColor:
                          targetSelected || targetKeyboardTarget
                            ? "#fde68a"
                            : "#fff",

                        boxSizing: "border-box",

                        transition: "border 0.15s ease, background 0.15s ease",
                      }}
                    >
                      {img.id}
                    </div>

                    {/* IMAGE */}

                    <img
                      src={img.src}
                      alt={img.alt}
                      className="review5-match-image"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =================================================
          BUTTONS
      ================================================= */}

      <div className="action-buttons-container">
        <button type="button" onClick={resetAll} className="try-again-button">
          Start Again ↻
        </button>

        <button type="button" onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button type="button" onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review5_Page1_Q2;
