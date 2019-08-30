const propsReceivedCard = require('../../slackBlocks/receivedPropsCard');
const confirmSendPropsCard = require('../../slackBlocks/confirmSendPropsCard');

const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded());

router.post('/', async (req, res) => {
  const { response_url, text, user_id, user_name } = req.body;

  const arr = text.split(' ');
  const [ user ] = arr;
  const trueuser = user.substring(1);
  const msg = arr.slice(1, arr.length).join(' ');

  res.json({
    blocks: confirmSendPropsCard(trueuser, msg)
  });
})

module.exports = router;
