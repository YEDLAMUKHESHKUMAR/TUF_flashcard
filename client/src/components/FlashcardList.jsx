import React, { useState } from "react";
import Flashcard from "./Flashcard";

const FlashcardList = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const card = cards[currentIndex];

  return (
    <div>
      <Flashcard card={card} trigger={currentIndex} />
      <div className="flex justify-center ">
        <button
          className=" les border border-[#e11d48] text-[#e11d48] mr-5 mt-5 w-[50px] h-[50px] rounded-[50%] text-2xl pb-1 text-center"
          onClick={goPrev}
          disabled={currentIndex === 0}
        >
          {" "}
          &lt;{" "}
        </button>

        <button
          className=" gre mt-5 w-[50px] bg-[#e11d48] text-white h-[50px] rounded-[50%] text-2xl pb-1 text-center"
          onClick={goNext}
          disabled={currentIndex === cards.length - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FlashcardList;
