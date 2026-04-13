import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

const exerciseData = {
  left: [
    { id: 1, text: "7th" },
    { id: 2, text: "8th" },
    { id: 3, text: "9th" },
    { id: 4, text: "10th" },
    { id: 5, text: "1st" },
    { id: 6, text: "2nd" },
  ],
  right: [
    { id: 1, text: "tenth" },
    { id: 2, text: "second" },
    { id: 3, text: "seventh" },
    { id: 4, text: "first" },
    { id: 5, text: "ninth" },
    { id: 6, text: "eighth" },
  ],

  // leftId -> rightId
  correctMatches: {
    1: 3, // 7th -> seventh
    2: 6, // 8th -> eighth
    3: 5, // 9th -> ninth
    4: 1, // 10th -> tenth
    5: 4, // 1st -> first
    6: 2, // 2nd -> second
  },
};

const WB_Unit6_Page35_Q2 = () => {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [lines, setLines] = useState([]);

  const containerRef = useRef(null);
  const elementRefs = useRef({});

  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const newLines = Object.entries(matches)
        .map(([leftId, rightId]) => {
          const leftEl = elementRefs.current[`left-${leftId}`];
          const rightEl = elementRefs.current[`right-${rightId}`];

          if (leftEl && rightEl) {
            const leftRect = leftEl.getBoundingClientRect();
            const rightRect = rightEl.getBoundingClientRect();

            return {
              id: `${leftId}-${rightId}`,
              x1: leftRect.right - containerRect.left,
              y1: leftRect.top + leftRect.height / 2 - containerRect.top,
              x2: rightRect.left - containerRect.left,
              y2: rightRect.top + rightRect.height / 2 - containerRect.top,
            };
          }

          return null;
        })
        .filter(Boolean);

      setLines(newLines);
    };

    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [matches]);

  const handleLeftClick = (id) => {
    setSelectedLeft(id);
    setShowResults(false);
  };

  const handleRightClick = (rightId) => {
    if (selectedLeft === null) return;

    const newMatches = { ...matches };

    // إذا هذا الطرف اليمين مربوط مع عنصر ثاني نحذفه
    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === rightId) {
        delete newMatches[key];
      }
    });

    newMatches[selectedLeft] = rightId;

    setMatches(newMatches);
    setSelectedLeft(null);
  };

  const isWrongMatch = (leftId) => {
    if (!showResults) return false;
    if (!matches[leftId]) return false;

    return matches[leftId] !== exerciseData.correctMatches[leftId];
  };

  const checkAnswers = () => {
    const totalQuestions = exerciseData.left.length;

    const allConnected = exerciseData.left.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    setShowResults(true);

    let currentScore = 0;

    Object.keys(exerciseData.correctMatches).forEach((leftId) => {
      if (matches[leftId] === exerciseData.correctMatches[leftId]) {
        currentScore++;
      }
    });

    if (currentScore === totalQuestions) {
      ValidationAlert.success(`Score: ${currentScore} / ${totalQuestions}`);
    } else if (currentScore > 0) {
      ValidationAlert.warning(`Score: ${currentScore} / ${totalQuestions}`);
    } else {
      ValidationAlert.error(`Score: ${currentScore} / ${totalQuestions}`);
    }
  };

  const handleShowAnswer = () => {
    setMatches(exerciseData.correctMatches);
    setShowResults(true);
    setSelectedLeft(null);
  };

  const handleStartAgain = () => {
    setMatches({});
    setSelectedLeft(null);
    setShowResults(false);
    setLines([]);
  };

  const getLineColor = () => {
    return "#ef4444";
  };

  const getDotColor = (side, id) => {
    if (side === "left" && selectedLeft === id) {
      return "bg-blue-500 scale-125";
    }

    const isConnected =
      side === "left" ? !!matches[id] : Object.values(matches).includes(id);

    if (!isConnected) return "bg-[#eb533c]";

    return "bg-blue-500";
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "20px" }}>
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">F</span>
          Read and match.
        </h1>

        <div
          ref={containerRef}
          className="relative flex justify-center items-start"
          style={{
            gap: "120px",
            minHeight: "280px",
            padding: "20px 40px",
          }}
        >
          {/* Left Side */}
          <div className="flex flex-col" style={{ gap: "14px" }}>
            {exerciseData.left.map((item) => (
              <div
                key={item.id}
                className="relative flex items-center justify-end gap-3"
                style={{ minWidth: "120px" }}
              >
                <span
                  style={{
                    fontSize: "26px",
                    color: "#444",
                    lineHeight: "1",
                  }}
                >
                  {item.text}
                </span>

                <div
                  ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                  onClick={() => handleLeftClick(item.id)}
                  className={`w-4 h-4 rounded-full cursor-pointer transition-all ${getDotColor("left", item.id)}`}
                />

                {isWrongMatch(item.id) && (
                  <div
                    className="absolute -right-8 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shadow"
                  >
                    ✕
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex flex-col" style={{ gap: "14px" }}>
            {exerciseData.right.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3"
                style={{ minWidth: "140px" }}
              >
                <div
                  ref={(el) => (elementRefs.current[`right-${item.id}`] = el)}
                  onClick={() => handleRightClick(item.id)}
                  className={`w-4 h-4 rounded-full cursor-pointer transition-all ${getDotColor("right", item.id)}`}
                />

                <span
                  style={{
                    fontSize: "26px",
                    color: "#444",
                    lineHeight: "1",
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* SVG Lines */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ overflow: "visible" }}
          >
            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={getLineColor(line.id)}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>

        <Button
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleStartAgain}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default WB_Unit6_Page35_Q2;