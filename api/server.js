const express = require('express')
const server = express()
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()
const authorize = require('./utils/authorize')
const authorizeRestaurant = require('./utils/authorizeRestaurant')
const usersRouter = require('./users/usersRouter')
const restaurantsRouter = require('./restaurants/restaurantsRouter')
const categoriesRouter = require('./categories/categoriesRouter')

// server.use(cors({
//     origin: 'https://wsky-fe.herokuapp.com',
//     credentials: true
// }))
server.use(helmet())
server.use(express.json())

server.use('/users', usersRouter)
server.use('/restaurants', restaurantsRouter)
server.use('/categories', authorize, authorizeRestaurant, categoriesRouter)

module.exports = server