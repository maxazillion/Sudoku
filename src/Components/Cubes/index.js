import PropTypes from "prop-types";

function Cubes({ spaceRight, number, possibleNums }) {
  return (
    <div style={{
      marginRight: spaceRight ? "35px" : "15px",
      marginBottom: "5px",
      width: "60px",
      height: "60px"
    }}>
      <div className="border-2" style={{ width: "100%", height: "100%" }} id="cube">
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
};
