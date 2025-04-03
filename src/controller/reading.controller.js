import express from "express";
import DeviceModel from "../model/device.model.js"; // Adjust the path as needed

const readingRouter = express.Router();

// Add a reading to an existing device
readingRouter.post("/", async (req, res) => {
  try {
    // Extract deviceId from query parameters and other data from the request body
    const { deviceId } = req.query;
    const { data } = req.body;

    // Validate if deviceId is provided in query parameters
    if (!deviceId) {
      return res.status(400).json({ message: "Device ID is required in query parameters" });
    }

    // Find the device by deviceId
    const device = await DeviceModel.findById(deviceId);
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    // Push new reading to the readings array
    device.reading.push(data);
    await device.save();

    // Return success response
    res.status(201).json({ message: "Reading added successfully", device });
  } catch (error) {
    // Return error response
    res.status(500).json({ message: "Error adding reading", error: error.message });
  }
});

export default readingRouter;
