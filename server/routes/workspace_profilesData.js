const db = require('../../data/model/workpace_profiles')
const SPAAuth = require('../../middleware/SPAauth');

const express = require('express');
const router = express.Router();

// Route for user profile
router.get('/user', SPAAuth, async (req, res) => {
    try {
        const data = await db.findByUserName(req.userInfo.userName)
        res.status(200).json(data)
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

module.exports = router
