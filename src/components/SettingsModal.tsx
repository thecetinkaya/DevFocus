import React, { useState, useCallback } from 'react';
import { getPomodoroStats } from '../utils/pomodoroStats';
import { getLogs } from '../utils/logs';
import LogModal from './LogModal'; // LogModal'ı eklemeyi unutma

type SettingsProps = {
  durations: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };
  onSave: (newDurations: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  }) => void;
  onClose: () => void;
  onLogAddClick?: () => void;
  onLogListClick?: () => void;
  onStatsClick?: () => void;
};

const SettingsModal: React.FC<SettingsProps> = ({ durations, onSave, onClose }) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'logs' | 'stats'>('settings');
  const [localDurations, setLocalDurations] = useState({
    pomodoro: String(durations.pomodoro / 60),
    shortBreak: String(durations.shortBreak / 60),
    longBreak: String(durations.longBreak / 60),
  });
  const [showLogModal, setShowLogModal] = useState(false);
  const [logFilter, setLogFilter] = useState<"daily" | "weekly" | "monthly">("daily");

  const handleSave = useCallback(() => {
    onSave({
      pomodoro: Math.max(1, Number(localDurations.pomodoro)) * 60,
      shortBreak: Math.max(1, Number(localDurations.shortBreak)) * 60,
      longBreak: Math.max(1, Number(localDurations.longBreak)) * 60,
    });
    onClose();
  }, [localDurations, onSave, onClose]);

  const handleChange = useCallback((field: keyof typeof localDurations, value: string) => {
    setLocalDurations(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleAddLog = (text: string) => {
    // Log ekleme işlemini burada yapabilirsin
    import("../utils/logs").then(({ addLogEntry }) => {
      addLogEntry(text);
      setShowLogModal(false);
    });
  };

  // Sabit bileşenler useCallback ile memoize ediliyor
  const TabBar = useCallback(() => (
    <div className="flex mb-6 border-b border-[#2e325a]">
      {(['settings', 'logs', 'stats'] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === tab
              ? 'text-[#f87070] border-b-2 border-[#f87070]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {tab === 'settings' && 'Ayarlar'}
          {tab === 'logs' && 'Loglar'}
          {tab === 'stats' && 'İstatistikler'}
        </button>
      ))}
    </div>
  ), [activeTab]);

  // TimeInput bileşeni artık sabit bir referansa sahip
  const TimeInput = useCallback(({ label, value, field }: {
    label: string;
    value: string;
    field: keyof typeof localDurations;
  }) => (
    <div className="mb-4">
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={e => handleChange(field, e.target.value)}
        className="w-full bg-[#161932] rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#f87070]"
        min="1"
      />
    </div>
  ), [handleChange]);

  const renderSettings = useCallback(() => (
    <div>
      <TimeInput label="Pomodoro Süresi (dk)" value={localDurations.pomodoro} field="pomodoro" />
      <TimeInput label="Kısa Mola (dk)" value={localDurations.shortBreak} field="shortBreak" />
      <TimeInput label="Uzun Mola (dk)" value={localDurations.longBreak} field="longBreak" />
    </div>
  ), [TimeInput, localDurations]);

  const renderLogs = useCallback(() => {
    const logs = getLogs(logFilter);
    return (
      <div>
        <h3 className="mb-2">Loglar</h3>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setLogFilter("daily")}
            className={logFilter === "daily" ? "bg-[#f87070] px-3 py-1 rounded text-white" : "bg-[#161932] px-3 py-1 rounded text-gray-300"}
          >
            Günlük
          </button>
          <button
            onClick={() => setLogFilter("weekly")}
            className={logFilter === "weekly" ? "bg-[#f87070] px-3 py-1 rounded text-white" : "bg-[#161932] px-3 py-1 rounded text-gray-300"}
          >
            Haftalık
          </button>
          <button
            onClick={() => setLogFilter("monthly")}
            className={logFilter === "monthly" ? "bg-[#f87070] px-3 py-1 rounded text-white" : "bg-[#161932] px-3 py-1 rounded text-gray-300"}
          >
            Aylık
          </button>
        </div>
        <button
          onClick={() => setShowLogModal(true)}
          className="mb-4 bg-[#f87070] px-3 py-1 rounded text-white"
        >
          Log Ekle
        </button>
        <ul>
          {Object.entries(logs).length === 0 && <li>Log yok.</li>}
          {Object.entries(logs).map(([date, entries]) =>
            entries.map((entry, idx) => (
              <li key={idx} className="mb-2">
                <span className="text-xs text-gray-400 mr-2">{date}:</span>
                {entry.text} <span className="text-xs text-gray-400">({new Date(entry.timestamp).toLocaleTimeString()})</span>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }, [logFilter, setShowLogModal]);

  const renderStats = useCallback(() => {
    const stats = getPomodoroStats();
    return (
      <div>
        <h3 className="mb-2">Pomodoro İstatistikleri</h3>
        <ul>
          {Object.entries(stats).length === 0 && <li>Henüz istatistik yok.</li>}
          {Object.entries(stats).map(([date, count]) => (
            <li key={date} className="mb-2">
              <span className="font-semibold">{date}:</span> {Number(count)} pomodoro
            </li>
          ))}
        </ul>
      </div>
    );
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1e213f] p-6 rounded-xl w-full max-w-md mx-4 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Ayarlar</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <TabBar />

        {activeTab === 'settings' && renderSettings()}
        {activeTab === 'logs' && renderLogs()}
        {activeTab === 'stats' && renderStats()}

        {/* LogModal tetiklenirse açılır */}
        {showLogModal && (
          <LogModal
            onSave={handleAddLog}
            onClose={() => setShowLogModal(false)}
          />
        )}

        <div className="mt-6 flex justify-end space-x-3">
          {activeTab === 'settings' && (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#f87070] rounded text-white hover:bg-[#d95c5c] transition-colors"
            >
              Kaydet
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#161932] rounded text-white hover:bg-[#2e325a] transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SettingsModal);