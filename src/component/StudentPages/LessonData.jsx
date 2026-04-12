// UNIT 1
import Page8_Q1 from "./unit1/Page8_Q1";
import Page8_Q2 from "./unit1/Page8_Q2";
import Page8_Q3 from "./unit1/Page8_Q3";
import Page8_Q4 from "./unit1/Page8_Q4";
import Page9_Q1 from "./unit1/Page9_Q1";
import Page9_Q2 from "./unit1/Page9_Q2";
// UNIT 2
import Unit2_Page5_Q1 from "./unit2/Unit2_Page5_Q1";
import Unit2_Page5_Q2 from "./unit2/Unit2_Page5_Q2";
import Unit2_Page5_Q3 from "./unit2/Unit2_Page5_Q3";
import Unit2_Page5_Q4 from "./unit2/Unit2_Page5_Q4";
import Unit2_Page6_Q1 from "./unit2/Unit2_Page6_Q1";
import Unit2_Page6_Q2 from "./unit2/Unit2_Page6_Q2";
//review1&2
import Review1_Page1_Q1 from "./review1&2/Review1_Page1_Q1";
import Review1_Page1_Q2 from "./review1&2/Review1_Page1_Q2";
import Review1_Page2_Q1 from "./review1&2/Review1_Page2_Q1";
import Review1_Page2_Q2 from "./review1&2/Review1_Page2_Q2";
import Review1_Page2_Q3 from "./review1&2/Review1_Page2_Q3";

import Review2_Page1_Q1 from "./review1&2/Review2_Page1_Q1";
import Review2_Page1_Q2 from "./review1&2/Review2_Page1_Q2";
import Review2_Page2_Q1 from "./review1&2/Review2_Page2_Q1";
import Review2_Page2_Q2 from "./review1&2/Review2_Page2_Q2";
import Review2_Page2_Q3 from "./review1&2/Review2_Page2_Q3";

//unit3
import Unit3_Page5_Q1 from "./unit3/Unit3_Page5_Q1";
import Unit3_Page5_Q2 from "./unit3/Unit3_Page5_Q2";
import Unit3_Page5_Q3 from "./unit3/Unit3_Page5_Q3";
import Unit3_Page6_Q1 from "./unit3/Unit3_Page6_Q1";
import Unit3_Page6_Q2 from "./unit3/Unit3_Page6_Q2";

// unit4
import Unit4_Page5_Q1 from "./unit4/Unit4_Page5_Q1";
import Unit4_Page5_Q2 from "./unit4/Unit4_Page5_Q2";
import Unit4_Page5_Q3 from "./unit4/Unit4_Page5_Q3";
import Unit4_Page6_Q1 from "./unit4/Unit4_Page6_Q1";
import Unit4_Page6_Q2 from "./unit4/Unit4_Page6_Q2";

//review3&4
import Review3_Page1_Q1 from "./review3&4/Review3_Page1_Q1";
import Review3_Page1_Q2 from "./review3&4/Review3_Page1_Q2";
import Review3_Page2_Q1 from "./review3&4/Review3_Page2_Q1";
import Review3_Page2_Q2 from "./review3&4/Review3_Page2_Q2";
import Review3_Page2_Q3 from "./review3&4/Review3_Page2_Q3";

import Review4_Page1_Q1 from "./review3&4/Review4_Page1_Q1";
import Review4_Page1_Q2 from "./review3&4/Review4_Page1_Q2";
import Review4_Page1_Q3 from "./review3&4/Review4_Page1_Q3";
import Review4_Page2_Q1 from "./review3&4/Review4_Page2_Q1";
import Review4_Page2_Q2 from "./review3&4/Review4_Page2_Q2";
import Review4_Page2_Q3 from "./review3&4/Review4_Page2_Q3";

// unit 7
import Unit7_Page5_Q1 from "./unit7/Unit7_Page5_Q1";
import Unit7_Page5_Q2 from "./unit7/Unit7_Page5_Q2";
import Unit7_Page5_Q3 from "./unit7/Unit7_Page5_Q3";
import Unit7_Page5_Q4 from "./unit7/Unit7_Page5_Q4";

import Unit7_Page6_Q1 from "./unit7/Unit7_Page6_Q1";
import Unit7_Page6_Q2 from "./unit7/Unit7_Page6_Q2";

export const lessons = [
  // UNIT 1
  { component: Page8_Q1, unit: 1 }, //0
  { component: Page8_Q2, unit: 1 }, //1
  { component: Page8_Q3, unit: 1 }, //2
  { component: Page8_Q4, unit: 1 }, //3
  { component: Page9_Q1, unit: 1 }, //4
  { component: Page9_Q2, unit: 1, lastOfUnit: true }, //5

  // UNIT 2
  { component: Unit2_Page5_Q1, unit: 2 }, //6
  { component: Unit2_Page5_Q2, unit: 2 }, //7
  { component: Unit2_Page5_Q3, unit: 2 }, //8
  { component: Unit2_Page5_Q4, unit: 2 }, //9
  { component: Unit2_Page6_Q1, unit: 2 }, //10
  { component: Unit2_Page6_Q2, unit: 2, lastOfUnit: true }, //11

  //review1&2
  { component: Review1_Page1_Q1, unit: 2, isReview: true }, //12
  { component: Review1_Page1_Q2, unit: 2, isReview: true }, //13
  { component: Review1_Page2_Q1, unit: 2, isReview: true }, //14
  { component: Review1_Page2_Q2, unit: 2, isReview: true }, //15
  { component: Review1_Page2_Q3, unit: 2, isReview: true }, //16

  { component: Review2_Page1_Q1, unit: 2, isReview: true }, //17
  { component: Review2_Page1_Q2, unit: 2, isReview: true }, //18
  { component: Review2_Page2_Q1, unit: 2, isReview: true }, //19
  { component: Review2_Page2_Q2, unit: 2, isReview: true }, //20
  { component: Review2_Page2_Q3, unit: 2, isReview: true, lastOfUnit: true }, //21

  //unit3
  { component: Unit3_Page5_Q1, unit: 3 }, //22
  { component: Unit3_Page5_Q2, unit: 3 }, //23
  { component: Unit3_Page5_Q3, unit: 3 }, //24
  { component: Unit3_Page6_Q1, unit: 3 }, //25
  { component: Unit3_Page6_Q2, unit: 3, lastOfUnit: true }, //26

  //unit4
  { component: Unit4_Page5_Q1, unit: 4 }, //27
  { component: Unit4_Page5_Q2, unit: 4 }, //28
  { component: Unit4_Page5_Q3, unit: 4 }, //29
  { component: Unit4_Page6_Q1, unit: 4 }, //30
  { component: Unit4_Page6_Q2, unit: 4 }, //31

  //review3&4
  { component: Review3_Page1_Q1, unit: 4, isReview: true }, //32
  { component: Review3_Page1_Q2, unit: 4, isReview: true }, //33
  { component: Review3_Page2_Q1, unit: 4, isReview: true }, //34
  { component: Review3_Page2_Q2, unit: 4, isReview: true }, //35
  { component: Review3_Page2_Q3, unit: 4, isReview: true }, //36

  { component: Review4_Page1_Q1, unit: 4, isReview: true }, //37
  { component: Review4_Page1_Q2, unit: 4, isReview: true }, //38
  { component: Review4_Page1_Q3, unit: 4, isReview: true }, //39
  { component: Review4_Page2_Q1, unit: 4, isReview: true }, //40
  { component: Review4_Page2_Q2, unit: 4, isReview: true }, //41
  { component: Review4_Page2_Q3, unit: 4, isReview: true }, //42

  // { component: Unit7_Page5_Q1, unit: 7}, //32
  // { component: Unit7_Page5_Q2, unit: 7}, //33
  // { component: Unit7_Page5_Q3, unit: 7}, //34
  // { component: Unit7_Page5_Q4, unit: 7}, //35
  // { component: Unit7_Page6_Q1, unit: 7}, //36
  // { component: Unit7_Page6_Q2, unit: 7 , lastOfUnit: true }, //37
];
