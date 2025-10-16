import React, { useState } from "react";
import "./App.css";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import Taskbar from "./components/Taskbar";

import win7Wallpaper from "./assets/wallpapers/win7.png";
import mycomputer from "./assets/icons/mycomputer.png";
import recyclebin from "./assets/icons/recyclebin.png";
import documents from "./assets/icons/documents.png";
import projects from "./assets/icons/projects.png";
import contact from "./assets/icons/contact.png";
import hobby from "./assets/icons/hobby.png";
import mediaplayer from "./assets/icons/mediaplayer.png";

function App() {
  const [openWindows, setOpenWindows] = useState([]); // array instead of single

  const handleIconClick = (app) => {
    if (!openWindows.includes(app)) {
      setOpenWindows([...openWindows, app]);
    }
  };

  const handleClose = (app) => {
    setOpenWindows(openWindows.filter((win) => win !== app));
  };

  return (
    
      <div
        className="desktop"
        style={{ backgroundImage: `url(${win7Wallpaper})` }}
      >
        {/* Desktop Icons */}
        <div className="icons-container">
          <DesktopIcon
            icon={mycomputer}
            label="My Computer"
            onClick={() => handleIconClick("My Computer")}
          />
          {/* <DesktopIcon
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
          /> */}
          <DesktopIcon
            icon={recyclebin}
            label="Recycle Bin"
            onClick={() => handleIconClick("Recycle Bin")}
          />
        </div>

        {/* Windows Section */}
        {openWindows.map((window) => (
          <Window key={window} title={window} onClose={() => handleClose(window)}>
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
            
          </Window>
        ))}

        <Taskbar />
      </div>
    
  );
}

export default App;
