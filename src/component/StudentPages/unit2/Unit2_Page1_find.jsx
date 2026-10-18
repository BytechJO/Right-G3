import React from "react";

import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/G5_U2_Pg_10.png";

import MySVG from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Interactive.svg";

import FindQuestion from "../../FindQuestion";

const targetArea = {
  x1: 36.53,
  y1: 76.6,
  x2: 60.7,
  y2: 91.0,
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
      imageHeight="70vh"
      highlightTop="76.5%"
      highlightLeft="35.5%"
      highlightHeight="15%"
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
