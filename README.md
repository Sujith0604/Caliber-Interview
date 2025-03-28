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
git clone https://github.com/<your-username>/Caliber.git
cd Caliber

---

##Server set up
