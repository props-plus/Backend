const confirmationCard = (reciever, status) => {
    let header
    let message
    switch (status) {
        case 'Cancel':
            header = 'Your prop request has been canceled'
            message = 'No props have been sent'
            break
        case 'Same':
            header = "You can't send props to yourself"
            message =
                "Silly :rabbit:, tricks are for kids.You can't give yourself props!"
            break
        default:
            header = `Props to ${reciever} have been sent`
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
