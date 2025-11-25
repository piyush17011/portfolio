import React from "react";
import Draggable from "react-draggable";
import "./Window.css";

const Window = ({
  title,
  onClose,
  onMinimize,
  onMaximize,
  isMinimized,
  isMaximized,
  children,
  position,
  onDrag,
  zIndex,
  onFocus,
}) => {
  return (
    <Draggable
      handle=".window-header"
      bounds="parent"
      position={isMaximized ? {x: 0, y: 0} : position}
      disabled={isMaximized}
      onStop={(e, data) => onDrag && onDrag(title, data)}
      onStart={onFocus}
    >
      <div
        className={`window${isMaximized ? " maximized" : ""}${isMinimized ? " minimized" : ""}`}
        style={{ zIndex: zIndex || 10 }}
        tabIndex={0}
        onMouseDown={onFocus}
      >
        <div className="window-header">
          <span className="window-title">{title}</span>
          <div className="window-controls">
            <button
              className="min-btn"
              title="Minimize"
              onClick={(e) => { e.stopPropagation(); onMinimize && onMinimize(title); }}
            >
              &#95;
            </button>
            <button
              className="max-btn"
              title={isMaximized ? "Restore" : "Maximize"}
              onClick={(e) => { e.stopPropagation(); onMaximize && onMaximize(title); }}
            >
              {isMaximized ? "🗗" : "🗖"}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="close-btn"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>
        {!isMinimized && <div className="window-body">{children}</div>}
      </div>
    </Draggable>
  );
};

export default Window;
