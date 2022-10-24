import "./App.css";

// components
import StartScreen from "./components/StartScreen/StartScreen";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";

// react
import { useCallback, useEffect, useState } from "react";

// data
import { wordsList } from "./data/words";

// Como ainda não temos recursos de roteamento estamos fazendo tudo por componentes mesmo
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const guessesQuantity = 5;

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  // Vai ser uma lista de letras
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    // Pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    // Pick a random word
    const wordsCategory = words[category];
    const word =
      wordsCategory[Math.floor(Math.random() * wordsCategory.length)];

    return { word, category };
  }, [words]);

  // starts the secret word game
  const startGame = useCallback(() => {
    clearLetterStates();
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
  }, [pickWordAndCategory, letters, pickedCategory, pickedWord]);

  // process the letter input
  const verifyLetter = (letter) => {
    // O usuário não pode perder as tentativas se ele digitar palvras já escolhidas
    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
      return;
    }

    if (letters.includes(letter)) {
      setGuessedLetters((prevGuessedLetters) => [
        // Pega todos os elementos atuais do array e une com um novo
        ...prevGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((prevWrongLetters) => [...prevWrongLetters, letter]);

      setGuesses((prevGuesses) => {
        return prevGuesses - 1;
      });
    }

    console.log(guesses);
    console.log(letters);
    console.log(guessedLetters);
    console.log(wrongLetters);
    console.log(letter);
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // O UseEffect monitora algum dado que a gente escolhe e realiza uma função toda
  // vez que esse dado é alterado, o [] que ele recebe é o dado que eu quero monitorar
  // check if guesses ended
  useEffect(() => {
    if (guesses === 0) {
      // reset all states
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // check win condition
  useEffect(() => {
    // o Set vai gerar apenas valores não repetidos no array
    const uniqueLetters = [...new Set(letters)];

    if (guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((prevScore) => {
        return prevScore += 100;
      });

      // restart game
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  // restarts the game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQuantity);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          category={pickedCategory}
          word={pickedWord}
          letters={letters}
          score={score}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;