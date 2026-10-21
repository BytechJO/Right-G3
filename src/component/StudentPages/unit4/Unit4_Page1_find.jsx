import React from "react";

import find_img from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/G5_U4_Pg_28.png";
import MySVG from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 28-29/interactive Svg.svg";

import FindQuestion from "../../FindQuestion";

import targetAudio from "../../../assets/audio/ClassBook/Unit 4/page 28/umbrella.mp3";

const targetArea = {
  x1: 59.345,
  y1: 76.88,
  x2: 70.06,
  y2: 94.56,
};

const Unit4_Page1_find = () => {
  return (
    <FindQuestion
      title="Can you help me find the umbrella in the picture?"
      subtitle="Scan the whole picture first, then tap the umbrella."
      image={find_img}
      imageAlt="A girl sitting on a sofa using a laptop in a living room, with a chat window and pictures displayed on the screen"
      targetName="umbrella"
      targetArea={targetArea}
      targetAudio={targetAudio}
      answerHighlight={MySVG}
      imageHeight="70vh"
      highlightTop="78%"
      highlightLeft="60%"
      highlightHeight="14%"
      highlightImageStyle={{
        transform: "translate(-50%, -50%)",
      }}
      targetAriaLabel="Select the umbrella"
      pointerSelectedMessage="A point in the picture was selected. Use Check Answer to check it."
      keyboardSelectedMessage="Umbrella selected. Use Check Answer to check your answer."
      correctAnnouncement="Correct. You found the umbrella."
      correctAlertMessage="You found the umbrella! 🏆"
      wrongAnnouncement="That is not the umbrella. Try again."
      wrongAlertMessage="This is not the umbrella. Try again!"
      resetAnnouncement="Activity reset. Find the umbrella in the picture."
      showAnswerAnnouncement="The umbrella is highlighted."
    />
  );
};

export default Unit4_Page1_find;
