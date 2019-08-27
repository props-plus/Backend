const sendPropsCard = (receiver, message) => {

    const receiveMessage = (propValue, receiver, message) => {
      return {
        prop: propValue,
        receiver: receiver,
        message: message
      }
    }

    return [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `You wish to send props to: ${receiver}`
            }
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: message
            }
        },
        {
            type: 'actions',
            elements: [
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        emoji: true,
                        text: 'Good'
                    },
                    style: 'primary',
                    value: JSON.stringify(receiveMessage('GOOD', receiver, message))
                },
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        emoji: true,
                        text: 'Great'
                    },
                    style: 'primary',
                    value: JSON.stringify(receiveMessage('GREAT', receiver, message))
                },
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        emoji: true,
                        text: 'Excellent'
                    },
                    style: 'primary',
                    value: JSON.stringify(receiveMessage('EXCELLENT', receiver, message))
                },
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        emoji: true,
                        text: 'Amazing!'
                    },
                    style: 'primary',
                    value: JSON.stringify(receiveMessage('AMAZING', receiver, message))
                },
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        emoji: true,
                        text: 'Deny'
                    },
                    style: 'danger',
                    value: JSON.stringify(receiveMessage('Cancel', receiver, message))
                }
            ]
        }
    ]
}

module.exports = sendPropsCard
