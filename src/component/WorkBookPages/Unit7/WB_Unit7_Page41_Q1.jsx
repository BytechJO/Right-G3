import { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const WB_Unit7_Page41_Q1 = () => {
  const [userAnswers, setUserAnswers] = useState({
    1: "",
    2: "",
    3: "",

  });

  const [checked, setChecked] = useState(false);

  const words = ["on", "in front of", "in"];

  const correctAnswers = {
    1: "on",
    2: "in",
    3: "in front of",

  };

  const questions = [
    {
      parts: [
        { type: "text", value: "1. There’s a cat" },
        { type: "blank", id: "1" },
        { type: "text", value: "the toy house." },
      ],
    },
    {
      parts: [
        { type: "text", value: "2. There’s a mouse" },
        { type: "blank", id: "2" },
        { type: "text", value: "the toy house." },
      ],
    },
    {
      parts: [
        { type: "text", value: "3. There’s cheese" },
        { type: "blank", id: "3" },
        { type: "text", value: " the toy house." },
      ],
    },

  ];

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const inputId = destination.droppableId;

    setUserAnswers((prev) => ({
      ...prev,
      [inputId]: draggableId,
    }));
  };

  const checkAnswers = () => {
    const hasEmptyInputs = Object.values(userAnswers).some(
      (value) => !value || value.trim() === ""
    );

    if (hasEmptyInputs) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let currentScore = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    Object.keys(correctAnswers).forEach((id) => {
      const userAnswer = userAnswers[id]?.toLowerCase().trim();
      const correctAnswer = correctAnswers[id].toLowerCase();

      if (userAnswer === correctAnswer) currentScore++;
    });

    setChecked(true);

    if (currentScore === totalQuestions) {
      ValidationAlert.success(`Perfect! ${currentScore} / ${totalQuestions}`);
    } else if (currentScore > 1) {
      ValidationAlert.warning(`Good job! You got ${currentScore} / ${totalQuestions}`);
    } else {
      ValidationAlert.error(`You got ${currentScore} / ${totalQuestions}`);
    }
  };

  const handleShowAnswer = () => {
    setUserAnswers(correctAnswers);
  };

  const handleStartAgain = () => {
    setUserAnswers({
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
    });
    setChecked(false);
  };

  // ✅ FIX: حساب كم مرة مطلوب كل كلمة
  const getRequiredCounts = () => {
    const counts = {};
    Object.values(correctAnswers).forEach((word) => {
      const w = word.toLowerCase().trim();
      counts[w] = (counts[w] || 0) + 1;
    });
    return counts;
  };

  // ✅ FIX: حساب كم مرة المستخدم استخدم كل كلمة
  const getUsedCounts = () => {
    const counts = {};
    Object.values(userAnswers).forEach((word) => {
      const w = word.toLowerCase().trim();
      if (w) counts[w] = (counts[w] || 0) + 1;
    });
    return counts;
  };

  const requiredCounts = getRequiredCounts();
  const usedCounts = getUsedCounts();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div
          className="div-forall"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: "60%",
            justifyContent: "flex-start",
          }}
        >
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">D</span> Read and complete.
          </h1>

          {/* الكلمات */}
          <Droppable droppableId="words" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "10px",
                  border: "2px dashed #ccc",
                  borderRadius: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {words.map((word, index) => {
                  const usedCount = usedCounts[word] || 0;
                  const requiredCount = requiredCounts[word] || 0;

                  const isUsed = usedCount >= requiredCount;

                  return (
                    <Draggable
                      key={word}
                      draggableId={word}
                      index={index}
                      isDragDisabled={checked || isUsed}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: "7px 14px",
                            border: "2px solid #2c5287",
                            borderRadius: "8px",
                            background: isUsed ? "#ccc" : "white",
                            opacity: isUsed ? 0.6 : 1,
                            cursor: isUsed ? "not-allowed" : "grab",
                            fontSize: "15px",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {word}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* الأسئلة الديناميكية */}
          <div className="flex-1 bg-white border-2 border-gray-300 rounded-2xl p-6 space-y-4 text-xl">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="flex items-center gap-2 flex-wrap">
                {q.parts.map((part, i) => {
                  if (part.type === "text") {
                    return <span key={i}>{part.value}</span>;
                  }

                  return (
                    <Droppable key={i} droppableId={part.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`relative border-b-2 w-30 text-center min-h-[30px] ${
                            snapshot.isDraggingOver ? "bg-yellow-100" : ""
                          }`}
                        >
                          {checked &&
                            userAnswers[part.id] &&
                            userAnswers[part.id].toLowerCase().trim() !==
                              correctAnswers[part.id].toLowerCase() && (
                              <div className="wb-wrong-icon-unit1-page6-q1">✕</div>
                            )}

                          {userAnswers[part.id]}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  );
                })}
              </div>
            ))}
          </div>

          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default WB_Unit7_Page41_Q1