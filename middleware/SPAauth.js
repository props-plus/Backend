const { WebClient } = require('@slack/web-api')
const teamIDCheck = require('../actions/teamIDCheck')
const userIDCheck = require('../actions/userIDCheck')
const web = new WebClient(process.env.BOT_TOKEN)

const SPAAuth = async (req, res, next) => {
    try {
        const validateToken = await web.auth.test({
            token: "xoxp-745512794214-736944915489-745206080391-90149f98fcfb3ff41dcb9ad62fde8662"
        })

        if (validateToken) {
            req.slackUser = validateToken.user_id
            req.teamInfo = await teamIDCheck({
                team: { id: validateToken.team_id }
            })
            req.userInfo = await userIDCheck(validateToken.user)

            next()
        } else {
            res.status(401).json({ message: "Didn't say the magic word!" })
        }
    } catch (error) {
        res.status(500).json({ message: 'Not Authorized', error })
    }
}

module.exports = SPAAuth
