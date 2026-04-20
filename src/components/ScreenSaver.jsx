import React, { useState, useEffect, useRef } from "react";
import "./ScreenSaver.css";

const IDLE_MS = 30000; // 30 seconds

const ScreenSaver = ({ onWake }) => {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const bubbles   = useRef([]);

  // Init bubbles
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    bubbles.current = Array.from({ length: 18 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 30 + Math.random() * 60,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
      hue: 200 + Math.random() * 60,
      alpha: 0.15 + Math.random() * 0.2,
    }));

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width  = w;
    canvas.height = h;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      bubbles.current.forEach((b) => {
        b.x += b.dx;
        b.y += b.dy;
        if (b.x < -b.r) b.x = w + b.r;
        if (b.x > w + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = h + b.r;
        if (b.y > h + b.r) b.y = -b.r;

        const g = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r);
        g.addColorStop(0, `hsla(${b.hue},80%,80%,${b.alpha * 1.5})`);
        g.addColorStop(1, `hsla(${b.hue},70%,55%,0)`);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="screensaver" onClick={onWake} onMouseMove={onWake} onKeyDown={onWake} tabIndex={0}>
      <canvas ref={canvasRef} className="ss-canvas" />
      <div className="ss-clock-wrap">
        <SSClock />
      </div>
      <div className="ss-hint">Click or move mouse to resume</div>
    </div>
  );
};

const SSClock = () => {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className="ss-clock">
      <div className="ss-time">{pad(t.getHours())}:{pad(t.getMinutes())}:{pad(t.getSeconds())}</div>
      <div className="ss-date">{t.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</div>
    </div>
  );
};

// Hook to manage idle detection
export const useScreenSaver = () => {
  const [active, setActive] = useState(false);
  const timer = useRef(null);

  const reset = () => {
    setActive(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(true), IDLE_MS);
  };

  useEffect(() => {
    reset();
    window.addEventListener("mousemove", reset);
    window.addEventListener("keydown", reset);
    window.addEventListener("mousedown", reset);
    return () => {
      clearTimeout(timer.current);
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("keydown", reset);
      window.removeEventListener("mousedown", reset);
    };
  }, []);

  return { active, wake: reset };
};

export default ScreenSaver;
