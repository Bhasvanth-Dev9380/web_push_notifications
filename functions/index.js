const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({ origin: true });

const SLACK_TOKEN = "xoxb-8922845013651-8929130147797-0F5ftzQSm3OrAoiJibEzLpvi";
const CHANNEL = "#team-proactive";

exports.sendSlackMessage = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { text } = req.body;

    try {
      const slackResponse = await axios.post(
        "https://slack.com/api/chat.postMessage",
        {
          channel: CHANNEL,
          text: text
        },
        {
          headers: {
            Authorization: `Bearer ${SLACK_TOKEN}`,
            "Content-type": "application/json; charset=utf-8"
          }
        }
      );

      return res.status(200).json(slackResponse.data);
    } catch (error) {
      console.error("Slack error:", error.response?.data || error.message);
      return res.status(500).json({ error: "Slack API call failed" });
    }
  });
});
