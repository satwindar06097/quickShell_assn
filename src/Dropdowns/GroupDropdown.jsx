import React from "react";
import "./GroupDropdown.css";

const GroupDropdown = ({ setGrouping }) => {
  return (
    <select
      className="group-dropdown"
      onChange={(e) => setGrouping(e.target.value)}
    >
      <option value="status">Status </option>
      <option value="priority">Priority</option>
      <option value="user">User</option>
    </select>
  );
};

export default GroupDropdown;
