const Router = require("express").Router();
const {getVideos} = require("../controllers/getVideos.controller");

Router.get("/videos", getVideos);
Router.get("", (req, res) => {
  res.send("Welcome to FamPay-Assignment: Search Query is : " + process.env.YOUTUBE_SEARCH_QUERY);
});

module.exports = Router;