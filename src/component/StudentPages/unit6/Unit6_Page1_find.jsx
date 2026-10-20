import React from "react";

import find_img from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/G5_U6_Pg_46.png";
import MySVG from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Interactive.svg";

import FindQuestion from "../../FindQuestion";

const targetArea = {
  x1: 39.12,
  y1: 42.4,
  x2: 53.9,
  y2: 97.2,
};
const Unit6_Page1_find = () => {
  return (
    <FindQuestion
      title="Can you help me find the girl in second place in the picture?"
      subtitle="Scan the whole picture first, then tap the girl in second place."
      image={find_img}
      imageAlt="Children running in an outdoor race, including a girl running near the front in second place"
      targetName="girl in second place"
      targetArea={targetArea}
      answerHighlight={MySVG}
      imageHeight="70vh"
      highlightTop="43%"
      highlightLeft="38%"
      highlightHeight="56%"
      targetAriaLabel="Select the girl in second place"
      pointerSelectedMessage="A point in the picture was selected. Use Check Answer to check it."
      keyboardSelectedMessage="The girl in second place was selected. Use Check Answer to check your answer."
      correctAnnouncement="Correct. You found the girl in second place."
      correctAlertMessage="You found the girl in second place! 🏆"
      wrongAnnouncement="That is not the girl in second place. Try again."
      wrongAlertMessage="This is not the girl in second place. Try again!"
      resetAnnouncement="Activity reset. Find the girl in second place in the picture."
      showAnswerAnnouncement="The girl in second place is highlighted."
    />
  );
};

export default Unit6_Page1_find;
