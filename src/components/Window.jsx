import React from "react";
import "./Window.css";

const Window = ({ title, onClose, children }) => {
  return (
    <div className="window">
      <div className="window-header">
        <span className="window-title">{title}</span>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>
      <div className="window-body">{children}</div>
    </div>
  );
};

export default Window;
