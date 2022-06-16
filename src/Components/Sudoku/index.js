import Board from "../Board";
import { useEffect, useState } from "react";
import { findPoss, fillMove, isIncorrect } from "../../Utils";
import PropTypes, { array } from "prop-types";
import Button from "../Button";
import _ from "lodash";




function Sudoku({rawBoardIncoming, boardCreatorMode}){
  const [board, setBoard] = useState(rawBoardIncoming);
  const [rawBoard] = useState(_.cloneDeep(rawBoardIncoming))
  const [possibleMoves, setPossibleMoves] = useState(null);

  function solve(startPuz, startPos){
    let tempBoard = _.cloneDeep(startPuz);
    let tempPoss = _.cloneDeep(startPos);
    let endBoard = [[]];
    let failSafe = 0;
    let count = 0;
    let smallest = null;
    let isWrong = false;
    let solved = true;

    while(tempBoard.join() !== endBoard.join() && failSafe <  20){
      endBoard = _.cloneDeep(tempBoard);
      tempBoard = fillMove(_.cloneDeep(endBoard), tempPoss)
      tempPoss = findPoss(tempBoard);
      if(failSafe === 19) console.log("whopse")
      failSafe++;
    }

    tempPoss.forEach((posses, index)=>{
      if(count < 9) {
        if(tempBoard[count][index % 9] === 0) solved = false;
        if (tempBoard[count][(index) % 9] === 0 && posses.length === 0) {
          isWrong = true;
        }
        if(tempBoard[count][(index) % 9] === 0 &&
          (!smallest || smallest.poss.length > posses.length)){
          smallest = {poss: posses, numSlot: [[count],[index % 9]]}
        }
      }
      if((index + 1)% 9 === 0) count++;
    });


    if(!isWrong) {
      isWrong = isIncorrect(endBoard)
    }

    if(isWrong) return [-1, -1];

    if(solved) return [1, endBoard];

    return smallest ?  [0, smallest]: [0, endBoard];
  }

  function solveHandler(puzzles = null, possibleMovesList = null, limit = 0){
    let startPuzzle;
    let startPoss;
    let temp;
    let puzzlesToTry = puzzles !== null ? puzzles.length - 1 : 1;
    // console.log("in at: ", limit)
    limit++
    if(limit > 80){
      return 1;
    }

    while(puzzlesToTry >= 0) {

      if(puzzles === null) {
        startPuzzle = _.cloneDeep(board);
        startPoss = _.cloneDeep(possibleMoves);
      }
      else{
        startPuzzle = _.cloneDeep(puzzles[puzzlesToTry]);
        startPoss = _.cloneDeep(possibleMovesList[puzzlesToTry]);
      }

      temp = solve(startPuzzle, startPoss);
      if (temp[0] === 0) {
        let recursePuzzies = [];
        let recursePossies = [];
        let tempOfTemps = [..._.cloneDeep(startPuzzle)]
        let slot = [temp[1].numSlot[0], temp[1].numSlot[1]]
        let recursePossiesTemp;

        temp[1].poss.forEach((prospect)=>{
          tempOfTemps[slot[0]][slot[1]] = prospect;
          recursePossiesTemp = findPoss(_.cloneDeep(tempOfTemps));
          recursePossies.push(_.cloneDeep(recursePossiesTemp));
          recursePuzzies.push(_.cloneDeep(tempOfTemps));
        })

        let solveHandleResponse = solveHandler(_.cloneDeep(recursePuzzies), _.cloneDeep(recursePossies), limit);

        switch (solveHandleResponse) {
          case 1:
            return 1;
          case -1:
            if(puzzles && puzzles.length > 1) {
              puzzles.splice(puzzlesToTry);
              possibleMovesList.splice(puzzlesToTry);
            }
            else{
              // console.log("all out at: ", limit )
            }
            puzzlesToTry--;
            if(puzzlesToTry < 0){
              return -1;
            }
            break;
          default:
            return;
        }
      }
      if (temp[0] === 1) {
        console.log("solved")
        setBoard(temp[1]);
        return 1;
      }
      if(temp[0] === -1) {
        console.log("out one path: " + limit)
        return -1;
      }
    }
    setPossibleMoves(findPoss(board))
  }

  useEffect(()=>{
    setPossibleMoves(findPoss(board))
  },[setPossibleMoves, board])

  return (
    <div>
      {boardCreatorMode ? null : <div>
        <Button content={"Solve"} action={solveHandler}/>
        <Button content={"Reset"} action={()=> setBoard(_.cloneDeep(rawBoard))}/>
      </div>}
      {possibleMoves !== null ? <Board numbers={board} possibleNums={possibleMoves} setBoardFunc={setBoard}/> : null}
    </div>
  )
}
export default Sudoku;


Sudoku.propTypes = {
  rawBoardIncoming: PropTypes.array.isRequired,
  boardCreatorMode: PropTypes.bool.isRequired,
}
