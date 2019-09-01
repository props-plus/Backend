const axios = require('axios')
const express = require('express')
const { sendDM } = require('../../slackbot')
const { WebClient } = require('@slack/web-api')
const confirmationCard = require('../../slackBlocks/confirmationCard')
const router = express.Router()
const web = new WebClient(process.env.BOT_TOKEN)

router.use(express.json())
router.use(express.urlencoded())

router.post('/', async (req, res) => {
    const payload = await JSON.parse(req.body.payload)
    const { username } = await JSON.parse(req.body.payload).user
    const actions = payload.actions[0]
    const { prop, receiver, message, isAnon } = JSON.parse(actions.value)
    const responseURL = payload.response_url

    ;(async () => {
        try {
            const list = await web.users.list({
                token: process.env.BOT_TOKEN
            })
            if (list) {
                const userId = list.members.find(
                    recuser => recuser.name === receiver
                ).id
                if (prop !== 'Cancel') {
                    sendDM(userId, receiver, username, prop, message)
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
