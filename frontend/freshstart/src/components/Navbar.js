import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Navbar logo with animation */}
      <h1 className="navbar-logo">FreshStart 2025</h1>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <a href="#daily-goal" className="navbar-link">Daily Goal</a>
        </li>
        <li className="navbar-item">
          <a href="#habit-tracker" className="navbar-link">Habit Tracker</a>
        </li>
        <li className="navbar-item">
          <a href="#reflection-journal" className="navbar-link">Reflection</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
