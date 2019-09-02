const sendPropsCard = obj => {
    let { receiver, message, isAnon } = obj
    //setting default value of message requires unicode character --using single space
    message = message || ' '

    const receiveMessage = (propValue, receiver, message, isAnon) => {
        return {
            prop: propValue,
            receiver,
            message,
            isAnon
        }
    }

    const buttons = ['Good', 'Great', 'Excellent', 'Amazing', 'Cancel']

    const buttonList = buttons.map(button => ({
        type: 'button',
        text: {
            type: 'plain_text',
            emoji: true,
            text: button
        },
        style: button === 'Cancel' ? 'danger' : 'primary',
        value: JSON.stringify(receiveMessage(button, receiver, message, isAnon))
    }))

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
            elements: buttonList
        }
    ]
}

module.exports = sendPropsCard
