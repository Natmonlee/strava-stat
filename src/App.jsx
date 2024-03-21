import "./App.css";

function App() {
  const handleAuthStrava = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/strava");
      const data = await response.json();
      window.location.href = data.redirectUrl;
    } catch (error) {
      console.error("Error initiating Strava authentication:", error.message);
    }
  };

  return (
    <>
      <button onClick={handleAuthStrava}>Authorize Strava</button>
    </>
  );
}

export default App;
