const cron = require("node-cron");
const dayjs = require("dayjs");
const { google } = require("googleapis");

async function getVideo() {
  try {

    // Set a cron job for hitting request in every 10 seconds
    cron.schedule("*/10 * * * * *", async () => {

      const youtube = google.youtube({
        version: "v3",
        auth: process.env.YOUTUBE_API_KEY,
      });

      // DateTime of 1 minute earlier time and search for videos uploaded after that
      const publishedAfter = dayjs().subtract(1, "minute").toISOString();

      // Topic to search (Example: News)
      const q = process.env.YOUTUBE_SEARCH_QUERY

      const fetched = await youtube.search.list({
        part: ["snippet"],
        maxResults: 50,
        order: "date",
        q,
        relevanceLanguage: "en",
        publishedAfter,
      });

      // Relevent data into array format of fetched data
      const videos = fetched.data.items.map((item) => ({
        title: item.snippet.title,
        videoId: item.id.videoId,
        description: item.snippet.description,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        thumbnails: {
          default: item.snippet.thumbnails.default,
          medium: item.snippet.thumbnails.medium,
          high: item.snippet.thumbnails.high,
        },
        publishedAt: item.snippet.publishedAt,
      }));

      console.log(videos);
    });
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { getVideo };
