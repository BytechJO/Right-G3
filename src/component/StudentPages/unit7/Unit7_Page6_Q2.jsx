import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 5.svg";

const Unit7_Page6_Q2 = () => {
  const [userAnswers, setUserAnswers] = useState({
    1: "", 2: "", 3: "", 4: "", 5: "",
  });
  const [checked, setChecked] = useState(false);

  const words = ["it", "her", "them", "you", "us"];

  const correctAnswers = {
    1: "it", 2: "her", 3: "them", 4: "them", 5: "you", 6: "us",
  };

  const questions = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
  ];

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;
    setUserAnswers((prev) => ({
      ...prev,
      [destination.droppableId]: draggableId,
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
      if (userAnswers[id]?.toLowerCase().trim() === correctAnswers[id].toLowerCase()) {
        score++;
      }
    });
    setChecked(true);
    if (score === 6) ValidationAlert.success(`Perfect ${score}/6`);
    else if (score >= 3) ValidationAlert.warning(`Good ${score}/6`);
    else ValidationAlert.error(`${score}/6`);
  };

  const handleStartAgain = () => {
    setUserAnswers({ 1: "", 2: "", 3: "", 4: "", 5: "" });
    setChecked(false);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
        <div style={{ width: "100%", maxWidth: "900px", display: "flex", flexDirection: "column", gap: "12px" }}>

          {/* عنوان التمرين */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              backgroundColor: "#f4a62a",
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
              padding: "2px 8px",
              borderRadius: "4px",
            }}>
              E
            </div>
            <span style={{ color: "#f4a62a", fontWeight: "bold", fontSize: "14px" }}>
              Look and write. Use the words below.
            </span>
          </div>

          {/* الكلمات */}
          <Droppable droppableId="words" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  padding: "8px",
                  border: "2px dashed #ccc",
                  borderRadius: "10px",
                  justifyContent: "center",
                }}
              >
                {words.map((word, index) => (
                  <Draggable
                    key={word}
                    draggableId={word}
                    index={index}
                    isDragDisabled={checked}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
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
                        {word}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* الصور - صف واحد 5 صور */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "10px",
          }}>
            {questions.map((q) => (
              <div
                key={q.id}
                style={{
                  border: "2px solid #ddd",
                  borderRadius: "10px",
                  padding: "6px",
                  textAlign: "center",
                  background: "#fff",
                }}
              >
                {/* رقم السؤال */}
                <div style={{ fontSize: "12px", fontWeight: "bold", textAlign: "left", marginBottom: "4px", color: "#333" }}>
                  {q.id}
                </div>

                <img
                  src={q.image}
                  alt={`q${q.id}`}
                  style={{
                    width: "100%",
                    height: "90px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />

                <Droppable droppableId={String(q.id)}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        marginTop: "6px",
                        borderBottom: "2px solid #000",
                        minHeight: "26px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "13px",
                      }}
                    >
                      {userAnswers[q.id]}
                      {checked && userAnswers[q.id] !== correctAnswers[q.id] && (
                        <span style={{ color: "red", marginLeft: "4px" }}>✕</span>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
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

export default Unit7_Page6_Q2;