const sendPropsCard = (receiver, message) => {
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
                    value: 'click_me_123'
                },
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        emoji: true,
                        text: 'Great'
                    },
                    style: 'primary',
                    value: 'click_me_123'
                },
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        emoji: true,
                        text: 'Excellent'
                    },
                    style: 'primary',
                    value: 'click_me_123'
                },
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        emoji: true,
                        text: 'Amazing!'
                    },
                    style: 'primary',
                    value: 'click_me_123'
                },
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        emoji: true,
                        text: 'Deny'
                    },
                    style: 'danger',
                    value: 'click_me_123'
                }
            ]
        }
    ]
}

module.exports = sendPropsCard
