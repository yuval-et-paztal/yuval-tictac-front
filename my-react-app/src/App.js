import { useState } from "react";
import Board from "./components/Board";

function calculateWinner(board) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] }; // return "X" or "O" and the winning line
    }
  }

  return null;
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);


  function handleSquareClick(index) {
     if (board[index] || winner) return; // ignore if filled or game over

    const newBoard = [...board];
    //fill square with appropriate symbol
    newBoard[index] = isXTurn ? "X" : "O";

    //update board after move
    setBoard(newBoard);

    //turn switch
    setIsXTurn(!isXTurn);

    const gameWinner = calculateWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner.winner);
      setWinningSquares(gameWinner.line);

      if (gameWinner.winner === "X") {
        setScoreX(scoreX + 1);
      } else {
        setScoreO(scoreO + 1);
      }
    }
  }

 function resetBoard() {
  setBoard(Array(9).fill(null));
  setIsXTurn(true);
  setWinner(null);
  setWinningSquares([]);
}

function resetGame() {
  resetBoard();
  setScoreX(0);
  setScoreO(0);
}

return (
  <div>
    <h1>Tic Tac Toe by Yuval Ha Gever</h1>

    <div className="status">
      {winner
        ? `Winner: ${winner}`
        : board.every((square) => square !== null)
        ? "Draw!"
        : `Next player: ${isXTurn ? "X" : "O"}`}
    </div>

    <Board board={board} onSquareClick={handleSquareClick} winningSquares={winningSquares}/>

    <div className="controls">
      <button className="reset-button" onClick={resetBoard}>
        Reset Board
      </button>

      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>


    <div className="scoreboard">
      <div>Player X: {scoreX}</div>
      <div>Player O: {scoreO}</div>
    </div>
  </div>
);

}

export default App;
