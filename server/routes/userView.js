const props = require('../../data/model/props')
const SPAAuth = require('../../middleware/SPAauth');
const wsp = require('../../data/model/workspace_profiles')

const express = require('express');
const router = express.Router();


// Route for user profile
router.get('/', SPAAuth, async (req, res) => {
    try {
        const userInfo = await wsp.findByUserName(req.userInfo.userName)

        if (userInfo) {
            res.status(200).json(userInfo)
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
        const userProps = await props.findByPropsReceived(req.userInfo.id)
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
        const userProps = await props.findByPropsSent(req.userInfo.id)
        if (userProps[0]) {
            res.status(200).json(userProps)
        } else {
            res.status(404).json({ message: 'No props to display' })
        }

    } catch (error) {
        res.status(500).json({ message: error })
    }
})

// Route that will get the user's team data

router.get('/team', SPAAuth, async (req, res) => {
    try {
        const teamInfo = await wsp.find();
        if (teamInfo.fk_workspace_id === req.teamInfo.fk_workspace_id) { // matching the current users workspace ID with the workspace table and returning results
            res.status(200).json(teamInfo)
        } else {
            res.status(404).json({ message: 'There was an error retrieving the team.' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router;