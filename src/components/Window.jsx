import React, { useRef } from "react";
import Draggable from "react-draggable";
import "./Window.css";

const Window = ({
  title, icon, onClose, onMinimize, onMaximize,
  isMinimized, isMaximized, isSnapped,
  children, position, onDrag, onDragStop, zIndex, onFocus,
}) => {
  const nodeRef = useRef(null);

  const cls = [
    "window",
    isMaximized           ? "maximized"     : "",
    isMinimized           ? "minimized"     : "",
    isSnapped === "left"  ? "snapped-left"  : "",
    isSnapped === "right" ? "snapped-right" : "",
  ].filter(Boolean).join(" ");

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-header"
      bounds="parent"
      defaultPosition={position || { x: 0, y: 0 }}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      disabled={isMaximized}
      onDrag={(e, data) => onDrag && onDrag(title, data)}
      onStop={(e, data) => onDragStop && onDragStop(title, data)}
      onStart={onFocus}
    >
      <div
        ref={nodeRef}
        className={cls}
        style={{ zIndex: zIndex || 10 }}
        tabIndex={0}
        onMouseDown={onFocus}
      >
        <div className="window-glass-highlight" />
        <div className="window-header">
          <div className="window-header-left">
            {icon && <img src={icon} alt="" className="window-title-icon" />}
            <span className="window-title">{title}</span>
          </div>
          <div className="window-controls">
            <button className="win-btn min-btn" title="Minimize"
              onClick={(e) => { e.stopPropagation(); onMinimize && onMinimize(title); }}>
              <span className="win-btn-icon min-icon" />
            </button>
            <button className="win-btn max-btn" title={isMaximized ? "Restore" : "Maximize"}
              onClick={(e) => { e.stopPropagation(); onMaximize && onMaximize(title); }}>
              <span className={`win-btn-icon ${isMaximized ? "restore-icon" : "max-icon"}`} />
            </button>
            <button className="win-btn close-btn" title="Close"
              onClick={(e) => { e.stopPropagation(); onClose(); }}>
              <span className="win-btn-icon close-icon" />
            </button>
          </div>
        </div>
        {!isMinimized && <div className="window-body">{children}</div>}
      </div>
    </Draggable>
  );
};

export default Window;
