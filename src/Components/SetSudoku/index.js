import Cubes from "../Cubes";
import PropTypes from "prop-types";
import { useState } from "react";
import { BLANK } from "../../Utils";
import _ from "lodash";
import Button from "../Button";


function SetSudoku({setPuzzle, setPage}) {
  const [board, setBoard] = useState(_.cloneDeep(BLANK));

  let rows = [];

  for(let i = 0; i < 9; i++){
    rows.push([]);
    for(let ii = 0; ii < 9; ii++){
      rows[i].push(<
        Cubes
        spaceRight={ii === 5 || ii === 2}
        cell={board[i][ii]}
        setBoardFunc={setBoard}
        index={[i, ii]}
        key={( i + 1) * (ii +  1)}
      />);
    }
  }

  function enterHandler(){
    setPuzzle(board);
    setPage(3);
  }


  return (
    <div className="flex flex-col">
      {rows.map((row, i) => {
        return (
          <div key={i} className="flex flex-row" style={{
            paddingBottom: i === 2 || i === 5 ? "10px" : 0
          }}>
            {row}
          </div>
        );
      })}
      <Button  content={"enter"} action={enterHandler}/>
    </div>
  );
}

export default SetSudoku;

SetSudoku.propTypes = {
  setPuzzle: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired
};
