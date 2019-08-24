const axios = require('axios');

const propsReceivedCard = require('../../slackBlocks/receivedPropsCard');
const confirmSendPropsCard = require('../../slackBlocks/confirmSendPropsCard');
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

  //console.log(process.env.BOT_TOKEN);

  const userlist = await axios.get('https://slack.com/api/users.list', {
    params: {
      token: process.env.BOT_TOKEN
    }
  });

  const userID = userlist.data.members.find(recuser => recuser.name === receiver).id;

  //console.log(userID);
  //console.log(receiver);
  sendDM(userID, message);

  // const user = await axios.get('https://slack.com/api/users.info', {
  //   params: {
  //     token: process.env.BOT_TOKEN,
  //     user: 'UMJV92RH6'
  //   }
  // });
  //
  // console.log(user);


});

module.exports = router;
