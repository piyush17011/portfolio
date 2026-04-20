import React, { useState, useEffect } from "react";
import "./LoginScreen.css";
import userAvatar from "../assets/icons/mycomputer.png";

const LoginScreen = ({ onLogin }) => {
  const [phase, setPhase] = useState("boot"); // boot | login | logging-in
  const [dots, setDots] = useState(0);

  // Boot phase: show spinner for 2.5s then go to login
  useEffect(() => {
    if (phase === "boot") {
      const t = setTimeout(() => setPhase("login"), 2800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Animate boot dots
  useEffect(() => {
    if (phase !== "boot") return;
    const i = setInterval(() => setDots((d) => (d + 1) % 4), 500);
    return () => clearInterval(i);
  }, [phase]);

  const handleLogin = () => {
    setPhase("logging-in");
    setTimeout(onLogin, 1800);
  };

  /* ── Boot screen ── */
  if (phase === "boot") {
    return (
      <div className="boot-screen">
        <div className="boot-logo">
          <div className="boot-win-logo">
            <span className="bw-r bw-tl" />
            <span className="bw-r bw-tr" />
            <span className="bw-r bw-bl" />
            <span className="bw-r bw-br" />
          </div>
          <div className="boot-wordmark">Windows<span>7</span></div>
        </div>
        <div className="boot-spinner">
          {[0,1,2,3,4].map(i => (
            <div key={i} className="boot-dot" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        <div className="boot-copy">© Microsoft Corporation. All rights reserved.</div>
      </div>
    );
  }

  /* ── Logging in transition ── */
  if (phase === "logging-in") {
    return (
      <div className="boot-screen login-fade-out">
        <div className="welcome-text">Welcome</div>
        <div className="boot-spinner">
          {[0,1,2,3,4].map(i => (
            <div key={i} className="boot-dot" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    );
  }

  /* ── Login screen ── */
  return (
    <div className="login-screen">
      <div className="login-overlay" />
      <div className="login-box">
        <div className="login-avatar-wrap">
          <img src={userAvatar} alt="User" className="login-avatar" />
        </div>
        <div className="login-name">Piyush Bhalwalkar</div>
        <div className="login-role">Software Developer</div>
        <button className="login-btn" onClick={handleLogin}>
          <span>Log On</span>
          <span className="login-arrow">▶</span>
        </button>
      </div>
      <div className="login-footer">
        <span>🔵 Ease of Access</span>
        <span>⏻ Shut Down</span>
      </div>
    </div>
  );
};

export default LoginScreen;
