import path from "path";
import fs from "fs";
import pino from "pino";

// Ensure logs directory exists
const logDir = path.join(process.cwd(), "logs");
fs.mkdirSync(logDir, { recursive: true });

// Format the date for log file names (YYYY-MM-DD)
const formattedDate = new Date().toISOString().split("T")[0];

// Define log file path (Single file per day)
const logFilePath = path.join(logDir, `${formattedDate}.log`);

// Initialize Pino Logger
const logger = pino(
  {
    transport: {
      target: "pino-pretty", // Pretty print logs for readability
    },
  },
  pino.destination(logFilePath) // Store logs in a daily file
);

export default logger;
