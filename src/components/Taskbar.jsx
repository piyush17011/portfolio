import React, { useState, useEffect } from "react";
import "./Taskbar.css";
import "./StartMenu.css";
import startIcon from "../assets/icons/start.png";
import StartMenu from "./StartMenu";

const Taskbar = ({ openWindows = [], onRestoreWindow, activeWindow, onOpenWindow, onShutdown }) => {
  const [time, setTime] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showDateTooltip, setShowDateTooltip] = useState(false);
  const [peekWin, setPeekWin] = useState(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setDateStr(now.toLocaleDateString([], { month: "numeric", day: "numeric", year: "numeric" }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const fullDate = new Date().toLocaleDateString([], {
    weekday: "long", month: "long", day: "numeric", year: "numeric"
  });

  return (
    <>
      <div className="taskbar">
        {/* Start button */}
        <button
          className={`start-btn${showMenu ? " active" : ""}`}
          onClick={() => setShowMenu((p) => !p)}
          aria-label="Start"
        >
          <img src={startIcon} alt="" className="start-icon" />
          <span className="start-label">Start</span>
        </button>

        <div className="taskbar-sep" />

        {/* Open window buttons with Aero Peek */}
        <div className="taskbar-windows">
          {openWindows.map((win) => (
            <div
              key={win.title}
              className="taskbar-btn-wrap"
              onMouseEnter={() => setPeekWin(win.title)}
              onMouseLeave={() => setPeekWin(null)}
            >
              <button
                className={`taskbar-window-btn${activeWindow === win.title ? " active" : ""}${win.isMinimized ? " minimized-state" : ""}`}
                onClick={() => onRestoreWindow && onRestoreWindow(win.title)}
                title={win.title}
              >
                {win.icon && <img src={win.icon} alt="" className="taskbar-win-icon" />}
                <span className="taskbar-win-label">{win.title}</span>
              </button>

              {/* Aero Peek thumbnail */}
              {peekWin === win.title && (
                <div className="aero-peek">
                  <div className="peek-header">
                    {win.icon && <img src={win.icon} alt="" className="peek-icon" />}
                    <span className="peek-title">{win.title}</span>
                    <button className="peek-close" onClick={() => onRestoreWindow && onRestoreWindow(win.title)}>✕</button>
                  </div>
                  <div className="peek-thumb">
                    <div className="peek-thumb-inner">
                      <span className="peek-app-icon">
                        {win.icon ? <img src={win.icon} alt="" style={{ width: 32, opacity: 0.6 }} /> : "🪟"}
                      </span>
                      <span className="peek-app-label">{win.title}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* System tray */}
        <div className="system-tray">
          <div className="tray-icons">
            <span className="tray-icon" title="Network: Connected">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2C4.5 2 2.3 3.1 1 4.8l1.3 1.3C3.4 4.7 5.1 4 7 4s3.6.7 4.7 2.1L13 4.8C11.7 3.1 9.5 2 7 2z" fill="rgba(255,255,255,0.85)"/>
                <path d="M7 5.5c-1.5 0-2.8.6-3.8 1.6l1.3 1.3C5.2 7.6 6 7.3 7 7.3s1.8.3 2.5.9l1.3-1.3C9.8 6.1 8.5 5.5 7 5.5z" fill="rgba(255,255,255,0.85)"/>
                <circle cx="7" cy="11" r="1.5" fill="rgba(255,255,255,0.85)"/>
              </svg>
            </span>
            <span className="tray-icon" title="Volume: On">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 5H4.5L7 3V11L4.5 9H2V5Z" fill="rgba(255,255,255,0.85)"/>
                <path d="M9 4.5C9.9 5.2 10.5 6 10.5 7S9.9 8.8 9 9.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M10.5 2.5C12 3.7 13 5.2 13 7s-1 3.3-2.5 4.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>

          <div
            className="tray-clock"
            onMouseEnter={() => setShowDateTooltip(true)}
            onMouseLeave={() => setShowDateTooltip(false)}
          >
            <span className="clock-time">{time}</span>
            <span className="clock-date">{dateStr}</span>
            {showDateTooltip && <div className="date-tooltip">{fullDate}</div>}
          </div>

          <div className="show-desktop-strip" title="Show desktop" />
        </div>
      </div>

      {showMenu && (
        <StartMenu
          onClose={() => setShowMenu(false)}
          onShutdown={onShutdown}
          onOpenWindow={(title) => {
            onOpenWindow && onOpenWindow(title);
            setShowMenu(false);
          }}
        />
      )}
    </>
  );
};

export default Taskbar;
