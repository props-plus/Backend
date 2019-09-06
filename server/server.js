const express = require('express')
const server = express()
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const oauth = require('./routes/oauth')
const props = require('./routes/props')
const button = require('./routes/slackActions')
const anonProps = require('./routes/anonProps')
const info = require('./routes/info')

server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())
server.use('/oauth', oauth)
server.use('/props', props)
server.use('/anon-props', anonProps)
server.use('/slackActions', button)
server.use('/info', info)

server.post('/props', (req, res) => {
    res.json(req)
})

server.get('/', (req, res) => {
    res.json({ message: 'You have reached the api' })
})

module.exports = server
