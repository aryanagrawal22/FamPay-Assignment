const cron = require("node-cron");
const dayjs = require("dayjs");
const { google } = require("googleapis");
const YoutubeModel = require("../models/youtube.model")
const logger = require('../utils/log.util');
const errorlogger = require('../utils/error.log.util');
const moment = require("moment")

// Get keys from the env file and split it to save it in array
const keys = process.env.YOUTUBE_API_KEY.split('|')
  let youtube = google.youtube({
    version: "v3",
    auth: keys[0],
  });

async function getVideo() {
  try {

    // Set a cron job for hitting request in every 1 minute
    cron.schedule("* * * * *", async () => {

      // DateTime of 1 minute earlier time and search for videos uploaded after that
      const publishedAfter = moment().subtract(1, 'minutes').toISOString();

      // Topic to search (Example: News)
      const query = process.env.YOUTUBE_SEARCH_QUERY

      const fetched = await youtube.search.list({
        part: ["snippet"],
        maxResults: 50,
        order: "date",
        query,
        relevanceLanguage: "en",
        publishedAfter,

      }).catch(err => {
        // If API key expired then switch to new key by popping the 0th key and using the new 0th key
        if(err.errors[0].message=="API key expired. Please renew the API key.") {
          const newApiKey = keys.shift();

          //If all keys finished then send warning error
          if(keys.length==0) errorlogger.info(`All API keys used.`);

          //Set new key
          youtube = google.youtube({
            version: "v3",
            auth: newApiKey,
          });
          logger.info(`Current API key expired. New API key- ${newApiKey}`);
          console.log(`Current API key expired. New API key- ${newApiKey}`);
        }else{
          console.log("ERROR: /api/videos (View error.log)")
          errorlogger.info("No response from API, check parameters");
        }
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

      logger.info("CronJob Status: Updated "+videos.length +" videos");
      console.log("CronJob Status: Updated "+videos.length +" videos");

      await YoutubeModel.create(videos);
    });
  } catch (err) {
    errorlogger.info("CronJob: "+err);
  }
}

module.exports = { getVideo };
