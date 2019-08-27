const confirmationCard = (reciever, status) => {
    const message = status == "Cancel" ? ":x: props have been canceled" : ":heavy_check_mark: props have been sent"
    return [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `Props to ${reciever} have been sent`
            }
        },
        {
            "type": "section",
            "fields": [
                {
                    "type": "mrkdwn",
                    "text": message
                }
            ]
        }
    ]
}

module.exports = confirmationCard;
