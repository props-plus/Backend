require('dotenv').config()
const axios = require('axios');

const receivedPropsCard = require('./slackBlocks/receivedPropsCard');


const sendDM = async (userId, message) => {
  try {
    //console.log(process.env.BOT_TOKEN);
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
    //console.log(conversationResponse);

    const postResponse = await axios.post('https://slack.com/api/chat.postMessage',
      {
        channel: conversationResponse.data.channel.id,
        blocks: receivedPropsCard('sender','receiver', message)
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.BOT_TOKEN}`
        }
      }
    );
    //console.log(postResponse);

  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendDM
};
