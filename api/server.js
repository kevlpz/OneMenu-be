const express = require('express')
const server = express()
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()
const usersRouter = require('./users/usersRouter')

// server.use(cors({
//     origin: 'https://wsky-fe.herokuapp.com',
//     credentials: true
// }))
server.use(helmet())
server.use(express.json())

server.use('/users', usersRouter)

module.exports = server