const mongoose = require("mongoose");
const logger = require("../logger/logger.js")

const connection = async () => {
  return await mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => {
      logger.info(`Mongodb connected with server: ${data.connection.host}`)
    })
    .catch((err) => logger.error(`Database connection error: ${err.message}`));
};

module.exports = connection;