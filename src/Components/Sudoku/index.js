import Board from "../Board";
import { useEffect, useState } from "react";
import { findPoss } from "../../Utils";


const EASY = [
  [3, 4, 2,   0, 1, 5,  0, 6, 8,],
  [0, 0, 8,   0, 0, 7,  3, 6, 1,],
  [1, 0, 0,   6, 0, 0,  0, 0, 0,],

  [0, 8, 5,   0, 0, 0,  0, 4, 7,],
  [0, 0, 9,   0, 0, 0,  8, 5, 0,],
  [0, 0, 4,   0, 9, 8,  0, 1, 0,],

  [9, 2, 6,   0, 0, 1,  0, 3, 4,],
  [0, 0, 1,   0, 0, 9,  6, 0, 2,],
  [0, 7, 3,   0, 0, 0,  0, 0, 9],
]

function Sudoku(){
  const [board, setBoard] = useState(EASY);
  const [possibleMoves, setPossibleMoves] = useState(null);

  findPoss(board);
  useEffect(()=>{
    setPossibleMoves(findPoss(board))

  },[setPossibleMoves, board])
  return (
    possibleMoves !== null ? <Board numbers={EASY} possibleNums={possibleMoves}/> : null
  )
}
export default Sudoku;
