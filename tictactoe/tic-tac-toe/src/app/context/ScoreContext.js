"use client";
import { createContext, useContext, useState } from "react";

const ScoreContext = createContext();

export function ScoreProvider({ children }) {
  const [score, setScore] = useState({
    x: 0,
    o: 0,
    draws: 0,
  });

  const addXWin = () => {
    setScore((prev) => ({ ...prev, x: prev.x + 1 }));
  };

  const addOWin = () => {
    setScore((prev) => ({ ...prev, o: prev.o + 1 }));
  };

  const addDraw = () => {
    setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
  };

  return (
    <ScoreContext.Provider value={{
      xWins: score.x,
      oWins: score.o,
      draws: score.draws,
      addXWin,
      addOWin,
      addDraw
    }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  return useContext(ScoreContext);
}
