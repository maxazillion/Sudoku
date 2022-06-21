import Board from "../Board";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import _ from "lodash";

import {
  adjustPossible,
  fillWhatYouCan,
  checkComplete,
  createNewBoards,
  makeBoard,
  boardToRawBoard,
  solveHandler,
  BLANK,
} from "../../Utils";


const HARD2 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 7, 0, 0, 0, 3],
  [0, 2, 0, 0, 6, 0, 0, 5, 0],

  [0, 1, 0, 0, 0, 0, 0, 0, 8],
  [0, 7, 0, 0, 2, 0, 0, 0, 9],
  [0, 5, 0, 7, 1, 0, 3, 0, 0],

  [2, 0, 0, 0, 0, 6, 8, 0, 0],
  [4, 0, 0, 0, 3, 0, 0, 0, 6],
  [0, 0, 0, 8, 0, 0, 0, 0, 0]
];



function Sudoku({incomingBoard, setPage}) {
  const [savedBoard] = useState(_.cloneDeep(adjustPossible(makeBoard(_.cloneDeep(incomingBoard)))));
  const [board, setBoard] = useState(_.cloneDeep(adjustPossible(makeBoard(_.cloneDeep(incomingBoard)))));



  return (
    <div>
      <div>
        <Button content={"Solve"} action={()=>solveHandler([board], setBoard)} />
        <Button content={"Reset"} action={()=>setBoard(adjustPossible(_.cloneDeep(savedBoard)))} />
        <Button content={"Back"} action={()=>setPage(0)}/>
      </div>
      {board !== null ? <Board numbers={board} setBoardFunc={setBoard} /> : null}
    </div>
  );
}

export default Sudoku;

Sudoku.propTypes = {
  incomingBoard: PropTypes.array.isRequired,
  setPage: PropTypes.func.isRequired,
}
