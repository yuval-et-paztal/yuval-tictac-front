import Square from "./Square";

function Board({ board, onSquareClick, winningSquares }) {
  return (
    <div className="board">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          highlight={winningSquares.includes(index)}
        />
      ))}
    </div>
  );
}

export default Board;
