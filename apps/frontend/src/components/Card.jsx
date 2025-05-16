import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Card = () => {
  const [count, setCount] = useState(0);
  const [jokes, setJokes] = useState(0);
  // const url = process.env.API_URL || "http://localhost:4001/api/jokes";

  useEffect(() => {
    const fetchData = async () => {
      // const response = await fetch("http://localhost:4001/api/jokes");
      const response = await fetch("/api/jokes");
      // const response = await fetch(`${process.env.API_URL}/api/jokes`);
      const data = await response.json();
      console.log("res data", data);
      console.log("only jokes", data.data);
      setJokes(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <h1>Jokes length is {jokes?.data?.length}</h1>
        {jokes &&
          jokes?.data?.map((joke) => (
            <div key={joke.id}>
              <p>{joke.joke}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Card;
