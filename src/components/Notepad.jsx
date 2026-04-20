import React, { useState } from "react";
import "./Notepad.css";

const Notepad = () => {
  const [text, setText] = useState("Welcome to Notepad!\n\nType something here...");
  const [wordWrap, setWordWrap] = useState(true);

  const handleSave = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "note.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text.split("\n").length;

  return (
    <div className="notepad">
      {/* Menu bar */}
      <div className="np-menubar">
        {["File", "Edit", "Format", "View", "Help"].map((m) => (
          <div key={m} className="np-menu-item" onClick={m === "File" ? handleSave : undefined}>
            {m}
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="np-toolbar">
        <button className="np-tool-btn" onClick={handleSave} title="Save">💾 Save</button>
        <div className="np-tool-sep" />
        <button className="np-tool-btn" onClick={() => setText("")} title="Clear">🗑️ Clear</button>
        <div className="np-tool-sep" />
        <label className="np-tool-btn">
          <input
            type="checkbox"
            checked={wordWrap}
            onChange={(e) => setWordWrap(e.target.checked)}
            style={{ marginRight: 4 }}
          />
          Word Wrap
        </label>
      </div>

      {/* Text area */}
      <textarea
        className="np-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ whiteSpace: wordWrap ? "pre-wrap" : "pre" }}
        spellCheck={false}
      />

      {/* Status bar */}
      <div className="np-statusbar">
        <span>Ln {lineCount}</span>
        <span>Words: {wordCount}</span>
        <span>Chars: {text.length}</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};

export default Notepad;
