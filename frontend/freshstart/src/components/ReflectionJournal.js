import React, { useState, useEffect } from "react";
import axios from "axios";

const ReflectionJournal = () => {
  const [reflection, setReflection] = useState("");
  const [reflections, setReflections] = useState({});

  useEffect(() => {
    const fetchReflections = async () => {
      const response = await axios.get("/reflect");
      setReflections(response.data);
    };
    fetchReflections();
  }, []);

  const submitReflection = async () => {
    try {
      const response = await axios.post("/reflect", { reflection });
      setReflections({ ...reflections, [new Date().toLocaleDateString()]: reflection });
      setReflection("");
    } catch (error) {
      console.error("Error submitting reflection");
    }
  };

  return (

    
    <div id="reflection-journal">
      <h2>Reflection Journal</h2>
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Write your thoughts..."
      />
      <button onClick={submitReflection}>Submit</button>
      <h3>Previous Reflections</h3>
      <ul>
        {Object.keys(reflections).map((date, index) => (
          <li key={index}>
            {date}: {reflections[date]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReflectionJournal;
