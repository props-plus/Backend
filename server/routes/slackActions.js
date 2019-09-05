const axios = require('axios')
const express = require('express')
const { sendPropsToReceiver } = require('../../slackbot')
const { WebClient } = require('@slack/web-api')
const confirmationCard = require('../../slackBlocks/confirmationCard')
const router = express.Router()
const web = new WebClient(process.env.BOT_TOKEN)
const ws = require('../../data/model/workspace')
const wsp = require('../../data/migrations/20190818112802_workspace_profiles')
const WORKSPACES = 'WORKSPACES'
const WORKSPACE_PROFILES = 'WORKSPACE_PROFILES'

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

    //check if workspace exists
    try {
        const teamExists = await ws.findByTeamID(payload.team.id)
        if (!teamExists) {
            const teamInfo = await web.team.info({
                token: process.env.BOT_TOKEN,
                team: payload.team.id
            })
            //create workspace object
            const { id, domain, icon } = teamInfo.team
            const wsObj = {
                teamID: id,
                name: domain,
                teamIconSmall: icon.image_34,
                teamIconMed: icon.image_44,
                teamIconLarge: icon.image_68
            }
            const dbEntry = await ws.add(WORKSPACES, wsObj)
        }
        handleSendProps()
    } catch (error) {
        console.error(error)
    }

    //check if rec exists
    async function handleSendProps() {
        //check out db for userid

        try {
            const list = await web.users.list({
                token: process.env.BOT_TOKEN
            })
            if (list) {
                const user = list.members.find(
                    receiverUser => receiverUser.name === receiver
                )
                const userID = user.id
                console.log(user)

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
    }
})

module.exports = router
