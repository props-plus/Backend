const axios = require('axios')
const express = require('express')
const recentPropsCard = require('../../slackBlocks/recentPropsCard');
const { sendPropsToReceiver } = require('../../slackbot')
const confirmationCard = require('../../slackBlocks/confirmationCard')
const userIdCheck = require('../../actions/userIDCheck')
const teamIdCheck = require('../../actions/teamIDCheck')
const addProps = require('../../actions/addProps')

const router = express.Router()

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
  const actions = payload.actions[0];
  const value = actions.value;

  if(value === 'given' || value === 'received' || value === 'reccancel'){
    await axios.post(responseURL, {
        blocks: recentPropsCard(value, testProps)
    })
  } else {
    const { name: sender } = payload.user
    const { prop, receiver, message, isAnon } = JSON.parse(actions.value)

    try {
        if (sender === receiver) {
            await axios.post(responseURL, {
                blocks: confirmationCard(receiver, 'Same')
            })
        } else if (prop == 'Cancel') {
            await axios.post(responseURL, {
                blocks: confirmationCard(receiver, prop)
            })
        } else {
            const team = await teamIdCheck(payload)
            const propsSender = await userIdCheck(sender)
            const propsReceiver = await userIdCheck(receiver)

            const sendPropsOptions = {
                userID: propsReceiver.userID,
                receiver: propsReceiver.realName,
                sender,
                prop,
                message,
                isAnon
            }

            const propDBEntry = {
                ...sendPropsOptions,
                senderID: propsSender.id,
                receiverID: propsReceiver.id,
                prop,
                responseURL
            }

            const isPropsAdded = await addProps(propDBEntry)

            if (isPropsAdded) {
                await sendPropsToReceiver(sendPropsOptions)

                await axios.post(responseURL, {
                    blocks: confirmationCard(receiver, prop)
                })
            }
        }
    } catch (error) {
        console.error(error)
    }
  }
})

module.exports = router
