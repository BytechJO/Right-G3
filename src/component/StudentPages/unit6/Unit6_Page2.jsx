import React from "react";

import page_2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 47.png";

import img1_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/1-05.svg";
import img2_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/1-06.svg";
import img3_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/1-07.svg";
import img4_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/1-08.svg";

import Rabbit from "../../../assets/Page 01/Rabbit.svg";

import soundListen from "../../../assets/audio/ClassBook/Unit 6/P 47/unit6-pg47-reading.mp3";

import img1_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/Asset 38.svg";
import img2_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/Asset 37.svg";

import sound1_letter from "../../../assets/audio/ClassBook/Unit 6/P 47/Pg47_2.1_Adult Lady.mp3";
import sound2_letter from "../../../assets/audio/ClassBook/Unit 6/P 47/Pg47_2.2_Adult Lady.mp3";
import sound3_letter from "../../../assets/audio/ClassBook/Unit 6/P 47/Pg47_2.3_Adult Lady.mp3";
import sound4_letter from "../../../assets/audio/ClassBook/Unit 6/P 47/Pg47_2.4_Adult Lady.mp3";

import read from "../../../assets/imgs/P1 listen and repeat 01.svg";

import letterSound from "../../../assets/audio/ClassBook/Unit 6/P 47/unit6-page47-listen.mp3";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";

import Bebo from "../../../assets/audio/ClassBook/Unit 6/P 47/Pg47_1.1_Bebo.mp3";
import Lolo from "../../../assets/audio/ClassBook/Unit 6/P 47/Pg47_1.2_Lolo.mp3";

import repeat from "../../../assets/audio/ClassBook/Unit 6/P 47/unit6-page47-bebo&lolo.mp3";

import "./Unit6_Page2.css";

const Unit6_Page2 = ({ openPopup }) => {
  const imageSounds = [
    null,
    new Audio(sound1_letter),
    new Audio(sound2_letter),
    new Audio(sound3_letter),
    new Audio(sound4_letter),
  ];

  const repeatSounds = [null, new Audio(Bebo), new Audio(Lolo)];

  const captions3 = [
    {
      start: 0.399,
      end: 5.139,
      text: "Page 47. Listen, read, and repeat.",
    },
    {
      start: 5.139,
      end: 9.259,
      text: "We must water the plants. We must also give them sun",
    },
  ];

  const captionsExample = [
    {
      start: 0.179,
      end: 6.699,
      text: "Page 47 reading. Listen and read along. I Love My Garden",
    },
    {
      start: 6.699,
      end: 41.359,
      text: "Welcome to my garden. Do you like it? Gardening is one of my favorite hobbies. Seeing bright colors in my garden makes me feel happy. Today is Saturday, and I'm planting a young tree in my garden. I hope it will grow very tall. I usually begin planting a little before springtime. March and April are the perfect months for planting. I must water my garden regularly to keep my plants healthy. I recommend that everyone start a garden. It's so much fun",
    },
  ];

  const captions2 = [
    {
      start: 0,
      end: 3.18,
      text: "Page 47. Listen and read along.",
    },
    {
      start: 3.2,
      end: 7.01,
      text: "FL, PL, SL. Fly, plum, slide",
    },
  ];

  const openMainAudio = () => {
    openPopup(
      "audio",
      <AudioWithCaption
        src={soundListen}
        captions={captionsExample}
        pageId="unit6-page47-main-audio"
      />,
    );
  };

  const openRepeat = () => {
    openPopup(
      "html",
      <FourImagesWithAudio
        images={[read, img1_conversation, img2_conversation]}
        audioSrc={repeat}
        checkpoints={[0, 5.14, 7]}
        popupOpen={true}
        titleQ="Listen, read, and repeat."
        subHeader="Press Play, then tap each card to hear it again."
        audioArr={repeatSounds}
        pageId="unit6-page47-repeat"
        captions={captions3}
      />,
    );
  };

  const openRead = () => {
    openPopup(
      "html",
      <FourImagesWithAudio
        images={[Rabbit, img1_letter, img2_letter, img3_letter, img4_letter]}
        audioSrc={letterSound}
        checkpoints={[0, 4.3, 7.82, 8.8, 9.52]}
        popupOpen={true}
        titleQ="Listen and read along."
        pageId="unit6-page47-read"
        subHeader="Press Play, follow each word or picture, then tap a card to replay it if needed."
        audioArr={imageSounds}
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
        className="headset-icon-CD-unit6-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 6 page 47 reading audio"
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
        className="headset-icon-CD-unit6-page2-2 hover:scale-110 transition"
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
        className="click-icon-unit6-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open listen and read activity"
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

export default Unit6_Page2;
