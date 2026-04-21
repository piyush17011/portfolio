import React, { useState, useRef } from "react";
import "./DesktopIcon.css";

const DesktopIcon = ({ icon, label, onClick }) => {
  const [selected, setSelected] = useState(false);
  const lastTap = useRef(0);

  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_MS = 300;

    if (now - lastTap.current < DOUBLE_TAP_MS) {
      // double tap — open
      onClick && onClick();
      setSelected(false);
    } else {
      // single tap — select
      setSelected(true);
    }
    lastTap.current = now;
  };

  return (
    <div
      className={`desktop-icon${selected ? " selected" : ""}`}
      tabIndex={0}
      onClick={handleTap}
      onBlur={() => setSelected(false)}
      onKeyDown={(e) => e.key === "Enter" && onClick && onClick()}
      role="button"
      aria-label={label}
    >
      <div className="icon-img-wrap">
        <img src={icon} alt={label} className="icon-img" draggable={false} />
      </div>
      <span className="icon-label">{label}</span>
    </div>
  );
};

export default DesktopIcon;