const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

// Define a custom log format
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create the logger instance
const logger = createLogger({
  level: "info", // Log only `info` and above levels
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add timestamp
    customFormat // Apply custom formatting
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(), // Colorize output for console
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        customFormat
      ),
    }),
    new transports.File({
      filename: "./logs/error.log",
      level: "error", // Log errors only to error.log
    }),
    new transports.File({
      filename: "./logs/combined.log", // Log all levels to combined.log
    }),
  ],
});

// Export the logger instance
module.exports = logger;