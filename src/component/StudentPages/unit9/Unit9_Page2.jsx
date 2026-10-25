import React from "react";

import page_2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 77.png";

import img1_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 76-77/1-05.svg";
import img2_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 76-77/1-06.svg";
import img3_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 76-77/1-07.svg";
import img4_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 76-77/1-08.svg";

import Rabbit from "../../../assets/Page 01/Rabbit.svg";

import soundListen from "../../../assets/audio/ClassBook/Unit 9/P 77/unit9-pg77-reading.mp3";

import img1_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 76-77/Asset 43.svg";
import img2_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 76-77/Asset 44.svg";

import sound1_letter from "../../../assets/audio/ClassBook/Unit 9/P 77/Pg77_2.1_Adult Lady.mp3";
import sound2_letter from "../../../assets/audio/ClassBook/Unit 9/P 77/Pg77_2.2_Adult Lady.mp3";
import sound3_letter from "../../../assets/audio/ClassBook/Unit 9/P 77/Pg77_2.3_Adult Lady.mp3";
import sound4_letter from "../../../assets/audio/ClassBook/Unit 9/P 77/Pg77_2.4_Adult Lady.mp3";

import letterSound from "../../../assets/audio/ClassBook/Unit 9/P 77/unit9-pg77-listen.mp3";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";

import read from "../../../assets/imgs/P1 listen and repeat 01.svg";

import repeat from "../../../assets/audio/ClassBook/Unit 9/P 77/unit9-pg77-bebo&lolo.mp3";
import Bebo from "../../../assets/audio/ClassBook/Unit 9/P 77/Pg77_1.1_Bebo.mp3";
import Lolo from "../../../assets/audio/ClassBook/Unit 9/P 77/Pg77_1.2_Lolo.mp3";

import "./Unit9_Page2.css";

const Unit9_Page2 = ({ openPopup }) => {
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
      start: 0.079,
      end: 4.279,
      text: "Page 77. Listen, read, and repeat",
    },
    {
      start: 4.279,
      end: 5.299,
      text: "Let's meet tomorrow.",
    },
    {
      start: 6.379,
      end: 7.459,
      text: "Okay, sounds good",
    },
  ];

  const captionsExample = [
    {
      start: 0.14,
      end: 6.979,
      text: "Page 77 reading. Listen and read along. A brave mouse",
    },
    {
      start: 6.98,
      end: 54.639,
      text: "I'm a brave mouse. I visit many places every day. I was at school today. I got a full mark. In the afternoon, I was in the park. There is a big fat cat in the park. What? A cat? I'm scared of cats. I was at the bus stop. My friend was there. We took a bus and went to a restaurant. We had two glasses of orange juice. I've just returned home. There was cheese in my house. Mm, I like cheese. There was a trap in the house. What? A trap? I'm scared of traps. I'm a brave mouse, but I'm scared, scared of traps. Squeak, snap, squeak, snap",
    },
  ];

  const captions2 = [
    {
      start: 0,
      end: 3.32,
      text: "Page 77. Listen and read along.",
    },
    {
      start: 3.84,
      end: 7.01,
      text: "S: bags, girls, peas",
    },
  ];

  const openMainAudio = () => {
    openPopup(
      "audio",
      <AudioWithCaption
        src={soundListen}
        captions={captionsExample}
        pageId="unit9-page77-main-audio"
      />,
    );
  };

  const openRepeat = () => {
    openPopup(
      "html",
      <FourImagesWithAudio
        images={[read, img2_conversation, img1_conversation]}
        audioSrc={repeat}
        checkpoints={[0, 4, 6.04]}
        popupOpen={true}
        titleQ="Listen, read, and repeat."
        pageId="unit9-page77-repeat"
        subHeader="Press Play, then tap each card to hear it again."
        audioArr={repeatSounds}
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
        checkpoints={[0, 3.54, 4.72, 5.56, 6.36]}
        popupOpen={true}
        titleQ="Listen and read along."
        audioArr={imageSounds}
        subHeader="Press Play, follow each word or picture, then tap a card to replay it if needed."
        pageId="unit9-page77-read"
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
        className="headset-icon-CD-unit9-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 9 page 77 reading audio"
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
        className="headset-icon-CD-unit9-page2-2 hover:scale-110 transition"
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
        className="click-icon-unit9-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open listen and read along activity"
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

export default Unit9_Page2;
