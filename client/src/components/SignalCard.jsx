import React from "react";

const TwoSignalCard = ({ id, state }) => {
  const getLightClass = (lightState) => {
    return state === lightState ? "opacity-100" : "opacity-30";
  };

  return (
    <div className="traffic-signal w-32 h-64 bg-black rounded-lg flex flex-col justify-around items-center p-4 shadow-lg">
      <div
        className={`w-16 h-16 rounded-full bg-red-600 ${getLightClass("Red")}`}
      ></div>

      <div
        className={`w-16 h-16 rounded-full bg-green-600 ${getLightClass(
          "Green"
        )}`}
      ></div>

      <p className="text-white text-sm mt-2">Signal {id}</p>
    </div>
  );
};

const ThreeSignalCard = ({ id, state }) => {
  const getLightClass = (lightState) => {
    return state === lightState ? "opacity-100" : "opacity-30";
  };

  return (
    <div className="traffic-signal w-24 h-72 bg-black rounded-lg flex flex-col justify-around items-center p-4 shadow-lg">
      <div
        className={`w-16 h-16 rounded-full bg-red-600 ${getLightClass("Red")}`}
      ></div>

      <div
        className={`w-16 h-16 rounded-full bg-yellow-400 ${getLightClass(
          "Yellow"
        )}`}
      ></div>

      <div
        className={`w-16 h-16 rounded-full bg-green-600 ${getLightClass(
          "Green"
        )}`}
      ></div>

      <p className="text-white text-sm mt-2">Signal {id}</p>
    </div>
  );
};

export { TwoSignalCard, ThreeSignalCard };
