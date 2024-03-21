import './App.css';
import React, { useState } from "react";

function App() {

  const [athleteData, setAthleteData] = useState(null);
  const [code, setCode] = useState(null);
  
  const handleAuthStrava = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/auth/strava"
      );
      console.log(response);
      const data = await response.json();
      setCode(data.access_token);
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error("Error initiating Strava authentication:", error.message);
    }
  };

  const fetchDataFromStrava = async () => { 
    try {
      const response = await fetch(
        "http://localhost:5000/strava", {
          params: {
            code: code,
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching data from Strava: ${response.status}`);
      } else {
        const data = await response.json();
        setAthleteData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  // useEffect(() => { handleAuthStrava(); }, []);

  return (
    <>
     
      <h1>Vite + React</h1>
      <button onClick={handleAuthStrava}>Authorize Strava</button>
      <button onClick={fetchDataFromStrava}>Fetch Data</button>
      <h2>{JSON.stringify(athleteData)}</h2>
      
    </>
  )
}

export default App
