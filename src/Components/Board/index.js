import Cubes from "../Cubes";
import PropTypes from "prop-types";

function Board({numbers, setBoardFunc}){
  let rows = [];

  numbers.forEach((cell, index)=>{
    if(rows[cell.row] === undefined) rows.push([]);
    rows[cell.row].push(<Cubes
      key={index}
      cell={cell}
      setBoardFunc={setBoardFunc}
      spaceRight={cell.col === 2 || cell.col === 5}
      possibleNums={cell.value !== 0 ? null: cell.poss}/>)
  })


  return (
    <div className="flex flex-col" >
      {rows.map((row, i)=>{
        return(
          <div key={i} className="flex flex-row" style={{
            paddingBottom: i === 2 || i === 5 ? "10px" : 0
          }}>
            {row}
          </div>
        )
      })}
    </div>
  )
}

export default Board;

Board.propTypes = {
  numbers: PropTypes.array.isRequired,
  possibleNums: PropTypes.array,
  setBoardFunc: PropTypes.func.isRequired,
}
