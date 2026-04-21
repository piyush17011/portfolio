import React, { useEffect, useRef, useState } from "react";
import "./StartMenu.css";
import userAvatar from "../assets/icons/mycomputer.png";

const ALL_ITEMS = [
  { label: "My Computer",        icon: "💻" },
  { label: "Documents",          icon: "📄" },
  { label: "Projects",           icon: "📁" },
  { label: "Contact",            icon: "📬" },
  { label: "Hobbies",            icon: "🎮" },
  { label: "Media Player",       icon: "🎵" },
  { label: "Notepad",            icon: "📝" },
  { label: "Recycle Bin",        icon: "🗑️" },
  { label: "Shoelify",            icon: "👟" },
{ label: "XO",                  icon: "❌" },
{ label: "RTSLD",               icon: "🧠" },
{ label: "Animator's Portfolio", icon: "🎨" },
{ label: "Kisaan Saathi",       icon: "🌾" },
{ label: "NPM Packages",        icon: "📦" },
];

const StartMenu = ({ onClose, onOpenWindow, onShutdown }) => {
  const menuRef  = useRef();
  const inputRef = useRef();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    inputRef.current?.focus();
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const filtered = query.trim()
    ? ALL_ITEMS.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : null;

  const handleItem = (label) => {
    onOpenWindow && onOpenWindow(label);
    onClose();
  };

  const handleLink = (href) => {
    window.open(href, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="start-menu" ref={menuRef} role="menu">
      {/* User strip */}
      <div className="sm-user-strip">
        <div className="sm-avatar-wrap">
          <img src={userAvatar} alt="User avatar" className="sm-avatar" />
        </div>
        <span className="sm-username">Piyush Bhalwalkar</span>
      </div>

      {/* Search results overlay */}
      {filtered ? (
        <div className="sm-search-results">
          {filtered.length === 0 ? (
            <div className="sm-no-results">No results for "{query}"</div>
          ) : (
            filtered.map((item) => (
              <button key={item.label} className="sm-program-item" onClick={() => handleItem(item.label)}>
                <div className="sm-prog-icon">{item.icon}</div>
                <div className="sm-prog-info">
                  <span className="sm-prog-name">{item.label}</span>
                </div>
              </button>
            ))
          )}
        </div>
      ) : (
        /* Normal two-column body */
        <div className="sm-body">
          {/* Left: pinned programs */}
          <div className="sm-left">
            <div className="sm-section-label">Pinned</div>

            <button className="sm-program-item" onClick={() => handleLink("https://piyushportfolio17.netlify.app/")}>
              <div className="sm-prog-icon">🌐</div>
              <div className="sm-prog-info">
                <span className="sm-prog-name">Portfolio</span>
                <span className="sm-prog-desc">piyushportfolio17.netlify.app</span>
              </div>
            </button>

            <button className="sm-program-item" onClick={() => handleLink("https://github.com/piyush17011")}>
              <div className="sm-prog-icon">🐙</div>
              <div className="sm-prog-info">
                <span className="sm-prog-name">GitHub</span>
                <span className="sm-prog-desc">piyush17011</span>
              </div>
            </button>
<button className="sm-program-item" onClick={() => window.location.href = "tel:+919082420911"}>
              <div className="sm-prog-icon">🔗</div>
              <div className="sm-prog-info">
                <span className="sm-prog-name">Phone </span>
                <span className="sm-prog-desc">+91 9082420911</span>
              </div>
            </button>

            <button className="sm-program-item" onClick={() => handleLink("https://mail.google.com/mail/?view=cm&fs=1&to=piyushbhalwalkar01@gmail.com")}>
              <div className="sm-prog-icon">✉</div>
              <div className="sm-prog-info">
                <span className="sm-prog-name">Email Me</span>
                <span className="sm-prog-desc">piyushbhalwalkar01@gmail.com</span>
              </div>
            </button>

            <div className="sm-divider" />
            <div className="sm-all-programs">All Programs <span className="sm-arrow">▶</span></div>
          </div>

          {/* Right: places */}
          <div className="sm-right">
            {[
              ["📁", "Documents"],
              ["📁", "Projects"],
              ["📬", "Contact"],
              ["🎮", "Hobbies"],
              ["🎵", "Media Player"],
              ["📝", "Notepad"],
            ].map(([icon, label]) => (
              <button key={label} className="sm-place-item" onClick={() => handleItem(label)}>
                <span className="sm-place-icon">{icon}</span> {label}
              </button>
            ))}
            <div className="sm-divider-right" />
            <button className="sm-place-item" onClick={onClose}>
              <span className="sm-place-icon">⚙️</span> Control Panel
            </button>
            <button className="sm-place-item" onClick={onClose}>
              <span className="sm-place-icon">❓</span> Help and Support
            </button>
          </div>
        </div>
      )}

      {/* Search bar + shutdown footer */}
      <div className="sm-footer">
        <div className="sm-search-bar">
          <span className="sm-search-icon">🔍</span>
          <input
            ref={inputRef}
            className="sm-search-input"
            type="text"
            placeholder="Search programs and files"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && filtered && filtered.length > 0) {
                handleItem(filtered[0].label);
              }
              if (e.key === "Escape") onClose();
            }}
          />
        </div>
        <button className="sm-shutdown-btn" onClick={() => { onClose(); onShutdown && onShutdown(); }} title="Shut Down">
          <span className="sm-shutdown-icon">⏻</span>
          <span>Shut Down</span>
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
