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

function App() {
  const [openWindow, setOpenWindow] = useState(null);

  const handleIconClick = (app) => {
    setOpenWindow(app);
  };

  const handleClose = () => setOpenWindow(null);

  return (
    <div
      className="desktop"
      style={{ backgroundImage: `url(${win7Wallpaper})` }}
    >
      <div className="icons-container">
        <DesktopIcon icon={mycomputer} label="My Computer" onClick={() => handleIconClick("My Computer")} />
        <DesktopIcon icon={documents} label="Documents" onClick={() => handleIconClick("Documents")} />
        <DesktopIcon icon={projects} label="Projects" onClick={() => handleIconClick("Projects")} />
        <DesktopIcon icon={contact} label="Contact" onClick={() => handleIconClick("Contact")} />
        <DesktopIcon icon={recyclebin} label="Recycle Bin" onClick={() => handleIconClick("Recycle Bin")} />
      </div>

      {openWindow && (
        <Window title={openWindow} onClose={handleClose}>
          {openWindow === "My Computer" && (
            <div>
              <h3>My Computer</h3>
              <p>Welcome! Explore my digital desktop — each section gives insights into my journey.</p>
              <ul>
                <li><b>Skills:</b> JavaScript, React, Node.js, MySQL, etc.</li>
                <li><b>Education:</b> B.E. Information Technology</li>
                <li><b>Experience:</b> Built multiple MERN projects, worked with APIs.</li>
              </ul>
            </div>
          )}
          {openWindow === "Documents" && (
            <div>
              <h3>Education</h3>
              <p>Graduated in Information Technology from XYZ University with distinction.</p>
              <p>Key Courses: Data Structures, Web Dev, Cloud, AI.</p>
            </div>
          )}
          {openWindow === "Projects" && (
            <div>
              <h3>Projects</h3>
              <p>• Sign Language Recognition (MERN + LSTM)</p>
              <p>• Weather Forecasting IoT Project</p>
              <p>• IT Workspace – task management platform</p>
            </div>
          )}
          {openWindow === "Contact" && (
            <div>
              <h3>Contact</h3>
              <p>Email: piyush@example.com</p>
              <p>LinkedIn: linkedin.com/in/piyushbhalwalkar</p>
              <p>GitHub: github.com/piyushbhalwalkar</p>
            </div>
          )}
          {openWindow === "Recycle Bin" && (
            <div>
              <h3>Recycle Bin</h3>
              <p>Nothing to delete here 😄</p>
            </div>
          )}
        </Window>
      )}

      <Taskbar />
    </div>
  );
}

export default App;
