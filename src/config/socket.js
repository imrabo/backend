import { Server } from "socket.io";
import { createServer } from "http";
import app from "../app.js";

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// Create a namespace for IoT devices
const iotNamespace = io.of("/iot");

iotNamespace.on("connection", (socket) => {
    const deviceId = socket.handshake.query.deviceId; // Extract deviceId from query params

    if (!deviceId) {
        console.log(`❌ IoT Client ${socket.id} connected WITHOUT a deviceId. Disconnecting...`);
        socket.disconnect();
        return;
    }

    console.log(`✅ IoT Client connected: ${socket.id} (Device: ${deviceId})`);
    
    // Join the device-specific room
    socket.join(deviceId);

    // IoT device sends data
    socket.on("iot_device", (data) => {
        console.log(`📩 Received data from IoT device ${deviceId}:`, data);

        // Emit "iot_device" event ONLY in the corresponding device's room
        iotNamespace.to(deviceId).emit("iot_device", { deviceId, data });
    });

    // Handle IoT device disconnection
    socket.on("disconnect", () => {
        console.log(`🔌 IoT Client disconnected: ${socket.id} (Device: ${deviceId})`);
    });
});

export { server, io, iotNamespace };
