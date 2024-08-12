import FlashcardList from "./components/FlashcardList.jsx";
import Header from "./components/header.jsx";
import "./index.css";

import { useEffect, useState } from "react";
function App() {
  const [flashcards, setFlashcards] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/flashcards")
      .then((res) => res.json())
      .then((data) => setFlashcards(data));
  }, []);
  console.log(flashcards);
  return (
    <div>
      <div className="App flex justify-center align-middle">
        <div className="mt-10">
          {/* <div className="text-red-700">hi</div> */}
          <FlashcardList cards={flashcards} />
        </div>
      </div>
    </div>
  );
}

export default App;
