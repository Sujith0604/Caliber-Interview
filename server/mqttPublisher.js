import { connect } from "mqtt";
import pkg from "pg";
const { Client } = pkg;

// Connect to MQTT broker
const mqttClient = connect("mqtt://localhost");

// Connect to PostgreSQL
const dbClient = new Client({
  user: "postgres",
  host: "localhost",
  database: "signals",
  password: "12345678",
  port: 5434,
});

dbClient
  .connect()
  .then(() => console.log("Connected to PostgreSQL database."))
  .catch((err) => console.error("Failed to connect to PostgreSQL:", err));

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker.");

  let toggle = true;

  setInterval(() => {
    const signals = toggle
      ? [
          {
            id: 1,
            state: ["Red", "Green"][Math.floor(Math.random() * 2)],
          },
          {
            id: 2,
            state: ["Red", "Green"][Math.floor(Math.random() * 2)],
          },
        ]
      : [
          {
            id: 1,
            state: ["Red", "Yellow", "Green"][Math.floor(Math.random() * 3)],
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

    const topic = toggle ? "/signals/two" : "/signals/three";
    mqttClient.publish(topic, JSON.stringify(signals));
    console.log(`Published to ${topic}:`, signals);

    signals.forEach((signal) => {
      const query =
        "INSERT INTO signals (signal_id, state, timestamp) VALUES ($1, $2, NOW())";
      const values = [signal.id, signal.state];

      dbClient
        .query(query, values)
        .then(() => console.log("Signal data stored in PostgreSQL:", signal))
        .catch((err) => console.error("Failed to store signal data:", err));
    });

    toggle = !toggle;
  }, 2000);
});
