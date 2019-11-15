import React from "react";
import Filter from "./Filter.jsx";
export default props => {
  return (
    <div className="navigation">
      <input
        type="text"
        name="serach"
        placeholder="Search for food..."
        onChange={props.handleSearch.bind(this)}
        value={props.searchValue}
      />
      <Filter filter={props.filter.bind(this)} />
    </div>
  );
};
