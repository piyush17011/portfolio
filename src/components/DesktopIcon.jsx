import React, { useState } from "react";
import "./DesktopIcon.css";

const DesktopIcon = ({ icon, label, onClick }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(true);
  };

  const handleBlur = () => {
    setSelected(false);
  };

  return (
    <div
      className={`desktop-icon${selected ? " selected" : ""}`}
      tabIndex={0}
      onClick={handleClick}
      onBlur={handleBlur}
      onDoubleClick={onClick}
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
