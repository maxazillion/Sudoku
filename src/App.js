import "./App.css";
import { Button, Sudoku } from "./Components";
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

const BLANK = [
  [0, 0, 0,   0, 0, 0,  0, 0, 0,],
  [0, 0, 0,   0, 0, 0,  0, 0, 0,],
  [0, 0, 0,   0, 0, 0,  0, 0, 0,],

  [0, 0, 0,   0, 0, 0,  0, 0, 0,],
  [0, 0, 0,   0, 0, 0,  0, 0, 0,],
  [0, 0, 0,   0, 0, 0,  0, 0, 0,],

  [0, 0, 0,   0, 0, 0,  0, 0, 0,],
  [0, 0, 0,   0, 0, 0,  0, 0, 0,],
  [0, 0, 0,   0, 0, 0,  0, 0, 0,],
]

function App() {
  const [board, setBoard] = useState(_.cloneDeep(EASY));
  const [isSetterMode, setIsSetterMode] = useState(true);
  const [blankBoard, setBlankBoard] = useState(_.cloneDeep(BLANK));

  function handleSetBoard(useEasyPuzzle  = false){
    if(isSetterMode){
      setBlankBoard(_.cloneDeep(BLANK))
    }

    setIsSetterMode((prev)=>!prev)
    if(useEasyPuzzle){
      setBoard(_.cloneDeep(EASY));
    }
    else {
      setBoard(_.cloneDeep(blankBoard));
    }
  }

  function handleUseTestPuzzle(){
    handleSetBoard(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-col">
          {isSetterMode ? <div>
            <Sudoku rawBoardIncoming={blankBoard} boardCreatorMode={true}/>
          </div> : <Sudoku rawBoardIncoming={board} boardCreatorMode={false}/>}
          <Button content={isSetterMode ? "Confirm Board" : "Set Board"} action={handleSetBoard}/>
          {
            isSetterMode ? <Button content={"Use Test Puzzle"} action={handleUseTestPuzzle}/> : null
          }
        </div>
      </header>
    </div>
  );
}

export default App;
