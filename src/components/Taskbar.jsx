import React, { useState, useEffect } from "react";
import "./Taskbar.css";

const Taskbar = () => {
  const [time, setTime] = useState("");

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
      <div className="start-btn">Start</div>
      <div className="time">{time}</div>
    </div>
  );
};

export default Taskbar;
