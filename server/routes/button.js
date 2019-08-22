const propsReceivedCard = require('../../slackBlocks/receivedPropsCard');
const confirmSendPropsCard = require('../../slackBlocks/confirmSendPropsCard');

const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded());


router.post('/', async (req, res) => {
  const payload = await req.body.payload;
  console.log(JSON.parse(payload));
  res.json({
    text: "button test"
  })
});

module.exports = router;
