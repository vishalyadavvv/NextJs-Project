"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useScore } from "../context/ScoreContext";

export default function Game() {
  const router = useRouter();
  const { xWins, oWins, draws, addXWin, addOWin, addDraw } = useScore();

  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [winningCombo, setWinningCombo] = useState([]);
  const [nextStarter, setNextStarter] = useState("X");
  const [starterReason, setStarterReason] = useState("First game - X starts");

  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  const checkWinner = (b) => {
    for (let c of winCombos) {
      const [a, b2, c2] = c;
      if (b[a] && b[a] === b[b2] && b[a] === b[c2]) {
        setWinningCombo(c);
        return b[a];
      }
    }
    return null;
  };

  const checkDraw = (b) => {
    return b.every((cell) => cell !== "");
  };

  const handleClick = (i) => {
    if (board[i] || gameOver) return;

    const newBoard = [...board];
    newBoard[i] = turn;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameOver(true);
      
      setTimeout(() => {
        if (winner === "X") addXWin();
        else addOWin();
        
        // Winner starts next game - set after score update
        setNextStarter(winner);
        setStarterReason(`${winner} starts (previous winner)`);
        resetGame(winner);
      }, 2000);
      return;
    }

    if (checkDraw(newBoard)) {
      setGameOver(true);
      
      setTimeout(() => {
        addDraw();
        
        // Random starter on draw - set after score update
        const randomStarter = Math.random() < 0.5 ? "X" : "O";
        setNextStarter(randomStarter);
        setStarterReason(`${randomStarter} starts (random after draw)`);
        resetGame(randomStarter);
      }, 2000);
      return;
    }

    setTurn(turn === "X" ? "O" : "X");
  };

  const resetGame = (starter) => {
    setBoard(Array(9).fill(""));
    setTurn(starter || nextStarter);
    setGameOver(false);
    setWinningCombo([]);
  };

  const getCellClass = (index) => {
    let baseClass = "h-20 sm:h-24 md:h-28 transition-all duration-300 flex items-center justify-center rounded-xl shadow-lg font-bold text-3xl md:text-4xl ";
    
    if (winningCombo.includes(index)) {
      baseClass += "bg-gradient-to-br from-green-500 to-emerald-600 text-white scale-105 shadow-2xl";
    } else if (board[index]) {
      baseClass += board[index] === "X" 
        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white" 
        : "bg-gradient-to-br from-amber-400 to-orange-500 text-white";
    } else {
      baseClass += "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:scale-105";
    }
    
    return baseClass;
  };

  const logout = async () => {
    await fetch("/api/logout");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white flex flex-col items-center p-4 sm:p-6">
      {/* Header */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Tic Tac Toe
        </h1>
        <button 
          onClick={logout} 
          className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Logout
        </button>
      </div>

      {/* Game Info */}
      <div className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Current Turn</div>
            <div className={`text-2xl sm:text-3xl font-bold ${turn === "X" ? "text-blue-400" : "text-amber-400"} transition-colors duration-300`}>
              {turn}'s Turn
            </div>
            <div className="text-xs text-green-400 mt-1">
              {starterReason}
            </div>
          </div>
          
          <button 
            onClick={resetGame}
            className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Reset Game
          </button>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md mb-8 sm:mb-12 p-4 bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl">
        {board.map((cell, i) => (
          <button 
            key={i} 
            onClick={() => handleClick(i)}
            className={getCellClass(i)}
            disabled={gameOver}
          >
            {cell === "X" ? (
              <span className="animate-pop-in">✕</span>
            ) : cell === "O" ? (
              <span className="animate-pop-in">○</span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Score Board */}
      <div className="w-full max-w-2xl grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-blue-500/30">
          <div className="text-blue-400 text-sm mb-1">X Wins</div>
          <div className="text-2xl sm:text-3xl font-bold text-white">{xWins}</div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-500/30">
          <div className="text-gray-300 text-sm mb-1">Draws</div>
          <div className="text-2xl sm:text-3xl font-bold text-white">{draws}</div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-amber-500/30">
          <div className="text-amber-400 text-sm mb-1">O Wins</div>
          <div className="text-2xl sm:text-3xl font-bold text-white">{oWins}</div>
        </div>
      </div>

      {/* Game Status Message */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 max-w-sm w-full mx-4 border border-gray-700/50 shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
              {winningCombo.length > 0 ? `Player ${board[winningCombo[0]]} Wins!` : "It's a Draw!"}
            </h3>
            <p className="text-gray-300 mb-6">
              {winningCombo.length > 0 
                ? `Player ${board[winningCombo[0]]} will start next game!` 
                : `Next game starts randomly...`}
            </p>
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pop-in {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}