const logger = require("../logger/logger.js");
const ErrorHandler = require("../utils/errorhandler.js");
module.exports = (err, req, res, next) => {
  
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  logger.error(`Error: ${err.message}, StatusCode: ${err.statusCode}`);

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
