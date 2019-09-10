require('dotenv').config()
const axios = require('axios')

const receivedPropsCard = require('./slackBlocks/receivedPropsCard')

const sendPropsToReceiver = async obj => {
    const { userID, receiver, sender, prop, message, isAnon } = obj
    try {
        const conversationResponse = await axios.post(
            'https://slack.com/api/conversations.open',
            {
                users: userID
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.BOT_TOKEN}`
                }
            }
        )

        await axios.post(
            'https://slack.com/api/chat.postMessage',
            {
                channel: conversationResponse.data.channel.id,
                blocks: receivedPropsCard(
                    sender,
                    receiver,
                    prop,
                    message,
                    isAnon
                )
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.BOT_TOKEN}`
                }
            }
        )
    } catch (error) {
        throw error
    }
}

module.exports = {
    sendPropsToReceiver
}
