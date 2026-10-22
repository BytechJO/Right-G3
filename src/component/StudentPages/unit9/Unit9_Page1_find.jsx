import React from "react";

import find_img from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Untitled-2 (1).png";
import MySVG from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Interactive.svg";

import FindQuestion from "../../FindQuestion";

import targetAudio from "../../../assets/audio/ClassBook/Unit 9/page 76/seesaw.mp3";

const targetArea = {
  x1: 43.4,
  y1: 76.8,
  x2: 59.05,
  y2: 82.44,
};

const Unit5_Page1_find = () => {
  return (
    <FindQuestion
      title="I need your help. Can you help me find the seesaw in the picture?"
      subtitle="Look carefully at the picture, then tap the seesaw."
      image={find_img}
      imageAlt="A town scene with different buildings, roads, vehicles, people, and a playground"
      targetName="seesaw"
      targetArea={targetArea}
      targetAudio={targetAudio}
      answerHighlight={MySVG}
      imageHeight="70vh"
      highlightTop="77.4%"
      highlightLeft="45.2%"
      highlightHeight="4.5%"
      targetAriaLabel="Select the seesaw"
      pointerSelectedMessage="A point in the picture was selected. Use Check Answer to check it."
      keyboardSelectedMessage="The seesaw was selected. Use Check Answer to check your answer."
      correctAnnouncement="Correct. You found the seesaw."
      correctAlertMessage="You found the seesaw! 🏆"
      wrongAnnouncement="That is not the seesaw. Try again."
      wrongAlertMessage="This is not the seesaw. Try again!"
      resetAnnouncement="Activity reset. Find the seesaw in the picture."
      showAnswerAnnouncement="The seesaw is highlighted."
    />
  );
};

export default Unit5_Page1_find;
