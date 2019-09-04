const top5PropsCard = arr => {
    arr.map((prop, index) => {
        ;({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `${index + 1}) ${prop.msg} to ${prop.receiver}`
            }
        })
    })
}

module.exports = top5PropsCard
