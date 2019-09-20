const wsp = require('../data/model/workpace_profiles')
const addUser = require('./addUser')

const userIDCheck = async slackUserName => {
    try {
        const existingUser = await wsp.findByUserName(slackUserName)

        if (!existingUser) {
            return addUser(slackUserName)
        }

        return existingUser
    } catch (error) {
        console.error(error)
    }
}

module.exports = userIDCheck
