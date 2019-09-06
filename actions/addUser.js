const { WebClient } = require('@slack/web-api')
const web = new WebClient(process.env.BOT_TOKEN)
const ws = require('../data/model/workspace')
const wsp = require('../data/model/workpace_profiles')
const WORKSPACE_PROFILES = 'WORKSPACE_PROFILES'

const addUser = async propUser => {
    try {
        const workspaceUserList = await web.users.list({
            token: process.env.BOT_TOKEN
        })
        if (workspaceUserList) {
            const user = workspaceUserList.members.find(
                receiverUser => receiverUser.name === propUser
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

            const workspace = await ws.findByTeamID(team_id)

            const newUserObj = {
                userName: name,
                userID: id,
                realName: real_name,
                userIconSmall: profile.image_24,
                userIconMed: profile.image_32,
                userIconLarge: profile.image_48,
                isOwner: is_owner,
                isAdmin: is_admin,
                fk_workspace_id: workspace.id
            }

            const newUser = await wsp.add(WORKSPACE_PROFILES, newUserObj)

            return newUser[0]
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = addUser
