const mongoose = require("mongoose");

const mongoUri = process.env.mongoURI;

//Connect with MongoDB
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("MongoDB Connected");
  });

module.exports = mongoose;