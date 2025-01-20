import React from "react";
import Navbar from "./components/Navbar";
import DailyGoal from "./components/DailyGoal";
import HabitTracker from "./components/HabitTracker";
import ReflectionJournal from "./components/ReflectionJournal";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <DailyGoal />
        <HabitTracker />
        <ReflectionJournal />
      </div>
    </div>
  );
};

export default App;
