import './App.css';
import React, { useEffect, useState } from "react";

function App() {

  const [strava, setStrava] = useState(null);

  
  const fetchStrava = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/strava"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        setStrava(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => { fetchStrava(); }, []);

  return (
    <>
     
      <h1>Vite + React</h1>
      <h2>{JSON.stringify(strava)}</h2>
      
    </>
  )
}

export default App
