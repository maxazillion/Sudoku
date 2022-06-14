import PropTypes from "prop-types";

function Cubes({ spaceRight, number, possibleNums, setBoardFunc, indexPair, }) {

  function onClickHandler(){
    setBoardFunc((prev)=>{
      let num = prev[indexPair[0]][indexPair[1]];
      num = num + .5;
      if(num + .5 === 10){
        num = -.5;
      }
      prev[indexPair[0]][indexPair[1]] = num;
      return [...prev];
    })

  }
  return (
    <div style={{
      marginRight: spaceRight ? "35px" : "15px",
      marginBottom: "5px",
      marginLeft: indexPair[1] === 0 ? "15px": "",
      width: "60px",
      height: "60px"
    }}
         key={indexPair}
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
            {number}
          </div>
        :
          <div className="flex flex-col">
            <div className="flex flex-row">
              <h6 style={{fontSize: 10, color: "#282c34"}}>  hire me </h6>
            </div>
            {number}
          </div>
        }
      </div>
    </div>
  );
}

export default Cubes;

Cubes.propTypes = {
  spaceRight: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
  possibleNums: PropTypes.array,
  setBoardFunc: PropTypes.func.isRequired,
  indexPair: PropTypes.array.isRequired,
};
