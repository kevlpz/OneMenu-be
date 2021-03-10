const express = require('express')
const Restaurants = require('./restaurantsModel')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.get('/:', (req, res) => {
    
})

function authorize(req, res, next) {
    const token = req.headers.authorization

    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if(err) {
                res.status(401).json({error: 'Unauthorized'})
            } else {
                req.user = {email: decodedToken.email}
                next()
            }
        })
    } else {
        res.status(400).json({error: 'Must include email and password'})
    }
}

module.exports = router