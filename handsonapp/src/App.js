import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import Minigame1 from './minigame1/minigame1.js';
import Minigame2 from './minigame2/minigame2.js';
import Minigame3 from './minigame3/minigame3.js';
import Minigame4 from './minigame3/minigame3.js';

import './App.css';

function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  const startGame = (game) => {
    setSelectedGame(game);
  };

  if (selectedGame === 'Minigame1') {
    return (
      <div className="game-container">
        <Minigame1 />
      </div>
    );
  } else if (selectedGame === 'Minigame2') {
    return (
      <div className="game-container">
        <Minigame2 />
      </div>
    );
  } else if (selectedGame === 'Minigame3') {
    return (
      <div className="game-container">
        <Minigame3 />
      </div>
    );
  }
  
    return (
    <div className="launch-container">
        <div className="floating-elements">
          
          {/* Floating elements like atoms, planets, and molecules */}
          <div className="element atom"></div>
          <div className="element dna"></div>
          <div className="element molecule"></div>
          <div className="element cells"></div>
        </div>

      <h1 className="header">Minigames</h1>

      <div className="center-content">
        <div>
          <h1 className="game-logo">Minigame1</h1>
          <p>Description</p>
          <button className="start-button" onClick={() => startGame('Minigame1')}>Start Game</button>
        </div>

        <div>
          <h1 className="game-logo">Minigame2</h1>
          <p>Description</p>
          <button className="start-button" onClick={() => startGame('Minigame1')}>Start Game</button>
        </div>

        <div>
          <h1 className="game-logo">Minigame3</h1>
          <p>Description</p>
          <button className="start-button" onClick={() => startGame('Minigame1')}>Start Game</button>
        </div>
      </div>
    </div>
    );
}
  
export default App;
  

