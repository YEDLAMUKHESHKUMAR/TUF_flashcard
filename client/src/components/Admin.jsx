import React, { useState, useEffect } from "react";

const Admin = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [formState, setFormState] = useState({
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: "",
    explanation: "",
  });
  const [editIndex, seteditIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/flashcards");
      const data = await response.json();
      setFlashcards(data);
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // being edited index!! :)
      const updatedCard = { ...formState, id: flashcards[editIndex].id };
      await fetch(`http://localhost:5000/flashcards/${updatedCard.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCard),
      });
      setFlashcards((prev) =>
        prev.map((card, idx) => (idx === editIndex ? updatedCard : card))
      );
      seteditIndex(null);
    } else {
      const response = await fetch("http://localhost:5000/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      const addedCard = await response.json();
      setFlashcards((prev) => [...prev, addedCard]);
    }
    emptyForm();
  };
  const handleEditClick = (idx) => {
    setFormState(flashcards[idx]);
    seteditIndex(idx);
  };

  
const handleDeleteClick = async (idx) => {
    const cardToDelete = flashcards[idx];
    await fetch(`http://localhost:5000/flashcards/${cardToDelete.id}`, {
      method: 'DELETE',
    });
    setFlashcards((prev) => prev.filter((_, i) => i !== idx));
  };

  const emptyForm = () => {
    setFormState({
      question: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_answer: "",
      explanation: "",
    });
  };
  // don't forgot to empty form !!
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-red-500 mb-6">Admin Page</h1>

        <form
          onSubmit={handleFormSubmit}
          className="mb-6 bg-gray-900 p-4 rounded-lg"
        >
          {/* <div className="flex flex-1 "> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="question"
              value={formState.question}
              onChange={handleInputChange}
              placeholder="Enter the question"
              className="p-2 bg-gray-800 text-white rounded"
              required
            />
            <input
              type="text"
              name="option_a"
              value={formState.option_a}
              onChange={handleInputChange}
              placeholder="Option A"
              className="p-2 bg-gray-800 text-white rounded"
              required
            />
            <input
              type="text"
              name="option_b"
              value={formState.option_b}
              onChange={handleInputChange}
              placeholder="Option B"
              className="p-2 bg-gray-800 text-white rounded"
              required
            />
            <input
              type="text"
              name="option_c"
              value={formState.option_c}
              onChange={handleInputChange}
              placeholder="Option C"
              className="p-2 bg-gray-800 text-white rounded"
              required
            />
            <input
              type="text"
              name="option_d"
              value={formState.option_d}
              onChange={handleInputChange}
              placeholder="Option D"
              className="p-2 bg-gray-800 text-white rounded"
              required
            />
            <select
              name="correct_answer"
              value={formState.correct_answer}
              onChange={handleInputChange}
              className="p-2 bg-gray-800 text-white rounded"
              required
            >
              <option value="">Select Correct Answer</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
            <textarea
              name="explanation"
              value={formState.explanation}
              onChange={handleInputChange}
              placeholder="Explanation (Optional)"
              className="p-2 bg-gray-800 text-white rounded md:col-span-2"
            />
          </div>
          {/* </div> */}
          <button
            type="submit"
            className="mt-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            {editIndex !== null ? "Update Question" : "Add Question"}
          </button>
        </form>
        {/* my cardddds (questions)  */}
        <div className="space-y-4">
          {flashcards.map((card, idx) => (
            <div key={card.id} className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{card.question}</h2>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <p>
                  <strong>A:</strong> {card.option_a}
                </p>
                <p>
                  <strong>B:</strong> {card.option_b}
                </p>
                <p>
                  <strong>C:</strong> {card.option_c}
                </p>
                <p>
                  <strong>D:</strong> {card.option_d}
                </p>
              </div>
              <p className="mt-2 text-red-400">
                Correct Answer: {card.correct_answer}
              </p>
              {card.explanation && (
                <p className="mt-2 text-gray-400">
                  Explanation: {card.explanation}
                </p>
              )}
              <div className="flex mt-4 space-x-2">
                <button
                  onClick={() => handleEditClick(idx)}
                  className="p-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(idx)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
