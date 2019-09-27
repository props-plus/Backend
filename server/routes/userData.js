const db = require('../../data/model/workpace_profiles');
const props = require('../../data/model/props')
const SPAAuth = require('../../middleware/SPAauth');

const express = require('express');
const router = express.Router();

// Route that creates basic user data

router.get('/', SPAAuth, async (req, res) => {
    try {
        const userInfo = await db.findByUserName(req.userInfo.userName)
        if (userInfo) {
            res.status(200).json(userInfo)
        } else {
            res.status(404).json({ message: 'Invalid User' })
        }

    } catch (error) {
        res.status(500).json({ message: error })
    }
})

// Route that returns user props bases upon user id

router.get('/props', SPAAuth, async (req, res) => {
    try {
        const userProps = await props.findByUserID(req.userInfo.id)
        if (userProps) {
            res.status(200).json(userProps)
        } else {
            res.status(404).json({ message: 'No props to display' })
        }

    } catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router;