import Board from "../Board";
import { useEffect, useState } from "react";
import { findPoss, fillMove, isIncorrect } from "../../Utils";
import PropTypes, { array } from "prop-types";
import Button from "../Button";
import _ from "lodash";
import { adjustPossible, fillWhatYouCan, checkComplete, createNewBoards, makeBoard} from "../../Utils"

function Sudoku({ rawBoard, boardCreatorMode }) {
  const [board, setBoard] = useState(adjustPossible(makeBoard(_.cloneDeep(rawBoard))));

  function solveHandler(boards = [board], limit = 0){
    setBoard(boards[0])
    limit++;
    while(boards.length > 0){
      console.log("boards to try: ", boards.length)
      let startBoard = fillWhatYouCan(boards[0]);
      let status = checkComplete(startBoard);

      if(status === 1){
        console.log("winner")
        setBoard(startBoard);
        return 1;
      }
      if(status === -1){
        console.log("Out One Layer: ", limit)
        boards.shift();
      }
      if(status === 0){
        console.log("In One Layer: ", limit)
         if(solveHandler(createNewBoards(startBoard), limit) === 1) return 1;
        boards.shift();
      }
    }
    return -1;
  }

  useEffect(()=>{
    setBoard(adjustPossible(board));
  },[board])

  return (
    <div>
      {boardCreatorMode ? null : <div>
        <Button content={"Solve"} action={solveHandler} />
        <Button content={"Reset"} action={() => setBoard(adjustPossible(makeBoard(_.cloneDeep(rawBoard))))} />
      </div>}
      {board !== null ? <Board numbers={board} setBoardFunc={setBoard} /> : null}
    </div>
  );
}

export default Sudoku;


Sudoku.propTypes = {
  rawBoard: PropTypes.array.isRequired,
  boardCreatorMode: PropTypes.bool.isRequired
};
