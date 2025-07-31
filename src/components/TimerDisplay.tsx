import React, { useEffect, useState } from 'react';
import { CiSettings } from "react-icons/ci";
import { incrementPomodoroCount } from "../utils/pomodoroStats";

type Mode = 'pomodoro' | 'short break' | 'long break';

interface TimerDisplayProps {
  durations: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };
  onSettingsClick: () => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ durations, onSettingsClick }) => {
  const [selectedMode, setSelectedMode] = useState<Mode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(durations.pomodoro);
  const [isRunning, setIsRunning] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Timer çalışma mantığı
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  // Mod veya durations değiştiğinde süreyi ayarla
  useEffect(() => {
    switch (selectedMode) {
      case 'pomodoro':
        setTimeLeft(durations.pomodoro);
        break;
      case 'short break':
        setTimeLeft(durations.shortBreak);
        break;
      case 'long break':
        setTimeLeft(durations.longBreak);
        break;
    }
    setIsRunning(false); // mod değişince durdur
  }, [selectedMode, durations]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning && selectedMode === "pomodoro") {
      incrementPomodoroCount();
      setIsRunning(false); // Sayaç durdurulabilir
      // İstersen burada bildirim veya modal açabilirsin
    }
  }, [timeLeft, isRunning, selectedMode]);

  const toggleTimer = () => setIsRunning(prev => !prev);

  const getProgress = () => {
    const total =
      selectedMode === 'pomodoro'
        ? durations.pomodoro
        : selectedMode === 'short break'
        ? durations.shortBreak
        : durations.longBreak;

    return ((total - timeLeft) / total) * 100;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-3xl font-semibold mb-8">pomodoro</h1>

      {/* Tab buttons */}
      <div className="flex bg-[#161932] rounded-full overflow-hidden mb-12">
        {(['pomodoro', 'short break', 'long break'] as Mode[]).map(mode => (
          <button
            key={mode}
            onClick={() => setSelectedMode(mode)}
            className={`px-6 py-2 capitalize font-medium transition-colors duration-200 ${
              mode === selectedMode
                ? 'bg-[#f87070] text-white'
                : 'text-gray-300 hover:bg-[#2e325a]'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Circle Timer */}
      <div
        className="relative w-72 h-72 rounded-full flex items-center justify-center bg-[#161932] shadow-inner"
        onClick={toggleTimer}
      >
        <svg className="absolute top-0 left-0 w-full h-full">
          <circle
            className="text-[#2e325a]"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="120"
            cx="145"
            cy="145"
          />
          <circle
            className="text-[#f87070] transition-all duration-1000"
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={
              2 * Math.PI * 120 * (1 - getProgress() / 100)
            }
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="120"
            cx="145"
            cy="145"
          />
        </svg>

        <div className="flex flex-col items-center">
          <span className="text-6xl font-bold">
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </span>
          <span className="mt-2 uppercase tracking-widest text-gray-400 text-sm">
            {isRunning ? 'pause' : 'start'}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onSettingsClick}
        className="mt-2 p-2 rounded flex items-center justify-center text-white text-2xl hover:transform hover:scale-110 transition-transform duration-200"
        aria-label="Ayarlar"
      >
        <CiSettings />
      </button>
    </div>
  );
};

export default TimerDisplay;
