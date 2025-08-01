// Home.tsx
import React, { useState } from 'react';
import TimerDisplay from '../components/TimerDisplay';
import SettingsModal from '../components/SettingsModal';
import LogModal from '../components/LogModal';
import LogListModal from '../components/LogListModal';
import { addLogEntry } from '../utils/logs';
import StatsModal from '../components/StatsModal';

const Home: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showLogList, setShowLogList] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [durations, setDurations] = useState({
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  });

  const handleAddLog = (text: string) => {
    if (text.trim()) {
      addLogEntry(text);
      alert("Log eklendi!");
    }
  };

  const handleStatsClick = () => {
    setShowSettings(false);
    setShowStats(true);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-start pt-8">
      <TimerDisplay
        durations={durations}
        onSettingsClick={() => setShowSettings(true)}
      />
      {/* Modal'lar */}
      {showStats && <StatsModal onClose={() => setShowStats(false)} />}
      {showLogModal && <LogModal onSave={handleAddLog} onClose={() => setShowLogModal(false)} />}
      {showLogList && <LogListModal onClose={() => setShowLogList(false)} />}
      {showSettings && (
        <SettingsModal
          durations={durations}
          onSave={setDurations}
          onClose={() => setShowSettings(false)}
          onLogAddClick={() => setShowLogModal(true)}
          onLogListClick={() => setShowLogList(true)}
          onStatsClick={handleStatsClick}
        />
      )}
    </div>
  );
};

export default Home;
