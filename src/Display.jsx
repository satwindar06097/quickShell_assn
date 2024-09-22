import React, { useState, useEffect, useRef } from "react";
import { Dashboard } from "./components/Dashboard";
import GroupDropdown from "./Dropdowns/GroupDropdown";
import SortDropdown from "./Dropdowns/SortDropdown";
import axios from "axios";
import { groupTickets } from "./components/groupTickets";
import { sortTickets } from "./components/sortTickets";
import { IoIosArrowDown } from "react-icons/io";

import "./components/Display.css";

// API URL
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

  // Fetch data
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

  // Store grouping and sorting in localStorage
  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("sorting", sorting);
  }, [grouping, sorting]);

  // Group and sort tickets
  const groupedTickets = groupTickets(tickets, grouping, users);
  const sortedTickets = sortTickets(groupedTickets, sorting);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Close dropdown if clicked outside
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
      {/* Navbar with small card */}
      <div className="navbar">
        <div className="display-card" onClick={toggleDropdown}>
          <span>
            <img src="/icons_FEtask/Display.svg" alt="Display Icon" />
            Display
            <img src="/icons_FEtask/Down.svg" alt="Dropdown Icon" />
          </span>
        </div>
      </div>

      {/* Dropdown Content */}
      {showDropdown && (
        <div className="dropdown" ref={dropdownRef}>
          <div>
            <span>Grouping</span>
            <GroupDropdown setGrouping={setGrouping} />
          </div>
          <div>
            <span>Ordering</span>
            <SortDropdown setSorting={setSorting} />
          </div>
        </div>
      )}

      {/* Tickets display */}
      <div className="ticket-container">
        <Dashboard tickets={sortedTickets} users={users} grouping={grouping} />
      </div>
    </div>
  );
};

export default Display;
