const daysRemaining = function() {
    var date = new Date()
    var time = new Date(date.getTime())
    time.setMonth(date.getMonth() + 1)
    time.setDate(0)
    var days =
        time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0
    return `${days}`
    
}


module.exports = daysRemaining