import dotenv from "dotenv";
import path from "path";

// Determine the correct .env file based on NODE_ENV
const NODE_ENV = process.env.NODE_ENV || "development";
const envFile = `.env.${NODE_ENV}`;

// Load environment variables from the appropriate .env file
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Export environment variables
const config = {
  env: NODE_ENV,
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI || "", // Ensure fallback
  logLevel: process.env.LOG_LEVEL || "info",
  secretKey: process.env.SECRET_KEY || "", // Ensure fallback
};

export default config;
