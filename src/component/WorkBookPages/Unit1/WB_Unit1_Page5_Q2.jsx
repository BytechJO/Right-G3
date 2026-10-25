import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import { FaVolumeUp } from "react-icons/fa";

/* =====================================================
   IMAGES
===================================================== */

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 9.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 10.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 11.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 12.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 13.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 14.svg";
import img7 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 15.svg";
import img8 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 16.svg";

/* =====================================================
   AUDIO
===================================================== */

import sentence1 from "../../../assets/audio/WorkBook/unit1/Page 5 - Exercise F/Item_001_The_eagle_flies_higher_than_the_dove.mp3";

import sentence2 from "../../../assets/audio/WorkBook/unit1/Page 5 - Exercise F/Item_002_The_scooter_is_slower_than_the_train.mp3";

import sentence3 from "../../../assets/audio/WorkBook/unit1/Page 5 - Exercise F/Item_003_The_tortoise_is_smarter_than_the_hare.mp3";

import sentence4 from "../../../assets/audio/WorkBook/unit1/Page 5 - Exercise F/Item_004_The_pencil_is_lighter_than_the_pencil_case.mp3";
import ExerciseHeader from "../../ExerciseHeader";

/* =====================================================
   COLORS
===================================================== */

const ACTIVE_COLOR = "#f39b42";

const LINE_COLOR = "#f39b42";

const INACTIVE_COLOR = "#a9a9a9";

/* =====================================================
   DATA
===================================================== */

const exerciseData = {
  left: [
    {
      id: 1,
      text: "The eagle flies higher than the dove.",
      audio: sentence1,
    },

    {
      id: 2,
      text: "The scooter is slower than the train.",
      audio: sentence2,
    },

    {
      id: 3,
      text: "The tortoise is smarter than the hare.",
      audio: sentence3,
    },

    {
      id: 4,
      text: "The pencil is lighter than the pencil case.",
      audio: sentence4,
    },
  ],

  right: [
    {
      id: 1,

      images: [
        {
          src: img1,
          alt: "A scooter.",
        },

        {
          src: img2,
          alt: "A train.",
        },
      ],
    },

    {
      id: 2,

      images: [
        {
          src: img3,
          alt: "A tortoise.",
        },

        {
          src: img4,
          alt: "A hare.",
        },
      ],
    },

    {
      id: 3,

      images: [
        {
          src: img5,
          alt: "A pencil.",
        },

        {
          src: img6,
          alt: "A pencil case.",
        },
      ],
    },

    {
      id: 4,

      images: [
        {
          src: img7,
          alt: "An eagle.",
        },

        {
          src: img8,
          alt: "A dove.",
        },
      ],
    },
  ],

  correctMatches: {
    1: 4,
    2: 1,
    3: 2,
    4: 3,
  },
};

/* =====================================================
   COMPONENT
===================================================== */

export default function WB_Unit1_Page5_Q2() {
  /* =====================================================
     CONNECTIONS
  ===================================================== */

  const [matches, setMatches] = useState({});

  const [lines, setLines] = useState([]);

  /* =====================================================
     MOUSE CLICK SELECTION
  ===================================================== */

  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  /* =====================================================
     DRAG
  ===================================================== */

  const [dragOrigin, setDragOrigin] = useState(null);

  const [dragPreviewLine, setDragPreviewLine] = useState(null);

  const dragMovedRef = useRef(false);

  const suppressClickRef = useRef(false);

  /* =====================================================
     KEYBOARD
  ===================================================== */

  const [keyboardMatching, setKeyboardMatching] = useState(false);

  const [keyboardOrigin, setKeyboardOrigin] = useState(null);

  const [keyboardTarget, setKeyboardTarget] = useState(null);

  const [keyboardPreviewLine, setKeyboardPreviewLine] = useState(null);

  /* =====================================================
     CHECK
  ===================================================== */

  const [lockedLeft, setLockedLeft] = useState(new Set());

  const [wrongLeft, setWrongLeft] = useState([]);

  const [showAns, setShowAns] = useState(false);

  const [checkCompleted, setCheckCompleted] = useState(false);

  /* =====================================================
     AUDIO
  ===================================================== */

  const audioRef = useRef(null);

  const [playingId, setPlayingId] = useState(null);

  /* =====================================================
     REFS
  ===================================================== */

  const containerRef = useRef(null);

  const elementRefs = useRef({});

  const leftControlRefs = useRef({});

  const rightControlRefs = useRef({});

  /* =====================================================
     LOOKUPS
  ===================================================== */

  const rightToLeft = Object.fromEntries(
    Object.entries(matches).map(([leftId, rightId]) => [
      Number(rightId),
      Number(leftId),
    ]),
  );

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

      audioRef.current.onended = null;

      audioRef.current.onerror = null;

      audioRef.current = null;
    }

    setPlayingId(null);
  };

  const playSentenceAudio = (item) => {
    if (!item?.audio) return;

    stopAudio();

    const audio = new Audio(item.audio);

    audioRef.current = audio;

    setPlayingId(item.id);

    audio.play().catch(() => {
      if (audioRef.current === audio) {
        audioRef.current = null;
      }

      setPlayingId(null);
    });

    audio.onended = () => {
      if (audioRef.current === audio) {
        audioRef.current = null;
      }

      setPlayingId(null);
    };

    audio.onerror = audio.onended;
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  /* =====================================================
     LOCK HELPERS
  ===================================================== */

  const isLeftLocked = (leftId) => lockedLeft.has(Number(leftId));

  const isRightLocked = (rightId) => {
    const connectedLeft = rightToLeft[Number(rightId)];

    return connectedLeft ? isLeftLocked(connectedLeft) : false;
  };

  /* =====================================================
     ELEMENT CENTER
  ===================================================== */

  const getCenter = (element) => {
    if (!element || !containerRef.current) {
      return null;
    }

    const rect = element.getBoundingClientRect();

    const containerRect = containerRef.current.getBoundingClientRect();

    return {
      x: rect.left - containerRect.left + rect.width / 2,

      y: rect.top - containerRect.top + rect.height / 2,
    };
  };

  /* =====================================================
     PERMANENT LINES
  ===================================================== */

  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) {
        return;
      }

      const newLines = Object.entries(matches)
        .map(([leftId, rightId]) => {
          const leftElement = elementRefs.current[`left-${leftId}`];

          const rightElement = elementRefs.current[`right-${rightId}`];

          const leftPoint = getCenter(leftElement);

          const rightPoint = getCenter(rightElement);

          if (!leftPoint || !rightPoint) {
            return null;
          }

          return {
            id: `${leftId}-${rightId}`,

            x1: leftPoint.x,
            y1: leftPoint.y,

            x2: rightPoint.x,
            y2: rightPoint.y,
          };
        })
        .filter(Boolean);

      setLines(newLines);
    };

    updateLines();

    window.addEventListener("resize", updateLines);

    return () => {
      window.removeEventListener("resize", updateLines);
    };
  }, [matches]);

  /* =====================================================
     ONE TO ONE COMMIT
  ===================================================== */

  const commitMatch = (leftId, rightId) => {
    const numericLeft = Number(leftId);

    const numericRight = Number(rightId);

    if (showAns || checkCompleted || isLeftLocked(numericLeft)) {
      return;
    }

    const existingLeft = Object.keys(matches).find(
      (key) => Number(matches[key]) === numericRight,
    );

    /*
      Correct locked target cannot be replaced.
    */

    if (
      existingLeft &&
      Number(existingLeft) !== numericLeft &&
      isLeftLocked(Number(existingLeft))
    ) {
      return;
    }

    setMatches((previous) => {
      const next = {
        ...previous,
      };

      /*
        Remove old line from same source.
      */

      delete next[numericLeft];

      /*
        Remove old line from same target.
      */

      Object.keys(next).forEach((key) => {
        if (Number(next[key]) === numericRight) {
          delete next[key];
        }
      });

      next[numericLeft] = numericRight;

      return next;
    });

    /*
      Clear X only from edited source
      and displaced wrong source.
    */

    setWrongLeft((previous) =>
      previous.filter(
        (id) => id !== numericLeft && id !== Number(existingLeft),
      ),
    );

    setSelectedEndpoint(null);

    setKeyboardMatching(false);

    setKeyboardOrigin(null);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);

    setDragOrigin(null);

    setDragPreviewLine(null);
  };

  /* =====================================================
     CLICK MATCHING
     BOTH DIRECTIONS
  ===================================================== */

  const handleEndpointClick = (side, id) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;

      return;
    }

    const numericId = Number(id);

    if (showAns || checkCompleted) {
      return;
    }

    if (side === "left" && isLeftLocked(numericId)) {
      return;
    }

    if (side === "right" && isRightLocked(numericId)) {
      return;
    }

    setKeyboardMatching(false);

    setKeyboardOrigin(null);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);

    /* First endpoint */

    if (!selectedEndpoint) {
      setSelectedEndpoint({
        side,
        id: numericId,
      });

      return;
    }

    /* Same side = change selection */

    if (selectedEndpoint.side === side) {
      if (selectedEndpoint.id === numericId) {
        setSelectedEndpoint(null);
      } else {
        setSelectedEndpoint({
          side,
          id: numericId,
        });
      }

      return;
    }

    /* Opposite side = commit */

    const leftId = side === "left" ? numericId : selectedEndpoint.id;

    const rightId = side === "right" ? numericId : selectedEndpoint.id;

    commitMatch(leftId, rightId);
  };

  /* =====================================================
     AVAILABLE KEYBOARD TARGETS
  ===================================================== */

  const getAvailableTargets = (origin) => {
    if (!origin) {
      return [];
    }

    /* left -> right */

    if (origin.side === "left") {
      return exerciseData.right
        .filter((rightItem) => {
          const connectedLeft = rightToLeft[rightItem.id];

          if (!connectedLeft) {
            return true;
          }

          if (connectedLeft === origin.id) {
            return true;
          }

          return !isLeftLocked(connectedLeft);
        })
        .map((item) => item.id);
    }

    /* right -> left */

    return exerciseData.left
      .filter((leftItem) => {
        if (isLeftLocked(leftItem.id)) {
          return false;
        }

        return true;
      })
      .map((item) => item.id);
  };

  /* =====================================================
     KEYBOARD PREVIEW
  ===================================================== */

  const updateKeyboardPreview = (targetSide, targetId) => {
    if (!keyboardMatching || !keyboardOrigin) {
      setKeyboardPreviewLine(null);

      return;
    }

    const originElement =
      elementRefs.current[`${keyboardOrigin.side}-${keyboardOrigin.id}`];

    const targetElement = elementRefs.current[`${targetSide}-${targetId}`];

    const p1 = getCenter(originElement);

    const p2 = getCenter(targetElement);

    if (!p1 || !p2) {
      return;
    }

    setKeyboardPreviewLine({
      x1: p1.x,
      y1: p1.y,

      x2: p2.x,
      y2: p2.y,
    });
  };

  /* =====================================================
     START KEYBOARD MATCH
  ===================================================== */

  const startKeyboardMatch = (side, id) => {
    const numericId = Number(id);

    if (showAns || checkCompleted) {
      return;
    }

    if (side === "left" && isLeftLocked(numericId)) {
      return;
    }

    if (side === "right" && isRightLocked(numericId)) {
      return;
    }

    const origin = {
      side,
      id: numericId,
    };

    setSelectedEndpoint(null);

    setKeyboardOrigin(origin);

    setKeyboardMatching(true);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);

    const available = getAvailableTargets(origin);

    if (!available.length) {
      return;
    }

    const first = available[0];

    requestAnimationFrame(() => {
      if (side === "left") {
        rightControlRefs.current[first]?.focus();
      } else {
        leftControlRefs.current[first]?.focus();
      }
    });
  };

  /* =====================================================
     KEYBOARD HANDLER
  ===================================================== */

  const handleEndpointKeyDown = (event, side, id) => {
    const numericId = Number(id);

    /* No active keyboard match */

    if (!keyboardMatching) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        event.stopPropagation();

        if (side === "left") {
          const item = exerciseData.left.find(
            (entry) => entry.id === numericId,
          );

          playSentenceAudio(item);

          /*
            Correct locked source =
            audio only.
          */

          if (isLeftLocked(numericId)) {
            return;
          }
        }

        startKeyboardMatch(side, numericId);
      }

      return;
    }

    /*
      While matching, interaction belongs
      to opposite side only.
    */

    if (keyboardOrigin?.side === side) {
      return;
    }

    /* TAB / SHIFT TAB */

    if (event.key === "Tab") {
      event.preventDefault();

      event.stopPropagation();

      const available = getAvailableTargets(keyboardOrigin);

      if (!available.length) {
        return;
      }

      const currentIndex = available.indexOf(numericId);

      let nextIndex;

      if (event.shiftKey) {
        nextIndex = currentIndex <= 0 ? available.length - 1 : currentIndex - 1;
      } else {
        nextIndex =
          currentIndex === -1 || currentIndex === available.length - 1
            ? 0
            : currentIndex + 1;
      }

      const nextId = available[nextIndex];

      if (keyboardOrigin.side === "left") {
        rightControlRefs.current[nextId]?.focus();
      } else {
        leftControlRefs.current[nextId]?.focus();
      }

      return;
    }

    /* ENTER / SPACE */

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      event.stopPropagation();

      if (side === "left") {
        const item = exerciseData.left.find((entry) => entry.id === numericId);

        playSentenceAudio(item);
      }

      const origin = keyboardOrigin;

      const leftId = side === "left" ? numericId : origin.id;

      const rightId = side === "right" ? numericId : origin.id;

      commitMatch(leftId, rightId);

      requestAnimationFrame(() => {
        if (origin.side === "left") {
          leftControlRefs.current[origin.id]?.focus();
        } else {
          rightControlRefs.current[origin.id]?.focus();
        }
      });

      return;
    }

    /* ESCAPE */

    if (event.key === "Escape") {
      event.preventDefault();

      event.stopPropagation();

      const origin = keyboardOrigin;

      setKeyboardMatching(false);

      setKeyboardOrigin(null);

      setKeyboardTarget(null);

      setKeyboardPreviewLine(null);

      requestAnimationFrame(() => {
        if (origin.side === "left") {
          leftControlRefs.current[origin.id]?.focus();
        } else {
          rightControlRefs.current[origin.id]?.focus();
        }
      });
    }
  };

  /* =====================================================
     KEYBOARD TARGET FOCUS
  ===================================================== */

  const handleTargetFocus = (side, id) => {
    if (!keyboardMatching || !keyboardOrigin || keyboardOrigin.side === side) {
      return;
    }

    setKeyboardTarget({
      side,
      id,
    });

    updateKeyboardPreview(side, id);
  };

  /* =====================================================
     POINTER DRAG START
  ===================================================== */

  const handlePointerDown = (event, side, id) => {
    const numericId = Number(id);

    if (showAns || checkCompleted) {
      return;
    }

    if (side === "left" && isLeftLocked(numericId)) {
      return;
    }

    if (side === "right" && isRightLocked(numericId)) {
      return;
    }

    /*
      Only primary pointer.
    */

    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    dragMovedRef.current = false;

    setDragOrigin({
      side,
      id: numericId,
      pointerId: event.pointerId,
    });

    setDragPreviewLine(null);

    if (side === "left") {
      const item = exerciseData.left.find((entry) => entry.id === numericId);

      playSentenceAudio(item);
    }
  };

  /* =====================================================
     POINTER DRAG MOVE / END

     Mouse + Touch + Stylus
  ===================================================== */

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!dragOrigin) {
        return;
      }

      if (
        dragOrigin.pointerId !== undefined &&
        event.pointerId !== dragOrigin.pointerId
      ) {
        return;
      }

      dragMovedRef.current = true;

      const originElement =
        elementRefs.current[`${dragOrigin.side}-${dragOrigin.id}`];

      const p1 = getCenter(originElement);

      if (!p1 || !containerRef.current) {
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();

      setDragPreviewLine({
        x1: p1.x,
        y1: p1.y,

        x2: event.clientX - containerRect.left,

        y2: event.clientY - containerRect.top,
      });
    };

    const handlePointerUp = (event) => {
      if (!dragOrigin) {
        return;
      }

      if (
        dragOrigin.pointerId !== undefined &&
        event.pointerId !== dragOrigin.pointerId
      ) {
        return;
      }

      const wasMoved = dragMovedRef.current;

      const target = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest("[data-match-side]");

      if (wasMoved && target) {
        const targetSide = target.dataset.matchSide;

        const targetId = Number(target.dataset.matchId);

        if (targetSide !== dragOrigin.side) {
          const leftId = dragOrigin.side === "left" ? dragOrigin.id : targetId;

          const rightId =
            dragOrigin.side === "right" ? dragOrigin.id : targetId;

          commitMatch(leftId, rightId);

          /*
            Prevent click after successful drag.
          */

          suppressClickRef.current = true;
        }
      }

      setDragOrigin(null);

      setDragPreviewLine(null);

      dragMovedRef.current = false;
    };

    const handlePointerCancel = () => {
      setDragOrigin(null);

      setDragPreviewLine(null);

      dragMovedRef.current = false;
    };

    window.addEventListener("pointermove", handlePointerMove);

    window.addEventListener("pointerup", handlePointerUp);

    window.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", handlePointerUp);

      window.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [dragOrigin, matches, lockedLeft, showAns, checkCompleted]);

  /* =====================================================
     CHECK ANSWERS
  ===================================================== */

  const checkAnswers = () => {
    if (showAns || checkCompleted) {
      return;
    }

    const allConnected = exerciseData.left.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");

      return;
    }

    let score = 0;

    const wrong = [];

    const nextLocked = new Set(lockedLeft);

    exerciseData.left.forEach((item) => {
      const isCorrect =
        Number(matches[item.id]) ===
        Number(exerciseData.correctMatches[item.id]);

      if (isCorrect) {
        score++;

        nextLocked.add(item.id);
      } else {
        wrong.push(item.id);
      }
    });

    setLockedLeft(nextLocked);

    setWrongLeft(wrong);

    setSelectedEndpoint(null);

    setDragOrigin(null);

    setDragPreviewLine(null);

    setKeyboardMatching(false);

    setKeyboardOrigin(null);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);

    const total = exerciseData.left.length;

    if (score === total) {
      setCheckCompleted(true);

      setLockedLeft(new Set(exerciseData.left.map((item) => item.id)));

      setWrongLeft([]);

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

  const handleShowAnswer = () => {
    stopAudio();

    setMatches({
      ...exerciseData.correctMatches,
    });

    setLockedLeft(new Set(exerciseData.left.map((item) => item.id)));

    setWrongLeft([]);

    setShowAns(true);

    setCheckCompleted(true);

    setSelectedEndpoint(null);

    setDragOrigin(null);

    setDragPreviewLine(null);

    setKeyboardMatching(false);

    setKeyboardOrigin(null);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);
  };

  /* =====================================================
     START AGAIN
  ===================================================== */

  const handleStartAgain = () => {
    stopAudio();

    setMatches({});

    setLines([]);

    setSelectedEndpoint(null);

    setDragOrigin(null);

    setDragPreviewLine(null);

    setKeyboardMatching(false);

    setKeyboardOrigin(null);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);

    setLockedLeft(new Set());

    setWrongLeft([]);

    setShowAns(false);

    setCheckCompleted(false);
  };

  /* =====================================================
     VISUAL HELPERS
  ===================================================== */

  const getDotColor = (side, id) => {
    const numericId = Number(id);

    const selected =
      selectedEndpoint?.side === side && selectedEndpoint?.id === numericId;

    const keyboardSelected =
      keyboardOrigin?.side === side && keyboardOrigin?.id === numericId;

    const dragging = dragOrigin?.side === side && dragOrigin?.id === numericId;

    if (selected || keyboardSelected || dragging) {
      return ACTIVE_COLOR;
    }

    const connected =
      side === "left"
        ? !!matches[numericId]
        : Object.values(matches).some((value) => Number(value) === numericId);

    return connected ? ACTIVE_COLOR : INACTIVE_COLOR;
  };

  const isLeftSelected = (id) =>
    (selectedEndpoint?.side === "left" && selectedEndpoint?.id === id) ||
    (keyboardOrigin?.side === "left" && keyboardOrigin?.id === id) ||
    (dragOrigin?.side === "left" && dragOrigin?.id === id);

  const isRightSelected = (id) =>
    (selectedEndpoint?.side === "right" && selectedEndpoint?.id === id) ||
    (keyboardOrigin?.side === "right" && keyboardOrigin?.id === id) ||
    (keyboardTarget?.side === "right" && keyboardTarget?.id === id) ||
    (dragOrigin?.side === "right" && dragOrigin?.id === id);

  const isRightConnected = (id) =>
    Object.values(matches).some((value) => Number(value) === Number(id));

  const count = exerciseData.left.length;

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="main-container-component">
      <style>{`
        /* =================================================
           BOARD
        ================================================= */

        .wb-f-board {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          touch-action: none;
        }

        /* =================================================
           GRID
        ================================================= */

        .wb-f-master-grid {
          position: relative;
          z-index: 2;

          display: grid;

          grid-template-columns:
            minmax(0, 1.45fr)
            clamp(18px, 2vw, 28px)
            clamp(60px, 20vw, 150px)
            clamp(18px, 2vw, 28px)
            minmax(200px, 0.95fr);

          width: 100%;
        }

        /* =================================================
           CELL
        ================================================= */

        .wb-f-cell {
          display: flex;
          align-items: center;

          min-height: clamp(80px, 10vw, 110px);

          box-sizing: border-box;
        }

        /* =================================================
           LEFT SENTENCE
        ================================================= */

        .wb-f-cell-text {
          position: relative;

          width: 100%;

          display: flex;
          align-items: flex-start;

          gap: clamp(8px, 1.4vw, 14px);

          padding:
            clamp(6px, 1vw, 10px)
            clamp(8px, 1.2vw, 14px);

          border-radius: 12px;

          transition:
            border 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;

          cursor: pointer;

          outline: none;

          user-select: none;
        }

        .wb-f-cell-text.is-selected {
          border: 2.5px solid ${ACTIVE_COLOR};

          background:
            rgba(243, 155, 66, 0.06);
        }

        .wb-f-cell-text.not-selected {
          border: 2.5px solid transparent;

          background: transparent;
        }

        .wb-f-cell-text:focus-visible {
          outline: 3px solid #2563eb;

          outline-offset: 4px;
        }

        /* =================================================
           LOCKED SOURCE

           Still interactive for AUDIO,
           so don't disable pointer events.
        ================================================= */

        .wb-f-cell-text.is-locked {
          cursor: pointer;
        }

        /* =================================================
           LEFT NUMBER
        ================================================= */

        .wb-f-left-num {
          flex-shrink: 0;

          font-size: 22px;

          font-weight: 500;

          color: #222;

          line-height: 1;
        }

        /* =================================================
           LEFT TEXT
        ================================================= */

        .wb-f-left-text {
          font-size: 18px;

          color: #111;

          line-height: 1.35;

          padding-right: 22px;
        }

        /* =================================================
           AUDIO ICON
        ================================================= */

        .wb-f-audio-icon {
          position: absolute;

          top: 5px;
          right: 6px;

          width: 14px;
          height: 14px;

          pointer-events: none;

          z-index: 5;
        }

        /* =================================================
           DOT CELLS
        ================================================= */

        .wb-f-cell-dot {
          justify-content: center;
        }

        .wb-f-dot {
          width: clamp(14px, 1.8vw, 18px);
          height: clamp(14px, 1.8vw, 18px);

          border-radius: 50%;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background-color 0.2s ease;

          flex-shrink: 0;

          cursor: pointer;

          box-sizing: border-box;

          position: relative;

          z-index: 4;
        }

        .wb-f-dot.selected {
          transform: scale(1.1);

          box-shadow:
            0 0 0 5px
            rgba(243, 155, 66, 0.22);
        }

        /* =================================================
           RIGHT TARGET
        ================================================= */

        .wb-f-cell-right {
          justify-content: flex-start;

          padding-left:
            clamp(8px, 1vw, 14px);

          cursor: pointer;

          border-radius: 12px;

          outline: none;

          transition:
            background 0.2s ease,
            box-shadow 0.2s ease;

          user-select: none;
        }

        .wb-f-cell-right:hover:not(.is-locked) {
          background:
            rgba(243, 155, 66, 0.06);
        }

        .wb-f-cell-right:focus-visible {
          outline: 3px solid #2563eb;

          outline-offset: 3px;
        }

        .wb-f-cell-right.is-selected {
          background:
            rgba(243, 155, 66, 0.08);

          box-shadow:
            inset 0 0 0 2.5px
            ${ACTIVE_COLOR};
        }

        /* =================================================
           IMAGE PAIR
        ================================================= */

        .wb-f-right-pair {
          display: flex;

          align-items: center;

          gap:
            clamp(10px, 2vw, 22px);

          flex-wrap: nowrap;

          width: 100%;
        }

        .wb-f-right-img {
          display: block;

          width: auto;

          height: auto;

          max-width:
            clamp(60px, 12vw, 130px);

          max-height:
            clamp(55px, 10vw, 100px);

          object-fit: contain;

          user-select: none;

          /*
            Parent is the actual Mouse endpoint.
          */

          pointer-events: none;

          flex: 1 1 0;

          min-width: 0;
        }

        /* =================================================
           WRONG X
        ================================================= */

        .wb-f-wrong {
          position: absolute;

          top: -8px;

          right: -8px;

          width: 22px;
          height: 22px;

          border-radius: 50%;

          background: red;

          color: #fff;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 12px;

          font-weight: 700;

          border: 2px solid #fff;

          box-shadow:
            0 2px 6px
            rgba(0, 0, 0, 0.18);

          z-index: 8;
        }

        /* =================================================
           SVG
        ================================================= */

        .wb-f-svg-lines {
          position: absolute;

          inset: 0;

          width: 100%;

          height: 100%;

          pointer-events: none;

          overflow: visible;

          z-index: 1;
        }

        /* =================================================
           BUTTONS
        ================================================= */

        .wb-f-buttons {
          display: flex;

          justify-content: center;

          margin-top: 8px;
        }

        /* =================================================
           TOUCH / PEN
        ================================================= */

        [data-match-side] {
          touch-action: none;
        }

        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 760px) {
          .wb-f-master-grid {
            grid-template-columns:
              minmax(0, 1fr)
              clamp(14px, 2vw, 20px)
              clamp(40px, 6vw, 70px)
              clamp(14px, 2vw, 20px)
              minmax(140px, 0.7fr);
          }

          .wb-f-right-img {
            max-width:
              clamp(44px, 10vw, 80px);

            max-height:
              clamp(40px, 9vw, 70px);
          }

          .wb-f-left-num,
          .wb-f-left-text {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .wb-f-master-grid {
            grid-template-columns:
              1fr
              auto
              clamp(30px, 5vw, 50px)
              auto
              minmax(100px, auto);
          }

          .wb-f-right-img {
            max-width:
              clamp(32px, 9vw, 55px);

            max-height:
              clamp(28px, 8vw, 48px);
          }

          .wb-f-left-num,
          .wb-f-left-text {
            font-size: 13px;
          }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          gap: "25px",
        }}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <ExerciseHeader
          sectionLetter="F"
          title="Read and match."
          subTitle="Read each comparison sentence first, then connect it to the matching picture pair one at a time."
        />

        {/* =================================================
            MATCH BOARD
        ================================================= */}

        <div ref={containerRef} className="wb-f-board">
          {/* =================================================
              SVG LINES
          ================================================= */}

          <svg className="wb-f-svg-lines">
            {/* =============================================
                PERMANENT LINES
            ============================================= */}

            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={LINE_COLOR}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ))}

            {/* =============================================
                MOUSE / TOUCH / PEN DRAG PREVIEW
            ============================================= */}

            {dragPreviewLine && (
              <line
                x1={dragPreviewLine.x1}
                y1={dragPreviewLine.y1}
                x2={dragPreviewLine.x2}
                y2={dragPreviewLine.y2}
                stroke={LINE_COLOR}
                strokeWidth="3.5"
                strokeDasharray="7 5"
                strokeLinecap="round"
              />
            )}

            {/* =============================================
                KEYBOARD PREVIEW
            ============================================= */}

            {keyboardMatching && keyboardPreviewLine && (
              <line
                x1={keyboardPreviewLine.x1}
                y1={keyboardPreviewLine.y1}
                x2={keyboardPreviewLine.x2}
                y2={keyboardPreviewLine.y2}
                stroke={LINE_COLOR}
                strokeWidth="3.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* =================================================
              CONTENT GRID
          ================================================= */}

          <div className="wb-f-master-grid">
            {Array.from(
              {
                length: count,
              },

              (_, index) => {
                const leftItem = exerciseData.left[index];

                const rightItem = exerciseData.right[index];

                const leftSelected = isLeftSelected(leftItem.id);

                const rightSelected = isRightSelected(rightItem.id);

                const wrong = wrongLeft.includes(leftItem.id);

                const leftLocked = isLeftLocked(leftItem.id);

                const rightLocked = isRightLocked(rightItem.id);

                const connected = isRightConnected(rightItem.id);

                return (
                  <React.Fragment key={`row-${leftItem.id}`}>
                    {/* =====================================
                        COLUMN 1
                        LEFT SENTENCE
                    ===================================== */}

                    <div className="wb-f-cell">
                      <div
                        ref={(element) => {
                          leftControlRefs.current[leftItem.id] = element;
                        }}
                        role="button"
                        tabIndex={0}
                        data-match-side="left"
                        data-match-id={leftItem.id}
                        aria-label={
                          leftLocked
                            ? `${leftItem.text} Correct. Press Enter or Space to hear the sentence.`
                            : `${leftItem.text} Press Enter or Space to hear the sentence and start matching.`
                        }
                        className={[
                          "wb-f-cell-text",

                          leftSelected ? "is-selected" : "not-selected",

                          leftLocked ? "is-locked" : "",
                        ]
                          .join(" ")
                          .trim()}
                        onFocus={() => handleTargetFocus("left", leftItem.id)}
                        onPointerDown={(event) =>
                          handlePointerDown(event, "left", leftItem.id)
                        }
                        onClick={() => {
                          playSentenceAudio(leftItem);

                          if (leftLocked) {
                            return;
                          }

                          handleEndpointClick("left", leftItem.id);
                        }}
                        onKeyDown={(event) =>
                          handleEndpointKeyDown(event, "left", leftItem.id)
                        }
                      >
                        <div className="wb-f-left-num">{leftItem.id}</div>

                        <div className="wb-f-left-text">{leftItem.text}</div>

                        {playingId === leftItem.id && (
                          <FaVolumeUp
                            aria-hidden="true"
                            className="wb-f-audio-icon"
                          />
                        )}

                        {wrong && (
                          <div className="wb-f-wrong" aria-hidden="true">
                            ✕
                          </div>
                        )}
                      </div>
                    </div>

                    {/* =====================================
                        COLUMN 2
                        LEFT DOT
                    ===================================== */}

                    <div className="wb-f-cell wb-f-cell-dot">
                      <div
                        ref={(element) => {
                          elementRefs.current[`left-${leftItem.id}`] = element;
                        }}
                        className={`wb-f-dot ${leftSelected ? "selected" : ""}`}
                        aria-hidden="true"
                        style={{
                          backgroundColor: getDotColor("left", leftItem.id),

                          cursor: leftLocked ? "default" : "pointer",
                        }}
                        onPointerDown={(event) => {
                          if (leftLocked) {
                            return;
                          }

                          handlePointerDown(event, "left", leftItem.id);
                        }}
                        onClick={() => {
                          if (leftLocked) {
                            playSentenceAudio(leftItem);

                            return;
                          }

                          handleEndpointClick("left", leftItem.id);
                        }}
                      />
                    </div>

                    {/* =====================================
                        COLUMN 3
                        SPACER
                    ===================================== */}

                    <div className="wb-f-cell" />

                    {/* =====================================
                        COLUMN 4
                        RIGHT DOT
                    ===================================== */}

                    <div className="wb-f-cell wb-f-cell-dot">
                      <div
                        ref={(element) => {
                          elementRefs.current[`right-${rightItem.id}`] =
                            element;
                        }}
                        className={`wb-f-dot ${
                          rightSelected ? "selected" : ""
                        }`}
                        aria-hidden="true"
                        style={{
                          backgroundColor: getDotColor("right", rightItem.id),

                          cursor: rightLocked ? "default" : "pointer",

                          boxShadow: connected
                            ? "0 0 0 5px rgba(243, 155, 66, 0.18)"
                            : "none",
                        }}
                        onPointerDown={(event) => {
                          if (rightLocked) {
                            return;
                          }

                          handlePointerDown(event, "right", rightItem.id);
                        }}
                        onClick={() => {
                          if (rightLocked) {
                            return;
                          }

                          handleEndpointClick("right", rightItem.id);
                        }}
                      />
                    </div>

                    {/* =====================================
                        COLUMN 5
                        IMAGE TARGET
                    ===================================== */}

                    <div
                      ref={(element) => {
                        rightControlRefs.current[rightItem.id] = element;
                      }}
                      role="button"
                      tabIndex={
                        rightLocked || showAns || checkCompleted ? -1 : 0
                      }
                      data-match-side="right"
                      data-match-id={rightItem.id}
                      aria-label={`Picture pair: ${rightItem.images
                        .map((image) => image.alt)
                        .join(
                          " and ",
                        )}. Press Enter or Space to start or complete matching.`}
                      className={[
                        "wb-f-cell",

                        "wb-f-cell-right",

                        rightSelected ? "is-selected" : "",

                        rightLocked ? "is-locked" : "",
                      ]
                        .join(" ")
                        .trim()}
                      onFocus={() => handleTargetFocus("right", rightItem.id)}
                      onPointerDown={(event) => {
                        if (rightLocked) {
                          return;
                        }

                        handlePointerDown(event, "right", rightItem.id);
                      }}
                      onClick={() => {
                        if (rightLocked) {
                          return;
                        }

                        handleEndpointClick("right", rightItem.id);
                      }}
                      onKeyDown={(event) =>
                        handleEndpointKeyDown(event, "right", rightItem.id)
                      }
                    >
                      <div className="wb-f-right-pair">
                        {rightItem.images.map((image, imageIndex) => (
                          <img
                            key={`${rightItem.id}-${imageIndex}`}
                            src={image.src}
                            alt={image.alt}
                            className="wb-f-right-img"
                            draggable={false}
                          />
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                );
              },
            )}
          </div>
        </div>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="wb-f-buttons">
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
}
