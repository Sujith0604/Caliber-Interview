# Caliber Traffic Signal System

This project is a traffic signal system that consists of a **client** (frontend) and a **server** (backend). The system uses MQTT for communication and WebSocket for real-time updates. The client displays two-signal and three-signal traffic lights, while the server handles signal generation, MQTT publishing, and database storage.

---

## Project Structure

---

## Features

### Client
- Displays two-signal traffic lights (Red and Green).
- Displays three-signal traffic lights (Red, Yellow, and Green).
- Real-time updates using WebSocket.

### Server
- Generates random traffic signals.
- Publishes signals to MQTT topics (`/signals/two` and `/signals/three`).
- Stores signal data in a PostgreSQL database.
- Sends real-time updates to WebSocket clients.

---

## Prerequisites

- **Node.js** (v14 or later)
- **PostgreSQL** (Ensure the database is running)
- **MQTT Broker** (e.g., Mosquitto)
- **npm** (Node Package Manager)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Sujith0604/Caliber-Interview.git
cd Caliber
```
### 2. Server Setup
```bash
cd server
npm install
```
### 3. Postgre create table using query
```bash
CREATE TABLE signals (
    id SERIAL PRIMARY KEY,
    signal_id INT NOT NULL,
    state VARCHAR(10) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Start the MQTT broker 
```bash
node mqttPublisher.js
```

### 5. Start the WebSocket server:
```bash
node websocketServer.js
```

### Client Setup
```bash
cd client
```

### 1 install package
```bash
npm install
```

### 2 Start application
```bash
npm run dev
```

