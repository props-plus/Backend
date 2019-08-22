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
  const [ user, message ] = arr;
  const trueuser = user.substring(1);

  res.json({
    blocks: confirmSendPropsCard(trueuser, message)
  });
})

module.exports = router;
