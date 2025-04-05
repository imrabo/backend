import express from "express";
import DeviceModel from "../model/device.model.js"; // Adjust the path as needed

const readingRouter = express.Router();

// Add a reading to an existing device
readingRouter.post("/", async (req, res) => {
  try {
    const { deviceId } = req.query;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ message: "Data is required in body parameters" });
    }

    if (!deviceId) {
      return res.status(400).json({ message: "Device ID is required in query parameters" });
    }

    const device = await DeviceModel.findById(deviceId);
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    device.reading.push(data);
    await device.save();

    return res.status(201).json({
      message: "Reading added successfully",
      device,
    });

  } catch (error) {
    console.error("Error adding reading:", error);
    return res.status(500).json({
      message: "Internal server error while adding reading",
      error: error.message,
    });
  }
});

export default readingRouter;
