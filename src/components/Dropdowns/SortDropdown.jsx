import React from "react";

import "./SortDropdown.css";

const SortDropdown = ({ setSorting, sorting }) => {
  return (
    <select
      className="sort-dropdown"
      value={sorting}
      onChange={(e) => setSorting(e.target.value)}
    >
      <option value="priority">Priority</option>
      <option value="title">Title</option>
    </select>
  );
};

export default SortDropdown;
