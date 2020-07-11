import React, { useState, useEffect } from "react";
import "./App.css";

// custom imports
import Footer from "./components/Footer";
import { getTime } from "./utils";

// utils
const minToSec = (min) => min * 60;

function App() {
  // constants
  const views = {
    pomodoro: "Pomodoro",
    custom: "Custom Time",
    longBreak: "Long Break",
    shortBreak: "Short Break",
  };
  const initialCustomMin = ""; // 0 mins
  const interval = 1000; // 1 sec
  const pomodoroTime = 1500; // 25 min
  const shortBreakTime = 300; // 5 min
  const longBreakTime = 600; // 10 min

  // states
  const [sec, setSec] = useState(pomodoroTime);
  const [stopped, setStopped] = useState(true); // initially the timer is stopped
  const [view, setView] = useState(views.pomodoro);
  const [customMin, setCustomMin] = useState(initialCustomMin);

  useEffect(() => {
    let timer;

    if (!stopped && sec !== 0) {
      timer = setInterval(() => {
        setSec((c) => c - 1);
      }, interval);
    }

    return () => clearInterval(timer); // cleanup
  }, [stopped, sec]);

  const handleStart = () => {
    setStopped(false);
  };

  const handleStop = () => {
    setStopped(true);
  };

  const handleReset = () => {
    setStopped(true);

    switch (view) {
      case views.pomodoro:
        setSec(pomodoroTime);
        break;
      case views.custom:
        setSec(minToSec(customMin));
        break;
      case views.longBreak:
        setSec(longBreakTime);
        break;
      case views.shortBreak:
        setSec(shortBreakTime);
        break;
      default:
        break;
    }
  };

  return (
    <div className="wrapper">
      <div className="mainBody">
        <div className="topButtons">
          <button
            onClick={() => {
              setSec(pomodoroTime);
              setView(views.pomodoro);
            }}
          >
            Pomodoro Timer
          </button>
          <button
            onClick={() => {
              setSec(minToSec(customMin));
              setView(views.custom);
            }}
          >
            Custom Timer
          </button>
          <button
            onClick={() => {
              setSec(longBreakTime);
              setView(views.longBreak);
            }}
          >
            Long Break
          </button>
          <button
            onClick={() => {
              setSec(shortBreakTime);
              setView(views.shortBreak);
            }}
          >
            Short Break
          </button>
        </div>
        <div>
          <div className="timerContainer">
            <h1
              className="timer"
              style={{ marginBottom: view === views.custom ? "20px" : "0" }}
            >
              {view}: <span>{getTime(sec)}</span>
            </h1>
            {view === views.custom && (
              <div className="showForm">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSec(minToSec(customMin));
                    setStopped(false);
                  }}
                >
                  <input
                    value={customMin}
                    type="number"
                    placeholder="Enter Time [minutes]"
                    onChange={(e) => setCustomMin(e.target.value)}
                  />
                  <button className="setTime" type="submit">
                    Set
                  </button>
                </form>
              </div>
            )}
          </div>
          <div className="handlers">
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
