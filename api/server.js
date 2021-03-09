const express = require('express')
const server = express()
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

server.use(cors({
    origin: 'https://wsky-fe.herokuapp.com',
    credentials: true
}))
server.use(helmet())
server.use(express.json())

module.exports = server