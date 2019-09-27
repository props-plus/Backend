const db = require('../../data/model/props')
const SPAAuth = require('../../middleware/SPAauth');

const express = require('express');
const router = express.Router();

// Route that returns the props a user has sent

router.get('/sent', SPAAuth, async (req, res) => {
    try {
        const userProps = await db.findByPropsSent(req.userInfo.fk_workspace_id)
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