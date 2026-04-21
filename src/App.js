import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import Taskbar from "./components/Taskbar";
import LoginScreen from "./components/LoginScreen";
import ContextMenu from "./components/ContextMenu";
import { NotificationContainer } from "./components/Notification";
import ScreenSaver, { useScreenSaver } from "./components/ScreenSaver";
import Notepad from "./components/Notepad";
import CommandLine from "./components/CommandLine";
import resumeicon from "./assets/icons/resume.png";
import cmd from "./assets/icons/cmd.png";
import win7Wallpaper from "./assets/wallpapers/win7.png";
import mycomputer from "./assets/icons/mycomputer.png";
import recyclebin from "./assets/icons/recyclebin.png";
import documents from "./assets/icons/documents.png";
import projects from "./assets/icons/projects.png";
import contact from "./assets/icons/contact.png";
import hobby from "./assets/icons/hobby.png";
import mediaplayer from "./assets/icons/mediaplayer.png";
import notepad from "./assets/icons/notepad.png";

const WALLPAPERS = [win7Wallpaper];

const PROJECTS = [
  {
    id: "shoelify",
    label: "Shoelify",
    emoji: "👟",
    tagline: "Ecommerce platform for sneaker heads",
    description: "A full-stack ecommerce website built for sneaker enthusiasts. Features product listings, cart management, and user authentication.",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    liveUrl: "https://shoelify.onrender.com/",
    githubUrl: "https://github.com/piyush17011/SSHOPLIFY",
  },
  {
    id: "xo",
    label: "XO",
    emoji: "❌",
    tagline: "Live multiplayer TicTacToe",
    description: "A live multiplayer TicTacToe game built to understand how WebSockets work.",
    tech: ["Node.js", "Express.js", "WebSockets"],
    liveUrl: "https://xo-ztjb.onrender.com/",
    githubUrl: "https://github.com/piyush17011/XO",
  },
  {
    id: "rtsld",
    label: "RTSLD",
    emoji: "🧠",
    tagline: "Real Time Sign Language Detection System",
    description: "A video calling platform for the deaf and mute, where users communicate using sign language with live AI-generated captions.",
    tech: ["Node.js", "Express.js", "Python", "WebRTC", "WebSockets", "Machine Learning"],
    liveUrl: "https://rtsld.onrender.com",
    githubUrl: "https://github.com/piyush17011/RealTimeWorkingMain",
  },
  {
    id: "animator-portfolio",
    label: "Animator's Portfolio",
    emoji: "🎨",
    tagline: "3D portfolio site built for a client",
    description: "A portfolio website built for an animator client featuring 3D model rendering.",
    tech: ["React.js", "3D Model Rendering"],
    liveUrl: "https://omkar-bane.vercel.app/",
    githubUrl: "https://github.com/piyush17011/animator-portfolio",
  },
  {
    id: "kisaan-saathi",
    label: "Kisaan Saathi",
    emoji: "🌾",
    tagline: "AI assistant app for Indian farmers",
    description: "An AI-assistant Android app for Indian farmers with weather API integration and live current market prices of crops.",
    tech: ["React Native", "Python", "MySQL", "Gemini API"],
    liveUrl: null,
    githubUrl: "https://github.com/piyush17011/ks",
  },
  {
    id: "npm-packages",
    label: "NPM Packages",
    emoji: "📦",
    tagline: "CLI tools published on npm",
    description: "Two npm packages: piyush17 — an interactive terminal portfolio, and piyushai — a context file generator for entire projects.",
    tech: ["Node.js"],
    liveUrl: null,
    githubUrl: null,
  },
];

const ICON_MAP = {
  "My Computer": mycomputer,
  "Recycle Bin": recyclebin,
  Documents: documents,
  Projects: projects,
  Contact: contact,
  Hobbies: hobby,
  "Media Player": mediaplayer,
  Notepad: notepad,
  "Command Line": cmd,
  Resume: resumeicon,
};

const ShutdownScreen = ({ onRestart }) => {
  const [phase, setPhase] = useState("saving");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("goodbye"), 2000);
    const t2 = setTimeout(() => setPhase("black"),   4000);
    const t3 = setTimeout(() => onRestart && onRestart(), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onRestart]);

  return (
    <div className={`shutdown-screen ${phase}`}>
      {phase === "saving" && (
        <>
          <div className="shutdown-spinner">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="boot-dot" style={{ animationDelay: `${i * 0.15}s`, background: "#4ea6dc" }} />
            ))}
          </div>
          <div className="shutdown-msg">Saving your settings…</div>
        </>
      )}
      {phase === "goodbye" && (
        <div className="shutdown-goodbye">
          <div className="shutdown-win-logo">
            <span style={{ background: "#f25022" }} />
            <span style={{ background: "#7fba00" }} />
            <span style={{ background: "#00a4ef" }} />
            <span style={{ background: "#ffb900" }} />
          </div>
          <div className="shutdown-msg">Windows is shutting down…</div>
        </div>
      )}
    </div>
  );
};

const WIN_W = 700;
const WIN_H = 460;
const TASKBAR_H = 40;
let notifId = 0;

function App() {
  const desktopRef = useRef(null);

  const [loggedIn, setLoggedIn]           = useState(false);
  const [shuttingDown, setShuttingDown]   = useState(false);
  const { active: ssActive, wake: ssWake } = useScreenSaver();

  const [openWindows, setOpenWindows]     = useState([]);
  const [minimized, setMinimized]         = useState([]);
  const [maximized, setMaximized]         = useState([]);
  const [snapSide, setSnapSide]           = useState({});
  const [positions, setPositions]         = useState({});
  const [zOrders, setZOrders]             = useState({});
  const [, setTopZ]                       = useState(10);
  const [activeWindow, setActiveWindow]   = useState(null);
  const [projectTabs, setProjectTabs]     = useState({});
  const [snapPreview, setSnapPreview]     = useState(null);
  const [ctxMenu, setCtxMenu]             = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [wallpaperIdx, setWallpaperIdx]   = useState(0);

  const pushNotif = useCallback((title, message, icon = "ℹ️") => {
    const id = ++notifId;
    setNotifications((p) => [...p, { id, title, message, icon }]);
  }, []);

  const dismissNotif = useCallback((id) => {
    setNotifications((p) => p.filter((n) => n.id !== id));
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setTimeout(() => pushNotif("Welcome!", "Double-click any icon to open it. Right-click desktop for options.", "👋"), 1200);
    }
  }, [loggedIn, pushNotif]);

  const getCenteredPosition = () => {
    const el = desktopRef.current;
    const dw = el ? el.clientWidth  : window.innerWidth;
    const dh = el ? el.clientHeight : window.innerHeight;
    return {
      x: Math.max(0, Math.floor((dw - WIN_W) / 2)),
      y: Math.max(0, Math.floor(((dh - TASKBAR_H) - WIN_H) / 2)),
    };
  };

  const bringToFront = (title) => {
    setTopZ((z) => {
      const nz = z + 1;
      setZOrders((prev) => ({ ...prev, [title]: nz }));
      return nz;
    });
    setActiveWindow(title);
  };

  const handleOpen = (app) => {
    if (!openWindows.includes(app)) {
      setOpenWindows((prev) => [...prev, app]);
      const pos = getCenteredPosition();
      setPositions((prev) => ({ ...prev, [app]: prev[app] || pos }));
    } else if (minimized.includes(app)) {
      setMinimized((prev) => prev.filter((w) => w !== app));
    }
    bringToFront(app);
  };

  const handleClose = (app) => {
    setOpenWindows((p) => p.filter((w) => w !== app));
    setMinimized((p) => p.filter((w) => w !== app));
    setMaximized((p) => p.filter((w) => w !== app));
    setSnapSide((p) => { const n = { ...p }; delete n[app]; return n; });
    if (activeWindow === app) setActiveWindow(null);
  };

  const handleMinimize = (app) =>
    setMinimized((p) => p.includes(app) ? p.filter((w) => w !== app) : [...p, app]);

  const handleMaximize = (app) =>
    setMaximized((p) => p.includes(app) ? p.filter((w) => w !== app) : [...p, app]);

  const handleDrag = (title, data) => {
    setPositions((p) => ({ ...p, [title]: { x: data.x, y: data.y } }));
    const edge = 20;
    if (data.x <= edge) setSnapPreview("left");
    else if (data.x + WIN_W >= window.innerWidth - edge) setSnapPreview("right");
    else setSnapPreview(null);
  };

  const handleDragStop = (title, data) => {
    const edge = 20;
    const dw = desktopRef.current ? desktopRef.current.clientWidth : window.innerWidth;
    if (data.x <= edge) {
      setPositions((p) => ({ ...p, [title]: { x: 0, y: 0 } }));
      setSnapSide((p) => ({ ...p, [title]: "left" }));
    } else if (data.x + WIN_W >= dw - edge) {
      setPositions((p) => ({ ...p, [title]: { x: Math.floor(dw / 2), y: 0 } }));
      setSnapSide((p) => ({ ...p, [title]: "right" }));
    } else {
      setSnapSide((p) => ({ ...p, [title]: null }));
      setPositions((p) => ({ ...p, [title]: { x: data.x, y: data.y } }));
    }
    setSnapPreview(null);
  };

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  const handleRestart = () => {
    setShuttingDown(false);
    setLoggedIn(false);
    setOpenWindows([]);
    setMinimized([]);
    setMaximized([]);
    setSnapSide({});
    setPositions({});
    setZOrders({});
    setTopZ(10);
    setActiveWindow(null);
    setProjectTabs({});
    setSnapPreview(null);
    setCtxMenu(null);
    setNotifications([]);
  };

  if (shuttingDown) return <ShutdownScreen onRestart={handleRestart} />;

  const taskbarWindows = openWindows.map((title) => ({
    title,
    icon: ICON_MAP[title] || null,
    isMinimized: minimized.includes(title),
  }));

  return (
    <div
      ref={desktopRef}
      className="desktop"
      style={{ backgroundImage: `url(${WALLPAPERS[wallpaperIdx]})` }}
      onContextMenu={(e) => { e.preventDefault(); setCtxMenu({ x: e.clientX, y: e.clientY }); }}
      onClick={() => ctxMenu && setCtxMenu(null)}
    >
      {ssActive && <ScreenSaver onWake={ssWake} />}
    
      {snapPreview && <div className={`snap-preview snap-${snapPreview}`} />}

      {/* Desktop icons */}
      <div className="icons-container">
        <DesktopIcon icon={mycomputer}  label="My Computer"   onClick={() => handleOpen("My Computer")} />
        <DesktopIcon icon={recyclebin}  label="Recycle Bin"   onClick={() => handleOpen("Recycle Bin")} />
        <DesktopIcon icon={documents}   label="Documents"     onClick={() => handleOpen("Documents")} />
        <DesktopIcon icon={projects}    label="Projects"      onClick={() => handleOpen("Projects")} />
        <DesktopIcon icon={contact}     label="Contact"       onClick={() => handleOpen("Contact")} />
        <DesktopIcon icon={hobby}       label="Hobbies"       onClick={() => handleOpen("Hobbies")} />
        <DesktopIcon icon={mediaplayer} label="Media Player"  onClick={() => handleOpen("Media Player")} />
        <DesktopIcon icon={notepad}     label="Notepad"       onClick={() => handleOpen("Notepad")} />
        <DesktopIcon icon={resumeicon}  label="Resume"        onClick={() => handleOpen("Resume")} />
        <DesktopIcon icon={cmd}         label="Command Line"  onClick={() => handleOpen("Command Line")} />
      </div>

      {/* Windows */}
      {openWindows.map((win) => {
        const project = PROJECTS.find((p) => p.label === win);
        const snapped = snapSide[win];
        return (
          <Window
            key={win}
            title={win}
            icon={ICON_MAP[win] || null}
            onClose={() => handleClose(win)}
            onMinimize={() => handleMinimize(win)}
            onMaximize={() => handleMaximize(win)}
            isMinimized={minimized.includes(win)}
            isMaximized={maximized.includes(win)}
            isSnapped={snapped}
            position={positions[win] || getCenteredPosition()}
            onDrag={handleDrag}
            onDragStop={handleDragStop}
            zIndex={zOrders[win] || 10}
            onFocus={() => bringToFront(win)}
          >
            {win === "My Computer" && (
              <div className="window-content">
                <div className="explorer-toolbar">
                  <span className="explorer-path">📂 My Computer</span>
                </div>
                <div className="inner-icons">
                  <DesktopIcon icon={documents}   label="Documents"    onClick={() => handleOpen("Documents")} />
                  <DesktopIcon icon={projects}    label="Projects"     onClick={() => handleOpen("Projects")} />
                  <DesktopIcon icon={contact}     label="Contact"      onClick={() => handleOpen("Contact")} />
                  <DesktopIcon icon={hobby}       label="Hobbies"      onClick={() => handleOpen("Hobbies")} />
                  <DesktopIcon icon={mediaplayer} label="Media Player" onClick={() => handleOpen("Media Player")} />
                  <DesktopIcon icon={notepad}     label="Notepad"      onClick={() => handleOpen("Notepad")} />
                  <DesktopIcon icon={resumeicon}  label="Resume"       onClick={() => handleOpen("Resume")} />
                  <DesktopIcon icon={cmd}         label="Command Line" onClick={() => handleOpen("Command Line")} />
                </div>
              </div>
            )}

            {win === "Projects" && (
              <div className="window-content">
                <div className="explorer-toolbar">
                  <span className="explorer-path">📂 My Computer › Projects</span>
                </div>
                <div className="inner-icons">
                  {PROJECTS.map((p) => (
                    <DesktopIcon key={p.id} icon={projects} label={p.label} onClick={() => handleOpen(p.label)} />
                  ))}
                </div>
              </div>
            )}

            {project && (
              <div className="project-window">
                <div className="project-tabs">
                  <button
                    className={`proj-tab${(projectTabs[project.id] || "info") === "info" ? " active" : ""}`}
                    onClick={() => setProjectTabs((p) => ({ ...p, [project.id]: "info" }))}
                  >
                    📄 Info
                  </button>
                  {project.liveUrl && (
                    <button
                      className={`proj-tab${projectTabs[project.id] === "preview" ? " active" : ""}`}
                      onClick={() => setProjectTabs((p) => ({ ...p, [project.id]: "preview" }))}
                    >
                      🌐 Live Preview
                    </button>
                  )}
                </div>
                {(projectTabs[project.id] || "info") === "info" && (
                  <div className="project-info">
                    <div className="project-header">
                      <span className="project-emoji">{project.emoji}</span>
                      <div>
                        <h2 className="project-title">{project.label}</h2>
                        <p className="project-tagline">{project.tagline}</p>
                      </div>
                    </div>
                    <div className="project-desc">{project.description}</div>
                    <div className="project-tech-label">Tech Stack</div>
                    <div className="project-tech">
                      {project.tech.map((t) => <span key={t} className="tech-badge">{t}</span>)}
                    </div>
                    <div className="project-links">
                      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="proj-link-btn proj-link-live">🌐 View Live</a>}
                      {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="proj-link-btn proj-link-gh">🐙 GitHub Repo</a>}
                      {!project.liveUrl && <span className="proj-no-live">⚠️ No live demo — desktop app</span>}
                    </div>
                  </div>
                )}
                {projectTabs[project.id] === "preview" && project.liveUrl && (
                  <div className="project-preview">
                    <div className="preview-bar">
                      <span className="preview-url">{project.liveUrl}</span>
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="preview-open-btn">↗ Open</a>
                    </div>
                    <iframe
                      src={project.liveUrl}
                      title={`${project.label} preview`}
                      className="project-iframe"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                )}
              </div>
            )}

            {win === "Resume" && (
              <div className="project-preview" style={{ height: "100%" }}>
                <div className="preview-bar">
                  <span className="preview-url">resume.pdf</span>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="preview-open-btn"
                  >
                    ↗ Open
                  </a>
                </div>
                <iframe
                  src="/resume.pdf#zoom=85"
                  title="Resume"
                  className="project-iframe"
                  style={{ flex: 1, width: "100%", border: "none" }}
                />
              </div>
            )}

            {win === "Notepad" && <Notepad />}
            {win === "Command Line" && <CommandLine />}

            {win === "Documents" && (
              <div className="win-pad">
                <h3>📄 Education</h3>
                <p><strong>B.Tech — Information Technology</strong><br />Mumbai University &nbsp;|&nbsp; CGPA: 9.3</p>
                <hr />
                <h4>Key Courses</h4>
                <ul>
                  <li>Web Development</li>
                  <li>Cloud Computing</li>
                  <li>Object-Oriented Programming</li>
                  <li>Data Structures & Algorithms</li>
                  <li>Database Management Systems</li>
                </ul>
              </div>
            )}

            {win === "Media Player" && (
              <div className="media-player">
                <div className="media-visualizer">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="media-bar" style={{ animationDelay: `${i * 0.07}s` }} />
                  ))}
                </div>
                <p className="media-title">🎵 Now Playing: Windows 7 Startup Theme</p>
                <audio controls autoPlay loop style={{ width: "100%", marginTop: 8 }}>
                  <source src="/assets/music/audio.mp3" type="audio/mp3" />
                </audio>
              </div>
            )}

            {win === "Contact" && (
              <div className="win-pad">
                <h3>📬 Contact Me</h3>
                <table className="contact-table"><tbody>
                  <tr><td>✉️ Email</td><td><a href="mailto:piyushbhalwalkar01@gmail.com">piyushbhalwalkar01@gmail.com</a></td></tr>
                  <tr><td>📞 Phone</td><td><a href="tel:+919082420911">+91 9082420911</a></td></tr>
                  <tr><td>🐙 GitHub</td><td><a href="https://github.com/piyush17011" target="_blank" rel="noreferrer">piyush17011</a></td></tr>
                  <tr><td>🌐 Portfolio</td><td><a href="https://piyushportfolio17.netlify.app/" target="_blank" rel="noreferrer">piyushportfolio17.netlify.app</a></td></tr>
                </tbody></table>
              </div>
            )}

            {win === "Hobbies" && (
              <div className="win-pad hobbies-window">
                <h3>🎮 Hobbies & Interests</h3>
                <p>In my free time I enjoy playing multiplayer and story-driven games.</p>
                <div className="game-icons">
                  <img src="/icons/valorant.png" alt="Valorant" />
                  <img src="/icons/gtaVC.png" alt="GTA VC" />
                  <img src="/icons/minecraft.png" alt="Minecraft" />
                </div>
              </div>
            )}

            {win === "Recycle Bin" && (
              <div className="win-pad" style={{ textAlign: "center", paddingTop: 40 }}>
                <div style={{ fontSize: 64 }}>🗑️</div>
                <p style={{ color: "#888", marginTop: 12 }}>Recycle Bin is empty.</p>
              </div>
            )}
          </Window>
        );
      })}

      <Taskbar
        openWindows={taskbarWindows}
        activeWindow={activeWindow}
        onOpenWindow={handleOpen}
        onShutdown={() => setShuttingDown(true)}
        onRestoreWindow={(title) => {
          if (minimized.includes(title)) setMinimized((p) => p.filter((w) => w !== title));
          bringToFront(title);
        }}
      />

      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x}
          y={ctxMenu.y}
          onClose={() => setCtxMenu(null)}
          onRefresh={() => pushNotif("Desktop", "Refreshed!", "🔄")}
          onWallpaper={() => {
            setWallpaperIdx((i) => (i + 1) % WALLPAPERS.length);
            pushNotif("Personalize", "Wallpaper changed!", "🖼️");
          }}
          
        />
      )}

      <NotificationContainer notifications={notifications} onDismiss={dismissNotif} />
    </div>
  );
}

export default App;