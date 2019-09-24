const express = require('express')
const server = express()
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const props = require('./routes/props')
const button = require('./routes/slackActions')
//const test = require('./routes/slackActionsTest')
const anonProps = require('./routes/anonProps')
const recentProps = require('./routes/recentProps')
const info = require('./routes/info')
const oauth = require('./routes/oauth')
const authZero = require('./auth/authZero')
const authError = require('./auth/authError')

server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())

server.use('/props', props)
server.use('/anon-props', anonProps)
server.use('/slackActions', button)
//server.use('/slackActionsTest', test)
server.use('/recent-props', recentProps)
server.use('/info', info)
server.use('/oauth', oauth)
server.use('/protected', authZero)
// Error handling for unauthorized users!
server.use(authError)

server.get('/', (req, res) => {
    res.json({ message: 'You have reached the api' })
})

module.exports = server
