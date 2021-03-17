const express = require('express')
const authorize = require('../utils/authorize')
const authorizeRestaurant = require('../utils/authorizeRestaurant')
const Categories = require('./categoriesModel')

const router = express.Router()

// add category
router.post('/', (req, res) => {
    const category = req.body

    Categories.add(category)
        .then(category => res.status(201).json(category))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Internal server error'})
        })
})

// delete category
router.delete('/:id', (req, res) => {
    const category = {
        id: req.params.id,
        restaurant_id: req.body.restaurant_id
    }

    Categories.remove(category)
        .then(() => res.status(200).json({message: 'Successfully deleted'}))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Internal server error'})
        })
})

// update category
router.put('/:id', (req, res) => {
    const category = {
        categoryName: req.body.category,
        id: req.params.id,
        restaurant_id: req.body.restaurant_id
    }

    Categories.update(category)
        .then(category => res.status(201).json(category))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Internal server error'})
        })
})

module.exports = router