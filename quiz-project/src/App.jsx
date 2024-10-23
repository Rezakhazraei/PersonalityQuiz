import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import './App.css'

import UserForm from './components/UserForm';
import Question from './components/Question';
import Header from './components/Header';
import Results from './components/Results';

function App() {

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    // Continue mapping all your possible options to a keyword
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [element, setElement] = useState("");
  const [answer, setAnswer] = useState([]);
  const [userName, setUserName] = useState("");
  const [artwork, setArtwork] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
    <div>
      <Routes>
        <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
            ) : (
              <Results element={element} artwork={artwork} />
            )
          }
        />
      </Routes>
    </div>
  )
}

export default App
