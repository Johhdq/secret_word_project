import "./App.css";

// components
import StartScreen from "./components/StartScreen/StartScreen";

// react
import { userCallback, useEffect, useState } from "react";

// data
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);

  return (
    <div className="App">
      { gameStage === "start" && <StartScreen />}
    </div>
  );
}

export default App;
