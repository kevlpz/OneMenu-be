const express = require('express')
const Restaurants = require('./restaurantsModel')
const jwt = require('jsonwebtoken')

const router = express.Router()

// get menu by restaurant id
router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const items = Restaurants.getById(id)
        const categories = Restaurants.getCategories(id)
        const menu = await Promise.all([items, categories])

        res.status(200).json({items: menu[0], categories: menu[1]})
    } catch(err) {
        console.log(err)
        res.status(404).json({error: 'Restaurant not found'})
    }
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