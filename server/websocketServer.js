import { WebSocketServer } from "ws";
import { connect } from "mqtt";

// Create a WebSocket server
const wss = new WebSocketServer({ port: 8081 });
const mqttClient = connect("mqtt://localhost");

wss.on("connection", (ws) => {
  console.log("WebSocket client connected.");

  mqttClient.on("message", (topic, message) => {
    if (topic === "/signals/two" || topic === "/signals/three") {
      const data = {
        topic,
        signals: JSON.parse(message.toString()),
      };
      ws.send(JSON.stringify(data));
    }
  });
});

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker.");
  mqttClient.subscribe("/signals/two");
  mqttClient.subscribe("/signals/three");
});
