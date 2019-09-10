const { WebClient } = require('@slack/web-api')
const web = new WebClient(process.env.BOT_TOKEN)
const ws = require('../data/model/workspace')
const WORKSPACES = 'WORKSPACES'

const teamIDCheck = async obj => {
    const payload = obj

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
            return dbEntry
        }
        return teamExists
    } catch (error) {
        console.error(error)
    }
}

module.exports = teamIDCheck
