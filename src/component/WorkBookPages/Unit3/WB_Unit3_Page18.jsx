import React from "react";

import page2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 14.png";
import "./WB_unit1.css";

import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const WB_Unit3_Page18 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page2})` }}
    >
      <div
        className="q7-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open exercise 1"
          onClick={() => openPopup("exercise", { startIndex: 32 })}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPopup("exercise", { startIndex: 32 });
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
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>

      <div
        className="q8-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open exercise 2"
          onClick={() => openPopup("exercise", { startIndex: 33 })}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPopup("exercise", { startIndex: 33 });
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
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
    </div>
  );
};

export default WB_Unit3_Page18;
