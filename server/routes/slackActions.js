const axios = require('axios')
const express = require('express')
const { sendPropsToReceiver } = require('../../slackbot')
const confirmationCard = require('../../slackBlocks/confirmationCard')
const userIdCheck = require('../../actions/userIDCheck')
const teamIdCheck = require('../../actions/teamIDCheck')
const router = express.Router()

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

    try {
        if (prop == 'Cancel') {
            axios.post(responseURL, {
                blocks: confirmationCard(receiver, prop)
            })
        }

        const team = await teamIdCheck(payload)
        const user = await userIdCheck(receiver)
        console.log('team', team)
        console.log('user', user)

        const sendPropsOptions = {
            userID: user.userID,
            receiver,
            sendersName,
            prop,
            message,
            isAnon
        }

        sendPropsToReceiver(sendPropsOptions)

        axios.post(responseURL, {
            blocks: confirmationCard(receiver, prop)
        })
    } catch (error) {
        console.error(error)
    }
})

module.exports = router
