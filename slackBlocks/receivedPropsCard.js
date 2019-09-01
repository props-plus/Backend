const propsReceivedCard = (sender, receiver, props, message, isAnon) => {
    return [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Congratulations, ${receiver}! You have received a Props from ${
                    isAnon ? 'Anon' : sender
                }`
            }
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `${message}`
            }
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `${props}`
            }
        }
    ]
}

module.exports = propsReceivedCard
