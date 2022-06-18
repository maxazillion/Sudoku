import PropTypes from "prop-types";

function Cubes({ spaceRight, possibleNums, setBoardFunc, cell }) {

  function onClickHandler(){
    setBoardFunc((prev)=>{
      let num = cell.value;
      num = num + 1;
      if(num + 1 === 10){
        num = -1;
      }
      prev[cell.index].value = num;
      return [...prev];
    })

  }
  return (
    <div style={{
      marginRight: spaceRight ? "35px" : "15px",
      marginBottom: "5px",
      marginLeft: cell.col === 0 ? "15px": "",
      width: "60px",
      height: "60px"
    }}
         key={cell.index}
    >
      <div
        className="border-2"
        style={{ width: "100%", height: "100%" }}
        id="cube"
        onClick={onClickHandler}
      >
        {possibleNums ?
          <div className="flex flex-col">
            <div className="flex flex-row">
              <h6 style={{fontSize: 8}}>{possibleNums.join("").toString()}</h6>
            </div>
            {cell.value}
          </div>
        :
          <div className="flex flex-col">
            <div className="flex flex-row">
              <h6 style={{fontSize: 10, color: "#282c34"}}>  hire me </h6>
            </div>
            {cell.value}
          </div>
        }
      </div>
    </div>
  );
}

export default Cubes;

Cubes.propTypes = {
  spaceRight: PropTypes.bool.isRequired,
  possibleNums: PropTypes.array,
  setBoardFunc: PropTypes.func.isRequired,
  cell: PropTypes.object.isRequired
};
