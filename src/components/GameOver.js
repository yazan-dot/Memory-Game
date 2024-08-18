export default function GameOver({ typeOfGameOver, onAgain }) {
  return (
    <div className="game-over">
      <div className="inside-game">
        <h2>Game Over</h2>
        <p>{typeOfGameOver}</p>
        <button onClick={onAgain}>Again!</button>
      </div>
    </div>
  );
}
