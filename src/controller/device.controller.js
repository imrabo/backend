import DeviceModel from "../model/device.model.js"; // Ensure correct path
import UserModel from "../model/user.model.js";
import { validationResult } from "express-validator";

// 📌 1️⃣ Create Device (POST)
export async function postDeviceController(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { deviceName, deviceType } = req.body;
    const userId = req.userId; // Extracted from JWT middleware

    try {
        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const existingDevice = await DeviceModel.findOne({ userId, deviceName });
        if (existingDevice) return res.status(400).json({ msg: "Device already registered for this user" });

        const newDevice = new DeviceModel({ userId, deviceName, deviceType });
        await newDevice.save();

        // Store device reference in user model
        await UserModel.findByIdAndUpdate(userId, { $push: { devices: newDevice._id } });

        res.status(201).json({ msg: "Device added successfully", device: newDevice });
    } catch (error) {
        console.error("❌ Error in postDeviceController:", error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

// 📌 2️⃣ Get All Devices (For Logged-in User)
export async function getDevicesController(req, res) {
    try {
        const devices = await DeviceModel.find({ userId: req.userId }).lean();
        res.status(200).json({ devices });
    } catch (error) {
        console.error("❌ Error in getDevicesController:", error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

// 📌 3️⃣ Get Single Device by ID
export async function getDeviceByIdController(req, res) {
    const { deviceId } = req.params;
    const userId = req.userId;

    try {
        const device = await DeviceModel.findOne({ _id: deviceId, userId });
        if (!device) return res.status(404).json({ msg: "Device not found" });

        res.status(200).json({ device });
    } catch (error) {
        console.error("❌ Error in getDeviceByIdController:", error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

// 📌 4️⃣ Update Device (PUT)
export async function updateDeviceController(req, res) {
    const { deviceId } = req.params;
    const { deviceType, isActive, isTrusted } = req.body;

    try {
        // Construct update object dynamically
        const updateData = {};
        if (deviceType !== undefined) updateData.deviceType = deviceType;
        if (isTrusted !== undefined) updateData.isTrusted = isTrusted;
        if (isActive !== undefined) {
            updateData.isActive = isActive;
            updateData.lastConnected = isActive ? new Date() : null;
        }
        updateData.lastUsed = new Date();

        const updatedDevice = await DeviceModel.findOneAndUpdate(
            { _id: deviceId, userId: req.userId },
            { $set: updateData },
            { new: true }
        );

        if (!updatedDevice) return res.status(404).json({ msg: "Device not found" });

        res.status(200).json({ msg: "Device updated successfully", device: updatedDevice });
    } catch (error) {
        console.error("❌ Error in updateDeviceController:", error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

// 📌 5️⃣ Delete Device (DELETE)
export async function deleteDeviceController(req, res) {
    const { deviceId } = req.params;

    try {
        const deletedDevice = await DeviceModel.findOneAndDelete({ _id: deviceId, userId: req.userId });
        if (!deletedDevice) return res.status(404).json({ msg: "Device not found" });

        // Remove device reference from user model
        await UserModel.findByIdAndUpdate(req.userId, { $pull: { devices: deviceId } });

        res.status(200).json({ msg: "Device deleted successfully" });
    } catch (error) {
        console.error("❌ Error in deleteDeviceController:", error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}
