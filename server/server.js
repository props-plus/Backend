const express = require('express')
const server = express()
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const oauth = require('./routes/oauth')

server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())
server.use('/oauth', oauth)
// server.use('/props', props)

server.post('/props', (req, res) => {
    console.log(req.query)
    res.json(req)
})

server.get('/', (req, res) => {
    res.json({ message: 'You have reached the api' })
})

module.exports = server
