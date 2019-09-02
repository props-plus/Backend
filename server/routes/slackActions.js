const axios = require('axios')
const express = require('express')
const { sendPropsToReceiver } = require('../../slackbot')
const { WebClient } = require('@slack/web-api')
const confirmationCard = require('../../slackBlocks/confirmationCard')
const router = express.Router()
const web = new WebClient(process.env.BOT_TOKEN)

router.use(express.json())
router.use(express.urlencoded())

router.post('/', async (req, res) => {
    //JSON.parse on payload, due to single quotes
    const payload = JSON.parse(req.body.payload)
    const { name: sendersName } = payload.user
    const actions = payload.actions[0]
    //JSON.parse on value due to stringified object on value key
    const { prop, receiver, message, isAnon } = JSON.parse(actions.value)
    const responseURL = payload.response_url

    ;(async () => {
        try {
            const list = await web.users.list({
                token: process.env.BOT_TOKEN
            })
            if (list) {
                const user = list.members.find(
                    receiverUser => receiverUser.name === receiver
                )
                const userID = user.id

                if (prop !== 'Cancel') {
                    const sendPropsOptions = {
                        userID,
                        receiver,
                        sendersName,
                        prop,
                        message,
                        isAnon
                    }
                    sendPropsToReceiver(sendPropsOptions)
                }

                axios.post(responseURL, {
                    blocks: confirmationCard(receiver, prop)
                })
            }
        } catch (e) {
            console.error(e)
        }
    })()
})

module.exports = router
