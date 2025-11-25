import React, { useState } from "react";
import "./App.css";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import Taskbar from "./components/Taskbar";
import ResumeWindow from "./components/ResumeWindow";

import mycomputer from "./assets/icons/mycomputer.png";
import recyclebin from "./assets/icons/recyclebin.png";
import documents from "./assets/icons/documents.png";
import projects from "./assets/icons/projects.png";
import contact from "./assets/icons/contact.png";
import hobby from "./assets/icons/hobby.png";
import mediaplayer from "./assets/icons/mediaplayer.png";
import education from "./assets/icons/education.png";

import win7Wallpaper from "./assets/wallpapers/win7.png";
import blueWallpaper from "./assets/wallpapers/blue-wallpaper.jpg";

const wallpapers = [win7Wallpaper, blueWallpaper];

const defaultPosition = { x: 200, y: 90 };
const resumePath = "/assets/resume.pdf";

const ContextMenu = ({ x, y, onClose, onChangeWallpaper }) => {
  React.useEffect(() => {
    const handleClick = (e) => onClose();
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);
  return (
    <div className="context-menu" style={{ top: y, left: x }}>
      <div className="cmenu-item">🔃 Refresh</div>
      <div className="cmenu-item" onClick={onChangeWallpaper}>🖼️ Change Wallpaper</div>
      <div className="cmenu-item">ℹ️ About</div>
    </div>
  );
};

function playSound(baseFile) {
  // Remove extension if present
  const base = baseFile.replace(/\.(wav|mp3)$/i, "");
  const tryPlay = (exts) => {
    if (!exts.length) return;
    const ext = exts[0];
    const audio = new window.Audio(`/sounds/${base}.${ext}`);
    audio.volume = 0.5;
    audio.addEventListener('error', () => tryPlay(exts.slice(1)), { once: true });
    audio.play().catch(() => {});
  };
  tryPlay(["mp3", "wav"]);
}

function App() {
  const [openWindows, setOpenWindows] = useState([]); // array with ids
  const [windowStates, setWindowStates] = useState({});
  const [zOrder, setZOrder] = useState([]);
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  const [wallIdx, setWallIdx] = useState(0);
  const getNextZIndex = () => 10 + zOrder.length;

  const handleIconClick = (app) => {
    if (!openWindows.includes(app)) {
      setOpenWindows([...openWindows, app]);
      setWindowStates(s => ({ ...s, [app]: { ...defaultPosition, isMinimized: false, isMaximized: false, zIndex: getNextZIndex() } }));
      setZOrder((zo) => [...zo, app]);
      playSound("Windows Exclamation"); // Play open sound
    } else {
      // Bring to front if already open
      setZOrder((zo) => [...zo.filter(w => w !== app), app]);
      setWindowStates(s => ({ ...s, [app]: { ...s[app], isMinimized: false } }));
    }
  };

  const handleClose = (app) => {
    setOpenWindows(openWindows.filter((win) => win !== app));
    setZOrder(zOrder.filter((w) => w !== app));
    setWindowStates(({ [app]: omit, ...rest }) => rest);
    playSound("Windows Logoff Sound");
  };
  const handleMinimize = (app) => {
    setWindowStates(s => ({ ...s, [app]: { ...s[app], isMinimized: true } }));
    playSound("Windows Minimize");
  };
  const handleMaximize = (app) => {
    setWindowStates(s => ({ ...s, [app]: { ...s[app], isMaximized: !s[app]?.isMaximized } }));
    playSound("Windows Restore");
  };
  const handleDrag = (app, data) => {
    setWindowStates(s => ({ ...s, [app]: { ...s[app], x: data.x, y: data.y } }));
  };
  const handleFocus = (app) => {
    setZOrder((zo) => [...zo.filter(w => w !== app), app]);
    setWindowStates(s => ({ ...s, [app]: { ...s[app], isMinimized: false } }));
  };
  const handleDesktopContextMenu = (e) => {
    e.preventDefault();
    setMenu({ visible: true, x: e.clientX, y: e.clientY });
  };
  const handleContextMenuClose = () => setMenu({ ...menu, visible: false });
  const handleChangeWallpaper = () => {
    setWallIdx((w) => (w + 1) % wallpapers.length);
    // Optionally add notification or sound: playSound('notify')
    setMenu({ ...menu, visible: false });
  };
  return (
    <div
      className="desktop"
      style={{ backgroundImage: `url(${wallpapers[wallIdx]})` }}
      onContextMenu={handleDesktopContextMenu}
    >
      {menu.visible && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={handleContextMenuClose}
          onChangeWallpaper={handleChangeWallpaper}
        />
      )}
      {/* Desktop Icons */}
      <div className="icons-container">
        <DesktopIcon
          icon={mycomputer}
          label="My Computer"
          onClick={() => handleIconClick("My Computer")}
        />
        <DesktopIcon
          icon={recyclebin}
          label="Recycle Bin"
          onClick={() => handleIconClick("Recycle Bin")}
        />
        <DesktopIcon
          icon={education}
          label="Resume"
          onClick={() => handleIconClick("Resume")}
        />
      </div>
      {/* Windows Section */}
      {openWindows.map((window) => (
        <Window
          key={window}
          title={window}
          onClose={() => handleClose(window)}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          isMinimized={windowStates[window]?.isMinimized}
          isMaximized={windowStates[window]?.isMaximized}
          position={windowStates[window] && !windowStates[window].isMaximized ? { x: windowStates[window].x, y: windowStates[window].y } : { x: 0, y: 0 }}
          onDrag={handleDrag}
          zIndex={zOrder.indexOf(window) + 10}
          onFocus={() => handleFocus(window)}
        >
          {window === "My Computer" && (
            <div className="window-content">
              <h3>My Computer</h3>
              <p>Explore different sections of my portfolio:</p>
              <div className="inner-icons">
                <DesktopIcon
                  icon={documents}
                  label="Documents"
                  onClick={() => handleIconClick("Documents")}
                />
                <DesktopIcon
                  icon={projects}
                  label="Projects"
                  onClick={() => handleIconClick("Projects")}
                />
                <DesktopIcon
                  icon={contact}
                  label="Contact"
                  onClick={() => handleIconClick("Contact")}
                />
                <DesktopIcon
                  icon={hobby}
                  label="Hobbies"
                  onClick={() => handleIconClick("Hobbies")}
                />
                <DesktopIcon
                  icon={mediaplayer}
                  label="Media Player"
                  onClick={() => handleIconClick("Media Player")}
                />
              </div>
            </div>
          )}
          {window === "Documents" && (
            <div>
              <h3>Education</h3>
              <p>B.Tech (Information Technology), Mumbai University</p>
              <p>Key Courses: Web Development, Cloud Computing, OOP</p>
            </div>
          )}
          {window === "Media Player" && (
            <div className="media-player">
              <h3>Windows Media Player</h3>
              <audio controls autoPlay loop>
                <source src="/assets/music/audio.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
              <p>Now Playing: Windows 7 Startup Theme 🎶</p>
            </div>
          )}
          {window === "Projects" && (
            <div>
              <h3>Projects</h3>
              <ul>
                <li>🧠 Sign Language Recognition</li>
                <li>🍱 Mumbai Dabbewala Management</li>
                <li>💻 IT Workspace – Task Scheduling Platform</li>
              </ul>
            </div>
          )}
          {window === "Contact" && (
            <div>
              <h3>Contact</h3>
              <p>Email: <a href="mailto:piyushbhalwalkar01@gmail.com">piyushbhalwalkar01@gmail.com</a></p>
              <p>LinkedIn: <a href="https://linkedin.com/in/piyushbhalwalkar" target="_blank" rel="noreferrer">linkedin.com/in/piyushbhalwalkar</a></p>
              <p>GitHub: <a href="https://github.com/piyush17011" target="_blank" rel="noreferrer">github.com/piyush17011</a></p>
            </div>
          )}
          {window === "Hobbies" && (
            <div className="hobbies-window">
              <h3>Hobbies & Interests</h3>
              <p>🎮 Gaming — In my free time, I enjoy playing multiplayer and story-driven games.</p>
              <div className="game-icons">
                <img src="/icons/valorant.png" alt="Valorant" />
                <img src="/icons/gtaVC.png" alt="GTA VC" />
                <img src="/icons/minecraft.png" alt="Minecraft" />
              </div>
            </div>
          )}
          {window === "Recycle Bin" && (
            <div>
              <h3>Recycle Bin</h3>
              <p>Nothing here yet!</p>
            </div>
          )}
          {window === "Resume" && (
            <ResumeWindow src={resumePath} />
          )}
        </Window>
      ))}
      <Taskbar />
    </div>
  );
}
export default App;
