import React from 'react';
import ReactDOM from 'react-dom/client';

import Minigame1 from './minigame1/minigame1';
import Minigame2 from './minigame1/minigame2';
import Minigame3 from './minigame1/minigame3';

import './App.css';

function App() {
    return (
      <div className="App">
        <h1>Learn Biology with Minigames!!</h1>
        <div>
            <Minigame1 />
        </div>
        <div>
            <Minigame2 />
        </div>
        <div>
            <Minigame3 />
        </div>
      </div>
    );
}
  
export default App;
  

