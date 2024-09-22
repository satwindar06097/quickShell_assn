import React, { useState, useEffect, useRef } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import GroupDropdown from "../Dropdowns/GroupDropdown";
import SortDropdown from "../Dropdowns/SortDropdown";
import axios from "axios";
import { groupTickets } from "../../HelperFunctions/groupTickets";
import { sortTickets } from "../../HelperFunctions/sortTickets";

import "./Display.css";

const api = "https://api.quicksell.co/v1/internal/frontend-assignment";

const Display = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(
    localStorage.getItem("grouping") || "status"
  );
  const [sorting, setSorting] = useState(
    localStorage.getItem("sorting") || "priority"
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const getData = async () => {
    try {
      const response = await axios.get(api);
      const { tickets, users } = response.data;
      setTickets(tickets);
      setUsers(users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("sorting", sorting);
  }, [grouping, sorting]);

  const groupedTickets = groupTickets(tickets, grouping, users);
  const sortedTickets = sortTickets(groupedTickets, sorting);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div>
      <div className="navbar">
        <div className="display-card" onClick={toggleDropdown}>
          <span>
            <img src="/icons_FEtask/Display.svg" alt="Display Icon" />
            Display
            <img src="/icons_FEtask/Down.svg" alt="Dropdown Icon" />
          </span>
        </div>
      </div>

      {showDropdown && (
        <div className="dropdown" ref={dropdownRef}>
          <div>
            <span>Grouping</span>
            <GroupDropdown grouping={grouping} setGrouping={setGrouping} />
          </div>
          <div>
            <span>Ordering</span>
            <SortDropdown setSorting={setSorting} sorting={sorting} />
          </div>
        </div>
      )}

      <div className="ticket-container">
        <Dashboard tickets={sortedTickets} users={users} grouping={grouping} />
      </div>
    </div>
  );
};

export default Display;
