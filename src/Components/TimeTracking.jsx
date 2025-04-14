import { useState, useEffect } from "react";

export const TimeTracking = ({
  taskId,
  onClose,
  setTimerRunning,
  timerRunning,
}) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const savedTime = localStorage.getItem(`task-time-${taskId}`);
    if (savedTime) setElapsed(parseInt(savedTime, 10));
  }, [taskId]);

  const handleStartStop = () => {
    setTimerRunning((prev) => !prev); // Toggle the timer
    onClose(); // Close the modal
  };

  const handleReset = () => {
    setElapsed(0);
    localStorage.setItem(`task-time-${taskId}`, "0");
    setTimerRunning(false); // Stop the timer
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h3 className="time-header">Time Tracking</h3>
        <p className="time-display">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m1-8h4v2h-6V7h2z"
            ></path>
          </svg>{" "}
          {formatTime(elapsed)}
        </p>
        <div className="button-group">
          <button onClick={handleStartStop} className="start-btn">
            {timerRunning ? "Stop" : "Start"}
          </button>
          <button onClick={handleReset} className="reset-btn">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
