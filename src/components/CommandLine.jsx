import React from "react";

const styles = `
  .cmd-window {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #000;
  }

  .cmd-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    background: linear-gradient(to bottom, #dce8f8, #c8d8f0);
    border-bottom: 1px solid #a8c0e0;
    flex-shrink: 0;
  }

  .cmd-url {
    font-size: 11px;
    color: #446;
    font-family: "Courier New", monospace;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cmd-open-btn {
    font-size: 11.5px;
    color: #1a5bbf;
    text-decoration: none;
    padding: 2px 8px;
    border-radius: 3px;
    background: rgba(255,255,255,0.7);
    border: 1px solid #a8bcd8;
    white-space: nowrap;
    flex-shrink: 0;
    margin-left: 8px;
  }

  .cmd-open-btn:hover {
    background: #fff;
    border-color: #6090d0;
  }

  .cmd-iframe {
    flex: 1;
    width: 100%;
    border: none;
    background: #000;
    display: block;
  }
`;

const CommandLine = () => {
  const URL = "https://piyush17.netlify.app/";

  return (
    <>
      <style>{styles}</style>
      <div className="cmd-window">
        <div className="cmd-bar">
          <span className="cmd-url">{URL}</span>
          <a
            href={URL}
            target="_blank"
            rel="noreferrer"
            className="cmd-open-btn"
          >
            ↗ Open
          </a>
        </div>
        <iframe
          src={URL}
          title="Terminal Portfolio"
          className="cmd-iframe"
        />
      </div>
    </>
  );
};

export default CommandLine;
