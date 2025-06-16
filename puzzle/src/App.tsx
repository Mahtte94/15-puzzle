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

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-2 sm:p-4 lg:p-8">
      {isWinning() && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl sm:rounded-2xl shadow-lg animate-pulse w-full max-w-xs sm:max-w-lg">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="text-lg sm:text-3xl">🎉</span>
            <span className="text-sm sm:text-lg font-semibold text-center">
              <span className="block sm:hidden">Puzzle Solved!</span>
              <span className="hidden sm:block">Congratulations! You solved the puzzle!</span>
            </span>
            <span className="text-lg sm:text-3xl">🎉</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-6 lg:p-6 w-full max-w-xs sm:max-w-lg  flex flex-col items-center">
        <section className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl sm:rounded-2xl shadow-inner p-2 sm:p-3 grid grid-cols-4 gap-1 sm:gap-2 lg:gap-3  w-fit">
          {board.map((tile, index) => (
            <div
              key={index}
              onClick={() => handleTileClick(index)}
              className={`
                w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24
                flex justify-center items-center font-bold 
                text-sm sm:text-base lg:text-xl
                rounded-lg sm:rounded-xl cursor-pointer 
                transition-all duration-200 transform 
                hover:scale-105 active:scale-95 shadow-lg 
                select-none touch-manipulation
                ${tile === 0 
                  ? "bg-slate-300 shadow-inner" 
                  : "bg-gradient-to-br from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700"
                }
              `}
            >
              {tile !== 0 ? tile : ""}
            </div>
          ))}
        </section>

        <div className="mt-4 sm:mt-6 flex justify-center">
          <button
            onClick={randomizeBoard}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm sm:text-lg font-semibold rounded-lg sm:rounded-xl hover:from-emerald-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg active:scale-95 touch-manipulation"
          >
            <span className="">🎲 Randomize</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;