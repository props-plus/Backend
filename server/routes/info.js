const propsProfile = require('../../slackBlocks/propsProfile')
const express = require('express')
const daysRemaining = require('../../helpers/daysRemaining')
const userIDCheck = require('../../actions/userIDCheck')
const router = express.Router()
const p = require('../../data/model/props')

router.use(express.json())
router.use(express.urlencoded())

router.post('/', async (req, res) => {
    // remainingProps = totalProps - sentProps
    // propsRenew = ifFirstOfMonth issue 3000, overwrite
    // totalPropsReceived
    const dt = new Date()

    const profile = await userIDCheck(req.body.user_name)
    const { sum } = await p.findByUserID(profile.id)

    const propDateRange = {
        year: dt.getFullYear(),
        month: ('0' + (dt.getMonth() + 1)).slice(-2),
        fk_from_workspace_profile_id: profile.id
    }

    const { sum: usedProps } = await p.findByDateRange(propDateRange)
    const remainingProps = 3000 - usedProps

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
