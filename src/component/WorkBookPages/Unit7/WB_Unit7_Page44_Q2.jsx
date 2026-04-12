import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 5.svg";

const WB_Unit7_Page44_Q2 = () => {
  const [userAnswers, setUserAnswers] = useState({
    1: "", 2: "", 3: "", 4: "", 5: ""
  });

  const [checked, setChecked] = useState(false);

  // الكلمات
  const words = [
    { id: "it", label: "it" },
    { id: "her", label: "her" },
    { id: "them1", label: "them" },
    { id: "them2", label: "them" },
    { id: "you", label: "you" },
    { id: "us", label: "us" },
  ];

  const correctAnswers = {
    1: "it",
    2: "her",
    3: "them",
    4: "them",
    5: "you",
  };

  const questions = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
  ];

  // صوت عند الضغط فقط
  const playClickSound = () => {
    const audio = new Audio("/sounds/click.mp3");
    audio.currentTime = 0;
    audio.play();
  };

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const cleanValue = draggableId.replace("1", "").replace("2", "");

    setUserAnswers((prev) => ({
      ...prev,
      [destination.droppableId]: cleanValue,
    }));
  };

  const checkAnswers = () => {
    const empty = Object.values(userAnswers).some((v) => !v?.trim());
    if (empty) {
      ValidationAlert.info("كمل كل الفراغات");
      return;
    }

    let score = 0;

    Object.keys(correctAnswers).forEach((id) => {
      if (
        userAnswers[id]?.toLowerCase().trim() ===
        correctAnswers[id].toLowerCase()
      ) {
        score++;
      }
    });

    setChecked(true);

    if (score === 5) ValidationAlert.success(`Perfect ${score}/5`);
    else if (score >= 3) ValidationAlert.warning(`Good ${score}/5`);
    else ValidationAlert.error(`${score}/5`);
  };

  const handleStartAgain = () => {
    setUserAnswers({ 1: "", 2: "", 3: "", 4: "", 5: "" });
    setChecked(false);
  };

  // تقسيم صفين
  const row1 = words.slice(0, 3);
  const row2 = words.slice(3);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
        <div style={{ width: "100%", maxWidth: "900px", display: "flex", flexDirection: "column", gap: "12px" }}>

          {/* الكلمات */}
          <Droppable droppableId="words">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  padding: "8px",
                  border: "2px dashed #ccc",
                  borderRadius: "10px",
                }}
              >
                <QuestionAudioPlayer/>

                {/* الصف الأول */}
                <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                  {row1.map((word, index) => (
                    <Draggable
                      key={word.id}
                      draggableId={word.id}
                      index={index}
                      isDragDisabled={checked}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={playClickSound}
                          style={{
                            padding: "5px 12px",
                            border: "2px solid #2c5287",
                            borderRadius: "8px",
                            background: "white",
                            cursor: "grab",
                            fontSize: "14px",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {word.label}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>

                {/* الصف الثاني */}
                <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                  {row2.map((word, index) => (
                    <Draggable
                      key={word.id}
                      draggableId={word.id}
                      index={index + 3}
                      isDragDisabled={checked}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={playClickSound}
                          style={{
                            padding: "5px 12px",
                            border: "2px solid #2c5287",
                            borderRadius: "8px",
                            background: "white",
                            cursor: "grab",
                            fontSize: "14px",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {word.label}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>

                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* الأسئلة */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "10px",
            }}
          >
            {questions.map((q) => (
              <Droppable key={q.id} droppableId={String(q.id)}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      border: "2px solid #ddd",
                      borderRadius: "10px",
                      padding: "6px",
                      textAlign: "center",
                      background: "#fff",
                      minHeight: "120px",
                    }}
                  >
                    <img
                      src={q.image}
                      alt=""
                      style={{
                        width: "100%",
                        height: "90px",
                        objectFit: "contain",
                      }}
                    />

                    <div style={{ borderBottom: "2px solid #000", minHeight: "26px" }}>
                      {userAnswers[q.id]}
                      {checked &&
                        userAnswers[q.id] !== correctAnswers[q.id] && (
                          <span style={{ color: "red", marginLeft: "4px" }}>✕</span>
                        )}
                    </div>

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>

          <Button
            handleShowAnswer={() => setUserAnswers(correctAnswers)}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default WB_Unit7_Page44_Q2;