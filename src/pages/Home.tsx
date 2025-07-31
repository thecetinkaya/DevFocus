// Home.tsx
import React, { useState } from 'react';
import TimerDisplay from '../components/TimerDisplay';
import SettingsModal from '../components/SettingsModal';
import LogModal from '../components/LogModal';
import LogListModal from '../components/LogListModal';
import { addLogEntry } from '../utils/logs';
import Sidebar from '../components/Sidebar';
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

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-start">
      
       <Sidebar
        onLogAddClick={() => setShowLogModal(true)}
        onLogListClick={() => console.log("Log Kayıtları tıklandı")}
        onStatsClick={() => setShowStats(true)} // İstatistikleri göster butonuna tıklandığında showStats'i true yap
      />
      {showStats && <StatsModal onClose={() => setShowStats(false)} />}

      <TimerDisplay
        durations={durations}
        onSettingsClick={() => setShowSettings(true)}
      />

      {showLogModal && (
        <LogModal
          onSave={handleAddLog}
          onClose={() => setShowLogModal(false)}
        />
      )}

      {showLogList && (
        <LogListModal onClose={() => setShowLogList(false)} />
      )}

      {showSettings && (
        <SettingsModal
          durations={durations}
          onSave={setDurations}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default Home;
