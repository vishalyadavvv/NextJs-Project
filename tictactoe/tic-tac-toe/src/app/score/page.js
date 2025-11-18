"use client";
import { useScore } from "../context/ScoreContext";
import { useRouter } from "next/navigation";

export default function ScorePage() {
  const { score } = useScore();
  const router = useRouter();

  const totalGames = score.x + score.o + score.draws;
  const xWinPercentage = totalGames > 0 ? Math.round((score.x / totalGames) * 100) : 0;
  const oWinPercentage = totalGames > 0 ? Math.round((score.o / totalGames) * 100) : 0;
  const drawPercentage = totalGames > 0 ? Math.round((score.draws / totalGames) * 100) : 0;

  const getTrophyColor = (index) => {
    const colors = ["text-yellow-400", "text-gray-400", "text-amber-600"];
    return colors[index] || "text-gray-400";
  };

  const getRank = () => {
    if (totalGames === 0) return "Rookie";
    if (score.x + score.o > 10) return "Grand Master";
    if (score.x + score.o > 5) return "Expert";
    if (score.x + score.o > 2) return "Pro";
    return "Beginner";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4 sm:p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <button
            onClick={() => router.back()}
            className="absolute left-0 top-0 bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-2 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
          </button>

          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Game Statistics
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Track your Tic Tac Toe performance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Player Rank Card */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 sm:p-8 text-center shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2">Player Rank</h3>
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              {getRank()}
            </div>
            <p className="text-gray-400 text-sm mt-2">{totalGames} total games played</p>
          </div>

          {/* Score Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* X Wins Card */}
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-bold text-blue-400 mb-2">{score.x}</div>
              <div className="text-lg font-semibold text-blue-300 mb-2">X Wins</div>
              <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${xWinPercentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-blue-200">{xWinPercentage}%</div>
            </div>

            {/* Draws Card */}
            <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 backdrop-blur-xl border border-gray-500/30 rounded-2xl p-6 text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-bold text-gray-300 mb-2">{score.draws}</div>
              <div className="text-lg font-semibold text-gray-300 mb-2">Draws</div>
              <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-gray-400 to-gray-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${drawPercentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-300">{drawPercentage}%</div>
            </div>

            {/* O Wins Card */}
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6 text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-bold text-amber-400 mb-2">{score.o}</div>
              <div className="text-lg font-semibold text-amber-300 mb-2">O Wins</div>
              <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${oWinPercentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-amber-200">{oWinPercentage}%</div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Win Distribution */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Win Distribution
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">X Victory Rate</span>
                <span className="text-blue-400 font-semibold">{xWinPercentage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">O Victory Rate</span>
                <span className="text-amber-400 font-semibold">{oWinPercentage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Draw Rate</span>
                <span className="text-gray-400 font-semibold">{drawPercentage}%</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Performance Metrics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Total Matches</span>
                <span className="text-white font-semibold">{totalGames}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Decided Games</span>
                <span className="text-green-400 font-semibold">{score.x + score.o}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Win Ratio</span>
                <span className="text-purple-400 font-semibold">
                  {totalGames > 0 ? Math.round(((score.x + score.o) / totalGames) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/game")}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Play Again</span>
          </button>

          <button
            onClick={() => router.push("/")}
            className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 hover:border-gray-500/50 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}