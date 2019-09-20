const confirmationCard = (receiver, status) => {
    let header
    let message
    switch (status) {
        case 'Cancel':
            header = 'Your prop request has been canceled'
            message = ':x: No props have been sent'
            break
        case 'Same':
            header = "You can't send props to yourself"
            message =
                "Silly :rabbit:, tricks are for kids.You can't give yourself props!"
            break
        case 'Broke':
            header = 'Unable to send Props'
            message = `:x: You have ${receiver} prop points`
            break

        default:
            header = `Props to ${receiver} have been sent`
            message = ':heavy_check_mark: props have been sent'
    }

    return [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: header
            }
        },
        {
            type: 'section',
            fields: [
                {
                    type: 'mrkdwn',
                    text: message
                }
            ]
        }
    ]
}

module.exports = confirmationCard
