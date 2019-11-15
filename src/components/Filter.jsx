import React from "react";
export default props => {
  return (
    <button className="filter" onClick={props.filter.bind(this)}>
      Filter
    </button>
  );
};
