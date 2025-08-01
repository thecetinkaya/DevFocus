import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  onLogAddClick: () => void;
  onLogListClick: () => void;
  onStatsClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogAddClick, onStatsClick }) => (
  <div className="w-full max-w-md mx-auto mt-2">
    <div className="flex bg-[#161932] rounded-full overflow-hidden p-1">
      <Link 
        to="/logs" 
        className="flex-1 text-center py-3 capitalize font-medium transition-colors duration-200 text-gray-300 hover:bg-[#2e325a]"
      >
        Log Kayıtları
      </Link>
      <button
        onClick={onLogAddClick}
        className="flex-1 text-center py-3 capitalize font-medium transition-colors duration-200 bg-[#f87070] text-white"
      >
        Log Ekle
      </button>
      <button
        onClick={onStatsClick}
        className="flex-1 text-center py-3 capitalize font-medium transition-colors duration-200 text-gray-300 hover:bg-[#2e325a]"
      >
        İstatistikler
      </button>
    </div>
  </div>
);

export default Sidebar;