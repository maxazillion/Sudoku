import PropTypes from "prop-types";
import { useState } from "react";

function Button({ content, action }) {
  return <button
    className="border-2 rounded-md"
    onClick={() => {
      action();
    }}
    style={{
      margin: "10px",
      paddingLeft: "5px",
      paddingRight: "5px"
    }}>
    {content}
  </button>;
}


export default Button;

Button.propTypes = {
  content: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};


