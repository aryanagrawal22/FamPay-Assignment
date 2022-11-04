const YoutubeModel = require("../models/youtube.model");
const logger = require("../utils/log.util");
const errorlogger = require("../utils/error.log.util");

async function getVideos(req, res) {
    
  // Get total items in collection
  totalItems = await YoutubeModel.estimatedDocumentCount();

  // Total pages that can be formed
  const totalPages = Math.ceil(totalItems / 10);

  // If page greater than total then set it to last or if does not exist then set default to page 1
  const page = req.query.page > totalPages ? totalPages : req.query.page || 1;

  try {
    // Search for  videos with limit 10 and from 10*i(th) index sorted in reverse chronological order
    videos = await YoutubeModel.find()
      .limit(10)
      .skip((page - 1) * 10)
      .sort({
        publishedAt: -1,
      })
      .exec();

    // Calculate haivng next and having previous pages or not
    const hasPrev = page > 1;
    const hasNext = page < totalPages;

    res.status(200).json({
      videos,
      hasPrev,
      hasNext,
      totalItems,
      totalPages,
      page,
    });
  } catch (err) {
    errorlogger.info("/api/videos: " + err);
    res.status(400).send(err);
  }
}

module.exports = {
  getVideos,
};
