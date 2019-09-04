const propsProfile = obj => {
    const objValues = Object.values(obj)[
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*Remaining Props*: ${
                    objValues[0]
                }\n*Props Renewal:* PLACEHOLDER\n*Total Props Received*: ${
                    objValues[1]
                }`
            },
            accessory: {
                type: 'image',
                image_url:
                    'https://api.slack.com/img/blocks/bkb_template_images/approvalsNewDevice.png',
                alt_text: 'computer thumbnail'
            }
        }
    ]
}

module.exports = propsProfile
