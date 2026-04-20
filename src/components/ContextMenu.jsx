import React, { useEffect, useRef } from "react";
import "./ContextMenu.css";

const ContextMenu = ({ x, y, onClose, onRefresh, onWallpaper, onGadgets }) => {
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  // Keep menu on screen
  const menuW = 200;
  const menuH = 220;
  const left = x + menuW > window.innerWidth  ? x - menuW : x;
  const top  = y + menuH > window.innerHeight ? y - menuH : y;

  const items = [
    { label: "View",              icon: "🖥️", sub: true },
    { label: "Sort By",           icon: "↕️", sub: true },
    { divider: true },
    { label: "Refresh",           icon: "🔄", action: onRefresh },
    { divider: true },
    { label: "New Folder",        icon: "📁", action: onClose },
    { divider: true },
    { label: "Change Wallpaper",  icon: "🖼️", action: onWallpaper },
    { label: "Gadgets",           icon: "🕐", action: onGadgets },
    { divider: true },
    { label: "Personalize",       icon: "🎨", action: onClose },
  ];

  return (
    <div
      ref={ref}
      className="ctx-menu"
      style={{ left, top }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {items.map((item, i) =>
        item.divider ? (
          <div key={i} className="ctx-divider" />
        ) : (
          <div
            key={i}
            className="ctx-item"
            onClick={() => { item.action && item.action(); onClose(); }}
          >
            <span className="ctx-icon">{item.icon}</span>
            <span className="ctx-label">{item.label}</span>
            {item.sub && <span className="ctx-arrow">▶</span>}
          </div>
        )
      )}
    </div>
  );
};

export default ContextMenu;
