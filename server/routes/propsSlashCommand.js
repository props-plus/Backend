const propsReceivedCard = require('../../slackBlocks/receivedPropsCard');
const confirmSendPropsCard = require('../../slackBlocks/confirmSendPropsCard');

const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded());

router.post('/', async (req, res) => {
  console.log(req.body);
  const { response_url, text, user_id, user_name } = req.body;

  const arr = text.split(' ');
  const [ user, msg ] = arr;
  const trueuser = user.substring(1);
  const truemsg = arr.slice(1, arr.length).join(' ');

  res.json({
    blocks: confirmSendPropsCard(trueuser, truemsg)
  });
})

module.exports = router;
