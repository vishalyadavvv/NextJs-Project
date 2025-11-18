"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: "🎮",
      title: "Smart AI",
      description: "Play against intelligent gameplay"
    },
    {
      icon: "📊",
      title: "Live Stats",
      description: "Track your performance in real-time"
    },
    {
      icon: "⚡",
      title: "Fast & Smooth",
      description: "Lightning-fast gameplay experience"
    },
    {
      icon: "🏆",
      title: "Achievements",
      description: "Unlock ranks and milestones"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/10 rounded-full blur-2xl"></div>
        
        {/* Floating Particles */}
        {mounted && [...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header/Navigation */}
        <header className="flex justify-between items-center mb-16 sm:mb-24">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">XOX</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              TicTacToe
            </span>
          </div>
          
          <div className="flex space-x-4">
           
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl px-6 py-3 mb-6">
              <span className="text-cyan-300 text-sm font-semibold">🎯 Classic Game, Modern Experience</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
              Tic Tac Toe
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the classic game reimagined with{" "}
            <span className="text-cyan-300 font-semibold">stunning visuals</span> and{" "}
            <span className="text-purple-300 font-semibold">smooth gameplay</span>
          </p>

          {/* Animated Game Preview */}
          <div className="max-w-sm mx-auto mb-12">
            <div className="grid grid-cols-3 gap-3 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
              {['X', 'O', 'X', 'O', 'X', 'O', 'X', '', 'O'].map((cell, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
                    cell === 'X' 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
                      : cell === 'O'
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg'
                      : 'bg-gray-700/50 border border-gray-600/50'
                  }`}
                >
                  {cell}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => router.push("/login")}
              className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3 min-w-48 justify-center"
            >
              <span>Start Playing</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <button
              onClick={() => router.push("/register")}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-3 min-w-48 justify-center"
            >
              <span>Create Account</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Why Play With Us?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover the ultimate Tic Tac Toe experience with features designed for modern gamers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/30 rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16 sm:mt-24">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Ready to Challenge Your Friends?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of players in the ultimate Tic Tac Toe experience
            </p>
            <button
              onClick={() => router.push("/register")}
              className="bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started Free
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-gray-800/50">
          <p className="text-gray-500 text-sm">
            Made with ❤️ for Tic Tac Toe enthusiasts everywhere
          </p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}