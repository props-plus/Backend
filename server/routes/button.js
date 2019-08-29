const axios = require('axios');
const { WebClient } = require('@slack/web-api');

const web = new WebClient(process.env.BOT_TOKEN);

const confirmationCard = require('../../slackBlocks/confirmationCard');
const {sendDM} = require('../../slackbot');

const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded());


router.post('/', async (req, res) => {
  const payload = await JSON.parse(req.body.payload);
  const { username } = await JSON.parse(req.body.payload).user;
  const actions = payload.actions[0];
  const { prop, receiver, message } = JSON.parse(actions.value);
  const responseURL = payload.response_url;

  const token = payload.token;

  console.log('*****TOKEN*****', token);
  // const userlist = await axios.get('https://slack.com/api/users.list', {
  //   params: {
  //     token: process.env.BOT_TOKEN
  //   }
  // });
  console.log('Before async');
  (async () => {
    try {
      const result = await web.auth.test({
        token: process.env.BOT_TOKEN
      })

      console.log(result)
    } catch (e) {
      console.log(e);
    }

    return result;
  // Post a message to the channel, and await the result.
  // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage

  // The result contains an identifier for the message, `ts`.
})();

  //const userId = userlist.members.find(recuser => recuser.name === receiver).id;

  // if(prop !== 'Cancel'){
  //   sendDM(userId, receiver, username, prop, message);
  // }
  //
  // axios.post(responseURL, {
  //   blocks: confirmationCard(receiver, prop)
  // })

});

module.exports = router;
