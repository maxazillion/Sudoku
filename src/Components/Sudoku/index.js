import Board from "../Board";
import { useEffect, useState } from "react";
import { findPoss, fillMove } from "../../Utils";
import PropTypes from "prop-types";
import Button from "../Button";
import _ from "lodash";




function Sudoku({rawBoardIncoming}){
  const [board, setBoard] = useState(rawBoardIncoming);
  const [rawBoard] = useState(_.cloneDeep(rawBoardIncoming))
  const [possibleMoves, setPossibleMoves] = useState(null);

  function solveHandler(){
    let tempBoard = _.cloneDeep(board);
    let tempPoss = _.cloneDeep(possibleMoves);
    let endBoard = [[]];
    let failSafe = 0;

    while(tempBoard.join() !== endBoard.join() && failSafe <  10){
      endBoard = _.cloneDeep(tempBoard);
      tempBoard = fillMove(_.cloneDeep(endBoard), tempPoss)
      tempPoss = findPoss(tempBoard);
      failSafe++;
    }
    setBoard(endBoard)
  }

  useEffect(()=>{
    setPossibleMoves(findPoss(board))
    // setBoard(fillMove(board, possibleMoves))
  },[setPossibleMoves, board])
  return (
    <div>
      <Button content={"Solve"} action={solveHandler}/>
      <Button content={"Reset"} action={()=> setBoard(_.cloneDeep(rawBoard))}/>
      {possibleMoves !== null ? <Board numbers={board} possibleNums={possibleMoves} setBoardFunc={setBoard}/> : null}
    </div>
  )
}
export default Sudoku;


Sudoku.propTypes = {
  rawBoardIncoming: PropTypes.array.isRequired,
}
