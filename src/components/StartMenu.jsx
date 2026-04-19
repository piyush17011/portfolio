import React, { useEffect, useRef } from "react";
import "./StartMenu.css";
import userAvatar from "../assets/icons/mycomputer.png";

const StartMenu = ({ onClose }) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div className="start-menu" ref={menuRef}>
      <div className="sm-profile">
        <img src={userAvatar} alt="User" className="sm-avatar" />
        <div className="sm-info">
          <span className="sm-name">Piyush Bhalwalkar</span>
          <span className="sm-role">Software Developer</span>
        </div>
      </div>
      <div className="sm-links">
        <a href="https://piyushportfolio17.netlify.app/" className="sm-link">🏠 Portfolio</a>
        <a href="https://github.com/piyush17011" target="_blank" rel="noreferrer" className="sm-link">🐙 GitHub</a>
        <a href="https://www.linkedin.com/in/piyush-bhalwalkar17/" target="_blank" rel="noreferrer" className="sm-link">🔗 LinkedIn</a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=piyushbhalwalkar01@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="sm-link"
        >
          @ piyushbhalwalkar01@gmail.com
        </a>
      </div>
      <div className="sm-divider"></div>
      <button className="sm-shutdown" onClick={onClose}>⏻ Shut Down</button>
    </div>
  );
};

export default StartMenu;
