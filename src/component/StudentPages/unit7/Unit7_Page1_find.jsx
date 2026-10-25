import React from "react";

import find_img from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/G5_U7_Pg_58.png";
import MySVG from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Interactive svg.svg";
import FindQuestion from "../../FindQuestion";
import targetAudio from "../../../assets/audio/ClassBook/Unit 7/page 58/Item_001_drum.mp3";
const targetArea = {
  x1: 64,
  y1: 43,
  x2: 72,
  y2: 57.5,
};

const Unit7_Page1_find = () => {
  return (
    <FindQuestion
      title="Can you help me find a drum in the picture?"
      subtitle="Scan the whole picture first, then tap the drum."
      image={find_img}
      imageAlt="A school scene with children and different objects, including a drum"
      targetName="drum"
      targetArea={targetArea}
      targetAudio={targetAudio}
      answerHighlight={MySVG}
      imageHeight="70vh"
      highlightTop="43%"
      highlightLeft="64%"
      highlightWidth="8%"
      highlightHeight="12.5%"
      targetAriaLabel="Select the drum"
      pointerSelectedMessage="A point in the picture was selected. Use Check Answer to check it."
      keyboardSelectedMessage="The drum was selected. Use Check Answer to check your answer."
      correctAnnouncement="Correct. You found the drum."
      correctAlertMessage="You found the drum! 🏆"
      wrongAnnouncement="That is not the drum. Try again."
      wrongAlertMessage="This is not the drum. Try again!"
      resetAnnouncement="Activity reset. Find the drum in the picture."
      showAnswerAnnouncement="The drum is highlighted."
    />
  );
};

export default Unit7_Page1_find;
