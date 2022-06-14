import "./App.css";
import { Sudoku } from "./Components";
import { useState } from "react";
const _ = require('lodash');




const EASY = [
  [5, 8, 0,   1, 0, 2,  0, 4, 0,],
  [0, 0, 0,   0, 0, 0,  2, 1, 6,],
  [9, 1, 0,   7, 0, 4,  0, 0, 3,],

  [0, 0, 0,   0, 2, 0,  0, 0, 0,],
  [2, 0, 3,   9, 1, 0,  7, 0, 0,],
  [7, 9, 0,   0, 0, 3,  4, 0, 5,],

  [6, 0, 0,   0, 0, 1,  5, 0, 4,],
  [1, 5, 0,   0, 4, 0,  6, 7, 2,],
  [3, 0, 0,   2, 0, 0,  0, 8, 9,],
]

function App() {
  const [board] = useState(_.cloneDeep(EASY));

  function restBoard(){
    window.location.reload(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-col">
          <Sudoku rawBoardIncoming={board}/>
        </div>
      </header>
    </div>
  );
}

export default App;
