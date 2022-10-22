import "./App.css";

// components
import StartScreen from "./components/StartScreen/StartScreen";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";

// react
import { userCallback, useEffect, useState } from "react";

// data
import { wordsList } from "./data/words";

// Como ainda não temos recursos de roteamento estamos fazendo tudo por componentes mesmo
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  // Vai ser uma lista de letras
  const [letters, setLetters] = useState([]);

  const pickWordAndCategory = () => {
    // Pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    // Pick a random word
    const wordsCategory = words[category];
    const word = wordsCategory[Math.floor(Math.random() * wordsCategory.length)];
    
    return { word, category };
  };

  // starts the secret word game
  const startGame = () => {
    // pick word and pick category
    // Estou desestruturando o retorno do método!
    const { word, category } = pickWordAndCategory();

    // Create an array of letters
    // Separando a palavra em letras, em uma lista
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());

    // Setando os estados com os valores corretos
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);

    console.log(`Category: ${pickedCategory};\nWord: ${pickedWord} `);
    console.log(letters);    
  };

  // process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  };

  // restarts the game
  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      { gameStage === "start" && <StartScreen startGame={startGame} /> }
      { gameStage === "game" && <Game verifyLetter={verifyLetter} /> }
      { gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
