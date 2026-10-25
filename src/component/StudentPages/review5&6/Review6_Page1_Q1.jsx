import React, { useState } from "react";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Button from "../../Button";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import useUnit4TabDrag from "../unit4/useUnit4TabDrag";
import { AnswerSlot, WordChip } from "./Review5_Page2_Q1";
import "../unit4/unit4Interactions.css";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 54/Ex A 1.svg";
import fourthAudio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/Item_001_fourth.mp3";
import secondAudio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/Item_002_second.mp3";
import thirdAudio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/Item_003_third.mp3";
import firstAudio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/Item_004_first.mp3";
import raceAudio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/Item_005_The_animals_are_in_a_race!.mp3";
import goAudio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/Item_006_Go,_go,_go!.mp3";
import fastAudio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/Item_007_Some_are_fast,.mp3";
import slowAudio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/Item_008_And_some_are_slow.mp3";
import henAudio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/Item_009_The_hen_is.mp3";
import rabbitAudio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/Item_010_The_rabbit_is.mp3";
import dogAudio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/Item_011_The_dog_is.mp3";
import horseAudio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/Item_012_The_horse_is.mp3";
import full1Audio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/full1.mp3";
import full2Audio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/full2.mp3";
import full3Audio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/full3.mp3";
import full4Audio from "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise A/full4.mp3";

const WORDS = [
  { id: "fourth", value: "fourth", audio: fourthAudio },
  { id: "second", value: "second", audio: secondAudio },
  { id: "third", value: "third", audio: thirdAudio },
  { id: "first", value: "first", audio: firstAudio },
];
const ITEMS = [
  { text: "The hen is", answer: "fourth", audio: henAudio, full: full1Audio },
  { text: "The rabbit is", answer: "second", audio: rabbitAudio, full: full2Audio },
  { text: "The dog is", answer: "third", audio: dogAudio, full: full3Audio },
  { text: "The horse is", answer: "first", audio: horseAudio, full: full4Audio },
];
const INTRO = [
  ["The animals are in a race!", raceAudio], ["Go, go, go!", goAudio],
  ["Some are fast,", fastAudio], ["And some are slow.", slowAudio],
];

export default function Review6_Page1_Q1() {
  const [answers, setAnswers] = useState(Array(ITEMS.length).fill(""));
  const [locked, setLocked] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeWord, setActiveWord] = useState(null);
  const used = answers.filter(Boolean);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const place = (wordId, targetId) => {
    const index = Number(String(targetId).replace("answer-", ""));
    if (locked.includes(index) || showAnswer) return;
    setAnswers((previous) => {
      const updated = previous.map((value) => value === wordId ? "" : value);
      updated[index] = wordId;
      return updated;
    });
    setWrong((previous) => previous.filter((id) => id !== index));
  };

  const keyboard = useUnit4TabDrag({
    itemIds: WORDS.map((word) => word.id),
    targetIds: ITEMS.map((_, index) => `answer-${index}`),
    isItemDisabled: (id) => used.includes(id) || showAnswer,
    isTargetDisabled: (id) => locked.includes(Number(String(id).replace("answer-", ""))) || showAnswer,
    onPick: (id) => { const word = WORDS.find((item) => item.id === id); if (word) playAudio(`word-${id}`, word.audio); },
    onPlace: place,
  });

  const remove = (index) => {
    if (locked.includes(index) || showAnswer) return;
    const removed = answers[index];
    setAnswers((previous) => previous.map((value, i) => i === index ? "" : value));
    setWrong((previous) => previous.filter((id) => id !== index));
    if (removed) keyboard.focusItem(removed);
  };

  const checkAnswers = () => {
    if (showAnswer || locked.length === ITEMS.length) return;
    if (answers.includes("")) { ValidationAlert.info(); return; }
    const correct = ITEMS.flatMap((item, index) => answers[index] === item.answer ? [index] : []);
    setLocked(correct);
    setWrong(ITEMS.flatMap((item, index) => answers[index] !== item.answer ? [index] : []));
    if (correct.length === ITEMS.length) ValidationAlert.success(`Score: ${correct.length} / ${ITEMS.length}`);
    else if (correct.length) ValidationAlert.warning(`Score: ${correct.length} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: 0 / ${ITEMS.length}`);
  };

  const reveal = () => {
    setAnswers(ITEMS.map((item) => item.answer)); setLocked(ITEMS.map((_, index) => index)); setWrong([]); setShowAnswer(true); keyboard.cancel(); stopAudio();
  };
  const reset = () => {
    setAnswers(Array(ITEMS.length).fill("")); setLocked([]); setWrong([]); setShowAnswer(false); setActiveWord(null); keyboard.cancel(); stopAudio();
  };

  return (
    <DndContext sensors={sensors} onDragStart={(event) => setActiveWord(String(event.active.id))} onDragCancel={() => setActiveWord(null)} onDragEnd={(event) => { if (event.over) place(String(event.active.id), String(event.over.id)); setActiveWord(null); }}>
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: 40 }}>
          <ExerciseHeaderReview sectionLetter="A" title="Read, look, and write. Use the words below." subTitle="Check each position from first to fourth, then drag the correct ordinal word to each place." />
          <div className="flex gap-6 p-2 justify-center w-full flex-wrap">
            {WORDS.map((word) => <WordChip key={word.id} item={word} used={used.includes(word.id)} register={keyboard.registerItem} pick={() => keyboard.pickItem(word.id)} play={() => playAudio(`word-${word.id}`, word.audio)} playing={activeAudioKey === `word-${word.id}`} />)}
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 30 }}>
            <img src={img1} alt="A horse, dog, rabbit, and hen racing toward the finish" style={{ width: "auto", height: 350 }} />
            <div style={{ display: "flex", height: 350, justifyContent: "space-between", flexDirection: "column" }}>
              <div style={{ marginBottom: 20, lineHeight: 1.6, fontSize: 18 }}>
                {INTRO.map(([text, audio], index) => <div key={text} role="button" tabIndex={0} className="unit4-audio-control unit4-interactive" onClick={() => playAudio(`intro-${index}`, audio)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); playAudio(`intro-${index}`, audio); } }}><Unit4PlayingAudioIcon active={activeAudioKey === `intro-${index}`} />{text}</div>)}
              </div>
              <div className="space-y-6">
                {ITEMS.map((item, index) => {
                  const fullEnabled = locked.includes(index);
                  const preview = keyboard.keyboardTargetId === `answer-${index}` ? keyboard.keyboardItemId : "";
                  return (
                    <div key={item.text} className={`unit4-audio-control ${fullEnabled ? "unit4-full-audio-enabled" : ""}`} role={fullEnabled ? "button" : undefined} tabIndex={fullEnabled ? 0 : -1} onClick={() => fullEnabled && playAudio(`full-${index}`, item.full)} onKeyDown={(event) => { if (fullEnabled && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); playAudio(`full-${index}`, item.full); } }} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Unit4PlayingAudioIcon active={activeAudioKey === `full-${index}`} />
                      <span role="button" tabIndex={fullEnabled ? -1 : 0} className="unit4-audio-control unit4-interactive" onClick={(event) => { event.stopPropagation(); if (!fullEnabled) playAudio(`prefix-${index}`, item.audio); }} onKeyDown={(event) => { if (!fullEnabled && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); event.stopPropagation(); playAudio(`prefix-${index}`, item.audio); } }} style={{ fontSize: 18, minWidth: 110, whiteSpace: "nowrap" }}><Unit4PlayingAudioIcon active={activeAudioKey === `prefix-${index}`} />{item.text}</span>
                      <AnswerSlot id={`answer-${index}`} value={answers[index]} preview={preview} wrong={wrong.includes(index)} locked={fullEnabled || showAnswer} register={keyboard.registerTarget} onRemove={() => remove(index)} onKeyDown={(event) => { event.stopPropagation(); if (!keyboard.keyboardItemId && answers[index] && !fullEnabled && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); remove(index); return; } keyboard.handleTargetKeyDown(event, `answer-${index}`); }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Button handleShowAnswer={reveal} handleStartAgain={reset} checkAnswers={checkAnswers} />
        </div>
      </div>
      <DragOverlay>{activeWord && <span style={{ padding: "7px 14px", border: "1px solid #F79530", borderRadius: 8, background: "white", fontWeight: "bold" }}>{activeWord}</span>}</DragOverlay>
    </DndContext>
  );
}
