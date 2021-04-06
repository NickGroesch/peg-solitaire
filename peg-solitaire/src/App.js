import React from 'react';
import './App.css';
import Pegboard from "./components/Pegboard"

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }} id='background'>
      <Pegboard />
    </div>

  );
}

export default App;
