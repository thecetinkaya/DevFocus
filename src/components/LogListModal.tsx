import React from "react";
import { getLogs } from "../utils/logs";

const LogListModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const logs = getLogs("daily");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1e213f] p-6 rounded-lg w-96 text-white">
        <h2 className="text-xl mb-4">Bugünkü Loglar</h2>
        <ul>
          {Object.entries(logs).map(([date, entries]) =>
            entries.map((entry, idx) => (
              <li key={idx} className="mb-2">
                <span className="text-xs text-gray-400 mr-2">{date}:</span>
                {entry.text} <span className="text-xs text-gray-400">({new Date(entry.timestamp).toLocaleTimeString()})</span>
              </li>
            ))
          )}
        </ul>
        <button onClick={onClose} className="mt-4 bg-[#f87070] px-4 py-2 rounded text-white">Kapat</button>
      </div>
    </div>
  );
};

export default LogListModal;