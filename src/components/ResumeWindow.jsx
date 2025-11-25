import React from "react";
import "./ResumeWindow.css";

const ResumeWindow = ({ src }) => {
  const handleOpenNewTab = () => {
    window.open(src, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="resume-window">
      <iframe
        src={`${src}#zoom=85`}
        title="Resume Viewer"
        className="resume-frame"
      />
      <div className="resume-actions">
        <p>Having trouble viewing the PDF?</p>
        <button type="button" onClick={handleOpenNewTab}>
          Open resume in a new tab
        </button>
      </div>
    </div>
  );
};

export default ResumeWindow;

