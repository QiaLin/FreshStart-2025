import React, { useState, useEffect } from "react";
import axios from "axios";

const DailyGoal = () => {
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await axios.get("/goal");
      setGoals(response.data);
    };
    fetchGoals();
  }, []);

  const submitGoal = async () => {
    try {
      const response = await axios.post("/goal", { goal });
      setMessage(response.data.message);
      // Format the date as YYYY-MM-DD
      const formattedDate = new Date().toISOString().split('T')[0];
      setGoals([...goals, { goal, date: formattedDate }]);
      setGoal("");
    } catch (error) {
      setMessage("Error setting goal");
    }
  };

  return (
    <div id="daily-goal">
      <h2>Set Your Daily Goal</h2>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter your goal"
      />
      <button onClick={submitGoal}>Submit</button>
      {message && <p>{message}</p>}
      <h3>Previous Goals</h3>
      <ul>
        {goals.map((g, index) => (
          <li key={index}>{g.date}: {g.goal}</li>
        ))}
      </ul>
    </div>
  );
};

export default DailyGoal;
