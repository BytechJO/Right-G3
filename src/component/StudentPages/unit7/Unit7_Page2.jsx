import React from "react";

import page_2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 59.png";

import sound1 from "../../../assets/audio/ClassBook/Unit 7/P 59/Pg59_2.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 7/P 59/Pg59_2.2_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 7/P 59/Pg59_2.3_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 7/P 59/Pg59_2.4_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 7/P 59/Pg59_2.5_Adult Lady.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 7/P 59/Pg59_2.6_Adult Lady.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 7/P 59/Pg59_2.7_Adult Lady.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 7/P 59/Pg59_2.8_Adult Lady.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 7/P 59/Pg59_2.9_Adult Lady.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 7/P 59/Pg59_2.10_Adult Lady.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 7/P 59/Pg59_2.11_Adult Lady.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 7/P 59/Pg59_2.12_Adult Lady.mp3";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-12.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-13.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-14.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-15.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-16.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-17.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-18.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-19.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-20.svg";
import img10 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-21.svg";
import img11 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-22.svg";
import img12 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-23.svg";

import Rabbit from "../../../assets/Page 01/Rabbit.svg";

import soundListen from "../../../assets/audio/ClassBook/Unit 7/P 59/unit7-pg59-reading.mp3";

import img1_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/Asset 40.svg";
import img2_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/Asset 39.svg";

import repeat from "../../../assets/audio/ClassBook/Unit 7/P 59/unit7-pg59-bebo&lolo.mp3";
import read from "../../../assets/imgs/P1 listen and repeat 01.svg";

import Bebo from "../../../assets/audio/ClassBook/Unit 7/P 59/Pg59_1.1_Bebo.mp3";
import Lolo from "../../../assets/audio/ClassBook/Unit 7/P 59/Pg59_1.2_Lolo.mp3";

import letterSound from "../../../assets/audio/ClassBook/Unit 7/P 59/unit7-pg59-listen.mp3";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import GridImagesWithAudio from "../../GridImagesWithAudio";

const Unit7_Page2 = ({ openPopup }) => {
  const imageSounds = [
    null,
    new Audio(sound1),
    new Audio(sound2),
    new Audio(sound3),
    new Audio(sound4),
    new Audio(sound5),
    new Audio(sound6),
    new Audio(sound7),
    new Audio(sound8),
    new Audio(sound9),
    new Audio(sound10),
    new Audio(sound11),
    new Audio(sound12),
  ];

  const repeatSounds = [null, new Audio(Bebo), new Audio(Lolo)];

  const captionsExample = [
    {
      start: 0.419,
      end: 3.0,
      text: "Page 59 reading. Listen and read along.",
    },
    {
      start: 3.0,
      end: 7.5,
      text: "The new boy in school.",
    },
    {
      start: 7.5,
      end: 11.5,
      text: "It is Tommy's first day in a new school.",
    },
    {
      start: 11.5,
      end: 14.5,
      text: "He doesn't know anyone.",
    },
    {
      start: 14.5,
      end: 18.5,
      text: "A boy walks up to him smiling.",
    },
    {
      start: 18.5,
      end: 22.5,
      text: "Hey, I'm Larry. What's your name?",
    },
    {
      start: 22.5,
      end: 26.0,
      text: "I'm Tommy. I'm new here.",
    },
    {
      start: 26.0,
      end: 30.0,
      text: "I'm trying to find my class.",
    },
    {
      start: 30.0,
      end: 34.18,
      text: "I'll show you around, says Larry.",
    },
    {
      start: 36.04,
      end: 39.5,
      text: "Tommy smiles and follows Larry to a classroom on the left.",
    },
    {
      start: 39.5,
      end: 43.519,
      text: "They go inside. This is your class, says Larry.",
    },
    {
      start: 45.099,
      end: 48.5,
      text: "That's the teacher's desk next to the bookshelf.",
    },
    {
      start: 48.5,
      end: 52.02,
      text: "Students put their backpacks in the closet over there.",
    },
    {
      start: 53.119,
      end: 56.5,
      text: "Where is the computer lab? asks Tommy.",
    },
    {
      start: 56.5,
      end: 60.0,
      text: "It's between the cafeteria and my class.",
    },
    {
      start: 60.0,
      end: 64.0,
      text: "Is the gym room far from here?",
    },
    {
      start: 64.0,
      end: 67.5,
      text: "No, it's not. It's in front of the school library.",
    },
    {
      start: 67.5,
      end: 70.5,
      text: "What time is recess? asks Tommy.",
    },
    {
      start: 70.5,
      end: 73.5,
      text: "It's at one o'clock.",
    },
    {
      start: 73.5,
      end: 78.0,
      text: "The playground is behind the school.",
    },
    {
      start: 78.0,
      end: 83.0,
      text: "I'll see you later. I have to get to my class.",
    },
    {
      start: 83.0,
      end: 87.0,
      text: "Thanks, Larry, says Tommy.",
    },
  ];

  const captions2 = [
    {
      start: 0,
      end: 3.56,
      text: "Page 59. Listen and read along.",
    },
    {
      start: 4.38,
      end: 14.9,
      text: "Consonant review. Rabbit, cake, queen, duck, six, fish, vet, sing, leg, zero, jacket",
    },
  ];

  const captions3 = [
    {
      start: 0.319,
      end: 4.399,
      text: "Page 59. Listen, read, and repeat.",
    },
    {
      start: 4.4,
      end: 7.159,
      text: "What time is it? It's 2 o'clock.",
    },
  ];

  const openMainAudio = () => {
    openPopup(
      "audio",
      <AudioWithCaption
        src={soundListen}
        captions={captionsExample}
        pageId="unit7-page59-main-audio"
      />,
    );
  };

  const openRepeat = () => {
    openPopup(
      "html",
      <FourImagesWithAudio
        images={[read, img1_conversation, img2_conversation]}
        audioSrc={repeat}
        checkpoints={[0, 4.5, 6.1]}
        popupOpen={true}
        titleQ="Listen, read, and repeat."
        pageId="unit7-page59-repeat"
        subHeader="Press Play, then tap each card to hear it again."
        audioArr={repeatSounds}
        captions={captions3}
      />,
    );
  };

  const openRead = () => {
    openPopup(
      "html",
      <GridImagesWithAudio
        images={[
          Rabbit,
          img1,
          img2,
          img3,
          img4,
          img5,
          img6,
          img7,
          img8,
          img9,
          img10,
          img11,
          img12,
        ]}
        audioSrc={letterSound}
        checkpoints={[
          0, 4.44, 5.86, 6.84, 7.52, 8.42, 9.38, 10.2, 10.98, 11.86, 12.8,
          13.74, 14.7,
        ]}
        popupOpen={true}
        titleQ="Listen and read along."
        audioArr={imageSounds}
        pageId="unit7-page59-read"
        subHeader="Press Play, follow each word or picture, then tap a card to replay it if needed."
        captions={captions2}
      />,
    );
  };

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_2})` }}
    >
      <div
        className="headset-icon-CD-unit5-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 7 page 59 reading audio"
          onClick={openMainAudio}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openMainAudio();
            }
          }}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

      <div
        className="absolute bottom-[44%] right-[51%] hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open listen, read, and repeat activity"
          onClick={openRepeat}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openRepeat();
            }
          }}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

      <div
        className="absolute bottom-[25%] right-[42%] hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open consonant review activity"
          onClick={openRead}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openRead();
            }
          }}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
    </div>
  );
};

export default Unit7_Page2;
