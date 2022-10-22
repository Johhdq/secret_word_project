import "./styles.css";

const GameOver = ({ retry, score }) => {
  return (
    <div>
      <h1>Game Over!</h1>
      <h2 className="score">
        A sua pontuação foi de:&nbsp;<span>{score} pontos</span>
      </h2>
      <button onClick={retry}>Reiniciar</button>
    </div>
  );
};

export default GameOver;
