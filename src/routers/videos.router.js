const { getVideos } = require("../controllers/getVideos.controller");
const { searchVideos } = require("../controllers/searchVideos.controller");
const videoRouter = require("express").Router();

videoRouter.get("/s", searchVideos);
videoRouter.get("", getVideos);

module.exports = videoRouter;
