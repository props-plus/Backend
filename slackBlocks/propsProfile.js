const propsProfile = obj => {
    const { remainingProps, propsRenewal, totalPropsReceived, avatar } = obj
    return [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*Remaining Props*: ${remainingProps}\n*Props Renewal:* ${propsRenewal} days remaining\n*Total Props Received*: ${totalPropsReceived}`
            },
            accessory: {
                type: 'image',
                image_url: avatar,
                alt_text: 'Avatar Image'
            }
        }
    ]
}

module.exports = propsProfile
