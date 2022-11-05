const YoutubeModel = require("../models/youtube.model");
const logger = require("../utils/log.util");
const errorlogger = require("../utils/error.log.util");

async function searchVideos(req, res) {
  
  const query = req.query.q;
  
  try {

    // Make regular expression of the search query
    const regexQuery = new RegExp(query.replace("-", "|"));

    // Find all matching videos with the regex comparison and option: i (match both lower and upper case)
    const videos = await YoutubeModel.find({
      $or: [
        { title: { $regex: regexQuery, $options: "i" } },
        { description: { $regex: regexQuery, $options: "i" } },
      ],
    }).sort({ publishedAt: -1 }).limit(50);

    // Get total items in search found
    totalItems = videos.length;

    // Total pages that can be formed
    const totalPages = Math.ceil(totalItems / 10);

    // // If page greater than total then set it to last or if does not exist then set default to page 1
    const page = req.query.page > totalPages ? totalPages : req.query.page || 1;

    // Calculate haivng next and having previous pages or not
    const hasPrev = page > 1;
    const hasNext = page < totalPages;
    const pageItems = page!=totalPages?10:totalItems - (totalPages-1)*10;

    res.status(200).json({
      videos,
      hasPrev,
      hasNext,
      totalItems,
      totalPages,
      page,
      pageItems,
    });
  } catch (err) {
    errorlogger.info("/api/videos/s/: " + err);
    console.log("ERROR: /api/videos/s/ (View error.log)")
    res.status(400).send(err);
  }
}

module.exports = {
  searchVideos,
};
