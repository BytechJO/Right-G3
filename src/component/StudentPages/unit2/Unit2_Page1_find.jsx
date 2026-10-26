import React from "react";

import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/test.png";

import MySVG from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Interactive.svg";
import targetAudio from "../../../assets/audio/ClassBook/Unit 2/P 10/carriage.mp3";

import FindQuestion from "../../FindQuestion";
const targetArea = {
  x1: 35.53,
  y1: 65.6,
  x2: 67.7,
  y2: 90,
};

const Unit2_Page1_find = () => {
  return (
    <FindQuestion
      title="I need your help. Can you help me find the carriage in the picture?"
      subtitle="Look carefully at the picture, then tap the carriage."
      image={backgroundImage}
      imageAlt="A summer vacation scene with people, travel-related objects, and a carriage in the picture."
      targetName="carriage"
      targetArea={targetArea}
      answerHighlight={MySVG}
      targetAudio={targetAudio}
      imageHeight="70vh"
      highlightTop="65.5%"
      highlightLeft="35.5%"
      highlightHeight="22%"
      targetAriaLabel="Select the carriage"
      pointerSelectedMessage="A point in the picture was selected. Use Check Answer to check it."
      keyboardSelectedMessage="Carriage selected. Use Check Answer to check your answer."
      correctAnnouncement="Correct. You found the carriage."
      correctAlertMessage="You found the carriage! 🏆"
      wrongAnnouncement="That is not the carriage. Try again."
      wrongAlertMessage="This is not the carriage. Try again!"
      resetAnnouncement="Activity reset. Find the carriage in the picture."
      showAnswerAnnouncement="The carriage is highlighted."
    />
  );
};

export default Unit2_Page1_find;
