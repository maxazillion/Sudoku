import PropTypes from "prop-types";
import Button from "../Button";
import { useEffect, useState } from "react";
import { adjustPossible, BLANK, getRandomInt, makeBoard, makeSeedBoard, oneToNine, solveHandler } from "../../Utils";




function GeneratePuzzle({setPuzzle, setPage}) {
  const [seedBoard, setSeedBoard] = useState((adjustPossible(makeBoard(makeSeedBoard()))));

  function generateHandler(difficulty) {
    let retPuzzle = [[],[],[],[],[],[],[],[],[]];

    let temp = adjustPossible(seedBoard.map((cell)=>{
      let randInt = getRandomInt(difficulty)
      if(randInt > 15 || randInt < 3){
        cell.value = 0;
        cell.poss = [...oneToNine]
        return cell
      }
      return cell
    }))

    temp.forEach((cell, index)=>{
      retPuzzle[index % 9].push(cell.value);
    })

    setPuzzle(retPuzzle);
    setPage(3);
  }

    useEffect(()=>{
      solveHandler([seedBoard], setSeedBoard)
    }, [])


  return (
    <div>
      <Button content={"easy"} action={()=>{generateHandler(10)}} />
      <Button content={"medium"} action={()=>{generateHandler(20)}}/>
      <Button content={"hard"} action={()=>{generateHandler(30)}}/>
    </div>

)

  }

export default GeneratePuzzle;


GeneratePuzzle.propTypes = {
  setPuzzle: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired
};
