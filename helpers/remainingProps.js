const p = require('../data/model/props')

const remainingProps = async id => {
    const dt = new Date()
    const propDateRange = {
        year: dt.getFullYear(),
        month: ('0' + (dt.getMonth() + 1)).slice(-2),
        fk_from_workspace_profile_id: id
    }

    const usedProps = await p.findByDateRange(propDateRange)
    const sumPropsSent = usedProps.reduce((prev, next) => prev + next.value, 0)
    const remainingProps = 3000 - sumPropsSent

    return remainingProps
}

module.exports = remainingProps
