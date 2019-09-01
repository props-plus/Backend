const sendPropsCard = require('../../slackBlocks/sendPropsCard')
const express = require('express')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())

router.post('/', async (req, res) => {
    const { text } = req.body
    const arr = text.split(' ')
    const [user] = arr
    const receiver = user.substring(1)
    const message = arr.slice(1).join(' ')

    res.json({
        blocks: sendPropsCard({ receiver, message, isAnon: true })
    })
})

module.exports = router
