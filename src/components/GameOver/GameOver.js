import "./styles.css";

const GameOver = ({ retry, score, correctWord }) => {
  return (
    <div>
      <h1>Game Over!</h1>
      <h2 className="score">
        A sua pontuação foi de:&nbsp;<span>{score} pontos</span>
      </h2>
      <span className="correctWord">A palavra era: <strong>{correctWord}</strong></span>
      <button onClick={retry}>Reiniciar</button>
    </div>
  );
};

export default GameOver;
