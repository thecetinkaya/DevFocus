import React, { useState } from "react";
import { getLogs, addLogEntry } from "../utils/logs";

const LogsPage: React.FC = () => {
  const [filter, setFilter] = useState<"daily" | "weekly" | "monthly">("daily");
  const [input, setInput] = useState("");
  const logs = getLogs(filter);

  const handleAddLog = () => {
    if (input.trim()) {
      addLogEntry(input);
      setInput("");
    }
  };

  return (
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Günlük Loglar</h2>
      <div className="mb-4 flex gap-2">
        <button onClick={() => setFilter("daily")} className={filter === "daily" ? "bg-[#f87070] px-3 py-1 rounded" : "px-3 py-1 rounded bg-[#161932]"}>Günlük</button>
        <button onClick={() => setFilter("weekly")} className={filter === "weekly" ? "bg-[#f87070] px-3 py-1 rounded" : "px-3 py-1 rounded bg-[#161932]"}>Haftalık</button>
        <button onClick={() => setFilter("monthly")} className={filter === "monthly" ? "bg-[#f87070] px-3 py-1 rounded" : "px-3 py-1 rounded bg-[#161932]"}>Aylık</button>
      </div>
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="bg-[#161932] p-2 rounded w-64"
          placeholder="Bugün ne yaptın?"
        />
        <button onClick={handleAddLog} className="bg-[#f87070] px-3 py-1 rounded">Ekle</button>
      </div>
      <div>
        {Object.entries(logs).length === 0 && <div>Log bulunamadı.</div>}
        {Object.entries(logs).map(([date, entries]) => (
          <div key={date} className="mb-4">
            <div className="font-semibold mb-2">{date}</div>
            <ul>
              {entries.map((entry, idx) => (
                <li key={idx} className="mb-1">
                  {entry.text} <span className="text-xs text-gray-400">({new Date(entry.timestamp).toLocaleTimeString()})</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsPage;