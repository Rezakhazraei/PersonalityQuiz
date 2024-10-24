/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import UserProvider from './components/UserContext';
import Header from './components/Header';
import UserForm from './components/UserForm';
import Question from './components/Question';
import Results from './components/Results';

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "What's your favorite season?",
      options: ["Spring 🌸", "Summer 🌞", "Fall 🍂", "Winter ❄️"],
    },
    {
      question: "What's your favorite animal?",
      options: ["Dog 🐶", "Cat 🐱", "Bird 🐦", "Fish 🐟"],
    },
  ];

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    "Spring 🌸": "Air",
    "Summer 🌞": "Fire",
    "Fall 🍂": "Earth",
    "Winter ❄️": "Water",
    "Dog 🐶": "Earth",
    "Cat 🐱": "Water",
    "Bird 🐦": "Air",
    "Fish 🐟": "Water",
  };

function App() {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [element, setElement] = useState("");
  const [answers, setAnswers] = useState([]);
  const [artwork, setArtwork] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const resultElement = determineElement(answers);
      setElement(resultElement);
      fetchArtwork(resultElement);
    }
  }, [currentQuestionIndex]);
  
  
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


  async function fetchArtwork(element) {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${element}`
    );
    const data = await response.json();
    const objectId = data.objectIds[0];
    const artworkResponse = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
    );
    const artworkData = await artworkResponse.json();
    setArtwork(artworkData);
  }

  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<UserForm />} />
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
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
