import React from "react";

import page_2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page 17.png";
import "./Review1_Page2.css";

import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const Review1_Page2 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_2})` }}
    >
      <div
        className="click-icon-review1-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open exercise 1"
          onClick={() => openPopup("exercise", { startIndex: 14 })}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPopup("exercise", { startIndex: 14 });
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

      <div
        className="click-icon-review1-page2-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open exercise 2"
          onClick={() => openPopup("exercise", { startIndex: 15 })}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPopup("exercise", { startIndex: 15 });
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

      <div
        className="click-icon-review1-page2-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open exercise 3"
          onClick={() => openPopup("exercise", { startIndex: 16 })}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPopup("exercise", { startIndex: 16 });
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

export default Review1_Page2;
