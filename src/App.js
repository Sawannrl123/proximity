import React from "react";
import { Aqi, AqiIndicator } from './components';
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <h1>Air Quality Monitoring</h1>
      </header>
      <main>
        <AqiIndicator />
        <Aqi />
      </main>
    </div>
  );
};

export default App;
