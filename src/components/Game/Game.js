import { useState, useRef } from "react";
import "./styles.css";

const Game = ({
  verifyLetter,
  category,
  letters,
  score,
  guessedLetters,
  wrongLetters,
  guesses,
  normalizeFunction
}) => {
  const [letter, setLetter] = useState("");

  // Vai criar uma referência a algum lugar
  const letterInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Vai focar no elemento ao fim do submit
    letterInputRef.current.focus();

    const letterResult = letter.replace(/[^a-zA-Z\u00C0-\u00FF]+/, "");
    if (letterResult !== "") {
      verifyLetter(normalizeFunction(letterResult.toLowerCase()));
      setLetter("");

    } else {
      alert("Insira apenas LETRAS!");
    }
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{category}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          // o includes determina se o array tem determinado elemento
          guessedLetters.includes(normalizeFunction(letter)) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            onChange={(event) => setLetter(event.target.value)}
            value={letter}
            ref={letterInputRef}
            required
          />
          <button type="submit">Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>
          Letras <strong>INCORRETAS</strong> já utilizadas:
        </p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
