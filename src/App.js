import "./App.css";
import { Button, GeneratePuzzle, SetSudoku, Sudoku } from "./Components";
import { useState } from "react";
import { BLANK } from "./Utils";

const _ = require("lodash");

function App() {
  const[page, setPage] = useState(0);
  const[startPuzzle, setStartPuzzle] = useState(BLANK);


  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-col">
          {page !== 3 && page !== 0 ? <Button content={"Set Sudoku"} action={()=>setPage(0)}/> : null}
          {page !== 3 && page !== 1?  <Button content={"Generate Sudoku"} action={()=>setPage(1)}/>: null}

          {page === 0 ? <SetSudoku setPage={setPage} setPuzzle={setStartPuzzle}/>  : null}
          {page === 1 ? <GeneratePuzzle setPage={setPage}  setPuzzle={setStartPuzzle}/>  : null}
          {page === 2 ? null  : null}


          {page === 3 ? <Sudoku setPage={setPage} incomingBoard={startPuzzle}/> : null}
        </div>
      </header>
    </div>
  );
}

export default App;
