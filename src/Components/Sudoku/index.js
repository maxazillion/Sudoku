import Board from "../Board";
import { useEffect, useState } from "react";
import { findPoss, fillMove, isIncorrect } from "../../Utils";
import PropTypes, { array } from "prop-types";
import Button from "../Button";
import _ from "lodash";


function Sudoku({ rawBoardIncoming, boardCreatorMode }) {
  //represents board in 9 rows of 9
  const [board, setBoard] = useState(rawBoardIncoming);
  const [rawBoard] = useState(_.cloneDeep(rawBoardIncoming));
  //represents possible moves per slot in 81 arrays
  const [possibleMoves, setPossibleMoves] = useState(null);

  // right, wrong, smallest pairs
  function solve(startPuz, startPos) {
    let localBoard = _.cloneDeep(startPuz);
    let localPoss = _.cloneDeep(startPos);
    let endBoard = [[]];
    let failSafe = 0;
    let count = 0;
    let smallest = null;
    let isWrong = false;
    let solved = true;

    //will fill cells if their is only one move
    //will update possible moves
    while (localBoard.join() !== endBoard.join() && failSafe < 20) {
      endBoard = _.cloneDeep(localBoard);
      localBoard = fillMove(_.cloneDeep(endBoard), localPoss);
      localPoss = findPoss(localBoard);
      if (failSafe === 19) console.log("whopse");
      failSafe++;
    }

    //check to see if there is a zero slot with no possibilities
    localPoss.forEach((posses, index) => {
      if (count < 9) {
        if (localBoard[count][index % 9] === 0) solved = false;
        if (localBoard[count][(index) % 9] === 0 && posses.length === 0) {
          isWrong = true;
        }
        // if there is a zero the problem is not done and we need to find
        //the slot with the fewest possibilities and return that slot
        if (localBoard[count][(index) % 9] === 0 &&
          (!smallest || smallest.poss.length > posses.length)) {
          smallest = { poss: posses, numSlot: [[count], [index % 9]] };
        }
      }
      if ((index + 1) % 9 === 0) count++;
    });

    //this double checks to see if there are vertical or horizontal dupes
    //im not sure if this is needed
    if (!isWrong) {
      isWrong = isIncorrect(endBoard);
    }


    if (isWrong) return [-1, -1];

    if (solved) return [1, endBoard];

    return smallest ? [0, smallest, endBoard, localPoss] : [0, null, endBoard];
  }

  function solveHandler(boards = null, possibleMovesList = null, limit = 0) {
    let startBoard;
    let startPoss;
    let solveReturn;
    let boardsToTry = boards !== null ? boards.length - 1 : 1;
    let fp = false;
    limit++;

    console.log("in at: ", limit);

    while (boardsToTry >= 0 && !fp) {
      if (boards === null) {
        startBoard = _.cloneDeep(board);
        startPoss = _.cloneDeep(possibleMoves);
        fp = true;
      } else {
        startBoard = _.cloneDeep(boards[boardsToTry]);
        startPoss = _.cloneDeep(possibleMovesList[boardsToTry]);
      }

      solveReturn = solve(startBoard, startPoss);

      // his is the recursive path, there are two or more potential answers
      if (solveReturn[0] === 0) {
        startBoard = solveReturn[2];
        startPoss = solveReturn[3];
        let recurseBoards = [];
        let recursePossible = [];
        let tempOfTemps = [..._.cloneDeep(startBoard)];
        let slot = [solveReturn[1].numSlot[0], solveReturn[1].numSlot[1]];
        let recursePossibilityTemp;

        solveReturn[1].poss.forEach((prospect) => {
          tempOfTemps[slot[0]][slot[1]] = prospect;
          recursePossibilityTemp = findPoss(_.cloneDeep(tempOfTemps));
          recursePossible.push(_.cloneDeep(recursePossibilityTemp));
          recurseBoards.push(_.cloneDeep(tempOfTemps));
        });


        console.log(recurseBoards);
        let solveHandleResponse = solveHandler(_.cloneDeep(recurseBoards), _.cloneDeep(recursePossible), limit);

        switch (solveHandleResponse) {
          case 1:
            console.log("solved");
            return 1;
          case -1:
            if (boards && boards.length > 0) {
              boards.splice(boardsToTry);
              possibleMovesList.splice(boardsToTry);
            }
            if (boards) {
              setBoard(boards[0]);
            }
            if (boards === null) console.log("failed puzzle");
            else {
              console.log("all out at: ", limit);
            }
            boardsToTry--;
            if (boardsToTry < 0) {
              return -1;
            }
            break;
          default:
            console.log("something went wrong");
            return;
        }
      }
      if (solveReturn[0] === 1) {
        console.log("solved");
        setBoard(solveReturn[1]);
        return 1;
      }
      if (solveReturn[0] === -1) {
        console.log("out one path: " + limit);
        return -1;
      }
    }
    setPossibleMoves(findPoss(board));
  }

  useEffect(() => {
    setPossibleMoves(findPoss(board));
  }, [setPossibleMoves, board]);

  return (
    <div>
      {boardCreatorMode ? null : <div>
        <Button content={"Solve"} action={solveHandler} />
        <Button content={"Reset"} action={() => setBoard(_.cloneDeep(rawBoard))} />
      </div>}
      {possibleMoves !== null ? <Board numbers={board} possibleNums={possibleMoves} setBoardFunc={setBoard} /> : null}
    </div>
  );
}

export default Sudoku;


Sudoku.propTypes = {
  rawBoardIncoming: PropTypes.array.isRequired,
  boardCreatorMode: PropTypes.bool.isRequired
};
