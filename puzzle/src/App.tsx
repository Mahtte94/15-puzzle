import { useState } from "react";

const ROWS = 4;
const COLS = 4;
const TOTAL_TILES = ROWS * COLS;
type Board = number[];

function shuffle(array: number[]): number[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

type AppProps = {};

function App({}: AppProps) {
  const [board, setBoard] = useState<Board>(
    shuffle([...Array(TOTAL_TILES - 1).keys()].map((n) => n + 1).concat(0))
  );

  const randomizeBoard = () => {
    setBoard(
      shuffle([...Array(TOTAL_TILES - 1).keys()].map((n) => n + 1).concat(0))
    );
  };

  const handleTileClick = (index: number) => {
    const emptyIndex = board.indexOf(0);

    const isSingleAdjacent =
      (index === emptyIndex - 1 && emptyIndex % COLS !== 0) ||
      (index === emptyIndex + 1 && (emptyIndex + 1) % COLS !== 0) ||
      index === emptyIndex - COLS ||
      index === emptyIndex + COLS;

    const isDoubleAdjacent =
      (index === emptyIndex - 2 && emptyIndex % COLS > 1) ||
      (index === emptyIndex + 2 && (emptyIndex + 2) % COLS > 1) ||
      index === emptyIndex - 2 * COLS ||
      index === emptyIndex + 2 * COLS;

    const newBoard = [...board];

    if (isSingleAdjacent) {
      [newBoard[index], newBoard[emptyIndex]] = [
        newBoard[emptyIndex],
        newBoard[index],
      ];
    } else if (isDoubleAdjacent) {
      let middleTileIndex: number;

      if (index === emptyIndex - 2) {
        middleTileIndex = emptyIndex - 1;
        newBoard[emptyIndex] = newBoard[middleTileIndex];
        newBoard[middleTileIndex] = newBoard[index];
        newBoard[index] = 0;
      } else if (index === emptyIndex + 2) {
        middleTileIndex = emptyIndex + 1;
        newBoard[emptyIndex] = newBoard[middleTileIndex];
        newBoard[middleTileIndex] = newBoard[index];
        newBoard[index] = 0;
      } else if (index === emptyIndex - 2 * COLS) {
        middleTileIndex = emptyIndex - COLS;
        newBoard[emptyIndex] = newBoard[middleTileIndex];
        newBoard[middleTileIndex] = newBoard[index];
        newBoard[index] = 0;
      } else {
        middleTileIndex = emptyIndex + COLS;
        newBoard[emptyIndex] = newBoard[middleTileIndex];
        newBoard[middleTileIndex] = newBoard[index];
        newBoard[index] = 0;
      }
    }

    setBoard(newBoard);
  };

  const isWinning = () => {
    for (let i = 0; i < TOTAL_TILES - 1; i++) {
      if (board[i] !== i + 1) return false;
    }
    return board[TOTAL_TILES - 1] === 0;
  };

  const getTileSize = () => {
    const maxWidth = Math.min(600, window.innerWidth - 100);
    const maxHeight = Math.min(600, window.innerHeight - 300);
    
    const tileWidth = Math.floor((maxWidth - (COLS + 1) * 12) / COLS);
    const tileHeight = Math.floor((maxHeight - (ROWS + 1) * 12) / ROWS);
    
    const size = Math.min(tileWidth, tileHeight, 120);
    return Math.max(size, 30);
  };

  const tileSize = getTileSize();
  const boardWidth = COLS * tileSize + (COLS + 1) * 12;
  const boardHeight = ROWS * tileSize + (ROWS + 1) * 12;
  const fontSize = Math.min(tileSize / 3, 24);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-4">
      {isWinning() && (
        <div className="mb-6 p-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl shadow-lg border-0 animate-pulse">
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl">🎉</span>
            <span className="text-lg font-semibold">Congratulations! You solved the puzzle!</span>
            <span className="text-3xl">🎉</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
        <section 
          className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl shadow-inner mx-auto"
          style={{
            width: `${boardWidth}px`,
            height: `${boardHeight}px`,
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gap: '12px',
            padding: '12px'
          }}
        >
          {board.map((tile, index) => (
            <div
              key={index}
              onClick={() => handleTileClick(index)}
              className={`flex justify-center items-center font-bold rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-105 shadow-lg ${
                tile === 0 
                  ? "bg-slate-300 shadow-inner" 
                  : "bg-gradient-to-br from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700 active:scale-95"
              }`}
              style={{
                width: `${tileSize}px`,
                height: `${tileSize}px`,
                fontSize: `${fontSize}px`
              }}
            >
              {tile !== 0 ? tile : ""}
            </div>
          ))}
        </section>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={randomizeBoard}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-lg font-semibold rounded-xl hover:from-emerald-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg active:scale-95"
          >
            🎲 Randomize
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
