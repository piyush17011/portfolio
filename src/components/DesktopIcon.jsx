import React from "react";
import "./DesktopIcon.css";

const DesktopIcon = ({ icon, label, onClick }) => {
  return (
    <div className="desktop-icon" onDoubleClick={onClick}>
      <img src={icon} alt={label} className="icon-img" />
      <span className="icon-label">{label}</span>
    </div>
  );
};

export default DesktopIcon;
