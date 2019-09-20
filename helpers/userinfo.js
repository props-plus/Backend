const request = require('request')

const userInfo = function(token, user_id) {
    let userData = request(
        {
            url: 'https://slack.com/api/users.info',
            qs: {
                token: token,
                user: user_id
            },
            method: 'GET'
        },
        (error, resp, body) => {
            if (error) {
                console.error(error)
            } else {
                userData = JSON.parse(body)
            }
        }
    )
    return userData
}

module.exports = userInfo
