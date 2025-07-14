import { useState } from "react";
function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }
  const handler = (index) => {
    if (squares[index] || winner) {
      return;
    }
    const newSquares = [...squares];
    newSquares[index] = xIsNext ? "X" : "O";
    onPlay(newSquares);
  };
  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Square value={squares[0]} onClickhandler={() => handler(0)} />
        <Square value={squares[1]} onClickhandler={() => handler(1)} />
        <Square value={squares[2]} onClickhandler={() => handler(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onClickhandler={() => handler(3)} />
        <Square value={squares[4]} onClickhandler={() => handler(4)} />
        <Square value={squares[5]} onClickhandler={() => handler(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onClickhandler={() => handler(6)} />
        <Square value={squares[7]} onClickhandler={() => handler(7)} />
        <Square value={squares[8]} onClickhandler={() => handler(8)} />
      </div>
    </>
  );
}

function Square({ value, onClickhandler }) {
  return (
    <button
      onClick={onClickhandler}
      className="border-gray-400 border-2  h-16 w-16 m-3 text-4xl font-semibold"
    >
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }
  const moves = history.map((squares, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  return (
    <>
      <div className="flex  justify-center items-center  h-screen gap-16">
        <div>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="flex flex-col">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}
