//const recentPropsCard = require('../../slackBlocks/recentPropsCard');
const recentPropsSelectionCard = require('../../slackBlocks/recentPropsSelectionCard');
const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded());

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
  const user = req.body.user_id;

  res.json({
      blocks: recentPropsSelectionCard()
  })
});

module.exports = router;
