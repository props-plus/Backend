const axios = require('axios')
const express = require('express')
const { sendPropsToReceiver } = require('../../slackbot')
const { WebClient } = require('@slack/web-api')
const confirmationCard = require('../../slackBlocks/confirmationCard')
const router = express.Router()
const web = new WebClient(process.env.BOT_TOKEN)
const ws = require('../../data/model/workspace')
const wsp = require('../../data/model/workpace_profiles')
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

    try {
        const teamExists = await ws.findByTeamID(payload.team.id)
        if (!teamExists) {
            const teamInfo = await web.team.info({
                token: process.env.BOT_TOKEN,
                team: payload.team.id
            })
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

    async function handleSendProps() {
        if (prop == 'Cancel') {
            axios.post(responseURL, {
                blocks: confirmationCard(receiver, prop)
            })
        }

        const user = await wsp.findByUserName(receiver)

        try {
            if (!user) {
                const workspaceUserList = await web.users.list({
                    token: process.env.BOT_TOKEN
                })
                if (workspaceUserList) {
                    const user = workspaceUserList.members.find(
                        receiverUser => receiverUser.name === receiver
                    )

                    const {
                        id,
                        name,
                        real_name,
                        profile,
                        is_admin,
                        is_owner,
                        team_id
                    } = user

                    const team = await ws.findByTeamID(team_id)

                    const newUserObj = {
                        userName: name,
                        userID: id,
                        realName: real_name,
                        userIconSmall: profile.image_24,
                        userIconMed: profile.image_32,
                        userIconLarge: profile.image_48,
                        isOwner: is_owner,
                        isAdmin: is_admin,
                        fk_workspace_id: team.id
                    }

                    const newUser = await wsp.add(
                        WORKSPACE_PROFILES,
                        newUserObj
                    )

                    const sendPropsOptions = {
                        userID: id,
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
                }
            } else {
                const userExistsSendProps = {
                    userID: user.userID,
                    receiver,
                    sendersName,
                    prop,
                    message,
                    isAnon
                }

                sendPropsToReceiver(userExistsSendProps)
                axios.post(responseURL, {
                    blocks: confirmationCard(receiver, prop)
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
})

module.exports = router
