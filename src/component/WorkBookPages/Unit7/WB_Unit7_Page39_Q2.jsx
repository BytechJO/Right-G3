import React, { useState } from "react";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import imgBoy1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/2.svg";
import imgGirl1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/3.svg";
import imgBoy2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/4.svg";
import imgGirl2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/5.svg";
import imgBoy3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/6.svg";
import imgGirl3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/7.svg"
import imgBoy4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/8.svg";
import imgGirl4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/9.svg";

const WORDS = [
    { id: "w1", text: "him" },
    { id: "w2", text: "her" },
    { id: "w3", text: "you" },
    { id: "w4", text: "me" },
    { id: "w5", text: "it" },
];

const QUESTIONS = [
    { id: "q1", num: 1, leftImg: imgBoy1, rightImg: imgBoy3, question: "Can you see Tom?", answerBefore: "No, I can't see", answerAfter: ".", correct: "him" },
    { id: "q2", num: 2, leftImg: imgGirl1, rightImg: imgGirl3, question: "I like Sarah.", answerBefore: "Yes. I like", answerAfter: ", too.", correct: "her" },
    { id: "q3", num: 3, leftImg: imgBoy2, rightImg: imgBoy4, question: "Do you like football?", answerBefore: "No, I don't like", answerAfter: ".", correct: "it" },
    { id: "q4", num: 4, leftImg: imgGirl2, rightImg: imgGirl4, question: "Can you see me?", answerBefore: "No, I can hear", answerAfter: ".", correct: "you" },
];

function DraggableWord({ item, used }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
    const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging || used ? 0.4 : 1 };
    return (
        <div
            ref={setNodeRef} style={style} {...attributes} {...listeners}
            className={`px-5 py-2 border-2 rounded-xl text-center font-bold text-blue-700 bg-white text-sm select-none
        ${used ? "pointer-events-none border-gray-200 text-gray-300" : "cursor-grab border-blue-200 hover:border-blue-500 hover:shadow-md transition-all"}`}
        >
            {item.text}
        </div>
    );
}

// ✅ نفس منطق Q1 بالضبط:
// الصح  → border عادي، نص عادي، بدون أي إضافة
// الغلط → border أحمر + bg أحمر فاتح + علامة ✕
function InlineDropSlot({ id, value, isSubmitted, isCorrect }) {
    const { setNodeRef, isOver } = useSortable({ id });

    const borderClass = isSubmitted
        ? isCorrect
            ? "border-gray-400"
            : "border-red-500 bg-red-50"
        : isOver
            ? "border-blue-500 bg-blue-50 rounded-sm"
            : "border-gray-400";

    return (
        <span
            ref={setNodeRef}
            className={`relative inline-flex items-center justify-center border-b-2 mx-1 px-1 transition-all ${borderClass}`}
            style={{ verticalAlign: "bottom", minHeight: "22px", minWidth: "52px" }}
        >
            {isSubmitted && value && !isCorrect && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow leading-none">
                    ✕
                </span>
            )}
            {value ? (
                <span className={`font-bold text-sm ${isSubmitted ? (isCorrect ? "text-blue-900" : "text-red-600") : "text-blue-700"}`}>
                    {value}
                </span>
            ) : (
                <span className="text-gray-300 text-xs">___</span>
            )}
        </span>
    );
}

export default function WB_Unit7_Page39_QB() {
    const initialAnswers = Object.fromEntries(QUESTIONS.map((q) => [q.id, null]));
    const [answers, setAnswers] = useState(initialAnswers);
    const [activeId, setActiveId] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const sensors = useSensors(useSensor(PointerSensor));

    const checkAnswers = () => {
        if (Object.values(answers).some((v) => !v)) return ValidationAlert.info();
        setSubmitted(true);
        const total = QUESTIONS.length;
        const score = QUESTIONS.filter((q) => answers[q.id] === q.correct).length;
        if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
        else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
        else ValidationAlert.error(`Score: ${score} / ${total}`);
    };

    const handleReset = () => { setAnswers(initialAnswers); setSubmitted(false); };
    const handleShowAnswer = () => {
        setAnswers(Object.fromEntries(QUESTIONS.map((q) => [q.id, q.correct])));
        setSubmitted(true);
    };

    const usedWords = Object.values(answers).filter(Boolean);

    return (
        <DndContext
            sensors={sensors}
            onDragStart={(e) => setActiveId(e.active.id)}
            onDragEnd={(e) => {
                if (e.over) {
                    const wordText = WORDS.find((w) => w.id === e.active.id)?.text;
                    if (wordText) setAnswers((prev) => ({ ...prev, [e.over.id]: wordText }));
                }
                setActiveId(null);
            }}
        >
            <div className="main-container-component">
                <div className="div-forall" style={{ gap: "15px" }}>

                    <h1 className="WB-header-title-page8">
                        <span className="WB-ex-A">B</span>
                        Complete the sentences and write{" "}
                        <strong>him</strong>, <strong>her</strong>, <strong>you</strong>,{" "}
                        <strong>me</strong>, and <strong>it</strong>.
                    </h1>

                    <div className="flex flex-col gap-6 mt-2 w-full">
                        {QUESTIONS.map((q) => (
                            <div key={q.id} className="flex items-center gap-3 w-full">

                                <span className="w-4 flex-shrink-0 text-sm font-bold text-gray-500">{q.num}</span>

                                <img src={q.leftImg} alt="" className="flex-shrink-0 object-contain" style={{ width: 48, height: 56 }} />

                                {/* فقاعة السؤال */}
                                <div className="relative flex-shrink-0 bg-white border border-gray-300 rounded-2xl px-3 py-2 text-sm font-medium text-gray-700 shadow-sm text-center" style={{ minWidth: 110, maxWidth: 150 }}>
                                    {q.question}
                                    <span style={{ position: "absolute", top: "50%", right: -9, transform: "translateY(-50%)", width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: "9px solid #d1d5db" }} />
                                    <span style={{ position: "absolute", top: "50%", right: -7, transform: "translateY(-50%)", width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "8px solid white" }} />
                                </div>

                                {/* فقاعة الجواب */}
                                <div className="relative bg-white border border-gray-300 rounded-2xl px-3 py-2 text-sm font-medium text-gray-700 shadow-sm flex items-center flex-nowrap flex-1" style={{ minWidth: 170 }}>
                                    <span style={{ position: "absolute", top: "50%", left: -9, transform: "translateY(-50%)", width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderRight: "9px solid #d1d5db" }} />
                                    <span style={{ position: "absolute", top: "50%", left: -7, transform: "translateY(-50%)", width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderRight: "8px solid white" }} />
                                    <span className="whitespace-nowrap">{q.answerBefore}</span>
                                    <InlineDropSlot id={q.id} value={answers[q.id]} isSubmitted={submitted} isCorrect={answers[q.id] === q.correct} />
                                    <span className="whitespace-nowrap">{q.answerAfter}</span>
                                </div>

                                <img src={q.rightImg} alt="" className="flex-shrink-0 object-contain" style={{ width: 48, height: 56 }} />

                            </div>
                        ))}
                    </div>

                    {/* بنك الكلمات */}
                    <div className="mt-4 bg-blue-50 rounded-2xl border-2 border-blue-100 p-4">
                        <p className="text-xs text-blue-500 font-medium mb-3 text-center">Word Bank — drag to fill the blanks</p>
                        <SortableContext items={WORDS.map((w) => w.id)}>
                            <div className="flex flex-wrap justify-center gap-3">
                                {WORDS.map((w) => <DraggableWord key={w.id} item={w} used={usedWords.includes(w.text)} />)}
                            </div>
                        </SortableContext>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <Button checkAnswers={checkAnswers} handleShowAnswer={handleShowAnswer} handleStartAgain={handleReset} />
                    </div>

                </div>
            </div>

            <DragOverlay>
                {activeId ? (
                    <div className="px-4 py-2 bg-white border-2 border-blue-500 rounded-xl shadow-2xl font-bold text-blue-700 text-sm">
                        {WORDS.find((w) => w.id === activeId)?.text}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}