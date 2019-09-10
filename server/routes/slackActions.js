const axios = require('axios')
const express = require('express')
const { sendPropsToReceiver } = require('../../slackbot')
const confirmationCard = require('../../slackBlocks/confirmationCard')
const userIdCheck = require('../../actions/userIDCheck')
const teamIdCheck = require('../../actions/teamIDCheck')
const addProps = require('../../actions/addProps')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())

router.post('/', async (req, res) => {
    //JSON.parse on payload, due to single quotes
    const payload = JSON.parse(req.body.payload)
    const { name: sender } = payload.user
    const actions = payload.actions[0]
    //JSON.parse on value due to stringified object on value key
    const { prop, receiver, message, isAnon } = JSON.parse(actions.value)
    const responseURL = payload.response_url

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
})

module.exports = router
