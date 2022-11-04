const logger = require("../utils/log.util")
const mongoose = require("mongoose");

const mongoUri = process.env.mongoURI;

//Connect with MongoDB
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    logger.info("MongoDB Connected");
    console.log("MongoDB Connected");
  });

module.exports = mongoose;