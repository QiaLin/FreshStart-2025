import React, { useState, useEffect } from "react";
import axios from "axios";

const HabitTracker = () => {
  const [habits, setHabits] = useState({});
  const [habit, setHabit] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get("/habits");
        setHabits(response.data);
      } catch (error) {
        console.error("Error fetching habits", error);
      }
    };
    fetchHabits();
  }, []);

  const addHabit = async () => {
    try {
      await axios.post("/habits", { habit });
      setHabits({ ...habits, [habit]: { streak: 0, last_completed: null } });
      setHabit("");
    } catch (error) {
      console.error("Error adding habit", error);
    }
  };

  const deleteHabit = async (habitName) => {
    try {
      const response = await axios.delete("/habits/delete", { data: { habit: habitName } });
      const updatedHabits = { ...habits };
      delete updatedHabits[habitName]; // Remove the habit locally
      setHabits(updatedHabits);
      setMessage(response.data.message); // Display the success message
    } catch (error) {
      setMessage("There was an error deleting the habit.");
    }
  };

  const completeHabit = async (habitName) => {
    try {
      const response = await axios.post("/habits/complete", { habit: habitName });
      const updatedHabits = { ...habits, [habitName]: response.data };
      setHabits(updatedHabits);
      setMessage(updatedHabits[habitName].message);
    } catch (error) {
      console.error("Error completing habit", error);
      setMessage("There was an error completing the habit.");
    }
  };

  return (
    <div id="habit-tracker">
      <h2>Habit Tracker</h2>
      <input
        type="text"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Enter a habit"
      />
      <button onClick={addHabit}>Add Habit</button>
    {message && <p>{message}</p>}
    <h3>Habits</h3>
      <ul>
        {Object.keys(habits).map((key, index) => (
          <li key={index}>
            <span>{key}: {habits[key].streak} days</span>   
            <div>
            <button onClick={() => completeHabit(key)}>Complete</button>
            <button onClick={() => deleteHabit(key)}>Delete</button>
            </div>         

          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;
