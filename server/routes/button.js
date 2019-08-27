const axios = require('axios');

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

  const userlist = await axios.get('https://slack.com/api/users.list', {
    params: {
      token: process.env.BOT_TOKEN
    }
  });

  const userId = userlist.data.members.find(recuser => recuser.name === receiver).id;

  if(prop !== 'Cancel'){
    sendDM(userId, receiver, username, prop, message);
  }

  axios.post(responseURL, {
    blocks: confirmationCard(receiver, prop)
  })

});

module.exports = router;
