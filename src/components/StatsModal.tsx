import React from "react";
import { getPomodoroStats } from "../utils/pomodoroStats";

const StatsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const stats = getPomodoroStats();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1e213f] p-6 rounded-lg w-96 text-white">
        <h2 className="text-xl mb-4">Pomodoro İstatistikleri</h2>
        <ul>
          {Object.entries(stats).length === 0 && <li>Henüz istatistik yok.</li>}
          {Object.entries(stats).map(([date, count]) => (
            <li key={date} className="mb-2">
              <span className="font-semibold">{date}:</span> {Number(count)} pomodoro
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 bg-[#f87070] px-4 py-2 rounded text-white">Kapat</button>
      </div>
    </div>
  );
};

export default StatsModal;