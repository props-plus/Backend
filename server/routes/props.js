const confirmSendPropsCard = require('../../slackBlocks/confirmSendPropsCard')
const express = require('express')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())

router.post('/', async (req, res) => {
    const { text } = req.body
    const arr = text.split(' ')
    const [user] = arr
    const recipient = user.substring(1)
    const msg = arr.slice(1).join(' ')

    res.json({
        blocks: confirmSendPropsCard(recipient, msg, false)
    })
})

module.exports = router
