const mongoose = require("mongoose");

const youtubeSchema = new mongoose.Schema(
  {
    title: String,
    channelId: String,
    videoId: String,
    channelTitle: String,
    description: String,
    thumbnails: {
      default: {
        url: String,
        width: Number,
        height: Number,
      },
      medium: {
        url: String,
        width: Number,
        height: Number,
      },
      high: {
        url: String,
        width: Number,
        height: Number,
      },
    },
    publishedAt: Date,
  },
  {
    timestamps: true,
  }
);

const YoutubeModel = mongoose.model("Youtube", youtubeSchema);

module.exports = YoutubeModel;
