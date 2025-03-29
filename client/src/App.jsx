import React, { useState, useEffect } from "react";
import { TwoSignalCard, ThreeSignalCard } from "./components/SignalCard";

const App = () => {
  const [twoSignals, setTwoSignals] = useState([]);
  const [threeSignals, setThreeSignals] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.topic === "/signals/two") {
        setTwoSignals(message.signals);
      } else if (message.topic === "/signals/three") {
        setThreeSignals(message.signals);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event.reason);
    };

    return () => ws.close();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Signal Cards</h1>

      {twoSignals.length > 0 && (
        <div className="signal-container flex flex-col lg:flex-row gap-6 justify-center">
          {twoSignals.map((signal) => (
            <TwoSignalCard
              key={signal.id}
              id={signal.id}
              state={signal.state}
            />
          ))}
        </div>
      )}

      {threeSignals.length > 0 && (
        <div className="signal-container flex flex-col lg:flex-row gap-6 justify-center mt-10">
          {threeSignals.map((signal) => (
            <ThreeSignalCard
              key={signal.id}
              id={signal.id}
              state={signal.state}
            />
          ))}
        </div>
      )}

      {twoSignals.length === 0 && threeSignals.length === 0 && (
        <div className="text-center text-gray-500">Waiting for signals...</div>
      )}
    </div>
  );
};

export default App;
