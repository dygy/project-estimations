import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Body from "./components/body/Body";

const App = (): JSX.Element => {
  const [appState, setAppState] = useState("home");

  return (
    <div className="App">
      <Header appState={appState} />
      <Body appState={appState} setAppState={setAppState} />
    </div>
  );
};

export default App;
