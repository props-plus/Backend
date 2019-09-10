const remainingProps = require('../helpers/remainingProps')
const axios = require('axios')
const confirmationCard = require('../slackBlocks/confirmationCard')

const checkPropValue = async obj => {
    const { senderID, responseURL, prop } = obj

    let value
    switch (prop) {
        case 'Good':
            value = 25
            break
        case 'Great':
            value = 50
            break
        case 'Excellent':
            value = 75
            break
        case 'Amazing':
            value = 100
            break
        default:
            value = 0
    }

    const propsRemaining = await remainingProps(senderID)

    if (value > propsRemaining) {
        await axios.post(responseURL, {
            blocks: confirmationCard(propsRemaining, 'Broke')
        })
    } else {
        return true
    }
}

module.exports = checkPropValue
