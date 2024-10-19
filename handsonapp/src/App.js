import React from 'react';
import ReactDOM from 'react-dom/client';

import Minigame1 from './minigame1/minigame1.js';
import Minigame2 from './minigame2/minigame2.js';
import Minigame3 from './minigame3/minigame3.js';

import './App.css';

function App() {
    return (
      <div className="App">
        <div>
          <h1>Learn Biology with Interactive Minigames!!</h1>
        </div>
        <div className="">
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
      </div>
    );
}
  
export default App;
  

