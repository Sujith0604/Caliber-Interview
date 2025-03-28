import { connect } from "mqtt";
import pkg from "pg";
const { Client } = pkg;

// Connect to MQTT broker
const mqttClient = connect("mqtt://localhost"); // Replace with your MQTT broker URL

// Connect to PostgreSQL
const dbClient = new Client({
  user: "postgres", // Replace with your PostgreSQL username
  host: "localhost", // Replace with your PostgreSQL host
  database: "signals", // Replace with your PostgreSQL database name
  password: "12345678", // Replace with your PostgreSQL password
  port: 5434, // Default PostgreSQL port
});

dbClient
  .connect()
  .then(() => console.log("Connected to PostgreSQL database."))
  .catch((err) => console.error("Failed to connect to PostgreSQL:", err));

// mqttClient.on("connect", () => {
//   console.log("Connected to MQTT broker.");

//   setInterval(() => {
//     const signalData = {
//       id: Math.floor(Math.random() * 10) + 1,
//       state: ["Red", "Yellow", "Green"][Math.floor(Math.random() * 3)],
//     };

//     // Publish to MQTT topic
//     mqttClient.publish("/signals/traffic", JSON.stringify(signalData));
//     console.log("Published:", signalData);

//     // Insert signal data into PostgreSQL
//     const query =
//       "INSERT INTO signals (signal_id, state, timestamp) VALUES ($1, $2, NOW())";
//     const values = [signalData.id, signalData.state];

//     dbClient
//       .query(query, values)
//       .then(() => console.log("Signal data stored in PostgreSQL:", signalData))
//       .catch((err) => console.error("Failed to store signal data:", err));
//   }, 2000); // Publish every 2 seconds
// });

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker.");

  let toggle = true; // Toggle between two and three signals

  setInterval(() => {
    // Generate signals based on the toggle state
    const signals = toggle
      ? [
          {
            id: 1,
            state: ["Red", "Green"][Math.floor(Math.random() * 2)], // Two signals: Red and Green
          },
          {
            id: 2,
            state: ["Red", "Green"][Math.floor(Math.random() * 2)],
          },
        ]
      : [
          {
            id: 1,
            state: ["Red", "Yellow", "Green"][Math.floor(Math.random() * 3)], // Three signals: Red, Yellow, Green
          },
          {
            id: 2,
            state: ["Red", "Yellow", "Green"][Math.floor(Math.random() * 3)],
          },
          {
            id: 3,
            state: ["Red", "Yellow", "Green"][Math.floor(Math.random() * 3)],
          },
        ];

    // Publish signals as a group to the MQTT topic
    const topic = toggle ? "/signals/two" : "/signals/three";
    mqttClient.publish(topic, JSON.stringify(signals));
    console.log(`Published to ${topic}:`, signals);

    // Insert each signal into PostgreSQL
    signals.forEach((signal) => {
      const query =
        "INSERT INTO signals (signal_id, state, timestamp) VALUES ($1, $2, NOW())";
      const values = [signal.id, signal.state];

      dbClient
        .query(query, values)
        .then(() => console.log("Signal data stored in PostgreSQL:", signal))
        .catch((err) => console.error("Failed to store signal data:", err));
    });

    toggle = !toggle; // Alternate between two and three signals
  }, 2000); // Publish every 2 seconds
});
