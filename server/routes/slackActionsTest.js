const axios = require('axios')
const express = require('express')
//const { sendPropsToReceiver } = require('../../slackbot')
//const { WebClient } = require('@slack/web-api')
//const confirmationCard = require('../../slackBlocks/confirmationCard')
const recentPropsCard = require('../../slackBlocks/recentPropsCard');
const router = express.Router()
//const web = new WebClient(process.env.BOT_TOKEN)

router.use(express.json())
router.use(express.urlencoded())

testProps = [
  {
    msg: 'a',
    sender: 'f'
  },
  {
    msg: 'b',
    sender: 'g'
  },
  {
    msg: 'c',
    sender: 'h'
  },
  {
    msg: 'd',
    sender: 'i'
  },
  {
    msg: 'e',
    sender: 'j'
  }
];

router.post('/', async (req, res) => {
  const payload = JSON.parse(req.body.payload);
  console.log(payload);
  const responseURL = payload.response_url;
  const value = payload.actions[0].value;

  if(value === 'given' || value === 'received'){
    axios.post(responseURL, {
        blocks: recentPropsCard('USER', testProps)
    })
  }
})

module.exports = router
