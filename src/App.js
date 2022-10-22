import "./App.css";

// components
import StartScreen from "./components/StartScreen/StartScreen";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";

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
  const [words] = useState(wordsList);

  console.log(words);

  return (
    <div className="App">
      { gameStage === "start" && <StartScreen /> }
      { gameStage === "game" && <Game /> }
      {gameStage === "end" && <GameOver />}
    </div>
  );
}

export default App;
