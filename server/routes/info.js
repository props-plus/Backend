const propsProfile = require('../../slackBlocks/propsProfile')
const express = require('express')
const daysRemaining = require('../../helpers/daysRemaining')
const userIDCheck = require('../../actions/userIDCheck')
const router = express.Router()
const p = require('../../data/model/props')
const handleRemainingProps = require('../../helpers/remainingProps')

router.use(express.json())
router.use(express.urlencoded())

router.post('/', async (req, res) => {
    const profile = await userIDCheck(req.body.user_name)
    const { sum } = await p.findByUserID(profile.id)
    const remainingProps = await handleRemainingProps(profile.id)
    const propsRenewal = daysRemaining()

    const dummyObj = {
        remainingProps,
        propsRenewal,
        totalPropsReceived: sum,
        avatar: profile.userIconLarge
    }

    res.json({
        blocks: propsProfile(dummyObj)
    })
})

module.exports = router
