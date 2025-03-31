import morgan from 'morgan';
import winston from 'winston';

// Timestamp format
const timestampFormat = winston.format.timestamp({
  format: 'YYYY-MM-DD HH:mm:ss',
});

// Winston Logger Setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    timestampFormat,
    winston.format.json() // JSON format for structured logging
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Add colors to console logs
        timestampFormat,
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Errors only
    new winston.transports.File({ filename: 'logs/combined.log' }), // All logs
  ],
});

// Morgan for HTTP request logging with timestamp & response time
const requestLogger = morgan(
  (tokens, req, res) => {
    return [
      `[${new Date().toISOString()}]`, // Timestamp
      tokens.method(req, res), // HTTP Method (GET, POST, etc.)
      tokens.url(req, res), // Request URL
      tokens.status(req, res), // Status code
      tokens['response-time'](req, res) + 'ms', // Response time
      `User-Agent: ${req.headers['user-agent']}`, // User-Agent info
    ].join(' ');
  },
  { stream: { write: (message) => logger.info(message.trim()) } }
);

export { logger, requestLogger };
