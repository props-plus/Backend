const db = require('../../data/model/props')
const SPAAuth = require('../../middleware/SPAauth');
const wpd = require('../../data/model/workpace_profiles')

const express = require('express');
const router = express.Router();


 // Route for user profile
 router.get('/', SPAAuth, async (req, res) => {
    try {
        const userInfo = await wpd.findByUserName(req.userInfo.userName)
        res.status(200).json(userInfo)
        if (userInfo) {
        } else {
            res.status(404).json({ message: 'Invalid User' })
        }

    } catch (error) {
        res.status(500).json({ message: error })

    }
}) 

// Route that returns the props a user has received
router.get('/received', SPAAuth, async (req, res) => {
    try {
        const userProps = await db.findByPropsReceived(req.userInfo.id)
        if (userProps[0]) {
            res.status(200).json(userProps)
        } else {
            res.status(404).json({ message: 'No props to display' })
        }

    } catch (error) {
        res.status(500).json({ message: error })
    }
})

// Route that returns the props a user has sent

router.get('/sent', SPAAuth, async (req, res) => {
    try {
        const userProps = await db.findByPropsSent(req.userInfo.id)
        if (userProps[0]) {
            res.status(200).json(userProps)
        } else {
            res.status(404).json({ message: 'No props to display' })
        }

    } catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router;