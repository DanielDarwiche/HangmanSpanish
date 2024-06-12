import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import WordHandler from './components/WordHandler';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';
import WordFetcher from './components/WordFetcher';
import './App.css';

const words = WordFetcher();
let selectedWordPair = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [inputLetter, setInputLetter] = useState('');

  const processLetter = (letter) => {
    if (selectedWordPair.spanish.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        setCorrectLetters(currentLetters => [...currentLetters, letter]);
      } else {
        show(setShowNotification); 
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        setWrongLetters(currentLetters => [...currentLetters, letter]);
      } else {
        show(setShowNotification);
      }
    }
  };

  useEffect(() => {
    const handleInput = (input) => {
      const letter = input.toLowerCase();
      if (playable && /^[a-z]$/.test(letter)) {
        processLetter(letter);
      }
    };

    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        processLetter(letter);
      }
    };

    document.addEventListener('input', handleInput);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('input', handleInput);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [correctLetters, wrongLetters, playable]);

  const handleChange = (e) => {
    setInputLetter(e.target.value);
  };

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWordPair = words[random];
  }

  return (
    <>
      <Header />
      <div className="word-to-guess">
        <h2>Gissa det spanska ordet för:<br/><span>{selectedWordPair.swedish.toUpperCase()}</span></h2>
      </div>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <WordHandler selectedWord={selectedWordPair.spanish} correctLetters={correctLetters} />
      </div>
      <input
        type="text"
        value={inputLetter}
        onChange={handleChange}
        maxLength="1"
        autoFocus
        style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
      />
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWordPair.spanish} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
