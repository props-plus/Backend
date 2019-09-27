const db = require('../../data/model/workpace_profiles');
const SPAAuth = require('../../middleware/SPAauth');

const express = require('express');
const router = express.Router();

// All team data based on workspace

router.get('/', SPAAuth, async (req, res) => {
    try {
        const teamInfo = await db.find();
        if (teamInfo.fk_workspace_id === req.teamInfo.fk_workspace_id) { // matching the current users workspace ID with the workspace table and returning results
            res.status(200).json(teamInfo)
        } else {
            res.status(404).json({ message: 'There was an error retrieving the team.' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router