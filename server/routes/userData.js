const db = require('../../data/model/workpace_profiles');
const SPAAuth = require('../../middleware/SPAauth');

const express = require('express');
const router = express.Router();

router.get('/', SPAAuth, async (req, res) => {
    try {
        const data = await db.findByUserName(req.userInfo.userName)
        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router;