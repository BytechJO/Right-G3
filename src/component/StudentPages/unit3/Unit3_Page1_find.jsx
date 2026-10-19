import React from "react";

import find_img from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/G5_U3_Pg_22.png";
import MySVG from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 22-23/Interactive Svg.svg";

import FindQuestion from "../../FindQuestion";

const targetArea = {
  x1: 60,
  y1: 13,
  x2: 68,
  y2: 24.5,
};
// top: 13%;
//     left: 59%;
//     height: 9.5%;
const Unit3_Page1_find = () => {
  return (
    <FindQuestion
      title="Can you help me find the green pepper in the picture?"
      subtitle="Scan the whole picture first, then tap the green peppers."
      image={find_img}
      imageAlt="A shopping scene with different items, including green peppers."
      targetName="green peppers"
      targetArea={targetArea}
      answerHighlight={MySVG}
      imageHeight="70vh"
      highlightTop="13%"
      highlightLeft="59%"
      highlightHeight="9.5%"
      highlightImageStyle={{
        width: "8%",
      }}
      targetAriaLabel="Select the green peppers"
      pointerSelectedMessage="A point in the picture was selected. Use Check Answer to check it."
      keyboardSelectedMessage="Green peppers selected. Use Check Answer to check your answer."
      correctAnnouncement="Correct. You found the green peppers."
      correctAlertMessage="You found the green peppers! 🏆"
      wrongAnnouncement="Those are not the green peppers. Try again."
      wrongAlertMessage="These are not the green peppers. Try again!"
      resetAnnouncement="Activity reset. Find the green peppers in the picture."
      showAnswerAnnouncement="The green peppers are highlighted."
    />
  );
};

export default Unit3_Page1_find;
