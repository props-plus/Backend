const express = require("express");
const request = require("request");
const userInfo = require("../../helpers/userinfo");
const router = express.Router();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

router.get("/", async (req, res) => {
  if (!req.query.code) {
    res.status(500).json({ error: "Not getting code" });
  } else {
    request(
      {
        url: "https://slack.com/api/oauth.access",
        qs: {
          code: req.query.code,
          client_id,
          client_secret
        },
        method: "GET"
      },
      async (error, resp, body) => {
        if (error) {
          console.error(error);
        } else {
          body = JSON.parse(body);
          const user = await userInfo(body.access_token, body.user_id);
          let myToken = user.uri.query
            .split("&user")
            .shift()
            .replace(/token=/, "");
          res.json({ token: myToken });
        }
      }
    );
  }
});

module.exports = router;
