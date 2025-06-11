import "./App.css";
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
    setBoard(shuffle([...Array(TOTAL_TILES - 1).keys()].map((n) => n + 1).concat(0)));
  };


  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <section className="max-w-5xl w-full h-3/5 bg-slate-600 grid grid-cols-4 gap-2 p-4">
        {board.map((tile, index) => (
          <div
            key={index}
            className={`w-full h-full flex justify-center items-center text-white text-2xl font-bold ${
              tile === 0 ? "bg-gray-400" : "bg-red-500"
            }`}
          >
            {tile !== 0 ? tile : ""}
          </div>
        ))}
      </section>
      <button
        onClick={randomizeBoard}
        className="mt-4 px-4 py-2 bg-green-500 text-white text-lg font-bold rounded hover:bg-green-600"
      >
        Randomize
      </button>
    </main>
  );
}

export default App;
