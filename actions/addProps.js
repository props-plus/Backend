const p = require('../data/model/props')
const PROPS = 'PROPS'

const insertProp = async obj => {
    const { prop, message, isAnon, receiverID, senderID } = obj

    if (receiverID !== senderID) {
        try {

            let value
            switch (prop) {
                case 'Good':
                    value = 25
                    break
                case 'Great':
                    value = 50
                    break
                case 'Excellent':
                    value = 75
                    break
                case 'Amazing':
                    value = 100
                    break
                default:
                    value = 0
            }

            const newProp = {
                value,
                message,
                isAnon,
                fk_to_workspace_profile_id: receiverID,
                fk_from_workspace_profile_id: senderID
            }

            await p.add(PROPS, newProp)
        } catch (error) {
            console.error(error)
        }

    } else {

        try {
            const newProp = {
                value: 0,
                message: 'Silly rabbit, tricks are for kids. You can\'t give yourself props!',
                isAnon,
                fk_to_workspace_profile_id: receiverID,
                fk_from_workspace_profile_id: senderID
            }
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = insertProp
