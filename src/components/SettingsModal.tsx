// SettingsModal.tsx
import React, { useState } from 'react';

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
};

const SettingsModal: React.FC<SettingsProps> = ({ durations, onSave, onClose }) => {
  const [pomodoro, setPomodoro] = useState(durations.pomodoro / 60);
  const [shortBreak, setShortBreak] = useState(durations.shortBreak / 60);
  const [longBreak, setLongBreak] = useState(durations.longBreak / 60);

  const handleSave = () => {
    onSave({
      pomodoro: pomodoro * 60,
      shortBreak: shortBreak * 60,
      longBreak: longBreak * 60,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1e213f] p-6 rounded-lg w-96 text-white">
        <h2 className="text-xl mb-4">Ayarlar</h2>

        <label className="block mb-2">
          Pomodoro süresi (dk)
          <input
            type="number"
            value={pomodoro}
            onChange={(e) => setPomodoro(Number(e.target.value))}
            className="w-full bg-[#161932] p-2 rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          Kısa mola süresi (dk)
          <input
            type="number"
            value={shortBreak}
            onChange={(e) => setShortBreak(Number(e.target.value))}
            className="w-full bg-[#161932] p-2 rounded mt-1"
          />
        </label>

        <label className="block mb-4">
          Uzun mola süresi (dk)
          <input
            type="number"
            value={longBreak}
            onChange={(e) => setLongBreak(Number(e.target.value))}
            className="w-full bg-[#161932] p-2 rounded mt-1"
          />
        </label>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="text-gray-400">İptal</button>
          <button onClick={handleSave} className="bg-[#f87070] px-4 py-2 rounded text-white">Kaydet</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
