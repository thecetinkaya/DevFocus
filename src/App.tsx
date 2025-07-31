import './App.css'
import {  Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import LogsPage from "./pages/LogsPage";

function App() {

  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logs" element={<LogsPage />} />
      </Routes>
  );
}

export default App
