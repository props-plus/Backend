require('dotenv').config()
const axios = require('axios');

const receivedPropsCard = require('./slackBlocks/receivedPropsCard');


const sendDM = async (userId, receiver, sender, prop, message) => {
  try {
    const conversationResponse = await axios.post('https://slack.com/api/conversations.open',
      {
        users: userId
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.BOT_TOKEN}`
        }
      }
    );

    const postResponse = await axios.post('https://slack.com/api/chat.postMessage',
      {
        channel: conversationResponse.data.channel.id,
        blocks: receivedPropsCard(sender, receiver, prop, message)
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.BOT_TOKEN}`
        }
      }
    );

  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendDM
};
