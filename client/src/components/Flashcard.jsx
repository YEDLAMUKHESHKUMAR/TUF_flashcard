import React, { useEffect, useState } from "react";
import "../index.css";
import "./Flashcard.css";

const Flashcard = ({ card, trigger }) => {
  const [flipped, setFlipped] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");
  const [status, setstatus] = useState("");
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    setFlipped(false);
    setOptionSelected("");
    setSubmitted(false);
    setstatus("");
  }, [trigger]);
  const handleOption = (currOption) => {
    if (optionSelected.toString() === currOption.toString()) {
      setOptionSelected("");
    } else {
      setOptionSelected(currOption);
    }
    console.log(currOption);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const checkSubmit = () => {
    if (optionSelected.toString() === card.correct_answer.toString()) {
      setstatus("true");
    } else {
      setstatus("false");
    }
    setSubmitted(true);
  };
  return (
    <div className="middle ">
      {/*  make sure...when you go to next question or prev...put flipped to null */}
      {card === undefined ? (
        <div className="text-white">
          Sorry this quiz is not availabe right now T_T"
        </div>
      ) : (
        <div
          className={` flashcard w-[400px] h-[460px] perspective-1000 relative  ${
            flipped ? "flipped" : ""
          }`}
        >
          {/* <div className="front">{card.question}</div> */}
          {/* <div className="back">{card.answer}</div> */}

          <div className="front">
            {/* <div className="over"> */}
            <div className="QA">
              {/* question  */}
              <div className="question border-b border-[rgb(140,136,136)] mb-2.5 text-[17px] overflow-x-auto h-auto max-h-[100px] text-wrap w-[360px] ">
                {card.question}
              </div>
              <div
                className={`options text-[16px] w-[full]  ${
                  submitted === true
                    ? "offPointer pointer-events-none cursor-not-allowed"
                    : ""
                }`}
              >
                <div
                  className={`cursor-pointer p-[12px] mb-[8px] bg-[rgba(217,205,205,0.178)] ${
                    optionSelected === "A" ? "selected" : ""
                  }`}
                  onClick={() => handleOption("A")}
                >
                  {card.option_a}
                </div>

                <div
                  className={`cursor-pointer p-[12px] mb-[8px] bg-[rgba(217,205,205,0.178)] ${
                    optionSelected === "B" ? "selected" : ""
                  }`}
                  onClick={() => handleOption("B")}
                >
                  {card.option_b}
                </div>
                <div
                  className={`cursor-pointer p-[12px] mb-[8px] bg-[rgba(217,205,205,0.178)] ${
                    optionSelected === "C" ? "selected" : ""
                  }`}
                  onClick={() => handleOption("C")}
                >
                  {card.option_c}
                </div>
                <div
                  className={`cursor-pointer p-[12px] mb-[8px] bg-[rgba(217,205,205,0.178)] ${
                    optionSelected === "D" ? "selected" : ""
                  }`}
                  onClick={() => handleOption("D")}
                >
                  {card.option_d}
                </div>
              </div>
            </div>
            <div className="frontBtns flex justify-between ">
              {/* <div className="anscrt"> */}

              <button
                className="ans  p-[10px_14px] text-[14px] cursor-pointer bg-transparent border border-[#e11d48] rounded-[6px] text-[#e11d48]"
                onClick={handleFlip}
              >
                Show Answer
              </button>
              {/* <div>✅</div> */}
              {/* </div> */}
              {optionSelected === "" ? (
                ""
              ) : (
                <button
                  className="sub  p-[10px_14px] text-[14px] cursor-pointer bg-[#e11d48] text-white"
                  onClick={checkSubmit}
                >
                  submit
                </button>
              )}
            </div>
            {/* {status=="true"?<div className="">Status : correct </div>:} */}
            <div className="text-sm mt-2">
              Status :{" "}
              {submitted === false
                ? ""
                : status === "true"
                ? "correct ✅"
                : "wrong ❌"}
            </div>

            {/* </div> */}
          </div>
          <div className="back">
            <div className="text-white ">
              correct Option :{" "}
              <span className="text-white">{card.correct_answer}</span>
            </div>
            <div className="ans-reveal overflow-x-auto h-auto max-h-[300px] text-wrap  text-[#e11d48]">
              Solution <span className="text-white">: {card.explanation}</span>
            </div>
            <button
              className="ans  p-[10px_14px] text-[14px] cursor-pointer bg-transparent border border-[#e11d48] rounded-[6px] text-[#e11d48] mt-5"
              onClick={handleFlip}
            >
              Show Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
