import React, { useState, useEffect } from "react";
import "./ClockGadget.css";

const ClockGadget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const sec  = time.getSeconds();
  const min  = time.getMinutes();
  const hour = time.getHours() % 12;

  const secDeg  = sec  * 6;
  const minDeg  = min  * 6  + sec * 0.1;
  const hourDeg = hour * 30 + min * 0.5;

  const pad = (n) => String(n).padStart(2, "0");
  const ampm = time.getHours() >= 12 ? "PM" : "AM";

  return (
    <div className="clock-gadget">
      <div className="clock-face">
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`clock-tick ${i % 3 === 0 ? "major" : ""}`}
            style={{ transform: `rotate(${i * 30}deg)` }}
          />
        ))}

        {/* Hands */}
        <div className="hand hour-hand"  style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }} />
        <div className="hand min-hand"   style={{ transform: `translateX(-50%) rotate(${minDeg}deg)` }} />
        <div className="hand sec-hand"   style={{ transform: `translateX(-50%) rotate(${secDeg}deg)` }} />
        <div className="clock-center" />
      </div>
      <div className="clock-digital">
        {pad(time.getHours() % 12 || 12)}:{pad(min)}:{pad(sec)} {ampm}
      </div>
    </div>
  );
};

export default ClockGadget;
