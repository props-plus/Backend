const express = require('express')
const request = require('request')
const userinfo = require('../../helpers/userinfo')
const router = express.Router()
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

router.get('/', async (req, res) => {
    console.log('END POINT HIT!')
    if (!req.query.code) {
        res.status(500).json({ error: 'Not getting code' })
    } else {
        request(
            {
                url: 'https://slack.com/api/oauth.access',
                qs: {
                    code: req.query.code,
                    client_id,
                    client_secret
                },
                method: 'GET'
            },
            async (error, resp, body) => {
                if (error) {
                    console.log(error)
                } else {
                    body = JSON.parse(body)
                    const user = await userinfo(body.access_token, body.user_id)
                    console.log('User variable:', user)
                    res.json(user)
                }
            }
        )
    }
})

module.exports = router
