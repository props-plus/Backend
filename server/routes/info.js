const propsProfile = require('../../slackBlocks/propsProfile')
const express = require('express')
const daysRemaining = require('../../helpers/daysRemaining')
const userIDCheck = require('../../actions/userIDCheck')
const router = express.Router()
const p = require('../../data/model/props')

router.use(express.json())
router.use(express.urlencoded())

router.post('/', async (req, res) => {
    const profile = await userIDCheck(req.body.user_name)
    const { sum } = await p.findByUserID(profile.id)

    const dt = new Date()
    const propDateRange = {
        year: dt.getFullYear(),
        month: ('0' + (dt.getMonth() + 1)).slice(-2),
        fk_from_workspace_profile_id: profile.id
    }

    const usedProps = await p.findByDateRange(propDateRange)
    const sumPropsSent = usedProps.reduce((prev, next) => prev + next.value, 0)
    const remainingProps = 3000 - sumPropsSent
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
