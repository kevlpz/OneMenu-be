const express = require('express')
const Restaurants = require('./restaurantsModel')
const authorize = require('../utils/authorize')

const router = express.Router()

// get menu by restaurant id
router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const items = Restaurants.getMenuById(id)
        const categories = Restaurants.getCategories(id)
        const menu = await Promise.all([items, categories])

        res.status(200).json({items: menu[0], categories: menu[1]})
    } catch(err) {
        console.log(err)
        res.status(404).json({error: 'Restaurant not found'})
    }
})

// add restaurant
router.post('/', authorize, (req, res) => {
    const { id } = req.user
    const { restaurant } = req.body

    Restaurants.add({restaurant, user_id: id})
        .then(restaurant => res.status(201).json(restaurant))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Internal server error'})
        })
})

// update restaurant name
router.put('/:id', authorize, (req, res) => {
    const restaurantID = req.params.id
    const restaurantUpdate = req.body.restaurant
    const userID = req.user.id

    Restaurants.updateRestaurant(restaurantUpdate, restaurantID, userID)
        .then(() => res.status(201).json({message: 'Successfully updated'}))
        .catch(err => {
            console.log(err)
            res.status(404).json({error: 'Could not find restaurant'})
        })
})

// delete restaurant
router.delete('/', authorize, (req, res) => {
    const restaurantID = req.body.id
    const userID = req.user.id

    Restaurants.deleteRestaurant(restaurantUpdate, restaurantID, userID)
        .then(() => res.status(200).json({message: 'Successfully deleted'}))
        .catch(err => {
            console.log(err)
            res.status(404).json({error: 'Restaurant not found'})
        })
})

module.exports = router