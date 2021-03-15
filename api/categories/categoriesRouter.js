const express = require('express')
const authorize = require('../utils/authorize')
const authorizeRestaurant = require('../utils/authorizeRestaurant')
const Categories = require('./categoriesModel')

const router = express.Router()

router.post('/', authorize, authorizeRestaurant, (req, res) => {
    const category = req.body

    Categories.add(category)
        .then(category => res.status(201).json(category))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Internal server error'})
        })
})

router.delete('/:id', authorize, authorizeRestaurant, (req, res) => {
    const { id } = req.params

    Categories.remove(id)
        .then(() => res.status(200).json({message: 'Successfully deleted'}))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Internal server error'})
        })
})

module.exports = router