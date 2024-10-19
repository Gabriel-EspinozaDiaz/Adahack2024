import React from 'react';
import ReactDOM from 'react-dom/client';

import Minigame1 from './minigame1/minigame1.js';
import Minigame2 from './minigame2/minigame2.js';
import Minigame3 from './minigame3/minigame3.js';

import './App.css';

function App() {
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
          <button className="start-button">Start Game</button>
        </div>

        <div>
          <h1 className="game-logo">Minigame2</h1>
          <p>Description</p>
          <button className="start-button">Start Game</button>
        </div>

        <div>
          <h1 className="game-logo">Minigame3</h1>
          <p>Description</p>
          <button className="start-button">Start Game</button>
        </div>
      </div>
    </div>
    );
}
  
export default App;
  

