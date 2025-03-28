import { WebSocketServer } from "ws"; // Correct import
import { connect } from "mqtt";

// Create a WebSocket server
const wss = new WebSocketServer({ port: 8081 }); // WebSocket server on port 8081
const mqttClient = connect("mqtt://localhost"); // MQTT broker connection

wss.on("connection", (ws) => {
  console.log("WebSocket client connected.");

  // Handle incoming MQTT messages and send them to WebSocket clients
  mqttClient.on("message", (topic, message) => {
    if (topic === "/signals/two" || topic === "/signals/three") {
      const data = {
        topic,
        signals: JSON.parse(message.toString()),
      };
      ws.send(JSON.stringify(data)); // Send the topic and signals to the WebSocket client
    }
  });
});

// Connect to the MQTT broker and subscribe to topics
mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker.");
  mqttClient.subscribe("/signals/two"); // Subscribe to the two-signal topic
  mqttClient.subscribe("/signals/three"); // Subscribe to the three-signal topic
});
