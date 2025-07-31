import React, { useState } from "react";

const LogModal: React.FC<{ onSave: (text: string) => void; onClose: () => void }> = ({ onSave, onClose }) => {
  const [input, setInput] = useState("");

  const handleSave = () => {
    if (input.trim()) {
      onSave(input);
      setInput("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1e213f] p-6 rounded-lg w-96 text-white">
        <h2 className="text-xl mb-4">Log Ekle</h2>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="bg-[#161932] p-2 rounded w-full mb-4"
          placeholder="Bugün ne yaptın?"
        />
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="text-gray-400">İptal</button>
          <button onClick={handleSave} className="bg-[#f87070] px-4 py-2 rounded text-white">Kaydet</button>
        </div>
      </div>
    </div>
  );
};

export default LogModal;