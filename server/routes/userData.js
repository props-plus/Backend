const db = require('../../data/model/workpace_profiles')
const SPAAuth = require('../../middleware/SPAauth')

const express = require('express')
const router = express.Router()

// Route for user profile
router.get('/', SPAAuth, async (req, res) => {
    const { userName } = req.userInfo

    try {
        const user = await db.findByUserName(userName)

        if (!user) {
            res.status(404).json({ message: 'User not in DB' })
        }
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

module.exports = router
