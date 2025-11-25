import React, { useState, useEffect } from "react";
import "./Taskbar.css";
import "./StartMenu.css";
import startIcon from "../assets/icons/start.png";
import StartMenu from "./StartMenu";

const Taskbar = () => {
  const [time, setTime] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="taskbar">
      <div className="start-btn" onClick={() => setShowMenu((prev) => !prev)}>
        <img src={startIcon} alt="Start" className="start-icon" /> Start
      </div>
      <div className="time">{time}</div>
      {showMenu && <StartMenu onClose={() => setShowMenu(false)} />}
    </div>
  );
};

export default Taskbar;
