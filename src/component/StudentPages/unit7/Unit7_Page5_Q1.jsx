import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 8.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 9.svg";
import img10 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A 10.svg";


const Unit7_Page5_Q1 = () => {
  const [userAnswers, setUserAnswers] = useState({
    1: "", 2: "", 3: "", 4: "", 5: "",
    6: "", 7: "", 8: "", 9: "", 10: "",
  });

  const [checked, setChecked] = useState(false);

  const words = ["j", "d", "h", "f", "b", "r", "c", "d", "v", "w"];

  const correctAnswers = {
    1: "f", 2: "b", 3: "j", 4: "c", 5: "d",
    6: "r", 7: "d", 8: "h", 9: "v", 10: "w",
  };

  const questions = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
    { id: 6, image: img6 },
    { id: 7, image: img7 },
    { id: 8, image: img8 },
    { id: 9, image: img9 },
    { id: 10, image: img10 },
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
      if (
        userAnswers[id]?.toLowerCase().trim() ===
        correctAnswers[id].toLowerCase()
      ) {
        score++;
      }
    });

    setChecked(true);

    if (score === 10) {
      ValidationAlert.success(`Perfect ${score}/10`);
    } else if (score >= 5) {
      ValidationAlert.warning(`Good ${score}/10`);
    } else {
      ValidationAlert.error(`${score}/10`);
    }
  };

  const handleStartAgain = () => {
    setUserAnswers({
      1: "", 2: "", 3: "", 4: "", 5: "",
      6: "", 7: "", 8: "", 9: "", 10: "",
    });
    setChecked(false);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <div style={{ width: "100%", maxWidth: "900px", display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* الكلمات */}
          <Droppable droppableId="words" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  padding: "10px",
                  border: "2px dashed #ccc",
                  borderRadius: "10px",
                  justifyContent: "center",
                }}
              >
                {words.map((word, index) => (
                  <Draggable
                    key={`${word}-${index}`}
                    draggableId={`${word}-${index}`}
                    index={index}
                    isDragDisabled={checked}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: "8px 14px",
                          border: "2px solid #2c5287",
                          borderRadius: "8px",
                          background: "white",
                          cursor: "grab",
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

          {/* الأسئلة بالصور */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "12px",
            }}
          >
            {questions.map((q) => (
              <div
                key={q.id}
                style={{
                  border: "2px solid #ddd",
                  borderRadius: "12px",
                  padding: "6px",
                  textAlign: "center",
                  background: "#fff",
                }}
              >
                <img
                  src={q.image}
                  alt={`q${q.id}`}
                  style={{
                    width: "100%",
                    height: "90px",
                    objectFit: "contain",
                    borderRadius: "10px",
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
                        minHeight: "28px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "14px",
                      }}
                    >
                      {userAnswers[q.id]}

                      {checked && userAnswers[q.id] !== correctAnswers[q.id] && (
                        <span style={{ color: "red", marginLeft: "5px" }}>✕</span>
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

export default Unit7_Page5_Q1;