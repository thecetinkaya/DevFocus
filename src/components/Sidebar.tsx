import React from "react";
import { Link } from "react-router-dom"; // Eğer router kullanıyorsan


interface SidebarProps {
  onLogAddClick: () => void;
  onLogListClick: () => void;
  onStatsClick: () => void; // onStatsClick prop'unu ekle
}

const Sidebar: React.FC<SidebarProps> = ({ onLogAddClick, onStatsClick }) => (
  <div className="fixed top-8 left-8 bg-[#161932] rounded-xl shadow-lg p-6 flex flex-col gap-6 z-50 min-w-[180px]">
    <Link to="/logs" className="text-white hover:text-[#f87070] font-semibold">Log Kayıtları</Link>
    <button
      onClick={onLogAddClick}
      className="bg-[#f87070] text-white px-3 py-2 rounded font-semibold hover:bg-[#d95c5c]"
    >
      Log Ekle
    </button>
    <button
      onClick={onStatsClick} // onStatsClick fonksiyonunu tetikle
      className="text-white hover:text-[#f87070] font-semibold"
    >
      İstatistikleri Göster
    </button>
  </div>
);
export default Sidebar;