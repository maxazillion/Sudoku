import Cubes from "../Cubes";
import PropTypes from "prop-types";

function Board({numbers, possibleNums, setBoardFunc}){
  let rows = [];
  let count = 0;

  for(let i = 0; i < 9; i++){
    rows.push([]);
    for(let ii = 0; ii < 9; ii++){
      if(ii  === 2 || ii  === 5){
        rows[i].push(<Cubes
          key={(i + 1) * (ii + 1)}
          setBoardFunc={setBoardFunc}
          spaceRight={true}
          indexPair={[i, ii]}
          number={numbers[i][ii]}
          possibleNums={numbers[i][ii] !== 0 ? null: possibleNums[count]}/>)
      }
      else{
        rows[i].push(<Cubes
          setBoardFunc={setBoardFunc}
          spaceRight={false}
          indexPair={[i, ii]}
          key={(i + 1) * (ii + 1)}
          number={numbers[i][ii]}
          possibleNums={numbers[i][ii] !== 0 ? null: possibleNums[count]} />)
      }
      count++;
    }
  }

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
