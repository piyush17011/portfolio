import React, { useEffect } from "react";
import "./Notification.css";

const Notification = ({ id, title, message, icon, onDismiss }) => {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(id), 5000);
    return () => clearTimeout(t);
  }, [id, onDismiss]);

  return (
    <div className="notif-balloon" onClick={() => onDismiss(id)}>
      <div className="notif-header">
        <span className="notif-app-icon">{icon || "ℹ️"}</span>
        <span className="notif-title">{title}</span>
        <button className="notif-close" onClick={(e) => { e.stopPropagation(); onDismiss(id); }}>✕</button>
      </div>
      <div className="notif-body">{message}</div>
      <div className="notif-tail" />
    </div>
  );
};

export const NotificationContainer = ({ notifications, onDismiss }) => (
  <div className="notif-container">
    {notifications.map((n) => (
      <Notification key={n.id} {...n} onDismiss={onDismiss} />
    ))}
  </div>
);

export default Notification;
