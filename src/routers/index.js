const Router = require("express").Router();
const videos = require("./videos.router");

Router.use("/videos", videos);
Router.get("", (req, res) => {
  res.send("Welcome to FamPay-Assignment: Search Query is : " + process.env.YOUTUBE_SEARCH_QUERY);
});

module.exports = Router;