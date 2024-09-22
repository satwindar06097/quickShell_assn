import React from "react";
import "./GroupDropdown.css";

const GroupDropdown = ({ setGrouping, grouping }) => {
  return (
    <select
      className="group-dropdown"
      value={grouping}
      onChange={(e) => setGrouping(e.target.value)}
    >
      <option value="status">Status </option>
      <option value="priority">Priority</option>
      <option value="user">User</option>
    </select>
  );
};

export default GroupDropdown;
